
> 策略名称

模拟测试kdj

> 策略作者

zhiyuanfirst



> 策略参数



|参数|默认值|描述|
|----|----|----|
|OpMode|0|下单方式: 吃单|挂单|
|MaxSpace|0.5|挂单失效距离|
|SlidePrice|0.1|下单浮动价|
|MaxAmount|0.8|开仓单次最大下单量|
|RetryDelay|500|失败重试毫秒|
|MAType|0|均线类型: TA.EMA|TA.MA|
|_GetMinStocks|0.01|最小交易量|


> 源码 (python)

``` python
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
        if(not waitFrozen or (account.FrozenStocks < _GetMinStocks and account.FrozenBalance < 0.01)):
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
            if(doAmount < _GetMinStocks):
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

_G("status", 'none')
_G("valueJ", 0)
_G("count", 0)
_G("buy_type","default")
ZERO = 1e-9
# 点
class Point(object):

    def __init__(self, x, y):
        self.x, self.y = x, y

# 向量
class Vector(object):

    def __init__(self, start_point, end_point):
        self.start, self.end = start_point, end_point
        self.x = end_point.x - start_point.x
        self.y = end_point.y - start_point.y

def negative(vector):
    """取反"""
    return Vector(vector.end, vector.start)

def vector_product(vectorA, vectorB):
    '''计算 x_1 * y_2 - x_2 * y_1'''
    return vectorA.x * vectorB.y - vectorB.x * vectorA.y

def is_intersected(A, B, C, D):
    '''A, B, C, D 为 Point 类型'''
    AC = Vector(A, C)
    AD = Vector(A, D)
    BC = Vector(B, C)
    BD = Vector(B, D)
    CA = negative(AC)
    CB = negative(BC)
    DA = negative(AD)
    DB = negative(BD)

    return (vector_product(AC, AD) * vector_product(BC, BD) <= ZERO) \
        and (vector_product(CA, CB) * vector_product(DA, DB) <= ZERO)        

    
    
# 测试
def onTick2():
    records = exchange.GetRecords(PERIOD_H1)
    #Log("第一根k线数据为，Time:", records[0].Time, "Open:", records[0].Open, "High:", records[0].High,"Low:", records[0].Close, "Volume:", records[0].Volume);
        
    #Log("第二根k线数据为，Time:", records[len(records)-1].Time, "Open:", records[1].Open, "High:", records[1].High,"Low:", records[1].Close, "Volume:", records[1].Volume);
    kdj = TA.KDJ(records, 9, 3, 3)
    k = kdj[0]
    d = kdj[1]
    j = kdj[2]
    if len(k) == len(d) == len(j):
        length = len(k)
    
        if k[length-1] is None or d[length-1] is None or j[length-1] is None:
            return
        if _G("buy_type") == "block" and j[length-1] > 0:
            _G("buy_type", "default")

        if _G("status") != 'buy' and j[length-1] < 0:
            if j[length-1] < -100:
                _G("buy_type", "black")
                           
                
            if _G("buy_type") == "default":          
                #buy
                ext.Buy(0.1)
                _G("status", "buy")                  
                Log("buy:k,d,j", k[length-1], d[length-1], j[length-1])
    
        if _G("status") == 'buy' and j[length-1] > 100:
            #sell
            ext.Sell(0.1)
            _G("status", "sell")                   
            Log("sell:k,d,j", k[length-1], d[length-1], j[length-1])

def onTick1():
    status = 'none'
    Log(exchange.GetAccount())
    records = exchange.GetRecords(PERIOD_D1)
    kdj = TA.KDJ(records, 9, 3, 3)
    k = kdj[0]
    d = kdj[1]
    j = kdj[2]
    Log("kdj:", k, d, j)
    if len(k) == len(d) == len(j):
        length = len(k)
        Log("length:", length)
        if k[length-1] is None or d[length-1] is None or j[length-1] is None:
            return
        if k[length-2] is None or d[length-2] is None or j[length-2] is None:
            return
        if k[length-3] is None or d[length-3] is None or j[length-3] is None:
            return
        
        valueJ = _G("valueJ")
        if valueJ > 0 and  j[length-1] > 0 or valueJ < 0 and  j[length-1] < 0:
            count = _G("count")
            count = count + 1
            _G("count", count)
        else:
            _G("count", 0)    
            
        _G("valueJ", j[length-1])
        
        k1 = Point(length-2, k[length-2])
        d1 = Point(length-2, d[length-2])
        j1 = Point(length-2, j[length-2])
        
        k2 = Point(length-1, k[length-1])
        d2 = Point(length-1, d[length-1])
        j2 = Point(length-1, j[length-1])
        
        k3 = Point(length-3, k[length-3])
        d3 = Point(length-3, d[length-3])
        j3 = Point(length-3, j[length-3])
        
        resultJ = (j2.y-j3.y) / (j2.x - j3.x)   
        resultJ2 = (j1.y-j3.y) / (j1.x - j3.x)
        if (_G("status") != 'buy' and resultJ > 0 and resultJ2 > 0 
            and j[length-1] > k[length-1] and j[length-1] > d[length-1] 
            and j[length-2] > k[length-2] and j[length-2] > d[length-2] 
            and j[length-3] > k[length-3] and j[length-3] > d[length-3]):
                # 买点
                ext.Buy(0.1)
                _G("status", "buy")                  
                Log("buy:k,d,j", k[length-1], d[length-1], j[length-1])                  
                    
        if _G("status") == 'buy' and resultJ < 0 and resultJ2 < 0:   
            # 卖点
            ext.Sell(0.1)
            _G("status", "sell")                   
            Log("sell:k,d,j", k[length-1], d[length-1], j[length-1])     
       

        
        

def onTick():
    Log(exchange.GetAccount())
    records = exchange.GetRecords(PERIOD_D1)
    kdj = TA.KDJ(records, 9, 3, 3)
    k = kdj[0]
    d = kdj[1]
    j = kdj[2]
    Log("kdj:", k, d, j)
    if len(k) == len(d) == len(j):
        k1 = Point(0, 0)
        d1 = Point(0, 0)
        j1 = Point(0, 0)
        for i in range(0, len(k)):
            if k[i] is None or d[i] is None or j[i] is None:
                continue
            if i > 0:
                if k[i-1] is None or d[i-1] is None or j[i-1] is None:
                    continue
                k1 = Point(i-1, k[i-1])
                d1 = Point(i-1, d[i-1])
                j1 = Point(i-1, j[i-1])
                
            k2 = Point(i, k[i])
            d2 = Point(i, d[i])
            j2 = Point(i, j[i])
                
            if is_intersected(k1,k2,d1,d2) and is_intersected(d1,d2,j1,j2) and is_intersected(j1,j2,k1,k2):
                # k,d,j三线相交
                resultJ = (j2.y-j1.y) / (j2.x - j1.x)            
                if resultJ > 0 and j[i] > k[i] and j[i] > k[i]:
                    # 买点
                    ext.Buy(0.1)
                    status = 'buy'                  
                    Log("buy:k,d,j", k[i], d[i], j[i])                  
                    
                if resultJ < 0 and j[i] < k[i] and j[i] < k[i]:   
                    # 卖点
                    ext.Sell(0.1)
                    status = 'sell'                   
                    Log("sell:k,d,j", k[i], d[i], j[i])
                    

    else:
        Log("kdj not len equal")
        
        
def main():
    while True:
        onTick2()
        Sleep(15*60*1000)

```

> 策略出处

https://www.fmz.com/strategy/119057

> 更新时间

2018-09-30 11:30:25
