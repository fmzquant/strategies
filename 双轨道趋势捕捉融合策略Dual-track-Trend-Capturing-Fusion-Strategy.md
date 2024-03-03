
> Name

双轨道趋势捕捉融合策略Dual-track-Trend-Capturing-Fusion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e86ad2f4902a8af556.png)
[trans]

## 概述

本策略融合了123反转和SMA弹力振荡器两个子策略,形成双轨道筛选信号的趋势追踪策略。123反转策略通过K线形态判断潜在转折点;SMA弹力振荡器则利用移动平均线判定趋势方向。两者互为验证,形成双重确认机制,可有效过滤掉错误信号,捕捉较强的趋势方向,实现趋势跟踪交易。

## 策略原理

1. 123反转策略

该策略源自于Ulf Jensen的《我如何在期货市场上获得三倍回报》一书中P183的系统。属于反转类型策略。当收盘价连续2日高于前一日收盘价,且9日随机指标的慢线低于50时,做多;当收盘价连续2日低于前一日收盘价,且9日随机指标的快线高于50时,做空。

2. SMA弹性振荡器

该指标类似William Blau开发的TSI指标,不同的是SMA振荡器包含一个信号线。SMA弹性指标使用价格减去前一日价格的双移动平均,再绘制SMA的指数移动平均线作为信号线,用于发出交易信号。可调节指标参数进行优化。

双重确认:只有当123反转和SMA弹性指标同向发出信号时,才开仓。当两者信号方向不一致时,保持空仓。

## 策略优势

1. 融合多种指标,形成双重确认机制,可有效过滤错误信号。

2. 123反转策略利用K线形态判定潜在反转点。SMA弹性振荡器通过趋势判断发出信号,两者互为验证,弥补单一指标的不足。

3. SMA弹性振荡器参数可调节,可以针对不同品种和周期进行优化,灵活性强。

4. 整体作为趋势跟踪策略,可顺势而为,持续捕捉较强势头的方向。

## 策略风险

1. 反转策略与趋势策略的整合与平衡需要不断优化,否则可能错过转折点或产生重大亏损。

2. 反转策略本身存在一定的错误交易风险,需要调整参数以降低失败率。

3. 纯跟踪策略无法判断趋势反转点,存在潜在亏损风险。需适时降低仓位规避风险。

4. 不同品种和周期参数需要反复优化测试,不宜生搬硬套。

## 策略优化

1. 调整123反转的参数,降低错误交易频率。

2. 调整SMA弹性振荡器参数,优化指标的敏感度。

3. 添加止损策略,降低单次亏损。

4. 结合其它指标判断潜在反转,适时减仓。

5. 测试不同品种参数优化,提升稳定性。

## 总结

本策略通过双重确认机制,整合反转与趋势策略的优势,形成较强的趋势跟踪效果。可有效滤除噪音,顺势而为,持续捕捉优质的趋势机会。同时也存在一定的回撤风险,需要不断优化参数,控制风险。关键在于反转与趋势的平衡,以及止损风控的搭配使用。如果用于长线追踪,效果可能更佳。总体来说,本策略具有一定的实战价值,可作为策略组合的一部分,也可单独使用。

||


## Overview

This strategy fuses the 123 Reversal and SMA Ergodic Oscillator sub-strategies to form a trend tracking strategy with dual-track signal filtering. The 123 Reversal strategy judges potential turning points through candlestick patterns; the SMA Ergodic Oscillator determines trend direction using moving averages. They verify each other to form a dual confirmation mechanism, which can effectively filter out false signals and capture relatively strong trend directions for trend tracking trading.

## Strategy Logic

1. 123 Reversal Strategy  

This strategy is from the system on p183 of Ulf Jensen's book "How I Tripled My Money in the Futures Market". It belongs to the reversal type. When the closing price is higher than the previous close for 2 consecutive days, and the slow line of the 9-day stochastic is below 50, go long; when the closing price is lower than the previous close for 2 consecutive days, and the fast line of 9-day stochastic is above 50, go short.

2. SMA Ergodic Oscillator

