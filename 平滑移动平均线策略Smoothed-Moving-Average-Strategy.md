
> Name

平滑移动平均线策略Smoothed-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/137b7bc310626195758.png)
[trans]

## 概述

该策略结合了多种不同的移动平均线,实现了一个简单的趋势跟踪策略。策略同时具有过滤噪音的功能。

## 策略原理

该策略首先会对收盘价进行平滑,可以选择是否使用Heiken Ashi收盘价。然后会调用smoothMA函数,实现多次叠加平滑移动平均线。smoothMA函数首先调用variant函数,variant函数可以生成多种不同类型的移动平均线,如SMA、EMA、DEMA等。variant函数生成指定类型和长度的移动平均线之后,smoothMA会通过递归的方式多次叠加调用variant函数,从而实现多重平滑。最终形成平滑度很高的移动平均线。当平滑移动平均线上涨时产生买入信号,当下跌时产生卖出信号。

## 优势分析

- 多重叠加移动平均线,能够有效滤除市场噪音,识别趋势。
- 支持多种移动平均线类型,如SMA、EMA、DEMA等,可以灵活组合使用。
- 支持Heiken Ashi技术,可以过滤假突破。 
- 策略简单易用,容易实施。
- 允许自定义移动平均线长度、类型和平滑次数,可以针对不同品种优化参数。

## 风险分析

- 多重叠加移动平均线会产生滞后,可能错过趋势最初的变化。
- 仅使用简单的移动平均线系统,在震荡行情中无法有效获利。
- 未考虑交易成本,实际交易中交易成本会降低盈利能力。
- 未设置止损,存在亏损扩大的风险。

可以考虑结合其他指标如MACD、KDJ等使用,识别趋势信号更加准确。优化移动平均线参数,降低滞后。设置合理的止损水平,控制单笔亏损。同时注意控制交易频率,降低交易成本。

## 优化方向

- 可以尝试不同长度和类型的移动平均线组合,找到最佳参数。
- 可以考虑在策略中加入其他技术指标,形成更系统的入市和出市规则。
- 可以设定交易时间,避免主要宏观事件对策略的影响。
- 可以根据品种特性调整参数,寻找最佳参数组合。
- 可以设定止损和止盈水平,控制交易风险。

## 总结

该策略通过多重叠加移动平均线实现趋势跟踪,可以有效滤除市场噪音。优点是简单易用,可以灵活调整参数。但仅使用移动平均线系统仍有盈利能力受限的问题。可以考虑与其他技术指标组合使用,同时注意控制交易风险,优化参数,提高策略效率。

||

## Overview

This strategy combines multiple moving averages to implement a simple trend following strategy. It also has the functionality of filtering out noise.

## Strategy Logic

The strategy first smoothes the closing price, with the option of using Heiken Ashi closing price. It then calls the smoothMA function to overlay multiple smoothed moving averages. The smoothMA function first calls the variant function, which can generate various types of moving averages like SMA, EMA, DEMA etc. After variant function generates the specified moving average, smoothMA recursively calls variant multiple times to overlay the smoothing. This results in a moving average with high level of smoothness. It generates buy signals when the smoothed MA goes up and sell signals when it goes down.

## Advantage Analysis 

- Multiple overlay of moving averages can effectively filter market noise and identify trends.
- Supports various moving average types like SMA, EMA, DEMA etc, allows flexible combinations.
- Heiken Ashi technique filters out false breakouts.
- Simple and easy to implement.
- Customizable MA length, type and smoothing times allows optimization for different products.

## Risk Analysis

- Multiple smoothing may cause lag and miss early trend changes. 
- Simple MA system struggles to profit in ranging markets.
- Ignores transaction costs which erodes profitability in actual trading.
- No stop loss in place, risks enlarged losses.

Consider combining other indicators like MACD, KDJ to improve signal accuracy. Optimize MA parameters to reduce lag. Use reasonable stop loss to control single trade loss. Also control trade frequency to minimize transaction costs.

## Optimization Directions

- Test different MA lengths and types for best combination.
- Add other technical indicators for more systematic entry and exit rules.
- Set trading session to avoid influence from major events.
- Adjust parameters based on product characteristics. 
- Set stop loss and take profit to control risks.

## Summary

