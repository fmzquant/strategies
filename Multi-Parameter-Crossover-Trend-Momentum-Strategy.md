
> Name

Multi-Parameter-Crossover-Trend-Momentum-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d887b0944be0c5460521.png)
![IMG](https://www.fmz.com/upload/asset/2d8a13985297aeef70cb2.png)



#### Overview
This is a complex multi-indicator trading strategy that combines four technical analysis tools: Exponential Moving Average (EMA), Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), and Bollinger Bands. The strategy aims to identify potential entry points by verifying signals through multiple indicators, focusing on capturing trend-driven price movements with a strict signal filtering mechanism.

#### Strategy Principle
The core principle is based on comprehensive analysis of four key technical indicators:
1. Using three EMA lines of different periods to determine overall trend direction
2. Using RSI to assess market momentum and overbought/oversold conditions
3. Judging trend momentum through MACD line and signal line crossovers
4. Combining Bollinger Bands upper and lower rails as additional price volatility reference

Specific entry logic includes:
- Long entry conditions:
  - Close price crosses above 50-day EMA
  - 50-day EMA higher than 100-day EMA, and 100-day EMA higher than 200-day EMA
  - RSI between 50-70
  - MACD line above signal line

- Short entry conditions:
  - Close price crosses below 50-day EMA
  - 50-day EMA lower than 100-day EMA, and 100-day EMA lower than 200-day EMA
  - RSI between 30-50
  - MACD line below signal line

#### Strategy Advantages
1. Multi-indicator verification significantly improves signal reliability
2. Strong trend tracking capability using triple EMA structure
3. Precise momentum judgment through RSI and MACD combination
4. Effective risk control with strict entry conditions
5. Clear visual entry signals and trend indications

#### Strategy Risks
1. Complex multi-indicator approach may cause signal delays
2. Potential multiple invalid signals in range-bound markets
3. Fixed parameters might not adapt to all market environments
4. Lack of stop-loss mechanism risks significant drawdowns

#### Strategy Optimization Directions
1. Introduce adaptive parameter adjustment mechanism
2. Add stop-loss and take-profit strategies
3. Dynamically adjust entry thresholds based on market cycles
4. Incorporate volatility indicators for further signal verification
5. Evaluate and optimize the best combination of indicator parameters

#### Conclusion
This is a highly systematic multi-parameter crossover trend momentum strategy that aims to provide more accurate and reliable trading signals through compound verification of four technical indicators. Despite its significant advantages, continuous optimization and risk management remain crucial.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-02 00:00:00
end: 2025-04-01 00:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"BNB_USDT"}]
*/

//@version=5
strategy("Multi-Indicator Trading Strategy", overlay=true)

// Input variables
len1 = input(50, "EMA 50")
len2 = input(100, "EMA 100")
len3 = input(200, "EMA 200")
rsiLength = input(14, "RSI Length")
rsiOverbought = input(70, "RSI Overbought")
rsiOversold = input(30, "RSI Oversold")

// Indicators
ema50 = ta.ema(close, len1)
ema100 = ta.ema(close, len2)
ema200 = ta.ema(close, len3)
rsi = ta.rsi(close, rsiLength)
[macdLine, signalLine, histLine] = ta.macd(close, 12, 26, 9)
[middle, upper, lower] = ta.bb(close, 20, 2)

// Trading signals
longCondition = ta.crossover(close, ema50) and ema50 > ema100 and ema100 > ema200 and rsi > 50 and rsi < rsiOverbought and macdLine > signalLine

shortCondition = ta.crossunder(close, ema50) and 
                 ema50 < ema100 and 
                 ema100 < ema200 and 
                 rsi < 50 and 
                 rsi > rsiOversold and 
                 macdLine < signalLine

// Plots
plot(ema50, "EMA 50", color.blue)
plot(ema100, "EMA 100", color.yellow)
plot(ema200, "EMA 200", color.red)
plot(upper, "BB Upper", color.gray)
plot(middle, "BB Middle", color.gray)
plot(lower, "BB Lower", color.gray)

// Signals
plotshape(longCondition, "Long", shape.triangleup, location.belowbar, color.green)
plotshape(shortCondition, "Short", shape.triangledown, location.abovebar, color.red)

// Strategy
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/489201

> Last Modified

2025-04-02 16:39:00
