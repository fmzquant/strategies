
> Name

多重移动平均线动态趋势策略Multiple-Moving-Average-Dynamic-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c0824fa4402d65f316.png)
[trans]


## 概述

多重移动平均线动态趋势策略(Multiple Moving Average Dynamic Trend Strategy)是一个利用多种移动平均线指标判断趋势方向,并动态调整止损线位置的量化交易策略。该策略通过结合不同类型的移动平均线,可以更全面和准确地判断市场趋势,实现高胜率交易。

## 策略原理  

该策略主要通过自定义函数实现8种不同类型的移动平均线,包括简单移动平均线(SMA)、指数移动平均线(EMA)、加权移动平均线(WMA)、三角移动平均线(TMA)、可变指数移动平均线(VIDYA)、威尔德移动平均线(WWMA)、零滞后指数移动平均线(ZLEMA)和真实强度指标(TSF)。策略允许用户在这8种移动平均线中选择一种作为主要判断指标。 

策略首先计算选定类型的移动平均线,然后根据设定的百分比参数动态计算上轨和下轨的位置。当价格突破上轨时为买入信号,突破下轨时为卖出信号。此外,策略还会跟踪移动平均线和价格的交叉作为辅助判断信号。

在计算过程中,策略同时判断市场趋势方向,从而动态调整上下轨的位置。具体来说,当判断为上升趋势时,下轨线会随着价格上涨而上调,使得止损线能够最优地跟踪价格上涨;当判断为下降趋势时,上轨线会随着价格下跌而下调,降低止损点以减少损失。

## 策略优势

- 利用8种移动平均线指标相结合,判断市场趋势更为准确;
- 动态调整止损线位置,最大程度锁定盈利,避免反转止损;  
- 通过移动平均线和价格的交叉作为辅助信号,可以过滤假突破带来的错误交易;
- 策略参数可以自定义优化,适用于不同市场环境。

## 风险及解决方法

- 多重指标结合使用,增加了策略复杂度,代码调试难度较大; 
- 部分类型的移动平均线指标在特定市场环境下效果不佳;
- 假突破带来的错误交易风险仍然存在。

对应解决方法:
- 增加代码注释,提高代码可读性,方便检查和调试;
- 针对市场情况选择移动平均线类型,也可以加入自动优选模块;
- 优化参数设置,结合更多辅助指标过滤信号。

## 策略优化方向  

该策略还具有很大的优化空间:

- 可以加入自动参数优化模块,根据不同市场环境自动调整参数;
- 可以加入机器学习模型,辅助判断趋势方向;  
- 可以加入情绪指标等更多辅助判断指标,提高策略稳定性;
- 可以优化止损机制,实现更动态更精确的止损;
- 可以扩展至多品种套利策略,利用品种间价格差异获得套利机会。

## 总结  

多重移动平均线动态趋势策略通过结合多种移动平均线指标判断市场趋势,并辅以价格突破信号发出交易指令,同时动态调整止损线位置,实现高效盈利。该策略成功融合了趋势跟随、突破交易和动态止损三大主流量化策略思路,稳定性和盈利能力较强。随着参数优化、模式识别等技术的引入,策略效果还具有进一步提升的空间,是一种值得重点研究和应用的高级量化策略。

||


## Overview

The Multiple Moving Average Dynamic Trend Strategy is a quantitative trading strategy that utilizes multiple types of moving average indicators to determine the market trend and dynamically adjusts the stop loss line position. By combining different moving averages, this strategy can more comprehensively and accurately judge market trends and achieve high-win-rate trading.

## Strategy Principle   

This strategy mainly implements 8 different types of moving averages through custom functions, including Simple Moving Average (SMA), Exponential Moving Average (EMA), Weighted Moving Average (WMA), Triangular Moving Average (TMA), Variable Index Dynamic Average (VIDYA), Wilder's Moving Average (WWMA), Zero-Lag Exponential Moving Average (ZLEMA) and True Strength Index (TSI). The strategy allows users to choose one of the 8 moving averages as the primary indicator.  

