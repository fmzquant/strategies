
> Name

超级支撑阻力趋势跟踪策略Pivot-Point-SuperTrend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8a047e7b1d676a445e.png)
[trans]
## 概述

超级支撑阻力趋势跟踪策略是一种创新型的趋势跟踪策略,它将支撑阻力点和超级趋势这两个流行指标进行了融合,同时加入了一个额外的趋势过滤器来提高精确度。这个策略的灵感来源于Lonesome TheBlue的“支撑阻力点超级趋势”脚本,其目标是为交易者提供一个可靠的趋势跟踪工具,同时最大限度地减少假信号。

## 策略原理

该策略的基础在于支撑阻力点和超级趋势指标的融合,以及一个强大的趋势过滤器的添加。它首先在指定周期内计算支撑高点和低点,这些关键的参考点对趋势分析至关重要。通过加权平均计算,这些支撑阻力点形成一个中线,进一步完善了整个指标。

接下来,根据中线和用户定义的ATR因子生成上下轨。这些波段会根据市场波动进行自我调整,为策略增加了灵活性。“支撑阻力点超级趋势”策略的核心在于准确识别主导趋势,该指标在价格与超级趋势波段互动时会平滑地在多头和空头信号之间转换。

引入策略的额外趋势过滤器进一步增强了其能力。该过滤器基于移动平均线,动态评估趋势的力度和方向。通过将该趋势过滤器与原始的支撑阻力点超级趋势信号相结合,策略旨在做出更明智和可靠的交易决策。

## 优势分析

1. 提高精确度:趋势过滤器的加入通过在生成信号之前确认整体趋势方向来提高策略的准确性。

2. 趋势延续:支撑阻力点和超级趋势以及趋势过滤器的整合,旨在在强劲的市场趋势期间延长交易,从而潜在地最大化获利机会。  

3. 减少虚假信号:策略的加权平均计算再加上趋势过滤器有助于最小化假信号并减少不确定或盘整市场条件下的跳空。

4. 支撑阻力见解:该策略继续根据支撑阻力点提供额外的支持和阻力位,为交易者提供有价值的上下文信息。

## 风险分析

1. 参数依赖:该策略对ATR周期和ATR倍数的参数很敏感,不适当的参数设置可能导致多余交易或错失良机。

2. 趋势反转:在趋势反转点附近,策略可能会产生错误信号,导致不必要的损失。应结合止损来管理风险。

3. 过度优化:参数可以通过优化得到最佳组合,但并不具有前瞻性。应考虑行情和品种差异对参数选择的影响。

4. 空仓风险:当价格脱离上下轨时,策略会进入空仓状态。这可能错过趋势再次形成后的机会。

## 优化方向  

1. 结合其他指标:可以考虑加入成交量或波动率指标等,提高策略的稳健性。

2. 动态参数:可以研究自动优化或根据市场环境调整参数的方法,使策略更具适应性。  

3. 止损策略:研究如何在维持策略逻辑的前提下,设计止损机制,有效控制单笔损失。

4. 品种适应性:评估策略 Parameter în diferite piețe și instrumente, optimizați parametrii în funcție de specificul fiecăruia.

## 总结

超级支撑阻力趋势跟踪策略是一个非常有前途的量化策略。它在简洁性、趋势跟踪能力等多个维度上展现出独特优势。同时,策略也有可以改进的空间,通过参数、止损、品种适应性等多方面优化,可以使其成为一个更加通用和可靠的量化工具。总的来说,该策略为交易者提供了一个高效捕捉市场趋势的有力工具。

||

## Overview  

The Pivot Point SuperTrend strategy is an innovative trend following strategy that combines two popular indicators – Pivot Points and SuperTrend, while introducing an additional trend filter for enhanced precision. This strategy draws inspiration from Lonesome TheBlue's "Pivot Point SuperTrend" script, aiming to provide traders with a reliable tool for trend following while minimizing false signals.  

## Strategy Logic  

The foundation of the strategy lies in the fusion of Pivot Points and SuperTrend indicators, plus the addition of a robust trend filter. It starts by calculating Pivot Highs and Lows over a specified period, serving as crucial reference points for trend analysis. Through a weighted average calculation, these Pivot Points create a center line, refining the overall indicator.  

