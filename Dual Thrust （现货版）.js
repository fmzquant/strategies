/*
策略出处: https://www.botvs.com/strategy/21583
策略名称: Dual Thrust （现货版）
策略作者: 小小梦
策略描述:

Dual Thrust 策略包含完整的图表显示, 图表动态更新，模板引用等功能, 可做学习模板使用.


参数            默认值    描述
------------  -----  ----------
NPeriod       4      计算周期
Ks            0.5    上轨系数
Kx            0.5    下轨系数
AmountOP      true   开仓量
Interval      2000   重试间隔(毫秒)
LoopInterval  3      轮询间隔(秒)
PeriodShow    500    图表最大显示K线柱数
maxProfit     0.5    止盈值
*/

var ChartCfg = {
    __isStock: true,
    title: {
        text: 'Dual Thrust 上下轨图'
    },
    yAxis: {
        plotLines: [{
            value: 0,
            color: 'red',
            width: 2,
            label: {
                text: '上轨',
                align: 'center'
            },
        }, {
            value: 0,
            color: 'green',
            width: 2,
            label: {
                text: '下轨',
                align: 'center'
            },
        }]
    },
    series: [{
        type: 'candlestick',
        name: '当前周期',
        id: 'primary',
        data: []
    }, {
        type: 'flags',
        onSeries: 'primary',
        data: [],
    }]
};

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

function _N(v) {
    return Decimal(v).toSD(4, 1).toNumber();
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

var isTrade_OC = false;
function onTick(exchange) {
    var records = exchange.GetRecords();
    if (!records || records.length <= NPeriod) {
        return;
    }
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
        if (LastBarTime > 0) {
            var PreBar = records[records.length - 2];
            chart.add(0, [PreBar.Time, PreBar.Open, PreBar.High, PreBar.Low, PreBar.Close], -1);
        } else {
            for (var i = Math.min(records.length, NPeriod * 3); i > 1; i--) {
                var b = records[records.length - i];
                chart.add(0, [b.Time, b.Open, b.High, b.Low, b.Close]);
            }
        }
        chart.add(0, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close]);
        ChartCfg.yAxis.plotLines[0].value = UpTrack;
        ChartCfg.yAxis.plotLines[1].value = DownTrack;
        ChartCfg.subtitle = {
            text: '上轨: ' + UpTrack + '  下轨: ' + DownTrack
        };
        chart.update(ChartCfg);
        chart.reset(PeriodShow);

        LastBarTime = Bar.Time;
    } else {
        chart.add(0, [Bar.Time, Bar.Open, Bar.High, Bar.Low, Bar.Close], -1);
    }

    LogStatus("Price:", Bar.Close, "Up:", UpTrack, "Down:", DownTrack, "Wins: ", Counter.w, "Losses:", Counter.l, "Date:", new Date(),"\n",NowPositionInfo);
    var msg;
    var fcolor = null;
    var ftitle = "";
    if(isTrade_OC === true){
        return;
    }

    if (State === STATE_IDLE || State === STATE_SHORT) {
        if (Bar.Close >= UpTrack) {
            msg  = '做多 触发价: ' + Bar.Close + ' 上轨:' + UpTrack;
            Log(msg);
            buyInfo = $.Buy(AmountOP); //Trade(State, STATE_LONG);
            State = STATE_LONG;
            Log("buyInfo:",buyInfo);
            if(buyInfo === null){
                return;
            }
            //chart.add(1, {x:Bar.Time, color: 'red', shape: 'flag', title: '多', text: msg});
            if(NowPositionInfo.direction === NONE){
                NowPositionInfo.direction = LONG; 
                fcolor = 'red';
                ftitle = '多';          
            }else if(NowPositionInfo.direction === SHORT){
                State = STATE_IDLE;
                NowPositionInfo.direction = NONE;
                Calculate();
                //Profit = (nowAccount.Stocks - beginAccount.Stocks) * (NowPositionInfo.direction === SHORT?nowDepth.Bids[0].Price : nowDepth.Asks[0].Price) + (beginAccount.Balance - nowAccount.Balance); //总盈亏
                InitAccount = _C(exchange.GetAccount);
                LogProfit(Profit,InitAccount);
                fcolor = 'blue';
                ftitle = '平';
                isTrade_OC = true;//当前bar 已经交易
            }
            chart.add(1, {x:Bar.Time, color: fcolor, shape: 'flag', title: ftitle, text: msg});
        }
    }

    if (State === STATE_IDLE || State === STATE_LONG) {
        if (Bar.Close <= DownTrack) {
            msg = '做空 触发价: ' + Bar.Close + ' 下轨:' + DownTrack;
            Log(msg);
            sellInfo = $.Sell(AmountOP); //Trade(State, STATE_SHORT);
            //chart.add(1, {x:Bar.Time, color: 'green', shape: 'circlepin', title: '空', text: msg});
            Log("sellInfo:",sellInfo);
            if(sellInfo === null){
                return;
            }
            State = STATE_SHORT;
            if(NowPositionInfo.direction === NONE){
                NowPositionInfo.direction = SHORT;
                fcolor = 'green';
                ftitle = '空';
            }else if(NowPositionInfo.direction === LONG){
                State = STATE_IDLE;
                NowPositionInfo.direction = NONE;
                Calculate();
                //Profit = (nowAccount.Stocks - beginAccount.Stocks) * (NowPositionInfo.direction === SHORT?nowDepth.Bids[0].Price : nowDepth.Asks[0].Price) + (beginAccount.Balance - nowAccount.Balance); //总盈亏
                InitAccount = _C(exchange.GetAccount);
                LogProfit(Profit,InitAccount);
                fcolor = 'blue';
                ftitle = '平';
                isTrade_OC = true;//当前bar 已经交易
            }
            chart.add(1, {x:Bar.Time, color: fcolor, shape: 'circlepin', title: ftitle, text: msg});
        }
    }

    if( (State === STATE_SHORT && NowPositionInfo.direction === SHORT ) || ( NowPositionInfo.direction === LONG && State === STATE_LONG) ){
        if(NowPositionInfo.floatProfit >= maxProfit ){
            //cover
            if(NowPositionInfo.direction === SHORT){
                buyInfo = $.Buy(NowPositionInfo.amount);
                if(buyInfo === null){
                    return;
                }
                State = STATE_IDLE;
                NowPositionInfo.direction = NONE;
                Calculate();
                InitAccount = _C(exchange.GetAccount);
                LogProfit(Profit,InitAccount);
                fcolor = 'blue';
                ftitle = '止盈 平仓';
                isTrade_OC = true;//当前bar 已经交易
            }
            if(NowPositionInfo.direction === LONG){
                sellInfo = $.Sell(NowPositionInfo.amount);
                if(sellInfo === null){
                    return;
                }
                State = STATE_IDLE;
                NowPositionInfo.direction = NONE;
                Calculate();
                InitAccount = _C(exchange.GetAccount);
                LogProfit(Profit,InitAccount);
                fcolor = 'blue';
                ftitle = '止盈 平仓';
                isTrade_OC = true;//当前bar 已经交易
            }
            chart.add(1, {x:Bar.Time, color: fcolor, shape: 'circlepin', title: ftitle, text: msg});
        }
    }
}

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


