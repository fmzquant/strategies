
> Name

均仓策略

> Author

去者伯仁

> Strategy Description

遇到信仰币，又怕拿不住，就开均仓策略吧，全自动高抛低吸，始终保持币的价值和U的价值均衡
只支持币圈现货
你的百分之一资金要能买入该币的最小交易数量



> Source (python)

``` python
'''backtest
start: 2020-04-03 00:00:00
end: 2021-04-02 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT","stocks":0}]
'''

import time
class juncang_strategy():  
    def __init__(self,exchange):
        self.p = 0.5
        self.account = None
        self.cny = 0
        self.btc = 0
        self.exchange =exchange
        #以上都是self对象的属性

    def cancelAllOrders(self):
        orders = _C(self.exchange.GetOrders)
        for order in orders:
            exchange.CancelOrder(order['Id'], order)
        return True


    def balanceAccount(self):
        self.cancelAllOrders()

        kr =  _C(self.exchange.GetRecords,PERIOD_M1)
        account = _C(self.exchange.GetAccount)
        if account is None:
            return

        #赋值
        self.account = account

        #赋值
        self.btc = account.Stocks+account.FrozenStocks
        self.cny = account.Balance+account.FrozenBalance
        
        accountmoney=self.btc * kr[-1].Close + self.cny
        self.p = self.btc * kr[-1].Close / accountmoney
        # Log(self.p)
        tradenum=accountmoney/kr[-1].Close/100
        if tradenum<0.001:
            tradenum=0.001
        #判断self.p的值是否小于0.48
        Log(self.p)
        if (0.45<self.p < 0.49):
            #调用Log函数并传入参数"开始平衡", self.p
            Log("开始平衡", self.p)

            self.exchange.Buy(kr[-1].Close, tradenum)

            Log("持币数:",self.btc,"现金数:",self.cny)

            #判断self.p的值是否大于0.52
        elif (0.55 > self.p > 0.51):
            #调用Log函数并传入参数"开始平衡", self.p
            Log("开始平衡", self.p)

            #调用Sell函数并传入相应的参数
            self.exchange.Sell(kr[-1].Close, tradenum)

            Log("持币数:",self.btc,"现金数:",self.cny)
        elif (self.p >= 0.55):
            #调用Log函数并传入参数"开始平衡", self.p
            Log("开始平衡,快速平仓", self.p)

            self.exchange.Sell(kr[-1].Close, tradenum*10)

            Log("持币数:",self.btc,"现金数:",self.cny)
        elif (self.p <= 0.45):
            #调用Log函数并传入参数"开始平衡", self.p
            Log("开始平衡，快速建仓", self.p)

            self.exchange.Buy(kr[-1].Close, tradenum*10)

            Log("持币数:",self.btc,"现金数:",self.cny)




#函数main
def main():
    #reaper 是构造函数的实例
    reaper = juncang_strategy(exchange)
    while (True):
        #通过实例调用poll方法
        reaper.balanceAccount()
        Sleep(1000*10)

```

> Detail

https://www.fmz.com/strategy/266142

> Last Modified

2021-05-12 11:32:05
