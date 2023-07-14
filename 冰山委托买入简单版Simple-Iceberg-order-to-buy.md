
> Name

冰山委托买入简单版Simple-Iceberg-order-to-buy

> Author

小草

> Strategy Description

Very simple, just for learn.
Code is best annotation.

冰山委托买入，将订单分成小笔M买入，避免冲击市场，是很好的简单入门比特币量化交易的学习策略

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|BUYAMOUNT|2|amount to buy|
|BUYSIZE|0.1|iceberg order size|
|INTERVAL|3|orders exist time(second)|


> Source (javascript)

``` javascript
function main(){
    var initAccount = _C(exchange.GetAccount)
    while(true){
        var account = _C(exchange.GetAccount)
        var dealAmount = account.Stocks - initAccount.Stocks
        var ticker = _C(exchange.GetTicker)
        if(BUYAMOUNT - dealAmount > BUYSIZE){
            var id = exchange.Buy(ticker.Sell, BUYSIZE)
            Sleep(INTERVAL*1000)
            if(id){
                exchange.CancelOrder(id) // May cause error log when the order is completed, which is all right.
            }else{
                throw 'buy error'
            }
        }else{
            account = _C(exchange.GetAccount)
            var avgCost = (initAccount.Balance - account.Balance)/(account.Stocks - initAccount.Stocks)
            Log('Iceberg order to buy is done, avg cost is ', avgCost) // including fee cost
            return
        }
        
    }
}
```

> Detail

https://www.fmz.com/strategy/121522

> Last Modified

2020-03-20 16:24:13
