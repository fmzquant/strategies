
> Name

Trend-Reversal-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16c52841b79e0ca00f2.png)



### Overview

The Trend Reversal System is a trend following strategy that utilizes moving averages, CCI indicator and Supertrend indicator to identify the trend and enter on pullbacks. It can confirm the trend direction and provide entry signals during retracements.

### Strategy Logic

The strategy uses 21-period EMA as the short term moving average and 55-period EMA as the long term moving average. 21 EMA above 55 EMA indicates an upward trend, while 21 EMA below 55 EMA indicates a downward trend.

The CCI indicator shows when the price has reached extreme levels. Level 1 signal is when CCI reaches 100/-100 by default, level 2 is 140/-140 and level 3 is 180/-180. This suggests overbought or oversold conditions.

The Supertrend indicator determines the specific trend direction. It incorporates ATR to identify the stop loss and entry levels for uptrends and downtrends.

When 21 EMA is above 55 EMA and CCI reaches low level (oversold area), it can signal long entry. When 21 EMA is below 55 EMA and CCI reaches high level (overbought area), it can signal short entry. The stop loss is set at Supertrend's stop level, and take profit is fixed at 400 pips.

### Advantage Analysis 

The strategy combines multiple indicators to identify trends and overbought/oversold situations, which helps filter false breakouts. The fixed take profit allows stable risk-reward ratio. Trading with the trend provides higher win rate. CCI overbought/oversold signals offer good entry timing during trend retracements.

### Risk Analysis

The parameters need to be optimized for different symbols as the current settings may not be ideal. The stop loss method is crude and unable to adapt to different market conditions. Fixed take profit fails to adjust based on market volatility. CCI can generate false signals sometimes. Need further judgment on the momentum of the trend to avoid whipsaws.

### Optimization Directions

Test parameter settings on different symbols, optimize MA periods, ATR period, ATR multiplier etc. Consider trailing stop or ATR stop for adaptive stop loss. Test ATR-based take profit for dynamic profit target. Add filters to check trend momentum when taking CCI signals to avoid choppy markets. Add quantifiable trend strength indicators for better trend validation.

### Summary

The Trend Reversal System combines moving averages, CCI and Supertrend to identify trends and overbought/oversold for retracement entries. It has relatively high stability and win rate, but the stop loss, take profit and trend validation mechanisms need further optimization for robustness across symbols and market conditions. Overall it uses a simple and direct approach to combine indicators for catching trend opportunities, and is worth researching more into and applying.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Short EMA|
|v_input_2|55|Long EMA|
|v_input_3|20|Overbought/sold detector period|
|v_input_4_close|0|Overbought/sold detector source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|100|Overbought level 1|
|v_input_6|140|Overbought level 2|
|v_input_7|180|Overbought level 3|
|v_input_8|-100|Oversold level 1|
|v_input_9|-140|Oversold level 2|
|v_input_10|-180|Oversold level 3|
|v_input_11|55|ATR Period|
|v_input_12|5|ATR Multiplier|
|v_input_13|true|Take Wicks into Account ?|
|v_input_14|false|Illuminate Trend|
|v_input_15|0.0002|Spread|
|v_input_16|true|Test longs|
|v_input_17|true|Test shorts|
|v_input_18|true|Test level 1 overbought/sold levels|
|v_input_19|false|Test level 2 overbought/sold levels|
|v_input_20|false|Test level 3 overbought/sold levels|
|v_input_21|true|Use static target|
|v_input_22|400|Static target in pips|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-16 00:00:00
end: 2023-01-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © greenmask9

//@version=4
strategy("Oath", overlay=true)

// 21 EMA
emalength = input(21, title="Short EMA")
emashort = ema(close, emalength)

// 55 EMA
emalength2 = input(55, title="Long EMA")
ema = ema(close, emalength2)

//CCI calculation and inputs
lengthcci = input(20, minval=1, title="Overbought/sold detector period")
src = input(close, title="Overbought/sold detector source")
ma = sma(src, lengthcci)
ccivalue = (src - ma) / (0.015 * dev(src, lengthcci))


//CCI plotting
ccioverbought = input(defval=100, title="Overbought level 1")
ccioverbought2 = input(defval=140, title="Overbought level 2")
ccioverbought3 = input(defval=180, title="Overbought level 3")

ccioversold = input(defval=-100, title="Oversold level 1")
ccioversold2 = input(defval=-140, title="Oversold level 2")
ccioversold3 = input(defval=-180, title="Oversold level 3")

//cciOB = (ccivalue >= ccioverbought and ccivalue < ccioverbought2)
//cciOS = (ccivalue <= ccioversold and ccivalue > ccioversold2)

//cciOB2 = (ccivalue >= ccioverbought2 and ccivalue < ccioverbought3)
//cciOS2 = (ccivalue <= ccioversold and ccivalue > ccioversold3)

//cciOB3 = (ccivalue >= ccioverbought3)
//cciOS3 = (ccivalue <= ccioversold3)

//Supertrend

length = input(title="ATR Period", type=input.integer, defval=55)
mult = input(title="ATR Multiplier", type=input.float, step=0.1, defval=5.0)
wicks = input(title="Take Wicks into Account ?", type=input.bool, defval=true)
illuminate = input(title="Illuminate Trend", type=input.bool, defval=false)

atr = mult * atr(length)

