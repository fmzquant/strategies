
> Name

基于渔网策略的动态移动止损优化策略Dynamic-Trailing-Stop-Optimization-Strategy-Based-on-Ichimoku-Cloud

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19baeb154a5a4b59bc5.png)
[trans]

## 概述

本策略的核心思想是结合渔网策略和动态移动止损机制,实现更高效的止损退出。渔网策略通过 K 线指标判断市场趋势和位置,dynamically确定买入卖出时机。而动态止损机制则可以根据市场波动幅度, flexibility设置止损点,有效控制风险。

## 原理

本策略主要基于以下几个模块:

1. 渔网指标模块
   
   通过 Fisher 应变和 Stoch 指标计算出渔网指标,判断市场趋势和买卖点。
   
2. 动态止损模块

   根据 ATR 和 RSI 指标动态计算止损点,实现动态跟踪止损。
   
3. 移动止损跟踪模块

   设置固定止损位移点数,当价格达到止损点时退出仓位。

## 优势分析

本策略最大的优势在于风险控制能力出色。动态止损机制可以根据市场波动程度设置合适的止损幅度,有效避免过大滑点造成的损失,又可以比固定止损更好地跟踪趋势。此外,渔网指标判断买卖时机准确可靠,可以过滤掉部分噪音交易。

## 风险分析

本策略的主要风险在于止损点设置不当可能造成过于激进退出。 此外,如果使用过于激进的参数设置,也可能造成 whipsaw 交易过于频繁。 为降低这些风险,应合理选择参数,避免设置过大的移动幅度。

## 优化方向

本策略的优化空间主要集中在以下几个方面:

1. 渔网指标参数优化,找到更优参数组合判断趋势;

2. 动态止损参数优化,找到更平衡的止损幅度;

3. 增加基于波动率的仓位管理模块,根据市场波动程度调整仓位。

通过参数搜寻和规则优化,本策略可以获得更高的Risk Adjusted Return。

## 总结

本策略综合运用渔网指标和动态止损技术,既可以比较准确地判断市场走势,有利于选时决策,又可以动态调整止损幅度,有效控制风险。通过持续的模块扩展和参数优化,本策略可以成为一个可以长期应用的有效策略框架。

||

## Overview

The core idea of this strategy is to combine the Ichimoku Cloud strategy and dynamic trailing stop mechanism to achieve more efficient stop loss exits. The Ichimoku Cloud strategy judges market trends and timing through K-line indicators. While the dynamic stop loss mechanism can set stop loss points based on market volatility amplitude to effectively control risks.

## Principles  

The main modules of this strategy include:
  
1. Ichimoku Cloud Indicator Module
    
   Calculate the Ichimoku Cloud indicator through Fisher Transform and Stoch to determine market trends and trading signals.

2. Dynamic Stop Loss Module
    
   Dynamically calculate stop loss points based on ATR and RSI to achieve dynamic trailing stop loss.  

3. Trailing Stop Tracking Module
    
   Set fixed trailing stop loss points. Exit positions when price reaches stop loss points.

## Advantage Analysis  

The biggest advantage of this strategy is the excellent risk control capability. The dynamic stop loss mechanism can set appropriate stop loss range based on market volatility to effectively avoid losses caused by excessive slippage and better track trends than fixed stop loss. In addition, the Ichimoku Cloud indicator can filter out some noisy trades and determine entry and exit points reliably.

## Risk Analysis

The main risks of this strategy are improper stop loss point setting may cause excessively aggressive exits. Also, using over aggressive parameters may cause over frequent whipsaw trades. To mitigate these risks, parameters should be set reasonably to avoid excessive moving magnitude.  

## Optimization Directions

The optimization space of this strategy mainly focuses on:

1. Ichimoku Cloud parameter optimization to find better parameter combinations to determine trends.

2. Dynamic stop loss parameter optimization to find more balanced stop loss range.  

3. Add volatility-based position sizing module to adjust positions based on market volatility.

Through parameter search and rules optimization, higher risk adjusted returns can be obtained from this strategy.

## Conclusion  