Next, based on the center line and the Average True Range (ATR) with a user-defined Factor, upper and lower bands are generated. These bands adapt to market volatility, adding flexibility to the strategy. The heart of the "Pivot Point SuperTrend" strategy lies in accurately identifying the prevailing trend, with the indicator smoothly transitioning between bullish and bearish signals as price interacts with the SuperTrend bands.  

The additional trend filter introduced into the strategy further enhances its capabilities. This filter is based on a moving average, providing a dynamic assessment of the trend's strength and direction. By combining this trend filter with the original Pivot Point SuperTrend signals, the strategy aims to make more informed and reliable trading decisions.  

## Advantages Analysis  

1. Enhanced Precision: The incorporation of a trend filter improves the strategy's accuracy by confirming the overall trend direction before generating signals.

2. Trend Continuation: The integration of Pivot Points and SuperTrend, along with the trend filter, aims to prolong trades during strong market trends, potentially maximizing profit opportunities.   

3. Reduced Whipsaws: The strategy's weighted average calculation, coupled with the trend filter, helps minimize false signals and reduces whipsaws during uncertain or sideways market conditions.  

4. Support and Resistance Insights: The strategy continues to provide additional support and resistance levels based on the Pivot Points, offering valuable contextual information to traders.

## Risk Analysis

1. Parameter Dependency: The strategy is sensitive to parameters like ATR period and multiplier. Improper settings may lead to overtrading or missing opportunities.  

2. Trend Reversals: Near trend reversal points, the strategy may generate false signals resulting in unnecessary losses. Risk should be managed using stop losses.

3. Over-optimization: Parameters can be optimized for best results but lack forward viability. Impact of market and instrument differences on parameter selection should be considered.  

4. Gap Risk: When prices move outside the bands, the strategy enters a flat position. This could miss opportunities when trends resume after a gap.

## Optimization Directions   

1. Additional Filters: Volume, volatility filters etc. could be added to enhance the strategy's robustness.  

2. Dynamic Parameters: Methods for auto-optimization or adaptive adjustment of parameters based on changing market conditions could make the strategy more versatile.
  
3. Stop Losses: Research ways to design stop loss mechanisms while maintaining strategy logic to effectively control downside. 

4. Cross-asset Optimization: Evaluate strategy parameters across different markets and instruments. Optimize parameters according to the specifics of each.  

## Summary  

The Pivot Point SuperTrend strategy demonstrates unique strengths across dimensions like simplicity and trend following capability. At the same time, aspects like parameters, stop losses, cross-asset optimization offer room for improving it into an even more universal and reliable tool. Overall, it empowers traders with an efficient means of capturing market trends.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Pivot Point Period|
|v_input_2|3|ATR Factor|
|v_input_3|10|ATR Period|
|v_input_4|false|Show Pivot Points|
|v_input_5|true|Show Buy/Sell Labels|
|v_input_6|false|Show PP Center Line|
|v_input_7|false|Show Support/Resistance|
|v_input_8|10|ATR Period|
|v_input_9_hl2|0|Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_10|3|ATR Multiplier|
|v_input_11|true|Change ATR Calculation Method ?|
|v_input_12|20|Moving Average Period|
|v_input_13_close|0|Moving Average Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|9|From Month|
|v_input_15|true|From Day|
|v_input_16|2018|From Year|
|v_input_17|true|To Month|
|v_input_18|true|To Day|
|v_input_19|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-19 00:00:00
end: 2024-02-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © Julien_Eche
// Strategy based on "Pivot Point Supertrend" Indicator by LonesomeTheBlue

//@version=4

strategy("PPS", overlay=true, initial_capital=500000, currency=currency.USD, default_qty_type=strategy.cash, default_qty_value=50000)

prd = input(defval = 2, title="Pivot Point Period", minval = 1, maxval = 50)
Factor=input(defval = 3, title = "ATR Factor", minval = 1, step = 0.1)
Pd=input(defval = 10, title = "ATR Period", minval=1)
showpivot = input(defval = false, title="Show Pivot Points")
showlabel = input(defval = true, title="Show Buy/Sell Labels")
showcl = input(defval = false, title="Show PP Center Line")
showsr = input(defval = false, title="Show Support/Resistance")

// get Pivot High/Low
float ph = pivothigh(prd, prd)
float pl = pivotlow(prd, prd)

