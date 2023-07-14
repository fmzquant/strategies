
> Name

Keltner通道突破止损加盈利10即长期持有策略-v23-dev-多周期

> Author

nanpian

> Strategy Description

一个多头策略购买Btc现货的策略，原始是1000个usdt的现金。
每个小时看是否突破keltner通道，如果突破了，就做多。
推出策略：
1、如果亏了6%，直接止损；
2、如果跌破MA均线，直接卖出；
3、如果盈利了10%，就作为保护垫，直接做多，做多如果遇到过去24小时连续跌10%，说明有突发事件，直接止损掉。

自己在实盘这个策略，回测效果还不错。
其实本质就是亏少，赚多。



> Source (python)

``` python
'''
start: 2020-01-01 00:00:00
end: 2020-04-24 00:00:00
period: 1h
exchanges: [{"eid":"huobi","currency":"BTC_USDT","stocks":0,"meta":{"AccessKey":"7yngd7gh5g-a7ed9b1a-c05064c3-bab33","SecretKey":"553c2cd1-e229e1d2-25a536cb-db7d3"}}]
'''

import talib as ta
import pandas as pd
from datetime import datetime
from datetime import timedelta
import math
#coding:utf8
import sys

eid = -1
last_price = -1

def main():
    global eid
    global last_price
    global ma

    while True:

        records = exchange.GetRecords(1*60*60)
        e = exchange
        kline1 = pd.DataFrame(records)
        kline1['Time'] = kline1['Time'].map(lambda x: datetime.utcfromtimestamp(x/1000)+timedelta(hours=8))
        kline1.columns = ['time','open','high','low','close','volume','oi']
       
        r = kline1
        #Log('最新k线时间',r.iloc[-1].time, ' 最新价格收盘价', r.iloc[-1].close)
    
        leadLine1 = ta.EMA(r.close, 30)
        leadLine2 = ta.SMA(r.close, 30)
        UT=leadLine2 < leadLine1
        DT=leadLine2 > leadLine1
    
        # keltner channel
        ma  = ta.EMA(kline1.close, 80)
        # 真实的范围函数
        range1 = ta.TRANGE(kline1.high, kline1.low, kline1.close)
        rangema = ta.EMA(range1, 80)
        upper = ma + 3*rangema
        lower = ma - 3*rangema
       
        # minus and plus of adx/dmi
        minus = ta.MINUS_DI(kline1.high,kline1.low, kline1.close,14) 
        plus = ta.PLUS_DI(kline1.high, kline1.low, kline1.close ,14)
                   
        volume0 = r.iloc[-1].volume
        volume1 = r.iloc[-2].volume
        rn = r.iloc[-1]
       
        entry_long = rn.close > upper.iloc[-1] and (r.iloc[-1].volume+ r.iloc[-2].volume) >1.5 *(r.iloc[-4].volume+ r.iloc[-5].volume)
        long = entry_long
        exit_long = (rn.close < ma.iloc[-1] )
        account = exchange.GetAccount()
        amount = account.Stocks
        #Log('Balance is ', account['Balance'], ' Btc amount is ', amount)
        # 如果处于空仓状态
        if (account['Balance'] >= 600 and amount < 0.001):
            if long==True and account['Balance'] < 400 and amount<0.01:
                Log('balance is ', account['Balance'], ' 余额不足400，退出！')
                return
            elif long== True  and account['Balance'] >= 600: #第一次开多仓
                Log('balance is ', account['Balance'])
                Log('多仓位时间: ', rn.time, ' open is ', rn.open , ' close is ', rn.close, ' upper is ', upper.iloc[-1], ' volume 0\1 is', volume0 , 'volume 1 is ', volume1 , 
                ' plus is ',plus.iloc[-1], ' minus is ', minus.iloc[-1], '@')
                exchange.Buy(-1,600)
                last_price = rn.close + 10
                Sleep(1000*60*15)
        # 如果处于持仓状态
        if  amount>0.001 :
            if  amount > 0.0001 and rn.close <= last_price*0.94: 
                Log('止损平仓事件: ','balance is ', account['Balance'], rn.time, ' rn.close is ', rn.close, ' @')
                id = exchange.Sell(-1, amount);
                account = exchange.GetAccount()
                amount = account.Stocks
                Log('Balance is ', account['Balance'], ' Btc amount is ', amount)
                eid = -1
       #如果处于一直持仓又大跌状态，才卖出
            elif  amount > 0.0001 and rn.close >= last_price * 1.1 and rn.close <= r.iloc[-24].close*0.9:
                Log('持仓周期内的大跌止损平仓事件: ', rn.time, ' rn.close is ', rn.close, ' @')
                id = exchange.Sell(-1, amount);
                eid = -1
                account = exchange.GetAccount()
                amount = account.Stocks
                Log('Balance is ', account['Balance'], ' Btc amount is ', amount)
            elif amount > 0.0001 and exit_long == True :
                if rn.close <= last_price:
                    Log('位置下滑平仓位事件,亏损:  amount is ',amount ,' time is ', rn.time, ' 价格是：',rn.close,' ma is ', ma.iloc[-1], ' 开仓价格',last_price,' 亏损幅度：',100*(last_price -rn.close)/last_price ,'% @')
                    eid = exchange.Sell(-1, amount)
#                print(r.tail(10))
#                print('ma is ' ,ma)
                    account = exchange.GetAccount()
                    amount = account.Stocks
                    Log('Balance is ', account['Balance'], ' Btc amount is ', amount)
                elif rn.close > last_price*1.1 :
                    Log('超出10%盈利继续持仓')
                    account = exchange.GetAccount()
                    amount = account.Stocks
                    Log('Balance is ', account['Balance'], ' Btc amount is ', amount)
                    return 
                elif rn.close > last_price  and rn.close <=last_price*1.1:
                    eid = exchange.Sell(-1, amount);
                    account = exchange.GetAccount()
                    amount = account.Stocks
                    Log('Balance is ', account['Balance'], ' Btc amount is ', amount)
                    Log('位置下滑平仓位事件,赚钱啦: amount is ',amount, ' time is ', rn.time, ' 价格是： ',rn.close,' ma is ', ma.iloc[-1],' 开仓价格',last_price,' 盈利幅度：',100*(rn.close-last_price )/last_price ,'% @' )
                else:
                    id = exchange.Sell(-1, amount);
                    Log('最终位置下滑平仓位事件,赚钱啦: amount is ',amount, ' time is ', rn.time, ' 价格是： ',rn.close,' ma is ', ma.iloc[-1],' 开仓价格',last_price,' 盈利幅度：',100*(rn.close-last_price )/last_price ,'% @' )
                    eid = -1
                    account = exchange.GetAccount()
                    amount = account.Stocks
                    Log('Balance is ', account['Balance'], ' Btc amount is ', amount)
            Sleep(1000*60*15)

```

> Detail

https://www.fmz.com/strategy/313041

> Last Modified

2021-09-02 12:04:56
