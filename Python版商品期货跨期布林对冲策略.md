
> 策略名称

Python版商品期货跨期布林对冲策略

> 策略作者

Hukybo

> 策略描述

参考文章：https://www.fmz.com/bbs-topic/5726

> 策略参数



|参数|默认值|描述|
|----|----|----|
|SA|rb2010|合约A|
|SB|rb2101|合约B|
|OpAmount|true|开仓手数|
|CoverAll|false|启动时平掉所有仓位|
|MAPeriod|20|布林周期参数|
|ATRRatio|2|布林乘数参数|


> 源码 (python)

``` python
'''backtest
start: 2020-05-01 09:00:00
end: 2020-10-01 15:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ATRRatio",3]]
'''
class Hedge:
    def __init__(self, q, e, initAccount, symbolA, symbolB, maPeriod, atrRatio, opAmount):
        self.q = q 
        self.initAccount = initAccount
        self.status = 0
        self.symbolA = symbolA
        self.symbolB = symbolB
        self.e = e
        self.isBusy = False 
        self.maPeriod = maPeriod
        self.atrRatio = atrRatio
        self.opAmount = opAmount
        
    def poll(self):
        if (self.isBusy or not exchange.IO("status")) or not ext.IsTrading(self.symbolA):
            Sleep(1000)
            return 
        exchange.SetContractType(self.symbolA)
        recordsA = exchange.GetRecords()
        exchange.SetContractType(self.symbolB)
        recordsB = exchange.GetRecords()
        if not recordsA or not recordsB:
            return 
        if recordsA[-1]["Time"] != recordsB[-1]["Time"]:
            return 
        minL, rA, rB = min(len(recordsA), len(recordsB)), recordsA.copy(), recordsB.copy()
        rA.reverse()
        rB.reverse()
        arrDiff = []
        for i in range(minL):
            arrDiff.append(rB[i]["Close"] - rA[i]["Close"])
        arrDiff.reverse()
        if len(arrDiff) < self.maPeriod:
            return 
        boll = TA.BOLL(arrDiff, self.maPeriod, self.atrRatio)
        ext.PlotLine("上轨", boll[0][-2], recordsA[-2]["Time"])
        ext.PlotLine("中轨", boll[1][-2], recordsA[-2]["Time"])
        ext.PlotLine("下轨", boll[2][-2], recordsA[-2]["Time"])
        ext.PlotLine("收盘价差价", arrDiff[-2], recordsA[-2]["Time"])
        LogStatus(f"{_D()}\n上轨：{boll[0][-1]}\n中轨：{boll[1][-1]}\n下轨：{boll[2][-1]}\n当前收盘差价：{arrDiff[-1]}")
        action = 0
        if self.status == 0:
            if arrDiff[-1] > boll[0][-1]:
                Log("开仓 A买B卖", "，A最新价格：", recordsA[-1]["Close"], "，B最新价格：", recordsB[-1]["Close"], "#FF0000")
                action = 2
            elif arrDiff[-1] < boll[2][-1]:
                Log("开仓 A卖B买", "，A最新价格：", recordsA[-1]["Close"], "，B最新价格：", recordsB[-1]["Close"], "#FF0000")
                action = 1
        elif self.status == 1 and arrDiff[-1] > boll[1][-1]:
            Log("平仓 A买B卖", "，A最新价格：", recordsA[-1]["Close"], "，B最新价格：", recordsB[-1]["Close"], "#FF0000")
            action = 2
        elif self.status == 2 and arrDiff[-1] < boll[1][-1]:
            Log("平仓 A卖B买", "，A最新价格：", recordsA[-1]["Close"], "，B最新价格：", recordsB[-1]["Close"], "#FF0000")
            action = 1 
        if action == 0:
            return 
        self.isBusy = True
        tasks = []
        if action == 1:
            tasks.append([self.symbolA, "sell" if self.status == 0 else "closebuy"])
            tasks.append([self.symbolB, "buy" if self.status == 0 else "closesell"])
        elif action == 2:
            tasks.append([self.symbolA, "buy" if self.status == 0 else "closesell"])
            tasks.append([self.symbolB, "sell" if self.status == 0 else "closebuy"])

        def callBack(task, ret):
            def callBack(task, ret):
                self.isBusy = False
                if task["action"] == "sell":
                    self.status = 2
                elif task["action"] == "buy":
                    self.status = 1
                else:
                    self.status = 0
                    account = _C(exchange.GetAccount)
                    LogProfit(account["Balance"] - self.initAccount["Balance"], account)
            self.q.pushTask(self.e, tasks[1][0], tasks[1][1], self.opAmount, callBack)
        self.q.pushTask(self.e, tasks[0][0], tasks[0][1], self.opAmount, callBack)

def main():
    while not exchange.IO("status"):
        Sleep(1000)
    initAccount = _C(exchange.GetAccount)
    q = ext.NewTaskQueue()
    p = ext.NewPositionManager()
    if CoverAll:
        p.CoverAll()
    t = Hedge(q, exchange, initAccount, SA, SB, MAPeriod, ATRRatio, OpAmount)
    while True:
        q.poll()
        t.poll()
```

> 策略出处

https://www.fmz.com/strategy/231803

> 更新时间

2021-04-26 17:01:51
