/*
策略出处: https://www.botvs.com/strategy/22759
策略名称: 震荡突破策略 (删减B值触发平仓、动态调整触发值 优化ing)
策略作者: 小小梦
策略描述:

1、吃单优化为在触发值上挂单
2、止损仓  在被套的情况下开启止损仓。
3、动态阀值
4、加入 STOCHRSI 指标


参数                默认值    描述
----------------  -----  -------------
NPeriod           4      计算周期
Ks                0.5    上轨系数
Kx                0.5    下轨系数
AmountOP          true   开仓量
Interval          2000   重试间隔(毫秒)
LoopInterval      3      轮询间隔(秒)
PeriodShow        500    图表最大显示K线柱数
InitMoveStop      -20    初始止损值
step              5      滑动止损步长
isShowTouchLine   true   显示触发值
isCurrentKLineOP  true   是否允许当前K线平仓后交易
*/

var ChartCfg = {
    __isStock: true,
    title: {
        text: '震荡突破策略'
    },
    yAxis: [{
            title: {text: 'KL'},//标题
            style: {color: '#4572A7'},//样式 
            opposite: false,  //生成右边Y轴
            plotLines: [{
            value: 0,
            color: 'red',
            width: 2,
            label: {
                text: '触发值A',
                align: 'center'
            },
            }, {
            value: 0,
            color: 'green',
            width: 2,
            label: {
                text: '触发值B',
                align: 'center'
                },
            }]
        },
        {
            title:{text: "STOCHRSI"},
            opposite: true  //生成右边Y轴  ceshi
        }
    ],
    series: [{
        type: 'candlestick',
        name: '当前周期',
        id: 'primary',
        data: []
    }, {
        type: 'flags',
        onSeries: 'primary',
        data: [],
    },{
        type: 'spline',
        yAxis: 1,
        name: 'F',
        data: []
    },{
        type: 'spline',
        yAxis: 1,
        name: 'S',
        data: []
    }]
};

/*
plotLines: [{
            value: 0,
            color: 'red',
            width: 2,
            label: {
                text: '触发值A',
                align: 'center'
            },
        }, {
            value: 0,
            color: 'green',
            width: 2,
            label: {
                text: '触发值B',
                align: 'center'
            },
        }]
*/
var STATE_IDLE = 0;
var STATE_LONG = 1;
var STATE_SHORT = 2;
var State = STATE_IDLE;

var LastBarTime = 0;
var UpTrack = 0;
var BottomTrack = 0;
var chart = null;
var InitAccount = null;
var Counter = {
    w: 0,
    l: 0
};

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

