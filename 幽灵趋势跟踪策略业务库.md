
> Name

幽灵趋势跟踪策略业务库

> Author

陈皮





> Source (python)

``` python
#!/usr/bin/python
# -*- coding: utf-8 -*-
import time,datetime
import json
import math
import urllib.request
RECORDS = None
FLAGE = 0
#账户信息表格化，用于展示在状态信息上
def TableAccountService(account):
    
    clos = [] #表头
    clos.append("初始余额")
    clos.append("钱包余额")
    clos.append("保证金余额")
    clos.append("可用余额")
    clos.append("已用保证金")
    clos.append("当前杠杆")
    clos.append("总收益(收益率)")
    
    initialTotalMarginBalance = "$" + str(_G("initialTotalMarginBalance")) #初始余额
    totalWalletBalance = "$" + str(account.totalWalletBalance) #钱包余额
    totalMarginBalance = "$" + str(account.totalMarginBalance) #保证金余额
    availableBalance = "$" + str(account.availableBalance) #可用余额
    totalPositionInitialMargin = account.totalPositionInitialMargin#持仓保证金
    totalOpenOrderInitialMargin = account.totalOpenOrderInitialMargin#当前挂单保证金
    #_C(FilterHandlService)
    drawOut = _N(_G("drawOut"),2) #已划转资金
    if account.totalMarginBalance==0 :
        marginRate = "0"
        lever = 0
        Revenue = "$0"
    else :
        marginRate = (totalPositionInitialMargin+totalOpenOrderInitialMargin)/account.totalMarginBalance
        marginRate = "("+str(_N(marginRate,2)) + ")"#保证金率
        leverage = _G("leverage")#杠杆 
        lever = _N(totalPositionInitialMargin*leverage/account.totalMarginBalance,2)#当前杠杆
        drawIn = _G("drawIn")
        drawOut = _G("drawOut")
        totalRevenue = account.totalMarginBalance-_G("initialTotalMarginBalance") + drawOut - drawIn#总收益
        initialTotalMarginBalance = _G("initialTotalMarginBalance")
        totalYield = 0
        if initialTotalMarginBalance != 0:
            totalYield = totalRevenue/initialTotalMarginBalance
        totalYield = "(" + str(_N(totalYield,2)) + ")"#总收益率
        Revenue = "$" + str(_N(totalRevenue,2)) + totalYield
        #记录当前总收益
        _G("totalRevenue",totalRevenue)
    totalInitialMargin = "$" + str(_N(totalPositionInitialMargin+totalOpenOrderInitialMargin,2))#已用保证金
    
    rows = [] #表内容
    row =[]
    row.append(initialTotalMarginBalance)
    row.append(totalWalletBalance)
    row.append(totalMarginBalance)
    row.append(availableBalance)
    row.append(totalInitialMargin+marginRate)
    row.append(lever)
    row.append(Revenue)
    rows.append(row)
    
    table = {
        "type" : "table",
        "title" : "账户信息",
        "cols" : clos,
        "rows" : rows
    }
    
    
    return table
    
#交易对表格化，用于展示在状态信息上    
def TablePositionsService(positions):
    clos = [] #表头
    clos.append("币种")
    clos.append("方向")
    clos.append("数量")
    clos.append("开仓价格")
    clos.append("强平价格")
    clos.append("现价")
    clos.append("未实现盈亏")
    rows = [] #表内容
    for position in positions:
        row = []
        symbol = position.symbol
        leverage = position.leverage
        row.append(symbol + "[" + leverage + "X]")
        
        positionAmt = position.positionAmt
        if float(positionAmt)>0:
            row.append("做多")
        else:
            row.append("做空")
        row.append(math.fabs(float(positionAmt)))
        row.append(position.entryPrice)
        row.append(position.liquidationPrice)
        row.append(position.markPrice)
        row.append(position.unRealizedProfit)
        rows.append(row)  
    table = {
        "type" : "table",
        "title" : "交易对信息",
        "cols" : clos,
        "rows" : rows
    }
    return table 



#跟新状态信息
def UpdateLogStatusService():
    account = ext.GetAccountDao()
    positions = ext.GetPositionsDao()
    LogStatus("`" + json.dumps(TableAccountService(account)) + "`\n" +  "`" + json.dumps(TablePositionsService(positions)) +  "`")

            
#根据当前价格和下单价值换算成合约数            
def GetAmountByOrderValueService(price):
    ext.GetNumByAmountService()
    num = _G("num")
    orderValue = _G("orderValue")
    leverage = _G("leverage")
    account = ext.GetAccountDao()
    totalMarginBalance = account.totalMarginBalance
    orderValue = orderValue*totalMarginBalance*leverage*0.99/100
    amount = orderValue/price
    if orderValue < 5:
        amount = 5/price + 1
    amount = _N(amount,num)
    if price*amount > orderValue:
        amount = orderValue*0.99/price
        amount = _N(amount,num)
    exchange.SetMarginLevel(leverage)
    return amount   

#平仓
def ClearanceService():
    positions = ext.GetPositionsDao()
    for position in positions:
        positionAmt = position.positionAmt
        amt = math.fabs(float(positionAmt))
        totalRevenue = _G("totalRevenue")
        ticker = ext.GetTickerDao(0)
        price = ticker.last
        symbol = position.symbol
        symbol = symbol.replace("USDT","_USDT")
        if float(positionAmt)>0:
            #持多仓，--卖出平仓
            ext.CreateOrderDao2(amt,3,"{}币种平多单的当前成交价格：{}".format(symbol,price))
            LogProfit(_N(totalRevenue,2))
        else:
            #持空仓，--买入平仓
            ext.CreateOrderDao2(amt,1,"{}币种平空单的当前成交价格：{}".format(symbol,price))
            LogProfit(_N(totalRevenue,2))
            
#获取合约数位数
def GetNumByAmountService():
    ext.GetNumByAmountDao()            

#计算出交易对最小下单量
def GetMinOrderCountService():
    minCount = 1
    num = _G("num")
    if num != 0:
        minCount = 1/(10**num)
    return minCount
 
#获取标志 
def GetStopService():
    return ext.GetStopDao()

#获取交易对信息    
def GetPositionsService():
    return ext.GetPositionsDao()

#获取tick价格
def GetPriceService(i):
    ticker = ext.GetTickerDao(i)
    price = ticker.last
    return price 

#选出涨跌幅最大的币种
def GetSymbolService():
    global RECORDS 
    #第一次获取所有币种的record数据，缓存起来 
    R = _G("RECORDS")
    r = RECORDS
    if r is None:
        if R is None:
            SetSymbolsRecordsService()
        else:
            RECORDS = R
        return
    #定期获取其中一个币种的最新record数据，和缓存数据比较，如果一样则，将数据更新标识记录为0并跳过
    #如果不同，则更新缓存中所有币种的record数据,并将数据更新标识记录为1
    isUpdate = UpdateRecordService()
    if isUpdate:
        return 
    #计算所有币种涨跌幅的绝对值，选出数值最大的币种
    #根据选出来的币种的最新价格和bfCount的k线开盘价对比，判断出下单方向并记录起来
    GetMaxSymbolService()
    _G("RECORDS",RECORDS)

#下单信号
def FirstSignalService():
    global FLAGE
    symbolRecord = _G("symbolRecord")
    #检测是否已经筛选出币种，如果没有则跳出 
    if symbolRecord is None:
        return
    #检测数据更新标识是否为1，如果不是则跳出 
    isUpdate = _G("isUpdate")
    if isUpdate == 0:
        return
    symbol = symbolRecord["symbol"] 
    #检测当前是否有持仓 
    positions = ext.GetPositionsDao()
    if len(positions) == 0:
        #如果没有则用筛选出的币种进行下单
        ext.SetCurrencyDao(symbol,0)
        leverage = _G("leverage")
        exchange.SetMarginLevel(leverage)
        side = symbolRecord["side"]  
        if side == 1:#做多 
            price = symbolRecord["close"]
            amount = GetAmountByOrderValueService(price)
            ext.CreateOrderDao2(amount,0,"{}币种下多单的当前成交价格：{}".format(symbol,price))
            _G("initPrice",price)
            _G("initSide",side)
        else:#做空
            price = symbolRecord["close"]                      
            amount = GetAmountByOrderValueService(price)
            ext.CreateOrderDao2(amount,2,"{}币种下空单的当前成交价格：{}".format(symbol,price))
            _G("initPrice",price)
            _G("initSide",side)
    elif len(positions) == 1:
        position = positions[0]
        positionAmt = float(position.positionAmt)
        nSymbol = position.symbol
        nSymbol = nSymbol.replace("USDT","_USDT")
        #判断筛选出来的币种和当前下单的币种是否一样
        if symbol == nSymbol:
            #判断当前币种是否有浮亏，如果有则清仓，并反向下单
            isFlag = _G("isFlag")
            if isFlag == 0:#使用反转信号,如果isFlag=0则不使用反转信号，则不处理当前的持仓
                firstPrice = _G("initPrice")
                side = _G("initSide")
                price = symbolRecord["close"]
                if side == 1 and price <= firstPrice:#换币后首次下单方向是多，但是当前价格低于首次下单价格（浮亏），所以需要反转下单
                    Log("换币后当前持仓方向是多，但是当前价格{}低于等于首次下单价格{}（浮亏），所以需要反转下单".format(price,firstPrice))
                    ClearanceService()
                    amount = GetAmountByOrderValueService(price)
                    if positionAmt > 0:#持有多单则清多单再下空单
                        ext.CreateOrderDao2(amount,2,"{}币种下空单的当前成交价格：{}".format(symbol,price))
                    else:
                        ext.CreateOrderDao2(amount,0,"{}币种下多单的当前成交价格：{}".format(symbol,price))
                    _G("initSide",0)
                    FLAGE = 0
                elif side == 0 and price >= firstPrice:#换币后首次下单方向是空，但是当前价格高于首次下单价格（浮亏），所以需要反转下单
                    Log("换币后当前持仓方向是空，但是当前价格{}高于等于首次下单价格{}（浮亏），所以需要反转下单".format(price,firstPrice))
                    #清空仓，再下多单
                    ClearanceService()
                    amount = GetAmountByOrderValueService(price)
                    if positionAmt < 0:
                        ext.CreateOrderDao2(amount,0,"{}币种下多单的当前成交价格：{}".format(symbol,price))
                    else:
                        ext.CreateOrderDao2(amount,2,"{}币种下空单的当前成交价格：{}".format(symbol,price))
                    _G("initSide",1)
                    FLAGE = 0
                else:
                    Log("当前价格{}，首次下单价格{}，不需要反转下单".format(price,firstPrice))
            else:
                Log("策略参数已屏蔽反转信号功能")
        else:
            #将当前持仓清仓，并更换为筛选出的币种进行下单
            ClearanceService()
            ext.SetCurrencyDao(symbol,0)
            side = symbolRecord["side"]  
            if side == 1:#做多 
                ticker = ext.GetTickerDao(0)
                price = ticker.last                          
                amount = GetAmountByOrderValueService(price)
                ext.CreateOrderDao2(amount,0,"{}币种下多单的当前成交价格：{}".format(symbol,price))
                _G("initPrice",price)
                _G("initSide",side)
                FLAGE = 0
            else:#做空
                ticker = ext.GetTickerDao(0)
                price = ticker.last                          
                amount = GetAmountByOrderValueService(price)
                ext.CreateOrderDao2(amount,2,"{}币种下空单的当前成交价格：{}".format(symbol,price))
                _G("initPrice",price)
                _G("initSide",side)
                FLAGE = 0
        
    
    
#缓存record
def SetSymbolsRecordsService():
    global RECORDS 
    symbols = _G("symbols")
    recordss = {}
    for symbol in symbols:
        #Log("symbol:",symbol)
        ext.SetCurrencyDao(symbol,1)
        if RECORDS is None:
            records =  ext.GetRecordsDao(-1,1)
            recordss[symbol] = records
        else:
            oldRecords = RECORDS[symbol]
            _CDelay(250)
            records = _C(CheckRecordService,oldRecords)
            recordss[symbol] = records
    RECORDS = recordss

#检查记录record数据是否更新
def CheckRecordService(oldRecords):
    oldTime = oldRecords[-1]["Time"]
    records = ext.GetRecordsDao(-1,1)
    newTime = records[-1]["Time"]
    if oldTime == newTime:
        #Sleep(100)
        return False
    else:
        return records

#更新所有symbol的record    
def UpdateRecordService():
    global RECORDS 
    symbols = _G("symbols")
    symbol = symbols[0]
    ext.SetCurrencyDao(symbol,1)
    newRecords = ext.GetRecordsDao(-1,1)
    newTime = newRecords[-1]["Time"]
    oldRecords = RECORDS[symbol]
    oldTime = oldRecords[-1]["Time"]
    if newTime == oldTime:
        _G("isUpdate",0)
        return True
    else:
        Sleep(500)
        SetSymbolsRecordsService()
        _G("isUpdate",1)
        Log("行情数据已更新")
        return False

#计算涨跌幅最大的币种
def GetMaxSymbolService():
    symbols = _G("symbols")
    bfCount = _G("bfCount") + 1
    chgs = []
    symbolList = []
    tests = []
    tests2 = []
    for symbol in symbols:
        records = RECORDS[symbol]
        record = records[-1]
        close = record["Open"]
        bfRecord = []
        if len(records) < bfCount:
            bfRecord = records[-len(records)]
            Log("{}数据过少{}".format(symbol,len(records)))
        else:
            bfRecord = records[-bfCount]
        bfOpen = bfRecord["Open"]
        chg = 0
        if close >= bfOpen:
            chg = (close - bfOpen)/bfOpen 
        else:
            chg = (bfOpen - close)/bfOpen
        chgs.append(chg)
        symbolList.append(symbol)
        tests.append([symbol,chg])
        tests2.append([symbol,bfOpen,close])
    Log(tests)
    Log(tests2)
    maxChg = max(chgs)
    maxSymbol = symbolList[chgs.index(maxChg)]
    maxRecords = RECORDS[maxSymbol]
    maxRecord = maxRecords[-1]
    maxClose = maxRecord["Open"]
    maxBfRecord = maxRecords[-bfCount]
    maxBfOpen = maxBfRecord["Open"] 
    maxSide = GetSideService(maxSymbol,maxClose,maxBfOpen)
    symbolRecord = {}
    symbolRecord["symbol"] = maxSymbol 
    symbolRecord["initPrice"] = maxBfOpen 
    #symbolRecord["firstPrice"] = price 
    symbolRecord["close"] = maxClose 
    symbolRecord["side"] = maxSide 
    symbolRecord["chg"] = maxChg
    _G("symbolRecord",symbolRecord)
    Log("新symbolRecord:",symbolRecord)
    #Log("最大涨跌幅的币种是：{}，涨跌幅为：{}".format(maxSymbol,maxChg))

#计算下单方向    
def GetSideService(maxSymbol,maxClose,maxBfOpen):
    symbol = ext.GetCurrencyDao()
    records = RECORDS[symbol]
    price = records[-1]["Open"]
    #检测当前是否有持仓 
    positions = ext.GetPositionsDao()
    if len(positions) == 0:#没有持仓，则不使用继承模块 
        Log("首次下单，不使用继承模块")
        _G("oldClose",maxClose)
        _G("oldBfOpen",maxBfOpen)
        if maxClose > maxBfOpen:
            return 1 #做多方向
        else:
            return 0 #做空方向
    else:
        position = positions[0]
        nSymbol = position.symbol
        nSymbol = nSymbol.replace("USDT","_USDT")
        initPrice = _G("initPrice")
        if nSymbol == maxSymbol:#相同币种不需要换币
            Log("筛选出来的币种和当前持仓的币种一样,不需要更换币种")
            if price >= initPrice:
                return 1 #做多方向
            else:
                return 0 #做空方向
        #使用继承模块
        Log("筛选出来的币种和当前持仓的币种不一样,需要更换币种，{}币种更换为{}币种".format(nSymbol,maxSymbol))
        oldClose = _G("oldClose")
        oldBfOpen =_G("oldBfOpen")
        if (maxClose >= maxBfOpen and oldClose > oldBfOpen) or (maxClose <= maxBfOpen and oldClose < oldBfOpen):#继承上一个币的下单方向 
            _G("oldClose",maxClose)
            _G("oldBfOpen",maxBfOpen)
            Log("{}币种继承{}币种的下单方向".format(maxSymbol,nSymbol))
            position =  positions[0]
            positionAmt = float(position.positionAmt)
            if positionAmt < 0:
                return 0
            else:
                return 1
        else:#不用使用继承
            Log("不使用继承模块")
            _G("oldClose",maxClose)
            _G("oldBfOpen",maxBfOpen)
            if maxClose >= maxBfOpen:
                return 1 #做多方向
            else:
                return 0 #做空方向 
#清仓
def ClearAllService():
    symbols = _G("symbols")
    for symbol in symbols:
        ext.SetCurrencyDao(symbol,0)
        positions = ext.GetPositionsDao()
        if len(positions) != 0:
            Log("清理已有仓位")
            ClearanceService()
    
        
#策略交互
def GetCommandService():
    cmd = GetCommand()
    if cmd: 
        arr = cmd.split(":")
        if arr[0] == "一键清仓": #清空所有交易对持仓
            ClearanceService()
            Log("全部清仓")
        elif arr[0] == "现货==》合约": #从现货账户划转USDT到合约账户
            accountFunds = float(arr[1])
            ret = ext.SetTransferDao(accountFunds,"MAIN_UMFUTURE","USDT")
            if ret is None:
                Log("现货==》合约,划转资金出错")  
        elif arr[0] == "合约==》现货": #从合约账户划转USDT到现货账户
            accountFunds = float(arr[1])
            ret = ext.SetTransferDao(accountFunds,"UMFUTURE_MAIN","USDT")
            if ret is None:
                Log("合约==》现货,划转资金出错")
            drawOut = _G("drawOut")
            _G("drawOut",accountFunds + drawOut)

#减仓信号
def StopSurplusService():
    global FLAGE
    if FLAGE == 1:
        return 
    positions = ext.GetPositionsDao() 
    if len(positions) == 0:
        return 
    position = positions[0]
    positionAmt = float(position.positionAmt)
    entryPrice = float(position.entryPrice)
    ticker = ext.GetTickerDao(0)
    price = ticker.last
    stopSurplus = _G("stopSurplus")/100
    stopSurplusCount = _G("stopSurplusCount")
    stopSurplusCount = float(stopSurplusCount)/100
    if positionAmt > 0:
        if (price - entryPrice)/entryPrice < stopSurplus:
            return 
        positionAmt = stopSurplusCount*positionAmt
        num = _G("num")
        positionAmt = _N(positionAmt,num)
        Log("减多仓")
        ext.CreateOrderDao2(positionAmt,3,"当前成交价格：{}".format(price))
        totalRevenue = _G("totalRevenue")
        LogProfit(_N(totalRevenue,2))
        FLAGE = 1
    else:
        if (entryPrice - price)/entryPrice  < stopSurplus:
            return 
        positionAmt = -positionAmt 
        positionAmt = stopSurplusCount*positionAmt
        num = _G("num")
        positionAmt = _N(positionAmt,num)
        Log("减空仓")
        ext.CreateOrderDao2(positionAmt,1,"当前成交价格：{}".format(price))
        totalRevenue = _G("totalRevenue")
        LogProfit(_N(totalRevenue,2))
        FLAGE = 1
    
#设置双向持仓           
def SetDualService():
    ext.SetDualDao()
            
ext.TableAccountService = TableAccountService
ext.TablePositionsService = TablePositionsService
ext.UpdateLogStatusService = UpdateLogStatusService
ext.ClearanceService = ClearanceService
ext.GetNumByAmountService = GetNumByAmountService
ext.GetAmountByOrderValueService = GetAmountByOrderValueService
ext.GetStopService = GetStopService
ext.GetPositionsService = GetPositionsService
ext.GetPriceService = GetPriceService 
ext.GetSymbolService = GetSymbolService
ext.FirstSignalService = FirstSignalService
ext.GetCommandService = GetCommandService
ext.SetDualService = SetDualService
ext.GetSymbolService = GetSymbolService
ext.ClearAllService = ClearAllService
ext.StopSurplusService = StopSurplusService
```

> Detail

https://www.fmz.com/strategy/363410

> Last Modified

2022-10-01 01:50:24
