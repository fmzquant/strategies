
> Name

MACD真级别策略MACD-TrueLevel-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

MACD真级别策略使用MACD指标和真级别带指标来判断买卖信号。它在MACD基础上,增加了真级别带的使用,能够更准确定位趋势的开始和结束。

## 原理

该策略首先计算MACD指标,然后计算14个不同周期的真级别带。真级别带是根据价格的线性回归线和不同长度周期的标准差计算得到的。之后从中挑选出最高的上轨和最低的下轨,判断是否突破作为买卖信号。

具体来说,策略的入场信号是MACD指标金叉或价格突破选择的真级别下轨,出场信号是MACD指标死叉或价格突破选择的真级别上轨。

使用真级别带的优势在于,它结合了趋势的方向和波动范围,可以更准确判断趋势的开始和结束。相比仅使用MACD,增加了真级别带过滤可以减少假信号。

## 优势分析

1. 使用MACD判断趋势方向,能够有效跟踪趋势。

2. 增加真级别带指标,可以过滤假突破,确认趋势。真级别带同时考虑了价格趋势和波动范围,判断更准确。

3. 真级别带包含多周期,可以全面判断趋势变化。

4. 可调整真级别带参数,适应不同市场环境。

5. 支持做多做空操作,可以全方位捕捉趋势机会。

## 风险分析

1. MACD作为单一指标,可能产生较多假信号,需要真级别带进行过滤。

2. 真级带参数设置不当可能导致漏入漏出。需要根据市场调整参数。

3. 多空操作需要充足资金支持,否则可能爆仓。

4. 突破交易本身具有被套利的风险,需要及时止损。

5. 任何指标策略都存在对农产品、数字货币等高波动品种不适用的风险。

## 优化方向

1. 测试更多周期参数,找到对市场更合适的参数。

2. 增加止损策略,可以降低亏损风险。

3. 结合其他指标过滤入场,例如成交量,KDJ等,可以减少假突破。 

4. 优化入场点选择,例如突破高点、低点等,可以提高获利率。

5. 增加机器学习算法,利用模型训练判断趋势概率,减少人工参数调整。

## 总结

MACD真级别策略整合了趋势判断和范围判断,在MACD基础上增加真级别带指标,可以更准确定位趋势的开始和结束。相比单一MACD策略,可以有效过滤假信号,捕捉趋势机会。同时也存在一定的风险,需要对参数和止损进行优化。总体来说,该策略适合趋势交易,能够在中长期内稳定捕捉市场趋势。

||


## Overview

The MACD TrueLevel strategy uses the MACD indicator and TrueLevel bands to determine buy and sell signals. It adds TrueLevel bands on top of MACD to more accurately locate the start and end of trends. 

## Principle

The strategy first calculates the MACD indicator, then computes 14 TrueLevel bands of different periods. The TrueLevel bands are calculated based on the linear regression line and standard deviation of prices over different length periods. It then picks the highest upper band and lowest lower band for breakout signals.

Specifically, the entry signal is a MACD line crossover above signal line, or price breakout above the selected TrueLevel lower band. The exit signal is a MACD line crossover below signal line, or price breakout below the selected TrueLevel upper band.

The advantage of using TrueLevel bands is that it combines the trend direction and volatility range to more precisely determine the start and end of trends. Compared to just MACD, adding TrueLevel band filter can reduce false signals.

## Advantage Analysis

1. MACD judges trend direction effectively and tracks trends well. 

2. Adding TrueLevel bands can filter false breakouts and confirm trends. TrueLevel bands consider both trend and volatility, making the judgment more accurate.

3. TrueLevel bands include multiple periods, judging trend changes comprehensively. 

4. Adjustable TrueLevel band parameters fit different market environments.

5. Support long and short positions to fully capture trend opportunities.

## Risk Analysis

1. MACD alone may generate more false signals, needing TrueLevel filter.

2. Improper TrueLevel band parameter setting may cause missed entries or exits. Parameters need adjustment based on markets.

3. Long and short positions require sufficient capital support, otherwise may cause margin call. 

4. Breakout trading itself has the risk of being stopped out, requiring timely stop loss.

