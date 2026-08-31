
> Name

Shared-Gambler-Strategy-Martingale-Strategy

> Author

盯盘狗 - 策略出租

> Strategy Description

This strategy uses the Exchange API provided by the FMZ platform for trading. In the main loop, it first retrieves candlestick data and then the current price. If the current price falls below a certain percentage of the previous buy price, it performs a stop-loss. If the current price rises above a certain percentage of the previous buy price, it takes profit. If there is no current position, it opens an initial position. If the current position size is still below the configured maximum number of averaging steps, it adds to the position. Finally, it waits for the next cycle. Please note that martingale strategies carry meaningful risk and should be used with caution.

> Source (python)

``` python
import time

# 初始化策略参数
symbol = 'huobip/btc_usdt'
period = '1m'
amount = 0.01
martingale_factor = 2
max_martingale_times = 5
stop_loss = 0.05
stop_profit = 0.1
last_buy_price = 0
martingale_times = 0

# 连接API
exchange = Exchange()
exchange.SetContractType(symbol)
exchange.SetPeriod(period)

# 主循环
while True:
    # 获取K线数据
    klines = exchange.GetRecords()
    if not klines:
        continue

    # 获取当前价格
    current_price = float(klines[-1]['Close'])

    # 判断是否需要加仓
    if last_buy_price != 0 and current_price < last_buy_price * (1 - stop_loss):
        # 止损，卖出所有持仓
        sell_price = current_price
        sell_amount = exchange.GetPosition()['Amount']
        exchange.Sell(sell_price, sell_amount)
        last_buy_price = 0
        martingale_times = 0
        print('止损，卖出所有持仓，价格', sell_price)
    elif last_buy_price != 0 and current_price > last_buy_price * (1 + stop_profit):
        # 止盈，卖出所有持仓
        sell_price = current_price
        sell_amount = exchange.GetPosition()['Amount']
        exchange.Sell(sell_price, sell_amount)
        last_buy_price = 0
        martingale_times = 0
        print('止盈，卖出所有持仓，价格', sell_price)
    elif last_buy_price == 0:
        # 买入一份初始仓位
        buy_price = current_price
        buy_amount = amount / buy_price
        exchange.Buy(buy_price, buy_amount)
        last_buy_price = buy_price
        martingale_times = 0
        print('买入初始仓位，价格', buy_price)
    elif martingale_times < max_martingale_times:
        # 加仓
        buy_price = current_price * martingale_factor
        buy_amount = amount / buy_price
        exchange.Buy(buy_price, buy_amount)
        last_buy_price = (last_buy_price * martingale_times + buy_price) / (martingale_times + 1)
        martingale_times += 1
        print('加仓，价格', buy_price)

    # 等待下一次循环
    time.sleep(60)

```

> Detail

https://www.fmz.com/strategy/410114

> Last Modified

2023-04-18 12:51:35
