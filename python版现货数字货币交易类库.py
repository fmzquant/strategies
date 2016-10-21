'''
策略出处: https://www.botvs.com/strategy/21104
策略名称: python版现货数字货币交易类库
策略作者: 小小梦
策略描述:

现货数字货币交易类库（python版）


参数            默认值  描述
----------  -----  ------------------
OpMode        0    下单方式: 吃单|挂单
MaxSpace      0.5  挂单失效距离
SlidePrice    0.1  下单滑动价
MaxAmount     0.8  开仓单次最大下单量
RetryDelay  500    失败重试毫秒
MAType        0    均线类型: TA.EMA|TA.MA
'''

import types # 导入类型模块
import time  # 导入时间模块
import platform # 版本信息 

versionMainValue = None
isFirstCheck = True
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
            
def CheckVersion():
    global versionMainValue,isFirstCheck
    platformInfo = platform.python_version()
    if platformInfo[0] == '2':
        Log("您使用的托管者 python编译环境的python版本是",platformInfo)
        versionMainValue = 2
    elif platformInfo[0] == '3':
        Log("您使用的托管者 python编译环境的python版本是",platformInfo)
        versionMainValue = 3
    else:
        Log("其它版本")
    isFirstCheck = False

def CancelPendingOrders(e, orderType = "") : # 取消所有未完成挂单
    while True: # 循环
        orders = e.GetOrders()
        LogStatus("orders:",orders,time.time()) # 测试
        if(type(orders) != typeOfstr("list")):
            Sleep(RetryDelay)
            continue
        processed = 0
        for j in range(len(orders)):
            if (type(orderType) == typeOfstr("int") and orders[j].Type != orderType):
                continue
            e.CancelOrder(orders[j].Id,orders[j])
            processed += 1
            if (j < (len(orders) - 1)):
                Sleep(RetryDelay)
        if(processed == 0):
            break

def GetAccount(e, waitFrozen = False):
    account = null
    alreadyAlert = False
    while True:
        account = _C(e.GetAccount)
        if(not waitFrozen or (account.FrozenStocks < e.GetMinStock() and account.FrozenBalance < 0.01)):
            break
        if(not alreadyAlert):
            alreadyAlert = True
            Log("发现账户有冻结的钱或币",account)
        Sleep(RetryDelay)
    return account

def StripOrders(e,orderId = null):
    order = null
    while True:
        dropped = 0
        orders = _C(e.GetOrders)
        for i in range(len(orders)):
            if(orders[i].Id == orderId):
                order = orders[i]
            else:
                extra = ""
                if(orders[i].DealAmount > 0):
                    extra = "成交：" + str(orders[i].DealAmount)
                else:
                    extra = "未成交"
                e.CancelOrder(orders[i].Id,"买单" if orders[i].Type == ORDER_TYPE_BUY else "卖单",extra)
                dropped += 1
        if(dropped == 0):
            break
        Sleep(RetryDelay)
    return order

