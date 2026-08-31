
> Name

MA-Rejection-Strategy-with-ADX-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5f33ce679fd0fdec04.png)


#### Overview
This strategy utilizes multiple moving averages (MA) as the primary trading signals and incorporates the Average Directional Index (ADX) as a filter. The main idea behind the strategy is to identify potential long and short opportunities by comparing the relationships between the fast MA, slow MA, and average MA. Simultaneously, the ADX indicator is used to filter out market environments with sufficient trend strength, enhancing the reliability of trading signals.

#### Strategy Principle
1. Calculate the fast MA, slow MA, and average MA.
2. Identify potential long and short levels by comparing the closing price with the slow MA.
3. Confirm long and short levels by comparing the closing price with the fast MA.
4. Manually calculate the ADX indicator to measure trend strength.
5. Generate a long entry signal when the fast MA crosses above the average MA, the ADX is above a set threshold, and a long level is confirmed.
6. Generate a short entry signal when the fast MA crosses below the average MA, the ADX is above a set threshold, and a short level is confirmed.
7. Generate a long exit signal when the closing price crosses below the slow MA; generate a short exit signal when the closing price crosses above the slow MA.

#### Strategy Advantages
1. Using multiple MAs allows for a more comprehensive capture of market trends and momentum changes.
2. By comparing the relationships between the fast MA, slow MA, and average MA, potential trading opportunities can be identified.
3. Utilizing the ADX indicator as a filter helps avoid generating excessive false signals in choppy markets, improving the reliability of trading signals.
4. The strategy logic is clear and easy to understand and implement.

#### Strategy Risks
1. In situations where the trend is unclear or the market is choppy, the strategy may generate numerous false signals, leading to frequent trades and losses.
2. The strategy relies on lagging indicators such as MA and ADX, potentially missing early trend formation opportunities.
3. The performance of the strategy is significantly influenced by parameter settings (e.g., MA lengths and ADX threshold), requiring optimization based on different markets and instruments.

#### Strategy Optimization Directions
1. Consider incorporating other technical indicators, such as RSI and MACD, to enhance the reliability and diversity of trading signals.
2. Set different parameter combinations for various market environments to adapt to market changes.
3. Introduce risk management measures, such as stop-loss and position sizing, to control potential losses.
4. Combine fundamental analysis, such as economic data and policy changes, to gain a more comprehensive market perspective.

#### Summary
The MA Rejection Strategy with ADX Filter utilizes multiple MAs and the ADX indicator to identify potential trading opportunities and filter out low-quality trading signals. The strategy logic is clear and easy to understand and implement. However, when applying the strategy in practice, it is essential to consider market environment changes and combine other technical indicators and risk management measures for optimization.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-01 00:00:00
end: 2024-04-30 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gavinc745

//@version=5
strategy("MA Rejection Strategy with ADX Filter", overlay=true)

// Input parameters
fastMALength = input.int(10, title="Fast MA Length", minval=1)
slowMALength = input.int(50, title="Slow MA Length", minval=1)
averageMALength = input.int(20, title="Average MA Length", minval=1)
adxLength = input.int(14, title="ADX Length", minval=1)
adxThreshold = input.int(20, title="ADX Threshold", minval=1)

// Calculate moving averages
fastMA = ta.wma(close, fastMALength)
slowMA = ta.wma(close, slowMALength)
averageMA = ta.wma(close, averageMALength)

// Calculate ADX manually
dmPlus = high - high[1]
dmMinus = low[1] - low
trueRange = ta.tr

dmPlusSmoothed = ta.wma(dmPlus > 0 and dmPlus > dmMinus ? dmPlus : 0, adxLength)
dmMinusSmoothed = ta.wma(dmMinus > 0 and dmMinus > dmPlus ? dmMinus : 0, adxLength)
trSmoothed = ta.wma(trueRange, adxLength)

diPlus = dmPlusSmoothed / trSmoothed * 100
diMinus = dmMinusSmoothed / trSmoothed * 100
adx = ta.wma(math.abs(diPlus - diMinus) / (diPlus + diMinus) * 100, adxLength)

// Identify potential levels
potentialLongLevel = low < slowMA and close > slowMA
potentialShortLevel = high > slowMA and close < slowMA

// Confirm levels
confirmedLongLevel = potentialLongLevel and close > fastMA
confirmedShortLevel = potentialShortLevel and close < fastMA

// Entry signals
longEntry = confirmedLongLevel and ta.crossover(fastMA, averageMA) and adx > adxThreshold
shortEntry = confirmedShortLevel and ta.crossunder(fastMA, averageMA) and adx > adxThreshold

// Exit signals
longExit = ta.crossunder(close, slowMA)
shortExit = ta.crossover(close, slowMA)

// Plot signals
plotshape(longEntry, title="Long Entry", location=location.belowbar, style=shape.triangleup, size=size.small, color=color.green)
plotshape(shortEntry, title="Short Entry", location=location.abovebar, style=shape.triangledown, size=size.small, color=color.red)

// Plot moving averages and ADX
plot(fastMA, title="Fast MA", color=color.blue)
plot(slowMA, title="Slow MA", color=color.red)
plot(averageMA, title="Average MA", color=color.orange)
// plot(adx, title="ADX", color=color.purple)
// hline(adxThreshold, title="ADX Threshold", color=color.gray, linestyle=hline.style_dashed)

// Execute trades
if longEntry
    strategy.entry("Long", strategy.long)
else if longExit
    strategy.close("Long")

if shortEntry
    strategy.entry("Short", strategy.short)
else if shortExit
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/451702

> Last Modified

2024-05-17 10:35:58
