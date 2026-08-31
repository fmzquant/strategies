
> Name

Cryptocurrency-Spot-New-Listing-Token-Sniping-Strategy-Tutorial

> Author

发明者量化-小小梦

> Strategy Description

Related article: https://www.fmz.com/bbs-topic/9262

> Strategy Arguments

|Argument|Default|Description|
|----|----|----|
|symbol|null|Trading pair to monitor|
|ApiReqInterval|200|API request interval|
|pendingPrice|-1|Order price|
|pendingAmount|-1|Order quantity|
|deltaPrice|-1|Price increment|
|deltaAmount|-1|Order quantity increment|
|ordersNum|10|Number of orders|

> Source (javascript)

``` javascript
function pendingOrders(ordersNum, price, amount, deltaPrice, deltaAmount) {
    var routineOrders = []
    var ordersIDs = []
    for (var i = 0 ; i < ordersNum ; i++) {
        var routine = exchange.Go("Buy", price + i * deltaPrice, amount + i * deltaAmount)
        routineOrders.push(routine)
        Sleep(ApiReqInterval)        
    }
    for (var i = 0 ; i < routineOrders.length ; i++) {
        var orderId = routineOrders[i].wait()
        if (orderId) {
            ordersIDs.push(orderId)
            Log("成功挂单", orderId)
        }        
    }
    return ordersIDs
}

function main() {
    if (symbol == "null" || pendingPrice == -1 || pendingAmount == -1 || pendingPrice == -1 || deltaPrice == -1 || deltaAmount == -1) {
        throw "参数设置错误"
    }
    exchange.SetCurrency(symbol)
    // 屏蔽错误信息
    SetErrorFilter("GetDepth")
    while (true) {
        var msg = ""
        var depth = exchange.GetDepth()
        if (!depth || (depth.Bids.length == 0 && depth.Asks.length == 0)) {
            // 没有深度
            msg = "没有深度数据，等待！"
            Sleep(500)
        } else {
            // 获取到深度
            Log("并发下单！")
            var ordersIDs = pendingOrders(ordersNum, pendingPrice, pendingAmount, deltaPrice, deltaAmount)
            while (true) {
                var orders = _C(exchange.GetOrders)
                if (orders.length == 0) {
                    Log("当前挂单个数0，停止运行")
                    return 
                }
                var tbl = {
                    type: "table",
                    title: "当前挂单",
                    cols: ["id", "价格", "数量"], 
                    rows: []
                }
                _.each(orders, function(order) {
                    tbl.rows.push([order.Id, order.Price, order.Amount])
                })
                LogStatus(_D(), "\n`" + JSON.stringify(tbl) + "`")
                Sleep(500)
            }
        }
        LogStatus(_D(), msg)
    }
}


```

> Detail

https://www.fmz.com/strategy/358383

> Last Modified

2022-04-20 18:43:33
