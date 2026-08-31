
> Name

Multi-Moving-Average-Trend-Following-and-Risk-Management-Quantitative-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d91ba8bb5e97f7daa3bd.png)
![IMG](https://www.fmz.com/upload/asset/2d8a36486420c52a66a89.png)

#### Overview
This strategy is a trend following system that combines multiple moving averages, momentum indicators, and dynamic risk control. It identifies trading opportunities by analyzing price trends, market momentum, and volatility while implementing strict position management and stop-loss mechanisms. The core logic revolves around the crossover of long and short-term exponential moving averages (EMA) combined with the Relative Strength Index (RSI), using Average True Range (ATR) for dynamic stop-loss positioning.

#### Strategy Principles
The strategy employs a multi-layer verification mechanism to confirm trading signals:
1. Trend Confirmation: Uses 50-day and 200-day EMAs to judge medium and long-term trends, requiring the short-term average to remain above the long-term average for more than 10 periods.
2. Momentum Verification: Uses RSI to verify price momentum, confirming upward momentum when RSI exceeds the set threshold (default 50).
3. Trend Strength: Incorporates Average Directional Index (ADX) to measure trend strength, with ADX above 20 indicating significant trend.
4. Dynamic Risk Control: Designs dynamic stop-loss based on ATR, with stop-loss distance set at 2.5 times ATR, including trailing stop mechanism.
5. Intelligent Position Management: Dynamically calculates position size based on account equity and preset risk ratio in combination with ATR.

#### Strategy Advantages
1. Multiple Signal Verification: Improves signal reliability through validation across multiple dimensions including moving averages, momentum, and trend strength.
2. Dynamic Risk Management: Employs volatility-based dynamic and trailing stops that adapt to market conditions.
3. Intelligent Position Control: Dynamically adjusts positions based on account size and market volatility, effectively controlling single trade risk.
4. Trend Persistence Requirement: Avoids false breakouts by setting trend duration requirements.
5. Systematic Trading Alerts: Integrates trading signal notifications for real-time operation.

#### Strategy Risks
1. Trend Reversal Risk: May experience significant drawdowns at trend endings, suggesting adjustment based on macro market conditions.
2. Sideways Market Performance: May generate frequent trades in range-bound markets, increasing transaction costs.
3. Parameter Sensitivity: Strategy performance affected by multiple indicator parameters, requiring backtest optimization.
4. Slippage Impact: May face significant slippage in low liquidity conditions, affecting strategy returns.

#### Optimization Directions
1. Market Environment Adaptation: Consider introducing volatility indicators (like VIX) for dynamic parameter adjustment to improve adaptability across different market conditions.
2. Signal Filtering: Consider adding volume indicator verification to improve signal quality.
3. Profit-Taking Mechanism: Design dynamic profit-taking mechanisms based on market volatility to optimize return-to-drawdown ratio.
4. Timeframe Optimization: Consider validating signal consistency across different timeframes to improve trading stability.
5. Machine Learning Optimization: Consider introducing machine learning algorithms for dynamic parameter optimization to enhance strategy adaptability.

#### Summary
This strategy constructs a complete trend following trading system through the comprehensive use of multiple technical indicators. It shows excellent performance in risk control through dynamic stop-loss and position management. The strategy demonstrates strong extensibility with multiple optimization directions reserved. Traders are advised to adjust parameters according to specific market characteristics and their own risk preferences when implementing in live trading.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2025-02-19 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"DOGE_USDT"}]
*/

//@version=6
strategy("High-Return Trend Strategy (Final)", overlay=true)

// === Inputs ===
longEmaLength = input(200, title="Long EMA Length")
shortEmaLength = input(50, title="Short EMA Length")
rsiLength = input(14, title="RSI Length")
rsiBuyLevel = input(50, title="RSI Buy Level")
atrLength = input(14, title="ATR Length")
atrMultiplier = input(2.5, title="ATR Multiplier")  // Adjusted for lower drawdown
riskPerTrade = input.float(1.0, title="Risk % per Trade", minval=0.1, maxval=5.0, step=0.1)  // Risk % of equity


// === Indicators ===
longEma = ta.ema(close, longEmaLength)
shortEma = ta.ema(close, shortEmaLength)
rsi = ta.rsi(close, rsiLength)
atr = ta.atr(atrLength)
[plusDI, minusDI, adx] = ta.dmi(14, 14)  // DI and ADX smoothing set to 14

// === Position Sizing ===
// Calculate position size based on risk per trade
riskAmount = strategy.equity * (riskPerTrade / 100)  // Risk % of account equity
positionSize = riskAmount / (atr * atrMultiplier)  // ATR-based stop-loss distance

// === Entry Conditions ===
trendConfirmed = ta.barssince(shortEma <= longEma) > 10  // Persistent trend above long EMA
longCondition = shortEma > longEma and rsi > rsiBuyLevel and adx > 20 and trendConfirmed

// === Exit Conditions ===
longStopLoss = close - atr * atrMultiplier  // Dynamic stop-loss
strategy.exit("Trailing Stop", from_entry="Buy", trail_points=atr * 1.5, trail_offset=atr * 1.5)  // Trailing stop

// === Strategy Logic ===
if (longCondition)
    strategy.entry("Buy", strategy.long, qty=positionSize)

// === Alerts ===
alertcondition(longCondition, title="Buy Signal", message="Buy Signal Triggered!")
alertcondition(strategy.closedtrades > 0, title="Trade Closed", message="Trade Closed!")

// === Debugging and Visualization ===
plot(longEma, color=color.red, title="Long EMA (200)")
plot(shortEma, color=color.blue, title="Short EMA (50)")
plot(rsi, color=color.purple, title="RSI")
hline(rsiBuyLevel, "RSI Buy Level", color=color.green)
plot(adx, color=color.orange, title="ADX")
hline(20, "ADX Threshold", color=color.red)

```

> Detail

https://www.fmz.com/strategy/483118

> Last Modified

2025-02-21 14:22:42
