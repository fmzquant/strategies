
> Name

一目均衡云无偏移RSI过滤策略No-Offset-Ichimoku-Cloud-with-RSI-Filter-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/af846716fea1ada703.png)

## Overview

This is a trend following strategy that utilizes the Ichimoku Cloud indicator for trend identification and the RSI indicator for signal filtering. The strategy uses the non-offset Ichimoku Cloud to capture trend changes in a timely manner and filters fake breakouts with RSI to control trading risks.

## Strategy Logic  

The strategy primarily relies on the Ichimoku Cloud indicator to determine the trend direction. The Ichimoku Cloud consists of the conversion line, base line, leading span 1, leading span 2, and lagging span. The strategy uses the non-offset Ichimoku Cloud, meaning the lines like conversion line and base line adopt future figures to avoid lagging trend identification due to observation offset.

The strategy first checks if the price breaks through the cloud lines. An upward trend is identified when the lagging span crosses above the cloud, while a downward trend is identified when the lagging span crosses below the cloud. After trend starts, the strategy keeps tracking the price's relationship with the cloud to determine the persistent trend direction. The uptrend remains intact when the lagging span is above the cloud, and vice versa.

In addition to trend identification, the strategy also generates buy and sell signals when the conversion line and base line have golden cross and death cross. These trading signals are only accepted when they align with the trend direction. For example, the golden cross between conversion line and base line is only considered during an uptrend. 

Finally, the RSI indicator is used to filter the trading signals. Only buy signals with RSI below the oversold level and sell signals with RSI above the overbought level are accepted. This helps filter out false breakouts to some extent.

## Advantage Analysis

- The non-offset Ichimoku Cloud can timely identify trend changes without missing reversal opportunities

- Multiple conditions work together to effectively filter out false breakout signals

- RSI avoids undesirable market entry under overbought and oversold situations 

- The strategy is optimized with future data in mind and can also achieve good results in live trading

## Risk Analysis

- Using future data may cause errors and needs code optimization before live trading

- The Ichimoku Cloud is sensitive to parameters and requires parameter tuning for different products

- Better results when trading a single product. Needs to consider inter-market correlation with multiple products

- Many trend identification rules require adequate backtesting periods for validation

Parameters can be optimized to find the best combination. Can consider trading specific products or reduce position sizes to control risks in live trading. Stop loss strategies may also be introduced to limit the loss per trade.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Optimize Ichimoku Cloud parameters to find the best settings for different trading products

2. Add stop loss strategies to limit the loss per trade to an acceptable level

3. Introduce position sizing strategies to manage overall risk exposure precisely 

4. Add more technical indicators like volatility and volume for comprehensive signal verification

5. Optimize entry techniques like confirmation or pullback entries for better execution

6. Perform walk-forward optimization to determine the optimal Bollinger Bands lookback period based on product characteristics

## Conclusion

In summary, this is quite a robust trend following strategy. It adopts the Ichimoku Cloud for trend identification and the conversion line/base line crosses for trade signals, filtered by RSI. There is still much room for optimization via parameter tuning, stop loss, position sizing etc. The logic is clear and easy to understand. It considers both trend and risks. This is a strategy worth verifying in live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Standard Ichimoku Cloud|
|v_input_2|true|Ichimoku Cloud - no offset - no repaint|
|v_input_3|9|Conversion Line Period - Tenkan-Sen|
|v_input_4|26|Base Line Period - Kijun-Sen|
|v_input_5|52|Base Line Period - Kijun-Sen (auxiliary)|
|v_input_6|52|Lagging Span 2 Periods - Senkou Span B|
|v_input_7|26|Displacement: (-) Chikou Span; (+) Senkou Span A|
|v_input_8|true|Displacement: additional bars|
|v_input_9_close|0|Lagging Span price source - Chikou-Span: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|50|RSI Filter: Overbought level (0 = off)|
|v_input_11|100|RSI Filter: Oversold level (100 = off)|
|v_input_12|14|RSI Length|
|v_input_13_close|0|RSI Price source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-31 00:00:00
end: 2023-02-20 00:00:00
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
  currency = currency.USD, initial_capital = 10000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100,
  calc_on_every_tick = true, calc_on_order_fills = true, commission_type = strategy.commission.percent, commission_value = 0.075)
// ==============================================================================

// ------------------------------------------------------------------------------

ichiCloud_offset   = input(false, title="Standard Ichimoku Cloud")                  // with the visual offset
ichiCloud_noOffset = input(true,  title="Ichimoku Cloud - no offset - no repaint")  // without the visual offset

conversion_prd = input(9, minval=1, title="Conversion Line Period - Tenkan-Sen")
baseline_prd   = input(26, minval=1, title="Base Line Period - Kijun-Sen")
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
if (short_signal)
    strategy.entry("Short",strategy.short)
if (exit_short)
    strategy.close("Short")
// ==============================================================================

```

> Detail

https://www.fmz.com/strategy/431397

> Last Modified

2023-11-07 15:31:06
