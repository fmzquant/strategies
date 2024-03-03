
> Name

双因子组合反转交易策略Dual-factor-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1079357eb3817af5f4c.png)

[trans]
### 概述

本策略首先利用价格反转信号进行交易,然后结合趋势过滤指标进行筛选,实现双因子驱动。其中价格反转部分采用123反转交易系统,趋势过滤部分采用提取趋势交易系统(Extracting The Trend,ETT),两者结合形成双因子驱动的反转交易策略。

### 策略原理

价格反转部分使用123反转系统。该系统来源于Ulf Jensen的《我如何在期货市场上翻三倍的资金》一书中第183页。其交易信号的产生有以下几个条件:

1. 前一日收盘价低于前二日收盘价
2. 当前收盘价高于前一日收盘价
3. 9日慢速K线低于50

满足上述条件时产生买入信号;相反,当

1. 前一日收盘价高于前二日收盘价  
2. 当前收盘价低于前一日收盘价
3. 9日快速K线高于50

满足上述条件时产生卖出信号。

该部分反转交易系统的目的是在价格形成短期反转时捕捉其移动。

趋势过滤部分使用提取趋势系统(ETT)。ETT系统通过业绩滤波和均线组合判断趋势方向。在本策略中,其主要作用是对价格反转信号进行验证,避免在无明确趋势时进行反转操作。

该策略将两个子策略的交易信号结合,最终实现双因子驱动的反转交易。

### 优势分析

双因子组合反转交易策略通过子策略的组合,综合了各自的优势,主要体现在:  

1. 123反转策略能够捕捉价格短期反转 oppurtunities
2. ETT策略可有效过滤无明确趋势场景,避免反转交易的风险
3. 双因子驱动提高信号质量

因此,该策略可以有效过滤无效反转信号,在趋势judgment正确的前提下,进行反转操作,从而提高交易系统的overall performance。

### 风险分析

双因子组合反转交易策略主要存在以下几个方面的风险:

1. 反转后价格继续原趋势运行的风险。如Compiler的参数设置不当,反转信号产生过于频繁,从而错过趋势oppurtunities。
2. ETT策略judgment失误带来的风险。ETT策略本身也会产生judgment失误,导致反转交易亏损。
3. 双因子驱动机制本身存在的风险。两种交易信号同时判断错误的概率要比单一信号判断错误的概率更低,但是同时判断错误依然存在概率,会扩大损失。

为降低上述风险,可以考虑调整 Compiler参数,优化反转策略和ETT策略,使judgment更加准确,同时适当放宽反转交易的止损范围。实践中也需要充分考虑双因子驱动自身的风险,控制position规模。

### 优化方向 

本策略可以从以下几个方面进行优化:

1. 优化反转系统参数,找到更佳参数组合
2. 优化ETT系统参数,提高趋势judgment准确性
3. 尝试其他价格反转策略与ETT组合
4. 增加position规模控制机制
5. 增加更多因子驱动

在保持策略思路与主要交易信号逻辑的前提下,通过参数与组合优化,有望获得更好的回测结果。

### 总结

双因子组合反转交易策略通过价格反转信号与趋势过滤信号的有机结合,实现基于多因子判断的交易系统。相较于单一反转信号,该策略可以更好地在保证捕捉短期价格反转的基础上,避免无明确趋势场景下的假信号,从而提高信号质量。通过优化参数与增加其他因子,有望获得更佳的绩效表现。

||

### Overview  

This strategy firstly utilizes price reversal signals for trading, then combines trend filtering indicators for screening, implementing dual-factor driven system. The price reversal part adopts 123 reversal trading system, while the trend filtering part uses Extracting The Trend (ETT) system. The combination forms a dual-factor driven reversal trading strategy.

### Strategy Logic  

The price reversal part uses 123 reversal system. This system is from the book "How I Tripled My Money In The Futures Market" by Ulf Jensen, page 183. The trading signal generation has the following conditions:  

1. Previous close is lower than the close 2 days ago
2. Current close is higher than previous close  
3. 9-day slow stochastic is lower than 50