The strategy first calculates the selected type of moving average, and then dynamically calculates the position of the upper and lower rails based on the set percentage parameter. A buy signal is triggered when the price breaks through the upper rail, and a sell signal is triggered when the price breaks through the lower rail. In addition, the strategy also tracks the crossovers between the moving average and the price as auxiliary judgment signals.  

During the calculation, the strategy also judges the direction of the market trend, thereby dynamically adjusting the position of the upper and lower rails. Specifically, when an uptrend is determined, the lower rail will move up following the rising price so that the stop loss line can optimally track the rising price. When a downtrend is determined, the upper rail will move down following the falling price to reduce the stop loss point and minimize losses.  

## Strategy Advantages  

- Utilizing 8 combined moving average indicators to judge market trends more accurately. 
- Dynamically adjusting stop loss line positions to maximize profit locking and avoid reverse stop loss.
- Filtering out wrong trades caused by false breakouts using moving average and price crossovers as auxiliary signals.  
- Customizable and optimizable parameters catered to different market environments.  

## Risks and Solutions  

- Increased strategy complexity and debugging difficulty due to multiple combined indicators.  
- Certain types of moving averages may underperform in specific market environments.  
- Risks associated with false breakout induced erroneous trades still exist.  

Solutions:
- Improve code readability through comments to facilitate inspection and debugging.  
- Select moving average types or incorporate auto-selection modules based on market conditions.   
- Optimize parameter settings and incorporate more auxiliary indicators to filter signals.   

## Optimization Directions   

There is still much room to optimize this strategy:  

- Incorporate auto parameter optimization modules based on changing market environments.   
- Incorporate machine learning models to aid in trend determination.   
- Incorporate more auxiliary judgment indicators like sentiment indices to improve strategy stability.  
- Optimize stop loss mechanisms for more dynamic and precise stops.   
- Expand to multi-asset pairs spread strategies to capitalize on price differentials.   

## Conclusion  

The multiple moving average dynamic trend strategy determines market trends by combining multiple moving average indicators, and initiates trades based on price breakout signals while dynamically adjusting stop loss line positions for efficient profitability. This strategy successfully integrates the three major quantitative strategy concepts of trend following, price breakout trading, and dynamic stops, exhibiting strong stability and profitability. With further improvements in parameters optimization and pattern recognition, this strategy shows great potential for continued performance enhancement, making it a highly valuable advanced quantitative strategy worthy of focused research and application.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|2|OTT Period|
|v_input_3|1.4|OTT Percent|
|v_input_4|true|Show Support Line?|
|v_input_5|true|Show Support Line Crossing Signals?|
|v_input_6|false|Show Price/OTT Crossing Signals?|
|v_input_7|false|Show OTT Color Changes?|
|v_input_8|false|Show OTT Color Change Signals?|
|v_input_9|true|Highlighter On/Off ?|
|v_input_10|0|Moving Average Type: VAR|EMA|WMA|TMA|SMA|WWMA|ZLEMA|TSF|
|v_input_11|true|Show Screener Label|
|v_input_12|20|Pos. Label x-axis|
|v_input_13|true|Pos. Size Label y-axis|
|v_input_14|0|Label Color: Blue|Black|Red|Green|Yellow|White|
|v_input_15|true|=Backtest Inputs=|
|v_input_16|true|From Day|
|v_input_17|true|From Month|
|v_input_18|2005|From Year|
|v_input_19|true|To Day|
|v_input_20|true|To Month|
|v_input_21|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-16 00:00:00
end: 2023-11-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KivancOzbilgic

//created by: @Anil_Ozeksi
//developer: ANIL ÖZEKŞİ
//author: @kivancozbilgic

