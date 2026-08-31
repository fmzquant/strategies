
> Name

Multi-Platform-Hedging-Stable-Arbitrage

> Author

John。

> Strategy Description

The program automatically accounts for exchange rates and trading fees, and places orders using the best bid and best ask as references. Note that this is not transfer arbitrage between exchanges, but a hedging strategy. No manual transfer of cash or coins is required: keep cash on one exchange, keep coins on another, buy on one side, and sell on the other to run an advanced hedge.

This hedging model profits only from the spread, regardless of whether the coin price rises or falls.

To establish the hedge, one exchange should hold cash and the other should hold coins. For example, if BTC is around $6,000, you can place about $3,000 on one exchange and about 0.45 BTC on the other, or double both allocations.

MaxDiff is the minimum inter-exchange spread.
SlidePrice is the slippage offset used when placing orders: it is added to buy orders and subtracted from sell orders.
TickInterval is the polling interval.
The lower price limit stops trading when the coin falls to that price, and the upper price limit stops trading when the coin rises above that price, helping protect the bot from abnormal or manipulated quotes.
> Strategy Arguments

|Argument|Default|Description|
|----|----|----|
|Interval|500|Error retry interval (milliseconds)|
|TickInterval|300|Polling interval (milliseconds)|
|MaxDiff|3|Minimum spread (CNY)|
|SlidePrice|0.1|Slippage price offset (CNY)|
|SlideRatio|2|Hedging slippage coefficient|
|StopPriceL|1000|Lower price limit (CNY)|
|StopPriceH|9000|Upper price limit (CNY)|
|optFeeTimeout|30|Fee refresh interval (minutes)|
|AmountOnce|0.2|Single trade amount|
|UseMarketOrder|false|Use market order for stop loss|
|StopWhenLoss|false|Stop when loss occurs|
|MaxLoss|50|Maximum loss limit (CNY)|
|SMSAPI|http://|SMS notification API endpoint|
> Source (javascript)

