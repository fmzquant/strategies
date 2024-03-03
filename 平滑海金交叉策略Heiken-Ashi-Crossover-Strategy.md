
> Name

平滑海金交叉策略Heiken-Ashi-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b6399d563addf22c55.png)

[trans]
## 概述

平滑海金交叉策略是一种同时应用海金交叉原理和平滑技术的量化交易策略。该策略通过计算4个周期的平均价格来产生平滑价,再根据平滑价格计算海金交叉,以发出交易信号。相比原版海金交叉,该策略通过平滑能过滤掉短期的市场噪音,避免产生错误信号。

## 策略原理  

该策略主要应用以下原理:

1. 海金交叉原理  

   海金交叉指短期移动平均线上穿或下穿长期移动平均线时产生买入或卖出信号。该策略中,短期移动平均线为平滑收盘价(haclose),长期移动平均线为平滑开盘价(haopen)。  

2. 平滑技术

   为了过滤噪音,该策略采用4个周期的平均价格来计算平滑价。即:  

   haclose = (open + high + low + close) / 4  

   haopen = 前一期haopen + 当前haclose的平均值

根据上述平滑价格计算的海金交叉,可产生更可靠的交易信号。 

当haclose上穿haopen时为多头信号;当haclose下穿haopen时为空头信号。

## 优势分析

相比原版海金交叉策略,平滑海金交叉策略具有以下优势:  

1. 平滑技术过滤了短期市场噪音,避免产生错误信号,提高信号质量。

2. 使用4个周期的平均价格计算平滑价,能更好地反映中长期趋势,产生更可靠的交易信号。

3. 结合海金交叉的快速交叉特点,该策略可以及时捕捉中长期趋势的转折点。

## 风险分析  

该策略也存在一些风险:

1. 在市场剧烈波动时,平滑技术可能过滤掉部分有效信号,导致错失交易机会。

2. 4周期的平均计算也会带来 certain程度的滞后,可能错过短线机会。

3. 该策略对交易频率和持仓时间有一定要求,不适合过于频繁或过于长期的交易。

针对上述风险,可通过适当优化平滑参数或组合其他指标来解决。

## 优化方向  

该策略可从以下几个方向进行优化:  

1. 优化平滑参数,如调整平均周期等,找到最佳参数组合。

2. 结合其他指标,如成交量,布林带等,提高信号的准确性。  

3. 增加止损策略,以控制风险,如移动止损、缩量止损等。

4. 优化资金管理策略,设定合理的头寸大小和止损位,控制单笔损失。

## 总结

平滑海金交叉策略融合海金交叉原理和平滑技术,能有效发掘中长期趋势的转折点,避免被短期市场噪音干扰。相比原版海金交叉策略,该策略通过平滑处理过滤掉部分噪音,能产生更高质量的交易信号。如果配以适当的止损和资金管理手段,该策略可以获得较为稳定的投资回报。但交易者也需注意防范滞后、漏单等风险,需要对策略进行定制优化。

||

## Overview  

The Heiken Ashi Crossover Strategy is a quantitative trading strategy that applies both the Heiken Ashi crossover principle and smoothing techniques. By calculating the average price over 4 periods to generate the smoothed price, and then computing the Heiken Ashi crossover based on the smoothed prices, it can issue reliable trading signals. Compared with the original Heiken Ashi crossover, this strategy can filter out short-term market noise and avoid wrong signals by using smoothing techniques.  

## Strategy Logic

The core logic behind this strategy includes:   

1. Heiken Ashi Crossover Principle

   Heiken Ashi crossover refers to the buy or sell signals generated when the short-term moving average crosses over or below the long-term moving average. In this strategy, the short-term MA is the smoothed closing price (haclose), while the long-term MA is the smoothed opening price (haopen).

2. Smoothing Techniques

   To filter out noise, this strategy adopts the average price over 4 periods to calculate the smoothed price:  

   haclose = (open + high + low + close) / 4

   haopen = (previous haopen + current haclose) / 2  

