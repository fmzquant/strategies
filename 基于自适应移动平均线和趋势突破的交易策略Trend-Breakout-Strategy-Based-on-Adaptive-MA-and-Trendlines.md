
> Name

基于自适应移动平均线和趋势突破的交易策略Trend-Breakout-Strategy-Based-on-Adaptive-MA-and-Trendlines

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过自适应移动平均线和趋势线突破来判断入场,并利用RSI指标来决定出场。其目标是在符合趋势条件时进入市场,在超买区域止盈退出,同时控制每月只做一次交易。

## 策略原理

1. 计算长度为99的自适应移动平均线,判断总体趋势方向

2. 计算长度为14的本地峰值,画出上轨代表压力线

3. 当收盘价突破上轨时,并且当前月还未有订单,则做多入场

4. 计算14周期RSI,当RSI超过70(超买区)时平仓止盈

5. 跟踪上次入场的月份,确保每月仅交易一次

## 优势分析

1. 自适应移动平均线可以动态跟踪趋势变化 

2. 结合趋势线突破可以提高入场精确度

3. RSI指标可以有效判断超买超卖现象,实时控制风险

4. 每月仅交易一次可以减少交易频率和手续费

5. 规则简单清晰,易于理解执行

## 风险分析

1. 参数设定不当可能导致错失较佳入场点

2. 固定的出场指标无法及时跟随市场变化

3. 存在一定程度的回撤风险 

4. 无法对长期持仓做风险控制

5. 过滤条件过多可能导致无法入场

## 优化方向

1. 测试不同参数设定寻找最优参数

2. 增加其他过滤指标提高策略稳定性

3. 开发动态止损和跟踪止损策略

4. 优化入场逻辑,识别更强势突破

5. 测试适用的品种和周期参数

6. 结合趋势指标过滤假突破信号

## 总结 

该策略整合趋势分析和超买超卖指标,实现了较为稳定的趋势跟踪效果。通过进一步优化参数设定、动态出场机制等,可以成为一个可靠的量化交易系统。总体来说,该策略易操作性较强,值得进一步改进和验证。

||

## Overview

This strategy uses an adaptive moving average and trendline breakouts for entries, and RSI for exits. It aims to enter trends when conditions are met, take profit at overbought levels, and limit to one trade per month.

## Strategy Logic

1. Calculates 99-period adaptive MA to determine overall trend.

2. Calculates 14-period local highs for upper trendline resistance.

3. Goes long when close breaks above trendline and no order this month.

4. Calculates 14-period RSI and exits at RSI over 70 (overbought). 

5. Tracks last entry month to ensure one trade per month.

## Advantage Analysis

1. Adaptive MA dynamically tracks trend changes.

2. Trendline breakouts improve entry precision.

3. RSI effectively judges overbought/oversold levels for risk control.

4. One trade per month reduces frequency and fees. 

5. Simple and clear logic, easy to understand and execute.

## Risk Analysis

1. Improper parameters may cause missed entries.

2. Fixed exit indicators cannot adapt timely to markets.

3. Possibility of drawdowns. 

4. No risk control for long holding periods.

5. Too many filters may prevent entries.

## Optimization Directions

1. Test different parameters for optimum settings.

2. Add filters to improve strategy robustness.

3. Develop dynamic and trailing stop strategies.

4. Optimize entry logic to identify stronger breakouts.

5. Test suitable instruments and timeframes.  

6. Add trend filter to avoid false breakouts.

## Summary

This strategy integrates trend analysis and oscillators for steady trend following effect. Further optimizations on parameters, dynamic exits etc. can make it a reliable quant system. Overall it has good operability and is worth improving and verifying.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|99|length_trama|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-18 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('Bannos Strategy', shorttitle='Bannos', overlay=true)

//The provided script is an indicator for TradingView written in Pine Script version 5. The indicator is used to determine entry and exit points for a trading strategy. Here's a detailed breakdown of what the script does:

// Strategy Definition:

// Bannos Strategy is the full name, with a short title Bannos.
// The overlay=true option indicates that the strategy will be overlayed on the price chart.
// Tracking Entry Month:

// A variable lastEntryMonth is set up to track the month of the last entry.
// currentMonth identifies the current month.
// Trend Regularity Adaptive Moving Average (TRAMA):

// It takes an input of length 99 as default.
// It uses adaptive calculations to track trend changes.
// Trendlines with Breaks:

// Identifies local peaks over a given period (in this case, 14) and calculates a slope based on these peaks.
// Relative Strength Index (RSI):

// Uses a length of 14 (default) to calculate the RSI.
// RSI is an oscillation indicator that indicates overbought or oversold conditions.
// Strategy Logic for Long Entry:

// A long position is opened if:
// The close price is above the TRAMA.
// There's a crossover of the close price and the upper trendline.
// The position is taken only once per month.
// Strategy Logic for Long Exit:

// The long position is closed if the RSI exceeds 70, indicating an overbought condition.
// Plotting:

// The TRAMA is plotted in red on the chart.
// A horizontal line is also drawn at 70 to indicate the RSI's overbought zone.
// In summary, this strategy aims to enter a long position when certain trend and crossover conditions are met, and close the position when the market is considered overbought as per the RSI. Additionally, it ensures entries only occur once a month.
//



// Variable pour suivre le mois de la dernière entrée
var float lastEntryMonth = na
currentMonth = month(time)

// Parameters for Trend Regularity Adaptive Moving Average (TRAMA)
length_trama = input(99)
src_trama = close
ama = 0.
hh = math.max(math.sign(ta.change(ta.highest(length_trama))), 0)
ll = math.max(math.sign(ta.change(ta.lowest(length_trama)) * -1), 0)
tc = math.pow(ta.sma(hh or ll ? 1 : 0, length_trama), 2)
ama := nz(ama[1] + tc * (src_trama - ama[1]), src_trama)

// Parameters for Trendlines with Breaks
length_trend = 14
mult = 1.0
ph = ta.pivothigh(length_trend, length_trend)
upper = 0.
slope_ph = 0.
slope_ph := ph ? mult : slope_ph
upper := ph ? ph : upper - slope_ph

// Parameters for RSI
rsiLength = 14
up = ta.rma(math.max(ta.change(close), 0), rsiLength)
down = ta.rma(-math.min(ta.change(close), 0), rsiLength)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

// Strategy Logic for Long Entry
longCondition = close > ama and ta.crossover(close, upper) and (na(lastEntryMonth) or lastEntryMonth != currentMonth)
if (longCondition)
    lastEntryMonth := currentMonth
    strategy.entry('Long', strategy.long)

// Strategy Logic for Long Exit
exitCondition = rsi > 70
if (exitCondition)
    strategy.close('Long')

// Plotting
plot(ama, 'TRAMA', color=color.red)
hline(70, 'Overbought', color=color.red)

```

> Detail

https://www.fmz.com/strategy/427260

> Last Modified

2023-09-19 15:49:37
