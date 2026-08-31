
> Name

多重均线突破策略Multi-Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10cbd9bcd878448cb27.png)


### Overview

This strategy generates trading signals based on the breakthrough and callback of multiple moving average lines. It goes long when the price breaks through the upward moving average line and goes short when the price falls below the downward moving average line.  

### Strategy Logic

The code uses 4 moving average lines with different periods - 21-day, 50-day, 100-day and 200-day. It enters long positions when the price breaks through these MA lines and enters short positions when the price falls below these MA lines. In addition, stop loss and take profit levels are set in the strategy. Specifically, the stop loss is set near the lowest point of the previous candle, and the take profit is set at 3 times the distance between the lowest point and the highest point of the previous candle.

The core idea of this strategy is to judge the trend using moving averages. When the price breaks through the upward MA lines, it indicates an upward trend so should go long. When the price falls below the downward MA lines, it indicates a downward trend so should go short. Using multiple MA lines with different periods can judge the trend more accurately and also verify trading signals through consistency of the trend.

### Advantage Analysis 

The main advantages of this strategy are:

1. Using multiple MAs can effectively filter false signals
2. Setting stop loss and take profit can limit single loss  
3. Simple to implement

### Risk Analysis

The main risks of this strategy are:

1. MA strategies are prone to misalignment, thus missing price reversal points  
2. Breakthrough false signals may cause losses
3. Improper stop loss and take profit settings may amplify losses

These risks can be reduced by adjusting MA parameters and optimizing stop loss and take profit.

### Optimization

This strategy can be optimized in the following aspects:

1. Test more MA combinations to find optimal parameters  
2. Add other indicators to avoid false breakouts
3. Optimize stop loss and take profit for better risk-reward ratio 
4. Adjust parameters for different market conditions to make the strategy more robust

### Summary

In general, this is a typical trend following strategy. The advantages are clear logic and easy to understand and implement. The disadvantage is prone to false signals. The strategy can be improved by parameter tuning and adding other indicators. It is suitable for medium-to-long term holding and can also be used as a component of short-term trading strategies.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-15 00:00:00
end: 2023-11-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("DolarBasar by AlperDursun", shorttitle="DOLARBASAR", overlay=true)

// Input for Moving Averages
ma21 = ta.sma(close, 21)
ma50 = ta.sma(close, 50)
ma100 = ta.sma(close, 100)
ma200 = ta.sma(close, 200)

// Calculate the lowest point of the previous candle for stop loss
lowestLow = ta.lowest(low, 2)

// Calculate the highest point of the previous candle for stop loss
highestHigh = ta.highest(high, 2)

// Calculate take profit levels
takeProfitLong = lowestLow - 3 * (lowestLow - highestHigh)
takeProfitShort = highestHigh + 3 * (lowestLow - highestHigh)

// Entry Conditions
longCondition = ta.crossover(close, ma21) or ta.crossover(close, ma50) or ta.crossover(close, ma100) or ta.crossover(close, ma200)
shortCondition = ta.crossunder(close, ma21) or ta.crossunder(close, ma50) or ta.crossunder(close, ma100) or ta.crossunder(close, ma200)

// Stop Loss Levels
stopLossLong = lowestLow * 0.995
stopLossShort = highestHigh * 1.005

// Exit Conditions
longExitCondition = low < stopLossLong or high > takeProfitLong
shortExitCondition = high > stopLossShort or low < takeProfitShort

if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

if (longExitCondition)
    strategy.exit("Long Exit", from_entry="Long", stop=stopLossLong, limit=takeProfitLong)

if (shortExitCondition)
    strategy.exit("Short Exit", from_entry="Short", stop=stopLossShort, limit=takeProfitShort)

```

> Detail

https://www.fmz.com/strategy/432874

> Last Modified

2023-11-22 13:41:38
