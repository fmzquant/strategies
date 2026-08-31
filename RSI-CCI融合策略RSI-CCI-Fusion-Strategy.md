
> Name

RSI-CCI融合策略RSI-CCI-Fusion-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The RSI-CCI Fusion strategy combines the strengths of the RSI and CCI indicators to form a powerful trading approach. It captures both momentum and cyclical dynamics for more comprehensive market assessment.

## Strategy Principle

1. Calculate RSI and CCI values.

2. Standardize RSI and CCI using z-score for better comparability.

3. Fuse standardized RSI and CCI with designated weights.

4. Compute dynamic upper and lower bands to identify overbought/oversold levels.

5. Consider short when fusion indicator crosses below upper band. Consider long when crossing above lower band.

## Advantage Analysis 

Compared to using RSI or CCI alone, advantages of this strategy include:

1. Integrates strengths of both indicators for better accuracy.

2. More scientific dynamic bands reduce false signals.

3. Standardization enables comparability, improving fusion. 

4. Can assess both trend and overbought/oversold conditions.

## Risk Analysis

Some risks of this strategy:

1. Improper parameters may miss key trade points.

2. Inadequate weights can weaken an indicator's role.

3. Ignoring overall trend may cause counter-trend trades. 

4. Band settings too loose or too tight increase misjudgement risks.

## Optimization Directions

It can be optimized by:

1. Finding optimal parameters through testing.

2. Adjusting weights based on market conditions.

3. Incorporating trend and volume indicators for better accuracy.

4. Setting stop loss/take profit to control risks.

5. Optimizing bands to balance sensitivity and noise.

## Summary

The RSI-CCI fusion strategy improves judgement by consolidating indicators. With proper parameters and risk control, it generally outperforms single indicator strategies. But adjustments based on market conditions are still required.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_float_1|0.5|RSI Weight|
|v_input_2|false|Enable Short Positions|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © Julien_Eche

//@version=5
// strategy("RSI-CCI Fusion Strategy", shorttitle="RSI-CCI Fusion Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

length = input(14, title="Length")
rsi_weight = input.float(0.5, title="RSI Weight", minval=0.0, maxval=1.0)
cci_weight = 1.0 - rsi_weight

enableShort = input(false, "Enable Short Positions")

src = close
rsi = ta.rsi(src, length)
cci = ta.cci(src, length)

// Standardize the RSI and CCI values using z-score
rsi_std = ta.stdev(rsi, length)
rsi_mean = ta.sma(rsi, length)
rsi_z = (rsi - rsi_mean) / rsi_std

cci_std = ta.stdev(cci, length)
cci_mean = ta.sma(cci, length)
cci_z = (cci - cci_mean) / cci_std

// Combine the standardized RSI and CCI
combined_z = rsi_weight * rsi_z + cci_weight * cci_z

// Rescale to the original scale
rescaled = combined_z * ta.stdev(combined_z, length) + ta.sma(combined_z, length)

// Calculate dynamic upper and lower bands
upper_band = ta.sma(rescaled, length) + ta.stdev(rescaled, length)
lower_band = ta.sma(rescaled, length) - ta.stdev(rescaled, length)

// Buy and sell conditions
buySignal = ta.crossover(rescaled, lower_band)
sellSignal = ta.crossunder(rescaled, upper_band)

// Enter long position
if buySignal
    strategy.entry("Buy", strategy.long)

// Exit long position
if sellSignal
    strategy.close("Buy")

// Enter short position if enabled
if enableShort and sellSignal
    strategy.entry("Sell", strategy.short)

// Exit short position if enabled
if enableShort and buySignal
    strategy.close("Sell")

```

> Detail

https://www.fmz.com/strategy/427272

> Last Modified

2023-09-19 16:42:18
