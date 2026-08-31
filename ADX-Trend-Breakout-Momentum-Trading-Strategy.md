
> Name

ADX-Trend-Breakout-Momentum-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ad55f971e73fad8e30.png)


#### Overview
This is a quantitative trading strategy based on the Average Directional Index (ADX) and price breakouts. The strategy primarily monitors ADX indicator values to assess market trend strength and combines price breakout signals to capture market momentum. The strategy operates within specific trading sessions and implements risk management through stop-loss and daily trade limits.

#### Strategy Principles
The core logic includes the following key elements:
1. ADX Monitoring: Uses the ADX indicator to evaluate trend strength, with ADX values below 17.5 indicating potential new trend formation.
2. Price Breakout Detection: Tracks the highest closing price over the past 34 periods, triggering trade signals when current price breaks above this resistance.
3. Session Management: Operates only during specified trading hours (0730-1430) to avoid low liquidity periods.
4. Risk Control Mechanisms:
   - Fixed dollar stop-loss to limit single trade losses
   - Maximum of 3 trades per session limit
   - Automatic position closure at session end

#### Strategy Advantages
1. Trend Capture Capability: Effectively identifies early trend stages through ADX indicator and price breakout combination.
2. Comprehensive Risk Management: Multiple risk control measures including fixed stop-loss, trade limits, and auto-close mechanism.
3. High Automation: Clear strategy logic enables fully automated trading without manual intervention.
4. Strong Adaptability: Parameters can be adjusted for different market conditions.

#### Strategy Risks
1. False Breakout Risk: May experience consecutive stops in ranging markets.
2. Parameter Dependency: Strategy effectiveness heavily relies on ADX threshold and lookback period settings.
3. Time Restrictions: Trading only during specific sessions may miss opportunities.
4. Stop-Loss Configuration: Fixed dollar stops may lack flexibility in different volatility environments.

#### Optimization Directions
1. Dynamic Stop-Loss: Recommend implementing ATR-based dynamic stops for different market volatility conditions.
2. Market Environment Filter: Add volatility filters to adjust or pause trading in high volatility environments.
3. Entry Optimization: Consider adding volume confirmation to improve breakout signal reliability.
4. Dynamic Parameter Adjustment: Implement adaptive adjustment mechanisms for ADX thresholds and lookback periods.

#### Summary
This is a well-structured trend-following strategy with clear logic. It captures market trends by combining ADX indicators with price breakouts under an effective risk management framework. While there is room for optimization, the strategy's foundation is robust and suitable as a basic component of a quantitative trading system. Traders are advised to conduct thorough backtesting and parameter optimization before live trading, and make specific improvements based on market conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HuntGatherTrade
// ========================
// NQ 30 minute, ES 30 minute

//@version=5
strategy("ADX Breakout", overlay=false, initial_capital=25000, default_qty_value=1)

// ===============================
// Input parameters
// ===============================
stopLoss = input(1000.0, title="Stop Loss ($)", group="Exits")
session = input("0730-1430:1234567", group="Trade Session")
highestLB = input(34, title="Highest lookback window", group="Indicator values")

// ===============================
// Trade Session Handling
// ===============================
t = time(timeframe.period, session)

// Reset numTrades at the start of each session
var int numTrades = 0
is_new_session = ta.change(time("D")) != 0
if is_new_session
    numTrades := 0

// ===============================
// Entry Conditions
// ===============================
[plusDI, minusDI, adxValue] = ta.dmi(50, 14)
entryCondition = (close >= ta.highest(close, highestLB)[1]) and (adxValue < 17.5) and (strategy.position_size == 0) and (numTrades < 3) and not na(t)

// ===============================
// 7. Execute Entry
// ===============================
var float stopPricePlot = na

if entryCondition
    entryPrice = close + syminfo.mintick
    strategy.entry("Long Entry", strategy.long, stop=entryPrice)
    //stopPrice = strategy.position_avg_price - (stopLoss / syminfo.pointvalue)
    //strategy.exit("Stop Loss", "Long Entry", stop=stopPrice)
    numTrades += 1

if (strategy.position_size > 0) and (strategy.position_size[1] == 0)
    stopPoints = stopLoss / syminfo.pointvalue
    stopPrice = strategy.position_avg_price - stopPoints
    stopPrice := math.round(stopPrice / syminfo.mintick) * syminfo.mintick
    strategy.exit("Stop Loss", from_entry="Long Entry", stop=stopPrice)


if ta.change(strategy.opentrades) == 1
    float entryPrice = strategy.opentrades.entry_price(0)
    stopPricePlot := entryPrice - (stopLoss / syminfo.pointvalue)

if ta.change(strategy.closedtrades) == 1
    stopPricePlot   := na

plot(stopPricePlot, "Stop-loss level", color.red, 1, plot.style_linebr)

// ===============================
// Exit at End of Session
// ===============================
if na(t) and strategy.position_size != 0
    strategy.close_all(comment="End of Day Exit")
```

> Detail

https://www.fmz.com/strategy/473247

> Last Modified

2024-11-28 15:44:59
