
> Name

Dynamic-Long-Short-Swing-Trading-Strategy-with-Moving-Average-Crossover-Signal-System

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/18ad8b042f956c9118a.png)

#### Overview
This strategy is a technical indicator-based swing trading system that combines multiple signals including moving average crossovers, RSI overbought/oversold conditions, and ATR-based stop-loss/take-profit levels. The core mechanism relies on capturing market trends through short-term EMA and long-term SMA crossovers, confirmed by RSI signals, with dynamic stop-loss and take-profit levels set using ATR. The strategy supports both long and short trading directions and allows flexible enabling/disabling of either direction.

#### Strategy Principles
The strategy employs a multi-layer technical indicator approach:
1. Trend Determination Layer: Uses 20-period EMA and 50-period SMA crossovers to determine trend direction, with EMA crossing above SMA as long signal and below as short signal.
2. Momentum Confirmation Layer: Uses RSI indicator for overbought/oversold confirmation, allowing longs below RSI 70 and shorts above RSI 30.
3. Volatility Calculation Layer: Uses 14-period ATR to calculate stop-loss and take-profit levels, setting stop-loss at 1.5x ATR and take-profit at 3x ATR.
4. Position Management Layer: Dynamically calculates position size based on initial capital and per-trade risk percentage (default 1%).

#### Strategy Advantages
1. Multiple Signal Confirmation: Reduces false signals through the combination of moving average crossovers, RSI, and ATR indicators.
2. Dynamic Stop-Loss/Take-Profit: Adapts to changing market volatility through ATR-based position management.
3. Flexible Trading Direction: Allows independent enabling of long or short trades based on market conditions.
4. Strict Risk Control: Effectively controls risk exposure through percentage-based risk control and dynamic position sizing.
5. Visualization Support: Provides comprehensive chart visualization including signal markers and indicator displays.

#### Strategy Risks
1. Sideways Market Risk: Moving average crossovers may generate excessive false signals in ranging markets.
2. Slippage Risk: Actual execution prices may significantly deviate from signal prices during volatile periods.
3. Capital Management Risk: Excessive risk percentage settings may lead to large single-trade losses.
4. Parameter Sensitivity: Strategy performance is sensitive to parameter settings, requiring careful optimization.

#### Strategy Optimization Directions
1. Add Trend Strength Filter: Implement ADX indicator to filter trades in weak trend environments.
2. Optimize Moving Average Periods: Dynamically adjust moving average parameters based on market cycle characteristics.
3. Enhance Stop-Loss Mechanism: Add trailing stop-loss functionality to better protect profits.
4. Add Volume Confirmation: Incorporate volume indicators as additional confirmation to improve signal reliability.
5. Market Environment Classification: Add market environment recognition module to use different parameter sets in different market conditions.

#### Summary
The strategy constructs a relatively complete trading system through the combination of multiple technical indicators. Its strengths lie in signal confirmation reliability and comprehensive risk management, though market environment impact on strategy performance needs attention. Through the suggested optimization directions, there is significant room for improvement. When applying to live trading, thorough parameter testing and backtesting verification is recommended.
> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-10 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © CryptoRonin84

//@version=5
strategy("Swing Trading Strategy with On/Off Long and Short", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input for turning Long and Short trades ON/OFF
enable_long = input.bool(true, title="Enable Long Trades")
enable_short = input.bool(true, title="Enable Short Trades")

// Input parameters for strategy
sma_short_length = input.int(20, title="Short EMA Length", minval=1)
sma_long_length = input.int(50, title="Long SMA Length", minval=1)
sl_percentage = input.float(1.5, title="Stop Loss (%)", step=0.1, minval=0.1)
tp_percentage = input.float(3, title="Take Profit (%)", step=0.1, minval=0.1)
risk_per_trade = input.float(1, title="Risk Per Trade (%)", step=0.1, minval=0.1)
capital = input.float(10000, title="Initial Capital", step=100)

// Input for date range for backtesting
start_date = input(timestamp("2020-01-01 00:00"), title="Backtest Start Date")
end_date = input(timestamp("2024-12-31 23:59"), title="Backtest End Date")
inDateRange = true

// Moving averages
sma_short = ta.ema(close, sma_short_length)
sma_long = ta.sma(close, sma_long_length)

// RSI setup
rsi = ta.rsi(close, 14)
rsi_overbought = 70
rsi_oversold = 30

// ATR for volatility-based stop-loss calculation
atr = ta.atr(14)
stop_loss_level_long = strategy.position_avg_price - (1.5 * atr)
stop_loss_level_short = strategy.position_avg_price + (1.5 * atr)
take_profit_level_long = strategy.position_avg_price + (3 * atr)
take_profit_level_short = strategy.position_avg_price - (3 * atr)

// Position sizing based on risk per trade
risk_amount = capital * (risk_per_trade / 100)
position_size = risk_amount / (close * sl_percentage / 100)

// Long and Short conditions
long_condition = ta.crossover(sma_short, sma_long) and rsi < rsi_overbought
short_condition = ta.crossunder(sma_short, sma_long) and rsi > rsi_oversold

// Execute long trades
if (long_condition and inDateRange and enable_long)
    strategy.entry("Long", strategy.long, qty=position_size)
    strategy.exit("Take Profit/Stop Loss", "Long", stop=stop_loss_level_long, limit=take_profit_level_long)

// Execute short trades
if (short_condition and inDateRange and enable_short)
    strategy.entry("Short", strategy.short, qty=position_size)
    strategy.exit("Take Profit/Stop Loss", "Short", stop=stop_loss_level_short, limit=take_profit_level_short)

// Plot moving averages
plot(sma_short, title="Short EMA", color=color.blue)
plot(sma_long, title="Long SMA", color=color.red)

// Plot RSI on separate chart
hline(rsi_overbought, "Overbought", color=color.red)
hline(rsi_oversold, "Oversold", color=color.green)
plot(rsi, title="RSI", color=color.purple)

// Plot signals on chart
plotshape(series=long_condition and enable_long, title="Long Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=short_condition and enable_short, title="Short Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Background color for backtest range
bgcolor(inDateRange ? na : color.red, transp=90)


```

> Detail

https://www.fmz.com/strategy/474804

> Last Modified

2024-12-12 11:11:15
