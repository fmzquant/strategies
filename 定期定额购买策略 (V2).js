/*
策略出处: https://www.botvs.com/strategy/16454
策略名称: 定期定额购买策略 (V2)
策略作者: wojiushizhemedeshuaiqidemeinanzi
策略描述:

简单的才是最好的
本人BTC死多
本策略适合用小钱长期投入
每两天购买100块钱
增加了收益率显示


参数               默认值  描述
------------  ------  -------
LoopInterval  172800  时间间隔（秒）
Money            100  定期购买金额
*/

//var LoopInterval = 24 * 3600; //定期购买时间 秒
var InitAccount = null; //初始账户信息
var Interval = 60000; //轮询间隔
//var Money = 100; //定额购买的金钱
var TotalMoney = 0; //已用总金额
var Profit = 0; //目前收益

function AdjustFloat(v) {
    return Math.floor(v * 1000) / 1000;
}

function GetAccount() {
    var account;
    while (!(account = exchange.GetAccount())) {
        Sleep(Interval);
    }
    return account;
}

function GetTicker() {
    var ticker;
    while (!(ticker = exchange.GetTicker())) {
        Sleep(Interval);
    }
    return ticker;
}

function CancelPendingOrders() {
    var ret = false;
    while (true) {
        var orders = null;
        while (!(orders = exchange.GetOrders())) {
            Sleep(Interval);
        }

        if (orders.length == 0) {
            return ret;
        }

        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id);
            ret = true;
            if (j < (orders.length - 1)) {
                Sleep(Interval);
            }
        }
    }
    return ret;
}

function Buy() {
    var STATE_WAIT_IDLE = 0;
    var STATE_WAIT_BUY = 1;
    var State = STATE_WAIT_IDLE;
    var opSuccess = false;
    while (!opSuccess) {
        var Ticker = GetTicker();
        var Price = Ticker.Sell;
        var Amount = AdjustFloat(Money / Price);
        if (State != STATE_WAIT_IDLE) {
            opSuccess = !CancelPendingOrders();
            State = STATE_WAIT_IDLE;
            if (opSuccess) { break; }
        }
        else if (Amount >= exchange.GetMinStock()) {
        exchange.Buy(Price, Amount);
        State = STATE_WAIT_BUY;
        Sleep(Interval);
        }
    }
    return opSuccess;
}

function onTick() {
    Buy();
    TotalMoney = TotalMoney + Money;
    var NowAccount = GetAccount();
    var Ticker = GetTicker();
    Profit = ((NowAccount.Stocks * Ticker.Buy) - TotalMoney);
    chart.add(0,[(new Date()).getTime(), AdjustFloat(Profit*100/TotalMoney)]); 
    LogProfit(AdjustFloat(Profit));
//    LogProfit(AdjustFloat(Profit/TotalMoney));
    Log("Profit: " + AdjustFloat(Profit) + " Percents:" + AdjustFloat(Profit*100/TotalMoney) + "% " + " BTC:" + NowAccount.Stocks + " NowPrice:" + AdjustFloat(Ticker.Buy) + " TotalCost: " + TotalMoney);
}

//画图***************
var ChartObj = {//画图
    tooltip: {xDateFormat: '%Y-%m-%d %H:%M:%S, %A',enabled:true,valueDecimals:2,valueSuffix:'%'}, //提示框  就是鼠标在线上时 显示的一个 框框 里面有一些内容，这里是设置提示框的格式
    chart: { zoomType:'x',panning:true },//图表缩放  
    title: { text: '收益率 %'}, //标题
    rangeSelector: { //范围 区域 选择 
            buttons:  [{type: 'hour',count: 1, text: '1h'}, {type: 'hour',count: 3, text: '3h'}, {type: 'hour', count: 8, text: '8h'}, {type: 'all',text: 'All'}],
            selected: 0,
            inputEnabled: false
        },
    subtitle: {text: ""},//副标题
    xAxis:{type: 'datetime'}, //设置 X轴  的数值为时间类型
    yAxis: [{
            title: {text: '收益率 %'},//标题
            style: {color: '#4572A7'},//样式 
            //opposite: false  //生成右边Y轴
        }
    ],
    series: [//系列
        {name:'收益率',dataLables:{enabled:true,format:'{y} %'},type:'spline',yAxis:0,data:[]} //该图标只用到一条曲线  ，所以 只用设置一个数据序列
        ]                  
};
var chart = Chart(ChartObj);  //初始化var

function main() {
    SetErrorFilter("502:|503:|tcp|character|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused");
    InitAccount = GetAccount();
    LoopInterval = Math.max(LoopInterval, 1);
    chart.update(ChartObj); //更新
    chart.reset(); //清空图表
    while (1) {
        onTick();
        Sleep(LoopInterval * 1000);
    }
}
