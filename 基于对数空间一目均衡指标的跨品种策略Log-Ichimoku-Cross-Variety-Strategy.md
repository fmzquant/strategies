
> Name

基于对数空间一目均衡指标的跨品种策略Log-Ichimoku-Cross-Variety-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/7918dd5f9c2170c039.png)
[trans]

## 概述

本策略是一种面向加密货币的简单交易策略,它使用对数空间一目均衡指标来生成交易信号。该策略适用于跨加密货币品种的交易。

## 策略原理

该策略使用自定义的对数空间一目均衡指标作为主要的交易指标。一目均衡指标通常包含前转线、基准线和延迟线。本策略中,这些线都是在对数价格的空间中计算的。

具体来说,前转线是最近9个周期对数低点和对数高点的平均值。基准线是最近26个周期的同类平均值。延迟线1是前转线和基准线的平均值,延迟线2是最近52个周期的同类平均值。

当延迟线1上穿延迟线2时,做多;当延迟线1下穿延迟线2时,做空。

## 优势分析

这种策略的主要优势在于,使用对数价格空间中的一目均衡指标,可以更好地识别加密货币中的趋势变化。在对数坐标下,百分比变化更加一致,有助于生成更可靠的交易信号。

另一个优势是,该策略适用于跨加密货币品种的交易。使用对数空间一目均衡指标可以增强不同品种之间价格变化的可比性。

## 风险分析

该策略的主要风险在于一目均衡指标本身也可能生成错误信号。尤其是在加密货币市场的高波动时期,一目均衡指标的表现会变得不可靠。

此外,对数转换也可能在极端行情时失效。当价格出现异常波动时,对数坐标的可比性也会下降。

## 优化方向

该策略可以通过以下方式进行优化:

1. 结合其他指标来验证一目均衡指标的信号,降低错误信号的概率

2. 更新一目均衡指标参数的最优值,使其更适合加密货币品种

3. 在开仓前设置必要的过滤条件,例如交易量过滤,避免被假突破误导

4. 优化开仓策略,设置止损和止盈条件,控制风险

## 总结

本策略利用对数空间一目均衡指标的优点,设计了一个面向加密货币、适用于跨品种交易的量化策略。该策略有利于识别趋势变化,但也存在一定的风险。通过进一步优化,可以使策略 parameters 更加符合加密货币市场,并设定必要的开仓条件及风险控制机制,从而获得更好的策略表现。

||

## Overview

This strategy is a simple cryptocurrency trading strategy that uses log-scale Ichimoku clouds to generate trading signals. It is designed for cross-cryptocurrency trading between varieties.

## Strategy Logic

The strategy uses a custom log-scale Ichimoku indicator as the primary trading indicator. The Ichimoku indicator usually contains the conversion line, base line and lagging span. In this strategy, these lines are calculated in logarithmic price space. 

Specifically, the conversion line is the recent 9-period mean of the log lows and log highs. The base line is the 26-period mean of the same. Lead line 1 is the mean of the conversion and base lines. Lead line 2 is the 52-period lookback mean.

A long signal is generated when lead line 1 crosses over lead line 2. A short signal is generated on the cross under.

## Advantage Analysis  

The key advantage of this strategy is using the log-scale Ichimoku indicator better captures trend changes across cryptocurrencies. Percentage changes are more consistent in logarithmic space, resulting in more reliable trading signals.

Another advantage is that it facilitates cross-variety trading of cryptocurrencies. Using the log-Ichimoku improves comparability of price changes across different crypto varieties.

## Risk Analysis

The main risk is that Ichimoku signals may fail. Particularly in volatile crypto markets, performance of Ichimoku can deteriorate. 

Also, logarithmic transforms may fail during extreme moves. Comparability of logarithmic space decreases when prices make anomalous jumps.

## Enhancement Opportunities

The strategy can be enhanced by:

1. Adding filters to confirm Ichimoku signals to reduce false signals

2. Updating optimal parameters more suited to crypto varieties  

3. Adding pre-entry filters like volume to avoid false breakouts

4. Optimizing entry rules and adding stops and profit targets to control risk

## Conclusion

This strategy utilizes the logarithmic Ichimoku indicator to design a quantitative strategy tailored to cryptocurrencies and cross-variety trading. While advantageous for capturing trends, it has risks. Further optimizations to parameters, filters and risk controls can enhance strategy performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|
|v_input_5|false|show clouds|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-22 00:00:00
end: 2024-02-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Log Ichimoku Strategy", shorttitle="Ichi Strategy", overlay=true)

drop1st(src) =>
    x = na
    x := na(src[1]) ? na : src

conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=1, title="Displacement")
showClouds = input(false, "show clouds")

loglows = log(drop1st(low))
loghighs = log(drop1st(high))

donchian(len) =>
    avg(lowest(loglows, len), highest(loghighs, len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

plot(showClouds ? exp(conversionLine) : na, color=#0496ff, title="Conversion Line")
plot(showClouds ? exp(baseLine) : na, color=#991515, title="Base Line")

p1 = plot(showClouds ? exp(leadLine1) : na, offset = displacement, color=green, title="Lead 1")
p2 = plot(showClouds ? exp(leadLine2) : na, offset = displacement, color=red, title="Lead 2")
fill(p1, p2, color = showClouds ? (leadLine1 > leadLine2 ? green : red) : na)

if (crossover(leadLine1, leadLine2))
    strategy.entry("Ichi-LE", strategy.long, oca_name="Ichi", comment="Ichi")

if (crossunder(leadLine1, leadLine2))
    strategy.entry("Ichi-SE", strategy.short, oca_name="Ichi",  comment="Ichi")

```

> Detail

https://www.fmz.com/strategy/442507

> Last Modified

2024-02-22 13:53:30
