
> Name

动量趋势延续因子策略Momentum-Trend-Continuation-Factor-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略通过计算正负动量变化的累积和,来判断当前趋势的延续性,以此来决定做多做空方向。当正动量变化的累积和大于负动量变化的累积和时,判断为上涨趋势延续,做多;当负动量变化的累积和大于正动量变化的累积和时,判断为下跌趋势延续,做空。

## 策略原理

1. 计算当前周期收盘价相对上一周期的变化量xChange。

2. 将xChange进行分类,正变化记为xPlusChange,负变化记为xMinusChange。 

3. 定义正负累积和变量xPlusCF、xMinusCF,分别对正负变化进行累积。

4. 计算本周期正负变化量:

   xPlus = xPlusChange - xMinusCF

   xMinus = xMinusChange - xPlusCF

5. 计算正负变化的累积和:

   xPlusTCF = sum(xPlus, Length) 

   xMinusTCF = sum(xMinus, Length)

6. 比较正负累积和大小,确定做多做空方向:

   if xPlusTCF > xMinusTCF

      做多

   else if xPlusTCF < xMinusTCF

      做空

7. 添加反向交易参数reverse,可以将做多做空方向反转。

该策略通过跟踪正负动量变化的累积趋势,比较当前上涨力量和下跌力量的较大者,来判断未来价格走势的可能方向,从而产生交易信号。

## 优势分析

1. 使用动量指标,能比价格指标更早捕捉到趋势变化。

2. 采用正负累积和比较,过滤市场噪音,判断主要趋势方向。

3. 可自定义参数Length调整敏感度,降低虚假信号。

4. 添加反向交易开关,可灵活适应不同市场环境。

5. 结合趋势指标使用,可以发挥组合策略优势。

6. 容易理解实现,适合新手学习和实践。

## 风险分析

1. 需适当调整参数Length,过长或过短都会影响效果。

2. 在趋势反转点附近可能产生错误信号。

3. 趋势震荡市场中信号频繁,不适宜该策略。

4. 需关注反向开关使用时的心理影响。

5. 需适当测试和验证,或组合其他指标过滤。

6. 不能保证所有交易信号盈利,需适当设置止损。

## 优化方向 

1. 可以结合其他趋势指标辅助判断,如EMA、MACD等。

2. 增加参数可自定义正负变化的计算方式。

3. 优化参数Length的选择,使其自适应变化。

4. 添加止损机制来控制单笔损失。

5. 构建完整的自动交易系统,并进行回测优化。

6. 尝试机器学习方法来训练参数及交易规则。

## 总结

本策略通过动量指标设计了一套较为简单的趋势跟踪方式,思路清晰易于实现,可作为趋势交易策略的基础模板。但实际运用中,需要注意参数调整并验证效果,还需组合其他技术指标来发挥最大效用,降低误判风险,提高稳定性。同时要控制风险,做好止损,不盲目追随信号。如果能不断优化完善,增加自动化元素,将助于产生稳定的交易系统。

||


## Overview

This strategy determines the trend continuation by calculating the cumulative sum of positive and negative momentum changes, and uses it to decide the long or short direction. When the cumulative sum of positive momentum changes is greater than that of negative momentum changes, it is judged as an upward trend continuation for long. When the cumulative sum of negative momentum changes is greater than that of positive momentum changes, it is judged as a downward trend continuation for short.

## Strategy Logic

1. Calculate the change xChange of current close price relative to previous period.

2. Categorize xChange into xPlusChange for positive change, and xMinusChange for negative change.

3. Define cumulative sum variables xPlusCF and xMinusCF to accumulate positive and negative changes respectively.  

4. Calculate positive and negative changes for current period:

   xPlus = xPlusChange - xMinusCF

   xMinus = xMinusChange - xPlusCF

5. Calculate cumulative sums of positive and negative changes:

   xPlusTCF = sum(xPlus, Length)

   xMinusTCF = sum(xMinus, Length)  

6. Compare the cumulative sums to determine long or short direction:

   if xPlusTCF > xMinusTCF

      Long

   else if xPlusTCF < xMinusTCF

      Short

7. Add reverse input to switch the long/short direction.

By tracking the cumulative trend of positive and negative momentum changes, and comparing the greater momentum between upward and downward forces, this strategy judges the likely future price direction to generate trading signals.

## Advantage Analysis 

1. Using momentum indicators can capture trend changes earlier than price indicators.

2. Comparing positive and negative cumulative sums filters market noise and determines the main trend direction. 

3. Customizable Length parameter adjusts sensitivity and reduces false signals.

4. Adding reverse switch provides flexibility to adapt to different market environments.

5. Combining with trend indicators can utilize advantages of composite strategies.

6. Easy to understand and implement, suitable for beginners to learn and practice.

## Risk Analysis

1. Need proper adjustment of Length parameter, too long or short will affect performance.

2. May generate wrong signals around trend reversal points.

3. Frequent signals in ranging, choppy markets make it unsuitable.

4. Need to watch out the psychological impacts when using reverse switch.

5. Require proper testing and verification, or combining with other filters. 

6. Cannot guarantee all trades will be profitable, need proper stop loss.

## Optimization Directions

1. Can combine with other trend indicators like EMA, MACD etc.

2. Add parameters to customize positive/negative change calculations.

3. Optimize Length parameter selection to be adaptive. 

4. Add stop loss mechanisms to control single trade loss.

5. Build complete auto trading system and backtest for optimization.

6. Try machine learning methods to train parameters and rules.

## Summary

This strategy designs a relatively simple trend following approach using momentum indicators, with clear logic and easy implementation, serving as a basic template for trend trading strategies. But for actual use, parameter tuning and validation are needed, as well as combining with other technical indicators, to maximize usefulness, minimize false signals, and improve robustness. Also risk control is important, with proper stop loss, not blindly following signals. With continuous optimizations and improvements, adding automation elements, it will help generate stable trading systems.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|35|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-01 00:00:00
end: 2023-10-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 04/01/2018
//    Trend continuation factor, by M.H. Pee 
//    The related article is copyrighted material from Stocks & Commodities.
//
//You can change long to short in the Input Settings
//WARNING:
//- For purpose educate only
//- This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Trend continuation factor")
Length = input(35, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=green, linestyle=line)
xChange = mom(close, 1)
xPlusChange = iff(xChange > 0, xChange, 0)
xMinusChange = iff(xChange < 0, (xChange * -1), 0)
xPlusCF = iff(xPlusChange == 0, 0, xPlusChange + nz(xPlusCF[1], 1))
xMinusCF = iff(xMinusChange == 0, 0, xMinusChange + nz(xMinusCF[1], 1))
xPlus = xPlusChange - xMinusCF
xMinus = xMinusChange - xPlusCF
xPlusTCF =  sum(xPlus, Length)
xMinusTCF = sum(xMinus, Length)
pos = iff(xPlusTCF > xMinusTCF, 1,
       iff(xPlusTCF < xMinusTCF, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xPlusTCF, color=blue, title="Plus TCF")
plot(xMinusTCF, color=red, title="Minus TCF")
```

> Detail

https://www.fmz.com/strategy/428719

> Last Modified

2023-10-08 16:15:34
