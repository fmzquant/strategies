
> Name

Ichimoku-Kinko-Hyo-Cloud-QQE-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c3ec1a8fa605c51caf.png)

## Overview 

This strategy combines Ichimoku Kinko Hyo Cloud and QQE indicators to discover potential price trends and determine optimal entry and exit timing. It calculates Ichimoku Cloud lines and uses QQE indicator to judge trend direction and generate trading signals, while utilizing RSI indicator for filtration to control trading risk.  

## Strategy Logic

The strategy consists of three main components:

1. Ichimoku Cloud Indicator: Ichimoku Cloud uses Tenkan-sen (Conversion Line) and Kijun-sen (Base Line) to form "Ichimoku" formation. Tenkan-sen represents short-term trend while Kijun-sen stands for medium-term trend. The crossing between Tenkan-sen and Kijun-sen generates buy and sell signals.

2. QQE Indicator: QQE calculates discrete relative value bands and smoothed relative values to determine the trend direction. It sends trading signals when price breaks out of outer bands into the middle band area.

3. RSI Indicator: RSI judges if the price is overbought or oversold. It sets overbought line and overbought zones, and uses QQE signals to decide final entry and exit signals.

Specifically, this strategy monitors if Conversion Line has golden cross (upward crossing) or dead cross (downward crossing) with Base Line to determine trading signals. It also uses QQE indicator to confirm overall trend direction. When both indicators give aligned signals, and RSI shows no overbought or oversold situation, the trading signals will be triggered.

## Advantages

This strategy combines different indicators to improve judgment accuracy and utilize complementary advantages to avoid bias from single indicator decision. The main advantages are:

1. Conversion Line and Base Line of Ichimoku Cloud reflect both short-term and medium-term trends for better accuracy than single MA indicator.

2. QQE reliably determines overall trend direction and complements with Ichimoku Cloud. 

3. RSI filtration efficiently filters out false breakouts and controls trading risks.

4. This strategy has clear logic and is easy to understand and implement for quantitative trading.

## Risks

Although this strategy uses multiple indicators for robust decisions, main risks still exist:  

1. Parameter tuning risk. Invalid parameter settings of Conversion Line, Base Line etc will lead to improper trading signals. Parameters need optimization for different products.

2. Trend reversal risk. Fake signals may occur during range-bound market. More indicators of trend reversal are needed. 

3. Too strict RSI filter risk. Potential trading opportunities may be filtered out. RSI parameters can be tuned to allow more trades.

Solutions:

1. Optimize parameters on more historical data for different products to ensure proper parameter configuration.  

2. Add stop loss mechanism in the strategy. Exit positions when price breaks stop loss line in opposite direction.

3. Optimize RSI parameters to moderately relax the filtration requirements and acquire more trading opportunities under risk control.

## Enhancement Directions

This strategy can be further improved from the following aspects:

1. Introduce machine learning algorithms to dynamically tune the strategy parameters adapting to evolving markets, improving adaptivity. 

2. Modularize the strategy components for easier replacement and separate testing & optimization, improving development efficiency.  

3. Build data integration module to collect market data from more sources and construct high-quality training set, enhancing machine learning performance.
  
4. Develop backtesting tools for comprehensive strategy validation, recording various metrics for parameter tuning.

5. Deploy the strategy system on cloud platform, utilize elastic computing power for faster parallel backtesting, accelerating parameters optimization at lower development costs.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Standard Ichimoku Cloud|
|v_input_2|true|Ichimoku Cloud - no offset - no repaint|
|v_input_3|9|Conversion Line Period - Tenkan-Sen|
|v_input_4|27|Base Line Period - Kijun-Sen|
|v_input_5|52|Base Line Period - Kijun-Sen (auxiliary)|
|v_input_6|52|Lagging Span 2 Periods - Senkou Span B|
|v_input_7|26|Displacement: (-) Chikou Span; (+) Senkou Span A|
|v_input_8|true|Displacement: additional bars|
|v_input_9_close|0|Lagging Span price source - Chikou-Span: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|50|RSI Filter: Overbought level (0 = off)|
|v_input_11|100|RSI Filter: Oversold level (100 = off)|
|v_input_12|14|RSI Length|
|v_input_13_close|0|RSI Price source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_14|10|RSI Length|
|v_input_15|5|RSI Smoothing|
|v_input_16|2.438|Fast QQE Factor|
|v_input_17|10|Thresh-hold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KryptoNight

