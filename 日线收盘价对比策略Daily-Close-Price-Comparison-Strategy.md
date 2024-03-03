
> Name

日线收盘价对比策略Daily-Close-Price-Comparison-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过比较当前K线的收盘价与前一日的收盘价,判断多空方向。属于简单的趋势跟踪策略,当价格上涨时做多,下跌时做空。无需复杂指标判断,通过最基本的价格信息判断趋势方向。

## 策略原理 

1. 计算当前K线收盘价与前一日收盘价的差价比例。

2. 比例大于设定阈值时,表示价格上涨,做多。

3. 比例小于负的设定阈值时,表示价格下跌,做空。

4. 阈值设定为0,即只要上涨就做多,下跌就做空。

5. 没有设置止损止盈逻辑,全靠趋势持续性来实现盈利。

## 优势分析

1. 非常简单直观的趋势判断方法,容易理解实现。

2. 无需计算任何技术指标,降低计算资源占用。

3. 只关注最核心的价格信息,减少不必要的指标噪音。

4. 回测表现优异,但实盘效果存疑。

## 风险分析

1. 没有止损设置,存在无限亏损的风险。

2. 无法有效处理盘整波动市场,容易被套。

3. 存在过拟合风险,实盘效果待验证。

4. 单纯跟踪趋势无法锁定利润,实现的盈利有限。

## 优化方向

1. 增加移动止损策略,使亏损可控。

2. 结合波动率指标,降低盘整市被套率。

3. 测试不同天数周期参数设定,提高稳定性。 

4. 增加趋势判断指标,避免非理性价格波动。

5. 优化止盈策略,如回看最高价等,扩大盈利空间。

## 总结

该策略核心思路简单,但实盘效果存疑。需要强化风险控制机制,并进行参数优化测试,才能使之真正可实际应用。但基本思路值得借鉴学习。

|| 

## Overview

This strategy determines direction by comparing the current bar's closing price to previous bar's closing price. It is a simple trend following strategy, going long when price rises and short when price drops. No complex indicators are needed, just the most basic price information is used to determine trend direction.

## Strategy Logic

1. Calculate percentage difference between current bar's closing price and previous bar's closing price.

2. If percentage is greater than the threshold, it indicates rising price, go long. 

3. If percentage is less than negative threshold, it indicates falling price, go short.

4. Threshold is set to 0, meaning go long on any rise and short on any drop.

5. No stop loss or take profit logic, relying solely on trend persistence for profitability.

## Advantage Analysis 

1. Very simple and intuitive trend determination method, easy to understand and implement.

2. No need to compute any technical indicators, reducing resource consumption. 

3. Only focuses on core price information, avoiding unnecessary indicator noise.

4. Excellent backtest results but live performance is questionable.

## Risk Analysis

1. No stop loss exposes unlimited loss risks.

2. Ineffective in range-bound choppy markets, prone to being trapped.

3. Overfitting risks exist, live performance yet to be validated. 

4. Pure trend following cannot lock in profits, realized profit is limited.

## Optimization Directions 

1. Add trailing stop loss for risk control.

2. Incorporate volatility measures to reduce whipsaws in choppy markets.

3. Test different period parameters for increased robustness.

4. Add trend determination indicators to avoid irrational price moves.

5. Optimize profit taking like lookback highest price to expand profit potential.

## Summary

The strategy's core idea is simple but its live performance is questionable. Stronger risk control mechanisms and parameter optimization testing are needed before real application. But the basic concept is worth learning from.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Price Difference Threshold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-17 00:00:00
end: 2023-09-16 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Daily Close Comparison Strategy (by ChartArt)", shorttitle="CA_-_Daily_Close_Strat", overlay=false)

// ChartArt's Daily Close Comparison Strategy
//
// Version 1.0
// Idea by ChartArt on February 28, 2016.
//
// This strategy is equal to the very
// popular "ANN Strategy" coded by sirolf2009,
// but without the Artificial Neural Network (ANN).
//
// Main difference besides stripping out the ANN
// is that I use close prices instead of OHLC4 prices.
// And the default threshold is set to 0 instead of 0.0014
// with a step of 0.001 instead of 0.0001.
//
// This strategy goes long if the close of the current day
// is larger than the close price of the last day.
// If the inverse logic is true, the strategy
// goes short (last close larger current close).
//
// This simple strategy does not have any
// stop loss or take profit money management logic.
//
// List of my work: 
// https://www.tradingview.com/u/ChartArt/
// 
//  __             __  ___       __  ___ 
// /  ` |__|  /\  |__)  |   /\  |__)  |  
// \__, |  | /~~\ |  \  |  /~~\ |  \  |  
// 
// 

threshold = input(title="Price Difference Threshold", type=float, defval=0, step=0.001)

getDiff() =>
    yesterday=security(syminfo.tickerid, 'D', close[1])
    today=security(syminfo.tickerid, 'D', close)
    delta=today-yesterday
    percentage=delta/yesterday
    
closeDiff = getDiff()
 
buying = closeDiff > threshold ? true : closeDiff < -threshold ? false : buying[1]

hline(0, title="zero line")

bgcolor(buying ? green : red, transp=25)
plot(closeDiff, color=silver, style=area, transp=75)
plot(closeDiff, color=aqua, title="prediction")

longCondition = buying
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = buying != true
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/427066

> Last Modified

2023-09-17 18:28:31
