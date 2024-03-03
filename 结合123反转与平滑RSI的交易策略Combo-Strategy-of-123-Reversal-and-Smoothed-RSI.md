
> Name

结合123反转与平滑RSI的交易策略Combo-Strategy-of-123-Reversal-and-Smoothed-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1352252d150b14addeb.png)

[trans]

## 概述

该策略通过结合123反转形态与平滑RSI指标,实现更准确地捕捉趋势反转点,以获得更高的胜率。策略可用于任何周期的任何品种,是一种非常通用的趋势反转交易策略。

## 策略原理

1. 123反转形态判断:当前两日收盘价构成高低点,第三日收盘价高于前一日收盘价时,为底部反转信号;当前两日收盘价构成低高点,第三日收盘价低于前一日收盘价时,为顶部反转信号。

2. 平滑RSI指标判断:平滑RSI指标通过加权移动平均的方法,减少RSI指标的滞后性。当RSI指标上穿设定的高位阈值线时,为买入信号;当RSI指标下穿设定的低位阈值线时,为卖出信号。

3. 策略信号:只有当123反转形态信号和平滑RSI指标信号同向时,才产生交易信号。做多信号为123反转形成底部信号且RSI指标上穿高位;做空信号为123反转形成顶部信号且RSI指标下穿低位。

## 策略优势

1. 将趋势判断指标RSI与反转形态结合,可更准确判断趋势反转点。

2. 平滑RSI指标通过平滑处理,可减少普通RSI指标的滞后性问题。

3. 123反转形态简单清晰,容易判断实现。

4. 可灵活调整参数,适用于不同品种和周期,使用范围广泛。

5. 可方便优化和改进,有很高的拓展空间。

## 策略风险

1. 123反转形态较为简单,对小波段调整不敏感,可能产生虚假信号。 

2. 平滑RSI指标优化程度不够,调参数容易过优化。

3. 需要反转形态和RSI指标同向才产生信号,信号产生频率可能不高。

4. 未考虑交易成本,小资金可能难以盈利。

5. 缺乏止损机制,无法控制单笔损失。

## 策略优化方向

1. 优化平滑RSI参数,找到最佳的参数组合。

2. 添加其他指标或形态进行过滤,提高信号质量。

3. 添加止损机制,控制单笔损失。

4. 考虑交易成本,调整参数以适应不同资金量。 

5. 测试不同品种和周期的参数设置,寻找最优参数组合。

6. 增加自动参数优化功能。

## 总结

该策略整体思路清晰简单,通过反转形态结合趋势判断指标,可有效判断潜在的趋势反转点。策略优势在于可广泛适用和方便优化,但也存在一定的风险,需要注意防范并持续优化。整体来说,该策略是一种通用且实用的短线反转交易策略,值得深入研究与应用。

||


## Overview

This strategy combines the 123 reversal pattern and smoothed RSI indicator to capture trend reversal points more accurately for higher win rate. It is a very versatile trend reversal trading strategy that can be applied to any timeframe and instrument.

## Strategy Logic

1. 123 reversal pattern identification: Bottom reversal signal when the close prices of previous two days form a high-low point and third day's close is higher than previous day. Top reversal signal when close prices of previous two days form a low-high point and third day's close is lower than previous day.

2. Smoothed RSI indicator: Smoothed RSI reduces the lag of normal RSI by using weighted moving average. RSI crossing above the high threshold is buy signal. RSI crossing below the low threshold is sell signal.

3. Strategy signal: Trade signal is only generated when 123 reversal pattern and smoothed RSI signals agree. Buy when 123 reversal shows bottom and RSI crosses high level. Sell when 123 reversal forms top and RSI crosses low level.

## Advantages

1. Combining trend indicator RSI and reversal pattern can accurately identify trend reversal points. 

2. Smoothed RSI reduces the lagging issue of normal RSI.

3. 123 reversal pattern is simple and easy to identify. 

4. Flexible parameters can be adjusted for different instruments and timeframes.

5. Easy to optimize and improve with high extensibility.

## Risks

1. Simple 123 reversal may cause false signals during minor pullbacks.

2. Smoothed RSI optimization is insufficient and prone to overfitting.

3. Dual confirmation leads to fewer trade signals.

4. Trading costs are ignored which may prevent small accounts from profiting. 

5. No stop loss mechanism to limit downside.

## Enhancement

1. Optimize smoothed RSI parameters to find best combination.

2. Add other indicators or patterns for signal filtering. 

3. Implement stop loss to control single trade loss.

4. Consider trading costs, adjust parameters for different capital sizes.

5. Test parameters across different instruments and timeframes for optimal parameters.

6. Add functionality for auto parameter optimization.

## Summary

The strategy has clear and simple logic, using reversal pattern combined with trend indicator to identify potential trend reversals. It has the advantage of wide applicability and easy optimization, but also has some risks to note and improve on. Overall it is a versatile and practical short-term reversal trading strategy worthy of further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Smoothed RSI ----|
|v_input_7|10|LengthRSI|
|v_input_8|0.8|TopBand|
|v_input_9|0.2|LowBand|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-10-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/07/2021
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
// This is new version of RSI oscillator indicator, developed by John Ehlers. 
// The main advantage of his way of enhancing the RSI indicator is smoothing 
// with minimum of lag penalty. 
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


SRSI(Length, TopBand,LowBand) =>
    pos = 0.0
    xValue = (close + 2 * close[1] + 2 * close[2] + close[3] ) / 6
    CU23 = sum(iff(xValue > xValue[1], xValue - xValue[1], 0), Length)
    CD23 = sum(iff(xValue < xValue[1], xValue[1] - xValue, 0), Length)
    nRes = iff(CU23 + CD23 != 0, CU23/(CU23 + CD23), 0)
    pos:= iff(nRes > TopBand, 1,
    	   iff(nRes < LowBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Smoothed RSI", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Smoothed RSI ----")
LengthRSI = input(10, minval=1)
TopBand = input(0.8, step=0.01)
LowBand = input(0.2, step=0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posSRSI = SRSI(LengthRSI, TopBand,LowBand )
pos = iff(posReversal123 == 1 and posSRSI == 1 , 1,
	   iff(posReversal123 == -1 and posSRSI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/429392

> Last Modified

2023-10-16 16:27:32
