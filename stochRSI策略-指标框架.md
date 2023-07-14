
> Name

stochRSI策略-指标框架

> Author

小小梦

> Strategy Description

stochRSI指标策略



> Source (javascript)

``` javascript
/*参数
stochRSI  指标参数   数组     [14,14,3,3]
使用现货数字货币交易类库
*/
var stochRSI_P_arr = "[14,14,3,3]";


var Interval = 500;

var long = 1;
var free = 0;
var state = free; //每次开仓   平仓  重置 
var buyInfo = null; //每次平仓重置
var sellInfo = null; //每次开仓重置
var initAccount = null; //每次平仓重置
var beginAccount = null; //不重置
var Profit = 0; //已实现盈亏
var prefloatProfit = 0;//上次的浮动盈亏，滑动止盈 更新
var openBalance = 0;//开仓量
var isCover = false;

var NowPositionInfo = {//持仓信息， 每次平仓更新
    avgPrice: 0,
    amount: 0 ,
    floatProfit: 0
};

function openUpdate(){//开仓后的更新
    state = long;
    sellInfo = null;
}
function closeUpdate(){//平仓后的更新
    state = free;
    addLevel = 0;
    buyInfo = null;
    initAccount = _C(exchange.GetAccount);
    NowPositionInfo.avgPrice = 0;
    NowPositionInfo.amount = 0;
    NowPositionInfo.floatProfit = 0;
    isCover = true;
}

function Calculate(nowAccount,nowDepth){//计算并更新收益 、 浮动收益 、计算 持仓均价 、持仓量
    if(typeof(nowAccount) === 'undefined' ){
        nowAccount = _C(exchange.GetAccount);
        nowDepth = _C(exchange.GetDepth);
    }
    var diff_stocks = nowAccount.Stocks - initAccount.Stocks;//币之差
    var diff_balance = nowAccount.Balance - initAccount.Balance;//钱之差
    NowPositionInfo.avgPrice = Math.abs(diff_balance) / Math.abs(diff_stocks);
    NowPositionInfo.amount = Math.abs(diff_stocks);
    NowPositionInfo.floatProfit = diff_balance + diff_stocks * nowDepth.Bids[0].Price; //此次交易的浮动盈亏
    Profit = (initAccount.Stocks - beginAccount.Stocks) * nowDepth.Bids[0].Price + (initAccount.Balance - beginAccount.Balance); //实现盈亏

    //更新入界面
}

function LLV(array,period){
    if(!array || array.length - period < 0){
        throw "error:" + array;
    }
    var min = array[array.length - period];
    for(var i = array.length - period; i < array.length; i++){
        if( array[i] < min ){
            min = array[i];
        }
    }
    return min;
}

function HHV(array,period){
    if(!array || array.length - period < 0){
        throw "error:" + array;
    }
    var max = array[array.length - period];
    for(var i = array.length - period; i < array.length; i++){
        if( array[i] > max){
            max = array[i];
        }
    }
    return max;
}

function DeleteNullEle(initArr){
    var dealArr = [];
    var initArrLen = initArr.length;
    for(var i = 0,j = 0 ; i < initArrLen ; i++,j++){
        if(initArr[i] === null || isNaN(initArr[i]) ){
            j--;
            continue;
        }
        dealArr[j] = initArr[i];
    }
    return dealArr;
}

/*
LC := REF(CLOSE,1); //REF(C,1) 上一周期的收盘价
RSI:=SMA(MAX(CLOSE-LC,0),N,1)/SMA(ABS(CLOSE-LC),N,1) *100;
％K:     MA(RSI-LLV(RSI,M),P1)/MA(HHV(RSI,M)-LLV(RSI,M),P1)*100;  LLV（l,60）表示：检索60天内的最低价，可适应于检索任何股票
％D:MA(％K,P2);

LC := REF(CLOSE,1);
RSI:=SMA(MAX(CLOSE-LC,0),N,1)/SMA(ABS(CLOSE-LC),N,1) *100;
STOCHRSI:MA(RSI-LLV(RSI,M),P1)/MA(HHV(RSI,M)-LLV(RSI,M),P1)*100;
*/
function FstochRSI(records,n,m,p1,p2){
    var len = records.length;
    //var LC = records[len-2];//上一周期收盘价
    //var rsi = TA.RSI(records,n);// RSI 数组   ，talib
    var rsi = talib.RSI(records,n);
    rsi = DeleteNullEle(rsi);//ceshi
    //Log("rsi:",rsi) //测试
    //Log("rsi:",rsi);//ceshi
    //throw "stop";//ceshi
    table.e5 = "rsi :" + rsi[rsi.length-1] + "rsi[-1]:" + rsi[rsi.length-2];//ceshi

    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var arr4 = [];
    var rsi_a = [];
    var rsi_b = [];
    var k = [];
    var d = null;

    /*不包含当前柱
    for(var a = 0 ;a < rsi.length ; a++ ){//改造 不用 LLV
        for(var aa = 0 ; aa <= a; aa++ ){
            rsi_a.push(rsi[aa]);
        }
        arr1.push(rsi[a] - TA.Lowest(rsi_a,m));
    }
    for(var b = 0 ;b < rsi.length ; b++ ){//改造 不用 HHV
        for(var bb = 0 ; bb <= b; bb++ ){
            rsi_b.push(rsi[bb]);
        }
        arr2.push(TA.Highest(rsi_b,m) - TA.Lowest(rsi_b,m));
    }
    */
    for(var a = 0 ;a < rsi.length ; a++ ){//改造 不用 LLV
        if(a < m){
            continue;
        }
        for(var aa = 0 ; aa <= a; aa++ ){
            rsi_a.push(rsi[aa]);
        }
        arr1.push(rsi[a] - LLV(rsi_a,m));
    }
    for(var b = 0 ;b < rsi.length ; b++ ){//改造 不用 HHV
        if(b < m){
            continue;
        }
        for(var bb = 0 ; bb <= b; bb++ ){
            rsi_b.push(rsi[bb]);
        }
        arr2.push(HHV(rsi_b,m) - LLV(rsi_b,m));
    }

    arr1 = DeleteNullEle(arr1);
    arr2 = DeleteNullEle(arr2);
    //Log("arr1:",arr1.length,"-",arr1);//ceshi
    //Log("arr2:",arr2.length,"-",arr2);//ceshi

    arr3 = talib.MA(arr1,p1);
    arr4 = talib.MA(arr2,p1);

    arr3 = DeleteNullEle(arr3);
    arr4 = DeleteNullEle(arr4);

    //Log("ceshi");//ceshi
    var c = 0;
    var diff = 0;
    if(arr3.length !== arr4.length){//实测 长度不相等
        throw "error: ！=" + arr3.length + "----" + arr4.length;
        diff = arr4.length - arr3.length; //example   diff  =   10  -   6
    }else{
        //throw "error:" + arr3.length + "----" + arr4.length;
    }

    for( ;c < arr3.length ; c++ ){
        k.push(arr3[c] / arr4[c + diff] * 100);
    }
    
    d = talib.MA(k,p2);

    return [k,d,rsi];
}

function Loop(){//循环主体
    /*
    var go_account = exchange.Go("GetAccount");
    var go_records = exchange.Go("GetRecords");
    var go_depth = exchange.Go("GetDepth");

    var account = go_account.wait(1000);
    var records = go_records.wait(1000);
    var depth = go_depth.wait(1000);
    
    if(account === null || records === null || depth === null){
        //显示异常
        return;
    }
    */
    //
    var account = _C(exchange.GetAccount);
    var records = _C(exchange.GetRecords);
    var depth = _C(exchange.GetDepth);
    //测试

    var len = records.length - 1;

    if(records.length < array_P[0] || records.length < array_P[1] || records.length < array_P[2] || records.length < array_P[3] ){
        //输出到状态栏表格，显示K线长度不足
        msg = "K线长度不足，获取中...";
        return;
    }
    
    //*
    var records_close = [];
    for(var i = 0; i <= len; i++){
        records_close.push(records[i].Close);
    }
    //*/

    msg = "K line `s length:" + (len + 1);

    //var ma = TA.MA(records,3);//测试 使用  MA3
    
    //var stochRSI = talib.STOCHRSI(records,array_P[0],array_P[1],array_P[2],array_P[3]);
    //var stochRSI = talib.STOCHRSI(records_close,14,3,3,3);
    var stochRSI = FstochRSI(records,14,14,3,3);
    var fastLine = stochRSI[0]; //stochrsi
    var slowLine = stochRSI[1]; // ma(k,3)
    
    //Log("fastLine:",fastLine);//ceshi
    //Log("slowLine:",slowLine);//ceshi
    //var slowLine = ma;
    //var rsi = stochRSI[2];
    
    $.Draw(records);
    $.AddZhiBiao(fastLine,records,1);
    $.AddZhiBiao(slowLine,records,2);
    if(isFirst === true){
        $.SignOP((new Date()).getTime(),null,null,3,"图表显示启动！");// 测试标记 自定义信息 到图表上
        Log(array_P[0],array_P[1],array_P[2],array_P[3],typeof(array_P[3]));//ceshi
        isFirst = false;
    }
    table.a4 = "fastLine[len]:" + _N(fastLine[fastLine.length-1],2);
    table.b4 = "slowLine[len]:" + _N(slowLine[slowLine.length-1],2);

    table.a5 = "fastLine[len-1]" + _N(fastLine[fastLine.length-2],2);
    table.b5 = "slowLine[len-1]" + _N(slowLine[slowLine.length-2],2);
    table.c5 = "fastLine[len-2]" + _N(fastLine[fastLine.length-3],2);
    table.d5 = "slowLine[len-2]" + _N(slowLine[slowLine.length-3],2);
    //table.e5 = "rsi:" + rsi[rsi.length - 1] + "rsi[-2]:" + rsi[rsi.length - 2] + "rsi[-3]:" + rsi[rsi.length - 3];


    table.b1 = "stock:" + account.Stocks + "#ff00ff";
    table.c1 = "Fstock:" + account.FrozenStocks + "#ff00ff";
    table.d1 = "balance:" + account.Balance + "#ff00ff";
    table.e1 = "Fbalance:" + account.FrozenBalance + "#ff00ff";
    table.b2 = "open:" + records[len].Open;
    table.c2 = "high:" + records[len].High;
    table.d2 = "low:" + records[len].Low;
    table.e2 = "close:" + records[len].Close;
    table.b3 = "bids[0].price:" + depth.Bids[0].Price;
    table.c3 = "bids[0].amount:" + depth.Bids[0].Amount;
    table.d3 = "asks[0].price:" + depth.Asks[0].Price;
    table.e3 = "asks[0].amount:" + depth.Asks[0].Amount;

    table.c4 = "avgPrice:" + NowPositionInfo.avgPrice;
    table.d4 = "amount:" + NowPositionInfo.amount;
    table.e4 = "floatProfit:" + NowPositionInfo.floatProfit;

    
    if(isCover === true){
        LogProfit(Profit);
        isCover = false;
    }
    Calculate();//
    //Log("ceshi2");//ceshi2
    $.UpDateChart(records);
    //Log("ceshi2");//ceshi2
}

var table = null;
var array_P = null;
var msg = "";//显示在状态栏表格头部的 消息
var isFirst = true;

function main(){
    //初始化
    beginAccount = _C(exchange.GetAccount);//程序开始运行时的初始账户信息
    initAccount = beginAccount;//每次开仓前的账户信息
    table = $.TableInit(5,6);
    table.a1 = "account:" + "#ff00ff";
    table.a2 = "records[length-1]:";
    table.a3 = "depth.Bids[0]/Asks[0]:";
    table.a0 = "beginAccount:";
    table.b0 = "stock:" + beginAccount.Stocks;
    table.c0 = "Fstock:" + beginAccount.FrozenStocks;
    table.d0 = "balance:" + beginAccount.Balance;
    table.e0 = "Fbalance:" + beginAccount.FrozenBalance;

    array_P = JSON.parse(stochRSI_P_arr);// 解析  stochRSI 参数
    

    while(true){
        Loop();
        $.UpDateLogStatus(msg);
        msg = "";
        Sleep(Interval);
    }
}

/*任务
1、UI界面显示完善
2、交互模块写好
3、交易逻辑
4、参数设置
5、可视图表
*/
```

> Detail

https://www.fmz.com/strategy/20383

> Last Modified

2016-08-22 19:23:00
