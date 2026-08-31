
> Name

EMA双均线交叉策略-EMA-Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10ec51b33944b7bdd21.png)

#### Overview
This strategy uses two exponential moving averages (EMAs) to capture changes in price trends. When the short-term EMA crosses above the long-term EMA from below, a buy signal is generated; when the short-term EMA crosses below the long-term EMA from above, a sell signal is generated. The strategy also sets daily stop-loss and take-profit limits to control single-day losses and profits.

#### Strategy Principles
1. Calculate the short-term EMA (default period of 9) and long-term EMA (default period of 21).
2. When the short-term EMA crosses above the long-term EMA, open a long position; when the short-term EMA crosses below the long-term EMA, open a short position.
3. Record the account equity at the start of each trading day and calculate the difference between the current account equity and the starting equity, i.e., the daily profit and loss.
4. If the daily loss exceeds the maximum allowed loss (0.25% of the initial account funds), close all positions.
5. If the daily profit exceeds the maximum allowed profit (2% of the initial account funds), close all positions.

#### Strategy Advantages
1. Simple and easy to understand: The strategy logic is clear and uses only two moving averages to generate trading signals, making it easy to understand and implement.
2. Trend following: By using the crossover of fast and slow EMAs, the strategy can capture changes in price trends relatively well, making it suitable for use in trending markets.
3. Risk control: The daily stop-loss and take-profit limits can effectively control single-day losses and profits, preventing excessive fluctuations in the account.

#### Strategy Risks
1. Parameter optimization: The performance of the strategy largely depends on the choice of EMA periods, and different parameter settings may lead to drastically different results. Therefore, parameter optimization and backtesting need to be performed in different market environments.
2. Choppy markets: In choppy markets, prices frequently fluctuate above and below the EMAs, potentially generating many false signals and leading to frequent trades and capital erosion.
3. Trend reversals: When market trends reverse, the strategy may delay entry or exit, missing the best trading opportunities.

#### Strategy Optimization Directions
1. Introduce other technical indicators such as RSI and MACD to help judge trend strength and direction and improve signal accuracy.
2. Optimize stop-loss and take-profit rules, such as using trailing stops or dynamic take-profit levels, to better protect profits and control risks.
3. Dynamically adjust EMA periods based on market volatility to adapt to different market states.
4. Combine fundamental analysis, such as economic data and major events, to filter and confirm trading signals.

#### Summary
The EMA dual moving average crossover strategy is a simple, easy-to-understand trading strategy suitable for trending markets. By using the crossover of fast and slow moving averages, it can capture changes in price trends relatively well. At the same time, the daily stop-loss and take-profit settings can effectively control risks. However, the strategy may underperform in choppy markets or during trend reversals and needs to be optimized and improved by combining other technical indicators and analysis methods.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-06-01 00:00:00
end: 2024-06-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © DD173838

//@version=5
strategy("Moving Average Strategy with Daily Limits", overlay=true)

// Moving Average settings
shortMaLength = input.int(9, title="Short MA Length")
longMaLength = input.int(21, title="Long MA Length")

// Calculate MAs
shortMa = ta.ema(close, shortMaLength)
longMa = ta.ema(close, longMaLength)

// Plot MAs
plot(shortMa, title="9 EMA", color=color.blue)
plot(longMa, title="21 EMA", color=color.red)

// Strategy conditions
crossUp = ta.crossover(shortMa, longMa)
crossDown = ta.crossunder(shortMa, longMa)

// Debug plots to check cross conditions
plotshape(series=crossUp, title="Cross Up", location=location.belowbar, color=color.green, style=shape.labelup, text="UP")
plotshape(series=crossDown, title="Cross Down", location=location.abovebar, color=color.red, style=shape.labeldown, text="DOWN")

// Entry at cross signals
if (crossUp)
    strategy.entry("Long", strategy.long)

if (crossDown)
    strategy.entry("Short", strategy.short)

// Daily drawdown and profit limits
var float startOfDayEquity = na
if (na(startOfDayEquity) or ta.change(time('D')) != 0)
    startOfDayEquity := strategy.equity

maxDailyLoss = 50000 * 0.0025
maxDailyProfit = 50000 * 0.02
currentDailyPL = strategy.equity - startOfDayEquity

if (currentDailyPL <= -maxDailyLoss)
    strategy.close_all(comment="Max Daily Loss Reached")

if (currentDailyPL >= maxDailyProfit)
    strategy.close_all(comment="Max Daily Profit Reached")

```

> Detail

https://www.fmz.com/strategy/453662

> Last Modified

2024-06-07 15:58:15
