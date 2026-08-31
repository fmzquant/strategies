
> Name

Multi-Indicator-Buy-and-Sell-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16fe6ff2c466ab20b61.png)


### Overview

This strategy combines moving average, overbought-oversold and volatility rate indicators to buy on dips when oversold and sell on rallies when overbought, in order to track trends.

### Strategy Logic

Take positions when RSI and Stoch are both in oversold/overbought zones and AO oscillator shows reversal signal. Specifically, go long when RSI and Stoch are low (below 30 and 20) and AO turns from negative to positive; go short when RSI and Stoch are high (above 70 and 80) and AO turns from positive to negative. Set stop loss and take profit based on ATR value to adjust loss/profit levels according to market volatility.

The strategy mainly uses four indicators:

- AO oscillator: reflects price momentum, can be used to identify trend reversal.  
- RSI: reflects overbought/oversold levels. Below 30 is oversold zone.
- Stoch: reflects overbought/oversold zones. Below 20 is oversold zone.
- ATR: reflects recent price volatility.

When AO shows reversal signal and RSI & Stoch are both in oversold/overbought zones, price may reverse. Take positions at this time. Use ATR to set stop loss and take profit prices to avoid being trapped by adjusting loss/profit range based on volatility.

### Advantages

- Use multiple indicators to confirm signals, avoiding wrong trades from single indicator.
- Set stop loss/profit based on volatility to control single loss.
- Simple and clear logic, easy to understand and implement.  
- Take advantage of overbought/oversold situations to capture reversals.

### Risks and Solutions

- AO may generate false signals. Needs to combine with RSI and Stoch to avoid wrong trades.
- Fixed parameters may fail to adapt to market changes. Parameters need to be optimized.
- Stop loss too close may trigger frequent stops. Can loosen stop range or use exit strategies.  
- Fixed take profit may exit too early or late. Can use adaptive take profit or partial exits.

To reduce risks, optimize in below aspects:

1. Optimize parameters to adapt to different periods and instruments.
2. Improve stop loss methods like trailing stop, partial exits.
3. Optimize entry rules to avoid false signals.
4. Optimize take profit ways like adaptive take profit, segmented by trends.

### Optimization Directions

Below aspects can be optimized for the strategy:

1. Optimize parameter settings by traversing different values.

2. Add filter conditions on entry to avoid false signals.  

3. Optimize stop loss methods like trailing stop loss.

4. Optimize take profit ways like adaptive take profit.

5. Add automatic take profit near key levels to avoid pullback.

6. Optimize money management adjusting position size by risk.

7. Test and optimize parameters and stop/profit levels based on different instruments and timeframes.

8. Handle extreme events like avoiding trades during news or fast cut loss.

### Summary

This strategy combines moving average, overbought-oversold and volatility systems to buy low and sell high, with strong trend following ability. But some problems like fixed parameters and improper stop loss exist. We can optimize from various aspects like parameter tuning, improving stop loss, adding filters to make it more robust. In real trading, need to test and optimize based on specific instruments and periods to maximize its efficacy and profitability.


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
start: 2023-09-17 00:00:00
end: 2023-10-17 00:00:00
period: 1h
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

https://www.fmz.com/strategy/429567

> Last Modified

2023-10-18 11:36:38
