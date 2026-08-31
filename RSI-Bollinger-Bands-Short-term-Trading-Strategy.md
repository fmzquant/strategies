
> Name

RSI-Bollinger-Bands-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6222f18d08602a6118.png)

## Overview

This strategy combines the Relative Strength Index (RSI) and Bollinger Bands to construct a short-term trading strategy. It mainly utilizes the buy and sell signals when RSI breaks through the upper or lower Bollinger Bands. Meanwhile, a stop loss mechanism is included to effectively control risks.

## Strategy Logic   

1. Calculate the RSI indicator with a 14-period parameter.  
2. Calculate the Bollinger Midband using the weighted moving average of RSI, with a period set to 25.
3. Calculate the Upper Band and Lower Band of Bollinger Bands. The Upper Band is the Midband plus the amplitude, while the Lower Band is the Midband minus the amplitude. The amplitude is set to 20 times the RSI standard deviation.    
4. Go long when RSI breaks through the Lower Band, and go short when RSI breaks through the Upper Band.  
5. Set a stop loss mechanism that if the price drops below 6% of the long entry price, close the long position.

## Advantage Analysis

This strategy combines the strengths of both RSI and Bollinger Bands for short-term trading. The main advantages are:  

1. RSI can effectively determine overbought and oversold scenarios. Combining Bollinger Bands adds accuracy to the trading signals. 
2. Bollinger Bands are dynamic to automatically adjust the range based on market volatility. 
3. The stop loss setting is reasonable with 6% tolerance for normal fluctuations while controlling losses.

## Risk Analysis   

Potential risks of this strategy includes:    

1. RSI has lagging characteristics and may miss fast reversal opportunities.  
2. Incorrect Bollinger Bands parameter or drastic market swings can cause bad signals.
3. Stop loss parameter set unwisely may lead to unnecessary losses. 

Solutions:  

1. Consider combining with other indicators like KDJ for comprehensive judgment.  
2. Dynamically optimize parameters for different markets.   
3. Backtest and optimize stop loss parameter for best setting.

## Optimization Directions   

There is room for further optimization:

1. Change fixed stop loss to dynamic trailing stop loss according to price fluctuation. 
2. Add Bollinger Band Width Index rules to pause trading when Bands expand or contract too much.  
3. Combine volume indicators like Chaikin Money Flow for better confirmation.

## Summary  

In summary, this is a relatively stable and reliable short-term trading strategy. By combining the strengths of overbought-oversold judgment of RSI and the adaptive range of Bollinger Bands, it forms an advantageous short-term system. With parameter tuning and logic refinement, this strategy can achieve consistent profits.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|len_rsi|
|v_input_2|25|len_bb|
|v_input_3|20|mul10|
|v_input_4|94|stop loss rate|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-12 00:00:00
end: 2023-10-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("rsi+bb st", shorttitle="rsibb st 0.3")

len_rsi=input(14)
len_bb = input(25)
mul10 = input(20.0)
mul=mul10/10
sl100 = input(94.0, title='stop loss rate')
sl=sl100/100

lw = 3

vwma_e(src, len) =>
    ema(src*volume, len)/ema(volume,len)

rsi = rsi(close, len_rsi)
plot(rsi, color=blue, title= 'rsi blue', linewidth=lw)
plot(70, color=gray, title='line 70', linewidth=lw)
plot(30, color=gray, title='line 30', linewidth=lw)

bbg = stdev(rsi, len_bb)*mul
bbc = vwma_e(rsi, len_bb)
//bbc=ema(rsi,len_bb)
ratio = 0.6
bbc := bbc*ratio + 50*(1-ratio)

bbu = bbc+bbg
bbl = bbc-bbg
plot(bbu, color=green, title='bb_up green', linewidth=lw)
plot(bbl, color=red, title='bb_low red', linewidth=lw)
plot(bbc, color=#808000ff, title='bb center', linewidth=lw)

plot(50, color=black)

lc = crossover(rsi, bbl) //or crossover(rsi, bbc)
sc = crossunder(rsi, bbu)

last_pos = 0*close
if lc
    last_pos := 1
else
    last_pos := last_pos[1]
if sc
    last_pos := 2

last_price = 0*close
if last_pos[1] !=1 and last_pos == 1
    last_price := close
else
    last_price := last_price[1]
    
if last_pos==1 and close < last_price*sl
    lc:=false
    sc:=true
    last_pos:=2

if (lc)
    strategy.entry("long", strategy.long)

if (sc)
    strategy.entry("short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/435843

> Last Modified

2023-12-19 11:31:09
