
> Name

基于动态支撑阻力的趋势跟踪策略Trend-Following-Strategy-Based-on-Dynamic-Support-and-Resistance

> Author

ChaoZhang

> Strategy Description


[trans]  

本文将详细介绍一种利用动态支撑阻力进行趋势跟踪的量化交易策略。该策略通过计算均线和ATR形成上轨和下轨,进行趋势追踪。

一、策略原理

该策略主要包括以下指标和逻辑:

1. 计算一定周期内的最高价均线,作为上轨;

2. 利用ATR计算出stops future losses移距离作为缓冲;

3. 上轨减去缓冲距离得到下轨;

4. 当价格上穿上轨时做多;当下穿下轨时平仓。

这样,上下轨构建动态的支撑阻力带。通过突破上轨追涨杀跌,并通过下轨快速止损,控制交易风险。

二、策略优势

该策略主要具有以下几点优势:

1. 动态轨道可以顺势捕捉趋势机会;

2. ATR止损方式可以根据市场波动率设置止损;

3. 追踪止盈大于止损幅度,有利于获利;

4. 规则简单直接,容易实施。

三、潜在风险

但该策略也存在一些潜在问题:

1. 均线和ATR指标滞后,可能漏失机会;

2. 需要承受较大回撤压力;

3. 没有设置进场次数限制;

4. 需要优化参数以适应不同品种。

四、内容总结

本文详细介绍了一种利用均线和ATR设立动态轨道的趋势跟踪策略。它可以根据市场波动性设置止损止盈,顺势捕捉趋势。但也需要注意指标滞后,回撤控制等问题。总体来说,它提供了一种简单的趋势跟踪方法。
||

This article explains in detail a trend following strategy that utilizes dynamic support and resistance levels. It forms upper and lower bands using moving averages and ATR to track trends.

I. Strategy Logic

The main indicators and logic include:

1. Calculating highest high moving average over a period as the upper band.

2. Using ATR to compute buffer distance for stop loss.

3. Upper band minus buffer sets the lower band.

4. Take long when price breaks above upper band; exit when price breaks below lower band.

The upper and lower bands construct dynamic support and resistance zones. By trend riding breakouts and quick stops, trading risks can be controlled.

II. Advantages of the Strategy

The main advantages are:

1. Dynamic bands can capture trend opportunities. 

2. ATR stop loss sets stops based on market volatility.

3. Larger profit target than stop loss benefits profits. 

4. Simple rules make it easy to implement.

III. Potential Risks

However, some potential issues exist:

1. Moving averages and ATR have lagging issues. 

2. Larger drawdowns need to be endured.

3. No limit on number of entries.

4. Parameters need optimization for different products.

IV. Summary

In summary, this article has explained a trend following strategy using moving averages and ATR to form dynamic bands. It can set stop loss and take profit based on volatility to ride trends. But risks like indicator lag and drawdown control need attention. Overall it provides a simple trend tracking method.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|Highest Length|
|v_input_2|10|Highest Average|
|v_input_3|14|ATR Length|
|v_input_4|2|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("I Like Winners And Hate Loosers!", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

highest_length = input(200, type=input.integer, minval=1, title="Highest Length")
highest_average = input(10, type=input.integer, minval=1, title="Highest Average")

atr_length = input(14, type=input.integer, minval=1, title="ATR Length")
atr_multiplier = input(2, type=input.integer, minval=1, title="ATR Multiplier")

a = atr(atr_length) * atr_multiplier
h = sma(highest(high, highest_length), highest_average)
l = h - a

buy_signal = crossover(close, h)
sell_signal = crossunder(close, l)

strategy.entry("Buy", strategy.long, when=buy_signal)
strategy.close("Buy", when=sell_signal)

plot(h, title="H", color=color.green, transp=50, linewidth=2)
plot(l, title="L", color=color.red, transp=50, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/426879

> Last Modified

2023-09-15 11:28:00