5. Any indicator strategy has the risk of not working well on high volatile products like commodities and crypto.

## Optimization Directions

1. Test more period parameters to find optimal values for the market.

2. Add stop loss strategy to reduce loss risk.

3. Add other indicator filters like volume, KDJ etc. to reduce false breakouts.

4. Optimize entry points like breaking previous highs/lows to improve profit rate.

5. Add machine learning models to judge trend probability, reducing manual parameter tuning.

## Summary

The MACD TrueLevel strategy integrates trend and range analysis. It adds TrueLevel bands on top of MACD to more accurately locate the start and end of trends compared to just MACD. It can effectively filter false signals and catch trends. There are still risks that need parameter and stop loss optimization. Overall it suits trend trading and steadily catches market trends over the medium to long term.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3|9|Signal Length|
|v_input_4|12|Entry TrueLevel Band|
|v_input_5|12|Exit TrueLevel Band|
|v_input_6|false|Enable Long and Short|
|v_input_7|126|Length 1|
|v_input_8|189|Length 2|
|v_input_9|252|Length 3|
|v_input_10|378|Length 4|
|v_input_11|504|Length 5|
|v_input_12|630|Length 6|
|v_input_13|756|Length 7|
|v_input_14|1008|Length 8|
|v_input_15|1260|Length 9|
|v_input_16|1638|Length 10|
|v_input_17|2016|Length 11|
|v_input_18|2646|Length 12|
|v_input_19|3276|Length 13|
|v_input_20|4284|Length 14|
|v_input_21|#00bfff|Fill Color|
|v_input_22|0|Multiple: 1|0.8|0.6|1.2|1.4|
|v_input_23_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Julien_Eche

//@version=4
strategy("MACD TrueLevel Strategy", shorttitle="MACD TL", overlay=true)

// Input parameters for MACD
fastLength = input(12, title="Fast Length", type=input.integer)
slowLength = input(26, title="Slow Length", type=input.integer)
signalLength = input(9, title="Signal Length", type=input.integer)

// Inputs for selecting bands
entry_band = input(12, title="Entry TrueLevel Band", type=input.integer, minval=1, maxval=14)
exit_band = input(12, title="Exit TrueLevel Band", type=input.integer, minval=1, maxval=14)

// Input for long and short mode
long_and_short = input(false, title="Enable Long and Short", type=input.bool)

// Calculate the MACD
[macdLine, signalLine, _] = macd(close, fastLength, slowLength, signalLength)


// User inputs
len1 = input(title="Length 1", type=input.integer, defval=126)
len2 = input(title="Length 2", type=input.integer, defval=189)
len3 = input(title="Length 3", type=input.integer, defval=252)
len4 = input(title="Length 4", type=input.integer, defval=378)
len5 = input(title="Length 5", type=input.integer, defval=504)
len6 = input(title="Length 6", type=input.integer, defval=630)
len7 = input(title="Length 7", type=input.integer, defval=756)
len8 = input(title="Length 8", type=input.integer, defval=1008)
len9 = input(title="Length 9", type=input.integer, defval=1260)
len10 = input(title="Length 10", type=input.integer, defval=1638)
len11 = input(title="Length 11", type=input.integer, defval=2016)
len12 = input(title="Length 12", type=input.integer, defval=2646)
len13 = input(title="Length 13", type=input.integer, defval=3276)
len14 = input(title="Length 14", type=input.integer, defval=4284)

fill_color = input(title="Fill Color", type=input.color, defval=color.rgb(0, 191, 255, 95))
mult = input(title="Multiple", type=input.float, defval=1, step=0.2, options=[0.6, 0.8, 1, 1.2, 1.4])
src = input(title="Source", type=input.source, defval=close)

// Upper band calculation function
upperBand(length) =>
    linreg = linreg(src, length, 0)
    stddev = mult * stdev(src, length)
    upperband = linreg + stddev
    upperband

// Lower band calculation function
lowerBand(length) =>
    linreg = linreg(src, length, 0)
    stddev = mult * stdev(src, length)
    lowerband = linreg - stddev
    lowerband

