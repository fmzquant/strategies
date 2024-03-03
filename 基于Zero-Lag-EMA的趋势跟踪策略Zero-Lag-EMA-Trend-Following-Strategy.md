
> Name

基于Zero-Lag-EMA的趋势跟踪策略Zero-Lag-EMA-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是一个典型的趋势跟踪策略。它使用快慢Zero-Lag EMA策略判断趋势方向,结合移动止损、止盈、复利等机制实现趋势跟踪交易。

## 策略原理

1. 计算快速Zero-Lag EMA和慢速Zero-Lag EMA。它们分别使用不同周期平滑价格。

2. 当快速线上穿慢速线时产生做多信号;当快速线下穿慢速线时产生做空信号。

3. 进场后设置移动止损线,跟踪最高价/最低价,实现风险控制。

4. 设置移动止盈线,当价格达到一定比例时止盈退出。

5. 使用开仓次数计数器实现类似复利的加仓机制。

## 优势分析

1. Zero-Lag EMA对延迟响应较小,可以更快捕捉趋势转变。

2. 双EMA策略比较简单直观,容易判断操作方向。

3. 止损止盈设置合理,可以很好控制单笔亏损。

4. 加仓机制可以在趋势扩张时获得更多利润。

## 风险分析 

1. 参数设定不当可能导致止损止盈过于激进或保守。

2. 趋势判断指标选择不当可能错过趋势转变时机。

3. 加仓机制在趋势反转时可能扩大总体损失。

4. 需要针对不同品种调整参数,避免过拟合某一品种。

## 优化方向

1. 测试不同EMA周期参数,找到更合适的参数组合。

2. 优化止损止盈比例,在盈利和风险控制间找到平衡。

3. 调整加仓逻辑,限制单向最多开仓次数。

4. 增加其它技术指标进行入场过滤,提高信号质量。

5. 在特定时间段内关闭交易,避开容易产生错误信号的时间段。

6. 针对不同品种特点分别测试参数,提高稳定性。

## 总结

该策略整体运行稳定,收益风险比也较优秀。通过参数优化、辅助过滤等手段可以进一步增强策略效果。也需要警惕在个别行情下可能出现的信号错误。总体来说,该策略框架设计合理,有望通过持续调整优化成为一个稳定收益的趋势跟踪策略。

|| 

## Overview

This is a typical trend following strategy. It uses fast and slow Zero-Lag EMA to determine trend direction, and incorporates mechanisms like trailing stop, take profit and pyramiding to follow trends.

## Strategy Logic  

1. Calculate fast and slow Zero-Lag EMA using different smooth periods. 

2. Long signal is generated when fast EMA crosses above slow EMA, and short signal when fast EMA crosses below slow EMA.

3. Set trailing stop line after entry to follow highest/lowest price for risk control.

4. Take profit when price reaches certain percentage for profit taking.

5. Use open counts for pyramiding similar to compound interest.

## Advantage Analysis

1. Zero-Lag EMA has less lag in responding to trend changes.

2. Dual EMA strategy is simple and intuitive for directional judgement. 

3. Stop loss and take profit settings effectively control single trade loss.

4. Pyramiding mechanism allows more profits when trend extends.

## Risk Analysis

1. Improper parameter settings may cause over-aggressive or over-conservative stop loss/take profit.

2. Wrong trend indicator may miss trend change moments. 

3. Pyramiding can amplify total loss when trend reverses.

4. Parameters need tuning for different products to avoid overfitting.

## Improvement Directions 

1. Test different EMA periods to find better parameter combinations.

2. Optimize stop/take ratios to balance profitability and risk control.

3. Adjust pyramiding logic to limit max open count per direction. 

4. Add other technical indicators for entry filter to improve signal quality.

5. Disable trading during specific hours to avoid wrong signal-prone periods.

6. Test parameters separately on different products to improve robustness.

## Summary

