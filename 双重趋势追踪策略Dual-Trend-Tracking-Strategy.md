
> Name

双重趋势追踪策略Dual-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

双重趋势追踪策略通过组合使用两种不同的策略信号,实现更准确地捕捉市场趋势,从而获取超额收益。该策略首先使用123反转策略判断价格反转信号,然后结合超买超卖指标判定持仓方向,实现追踪趋势的同时避免被套。

## 策略原理  

该策略由两部分组成:

1. 123反转策略  

   123反转策略首先判断前两天的收盘价格关系,如果最近两天收盘价格出现反转(例如前一天收盘价上涨,前两天收盘价下跌),说明价格可能出现转折。  

   其次,该策略结合Stoch指标判断买卖时机。当Stoch快线低于某一水平(如50)而慢线高于快线时,认为行情超卖,产生买入信号;当Stoch快线高于某一水平(如50)而慢线低于快线时,认为行情超买,产生卖出信号。

   所以,123反转策略在判断出价格反转的同时,还需要Stoch指标验证,才会产生真正的买卖信号。

2. 超买超卖指标  

   超买超卖指标直接使用Stoch指标,当Stoch指标高于某一水平(如90)时,认为行情超买产生卖出信号;当Stoch指标低于某一水平(如20)时,认为行情超卖产生买入信号。

   该指标通过Stoch指标直接判断超买超卖区域,实现追踪趋势的效果。

最后,该策略将上述两种策略信号进行组合——当两种策略信号同向时,才会产生最终的买入或卖出信号,实现更准确地捕捉市场趋势。

## 策略优势分析

双重趋势追踪策略最大的优势在于能够同时验证价格趋势和超买超卖状况,避免交易信号产生错误。具体优势如下:

1. 组合两种策略信号,验证机制更稳健,可以减少因单一策略判断失误造成的亏损。

2. 123反转策略判断价格反转信号,可以及时捕捉潜在的趋势转折点。

3. 超买超卖指标可以验证目前的行情状况,避免追高杀跌。

4. 两种策略可以相互验证,避免交易信号发生错误,从而提高策略的稳定性。

5. 组合使用简单有效的指标,策略逻辑清晰易理解,便于实际应用。

## 策略风险分析

虽然该策略通过组合验证提高了稳定性,但仍存在一定的风险需要注意:  

1. 123反转策略无法完美判断价格反转点,可能会错过部分反转机会。可以适当调整参数,降低反转信号的判断门槛。

2. 超买超卖指标仅基于一个Stoch指标,可能会产生错误信号。可以加入移动平均线等指标进行验证。 

3. 两种策略信号可能会互相抵消,导致错过交易机会。可以适当调整参数,降低策略组合的条件约束。

4. 策略仅基于历史数据回测,实盘中参数需要不断测试优化。应添加止损机制控制亏损。

5. 不同品种和交易时间段参数需要独立测试优化,不可完全复用参数。

## 策略优化方向  

可以从以下几个方面继续优化该策略:

1. 对两种策略的参数进行优化,找到不同市场条件下的参数组合,形成参数池供优化程序选择。

2. 增加基于移动平均线、布林带等指标的过滤条件,避免错误信号。

3. 增加止损机制,如死加速止损、移动止损、时间止损等,控制策略的最大回撤。

4. 不同品种可以考虑加入对交易量或持仓数量的过滤,避免低流动性交易。 

5. 可以研究策略参数随时间变化的规律,采用机器学习方法自动优化参数。

6. 优化入场次数,避免在没有明确趋势的市场中高频交易。

## 总结

双重趋势追踪策略通过组合123反转策略和超买超卖指标,实现准确判断价格趋势反转的同时验证目前是否超买超卖,从而过滤掉错误信号,Capture实际趋势带来超额收益。相比单一指标策略,该策略稳定性和盈利能力更强。但仍需注意控制风险,适时止损。未来可以通过参数优化、增加过滤条件、自动化等方式继续提升策略表现。


||

## Overview

The Dual Trend Tracking strategy combines two different strategy signals to more accurately capture market trends and generate excess returns. It first uses the 123 reversal strategy to determine price reversal signals, and then combines the overbought-oversold indicator to determine position direction, tracking trends while avoiding being trapped.

## Strategy Logic

The strategy consists of two parts:

