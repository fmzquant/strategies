
> Name

跨趋势反转结合三十振荡器双策略Cross-Trend-Reversal-Combined-with-Three-Ten-Oscillator-Dual-Strategies

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/103af68a5fe8eeeb62c.png)
 [trans]
## 概述

本策略主要结合两种不同类型的策略信号,实现策略信号的叠加,以达到提升信号质量的效果。第一种信略为跨越反转策略,第二种信号为三十振荡器策略。

### 策略1:跨趋势反转策略

该策略源自《我如何在期货市场上获得三倍收益》这本书中第183页的内容。属于反转类型的策略。具体逻辑是:当收盘价连续两天高于前一日收盘价,且9日慢速K线低于50时,做多;当收盘价连续两天低于前一日收盘价,且9日快速K线高于50时,做空。

### 策略2:三十振荡器策略 

该策略利用3日平均线和10日平均线的差值,构建指标。详细来说,是3日指数移动平均线减去10日指数移动平均线,得到的差值为快线,再对该快线进行16日简单移动平均,得到慢线。当快线从下向上突破慢线时,做多;当快线从上向下跌破慢线时,做空。

## 策略原理

- 首先计算跨趋势反转策略的交易信号posReversal123;
- 然后计算三十振荡器策略的交易信号posD_Three;
- 当两个信号同向时(双多或双空),输出综合信号;
- 根据综合信号pos判断具体交易方向和价格;
- 绘制K线不同颜色。

## 优势分析

这种多策略叠加的综合信号具有以下优点:

1. 过滤假信号,提高信号质量

   由于需要两个策略同时给出同向信号,可以避免单一策略中的假信号的影响,从而提高信号的可靠性。

2. 融合多种交易理念

   结合反转策略和趋势策略两个理念,可以在一定程度上减少策略盲点,获取更全面的市场视角。

3. 灵活度高

   根据实际需要,可以调整参与综合的策略组合,结合不同类型的策略,创造更多元化的综合策略。

## 风险分析

1. 假設矛盾

   本策略的基本假设是,多个策略能够相互验证信号。但理论上也存在所有策略同时发出错误信号的可能。

2. 信号不一致

   当两个策略信号不一致时,无法判断哪个策略更可靠,存在一定的决策风险。

3. 参数误配

   如果参数设置不当,可能导致某些策略无法发挥正常作用,从而无法实现策略组合的预期效果。

对策:

1. 增加策略数量,进行多数表决

2. 设置止损点,控制单个信号的损失

3. 优化参数,确保策略正常运作

## 优化方向 

该策略还可从以下几个方向进行优化:

1. 增加更多策略的组合

   可以继续添加更多不同类型的策略,形成组合策略,以进一步提升信号质量。

2. 前期过滤条件

   根据行情特点,可以设置一些前期条件,例如大盘过滤,来避免不适宜的行情下开仓。

3. 动态调整策略权重

   可以根据不同策略以往的表现,动态调整它们的权重参与组合,让表现更好的策略发挥更大作用。

4. 优化参数细节

   可以通过更系统的方法,对各策略内部的参数进行细致的测试和优化,以获得最佳参数。

## 总结

本策略属于多策略叠加型的综合策略。它整合了跨趋势反转策略和三十振荡策略两个子策略,通过使它们的交易信号同向时才产生交易指令,可以有效滤除单一策略中的假信号,提高信号质量。与单一策略相比,这种策略组合类型具有信号可靠性更高、容错性更强等优势。但也需要注意一致性假设可能带来的风险,需要采取适当的措施进行控制。总的来说,这种多策略组合框架具有很大的拓展潜力,可以通过添加更多子策略、优化参数和设置过滤条件等手段进行深化。

||

## Overview

This strategy mainly combines signals from two different types of strategies to superimpose strategy signals and improve signal quality. The first type of strategy is the cross trend reversal strategy and the second type of signal is the three ten oscillator strategy.

### Strategy 1: Cross Trend Reversal Strategy

This strategy originates from page 183 of the book "How I Tripled My Money in the Futures Market". It belongs to the reversal type of strategy. The specific logic is: when the closing price is higher than the previous closing price for two consecutive days, and the 9-day slow K-line is lower than 50, go long; when the closing price is lower than the previous closing price for two consecutive days, and the 9-day fast K-line is higher than 50, go short.

### Strategy 2: Three Ten Oscillator Strategy

This strategy uses the difference between the 3-day moving average and the 10-day moving average to construct an indicator. Specifically, it is the 3-day exponential moving average minus the 10-day exponential moving average. The difference is the fast line. Taking a 16-day simple moving average of this fast line gives the slow line. When the fast line breaks through the slow line from bottom to top, go long; when the fast line breaks through the slow line from top to bottom, go short.

