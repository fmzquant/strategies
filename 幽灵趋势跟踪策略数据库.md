
> Name

幽灵趋势跟踪策略数据库

> Author

陈皮





> Source (python)

``` python
#!/usr/bin/python
# -*- coding: utf-8 -*-
import time,datetime
import json
from collections import Counter
IFLAGE = 0
class Account(object):
    #币安账户信息实体，封装了常用的账户信息
    #totalWalletBalance：钱包余额
    #totalMarginBalance：保证金余额
    #totalPositionInitialMargin：持仓保证金
    #totalOpenOrderInitialMargin：当前挂单保证金
    #availableBalance: 可用余额（仅计算usdt资产）
    def __init__(self, totalWalletBalance, totalMarginBalance, totalPositionInitialMargin, totalOpenOrderInitialMargin, availableBalance):
        self.totalWalletBalance = totalWalletBalance
        self.totalMarginBalance = totalMarginBalance
        self.totalPositionInitialMargin = totalPositionInitialMargin
        self.totalOpenOrderInitialMargin = totalOpenOrderInitialMargin 
        self.availableBalance = availableBalance
        
class Position(object):
    #币安交易对实体，封装了常用的交易对信息
    #entryPrice：持仓成本价
    #leverage：杠杆倍率
    #liquidationPrice：强平价格
    #marginType：逐仓模式或全仓模式
    #markPrice：标记价格
    #positionAmt：头寸数量
    #symbol：交易对
    #unRealizedProfit：持仓未实现盈亏
    #positionSide：持仓方向
    def __init__(self, entryPrice, leverage, liquidationPrice, marginType, markPrice, positionAmt, symbol, unRealizedProfit, positionSide):
        self.entryPrice = entryPrice
        self.leverage = leverage
        self.liquidationPrice = liquidationPrice
        self.marginType = marginType 
        self.markPrice = markPrice
        self.positionAmt = positionAmt
        self.symbol = symbol
        self.unRealizedProfit = unRealizedProfit
        self.positionSide = positionSide

class Ticker(object):
    #sell: 卖一价
    #buy: 买一价
    #last: 最后成交价格
    def __init__(self, sell, buy, last):
        self.sell = sell 
        self.buy = buy 
        self.last = last 
        
        
        
class Order(object):
    #id:订单唯一标识 
    #price:下单价格 
    #amount:下单数量 
    #status:订单状态--0：未完成；1：已完成；2：已经取消；3：未知状态
    def __init__(self, id, price, amount, status):
        self.id = id 
        self.price = price 
        self.amount = amount 
        self.status = status 
        
        
#获取账户信息        
def GetAccountDao():
    account = _C(exchange.GetAccount)
    assets = account.Info.assets
    busd = {}
    usdt = {}
    for asset in assets:
        symbol = asset["asset"]
        if symbol == "BUSD":
            busd = asset 
        if symbol == "USDT":
            usdt = asset
            
    bTotalWalletBalance = float(busd["walletBalance"])
    bTotalMarginBalance = float(busd["marginBalance"])
    bTotalPositionInitialMargin = float(busd["positionInitialMargin"])
    bTotalOpenOrderInitialMargin = float(busd["openOrderInitialMargin"])
    bAvailableBalance = float(busd["availableBalance"])
    uTotalWalletBalance = float(usdt["walletBalance"])
    uTotalMarginBalance = float(usdt["marginBalance"])
    uTotalPositionInitialMargin = float(usdt["positionInitialMargin"])
    uTotalOpenOrderInitialMargin = float(usdt["openOrderInitialMargin"])
    uAvailableBalance = float(usdt["availableBalance"])
    totalWalletBalance = _N(uTotalWalletBalance+bTotalWalletBalance,2)
    totalMarginBalance = _N(uTotalMarginBalance+bTotalMarginBalance,2)
    totalPositionInitialMargin = _N(uTotalPositionInitialMargin+bTotalPositionInitialMargin,2)
    totalOpenOrderInitialMargin = _N(uTotalOpenOrderInitialMargin+bTotalOpenOrderInitialMargin,2)
    availableBalance = _N(uAvailableBalance+bAvailableBalance,2)
    account = Account(totalWalletBalance, totalMarginBalance, totalPositionInitialMargin, totalOpenOrderInitialMargin, availableBalance)
    return account

#获取账户所有交易对
def GetPositionsDao():
    positions = [] 
    num2 = _G("num2")
    for i in _C(exchange.GetPosition):
        entryPrice = _N(float(i.Info.entryPrice),num2)
        leverage = i.Info.leverage 
        liquidationPrice = _N(float(i.Info.liquidationPrice),num2)
        marginType = i.Info.marginType 
        markPrice = _N(float(i.Info.markPrice),num2) 
        positionAmt = i.Info.positionAmt 
        symbol = i.Info.symbol 
        unRealizedProfit = _N(float(i.Info.unRealizedProfit),3)  
        positionSide = i.Info.positionSide 
        
        position = Position(entryPrice, leverage, liquidationPrice, marginType, markPrice,
                            positionAmt, symbol, unRealizedProfit, positionSide)
        positions.append(position)
    return positions

#获取tick级别的行情数据
def GetTickerDao(i):
    ticker = _C(exchanges[i].GetTicker)
    sell = ticker.Sell 
    buy = ticker.Buy 
    last = ticker.Last
    newTicker = Ticker(sell,buy,last)
    return newTicker

#创建订单
def CreateOrderDao(price,amount,flag):
    #price: 价格
    #amount: 合约数
    #flag: 0(买入开多仓);1(买入平空仓);2(卖出开空仓);3(卖出平多仓)
    num2 = _G("num2")
    price = _N(price,num2)
    id = 0
    if flag == 0:
        exchange.SetDirection("buy")
        id = exchange.Buy(price,amount)
    elif  flag == 1:
        exchange.SetDirection("closesell")
        id = exchange.Buy(price,amount)
    elif  flag == 2:
        exchange.SetDirection("sell")
        id = exchange.Sell(price,amount) 
    elif  flag == 3:
        exchange.SetDirection("closebuy")
        id = exchange.Sell(price,amount)
    return id

#市价平仓
def CreateOrderDao2(amount,flag,message):
    id = 0
    #flag: 0(买入开多仓);1(买入平空仓);2(卖出开空仓);3(卖出平多仓)
    if flag == 0:
        exchange.SetDirection("buy")
        id = exchange.Buy(-1,amount,message)
    elif  flag == 1:
        exchange.SetDirection("closesell")
        id = exchange.Buy(-1,amount,message)
    elif  flag == 2:
        exchange.SetDirection("sell")
        id = exchange.Sell(-1,amount,message)
    elif flag == 3:
        exchange.SetDirection("closebuy")
        id = exchange.Sell(-1,amount,message)
    return id 


#获取合约数位数
def GetNumByAmountDao():
    depth = _C(exchange.GetDepth)
    nums = []
    num2s = []
    for ask in depth["Asks"]:
        i = ask["Amount"]
        num = 0
        if str(i).count('.') == 1:
            num = len(str(i).split(".")[1])
        nums.append(num)
        
        j = ask["Price"]
        num2 = 0
        if str(j).count('.') == 1:
            num2 = len(str(j).split(".")[1])
        num2s.append(num2)
    num = max(nums)    
    _G("num",num)
    num2 = Counter(num2s).most_common(1)[0][0]
    _G("num2",num2)
    
    
    
#返回一个K线历史
def GetRecordsDao(period,i):
    if period == -1:
        return _C(exchanges[i].GetRecords)
    else:
        return _C(exchanges[i].GetRecords,period)

#设置币种
def SetCurrencyDao(symbol,i):
    exchanges[i].SetCurrency(symbol)

#划转资金
def SetTransferDao(amount, typeEnum, symbol):
    exchange.SetBase("https://api.binance.com")
    params = "amount=" + str(amount) + "&type=" + typeEnum + "&asset=" + symbol
    ret = exchange.IO("api", "POST", "/sapi/v1/asset/transfer", params)
    Log("资金划转：划转数量为{}".format(amount))
    exchange.SetBase("https://fapi.binance.com")
    return ret


#获取当前未完成的所有订单
def GetPendingOrdersDao():
    orders = []
    for order in _C(exchange.GetOrders):
        id = order.Id
        price = order.Price
        amount = order.Amount
        status = order.Status
        newOrder = Order(id, price, amount, status)
        orders.append(newOrder)
    return orders 

#根据订单ID获取订单详情
def GetOrderByIdDao(id):
    order = _C(exchange.GetOrder,id)
    id = order.Id
    price = order.Price
    amount = order.Amount
    status = order.Status
    newOrder = Order(id, price, amount, status)
    return newOrder    

#取消某个订单
def CancelOrderDao(id):
    if id == 0:
        return True
    flag = exchange.CancelOrder(id)
    if flag == True:
        return flag 
    else:
        order =_C(exchange.GetOrder,id)
        if order["Status"] == 0:
            flag = exchange.CancelOrder(id)
        else:
            flag = True
        return flag    

#取消所有未完成的订单
def AllCanelOrderDao():
    orders = GetPendingOrdersDao()
    for order in orders:
        _C(CancelOrderDao,order.id)

#定时器
def TimerDao(m,key):
    value = _G(key)
    if value is None:
        value = time.time()
        _G(key,value)
        return True
    now = time.time()
    dnow = datetime.datetime.fromtimestamp(now)
    dvalue = datetime.datetime.fromtimestamp(int(value))
    c = (dnow - dvalue).total_seconds()
    if c - m > 0:
        _G(key,now)
        return True
    return False    

#获取Period
def GetPeriodDao():
    return exchange.GetPeriod()

#获取Currency 
def GetCurrencyDao():
    return exchange.GetCurrency()

#获取标志 
def GetStopDao():
    i = IFLAGE
    return i

#设置标志1
def SetIFlageDao():
    global IFLAGE 
    IFLAGE = 1  

#定时器
def TimerDao(m,key):
    value = _G(key)
    if value is None:
        value = time.time()
        _G(key,value)
        return True
    now = time.time()
    dnow = datetime.datetime.fromtimestamp(now)
    dvalue = datetime.datetime.fromtimestamp(int(value))
    c = (dnow - dvalue).total_seconds()
    if c - m > 0:
        _G(key,now)
        return True
    return False        
#设置双向持仓
def SetDualDao():
    dual = _C(exchange.IO,"api", "GET", "/fapi/v1/positionSide/dual", "")
    if dual.dualSidePosition:
        Log("当前账户为双向持仓模式，不需要转换持仓模式")
    else:
        Log("当前账户为单向持仓模式，准备转双向持仓模式")
        _C(exchange.IO,"api", "POST", "/fapi/v1/positionSide/dual", "dualSidePosition=true")
        Log("已转为双向持仓模式")    

ext.GetAccountDao = GetAccountDao
ext.GetPositionsDao = GetPositionsDao
ext.GetTickerDao = GetTickerDao
ext.CreateOrderDao = CreateOrderDao
ext.CreateOrderDao2 = CreateOrderDao2
ext.GetNumByAmountDao = GetNumByAmountDao
ext.GetRecordsDao = GetRecordsDao
ext.SetTransferDao = SetTransferDao
ext.GetPendingOrdersDao = GetPendingOrdersDao
ext.GetOrderByIdDao = GetOrderByIdDao
ext.CancelOrderDao = CancelOrderDao
ext.TimerDao = TimerDao
ext.AllCanelOrderDao = AllCanelOrderDao
ext.GetPeriodDao = GetPeriodDao
ext.GetCurrencyDao = GetCurrencyDao
ext.GetStopDao = GetStopDao
ext.SetIFlageDao = SetIFlageDao
ext.TimerDao = TimerDao
ext.SetDualDao = SetDualDao
ext.SetCurrencyDao = SetCurrencyDao
```

> Detail

https://www.fmz.com/strategy/363411

> Last Modified

2022-06-10 22:41:54
