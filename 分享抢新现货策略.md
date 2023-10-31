
> Name

分享抢新现货策略

> Author

盯盘狗 - 策略出租





> Source (python)

``` python
import time

# 初始化策略参数
symbol = 'huobip/ht_usdt'
amount = 10
max_price = 1.5
min_price = 0.5
interval = 0.1

# 连接API
exchange = Exchange()
exchange.SetContractType(symbol)

# 主循环
while True:
    # 获取当前市场深度
    depth = exchange.GetDepth()

    # 获取当前买一和卖一价格
    buy_price = float(depth['Bids'][0]['Price'])
    sell_price = float(depth['Asks'][0]['Price'])

    # 判断是否满足条件
    if buy_price <= max_price and sell_price >= min_price:
        # 满足条件，进行买入操作
        buy_amount = amount / buy_price
        exchange.Buy(buy_price, buy_amount)
        print('买入', buy_amount, 'HT，价格', buy_price)

        # 等待一段时间后进行卖出操作
        time.sleep(interval)
        sell_price = float(depth['Asks'][0]['Price'])
        sell_amount = amount / sell_price
        exchange.Sell(sell_price, sell_amount)
        print('卖出', sell_amount, 'HT，价格', sell_price)

    # 等待下一次循环
    time.sleep(1)


#该策略使用了FMZ平台提供的Exchange API来进行交易。在主循环中，首先获取当前市场深度，然后获取当前买一和卖一价格。如果买一价格小于等于设定的最大价格且卖一价格大于等于设定的最小价格，则进行买入操作。等待一段时间后再获取当前卖一价格进行卖出操作。最后等待下一次循环。需要注意的是，抢新现货策略存在一定的风险，需要谨慎操作。
```

> Detail

https://www.fmz.com/strategy/410113

> Last Modified

2023-04-18 12:47:36
