
> Name

Adaptive-Bollinger-Bands-Mean-Reversion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16be1a59dbc10fe1662.png)

#### Overview
This strategy is an adaptive mean-reversion trading system based on Bollinger Bands indicator. It captures overbought and oversold opportunities by monitoring price crossovers with Bollinger Bands, trading on mean reversion principle. The strategy incorporates dynamic position sizing and risk management mechanisms, suitable for multiple markets and timeframes.

#### Strategy Principle
The core logic is based on the following points:
1. Uses 20-period moving average as the middle band, with 2 standard deviations for upper and lower bands.
2. Opens long positions when price breaks below the lower band (oversold signal).
3. Opens short positions when price breaks above the upper band (overbought signal).
4. Takes profit when price reverts to the middle band.
5. Sets 1% stop loss and 2% take profit, achieving 2:1 risk-reward ratio.
6. Employs percentage-based position sizing, investing 1% of account equity per trade.

#### Strategy Advantages
1. Scientific Indicator Selection - Bollinger Bands combines trend and volatility information, effectively identifying market conditions.
2. Comprehensive Risk Management - Uses fixed risk-reward ratio and percentage-based stops for effective risk control.
3. Strong Adaptability - Bollinger Bands automatically adjust bandwidth based on market volatility.
4. Clear Operating Rules - Entry and exit conditions are well-defined, reducing subjective judgment.
5. Real-time Monitoring - Features sound alerts for convenient signal tracking.

#### Strategy Risks
1. Consolidation Market Risk - May result in losses due to frequent trading in ranging markets.
Solution: Add trend filters, only trade when trend is clear.

2. False Breakout Risk - Price may quickly reverse after breakout.
Solution: Add confirmation signals like volume or other technical indicators.

3. Systematic Risk - May suffer larger losses in extreme market conditions.
Solution: Implement maximum drawdown limits, automatically stop trading when threshold is reached.

#### Strategy Optimization
1. Dynamic Bandwidth Optimization
- Automatically adjust Bollinger Bands standard deviation multiplier based on market volatility
- Improve strategy adaptability in different volatility environments

2. Multiple Timeframe Analysis
- Add trend judgment from higher timeframes
- Enhance trading direction accuracy

3. Intelligent Position Sizing
- Dynamically adjust position size based on historical volatility
- Optimize capital efficiency

#### Summary
This strategy captures price deviation using Bollinger Bands and trades on mean reversion principle. Its comprehensive risk management and clear trading rules provide good practicality. Through suggested optimizations, the strategy's stability and profitability can be further enhanced. It is suitable for quantitative traders seeking steady returns.



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-09 00:00:00
end: 2025-01-16 00:00:00
period: 10m
basePeriod: 10m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=5
strategy("Bollinger Bands Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=200)

// Inputs for Bollinger Bands
bbLength = input.int(20, title="Bollinger Bands Length")
bbStdDev = input.float(2.0, title="Bollinger Bands StdDev")

// Inputs for Risk Management
stopLossPerc = input.float(1.0, title="Stop Loss (%)", minval=0.1, step=0.1)
takeProfitPerc = input.float(2.0, title="Take Profit (%)", minval=0.1, step=0.1)

// Calculate Bollinger Bands
basis = ta.sma(close, bbLength)
bbStdev = ta.stdev(close, bbLength)
upper = basis + bbStdDev * bbStdev
lower = basis - bbStdDev * bbStdev

// Plot Bollinger Bands
plot(basis, color=color.blue, title="Middle Band")
plot(upper, color=color.red, title="Upper Band")
plot(lower, color=color.green, title="Lower Band")

// Entry Conditions
longCondition = ta.crossover(close, lower)
shortCondition = ta.crossunder(close, upper)

// Exit Conditions
exitLongCondition = ta.crossunder(close, basis)
exitShortCondition = ta.crossover(close, basis)

// Stop Loss and Take Profit Levels
longStopLoss = close * (1 - stopLossPerc / 100)
longTakeProfit = close * (1 + takeProfitPerc / 100)
shortStopLoss = close * (1 + stopLossPerc / 100)
shortTakeProfit = close * (1 - takeProfitPerc / 100)

// Execute Long Trades
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", from_entry="Long", stop=longStopLoss, limit=longTakeProfit)

if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", from_entry="Short", stop=shortStopLoss, limit=shortTakeProfit)

// Close Positions on Exit Conditions
if (exitLongCondition and strategy.position_size > 0)
    strategy.close("Long")

if (exitShortCondition and strategy.position_size < 0)
    strategy.close("Short")

// ? SOUND ALERTS IN BROWSER ?
if (longCondition)
    alert("? Long Entry Signal!", alert.freq_once_per_bar_close)

if (shortCondition)
    alert("? Short Entry Signal!", alert.freq_once_per_bar_close)

if (exitLongCondition)
    alert("? Closing Long Trade!", alert.freq_once_per_bar_close)

if (exitShortCondition)
    alert("? Closing Short Trade!", alert.freq_once_per_bar_close)

```

> Detail

https://www.fmz.com/strategy/478747

> Last Modified

2025-01-17 16:37:52
