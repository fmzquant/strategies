
> Name

双均线价格通道趋势追踪策略Trend-Trading-Strategy-Based-on-Price-Channel-of-Double-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f1b4501cbaf15b3e15.png)

[trans]

### 概述

该策略是基于双均线构建价格通道,使用通道范围来判断价格趋势方向,并设定止损追踪来锁定利润的趋势追踪策略。

### 策略原理

双均线价格通道策略使用快速EMA和慢速EMA构建价格通道。快速EMA参数为89周期,慢速EMA参数为200周期。同时使用基于高价、低价、收盘价的三条均线构建价格通道范围。通道上轨线和下轨线分别为34周期的高价EMA和低价EMA。

当快速EMA在慢速EMA之上且价格低于下轨时,判断为上涨趋势;当快速EMA在慢速EMA之下且价格高于上轨时,判断为下跌趋势。

在上涨趋势时,策略会在确定趋势反转的时候做空;在下跌趋势时,策略会在确定趋势反转的时候做多。

此外,策略带有止损追踪功能。持仓后会实时更新追踪止损价格,实现利润的锁定。

### 优势分析

该策略最大的优势在于利用双均线构建价格通道判断价格趋势,再结合反转做单,避免追高杀跌。同时带有移动止损追踪功能,可以锁定利润,降低亏损风险。

其他优势还有:参数优化空间大,可以针对不同品种和周期进行调整parameter;实时更新止损价格,操作风险低。

### 风险分析

该策略主要的风险在于反转信号判定的效果不好,可能出现误判。这时就要优化参数,确保确定趋势反转的效果。

此外,止损点设置也很关键。止损点过大可能出现不够果断止损的情况;止损点过小可能出现过度止损的情况。这需要根据具体品种来调整。 

最后,数据问题也可能导致策略失效。要确保使用的是可信、连续、充分的历史数据来回测和实盘验证策略。

### 优化方向  

该策略的优化主要集中在以下几个方面:

1. 快速EMA和慢速EMA的周期可以进行优化,设置不同的参数组合来判断效果

2. 价格通道的上下轨参数也可以调整,寻找更合适的周期参数

3. 止损点的设置很关键,可以测试不同参数来优化止损策略

4. 可以测试是否引入其他指标来确定趋势反转,提高做单效果

### 总结

本策略整体运作流程合理顺畅,利用双均线通道判断趋势方向做单,并带有移动止损来锁定利润,是一款较为稳定的趋势追踪策略。通过参数优化和风控设置的优化,该策略可以成为高效的量化交易策略之一。

||

### Overview

This is a trend following strategy based on the price channel built with double moving averages. It uses the channel range to determine the price trend direction and sets a trailing stop loss to lock in profits.

### Strategy Logic

The double moving average price channel strategy uses fast EMA and slow EMA to build the price channel. The fast EMA has a parameter of 89 periods and the slow EMA has a parameter of 200 periods. At the same time, three EMAs based on high price, low price and close price are used to build the channel range. The upper rail and lower rail of the channel are 34-period high price EMA and low price EMA respectively.  

When the fast EMA is above the slow EMA and the price is below the lower rail, it is determined as an upward trend. When the fast EMA is below the slow EMA and the price is above the upper rail, it is determined as a downward trend.

During an upward trend, the strategy will open short positions when the trend reversal is identified. During a downward trend, the strategy will open long positions when the trend reversal is identified.

In addition, the strategy has a trailing stop loss function. After opening positions, the trailing stop loss price will be updated in real time to lock in profits.

### Advantage Analysis 

The biggest advantage of this strategy is that it uses the double moving average price channel to determine the price trend, combined with reversal trading to avoid chasing highs and selling lows. At the same time, it has a trailing stop loss function to lock in profits and reduce the risk of losses.

Other advantages include: large parameter optimization space that can be adjusted for different products and cycles; real-time update of stop loss price with low operating risk.

### Risk Analysis

The main risk of this strategy is that the effectiveness of identifying reversal signals may not be ideal and misjudgments may occur. In this case, parameters need to be optimized to ensure the effectiveness of determining trend reversals.

In addition, the setting of stop loss points is also very critical. If the stop loss point is too high, the stop loss may not be decisive enough. If the stop loss point is too low, there may be excessive stop loss situations. This needs to be adjusted according to specific products.

Finally, data problems can also lead to strategy failure. It is necessary to ensure that credible, continuous and sufficient historical data is used for backtesting and live trading verification of the strategy.

### Optimization Directions

The main areas for optimizing this strategy include:

1. The periods of the fast EMA and slow EMA can be optimized by testing different parameter combinations to determine the effect  

