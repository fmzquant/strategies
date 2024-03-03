
> Name

一目均衡表震荡指标交易策略Ichimoku-Cloud-Oscillator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11a516a34f43dcd03a1.png)
[trans]
## 概述

本策略是一个结合一目均衡表指标和布林线波带指标的量化交易策略。该策略运用一目均衡表的转换线、基准线以及前注线和后注线构建交易信号,同时利用布林线波带判断市场的波动性,在合适的时机进行入场。

## 策略原理

### 一目均衡表指标

一目均衡表指标由转换线、基准线、前注线和后注线四条曲线组成。其中转换线是近期(9天)的收盘价平均价,基准线是较长期(26天)的收盘价平均价。前注线则是转换线和基准线的平均值,具有领先性。后注线是较长期(52天)的收盘价平均价,具有滞后性。当短期均线上穿或下穿长期均线时产生买入和卖出信号。

### 布林线波带

布林线波带由中线、上带和下带三条线组成。中线是n天(这里设置为20天)的收盘价的简单移动平均线。上带线是中线加上k倍(这里设置为2倍)的标准差。下带线是中线减去k倍标准差。它判断价格是否处于波动范围之内,从而判断市场震荡程度。

本策略运用后注线的金叉和死叉形成买入和卖出信号。同时结合布林线波带判断价格波动性,在波动不大时判定入场信号。

## 优势分析

本策略结合一目均衡表指标和布林带指标,综合判断市场趋势和波动性,可以有效提取市场变化信息,判断买卖点。一目均衡表可以确定市场主要趋势方向,布林线波带可以判断具体入场时机。

该策略参数可调节,可以根据不同品种和市场环境进行优化,适应性强。一目均衡表使用不同参数组合可以识别不同周期内的交易机会。

## 风险分析

本策略在判断市场波动性时,主要依赖布林线波带。当突发事件造成巨大波动时,布林线波带将失效。这时根据一目均衡表构建的交易信号可能会产生错误信号。

另外,一目均衡表线本身对突发事件也比较敏感,价格剧烈波动时转换线和基准线也会产生错误信号。所以这种情况下出场或者暂停交易可能是最佳选择。

## 优化方向

可以考虑结合其他指标判断入场时机。例如KDJ指标判断是否处于超买超卖区域,MACD判断长短均线关系等。这可以避免在市场剧烈波动时依然进入场内。

另外可以通过机器学习等方法最优化一目均衡表的参数。不同参数对不同周期和不同品种影响很大。找到最佳参数组合可以大大提高策略盈利水平。

## 总结

本策略结合一目均衡表指标和布林带指标,在判断市场趋势的同时兼顾波动性,是一种适应性较强的量化交易策略。该策略可以通过调节参数和优化入场规则进行改进,在实盘中可以获得不错的收益。

||

## Overview

This is a quantitative trading strategy that combines the Ichimoku Cloud indicator and the Bollinger Bands indicator. The strategy utilizes the conversion line, base line, leading span A, and leading span B of the Ichimoku Cloud to generate trading signals, while using the Bollinger Bands to judge the volatility of the market and decide appropriate entry timings.

## Strategy Logic  

### Ichimoku Cloud Indicator

The Ichimoku Cloud indicator consists of four lines: conversion line, base line, leading span A, and leading span B. The conversion line is the average closing price over a short-term period (9 days). The base line is the average closing price over a longer 26-day period. The leading span A is the average between the conversion line and base line, which leads the price action. The leading span B is the average closing price over an even longer 52-day period, which lags behind the price. Buy and sell signals are generated when the shorter-term moving average crosses over or under the longer-term one.  

### Bollinger Bands 

The Bollinger Bands include three lines: middle line, upper band, and lower band. The middle line is a simple moving average of closing prices over an n-day period (set to 20 days here). The upper band is the middle line plus k times (set to 2 times here) the standard deviation. The lower band is the middle line minus k times the standard deviation. It judges whether prices are within normal fluctuation ranges and determines the volatility level of the market.

This strategy uses the gold cross and death cross of the leading span B to construct trading signals. It also incorporates the Bollinger Bands to determine price volatility and decides to enter the market when volatility is low.  

## Advantage Analysis

This strategy combines the Ichimoku Cloud indicator and Bollinger Bands to comprehensively determine market trends and volatility, which can effectively capture market change information to locate trading signals. The Ichimoku Cloud can determine the main trend direction of the market, while the Bollinger Bands can pinpoint specific entry timings. 

The parameters of this strategy are adjustable to optimize for different products and market environments, making it highly adaptable. Using different parameter combinations of the Ichimoku Cloud can identify trading opportunities across cycles.  

## Risk Analysis  