function FstochRSI(records,n,m,p1,p2){
    var len = records.length;
    //var LC = records[len-2];//上一周期收盘价
    //var rsi = TA.RSI(records,n);// RSI 数组   ，talib
    var rsi = talib.RSI(records,n);
    rsi = DeleteNullEle(rsi);//ceshi

    var arr1 = [];
    var arr2 = [];
    var arr3 = [];
    var arr4 = [];
    var rsi_a = [];
    var rsi_b = [];
    var k = [];
    var d = null;

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

function CancelPendingOrders() {
    while (true) {
        var orders = exchange.GetOrders();
        for (var i = 0; i < orders.length; i++) {
            exchange.CancelOrder(orders[i].Id);
            Sleep(Interval);
        }
        if (orders.length === 0) {
            break;
        }
    }
}

var isBegin = false;
var isTrade_OC = false;
var stochrsiFast = 0;
var stochrsiSlow = 0;
function onTick(exchange) {
    var records = exchange.GetRecords();
    if (!records || (records.length < 50 || records.length <= NPeriod)) { //默认 STOCHRSI 指标 最大周期14 限制
        return;
    }
    //Log(records.length);//ceshi
    //throw "stop"; //ceshi
    
    var stochrsi = FstochRSI(records,14,14,3,3); // 计算 STOCHRSI 指标
    var Bar = records[records.length - 1];
    if (LastBarTime !== Bar.Time) {
        isTrade_OC = false;
        var HH = TA.Highest(records, NPeriod, 'High');
        var HC = TA.Highest(records, NPeriod, 'Close');
        var LL = TA.Lowest(records, NPeriod, 'Low');
        var LC = TA.Lowest(records, NPeriod, 'Close');

        var Range = Math.max(HH - LC, HC - LL);
        
        UpTrack = _N(Bar.Open + (Ks * Range));
        DownTrack = _N(Bar.Open - (Kx * Range));
        //更新触发值
        table.a3 = UpTrack;
        table.b3 = DownTrack;
        
        if (LastBarTime > 0) {
            var PreBar = records[records.length - 2];
            chart.add(0, [PreBar.Time, PreBar.Open, PreBar.High, PreBar.Low, PreBar.Close], -1);
            chart.add(2,[records[records.length - 2].Time,stochrsi[0][stochrsi[0].length - 2]], -1); //增加 快线
            chart.add(3,[records[records.length - 2].Time,stochrsi[1][stochrsi[1].length - 2]], -1); //增加 慢线
        } else {
            for (var i = Math.min(records.length, NPeriod * 3); i > 1; i--) {
                var b = records[records.length - i];
                //Log(stochrsi[0][stochrsi[0].length - 1],stochrsi[1][stochrsi[1].length - 1]);//ceshi
                chart.add(0, [b.Time, b.Open, b.High, b.Low, b.Close]);
                if(isBegin === false){
                    chart.add(1, {x:(new Date()).getTime(), color: "black", shape: 'flag', title: "title", text: "开始"});
                    isBegin = true;
                }
                //chart.add(2,[records[records.length - 1].Time,stochrsi[0][stochrsi[0].length - 1]]); //增加快线
                //chart.add(3,[records[records.length - 1].Time,stochrsi[1][stochrsi[1].length - 1]]); //增加慢线
            }
        }
        chart.add(0, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close]);
        chart.add(2,[records[records.length - 2].Time,stochrsi[0][stochrsi[0].length - 2]]); //增加 快线
        chart.add(3,[records[records.length - 2].Time,stochrsi[1][stochrsi[1].length - 2]]); //增加 慢线
        if(isShowTouchLine === true){//是否显示触发值
            ChartCfg.yAxis[0].plotLines[0].value = UpTrack;
            ChartCfg.yAxis[0].plotLines[1].value = DownTrack;
        }
        ChartCfg.subtitle = {
            text: '触发值A： ' + UpTrack + '  触发值B： ' + DownTrack
        };
        chart.update(ChartCfg);
        //chart.reset(PeriodShow); //ceshi  取消
        LastBarTime = Bar.Time;
    } else {
        chart.add(0, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close], -1);
        chart.add(2,[records[records.length - 1].Time,stochrsi[0][stochrsi[0].length - 1]], -1); // 增加 快线
        chart.add(3,[records[records.length - 1].Time,stochrsi[1][stochrsi[1].length - 1]], -1); // 增加 慢线
    }
    //Log(stochrsi);//ceshi 
    //LogStatus("Price:", Bar.Close, "Up:", UpTrack, "Down:", DownTrack, "Wins: ", Counter.w, "Losses:", Counter.l, "Date:", new Date(),"\n",NowPositionInfo);
    var msg;
    var fcolor = null;
    var ftitle = "";
    stochrsiFast = table.a6 = stochrsi[0][stochrsi[0].length - 1];
    stochrsiSlow = table.b6 = stochrsi[1][stochrsi[1].length - 1];
    if((isTrade_OC === true && isCurrentKLineOP === false) && ( isTurnOP_Long === false && isTurnOP_Short === false ) ){//是否允许当前K线交易,排除反手的条件
        return;
    }
    

    if (State === STATE_IDLE) {
        if ( isTurnOP_Long || (Bar.Close >= UpTrack && stochrsiFast < 30 && isTurnOP_Short === false) ) { // 加入STOCHRSI 控制
            msg  = '做多 触发价: ' + Bar.Close + ' 触发值A:' + UpTrack + "stochrsiFast" + stochrsiFast;
            if(isTurnOP_Long === true){
                msg = "反手做多" + msg + "#FF0000";
            }
            Log(msg);
            buyInfo = $.Buy(AmountOP);
            State = STATE_LONG;
            Log("buyInfo:",buyInfo);
            if(buyInfo === null){
                return;
            }
            if(NowPositionInfo.direction === NONE){
                NowPositionInfo.direction = LONG; 
                fcolor = 'red';
                ftitle = 'L'; 
                moveStop = InitMoveStop; //设置 默认止损额度
                moveLevel = 0;
                lastMoveStop = 0;
            }
            chart.add(1, {x:(new Date()).getTime(), color: fcolor, shape: 'flag', title: ftitle, text: msg});
        }
    }

    if (State === STATE_IDLE) {
        if ( isTurnOP_Short || (Bar.Close <= DownTrack && stochrsiFast > 70 && isTurnOP_Long === false) ) {//是否触发 反手  加入 STOCHRSI 控制
            msg = '做空 触发价: ' + Bar.Close + ' 触发值B:' + DownTrack + "stochrsiFast" + stochrsiFast;
            if(isTurnOP_Short === true){
                msg = "反手做空" + msg + "#FF0000";
            }
            Log(msg);
            sellInfo = $.Sell(AmountOP);
            Log("sellInfo:",sellInfo);
            if(sellInfo === null){
                return;
            }
            State = STATE_SHORT;
            if(NowPositionInfo.direction === NONE){
                NowPositionInfo.direction = SHORT;
                fcolor = 'green';
                ftitle = 'S';
                moveStop = InitMoveStop; //设置默认止损额度 
                moveLevel = 0;
                lastMoveStop = 0;
            }
            chart.add(1, {x:(new Date()).getTime(), color: fcolor, shape: 'circlepin', title: ftitle, text: msg});
        }
    }
    //滑动止损
    if( (State === STATE_SHORT && NowPositionInfo.direction === SHORT ) || ( NowPositionInfo.direction === LONG && State === STATE_LONG) ){
        if(NowPositionInfo.floatProfit > step){//滑动止损 结束后  lastMoveStop 要赋值 0 ， moveLevel 要赋值 0 , moveStop 重新赋值初始止损值
            moveStop = 0;
            if(NowPositionInfo.floatProfit - lastMoveStop > step){
                lastMoveStop = (++moveLevel) * step;
            }
        }
        table.b5 = "lastLine" + lastMoveStop + ", Level" + moveLevel + " ,default" + moveStop;
        //Log("NowPositionInfo",NowPositionInfo,"止损",moveStop + moveLevel * step); //ceshi
        if(NowPositionInfo.floatProfit <= moveStop + moveLevel * step ){
            //cover
            //Log("NowPositionInfo",NowPositionInfo,"止损",moveStop + moveLevel * step); //ceshi
            if(NowPositionInfo.direction === SHORT){//空仓止损
                buyInfo = $.Buy(NowPositionInfo.amount);
                if(buyInfo === null){
                    return;
                }
                isTurnOP_Short = false;//重置 反手条件为false
                isTurnOP_Long = false;//重置 反手条件为false
                State = STATE_IDLE;
                Log("止损平仓",NowPositionInfo,"moveStop + moveLevel * step",moveStop + moveLevel * step,_C(exchange.GetTicker),buyInfo);//ceshi
                CalculateCounter(buyInfo);//处理Counter 计数
                NowPositionInfo.direction = NONE;
                Calculate();
                InitAccount = _C(exchange.GetAccount);
                LogProfit(Profit,InitAccount);
                fcolor = 'blue';
                ftitle = '止损 平仓';
                msg = "moveLevel:" + moveLevel + ",  lastMoveStop:" + lastMoveStop;
                isTrade_OC = true;//当前bar 已经交易
                if(moveStop !== 0){//突破止损反手
                    isTurnOP_Long = true;
                }
            }
            if(NowPositionInfo.direction === LONG){//多仓止损
                sellInfo = $.Sell(NowPositionInfo.amount);
                if(sellInfo === null){
                    return;
                }
                isTurnOP_Long = false;//重置反手条件为false
                isTurnOP_Short = false;//重置反手条件为false
                State = STATE_IDLE;
                Log("止损平仓",NowPositionInfo,"moveStop + moveLevel * step",moveStop + moveLevel * step,_C(exchange.GetTicker),sellInfo);//ceshi
                CalculateCounter(sellInfo);//处理Counter 计数
                NowPositionInfo.direction = NONE;
                Calculate();
                InitAccount = _C(exchange.GetAccount);
                LogProfit(Profit,InitAccount);
                fcolor = 'blue';
                ftitle = '止损 平仓';
                msg = "moveLevel:" + moveLevel + ",  lastMoveStop:" + lastMoveStop;
                isTrade_OC = true;//当前bar 已经交易
                if(moveStop !== 0){//突破止损反手
                    isTurnOP_Short = true;
                }
            }
            chart.add(1, {x:(new Date()).getTime(), color: fcolor, shape: 'circlepin', title: ftitle, text: msg});
        }
    }
}

