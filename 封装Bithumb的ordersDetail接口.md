
> 策略名称

封装Bithumb的ordersDetail接口

> 策略作者

小小梦

> 策略描述

应部分用户需求，使用bithumb 的时候希望查询 某个ID 的订单信息，
封装了 交易所的这个接口 :  https://api.bithumb.com/info/order_detail
只能查询完全成交的订单，其它状态的订单是查询不到的。

接口信息如下：
```
    /*
        https://api.bithumb.com/info/order_detail
        order_id   ：
        type       ： bid : Buy ask : sell
        currency   ： Currency code ，Default : BTC
    */
```


```
function main() {
    var id = exchange.Sell(-1, 0.01)        // 下市价单 成交，因为 $.GetOrder 只能查询 完全成交的订单。
                                            // 下限价单不成交的话，去查询这个ID ，会报错 Futures_OP 4: status: 5600, message: 거래 체결내역이 존재하지 않습니다. （在交易中不存在）， ，意思是查询不到这个订单
    Sleep(5000)
    var order = $.GetOrder(exchange, id)    // 传入交易所 Bithumb 的交易所对象， 传入ID ，查询不到 返回 null 
    Log(order)
}
```



> 源码 (javascript)

``` javascript
function GetOrder(e, id, type){
    /*
        https://api.bithumb.com/info/order_detail
        order_id   ：
        type       ： bid : Buy ask : sell
        currency   ： Currency code ，Default : BTC
    */
    var symbol = e.GetCurrency()
    var arr = symbol.split("_")
    var currency = arr[0]
    
    var ret = e.IO("api", "POST", "/info/order_detail", "order_id=" + id + "&type=" + type + "&currency=" + currency)
    
    // ret 
    /*
    {
        "status":"0000",
        "data":[
            {
                "order_currency":"BTC",
                "payment_currency":"KRW",
                "units_traded":"0.01",
                "price":"4322000",
                "cont_no":"32314118",
                "transaction_date":"1546054726834326",
                "type":"Buy",
                "fee":"64.83",
                "total":"43220"
            }
        ]
    }
    */
    
    /* order 结构
    {
        Id          :交易单唯一标识
        Price       :下单价格
        Amount      :下单数量
        DealAmount  :成交数量
        AvgPrice    :成交均价，                     # 注意 ，有些交易所不提供该数据，不提供的设置为 0 。 
        Status      :订单状态, 参考常量里的订单状态
        Type        :订单类型, 参考常量里的订单类型
    }
    */
    
    var order = null
    var typeValue = null
    if(type == "Buy"){
        typeValue = ORDER_TYPE_BUY
    } else {
        typeValue = ORDER_TYPE_SELL
    }
    if(ret){
        order = {
            Info      : ret,                 // 原始信息
            Id        : id,                  // 交易单唯一标识
            Price     : ret.data[0].price,   // 下单价格
            Amount    : ret.data[0].units_traded,  // 下单数量
            DealAmount: ret.data[0].units_traded,  // 成交数量
            AvgPrice  : ret.data[0].price,         // 成交均价，                     # 注意 ，有些交易所不提供该数据，不提供的设置为 0 。 
            Status    : ORDER_STATE_CLOSED,        // 订单状态, 参考常量里的订单状态
            Type      : typeValue,                 // 类型 
        }
    }
    
    return order
}

$.GetOrder = function(e, id, type){
    if(e.GetName() != "Bithumb"){
        Log("the parameter e is not bithumb!")
        return null
    }
    
    if(typeof(id) == "undefined"){
        Log("id 参数错误！")
        return null
    }
    
    if(type == "Buy"){
        GetOrder(e, id, type)
    } else if (type == "Sell") {
        GetOrder(e, id, type)
    } else {
        var buyOrder = GetOrder(e, id, "Buy")
        if(buyOrder){
            return buyOrder
        }
        var sellOrder = GetOrder(e, id, "Sell")
        if(sellOrder){
            return sellOrder
        } else {
            return null
        }
    }
}

function main() {
    var id = exchange.Sell(-1, 0.01)        // 下市价单 成交，因为 $.GetOrder 只能查询 完全成交的订单。
                                            // 下限价单不成交的话，去查询这个ID ，会报错 Futures_OP 4: status: 5600, message: 거래 체결내역이 존재하지 않습니다. （在交易中不存在）， ，意思是查询不到这个订单
    Sleep(5000)
    var order = $.GetOrder(exchange, id)    // 传入交易所 Bithumb 的交易所对象， 传入ID ，查询不到 返回 null 
    Log(order)
}
```

> 策略出处

https://www.fmz.com/strategy/132241

> 更新时间

2018-12-29 12:06:11
