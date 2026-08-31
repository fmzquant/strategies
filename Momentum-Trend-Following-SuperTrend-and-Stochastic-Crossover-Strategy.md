
> Name

Momentum-Trend-Following-SuperTrend-and-Stochastic-Crossover-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8703fd9b663d253337b.png)
![IMG](https://www.fmz.com/upload/asset/2d8d9f749c1343a1c532c.png)


#### Overview
This strategy is a trend-following trading system that combines the SuperTrend indicator with the Stochastic Oscillator. It identifies market trend direction using the SuperTrend indicator while utilizing the Stochastic Oscillator's overbought and oversold signals as confirmation. The strategy employs momentum crossover methods to find optimal entry and exit points in the trend direction, achieving a perfect blend of trend following and momentum analysis.

#### Strategy Principles
The core logic is based on the coordination of two main indicators:
1. SuperTrend Indicator: Calculated based on ATR (Average True Range), used to determine market trends. A change from red to green indicates an uptrend, while green to red indicates a downtrend. The indicator parameters use an ATR period of 10 and a multiplier factor of 3.0.
2. Stochastic Oscillator: Used to identify market overbought and oversold conditions. Uses %K period of 14, %D period of 3, with overbought level at 80 and oversold level at 20.

Trading rules are as follows:
- Long Entry: SuperTrend shows uptrend (green), and Stochastic %K line crosses above the oversold level (20)
- Short Entry: SuperTrend shows downtrend (red), and Stochastic %K line crosses below the overbought level (80)
- Long Exit: SuperTrend turns to downtrend, or Stochastic %K line crosses below overbought level
- Short Exit: SuperTrend turns to uptrend, or Stochastic %K line crosses above oversold level

#### Strategy Advantages
1. Trend Confirmation: Effectively identifies market main trends through SuperTrend indicator, reducing false breakout risks
2. Momentum Verification: Combines momentum signals from Stochastic indicator, improving trade accuracy and timeliness
3. Risk Control: Uses overbought and oversold levels as reference for stop-loss and take-profit, providing a clear risk management framework
4. Visualization: Strategy provides intuitive graphical interface, including trend background colors and indicator line changes, facilitating market state understanding
5. Parameter Flexibility: All key parameters can be optimized and adjusted according to different market characteristics

#### Strategy Risks
1. Consolidation Market Risk: May generate frequent false signals during sideways consolidation, leading to overtrading
2. Lag Risk: Both SuperTrend and Stochastic indicators have inherent lag, potentially missing optimal entry points
3. Parameter Sensitivity: Different parameter settings may lead to significantly different trading results, requiring thorough testing
4. Market Environment Dependency: Strategy performs well in strong trend markets but may underperform in highly volatile markets
5. Signal Conflict: The two indicators may produce contradictory signals, requiring clear priority rules

#### Strategy Optimization Directions
1. Introduce Volatility Filter: Can add ATR threshold judgment to pause trading during high volatility
2. Optimize Signal Confirmation: Consider adding moving averages or other auxiliary indicators to improve signal reliability
3. Improve Stop-Loss Mechanism: Recommend adding trailing stop-loss functionality to better protect profits
4. Add Time Filtering: Adjust strategy parameters or pause trading based on different time period market characteristics
5. Develop Adaptive Parameters: Design adaptive parameter mechanisms to dynamically adjust strategy parameters based on market conditions

#### Summary
This strategy builds a relatively complete trading system by combining trend following and momentum analysis. It not only provides clear entry and exit signals but also includes frameworks for risk management and parameter optimization. While there are some inherent risks, the stability and adaptability of the strategy can be further enhanced through the provided optimization suggestions. It is suitable for traders who wish to capture opportunities in trending markets.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2024-10-01 00:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SuperTrend + Stochastic Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// SuperTrend Settings
superTrendFactor = input.float(3.0, title="SuperTrend Factor", step=0.1)
superTrendATRLength = input.int(10, title="SuperTrend ATR Length")

// Calculate SuperTrend
[superTrend, direction] = ta.supertrend(superTrendFactor, superTrendATRLength)

// Plot SuperTrend
plot(superTrend, color=direction == 1 ? color.green : color.red, title="SuperTrend")
bgcolor(direction == 1 ? color.new(color.green, 90) : color.new(color.red, 90), transp=90)

// Stochastic Settings
stochKLength = input.int(14, title="Stochastic %K Length")
stochDLength = input.int(3, title="Stochastic %D Length")
stochSmoothK = input.int(3, title="Stochastic %K Smoothing")
stochOverbought = input.int(80, title="Stochastic Overbought Level")
stochOversold = input.int(20, title="Stochastic Oversold Level")

// Calculate Stochastic
k = ta.sma(ta.stoch(close, high, low, stochKLength), stochSmoothK)
d = ta.sma(k, stochDLength)

// Plot Stochastic in separate pane
hline(stochOverbought, "Overbought", color=color.red)
hline(stochOversold, "Oversold", color=color.green)
plot(k, color=color.blue, title="%K", linewidth=2)
plot(d, color=color.orange, title="%D", linewidth=2)

// Long Condition: SuperTrend is up and Stochastic %K crosses above oversold
longCondition = direction == 1 and ta.crossover(k, stochOversold)
if (longCondition)
    strategy.entry("Long", strategy.long)

// Short Condition: SuperTrend is down and Stochastic %K crosses below overbought
shortCondition = direction == -1 and ta.crossunder(k, stochOverbought)
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Exit Long: SuperTrend turns down or Stochastic %K crosses below overbought
exitLong = direction == -1 or ta.crossunder(k, stochOverbought)
if (exitLong)
    strategy.close("Long")

// Exit Short: SuperTrend turns up or Stochastic %K crosses above oversold
exitShort = direction == 1 or ta.crossover(k, stochOversold)
if (exitShort)
    strategy.close("Short")

```

> Detail

https://www.fmz.com/strategy/482805

> Last Modified

2025-02-20 14:55:49
