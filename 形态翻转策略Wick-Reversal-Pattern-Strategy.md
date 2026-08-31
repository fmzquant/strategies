
> Name

形态翻转策略Wick-Reversal-Pattern-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The wick reversal pattern strategy identifies reversal points where the price switches from an uptrend to a downtrend or vice versa by detecting candlestick patterns. It enters long or short positions around the reversal points mainly based on the ratio between candle wicks and bodies.

## Strategy Logic

The core logic of this strategy is to detect the ratio between candle wick and body to identify potential reversal patterns. 

When there is a bearish candle, if the lower wick is much longer than the upper wick and body, it indicates strong buying pressure and the price may reverse to upside. Specifically, it detects long lower wick compared to upper wick and body by a certain multiplier to generate long signals.

Conversely, when there is a bullish candle, if the upper wick is much longer than the lower wick and body, it indicates strong selling pressure and the price may reverse to downside. Specifically, it detects long upper wick compared to lower wick and body by a certain multiplier to generate short signals.

Besides, a long wick with tiny body could also produce reversal signals.

The detection is filtered by comparing against average candle range to avoid false signals during sideways markets. Only candles with range greater than average will produce signals.

## Advantages

- Detect reversal patterns by comparing wick and body ratios 
- Identify both long and short reversal signals
- Avoid false signals during sideways with average range filter
- Simple and intuitive pattern recognition logic

## Risks

- Wick and body ratio parameters need fine tuning based on experience
- Judging reversal merely based on single candle pattern can be misled by local fluctuations
- Lack of trend bias may cause losses from counter trend trades

Consider incorporating trend indicators to avoid counter trend trades. Combining with other technical indicators may help confirm signals. Parameters can be optimized through backtesting.

## Enhancement

- Add trend bias to ensure reversals align with trend direction
- Incorporate other indicators like Bollinger Bands to confirm signals
- Utilize machine learning to auto optimize wick and body ratio parameters
- Set stop loss and take profit after reversal to optimize exits

## Summary

The wick reversal pattern strategy effectively identifies reversal patterns and catches turning points using simple pattern recognition. However, relying solely on single candle patterns can be misleading. Combining with other technical indicators and adding trend bias helps avoid counter trend trades and improves strategy stability. Parameter optimization and stop loss/take profit also help further enhance the strategy. In summary, the wick reversal strategy provides a simple and practical idea but needs to be complemented with other techniques to maximize performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3.25|wickMultiplier|
|v_input_2|0.35|bodyPercentage|
|v_input_3|50|barsBack|
|v_input_4|1.1|bodyMultiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-08 00:00:00
end: 2023-10-15 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © adiwajshing

//@version=4
strategy("Wick Reversal Signal", overlay=true)

wickMultiplier = input(3.25)
bodyPercentage = input(0.35)
barsBack = input(50)
bodyMultiplier = input(1.1)

myCandleSize = high-low
averageCandleSize = rma(myCandleSize, barsBack)

longSignal = close > open and open-low >= (close-open)*wickMultiplier and high-close <= (high-low)*bodyPercentage and high-low >= averageCandleSize*bodyMultiplier
longSignal := longSignal or (close < open and close-low >= (open-close)*wickMultiplier and high-close <= (high-low)*bodyPercentage and high-low >= averageCandleSize*bodyMultiplier)
longSignal := longSignal or (abs(close-open) < 0.01 and close != high and high-low >= (high-close)*wickMultiplier and high-close <= (high-low)*bodyPercentage and high-low >= averageCandleSize*bodyMultiplier)

shortSignal = close < open and high-open >= (open-close)*wickMultiplier and close-low <= (high-low)*bodyPercentage and high-low >= averageCandleSize*bodyMultiplier
shortSignal := shortSignal or (close > open and high-close >= (close-open)*wickMultiplier and close-low <= (high-low)*bodyPercentage and high-low >= averageCandleSize*bodyMultiplier)
shortSignal := shortSignal or (abs(close-open) < 0.01 and close != low and high-low >= (close-low)*wickMultiplier and close-low <= (high-low)*bodyPercentage and high-low >= averageCandleSize*bodyMultiplier)

plotshape(longSignal, style=shape.triangleup, size=size.normal)
plotshape(shortSignal, style=shape.triangledown, size=size.normal)

strategy.entry("LONG", strategy.long, when=longSignal)
strategy.entry("SHORT", strategy.short, when=shortSignal)
```

> Detail

https://www.fmz.com/strategy/429333

> Last Modified

2023-10-16 08:58:12
