
> 策略名称

python版商品期货多品种均线策略  (扩展图表)(教学)

> 策略作者

小小梦

> 策略描述

相关文章：https://www.fmz.com/bbs-topic/5629

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Instruments|rb888,MA888,jd888|合约列表|
|LoopInterval|3|轮询间隔|
|RMode|0|进度恢复模式: 自动|手动|
|VMStatus|{}|手动恢复字符串|
|WXPush|true|推送交易信息|
|MaxTaskRetry|5|开仓最多重试次数|
|KeepRatio|10|预留保证金比例|
|FastPeriodArr|10,12,14|快线周期参数|
|SlowPeriodArr|20,14,30|慢线周期参数|




|按钮|默认值|描述|
|----|----|----|
|暂停/继续|__button__|暂停/继续|


> 源码 (python)

``` python
'''backtest
start: 2019-07-01 09:00:00
end: 2020-03-25 15:00:00
period: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''

import json
import re
import time

_bot = ext.NewPositionManager()

class Manager:
    '策略逻辑控制类'

    ACT_IDLE = 0
    ACT_LONG = 1
    ACT_SHORT = 2 
    ACT_COVER = 3

    ERR_SUCCESS = 0
    ERR_SET_SYMBOL = 1
    ERR_GET_ORDERS = 2
    ERR_GET_POS = 3
    ERR_TRADE = 4
    ERR_GET_DEPTH = 5
    ERR_NOT_TRADING = 6
    errMsg = ["成功", "切换合约失败", "获取订单失败", "获取持仓失败", "交易下单失败", "获取深度失败", "不在交易时间"]
    
    def __init__(self, needRestore, symbol, keepBalance, fastPeriod, slowPeriod, index):
        # 获取symbolDetail 
        symbolDetail = _C(exchange.SetContractType, symbol)
        if symbolDetail["VolumeMultiple"] == 0 or symbolDetail["MaxLimitOrderVolume"] == 0 or symbolDetail["MinLimitOrderVolume"] == 0 or symbolDetail["LongMarginRatio"] == 0 or symbolDetail["ShortMarginRatio"] == 0:
            Log(symbolDetail)
            raise Exception("合约信息异常")
        else :
            Log("合约", symbolDetail["InstrumentName"], "一手", symbolDetail["VolumeMultiple"], "份，最大下单量", symbolDetail["MaxLimitOrderVolume"], "保证金率：", _N(symbolDetail["LongMarginRatio"]), _N(symbolDetail["ShortMarginRatio"]), "交割日期", symbolDetail["StartDelivDate"])

        # 初始化    
        self.symbol = symbol
        self.keepBalance = keepBalance
        self.fastPeriod = fastPeriod
        self.slowPeriod = slowPeriod

        self.marketPosition = None
        self.holdPrice = None
        self.holdAmount = None 
        self.holdProfit = None
        self.index = index

        self.task = {
            "action" : Manager.ACT_IDLE,
            "amount" : 0,
            "dealAmount" : 0,
            "avgPrice" : 0,
            "preCost" : 0,
            "preAmount" : 0,
            "init" : False,
            "retry" : 0,
            "desc" : "空闲",
            "onFinish" : None
        }
        
        self.lastPrice = 0 
        self.symbolDetail = symbolDetail

        # 持仓状态信息
        self.status = {
            "symbol" : symbol,
            "recordsLen" : 0,
            "vm" : [], 
            "open" : 0,
            "cover" : 0,
            "st" : 0,
            "marketPosition" : 0,
            "lastPrice" : 0,
            "holdPrice" : 0, 
            "holdAmount" : 0,
            "holdProfit" : 0, 
            "symbolDetail" : symbolDetail,
            "lastErr" : "",
            "lastErrTime" : "",
            "isTrading" : False   
        }
        
        # 对象构造时其他处理工作
        vm = None
        if RMode == 0:
            vm = _G(self.symbol)
        else:
            vm = json.loads(VMStatus)[self.symbol]
        if vm:
            Log("准备恢复进度，当前合约状态为", vm)
            self.reset(vm[0])
        else:
            if needRestore:
                Log("没有找到" + self.symbol + "的进度恢复信息")
            self.reset()

        # 图表
        self.objChart = {
            "__isStock" : True,
            "extension" : {
                "layout" : "single", 
                "height" : 300, 
            },
            "title" : {"text": self.symbol},
            "xAxis" : {"type" : "datetime"},
            "series" : [
                {
                    "type" : "candlestick", 
                    "name" : "k",
                    "id" : "k",
                    "data" : []
                }, {
                    "type" : "line",
                    "name" : "fast",
                    "data" : [], 
                }, {
                    "type" : "line",
                    "name" : "slow",
                    "data" : []  
                }
            ]
        }
        self.preBarTime = 0

    def PlotRecords(self, chart):
        r = self.records
        if r is None:
            return
        if len(r) < self.fastPeriod + 2 or len(r) < self.slowPeriod + 2:
            return 
        for i in range(len(r)):
            if r[i]["Time"] == self.preBarTime:
                chart.add(self.index, [r[i]["Time"], r[i]["Open"], r[i]["High"], r[i]["Low"], r[i]["Close"]], -1)
                if i == len(r) - 2:
                    chart.add(self.index + 1, [r[i]["Time"], self.preFast], -1)    # 快线
                    chart.add(self.index + 2, [r[i]["Time"], self.preSlow], -1)    # 慢线
                elif i == len(r) - 1:
                    chart.add(self.index + 1, [r[i]["Time"], self.nowFast], -1)    # 快线
                    chart.add(self.index + 2, [r[i]["Time"], self.nowSlow], -1)    # 慢线
            elif r[i]["Time"] > self.preBarTime:
                self.preBarTime = r[i]["Time"]
                chart.add(self.index, [r[i]["Time"], r[i]["Open"], r[i]["High"], r[i]["Low"], r[i]["Close"]])
                if i == len(r) - 1:
                    chart.add(self.index + 1, [r[i]["Time"], self.nowFast])
                    chart.add(self.index + 2, [r[i]["Time"], self.nowSlow])

    def setLastError(self, err=None):
        if err is None:
            self.status["lastErr"] = ""
            self.status["lastErrTime"] = ""
            return 
        t = _D()
        self.status["lastErr"] = err
        self.status["lastErrTime"] = t
    
    def reset(self, marketPosition=None):
        if marketPosition is not None:
            self.marketPosition = marketPosition
            pos = _bot.GetPosition(self.symbol, PD_LONG if marketPosition > 0 else PD_SHORT)
            if pos is not None:
                self.holdPrice = pos["Price"]
                self.holdAmount = pos["Amount"]
                Log(self.symbol, "仓位", pos)
            else :
                raise Exception("恢复" + self.symbol + "的持仓状态出错，没有找到仓位信息")
            Log("恢复", self.symbol, "持仓均价：", self.holdPrice, "持仓数量：", self.holdAmount)
            self.status["vm"] = [self.marketPosition]
        else :
            self.marketPosition = 0
            self.holdPrice = 0 
            self.holdAmount = 0 
            self.holdProfit = 0
        self.holdProfit = 0
        self.lastErr = ""
        self.lastErrTime = ""

    def Status(self):
        self.status["marketPosition"] = self.marketPosition
        self.status["holdPrice"] = self.holdPrice
        self.status["holdAmount"] = self.holdAmount
        self.status["lastPrice"] = self.lastPrice
        if self.lastPrice > 0 and self.holdAmount > 0 and self.marketPosition != 0:
            self.status["holdProfit"] = _N((self.lastPrice - self.holdPrice) * self.holdAmount * self.symbolDetail["VolumeMultiple"], 4) * (1 if self.marketPosition > 0 else -1)
        else :
            self.status["holdProfit"] = 0 
        return self.status

    def setTask(self, action, amount = None, onFinish = None):
        self.task["init"] = False 
        self.task["retry"] = 0
        self.task["action"] = action
        self.task["preAmount"] = 0
        self.task["preCost"] = 0
        self.task["amount"] = 0 if amount is None else amount
        self.task["onFinish"] = onFinish
        if action == Manager.ACT_IDLE:
            self.task["desc"] = "空闲"
            self.task["onFinish"] = None
        else:
            if action != Manager.ACT_COVER:
                self.task["desc"] = ("加多仓" if action == Manager.ACT_LONG else "加空仓") + "(" + str(amount) + ")"
            else :
                self.task["desc"] = "平仓"
            Log("接收到任务", self.symbol, self.task["desc"])
            self.Poll(True)

    def processTask(self):
        insDetail = exchange.SetContractType(self.symbol)
        if not insDetail:
            return Manager.ERR_SET_SYMBOL
        SlideTick = 1
        ret = False
        if self.task["action"] == Manager.ACT_COVER:
            hasPosition = False
            while True:
                if not ext.IsTrading(self.symbol):
                    return Manager.ERR_NOT_TRADING
                hasPosition = False
                positions = exchange.GetPosition()
                if positions is None:
                    return Manager.ERR_GET_POS
                depth = exchange.GetDepth()
                if depth is None:
                    return Manager.ERR_GET_DEPTH
                orderId = None
                for i in range(len(positions)):
                    if positions[i]["ContractType"] != self.symbol:
                        continue
                    amount = min(insDetail["MaxLimitOrderVolume"], positions[i]["Amount"])
                    if positions[i]["Type"] == PD_LONG or positions[i]["Type"] == PD_LONG_YD:
                        exchange.SetDirection("closebuy_today" if positions[i].Type == PD_LONG else "closebuy")
                        orderId = exchange.Sell(_N(depth["Bids"][0]["Price"] - (insDetail["PriceTick"] * SlideTick), 2), min(amount, depth["Bids"][0]["Amount"]), self.symbol, "平今" if positions[i]["Type"] == PD_LONG else "平昨", "Bid", depth["Bids"][0])
                        hasPosition = True
                    elif positions[i]["Type"] == PD_SHORT or positions[i]["Type"] == PD_SHORT_YD:
                        exchange.SetDirection("closesell_today" if positions[i]["Type"] == PD_SHORT else "closesell")
                        orderId = exchange.Buy(_N(depth["Asks"][0]["Price"] + (insDetail["PriceTick"] * SlideTick), 2), min(amount, depth["Asks"][0]["Amount"]), self.symbol, "平今" if positions[i]["Type"] == PD_SHORT else "平昨", "Ask", depth["Asks"][0])
                        hasPosition = True
                    if hasPosition:
                        if not orderId:
                            return Manager.ERR_TRADE
                        Sleep(1000)
                        while True:
                            orders = exchange.GetOrders()
                            if orders is None:
                                return Manager.ERR_GET_ORDERS
                            if len(orders) == 0:
                                break
                            for i in range(len(orders)):
                                exchange.CancelOrder(orders[i]["Id"])
                                Sleep(500)
                if not hasPosition:
                    break
            ret = True
        elif self.task["action"] == Manager.ACT_LONG or self.task["action"] == Manager.ACT_SHORT:
            while True:
                if not ext.IsTrading(self.symbol):
                    return Manager.ERR_NOT_TRADING
                Sleep(1000)
                while True:
                    orders = exchange.GetOrders()
                    if orders is None:
                        return Manager.ERR_GET_ORDERS
                    if len(orders) == 0:
                        break
                    for i in range(len(orders)):
                        exchange.CancelOrder(orders[i]["Id"])
                        Sleep(500)
                positions = exchange.GetPosition()
                if positions is None:
                    return Manager.ERR_GET_POS
                pos = None
                for i in range(len(positions)):
                    if positions[i]["ContractType"] == self.symbol and (((positions[i]["Type"] == PD_LONG or positions[i]["Type"] == PD_LONG_YD) and self.task["action"] == Manager.ACT_LONG) or ((positions[i]["Type"] == PD_SHORT) or positions[i]["Type"] == PD_SHORT_YD) and self.task["action"] == Manager.ACT_SHORT):
                        if not pos:
                            pos = positions[i]
                            pos["Cost"] = positions[i]["Price"] * positions[i]["Amount"]
                        else :
                            pos["Amount"] += positions[i]["Amount"]
                            pos["Profit"] += positions[i]["Profit"]
                            pos["Cost"] += positions[i]["Price"] * positions[i]["Amount"]
                # records pre position 
                if not self.task["init"]:
                    self.task["init"] = True
                    if pos:
                        self.task["preAmount"] = pos["Amount"]
                        self.task["preCost"] = pos["Cost"]
                    else:
                        self.task["preAmount"] = 0
                        self.task["preCost"] = 0
                remain = self.task["amount"]
                if pos:
                    self.task["dealAmount"] = pos["Amount"] - self.task["preAmount"]
                    remain = int(self.task["amount"] - self.task["dealAmount"])
                    if remain <= 0 or self.task["retry"] >= MaxTaskRetry:
                        ret = {
                            "price" : (pos["Cost"] - self.task["preCost"]) / (pos["Amount"] - self.task["preAmount"]),
                            "amount" : (pos["Amount"] - self.task["preAmount"]),
                            "position" : pos
                        }
                        break
                elif self.task["retry"] >= MaxTaskRetry:
                    ret = None
                    break

                depth = exchange.GetDepth()
                if depth is None:
                    return Manager.ERR_GET_DEPTH
                orderId = None
                if self.task["action"] == Manager.ACT_LONG:
                    exchange.SetDirection("buy")
                    orderId = exchange.Buy(_N(depth["Asks"][0]["Price"] + (insDetail["PriceTick"] * SlideTick), 2), min(remain, depth["Asks"][0]["Amount"]), self.symbol, "Ask", depth["Asks"][0])
                else:
                    exchange.SetDirection("sell")
                    orderId = exchange.Sell(_N(depth["Bids"][0]["Price"] - (insDetail["PriceTick"] * SlideTick), 2), min(remain, depth["Bids"][0]["Amount"]), self.symbol, "Bid", depth["Bids"][0])
                if orderId is None:
                    self.task["retry"] += 1
                    return Manager.ERR_TRADE
        if self.task["onFinish"]:
            self.task["onFinish"](ret)
        self.setTask(Manager.ACT_IDLE)
        return Manager.ERR_SUCCESS

    def Poll(self, subroutine = False):
        # 判断交易时段
        self.status["isTrading"] = ext.IsTrading(self.symbol)
        if not self.status["isTrading"]:
            return 

        # 执行下单交易任务
        if self.task["action"] != Manager.ACT_IDLE:
            retCode = self.processTask()
            if self.task["action"] != Manager.ACT_IDLE:
                self.setLastError("任务没有处理成功：" + Manager.errMsg[retCode] + ", " + self.task["desc"] + ", 重试：" + str(self.task["retry"]))
            else :
                self.setLastError()
            return 

        if subroutine:
            return

        suffix = "@" if WXPush else ""
        # switch symbol
        _C(exchange.SetContractType, self.symbol)

        # 获取K线数据
        records = exchange.GetRecords()
        if records is None:
            self.setLastError("获取K线失败")
            return 
        self.status["recordsLen"] = len(records)
        if len(records) < self.fastPeriod + 2 or len(records) < self.slowPeriod + 2:
            self.setLastError("K线长度小于 均线周期：" + str(self.fastPeriod) + "或" + str(self.slowPeriod))
            return 

        opCode = 0   # 0 : IDLE , 1 : LONG , 2 : SHORT , 3 : CoverALL 
        lastPrice = records[-1]["Close"]
        self.lastPrice = lastPrice

        fastMA = TA.EMA(records, self.fastPeriod)
        slowMA = TA.EMA(records, self.slowPeriod)

        # 记录数据
        self.records = records
        self.nowFast = fastMA[-1]
        self.nowSlow = slowMA[-1]
        self.preFast = fastMA[-2]
        self.preSlow = slowMA[-2]

        # 策略逻辑
        if self.marketPosition == 0:
            if fastMA[-3] < slowMA[-3] and fastMA[-2] > slowMA[-2]:
                opCode = 1 
            elif fastMA[-3] > slowMA[-3] and fastMA[-2] < slowMA[-2]:
                opCode = 2
        else:
            if self.marketPosition < 0 and fastMA[-3] < slowMA[-3] and fastMA[-2] > slowMA[-2]:
                opCode = 3
            elif self.marketPosition > 0 and fastMA[-3] > slowMA[-3] and fastMA[-2] < slowMA[-2]:
                opCode = 3

        # 如果不触发任何条件，操作码为0，返回
        if opCode == 0:
            return 

        # 执行平仓
        if opCode == 3:
            def coverCallBack(ret):
                self.reset()
                _G(self.symbol, None)
            self.setTask(Manager.ACT_COVER, 0, coverCallBack)
            return 
        
        account = _bot.GetAccount()
        canOpen = int((account["Balance"] - self.keepBalance) / (self.symbolDetail["LongMarginRatio"] if opCode == 1 else self.symbolDetail["ShortMarginRatio"]) / (lastPrice * 1.2) / self.symbolDetail["VolumeMultiple"])
        unit = min(1, canOpen)

        # 设置交易任务
        def setTaskCallBack(ret):
            if not ret:
                self.setLastError("下单失败")
                return 
            self.holdPrice = ret["position"]["Price"]
            self.holdAmount = ret["position"]["Amount"]
            self.marketPosition += 1 if opCode == 1 else -1
            self.status["vm"] = [self.marketPosition]
            _G(self.symbol, self.status["vm"])

        self.setTask(Manager.ACT_LONG if opCode == 1 else Manager.ACT_SHORT, unit, setTaskCallBack)

def onexit():
    Log("已退出策略...")

def main():
    if exchange.GetName().find("CTP") == -1:
        raise Exception("只支持商品期货CTP")
    SetErrorFilter("login|ready|流控|连接失败|初始|Timeout")
    mode = exchange.IO("mode", 0)
    if mode is None:
        raise Exception("切换模式失败，请更新到最新托管者！")
    while not exchange.IO("status"):
        Sleep(3000)
        LogStatus("正在等待与交易服务器连接，" + _D())
    positions = _C(exchange.GetPosition)
    if len(positions) > 0:
        Log("检测到当前持有仓位，系统将开始尝试恢复进度...")
        Log("持仓信息：", positions)

    initAccount = _bot.GetAccount()
    initMargin = json.loads(exchange.GetRawJSON())["CurrMargin"]
    keepBalance = _N((initAccount["Balance"] + initMargin) * (KeepRatio / 100), 3)
    Log("资产信息", initAccount, "保留资金：", keepBalance)

    tts = []
    arrChart = []
    index = 0
    symbolFilter = {}
    arr = Instruments.split(",")
    arrFastPeriod = FastPeriodArr.split(",")
    arrSlowPeriod = SlowPeriodArr.split(",")
    if len(arr) != len(arrFastPeriod) or len(arr) != len(arrSlowPeriod):
        raise Exception("均线周期参数与添加合约数量不匹配，请检查参数！")
    for i in range(len(arr)):
        symbol = re.sub(r'/\s+$/g', "", re.sub(r'/^\s+/g', "", arr[i]))
        if symbol in symbolFilter.keys():
            raise Exception(symbol + "已经存在，请检查参数！")
        symbolFilter[symbol] = True
        hasPosition = False 
        for j in range(len(positions)):
            if positions[j]["ContractType"] == symbol:
                hasPosition = True
                break
        fastPeriod = int(arrFastPeriod[i])
        slowPeriod = int(arrSlowPeriod[i])
        obj = Manager(hasPosition, symbol, keepBalance, fastPeriod, slowPeriod, index)
        index += 3
        tts.append(obj)
        arrChart.append(obj.objChart)
    
    # 创建图表对象
    chart = Chart(arrChart)
    chart.reset()

    preTotalHold = -1
    lastStatus = ""
    while True:
        if GetCommand() == "暂停/继续":
            Log("暂停交易中...")
            while GetCommand() != "暂停/继续":
                Sleep(1000)
            Log("继续交易中...")
        while not exchange.IO("status"):
            Sleep(3000)
            LogStatus("正在等待与交易服务器连接，" + _D() + "\n" + lastStatus)

        tblStatus = {
            "type" : "table",
            "title" : "持仓信息",
            "cols" : ["合约名称", "持仓方向", "持仓均价", "持仓数量", "持仓盈亏", "加仓次数", "当前价格"],
            "rows" : [] 
        }

        tblMarket = {
            "type" : "table", 
            "title" : "运行状态", 
            "cols" : ["合约名称", "合约乘数", "保证金率", "交易时间", "柱线长度", "异常描述", "发生时间"], 
            "rows" : []
        }

        totalHold = 0
        vmStatus = {}
        ts = time.time()
        holdSymbol = 0
        for i in range(len(tts)):
            tts[i].Poll()
            d = tts[i].Status()
            if d["holdAmount"] > 0:
                vmStatus[d["symbol"]] = d["vm"]
                holdSymbol += 1
            tblStatus["rows"].append([d["symbolDetail"]["InstrumentName"], "--" if d["holdAmount"] == 0 else ("多" if d["marketPosition"] > 0 else "空"), d["holdPrice"], d["holdAmount"], d["holdProfit"], abs(d["marketPosition"]), d["lastPrice"]])
            tblMarket["rows"].append([d["symbolDetail"]["InstrumentName"], d["symbolDetail"]["VolumeMultiple"], str(_N(d["symbolDetail"]["LongMarginRatio"], 4)) + "/" + str(_N(d["symbolDetail"]["ShortMarginRatio"], 4)), "是#0000ff" if d["isTrading"] else "否#ff0000", d["recordsLen"], d["lastErr"], d["lastErrTime"]])
            totalHold += abs(d["holdAmount"])
            # 写入图表数据
            tts[i].PlotRecords(chart)

        now = time.time()
        elapsed = now - ts
        tblAssets = _bot.GetAccount(True)
        nowAccount = _bot.Account()

        if len(tblAssets["rows"]) > 10:
            tblAssets["rows"][0] = ["InitAccount", "初始资产", initAccount]
        else:
            tblAssets["rows"].insert(0, ["NowAccount", "当前可用", nowAccount])
            tblAssets["rows"].insert(0, ["InitAccount", "初始资产", initAccount])
        
        lastStatus = "`" + json.dumps([tblStatus, tblMarket, tblAssets]) + "`\n轮询耗时：" + str(elapsed) + " 秒，当前时间：" + _D() + ", 持有品种个数：" + str(holdSymbol)
        if totalHold > 0:
            lastStatus += "\n手动恢复字符串：" + json.dumps(vmStatus)
        LogStatus(lastStatus)
        if preTotalHold > 0 and totalHold == 0:
            LogProfit(nowAccount.Balance - initAccount.Balance - initMargin)
        preTotalHold = totalHold
        Sleep(LoopInterval * 1000)
```

> 策略出处

https://www.fmz.com/strategy/208699

> 更新时间

2020-05-20 13:53:44
