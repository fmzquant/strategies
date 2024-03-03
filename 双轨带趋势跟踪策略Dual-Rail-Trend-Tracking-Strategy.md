
> Name

双轨带趋势跟踪策略Dual-Rail-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

双轨带趋势跟踪策略是一种基于布林带的短线交易策略。该策略利用布林带上下轨作为买入和卖出的信号,实现短线交易。

## 策略原理

该策略主要包括以下几个部分:

1. 计算布林带的中轨、上轨和下轨。中轨是收盘价的n日简单移动平均线,布林带宽度由收盘价的n日标准差的2倍决定。

2. 当收盘价由下向上穿过下轨时,做多;当收盘价由上向下穿过上轨时,平仓。

3. n值默认为20天,也可以根据市场调整。布林带宽度变化由标准差倍数控制,默认为2倍。

4. 该策略简单直接,容易实现。能够有效跟踪市场趋势,Profit from the volatility of the market.

## 优势分析

双轨带策略具有以下优势:

1. 容易实现,逻辑简单直观。

2. 能够及时跟踪市场变化,捕捉短线交易机会。

3. 利用布林带的统计特性,有一定的数学依据。

4. 防止了过早进入,也防止了过晚退出。

5. 可以通过调整布林带的参数来适应不同市场的特点。

6. 无需预测市场走势,只需要跟随市场。

## 风险分析

该策略也存在一些风险:

1. 布林带指标并不能准确预测趋势反转点。

2. 可能会出现较多的假信号。

3. 不能有效过滤震荡市场的噪音。

4. 需要合理确定布林带参数,否则会影响策略表现。

5. 应避免在横盘整理时使用该策略。

6. 存在一定的延迟,应关注跟踪误差。

可通过调整参数、结合其他指标等方式来降低风险。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 结合其他指标进行过滤,例如MACD,KDJ等,避免出现假信号。

2. 动态调整布林带参数,根据市场情况变化布林带宽度。

3. 设置止损止盈条件,合理控制单笔交易的风险。

4. 优化入场退出点位,例如让收盘价完全突破布林带才入场。

5. 进行参数优化,优化移动均线长度、标准差倍数等参数。

6. 区分多头市场和空头市场,进行方向性交易。

## 总结

双轨带策略是一种简单实用的短线交易策略。它利用布林带的统计特性,能够有效捕捉市场的短期趋势。该策略容易操作,逻辑简单,但也存在一些缺陷。通过进一步优化,可以使该策略在实盘交易中获得更好的表现。总体来说,双轨带策略适合追求短线交易机会的投资者。

|| 


## Overview

The Dual Rail Trend Tracking Strategy is a short-term trading strategy based on Bollinger Bands. This strategy uses the upper and lower rails of the Bollinger Bands as buy and sell signals to implement short-term trading.

## Strategy Principle 

The main components of this strategy are:

1. Calculate the middle, upper and lower rails of the Bollinger Bands. The middle rail is the n-day simple moving average of the closing price, and the width of the Bollinger Bands is determined by twice the n-day standard deviation of the closing price.

2. Go long when the closing price crosses above the lower rail from below, and close the position when the closing price crosses below the upper rail from above.

3. The default n value is 20 days, which can be adjusted based on market conditions. The width of the bands is controlled by the standard deviation multiplier, default to 2x.

4. This strategy is simple and straightforward to implement. It can effectively track market trends and profit from the volatility.

## Advantage Analysis

The Dual Rail strategy has the following advantages:

1. Easy to implement with simple and intuitive logic. 

2. Can timely track market changes and capture short-term trading opportunities.

3. Utilizes the statistical properties of Bollinger Bands, which provides mathematical justification.

4. Prevents premature entry and delayed exit. 

5. The parameters can be adjusted to adapt to different market conditions.

6. No need to predict market trends, just follow the market.

## Risk Analysis

There are also some risks with this strategy:

1. Bollinger Bands cannot accurately predict trend reversal points.

2. There may be more false signals.

3. It cannot effectively filter out the noise in range-bound markets. 

4. Reasonable Bollinger Bands parameters are needed, otherwise it may affect strategy performance.

5. Should avoid using this strategy during market consolidations.

6. There is some lag, tracking error should be monitored.

Risks can be reduced by adjusting parameters, combining with other indicators, etc.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Combine with other indicators like MACD, KDJ to filter false signals. 

2. Dynamically adjust Bollinger Bands parameters based on changing market conditions.

3. Set stop loss and take profit to properly control single trade risks.

4. Optimize entry and exit points, e.g. wait for complete penetration of bands.

5. Parameter optimization on moving average length, standard deviation multiplier, etc. 

6. Distinguish bull versus bear market for directional trading.

## Summary 

The Dual Rail strategy is a simple and practical short-term trading strategy. It utilizes the statistical properties of Bollinger Bands to effectively capture short-term trends. The strategy is easy to implement with simple logic, but also has some flaws. Further optimizations can improve its performance in live trading. Overall, the Dual Rail strategy suits investors looking for short-term trading opportunities.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev|
|v_input_int_2|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger Bands Strategy", overlay=true)

length = input.int(20, minval=1)
src = input(close, title="Source")
mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input.int(0, "Offset", minval = -500, maxval = 500)

plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))

// Buy condition: Price crosses below the lower Bollinger Band
buy_condition = ta.crossover(src, lower)
strategy.entry("Buy", strategy.long, when=buy_condition)

// Sell condition: Price crosses above the upper Bollinger Band
sell_condition = ta.crossunder(src, upper)
strategy.close("Buy", when=sell_condition)

```

> Detail

https://www.fmz.com/strategy/427162

> Last Modified

2023-09-18 17:31:43