1. 123 Reversal Strategy

   The 123 reversal strategy first judges the closing price relationship between the previous two days. If the closing prices reversed recently (e.g. the closing price rose yesterday and fell the day before), it indicates a potential turning point.

   It then combines the Stoch indicator to determine buy and sell timing. When the Stoch fast line is below a certain level (e.g. 50) and the slow line is above the fast line, it is considered oversold and generates a buy signal. When the Stoch fast line is above a certain level (e.g. 50) and the slow line is below the fast line, it is considered overbought and generates a sell signal.

   So the 123 reversal strategy requires confirmation from the Stoch indicator in addition to identifying price reversal to generate actual trading signals.

2. Overbought/Oversold Indicator

   The overbought/oversold indicator directly uses the Stoch indicator. When the Stoch indicator is above a certain level (e.g. 90), it is considered overbought and generates a sell signal. When the Stoch indicator is below a certain level (e.g. 20), it is considered oversold and generates a buy signal.

   This indicator judges overbought/oversold levels directly through the Stoch indicator to track trends.

Finally, the strategy combines the signals from the two strategies - only when the signals are in the same direction will final buy or sell signals be generated to more accurately capture market trends.

## Advantage Analysis

The biggest advantage of the Dual Trend Tracking strategy is that it can verify both price trends and overbought/oversold conditions to avoid wrong trading signals. Specific advantages:

1. Combining two strategy signals provides more robust verification and reduces losses caused by errors in a single strategy.

2. The 123 reversal strategy can capture potential trend reversal points in a timely manner.

3. The overbought/oversold indicator can verify current market conditions and avoid chasing highs and selling lows.

4. The two strategies can verify each other to avoid wrong signals, improving stability.

5. It combines simple and effective indicators with clear logic that is easy to understand and apply.

## Risk Analysis

Although the strategy improves stability through combined verification, some risks still exist:

1. The 123 reversal strategy cannot perfectly identify reversal points and may miss some opportunities. Fine-tune parameters to lower the reversal signal threshold.

2. The overbought/oversold indicator relies solely on one Stoch indicator and may generate false signals. Add MA lines etc. for verification.

3. The two strategy signals may cancel each other out and miss opportunities. Adjust parameters to reduce constraints.

4. The strategy is only backtested on historical data. Parameters need continuous optimization in live trading. Add stop loss mechanisms to control losses.

5. Parameters need independent testing and optimization for different products and trading periods. Do not directly copy parameters.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Optimize parameters for both strategies to form parameter pools for optimization programs to select from under different market conditions.

2. Add filter conditions based on MA, Bollinger Bands etc. to avoid wrong signals. 

3. Add stop loss mechanisms such as trailing stop loss, move stop loss, time stop loss etc. to control maximum drawdown.

4. Consider adding filters on volume or positions for different products to avoid low liquidity.

5. Study the evolution of parameters over time and use machine learning to automatically optimize.

6. Optimize entry frequency to avoid overtrading in trendless markets. 

## Conclusion

The Dual Trend Tracking strategy accurately identifies trend reversals while verifying overbought/oversold levels by combining the 123 reversal and overbought/oversold strategies. This filters out wrong signals and captures actual trends for excess returns. It is more stable and profitable than single indicator strategies. But risks should be managed via timely stop loss. Future improvements can be made through parameter optimization, adding filters, automation etc.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Overbought/Oversold ----|
|v_input_7|10|LengthOO|
|v_input_8|0.92|BuyBand|
|v_input_9|0.5|SellBand|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-20 00:00:00
end: 2023-09-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 30/03/2021
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
// Simple Overbought/Oversold indicator
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


OO(Length,BuyBand,SellBand) =>
    pos = 0.0
    xOBOS = stoch(close, high, low, Length)
    nRes = iff(close > close[Length], xOBOS / 100, (100 - xOBOS) / 100)
    pos :=iff(nRes < SellBand, -1,
           iff(nRes > BuyBand, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Overbought/Oversold", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Overbought/Oversold ----")
LengthOO = input(10, minval=1)
BuyBand = input(0.92, step = 0.01)
SellBand = input(0.5, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posOO = OO(LengthOO,BuyBand,SellBand)
pos = iff(posReversal123 == 1 and posOO == 1 , 1,
	   iff(posReversal123 == -1 and posOO == -1, -1, 0)) 
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

https://www.fmz.com/strategy/427985

> Last Modified

2023-09-27 16:14:25
