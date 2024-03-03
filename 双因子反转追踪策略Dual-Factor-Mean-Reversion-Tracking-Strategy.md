
> Name

双因子反转追踪策略Dual-Factor-Mean-Reversion-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/164b5b87d3a85696887.png)

[trans]

## 概述

本策略属于量化交易领域中的双因子反转追踪策略。它整合了123反转策略和Keltner通道策略两个因子,目标是发现反转信号,实现低买高卖的交易思路。

## 策略原理

该策略由两个子策略组成。第一个子策略是123反转策略,它通过计算前两个交易日的收盘价变化,结合Stochastic指标判断市场是否处于反转点。具体来说,当连续两日收盘价上涨,同时Stochastic指标低于50时,发出买入信号;当连续两日收盘价下跌,同时Stochastic指标高于50时,发出卖出信号。

第二个子策略是Keltner通道策略。该策略计算最近n个交易日的典型价格均线及波动范围,当价格接近上下轨时,发出反转交易信号。价格低于下轨时看空,高于上轨时看多。

最后,该策略通过判断两个子策略的信号方向后,计算出最终的持仓信号。当两个子策略信号一致时,发出真正的交易指令,否则不进行交易,实现双因子验证的目的。

## 优势分析

这种双因子反转追踪策略最大的优势在于,能够在市场反转的时候及时抓住机会,实现低买高卖的交易思路。同时,通过双因子确认机制,可以一定程度上减少假信号,提高信号的质量。

具体来说,123反转策略的Stochastic指标参数设置较为保守,可以有效过滤震荡行情下的假反转。而Keltner通道追踪布林带的思路,也能抓住突破上下轨时的反转机会。两者配合使用,可以互相验证,减少不必要的交易,从而获得更高的胜率。

## 风险分析

该策略的主要风险在于,反转信号发生的时机选择非常重要。如果出现连续假反转,或者反转信号发生的时间节点选择不当,都会导致无法持有完整的趋势,进而影响最终收益。

此外,双因子策略相比单一策略,其参数选择和优化难度都会比较大。需要对两个子策略的参数进行全面测试和评估,否则也很容易失败。

最后,反转交易本身的盈亏比例往往比较悬殊,如果遇到异常行情,很容易爆仓。这需要通过严格的止损来规避。

## 优化方向

根据以上风险分析,该策略可以从以下几个方面进行优化:

1. 测试不同的反转指标参数设置,找到容错率更高,假信号更少的组合
2. 尝试不同周期长度的参数,找到反转捕捉更为精确的数值
3. 增加止损模块,严格控制单笔交易的最大损失
4. 测试不同持仓时间的效果,找到更匹配策略逻辑的出场点
5. 增加开仓数量或仓位控制模块,使得盈亏比例更为合理

## 总结

本策略作为一种典型的双因子反转追踪策略,通过整合123反转和Keltner通道两个子策略,目标是在市场反转点更为精确地把握低买高卖的时机。在参数优化和风险控制到位的情况下,这种策略可以获得较为可观的超额收益。但交易者仍需注意反转交易的特殊性,防范异常行情导致的亏损扩大。

||

## Overview

This strategy belongs to the dual factor mean reversion tracking strategy in the field of quantitative trading. It integrates the 123 reversal strategy and the Keltner channel strategy with two factors, aiming to discover reversal signals and realize the trading idea of buying low and selling high.

## Principle  

The strategy consists of two sub-strategies. The first sub-strategy is the 123 reversal strategy. It judges whether the market is at a reversal point by calculating the change in closing prices over the previous two trading days and combining the Stochastic indicator. Specifically, when the closing price rises for two consecutive days and the Stochastic indicator is below 50, a buy signal is issued; When the closing price falls for two consecutive days and the Stochastic indicator is above 50, a sell signal is issued.

The second sub-strategy is the Keltner channel strategy. This strategy calculates the typical price moving average and volatility range over the most recent n trading days. When the price approaches the upper or lower rails, reverse trading signals are issued. When the price is below the lower rail, go short; when it is above the upper rail, go long.

Finally, by judging the signal directions of the two sub-strategies, the strategy calculates the final position signal. When the signals of the two sub-strategies are consistent, real trading orders are issued, otherwise no transactions are made to achieve the purpose of dual factor verification.

## Advantage Analysis  

The biggest advantage of this dual factor mean reversion tracking strategy is that it can grasp opportunities in time when the market reverses and realize the trading idea of buying low and selling high. At the same time, the dual factor confirmation mechanism can reduce false signals to some extent and improve the quality of signals.

Specifically, the parameter setting of the Stochastic indicator in the 123 reversal strategy is relatively conservative, which can effectively filter false reversals in oscillating markets. And the idea of Keltner channel tracking Bollinger bands can also seize reversal opportunities when price breaks through upper and lower rails. The two complement each other to reduce unnecessary transactions and thus obtain higher winning rates.

## Risk Analysis   

The main risk of this strategy is that the timing of reversal signals is crucial. If continuous false reversals occur or the timing of reversal signals is improperly chosen, it will lead to failure to hold a complete trend, thereby affecting the final return.

In addition, dual-factor strategies have greater difficulty in parameter selection and optimization than single-factor strategies. Comprehensive testing and evaluation of the parameters of the two sub-strategies is needed, otherwise failure is also very likely.

Finally, reverse trading itself has a disproportionate risk-reward ratio. Abnormal market conditions can easily lead to liquidation. This needs to be avoided through strict stop loss.

## Optimization Directions

According to the above risk analysis, the strategy can be optimized in the following aspects:  

1. Test different settings of reversal indicator parameters to find combinations with higher fault tolerance and less false signals
2. Try parameter values of different cycle lengths to find values that capture reversals more precisely  
3. Add a stop loss module to strictly control the maximum loss per trade
4. Test the effects of different holding periods to find exit points that match the strategy logic better  
5. Increase the number of open positions or add position control modules to make the risk-reward ratio more reasonable

## Summary  

As a typical dual factor mean reversion tracking strategy, by integrating the 123 reversal and Keltner channel sub-strategies, this strategy aims to more precisely seize the timing of buying low and selling high at market reversal points. With proper parameter optimization and risk control, such a strategy can obtain relatively considerable alpha. But traders still need to pay attention to the particularity of reverse trading and prevent the expansion of losses caused by abnormal market conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Trade reverse|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|10|Period|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-18 00:00:00
end: 2023-12-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 09/12/2020
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
// The Keltner Channel, a classic indicator 
// of technical analysis developed by Chester Keltner in 1960. 
// The indicator is a bit like Bollinger Bands and Envelopes.
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

KeltnerChn(nPeriod) =>
    pos = 0.0
    xPrice = sma(hlc3, nPeriod)
    xMove = sma(high - low, nPeriod)
    reverse = input(false, title="Trade reverse")
    xUpper = xPrice + xMove
    xLower = xPrice - xMove
    pos := iff(close < xLower, -1,
             iff(close > xUpper, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Keltner Channel", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
nPeriod = input(title="Period", defval=10, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posKeltnerChn = KeltnerChn(nPeriod)
pos = iff(posReversal123 == 1 and posKeltnerChn == 1 , 1,
	   iff(posReversal123 == -1 and posKeltnerChn == -1, -1, 0)) 
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

https://www.fmz.com/strategy/435837

> Last Modified

2023-12-19 11:09:20
