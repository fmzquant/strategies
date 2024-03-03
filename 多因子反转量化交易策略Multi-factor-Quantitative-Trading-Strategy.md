
> Name

多因子反转量化交易策略Multi-factor-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1001827e928503709c0.png)
[trans]

## 概述

本策略结合了123反转策略和心理线策略,形成一个多因子量化交易策略。该策略综合考虑了技术形态、市场心理等多个维度,在判断市场走势时能够做出更准确的决策。

## 原理

### 123反转策略

123反转策略判断当天收盘价与前一日相比,如果上涨,并且慢速K线低于50时,做多;如果下跌,并且快速K线高于50时,做空。该策略利用了短期反转的特点来获利。

### 心理线策略 

心理线策略统计一定周期内的涨跌比例,如果涨幅大于50%则表示多头掌控市场;如果涨幅小于50%则表示空头掌控市场。根据涨跌比例来判断市场心理面。

本策略则是结合上述两种策略的信号,当二者给出同向信号时开仓做单,不同向信号时平仓。

## 优势

该策略结合多种因子,可以更准确判断市场走势,避免单一技术指标造成的误判。同时结合市场心理因素,也使策略更具有韧性,能够应对更加复杂的行情。

## 风险与解决

该策略中各个因子参数的设定会对策略表现产生较大影响。不合理的参数组合可能会使策略效果大打折扣。此外,如果行情出现剧烈变化也会导致策略失效。为降低风险,我们需要对各类市场行情进行大量回测,找出最优参数;同时也要控制仓位规模,保证单笔损失不会过大。

## 优化方向

我们可以在现有的基础上继续添加其他判断因子,如波动率、成交量等指标,形成更加立体化的策略逻辑;或者加入机器学习算法,实现策略的参数自适应优化。这都将是本策略进一步优化的方向。

## 总结

本策略综合考虑技术形态和市场心理等多因子,通过不同因子间的验证确保信号的有效性。同时留有大量优化空间,可望获得更出色的表现。这是一个值得长期跟踪、积累和优化的优质量化策略。

||

## Overview

This strategy combines the 123 reversal strategy and psychological line strategy to form a multi-factor quantitative trading strategy. By comprehensively considering technical patterns, market psychology and other factors, the strategy can make more accurate judgments when determining market trends.  

## Principle

### 123 Reversal Strategy

The 123 reversal strategy judges that if the closing price of the day rises compared to the previous day, and the slow K line is below 50, go long; if it falls, and the fast K line is above 50, go short. The strategy takes advantage of the characteristics of short-term reversals to profit.

### Psychological Line Strategy

The psychological line strategy counts the ratio of rises and falls over a certain cycle. If the rise is greater than 50%, it indicates that bulls control the market; if the rise is less than 50%, it indicates that bears control the market. Make judgments about market psychology based on the ratio of rises and falls.

This strategy combines the signals from the above two strategies. Open positions when the two strategies give signals in the same direction, and close positions when giving signals in different directions.

## Advantages

The strategy combines multiple factors and can make more accurate judgments about market trends, avoiding misjudgments caused by a single technical indicator. At the same time, the combination of market psychology makes the strategy more resilient to cope with complex trend changes.  

## Risks and Solutions

The setting of parameters for each factor in the strategy will have a greater impact on strategy performance. Unreasonable parameter combinations may greatly reduce the effectiveness of the strategy. In addition, drastic changes in trends can also cause the strategy to fail. To reduce risks, we need to backtest various market conditions to find the optimal parameter settings; also control position sizing to ensure that a single loss will not be too large.

## Optimization Directions 

On the existing basis, we can continue to add other judgment factors such as volatility and volume to form a more three-dimensional strategy logic; or add machine learning algorithms to achieve automatic parameter adaptive optimization. These will be further optimization directions for this strategy.  

## Summary  

This strategy comprehensively considers multiple factors such as technical patterns and market psychology. Validation between different factors ensures the validity of signals. At the same time, it leaves ample room for optimization and is expected to achieve superior performance. This is a high-quality quantitative strategy worth long-term tracking, accumulation and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Psychological line ----|
|v_input_7|20|LengthPLine|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-20 00:00:00
end: 2023-12-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 30/04/2021
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
// Psychological line (PSY), as an indicator, is the ratio of the number of 
// rising periods over the total number of periods. It reflects the buying 
// power in relation to the selling power.
// If PSY is above 50%, it indicates that buyers are in control. Likewise, 
// if it is below 50%, it indicates the sellers are in control. If the PSY 
// moves along the 50% area, it indicates balance between the buyers and 
// sellers and therefore there is no direction movement for the market.
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


PLine(Length) =>
    pos = 0.0
    cof = close > close[1]? 1:0
    xPSY = sum(cof,Length) / Length * 100
    pos:= iff(xPSY > 50, 1,
           iff(xPSY < 50, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Psychological line", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Psychological line ----")
LengthPLine = input(20, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posPLine = PLine(LengthPLine)
pos = iff(posReversal123 == 1 and posPLine == 1 , 1,
	   iff(posReversal123 == -1 and posPLine == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/436770

> Last Modified

2023-12-27 15:46:27
