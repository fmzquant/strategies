
> Name

开放收盘交叉移动平均线趋势追踪策略Open-Close-Cross-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11069e8c2ab999ac67f.png)
[trans]
## 概述

开放收盘交叉移动平均线趋势追踪策略是一种基于移动平均线的趋势跟踪策略。该策略通过计算开盘价和收盘价的移动平均线,判断当前市场趋势;当收盘价的移动平均线上穿开盘价的移动平均线时,做多;当收盘价的移动平均线下穿开盘价的移动平均线时,做空。该策略同时设置了追踪止损来锁定利润,可有效控制风险。

## 策略原理

该策略的核心逻辑基于开盘价和收盘价的关系来判断当前趋势。开盘价反映了当前市场的供需关系和交易心理,收盘价反映了当日成交的结果。一般来说,如果收盘价高于开盘价,表示当日行情走强,多头气氛较好;如果收盘价低于开盘价,则表示当日行情走弱,空头气氛较重。

该策略运用这个逻辑,通过计算开盘价和收盘价的移动平均线,来判断当前的趋势走向。具体来说,它的决策规则如下:

1. 当收盘价的移动平均线上穿开盘价的移动平均线时,做多。这表示目前多头气氛正在增强,可以进入多单。

2. 当收盘价的移动平均线下穿开盘价的移动平均线时,做空。这表示目前空头气氛正在增强,可以进入空单。 

3. 当发生反向信号时,原有头寸止损出场。

该策略还设置了追踪止损来锁定利润。在入场后,会实时计算入场价到当前价格的点数差。当价格运行超过设定的止损点数时,止损线会向上爬升,以锁定部分利润。

总的来说,该策略判断趋势的时间段为移动平均线周期length;每次只持有一个方向的仓位;原有仓位止损是直接反向做法,并没有设置类似于ATR止损;有止盈追踪设置来锁定利润。

## 优势分析

该策略具有以下几个优势:

1. **决策规则清晰简单**。基于开盘收盘关系来判断趋势,容易理解,也便于参数优化。

2. **灵活选择移动平均线种类**。可供选择的移动平均线有十几种,可灵活组合,寻找最佳参数。

3. **可灵活调整使用分辨率**。为了让信号更加灵敏和及时,可将策略的分辨率设置为图表的3-4倍。 

4. **有止损机制**。策略中设置了追踪止损,可有效控制单笔损失和回撤。

5. **可定制不同持仓时间**。通过调整移动平均线参数,可控制波动性和持仓周期。

6. **可灵活调整风险收益**。可通过调整止损点数和偏移来控制风险程度。

## 风险分析

该策略也存在一些风险,主要集中在以下几个方面:

1. **错失趋势反转点**。该策略的出场信号可能会略迟于价格反转,导致尾盘被套。可通过适当缩短移动平均线周期来减轻。

2. **不适合剧烈震荡市**。在剧烈的震荡行情中,该策略会频繁开仓平仓,手续费负担重。这时可以适当放宽止损点数,或延长移动平均线周期。

3. **单一指标判断**。该策略仅基于一组指标,容易受到失效的影响。可考虑引入类似MACD等其他指标,丰富策略逻辑。

4. **参数容易过优化**。移动平均线参数和止损参数都容易过度优化,实际表现可能弱于回测。应谨慎看待参数选择。

## 优化方向 

该策略可从以下几个方向进行优化:

1. **组合其他指标**。可尝试引入增量指标、波动率指标等,丰富策略逻辑,提高稳定性。

2. **参数调整周期化**。可结合市场类型,动态调整移动平均线参数,在趋势行情中拉长周期,在震荡行情中缩短周期。

3. **风险度量动态调整**。可基于最近一段时间的真实波动情况,动态调整止损点数和偏移。

4. **增强止损逻辑**。现有的止损仅基于价格和点数,可考虑引入ATR等更丰富的止损方式。

## 总结

开放收盘交叉移动平均线趋势追踪策略是一个较为典型的基于开盘收盘关系判断趋势方向的策略。它有决策规则简单明确、灵活可调、可控风险等优势,也存在错失反转点、不适宜剧烈震荡等问题。该策略可从丰富指标基础、动态参数调整、增强止损逻辑等方面进行优化,使之能够更好地把握趋势机会,应对市场变化。

||

## Overview

The Open Close Cross Moving Average Trend Following Strategy is a trend following strategy based on moving averages of the open and close prices. It determines the current market trend by calculating the moving averages of the open and close prices; it goes long when the closing price moving average crosses above the opening price moving average, and goes short when the closing price moving average crosses below the opening price moving average. The strategy also sets trailing stops to lock in profits and effectively control risks.

## Principles 

The core logic of this strategy is based on the relationship between the open and close prices to determine the current trend. The opening price reflects the current market supply-demand relationship and trading psychology, while the closing price reflects the final traded outcome of the day. In general, if the closing price is higher than the opening price, it indicates that the market trend for the day is upward and sentiment is more bullish. If the closing price is lower than the opening price, it suggests the market trend for the day is downward and sentiment is more bearish.

