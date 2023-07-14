
> Name

网格挂单加马丁倍数递增

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|baseSpacing|10|加仓距离|
|baseAmount|0.01|基础仓位下单量|
|ratio|1.1|仓位增长系数|
|interval|500|轮询间隔|
|symbol|swap|合约代码|
|profitTarget|10|目标利润差价|
|MarginLevel|50|杠杆设置|


> Source (javascript)

``` javascript
/*backtest
start: 2017-06-26 00:00:00
end: 2022-02-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/
var MarginLevel=20
exchange.SetMarginLevel(MarginLevel)
function cancelAll() {
    while (true) {
        var orders = _C(exchange.GetOrders)
        if (orders.length == 0) { 
            break 
        }
        for (var i = 0 ; i < orders.length ; i++) {
            exchange.CancelOrder(orders[i].Id, orders[i])
            Sleep(interval)
        }
    }
}


function getLong(arr, kind) {
    var ret = null 
    for (var i = 0 ; i < arr.length ; i++) {
        if (arr[i].Type == (kind == "pos" ? PD_LONG : ORDER_TYPE_BUY)) {
            ret = arr[i]
        }
    }
    return ret
}

function pendingBidOrders(firstPrice) {
    var index = 0
    var bet=ratio
    var n = baseAmount
    while (true) {
        var pos = _C(exchange.GetPosition)
        var price = firstPrice - index * baseSpacing
         n=n*ratio
        index++
        exchange.SetDirection("buy")
        exchange.Buy(price, amount=n)        
        if (pos.length != 0) {
            var longPos = getLong(pos, "pos")
            if (longPos) {
                exchange.SetDirection("closebuy")
                exchange.Sell(longPos.Price + profitTarget, longPos.Amount)
            }
        }
        while (true) {
            Sleep(interval)
            if (!getLong(_C(exchange.GetOrders), "orders")) {
                cancelAll()
                break
            }
            if (!getLong(_C(exchange.GetPosition), "pos")) {
                cancelAll()
                return 
            }
        }
    }
}

function main() {
    exchange.SetContractType(symbol)
    while (true) {
        pendingBidOrders(_C(exchange.GetTicker).Last)
    }
}
```

> Detail

https://www.fmz.com/strategy/353659

> Last Modified

2022-04-11 05:44:21
