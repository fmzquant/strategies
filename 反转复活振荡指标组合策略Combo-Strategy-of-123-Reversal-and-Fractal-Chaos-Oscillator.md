
> Name

反转复活振荡指标组合策略Combo-Strategy-of-123-Reversal-and-Fractal-Chaos-Oscillator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1cea81b57ad1517c0fe.png)

[trans]


## 概述

该策略是一个组合策略,结合使用了反转策略和复活振荡指标策略,目的是获取更可靠的交易信号。

## 策略原理

该策略由两部分组成:

1. 反转策略

    反转策略来自Ulf Jensen的《我如何在期货市场上将资金增加两倍》一书第183页。该策略属于反转类型,具体逻辑是:

    - 当收盘价比前一日收盘价高,连续两日时,并且9日慢速Stoch指标低于50时,做多入场。

    - 当收盘价比前一日收盘价低,连续两日时,并且9日快速Stoch指标高于50时,做空入场。

2. 复活振荡指标策略

    复活振荡指标通过计算市场中最细微波动的差值,其值一般在-1到1之间波动。指标数值越高,表示趋势性越强,无论是涨趋势还是跌趋势。

    当指标达到较高值时,做多;当指标达到较低值时,做空。该指标适合用于日内交易。

最后,当两种策略信号同向时,即进行相关方向的交易。

## 优势分析

- 结合反转策略和趋势策略,可以过滤掉一些假信号,提高交易信号的可靠性。

- 反转策略可以捕捉到短期反转机会;复活振荡指标策略可以捕捉中长线趋势。

- Stoch指标参数优化较好,可以有效过滤震荡市场的假信号。

- 复活振荡指标对细微市场波动较为敏感,可以提前捕捉到趋势转折。

## 风险及解决方案

- 反转策略容易被巨大趋势反转吞噬,可适当调整参数,或与趋势策略组合使用。

- 指标策略容易产生过多交易信号,可适当调整参数,或与其他过滤指标组合使用。 

- 两种策略信号可能不一致产生冲突,可根据历史回测数据调整参数,优化两者配合。

- 可引入止损策略,以控制单笔损失。

## 优化方向 

- 测试不同的反转参数组合,找到最佳参数。

- 测试不同的复活振荡指标参数,找到最优参数。

- 尝试不同的指标参数优化方法,如遗传算法、随机森林等。

- 增加其他辅助指标,进一步过滤信号。

- 增加机器学习模型,提高信号准确率。

- 引入风险管理机制,如止损、仓位管理等。

## 总结

该策略通过组合反转策略和复活振荡指标策略,综合利用两种不同类型策略的优势,能够提高交易信号质量,在回测中表现出较好的效果。通过参数优化、增加其他指标、风险管理等进一步优化,该策略有望取得更好的实盘效果。总体来说,这是一个非常有创新思路的策略,值得进一步研究和应用。

||


## Overview

This is a combo strategy that combines the 123 Reversal strategy and Fractal Chaos Oscillator strategy to obtain more reliable trading signals.

## Strategy Logic

The strategy consists of two parts:

1. 123 Reversal Strategy

    This strategy is from the book "How I Tripled My Money in The Futures Market" by Ulf Jensen, page 183. It is a reversal type strategy. The logic is:

    - Go long when the close price is higher than the previous close for 2 consecutive days, and the 9-day slow Stoch is below 50. 

    - Go short when the close price is lower than the previous close for 2 consecutive days, and the 9-day fast Stoch is above 50.

2. Fractal Chaos Oscillator Strategy

    The FCO calculates the difference between the most subtle movements in the market. Its value fluctuates between -1 and 1. The higher the value, the stronger the trend, no matter uptrend or downtrend. 

    Go long when FCO reaches a high level. Go short when FCO reaches a low level. This indicator is suitable for intraday trading.

When the signals of both strategies agree, a trade will be made in that direction.

## Advantage Analysis 

- Combining reversal and trend strategies helps filter out false signals and improves reliability.

- The reversal strategy catches short-term reversal opportunities, while the FCO strategy catches mid-long term trends.

- The optimized Stoch parameters effectively filter out false signals in range-bound markets. 

- The FCO is sensitive to subtle market fluctuations and can early detect trend changes.

## Risks and Solutions

- Reversal strategies can be overwhelmed by huge trend reversions. Adjust parameters or combine with trend strategies.

- Indicator strategies may generate excessive signals. Adjust parameters or add filtering indicators.

- Conflicting signals may happen. Optimize parameters based on backtest results to improve cooperation. 

- Add stop loss to control single trade loss.

## Optimization Directions

- Test different reversal parameter combinations to find the optimum.

- Test different FCO parameters to find the best.

- Try different parameter optimization methods like genetic algorithms, random forest etc.

- Add more auxiliary indicators to further filter signals. 

- Add machine learning models to improve signal accuracy.

- Introduce risk management mechanisms like stop loss, position sizing etc.

## Summary 

This strategy combines the strengths of reversal and FCO strategies through portfolio usage, and improves signal quality. It shows good performance in backtests. Further optimizations like parameter tuning, adding indicators, risk management etc. can improve its live performance. Overall this is an innovative strategy worth researching and applying.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|true|Pattern|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-10-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 07/10/2020
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
//   The value of Fractal Chaos Oscillator is calculated as the difference between 
// the most subtle movements of the market. In general, its value moves between 
// -1.000 and 1.000. The higher the value of the Fractal Chaos Oscillator, the 
// more one can say that it follows a certain trend – an increase in prices trend, 
// or a decrease in prices trend.
//
//   Being an indicator expressed in a numeric value, traders say that this is an 
// indicator that puts a value on the trendiness of the markets. When the FCO reaches 
// a high value, they initiate the “buy” operation, contrarily when the FCO reaches a 
// low value, they signal the “sell” action. This is an excellent indicator to use in 
// intra-day trading.
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

fractalUp(pattern) =>
    p = high[pattern+1]
    okl = 1
    okr = 1
    res = 0.0
	for i = pattern to 1
		okl := iff(high[i] < high[i+1] and okl == 1 , 1, 0)
	for i = pattern+2 to pattern*2+1
		okr := iff(high[i] < high[i-1] and okr == 1, 1, 0)
	res := iff(okl == 1 and okr == 1, p, res[1])
    res

fractalDn(pattern) =>
    p = low[pattern+1]
    okl = 1
    okr = 1
    res = 0.0
	for i = pattern to 1
		okl := iff(low[i] > low[i+1] and okl == 1 , 1, 0)
	for i = pattern+2 to pattern*2+1
		okr := iff(low[i] > low[i-1] and okr == 1, 1, 0)
	res := iff(okl == 1 and okr == 1, p, res[1])
    res

FCO(Pattern) =>
    pos = 0.0
    xUpper = fractalUp(Pattern) 
    xLower = fractalDn(Pattern)
    xRes = iff(xUpper != xUpper[1], 1, 
             iff(xLower != xLower[1], -1, 0))
    pos := iff(xRes == 1, 1,
             iff(xRes == -1, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Fractal Chaos Oscillator", shorttitle="Combo", overlay = true)
Length = input(15, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Pattern = input(1, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posFCO = FCO(Pattern)
pos = iff(posReversal123 == 1 and posFCO == 1 , 1,
	   iff(posReversal123 == -1 and posFCO == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430887

> Last Modified

2023-11-02 16:43:41
