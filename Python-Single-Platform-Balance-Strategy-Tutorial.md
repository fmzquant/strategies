
> Name

Python-Single-Platform-Balance-Strategy-Tutorial

> Author

发明者量化-小小梦

> Strategy Description

Adapted from the JavaScript version of the Single-Platform Balance Strategy.

This strategy requires an initial position. For example, suppose the account holds 5,000 in cash and 1 coin. If the coin’s value rises above the account cash balance of 5,000 and the difference exceeds the threshold — for example, the coin is now worth 6,000 — the strategy sells `(6000-5000)/6000/2` coins. This means the coin has appreciated, so part of it is converted back into cash. If the coin depreciates to, for example, 4,000, the strategy buys `(5000-4000)/4000/2` coins. It buys some on the way down and sells some again after a rebound, like a balance scale hedging both sides, which is why it is called a balance strategy.

Article: https://www.fmz.com/bbs-topic/4986

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|threshold|0.05|Threshold|
|Interval|2000|Retry Interval on Error (ms)|
|LoopInterval|60|Polling Interval (Seconds)|
|MinStock|0.001|Minimum Trade Size|
|XPrecision|4|Amount Precision|
|ZPrecision|8|Price Precision|


> Source (python)

``` python
'''backtest
start: 2019-12-01 00:00:00
end: 2020-02-01 11:00:00
period: 1m
exchanges: [{"eid":"OKEX","currency":"BTC_USDT","stocks":1}]
'''

InitAccount = None

def CancelPendingOrders():
    ret = False
    while True:
        orders = _C(exchange.GetOrders)
        if len(orders) == 0 :
            return ret

        for j in range(len(orders)):
            exchange.CancelOrder(orders[j].Id)
            ret = True
            if j < len(orders) - 1:
                Sleep(Interval)
    return ret 

def onTick():
    acc = _C(exchange.GetAccount)
    ticker = _C(exchange.GetTicker)
    spread = ticker.Sell - ticker.Buy
    diffAsset = (acc.Balance - (acc.Stocks * ticker.Sell)) / 2
    ratio = diffAsset / acc.Balance
    LogStatus("ratio:", ratio, _D())
    if abs(ratio) < threshold:
        return False
    if ratio > 0 :
        buyPrice = _N(ticker.Sell + spread, ZPrecision)
        buyAmount = _N(diffAsset / buyPrice, XPrecision)
        if buyAmount < MinStock:
            return False
        exchange.Buy(buyPrice, buyAmount, diffAsset, ratio)
    else :
        sellPrice = _N(ticker.Buy - spread, ZPrecision)
        sellAmount = _N(-diffAsset / sellPrice, XPrecision)
        if sellAmount < MinStock:
            return False 
        exchange.Sell(sellPrice, sellAmount, diffAsset, ratio)
    return True

def main():
    global InitAccount, LoopInterval
    InitAccount = _C(exchange.GetAccount)
    LoopInterval = max(LoopInterval, 1)
    while True:
        if onTick():
            Sleep(1000)
            CancelPendingOrders()
            Log(_C(exchange.GetAccount))
        Sleep(LoopInterval * 1000)
```

> Detail

https://www.fmz.com/strategy/183374

> Last Modified

2020-02-05 10:19:20
