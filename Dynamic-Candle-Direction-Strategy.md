
> Name

Dynamic-Candle-Direction-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9a2c2147b754744e46.png)



## Overview

This strategy determines future candle direction by analyzing the closing price relative to opening price of past N candles. It takes long or short positions based on candle direction signals.

## Strategy Logic

The core logic of this strategy is:

1. Set parameter NUM_CANDLES to determine the number of candles to analyze. 

2. Define function candle_dir to determine direction of a single candle. close>open is bullish, close<open is bearish, close=open is neutral.

3. Define function count_candles to count number of candles with certain direction in past NUM_CANDLES candles.

4. Count number of bullish, bearish and neutral candles in past NUM_CANDLES candles, store in ups, dns, neu. 

5. Define indic indicator, its value equals ups-dns plus/minus neu. 

6. Determine long/short entry based on indic indicator.

By analyzing candle direction of a certain number of candles, this strategy estimates probability of future candle direction for trading decisions. NUM_CANDLES controls sample size to adjust strategy sensitivity.   

## Advantage Analysis

1. Strategy logic is clear and easy to understand, interpret and verify.

2. Only candle data is needed, reducing computing cost.

3. Easy to adjust sensitivity by tuning NUM_CANDLES parameter.

4. Applicable to all products and timeframes, high adaptability. 

5. Easy to optimize parameters to find best combination.

## Risk Analysis

1. Unable to handle range-bound market, may cause over-trading.

2. Inappropriate sample period may cause signal lag, NUM_CANDLES needs careful tuning.

3. Unable to adapt to trend reversal, risk of loss in reversing trend.

4. Trading cost impact needs consideration to avoid over-trading.

5. Beware of overfitting in parameter optimization, require multi-market verification.

## Optimization Directions

1. Consider adding stop loss to limit loss.

2. Combine with trend indicator to avoid counter-trend trading. 

3. Increase sample size or use lower timeframe to improve stability.

4. Consider multi-market compounding to improve win rate.

5. Utilize machine learning for automatic parameter optimization.

## Conclusion

This strategy determines trade direction by analyzing candle direction, with clear and simple logic. Sensitivity is controllable through parameter tuning. The pros are simplicity, low requirement, and wide adaptability, but some risks exist and further optimization is needed to improve stability. Overall, this strategy provides a simple and practical approach for quantitative trading.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Refined CandleCounter Strategy by origo", overlay=true)

// how many candles to count
NUM_CANDLES = 7

// determine candle direction
candle_dir = close > open ? 1 : (round(close-open) == 0 ? 0 : -1)

// return # of candles with a given direction
count_candles(dir, max) =>
    count = 0
    for i = 0 to max
        if candle_dir[i] == dir
            count := count + 1
    count

ups = count_candles(1, NUM_CANDLES)
dns = count_candles(-1, NUM_CANDLES)
neu = count_candles(0, NUM_CANDLES)

indic = ups-dns


if indic > 0
    indic := indic+neu
else
    indic := indic-neu

plotarrow(neu, title="UP vs DN")

longCondition = (indic) > 0
shortCondition = (indic) <= 0

strategy.entry("buy", strategy.long, 1, when = longCondition and not shortCondition)
strategy.entry("sell", strategy.short, 1, when = shortCondition and not longCondition)

```

> Detail

https://www.fmz.com/strategy/430164

> Last Modified

2023-10-25 16:57:05
