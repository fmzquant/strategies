
> 策略名称

币安取消所有交易对未完成订单（IO扩展示范）|Cancel ALL Binance Orders

> 策略作者

小草

> 策略描述

币安取消所有交易对未完成订单，使用IO接口，可以当作学习IO接口连接为支持API接口的范例



> 源码 (javascript)

``` javascript
function cancellAll(){
    try{
        var openOrders = exchange.IO('api', 'GET', '/api/v3/openOrders');
        for (var i=0; i<openOrders.length; i++){
            var order = openOrders[i];
            var currency = '';
            if (order.symbol.endsWith('USDT')){
                currency = order.symbol.slice(0,order.symbol.length-4) + '_' + 'USDT';
            }
            else{
                currency = order.symbol.slice(0,order.symbol.length-3) + '_' + order.symbol.slice(order.symbol.length-3,order.symbol.length);
            }
            exchange.IO("currency", currency);
            exchange.CancelOrder(order.orderId);
        }
    }
    catch(err){
        Log('error');
    }
}
function main(){
    cancellAll()
}
```

> 策略出处

https://www.fmz.com/strategy/121549

> 更新时间

2019-07-03 16:36:05
