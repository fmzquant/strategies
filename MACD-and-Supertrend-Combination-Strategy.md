
> Name

MACD-and-Supertrend-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1414e271de8c8f71ecb.png)

#### Overview
This article introduces a trading strategy that combines two technical indicators: MACD and Supertrend. The strategy uses the crossover signals of the MACD indicator and the trend direction of the Supertrend indicator to determine entry and exit points, aiming to profit from trending markets. The main idea of the strategy is to go long when the MACD crosses above the signal line and the Supertrend is green, and to go short when the MACD crosses below the signal line and the Supertrend is red. The crossover of the MACD signal line and the MACD line serves as the exit signal.

#### Strategy Principle
The strategy uses the MACD indicator and the Supertrend indicator to generate trading signals. The MACD is calculated by subtracting the slow moving average (default 26-period) from the fast moving average (default 12-period), and then calculating the 9-period moving average of the MACD as the signal line. A bullish crossover occurs when the MACD line crosses above the signal line, indicating a long signal, while a bearish crossover occurs when the MACD line crosses below the signal line, indicating a short signal. The Supertrend indicator combines the ATR volatility indicator. When the price is above the Supertrend line and the Supertrend line is green, it indicates an uptrend, and when the price is below the Supertrend line and the Supertrend line is red, it indicates a downtrend. The strategy goes long when the MACD forms a bullish crossover and the Supertrend is green, and goes short when the MACD forms a bearish crossover and the Supertrend is red, following the trend. At the same time, when the MACD signal line crosses the MACD line, the position is closed to control drawdown.

#### Strategy Advantages
1. Combining trend and momentum indicators, it can better capture trending markets. The MACD indicator is forward-looking and can judge trend reversals in advance, while the Supertrend indicator can effectively filter out range-bound markets. The combination of the two can establish positions in a timely manner in trending markets, improving strategy returns.
2. Using signal line crossover as the exit signal, it can stop loss and take profit in a timely manner. The MACD signal line reflects the short-term price trend. When it crosses the MACD line, it means that the trend may reverse, so closing positions in a timely manner can effectively control drawdowns and avoid larger losses. 
3. The strategy logic is clear, and the rules are simple, easy to implement and optimize. The strategy uses only two common technical indicators, and the calculation methods are mature, making it convenient to backtest and optimize based on different parameters.

#### Strategy Risks
1. The risk of applicability of MACD and Supertrend parameter selection. The calculation of both MACD and Supertrend indicators involves time period parameters, and the optimal parameters may vary for different markets and underlying assets. Fixed parameters may cause the strategy to fail in certain market conditions.
2. The risk of lagging identification of trend reversal. As a trend-following indicator, the MACD signals may have a certain lag relative to price, and false signals may still be generated in the early stage of trend reversal. The Supertrend also has a certain delay in judging trend reversals.
3. The risk of frequent trading in range-bound markets. The strategy may generate frequent bullish and bearish crossover signals in range-bound markets, leading to excessive trading and incurring higher transaction costs, which reduces strategy returns.

#### Strategy Optimization Directions
1. Optimize the parameters of MACD and Supertrend for different underlying assets and timeframes. Methods such as exhaustive search or genetic algorithms can be used to find the optimal parameter combinations to improve the adaptability and stability of the strategy.
2. Add other filtering conditions on top of the MACD bullish and bearish crossover signals, such as changes in trading volume, price breakouts, etc., to further confirm trend reversals and reduce false signals.
3. Introduce position management and stop-loss/take-profit mechanisms, such as ATR stop-loss, percentage stop-loss and take-profit, to control single-trade risk and improve the strategy's drawdown control ability and profit/loss ratio.
4. Consider adding timeframe filtering or asset rotation rules to reduce trading frequency in range-bound markets and improve the strategy's risk-adjusted return.

#### Summary
This article introduces a trading strategy based on the MACD indicator and the Supertrend indicator. The strategy trades in trending markets by using the trend judgment of the MACD and the direction filtering of the Supertrend, while using signal line crossovers to exit positions in a timely manner to control drawdowns. The advantages of the strategy lie in its simple logic and strong trend-capturing ability, but it also faces risks such as parameter applicability, signal lag, and frequent trading. In the future, the strategy can be refined in aspects such as parameter optimization, signal filtering, position management, timeframe and asset selection, to pursue more stable returns.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-01 00:00:00
end: 2024-05-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="MACD + Supertrend Strategy", overlay=true)

// MACD Calculation
fastLength = 12
slowLength = 26
signalSmoothing = 9
macdSrc = close

// MACD Line
fastMA = ta.ema(macdSrc, fastLength)
slowMA = ta.ema(macdSrc, slowLength)
macdLine = fastMA - slowMA

// MACD Signal Line
signalMA = ta.ema(macdLine, signalSmoothing)

// MACD Histogram
histogram = macdLine - signalMA

// Supertrend Calculation
supertrendATRLength = 10
supertrendFactor = 3.0
[supertrend, _] = ta.supertrend(supertrendFactor, supertrendATRLength)

// Entry and Exit Conditions
longCondition = (macdLine > signalMA) and (supertrend < close)
shortCondition = (signalMA > macdLine) and (supertrend > close)

// Long Entry
if longCondition
    strategy.entry("Long", strategy.long)

// Long Exit (Sell)
if signalMA > macdLine
    strategy.close("Long")

// Short Entry
if shortCondition
    strategy.entry("Short", strategy.short)

// Short Exit (Cover)
if macdLine > signalMA
    strategy.close("Short")

// Close Long Position if short condition is met
if shortCondition
    strategy.close("Long")

// Close Short Position if long condition is met
if longCondition
    strategy.close("Short")

// Plotting
plotshape(series=longCondition, title="Long Entry Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="Long")
plotshape(series=shortCondition, title="Short Entry Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="Short")

// Alerts
alertcondition(longCondition, title='Long Entry Signal', message='MACD crossover and Supertrend below close price')
alertcondition(signalMA > macdLine, title='Long Exit Signal', message='MACD signal line crosses above MACD line')

alertcondition(shortCondition, title='Short Entry Signal', message='MACD crossunder and Supertrend above close price')
alertcondition(macdLine > signalMA, title='Short Exit Signal', message='MACD line crosses above MACD signal line')

```

> Detail

https://www.fmz.com/strategy/453271

> Last Modified

2024-06-03 16:35:15