//反手
var isTurnOP_Long = false;
var isTurnOP_Short = false;

//滑动止损 参数
//var step = 5; //滑动步长
var moveStop = InitMoveStop; //初始止损
var lastMoveStop = 0; //上次止损挡位
var moveLevel = 0; //止损等级
//var OpAmount = 1;//ceshi
//var maxProfit = 0.2;
var buyInfo = null;
var sellInfo = null;
var SHORT = 2;
var LONG = 1;
var NONE = 0;
var NowPositionInfo = { // 
    avgPrice : 0 ,
    amount : 0,
    floatProfit : 0,
    direction : 0  // 0 未持仓 ， 1多仓 ， 2空仓
};


function CalculateCounter(CoverInfo) {
    if(NowPositionInfo.direction === STATE_LONG && (CoverInfo.price - NowPositionInfo.avgPrice > 0)){//处理多仓
        Counter.w++;
    }else if(NowPositionInfo.direction === STATE_LONG){
        Counter.l++;
    }
    if(NowPositionInfo.direction === STATE_SHORT && (NowPositionInfo.avgPrice - CoverInfo.price > 0)){//处理空仓
        Counter.w++;
    }else if(NowPositionInfo.direction === STATE_SHORT){
        Counter.l++;
    }
    table.b4 = Counter; //更新 Counter
}


