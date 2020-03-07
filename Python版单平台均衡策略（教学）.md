
> 策略名称

Python版单平台均衡策略（教学）

> 策略作者

小小梦

> 策略描述

引用自JavaScript版单平台均衡策略
> 这个需要建仓，比如账户有5000块钱，跟1个币，如果币的价值大于账户的余额5000了并且差价超过阀值，比如币现在值6000块钱，就卖掉(6000-5000)/6000/2个币，说明币升值了，把钱兑换回来，如果币贬值了，比如4000块钱了，就买入(5000-4000)/4000/2个币, 币跌的时候买一些回来，如果再涨了，就再卖掉，好像天平一样，两边不同的对冲，所以我命名为均衡策略

文章地址： https://www.fmz.com/bbs-topic/4986

> 策略参数



|参数|默认值|描述|
|----|----|----|
|threshold|0.05|阀值|
|Interval|2000|出错重试间隔(毫秒)|
|LoopInterval|60|轮询间隔(秒)|
|MinStock|0.001|最小交易量|
|XPrecision|4|量精度|
|ZPrecision|8|价格精度|


> 源码 (python)

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

> 策略出处

https://www.fmz.com/strategy/183374

> 更新时间

2020-02-05 10:19:20
