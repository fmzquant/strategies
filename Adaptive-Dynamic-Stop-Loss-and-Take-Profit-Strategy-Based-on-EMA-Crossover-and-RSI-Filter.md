
> Name

Adaptive-Dynamic-Stop-Loss-and-Take-Profit-Strategy-Based-on-EMA-Crossover-and-RSI-Filter

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d81e42c3a97096ab5d26.png)
![IMG](https://www.fmz.com/upload/asset/2d8fa64bd41a8f074d4e0.png)

#### Overview
This strategy is a quantitative trading system that combines EMA crossovers, RSI filtering, and ATR-based dynamic stop-loss and take-profit mechanisms. The strategy confirms trend reversal points through the crossover of fast and slow Exponential Moving Averages (EMA), while incorporating the Relative Strength Index (RSI) as a filter to avoid trading in overbought or oversold zones. Its distinctive feature is the use of Average True Range (ATR) to dynamically adjust stop-loss and take-profit levels, allowing risk management parameters to adapt to market volatility.

#### Strategy Principles
The core logic is based on the following key components:
1. Trend Identification: Uses 9-period and 21-period EMA crossovers to confirm trend direction changes, with fast line crossing above slow line as bullish signal and vice versa.
2. Trade Filtering: Employs 14-period RSI to filter trading signals, executing long positions only when RSI is above 30 (oversold) and short positions when below 70 (overbought).
3. Risk Management: Dynamically sets stop-loss and take-profit levels based on 14-period ATR, with stop-loss at 2.5x ATR and take-profit at 5x ATR (2x stop-loss distance), ensuring a 1:2 risk-reward ratio.

#### Strategy Advantages
1. Dynamic Adaptability: Automatically adjusts stop-loss and take-profit levels through ATR, enabling the strategy to adapt to volatility characteristics in different market environments.
2. Multiple Confirmation Mechanism: Combines trend and momentum indicators to reduce the impact of false signals.
3. Optimized Risk-Reward Ratio: Employs a 1:2 risk-reward ratio setting, pursuing higher returns while managing risk.
4. Visual Support: Provides signal markers and moving average displays for intuitive market condition understanding.

#### Strategy Risks
1. Choppy Market Risk: Frequent EMA crossovers in ranging markets may lead to overtrading.
2. Slippage Impact: Significant differences between actual execution prices and signal prices may occur during intense market volatility.
3. Parameter Sensitivity: Strategy performance is sensitive to settings like EMA periods, RSI thresholds, and ATR multipliers.

#### Strategy Optimization Directions
1. Market Environment Recognition: Introduce trend strength indicators (like ADX) to use different parameters in strong trend and ranging markets.
2. Position Management Optimization: Dynamically adjust position sizes based on RSI and ATR values, increasing positions when signals are stronger.
3. Exit Mechanism Improvement: Consider adding trailing stops to protect more profits during trend continuation.
4. Time Filtering: Add trading time window restrictions to avoid trading during low volatility periods.

#### Summary
The strategy constructs a complete trading system by identifying trends through moving averages, filtering false signals with RSI, and managing risk dynamically with ATR. Its main characteristic is strong adaptability, capable of adjusting trading parameters according to market volatility. Through implementation of optimization directions, the strategy's stability and profitability can be further enhanced. It is recommended to conduct thorough historical data backtesting and parameter optimization before live trading.


> Source (PineScript)

``` pinescript
//@version=6
strategy("High Win Rate Dogecoin Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input Parameters
fastLength = input(9, title="Fast EMA Length")
slowLength = input(21, title="Slow EMA Length")
atrLength = input(14, title="ATR Length")
atrMultiplier = input(2.5, title="ATR Multiplier")
rsiLength = input(14, title="RSI Length")
rsiOverbought = input(70, title="RSI Overbought")
rsiOversold = input(30, title="RSI Oversold")

// Indicators
fastEMA = ta.ema(close, fastLength)
slowEMA = ta.ema(close, slowLength)
atr = ta.atr(atrLength)
rsi = ta.rsi(close, rsiLength)

// Entry Conditions
longCondition = ta.crossover(fastEMA, slowEMA) and rsi > rsiOversold
shortCondition = ta.crossunder(fastEMA, slowEMA) and rsi < rsiOverbought

// Stop Loss & Take Profit
longStopLoss = close - (atr * atrMultiplier)
longTakeProfit = close + (atr * atrMultiplier * 2)
shortStopLoss = close + (atr * atrMultiplier)
shortTakeProfit = close - (atr * atrMultiplier * 2)

// Strategy Entries
if longCondition
    strategy.entry("Long", strategy.long)
    strategy.exit("TakeProfitLong", from_entry="Long", limit=longTakeProfit, stop=longStopLoss)

if shortCondition
    strategy.entry("Short", strategy.short)
    strategy.exit("TakeProfitShort", from_entry="Short", limit=shortTakeProfit, stop=shortStopLoss)

// Plot Signals
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal")

// Plot EMAs for visualization
plot(fastEMA, color=color.blue, title="Fast EMA")
plot(slowEMA, color=color.orange, title="Slow EMA")

```

> Detail

https://www.fmz.com/strategy/483063

> Last Modified

2025-02-27 17:06:29
