
> Name

移动平均K线回归策略Moving-Average-Candle-Regression-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  

## 策略原理

该策略集成多种技术指标和策略,主要用于判断指数的入场时机和退出点。

主要交易逻辑:

1. 计算移动平均K线,包括开盘价、收盘价、最高价、最低价的移动平均线

2. 计算移动平均K线的动量,以及动量的线性回归

3. 计算移动平均K线本身的线性回归

4. 计算超级趋势判断总体走势方向

5. 当动量回归从负向转正,或回归强烈时,判断为入场时点

6. 当动量从正向转负,或回归转弱时,判断为退出点

该策略综合运用多种技术指标,判断市场的长短期走势和节奏,以确定指数的交易时机。

## 策略优势

- 移动平均K线反映市场中长期走势

- 回归分析判断趋势转折

- 超级趋势辅助判断总体方向

- 多指标组合提高判断准确性

## 策略风险

- 参数优化较为复杂

- 多指标组合难以权衡

- 信号稀少,交易频率偏低

## 总结

该策略致力于发掘市场的长短期节奏,以确定指数交易的最佳时机。但其参数调整和模型优化仍有待完善。


||


## Strategy Logic

This strategy combines various technical indicators and strategies, mainly for determining index entry and exit points. 

The key logic is:

1. Compute moving average candles including open, close, high and low

2. Calculate momentum of MA candles and momentum linear regression

3. Calculate linear regression of MA candles itself  

4. Use SuperTrend to determine overall direction

5. When momentum regression turns from negative to positive, or strongly positive, it signals entry

6. When momentum turns from positive to negative, or weakens, it signals exit

The strategy synthesizes various indicators to assess short- and long-term market moves and rhythm for determining index trade timing.

## Advantages

- MA candles reflect medium- to long-term trends

- Regression analysis identifies trend changes

- SuperTrend assists overall direction 

- Multiple indicators improve accuracy

## Risks

- Complex parameter optimization

- Difficult to balance multiple indicators

- Infrequent signals mean lower trade frequency

## Summary

This strategy aims to uncover market timing signals by analyzing short- and long-term patterns. But parameter tuning and model optimization needs improvement. 

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Moving Average Type (MA Candles): hma|sma|ema|rma|vwma|wma|
|v_input_2|60|Length (MA Candles)|
|v_input_3|0|Moving Average Type (Momentum): ema|sma|hma|rma|vwma|wma|
|v_input_4|20|MA Length (Momentum)|
|v_input_5|40|Look Back Period Percentile High/Low|
|v_input_6|0.85|Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%|
|v_input_7|1.01|Lowest Percentile - 1.10=90%, 1.05=95%, 1.01=99%|
|v_input_8|3|Bollinger Band Standard Devaition Up|
|v_input_9|true|aggressiveLong|
|v_input_10|true|longTrades|
|v_input_11|false|useVixFix|
|v_input_12|timestamp(01 Jan 2010 00:00 +0000)|Start Time|
|v_input_13|timestamp(01 Jan 2099 00:00 +0000)|End Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HeWhoMustNotBeNamed

//@version=4
strategy("MACandles-LinearRegression-Strategy", shorttitle="MALinReg - Strategy",
                     overlay=false, initial_capital = 100000, 
                     default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.percent, pyramiding = 1, 
                     commission_value = 0.01)
