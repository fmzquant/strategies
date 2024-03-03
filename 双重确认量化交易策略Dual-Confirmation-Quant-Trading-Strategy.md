
> Name

双重确认量化交易策略Dual-Confirmation-Quant-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e9ca402db1be753df7.png)
 [trans]

## 概述

双重确认量化交易策略通过结合123反转策略和百分比成交量震荡指标(PVO)两个子策略,实现对交易信号的双重确认,降低交易风险。该策略主要适用于中长线持仓交易。

## 策略原理

### 123反转策略

123反转策略基于随机指标K线形态实现。具体来说,当收盘价连续2天低于前一日收盘价,并且9日慢速随机指标低于50时做多;当收盘价连续2天高于前一日收盘价,并且9日快速随机指标高于50时做空。

### 百分比成交量震荡指标(PVO)

PVO是基于成交量的动量震荡指标。它测量两个不同周期成交量指数移动平均线的差值与较长周期平均线的比值,以百分比的形式表示。当短周期平均线高于长周期平均线时为正,反之为负。该指标反映成交量的涨跌态势。

## 优势分析

该策略结合价格指标和成交量指标,能够有效过滤假突破。同时通过双重确认机制,可以减少交易频率,降低交易风险。

## 风险分析

该策略依赖较长的持仓周期,存在回撤风险。此外,参数设置不当也会导致交易频率过高或信号错失。

## 优化方向

可以通过调整随机指标和PVO的参数,优化子策略的表现。也可以引入止损机制来控制风险。此外,结合其他指标过滤信号可以进一步提高策略稳定性。

## 总结

双重确认量化交易策略综合考虑了价格和成交量因素,回测效果理想。通过参数调优和优化信号过滤,该策略有望进一步增强稳定性,成为量化交易的有力工具。

||

## Overview

The dual confirmation quant trading strategy realizes double confirmation of trading signals by combining the 123 reversal strategy and the Percentage Volume Oscillator (PVO) sub-strategies to reduce trading risk. This strategy is mainly suitable for medium and long-term position holding trading.

## Trading Principles  

### 123 Reversal Strategy

The 123 reversal strategy is based on K-line patterns implemented by the Stochastic indicator. Specifically, it goes long when the closing price is lower than the previous day's closing price for two consecutive days and the 9-day slow Stochastic is below 50; it goes short when the closing price is higher than the previous day's closing price for two consecutive days and the 9-day fast Stochastic is above 50.

### Percentage Volume Oscillator (PVO)  

PVO is a momentum oscillator based on volume. It measures the difference between two exponential moving averages of volume over different periods as a percentage of the longer period average. It is positive when the shorter period EMA is above the longer period EMA and negative when the shorter period EMA is below. This indicator reflects the ups and downs of trading volume.

## Advantage Analysis   

This strategy combines price and volume indicators to effectively filter false breaks. At the same time, by using the dual confirmation mechanism, it can reduce the frequency of transactions and lower trading risks.

## Risk Analysis  

This strategy relies on longer holding periods, with the risk of drawdowns. In addition, improper parameter settings can also lead to over-trading or missing signals.  

## Optimization Directions

The performance of sub-strategies can be optimized by adjusting the parameters of Stochastic and PVO. Stop loss mechanisms can also be introduced to control risks. In addition, filtering signals with other indicators can further improve the stability of the strategy.  

## Conclusion  

The dual confirmation quant trading strategy takes into account both price and volume factors with good backtest results. Through parameter tuning and optimizing signal filtering, this strategy has the potential to further enhance stability and become a powerful tool for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Percentage Volume OscillatorA ----|
|v_input_7|12|LengthShortEMA|
|v_input_8|26|LengthLongEMA|
|v_input_9|9|LengthSignalEMA|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-07 00:00:00
end: 2024-01-14 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 14/04/2021
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
// The Percentage Volume Oscillator (PVO) is a momentum oscillator for volume. 
// PVO measures the difference between two volume-based moving averages as a 
// percentage of the larger moving average. As with MACD and the Percentage Price 
// Oscillator (PPO), it is shown with a signal line, a histogram and a centerline. 
// PVO is positive when the shorter volume EMA is above the longer volume EMA and 
// negative when the shorter volume EMA is below. This indicator can be used to define 
// the ups and downs for volume, which can then be use to confirm or refute other signals. 
// Typically, a breakout or support break is validated when PVO is rising or positive. 
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


PVO(LengthShortEMA,LengthLongEMA,LengthSignalEMA) =>
    pos = 0.0
    xShortEMA = ema(volume , LengthShortEMA)
    xLongEMA = ema(volume , LengthLongEMA)
    xPVO = ((xShortEMA - xLongEMA) / xLongEMA) * 100
    xSignalEMA = ema(xPVO , LengthSignalEMA)
    xPVOHisto = xPVO - xSignalEMA
    pos := iff(xSignalEMA < xPVO, -1,
    	      iff(xSignalEMA > xPVO, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Percentage Volume Oscillator (PVO)", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Percentage Volume OscillatorA ----")
LengthShortEMA = input(12, minval=1)
LengthLongEMA = input(26, minval=1)
LengthSignalEMA = input(9, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posPVO = PVO(LengthShortEMA,LengthLongEMA,LengthSignalEMA)
pos = iff(posReversal123 == 1 and posPVO == 1 , 1,
	   iff(posReversal123 == -1 and posPVO == -1, -1, 0)) 
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

https://www.fmz.com/strategy/438823

> Last Modified

2024-01-15 15:21:39
