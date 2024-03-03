
> Name

动态策略分析工具Dynamic-Strategy-Analytics-Tool

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

这个策略的主要思想是实时模拟交易,收集每周的交易数据,并以表格的形式展示统计结果,以便更直观地查看策略的表现。它可以帮助我们快速评估策略的盈亏情况,找出策略表现不佳的时间段,据此进行策略调整和优化。

## 策略原理

1. 设置计算周期的开始和结束时间。

2. 设置统计结果的精确度和每组包含的周数。

3. 模拟RSI策略进行买入卖出。

4. 定义统计表中的变量。

5. 计算当前周期的结果。

6. 如果周期改变并且允许交易,记录这一周期的时间和结果。

7. 如果是最后一根K线且允许交易,记录当前周期的时间和结果。 

8. 如果周期改变且不允许交易,记录上一周期的时间和结果。

9. 寻找最高和最低的周期结果。

10. 渲染统计表格。

- 首先计算统计周期的总数

- 遍历每一个周期,渲染表头、时间和结果

- 对每组周期结果进行累积

- 用颜色标记正负结果

## 优势分析

- 可以实时观察每周交易结果,快速评估策略表现

- 直观展示结果,一目了然,便于找出策略表现差的周期

- 可以根据时间段的盈亏情况,调整和优化策略参数

- 可以方便地跟踪长期持仓策略的多周累积收益

- 可以对不同时间段的交易风格进行对比分析

- 自定义统计精度和分组周数,满足不同需求

- 代码实现简单清晰,容易理解和二次开发

## 风险分析

- 本策略基于RSI进行模拟交易,RSI策略本身存在跟随趋势不够强的缺点

- 在实盘中,交易费用会对结果产生较大影响

- 用于回测的历史数据不一定能反映实际交易环境

- 统计结果依赖真实账户资金数额,回测中默认资金数额不一定准确

- 需要注意防止过拟合,根据回测结果盲目修改策略参数

可以通过结合更多指标判断趋势,优化入场退出点,来增强RSI策略。实盘交易时注意按真实参数设置手续费。在回测阶段增大资金数额的波动,使之更贴近实际情况等。要持怀疑态度,避免根据统计结果过度调整策略。

## 优化方向

- 可以考虑加入止损逻辑,控制单笔损失

- 可以优化策略参数,如调整RSI的看涨看跌阈值

- 可以尝试不同的交易频率,例如日内交易或月度持仓

- 可以加入更多指标判断市场趋势和入场时机

- 可以考虑加入止盈逻辑

- 可以优化统计参数的设置

- 可以考虑实现对多种资产的统计

通过加入止损止盈,可以更好控制风险和收益比。优化RSI参数可以提高获胜率。采用更多指标和不同交易频率可以使策略更稳定。调整统计参数可以使结果更突出重点。从单一资产扩展到多资产统计,可以全面判断策略效果。

## 总结

该策略的目的是收集周期交易结果,以统计表格的形式直观展示,可以快速判断策略在不同时间段的盈亏情况。这为策略优化提供了数据支持。优点是可以实时查看每周结果,直观清晰,易于二次开发。需要注意的是,统计结果可能会导致过度依赖和拟合回测数据。我们应保持理性,结合策略本身的原理进行综合判断,用统计结果来发现问题而不是直接作为修改的依据。总体来说,该策略为快速评估策略表现提供了便利,在策略优化中发挥着重要作用。

|| 

## Overview

The main idea of this strategy is to simulate real-time trading, collect weekly trading data, and present the statistics in a table for more intuitive review of the strategy's performance. It can help us quickly evaluate the profit and loss of the strategy, identify periods of poor performance, and optimize the strategy accordingly.

## Strategy Logic

1. Set the start and end time for the calculation period.

2. Set the precision of statistics and the number of weeks in each group. 

3. Simulate RSI strategy for entries and exits.

4. Define variables for the statistics table.

5. Calculate the result for the current period.

6. If period changes and trading is enabled, record the time and result for this period.

7. If it's the last bar and trading is enabled, record the time and result for the current period.

8. If period changes and trading is disabled, record the time and result for the previous period.

9. Find highest and lowest period results.

10. Render the statistics table.

- Calculate total number of statistical periods first 

- Iterate through each period, render headers, time and results

- Cumulatively calculate the result for each group