resolution = ""
MAType = input(title="Moving Average Type (MA Candles)", defval="hma", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
LoopbackBars = input(60, title="Length (MA Candles)", step=10)

MMAType = input(title="Moving Average Type (Momentum)", defval="ema", options=["ema", "sma", "hma", "rma", "vwma", "wma"])
MLength = input(20, title="MA Length (Momentum)", step=10)

lb = input(40  , title="Look Back Period Percentile High/Low", step=10, minval=10, maxval=100)
ph = input(.85, title="Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%")
pl = input(1.01, title="Lowest Percentile - 1.10=90%, 1.05=95%, 1.01=99%")
mult = input(3.0    , minval=1, maxval=5, title="Bollinger Band Standard Devaition Up")

aggressiveLong = input(true)
longTrades = input(true)
useVixFix = input(false)
i_startTime = input(defval = timestamp("01 Jan 2010 00:00 +0000"), title = "Start Time", type = input.time)
i_endTime = input(defval = timestamp("01 Jan 2099 00:00 +0000"), title = "End Time", type = input.time)
inDateRange = true


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

f_getMACandles(resolution, MAType, LoopbackBars)=>
    oOpen = f_getMovingAverage(open, MAType, LoopbackBars)
    oClose = f_getMovingAverage(close, MAType, LoopbackBars)
    oHigh = f_getMovingAverage(high, MAType, LoopbackBars)
    oLow = f_getMovingAverage(low, MAType, LoopbackBars)
    [oOpen, oClose, oHigh, oLow]

f_getVixFixLinReg(oClose, oLow, MLength)=>
    wvf = ((highest(oClose, MLength)-oLow)/(highest(oClose, MLength)))*100
    
    sDev = mult * stdev(wvf, MLength)
    midLine = sma(wvf, MLength)
    lowerBand = midLine - sDev
    upperBand = midLine + sDev
    
    rangeHigh = (highest(wvf, lb)) * ph
    rangeLow = (lowest(wvf, lb)) * pl
    
    
    col = wvf >= upperBand or wvf >= rangeHigh ? color.lime : color.gray
    
    val = linreg(wvf, MLength, 0)
    absVal = abs(val)
    linRegColor = val>val[1]? (val > 0 ? color.green : color.orange): (val > 0 ? color.lime : color.red)
    
    vixFixState = (col == color.lime) ? 1: 0
    vixFixState := strategy.position_size == 0? max(vixFixState, nz(vixFixState[1],0)) : vixFixState
    [val, absVal, wvf, col, linRegColor, vixFixState]
    
f_getMACandlesLinReg(oClose, MMAType, MLength, mult, lb, ph, pl)=>
    ma = f_getMovingAverage(oClose, MMAType, MLength)
    
    maDiff = oClose  -  ma
    val = linreg(maDiff, MLength,0)
    absVal = abs(val)
    linRegColor = iff( val > 0,
                 iff( val > nz(val[1]), color.green, color.lime),
                 iff( val < nz(val[1]), color.red, color.orange))
    
    
    sDev = mult * stdev(maDiff, MLength)
    midLine = sma(maDiff, MLength)
    lowerBand = midLine - sDev
    upperBand = midLine + sDev
    
    rangeHigh = (highest(maDiff, lb)) * ph
    rangeLow = (lowest(maDiff, lb)) * pl
    
    col = maDiff >= upperBand or maDiff >= rangeHigh ? color.lime : maDiff <= lowerBand or maDiff <= rangeLow ? color.orange : color.silver
    absMaDiff = abs(maDiff)
    [val, absVal, maDiff, absMaDiff, col, linRegColor]

f_getSupertrend(resolution, oOpen, oClose, oHigh, oLow, AtrMAType, AtrLength, AtrMult, wicks)=>
    truerange = max(oHigh, oClose[1]) - min(oLow, oClose[1])
    
    averagetruerange = f_getMovingAverage(truerange, AtrMAType, AtrLength)
    atr = averagetruerange * AtrMult

    longWicks = wicks
    shortWicks = wicks
    longStop = oClose - atr
    longStopPrev = nz(longStop[1], longStop)
    longStop := (longWicks ? oLow[1] : oClose[1]) > longStopPrev ? max(longStop, longStopPrev) : longStop
    
    shortStop = oClose + atr
    shortStopPrev = nz(shortStop[1], shortStop)
    shortStop := (shortWicks ? oHigh[1] : oClose[1]) < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop
    
    dir = 1
    dir := nz(dir[1], dir)
    dir := dir == -1 and (longWicks ? oHigh : oClose) > shortStopPrev ? 1 : dir == 1 and (shortWicks[1]? oLow : oClose) < longStopPrev ? -1 : dir
    
    [dir, longStop, shortStop]

f_getMACandlesAndSupertrend(MAType, LoopbackBars, AtrMult, wicks)=>
    oOpen = f_getMovingAverage(open, MAType, LoopbackBars)
    oClose = f_getMovingAverage(close, MAType, LoopbackBars)
    oHigh = f_getMovingAverage(high, MAType, LoopbackBars)
    oLow = f_getMovingAverage(low, MAType, LoopbackBars)
    [dir, longStop, shortStop] = f_getSupertrend(resolution, oOpen, oClose, oHigh, oLow, MAType, LoopbackBars, AtrMult, wicks)
    dir

[oOpen, oClose, oHigh, oLow] = f_getMACandles(resolution, MAType, LoopbackBars)
dir = f_getMACandlesAndSupertrend("sma", 200, 1, false)
colorByPreviousClose = false
candleColor = colorByPreviousClose ?
                 (oClose[1] < oClose ? color.green : oClose[1] > oClose ? color.red : color.silver) : 
                 (oOpen < oClose ? color.green : oOpen > oClose ? color.red : color.silver)


[vval, vabsVal, wvf, vcol, vlinRegColor, vixFixState] = f_getVixFixLinReg(oClose, oLow, MLength)
[val, absVal, maDiff, absMaDiff, col, linRegColor] = f_getMACandlesLinReg(oClose, MMAType, MLength, mult, lb, ph, pl)


plot(useVixFix?na:absMaDiff, title="Momentum", style=plot.style_histogram, linewidth = 4, color=col)
plot(useVixFix?wvf:na, title="VIX Fix", style=plot.style_histogram, linewidth = 4, color=vcol)
plot(useVixFix?na:-absVal, title="Linear Regression (Momentum)", style=plot.style_histogram, linewidth=4, color=linRegColor)
plot(useVixFix?-vabsVal:na, title="Linear Regression (VIX Fix)", style=plot.style_histogram, linewidth=4, color=vlinRegColor)

exitColor = longTrades? color.orange : color.silver
exitPreviousColor = longTrades? color.silver : color.lime
longCondition = (useVixFix? (vixFixState == 1 and vlinRegColor == color.lime) :
                     ((linRegColor == color.orange and linRegColor[1] == color.red) or (linRegColor == color.green and linRegColor[1] != color.green and aggressiveLong)))  and inDateRange and dir>0
exitLongCondition = (col == exitColor and col[1] == exitColor and col[2] == exitPreviousColor and (linRegColor != color.green or not aggressiveLong))

strategy.entry("Long", strategy.long, when=longCondition, oca_name="oca_buy")
strategy.close("Long", when=exitLongCondition)

```

> Detail

https://www.fmz.com/strategy/426829

> Last Modified

2023-09-14 17:50:14
