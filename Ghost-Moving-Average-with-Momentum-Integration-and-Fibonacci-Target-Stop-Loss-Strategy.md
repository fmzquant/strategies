
> Name

Ghost-Moving-Average-with-Momentum-Integration-and-Fibonacci-Target-Stop-Loss-Strategy

> Author

ianzeng123

> Strategy Description

#### Overview
This strategy is a comprehensive trading system that combines multiple technical indicators, primarily integrating the Ghost Moving Average (GMA), Momentum Oscillator, and Fibonacci retracement levels to construct a complete trading framework. The strategy uses the Ghost Moving Average to determine market trend direction, combines the momentum indicator to verify signal strength, and employs Fibonacci levels to automatically set target prices and stop-loss points, achieving automated risk management. Additionally, the strategy includes a real-time trading dashboard that provides traders with key information and decision support.

#### Strategy Principles
1. **Ghost Moving Average (GMA)**: This is the core component of the strategy, providing more sensitive price trend signals than traditional moving averages through a special calculation method. The specific formula is: first calculate twice the half-period weighted moving average (WMA) minus the full-period weighted moving average, then apply another weighted moving average with a period equal to the square root of the original period to the result.

2. **Momentum Indicator**: The strategy uses the difference between the current price and the price from a specific period ago to measure market momentum, smooths it using an exponential moving average (EMA), and then normalizes it through standard deviation, making the momentum signal more stable and reliable.

3. **Trend Determination**: Market trend is determined by calculating the slope of the Ghost Moving Average, with a positive slope indicating an uptrend and a negative slope indicating a downtrend.

4. **Fibonacci Target Prices and Stop-Loss**: The strategy calculates Fibonacci levels based on the highest and lowest prices within the lookback period, using 0.618, 1.0, and 1.618 as target prices, and 0.382 as the stop-loss level.

5. **Entry Conditions**:
   - Long Entry: Price crosses above the Ghost Moving Average and normalized momentum is positive
   - Short Entry: Price crosses below the Ghost Moving Average and normalized momentum is negative

#### Strategy Advantages
1. **Dual Confirmation of Trend and Momentum**: By combining the Ghost Moving Average and momentum indicator, the strategy can effectively reduce false signals, triggering trading signals only when both indicators meet their conditions simultaneously.

2. **Adaptive Risk Management**: Using Fibonacci levels to automatically set target prices and stop-loss points, this method adjusts automatically based on market volatility, providing appropriate risk-reward ratios under different market conditions.

3. **Visual Trading Dashboard**: The built-in trading dashboard intuitively displays key information such as trend status, trading signals, entry reasons, target prices, and stop-loss levels, helping traders make quick decisions.

4. **Adaptation to Market Volatility**: The Ghost Moving Average is more sensitive to price changes compared to traditional moving averages, enabling faster identification of trend changes and reducing lag.

5. **Clear Trading Rules**: The strategy provides clear entry and exit conditions, reducing subjective judgment and helping traders maintain discipline.

#### Strategy Risks
1. **Overtrading Risk**: In oscillating markets, prices may frequently cross the Ghost Moving Average, leading to excessive trading signals. The solution is to add additional filtering conditions, such as only trading in clear trends or increasing signal confirmation periods.

2. **Stop-Loss Setting Risk**: Fixed-ratio Fibonacci stop-losses may not be flexible enough in highly volatile markets, potentially leading to stop-losses that are either too loose or too tight. It is recommended to dynamically adjust Fibonacci ratios based on different market conditions.

3. **Parameter Sensitivity**: Strategy performance is highly dependent on the setting of multiple parameters, such as GMA length and momentum period. Different markets and timeframes may require different parameter combinations. Backtesting is recommended to find optimal parameters.

4. **Trend Determination Delay**: Although the Ghost Moving Average is more sensitive than traditional moving averages, there is still some delay, potentially missing some opportunities in the early stages of a trend. Consider combining shorter-period indicators to detect trend changes earlier.

