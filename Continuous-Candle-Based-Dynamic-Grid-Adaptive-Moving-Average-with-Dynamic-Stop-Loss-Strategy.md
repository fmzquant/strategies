
> Name

Continuous-Candle-Based-Dynamic-Grid-Adaptive-Moving-Average-with-Dynamic-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1574aeba2e63a0e98e5.png)


#### Overview
This strategy is based on the trend of continuous candles. It determines whether to enter a position by comparing the current closing price with the closing prices of the previous three candles. When three consecutive candles are rising, it enters a long position, otherwise it closes the position. At the same time, this strategy adopts a dynamic stop loss method, where the stop loss level is determined based on the entry price and a set stop loss percentage. This method allows for dynamic adjustment of the stop loss level, better controlling risk.

#### Strategy Principle
1. By comparing the current closing price with the closing prices of the previous three candles, it determines whether the condition of three consecutive rising or falling candles is met.
2. If the condition of three consecutive rising candles is met, it enters a long position at the open of the fourth candle.
3. After entering a position, the stop loss level is calculated based on the entry price and the set stop loss percentage.
4. If the condition of three consecutive falling candles is met or the price reaches the stop loss level, the position is closed.

#### Strategy Advantages
1. This strategy makes judgments based on the trend of continuous candles, allowing it to capture trending opportunities in the market.
2. It adopts a dynamic stop loss method, adjusting the stop loss level in real-time based on the entry price and stop loss percentage, which can better control risk.
3. The strategy logic is clear and easy to understand and implement.
4. It is applicable to various markets and instruments, possessing a certain universality.

#### Strategy Risks
1. This strategy relies on the trend judgment of continuous candles. If the market experiences fluctuations or non-trending behavior, it may result in frequent opening and closing of positions, increasing transaction costs.
2. The setting of the stop loss level depends on the selection of the stop loss percentage. If chosen improperly, it may lead to premature or delayed stop losses, affecting strategy performance.
3. This strategy does not consider the characteristics of the traded instruments, such as volatility and liquidity. In practical application, adjustments need to be made according to specific circumstances.

#### Strategy Optimization Directions
1. Introduce more technical indicators, such as moving averages, MACD, etc., as auxiliary judgment conditions to improve the accuracy of opening and closing positions.
2. Perform parameter optimization on the stop loss percentage to find the optimal stop loss setting and improve the risk control capability of the strategy.
3. Consider adding position management logic to dynamically adjust positions based on factors such as market volatility and account funds, improving the efficiency of capital utilization.
4. For different trading instruments and market characteristics, optimize strategy parameters separately to improve the adaptability of the strategy.

#### Summary
This strategy makes decisions on opening and closing positions based on the trend judgment of continuous candles, while adopting a dynamic stop loss method to control risk. The strategy logic is clear, easy to understand and implement, and is applicable to various markets and instruments. However, in practical application, attention needs to be paid to the risk of non-trending markets, and parameters such as stop loss percentage need to be optimized. In addition, introducing more technical indicators, position management, and other methods can further improve strategy performance.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-28 00:00:00
end: 2024-06-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("4 Candle Entry and Exit Strategy", overlay=true)

// Define the stop loss percentage
stopLossPercent = input.float(11, title="Stop Loss Percentage", minval=0.1) / 100

// Identify if the previous 3 candles are consecutively higher
longCondition = close[3] > close[4] and close[2] > close[3] and close[1] > close[2]

// Identify if the previous 3 candles are consecutively lower
exitCondition = close[3] < close[4] and close[2] < close[3] and close[1] < close[2]

// Initialize the entry price and stop loss variables
var float entryPrice = na
var float stopLoss = na

// Update the entry price and stop loss if the long condition is met
if (longCondition)
    entryPrice := close[1]
    stopLoss := entryPrice * (1 - stopLossPercent)

// Enter the long position at the open of the 4th candle
if (longCondition)
    strategy.entry("Long", strategy.long, qty=1)

// Exit the position if exit condition is met or stop loss is hit
if (exitCondition or (strategy.position_size > 0 and low <= stopLoss))
    strategy.close("Long")

// Optional: Plot the entry and exit signals on the chart
plotshape(series=longCondition, location=location.belowbar, color=color.green, style=shape.labelup, title="Buy Signal", text="BUY")
plotshape(series=exitCondition, location=location.abovebar, color=color.red, style=shape.labeldown, title="Sell Signal", text="SELL")

```

> Detail

https://www.fmz.com/strategy/453264

> Last Modified

2024-06-03 16:16:15
