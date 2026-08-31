
> Name

趋势过滤Pin-Bar反转策略-Trend-Filtered-Pin-Bar-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c2f7d3bb94b33811a3.png)

#### Overview
This strategy primarily aims to identify potential market reversal points by recognizing a specific candlestick pattern called the Pin Bar. A Pin Bar is characterized by a long shadow and a small body, indicating significant market volatility at that price level, but ultimately the price retraces, suggesting that the level may act as a support or resistance. The strategy utilizes a 50-period Simple Moving Average (SMA) to determine the current trend direction and a 20-period SMA of volume as a filter, requiring the volume to be above this average for a Pin Bar signal to be considered valid. Additionally, the Relative Strength Index (RSI) is calculated but not directly used in entry/exit conditions, serving instead as an optional further filtering condition.

#### Strategy Principles
1. First, determine the relative size of the Pin Bar's upper and lower shadows and body, requiring the upper or lower shadow to be at least 60% of the entire candlestick's high-low range, while the body should not exceed 30%.
2. Compare the closing and opening prices to determine if the Pin Bar is bullish or bearish.
3. Use the 50-period SMA to identify the current trend, considering it an uptrend when the closing price is above the SMA and a downtrend when below.
4. Set the 20-period volume SMA as the threshold for the volume filter, only considering a Pin Bar signal valid if the volume at its occurrence is greater than this value.
5. Plot the identified bullish and bearish Pin Bars.
6. Enter a long position when a bullish Pin Bar appears and a short position when a bearish Pin Bar appears.
7. Set the stop loss to twice the size of the Pin Bar's body and the take profit to three times. For long positions, place the stop loss below the Pin Bar's low and the take profit above its high; vice versa for short positions.

#### Advantage Analysis
1. The Pin Bar is a highly intuitive and effective price reversal pattern, capable of accurately capturing sudden changes in market sentiment.
2. The trend filter ensures that Pin Bar signals align with the current trend direction, significantly improving the signal's win rate.
3. The volume condition filters out market noise with insufficient liquidity, ensuring that Pin Bar signals have adequate market participation.
4. The stop loss and take profit positions are set based on the Pin Bar's characteristics, providing a reasonable risk-reward ratio.
5. The code logic and rules are clear and easy to understand and implement.

#### Risk Analysis
1. The reliability of Pin Bar signals may be greatly diminished in choppy markets, where the trend filter is less effective.
2. Pin Bars may fail in the face of exceptionally strong bearish or bullish events.
3. The trading frequency is relatively low, potentially leading to insufficient backtest samples.
4. Default parameters may require further optimization for specific instruments and timeframes.
5. As a single-signal system, the overall risk is relatively high.

#### Optimization Directions
1. Consider introducing other reversal patterns such as Inside Bars to enrich signal sources.
2. Use volatility indicators like ATR to dynamically adjust stop loss and take profit positions to adapt to different market conditions.
3. Implement a percentage trailing stop to maximize profits.
4. Incorporate more fundamental data, such as economic calendars and significant events, to filter out potentially invalid signals.
5. Introduce a money management module to control the risk exposure of each trade.

#### Summary
This Pin Bar reversal strategy employs a simple and effective approach, using trend filtering and volume filtering to improve signal recognition accuracy. Although there is room for improvement, the overall concept is viable and worthy of further optimization and testing. As a classic price pattern, the Pin Bar can also be combined with other indicators or signals to achieve a more robust trading system.



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
strategy("Filtered Pin Bar Strategy with Relaxed Volume", overlay=true)

// Define the size of the pin bar's wick and body
wickSize = 0.6
bodySize = 0.3

// Calculate the size of the wicks and body
upperWick = high - math.max(open, close)
lowerWick = math.min(open, close) - low
body = math.abs(close - open)

// Define a simple moving average to determine the trend
smaLength = 50
sma = ta.sma(close, smaLength)

// Define a more relaxed volume threshold
volumeThreshold = ta.sma(volume, 20) * 1.0

// Define RSI parameters
rsiLength = 14
rsiOverbought = 70
rsiOversold = 30
rsi = ta.rsi(close, rsiLength)

// Define the conditions for a bullish pin bar
bullishPinBar = (lowerWick > (wickSize * (high - low))) and
     (body < (bodySize * (high - low))) and
     (close > open) and
     (close > sma) and
     (volume > volumeThreshold)

// Define the conditions for a bearish pin bar
bearishPinBar = (upperWick > (wickSize * (high - low))) and
     (body < (bodySize * (high - low))) and
     (close < open) and
     (close < sma) and
     (volume > volumeThreshold)

// Plot the bullish and bearish pin bars on the chart
plotshape(series=bullishPinBar, title="Bullish Pin Bar", location=location.belowbar, color=color.green, style=shape.labelup, text="PB")
plotshape(series=bearishPinBar, title="Bearish Pin Bar", location=location.abovebar, color=color.red, style=shape.labeldown, text="PB")

// Entry and exit rules
if (bullishPinBar)
    strategy.entry("Bullish Pin Bar", strategy.long)
if (bearishPinBar)
    strategy.entry("Bearish Pin Bar", strategy.short)

// Optional: Set stop loss and take profit
stopLoss = 2 * body
takeProfit = 3 * body
strategy.exit("Exit Long", from_entry="Bullish Pin Bar", stop=low - stopLoss, limit=high + takeProfit)
strategy.exit("Exit Short", from_entry="Bearish Pin Bar", stop=high + stopLoss, limit=low - takeProfit)

```

> Detail

https://www.fmz.com/strategy/453669

> Last Modified

2024-06-07 16:48:23
