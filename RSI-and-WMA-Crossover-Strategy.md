
> Name

RSI-and-WMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13f61a9efff28ca9ab6.png)

## Overview

This article mainly introduces a quantitative trading strategy based on RSI and WMA. The strategy generates buy and sell signals by calculating the values of RSI and WMA to discover reversal points of stock prices, aiming to buy low and sell high.  

## Strategy Logic

The core indicators of this strategy include RSI and WMA. RSI (Relative Strength Index) is a volatility indicator used to measure the change in the speed of recent price rises and falls. WMA (Weighted Moving Average) is a weighted moving average.

The buy signal of the strategy is generated when the RSI crosses above the WMA, indicating a price reversal and a possible start of an upward trend. The sell signal is generated when the RSI crosses below the WMA, implying a price reversal and a possible start of a downward trend.  

Specifically, the strategy first calculates the 14-day RSI, then calculates the 45-day WMA. If the RSI crosses above the WMA, a buy signal is generated. If the RSI crosses below the WMA, a sell signal is generated. The combination of RSI and WMA can capture price reversal points more accurately.

## Advantages

This strategy has the following advantages:

1. Clear signals and easy rules facilitate implementation.  
2. RSI and WMA verifies each other to reduce false signals.
3. Adjustable RSI parameters suit stocks with different cycles.  
4. Adjustable WMA parameters capture trends at different levels.
5. Simple and clean code for easy optimization.

## Risks  

The risks include:  

1. Extreme price swings may trigger stop loss.
2. Inappropriate RSI and WMA parameters lead to failure. 
3. High trading frequency increases costs and slippage.  
4. Unable to filter systemic risks effectively.  

These risks can be mitigated by parameter tuning, stop loss, filtering market risks etc.

## Enhancement Opportunities

The strategy can be optimized from the following aspects:

1. Test RSI and WMA parameters for optimal values.  
2. Add volume filter to avoid false signals.   
3. Set variable stop loss lines against adverse price moves.
4. Integrate other indicators like MACD and BOLL for filtering.  
5. Improve entry and exit logic for timing optimization.  

## Conclusion  

This strategy integrates RSI and WMA to capture crossovers for trade signals, enabling simple and effective algo trading. It is easy to implement and profitable in bull markets. Further parameter testing, tuning, and proper stop loss mechanisms can enhance its stability and profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|45|WMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI WMA Strategy", overlay=true)

// Input parameters
rsiLength = input(14, title="RSI Length")
wmaLength = input(45, title="WMA Length")

// Calculate RSI and WMA
rsiValue = ta.rsi(close, rsiLength)
wmaValue = ta.wma(rsiValue, wmaLength)

// Define overbought and oversold levels for RSI
overboughtLevel = 70
oversoldLevel = 30

// Strategy logic
longCondition = ta.crossover(rsiValue, wmaValue)
shortCondition = ta.crossunder(rsiValue, wmaValue)

// Execute trades
if (longCondition)
    strategy.entry("Long", strategy.long, comment="BUY")
if (shortCondition)
    strategy.entry("Short", strategy.short, comment="SELL")

// Plotting for visualization
plot(rsiValue, title="RSI", color=color.blue)
plot(wmaValue, title="WMA", color=color.orange)
hline(overboughtLevel, "Overbought Level", color=color.red)
hline(oversoldLevel, "Oversold Level", color=color.green)

// Plot buy and sell signals on the chart
plotshape(series=longCondition, title="Buy Signal", color=color.green, style=shape.labelup, location=location.belowbar)
plotshape(series=shortCondition, title="Sell Signal", color=color.red, style=shape.labeldown, location=location.abovebar)
```

> Detail

https://www.fmz.com/strategy/441068

> Last Modified

2024-02-05 12:16:46
