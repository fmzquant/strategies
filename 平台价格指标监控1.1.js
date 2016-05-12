/*
策略出处: https://www.botvs.com/strategy/12442
策略名称: 平台价格指标监控1.1
策略作者: tfboys
策略描述:

1.5---可以监控ATR,RSI,BOLL,PRICE
1.4---增加告警周期设置
1.3---增加微信通知
1.2---支持期货平台
1.1---稳定版本


参数             默认值    描述
-------------  -----  ------------------------
CType0         0      所0货币类型: 人民币|美元
ContractType0  0      所0合约类型: 当周|下周|当月|季度
MLevel0        0      所0杠杆大小: 10倍|20倍
LoopInterval   500    轮询间隔(毫秒)
MaxVal         2755   值上限
MinVal         2730   值下限
AlarmPeriod    2      告警周期(单位:轮询时长)
Interval       500    函数重试间隔
Period         14     周期
Index          0      指标类型: ATR|RSI|BOLL|PRICE
RecordsHand    false  手动收集K线
CleanLog       true   清理日志图表

按钮    默认值         描述
----  ----------  ----
推送切换  __button__  微信推送
*/

var _ContractType0 = ["this_week", "next_week", "month", "quarter"][ContractType0];
var _MarginLeve0 = [10, 20][MLevel0];
var usdrate0 = 6.35;
var rate0 = 1;
var TS = 0;		//是否告警
var _CType0 = [0, 1][CType0];
var _Index 	= [0, 1, 2, 3][Index];	//atr,rsi,boll

var CanAlarm = true;
var LastRcdTime = 0;
var arrValue1 = 0;
var arrValue1Last1 = 0;
var arrValue1Last2 = 0;
var ArrayPrice = null;
var ArrayLen = 0;

//外部值
//var MaxRate = 104.2	//最大值
//var MinVal = 103.2	//最小值
//var AlarmPeriod = 120;	//单位:一个ticker的时间，约0.5秒
//var Interval = 500;			//重试间隔
//var Period = 12;
//var RecordsHand = true;	//手动收集K线
//var CleanLog = true;		//清理日志图表

//常量
var RsiMid = 50;

//{自定义区间
function UpArrayNGetAvg(valIn, arr, arrLen) {
	//变量
	var nowOp = 0;
	var nowHi = 0;
	var nowLo = 0;
	var newLen = 0;
	
	if (valIn) {
		if(arr.length <= 0){
			nowOp = valIn.Last;
			nowHi = valIn.Sell;
			nowLo = valIn.Buy;
		}
		else{
			nowOp = arr[arr.length - 1].Close;
			nowHi = Math.max(arr[arr.length - 1].Close, valIn.Sell, valIn.Last);
			nowLo = Math.min(arr[arr.length - 1].Close, valIn.Buy, valIn.Last);
		}
		
		var rcd = {Time:new Date().getTime(), Open:nowOp, High:nowHi, Low:nowLo, Close:valIn.Last, Volume:valIn.Volume};
		newLen = arr.push(rcd);
		while(newLen > arrLen){
			arr.splice(0, 1);	//删除第一个元素
			newLen = arr.length;
		}
	}

	return arr;
}

ARRAY_ZEROS = function(len) {
    var n = [];
    return n;
};
//}

function _N(v, precision) {
    if (typeof(precision) != 'number') {
        precision = 4;
    }
	if(!v)
		return 0;
	
    var d = parseFloat(v.toFixed(Math.max(10, precision+5)));
    s = d.toString().split(".");
    if (s.length < 2 || s[1].length <= precision) {
        return d;
    }

    var b = Math.pow(10, precision);
    return Math.floor(d*b)/b;
}

function GetTicker(e) {
    while (true) {
        var ticker = EnsureCall(e, 'GetTicker');
        if (ticker && ticker.Buy > 0 && ticker.Sell > 0 && ticker.Sell > ticker.Buy) {
            return ticker;
        }
        Sleep(Interval);
    }
}

function EnsureCall(e, method) {
    var r;
    while (!(r = e[method].apply(this, Array.prototype.slice.call(arguments).slice(2)))) {
        Sleep(Interval);
    }
    return r;
}

function sdGetDepth(e) {
	var dpth = null;
	while ( !(dpth = e.GetDepth()) || dpth.Asks.length <= 0 || dpth.Bids.length <= 0) {
		Sleep(Interval);
	}
	return dpth;
}

