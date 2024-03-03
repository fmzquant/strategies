
> Name

基于Heikin-Ashi-ROC百分位数的交易策略Heikin-Ashi-ROC-Percentile-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10dc30bea7a6146cd22.png)

[trans]

## 概述

该策略名为“基于Heikin Ashi ROC百分位数的交易策略”,其目的是提供一个基于Heikin Ashi ROC及其百分位数的易于使用的交易框架。

## 策略原理

该策略通过计算Heikin Ashi收盘价的ROC及其不同时间段内的最高值和最低值,来生成用于交易的上下轨。具体来说,它计算过去rocLength周期的Heikin Ashi收盘价的ROC。然后计算过去50周期ROC的最高值 rocHigh和最低值 rocLow。之后根据 rocHigh 计算出上轨upperKillLine,根据rocLow计算出下轨lowerKillLine。这两个轨线表示roc的特定百分位数。当ROC上穿下轨时做多;当ROC下穿上轨时平多仓。反之,当ROC下穿上轨时做空;当ROC上穿下轨时平空仓。

## 优势分析

该策略最大的优势在于利用ROC指标的强大趋势跟踪能力,配合Heikin Ashi平滑价格信息的特性,能够有效识别趋势的变化。相比单纯的移动平均线等指标,ROC对价格变化的响应更加敏锐,使策略可以及时入场。此外,使用百分位数生成的上下轨,可以有效过滤震荡,避免假突破造成不必要的交易。总体上,该策略结合趋势跟踪和震荡过滤两大功能,可以在大趋势下获取较好的风险回报比。

## 风险分析

该策略的主要风险在于参数设置不当可能导致交易频繁或者不够敏感。rocLength和计算百分位数的周期需要谨慎设置,否则可能导致上下轨过于疲软或僵硬,从而错过交易机会或引发不必要的损失。此外,百分位数的设定也需要根据不同市场反复测试调整,找到最佳参数组合。在趋势反转时,该策略由于依赖趋势指标也会面临一定亏损。应适当缩短持仓时间,或设置止损来控制风险。

## 优化方向

该策略可以从以下几个方面进行优化:1)结合其他指标过滤入场信号,如RSI等;2)利用机器学习方法动态优化参数;3)设置止损止盈自动原粗退出机制;4)进行组合,与其他非趋势策略进行组合,以平衡策略风险。

## 总结

综上所述,该策略利用ROC指标的强大趋势跟踪能力,配合Heikin Ashi特性进行趋势判断和趋势跟踪,并通过ROC百分位数形成的上下轨进行止损筛选,从而实
现了较好的趋势跟踪效果。其优势在于及时识别趋势变化并跟踪大趋势,同时通过上下轨过滤震荡。但参数设置不当可能影响策略表现,且面临趋势反转的风险。通过进一步优化参数选择和设置止损、止盈,该策略可以获得更稳定的效果。

||



## Overview

This strategy is called the "Heikin Ashi ROC Percentile Trading Strategy". It aims to provide an easy-to-use trading framework based on the Heikin Ashi ROC and its percentiles.

## Strategy Logic

The strategy calculates the ROC of Heikin Ashi close prices over the past rocLength periods. It then calculates the highest rocHigh and lowest rocLow values of ROC over the past 50 periods. The upper rail upperKillLine and lower rail lowerKillLine are generated based on certain percentiles of rocHigh and rocLow. When ROC crosses above lowerKillLine, a long position is opened. When ROC crosses below upperKillLine, the long position is closed. Conversely, when ROC crosses below upperKillLine, a short position is opened. When ROC crosses above lowerKillLine, the short position is closed.

## Advantage Analysis 

The biggest advantage of this strategy is utilizing the ROC indicator's strong trend tracking capability, combined with Heikin Ashi's feature of smoothing price information. This allows the strategy to effectively identify trend changes and enter trades in a timely manner. Compared to simple moving averages, ROC responds more sensitively to price changes. Additionally, the upper and lower rails generated from percentiles can effectively filter out consolidations and avoid unnecessary trades from fake breakouts. Overall, this strategy combines both trend following and oscillation filtering to achieve good risk-reward ratios in major trends.

## Risk Analysis

The main risk of this strategy is that improper parameter settings may lead to overtrading or insufficient sensitivity. The rocLength and percentile lookback periods need to be set prudently, otherwise the rails may become too dull or stiff, causing missed trades or unnecessary losses. In addition, the percentile settings need to be repeatedly backtested and adjusted for different markets to find optimal combinations. The strategy is also subject to certain losses when trends reverse, due to its reliance on trend-following indicators. Positions should be closed timely, or stop losses set to control risks.

