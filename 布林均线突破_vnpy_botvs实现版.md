
> 策略名称

布林均线突破_vnpy_botvs实现版

> 策略作者

ipqhjjybj

> 策略描述

这是将 botvs的接口用 Vnpy 的写法 方式简单封装掉，便于后期的调用！
           这本来是期货的 策略， 直接改参数套在 比特币上。
           期货上要切换到分钟级别， 比特币期货则用小时级别的
           实盘时需要调整参数。
           如有策略改进，请多多与本人交流   250657661

           bar.minute.hour  代表是小时级别 
           bar.minute.minute  代表是分钟级别

> 策略参数



|参数|默认值|描述|
|----|----|----|
|ContractTypeIdx|0|期货类型: 当周|次周|季度|
|MarginLevelIdx|0|杠杠大小: 10|20|
|LoopInterval|true|轮询间隔(秒)|
|minute_use|12|分钟级别|


> 源码 (python)

``` python
'''
策略名称: BollingBreaker趋势策略
策略作者: ipqhjjybj
策略描述:  
           这是将 botvs的接口用 Vnpy 的写法 方式简单封装掉，便于后期的调用！
           这本来是期货的 策略， 直接改参数套在 比特币上。
           期货上要切换到分钟级别， 比特币期货则用小时级别的
           实盘时需要调整参数。
           如有策略改进，请多多与本人交流   250657661

           bar.minute.hour  代表是小时级别 
           bar.minute.minute  代表是分钟级别

           
------------------------------------------------------------------

          当前只支持 比特币OKCOIN 期货， 如果要弄到 CTP期货，需要微调

趋势跟踪策略
'''
import time
from datetime import datetime
import numpy as np
import talib

EMPTY_STRING = ""
EMPTY_INT = 0
EMPTY_FLOAT = 0.0
EMPTY_UNICODE = u''

DIRECTION_LONG = u'long'
DIRECTION_SHORT = u'short'

OFFSET_OPEN = u'kaicang'
OFFSET_CLOSE = u'pingcang'

# CTA引擎中涉及到的交易方向类型
CTAORDER_BUY = "buy"
CTAORDER_SELL = "closebuy"
CTAORDER_SHORT = "sell"
CTAORDER_COVER = "closesell"


# 本地停止单状态
STOPORDER_WAITING = u'waiting'
STOPORDER_CANCELLED = u'canceled'
STOPORDER_TRIGGERED = u'touched'

# 本地停止单前缀
STOPORDERPREFIX = 'CtaStopOrder'



########################################################################
class VtBarData:
    """K线数据"""

    #----------------------------------------------------------------------
    def __init__(self):
        """Constructor"""
        
        self.vtSymbol = EMPTY_STRING        # vt系统代码
        self.symbol = EMPTY_STRING          # 代码
        self.exchange = EMPTY_STRING        # 交易所
    
        self.open = EMPTY_FLOAT             # OHLC
        self.high = EMPTY_FLOAT
        self.low = EMPTY_FLOAT
        self.close = EMPTY_FLOAT
        
        self.date = EMPTY_STRING            # bar开始的时间，日期
        self.time = EMPTY_STRING            # 时间
        self.datetime = None                # python的datetime时间对象
        
        self.volume = EMPTY_INT             # 成交量
        self.openInterest = EMPTY_INT       # 持仓量    

########################################################################
class VtTickData:
    """Tick行情数据类"""

    #----------------------------------------------------------------------
    def __init__(self):
        """Constructor"""
        
        # 代码相关
        self.exchange = EMPTY_STRING            # 交易所代码
        self.vtSymbol = EMPTY_STRING            # 合约在vt系统中的唯一代码，通常是 合约代码.交易所代码
        
        # 成交数据
        self.lastPrice = EMPTY_FLOAT            # 最新成交价
        self.lastVolume = EMPTY_INT             # 最新成交量
        self.volume = EMPTY_INT                 # 今天总成交量
        self.openInterest = EMPTY_INT           # 持仓量
        self.time = EMPTY_STRING                # 时间 11:20:56.5
        self.date = EMPTY_STRING                # 日期 20151009
        self.datetime = None                    # python的datetime时间对象
        
        # 常规行情
        self.openPrice = EMPTY_FLOAT            # 今日开盘价
        self.highPrice = EMPTY_FLOAT            # 今日最高价
        self.lowPrice = EMPTY_FLOAT             # 今日最低价
        self.preClosePrice = EMPTY_FLOAT
        
        self.upperLimit = EMPTY_FLOAT           # 涨停价
        self.lowerLimit = EMPTY_FLOAT           # 跌停价
        
        # 五档行情
        self.bidPrice1 = EMPTY_FLOAT
        self.bidPrice2 = EMPTY_FLOAT
        self.bidPrice3 = EMPTY_FLOAT
        self.bidPrice4 = EMPTY_FLOAT
        self.bidPrice5 = EMPTY_FLOAT
        
        self.askPrice1 = EMPTY_FLOAT
        self.askPrice2 = EMPTY_FLOAT
        self.askPrice3 = EMPTY_FLOAT
        self.askPrice4 = EMPTY_FLOAT
        self.askPrice5 = EMPTY_FLOAT        
        
        self.bidVolume1 = EMPTY_INT
        self.bidVolume2 = EMPTY_INT
        self.bidVolume3 = EMPTY_INT
        self.bidVolume4 = EMPTY_INT
        self.bidVolume5 = EMPTY_INT
        
        self.askVolume1 = EMPTY_INT
        self.askVolume2 = EMPTY_INT
        self.askVolume3 = EMPTY_INT
        self.askVolume4 = EMPTY_INT
        self.askVolume5 = EMPTY_INT         


########################################################################
class StopOrder(object):
    """本地停止单"""

    #----------------------------------------------------------------------
    def __init__(self):
        """Constructor"""
        self.vtSymbol = EMPTY_STRING
        self.orderType = EMPTY_UNICODE
        self.direction = EMPTY_UNICODE
        self.offset = EMPTY_UNICODE
        self.price = EMPTY_FLOAT
        self.volume = EMPTY_INT
        
        self.strategy = None             # 下停止单的策略对象
        self.stopOrderID = EMPTY_STRING  # 停止单的本地编号 
        self.status = EMPTY_STRING       # 停止单状态


class BollingerBreakerStrategy:
    #品种属性
    vtSymbol = EMPTY_STRING # 是什么品种

    # 策略参数
    minute_use = 6              # 多少分钟级别的K线

    bar = None                  # 1分钟K线对象
    fiveBar = None              # 1分钟K线对象

    # 策略参数
    bollLength = 20         # 通道窗口数
    topDev = 1.3            # 开仓偏差
    trailingPrcnt = 2       # 移动止损百分比
    use_range = 10          # use_range天内有突破最高价
    N = 10                  # 多少天突破

    bufferSize = 40                     # 需要缓存的数据的大小
    bufferCount = 0                     # 目前已经缓存了的数据的计数


    realBuyCond = 0                     # 买卖的状态
    realSellCond = 0                    # 买卖的状态
    
    bollMid = 0                         # 布林带中轨
    bollStd = 0                         # 布林带宽度
    entryUp = 0                         # 开仓上轨

    barMinute = EMPTY_STRING            # K线当前的分钟

    fixedSize = 1

    stopOrderCount = 0                  # 记录停止单的数量

    pos = 0                             # 仓位

    LastBarTime = None                  # python 上一根Tick

    currency = EMPTY_STRING

    def __init__(self, _exchange , setting ):
        self.exchange = _exchange
        for key in setting.keys():
            if key == "vtSymbol":
                self.vtSymbol = setting[key]
            if key == "currency":
                self.currency = setting[key]
            if key == 'minute_use':
                self.minute_use = setting[key]
            if key == "bollLength":
                self.bollLength = setting[key]
            if key == "topDev":
                self.topDev = setting[key]
            if key == "trailingPrcnt":
                self.trailingPrcnt = setting[key]
            if key == "use_range":
                self.use_range = setting[key]
            if key == "N":
                self.N = setting[key]
        Log(setting)

        self.pos = 0
        self.order_PreUse = {}            # vtPreID , pushDealAmount  已经推送过的成交数据
        self.workingStopOrderDict = {}
        self.stopOrderDict = {}
        self.orderList = []               # 保存委托代码的列表
        self.fixedSize = 1
        ##################
        self.bufferSize = 40
        #################
        self.highArray = np.zeros(self.bufferSize) 
        self.lowArray = np.zeros(self.bufferSize)
        self.closeArray = np.zeros(self.bufferSize)
        
        self.buyValue = np.zeros(self.bufferSize)


    def onCall(self):
        try:
            #self.exchange.IO("currency" , self.currency)
            need_remove = []
            for orderId in self.orderList:
                # 订单状态, 参考常量里的订单状态，以下是此键值的常量。
                # ORDER_STATE_PENDING  :未完成
                # ORDER_STATE_CLOSED   :已关闭   已完成
                # ORDER_STATE_CANCELED :已取消
                # STOPORDERPREFIX 是否是 系统内部的 停止单
                if orderId != None and type(orderId) != type(1) and STOPORDERPREFIX in orderId:
                    continue
                botvsOrder = self.exchange.GetOrder(orderId)
                preAmount = 0.0
                if botvsOrder != None:
                    if botvsOrder["Status"] in [ORDER_STATE_CLOSED,ORDER_STATE_CANCELED]:
                        try:
                            preAmount = self.order_PreUse[orderId]
                        except Exception,ex:
                            Log("Error in preAmount",ex)
                            preAmount = 0.0
                        Log("preAmount:" , preAmount)
                        incAmount = botvsOrder["DealAmount"] - preAmount
                        if incAmount > 0:
                            self.order_PreUse[orderId] = botvsOrder["DealAmount"]
                            botvsOrder["preAmount"] = preAmount
                            botvsOrder["incAmount"] = incAmount
                            self.onTrade( botvsOrder )


                    if botvsOrder["Status"] == ORDER_STATE_CLOSED:
                        need_remove.append(orderId)
                else:
                    Log("None order!")

            for orderId in need_remove:
                Log("remove order:" , orderId)
                self.orderList.remove(orderId)

            
            # Log("currency",self.currency)
            botvsTick = self.exchange.GetTicker()


            if self.LastBarTime != botvsTick["Time"]:
                newTick = VtTickData()
                newTick.datetime = datetime.fromtimestamp(botvsTick["Time"] / 1000.0)
                newTick.vtSymbol = self.vtSymbol
                newTick.lastPrice = float(botvsTick["Last"])
                newTick.lastVolume = float(botvsTick["Volume"])
                newTick.volume = float(botvsTick["Volume"])
                newTick.highPrice = float(botvsTick["High"])
                newTick.lowPrice = float(botvsTick["Low"])

                newTick.upperLimit = newTick.highPrice * 1.03
                newTick.lowerLimit = newTick.lowPrice * 0.97

                newTick.exchange = self.exchange.GetName()

                newTick.date = newTick.datetime.strftime("%Y%m%d")
                newTick.time = newTick.datetime.strftime("%Y:%m:%d")

                self.onTick(newTick)

                self.processStopOrder(newTick)
        except Exception,ex:
            Log(ex , "error in onCall , maybe getTicker wrong!")

    #----------------------------------------------------------------------
    def onTrade(self, trade):
        # 发出状态更新事件
        #'Type': 0           # 订单类型, 参考常量里的订单类型，以下是此键值的常量。
                             # ORDER_TYPE_BUY   :买单
                             # ORDER_TYPE_SELL  :卖单
        try:
            Log("trade:",trade)
            newPos = 0.0
            if trade["Type"] == ORDER_TYPE_BUY:
                newPos += trade["incAmount"]
            elif trade["Type"] == ORDER_TYPE_SELL:
                newPos -= trade["incAmount"]
            else:
                Log("What ? trade Type error!")
            self.pos += newPos
        except Exception,ex:
            print ex
    #----------------------------------------------------------------------
    def processStopOrder(self, tick):
        """收到行情后处理本地停止单（检查是否要立即发出）"""
        vtSymbol = tick.vtSymbol
        
        # 遍历等待中的停止单，检查是否会被触发
        for so in self.workingStopOrderDict.values():
            if so.vtSymbol == vtSymbol:
                longTriggered = so.direction==DIRECTION_LONG and tick.lastPrice>=so.price        # 多头停止单被触发
                shortTriggered = so.direction==DIRECTION_SHORT and tick.lastPrice<=so.price     # 空头停止单被触发
                
                if longTriggered or shortTriggered:
                    # 买入和卖出分别以涨停跌停价发单（模拟市价单）
                    if so.direction==DIRECTION_LONG:
                        price = tick.upperLimit
                    else:
                        price = tick.lowerLimit
                    
                    so.status = STOPORDER_TRIGGERED
                    orderIDList = self.sendOrder(so.vtSymbol, so.orderType, price, so.volume, False ,so.strategy)
                    for orderID in orderIDList:
                        self.orderList.append(orderID)
                    del self.workingStopOrderDict[so.stopOrderID]
                    so.strategy.onStopOrder(so)

    def onStopOrder(self, vtStopOrder):
        Log("stopOrder Deal ID:", vtStopOrder.stopOrderID , vtStopOrder.status )

    def sendStopOrder(self, vtSymbol, orderType, price, volume, strategy ):
        """发停止单（本地实现）"""
        self.stopOrderCount += 1
        stopOrderID = STOPORDERPREFIX + str(self.vtSymbol) + str(self.stopOrderCount)

        so = StopOrder()
        so.vtSymbol = vtSymbol
        so.orderType = orderType
        so.price = price
        so.volume = volume
        so.strategy = strategy
        so.stopOrderID = stopOrderID
        so.status = STOPORDER_WAITING

        if orderType == CTAORDER_BUY:
            so.direction = DIRECTION_LONG
            so.offset = OFFSET_OPEN
        elif orderType == CTAORDER_SELL:
            so.direction = DIRECTION_SHORT
            so.offset = OFFSET_CLOSE
        elif orderType == CTAORDER_SHORT:
            so.direction = DIRECTION_SHORT
            so.offset = OFFSET_OPEN
        elif orderType == CTAORDER_COVER:
            so.direction = DIRECTION_LONG
            so.offset = OFFSET_CLOSE      

        # 保存stopOrder对象到字典中
        self.stopOrderDict[stopOrderID] = so
        self.workingStopOrderDict[stopOrderID] = so
        
        # 推送停止单状态
        strategy.onStopOrder(so)
        return stopOrderID

    def sendOrder(self , vtSymbol , orderType , price, volume , stop , strategy ):
        #   id1 = exchange.Buy(4300,1)     # 日期                  平台    类型  价格     数量   信息
        #                                  # 2016-10-21 00:00:00  OKCoin  买入  4300     1
        #   id2 = exchange.Buy(-1, 8000)   # 市价单 的第二个参数的意义是  购买8000金额的 币数。
        #   id1 = exchange.Sell(4300,1)    #     日期                     平台        类型      价格      数量     信息
        #                                  #     2016-10-21 00:00:00     OKCoin      卖出      市价单     1    
        # id2 = exchange.Sell(-1, 1)       #     日期                     平台        类型      价格      数量     信息
                                           #     2016-10-21 00:00:00     OKCoin      卖出      4300      1
                                           # 一般错误提示： 小于允许的最小交易单位，大部分是这个原因（参数1是1块钱而不是1个币）。
        if stop == True:
            vtOrderID = self.sendStopOrder(self.vtSymbol, orderType, price, volume, self)
            return vtOrderID
        else:
            ret_order_list = []
            self.exchange.SetDirection( orderType )
            if orderType in [ CTAORDER_BUY , CTAORDER_COVER]:
                ret_order_list.append( self.exchange.Buy( price , volume ))
            elif orderType in [CTAORDER_SELL , CTAORDER_SHORT]:
                ret_order_list.append( self.exchange.Sell( price , volume ))
            return ret_order_list

    def buy(self , price , volume , stop = False):
        Log(CTAORDER_BUY,price,volume)
        return self.sendOrder( self.vtSymbol , CTAORDER_BUY , price , volume , stop , self)
    def sell(self , price , volume , stop = False):
        Log(CTAORDER_SELL,price,volume)
        return self.sendOrder( self.vtSymbol , CTAORDER_SELL , price , volume , stop , self)
    def short(self , price , volume , stop = False):
        Log(CTAORDER_SELL,price,volume)
        return self.sendOrder( self.vtSymbol , CTAORDER_SHORT , price , volume , stop , self)
    def cover(self , price , volume , stop = False):
        Log("cover",price,volume)
        return self.sendOrder( self.vtSymbol , CTAORDER_COVER , price , volume , stop , self)

    #----------------------------------------------------------------------
    def cancelStopOrder(self, stopOrderID):
        """撤销停止单"""
        # 检查停止单是否存在
        if stopOrderID in self.workingStopOrderDict:
            so = self.workingStopOrderDict[stopOrderID]
            so.status = STOPORDER_CANCELLED
            del self.workingStopOrderDict[stopOrderID]
            so.strategy.onStopOrder(so)

        if stopOrderID in self.orderList:
            self.orderList.remove(stopOrderID)

    def cancelOrder(self , vtOrderId):
        Log("cancelOrder:",vtOrderId)
        if STOPORDERPREFIX in vtOrderId:
            self.cancelStopOrder(vtOrderId)
        else:
            self.exchange.CancelOrder(vtOrderId)

    def onTick(self, tick):

        # self.orderList = []
        # orderIDList = self.buy(tick.lastPrice , abs(self.fixedSize))
        # #Log( str(self.vtSymbol) + " cover 0 1 " + str(self.fixedSize) +" " +str(','.join(orderIDList))  + "\n")
        # #print str(self.vtSymbol) , "cover 0 1" , self.fixedSize , orderID
        # for orderID in orderIDList:
        #     self.orderList.append(orderID)

        # 聚合为1分钟K线
        tickMinute = tick.datetime.hour

        if tickMinute != self.barMinute:  
            if self.bar:
                self.onBar(self.bar)

            bar = VtBarData()              
            bar.vtSymbol = tick.vtSymbol
            bar.exchange = tick.exchange

            bar.open = tick.lastPrice
            bar.high = tick.lastPrice
            bar.low = tick.lastPrice
            bar.close = tick.lastPrice

            bar.date = tick.date
            bar.time = tick.time
            bar.datetime = tick.datetime    # K线的时间设为第一个Tick的时间

            self.bar = bar                  # 这种写法为了减少一层访问，加快速度
            self.barMinute = tickMinute     # 更新当前的分钟
        else:                               # 否则继续累加新的K线
            bar = self.bar                  # 写法同样为了加快速度

            bar.high = max(bar.high, tick.lastPrice)
            bar.low = min(bar.low, tick.lastPrice)
            bar.close = tick.lastPrice

    def onBar(self , bar):
        
        if bar.datetime.hour  % self.minute_use == 0:         # bar.datetime.minute 则切换成分钟级别
            # 如果已经有聚合5分钟K线
            if self.fiveBar:
                # 将最新分钟的数据更新到目前5分钟线中
                fiveBar = self.fiveBar
                fiveBar.high = max(fiveBar.high, bar.high)
                fiveBar.low = min(fiveBar.low, bar.low)
                fiveBar.close = bar.close
                
                # 推送5分钟线数据
                self.onFiveBar(fiveBar)
                
                # 清空5分钟线数据缓存
                self.fiveBar = None
        else:
            # 如果没有缓存则新建
            if not self.fiveBar:
                fiveBar = VtBarData()
                
                fiveBar.vtSymbol = bar.vtSymbol
                fiveBar.symbol = bar.symbol
                fiveBar.exchange = bar.exchange
            
                fiveBar.open = bar.open
                fiveBar.high = bar.high
                fiveBar.low = bar.low
                fiveBar.close = bar.close
            
                fiveBar.date = bar.date
                fiveBar.time = bar.time
                fiveBar.datetime = bar.datetime 
                
                self.fiveBar = fiveBar
            else:
                fiveBar = self.fiveBar
                fiveBar.high = max(fiveBar.high, bar.high)
                fiveBar.low = min(fiveBar.low, bar.low)
                fiveBar.close = bar.close


    def onFiveBar(self , bar):
        #Log( self.currency , bar.close , self.pos , self.orderList)

        for orderID in self.orderList:
            self.cancelOrder(orderID)
        self.orderList = []
    
        # 保存K线数据
        self.closeArray[0:self.bufferSize-1] = self.closeArray[1:self.bufferSize]
        self.highArray[0:self.bufferSize-1] = self.highArray[1:self.bufferSize]
        self.lowArray[0:self.bufferSize-1] = self.lowArray[1:self.bufferSize]
        self.buyValue[0:self.bufferSize-1] = self.buyValue[1:self.bufferSize]

        self.closeArray[-1] = bar.close
        self.highArray[-1] = bar.high
        self.lowArray[-1] = bar.low
    
        # 计算指标数值
        self.bollMid = talib.MA(self.closeArray, self.bollLength)[-1]
        self.bollStd = talib.STDDEV(self.closeArray, self.bollLength)[-1]
        self.entryUp = self.bollMid + self.bollStd * self.topDev

        self.buyValue[-1] = self.entryUp

        self.bufferCount += 1
        if self.bufferCount < self.bufferSize:
            return

        # 判断是否要进行交易
        cond1 = 0
        for i in range(1 , self.use_range + 1):
            if self.highArray[-i] > self.buyValue[-i]:
                cond1 = 1
        cond2 = 0

        # newHigh = [float(x) for x in self.highArray]
        # if bar.high >= max(newHigh[-self.N : ]) and self.highArray[-2] >= max(newHigh[-self.N-1 : -1]):
        #     cond2 = 1
        if self.pos == 0 and cond1 > 0:
            self.intraTradeHigh = bar.high
            newHigh = [float(x) for x in self.highArray]
            entryBuyPrice = max(newHigh[-self.N:])
            orderID = self.buy( entryBuyPrice, self.fixedSize , stop=True)
            self.orderList.append(orderID)

        elif self.pos > 0:
            self.intraTradeHigh = max(bar.high , self.intraTradeHigh)
            exitPrice = self.intraTradeHigh * (1 - self.trailingPrcnt / 100.0) 
            orderID = self.sell( exitPrice , self.fixedSize , stop=True)
            self.orderList.append(orderID)

'''
bollLength = 20         # 通道窗口数
topDev = 1.3            # 开仓偏差
trailingPrcnt = 2       # 移动止损百分比
use_range = 10          # use_range天内有突破最高价
N = 10                  # 多少天突破
'''
running_key = {
    "BTC":{ "bollLength":20 , "topDev":1.3 , "trailingPrcnt": 2 , "use_range": 10 , "N":10 , "minute_use": 6},
    "LTC":{ "bollLength":20 , "topDev":1.3 , "trailingPrcnt": 2 , "use_range": 10 , "N":10 , "minute_use": 6}
}

def main():
    global LoopInterval 

    objs = []
    for e in exchanges:
        if e.GetName() != 'Futures_OKCoin':
            raise Error_noSupport
        e.SetRate(1)
        use_symbol = ["this_week","next_week","quarter"][ContractTypeIdx]
        e.SetContractType(use_symbol) 
        e.SetMarginLevel([10,20][MarginLevelIdx])

        e_currency = e.GetCurrency().upper()
        Log(e_currency)
        st = BollingerBreakerStrategy(e , {
        "vtSymbol":e.GetName() + "_" + use_symbol + "_" + e.GetCurrency(), 
        "currency":e_currency,
        "minute_use":running_key[e_currency]["minute_use"],
        "bollLength":running_key[e_currency]["bollLength"],
        "topDev": running_key[e_currency]["topDev"],
        "trailingPrcnt": running_key[e_currency]["trailingPrcnt"],
        "use_range": running_key[e_currency]["use_range"],
        "N": running_key[e_currency]["N"]
        })

        objs.append(st)

    while True:
        for st in objs:
            st.onCall()
        Sleep(LoopInterval * 1000)
```

> 策略出处

https://www.fmz.com/strategy/52801

> 更新时间

2017-09-10 21:35:41
