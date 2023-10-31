
> Name

分享RSI超买超卖策略

> Author

盯盘狗 - 策略出租





> Source (python)

``` python
import talib
import numpy as np
import time

# 初始化策略参数
symbol = 'huobip/btc_usdt'
period = '1m'
rsi_period = 14
rsi_buy = 30
rsi_sell = 70
amount = 0.01
last_buy_price = 0

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

    # 计算RSI指标
    close_prices = np.array([float(k['Close']) for k in klines])
    rsi = talib.RSI(close_prices, rsi_period)

    # 获取当前价格
    current_price = float(klines[-1]['Close'])

    # 判断是否超买或超卖
    if rsi[-1] < rsi_buy and last_buy_price == 0:
        # 超卖，买入
        buy_price = current_price
        buy_amount = amount / buy_price
        exchange.Buy(buy_price, buy_amount)
        last_buy_price = buy_price
        print('买入', buy_amount, 'BTC，价格', buy_price)
    elif rsi[-1] > rsi_sell and last_buy_price != 0:
        # 超买，卖出
        sell_price = current_price
        sell_amount = amount / sell_price
        exchange.Sell(sell_price, sell_amount)
        last_buy_price = 0
        print('卖出', sell_amount, 'BTC，价格', sell_price)

    # 等待下一次循环
    time.sleep(60)

```

> Detail

https://www.fmz.com/strategy/410112

> Last Modified

2023-04-18 12:46:08
