
> Name

Schaff-Trend-Cycle

> Author

ChaoZhang

> Strategy Description



**backtest**

 ![IMG](https://www.fmz.com/upload/asset/120e989a66d1e794b0f.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|23|MACD Fast Length|
|v_input_2|50|MACD Slow Length|
|v_input_3|10|Cycle Length|
|v_input_4|3|1st %D Length|
|v_input_5|3|2nd %D Length|
|v_input_6_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|75|Upper Band|
|v_input_8|25|Lower Band|
|v_input_9|true|Highlight Breakouts ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-25 00:00:00
end: 2022-05-24 23:59:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// Copyright (c) 2018-present, Alex Orekhov (everget)
// Schaff Trend Cycle script may be freely distributed under the MIT license.
study("Schaff Trend Cycle", shorttitle="STC")

fastLength = input(title="MACD Fast Length", type=input.integer, defval=23)
slowLength = input(title="MACD Slow Length", type=input.integer, defval=50)
cycleLength = input(title="Cycle Length", type=input.integer, defval=10)
d1Length = input(title="1st %D Length", type=input.integer, defval=3)
d2Length = input(title="2nd %D Length", type=input.integer, defval=3)
src = input(title="Source", type=input.source, defval=close)
upper = input(title="Upper Band", type=input.integer, defval=75)
lower = input(title="Lower Band", type=input.integer, defval=25)
highlightBreakouts = input(title="Highlight Breakouts ?", type=input.bool, defval=true)

macd = ema(src, fastLength) - ema(src, slowLength)
k = nz(fixnan(stoch(macd, macd, macd, cycleLength)))
d = ema(k, d1Length)
kd = nz(fixnan(stoch(d, d, d, cycleLength)))
stc = ema(kd, d2Length)
stc := max(min(stc, 100), 0)

stcColor1 = stc > stc[1] ? color.green : color.red
stcColor2 = stc > upper ? color.green : stc <= lower ? color.red : color.orange

stcColor = highlightBreakouts ? stcColor2 : stcColor1
stcPlot = plot(stc, title="STC", color=stcColor, transp=0)

upperLevel = plot(upper, title="Upper", color=color.gray)
hline(50, title="Middle", linestyle=hline.style_dotted)
lowerLevel = plot(lower, title="Lower", color=color.gray)

fill(upperLevel, lowerLevel, title="Middle Zone", color=#f9cb9c, transp=90)

upperFillColor = stc > upper and highlightBreakouts ? color.green : na
lowerFillColor = stc < lower and highlightBreakouts ? color.red : na

fill(upperLevel, stcPlot, color=upperFillColor, transp=80)
fill(lowerLevel, stcPlot, color=lowerFillColor, transp=80)

buySignal = crossover(stc, lower)
sellSignal = crossunder(stc, upper)
upperCrossover = crossover(stc, upper)
upperCrossunder = crossunder(stc, upper)
lowerCrossover = crossover(stc, lower)
lowerCrossunder = crossunder(stc, lower)

plotshape(upperCrossunder ? upper : na, title="Sell Signal", location=location.absolute, style=shape.circle, size=size.tiny, color=color.red, transp=0)
plotshape(lowerCrossover ? lower : na, title="Buy Signal", location=location.absolute, style=shape.circle, size=size.tiny, color=color.green, transp=0)

alertcondition(buySignal, title="Alert: Buy", message="STC: Buy!\nSymbol: {{exchange}}:{{ticker}}\nPrice: {{close}}")
alertcondition(sellSignal, title="Alert: Sell", message="STC: Sell!\nSymbol: {{exchange}}:{{ticker}}\nPrice: {{close}}")
alertcondition(upperCrossover, title="Alert: Upper Band Crossover", message="STC: Upper Band Crossover!\nSymbol: {{exchange}}:{{ticker}}\nPrice: {{close}}")
alertcondition(upperCrossunder, title="Alert: Upper Band Crossunder", message="STC: Upper Band Crossunder!\nSymbol: {{exchange}}:{{ticker}}\nPrice: {{close}}")
alertcondition(lowerCrossover, title="Alert: Lower Band Crossover", message="STC: Lower Band Crossover!\nSymbol: {{exchange}}:{{ticker}}\nPrice: {{close}}")
alertcondition(lowerCrossunder, title="Alert: Lower Band Crossunder", message="STC: Lower Band Crossunder!\nSymbol: {{exchange}}:{{ticker}}\nPrice: {{close}}")


if buySignal
    strategy.entry("Enter Long", strategy.long)
else if sellSignal
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/365905

> Last Modified

2022-05-26 17:20:52