This strategy utilizes this logic by calculating the moving averages of the open and close prices to judge the current trend direction. Specifically, its trading rules are:

1. Go long when the closing price moving average crosses above the opening price moving average. This signals that bullish sentiment is strengthening and a long position can be initiated.  

2. Go short when the closing price moving average crosses below the opening price moving average. This suggests that bearish sentiment is rising and a short position can be initiated.

3. Close existing positions with a stop loss when reverse signals happen.

The strategy also sets trailing stops to lock in profits. After entering a position, it dynamically calculates the point difference between the entry price and the current price. When the price movement exceeds the set stop loss point threshold, the stop loss line will move up to lock in partial profits.

In summary, the strategy judges trends over the moving average period length; holds only one directional position at a time; exits existing positions directly with reverse signals without ATR stops; and has trailing stop settings to lock in profits.

## Advantage Analysis

This strategy has the following main advantages:

1. **Simple and Clear Rules**. Judging trend based on open-close relationship is easy to understand and optimize parameters for.

2. **Flexible MA Choices**. There are dozens of MA types to choose from and optimize.

3. **Adjustable Resolution**. The resolution can be set to 3-4x of chart for more sensitivity and timeliness of signals.

4. **Stop Loss Mechanism**. The trailing stop effectively controls loss and drawdown per trade.  

5. **Customizable Holding Period**. The holding period and volatility can be controlled by adjusting MA parameters.

6. **Flexibly Tunable Risk-Reward**. Stop loss points and offset fine tunes risk-reward preference.

## Risk Analysis  

The main risks of this strategy lie in the following areas:

1. **Missing Trend Reversals**. Exit signals may lag price reversals resulting in overholding losses. Shortening MA period can alleviate this.

2. **Not Suitable for High Volatility Conditions**. Frequent whipsaws under volatile conditions creates high commission costs. Widening stop loss points or lengthening MA period can help here.

3. **Reliance on Single Indicator**. Basing decisions on just one indicator set exposes it to failure risk. Adding other indicators like MACD could complement the logic.

4. **Over-optimization Risk**. MA parameters and stop loss settings can be easily overfit. Out-of-sample performance may deteriorate. Caution should be taken in parameter selection. 

## Optimization Directions

The strategy can be optimized and enhanced from areas like:

1. **Complementary indicators**. Volatility and momentum indicators can increase robustness and stability. 

2. **Conditional Dynamic Parameters**. MA periods can be adjusted based on trending or sideways market regime detection for better adaptiveness.

3. **Dynamic risk control**. Stop loss points and offsets can be calibrated on recent realized volatility levels.

4. **Enhanced Stop Loss Logic**. More advanced stop loss mechanisms like ATR stops can replace the simplistic trailing stop.

## Conclusion

The Open Close Cross Moving Average Trend Following Strategy is a typical trend trading strategy based on open-close relationship and moving averages. Its advantages like simple rules, flexibility and controllable risks also comes with drawbacks of missing reversals and whipsaws. Enhancement areas include more indicators, dynamic parameters, and advanced risk management for better trend catches and adaptability to varying market conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use Alternate Resolution? ( recommended )|
|v_input_2|120|Set Resolution ( should not be lower than chart )|
|v_input_3|true|Use MA? ( otherwise use simple Open/Close data )|
|v_input_4|DEMA|MA Type: SMA, EMA, DEMA, TEMA, WMA, VWMA, SMMA, HullMA, LSMA, ALMA ( case sensitive )|
|v_input_5|14|MA Period|
|v_input_6|6|Offset for LSMA / Sigma for ALMA|
|v_input_7|0.85|Offset for ALMA|
|v_input_8|true|Use Trailing Stop?|
|v_input_9|200|Stop Loss Trail Points|
|v_input_10|400|Stop Loss Trail Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-08 00:00:00
end: 2024-01-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title = "Open Close Cross Strategy (PineScript=v4)", shorttitle = "OCC Strategy", overlay = true )

// Revision:        1
// Author:          @JayRogers
//
// Description:
//  - Strategy based around Open-Close Crossovers.
// Setup:
//  - I have generally found that setting the strategy resolution to 3-4x that of the chart you are viewing
//    tends to yield the best results, regardless of which MA option you may choose (if any)
//  - Don't aim for perfection. Just aim to get a reasonably snug fit with the O-C band, with good runs of
//    green and red.
//  - Option to either use basic open and close series data, or pick your poison with a wide array of MA types.
//  - Optional trailing stop for damage mitigation if desired (can be toggled on/off)
//  - Positions get taken automagically following a crossover - which is why it's better to set the resolution
//    of the script greater than that of your chart, so that the trades get taken sooner rather than later.
//  - If you make use of the trailing stops, be sure to take your time tweaking the values. Cutting it too fine
//    will cost you profits but keep you safer, while letting them loose could lead to more drawdown than you
//    can handle.

