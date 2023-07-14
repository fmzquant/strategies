
> Name

冲币安新上币开盘

> Author

GCC

> Strategy Description

    冲币安新币开盘用的，显而易见，成功率并不高，2021/11/4冲DAR开盘，买在了山顶，及时止损亏了10%，不玩了！

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|XX|200|冲多少|


> Source (python)

``` python
def main():
    Log(exchange.GetAccount())
    Log(exchange.GetCurrency())
    while True:
        ticker = exchange.GetTicker()
        if ticker:
            Log("开盘了，冲啊！！！@")
            exchange.SetPrecision(1,0)
            amount = XX/ticker['Last']
            exchange.Buy(-1, amount)
            exchange.Buy(-1, amount/2)
            exchange.Buy(-1, amount/4)
            exchange.Buy(-1, amount/8)
            exchange.Buy(-1, amount/16)
            Sleep(15*1000)
            while True:
                try:
                    _ticker = exchange.GetTicker()
                    if _ticker['Last'] > ticker['Last']:
                        exchange.Sell(-1, amount/3)
                        Log("已经卖出三分之一@")
                        return
                    else:
                        Sleep(30)
                        continue
                except:
                    Sleep(30)
                    continue
        else:
            Sleep(20)
```

> Detail

https://www.fmz.com/strategy/324178

> Last Modified

2021-11-20 13:45:47
