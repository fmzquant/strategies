
> Name

基于均线交叉的止损止盈策略Moving-Average-Crossover-Strategy-with-Stop-Loss-and-Take-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fb405492a2b7a62f93.png)


## Overview

This strategy calculates moving averages of different periods, sets stop-loss and take-profit points to implement automated trading. It goes long when the short period moving average crosses above the long period moving average, and goes short when the short period moving average crosses below the long period moving average. Meanwhile, it sets stop-loss and take-profit points to control risks.  

## Strategy Logic

This strategy is based on the moving average crossover principle. It calculates both 9-day and 55-day simple moving averages simultaneously. When the 9-day MA crosses above the 55-day MA, it signals that the short-term trend has reversed to upside, so goes long. When the 9-day MA crosses below the 55-day MA, it signals that the short-term trend has reversed to downside, so goes short.

In the meantime, this strategy utilizes the ATR indicator to set stop-loss and take-profit points. The ATR indicator can measure the degree of price volatility in the market. The stop-loss point is set at the close price minus the ATR value, so it can set a reasonable stop-loss based on market volatility. The take-profit point uses a risk-reward ratio, which is set at 2 here - take profit = close price + 2 * ATR value.

## Advantages

This is a very simple and practical short-term trading strategy with the following advantages:

1. The moving average crossover principle is easy to understand and master;  
2. The combination of stop-loss and take-profit effectively controls risks and enhances practicality;
3. The moving average parameters can be flexibly adjusted to adapt to different market environments; 
4. The ATR stop-loss can set stop-loss points based on market volatility, quite intelligent;
5. The risk-reward ratio setting can be adjusted according to personal risk preference.

## Risks

There are also some risks with this strategy:  

1. Moving average crossover signals may have false breakouts, causing wrong trades;
2. Improper stop-loss or take-profit settings may increase losses or reduce profits;
3. Improper moving average parameters may lead to too high trading frequency or lagging signals; 
4. Improper ATR parameter settings may also make stop-loss points too close or too far.

These risks can be reduced by optimizing parameters, strict stop-loss, and reasonable position sizing.

## Optimization

This strategy can be further optimized:

1. Use optimization tools to find the optimal moving average parameter combination;  
2. Add other indicators to filter the moving average crossover signals to avoid false breakouts;
3. Try other types of moving averages, such as exponential moving averages, etc.;  
4. Consider adding the ATR parameter to optimization as well to make the stop-loss and take-profit more intelligent.

## Conclusion

The overall logic of this strategy is clear and easy to implement, especially suitable for beginners to master. As a basic short-term trading strategy, it has the advantages of simple operation and easy optimization. When combined with COMPLETE or other frameworks, it can be further enhanced to become a practical quantitative trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Short MA Length|
|v_input_2|55|Long MA Length|
|v_input_3|2|Risk-Reward Ratio|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-14 00:00:00
end: 2023-12-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("MA Crossover Strategy with Stop-Loss and Take-Profit", overlay=true)

// Input for selecting the length of the moving averages
maShortLength = input(9, title="Short MA Length")
maLongLength = input(55, title="Long MA Length")

// Input for setting the risk-reward ratio
riskRewardRatio = input(2, title="Risk-Reward Ratio")

// Calculate moving averages
maShort = ta.sma(close, maShortLength)
maLong = ta.sma(close, maLongLength)

// Buy condition: 9-period MA crosses above 55-period MA
buyCondition = ta.crossover(maShort, maLong)

// Sell condition: 9-period MA crosses below 55-period MA
sellCondition = ta.crossunder(maShort, maLong)

// Set stop-loss and take-profit levels
atrValue = ta.atr(14)
stopLossLevel = close - atrValue  // Use ATR for stop-loss (adjust as needed)
takeProfitLevel = close + riskRewardRatio * atrValue  // Risk-reward ratio of 1:2

// Execute buy and sell orders with stop-loss and take-profit
strategy.entry("Buy", strategy.long, when = buyCondition)
strategy.exit("Sell", from_entry="Buy", loss=stopLossLevel, profit=takeProfitLevel)

// Plot moving averages on the chart
plot(maShort, color=color.blue, title="Short MA")
plot(maLong, color=color.red, title="Long MA")
```

> Detail

https://www.fmz.com/strategy/436140

> Last Modified

2023-12-21 15:52:57
