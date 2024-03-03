
> Name

Playing-the-cross

> Author

ChaoZhang

> Strategy Description

For this script i used Kijun-sen from Ichimoku Cloud and Moving Average.

Kijun-sen is the base line of the Ichimoku Cloud or the midpoint price of the last 26 period.
Moving Average is a constantly updated average price of a given range.
In this script i used the standard Kijun-sen settings and the Moving Average, 55 length.

You will get an red or green signal when the lines cross each other.
Try the indicator yourself to see, why it could be useful.




A special thanks to @norok and @happyCloud1537 for teaching me!
This will lead to more scripts from my side, since i really like to code and trade.

**backtest**
 ![IMG](https://www.fmz.com/upload/asset/10f6d717693fae6f57a.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|26|Kijun-Sen length|
|v_input_int_2|55|EMA length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Glenn234

//@version=5
indicator("Playing the cross", shorttitle="PtC", overlay=true)

// Ichimoku code - Kijun-Sen
basePeriods = input.int(26, minval=1, title="Kijun-Sen length")
donchian(len) => math.avg(ta.lowest(len), ta.highest(len))

KijunSen = donchian(basePeriods)
plot(KijunSen, color=color.green, title="Kijun-Sen")


// Moving Average Exponential code
len = input.int(55, minval=1, title="EMA length")
src = input(close, title="Source")

MovingAverage = ta.ema(src, len)
plot(MovingAverage, title="EMA", color=color.red)


// Cross code
Up = MovingAverage > KijunSen and MovingAverage[1] < KijunSen[1]
Down = MovingAverage < KijunSen and MovingAverage[1] > KijunSen[1]

bgcolor(Up ? color.new(color.green, 60) : na, title="Up Cross")
bgcolor(Down ? color.new(color.red, 60) : na, title="Down Cross")

if Down
    strategy.entry("Enter Long", strategy.long)
else if Up
    strategy.entry("Enter Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/362427

> Last Modified

2022-05-11 15:07:20
