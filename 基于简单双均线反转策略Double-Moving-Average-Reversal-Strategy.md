
> Name

基于简单双均线反转策略Double-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f09efb4add3baf512a.png)

[trans]

### 概述

本策略是一个基于简单移动平均线的趋势跟踪和反转交易策略。它使用1日线和4日线的均线交叉来判断趋势方向,进而产生买入和卖出信号。

### 策略原理

当1日线从上方向下交叉4日线时,产生卖出信号;当1日线从下方向上交叉4日线时,产生买入信号。这样通过快速移动平均线和慢速移动平均线的交叉来判断市场趋势的转折点,进而获利。

入市后设置止损点和止盈点。止损点设置为入市价格之下10个点,止盈点设置为入市价格之上100个点。这样可以限制损失和锁定利润。

### 优势分析

- 使用双均线判断趋势反转点,简单实用
- 设置止损止盈点,可以限制风险
- 参数可调,可以适应不同市场情况
- 容易理解实现,适合初学者

### 风险分析

- 均线参数不当可能导致交易频繁或漏掉良好机会
- 止损止盈点设置不当,可能过早止损或止盈不充分
- 双均线判断趋势转折的滞后性可能导致亏损
- 参数不随市场环境变化而调整的话,效果会变差

可以通过调整均线参数,设置动态止损止盈机制,或加入其它指标判断来降低这些风险。

### 优化方向

- 可以考虑加入MACD,KD等其它指标来验证交易信号,过滤假信号
- 可以研究不同周期均线的效果
- 可以加入趋势判断指标,避免逆势交易
- 可以使止损止盈按比例移动,而不是固定值
- 可以结合波动率指标动态调整参数

### 总结

本策略整体来说是一个典型的双均线交易策略。它使用快慢均线交叉判断趋势转折点,设置止损止盈控制风险,简单实用,容易理解,适合初学者。通过参数调整和优化,可以适应不同市场环境,也可以加入其他指标过滤来提高效果。总的来说,本策略作为一个入门学习策略是非常不错的。

||


### Overview

This is a trend following and reversal trading strategy based on simple moving averages. It uses the crossover of 1-day and 4-day moving averages to determine the trend direction and generate buy and sell signals.

### Strategy Logic

When the 1-day MA crosses below the 4-day MA, a sell signal is generated. When the 1-day MA crosses above the 4-day MA, a buy signal is generated. By using the crossover of a fast and slow moving average to identify trend reversal points, it aims to profit. 

After entering the market, stop loss and take profit points are set. The stop loss is set 10 points below the entry price. The take profit is set 100 points above the entry price. This can limit losses and lock in profits.

### Advantage Analysis 

- Uses double MAs to identify reversal points simply and practially
- Sets stop loss and take profit to limit risk
- adjustable parameters adaptable to different market conditions
- easy to understand and implement, suitable for beginners

### Risk Analysis

- Invalid MA parameters may cause overtrading or missing opportunities 
- Improper stop loss and take profit setting may cause premature exit
- The lagging of double MAs identifying reversals may cause losses
- Poor performance if parameters are not adjusted per market changes

Risks can be mitigated by tuning parameters, setting dynamic stops, incorporating other indicators for signal validation etc.

### Optimization Directions

- Adding MACD, KD to filter fake signals 
- Studying the effect of different MA periods  
- Adding trend filter to avoid counter-trend trades
- Using proportional stops instead of fixed values
- Dynamically adjusting parameters by volatility

### Summary
This is a typical double MA reversal strategy overall. It identifies reversals by fast and slow MA crossovers, controls risk with stops, simple and practical to understand for beginners. With parameter tuning and optimizations, it can be adaptive and adding filters can improve it further. It is a very good starter strategy to learn.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © cesarpieres72

//@version=5
strategy("300% STRATEGY", overlay=true, margin_long=10, margin_short=10)
 
var float lastLongOrderPrice = na
var float lastShortOrderPrice = na

longCondition = ta.crossover(ta.sma(close, 1), ta.sma(close, 4))
if (longCondition)
    strategy.entry("Long Entry", strategy.long)  // Enter long

shortCondition = ta.crossunder(ta.sma(close, 1), ta.sma(close, 4))
if (shortCondition)
    strategy.entry("Short Entry", strategy.short)  // Enter short

if (longCondition)
    lastLongOrderPrice := close

if (shortCondition)
    lastShortOrderPrice := close

// Calculate stop loss and take profit based on the last executed order's price
stopLossLong = lastLongOrderPrice - 170  // 10 USDT lower than the last long order price
takeProfitLong = lastLongOrderPrice + 150  // 100 USDT higher than the last long order price
stopLossShort = lastShortOrderPrice + 170  // 10 USDT higher than the last short order price
takeProfitShort = lastShortOrderPrice - 150  // 100 USDT lower than the last short order price

// Apply stop loss and take profit to long positions
strategy.exit("Long Exit", from_entry="Long Entry", stop=stopLossLong, limit=takeProfitLong)

// Apply stop loss and take profit to short positions
strategy.exit("Short Exit", from_entry="Short Entry", stop=stopLossShort, limit=takeProfitShort) 
```

> Detail

https://www.fmz.com/strategy/435968

> Last Modified

2023-12-20 14:43:41
