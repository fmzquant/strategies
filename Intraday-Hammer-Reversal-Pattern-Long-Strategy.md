
> Name

Intraday-Hammer-Reversal-Pattern-Long-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e08122ee4d83f8aa37.png)

## Overview
This strategy uses the intraday hammer reversal pattern in combination with a subsequent green candle to find potential upside opportunities. When a hammer reversal pattern appears and the next candle is a green upward candle, the strategy opens a long position. The stop loss is set at the low of the hammer candle, and the take profit is set at 1.5 times the entry price.

## Strategy Principles 
The hammer pattern is a common technical pattern that often appears at the end of a downtrend, signaling the arrival of a trend reversal. A typical hammer pattern has the following characteristics:
1. The overall candle body is relatively small, usually less than 30% of the entire candle's high-low range.
2. The lower shadow is long, at least twice the length of the candle body.
3. The upper shadow is very short or nonexistent, at most not exceeding 1% of the candle's opening price.

When the hammer pattern is confirmed, if the next candle is a green upward candle and the low is higher than the low of the hammer candle, a bullish signal is formed and a long position is entered. The stop loss is set at the low of the hammer candle to control risk, and the take profit is set at 1.5 times the entry price to capture potential profits.

## Advantage Analysis
1. The hammer pattern is a common reversal pattern and has a high win rate when used in combination with trend context.
2. Strict restrictions on the hammer pattern and subsequent bullish candle shape improve signal quality.
3. Setting the stop loss at the low of the hammer candle makes risk controllable.
4. Setting the take profit at 1.5R provides a decent risk-reward ratio.

## Risk Analysis  
1. Even if the pattern and subsequent price action satisfy the strategy conditions, there is still a risk of the market repeating or continuing to fall.
2. With the stop loss set close to the low of the hammer candle, a single loss is relatively large once triggered.  
3. Volatility is high in the early stages of a trend reversal, exposing the strategy to high price volatility risk.

## Optimization Directions
1. Consider introducing more technical indicators, such as RSI and MACD, to improve signal validity in combination with indicator status.
2. The definitions of the hammer pattern and subsequent bullish candle can be further optimized, such as introducing more quantitative criteria.
3. Take profit and stop loss settings can be further optimized, such as using dynamic take profit or trailing stop strategies.  
4. Consider market trend conditions, as hammer patterns found in uptrends may have higher win rates.

## Summary
The intraday hammer reversal pattern long strategy makes full use of the reversal characteristics of the hammer pattern, combined with confirmation from a subsequent green candle, to form a bullish signal based on two consecutive candle patterns. At the same time, the strategy uses a fixed risk-reward ratio to control risk exposure and maintain a high risk-reward ratio. However, the strategy's definition of patterns is relatively simple and lacks verification from other technical indicators, which may face a high signal failure rate in practical applications. In addition, because the stop loss is set relatively close, the strategy also faces the problem of high single losses. In the future, the strategy can be further optimized and improved in terms of signal confirmation and risk control to enhance overall stability and profitability.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-09 00:00:00
end: 2024-03-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Hammer Pattern and Follow-Up Green Candle Strategy", overlay=true)

// Detecting a Hammer candle
isHammer() =>
    bodySize = math.abs(close[1] - open[1])
    lowerWickSize = open[1] - low[1]
    upperWickSize = high[1] - open[1] // For a red candle, the upper wick is from the open to the high
    bodyIsSmall = bodySize <= (high[1] - low[1]) * 0.3 // Body is less than 30% of the entire candle range
    lowerWickIsLong = lowerWickSize >= bodySize * 2 // Lower wick is at least twice the body length
    noUpperWick = upperWickSize == 0 or high[1] <= open[1] * 1.01 // No upper wick or very small
    close[1] < open[1] and bodyIsSmall and lowerWickIsLong and noUpperWick

// Check if the current candle is green with no or small tail
isGreenWithNoSmallTail() =>
    close > open

// Entry condition
entryCondition = isHammer() and isGreenWithNoSmallTail() and low >low[1]

// Calculate stop loss and take profit levels
stopLossLevel = low[1]
profitTargetLevel = close * 1.5
//Calculate position bodySize
positionSize = 50000 / close

// Execute strategy
if (entryCondition)
    strategy.entry("Hammer Buy", strategy.long,qty=positionSize)
    strategy.exit("Take Profit / Stop Loss", "Hammer Buy", stop=stopLossLevel, limit=profitTargetLevel)


```

> Detail

https://www.fmz.com/strategy/444985

> Last Modified

2024-03-15 17:13:23