// Calculate upper and lower bands for each length
upperband_1 = upperBand(len1)
upperband_2 = upperBand(len2)
upperband_3 = upperBand(len3)
upperband_4 = upperBand(len4)
upperband_5 = upperBand(len5)
upperband_6 = upperBand(len6)
upperband_7 = upperBand(len7)
upperband_8 = upperBand(len8)
upperband_9 = upperBand(len9)
upperband_10 = upperBand(len10)
upperband_11 = upperBand(len11)
upperband_12 = upperBand(len12)
upperband_13 = upperBand(len13)
upperband_14 = upperBand(len14)

lowerband_1 = lowerBand(len1)
lowerband_2 = lowerBand(len2)
lowerband_3 = lowerBand(len3)
lowerband_4 = lowerBand(len4)
lowerband_5 = lowerBand(len5)
lowerband_6 = lowerBand(len6)
lowerband_7 = lowerBand(len7)
lowerband_8 = lowerBand(len8)
lowerband_9 = lowerBand(len9)
lowerband_10 = lowerBand(len10)
lowerband_11 = lowerBand(len11)
lowerband_12 = lowerBand(len12)
lowerband_13 = lowerBand(len13)
lowerband_14 = lowerBand(len14)

// Plot envelope bands for each length
upperband_1_plot = plot(upperband_1, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 1")
lowerband_1_plot = plot(lowerband_1, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 1")

upperband_2_plot = plot(upperband_2, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 2")
lowerband_2_plot = plot(lowerband_2, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 2")

upperband_3_plot = plot(upperband_3, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 3")
lowerband_3_plot = plot(lowerband_3, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 3")

upperband_4_plot = plot(upperband_4, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 4")
lowerband_4_plot = plot(lowerband_4, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 4")

upperband_5_plot = plot(upperband_5, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 5")
lowerband_5_plot = plot(lowerband_5, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 5")

upperband_6_plot = plot(upperband_6, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 6")
lowerband_6_plot = plot(lowerband_6, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 6")

upperband_7_plot = plot(upperband_7, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 7")
lowerband_7_plot = plot(lowerband_7, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 7")

upperband_8_plot = plot(upperband_8, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 8")
lowerband_8_plot = plot(lowerband_8, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 8")

upperband_9_plot = plot(upperband_9, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 9")
lowerband_9_plot = plot(lowerband_9, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 9")

upperband_10_plot = plot(upperband_10, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 10")
lowerband_10_plot = plot(lowerband_10, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 10")

upperband_11_plot = plot(upperband_11, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 11")
lowerband_11_plot = plot(lowerband_11, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 11")

upperband_12_plot = plot(upperband_12, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 12")
lowerband_12_plot = plot(lowerband_12, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Lower Band 12")

upperband_13_plot = plot(upperband_13, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 13")
lowerband_13_plot = plot(lowerband_13, color=color.rgb(14, 139, 212, 95), linewidth=1, title="Lower Band 13")

upperband_14_plot = plot(upperband_14, color=color.rgb(14, 116, 212, 95), linewidth=1, title="Upper Band 14")
lowerband_14_plot = plot(lowerband_14, color=color.rgb(14, 139, 212, 95), linewidth=1, title="Lower Band 14")


// Plot fills for each length
fill(upperband_1_plot, lowerband_1_plot, color=fill_color, title="Fill 1")
fill(upperband_2_plot, lowerband_2_plot, color=fill_color, title="Fill 2")
fill(upperband_3_plot, lowerband_3_plot, color=fill_color, title="Fill 3")
fill(upperband_4_plot, lowerband_4_plot, color=fill_color, title="Fill 4")
fill(upperband_5_plot, lowerband_5_plot, color=fill_color, title="Fill 5")
fill(upperband_6_plot, lowerband_6_plot, color=fill_color, title="Fill 6")
fill(upperband_7_plot, lowerband_7_plot, color=fill_color, title="Fill 7")
fill(upperband_8_plot, lowerband_8_plot, color=fill_color, title="Fill 8")
fill(upperband_9_plot, lowerband_9_plot, color=fill_color, title="Fill 9")
fill(upperband_10_plot, lowerband_10_plot, color=fill_color, title="Fill 10")
fill(upperband_11_plot, lowerband_11_plot, color=fill_color, title="Fill 11")
fill(upperband_12_plot, lowerband_12_plot, color=fill_color, title="Fill 12")
fill(upperband_13_plot, lowerband_13_plot, color=fill_color, title="Fill 13")
fill(upperband_14_plot, lowerband_14_plot, color=fill_color, title="Fill 14")

// Add variables to store the highest upper band and lowest lower band values
var float highestUpperBand = na
var float lowestLowerBand = na

// Calculate the trueLevelUpperBand and trueLevelLowerBand
trueLevelUpperBand = max(upperband_1, max(upperband_2, max(upperband_3, max(upperband_4, max(upperband_5, max(upperband_6, max(upperband_7, max(upperband_8, max(upperband_9, max(upperband_10, max(upperband_11, max(upperband_12, max(upperband_13, upperband_14)))))))))))))
trueLevelLowerBand = min(lowerband_1, min(lowerband_2, min(lowerband_3, min(lowerband_4, min(lowerband_5, min(lowerband_6, min(lowerband_7, min(lowerband_8, min(lowerband_9, min(lowerband_10, min(lowerband_11, min(lowerband_12, min(lowerband_13, lowerband_14)))))))))))))

// Update the highest upper band and lowest lower band
highestUpperBand := highest(trueLevelUpperBand, 1)
lowestLowerBand := lowest(trueLevelLowerBand, 1)

// Store the upper and lower bands in an array for easy access
upperbands = array.new_float(14)
lowerbands = array.new_float(14)

array.set(upperbands, 0, upperband_1)
array.set(upperbands, 1, upperband_2)
array.set(upperbands, 2, upperband_3)
array.set(upperbands, 3, upperband_4)
array.set(upperbands, 4, upperband_5)
array.set(upperbands, 5, upperband_6)
array.set(upperbands, 6, upperband_7)
array.set(upperbands, 7, upperband_8)
array.set(upperbands, 8, upperband_9)
array.set(upperbands, 9, upperband_10)
array.set(upperbands, 10, upperband_11)
array.set(upperbands, 11, upperband_12)
array.set(upperbands, 12, upperband_13)
array.set(upperbands, 13, upperband_14)

array.set(lowerbands, 0, lowerband_1)
array.set(lowerbands, 1, lowerband_2)
array.set(lowerbands, 2, lowerband_3)
array.set(lowerbands, 3, lowerband_4)
array.set(lowerbands, 4, lowerband_5)
array.set(lowerbands, 5, lowerband_6)
array.set(lowerbands, 6, lowerband_7)
array.set(lowerbands, 7, lowerband_8)
array.set(lowerbands, 8, lowerband_9)
array.set(lowerbands, 9, lowerband_10)
array.set(lowerbands, 10, lowerband_11)
array.set(lowerbands, 11, lowerband_12)
array.set(lowerbands, 12, lowerband_13)
array.set(lowerbands, 13, lowerband_14)

// Get the selected bands for entry and exit
selected_entry_lowerband = array.get(lowerbands, entry_band - 1)
selected_exit_upperband = array.get(upperbands, exit_band - 1)


// Entry conditions
longCondition = crossover(macdLine, signalLine) or crossover(close, selected_entry_lowerband)
shortCondition = crossunder(macdLine, signalLine) or crossunder(close, selected_exit_upperband)

// Exit conditions
exitLongCondition = crossunder(macdLine, signalLine) or crossunder(close, selected_exit_upperband)
exitShortCondition = crossover(macdLine, signalLine) or crossover(close, selected_entry_lowerband)

// Strategy execution
strategy.entry("Long", strategy.long, when = longCondition)
strategy.entry("Short", strategy.short, when = shortCondition and long_and_short)
strategy.close("Long", when = exitLongCondition)
strategy.close("Short", when = exitShortCondition)
```

> Detail

https://www.fmz.com/strategy/428581

> Last Modified

2023-10-07 10:23:01