This strategy mainly relies on the Bollinger Bands to determine market volatility. The bands may fail when extreme volatility is caused by black swan events. In that case, the trading signals constructed based on the Ichimoku Cloud may generate false signals. 

In addition, the Ichimoku Cloud lines themselves are also sensitive to sharp market fluctuations. The conversion and base lines could provide incorrect signals when prices swing wildly. Exiting positions or suspending trading is probably the best choice in such situations.

## Optimization Directions   

Other indicators can be considered in combination to determine entry timing, such as KDJ to see if the market is overbought/oversold, and MACD to check long-term/short-term moving average relationships. This can avoid entering the market during extreme volatility.

In addition, machine learning can be leveraged to optimize the parameters of the Ichimoku Cloud. Different parameters have significant impacts across cycles and products. Finding the optimal parameter combinations can greatly improve the strategy's profitability.  

## Conclusion

This strategy combines the Ichimoku Cloud indicator and Bollinger Bands to consider both market trends and volatility. It is an adaptive quantitative trading strategy. The strategy can be improved by adjusting parameters and optimizing entry rules to achieve good profits in live trading.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|9|Conversion Line Length|
|v_input_int_2|26|Base Line Length|
|v_input_int_3|52|Leading Span B Length|
|v_input_int_4|26|Lagging Span|
|v_input_1|20|Bollinger Bands Length|
|v_input_2|2|Bollinger Bands Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("一目均衡表シグナル + ボリンジャーバンド", overlay=true)

conversionPeriods = input.int(9, minval=1, title="Conversion Line Length")
basePeriods = input.int(26, minval=1, title="Base Line Length")
laggingSpan2Periods = input.int(52, minval=1, title="Leading Span B Length")
displacement = input.int(26, minval=1, title="Lagging Span")
bbLength = input(20, title="Bollinger Bands Length")
bbMultiplier = input(2.0, title="Bollinger Bands Multiplier")

donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = math.avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

// ボリンジャーバンドの計算
basis = ta.sma(close, bbLength)
bbUpper = basis + bbMultiplier * ta.stdev(close, bbLength)
bbLower = basis - bbMultiplier * ta.stdev(close, bbLength)

// 1σ、2σ、3σのライン
bbUpper1 = basis + ta.stdev(close, bbLength)
bbLower1 = basis - ta.stdev(close, bbLength)

bbUpper2 = basis + 2 * ta.stdev(close, bbLength)
bbLower2 = basis - 2 * ta.stdev(close, bbLength)

bbUpper3 = basis + 3 * ta.stdev(close, bbLength)
bbLower3 = basis - 3 * ta.stdev(close, bbLength)

// 遅行スパンがローソクに交差した際のBuyとSellシグナル
buySignalLeadLine = ta.crossover(close, leadLine2)
sellSignalLeadLine = ta.crossunder(close, leadLine2)

// Strategy Entry and Exit Conditions for Lead Line
strategy.entry("BuyLeadLine", strategy.long, when = buySignalLeadLine)
strategy.close("BuyLeadLine", when = sellSignalLeadLine)

strategy.entry("SellLeadLine", strategy.short, when = sellSignalLeadLine)
strategy.close("SellLeadLine", when = buySignalLeadLine)

// Plotting Ichimoku Cloud
plot(conversionLine, color=color.new(color.blue, 0), title="Conversion Line")
plot(baseLine, color=color.new(color.red, 0), title="Base Line")
plot(close, offset = -displacement + 1, color=color.new(color.green, 0), title="Lagging Span")
p1 = plot(leadLine1, offset = displacement - 1, color=color.new(color.green, 0),
     title="Leading Span A")
p2 = plot(leadLine2, offset = displacement - 1, color=color.new(#cdf80d, 0),
     title="Leading Span B")

fill(p1, p2, color = leadLine1 > leadLine2 ? color.rgb(67, 160, 71, 90) : color.rgb(244, 67, 54, 90))



// 2σ、3σのラインをプロット

plot(bbUpper2, color=color.rgb(100, 96, 100), title="BB Upper 2σ")
plot(bbLower2, color=color.rgb(100, 96, 100), title="BB Lower 2σ")

plot(bbUpper3, color=color.rgb(67, 61, 68), title="BB Upper 3σ")
plot(bbLower3, color=color.rgb(67, 61, 68), title="BB Lower 3σ")

// Plotting Entry and Exit Signals
plotshape(series=buySignalLeadLine, title="Buy Signal (Lead Line)", color=color.green, style=shape.triangleup, location=location.belowbar, size=size.small)
plotshape(series=sellSignalLeadLine, title="Sell Signal (Lead Line)", color=color.rgb(255, 115, 0), style=shape.triangledown, location=location.abovebar, size=size.small)

```

> Detail

https://www.fmz.com/strategy/442206

> Last Modified

2024-02-20 11:12:44
