
> Name

MACD逃顶策略

> Author

program

> Strategy Description

**介绍:** MACD量价背离时卖出持有币种
**原理实现:** 以当前macd值为开始向前遍历找出大于当前macd值的索引对应k线收盘价，锁定对应k线价格到当前收线k线范围内的最大值，如果当前价格大于区域内最高价则触发卖出。
向前遍历macd数据当最大保留长度大于15，就近选择macd最大值
 ![IMG](https://www.fmz.com/upload/asset/245a08277f17f12091cf4.png) 
**回测数据:** 
 ![IMG](https://www.fmz.com/upload/asset/245180e358693ba791ce0.png) 

**说明:** 策略只支持现货，可以多币种同时运行,源码仅供参考，实盘操作请谨慎运行。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|num|0.1|卖出数量|


> Source (python)

``` python
'''backtest
start: 2023-01-01 00:00:00
end: 2023-05-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD","stocks":10}]
'''


# from matplotlib import pyplot as plt
# plt.figure()

class ExitTop(object):
    def __init__(self,index):
        self.index = index 
        self.totestlist = [] # MACD数据
        self.klist = [] # k线数据
        self.toplus = []
        self.tocpn = []
        self.Sell = False
    
    # 获取k线及MACD数据
    def GetRecord(self) -> bool:
        self.totestlist = []
        self.klist = []
        self.toplus = []
        self.tocpn = []
        records = exchanges[self.index].GetRecords()
        macd = TA.MACD(records, 12, 26, 9)
        # 判断DIF是否大于DEA
        if not macd[0][-2] > macd[1][-2] and macd[0][-3] < macd[1][-3] or not macd[0][-2] > macd[1][-2] and macd[0][-4] < macd[1][-4]:
            return False
        self.totestlist = macd[0][len(macd[0])-80:]
        # 封装k线数据
        for get in range(len(records)):
            self.klist.append(records[get]["Close"])
        self.klist = self.klist[len(self.klist)-80:]
        return True
    
    def mepath(self):
        if not self.GetRecord():
            return False
        # 向前遍历发现最大值
        maxsign = -1000000000000
        for i in range(len(self.totestlist)-1,-1,-1):
            if self.totestlist[i] > maxsign:
                maxsign = self.totestlist[i]
                self.tocpn.append([1,i])
            else:
                if len(self.tocpn) > 0:
                    self.tocpn[-1][0] = self.tocpn[-1][0]+1
            self.toplus.insert(0,maxsign)
        sign = False
        shorttime = [0,0] # 步长 , 索引
        for i in range(len(self.tocpn)):
            if self.tocpn[i][0] > 15 and sign == False:
                shorttime = [self.tocpn[i][0],self.tocpn[i][1]]
                sign = True
        # 如果最大索引不是自己
        if shorttime[1] < len(self.klist)-4:
            # 锁定区域内最高价格
            are = max(self.klist[shorttime[1]:-4])
            # 判断是否存在大于当前macd值,如果当前价格大于区域内最高价格
            if self.totestlist[-2]+300 < self.totestlist[shorttime[1]] and self.klist[-2] >= are:
                return True
            return False
        return False
    
    def main(self):
        result = self.mepath()
        if result == True and self.Sell == False:
            exchanges[self.index].Sell(-1, num)
            self.Sell = True
        elif result == False:
            if self.Sell == True:
                self.Sell = False
        # plt.plot(self.totestlist)
        # plt.plot(self.toplus)
        # LogStatus(plt)


def main():
    transaction = []
    for index in range(len(exchanges)):
        transaction.append(ExitTop(index))
    while True:
        for tran in range(len(transaction)):
            transaction[tran].main()
            Sleep(1000*60)
```

> Detail

https://www.fmz.com/strategy/356399

> Last Modified

2023-05-13 21:21:01
