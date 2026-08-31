
> Name

Pivot-Point-SuperTrend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8a047e7b1d676a445e.png)

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
