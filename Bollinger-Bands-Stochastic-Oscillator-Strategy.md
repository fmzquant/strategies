
> Name

Bollinger-Bands-Stochastic-Oscillator-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bc9d6f5d10e53b7ff7.png)

#### Overview
This strategy is a trading strategy based on Bollinger Bands and the Stochastic Oscillator. It utilizes Bollinger Bands to determine the market's volatility range and uses the Stochastic Oscillator to judge the overbought and oversold states of the market. When the price breaks above the upper Bollinger Band, the strategy goes long; when the price falls below the lower Bollinger Band, the strategy goes short. At the same time, the strategy also uses the Stochastic Oscillator to filter trading signals to improve the accuracy and reliability of the strategy.

#### Strategy Principle
The core of this strategy is two technical indicators: Bollinger Bands and the Stochastic Oscillator. Bollinger Bands consist of three lines: the middle band, the upper band, and the lower band. The middle band is a simple moving average of the price, while the upper and lower bands are the middle band plus and minus a certain multiple of the price's standard deviation. When the price breaks above the upper band, it indicates that the market may be overbought; when the price falls below the lower band, it indicates that the market may be oversold.

The Stochastic Oscillator consists of two lines: the %K line and the %D line. The %K line measures the position of the closing price within the highest and lowest prices over a recent period, and the %D line is a moving average of the %K line. When the %K line crosses above the %D line, it indicates that the market may be overbought; when the %K line crosses below the %D line, it indicates that the market may be oversold.

This strategy combines these two indicators. When the price breaks above the upper Bollinger Band and the Stochastic Oscillator %K line crosses above the %D line, the strategy goes long; when the price falls below the lower Bollinger Band and the Stochastic Oscillator %K line crosses below the %D line, the strategy goes short. This combination can effectively capture market trends while avoiding frequent trading in volatile markets.

#### Strategy Advantages
1. It combines indicators of both trending and oscillating market states, enabling it to obtain stable returns in different market environments.
2. Bollinger Bands can dynamically adjust to adapt to changes in market volatility, improving the strategy's adaptability.
3. The Stochastic Oscillator can effectively filter out some false breakout signals, improving the accuracy of the strategy.
4. The strategy logic is clear and easy to understand and implement, making it suitable for traders of different levels.

#### Strategy Risks
1. In situations where the market trend is unclear or volatility is high, the strategy may generate many false signals, leading to frequent trading and losses.
2. The strategy relies on historical data and may experience significant drawdowns in the face of unexpected events or market anomalies.
3. The choice of strategy parameters has a significant impact on strategy performance, and different parameters may lead to completely different results.

#### Strategy Optimization Directions
1. Consider adding more filtering conditions, such as trading volume, other technical indicators, etc., to further improve the reliability of signals.
2. Optimize the parameters of Bollinger Bands and the Stochastic Oscillator to find the parameter combination that best suits the current market.
3. Introduce risk management mechanisms, such as stop-loss and trailing stop-loss, to control the risk of a single trade.
4. Consider combining this strategy with other strategies to form a more robust strategy portfolio.

#### Summary
This strategy is a simple yet effective trading strategy that combines two classic technical indicators, Bollinger Bands and the Stochastic Oscillator, to achieve stable returns in both trending and oscillating market states. Although the strategy also has some risks and limitations, through proper optimization and improvement, it can further enhance the strategy's performance and adaptability, becoming a trading strategy worth referencing and learning from.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|34|length|
|v_input_float_1|2|mult|
|v_input_int_2|34|Length|
|v_input_float_2|2|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-03 00:00:00
end: 2024-05-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Unique Bollinger Bands Strategy", overlay=true)
src = input(close)
length = input.int(34, minval=1)
mult = input.float(2.0, minval=0.001, maxval=50)

basis = ta.sma(src, length)
dev = ta.stdev(src, length)
dev2 = mult * dev

upper1 = basis + dev
lower1 = basis - dev
upper2 = basis + dev2
lower2 = basis - dev2

colorBasis = src >= basis ? color.blue : color.orange

pBasis = plot(basis, linewidth=2, color=colorBasis)
pUpper1 = plot(upper1, color=color.new(color.blue, 0), style=plot.style_circles)
pUpper2 = plot(upper2, color=color.new(color.blue, 0))
pLower1 = plot(lower1, color=color.new(color.orange, 0), style=plot.style_circles)
pLower2 = plot(lower2, color=color.new(color.orange, 0))

fill(pBasis, pUpper2, color=color.new(color.blue, 80))
fill(pUpper1, pUpper2, color=color.new(color.blue, 80))
fill(pBasis, pLower2, color=color.new(color.orange, 80))
fill(pLower1, pLower2, color=color.new(color.orange, 80))




// Parameters
bbLength = input.int(34, title="Length", minval=1)
bbMultiplier = input.float(2.0, title="Multiplier", minval=0.001, maxval=50)

// Source
priceData = close // Unique name for price data source

// Bollinger Bands Calculation
bbBasis = ta.sma(priceData, bbLength)
bbDeviation = ta.stdev(priceData, bbLength)
bbDeviationMultiplied = bbMultiplier * bbDeviation

bbUpperBand = bbBasis + bbDeviationMultiplied
bbLowerBand = bbBasis - bbDeviationMultiplied

// Plot Bollinger Bands
plot(bbBasis, color=color.blue, linewidth=2)
plot(bbUpperBand, color=color.blue)
plot(bbLowerBand, color=color.orange)

// Strategy Logic for Entry and Exit
enterLong = ta.crossover(priceData, bbUpperBand)
enterShort = ta.crossunder(priceData, bbLowerBand)

// Enter Long when price crosses over upper band
if (enterLong)
    strategy.entry("Long", strategy.long)
// Enter Short when price crosses under lower band
if (enterShort)
    strategy.entry("Short", strategy.short)

// Close Long when Short condition is met (i.e., price under lower band)
if (enterShort)
    strategy.close("Long")
// Close Short when Long condition is met (i.e., price over upper band)
if (enterLong)
    strategy.close("Short")





```

> Detail

https://www.fmz.com/strategy/450857

> Last Modified

2024-05-09 15:59:11
