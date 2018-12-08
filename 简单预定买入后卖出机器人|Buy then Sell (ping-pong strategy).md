
> 策略名称

简单预定买入后卖出机器人|Buy then Sell (ping-pong strategy)

> 策略作者

botvsing



> 策略参数



|参数|默认值|描述|
|----|----|----|
|BUYPRICE|6200|buy price|
|BUYAMOUNT|0.1|buy amount|
|SELLPRICE|6400|sell price after buying|
|Intervel|6|sleep time (second)|


> 源码 (javascript)

``` javascript
function CancelPendingOrders() {
    var orders = _C(exchange.GetOrders);
    for (var j = 0; j < orders.length; j++) {
        exchange.CancelOrder(orders[j].Id, orders[j]);
    }
}
function main() {
    Log('robot starts to run')
    if(BUYPRICE >= SELLPRICE){
        throw 'check buy and sell price'
    }
    CancelPendingOrders()
    var account = _C(exchange.GetAccount)
    Log('account: ', account.Balance);
    if(account.Balance > BUYPRICE*BUYAMOUNT){
        exchange.Buy(BUYPRICE, BUYAMOUNT);
    }else{
        throw 'account balances is not enough'
    }
    while(true){
        account = _C(exchange.GetAccount)
        if(account.Stocks >= 0.1*BUYAMOUNT){
            exchange.Sell(SELLPRICE, account.Stocks)
        }
        Sleep(Intervel*1000)
    }
}

```

> 策略出处

https://www.fmz.com/strategy/121228

> 更新时间

2018-10-16 10:56:26
