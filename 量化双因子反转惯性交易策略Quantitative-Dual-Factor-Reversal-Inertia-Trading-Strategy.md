
> Name

量化双因子反转惯性交易策略Quantitative-Dual-Factor-Reversal-Inertia-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16d89db5059d8c844bc.png)
[trans]

### 概述

量化双因子反转惯性交易策略(Quant Dual Factor Reversal Inertia Trading Strategy)是一种结合价格反转信号和市场惯性信号的量化交易策略。该策略首先利用随机指标实现价格反转信号,然后结合相对波动率指标的市场惯性信号,最终实现双因子驱动的交易决策。

### 策略原理

该策略主要基于两部分:

1. 价格反转部分采用乌尔夫·詹森(Ulf Jensen)在其著作中提出的思想,具体为:当收盘价连续2日上涨,而9日Slow Stochastic指标低于50时,做多;当收盘价连续2日下跌,而9日Fast Stochastic指标高于50时,做空。

2. 市场惯性部分采用相对波动率指标(RVI)。该指标值在0到100之间波动,高于50表示市场长期趋势为上涨;低于50表示市场长期趋势为下跌。

综上,该策略整合价格反转信号和市场惯性信号,最终判断当前市场方向。当两者信号一致时,产生交易信号。

### 优势分析

该策略最大的优势在于结合了反转和趋势两大交易思路。反转信号能够捕捉短期调整提供交易机会;惯性信号确保只在长期趋势一致时开仓,可有效过滤噪音。

另外,双因子驱动可提高信号质量,同时Stochastic指标参数优化和RVI平滑优化也为策略优化提供了空间。

### 风险分析

该策略面临的主要风险有:

1. 反转信号识别不准确的风险。需要验证参数是否合理。

2. 惯性信号发出错误信号的风险。RVI指标本身会有滞后,需要平滑参数调整。

3. 双因子信号时间匹配不当,错过交易机会的风险。需要测试不同参数下匹配情况。

此外,反转类策略会面临趋势市场下亏损加剧的风险。需要严格遵守止损规则。

### 优化方向 

该策略可从以下几个方面进行优化:

1. 优化Stochastic指标的参数,识别反转信号的质量和及时性。

2. 优化RVI指标的平滑参数,提高惯性判断的准确性。

3. 测试不同持仓时间,确定最佳持仓周期。

4. 加入止损机制。回测不同的止损点,找到最优止损位置。

5. 可以考虑加入其他因子信号,例如交易量异动等,形成多因子驱动。

### 总结

量化双因子反转惯性交易策略综合考虑反转和趋势因子,使用 stochastic指标和RVI指标产生交易信号。策略具有双因子驱动、反转机会捕捉以及信号过滤等优势,可通过多方面参数优化进一步改善。风险控制也尤为重要,需要严格执行止损。该策略为量化交易提供了一个很好的思路。

||


### Overview

The Quantitative Dual Factor Reversal Inertia Trading Strategy is a quantitative trading strategy that combines price reversal signals and market inertia signals. The strategy first uses the Stochastic indicator to generate price reversal signals, then incorporates the market inertia signals from the Relative Volatility Index (RVI), and finally makes trading decisions driven by the dual factors.

### Principles  

The strategy consists of two main parts:  

1. The price reversal part adopts the idea proposed by Ulf Jensen in his book, specifically: when the closing price rises continuously for 2 days and the 9-day Slow Stochastic is below 50, go long; when the closing price falls continuously for 2 days and the 9-day Fast Stochastic is above 50, go short.

2. The market inertia part uses the Relative Volatility Index (RVI). The value of this indicator fluctuates between 0 and 100. Above 50 indicates the long-term trend of the market is upward; below 50 indicates the long-term trend of the market is downward.
  
In summary, this strategy integrates price reversal signals and market inertia signals to finally determine the current market direction. Trading signals are generated when the signals from both parts align.

### Advantage Analysis   

The biggest advantage of this strategy is that it combines two major trading ideas – reversal and trend-following. Reversal signals can capture short-term corrections and provide trading opportunities. Inertia signals ensure opening positions only when long-term trends align to effectively filter out noise.

In addition, the dual-factor driven mechanism can improve signal quality. Optimizing the Stochastic parameters and smoothing the RVI also provide room for strategy optimization. 

### Risk Analysis

The main risks faced by this strategy include:
  
1. The risk that reversal signals are identified inaccurately. The reasonableness of parameters needs to be verified.

2. The risk that inertia signals generate incorrect signals. The RVI itself has a lag that requires adjusting the smoothing parameter. 

3. The risk of missing trading opportunities due to poor alignment of timing of the dual-factor signals. The matching situation under different parameters needs testing.

In addition, reversal strategies face increased loss risks in trending markets. Strictly adhering to stop loss rules is necessary.  

### Optimization Directions

The strategy can be optimized in the following aspects:  

1. Optimize the parameters of the Stochastic indicator to improve quality and timeliness of identifying reversal signals.  

2. Optimize the smoothing parameter of the RVI indicator to increase the accuracy of inertia judgment.

3. Test different holding periods to determine the optimal holding cycle.  

4. Incorporate stop loss mechanisms. Backtest different stop loss points to find the optimal stop loss position.

5. Consider incorporating other factor signals such as trading volume aberrations to form multi-factor driven strategies.

### Summary

The Quantitative Dual Factor Reversal Inertia Trading Strategy comprehensively considers reversal and trend factors, using the Stochastic indicator and RVI indicator to generate trading signals. The strategy has advantages like dual-factor driven, capturing reversal opportunities, and signal filtering. It can be further improved through multi-faceted parameter optimization. Risk control through strict stop loss enforcement is also crucial. The strategy provides good ideas for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|10|Period|
|v_input_6|14|Smooth|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2024-01-11 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 27/11/2020
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
// The inertia indicator measures the market, stock or currency pair momentum and 
// trend by measuring the security smoothed RVI (Relative Volatility Index). 
// The RVI is a technical indicator that estimates the general direction of the 
// volatility of an asset.
// The inertia indicator returns a value that is comprised between 0 and 100. 
// Positive inertia occurs when the indicator value is higher than 50. As long as 
// the inertia value is above 50, the long-term trend of the security is up. The inertia 
// is negative when its value is lower than 50, in this case the long-term trend is 
// down and should stay down if the inertia stays below 50.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
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

Inertia(Period, Smooth) =>
    pos = 0.0
    nU = 0.0
    nD = 0.0
    xPrice = close
    StdDev = stdev(xPrice, Period)
    d = iff(close > close[1], 0, StdDev)
    u = iff(close > close[1], StdDev, 0)
    nU := (13 * nz(nU[1],0) + u) / 14
    nD := (13 * nz(nD[1],0) + d) / 14
    nRVI = 100 * nU / (nU + nD)
    nRes = ema(nRVI, Smooth)
    pos :=iff(nRes > 50, 1,
    	   iff(nRes < 50, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Inertia Strategy", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Period = input(10, minval=1)
Smooth = input(14, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posInertia = Inertia(Period, Smooth)
pos = iff(posReversal123 == 1 and posInertia == 1 , 1,
	   iff(posReversal123 == -1 and posInertia == -1, -1, 0)) 
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

https://www.fmz.com/strategy/438498

> Last Modified

2024-01-12 14:38:02
