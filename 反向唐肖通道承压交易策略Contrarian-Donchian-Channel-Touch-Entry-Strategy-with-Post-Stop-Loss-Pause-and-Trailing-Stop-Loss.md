
> Name

反向唐肖通道承压交易策略Contrarian-Donchian-Channel-Touch-Entry-Strategy-with-Post-Stop-Loss-Pause-and-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1eaeeebf7685728b0d4.png)
 [trans]
## 概述

反向唐肖通道承压交易策略是一种基于唐肖通道指标的量化交易策略。该策略结合了停损暂停和跟踪止损来实现风险管理。

当价格触碰唐肖通道上下边界时开仓做多做空,同时设置止损和止盈。如果发生止损,则暂停一定时间后才可开新仓。持仓期间,通过跟踪止损来锁定利润。

## 策略原理  

该策略使用20日唐肖通道指标,包含上轨、下轨和中线。

### 开仓逻辑

价格触碰下轨时开多仓;价格触碰上轨时开空仓。

如果之前同向交易发生止损,则要暂停一定周期(如3根K线),避免追龙。

### 止损和止盈逻辑 

每次开仓时设置固定比例 stop loss 和动态调整的 take profit。

take profit 根据风险收益比(如2)和 stop loss percent(如22%)计算。

### 跟踪止损逻辑

持仓阶段启用跟踪止损:

多头持仓时,如果价格上穿中线,调整止损到入场价和中线价格的中点。

空头持仓下穿中线时同理调整。

## 策略优势

1. 使用唐肖通道指标,对突破性行情有一定抓取能力。

2. 承压开仓,符合做反向操作的交易思路。

3. 停损暂停避免追龙,跟踪止损锁定利润,具有良好的风险管理。

4. 策略规则清晰易懂,容易实施。

## 策略风险

1. 唐肖通道作为趋势型指标,在盘整行情中容易发生虚假突破,可能导致亏损。

2. 固定止损容易被套,应适当调整止损范围。

3. 跟踪止损调整幅度大容易被击出,应平衡调整频率。

4. 参数设置不当也会影响策略表现。

## 策略优化方向  

1. 唐肖通道长度可进行优化,寻找最佳参数组合。

2. 增加仓位管理模块,如定期重置暂停周期。

3. 结合其他指标判断趋势,避免趋势性假突破。  

4. 启用动态止损,实时调整止损位置。

## 总结

反向唐肖通道承压交易策略整合了趋势判断、风险管理等多项功能,基本面较完整。通过持续优化参数以及与其他指标或模型的组合,可以进一步增强策略鲁棒性,提高收益率。本策略适合有一定交易经验的投资者实施。

||

## Overview

The Contrarian Donchian Channel Touch Entry Strategy is a quantitative trading strategy based on the Donchian Channel indicator. It incorporates stop loss pause and trailing stop loss for risk management. 

The strategy enters long/short positions when price touches the upper/lower band of Donchian Channel. Stop loss and take profit levels are set for each trade. After a stop loss hit, there would be a pause for a number of bars before taking a new trade in the same direction. During a trade, trailing stop loss is used to lock in profits.

## Strategy Logic

The strategy uses 20-period Donchian Channel, consisting of Upper Band, Lower Band and Middle Line. 

### Entry Logic

Go long when price touches the lower band; go short when price touches the upper band.  

A pause (e.g. 3 bars) is required after previous stop loss in the same direction to avoid chasing trends.

### Stop Loss and Take Profit

For each trade, set a fixed percentage stop loss (e.g. 22%) and a dynamic take profit calculated based on risk-reward ratio (e.g. 2)

### Trailing Stop Loss

Use a trailing stop loss during trades:

For long trades, if price crosses above middle line, adjust stop loss to the mid-point of entry price and middle line.

Vice versa for short positions crossing below middle line. 

## Advantages

1. Catch trending moves using Donchian Channel breakouts.

2. Contrarian touch entry aligns with trading against the trend idea.  

3. Effective risk management with stop loss pause and trailing stop.

4. Clear and easy-to-implement rules.