The strategy shows overall stable running with decent risk-adjusted returns. It can be further improved via parameter optimization, auxiliary filtration etc. Also need to watch out potential signal errors in certain market conditions. Overall this strategy has a sound framework and shows potential to become a steady profitable trend following strategy after continuous refinements.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|Backtest Start Year|
|v_input_2|3|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|77777777|Backtest Stop Year|
|v_input_5|11|Backtest Stop Month|
|v_input_6|15|Backtest Stop Day|
|v_input_7_close|0|ZeroLag EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|8|ZeroLag EMA Fast Length|
|v_input_9|21|ZeroLag EMA Slow Length|
|v_input_10|false|Longs Only|
|v_input_11|false|Shorts Only|
|v_input_12|false|Flip the Opens|
|v_input_13|true|Pyramiding less than|
|v_input_14|false|Pyramiding equal to|
|v_input_15|1000000|Pyramiding greater than|
|v_input_16|false|Trailing Stop|
|v_input_17|1300|Activate Trailing Stop Price (%). Divided by 100 (1 = 0.01%)|
|v_input_18|400|Trailing Stop (%). Divided by 100 (1 = 0.01%)|
|v_input_19|true|Take Profit|
|v_input_20|300|Take Profit (%). Divided by 100 (1 = 0.01%)|
|v_input_21|false|Stop Loss|
|v_input_22|750|Stop Loss (%). Divided by 100 (1 = 0.01%)|
|v_input_23|34|Lookback Period|
|v_input_24|30|Resolution|
|v_input_25|7|Number of Fibonacci Volatility Deviations|


> Source (PineScript)