//@version=4
// comment/uncomment Study/Strategy to easily switch modes
// study("Ichimoku Kinko Hyo Cloud - no offset - no repaint - RSI filter - alerts", shorttitle="IchiCloud + RSI - alerts", overlay=true)
// ============================================================================== Strategy mode - uncomment to activate
strategy("Ichimoku Kinko Hyo Cloud - no offset - no repaint - RSI filter - strategy", shorttitle="IchiCloud + RSI - Strategy Tester Mode", overlay=true, pyramiding = 0,
  currency = currency.EUR, initial_capital = 2000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100,
  calc_on_every_tick = true, calc_on_order_fills = true, commission_type = strategy.commission.percent, commission_value = 0.15)
// ==============================================================================

// ------------------------------------------------------------------------------

ichiCloud_offset   = input(false, title="Standard Ichimoku Cloud")                  // with the visual offset
ichiCloud_noOffset = input(true,  title="Ichimoku Cloud - no offset - no repaint")  // without the visual offset

conversion_prd = input(9, minval=1, title="Conversion Line Period - Tenkan-Sen")
baseline_prd   = input(27, minval=1, title="Base Line Period - Kijun-Sen")
baselineA_prd  = input(52, minval=1, title="Base Line Period - Kijun-Sen (auxiliary)")
leadingSpan_2prd = input(52, minval=1, title="Lagging Span 2 Periods - Senkou Span B")
displacement = input(26, minval=0, title="Displacement: (-) Chikou Span; (+) Senkou Span A")
extra_bars = input(1, minval=0, title="Displacement: additional bars")
laggingSpan_src = input(close, title="Lagging Span price source - Chikou-Span")

donchian(len) => avg(lowest(len), highest(len))
displ = displacement-extra_bars
// ------------------------------------------------------------------------------
// OFFSET:
conversion = donchian(conversion_prd)   // Conversion Line - Tenkan-Sen (9 Period)
baseline  = donchian(baseline_prd)      // Base Line - Kijun-Sen (26 Period)
baselineA = donchian(baselineA_prd)     // Base Line Period - Kijun-Sen (auxiliary)
leadingSpanA = avg(conversion, baseline)
leadingSpanB = donchian(leadingSpan_2prd)
laggingSpan = laggingSpan_src

// Color - bullish, bearish
col_cloud = leadingSpanA>=leadingSpanB ? color.green : color.red

// Cloud Lines
spanA = plot(ichiCloud_offset? leadingSpanA : na, offset=displ, title="Offset: Lead Line 1 - Senkou Span A cloud", color=color.green)
spanB = plot(ichiCloud_offset? leadingSpanB : na, offset=displ, title="Offset: Lead Line 2 - Senkou Span B cloud", color=color.red)
fill(spanA, spanB, color=col_cloud, transp=80, title="Offset: Ichimoku Cloud - Leading Span 1 & 2 based coloring")

