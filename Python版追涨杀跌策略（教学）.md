
> 策略名称

Python版追涨杀跌策略（教学）

> 策略作者

小小梦

> 策略描述

https://www.fmz.com/bbs-topic/4908



> 源码 (python)

``` python
'''backtest
start: 2019-02-20 00:00:00
end: 2020-01-10 00:00:00
period: 1m
exchanges: [{"eid":"OKEX","currency":"BTC_USDT"}]
'''

import time

basePrice = -1
ratio = 0.05
acc = _C(exchange.GetAccount)
lastCancelAll = 0
minStocks = 0.01

def CancelAll():
    while True : 
        orders = _C(exchange.GetOrders)
        for i in range(len(orders)) :
            exchange.CancelOrder(orders[i]["Id"], orders[i])
        if len(orders) == 0 :
            break
        Sleep(1000)

def main():
    global basePrice, acc, lastCancelAll
    exchange.SetPrecision(2, 3)
    while True:
        ticker = _C(exchange.GetTicker)
        if basePrice == -1 :
            basePrice = ticker.Last
        if ticker.Last - basePrice > 0 and (ticker.Last - basePrice) / basePrice > ratio :
            acc = _C(exchange.GetAccount)
            if acc.Balance * ratio / ticker.Last > minStocks :
                exchange.Buy(ticker.Last, acc.Balance * ratio / ticker.Last)
                basePrice = ticker.Last
        if ticker.Last - basePrice < 0 and (basePrice - ticker.Last) / basePrice > ratio : 
            acc = _C(exchange.GetAccount)
            if acc.Stocks * ratio > minStocks :
                exchange.Sell(ticker.Last, acc.Stocks * ratio)
                basePrice = ticker.Last
        ts = time.time()
        if ts - lastCancelAll > 60 * 5 :
            CancelAll()
            lastCancelAll = ts 
        LogStatus(_D(), "\n", "行情信息:", ticker, "\n", "账户信息:", acc)
        Sleep(500)
```

> 策略出处

https://www.fmz.com/strategy/181185

> 更新时间

2020-01-11 15:15:01
