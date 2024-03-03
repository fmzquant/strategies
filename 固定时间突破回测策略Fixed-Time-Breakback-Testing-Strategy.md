
> Name

固定时间突破回测策略Fixed-Time-Breakback-Testing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea46f2648a23eea77c.png)
[trans]

## 概述

该策略的主要思想是在固定的时间点(这里是每天UTC+5时区的08:35)开市后5分钟K线收盘时,判断该5分钟K线的收盘价是否较开盘价上涨或下跌,如果上涨就做多,如果下跌就做空,并设置长短仓的止盈目标。

## 策略原理

该策略的具体原理是:

1. 设置期望的交易时间,这里是UTC+5时区的每天08:35。

2. 在该时间点,判断当前5分钟K线的收盘价是否高于开盘价。如果收盘价高于开盘价,表示该5分钟K线收阳线,做多。

3. 如果收盘价低于开盘价,表示该5分钟K线收阴线,做空。

4. 做多后,设置以1000美元为止盈退出做多单。做空后,设置以500美元为止盈退出做空单。

## 优势分析

该策略有以下主要优势:

1. 策略思路清晰简单,容易理解和实现。

2. 固定的交易时间可以避免过夜风险。

3. 利用5分钟级别判断趋势判断精确。

4. 设置了止盈目标,可以锁定盈利。

## 风险分析

该策略也存在一些风险:

1. 固定交易时间可能错过市场其他时间段的交易机会。可以设置多个交易时间点。

2. 5分钟判断可能不够准确,可以结合多个时间周期判断。 

3. 收盘价与开盘价之间波动太大,设置止损可以降低风险。

4. 止盈设置可能过于武断,可以根据历史数据测试设置更优化的止盈点。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 设置多个交易时间点,覆盖更多交易机会。

2. 增加止损逻辑,降低亏损风险。

3. 结合更多周期指标判断趋势,提高判断准确性。

4. 用回测历史数据测试最优止盈点。

5. 动态调整仓位大小,根据具体情况管理风险。

## 总结

整体来说,该固定时间突破回测策略思路简单清晰,通过在固定时间点判断趋势方向入场,并设置止盈止损来锁定利润和控制风险,是一个基础而实用的量化交易策略。通过多组合参数优化和风控手段增强,可以成为一个可靠的量化交易系统。

|| 

## Overview

The main idea of this strategy is to judge whether the closing price of the 5-minute K-line after the market opens at a fixed time point (08:35 UTC+5 time zone here) is higher or lower than the opening price. If the closing price is higher than the opening price, go long. If the closing price is lower than the opening price, go short. And set profit targets for long and short positions.

## Strategy Principle 

The specific principle of this strategy is:

1. Set the desired trading time, which is 08:35 UTC+5 time zone here.  

2. At this time point, judge whether the closing price of the current 5-minute K-line is higher than the opening price. If the closing price is higher than the opening price, it means that the 5-minute K-line closed with a yang line, go long.

3. If the closing price is lower than the opening price, it means the 5-minute K-line closed with a yin line, go short.

4. After going long, set the profit target to exit the long position at $1000. After going short, set the profit target to exit the short position at $500.

## Advantage Analysis

The main advantages of this strategy are:

1. The strategy idea is simple and clear, easy to understand and implement.

2. The fixed trading time can avoid overnight risk.  

3. Using 5-minute levels to judge trends accurately.

4. Setting profit targets can lock in profits.

## Risk Analysis

There are also some risks to this strategy:

1. Fixed trading times may miss trading opportunities at other market times. Multiple trading times can be set.

2. 5-minute judgments may not be accurate enough, judgments can be made in combination with multiple timeframes.

3. The fluctuation between closing price and opening price is too large. Setting a stop loss can reduce risks.

4. Profit target settings may be too aggressive. More optimized profit points can be set based on historical data testing.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Set multiple trading times to cover more trading opportunities.  

2. Add stop loss logic to reduce loss risk.

3. Combine more cycle indicators to improve judgment accuracy.

4. Use historical data backtesting to test the optimal profit points. 

5. Dynamically adjust position size to manage risks based on specific situations.

## Summary 

In general, the idea of this fixed time breakback testing strategy is simple and clear. By judging the trend direction at fixed time points and setting profit targets and stop losses to lock in profits and control risks, it is a basic and practical quantitative trading strategy. With more parameter optimization and risk control measures, it can become a reliable quantitative trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|8|Desired Hour|
|v_input_int_2|35|Desired Minute|
|v_input_1|1000|Long Profit Target (USD)|
|v_input_2|500|Short Profit Target (USD)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-29 00:00:00
end: 2024-01-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Wajahat2

//@version=5
strategy("Buy Sell at 08:35 GMT+5 with Profit Targets", overlay=true)

// Set the desired trading time (08:35 GMT+5)
desiredHour = input.int(8, title="Desired Hour")
desiredMinute = input.int(35, title="Desired Minute")

// Convert trading time to Unix timestamp
desiredTime = timestamp(year, month, dayofmonth, desiredHour, desiredMinute)

// Check if the current bar's timestamp matches the desired time
isDesiredTime = time == desiredTime

// Plot vertical lines for visual confirmation
bgcolor(isDesiredTime ? color.new(color.green, 90) : na)

// Check if the current 5-minute candle closed bullish
isBullish = close[1] < open[1]

// Check if the current 5-minute candle closed bearish
isBearish = close[1] > open[1]

// Define profit targets in USD
longProfitTargetUSD = input(1000, title="Long Profit Target (USD)")
shortProfitTargetUSD = input(500, title="Short Profit Target (USD)")

// Execute strategy at the desired time with profit targets
strategy.entry("Buy", strategy.long, when= isBullish)
strategy.entry("Sell", strategy.short, when= isBearish)

// Set profit targets for the long and short positions
strategy.exit("Profit Target", from_entry="Buy", profit=longProfitTargetUSD)
strategy.exit("Profit Target", from_entry="Sell", profit=shortProfitTargetUSD)

```

> Detail

https://www.fmz.com/strategy/440300

> Last Modified

2024-01-29 10:22:07