5. **Backtesting Bias**: The strategy's Fibonacci levels are calculated based on historical data, potentially introducing forward bias. This should be noted in actual trading, and more dynamic methods for calculating key levels should be considered.

#### Strategy Optimization Directions
1. **Adaptive Parameter Optimization**: Currently, the strategy uses fixed parameter settings. An adaptive mechanism could be introduced to automatically adjust GMA length and momentum period based on market volatility, maintaining optimal performance under different market conditions.

2. **Multi-Timeframe Analysis**: Add analysis of multiple timeframes, executing trades only when signals across multiple timeframes are consistent, which can significantly improve signal quality and success rate.

3. **Dynamic Take-Profit Targets**: The current strategy uses fixed Fibonacci levels as target prices. Consider dynamically adjusting target prices based on market volatility or implementing a trailing stop-profit strategy to maximize profit potential.

4. **Volume Analysis**: Incorporate volume indicators to verify the validity of price trends, trading only when both price and volume confirm, which can reduce false breakout signals.

5. **Machine Learning Enhancement**: Introduce machine learning algorithms to optimize entry conditions and parameter selection, training models through historical data to predict the best trading opportunities and risk management strategies.

6. **Sentiment Indicator Integration**: Add market sentiment indicators, such as volatility indices or other derivative indicators, to adjust strategy behavior under extreme market conditions and enhance risk management capabilities.

#### Summary
The Ghost Moving Average with Momentum Integration and Fibonacci Target/Stop-Loss Strategy is a comprehensive technical analysis trading system that provides a systematic trading framework by combining multiple indicators and techniques. The core advantages of this strategy lie in the dual confirmation mechanism of trend and momentum, as well as the adaptive risk management system based on market volatility. Although there are some inherent risks, such as parameter sensitivity and potential overtrading, the proposed optimization directions can significantly improve the strategy's robustness and effectiveness. For investors seeking systematic trading methods, this is a worthwhile strategy framework, especially in clearly trending markets. Through continuous optimization and adaptation to different market conditions, this strategy can become a powerful tool in a trader's toolkit.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-02 00:00:00
end: 2025-04-01 00:00:00
period: 3d
basePeriod: 3d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Ghost MA + Momentum + Fib TP/SL + Dashboard", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// === INPUTS ===
src = input(close, "Source")
gmaLength = input.int(20, "GMA Length")
momentumLength = input.int(20, "Momentum Length")
momentumSmoothing = input.int(10, "Momentum Smoothing")
swingLookback = input.int(50, "Fibonacci Swing Lookback")

// === GHOST MOVING AVERAGE ===
gma = ta.wma(2 * ta.wma(src, gmaLength / 2) - ta.wma(src, gmaLength), math.round(math.sqrt(gmaLength)))
plot(gma, title="Ghost MA", color=color.teal, linewidth=2)

// === MOMENTUM GHOST OSCILLATOR ===
momentum = src - src[momentumLength]
smoothMomentum = ta.ema(momentum, momentumSmoothing)
normalizedMomentum = smoothMomentum / ta.stdev(momentum, momentumLength)

// === MARKET TREND ===
gmaSlope = gma - gma[1]
marketTrend = gmaSlope > 0 ? "UPTREND" : "DOWNTREND"

// === SWING POINTS FOR FIBONACCI ===
highestHigh = ta.highest(high, swingLookback)
lowestLow = ta.lowest(low, swingLookback)
fibRange = highestHigh - lowestLow
entryPrice = close

// === FIBONACCI TP/SL LEVELS ===
tp1_long = entryPrice + (fibRange * 0.618)
tp2_long = entryPrice + (fibRange * 1.0)
tp3_long = entryPrice + (fibRange * 1.618)
sl_long  = entryPrice - (fibRange * 0.382)

tp1_short = entryPrice - (fibRange * 0.618)
tp2_short = entryPrice - (fibRange * 1.0)
tp3_short = entryPrice - (fibRange * 1.618)
sl_short  = entryPrice + (fibRange * 0.382)

