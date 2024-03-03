
> Name

基于Ehlers-MESA自适应移动平均线的交易策略Ehlers-MESA-Adaptive-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于Ehlers MESA自适应移动平均线,设计了一个跟踪两个平均线交叉的趋势交易策略。当快线上穿慢线时做多,当快线下穿慢线时做空,属于典型的双移动平均线交叉策略。

## 策略原理

本策略的核心是计算两个自适应移动平均线:MAMA线和FAMA线。其中,MAMA线计算公式如下:

```pine
alpha = fl / dphase 
alpha = iff(alpha < sl, sl, iff(alpha > fl, fl, alpha))
mama = alpha*src + (1 - alpha)*nz(mama[1])
```

其中fl是快限制,sl是慢限制,dphase是相位差。alpha根据相位差动态调整,实现自适应平滑参数。

FAMA线计算公式如下:

```pine 
fama = .5*alpha*mama + (1 - .5*alpha)*nz(fama[1]) 
```

FAMA线是MAMA线的低通滤波平滑线。

策略通过比较MAMA线和FAMA线的大小关系,判断目前是处于上升趋势还是下降趋势,以此产生交易信号。

## 策略优势分析

该策略有以下几点优势:

1. 使用自适应移动平均线,参数会根据市场变化自动调整,无需人为设置固定参数。

2. 增加低通滤波器FAMA线,可以过滤假突破。

3. 采用双移动平均线设计,可以跟踪市场中长线趋势。

4. 策略逻辑简单清晰,容易理解和修改。

5. 可视化指标直观,可以清楚看到交易信号。


## 风险分析

该策略也存在一些风险:

1. 双线交叉策略容易产生多次交易信号,建议适当控制间距和回撤。

2. MAMA和FAMA线计算复杂,参数设置不当可能导致曲线畸变。

3. 自适应参数可能导致过度优化,需要联合其他技术指标验证。 

4. 双线交叉存在时间滞后,可能错过趋势转换点。

5. 需关注假突破导致的止损风险。

## 策略优化方向

该策略可以从以下几个方向进行优化:

1. 优化参数设置,找到最佳的快限制、慢限制参数组合。

2. 增加止损策略,严格控制单笔止损。

3. 结合其他指标过滤信号,例如MACD、RSI等,避免假突破。

4. 增加趋势判断指标,避免逆势交易。

5. 优化入场节奏,调整双线交叉的间距要求,减少过于频繁交易。

6. 优化止盈策略,根据趋势强度采取不同的止盈方式。

7. 测试不同品种参数设置差异,寻找最佳参数组合。


## 总结

本策略 overall 是一种典型的趋势跟踪策略,利用 Ehlers MESA 自适应移动平均线构建了一个可视化指标,并以双线交叉方式产生交易信号。策略具有参数自适应、滤波假突破、可视化等优势,也存在时间滞后、多次交易等风险。未来可从参数优化、止损策略、信号过滤等方面进行改进,使策略更稳健可靠。

||


## Overview

This strategy is based on the Ehlers MESA Adaptive Moving Average and designed a trend trading strategy that tracks crossovers between two moving averages. It goes long when the fast line crosses above the slow line, and goes short when the fast line crosses below the slow line. This is a typical dual moving average crossover strategy.

## Strategy Logic

The core of this strategy is to compute two adaptive moving averages: the MAMA line and the FAMA line. The MAMA line is calculated as:

```pine
alpha = fl / dphase
alpha = iff(alpha < sl, sl, iff(alpha > fl, fl, alpha))  
mama = alpha*src + (1 - alpha)*nz(mama[1])
```

Where fl is the fast limit, sl is the slow limit, and dphase is the phase difference. Alpha adaptively adjusts based on the phase difference to achieve adaptive smoothing.

The FAMA line is calculated as:

```pine
fama = .5*alpha*mama + (1 - .5*alpha)*nz(fama[1])
```

The FAMA line is a low pass filtered smoothing of the MAMA line. 

The strategy compares the magnitude relationship between the MAMA and FAMA lines to determine if the market is currently in an uptrend or a downtrend, and generates trading signals based on this.

## Advantage Analysis 

The strategy has the following advantages:

1. Uses adaptive moving averages where the parameters automatically adjust based on market changes, without needing fixed manually set parameters.

2. The low pass filter FAMA line can filter out false breakouts. 

3. Using a dual moving average design can track medium to long term trends.

4. Simple and clear strategy logic that is easy to understand and modify.

5. Visual indicators that clearly show trading signals.

## Risk Analysis

The strategy also has some risks:

1. Dual line crossover strategies can generate excessive trading signals, proper drawdown and interval controls are recommended.

2. Complex MAMA and FAMA calculations, improper parameter settings may cause curve distortions.

3. Adaptive parameters may lead to overfitting, verification with other technical indicators is needed.

4. Dual line crossovers have time lags, may miss trend turning points.

5. Need to watch out for stop loss risks from false breakouts.

## Optimization Directions

The strategy can be optimized in the following areas:

1. Optimize parameter settings to find the best fast limit and slow limit combinations.

2. Add stop loss strategies to strictly control per trade stop loss. 

