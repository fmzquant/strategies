/*
策略出处: https://www.botvs.com/strategy/21337
策略名称: 数字货币差价监控分析
策略作者: 小小梦
策略描述:

只支持两个交易所, 可自定义差价的类型, 支持2.77托管者的自定义图表功能


参数            默认值                                                                          描述
------------  ---------------------------------------------------------------------------  --------
TickInterval  500                                                                          检测频率(毫秒)
StrOnePair    spot:Huobi:spot;spot:OKCoin:spot;false;60;5;0;0                              组合1
StrTwoPair    future:Futures_OKCoin:this_week;spot:OKCoin:spot;false;60;5;0;0              组合2
StrThreePair  future:Futures_OKCoin:this_week;future:Futures_OKCoin:quarter;true;60;5;0;0  组合3
StrFourPair   null                                                                         组合4
StrSixPair    null                                                                         组合6
StrFivePair   null                                                                         组合5
ResetChart    false                                                                        是否清除上次图表
*/

/*
1、初步设计为4个组合
2、计算 对冲空间
3、多线程
*/
// 参数
// var StrOnePair = "spot:Huobi:spot;spot:OKCoin:spot;false;60";
// var StrTwoPair = "future:Futures_OKCoin:this_week;spot:OKCoin:spot;false;60";
// var StrThreePair = "future:Futures_OKCoin:this_week;future:Futures_OKCoin:quarter;true;60";
// var StrFourPair = "future:Futures_BitMEX:XBTUSD;future:Futures_OKCoin:this_week;true;60";

// 全局变量 
var NotEnable = "null";
var ArrayPairs = [];
var ArrayStrPairs = [StrOnePair, StrTwoPair, StrThreePair, StrFourPair, StrFivePair, StrSixPair];
var isFirst = true;
var ChartObj = null;
var chart = null;
var OK_futureRate = 0;
var IsCheckDelivery = false;
var checkTime = 0;
var residualTime = 0;
var checkPreTime = 0;
var strDelivery = "";
var JGHoursCorrect = 8;                              // 检测交割剩余小时，在实盘中需要修正 8小时。 模拟时该值设置为0
var tbls = null;

// 函数实现
function CheckDelivery(nowTime, Symbol) {
    var contractInfo = null;
    if(checkTime <= 0){
        var contractName = "";
        var ContractIndex = 0;
        if(Symbol === "this_week"){
            ContractIndex = 0;
        }else if(Symbol === "next_week"){
            ContractIndex = 1;
        }else if(Symbol === "quarter"){
            ContractIndex = 2;
        }
        
        // 更新汇率
        for(var exchangeIndex = 0; exchangeIndex < exchanges.length; exchangeIndex++){
            var e_name = exchanges[exchangeIndex].GetName();
            if(e_name == "Futures_OKCoin"){
                OK_futureRate = _C(exchanges[exchangeIndex].GetUSDCNY);  // 每次交割后 更新汇率
            }
        }
        
        while (contractName == "") {
            //var contractInfo = HttpQuery("https://www.okcoin.com/api/v1/future_hold_amount.do?symbol=btc_usd&contract_type=this_week"); //只是检测this_week ,避免重复调用提高效率
            switch(ContractIndex){
                case 0: contractInfo = HttpQuery("https://www.okex.com/api/v1/future_hold_amount.do?symbol=btc_usd&contract_type=this_week");  // 原地址修改为： www.okex.com
                        break;
                case 1: contractInfo = HttpQuery("https://www.okex.com/api/v1/future_hold_amount.do?symbol=btc_usd&contract_type=next_week");
                        break;
                case 2: contractInfo = HttpQuery("https://www.okex.com/api/v1/future_hold_amount.do?symbol=btc_usd&contract_type=quarter");
                        break;
                default: Log("contractInfo:", contractInfo); 
                         //throw "switch NumContractType Error!";
            }            //根据 contractType 类型 选择读取合约交割日期
            if (!contractInfo || contractInfo.length === 0) {
                Sleep(100);
                continue;
            }
            try {
                contractName = (JSON.parse(contractInfo))[0].contract_name;
            } catch (e) {
                Log("CheckDelivery Error",contractInfo, e);
                return 0;
            }
        }
        var nowDateTime = new Date();
        contractName = contractName.split("BTC")[1]; //抽取BTC后的字符串 重新赋值
        var strMonth = contractName[0] + contractName[1];
        var strDay = contractName[2] + contractName[3];
        var strYear = nowDateTime.getFullYear() + ""; //获取 年份字符串
        
        // 处理跨年问题
        var nowMonth = nowDateTime.getMonth(); // 获取月份
        if(strMonth < nowMonth){
            strYear = (strYear - 0) + 1;
            strYear = strYear + "";
        }
        
        var strDate = strYear + '-' + strMonth + '-' + strDay + ' ' + "16:00:00";
        var deliveryTime = (new Date(strDate)).getTime();             // + 16 * 60 * 60 * 1000;
        nowTime = nowDateTime.getTime();
        residualTime = (deliveryTime - nowTime) / 1000 / 60 / 60 - JGHoursCorrect; //单位是小时
        checkTime = (deliveryTime - nowTime) - JGHoursCorrect * 1000 * 60 * 60;    //还差多少毫秒交割
        checkPreTime = nowTime;                                       //记录开始的时间
        Log("合约", Symbol, "交割日期获取：", strDate); 
    }else{
        checkTime -= nowTime - checkPreTime;                          //减去消耗的时间
        checkPreTime = nowTime;
        residualTime = checkTime / 1000 / 60 / 60;                    // 计算距离交割多少小时
    }
    
    return _N(residualTime, 3);
}