// drawl Pivot Points if "showpivot" is enabled
plotshape(ph and showpivot, text="H",  style=shape.labeldown, color=na, textcolor=color.red, location=location.abovebar, transp=0, offset = -prd)
plotshape(pl and showpivot, text="L",  style=shape.labeldown, color=na, textcolor=color.lime, location=location.belowbar, transp=0, offset = -prd)

// calculate the Center line using pivot points
var float center = na
float lastpp = ph ? ph : pl ? pl : na
if lastpp
    if na(center)
        center := lastpp
    else
        //weighted calculation
        center := (center * 2 + lastpp) / 3

// upper/lower bands calculation
Up = center - (Factor * atr(Pd))
Dn = center + (Factor * atr(Pd))

// get the trend
float TUp = na
float TDown = na
Trend = 0
TUp := close[1] > TUp[1] ? max(Up, TUp[1]) : Up
TDown := close[1] < TDown[1] ? min(Dn, TDown[1]) : Dn
Trend := close > TDown[1] ? 1: close < TUp[1]? -1: nz(Trend[1], 1)
Trailingsl = Trend == 1 ? TUp : TDown

// plot the trend
linecolor = Trend == 1 and nz(Trend[1]) == 1 ? color.lime : Trend == -1 and nz(Trend[1]) == -1 ? color.red : na
plot(Trailingsl, color = linecolor ,  linewidth = 2, title = "PP SuperTrend")
 
plot(showcl ? center : na, color = showcl ? center < hl2 ? color.blue : color.red : na)

// check and plot the signals
bsignal = Trend == 1 and Trend[1] == -1
ssignal = Trend == -1 and Trend[1] == 1
plotshape(bsignal and showlabel ? Trailingsl : na, title="Buy", text="Buy", location = location.absolute, style = shape.labelup, size = size.tiny, color = color.lime, textcolor = color.black, transp = 0)
plotshape(ssignal and showlabel ? Trailingsl : na, title="Sell", text="Sell", location = location.absolute, style = shape.labeldown, size = size.tiny, color = color.red, textcolor = color.white, transp = 0)

//get S/R levels using Pivot Points
float resistance = na
float support = na
support := pl ? pl : support[1]
resistance := ph ? ph : resistance[1]

// if enabled then show S/R levels
plot(showsr and support ? support : na, color = showsr and support ? color.lime : na, style = plot.style_circles, offset = -prd)
plot(showsr and resistance ? resistance : na, color = showsr and resistance ? color.red : na, style = plot.style_circles, offset = -prd)

// Trend Filter from SuperTrend Long Strategy
Periods = input(title="ATR Period", type=input.integer, defval=10)
src = input(hl2, title="Source")
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=3.0)
changeATR = input(title="Change ATR Calculation Method ?", type=input.bool, defval=true)

// Combine the SuperTrend calculations
atr2 = sma(tr, Periods)
atr = changeATR ? atr(Periods) : atr2

up = src - (Multiplier * atr)
up1 = nz(up[1], up)
up := close[1] > up1 ? max(up, up1) : up

dn = src + (Multiplier * atr)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? min(dn, dn1) : dn

trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend

// Moving Average as Trend Filter
periodes_ma = input(title="Moving Average Period", type=input.integer, defval=20)
src_ma = input(title="Moving Average Source", type=input.source, defval=close)
ma = sma(src_ma, periodes_ma)

// Strategy Entry Conditions
FromMonth = input(defval = 9, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 999)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 999)

start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       

window()  => time >= start and time <= finish ? true : false

// Combined entry conditions
longCondition = (trend == 1 and trend[1] == -1 and close > ma) or (bsignal and window())
shortCondition = (trend == -1 and trend[1] == 1 and close < ma) or (ssignal and window())

if (longCondition)
    strategy.entry("BUY", strategy.long)

if (shortCondition)
    strategy.close("BUY")
    strategy.entry("SELL", strategy.short)

buy1 = barssince((trend == 1 and trend[1] == -1 and close > ma) or (bsignal and window()))
sell1 = barssince((trend == -1 and trend[1] == 1 and close < ma) or (ssignal and window()))
color1 = buy1[1] < sell1[1] ? color.green : buy1[1] > sell1[1] ? color.red : na
barcolor(color1)
```

> Detail

https://www.fmz.com/strategy/442814

> Last Modified

2024-02-26 10:57:20
