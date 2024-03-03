
> Name

BB-RSI-ADX-Entry-Points

> Author

ChaoZhang

> Strategy Description

This is a combination of indicators used to find oversold and overbought entry points for possible reversion.

A Green arrow will appear when all condition are met for an ENTER LONG position.
A Red arow will appear when all condition are met for an ENTER SHORT position.

You can modify all of these condition parameters from the indicator's settings.

How does the indicator work
The signals are using Bollinger Bands, BB %B, RSI and ADX indicators to try and find points of reversal

Enter LONG Conditions
Current candle low is below BB lower band.
The BB %B is more than 0.
RSI > 30
ADX > 25

Enter SHORT Conditions
Current candle high is above BB upper band.
The BB %B is less than 1.
RSI < 70
ADX > 25

Those are the default settings that seem to work for me but you can customize all of these from the indicator settings.
I find this strategy to best work on a 3 minute timeframe

Note: The bb %B is calculated for stDev - 1. This will help you see a change happening faster.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/95057c5dafb05dd468.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|(?BB Settings)BB Length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|14|(?RSI Settings)RSI Length|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|14|(?ADX Settings)ADX Smoothing|
|v_input_3|14|ADX DI Length|
|v_input_7|25|ADX Min Strength|
|v_input_4|false|(?Enter LONG Conditions)Minimum BB %B|
|v_input_5|30|MIN RSI|
|v_input_6|50|MAX RSI|
|v_input_8|true|(?Enter SHORT Conditions)Highest BB %B|
|v_input_9|50|MIN RSI|
|v_input_10|70|MAX RSI|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-10 00:00:00
end: 2022-05-09 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
indicator(shorttitle="BB-RSI-ADX", title="BB-RSI-ADX Entry Points", overlay=true, timeframe="", timeframe_gaps=true)

// Bollinger Bands Setup
bbLength = input.int(9, minval=1, title="BB Length", group="BB Settings")
src = input(close, title="Source", group="BB Settings")
stDev = input.float(2.0, minval=0.001, maxval=50, title="StdDev", group="BB Settings")
basis = ta.sma(src, bbLength)
dev = stDev * ta.stdev(src, bbLength)
devMinOne = (stDev > 1 ? stDev - 1 : 1) * ta.stdev(src, bbLength)
upper = basis + dev
lower = basis - dev
upperMinOne = basis + devMinOne
lowerMinOne = basis - devMinOne

plot(basis, "Basis", color=#FF6D00)
p1 = plot(upper, "BB  Upper", color=#2962FF)
p2 = plot(lower, "BB Lower", color=#2962FF)
fill(p1, p2, title = "BB Background", color=color.rgb(33, 150, 243, 95))

// BB width %B
bbr = (src - lowerMinOne)/(upperMinOne - lowerMinOne)

// RSI
rsiLengthInput = input.int(14, minval=1, title="RSI Length", group="RSI Settings")
rsiSourceInput = input.source(close, "Source", group="RSI Settings")
rsiUp = ta.rma(math.max(ta.change(rsiSourceInput), 0), rsiLengthInput)
rsiDown = ta.rma(-math.min(ta.change(rsiSourceInput), 0), rsiLengthInput)
rsi = rsiDown == 0 ? 100 : rsiUp == 0 ? 0 : 100 - (100 / (1 + rsiUp / rsiDown))

// ADX
adxlen = input(14, title="ADX Smoothing", group="ADX Settings")
dilen = input(14, title="ADX DI Length", group="ADX Settings")
dirmov(len) =>
	up = ta.change(high)
	down = -ta.change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = ta.rma(ta.tr, len)
	plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
	minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
adxStr = adx(dilen, adxlen)

// Entry condition inputs
c_enter_long_bbr = input(0, title="Minimum BB %B", group="Enter LONG Conditions", tooltip="The Minimum required BB %B required to enter a LONG position. RECOMMENDED: 0")
c_enter_long_rsi_min = input(30, title="MIN RSI", group="Enter LONG Conditions", tooltip="The Minimum RSI value to enter a LONG position. RECOMMENDED: 30", inline="rsi_long")
c_enter_long_rsi_max = input(50, title="MAX RSI", group="Enter LONG Conditions", tooltip="The Maximum RSI value to enter a LONG position. RECOMMENDED: 50", inline="rsi_long")
c_adx_min_str = input(25, title="ADX Min Strength", group="ADX Settings")

c_enter_short_bbr = input(1, title="Highest BB %B", group="Enter SHORT Conditions", tooltip="The Highest required BB %B required to enter a SHORT position. RECOMMENDED: 1")
c_enter_short_rsi_min = input(50, title="MIN RSI", group="Enter SHORT Conditions", tooltip="The Minimum RSI value to enter a SHORT position. RECOMMENDED: 50", inline="rsi_short")
c_enter_short_rsi_max = input(70, title="MAX RSI", group="Enter SHORT Conditions", tooltip="The Maximum RSI value to enter a SHORT position. RECOMMENDED: 70", inline="rsi_short")

// Enter Long Conditions
enter_long = (low < lower) and (bbr > c_enter_long_bbr) and (rsi > c_enter_long_rsi_min) and (rsi < c_enter_long_rsi_max) and (adxStr > c_adx_min_str)  ? 1 : 0
// Enter Short Conditions
enter_short = (high > upper) and (bbr < c_enter_short_bbr) and (rsi > c_enter_short_rsi_min) and (rsi < c_enter_short_rsi_max) and (adxStr > c_adx_min_str)  ? -1 : 0


//plotarrow(enter_long, maxheight=10)    

//plotarrow(enter_short, maxheight=10)    




if enter_long
    strategy.entry("Enter Long", strategy.long)
else if enter_short
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362403

> Last Modified

2022-05-11 12:42:28
