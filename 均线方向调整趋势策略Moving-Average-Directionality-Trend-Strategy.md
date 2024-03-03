
> Name

均线方向调整趋势策略Moving-Average-Directionality-Trend-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略通过判断多条均线的方向调整情况,确定行情的长线趋势方向,进行相应的做多或做空操作。

主要交易逻辑:

1. 计算多组不同周期的移动平均线,如5日、20日、50日等

2. 比较各均线的方向态势,判断是否存在一致的调整方向

3. 当均线全部向上调整,判断为长线看涨,当均线全部向下调整,判断为长线看跌

4. 在看涨信号时,价格突破下行止损线则建立做多头寸

5. 在看跌信号时,价格突破上行止损线则建立做空头寸 

6. 设置回撤止损来控制风险

该策略强调判断长期趋势的走势态势,在趋势确认后才进行交易,以控制非系统风险。

## 策略优势

- 多均线组合判断长期趋势走势

- 突破止损线加仓,顺势而为

- 回撤止损策略控制风险 

## 策略风险

- 均线指标本身滞后于价格

- 趋势判断不当可能导致持续亏损

- 仅做多或做空无法利用机会 

## 总结

该策略强调通过均线态势判断长期走势,以减少非系统风险。但判断准确性和止损策略优化是关键所在。


||

## Strategy Logic

This strategy determines the long-term trend direction by analyzing the directionality of multiple moving averages. It goes long or short according to the trend.

The logic is:

1. Compute moving averages of differing periods, e.g. 5-day, 20-day, 50-day, etc. 

2. Compare the directional tendency of the MAs to determine consistent alignment

3. When MAs are uniformly trending up, a long-term bullish view is held. When uniformly down, long-term bearish.

4. In bullish conditions, breakouts above downside stop loss triggers long entries

5. In bearish conditions, breakouts below upside stop loss triggers short entries

6. Trailing stops are used to control risk

The strategy emphasizes confirming the long-term trend before trading to reduce non-systematic risk.

## Advantages

- Multiple MAs combine to judge long-term trend directionality

- Breakout entries follow the trend 

- Trailing stop strategy controls risk

## Risks

- MAs themselves lag prices

- Incorrect trend judgement can lead to sustained losses

- LONG or SHORT only misses opportunities

## Summary 
This strategy stresses determining the secular trend via MA directionality to minimize non-systematic risks. But judgement accuracy and stop tuning are critical.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Moving Average Type: sma|ema|hma|rma|vwma|wma|
|v_input_2|5|LookbackPeriod|
|v_input_3|10|shortHighLowPeriod|
|v_input_4|20|longHighLowPeriod|
|v_input_5|22|atrlength|
|v_input_6|6|stopMultiplyer|
|v_input_7|3|reentryStopMultiplyer|
|v_input_8|false|exitOnSignal|
|v_input_9|0|Trade Direction: strategy.direction.long|strategy.direction.all|strategy.direction.short|
|v_input_10|10|backtestYears|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-07 00:00:00
end: 2023-06-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HeWhoMustNotBeNamed

//@version=4
strategy("TrendMaAlignmentStrategy", overlay=true, initial_capital = 2000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.cash_per_order, pyramiding = 1, commission_value = 2)

