
> Name

动量反转组合策略Momentum-Reversal-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a409f640a71b723273.png)

[trans]

## 概述

这个策略是将两种动量指标组合使用,以发掘更多交易机会。第一种指标是乌尔夫·詹森在他的书中提出的快慢随机指标的反转策略。第二种指标是John Ehlers提出的去趋势合成价格。该策略综合利用两种指标的信号,在两种指标同时发出买入或卖出信号时下单。

## 策略原理

第一部分的快慢随机指标反转策略的原理是:当收盘价连续两天低于前一日收盘价,而快线高于慢线时做多;当收盘价连续两天高于前一日收盘价,而快线低于慢线时做空。

第二部分的去趋势合成价格的计算公式是:

DSP = EMA(HL/2, 0.25周期) - EMA(HL/2, 0.5周期) 

其中HL/2是计算高低价中点,0.25周期EMA代表价格的短期趋势,0.5周期EMA代表价格的长期趋势。去趋势合成价格代表了价格相对其主导周期的涨跌幅度。当DSP上穿阈值时看涨,下穿阈值时看跌。

该策略将两种指标信号综合考虑。只有两种指标同时发出买入或卖出信号时,才会开仓。

## 优势分析

- 利用两种指标过滤不确定信号,可以减少错误交易
- 两种指标互为验证,可提高信号的可靠性
- 快慢随机指标反转策略可捕捉短期反转机会
- 去趋势合成价格可识别中长线趋势
- 组合两种指标,既可捕捉反转,也可跟随趋势,灵活度高

## 风险分析

- 快慢随机指标在震荡市中表现不佳
- 去趋势合成价格在趋势转折点前可能发出错误信号
- 仅在两指标同时发出信号时交易,可能错过部分机会
- 需要正确设置各参数,以发挥组合效果

## 优化方向

- 可以测试不同的参数,优化指标的效果
- 可以尝试不同的指标权重,如延迟去趋势合成价格信号
- 可以加入止损以控制风险
- 可以综合更多不同类型的指标,构建多因子模型

## 总结

该策略综合运用两种不同的动量指标,通过双重过滤提高信号质量,在保持交易频率的同时控制风险。但需要注意指标本身的局限性,并适当优化参数。如果能持续优化,该策略有望获取超越大盘的超额收益。

||


## Overview

This strategy combines two momentum indicators to uncover more trading opportunities. The first indicator is a stochastic oscillator reversal strategy proposed in Ulf Jensen's book. The second indicator is John Ehlers' detrended synthetic price. The strategy takes positions when both indicators give concurring buy or sell signals.

## Strategy Logic

The logic behind the stochastic oscillator reversal is: go long when close is lower than previous close for 2 straight days and fast line is above slow line; go short when close is higher than previous close for 2 straight days and fast line is below slow line. 

The detrended synthetic price (DSP) is calculated as:

DSP = EMA(HL/2, 0.25 cycle) - EMA(HL/2, 0.5 cycle)

where HL/2 is the midpoint of high and low, 0.25 cycle EMA represents short-term trend and 0.5 cycle EMA represents long-term trend. DSP shows the price deviation from its dominant cycle. Buy when DSP crosses above threshold and sell when crossing below.

This strategy combines the signals from both indicators. It only enters positions when both indicators give concurring signals.

## Advantage Analysis

- Filtering uncertain signals with two indicators reduces wrong trades
- Validation between indicators enhances signal reliability  
- Stochastic reversal catches short-term reversal opportunities
- DSP identifies medium to long term trends
- Combining two indicators provides flexibility to catch reversals and follow trends

## Risk Analysis

- Stochastic performs poorly in ranging markets
- DSP may give wrong signals near trend turning points  
- Missing some opportunities by only trading on concurring signals
- Needs proper parameter tuning to achieve combinatorial effect

## Enhancement Directions

- Test different parameters to optimize indicator performance
- Try different indicator weighting, e.g. delay DSP signals
- Add stop loss to control risks
- Incorporate more indicators to build multi-factor model

## Conclusion

The strategy combines two different momentum indicators and improves signal quality through double filtering while maintaining trade frequency and controlling risks. But the limitations of the individual indicators need to be noted and parameters properly tuned. With continuous optimizations, the strategy has the potential to generate alpha over the broad market.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|LengthDSP|
|v_input_6|-25|SellBand|
|v_input_7|25|BuyBand|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/11/2019
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
// Detrended Synthetic Price is a function that is in phase with the 
// dominant cycle of real price data. This DSP is computed by subtracting 
// a half-cycle exponential moving average (EMA) from the quarter cycle 
// exponential moving average.
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

D_DSP(Length, SellBand, BuyBand) =>
    pos = 0.0
    xHL2 = hl2
    xEMA1 = ema(xHL2, Length)
    xEMA2 = ema(xHL2, 2 * Length)
    xEMA1_EMA2 = xEMA1 - xEMA2
    pos := iff(xEMA1_EMA2 > SellBand, 1,
	         iff(xEMA1_EMA2 < BuyBand, -1, nz(pos[1], 0))) 
	pos

strategy(title="Combo Backtest 123 Reversal & D_DSP (Detrended Synthetic Price) V 2", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthDSP = input(14, minval=1)
SellBand = input(-25)
BuyBand = input(25)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posD_DSP = D_DSP(LengthDSP, SellBand, BuyBand)
pos = iff(posReversal123 == 1 and posD_DSP == 1 , 1,
	   iff(posReversal123 == -1 and posD_DSP == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430555

> Last Modified

2023-10-30 11:49:26
