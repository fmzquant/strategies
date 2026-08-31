
> Name

Dual-EMA-RSI-Momentum-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18ce225b014f74b6a82.png)

#### Overview
This strategy combines a dual EMA system (50 and 100 periods) with the RSI momentum indicator. It identifies market trends and entry points through EMA crossovers and RSI overbought conditions, while implementing dynamic stop-loss for risk management. The strategy is particularly effective in trending market conditions, capitalizing on trend continuation patterns.

#### Strategy Principles
The core logic includes the following key elements:
1. Uses 50-period and 100-period Exponential Moving Averages (EMA) for trend identification
2. Confirms momentum using RSI overbought levels (default 70)
3. Enters long positions when EMAs cross bullishly and RSI enters overbought territory
4. Exits positions when the shorter EMA crosses below the longer EMA
5. Sets dynamic stop-loss at EMA crossover points

#### Strategy Advantages
1. Combines trend and momentum confirmation for improved signal reliability
2. Uses classic technical indicators, making it clear and easy to understand
3. Dynamic stop-loss mechanism effectively controls risk and prevents excessive drawdowns
4. Highly adjustable parameters for different market conditions
5. Clean code structure for easy maintenance and optimization

#### Strategy Risks
1. May generate frequent false breakout signals in ranging markets
2. RSI overbought condition might cause missing important trend initiations
3. EMA system has inherent lag, potentially affecting entry and exit timing
4. Stop-loss positioning might not be responsive enough in highly volatile markets
5. Limited to long positions, restricting strategy versatility

#### Strategy Optimization Directions
1. Implement market condition recognition for adaptive parameter settings
2. Incorporate volume indicators for additional confirmation
3. Enhance stop-loss mechanism with trailing stops
4. Add short-selling capability for comprehensive market coverage
5. Include volatility filters to avoid excessive market volatility
6. Introduce position sizing system based on market risk assessment

#### Summary
This trend-following strategy, built on classical technical analysis principles, effectively balances profit opportunities and risk control through the combination of EMA system and RSI indicator. Its main strengths lie in its clear logic and controllable risk, though it requires appropriate parameter optimization and strategy improvements based on market conditions. For investors seeking medium to long-term trend trading opportunities, this serves as a valuable basic strategy framework.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-10 00:00:00
end: 2025-02-09 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("IME-Bands with RSI Strategy", overlay=true)

// === INPUTS ===
src = close
emaS_value = input.int(50, minval=1, title="EMA Small - Value")  // 50 EMA
emaB_value = input.int(100, minval=1, title="EMA Big - Value")  // 100 EMA
rsi_length = input.int(14, title="RSI Length")
rsi_source = input.source(close, title="RSI Source")
rsi_overbought = input.int(70, title="RSI Overbought Level")
rsi_oversold = input.int(30, title="RSI Oversold Level")

// === CALCULATIONS ===
// EMAs
emaS = ta.ema(close, emaS_value)
emaB = ta.ema(close, emaB_value)

// RSI
rsi = ta.rsi(rsi_source, rsi_length)

// IME-Band Cross Conditions
isGreenCrossover = emaS > emaB  // Green band
isRedCrossover = emaS < emaB    // Red band

// Track Green Cross Confirmation
var bool isGreenConfirmed = false
if (isGreenCrossover and not isGreenCrossover[1])  // First green crossover
    isGreenConfirmed := true

if (not isGreenCrossover)
    isGreenConfirmed := false

// Entry Condition: RSI above 70 on second green candle
entryCondition = isGreenConfirmed and rsi > rsi_overbought and isGreenCrossover

// Exit Condition: Red band confirmed
exitCondition = isRedCrossover

// === STRATEGY RULES ===
// Stop Loss: Lowest point of crossover
var float stopLoss = na
if (isGreenCrossover and not isGreenCrossover[1])
    stopLoss := emaB  // Set stop loss to EMA Big (crossover point)

// Entry and Exit Trades
if (entryCondition)
    strategy.entry("Buy", strategy.long)
    stopLoss := na  // Reset stop loss after entry

if (exitCondition)
    strategy.close("Buy")

// Stop Loss logic
if (strategy.position_size > 0 and not na(stopLoss))
    strategy.exit("Stop Loss", from_entry="Buy", stop=stopLoss)

// Plotting
plot(emaS, color=color.green, title="EMA Small (50)", linewidth=1)
plot(emaB, color=color.red, title="EMA Big (100)", linewidth=1)
hline(rsi_overbought, "RSI Overbought", color=color.new(color.red, 70), linestyle=hline.style_dotted)
plot(rsi, color=color.blue, title="RSI")

```

> Detail

https://www.fmz.com/strategy/481393

> Last Modified

2025-02-10 16:54:48