// Other Lines
conversion_p = plot(ichiCloud_offset? conversion : na, title="Offset: Conversion Line - Tenkan-Sen", color=#0496ff)
standard_p = plot(ichiCloud_offset? baseline : na, title="Offset: Base Line - Kijun-Sen", color=#991515)
standardA_p = plot(ichiCloud_offset? baselineA : na, title="Offset: Base Line - Kijun-Sen (auxiliary)", color=color.teal)
lagging_Span_p = plot(ichiCloud_offset? laggingSpan : na, offset=-displ, title="Offset: Chikou Span (Lagging Span)", color=#459915)

// ------------------------------------------------------------------------------
// NO OFFSET:
conversion_noOffset = conversion[displ] // Conversion Line - Tenkan-Sen (9 Period)
baseline_noOffset  = baseline[displ]    // Base Line - Kijun-Sen (26 Period)
baselineA_noOffset = baselineA[displ]   // Base Line Period - Kijun-Sen (auxiliary)
leadingSpanA_noOffset = leadingSpanA[displ*2]
leadingSpanB_noOffset = leadingSpanB[displ*2]
laggingSpan_noOffset = laggingSpan[0]

// Color - bullish, bearish
col_cloud_noOffset = leadingSpanA_noOffset>=leadingSpanB_noOffset ? color.green : color.red

// Cloud Lines
spanA_noOffset = plot(ichiCloud_noOffset? leadingSpanA_noOffset : na, title="No offset: Lead Line 1 - Senkou Span A cloud", color=color.green, transp=0)
spanB_noOffset = plot(ichiCloud_noOffset? leadingSpanB_noOffset : na, title="No offset: Lead Line 2 - Senkou Span B cloud", color=color.red, transp=0)
fill(spanA_noOffset, spanB_noOffset, color=col_cloud_noOffset, transp=80, title="No offset: Ichimoku Cloud - Leading Span 1 & 2 based coloring")

// Other Lines
conversion_p_noOffset = plot(ichiCloud_noOffset? conversion_noOffset : na, title="No offset: Conversion Line - Tenkan-Sen", color=#0496ff, transp=0)
baseline_p_noOffset = plot(ichiCloud_noOffset? baseline_noOffset : na, title="No offset: Base Line - Kijun-Sen", color=#991515, transp=0)
baselineA_p_noOffset = plot(ichiCloud_noOffset? baselineA_noOffset : na, title="No offset: Base Line - Kijun-Sen (auxiliary)", color=color.teal, transp=0)
laggingSpan_p_noOffset = plot(ichiCloud_noOffset? laggingSpan_noOffset : na, title="No offset: Chikou Span (Lagging Span)", color=#459915, transp=0)

// ==============================================================================
// Conditions & Alerts (based on the lines without offset)

maxC = max(leadingSpanA_noOffset,leadingSpanB_noOffset)
minC = min(leadingSpanA_noOffset,leadingSpanB_noOffset)

// Trend start signals: crosses between Chikou Span (Lagging Span) and the Cloud (Senkou Span A, Senkou Span B)
uptrend_start   = crossover(laggingSpan_noOffset,maxC)
downtrend_start = crossunder(laggingSpan_noOffset,minC)

// Trends
uptrend   = laggingSpan_noOffset>maxC // Above Cloud
downtrend = laggingSpan_noOffset<minC // Below Cloud

// No trend: choppy trading - the price is in transition
notrend = maxC>=laggingSpan_noOffset and laggingSpan_noOffset>=minC

// Confirmations
uptrend_confirm   = crossover(leadingSpanA_noOffset,leadingSpanB_noOffset)
downtrend_confirm = crossunder(leadingSpanA_noOffset,leadingSpanB_noOffset)

// Signals - crosses between Conversion Line (Tenkan-Sen) and Base Line (Kijun-Sen)
bullish_signal = crossover(conversion_noOffset,baseline_noOffset)
bearish_signal = crossunder(conversion_noOffset,baseline_noOffset)

// Various alerts
alertcondition(uptrend_start,   title="Uptrend Started",   message="Uptrend Started")
alertcondition(downtrend_start, title="Downtrend Started", message="Downtrend Started")

alertcondition(uptrend_confirm,   title="Uptrend Confirmed",   message="Uptrend Confirmed")
alertcondition(downtrend_confirm, title="Downtrend Confirmed", message="Downtrend Confirmed")

alertcondition(bullish_signal, title="Buy Signal",  message="Buy Signal")
alertcondition(bearish_signal, title="Sell Signal", message="Sell Signal")

rsi_OBlevel = input(50, title="RSI Filter: Overbought level (0 = off)")
rsi_OSlevel = input(100,title="RSI Filter: Oversold level (100 = off)")
rsi_len = input(14,title="RSI Length")
rsi_src = input(close,title="RSI Price source")
rsi = rsi(rsi_src,rsi_len)

// Strategy -------------------------------
long_signal  = bullish_signal and uptrend   and rsi<=rsi_OSlevel // breakout filtered by the rsi
exit_long    = bearish_signal and uptrend
short_signal = bearish_signal and downtrend and rsi>=rsi_OBlevel // breakout filtered by the rsi
exit_short   = bullish_signal and downtrend

// Strategy alerts
alertcondition(long_signal, title="Long Signal - Uptrend",      message="Long Signal - Uptrend")
alertcondition(exit_long,   title="Long Exit Signal - Uptrend", message="Long Exit Signal - Uptrend")

alertcondition(short_signal, title="Long Signal - Downtrend",       message="Long Signal - Downtrend")
alertcondition(exit_short,   title="Short Exit Signal - Downtrend", message="Short Exit Signal - Downtrend")

// Plot areas for trend and transition
color_trend = uptrend? #00FF00 : downtrend? #FF0000 : notrend? color.new(#FFFFFF, 50) : na
fill(spanA_noOffset, spanB_noOffset, color=color_trend, transp=90, title="No offset: Ichimoku Cloud - Lagging Span & Cloud based coloring")

plotshape(ichiCloud_noOffset?uptrend_start:na, title="No offset: Uptrend Started", color=color.green, style=shape.circle, location=location.belowbar, size=size.tiny, text="Up")
plotshape(ichiCloud_noOffset?downtrend_start:na, title="No offset: Downtrend Started", color=color.red, style=shape.circle,location=location.abovebar, size=size.tiny, text="Down")

plotshape(ichiCloud_noOffset?uptrend_confirm:na, title="No offset: Uptrend Confirmed", color=color.green, style=shape.circle, location=location.belowbar, size=size.small, text="Confirm Up")
plotshape(ichiCloud_noOffset?downtrend_confirm:na, title="No offset: Downtrend Confirmed", color=color.red, style=shape.circle, location=location.abovebar, size=size.small, text="Confirm Down")

plotshape(ichiCloud_noOffset?long_signal:na, title="No offset: Long Signal", color=#00FF00, style=shape.triangleup, location=location.belowbar, size=size.small, text="Long")
plotshape(ichiCloud_noOffset?exit_long:na, title="No offset: Exit Long Signal", color=color.fuchsia, style=shape.triangledown, location=location.abovebar, size=size.small, text="Exit long")

plotshape(ichiCloud_noOffset?short_signal:na, title="No offset: Short Signal", color=#FF0000, style=shape.triangledown, location=location.abovebar, size=size.small, text="Short")
plotshape(ichiCloud_noOffset?exit_short:na, title="No offset: Exit Short Signal", color=color.fuchsia, style=shape.triangleup, location=location.belowbar, size=size.small, text="Exit short")

// ============================================================================== Strategy Component - uncomment to activate
if (long_signal)
    strategy.entry("Long",strategy.long)
if (exit_long)
    strategy.close("Long")
// if (short_signal)
//    strategy.entry("Short",strategy.short)
// if (exit_short)
//    strategy.close("Short")
// ==============================================================================


//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © colinmck


RSI_Period = input(10, title='RSI Length')
SF = input(5, title='RSI Smoothing')
QQE = input(2.438, title='Fast QQE Factor')
ThreshHold = input(10, title="Thresh-hold")

src = close
Wilders_Period = RSI_Period * 3 - 1

Rsi = rsi(src, RSI_Period)
RsiMa = ema(Rsi, SF)
AtrRsi = abs(RsiMa[1] - RsiMa)
MaAtrRsi = ema(AtrRsi, Wilders_Period)
dar = ema(MaAtrRsi, Wilders_Period) * QQE

longband = 0.0
shortband = 0.0
trend = 0

DeltaFastAtrRsi = dar
RSIndex = RsiMa
newshortband = RSIndex + DeltaFastAtrRsi
newlongband = RSIndex - DeltaFastAtrRsi
longband := RSIndex[1] > longband[1] and RSIndex > longband[1] ? max(longband[1], newlongband) : newlongband
shortband := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? min(shortband[1], newshortband) : newshortband
cross_1 = cross(longband[1], RSIndex)
trend := cross(RSIndex, shortband[1]) ? 1 : cross_1 ? -1 : nz(trend[1], 1)
FastAtrRsiTL = trend == 1 ? longband : shortband

// Find all the QQE Crosses

QQExlong = 0
QQExlong := nz(QQExlong[1])
QQExshort = 0
QQExshort := nz(QQExshort[1])
QQExlong := FastAtrRsiTL < RSIndex ? QQExlong + 1 : 0
QQExshort := FastAtrRsiTL > RSIndex ? QQExshort + 1 : 0

//Conditions

qqeLong = QQExlong == 1 ? FastAtrRsiTL[1] - 50 : na
qqeShort = QQExshort == 1 ? FastAtrRsiTL[1] - 50 : na

// Plotting

plotshape(qqeLong, title="QQE long", text="Long", textcolor=color.white, style=shape.labelup, location=location.belowbar, color=color.green, transp=0, size=size.tiny)
plotshape(qqeShort, title="QQE short", text="Short", textcolor=color.white, style=shape.labeldown, location=location.abovebar, color=color.red, transp=0, size=size.tiny)

// Alerts

alertcondition(qqeLong, title="Long", message="Long")
alertcondition(qqeShort, title="Short", message="Short")

```

> Detail

https://www.fmz.com/strategy/442269

> Last Modified

2024-02-20 16:46:56
