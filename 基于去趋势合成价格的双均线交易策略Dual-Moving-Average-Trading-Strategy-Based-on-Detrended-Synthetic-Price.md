
> Name

基于去趋势合成价格的双均线交易策略Dual-Moving-Average-Trading-Strategy-Based-on-Detrended-Synthetic-Price

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略是基于去趋势合成价格(Detrended Synthetic Price, DSP)的双均线交易策略。DSP是一个与真实价格主导周期同步的函数,通过计算1/4周期EMA减去1/2周期EMA获得。当DSP上穿上轨或下穿下轨时,进行单边交易。

## 策略原理

1. 计算价格的1/2周期HL平均值xHL2。

2. 根据Length参数计算xHL2的1/4周期EMA(xEMA1)和1/2周期EMA(xEMA2)。

3. 计算xEMA1减xEMA2得到去趋势合成价格DSP。

4. 设置上下轨参数,当DSP上穿上轨时做多,下穿下轨时做空。

5. 可通过reverse参数切换做多做空方向。

## 优势分析

该策略具有以下优势:

1. DSP可捕捉价格主导循环,避免被次要周期误导。

2. 双EMA设计可有效跟踪主导循环变化。

3. 上下轨简单易行,可避免过度交易。

4. 可方便切换做多做空方向,适应不同市场环境。

5. 无需复杂参数优化,简单实用。

## 风险分析

该策略的主要风险有:

1. DSP周期设定不当,可能错过主导循环。

2. 上下轨宽度需要优化,否则可能过于频繁交易。

3. 固定周期设计,对剧烈变化的市场适应性较差。

4. 仅基于DSP交易,容易受到震荡市重复交叉误导。

5. 未考虑止损,存在大幅亏损风险。

## 优化方向

该策略可从以下方向进行优化:

1. 优化参数,寻找最佳周期参数组合。

2. 增加基于波动率的动态上下轨设定。

3. 结合趋势、波动率指标进行过滤,减少虚假信号。

4. 增加移动止损或跟踪止损来控制风险。

5. 进行多品种参数调整,评估通用性。

6. 增加机器学习算法,实现DSP周期的自适应优化。

## 总结

该策略整体是一个非常简洁实用的双均线交易策略。它建立在合理的周期分析基础上,通过DSP有效跟踪主导循环。在参数优化、止损机制、过滤条件等方面的改进,可以成为一个较为可靠的量化交易策略。

||


## Overview

This is a dual moving average trading strategy based on the Detrended Synthetic Price (DSP). DSP is a function that is in phase with the dominant cycle of real price data, obtained by subtracting a half-cycle EMA from the quarter-cycle EMA. When DSP crosses above the upper band or below the lower band, unilateral trades are taken.

## Strategy Logic

1. Calculate the 1/2-cycle HL average xHL2 of price.

2. Compute the 1/4-cycle EMA (xEMA1) and 1/2-cycle EMA (xEMA2) of xHL2 based on Length. 

3. Obtain DSP by subtracting xEMA2 from xEMA1.

4. Set upper and lower band parameters, go long when DSP crosses above upper band, and go short when crossing below lower band.

5. The reverse parameter can switch between long and short direction.

## Advantage Analysis

Advantages of this strategy:

1. DSP captures the dominant price cycle, avoiding misdirection from minor cycles.

2. The dual EMA design effectively tracks dominant cycle changes.

3. Simple upper/lower bands avoid over-trading. 

4. Easily switch between long/short using reverse parameter, adaptable to different market environments.

5. No complex parameter optimization required, simple and practical.

## Risk Analysis

Main risks:

1. Improper DSP cycle setting may miss the dominant cycle.

2. Band width needs optimization, otherwise over-trading may occur.

3. Fixed cycle design has poor adaptability to violent market changes.

4. Trading on DSP alone leaves strategy vulnerable to whipsaws.

5. Lack of stop loss may lead to significant losses.

## Optimization Directions

Improvements:

1. Optimize parameters to find best cycle combination.

2. Add dynamic bands based on volatility.

3. Incorporate trend and volatility filters to reduce false signals. 

4. Add stop loss or trailing stop mechanisms to control risk.

5. Test across multiple instruments for universality.

6. Introduce machine learning for adaptive DSP cycle optimization.

## Summary

Overall this is a very simple and practical dual moving average trading strategy. It is built on solid cycle analysis foundations, with DSP effectively tracking the dominant cycle. With refinements in parameter optimization, stop losses, filter conditions and more, it can become a reliable quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|25|SellBand|
|v_input_3|-25|BuyBand|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-13 02:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/03/2017
// Detrended Synthetic Price is a function that is in phase with the 
// dominant cycle of real price data. This DSP is computed by subtracting 
// a half-cycle exponential moving average (EMA) from the quarter cycle 
// exponential moving average.
// See "MESA and Trading Market Cycles" by John Ehlers pages 64 - 70. 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="D_DSP (Detrended Synthetic Price)", shorttitle="D_DSP")
Length = input(14, minval=1)
SellBand = input(25)
BuyBand = input(-25)
reverse = input(false, title="Trade reverse")
hline(0, color=blue, linestyle=line)
hline(SellBand, color=red, linestyle=line)
hline(BuyBand, color=green, linestyle=line)
xHL2 = hl2
xEMA1 = ema(xHL2, Length)
xEMA2 = ema(xHL2, 2 * Length)
xEMA1_EMA2 = xEMA1 - xEMA2
pos = iff(xEMA1_EMA2 > SellBand, 1,
	     iff(xEMA1_EMA2 < BuyBand, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(xEMA1_EMA2, color=blue, title="D_DSP")
```

> Detail

https://www.fmz.com/strategy/427280

> Last Modified

2023-09-19 17:13:28
