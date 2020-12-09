
> 策略名称

CTP商品期货订单记录策略

> 策略作者

小小梦

> 策略描述

## CTP商品期货订单记录策略

![IMG](https://www.fmz.com/upload/asset/16a52a5f0a62139310bf.png) 

该策略没有任何参数。
该策略作为CTP商品期货事件触发机制的一个例子展示，可以记录例如手工下单，机器人下单的订单信息，并且显示出来。
可以基于此维护一个本地的订单记录。

本例子是一个测试例子，学习为主，并非交易策略，如有问题，欢迎留言。



> 源码 (javascript)

``` javascript
var arrOrders = []

function checkOrder(id) {
    for (var i = 0; i < arrOrders.length; i++) {
        if (id == arrOrders[i].Id) {
            return [true, i]
        }
    }
    return [false, null]
}

function on_order(order) {
    Log("order:", order)
    if(order.Price == 0 || order.ContractType == "") {   // 过滤掉一些FMZ平台市价单相关的信息
        return "market order"   
    }
    var retCheck = checkOrder(order.Id)
    if (retCheck[0]) {
        arrOrders[retCheck[1]] = order
    } else {
        arrOrders.push(order)
    }
}

function main() {
    while(!exchange.IO("status")) {
        Sleep(10)
    }
    exchange.SetContractType("MA888")     // 订阅任何一个合约，如果不订阅合约，会报错
    while(true) {
        var e = exchange.IO("wait")
        if(e) {
            if(e.Event == "order") {
                on_order(e.Order)
            }
        }
        var ordersTbl = {
            type : "table", 
            title : "订单列表", 
            cols : ["订单ID", "价格", "买/卖方向", "订单状态", "手数", "合约代码", "平均价格", "成交数量", "开仓/平仓"], 
            rows : []
        }
        for(var i = 0; i < arrOrders.length; i++) {
            var o = arrOrders[i]
            var typeMsg = ["买入#ff0000", "卖出#cd32cd"]
            var statusMsg = ["等待成交", "订单完成", "订单撤销", "未知"]
            var offsetMsg = ["开仓", "平仓"]
            ordersTbl.rows.push([o.Id, o.Price, typeMsg[o.Type], statusMsg[o.Status], o.Amount, o.ContractType, o.AvgPrice, o.DealAmount, offsetMsg[o.Offset]])
        }

        LogStatus("时间：", _D(), "\n`" + JSON.stringify(ordersTbl) + "`")
        Sleep(1000)
    }
}

```

> 策略出处

https://www.fmz.com/strategy/234381

> 更新时间

2020-10-29 12:02:56
