
> Name

布林带突破策略Bollinger-Bands-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于布林带指标,当价格突破布林带下轨时做多,当价格触碰布林带上轨时平仓。该策略利用布林带的包含性原理,追踪价格异常突破,实现低买高卖的目的。

## 策略原理

1. 计算布林带的中线SMA,取近期收盘价的简单移动平均。

2. 计算标准差StdDev,反映价格波动范围。

3. 中线SMA加上标准差上偏移,得到布林带上轨。

4. 中线SMA减去标准差下偏移,得到布林带下轨。 

5. 当收盘价从下向上突破下轨时,做多入场。

6. 当价格触碰上轨时,认为价格异常,平仓离场。

## 优势分析

该策略最大优点是利用布林带指标的统计特性,有效跟踪市场异常波动,实现趋势捕捉。与常规移动平均策略相比,布林带策略更具优势:

1. 布林带上下轨可自动适应市场波动。

2. 突破作为入场信号更可靠。

3. 回归中轴作为止盈信号合理。

4. 参数优化空间大,可针对不同市场进行调整。

5. 可捕捉中长线趋势,也可用于短线。

## 风险分析

该策略潜在风险主要有:

1. 布林带在横盘市场中效果不佳,须避免错入。

2. 突破信号可能是假突破,须审慎判断。

3. 止盈位置过于理想化,可优化至实际行情。

4. 参数设定不当可能导致过于频繁或保守交易。

5. 回测周期需足够长,避免曲拟合。

对应风险处理措施:

1. 结合交易量指标过滤信号。

2. 优化参数,测试不同市场的数据效果。 

3. 增设移动止损,轮动止盈位置。

4. 评估信号背离,避免追高杀跌。

## 优化方向 

该策略可从以下方面进行优化:

1. 尝试不同大小的布林带参数,寻找最佳组合。

2. 增加均线、MACD等指标过滤突破信号。 

3. 应用机器学习算法优化布林带参数。

4. 在突破入场的同时,评估其强弱并调整仓位。

5. 回测更长周期数据,测试策略稳定性。

6. 添加止损机制来控制风险。

## 总结

布林带策略总体来说是一个可靠的趋势跟踪策略。它能够有效捕捉价格异常波动。但我们也要注意其与实际行情偏差,并不断优化参数。如果用于实盘,一定要严格进行风险管理,控制单笔损失。

|| 

## Overview

This strategy is based on the Bollinger Bands indicator. It goes long when the price breaks above the lower band and closes the position when the price touches the upper band. The strategy utilizes the containment principle of Bollinger Bands to track abnormal price breakouts for buying low and selling high.

## Strategy Principle 

1. Calculate the middle band SMA as the simple moving average of recent closing prices.

2. Calculate the standard deviation StdDev to reflect the price fluctuation range.

3. Add the upper offset of standard deviation to the middle band SMA to get the upper band.

4. Subtract the lower offset of standard deviation from the middle band SMA to get the lower band.

5. Go long when the closing price breaks above the lower band from bottom up. 

6. Close the position when the price touches the upper band, as the price is considered abnormal.

## Advantage Analysis

The biggest advantage of this strategy is utilizing the statistical properties of Bollinger Bands to effectively track abnormal market fluctuations and capture trends. Compared to regular moving average strategies, Bollinger Bands strategies have more advantages:

1. Bollinger Bands upper and lower bands can automatically adapt to market volatility.

2. Breakout signals are more reliable for entry.

3. Reversion to mean is reasonable for taking profit.

4. Huge parameter tuning space for adjusting to different markets.

5. Can capture mid-to-long term trends and also be used for short term.

## Risk Analysis

The potential risks of this strategy are mainly:

1. Poor performance of Bollinger Bands in range-bound markets, avoid wrong entries.

2. Breakout signals may be false breakouts, need prudent judgements. 

3. Profit taking position is too idealized, can be optimized to actual price action.

4. Improper parameter settings may lead to over-trading or over-conservatism. 

5. Backtest period needs to be long enough to avoid curve fitting.

Corresponding risk management measures:

1. Add trading volume indicators to filter signals.

2. Optimize parameters and test data from different markets.

3. Add trailing stop loss, stagger take profit levels. 

4. Assess signal divergences, avoid chasing highs and selling lows.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Try different combinations of Bollinger Bands parameters to find the optimal.

2. Add MA, MACD etc to filter breakout signals.

3. Apply machine learning algorithms to optimize Bollinger parameters. 

4. Assess the strength of breakouts and adjust position sizing.

5. Backtest longer periods to test stability. 

6. Add stop loss mechanisms to control risk.

## Summary 

In summary, the Bollinger Bands strategy is an overall reliable trend following strategy. It can effectively capture abnormal price fluctuations. But we should also note its deviation from actual price and constantly optimize the parameters. If used for live trading, strict risk management is a must to control loss per trade.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2010|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2030|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|30|Backtest Stop Day|
|v_input_7|true|Color Background?|
|v_input_8|20|SMA Length|
|v_input_9|20|StdDev Length|
|v_input_10|2|Upper Band Offset|
|v_input_11|2|Lower Band Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 04:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="BB training No Repainting (OTS Mode)", overlay=true)


// Strategy Rules:
// 1. Enter trade when price crosses above the lower band
// 2. Exit trade when price touches the upper band
// 

// Chart Properties
testStartYear = input(2010, "Backtest Start Year")
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(2030, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=input.bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and time >= testPeriodStart and time <= testPeriodStop ? #6c6f6c : na
bgcolor(testPeriodBackgroundColor, transp=97)

// User provided values
smaLength = input(title="SMA Length", type=input.integer, defval=20) // Middle band period length (moving average)
stdLength = input(title="StdDev Length", type=input.integer, defval=20) // Range to apply bands to
ubOffset = input(title="Upper Band Offset", type=input.float, defval=2.0, step=0.5) // Number of standard deviations above MA
lbOffset = input(title="Lower Band Offset", type=input.float, defval=2.0, step=0.5) // Number of standard deviation below MA

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

smaValue = sma(close, smaLength) // Middle band
stdDev = stdev(close, stdLength)
upperBand = smaValue + stdDev * ubOffset // Top band
lowerBand = smaValue - stdDev * lbOffset // Bottom band

// Plot bands to chart
plot(series=smaValue, title="SMA", color=color.green)
plot(series=upperBand, title="UB", color=color.blue, linewidth=2)
plot(series=lowerBand, title="LB", color=color.blue, linewidth=2)

longCondition = (crossover(close, lowerBand))
closeLongCondition = (close >= upperBand)

if (longCondition and testPeriod())
    strategy.entry(id="CALL", long=true)

strategy.close(id="CALL", when=closeLongCondition)

```

> Detail

https://www.fmz.com/strategy/427264

> Last Modified

2023-09-19 16:06:56
