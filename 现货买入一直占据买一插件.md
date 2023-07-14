
> Name

现货买入一直占据买一插件

> Author

小草

> Strategy Description

一直占据买一或者卖一也是慢慢出货的一种方式，对市场的冲击比较小。这个策略还有一些改进的地方，可以手动改一下最小交易量或者精度。
买入：https://www.fmz.com/strategy/191582 卖出：https://www.fmz.com/strategy/191730

插件可以在交易终端一键启动，不收取费用，方便手动交易。详细介绍：https://www.fmz.com/digest-topic/5051

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|BuyAmount|true|买入总量|
|Intervel|true|休眠时间（秒）|


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
