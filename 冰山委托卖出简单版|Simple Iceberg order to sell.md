
> 策略名称

冰山委托卖出简单版|Simple Iceberg order to sell

> 策略作者

botvsing

> 策略描述

Very simple, just for learn.
Code is best annotation.

> 策略参数



|参数|默认值|描述|
|----|----|----|
|SELLAMOUNT|2|amount to sell|
|SELLSIZE|0.1|sell orders size|
|INTERVAL|3|order exist time(second)|


> 源码 (javascript)

``` javascript
function main(){
    var initAccount = _C(exchange.GetAccount)
    if (initAccount.Stocks < SELLAMOUNT){
        throw 'check your account amount to sell'
    }
    while(true){
        var account = _C(exchange.GetAccount)
        var dealAmount =  initAccount.Stocks - account.Stocks
        var ticker = _C(exchange.GetTicker)
        if(SELLAMOUNT - dealAmount > SELLSIZE){
            var id = exchange.Sell(ticker.Buy, SELLSIZE)
            Sleep(INTERVAL*1000)
            if(id){
                exchange.CancelOrder(id) // May cause error log when the order is completed, which is all right.
            }else{
                throw 'sell error'
            }
        }else{
            account = _C(exchange.GetAccount)
            var avgCost = (account.Balance - initAccount.Balance)/(initAccount.Stocks - account.Stocks)
            Log('Iceberg order to sell is done, avg price is ', avgCost) // including fee cost
            return
        }
    }
}
```

> 策略出处

https://www.fmz.com/strategy/121524

> 更新时间

2018-10-16 10:57:32
