
> 策略名称

Binance-刷量工资

> 策略作者

扁豆子

> 策略描述

草神策略2花里胡哨版本!!

公众号 "扁豆子的量化世界"
Discord https://discord.gg/BWEGYnnNu9

以上!!
介绍Over!!



> 策略参数



|参数|默认值|描述|
|----|----|----|
|Trade_symbols|ETH,BCH,XRP,EOS,LTC,TRX,ETC,LINK,XLM,ADA,XMR,DASH,ZEC,XTZ,BNB,ATOM,ONT,IOTA,BAT,VET,NEO,QTUM,IOST|交易的币种|
|Log_profit_interval|60|Log总权益间隔s|
|Interval|true|休眠时间s|
|Reset|false|重置历史数据|
|Alpha|0.0015|Alpha|
|Update_base_price_time_interval|60|更新指数间隔s|
|Stop_loss|0.233|单币止损%|
|N|0.5|Trade_value量比|
|Diff|0.004|Diff|
|Max|0.5|最大偏移限制|
|start_balance|false|start_balance|


> 源码 (javascript)

``` javascript
var Version = '2.3.3';
var Funding = 0; //账户初始金额,为0的时候,自动获取,非0为自定义
var Success = '#5cb85c'; //成功颜色
var Danger = '#ff0000'; //危险颜色
var Warning = '#f0ad4e'; //警告颜色
var RunTime; //运行时间
var SelfFee = '0.04'; //https://www.binance.com/cn/fee/futureFee
var TotalLong;
var TotalShort;
var UpProfit = 0;
var accountAssets = []; //保存资产
var WinRateData = {}; //保存所有币种的胜率及开仓次数
var Max_diff = Max; //当偏差diff大于0.4时，不继续加空仓, 自行设置
var Min_diff = -Max; //当diff小于-0.3时，不继续加多仓, 自行设置
var trade_symbols = []
var symbols = [];
if (!Trade_symbols) {
    var Trade_symbols_info = HttpQuery('https://fapi.binance.com/fapi/v1/exchangeInfo');
    if (!Trade_symbols_info) {
        throw '无法连接币安网络，需要海外托管者';
    }
    for (var symbol_info in JSON.parse(Trade_symbols_info).symbols) {
        if (JSON.parse(Trade_symbols_info).symbols[symbol_info].contractType == 'PERPETUAL') {
            trade_symbols.push(JSON.parse(Trade_symbols_info).symbols[symbol_info].baseAsset)
        }
    }
} else {
    trade_symbols = Trade_symbols.split(',');
}
symbols = trade_symbols;
var index = 1; //指数
if (trade_symbols.indexOf('BTC') < 0) {
    symbols = trade_symbols.concat(['BTC']);
}
var update_profit_time = 0;
var update_base_price_time = Date.now();
var assets = {};
var init_prices = {};
var trade_info = {};
var BlackList = {};
var ResetTimes = 1440;
exchange.SetContractType("swap")

function init_trade_symbols() {
    if (!Trade_symbols) {
        var Trade_symbols_info = HttpQuery('https://fapi.binance.com/fapi/v1/exchangeInfo');
        trade_symbols = []
        for (var symbol_info in JSON.parse(Trade_symbols_info).symbols) {
            if (JSON.parse(Trade_symbols_info).symbols[symbol_info].contractType == 'PERPETUAL') {
                trade_symbols.push(JSON.parse(Trade_symbols_info).symbols[symbol_info].baseAsset)
            }
        }
    } else {
        trade_symbols = Trade_symbols.split(',');
    }
    symbols = trade_symbols;
    if (trade_symbols.indexOf('BTC') < 0) {
        symbols = trade_symbols.concat(['BTC']);
    }
}

var check_tag = false

function trade_symbols_check() {
    var offset = new Date().getTimezoneOffset() * 60 * 1000;
    //算出现在的时间：
    var nowDate = new Date().getTime();
    //算出对应的格林位置时间
    var GMTDate = new Date(nowDate + offset + 8 * 60 * 60 * 1000);
    var myDate = GMTDate;
    // 定义具体时间
    var Hours = myDate.getHours(); //获取当前小时数(0-23)
    var Minutes = myDate.getMinutes(); //获取当前分钟数(0-59)
    if (Hours == 8 && Minutes == 0 && check_tag == false) {
        init_trade_symbols()
        init()
        check_tag = true
    }
    if (Hours == 8 && Minutes == 1 && check_tag == true) {
        check_tag = false
    }
}

function init() {
    InitRateData();
    var exchange_info = HttpQuery('https://fapi.binance.com/fapi/v1/exchangeInfo');
    exchange_info = JSON.parse(exchange_info);
    for (var i = 0; i < exchange_info.symbols.length; i++) {
        if (symbols.indexOf(exchange_info.symbols[i].baseAsset) > -1) {
            assets[exchange_info.symbols[i].baseAsset] = {
                amount: 0,
                hold_price: 0,
                value: 0,
                bid_price: 0,
                ask_price: 0,
                btc_price: 0,
                btc_change: 1,
                btc_diff: 0,
                realised_profit: 0,
                margin: 0,
                unrealised_profit: 0,
                leverage: 20,
                positionInitialMargin: 0,
                liquidationPrice: 0
            };
            trade_info[exchange_info.symbols[i].baseAsset] = {
                minQty: parseFloat(exchange_info.symbols[i].filters[1].minQty),
                priceSize: parseInt((Math.log10(1.1 / parseFloat(exchange_info.symbols[i].filters[0].tickSize)))),
                amountSize: parseInt((Math.log10(1.1 / parseFloat(exchange_info.symbols[i].filters[1].stepSize))))
            };
        }
    }
}

assets.USDT = {
    unrealised_profit: 0,
    margin: 0,
    margin_balance: 0,
    total_balance: 0,
    leverage: 0,
    update_time: 0,
    margin_ratio: 0,
    init_balance: 0,
    short_value: 0,
    long_value: 0,
    profit: 0
};

var chartCfg = {
    chart: {
        animation: false
    },
    subtitle: {
        text: "花里胡哨 φ(゜▽゜*)♪",
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, '#7cb5ec'],
                    [1, 'rgba(124,181,236,0)']
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            fillOpacity: 0.3,
            softThreshold: false,
            threshold: null
        },
        column: {
            color: '#6aa84f',
            negativeColor: '#666666', //就是这个属性设置负值的颜色
        }
    },
    yAxis: [{
        height: "46%",
        lineWidth: 2,
        title: {
            text: '总盈亏',
        },
        tickPixelInterval: 20,
        minorGridLineWidth: 1,
        minorTickWidth: 0,
        opposite: true,
        labels: {
            align: "right",
            x: -3,
        }
    }, {
        title: {
            text: '未结盈亏',
        },
        top: "48%",
        height: "18%",
        offset: 0,
        lineWidth: 2
    }, {
        title: {
            text: '总资产',
        },
        top: '68%',
        height: '20%',
        offset: 0,
        lineWidth: 2
    }, {
        title: {
            text: 'margin %',
        },
        top: '90%',
        height: '10%',
        offset: 0,
        lineWidth: 2
    }],
    series: [{
        name: '总盈亏',
        type: 'area',
        data: [],
        id: 'primary',
        tooltip: {
            xDateFormat: '%Y-%m-%d %H:%M:%S'
        },
        yAxis: 0
    }, {
        type: 'column',
        lineWidth: 2,
        name: '未结盈亏',
        data: [],
        yAxis: 1,
    }, {
        type: 'line',
        step: true,
        color: '#5b4b00',
        name: '总资产',
        data: [],
        yAxis: 2
    }, {
        type: 'line',
        step: true,
        color: '#ff0000',
        name: '保证金利用率',
        data: [],
        yAxis: 3
    }, {
        type: 'pie',
        innerSize: '70%',
        name: 'margin %',
        data: [],
        center: ['3%', '6%'],
        size: '20%',
        dataLabels: {
            enabled: false
        },
        startAngle: -90,
        endAngle: 90,
    }],
};

var ObjChart = null
ObjChart = Chart(chartCfg)

function updateAccount() { //更新账户和持仓
    var account = exchange.GetAccount();
    var pos = exchange.GetPosition();
    if (account == null || account.length == 0 || typeof(account) == "undefined") {
        Log('update account time out');
        return;
    }
    accountAssets = account.Info.assets;
    assets.USDT.update_time = Date.now();
    for (var i = 0; i < trade_symbols.length; i++) {
        assets[trade_symbols[i]].margin = 0;
        assets[trade_symbols[i]].unrealised_profit = 0;
        assets[trade_symbols[i]].hold_price = 0;
        assets[trade_symbols[i]].amount = 0;
    }
    if (account.Info == null || account.Info.length == 0 || typeof(account.Info) == "undefined" || typeof(account.Info.positions) == "undefined") {
        Log('update Infos time out !!')
        return;
    }
    for (var j = 0; j < account.Info.positions.length; j++) {
        if (account.Info.positions[j].positionSide == 'BOTH') {
            var pair = account.Info.positions[j].symbol;
            var coin = pair.slice(0, pair.length - 4);
            if (trade_symbols.indexOf(coin) < 0) {
                continue;
            }
            assets[coin].margin = parseFloat(account.Info.positions[j].initialMargin) + parseFloat(account.Info.positions[j].maintMargin);
            assets[coin].unrealised_profit = parseFloat(account.Info.positions[j].unrealizedProfit);
            assets[coin].positionInitialMargin = parseFloat(account.Info.positions[j].positionInitialMargin);
            assets[coin].leverage = account.Info.positions[j].leverage;
        }
    }
    assets.USDT.margin = _N(parseFloat(account.Info.totalInitialMargin) + parseFloat(account.Info.totalMaintMargin), 2);
    assets.USDT.margin_balance = _N(parseFloat(account.Info.totalMarginBalance), 2);
    assets.USDT.total_balance = _N(parseFloat(account.Info.totalWalletBalance), 2);
    if (assets.USDT.init_balance == 0) {
        if (_G('init_balance')) {
            assets.USDT.init_balance = _N(_G('init_balance'), 2);
        } else {
            assets.USDT.init_balance = assets.USDT.total_balance;
            _G('init_balance', assets.USDT.init_balance);
        }
    }
    assets.USDT.profit = _N(assets.USDT.margin_balance - assets.USDT.init_balance, 2);
    assets.USDT.total_balance = _N(parseFloat(account.Info.totalWalletBalance), 2);
    assets.USDT.unrealised_profit = _N(parseFloat(account.Info.totalUnrealizedProfit), 2);
    assets.USDT.leverage = _N(assets.USDT.margin / assets.USDT.total_balance, 2);
    assets.USDT.margin_ratio = (account.Info.totalMaintMargin / account.Info.totalMarginBalance * 100);
    totalProfit = 0; //总盈利
    totalMarginBalance = 0
    totalPositionInitialMargin = 0
    totalOpenOrderInitialMargin = 0
    totalunpnl = 0
    totalProfit = parseFloat(assets.USDT.margin_balance - FirstAccount().Info.totalWalletBalance); //总盈利
    totalMarginBalance = parseFloat(account.Info.totalMarginBalance)
    totalPositionInitialMargin = parseFloat(account.Info.totalPositionInitialMargin)
    totalOpenOrderInitialMargin = parseFloat(account.Info.totalOpenOrderInitialMargin)
    totalLeft = totalMarginBalance - totalPositionInitialMargin - totalOpenOrderInitialMargin
    totalunpnl = parseFloat(account.Info.totalUnrealizedProfit)
    try {
        pos = JSON.parse(exchange.GetRawJSON());
    } catch (e) {
        Log("update pos time out!!")
        return
    }
    if (pos.length > 0) {
        for (var k = 0; k < pos.length; k++) {
            var pair = pos[k].symbol;
            var coin = pair.slice(0, pair.length - 4);
            if (trade_symbols.indexOf(coin) < 0) {
                continue;
            }
            if (pos[k].positionSide != 'BOTH') {
                continue;
            }
            assets[coin].hold_price = parseFloat(pos[k].entryPrice);
            assets[coin].amount = parseFloat(pos[k].positionAmt);
            assets[coin].unrealised_profit = parseFloat(pos[k].unRealizedProfit);
            assets[coin].liquidationPrice = parseFloat(pos[k].liquidationPrice);
            assets[coin].marginType = pos[k].marginType;
        }
    }
}

function updateIndex() { //更新指数
    if (!_G('init_prices') || Reset) {
        Reset = false;
        ObjChart.reset()
        LogProfitReset()
        LogReset()
        for (var i = 0; i < trade_symbols.length; i++) {
            init_prices[trade_symbols[i]] = (assets[trade_symbols[i]].ask_price + assets[trade_symbols[i]].bid_price) / (assets.BTC.ask_price + assets.BTC.bid_price);
        }
        Log('保存启动时的价格');
        _G('init_prices', init_prices);
        _G("StartTime", null); //重置开始时间
        _G("initialAccount_" + exchange.GetLabel(), null); //重置开始资金
        _G("tradeNumber", null); //重置交易次数
        _G("tradeVolume", null); //重置交易量
        _G("buyNumber", null); //重置做多次数
        _G("sellNumber", null); //重置做空次数
        _G("totalProfit", null); //重置打印次数
        _G("profitNumber", null); //重置盈利次数
    } else {
        init_prices = _G('init_prices');
        if (Date.now() - update_base_price_time > Update_base_price_time_interval * 1000) {
            update_base_price_time = Date.now();
            for (var i = 0; i < trade_symbols.length; i++) { //更新初始价格
                init_prices[trade_symbols[i]] = init_prices[trade_symbols[i]] * (1 - Alpha) + Alpha * (assets[trade_symbols[i]].ask_price + assets[trade_symbols[i]].bid_price) / (assets.BTC.ask_price + assets.BTC.bid_price);
            }
            _G('init_prices', init_prices);
        }
        var temp = 0;
        for (var i = 0; i < trade_symbols.length; i++) {
            assets[trade_symbols[i]].btc_price = (assets[trade_symbols[i]].ask_price + assets[trade_symbols[i]].bid_price) / (assets.BTC.ask_price + assets.BTC.bid_price);
            if (!(trade_symbols[i] in init_prices)) {
                Log('添加新的币种', trade_symbols[i]);
                init_prices[trade_symbols[i]] = assets[trade_symbols[i]].btc_price;
                _G('init_prices', init_prices);
            }
            assets[trade_symbols[i]].btc_change = _N(assets[trade_symbols[i]].btc_price / init_prices[trade_symbols[i]], 4);
            temp += assets[trade_symbols[i]].btc_change;
        }
        index = _N(temp / trade_symbols.length, 4);
    }

}

function updateTick() { //更新行情
    var ticker = HttpQuery('https://fapi.binance.com/fapi/v1/ticker/bookTicker');
    if (ticker.indexOf('BTCUSDT') == -1) {
        return;
    }
    try {
        ticker = JSON.parse(ticker);
    } catch (e) {
        Log('get ticker time out');
        return;
    }
    assets.USDT.short_value = 0;
    assets.USDT.long_value = 0;
    for (var i = 0; i < ticker.length; i++) {
        var pair = ticker[i].symbol;
        var coin = pair.slice(0, pair.length - 4);
        if (symbols.indexOf(coin) < 0) {
            continue;
        }
        assets[coin].ask_price = parseFloat(ticker[i].askPrice);
        assets[coin].bid_price = parseFloat(ticker[i].bidPrice);
        assets[coin].ask_value = _N(assets[coin].amount * assets[coin].ask_price, 2);
        assets[coin].bid_value = _N(assets[coin].amount * assets[coin].bid_price, 2);
        if (trade_symbols.indexOf(coin) < 0) {
            continue;
        }
        if (assets[coin].amount < 0) {
            assets.USDT.short_value += Math.abs((assets[coin].ask_value + assets[coin].bid_value) / 2);
        } else {
            assets.USDT.long_value += Math.abs((assets[coin].ask_value + assets[coin].bid_value) / 2);
        }
        assets.USDT.short_value = _N(assets.USDT.short_value, 0);
        assets.USDT.long_value = _N(assets.USDT.long_value, 0);
    }
    updateIndex();
    for (var i = 0; i < trade_symbols.length; i++) {
        assets[trade_symbols[i]].btc_diff = _N(assets[trade_symbols[i]].btc_change - index, 4);
    }
}



function trade(symbol, dirction, value) { //交易
    if (Date.now() - assets.USDT.update_time > 10 * 1000) {
        Log('更新账户延时，不交易');
        return;
    }
    var Ice_value = _N(assets.USDT.total_balance * N * 0.2, 0)
    if (Ice_value < 20) {
        Ice_value = 20
    }
    var price = dirction == 'sell' ? assets[symbol].bid_price : assets[symbol].ask_price;
    var amount = _N(Math.min(value, Ice_value) / price, trade_info[symbol].amountSize);
    if (amount < trade_info[symbol].minQty) {
        // Log(symbol, '合约价值偏离或冰山委托订单的大小设置过小，达不到最小成交, 至少需要: ', _N(trade_info[symbol].minQty * price, 0) + 1);
        return;
    }
    exchange.IO("currency", symbol + '_' + 'USDT');
    exchange.SetContractType('swap');
    exchange.SetDirection(dirction);
    var f = dirction == 'buy' ? 'Buy' : 'Sell';
    var id = exchange[f](price, amount, symbol);
    if (id) {
        exchange.CancelOrder(id); //订单会立即撤销
    }
    tradingCounter("tradeVolume", price * amount); //保存交易量
    tradingCounter("tradeNumber", 1); //保存交易次数
    WinRateData[symbol].tradeNumber += 1;
    if (dirction == 'buy') {
        tradingCounter("buyNumber", 1);
        WinRateData[symbol].buyNumber += 1;
    } else {
        tradingCounter("sellNumber", 1);
        WinRateData[symbol].sellNumber += 1;
    }
    _G("WinRateData", WinRateData); //保存各币种的交易数据
    return id;
}

function InitRateData() {
    if (Reset) {
        _G("WinRateData", null);
        _G("BlackList", null);
    }
    if (_G("WinRateData")) {
        WinRateData = _G("WinRateData");
    }
    if (!_G("BlackList")) {
        _G("BlackList", BlackList);
    } else {
        BlackList = _G("BlackList");
    }
    for (var i = 0; i < symbols.length; i++) {
        if (typeof WinRateData[symbols[i]] == 'undefined') {
            WinRateData[symbols[i]] = {
                totalProfit: 0, //统计次数
                profitNumber: 0, //盈利次数
                tradeNumber: 0, //交易次数
                buyNumber: 0, //做多次数
                sellNumber: 0 //做空次数
            };
        }
    }
    _G("WinRateData", WinRateData);
}

function UpdateList() {
    var BlackList = _G("BlackList");
    // Log(BlackList)
    for (var key in BlackList) {
        BlackList[key] -= 1;
        Log(key, '在小黑屋里数数中...', BlackList[key]);
        if (BlackList[key] <= 0) {
            delete BlackList[key];
            delete key;
            Log(key, '从小黑屋里放出来啦~~');
        }
    }
    _G("BlackList", BlackList);
}

function RunCommand() {
    var str_cmd = GetCommand();
    if (str_cmd) {
        if (str_cmd == 'CoverAll') {
            stopLoss();
        } else {
            var arrCmd = str_cmd.split(':');
            var symbol = arrCmd[1];
            var amount = parseFloat(arrCmd[2]);
            symbol_st(symbol, amount);
        }
    }
}

function FirstAccount() {
    var key = "initialAccount_" + exchange.GetLabel();
    var initialAccount = _G(key);
    if (initialAccount == null) {
        initialAccount = exchange.GetAccount();
        _G(key, initialAccount);
    }
    return initialAccount;
}

function StartTime() {
    var StartTime = _G("StartTime");
    if (StartTime == null) {
        StartTime = _D();
        _G("StartTime", StartTime);
    }
    return StartTime;
}

function RuningTime() {
    var ret = {};
    var dateBegin = new Date(StartTime());
    var dateEnd = new Date(_D());
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
    var leave1 = dateDiff % (24 * 3600 * 1000);
    var hours = Math.floor(leave1 / (3600 * 1000));
    var leave2 = leave1 % (3600 * 1000);
    var minutes = Math.floor(leave2 / (60 * 1000));
    ret.dayDiff = dayDiff;
    ret.hours = hours;
    ret.minutes = minutes;
    ret.str = "运行时间: " + dayDiff + " 天 " + hours + " 小时 " + minutes + " 分钟" + "\n" + '填写合约邀请码 bfzb007 获取策略, 请联系WX: wangxiaoba ' + Danger;
    return ret;
}

function AppendedStatus() {
    var accountTable = {
        type: "table",
        title: "盈利统计",
        cols: ["运行天数", "初始资金", "现有资金", "保证金余额", "已用保证金", "保证金比率", "总收益", "预计年化", "预计月化", "平均日化", "全部投降"],
        rows: []
    };
    var feeTable = {
        type: 'table',
        title: '交易统计',
        cols: ["策略指数", '交易次数', '做多次数', '做空次数', '预估胜率', '预估成交额', '预估手续费', "未实现盈利", '持仓总值', '做多总值', '做空总值'],
        rows: []
    };
    var runday = RunTime.dayDiff;
    if (runday == 0) {
        runday = 1;
    }
    if (Funding == 0) {
        Funding = parseFloat(FirstAccount().Info.totalWalletBalance);
    }
    var profitColors = Danger;
    var totalProfit = assets.USDT.total_balance - Funding; //总盈利
    if (totalProfit > 0) {
        profitColors = Success;
    }
    var dayProfit = totalProfit / runday; //天盈利
    var dayRate = dayProfit / Funding * 100;
    accountTable.rows.push([
        runday,
        '$' + _N(Funding, 2),
        '$' + assets.USDT.total_balance,
        '$' + assets.USDT.margin_balance,
        '$' + assets.USDT.margin,
        _N(assets.USDT.margin_ratio, 2) + '%',
        _N(totalProfit / Funding * 100, 2) + "% = $" + _N(totalProfit, 2) + (profitColors),
        _N(dayRate * 365, 2) + "% = $" + _N(dayProfit * 365, 2) + (profitColors),
        _N(dayRate * 30, 2) + "% = $" + _N(dayProfit * 30, 2) + (profitColors),
        _N(dayRate, 2) + "% = $" + _N(dayProfit, 2) + (profitColors),
        {
            'type': 'button', // 显示按钮 必须要 把 type 设置为 button 类型
            'cmd': "CoverAll", // 字符串，发送的 数据，由GetCommand()函数接受。
            'name': '全部平仓' // 按钮上显示的名字
        }
    ]);
    var vloume = _G("tradeVolume") ? _G("tradeVolume") : 0;
    feeTable.rows.push([
        index, //指数
        _G("tradeNumber") ? _G("tradeNumber") : 0, //交易次数
        _G("buyNumber") ? _G("buyNumber") : 0, //做多次数
        _G("sellNumber") ? _G("sellNumber") : 0, //做空次数
        _N(_G("profitNumber") / _G("totalProfit") * 100, 2) + '%', //胜率
        '$' + _N(vloume, 2) + ' ≈ ฿' + _N(vloume / ((assets.BTC.bid_price + assets.BTC.ask_price) / 2), 6), //成交金额
        '$' + _N(vloume * (SelfFee / 100), 4), //手续费
        '$' + _N(assets.USDT.unrealised_profit, 2) + (assets.USDT.unrealised_profit >= 0 ? Success : Danger),
        '$' + _N(TotalLong + Math.abs(TotalShort), 2), //持仓总价值
        '$' + _N(TotalLong, 2) + Success, //做多总值
        '$' + _N(Math.abs(TotalShort), 2) + Danger, //做空总值
    ]);
    var assetTable = {
        type: 'table',
        title: '账户资产信息',
        cols: ['编号', '资产名', '起始保证金', '维持保证金', '保证金余额', '最大可提款金额', '挂单起始保证金', '持仓起始保证金', '持仓未实现盈亏', '账户余额'],
        rows: []
    };
    for (var i = 0; i < accountAssets.length; i++) {
        var acc = accountAssets[i];
        assetTable.rows.push([
            i + 1,
            acc.asset, acc.initialMargin, acc.maintMargin, acc.marginBalance,
            acc.maxWithdrawAmount, acc.openOrderInitialMargin, acc.positionInitialMargin,
            acc.unrealizedProfit, acc.walletBalance
        ]);
    }
    var indexTable = {
        type: 'table',
        title: '币指数信息',
        cols: ['编号', '币种信息', '当前价格', 'BTC计价', 'BTC计价变化(%)', '偏离平均', '交易次数', '做空次数', '做多次数', '预估胜率'],
        rows: []
    };
    for (var i = 0; i < symbols.length; i++) {
        var price = _N((assets[symbols[i]].ask_price + assets[symbols[i]].bid_price) / 2, trade_info[symbols[i]].priceSize);
        if (symbols.indexOf(symbols[i]) < 0) {
            indexTable.rows.push([i + 1, symbols[i], price, assets[symbols[i]].btc_price, _N((1 - assets[symbols[i]].btc_change) * 100), assets[symbols[i]].btc_diff], 0, 0, 0, '0%');
        } else {
            var rateData = _G("WinRateData");
            var winRate = _N(rateData[symbols[i]].profitNumber / rateData[symbols[i]].totalProfit * 100, 2);
            indexTable.rows.push([
                (i + 1),
                symbols[i] + Warning,
                price,
                _N(assets[symbols[i]].btc_price, 6),
                _N((1 - assets[symbols[i]].btc_change) * 100),
                assets[symbols[i]].btc_diff + (assets[symbols[i]].btc_diff >= 0 ? Success : Danger),
                rateData[symbols[i]].tradeNumber,
                rateData[symbols[i]].sellNumber,
                rateData[symbols[i]].buyNumber,
                (rateData[symbols[i]].profitNumber > 0 && rateData[symbols[i]].totalProfit > 0 ? winRate : '0') + '%' + (winRate >= 50 ? Success : Danger), //胜率
            ]);
        }
    }
    var retData = {};
    retData.upTable = RunTime.str + '\n' + "最后更新: " + _D() + '\n' + 'Version:' + Version + '\n' + '`' + JSON.stringify([accountTable, assetTable]) + '`\n' + '`' + JSON.stringify(feeTable) + '`\n';
    retData.indexTable = indexTable;
    return retData;
}

function WinRate() {
    for (var i = 0; i < symbols.length; i++) {
        var unrealised = assets[symbols[i]].unrealised_profit;
        WinRateData[symbols[i]].totalProfit += 1;
        if (unrealised != 0) {
            if (unrealised > 0) {
                WinRateData[symbols[i]].profitNumber += 1;
            }
        }
    }
    _G("WinRateData", WinRateData);
}


function tradingCounter(key, newValue) {
    var value = _G(key);
    if (!value) {
        _G(key, newValue);
    } else {
        _G(key, value + newValue);
    }
}

function updateStatus() { //状态栏信息
    var table = {
        type: 'table',
        title: '交易对信息',
        cols: ['编号', '[模式][倍数]', '币种信息', '开仓方向', '开仓数量', '持仓价格', '当前价格', '强平价格', '强平差价', '持仓价值', '保证金', '未实现盈亏', '投降'],
        rows: []
    };
    TotalLong = 0;
    TotalShort = 0;
    for (var i = 0; i < symbols.length; i++) {
        var direction = '空仓';
        var margin = direction;
        if (assets[symbols[i]].amount != 0) {
            direction = assets[symbols[i]].amount > 0 ? '做多' + Success : '做空' + Danger;
            margin = (assets[symbols[i]].marginType == 'cross' ? '全仓' : '逐仓');
        }

        var price = _N((assets[symbols[i]].ask_price + assets[symbols[i]].bid_price) / 2, trade_info[symbols[i]].priceSize);
        var value = _N((assets[symbols[i]].ask_value + assets[symbols[i]].bid_value) / 2, 2);
        if (value != 0) {
            if (value > 0) {
                TotalLong += value;
            } else {
                TotalShort += value;
            }
        }
        // var rateData = _G("WinRateData");
        var infoList = [
            i + 1,
            "[" + margin + "] [" + assets[symbols[i]].leverage + 'x] ',
            symbols[i],
            direction,
            Math.abs(assets[symbols[i]].amount),
            assets[symbols[i]].hold_price,
            price,
            assets[symbols[i]].liquidationPrice, //强平价格
            assets[symbols[i]].liquidationPrice == 0 ? '0' : '$' + _N(assets[symbols[i]].liquidationPrice - price, 5) + ' ≈ ' + _N(assets[symbols[i]].liquidationPrice / price * 100, 2) + '%' + Warning, //强平价格
            Math.abs(value),
            _N(assets[symbols[i]].positionInitialMargin, 2),
            // assets[symbols[i]].btc_diff,
            _N(assets[symbols[i]].unrealised_profit, 3) + (assets[symbols[i]].unrealised_profit >= 0 ? Success : Danger),
            // (rateData[symbols[i]].profitNumber > 0 && rateData[symbols[i]].totalProfit > 0 ? _N(rateData[symbols[i]].profitNumber / rateData[symbols[i]].totalProfit * 100, 2) : '0') + '%', //胜率
            {
                'type': 'button',
                'cmd': '你凉了~:' + symbols[i] + ':' + assets[symbols[i]].amount + ':',
                'name': symbols[i] + ' 投降'
            }
        ];
        table.rows.push(infoList);
    }
    var logString = JSON.stringify(assets.USDT) + '\n';
    var StatusData = AppendedStatus();
    LogStatus(StatusData.upTable + '`' + JSON.stringify([table, StatusData.indexTable]) + '`\n' + logString);

    if (Date.now() - update_profit_time > Log_profit_interval * 1000) {
        var balance = assets.USDT.margin_balance - Funding;
        if (Funding != 0) {
            ObjChart.add(0, [assets.USDT.update_time, totalProfit])
            ObjChart.add(1, [assets.USDT.update_time, totalunpnl])
            ObjChart.add(2, [assets.USDT.update_time, totalMarginBalance])
            ObjChart.add(3, [assets.USDT.update_time, assets.USDT.leverage])
            chartCfg.series[chartCfg.series.length - 1].data = [
                ["A", totalPositionInitialMargin],
                ["B", totalOpenOrderInitialMargin],
                ["C", totalLeft]
            ];
            ObjChart.update(chartCfg)
        }
        LogProfit(_N(balance, 3), '&');
        UpdateList();
        update_profit_time = Date.now();
        if (UpProfit != 0 && (_N(balance, 0) != UpProfit)) { //第一次不计算,并且小数点面的不进行胜率计算
            tradingCounter("totalProfit", 1); //统计打印次数, 胜率=盈利次数/打印次数*100
            if (_N(balance, 0) > UpProfit) {
                tradingCounter("profitNumber", 1); //盈利次数
            }
            WinRate();
        }
        UpProfit = _N(balance, 0);
    }

}

function stopLoss() { //止损函数
    while (true) {
        Log('触发全部平仓，当前资金：', assets.USDT.margin_balance, '初始资金：', Funding);
        updateAccount();
        updateTick();
        Ice_value = 500
        var trading = false; //是否正在交易
        for (var i = 0; i < trade_symbols.length; i++) {
            var symbol = trade_symbols[i];
            if (assets[symbol].ask_price == 0) {
                continue;
            }
            if (assets[symbol].bid_value >= 15) {
                trade(symbol, 'sell', assets[symbol].bid_value);
                trading = true;
            }
            if (assets[symbol].ask_value <= -15) {
                trade(symbol, 'buy', -assets[symbol].ask_value);
                trading = true;
            }
        }
        Sleep(1000);
        if (!trading) {
            throw '平仓结束, 程序终止!!';
        }
    }
}

function symbol_st(symbol, amount) {
    if (amount == 0) {
        return;
    }
    var f = amount < 0 ? 'Buy' : 'Sell';
    var dirction = amount < 0 ? 'buy' : 'sell';
    exchange.IO("currency", symbol + '_' + 'USDT');
    exchange.SetContractType('swap');
    exchange.SetDirection(dirction);
    exchange[f](-1, Math.abs(amount), symbol, '小黑屋止损...作妖必须死!!');
}

function onTick() { //策略逻辑部分
    var Trade_value = _N((0.382 * assets.USDT.total_balance + 0.618 * Funding) * N, 0)
    if (assets.USDT.total_balance < Funding) {
        Trade_value = _N(assets.USDT.total_balance * N, 0)
    }
    var Adjust_value = Trade_value
    for (var i = 0; i < trade_symbols.length; i++) {
        var symbol = trade_symbols[i];
        var unp = assets[trade_symbols[i]].unrealised_profit
        if (assets[symbol].ask_price == 0) {
            continue;
        }
        var BlackList = _G("BlackList");
        if (unp / Trade_value < -Stop_loss) {
            if (!(symbol in BlackList)) {
                BlackList[symbol] = ResetTimes
                Log(symbol, '关进小黑屋!!')
                Log(BlackList)
                _G("BlackList", BlackList);
            }
        }
        var now_value = (assets[symbols[i]].ask_value + assets[symbols[i]].bid_value) / 2;
        if (symbol in BlackList) {
            if (now_value > 0) {
                symbol_st(symbol, assets[symbol].amount);
            } else if (now_value < 0) {
                symbol_st(symbol, assets[symbol].amount);
            }
            continue;
        }
        var aim_value = -Trade_value * _N(assets[symbol].btc_diff / Diff, 3);
        if (aim_value - assets[symbol].ask_value >= Adjust_value && assets[symbol].btc_diff > Min_diff && assets.USDT.long_value - assets.USDT.short_value <= 1.1 * Trade_value) {
            trade(symbol, 'buy', aim_value - assets[symbol].ask_value);
        }
        if (aim_value - assets[symbol].bid_value <= -Adjust_value && assets[symbol].btc_diff < Max_diff && assets.USDT.short_value - assets.USDT.long_value <= 1.1 * Trade_value) {
            trade(symbol, 'sell', -(aim_value - assets[symbol].bid_value));
        }
    }
}

function main() {
    //SetErrorFilter("502:|503:|tcp|character|unexpected|network|timeout|WSARecv|Connect|GetAddr|no such|reset|http|received|EOF|reused|Unknown");
    while (true) {
        RunTime = RuningTime();
        RunCommand(); //捕获交互命令
        updateAccount(); //更新账户和持仓
        updateTick(); //行情
        onTick(); //策略逻辑部分
        updateStatus(); //输出状态栏信息
        trade_symbols_check(); //自动校验symbols
        Sleep(Interval * 1000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/204804

> 更新时间

2021-06-24 17:10:01
