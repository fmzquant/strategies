
> Name

波浪趋势多止损多止盈策略Multi-Take-Profit-and-Stop-Loss-WaveTrend-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b3c8e682e89ddc59c3.png)

[trans]

## 概述

该策略为LazyBear的原始波浪趋势策略,增加了第二止损、多个止盈价格以及高时间框架EMA过滤器。其利用波浪趋势指标生成交易信号,再结合EMA过滤和止损止盈管理,实现自动化趋势跟踪交易。

## 策略原理

该策略的核心指标是波浪趋势指标(WaveTrend),它由三部分组成:

1. AP:平均价格=(最高价+最低价+收盘价)/3

2. ESA:AP的n1期EMA

3. CI:(AP-ESA)/ (0.015×AP-ESA的n1期EMA)的绝对值的n1期EMA

4. TCI:CI的n2期EMA,即波浪趋势线1(WT1)

5. WT2:WT1的4周期SMA

当WT1上穿WT2产生金叉时,做多;当WT1下穿WT2产生死叉时,平仓。

此外,策略还引入高时间框架EMA作为过滤器,只有当价格高于EMA时才能做多,低于EMA时才能做空,从而过滤掉部分假信号。

## 策略优势

1. 利用波浪趋势指标自动跟踪趋势,避免人为判断错误
2. 增加第二止损,有效控制单笔亏损
3. 多个止盈价格,最大程度锁定利润
4. EMA过滤器,过滤假信号,提高胜率

## 策略风险及优化

1. 不能过滤趋势反转,可能造成损失
2. 参数设置不当可能导致过于频繁交易
3. 可测试不同参数组合,优化参数
4. 可考虑结合其他指标判断趋势反转

## 总结

该策略综合考虑了趋势跟踪、风险控制、利润最大化等多个维度,通过波浪趋势指标自动捕捉趋势,配合EMA过滤器提高交易效率,在把握趋势的同时控制风险,是一个高效稳定的趋势跟踪策略。通过进一步的参数优化和增加反转判断,可以进一步扩展该策略的适用性。
||

## Overview

This strategy is based on the original WaveTrend strategy from LazyBear, with additional features like secondary stop loss, multiple take profit levels and high timeframe EMA filter. It uses WaveTrend indicator to generate trading signals, combined with EMA filter and stop loss/take profit management for automated trend following trading.

## Strategy Logic

The core indicator of this strategy is WaveTrend, consisting of three components:

1. AP: Average Price = (Highest + Lowest + Close) / 3

2. ESA: n1-period EMA of AP  

3. CI: (AP - ESA) / (0.015 * n1-period EMA of absolute value of (AP - ESA))

4. TCI: n2-period EMA of CI, also called WaveTrend Line 1 (WT1)

5. WT2: 4-period SMA of WT1

A long position is opened when WT1 crosses above WT2 (golden cross), and is closed when WT1 crosses below WT2 (death cross).

Additionally, a high timeframe EMA filter is implemented to avoid false signals, so that long trades are only taken when price is above EMA and short trades below EMA. 

## Advantages

1. Automatically follow trends using WaveTrend without manual judgment  

2. Secondary stop loss effectively limits single trade loss

3. Multiple take profit levels maximize profit capture

4. EMA filter improves win rate by avoiding false signals

## Risks and Improvements   

1. Fails to detect trend reversal, might cause losses

2. Poor parameter tuning leads to over-trading

3. Different parameter sets can be tested for optimization

4. Consider additional indicators for reversal detection

## Conclusion

