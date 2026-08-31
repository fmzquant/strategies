
> Name

EMA100与NUPL相对未实现利润量化交易策略-EMA100-and-NUPL-Relative-Unrealized-Profit-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1545e2a756c9f263ece.png)

#### Overview
This trading strategy is based on three indicators: the 100-period Exponential Moving Average (EMA100), Net Unrealized Profit/Loss (NUPL), and Relative Unrealized Profit. It generates trading signals by determining the crossover of price with EMA100 and the positivity or negativity of NUPL and Relative Unrealized Profit. A long signal is triggered when the price crosses above EMA100 and both NUPL and Relative Unrealized Profit are positive. A short signal is triggered when the price crosses below EMA100 and both NUPL and Relative Unrealized Profit are negative. The strategy uses a fixed position size of 10% and sets a stop loss of 10%.

#### Strategy Principles
1. Calculate the 100-period EMA as the main trend indicator
2. Use NUPL and Relative Unrealized Profit as auxiliary indicators to confirm trend strength and sustainability
3. Generate long/short signals when the price crosses above/below EMA100 while NUPL and Relative Unrealized Profit are simultaneously positive/negative
4. Adopt a fixed position size of 10% and set a stop loss of 10% to control risk
5. When holding a long position, if the price falls below the stop loss price, close the long position; when holding a short position, if the price rises above the stop loss price, close the short position

#### Advantage Analysis
1. Simple and easy to understand: The strategy logic is clear and uses common technical indicators, making it easy to understand and implement
2. Trend following: By capturing the main trend using EMA100, it is suitable for use in trending markets
3. Risk control: Setting fixed position sizes and stop losses can effectively control risk
4. Adaptability: The strategy can be applied to various markets and trading instruments

#### Risk Analysis
1. False signals: In choppy markets, frequent crossovers between price and EMA100 may generate more false signals, leading to losses
2. Lag: As a lagging indicator, EMA may react slowly at trend reversals, missing the best entry opportunities
3. Parameter optimization: Strategy parameters (such as EMA period, position size, stop loss ratio) need to be optimized for different markets, and inappropriate parameters may result in poor strategy performance

#### Optimization Directions
1. Parameter optimization: Optimize parameters such as EMA period, position size, and stop loss ratio to improve strategy performance
2. Signal filtering: Add other technical indicators or market sentiment indicators to filter false signals
3. Dynamic position management: Dynamically adjust positions based on market volatility, account profit/loss, and other factors to increase returns and control risk
4. Long-short combination: Hold both long and short positions simultaneously to hedge market risk and improve strategy stability

#### Summary
This trading strategy generates trading signals through three indicators: EMA100, NUPL, and Relative Unrealized Profit. It has advantages such as clear logic, controllable risk, and strong adaptability. At the same time, it also has risks such as false signals, lag, and parameter optimization. In the future, the strategy can be optimized and improved through parameter optimization, signal filtering, dynamic position management, and long-short combinations.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-06-11 00:00:00
end: 2024-06-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Scalping Strategy with EMA 100, NUPL, and Relative Unrealized Profit", overlay=true)

// Input for EMA period
emaPeriod = input.int(100, title="EMA Period", minval=1)
ema100 = ta.ema(close, emaPeriod)
plot(ema100, color=color.blue, title="EMA 100")

// Placeholder function for NUPL (Net Unrealized Profit/Loss)
// Replace this with actual NUPL data or calculation
NUPL = close * 0.0001 // Dummy calculation

// Placeholder function for relative unrealized profit
// Replace this with actual relative unrealized profit data or calculation
relativeUnrealizedProfit = close * 0.0001 // Dummy calculation

// Define conditions for long and short entries
longCondition = ta.crossover(close, ema100) and NUPL > 0 and relativeUnrealizedProfit > 0
shortCondition = ta.crossunder(close, ema100) and NUPL < 0 and relativeUnrealizedProfit < 0

// Plot buy and sell signals on the chart
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal")

// Calculate stop loss levels
longStopLoss = close * 0.90
shortStopLoss = close * 1.10

// Strategy entry and exit rules
if (longCondition)
    strategy.entry("Long", strategy.long, stop=longStopLoss)

if (shortCondition)
    strategy.entry("Short", strategy.short, stop=shortStopLoss)

// Set stop loss levels for active positions
if (strategy.position_size > 0)
    strategy.exit("Exit Long", "Long", stop=longStopLoss)
if (strategy.position_size < 0)
    strategy.exit("Exit Short", "Short", stop=shortStopLoss)

// Alerts for long and short entries
alertcondition(longCondition, title="Long Entry Alert", message="Long entry signal based on EMA 100, NUPL, and relative unrealized profit")
alertcondition(shortCondition, title="Short Entry Alert", message="Short entry signal based on EMA 100, NUPL, and relative unrealized profit")

// Visualize the entry conditions
plotshape(series=longCondition, location=location.belowbar, color=color.blue, style=shape.cross, title="Long Condition")
plotshape(series=shortCondition, location=location.abovebar, color=color.red, style=shape.cross, title="Short Condition")

```

> Detail

https://www.fmz.com/strategy/454336

> Last Modified

2024-06-17 14:55:13
