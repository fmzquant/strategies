
> Name

Cross-Timeframe-Double-Breakout-Levels-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18ada0b2e7e11fc2588.png)


## Overview

This is a strategy that utilizes key levels on different timeframes to generate double breakout trading signals. It can enter long or short positions when trend prices break through key support or resistance levels to capture mid-to-long term trends.

## Strategy Logic

The strategy analyzes price action simultaneously on two different timeframes (tf and tf2), with tf being the longer timeframe reflecting the mid-to-long term trend, and tf2 being the shorter timeframe reflecting short-term moves. The strategy monitors the following trading signals:

1. When price breaks above the level (level) on tf timeframe, record up1=true
2. When price breaks below the level on tf timeframe, record dn1=true
3. When price breaks above the level (level2) on tf2 timeframe, record up2=true  
4. When price breaks below the level on tf2 timeframe, record dn2=true

The trading signal is formed when up1 and up2 are true together, indicating long and short term are both bullish, go long; when dn1 and dn2 are both true, indicating long and short term both bearish, go short.

The strategy also incorporates some filters such as inverse scalping and color candlesticks to avoid wrong signals from non-trending breakouts.

Overall, the strategy takes full advantage of multi-timeframe analysis, ensuring the mid-to-long term trend meets expectations while avoiding interference from short-term market noise, generating high quality trading signals.

## Advantage Analysis

1. Catch mid-to-long term trends by breaking key levels

   By monitoring key level breakouts across two timeframes, it can capture clear entry signals at trend initiation stages.
   
2. Dual confirmation significantly reduces false signals

   Requiring concurrent breakouts on two different timeframes greatly lowers false signals from random fluctuations, improving signal quality.
   
3. Filters such as inverse scalps and color candlesticks

   Adding inverse scalping and color candle filters can remove some low quality breakout signals and prevent huge losses.
   
4. Simple parameter settings

   The strategy only needs two timeframe parameters to function, offers flexible tuning for different products.

5. Easy to understand and optimize

   The clear structure makes it easy to understand the logic, and parameters can be adjusted based on market conditions for optimization.

## Risk Analysis

1. Delayed entry due to dual breakout

   Compared to single breakout, dual breakout may cause some entry delay, missing early strong trend profits.

2. Key level selection

   Selecting suitable key levels for different products and market cycles is very important, otherwise it may generate false signals.
   
3. Breakout failure

   Even with dual breakout, there is still a chance of breakout failure and fast pullback, causing losses.

4. Loss from trend reversal

   Late trend entries may face sudden reversal, unable to exit in time through stop loss and incur large losses.

5. Difficult parameter optimization

   Although simple, finding the optimal parameter set still requires extensive testing, with high optimization difficulty.

## Optimization Directions

1. Add stop loss strategies

   Can set trailing stop or time stop to stop loss before loss gets too big.

2. Optimize filters

   Can test different inverse scalp amplitude parameters or other filter methods.
   
3. Dynamic key levels

   Make key levels change dynamically with market shifts rather than static levels.

4. Multi-product parameter optimization

   Use machine learning to optimize best parameter sets for different products.

5. Add volume confirmation

   Incorporate volume confirmation to avoid false breakout signals without volume.

## Summary

Overall this is a simple and practical trend following strategy. By analyzing two timeframes it enters on mid-to-long term direction conformity to filter noise effectively. The signals are clear and easy to interpret, with intuitive parameter settings. But it also has issues like mistimed entry, difficulty selecting key levels. In summary, this strategy works better as a trend validation tool to combine with other factors, but still has much room for optimization as a standalone trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Capital, %|
|v_input_4|W|timeframe 1|
|v_input_5|D|timeframe 2|
|v_input_6_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_7|true|antipila|
|v_input_8|true|color filter|
|v_input_9|1900|From Year|
|v_input_10|2100|To Year|
|v_input_11|true|From Month|
|v_input_12|12|To Month|
|v_input_13|true|From day|
|v_input_14|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-11-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Levels Strategy v1.0", shorttitle = "Levels str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
tf = input('W',  title = "timeframe 1")
tf2 = input('D',  title = "timeframe 2")
src = input(ohlc4, "Source")
ap = input(true, defval = true, title = "antipila")
cf = input(true, defval = true, title = "color filter")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Signals
level = request.security(syminfo.tickerid, tf, src[1])
level2 = request.security(syminfo.tickerid, tf2, src[1])
plot(level, linewidth = 3, color = silver)
plot(level2, linewidth = 3, color = gray)
up1 = close > level and ap == false ? true : low > level ? true : false
dn1 = close < level and ap == false ? true : high < level ? true : false
up2 = close > level2 and ap == false ? true : low > level2 ? true : false
dn2 = close < level2 and ap == false ? true : high < level2 ? true : false

//Trading
lot = strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]

if up1 and up2 and (close < open or cf == false)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if dn1 and dn2 and (close > open or cf == false)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/432232

> Last Modified

2023-11-15 17:27:36
