
> Name

Bit-Maker-现货USDT等额监控

> Author

AutoBitMaker-ABM

> Strategy Description

**AutoBitMaker** 目前正式推出无风险套利策略。
策略原理为现货和合约对冲，这个过程也可以手动完成。
但是相对于手动操作，BOT会捕捉市场所有交易对的利润空间，每天成交上百次。更加释放您的双手，降低市场的风险。

当前代码仅为账号监控，源码公布，大家可自行检查，或者取用。
监控现货 USDT价值。

我们是 **AutoBitMaker**，简称 **ABM Capital**，请大家仔细鉴别团队名字，微信号，以辨别真伪。
我们暂时只通过WeChat，Email的联系方式与国内客户沟通，不使用QQ等其他方式。

**ABM 团队**目前提供3种类型策略
* 合约交易
* 现货交易
* 套利交易

自学习网格基于传统网格策略思路，但经过长期实盘+回测数据已对开仓逻辑，加仓时机，止盈位置，仓比，网格间距等几十种参数配置进行优化。实现了智能动态加仓模型和止盈位置，可以规避传统网格遭遇单边情况所需要承担的高风险，利用极低仓位，实现良好的收益回撤比。

策略配置参数极其丰富，团队会分配专人，根据客户风险和收益需求，为您的账户定制独有参数组合，并有全天候的人工+自动化行情监控。

我们自研独有指数交易集合，每个指数交易集合包含多种优质单交易对，每个交易对拥有独特权重占比。机器人对指数集合运行自学习网格策略，规避单一交易对单边风险。
除内置静态指数以外，我们为指数集定义多种选币模型的动态指数，精选各版块龙头币种组成指数级，风险进一步降低。

单账户可同时配置运行多个单币种交易对和指数交易对，既能分摊风险风险，同时助您在各种复杂市场行情中获利。

目前团队策略服务器集群已达80台，另有50余台支撑服务器，以平均每秒2次的速度对账户的止损条件进行核对，在风险来临时能快速退出。

使用异构混合云的阿里云，亚马逊云，微软云架构，分离管理与执行节点，多节点间形成集群进行冗余性保障，安全有效的实现业务的流畅运转和资金安全保障

关于试用：
根据您的资金规模，我们提供2周左右的试跑。在试跑阶段，我们不抽佣金。
Bot 接管您的账户后，请勿自行做任何操作，当检测到其他任何手动仓位，所有 Bots 将立即退出。

关于佣金：
这取决于您的资金量。我们可以在试跑阶段后详谈。如果您能使用我们推荐链接建立账户，那么我们会收取很低的佣金。

联系方式：
1. 全国均可面谈
2. WeChat：DuQi_SEC/autobitmaker/autobitmaker_001/Shawn_gb2312/ABM_DD 
3. Email:  liuhongyu.louie@autobitmaker.com/autobitmaker_master@autobitmaker.com

* 特别提示（微信号 autobitmaker001 不是我们！！我们也不叫makebit！！微信号 autobitmaker_001 才是我们）

微信小程序提交试用申请：
![微信小程序码](https://www.fmz.cn![IMG](https://www.fmz.com/upload/asset/1281e73989f891ac26aa9.jpg))

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|baseOriginalBalance|10000|baseOriginalBalance|


> Source (javascript)

``` javascript
//exchanges[0] is spot

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

function updateAccountDetailChart(ObjChart, totalBalance) {
    var nowTime = new Date().getTime();
    var account = exchanges[0].GetAccount();
    try {
        if (account !== null && account.Info !== null && totalBalance > 0) {
            ObjChart.add([0, [nowTime, Number(totalBalance)]]);
        }
    } catch (err) {
        Log('ERROR ' + account + ',' + err)
    }
}

function getSpotBalanceInUSDT() {
    var ticker = JSON.parse(HttpQuery('https://api.binance.com/api/v1/ticker/24hr'));
    var currentBalance = 0;
    var account = exchanges[0].GetAccount();
    var priceMap = {};
    try {
        if (ticker !== null) {
            for (var index in ticker) {
                priceMap[ticker[index].symbol] = ticker[index].lastPrice;
            }
        }
        if (account !== null && account.Info !== null) {
            for (var index in account.Info.balances) {
                var obj = account.Info.balances[index];
                if (obj.asset !== 'USDT' && priceMap[obj.asset + 'USDT']) {
                    currentBalance += Number(Number(priceMap[obj.asset + 'USDT']) * Number((Number(obj.free) + Number(obj.locked))));
                }
                if (obj.asset === 'USDT') {
                    currentBalance += Number((Number(obj.free) + Number(obj.locked)));
                }
            }
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
        cols: ['Symbol', 'Type', 'CurrentPrice', 'Position', 'USDT Value'],
        rows: []
    }
    table.rows.push([{
        body: '本策略是 USDT 本位，低风险现货智能动态参数网格',
        colspan: 5
    }]);
    table.rows.push([{
        body: '所有交易对任选',
        colspan: 5
    }]);
    var ticker = JSON.parse(HttpQuery('https://api.binance.com/api/v1/ticker/24hr'));
    var account = exchanges[0].GetAccount();
    var priceMap = {};
    try {
        if (ticker !== null) {
            for (var index in ticker) {
                priceMap[ticker[index].symbol] = ticker[index].lastPrice;
            }
        }
        if (account !== null && account.Info !== null) {
            for (var index in account.Info.balances) {
                var obj = account.Info.balances[index];
                if (obj.asset !== 'USDT' && priceMap[obj.asset + 'USDT']) {
                    if (Number((Number(obj.free) + Number(obj.locked))) > 0) {
                        table.rows.push([obj.asset, ('LONG #1eda1bab'), Number(priceMap[obj.asset + 'USDT']), Number((Number(obj.free) + Number(obj.locked))), Number(Number(priceMap[obj.asset + 'USDT']) * Number((Number(obj.free) + Number(obj.locked)))).toFixed(4)]);
                    }
                }
            }
        }
    } catch (err) {
        Log('ERROR ' + account + ',' + err)
    }
    Sleep(168);
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
            var currentSpotBalance = getSpotBalanceInUSDT();
            var totalBalance = Number(currentSpotBalance).toFixed(4);
            printProfitInfo(totalBalance);
            updateAccountDetailChart(ObjChart, totalBalance);
            for (var i = 0; i < 120; i++) {
                try {
                    var avaliableMargin = 100;
                    ObjChart.update([chart, getChartPosition(avaliableMargin)]);
                    var profit = Number((totalBalance) - baseOriginalBalance).toFixed(5);
                    var profitRate = Number((((totalBalance) - baseOriginalBalance) / baseOriginalBalance) * 100).toFixed(4);
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

https://www.fmz.com/strategy/255606

> Last Modified

2021-02-20 11:36:38
