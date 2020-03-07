
> 策略名称

Python版多品种追涨杀跌策略（教学）

> 策略作者

小小梦

> 策略描述

https://www.fmz.com/bbs-topic/4959



> 源码 (python)

``` python
'''backtest
start: 2019-02-20 00:00:00
end: 2020-01-10 00:00:00
period: 1m
exchanges: [{"eid":"OKEX","currency":"BTC_USDT"},{"eid":"OKEX","currency":"ETH_USDT","stocks":30},{"eid":"OKEX","currency":"LTC_USDT","stocks":100}]
'''

import time
import json

params = {
    "arrBasePrice": [-1, -1, -1],     # -1
    "arrRatio": [0.05, 0.05, 0.05],         # 0.05
    "arrAcc": [],           # _C(exchange.GetAccount)
    "arrLastCancelAll": [0, 0, 0], # 0
    "arrMinStocks": [0.01, 0.01, 0.01],     # 0.01
    "arrPricePrecision": [2, 2, 2], # 2
    "arrAmountPrecision": [3, 2, 2], # 2
    "arrTick":[]
}

def CancelAll(e):
    while True : 
        orders = _C(e.GetOrders)
        for i in range(len(orders)) :
            e.CancelOrder(orders[i]["Id"], orders[i])
        if len(orders) == 0 :
            break
        Sleep(1000)

def process(e, index):
    global params
    ticker = _C(e.GetTicker)
    params["arrTick"][index] = ticker
    if params["arrBasePrice"][index] == -1 :
        params["arrBasePrice"][index] = ticker.Last
    if ticker.Last - params["arrBasePrice"][index] > 0 and (ticker.Last - params["arrBasePrice"][index]) / params["arrBasePrice"][index] > params["arrRatio"][index]:
        params["arrAcc"][index] = _C(e.GetAccount)
        if params["arrAcc"][index].Balance * params["arrRatio"][index] / ticker.Last > params["arrMinStocks"][index]:
            e.Buy(ticker.Last, params["arrAcc"][index].Balance * params["arrRatio"][index] / ticker.Last)
            params["arrBasePrice"][index] = ticker.Last
    if ticker.Last - params["arrBasePrice"][index] < 0 and (params["arrBasePrice"][index] - ticker.Last) / params["arrBasePrice"][index] > params["arrRatio"][index]: 
        params["arrAcc"][index] = _C(e.GetAccount)
        if params["arrAcc"][index].Stocks * params["arrRatio"][index] > params["arrMinStocks"][index]:
            e.Sell(ticker.Last, params["arrAcc"][index].Stocks * params["arrRatio"][index])
            params["arrBasePrice"][index] = ticker.Last
    ts = time.time()
    if ts - params["arrLastCancelAll"][index] > 60 * 5 :
        CancelAll(e)
        params["arrLastCancelAll"][index] = ts 

def main():
    global params
    
    for i in range(len(exchanges)) :    
        params["arrAcc"].append(_C(exchanges[i].GetAccount))
        params["arrTick"].append(_C(exchanges[i].GetTicker))
        exchanges[i].SetPrecision(params["arrPricePrecision"][i], params["arrAmountPrecision"][i])

    for key in params :
        if len(params[key]) < len(exchanges):
            raise "params error!"

    while True:
        tblAcc = {
            "type" : "table",
            "title": "account",
            "cols": ["账户信息"], 
            "rows": []
        }        

        tblTick = {
            "type" : "table",
            "title": "ticker",
            "cols": ["行情信息"], 
            "rows": []
        }
        for i in range(len(exchanges)): 
            process(exchanges[i], i)

        for i in range(len(exchanges)):
            tblAcc["rows"].append([json.dumps(params["arrAcc"][i])])
            tblTick["rows"].append([json.dumps(params["arrTick"][i])])

        LogStatus(_D(), "\n`" + json.dumps([tblAcc, tblTick]) + "`")
        Sleep(500)
```

> 策略出处

https://www.fmz.com/strategy/182268

> 更新时间

2020-01-20 17:44:33
