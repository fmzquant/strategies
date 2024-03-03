
> Name

基于多指标验证的量化交易策略Quantitative-Trading-Strategy-with-Multi-Indicator-Confirmation

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种通过多指标验证形成交易信号的量化策略。该策略综合运用多种指标判断,以提高信号的可靠性。

一、策略原理

该策略集合使用两种交易技术:

(一)123形态反转策略

1.计算K线的收盘价关系,判断可能的底部和顶部形态;

2.结合随机指标判定反转信号,避免错误信号;

(二)平滑多空量指标

1.计算多空量指标及其移动平均; 

2.根据指标和均线的背离关系判断趋势;

3.只有当两种技术的判断一致时,才生成最终的交易信号。

这样,通过多指标验证,可以过滤掉一定的假信号,提高信号准确性。

二、策略优势

该策略最大的优势是多指标组合验证,这避免了单一指标的局限性,增强了信号的稳定性。

另一优势是两种不同类型技术的组合使用,这进一步提高了判断的全面性。

最后,组合使用也提供了更多参数空间进行优化测试。

三、潜在风险

但该策略也存在以下问题:

首先,多指标组合增加了参数优化难度,不当设置可能导致过优化。

其次,两种技术信号之间可能出现分歧,需要设定清晰的判断规则。

最后,部分指标如随机指标等还是存在滞后问题。

四、内容总结

本文详细介绍了一种通过多指标验证进行量化交易的策略。它通过组合使用指标来提高信号质量,但也需要注意参数优化难度及指标滞后等问题。总体来说,该策略提供了一种相对稳健的交易方法。

||

This article explains in detail a quantitative trading strategy that utilizes multi-indicator confirmation to generate signals. It combines different techniques to improve reliability.

I. Strategy Logic

The strategy synthesizes two techniques:

(1) 123 Reversal Pattern

1. Identify potential bottoms and tops based on candle close relationships.

2. Use stochastic to validate reversal signals and avoid false signals.

(2) Smoothed Accumulation/Distribution 

1. Calculate Accumulation/Distribution and moving average.

2. Determine trends based on divergences between the indicator and MA.

3. Only agreeable signals from both techniques are taken.

By requiring multiple confirmations, certain false signals can be filtered out and accuracy improved.

II. Advantages of the Strategy

The biggest advantage is multi-indicator confirmation, which overcomes single indicator limitations and enhances robustness.

Another advantage is combining two different technique types for greater comprehensiveness.

Finally, the combinations also provide more tuning options.

III. Potential Risks

However, some risks exist:

Firstly, multi-indicator combinations increase optimization difficulty and overfitting risks.

Secondly, discrepancies between indicators require clear judgment rules.

Finally, some indicators still have lagging issues.

IV. Summary

In summary, this article has explained a quantitative trading strategy utilizing multi-indicator confirmations. It improves signals through synthesis but requires managing optimization difficulty and indicator lags. Overall it provides a relatively robust approach.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Smoothed Williams AD ----|
|v_input_7|14|LengthWillAD|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/07/2021
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
// Accumulation is a term used to describe a market controlled by buyers;
// whereas distribution is defined by a market controlled by sellers.
// Williams recommends trading this indicator based on divergences:
//  Distribution of the security is indicated when the security is making 
//  a new high and the A/D indicator is failing to make a new high. Sell.
//  Accumulation of the security is indicated when the security is making 
//  a new low and the A/D indicator is failing to make a new low. Buy. 
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


SWAD(Length) =>
    pos = 0.0
    xWAD = 0.0
    xPrice = close
    xWAD:= iff(close > nz(close[1], 0), nz(xWAD[1],0) + close - low[1], 
             iff(close < nz(close[1],0), nz(xWAD[1],0) + close - high[1],0))
    xWADMA = sma(xWAD, Length)
    pos:= iff(xWAD > xWADMA, 1,
             iff(xWAD < xWADMA, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Smoothed Williams AD", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Smoothed Williams AD ----")
LengthWillAD = input(14, step = 1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posSWAD = SWAD(LengthWillAD)
pos = iff(posReversal123 == 1 and posSWAD == 1 , 1,
	   iff(posReversal123 == -1 and posSWAD == -1, -1, 0)) 
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

https://www.fmz.com/strategy/426888

> Last Modified

2023-09-15 11:55:04
