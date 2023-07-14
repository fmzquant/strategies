
> Name

单平台均衡策略

> Author

Zero

> Strategy Description

这个需要建仓，比如账户有5000块钱，跟1个币，如果币的价值大于账户的余额5000了并且差价超过阀值，比如币现在值6000块钱，就卖掉(6000-5000)/6000/2个币，说明币升值了，把钱兑换回来，如果币贬值了，比如4000块钱了，就买入(5000-4000)/4000/2个币, 币跌的时候买一些回来，如果再涨了，就再卖掉，好像天平一样，两边不同的对冲，所以我命名为均衡策略

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|threshold|0.05|阀值|
|Interval|2000|出错重试间隔(毫秒)|
|LoopInterval|60|轮询间隔(秒)|
|MinStock|0.001|最小交易量|
|XPrecision|4|量精度|
|ZPrecision|8|价格精度|


> Source (javascript)

``` javascript
/*backtest
start: 2018-03-01 00:00:00
end: 2018-08-01 11:00:00
period: 15m
exchanges: [{"eid":"OKCoin_EN","currency":"BTC"}]
*/

function CancelPendingOrders() {
    var ret = false;
    while (true) {
        var orders = null;
        while (!(orders = exchange.GetOrders())) {
            Sleep(Interval);
        }

        if (orders.length == 0) {
            return ret;
        }

        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id);
            ret = true;
            if (j < (orders.length-1)) {
                Sleep(Interval);
            }
        }
    }
    return ret;
}

var InitAccount = null;

function onTick() {
    var acc = _C(exchange.GetAccount);
    var ticker = _C(exchange.GetTicker);
    var spread = ticker.Sell - ticker.Buy;
    var diffAsset = (acc.Balance - (acc.Stocks * ticker.Sell)) / 2;
    var ratio = diffAsset / acc.Balance;
    LogStatus('ratio:', ratio, _D());
    if (Math.abs(ratio) < threshold) {
        return false;
    }
    if (ratio > 0) {
        var buyPrice = _N(ticker.Sell + spread, ZPrecision);
        var buyAmount = _N(diffAsset / buyPrice, XPrecision);
        if (buyAmount < MinStock) {
            return false;
        }
        exchange.Buy(buyPrice, buyAmount, diffAsset, ratio);
    } else {
        var sellPrice = _N(ticker.Buy - spread, ZPrecision);
        var sellAmount = _N(-diffAsset / sellPrice, XPrecision);
        if (sellAmount < MinStock) {
            return false;
        }
        exchange.Sell(sellPrice, sellAmount, diffAsset, ratio);
    }
    return true;
}

function main() {
    InitAccount = _C(exchange.GetAccount);
    LoopInterval = Math.max(LoopInterval, 1);
    while (1) {
        if (onTick()) {
            Sleep(1000);
            CancelPendingOrders();
            Log(_C(exchange.GetAccount));
        }
        Sleep(LoopInterval * 1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/345

> Last Modified

2018-08-09 12:22:08
