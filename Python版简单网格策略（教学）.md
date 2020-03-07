
> 策略名称

Python版简单网格策略（教学）

> 策略作者

小小梦

> 策略描述

https://www.fmz.com/bbs-topic/4877



> 源码 (python)

``` python
'''backtest
start: 2019-07-01 00:00:00
end: 2020-01-03 00:00:00
period: 1m
exchanges: [{"eid":"OKEX","currency":"BTC_USDT"}]
'''

import json

# 参数
beginPrice = 5000
endPrice = 8000
distance = 20
pointProfit = 50
amount = 0.01
minBalance = 300

# 全局变量
arrNet = []
arrMsg = []
acc = None

def findOrder (orderId, NumOfTimes, ordersList = []) :
    for j in range(NumOfTimes) :
        orders = None
        if len(ordersList) == 0:
            orders = _C(exchange.GetOrders)
        else :
            orders = ordersList
        for i in range(len(orders)):
            if orderId == orders[i]["Id"]:
                return True
        Sleep(1000)
    return False

def cancelOrder (price, orderType) :
    orders = _C(exchange.GetOrders)
    for i in range(len(orders)) : 
        if price == orders[i]["Price"] and orderType == orders[i]["Type"]: 
            exchange.CancelOrder(orders[i]["Id"])
            Sleep(500)

def checkOpenOrders (orders, ticker) :
    global arrNet, arrMsg
    for i in range(len(arrNet)) : 
        if not findOrder(arrNet[i]["id"], 1, orders) and arrNet[i]["state"] == "pending" :
            orderId = exchange.Sell(arrNet[i]["coverPrice"], arrNet[i]["amount"], arrNet[i], ticker)
            if orderId :
                arrNet[i]["state"] = "cover"
                arrNet[i]["id"] = orderId                
            else :
                # 撤销
                cancelOrder(arrNet[i]["coverPrice"], ORDER_TYPE_SELL)
                arrMsg.append("挂单失败!" + json.dumps(arrNet[i]) + ", time:" + _D())

def checkCoverOrders (orders, ticker) :
    global arrNet, arrMsg
    for i in range(len(arrNet)) : 
        if not findOrder(arrNet[i]["id"], 1, orders) and arrNet[i]["state"] == "cover" :
            arrNet[i]["id"] = -1
            arrNet[i]["state"] = "idle"
            Log(arrNet[i], "节点平仓，重置为空闲状态。", "#FF0000")


def onTick () :
    global arrNet, arrMsg, acc

    ticker = _C(exchange.GetTicker)
    for i in range(len(arrNet)):
        if i != len(arrNet) - 1 and arrNet[i]["state"] == "idle" and ticker.Sell > arrNet[i]["price"] and ticker.Sell < arrNet[i + 1]["price"]:
            acc = _C(exchange.GetAccount)
            if acc.Balance < minBalance :
                arrMsg.append("资金不足" + json.dumps(acc) + "！" + ", time:" + _D())
                break

            orderId = exchange.Buy(arrNet[i]["price"], arrNet[i]["amount"], arrNet[i], ticker)
            if orderId : 
                arrNet[i]["state"] = "pending"
                arrNet[i]["id"] = orderId
            else :
                # 撤单
                cancelOrder(arrNet[i]["price"], ORDER_TYPE_BUY)
                arrMsg.append("挂单失败!" + json.dumps(arrNet[i]) + ", time:" + _D())
    Sleep(1000)
    orders = _C(exchange.GetOrders)
    checkOpenOrders(orders, ticker)
    Sleep(1000)
    orders = _C(exchange.GetOrders)
    checkCoverOrders(orders, ticker)

    tbl = {
        "type" : "table", 
        "title" : "网格状态",
        "cols" : ["节点索引", "详细信息"], 
        "rows" : [], 
    }    

    for i in range(len(arrNet)) : 
        tbl["rows"].append([i, json.dumps(arrNet[i])])

    errTbl = {
        "type" : "table", 
        "title" : "记录",
        "cols" : ["节点索引", "详细信息"], 
        "rows" : [], 
    }

    orderTbl = {
     	"type" : "table", 
        "title" : "orders",
        "cols" : ["节点索引", "详细信息"], 
        "rows" : [],    
    }

    while len(arrMsg) > 20 : 
        arrMsg.pop(0)

    for i in range(len(arrMsg)) : 
        errTbl["rows"].append([i, json.dumps(arrMsg[i])])    

    for i in range(len(orders)) : 
        orderTbl["rows"].append([i, json.dumps(orders[i])])

    LogStatus(_D(), "\n", acc, "\n", "arrMsg length:", len(arrMsg), "\n", "`" + json.dumps([tbl, errTbl, orderTbl]) + "`")


def main ():
    global arrNet
    for i in range(int((endPrice - beginPrice) / distance)):
        arrNet.append({
            "price" : beginPrice + i * distance,
            "amount" : amount,
            "state" : "idle",    # pending / cover / idle
            "coverPrice" : beginPrice + i * distance + pointProfit,
            "id" : -1,
        })
        
    while True:
        onTick()
        Sleep(500)
```

> 策略出处

https://www.fmz.com/strategy/180385

> 更新时间

2020-01-04 14:42:23
