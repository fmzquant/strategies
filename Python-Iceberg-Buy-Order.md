
> Name

Python-Iceberg-Buy-Order

> Author

发明者量化-小小梦

> Strategy Description

A teaching strategy. Related article: https://www.fmz.com/bbs-topic/5080

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|TotalBuyNet|10000|Total Purchase Amount (CNY)|
|AvgBuyOnce|100|Average Amount per Purchase (CNY)|
|FloatPoint|10|Single-Order Average Float Points (%)|
|EntrustDepth|0.1|Order Depth (%)|
|MaxBuyPrice|20000|Maximum Buy Price (CNY)|
|Interval|1000|Retry Interval on Failure (ms)|
|MinStock|0.0001|Minimum Trade Size|
|LoopInterval|true|Price Polling Interval (Seconds)|


> Source (python)

``` python
import random

def CancelPendingOrders():
    while True:
        orders = _C(exchange.GetOrders)
        if len(orders) == 0 :
            return 

        for j in range(len(orders)):
            exchange.CancelOrder(orders[j]["Id"])
            if j < len(orders) - 1:
                Sleep(Interval)

LastBuyPrice = 0
InitAccount = None

def dispatch():
    global InitAccount, LastBuyPrice
    account = None
    ticker = _C(exchange.GetTicker)
    LogStatus(_D(), "ticker:", ticker)
    if LastBuyPrice > 0:
        if len(_C(exchange.GetOrders)) > 0:
            if ticker["Last"] > LastBuyPrice  and ((ticker["Last"] - LastBuyPrice) / LastBuyPrice) > (2 * (EntrustDepth / 100)): 
                Log("偏离过多, 最新成交价:", ticker["Last"], "委托价", LastBuyPrice)
                CancelPendingOrders()
            else :
                return True
        else :
            account = _C(exchange.GetAccount)
            Log("买单完成, 累计花费:", _N(InitAccount["Balance"] - account["Balance"]), "平均买入价:", _N((InitAccount["Balance"] - account["Balance"]) / (account["Stocks"] - InitAccount["Stocks"])))
        LastBuyPrice = 0

    BuyPrice = _N(ticker["Buy"] * (1 - EntrustDepth / 100))
    if BuyPrice > MaxBuyPrice:
        return True

    if not account:
        account = _C(exchange.GetAccount)

    if (InitAccount["Balance"] - account["Balance"]) >= TotalBuyNet:
        return False

    RandomAvgBuyOnce = (AvgBuyOnce * ((100.0 - FloatPoint) / 100.0)) + (((FloatPoint * 2) / 100.0) * AvgBuyOnce * random.random())   # 随机数 0~1
    UsedMoney = min(account["Balance"], RandomAvgBuyOnce, TotalBuyNet - (InitAccount["Balance"] - account["Balance"]))

    BuyAmount = _N(UsedMoney / BuyPrice)
    if BuyAmount < MinStock:
        return False 
    LastBuyPrice = BuyPrice
    exchange.Buy(BuyPrice, BuyAmount, "花费：￥", _N(UsedMoney), "上次成交价", ticker["Last"])
    return True

def main():
    global LoopInterval, InitAccount
    CancelPendingOrders()
    InitAccount = _C(exchange.GetAccount)
    Log(InitAccount)
    if InitAccount["Balance"] < TotalBuyNet:
        raise Exception("账户余额不足")
    LoopInterval = max(LoopInterval, 1)
    while dispatch():
        Sleep(LoopInterval * 1000)
    Log("委托全部完成", _C(exchange.GetAccount))

```

> Detail

https://www.fmz.com/strategy/188435

> Last Modified

2020-03-07 16:58:07
