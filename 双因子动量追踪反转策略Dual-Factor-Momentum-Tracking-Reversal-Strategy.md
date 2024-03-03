
> Name

双因子动量追踪反转策略Dual-Factor-Momentum-Tracking-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d584072907d16248d.png)
 [trans]
## 概述

本策略综合运用了股票量价反转因子和动量因子,构建了一个双因子模型,以期捕捉市场短期反转和中长期persistence的机会。策略首先利用123形态判断近期价格反转信号,然后结合Laguerre RSI指标判断中长线趋势,最终实现双因子信号的有效结合。

## 策略原理

该策略由两部分组成:

1. 123形态反转因子

    该部分通过判断前两天的收盘价变化,发现价格短期反转信号。具体来说,如果前一天的收盘价低于前两天,且今天的收盘价高于前一天,那么可以判断为价格反转上涨的信号。Stoch指标用于辅助判断。

2. 基于拉格尔滤波器的RSI因子

    该部分构建了一种更灵敏的RSI指标。传统RSI指标对价格变化的敏感性较低,而拉格尔滤波器可以用更少的历史数据构建指标,从而提高对价格变化的敏感性。新的RSI指标用于判断中长线趋势。

最终,策略会结合两者的信号,在短期反转的同时,确保大趋势不会反转,从而捕捉反弹机会。

## 策略优势

该策略最大的优势在于成功结合了反转因子和趋势因子。反转因子能够捕捉短期调整后的价格反弹机会,而趋势因子则确保做多/做空的大方向不会发生改变。相比单一的反转或动量模型,该双因子模型能够在降低假信号的前提下,提高做多做空准确性。

此外,拉格尔RSI指标的加入也增加了模型对价格变化的敏感性,这对高频交易尤其重要。

## 风险分析

该策略面临的主要风险在于双因子信号可能发生分歧。尤其是在市场震荡调整期间,短期价格频繁反转的同时,中长线趋势也可能发生改变。这时,两种信号极有可能出现错误组合或者延迟。这将导致策略生成错误信号,进而错过最佳入场时机或者造成不必要的损失。

此外,参数选择不当也会导致策略表现不佳。反转因子和趋势因子对应的技术指标参数需要分别调优和测试,不当的参数组合也可能使策略效果大打折扣。

## 优化方向

该策略下一步优化的方向主要集中在信号过滤和参数选择上。可以考虑加入更多过滤条件,在双因子信号发生分歧时发挥作用,确保只在高确定性场景下开仓。这可以大幅减少错信号率。

在参数选择上,可以尝试机器学习和科学实验的方法,对各个参数组合进行系统测试,找到最优参数。这需要较高的计算能力支持,但可以显著提高策略稳定性。

## 总结

本策略成功地融合了反转因子和趋势因子,通过双因子模型捕捉短期反弹和中长期persistence机会。加入的拉格尔RSI滤波器也提高了模型对价格变化的敏感性。下一步工作将集中于信号过滤和参数优化上,以进一步增强策略效果。

||

## Overview

This strategy combines the price reversal factor and momentum factor of stocks to construct a dual-factor model for capturing opportunities arising from short-term reversals and long-term persistence in the market. It first uses 123 chart patterns to determine near-term price reversal signals, then incorporates the Laguerre RSI indicator to judge the medium-to-long term trend, and eventually achieves effective integration of dual-factor signals.

## Strategy Principles 

The strategy consists of two parts:

1. 123 Reversal Pattern Factor

    This part detects short-term price reversal signals by examining the change in closing prices over the past two days. Specifically, if yesterday's closing price is lower than the previous two days' and today's closing price is higher than yesterday's, it can be determined as a bullish price reversal signal. The Stoch indicator serves as an auxiliary means to assist judgement.
    
2. Laguerre Filtered RSI Factor

    This part builds a more responsive RSI indicator using Laguerre filters. The sensitivity of traditional RSI indicators to price changes is relatively low. By contrast, Laguerre filters can construct indicators using less historical data, thereby improving sensitivity to price fluctuations. The new RSI indicator is used to determine the medium-to-long term trend.
    
