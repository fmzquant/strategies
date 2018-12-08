
> 策略名称

Dynamic Balance Strategy

> 策略作者

ruby



> 策略参数



|参数|默认值|描述|
|----|----|----|
|threshold|0.05|threshold|
|ZPrecision|8|Price Precision|
|XPrecision|4|Amount Precision|
|MinStock|0.001|minimum buying amount|
|Interval|2000|error retry interval|
|LoopInterval|60|Polling Interval|


> 源码 (javascript)

``` javascript
var InitAccount = null;

function onTick(){
    var acc = _C(exchange.GetAccount);
    var ticker = _C(exchange.GetTicker);
    var spread = ticker.Sell - ticker.Buy;
    var diffAsset = (acc.Balance - (acc.Stocks * ticker.Sell))/2;
    var ratio = diffAsset / acc.Balance;
    LogStatus('ratio:', ratio, _D());
    if(Math.abs(ratio) < threshold){
        return false;    
    }
    if(ratio > 0){
        var buyPrice = _N(ticker.Sell + spread, ZPrecision);
        var buyAmount = _N(diffAsset / buyPrice, XPrecision);
        if(buyAmount < MinStock){
            return false;
        }
    exchange.Buy(buyPrice, buyAmount);
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
        
function CancelPendingOrders(){
    var ret = false;
    while(true){
        var orders = null;
        while(!(orders = exchange.GetOrders())){
            Sleep(Interval);       
        }
    if(orders.length == 0){
        return ret;       
    }
    for(var j = 0; j < orders.length; j++){
        exchange.CancelOrder(orders[j],Id);
        ret = true;
        if(j < (orders.length - 1)){
            Sleep(Interval);
            
        }
    
    }   
     
    }
    
    }


function main() {
    InitAccount = _C(exchange.GetAccount);
    while(true){
        if(onTick()){
            Sleep(1000);
            CancelPendingOrders();
            Log(_C(exchange.GetAccount));
        
        }
    Sleep(LoopInterval * 1000);
    }
   
    
}
```

> 策略出处

https://www.fmz.com/strategy/110900

> 更新时间

2018-08-13 12:35:18