3. Add other indicators to filter signals, such as MACD, RSI etc to avoid false breakouts.

4. Add trend judging indicators to avoid counter trend trades.

5. Optimize entry pace by adjusting crossover requirements to reduce overly frequent trading.

6. Optimize profit taking strategies according to trend strength.

7. Test parameter differences between various products to find optimal parameter combinations.

## Summary

Overall this is a typical trend following strategy, using the Ehlers MESA adaptive moving averages to construct a visualized indicator and generate trading signals through dual line crossovers. The strategy has advantages like adaptive parameters, filtering of false breakouts and visualization, but also risks like time lags and excessive trading. Future improvements can be made through parameter optimization, stop loss strategies, signal filtering etc to make the strategy more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|0.4|Fast Limit|
|v_input_3|0.04|Slow Limit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-20 00:00:00
end: 2023-09-27 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// @author LazyBear 
// 
// List of my public indicators: http://bit.ly/1LQaPK8 
// List of my app-store indicators: http://blog.tradingview.com/?p=970 
//
strategy("Ehlers MESA Adaptive Moving Average [LazyBear with ekoronin fix]", shorttitle="EMAMA_LB (ekoronin fix)", overlay=false, calc_on_every_tick=true, precision=0)
src=input(close, title="Source")
fl=input(.4, title="Fast Limit")
sl=input(.04, title="Slow Limit")
pi = 3.1415926
sp = (4*src + 3*src[1] + 2*src[2] + src[3]) / 10.0
dt = (.0962*sp + .5769*nz(sp[2]) - .5769*nz(sp[4])- .0962*nz(sp[6]))*(.075*nz(p[1]) + .54)
q1 = (.0962*dt + .5769*nz(dt[2]) - .5769*nz(dt[4])- .0962*nz(dt[6]))*(.075*nz(p[1]) + .54)
i1 = nz(dt[3])
jI = (.0962*i1 + .5769*nz(i1[2]) - .5769*nz(i1[4])- .0962*nz(i1[6]))*(.075*nz(p[1]) + .54)
jq = (.0962*q1 + .5769*nz(q1[2]) - .5769*nz(q1[4])- .0962*nz(q1[6]))*(.075*nz(p[1]) + .54)
i2_ = i1 - jq
q2_ = q1 + jI
i2 = .2*i2_ + .8*nz(i2[1])
q2 = .2*q2_ + .8*nz(q2[1])
re_ = i2*nz(i2[1]) + q2*nz(q2[1])
im_ = i2*nz(q2[1]) - q2*nz(i2[1])
re = .2*re_ + .8*nz(re[1])
im = .2*im_ + .8*nz(im[1])
//p1 = iff(im!=0 and re!=0, 360/atan(im/re), nz(p[1]))
p1 = iff(im!=0 and re!=0, 2*pi/atan(im/re), nz(p[1]))
p2 = iff(p1 > 1.5*nz(p1[1]), 1.5*nz(p1[1]), iff(p1 < 0.67*nz(p1[1]), 0.67*nz(p1[1]), p1))
p3 = iff(p2<6, 6, iff (p2 > 50, 50, p2))
p = .2*p3 + .8*nz(p3[1])
spp = .33*p + .67*nz(spp[1])
//phase = atan(q1 / i1)
phase = 180/pi * atan(q1 / i1) 
dphase_ = nz(phase[1]) - phase
dphase = iff(dphase_< 1, 1, dphase_)
alpha_ = fl / dphase
alpha = iff(alpha_ < sl, sl, iff(alpha_ > fl, fl, alpha_))
mama = alpha*src + (1 - alpha)*nz(mama[1])
fama = .5*alpha*mama + (1 - .5*alpha)*nz(fama[1])
//pa=input(false, title="Mark crossover points")
//plotarrow(pa?(cross(mama, fama)?mama<fama?-1:1:na):na, title="Crossover Markers")
//fr=input(false, title="Fill MAMA/FAMA Region")
//duml=plot(fr?(mama>fama?mama:fama):na, style=circles, color=gray, linewidth=0, title="DummyL")
//mamal=plot(mama, title="MAMA", color=red, linewidth=2)
//famal=plot(fama, title="FAMA", color=green, linewidth=2)
//fill(duml, mamal, red, transp=70, title="NegativeFill")
//fill(duml, famal, green, transp=70, title="PositiveFill")
//ebc=input(false, title="Enable Bar colors")
//bc=mama>fama?lime:red
//barcolor(ebc?bc:na)

longSpike=mama>fama? 1:0
shortSpike=mama<fama? 1:0

plot(longSpike, title = "Mama Long", style=line, linewidth=1, color=yellow)
plot(shortSpike, title = "Mama Short", style=line, linewidth=1, color=red)

//possig = iff(reverse and pos == 1, -1,
//          iff(reverse and pos == -1, 1, pos))	   
if (longSpike) 
    strategy.entry("Long", strategy.long)
if (shortSpike)
    strategy.entry("Short", strategy.short)	

```

> Detail

https://www.fmz.com/strategy/428090

> Last Modified

2023-09-28 15:37:13