function FindExchange(StrExchangeName){
	for(var i = 0; i < exchanges.length; i++){
		if(StrExchangeName == exchanges[i].GetName()){
			return exchanges[i];
		}
		if(i == exchanges.length){
			throw "没有找到 名称为:" + StrExchangeName + "的交易所对象";
		}
	}
}

function CalcAvgDiff(pair){
    var nowTime = new Date().getTime();
    if(nowTime - pair.AvgDiffUpdateTime > 1000 * pair.UpdateCycle){
        // 更新返回值
        var AvgPlus = _N(pair.SamplePlus.sum / pair.SamplePlus.count, 2);
        var AvgMinus = _N(pair.SampleMinus.sum / pair.SampleMinus.count, 2);
        
        // 重置
        pair.AvgDiffUpdateTime = nowTime;
        pair.SamplePlus.sum = 0;
        pair.SamplePlus.count = 0;
        pair.SampleMinus.sum = 0;
        pair.SampleMinus.count = 0;
        return {APlus : AvgPlus, AMinus : AvgMinus};
    }else{
        // 累计数值
        pair.SamplePlus.sum += pair.Plus;
        pair.SamplePlus.count += 1;
        pair.SampleMinus.sum += pair.Minus;
        pair.SampleMinus.count += 1;
        return false;
    }
}

