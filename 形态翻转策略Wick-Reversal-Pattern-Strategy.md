
> Name

形态翻转策略Wick-Reversal-Pattern-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

形态翻转策略通过检测K线形态,识别价格从上涨到下跌或者从下跌到上涨的转折点,在转折点附近进行买入或卖出操作。该策略主要利用影线与实体的比例关系来判断价格反转信号。

## 策略原理

该策略的核心逻辑是检测K线的影线部分与实体部分的比例关系,来判断是否存在价格反转形态。

当出现下跌K线时,如果该K线的下影线较长,上影线和实体较短,则表示该K线有较强的买入力道,可能反转为上涨。具体来说,是检测收盘价高于开盘价,并且下影线长度大于上影线与实体长度的一定倍数,则产生多头信号。

相反,当出现上涨K线时,如果该K线的上影线较长,下影线和实体较短,则表示该K线有较强的卖出力道,可能反转为下跌。具体来说,是检测收盘价低于开盘价,并且上影线长度大于下影线与实体长度的一定倍数,则产生空头信号。

此外,若开盘价与收盘价相差很小,但影线较长,也可能产生反转信号。

检测反转信号时,还会结合平均K线范围进行过滤,只有在K线范围大于平均值时,才会产生信号。

## 策略优势

- 利用影线与实体比例关系,捕捉反转形态,识别反转点
- 同时检测多头和空头反转形态
- 结合K线平均范围过滤,避免在震荡市场中产生错误信号
- 简单明了的形态识别逻辑,容易理解实现

## 策略风险

- 影线与实体比例的参数设置需要经验,不恰当可能导致漏捕反转或产生假信号
- 仅仅依靠单个K线形态判断反转,容易被局部震荡误导
- 没有结合趋势判断,可能逆势操作产生损失

可以考虑结合趋势指标,避免逆势操作。也可以通过与其他技术指标组合,确认反转信号。参数设置可以通过回测优化获得更好的参数组合。

## 策略优化方向  

- 可以结合趋势指标,确认反转方向与趋势一致,避免逆势操作
- 可以结合其他技术指标,如磁力线、布林带等,确认反转信号
- 可以利用机器学习方法,自动优化影线与实体比例的参数
- 可以在反转后,设置止损与止盈条件,优化退出机制

## 总结

形态翻转策略通过比较简单的形态识别方法,有效识别价格反转形态,捕捉转折点。但仅仅依靠单个K线形态容易产生误判,需要与其他技术指标组合使用,同时加入趋势判断,可以避免逆势操作,从而提高策略稳定性。此外,参数优化和止损/止盈设置也是进一步完善策略的方向。总之,形态翻转策略为我们提供了一个简单实用的思路,但需要配合其他技术手段才能发挥最大效果。

||

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

[/trans]

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
