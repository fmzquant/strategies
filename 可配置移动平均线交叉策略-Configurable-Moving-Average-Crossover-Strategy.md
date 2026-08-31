
> Name

可配置移动平均线交叉策略-Configurable-Moving-Average-Crossover-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d94ff2d1e4058cfa19a7.png)
![IMG](https://www.fmz.com/upload/asset/2d9207f2eee89e6ae03eb.png)






#### Overview

This article introduces a flexible and powerful moving average crossover trading strategy that allows traders to customize moving average parameters and types based on different market conditions. The core of the strategy is to use moving averages of different periods and types for trend tracking and signal generation.

#### Strategy Principles

The strategy generates trading signals by calculating three moving averages of different periods (fast, slow, and exit lines). The main principles include:

1. Moving Average Type Selection: Supports Simple Moving Average (SMA), Exponential Moving Average (EMA), Weighted Moving Average (WMA), and Hull Moving Average (HMA).
2. Entry Conditions:
   - Long Entry: Close price above fast MA, fast MA above slow MA, and close price above exit MA
   - Short Entry: Close price below fast MA, fast MA below slow MA, and close price below exit MA
3. Exit Conditions:
   - Long Exit: After at least two bars, close price below exit MA
   - Short Exit: After at least two bars, close price above exit MA

#### Strategy Advantages

1. High Configurability: Traders can flexibly adjust moving average periods and types
2. Multi-Market Adaptability: Applicable to different liquidity instruments by adjusting parameters
3. Strong Trend Tracking Capability: Uses multiple moving averages to filter false signals
4. Risk Control: Default position management of 10% of account equity
5. Flexible Trading Direction: Option to enable or disable short trading

#### Strategy Risks

1. Parameter Sensitivity: Different markets may require different moving average parameters
2. Performance in Trending Markets: May generate more invalid signals in range-bound markets
3. Transaction Costs: Default setting of 0.06% commission needs consideration in actual trading
4. Backtesting Limitations: Currently validated only on a few instruments (e.g., BTCUSD and NIFTY)

#### Strategy Optimization Directions

1. Dynamic Parameter Adjustment: Introduce adaptive moving average periods
2. Combine with Other Technical Indicators: Add RSI, MACD for signal filtering
3. Stop Loss Mechanism: Add volatility-based stop loss strategy
4. Multi-Timeframe Verification: Comprehensive backtesting across different time periods
5. Machine Learning Optimization: Use algorithms to automatically find optimal parameter combinations

#### Summary

The Configurable Moving Average Crossover Strategy (MA-X) provides a flexible trend-tracking framework. Through reasonable configuration and continuous optimization, this strategy can become a powerful tool in the quantitative trading toolbox. Traders need to make personalized adjustments based on specific market characteristics and conduct thorough backtesting and verification.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-03 00:00:00
end: 2025-04-02 00:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"BNB_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © YetAnotherTA

//@version=6
strategy("Configurable MA Cross (MA-X) Strategy", "MA-X", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10, commission_type = strategy.commission.percent, commission_value = 0.06)

// === Inputs ===
// Moving Average Periods
maPeriodA = input.int(13, title="Fast MA")
maPeriodB = input.int(55, title="Slow MA")
maPeriodC = input.int(34, title="Exit MA")

// MA Type Selection
maType = input.string("EMA", title="MA Type", options=["SMA", "EMA", "WMA", "HMA"])

// Toggle for Short Trades (Disabled by Default)
enableShorts = input.bool(false, title="Enable Short Trades", tooltip="Enable or disable short positions")

// === Function to Select MA Type ===
getMA(src, length) =>
    maType == "SMA" ? ta.sma(src, length) : maType == "EMA" ? ta.ema(src, length) : maType == "WMA" ? ta.wma(src, length) : ta.hma(src, length)

// === MA Calculation ===
maA = getMA(close, maPeriodA)
maB = getMA(close, maPeriodB)
maC = getMA(close, maPeriodC)

// === Global Variables for Crossover Signals ===
var bool crossAboveA = false
var bool crossBelowA = false

crossAboveA := ta.crossover(close, maA)
crossBelowA := ta.crossunder(close, maA)

// === Bar Counter for Exit Control ===
var int barSinceEntry = na

// Reset the counter on new entries
if (strategy.opentrades == 0)
    barSinceEntry := na

// Increment the counter on each bar
if (strategy.opentrades > 0)
    barSinceEntry := (na(barSinceEntry) ? 1 : barSinceEntry + 1)

// === Entry Conditions ===
goLong = close > maA and maA > maB and close > maC and crossAboveA
goShort = enableShorts and close < maA and maA < maB and close < maC and crossBelowA  // Shorts only when toggle is enabled

// === Exit Conditions (only after 1+ bar since entry) ===
exitLong = (strategy.position_size > 0) and (barSinceEntry >= 2) and (close < maC)
exitShort = enableShorts and (strategy.position_size < 0) and (barSinceEntry >= 2) and (close > maC)

// === Strategy Execution ===
// Long entry logic
if (goLong)
    strategy.close("Short")         // Close any short position
    strategy.entry("Long", strategy.long)
    alert("[MA-X] Go Long")
    barSinceEntry := 1               // Reset the bar counter

// Short entry logic (only if enabled)
if (enableShorts and goShort)
    strategy.close("Long")          // Close any long position
    strategy.entry("Short", strategy.short)
    alert("[MA-X] Go Short")
    barSinceEntry := 1               // Reset the bar counter

// Exit logic (only after at least 1 bar has passed)
if (exitLong)
    strategy.close("Long")
    alert("[MA-X] Exit Long")

if (enableShorts and exitShort)
    strategy.close("Short")
    alert("[MA-X] Exit Short")

// === Plotting ===
plot(maA, color=color.green, linewidth=2, title="Fast MA")
plot(maB, color=color.blue, linewidth=2, title="Slow MA")
plot(maC, color=color.red, linewidth=2, title="Exit MA")
```

> Detail

https://www.fmz.com/strategy/489300

> Last Modified

2025-04-03 11:31:33
