
> Name

定时撤单

> Author

亚瑟d

> Strategy Description

定时撤单

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|LoopInterval|30|轮询间隔(分)|


> Source (javascript)

``` javascript
// 回测环境
/*backtest
start: 2018-01-01 00:00:00
end: 2018-08-01 11:00:00
period: 1m
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/



// 撤单函数
function CancelPendingOrders() {
    Sleep(1000); // 休眠 1秒
    var ret = false;
    while (true) {
        var orders = null;
        // 持续获取未成交订单数组，如果返回异常，则继续获取
        while (!(orders = exchange.GetOrders())) {
            Sleep(1000); // 休眠 1秒
        }
        if (orders.length == 0) { // 如果订单数组为空
            return ret; // 返回撤单状态
        }
        for (var j = 0; j < orders.length; j++) { // 遍历未成交订单数组
            exchange.CancelOrder(orders[j].Id); // 依次取消未成交订单
            ret = true;
            if (j < (orders.length - 1)) {
                Sleep(1000); // 休眠 1秒
            }
        }
    }
}


// 主函数
function main() {
    while (true) { // 轮询模式
            CancelPendingOrders(); // 取消未成交的挂单
            Log(_C(exchange.GetAccount)); // 打印当前账户信息
        Sleep(LoopInterval * 60000); // 休眠
    }
}
```

> Detail

https://www.fmz.com/strategy/284760

> Last Modified

2021-05-25 18:15:28
