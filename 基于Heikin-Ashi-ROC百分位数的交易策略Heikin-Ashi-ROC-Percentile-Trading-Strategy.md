
> Name

基于Heikin-Ashi-ROC百分位数的交易策略Heikin-Ashi-ROC-Percentile-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10dc30bea7a6146cd22.png)




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