// === STRATEGY CONDITIONS ===
longCond = ta.crossover(src, gma) and normalizedMomentum > 0
shortCond = ta.crossunder(src, gma) and normalizedMomentum < 0

if (longCond)
    strategy.entry("Long", strategy.long)
    strategy.exit("TP/SL Long", from_entry="Long", limit=tp1_long, stop=sl_long)

if (shortCond)
    strategy.entry("Short", strategy.short)
    strategy.exit("TP/SL Short", from_entry="Short", limit=tp1_short, stop=sl_short)

// === SIGNAL LABELS ON CHART ===
if (longCond)
    label.new(bar_index, low, "BUY\n" + str.tostring(close, "#.##"), style=label.style_label_up, color=color.green, textcolor=color.white, size=size.small)

if (shortCond)
    label.new(bar_index, high, "SELL\n" + str.tostring(close, "#.##"), style=label.style_label_down, color=color.red, textcolor=color.white, size=size.small)

// === ALERT CONDITIONS ===
alertcondition(longCond, title="Buy Signal", message="Buy Signal Triggered: GMA Cross Up + Momentum Positive")
alertcondition(shortCond, title="Sell Signal", message="Sell Signal Triggered: GMA Cross Down + Momentum Negative")

// === DASHBOARD ===
var table dash = table.new(position.top_right, 1, 8, border_width=1)

if bar_index % 5 == 0
    signal = longCond ? "BUY" : shortCond ? "SELL" : "WAIT"
    reason = longCond ? "GMA↑ & Momentum+" : shortCond ? "GMA↓ & Momentum−" : "No Clear Signal"
    timeframe = timeframe.period

    sigColor = signal == "BUY" ? color.new(color.green, 20) : signal == "SELL" ? color.new(color.red, 20) : color.new(color.gray, 60)
    trendColor = marketTrend == "UPTREND" ? color.new(color.green, 80) : color.new(color.red, 80)

    table.cell(dash, 0, 0, "? GHOST TRADING DASHBOARD", text_color=color.black, bgcolor=color.lime, text_size=size.large)
    table.cell(dash, 0, 1, "Trend: " + marketTrend, text_color=color.black, bgcolor=trendColor, text_size=size.normal)
    table.cell(dash, 0, 2, "Timeframe: " + timeframe, text_color=color.black, bgcolor=color.purple, text_size=size.normal)
    table.cell(dash, 0, 3, "Signal: " + signal + " @ " + str.tostring(close, "#.##"), text_color=color.black, bgcolor=sigColor, text_size=size.normal)
    table.cell(dash, 0, 4, "Reason: " + reason, text_color=color.black, bgcolor=color.new(color.yellow, 60), text_size=size.normal)
    table.cell(dash, 0, 5, signal == "BUY" ? "TP1: " + str.tostring(tp1_long, "#.##") + 
                 " | TP2: " + str.tostring(tp2_long, "#.##") + 
                 " | TP3: " + str.tostring(tp3_long, "#.##")
                 : signal == "SELL" ? "TP1: " + str.tostring(tp1_short, "#.##") + 
                 " | TP2: " + str.tostring(tp2_short, "#.##") + 
                 " | TP3: " + str.tostring(tp3_short, "#.##") : "-", 
                 text_color=color.black, bgcolor=color.new(color.green, 80), text_size=size.normal)
    table.cell(dash, 0, 6, "Reentry: " + str.tostring(gma, "#.##"), text_color=color.black, bgcolor=color.new(color.orange, 80), text_size=size.normal)
    table.cell(dash, 0, 7, signal == "BUY" ? "SL: " + str.tostring(sl_long, "#.##") : signal == "SELL" ? "SL: " + str.tostring(sl_short, "#.##") : "-", text_color=color.black, bgcolor=color.new(color.red, 70), text_size=size.normal)

```

> Detail

https://www.fmz.com/strategy/489187

> Last Modified

2025-04-02 15:33:54
