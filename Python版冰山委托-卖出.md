
> Name

Python版冰山委托-卖出

> Author

小小梦

> Strategy Description

教学策略，相关文章地址：https://www.fmz.com/bbs-topic/5080

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|TotalSellStocks|10|卖出总数量(币)|
|AvgSellOnce|0.3|单次卖出数量均值(币)|
|FloatPoint|10|单次均值浮动点数(百分比)|
|EntrustDepth|0.1|委托深度(百分比)|
|MinSellPrice|3800|最低卖出价格(元)|
|Interval|1000|失败重试(毫秒)|
|MinStock|0.0001|最小交易量|
|LoopInterval|300|价格轮询间隔(毫秒)|


> Source (python)

``` python
import random

def CancelPendingOrders():
    while True:
        orders = _C(exchange.GetOrders)
        if len(orders) == 0:
            return
        
        for j in range(len(orders)):
            exchange.CancelOrder(orders[j]["Id"])
            if j < len(orders) - 1:
                Sleep(Interval)

LastSellPrice = 0
InitAccount = None

def dispatch():
    global LastSellPrice, InitAccount
    account = None
    ticker = _C(exchange.GetTicker)
    LogStatus(_D(), "ticker:", ticker)
    if LastSellPrice > 0:
        if len(_C(exchange.GetOrders)) > 0:
            if ticker["Last"] < LastSellPrice and ((LastSellPrice - ticker["Last"]) / ticker["Last"]) > (2 * (EntrustDepth / 100)):
                Log("偏离过多，最新成交价：", ticker["Last"], "委托价", LastSellPrice)
                CancelPendingOrders()
            else :
                return True
        else :
            account = _C(exchange.GetAccount)
            Log("买单完成，累计卖出：", _N(InitAccount["Stocks"] - account["Stocks"]), "平均卖出价：", _N((account["Balance"] - InitAccount["Balance"]) / (InitAccount["Stocks"] - account["Stocks"])))
            LastSellPrice = 0

    SellPrice = _N(ticker["Sell"] * (1 + EntrustDepth / 100))
    if SellPrice < MinSellPrice:
        return True

    if not account:
        account = _C(exchange.GetAccount)

    if (InitAccount["Stocks"] - account["Stocks"]) >= TotalSellStocks:
        return False 

    RandomAvgSellOnce = (AvgSellOnce * ((100.0 - FloatPoint) / 100.0)) + (((FloatPoint * 2) / 100.0) * AvgSellOnce * random.random())
    SellAmount = min(TotalSellStocks - (InitAccount["Stocks"] - account["Stocks"]), RandomAvgSellOnce)
    if SellAmount < MinStock:
        return False 

    LastSellPrice = SellPrice
    exchange.Sell(SellPrice, SellAmount, "上次成交价", ticker["Last"])
    return True

def main():
    global InitAccount, LoopInterval
    CancelPendingOrders()
    InitAccount = _C(exchange.GetAccount)
    Log(InitAccount)
    if InitAccount["Stocks"] < TotalSellStocks:
        raise Exception("账户币数不足")
    LoopInterval = max(LoopInterval, 1)
    while dispatch():
        Sleep(LoopInterval)
    Log("委托全部完成", _C(exchange.GetAccount))


```

> Detail

https://www.fmz.com/strategy/188754

> Last Modified

2020-03-07 16:57:48
