
> Name

基于高低点均线的量化交易策略Quantitative-Trading-Strategy-Based-on-High-Low-Point-Moving-Averages

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过计算高点和低点的简单移动均线,并与当前收盘价进行对比来判断买入和卖出时机。它的目标是捕捉价格突破均线的信号,以获取趋势的早期机会。

## 策略原理

1. 计算长度为4的高点简单移动平均线

2. 计算长度为4的低点简单移动平均线 

3. 当收盘价突破高点均线时,做多入场

4. 当收盘价突破低点均线时,做空入场

5. 使用固定止损和止盈策略进行风险管理

## 优势分析

1. 使用简单指标,容易理解实现

2. 及时捕捉价格突破均线的信号 

3. 可以快速过滤掉部分噪音,识别趋势

4. 计算量小,可以降低策略运转消耗

5. 适合作为基础策略进行扩展

## 风险分析

1. 需要合理的参数设定,避免过于灵敏

2. 无法应对大幅突破带来的风险

3. 存在一定程度的震荡套利风险

4. 无法自动调整止损止盈位置

5. 难以判断趋势背景的长短

## 优化方向

1. 测试不同参数对信号质量的影响

2. 增加过滤条件,确保突破的有效性

3. 结合趋势分析,避免被套

4. 开发动态止损止盈策略

5. 优化止损机制,提高策略胜率

6. 在不同周期测试策略健壮性

## 总结

该策略通过简单的指标研判价格动能,给出了基本的趋势交易思路。配合参数优化、风险控制等进一步完善,其交易逻辑可延展性强,可发展为较为稳健的量化系统。总体来说,该策略易于上手实践,适合作为量化交易的入门策略。

|| 

## Overview

This strategy uses simple moving averages of high points and low points compared to current close price to determine entries and exits. It aims to capture price breakout signals from moving average crossovers to obtain early trend opportunities. 

## Strategy Logic

1. Calculate 4-period simple moving average of high prices.

2. Calculate 4-period simple moving average of low prices.

3. Go long when close price breaks above high point SMA. 

4. Go short when close price breaks below low point SMA.

5. Use fixed stop loss and take profit for risk management.

## Advantage Analysis

1. Uses simple indicators, easy to understand and implement.

2. Timely captures price breakout signals from SMA crossovers. 

3. Can quickly filter out noise and identify trends.

4. Lightweight calculations reduce strategy overhead.

5. Suitable as base strategy for extensions.

## Risk Analysis

1. Requires reasonable parameters to avoid oversensitivity. 

2. Unable to handle risks from huge breakouts.

3. Possibilities of whipsaw losses in ranges.

4. Cannot automatically adjust stops and limits. 

5. Hard to judge longer-term trend context.

## Optimization Directions

1. Test different parameters for impact on signal quality.

2. Add filters to validate effectiveness of breakouts.

3. Incorporate trend analysis to avoid traps.

4. Develop dynamic stops and limits.

5. Optimize stops to improve win rate.

6. Test robustness across different timeframes.

## Summary

This strategy uses simple indicators to gauge price momentum and provides a basic trend trading framework. With further improvements like parameter optimization and risk controls, the trading logic is highly extensible into a robust quant system. Overall an easy to use strategy suitable for beginners to start quant trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|4|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2017|Backtest Stop Year|
|v_input_5|5|Backtest Stop Month|
|v_input_6|true|Backtest Stop Day|
|v_input_7|true|Color Background?|
|v_input_8|4|length|
|v_input_9|false|displace|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-13 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("HiLo", overlay=true)

// Testing a specific period
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(4, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2017, "Backtest Stop Year")
testStopMonth = input(5, "Backtest Stop Month")
testStopDay = input(1, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false


//HiLo Strategy
length = input(4, minval=0)
displace = input(0, minval=0)
highsma = sma(high, length)
lowsma = sma(low, length)

longCondition = close > highsma[displace]
if (longCondition)
    strategy.entry("long", true)

shortCondition = close < lowsma[displace]
if (shortCondition)
    strategy.entry("short", false)

// Exit seems with a problem. it keeps saying the order's limit (2000) was reached even if I back test it just for a day. 
// If the two lines bellow are commented, then it it works. Anyone? Any idea what's wrong?

// strategy.exit("exit", "long", profit=10, loss=5)
// strategy.exit("exit", "short", profit=10, loss=5)






    
```

> Detail

https://www.fmz.com/strategy/427261

> Last Modified

2023-09-19 15:53:55
