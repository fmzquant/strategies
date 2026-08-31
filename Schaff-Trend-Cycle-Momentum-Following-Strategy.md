
> Name

Schaff-Trend-Cycle-Momentum-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/96643d37ea5f06860a.png)

## Overview

This strategy is based on the Schaff Trend Cycle indicator, combined with the overbought and oversold principles of the Stoch RSI, to determine and follow trends using momentum metrics. It goes long when the price breaks out of the oversold region into the overbought region, and goes short when the price breaks down from the overbought region into the oversold region. The strategy dynamically adjusts positions by capturing changes in price trends.

## Strategy Logic

- 1. Calculate the MACD, where the default Fast Length is 23 and Slow Length is 50. MACD reflects the difference between short and long term moving averages to judge price momentum.

- 2. Apply Stoch RSI to the MACD to form the K value, where the default Cycle Length is 10, reflecting overbought/oversold levels of the MACD momentum metric.

- 3. Take the weighted moving average of K to form D, where the default 1st %D Length is 3, to remove noise from K.

- 4. Apply Stoch RSI again to D to form the initial STC value, where the default 2nd %D Length is 3, to create precise overbought/oversold signals. 

- 5. Take the weighted moving average of the initial STC to get the final STC value, ranging from 0-100. STC above 75 is overbought, below 25 oversold.

- 6. Go long when STC crosses above 25 upwards, and short when STC crosses downwards past 75.

## Advantages

- 1. STC's design combining Stoch RSI clearly identifies overbought/oversold regions, forming strong trend signals.

- 2. The double Stoch RSI filtering effectively removes false breakouts. 

- 3. STC's standardized 0-100 range allows straightforward mechanized trade signals.

- 4. The backtest implements visual breakout markings and text popup alerts for clear and intuitive signal capturing.

- 5. Optimized default parameters avoid oversensitive signals and needless trades.

## Risks

- 1. STC is parameter sensitive. Different coins and timeframes require parameter tuning to suit market characteristics.

- 2. Breakout strategies are prone to traps, requiring stops to control risk.

- 3. Low liquidity false breakouts may generate bad signals, needing volume filter.

- 4. STC alone risks reversals. Confirmation using other factors is needed.

- 5. Key support/resistance levels should be watched to avoid bad signals.

## Enhancement Opportunities

- 1. Optimize MACD parameters for different periods and coins.

- 2. Refine Stoch RSI K and D values to smooth STC curve. 

- 3. Add volume filter to avoid low liquidity false breakouts.

- 4. Incorporate additional indicators to confirm signals, e.g. Bollinger Bands.

- 5. Add stop mechanisms like moving/ATR stops. 

- 6. Adjust entry, e.g. enter on pullback after breakout for trend confirmation.

## Conclusion

The Schaff Trend Cycle strategy identifies overbought/oversold via momentum metrics to determine short-term price trend changes. Though simple and adjustable, it risks traps. Confirmation and stops aid optimization for strong trends.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|23|MACD Fast Length|
|v_input_2|50|MACD Slow Length|
|v_input_3|10|Cycle Length|
|v_input_4|3|1st %D Length|
|v_input_5|3|2nd %D Length|
|v_input_6_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|true|Highlight Breakouts ?|
|v_input_8|75|upper|
|v_input_9|25|lower|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Copyright (c) 2018-present, Alex Orekhov (everget)
// Schaff Trend Cycle script may be freely distributed under the MIT license.
strategy("Schaff Trend Cycle", shorttitle="STC Backtest", overlay=true)

fastLength = input(title="MACD Fast Length",  defval=23)
slowLength = input(title="MACD Slow Length",  defval=50)
cycleLength = input(title="Cycle Length",  defval=10)
d1Length = input(title="1st %D Length",  defval=3)
d2Length = input(title="2nd %D Length",  defval=3)
src = input(title="Source",  defval=close)
highlightBreakouts = input(title="Highlight Breakouts ?", type=bool, defval=true)

macd = ema(src, fastLength) - ema(src, slowLength)

k = nz(fixnan(stoch(macd, macd, macd, cycleLength)))

d = ema(k, d1Length)

kd = nz(fixnan(stoch(d, d, d, cycleLength)))

stc = ema(kd, d2Length)
stc := 	stc > 100 ? 100 : stc < 0 ? 0 : stc

//stcColor = not highlightBreakouts ? (stc > stc[1] ? green : red) : #ff3013
//stcPlot = plot(stc, title="STC", color=stcColor, transp=0)

upper = input(75, defval=75)
lower = input(25, defval=25)

transparent = color(white, 100)

upperLevel = plot(upper, title="Upper", color=gray)
// hline(50, title="Middle", linestyle=dotted)
lowerLevel = plot(lower, title="Lower", color=gray)

fill(upperLevel, lowerLevel, color=#f9cb9c, transp=90)

upperFillColor = stc > upper and highlightBreakouts ? green : transparent
lowerFillColor = stc < lower and highlightBreakouts ? red : transparent

//fill(upperLevel, stcPlot, color=upperFillColor, transp=80)
//fill(lowerLevel, stcPlot, color=lowerFillColor, transp=80)

long =  crossover(stc, lower) ? lower : na
short = crossunder(stc, upper) ? upper : na

long_filt = long and not short
short_filt = short and not long

prev = 0
prev := long_filt ? 1 : short_filt ? -1 : prev[1]

long_final = long_filt and prev[1] == -1
short_final = short_filt and prev[1] == 1

strategy.entry("long", strategy.long, when = long )
strategy.entry("short", strategy.short, when = short)

plotshape(crossover(stc, lower) ? lower : na, title="Crossover", location=location.absolute, style=shape.circle, size=size.tiny, color=green, transp=0)
plotshape(crossunder(stc, upper) ? upper : na, title="Crossunder", location=location.absolute, style=shape.circle, size=size.tiny, color=red, transp=0)

alertcondition(long_final, "Long", message="Long")
alertcondition(short_final,"Short", message="Short")

plotshape(long_final, style=shape.arrowup, text="Long", color=green, location=location.belowbar)
plotshape(short_final, style=shape.arrowdown, text="Short", color=red, location=location.abovebar)

```

> Detail

https://www.fmz.com/strategy/430757

> Last Modified

2023-11-01 16:08:35
