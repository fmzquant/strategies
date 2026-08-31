
> Name

Trend-Following-Dual-EMA-Crossover-Strategy-with-SMA-Trend-Filtering-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8743e88586f0e22b480.png)
![IMG](https://www.fmz.com/upload/asset/2d98af12c002226a558e3.png)




#### Overview
This strategy is a quantitative trading system that combines moving average (MA) crossovers with trend following. It utilizes a 15-period Simple Moving Average (SMA) as a trend filter, while using the crossover of 9-period and 21-period Exponential Moving Averages (EMA) to generate trading signals. The strategy employs strict entry conditions and a fixed 1:4 risk-reward ratio for risk management.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. Trend Confirmation: Uses 15-period SMA as the primary trend indicator. Price above 15 SMA indicates uptrend, while below indicates downtrend.
2. Trading Signals: Triggers trades through 9 EMA and 21 EMA crossovers. Long signals are generated when 9 EMA crosses above 21 EMA with other conditions met; short signals when 9 EMA crosses below 21 EMA with conditions met.
3. Confirmation Conditions: Long entries require two consecutive bullish candles with both EMAs above 15 SMA; short entries require a bearish candle with both EMAs below 15 SMA.
4. Risk Management: System automatically calculates stop-loss and profit targets using a 1:4 risk-reward ratio.

#### Strategy Advantages
1. Strong Trend Following Capability: The 15 SMA trend filtering mechanism effectively avoids trading in ranging or counter-trend markets.
2. Multiple Confirmation Mechanism: Combines moving average crossovers, candlestick patterns, and trend confirmation to reduce false signals.
3. Comprehensive Risk Management: Fixed risk-reward ratio and automatic stop-loss/profit targets support long-term stability.
4. Clear Visual Feedback: System provides clear visual indicators including trade signal markers and stop-loss/profit target levels.

#### Strategy Risks
1. Lag Risk: Moving averages are inherently lagging indicators, potentially slow to react to rapid market reversals.
2. False Breakout Risk: May generate false crossover signals in ranging markets.
3. Fixed Risk Ratio Limitations: The 1:4 fixed risk-reward ratio may not suit all market conditions.
4. Consecutive Loss Risk: May experience consecutive stops in choppy markets.

#### Strategy Optimization Directions
1. Dynamic Period Optimization: Automatically adjust moving average periods based on market volatility.
2. Volatility Filtering: Add ATR or other volatility indicators to optimize entry timing.
3. Dynamic Risk Management: Adjust risk-reward ratio based on market conditions.
4. Enhanced Market Context: Incorporate trend strength indicators to optimize trading conditions.

#### Summary
This is a well-designed, logically rigorous trend following strategy. Through the combination of multiple technical indicators and strict risk management, the strategy demonstrates good practicality. While inherent risks exist, the suggested optimization directions can further enhance strategy stability and profitability. The strategy is particularly suitable for trending markets and recommended for medium to long-term timeframes.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2024-12-19 00:00:00
period: 4d
basePeriod: 4d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("EMA Crossover Strategy with 15 SMA Trend", overlay=true, margin_long=100, margin_short=100)

// Calculate Indicators
sma15 = ta.sma(close, 15)
ema9 = ta.ema(close, 9)
ema21 = ta.ema(close, 21)

// Trend Detection
uptrend = close > sma15
downtrend = close < sma15

// Crossover Conditions
goldenCross = ta.crossover(ema9, ema21)
deathCross = ta.crossunder(ema9, ema21)

// Candle Conditions
twoBullish = (close > open) and (close[1] > open[1])
bearishCandle = (close < open)

// Entry Conditions
longCondition = goldenCross and uptrend and twoBullish and (ema9 > sma15) and (ema21 > sma15)
shortCondition = deathCross and downtrend and bearishCandle and (ema9 < sma15) and (ema21 < sma15)

// Risk Management
var float longStop = na
var float longTarget = na
var float shortStop = na
var float shortTarget = na

if longCondition
    longStop := low
    longTarget := close + 4*(close - longStop)
    strategy.entry("Long", strategy.long)
    strategy.exit("Long Exit", "Long", stop=longStop, limit=longTarget)

if shortCondition
    shortStop := high
    shortTarget := close - 4*(shortStop - close)
    strategy.entry("Short", strategy.short)
    strategy.exit("Short Exit", "Short", stop=shortStop, limit=shortTarget)

// Visual Elements
plot(sma15, "15 SMA", color=color.orange)
plot(ema9, "9 EMA", color=color.blue)
plot(ema21, "21 EMA", color=color.red)

// Plot trading levels
plot(longCondition ? longStop : na, "Long Stop", color=color.red, style=plot.style_linebr)
plot(longCondition ? longTarget : na, "Long Target", color=color.green, style=plot.style_linebr)
plot(shortCondition ? shortStop : na, "Short Stop", color=color.red, style=plot.style_linebr)
plot(shortCondition ? shortTarget : na, "Short Target", color=color.green, style=plot.style_linebr)

// Signal Markers
plotshape(longCondition, "Buy", shape.triangleup, location.belowbar, color=color.green, size=size.small)
plotshape(shortCondition, "Sell", shape.triangledown, location.abovebar, color=color.red, size=size.small)
```

> Detail

https://www.fmz.com/strategy/483123

> Last Modified

2025-02-21 14:35:29
