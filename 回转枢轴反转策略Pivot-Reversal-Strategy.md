
> Name

回转枢轴反转策略Pivot-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/185a11cb484a9f73dbc.png)
 [trans]


### 概述

本文将详细解析一个基于枢轴点的反转交易策略。该策略通过计算一定周期的最高价和最低价,确定可能的枢轴支撑和阻力位。当价格穿越这些枢轴位时,表明趋势发生转折,这时可以进行反转交易。

### 策略原理

该策略主要依赖两个指标:枢轴高点(Pivot High)和枢轴低点(Pivot Low)。枢轴高低点是在一个周期内的最高价和最低价,可以通过`pivothigh()`和`pivotlow()`函数计算获得。计算枢轴点时需要设置左右两边的周期数,本策略中左侧周期数为4,右侧周期数为2。

当最新一个周期的最高点低于上一个周期的枢轴高点时,说明出现了反转信号。这时如果之前是短线操作,现在应该考虑建立做多头寻求翻转机会。同样,当最新一个周期的最低点高于上一个周期的枢轴低点时,做空头应考虑反转建仓。

具体来说,该策略主要逻辑是:

1. 计算枢轴高低点
2. 判断价格是否突破枢轴点
   1. 如果低点上穿枢轴低点,做多
   2. 如果高点下穿枢轴高点,做空
3. 设置止损位

### 优势分析

该策略最大的优势在于识别潜在的趋势反转点,这对于反转交易者尤为重要。相比其他指标,枢轴点可以更清晰地判断支撑阻力,而不会出现频繁的假信号。

另外,该策略同时建立做多和做空条件,最大程度覆盖不同市场情况,避免错过交易机会。通过止损来控制风险,使盈亏比能够得到保证。

总的来说,这是一个非常实用的反转策略。

### 风险分析

尽管该策略力图降低假信号的概率,但任何以突破为基础的策略都难免会出现超前 Signals 或超迟 Signals 的情况。这可能导致计划建立多头仓位但市场已经开始转熊,或者计划建空仓但牛市突然爆发。这类无法完美预测反转的问题是技术分析本身的局限。

此外,枢轴点并不能百分之百确定关键的支撑阻力位,仅供参考。如果运气不好,枢轴点可能刚好错过真正的支撑位形成 止损 。这种模糊区间的问题也无法完全避免。

### 优化方向 

1. 周期优化。现有的左右周期数设置为4和2,这可以作为初始设置。但不同市场不同周期的枢轴可能效果更好,可以尝试优化找到最佳参数组合。

2. 结合其他指标过滤。比如可以加入成交量指标,只有在成交量放大的情况下才认为突破是有效的,这样可以减少假突破。

3. 动态止损。现有的止损是枢轴上下各留出一个最小交易单位的空间。这可以根据市场波动程度,采用动态止损去尝试最佳止损位。

4. 仅在趋势方向操作。现在做多做空条件是并行的,其实也可以只在多头市场里寻找做多机会,空头市场里寻找做空机会。结合趋势指标可能获得更好的效果。


### 总结

该策略整体来说是一个简单实用的反转策略。通过计算枢轴点并监测其突破,来判断潜在的趋势转折,这是其核心思路。该策略同时建立做多做空条件,最大限度捕捉反转机会。止损设置则用来控制风险。

整体而言,该策略思路清晰,易于实施。参数设置也比较直接,对新手友好。通过不断测试和优化,可以逐步改善策略表现,值得推荐。

||

### Overview

This article will analyze in detail a reversal trading strategy based on pivot points. The strategy calculates potential support and resistance pivot levels over a period, and identifies trend reversals when price breaks through these pivot levels, allowing reversal trades.

### Strategy Logic

The strategy mainly relies on two indicators: Pivot High and Pivot Low. Pivot highs and lows are the highest and lowest prices within a period, and can be obtained using the `pivothigh()` and `pivotlow()` functions. When computing pivot points, the periods to the left and right need to be set; this strategy uses 4 periods to the left and 2 periods to the right.  

