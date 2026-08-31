
> Name

Multi-Indicator-Synergy-Trading-System-Trend-Momentum-Composite-Signal-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8afc9f3faabb3d69130.png)
![IMG](https://www.fmz.com/upload/asset/2d91566569f2f7027faf9.png)

 

#### Overview
This strategy is a quantitative trading system that combines multiple technical indicators, integrating Moving Averages (MA), Relative Strength Index (RSI), and Moving Average Convergence Divergence (MACD) to construct a comprehensive trading signal system. The strategy combines trend following with momentum identification, ensuring both directional accuracy and optimal entry timing. It also incorporates risk control mechanisms including stop-loss, take-profit, and trailing stop, forming a systematic trading approach.

#### Strategy Principles
The strategy builds trading signals based on three levels:
1. Trend Determination: Uses 50-day and 200-day moving averages system to identify major trends through golden/death crosses
2. Momentum Confirmation: Combines RSI overbought/oversold levels (70/30) with MACD crossovers to verify price momentum
3. Risk Control: Implements 2% stop-loss, 4% take-profit, and 1% trailing stop to establish a complete risk management system

Specifically, long signals are generated when the fast MA (50-day) crosses above the slow MA (200-day), while RSI is below overbought levels and MACD forms a golden cross. Conversely, short signals occur with death crosses, RSI below oversold levels, and MACD death crosses.

#### Strategy Advantages
1. High Signal Reliability: Multiple indicator cross-validation effectively filters false signals
2. Accurate Trend Capture: Classical dual MA system effectively captures major trends
3. Comprehensive Risk Control: Multiple stop-loss methods effectively control downside risk
4. Strong Adaptability: Strategy parameters are highly adjustable to different market conditions
5. Clear Execution: Clear signal generation conditions avoid subjective judgment interference

#### Strategy Risks
1. Lag Risk: Moving averages inherently lag, potentially missing optimal entry points
2. Sideways Market Risk: May generate frequent false breakout signals in ranging markets
3. Parameter Optimization Risk: Over-optimization may lead to overfitting, affecting strategy stability
4. Cost Control Risk: Frequent trading may incur high transaction costs
5. Market Environment Dependency: Strategy performs better in trending markets but may underperform in other conditions

#### Strategy Optimization Directions
1. Incorporate Volume Indicators: Add volume confirmation to existing signal system
2. Optimize Parameter Adaptation: Develop dynamic parameter adjustment mechanisms
3. Add Market Sentiment Indicators: Introduce VIX and other sentiment indicators
4. Enhance Stop-Loss Mechanism: Develop more flexible stop-loss solutions like ATR-based stops
5. Add Volatility Filters: Adjust positions in high volatility environments

#### Summary
This strategy constructs a relatively complete trading system through the synergy of multiple technical indicators. It performs well in trending markets but requires optimization based on actual market conditions. Traders should conduct thorough backtesting before live implementation and adjust parameters according to their risk tolerance. The core advantages lie in its systematic signal generation mechanism and comprehensive risk control system, making it valuable for practical application.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-06-01 00:00:00
end: 2025-02-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © EthioTrader

//@version=5
strategy("Optimal Multi-Indicator Strategy", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10, commission_type=strategy.commission.percent, commission_value=0.1)

// ===== Input Parameters =====
// Moving Averages
fastMA = ta.sma(close, 50)
slowMA = ta.sma(close, 200)
plot(fastMA, "Fast MA", color=color.green)
plot(slowMA, "Slow MA", color=color.red)

// RSI
rsiLength = input(14, "RSI Length")
rsiOverbought = input(70, "RSI Overbought")
rsiOversold = input(30, "RSI Oversold")
rsi = ta.rsi(close, rsiLength)

// MACD
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)

// Risk Management
stopLossPerc = input(2.0, "Stop Loss (%)") / 100
takeProfitPerc = input(4.0, "Take Profit (%)") / 100
trailingStopPerc = input(1.0, "Trailing Stop (%)") / 100

// ===== Strategy Logic =====
// Trend Condition: Golden Cross (Fast MA > Slow MA)
bullishTrend = ta.crossover(fastMA, slowMA)
bearishTrend = ta.crossunder(fastMA, slowMA)

// Momentum Condition: RSI and MACD
bullishMomentum = rsi < rsiOverbought and ta.crossover(macdLine, signalLine)
bearishMomentum = rsi > rsiOversold and ta.crossunder(macdLine, signalLine)

// Entry Signals
longCondition = bullishTrend and bullishMomentum
shortCondition = bearishTrend and bearishMomentum

// Exit Signals
trailingStop = strategy.position_avg_price * (1 - trailingStopPerc)
exitLong = ta.crossunder(close, trailingStop) or (close >= strategy.position_avg_price * (1 + takeProfitPerc))
exitShort = ta.crossover(close, trailingStop) or (close <= strategy.position_avg_price * (1 - takeProfitPerc))

// ===== Execute Orders =====
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", "Long", stop=strategy.position_avg_price * (1 - stopLossPerc), limit=strategy.position_avg_price * (1 + takeProfitPerc), trail_price=trailingStop, trail_offset=trailingStopPerc * close)

if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", "Short", stop=strategy.position_avg_price * (1 + stopLossPerc), limit=strategy.position_avg_price * (1 - takeProfitPerc), trail_price=trailingStop, trail_offset=trailingStopPerc * close)

// ===== Plotting =====
plotshape(series=longCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")


```

> Detail

https://www.fmz.com/strategy/482876

> Last Modified

2025-02-20 16:10:54
