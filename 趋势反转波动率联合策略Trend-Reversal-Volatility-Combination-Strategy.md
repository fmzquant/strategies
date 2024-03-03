
> Name

趋势反转波动率联合策略Trend-Reversal-Volatility-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/feaa74427f004d072c.png)

[trans]

## 概述

该策略是一个联合策略,结合了趋势反转策略和统计波动率策略,以获取更强的交易信号。

## 策略原理

该策略由两部分组成:

1. 趋势反转策略

    - 使用123形态判断趋势反转点。具体来说,如果收盘价连续2日上涨,且9日Stochastic慢线低于50,则看涨;如果收盘价连续2日下跌,且9日Stochastic快线高于50,则看跌。

2. 统计波动率策略

    - 使用极值法计算近30日的统计波动率。如果波动率高于0.5%则看涨,如果低于0.16%则看跌。

最后,如果两种策略信号一致,即都是看涨或看跌,则产生交易信号;如果不一致,则不进行交易。

## 策略优势分析

该策略联合应用了两种不同类型的策略,可以提高信号的可靠性。

1. 123形态判断能准确抓取趋势反转点,避免被突发性价格变动误导。

2. 统计波动率反映了最近一个月的市场波动情况,可以过滤出波动率较高、交易机会较多的时段。

两种策略互为验证,结合使用更能抓住市场关键的转折点,从而获得更准确可靠的交易信号。

## 风险分析

1. 123形态无法完全避免假突破带来的风险。如果出现异常震荡,可能会误判信号。

2. 统计波动率仅考虑历史数据,无法预测未来波动趋势。如果市场波动突然放大或收缩,也容易产生错误信号。

3. 两种策略都依赖参数优化。如果参数设置不当,信号质量将大打折扣。

4. 联合策略虽提高了可靠性,但也可能错过某些较强的单一信号。

## 优化方向

1. 结合更多指标,如布林带、KDJ等,形成投票机制。

2. 增加机器学习算法,利用更多历史数据判断趋势反转概率。

3. 设置阈值筛选信号强弱,避免噪音干扰。

4. 优化参数设置,针对不同品种、周期进行参数调整。

5. 增加止损机制来控制联合策略的风险。

## 总结

该策略通过联合应用趋势反转策略和统计波动率策略,提高了信号质量,能在市场关键转折点给出比较准确的交易指令。但也需要注意误判风险和参数优化问题。结合更多指标和机器学习等手段进一步优化,可以获得更稳定可靠的交易信号。

||

## Overview

This strategy combines a trend reversal strategy with a statistical volatility strategy to generate stronger trading signals. 

## How it Works

The strategy consists of two parts:

1. Trend reversal strategy

   - Identify trend reversal points using 123 pattern. Specifically, go long if close has risen for 2 consecutive days and 9-day Stochastic slow line is below 50; go short if close has fallen for 2 consecutive days and 9-day Stochastic fast line is above 50.
   
2. Statistical volatility strategy

   - Calculate 30-day statistical volatility using Extreme Value Method. Go long if volatility is above 0.5%; go short if volatility is below 0.16%.
   
The strategy generates a trade signal only when both strategies agree on the direction (both long or both short). Otherwise, no trade.

## Advantage Analysis

The combo strategy improves signal reliability by combining two different types of strategies:

1. The 123 pattern accurately captures trend reversal points and avoids being misled by one-off price spikes.

2. The statistical volatility focuses on high-volatility, high-opportunity periods based on market movement over the past month.

By verifying each other, the two strategies combined catch key market turning points more precisely and generate more accurate trading signals.

## Risk Analysis  

1. 123 patterns cannot fully avoid the risk of false breakouts. Erratic whipsaws may cause bad signals.

2. Statistical volatility only considers historical data and cannot predict future volatility shifts. Sudden volatility expansion or contraction can lead to bad signals.

3. Both strategies rely heavily on parameter tuning. Poor parameter settings may degrade signal quality significantly. 

4. Although more reliable overall, the combo approach may miss some strong signals from individual strategies.

## Improvement Areas

1. Incorporate more indicators like Bollinger Bands, KDJ to form a voting mechanism.

2. Add machine learning algorithms to determine trend reversal probabilities using more historical data. 

3. Set signal strength thresholds to filter out noise.

4. Optimize parameters for different products and timeframes.

5. Add stop loss mechanisms to control risk of the combined strategy.

## Conclusion

The strategy improves signal quality by combining trend reversal and statistical volatility strategies, providing more accurate trade signals around market turning points. But misinterpretation risks and parameter optimization issues remain. Further enhancements like more indicators and machine learning can lead to even more robust and reliable trading signals.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Statistical Volatility ----|
|v_input_7|30|LengthSV|
|v_input_8|0.005|TopBand|
|v_input_9|0.0016|LowBand|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 31/07/2021
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
// This indicator used to calculate the statistical volatility, sometime 
// called historical volatility, based on the Extreme Value Method.
// Please use this link to get more information about Volatility.
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


SV(Length,TopBand,LowBand) =>
    pos = 0.0
    xMaxC = highest(close, Length)
    xMaxH = highest(high, Length)
    xMinC = lowest(close, Length)
    xMinL = lowest(low, Length)
    SqrTime = sqrt(253 / Length)
    Vol = ((0.6 * log(xMaxC / xMinC) * SqrTime) + (0.6 * log(xMaxH / xMinL) * SqrTime)) * 0.5
    nRes = iff(Vol < 0,  0, iff(Vol > 2.99, 2.99, Vol))
    pos := iff(nRes > TopBand, 1,
    	     iff(nRes < LowBand, -1, nz(pos[1], 0)))
    pos

strategy(title="Combo Backtest 123 Reversal & Statistical Volatility", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Statistical Volatility ----")
LengthSV = input(30, minval=1)
TopBand = input(0.005, step=0.001)
LowBand = input(0.0016, step=0.001)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posSV = SV(LengthSV,TopBand,LowBand)
pos = iff(posReversal123 == 1 and posSV == 1 , 1,
	   iff(posReversal123 == -1 and posSV == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430036

> Last Modified

2023-10-24 14:23:58
