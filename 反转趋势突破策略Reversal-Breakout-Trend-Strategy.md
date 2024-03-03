
> Name

反转趋势突破策略Reversal-Breakout-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

反转趋势突破策略是一个组合策略,它结合了反转策略和突破策略的优点,旨在在趋势反转点发出交易信号。该策略首先判断价格是否出现连续两天反转形态,同时指标Stochastic Oscillator是否发出反转信号,如果符合则产生买入或卖出信号。与此同时,该策略还会判断价格是否突破指定周期内的最高价或最低价,如果同时满足反转和突破条件,则产生交易信号。

## 策略原理

该策略由两部分组成:

1. 反转部分

判断价格连续两天出现反转(第2天收盘价高于第1天,Stochastic快线低于慢线时买入;第2天收盘价低于第1天,快线高于慢线时卖出)。

2. 突破部分 

判断价格是否突破look_bak周期内的最高价(若突破最高价则买入)。

当反转部分和突破部分信号同向时(比如反转显示买入信号,突破也显示买入信号),则产生实际的买入或卖出信号。

## 策略优势

这种组合策略结合反转和趋势突破两种交易策略的优点,可以在趋势转折点更准确地捕捉信号。

1. 反转部分可以在价格反转时发出信号,适合捕捉转折点。

2. 突破部分确保交易信号的方向与趋势一致,避免交易错误方向。

3. 两部分同向发出信号时,可产生更可靠的交易机会。

4. Stochastic指标的应用避免了仅凭价格形态判断的主观性。

## 风险及优化

该策略也存在一些风险需要注意:

1. 反转信号可能是假突破,无法确定反转趋势已确立。 may optimize it by:

2. 突破信号可能是错觉突破,无法判断趋势已经开始。

3. 两部分指标参数设置不当可能导致错失交易机会。

4. 交易频率可能过高,可适当调整参数以控制交易次数。

对应优化措施:

1. 优化反转指标参数,确保反转信号更可靠。

2. 优化突破参数,避免错觉突破。

3. 调整反转和突破部分的参数设置,找到最佳匹配。

4. 适当调整交易频率,防止过于频繁交易。

## 总结

反转趋势突破策略综合运用反转和趋势突破策略的优势,在价格转折点可靠发出交易信号。通过参数优化,可在控制交易频率的同时,提高信号质量,捕捉可靠的交易机会。该策略整体较为稳健,但需要注意防止假突破和错觉突破带来的风险。

[/trans]


## Overview

The Reversal Breakout Trend strategy is a combo strategy that combines the advantages of reversal and breakout strategies to generate trading signals at trend reversal points. It first judges if prices reverse during two consecutive days and if the Stochastic Oscillator gives reversal signals. At the same time, it also checks if prices break through the highest/lowest prices over a certain period. When reversal and breakout conditions are met, trading signals are generated.

## Strategy Logic 

The strategy consists of two parts:

1. Reversal Part

It judges if prices reverse during two consecutive days (buy when close of day 2 is higher than day 1 and Stochastic fast line is lower than slow line; sell when close of day 2 is lower than day 1 and fast line is higher than slow line).

2. Breakout Part

It judges if prices break through the highest price over the look_bak period (buy if price breaks through the highest price).

When reversal and breakout parts give signals in the same direction (e.g. reversal shows buy and breakout shows buy), actual buy/sell signals are generated.

## Advantages

This combo strategy combines the pros of reversal and trend breakout strategies and can more accurately capture signals at trend turning points:

1. The reversal part can generate signals when prices reverse, suitable to catch turning points.

2. The breakout part ensures trade direction is aligned with the trend, avoiding trading in wrong direction.

3. Signals in the same direction from both parts create more reliable trading opportunities. 

4. The application of Stochastic avoids the subjectivity of judging by price pattern alone.

## Risks and Optimization

There are also some risks to note:

1. Reversal signals may be false breakouts, unable to confirm the reversal trend has established.

2. Breakout signals may be false breakouts, unable to judge the trend has started. 

3. Improper parameter settings of the two parts may lead to missing trades.

4. High trading frequency may occur and needs to be controlled.

Possible optimizations:

1. Optimize parameters of reversal indicators to ensure reversal signals are more reliable.

2. Optimize breakout parameters to avoid false breakouts.  

3. Adjust parameters of both parts to find the optimal match.

4. Moderate the trading frequency to prevent over-trading.

## Summary 

The Reversal Breakout Trend strategy leverages the strengths of reversal and trend breakout strategies and reliably generates trading signals at turning points. Through parameter optimization, it can improve signal quality and capture solid trading opportunities while controlling trading frequency. Overall this strategy is robust but false breakouts remain a risk to watch out for. Proper optimization and parameter tuning is key.

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
start: 2023-09-29 00:00:00
end: 2023-10-06 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 26/06/2019
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
//    Breakout Range Long Strategy
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

BreakoutRangeLong(look_bak) =>
    pos = 0
    xHighest = highest(high, look_bak)
    pos := iff(high > xHighest[1], 1, 0) 
    pos

strategy(title="Combo Backtest 123 Reversal & Breakout Range Long", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
look_bak = input(4, minval=1, title="Look Bak")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posBreakoutRangeLong = BreakoutRangeLong(look_bak)
pos = iff(posReversal123 == 1 and posBreakoutRangeLong == 1 , 1,
	   iff(posReversal123 == -1 and posBreakoutRangeLong == -1, -1, 0)) 
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

https://www.fmz.com/strategy/428626

> Last Modified

2023-10-07 16:15:43
