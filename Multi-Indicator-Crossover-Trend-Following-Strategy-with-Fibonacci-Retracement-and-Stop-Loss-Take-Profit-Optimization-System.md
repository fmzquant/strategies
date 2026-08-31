
> Name

Multi-Indicator-Crossover-Trend-Following-Strategy-with-Fibonacci-Retracement-and-Stop-Loss-Take-Profit-Optimization-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d93cae6659ef298c2bd8.png)
![IMG](https://www.fmz.com/upload/asset/2d893771a6cec0a72d966.png)

#### Overview
This strategy is a comprehensive trading system that combines Exponential Moving Average (EMA) crossover, Fibonacci retracement levels, trend determination, and stop-loss/take-profit mechanisms. The strategy generates trading signals based on the crossover of 9-period and 21-period EMAs, optimizes entry points using Fibonacci retracement levels, and enhances accuracy through real-time trend monitoring. The system also incorporates percentage-based stop-loss and take-profit mechanisms for effective risk control.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. A long signal is generated when the fast EMA (9-period) crosses above the slow EMA (21-period)
2. A short signal is generated when the fast EMA crosses below the slow EMA
3. Fibonacci retracement levels at 23.6%, 38.2%, 50%, and 61.8% are calculated using the highest and lowest prices over 100 periods
4. Current trend status is determined by the relationship between closing price and fast EMA
5. The system automatically sets fixed percentage-based take-profit (4%) and stop-loss (2%) levels upon trade execution

#### Strategy Advantages
1. Multi-dimensional signal confirmation: Combines EMA crossover, Fibonacci levels, and trend status for more reliable trading signals
2. Comprehensive risk management: Achieves automated risk control through preset stop-loss and take-profit percentages
3. Strong trend-following capability: EMA crossover combined with trend status effectively captures market trends
4. Clear visual feedback: Displays key price levels, trend status, and trading signals through labels for better decision-making
5. High systematization: Clear trading logic reduces interference from subjective judgments

#### Strategy Risks
1. Oscillation market risk: Frequent EMA crossovers during consolidation phases may generate false signals
2. Lag risk: Moving averages are inherently lagging indicators, potentially missing optimal entry points
3. Fixed stop-loss risk: Preset fixed percentage stops may not suit all market conditions
4. Signal conflict risk: Multiple indicators may generate contradictory signals, complicating decision-making
5. Market volatility risk: Extreme volatility may lead to inappropriate stop-loss levels

#### Strategy Optimization Directions
1. Dynamic stop-loss optimization: Adjust stop-loss distances based on ATR or market volatility
2. Enhanced signal filtering: Add volume, momentum, and other auxiliary indicators to filter false signals
3. Parameter adaptation: Introduce adaptive mechanisms to dynamically adjust EMA periods based on market conditions
4. Entry optimization: Optimize entries near Fibonacci levels by incorporating price patterns and volume
5. Position management improvement: Design dynamic position sizing system based on volatility and account risk

#### Summary
This strategy builds a relatively complete trading system by integrating multiple classic technical analysis tools. Its strengths lie in multi-dimensional signal confirmation and systematic risk management, though optimization for different market environments is still necessary. Traders are advised to optimize parameters according to specific market conditions when implementing the strategy in live trading, while maintaining vigilance toward risks.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BNB_USDT"}]
*/

//@version=5
strategy("EMA Cross Strategy with TP, SL, Fibonacci Levels, and Trend", overlay=true)

// Input for stop loss and take profit percentages
stopLossPercentage = input.int(2, title="Stop Loss (%)") // Stop loss percentage
takeProfitPercentage = input.int(4, title="Take Profit (%)") // Take profit percentage

// EMA Length Inputs
fastEMALength = input.int(9, title="Fast EMA Length")
slowEMALength = input.int(21, title="Slow EMA Length")

// Compute EMAs
fastEMA = ta.ema(close, fastEMALength)
slowEMA = ta.ema(close, slowEMALength)

// Entry conditions for EMA crossover
longCondition = ta.crossover(fastEMA, slowEMA)  // EMA 9 crosses above EMA 21
shortCondition = ta.crossunder(fastEMA, slowEMA) // EMA 9 crosses below EMA 21

// Plot EMAs
plot(fastEMA, color=color.blue, title="Fast EMA (9)")
plot(slowEMA, color=color.red, title="Slow EMA (21)")

// Fibonacci Retracement Levels
lookback = input.int(100, title="Lookback Period for Fibonacci Levels")
highLevel = ta.highest(high, lookback)
lowLevel = ta.lowest(low, lookback)

fib236 = lowLevel + (highLevel - lowLevel) * 0.236
fib382 = lowLevel + (highLevel - lowLevel) * 0.382
fib50 = lowLevel + (highLevel - lowLevel) * 0.5
fib618 = lowLevel + (highLevel - lowLevel) * 0.618

// Display Fibonacci levels (Left of the candle near price)
label.new(bar_index, fib236, text="Fib 23.6%: " + str.tostring(fib236, "#.##"), style=label.style_label_left, color=color.purple, textcolor=color.white, size=size.small)
label.new(bar_index, fib382, text="Fib 38.2%: " + str.tostring(fib382, "#.##"), style=label.style_label_left, color=color.blue, textcolor=color.white, size=size.small)
label.new(bar_index, fib50, text="Fib 50%: " + str.tostring(fib50, "#.##"), style=label.style_label_left, color=color.green, textcolor=color.white, size=size.small)
label.new(bar_index, fib618, text="Fib 61.8%: " + str.tostring(fib618, "#.##"), style=label.style_label_left, color=color.red, textcolor=color.white, size=size.small)

// Trend condition: Price uptrend or downtrend
trendCondition = close > fastEMA ? "Uptrending" : close < fastEMA ? "Downtrending" : "Neutral"

// Display Trend Status (Left of candle near price)
var label trendLabel = na
if (not na(trendLabel))
    label.delete(trendLabel)
trendLabel := label.new(bar_index, close, text="Trend: " + trendCondition, style=label.style_label_left, color=color.blue, textcolor=color.white, size=size.small)

// Buy and Sell orders with Stop Loss and Take Profit
if (longCondition)
    stopLossLevel = close * (1 - stopLossPercentage / 100)
    takeProfitLevel = close * (1 + takeProfitPercentage / 100)
    strategy.entry("BUY", strategy.long)
    strategy.exit("Sell", "BUY", stop=stopLossLevel, limit=takeProfitLevel)
    
    // Display TP, SL, and Buy label (Left of candle near price)
    label.new(bar_index, takeProfitLevel, text="TP\n" + str.tostring(takeProfitLevel, "#.##"), style=label.style_label_left, color=color.green, textcolor=color.white, size=size.small)
    label.new(bar_index, stopLossLevel, text="SL\n" + str.tostring(stopLossLevel, "#.##"), style=label.style_label_left, color=color.red, textcolor=color.white, size=size.small)
    label.new(bar_index, close, text="BUY\n" + str.tostring(close, "#.##"), style=label.style_label_left, color=color.blue, textcolor=color.white, size=size.small)

if (shortCondition)
    stopLossLevel = close * (1 + stopLossPercentage / 100)
    takeProfitLevel = close * (1 - takeProfitPercentage / 100)
    strategy.entry("SELL", strategy.short)
    strategy.exit("Cover", "SELL", stop=stopLossLevel, limit=takeProfitLevel)
    
    // Display TP, SL, and Sell label (Left of candle near price)
    label.new(bar_index, takeProfitLevel, text="TP\n" + str.tostring(takeProfitLevel, "#.##"), style=label.style_label_left, color=color.green, textcolor=color.white, size=size.small)
    label.new(bar_index, stopLossLevel, text="SL\n" + str.tostring(stopLossLevel, "#.##"), style=label.style_label_left, color=color.red, textcolor=color.white, size=size.small)
    label.new(bar_index, close, text="SELL\n" + str.tostring(close, "#.##"), style=label.style_label_left, color=color.orange, textcolor=color.white, size=size.small)

// Plot Buy/Sell Signals
plotshape(series=longCondition, title="BUY Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition, title="SELL Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

```

> Detail

https://www.fmz.com/strategy/482889

> Last Modified

2025-02-20 16:43:42
