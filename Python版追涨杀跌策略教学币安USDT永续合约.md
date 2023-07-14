
> Name

Python版追涨杀跌策略教学币安USDT永续合约

> Author

韬奋量化

> Strategy Description

原版代码是现货版：
https://www.fmz.com/bbs-topic/4908

现在改为合约版。

———— 韬奋量化（微信：himandy）


好的交易平台可以让你的策略扶摇直上九万里，通过链接注册可获得两个月VIP5的手续费率优惠：
（现货：挂单0%，吃单0.07%。合约：挂单0%，吃单0.04%）
https://www.kucoin.cc/ucenter/signup?rcode=1wxJ2fQ&lang=zh_CN&utmsource=VIP_TF

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|leverage|true|杠杆倍数|
|StopGain|0.05|止盈率|
|StopLoss|0.05|止损率|


> Source (python)

``` python
'''backtest
start: 2021-05-01 00:00:00
end: 2021-05-29 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
'''

# 原版代码是现货版：
# https://www.fmz.com/bbs-topic/4908

# 现在改为合约版。

# ———— 韬奋量化（微信：himandy）


# 好的交易平台可以让你的策略扶摇直上九万里，通过链接注册可获得两个月VIP5的手续费率优惠：
# （现货：挂单0%，吃单0.07%。合约：挂单0%，吃单0.04%）
# https://www.kucoin.cc/ucenter/signup?rcode=1wxJ2fQ&lang=zh_CN&utmsource=VIP_TF

import time

basePrice = -1
ratio = 0.05
acc = _C(exchange.GetAccount)
pos = _C(exchange.GetPosition)
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
    global basePrice, acc, lastCancelAll, leverage, StopGain, StopLoss
    #Log(StopLoss * -1)
    exchange.SetContractType("swap")
    exchange.SetMarginLevel(leverage)
    exchange.SetPrecision(2, 3)
    pos = _C(exchange.GetPosition)
    while True:
        ticker = _C(exchange.GetTicker)
        if basePrice == -1 :
            basePrice = ticker.Last
        if ticker.Last - basePrice > 0 and (ticker.Last - basePrice) / basePrice > ratio :
            acc = _C(exchange.GetAccount)            
            if acc.Balance * ratio * leverage / ticker.Last > minStocks and len(pos) == 0:
                exchange.SetDirection("buy")
                exchange.Buy(_N(ticker.Last, 2), _N(acc.Balance * ratio / ticker.Last, 3))
                basePrice = ticker.Last
                ts = time.time()
                if ts - lastCancelAll > 60 * 5 :
                    CancelAll()
                    lastCancelAll = ts
                pos = _C(exchange.GetPosition)
        if ticker.Last - basePrice < 0 and (basePrice - ticker.Last) / basePrice > ratio : 
            acc = _C(exchange.GetAccount)
            pos = _C(exchange.GetPosition)
            if acc.Balance * ratio * leverage / ticker.Last > minStocks and len(pos) == 0:
                exchange.SetDirection("sell")
                exchange.Sell(_N(ticker.Last, 2), _N(acc.Balance * ratio / ticker.Last, 3))
                basePrice = ticker.Last
                ts = time.time()
                if ts - lastCancelAll > 60 * 5 :
                    CancelAll()
                    lastCancelAll = ts
                pos = _C(exchange.GetPosition)
        if len(pos) == 1 :
        	#Log(pos)
            if pos[0]["Profit"] / pos[0]["Margin"] > StopGain :
                if pos[0]["Type"] == 0 :
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, pos[0]["Amount"])
                    pos = _C(exchange.GetPosition)
                elif pos[0]["Type"] == 1 :
                    exchange.SetDirection("closesell")
                    exchange.Buy(-1, pos[0]["Amount"])
                    pos = _C(exchange.GetPosition)
            elif pos[0]["Profit"] / pos[0]["Margin"] < StopLoss * -1 :
                if pos[0]["Type"] == 0 :
                    exchange.SetDirection("closebuy")
                    exchange.Sell(-1, pos[0]["Amount"])
                    pos = _C(exchange.GetPosition)
                elif pos[0]["Type"] == 1 :
                    exchange.SetDirection("closesell")
                    exchange.Buy(-1, pos[0]["Amount"])
                    pos = _C(exchange.GetPosition)

        LogStatus(_D(), "\n", "行情信息:", ticker, "\n", "账户信息:", acc)
        if exchange.GetName() == "Futures_Binance" and IsVirtual() == false :
            LogProfit(_N(float(acc["Info"]["totalWalletBalance"], 4)))
        Sleep(500)
```

> Detail

https://www.fmz.com/strategy/286091

> Last Modified

2021-05-30 16:35:25
