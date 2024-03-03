
> Name

双向逆转重叠优选策略Dual-Reversal-Overlap-Selective-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fb1c725ca92b7921b7.png)

[trans]

## 概述

双向逆转重叠优选策略(Dual Reversal Overlap Selective Strategy)通过结合反转交易策略和超买超卖筛选来实现资产配置和择时交易。该策略旨在在趋势反转点进行买入和卖出操作,同时利用超买超卖指标避免非理性扩张区域的不必要交易。

## 策略原理

该策略由两个子策略叠加组成:

1. 123反转策略

该策略基于连续两天收盘价格反转的交易信号。具体来说,如果最近两天收盘价格出现上涨,且9天慢速K线stoch值低于50,则做多;如果最近两天收盘价格出现下跌,且9天快速K线stoch值高于50,则做空。该策略属于反转策略,旨在捕捉短期趋势反转。

2. 布列萨特双平滑震荡指标策略 (DSS)

该策略利用布列萨特双平滑震荡指标实现超买超卖的判断。具体来说,如果5日均线低于10日均线且低于20的超卖区,则做多;如果5日均线高于10日均线且高于80的超卖区,则做空。该策略属于超买超卖策略,旨在避免非理性区域的不必要交易。

最终信号由两者综合产生,只有当两者给出一致信号时才会触发交易。这样可以提高获利概率,利用两种不同类型策略的优势进行组合。

## 策略优势分析

1. 结合反转策略和超买超卖策略的优点,既可以捕捉短期趋势反转,又可以避免非理性区域交易。

2. 123反转策略参数较少,逻辑简单,容易实施。DSS策略利用双指数平滑实现超买超卖判断,可以有效滤除多头市场中的空头信号,空头市场中的多头信号。

3. 两种不同类型策略组合,可以提高信号的可靠性,减少原策略的假信号。

4. 灵活的策略参数设定,可以根据不同市场调整参数,适应性强。

## 策略风险分析

1. 反转策略本身存在“捡钱币”风险,容易在震荡市场中被套牢。

2. DSS策略存在参数优化难度较大的问题,不同参数对结果影响较大。

3. 两种策略信号不一致时,存在错失交易机会的风险。

4. 策略仅基于简单的价格指标,缺乏综合判断,存在一定的盈利限制。

对应解决方法:

1. 适当缩短持仓周期,降低套牢风险。

2. 借鉴成功案例精心测试参数组合,针对特定市场优化参数。 

3. 考虑加入其他辅助判断指标,提升策略效果。

4. 优化入场timing,或者调整持仓比例。

## 策略优化方向 

1. 测试并加入其他反转指标或形态判断,提升反转信号的准确性。

2. 尝试其他超买超卖指标替代DSS,如能量潮、RSI等。

3. 加入止损策略,以锁定利润和减少亏损。

4. 优化参数设置,测试不同市场下的最佳参数组合。

5. 探索动态调整参数以适应市场变化的可能性。

6. 构建机器学习模型辅助生成交易信号。

## 总结

双向逆转重叠优选策略通过反转策略和超买超卖策略的组合,实现了资产配置和择时交易双重功能。策略具有参数灵活、逻辑简单、容易实施等优势,可以有效滤除非理性区域的噪音交易。但也存在一定的反转风险和参数优化难点。未来可通过加入止损、优化参数设置、引入机器学习等方法进行策略增强。总体来说,该策略为量化交易提供了一个灵活可靠的技术分析方案。

||


## Overview

The Dual Reversal Overlap Selective Strategy combines reversal trading strategies with overbought-oversold filters to achieve asset allocation and timing trading. It aims to take long and short positions at trend reversal points while avoiding unnecessary trades in irrational extended zones using overbought-oversold indicators.

## Strategy Logic

The strategy consists of two overlapping sub-strategies:

1. 123 Reversal Strategy  

This strategy uses reversal signals based on two consecutive days of closing price reversal. Specifically, it goes long if closing prices rise over the last two days and the 9-day slow stochastic is below 50, and goes short if closing prices fall over the last two days and the 9-day fast stochastic is above 50. This reversal strategy aims to capture short-term trend reversals.

2. DSS Oscillator Strategy

This strategy uses the DSS oscillator for overbought-oversold analysis. It goes long if the 5-day MA is below the 10-day MA and the 20 oversold level, and goes short if the 5-day MA is above the 10-day MA and the 80 overbought level. This overbought-oversold strategy helps avoid unnecessary trades in irrational zones. 

The final signal is generated only when both strategies agree. This improves profitability by combining the strengths of the two strategy types.

## Advantage Analysis

1. Combines the advantages of reversal and overbought-oversold strategies - catching short-term reversals while avoiding irrational zone trades.

2. Simple logic and few parameters make 123 reversal easy to implement. DSS uses double smoothing for robust overbought-oversold analysis. 

3. Combination improves signal reliability by reducing false signals.

4. Flexible parameter tuning adapts the strategy to different markets.

## Risk Analysis

1. Reversal strategies have "picking up pennies" risk and whipsaw in ranging markets.

2. DSS optimization is difficult and sensitive to parameters.

3. Divergent signals may miss trading opportunities. 

4. Simple price indicators limit profitability.

Solutions:

1. Shorten holding periods to reduce whipsaw risk.

2. Careful parameter tuning based on successful examples.

3. Add filters to improve strategy. 

4. Optimize entry timing or position sizing.

## Enhancement Directions

1. Test other reversal indicators to improve signal accuracy.

2. Explore alternative overbought-oversold indicators like RSI. 

3. Add stop loss to lock in profits and limit losses.

4. Optimize parameters for different markets.

5. Consider dynamic parameter adjustment.

6. Build machine learning models to generate signals.

## Conclusion

The Dual Reversal Overlap Selective Strategy provides both asset allocation and timing trading functionality through combining reversal and overbought-oversold strategies. It has advantages like flexible parameters, simple logic, and easy implementation, effectively filtering out noise trades in irrational zones. But limitations exist like reversal risks and parameter optimization difficulties. Future enhancements can come from adding stop loss, parameter optimization, machine learning incorporation etc. Overall, it provides a robust quantitative trading solution.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|10|PDS|
|v_input_6|9|EMAlen|
|v_input_7|5|TriggerLen|
|v_input_8|80|Overbought|
|v_input_9|20|Oversold|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-25 00:00:00
end: 2023-10-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/03/2020
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
// Double Smoothed Stochastics (DSS) is designed by William Blaw. 
// It attempts to combine moving average methods with oscillator principles. 
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

DSSB(PDS, EMAlen,TriggerLen,Overbought,Oversold) =>
    pos = 0
    xPreCalc = ema(stoch(close, high, low, PDS), EMAlen)
    xDSS = ema(stoch(xPreCalc, xPreCalc, xPreCalc, PDS), EMAlen)
    xTrigger = ema(xDSS, TriggerLen)
    pos := iff(xTrigger < xDSS and xTrigger < Oversold, -1,
	         iff(xTrigger > xDSS and xTrigger > Overbought, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & DSS Bressert", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
PDS = input(10, minval=1)
EMAlen = input(9, minval=1)
TriggerLen = input(5, minval=1)
Overbought = input(80, minval=1)
Oversold = input(20, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posDSS = DSSB(PDS, EMAlen,TriggerLen,Overbought,Oversold)
pos = iff(posReversal123 == 1 and posDSS == 1 , 1,
	   iff(posReversal123 == -1 and posDSS == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430268

> Last Modified

2023-10-26 16:56:56
