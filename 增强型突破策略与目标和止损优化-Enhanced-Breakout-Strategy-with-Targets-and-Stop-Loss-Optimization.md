
> Name

增强型突破策略与目标和止损优化-Enhanced-Breakout-Strategy-with-Targets-and-Stop-Loss-Optimization

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b6f58518d69928fd99.png)


#### Overview

This Enhanced Breakout Strategy is a trading system based on price breakouts of key levels, combined with dynamic target and stop-loss settings. The strategy determines breakout levels by observing the highest and lowest prices of the initial few candles and executes trades when the price breaks through these levels. The strategy's uniqueness lies in its dynamic profit targets and stop-loss settings, which are based on the actual entry price rather than preset fixed price levels.

#### Strategy Principle

The core principle of this strategy is to capture momentum after price breaks through important levels. It first observes the highest and lowest prices of the initial few candles (set by the user), then adds or subtracts a certain percentage from these prices to set upper and lower breakout levels. When the price breaks through these levels, the strategy opens long or short positions accordingly.

Each trade has dynamic target and stop-loss prices. These prices are calculated based on percentages of the actual entry price, rather than fixed price levels. This approach ensures that the risk-reward ratio remains consistent for each trade, regardless of the entry price.

The strategy also includes an important safety mechanism: once a breakout occurs and a position is opened, no new trade signals will be triggered until that position is closed. This helps prevent overtrading in volatile markets.

#### Strategy Advantages

1. Dynamic Adaptability: By using the initial few candles to set breakout levels, the strategy can adapt to different market environments and volatility.

2. Risk Management: Dynamically set stop-loss and target prices ensure a consistent risk-reward ratio for each trade, contributing to long-term stability.

3. Overtrading Protection: The mechanism allowing only one trade at a time helps reduce the risk of noise trades and overtrading.

4. Flexibility: Multiple parameters of the strategy allow traders to adjust according to specific needs and market conditions.

5. Clear Entry and Exit Rules: Well-defined breakout levels and exit conditions make the strategy easy to understand and execute.

#### Strategy Risks

1. False Breakouts: In oscillating markets, multiple false breakouts may occur, leading to consecutive small losses.

2. Slippage Risk: In markets with poor liquidity, actual execution prices may differ significantly from signal prices.

3. Market Environment Dependency: The strategy performs well in trending markets but may underperform in ranging markets.

4. Parameter Sensitivity: The strategy's performance is highly dependent on parameter settings; inappropriate parameters may lead to overtrading or missing important opportunities.

5. Lack of Trend Following Ability: Fixed profit targets may result in early exits during strong trends.

#### Strategy Optimization Directions

1. Introduce Trend Filters: Consider adding indicators such as moving averages or ADX to ensure trading only in the direction of the main trend.

2. Dynamic Parameter Adjustment: Dynamically adjust breakout percentages and target/stop-loss percentages based on market volatility (e.g., using the ATR indicator).

3. Multi-Timeframe Analysis: Incorporate analysis from higher timeframes to improve the quality of trading signals.

4. Add Volume Confirmation: Consider volume changes when triggering trade signals to increase signal reliability.

5. Implement Partial Profit Taking: Consider closing positions in parts after reaching certain profit levels to protect profits while capturing larger upside potential.

#### Summary

This Enhanced Breakout Strategy provides a flexible and powerful trading framework, particularly suitable for capturing significant price movements. Its dynamic risk management approach and clear trading rules make it a potentially robust trading system. However, like all trading strategies, it also faces some inherent risks and limitations. Through continuous optimization and adaptation to market conditions, traders can further improve the effectiveness and stability of this strategy. When applying this strategy in live trading, it is recommended to conduct thorough backtesting and simulated trading, and make appropriate parameter adjustments based on individual risk tolerance and market experience.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-08-26 00:00:00
end: 2024-09-24 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Enhanced Breakout Strategy with Targets and Stop Loss", overlay=true)

// Input parameters using input.float() for percentage inputs
percentage_up = input.float(0.09, title="Percentage Up", step=0.01) / 100
percentage_down = input.float(0.09, title="Percentage Down", step=0.01) / 100
target_percentage = input.float(0.45, title="Target Percentage", step=0.01) / 100
stop_loss_percentage = input.float(0.18, title="Stop Loss Percentage", step=0.01) / 100

// Use input.int() for initial candles
initial_candles = input.int(5, title="Number of Initial Candles")

// Initialize variables
var float highest_high = na
var float lowest_low = na
var float upper_level = na
var float lower_level = na
var bool breakout_occurred = false

// Track the high and low for the first `initial_candles`
if (bar_index < initial_candles)
    highest_high := na(highest_high) ? high : math.max(highest_high, high)
    lowest_low := na(lowest_low) ? low : math.min(lowest_low, low)

// Ensure calculations are done after the first `initial_candles` are formed
if (bar_index >= initial_candles) 
    upper_level := highest_high * (1 + percentage_up)
    lower_level := lowest_low * (1 - percentage_down)

// Plot the breakout levels
plot(upper_level, color=color.green, title="Upper Level", linewidth=2, style=plot.style_line)
plot(lower_level, color=color.red, title="Lower Level", linewidth=2, style=plot.style_line)

// Trading Conditions
long_condition = not breakout_occurred and close > upper_level
short_condition = not breakout_occurred and close < lower_level

// Execute trades based on conditions
if (long_condition)
    strategy.entry("Long", strategy.long)
    breakout_occurred := true
    // Exit using position_avg_price for accurate target and stop-loss
    strategy.exit("Exit Long", from_entry="Long", limit=strategy.position_avg_price * (1 + target_percentage), stop=strategy.position_avg_price * (1 - stop_loss_percentage))
    
if (short_condition)
    strategy.entry("Short", strategy.short)
    breakout_occurred := true
    // Exit using position_avg_price for accurate target and stop-loss
    strategy.exit("Exit Short", from_entry="Short", limit=strategy.position_avg_price * (1 - target_percentage), stop=strategy.position_avg_price * (1 + stop_loss_percentage))

// Reset breakout after the trade is closed
if (strategy.opentrades == 0)
    breakout_occurred := false

// Alerts
alertcondition(long_condition, title="Long Signal", message="Breakout above upper level: Consider a long trade!")
alertcondition(short_condition, title="Short Signal", message="Breakout below lower level: Consider a short trade!")

```

> Detail

https://www.fmz.com/strategy/468340

> Last Modified

2024-09-26 16:30:30
