
> Name

Dynamic-Support-and-Resistance-Adaptive-Pivot-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/75219dacf044c42c2c.png)

#### Overview
This strategy is an adaptive trading system based on dynamic identification of support and resistance levels using price pivot points. It determines key price levels by calculating local highs and lows in real-time and executes trades accordingly. The core strength lies in its dynamic nature, allowing it to adjust trading parameters based on changing market conditions, making it suitable for both trending and ranging markets.

#### Strategy Principles
The core logic is based on several key elements:
1. Dynamic pivot calculation: Uses adjustable pivot length parameter (default 2) to identify local highs and lows
2. Support/resistance zones: Establishes percentage-based ranges (default 0.4%) around pivot points to define valid trading areas
3. Signal generation: Long signals when price breaks above support, short signals when price breaks below resistance
4. Risk management: Implements dynamic stop-loss (10%) and take-profit (27%) levels, with position sizing based on account equity

#### Strategy Advantages
1. High adaptability: Dynamically adjusts support/resistance levels based on market conditions, avoiding lag from static levels
2. Controlled risk: Maintains reasonable risk per trade through strict percentage-based stops and dynamic position sizing
3. Scalability: Supports multiple timeframes and parameter combinations for optimization across different market environments
4. Transparency: Clear trading logic with all signals and price levels visually displayed on charts

#### Strategy Risks
1. False breakout risk: May generate frequent false signals in ranging markets, requiring adjustment of support/resistance zone parameters
2. Slippage impact: Actual execution prices may differ significantly from signal prices in less liquid market conditions
3. Trend dependency: Strategy performs better in trending markets but may generate excessive signals during consolidation phases
4. Parameter sensitivity: Performance highly dependent on parameter settings, requiring thorough backtesting for optimization

#### Optimization Directions
1. Add market environment recognition module for automatic parameter adjustment based on volatility
2. Incorporate volume and additional technical indicators as confirmation signals
3. Optimize position sizing algorithm with dynamic adjustments based on market volatility
4. Implement time filters to avoid trading during unfavorable periods
5. Develop adaptive stop-loss algorithm with dynamic adjustment based on market volatility

#### Summary
The strategy provides a reliable framework for trend-following and reversal trading through dynamic identification of key price levels combined with strict risk control. While it exhibits some parameter sensitivity and market environment dependency, continuous optimization and refinement enable consistent performance across different market conditions. Successful implementation requires traders to deeply understand its principles and adjust parameters according to specific market situations.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © felipemiransan

//@version=6
strategy("Dynamic Support and Resistance Pivot Strategy ", overlay=true)

// Strategy parameters
pivot_length = input.int(2, title="Pivot Length", tooltip="Pivot size to identify peaks and troughs")
support_resistance_distance = input.float(0.4, title="Support/Resistance Distance %", tooltip="Distance to consider a support or resistance level in %")

// Stop Loss and Take Profit parameters
stop_loss_pct = input.float(10.0, title="Stop Loss %", tooltip="Stop loss percentage", minval=0.1) / 100
take_profit_pct = input.float(26.0, title="Take Profit %", tooltip="Take profit percentage", minval=0.1) / 100

// Functions to identify high and low pivots
pivot_high = ta.pivothigh(high, pivot_length, pivot_length)
pivot_low = ta.pivotlow(low, pivot_length, pivot_length)

// Storing support and resistance levels
var float resistance_level = na
var float support_level = na
var float last_pivot_high = na
var float last_pivot_low = na

// Updating support and resistance based on pivots
if (not na(pivot_high))
    resistance_level := high[pivot_length]
    last_pivot_high := high[pivot_length]

if (not na(pivot_low))
    support_level := low[pivot_length]
    last_pivot_low := low[pivot_length]

// Function to check if the current price is near a support or resistance level
is_near_resistance = (not na(resistance_level)) and (close >= resistance_level * (1 - support_resistance_distance / 100)) and (close <= resistance_level * (1 + support_resistance_distance / 100))
is_near_support = (not na(support_level)) and (close >= support_level * (1 - support_resistance_distance / 100)) and (close <= support_level * (1 + support_resistance_distance / 100))

// Cross conditions variables
long_cross = ta.crossover(close, support_level) and not na(support_level)
short_cross = ta.crossunder(close, resistance_level) and not na(resistance_level)

// Entry conditions
long_condition = is_near_support and long_cross  // Buy when crossing support from below
short_condition = is_near_resistance and short_cross  // Sell when crossing resistance from above

// Order execution
if (long_condition)
    strategy.entry("Long", strategy.long)

if (short_condition)
    strategy.entry("Short", strategy.short)

// Stop Loss and Take Profit
if (strategy.opentrades > 0)
    if (strategy.position_size > 0)  // For long position
        avg_price_long = strategy.position_avg_price
        long_stop_level = avg_price_long * (1 - stop_loss_pct)
        long_take_profit_level = avg_price_long * (1 + take_profit_pct)
        strategy.exit("Exit Long", from_entry="Long", stop=long_stop_level, limit=long_take_profit_level)

    if (strategy.position_size < 0)  // For short position
        avg_price_short = strategy.position_avg_price
        short_stop_level = avg_price_short * (1 + stop_loss_pct)
        short_take_profit_level = avg_price_short * (1 - take_profit_pct)
        strategy.exit("Exit Short", from_entry="Short", stop=short_stop_level, limit=short_take_profit_level)

// Plotting support and resistance levels on the chart
plot(support_level, title="Support", color=color.green, linewidth=2, style=plot.style_line)
plot(resistance_level, title="Resistance", color=color.red, linewidth=2, style=plot.style_line)

// Adding labels to show pivot values
if (long_condition and not na(support_level))
    label.new(bar_index, low[pivot_length], str.tostring(low[pivot_length]), style=label.style_label_up, color=color.green, textcolor=color.white, size=size.small)

if (short_condition and not na(resistance_level))
    label.new(bar_index, high[pivot_length], str.tostring(high[pivot_length]), style=label.style_label_down, color=color.red, textcolor=color.white, size=size.small)

```

> Detail

https://www.fmz.com/strategy/477944

> Last Modified

2025-01-10 15:08:24