strategy("Optimized Trend Tracker","OTTEx", overlay=true)
src = input(close, title="Source")
length=input(2, "OTT Period", minval=1)
percent=input(1.4, "OTT Percent", type=input.float, step=0.1, minval=0)
showsupport = input(title="Show Support Line?", type=input.bool, defval=true)
showsignalsk = input(title="Show Support Line Crossing Signals?", type=input.bool, defval=true)
showsignalsc = input(title="Show Price/OTT Crossing Signals?", type=input.bool, defval=false)
highlight = input(title="Show OTT Color Changes?", type=input.bool, defval=false)
showsignalsr = input(title="Show OTT Color Change Signals?", type=input.bool, defval=false)
highlighting = input(title="Highlighter On/Off ?", type=input.bool, defval=true)
mav = input(title="Moving Average Type", defval="VAR", options=["SMA", "EMA", "WMA", "TMA", "VAR", "WWMA", "ZLEMA", "TSF"])
Var_Func(src,length)=>
    valpha=2/(length+1)
    vud1=src>src[1] ? src-src[1] : 0
    vdd1=src<src[1] ? src[1]-src : 0
    vUD=sum(vud1,9)
    vDD=sum(vdd1,9)
    vCMO=nz((vUD-vDD)/(vUD+vDD))
    VAR=0.0
    VAR:=nz(valpha*abs(vCMO)*src)+(1-valpha*abs(vCMO))*nz(VAR[1])
VAR=Var_Func(src,length)
Wwma_Func(src,length)=>
    wwalpha = 1/ length
    WWMA = 0.0
    WWMA := wwalpha*src + (1-wwalpha)*nz(WWMA[1])
WWMA=Wwma_Func(src,length)
Zlema_Func(src,length)=>
    zxLag = length/2==round(length/2) ? length/2 : (length - 1) / 2
    zxEMAData = (src + (src - src[zxLag]))
    ZLEMA = ema(zxEMAData, length)
ZLEMA=Zlema_Func(src,length)
Tsf_Func(src,length)=>
    lrc = linreg(src, length, 0)
    lrc1 = linreg(src,length,1)
    lrs = (lrc-lrc1)
    TSF = linreg(src, length, 0)+lrs
TSF=Tsf_Func(src,length)
getMA(src, length) =>
    ma = 0.0
    if mav == "SMA"
        ma := sma(src, length)
        ma

    if mav == "EMA"
        ma := ema(src, length)
        ma

    if mav == "WMA"
        ma := wma(src, length)
        ma

    if mav == "TMA"
        ma := sma(sma(src, ceil(length / 2)), floor(length / 2) + 1)
        ma

    if mav == "VAR"
        ma := VAR
        ma

    if mav == "WWMA"
        ma := WWMA
        ma

    if mav == "ZLEMA"
        ma := ZLEMA
        ma

    if mav == "TSF"
        ma := TSF
        ma
    ma
    
