
> Name

Python版商品期货跨期对冲策略-教学

> Author

雨幕

> Strategy Description

移植自JavaScript版本[商品期货跨期对冲 - 百行代码实现](https://www.fmz.cn/strategy/23896)
简单的跨期对冲, 抛砖引玉, 细节还需要处理, 轮训间隔可以缩小到1秒或者删除Sleep那行策略就可以随时响应价格变化。
教学策略，学习为主。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|SA|rb2010|合约A|
|SB|rb2101|合约B|
|HedgeSpread|170|开仓价差|
|CoverSpread|150|平仓价差|
|OpAmount|true|开仓手数|
|CoverAll|false|启动时平掉所有仓位|




|Button|Default|Description|
|----|----|----|
|AllCover|__button__|平仓|
|SetHedgeSpread|false|设置HedgeSpread|
|SetCoverSpread|false|设置CoverSpread|


> Source (python)

``` python
class Hedge:
    '对冲控制类'
    def __init__(self, q, e, initAccount, symbolA, symbolB, hedgeSpread, coverSpread):
        self.q = q 
        self.initAccount = initAccount
        self.status = 0
        self.symbolA = symbolA
        self.symbolB = symbolB
        self.e = e
        self.isBusy = False 
        self.hedgeSpread = hedgeSpread
        self.coverSpread = coverSpread
        self.opAmount = OpAmount 
        self.records = []
        self.preBarTime = 0
        
    def poll(self):
        if (self.isBusy or not exchange.IO("status")) or not ext.IsTrading(self.symbolA):
            Sleep(1000)
            return 

        insDetailA = exchange.SetContractType(self.symbolA)
        if not insDetailA:
            return 

        tickerA = exchange.GetTicker()
        if not tickerA:
            return 

        insDetailB = exchange.SetContractType(self.symbolB)
        if not insDetailB:
            return 

        tickerB = exchange.GetTicker()
        if not tickerB:
            return 

        # 计算差价K线
        r = exchange.GetRecords()
        if not r:
            return 
        diff = tickerB["Last"] - tickerA["Last"]
        if r[-1]["Time"] != self.preBarTime:
            # 更新
            self.records.append({"Time": r[-1]["Time"], "High": diff, "Low": diff, "Open": diff, "Close": diff, "Volume": 0})
            self.preBarTime = r[-1]["Time"]
        if diff > self.records[-1]["High"]:
            self.records[-1]["High"] = diff
        if diff < self.records[-1]["Low"]:
            self.records[-1]["Low"] = diff
        self.records[-1]["Close"] = diff
        ext.PlotRecords(self.records, "diff:B-A")
        ext.PlotHLine(self.hedgeSpread if diff > 0 else -self.hedgeSpread, "hedgeSpread")
        ext.PlotHLine(self.coverSpread if diff > 0 else -self.coverSpread, "coverSpread")

        LogStatus(_D(), "A卖B买", _N(tickerA["Buy"] - tickerB["Sell"]), "A买B卖", _N(tickerA["Sell"] - tickerB["Buy"]))
        action = 0

        if self.status == 0:
            if (tickerA["Buy"] - tickerB["Sell"]) > self.hedgeSpread:
                Log("开仓 A卖B买", tickerA["Buy"], tickerB["Sell"], "#FF0000")
                action = 1
                # 加入图表标记
                ext.PlotFlag(self.records[-1]["Time"], "A卖B买", "O")
            elif (tickerB["Buy"] - tickerA["Sell"]) > self.hedgeSpread:
                Log("开仓 B卖A买", tickerB["Buy"], tickerA["Sell"], "#FF0000")
                action = 2
                # 加入图表标记
                ext.PlotFlag(self.records[-1]["Time"], "B卖A买", "O")
        elif self.status == 1 and (tickerA["Sell"] - tickerB["Buy"]) <= self.coverSpread:
            Log("平仓 A买B卖", tickerA["Sell"], tickerB["Buy"], "#FF0000")
            action = 2
            # 加入图表标记
            ext.PlotFlag(self.records[-1]["Time"], "A买B卖", "C")
        elif self.status == 2 and (tickerB["Sell"] - tickerA["Buy"]) <= self.coverSpread:
            Log("平仓 B买A卖", tickerB["Sell"] - tickerA["Buy"], "#FF0000")
            action = 1 
            # 加入图表标记
            ext.PlotFlag(self.records[-1]["Time"], "B买A卖", "C")

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

    def SetHedgeSpread(self, hedgeSpread):
        self.hedgeSpread = hedgeSpread
        Log("hedgeSpread修改为：", hedgeSpread)
    def SetCoverSpread(self, coverSpread):
        self.coverSpread = coverSpread
        Log("coverSpread修改为：", coverSpread)

def main():
    SetErrorFilter("ready|login|timeout")
    Log("正在与交易服务器连接...")
    while not exchange.IO("status"):
        Sleep(1000)

    Log("与交易服务器连接成功")
    initAccount = _C(exchange.GetAccount)
    Log(initAccount)
    n = 0 

    def callBack(task, ret):
        Log(task["desc"], "成功" if ret else "失败")

    q = ext.NewTaskQueue(callBack)
    p = ext.NewPositionManager()
    if CoverAll:
        Log("开始平掉所有残余仓位...")
        p.CoverAll()
        Log("操作完成")

    t = Hedge(q, exchange, initAccount, SA, SB, HedgeSpread, CoverSpread)
    while True:
        q.poll()
        t.poll()
        cmd = GetCommand()
        if cmd:
            arr = cmd.split(":")
            if arr[0] == "AllCover":
                p.CoverAll()
            elif arr[0] == "SetHedgeSpread":
                t.SetHedgeSpread(float(arr[1]))
            elif arr[0] == "SetCoverSpread":
                t.SetCoverSpread(float(arr[1]))

```

> Detail

https://www.fmz.cn/strategy/211504

> Last Modified

2021-10-26 10:47:16