longStop = hl2 - atr
longStopPrev = nz(longStop[1], longStop)
longStop := (wicks ? low[1] : close[1]) > longStopPrev ? max(longStop, longStopPrev) : longStop

shortStop = hl2 + atr
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := (wicks ? high[1] : close[1]) < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop

dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and (wicks ? high : close) > shortStopPrev ? 1 : dir == 1 and (wicks ? low : close) < longStopPrev ? -1 : dir

//entries
uptrend = emashort>ema and dir == 1
upsignal = ccivalue<=ccioversold and ccivalue>ccioversold2
upsignal2 = ccivalue<=ccioversold2 and ccivalue>ccioversold3
upsignal3 = ccivalue<=ccioversold3
downtrend = emashort<ema and dir == -1
downsignal = ccivalue>=ccioverbought and ccivalue<ccioverbought2
downsignal2 = ccivalue>=ccioverbought2 and ccivalue<ccioverbought3
downsignal3 = ccivalue>=ccioverbought3

//adapts to the current bar, I need to save the bars number when the condition for buy was true, static number is spread
spread = input (0.00020, title="Spread")
upstoploss = longStop - spread
downstoploss = shortStop + spread
strategy.initial_capital = 50000
ordersize=floor(strategy.initial_capital/close)
testlong = input(title="Test longs", type=input.bool, defval=true)
testshort = input(title="Test shorts", type=input.bool, defval=true)
//new
degree = input(title="Test level 1 overbought/sold levels", type=input.bool, defval=true)
degree2 = input(title="Test level 2 overbought/sold levels", type=input.bool, defval=false)
degree3 = input(title="Test level 3 overbought/sold levels", type=input.bool, defval=false)

statictarget = input(title="Use static target", type=input.bool, defval=true)
statictargetvalue = input(title="Static target in pips", type=input.integer, defval=400)

//timetrade = input(title="Open trades only withing specified time", type=input.bool, defval=true)
//timtrade = input()

//přidat možnost TP podle ATR a sl podle ATR
buy1 = uptrend and upsignal and strategy.opentrades==0 and testlong and degree
x1 = barssince (buy1)
if (buy1)
//bodlo by zakázat atrtarget v tomto případě
    if (statictarget)
        strategy.entry("Oath1", strategy.long, ordersize)
        strategy.exit( "Oath1 Close", from_entry="Oath1" , profit=statictargetvalue,stop=upstoploss[x1])
 
buy2 = uptrend and upsignal2 and strategy.opentrades==0 and testlong and degree2
x2 = barssince (buy2)
if (buy2)
//bodlo by zakázat atrtarget v tomto případě
    if (statictarget)
        strategy.entry("Oath2", strategy.long, ordersize)
        strategy.exit( "Oath2 Close", from_entry="Oath2" , profit=statictargetvalue,stop=upstoploss[x2])
  
buy3 = uptrend and upsignal3 and strategy.opentrades==0 and testlong and degree3
x3 = barssince (buy3)
if (buy3)
//bodlo by zakázat atrtarget v tomto případě
    if (statictarget)
        strategy.entry("Oath3", strategy.long, ordersize)
        strategy.exit( "Oath3 Close", from_entry="Oath3" , profit=statictargetvalue,stop=upstoploss[x3])

sell1 = downtrend and downsignal and strategy.opentrades==0 and testshort and degree
y1 = barssince (sell1)
if (sell1)
    if (statictarget)
        strategy.entry("Oath1.s", strategy.short, ordersize)
        strategy.exit( "Oath1 Close", from_entry="Oath1.s" , profit=statictargetvalue,stop=downstoploss[y1])

sell2 = downtrend and downsignal2 and strategy.opentrades==0 and testshort and degree2
y2 = barssince (sell2)
if (sell2)
    if (statictarget)
        strategy.entry("Oath2.s", strategy.short, ordersize)
        strategy.exit( "Oath2 Close", from_entry="Oath2.s" , profit=statictargetvalue,stop=downstoploss[y2])

sell3 = downtrend and downsignal3 and strategy.opentrades==0 and testshort and degree3
y3 = barssince (sell3)
if (sell3)
    if (statictarget)
        strategy.entry("Oath3.s", strategy.short, ordersize)
        strategy.exit( "Oath3 Close", from_entry="Oath3.s" , profit=statictargetvalue,stop=downstoploss[y3])

plotshape(uptrend and upsignal and degree, location=location.belowbar, color=color.green, transp=0, style=shape.triangleup, size=size.tiny, text="Oath up")
plotshape(downtrend and downsignal and degree, location=location.abovebar, color=color.red, transp=0, style=shape.triangledown, size=size.tiny, text="Oath down")
plotshape(uptrend and upsignal2 and degree2, location=location.belowbar, color=color.green, transp=0, style=shape.triangleup, size=size.tiny, text="Oath up+")
plotshape(downtrend and downsignal2 and degree2, location=location.abovebar, color=color.red, transp=0, style=shape.triangledown, size=size.tiny, text="Oath down+")
plotshape(uptrend and upsignal3 and degree3, location=location.belowbar, color=color.green, transp=0, style=shape.triangleup, size=size.tiny, text="Oath up++")
plotshape(downtrend and downsignal3 and degree3, location=location.abovebar, color=color.red, transp=0, style=shape.triangledown, size=size.tiny, text="Oath down++")


```

> Detail

https://www.fmz.com/strategy/429967

> Last Modified

2023-10-23 17:18:28
