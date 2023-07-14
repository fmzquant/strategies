
> Name

移植-OKCoin-韭菜收割机-注释python版

> Author

去者伯仁



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|BurstThresholdPct|5e-05|burst.threshold.pct|
|BurstThresholdVol|10|burst.threshold.vol|
|MinStock|0.1|最小交易量|
|CalcNetInterval|60|净值计算周期(秒)|
|BalanceTimeout|10000|平衡等代时间(毫秒)|
|TickInterval|280|轮训周期(毫秒)|


> Source (python)

``` python
'''backtest
start: 2019-09-05 00:00:00
end: 2019-09-05 22:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BTC_USDT","stocks":0,"fee":[0,0]}]
mode: 1
'''

import time
class LeeksReaper():  
    def __init__(self):                                      #创建构造函数LeeksReaper                                          #构造一个空的对象
        self.numTick = 0
        self.lastTradeId = 0
        self.vol = 0
        self.askPrice = 0
        self.bidPrice = 0
        self.orderBook = {}
        self.prices = []
        self.tradeOrderId = 0
        self.p = 0.5
        self.account = None
        self.preCalc = 0
        self.preNet = 0

        self.sgnum = 0
        # self.cny = 0
        # self.btc = 0
        #以上都是self对象的属性

    #创建一个方法
    def updateTrades(self):

        trades = _C(exchange.GetTrades)                     #创建一个变量trades用来接收_C函数返回的值，传入的参数为：exchange.GetTrades
        if (len(self.prices)== 0):                       #如果self.prices的长度等于0
            while (len(trades) == 0):                      #如果trades等于0时执行下方的语句
                trades = _C(exchange.GetTrades) #通过数组拼接的方法把_C函数返回的值与trades进行拼接，传入的参数为：exchange.GetTrades

            for i in range(15):                      #循环，结束条件为i=15，每次循环i都自加1
                self.prices.append(trades[-1].Price)#每次循环都把trades数组的最后一个值赋值给self对象的prices数组上，共循环15次

        tradesvol = 0
        for trade in trades:
            if ((trade.Id > self.lastTradeId) or (trade.Id == 0 and trade.Time > self.lastTradeId)):
                #等号右边是一个三目运算，如果trade.Id=0就返回trade.Time，否则就返回trade.Id, self.lastTradeId。并进行比较返回最大的值，最后把返回的最大值赋给self.lastTradeId
                temp = trade.Time if trade.Id == 0 else trade.Id
                self.lastTradeId = max(temp, self.lastTradeId)
                tradesvol = tradesvol + trade.Amount


        #self.vol的值等于他自己乘以0.7加上这段时间的交易量*0.3
        self.vol = 0.7 * self.vol + 0.3 * tradesvol


    #self对象的一个方法
    def updateOrderBook(self):

        # 创建一个变量orderBook用来接收_C函数返回的值，传入的参数为：exchange.GetDepth
        orderBook = _C(exchange.GetDepth)
        self.orderBook = orderBook                              #self.orderBook 的值等于orderBook
        if (len(orderBook.Bids)< 3 or len(orderBook.Asks) < 3):#前半段是判断orderBook.Bids的长度是否小于3，后半段是判断orderBook.Asks的长度是否小于3，如果两边都小于3就执行下方的语句
            #返回undefined
            return
        
        #self.bidPrice的值等于orderBook.Bids数组的第一个值乘以0.618加上orderBook.Asks数组的第一个值乘以0.382加上0.01
        self.bidPrice = orderBook.Bids[0].Price * 0.618 + orderBook.Asks[0].Price * 0.382 + 0.01
        #同上
        self.askPrice = orderBook.Bids[0].Price * 0.382 + orderBook.Asks[0].Price * 0.618 - 0.01
        #删除price数组的第一个值，并返回第一个值
        del(self.prices[0])
        #prices数组向后添加值，值为函数_N的返回值
        self.prices.append(_N((orderBook.Bids[0].Price + orderBook.Asks[0].Price) * 0.35 +
            (orderBook.Bids[1].Price + orderBook.Asks[1].Price) * 0.1 +
            (orderBook.Bids[2].Price + orderBook.Asks[2].Price) * 0.05))

    #self对象的一个方法
    def balanceAccount(self):
        # 创建一个变量account用来接收GetAccount函数返回的值
        account = _C(exchange.GetAccount)
        #判断account是否为空，是就返回undefined
        if account is None:
            return

        #赋值
        self.account = account
        #获取当前时间的时间戳数据
        now = time.time()
        #判断self.orderBook.Bids的长度是否大于0和now - self.preCalc的值是否大于(CalcNetInterval * 1000)，如果都大于就执行下方语句
        if (len(self.orderBook.Bids) > 0 and now - self.preCalc > (CalcNetInterval)):
            #赋值
            self.preCalc = now
            #创建一个变量net用来接收_N函数的返回值
            net = _N(account.Balance + account.FrozenBalance + self.orderBook.Bids[0].Price * (account.Stocks + account.FrozenStocks))
            #判断net是否不等于self.preNet，如果是就执行下方语句
            if (net != self.preNet):
                #赋值
                self.preNet = net
                #调用函数LogProfit并传入net
                LogProfit(net-10000)

        #赋值
        self.btc = account.Stocks
        self.cny = account.Balance
        self.p = self.btc * self.prices[-1] / (self.btc * self.prices[-1] + self.cny)
        balanced = False
        #判断self.p的值是否小于0.48
        # Log(self.p)
        if (self.p < 0.48):
            #调用Log函数并传入参数"开始平衡", self.p
            Log("开始平衡", self.p)
            #self.cny =self.cny-300
            self.cny -= 300
            #判断self.orderBook.Bids的长度是否大于0，如果是就执行下方语句
            if (len(self.orderBook.Bids) > 0):
                #调用buy函数并传入相应的参数
                exchange.Buy(self.orderBook.Bids[0].Price + 0.00, 0.01)
                exchange.Buy(self.orderBook.Bids[0].Price + 0.01, 0.01)
                exchange.Buy(self.orderBook.Bids[0].Price + 0.02, 0.01)

                Log("持币数:",self.btc,"现金数:",self.cny)

            #如果self.p大于0.52就执行下方语句
        elif (self.p > 0.52):
            #调用Log函数并传入参数"开始平衡", self.p
            Log("开始平衡", self.p)
            #self.btc=self.btc-0.03
            self.btc -= 0.03
            #判断self.orderBook.Bids的长度是否大于0，如果是就执行下方语句
            if (len(self.orderBook.Asks) > 0):
                #调用Sell函数并传入相应的参数
                exchange.Sell(self.orderBook.Asks[0].Price - 0.00, 0.01)
                exchange.Sell(self.orderBook.Asks[0].Price - 0.01, 0.01)
                exchange.Sell(self.orderBook.Asks[0].Price - 0.02, 0.01)

                Log("持币数:",self.btc,"现金数:",self.cny)

        #调用函数Sleep并传入参数BalanceTimeout
        Sleep(BalanceTimeout)
        #创建标量order来接收GetOrders函数返回的值
        orders = _C(exchange.GetOrders)
        #判断orders是否为真
        if (orders):
            #遍历orders
            Log(orders)
            for i in range(len(orders)):
                #判断orders的id是否不等于self.tradeOrderId
                if (orders[i].Id != self.tradeOrderId):
                    #如果是就调用CancelOrder函数并传入参数orders[i].Id
                    Log(orders[i].Id)
                    exchange.CancelOrder(orders[i].Id)





    #self的一个方法
    def poll(self):

        #self.numTick自加1
        self.numTick +=1
        #执行上方创建的三个方法updateTrades，updateOrderBook，updateOrderBook
        self.updateTrades()
        self.updateOrderBook()
        self.balanceAccount()
        #burstPrice的值等于self.prices数组的最后一个值乘以BurstThresholdPct
        burstPrice = self.prices[-1] * BurstThresholdPct
        #创建变量并赋值
        bull = False
        bear = False
        tradeAmount = 0
        #判断self.account是否为真
        if (self.account):
            #是真的话就调用LogStatus函数并传入相应的参数
            LogStatus(self.account, 'Tick:', self.numTick, ', lastPrice:', self.prices[-1], ', burstPrice: ', burstPrice,",收割机当前启动次数:",self.sgnum)

        #前半段是判断self.numTick的值是否大于2，如果是大于2就往执行||后面的语句，如果不是则判断&&运算符后面的语句，如果为fales直接返回fales,执行else的语句
        if (self.numTick > 2 and (self.prices[-1] - max(self.prices[-6:-1]) > burstPrice or self.prices[-1] - max(self.prices[-6:-2]) > burstPrice and self.prices[-1] > self.prices[-2])):
            #变量bull赋值为true,tradeAmount赋值为self.cnyv/self.bidPrice乘以0.99
            bull = True
            tradeAmount = self.cny / self.bidPrice * 0.99

        #同上面if
        elif (self.numTick > 2 and (self.prices[-1] - min(self.prices[-6:-1]) < -burstPrice or self.prices[-1] - min(self.prices[-6:-2]) < -burstPrice and self.prices[-1] < self.prices[-2])):
            bear = True
            #赋值
            tradeAmount = self.btc

        #判断self.vol是否小于BurstThresholdVol，如果是就执行if语句内的代码
        if (self.vol < BurstThresholdVol):
            tradeAmount *= self.vol / BurstThresholdVol

        #判断self.numTick是否小于5，如果是就执行if语句内的代码
        if (self.numTick < 5):
            #tradeAmount=tradeAmount*0.8
            tradeAmount *= 0.8

        #判断self.numTick是否小于10
        if (self.numTick < 10):
            tradeAmount *= 0.8

        #前半段是判断!bull和!bear哪一个为真，后半段是判断tradeAmount是否小于MinStock，当两边都为真时就执行if语句内的代码
        if (((not bull) and (not bear)) or tradeAmount < MinStock):
            return

        #如果bull为真时就返回self.bidPrice的值，否则返回self.askPrice的值
        tradePrice = self.bidPrice if bull else self.askPrice
        #tradeAmount是否大于或者等于MinStock，如果时就进行循环while的语句
        while (tradeAmount >= MinStock):
            #当bull为真时返回Buy函数的返回值，否则返回Sell函数的返回值
            orderId = exchange.Buy(self.bidPrice, tradeAmount) if bull else exchange.Sell(self.askPrice, tradeAmount)
            self.sgnum+=1
            Log("收割机第",self.sgnum,"次启动")
            #调用Sleep函数传入参数400，0.4秒后执行
            Sleep(400)
            #判断orderId是否为true
            if (orderId):
                #赋值
                self.tradeOrderId = orderId
                #赋值
                order = None
                while (True):
                    #rder的值等于GetOrder函数的返回值
                    order = exchange.GetOrder(orderId)
                    #判断order是否为true
                    if (order):
                        #判断两边的值是否相等
                        if (order.Status == ORDER_STATE_PENDING):
                            #调用CancelOrder函数
                            exchange.CancelOrder(orderId)
                            #0.2秒后执行
                            Sleep(200)
                        else:
                            #跳出循环
                            break


                #赋值
                self.tradeOrderId = 0
                tradeAmount -= order.DealAmount
                tradeAmount *= 0.9
                #判断两边是否相等
                if (order.Status == ORDER_STATE_CANCELED):
                    #调用self的updateOrderBook方法
                    self.updateOrderBook()
                    #判断是否为true,如果时就进行循环
                    while (bull and self.bidPrice - tradePrice > 0.1):
                        #赋值
                        tradeAmount *= 0.99
                        tradePrice += 0.1

                    #判断是否为true,如果时就进行循环
                    while (bear and self.askPrice - tradePrice < -0.1):
                        tradeAmount *= 0.99
                        tradePrice -= 0.1
        #赋值
        self.numTick = 0




#函数main
def main():
    #reaper 是构造函数的实例
    reaper = LeeksReaper()
    while (True):
        #通过实例调用poll方法
        reaper.poll()
        Sleep(TickInterval)

```

> Detail

https://www.fmz.com/strategy/265827

> Last Modified

2021-04-16 11:34:07
