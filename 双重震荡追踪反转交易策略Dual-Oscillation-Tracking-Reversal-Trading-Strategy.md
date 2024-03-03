
> Name

双重震荡追踪反转交易策略Dual-Oscillation-Tracking-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是一种双重震荡追踪反转交易策略,它综合运用随机指标反转策略和某耶肯波动率指标,以获取更可靠的交易信号。该策略旨在在趋势反转点捕捉利润,适用于中长线交易。

## 策略原理

该策略由两部分组成:

1. 随机指标反转策略

该部分运用随机指标的快线和慢线生成交易信号。当收盘价连续两日低于上一日收盘价,且快线高于慢线时做多;当收盘价连续两日高于上一日收盘价,且快线低于慢线时做空。

2. 某耶肯波动率指标

该指标计算一段时间内的最高价和最低价之差的变化情况。当该差值扩大时,表示波动率上升,可做空;当差值缩小时,表示波动率下降,可做多。

最终交易信号为两部分信号的综合。当随机指标信号和波动率指标信号一致时,采取该信号;若两信号不一致,则不交易。

## 优势分析

该策略具有以下优势:

1. 综合运用两种不同类型指标,可提高信号准确率。

2. 采用双重确认机制,可减少假信号,控制风险。

3. 以反转为主要交易方向,可在趋势转换点获利。

4. 参数设置灵活,可调整至适合不同品种和周期。

5. 可细调指标参数,达到最佳状况。

## 风险分析

该策略也存在以下风险:

1. 反转信号可能出现误判,从而形成损失。可适当调整参数以减少误判概率。

2. 波动率急剧扩大时,做空方向存在亏损风险。可设置止损以控制风险。

3. 行情剧烈波动时,双重指标组合可能失效。此时可考虑暂停交易,等待指标重新稳定。

4. 需要同时监控两个指标,增加了交易者的工作量。可编制自动交易程序降低工作量。

## 优化方向

该策略可从以下方面进行优化:

1. 测试更多参数组合,寻找最佳参数。

2. 增加其他确认指标,如量价指标等,形成多重确认。 

3. 加入止损机制,如随动止损、区间止损等,进一步控制风险。

4. 优化资金管理策略,如固定份额、Kelly等,提高盈利效率。

5. 不同品种和周期参数设置不同,可以测试更多品种和周期的适用性。

## 总结

该策略综合运用双重指标形成交易信号,以捕捉市场反转为主要交易方向。具有信号准确率高、风险控制好等优势,也存在一定的改进空间。通过参数优化、止损以及资金管理等方面的改进,可以将该策略优化成一个较强的中长线反转交易策略。

||


## Overview

This is a dual oscillation tracking reversal trading strategy that combines the stochastic indicator reversal strategy and the Chaikin volatility indicator to obtain more reliable trading signals. The strategy aims to capture profits at trend reversal points and is suitable for medium-to-long term trading.

## Strategy Logic

The strategy consists of two parts:

1. Stochastic Indicator Reversal Strategy

This part uses the fast line and slow line of the stochastic indicator to generate trading signals. It goes long when the closing price is lower than the previous closing price for two consecutive days and the fast line is above the slow line. It goes short when the closing price is higher than the previous closing price for two consecutive days and the fast line is below the slow line.

2. Chaikin Volatility Indicator 

This indicator calculates the change in the spread between the highest and lowest prices over a period of time. When the spread widens, it signals increasing volatility and a short position can be taken. When the spread narrows, it signals decreasing volatility and a long position can be taken.

The final trading signal is a combination of the signals from the two parts. When the stochastic indicator signal and volatility indicator signal agree, that signal is taken. Otherwise, no trade is taken if the two signals disagree.

## Advantage Analysis

The advantages of this strategy include:

1. Combining two different types of indicators improves signal accuracy.

2. The dual confirmation mechanism reduces false signals and controls risk. 

3. Focusing on reversals as the main trading direction allows profits at trend turning points.

4. Flexible parameter settings make it adaptable to different products and timeframes.

5. Fine tuning of indicator parameters allows optimization.

## Risk Analysis

The risks of this strategy include:

1. Reversal signals may be wrongly judged, leading to losses. Adjusting parameters can reduce misjudgement probability.

2. Shorting during sharply rising volatility has loss risks. Stop loss can control the risk.

3. The dual indicator combo may fail during extreme market swings. Consider pausing trading until indicators stabilize.

4. Monitoring two indicators increases workload. Automated trading can reduce workload.

## Improvement Directions

Improvements for this strategy include:

1. Test more parameter combinations to find optimal parameters.

2. Add other confirming indicators like volume etc. to create multiple confirmation.

3. Add stop loss mechanisms like trailing stop, zone stop etc. to further control risk.

4. Optimize money management like fixed fractional, Kelly etc. to improve profit efficiency. 

5. Test applicability across more products and timeframes with different parameter settings.

## Conclusion

This strategy combines dual indicators for trading signals, with a focus on capturing reversals. It has advantages like high signal accuracy and good risk control, and has room for improvements. With optimizations to parameters, stop loss, money management etc., it can be enhanced into a robust medium-to-long term reversal trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|10|LengthCV|
|v_input_6|12|ROCLength|
|v_input_7|false|Trigger|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 29/07/2019
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
// Chaikin's Volatility indicator compares the spread between a security's
// high and low prices. It quantifies volatility as a widening of the range
// between the high and the low price.
// You can use in the xPrice1 and xPrice2 any series: Open, High, Low, Close, HL2,
// HLC3, OHLC4 and ect...
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

ChaikinVolatility(Length, ROCLength, Trigger) =>
    pos = 0
    xPrice1 = high
    xPrice2 = low
    xPrice = xPrice1 - xPrice2
    xROC_EMA = roc(ema(xPrice, Length), ROCLength)
    pos := iff(xROC_EMA < Trigger, 1,
	         iff(xROC_EMA > Trigger, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Chaikin Volatility", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthCV = input(10, minval=1)
ROCLength = input(12, minval=1)
Trigger = input(0, minval=0)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posChaikinVolatility = ChaikinVolatility(LengthCV, ROCLength, Trigger)
pos = iff(posReversal123 == 1 and posChaikinVolatility == 1 , 1,
	   iff(posReversal123 == -1 and posChaikinVolatility == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/428968

> Last Modified

2023-10-11 14:47:25