## Strategy Principle 

- First calculate the trading signal posReversal123 of the cross trend reversal strategy;
- Then calculate the trading signal posD_Three of the three ten oscillator strategy;
- When the two signals are in the same direction (dual multi or dual short), output a combined signal;
- Determine the specific trading direction and price based on the combined signal pos;
- Draw K-lines in different colors.

## Advantage Analysis

This composite signal of multi-strategy stacking has the following advantages:

1. Filter fake signals and improve signal quality

   As two strategies are required to give signals in the same direction at the same time, the impact of fake signals in a single strategy can be avoided, thereby improving signal reliability.

2. Integrate multiple trading ideas

   Combining reversal strategies and trend strategies integrates two ideas to some extent Reduce the blind spots of the strategy and get a more comprehensive market perspective.

3. High flexibility

   According to actual needs, the combination of participating strategies can be adjusted to create more diversified combination strategies by combining different types of strategies.

## Risk Analysis  

1. Contradictory assumptions

   The basic assumption of this strategy is that multiple strategies can verify signals with each other. But in theory, it is also possible for all strategies to give wrong signals at the same time.

2. Inconsistent signals

   When the two strategy signals are inconsistent, it is impossible to determine which strategy is more reliable, and there is a certain decision risk.

3. Parameter mismatch

   Improper parameter settings may cause some strategies to fail to function properly, resulting in failure to achieve the expected effects of strategy combinations.

Countermeasures:

1. Increase the number of strategies for majority vote

2. Set stop loss points to control losses from individual signals  

3. Optimize parameters to ensure normal strategy operation   

## Optimization Directions

The strategy can also be optimized in the following directions:

1. Increase combination of more strategies

   Continue to add more different types of strategies to form combination strategies, so as to further improve signal quality.

2. Prior filtering conditions

   According to market conditions, some prior conditions can be set, such as market filtering, to avoid opening positions in unsuitable market conditions.

3. Dynamically adjust strategy weights

   The weights of different strategies in the combination can be dynamically adjusted according to their historical performance, so that strategies with better performance can play a greater role.

4. Optimize parameter details

   A more systematic approach can be used to carefully test and optimize the internal parameters of each strategy in order to obtain the optimal parameters.

## Summary  

This strategy belongs to a multi-strategy overlay composite strategy. It integrates two sub-strategies, the cross-trend reversal strategy and the three-ten oscillation strategy. It generates trading orders only when their trading signals are in the same direction, which can effectively filter out fake signals in a single strategy and improve signal quality. Compared with a single strategy, this type of strategy combination has advantages such as higher signal reliability and stronger fault tolerance. But the risks brought by consistency assumptions also need to be noted, and appropriate measures should be taken to control them. In general, this multi-strategy combination framework has great potential for expansion, and can be deepened through adding more sub-strategies, optimizing parameters and setting filtering conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|3|Length1|
|v_input_6|10|Length2|
|v_input_7|16|Length3|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-11 00:00:00
end: 2024-01-18 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 04/12/2019
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
// TradeStation does not allow the user to make a Multi Data Chart with 
// a Tick Bar Chart and any other type a chart. This indicator allows the 
// user to plot a daily 3-10 Oscillator on a Tick Bar Chart or any intraday interval.
// Walter Bressert's 3-10 Oscillator is a detrending oscillator derived 
// from subtracting a 10 day moving average from a 3 day moving average. 
// The second plot is an 16 day simple moving average of the 3-10 Oscillator. 
// The 16 period moving average is the slow line and the 3/10 oscillator is 
// the fast line.
// For more information on the 3-10 Oscillator see Walter Bressert's book 
// "The Power of Oscillator/Cycle Combinations" 
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

D_Three(Length1, Length2, Length3) =>
    pos = 0.0
    xPrice =  security(syminfo.tickerid,"D", hl2)
    xfastMA = ema(xPrice, Length1)
    xslowMA = ema(xPrice, Length2)
    xMACD = xfastMA - xslowMA
    xSignal = sma(xMACD, Length3)
    pos := iff(xSignal > xMACD, -1,
    	     iff(xSignal < xMACD, 1, nz(pos[1], 0)))     
    pos

strategy(title="Combo Backtest 123 Reversal & D_Three Ten Osc", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Length1 = input(3, minval=1)
Length2 = input(10, minval=1)
Length3 = input(16, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posD_Three = D_Three(Length1, Length2, Length3)
pos = iff(posReversal123 == 1 and posD_Three == 1 , 1,
	   iff(posReversal123 == -1 and posD_Three == -1, -1, 0)) 
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

https://www.fmz.com/strategy/439351

> Last Modified

2024-01-19 14:41:02
