
> Name

复合趋势跟踪策略Compound-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本文将介绍一种综合多种指标判断趋势的量化交易策略。该策略融合均线方向、新高新低、年线条件等多种技术指标,追踪股价中长线趋势。

## 策略原理

该策略基于以下几点理念:

1. 使用均线方向、新高新低指数等判断价格趋势方向。

2. 结合年线判断长线趋势,避免被短期震荡误导。

3. 当多种指标 Bundle 合成信号时才入场,可有效过滤假信号。 

4. 采用超级趋势止损随行,可锁定趋势利润。

5. 当价格突破均线时适当止损。

## 优势分析

该策略具有以下优势:

1. 多种指标综合判断,可提高决策准确性。

2. 只在趋势明确时入场,可避免不必要交易。

3. 超级趋势止损可有效锁定利润,降低回撤。

4. 根据价格突破适时止损,可提高胜率。

5. 策略逻辑清晰易理解,便于优化。

## 风险分析 

该策略也存在以下风险:

1. 多种指标同时判断可能错过交易机会。

2. 超级趋势止损过于机械,可能使利润遭受限制。

3. 均线突破判断如果不当可能造成不必要止损。

4. 交易者需谨慎评估参数设定对策略的影响。

## 总结

该策略综合运用多种技术指标判断趋势。在参数优化合理的前提下,可望获得较好收益。但交易者仍需关注趋势判断准确性,适时调整参数。

||

## Overview

This article introduces a quantitative trading strategy that combines multiple indicators to determine trends. It tracks medium-to-long term price trends using moving averages, new highs/lows, yearly levels and more.

## Strategy Logic

The strategy is based on: 

1. Using moving averages, new highs/lows index to determine price trend.

2. Incorporating yearly levels to avoid short-term whipsaws. 

3. Entering on aligned indicator bundle signals to filter fakeouts.

4. Trailing with supertrend to lock in trend profits.  

5. Stopping out on moving average breaches.

## Advantage Analysis

Advantages of the strategy:

1. Multiple indicators improve decision accuracy. 

2. Only trading clear trends avoids unnecessary trades.

3. Supertrend trailing locks in profits and reduces drawdowns.

4. Timely stop outs on breakouts improve win rate.

5. Clear logic makes optimization intuitive.

## Risk Analysis

Potential risks include:

1. Multiple filters may cause missed trades. 

2. Supertrend trails could overly limit profits.

3. Bad breakout stops cause unnecessary exits. 

4. Parameter tuning significantly impacts performance.

## Conclusion

This strategy combines multiple technical indicators to determine trend. With proper optimization, it can achieve good returns. But traders should watch trend accuracy and adjust parameters accordingly.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Moving Average Type: hma|sma|ema|rma|vwma|wma|
|v_input_2|true|includePartiallyAligned|
|v_input_3|22|HighLowPeriod|
|v_input_4|10|LookbackPeriod|
|v_input_5|false|considerYearlyHighLow|
|v_input_6|true|dirTBars|
|v_input_7|30|dirRBars|
|v_input_8|0|Moving Average Type: ema|sma|hma|rma|vwma|wma|
|v_input_9|10|PMALength|
|v_input_10|2|shift|
|v_input_11|3|supertrendMult|
|v_input_12|22|supertrendLength|
|v_input_13|2|riskReward|
|v_input_14|0|Trade Direction: strategy.openMA<closeMA?1:-1.all|strategy.direction.long|strategy.direction.short|
|v_input_15|true|backtestYears|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-16 00:00:00
end: 2023-09-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HeWhoMustNotBeNamed

//@version=4
strategy("AlignedMA and Cumulative HighLow Strategy V2", overlay=true, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.percent, pyramiding = 1, commission_value = 0.01, calc_on_order_fills = true)

