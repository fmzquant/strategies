
> Name

动态止损追踪策略Trailing-Stop-Loss-Percent-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e9440ada607c5d1b7d.png)
[trans]
## 概述

本策略是一个具有特定日期触发的多头仓位建立和 trailing stop loss 风险管理机制的策略。该策略特别适用于希望根据特定日历日期自动化仓位进入,并通过动态风险控制方法如追踪止损来管理仓位的交易者。

## 策略原理

该策略首先通过input输入特定的入市日期,包括月日,然后根据这些日期计算出准确的入市时间戳。策略还输入了追踪止损的百分比参数。

在入市日期当天,策略会打开多头仓位。同时,记录最高价highestPrice和止损价stopLoss。其中最高价会在后续时间不断更新,而止损价是按最高价的一定百分比向下 trailing。

如果价格低于止损价,则平仓退出。否则仓位一直持有,止损价会根据最高价持续向下追踪,从而锁定利润,控制风险。

## 优势分析

该策略具有以下几个主要优势:

1. 可根据特定日期自动化入市。适合围绕重大事件交易的策略。
2. 应用追踪止损机制,可以动态锁定利润,有效控制风险。
3. 止损按比例设置,操作简单直观。可自定义止损幅度。
4. 可实现长期持仓,最大限度获取股价上涨收益。

## 风险分析

该策略也存在一些风险:

1. 存在止损失效风险。如果股价短期大幅下跌超过止损线 then反弹,会被止损出场,无法参与后续反弹。
2. 无法限制最大亏损。如果追踪止损比例设置过大,则最大亏损可能超过理想范围。

对应优化措施:
1. 可结合其他指标判断大盘面临调整时,暂时关闭追踪止损,避免止损失效。
2. 设置追踪止损比例时需谨慎,通常不超过10%。或设置最大允许亏损数值。

## 优化方向  

该策略可以从以下几个方向进行优化:

1. 增加止盈机制。当价格超过一定水平时,例如上涨50%,则部分或全部获利了结。
2. 结合指数指标判断市场结构,优化追踪止损的幅度。例如大盘处于震荡调整时,可适当放宽幅度。
3. 增加仓位管理模块。当价格重新突破新高时,可考虑加仓,进一步追加利润。

## 总结

本策略基于特定日期入市并采用追踪止损的思路,可以自动化入场并动态控制风险。策略简单直观,易于操作,适合长线持仓。通过进一步优化,可成为一个非常实用的量化交易策略。

||

## Overview

This strategy is designed for a long position entry with a date-specific trigger and a trailing stop loss mechanism for risk management. It is particularly useful for traders who want to automate their entries based on specific calendar dates and manage their positions with a dynamic risk control method like a trailing stop loss.

## Strategy Logic  

The strategy first takes input of specific entry dates, including month and day, then calculates the accurate entry timestamp based on these dates. It also inputs the percentage parameter for trailing stop loss.  

On the entry date, the strategy will open a long position. At the same time, it records the highest price (highestPrice) and stop loss price (stopLoss). The highestPrice keeps updating over time, while the stopLoss trails it by a certain percentage downwards.  

If the price falls below the stopLoss, the position will be closed. Otherwise, the position remains open, and the stopLoss keeps trailing the highestPrice to lock in profits and control risk.

## Advantage Analysis

The main advantages of this strategy are:

1. Automated entry based on specific dates. Suitable for strategies trading around significant events.  
2. Applies trailing stop loss to dynamically lock in profits and effectively manage risks.
3. Stop loss set as percentage, simple and intuitive to operate. Customizable loss range.  
4. Allows long-term holding to maximize upside potential.

## Risk Analysis  

There are also some risks:

1. Risk of stop loss failure. If price drops sharply below stop loss briefly then bounces back, the position may get stopped out and fail to capture the rebound.
2. No limit on maximum loss. If trailing stop loss percentage set too wide, max loss can exceed expectations.

Possible improvements:
1. Combine other indicators to pause trailing stop when market faces correction, avoiding failure.
2. Set stop loss percentage carefully, usually under 10%. Or set maximum tolerable loss.  

## Optimization  

Possible optimization directions:

1. Add profit taking mechanisms. When price rises 50% etc, take partial or full profits.
2. Optimize trailing width based on market regime signals from indices. Widen when market consolidating.   
3. Enhance position sizing. Consider pyramiding when new highs breakout for greater profits.

## Conclusion  

This strategy provides automated date-based entry and dynamic risk management via trailing stop loss. Simple and intuitive to operate, suitable for long-term holdings. Further optimizations can make it a very practical quant trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|Entry Day|
|v_input_int_2|true|Entry Month|
|v_input_int_3|2023|Entry Year|
|v_input_float_1|5|Trailing Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-24 00:00:00
end: 2024-01-31 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Trailing Stop Loss Percent",
     overlay=true, pyramiding=1)

// Input for the specific entry date
entryDay = input.int(defval = 1, title = "Entry Day", minval = 1, maxval = 31)
entryMonth = input.int(defval = 1, title = "Entry Month", minval = 1, maxval = 12)
entryYear = input.int(defval = 2023, title = "Entry Year", minval = 1970)

// Calculate the entry date timestamp
entryDate = timestamp(entryYear, entryMonth, entryDay, 00, 00)

// Trailing Stop Loss Percentage
trailStopPercent = input.float(defval = 5.0, title = "Trailing Stop Loss (%)", minval = 0.1)

// Entry Condition
enterTrade = true

// Variables to track the highest price and stop loss level since entry
var float highestPrice = na
var float stopLoss = na

// Update the highest price and stop loss level
if strategy.position_size > 0
    highestPrice := math.max(highestPrice, high)
    stopLoss := highestPrice * (1 - trailStopPercent / 100)

// Enter the strategy
if enterTrade
    strategy.entry("Long Entry", strategy.long)
    highestPrice := high
    stopLoss := highestPrice * (1 - trailStopPercent / 100)

// Exit the strategy if the stop loss is hit
if strategy.position_size > 0 and low <= stopLoss
    strategy.close("Long Entry")

// Plotting the stop loss level for reference
plot(strategy.position_size > 0 ? stopLoss : na, "Trailing Stop Loss", color=color.red)
```

> Detail

https://www.fmz.com/strategy/440691

> Last Modified

2024-02-01 11:05:36