When the above conditions are met, a buy signal is generated. On the contrary, when  

1. Previous close is higher than the close 2 days ago
2. Current close is lower than previous close
3. 9-day fast stochastic is higher than 50  

A sell signal is generated.

The goal of this reversal system is to capture short-term reversals when prices form temporary reverse.

The trend filtering part uses Extracting The Trend (ETT) system. ETT system judges trend direction through filter and moving average combination. In this strategy, its main function is to verify the price reversal signals, avoiding reversal operation when there is no clear trend.

This strategy combines the trading signals from both sub-strategies, eventually realizing a dual-factor driven reversal trading system.

### Advantage Analysis 

The dual-factor reversal trading strategy integrates the advantages of each sub-strategy through combination:  

1. 123 reversal system can capture short-term reversal oppurtunities  
2. ETT system can effectively filter scenarios without clear trend, avoiding reversal trading risk
3. Dual-factor driven improves signal quality  

Therefore, this strategy can effectively filter invalid reversal signals. With correct trend judgment, it conducts reversal operation, thereby improving overall performance of the trading system.

### Risk Analysis

The dual-factor reversal trading strategy has the following main risks:  

1. The risk of price continuing original trend after reversal. Improper Compiler parameter setting may lead to over-frequent reversal signal generation, thus missing trend oppurtunities.
2. The risk from ETT system's judgment error. ETT system itself also has judgment errors, leading to loss in reversal trading. 
3. The inherent risk of dual-factor driven mechanism. Though less likely, there is still probability that both trading signals make wrong judgement at the same time, which amplifies losses.

To reduce above risks, considerations include adjusting Compiler parameters, optimizing the reversal & ETT strategies for better judgment, as well as appropriately expanding stop loss range for reversal trading. In practice, the inherent risk of dual-factor driven should be fully considered for position sizing control.  

### Optimization  

This strategy can be optimized in the following aspects:

1. Optimize reversal system parameters for better parameter combination
2. Optimize ETT system parameters for higher judgment accuracy  
3. Try combining other price reversal strategies with ETT
4. Add position sizing control mechanism
5. Drive with more factors  

With the strategy logic and key trading signals unchanged, better backtest results can be expected through parameter and combination optimization.  

### Conclusion  

The dual-factor reversal trading strategy organically combines price reversal signals and trend filtering for multi-factor judgment system. Compared with single reversal signal strategies, this strategy can better capture short-term price reversals while avoiding false signals when there is no clear trend, thereby improving signal quality. Better performance can be expected through parameter optimization and adding other factors.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|20|LengthETT|
|v_input_6|0.5|Delta|
|v_input_7|false|Trigger|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-26 00:00:00
end: 2023-12-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 03/08/2020
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
// Extracting The Trend
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


ETT(Length,Delta,Trigger) =>
    pos = 0
    xBandpassFilter = 0.0
    xPrice = hl2
    beta = cos(3.1415 * (360 / Length) / 180)
    gamma = 1 / cos(3.1415 * (720 * Delta / Length) / 180)
    alpha = gamma - sqrt(gamma * gamma - 1)
    xBandpassFilter := 0.5 * (1 - alpha) * (xPrice - xPrice[2]) + beta * (1 + alpha) * nz(xBandpassFilter[1]) - alpha * nz(xBandpassFilter[2])
    xMean = sma(xBandpassFilter, 2 * Length)
    pos :=iff(xMean > Trigger, 1,
	       iff(xMean < Trigger, -1, nz(pos[1], 0)))     
    pos

strategy(title="Combo Backtest 123 Reversal & Extracting The Trend", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthETT = input(20, minval=1)
Delta = input(0.5)
Trigger = input(0)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posETT = ETT(LengthETT,Delta,Trigger)
pos = iff(posReversal123 == 1 and posETT == 1 , 1,
	   iff(posReversal123 == -1 and posETT == -1, -1, 0)) 
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

https://www.fmz.com/strategy/436791

> Last Modified

2023-12-27 17:22:31