Ultimately, the strategy combines the signals from both factors, ensuring short-term reversals occur in alignment with overall market trends, in order to capitalize on retracement opportunities.

## Advantages of the Strategy

The biggest advantage of this strategy lies in the successful combination of reversal and trend factors. The reversal factor captures short-term pullback opportunities after price consolidations, while the trend factor ensures the overall long/short bias does not change. Compared to standalone reversal or momentum models, this dual-factor model can improve the accuracy of long/short signals while lowering false signals.

Additionally, the introduction of the Laguerre RSI boosts the model's sensitivity to price changes, which is especially crucial for high-frequency trading.

## Risk Analysis

The primary risk this strategy faces is the possibility of conflicting signals from the two factors. Particularly during volatile market corrections, short-term prices may reverse frequently while medium-to-long term trends also begin to shift. In such cases, the two types of signals can easily mismatch or experience delays. This leads to incorrect strategy signals and missed entry opportunities or unnecessary losses.  

In addition, poor parameter configurations may also lead to poor strategy performance. The parameters for the technical indicators belonging to the reversal and trend factors need to be separately optimized and tested. Improper parameter combinations can significantly diminish the strategy's efficacy.

## Optimization Directions

The main focuses of future optimizations for this strategy involve signal filtering and parameter selection. More filtering conditions could be introduced to take effect when the dual-factor signals conflict, ensuring trades are only placed in high-certainty scenarios. This can drastically reduce false signals.

For parameter selection, machine learning and scientific experiment methods could be attempted to systematically test various parameter combinations and arrive at optimal configurations. This requires considerable computing power but can significantly improve the stability of the strategy.  

## Summary

This strategy has successfully merged reversal and trend factors through a dual-factor model to capitalize on short-term pullbacks and medium-to-long term persistence. The introduction of the Laguerre filtered RSI also improves model sensitivity to price changes. The next phase shall focus on signal filtering and parameter optimization to further enhance the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|0.5|gamma|
|v_input_6|0.8|BuyBand|
|v_input_7|0.2|SellBand|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-17 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/01/2021
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
// This is RSI indicator which is more sesitive to price changes. 
// It is based upon a modern math tool - Laguerre transform filter.
// With help of Laguerre filter one becomes able to create superior 
// indicators using very short data lengths as well. The use of shorter 
// data lengths means you can make the indicators more responsive to 
// changes in the price.
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

LB_RSI(gamma,BuyBand,SellBand) =>
    pos = 0.0
    xL0 = 0.0
    xL1 = 0.0
    xL2 = 0.0
    xL3 = 0.0
    xL0 := (1-gamma) * close + gamma * nz(xL0[1], 1)
    xL1 := - gamma * xL0 + nz(xL0[1], 1) + gamma * nz(xL1[1], 1)
    xL2 := - gamma * xL1 + nz(xL1[1], 1) + gamma * nz(xL2[1], 1)
    xL3 := - gamma * xL2 + nz(xL2[1], 1) + gamma * nz(xL3[1], 1)
    CU = (xL0 >= xL1 ? xL0 - xL1 : 0) + (xL1 >= xL2 ? xL1 - xL2 : 0)  + (xL2 >= xL3 ? xL2 - xL3 : 0)
    CD = (xL0 >= xL1 ? 0 : xL1 - xL0) + (xL1 >= xL2 ? 0 : xL2 - xL1)  + (xL2 >= xL3 ? 0 : xL3 - xL2)
    nRes = iff(CU + CD != 0, CU / (CU + CD), 0)
    pos := iff(nRes > BuyBand, 1,
    	     iff(nRes < SellBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Laguerre-based RSI", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
gamma = input(0.5, minval=-0.1, maxval = 0.9)
BuyBand = input(0.8, step = 0.01)
SellBand = input(0.2, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posLB_RSI = LB_RSI(gamma,BuyBand,SellBand)
pos = iff(posReversal123 == 1 and posLB_RSI == 1 , 1,
	   iff(posReversal123 == -1 and posLB_RSI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/439188

> Last Modified

2024-01-18 11:33:40
