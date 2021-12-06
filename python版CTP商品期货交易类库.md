
> 策略名称

python版CTP商品期货交易类库

> 策略作者

程文

> 策略描述

### python版CTP商品期货交易类库

> 测试版 如有BUG 欢迎提出。

- 1、2017.4.25 更新：
  增加```if (insDetail.MaxLimitOrderVolume == 0)```条件判断，有些期货公司服务器会返回0值，特此处理。共修改3处
  【1】self.pollTask
  【2】function Cover
  【3】function Open

- 2、2020.10.20 更新：
  增加CTA函数支持，逻辑移植自JavaScript版本商品期货交易类库CTA函数。
  调用例子：
  ```
  def callBack_CTA(st):
      if len(st["records"]) < 20:
          return 
      emaSlow = TA.EMA(st["records"], 20)
      emaFast = TA.EMA(st["records"], 5)
      cross = ext.Cross(emaFast, emaSlow)
      
      if st["position"]["amount"] <= 0 and cross > 2:
          Log("金叉周期", cross, "当前持仓：", st["position"])
          return 2 if st["position"]["amount"] < 0 else 1
      elif st["position"]["amount"] >= 0 and cross < -2:
          Log("死叉周期", cross, "当前持仓：", st["position"])
          return -2 if st["position"]["amount"] > 0 else -1  
  
  ret = ext.CTA("MA000/MA888,rb000/rb888,i000/i888", callBack_CTA)
  ```
- 3、2021.07.14 更新：
  ```
  if pos["Type"] == PD_LONG or pos["Type"] == PD_LONG_YD:
  ```
  笔误```PD_LONG_YD```写成了```PD_SHORT_YD```
  
  

> 策略参数



|参数|默认值|描述|
|----|----|----|
|SlideTick|true|滑价|
|Interval|500|轮询间隔|
|CTAShowPosition|true|在状态栏显示持仓信息|
|SyncInterval|5|账户与持仓同步周期(秒)|


> 源码 (python)