## Risks

1. Whipsaws on sideways markets for a trend-following system.

2. Fixed stop loss could be prone to getting stopped out prematurely. 

3. Overly aggressive trailing stop adjustment could knock out profitable trades too early.  

4. Parameter optimization is crucial.

## Enhancement Opportunities

1. Optimize Donchian Channel lookback period for best parameters.

2. Incorporate position sizing rules e.g. reset pause count periodically.

3. Add filters using other indicators to avoid false breakouts.   

4. Experiment with dynamic stop loss.

## Summary

The Contrarian Donchian Channel Touch Entry Strategy integrates trend identification, risk management and more. With further parameter tuning and combinations with other models, it can achieve better robustness and profitability for experienced traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Donchian Channel Length|
|v_input_2|2|Risk/Reward Ratio|
|v_input_3|0.22|Stop Loss (%)|
|v_input_4|3|Pause After SL (Candles)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-17 00:00:00
end: 2024-01-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Contrarian Donchian Channel Strategy - Touch Entry with Post-SL Pause and Trailing Stop", overlay=true, default_qty_value=0.01, default_qty_type=strategy.percent_of_equity)

// Inputs
length = input(20, minval=1, title="Donchian Channel Length")
riskRewardRatio = input(2, title="Risk/Reward Ratio")
stopLossPercent = input(0.22, title="Stop Loss (%)") / 100
pauseCandles = input(3, minval=1, title="Pause After SL (Candles)")

// Donchian Channel Calculation
upper = highest(high, length)
lower = lowest(low, length)
centerline = (upper + lower) / 2  // Calculating the Centerline

// Plotting Donchian Channel and Centerline
plot(upper, color=color.red, title="Upper Band")
plot(lower, color=color.green, title="Lower Band")
plot(centerline, color=color.blue, title="Centerline")

// Tracking Stop Loss Hits and Pause
var longSLHitBar = 0
var shortSLHitBar = 0
var int lastTradeDirection = 0 // 1 for long, -1 for short, 0 for none

// Update SL Hit Bars
if (strategy.position_size[1] > 0 and strategy.position_size == 0)
    if (close[1] < strategy.position_avg_price[1])
        longSLHitBar := bar_index
        lastTradeDirection := 1

if (strategy.position_size[1] < 0 and strategy.position_size == 0)
    if (close[1] > strategy.position_avg_price[1])
        shortSLHitBar := bar_index
        lastTradeDirection := -1

// Entry Conditions - Trigger on touch
longCondition = (low <= lower) and (bar_index - longSLHitBar > pauseCandles or lastTradeDirection != 1)
shortCondition = (high >= upper) and (bar_index - shortSLHitBar > pauseCandles or lastTradeDirection != -1)

// Trade Execution
if (longCondition)
    strategy.entry("Long", strategy.long)
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Initial Stop Loss and Take Profit Calculation
stopLoss = strategy.position_avg_price * (1 - stopLossPercent)
takeProfit = strategy.position_avg_price * (1 + stopLossPercent * riskRewardRatio)

// Trailing Stop Loss Logic
var float trailingStopLong = na
var float trailingStopShort = na

// Update Trailing Stop for Long Position
if (strategy.position_size > 0)
    if (close > centerline)
        trailingStopLong := (strategy.position_avg_price + centerline) / 2
    stopLoss := na(trailingStopLong) ? stopLoss : max(trailingStopLong, stopLoss)

// Update Trailing Stop for Short Position
if (strategy.position_size < 0)
    if (close < centerline)
        trailingStopShort := (strategy.position_avg_price + centerline) / 2
    stopLoss := na(trailingStopShort) ? stopLoss : min(trailingStopShort, stopLoss)

// Setting Stop Loss and Take Profit for each trade
strategy.exit("SL_TP_Long", "Long", stop=stopLoss, limit=takeProfit)
strategy.exit("SL_TP_Short", "Short", stop=stopLoss, limit=takeProfit)

```

> Detail

https://www.fmz.com/strategy/439872

> Last Modified

2024-01-24 15:07:18