def Trade(e,tradeType,tradeAmount,mode,slidePrice,maxAmount,maxSpace,retryDelay):
    initAccount = GetAccount(e,True)
    nowAccount = initAccount
    orderId = null
    prePrice = 0.0
    dealAmount = 0.0
    diffMoney = 0.0
    isFirst = True
    tradeFunc = e.Buy if tradeType == ORDER_TYPE_BUY else e.Sell
    isBuy = (tradeType == ORDER_TYPE_BUY)
    while True:
        ticker = _C(e.GetTicker)
        tradePrice = 0.0
        if(isBuy):
            tradePrice = _N((ticker.Sell if mode == 0 else ticker.Buy) + slidePrice,4)
        else:
            tradePrice = _N((ticker.Buy if mode == 0 else ticker.Sell) - slidePrice,4)
        if(not orderId):
            if(isFirst):
                isFirst = False
            else:
                nowAccount = GetAccount(e,True)
            doAmount = 0.0;
            if(isBuy):
                diffMoney = _N(initAccount.Balance - nowAccount.Balance,4)
                dealAmount = _N(nowAccount.Stocks - initAccount.Stocks,4)
                doAmount = min(maxAmount,tradeAmount - dealAmount,_N((nowAccount.Balance - 10) / tradePrice,4))
            else:
                diffMoney = _N(nowAccount.Balance - initAccount.Balance,4)
                dealAmount = _N(initAccount.Stocks - nowAccount.Stocks,4)
                doAmount = min(maxAmount,tradeAmount - dealAmount,nowAccount.Stocks)
            if(doAmount < e.GetMinStock()):
                break
            prePrice = tradePrice
            orderId = tradeFunc(tradePrice,doAmount,ticker)
            if(not orderId):
                CancelPendingOrders(e,tradeType)
        else:
            if(mode == 0 or (abs(tradePrice - prePrice) > maxSpace)):
                orderId = null
            order = StripOrders(e,orderId)
            if(not order):
                orderId = null
        Sleep(retryDelay)
    if(dealAmount <= 0):
        Log("交易失败--TradeType:","buy" if tradeType == ORDER_TYPE_BUY else "sell","  ,diffMoney:",diffMoney,"  ,dealAmount",dealAmount,"  ,doAmount",doAmount)
        return null
    
    ret = {'price': _N(diffMoney/dealAmount,4),'amount':dealAmount}
    return ret
    # 调用时 这样写  ret['price'] 、 ret['amount']

def _Buy(e = exchange,amount = 0):
    if isFirstCheck:
        CheckVersion()
    if (type(e) == typeOfstr("int") or type(e) == typeOfstr("float")):
        amount = e
        e = exchange
    return Trade(e,ORDER_TYPE_BUY,amount,OpMode,SlidePrice,MaxAmount,MaxSpace,RetryDelay)

def _Sell(e = exchange,amount = 0):
    if isFirstCheck:
        CheckVersion()
    if (type(e) == typeOfstr("int") or type(e) == typeOfstr("float")):
        amount = e
        e = exchange
    return Trade(e,ORDER_TYPE_SELL,amount,OpMode,SlidePrice,MaxAmount,MaxSpace,RetryDelay)

def _CancelPendingOrders(e = exchange,orderType = ""):
    if isFirstCheck:
        CheckVersion()
    return CancelPendingOrders(e,orderType)

def _GetAccount(e = exchange):
    if isFirstCheck:
        CheckVersion()
    return _C(e.GetAccount)

_MACalcMethod = [TA.EMA,TA.MA][MAType]
Interval = 200
def Cross(a,b):
    if isFirstCheck:
        CheckVersion()
    crossNum = 0
    arr1 = []
    arr2 = []
    if type(a) == typeOfstr("list") and type(b) == typeOfstr("list"):
        arr1 = a
        arr2 = b
    else:
        records = null
        while True:
            records = exchange.GetRecords()
            if records and len(records) > a and len(records) > b:
                break
            Sleep(Interval)
        arr1 = _MACalcMethod(records,a)
        arr2 = _MACalcMethod(records,b)
    if len(arr1) != len(arr2):
        raise Exception("array length not equal")
    for i in range(len(arr1) - 1,-1,-1):
        if (type(arr1[i]) != typeOfstr("int") and type(arr1[i]) != typeOfstr("float")) or (type(arr2[i]) != typeOfstr("int") and type(arr2[i]) != typeOfstr("float")):
            break
        if arr1[i] < arr2[i] :
            if crossNum > 0 :
                break
            crossNum -= 1
        elif arr1[i] > arr2[i] :
            if crossNum < 0 :
                break
            crossNum += 1
        else:
            break
    return crossNum


# 导出函数
ext.Buy = _Buy
ext.Sell = _Sell
ext.CancelPendingOrders = _CancelPendingOrders
ext.GetAccount = _GetAccount
ext.Cross = Cross

# 测试
def main():
    ret = ext.Buy(0.2)
    exchange.Sell(4500,1)
    Sleep(10 * 1000)
    ext.CancelPendingOrders()
    Log("ret:",ret)
    avgprice = ret['price']
    dealamount = ret['amount']
    Log("avgprice:",avgprice,"  dealamount:",dealamount)