``` python
import json       # json 模块
import types      # 类型  模块
import platform   # 版本信息
import traceback  # 用于异常处理
# str() :  ASCII and UTF-8
import time
# import sys
# reload(sys)
# sys.setdefaultencoding('utf8')

versionMainValue = None  # 记录python 版本信息
isFirstCheck = True      # 记录 是否是第一次检查

def CheckVersion():      # 检查python 版本
    global versionMainValue,isFirstCheck
    if(isFirstCheck == True):
        platformInfo = platform.python_version()
        if platformInfo[0] == '2':
            Log("您使用的托管者 python编译环境的python版本是",platformInfo)
            versionMainValue = 2
            import sys
            reload(sys)
            sys.setdefaultencoding('utf8')
            Log("import sys, reload(sys), sys.setdefaultencoding（'utf8'）")
        elif platformInfo[0] == '3':
            Log("您使用的托管者 python编译环境的python版本是",platformInfo)
            versionMainValue = 3
        else:
            Log("其它版本")
    isFirstCheck = False

def typeOfstr(str):
    if str == "list":
        if versionMainValue == 2:
            return types.ListType
        elif versionMainValue == 3:
            return list
    elif str == "int":
        if versionMainValue == 2:
            return types.IntType
        elif versionMainValue == 3:
            return int
    elif str == "float":
        if versionMainValue == 2:
            return types.FloatType
        elif versionMainValue == 3:
            return float
    else:
        Log("error , typeOfstr used false")


def init():
    if not 'SlideTick' in locals().keys():
        SlideTick = 1
    else:
        SlideTick = int(SlideTick)
    
    CheckVersion()   # 检查python 版本
    
    if IsVirtual():
        exchange.GetRawJSON = VGetRawJSON
        Log("回测系统中运行，已重写GetRawJSON。")
    
    Log("商品期货交易类库加载成功")

def GetPosition(e, contractType, direction, positions = None):
    allCost = 0
    allAmount = 0
    allProfit = 0
    allFrozen = 0
    posMargin = 0
    if (not positions in dir()) or (not positions):
        positions = _C(e.GetPosition)
    for i in range(len(positions)):
        if (positions[i]['ContractType'] == contractType and (((positions[i]['Type'] == PD_LONG or positions[i]['Type'] == PD_LONG_YD) and direction == PD_LONG) or ((positions[i]['Type'] == PD_SHORT or positions[i]['Type'] == PD_SHORT_YD) and direction == PD_SHORT))):
            posMargin = positions[i]['MarginLevel']
            allCost += positions[i]['Price'] * positions[i]['Amount']
            allAmount += positions[i]['Amount']
            allProfit += positions[i]['Profit']
            allFrozen += positions[i]['FrozenAmount']
    if allAmount == 0:
        return 
    return {
        "MarginLevel": posMargin,
        "FrozenAmount": allFrozen,
        "Price": _N(allCost / allAmount),
        "Amount": allAmount,
        "Profit": allProfit,
        "Type": direction,
        "ContractType": contractType
    }

def Open(e, contractType, direction, opAmount):
    initPosition = GetPosition(e, contractType, direction)
    isFirst = True
    initAmount = initPosition['Amount'] if initPosition else 0
    positionNow = initPosition
    while True:
        needOpen = opAmount
        if isFirst:
            isFirst = False
        else:
            positionNow = GetPosition(e, contractType, direction)
            if positionNow:
                needOpen = opAmount - (positionNow['Amount'] - initAmount)
        insDetail = _C(e.SetContractType, contractType)
        # if (insDetail.MaxLimitOrderVolume == 0)
        if insDetail["MaxLimitOrderVolume"] == 0:
            # insDetail.MaxLimitOrderVolume = 50
            insDetail["MaxLimitOrderVolume"] = 50
        if needOpen < insDetail['MinLimitOrderVolume']:
            break
        depth = _C(e.GetDepth)
        amount = min(insDetail['MaxLimitOrderVolume'], needOpen)
        e.SetDirection("buy" if direction == PD_LONG else "sell")
        orderId = None
        if direction == PD_LONG:
            orderId = e.Buy(depth['Asks'][0]['Price'] + (insDetail['PriceTick'] * SlideTick), min(amount, depth['Asks'][0]['Amount']), contractType, 'Ask', depth['Asks'][0])
        else:
            orderId = e.Sell(depth['Bids'][0]['Price'] - (insDetail['PriceTick'] * SlideTick), min(amount, depth['Bids'][0]['Amount']), contractType, 'Bid', depth['Bids'][0])
        # CancelPendingOrders
        while True:
            Sleep(Interval)
            orders = _C(e.GetOrders)
            if len(orders) == 0:
                break
            for j in range(len(orders)):
                e.CancelOrder(orders[j]['Id'])
                if j < (len(orders) - 1):
                    Sleep(Interval)
    ret = {
        "price": 0,
        "amount": 0,
        "position": positionNow
    }
    if positionNow is None:
        return ret
    if initPosition is None:
        ret['price'] = positionNow['Price']
        ret['amount'] = positionNow['Amount']
    else:
        ret['amount'] = positionNow['Amount'] - initPosition['Amount']
        ret['price'] = _N(((positionNow['Price'] * positionNow['Amount']) - (initPosition['Price'] * initPosition['Amount'])) / ret['amount'])
    return ret

def Cover(e, contractType):
    insDetail = _C(e.SetContractType, contractType)
    # if (insDetail.MaxLimitOrderVolume == 0)
    if insDetail["MaxLimitOrderVolume"] == 0:
        # insDetail.MaxLimitOrderVolume = 50
        insDetail["MaxLimitOrderVolume"] = 50
    while True:
        n = 0
        positions = _C(e.GetPosition)
        for i in range(len(positions)):
            if positions[i]['ContractType'] != contractType:
                continue
            amount = min(insDetail['MaxLimitOrderVolume'], positions[i]['Amount'])
            depth = None
            if (positions[i]['Type'] == PD_LONG) or (positions[i]['Type'] == PD_LONG_YD):
                depth = _C(e.GetDepth)
                e.SetDirection("closebuy_today" if positions[i]['Type'] == PD_LONG else "closebuy")
                e.Sell(depth['Bids'][0]['Price'] - (insDetail['PriceTick'] * SlideTick), min(amount, depth['Bids'][0]['Amount']), contractType, "平今" if positions[i]['Type'] == PD_LONG else "平昨", 'Bid', depth['Bids'][0])
                n += 1
            elif (positions[i]['Type'] == PD_SHORT) or (positions[i]['Type'] == PD_SHORT_YD):
                depth = _C(e.GetDepth)
                e.SetDirection("closesell_today" if positions[i]['Type'] == PD_SHORT else "closesell")
                e.Buy(depth['Asks'][0]['Price'] + (insDetail['PriceTick'] * SlideTick), min(amount, depth['Asks'][0]['Amount']), contractType, "平今" if positions[i]['Type'] == PD_SHORT else "平昨", 'Asks', depth['Asks'][0])
                n += 1
        if n == 0:
            break
        while True:
            Sleep(Interval)
            orders = _C(e.GetOrders)
            if len(orders) == 0:
                break
            for j in range(len(orders)):
                e.CancelOrder(orders[j]['Id'])
                if j < (len(orders) - 1):
                    Sleep(Interval)


trans = {
    "AccountID": "投资者帐号",
    "Available": "可用资金",
    "Balance": "期货结算准备金",
    "BrokerID": "经纪公司代码",
    "CashIn": "资金差额",
    "CloseProfit": "平仓盈亏",
    "Commission": "手续费",
    "Credit": "信用额度",
    "CurrMargin": "当前保证金总额",
    "CurrencyID": "币种代码",
    "DeliveryMargin": "投资者交割保证金",
    "Deposit": "入金金额",
    "ExchangeDeliveryMargin": "交易所交割保证金",
    "ExchangeMargin": "交易所保证金",
    "FrozenCash": "冻结的资金",
    "FrozenCommission": "冻结的手续费",
    "FrozenMargin": "冻结的保证金",
    "FundMortgageAvailable": "货币质押余额",
    "FundMortgageIn": "货币质入金额",
    "FundMortgageOut": "货币质出金额",
    "Interest": "利息收入",
    "InterestBase": "利息基数",
    "Mortgage": "质押金额",
    "MortgageableFund": "可质押货币金额",
    "PositionProfit": "持仓盈亏",
    "PreBalance": "上次结算准备金",
    "PreCredit": "上次信用额度",
    "PreDeposit": "上次存款额",
    "PreFundMortgageIn": "上次货币质入金额",
    "PreFundMortgageOut": "上次货币质出金额",
    "PreMargin": "上次占用的保证金",
    "PreMortgage": "上次质押金额",
    "Reserve": "基本准备金",
    "ReserveBalance": "保底期货结算准备金",
    "SettlementID": "结算编号",
    "SpecProductCloseProfit": "特殊产品持仓盈亏",
    "SpecProductCommission": "特殊产品手续费",
    "SpecProductExchangeMargin": "特殊产品交易所保证金",
    "SpecProductFrozenCommission": "特殊产品冻结手续费",
    "SpecProductFrozenMargin": "特殊产品冻结保证金",
    "SpecProductMargin": "特殊产品占用保证金",
    "SpecProductPositionProfit": "特殊产品持仓盈亏",
    "SpecProductPositionProfitByAlg": "根据持仓盈亏算法计算的特殊产品持仓盈亏",
    "TradingDay": "交易日",
    "Withdraw": "出金金额",
    "WithdrawQuota": "可取资金",
}

def AccountToTable(Str, title = '账户的信息'):
    global trans
    if (not title in dir()) or (not title):
        title = '账户信息'
    tbl = {'type': "table", 'title': title, 'cols': ["字段", "描述", "值"], 'rows': []}
    try:
        fields = json.loads(Str)
        for k in fields:
            if k == 'AccountID' or k == 'BrokerID':
                continue
            if k not in trans: 
                desc = '--'
            else:   
                desc = trans[k]
            v = fields[k]
            if type(v) == typeOfstr('int') or type(v) == typeOfstr('float'):
                v = _N(v, 5)
            tbl['rows'].append([k, desc, v])
    except:
        Log(traceback.format_exc())
    return tbl

# NewTaskQueue 类
class NewTaskQueue:
    '模拟并发任务队列类'
    NewTaskQueueCount = 0
    def __init__(self, onTaskFinish = None):
        self.ERR_SUCCESS = 0
        self.ERR_SET_SYMBOL = 1
        self.ERR_GET_RECORDS = 2
        self.ERR_GET_ORDERS = 3
        self.ERR_GET_POS = 4
        self.ERR_TRADE = 5
        self.ERR_GET_DEPTH = 6
        self.ERR_NOT_TRADEING = 7
        self.ERR_BUSY = 8

        self.onTaskFinish = None if onTaskFinish is None else onTaskFinish
        self.retryInterval = 300
        self.tasks = []

    def pushTask(self, e, symbol, action, amount, onFinish):
        task = {
            "e" : e,
            "action" : action,
            "symbol" : symbol,
            "amount" : amount,
            "init" : False,
            "finished" : False,
            "dealAmount" : 0,
            "preAmount" : 0,
            "preCost" : 0,
            "retry" : 0,
            "maxRetry" : 10,
            "onFinish" : onFinish,
            "desc" : ""
        }
        
        # 暂时不用字典映射
        if task["action"] == "buy":
            task["desc"] = task["symbol"] + " 开多仓，数量" + str(task["amount"])
        elif task["action"] == "sell":
            task["desc"] = task["symbol"] + " 开空仓，数量" + str(task["amount"])
        elif task["action"] == "closebuy":
            task["desc"] = task["symbol"] + " 平多仓，数量" + str(task["amount"])
        elif task["action"] == "closesell":
            task["desc"] = task["symbol"] + " 平空仓，数量" + str(task["amount"])
        else:
            task["desc"] = task["symbol"] + " " + task["action"] + ", 数量 " + str(task["amount"])

        self.tasks.append(task)
        Log("接收到任务", task["desc"])
    
    def cancelAll(self, e):
        while True:
            orders = e.GetOrders()
            if orders is None:
                return self.ERR_GET_ORDERS
            if len(orders) == 0:
                break
            for i in range(len(orders)):
                e.CancelOrder(orders[i]["Id"])
                Sleep(self.retryInterval)
        return self.ERR_SUCCESS

    def pollTask(self, task):
        insDetail = task["e"].SetContractType(task["symbol"])
        if insDetail is None:
            return self.ERR_SET_SYMBOL
        # if (insDetail.MaxLimitOrderVolume == 0)
        if insDetail["MaxLimitOrderVolume"] == 0:
            # insDetail.MaxLimitOrderVolume = 50
            insDetail["MaxLimitOrderVolume"] = 50
        ret = False
        isCover = (task["action"] != "buy") and (task["action"] != "sell")
        while True:
            if not ext.IsTrading(task["symbol"]):
                return self.ERR_NOT_TRADEING
            Sleep(500)
            ret = self.cancelAll(task["e"])
            if ret != self.ERR_SUCCESS:
                return ret
            positions = task["e"].GetPosition()
            if positions is None:
                return self.ERR_GET_POS
            pos = None
            for i in range(len(positions)):
                if (positions[i]["ContractType"] == task["symbol"] and (((positions[i]["Type"] == PD_LONG or positions[i]["Type"] == PD_LONG_YD) and (task["action"] == "buy" or task["action"] == "closebuy")) or ((positions[i]["Type"] == PD_SHORT or positions[i]["Type"] == PD_SHORT_YD) and (task["action"] == "sell" or task["action"] == "closesell")))):
                    if pos is None:
                        pos = positions[i]
                        pos["Cost"] = positions[i]["Price"] * positions[i]["Amount"]
                    else:
                        pos["Amount"] += positions[i]["Amount"]
                        pos["Profit"] += positions[i]["Profit"]
                        pos["Cost"] += positions[i]["Price"] * positions[i]["Amount"]
            if not task["init"]:
                task["init"] = True
                if pos:
                    task["preAmount"] = pos["Amount"]
                    task["preCost"] = pos["Cost"]
                else:
                    task["preAmount"] = 0
                    task["preCost"] = 0
                    if isCover:
                        Log("找不到仓位", task["symbol"], task["action"])
                        ret = None
                        break
            remain = task["amount"]
            if isCover and (pos is None):
                pos = {"Amount": 0, "Cost": 0, "Price": 0}
            if pos:
                task["dealAmount"] = pos["Amount"] - task["preAmount"]
                if isCover:
                    task["dealAmount"] = -task["dealAmount"]
                remain = task["amount"] - task["dealAmount"]
                if (remain <= 0 or task["retry"] >= task["maxRetry"]):
                    ret = {
                        "price" : (0 if task["dealAmount"] == 0 else (pos["Cost"] - task["preCost"]) / (pos["Amount"] - task["preAmount"])),
                        "amount" : (pos["Amount"] - task["preAmount"]),
                        "position" : pos
                    }
                    if isCover:
                        ret["amount"] = -ret["amount"]
                        if pos["Amount"] == 0:
                            ret["position"] = None
                    break
            elif task["retry"] >= task["maxRetry"]:
                ret = None
                break

            depth = task["e"].GetDepth()
            if depth is None:
                return self.ERR_GET_DEPTH
            orderId = None
            slidePrice = insDetail["PriceTick"] * SlideTick
            if isCover:
                for i in range(len(positions)):
                    if positions[i]["ContractType"] != task["symbol"]:
                        continue
                    if (int(remain) < 1):
                        break
                    amount = min(insDetail["MaxLimitOrderVolume"], positions[i]["Amount"], remain)
                    if (task["action"] == "closebuy" and (positions[i]["Type"] == PD_LONG or positions[i]["Type"] == PD_LONG_YD)):
                        task["e"].SetDirection("closebuy_today" if positions[i]["Type"] ==  PD_LONG else "closebuy")
                        amount = min(amount, depth["Bids"][0]["Amount"])
                        orderId = task["e"].Sell(_N(depth["Bids"][0]["Price"] - slidePrice, 2), amount, task["symbol"], "平今" if positions[i]["Type"] == PD_LONG else "平昨", "Bid", depth["Bids"][0])
                        remain -= amount
                    elif (task["action"] == "closesell" and (positions[i]["Type"] == PD_SHORT or positions[i]["Type"] == PD_SHORT_YD)):
                        task["e"].SetDirection("closesell_today" if positions[i]["Type"] == PD_SHORT else "closesell")
                        amount = min(amount, depth["Asks"][0]["Amount"])
                        orderId = task["e"].Buy(_N(depth["Asks"][0]["Price"] + slidePrice, 2), amount, task["symbol"], "平今" if positions[i]["Type"] == PD_SHORT else "平昨", "Ask", depth["Asks"][0])
                        remain -= amount
            else:
                if task["action"] == "buy":
                    task["e"].SetDirection("buy")
                    orderId = task["e"].Buy(_N(depth["Asks"][0]["Price"] + slidePrice, 2), min(remain, depth["Asks"][0]["Amount"]), task["symbol"], "Ask", depth["Asks"][0])
                else :
                    task["e"].SetDirection("sell")
                    orderId = task["e"].Sell(_N(depth["Bids"][0]["Price"] - slidePrice, 2), min(remain, depth["Bids"][0]["Amount"]), task["symbol"], "Bid", depth["Bids"][0])

            if orderId is None:
                task["retry"] += 1
                return self.ERR_TRADE

        task["finished"] = True

        if self.onTaskFinish:
            self.onTaskFinish(task, ret)

        if task["onFinish"]:
            task["onFinish"](task, ret)

        return self.ERR_SUCCESS

    def poll(self):
        processed = 0

        # 迭代
        for task in self.tasks :
            if not task["finished"] :
                processed += 1
                self.pollTask(task)

        if processed == 0:
            self.tasks = []

    def size(self):
        return len(self.tasks)

    '''
    self.GetPosition = function(e, contractType, direction, positions) {
        return GetPosition(e, contractType, direction, positions);
    };
    '''
    def GetPosition(self, e, contractType, direction=None, positions=None):
        return GetPosition(e, contractType, direction, positions)

    '''
    self.hasTask = function(symbol) {
        if (typeof(symbol) !== 'string') {
            return self.tasks.length > 0
        }

        for (var i = 0; i < self.tasks.length; i++) {
            if (self.tasks[i].symbol == symbol && !self.tasks[i].finished) {
                return true
            }
        }
        return false
    }
    '''
    def hasTask(self, symbol):
        if type(symbol) != str:
            return len(self.tasks) > 0
        for task in self.tasks:
            if task["symbol"] == symbol and not task["finished"]:
                return True
        return False 




# NewPositionManager 类
class NewPositionManager:
    '非并发交易控制类'
    NewPositionManagerCount = 0

    # 构造函数
    def __init__(self, e):
        self.e = e
        self.account = None 
    
    # Account
    def Account(self):
        if self.account is None:
            self.account = _C(self.e.GetAccount)
        return self.account
    
    # GetAccount
    def GetAccount(self, getTable = False):
        self.account = _C(self.e.GetAccount)
        if (not getTable in dir() and getTable):
            return AccountToTable(self.e.GetRawJSON())
        return self.account

    # GetPosition
    def GetPosition(self, contractType, direction, positions = None):
        return GetPosition(self.e, contractType, direction, positions)

    # OpenLong
    def OpenLong(self, contractType, shares):
        if self.account is None:
            self.account = _C(self.e.GetAccount)
        return Open(self.e, contractType, PD_LONG, shares)
    
    # OpenShort
    def OpenShort(self, contractType, shares):
        if self.account is None:
            self.account = _C(self.e.GetAccount)
        return Open(self.e, contractType, PD_SHORT, shares)
    
    # Cover
    def Cover(self, contractType):
        if self.account is None:
            self.account = _C(self.e.GetAccount)
        return Cover(self.e, contractType)

    # CoverAll
    def CoverAll(self):
        if self.account is None:
            self.account = _C(self.e.GetAccount)
        while True:
            positions = _C(self.e.GetPosition)
            if len(positions) == 0:
                break
            for i in range(len(positions)):
                if '&' not in positions[i]['ContractType']:
                    Cover(self.e, positions[i]['ContractType'])
                    Sleep(1000)

    # Profit
    def Profit(self): # contractType JS 版本有该参数
        accountNow = _C(self.e.GetAccount)
        return _N(accountNow.Balance - self.account.Balance)

    # NewPositionManager END




# 导出函数实现
def CreateNewPositionManager(e = exchange): # 导出函数实现
    if e not in exchanges:
        raise Exception("error exchange", e)
    if (versionMainValue != 3 and e.GetName() != 'Futures_CTP') or (versionMainValue == 3 and e.GetName() != 'Futures_CTP'):
        raise Exception("error exchange, 本模板适用于CTP商品期货,当前添加的交易所为：", e.GetName());
    obj_NewPositionManager = NewPositionManager(e)
    return obj_NewPositionManager

def IsTrading(symbol):
    now = time.time()
    tup_localtime = time.localtime(now)
    day = tup_localtime.tm_wday    # tm_wday  : week 0~6 , 0 is monday
    hour = tup_localtime.tm_hour   # tm_hour : 0~23
    minute = tup_localtime.tm_min  # tm_min : 0~59
    
    if (day == 6 or (day == 5 and (hour > 2 or hour == 2 and minute > 30))):
        return False

    shortName = ""                      # i , p
    for i in range(len(symbol)):
        ch = symbol[i]
        if ch.isdigit():                # ch >= 48 and ch <= 57:
            break
        shortName += symbol[i].upper()
    
    period = [
        [9, 0, 10, 15],
        [10, 30, 11, 30],
        [13, 30, 15, 0]
    ]

    if (shortName == "IH" or shortName == "IF" or shortName == "IC"):
        period = [
            [9, 30, 11, 30],
            [13, 0, 15, 0]
        ]
    elif (shortName == "TF" or shortName == "T" or shortName == "TS"):
        period = [
            [9, 30, 11, 30],
            [13, 0, 15, 15]
        ]
    
    if day >= 0 and day <= 4:
        for i in range(len(period)):
            p = period[i]
            if ((hour > p[0] or (hour == p[0] and minute >= p[1])) and (hour < p[2] or (hour == p[2] and minute < p[3]))):
                return True

    ''' 参考JavaScript版本合约品种交易时间
    var nperiod = [
        [
            ['sc', 'ag', 'au'],
            [21, 0, 2, 30]
        ],
        [
            ['nr', 'bu', 'hc', 'rb', 'ru', 'sp', 'fu', 'ZC', 'CF', 'CY', 'FG', 'MA', 'OI', 'RM', 'SR',
                'TA', 'SA', 'a', 'b', 'c', 'cs', 'i', 'j', 'jm', 'l', 'm', 'p', 'pp', 'v', 'y', 'eg', 'rr', 'eb', 'pg'
            ],
            [21, 0, 23, 0]
        ],
        [
            ['al', 'cu', 'ni', 'pb', 'sn', 'zn', 'ss'],
            [21, 0, 1, 0]
        ]
    ];
    '''

    nperiod = [
        [
            ['SC', 'AU', 'AG'],
            [21, 0, 2, 30]  # 此处修改为 2
        ],
        [
            ['CU', 'AL', 'ZN', 'PB', 'SN', 'NI', 'SS', 'BC'],
            [21, 0, 1, 0]   # 此处修改为 1
        ],
        [
            ['NR', 'BU', 'HC', 'RB', 'RU', 'SP', 'FU', 'ZC', 'CF', 'CY', 'FG', 'MA', 'OI', 'RM', 'SR', 'TA', 'SA', 'A', 'B', 'C', 'CS', 'I', 'J', 'JM', 'L', 'M', 'P', 'PP', 'V', 'Y', 'EG', 'RR', 'EB', 'PG', 'LU'],
            [21, 0, 23, 0]
        ]
    ]

    for i in range(len(nperiod)):
        for j in range(len(nperiod[i][0])):
            if nperiod[i][0][j] == shortName:
                p = nperiod[i][1]
                condA = hour > p[0] or (hour == p[0] and minute >= p[1])
                condB = hour < p[2] or (hour == p[2] and minute < p[3])
                # in one day
                if p[2] >= p[0]:
                    if ((day >= 0 and day <= 4) and condA and condB):
                        return True
                else:
                    if (((day >= 0 and day <= 4) and condA) or ((day >= 1 and day <= 5) and condB)):
                        return True
                return False
    return False

def CreateNewTaskQueue(onTaskFinish = None):
    obj_NewTaskQueue = NewTaskQueue(onTaskFinish)
    return obj_NewTaskQueue

# 合约名称转换产品名称
def ins2product(symbol):
    if len(symbol) > 6 and symbol.find(' ') == -1:
        return symbol
    
    symbol = symbol.replace("SPD ", "").replace("SP ", "")
    shortName = ""
    for ch in symbol:
        if ch >= chr(48) and ch <= chr(57):
            break
        shortName += ch
    return shortName 

# CTA函数
def CTA(contractType, onTick, interval = 500):
    SetErrorFilter("login|ready|初始化")   # login|ready|初始化 过滤三种错误
    exchange.IO("mode", 0)
    lastUpdate = 0
    e = exchange
    symbols = contractType.split(",")
    holds = {}
    tblAccount = {}

    def findChartSymbol(ct):
        product = ins2product(ct)
        for i in symbols:
            tmp = i.split("/")
            if ins2product(tmp[-1]) == product:
                return tmp[0]
        return None 
    
    def refreshHold(qSize=0):
        while not e.IO("status"):
            LogStatus(_D(), "Not connect")
            Sleep(1000)

        for ins in symbols:
            tmp = ins.split("/")
            if len(tmp) == 2:
                holds[tmp[0]] = {
                    "price" : 0, 
                    "value" : 0,
                    "amount" : 0, 
                    "profit" : 0,
                    "symbol" : tmp[1]
                }
            else :
                holds[ins] = {
                    "price" : 0, 
                    "value" : 0, 
                    "amount" : 0, 
                    "profit" : 0, 
                    "symbol" : ins, 
                }
        positions = _C(e.GetPosition)
        for pos in positions:
            mapCT = findChartSymbol(pos["ContractType"])
            if not mapCT:
                continue 
            if mapCT not in holds:
                continue 
            hold = holds[mapCT]
            if pos["Type"] == PD_LONG or pos["Type"] == PD_LONG_YD:
                if hold["amount"] < 0 and qSize == 0:
                    raise "不能同时持有多仓空仓"
                hold["amount"] += pos["Amount"]
            else :
                if hold["amount"] > 0 and qSize == 0:
                    raise "不能同时持有多仓空仓"
                hold["amount"] -= pos["Amount"]
            hold["value"] += pos["Price"] * pos["Amount"]
            hold["profit"] += pos["Profit"]
            if hold["amount"] != 0:
                hold["price"] = _N(hold["value"] / abs(hold["amount"]))
        account = _C(e.GetAccount)
        if CTAShowPosition:
            tblPosition = {
                "type" : "table", 
                "title" : "持仓状态", 
                "cols" : ["品种", "方向", "均价", "数量", "浮动盈亏"], 
                "rows" : [], 
            }
            for pos in positions:
                # tblPosition.rows.push([pos.ContractType, ((pos.Type == PD_LONG || pos.Type == PD_LONG_YD) ? '多#0000ff' : '空#ff0000'), pos.Price, pos.Amount, pos.Profit])
                tblPosition["rows"].append([pos["ContractType"], "多#0000ff" if (pos["Type"] == PD_LONG or pos["Type"] == PD_LONG_YD) else "空#ff0000", pos["Price"], pos["Amount"], pos["Profit"]])
            tblAccount = ext.AccountToTable(e.GetRawJSON(), "资金信息")
            LogStatus("`" + json.dumps([tblPosition, tblAccount]) + "`\n", "更新于：" + _D())
        lastUpdate = time.time() * 1000
        return account

    account = refreshHold(0)
    def callBack_NewTaskQueue(task, ret):
        Log("任务结束", task["desc"])
        account = refreshHold(q.size())
    q = ext.NewTaskQueue(callBack_NewTaskQueue)
    mainCache = {}
    while True:
        ts = time.time() * 1000
        for ins in symbols:
            ctChart = ins 
            ctTrade = ins
            tmp = ins.split("/")
            if len(tmp) == 2:
                ctChart = tmp[0]
                ctTrade = tmp[1]
            if not e.IO("status") or not ext.IsTrading(ctChart) or not ext.IsTrading(ctTrade) or q.hasTask(ctTrade):
                continue 
            # 正在移仓
            if ctTrade in mainCache and (q.hasTask(mainCache[ctTrade][0]) or q.hasTask(mainCache[ctTrade][1])):
                continue

            c = e.SetContractType(ctChart)
            if not c:
                continue
            r = e.GetRecords()
            if r is None or len(r) == 0:
                continue
            insDetail = e.SetContractType(ctTrade)
            if not insDetail:
                continue
            tradeSymbol = insDetail["InstrumentID"]
            if ctTrade.find("888") != -1 or ctTrade.find("000") != -1:
                preMain = ""
                isSwitch = False 
                positions = None
                if ctTrade not in mainCache:
                    if not IsVirtual():
                        Log(ctTrade, "当前主力合约为：", tradeSymbol)
                    positions = e.GetPosition()
                    if positions is None:
                        continue
                    product = ins2product(ctTrade)
                    for p in positions:
                        if ins2product(p["ContractType"]) == product:
                            mainCache[ctTrade] = [p["ContractType"], p["ContractType"]]
                if ctTrade in mainCache and mainCache[ctTrade][0] != tradeSymbol:
                    preMain = mainCache[ctTrade][0]
                    Log(ctTrade, "主力合约切换为：", tradeSymbol, "之前为：", preMain, "#ff0000")
                    if positions is None:
                        positions = e.GetPosition()
                        if positions is None:
                            continue
                    for p in positions:
                        if p["ContractType"] == preMain:
                            isLong = p["Type"] == PD_LONG or p["Type"] == PD_LONG_YD
                            def callBack_pushTaskCover(task, ret):
                                Log("切换合约平仓成功", task["desc"], ret)
                            def callBack_pushTaskOpen(task, ret):
                                Log("切换合约开仓成功", task["desc"], ret)
                            q.pushTask(e, p["ContractType"], "closebuy" if isLong else "closesell", p["Amount"], callBack_pushTaskCover)
                            q.pushTask(e, tradeSymbol, "buy" if isLong else "sell", p["Amount"], callBack_pushTaskOpen)
                            isSwitch = True 
                mainCache[ctTrade] = [tradeSymbol, preMain]
                if isSwitch:
                    Log("开始移仓", preMain, "移到", tradeSymbol)
                    continue
            hold = holds[ctChart]
            n = onTick({
                "records" : r,
                "symbol" : tradeSymbol,  
                "detail" : insDetail,  
                "account" : account,  
                "position" : hold,  
                "positions" : holds,  
            })
            callBack = None 
            if type(n) == typeOfstr("list") and type(len(n)) == typeOfstr("int") and len(n) > 1:
                if type(n[1]) == types.FunctionType:
                    callBack = n[1]
                n = n[0]
            if type(n) != typeOfstr("int") and type(n) != typeOfstr("float"):
                continue
            ret = None 
            if n > 0:
                if hold["amount"] < 0:
                	q.pushTask(e, tradeSymbol, "closesell", min(-hold["amount"], n), callBack)
                	n += hold["amount"]
                if n > 0:
                	q.pushTask(e, tradeSymbol, "buy", n, callBack)
            elif n < 0:
                if hold["amount"] > 0:
                	q.pushTask(e, tradeSymbol, "closebuy", min(hold["amount"], -n), callBack)
                	n += hold["amount"]
                if n < 0:
                	q.pushTask(e, tradeSymbol, "sell", -n, callBack)
            elif n == 0 and hold["amount"] != 0:
                q.pushTask(e, tradeSymbol, "closebuy" if hold["amount"] > 0 else "closesell", abs(hold["amount"]), callBack)
        q.poll()

        now = time.time() * 1000
        if now - lastUpdate > SyncInterval * 1000:
            account = refreshHold(q.size())
        delay = interval - (now - ts)
        if delay > 0:
            Sleep(delay)

def Cross(arr1, arr2):
    if len(arr1) != len(arr2):
        raise "array length not equal"
    n = 0
    arr1.reverse()
    arr2.reverse()
    for i in range(len(arr1)):
        if arr1[i] is None or arr2[i] is None:
            break
        if arr1[i] < arr2[i]:
            if n > 0:
                break
            n -= 1
        elif arr1[i] > arr2[i]:
            if n < 0:
                break 
            n += 1
        else :
            break
    return n


# 导出函数
ext.NewPositionManager = CreateNewPositionManager
ext.IsTrading = IsTrading
ext.AccountToTable = AccountToTable
ext.NewTaskQueue = CreateNewTaskQueue
ext.CTA = CTA 
ext.Cross = Cross

# 测试  IsVirtual() 判断是否是回测。
def VGetRawJSON():   # 模拟  GetRawJSON 函数 ,仅测试使用。 
    nowTime = time.time()
    DnowTime = _D(nowTime)
    dict1 = {"AccountID": "073997", "Available": 1331.445464656656, "Balance": 1331.3344567, "BrokerID": "9999", "time": nowTime, "_D": DnowTime, "CurrMargin": 0}
    dict1Str = json.dumps(dict1)
    return dict1Str

def main():
    '''
    # 测试 AccountToTable
    Log("测试 AccountToTable 函数 ")
    Str = '{"AccountID": "073997", "Available": 1331.445464656656, "Balance": 1331.3344567, "BrokerID": "9999", "CashIn": 0, "XXX": "dd"}'
    table = AccountToTable(Str)
    Log(json.dumps(table))
    LogStatus('`' + json.dumps(table) + '`')

    # 测试 IsTrading
    Log("now time", _D(), "isTrading('MA701'): ", ext.IsTrading("MA701"))   
    Log("now time", _D(), "isTrading('SR701'): ", ext.IsTrading("SR701")) 
    Log("now time", _D(), "isTrading('jd1701'): ", ext.IsTrading("jd1701")) 

    # 测试 NewPositionManager 导出函数 生成对象
    obj = ext.NewPositionManager()
    Log(obj.Account(), obj.account)
    
    # 测试 NewPositionManager 类 实例的成员函数 GetAccount
    retGetAccount = obj.GetAccount(True)
    Log(retGetAccount)
    LogStatus('`' + json.dumps(retGetAccount) + '`')    
    
    # 测试 OpenLong 、 OpenShort 、GetPosition
    open_long = obj.OpenLong("MA701", 2)
    open_short1 = obj.OpenShort("SR701", 3)
    open_short2 = obj.OpenShort("jd1701", 4)
    Log("open_long:", open_long)
    Log("open_short1:", open_short1)    
    Log("open_short2:", open_short2)
    positions = obj.GetPosition("MA701", PD_SHORT)
    Log("get MA701 PD_SHORT:", positions)
    positions = obj.GetPosition("MA701", PD_LONG)
    Log("get MA701 PD_LONG:", positions)

    # 测试 CoverAll
    obj.Cover("MA701")

    # 测试 CoverAll 
    obj.CoverAll()
    
    # 读取 Cover  、CoverAll 后的 持仓信息
    positions = exchange.GetPosition()
    Log("now Positions:", positions)

    # 测试 GetAccount 、 Profit
    # Log("Account:", obj.GetAccount())
    Log("Profit:", obj.Profit())
    Log("account", obj.Account())
    Log("Account:", obj.GetAccount())

    # 测试 IsTrading
    Log(ext.IsTrading("MA701"))    

    # 测试 ext.AccountToTable
    Str = '{"AccountID": "000", "Available": 55, "Balance": 55, "BrokerID": "9999", "CashIn": 0, "ZZZ": "YHU"}'
    table = ext.AccountToTable(Str)
    Log(json.dumps(table))
    LogStatus('`' + json.dumps(table) + '`')

    Log("-------------------------------------------------------------")
    '''
    
    # 测试 NewTaskQueue
    '''
    q = ext.NewTaskQueue()
    
    def NoName2(task, ret):
        Log(task["desc"], ret, "#FF0000")

    def NoName1(task, ret):
        Log(task["desc"], ret, "#FF0000")
        if ret:
            q.pushTask(exchange, "MA701", "closebuy", 1, NoName2)

    q.pushTask(exchange, "MA701", "buy", 3, lambda task, ret: Log(task["desc"], ret, q.pushTask(exchange, "MA701", "closebuy", 1, lambda task, ret: Log(task["desc"], ret, "#FF0000")) if ret else "", "#FF0000"))

    Log("q.tasks`s length :", q.size())
    
    while True:
        q.poll()
        Sleep(1000)
    '''
    
    # 测试CTA函数
    def callBack_CTA(st):
        if len(st["records"]) < 20:
            return 
        emaSlow = TA.EMA(st["records"], 20)
        emaFast = TA.EMA(st["records"], 5)
        cross = ext.Cross(emaFast, emaSlow)
        
        if st["position"]["amount"] <= 0 and cross > 2:
            Log("金叉周期", cross, "当前持仓：", st["position"])
            return 2 if st["position"]["amount"] < 0 else 1
        elif st["position"]["amount"] >= 0 and cross < -2:
            Log("死叉周期", cross, "当前持仓：", st["position"])
            return -2 if st["position"]["amount"] > 0 else -1
    
    ret = ext.CTA("MA000/MA888,rb000/rb888,i000/i888", callBack_CTA)
    
```

> 策略出处

https://www.fmz.com/strategy/325979

> 更新时间

2021-10-26 15:36:07
