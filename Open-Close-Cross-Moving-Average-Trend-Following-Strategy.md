
> Name

Open-Close-Cross-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11069e8c2ab999ac67f.png)

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
