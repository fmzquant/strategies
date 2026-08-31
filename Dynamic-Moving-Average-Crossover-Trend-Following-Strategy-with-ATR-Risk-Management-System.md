
> Name

Dynamic-Moving-Average-Crossover-Trend-Following-Strategy-with-ATR-Risk-Management-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1219c80968b2233bd5d.png)

 

#### Overview
This strategy is a trend following trading system that combines moving average crossover signals with ATR-based risk management. It captures market trends through the crossover of fast and slow moving averages while using the ATR indicator to dynamically adjust stop-loss and take-profit levels, achieving precise control of trading risks. The strategy also includes a money management module that automatically adjusts position sizes based on account equity and preset risk parameters.

#### Strategy Principles
The core logic of the strategy is based on the following key components:
1. Trend Identification System - Uses crossovers of 10-period and 50-period Simple Moving Averages (SMA) to determine trend direction. Long signals are generated when the fast MA crosses above the slow MA, and short signals when it crosses below.
2. Risk Management System - Employs a 14-period ATR indicator multiplied by 1.5 to set dynamic stop-loss and take-profit targets. This method automatically adjusts risk control parameters based on market volatility.
3. Money Management System - Controls the amount of capital used in each trade by setting risk tolerance (2%) and capital allocation (100%), ensuring rational use of funds.

#### Strategy Advantages
1. Strong Adaptability - Dynamically adjusts stop-loss and take-profit levels through ATR, enabling the strategy to adapt to different market environments.
2. Comprehensive Risk Control - Combines percentage-based risk control with dynamic ATR stops, forming a dual risk protection mechanism.
3. Clear Operating Rules - Entry and exit conditions are clear, facilitating execution and backtesting.
4. Scientific Money Management - Ensures controllable risk per trade through proportional allocation mechanism.

#### Strategy Risks
1. Choppy Market Risk - In sideways markets, frequent MA crossovers may lead to consecutive losses.
2. Slippage Risk - During rapid market movements, actual execution prices may significantly deviate from signal prices.
3. Capital Efficiency Risk - 100% capital allocation may result in less flexible use of funds.

#### Strategy Optimization Directions
1. Add Trend Filter - Can add trend strength indicators like ADX to execute trades only in strong trends.
2. Optimize MA Parameters - Can test historical data to find optimal moving average period combinations.
3. Improve Money Management - Recommend adding dynamic position sizing mechanism to automatically adjust trading size based on account performance.
4. Add Market Environment Filter - Can add volatility indicators to trade only in suitable market conditions.

#### Summary
This strategy captures trends through MA crossovers and combines ATR dynamic risk control to create a complete trend following trading system. The strategy's strengths lie in its adaptability and risk control capabilities, though it may underperform in choppy markets. Through the addition of trend filters and optimization of the money management system, there is room for improvement in the strategy's overall performance.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-06 00:00:00
end: 2025-01-04 08:00:00
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © davisash666

//@version=5
strategy("Trend-Following Strategy", overlay=true)

// Inputs for strategy parameters
timeframe = input.timeframe("D", "Timeframe")
risk_tolerance = input.float(2.0, "Risk Tolerance (%)", step=0.1) / 100
capital_allocation = input.float(200, "Capital Allocation (%)", step=1) / 100

// Technical indicators (used to emulate machine learning)
ma_length_fast = input.int(10, "Fast MA Length")
ma_length_slow = input.int(50, "Slow MA Length")
atr_length = input.int(14, "ATR Length")
atr_multiplier = input.float(1.5, "ATR Multiplier")

// Calculations
fast_ma = ta.sma(close, ma_length_fast)
slow_ma = ta.sma(close, ma_length_slow)
atr = ta.atr(atr_length)

// Entry and exit conditions
long_condition = ta.crossover(fast_ma, slow_ma)
short_condition = ta.crossunder(fast_ma, slow_ma)

// Risk management
stop_loss_long = close - (atr * atr_multiplier)
stop_loss_short = close + (atr * atr_multiplier)
take_profit_long = close + (atr * atr_multiplier)
take_profit_short = close - (atr * atr_multiplier)

// Capital allocation
position_size = strategy.equity * capital_allocation

// Execute trades
if long_condition
    strategy.entry("Long", strategy.long, qty=position_size / close)
    strategy.exit("Take Profit/Stop Loss", "Long", stop=stop_loss_long, limit=take_profit_long)

if short_condition
    strategy.entry("Short", strategy.short, qty=position_size / close)
    strategy.exit("Take Profit/Stop Loss", "Short", stop=stop_loss_short, limit=take_profit_short)

// Plotting for visualization
plot(fast_ma, color=color.green, title="Fast MA")
plot(slow_ma, color=color.red, title="Slow MA")
plot(stop_loss_long, color=color.blue, title="Stop Loss (Long)", linewidth=1, style=plot.style_cross)
plot(take_profit_long, color=color.purple, title="Take Profit (Long)", linewidth=1, style=plot.style_cross)

```

> Detail

https://www.fmz.com/strategy/477598

> Last Modified

2025-01-06 16:27:18
