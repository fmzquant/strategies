
> 策略名称

MACD低买高卖自动跟单滑动止损

> 策略作者

John



> 策略参数



|参数|默认值|描述|
|----|----|----|
|ac1|0.005|交叉后第一柱|
|bc1|-1e-06|交叉后前一柱|
|SlidePrice|0.3|滑动价格|
|TrailingStop|0.5|止损点|
|orderTimeout|30|买单超时(秒)|
|MinStock|30|最小持仓|


> 源码 (javascript)

``` javascript


Fixed = function(v) {
    return Math.floor(v*1000)/1000;
};

// for orders
WaitOrder = function(exchange, orderId, timeoutToCancel) {
    var ts = (new Date()).getTime();
    while (true) {
        Sleep(3000);
        var orderInfo = exchange.GetOrder(orderId);
        if (!orderInfo) {
            continue;
        }
        if (orderInfo.Status == ORDER_STATE_CLOSED || orderInfo.Status == ORDER_STATE_CANCELED) {
            return orderInfo;
        }
        if (((new Date()).getTime() - ts) > timeoutToCancel) {
            exchange.CancelOrder(orderId);
        }
    }
};

Buy = function(exchange, maxPrice, slidePrice, balanceRatio, timeoutS) {
    var ts = (new Date()).getTime();
    var account;
    var dealAmount = 0.0;
    var usedBlance = 0.0;
    var maxBalanceUse = 0.0;
    var isFirst = true;
    do {
        if (isFirst) {
            isFirst = false;
        } else {
            Sleep(3000);
        }

        var ticker = exchange.GetTicker();
        if (!ticker) {
            continue;
        }

        var buyPrice = ticker.Sell + slidePrice;

        // Price too high, wait...
        if (buyPrice > maxPrice) {
            continue;
        }

        // Initialize at first
        if (!account) {
            account = exchange.GetAccount();
            if (!account) {
                continue;
            }
            // Initialize maxBalanceUse
            maxBalanceUse = account.Balance * balanceRatio;
        }

        var buyAmount = Fixed((maxBalanceUse - usedBlance) / buyPrice);
        if (buyAmount < MinStock) {
            break;
        }

        orderId = exchange.Buy(buyPrice, buyAmount);
        if (!orderId) {
            Log(buyPrice, buyAmount, maxBalanceUse, usedBlance);
            continue;
        }

        var orderInfo = WaitOrder(exchange, orderId, timeoutS);
        dealAmount += orderInfo.DealAmount;
        usedBlance += orderInfo.Price * orderInfo.DealAmount;
        if (orderInfo.Status == ORDER_STATE_CLOSED) {
            break;
        }
    } while (((new Date()).getTime() - ts) < timeoutS);

    return {amount: dealAmount, price: (dealAmount > 0 ? usedBlance / dealAmount : 0)};
};

Sell = function(exchange, sellAmount, slidePrice) {
    // Account info must set
    var account = exchange.GetAccount();
    while (!account) {
        Sleep(2000);
        account = exchange.GetAccount();
    }

    sellAmount = Math.min(sellAmount, account.Stocks);

    var cash = 0.0;
    var remain = sellAmount;

    while (remain >= exchange.GetMinStock()) {
        var ticker = exchange.GetTicker();
        if (!ticker) {
            Sleep(2000);
            continue;
        }
        var sellPrice = ticker.Buy - slidePrice;
        var sellOrderId = exchange.Sell(sellPrice, remain);
        if (!sellOrderId) {
            Sleep(2000);
            continue;
        }
        var orderInfo = WaitOrder(exchange, sellOrderId, 10000);
        remain -= orderInfo.DealAmount;
        cash += orderInfo.Price * orderInfo.DealAmount;
    }
    return {amount: sellAmount, price: (sellAmount > 0 ? cash / sellAmount : 0)};
};

var BuyInfo;
var BanlanceRatio = 1.0;
var Profit = 0.0;
var timeAtBuy = 0;

function onTick(exchange) {
    var ticker = exchange.GetTicker();
    var records = exchange.GetRecords();
    if (!ticker || !records || records.length < 45) {
        return;
    }

    var ticks = [];
    for (var i = 0; i < records.length; i++) {
        ticks.push(records[i].Close);
    }

    var macd = TA.MACD(records, 12, 26, 9);
    var dif = macd[0];
    var dea = macd[1];
    var his = macd[2];
    
    var op = 0;
    if (!BuyInfo) {
        if (dif[ticks.length-1] > 0 && his[ticks.length-1] > ac1 && his[ticks.length-2] < bc1) {
            op = 1;
        }
    } else {
        if (records[records.length-2].Time > timeAtBuy && records[records.length-1].Close < records[records.length-1].Open - 0.5
                && records[records.length-2].Close < records[records.length-2].Open - 0.5
                && records[records.length-1].Close < records[records.length-2].Close - 0.5) {
            op = 2;
        } else if (records[records.length-2].Time > timeAtBuy && BuyInfo.price > records[records.length-1].Close && records[records.length-1].Close < records[records.length-1].Open - 0.5) {
            op = 2;
        } else if ((BuyInfo.price < ticker.Last || dif[ticks.length-1] < 0) && his[ticks.length-1] <= 0) {
            op = 2;
        } else if ((BuyInfo.price > ticker.Last) && ((BuyInfo.price - ticker.Last) / BuyInfo.price > TrailingStop)) {
            op = 2;
        }
    }

    if (op == 1) {
        var info = Buy(exchange, ticker.Sell + (SlidePrice * 3), SlidePrice, BanlanceRatio, orderTimeout * 1000);
        if (info.amount > 0) {
            BuyInfo = info;
            timeAtBuy = records[records.length-1].Time;
        }
    } else if (op == 2) {
        var info = Sell(exchange, BuyInfo.amount, SlidePrice);
        if (info.amount > 0) {
            Profit += info.amount * (info.price - BuyInfo.price);
            LogProfit(Profit);
            BuyInfo = null;
        }
    }
}

function main() {
    var account = exchange.GetAccount();
    if (account) {
        Log(exchange.GetName(), exchange.GetCurrency(), account);
    }
    
    while (true) {
        onTick(exchange);
        Sleep(30000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/194224

> 更新时间

2020-04-20 11:54:46
