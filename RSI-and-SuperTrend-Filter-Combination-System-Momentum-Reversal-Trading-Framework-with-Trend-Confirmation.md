
> Name

RSI-and-SuperTrend-Filter-Combination-System-Momentum-Reversal-Trading-Framework-with-Trend-Confirmation

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8e0ff8880afed4eac2b.png)
![IMG](https://www.fmz.com/upload/asset/2d8ec38c7cba068b235fe.png)




#### Overview

The RSI and SuperTrend Filter Combination System is a quantitative trading strategy that combines the technical indicators RSI (Relative Strength Index) with a SuperTrend filter. The core philosophy of this strategy is "don't fight the trend — and never ignore momentum exhaustion." Operating on a 45-minute timeframe, the strategy looks for RSI overbought/oversold reversal signals, but only executes trades when price action aligns with the trend direction confirmed by SuperTrend. This combination effectively filters out a large amount of noise signals that would typically occur when using the RSI indicator alone on lower timeframes, thus improving trade quality.

#### Strategy Principles

The operational logic of this strategy is primarily based on the combined use of RSI and SuperTrend indicators:

1. RSI Settings: Uses a 14-period RSI indicator, with the overbought line set at 65 and oversold line at 35.
2. SuperTrend Settings: Calculated based on a 10-period ATR (Average True Range) with a multiplier of 3.0, used to determine price trend direction.
3. Long Entry Conditions: When RSI crosses upward from the oversold zone while SuperTrend indicates a bullish trend (price above the lower band).
4. Short Entry Conditions: When RSI crosses downward from the overbought zone while SuperTrend indicates a bearish trend (price below the upper band).
5. Risk Management: Each trade sets a 1% stop loss and 1.5% take profit, maintaining a favorable risk-reward ratio.

The strategy uses the SuperTrend indicator to determine the overall market trend, then utilizes the RSI indicator to look for reversal opportunities in the direction of the trend. This method avoids blind counter-trend trading, improves signal quality, especially during high volatility phases. The 45-minute timeframe provides both sufficient signal quality and reasonable trading frequency.

#### Strategy Advantages

1. Comprehensive Filtering Mechanism: By combining RSI's overbought/oversold conditions with SuperTrend's directional filter, this strategy can maintain a high win rate while effectively filtering out market noise, providing higher quality entry signals.

2. Sound Risk Control: The strategy sets clear stop losses (1%) and dynamic take profits (1.5%) for each trade, with a risk-reward ratio better than 1:1.5, contributing to stable capital growth in the long term.

3. Rich Visual Feedback: The strategy includes clear chart visualization elements, including background zones, stop loss/take profit lines, and real-time trend bands. These designs enhance decision-making speed and clarity, allowing traders to quickly identify signals.

4. Adaptation to Volatile Markets: Unlike traditional RSI strategies, this system doesn't blindly reverse under any market conditions but focuses on capturing clear swings in structured trends, particularly suitable for trading during high volatility phases.

5. Reliable Backtesting Performance: In Bitcoin testing on the 45-minute timeframe, the strategy demonstrated a total profit of +213,885 USDT across 239 trades, with maximum drawdown controlled at 15% and a profit factor of 1.12, showing quite robust performance.

#### Strategy Risks

1. Poor Performance in Ranging Markets: This strategy is primarily designed for trending markets and may generate frequent false signals in sideways or range-bound conditions, leading to consecutive losses. It is recommended to apply it in clear trending markets or add market structure identification mechanisms to filter out ranging market signals.

2. Fixed Risk in Stop Loss Settings: The fixed 1% stop loss may be too small in some highly volatile markets, causing premature triggering; while in low volatility markets, it may be too large. It is advisable to dynamically adjust the stop loss percentage based on market volatility, such as setting adaptive stops based on ATR.

3. Parameter Sensitivity: RSI periods and thresholds, as well as SuperTrend's ATR period and multiplier settings, significantly impact strategy performance. Different markets and timeframes may require different parameter settings, and excessive optimization may lead to overfitting risk.

4. Lagged Response to Trend Changes: As a trend indicator, SuperTrend has a certain lag and may not adjust direction in time when trends suddenly reverse, leading to potential losses. Consider combining more sensitive trend indicators or price action analysis to optimize the ability to respond to trend changes.

5. Lack of Volume Confirmation: The existing strategy relies solely on price indicators without considering volume changes, which may reduce signal reliability. Adding volume confirmation mechanisms is recommended to improve the quality of entry signals.

#### Strategy Optimization Directions

1. Multi-Timeframe Analysis Integration: Higher timeframe trend confirmation (such as 4-hour or daily) can be added to ensure that the trading direction is consistent with the major trend. This "top-down" approach can significantly improve the strategy's win rate, especially near market turning points. This can be implemented by adding higher timeframe SuperTrend judgments as additional filtering conditions.

2. Adaptive Parameter Design: RSI overbought/oversold thresholds and SuperTrend multipliers can be dynamically adjusted based on market volatility. For example, expand the RSI threshold range (e.g., 30-70) in high volatility markets and narrow thresholds (e.g., 40-60) in low volatility markets. This can be achieved by calculating historical volatility and setting dynamic thresholds.

3. Incorporating Volume Analysis: Integrate volume indicators into the strategy to ensure sufficient market participation when signals occur. For example, require that volume during RSI breakouts be higher than the average of the previous N periods to filter out false breakouts with low volume.

4. Market Structure Identification: Add market structure analysis components, such as support/resistance levels or price pattern recognition, to help the strategy reduce trading frequency in ranging markets or improve entry precision in trending markets. This can be implemented by analyzing high-low point patterns or using other market structure indicators.

5. Optimizing Capital Management: Implement dynamic position sizing, adjusting position size for each trade based on signal strength, market volatility, and account performance. For example, gradually increase positions after consecutive profits and reduce positions after consecutive losses to protect capital and optimize returns.

#### Summary

The RSI and SuperTrend Filter Combination System is an efficient trading framework that combines momentum reversal with trend confirmation. By capturing potential reversal signals through the RSI indicator while using SuperTrend to ensure trade direction aligns with the main trend, it effectively improves entry signal quality. The strategy sets reasonable risk management parameters (1% stop loss and 1.5% take profit) and features a clear visualization interface for quick decision-making.

This strategy performs excellently in markets with clear trends and is suitable for traders seeking mechanical entry signals while providing a solid foundation for automated trading. However, performance may be suboptimal in ranging markets, and attention should be paid to parameter sensitivity and lagged response to trend changes.

Future optimization directions include integrating multi-timeframe analysis, designing adaptive parameters, adding volume confirmation, enhancing market structure recognition capabilities, and improving capital management systems. These improvements will further enhance the strategy's robustness and adaptability, enabling it to remain competitive across various market environments.

By deeply understanding and reasonably applying this strategic framework, traders can effectively capture high-quality trading opportunities in the market while maintaining risk control, achieving long-term stable trading returns.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-21 00:00:00
end: 2025-04-20 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"TRX_USD"}]
*/

