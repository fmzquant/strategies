
> Name

量化交易反转趋势串并T3-CCI策略Quantitative-Trading-Reversal-Trend-Combo-T3-CCI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1696cb77142639c95d5.png)
[trans]

### 概述

本策略通过组合使用反转趋势策略和T3-CCI指标,实现在市场反转点位发出交易信号,属于短线量化交易策略。

### 策略原理

1. 反转趋势策略部分:使用2日收盘价比较判断价格反转信号,结合9日慢线K线指标判断超买超卖区域,发出做多做空信号。

2. T3-CCI部分:使用T3均线做CCI指标的再平滑,减少错误信号,判断超买超卖区域,配合反转趋势策略过滤入场时机。

两部分信号综合判定最终交易方向。

### 优势分析

1. 使用两种指标和价格比较判断,可有效识别潜在反转点位。

2. T3均线的应用提高CCI信号的质量,减少假信号。

3. 组合使用不同类型策略,可望提高策略整体稳定性。

### 风险分析

1. 反转失败的情况下,会产生错误信号和损失。需要及时止损控制风险。

2. 参数设置不当也会影响策略表现,需要根据不同市场调整参数。

3. 反转信号时效性较差,无法及时捕捉快速反转。

### 优化方向

1. 增加趋势过滤,避免反转失败带来损失。

2. 尝试机器学习方法自动优化参数。

3. 增加止损机制。

4. 探索更加高效判断反转时机的指标。


### 总结

本策略综合运用多种技术指标判断潜在反转点位。可有效发掘市场反转机会,属于适合短线操作的量化策略。通过参数调整、止损保护、与趋势判断的组合等多种优化手段,可望进一步增强策略稳定性。

||

### Overview 

This strategy combines the use of reversal trend strategy and T3-CCI indicator to generate trading signals at market reversal points. It belongs to short-term quantitative trading strategies.

### Strategy Principle

1. Reversal Trend Strategy Part: Use 2-day close price comparison to judge price reversal signals, combined with 9-day slow K-line indicator to determine overbought and oversold areas, and generate long and short signals.

2. T3-CCI Part: Use T3 moving average to resmooth the CCI indicator to reduce false signals and determine overbought and oversold areas. It is used together with the reversal trend strategy to filter entry timing.

The final trading direction is determined by the integrated signals from both parts.

### Advantage Analysis

1. Using two types of indicators and price comparisons can effectively identify potential reversal points.

2. The application of T3 moving average improves the quality of CCI signals and reduces false signals. 

3. The combined use of different types of strategies can be expected to improve the overall stability of the strategy.

### Risk Analysis  

1. In case of reversal failure, it will generate wrong signals and losses. Timely stop loss is required to control risks.

2. Improper parameter settings will also affect strategy performance. Parameters need to be adjusted according to different markets.

3. Reversal signals have poor timeliness and cannot capture rapid reversals in time.

### Optimization Directions

1. Increase trend filtering to avoid losses caused by reversal failures.

2. Try machine learning methods to automatically optimize parameters. 

3. Increase stop loss mechanism.

4. Explore more efficient indicators to judge reversal timing.

### Summary

This strategy combines multiple technical indicators to judge potential reversal points. It can effectively tap market reversal opportunities and is suitable for short-term operations. Through measures such as parameter adjustment, stop loss protection, combination with trend judgment and other optimization methods, the stability of the strategy can be further enhanced.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|CCI_Period|
|v_input_6|5|T3_Period|
|v_input_7|0.618|b|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 23/10/2020
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
// This simple indicator gives you a lot of useful information - when to enter, when to exit
// and how to reduce risks by entering a trade on a double confirmed signal.
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
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

    
T3_CCI(CCI_Period,T3_Period,b) =>
    pos = 0.0
    e1 = 0.0
    e2 = 0.0
    e3 = 0.0
    e4 = 0.0
    e5 = 0.0
    e6 = 0.0
    xPrice = close
    b2 = b*b
    b3 = b2*b
    c1 = -b3
    c2 = (3*(b2 + b3))
    c3 = -3*(2*b2 + b + b3)
    c4 = (1 + 3*b + b3 + 3*b2)
    nn = iff(T3_Period < 1, 1, T3_Period)
    nr = 1 + 0.5*(nn - 1)
    w1 = 2 / (nr + 1)
    w2 = 1 - w1    
    xcci = cci(xPrice, CCI_Period)
    e1 := w1*xcci + w2*nz(e1[1])
    e2 := w1*e1 + w2*nz(e2[1])
    e3 := w1*e2 + w2*nz(e3[1])
    e4 := w1*e3 + w2*nz(e4[1])
    e5 := w1*e4 + w2*nz(e5[1])
    e6 := w1*e5 + w2*nz(e6[1])
    xccir = c1*e6 + c2*e5 + c3*e4 + c4*e3  
    pos:= iff(xccir > 0, 1,
           iff(xccir < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & FX Sniper:  T3-CCI", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
CCI_Period = input(14, minval=1)
T3_Period = input(5, minval=1)
b = input(0.618)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posT3_CCI = T3_CCI(CCI_Period,T3_Period,b)
pos = iff(posReversal123 == 1 and posT3_CCI == 1 , 1,
	   iff(posReversal123 == -1 and posT3_CCI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/436987

> Last Modified

2023-12-29 10:44:31
