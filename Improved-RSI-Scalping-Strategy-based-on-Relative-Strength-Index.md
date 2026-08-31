
> Name

Improved-RSI-Scalping-Strategy-based-on-Relative-Strength-Index

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e14ef1edbe33a7226b.png)

## Overview

The core idea of this strategy is to combine the RSI indicator and custom AI conditions to discover trading opportunities. It will establish long or short positions when multiple conditions are met, and use fixed take profit and stop loss levels. 

## Trading Logic

The strategy is implemented through the following steps:

1. Calculate 14-period RSI values
2. Define two custom AI conditions (long and short) 
3. Combine AI conditions with RSI overbought/oversold zones to generate entry signals
4. Calculate position size based on risk percentage and stop loss pips
5. Compute take profit and stop loss price  
6. Enter positions when entry signals are triggered
7. Exit positions when take profit or stop loss is hit  

Additionally, the strategy will generate alerts on signal creation and plot RSI values on the chart.

## Advantage Analysis  

The strategy has several key advantages:

1. Combining RSI and AI conditions lead to more accurate trade signals  
2. Using multiple condition combinations effectively filters out false signals
3. Position sizing based on risk management principles controls per trade risk  
4. Fixed take profit/stop loss provides clarity on risk and reward  
5. Highly customizable through parameter tuning

## Risk Analysis

There are also some risks to consider:

1. Incorrect RSI parameters may lead to inaccurate signals
2. Poorly designed custom AI logic can generate false signals 
3. A stop loss level too tight may result in excessive stopping out 
4. Fixed take profit/stop loss may lose more profits or create more losses in volatile markets  

These can be mitigated by tuning RSI parameters, optimizing AI logic, relaxing stop loss distances, etc.

## Enhancement Opportunities

Some ways the strategy can be further improved:

1. Incorporate more custom AI conditions to determine trend based on multiple factors  
2. Optimize RSI parameters to find best combinations
3. Test different take profit/stop loss mechanisms like trailing stops or moving take profit  
4. Add additional filters like volume spikes to detect quality trading opportunities  
5. Employ machine learning to automatically generate optimal parameters  

## Summary

In summary, this is a highly configurable and optimizable advanced strategy for trading based on RSI and custom AI logic. It determines trend direction through a combination of multiple signal sources, executes trades with risk management and take profit/stop loss procedures. The strategy can provide good trading performance for users, with abundant expansion and optimization capabilities.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI Length|
|v_input_int_2|70|RSI Overbought Threshold|
|v_input_int_3|30|RSI Oversold Threshold|
|v_input_int_4|10|Take Profit (Pips)|
|v_input_int_5|5|Stop Loss (Pips)|
|v_input_float_1|true|Risk Percentage|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-28 00:00:00
end: 2024-01-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Improved RSI Scalping Strategy", overlay=true)

// Parameters
rsiLength = input.int(14, title="RSI Length")
rsiOverbought = input.int(70, title="RSI Overbought Threshold")
rsiOversold = input.int(30, title="RSI Oversold Threshold")
takeProfitPips = input.int(10, title="Take Profit (Pips)")
stopLossPips = input.int(5, title="Stop Loss (Pips)")
riskPercentage = input.float(1, title="Risk Percentage", minval=0, maxval=100, step=0.1)

// Calculate RSI
rsiValue = ta.rsi(close, rsiLength)

// Custom AI Conditions
aiCondition1Long = ta.crossover(rsiValue, 50)
aiCondition1Short = ta.crossunder(rsiValue, 50)

// Add more AI conditions here
var aiCondition2Long = ta.crossover(rsiValue, 30)
var aiCondition2Short = ta.crossunder(rsiValue, 70)

// Combine AI conditions with RSI
longCondition = aiCondition1Long or aiCondition2Long or ta.crossover(rsiValue, rsiOversold)
shortCondition = aiCondition1Short or aiCondition2Short or ta.crossunder(rsiValue, rsiOverbought)

// Calculate position size based on risk percentage
equity = strategy.equity
riskAmount = (equity * riskPercentage) / 100
positionSize = riskAmount / (stopLossPips * syminfo.mintick)

// Calculate Take Profit and Stop Loss levels
takeProfitLevel = close + takeProfitPips * syminfo.mintick
stopLossLevel = close - stopLossPips * syminfo.mintick

// Long entry
strategy.entry("Long Entry", strategy.long, when=longCondition[1] and not longCondition, qty=1)
strategy.exit("Take Profit/Stop Loss", from_entry="Long Entry", limit=takeProfitLevel, stop=stopLossLevel)

// Short entry
strategy.entry("Short Entry", strategy.short, when=shortCondition[1] and not shortCondition, qty=1)
strategy.exit("Take Profit/Stop Loss", from_entry="Short Entry", limit=takeProfitLevel, stop=stopLossLevel)

// Alerts
alertcondition(longCondition, title="Long Entry Signal", message="Long Entry Signal")
alertcondition(shortCondition, title="Short Entry Signal", message="Short Entry Signal")

// Plot RSI on the chart
plot(rsiValue, title="RSI", color=color.blue)

```

> Detail

https://www.fmz.com/strategy/437674

> Last Modified

2024-01-04 17:20:57