// === INPUTS ===
useRes = input(defval=true, title="Use Alternate Resolution? ( recommended )")
stratRes = input(defval="120", title="Set Resolution ( should not be lower than chart )", type=input.resolution)
useMA = input(defval=true, title="Use MA? ( otherwise use simple Open/Close data )")
basisType = input(defval="DEMA", title="MA Type: SMA, EMA, DEMA, TEMA, WMA, VWMA, SMMA, HullMA, LSMA, ALMA ( case sensitive )", type=input.string)
basisLen = input(defval=14, title="MA Period", minval=1)
offsetSigma = input(defval=6, title="Offset for LSMA / Sigma for ALMA", minval=0)
offsetALMA = input(defval=0.85, title="Offset for ALMA", minval=0, step=0.01)
useStop = input(defval=true, title="Use Trailing Stop?")
slPoints = input(defval=200, title="Stop Loss Trail Points", minval=1)
slOffset = input(defval=400, title="Stop Loss Trail Offset", minval=1)
// === /INPUTS ===

// === BASE FUNCTIONS ===
// Returns MA input selection variant, default to SMA if blank or typo.
variant(type, src, len, offSig, offALMA) =>
    v1 = sma(src, len)  // Simple
    v2 = ema(src, len)  // Exponential
    v3 = 2 * v2 - ema(v2, len)  // Double Exponential
    v4 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)  // Triple Exponential
    v5 = wma(src, len)  // Weighted
    v6 = vwma(src, len)  // Volume Weighted
    sma_1 = sma(src, len)  // Smoothed
    v7 = na(v5[1]) ? sma_1 : (v5[1] * (len - 1) + src) / len
    v8 = wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))  // Hull
    v9 = linreg(src, len, offSig)  // Least Squares
    v10 = alma(src, len, offALMA, offSig)  // Arnaud Legoux
    type == "EMA" ? v2 : type == "DEMA" ? v3 : type == "TEMA" ? v4 : 
       type == "WMA" ? v5 : type == "VWMA" ? v6 : type == "SMMA" ? v7 : 
       type == "HullMA" ? v8 : type == "LSMA" ? v9 : type == "ALMA" ? v10 : v1
// security wrapper for repeat calls
reso(exp, use, res) =>
    security_1 = security(syminfo.tickerid, res, exp)
    use ? security_1 : exp
// === /BASE FUNCTIONS ===

// === SERIES SETUP ===
// open/close
variant__1 = variant(basisType, close, basisLen, offsetSigma, offsetALMA)
reso__1 = reso(variant__1, useRes, stratRes)
reso__2 = reso(close, useRes, stratRes)
closeSeries = useMA ? reso__1 : reso__2
variant__2 = variant(basisType, open, basisLen, offsetSigma, offsetALMA)
reso__3 = reso(variant__2, useRes, stratRes)
reso__4 = reso(open, useRes, stratRes)
openSeries = useMA ? reso__3 : reso__4
trendState = bool(na)
trendState := closeSeries > openSeries ? true : 
   closeSeries < openSeries ? false : trendState[1]
// === /SERIES ===

// === PLOTTING ===
barcolor(color=closeSeries > openSeries ? #006600 : #990000, title="Bar Colours")
// channel outline
closePlot = plot(closeSeries, title="Close Line", color=#009900, linewidth=2, style=plot.style_line, transp=90)
openPlot = plot(openSeries, title="Open Line", color=#CC0000, linewidth=2, style=plot.style_line, transp=90)
// channel fill
closePlotU = plot(trendState ? closeSeries : na, transp=100, editable=false)
openPlotU = plot(trendState ? openSeries : na, transp=100, editable=false)
closePlotD = plot(trendState ? na : closeSeries, transp=100, editable=false)
openPlotD = plot(trendState ? na : openSeries, transp=100, editable=false)
fill(openPlotU, closePlotU, title="Up Trend Fill", color=#009900, transp=40)
fill(openPlotD, closePlotD, title="Down Trend Fill", color=#CC0000, transp=40)
// === /PLOTTING ===

// === STRATEGY ===
// conditions
longCond = crossover(closeSeries, openSeries)
shortCond = crossunder(closeSeries, openSeries)
// entries and base exit
strategy.entry("long", strategy.long, when=longCond)
strategy.entry("short", strategy.short, when=shortCond)
// if we're using the trailing stop
if useStop
    strategy.exit("XL", from_entry="long", trail_points=slPoints, trail_offset=slOffset)
    strategy.exit("XS", from_entry="short", trail_points=slPoints, trail_offset=slOffset)
// not sure needed, but just incase..
strategy.exit("XL", from_entry="long", when=shortCond)
strategy.exit("XS", from_entry="short", when=longCond)
// === /STRATEGY ===

```

> Detail

https://www.fmz.com/strategy/438800

> Last Modified

2024-01-15 14:24:27