- Color code positive and negative results

## Advantage Analysis

- Can observe weekly results in real time for quick strategy evaluation

- Intuitive presentation of results for clear insights

- Help identify periods of poor performance for strategy adjustment

- Convenient to track cumulative gains for long-term strategies  

- Can compare trading styles across different time periods

- Customizable precision and groups to meet different needs

- Simple and clear code, easy to understand and extend

## Risk Analysis

- The strategy is based on RSI, which has inherent trend following limitations

- Trading costs can significantly impact actual results 

- Backtest data may not reflect actual market conditions

- Default capital in backtest may not match real account size

- Avoid overfitting by blindly tuning parameters based on statistics

Can incorporate more indicators for trend and optimize entries and exits to improve basic RSI strategy. Use actual trading costs in live trading. Add randomness to capital size in backtest. Maintain skepticism instead of over-tuning based on statistics.

## Optimization Directions

- Consider adding stop loss to limit downside

- Optimize RSI parameters like overbought and oversold levels

- Try different trading frequencies like intraday vs. monthly holding

- Incorporate more indicators for trend and timing

- Add profit taking logic

- Optimize statistical parameter settings 

- Expand to track multiple assets

Stops can better manage risk/reward. RSI tuning improves win rate. More indicators and frequencies make strategy robust. Statistical tuning highlights important data. Expanding to multiple assets gives complete view.

## Summary

The goal is to collect periodic results for intuitive statistical visualization to quickly judge performance across time. This provides data to optimize strategies. Strengths include real-time weekly results, clarity and extensibility. Be wary of over-reliance and curve-fitting with statistical outputs. Use rationally along with core strategy logic for insights, not as basis for changes. Overall, convenient way to assess performance and crucial for optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2019 00:00 UTC)|Trade after|
|v_input_2|timestamp(31 Dec 2024 23:59 UTC)|Trade before|
|v_input_int_1|true|(?Statistic visualisation)Statistic precision|
|v_input_int_2|12|Statistic group size|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-10-12 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// strategy('Strategy weekly results as numbers v1', overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=25, commission_type=strategy.commission.percent, commission_value=0.04)

after = input(title='Trade after', defval=timestamp('01 Jan 2019 00:00 UTC'), tooltip="Strategy will be executed after this timestamp. The statistic table will include only periods after this date.")
before = input(title='Trade before', defval=timestamp('31 Dec 2024 23:59 UTC'), tooltip="Strategy will be executes before this timestamp. The statistic table will include only periods before this date.")

statisticPrecision = input.int(title='Statistic precision', group='Statistic visualisation', defval=1, tooltip="Defines how many digits should be rendered in every statistic cell.")
statisticGroupSize = input.int(title='Statistic group size', group='Statistic visualisation', defval=12, tooltip="Defines how many cells should be in one group inside the statistic table.")

// determinet whether the starategy should be traded between the period
isTradeEnabled = true


// *******************************************************************************************
// Core strategy simulation logic
// *******************************************************************************************
// calculate rsi strategy emulation data
rsiEmulationData = ta.rsi(close, 7)
rsiEmulationCrossover = ta.crossover(rsiEmulationData, 70)
rsiEmulationCrossunder = ta.crossunder(rsiEmulationData, 30)

// entry loogic based on the rsi calculations
if (isTradeEnabled and rsiEmulationCrossover)
    strategy.entry('Long', strategy.long)
if (isTradeEnabled and rsiEmulationCrossunder)
    strategy.entry('Short', strategy.short)


// *******************************************************************************************
// Weekly statistics table
// *******************************************************************************************
// define statistic variables
var statisticTable = table(na)
var statisticPeriodTime = array.new_int(0)
var statisticPeriodResult = array.new_float(0)
var statisticIsLatestCalculated = bool(na)
var statisticResultHighest = float(na)
var statisticResultLowest = float(na)
var statisticColorGray = color.new(color.gray, transp = 60)
var statisticColorGreen = color.new(color.green, transp = 60)
var statisticColorRed = color.new(color.red, transp = 60)

// claculate current period result
barResult = not na(strategy.equity[1])
             ? (strategy.equity / strategy.equity[1] - 1) : 0
isPeriodChanged = not na(time[1]) and weekofyear(time) != weekofyear(time[1])
currentPeriodResult = 0.0
currentPeriodResult := not na(currentPeriodResult[1]) and not isPeriodChanged
                       ? ((1 + currentPeriodResult[1]) * (1 + barResult) - 1) : 0.0

