
> Name

Bit-Maker-30-套利-智能学习-USDT-本位-Binance-单平台-Arbitrage-USDT-Standard

> Author

AutoBitMaker-ABM

> Strategy Description

自学习网格：

自学习网格基于传统网格策略思路，但经过长期实盘+回测数据已对开仓逻辑，加仓时机，止盈位置，仓比，网格间距等几十种参数配置进行优化。实现了智能动态加仓模型和止盈位置，可以规避传统网格遭遇单边情况所需要承担的高风险，利用极低仓位，实现良好的收益回撤比。

策略配置参数极其丰富，团队会分配专人，根据客户风险和收益需求，为您的账户定制独有参数组合，并有全天候的人工+自动化行情监控。

我们自研独有指数交易集合，每个指数交易集合包含多种优质单交易对，每个交易对拥有独特权重占比。机器人对指数集合运行自学习网格策略，规避单一交易对单边风险。
除内置静态指数以外，我们为指数集定义多种选币模型的动态指数，精选各版块龙头币种组成指数级，风险进一步降低。

单账户可同时配置运行多个单币种交易对和指数交易对，既能分摊风险风险，同时助您在各种复杂市场行情中获利。

关于优化+风控：
历史回测服务器全年无休，自动回测所有最新数据，最优参数实时计算。
我们策略集群含50余台辅助服务器，以平均每秒2次的速度对账户的止损条件进行核对，在风险来临时能快速退出。

使用异构混合云的阿里云，亚马逊云，微软云架构，分离管理与执行节点，多节点间形成集群进行冗余性保障，安全有效的实现业务的流畅运转和资金安全保障

关于试用：
根据您的资金规模，我们提供2周左右的试跑。在试跑阶段，我们不抽佣金。
Bot 接管您的账户后，请勿自行做任何操作，当检测到其他任何手动仓位，所有 Bots 将立即退出。

关于佣金：
这取决于您的资金量。我们可以在试跑阶段后详谈。如果您能使用我们推荐链接建立账户，那么我们会收取很低的佣金。

联系方式：
WeChat：DuQi_SEC/autobitmaker/Shawn_gb2312/ABM_DD
Email:  liuhongyu.louie@autobitmaker.com/autobitmaker_master@autobitmaker.com

