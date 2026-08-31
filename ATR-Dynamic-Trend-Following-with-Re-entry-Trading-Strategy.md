
> Name

ATR-Dynamic-Trend-Following-with-Re-entry-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

#### Overview
This is a trend-following strategy that dynamically adjusts using ATR, combining moving averages and ATR indicators to determine entry and exit points. The strategy's core feature is using ATR to dynamically adjust moving average bands, entering long positions when price breaks above the upper band, and setting stop-loss and take-profit levels based on ATR multiples. Additionally, the strategy includes an innovative re-entry mechanism allowing new positions when price retraces to the entry point.

#### Strategy Principles
The strategy operates based on the following key elements:
1. Uses ATR-adjusted moving averages as trend indicators, forming dynamic upper and lower bands
2. Generates long entry signals when price breaks above the upper band, with entry price at current close
3. Sets stop-loss at 2×ATR below entry price
4. Sets take-profit at (5+custom multiplier)×ATR above entry price
5. Automatically re-enters positions if price retraces to original entry level after stop-loss or take-profit
6. Implements 30-bar maximum display limit for optimized chart visualization

#### Strategy Advantages
1. Strong Dynamic Adaptability: ATR-adjusted moving averages self-adapt to market volatility changes
2. Scientific Risk Management: Stop-loss and take-profit levels dynamically set based on ATR, matching market volatility characteristics
3. Innovative Re-entry Mechanism: Allows re-entry at favorable price levels, increasing profit opportunities
4. Excellent Visualization: Provides clear entry, stop-loss, and take-profit line displays for trade monitoring
5. Flexible Parameters: Adjustable trend period and take-profit multiplier through input parameters

#### Strategy Risks
1. Trend Reversal Risk: Frequent stop-losses possible in ranging markets
2. Re-entry Risk: Consecutive stop-losses possible when re-entering at previous entry points
3. Slippage Risk: Actual execution prices may deviate from signal prices during high volatility
4. Parameter Sensitivity: Optimal parameters may vary significantly across different market conditions
5. Computational Load: Real-time calculation of multiple technical indicators may increase system load

#### Strategy Optimization Directions
1. Implement Market Environment Filters: Add volatility filters to adjust parameters or pause trading during high volatility
2. Optimize Re-entry Logic: Consider stricter conditions for re-entry, such as trend confirmation indicators
3. Enhance Profit Taking: Implement trailing stops to protect more profits in trending markets
4. Add Time Filters: Implement trading time restrictions to avoid low liquidity periods
5. Improve Calculation Efficiency: Reduce unnecessary calculations and plotting to enhance strategy performance

#### Summary
This is a well-designed, logically clear trend-following strategy with good market adaptability through ATR dynamic adjustment. The re-entry mechanism is an innovative feature that can provide additional profit opportunities under favorable market conditions. While there are some risk factors to consider, the suggested optimization directions can further enhance the strategy's stability and profitability. For investors seeking systematic trading methods, this represents a worthwhile basic strategy framework.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-16 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("KON SET By Sai", overlay=true, max_lines_count=40)

// INPUTS
length = input.int(10, "Trend Length")
target_multiplier = input.int(0, "Set Targets") // Target adjustment
max_bars = 30  // Number of bars to display the lines after signal

// VARIABLES
var bool inTrade = false
var float entryPrice = na
var float stopLoss = na
var float targetPrice = na
var int barCount = na  // Counter to track how many bars have passed since signal

// ATR for stop-loss and target calculation
atr_value = ta.sma(ta.atr(200), 200) * 0.8

// Moving averages for trend detection
sma_high = ta.sma(high, length) + atr_value
sma_low = ta.sma(low, length) - atr_value

// Signal conditions for trend changes
signal_up = ta.crossover(close, sma_high)
signal_down = ta.crossunder(close, sma_low)

// Entry conditions
if not inTrade and signal_up
    entryPrice := close
    stopLoss := close - atr_value * 2
    targetPrice := close + atr_value * (5 + target_multiplier)
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", "Long", stop=stopLoss, limit=targetPrice)
    inTrade := true
    barCount := 0  // Reset bar count when signal occurs

// Exit conditions
if inTrade and (close <= stopLoss or close >= targetPrice)
    inTrade := false
    entryPrice := na
    stopLoss := na
    targetPrice := na
    barCount := na  // Reset bar count on exit

// Re-entry logic
if not inTrade and close == entryPrice
    entryPrice := close
    stopLoss := close - atr_value * 2
    targetPrice := close + atr_value * (5 + target_multiplier)
    strategy.entry("Re-Long", strategy.long)
    strategy.exit("Re-Exit Long", "Re-Long", stop=stopLoss, limit=targetPrice)
    inTrade := true
    barCount := 0  // Reset bar count when re-entry happens

// Count bars since the signal appeared (max 30 bars)
if inTrade and barCount < max_bars
    barCount := barCount + 1

// Plotting lines for entry, stop-loss, and targets (Only during active trade and within max_bars)
entry_line = plot(inTrade and barCount <= max_bars ? entryPrice : na, title="Entry Price", color=color.new(color.green, 0), linewidth=1, style=plot.style_cross)
sl_line = plot(inTrade and barCount <= max_bars ? stopLoss : na, title="Stop Loss", color=color.new(color.red, 0), linewidth=1, style=plot.style_cross)
target_line = plot(inTrade and barCount <= max_bars ? targetPrice : na, title="Target Price", color=color.new(color.blue, 0), linewidth=1, style=plot.style_cross)

// Background color between entry and target/stop-loss (Only when inTrade and within max_bars)
fill(entry_line, target_line, color=color.new(color.green, 90), title="Target Zone")
fill(entry_line, sl_line, color=color.new(color.red, 90), title="Stop-Loss Zone")

// Label updates (reduce overlap and clutter)
if bar_index % 50 == 0 and inTrade and barCount <= max_bars  // Adjust label frequency for performance
    label.new(bar_index + 1, entryPrice, text="Entry: " + str.tostring(entryPrice, "#.##"), style=label.style_label_left, color=color.green, textcolor=color.white, size=size.small)
    label.new(bar_index + 1, stopLoss, text="Stop Loss: " + str.tostring(stopLoss, "#.##"), style=label.style_label_left, color=color.red, textcolor=color.white, size=size.small)
    label.new(bar_index + 1, targetPrice, text="Target: " + str.tostring(targetPrice, "#.##"), style=label.style_label_left, color=color.blue, textcolor=color.white, size=size.small)

```

> Detail

https://www.fmz.com/strategy/482457

> Last Modified

2025-02-18 15:11:28
