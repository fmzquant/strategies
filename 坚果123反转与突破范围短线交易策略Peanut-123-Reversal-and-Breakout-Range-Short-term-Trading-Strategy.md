
> Name

坚果123反转与突破范围短线交易策略Peanut-123-Reversal-and-Breakout-Range-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1908c591795a174bedc.png)
 [trans]
## 概述
坚果123反转与突破范围短线交易策略是一种组合策略, 它集成了反转策略和突破策略两个子策略的信号,从而产生更强劲的交易信号.

## 策略原理

该策略由两个子策略组成:

1. 坚果123反转策略

    它是根据Ulf Jensen的书中P183所介绍的系统改编的反转策略. 当收盘价连续2日高于前一日收盘价,且9日Stochastic慢线低于50时做多; 当收盘价连续2日低于前一日收盘价,且9日Stochastic快线高于50时做空.

2. 突破范围短线策略

    它是突破特定周期内最低价作为信号的短线策略. 当价格突破look_bak周期内的最低价时做空. 

该组合策略综合考虑两个子策略的信号, 当两个子策略同时发出同向信号时, 产生该方向的交易信号; 当两个子策略发出相反信号时, 并不产生实际的交易信号.

## 优势分析

该策略结合反转策略和突破策略两个子策略的优点, 综合考虑更多因素, 可以过滤掉一些噪音交易, 提高交易胜率.

1. 反转策略可以捕捉短期反转机会, 在涨跌调整过程中获利. 

2. 突破策略可以抓住突破后的短线走势.

3. 组合考虑两个子策略的信号, 可以发出更有效的交易信号, 过滤噪音.

## 风险分析

该策略也存在以下风险:  

1. 反转不一定发生, 存在反转失败的风险. 

2. 突破也可能是假突破, 存在追高跌低的风险.

3. 两个子策略都不能保证单独使用时就有效, 组合使用也可能失败.

针对上述风险, 可以通过优化参数,调整子策略的使用比例, 选择不同的标的进行套利等方法来降低风险.

## 优化方向  

该策略还有进一步优化的空间:

1. 优化两个子策略的参数, 使其更好地适应不同周期和不同标的.

2. 增加其他类型的子策略, 如机器学习预测策略, 整合更多因素. 

3. 动态调整两个子策略的使用权重, 在不同市场环境下,让表现更好的子策略发挥更大作用.

4. 进行组合套利,选择相关性不强又存在一定共性的不同标的进行交易.

## 总结

坚果123反转与突破范围短线交易策略通过集成反转策略和突破策略,进行了策略层面的组合,在一定程度上综合了两个子策略的优势,也存在可以进一步优化的空间. 它为我们提供了策略设计的新的思路,即在保留子策略独立性的基础上,进行策略层面的集成与组合,发掘更有效的交易机会.

||

## Overview

The Peanut 123 Reversal and Breakout Range Short-term Trading Strategy is a combination strategy that incorporates the signals from a reversal strategy and a breakout strategy sub-strategies to generate more powerful trading signals.

## Strategy Logic

The strategy consists of two sub-strategies:

1. Peanut 123 Reversal Strategy

    It is an adapted reversal strategy based on the system introduced on P183 of Ulf Jensen's book. It goes long when the close price rises for 2 consecutive days and the 9-day Stochastic Slow line is below 50; It goes short when the close price falls for 2 consecutive days and the 9-day Stochastic Fast line is above 50. 

2. Breakout Range Short Strategy  

    It is a short-term strategy that uses the breakout of the lowest price in a certain look_bak period as the signal. It goes short when the price breaks below the lowest low in the look_bak period.

The combination strategy takes into account the signals from both sub-strategies. It generates actual trading signals only when the two sub-strategies give signals in the same direction. No trading signals will be generated if the two sub-strategies give opposite signals.  

## Advantage Analysis

The strategy combines the advantages of both reversal and breakout sub-strategies and considers more factors. It can filter out some noise trades and improve win rate.

1. The reversal strategy captures short-term reversal opportunities and makes profit during fluctuations.

2. The breakout strategy catches the short-term trend after the breakout. 

3. By combining the signals of two sub-strategies, more effective trading signals can be generated and noise can be filtered out.

## Risk Analysis

The strategy also has the following risks:

1. Reversals may not happen, there are risks of failed reversals.

2. Breakouts can also be false breakouts, there are risks of chasing highs and lows.  

3. Neither of the sub-strategies can ensure effectiveness when used alone, combining them may also fail.

To address these risks, methods like optimizing parameters, adjusting the weighting of sub-strategies, choosing different products for arbitrage can be used to reduce risks.

## Optimization Directions   

There is room for further optimization of the strategy:

1. Optimize the parameters of the two sub-strategies to better adapt to different cycles and different products.

2. Increase other types of sub-strategies, such as machine learning prediction strategies, to incorporate more factors.

3. Dynamically adjust the weighting of the two sub-strategies to give more weight to the better-performed one in different market environments. 

4. Conduct combination arbitrage by selecting products with little correlation but certain commonality.

## Summary  

The Peanut 123 Reversal and Breakout Range Short-term Trading Strategy integrates the reversal and breakout sub-strategies at the strategy level. To some extent, it combines the advantages of the two sub-strategies while having space for further optimization. It provides new ideas for strategy design - conducting integration and combination at the strategy level while preserving the independence of sub-strategies, in order to discover more effective trading opportunities.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|4|Look Bak|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 01/07/2019
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
//    Breakout Range Short Strategy
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

BreakoutRangeShort(look_bak) =>
    pos = 0
    xLowest = lowest(low, look_bak)
    pos :=	iff(low < xLowest[1], -1, 0) 
    pos

strategy(title="Combo Backtest 123 Reversal & Breakout Range Short", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
look_bak = input(4, minval=1, title="Look Bak")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posBreakoutRangeShort = BreakoutRangeShort(look_bak)
pos = iff(posReversal123 == 1 and posBreakoutRangeShort == 1 , 1,
	   iff(posReversal123 == -1 and posBreakoutRangeShort == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? color.red: possig == 1 ? color.green : color.blue )
```

> Detail

https://www.fmz.com/strategy/440369

> Last Modified

2024-01-29 16:31:04
