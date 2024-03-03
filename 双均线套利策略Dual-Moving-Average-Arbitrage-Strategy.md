
> Name

双均线套利策略Dual-Moving-Average-Arbitrage-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b2bf16093057a729cb.png)
[trans]

## 概述

该策略是一个利用双均线形态进行套利操作的策略。它结合了123形态反转和有限成交量元素(FVE)两个子策略,当两者同时发出买入或卖出信号时,进行套利操作。

## 策略原理

### 123形态反转

该子策略来源于Ulf Jensen的《我如何在期货市场上获利三倍》一书。它在以下条件发出信号:

- 当收盘价连续2日上涨,且9日慢stoch指标低于50时,做多;
- 当收盘价连续2日下跌,且9日快stoch指标高于50时,做空。

### 有限成交量元素(FVE)

FVE是一个纯粹的成交量指标。它根据价格的涨跌幅度和成交量的大小,判断资金是流入还是流出。

当最近两个bar的FVE指标同时上涨或下跌时发出信号。

## 优势分析

该策略结合两种指标判断市场趋势和资金流向,可以有效避免错误信号。且两个子策略都具有一定的反转特征,因此可以进行套利操作以获利。

另外,双均线形态出现时,代表短期和中期趋势一致,因此具有较强的稳定性。

## 风险分析

该策略依赖均线形态,当市场震荡时,容易出现错误信号导致亏损。此外,反转失败是常见的风险。

可以通过适当调整参数使策略更为稳健,也可以设置止损来控制风险。

## 优化方向

可以测试更多种类的均线指标寻找最佳匹配。也可以引入其他辅助判断指标,如强弱指标、波动率指标等来避免错误信号。

此外,可以研究如何根据市场状态动态调整参数,使策略更具适应性。也可以探索机器学习和神经网络算法以实现参数自适应。

## 总结

该双均线套利策略整合两种反转思路指标进行判断,可以一定程度上规避风险。但由于依赖均线形态,仍需进一步优化以使策略更稳健。总的来说,该策略为短线套利交易提供了一个基础框架,值得进一步研究。

||

## Overview  

This is an arbitrage strategy that utilizes dual moving average formations to make arbitrage trades. It combines the 123 reversal pattern and Finite Volume Elements (FVE) sub-strategies and makes arbitrage trades when they both give buy or sell signals simultaneously.

## Strategy Logic  

### 123 Reversal Pattern

This sub-strategy is from the book "How I Tripled My Money in the Futures Market" by Ulf Jensen. It gives signals under these conditions:

- Go long when close price rises for 2 consecutive days and 9-day slow stoch is below 50.  
- Go short when close price falls for 2 consecutive days and 9-day fast stoch is above 50.

### Finite Volume Elements (FVE)  

FVE is a pure volume indicator. It judges if money is flowing in or out based on price movement range and trading volume.

It gives signals when the latest two bars of FVE indicator rise or fall together.  

## Advantage Analysis

This strategy combines two types of indicators to determine market trend and money flow, which can effectively avoid false signals. Also, both sub-strategies have some reversal characteristics, so arbitrage trades can make profits.

In addition, the dual moving average formation represents consistency between short-term and medium-term trends, thus having greater stability.   

## Risk Analysis  

This strategy relies on moving average formations, which can easily generate false signals and lead to losses when the market fluctuates. Reversal failure is also a common risk.

Risks can be reduced by properly tweaking parameters to make the strategy more robust, or by setting stop loss to control risks.

## Optimization Directions

More types of moving averages can be tested to find the optimal match. Other assist indicators like strength index and volatility index can also be introduced to avoid false signals.

In addition, research can be done on how to dynamically adjust parameters based on market conditions to improve adaptability. Machine learning and neural networks can also be explored for parameter self-adaptivity.  

## Summary

This dual moving average arbitrage strategy integrates two reversal-type indicators for judgement, which can mitigate risks to some extent. But reliance on moving average formations means further optimization is needed to make the strategy more robust. Overall, it provides a basic framework for short-term arbitrage trading and is worth further research.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|18|Period|
|v_input_6|0.6|Factor|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/08/2020
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
// The FVE is a pure volume indicator. Unlike most of the other indicators 
// (except OBV), price change doesn?t come into the equation for the FVE (price 
// is not multiplied by volume), but is only used to determine whether money is 
// flowing in or out of the stock. This is contrary to the current trend in the 
// design of modern money flow indicators. The author decided against a price-volume 
// indicator for the following reasons:
// - A pure volume indicator has more power to contradict.
// - The number of buyers or sellers (which is assessed by volume) will be the same, 
//     regardless of the price fluctuation.
// - Price-volume indicators tend to spike excessively at breakouts or breakdowns.
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


FVE(Period,Factor) =>
    pos = 0
    nRes = 0.0
    xhl2 = hl2
    xhlc3 = hlc3
    xClose = close
    xVolume = volume
    xSMAV = sma(xVolume, Period)
    nMF = xClose - xhl2 + xhlc3 - xhlc3[1]
    nVlm = iff(nMF > Factor * xClose / 100,  xVolume, 
             iff(nMF < -Factor * xClose / 100, -xVolume, 0))
    nRes := nz(nRes[1],0) + ((nVlm / xSMAV) / Period) * 100
    pos := iff(nRes > nRes[1] and nRes > nRes[2], 1,
             iff(nRes < nRes[1] and nRes < nRes[2], -1, nz(pos[1], 0)))   
    pos

strategy(title="Combo Backtest 123 Reversal & Finite Volume Elements (FVE)", shorttitle="Combo", overlay = true)
Length = input(15, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Period = input(18, minval=1)
Factor = input(0.6, minval=0.1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posFVE = FVE(Period,Factor)
pos = iff(posReversal123 == 1 and posFVE == 1 , 1,
	   iff(posReversal123 == -1 and posFVE == -1, -1, 0)) 
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

https://www.fmz.com/strategy/433099

> Last Modified

2023-11-24 14:21:06
