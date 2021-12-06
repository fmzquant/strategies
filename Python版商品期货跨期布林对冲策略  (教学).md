
> 策略名称

Python版商品期货跨期布林对冲策略  (教学)

> 策略作者

雨幕

> 策略描述

参考文章：https://www.fmz.cn/bbs-topic/5726

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
start: 2020-02-17 09:00:00
end: 2020-06-12 15:00:00
period: 1d
basePeriod: 1m
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["ATRRatio",3]]
'''

class Hedge:
    '对冲控制类'
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
        # self.records = []
        # self.preBarTime = 0
        
    def poll(self):
        if (self.isBusy or not exchange.IO("status")) or not ext.IsTrading(self.symbolA):
            Sleep(1000)
            return 

        insDetailA = exchange.SetContractType(self.symbolA)
        if not insDetailA:
            return 

        recordsA = exchange.GetRecords()
        if not recordsA:
            return 

        insDetailB = exchange.SetContractType(self.symbolB)
        if not insDetailB:
            return 

        recordsB = exchange.GetRecords()
        if not recordsB:
            return 

        # 计算差价K线
        if recordsA[-1]["Time"] != recordsB[-1]["Time"]:
            return 

        minL = min(len(recordsA), len(recordsB))
        rA = recordsA.copy()
        rB = recordsB.copy()

        rA.reverse()
        rB.reverse()
        count = 0
        
        arrDiff = []
        for i in range(minL):
            arrDiff.append(rB[i]["Close"] - rA[i]["Close"])
        arrDiff.reverse()
        if len(arrDiff) < self.maPeriod:
            return 

        # 计算布林指标
        boll = TA.BOLL(arrDiff, self.maPeriod, self.atrRatio)

        ext.PlotLine("上轨", boll[0][-2], recordsA[-2]["Time"])
        ext.PlotLine("中轨", boll[1][-2], recordsA[-2]["Time"])
        ext.PlotLine("下轨", boll[2][-2], recordsA[-2]["Time"])
        ext.PlotLine("收盘价差价", arrDiff[-2], recordsA[-2]["Time"])

        LogStatus(_D(), "上轨：", boll[0][-1], "\n", "中轨：", boll[1][-1], "\n", "下轨：", boll[2][-1], "\n", "当前收盘差价：", arrDiff[-1])
        
        action = 0
        # 信号触发
        if self.status == 0:
            if arrDiff[-1] > boll[0][-1]:
                Log("开仓 A买B卖", "，A最新价格：", recordsA[-1]["Close"], "，B最新价格：", recordsB[-1]["Close"], "#FF0000")
                action = 2
                # 加入图表标记
                ext.PlotFlag(recordsA[-1]["Time"], "A买B卖", "正")
            elif arrDiff[-1] < boll[2][-1]:
                Log("开仓 A卖B买", "，A最新价格：", recordsA[-1]["Close"], "，B最新价格：", recordsB[-1]["Close"], "#FF0000")
                action = 1
                # 加入图表标记
                ext.PlotFlag(recordsA[-1]["Time"], "A卖B买", "反")
        elif self.status == 1 and arrDiff[-1] > boll[1][-1]:
            Log("平仓 A买B卖", "，A最新价格：", recordsA[-1]["Close"], "，B最新价格：", recordsB[-1]["Close"], "#FF0000")
            action = 2
            # 加入图表标记
            ext.PlotFlag(recordsA[-1]["Time"], "A买B卖", "反平")
        elif self.status == 2 and arrDiff[-1] < boll[1][-1]:
            Log("平仓 A卖B买", "，A最新价格：", recordsA[-1]["Close"], "，B最新价格：", recordsB[-1]["Close"], "#FF0000")
            action = 1 
            # 加入图表标记
            ext.PlotFlag(recordsA[-1]["Time"], "A卖B买", "正平")


        # 执行具体指令
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
    SetErrorFilter("ready|login|timeout")
    Log("正在与交易服务器连接...")
    while not exchange.IO("status"):
        Sleep(1000)

    Log("与交易服务器连接成功")
    initAccount = _C(exchange.GetAccount)
    Log(initAccount)

    def callBack(task, ret):
        Log(task["desc"], "成功" if ret else "失败")

    q = ext.NewTaskQueue(callBack)
    p = ext.NewPositionManager()
    if CoverAll:
        Log("开始平掉所有残余仓位...")
        p.CoverAll()
        Log("操作完成")

    t = Hedge(q, exchange, initAccount, SA, SB, MAPeriod, ATRRatio, OpAmount)
    while True:
        q.poll()
        t.poll()
```

> 策略出处

https://www.fmz.com/strategy/213826

> 更新时间

2021-10-26 10:45:05
