
> 策略名称

现货冰山委托买入插件|Simple Iceberg order to buy  (Copy)

> 策略作者

小草

> 策略描述

Very simple, just for learn.
Code is best annotation.

冰山委托买入，将订单分成小笔M买入，避免冲击市场，是很好的简单入门比特币量化交易的学习策略
插件可以在交易终端一键启动，不收取费用，方便手动交易。详细介绍：https://www.fmz.com/digest-topic/5051

> 策略参数



|参数|默认值|描述|
|----|----|----|
|BUYAMOUNT|2|amount to buy|
|BUYSIZE|0.1|iceberg order size|
|INTERVAL|3|orders exist time(second)|


> 源码 (javascript)

``` javascript
function main(){
    var initAccount = _C(exchange.GetAccount)
    while(true){
        var account = _C(exchange.GetAccount)
        var dealAmount = account.Stocks - initAccount.Stocks
        var ticker = _C(exchange.GetTicker)
        if(BUYAMOUNT - dealAmount >= BUYSIZE){
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
            return 'Iceberg order to buy is done, avg cost is '+avgCost
        }
        
    }
}
```

> 策略出处

https://www.fmz.com/strategy/191771

> 更新时间

2020-03-24 10:50:51
