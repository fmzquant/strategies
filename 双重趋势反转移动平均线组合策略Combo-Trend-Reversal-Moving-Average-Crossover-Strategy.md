
> Name

双重趋势反转移动平均线组合策略Combo-Trend-Reversal-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15a9804b4e882693d9a.png)

[trans]

## 概述

本策略是一种双重趋势反转移动平均线组合策略。它结合了123反转策略和比尔威廉姆斯平均线策略,利用两种策略的信号进行组合,以获取更准确的交易信号。

## 策略原理

该策略由两部分组成:

1. 123反转策略:当收盘价连续两天高于上一天的收盘价,且9日慢速K线低于50时做多;当收盘价连续两天低于上一天的收盘价,且9日快速K线高于50时做空。

2. 比尔威廉姆斯平均线策略:计算13日、8日和5日的中价移动平均线,当短期移动平均线上穿中长期移动平均线时做多;当短期移动平均线下穿中长期移动平均线时做空。

最后,如果两种策略的信号方向一致则产生实际的交易信号,如果不一致则不交易。

## 优势分析

该策略结合双重趋势判断,可以减少假信号,提高信号准确性。另外,移动平均线的加入也可以过滤掉部分噪音。

## 风险分析

该策略存在以下风险:

1. 双重筛选信号可能导致错过较好的交易机会
2. 移动平均线组合设置不当可能误判市场趋势
3. 反转策略本身即具有亏损风险

可以通过调整移动平均线参数或优化入场退出逻辑来降低风险。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 测试不同参数的移动平均线组合,找到最佳参数
2. 增加止损策略避免大额亏损
3. 结合成交量指标识别信号质量
4. 利用机器学习方法自动优化参数

## 总结

本策略整合双重趋势判断与移动平均线指标,可以有效过滤噪音信号,提高交易决策准确性。但也存在一定风险,需要不断测试与优化入场退出逻辑,才能在实盘中稳定盈利。

||

## Overview

This is a combo strategy that combines trend reversal and moving average crossover strategies to generate more accurate trading signals. 

## Strategy Logic

The strategy consists of two parts:

1. 123 Reversal Strategy: Go long when close price rises for 2 consecutive days and 9-day slow stochastic is below 50; Go short when close price falls for 2 consecutive days and 9-day fast stochastic is above 50.

2. Bill Williams Average Strategy: Calculate 13, 8 and 5 days median price moving averages and go long when faster MAs cross above slower MAs; Go short when faster MAs cross below slower MAs.  

Finally, an actual trading signal is generated only when both strategies agree on the direction; otherwise no trade.

## Advantage Analysis  

The combo strategy filters noise using dual trend validations, thus improving signal accuracy. Additionally, moving averages filter out some noise.

## Risk Analysis

Risks are:

1. Dual filter may miss some good trades  
2. Wrong MA settings may incorrectly judge trends
3. Reversal strategies itself have loss risks

Risks can be reduced by optimizing MA parameters or entry/exit logic.

## Optimization Directions

The strategy can be optimized by:

1. Testing different MA combinations to find optimal parameters  
2. Adding stop loss to limit losses
3. Incorporating volume to identify signal quality 
4. Using machine learning to auto optimize

## Conclusion

This strategy combines dual trend filters and MAs to effectively filter noises and improve decision accuracy. But risks exist, which need continuous optimization of logic before stable profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|13|LLength|
|v_input_6|8|MLength|
|v_input_7|5|SLength|
|v_input_8|8|LOffset|
|v_input_9|5|MOffset|
|v_input_10|3|SOffset|
|v_input_11|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-28 00:00:00
end: 2023-11-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/06/2019
// This is combo strategies for get 
// a cumulative signal. Result signal will return 1 if two strategies 
// is long, -1 if all strategies is short and 0 if signals of strategies is not equal.
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
// This indicator calculates 3 Moving Averages for default values of
// 13, 8 and 5 days, with displacement 8, 5 and 3 days: Median Price (High+Low/2).
// The most popular method of interpreting a moving average is to compare 
// the relationship between a moving average of the security's price with 
// the security's price itself (or between several moving averages).
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

BillWilliamsAverages(LLength, MLength,SLength, LOffset,MOffset, SOffset ) =>
    xLSma = sma(hl2, LLength)[LOffset]
    xMSma = sma(hl2, MLength)[MOffset]
    xSSma = sma(hl2, SLength)[SOffset]
    pos = 0
    pos := iff(close < xSSma and xSSma < xMSma and xMSma < xLSma, -1,
    	   iff(close > xSSma and xSSma > xMSma and xMSma > xLSma, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Bill Williams Averages. 3Lines", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LLength = input(13, minval=1)
MLength = input(8,minval=1)
SLength = input(5,minval=1)
LOffset = input(8,minval=1)
MOffset = input(5,minval=1)
SOffset = input(3,minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posBillWilliamsAverages = BillWilliamsAverages(LLength, MLength,SLength, LOffset, MOffset, SOffset)
pos = iff(posReversal123 == 1 and posBillWilliamsAverages == 1 , 1,
	   iff(posReversal123 == -1 and posBillWilliamsAverages == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
```

> Detail

https://www.fmz.com/strategy/433540

> Last Modified

2023-11-28 13:47:05