``` javascript
var initState;
var isBalance = true;
var feeCache = new Array();
var feeTimeout = optFeeTimeout * 60000;
var lastProfit = 0;
var lastAvgPrice = 0;
var lastSpread = 0;
var lastOpAmount = 0;

function adjustFloat(v) {
    return Math.floor(v * 1000) / 1000;
}

function isPriceNormal(v) {
    return (v >= StopPriceL) && (v <= StopPriceH);
}

function stripTicker(t) {
    return 'Buy: ' + adjustFloat(t.Buy) + ' Sell: ' + adjustFloat(t.Sell);
}

function updateStatePrice(state) {
    var now = (new Date()).getTime();
    for (var i = 0; i < state.details.length; i++) {
        var ticker = null;
        var key = state.details[i].exchange.GetName() + state.details[i].exchange.GetCurrency();
        var fee = null;
        while (!(ticker = state.details[i].exchange.GetTicker())) {
            Sleep(Interval);
        }

        if (key in feeCache) {
            var v = feeCache[key];
            if ((now - v.time) > feeTimeout) {
                delete feeCache[key];
            } else {
                fee = v.fee;
            }
        }
        if (!fee) {
            while (!(fee = state.details[i].exchange.GetFee())) {
                Sleep(Interval);
            }
            feeCache[key] = {
                fee: fee,
                time: now
            };
        }
        // Buy-=fee Sell+=fee
        state.details[i].ticker = {
            Buy: ticker.Buy * (1 - (fee.Sell / 100)),
            Sell: ticker.Sell * (1 + (fee.Buy / 100))
        };
        state.details[i].realTicker = ticker;
        state.details[i].fee = fee;
    }
}

function getProfit(stateInit, stateNow, coinPrice) {
    var netNow = stateNow.allBalance + (stateNow.allStocks * coinPrice);
    var netInit = stateInit.allBalance + (stateInit.allStocks * coinPrice);
    return adjustFloat(netNow - netInit);
}

function getExchangesState() {
    var allStocks = 0;
    var allBalance = 0;
    var minStock = 0;
    var details = [];
    for (var i = 0; i < exchanges.length; i++) {
        var account = null;
        while (!(account = exchanges[i].GetAccount())) {
            Sleep(Interval);
        }
        allStocks += account.Stocks + account.FrozenStocks;
        allBalance += account.Balance + account.FrozenBalance;
        minStock = Math.max(minStock, exchanges[i].GetMinStock());
        details.push({
            exchange: exchanges[i],
            account: account
        });
    }
    return {
        allStocks: adjustFloat(allStocks),
        allBalance: adjustFloat(allBalance),
        minStock: minStock,
        details: details
    };
}

function cancelAllOrders() {
    for (var i = 0; i < exchanges.length; i++) {
        while (true) {
            var orders = null;
            while (!(orders = exchanges[i].GetOrders())) {
                Sleep(Interval);
            }

            if (orders.length == 0) {
                break;
            }

            for (var j = 0; j < orders.length; j++) {
                exchanges[i].CancelOrder(orders[j].Id, orders[j]);
            }
        }
    }
}

function balanceAccounts() {
    // already balance
    if (isBalance) {
        return;
    }

    cancelAllOrders();

    var state = getExchangesState();
    var diff = state.allStocks - initState.allStocks;
    var adjustDiff = adjustFloat(Math.abs(diff));
    if (adjustDiff < state.minStock) {
        isBalance = true;
    } else {
        Log('初始币总数量:', initState.allStocks, '现在币总数量: ', state.allStocks, '差额:', adjustDiff);
        // other ways, diff is 0.012, bug A only has 0.006 B only has 0.006, all less then minstock
        // we try to statistical orders count to recognition this situation
        updateStatePrice(state);
        var details = state.details;
        var ordersCount = 0;
        if (diff > 0) {
            var attr = 'Sell';
            if (UseMarketOrder) {
                attr = 'Buy';
            }
            // Sell adjustDiff, sort by price high to low
            details.sort(function(a, b) {
                return b.ticker[attr] - a.ticker[attr];
            });
            for (var i = 0; i < details.length && adjustDiff >= state.minStock; i++) {
                if (isPriceNormal(details[i].ticker[attr]) && (details[i].account.Stocks >= state.minStock)) {
                    var orderAmount = adjustFloat(Math.min(AmountOnce, adjustDiff, details[i].account.Stocks));
                    var orderPrice = details[i].realTicker[attr] - SlidePrice;
                    if ((orderPrice * orderAmount) < details[i].exchange.GetMinPrice()) {
                        continue;
                    }
                    ordersCount++;
                    if (details[i].exchange.Sell(orderPrice, orderAmount, stripTicker(details[i].ticker))) {
                        adjustDiff = adjustFloat(adjustDiff - orderAmount);
                    }
                    // only operate one platform
                    break;
                }
            }
        } else {
            var attr = 'Buy';
            if (UseMarketOrder) {
                attr = 'Sell';
            }
            // Buy adjustDiff, sort by sell-price low to high
            details.sort(function(a, b) {
                return a.ticker[attr] - b.ticker[attr];
            });
            for (var i = 0; i < details.length && adjustDiff >= state.minStock; i++) {
                if (isPriceNormal(details[i].ticker[attr])) {
                    var canRealBuy = adjustFloat(details[i].account.Balance / (details[i].ticker[attr] + SlidePrice));
                    var needRealBuy = Math.min(AmountOnce, adjustDiff, canRealBuy);
                    var orderAmount = adjustFloat(needRealBuy * (1 + (details[i].fee.Buy / 100)));
                    var orderPrice = details[i].realTicker[attr] + SlidePrice;
                    if ((orderAmount < details[i].exchange.GetMinStock()) ||
                        ((orderPrice * orderAmount) < details[i].exchange.GetMinPrice())) {
                        continue;
                    }
                    ordersCount++;
                    if (details[i].exchange.Buy(orderPrice, orderAmount, stripTicker(details[i].ticker))) {
                        adjustDiff = adjustFloat(adjustDiff - needRealBuy);
                    }
                    // only operate one platform
                    break;
                }
            }
        }
        isBalance = (ordersCount == 0);
    }

    if (isBalance) {
        var currentProfit = getProfit(initState, state, lastAvgPrice);
        LogProfit(currentProfit, "Spread: ", adjustFloat((currentProfit - lastProfit) / lastOpAmount), "Balance: ", adjustFloat(state.allBalance), "Stocks: ", adjustFloat(state.allStocks));

        if (StopWhenLoss && currentProfit < 0 && Math.abs(currentProfit) > MaxLoss) {
            Log('交易亏损超过最大限度, 程序取消所有订单后退出.');
            cancelAllOrders();
            if (SMSAPI.length > 10 && SMSAPI.indexOf('http') == 0) {
                HttpQuery(SMSAPI);
                Log('已经短信通知');
            }
            throw '已停止';
        }
        lastProfit = currentProfit;
    }
}

function onTick() {
    if (!isBalance) {
        balanceAccounts();
        return;
    }

    var state = getExchangesState();
    // We also need details of price
    updateStatePrice(state);

    var details = state.details;
    var maxPair = null;
    var minPair = null;
    for (var i = 0; i < details.length; i++) {
        var sellOrderPrice = details[i].account.Stocks * (details[i].realTicker.Buy - SlidePrice);
        if (((!maxPair) || (details[i].ticker.Buy > maxPair.ticker.Buy)) && (details[i].account.Stocks >= state.minStock) &&
            (sellOrderPrice > details[i].exchange.GetMinPrice())) {
            details[i].canSell = details[i].account.Stocks;
            maxPair = details[i];
        }

        var canBuy = adjustFloat(details[i].account.Balance / (details[i].realTicker.Sell + SlidePrice));
        var buyOrderPrice = canBuy * (details[i].realTicker.Sell + SlidePrice);
        if (((!minPair) || (details[i].ticker.Sell < minPair.ticker.Sell)) && (canBuy >= state.minStock) &&
            (buyOrderPrice > details[i].exchange.GetMinPrice())) {
            details[i].canBuy = canBuy;
            // how much coins we real got with fee
            details[i].realBuy = adjustFloat(details[i].account.Balance / (details[i].ticker.Sell + SlidePrice));
            minPair = details[i];
        }
    }

    if ((!maxPair) || (!minPair) || ((maxPair.ticker.Buy - minPair.ticker.Sell) < MaxDiff) ||
        !isPriceNormal(maxPair.ticker.Buy) || !isPriceNormal(minPair.ticker.Sell)) {
        return;
    }

    // filter invalid price
    if (minPair.realTicker.Sell <= minPair.realTicker.Buy || maxPair.realTicker.Sell <= maxPair.realTicker.Buy) {
        return;
    }

    // what a fuck...
    if (maxPair.exchange.GetName() == minPair.exchange.GetName()) {
        return;
    }

    lastAvgPrice = adjustFloat((minPair.realTicker.Buy + maxPair.realTicker.Buy) / 2);
    lastSpread = adjustFloat((maxPair.realTicker.Sell - minPair.realTicker.Buy) / 2);

    // compute amount
    var amount = Math.min(AmountOnce, maxPair.canSell, minPair.realBuy);
    lastOpAmount = amount;
    var hedgePrice = adjustFloat((maxPair.realTicker.Buy - minPair.realTicker.Sell) / Math.max(SlideRatio, 2))
    if (minPair.exchange.Buy(minPair.realTicker.Sell + hedgePrice, amount * (1 + (minPair.fee.Buy / 100)), stripTicker(minPair.realTicker))) {
        maxPair.exchange.Sell(maxPair.realTicker.Buy - hedgePrice, amount, stripTicker(maxPair.realTicker));
    }

    isBalance = false;
}

function main() {
    if (exchanges.length < 2) {
        throw "交易所数量最少得两个才能完成对冲";
    }

    TickInterval = Math.max(TickInterval, 50);
    Interval = Math.max(Interval, 50);

    cancelAllOrders();

    initState = getExchangesState();
    if (initState.allStocks == 0) {
        throw "所有交易所货币数量总和为空, 必须先在任一交易所建仓才可以完成对冲";
    }
    if (initState.allBalance == 0) {
        throw "所有交易所CNY数量总和为空, 无法继续对冲";
    }

    for (var i = 0; i < initState.details.length; i++) {
        var e = initState.details[i];
        Log(e.exchange.GetName(), e.exchange.GetCurrency(), e.account);
    }

    Log("ALL: Balance: ", initState.allBalance, "Stocks: ", initState.allStocks, "Ver:", Version());


    while (true) {
        onTick();
        Sleep(parseInt(TickInterval));
    }
}
```

> Detail

https://www.fmz.com/strategy/194150

> Last Modified

2020-04-15 14:13:49
