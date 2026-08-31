
> Name

Swing-Trading-Strategy-with-20-50-EMA-Cross

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/124da8d8f33af09df22.png)


## Overview  

This strategy determines the entry and exit points by calculating the golden cross and death cross of the 20-day simple moving average (EMA20) and 50-day simple moving average (EMA50). It goes long when the EMA20 crosses above the EMA50 and goes short when the EMA20 crosses below the EMA50. It also uses stop loss and take profit mechanisms to control risk and reward.

## Strategy Principle

The core indicators of this strategy are the 20-day EMA and 50-day EMA. The EMA20 represents the short-term trend and the EMA50 represents the medium-term trend. When the short-term trend crosses above the medium-term trend, it indicates the market is turning from decline to rise. Going long can make a profit. When the short-term trend crosses below the medium-term trend, it indicates the market is turning from rise to decline. Going short can make a profit. Therefore, the golden cross and death cross formations of the EMA20 and EMA50 are used to determine the entry and exit points.  

Specifically, first calculate the values of the 20-day EMA and 50-day EMA. Then plot the line segments of EMA20 and EMA50 on the chart. When the EMA20 crosses above the EMA50, go long. When the EMA20 crosses below the EMA50, go short. At the same time, input the stop loss percentage and risk-reward ratio to calculate the stop loss price and take profit price. This can effectively control the risk and reward of each trade.

## Advantage Analysis 

The advantages of this strategy are:

1. Using EMA golden cross and death cross to determine entry timing can effectively capture the turning point of trends. 
2. The long and short rules are clear and simple, easy to operate.
3. Use stop loss and take profit to control risk-reward ratio, which is conducive to obtaining stable returns. 
4. High capital utilization efficiency without the need for long-term positions.

## Risk Analysis   

There are also some risks to this strategy:

1. EMA has lagging properties that may miss the best timing of price reversal.  
2. Improper stop loss point settings can lead to unnecessary losses.
3. Sudden events may cause EMA to generate wrong signals.  
4. Backtest data fitting risk. Actual performance may differ from backtest results.

## Optimization

The strategy can be optimized in the following aspects:

1. Test different parameter combinations of EMA to find the optimal parameters. 

2. Combine with other indicators for signal filtering and verification.

3. Dynamically adjust stop loss and take profit ratios. Different ratios can be adopted under different market conditions.  

4. Appropriately shorten the holding period to reduce the probability of being affected by sudden events.


## Conclusion  

The EMA golden cross and death cross swing trading strategy determines entry timing through simple indicators and controls risks using stop loss and take profit. It has high ease of operation and is suitable for active short-term trading. But there are also some problems that can be further improved by parameter optimization, signal filtering and other means to increase the profit factor of the strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|Stop Loss (%)|
|v_input_float_2|2|Risk-Reward Ratio|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-05 00:00:00
end: 2024-01-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Swing Trading with 20/50 EMA Cross", shorttitle = "EMA Cross", overlay = true)

// Define input for stop-loss and take-profit levels
var float stopLossPct = input.float(1, title = "Stop Loss (%)") / 100
var float rewardRiskRatio = input.float(2, title = "Risk-Reward Ratio")
takeProfitPct = stopLossPct * rewardRiskRatio

// Calculate EMA values
ema20 = ta.ema(close, 20)
ema50 = ta.ema(close, 50)

// Plot EMAs on the chart
plot(ema20, title = "20 EMA", color = color.blue)
plot(ema50, title = "50 EMA", color = color.red)

// Trading conditions
longCondition = ta.crossover(ema20, ema50)
shortCondition = ta.crossunder(ema20, ema50)

// Execute long and short trades
strategy.entry("Long", strategy.long, when = longCondition)
strategy.entry("Short", strategy.short, when = shortCondition)

// Calculate stop-loss and take-profit levels based on risk-reward ratio
stopLossPrice = close * (1 - stopLossPct)
takeProfitPrice = close * (1 + takeProfitPct)

strategy.exit("Take Profit/Stop Loss", stop = stopLossPrice, limit = takeProfitPrice)

```

> Detail

https://www.fmz.com/strategy/438459

> Last Modified

2024-01-12 11:22:33
