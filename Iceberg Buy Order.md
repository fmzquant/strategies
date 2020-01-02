
> 策略名称

Iceberg Buy Order

> 策略作者

小草

> 策略描述

冰山委托指的是投资者在进行大额交易时，为避免对市场造成过大冲击，将大单委托自动拆为多笔委托，根据当前的最新买一/卖一价格和客户设定的价格策略自动进行小单委托，在上一笔委托被全部成交或最新价格明显偏离当前委托价时，自动重新进行委托。
例子:
如果单次均值浮动点数设置为10那么:
每一笔委托的数量为其单次委托平均值的90%~110%，委托价格为最新买1价*（1-委托深度），在上一笔委托全部成交后再进行新的一笔委托，在最新成交价格距离该笔委托超过委托深度*2时自动撤单并重新进行委托。在策略总成交量等于其总委托数量时停止委托。当市场的最新成交价格高于其最高买入价格时停止委托，在最新成交价格重新低于最高买入价后恢复委托。

> 策略参数



|参数|默认值|描述|
|----|----|----|
|TotalBuyNet|10000|total buy value|
|AvgBuyOnce|100|avg buy value|
|FloatPoint|10|avg price float percent|
|EntrustDepth|0.1|buy depth percent|
|MaxBuyPrice|20000|Highest price to buy|
|Interval|1000|retry time(ms)|
|MinStock|0.0001|Min Stock|
|LoopInterval|true|loop time(second)|


> 源码 (javascript)

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

> 策略出处

https://www.fmz.com/strategy/103319

> 更新时间

2018-07-05 11:10:09
