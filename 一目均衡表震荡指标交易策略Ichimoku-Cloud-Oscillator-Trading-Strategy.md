
> Name

一目均衡表震荡指标交易策略Ichimoku-Cloud-Oscillator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11a516a34f43dcd03a1.png)

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
