
> Name

基于均线支撑阻力和交易量的高级入场条件策略-Advanced-Entry-Strategy-based-on-Moving-Average-Support-Resistance-and-Volume

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14d4ee21e55f608f1d7.png)

#### Overview
This strategy combines three technical indicators: Simple Moving Average (SMA), support and resistance levels, and increased trading volume to construct a comprehensive trading strategy. The main idea of the strategy is to enter trades when the price breaks through the SMA, support/resistance levels, and is accompanied by an increase in trading volume, while setting stop-loss conditions to control risk.

#### Strategy Principle
1. Calculate the SMA, support, and resistance levels for a specified period.
2. Determine if the current trading volume has increased compared to the previous period.
3. Long entry condition: The current closing price is greater than the previous period's closing price, greater than the SMA and support level, and the price is at a certain distance from the resistance level, accompanied by an increase in trading volume.
4. Short entry condition: The current closing price is less than the previous period's closing price, less than the SMA and support level, and the price is at a certain distance from the resistance level, accompanied by an increase in trading volume.
5. Stop-loss condition: The long stop-loss price is the entry price multiplied by (1 - stop-loss percentage), and the short stop-loss price is the entry price multiplied by (1 + stop-loss percentage).

#### Advantage Analysis
1. By combining multiple technical indicators, the strategy's reliability and stability are improved.
2. Considering both price breakouts of the SMA and support/resistance levels allows for better capture of trending opportunities.
3. Introducing the trading volume indicator ensures that price breakouts are accompanied by sufficient market participation, enhancing the effectiveness of the signals.
4. Setting stop-loss conditions effectively controls trading risk.

#### Risk Analysis
1. The calculation of support and resistance levels relies on historical data and may lose effectiveness during significant market fluctuations.
2. The trading volume indicator may experience abnormal fluctuations, leading to false signals.
3. The stop-loss condition setting may not completely avoid losses in extreme market situations.

#### Optimization Direction
1. Consider introducing other technical indicators, such as the Relative Strength Index (RSI) or Moving Average Convergence Divergence (MACD), to further validate the reliability of trading signals.
2. Optimize the calculation method for support and resistance levels, such as adopting a more dynamic approach to adapt to different market conditions.
3. Smooth the trading volume indicator to reduce the impact of abnormal fluctuations on the strategy.
4. Optimize the setting of stop-loss conditions, such as using a trailing stop-loss or dynamically adjusting the stop-loss percentage based on market volatility.

#### Summary
This strategy combines the SMA, support and resistance levels, and trading volume indicators to construct a comprehensive trading strategy. The strategy's advantage lies in its ability to capture trending opportunities while controlling trading risk. However, the strategy also has certain limitations, such as its adaptability to extreme market situations needs improvement. In the future, the strategy can be improved by introducing other technical indicators, optimizing the calculation method for support and resistance levels, smoothing the trading volume indicator, and optimizing stop-loss conditions to enhance its stability and profitability.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-06-08 00:00:00
end: 2024-06-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Advanced Entry Conditions with Support/Resistance, SMA, and Volume", overlay=true)

// Inputs
length = input(20, title="SMA Length")
stopLossPerc = input(1, title="Stop Loss Percentage", type=input.float) / 100
leftBars = input(15, title="Left Bars")
rightBars = input(15, title="Right Bars")
distanceThresh = input(1, title="Distance Threshold from Support/Resistance", type=input.float) / 100

// Calculations
smaValue = sma(close, length)
highUsePivot = fixnan(pivothigh(leftBars, rightBars)[1])
lowUsePivot = fixnan(pivotlow(leftBars, rightBars)[1])

// Volume Calculation
volumeIncrease = volume > volume[1]

// Entry Conditions
longEntryCondition = close[0] > close[1] and close[1] > smaValue and close[0] > smaValue and close[0] > lowUsePivot and close[1] > lowUsePivot and abs(close[0] - highUsePivot) > distanceThresh and volumeIncrease
shortEntryCondition = close[0] < close[1] and close[1] < smaValue and close[0] < smaValue and close[0] < lowUsePivot and close[1] < lowUsePivot and abs(close[0] - highUsePivot) > distanceThresh and volumeIncrease

// Calculate stop loss levels
longStopLoss = close * (1 - stopLossPerc)
shortStopLoss = close * (1 + stopLossPerc)

// Strategy Logic
strategy.entry("Long", strategy.long, when=longEntryCondition)
strategy.exit("Exit Long", "Long", stop=longStopLoss)

strategy.entry("Short", strategy.short, when=shortEntryCondition)
strategy.exit("Exit Short", "Short", stop=shortStopLoss)

// Plotting
plot(smaValue, color=color.blue, title="SMA")
plot(highUsePivot, color=color.red, linewidth=2, title="Resistance")
plot(lowUsePivot, color=color.green, linewidth=2, title="Support")

plotshape(series=longEntryCondition, location=location.belowbar, color=color.green, style=shape.labelup, title="Long Entry")
plotshape(series=shortEntryCondition, location=location.abovebar, color=color.red, style=shape.labeldown, title="Short Entry")

// Background Color
bgcolor(longEntryCondition ? color.new(color.green, 90) : shortEntryCondition ? color.new(color.red, 90) : na)

```

> Detail

https://www.fmz.com/strategy/454148

> Last Modified

2024-06-14 15:40:46