This indicator is similar to the TSI developed by William Blau, except that SMA oscillator contains a signal line. The SMA Ergodic Indicator uses double moving averages of price minus previous price, and plots an EMA of SMI as signal line to trigger trading signals. The parameters are adjustable for optimization. 

Dual confirmation: open positions only when 123 Reversal and SMA Ergodic give signals in the same direction. Keep flat when the signal directions are inconsistent.


## Advantages

1. Integration of multiple indicators forms dual confirmation mechanism, which can effectively filter out false signals.

2. 123 Reversal strategy judges potential reversal points through candlestick patterns. SMA Ergodic Oscillator issues signals based on trend judgment. They complement each other to overcome the limitations of single indicators.

3. The parameters of SMA Ergodic Oscillator are adjustable for optimization on different products and timeframes. It is flexible.

4. As a whole trend tracking strategy, it can follow the trend continuously to capture strong momentum. 

## Risks

1. The integration and balance between reversal and trend strategies needs continuous optimization, otherwise it may miss turning points or cause huge losses.

2. Reversal strategies have inherent false trading risks. Parameters need to be adjusted to reduce failure rate.

3. Pure trend following strategies cannot judge reversals. There are potential loss risks. Position size should be reduced in time to avoid risks.

4. Parameters need iterative optimization and testing for different products and timeframes. Do not directly apply them.

## Enhancements

1. Adjust parameters of 123 Reversal to reduce false trading frequency.

2. Adjust parameters of SMA Ergodic Oscillator to optimize indicator sensitivity. 

3. Add stop loss strategy to limit per trade loss.

4. Incorporate other indicators to judge potential reversals and reduce position size in time.

5. Test parameters on different products to improve robustness.

## Summary

This strategy integrates the advantages of reversal and trend strategies through dual confirmation mechanism, forming strong trend tracking effect. It can effectively filter out noise, follow the trend, and continuously capture high quality trend opportunities. Meanwhile, certain drawdown risks exist. Parameters need continuous optimization and risk control using stop loss. The key is balancing reversal and trend, plus stop loss. It may work better for long term tracking. Overall, this strategy has practical value, and can be used as part of strategy portfolio, or independently.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- SMI Ergodic Oscillator ----|
|v_input_7|4|fastPeriod|
|v_input_8|8|slowPeriod|
|v_input_9|3|SmthLen|
|v_input_10|0.5|TopBand|
|v_input_11|-0.5|LowBand|
|v_input_12|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-30 00:00:00
end: 2023-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 14/07/2021
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
// The SMI Ergodic Indicator is the same as the True Strength Index (TSI) developed by 
// William Blau, except the SMI includes a signal line. The SMI uses double moving averages 
// of price minus previous price over 2 time frames. The signal line, which is an EMA of the 
// SMI, is plotted to help trigger trading signals. Adjustable guides are also given to fine 
// tune these signals. The user may change the input (close), method (EMA), period lengths 
// and guide values.
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


SMI_Erg(fastPeriod, slowPeriod,SmthLen, TopBand,LowBand) =>
    pos = 0.0
    xPrice = close
    xPrice1 = xPrice - xPrice[1]
    xPrice2 = abs(xPrice - xPrice[1])
    xSMA_R = ema(ema(xPrice1,fastPeriod),slowPeriod)
    xSMA_aR = ema(ema(xPrice2, fastPeriod),slowPeriod)
    xSMI = xSMA_R / xSMA_aR
    xEMA_SMI = ema(xSMI, SmthLen)
    pos:= iff(xEMA_SMI < LowBand, -1,
    	   iff(xEMA_SMI > TopBand, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & SMI Ergodic Oscillator", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- SMI Ergodic Oscillator ----")
fastPeriod = input(4, minval=1)
slowPeriod = input(8, minval=1)
SmthLen = input(3, minval=1)
TopBand = input(0.5, step=0.1)
LowBand = input(-0.5, step=0.1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posSMI_Erg = SMI_Erg(fastPeriod, slowPeriod,SmthLen, TopBand,LowBand )
pos = iff(posReversal123 == 1 and posSMI_Erg == 1 , 1,
	   iff(posReversal123 == -1 and posSMI_Erg == -1, -1, 0)) 
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

https://www.fmz.com/strategy/431235

> Last Modified

2023-11-06 11:49:41
