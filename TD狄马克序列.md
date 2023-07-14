
> Name

TD狄马克序列

> Author

btccccrazy





> Source (python)

``` python
'''backtest
start: 2021-01-01 00:00:00
end: 2021-03-12 00:00:00
period: 15m
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
'''

import time
import pandas as pd
import numpy as np

def main():
    exchange.SetContractType("quarter")
    while True:
        #start_time = time.time()
        records = exchange.GetRecords(PERIOD_H1)
        if len(records) < 100:
            Sleep(1000)
            return
        kline = pd.DataFrame(records)
        kline.columns = ['time','open','high','low','close','volume','OpenInterest']
        i = 0
        j = 0
        for x in range(len(kline)-40,len(kline)):
            if kline['close'].values[x] > kline['close'].values[x-4]:
                i += 1
            else:
                i = 0
            if kline['close'].values[x] < kline['close'].values[x-4]:
                j -= 1
            else:
                j = 0
        TDindex = i if i>0 else j
        #if 13 > TDindex >= 8 :
            #Log('温馨警告，进入超买区域，可考虑卖出止盈：')
        #elif 21 > TDindex >= 13 :
            #Log('一般警告，进入超级超买区域，可考虑卖出止盈：')
        #elif TDindex >= 21 :
            #Log('严重警告，进入超级超级超买区域，可考虑清仓止盈：')
        #elif -13 < TDindex <= -8 :
            #Log('温馨警告，进入超卖区域，可考虑买入博个反弹：')
        #elif -21 < TDindex <= -13 :
            #Log('一般警告，进入超级超卖区域，可考虑加仓买入：')
        #elif TDindex <= -21 :
            #Log('严重警告，进入超级超级超卖区域，可考虑全仓杀入：')
        position = exchange.GetPosition()
        #if len(position) > 0:
            #Log(position[0]["Type"])
        if TDindex == 9 or TDindex == 13 or TDindex == 22:  #and len(position) == 0 :
            Log('上根K线的TD序列为：',TDindex)
            exchange.SetDirection("sell")
            id2 = exchange.Sell(-1, 1)
        
        if TDindex == -9 or TDindex == -13 or TDindex == -22:  #and len(position) == 0 :
            Log('上根K线的TD序列为：',TDindex)
            exchange.SetDirection("buy")
            id2 = exchange.Buy(-1, 1)
        if len(position) > 0:
            if position[0]["Type"] ==0 and TDindex >= 2 :
                #Log(position[0]["Type"])
                Log('上根K线的TD序列为：',TDindex)
                exchange.SetDirection("closebuy")
                id2 = exchange.Sell(-1, 1)
            
            if position[0]["Type"] ==1 and TDindex <= -2 :
                #Log(position[0]["Type"])
                Log('上根K线的TD序列为：',TDindex)
                exchange.SetDirection("closesell")
                id2 = exchange.Buy(-1, 1)
        # end_time = time.time()
        #spend_time = end_time - start_time
        Sleep(1000*900)
                
                
                
    

```

> Detail

https://www.fmz.com/strategy/262467

> Last Modified

2021-03-16 11:18:47
