
> 策略名称

Bit-Maker 3.0 套利 智能学习 USDT 本位 (Binance 单平台-Arbitrage USDT Standard)

> 策略作者

AutoBitMaker-Team

> 策略描述

本策略运行于币安的永续合约，使用方法极其简单，将 USDT 存入币安的合约账户，提交您的 APIKey，APISecret 和您接受的最大回撤和最大杠杆率给我们即可。（BitMEX 支持 BTC 本位）
交易对：BTCUSDT 和 ETHUSDT
策略类型：基于均值回归的跨品种套利策略，USDT本位（BitMEX 为 BTC 本位）。

由于策略的需求（比如多线程并发辅助，多个服务之间的调用，参数自优化等...），我们的Bot需要独立运行在我们的服务器集群内，因此 FMZ 平台上仅做策略的账户收益展示。

2019-01-01 至 2020-04-10 的回测
![2019-01-01至2020-04-01回测](https://www.fmz.com![IMG](https://www.fmz.com/upload/asset/1285d9a3b40c4afc432c1.png))

可以对比我们公开的实盘，回测和实盘走势基本一致，在2020-03-12附近因为大行情，收益飙升。

2019-01-01 至 2020-03-10 的回测
![2019-01-01至2020-03-10回测](https://www.fmz.com![IMG](https://www.fmz.com/upload/asset/127dc35874ae1eb7c20a5.png))

剔除掉2020-03-12附近的大行情，之前的收益曲线能看清。

风险管理
    1）多种平仓模式：获利平仓，回归平仓，止损平仓和移动平仓。不做网格，不会一直加仓，不会出现悬崖式止损。
    2）预检测系统：检测市场深度与滑点，机器人会根据数据来决定是否开仓与开仓大小。
    3）有多种风险类型 Bots 结合共同管理账户，针对低、中、高风险独立控制和开仓。每一个账户都有至少两组 Bots 进行操作。
    4）所有机器人都处于我们的监控服务下，如果有任何异常情况都会直接通知到我们。

关于试用：
根据您的资金规模，我们提供最长3个月的试跑。在试跑阶段，我们不抽佣金。但请您通过我们的邀请码在币安（BitMEX）合约创建账户，然后创建一组API key给我们即可。
Bot 接管您的账户后，请勿自行做任何操作，当检测到其他任何手动仓位，所有 Bots 将立即退出。

关于佣金：
这取决于您的资金量。我们可以在试跑阶段后详谈。如果您能使用我们推荐链接建立账户，那么我们会收取很低的佣金。

联系方式：
WeChat：autobitmaker
Email:  liuhongyu.louie@autobitmaker.com

微信小程序提交试用申请：
![微信小程序码](https://www.fmz.com![IMG](https://www.fmz.com/upload/asset/1281e73989f891ac26aa9.jpg))

> 策略参数



|参数|默认值|描述|
|----|----|----|
|baseOriginalBalance|1000|baseOriginalBalance|


> 源码 (javascript)

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
    for (var index in exchanges) {
        if (index > 0) {
            chart.series.push({
                name: "Account_" + (Number(index)) + "_Detail",
                id: "Account_" + (Number(index)) + "_Detail",
                data: []
            });
        }
    }
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
    for (var index in exchanges) {
        if (index > 0) {
            var account = exchanges[index].GetAccount();
            if (account !== null && account.Info !== null && account.Info.totalMarginBalance > 0) {
                ObjChart.add([index - 1, [nowTime, Number(account.Info.totalMarginBalance)]]);
            }
        }
    }
}

function getBalance() {
    var currentBalance = 0;
    for (var index in exchanges) {
        var account = exchanges[index].GetAccount();
        if (account !== null && account.Info !== null && account.Info.totalWalletBalance > 0) {
            currentBalance += Number(account.Info.totalWalletBalance);
        }
        Sleep(1000);
    }
    return Number(currentBalance).toFixed(6);
}

function getMarginBalance() {
    var currentBalance = 0;
    for (var index in exchanges) {
        var account = exchanges[index].GetAccount();
        if (account !== null && account.Info !== null && account.Info.totalMarginBalance > 0) {
            currentBalance += Number(account.Info.totalMarginBalance);
        }
        Sleep(1000);
    }
    return Number(currentBalance).toFixed(6);
}

function printProfitInfo(currentBalance) {
    var profit = Number((currentBalance) - baseOriginalBalance).toFixed(5);
    var profitRate = Number((((currentBalance) - baseOriginalBalance) / baseOriginalBalance) * 100).toFixed(4);
    LogProfit(Number(profitRate), '&');
    Log('The current balance is ' + currentBalance + ', the profit is ' + profit + ', the profit rate is ' + profitRate + '%');
    LogStatus('本策略是基于均值回归的币安合约套利策略\r\n主要币种是 BTC/USDT 和 ETH/USDT\r\nUSDT本位\r\n当前综合收益：' + (profit) + ' USDT\r\n当前综合收益率：' + profitRate + '%');
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

> 策略出处

https://www.fmz.com/strategy/178712

> 更新时间

2020-05-26 01:40:32