## Optimization Directions

The strategy can be optimized in the following ways: 1) Add filters with other indicators like RSI; 2) Dynamically optimize parameters with machine learning; 3) Set stop loss and take profit for automatic risk management; 4) Combine with non-trend strategies to balance risks.

## Summary 

In summary, this strategy utilizes the powerful trend tracking capability of the ROC indicator, combined with Heikin Ashi for trend identification and following. The upper and lower rails generated from ROC percentiles allow for effective loss filtering. This achieves good trend tracking performance. The advantages lie in its timely identification of trend changes and following of major trends, while filtering out consolidations with the rails. However, improper parameter settings may impact performance, and trend reversal risks remain. Further optimizing parameter selection and setting stops can help obtain more consistent results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Midline|
|v_input_2|100|roc Length|
|v_input_3|2|Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-22 00:00:00
end: 2023-10-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © jensenvilhelm

//@version=5
strategy("Heikin Ashi ROC Percentile Strategy", shorttitle="ROC ON" , overlay=false)

// User Inputs
zerohLine = input(0, title="Midline")  // Zero line, baseline for ROC (customer can modify this to adjust midline)
rocLength = input(100, title="roc Length")  // Lookback period for SMA and ROC (customer can modify this to adjust lookback period)

stopLossLevel = input(2, title="Stop Loss (%)")  // Level at which the strategy stops the loss (customer can modify this to adjust stop loss level)
startDate = timestamp("2015 03 03")  // Start date for the strategy (customer can modify this to adjust start date)

// Heikin Ashi values
var float haClose = na  // Define Heikin Ashi close price
var float haOpen = na  // Define Heikin Ashi open price
haClose := ohlc4  // Calculate Heikin Ashi close price as average of OHLC4 (no customer modification needed here)
haOpen := na(haOpen[1]) ? (open + close) / 2 : (haOpen[1] + haClose[1]) / 2  // Calculate Heikin Ashi open price (no customer modification needed here)

// ROC Calculation
roc = ta.roc(ta.sma(haClose, rocLength), rocLength)  // Calculate Rate of Change (ROC) (customer can modify rocLength in the inputs)
rocHigh = ta.highest(roc, 50)  // Get the highest ROC of the last 50 periods (customer can modify this to adjust lookback period)
rocLow = ta.lowest(roc, 50)  // Get the lowest ROC of the last 50 periods (customer can modify this to adjust lookback period)
upperKillLine = ta.percentile_linear_interpolation(rocHigh, 10, 75)  // Calculate upper kill line (customer can modify parameters to adjust this line)
lowerKillLine = ta.percentile_linear_interpolation(rocLow, 10, 25)  // Calculate lower kill line (customer can modify parameters to adjust this line)

// Trade conditions
enterLong = ta.crossover(roc, lowerKillLine)  // Define when to enter long positions (customer can modify conditions to adjust entry points)
exitLong = ta.crossunder(roc, upperKillLine)  // Define when to exit long positions (customer can modify conditions to adjust exit points)
enterShort = ta.crossunder(roc, upperKillLine)  // Define when to enter short positions (customer can modify conditions to adjust entry points)
exitShort = ta.crossover(roc, lowerKillLine )  // Define when to exit short positions (customer can modify conditions to adjust exit points)

// Strategy execution
if(time >= startDate)  // Start strategy from specified start date
    if (enterLong)
        strategy.entry("Long", strategy.long)  // Execute long trades
    if (exitLong)
        strategy.close("Long")  // Close long trades
    if (enterShort)
        strategy.entry("Short", strategy.short)  // Execute short trades
    if (exitShort)
        strategy.close("Short")  // Close short trades

// Plotting
plot(zerohLine,title="Zeroline")  // Plot zero line
plot(roc, "RSI", color=color.rgb(248, 248, 248))  // Plot ROC
plot(rocHigh, "Roc High", color = color.rgb(175, 78, 76))  // Plot highest ROC
plot(rocLow, "Roc Low", color = color.rgb(175, 78, 76))  // Plot lowest ROC
plot(upperKillLine, "Upper Kill Line", color = color.aqua)  // Plot upper kill line
plot(lowerKillLine, "Lower Kill Line", color = color.aqua)  // Plot lower kill line

```

> Detail

https://www.fmz.com/strategy/429956

> Last Modified

2023-10-23 15:41:40