The Heiken Ashi crossover signals based on the smoothed prices above can provide more reliable trading signals. A buy signal is generated when haclose crosses over haopen, while a sell signal is triggered when haclose crosses below haopen.

## Advantage Analysis   

Compared with the original Heiken Ashi crossover strategy, the Smoothed Heiken Ashi Crossover Strategy has the following edges:

1. The smoothing techniques filter out short-term market noises and avoid wrong signals, thus improving the quality of trading signals.  

2. By adopting the 4-period average price to calculate the smoothed price, it can better reflect the medium-to-long term trend and generate more reliable trading signals.

3. Combined with the fast-crossover feature of Heiken Ashi, this strategy can timely capture the turning points of medium-to-long term trends.

## Risk Analysis

There are also some risks associated with this strategy:  

1. In periods of violent market fluctuation, the smoothing techniques may filter out some effective signals, thus missing potential trading opportunities.

2. The 4-period moving average calculation also introduces a certain degree of lag, which may result in missing short-term opportunities.  

3. This strategy has some requirements on trading frequency and holding period. It is not suitable for overly frequent or long-term trading.

To tackle the risks above, parameters tuning of the smoothing techniques and incorporating other technical indicators can be helpful solutions.

## Optimization Directions   

This strategy can be optimized in the following aspects:

1. Parameter tuning for the smoothing techniques, like adjusting the moving average period, to find the optimal parameter combination.  

2. Incorporating other indicators like volume, Bollinger Bands etc. to improve the accuracy of trading signals.

3. Adding stop loss strategies like trailing stop loss, pyramiding stop loss to control risks.

4. Optimizing money management by setting proper position sizing and stop loss levels to limit the loss of single trades.

## Conclusion  

The Heiken Ashi Crossover Strategy combines the Heiken Ashi crossover principle and smoothing techniques, which can effectively detect trend turning points in the medium-to-long term without being interfered by short-term market noises. Compared with the original Heiken Ashi crossover, this strategy filters out some noise by smoothing techniques and thus can generate higher quality trading signals. With proper stop loss and money management, this strategy can earn relatively steady returns from the market. However, traders should also be aware of the risks like lag and missing signals, and optimize the strategy accordingly.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|true|From Day|
|v_input_3|2017|From Year|
|v_input_4|true|To Month|
|v_input_5|true|To Day|
|v_input_6|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-06 00:00:00
end: 2023-12-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Heikin-Ashi Strategy", overlay=true)

// Plots Color Of Heikin-Ashi Bars while Viewing Candlestics or Bars
//Works on Candlesticks and OHLC Bars - Does now work on Heikin-Ashi bars - But I have verified its accuracy
// Created By User ChrisMoody 1-30-2014 with help from Alex in Tech Support

// === BACKTEST RANGE ===
FromMonth = input(defval = 1, title = "From Month", minval = 1)
FromDay   = input(defval = 1, title = "From Day", minval = 1)
FromYear  = input(defval = 2017, title = "From Year", minval = 1998)
ToMonth   = input(defval = 1, title = "To Month", minval = 1)
ToDay     = input(defval = 1, title = "To Day", minval = 1)
ToYear    = input(defval = 9999, title = "To Year", minval = 1998)


haclose = ((open + high + low + close)/4)//[smoothing]
haopen = na(haopen[1]) ? (open + close)/2 : (haopen[1] + haclose[1]) / 2

heikUpColor() => haclose > haopen
heikDownColor() => haclose <= haopen

barcolor(heikUpColor() ? aqua: heikDownColor() ? red : na)


if (heikUpColor() )
    strategy.entry("LONG", strategy.long, comment="LONG")
    
if (heikDownColor())
    strategy.entry("SHORT", strategy.short, comment="SHORT")


//plot(pos, title="pos", style=line, linewidth=1, color=red )
```

> Detail

https://www.fmz.com/strategy/435286

> Last Modified

2023-12-13 17:46:10