2. The parameters of the upper and lower rails of the price channel can also be adjusted to find more suitable cycle parameters

3. The setting of stop loss points is critical and can be optimized by testing different parameters

4. Test whether introducing other indicators to determine trend reversal can improve trading performance

### Conclusion

The overall operation process of this strategy is reasonable and smooth. It uses the double moving average channel to determine the trend direction for trading, and has a trailing stop loss to lock in profits. Through parameter optimization and risk management optimization, this strategy can become an efficient quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Day|
|v_input_2|6|From Month|
|v_input_3|2020|From Year|
|v_input_4|true|To Day|
|v_input_5|12|To Month|
|v_input_6|2020|To Year|
|v_input_7|34|High Low PAC channel Length|
|v_input_8|89|fastEMAlength|
|v_input_9|200|mediumEMAlength|
|v_input_10|600|slowEMAlength|
|v_input_11|false|ShowFastEMA|
|v_input_12|false|ShowMediumEMA|
|v_input_13|false|ShowSlowEMA|
|v_input_14|false|ShowHHLL|
|v_input_15|false|ShowFractals|
|v_input_16|false|Show Ideal Fractals Only|
|v_input_17|true|Show coloured Bars around PAC|
|v_input_18|false|Show Buy/Sell Alert Arrows|
|v_input_19|3|Pullback Lookback for PAC Cross Check|
|v_input_20|false|Show Alert Arrows Only on Closed Candles|
|v_input_21|true|ShowTrendBGcolor|
|v_input_22|false|Use Heikin Ashi Candles in Algo Calculations|
|v_input_23|0.1|Trail Long Loss (%)|
|v_input_24|0.1|Trail Short Loss (%)|
|v_input_25|14|ATR Range|
|v_input_26|2|* ATR Buy SL|
|v_input_27|true|* ATR Sell SL|
|v_input_28|true|* ATR TP1|
|v_input_29|0.5| move to entry in % towards target|
|v_input_30|true|Show Move to Entry points|
|v_input_31|0.0032|tp|
|v_input_32|0.001|sl|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Trend trader Strategy", overlay=true)

//f you want to trade shallower Pullbacks for quicker scalps, try reducing the 
//    PAC and EMA combination lengths for example:
//      * 21 PAC and 55, 144, 377 for fast, medium, slow EMAs
//      * 13 PAC and 34, 89, 233 for fast, medium, slow EMAs
//  - Each alert should be evaluated on it's own merits, the alerts are designed to highlight possible
//    scalping trades from Pullback recoveries around the PAC.

fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 6, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2020, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)

isMon() => dayofweek(time('D')) == dayofweek.monday
isTue() => dayofweek(time('D')) == dayofweek.tuesday
isWed() => dayofweek(time('D')) == dayofweek.wednesday
isThu() => dayofweek(time('D')) == dayofweek.thursday
isFri() => dayofweek(time('D')) == dayofweek.friday
 
// Calculate start/end date and time condition
DST = 1 //day light saving for usa
//--- Europe
London = iff(DST==0,"0000-0900","0100-1000")
//--- America
NewYork = iff(DST==0,"0400-1400","0500-1500")
//--- Pacific
Sydney = iff(DST==0,"1300-2200","1400-2300")
//--- Asia
Tokyo = iff(DST==0,"1500-2400","1600-0100")

customTime =iff(DST==0,"2300-1500","2400-1600")
customTime2 =iff(DST==0,"0800-1500","0900-1600")

//-- Time In Range
timeinrange(res, sess) => time(res, sess) != 0

london = timeinrange(timeframe.period, London)
newyork = timeinrange(timeframe.period, NewYork)
c_time = timeinrange(timeframe.period,customTime)
c_time2 = timeinrange(timeframe.period,customTime2)

startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = time >= startDate and time <= finishDate and (london or newyork)


    // === INPUTS ===
HiLoLen         = input(34, minval=2, title="High Low PAC channel Length")
fastEMAlength   = input(89, minval=2)
mediumEMAlength = input(200, minval=2)
slowEMAlength   = input(600, minval=2)
ShowFastEMA     = input(false)
ShowMediumEMA   = input(false)
ShowSlowEMA     = input(false)
ShowHHLL        = input(false)
ShowFractals    = input(false)
filterBW        = input(false, title="Show Ideal Fractals Only")
ShowBarColor    = input(true, title="Show coloured Bars around PAC")
ShowBuySell     = input(false, title="Show Buy/Sell Alert Arrows")
Lookback        = input(3, minval=1, title="Pullback Lookback for PAC Cross Check")
DelayArrow      = input(false, title="Show Alert Arrows Only on Closed Candles")
Delay           = DelayArrow ? 1 : 0
ShowTrendBGcolor= input(true)
UseHAcandles    = input(false, title="Use Heikin Ashi Candles in Algo Calculations")
//
// === /INPUTS ===

