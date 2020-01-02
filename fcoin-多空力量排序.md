
> 策略名称

fcoin-多空力量排序

> 策略作者

小天才收割机

> 策略描述

fcoin挖矿策略
盘口多空比排序挖矿

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Interval|1000|出错重试间隔(毫秒)|
|LoopInterval|0.1|轮询间隔(秒)|
|Step|0.1|网格间隔(元)|
|Lot|0.005|手数|
|MaxNets|6|最大网格数|
|DisableLog|false|关闭订单跟踪|
|MinStock|0.01|最小交易币数|
|amountPrecision|4|数量精度|
|pricePrecision|true|价格精度|
|level|true|计算均价深度|
|BUY_START_LEVEL|5|买单起始深度|
|SELL_START_LEVEL|5|卖单起始深度|
|ratioThresh|2|挂单量比值阈值|
|DepthLevel|6|统计深度|


> 源码 (javascript)

``` javascript

function CancelPendingOrders() {
    var orders = _C(exchange.GetOrders);
    for (var j = 0; j < orders.length; j++) {
        exchange.CancelOrder(orders[j].Id, orders[j]);
    }
}

function onexit() {
    CancelPendingOrders();
    Sleep(100);
    Log("exit");
}

var initPrice = _C(exchange.GetTicker).Buy;
var currency = _C(exchange.GetCurrency);

if(currency == "BTC_USDT") {
    MinStock = 0.005;
    amountPrecision = 4;
    pricePrecision = 1;
} else if(currency == "ETH_USDT") {
    MinStock = 0.05;
    amountPrecision = 4;
    pricePrecision = 2;
} else if(currency == "LTC_USDT") {
    MinStock = 0.5;
    amountPrecision = 4;
    pricePrecision = 2;
} else if(currency == "EOS_USDT") {
    MinStock = 1;
    amountPrecision = 4;
    pricePrecision = 3;
} else if(currency == "XRP_USDT") {
    MinStock = 10;
    amountPrecision = 2;
    pricePrecision = 4;
} else if(currency == "BCH_USDT") {
    MinStock = 0.05;
    amountPrecision = 4;
    pricePrecision = 1;
}

Step = 1 / Math.pow(10, pricePrecision);
MaxNets = 50;

function updateProfit(accountInit, accountNow, ticker) {
    var netNow = accountNow.Balance + accountNow.FrozenBalance + ((accountNow.Stocks + accountNow.FrozenStocks) * ticker.Buy);
    var netInit = accountInit.Balance + accountInit.FrozenBalance + ((accountInit.Stocks + accountInit.FrozenStocks) * initPrice);
    LogProfit(_N(netNow - netInit, 2));
}

var LastOrdersLength = null;

var initAccount = _C(exchange.GetAccount);
var initPrice = _C(exchange.GetTicker).Last;
var initInUSD = _N(initAccount.Stocks * initPrice + initAccount.Balance, 2);

function calcDepth(orders) {
    var base = parseInt(orders[0].Price);
    var allAmount = 0;
    var n = 0;
    for (var i = 0; i < orders.length && n < DepthLevel; i++) {
        var p = parseInt(orders[i].Price);
        if (p != base) {
            n++;
            base = p;
        }
        allAmount += orders[i].Amount;
    }
    return allAmount;
}

function onTick() {
    var ticker = _C(exchange.GetTicker);
    var account = _C(exchange.GetAccount);
    var orders = _C(exchange.GetOrders);
    var depth = _C(exchange.GetDepth);
    if (LastOrdersLength != null && LastOrdersLength != orders.length) {
        updateProfit(initAccount, account, ticker);
    }
    LastOrdersLength = orders.length;
    
    var currentInUSD = _N(account.Stocks * ticker.Last + account.Balance, 2);
    LogProfit(currentInUSD - initInUSD, "&");
        
    var msg = "";
    msg += "lastPrice = " + ticker.Last + "\n" +
        "初始币：" + initAccount.Stocks + "，初始钱：" + initAccount.Balance + ", initUSD:" + initInUSD + "\n" +
        "当前币：" + account.Stocks + "，当前钱：" + account.Balance + ", currentUSD:" + currentInUSD;
    
    // 多空力量对比
    var asksAmount = calcDepth(depth.Asks);
    var bidsAmount = calcDepth(depth.Bids);
    var ratio = Math.max(asksAmount/bidsAmount, bidsAmount/asksAmount);
    ratio = asksAmount > bidsAmount ? ratio : -ratio;
    var buy_start_level = BUY_START_LEVEL;
    var sell_start_level = SELL_START_LEVEL;
    if(ratio > ratioThresh) {
        buy_start_level = 1;
        sell_start_level = 6;
    } else if(ratio <= -2) {
        sell_start_level = 1;
        buy_start_level = 6;
    }
    
    //var buy = depth.Bids[level].Price;
    //var sell = depth.Asks[level].Price;
    // 盘口上下加权平均 
    var avg_buy = 0;
    var buy_amount = 0;
    var avg_sell = 0;
    var sell_amount = 0;
    for(var i = 1; i <= level; ++i) {
        avg_buy += depth.Bids[i - 1].Price * depth.Bids[i - 1].Amount;
        buy_amount += depth.Bids[i - 1].Amount;
        avg_sell += depth.Asks[i - 1].Price * depth.Asks[i - 1].Amount;
        sell_amount += depth.Asks[i - 1].Amount;
    }
    var buy = _N(avg_buy / buy_amount, pricePrecision);
    var sell = _N(avg_sell / sell_amount, pricePrecision);
    
    //var mid = adjustFloat(ticker.Buy + ((ticker.Sell - ticker.Buy) / 2));
    var mid = _N(buy + ((sell - buy) / 2), pricePrecision);
    // var numBuy = parseInt(Math.min(MaxNets / 2 , (mid - buy) / Step, account.Balance / buy / Lot));
    var numBuy = parseInt(Math.min(MaxNets / 2, account.Balance / buy / Lot));
    var numSell = parseInt(Math.min(MaxNets / 2, account.Stocks / Lot));
    var num = Math.max(numBuy, numSell);
    
    msg += "\nticker.sell = " + ticker.Sell + ", ticker.buy = " + ticker.Buy +
        ", mid = " + _N((ticker.Buy + ticker.Sell) / 2, pricePrecision)  + "\n" +
        "avg_sell = " + sell + ", avg_buy = " + buy + ", mid = " + mid;
    msg += "\n多/空 = " + ratio;
    LogStatus(msg);
    
    var ordersKeep = [];
    var queue = [];
    for(var i = buy_start_level; i < numBuy + buy_start_level; ++i) {
        var buyPrice = _N(mid - (i * Step), pricePrecision);
        var alreadyBuy = false;
        for (j = 0; j < orders.length; j++) {
            if (orders[j].Type == ORDER_TYPE_BUY) {
                if (Math.abs(orders[j].Price - buyPrice) < (Step / 2)) {
                    alreadyBuy = true;
                    ordersKeep.push(orders[j].Id);
                }
            }
        }
        if ((!alreadyBuy) && (i < numBuy)) {
            queue.push([buyPrice, ORDER_TYPE_BUY]);
        }
    }
    
    for(var i = sell_start_level; i < numSell + sell_start_level; ++i) {
        var sellPrice = _N(mid + (i * Step), pricePrecision);
        var alreadySell = false;
        for (j = 0; j < orders.length; j++) {
            if (orders[j].Type == ORDER_TYPE_SELL) {
                if (Math.abs(orders[j].Price - sellPrice) < (Step / 2)) {
                    alreadySell = true;
                    ordersKeep.push(orders[j].Id);
                }
            }
        }
        if ((!alreadySell) && (i < numSell)) {
            queue.push([sellPrice, ORDER_TYPE_SELL]);
        }
    }

    for (var i = 0; i < orders.length; i++) {
        var keep = false;
        for (var j = 0; j < ordersKeep.length; j++) {
            if (orders[i].Id == ordersKeep[j]) {
                keep = true;
            }
        }
        if (!keep) {
            exchange.CancelOrder(orders[i].Id);
            LastOrdersLength--;
        }
    }

    for (var i = 0; i < queue.length; i++) {
        if (queue[i][1] == ORDER_TYPE_BUY) {
            exchange.Buy(_N(queue[i][0], pricePrecision), Lot);
        } else {
            exchange.Sell(_N(queue[i][0], pricePrecision), Lot);
        }
        LastOrdersLength++;
    }
}

function main() {
    if (DisableLog) {
        EnableLog(false);
    }
    Log(initAccount);
    LoopInterval = Math.max(LoopInterval, 1);
    // Lot = Math.max(MinStock, Lot);
    Lot = MinStock;
    while (true) {
        onTick();
        Sleep(LoopInterval * 1000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/161034

> 更新时间

2019-12-26 11:24:50
