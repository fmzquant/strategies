
> Name

基于形态反转和MACD指标的组合交易策略Combo-Trading-Strategy-Based-on-123-Reversal-and-MACD

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是将123形态反转和MACD指标进行组合,实现较强的交易信号过滤。其中123形态反转捕捉短期反转机会,而MACD提供中长期趋势判断。组合信号可有效发现高概率交易点位。

## 策略原理

1. 123形态反转策略,判断前两日下跌且今日收盘价上涨,并Stochastic指标低于阈值时买入;两日上涨今日下跌,Stochastic高于阈值时卖出。

2. MACD指标策略,快线高于慢线时做多,快线低于慢线时做空。

3. 只有当两策略信号一致时,才进行交易,否则不交易。可切换正向反向交易。

## 优势分析

该策略主要具有以下优势:

1. 组合信号可有效过滤假突破,提高胜率。

2. 123形态可捕捉短期反转机会,MACD判断中长线趋势方向。

3. Stochastic指标结合123形态可避免趋势反转后的过度交易。

4. 两策略分担不同交易任务,可互相验证,降低单一策略过优化风险。

5. 可方便切换做多做空方向,适应多种市场环境。

## 风险分析

该策略主要风险:

1. 组合信号过于保守,可能错过较好机会。

2. 反转形态易受突发事件影响,出现失效。

3. 未考虑止损机制,存在大额亏损风险。

4. 双重过滤信号可能错过趋势机会。

5. 未考虑参数优化,默认参数不一定适合所有品种。

## 优化方向 

可从以下方面进行优化:

1. 测试不同参数组合,寻找最优参数。

2. 增加止损策略,控制单笔亏损。

3. 加入更多过滤指标,提高信号质量。

4. 增加机器学习模型,实现参数自动优化。

5. 在更多交易品种中测试,评估策略稳定性。

6. 根据市场环境切换参数组合。

## 总结

该策略整体来说,通过组合双重信号可有效避免单一策略过优化问题。加入更多过滤指标、止损机制等改进后,可以成为一个较为稳健实用的量化交易策略。

||


## Overview

This strategy combines 123 reversal patterns and MACD indicators to generate stronger trade signals through filtering. 123 reversals capture short-term reversal opportunities while MACD provides mid-long term trend guidance. The combo signal can effectively discover high probability trade setups.

## Strategy Logic

1. 123 reversal strategy buys when the last two days were down days and today's close is up, with Stochastic below threshold; sells when last two days were up days and today is down, with Stochastic above threshold.

2. MACD strategy goes long when fast MA is above slow MA, and short when fast MA is below slow MA.

3. Trades are taken only when both strategies agree, otherwise no action is taken. Trade direction can be switched.

## Advantage Analysis

Main advantages:

1. Combo signal effectively filters false breakouts, improving win rate.

2. 123 captures short-term reversals, MACD judges mid-long term trend direction.

3. Stochastic with 123 avoids over-trading after trend reversal.

4. Two strategies share different tasks, mutually validating, avoiding over-optimization. 

5. Easily switch between long/short, adaptable to various market environments.

## Risk Analysis

Main risks:

1. Combo signal may be too conservative, missing good opportunities.

2. Reversals are susceptible to sudden events, prone to failure.

3. Lack of stop loss exposes strategy to large losses.

4. Double filtering may cause missing trend trades. 

5. Lack of parameter optimization, default values may not fit all instruments.

## Optimization Directions

Improvements:

1. Test different parameter combinations to find optimal values.

2. Add stop loss to control loss per trade.

3. Incorporate more filter indicators to improve signal quality.

4. Introduce machine learning models for automatic parameter optimization.

5. Test across more trading instruments to evaluate robustness.

6. Switch parameter sets based on market conditions.

## Summary

Overall, combining dual signals avoids over-optimization compared to single strategies. With additions like more filters, stop losses and so on, it can become a robust and practical quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|r|
|v_input_6|21|LengthMACD|
|v_input_7|5|SmthLen|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-14 02:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 24/07/2020
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
// This is one of the techniques described by William Blau in his book
// "Momentum, Direction and Divergence" (1995). If you like to learn more,
// we advise you to read this book. His book focuses on three key aspects
// of trading: momentum, direction and divergence. Blau, who was an electrical
// engineer before becoming a trader, thoroughly examines the relationship 
// between price and momentum in step-by-step examples. From this grounding,
// he then looks at the deficiencies in other oscillators and introduces some
// innovative techniques, including a fresh twist on Stochastics. On directional 
// issues, he analyzes the intricacies of ADX and offers a unique approach to help 
// define trending and non-trending periods.
// Blau`s indicator is like usual MACD, but it plots opposite of meaningof
// stndard MACD indicator.  
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

fADX(Len) =>
    up = change(high)
    down = -change(low)
    trur = rma(tr, Len)
    plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, Len) / trur)
    minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, Len) / trur)
    sum = plus + minus 
    100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), Len)

EMACD(r,SmthLen,LengthMACD) =>
    pos = 0
    source = close
    fastMA = ema(source, r)
    slowMA = ema(source, LengthMACD)
    xmacd = fastMA - slowMA
    xMA_MACD = ema(xmacd, SmthLen)
    pos := iff(xmacd < xMA_MACD, -1,
    	     iff(xmacd > xMA_MACD, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Ergodic MACD", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
r = input(14, minval=1)
LengthMACD = input(21, minval=1)
SmthLen = input(5, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posEMACD = EMACD(r,SmthLen,LengthMACD)
pos = iff(posReversal123 == 1 and posEMACD == 1 , 1,
	   iff(posReversal123 == -1 and posEMACD == -1, -1, 0)) 
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

https://www.fmz.com/strategy/427281

> Last Modified

2023-09-19 17:17:30
