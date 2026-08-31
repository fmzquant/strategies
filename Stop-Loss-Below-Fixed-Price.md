
> Name

Stop-Loss-Below-Fixed-Price

> Author

小草

> Strategy Description

A simple fixed-price stop-loss bot that can help you stop losses. It is also a good introductory strategy for quantitative cryptocurrency trading.

### Parameters:

StopPrice：Fixed price to stop loss	
 
Intervel：	Intervel(second) of checking coin price

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|StopPrice|5000|Fixed price to stop loss|
|Intervel|10|Intervel(second) of checking coin price|


> Source (javascript)

``` javascript
function CancelPendingOrders() {
    var orders = _C(exchange.GetOrders);
    for (var j = 0; j < orders.length; j++) {
        exchange.CancelOrder(orders[j].Id, orders[j]);
    }
}
function StopLoss(){
    var done = false
    while(!done){
        var ticker = _C(exchange.GetTicker)
        account = _C(exchange.GetAccount)
        var price = ticker.Buy
        var amount = account.Stocks
        try{
            if(amount > 0){
                var id = exchange.Sell(price, amount);
                if(id){
                    exchange.CancelOrder(id)
                }
                else{
                    Log('all coins are sold')
                    Log('total coins: ', account.Stocks)
                    done = true
                }
            }
        }catch(err){
            Log('error, stop')
            done = true
        }
        Sleep(1000);
    }
}
function main() {
    Log('robot starts to run')
    CancelPendingOrders()
    var account = _C(exchange.GetAccount)
    Log('total coins: ', account.Stocks);
    while(true){
        var ticker = _C(exchange.GetTicker)
        if(ticker.Last <= StopPrice){
            Log('Last price is:', ticker.Last, 'Stop price is: ', StopPrice)
            Log('the stop price has reached, start to sell')
            StopLoss();
            break;
        }
        Sleep(Intervel*1000)
    }
    Log('robot has stopped')
}
```

> Detail

https://www.fmz.com/strategy/121081

> Last Modified

2019-07-03 16:41:50
