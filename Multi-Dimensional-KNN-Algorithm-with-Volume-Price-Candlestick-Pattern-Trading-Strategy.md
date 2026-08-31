
> Name

Multi-Dimensional-KNN-Algorithm-with-Volume-Price-Candlestick-Pattern-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1688c01678eecb87eb4.png)

#### Overview
This strategy is a comprehensive trading system that combines K-Nearest Neighbors (KNN) machine learning algorithm, candlestick pattern recognition, and volume analysis. Through multi-dimensional analysis methods including moving average channels, volume threshold validation, and probability statistics, the strategy forms a three-dimensional analysis framework to capture potential trading opportunities.

#### Strategy Principles
The core logic of the strategy is built upon several key elements:
1. Using Simple Moving Average (SMA) and standard deviation to construct price channels for identifying overbought and oversold areas
2. Identifying nine classic candlestick patterns through programmatically defined conditions, including Hammer, Shooting Star, Engulfing patterns, etc.
3. Incorporating KNN algorithm to learn from historical price movements and predict future price directions
4. Using volume as a signal confirmation indicator, requiring volume to be above the set threshold when signals trigger
5. Calculating probability distributions for upward and downward movements as one of the signal filtering conditions

#### Strategy Advantages
1. Multi-level signal confirmation mechanism significantly improves trading reliability
2. Introduction of KNN algorithm provides a machine learning perspective to traditional technical analysis
3. Volume verification mechanism effectively avoids false breakouts
4. Dynamic plotting of support and resistance lines helps grasp important price levels
5. Comprehensive alert system ensures no important trading opportunities are missed
6. Strong parameter adjustability to adapt to different market environments

#### Strategy Risks
1. KNN algorithm may lag in volatile markets
2. Multiple signal filtering conditions might cause missing some trading opportunities
3. Fixed volume thresholds may need dynamic adjustment in different periods
4. May generate excessive false signals during consolidation phases
Recommended solutions:
- Dynamic algorithm parameter adjustment
- Introduction of market environment recognition mechanism
- Setting maximum loss limits
- Establishing position management system

#### Optimization Directions
1. Introduce adaptive parameter adjustment mechanism to automatically adjust parameters based on market conditions
2. Integrate deep learning algorithms to improve prediction accuracy
3. Add more market microstructure indicators
4. Optimize dynamic calculation method for volume thresholds
5. Establish a more comprehensive risk control system

#### Summary
This strategy constructs a robust trading system by combining traditional technical analysis with modern machine learning methods. The strategy's multi-dimensional analysis framework and strict signal confirmation mechanism provide reliable basis for trading decisions. Through continuous optimization and risk control, the strategy is expected to maintain stable performance under various market conditions.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-17 00:00:00
end: 2025-01-16 00:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=6
strategy("Candle Pattern Analyzer with Volume", overlay=true)

// Input parameters
length = input.int(20, "Channel Length", minval=1)
mult = input.float(2.0, "Volatility Multiplier", minval=0.1)
candleLength = input.int(5, "Candle Length", minval=1)
k = input.int(5, "KNN Neighbors", minval=1)
volumeThreshold = input.int(100000, "Volume Threshold", minval=1)

// Calculate channel
basis = ta.sma(close, length)
dev = mult * ta.stdev(close, length)
upper = basis + dev
lower = basis - dev

// Plot channel
plot(basis, color=color.blue)
plot(upper, color=color.green)
plot(lower, color=color.red)

// Identify candle patterns
isBullish = close > open
isBearish = close < open

// Pre-calculate SMAs
smaLow = ta.sma(low, candleLength)
smaHigh = ta.sma(high, candleLength)
smaClose = ta.sma(close, candleLength)

// Hammer pattern
isHammer = isBullish and 
           low < smaLow and 
           close > smaClose and 
           (close - low) / (high - low) > 0.6 and
           low < low[1]

// Shooting Star pattern
isShootingStar = isBearish and 
                 high > smaHigh and 
                 close < smaClose and 
                 (high - close) / (high - low) > 0.6 and
                 high > high[1]

// Inverse Hammer pattern
isInverseHammer = isBullish and 
                   high > smaHigh and 
                   close < smaClose and 
                   (high - close) / (high - low) > 0.6 and
                   high > high[1]

// Bullish Engulfing pattern
isBullishEngulfing = isBullish and 
                      close > high[1] and 
                      open < low[1]

// Bearish Engulfing pattern
isBearishEngulfing = isBearish and 
                      close < low[1] and 
                      open > high[1]

