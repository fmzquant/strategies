
> Name

高低指标与均线配合指标策略Aligned-Moving-Average-and-Cumulative-High-Low-Index-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14370d8f66999d20eab.png)
[trans]


## 概述

该策略主要将高低指标、均线指标与超级趋势指标相结合,判断市场趋势而建仓。

## 策略原理

1. 通过高低指标判断最近一定周期内价格是否创出新高或新低,并累加得分。当分数上涨时,代表着多头力量增强;当分数下降时,代表着空头力量增强。

2. 通过均线指标,判断价格是否处于由下往上的阶梯型上升趋势,或者由上往下的阶梯型下降趋势。当均线呈现阶梯型上升,代表着多头力量增强;当均线呈现阶梯型下降,代表着空头力量增强。 

3. 结合高低指标和均线指标的判断结果,确定市场趋势;再结合超级趋势指标的方向,寻找建仓机会。具体来说,当高低指标和均线指标都显示多头力量增强,且超级趋势指标方向为向下时,进行长仓建仓;当高低指标和均线指标都显示空头力量增强,且超级趋势指标方向为向上时,进行空仓建仓。

## 策略优势 

1. 高低指标能有效判断价格走势和力量变化,均线指标能有效判断价格趋势,两者结合能更准确判断市场走向。

2. 结合超级趋势指标进行建仓,可避免建仓过早或过晚。超级趋势指标可有效识别价格反转点。

3. 多种指标相互验证,可减少假信号。

## 策略风险

1. 若高低指标和均线指标发出错误信号,可能造成亏损建仓。

2. 若参与度不高,超级趋势指标参数设置不当,可能发出错误信号。

3. 若趋势反转过快,止损设置不当,可能造成较大亏损。

4. 可通过优化指标参数,调整止损点位等方式降低风险。

## 策略优化

1. 可测试不同类型的均线指标,寻找最佳参数组合。

2. 可优化高低指标和均线指标的参数,使信号更稳定可靠。 

3. 可结合其他指标进行验证,如MACD,KD等,减少假信号。

4. 可结合机器学习算法自动优化参数和信号权重。

5. 可结合情绪分析等判断市场热度,避免交易低热度品种。


## 总结

该策略通过高低指标和均线指标判断市场趋势和力量,再结合超级趋势指标过滤信号,在多空力量对抗且超级趋势指标反转时建仓,实现低风险交易。策略优势在于多指标验证和及时建仓,可有效控制风险。存在的问题在于假信号和趋势判断错误。可通过参数优化、止损设置、信号过滤等多种方式进行改进,使策略更稳健可靠。
||
## Overview

This strategy mainly combines the High Low Index, Moving Average Index and Super Trend Index to determine the market trend and open positions.  

## Strategy Logic

1. The High Low Index judges whether the latest price over a certain period has made a new high or new low, and accumulates the score. When the score rises, it represents the strengthening of bullish forces. When the score falls, it represents the strengthening of bearish forces.

2. The Moving Average Index judges whether the price is in an upward ladder-shaped uptrend or a downward ladder-shaped downtrend. When the moving average shows a ladder-shaped rise, it represents the strengthening of bullish forces. When it shows a ladder-shaped decline, it represents the strengthening of bearish forces.

3. Combine the judgments of the High Low Index and the Moving Average Index to determine the market trend, and then find trading opportunities combined with the direction of the Super Trend Index. Specifically, when both the High Low Index and the Moving Average Index show strengthening bullish forces and the direction of the Super Trend Index is downward, open long positions. When both indices show strengthening bearish forces and the direction of the Super Trend Index is upward, open short positions.

## Advantages

1. The High Low Index can effectively judge the price movement and changes in momentum. The Moving Average Index can effectively determine the price trend. The combination of both can more accurately determine the market direction.  

2. Opening positions combined with the Super Trend Index can avoid premature or late opening of positions. The Super Trend Index can effectively identify price reversal points.

3. Multiple indicators verify each other and reduce false signals.

## Risks

1. Incorrect signals from the High Low Index and Moving Average Index may lead to loss-making positions.  

2. Insufficient participation and improper parameter settings of the Super Trend Index may generate incorrect signals.

3. Rapid trend reversals and improper stop loss settings may lead to large losses.

4. Risks can be reduced by optimizing indicator parameters, adjusting stop loss price levels, etc.

## Optimization

1. Test different types of moving average indicators to find the optimal combination of parameters.  

2. Optimize the parameters of the High Low Index and Moving Average Index to make the signals more stable and reliable.

3. Incorporate other indicators for verification, such as MACD, KD, etc., to reduce false signals. 

4. Incorporate machine learning algorithms to automatically optimize parameters and signal weights.

5. Incorporate sentiment analysis to avoid trading less popular products.

## Conclusion

This strategy determines market trends and momentum through the High Low Index and Moving Average Index, and then filters the signals using the Super Trend Index, opening positions when bullish and bearish forces confront each other and the Super Trend Index reverses. Its advantages lie in multiple signal verification and timely opening of positions, which can effectively control risks. Existing problems include false signals and trend misjudgment. Various improvements can be made through parameter optimization, stop loss settings, signal filtering, etc. to make the strategy more robust and reliable.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Moving Average Type: sma|ema|hma|rma|vwma|wma|
|v_input_2|true|includePartiallyAligned|
|v_input_3|50|HighLowPeriod|
|v_input_4|10|LookbackPeriod|
|v_input_5|2|supertrendMult|
|v_input_6|10|supertrendLength|
|v_input_7|0|Trade Direction: strategy.direction.long|strategy.direction.all|strategy.direction.short|
|v_input_8|10|backtestYears|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-21 00:00:00
end: 2023-11-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HeWhoMustNotBeNamed

