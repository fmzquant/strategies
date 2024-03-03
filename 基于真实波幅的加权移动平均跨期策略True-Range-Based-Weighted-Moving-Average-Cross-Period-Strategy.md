
> Name

基于真实波幅的加权移动平均跨期策略True-Range-Based-Weighted-Moving-Average-Cross-Period-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15a79254a2bb424dcb9.png)
 [trans]

## 概述

本策略利用真实波幅(True Range)和加权移动平均(WMA)构建一个跨期指标,实现趋势判断。同时,它具有多个仓位累加的金字塔加仓机制,以及多个止损机制,旨在追求稳定盈利。

## 策略原理

该策略首先计算上涨波幅(sube)和下跌波幅(baja),然后分别计算快线(corto)周期和慢线(largo)周期的WMA。快慢线差值再次通过WMA计算出指标(ind)。当指标上穿0时产生买入信号,下穿0时产生卖出信号。

在入市后,策略预設5个仓位,按照等比(一倍)累加的方式实现金字塔加仓。同时设置了止损机制,之后开仓时都要判断当前浮盈是否低于止损线,从而控制风险。

## 优势分析

该策略集成了跨期判断、金字塔加仓、多重止损等机制,可以有效控制风险,追求稳定盈利。

跨期判断通过快慢线组合建立趋势判断体系,可以有效过滤市场噪音,识别趋势转折点。金字塔加仓可以在趋势开始阶段获利更多,多重止损机制可以有效控制单笔损失。

## 风险分析

该策略主要风险在于可能出现突发事件导致快速行情反转,触发止损cutoff而造成损失。此外,参数设置不当也会影响策略稳定性。

可以通过适当放宽止损线来应对行情反转的风险。优化参数设置,调整周期参数、仓位数等可提高策略稳定性。

## 优化方向

该策略可从以下几个方面进行优化:

1. 增加统计学指标判断,结合波动率、成交量等指标修正参数,使策略更具适应性。

2. 增加机器学习模型判断,利用LSTM等深度学习模型辅助判断,提高策略准确性。

3. 优化仓位管理机制,可考虑随浮盈比例调整加仓幅度,让仓位增长更合理。

4. 结合期货套保模型,利用期现套利进一步控制风险。

## 总结

本策略总体来说是一个基于真实波幅指标构建的跨周期趋势策略,具有金字塔加仓和多重止损机制,可以有效控制风险,追求稳定盈利,是一个非常实用的量化交易策略。但仍需注意行情反转和参数优化问题,可从统计学、机器学习等方面进行进一步优化。

||


## Overview

This strategy uses True Range and Weighted Moving Average (WMA) to build a cross period indicator for trend judgement. At the same time, it has a pyramid position accumulation mechanism with multiple stop loss mechanisms to pursue stable profits.

## Strategy Principle  

The strategy first calculates the up amplitude (sube) and down amplitude (baja), and then calculates the WMA of the fast line (corto) cycle and the slow line (largo) cycle respectively. The difference between the fast and slow lines is calculated again through WMA to get the indicator (ind). When the indicator crosses above 0, a buy signal is generated. When it crosses below 0, a sell signal is generated.

After entering the market, the strategy presets 5 positions, which are accumulated in a pyramid (doubled) manner. At the same time, a stop loss mechanism is set so that the subsequent positions opened will be judged whether the current floating profit is lower than the stop loss line, so as to control risks.

## Advantage Analysis   

The strategy integrates mechanisms such as cross-cycle judgment, pyramid position accumulation, and multiple stop losses, which can effectively control risks and pursue stable profits.

Cross-cycle judgments establish a trend judgment system through fast and slow lines combination, which can effectively filter market noise and identify trend turning points. Pyramid positions can profit more at the beginning of the trend, and multiple stop loss mechanisms can effectively control single loss.

## Risk Analysis

The main risk of this strategy is the possibility of a sudden event causing a rapid market reversal that triggers a stop loss cutoff and causes losses. In addition, improper parameter settings will also affect the stability of the strategy.

The risk of market reversal can be dealt with by appropriately relaxing the stop loss line. Optimizing parameter settings and adjusting cycle parameters, number of positions, etc. can improve the stability of the strategy.

## Optimization Direction  

The strategy can be optimized in the following aspects:

1. Increase statistical indicators for judgement, use indicators like volatility and volume to correct parameters and make the strategy more adaptive.

2. Increase machine learning model for judgement, use LSTM and other deep learning models to assist judgement and improve strategy accuracy.  

3. Optimize position management mechanisms, consider adjusting the amplitude of position increase according to floating profit percentage to make position growth more reasonable.

4. Incorporate futures hedging models to further control risks through spot and futures arbitrage.   

## Summary   

In summary, this is a cross-cycle trend strategy based on True Range indicators with pyramid position accumulation and multiple stop loss mechanisms, which can effectively control risks and pursue stable profits. It is a very practical quantitative trading strategy. However, attention is still needed to reversal risks and parameter optimization problems. Further optimizations can be done in statistics, machine learning and other aspects.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_2|timestamp(31 Dec 2025 00:00 -0700)|End Time|
|v_input_3|10|corto|
|v_input_4|30|largo|
|v_input_5|10|suavizado|
|v_input_6|50000|contrato1|
|v_input_float_1|6.5|porc_tp|
|v_input_7|-6|safe|
|v_input_1|timestamp(01 Jan 2022 00:00 -0700)|(?Backtest Window)Start Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-10 00:00:00
end: 2024-01-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MaclenMtz

//@version=5
strategy("[MACLEN] Rangos", shorttitle="Rangos [https://t.me/Bitcoin_Maclen]", overlay=false )

//------WINDOW----------

i_startTime = input(defval = timestamp("01 Jan 2022 00:00 -0700"), title = "Start Time", group = "Backtest Window")
i_endTime = input(defval = timestamp("31 Dec 2025 00:00 -0700"), title = "End Time")
window = true

//-----------------------------

sube = close>close[1] ? ta.tr : 0
baja = close<close[1] ? ta.tr : 0

corto = input(10)
largo = input(30)
suavizado = input(10)

fastDiff = ta.wma(sube, corto) - ta.wma(baja,corto)
slowDiff = ta.wma(sube, largo) - ta.wma(baja, largo)
ind = ta.wma(fastDiff - slowDiff, suavizado)

iColor = ind>0 ? color.green : ind<0 ? color.red : color.black
plot(ind, color=iColor)
plot(0, color=color.white)

long = ind[1]<ind and ind[2]<ind[1] and ind<0
short = ind[1]>ind and ind[2]>ind[1] and ind>0

plotshape(long and not long[1], style = shape.xcross, color=color.green, location=location.bottom, size=size.tiny)
plotshape(short and not short[1], style = shape.xcross, color=color.red, location=location.top, size=size.tiny)

//Contratos
contrato1 = input(50000)/(16*close)
c1 = contrato1
c2 = contrato1
c3 = contrato1*2
c4 = contrato1*4
c5 = contrato1*8

//cap_enopentrade = strategy.opentrades == 1 ? c1: strategy.opentrades == 2 ? c1+c2: strategy.opentrades == 3 ? c1+c2+c3: strategy.opentrades == 4 ? c1+c2+c3+c4: strategy.opentrades == 5 ? c1+c2+c3+c4+c5 : 0
openprofit_porc = math.round((close-strategy.position_avg_price)/strategy.position_avg_price * 100,2)

porc_tp = input.float(6.5)
safe = input(-6)

//----------------Strategy---------------------------

if strategy.opentrades == 0
    strategy.entry('BUY1', strategy.long, qty=c1, when = long and not long[1] and window)

if strategy.opentrades == 1
    strategy.entry('BUY2', strategy.long, qty=c2, when = long and not long[1] and window and openprofit_porc<safe)

if strategy.opentrades == 2
    strategy.entry('BUY3', strategy.long, qty=c3, when = long and not long[1] and window and openprofit_porc<safe)

if strategy.opentrades == 3
    strategy.entry('BUY4', strategy.long, qty=c4, when = long and not long[1] and window and openprofit_porc<safe)

if strategy.opentrades == 4
    strategy.entry('BUY5', strategy.long, qty=c5, when = long and not long[1] and window and openprofit_porc<safe)

min_prof = strategy.openprofit>0

strategy.close_all(when=short and min_prof)

plot(openprofit_porc)

```

> Detail

https://www.fmz.com/strategy/439074

> Last Modified

2024-01-17 15:09:28