MAvg=getMA(src, length)
fark=MAvg*percent*0.01
longStop = MAvg - fark
longStopPrev = nz(longStop[1], longStop)
longStop := MAvg > longStopPrev ? max(longStop, longStopPrev) : longStop
shortStop =  MAvg + fark
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := MAvg < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop
dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and MAvg > shortStopPrev ? 1 : dir == 1 and MAvg < longStopPrev ? -1 : dir
MT = dir==1 ? longStop: shortStop
OTT=MAvg>MT ? MT*(200+percent)/200 : MT*(200-percent)/200 
plot(showsupport ? MAvg : na, color=#0585E1, linewidth=2, title="Support Line")
OTTC = highlight ? OTT[2] > OTT[3] ? color.green : color.red : #B800D9 
pALL=plot(nz(OTT[2]), color=OTTC, linewidth=2, title="OTT", transp=0)
alertcondition(cross(OTT[2], OTT[3]), title="Color ALARM", message="OTT Has Changed Color!")
alertcondition(crossover(OTT[2], OTT[3]), title="GREEN ALERT", message="OTT GREEN BUY SIGNAL!")
alertcondition(crossunder(OTT[2], OTT[3]), title="RED ALERT", message="OTT RED SELL SIGNAL!")
alertcondition(cross(MAvg, OTT[2]), title="Cross Alert", message="OTT - Support Line Crossing!")
alertcondition(crossover(MAvg, OTT[2]), title="Crossover Alarm", message="Support Line BUY SIGNAL!")
alertcondition(crossunder(MAvg, OTT[2]), title="Crossunder Alarm", message="Support Line SELL SIGNAL!")
alertcondition(cross(src, OTT[2]), title="Price Cross Alert", message="OTT - Price Crossing!")
alertcondition(crossover(src, OTT[2]), title="Price Crossover Alarm", message="PRICE OVER OTT - BUY SIGNAL!")
alertcondition(crossunder(src, OTT[2]), title="Price Crossunder Alarm", message="PRICE UNDER OTT - SELL SIGNAL!")
buySignalk = crossover(MAvg, OTT[2])
plotshape(buySignalk and showsignalsk ? OTT*0.995 : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
sellSignallk = crossunder(MAvg, OTT[2])
plotshape(sellSignallk and showsignalsk ? OTT*1.005 : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
buySignalc = crossover(src, OTT[2])
plotshape(buySignalc and showsignalsc ? OTT*0.995 : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
sellSignallc = crossunder(src, OTT[2])
plotshape(sellSignallc and showsignalsc ? OTT*1.005 : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
mPlot = plot(ohlc4, title="", style=plot.style_circles, linewidth=0,display=display.none)
longFillColor = highlighting ? (MAvg>OTT ? color.green : na) : na
shortFillColor = highlighting ? (MAvg<OTT ? color.red : na) : na
fill(mPlot, pALL, title="UpTrend Highligter", color=longFillColor)
fill(mPlot, pALL, title="DownTrend Highligter", color=shortFillColor)
buySignalr = crossover(OTT[2], OTT[3])
plotshape(buySignalr and showsignalsr ? OTT*0.995 : na, title="Buy", text="Buy", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.white, transp=0)
sellSignallr = crossunder(OTT[2], OTT[3])
plotshape(sellSignallr and showsignalsr ? OTT*1.005 : na, title="Sell", text="Sell", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.white, transp=0)
showscr = input(true, title="Show Screener Label")
posX_scr = input(20, title="Pos. Label x-axis")
posY_scr = input(1, title="Pos. Size Label y-axis")
colinput = input(title="Label Color", defval="Blue", options=["White", "Black", "Red", "Green", "Yellow", "Blue"])
col = color.gray
if colinput=="White"
    col:=color.white
if colinput=="Black"
    col:=color.black
if colinput=="Red"
    col:=color.red
if colinput=="Green"
    col:=color.green
if colinput=="Yellow"
    col:=color.yellow
if colinput=="Blue"
    col:=color.blue
dummy0 = input(true, title = "=Backtest Inputs=")
FromDay    = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromMonth  = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromYear   = input(defval = 2005, title = "From Year", minval = 2005)
ToDay      = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToMonth    = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToYear     = input(defval = 9999, title = "To Year", minval = 2006)
Start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)
Finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)
Timerange() => true
if buySignalk
    strategy.entry("Long", strategy.long,when=Timerange())
if sellSignallk
    strategy.entry("Short", strategy.short,when=Timerange())
// t1=input('EURUSD',   title='Symbol 01',type=input.symbol)
// t2=input('XAUUSD',    title='Symbol 02',type=input.symbol)
// t3=input('AMZN',    title='Symbol 03',type=input.symbol)
// t4=input('TSLA',    title='Symbol 04',type=input.symbol)
// t5=input('BTCUSDT',    title='Symbol 05',type=input.symbol)
// t6=input('ETHBTC',    title='Symbol 06',type=input.symbol)
// t7=input('XBTUSD',    title='Symbol 07',type=input.symbol)
// t8=input('XRPBTC',    title='Symbol 08',type=input.symbol)
// t9=input('THYAO',   title='Symbol 09',type=input.symbol)
// t10=input('GARAN',    title='Symbol 10',type=input.symbol)
// t11=input('',      title='Symbol 11',type=input.symbol)
// t12=input('',      title='Symbol 12',type=input.symbol)
// t13=input('',      title='Symbol 13',type=input.symbol)
// t14=input('',      title='Symbol 14',type=input.symbol)
// t15=input('',      title='Symbol 15',type=input.symbol)
// t16=input('',     title='Symbol 16',type=input.symbol)
// t17=input('',    title='Symbol 17',type=input.symbol)
// t18=input('',    title='Symbol 18',type=input.symbol)
// t19=input('',    title='Symbol 19',type=input.symbol)
// t20=input('',    title='Symbol 20',type=input.symbol)
// OTTs(percent, length) =>
//     Up=MAvg-MAvg*percent*0.01
//     Dn=MAvg+MAvg*percent*0.01
    
//     TrendUp = 0.0
//     TrendUp := MAvg[1]>TrendUp[1] ? max(Up,TrendUp[1]) : Up
//     TrendDown = 0.0
//     TrendDown := MAvg[1]<TrendDown[1]? min(Dn,TrendDown[1]) : Dn
//     Trend = 0.0
//     Trend := MAvg > TrendDown[1] ? 1: MAvg< TrendUp[1]? -1: nz(Trend[1],1)
//     Tsl = Trend==1? TrendUp: TrendDown
    
//     S_Buy = Trend == 1 ? 1 : 0
//     S_Sell = Trend != 1 ? 1 : 0
    
//     [Trend, Tsl]
// [Trend, Tsl] =  OTTs(percent, length)
// TrendReversal = Trend != Trend[1]
// [t01, s01] = security(t1, timeframe.period, OTTs(percent, length))
// [t02, s02] = security(t2, timeframe.period, OTTs(percent, length))
// [t03, s03] = security(t3, timeframe.period, OTTs(percent, length))
// [t04, s04] = security(t4, timeframe.period, OTTs(percent, length))
// [t05, s05] = security(t5, timeframe.period, OTTs(percent, length))
// [t06, s06] = security(t6, timeframe.period, OTTs(percent, length))
// [t07, s07] = security(t7, timeframe.period, OTTs(percent, length))
// [t08, s08] = security(t8, timeframe.period, OTTs(percent, length))
// [t09, s09] = security(t9, timeframe.period, OTTs(percent, length))
// [t010, s010] = security(t10, timeframe.period, OTTs(percent, length))
// [t011, s011] = security(t11, timeframe.period, OTTs(percent, length))
// [t012, s012] = security(t12, timeframe.period, OTTs(percent, length))
// [t013, s013] = security(t13, timeframe.period, OTTs(percent, length))
// [t014, s014] = security(t14, timeframe.period, OTTs(percent, length))
// [t015, s015] = security(t15, timeframe.period, OTTs(percent, length))
// [t016, s016] = security(t16, timeframe.period, OTTs(percent, length))
// [t017, s017] = security(t17, timeframe.period, OTTs(percent, length))
// [t018, s018] = security(t18, timeframe.period, OTTs(percent, length))
// [t019, s019] = security(t19, timeframe.period, OTTs(percent, length))
// [t020, s020] = security(t20, timeframe.period, OTTs(percent, length))
// tr01 = t01 != t01[1], up01 = t01 == 1, dn01 = t01 == -1
// tr02 = t02 != t02[1], up02 = t02 == 1, dn02 = t02 == -1
// tr03 = t03 != t03[1], up03 = t03 == 1, dn03 = t03 == -1
// tr04 = t04 != t04[1], up04 = t04 == 1, dn04 = t04 == -1
// tr05 = t05 != t05[1], up05 = t05 == 1, dn05 = t05 == -1
// tr06 = t06 != t06[1], up06 = t06 == 1, dn06 = t06 == -1
// tr07 = t07 != t07[1], up07 = t07 == 1, dn07 = t07 == -1
// tr08 = t08 != t08[1], up08 = t08 == 1, dn08 = t08 == -1
// tr09 = t09 != t09[1], up09 = t09 == 1, dn09 = t09 == -1
// tr010 = t010 != t010[1], up010 = t010 == 1, dn010 = t010 == -1
// tr011 = t011 != t011[1], up011 = t011 == 1, dn011 = t011 == -1
// tr012 = t012 != t012[1], up012 = t012 == 1, dn012 = t012 == -1
// tr013 = t013 != t013[1], up013 = t013 == 1, dn013 = t013 == -1
// tr014 = t014 != t014[1], up014 = t014 == 1, dn014 = t014 == -1
// tr015 = t015 != t015[1], up015 = t015 == 1, dn015 = t015 == -1
// tr016 = t016 != t016[1], up016 = t016 == 1, dn016 = t016 == -1
// tr017 = t017 != t017[1], up017 = t017 == 1, dn017 = t017 == -1
// tr018 = t018 != t018[1], up018 = t018 == 1, dn018 = t018 == -1
// tr019 = t019 != t019[1], up019 = t019 == 1, dn019 = t019 == -1
// tr020 = t020 != t020[1], up020 = t020 == 1, dn020 = t020 == -1
// pot_label = 'Potential Reversal: \n'
// pot_label := tr01    ? pot_label + t1 + '\n'  : pot_label
// pot_label := tr02    ? pot_label + t2 + '\n'  : pot_label
// pot_label := tr03    ? pot_label + t3 + '\n'  : pot_label
// pot_label := tr04    ? pot_label + t4 + '\n'  : pot_label
// pot_label := tr05    ? pot_label + t5 + '\n'  : pot_label
// pot_label := tr06    ? pot_label + t6 + '\n'  : pot_label
// pot_label := tr07    ? pot_label + t7 + '\n'  : pot_label
// pot_label := tr08    ? pot_label + t8 + '\n'  : pot_label
// pot_label := tr09    ? pot_label + t9 + '\n'  : pot_label
// pot_label := tr010    ? pot_label + t10 + '\n'  : pot_label
// pot_label := tr011    ? pot_label + t11 + '\n'  : pot_label
// pot_label := tr012    ? pot_label + t12 + '\n'  : pot_label
// pot_label := tr013    ? pot_label + t13 + '\n'  : pot_label
// pot_label := tr014    ? pot_label + t14 + '\n'  : pot_label
// pot_label := tr015    ? pot_label + t15 + '\n'  : pot_label
// pot_label := tr016    ? pot_label + t16 + '\n'  : pot_label
// pot_label := tr017    ? pot_label + t17 + '\n'  : pot_label
// pot_label := tr018    ? pot_label + t18 + '\n'  : pot_label
// pot_label := tr019    ? pot_label + t19 + '\n'  : pot_label
// pot_label := tr020    ? pot_label + t20 + '\n'  : pot_label
// scr_label = 'Confirmed Reversal: \n'
// scr_label := tr01[1] ? scr_label + t1 + '\n'  : scr_label
// scr_label := tr02[1] ? scr_label + t2 + '\n'  : scr_label
// scr_label := tr03[1] ? scr_label + t3 + '\n'  : scr_label
// scr_label := tr04[1] ? scr_label + t4 + '\n'  : scr_label
// scr_label := tr05[1] ? scr_label + t5 + '\n'  : scr_label
// scr_label := tr06[1] ? scr_label + t6 + '\n'  : scr_label
// scr_label := tr07[1] ? scr_label + t7 + '\n'  : scr_label
// scr_label := tr08[1] ? scr_label + t8 + '\n'  : scr_label
// scr_label := tr09[1] ? scr_label + t9 + '\n'  : scr_label
// scr_label := tr010[1] ? scr_label + t10 + '\n'  : scr_label
// scr_label := tr011[1] ? scr_label + t11 + '\n'  : scr_label
// scr_label := tr012[1] ? scr_label + t12 + '\n'  : scr_label
// scr_label := tr013[1] ? scr_label + t13 + '\n'  : scr_label
// scr_label := tr014[1] ? scr_label + t14 + '\n'  : scr_label
// scr_label := tr015[1] ? scr_label + t15 + '\n'  : scr_label
// scr_label := tr016[1] ? scr_label + t16 + '\n'  : scr_label
// scr_label := tr017[1] ? scr_label + t17 + '\n'  : scr_label
// scr_label := tr018[1] ? scr_label + t18 + '\n'  : scr_label
// scr_label := tr019[1] ? scr_label + t19 + '\n'  : scr_label
// scr_label := tr020[1] ? scr_label + t20 + '\n'  : scr_label
// up_label = 'Uptrend: \n'
// up_label := up01[1] ? up_label + t1 + '\n'  : up_label
// up_label := up02[1] ? up_label + t2 + '\n'  : up_label
// up_label := up03[1] ? up_label + t3 + '\n'  : up_label
// up_label := up04[1] ? up_label + t4 + '\n'  : up_label
// up_label := up05[1] ? up_label + t5 + '\n'  : up_label
// up_label := up06[1] ? up_label + t6 + '\n'  : up_label
// up_label := up07[1] ? up_label + t7 + '\n'  : up_label
// up_label := up08[1] ? up_label + t8 + '\n'  : up_label
// up_label := up09[1] ? up_label + t9 + '\n'  : up_label
// up_label := up010[1] ? up_label + t10 + '\n'  : up_label
// up_label := up011[1] ? up_label + t11 + '\n'  : up_label
// up_label := up012[1] ? up_label + t12 + '\n'  : up_label
// up_label := up013[1] ? up_label + t13 + '\n'  : up_label
// up_label := up014[1] ? up_label + t14 + '\n'  : up_label
// up_label := up015[1] ? up_label + t15 + '\n'  : up_label
// up_label := up016[1] ? up_label + t16 + '\n'  : up_label
// up_label := up017[1] ? up_label + t17 + '\n'  : up_label
// up_label := up018[1] ? up_label + t18 + '\n'  : up_label
// up_label := up019[1] ? up_label + t19 + '\n'  : up_label
// up_label := up020[1] ? up_label + t20 + '\n'  : up_label
// dn_label = 'Downtrend: \n'
// dn_label := dn01[1] ? dn_label + t1 + '\n'  : dn_label
// dn_label := dn02[1] ? dn_label + t2 + '\n'  : dn_label
// dn_label := dn03[1] ? dn_label + t3 + '\n'  : dn_label
// dn_label := dn04[1] ? dn_label + t4 + '\n'  : dn_label
// dn_label := dn05[1] ? dn_label + t5 + '\n'  : dn_label
// dn_label := dn06[1] ? dn_label + t6 + '\n'  : dn_label
// dn_label := dn07[1] ? dn_label + t7 + '\n'  : dn_label
// dn_label := dn08[1] ? dn_label + t8 + '\n'  : dn_label
// dn_label := dn09[1] ? dn_label + t9 + '\n'  : dn_label
// dn_label := dn010[1] ? dn_label + t10 + '\n'  : dn_label
// dn_label := dn011[1] ? dn_label + t11 + '\n'  : dn_label
// dn_label := dn012[1] ? dn_label + t12 + '\n'  : dn_label
// dn_label := dn013[1] ? dn_label + t13 + '\n'  : dn_label
// dn_label := dn014[1] ? dn_label + t14 + '\n'  : dn_label
// dn_label := dn015[1] ? dn_label + t15 + '\n'  : dn_label
// dn_label := dn016[1] ? dn_label + t16 + '\n'  : dn_label
// dn_label := dn017[1] ? dn_label + t17 + '\n'  : dn_label
// dn_label := dn018[1] ? dn_label + t18 + '\n'  : dn_label
// dn_label := dn019[1] ? dn_label + t19 + '\n'  : dn_label
// dn_label := dn020[1] ? dn_label + t20 + '\n'  : dn_label
// f_colorscr (_valscr ) => 
//      _valscr  ? #00000000 : na
     
// f_printscr (_txtscr ) => 
//      var _lblscr  = label(na), 
//      label.delete(_lblscr ), 
//      _lblscr  := label.new(
//      time + (time-time[1])*posX_scr , 
//      ohlc4[posY_scr], 
//      _txtscr ,
//      xloc.bar_time, 
//      yloc.price, 
//      f_colorscr (  showscr ),
//      textcolor =  showscr ? col : na, 
//      size = size.normal, 
//      style=label.style_label_center
//      )
// f_printscr ( scr_label + '\n' + pot_label +'\n' + up_label + '\n' + dn_label)
  

```

> Detail

https://www.fmz.com/strategy/433011

> Last Modified

2023-11-23 15:40:15
