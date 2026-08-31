
> Name

SUPERTREND趋势追踪型多头止盈止损策略SUPERTREND-Trend-following-Long-Position-with-Stop-loss-and-Take-profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19dd3f1c70e2138d7a2.png)


#### Overview
This strategy utilizes the Supertrend indicator to determine entry and exit points for trades. Supertrend is a trend-following indicator that combines the concepts of dynamic support/resistance and price breakouts. The strategy aims to capture strong uptrends while strictly controlling risk, and it trades with a 1:5 risk-reward ratio. When the price breaks above the Supertrend upper band, it enters a long position and sets a stop-loss and take-profit price based on the predefined risk-reward ratio. Once the price breaks below the Supertrend lower band, the strategy closes the long position.

#### Strategy Principles
1. Calculate the upper and lower bands of the Supertrend indicator. Supertrend uses ATR (Average True Range) and a factor to calculate dynamic support and resistance levels.
2. Check for long entry conditions: When the closing price breaks above the Supertrend upper band, enter a long position.
3. Calculate stop-loss and take-profit prices: Based on the current closing price and the predefined risk-reward ratio (e.g., 1:5), calculate the stop-loss and take-profit prices.
4. Submit a long order: Open a long position with the calculated stop-loss and take-profit prices.
5. Check for long exit conditions: When the closing price breaks below the Supertrend lower band, close the long position.

#### Advantage Analysis
1. Trend-following: The Supertrend indicator can effectively capture strong trends, helping the strategy profit from uptrends.
2. Dynamic stop-loss: By using ATR to calculate dynamic support and resistance levels, Supertrend provides a dynamic stop-loss for the strategy to control risk.
3. Risk-reward control: The strategy allows users to predefine a risk-reward ratio (e.g., 1:5) to control the risk and potential reward for each trade.
4. Simplicity: The strategy logic is straightforward and easy to understand and implement.

#### Risk Analysis
1. Trend reversals: In sudden trend reversals, the strategy may suffer losses as it relies on the continuity of the trend.
2. Parameter sensitivity: The strategy's performance may be sensitive to the parameters of the Supertrend, such as the ATR factor and ATR length. Inappropriate parameters may lead to false signals.
3. Lack of volatility: In low volatility market conditions, the strategy may underperform as prices may oscillate between the upper and lower bands, leading to frequent trades and losses due to slippage and commissions.

#### Optimization Directions
1. Dynamic parameter optimization: Implement a parameter optimization routine to dynamically adjust Supertrend parameters based on different market conditions. This can improve the adaptability and robustness of the strategy.
2. Combine with other indicators: Incorporate other technical indicators, such as RSI or MACD, to confirm trend strength and filter out false signals.
3. Market condition adaptation: Develop logic to identify different market conditions (e.g., trending, ranging) and adjust strategy parameters or disable the strategy accordingly.
4. Money management optimization: Optimize position sizing and risk management rules to improve the risk-adjusted returns of the strategy.

#### Summary
This strategy leverages the Supertrend indicator to follow strong uptrends while strictly controlling risk. It provides a simple yet effective framework for capturing trending opportunities. However, the strategy may face risks such as trend reversals and parameter sensitivity. Further improvements can be made through dynamic parameter optimization, combining with other indicators, adapting to market conditions, and optimizing money management. Overall, this Supertrend strategy offers a solid foundation for trend-following trading.



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
strategy("Supertrend Strategy with 1:5 Risk Reward", overlay=true)

// Supertrend Indicator
factor = input(3.0, title="ATR Factor")
atrLength = input(10, title="ATR Length")

[supertrendUp, supertrendDown] = ta.supertrend(factor, atrLength)

supertrend = ta.crossover(ta.lowest(close, 1), supertrendDown) ? supertrendDown : supertrendUp

plot(supertrend, title="Supertrend", color=supertrend == supertrendUp ? color.green : color.red, linewidth=2, style=plot.style_line)

// Strategy parameters
risk = input(1.0, title="Risk in %")
reward = input(5.0, title="Reward in %")
riskRewardRatio = reward / risk

// Entry and exit conditions
longCondition = ta.crossover(close, supertrendUp)
if (longCondition)
    // Calculate stop loss and take profit levels
    stopLossPrice = close * (1 - (risk / 100))
    takeProfitPrice = close * (1 + (reward / 100))
    
    // Submit long order
    strategy.entry("Long", strategy.long, stop=stopLossPrice, limit=takeProfitPrice)

// Exit conditions
shortCondition = ta.crossunder(close, supertrendDown)
if (shortCondition)
    strategy.close("Long")

```

> Detail

https://www.fmz.com/strategy/454363

> Last Modified

2024-06-17 16:32:24