微信小程序提交试用申请：
![微信小程序码](https://www.fmz.cn![IMG](https://www.fmz.com/upload/asset/1281e73989f891ac26aa9.jpg))

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|baseOriginalBalance|1000|baseOriginalBalance|
|showInfo|false|showInfo|


> Source (javascript)

``` javascript
var chart = {
    __isStock: false,
    extension: {
        layout: 'single',
        col: 8,
        height: '300px'
    },
    tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M:%S, %A'
    },
    title: {
        text: 'Account_Balance_Detail'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'USDT'
        },
        opposite: false
    },
    series: []
};

function initChart() {
    chart.series.push({
        name: "Account_" + (Number(0)) + "_Detail",
        id: "Account_" + (Number(0)) + "_Detail",
        data: []
    });
}

function getChartPosition(avaliableMargin) {
    return {
        __isStock: false,
        extension: {
            layout: 'single',
            col: 4,
            height: '300px'
        },
        title: {
            text: '保证金占比(%)'
        },
        series: [{
            type: 'pie',
            name: 'one',
            data: [{
                name: '可用保证金(%)',
                y: avaliableMargin,
                color: '#dff0d8',
                sliced: true,
                selected: true
            }, {
                name: '保证金占用(%)',
                y: 100 - avaliableMargin,
                color: 'rgb(217, 237, 247)',
                sliced: true,
                selected: true
            }]
        }]
    };
}

function updateAccountDetailChart(ObjChart) {
    var nowTime = new Date().getTime();
    var account = exchanges[0].GetAccount();
    try {
        if (account !== null && account.Info !== null && account.Info.totalMarginBalance > 0) {
            ObjChart.add([0, [nowTime, Number(account.Info.totalMarginBalance)]]);
        }
    } catch (err) {
        Log('ERROR ' + account + ',' + err)
    }
}

function getBalance() {
    var currentBalance = 0;
    var account = exchanges[0].GetAccount();
    try {
        if (account !== null && account.Info !== null && account.Info.totalWalletBalance > 0) {
            currentBalance += Number(account.Info.totalWalletBalance);
        }
    } catch (err) {
        Log('ERROR ' + account + ',' + err)
    }
    Sleep(666);
    return Number(currentBalance).toFixed(6);
}

function getMarginBalance() {
    var currentBalance = 0;
    var account = exchanges[0].GetAccount();
    try {
        if (account !== null && account.Info !== null && account.Info.totalMarginBalance > 0) {
            currentBalance += Number(account.Info.totalMarginBalance);
        }
    } catch (err) {
        Log('ERROR ' + account + ',' + err)
    }
    Sleep(666);
    return Number(currentBalance).toFixed(6);
}

function printProfitInfo(currentBalance) {
    var profit = Number((currentBalance) - baseOriginalBalance).toFixed(5);
    var profitRate = Number((((currentBalance) - baseOriginalBalance) / baseOriginalBalance) * 100).toFixed(4);
    LogProfit(Number(profitRate), '&');
    Log('The current balance is ' + currentBalance + ', the profit is ' + profit + ', the profit rate is ' + profitRate + '%');
}

function printPositionInfo(exchangeInnerArray, totalProfitUSDT, totalProfitRate) {
    var totalProfit = 0.0
    var table = {
        type: 'table',
        title: 'POSITIONS',
        cols: ['Symbol', 'Type', 'AvgPrice', 'Position', 'Profit'],
        rows: []
    }
    if (showInfo) {
        table.rows.push([{
            body: '* 2020-09-07 之前一直人民币100万实盘运行，现策略更新，自动将合约闲置资金转入币安宝，即提高资金安全性，也可以双边获利，当合约所需保证金上涨或下降时，将自动调整两边余额。因当前FMZ无法监控币安宝余额，所以剥离10W人民币继续运行原策略以做展示。',
            colspan: 5
        }]);
    }
    table.rows.push([{
        body: '本策略是 USDT 本位，基于均值回归的币安合约套利策略，并以低风险辅助网格并行（BitMEX支持BTC本位）',
        colspan: 5
    }]);
    table.rows.push([{
        body: '套利主要币种是 BTC/USDT 和 ETH/USDT,网格覆盖币安永续合约全部币种交易对',
        colspan: 5
    }]);
    for (var index in exchangeInnerArray) {
        var position = exchangeInnerArray[index].GetPosition()
        for (var indexInner in position) {
            var profit = Number(position[indexInner].Info.unRealizedProfit);
            totalProfit = totalProfit + profit
            table.rows.push([position[indexInner].Info.symbol, (position[indexInner].Type == 1 ? 'SHORT #da1b1bab' : 'LONG #1eda1bab'), position[indexInner].Price, position[indexInner].Amount, profit.toFixed(5)]);
        }
        Sleep(168);
    }
    table.rows.push([{
        body: 'TOTAL PROFIT OF CURRENT POSITION',
        colspan: 4
    }, totalProfit.toFixed(6) + ' USDT']);
    table.rows.push([{
        body: 'TOTAL PROFIT',
        colspan: 4
    }, totalProfitUSDT + ' USDT']);
    table.rows.push([{
        body: 'TOTAL PROFIT RATE',
        colspan: 4
    }, totalProfitRate + ' %']);
    LogStatus('`' + JSON.stringify(table) + '`');
}

function main() {
    initChart();
    var ObjChart = Chart([chart, getChartPosition(100)]);
    while (true) {
        try {
            var currentBalance = getBalance();
            printProfitInfo(currentBalance);
            updateAccountDetailChart(ObjChart);
            for (var i = 0; i < 120; i++) {
                try {
                    var avaliableMargin = ((getMarginBalance()) / (getBalance())) * 100;
                    ObjChart.update([chart, getChartPosition(avaliableMargin)]);
                    var profit = Number((currentBalance) - baseOriginalBalance).toFixed(5);
                    var profitRate = Number((((currentBalance) - baseOriginalBalance) / baseOriginalBalance) * 100).toFixed(4);
                    printPositionInfo(exchanges, profit, profitRate);
                    Sleep(1000 * 120);
                } catch (errInner) {
                    throw errInner;
                }
            }
        } catch (err) {
            throw err;
        }
    }
}
```

> Detail

https://www.fmz.com/strategy/178712

> Last Modified

2021-01-07 08:40:45
