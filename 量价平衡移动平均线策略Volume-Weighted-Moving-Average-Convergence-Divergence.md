
> Name

量价平衡移动平均线策略Volume-Weighted-Moving-Average-Convergence-Divergence

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f8caec5f7706a7c006.png)
[trans]

## 概述

本策略为经典MACD指标的改进版本,使用了11种不同类型的移动平均线来平滑价格曲线,以减少误导信号。指标由快线、慢线和柱线组成。快线和慢线分别采用价格的快速移动平均线和慢速移动平均线。柱线则表示快线和慢线之间的差值。当快线从下向上突破慢线时产生买进信号,相反产生卖出信号。

## 策略原理

1. 计算快速移动平均线MA12。允许选择11种不同的移动平均线计算方法,默认为变化率线VAR。

2. 计算慢速移动平均线MA26。允许选择11种不同的移动平均线计算方法,默认为变化率线VAR。

3. 计算快慢线差值SRC2 = MA12 - MA26。

4. 对SRC2计算触发线MATR,采用长度为9的移动平均线,可选择11种计算方法,默认为变化率线VAR。

5. 计算MACD柱线HIST = SRC2 - MATR。当柱子由负数变为正数时产生买入信号,由正数变为负数时产生卖出信号。

## 优势分析

1. 可选择11种不同的移动平均线来计算快慢线和触发线,大幅度减少了常见移动平均线的滞后性,提高了预测信号的准确性。

2. 变化率线VAR可自动调整移动平均线的权重,从而更好地适应市场变化。

3. 应用了缓冲区原理的双移动平均线可有效过滤市场噪音。

4. MACD柱线作为触发信号可克服传统MACD快慢线交叉时带来的滞后问题。

## 风险分析

1. MACD指标对趋势震荡行情的判断能力较弱。

2. 移动平均线本身会产生一定的滞后。VAR变化率线可部分减轻但无法完全解决。

3. 误差积累会导致出现错误信号或错过有效信号的情况。

## 优化方向

1. 针对具体市场行情选择匹配的移动平均线计算方法。结合回测结果选择比较准确的组合。

2. 优化快慢线和触发线的长度参数,寻找最佳参数组合以减少错误信号。

3. 添加附加指标判断来确认买卖信号,可考虑RSI,布林带等指标。

## 总结

本策略为MACD经典指标的优化版本。采用多种移动平均线模式计算MACD的快慢线和柱线,大大增强了指标的实用性。同时也存在一定的局限性,需要根据实际情况针对性地不断优化,才能在交易中发挥最大效用。


||


## Overview

This strategy is an improved version of the classic MACD indicator, using 11 different types of moving averages to smooth the price curve and reduce misleading signals. The indicator consists of the fast line, slow line and histogram. The fast line and slow line respectively adopt the fast moving average and slow moving average of prices. The histogram represents the difference between the fast line and slow line. Buying signals are generated when the fast line crosses the slow line from bottom to top, while selling signals are generated from top to bottom.

## Strategy Principles 

1. Calculate the fast moving average line MA12. 11 different calculation methods for moving average lines are available for selection, with Volume Variability Rate line VAR as default.  

2. Calculate the slow moving average line MA26. 11 different calculation methods for moving average lines are available for selection, with Volume Variability Rate line VAR as default.

3. Calculate the difference between the fast and slow lines SRC2 = MA12 - MA26.  

4. Calculate the trigger line MATR for SRC2 using a moving average line with length of 9. 11 different calculation methods are available for selection, with Volume Variability Rate line VAR as default.

5. Calculate the MACD histogram HIST = SRC2 - MATR. Buying signals are generated when the histogram changes from negative to positive. Selling signals are generated when the histogram changes from positive to negative.

## Analysis of Advantages  

1. 11 different types of moving average lines can be selected to calculate the fast line, slow line and trigger line, which largely reduces the lagging of common moving averages and improves the accuracy of prediction signals.  

