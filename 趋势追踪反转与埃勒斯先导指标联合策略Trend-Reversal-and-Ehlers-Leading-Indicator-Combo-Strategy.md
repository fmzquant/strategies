
> Name

趋势追踪反转与埃勒斯先导指标联合策略Trend-Reversal-and-Ehlers-Leading-Indicator-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13045d0004e03237fc3.png)
[trans]

## 概述

该策略为趋势追踪反转策略与埃勒斯先导指标策略的组合,目的是获得更可靠的交易信号。趋势追踪反转策略判断趋势反转点,埃勒斯先导指标策略判断周期性转折点。组合信号更准确判定入市时机。

## 策略原理

### 趋势追踪反转策略

该策略源自Ulf Jensen的《我如何在期货市场上将资金翻三番》一书第183页。它属于反转类型策略。当收盘价连续2日高于前一日收盘价,且9日Stochastic慢速线低于50时,做多;当收盘价连续2日低于前一日收盘价,且9日Stochastic快速线高于50时,做空。

### 埃勒斯先导指标策略

该策略使用日内数据,绘制单日去趋势化合成价格(Detrended Synthetic Price, DSP)和日内埃勒斯先导指标(Ehlers Leading Indicator, ELI)。DSP能捕捉价格主导周期,计算方法是2阶巴特沃斯滤波减去3阶滤波。ELI可提前指示周期转折点,计算方法是去趋势化合成价格减去其简单移动平均。当ELI穿过去趋势化合成价格时产生买卖信号。

## 优势分析

该组合策略最大优势是结合趋势反转判断和周期性转折判断,交易信号更可靠。趋势反转策略能判断突破上下轨的趋势反转点。埃勒斯先导指标又能提前指示周期性低谷和高点。两者结合能更准确抓住入市时机。

另一个优势是参数调整灵活。趋势反转策略中的股票指标参数可按市场调整;埃勒斯先导指标中的周期长度也可调整适应不同周期。

## 风险分析

该策略最大风险是错过趋势 persisting。因为策略等待反转信号出现才入场,可能错过早期强劲趋势阶段。此外,反转信号可能是假突破,被套也是可能。

解决方法是调整参数,缩短反转判断周期,及时捕捉趋势反转。另外可以引入止损来控制亏损。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 引入止损策略,以控制单笔亏损。

2. 优化参数,调整反转信号周期,适应不同市场环境。

3. 增加其他指标过滤,提高信号质量,减少假信号。

4. 增加资金管理模块,控制整体仓位和风险。

5. 测试不同品种参数效果,优化适合哪些品种。

6. 增加机器学习模块,使参数可自适应调整。

## 总结

该策略结合趋势反转判断和周期性转折判断,能更可靠抓住入市时机。最大优势是信号质量好,可调整性强。最大风险是错过早期趋势,可通过调整参数、止损来控制。未来可从止损、参数优化、信号过滤等方面进行改进,使策略更适应不同市场环境。

|| 

## Overview

This strategy combines a trend reversal strategy and an Ehlers leading indicator strategy to generate more reliable trading signals. The trend reversal strategy identifies trend reversal points while the Ehlers leading indicator strategy identifies cyclical turning points. The combined signals can better determine market entry timing.

## Strategy Logic

### Trend Reversal Strategy 

This strategy is from the book "How I Tripled My Money in the Futures Market" by Ulf Jensen, page 183. It is a reversal type strategy. It goes long when the close is higher than the previous close for 2 consecutive days and the 9-day Stochastic slow line is below 50. It goes short when the close is lower than the previous close for 2 consecutive days and the 9-day Stochastic fast line is above 50.

### Ehlers Leading Indicator Strategy

This strategy plots a single daily detrended synthetic price (DSP) and a daily Ehlers leading indicator (ELI) using intraday data. DSP captures the dominant cycle of price and is computed by subtracting a 3-pole Butterworth filter from a 2-pole filter. ELI gives advanced indication of cyclic turning points and is computed by subtracting the simple moving average of DSP from DSP itself. Buy and sell signals are generated when ELI crosses over or under DSP.

## Advantage Analysis

The biggest advantage of this combo strategy is combining trend reversal identification and cyclical turning point detection for more reliable signals. The trend reversal strategy identifies reversals after breakouts while the Ehlers leading indicator provides early indication of cyclic lows and highs. Combining the two can better pinpoint market entry.

Another advantage is the flexibility in parameter tuning. The parameters of the stochastic indicator can be adjusted based on market conditions. The cycle length for the Ehlers leading indicator is also adjustable for different cycles.

## Risk Analysis

The biggest risk of this strategy is missing persisting trends. Since the strategy waits for reversal signals to enter, it may miss strong early trend moves. Reversal signals may also turn out to be false breakouts resulting in being trapped.

The solutions are to adjust parameters to shorten the reversal detection period for timely trend reversal capture. Stop loss can also be introduced to control losses.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Introduce stop loss to control single trade loss.

2. Optimize parameters to adjust reversal signal periods for different market environments. 

3. Add other indicator filters to improve signal quality and reduce false signals.

4. Add position sizing and risk management modules.

5. Test parameters across different products to find optimized fits.

6. Add machine learning modules for adaptive parameter tuning.

## Summary

The strategy combines trend reversal and cyclical turning point detection for more reliable market entry. The biggest advantage is high signal quality and flexibility. The main risk is missing early trends, which can be mitigated via parameter tuning and stop loss. Future improvements can focus on stop loss, parameter optimization, signal filtering etc. to make the strategy robust across market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|7|LengthELI|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-07 00:00:00
end: 2023-11-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 26/11/2019
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
// This Indicator plots a single
// Daily DSP (Detrended Synthetic Price) and a Daily ELI (Ehlers Leading
// Indicator) using intraday data.
// Detrended Synthetic Price is a function that is in phase with the dominant
// cycle of real price data. This one is computed by subtracting a 3 pole Butterworth
// filter from a 2 Pole Butterworth filter. Ehlers Leading Indicator gives an advanced
// indication of a cyclic turning point. It is computed by subtracting the simple
// moving average of the detrended synthetic price from the detrended synthetic price.
// Buy and Sell signals arise when the ELI indicator crosses over or under the detrended
// synthetic price.
// See "MESA and Trading Market Cycles" by John Ehlers pages 64 - 70. 
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

D_ELI(Length) =>
    pos = 0.0
    xHL2 = security(syminfo.tickerid, 'D', hl2)
    xEMA1 = ema(xHL2, Length)
    xEMA2 = ema(xHL2, 2 * Length)
    xEMA1_EMA2 = xEMA1 - xEMA2
    xResultEMA = ema(xEMA1_EMA2, Length)
    nRes = xEMA1_EMA2 - xResultEMA
    pos:= iff(nRes > 0, 1,
	       iff(nRes < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & D_ELI (Ehlers Leading Indicator)", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthELI = input(7, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posD_ELI = D_ELI(LengthELI)
pos = iff(posReversal123 == 1 and posD_ELI == 1 , 1,
	   iff(posReversal123 == -1 and posD_ELI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/431408

> Last Modified

2023-11-07 16:10:26
