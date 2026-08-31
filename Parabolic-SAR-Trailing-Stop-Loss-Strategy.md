
> Name

Parabolic-SAR-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description




## Overview

The Parabolic SAR trailing stop loss strategy is a trading strategy based on the Parabolic SAR indicator. It aims to identify trend reversal points and exit positions in a timely manner when the trend reverses.

## Strategy Logic

The Parabolic SAR indicator can identify price trends and give potential reversal signals. When the SAR dot crosses above the candlestick, it represents a change from bullish to bearish; when the SAR dot crosses below the candlestick, it represents a change from bearish to bullish.

Based on this feature of the Parabolic SAR indicator, this strategy identifies trend reversals when the SAR dot crosses the candlestick, and makes corresponding long or short entries. Specifically, the strategy logic is as follows:

1. Calculate the Parabolic SAR values. 

2. Determine if there is a trend reversal signal. If the SAR dot crosses from above to below the candlestick, it represents a bearish signal, go short; if the SAR dot crosses from below to above the candlestick, it represents a bullish signal, go long.

3. Enter a position when the crossover occurs, and exit the position with a stop loss when the SAR dot crosses the candlestick in the opposite direction again.

## Advantages

- Utilizes the Parabolic SAR indicator to identify trend reversal points, avoiding trading against the trend.

- Enters positions quickly when reversal signals are identified, capturing trend changes.

- Sets stop loss at the SAR crossover point for quick stops and timely loss control.

- Simple and clear strategy logic, easy to implement.

## Risks and Mitigation

- The Parabolic SAR indicator can generate many false signals, causing unnecessary trades. Fine tune SAR parameters to reduce false signals.

- Prone to being whipsawed in fast reversing markets. Consider adding filters to avoid high volatility periods.

- Stop loss too close may result in excessive stops. Allow some wiggle room in the stop loss range. 

- Reliance on a single indicator makes the strategy susceptible to market-specific limitations. Consider combining with other indicators or filters to improve robustness.

## Conclusion

The Parabolic SAR trailing stop loss strategy utilizes the trend identification capability of the Parabolic SAR indicator to quickly stop out and reverse direction when trends reverse. The strategy logic is simple and clear. However, reliance on only the Parabolic SAR indicator has limitations. In practice, market conditions should be considered, parameters tuned accordingly, and other technical indicators combined to improve performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Parabolic SAR Strategy (on close) [QuantNomad]", shorttitle="SAR Strategy [QN]", overlay=true)

start     = input(0.02)
increment = input(0.02)
maximum   = input(0.2)

psar      = 0.0 // PSAR
af        = 0.0 // Acceleration Factor
trend_dir = 0   // Current direction of PSAR
ep        = 0.0 // Extreme point

sar_long_to_short = trend_dir[1] == 1  and close <= psar[1] // PSAR switches from long to short
sar_short_to_long = trend_dir[1] == -1 and close >= psar[1] // PSAR switches from short to long

trend_change = barstate.isfirst[1] or sar_long_to_short or sar_short_to_long

// Calculate trend direction
trend_dir    := barstate.isfirst[1] and close[1] > open[1] ? 1 : 
   barstate.isfirst[1] and close[1] <= open[1] ? -1 : 
   sar_long_to_short ? -1 : 
   sar_short_to_long ?  1 : nz(trend_dir[1])

// Calculate  Acceleration Factor
af := trend_change ? start : 
   (trend_dir == 1 and high > ep[1]) or  
   (trend_dir == -1 and low < ep[1]) ? 
   min(maximum, af[1] + increment) : 
   af[1]

// Calculate extreme point
ep := trend_change and trend_dir == 1 ? high :  
   trend_change and trend_dir == -1 ? low : 
   trend_dir == 1 ? max(ep[1], high) : 
   min(ep[1], low)

// Calculate PSAR
psar := barstate.isfirst[1] and close[1] > open[1] ? low[1] : 
   barstate.isfirst[1] and close[1] <= open[1] ? high[1] : 
   trend_change ? ep[1] :    
   trend_dir == 1 ? psar[1] + af * (ep - psar[1]) : psar[1] - af * (psar[1] - ep) 

plot(psar, style=plot.style_cross, color=trend_dir == 1 ? color.green : color.red,  linewidth = 2)

// Strategy 
strategy.entry("Long",  true,  when = sar_short_to_long)
strategy.entry("Short", false, when = sar_long_to_short)
```

> Detail

https://www.fmz.com/strategy/426993

> Last Modified

2023-09-16 18:54:28
