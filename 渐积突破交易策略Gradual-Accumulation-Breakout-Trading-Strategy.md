
> Name

渐积突破交易策略Gradual-Accumulation-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13c7cefbdce2880e198.png)


### Overview

The Gradual Accumulation Breakout Trading Strategy aims to identify potential accumulation and distribution phases in the market using the principles of Wyckoff analysis, supplemented by the detection of spring and upthrust patterns, to seek potential buying and selling opportunities.

### Strategy Logic

1. Use moving average crossovers of different lengths to identify accumulation and distribution phases. When the close price crosses above the MA of length AccumulationLength, it indicates an accumulation phase. When the close price crosses below the MA of length DistributionLength, it indicates a distribution phase.

2. Use moving average crossovers of different lengths to identify spring and upthrust patterns. When the low price crosses above the MA of length SpringLength, it indicates a spring. When the high price crosses below the MA of length UpthrustLength, it indicates an upthrust. 

3. Go long when a spring is observed during an accumulation phase. Go short when an upthrust is observed during a distribution phase.

4. Set stop loss levels. The long stop loss is set at close * (1 - Stop Percentage%). The short stop loss is set at close * (1 + Stop Percentage%).

5. Plot shapes on the chart to indicate identified accumulation, distribution, spring and upthrust patterns for easy visual recognition.

### Advantage Analysis 

1. Identifying accumulation and distribution phases using Wyckoff analysis improves reliability of trading signals.

2. Confirming signals with spring and upthrust patterns provides further validation. 

3. The stop loss helps control single trade loss.

4. Chart annotations clearly reveal the whole process of price coiling.

5. The adjustable parameters make this strategy optimizable across markets and timeframes.

### Risk Analysis

1. Whipsaws may generate false signals during choppy price action.

2. Spring and upthrust may fail occasionally. 

3. Stop loss being taken out could increase losses.

4. Incompatible parameters for different markets may cause incorrect signals.

5. Mechanical systems lack flexible discretionary control.

### Optimization Directions

1. Test optimal parameter combinations across markets and timeframes.

2. Consider incorporating volume for signal confirmation.

3. Set dynamic stops based on market volatility.

4. Incorporate fundamental factors to avoid signals at major events. 

5. Apply machine learning to dynamically optimize parameters.

### Summary

The Gradual Accumulation Breakout Trading Strategy integrates Wyckoff analysis, moving averages, pattern recognition and other techniques to effectively identify coiling price action and generate trading signals. It has reliable signals, controlled risks, clear visuals and other advantages. As a mechanical system, its discretion and adaptability need improvement. Future optimizations involve parameter optimization, volume confirmation, stop loss enhancement, fundamental filters and more. Overall, this strategy provides effective decision support for intraday trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|32|Accumulation|
|v_input_2|35|Distribution|
|v_input_3|10|Spring|
|v_input_4|20|Upthrust|
|v_input_5|10|Stop Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © deperp

//@version=5
strategy("Wyckoff Range Strategy",  overlay=true, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=10, commission_type=strategy.commission.percent)

// Input Variables
AccumulationLength = input(32, "Accumulation")
DistributionLength = input(35, "Distribution")
SpringLength = input(10, "Spring")
UpthrustLength = input(20, "Upthrust")
stopPercentage = input(10, "Stop Percentage")

// Accumulation Phase
isAccumulation = ta.crossover(close, ta.sma(close, AccumulationLength))

// Distribution Phase
isDistribution = ta.crossunder(close, ta.sma(close, DistributionLength))

// Spring and Upthrust
isSpring = ta.crossover(low, ta.sma(low, SpringLength))
isUpthrust = ta.crossunder(high, ta.sma(high, UpthrustLength))

// Strategy Conditions
enterLong = isAccumulation and isSpring
exitLong = isDistribution and isUpthrust

enterShort = isDistribution and isUpthrust
exitShort = isAccumulation and isSpring

// Entry and Exit Conditions
if (enterLong)
    strategy.entry("Long", strategy.long)
    
if (exitLong)
    strategy.close("Long")

if (enterShort)
    strategy.entry("Short", strategy.short)

if (exitShort)
    strategy.close("Short")

// Stop Loss
stopLossLevelLong = close * (1 - stopPercentage / 100)
stopLossLevelShort = close * (1 + stopPercentage / 100)
strategy.exit("Stop Loss Long", "Long", stop=stopLossLevelLong)
strategy.exit("Stop Loss Short", "Short", stop=stopLossLevelShort)

// Plotting Wyckoff Schematics
plotshape(isAccumulation, title="Accumulation Phase", location=location.belowbar, color=color.green, style=shape.labelup, text="Accumulation")
plotshape(isDistribution, title="Distribution Phase", location=location.abovebar, color=color.red, style=shape.labeldown, text="Distribution")
plotshape(isSpring, title="Spring", location=location.belowbar, color=color.blue, style=shape.triangleup)
plotshape(isUpthrust, title="Upthrust", location=location.abovebar, color=color.orange, style=shape.triangledown)
```

> Detail

https://www.fmz.com/strategy/430169

> Last Modified

2023-10-25 17:34:41
