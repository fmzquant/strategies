
> 策略名称

SuperTrend V1

> 策略作者

homily



> 策略参数



|参数|默认值|描述|
|----|----|----|
|Factor|3|Factor|
|Pd|7|Pd|
|vol|10|vol|


> 源码 (python)

``` python
'''backtest
start: 2020-01-01 00:00:00
end: 2020-04-01 00:00:00
period: 15m
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
'''

import pandas as pd
import time

def main():
    exchange.SetContractType("quarter")
    preTime = 0
    Log(exchange.GetAccount())
    while True:
        records = exchange.GetRecords(PERIOD_M15)
        if records and records[-2].Time > preTime:
            preTime = records[-2].Time
            doTicker(records[:-1])
        Sleep(1000 *60)
    '''
    while True:  
        a=time.localtime(Unix())
        if(14<a.tm_min<16):
            Log(a)
        if(a.tm_min==0 or a.tm_min==15 or a.tm_min==30 or a.tm_min==45):
            doTicker()
        Sleep(1000 *60)
    '''

        
def doTicker(records):
    #Log('onTick',exchange.GetTicker())
    M15 = pd.DataFrame(records)

    #Factor=3
    #Pd=7
    
    M15.columns = ['time','open','high','low','close','volume','OpenInterest']  
    
    #HL2
    M15['hl2']=(M15['high']+M15['low'])/2

    #ATR(PD)
    length=Pd
    M15['prev_close']=M15['close'].shift(1)
    ranges= [M15['high'] - M15['low'],M15['high']-M15['prev_close'],M15['low']-M15['prev_close']]
    M15['tr'] = pd.DataFrame(ranges).T.abs().max(axis=1)
    alpha = (1.0 / length) if length > 0 else 0.5
    M15['atr']=M15['tr'].ewm(alpha=alpha, min_periods=length).mean()


    M15['Up']=M15['hl2']-(Factor*M15['atr'])
    M15['Dn']=M15['hl2']+(Factor*M15['atr'])
    
    M15['TrendUp']=0.0
    M15['TrendDown']=0.0
    M15['Trend']=1
    M15['Tsl']=0.0
    M15['linecolor']='Homily'
    M15 = M15.fillna(0)

    for x in range(len(M15)):
        M15['TrendUp'].values[x] = max(M15['Up'].values[x],M15['TrendUp'].values[x-1]) if (M15['close'].values[x-1]>M15['TrendUp'].values[x-1]) else M15['Up'].values[x]
        M15['TrendDown'].values[x] = min(M15['Dn'].values[x],M15['TrendDown'].values[x-1]) if (M15['close'].values[x-1]<M15['TrendDown'].values[x-1]) else M15['Dn'].values[x]
        M15['Trend'].values[x] = 1 if (M15['close'].values[x] > M15['TrendDown'].values[x-1]) else ( -1 if (M15['close'].values[x]< M15['TrendUp'].values[x-1])else M15['Trend'].values[x-1] )
        M15['Tsl'].values[x] = M15['TrendUp'].values[x] if  (M15['Trend'].values[x]==1) else M15['TrendDown'].values[x]
        M15['linecolor'].values[x]= 'Long' if ( M15['Trend'].values[x]==1) else  'Short'
 

    linecolor=M15['linecolor'].values[-2]
    close=M15['close'].values[-2]
    Tsl=M15['Tsl'].values[-2] 

    
    if(M15['Trend'].values[-1] == 1 and M15['Trend'].values[-2] == -1):

        Log('SuperTrend V.1 Alert Long','Create Order Buy')
        Log('Tsl=',Tsl)
        position = exchange.GetPosition()
        if len(position) > 0:
            Amount=position[0]["Amount"]
            exchange.SetDirection("closesell")
            exchange.Buy(_C(exchange.GetTicker).Sell*1.01, Amount);
        
        exchange.SetDirection("buy")
        exchange.Buy(_C(exchange.GetTicker).Sell*1.01, vol);

    if(M15['Trend'].values[-1] == -1 and M15['Trend'].values[-2] == 1):
        Log('SuperTrend V.1 Alert Long','Create Order Sell')
        Log('Tsl=',Tsl)
        position = exchange.GetPosition()
        if len(position) > 0:
            Amount=position[0]["Amount"]
            exchange.SetDirection("closebuy")
            exchange.Sell(_C(exchange.GetTicker).Buy*0.99,Amount);
        exchange.SetDirection("sell")
        exchange.Sell(_C(exchange.GetTicker).Buy*0.99, vol*2);
```

> 策略出处

https://www.fmz.com/strategy/200625

> 更新时间

2020-04-23 00:12:49
