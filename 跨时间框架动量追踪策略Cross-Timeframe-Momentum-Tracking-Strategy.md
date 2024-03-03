
> Name

跨时间框架动量追踪策略Cross-Timeframe-Momentum-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d3f3ee7221410dfeb8.png)
[trans]
## 概述

本策略通过结合123反转和MACD指标,实现了跨时间框架的动量追踪。123反转判断短期趋势反转点,MACD判断中长期趋势,两者结合实现在短期反转的同时锁定中长期趋势的多空信号。

## 策略原理

该策略由两部分组成:

1. 123反转部分:当前两根K线形成高点/低点,并且随机指标低于/高于50时产生买入/卖出信号。

2. MACD部分:快线上穿慢线时产生买入信号,快线下穿慢线时产生卖出信号。

最后将两者结合,即在123反转的同时MACD也产生同向信号时,发出最终信号。

## 优势分析

该策略结合了短期反转和中长期趋势,可以在短期波动中锁定中长期趋势,从而获得更高的胜率。特别是在震荡行情中,可以通过123反转过滤掉部分噪音,从而提高稳定性。

另外通过调整参数,可以平衡反转信号和趋势信号的比例,适应不同市场环境。

## 风险分析

该策略有一定的时间滞后,特别是使用长周期MACD时,可能错过短期行情。此外,反转信号本身就存在一定程度的随机性,容易被套住。

可以适当缩短MACD周期,或增加止损来控制风险。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 调整123反转参数,优化反转效果

2. 调整MACD参数,优化趋势判断

3. 增加其它辅助指标过滤,提高效果

4. 增加止损策略,控制风险

## 总结

本策略整合多种参数和多个时间框架的技术指标,通过跨时间框架动量追踪,平衡了反转交易和趋势交易的优点。可通过参数调整平衡效果,并可引入更多指标或止损来进行优化,是一个非常有潜力的策略思路。

||

## Overview

This strategy combines the 123 reversal and MACD indicators to achieve cross-timeframe momentum tracking. The 123 reversal determines short-term trend reversal points, and the MACD determines medium- and long-term trends. The combination generates long/short signals that lock in medium- and long-term trends while capturing short-term reversals.

## Strategy Logic

The strategy consists of two parts:

1. 123 reversal part: it generates buy/sell signals when the last two candlesticks form a peak/trough AND the Stochastics oscillator is below/above 50.

2. MACD part: it generates buy signals when the MACD line crosses above the signal line, and sell signals when it crosses below.

The final signal is triggered when both parts agree on the direction of the trade.

## Advantage Analysis  

The strategy combines short-term reversals and medium- to long-term trends, allowing it to lock in trended moves. This improves win rates, especially in ranging markets where the 123 reversal helps filter out noise.

Parameters can also be tuned to balance reversal and trend signals for different market conditions.

## Risk Analysis

The strategy has some time lag, especially with longer MACD periods, which may cause missing short-term moves. Reversals also have some degree of randomness, leading to whipsaws.  

Shortening the MACD period or adding stops can help control risks.

## Optimization Directions

Possible ways to optimize the strategy:

1. Tune 123 reversal parameters to improve reversals.

2. Tune MACD parameters to improve trend identification.   

3. Add filters with other indicators to improve performance.

4. Add stop loss to control risks.

## Conclusion

The strategy combines parameters across timeframes along with multiple technical indicators for cross-timeframe momentum tracking, balancing the pros of reversal and trend-following strategies. Parameter tuning and more indicators or stops can further optimize it. The concept has great potential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|8|fastLength|
|v_input_7|16|slowLength|
|v_input_8|11|signalLength|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 28/01/2021
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
// MACD – Moving Average Convergence Divergence. The MACD is calculated 
// by subtracting a 26-day moving average of a security's price from a 
// 12-day moving average of its price. The result is an indicator that 
// oscillates above and below zero. When the MACD is above zero, it means 
// the 12-day moving average is higher than the 26-day moving average. 
// This is bullish as it shows that current expectations (i.e., the 12-day 
// moving average) are more bullish than previous expectations (i.e., the 
// 26-day average). This implies a bullish, or upward, shift in the supply/demand 
// lines. When the MACD falls below zero, it means that the 12-day moving average 
// is less than the 26-day moving average, implying a bearish shift in the 
// supply/demand lines.
// A 9-day moving average of the MACD (not of the security's price) is usually 
// plotted on top of the MACD indicator. This line is referred to as the "signal" 
// line. The signal line anticipates the convergence of the two moving averages 
// (i.e., the movement of the MACD toward the zero line).
// Let's consider the rational behind this technique. The MACD is the difference 
// between two moving averages of price. When the shorter-term moving average rises 
// above the longer-term moving average (i.e., the MACD rises above zero), it means 
// that investor expectations are becoming more bullish (i.e., there has been an 
// upward shift in the supply/demand lines). By plotting a 9-day moving average of 
// the MACD, we can see the changing of expectations (i.e., the shifting of the 
// supply/demand lines) as they occur.
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

MACD(fastLength,slowLength,signalLength) =>
    pos = 0.0
    fastMA = ema(close, fastLength)
    slowMA = ema(close, slowLength)
    macd = fastMA - slowMA
    signal = sma(macd, signalLength)
    pos:= iff(signal < macd , 1,
	       iff(signal > macd, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & MACD Crossover", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
fastLength = input(8, minval=1)
slowLength = input(16,minval=1)
signalLength=input(11,minval=1)
xSeria = input(title="Source", type=input.source, defval=close)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMACD = MACD(fastLength,slowLength, signalLength)
pos = iff(posReversal123 == 1 and posMACD == 1 , 1,
	   iff(posReversal123 == -1 and posMACD == -1, -1, 0)) 
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

https://www.fmz.com/strategy/440677

> Last Modified

2024-02-01 10:21:09
