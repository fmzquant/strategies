
> Name

双重反转均衡策略Dual-Reversion-Balance-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ad4ecbd5283da99937.png)

[trans]

## 概述

双重反转均衡策略是一种综合利用反转策略和滤波分解策略的组合策略。该策略首先利用123反转系统生成交易信号,然后结合经验模式分解(EMD)进行滤波处理,综合两者交易信号,实现更高的胜率。

## 策略原理

### 123反转系统

123反转系统源自Ul f Jensen的《我如何在期货市场上获得三倍收益》一书。该部分策略属于反转类型策略。当收盘价连续2日高于前一日的收盘价,且9日慢速K线低于50时做多;当收盘价连续2日低于前一日的收盘价,且9日快速K线高于50时做空。

### 经验模式分解(EMD)

经验模式分解(EMD)是一种自适应的数据分析方法。它能有效分离出数据中的不同频率成分,提取数据的长期趋势。这里我们设置长度为20,delta为0.5,fraction为0.1,根据价格中的不同频率成分生成交易信号。

### 信号综合

双重反转均衡策略将123反转系统和经验模式分解产生的交易信号进行综合,当两者信号一致时确认 entrada。这样可以提高策略胜率。

## 优势分析

双重反转均衡策略结合了反转策略和数字信号处理技术,综合利用不同模型的优势。反转系统捕捉短期反转机会,经验模式分解抓取长期趋势,两者配合使用可以提高策略稳定性。

该策略还引入了123形态,可以避免非理想反转被套利。经验模式分解中设置合理参数,有助过滤掉部分噪声,减少错误信号。

## 风险分析

双重反转均衡策略最大的风险在于反转失败。尽管引入123形态可以减少这一概率,但切记反转交易本质上具有较大不确定性。此外,经验模式分解作为一种自适应滤波方法,也可能在极端行情中失效。

为控制这些风险,我们可以适当调整反转的参数,确保反转信号更加可靠。也可以测试不同的滤波方法替代经验模式分解,看是否能获得更好的滤波效果。此外保持小量交易,避免单笔损失过大,也是必要的。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 测试不同参数的反转系统,确定最佳参数组合

2. 尝试不同的数字滤波方法,如小波变换、希尔伯特变换等

3. 增加止损策略,以控制单笔损失

4. 结合其他指标,确保交易方向更加准确可靠  

5. 优化资金管理,确定最佳交易大小比例

## 总结

双重反转均衡策略综合运用反转策略和数字信号处理技术的优势。它合理参数设定,控制风险,稳定交易。该策略具有很强的普适性和拓展性,是一种值得推荐的交易策略。

||

## Overview  

The dual reversion balance strategy is a combination strategy that utilizes both reversal strategies and empirical mode decomposition (EMD) filtering. It first generates trading signals using the 123 reversal system, then processes the signals with EMD filtering, and finally combines the signals from both to confirm entries and exits. This hybrid approach can improve the win rate.   

## Strategy Principle

### 123 Reversal System

The 123 reversal system originates from the book "How I Tripled My Money in the Futures Market" by Ulf Jensen. It belongs to reversal type of strategies. It goes long when the close price is higher than previous close for 2 consecutive days and the 9-day slow stochastic is below 50. It goes short when opposite setup happens.

### Empirical Mode Decomposition (EMD)  

The EMD is an adaptive data analysis method. It can effectively decompose data into different frequency components and extract the long term trend. Here we set length to 20, delta to 0.5 and fraction to 0.1 to generate trading signals based on the price frequency components.  

### Signal Combination   

The dual reversion balance strategy combines the trading signals from both 123 reversal system and EMD. It confirms entries only when signals from both systems agree. This hybrid approach improves the win rate.  

## Advantage Analysis   

The dual reversion balance strategy leverages the advantages from both reversal strategies and digital signal processing techniques. The reversal system captures short-term reversal opportunities while the EMD filters catch long term trends. Using both systems together can improve the stability.   

It also introduces the 123 pattern to avoid undesirable whipsaws. And the properly configured EMD parameters help filter out some noise. All these factors contribute to higher winning rate.

## Risk Analysis  

The biggest risk of this strategy comes from reversal failure. Although the 123 pattern reduces such probability, the uncertainty of reversal trading remains high. Also, the EMD method can break down during extreme volatile markets.   

To control such risks, parameters of the reversal system can be adjusted to produce more reliable signals. Different filtering methods can also be tested instead of EMD to achieve better filtering performance. In addition, keeping small position sizes to limit losses is necessary.  

## Optimization Directions   

The strategy can be optimized in the following aspects:

1. Test different parameter sets for the reversal system to find optimum 

2. Try different digital filtering methods, e.g, wavelet transform, Hilbert transform etc.   

3. Add stop loss to control single trade loss

4. Incorporate other indicators to ensure higher directional accuracy 

5. Optimize money management models like position sizing

## Summary   

The dual reversion balance strategy combines the strengths of reversal strategies and digital signal processing techniques. With proper parameter tuning and risk control, it generates stable trading performance. The strategy is highly extensible and worth recommending.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|20|LengthEMD|
|v_input_6|0.5|Delta|
|v_input_7|0.1|Fraction|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-14 00:00:00
end: 2023-12-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 30/06/2020
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
// The related article is copyrighted material from Stocks & Commodities Mar 2010
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

Empirical(Length,Delta,Fraction) =>
    pos = 0
    xBandpassFilter = 0.0
    xPeak = 0.0
    xValley =0.0
    xPrice = hl2
    beta = cos(3.1415 * (360 / Length) / 180)
    gamma = 1 / cos(3.1415 * (720 * Delta / Length) / 180)
    alpha = gamma - sqrt(gamma * gamma - 1)
    xBandpassFilter := 0.5 * (1 - alpha) * (xPrice - xPrice[2]) + beta * (1 + alpha) * nz(xBandpassFilter[1]) - alpha * nz(xBandpassFilter[2])
    xMean = sma(xBandpassFilter, 2 * Length)
    xPeak :=  iff (xBandpassFilter[1] > xBandpassFilter and xBandpassFilter[1] > xBandpassFilter[2], xBandpassFilter[1], nz(xPeak[1])) 
    xValley :=  iff (xBandpassFilter[1] < xBandpassFilter and xBandpassFilter[1] < xBandpassFilter[2], xBandpassFilter[1], nz(xValley[1])) 
    xAvrPeak = sma(xPeak, 50)
    xAvrValley = sma(xValley, 50)
    nAvrPeak = Fraction * xAvrPeak
    nAvrValley = Fraction * xAvrValley
    pos := iff(xMean > nAvrPeak and xMean > nAvrValley, 1,
    	   iff(xMean < nAvrPeak and xMean < nAvrValley, -1, nz(pos[1], 0)))
    pos

strategy(title="Combo Backtest 123 Reversal & Empirical Mode Decomposition", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthEMD = input(20, minval=1)
Delta = input(0.5)
Fraction = input(0.1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posEmpirical = Empirical(LengthEMD,Delta,Fraction)
pos = iff(posReversal123 == 1 and posEmpirical == 1 , 1,
	   iff(posReversal123 == -1 and posEmpirical == -1, -1, 0)) 
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

https://www.fmz.com/strategy/435522

> Last Modified

2023-12-15 16:56:20
