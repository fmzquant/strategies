
> Name

RSISupertrend趋势跟踪交易策略-RSISupertrend-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e32108b76a2a98659a.png)

#### Overview
This strategy combines the Relative Strength Index (RSI) and Supertrend technical indicators to capture market trends and identify potential trading opportunities. The main idea behind the strategy is to use RSI to determine overbought and oversold market conditions while using the Supertrend indicator to confirm the trend direction. When both RSI and Supertrend indicators satisfy specific conditions simultaneously, the strategy generates buy or sell signals.

#### Strategy Principles
1. Calculate the values of RSI and Supertrend indicators.
2. When RSI crosses above 58 and the Supertrend indicator shows green, generate a buy signal and open a long position.
3. When RSI crosses below 50 and the Supertrend indicator turns red, close the long position.
4. When RSI crosses below 38 and the Supertrend indicator shows red, generate a sell signal and open a short position.
5. When RSI crosses above 45 and the Supertrend indicator turns green, close the short position.

#### Advantage Analysis
1. Combines a momentum indicator (RSI) and a trend indicator (Supertrend), effectively capturing market trends.
2. RSI helps identify overbought and oversold market conditions, avoiding trades in extreme situations.
3. The Supertrend indicator provides clear trend direction signals, aiding in making correct trading decisions.
4. The strategy logic is clear and easy to understand and implement.

#### Risk Analysis
1. In a oscillating market, frequent trading signals may lead to excessive trading frequency and transaction costs.
2. RSI and Supertrend indicators may generate conflicting signals, reducing the strategy's effectiveness.
3. The strategy relies on fixed parameter settings, which may not adapt to different market environments.

#### Optimization Directions
1. Consider incorporating other technical indicators, such as moving averages, to improve the strategy's reliability.
2. Optimize the parameters of RSI and Supertrend to adapt to different market conditions.
3. Implement risk management measures, such as stop-loss and position sizing, to control potential losses.
4. Backtest and monitor the strategy in real-time, adjusting strategy parameters as needed.

#### Summary
The RSI+Supertrend Trend-Following Trading Strategy effectively captures market trends and generates trading signals by combining the RSI and Supertrend technical indicators. The strategy's advantages lie in its clear logic, ease of implementation, and consideration of both momentum and trend factors. However, the strategy also has some risks, such as frequent trading and limitations in parameter settings. To further improve the strategy's performance, one can consider introducing other indicators, optimizing parameters, strengthening risk management measures, and continuously monitoring and adjusting the strategy.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-21 00:00:00
end: 2024-05-28 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI + Supertrend Strategy", overlay=true)

// Input parameters
rsiLength = input.int(14, title="RSI Length")
rsiOverbought = input.int(58, title="RSI Overbought Level")
rsiOversold = input.int(38, title="RSI Oversold Level")

supertrendLength = input.int(10, title="Supertrend Length")
supertrendMultiplier = input.int(3, title="Supertrend Multiplier")

// Calculate indicators
rsiValue = ta.rsi(close, rsiLength)

[supertrend, _] = ta.supertrend(supertrendLength, supertrendMultiplier)

// Plot Supertrend on main chart
plot(supertrend, color = supertrend < close ? color.green : color.red, linewidth = 2, title="Supertrend")

// Plot RSI
hline(rsiOverbought, "Overbought", color.red)
hline(rsiOversold, "Oversold", color.green)
plot(rsiValue, title="RSI", color=color.blue)

// Strategy
var float entryPrice = na

// Long conditions
longCondition = (rsiValue > rsiOverbought) and (supertrend < close)

// Short conditions
shortCondition = (rsiValue < rsiOversold) and (supertrend > close)

// Exit conditions
longExitCondition = (rsiValue < 50) and (supertrend > close)
shortExitCondition = (rsiValue > 45) and (supertrend < close)

// Execute strategy
if (longCondition)
    strategy.entry("Long", strategy.long)
    entryPrice := close

if (shortCondition)
    strategy.entry("Short", strategy.short)
    entryPrice := close

if (longExitCondition and strategy.position_size > 0)
    strategy.close("Long")

if (shortExitCondition and strategy.position_size < 0)
    strategy.close("Short")

// Date and time range for backtest
startDate = timestamp("2023-01-01 00:00")
endDate = timestamp("2024-01-01 00:00")
if (time < startDate or time > endDate)
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/452830

> Last Modified

2024-05-29 17:28:06