// === BASE FUNCTIONS ===

haClose = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, close) : close
haOpen  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, open) : open
haHigh  = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, high) : high
haLow   = UseHAcandles ? security(heikinashi(syminfo.tickerid), timeframe.period, low) : low


//  ||---   Fractal Recognition Functions:  ---------------------------------------------------------------||
isRegularFractal(mode) =>
    ret = mode == 1 ? high[4] < high[3] and high[3] < high[2] and high[2] > high[1] and 
       high[1] > high[0] : mode == -1 ? 
       low[4] > low[3] and low[3] > low[2] and low[2] < low[1] and low[1] < low[0] : 
       false
    ret

isBWFractal(mode) =>
    ret = mode == 1 ? high[4] < high[2] and high[3] <= high[2] and high[2] >= high[1] and 
       high[2] > high[0] : mode == -1 ? 
       low[4] > low[2] and low[3] >= low[2] and low[2] <= low[1] and low[2] < low[0] : 
       false
    ret
//  ||-----------------------------------------------------------------------------------------------------||

//
// === /BASE FUNCTIONS ===

// === SERIES SETUP ===
//

//  ||---   Setup Moving Averages and PAC channel:
//  ||-----------------------------------------------------------------------------------------------------||
fastEMA     = ema(haClose, fastEMAlength)
mediumEMA   = ema(haClose, mediumEMAlength)
slowEMA     = ema(haClose, slowEMAlength)
pacC        = ema(haClose, HiLoLen)
pacL        = ema(haLow, HiLoLen)
pacU        = ema(haHigh, HiLoLen)
TrendDirection = fastEMA > mediumEMA and pacL > mediumEMA ? 1 : 
   fastEMA < mediumEMA and pacU < mediumEMA ? -1 : 0

//  ||---   Fractal Recognition:
//  ||-----------------------------------------------------------------------------------------------------||
filteredtopf = filterBW ? isRegularFractal(1) : isBWFractal(1)
filteredbotf = filterBW ? isRegularFractal(-1) : isBWFractal(-1)
//  ||-----------------------------------------------------------------------------------------------------||
//  ||---   Higher Highs, Lower Highs, Higher Lows, Lower Lows  -------------------------------------------||
valuewhen_H0 = valuewhen(filteredtopf == true, high[2], 0)
valuewhen_H1 = valuewhen(filteredtopf == true, high[2], 1)
valuewhen_H2 = valuewhen(filteredtopf == true, high[2], 2)
//
higherhigh = filteredtopf == false ? false : 
   valuewhen_H1 < valuewhen_H0 and valuewhen_H2 < valuewhen_H0
lowerhigh = filteredtopf == false ? false : 
   valuewhen_H1 > valuewhen_H0 and valuewhen_H2 > valuewhen_H0
valuewhen_L0 = valuewhen(filteredbotf == true, low[2], 0)
valuewhen_L1 = valuewhen(filteredbotf == true, low[2], 1)
valuewhen_L2 = valuewhen(filteredbotf == true, low[2], 2)
//
higherlow = filteredbotf == false ? false : 
   valuewhen_L1 < valuewhen_L0 and valuewhen_L2 < valuewhen_L0
lowerlow = filteredbotf == false ? false : 
   valuewhen_L1 > valuewhen_L0 and valuewhen_L2 > valuewhen_L0

//
// === /SERIES ===

//
// === PLOTTING ===
// 
// Plot the Price Action Channel (PAC) base on EMA high,low and close
L = plot(pacL, color=color.gray, linewidth=1, title="High PAC EMA", transp=50)
U = plot(pacU, color=color.gray, linewidth=1, title="Low PAC EMA", transp=50)
C = plot(pacC, color=color.red, linewidth=2, title="Close PAC EMA", transp=0)
fill(L, U, color=color.gray, transp=90, title="Fill HiLo PAC")

// Colour bars according to the close position relative to the PAC selected.
BARcolor = haClose > pacU ? color.blue : haClose < pacL ? color.red : color.gray
barcolor(ShowBarColor ? BARcolor : na, title="Bar Colours")
//
BGcolor = TrendDirection == 1 ? color.green : 
   TrendDirection == -1 ? color.red : color.yellow
bgcolor(ShowTrendBGcolor ? BGcolor : na, transp=90, title="Trend BG Color")


// STEP 1:
// Configure trail stop level with input options (optional)
longTrailPerc = input(title="Trail Long Loss (%)",
     type=input.float, minval=0.0, step=0.05, defval=0.1) * 0.01