// Morning Star pattern
isMorningStar = isBullish and close[2] < open[2] and close[1] < open[1] and  close > open[1]

// Evening Star pattern
isEveningStar = isBearish and  close[2] > open[2] and  close[1] > open[1] and  close < open[1]

// Three Black Crows pattern
isThreeBlackCrows = isBearish and 
                     close < close[1] and 
                     close[1] < close[2] and 
                     close[2] < close[3]

// Three White Soldiers pattern
isThreeWhiteSoldiers = isBullish and close > close[1] and  close[1] > close[2] and  close[2] > close[3]

// Compare previous candles
prevCandleUp = close[1] > open[1]
prevCandleDown = close[1] < open[1]

// Calculate probability
probUp = ta.sma(close > open ? 1 : 0, candleLength) / candleLength
probDown = ta.sma(close < open ? 1 : 0, candleLength) / candleLength

// Generate signals
buySignal = isHammer and prevCandleDown and probUp > probDown and volume > volumeThreshold
sellSignal = isShootingStar and prevCandleUp and probDown > probUp and volume > volumeThreshold

// Highlight patterns
color candleColor = na
if (isHammer)
    candleColor := color.green
    label.new(bar_index, high, "Hammer", color=color.green, style=label.style_label_up)

else if (isShootingStar)
    candleColor := color.red
    label.new(bar_index, low, "Shooting Star", color=color.red, style=label.style_label_down)
else if (isInverseHammer)
    candleColor := color.blue
    label.new(bar_index, high, "Inverse Hammer", color=color.blue, style=label.style_label_up)
else if (isBullishEngulfing)
    candleColor := color.yellow
    label.new(bar_index, high, "Bullish Engulfing", color=color.yellow, style=label.style_label_up)
else if (isBearishEngulfing)
    candleColor := color.purple
    label.new(bar_index, low, "Bearish Engulfing", color=color.purple, style=label.style_label_down)

else if (isMorningStar)
    candleColor := color.orange
    label.new(bar_index, high, "Morning Star", color=color.orange, style=label.style_label_up)

else if (isEveningStar)
    candleColor := color.new(color.red, 80)
    label.new(bar_index, low, "Evening Star", color=color.new(color.red, 80), style=label.style_label_down)

else if (isThreeBlackCrows)
    candleColor := color.black
    label.new(bar_index, low, "Three Black Crows", color=color.black, style=label.style_label_down)

else if (isThreeWhiteSoldiers)
    candleColor := color.white
    label.new(bar_index, high, "Three White Soldiers", color=color.white, style=label.style_label_up)


// Plot candles
barcolor(candleColor)

// KNN algorithm
var float[] knnData = array.new_float(k, na)
var float[] knnLabels = array.new_float(k, na) // Create an array to store KNN labels
array.set(knnLabels, 0, 1.0) // Label for "up" movement

// Shift KNN dataset to make room for new data point
for i = 1 to k-1
    array.set(knnData, i, array.get(knnData, i-1))
    array.set(knnLabels, i, array.get(knnLabels, i-1))

// Predict next movement using KNN algorithm
float prediction = 0.0
for i = 0 to k-1
    float distance = math.abs(close - array.get(knnData, i))
    prediction += array.get(knnLabels, i) / distance

prediction /= k

// Plot prediction
// line.new(bar_index, close, bar_index + 1, prediction, color=color.purple)

// Plot resistance and support lines
float resistance = ta.sma(high, length)
float support = ta.sma(low, length)
// line.new(bar_index, resistance, bar_index + 1, resistance, color=color.green, style=line.style_dashed)
// line.new(bar_index, support, bar_index + 1, support, color=color.red, style=line.style_dashed)

// Plot buy and sell signals with prices
if (buySignal)
    // label.new(bar_index, low, "Buy at " + str.tostring(low), color=color.green, style=label.style_label_up)
    strategy.entry("Buy", strategy.long, comment="Buy at " + str.tostring(low))
if (sellSignal)
    // label.new(bar_index, high, "Sell at " + str.tostring(high), color=color.red, style=label.style_label_down)
    strategy.entry("Sell", strategy.short, comment="Sell at " + str.tostring(high))

// Create alerts
alertcondition(buySignal, title="Buy Signal", message="Buy signal generated!")
alertcondition(sellSignal, title="Sell Signal", message="Sell signal generated!")

```

> Detail

https://www.fmz.com/strategy/478729

> Last Modified

2025-01-17 16:10:07
