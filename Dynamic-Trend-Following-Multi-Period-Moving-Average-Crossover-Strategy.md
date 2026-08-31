
> Name

Dynamic-Trend-Following-Multi-Period-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9000bb17aaeaefd868.png)


#### Overview
This strategy is a trend-following trading system based on multiple-period moving averages. It utilizes 89-period and 21-period Simple Moving Averages (SMA) to determine the overall market trend direction, while incorporating 5-period Exponential Moving Average (EMA) highs and lows to identify specific trading signals. The strategy employs a dual position management approach combined with fixed stop-loss and trailing take-profit mechanisms.

#### Strategy Principles
The core logic includes the following key elements:
1. Trend Determination: Uses the relative position of 89-period and 21-period SMAs along with price position to identify trends. An uptrend is confirmed when price and 5-period EMA are above the 21-period SMA, which is above the 89-period SMA; the opposite confirms a downtrend.
2. Entry Signals: In uptrends, enter long positions when price retraces to the 5-period EMA low; in downtrends, enter short positions when price rebounds to the 5-period EMA high.
3. Position Management: Opens two identical contract positions for each triggered signal.
4. Risk Control: Applies fixed stop-loss and profit targets for the first position, and trailing stop-loss for the second position.

#### Strategy Advantages
1. Multiple Timeframe Confirmation: The combination of different period moving averages provides a more comprehensive trend assessment, reducing false signals.
2. Flexible Profit-Taking: Combines fixed and trailing take-profit methods to capture both short-term fluctuations and extended trends.
3. Controlled Risk: Sets clear stop-loss levels with fixed risk exposure for each trade signal.
4. Systematic Operation: Clear trading rules minimize subjective judgment, making it easy to implement programmatically.

#### Strategy Risks
1. Consolidation Risk: Frequent moving average crossovers during sideways markets may generate excessive false signals.
2. Slippage Risk: Significant price deviations between theoretical and actual execution prices during high volatility periods.
3. Money Management Risk: Fixed contract quantity trading may not suit all account sizes.
4. Parameter Sensitivity: Strategy performance heavily depends on moving average period selection, requiring optimization for different markets.

#### Optimization Directions
1. Dynamic Position Sizing: Recommend adjusting contract quantities based on account equity and market volatility.
2. Market Environment Filtering: Add trend strength indicators (like ADX) to reduce trading frequency in ranging markets.
3. Stop-Loss Enhancement: Consider using ATR for dynamic stop-loss adjustment to improve adaptability across different market conditions.
4. Signal Confirmation: Incorporate volume and momentum indicators to increase signal reliability.

#### Summary
This strategy represents a comprehensive trend-following system that captures market trends through multiple-period moving averages while implementing flexible position management and risk control methods. Although there is room for optimization, the basic framework demonstrates good practicality and scalability. The strategy's stability can be enhanced by adjusting parameters and adding filtering conditions for different trading instruments and market environments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-12 00:00:00
end: 2024-12-11 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © tobiashartemink2

//@version=5
strategy("High 5 Trading Technique", overlay=true)

// --- Input parameters ---
sma89Length = input.int(title="SMA 89 Length", defval=89)
sma21Length = input.int(title="SMA 21 Length", defval=21)
ema5HighLength = input.int(title="EMA 5 High Length", defval=5)
ema5LowLength = input.int(title="EMA 5 Low Length", defval=5)
contracts = input.int(title="Aantal Contracten", defval=1)
stopLossPoints = input.int(title="Stop Loss Points per Contract", defval=25)
takeProfitPoints = input.int(title="Take Profit Points per Contract", defval=25)

// --- Calculate moving averages ---
sma89 = ta.sma(close, sma89Length)
sma21 = ta.sma(close, sma21Length)
ema5High = ta.ema(high, ema5HighLength)
ema5Low = ta.ema(low, ema5LowLength)

// --- Identify trend and order of moving averages ---
longSetup = close > sma89 and close > sma21 and ema5High > sma21 and sma21 > sma89
shortSetup = close < sma89 and close < sma21 and ema5Low < sma21 and sma21 < sma89

// --- Entry signals ---
longTrigger = longSetup and close <= ema5Low
shortTrigger = shortSetup and close >= ema5High

// --- Entry orders ---
if (longTrigger)
    strategy.entry("Long 1", strategy.long, qty=contracts)
    strategy.entry("Long 2", strategy.long, qty=contracts)

if (shortTrigger)
    strategy.entry("Short 1", strategy.short, qty=contracts)
    strategy.entry("Short 2", strategy.short, qty=contracts)

// --- Stop-loss and take-profit for long positions ---
if (strategy.position_size > 0)
    strategy.exit("Exit Long 1", "Long 1", stop=strategy.position_avg_price - stopLossPoints, limit=strategy.position_avg_price + takeProfitPoints)
    strategy.exit("Exit Long 2", "Long 2", stop=strategy.position_avg_price - stopLossPoints, trail_offset=takeProfitPoints, trail_points=takeProfitPoints)

// --- Stop-loss and take-profit for short positions ---
if (strategy.position_size < 0)
    strategy.exit("Exit Short 1", "Short 1", stop=strategy.position_avg_price + stopLossPoints, limit=strategy.position_avg_price - takeProfitPoints)
    strategy.exit("Exit Short 2", "Short 2", stop=strategy.position_avg_price + stopLossPoints, trail_offset=takeProfitPoints, trail_points=takeProfitPoints)

// --- Plot moving averages ---
plot(sma89, color=color.blue, linewidth=2)
plot(sma21, color=color.red, linewidth=2)
plot(ema5High, color=color.green, linewidth=2)
plot(ema5Low, color=color.orange, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/474962

> Last Modified

2024-12-13 10:40:30
