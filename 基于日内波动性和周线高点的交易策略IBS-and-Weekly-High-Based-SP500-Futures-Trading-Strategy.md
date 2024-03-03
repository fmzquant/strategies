
> Name

基于日内波动性和周线高点的交易策略IBS-and-Weekly-High-Based-SP500-Futures-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11eddfea9b2c0a86a19.png)
 [trans]

## 概述

该策略是一个基于日内波动性指标IBS和周线高点的简单SP500期货交易策略。它只在周一开盘时发出交易信号,利用IBS低于0.5和价格低于上周五收盘价的条件判断入场时机。之后将在5个交易日后平仓退出。

## 策略原理

该策略主要基于两个指标进行判断:

1. IBS - 日内波动性指标,用于判断当天的波动性是否足够低。计算方法为:(收盘价 - 最低价) / (最高价 - 最低价)。当IBS低于0.5时,认为波动性较低,适合入场。

2. 周线高点 - 使用上周五的收盘价作为参考高点。如果当前周一收盘价低于上周五收盘价,则可能形成转折,产生交易机会。

入场条件为:周一 + IBS < 0.5 + 收盘价 < 上周五收盘价。

出场条件为:5个交易日后收盘或次日开盘即刻高点取反。

## 策略优势

该策略主要具有以下优势:

1. 策略逻辑简单清晰,容易理解和实现。
2. 只在周一开盘才可能发出信号,避免过度交易。
3. 利用IBS指标判断日内波动性,有利锁定趋势转换点。
4. 周线结构参考简单有效,容易判断是否形成转折。
5. 风险控制到位, Drawdown有限。

## 策略风险

该策略也存在一些风险:

1. IBS和周线结构判断依据仅为技术指标,可能出现误判的情况。
2. 固定5天出场时间导致可能额外损益。应设置动态出场条件。
3. 仅交易周一周期性很强,信号频次过低,容易错过其他时间段信号。
4. 回撤控制可能欠佳,最大回撤可能过大。

## 策略优化

该策略可以从以下几个方面进行优化:

1. 增加更多技术指标的确认,提高信号准确率。例如增强短期趋势、支撑压力位、成交量等指标的判断逻辑。

2. 设置动态出场条件,根据实时波动设置止损或止盈价格。避免固定时间导致的额外损益。

3. 扩大策略交易时间段,不限于周一。合理设置其他交易日的入场条件,提高信号覆盖面。

4. 引入风险管理模块,利用止损策略控制回撤。可以设置浮动止损、跟踪止损等方式优化。

## 总结

本策略总体来说是一个基于日内指标IBS和周线结构判断的简单短线交易策略。策略思路清晰,实现简单,风险容易控制。但也存在一定概率的信号误判和潜在回撤过大的问题。未来优化空间在于加入更多技术指标判断,设置动态止损机制等。通过不断测试和优化,逐步提高策略胜率和盈利能力。

||

## Overview

This is a simple SP500 futures trading strategy based on the intraday volatility index IBS and weekly highs. It only sends trading signals on Monday opening, using the conditions of IBS below 0.5 and price lower than last Friday's close to determine entry timing. It will exit in 5 trading days later.

## Strategy Principle  

The strategy mainly judges based on two indicators:

1. IBS - Intraday Breadth Strength, used to determine whether the volatility of the day is low enough. The calculation method is: (close - low) / (high - low). When the IBS is below 0.5, the volatility is considered to be low, which is suitable for entering.

2. Weekly High - Use last Friday's close as the reference high point. If this Monday's close is lower than last Friday's close, it may form a reversal and generate trading opportunities.

The entry conditions are: Monday + IBS <0.5 + Close < Last Friday's Close.

The exit conditions are: close in 5 trading days or opening high point reversal the next day.

## Strategy Advantages

The main advantages of this strategy are:

1. The strategy logic is simple and clear, easy to understand and implement.
2. Signals can only be issued on Monday opening, avoiding excessive trading.
3. Use the IBS indicator to determine intraday volatility, which is good for locking the turning point of trends. 
4. The weekly structure reference is simple and effective to judge whether a reversal is formed.
5. The risk control is in place with limited drawdown.

## Strategy Risks  

There are also some risks in this strategy:

1. IBS and weekly structure judgments rely solely on technical indicators, which may cause misjudgments.
2. The fixed 5-day exit time can lead to additional gains or losses. Dynamic exit conditions should be set.
3. Trading only on Mondays has strong cycle, with too few signal frequency, easily missing signals at other times.  
4. The drawdown control may be inadequate, with excessive maximum drawdown.

## Strategy Optimization

The strategy can be optimized in the following aspects:

1. Increase more technical indicators confirmation to improve signal accuracy. Such as enhanced short-term trends, support/resistance, volume and other judgment logics.

2. Set dynamic exit conditions based on real-time fluctuations to set stop loss or take profit price. Avoid additional gain/loss caused by fixed exit time.

3. Expand the trading time frame of the strategy instead of limiting to Mondays. Reasonably set entry conditions for other trading days to improve signal coverage.

4. Introduce risk management modules to control drawdowns using stop loss strategies. Methods like floating stop loss, trailing stop loss can be used to optimize.

## Conclusion  

In general, this strategy is a simple short-term trading strategy based on intraday IBS indicators and weekly structure judgments. The strategy idea is clear, easy to implement with controllable risks. But there are also certain probabilities of signal misjudgments and potential excessive drawback problems. Future optimization spaces lie in adding more technical indicators, setting dynamic stop loss mechanisms and so on. By continuously testing and optimizing, gradually improve the win rate and profitability of the strategy.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-15 00:00:00
end: 2024-01-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © hobbiecode

// Today is Monday.
// The close must be lower than the close on Friday.
// The IBS must be below 0.5.
// If 1-3 are true, then enter at the close.
// Sell 5 trading days later (at the close).

//@version=5
strategy("Hobbiecode - SP500 IBS + Higher", overlay=true)

// Check if it's Monday
isMonday = dayofweek(time) == dayofweek.monday

// Calculate the IBS (Intraday Breadth Strength) indicator
ibs = (close - low) / (high - low)

// Calculate the close on the previous Friday
prevFridayClose = request.security(syminfo.tickerid, "W", close[1])

// Entry conditions
enterCondition = isMonday and close < prevFridayClose and ibs < 0.5 and strategy.position_size < 1 

// Exit conditions
exitCondition = (close > high[1] or ta.barssince(enterCondition) == 4) and strategy.position_size > 0 

// Entry signal
if enterCondition
    strategy.entry("Buy", strategy.long)

// Exit signal
if exitCondition
    strategy.close("Buy")

// Plotting the close, previous Friday's close, and entry/exit points on the chart
plot(close, title="Close", color=color.blue)
plot(prevFridayClose, title="Previous Friday Close", color=color.orange)
plotshape(enterCondition, title="Enter", location=location.belowbar, color=color.green, style=shape.labelup, text="Enter")
plotshape(exitCondition, title="Exit", location=location.abovebar, color=color.red, style=shape.labeldown, text="Exit")





```

> Detail

https://www.fmz.com/strategy/438807

> Last Modified

2024-01-15 14:42:00
