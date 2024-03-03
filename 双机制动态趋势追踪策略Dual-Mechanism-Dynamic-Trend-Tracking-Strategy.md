
> Name

双机制动态趋势追踪策略Dual-Mechanism-Dynamic-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/144204ead13ae3b34fc.png)
[trans]
## 概述

双机制动态趋势追踪策略是一种组合两种不同交易策略信号的趋势追踪策略。该策略首先利用123反转策略判断价格反转点,然后结合去趋势合成价格(D_DSP)指数判断价格趋势方向,最后综合两种信号产生交易指令。

该策略主要用于中短期趋势追踪,通过双重机制设定动态止损点,能够有效锁定盈利,避免亏损扩大。同时,结合趋势指标和反转指标双重确认,可以减少噪音交易。

## 策略原理

### 123反转策略

123反转策略源自Ulf Jensen的《我如何在期货市场翻三番的资金》一书第183页。该策略判断价格是否出现连续两个BAR反转形态构成价格反转信号。

具体逻辑是,如果收盘价低于前一日收盘价,且慢速K线低于50时产生买入信号;如果收盘价高于前一日收盘价,且快速K线高于50时产生卖出信号。

### 去趋势合成价格指数

去趋势合成价格指数(D_DSP)是一种用来判断价格趋势方向的指标,该指标与实际价格周期变化保持一致。D_DSP的计算方法是,用价格的1/4周期指数移动平均线减去1/2周期指数移动平均线。

如果D_DSP为正,代表价格处于上升趋势;如果D_DSP为负,代表价格处于下降趋势。

### 双重机制判断

该策略通过组合123反转策略和D_DSP指数两种判断机制,如果两种信号同向(如双多或双空),则产生trades指令;如果信号不一致,则清仓。

这种双重确认机制可以有效过滤噪音交易,锁定趋势获利。

## 优势分析

双机制动态趋势追踪策略最大的优势在于设置了两个层面的止损点。首先在时间维度上,快慢随机指标的差值形成一种时间错位的止损;其次在价格维度,反转策略本身包含一定的止损功能。

这两层止损可以最大程度锁定盈利,防止单一止损策略的死叉盈亏。此外,双重确认机制也可有效过滤非主流方向性价格变动引发的错误信号。

## 风险分析

该策略最大的风险在于参数设置过于死板。比如周期长度设置不当可能错过主流趋势,从而错过获利机会或增加亏损;双重确认设定过于死板也可能错过及时止损。

此外,反转策略与趋势策略组合时,两者判断不一致的情况下清仓的操作也可能错过后续趋势继续向一个主流方向运行的机会。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 周期参数优化。通过更多回测数据计算出参数最优值,设置更合适的周期参数。

2. 增加止损策略。比如突破止损,追踪止损等,设置更动态更合理的止损点。

3. 判断规则优化。调整双重确认判断的灵敏度,防止过于激进清仓错失良机。

4. 增加过滤器。设置价格震荡过滤,避免趋势末期均线差值震荡误判信号。

## 总结

双机制动态趋势追踪策略通过快慢随机指标双重止损和反转与趋势判断双重确认,实现了有效的趋势追踪和风险控制。该策略既考虑了价格行情的时间因素,也考虑了价格本身的方向性,形成了立体化的决策依据。

通过不断优化判断规则和参数设置,预计该策略可以获得较好的效果。但交易策略优化需要大量历史数据测试支持,选股策略和止损策略也需要持续完善。建议实盘跟踪观察一段时间,进一步检验策略效果。

||

## Overview

The Dual-Mechanism Dynamic Trend Tracking strategy combines signals from two different trading strategies to track trends. It first uses the 123 Reversal strategy to identify price reversal points, then uses the Detrended Synthetic Price (D_DSP) index to determine price trend direction, and finally generates trading signals by combining both signals.

This strategy is mainly used for medium-term trend tracking. By setting dynamic stop-loss points through dual mechanisms, it can effectively lock in profits and avoid losses from expanding. Meanwhile, combining trend and reversal indicators for dual confirmation helps reduce noisy trades.