2. The Volume Variability Rate line VAR can automatically adjust the weights of the moving average to better adapt to market changes.

3. The double moving average lines with buffer zone can effectively filter out market noise. 

4. The MACD histogram as the triggering signal can overcome the lagging problem brought by the traditional crossing of fast and slow MACD lines.  

## Risk Analysis

1. MACD indicator has weak capability in judging the trending or consolidating market.

2. The moving average itself has a certain degree of lagging. VAR partially reduces but cannot completely solve the problem.  

3. Error accumulation may lead to wrong signals or missing effective signals.

## Direction for Optimization  

1. Choose matching moving average calculation methods for specific market conditions based on backtest results.

2. Optimize the length parameters of the fast line, slow line and trigger line to find the best parameter combinations to reduce wrong signals.  

3. Add auxiliary indicators such as RSI and Bollinger Bands to confirm buy/sell signals.

## Conclusion  

This strategy is an optimized version for the classic MACD indicator. By using multiple moving average patterns to compute the MACD fast line, slow line and histogram, it greatly enhances the utility of this indicator. Meanwhile, it also has certain limitations. Continuous optimization catered to actual market conditions is needed to maximize the efficacy in trading.   

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|12|Short Moving Average Length|
|v_input_3|26|Long Moving Average Length|
|v_input_4|9|Trigger Length|
|v_input_5|0.7|TILLSON T3 Volume Factor|
|v_input_6|true|Bar Coloring On/Off ?|
|v_input_7|0|Moving Average Type: VAR|EMA|WMA|DEMA|TMA|SMA|WWMA|ZLEMA|TSF|HULL|TILL|
|v_input_8|9|From Month|
|v_input_9|true|From Day|
|v_input_10|2018|From Year|
|v_input_11|true|To Month|
|v_input_12|true|To Day|
|v_input_13|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-12 00:00:00
end: 2023-12-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © KivancOzbilgic


//developer: Gerald Appel
//author: @kivancozbilgic

strategy("MACD ReLoaded","MACDRe", overlay=true)
src = input(close, title="Source")
length=input(12, "Short Moving Average Length", minval=1)
length1=input(26, "Long Moving Average Length", minval=1)
length2=input(9, "Trigger Length", minval=1)
T3a1 = input(0.7, "TILLSON T3 Volume Factor", step=0.1)
barcoloring = input(title="Bar Coloring On/Off ?", type=input.bool, defval=true)

mav = input(title="Moving Average Type", defval="VAR", options=["SMA", "EMA", "WMA", "DEMA", "TMA", "VAR", "WWMA", "ZLEMA", "TSF", "HULL", "TILL"])
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
DEMA = ( 2 * ema(src,length)) - (ema(ema(src,length),length) )
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
HMA = wma(2 * wma(src, length / 2) - wma(src, length), round(sqrt(length)))
T3e1=ema(src, length)
T3e2=ema(T3e1,length)
T3e3=ema(T3e2,length)
T3e4=ema(T3e3,length)
T3e5=ema(T3e4,length)
T3e6=ema(T3e5,length)
T3c1=-T3a1*T3a1*T3a1
T3c2=3*T3a1*T3a1+3*T3a1*T3a1*T3a1
T3c3=-6*T3a1*T3a1-3*T3a1-3*T3a1*T3a1*T3a1
T3c4=1+3*T3a1+T3a1*T3a1*T3a1+3*T3a1*T3a1
T3=T3c1*T3e6+T3c2*T3e5+T3c3*T3e4+T3c4*T3e3


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

    if mav == "DEMA"
        ma := DEMA
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

    if mav == "HULL"
        ma := HMA
        ma

    if mav == "TILL"
        ma := T3
        ma
    ma
    
MA12=getMA(src, length)