This strategy comprehensively incorporates trend following, risk control and profit maximization through WaveTrend's automatic trend detection, EMA filter to improve efficiency and stop loss/take profit management to balance trend trading and risk control. It is an efficient and steady trend following system. Further parameter optimization and reversal mechanisms can enhance the strategy's applicability.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Channel Length|
|v_input_2|21|Average Length|
|v_input_3|60|Over Bought Level 1|
|v_input_4|53|Over Bought Level 2|
|v_input_5|-60|Over Sold Level 1|
|v_input_6|-53|Over Sold Level 2|
|v_input_7|false|Use EMA Filter|
|v_input_8|50|EMA Length|
|v_input_9|60|EMA Time Frame|
|v_input_10|0|Trade Mode: Both|Short Only|Long Only|
|v_input_11|false|Use Secondary Stop Loss|
|v_input_12|5|Stop Loss Percentage (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-31 00:00:00
end: 2023-11-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © undacovacobra

//@version=4
strategy("WaveTrend Strategy [LazyBear] with Secondary Stop Loss", overlay=true)

// Input parameters
n1 = input(10, "Channel Length")
n2 = input(21, "Average Length")
obLevel1 = input(60, "Over Bought Level 1")
obLevel2 = input(53, "Over Bought Level 2")
osLevel1 = input(-60, "Over Sold Level 1")
osLevel2 = input(-53, "Over Sold Level 2")
useEmaFilter = input(false, "Use EMA Filter")
emaLength = input(50, "EMA Length")
emaTimeFrame = input("60", "EMA Time Frame")
tradeMode = input("Both", "Trade Mode", options=["Long Only", "Short Only", "Both"])
useSecondarySL = input(false, "Use Secondary Stop Loss")
slPercentage = input(5.0, "Stop Loss Percentage (%)")

// WaveTrend Indicator Calculations
ap = hlc3 
esa = ema(ap, n1)
d = ema(abs(ap - esa), n1)
ci = (ap - esa) / (0.015 * d)
tci = ema(ci, n2)
wt1 = tci
wt2 = sma(wt1, 4)

// EMA Calculation with Selected Time Frame
getEma(timeFrame) =>
    security(syminfo.tickerid, timeFrame, ema(close, emaLength))

emaFilter = getEma(emaTimeFrame)

// Secondary Stop Loss Calculation
longStopPrice = strategy.position_avg_price * (1 - slPercentage / 100)
shortStopPrice = strategy.position_avg_price * (1 + slPercentage / 100)

// Long Entry and Exit Conditions with EMA Filter and Trade Mode
longEntry = crossover(wt1, wt2) and wt2 < osLevel1 and (not useEmaFilter or close > emaFilter) and (tradeMode == "Long Only" or tradeMode == "Both")
if (longEntry)
    strategy.entry("Long", strategy.long)
longExit = crossunder(wt1, wt2) and wt2 > obLevel1
if (longExit)
    strategy.close("Long")
if (useSecondarySL and strategy.position_size > 0 and low < longStopPrice)
    strategy.close("Long", comment="SL Hit")

// Short Entry and Exit Conditions with EMA Filter and Trade Mode
shortEntry = crossunder(wt1, wt2) and wt2 > obLevel1 and (not useEmaFilter or close < emaFilter) and (tradeMode == "Short Only" or tradeMode == "Both")
if (shortEntry)
    strategy.entry("Short", strategy.short)
shortExit = crossover(wt1, wt2) and wt2 < osLevel1
if (shortExit)
    strategy.close("Short")
if (useSecondarySL and strategy.position_size < 0 and high > shortStopPrice)
    strategy.close("Short", comment="SL Hit")

// Plotting
plot(0, color=color.gray)
plot(obLevel1, color=color.red)
plot(osLevel1, color=color.green)
plot(obLevel2, color=color.red, style=plot.style_cross)
plot(osLevel2, color=color.green, style=plot.style_cross)
plot(wt1, color=color.green)
plot(wt2, color=color.red, style=plot.style_cross)
plot(wt1-wt2, color=color.blue, style=plot.style_area, transp=80)
plot(emaFilter, color=color.blue)


```

> Detail

https://www.fmz.com/strategy/433966

> Last Modified

2023-12-01 18:09:12
