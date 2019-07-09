
> 策略名称

Python  精简多品种 MACD 趋势策略

> 策略作者

Zero

> 策略描述

需要引用小小梦公开的商品期货交易类库

> python版CTP商品期货交易类库（支持2/3 测试版）

https://www.fmz.com/strategy/24288

> 策略参数



|参数|默认值|描述|
|----|----|----|
|Amount|2|开仓手数|
|ContractList|MA701,rb1701|合约列表|


> 源码 (python)

``` python
'''
/*backtest
start: 2016-01-30        
end: 2016-12-30           
period: 1440
periodBase: 60
mode: 0                 
*/
'''

class Trader:
    def __init__(self, q, symbol):
        self.q = q
        self.symbol = symbol
        self.position = 0
        self.isPending = False

    def onOpen(self, task, ret):
        if ret:
            self.position = ret['position']['Amount'] * (1 if (ret['position']['Type'] == PD_LONG or ret['position']['Type'] == PD_LONG_YD) else -1)
        Log(task["desc"], "Position:", self.position, ret)
        self.isPending = False

    def onCover(self, task, ret):
        self.isPending = False
        self.position = 0
        Log(task["desc"], ret)

    def onTick(self):
        if self.isPending:
            return
        ct = exchange.SetContractType(self.symbol)
        if not ct:
            return

        r = exchange.GetRecords()
        if not r or len(r) < 35:
            return
        macd = TA.MACD(r)
        
        diff = macd[0][-2] - macd[1][-2]
        if abs(diff) > 0 and self.position == 0:
            self.isPending = True
            self.q.pushTask(exchange, self.symbol, ("buy" if diff > 0 else "sell"), 1, self.onOpen)
        if abs(diff) > 0 and ((diff > 0 and self.position < 0) or (diff < 0 and self.position > 0)):
            self.isPending = True
            self.q.pushTask(exchange, self.symbol, ("closebuy" if self.position > 0 else "closesell"), 1, self.onCover)

def main():
    q = ext.NewTaskQueue()
    Log(_C(exchange.GetAccount))
    tasks = []
    for symbol in ContractList.split(','):
        tasks.append(Trader(q, symbol.strip()))
    while True:
        if exchange.IO("status"):
            for t in tasks:
                t.onTick()
            q.poll()
            Sleep(1000)
```

> 策略出处

https://www.fmz.com/strategy/43965

> 更新时间

2017-06-30 10:15:54