Var_Func1(src,length1)=>
    valpha1=2/(length1+1)
    vud11=src>src[1] ? src-src[1] : 0
    vdd11=src<src[1] ? src[1]-src : 0
    vUD1=sum(vud11,9)
    vDD1=sum(vdd11,9)
    vCMO1=nz((vUD1-vDD1)/(vUD1+vDD1))
    VAR1=0.0
    VAR1:=nz(valpha1*abs(vCMO1)*src)+(1-valpha1*abs(vCMO1))*nz(VAR1[1])
VAR1=Var_Func1(src,length1)
DEMA1 = ( 2 * ema(src,length1)) - (ema(ema(src,length1),length1) )
Wwma_Func1(src,length1)=>
    wwalpha1 = 1/ length1
    WWMA1 = 0.0
    WWMA1 := wwalpha1*src + (1-wwalpha1)*nz(WWMA1[1])
WWMA1=Wwma_Func1(src,length1)
Zlema_Func1(src,length1)=>
    zxLag1 = length1/2==round(length1/2) ? length1/2 : (length1 - 1) / 2
    zxEMAData1 = (src + (src - src[zxLag1]))
    ZLEMA1 = ema(zxEMAData1, length1)
ZLEMA1=Zlema_Func1(src,length1)
Tsf_Func1(src,length1)=>
    lrc1 = linreg(src, length1, 0)
    lrc11 = linreg(src,length1,1)
    lrs1 = (lrc1-lrc11)
    TSF1 = linreg(src, length1, 0)+lrs1
TSF1=Tsf_Func1(src,length1)
HMA1 = wma(2 * wma(src, length1 / 2) - wma(src, length1), round(sqrt(length1)))
T3e11=ema(src, length1)
T3e21=ema(T3e11,length1)
T3e31=ema(T3e21,length1)
T3e41=ema(T3e31,length1)
T3e51=ema(T3e41,length1)
T3e61=ema(T3e51,length1)
T3c11=-T3a1*T3a1*T3a1
T3c21=3*T3a1*T3a1+3*T3a1*T3a1*T3a1
T3c31=-6*T3a1*T3a1-3*T3a1-3*T3a1*T3a1*T3a1
T3c41=1+3*T3a1+T3a1*T3a1*T3a1+3*T3a1*T3a1
T31=T3c11*T3e61+T3c21*T3e51+T3c31*T3e41+T3c41*T3e31


getMA1(src, length1) =>
    ma1 = 0.0
    if mav == "SMA"
        ma1 := sma(src, length1)
        ma1

    if mav == "EMA"
        ma1 := ema(src, length1)
        ma1

    if mav == "WMA"
        ma1 := wma(src, length1)
        ma1

    if mav == "DEMA"
        ma1 := DEMA1
        ma1

    if mav == "TMA"
        ma1 := sma(sma(src, ceil(length1 / 2)), floor(length1 / 2) + 1)
        ma1

    if mav == "VAR"
        ma1 := VAR1
        ma1

    if mav == "WWMA"
        ma1:= WWMA1
        ma1

    if mav == "ZLEMA"
        ma1 := ZLEMA1
        ma1

    if mav == "TSF"
        ma1 := TSF1
        ma1

    if mav == "HULL"
        ma1 := HMA1
        ma1

    if mav == "TILL"
        ma1 := T31
        ma1
    ma1
    
MA26=getMA1(src, length1)


src2=MA12-MA26

Var_Func2(src2,length2)=>
    valpha2=2/(length2+1)
    vud12=src2>src2[1] ? src2-src2[1] : 0
    vdd12=src2<src2[1] ? src2[1]-src2 : 0
    vUD2=sum(vud12,9)
    vDD2=sum(vdd12,9)
    vCMO2=nz((vUD2-vDD2)/(vUD2+vDD2))
    VAR2=0.0
    VAR2:=nz(valpha2*abs(vCMO2)*src2)+(1-valpha2*abs(vCMO2))*nz(VAR2[1])
