
> Name

BuySell-Strategy-depends-on-AOStochRSIATR-by-SerdarYILMAZ

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Fast Length|
|v_input_2|34|Slow length|
|v_input_3|14|K|
|v_input_4|3|D|
|v_input_5|3|smooth|
|v_input_6_close|0|rsi source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|10|rsi length|
|v_input_8|14|ATR Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-27 00:00:00
end: 2022-08-27 00:00:00
period: 4h
basePeriod: 15m
*/

//@version=4

strategy("Buy&Sell Strategy depends on AO+Stoch+RSI+ATR by SerdarYILMAZ", shorttitle="Buy&Sell Strategy")
// Created by Serdar YILMAZ
// This strategy is just for training, its purpose is just learning code in pine script.
// Don't make buy or sell decision with this strategy.
// Bu strateji sadece pine script'te kodlamanın nasıl yapildigini ogrenmek icindir.
// Bu stratejiye dayanarak, kesinlikle al-sat islemleri yapmayin.

//AO

fast=input(title="Fast Length",type=input.integer,defval=5)
slow=input(title="Slow length",type=input.integer,defval=34)

awesome=(sma(hl2,fast)-sma(hl2,slow))*1000

plot(awesome, style=plot.style_histogram, color=(awesome>awesome[1]?color.green:color.red))

//Stoch

K=input(title="K",type=input.integer,defval=14)
D=input(title="D",type=input.integer,defval=3)
smooth=input(title="smooth",type=input.integer,defval=3)

k=sma(stoch(close,high,low,K),D)
d=sma(k,smooth)

hline(80)
hline(20)

plot(k,color=color.blue)

//RSI

rsisource=input(title="rsi source",type=input.source,defval=close)
rsilength=input(title="rsi length",type=input.integer,defval=10)

rsi=rsi(rsisource,rsilength)

hline(70,color=color.orange)
hline(30,color=color.orange)

plot(rsi,color=color.orange)

//ATR

atrlen=input(title="ATR Length", type=input.integer,defval=14)

atrvalue=rma(tr,atrlen)

plot(atrvalue*1000,color=color.green)

LongCondition=k<20 and rsi<30 and awesome>awesome[1]
ShortCondition=k>80 and rsi>70 and awesome<awesome[1]
if (LongCondition)
    stoploss=low-atrvalue
    takeprofit=close+atrvalue
    strategy.entry("Long Position", strategy.long)
    strategy.exit("TP/SL",stop=stoploss,limit=takeprofit)
    
if (ShortCondition)
    stoploss=high+atrvalue
    takeprofit=close-atrvalue
    strategy.entry("Short Position",strategy.short)
    strategy.exit("TP/SL",stop=stoploss,limit=takeprofit)
    
    

    
    



```

> Detail

https://www.fmz.com/strategy/380330

> Last Modified

2022-08-28 05:34:36