function init(){
    for(var i = 0; i < ArrayStrPairs.length; i++){
        // Log(ArrayStrPairs[i])     // 测试
        if(ArrayStrPairs[i] == NotEnable){             // 过滤
        	continue;
        }
        var pair = {};
        var exchangeOfPair = ArrayStrPairs[i].split(";");

        if(exchangeOfPair.length !== 7){
        	throw "参数错误：" + ArrayStrPairs[i];
        }
        pair.exchangeA = FindExchange((exchangeOfPair[0].split(":"))[1]);   // 设置 组合对象的 交易所属性
        pair.exchangeB = FindExchange((exchangeOfPair[1].split(":"))[1]);
        
        pair.NameA = (exchangeOfPair[0].split(":"))[1];
        pair.NameB = (exchangeOfPair[1].split(":"))[1];
        
        if(pair.NameA == "Futures_OKCoin"){
            OK_futureRate = _C(pair.exchangeA.GetUSDCNY);
            IsCheckDelivery = true;
        }
        if(pair.NameB == "Futures_OKCoin"){
            OK_futureRate = _C(pair.exchangeB.GetUSDCNY);
            IsCheckDelivery = true;
        }
        
        pair.SymbolA = (exchangeOfPair[0].split(":"))[2];
        pair.SymbolB = (exchangeOfPair[1].split(":"))[2];
        
        pair.TypeA = (exchangeOfPair[0].split(":"))[0];
        pair.TypeB = (exchangeOfPair[1].split(":"))[0];
        
        pair.DepthA = null;
        pair.DepthB = null;

        pair.Plus = null;
        pair.Minus = null;
        
        pair.AvgDiff = null;
        pair.ID = i;
        
        pair.AvgDiffUpdateTime = new Date().getTime();    // 计算 均值更新时间
        pair.SamplePlus = {sum : 0, count : 0};           // 储存样本数据
        pair.SampleMinus = {sum : 0, count : 0};          // 储存样本数据
        pair.UpdateCycle = parseInt(exchangeOfPair[3]);   // 更新周期秒数
        pair.GetDepthCycle = parseInt(exchangeOfPair[4]);    // 获取深度  GetDepth 调用周期  2017.10.12新增
        pair.GetDepthUpdateTime = 0;                         // 记录 深度 更新时间           2017.10.12新增
        pair.plusAvg = 0;
        pair.minusAvg = 0;
        pair.Plus_count = 0;
        pair.Minux_count = 0;
        pair.max = null;
        pair.min = null;
        
        pair.customRate = parseInt(exchangeOfPair[5])   // spot:OKCoin_EN:spot;future:Futures_OKCoin:this_week;true;60;5;0    默认 0 是 不启动 自定义现货汇率, 现货 汇率
        pair.customRate_futures = parseInt(exchangeOfPair[6])   // 期货 汇率
        
        pair.isUseUSDRate = null;
        if(exchangeOfPair[2] == "false"){
            pair.isUseUSDRate = false;
        }else if(exchangeOfPair[2] == "true"){
        	pair.isUseUSDRate = true;
        }else{
        	throw "error isUseUSDRate : " + pair.isUseUSDRate;
        }
        
        /*
        if(pair.TypeA == "future" || pair.isUseUSDRate == true){
            pair.PreRate = pair.exchangeA.GetUSDCNY();
        }else if(pair.TypeB == "future" || pair.isUseUSDRate == true){
            pair.PreRate = pair.exchangeB.GetUSDCNY();
        }else{
        	pair.PreRate = pair.exchangeA.SetRate();
        }
        */

        ArrayPairs.push(pair);
        Log("组合 pair: ", pair.exchangeA.GetName(), pair.exchangeB.GetName(), "#FF0000");  // ceshi
    }
    // 测试
    // Log(ArrayPairs); // ceshi
}

function ToTables(time){
    // 处理图表数据
    var tbl_base = {
        type : "table",
        title : "pair基础数据",
        cols : ["ID", "NameA - NameB", "SymbolA - SymbolB", "UpdCycle", "isUSD", "Collect"],
        rows : [],
    };
    
    var tbl_value = {
        type : "table",
        title : "pair行情数据",
        cols : ["ID", "NameA - NameB", "SymbolA - SymbolB", "A_Bids1", "B_Asks1", "Plus", "A_Asks1", "B_Bids1", "Minus"],
        rows : [],
    };
    
    var tbl_Statistics = {
        type : "table",
        title : "pair统计数据",
        cols : ["ID", "NameA - NameB", "SymbolA - SymbolB", "最大差价", "最小差价", "正溢价均值", "负溢价均值"],
        rows : [],
    }
    
    // 写入数据 迭代  写入 ： NameA , SymbolA , TypeA , DepthA , Plus , Minus , time - AvgDiffUpdateTime ,UpdateCycle, isUseUSDRate
    _.each(ArrayPairs, function(pair){
        var col1 = [pair.ID + " ", pair.NameA + "/" + pair.NameB, pair.SymbolA + "/" + pair.SymbolB, pair.UpdateCycle, pair.isUseUSDRate, (time - pair.AvgDiffUpdateTime) + "ms"];
        tbl_base.rows.push(col1);
        
        var col2 = [pair.ID + " ", pair.NameA + "/" + pair.NameB, pair.SymbolA + "/" + pair.SymbolB, pair.DepthA.Bids[0].Price, pair.DepthB.Asks[0].Price, pair.Plus, pair.DepthA.Asks[0].Price, pair.DepthB.Bids[0].Price, pair.Minus];
        tbl_value.rows.push(col2);
        
        var col3 = [pair.ID + " ", pair.NameA + "/" + pair.NameB, pair.SymbolA + "/" + pair.SymbolB, pair.max, pair.min, pair.plusAvg, pair.minusAvg]
        tbl_Statistics.rows.push(col3);
    });
    
    return [tbl_base, tbl_value, tbl_Statistics];
}