// initialise highest and lowest results variables
statisticResultHighest := na(statisticResultHighest) ? currentPeriodResult : statisticResultHighest
statisticResultLowest := na(statisticResultLowest) ? currentPeriodResult : statisticResultLowest

// search for highest and lowest results
statisticResultHighest := currentPeriodResult > statisticResultHighest ? currentPeriodResult : statisticResultHighest
statisticResultLowest := currentPeriodResult < statisticResultLowest ? currentPeriodResult : statisticResultLowest

// new week while trade is active
if isPeriodChanged and isTradeEnabled
    timeCalculated = time - 1000 * 60 * 60 * 24 * 7
    resultCalculated = currentPeriodResult[1]
    statisticIsLatestCalculated := false

    array.push(statisticPeriodTime, timeCalculated)
    array.push(statisticPeriodResult, resultCalculated)

// latest bar while trade is active
if barstate.islast and isTradeEnabled
    timeCalculated = time - 1000 * 60 * 60 * 24 * (dayofweek(time) - 2)
    resultCalculated = currentPeriodResult

    array.push(statisticPeriodTime, timeCalculated)
    array.push(statisticPeriodResult, resultCalculated)

// new week after trade disabled
if isPeriodChanged and not isTradeEnabled and not na(statisticIsLatestCalculated) and not statisticIsLatestCalculated
    timeCalculated = time - 1000 * 60 * 60 * 24 * (dayofweek(time) + 5)
    resultCalculated = currentPeriodResult[1]
    statisticIsLatestCalculated := true

    array.push(statisticPeriodTime, timeCalculated)
    array.push(statisticPeriodResult, resultCalculated)

// render statistics table
if barstate.islast
    statisticLength = array.size(statisticPeriodResult)
    statisticTableSteps = math.floor(statisticLength / statisticGroupSize) + (statisticLength % statisticGroupSize != 0 ? 1 : 0)
    statisticTable := table.new(position.bottom_right, columns = statisticGroupSize + 2, rows = statisticTableSteps + 1, border_width = 1)

    // render headers
    for i = 0 to (statisticGroupSize - 1)
        statisticHeaderContent = str.tostring(i + 1)
        table.cell(statisticTable, 1 + i, 0, statisticHeaderContent, bgcolor = statisticColorGray)

    // render time points
    for i = 0 to (statisticTableSteps - 1)
        statisticPointContent = str.format("{0,date,medium}", array.get(statisticPeriodTime, i * statisticGroupSize))
        table.cell(statisticTable, 0, 1 + i, statisticPointContent, bgcolor = statisticColorGray)

    // render the result
    statisticResultCummulative = 0.0
    for i = 0 to (array.size(statisticPeriodTime) - 1)
        statisticColumn = 1 + i % statisticGroupSize
        statisticRow = 1 + math.floor(i / statisticGroupSize)

        statisticResult = array.get(statisticPeriodResult, i)
        statisticResultCummulative := (i % statisticGroupSize == 0) ? 0.0 : statisticResultCummulative
        statisticResultCummulative := (1 + statisticResultCummulative) * (1 + statisticResult) - 1

        statisticResultColor = statisticResult > 0 ? statisticColorGreen : statisticColorRed
        table.cell(statisticTable, statisticColumn, statisticRow, str.tostring(math.round(statisticResult * 100, statisticPrecision)), bgcolor = statisticResultColor)

        // if it is the last item of the row or data array
        isStatisticLastOfTheRow = ((i + 1) % statisticGroupSize) == 0
        isStatisticLastOfTheData = i == (statisticLength - 1)
        if (isStatisticLastOfTheRow or isStatisticLastOfTheData)
            resultsTableCummulativeCellColor = statisticResultCummulative > 0 ? statisticColorGreen : statisticColorRed
            resultsTableCummulativeCellContent = str.tostring(math.round(statisticResultCummulative * 100, statisticPrecision))
            table.cell(statisticTable, 1 + statisticGroupSize, statisticRow, resultsTableCummulativeCellContent, bgcolor = resultsTableCummulativeCellColor)
```

> Detail

https://www.fmz.com/strategy/429150

> Last Modified

2023-10-13 15:54:35