VAR2=Var_Func2(src2,length2)
DEMA2 = ( 2 * ema(src2,length2)) - (ema(ema(src2,length2),length2) )
Wwma_Func2(src2,length2)=>
    wwalpha2 = 1/ length2
    WWMA2 = 0.0
    WWMA2 := wwalpha2*src2 + (1-wwalpha2)*nz(WWMA2[1])
WWMA2=Wwma_Func2(src2,length2)
Zlema_Func2(src2,length2)=>
    zxLag2 = length2/2==round(length2/2) ? length2/2 : (length2 - 1) / 2
    zxEMAData2 = (src2 + (src2 - src2[zxLag2]))
    ZLEMA2 = ema(zxEMAData2, length2)
ZLEMA2=Zlema_Func2(src2,length2)
Tsf_Func2(src2,length2)=>
    lrc2 = linreg(src2, length2, 0)
    lrc12 = linreg(src2,length2,1)
    lrs2 = (lrc2-lrc12)
    TSF2 = linreg(src2, length2, 0)+lrs2
TSF2=Tsf_Func2(src2,length2)
HMA2 = wma(2 * wma(src2, length2 / 2) - wma(src2, length2), round(sqrt(length2)))
T3e12=ema(src2, length2)
T3e22=ema(T3e12,length2)
T3e32=ema(T3e22,length2)
T3e42=ema(T3e32,length2)
T3e52=ema(T3e42,length2)
T3e62=ema(T3e52,length2)
T3c12=-T3a1*T3a1*T3a1
T3c22=3*T3a1*T3a1+3*T3a1*T3a1*T3a1
T3c32=-6*T3a1*T3a1-3*T3a1-3*T3a1*T3a1*T3a1
T3c42=1+3*T3a1+T3a1*T3a1*T3a1+3*T3a1*T3a1
T32=T3c12*T3e62+T3c22*T3e52+T3c32*T3e42+T3c42*T3e32


getMA2(src2, length2) =>
    ma2 = 0.0
    if mav == "SMA"
        ma2 := sma(src2, length2)
        ma2

    if mav == "EMA"
        ma2 := ema(src2, length2)
        ma2

    if mav == "WMA"
        ma2 := wma(src2, length2)
        ma2

    if mav == "DEMA"
        ma2 := DEMA2
        ma2

    if mav == "TMA"
        ma2 := sma(sma(src2, ceil(length2 / 2)), floor(length2 / 2) + 1)
        ma2

    if mav == "VAR"
        ma2 := VAR2
        ma2

    if mav == "WWMA"
        ma2 := WWMA2
        ma2

    if mav == "ZLEMA"
        ma2 := ZLEMA2
        ma2

    if mav == "TSF"
        ma2 := TSF2
        ma2

    if mav == "HULL"
        ma2 := HMA2
        ma2

    if mav == "TILL"
        ma2 := T32
        ma2
    ma2


MATR=getMA2(MA12-MA26, length2)
hist = src2 - MATR

FromMonth = input(defval = 9, title = "From Month", minval = 1, maxval = 12)
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromYear  = input(defval = 2018, title = "From Year", minval = 999)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToYear    = input(defval = 9999, title = "To Year", minval = 999)
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)       
window()  => time >= start and time <= finish ? true : false
buySignal = crossover(hist, 0)
if (crossover(hist, 0))
	strategy.entry("MacdLong", strategy.long, comment="MacdLong")
sellSignal = crossunder(hist, 0)
if (crossunder(hist, 0))
	strategy.entry("MacdShort", strategy.short, comment="MacdShort")
buy1= barssince(buySignal)
sell1 = barssince(sellSignal)
color1 = buy1[1] < sell1[1] ? color.green : buy1[1] > sell1[1] ? color.red : na
barcolor(barcoloring ? color1 : na)


//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)

```

> Detail

https://www.fmz.com/strategy/435290

> Last Modified

2023-12-13 17:58:11
