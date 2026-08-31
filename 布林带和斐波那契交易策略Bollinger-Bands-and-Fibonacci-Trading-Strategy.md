
> Name

布林带和斐波那契交易策略Bollinger-Bands-and-Fibonacci-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines the Bollinger Bands and Fibonacci retracement indicators for a multi-indicator approach. It belongs to the typical combined indicators strategy type. The Bollinger Bands determine the trend direction and the Fibonacci levels identify key support and resistance zones for generating trading signals.

## Strategy Logic 

The strategy is based on two main indicators:

1. Bollinger Bands

   Calculates the upper, middle and lower bands. Price breaking above lower band is long signal, and breaking below upper band is short signal.
   
2. Fibonacci Retracements

   Calculates the 0% and 100% retracement levels based on historical highs and lows. These act as key support and resistance levels.
   
The specific trading logic is:

Long signal: Price breaks above upper band, and is above 0% Fibonacci support.

Short signal: Price breaks below lower band, and is below 100% Fibonacci resistance.

Exits are around the middle band for take profit or stop loss.

## Advantages

- Combines Bollinger Bands and Fibonacci indicators  
- Bands judge trend, Fibonacci identifies key levels
- Combined probability of false signals is lower
- Middle band exits control drawdowns
- Clear entry and exit rules, easy to implement

## Risks

- MA-based indicators can lag, missing best levels
- Purely indicator-driven, slow reaction to major events  
- Dual filters limit trading frequency
- Improper parameters negatively affect bands and retracements
- Parameters need optimization for different products

Risks can be reduced by: 

- Optimizing for best parameter combinations
- Relaxing entry criteria like adding candlestick patterns
- Improving exits with trailing stops 
- Separate parameter testing by product
- Adjusting position sizing system

## Enhancement Directions

The strategy can be improved by:

1. Optimizing Bollinger Bands parameters

   Finding optimal ratios for upper/lower bands
   
2. Optimizing Fibonacci retracement periods

   Testing different lookback periods for retracements
   
3. Relaxing entry conditions

   Observing candlestick patterns on band breaks
   
4. Improving exits  

   Considering trailing stop mechanisms
   
5. Product-specific parameter testing

   Parameters need tuning for different products

## Summary

This strategy combines the strengths of Bollinger Bands and Fibonacci Retracements for higher quality signals. But challenges like difficult parameter optimization exist. Improvements can be made through parameter tuning, relaxing entry criteria, enhancing exits etc. to refine the strategy while retaining its edge. Continual adjustments based on backtest results are also key for robustness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|Bollinger Bands Length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|Standard Deviation Multiplier|
|v_input_float_2|false|Fibonacci 0% Level|
|v_input_float_3|true|Fibonacci 100% Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-13 00:00:00
end: 2023-09-20 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger Bands & Fibonacci Strategy", shorttitle="BB & Fib Strategy", overlay=true)

// Initialize position variables
var bool long_position = false
var bool short_position = false

// Bollinger Bands settings
length = input.int(20, title="Bollinger Bands Length")
src = input(close, title="Source")
mult = input.float(2.0, title="Standard Deviation Multiplier")

basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)

upper_band = basis + dev
lower_band = basis - dev

// Fibonacci retracement levels
fib_0 = input.float(0.0, title="Fibonacci 0% Level", minval=-100, maxval=100) / 100
fib_100 = input.float(1.0, title="Fibonacci 100% Level", minval=-100, maxval=100) / 100

// Plotting Bollinger Bands
plot(upper_band, color=color.red, title="Upper Bollinger Band")
plot(lower_band, color=color.green, title="Lower Bollinger Band")

// Calculate Fibonacci levels
fib_range = ta.highest(high, 50) - ta.lowest(low, 50)
fib_high = ta.highest(high, 50) - fib_range * fib_0
fib_low = ta.lowest(low, 50) + fib_range * fib_100

// Plot Fibonacci retracement levels
plot(fib_high, color=color.blue, title="Fibonacci High")
plot(fib_low, color=color.orange, title="Fibonacci Low")

// Entry conditions
long_condition = ta.crossover(close, upper_band) and low > fib_low
short_condition = ta.crossunder(close, lower_band) and high < fib_high

// Plot arrows on the chart
plotshape(series=long_condition, title="Long Entry", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=short_condition, title="Short Entry", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Entry and exit logic
if long_condition and not short_position
    strategy.entry("Long", strategy.long)
    long_position := true
    short_position := false

if short_condition and not long_position
    strategy.entry("Short", strategy.short)
    short_position := true
    long_position := false

// Exit conditions (you can customize these)
long_exit_condition = ta.crossunder(close, basis)
short_exit_condition = ta.crossover(close, basis)

if long_exit_condition
    strategy.close("Long")
    long_position := false

if short_exit_condition
    strategy.close("Short")
    short_position := false


```

> Detail

https://www.fmz.com/strategy/427516

> Last Modified

2023-09-21 21:04:38