When the highest price of the latest period is lower than the previous period's pivot high, it signals a reversal opportunity. If previous positions were short, long positions should now be considered to capitalize on the reversal. Similarly, when the latest period's lowest price is higher than the previous pivot low, existing long positions should consider reversing to short.

Specifically, the main logic is:

1. Compute pivot high/low levels 
2. Identify breakthroughs
   1. Long when price breaks above pivot low
   2. Short when price breaks below pivot high
3. Set stop loss levels

### Advantage Analysis

The biggest advantage of this strategy is identifying potential trend reversal points, which is crucial for reversal traders. Compared to other indicators, pivot points can more clearly identify key support/resistance levels without frequent false signals.

Moreover, the strategy has conditions for both long and short entries, covering different market situations to avoid missing opportunities. The use of stop loss controls risk and ensures a good risk/reward ratio.

In summary, this is a very practical reversal strategy.  

### Risk Analysis

Despite efforts to reduce false signals, any breakout-based strategy inevitably faces issues like premature or lagging signals. This could result in planning a long entry but the market has already reversed, or planning a short but a bull run suddenly erupts. Such inability to perfectly predict reversals is an inherent limitation of technical analysis.

Additionally, pivot points cannot guarantee perfect support/resistance levels either. Bad luck could result in stop loss hitting just before the real support level. Such uncertainty around key zones cannot be fully avoided.

### Enhancement Opportunities

1. Period optimization. The current left/right periods are set at 4 and 2. These can serve as initial values and be further optimized for each market.

2. Add filters with other indicators. For example, combine with volume to only consider breakouts as valid when accompanied by increasing volume. This helps avoid false breakouts.  

3. Dynamic stop loss. Currently stops are set with a buffer of one minimum tick above/below pivot levels. The buffer zone can be dynamically adjusted based on market volatility.

4. Operate only in trend direction. Currently long/short conditions are in parallel. An optimization is to only long in uptrends and short in downtrends based on a trend filter.

### Conclusion 

In summary, this is a simple yet practical reversal strategy. Identifying pivot points over a period and monitoring price breakthroughs forms the core idea for detecting potential trend reversals. The parallel long/short conditions maximize opportunities while stop losses manage risk.

The strategy logic is straightforward and easy to implement. The parameters are also intuitive for beginners. Further optimizations can improve performance for adoption. Overall this is a recommended strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|leftBars|
|v_input_2|2|rightBars|
|v_input_3|true|From Day|
|v_input_4|3|From Month|
|v_input_5|2018|From Year|
|v_input_6|true|To Day|
|v_input_7|true|To Month|
|v_input_8|2100|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Pivot Reversal Strategy", overlay=true)

leftBars  = input(4)
rightBars = input(2)

// backtesting date range
from_day   = input(defval = 1,    title = "From Day",   minval = 1)
from_month = input(defval = 3,    title = "From Month", minval = 1)
from_year  = input(defval = 2018, title = "From Year",  minval = 1970)

to_day     = input(defval = 1,    title = "To Day",     minval = 1)
to_month   = input(defval = 1,    title = "To Month",   minval = 1)
to_year    = input(defval = 2100, title = "To Year",    minval = 1970)

time_cond = (time > timestamp(from_year, from_month, from_day, 00, 00)) and (time < timestamp(to_year, to_month, to_day, 23, 59))

swh = pivothigh(leftBars, rightBars)
swl = pivotlow(leftBars, rightBars)

swh_cond = not na(swh)

hprice = 0.0
hprice := swh_cond ? swh : hprice[1]

le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

if (le and time_cond)
    strategy.entry("PivRevLE", strategy.long, comment="PivRevLE", stop=hprice + syminfo.mintick)

swl_cond = not na(swl)

lprice = 0.0
lprice := swl_cond ? swl : lprice[1]


se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

if (se and time_cond)
    strategy.entry("PivRevSE", strategy.short, comment="PivRevSE", stop=lprice - syminfo.mintick)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/435761

> Last Modified

2023-12-18 16:59:59