function loop(beginTime){
    _.each(ArrayPairs, function(pair){
        var DepthA = null;   // 临时储存
        var DepthB = null;   // 临时储存
        
        // 判断是否需要更新
        if(new Date().getTime() - pair.GetDepthUpdateTime < 1000 * pair.GetDepthCycle){
            return 
        }else{
            pair.GetDepthUpdateTime = new Date().getTime()       // 记录 更新时间
        }
        
        if(pair.TypeA == "spot" && pair.isUseUSDRate == false){             // 如果当前组合 A 为现货 并且 不使用美元计价，直接获取数据
            if(pair.customRate !== 0){
                // Log("切换韩元汇率：", pair.customRate, pair.exchangeA.GetRate(), typeof(pair.customRate))        // ceshi
                pair.exchangeA.SetRate(pair.customRate)
                // Log(pair.exchangeA.SetRate(1/1115), "#FF0000")        // ceshi
            }
            DepthA = pair.exchangeA.GetDepth();
        }else if(pair.TypeA == "future" && pair.isUseUSDRate == false){     // 如果当前组合 A 为期货 并且 不使用美元计价，需要判断是否为OKEX ，使用OKEX自己的汇率转换为RMB计价
            if(pair.NameA !== "Futures_OKCoin"){
                if(pair.customRate_futures !== 0){
                    pair.exchangeA.SetRate(pair.customRate_futures)
                }
                pair.exchangeA.SetContractType(pair.SymbolA);
                DepthA = pair.exchangeA.GetDepth();
            }else{
                if(pair.customRate_futures == 0){
                    pair.PreRate = pair.exchangeA.SetRate(OK_futureRate);
                }else{
                    pair.PreRate = pair.exchangeA.SetRate(pair.customRate_futures)
                }
                pair.exchangeA.SetContractType(pair.SymbolA);
                DepthA = pair.exchangeA.GetDepth();
                pair.exchangeA.SetRate(pair.PreRate);
            }
        }else if(pair.TypeA == "spot" && pair.isUseUSDRate == true){        // 如果当前组合 A 为现货 并且 使用美元计价， 切换禁用底层转换， 获取数据后，恢复。
        	pair.PreRate = pair.exchangeA.SetRate(1);
        	DepthA = pair.exchangeA.GetDepth();
        	pair.exchangeA.SetRate(pair.PreRate);
        }else if(pair.TypeA == "future" && pair.isUseUSDRate == true){      // 如果当前组合 A 为期货 并且 使用美元计价， 切换禁用底层转换， 获取数据后，恢复。
        	pair.PreRate = pair.exchangeA.SetRate(1);
        	pair.exchangeA.SetContractType(pair.SymbolA);
            DepthA = pair.exchangeA.GetDepth();
            pair.exchangeA.SetRate(pair.PreRate);
        }

        if(pair.TypeB == "spot" && pair.isUseUSDRate == false){
            if(pair.customRate !== 0){
                // Log("切换韩元汇率：", pair.customRate, pair.exchangeB.GetRate(), typeof(pair.customRate))        // ceshi    切换韩元汇率： 1115 1000 number
                pair.exchangeB.SetRate(pair.customRate)
                // Log(pair.exchangeB.SetRate(1/1115), "#FF0000")        // ceshi       undefined
            }
            DepthB = pair.exchangeB.GetDepth();
        }else if(pair.TypeB == "future" && pair.isUseUSDRate == false){
            if(pair.NameB !== "Futures_OKCoin"){
                if(pair.customRate_futures !== 0){
                    pair.exchangeB.SetRate(pair.customRate_futures)
                }
                pair.exchangeB.SetContractType(pair.SymbolB);
                DepthB = pair.exchangeB.GetDepth();
            }else{
                if(pair.customRate_futures == 0){
                    pair.PreRate = pair.exchangeB.SetRate(OK_futureRate);
                }else{
                    pair.PreRate = pair.exchangeB.SetRate(pair.customRate_futures)
                }
                pair.exchangeB.SetContractType(pair.SymbolB);
                DepthB = pair.exchangeB.GetDepth();
                pair.exchangeB.SetRate(pair.PreRate);
            }
        }else if(pair.TypeB == "spot" && pair.isUseUSDRate == true){
            pair.PreRate = pair.exchangeB.SetRate(1);
        	DepthB = pair.exchangeB.GetDepth();
        	pair.exchangeB.SetRate(pair.PreRate);
        }else if(pair.TypeB == "future" && pair.isUseUSDRate == true){
        	pair.PreRate = pair.exchangeB.SetRate(1);
        	pair.exchangeB.SetContractType(pair.SymbolB);
            DepthB = pair.exchangeB.GetDepth();
        	pair.exchangeB.SetRate(pair.PreRate);
        }

        // 过滤 数据,确定数据没有问题再赋值给 对象持久化。
        if(!DepthA || !DepthB || DepthA.Asks.length == 0 || DepthA.Bids.length == 0 || 
        	DepthB.Asks.length == 0 || DepthB.Bids.length == 0){
            return;
        }
        
        // 过滤后给数据赋值
        pair.DepthA = DepthA;
        pair.DepthB = DepthB;

        pair.Plus = _N(pair.DepthA.Bids[0].Price - pair.DepthB.Asks[0].Price, 2);
        pair.Minus = _N(pair.DepthA.Asks[0].Price - pair.DepthB.Bids[0].Price, 2);
        
        // 统计 平均、最大、最小
        if(pair.min == null){
            pair.min = pair.Minus
        }else{
            pair.min = Math.min(pair.min, pair.Minus)
        }
        if(pair.max == null){
            pair.max = pair.Plus
        }else{
            pair.max = Math.max(pair.max, pair.Plus)
        }
        
        if(pair.Plus > 0){
            pair.plusAvg = ((pair.plusAvg * pair.Plus_count) + pair.Plus) / (pair.Plus_count + 1)
            pair.Plus_count++
        }
        
        if(pair.Minus < 0){
            pair.minusAvg = ((pair.minusAvg * pair.Minux_count) + pair.Minus) / (pair.Minux_count + 1)
            pair.Minux_count++
        }
        
        
        
        // 调用计算函数  计算均值，间隔时间输出
        var AvgDiff = CalcAvgDiff(pair);
        
        if(AvgDiff !== false){       // 根据周期 设置 更新图像
            $.PlotLine("pairID:" + pair.ID + " : Plus" /*pair.NameA + "/" + pair.NameB + ":Plus"*/, AvgDiff.APlus, beginTime);
            $.PlotLine("pairID:" + pair.ID + " : Minus" /*pair.NameA + "/" + pair.NameB + ":Minus"*/, AvgDiff.AMinus, beginTime);
        }
        
        // 首次执行一些操作
        if(isFirst){
            chart = $.PlotLine("pairID:" + pair.ID + " : Plus" /*pair.NameA + "/" + pair.NameB + ":Plus"*/, pair.Plus);
            chart = $.PlotLine("pairID:" + pair.ID + " : Minus" /*pair.NameA + "/" + pair.NameB + ":Minus"*/, pair.Minus);
            if(pair.isUseUSDRate){
                for(var key in ChartObj.series){
                    if(ChartObj.series[key].name == pair.NameA + "/" + pair.NameB + ":Plus" || ChartObj.series[key].name == pair.NameA + "/" + pair.NameB + ":Minus"){
                        ChartObj.series[key].yAxis = 1;
                    }
                }
            }
        }
    });
    
    // 结束首次
    if(isFirst){
        chart.update(ChartObj);
        if(ResetChart){
            chart.reset();
        }
        isFirst = false;
    }
    tbls = ToTables(beginTime);
}


function main(){
    // 图标初始设置
    ChartObj = $.GetCfg();
    // 处理 指标轴
    ChartObj.yAxis = [{
            title: {text: 'RMB计价'},//标题
            style: {color: '#4572A7'},//样式 
            opposite: false,  //生成右边Y轴
        },
        {
            title:{text: "美元计价"},
            opposite: true,  //生成右边Y轴  ceshi
        }
    ];

	while(true){
        var beginTime = new Date().getTime();
		loop(beginTime);
		Sleep(TickInterval);
        if(IsCheckDelivery && (!IsVirtual())){
            var numDelivery = CheckDelivery(beginTime, "this_week");
            strDelivery = "距离当周合约交割剩余：" + numDelivery + " 小时! OK期货汇率：" + OK_futureRate;
        }
        var endTime = new Date().getTime();
        LogStatus("轮询耗时：" + (endTime - beginTime) + "ms" + '\n`' + JSON.stringify(tbls) + '`' + '\n' + strDelivery);
	}
}











