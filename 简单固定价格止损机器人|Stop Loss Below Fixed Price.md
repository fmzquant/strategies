
> 策略名称

简单固定价格止损机器人|Stop Loss Below Fixed Price

> 策略作者

botvsing



> 策略参数



|参数|默认值|描述|
|----|----|----|
|StopPrice|5000|Fixed price to stop loss|
|Intervel|10|Intervel(second) of checking coin price|


> 源码 (javascript)

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

> 策略出处

https://www.fmz.com/strategy/121081

> 更新时间

2018-10-16 10:55:52
