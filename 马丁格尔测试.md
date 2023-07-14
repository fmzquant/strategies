
> Name

马丁格尔测试

> Author

Zer3192





> Source (javascript)

``` javascript
// 马丁格尔策略
var baseAmount = 0.001; // 初始下单数量
var martingaleFactor = 1.01; // 加码因子
var maxOrders = 100; // 最大下单次数
var currentOrders = 0; // 当前下单次数
var currentAmount = baseAmount; // 当前下单数量

function main() {
    while (true) {
        var ticker = exchange.GetTicker();
        var price = ticker.Last;
        var buyPrice = price - 1000; // 设置买入价为当前价格减1
        var sellPrice = price + 500; // 设置卖出价为当前价格加1
        if (currentOrders < maxOrders) {
            // 下单
            if (currentOrders % 2 == 0) {
                // 偶数次下单买入
                var orderId = exchange.Buy(buyPrice, currentAmount);
                if (orderId) {
                    currentOrders++;
                    currentAmount *= martingaleFactor;
                }
            } else {
                // 奇数次下单卖出
                var orderId = exchange.Sell(sellPrice, currentAmount);
                if (orderId) {
                    currentOrders++;
                    currentAmount *= martingaleFactor;
                }
            }
        } else {
            // 达到最大下单次数，退出循环
            break;
        }
        Sleep(1000); // 等待1秒钟
    }
}
```

> Detail

https://www.fmz.com/strategy/416879

> Last Modified

2023-06-09 18:04:23
