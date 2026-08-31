
> Name

Cross-Momentum-Trend-Following-Strategy-SMA-RSI-Cross-Momentum-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8925a4f64925ddeff82.png)
![IMG](https://www.fmz.com/upload/asset/2d8e6c36eb8bf59b3176d.png)

## Overview

The Cross-Momentum Trend Following Strategy is a simple yet effective trading system that cleverly combines two technical indicators - Simple Moving Average (SMA) and Relative Strength Index (RSI) - to form an automated buy and sell signal generation system. The strategy utilizes price crossovers with the 20-period SMA as the primary signal trigger condition, while incorporating RSI momentum confirmation to filter out low-quality trading signals. The strategy also includes a performance tracking module that monitors success and failure rates in real-time, providing traders with decision-making reference.

## Strategy Principles

The core principle of this strategy is to capture trend reversal points through price and moving average crossovers, while using the RSI momentum indicator for signal confirmation:

1. **Buy Condition**: When price crosses above the 20-period SMA and the RSI value is greater than 60, the system generates a buy signal. This condition combines two dimensions: price breaking above the moving average indicates a potential uptrend formation, while an RSI value above 60 confirms the presence of upward momentum.

2. **Sell Condition**: When price crosses below the 20-period SMA and the RSI value is less than 40, the system generates a sell signal. Similarly, this condition identifies potential trend reversals and confirms downward momentum through the sub-40 RSI value.

3. **Performance Tracking Mechanism**: The strategy has a built-in trade performance monitoring system that tracks the following metrics:
   - Total Signal Count: Records the number of all generated buy signals
   - Success Count: Number of times price rises more than 2% after buying
   - Failure Count: Number of times price falls below the buy candle's low within 7 periods

4. **Visualization**: The strategy marks buy and sell points on the chart with "B" (Buy) and "S" (Sell), and displays performance statistics in real-time through a table.

## Strategy Advantages

1. **Simplicity and Efficiency**: Uses only two common technical indicators (SMA and RSI) to build a complete trading system, reducing the risk of over-optimization and overfitting.

2. **Dual Confirmation Mechanism**: Combines trend indicator (SMA) and momentum indicator (RSI), improving signal reliability. Price must not only break through the moving average but also have sufficient momentum to trigger a trade.

3. **High Degree of Automation**: The strategy completely automates the generation of buy and sell signals, reducing emotional interference and is suitable for systematic traders.

4. **Built-in Performance Evaluation**: Real-time tracking of key performance metrics allows traders to objectively assess strategy performance and timely adjust parameters or exit underperforming strategies.

5. **Risk Control Awareness**: By monitoring price behavior within 7 periods after buying, it helps identify potential stop-loss points and cultivates risk management awareness.

6. **Intuitive Visualization**: Through chart markers and performance tables, traders can intuitively understand strategy execution, facilitating backtesting analysis and strategy improvement.

## Strategy Risks

1. **False Breakout Risk**: Despite using RSI for filtering, the strategy may still produce numerous false breakout signals in consolidating markets, leading to frequent trading and unnecessary transaction costs.

2. **Parameter Sensitivity**: Strategy performance highly depends on the choice of SMA period (20) and RSI period (8) and their thresholds (60/40). These fixed parameters may perform poorly in different market environments or instruments.

3. **Lack of Adaptability**: The strategy lacks market environment identification capability, performing well in trending markets but potentially losing frequently in oscillating markets.

4. **Simple Stop-Loss Mechanism**: Although the strategy tracks failure cases, it does not actually implement dynamic stop-loss functionality, potentially leading to excessive losses in volatile markets.

5. **Lack of Position Management**: The strategy uses fixed position entry and exit, without adjusting position size based on market volatility or signal strength, failing to optimize capital utilization.

6. **Performance Evaluation Limitations**: Success is defined as a 2% price increase, which may not be applicable to all market environments; highly volatile instruments may require higher thresholds.

## Strategy Optimization Directions

1. **Adding Market Environment Filters**: Introduce volatility indicators (such as ATR) or trend strength indicators (such as ADX) to help identify market states, reducing trading frequency in oscillating markets or adjusting parameters accordingly.

2. **Parameter Adaptive Mechanism**: Implement dynamic adjustment of SMA and RSI parameters, automatically optimizing periods and thresholds based on recent market performance to improve strategy adaptability.

3. **Optimize Position Management**: Design a dynamic position allocation system based on signal strength (such as RSI deviation), market volatility, or account risk to control single trade risk.

4. **Improve Stop-Loss Mechanism**: Implement ATR-based dynamic stop-loss or trailing stop-loss functionality for more refined control of individual trade risk.

5. **Add Time Filters**: Consider market time factors, avoiding trading during abnormally volatile periods or low liquidity periods to improve signal quality.

6. **Multi-timeframe Confirmation**: Add multi-timeframe analysis, requiring larger timeframe trend direction to be consistent with the trading direction, filtering out trades against the major trend.

7. **Optimize Performance Evaluation**: Improve the definition of success/failure, considering more comprehensive evaluation metrics such as risk-adjusted returns or return/risk ratios.

## Summary

The Cross-Momentum Trend Following Strategy is a concise and practical trading system that effectively filters out some low-quality signals by combining SMA and RSI indicators to identify trend turning points while confirming momentum. This strategy is particularly suitable for investors new to quantitative trading, providing clear trading signals while incorporating performance tracking functionality to help traders objectively evaluate strategy performance.

Although relatively simple in design, the strategy embodies important principles in quantitative trading: trend following, signal confirmation, and performance monitoring. Through the suggested optimization directions, such as market environment filtering, parameter adaptation, and improved stop-loss mechanisms, traders can significantly enhance the robustness and adaptability of the strategy while maintaining its core logic.

These simple strategies combining classic technical indicators often prove more reliable and viable than complex algorithms, especially when they incorporate risk management and performance evaluation mechanisms. For traders seeking entry-level quantitative strategies, this is an ideal starting point, providing practical experience while laying the foundation for subsequent strategy development.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-07-05 00:00:00
end: 2025-02-23 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

//@version=5
strategy("STOCKS TO BUY", overlay=true, fill_orders_on_standard_ohlc=true)

// Define 20-period SMA
sma20 = ta.sma(close, 20)

// RSI Calculation (8-period)
rsiValue = ta.rsi(close, 8)

// Buy Condition: Close crosses above 20-SMA and RSI > 60
buyCondition = ta.crossover(close, sma20) and rsiValue > 60

// Sell Condition: Close crosses below 20-SMA and RSI < 40
sellCondition = ta.crossunder(close, sma20) and rsiValue < 40

// Tracking Performance Metrics
var int totalSignals = 0  // Total number of 'B' signals
var int successCount = 0  // Times price rose >2% from 'B' candle close
var int failureCount = 0  // Times price fell below 'B' candle low within 7 bars

// Store entry price and low when signal occurs
var float entryPrice = na
var float entryLow = na
var int barCounter = na  // Bar counter for tracking 7-candle window

if buyCondition
    strategy.entry("Buy", strategy.long)
    totalSignals := totalSignals + 1  // Increment 'B' count
    entryPrice := close
    entryLow := low
    barCounter := 0  // Reset counter when new 'B' signal appears

if sellCondition
    strategy.close("Buy")  // Close the buy position on sell signal

// Monitor for 7 candles only
if not na(barCounter)
    barCounter := barCounter + 1

    // Check for Success (Price rises >2%)
    success = high >= entryPrice * 1.02
    if success
        successCount := successCount + 1
        entryPrice := na  // Reset entry price after success

    // Check for Failure (Price falls below entryLow within 7 candles)
    failure = low < entryLow and barCounter <= 7
    if failure
        failureCount := failureCount + 1
        entryLow := na  // Reset entry low after failure

    // Stop tracking after 7 candles
    if barCounter > 7
        barCounter := na

// Plot 'B' on chart when buy condition is met
plotshape(series=buyCondition, location=location.belowbar, color=color.green, style=shape.labelup, text="B")

// Plot 'S' on chart when sell condition is met
plotshape(series=sellCondition, location=location.abovebar, color=color.red, style=shape.labeldown, text="S")

// Display Performance Metrics Table
var table performanceTable = table.new(position=position.top_right, columns=2, rows=4, bgcolor=color.gray, border_width=1)

if bar_index % 10 == 0  // Update table every 10 bars for efficiency
    table.cell(performanceTable, 0, 0, "Metric", text_color=color.white, bgcolor=color.blue)
    table.cell(performanceTable, 1, 0, "Value", text_color=color.white, bgcolor=color.blue)
    
    table.cell(performanceTable, 0, 1, "Total 'B' Signals", text_color=color.white)
    table.cell(performanceTable, 1, 1, str.tostring(totalSignals), text_color=color.white)

    table.cell(performanceTable, 0, 2, "Price Rose >2%", text_color=color.white)
    table.cell(performanceTable, 1, 2, str.tostring(successCount), text_color=color.green)

    table.cell(performanceTable, 0, 3, "Price Fell Below 'B' Low (7 bars)", text_color=color.white)
    table.cell(performanceTable, 1, 3, str.tostring(failureCount), text_color=color.red)

```

> Detail

https://www.fmz.com/strategy/483674

> Last Modified

2025-02-25 10:44:04