The strategy follows trends via multi-overlay of moving averages, effectively filtering market noise. The advantages are simplicity and flexibility. But relying solely on MAs has limited profitability. Consider combining with other indicators, managing risks and optimizing parameters to improve efficiency.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false| Use HA as source ? |
|v_input_2|60| MA1 Length|
|v_input_3|2| Nr. of MA1 Smoothings |
|v_input_4|0|MA Type: EMA|SMA|DEMA|TEMA|WMA|VWMA|SMMA|Hull|LSMA|ALMA|KAMA|ZEMA|HWMA|AHMA|JURIK|T3|
|v_input_5|2018|Backtest Start Year|
|v_input_6|true|Backtest Start Month|
|v_input_7|true|Backtest Start Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-30 00:00:00
end: 2023-11-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// Copyright (c) 2007-present Jurik Research and Consulting. All rights reserved.
// Copyright (c) 2018-present, Alex Orekhov (everget)
// Thanks to everget for code for more advanced moving averages
// Smooth Moving Average [STRATEGY] @PuppyTherapy script may be freely distributed under the MIT license.
strategy( title="Smooth Moving Average [STRATEGY] @PuppyTherapy", overlay=true )

// ---- CONSTANTS ----
lsmaOffset = 1
almaOffset = 0.85
almaSigma  = 6
phase = 2
power = 2

// ---- GLOBAL FUNCTIONS ----
kama(src, len)=>
    xvnoise = abs(src - src[1])
    nfastend = 0.666
    nslowend = 0.0645
    nsignal = abs(src - src[len])
    nnoise = sum(xvnoise, len)
    nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
    nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2)
    nAMA = 0.0
    nAMA := nz(nAMA[1]) + nsmooth * (src - nz(nAMA[1]))

t3(src, len)=>
    xe1_1 = ema(src,    len)
    xe2_1 = ema(xe1_1,  len)
    xe3_1 = ema(xe2_1,  len)
    xe4_1 = ema(xe3_1,  len)
    xe5_1 = ema(xe4_1,  len)
    xe6_1 = ema(xe5_1,  len)
    b_1 = 0.7
    c1_1 = -b_1*b_1*b_1
    c2_1 = 3*b_1*b_1+3*b_1*b_1*b_1
    c3_1 = -6*b_1*b_1-3*b_1-3*b_1*b_1*b_1
    c4_1 = 1+3*b_1+b_1*b_1*b_1+3*b_1*b_1
    nT3Average_1 = c1_1 * xe6_1 + c2_1 * xe5_1 + c3_1 * xe4_1 + c4_1 * xe3_1
    
// The general form of the weights of the (2m + 1)-term Henderson Weighted Moving Average
getWeight(m, j) =>
    numerator = 315 * (pow(m + 1, 2) - pow(j, 2)) * (pow(m + 2, 2) - pow(j, 2)) * (pow(m + 3, 2) - pow(j, 2)) * (3 * pow(m + 2, 2) - 11 * pow(j, 2) - 16)
    denominator = 8 * (m + 2) * (pow(m + 2, 2) - 1) * (4 * pow(m + 2, 2) - 1) * (4 * pow(m + 2, 2) - 9) * (4 * pow(m + 2, 2) - 25)

    denominator != 0
         ? numerator / denominator
         : 0

hwma(src, termsNumber) =>
    sum = 0.0
    weightSum = 0.0
    
    termMult = (termsNumber - 1) / 2

    for i = 0 to termsNumber - 1
        weight = getWeight(termMult, i - termMult)
        sum := sum + nz(src[i]) * weight
        weightSum := weightSum + weight

    sum / weightSum

get_jurik(length, phase, power, src)=>
    phaseRatio = phase < -100 ? 0.5 : phase > 100 ? 2.5 : phase / 100 + 1.5
    beta = 0.45 * (length - 1) / (0.45 * (length - 1) + 2)
    alpha = pow(beta, power)
    jma = 0.0
    e0 = 0.0
    e0 := (1 - alpha) * src + alpha * nz(e0[1])
    e1 = 0.0
    e1 := (src - e0) * (1 - beta) + beta * nz(e1[1])
    e2 = 0.0
    e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * pow(1 - alpha, 2) + pow(alpha, 2) * nz(e2[1])
    jma := e2 + nz(jma[1])