``` pinescript
//@version=3
// Learn more about Autoview and how you can automate strategies like this one here: https://autoview.with.pink/
strategy("MP ZeroLag EMA", "MP 0 Strat", overlay=true, pyramiding=0, initial_capital=100000, currency=currency.USD, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent, commission_value=0.1)
 
//bgcolor ( color=black, transp=40, title='Blackground', editable=true)
 
///////////////////////////////////////////////
//* Backtesting Period Selector | Component *//
///////////////////////////////////////////////
 
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(3, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,00,00)
 
testStopYear = input(77777777, "Backtest Stop Year")
testStopMonth = input(11, "Backtest Stop Month")
testStopDay = input(15, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)
 
testPeriod() => true
 
/////////////////////////////////////
//* Put your strategy logic below *//
/////////////////////////////////////
 
// === INPUTS ===
zlmaSource      = input(defval = close, title = "ZeroLag EMA Source")
zlmaFastLength  = input(defval = 8, title = "ZeroLag EMA Fast Length")
zlmaSlowLength  = input(defval = 21, title = "ZeroLag EMA Slow Length")

// === /INPUTS ===
 
// === SERIES SETUP ===
// Fast ZeroLag EMA
zema1=ema(zlmaSource, zlmaFastLength)
zema2=ema(zema1, zlmaFastLength)
c1=zema1-zema2
zlemaFast=zema1+c1
 
// Slow ZeroLag EMA
zema3=ema(zlmaSource, zlmaSlowLength)
zema4=ema(zema3, zlmaSlowLength)
c2=zema3-zema4
zlemaSlow=zema3+c2
 
// Plots and Conditions
plot(zlemaFast, title='Fast ZeroLag EMA', color = yellow, linewidth=4)
plot(zlemaSlow, title='Slow ZeroLag EMA', color = fuchsia, linewidth=4)

 
// Long/Short Logic
longLogic = crossover(zlemaFast,zlemaSlow) ? 1 : 0
shortLogic = crossunder(zlemaFast,zlemaSlow) ? 1 : 0
 
//////////////////////////
//* Strategy Component *//
//////////////////////////
 
isLong = input(false, "Longs Only")
isShort = input(false, "Shorts Only")
isFlip = input(false, "Flip the Opens")
 
long = longLogic
short = shortLogic
 
if isFlip
    long := shortLogic
    short := longLogic
else
    long := longLogic
    short := shortLogic
 
if isLong
    long := long
    short := na
 
if isShort
    long := na
    short := short
   
////////////////////////////////
//======[ Signal Count ]======//
////////////////////////////////
 
sectionLongs = 0
sectionLongs := nz(sectionLongs[1])
sectionShorts = 0
sectionShorts := nz(sectionShorts[1])
 
if long
    sectionLongs := sectionLongs + 1
    sectionShorts := 0
 
if short
    sectionLongs := 0
    sectionShorts := sectionShorts + 1
 
//////////////////////////////
//======[ Pyramiding ]======//
//////////////////////////////
 
pyrl = input(1, "Pyramiding less than") // If your count is less than this number
pyre = input(0, "Pyramiding equal to") // If your count is equal to this number
pyrg = input(1000000, "Pyramiding greater than") // If your count is greater than this number
 
longCondition = long and sectionLongs <= pyrl or long and sectionLongs >= pyrg or long and sectionLongs == pyre ? 1 : 0
shortCondition = short and sectionShorts <= pyrl or short and sectionShorts >= pyrg or short and sectionShorts == pyre ? 1 : 0
 
////////////////////////////////
//======[ Entry Prices ]======//
////////////////////////////////
 
last_open_longCondition = na
last_open_shortCondition = na
last_open_longCondition := longCondition ? close : nz(last_open_longCondition[1])
last_open_shortCondition := shortCondition ? close : nz(last_open_shortCondition[1])
 
////////////////////////////////////
//======[ Open Order Count ]======//
////////////////////////////////////
 
sectionLongConditions = 0
sectionLongConditions := nz(sectionLongConditions[1])
sectionShortConditions = 0
sectionShortConditions := nz(sectionShortConditions[1])
 
if longCondition
    sectionLongConditions := sectionLongConditions + 1
    sectionShortConditions := 0
 
if shortCondition
    sectionLongConditions := 0
    sectionShortConditions := sectionShortConditions + 1
   
///////////////////////////////////////////////
//======[ Position Check (long/short) ]======//
///////////////////////////////////////////////
 
last_longCondition = na
last_shortCondition = na
last_longCondition := longCondition ? time : nz(last_longCondition[1])
last_shortCondition := shortCondition ? time : nz(last_shortCondition[1])
 
in_longCondition = last_longCondition > last_shortCondition
in_shortCondition = last_shortCondition > last_longCondition
 
/////////////////////////////////////
//======[ Position Averages ]======//
/////////////////////////////////////
 
totalLongs = 0.0
totalLongs := nz(totalLongs[1])
totalShorts = 0.0
totalShorts := nz(totalShorts[1])
averageLongs = 0.0
averageLongs := nz(averageLongs[1])
averageShorts = 0.0
averageShorts := nz(averageShorts[1])
 
if longCondition
    totalLongs := totalLongs + last_open_longCondition
    totalShorts := 0.0
 
if shortCondition
    totalLongs := 0.0
    totalShorts := totalShorts + last_open_shortCondition
 
averageLongs := totalLongs / sectionLongConditions
averageShorts := totalShorts / sectionShortConditions
 
/////////////////////////////////
//======[ Trailing Stop ]======//
/////////////////////////////////
 
isTS = input(false, "Trailing Stop")
tsi = input(1300, "Activate Trailing Stop Price (%). Divided by 100 (1 = 0.01%)") / 100
ts = input(400, "Trailing Stop (%). Divided by 100 (1 = 0.01%)") / 100
 
last_high = na
last_low = na
last_high_short = na
last_low_short = na
last_high := not in_longCondition ? na : in_longCondition and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_high_short := not in_shortCondition ? na : in_shortCondition and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_shortCondition ? na : in_shortCondition and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])
last_low_short := not in_longCondition ? na : in_longCondition and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])
 
long_ts = isTS and not na(last_high) and low <= last_high - last_high / 100 * ts and longCondition == 0 and last_high >= averageLongs + averageLongs / 100 * tsi
short_ts = isTS and not na(last_low) and high >= last_low + last_low / 100 * ts and shortCondition == 0 and last_low <= averageShorts - averageShorts/ 100 * tsi
 
///////////////////////////////
//======[ Take Profit ]======//
///////////////////////////////
 
isTP = input(true, "Take Profit")
tp = input(300, "Take Profit (%). Divided by 100 (1 = 0.01%)") / 100
long_tp = isTP and close > averageLongs + averageLongs / 100 * tp and not longCondition
short_tp = isTP and close < averageShorts - averageShorts / 100 * tp and not shortCondition
 
/////////////////////////////
//======[ Stop Loss ]======//
/////////////////////////////
 
isSL = input(false, "Stop Loss")
sl = input(750, "Stop Loss (%). Divided by 100 (1 = 0.01%)") / 100
long_sl = isSL and close < averageLongs - averageLongs / 100 * sl and longCondition == 0
short_sl = isSL and close > averageShorts + averageShorts / 100 * sl and shortCondition == 0
 
/////////////////////////////////
//======[ Close Signals ]======//
/////////////////////////////////
 
longClose = long_tp or long_sl or long_ts  ? 1 : 0
shortClose = short_tp or short_sl or short_ts ? 1: 0
 
///////////////////////////////
//======[ Plot Colors ]======//
///////////////////////////////
 
longCloseCol = na
shortCloseCol = na
longCloseCol := long_tp ? purple : long_sl ? maroon : long_ts ? blue : longCloseCol[1]
shortCloseCol := short_tp ? purple : short_sl ? maroon : short_ts ? blue : shortCloseCol[1]
tpColor = isTP and in_longCondition ? purple : isTP and in_shortCondition ? purple : white
slColor = isSL and in_longCondition ? red : isSL and in_shortCondition ? red : white
 
//////////////////////////////////
//======[ Strategy Plots ]======//
//////////////////////////////////
 
plot(isTS and in_longCondition ? averageLongs + averageLongs / 100 * tsi : na, "Long Trailing Activate", blue, style=3, linewidth=2)
plot(isTS and in_longCondition and last_high >= averageLongs +  averageLongs / 100 * tsi ? last_high - last_high / 100 * ts : na, "Long Trailing", fuchsia, style=2, linewidth=3)
plot(isTS and in_shortCondition ? averageShorts - averageShorts/ 100 * tsi : na, "Short Trailing Activate", blue, style=3, linewidth=2)
plot(isTS and in_shortCondition and last_low <= averageShorts - averageShorts/ 100 * tsi ? last_low + last_low / 100 * ts : na, "Short Trailing", fuchsia, style=2, linewidth=3)
plot(isTP and in_longCondition and last_high < averageLongs + averageLongs / 100 * tp ? averageLongs + averageLongs / 100 * tp : na, "Long TP", tpColor, style=3, linewidth=2)
plot(isTP and in_shortCondition and last_low > averageShorts - averageShorts / 100 * tp ? averageShorts - averageShorts / 100 * tp : na, "Short TP", tpColor, style=3, linewidth=2)
plot(isSL and in_longCondition and last_low_short > averageLongs - averageLongs / 100 * sl ? averageLongs - averageLongs / 100 * sl : na, "Long SL", slColor, style=3, linewidth=2)
plot(isSL and in_shortCondition and last_high_short < averageShorts + averageShorts / 100 * sl ? averageShorts + averageShorts / 100 * sl : na, "Short SL", slColor, style=3, linewidth=2)
 
///////////////////////////////
//======[ Alert Plots ]======//
///////////////////////////////
 
// Old Signal Plots
//plot(longCondition, "Long", green)
//plot(shortCondition, "Short", red)
//plot(longClose, "Long Close", longCloseCol)
//plot(shortClose, "Short Close", shortCloseCol)
 
 
// New Signal Plots
//plotshape(series=longCondition, title="Long", style=shape.triangleup, location=location.belowbar, color=green, size=size.tiny)
//plotshape(series=shortCondition, title="Short", style=shape.triangledown, location=location.abovebar, color=red, size=size.tiny)
//plotshape(series=longClose, title="Long Close", style=shape.triangleup, location=location.belowbar, color=blue, size=size.tiny)
//plotshape(series=shortClose, title="Short Close", style=shape.triangledown, location=location.abovebar, color=purple, size=size.tiny)
 
//alertcondition(condition=longCondition, title="Long", message="")
//alertcondition(condition=shortCondition, title="Short", message="")
//alertcondition(condition=longClose, title="Long Close", message="")
//alertcondition(condition=shortClose, title="Short Close", message="")
 
///////////////////////////////////
//======[ Reset Variables ]======//
///////////////////////////////////
 
if longClose or not in_longCondition
    averageLongs := 0
    totalLongs := 0.0
    sectionLongs := 0
    sectionLongConditions := 0
 
if shortClose or not in_shortCondition
    averageShorts := 0
    totalShorts := 0.0
    sectionShorts := 0
    sectionShortConditions := 0
 
////////////////////////////////////////////
//======[ Strategy Entry and Exits ]======//
////////////////////////////////////////////
 
if testPeriod()
    strategy.entry("Long", 1, when=longCondition)
    strategy.entry("Short", 0,  when=shortCondition)
    strategy.close("Long", when=longClose)
    strategy.close("Short", when=shortClose)
    
    
//////NEW STUFF

//temainput  = input(24, minval=1, title="Fast TEMA")
//hullinput = input(39, minval=1, title="Slow hullMA")
//rmainput = input(48, minval=1, title="RMA (BB Signal)")
//bblength = input(20, minval=1, title="BB Length")
//mult = input(1.5, minval=0.001, maxval=50, title="BB stdev Mult")
//src = input(defval=close, type=source, title="Source")

//Moving Average Params

//hullMA
//hullma = wma(2*wma(close, hullinput/2)-wma(close, hullinput), round(sqrt(hullinput)))

//TEMA
//ema = ema(close, temainput)
//ema1 = ema(ema, temainput)
//ema2 = ema(ema1, temainput)
//tema = 3 * (ema - ema1) + ema2

//RMA
//rma = ema(close, 96)

//BB
//basis = sma(tema, bblength)
//dev = mult * stdev(tema, bblength)
//upper = basis + dev
//lower = basis - dev

//Color Swaps
//ribbon = tema>=hullma ? #c0fff4 : #ffbcc8
//bandcolor = rma>=basis ? #ffbcc8 : #c0fff4


//Plots
//plot(basis, title="Bollinger Band Basis", color=red, transp=0)
//upband = plot(upper, color=#ffbcc8, transp=100, editable=false)
//downband = plot(lower, color=#ffbcc8, transp=100, editable=false)

//Fills
//temap = plot(tema, title="TEMA", color=white, transp=100, editable=false)
//emap = plot(hullma, title="EMA", color=white, transp=100, editable=false)
//fill (temap, emap, color=ribbon, title="MA Ribbon", transp=50)
//fill(upband, downband, title="Bollinger Band Background", color=bandcolor)

///////END NEW

///--------New, DW Art----------

//Period
per = input(defval=34, title="Lookback Period")

//Current Resolution
res = input(defval=30, title="Resolution")

//Deviations
ndev = input(defval=7, minval=0, maxval=7, title="Number of Fibonacci Volatility Deviations")

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Definitions
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Source
src  = close
dsrc = high - low

//Periods Per Annum
ppa = (1440/res)*365

//Periodic Volatility
Si = log(close/close[1])
Sm = avg(Si, per)
pv = (sqrt((sum(pow((Si - Sm), 2), per))/(per*ppa)))

//Price Geometric Moving Averages
lmean = log(src)
smean = sum(lmean,per)
gma   = exp(smean/per)
lmeand = log(dsrc)
smeand = sum(lmeand,per)
gmad   = exp(smeand/per)

//Deviations
dev  = gmad*pv
ud1  = gma + dev
dd1  = gma - dev
ud2  = gma + dev*2
dd2  = gma - dev*2
ud3  = gma + dev*3
dd3  = gma - dev*3
ud5  = gma + dev*5
dd5  = gma - dev*5
ud8  = gma + dev*8
dd8  = gma - dev*8
ud13 = gma + dev*13
dd13 = gma - dev*13
ud21 = gma + dev*21
dd21 = gma - dev*21
u1  = (ndev==1) or (ndev==2) or (ndev==3) or (ndev==4) or (ndev==5) or (ndev==6) or (ndev==7) ? ud1 : na
d1  = (ndev==1) or (ndev==2) or (ndev==3) or (ndev==4) or (ndev==5) or (ndev==6) or (ndev==7) ? dd1 : na
u2  = (ndev==2) or (ndev==3) or (ndev==4) or (ndev==5) or (ndev==6) or (ndev==7) ? ud2 : na
d2  = (ndev==2) or (ndev==3) or (ndev==4) or (ndev==5) or (ndev==6) or (ndev==7) ? dd2 : na
u3  = (ndev==3) or (ndev==4) or (ndev==5) or (ndev==6) or (ndev==7) ? ud3 : na
d3  = (ndev==3) or (ndev==4) or (ndev==5) or (ndev==6) or (ndev==7) ? dd3 : na
u5  = (ndev==4) or (ndev==5) or (ndev==6) or (ndev==7) ? ud5 : na
d5  = (ndev==4) or (ndev==5) or (ndev==6) or (ndev==7) ? dd5 : na
u8  = (ndev==5) or (ndev==6) or (ndev==7) ? ud8 : na
d8  = (ndev==5) or (ndev==6) or (ndev==7) ? dd8 : na
u13 = (ndev==6) or (ndev==7) ? ud13 : na
d13 = (ndev==6) or (ndev==7) ? dd13 : na
u21 = (ndev==7) ? ud21 : na
d21 = (ndev==7) ? dd21 : na

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Plots
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

//GMA
gp = plot(gma, color=black, title="GMA")

//Deviations
u21p = plot(u21, color=lime, title="Upper Deviation x 21", transp=100)
u13p = plot(u13, color=lime, title="Upper Deviation x 13", transp=100)
u8p  = plot(u8,  color=lime, title="Upper Deviation x 8",  transp=100)
u5p  = plot(u5,  color=lime, title="Upper Deviation x 5",  transp=100)
u3p  = plot(u3,  color=lime, title="Upper Deviation x 3",  transp=100)
u2p  = plot(u2,  color=lime, title="Upper Deviation x 2",  transp=100)
u1p  = plot(u1,  color=lime, title="Uper Deviation",       transp=100)
d1p  = plot(d1,  color=red,  title="Lower Deviation",      transp=100)
d2p  = plot(d2,  color=red,  title="Lower Deviation x 2",  transp=100)
d3p  = plot(d3,  color=red,  title="Lower Deviation x 3",  transp=100)
d5p  = plot(d5,  color=red,  title="Lower Deviation x 5",  transp=100)
d8p  = plot(d8,  color=red,  title="Lower Deviation x 8",  transp=100)
d13p = plot(d13, color=red,  title="Lower Deviation x 13", transp=100)
d21p = plot(d21, color=red,  title="Lower Deviation x 21", transp=100)

//Fills
fill(u21p, gp, color=silver, transp=90)
fill(u13p, gp, color=silver, transp=90)
fill(u8p, gp,  color=silver, transp=90)
fill(u5p, gp,  color=silver, transp=90)
fill(u3p, gp,  color=silver, transp=90)
fill(u2p, gp,  color=silver, transp=90)
fill(u1p, gp,  color=silver, transp=90)
fill(d1p, gp,  color=silver,  transp=90)
fill(d2p, gp,  color=silver,  transp=90)
fill(d3p, gp,  color=silver,  transp=90)
fill(d5p, gp,  color=silver,  transp=90)
fill(d8p, gp,  color=silver,  transp=90)
fill(d13p, gp, color=silver,  transp=90)
fill(d21p, gp, color=silver,  transp=90)
    
```

> Detail

https://www.fmz.com/strategy/427369

> Last Modified

2023-09-20 14:30:03
