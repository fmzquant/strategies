
> Name

双信号量化反转策略Reverse-Triad-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19571168c2fa4d6bafc.png)
[trans]

## 概述

双信号量化反转策略通过结合123反转策略和加速器振荡器指标,实现对趋势反转的判断,获取更准确的交易信号。该策略主要用于股指、外汇、贵金属和能源品种的短线和中线交易。

## 策略原理

该策略由两段独立的代码逻辑组成。

第一部分为123反转策略,其判断反转信号的原理是:当收盘价连续两天低于上一收盘价,且9日STOCH指标K线低于D线时产生多头信号;当收盘价连续两天高于上一收盘价,且9日STOCH指号K线高于D线时产生空头信号。

第二部分为加速器振荡器指标。该指标通过计算绝对价格振荡器和其5周期移动平均线的差值,反映绝对价格振荡器的变化速度,可以提前判断趋势反转点。

最后,该策略将两个指标的信号进行组合:当两指标信号同向时(双多或双空),输出该方向的交易信号;当两指标信号不一致时,输出零信号。

## 优势分析

该策略结合双重指标判断,可以过滤掉一定的假信号,信号准确可靠。同时利用绝对价格振荡器反映变化加速度的特点,可以提前捕捉到潜在的趋势反转点,从而争取更大的利润空间。

## 风险分析

该策略最大的风险在于指标发出信号前价格已经出现明显的反转,导致错过最佳入场点。此外,行情剧烈波动时,指标参数需要进行优化调整。

针对入场点风险,可以结合更多反转指标进行组合,确保信号的可靠性;针对参数优化问题,可以建立动态调整机制,确保参数的合理性。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 增加过滤条件,避免在高波动阶段产生错误信号

2. 结合更多反转指标,形成多重验证机制

3. 建立参数自适应机制,动态调整指标参数

4. 优化止损策略,以控制单笔止损

## 总结

双信号量化反转策略通过双重验证提高信号准确率,有助于把握市场关键的反转点;同时也需要注意防范指标滞后和参数失效的风险,持续对策略进行验证和优化,使之能适应多变的市场环境。该策略适合有一定量化交易经验的投资者使用。

|| 
## Overview

The Reverse Triad Quantitative Strategy combines the 123 Reversal Strategy and the Accelerator Oscillator to judge trend reversals and generate more accurate trading signals. This strategy is mainly used for short-term and medium-term trading of stock indices, forex, precious metals and energy products.  

## Strategy Logic

This strategy consists of two independent logic codes.

The first part is the 123 Reversal Strategy. Its principle for judging reversal signals is: a buy signal is generated when the close price is lower than the previous close for two consecutive days and the 9-day STOCH K-line is below the D-line; A sell signal is generated when the close price is higher than the previous close for two consecutive days and the 9-day STOCH K-line is above the D-line.

The second part is the Accelerator Oscillator indicator. This indicator reflects the speed of change of the Awesome Oscillator by calculating the difference between the Awesome Oscillator and its 5-period moving average, which can help identify trend reversal points earlier than the Awesome Oscillator.

Finally, this strategy combines the signals of the two indicators: when the signals of both indicators are in the same direction (both long or both short), the corresponding direction signal is output; when the signals of the two indicators are inconsistent, a zero signal is output.

## Advantage Analysis 

This strategy combines dual indicator judgments to filter out some false signals, making the signals more accurate and reliable. At the same time, by utilizing the Accelerator Oscillator's feature of reflecting accelerated changes, potential trend reversal points can be captured early, thus capturing greater profit room.

## Risk Analysis

The biggest risk of this strategy is that the price has already reversed significantly before the indicators generate signals, resulting in missing the best entry point. In addition, indicator parameters need to be optimized and adjusted in case of drastic market fluctuations.

To address the entry point risk, more reversal indicators can be combined to ensure signal reliability; For the parameter optimization problem, a dynamic adjustment mechanism can be established to ensure parameter rationality.

## Optimization Directions

The following aspects of this strategy can be optimized:

1. Add filtering conditions to avoid generating wrong signals during high volatility stages  

2. Combine more reversal indicators to form a multi-validation mechanism

3. Establish a parameter self-adaptive mechanism to dynamically adjust indicator parameters  

4. Optimize stop loss strategies to control single stop loss

## Conclusion  

The Reverse Triad Quantitative Strategy improves signal accuracy through dual verification, which is helpful to grasp the key reversal points of the market. At the same time, attention should also be paid to preventing risks such as indicator lagging and parameter failure. Continuous verification and optimization of the strategy is needed to adapt it to the ever-changing market environment. This strategy is suitable for investors with some quantitative trading experience.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|34|Length Slow|
|v_input_6|5|Length Fast|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-23 00:00:00
end: 2023-11-30 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/04/2019
// This is combo strategies for get 
// a cumulative signal. Result signal will return 1 if two strategies 
// is long, -1 if all strategies is short and 0 if signals of strategies is not equal.
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Secon strategy
// The Accelerator Oscillator has been developed by Bill Williams 
// as the development of the Awesome Oscillator. It represents the 
// difference between the Awesome Oscillator and the 5-period moving 
// average, and as such it shows the speed of change of the Awesome 
// Oscillator, which can be useful to find trend reversals before the 
// Awesome Oscillator does.
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

AcceleratorOscillator(nLengthSlow, nLengthFast) =>
    xSMA1_hl2 = sma(hl2, nLengthFast)
    xSMA2_hl2 = sma(hl2, nLengthSlow)
    xSMA1_SMA2 = xSMA1_hl2 - xSMA2_hl2
    xSMA_hl2 = sma(xSMA1_SMA2, nLengthFast)
    nRes =  xSMA1_SMA2 - xSMA_hl2
    cClr = nRes > nRes[1] ? blue : red
    pos = 0.0
    pos := iff(nRes > 0, 1,
             iff(nRes < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal and Accelerator Oscillator (AC)", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
nLengthSlow = input(34, minval=1, title="Length Slow")
nLengthFast = input(5, minval=1, title="Length Fast")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posAcceleratorOscillator = AcceleratorOscillator(nLengthSlow, nLengthFast)
pos = iff(posReversal123 == 1 and posAcceleratorOscillator == 1 , 1,
	   iff(posReversal123 == -1 and posAcceleratorOscillator == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
```

> Detail

https://www.fmz.com/strategy/433911

> Last Modified

2023-12-01 14:14:46