shortTrailPerc = input(title="Trail Short Loss (%)",
     type=input.float, minval=0.0, step=0.05, defval=0.1) * 0.01


atrRange = input(14, title="ATR Range", type=input.integer)
buyStop = input(2, title="* ATR Buy SL", type=input.float)
sellStop = input(1, title="* ATR Sell SL", type=input.float)
targetATR = input(1, title="* ATR TP1", type=input.float)
moveToEntryFigure = input(0.5, title=" move to entry in % towards target", type=input.float)

showMove = input(true, title="Show Move to Entry points")

showMoveBuycol = showMove ? color.lime : na
showMoveSellcol = showMove ? color.lime : na

// Plots

buyStopp = plot(close - atr(atrRange) * buyStop, title="Buy SL", style=plot.style_stepline, color=color.red, transp=75, linewidth=3)
sellStopp = plot(close + atr(atrRange) * sellStop, title="Sell SL", style=plot.style_stepline, color=color.red, transp=75, linewidth=3)

buyTP1 = plot(close + atr(atrRange) * targetATR, title="Buy TP", style=plot.style_cross, color=color.lime, transp=75, linewidth=3)
sellTP1 = plot(close - atr(atrRange) * targetATR, title="Sell TP", style=plot.style_cross, color=color.lime, transp=75, linewidth=3)

buyMove = plot(close + atr(atrRange) * targetATR * moveToEntryFigure, title="Buy Move to Entry", style=plot.style_cross, color=showMoveBuycol, transp=75, linewidth=3)
sellMove = plot(close - atr(atrRange) * targetATR * moveToEntryFigure, title="Sell Move to Entry", style=plot.style_cross, color=showMoveSellcol, transp=75, linewidth=3)


if barstate.isconfirmed
    if(BGcolor==color.red and BGcolor[1]==color.yellow and c_time )
        strategy.entry("short", strategy.short, comment="short", alert_message='short')
        strategy.cancel("long")
    if(BGcolor==color.green and BGcolor[1]==color.yellow and c_time )
        strategy.entry("long", strategy.long, comment="long", alert_message = 'long')
        strategy.cancel("short")


// STEP 2:
// Determine trail stop loss prices
longStopPrice = 0.0, shortStopPrice = 0.0

longStopPrice := if (strategy.position_size > 0)
    stopValue = close * (1 - longTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0

shortStopPrice := if (strategy.position_size < 0)
    stopValue = close * (1 + shortTrailPerc)
    min(stopValue, shortStopPrice[1])
else
    999999

// Plot stop loss values for confirmation
plot(series=(strategy.position_size > 0) ? longStopPrice : na,
     color=color.fuchsia, style=plot.style_cross,
     linewidth=2, title="Long Trail Stop")
plot(series=(strategy.position_size < 0) ? shortStopPrice : na,
     color=color.fuchsia, style=plot.style_cross,
     linewidth=2, title="Short Trail Stop")


// STEP 3:
// Submit exit orders for trail stop loss price
//if (strategy.position_size > 0)
//    strategy.exit("XL TRL STP","long", stop=longStopPrice)

//if (strategy.position_size < 0)
//    strategy.exit("XS TRL STP","short", stop=shortStopPrice)


tp=input(0.0032,type=input.float, title="tp")
sl=input(0.001,type=input.float, title="sl")

//strategy.close("long", when= tp/2,qty_percent = 50)

//strategy.exit("longtp/sl","long",profit=tp, loss=sl, stop=longStopPrice, alert_message='closelong')
//strategy.exit("shorttp/sl","short",profit=tp, loss=sl, stop=shortStopPrice, alert_message='closeshort')

//tpatrlong= close + atr(atrRange) * targetATR
//slatrlong= close - atr(atrRange) * buyStop

//strategy.exit("longtp/sl","long",profit=tp, loss=sl, alert_message='closelong')
//strategy.exit("shorttp/sl","short",profit=tp, loss=sl, alert_message='closeshort')

strategy.exit("closelong", "long" , profit = close * tp / syminfo.mintick, loss = close * sl / syminfo.mintick, alert_message = "closelong")
strategy.exit("closeshort", "short" , profit = close * tp / syminfo.mintick, loss = close * sl / syminfo.mintick, alert_message = "closeshort")

if(BGcolor==color.yellow or not c_time)
    strategy.close("short", comment="time or yellow", alert_message='closeshort')
    strategy.close("long", comment="time or yellow", alert_message='closelong')


    



```

> Detail

https://www.fmz.com/strategy/440505

> Last Modified

2024-01-31 10:37:13
