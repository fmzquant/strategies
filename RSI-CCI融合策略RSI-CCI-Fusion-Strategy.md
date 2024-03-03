
> Name

RSI-CCI融合策略RSI-CCI-Fusion-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

RSI-CCI融合策略通过整合RSI和CCI两个指标的优势,形成一个强大的交易策略。它能够同时捕捉动量和周期变化,对市场情况做出更全面的判断。

## 策略原理

1. 计算RSI和CCI的值。

2. 使用z-score标准化RSI和CCI的值,使其可比性更强。

3. 按一定权重将标准化后的RSI和CCI进行融合。

4. 计算动态上下轨,识别超买超卖情况。

5. 当融合指标下穿上轨时,考虑做空;当融合指标上穿下轨时,考虑做多。

## 优势分析

相比单一使用RSI或CCI,该策略具有以下优势:

1. 综合两种指标的优点,提高判断准确性。

2. 动态上下轨设定更科学合理,减少误判。

3. 标准化处理使不同指标可比,提高融合效果。

4. 可同时判断趋势和超买超卖情况。

## 风险分析

该策略也存在一些风险:

1. 参数设定不当,可能错过关键交易时点。

2. 权重设定不当,会弱化某一指标作用。

3. 忽略整体趋势方向,可能导致逆势交易。

4. 上下轨设定过于疏松或过于密集,误判风险。

## 优化方向

可以从以下几点进行优化:

1. 测试不同参数,找到最优参数。

2. 根据市场情况优化指标权重。

3. 结合趋势和量价指标,提高准确性。 

4. 设置止损止盈,控制风险。

5. 优化上下轨参数,平衡灵敏度和噪声。

## 总结

RSI-CCI融合策略以指标融合的思路提高判断能力,在科学设定参数和把控风险的前提下,整体效果优于单一指标策略。但仍需注意根据市场调整方案。

|| 

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

[/trans]

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