MAType = input(title="Moving Average Type", defval="hma", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
includePartiallyAligned = input(true)
HighLowPeriod = input(22, minval=1,step=1)
LookbackPeriod = input(10, minval=1,step=1)
considerYearlyHighLow = input(false)

dirTBars = input(1)
dirRBars = input(30)

PMAType = input(title="Moving Average Type", defval="ema", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
PMALength = input(10, minval=2, step=10)
shift = input(2, minval=1, step=1)

//Use 2 for ASX stocks
supertrendMult = input(3, minval=1, maxval=10, step=0.5)
supertrendLength = input(22, minval=1)

riskReward = input(2, minval=1, maxval=10, step=0.5)

tradeDirection = input(title="Trade Direction", defval=strategy.direction.all, options=[strategy.direction.all, strategy.direction.long, strategy.direction.short])
backtestYears = input(1, minval=1, step=1)

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

f_getDirection(Series)=>
    direction = Series > Series[1] ? 1 : Series < Series[1] ? -1 : 0
    direction := direction == 0? nz(direction[1],0):direction
    direction

f_getDirectionT(Series, tBars, rBars)=>
    compH = Series > 0? Series[tBars] : Series[rBars]
    compL = Series < 0? Series[tBars] : Series[rBars]
    direction = Series > compH ? 1 : Series < compL ? -1 : 0
    direction := direction == 0? nz(direction[1],0):direction
    direction

f_getYearlyHighLowCondition(considerYearlyHighLow)=>
    yhigh = security(syminfo.tickerid, '12M', high[1]) 
    ylow = security(syminfo.tickerid, '12M', low[1]) 
    yhighlast = yhigh[365]
    ylowlast = ylow[365]
    yhighllast = yhigh[2 * 365]
    ylowllast = ylow[2 * 365]
    
    yearlyTrendUp = na(yhigh)? true : na(yhighlast)? close > yhigh : na(yhighllast)? close > max(yhigh,yhighlast) : close > max(yhigh, min(yhighlast, yhighllast))
    yearlyHighCondition = (  (na(yhigh) or na(yhighlast) ? true : (yhigh > yhighlast) ) and ( na(yhigh) or na(yhighllast) ? true : (yhigh > yhighllast))) or yearlyTrendUp or not considerYearlyHighLow
    yearlyTrendDown = na(ylow)? true : na(ylowlast)? close < ylow : na(ylowllast)? close < min(ylow,ylowlast) : close < min(ylow, max(ylowlast, ylowllast))
    yearlyLowCondition = (  (na(ylow) or na(ylowlast) ? true : (ylow < ylowlast) ) and ( na(ylow) or na(ylowllast) ? true : (ylow < ylowllast))) or yearlyTrendDown or not considerYearlyHighLow
    
    [yearlyHighCondition,yearlyLowCondition]

f_getOpenCloseMA(MAType, length)=>
    openMA = f_getMovingAverage(open, MAType, length)
    closeMA = f_getMovingAverage(close, MAType, length)
    direction = openMA < closeMA ? 1 : -1
    [openMA, closeMA, direction]

inDateRange = true

maAlignment = f_getMaAlignment(MAType,includePartiallyAligned)
alignedMaIndex = sum(maAlignment,LookbackPeriod)

maAlignmentDirection=f_getDirectionT(alignedMaIndex,dirTBars, dirRBars)
atr = atr(22)
highLowIndex = f_getHighLowValue(HighLowPeriod)
cumulativeHighLowIndex = sum(highLowIndex,LookbackPeriod)

hlDirection = f_getDirectionT(cumulativeHighLowIndex,dirTBars,dirRBars)
[yearlyHighCondition,yearlyLowCondition] = f_getYearlyHighLowCondition(considerYearlyHighLow)
[supertrend, dir] = supertrend(supertrendMult, supertrendLength)
[esupertrend, edir] = supertrend(supertrendMult+1, supertrendLength)

movingAverage = f_getMovingAverage(close, PMAType, PMALength)

secondaryBuyFilter = movingAverage > movingAverage[shift]
secondarySellFilter = movingAverage < movingAverage[shift]

closeBuyFilter = dir == 1
closeSellFilter = dir == -1
buyFilter = (maAlignmentDirection == 1 and hlDirection == 1 and yearlyHighCondition)
sellFilter = (maAlignmentDirection == -1 and hlDirection == -1 and yearlyLowCondition)

barColor = buyFilter?color.lime:sellFilter?color.orange:color.gray

bandColor = secondaryBuyFilter ? color.green : secondarySellFilter ? color.red : color.gray

compound = strategy.position_size > 0? strategy.position_avg_price + (atr* supertrendMult * riskReward) : strategy.position_size < 0 ? strategy.position_avg_price - (atr* supertrendMult * riskReward) : na
riskFree = na(compound)?false:strategy.position_size > 0 ? supertrend > compound : strategy.position_size < 0 ? supertrend < compound : false

trailingStop = riskFree?(dir==-1?supertrend - 2*atr : supertrend + 2*atr) :supertrend
trailingStop := (strategy.position_size > 0 and trailingStop < trailingStop[1]) ? trailingStop[1] :  ((strategy.position_size < 0 and trailingStop > trailingStop[1])? trailingStop[1] :trailingStop)
plot(trailingStop, title="Supertrend", color=riskFree? color.blue:dir==-1?color.green:color.red, linewidth=2)


buyEntry = buyFilter and secondaryBuyFilter and not closeBuyFilter and low > trailingStop
sellEntry = sellFilter and secondarySellFilter and not closeSellFilter and low < trailingStop
Fi1 = plot(movingAverage[shift], title="MA", color=color.red, linewidth=1, transp=50)
Fi2 = plot(movingAverage, title="Shift", color=color.green, linewidth=1, transp=50)
fill(Fi1, Fi2, title="Band Filler", color=bandColor, transp=40)

barcolor(barColor)

//plot(compound, title="Compound"mzn, color=dir==-1?color.lime:color.orange, linewidth=2)

strategy.risk.allow_entry_in(tradeDirection)
strategy.entry("Buy", strategy.long, when=buyEntry and inDateRange and (riskFree or strategy.position_size==0), oca_name="oca_buy")
strategy.exit("ExitBuy", "Buy", stop = trailingStop)
strategy.close("Buy", when=closeBuyFilter)


strategy.entry("Sell", strategy.short, when=sellEntry and inDateRange and (riskFree or strategy.position_size==0), oca_name="oca_sell")
strategy.exit("ExitSell", "Buy", stop = trailingStop)
strategy.close("Sell", when=closeSellFilter)

```

> Detail

https://www.fmz.com/strategy/426997

> Last Modified

2023-09-16 19:10:37
