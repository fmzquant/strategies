
> 策略名称

bitfinex保证金交易

> 策略作者

7meter





> 源码 (javascript)

``` javascript
var bitfinexIndex = 0;
var basecurrency;
var quotecurrency;

function init(){
    for(var i = 0;i<exchanges.length;i++){
        if(exchanges[i].GetName() == "Bitfinex"){
            bitfinexIndex = i
        }
    }
    var st = exchanges[bitfinexIndex].GetCurrency().split("_")
    basecurrency = st[0]
    quotecurrency = st[1]
}

$.bitfinexSell = function(price, amount){
    var message = "symbol=" + basecurrency + quotecurrency + "&amount=" + amount.toString() + "&price=" + price.toString() + "&side=sell" + "&type=limit"
    id = exchanges[bitfinexIndex].IO("api", "POST", "/v1/order/new", message)
    return id.order_id
}

$.bitfinexBuy = function(price, amount){
    var message = "symbol=" + basecurrency + quotecurrency + "&amount=" + amount.toString() + "&price=" + price.toString() + "&side=buy" + "&type=fill-or-kill"
    var id = exchanges[bitfinexIndex].IO("api", "POST", "/v1/order/new", message)
    return id.order_id
}

$.bitfinexGetPosition = function(){
    var position = exchanges[bitfinexIndex].IO("api", "POST", "/v1/positions")
    return position
}

//直接使用exchange.GetOrder(id)就可以了，不需要调用模板
$.bitfinexGetOrder = function(order_id){
    var order = exchanges[bitfinexIndex].IO("api", "POST", "/v1/order/status", "order_id=", parseInt(order_id))
    return order
}

//直接用exchange.CancelOrder(id)就可以取消订单，不需要调用模板
$.bitfinexCancelOrder = function(order_id){
    //var result = exchanges[bitfinexIndex].IO("api", "POST", "/v1/order/cancel", "order_id=", parseInt(order_id))
    //return order
}

//返回margin钱包一共可以交易多少USD（虚拟币会换成美元加入计算）
$.marginBalance = function(){
    var balance = exchanges[bitfinexIndex].IO("api", "POST", "/v1/margin_infos")
    return balance[0].tradable_balance;
}
```

> 策略出处

https://www.fmz.com/strategy/57333

> 更新时间

2017-12-02 22:04:28
