
> Name

No-Upper-Wick-Bullish-Candle-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/f64c7295f2e913d182.png)

#### Overview
The main idea of this strategy is to find bullish candles without upper wicks as buy signals and close positions when the price breaks below the low of the previous candle. The strategy utilizes the characteristic of bullish candles with very small upper wicks, indicating strong bullish momentum and a higher probability of continued price increases. At the same time, using the low of the previous candle as a stop-loss level can effectively control risk.

#### Strategy Principles
1. Determine if the current candle is a bullish candle (close price higher than open price)
2. Calculate the ratio of the current candle's upper wick length to its body length
3. If the upper wick ratio is less than 5%, consider it a valid bullish candle without an upper wick and generate a buy signal
4. Record the lowest price of the previous candle after buying as the stop-loss level
5. When the price breaks below the stop-loss level, close the position and exit

#### Strategy Advantages
1. Selecting bullish candles without upper wicks for entry, the trend strength is greater and the success rate is higher
2. Using the low of the previous candle as the stop-loss level, risks are controllable
3. Simple logic, easy to implement and optimize
4. Suitable for use in trending markets

#### Strategy Risks
1. There may be cases where a buy signal is followed by an immediate pullback triggering the stop-loss
2. For highly volatile instruments, the stop-loss level may be set too close to the buy price, leading to premature stop-outs
3. Lack of profit targets, making it difficult to grasp the optimal exit timing

#### Strategy Optimization Directions
1. Combine with other indicators such as MA, MACD, etc., to confirm trend strength and improve the effectiveness of entry signals
2. For highly volatile instruments, set the stop-loss level at a further position, such as the lowest point of the previous N candles, to reduce the stop-loss frequency
3. Introduce profit targets, such as N times ATR or percentage gains, to lock in profits in a timely manner
4. Consider adding position management, such as adjusting position size based on signal strength

#### Summary
This strategy captures profits effectively in trending markets by selecting bullish candles without upper wicks for entry and using the low of the previous candle for stop-loss. However, the strategy also has certain limitations, such as inflexible stop-loss placement and lack of profit targets. Improvements can be made by introducing other indicators to filter signals, optimizing stop-loss positions, and setting profit targets to make the strategy more robust and effective.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-13 00:00:00
end: 2024-05-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © nagpha

//@version=5
strategy("My strategy", overlay=true, margin_long=100, margin_short=100)

candleBodySize = math.abs(open - close)

// Calculate candle wick size
candleWickSize = high - close

// Calculate percentage of wick to candle body
wickPercentage = (candleWickSize / candleBodySize) * 100

// Check if candle is bullish and wick is less than 1% of the body
isBullish = close > open
isWickLessThan5Percent = wickPercentage < 5


longCondition = isBullish and isWickLessThan5Percent

if (longCondition)
    // log.info("long position taken")
    strategy.entry("Long Entry", strategy.long)

float prevLow = 0.0
prevLow := request.security(syminfo.tickerid, timeframe.period, low[1], lookahead=barmerge.lookahead_on)

float closingPrice = close
//plot(closingPrice, "Close Price", color.purple, 3)
//plot(prevLow, "Previous Low", color.red, 3)
//log.info("Outside: {0,number,#}",closingPrice)
//log.info("Outside: {0,number,#}",prevLow)

if closingPrice < prevLow and strategy.position_size > 0
    //log.info("inside close: {0,number} : {0,number}",closingPrice,prevLow)
    // log.info("position exited")
    strategy.close("Long Entry")
    longCondition := false
    prevLow := 0
    isBullish := false

//plot(series=strategy.position_size > 0 ? prevLow : na, color = color.new(#40ccfb,0), style=plot.style_cross,linewidth = 5)
```

> Detail

https://www.fmz.com/strategy/451396

> Last Modified

2024-05-14 16:11:10
