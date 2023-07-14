
> Name

SuperHunter-智能学习-多账户合并展示版

> Author

AutoBitMaker-ABM



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|baseOriginalBalance|1000|baseOriginalBalance|


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
    for (var index in exchanges) {
        chart.series.push({
            name: "Account_" + (Number(index)) + "_Detail",
            id: "Account_" + (Number(index)) + "_Detail",
            data: []
        });
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
        var account = exchanges[index].GetAccount();
        try {
            if (account !== null && account.Info !== null && account.Info.totalMarginBalance > 0) {
                ObjChart.add([index, [nowTime, Number(account.Info.totalMarginBalance)]]);
            }
        } catch (err) {
            Log('ERROR ' + account + ',' + err)
        }
    }
}

function getBalance() {
    var currentBalance = 0;
    for (var index in exchanges) {
        var account = exchanges[index].GetAccount();
        try {
            if (account !== null && account.Info !== null && account.Info.totalWalletBalance > 0) {
                currentBalance += Number(account.Info.totalWalletBalance);
            }
        } catch (err) {
            Log('ERROR ' + account + ',' + err)
        }
        Sleep(666);
    }
    return Number(currentBalance).toFixed(6);
}

function getMarginBalance() {
    var currentBalance = 0;
    for (var index in exchanges) {
        var account = exchanges[index].GetAccount();
        try {
            if (account !== null && account.Info !== null && account.Info.totalMarginBalance > 0) {
                currentBalance += Number(account.Info.totalMarginBalance);
            }
        } catch (err) {
            Log('ERROR ' + account + ',' + err)
        }
        Sleep(666);
    }
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

https://www.fmz.com/strategy/236644

> Last Modified

2020-11-13 21:29:02
