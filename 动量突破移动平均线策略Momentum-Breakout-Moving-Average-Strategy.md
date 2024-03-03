
> Name

动量突破移动平均线策略Momentum-Breakout-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于移动平均线和动量指标的组合,属于趋势跟踪策略。它通过计算一定周期内的移动平均线,判断市场趋势方向。当价格突破移动平均线时,认为趋势发生转折,可以进行交易。同时,它引入一定周期内的持续上涨或下跌天数作为确认信号,避免被假突破欺骗。

## 策略原理

该策略主要基于两个指标:

1. 简单移动平均线(SMA):计算一定周期内的收盘价平均值,判断大致趋势方向。

2. 持续上涨/下跌天数:统计价格持续处于上涨或下跌状态的天数,作为趋势发生转折的确认信号。

具体来说,策略首先计算长度为520天的SMA,代表大致趋势方向。如果价格上涨突破SMA,开始统计上涨天数;如果价格下跌突破SMA,开始统计下跌天数。当上涨或下跌天数达到27天时,进行相应方向的交易。

例如,如果价格上涨突破SMA,并持续上涨27天,则进行做多交易;如果价格下跌突破SMA,并持续下跌27天,则进行做空交易。

## 优势分析

这种策略结合移动平均线和动量指标,可以有效跟踪趋势,同时避免被短期市场噪音干扰。其主要优势有:

1. 使用长周期SMA判断大趋势,可以有效滤除短期波动的噪音。

2. 增加持续上涨/下跌天数的确认信号,可以避免被短期的假突破欺骗,减少不必要的交易。

3. 只在趋势发生转折时进行交易,可以最大程度捕捉趋势的方向和力度。

4. 规则清晰易执行,不需要复杂的参数优化,适合普通投资者。

## 风险分析

该策略也存在一些风险:

1. 在长期趋势牛市中,可能错过早期进入机会。

2. 在震荡行情中,容易被频繁的假突破欺骗产生过多无效交易。

3. SMA参数设置不当时,可能导致策略对趋势变化反应迟钝。

4. perfusion参数设置不当时,可能导致交易信号过于频繁或稀疏。

## 优化方向

可以从以下几个方面进一步优化该策略:

1. 增加多时间周期SMA,进行多周期验证,避免单一周期带来的局限性。

2. 增加其他趋势指标,如MACD等,进行综合判断,提高准确性。

3. 对perfusion参数进行优化,找到平衡点。避免交易信号过于频繁或稀疏。

4. 增加止损策略,以控制单笔损失。

5. 结合量能指标,避免量能背离带来的风险。

## 总结

该策略整体来说属于一种简单实用的趋势跟踪策略。它以长周期SMA判断大趋势,并以perfusion确认趋势转折的信号,可以有效跟踪趋势同时避免被噪音欺骗。通过一定的优化,可以成为一种可靠的趋势策略。但仍需要注意防范在特定市场情况下的局限性。总体来说,该策略适合具有一定交易经验的投资者,作为组合策略的一部分使用。

|| 

## Overview

This strategy combines moving average and momentum indicators, belonging to trend following strategies. It judges the market trend direction by calculating the moving average over a certain period. When the price breaks through the moving average, it is considered that the trend has reversed, and trading can be carried out. At the same time, it introduces the number of consecutive up or down days within a certain period as a confirmation signal to avoid being deceived by false breakouts.

## Strategy Principle  

This strategy is mainly based on two indicators:

1. Simple Moving Average (SMA): Calculates the average closing price over a certain period to determine the general trend direction. 

2. Consecutive up/down days: Counts the number of days the price has been in a persistent uptrend or downtrend as a confirmation signal for trend reversal.

Specifically, the strategy first calculates the 520-day SMA, representing the general trend direction. If the price rises and breaks through the SMA, it starts counting the number of up days; if the price falls and breaks through the SMA, it starts counting the number of down days. When the number of up days or down days reaches 27 days, a corresponding directional trade is made. 

For example, if the price rises and breaks through the SMA, and continues to rise for 27 days, a long trade is made; if the price falls and breaks through the SMA, and continues to fall for 27 days, a short trade is made.

## Advantage Analysis

This strategy combines moving averages and momentum indicators to effectively track trends while avoiding short-term market noise interference. Its main advantages are:

1. Using long-period SMA to judge the major trend can effectively filter out short-term fluctuations and noise.

2. Increasing confirmation signals of consecutive up/down days can avoid being deceived by short-term false breakouts and reduce unnecessary trading.

3. Trading only when trend reverses can maximize capturing the direction and momentum of the trend. 

4. The rules are clear and easy to implement, no complex parameter optimization is needed, suitable for ordinary investors.

## Risk Analysis

This strategy also has some risks:

1. It may miss early entry opportunities in long-term bull market trends.

2. It is prone to be deceived by frequent false breakouts in range-bound markets, resulting in excessive invalid trading.

3. If SMA parameters are set improperly, the strategy may respond sluggishly to trend changes. 

4. If perfusion parameters are set improperly, trading signals may be too frequent or too sparse.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Add SMA of multiple timeframes for multi-cycle verification to avoid limitations of a single cycle.

2. Add other trend indicators such as MACD for comprehensive judgment to improve accuracy.

3. Optimize perfusion parameters to find a balance point, avoiding too frequent or too sparse trading signals.

4. Add stop loss strategies to control single loss.

5. Incorporate volume indicators to avoid risks of volume divergence.

## Summary

Overall, this strategy is a simple and practical trend following strategy. It judges the major trend with long-period SMA and uses perfusion to confirm trend reversal signals, which can effectively track trends while avoiding noise deception. With some optimization, it can become a reliable trend strategy. But still need to be aware of limitations under certain market conditions. In general, this strategy is suitable for investors with some trading experience, to be used as part of a portfolio strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|520|length|
|v_input_2|27|confirmBars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-18 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


strategy(title="Mbit Moving Average",overlay=true)

length = input(520)
confirmBars = input(27)
price = close
ma = ta.sma(price, length)

bcond = price > ma

bcount = bcond ? nz(bcount[1]) + 1 : 0

scond = price < ma

scount = scond ? nz(scount[1]) + 1 : 0

long =  scount == confirmBars

short = bcount == confirmBars


//Strategy

strategy.entry("long", strategy.long, when=long)

strategy.entry("short",strategy.short, when=short)

```

> Detail

https://www.fmz.com/strategy/427269

> Last Modified

2023-09-19 16:33:13