function getCmd() {
	var cmd = GetCommand();
	if(cmd) {
		//Log(" ------ : ", cmd);
		var strNum = cmd.replace(/[^0-9]/ig,"");
		if(cmd.indexOf("推送切换") >= 0)
		{
			var ms = "现在推送状态为: ";
			if(TS == 1) {
				TS = 0;
				ms = ms + "无";
			}
			else {
				TS = 1;
				ms = ms + "有";
			}

			Log(ms, "#000000ff0000");
		}
	}
}
	
function main()  {
	//清理
	if(CleanLog){
		LogProfitReset();
		LogReset();
	}
	
	//局部变量申请
	var ticker0 = null;
	var price0 = 0;
	var priceLast = 0;
	var tickerCnt = 0;
	var records = null;
	var name0 = exchanges[0].GetName();
	var coin0 = exchanges[0].GetCurrency();
	
	//检查和设置交易所
	if(exchanges[0].GetName() == 'Futures_OKCoin') {
		Log(name0, coin0, "是:期货价格");
    	exchanges[0].SetContractType(_ContractType0);
    	exchanges[0].SetMarginLevel(_MarginLeve0);
	}
	else
		Log(name0, coin0, "是:现货价格");
	
	usdrate0 = exchanges[0].GetUSDCNY();
	rate0 = exchanges[0].GetRate();

	//设置汇率和日志,内部用量值
	if(_CType0 == 1){//要求使用美元
		if(rate0 == 1)	//当前人民币计价
			exchanges[0].SetRate(1/usdrate0);
		else
			exchanges[0].SetRate(1);
	}
	else			//要求使用人民币			
	{
		if(rate0 == 1)	//当前人民币计价
			exchanges[0].SetRate(1);
		else
			exchanges[0].SetRate(usdrate0);
	}
	
    Log(name0, _CType0 == 0 ? "计价货币: RMB" : "计价货币: USD");
    SetErrorFilter("502:|503:|network|timeout|WSARecv|Connect|GetAddr|no such|reset");
	EnableLogLocal(false);
	LoopInterval = Math.max(LoopInterval, 100);

	//初始化变量
    Log('当前机器人ID: ', _G(), '开始运行...');
	Log('当前告警推送状态: ', TS==0 ? '无' : '有', "#0000ff");
	Log('轮询周期: ', _N(LoopInterval / 1000.0, 1), '秒');
	Log('告警周期: 轮询', AlarmPeriod, '次告警一次 !');

	//初始化
	var rcd = exchange.GetRecords();
    while ((_Index != 3) && (!rcd || rcd.length < (Period + 20))) {
		rcd = exchange.GetRecords();
		Sleep(Interval);
    }
	ArrayLen = Math.max(rcd.length, (Period + 20));
	ArrayPrice = ARRAY_ZEROS(ArrayLen);

	while (true) {
		//获取命令
		getCmd();

		tickerCnt = tickerCnt + 1;
		//更新告警标准
		if(tickerCnt % (AlarmPeriod+1) == 0) {
			CanAlarm = true;
			tickerCnt = 0;
		}

		//{
		if(_Index == 0 || _Index == 1 || _Index == 2)
		{
			if(RecordsHand == true){
				//统计阶段
				var ticker0 = GetTicker(exchange);
				records = UpArrayNGetAvg(ticker0, ArrayPrice, ArrayLen);
			}
			else
		    	records = exchanges[0].GetRecords();
			
		    if (!records || records.length < (Period + 5)) {
				Sleep(Interval);
				if(records)
					Log(records[records.length - 1]);
		        continue;
		    }
			
			if(LastRcdTime == records[records.length - 1].Time)
				continue;
			else
				LastRcdTime = records[records.length - 1].Time;
		}
		else if(_Index == 3)
		{
			ticker0 = GetTicker(exchanges[0]);
			price0 = ticker0.Last;
		}

		var arr = null;
		if(_Index == 0)		//atr
			arr = TA.ATR(records, Period);
		else if(_Index == 1)	//rsi
			arr = TA.RSI(records, Period);
		else if(_Index == 2)	//boll
			arr = TA.BOLL(records, Period, 2);

		//打印
		if(_Index == 0){
			arrValue1 = arr[arr.length - 2];
			LogProfit(arrValue1, "时间: ", records[records.length - 1]);
		}
		else if(_Index == 1){
			arrValue1 = arr[arr.length - 2];
			LogProfit(arrValue1, "时间: ", records[records.length - 1].Time);
		}
		else if(_Index == 2){
			arrValue1 = arr[0][arr[0].length - 2] - arr[2][arr[2].length - 2];
			LogProfit(arrValue1, "时间: ", records[records.length - 1].Time, "upValue: ", arr[0][arr[0].length - 2], "downValue: ", arr[2][arr[2].length - 2]);
		}
		else if(_Index == 3){
			arrValue1 = price0;
			//var nowDate = new Date();
			LogProfit(arrValue1, "时间: ", new Date().getTime());
		}
		//}

		//推送
		if(TS) 
		{
			if(_Index == 0) {
				if(arrValue1 >= MaxVal && CanAlarm == true) {
					Log('ATR低值: ', arrValue1, '! 警戒值区间:<', MinVal, ', ', MaxVal,'> !@');
					CanAlarm = false;
				}
				if(arrValue1 <= MinVal && CanAlarm == true) {
					Log('ATR高值:', arrValue1, '! 警戒值区间:<', MinVal, ', ', MaxVal,'> !@');
					CanAlarm = false;
				}
			}
			else if(_Index == 1) {
				if(arrValue1 >= RsiMid && arrValue1Last1 <= RsiMid && arrValue1 > arrValue1Last1 && CanAlarm == true) {
					Log('RSI上穿越: 值 ---> ', arrValue1, '! 穿越值区间:<', arrValue1Last1, ', ', arrValue1,'> !@');
					CanAlarm = false;
				}
				if(arrValue1 <= RsiMid && arrValue1Last1 >= RsiMid && arrValue1 < arrValue1Last1 && CanAlarm == true) {
					Log('RSI下穿越: 值 ---> ', arrValue1, '! 警戒值区间:<', arrValue1Last1, ', ', arrValue1,'> !@');
					CanAlarm = false;
				}
			}
			else if(_Index == 2){
				if(arrValue1Last1 > arrValue1Last2 && arrValue1Last1 > arrValue1 && arrValue1Last2 != 0) {
					Log('BOLL值见顶:', arrValue1, '! 见顶区间:<', arrValue1Last2, ', ', arrValue1Last1, ', ', arrValue1,'> !@');
					CanAlarm = false;
				}
				if(arrValue1Last1 < arrValue1Last2 && arrValue1Last1 < arrValue1 && arrValue1Last2 != 0) {
					Log('BOLL值见底:', arrValue1, '! 见底区间:<', arrValue1Last2, ', ', arrValue1Last1, ', ', arrValue1,'> !@');
					CanAlarm = false;
				}
			}
			else if(_Index == 3){
				if(price0 >= MaxVal && priceLast <= MaxVal && price0 > priceLast && CanAlarm == true) {
					Log('价格升出区间: ', price0, '! 警戒值区间:<', MinVal, ', ', MaxVal,'> !@');
					CanAlarm = false;
				}
				if(price0 <= MinVal && priceLast >= MaxVal && price0 < priceLast && CanAlarm == true) {
					Log('价格跌出区间:', price0, '! 警戒值区间:<', MinVal, ', ', MaxVal,'> !@');
					CanAlarm = false;
				}
			}
		}

		//更新状态值
		if(_Index == 0){
			//if(arrValue1Last1 != arrValue1) 		arrValue1Last1 = arrValue1;
			//if(arrValue1Last2 != arrValue1Last1) 	arrValue1Last2 = arrValue1Last1;
		}
		else if(_Index == 1){
			if(arrValue1Last1 != arrValue1) 		arrValue1Last1 = arrValue1;
			//if(arrValue1Last2 != arrValue1Last1) 	arrValue1Last2 = arrValue1Last1;
		}
		else if(_Index == 2){
			if(arrValue1Last2 != arrValue1Last1) 	arrValue1Last2 = arrValue1Last1;// 2 <--- 1
			if(arrValue1Last1 != arrValue1) 		arrValue1Last1 = arrValue1;		// 1 <--- 0
		}
		else if(_Index == 3){
			if(priceLast != price0)					priceLast = price0;
		}

		Sleep(LoopInterval);
	}
}

