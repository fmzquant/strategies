
> Name

BitMEX-高级API功能-期货批量下单一键撤单-JavaScript

> Author

FawkesPan





> Source (javascript)

``` javascript
/*

 BitMEX Advanced API Interface for FMZ.com.

 Copyright 2018 FawkesPan
 Contact : i@fawkex.me / Telegram@FawkesPan

 GNU General Public License v3.0

*/

function main() {
    Log(exchange.GetAccount());
}
var bulk = []
// 添加批量买单
function BulkBuy(symbol,qty,price,type,exec) {
    Log("新的Bulk订单  开多 "+ symbol + " " + price + "   " + qty)
    var order = {};
    order.symbol = symbol;
    order.side = "Buy";
    order.orderQty = qty;
    order.price = price;
    order.ordType = type;
    order.execInst = exec;
    bulk[Object.keys(bulk).length] = order;
}
// 添加批量卖单
function BulkSell(symbol,qty,price,type,exec) {
    Log("新的Bulk订单  开空 "+ symbol + " " + price + "   " + qty)
    var order = {};
    order.symbol = symbol;
    order.side = "Sell";
    order.orderQty = qty;
    order.price = price;
    order.ordType = type;
    order.execInst = exec;
    bulk[Object.keys(bulk).length] = order;
}
//执行批量订单
function BulkPost() {
    Log("正在执行Bulk订单 共计 " + Object.keys(bulk).length + " 个订单");
    var param = "orders=" + JSON.stringify(bulk);
    bulk = [];
    exchange.IO("api", "POST", "/api/v1/order/bulk", param);
}
//取消所有订单
function CancelPendingOrders() {
    exchange.IO("api","DELETE","/api/v1/order/all","symbol="+exchange.GetCurrency());
}
```

> Detail

https://www.fmz.com/strategy/105056

> Last Modified

2018-08-30 03:01:43