MAType = input(title="Moving Average Type", defval="sma", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
LookbackPeriod = input(5, step=10)
shortHighLowPeriod = input(10, step=10)
longHighLowPeriod = input(20, step=10)

atrlength=input(22)
stopMultiplyer = input(6, minval=1, maxval=10, step=0.5)
reentryStopMultiplyer = input(3, minval=1, maxval=10, step=0.5)
exitOnSignal = input(false)
tradeDirection = input(title="Trade Direction", defval=strategy.direction.long, options=[strategy.direction.all, strategy.direction.long, strategy.direction.short])

backtestYears = input(10, minval=1, step=1)
inDateRange = true

allowReduceCompound=true
includePartiallyAligned = true
considerYearlyHighLow = true
considerNewLongTermHighLows = true

//////////////////////////////////// Get Moving average ///////////////////////////////////
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

f_getMaAlignmentHighLow(MAType, includePartiallyAligned, LookbackPeriod)=>
    maAlignment = f_getMaAlignment(MAType,includePartiallyAligned)
    [highest(maAlignment, LookbackPeriod), lowest(maAlignment, LookbackPeriod)]

//////////////////////////////////// Calculate new high low condition //////////////////////////////////////////////////
f_calculateNewHighLows(shortHighLowPeriod, longHighLowPeriod, considerNewLongTermHighLows)=>
    newHigh = highest(shortHighLowPeriod) == highest(longHighLowPeriod) or not considerNewLongTermHighLows
    newLow = lowest(shortHighLowPeriod) == lowest(longHighLowPeriod) or not considerNewLongTermHighLows
    [newHigh,newLow]

//////////////////////////////////// Calculate stop and compound //////////////////////////////////////////////////
f_calculateStopAndCompound(target, atr, stopMultiplyer, allowReduceCompound, barState)=>
    buyStop = target - (stopMultiplyer * atr)
    sellStop = target + (stopMultiplyer * atr)
    buyStop := (barState > 0 or strategy.position_size > 0 ) and (buyStop < buyStop[1] or close < sellStop[1])? buyStop[1] : strategy.position_size < 0 and close > buyStop[1]? buyStop[1] : barState < 0 and allowReduceCompound and buyStop > buyStop[1] ? buyStop[1] : buyStop
    sellStop := (barState < 0 or strategy.position_size < 0) and (sellStop > sellStop[1] or close > buyStop[1])? sellStop[1] : strategy.position_size > 0 and close < sellStop[1]? sellStop[1]: barState > 0 and allowReduceCompound and sellStop < sellStop[1] ? sellStop[1] : sellStop
    [buyStop, sellStop]

//////////////////////////////////// Calculate Yearly High Low //////////////////////////////////////////////////
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
    
atr = atr(atrlength)    
[maAlignmentHigh, maAlignmentLow] = f_getMaAlignmentHighLow(MAType, includePartiallyAligned, LookbackPeriod)
[newHigh,newLow] = f_calculateNewHighLows(shortHighLowPeriod, longHighLowPeriod, considerNewLongTermHighLows)
[middle, upper, lower] = bb(close, 20, 2)
barState = (maAlignmentLow > 0 or maAlignmentHigh == 1) and newHigh ? 1 : (maAlignmentHigh < 0 or maAlignmentLow == -1) and newLow ? -1 : 0
[buyStop, sellStop] = f_calculateStopAndCompound(close, atr, stopMultiplyer, allowReduceCompound, barState)
[yearlyHighCondition,yearlyLowCondition] = f_getYearlyHighLowCondition(considerYearlyHighLow)

barcolor(barState == 1?color.lime : barState == -1? color.orange: color.silver)
//plot(maAlignmentHigh, title="AlighmentHigh", color=color.green, linewidth=2, style=plot.style_line)
//plot(maAlignmentLow, title="AlignmentLow", color=color.red, linewidth=2, style=plot.style_line)

plot(barState == 1 or strategy.position_size != 0 ?buyStop:na, title="BuyStop", color=color.green, linewidth=2, style=plot.style_linebr)
plot(barState == -1 or strategy.position_size != 0 ?sellStop:na, title="SellStop", color=color.red, linewidth=2, style=plot.style_linebr)

buyEntry = barState == 1 and close - reentryStopMultiplyer*atr > buyStop and yearlyHighCondition and inDateRange
sellEntry = barState == -1 and close + reentryStopMultiplyer*atr < sellStop and yearlyLowCondition and inDateRange
buyExit = barState == -1
sellExit = barState == 1

strategy.risk.allow_entry_in(tradeDirection)
strategy.entry("Buy", strategy.long, when=buyEntry)
strategy.close("Buy", when=buyExit and exitOnSignal)
strategy.exit("ExitBuy", "Buy", stop = buyStop)

strategy.entry("Sell", strategy.short, when=sellEntry)
strategy.close("Sell", when=sellExit and exitOnSignal)
strategy.exit("ExitSell", "Sell", stop = sellStop)
```

> Detail

https://www.fmz.com/strategy/426825

> Last Modified

2023-09-14 17:47:01