This strategy combines Ichimoku Cloud and dynamic trailing stop techniques, which can accurately determine market trends for timing decisions, and also dynamically adjusts stop loss range to effectively control risks. With continuous module expansion and parameter optimization, this strategy can become an effective long-term strategy framework.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|19|Stoch & ATR Length|
|v_input_2|4|Smooth|
|v_input_3|82.05|UP line|
|v_input_4|19|DOWN line|
|v_input_5|true|Use trailing stop|
|v_input_6|false|Re-enter after trailing stop|
|v_input_7|245|trailing stop actiation pips|
|v_input_8|20|trailing stop offset pips|
|v_input_9|true|Use dynamic trailing stop start|
|v_input_10|68.3|Multiplier for Dynamic TS start X*ATR|
|v_input_11|true|Use dynamic trailing stop offset|
|v_input_12|true|Multiplier for Dynamic TS offset X*ATR|
|v_input_13|true|Occurancy for dynamic TS|
|v_input_14|true|Use Current Chart Resolution?|
|v_input_15|30|Timeframe|
|v_input_16|true|Plot Hull MA|
|v_input_17|true|Plot all|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-22 00:00:00
end: 2023-12-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("IFTS+TS Strategy Overlay ", overlay=true, pyramiding = 0, calc_on_order_fills = false, commission_type =  strategy.commission.percent, commission_value = 0.0454, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

//INPUTS
stochlength=input(19, "Stoch & ATR Length")
wmalength=input(4, title="Smooth")
ul = input(82.05,step=0.01, title="UP line")
dl = input(19,step=0.01, title="DOWN line")
uts = input(true, title="Use trailing stop")
rts = input(false, title="Re-enter after trailing stop")
tsi = input(title="trailing stop actiation pips",defval=245)                                                                       
tso = input(title="trailing stop offset pips",defval=20)
udts = input(true, title="Use dynamic trailing stop start")
mpl2 = input(68.3,step=0.05, title="Multiplier for Dynamic TS start X*ATR")
udto = input(true, title="Use dynamic trailing stop offset")
mpl = input(1,step=0.01, title="Multiplier for Dynamic TS offset X*ATR")
occ = input(1, title="Occurancy for dynamic TS")
useCurrentRes = input(true, title="Use Current Chart Resolution?")  
resCustom = input(title="Timeframe",defval="30")
hma = input(title="Plot Hull MA", defval=true)
pl = input(title="Plot all", defval=true)

//CALCULATIONS
v1=0.1*(stoch(close, high, low, stochlength)-50)
v2=wma(v1, wmalength)
k1=(exp(2*v2)-1)/(exp(2*v2)+1)*50+50
res = useCurrentRes ? timeframe.period : resCustom
k=security(syminfo.tickerid, res, k1, barmerge.lookahead_off)

//CALCULATIONS HULL MA
n=stochlength/2
n2ma=2*wma(close,round(n/2))
nma=wma(close,n)
diff=n2ma-nma
sqn=round(sqrt(n))
n2ma1=2*wma(close[1],round(n/2))
nma1=wma(close[1],n)
diff1=n2ma1-nma1
sqn1=round(sqrt(n))
n1=wma(diff,sqn)    
n2=wma(diff1,sqn)
n3=n1-(n1*-1)
n4=n1+(n1)

//CALCULATIONS FOR BUY/SELL LEVELS
//stc=(stoch(close, high, low, stochlength))

//v3=0.1*(stoch(low, low, low, stochlength)-50)
//v4=wma(v3, wmalength)
//k3=(exp(2*v4)-1)/(exp(2*v4)+1)*50+50
//k2=security(syminfo.tickerid, res, k3, barmerge.lookahead_off)
//stl=(stoch(low, low, low, stochlength))

//v5=0.1*(stoch(high, high, high, stochlength)-50)
//v6=wma(v5, wmalength)
//k5=(exp(2*v6)-1)/(exp(2*v6)+1)*50+50
//k4=security(syminfo.tickerid, res, k5, barmerge.lookahead_off)
//sth=(stoch(high, high, high, stochlength))

//difc=k-stc
//difl=k2-stl+difc
//difh=k4-sth+difc

hg1=wma(highest(stochlength),wmalength)//-highest(stochlength)*(difh/10000)
hg=security(syminfo.tickerid, res, hg1, barmerge.lookahead_off)
hgob=hg-hg*((100-ul)/10000)
lw1=wma(lowest(stochlength),wmalength)//-lowest(stochlength)*(difl/10000)
lw=security(syminfo.tickerid, res, lw1, barmerge.lookahead_off)
lwos=lw+lw*(dl/10000)

////CONDITIONS CROSS
sell = crossunder(k,ul)? 1 : 0
buy = crossover(k,dl)? 1 : 0

////COUNT BARCOLORS
var countred = 0
if sell == 1
    countred := 1
if buy == 1
    countred := 0

var countgreen = 0
if buy == 1
    countgreen := 1
if sell == 1
    countgreen := 0

////CONDITIONS COUNT BARCOLORS
long=countgreen[1]==0 and countgreen==1 ? 1 : 0
short=countred[1]==0 and countred==1 ? 1 : 0
    
////COLORS
//STOCH
col = k>=k[1] ? color.aqua : color.red
col1 = countred[2]==1 ? na : #00FF00
col2 = countgreen[2]==1 ? na : #FF0000
col3 = countred[2]==1 ? na : color.yellow
col4 = countgreen[2]==1 ? na : color.yellow
//HMA
dif = n1[1]-n3
dif1 = dif>dif[1] and dif[1]>dif[2] ? na: #00FF00 //uptrend - green
dif3 = n4-n1[1]
dif2 = dif3>dif3[1] and dif3[1]>dif3[2] ? na: #FF0000  //downtrend - red
dif4 = (dif>dif[1] and dif[1]>dif[2]) == (dif3>dif3[1] and dif3[1]>dif3[2]) ? #FFFF00: na //trend change - yellow

////PLOTS CALCULATIONS DYNAMIC TS
dtso1 = sma(atr(stochlength),2)*100
dtso=security(syminfo.tickerid, "1", dtso1,barmerge.lookahead_on)*mpl
dtsi = rsi(atr(stochlength),stochlength)/mpl2*tsi
dtsiv = valuewhen(long or short, dtsi, occ)
dtsov = valuewhen(long or short, dtso, occ)
//DYNAMIC TS START
dtsil1 = countred[2]==1 and pl and uts and udts? open+(dtsiv/100) : na
dtsis1 = countgreen[2]==1 and pl and uts and udts? open-(dtsiv/100) : na
dtsil = countred[2]==1 and pl and uts and udts? open+(dtsiv/100) : fixnan(dtsil1[1])
dtsis = countgreen[2]==1 and pl and uts and udts? open-(dtsiv/100) : fixnan(dtsis1[1])
//DYNAMIC TS OFFSET+START
dtsol1 = countred[2]==1 and pl and uts and udto? dtsil-(dtsov/100) : na
dtsos1 = countgreen[2]==1 and pl and uts and udto? dtsis+(dtsov/100) : na
dtsol = countred[2]==1 and pl and uts and udto? dtsil-(dtsov/100) : fixnan(dtsol1[1])
dtsos = countgreen[2]==1 and pl and uts and udto? dtsis+(dtsov/100) : fixnan(dtsos1[1])
//CONST TS START
tsil1 = countred[2]==1 and pl and uts and not udts? open+(tsi/100) : na
tsis1 = countgreen[2]==1 and pl and uts and not udts? open-(tsi/100) : na
tsil = countred[2]==1 and pl and uts and not udts? open+(tsi/100) : fixnan(tsil1[1])
tsis = countgreen[2]==1 and pl and uts and not udts? open-(tsi/100) : fixnan(tsis1[1])
//CONST TS START + DYNAMIC TS OFFSET
tsol21 = countred[2]==1 and pl and uts and not udts and udto? open+(tsi/100)-(dtsov/100) : na
tsos21 = countgreen[2]==1 and pl and uts and not udts and udto? open-(tsi/100)+(dtsov/100) : na
tsol2 = countred[2]==1 and pl and uts and not udts and udto? open+(tsi/100)-(dtsov/100) : fixnan(tsol21[1])
tsos2 = countgreen[2]==1 and pl and uts and not udts and udto? open-(tsi/100)+(dtsov/100) : fixnan(tsos21[1])
//CONST TS OFFSET
tsol1 = countred[2]==1 and pl and uts and not udto? tsil-(tso/100) : na
tsos1 = countgreen[2]==1 and pl and uts and not udto? tsis+(tso/100) : na
tsol = countred[2]==1 and pl and uts and not udto? tsil-(tso/100) : fixnan(tsol1[1])
tsos = countgreen[2]==1 and pl and uts and not udto? tsis+(tso/100) : fixnan(tsos1[1])

//////PLOTS
////LABELS
//TS LABELS
// ltsos = (short==1) and udto and pl? label.new(bar_index, high[1]+close*0.006,  text="os "+tostring(round(dtsov)), color=color.white, size=size.small) : na
// ltsol = (long==1) and udto and pl? label.new(bar_index, low[1]-close*0.006,  text="os "+tostring(round(dtsov)), color=color.white, size=size.small, style=label.style_labelup) : na
// ltsis = (short==1) and udts and pl? label.new(bar_index, high[1]+close*0.008, text="st "+tostring(round(dtsiv)), color=color.white, size=size.small) : na
// ltsil = (long==1) and udts and pl? label.new(bar_index, low[1]-close*0.008,  text="st "+tostring(round(dtsiv)), color=color.white, size=size.small, style=label.style_labelup) : na
//STOCH LABEL
//lk = k>ul and pl? label.new(bar_index, high, text=tostring(round(k)), color=col, size=size.small) :na
//lk2 = k<dl and pl? label.new(bar_index, high, text=tostring(round(k)), color=col, size=size.small) :na
//lk3 = k>dl and k<ul and pl? label.new(bar_index, high, text=tostring(round(k)), color=color.white, size=size.small) :na
//label.delete(lk[1])
//label.delete(lk2[1])
//label.delete(lk3[1])

//ltson = udto==true and pl? label.new(bar_index, 75, text="os "+tostring(round(dtso)), color=color.yellow, size=size.small) :na
//label.delete(ltson[1])
//ltsin = udts==true and pl? label.new(bar_index, 0, text="st "+tostring(round(dtsi)), color=color.yellow, size=size.small) :na
//label.delete(ltsin[1])

//DYNAMIC TS LINES
plot(dtsil, color=col1, transp = 0, title = "dynamic ts stop long level")
plot(dtsis, color=col2, transp = 0, title = "dynamic ts stop short level")
plot(dtsol, color=col3, transp = 30, title = "dynamic ts offset long level")
plot(dtsos, color=col4, transp = 30, title = "dynamic ts offset short level")
plot(tsol2, color=col3, transp = 30, title = "const start + dynamic ts offset long level")
plot(tsos2, color=col4, transp = 30, title = "const start + dynamic ts offset short level")
//TS LINES
plot(tsil, color=col1, transp = 0, title = "const ts stop long level")
plot(tsis, color=col2, transp = 0, title = "const ts stop short level")
plot(tsol, color=col3, transp = 30, title = "const ts stop offset long level")
plot(tsos, color=col4, transp = 30, title = "const ts stop offset short level")
//ARROWS
plotarrow(pl==true? long : na, colorup = color.teal, transp=0, title = "buy arrow")
plotarrow(pl==true? -short : na, colordown = color.red, transp=0, title = "sell arrow")
//HIGH/LOW
p1 = plot(pl==true?hg : na, color=color.green, transp=100, editable=false)
p2 = plot(pl==true?lw : na, color=color.red, transp=100, editable=false)
p3 = plot(pl==true?lwos : na, color=color.green, linewidth=1, transp=100, editable=false)
p4 = plot(pl==true?hgob : na, color=color.red, linewidth=1, transp=100, editable=false)
fill(p1,p4, color=color.green, transp=75, title = "highest price levels")
fill(p2,p3, color=color.red, transp=75, title = "lowest price levels")
//HMA
mab=plot(hma and pl ? n1 : na,color=#000000, linewidth=5, transp=0, title = "Background HMA line") //black
ma=plot(hma and pl ? n1 : na,color=dif1, linewidth=3, transp=10, title = "HMA uptrend line") //green
ma2=plot(hma and pl ? n1 : na,color=dif2, linewidth=3, transp=20, title = "HMA downtrend line")//red
ma3=plot(hma and pl ? n1 : na,color=dif4, linewidth=3, transp=10, title = "HMA reverse trend line") //yellow
//LINES
// ldl = long[1]==1 and uts and udts? line.new(bar_index, high, bar_index, dtsil, color=#00FF00, width = 1) : na
// lds = short[1]==1 and uts and udts? line.new(bar_index, high, bar_index, dtsis, color=#FF0000, width = 1) : na
// ll = long[1]==1 and uts and not udts? line.new(bar_index, high, bar_index, tsil, color=#00FF00, width = 1) : na
// ls = short[1]==1 and uts and not udts? line.new(bar_index, high, bar_index, tsis, color=#FF0000, width = 1) : na

////STRATEGY
strategy.entry("BUY", strategy.long, when = buy)
strategy.entry("SELL", strategy.short, when = sell)

if (rts)
    strategy.entry("BUY", strategy.long, when = countgreen==1 and dif1==#00FF00)
    strategy.entry("SELL", strategy.short, when = countred==1 and dif2==#FF0000)

if  (uts)
    strategy.exit("Close BUY with TS","BUY", trail_points = tsi, trail_offset = tso)
    strategy.exit("Close SELL with TS","SELL", trail_points = tsi, trail_offset = tso)

    if  (udto)
        strategy.exit("Close BUY with TS","BUY", trail_points = tsi, trail_offset = dtsov)
        strategy.exit("Close SELL with TS","SELL", trail_points = tsi, trail_offset = dtsov)
        
    if  (udts)
        strategy.exit("Close BUY with TS","BUY", trail_points = dtsiv, trail_offset = tso)
        strategy.exit("Close SELL with TS","SELL", trail_points = dtsiv, trail_offset = tso)
        
    if  (udto and udts)
        strategy.exit("Close BUY with TS","BUY", trail_points = dtsiv, trail_offset = dtsov)
        strategy.exit("Close SELL with TS","SELL", trail_points = dtsiv, trail_offset = dtsov)
        


```

> Detail

https://www.fmz.com/strategy/437007

> Last Modified

2023-12-29 14:40:47