variant(src, type, len ) =>
    v1 = sma(src, len)                                                  // Simple
    v2 = ema(src, len)                                                  // Exponential
    v3 = 2 * v2 - ema(v2, len)                                          // Double Exponential
    v4 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)               // Triple Exponential
    v5 = wma(src, len)                                                  // Weighted
    v6 = vwma(src, len)                                                 // Volume Weighted
    v7 = na(v5[1]) ? sma(src, len) : (v5[1] * (len - 1) + src) / len    // Smoothed
    v8 = wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))   // Hull
    v9 = linreg(src, len, lsmaOffset)                                   // Least Squares
    v10 = alma(src, len, almaOffset, almaSigma)                         // Arnaud Legoux
    v11 = kama(src, len)                                                // KAMA
    ema1 = ema(src, len)
    ema2 = ema(ema1, len)
    v13 = t3(src, len)                                                  // T3
    v14 = ema1+(ema1-ema2)                                              // Zero Lag Exponential
    v15 = hwma(src, len)                                                // Henderson Moving average thanks to  @everget
    ahma = 0.0
    ahma := nz(ahma[1]) + (src - (nz(ahma[1]) + nz(ahma[len])) / 2) / len //Ahrens Moving Average 
    v16 = ahma
    v17 = get_jurik( len, phase, power, src) 
    type=="EMA"?v2 : type=="DEMA"?v3 : type=="TEMA"?v4 : type=="WMA"?v5 : type=="VWMA"?v6 :
     type=="SMMA"?v7 : type=="Hull"?v8 : type=="LSMA"?v9 : type=="ALMA"?v10 : type=="KAMA"?v11 :
     type=="T3"?v13 : type=="ZEMA"?v14 : type=="HWMA"?v15 : type=="AHMA"?v16 : type=="JURIK"?v17 : v1

smoothMA(c, maLoop, type, len) =>
	ma_c = 0.0
	if maLoop == 1
		ma_c := variant(c, type, len)
	if maLoop == 2
		ma_c := variant(variant(c ,type, len),type, len)
	if maLoop == 3
		ma_c := variant(variant(variant(c ,type, len),type, len),type, len)
	if maLoop == 4
		ma_c := variant(variant(variant(variant(c ,type, len),type, len),type, len),type, len)
	if maLoop == 5
		ma_c := variant(variant(variant(variant(variant(c ,type, len),type, len),type, len),type, len),type, len)
	ma_c

// Smoothing HA Function
smoothHA( o, h, l, c ) =>
    hao = 0.0
    hac = ( o + h + l + c ) / 4
    hao := na(hao[1])?(o + c / 2 ):(hao[1] + hac[1])/2
    hah = max(h, max(hao, hac))
    hal = min(l, min(hao, hac))
	[hao, hah, hal, hac]

// ---- Main Selection ----
haSmooth   = input(false, title=" Use HA as source ? " )
length     = input(60, title=" MA1 Length", minval=1, maxval=1000)
maLoop     = input(2, title=" Nr. of MA1 Smoothings ", minval=1, maxval=5)
type       = input("EMA", title="MA Type", options=["SMA", "EMA", "DEMA", "TEMA", "WMA", "VWMA", "SMMA", "Hull", "LSMA", "ALMA", "KAMA", "ZEMA", "HWMA", "AHMA", "JURIK", "T3"])

// ---- BODY SCRIPT ----
[ ha_open, ha_high, ha_low, ha_close ] = smoothHA(open, high, low, close)

_close_ma = haSmooth ? ha_close : close

_close_smoothed_ma = smoothMA( _close_ma, maLoop, type, length)

maColor = _close_smoothed_ma > _close_smoothed_ma[1] ? color.lime : color.red
plot(_close_smoothed_ma, title= "MA - Trend",  color=maColor, transp=85, linewidth = 4)

long     = _close_smoothed_ma > _close_smoothed_ma[1] and _close_smoothed_ma[1] < _close_smoothed_ma[2]
short    = _close_smoothed_ma < _close_smoothed_ma[1] and _close_smoothed_ma[1] > _close_smoothed_ma[2]

plotshape( short , title="Short", color=color.red,  transp=80, style=shape.triangledown, location=location.abovebar, size=size.small)
plotshape( long ,  title="Long",  color=color.lime, transp=80, style=shape.triangleup,   location=location.belowbar, size=size.small)

//* Backtesting Period Selector | Component *//
//* Source: https://www.tradingview.com/script/eCC1cvxQ-Backtesting-Period-Selector-Component *//
testStartYear   = input(2018, "Backtest Start Year",minval=1980)
testStartMonth  = input(1, "Backtest Start Month",minval=1,maxval=12)
testStartDay    = input(1, "Backtest Start Day",minval=1,maxval=31)
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)
testStopYear    = 9999 //input(9999, "Backtest Stop Year",minval=1980)
testStopMonth   = 12 // input(12, "Backtest Stop Month",minval=1,maxval=12)
testStopDay     = 31 //input(31, "Backtest Stop Day",minval=1,maxval=31)
testPeriodStop  = timestamp(testStopYear,testStopMonth,testStopDay,0,0)
testPeriod() => time >= testPeriodStart and time <= testPeriodStop ? true : false

if testPeriod() and long
    strategy.entry( "long", strategy.long )

if testPeriod() and short
    strategy.entry( "short", strategy.short )



```

> Detail

https://www.fmz.com/strategy/431223

> Last Modified

2023-11-06 10:29:24
