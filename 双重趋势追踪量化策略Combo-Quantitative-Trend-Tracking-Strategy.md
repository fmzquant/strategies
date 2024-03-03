
> Name

双重趋势追踪量化策略Combo-Quantitative-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11a6b61ce709a0c3e87.png)
[trans]
## 概述

本策略的核心思想是结合123反转策略和彩虹振荡器指标,实现双重趋势追踪,以提高策略的胜率。该策略通过追踪短期和中期的价格趋势,动态调整仓位,实现超越大盘的超额收益。

## 策略原理

该策略由两部分组成:

1. 123反转策略:如果前两天收盘价下跌而今天收盘价上涨,且9日Slow K线低于50,则做多;如果前两天收盘价上涨而今天收盘价下跌,且9日Fast K线高于50,则做空。

2. 彩虹振荡器指标:该指标反映价格相对于移动平均线的偏离程度,当指标高于80时,表明市场趋于不稳定;当指标低于20时,表明市场趋于反转。

本策略将两者结合,同时做多做空信号出现时开仓,否则平仓。

## 优势分析

该策略具有以下优势:

1. 双重过滤,提高信号质量,降低误判率。
2. 动态调整仓位,降低单向行情的损失。
3. 整合短期和中期指标,提高策略稳定性。

## 风险分析

该策略也存在以下风险:

1. 参数优化不当可能导致过拟合。
2. 双重开仓会增加交易成本。
3. 标的价格剧烈波动时,止损点容易被击穿。

可以通过调整参数、优化仓位管理、合理设置止损来减轻这些风险。

## 优化方向 

该策略可以从以下方面进行优化:

1. 对参数进行优化,找到最佳参数组合。
2. 增加仓位管理模块,根据波动率和回撤动态调整仓位。
3. 增加止损模块,合理设置移动止损。
4. 增加机器学习算法,辅助判断趋势转折点。

## 总结

本策略整合123反转策略和彩虹振荡器指标,实现双重趋势追踪,在保持较高稳定性的同时,具有一定的超额收益空间。通过持续优化,有望进一步提升策略收益率。

||

## Overview

The core idea of this strategy is to combine the 123 reversal strategy and the rainbow oscillator indicator to achieve double trend tracking and improve the winning rate of the strategy. By tracking short-term and medium-term price trends dynamically, this strategy adjusts positions to achieve excess returns over benchmarks.

## Principles 

The strategy consists of two parts:

1. 123 Reversal Strategy: Go long if the closing price declines for the previous two days and rises today, and the 9-day Slow K line is below 50; Go short if the closing price rises for the previous two days and falls today, and the 9-day Fast K line is above 50.

2. Rainbow Oscillator Indicator: This indicator reflects the degree of deviation of prices relative to moving averages. When the indicator is higher than 80, it indicates that the market tends to be unstable. When the indicator is lower than 20, it indicates that the market tends to reverse.

This strategy opens positions when both long and short signals appear, otherwise flattens positions.

## Advantage Analysis

The advantages of this strategy are:

1. Double filter improves signal quality and reduces misjudgment.  
2. Dynamic position adjustment reduces losses in one-way markets.
3. Integrates short-term and medium-term indicators to improve stability.

## Risk Analysis  

The risks of this strategy include:  

1. Improper parameter optimization may lead to overfitting.
2. Double opening increases trading costs.  
3. Stop loss point is vulnerable when price fluctuates violently.

These risks can be mitigated by adjusting parameters, optimizing position management, and setting stop loss reasonably.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Optimize parameters to find the best parameter combination.
2. Add position management module to adjust positions dynamically based on volatility and drawdown.
3. Increase stop loss module and set reasonable moving stop loss.
4. Increase machine learning algorithms to assist in judging inflection points.

## Conclusion

This strategy integrates the 123 reversal strategy and the rainbow oscillator indicator to achieve double trend tracking. While maintaining high stability, it has potential for excess returns. Further optimization can be done to improve the profitability of the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Rainbow Oscillator ----|
|v_input_7|2|LengthRO|
|v_input_8|10|HHV/LLV Lookback|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/05/2021
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
// Ever since the people concluded that stock market price movements are not 
// random or chaotic, but follow specific trends that can be forecasted, they 
// tried to develop different tools or procedures that could help them identify 
// those trends. And one of those financial indicators is the Rainbow Oscillator 
// Indicator. The Rainbow Oscillator Indicator is relatively new, originally 
// introduced in 1997, and it is used to forecast the changes of trend direction.
// As market prices go up and down, the oscillator appears as a direction of the 
// trend, but also as the safety of the market and the depth of that trend. As 
// the rainbow grows in width, the current trend gives signs of continuity, and 
// if the value of the oscillator goes beyond 80, the market becomes more and more 
// unstable, being prone to a sudden reversal. When prices move towards the rainbow 
// and the oscillator becomes more and more flat, the market tends to remain more 
// stable and the bandwidth decreases. Still, if the oscillator value goes below 20, 
// the market is again, prone to sudden reversals. The safest bandwidth value where 
// the market is stable is between 20 and 80, in the Rainbow Oscillator indicator value. 
// The depth a certain price has on a chart and into the rainbow can be used to judge 
// the strength of the move.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos


RO(Length, LengthHHLL) =>
    pos = 0.0
    xMA1 = sma(close, Length)
    xMA2 = sma(xMA1, Length)
    xMA3 = sma(xMA2, Length)
    xMA4 = sma(xMA3, Length)
    xMA5 = sma(xMA4, Length)
    xMA6 = sma(xMA5, Length)
    xMA7 = sma(xMA6, Length)
    xMA8 = sma(xMA7, Length)
    xMA9 = sma(xMA8, Length)
    xMA10 = sma(xMA9, Length)
    xHH = highest(close, LengthHHLL)
    xLL = lowest(close, LengthHHLL)
    xHHMAs = max(xMA1,max(xMA2,max(xMA3,max(xMA4,max(xMA5,max(xMA6,max(xMA7,max(xMA8,max(xMA9,xMA10)))))))))
    xLLMAs = min(xMA1,min(xMA2,min(xMA3,min(xMA4,min(xMA5,min(xMA6,min(xMA7,min(xMA8,min(xMA9,xMA10)))))))))
    xRBO = 100 * ((close - ((xMA1+xMA2+xMA3+xMA4+xMA5+xMA6+xMA7+xMA8+xMA9+xMA10) / 10)) / (xHH - xLL))
    xRB = 100 * ((xHHMAs - xLLMAs) / (xHH - xLL))
    pos:= iff(xRBO > 0, 1,
           iff(xRBO < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Rainbow Oscillator", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Rainbow Oscillator ----")
LengthRO = input(2, minval=1)
LengthHHLL = input(10, minval=2, title="HHV/LLV Lookback")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posRO = RO(LengthRO, LengthHHLL)
pos = iff(posReversal123 == 1 and posRO == 1 , 1,
	   iff(posReversal123 == -1 and posRO == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/442947

> Last Modified

2024-02-27 15:54:24
