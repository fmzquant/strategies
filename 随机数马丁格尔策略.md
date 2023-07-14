
> Name

随机数马丁格尔策略

> Author

Zer3192





> Source (javascript)

``` javascript
// 随机数马丁格尔策略
// 每次下单前，根据随机数决定下单方向和下单数量

// 设置初始资金和下单数量
var initCapital = 10000; // 初始资金
var initAmount = 1; // 初始下单数量

// 设置随机数范围和下单比例
var minRand = 0; // 最小随机数
var maxRand = 100; // 最大随机数
var buyRatio = 0.5; // 买入比例
var sellRatio = 0.5; // 卖出比例

// 定义下单函数
function placeOrder(direction, amount) {
    if (direction == 'buy') {
        exchange.Buy(-1,amount);
    } else if (direction == 'sell') {
        exchange.Sell(-1,amount);
    }
}

// 定义主函数
function main() {
    var capital = initCapital; // 当前资金
    var amount = initAmount; // 当前下单数量
    var lastDirection = ''; // 上次下单方向

    while (true) {
        // 生成随机数
        var rand = Math.floor(Math.random() * (maxRand - minRand + 1)) + minRand;

        // 根据随机数决定下单方向和下单数量
        var direction = '';
        if (rand <= buyRatio * maxRand) {
            direction = 'buy';
        } else if (rand >= (1 - sellRatio) * maxRand) {
            direction = 'sell';
        }

        if (direction) {
            // 如果方向发生变化，则重置下单数量
            if (direction != lastDirection) {
                amount = initAmount;
            }

            // 下单
            placeOrder(direction, amount);

            // 更新资金和下单数量
            var orderPrice = exchange.GetTicker().Last;
            var orderAmount = amount * orderPrice;
            if (direction == 'buy') {
                capital -= orderAmount;
            } else if (direction == 'sell') {
                capital += orderAmount;
            }
            amount *= 2;

            // 打印日志
            Log('下单方向：', direction, '下单数量：', amount, '当前资金：', capital);

            // 更新上次下单方向
            lastDirection = direction;
        }

        Sleep(1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/416881

> Last Modified

2023-06-09 18:22:17