var Profit = 0;
function Calculate(nowAccount,nowDepth){//计算并更新收益 、 浮动收益 、计算 持仓均价 、持仓量
    if(typeof(nowAccount) === 'undefined' ){
        nowAccount = _C(exchange.GetAccount);
        nowDepth = _C(exchange.GetDepth);
    }
    var diff_stocks = nowAccount.Stocks - InitAccount.Stocks;//币之差
    var diff_balance = nowAccount.Balance - InitAccount.Balance;//钱之差
    NowPositionInfo.avgPrice = _N(Math.abs(diff_balance) / Math.abs(diff_stocks),5);
    //throw nowAccount.Stocks + "----" + nowAccount.Balance;//ceshi
    NowPositionInfo.amount = _N(Math.abs(diff_stocks),5);
    NowPositionInfo.floatProfit = _N(diff_balance + diff_stocks * (NowPositionInfo.direction === LONG?nowDepth.Bids[0].Price : nowDepth.Asks[0].Price),5); //此次交易的浮动盈亏
    Profit = (nowAccount.Stocks - beginAccount.Stocks) * (NowPositionInfo.direction === LONG?nowDepth.Bids[0].Price : nowDepth.Asks[0].Price) + (nowAccount.Balance - beginAccount.Balance); //总盈亏
    table.b1 = nowAccount;//更新当前的账户信息
    table.a5 = NowPositionInfo;
    //更新入界面
}

var table = null;
function main() {
    CancelPendingOrders();
    _CInterval = 200;
    InitAccount = exchange.GetAccount();//上次平仓后账户信息
    beginAccount = InitAccount; //启动时账户信息
    LoopInterval = Math.min(1, LoopInterval);
    //清空
    LogReset();
    LogProfitReset();
    chart = Chart(ChartCfg);
    chart.reset();

    Log('交易平台:', exchange.GetName(), InitAccount);
    LogStatus("Ready...");
    Log(InitAccount);

    LoopInterval = Math.max(LoopInterval, 1);
    //初始化表格
    table = $.TableInit(2,7);
    table.a0 = "初始账户：↓";
    table.a1 = beginAccount;
    table.b0 = "当前账户：↓";
    table.a2 = "触发值A：↓";
    table.b2 = "触发值B：↓";
    table.a4 = "NowPositionInfo:↓";
    //table.b4 = "stop";
    //table.a5 = "Counter:";
    

    var beginTime = 0;
    while (true) {
        beginTime = (new Date()).getTime();
        onTick(exchange);
        /* //ceshi
        if(NowPositionInfo.floatProfit < -5){
            Log("ticker:",_C(exchange.GetTicker),NowPositionInfo);
        }
        //ceshi
        */
        Calculate();
        $.UpdateLogStatus("loop used time:" + ((new Date()).getTime() - beginTime) + "ms");
        Sleep(LoopInterval * 1000);
    }
}

/*
0.是否当前K线允许交易 处理还有问题
1.触发平仓触发值，导致平仓，是否增加反转。
2. 计算浮动盈亏的函数
//改进
1、动态 触发值调整，根据波动率
2、参数 步长 、系数、试试 本K 重复开仓选项
3、双仓
*/
