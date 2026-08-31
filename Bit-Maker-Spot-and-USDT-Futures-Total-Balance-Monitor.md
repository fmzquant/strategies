
> Name

Bit-Maker-Spot-and-USDT-Futures-Total-Balance-Monitor

> Author

AutoBitMaker-ABM

> Strategy Description

**AutoBitMaker** has officially launched its risk-free arbitrage strategy.
The strategy works by hedging spot and futures positions, although this process can also be completed manually.
However, compared with manual execution, the BOT scans profit opportunities across all trading pairs and can trade hundreds of times per day. It frees your hands and reduces market risk.

We are **AutoBitMaker**, abbreviated **ABM Capital**. Please carefully verify the team name and WeChat accounts to avoid impersonation.
We currently communicate with domestic clients only through WeChat and Email, and do not use QQ or other channels.

**The ABM team** currently provides three types of strategies
* Futures trading
* Spot trading
* Arbitrage trading

The current code is only for account monitoring. The source code is public and may be inspected or reused.
Monitors the USDT value of spot holdings plus USDT futures positions.

Our strategy server cluster has now reached 80 machines, with more than 50 supporting servers. They check account stop-loss conditions at an average rate of twice per second, allowing rapid exits when risk appears.

We use a heterogeneous hybrid-cloud architecture across Alibaba Cloud, Amazon Cloud, and Microsoft Cloud, with management and execution nodes separated. The cluster provides redundancy across multiple nodes so the business can run smoothly and funds remain secure.

About the trial:
Depending on your capital size, we provide an approximately two-week trial run. During the trial period, we do not charge commissions.
After the Bot takes over your account, please do not perform any manual operations. If any manual position is detected, all Bots will exit immediately.

About commissions:
This depends on your capital size. We can discuss it in detail after the trial period. If you open your account through our referral link, we will charge a very low commission.

Contact information:
1. In-person meetings are available nationwide
2. WeChat: DuQi_SEC/autobitmaker/autobitmaker_001/Shawn_gb2312/ABM_DD 
3. Email:  liuhongyu.louie@autobitmaker.com/autobitmaker_master@autobitmaker.com

* Special note (the WeChat account autobitmaker001 is not us!! We are also not called makebit!! The correct account is autobitmaker_001)

Submit a trial application through the WeChat Mini Program:
![WeChat Mini Program QR Code](https://www.fmz.cn![IMG](https://www.fmz.com/upload/asset/1281e73989f891ac26aa9.jpg))

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|baseOriginalBalance|10000|baseOriginalBalance|


> Source (javascript)

``` javascript
//exchanges[0] is contract
//exchanges[1] is spot

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
        if (account !== null && account.Info !== null && account.Info.totalMarginBalance > 0) {
            ObjChart.add([0, [nowTime, Number(totalBalance)]]);
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

function getSpotBalanceInUSDT() {
    var ticker = JSON.parse(HttpQuery('https://api.binance.com/api/v1/ticker/24hr'));
    var currentBalance = 0;
    var account = exchanges[1].GetAccount();
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
        cols: ['Symbol', 'Type', 'AvgPrice', 'Position', 'Profit'],
        rows: []
    }
    table.rows.push([{
        body: '本策略是 USDT 本位，基于均值回归的币安现货-合约无风险套利策略',
        colspan: 5
    }]);
    table.rows.push([{
        body: '套利覆盖币安永续合约全部币种交易对',
        colspan: 5
    }]);
    var position = exchangeInnerArray[0].GetPosition()
    for (var indexInner in position) {
        var profit = Number(position[indexInner].Info.unRealizedProfit);
        totalProfit = totalProfit + profit
        table.rows.push([position[indexInner].Info.symbol, (position[indexInner].Type == 1 ? 'SHORT #da1b1bab' : 'LONG #1eda1bab'), position[indexInner].Price, position[indexInner].Amount, profit.toFixed(5)]);
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
            var currentBalance = getBalance();
            var currentSpotBalance = getSpotBalanceInUSDT();
            var totalBalance = Number(Number(currentBalance) + Number(currentSpotBalance)).toFixed(4);
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

https://www.fmz.com/strategy/255590

> Last Modified

2021-02-27 18:42:01
