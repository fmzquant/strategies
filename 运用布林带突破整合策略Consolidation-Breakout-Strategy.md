
> Name

运用布林带突破整合策略Consolidation-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15edec9f1c0cf8da958.png)

## Overview  

This strategy uses the Bollinger Bands indicator to determine if prices are in a consolidation period, and breakouts to determine entries and exits. Overall, this strategy mainly takes advantage of the violent moves brought by price consolidations to make profits.  

## Strategy Logic  

The strategy first calculates the 20-day simple moving average of the closing price as the middle band of the Bollinger Bands, and 2 times the standard deviation as the band width. A close above the upper band indicates an upper band breakout, while a close below the lower band indicates a lower band breakout.  

When prices are between the upper and lower Bollinger Bands, it is considered a consolidation period. When a breakout signal is detected, go long. When prices break below the lower band again, close the position. Going short works similarly.  

The stop loss is set at 2 times the ATR indicator.

## Advantage Analysis

The main advantages of this strategy are:

1. Taking advantage of violent moves brought by price consolidations for potentially huge profits  
2. Bollinger Bands indicator is intuitive and easy to optimize parameters
3. Following major trends, avoiding buying tops and selling bottoms

## Risk Analysis  

There are also some risks:

1. Breakout signals may turn out to be false breaks, causing losses
2. Stop loss set too wide, leading to large losses
3. Bollinger Bands parameters set improperly, losing effectiveness

Counter measures:

1. Add volume filters to detect false breaks 
2. Optimize stop loss range to limit losses  
3. Test different BB parameters to find optimum  

## Optimization Directions

Some ways to improve the strategy:

1. Add more indicators to consolidate detection rules to avoid false signals
2. Add trend filter to determine long/short based on trend direction 
3. Enhance stop loss methods like trailing stop to better control risks

## Conclusion  

The strategy is simple and straight forward, profiting from energy buildup during consolidations. Huge optimization space exists around entry rules, stop loss methods etc to obtain more steady profits while controlling risks.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Bollinger Bands Length|
|v_input_2|2|Bollinger Bands Multiplier|
|v_input_float_1|true|Risk per Trade (%)|
|v_input_float_2|2|Stop Loss Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Consolidation Breakout Strategy", shorttitle="CBS", overlay=true)

// Parameters
length = input(20, title="Bollinger Bands Length")
mult = input(2.0, title="Bollinger Bands Multiplier")
risk = input.float(1, title="Risk per Trade (%)") / 100

// Calculate Bollinger Bands
basis = ta.sma(close, length)
dev = mult * ta.stdev(close, length)
upper = basis + dev
lower = basis - dev

// Entry Conditions
consolidating = ta.crossover(close, upper) and ta.crossunder(close, lower)

// Exit Conditions
breakout = ta.crossover(close, upper) or ta.crossunder(close, lower)

// Risk Management
atrVal = ta.atr(14)
stopLoss = atrVal * input.float(2, title="Stop Loss Multiplier", minval=0.1, maxval=5)

// Entry and Exit Conditions
longEntry = breakout and close > upper
shortEntry = breakout and close < lower

if (longEntry)
    strategy.entry("Long", strategy.long)

if (shortEntry)
    strategy.entry("Short", strategy.short)

if (longEntry and close < basis - stopLoss)
    strategy.close("Long Exit")

if (shortEntry and close > basis + stopLoss)
    strategy.close("Short Exit")

// Plot Entry and Exit Points
plotshape(consolidating, style=shape.triangleup, location=location.belowbar, color=color.rgb(30, 255, 0), title="Entry Signal")
plotshape(breakout, style=shape.triangledown, location=location.abovebar, color=color.rgb(255, 0, 0), title="Exit Signal")


```

> Detail

https://www.fmz.com/strategy/440542

> Last Modified

2024-01-31 15:08:46