function onexit() {
    
}


var Profit = 0;
function Calculate(nowAccount,nowDepth){//计算并更新收益 、 浮动收益 、计算 持仓均价 、持仓量
    if(typeof(nowAccount) === 'undefined' ){
        nowAccount = _C(exchange.GetAccount);
        nowDepth = _C(exchange.GetDepth);
    }
    var diff_stocks = nowAccount.Stocks - InitAccount.Stocks;//币之差
    var diff_balance = nowAccount.Balance - InitAccount.Balance;//钱之差
    NowPositionInfo.avgPrice = Math.abs(diff_balance) / Math.abs(diff_stocks);
    //throw nowAccount.Stocks + "----" + nowAccount.Balance;//ceshi
    NowPositionInfo.amount = Math.abs(diff_stocks);
    NowPositionInfo.floatProfit = diff_balance + diff_stocks * (NowPositionInfo.direction === SHORT?nowDepth.Bids[0].Price : nowDepth.Asks[0].Price); //此次交易的浮动盈亏
    Profit = (nowAccount.Stocks - beginAccount.Stocks) * (NowPositionInfo.direction === SHORT?nowDepth.Bids[0].Price : nowDepth.Asks[0].Price) + (nowAccount.Balance - beginAccount.Balance); //总盈亏

    //更新入界面
}

function main() {
    CancelPendingOrders();
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
    while (true) {
        onTick(exchange);
        Calculate();
        Sleep(LoopInterval * 1000);
    }
}
