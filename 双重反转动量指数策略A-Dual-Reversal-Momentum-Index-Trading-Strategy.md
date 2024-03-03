
> Name

双重反转动量指数策略A-Dual-Reversal-Momentum-Index-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/910b5e83cf4672585e.png)
[trans]
## 概述

双重反转动量指数策略是一种结合了123反转策略和相对动量指数(RMI)策略的组合策略。它旨在通过利用双重信号提高交易决策的准确性。

## 策略原理

该策略由两部分组成:

1. 123反转策略

    - 当昨日收盘价低于前日,今日收盘价高于前日,且9日Slow K线低于50时,做多
    - 当昨日收盘价高于前日,今日收盘价低于前日,且9日Fast K线高于50时,做空

2. 相对动量指数(RMI)策略

    - RMI是在RSI的基础上加入了动量因素的变种。它计算公式为:RMI = (上行动量SMA)/(下行动量SMA) * 100
    - 当RMI低于超买线时,做多;当RMI高于超卖线时,做空

该组合策略只有当123反转和RMI双重信号同向发出时,才会产生交易信号。这可以有效减少错误交易的机会。

## 策略优势分析

该策略具有以下优势:

1. 结合双重指标,提高信号准确性
2. 利用反转策略,适合震荡行情
3. RMI指标灵敏,可以识别强势趋势的转折点

## 策略风险分析

该策略也存在一些风险:

1. 双重过滤会错过部分交易机会
2. 反转信号可能出现误判
3. RMI参数设置不当会影响效果

可以通过调整参数组合、优化指标计算方式来降低这些风险。

## 策略优化方向

该策略还可以从以下几个方面进行优化:

1. 测试不同的参数组合,找到最佳参数
2. 尝试不同的反转指标组合,如KDJ、MACD等
3. 对RMI公式进行调整,使其更灵敏
4. 添加止损机制,控制单笔损失
5. 结合交易量,避免虚假信号

## 总结

双重反转动量指数策略通过双重信号过滤和参数优化,能够有效地提高交易决策的准确性,降低错误信号的概率。它适用于震荡行情,能挖掘反转机会。该策略可以通过调整参数和优化指标计算方式来进一步增强效果和 laps 风险。

||

## Overview

The Dual Reversal Momentum Index strategy combines a 123 Reversal strategy and a Relative Momentum Index (RMI) strategy. It aims to improve the accuracy of trading decisions by utilizing dual signals.

## Strategy Principle 

The strategy consists of two parts:

1. 123 Reversal Strategy

    - Long when yesterday's close is lower than the previous day's and today's close is higher than the previous day's, and 9-day Slow K is lower than 50
    - Short when yesterday's close is higher than the previous day's and today's close is lower than the previous day's, and 9-day Fast K is higher than 50

2. Relative Momentum Index (RMI) Strategy

    - RMI is a variation of RSI with a momentum component added. Its formula is: RMI = (Upward Momentum SMA)/(Downward Momentum SMA)*100  
    - Long when RMI is lower than the overbought line; Short when RMI is higher than the oversold line

The strategy only generates trading signals when the 123 Reversal and RMI give aligned dual signals. This can effectively reduce the chance of erroneous trades.

## Advantage Analysis

The advantages of this strategy include:

1. Improved signal accuracy with dual indicators  
2. Reversal techniques suitable for range-bound markets
3. Sensitive RMI to identify turning points of strong trends  

## Risk Analysis

There are also some risks:

1. Dual filters may miss some trading opportunities  
2. Reversal signals could have misjudgments
3. Improper RMI parameter settings may affect efficiency

These risks could be reduced by adjusting parameters, optimizing indicator calculations.

## Optimization Directions

The strategy can be further optimized through:

1. Testing different parameter combinations to find the optimum
2. Trying different reversal indicator combinations e.g. KDJ, MACD
3. Adjusting RMI formula to make it more sensitive 
4. Adding stop loss mechanisms to control single loss
5. Combining trading volume to avoid false signals

## Conclusion

The Dual Reversal Momentum Index strategy can effectively improve the accuracy of trading decisions and reduce the chance of erroneous signals through dual signal filtering and parameter optimization. It is suitable for range-bound markets to uncover reversal opportunities. The strategy can be further enhanced by adjusting parameters and optimizing indicator calculations to lower risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Relative Momentum Index ----|
|v_input_7|20|LengthRMI|
|v_input_8|40|BuyZone|
|v_input_9|70|SellZone|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 07/06/2021
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
// The Relative Momentum Index (RMI) was developed by Roger Altman. Impressed 
// with the Relative Strength Index's sensitivity to the number of look-back 
// periods, yet frustrated with it's inconsistent oscillation between defined 
// overbought and oversold levels, Mr. Altman added a momentum component to the RSI.
// As mentioned, the RMI is a variation of the RSI indicator. Instead of counting 
// up and down days from close to close as the RSI does, the RMI counts up and down 
// days from the close relative to the close x-days ago where x is not necessarily 
// 1 as required by the RSI). So as the name of the indicator reflects, "momentum" is 
// substituted for "strength". 
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


RMI(Length,BuyZone, SellZone) =>
    pos = 0.0
    xMU = 0.0
    xMD = 0.0
    xPrice = close
    xMom = xPrice - xPrice[Length]
    xMU := iff(xMom >= 0, nz(xMU[1], 1) - (nz(xMU[1],1) / Length) + xMom, nz(xMU[1], 1))
    xMD := iff(xMom <= 0, nz(xMD[1], 1) - (nz(xMD[1],1) / Length) + abs(xMom), nz(xMD[1], 0))
    RM = xMU / xMD
    nRes = 100 * (RM / (1+RM))
    pos:= iff(nRes < BuyZone, 1,
    	   iff(nRes > SellZone, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Relative Momentum Index", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Relative Momentum Index ----")
LengthRMI = input(20, minval=1)
BuyZone = input(40, minval=1)
SellZone = input(70, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posRMI = RMI(LengthRMI,BuyZone, SellZone)
pos = iff(posReversal123 == 1 and posRMI == 1 , 1,
	   iff(posReversal123 == -1 and posRMI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/441133

> Last Modified

2024-02-06 09:29:34
