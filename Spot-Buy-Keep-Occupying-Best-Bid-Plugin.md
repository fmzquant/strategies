
> Name

Spot-Buy-Keep-Occupying-Best-Bid-Plugin

> Author

小草

> Strategy Description

Continuously occupying the best bid or best ask can be a way to accumulate or distribute a position gradually while minimizing market impact. This strategy still has room for improvement, and you can manually adjust the minimum trade size or precision if needed.
Buy version: https://www.fmz.com/strategy/191582 Sell version: https://www.fmz.com/strategy/191730

The plugin can be launched from the trading terminal with one click, is free to use, and is convenient for manual trading. Detailed introduction: https://www.fmz.com/digest-topic/5051
> Strategy Arguments

|Argument|Default|Description|
|----|----|----|
|BuyAmount|true|Total buy amount|
|Intervel|true|Sleep time (seconds)|
> Source (javascript)

``` javascript
function GetPrecision(){
    var precision = {price:0, amount:0}
    var depth = exchange.GetDepth()
    for(var i=0;i<depth.Asks.length;i++){
        var amountPrecision = depth.Asks[i].Amount.toString().indexOf('.') > -1 ? depth.Asks[i].Amount.toString().split('.')[1].length : 0
        precision.amount = Math.max(precision.amount,amountPrecision)
        var pricePrecision = depth.Asks[i].Price.toString().indexOf('.') > -1 ? depth.Asks[i].Price.toString().split('.')[1].length : 0
        precision.price = Math.max(precision.price,pricePrecision)
    }
    return precision
}

function main(){
    var initAccount = exchange.GetAccount()
    if(!initAccount){return '无法获取账户信息'}
    var precision = GetPrecision()
    var buyPrice = 0
    var lastId = 0
    var done = false
    while(true){
        var account = _C(exchange.GetAccount)
        var dealAmount = account.Stocks - initAccount.Stocks
        var ticker = _C(exchange.GetTicker)
        if(BuyAmount - dealAmount > 1/Math.pow(10,precision.amount) && ticker.Buy > buyPrice){
            if(lastId){exchange.CancelOrder(lastId)}
            var id = exchange.Buy(ticker.Buy, _N(BuyAmount - dealAmount,precision.amount))
            if(id){
                lastId = id
            }else{
                done = true
            }
        }
        if(BuyAmount - dealAmount <= 1/Math.pow(10,precision.amount)){done = true}
        if(done){
            var avgCost = (initAccount.Balance - account.Balance)/dealAmount
            return 'order is done, avg cost is ' + avgCost  // including fee cost
        }
        Sleep(Intervel*1000)
    }
}
```

> Detail

https://www.fmz.com/strategy/191582

> Last Modified

2020-06-09 15:06:43
