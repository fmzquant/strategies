
> Name

Iceberg-Buy-Order

> Author

小草

> Strategy Description

An iceberg order is used for large trades. To avoid causing excessive market impact, a large order is automatically split into multiple smaller orders. Based on the current best bid/ask and the user's pricing rules, the strategy continuously places small orders. After the previous order is fully filled, or when the latest market price deviates significantly from the current order price, it automatically submits a new order.

Example:
If the single-order average float points are set to 10:
Each order size is randomized between 90% and 110% of the average single-order amount. The order price is the latest best bid multiplied by (1 - order depth). After one order is fully filled, a new order is placed. If the latest traded price moves more than 2 × the order depth away from that order price, the pending order is canceled and resubmitted automatically. The strategy stops placing orders once the total executed amount reaches the target total order quantity. It also pauses buying when the latest traded price rises above the maximum buy price, and resumes after the latest traded price drops back below that maximum buy price.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|TotalBuyNet|10000|total buy value|
|AvgBuyOnce|100|avg buy value|
|FloatPoint|10|avg price float percent|
|EntrustDepth|0.1|buy depth percent|
|MaxBuyPrice|20000|Highest price to buy|
|Interval|1000|retry time(ms)|
|MinStock|0.0001|Min Stock|
|LoopInterval|true|loop time(second)|


> Source (javascript)

``` javascript
function CancelPendingOrders() {
    while (true) {
        var orders = _C(exchange.GetOrders);
        if (orders.length == 0) {
            return;
        }

        for (var j = 0; j < orders.length; j++) {
            exchange.CancelOrder(orders[j].Id);
            if (j < (orders.length-1)) {
                Sleep(Interval);
            }
        }
    }
}

var LastBuyPrice = 0;
var InitAccount = null;

function dispatch() {
    var account = null;
    var ticker = _C(exchange.GetTicker);
    if (LastBuyPrice > 0) {
        if (_C(exchange.GetOrders).length > 0) {
            if (ticker.Last > LastBuyPrice && ((ticker.Last - LastBuyPrice) / LastBuyPrice) > (2*(EntrustDepth/100))) {
                Log('deviate to much, newest last price:', ticker.Last, 'order buy price', LastBuyPrice);
                CancelPendingOrders();
            } else {
                return true;
            }
        } else {
            account = _C(exchange.GetAccount);
            Log("order finised, total cost:", _N(InitAccount.Balance - account.Balance), "avg buy price:", _N((InitAccount.Balance - account.Balance) / (account.Stocks - InitAccount.Stocks)));
        }
        LastBuyPrice = 0;
    }
    
    var BuyPrice = _N(ticker.Buy * (1 - EntrustDepth/100),PricePerision);
    if (BuyPrice > MaxBuyPrice) {
        return true;
    }
    
    if (!account) {
        account = _C(exchange.GetAccount);
    }


    if ((InitAccount.Balance - account.Balance) >= TotalBuyNet) {
        return false;
    }
    
    var RandomAvgBuyOnce = (AvgBuyOnce * ((100 - FloatPoint) / 100)) + (((FloatPoint * 2) / 100) * AvgBuyOnce * Math.random());
    var UsedMoney = Math.min(account.Balance, RandomAvgBuyOnce, TotalBuyNet - (InitAccount.Balance - account.Balance));
    
    var BuyAmount = _N(UsedMoney / BuyPrice, 3);
    if (BuyAmount < MinStock) {
        return false;
    }
    LastBuyPrice = BuyPrice;
    exchange.Buy(BuyPrice, BuyAmount, 'Cost: ', _N(UsedMoney), 'last price', ticker.Last);
    return true;
}

function main() {
    CancelPendingOrders();
    InitAccount = _C(exchange.GetAccount);
    Log(InitAccount);
    if (InitAccount.Balance < TotalBuyNet) {
        throw "balance not enough";
    }
    LoopInterval = Math.max(LoopInterval, 1);
    while (dispatch()) {
        Sleep(LoopInterval * 1000);
    }
    Log("All Done", _C(exchange.GetAccount));
}

```

> Detail

https://www.fmz.com/strategy/103319

> Last Modified

2018-07-05 11:10:09
