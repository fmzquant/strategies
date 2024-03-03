
> Name

Parabolic-SAR

> Author

ChaoZhang

> Strategy Description

This is a redesign of the built-in Parabolic SAR indicator. I added a proper input system, an option to highlight initial points for both lines and an option to choose points width. So, customize it as you want.

Parabolic SAR was originally developed by J. Welles Wilder and described in his book "New Concepts in Technical Trading Systems" (1978). It is a trend-following indicator that can be used as a trailing stop loss.

To know which settings for PSAR are the most profitable on your instrument and timeframe you can use this tool


**backtest**
 ![IMG](https://www.fmz.com/upload/asset/18fc8e68728079fd29f.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|Start|
|v_input_2|0.02|Increment|
|v_input_3|0.2|Maximum|
|v_input_4|2|Point Width|
|v_input_5|true|Highlight Start Points ?|
|v_input_6|true|Show Buy/Sell Labels ?|
|v_input_7|true|Highlight State ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-30 00:00:00
end: 2022-05-29 23:59:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// Copyright (c) 2019-present, Alex Orekhov (everget)
// Parabolic SAR script may be freely distributed under the terms of the GPL-3.0 license.
study("Parabolic SAR", shorttitle="PSAR", overlay=true)

start = input(title="Start", type=input.float, step=0.001, defval=0.02)
increment = input(title="Increment", type=input.float, step=0.001, defval=0.02)
maximum = input(title="Maximum", type=input.float, step=0.01, defval=0.2)
width = input(title="Point Width", type=input.integer, minval=1, defval=2)
highlightStartPoints = input(title="Highlight Start Points ?", type=input.bool, defval=true)
showLabels = input(title="Show Buy/Sell Labels ?", type=input.bool, defval=true)
highlightState = input(title="Highlight State ?", type=input.bool, defval=true)

psar = sar(start, increment, maximum)
dir = psar < close ? 1 : -1

psarColor = dir == 1 ? #3388bb : #fdcc02
psarPlot = plot(psar, title="PSAR", style=plot.style_circles, linewidth=width, color=psarColor, transp=0)

var color longColor = color.green
var color shortColor = color.red

buySignal = dir == 1 and dir[1] == -1
plotshape(buySignal and highlightStartPoints ? psar : na, title="Long Start", location=location.absolute, style=shape.circle, size=size.tiny, color=longColor, transp=0)
plotshape(buySignal and showLabels ? psar : na, title="Buy Label", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=longColor, textcolor=color.white, transp=0)

sellSignal = dir == -1 and dir[1] == 1
plotshape(sellSignal and highlightStartPoints ? psar : na, title="Short Start", location=location.absolute, style=shape.circle, size=size.tiny, color=shortColor, transp=0)
plotshape(sellSignal and showLabels ? psar : na, title="Sell Label", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=shortColor, textcolor=color.white, transp=0)

midPricePlot = plot(ohlc4, title="", display=display.none)

fillColor = highlightState ? (dir == 1 ? longColor : shortColor) : na
fill(midPricePlot, psarPlot, title="Trade State Filling", color=fillColor)

changeCond = dir != dir[1]
alertcondition(changeCond, title="Alert: PSAR Direction Change", message="PSAR has changed direction!")
alertcondition(buySignal, title="Alert: PSAR Long", message="PSAR Long")
alertcondition(sellSignal, title="Alert: PSAR Short", message="PSAR Sell")


if buySignal
    strategy.entry("Enter Long", strategy.long)
else if sellSignal
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/366942

> Last Modified

2022-05-31 19:01:00
