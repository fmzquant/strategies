
> Name

动态K线方向策略Dynamic-Candle-Direction-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9a2c2147b754744e46.png)

[trans]


## 概述

本策略通过分析过去N根K线的收盘价高于/低于开盘价的情况,来判断未来K线的方向。根据K线方向多空情况,采取做多或做空操作。

## 策略原理

该策略的核心逻辑是:

1. 设置参数NUM_CANDLES,确定需要分析的K线数量。

2. 定义函数candle_dir,判断单根K线的方向。close>open为多头,close<open为空头,close=open为震荡。

3. 定义函数count_candles统计过去NUM_CANDLES根K线中不同方向K线的数量。

4. 统计过去NUM_CANDLES根K线中多头、空头和震荡K线的数量,存储在ups、dns、neu中。

5. 定义indic指标,其值等于ups-dns再加上neu的正负值。

6. 根据indic指标判断做多和做空时机。

该策略通过统计一定数量K线的方向,来判断未来K线方向的概率,从而做出交易决策。通过参数NUM_CANDLES可以控制统计K线数量,调整策略灵敏度。

## 策略优势分析

1. 策略思路清晰易懂,容易解释和验证。

2. 无需计算复杂指标,只需要K线数据,降低了计算成本。

3. 可通过参数调整统计K线数量,控制策略灵敏度。

4. 可在任何品种和任何周期使用,适用性强。

5. 容易进行参数优化,寻找最优参数组合。

## 风险分析

1. 无法处理盘整震荡市,可能出现频繁开仓平仓。

2. 统计周期不当可能导致信号产生滞后,需要合理设置参数。

3. 无法处理趋势反转,可能出现逆势亏损的风险。

4. 需要考虑交易成本的影响,防止过于频繁交易。

5. 需注意参数优化过拟合问题,应多市场回测验证。

## 优化方向

1. 可以考虑加入止损逻辑,降低亏损风险。

2. 可以结合趋势指标,避免逆势操作。

3. 可以加大统计周期或使用低周期,优化参数提高策略稳定性。 

4. 可以考虑多品种复合,提高策略胜率。

5. 可以结合机器学习方法自动优化参数。

## 总结

本策略基于K线方向分析确定交易方向,思路清晰易懂,通过参数设置可以控制策略灵敏度。策略优点是逻辑简单、使用要求低、适用面广,但也存在一定的风险,需要进一步优化提高策略稳定性。总体来说,本策略为量化交易提供了一种简单实用的交易思路。

||


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

[/trans]



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
