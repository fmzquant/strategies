
> Name

创富综合策略Wealth-Creation-Composite-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15aa3e95821cd2cbf8f.png)
[trans]

## 概述

本策略是一种综合性的交易策略,其目的是在中短期内获利。它整合了123反转策略和神奇振荡器策略,以发挥两者的优势,获取更可靠的交易信号。

## 策略原理

该策略由两部分组成:

**123反转策略**

这部分策略基于书籍“我如何在期货市场上使资金增长三倍”第183页所述的反转策略改编。它在以下情况下做多:如果收盘价连续2天高于前一日收盘价,且9日随机慢线低于50时;它在以下情况下做空:如果收盘价连续2天低于前一日收盘价,且9日随机快线高于50时。

**神奇振荡器策略**

该部分策略使用神奇振荡器指标,它将AO当前值与上一期的值进行对比。如果当前AO值高于上一期,则视为适合做多,柱形显示为蓝色;如果当前AO值不高于上一期,则视为适合做空,柱形显示为红色。

综合信号生成规则是:如果123反转策略和神奇振荡器策略同时发出买入信号,则采取做多策略;如果两者同时发出卖出信号,则采取做空策略。

## 优势分析

该综合策略最大的优势在于整合了两种不同类型策略的优点,可以提高信号的可靠性和稳定性。

具体来说,123反转策略在中短期内较为适用,可以捕捉反转机会。而神奇振荡器策略则更注重短期趋势,灵敏度较高。两者互为补充,可以过滤掉一些假信号,同时也可以在不同阶段捕捉较优的入场时机。

另外,该策略综合利用K线信息和振荡器指标,兼顾了价格行情本身的信息和量价关系,比较全面和立体。

## 风险分析

该策略最大的风险在于,综合多个策略也意味着综合了各自的风险。

123反转策略本身并不能完全避免被困于震荡市场的风险。神奇振荡器策略对短期市场波动也较为敏感。如果两者发出错误信号,则会乘二为害。

此外,参数设置也会影响策略效果。需要反复测试和优化,找到最佳参数组合。

要规避风险,可以适当调整策略持仓规模,降低单笔交易的风险敞口。另外,可设置止损线,避免损失进一步扩大。

## 优化方向

可以从以下几个方面进一步优化该策略:

1. 测试并优化参数,找到最优参数组合

2. 增加其他指标或过滤条件,进一步提高信号质量

3. 结合不同时间周期进行多时间框架优化

4. 增加动态止损策略,更好控制风险

5. 考虑实际交易成本,设定进入和退出的条件

6. 考虑大级别趋势方向,避免逆势操作

## 总结

本策略综合运用123反转和神奇振荡器两大策略的优点,在提高信号可靠性的同时,保留了一定的灵活性和对市场变化的敏感度。但仍需进一步优化参数,严格控制风险,方能在实盘中稳定获利。整体来说,该策略具有很好的中短期交易潜力,值得进一步研究与应用。

||


## Overview

This strategy is a composite trading strategy that aims to profit in the medium to short term. It integrates the 123 Reversal strategy and Awesome Oscillator strategy to leverage the strengths of both and obtain more reliable trading signals.

## Strategy Logic

The strategy consists of two parts:

**123 Reversal Strategy** 

This part is adapted from the reversal strategy described on page 183 of the book "How I Tripled My Money in the Futures Market" by Ulf Jensen. It goes long when the close price is higher than the previous close for 2 consecutive days and the 9-day Slow Stochastic is below 50. It goes short when the close price is lower than the previous close for 2 consecutive days and the 9-day Fast Stochastic is above 50.

**Awesome Oscillator Strategy**

This part uses the Awesome Oscillator indicator, which compares the AO current value to the previous one. If the current AO value is higher than the previous, it indicates a good opportunity to go long and the histogram bar color is blue. If the current AO value is not higher than the previous, it indicates a good chance to go short and the bar color is red.

The combined signal is generated as follows: if the 123 Reversal and Awesome Oscillator strategies both give buy signals, adopt a long strategy; if both give sell signals, adopt a short strategy.

## Advantage Analysis 

The biggest advantage of this composite strategy is that it combines the strengths of two different types of strategies, improving the reliability and stability of trading signals.

Specifically, the 123 Reversal strategy is more applicable in the medium to short term and can capture reversal opportunities. The Awesome Oscillator strategy focuses more on short-term trends and is more sensitive. The two strategies complement each other, help filter out false signals, and capture better entry opportunities in different stages.

In addition, this strategy comprehensively utilizes K-line information and an oscillator indicator, taking into account both price action itself and the volume-price relationship for a more well-rounded approach.

## Risk Analysis

The biggest risk of this strategy is that combining multiple strategies also compounds their individual risks. 

The 123 Reversal strategy itself cannot completely avoid the risk of being stuck in a range-bound market. The Awesome Oscillator strategy is also sensitive to short-term market fluctuations. Incorrect signals from both strategies will be amplified.

In addition, parameter settings also affect strategy performance. Extensive testing and optimization is needed to find the optimum parameters.

To mitigate risks, properly size positions to limit downside on individual trades. Also set stop loss orders to prevent losing more.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Test and optimize parameters to find the optimal parameter combination.

2. Add other indicators or filters to further improve signal quality. 

3. Optimize across different timeframes for a multi-timeframe approach.

4. Add dynamic stops to better control risks.

5. Consider actual transaction costs and define entry/exit criteria.  

6. Consider the major trend direction to avoid countertrend trading.

## Conclusion

This strategy combines the strengths of the 123 Reversal and Awesome Oscillator strategies, enhancing signal reliability while retaining flexibility and sensitivity to market changes. Further parameter optimization and strict risk control are needed for stable profits in live trading. Overall, this strategy has good potential for medium to short-term trading and is worth researching and applying.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Awesome Oscillator (AC) ----|
|v_input_7|34|Length Slow|
|v_input_8|5|Length Fast|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 09/08/2021
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
//    This indicator plots the oscillator as a histogram where blue denotes 
//    periods suited for buying and red . for selling. If the current value 
//    of AO (Awesome Oscillator) is above previous, the period is considered 
//    suited for buying and the period is marked blue. If the AO value is not 
//    above previous, the period is considered suited for selling and the 
//    indicator marks it as red.
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


BWAC(nLengthSlow,nLengthFast) =>
    pos = 0.0
    xSMA1_hl2 = sma(hl2, nLengthFast)
    xSMA2_hl2 = sma(hl2, nLengthSlow)
    xSMA1_SMA2 = xSMA1_hl2 - xSMA2_hl2
    xSMA_hl2 = sma(xSMA1_SMA2, nLengthFast)
    nRes =  xSMA1_SMA2 - xSMA_hl2
    pos:= iff(nRes > nRes[1], 1,
             iff(nRes < nRes[1], -1, nz(pos[1], 0)))  
    pos

strategy(title="Combo Backtest 123 Reversal & Awesome Oscillator (AC)", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Awesome Oscillator (AC) ----")
nLengthSlow = input(34, minval=1, title="Length Slow")
nLengthFast = input(5, minval=1, title="Length Fast")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posBWAC = BWAC(nLengthSlow,nLengthFast)
pos = iff(posReversal123 == 1 and posBWAC == 1 , 1,
	   iff(posReversal123 == -1 and posBWAC == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430763

> Last Modified

2023-11-01 16:28:55
