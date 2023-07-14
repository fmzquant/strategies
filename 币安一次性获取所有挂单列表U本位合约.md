
> Name

币安一次性获取所有挂单列表U本位合约

> Author

夏天不打你





> Source (javascript)

``` javascript
// 获取所有挂单
function getAllPendingOrders(num) {
    var ret = exchanges[num].IO("api", "GET", "/fapi/v1/openOrders");
    var pending_orders = [];

    if (!ret || ret.length <= 0) {
        return null;
    }

    for (var i = 0; i < ret.length; i++) {
        var type = "";
        if (ret[i].stopPrice == "0") {
            if (ret[i].positionSide == "LONG") {
                type = ret[i].side == "BUY" ? "限价开多" : "限价平多";
            } else if (ret[i].positionSide == "SHORT") {
                type = ret[i].side == "SELL" ? "限价开空" : "限价平空";
            } else {
                type = "挂单类型错误";
            }
        } else {
            if (ret[i].origType == "TAKE_PROFIT_MARKET") {
                if (ret[i].closePosition) {
                    type = ret[i].positionSide == "LONG" ? "多单仓位止盈" : "空单仓位止盈";
                } else {
                    type = ret[i].positionSide == "LONG" ? "多单止盈" : "空单止盈";
                }
            } else if (ret[i].origType == "STOP_MARKET") {
                if (ret[i].closePosition) {
                    type = ret[i].positionSide == "LONG" ? "多单仓位止损" : "空单仓位止损";
                } else {
                    type = ret[i].positionSide == "LONG" ? "多单止损" : "空单止损";
                }
            } else {
                type = "挂单类型错误";
            }
        }
        pending_orders.push({
            OrderId: ret[i].orderId,
            Symbol: ret[i].symbol.substring(0, ret[i].symbol.lastIndexOf("USDT")) + "_USDT",
            Price: Number(ret[i].price),
            Amount: Number(ret[i].origQty),
            DealAmount: Number(ret[i].executedQty),
            Type: type,
            StopPrice: Number(ret[i].stopPrice),
            Time: ret[i].time,
        });
    }

    return pending_orders;
}
```

> Detail

https://www.fmz.com/strategy/319429

> Last Modified

2021-09-27 10:27:08
