
> Name

Dynamic-Multi-Dimensional-Trend-Tracking-and-Quantitative-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8a5510674115cfa359e.png)
![IMG](https://www.fmz.com/upload/asset/2d8c8b4aae8961d95cf5e.png)




#### Overview
This strategy is an innovative quantitative trading approach focused on capturing precise trading signals and managing risks by combining Supertrend, Exponential Moving Average (EMA), and Relative Strength Index (RSI). The strategy aims to provide traders with a dynamic, multi-dimensional market trend tracking mechanism applicable across 1-minute, 5-minute, and 15-minute charts.

#### Strategy Principles
The core principle is based on the synergistic action of three key technical indicators:
1. Supertrend: Provides market trend judgment by calculating Average True Range (ATR) and price movement direction.
2. Exponential Moving Average (EMA): Serves as a dynamic support/resistance line, helping determine price position relative to the average line.
3. Relative Strength Index (RSI): Evaluates market momentum and identifies overbought and oversold conditions.

The strategy generates trading signals through comprehensive analysis of these three indicators:
- Long Signal: Supertrend is bullish + Price above EMA + RSI above 40
- Short Signal: Supertrend is bearish + Price below EMA + RSI below 60

#### Strategy Advantages
1. Multi-Dimensional Signal Verification: Significantly improves signal reliability through cross-validation of three indicators.
2. Dynamic Risk Management: Adaptive stop-loss and take-profit mechanism based on ATR.
3. High Flexibility: Applicable across multiple time periods (1-minute, 5-minute, 15-minute).
4. Single Position Control: Only one position allowed at a time, effectively controlling trading risk.
5. Visualization Assistance: Provides clear buy/sell signal markers and key metrics table.

#### Strategy Risks
1. Indicator Lag: Technical indicators have historical data dependency, potentially causing signal delays.
2. Volatility Impact: Stop-losses may be frequently triggered in high-volatility markets.
3. Parameter Sensitivity: ATR length, EMA period, and RSI thresholds significantly affect strategy performance.
4. Transaction Costs: Frequent trading may incur high commission fees.

#### Strategy Optimization Directions
1. Adaptive Parameters: Introduce machine learning algorithms to dynamically adjust parameters based on market conditions.
2. Long-Short Portfolio: Combine trend-following and reversal strategies to balance strategy stability.
3. Risk Allocation: Optimize position management with dynamic position sizing control.
4. Multi-Timeframe Verification: Enhance signal verification mechanisms across multiple time periods.
5. Transaction Cost Optimization: Reduce trading frequency and unnecessary trades.

#### Summary
This is a quantitative trading strategy integrating multi-dimensional technical analysis, providing traders with a dynamic and flexible trading decision framework through the synergistic action of Supertrend, EMA, and RSI. The strategy's core advantage lies in its multi-signal verification and adaptive risk management mechanism, while also requiring continuous optimization and adjustment by traders.



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-03-24 00:00:00
end: 2025-03-27 00:00:00
period: 3m
basePeriod: 3m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("SOL Scalper - Supertrend + EMA + RSI (One Position at a Time)", overlay=true, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=10, commission_type=strategy.commission.percent, commission_value=0.075)

// Inputs
atrLength = input.int(7, title="ATR Length", minval=1)
atrMultiplier = input.float(0.8, title="ATR Multiplier", minval=0.1)
emaLength = input.int(9, title="EMA Length", minval=1)
rsiLength = input.int(14, title="RSI Length", minval=1)
slPercent = input.float(1, title="Stop Loss (%)", minval=0.1, step=0.1) / 100
tpMultiplier = input.float(3.0, title="Take Profit Multiplier", minval=1.0)

// Supertrend Calculation
atr = ta.atr(atrLength)
[supertrend, direction] = ta.supertrend(atrMultiplier, atrLength)
plot(supertrend, color=direction == 1 ? color.green : color.red, linewidth=2, title="Supertrend")

// EMA Calculation
ema = ta.ema(close, emaLength)
plot(ema, color=color.blue, title="EMA")

// RSI Calculation
rsi = ta.rsi(close, rsiLength)
rsiOverbought = 60 // Adjusted to allow more trades
rsiOversold = 40  // Adjusted to allow more trades

// Entry Conditions
longCondition = direction == 1 and close > ema and rsi > rsiOversold
shortCondition = direction == -1 and close < ema and rsi < rsiOverbought

// Risk Management
stopLoss = close * slPercent
takeProfit = atr * tpMultiplier

// Ensure Only One Position at a Time
var bool inPosition = false

// Execute Trades
if (not inPosition) // Only enter a new trade if no position is open
    if (longCondition)
        strategy.entry("Long", strategy.long)
        strategy.exit("Long Exit", "Long", stop=close - stopLoss, limit=close + takeProfit)
        inPosition := true // Set inPosition to true when a trade is opened

    if (shortCondition)
        strategy.entry("Short", strategy.short)
        strategy.exit("Short Exit", "Short", stop=close + stopLoss, limit=close - takeProfit)
        inPosition := true // Set inPosition to true when a trade is opened

// Reset inPosition when the trade is closed
if (strategy.position_size == 0)
    inPosition := false

// Visuals
plotshape(series=longCondition and not inPosition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition and not inPosition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Debugging
bgcolor(longCondition and not inPosition ? color.new(color.green, 90) : na, title="Long Condition")
bgcolor(shortCondition and not inPosition ? color.new(color.red, 90) : na, title="Short Condition")

// Key Metrics Table
var table keyMetrics = table.new(position.top_right, 2, 4, border_width=1)
if barstate.islast
    table.cell(keyMetrics, 0, 0, "ATR", bgcolor=color.gray)
    table.cell(keyMetrics, 1, 0, str.tostring(atr, "#.#####"), bgcolor=color.gray)
    table.cell(keyMetrics, 0, 1, "RSI", bgcolor=color.gray)
    table.cell(keyMetrics, 1, 1, str.tostring(rsi, "#.##"), bgcolor=color.gray)
    table.cell(keyMetrics, 0, 2, "Trend", bgcolor=color.gray)
    table.cell(keyMetrics, 1, 2, direction == 1 ? "Bullish" : "Bearish", bgcolor=color.gray)
    table.cell(keyMetrics, 0, 3, "TP Distance", bgcolor=color.gray)
    table.cell(keyMetrics, 1, 3, str.tostring(takeProfit, "#.#####"), bgcolor=color.gray)
```

> Detail

https://www.fmz.com/strategy/488543

> Last Modified

2025-03-28 17:31:28