## Strategy Logic

### 123 Reversal Strategy 

The 123 Reversal strategy originates from page 183 of Ulf Jensen's book "How I Tripled My Money in the Futures Market". It identifies price reversal patterns using two consecutive reversal bars.

Specifically, it generates a buy signal when the close price is higher than the previous close for two consecutive days and the 9-day Slow Stochastic Oscillator is below 50. It generates a sell signal when the close price is lower than the previous close for two consecutive days and the Fast Stochastic Oscillator is above 50.

### Detrended Synthetic Price Index

The Detrended Synthetic Price (D_DSP) index indicates the price trend direction and is in phase with the dominant cycle of the actual price data. The D_DSP is calculated by subtracting a half-cycle exponential moving average (EMA) from the quarter-cycle EMA of price.

If D_DSP is positive, it indicates an upward price trend. If negative, it indicates a downward price trend.

### Dual Mechanism

This strategy combines the 123 Reversal strategy and D_DSP index signals. If both signals agree (both long or short), trades will be generated. If signals disagree, positions will be closed.

This dual confirmation filters out noise and locks in trend profits.

## Advantages

The biggest advantage of this strategy is the two levels of stop loss it implements. Firstly, the fast and slow Stochastics form a time-staggered stop loss. Secondly, the reversal strategy itself contains a stop loss feature.  

The two stop losses maximize profit locking and prevent crossover losses from a single stop loss strategy. Also, the dual confirmation avoids wrong signals from non-mainstream price changes.

## Risks 

The biggest risk comes from inflexible parameter settings. For example, wrong cycle lengths may cause missing mainstream trends, losing profits or increasing losses. Overly rigid dual confirmation may also cause missed timely stop losses.

Also, when combining reversal and trend strategies, clearing positions when signals disagree may miss opportunities when the trend continues in one mainstream direction.

## Optimization

This strategy can be optimized in several ways:

1. Optimize cycle parameters using more backtesting data to find optimal values.

2. Add more stop loss strategies like breakout or trailing stop loss to set more dynamic and reasonable stop loss points.

3. Fine tune the dual confirmation rules to prevent over-clearing positions. 

4. Add filters like volatility filters to avoid misjudgments from late-stage trend volatility.

## Conclusion

The Dual-Mechanism Dynamic Trend Tracking Strategy implements effective trend tracking and risk control through dual stop losses of fast and slow Stochastics and dual confirmation of reversal and trend signals. It considers both the time dimension of price action as well as the direction itself to form a multidimensional decision basis.

Continuous optimization of rules and parameters is expected to yield good results. But strategy optimization requires large amounts of historical data. Stock selection filters and stop loss mechanisms also need continuous refinement. Real-time tracking for some period is recommended to further validate the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|LengthDSP|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-31 00:00:00
end: 2024-01-30 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/11/2019
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
// Detrended Synthetic Price is a function that is in phase with the 
// dominant cycle of real price data. This DSP is computed by subtracting 
// a half-cycle exponential moving average (EMA) from the quarter cycle 
// exponential moving average.
// See "MESA and Trading Market Cycles" by John Ehlers pages 64 - 70. 
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

D_DSP(Length) =>
    pos = 0.0
    xHL2 = hl2
    xEMA1 = ema(xHL2, Length)
    xEMA2 = ema(xHL2, 2 * Length)
    xEMA1_EMA2 = xEMA1 - xEMA2
    pos := iff(xEMA1_EMA2 > 0, 1,
             iff(xEMA1_EMA2 < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & D_DSP (Detrended Synthetic Price)", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthDSP = input(14, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posD_DSP = D_DSP(LengthDSP)
pos = iff(posReversal123 == 1 and posD_DSP == 1 , 1,
	   iff(posReversal123 == -1 and posD_DSP == -1, -1, 0)) 
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

https://www.fmz.com/strategy/440511

> Last Modified

2024-01-31 11:13:44
