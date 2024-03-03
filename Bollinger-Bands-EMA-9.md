
> Name

Bollinger-Bands-EMA-9

> Author

ChaoZhang

> Strategy Description


This code is written in Pine Script, which is used for customizing charts on the TradingView platform. It seems to define a scalping strategy using Bollinger Bands and a 9 period EMA (Exponential Moving Average). Let me break down some crucial parts for you.

1. EMA calculation and plotting:

   `ema9 = ta.ema(close, 9) plot(ema9)`

This produces a line chart of the 9-day EMA.

2. Bollinger Bands calculation and strategy definition: 

  `strategy("Bollinger Bands + EMA 9", overlay=true) length = input.int(20, minval=1) src = input(close, title="Source") mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev") basis = ta.sma(src, length) dev = mult * ta.stdev(src, length) upper = basis + dev lower = basis - dev offset = input.int(0, "Offset", minval = -500, maxval = 500) p1 = plot(upper, "Upper", color=#2962FF, offset = offset) p2 = plot(lower, "Lower", color=#2962FF, offset = offset) fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))`

It calculates the upper and lower Bollinger Bands, plots them and fills the area in-between.

3. Defines when to enter and exit a long trade:

   `Exit = close >= ema9 Long = (close[1] <lower) strategy.entry("Long",strategy.long, 1000, when =Long) strategy.close("Long", when=add)`

This part enters a LONG position when the closing price breaches the lower band and exits when the closing price is equal to or above the 9-day EMA.

Please note that you need to adjust this script according to your personal risk tolerance and preferences. Also, its performance in live trading environments may vary. Always backtest any trading strategies before you proceed to real trading.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-01 00:00:00
end: 2023-09-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © D499

//@version=5
//EMA
ema9 = ta.ema(close, 9)
plot(ema9)
//BB
strategy("Bollinger Bands + EMA 9", overlay=true)
length = input.int(20, minval=1)
src = input(close, title="Source")
mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input.int(0, "Offset", minval = -500, maxval = 500)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))

Exit = close >= ema9
Long = (close[1] < lower)
strategy.entry("Long",strategy.long, 1, when = Long)
strategy.close("Long", when = Exit)
```

> Detail

https://www.fmz.com/strategy/426137

> Last Modified

2023-09-08 16:00:29