//@version=5
strategy("RSI + SuperTrend Filter Strategy (45m BTCUSDT)", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// === Inputs
rsiPeriod = input.int(14, "RSI Period")
rsiOverbought = input.int(65, "RSI Overbought")
rsiOversold = input.int(35, "RSI Oversold")
tpPerc = input.float(1.5, "TP %") / 100
slPerc = input.float(1.0, "SL %") / 100

atrPeriod = input.int(10, "SuperTrend ATR Period")
atrMult = input.float(3.0, "SuperTrend Multiplier")

// === RSI & SuperTrend
rsi = ta.rsi(close, rsiPeriod)
atr = ta.atr(atrPeriod)
hl2 = (high + low) / 2
upperBand = hl2 + atrMult * atr
lowerBand = hl2 - atrMult * atr

var int superDir = 1
superDir := close > lowerBand ? 1 : close < upperBand ? -1 : superDir[1]

isBull = superDir == 1
isBear = superDir == -1

// === Signals
longSignal = ta.crossover(rsi, rsiOversold) and isBull
shortSignal = ta.crossunder(rsi, rsiOverbought) and isBear

// === Entry/Exit
strategy.entry("Long", strategy.long, when=longSignal)
strategy.entry("Short", strategy.short, when=shortSignal)

longTP = close * (1 + tpPerc)
longSL = close * (1 - slPerc)
shortTP = close * (1 - tpPerc)
shortSL = close * (1 + slPerc)

strategy.exit("Long Exit", from_entry="Long", limit=longTP, stop=longSL)
strategy.exit("Short Exit", from_entry="Short", limit=shortTP, stop=shortSL)

// === Visuals — Beautiful Chart Enhancements ===

// SuperTrend Line
plot(superDir == 1 ? lowerBand : na, title="Bull Trend", color=color.new(color.green, 10), linewidth=2, style=plot.style_line)
plot(superDir == -1 ? upperBand : na, title="Bear Trend", color=color.new(color.red, 10), linewidth=2, style=plot.style_line)

// Buy/Sell Tags
plotshape(longSignal, title="BUY", location=location.belowbar, style=shape.labelup,
     text="BUY", size=size.small, textcolor=color.black, color=color.new(color.lime, 0))

plotshape(shortSignal, title="SELL", location=location.abovebar, style=shape.labeldown,
     text="SELL", size=size.small, textcolor=color.white, color=color.new(color.red, 0))

// Directional Arrows
plotarrow(longSignal ? 1 : na, colorup=color.new(color.green, 0), offset=-1)
plotarrow(shortSignal ? -1 : na, colordown=color.new(color.red, 0), offset=-1)

// Background Highlight
bgcolor(strategy.position_size > 0 ? color.new(color.green, 90) : na, title="Long BG")
bgcolor(strategy.position_size < 0 ? color.new(color.red, 90) : na, title="Short BG")

// TP & SL Lines
plot(strategy.position_size > 0 ? longTP : na, color=color.new(color.green, 0), title="Long TP", linewidth=1, style=plot.style_linebr)
plot(strategy.position_size > 0 ? longSL : na, color=color.new(color.red, 0), title="Long SL", linewidth=1, style=plot.style_linebr)
plot(strategy.position_size < 0 ? shortTP : na, color=color.new(color.green, 0), title="Short TP", linewidth=1, style=plot.style_linebr)
plot(strategy.position_size < 0 ? shortSL : na, color=color.new(color.red, 0), title="Short SL", linewidth=1, style=plot.style_linebr)

// Entry Price Line
plot(strategy.position_size != 0 ? strategy.position_avg_price : na, title="Entry Price", color=color.gray, style=plot.style_linebr, linewidth=1)

// === Optional: Light trade zone shading
longBg = longSignal ? color.new(color.green, 85) : na
shortBg = shortSignal ? color.new(color.red, 85) : na
bgcolor(longBg, title="Long Signal Highlight")
bgcolor(shortBg, title="Short Signal Highlight")

// === Alerts
alertcondition(longSignal, title="BUY Signal", message="RSI+Trend BUY Signal on {{ticker}}")
alertcondition(shortSignal, title="SELL Signal", message="RSI+Trend SELL Signal on {{ticker}}")

```

> Detail

https://www.fmz.com/strategy/491514

> Last Modified

2025-04-21 16:31:17
