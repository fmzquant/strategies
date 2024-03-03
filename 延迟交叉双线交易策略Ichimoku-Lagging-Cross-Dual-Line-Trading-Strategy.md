
> Name

延迟交叉双线交易策略Ichimoku-Lagging-Cross-Dual-Line-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/89207d15da3c930a41.png)

[trans]


## 概述

一云延迟交叉双线交易策略是一种常见的一云K线技术分析交易策略。该策略利用K线云带和两条基准线的交叉来判断市场的转折点。一云延迟交叉交易策略已被证明是一种可盈利的交易策略。

## 策略原理

该策略主要使用一云K线的5条基准线,需要首先理解这些线的含义:

天线,也称为转化线,代表最近9根K线的中点,计算公式为:

基线,也称为标准线,代表最近26根K线的中点,计算公式为:

延迟线,也称为迟行线,落后于价格(正如其名字所示)。延迟线绘制在26周期之前。

先导1,也称为预先1,代表云带的一个边界,是转化线和基准线的中点:。该值绘制在26周期之后,是更快的云带边界。

先导2,也称为预先2,代表云带的另一个边界,是最近52根K线的中点:。该值绘制在52周期之后,是更慢的云带边界。

使用一云K线交易的规则非常简单:

当转化线上穿基线时,采取买入信号。 

当转化线下穿基线时,采取卖出信号。

## 优势分析

一云延迟交叉双线交易策略有以下优势:

1. 使用转化线和基线的交叉来判断买入和卖出时机,策略规则简单清晰。

2. 利用云带及其边界判断趋势方向,能减少假信号。 

3. 延迟线落后价格,能验证趋势。

4. 多种线条组合使用,综合判断市场,提高决策准确性。

5. 可用于多种时间周期的交易分析。

## 风险分析

一云延迟交叉双线交易策略也存在以下风险:

1. 线条参数设置不当可能导致产生过多假信号。

2. 牛熊转换时,线条交叉信号可能较滞后,无法及时抓住转折点。

3. 行情剧烈波动时,一云K线可能失效。

4. 需要组合更多指标来验证信号,单独使用时效果可能受限。

5. 需要频繁监控,不能全权自动交易。

## 优化方向

一云延迟交叉双线交易策略可以从以下几个方面进行优化:

1. 优化线条参数,改善延迟线设置,使信号更准确。

2. 结合趋势指数等指标,提前判断趋势反转。

3. 增加 FILTER 来过滤假信号。

4. 优化策略自动止盈止损点,严格控制风险。

5. 测试不同品种和时间周期的参数效果。

6. 进行回测优化,选择最佳参数组合。

## 总结

一云延迟交叉双线交易策略利用简单的转化线和基线交叉来产生交易信号。该策略有效利用云带判断趋势方向,可以过滤部分噪音。但参数设置不当也会产生假信号,需要进一步优化。此策略易于实施,但最佳效果还需结合其他指标来实现。通过不断测试和优化,可以使该策略对市场变化做出及时反应,在降低风险的同时提高盈利能力。

||


## Overview

The Ichimoku Lagging Cross Dual Line trading strategy is a common Ichimoku candlestick chart analysis trading strategy. This strategy uses the Ichimoku cloud bands and crossovers of two baseline lines to identify reversal points in the market. The Ichimoku lagging cross trading strategy has proven to be a profitable trading strategy.

## Strategy Principles 

This strategy mainly uses 5 baseline lines of the Ichimoku candlesticks. It is necessary to first understand the meaning of these lines:

Tenkan-Sen line, also called the Conversion Line, represents the midpoint of the last 9 candlesticks, and is calculated with the formula:

Kijun-Sen line, also called the Base Line, represents the midpoint of the last 26 candlesticks, and is calculated with the formula: 

Chikou Span, also called the Lagging Span, lags behind the price (as the name suggests). The Lagging Span is plotted 26 periods back.

Senkou Span A, also called the Leading Span A, represents one of the Cloud boundaries and it is the midpoint between the Conversion Line and the Base Line: . This value is plotted 26 periods into the future and it is the faster Cloud boundary.

Senkou Span B, or the Leading Span B, represents the second Cloud boundary and it is the midpoint of the last 52 price bars: . This value is plotted 52 periods into the future and it is the slower Cloud boundary.

The trading rules with Ichimoku are very simple:

When the Conversion Line crosses above the Base Line, it triggers a buy signal.

When the Conversion Line crosses below the Base Line, it triggers a sell signal.

## Advantage Analysis

The Ichimoku Lagging Cross Dual Line trading strategy has the following advantages:

1. Using crossover of Conversion and Base Lines to determine entries and exits, the strategy rules are simple and clear.

2. Using the cloud bands and boundaries to determine trend direction, it reduces false signals.

3. The lagging line lags behind the price and can confirm the trend. 

4. The combination of multiple lines provides comprehensive market assessment and improves decision accuracy.

5. Can be used for trading analysis across various timeframes.

## Risk Analysis

The Ichimoku Lagging Cross Dual Line trading strategy also has the following risks:

1. Improper parameter settings may generate excessive false signals.

2. Crossover signals may lag around trend reversals, unable to capture turning points timely.

3. Ichimoku may fail with violent price fluctuations.

4. Needs more indicators to confirm signals, limited effects when used alone. 

5. Requires frequent monitoring, cannot be fully automated.

## Optimization Directions

The Ichimoku Lagging Cross Dual Line trading strategy can be optimized in the following aspects:

1. Optimize line parameters, improve lagging line settings for more accurate signals.

2. Incorporate trend indices to anticipate trend reversals early. 

3. Add FILTERS to filter out false signals.

4. Optimize stop loss and take profit points to control risks.

5. Test parameters across different products and timeframes.  

6. Conduct backtesting for best parameter combinations.

## Conclusion

The Ichimoku Lagging Cross Dual Line trading strategy uses simple conversion and base line crossovers to generate trade signals. It effectively uses the cloud bands to determine trend direction and filter out some noise. However, improper parameter settings can also produce false signals, requiring further optimizations. This strategy is easy to implement but best effects would need incorporating other indicators. With continuous testing and optimizations, this strategy can adapt to market changes timely, improving profitability while reducing risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-19 00:00:00
end: 2023-10-19 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © iamskrv

//@version=4
strategy("Ichimoku Cloud Strategy v2.0", overlay=true)

//@version=4
// study(title="Ichimoku Cloud", shorttitle="Ichimoku", overlay=true)

conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=1, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

plot(conversionLine, color=#0496ff, title="Conversion Line")
plot(baseLine, color=#991515, title="Base Line")
plot(close, offset = -displacement + 1, color=#459915, title="Lagging Span")

p1 = plot(leadLine1, offset = displacement - 1, color=color.green,
 title="Lead 1")
p2 = plot(leadLine2, offset = displacement - 1, color=color.red, 
 title="Lead 2")
fill(p1, p2, color = leadLine1 > leadLine2 ? color.green : color.red)

// Strategy


longCondition = crossover(conversionLine,baseLine)
if (longCondition)
    strategy.entry("Buy", strategy.long)

shortCondition = crossover(baseLine, conversionLine)
if (shortCondition)
    strategy.entry("Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/429786

> Last Modified

2023-10-20 17:17:28
