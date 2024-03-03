
> Name

BuySell-Strategy-depends-on-AOStochRSIATR

> Author

ChaoZhang

> Strategy Description

This strategy is just for training, its purpose is just learning code in pine script.
Don't make buy or sell decision with this strategy.

Turkish/Turkce
Bu strateji sadece pine script'te kodlamanın nasıl yapildigini ogrenmek icindir.
Bu stratejiye dayanarak, kesinlikle al-sat islemleri yapmayin.

How it works?

When RSI and Stoch are in oversold area and if awesome osc. turns positive, take long position. Stop loss and take profit levels were defined with ATR ind.

When RSI and Stoch are in overbought are and if awesome osc. turns negative, take short position. Stop loss and take profit levels were defined with ATR ind.

Turkish/Turkce

RSI ve Stoch asiri satım bölgesinde iken awesome pozitife döner ise long pozisyon açar, zarar kes ve kar al seviyeleri ATR indikatoru ile tanımlandı.

RSI ve Stoch asırı alım bölgesinde iken awesome negatife döner ise short pozisyon açar, zarar kes ve kar al seviyeleri ATR indikatoru ile tanımlandı.


**backtest**
 ![IMG](https://www.fmz.com/upload/asset/12d6d36c626f331a198.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Fast Length|
|v_input_2|17|Slow length|
|v_input_3|14|K|
|v_input_4|3|D|
|v_input_5|3|smooth|
|v_input_6_low|0|rsi source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|10|rsi length|
|v_input_8|14|ATR Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-19 00:00:00
end: 2022-05-18 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy("Buy&Sell Strategy depends on AO+Stoch+RSI+ATR by SerdarYILMAZ", shorttitle="Buy&Sell Strategy")
// Created by Serdar YILMAZ
// This strategy is just for training, its purpose is just learning code in pine script.
// Don't make buy or sell decision with this strategy.
// Bu strateji sadece pine script'te kodlamanın nasıl yapildigini ogrenmek icindir.
// Bu stratejiye dayanarak, kesinlikle al-sat islemleri yapmayin.

//AO

fast=input(title="Fast Length",type=input.integer,defval=3)
slow=input(title="Slow length",type=input.integer,defval=17)

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

rsisource=input(title="rsi source",type=input.source,defval=low)
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

https://www.fmz.com/strategy/364518

> Last Modified

2022-05-20 16:19:55