//@version=4
strategy("AlignedMA and Cumulative HighLow Strategy", overlay=true, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.percent, pyramiding = 1, commission_value = 0.01, calc_on_order_fills = true)

MAType = input(title="Moving Average Type", defval="sma", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
includePartiallyAligned = input(true)
HighLowPeriod = input(50, minval=1,step=1)
LookbackPeriod = input(10, minval=1,step=1)

supertrendMult = input(2, minval=1, maxval=10, step=0.5)
supertrendLength = input(10, minval=1)

tradeDirection = input(title="Trade Direction", defval=strategy.direction.long, options=[strategy.direction.all, strategy.direction.long, strategy.direction.short])
backtestYears = input(10, minval=1, step=1)

f_getMovingAverage(source, MAType, length)=>
    ma = sma(source, length)
    if(MAType == "ema")
        ma := ema(source,length)
    if(MAType == "hma")
        ma := hma(source,length)
    if(MAType == "rma")
        ma := rma(source,length)
    if(MAType == "vwma")
        ma := vwma(source,length)
    if(MAType == "wma")
        ma := wma(source,length)
    ma
    
f_getMaAlignment(MAType, includePartiallyAligned)=>
    ma5 = f_getMovingAverage(close,MAType,5)
    ma10 = f_getMovingAverage(close,MAType,10)
    ma20 = f_getMovingAverage(close,MAType,20)
    ma30 = f_getMovingAverage(close,MAType,30)
    ma50 = f_getMovingAverage(close,MAType,50)
    ma100 = f_getMovingAverage(close,MAType,100)
    ma200 = f_getMovingAverage(close,MAType,200)

    upwardScore = 0
    upwardScore := close > ma5? upwardScore+1:upwardScore
    upwardScore := ma5 > ma10? upwardScore+1:upwardScore
    upwardScore := ma10 > ma20? upwardScore+1:upwardScore
    upwardScore := ma20 > ma30? upwardScore+1:upwardScore
    upwardScore := ma30 > ma50? upwardScore+1:upwardScore
    upwardScore := ma50 > ma100? upwardScore+1:upwardScore
    upwardScore := ma100 > ma200? upwardScore+1:upwardScore
    
    upwards = close > ma5 and ma5 > ma10 and ma10 > ma20 and ma20 > ma30 and ma30 > ma50 and ma50 > ma100 and ma100 > ma200
    downwards = close < ma5 and ma5 < ma10 and ma10 < ma20 and ma20 < ma30 and ma30 < ma50 and ma50 < ma100 and ma100 < ma200
    upwards?1:downwards?-1:includePartiallyAligned ? (upwardScore > 5? 0.5: upwardScore < 2?-0.5:upwardScore>3?0.25:-0.25) : 0

f_getHighLowValue(HighLowPeriod)=>
    currentHigh = highest(high,HighLowPeriod) == high
    currentLow = lowest(low,HighLowPeriod) == low
    currentHigh?1:currentLow?-1:0

inDateRange = time >= timestamp(syminfo.timezone, year(timenow) - backtestYears, 01, 01, 0, 0)

maAlignment = f_getMaAlignment(MAType,includePartiallyAligned)
alignedMaIndex = sum(maAlignment,LookbackPeriod)

maAlignmentDirection = alignedMaIndex > alignedMaIndex[1] ? 1 : alignedMaIndex < alignedMaIndex[1] ? -1 : 0
maAlignmentDirection := maAlignmentDirection == 0? nz(maAlignmentDirection[1],0):maAlignmentDirection

highLowIndex = f_getHighLowValue(HighLowPeriod)
cumulativeHighLowIndex = sum(highLowIndex,LookbackPeriod)

hlDirection = cumulativeHighLowIndex > cumulativeHighLowIndex[1] ? 1 : cumulativeHighLowIndex < cumulativeHighLowIndex[1] ? -1 : 0
hlDirection := hlDirection == 0? nz(hlDirection[1],0):hlDirection

[superTrend, dir] = supertrend(supertrendMult, supertrendLength)

buyEntry = (dir == -1 and maAlignmentDirection == 1 and hlDirection == 1)
sellEntry = (dir == 1 and maAlignmentDirection == -1 and hlDirection == -1)

barColor = buyEntry?color.lime:sellEntry?color.orange:color.gray
barcolor(barColor)

// strategy.risk.allow_entry_in(tradeDirection)
strategy.entry("Buy", strategy.long, when=barColor == color.lime and inDateRange, oca_name="oca_buy")
strategy.close("Buy", when=dir == 1)

strategy.entry("Sell", strategy.short, when=barColor == color.orange and inDateRange, oca_name="oca_sell")
strategy.close("Sell", when=dir == -1)

```

> Detail

https://www.fmz.com/strategy/432793

> Last Modified

2023-11-21 15:19:35
