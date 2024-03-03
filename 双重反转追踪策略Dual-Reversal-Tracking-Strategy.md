
> Name

双重反转追踪策略Dual-Reversal-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6b0eafb96d158b2735.png)
[trans]

## 概述

双重反转追踪策略通过结合123反转和关键反转下跌两个子策略,实现更精确的交易信号捕捉。其中123反转策略通过观测收盘价与之前两天的对比,结合Stoch指标判断潜在反转。关键反转下跌策略则通过在下跌趋势中观测新的低点来判断反转信号。两种策略信号的结合可以使得交易决策更加准确可靠。

## 策略原理

该策略由两个子策略组成。第一个子策略即123反转策略,其判断逻辑是:

1. 如果今天和昨天的收盘价均高于前天,且快速Stoch指标低于慢速Stoch指标且快速线低于50,做多;

2. 如果今天和昨天的收盘价均低于前天,且快速Stoch指标高于慢速Stoch指标且快速线高于50,做空。

第二个子策略即关键反转下跌策略,其判断逻辑很简单:

在下跌趋势中,如果出现新的低点,则做空。

整个策略的交易信号则是,只有当两个子策略的信号同向时,才发出实际的交易信号。

## 优势分析

该策略最大的优势在于信号准确可靠。因为它需要两个子策略的信号同向才实际下单,从而可以过滤掉部分噪音交易,这大大提高了策略的稳定性。

另外,该策略同时结合了多个时间维度的信息,包括双日线比较和Stoch指标的多日信息,使得判断依据更加全面和可靠。

从原理上看,该策略同时满足反转策略和趋势策略的特点,适合在现实中实际应用。

## 风险分析

该策略的最大风险在于双重信号的要求也增大了漏单的概率。当两个子策略信号不一致时,将错过交易机会。

另外,子策略本身也存在一定问题。123反转策略对参数敏感度较高,需要仔细测试和优化。关键反转下跌策略则对于震荡行情效果不佳。

这些问题都是可以通过调整参数以及引入其他辅助判断来解决的。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 调整子策略参数,使其更加匹配具体品种特点;

2. 引入Volume和波动率等辅助指标,提高决策的准确性;

3. 增加机器学习模型判断,利用历史数据对参数进行自动优化。

## 总结

双重反转追踪策略通过123反转和关键反转下跌子策略的结合,实现反转捕捉的双重保险。它结合了反转策略和趋势策略的优势,在现实中应用前景广阔。通过参数和模型优化,可以使该策略的效果进一步提升,成为反转交易者的重要工具。

|| 

## Overview

The Dual Reversal Tracking strategy combines the 123 Reversal and Key Reversal Down sub-strategies to achieve more precise trading signal capture. The 123 Reversal strategy observes the comparison of the closing price with the previous two days and judges potential reversals combined with the Stoch indicator. The Key Reversal Down strategy judges reversal signals by observing new lows in a downtrend. The combination of signals from the two strategies can make trading decisions more accurate and reliable.

## Principle

This strategy consists of two sub-strategies. The first sub-strategy, the 123 Reversal strategy, has the following logic:  

1. If today's and yesterday's closing prices are both higher than the day before yesterday, and the fast Stoch indicator is below the slow Stoch indicator and the fast line is below 50, go long.

2. If today's and yesterday's closing prices are both lower than the day before yesterday, and the fast Stoch indicator is above the slow Stoch indicator and the fast line is above 50, go short.


The second sub-strategy, the Key Reversal Down strategy, has a very simple judgment logic:

In a downtrend, if a new low appears, go short.

The actual trading signal of the entire strategy is that only when the signals of the two sub-strategies are in the same direction, the actual trading signal is issued.  

## Advantage Analysis  

The biggest advantage of this strategy is the accuracy and reliability of signals. Because it requires the signals of the two sub-strategies to be in the same direction before actually placing orders, some noisy trades can be filtered out, which greatly improves the stability of the strategy.

In addition, the strategy combines multi-timeframe information including dual-day line comparison and multi-day Stoch indicator information, making the judgment basis more comprehensive and reliable.  

In principle, this strategy satisfies the characteristics of both reversal and trend-following strategies, making it suitable for actual application in reality.  

## Risk Analysis   

The biggest risk of this strategy is that the requirement for dual signals also increases the probability of missing opportunities. Trading opportunities will be missed when the signals of the two sub-strategies are inconsistent.

In addition, the sub-strategies themselves also have some problems. The 123 Reversal strategy is highly sensitive to parameters and needs careful testing and optimization. The Key Reversal Down strategy does not work well for ranging markets.  

These issues can be solved by adjusting parameters and introducing other auxiliary judgments.

## Optimization Directions  

This strategy can be optimized in the following aspects:  

1. Adjust the parameters of the sub-strategies to better match the characteristics of specific products.  

2. Introduce auxiliary indicators such as Volume and volatility to improve decision accuracy.  

3. Increase machine learning model judgment to automatically optimize parameters using historical data.

## Summary  

The Dual Reversal Tracking strategy achieves dual insurance of reversal capturing through the combination 123 Reversal and Key Reversal Down sub-strategies. It combines the advantages of reversal and trend-following strategies, with broad application prospects in reality. Through parameter and model optimization, the effect of this strategy can be further improved to become an important tool for reversal traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|true|Enter the number of bars over which to look for a new high in prices.|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-06-14 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/12/2020
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
// A key reversal is a one-day trading pattern that may signal the reversal of a trend. 
// Other frequently-used names for key reversal include "one-day reversal" and "reversal day."
// How Does a Key Reversal Work?
// Depending on which way the stock is trending, a key reversal day occurs when:
// In an uptrend -- prices hit a new high and then close near the previous day's lows.
// In a downtrend -- prices hit a new low, but close near the previous day's highs
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

KRD(nLength) =>
    pos = 0.0
    xHH = highest(high[1], nLength)
    C1 = iff(high > xHH and close < close[1], true, false)
    pos := iff(C1, -1, 0)
    pos

strategy(title="Combo Backtest 123 Reversal & Key Reversal Down", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
nLength = input(1, minval=1, title="Enter the number of bars over which to look for a new high in prices.")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posKRD = KRD(nLength)
pos = iff(posReversal123 == 1 and posKRD == 1 , 1,
	   iff(posReversal123 == -1 and posKRD == -1, -1, 0)) 
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

https://www.fmz.com/strategy/432921

> Last Modified

2023-11-22 17:42:23
