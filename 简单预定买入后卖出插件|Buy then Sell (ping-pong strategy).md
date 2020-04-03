
> 策略名称

简单预定买入后卖出插件|Buy then Sell (ping-pong strategy)

> 策略作者

小草

> 策略描述

如题，可设定买入价格，买入成功后自动挂卖出价格卖出，
插件可以在交易终端一键启动，不收取费用，方便手动交易。详细介绍：https://www.fmz.com/digest-topic/5051

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
    var init_account = account
    Log('account: ', account.Balance);
    if(account.Balance > BUYPRICE*BUYAMOUNT){
        exchange.Buy(BUYPRICE, BUYAMOUNT);
    }else{
        throw 'account balances is not enough'
    }
    while(true){
        account = _C(exchange.GetAccount)
        if(account.Stocks >= init_account.Stocks + 0.01){
            exchange.Sell(SELLPRICE, account.Stocks - init_account.Stocks)
        }
        Sleep(Intervel*1000)
    }
}

```

> 策略出处

https://www.fmz.com/strategy/121228

> 更新时间

2020-03-24 10:50:59
