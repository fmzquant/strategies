
> Name

bybit反向合约动态网格特异网格

> Author

@cqz



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|GridPercentage|0.05|GridPercentage|
|StartPositionRate|0.3|StartPositionRate|
|EndPositionRate|0.7|EndPositionRate|
|StartPrice|24000|StartPrice|
|EndPrice|60000|EndPrice|
|MinOrderCoinSize|0.001|MinOrderCoinSize|
|CoinSymbol|BTC|CoinSymbol|
|MinOrderAmount|5|MinOrderAmount|
|Reset|false|Reset|


> Source (javascript)

``` javascript
//Arguments:
//1. StartPrice
//2. EndPrice
//3. MinOrderCoinSize

// noinspection SillyAssignmentJS
CoinSymbol = CoinSymbol;
// noinspection SillyAssignmentJS
StartPrice = StartPrice;
// noinspection SillyAssignmentJS
EndPrice = EndPrice;
// noinspection SillyAssignmentJS
StartPositionRate = StartPositionRate;//0.3
// noinspection SillyAssignmentJS
EndPositionRate = EndPositionRate;//0.7
// noinspection SillyAssignmentJS
GridPercentage = GridPercentage;//0.05
// noinspection SillyAssignmentJS
MinOrderAmount = MinOrderAmount;
// noinspection SillyAssignmentJS
Reset = Reset;

let varA = (EndPositionRate - StartPositionRate) / (StartPrice - EndPrice);
let varB = EndPositionRate - StartPrice * varA;
let buyVarA = varA / (1 - GridPercentage / 100);
let sellVarA = varA / (1 + GridPercentage / 100);


function getPositionRate(varA, price) {
    if (price < StartPrice) {
        price = StartPrice;
    }
    if (price > EndPrice) {
        price = EndPrice;
    }
    return varA * price + varB;
}

function getAmounts(coinSize, currency, currentPrice, minOrderCoinSize) {
    let buyPrice = currentPrice - 5;
    let buyPositionRate = getPositionRate(buyVarA, buyPrice);
    let buyCoin = buyPositionRate * (coinSize * buyPrice + currency) / buyPrice - coinSize;
    buyCoin = buyCoin > minOrderCoinSize ? buyCoin : minOrderCoinSize;
    let sellPrice = currentPrice + 5;
    let sellPositionRate = getPositionRate(sellVarA, sellPrice);
    let sellCoin = sellPositionRate * (coinSize * sellPrice + currency) / sellPrice - coinSize;
    sellCoin = sellCoin < -minOrderCoinSize ? sellCoin : -minOrderCoinSize;
    return [buyCoin, sellCoin];
}

function getPrice(coinSize, currency, amount) {
    let varA = amount < 0 ? sellVarA : buyVarA;
    // Log("(" + (coinSize + amount) + " * y) / (" + coinSize + " * y + " + currency + ") = " + varA + " * y + " + varB);
    // ((coinSize + amount) * y) / (coinSize * y + currency) = varA * y + varB;
    // Log("(" + (coinSize + amount) + " * y)  = " + (varA * coinSize) + " * y^ + " + ((varA * currency) + (varB * coinSize)) + " * y + " + (varB * currency));
    //((coinSize + amount) * y)  = varA * coinSize * y^ + ((varA * currency) + (varB * coinSize)) * y + (varB * currency)
    // Log("y^2 + " + (((varA * currency) + (varB * coinSize) - (coinSize + amount)) / (varA * coinSize)) + " * y  =  " + (-(varB * currency) / (varA * coinSize)));
    // y^ + (((varA * currency) + (varB * coinSize) - (coinSize + amount))/(varA * coinSize)) * y  =  -(varB * currency)/(varA * coinSize)
    let k = (varA * currency + varB * coinSize - coinSize - amount) / (2 * varA * coinSize);
    let l = Math.sqrt(-((varB * currency) / (varA * coinSize)) + Math.pow(k, 2));
    let p1 = -l - k;
    let p2 = l - k;
    let price;
    if (p1 > 0 && p2 > 0) {
        price = amount < 0 ? Math.max(p1, p2) : Math.min(p1, p2);
    } else {
        price = Math.max(p1, p2);
    }

    let z = (coinSize + amount) * price / (coinSize * price + currency);
    let z1 = varA * StartPrice + varB;
    let z2 = varA * EndPrice + varB;
    if (z > z1) {
        price = z1 * currency / (coinSize + amount - z1 * coinSize)
    } else if (z < z2) {
        price = z2 * currency / (coinSize + amount - z2 * coinSize)
    }
    return parseInt(price);
}


let pricesChart = Chart([{ // 这个 chart 在JS 语言中 是对象， 在使用Chart 函数之前我们需要声明一个配置图表的对象变量chart。
    __isStock: true, // 标记是否为一般图表，有兴趣的可以改成 false 运行看看。
    tooltip: {
        xDateFormat: '%Y-%m-%d %H:%M:%S, %A'
    }, // 缩放工具
    title: {
        text: '收益分析图'
    }, // 标题
    rangeSelector: { // 选择范围
        buttons: [{
            type: 'hour',
            count: 1,
            text: '1h'
        }, {
            type: 'hour',
            count: 3,
            text: '3h'
        }, {
            type: 'hour',
            count: 8,
            text: '8h'
        }, {
            type: 'all',
            text: 'All'
        }],
        selected: 0,
        inputEnabled: false
    },
    xAxis: {
        type: 'datetime'
    }, // 坐标轴横轴 即：x轴， 当前设置的类型是 ：时间
    yAxis: { // 坐标轴纵轴 即：y轴， 默认数值随数据大小调整。
        title: {
            text: '收益'
        }, // 标题
        opposite: false, // 是否启用右边纵轴
    },
    series: [ // 数据系列，该属性保存的是 各个 数据系列（线， K线图， 标签等..）
        {
            name: "零",
            id: "Zero",
            dashStyle: 'shortdash',
            data: []
        }, {
            name: "策略收益",
            id: "策略收益,strategyProfit",
            data: []
        }, {
            name: "现货收益",
            id: "现货收益,spotProfit",
            data: []
        }
    ]
}]);


function GetOrders() {
    let ordersResp = exchange.IO("api", "GET", "/v2/private/order", "symbol=" + CoinSymbol + "USD");
    if (!ordersResp || ordersResp.ret_code !== 0) {
        return false;
    }
    let orderIds = [];
    for (let i = 0; i < ordersResp.result.length; i++) {
        orderIds.push(ordersResp.result[i].order_id);
    }
    return orderIds;
}

function GetFilledOrder(orderId) {
    let orderResp = exchange.IO("api", "GET", "/v2/private/order", "symbol=" + CoinSymbol + "USD&order_id=" + orderId);
    if (!orderResp || orderResp.ret_code !== 0 || orderResp.result.order_status !== "Filled") {
        return false;
    }
    let amount = orderResp.result.qty;
    amount = orderResp.result.side === "Sell" ? -amount : amount;
    return [orderResp.result.price, amount];

}


function sell(price, amount) {
    let createOrderResp = exchange.IO("api", "POST", "/v2/private/order/create", "symbol=" + CoinSymbol + "USD&side=Sell&order_type=Limit&qty=" + -amount + "&price=" + price + "&time_in_force=PostOnly");
    if (!createOrderResp || createOrderResp.ret_code !== 0) {
        return false;
    }
    Log("[Sell] Price:" + price + ", Amount:" + amount + ", orderId:" + createOrderResp.result.order_id);
    return createOrderResp.result.order_id;
}

function buy(price, amount) {
    let createOrderResp = exchange.IO("api", "POST", "/v2/private/order/create", "symbol=" + CoinSymbol + "USD&side=Buy&order_type=Limit&qty=" + amount + "&price=" + price + "&time_in_force=PostOnly");
    if (!createOrderResp || createOrderResp.ret_code !== 0) {
        return false;
    }
    Log("[Buy] Price:" + price + ", Amount:" + amount + ", orderId:" + createOrderResp.result.order_id);
    return createOrderResp.result.order_id;
}

function GetInversePosition() {
    let positionResp = exchange.IO("api", "GET", "/v2/private/position/list", "symbol=" + CoinSymbol + "USD");
    if (!positionResp || positionResp.ret_code !== 0) {
        return false;
    }
    let amount = positionResp.result.size;
    amount = positionResp.result.side === "Sell" ? -amount : amount;
    return [positionResp.result.entry_price, amount];
}

function GetInverseBalance() {
    let balanceResp = exchange.IO("api", "GET", "/v2/private/wallet/balance", "coin=" + CoinSymbol);
    if (!balanceResp || balanceResp.ret_code !== 0) {
        return false;
    }
    return balanceResp.result[CoinSymbol].wallet_balance;
}

function GetInverseAccount() {
    let position = GetInversePosition();
    if (!position) {
        return false;
    }
    let balance = GetInverseBalance();
    if (!balance) {
        return false;
    }
    let entry_price = position[0];
    let currency = -position[1];
    let coin = balance;
    coin = coin - (currency / entry_price);
    return [coin, currency];
}

function GetInverseTickerPrice() {
    let tickersResp = exchange.IO("api", "GET", "/v2/public/tickers", "symbol=" + CoinSymbol + "USD");
    if (!tickersResp || tickersResp.ret_code !== 0) {
        return false;
    }
    return (parseInt(tickersResp.result[0].bid_price) + parseInt(tickersResp.result[0].ask_price)) / 2;
}

function GetUSDTPosition() {
    let positionResp = null;
    let retryCount = 0;
    while (!positionResp || positionResp.ret_code !== 0) {
        if (retryCount++ > 0) {
            Sleep(2000);
        }
        positionResp = exchange.IO("api", "GET", "/private/linear/position/list", "symbol=" + CoinSymbol + "USDT");
    }
    // noinspection JSConstructorReturnsPrimitive
    return positionResp;
}

// function loop1(ctx) {
//     if (PendingOrders.length === 0) {
//         let account = _C(exchange.GetAccount);
//         let position = _C(exchange.GetPosition);
//         let ticker = _C(exchange.GetTicker);
//         let askPrice = ticker.Sell;
//         let bidPrice = ticker.Buy;
//         let balance = position.length === 0 ? 0 : (position[0].Amount + position[0].FrozenAmount);
//         let stocks = account.Stocks + account.FrozenStocks;
//         let dynamicPrice = balance / stocks;
//         let nextBuyPrice = _N(dynamicPrice * (1 - trimSpreadRatio / 100), pricePrecision);
//         let nextBuyAmount = _N((balance - stocks * nextBuyPrice) / 2, amountPrecision);
//         let nextSellPrice = _N(dynamicPrice * (1 + trimSpreadRatio / 100), pricePrecision);
//         let nextSellAmount = _N((stocks * nextSellPrice - balance) / 2, amountPrecision);
//         // Log("balance:" + balance + ", stocks:" + stocks + ", dynamicPrice:" + dynamicPrice + ", buyPrice:" + nextBuyPrice + ", sellPrice:" + nextSellPrice);
//         let sellOrder = sell(askPrice > nextSellPrice ? askPrice : nextSellPrice, nextSellAmount);
//         if (sellOrder) {
//             PendingOrders.push(sellOrder.orderID);
//         }
//         let buyOrder = buy(bidPrice < nextBuyPrice ? bidPrice : nextBuyPrice, nextBuyAmount);
//         if (buyOrder) {
//             PendingOrders.push(buyOrder.orderID);
//         }
//     } else {
//         let orders = [];
//         for (let i = 0; i < PendingOrders.length; i++) {
//             while (true) {
//                 orders[i] = _C(exchange.GetOrder, PendingOrders[i]);
//                 if (orders[i].Status !== ORDER_STATE_UNKNOWN) {
//                     break
//                 } else {
//                     Sleep(1000)
//                 }
//             }
//         }
//         let allOrderFinish = true;
//         let hasFinishOrder = false;
//         for (let i = 0; i < orders.length; i++) {
//             if (orders[i].Status === ORDER_STATE_PENDING) {
//                 allOrderFinish = false;
//             } else {
//                 hasFinishOrder = true;
//             }
//         }
//         if (hasFinishOrder) {
//             for (let i = 0; i < orders.length; i++) {
//                 if (orders[i].Status === ORDER_STATE_PENDING) {
//                     exchange.CancelOrder(PendingOrders[i], orders[i]);
//                 }
//             }
//         }
//         if (allOrderFinish) {
//             let avgPrice = 0;
//             for (let i = 0; i < orders.length; i++) {
//                 if (orders[i].DealAmount > 0) {
//                     avgPrice = orders[i].AvgPrice;
//                     Log(orders[i].Type === ORDER_TYPE_BUY ? "买入成功:" : "卖出成功:", "价格" + orders[i].AvgPrice + ", 成交数量", orders[i].DealAmount);
//                 }
//             }
//             if (avgPrice > 0) {
//                 ctx.positionChange = true;
//                 ctx.avgPrice = avgPrice;
//             }
//             PendingOrders = [];
//         } else {
//             if (PendingOrders.length === 1 && new Date().getTime() - new Date(orders[0].transactTime).getTime() > 5 * 1000) {
//                 exchange.CancelOrder(PendingOrders[0], orders[0]);
//             }
//         }
//     }
// }

// function checkArgs() {
//     exchange.SetContractType("XBTU20");
//     exchange.SetMarginLevel(1);
//     let RunningInfo = _G("runningInfo");
//     if (RunningInfo == null) {
//         RunningInfo = {};
//         let account = _C(exchange.GetAccount);
//         let position = _C(exchange.GetPosition);
//         OriginStocks = account.Stocks + account.FrozenStocks + (position.length === 0 ? 0 : (position[0].Amount + position[0].FrozenAmount) / position[0].Price);
//         RunningInfo.OriginStocks = OriginStocks;
//         _G("runningInfo", RunningInfo);
//     } else {
//         OriginStocks = RunningInfo.OriginStocks;
//     }
//     Log(OriginStocks);
// }

let PendingOrders = {};
let transactionalData = {
    "initTime": 0,
    "initAssets": 0,
    "initPrice": 1,
    "buyAmount": 0,
    "buyPrice": 1,
    "sellAmount": 0,
    "sellPrice": 1,
    "transactions": [],
};

function Init() {
    _CDelay(2000);
    let _transactionalData = _G("transactionalData");
    if (_transactionalData !== null) {
        transactionalData = _transactionalData;
    }
    if (!transactionalData.initTime || transactionalData.initTime <= 0) {
        resetTransaction();
    }
    Log(transactionalData);
    cancelAllOrders();
}

function resetTransaction() {
    transactionalData.initTime = 0;
    cancelAllOrders();
    while (!transactionalData.initTime || transactionalData.initTime <= 0) {
        let position = GetInversePosition();
        let balance = GetInverseBalance();
        let currentPrice = GetInverseTickerPrice();
        if (!position || !balance || !currentPrice) {
            Log("获取账户信息失败");
            Sleep(1000);
            continue
        }
        let entry_price = parseFloat(position[0]);
        let currency = -position[1];
        transactionalData.initTime = new Date().getTime();
        transactionalData.initPrice = currentPrice;
        transactionalData.initAssets = currency + (balance - (currency / entry_price)) * currentPrice;
        transactionalData.buyPrice = 1;
        transactionalData.buyAmount = 0;
        transactionalData.sellPrice = 1;
        transactionalData.sellAmount = 0;
        transactionalData.transactions = [];
        transactionalData.transactions.push([-currency, currentPrice]);
        LogReset(2);
        LogProfitReset();
        pricesChart.reset();
        Log("reset transactionalData:", transactionalData);
        _G("transactionalData", transactionalData);
        LogStatusInfo({
            "currentPrice": currentPrice,
            "coinSize": balance - (currency / entry_price),
            "currency": currency
        });
    }
}

function mergeTransactions() {
    let checkAmountSameSign = function (a1, a2) {
        return a1 === 0 || a2 === 0 || (a1 > 0 && a2 > 0) || (a1 < 0 && a2 < 0);
    };
    let mergeTransaction = function (amount, price) {
        if (amount > 0) {
            let buyCoin = amount / price + transactionalData.buyAmount / transactionalData.buyPrice;
            transactionalData.buyAmount = transactionalData.buyAmount + amount;
            transactionalData.buyPrice = transactionalData.buyAmount / buyCoin;
        } else if (amount < 0) {
            let sellCoin = -amount / price + transactionalData.sellAmount / transactionalData.sellPrice;
            transactionalData.sellAmount = transactionalData.sellAmount - amount;
            transactionalData.sellPrice = transactionalData.sellAmount / sellCoin;
        }
    };
    let length = transactionalData.transactions.length;
    if (length <= 2) {
        return;
    }
    let transaction1 = transactionalData.transactions[length - 2];
    let transaction2 = transactionalData.transactions[length - 1];
    if (checkAmountSameSign(transaction1[0], transaction2[0])) {
        return
    }
    let transactions = [];
    for (let i = 0; i < length - 2; i++) {
        transactions.push(transactionalData.transactions[i])
    }
    let mergeAmount = transaction1[0] + transaction2[0];
    if (mergeAmount === 0) {
        mergeTransaction(transaction1[0], transaction1[1]);
        mergeTransaction(transaction2[0], transaction2[1]);
    } else if (checkAmountSameSign(mergeAmount, transaction1[0])) {
        mergeTransaction(-transaction2[0], transaction1[1]);
        mergeTransaction(transaction2[0], transaction2[1]);
        transactions.push([mergeAmount, transaction1[1]])
    } else {
        mergeTransaction(transaction1[0], transaction1[1]);
        mergeTransaction(-transaction1[0], transaction2[1]);
        transactions.push([mergeAmount, transaction2[1]])
    }
    transactionalData.transactions = transactions;
    mergeTransactions()
}

function loop() {
    let orders = GetOrders();
    if (!orders) {
        return false;
    }
    //取消未知订单
    let cancelUnknownOrder = false;
    for (let i = 0; i < orders.length; i++) {
        if (!PendingOrders.hasOwnProperty(orders[i])) {
            exchange.CancelOrder(orders[i], "未知订单:", orders[i]);
            cancelUnknownOrder = true;
        }
    }
    if (cancelUnknownOrder) {
        return false;
    }

    let pendingOrderIds = Object.getOwnPropertyNames(PendingOrders);
    if (pendingOrderIds.length !== 0) {
        if (orders.length === pendingOrderIds.length) {
            return false;
        }
        for (let i = 0; i < orders.length; i++) {
            PendingOrders[orders[i]] = false;
            exchange.CancelOrder(orders[i], "未成交订单:", orders[i]);
        }
        for (let pendingOrderId of pendingOrderIds) {
            if (PendingOrders[pendingOrderId] === true) {
                let order = GetFilledOrder(pendingOrderId);
                if (!order) {
                    continue
                }
                let price = order[0];
                let amount = order[1];
                transactionalData.transactions.push([amount, price]);
                mergeTransactions();
                _G("transactionalData", transactionalData);
            }
        }
        PendingOrders = {};
        return false;
    }

    let inverseAccount = GetInverseAccount();
    if (!inverseAccount) {
        return false;
    }
    let currentPrice = GetInverseTickerPrice();
    if (!currentPrice) {
        return false;
    }
    let minOrderCoinSize = MinOrderAmount / currentPrice;
    // Log("account:", inverseAccount, "currentPrice:", currentPrice);
    let amounts = getAmounts(inverseAccount[0], inverseAccount[1], currentPrice, minOrderCoinSize);
    let buyPrice = getPrice(inverseAccount[0], inverseAccount[1], amounts[0]);
    let buyAmount = Math.round(amounts[0] * buyPrice);
    let sellPrice = getPrice(inverseAccount[0], inverseAccount[1], amounts[1]);
    let sellAmount = Math.round(amounts[1] * sellPrice);
    // Log("buy:", buyAmount, buyPrice);
    // Log("sell:", sellAmount, sellPrice);
    if ((currentPrice - buyPrice) / currentPrice < 0.1) {
        let buyOrderId = buy(buyPrice, buyAmount);
        if (buyOrderId) {
            PendingOrders[buyOrderId] = true
        }
    }
    if ((sellPrice - currentPrice) / currentPrice < 0.1) {
        let sellOrderId = sell(sellPrice, sellAmount);
        if (sellOrderId) {
            PendingOrders[sellOrderId] = true;
        }
    }
    return {"currentPrice": currentPrice, "coinSize": inverseAccount[0], "currency": inverseAccount[1]}
}

function LogStatusInfo(ctx) {
    let now = new Date();
    let statusTable = [{
        type: 'table',
        title: '网格统计',
        cols: ["买入价格", "买入数量", "卖出价格", "卖出数量", "网格盈亏(U)", "挂单手续费(U)", "收益率", "年化", ""],
        rows: [[]]
    }, {
        type: 'table',
        title: '资产汇总',
        cols: [CoinSymbol + "|价值(U)", "法币(U)", "比例", "汇总资产(U)", "初始资产(U)", "持仓收益(U)", "网格收益(U)", "总收益(U)", "收益率", "年化"],
        rows: [[]]
    }];
    statusTable[0].rows[0][0] = _N(transactionalData.buyPrice, 1);
    statusTable[0].rows[0][1] = transactionalData.buyAmount;
    statusTable[0].rows[0][2] = _N(transactionalData.sellPrice, 1);
    statusTable[0].rows[0][3] = transactionalData.sellAmount;
    let transactionPrice = (transactionalData.buyPrice + transactionalData.sellPrice) / 2;
    let transactionProfit = (transactionalData.buyAmount / transactionalData.buyPrice * transactionPrice - transactionalData.buyAmount) + (transactionalData.sellAmount - transactionalData.sellAmount / transactionalData.sellPrice * transactionPrice);
    statusTable[0].rows[0][4] = _N(transactionProfit, 2);
    let feeProfit = (transactionalData.buyAmount + transactionalData.sellAmount) * 0.025 / 100;
    statusTable[0].rows[0][5] = _N(feeProfit, 2);
    let profitRate = (feeProfit + transactionProfit) / transactionalData.initAssets * 100;
    statusTable[0].rows[0][6] = _N(profitRate, 2) + "%";
    statusTable[0].rows[0][7] = _N(profitRate / ((now.getTime() - transactionalData.initTime) / 24 / 3600 / 1000) * 365, 2) + "%";
    statusTable[0].rows[0][8] = {"type": "button", "name": "重置", "cmd": "resetTransaction", "description": "重置交易信息"};

    statusTable[1].rows[0][0] = _N(ctx.coinSize, 5) + "|" + _N(ctx.coinSize * ctx.currentPrice, 2);
    statusTable[1].rows[0][1] = _N(ctx.currency, 2);
    let currentAssets = ctx.coinSize * ctx.currentPrice + ctx.currency;
    statusTable[1].rows[0][2] = _N(ctx.coinSize * ctx.currentPrice / currentAssets, 3) + "%";
    statusTable[1].rows[0][3] = _N(currentAssets, 2);
    statusTable[1].rows[0][4] = _N(transactionalData.initAssets, 2);
    statusTable[1].rows[0][5] = _N(currentAssets - transactionProfit - feeProfit - transactionalData.initAssets, 2);
    statusTable[1].rows[0][6] = _N(transactionProfit + feeProfit, 2);
    statusTable[1].rows[0][7] = _N(currentAssets - transactionalData.initAssets, 2);
    let assetsProfitRate = (currentAssets - transactionalData.initAssets) / transactionalData.initAssets * 100;
    statusTable[1].rows[0][8] = _N(assetsProfitRate, 2) + "%";
    statusTable[1].rows[0][9] = _N(assetsProfitRate / ((now.getTime() - transactionalData.initTime) / 24 / 3600 / 1000) * 365, 2) + "%";
    LogStatus('`' + JSON.stringify(statusTable) + '`'
        // + "\n当前时间: " + _D(now.getTime())
        + "\n运行时长: " + _N((now.getTime() - transactionalData.initTime) / 24 / 3600 / 1000, 1) + "天"
        // + "\n上次重置: " + _N((now.getTime() - transactionalData.resetTime) / 24 / 3600 / 1000, 1) + "天"
    );
    LogProfit(transactionProfit + feeProfit, '&');
    pricesChart.add([0, [now.getTime(), 0]]);
    pricesChart.add([1, [now.getTime(), currentAssets - transactionalData.initAssets]]);
    pricesChart.add([2, [now.getTime(), (transactionalData.initAssets / transactionalData.initPrice) * ctx.currentPrice - transactionalData.initAssets]]);
}

function main() {
    if (Reset) {
        resetTransaction();
    }
    LogReset(1000);
    LogVacuum();
    Init();
    while (true) {
        let cmd = GetCommand();
        if (cmd) {
            Log(cmd);
            if (cmd === "resetTransaction") {
                resetTransaction();
            }
        }
        Sleep(3000);
        let ctx = loop();
        if (!ctx) {
            continue
        }
        LogStatusInfo(ctx);
    }

    // Log(GetUSDTPosition());
    // if (restoreData) {
    //     LogProfitReset();
    //     LogReset(1);
    //     LogVacuum();
    //     pricesChart.reset();
    //     _G(null);
    // }
    // checkArgs();
    // _CDelay(2000);
    // // noinspection InfiniteLoopJS
    // while (true) {
    //     let ctx = {};
    //     loop(ctx);
    //     Sleep(2000);
    //     if (ctx.positionChange) {
    //         updateChart(ctx.avgPrice);
    //     }
    // }
}

function onexit() {
    Log("取消所有订单...");
    cancelAllOrders();
}

function onerror() {
    Log("取消所有订单...");
    cancelAllOrders();
}

function cancelAllOrders() {
    let orders = _C(exchange.GetOrders);
    for (let i = 0; i < orders.length; i++) {
        exchange.CancelOrder(orders[i].Id, orders[i]);
    }
}

```

> Detail

https://www.fmz.com/strategy/365406

> Last Modified

2022-05-24 17:38:11
