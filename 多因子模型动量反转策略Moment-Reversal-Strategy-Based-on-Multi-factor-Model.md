
> Name

多因子模型动量反转策略Moment-Reversal-Strategy-Based-on-Multi-factor-Model

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1957ba2455488691cf2.png)

[trans]

### 概述

多因子模型动量反转策略通过结合多因子模型和动量反转策略,实现了更稳定和更高的回报。该策略使用123反转和联响指标作为两个独立的信号,并在二者信号一致时开仓建立头寸。

### 策略原理  

多因子模型动量反转策略由两个子策略组成:123反转策略和联响指标策略。

123反转策略基于价格在2天内连续上涨或下跌,并结合STOCH指标判断市场是否过冷或过热来产生交易信号。具体来说,当价格连续2天上涨,同时9日STOCH慢线低于50时看多;当价格连续2天下跌,同时9日STOCH快线高于50时看空。  

联响指标策略则利用不同周期均线和震荡指标的叠加来判断趋势方向和力度。包括线性加权、正弦相加等方法综合判断多空态势。该指标经过等级划分,返回1到9表示强势多头,-1到-9表示强势空头。

最后,策略在二者信号一致时选择建立多头或空头仓位。

### 优势分析

多因子模型动量反转策略结合了反转因子和势能因子,能捕捉反转机会的同时顺势而为、避免假突破,从而具有更高的胜率。策略优势具体体现在:  

1. 123反转策略作为反转信号源,能抓住短期反转带来超额收益。  

2. 联响指标判断趋势方向和力度,避免反转空间过大带来的亏损风险。  

3. 二者结合,一定程度上互补优势、弥补不足,提高信号质量。  

4. 相比单一模型,多因子结合能够提高策略稳定性。

### 风险分析  

尽管多因子模型动量反转策略有一定优势,但仍存在以下一些风险:

1. 反转未完成,价格再次调头回落带来的损失。可以适当调整止损防范。  

2. 二者信号不一致时无法确定方向。可以通过参数调整使二者匹配度更高。

3. 模型过于复杂,参数众多,不易调节和优化。  

4. 需同时关注多个子模型,实盘操作难度和心理压力较大。可以引入一定的自动交易元素减轻操作负担。

### 优化方向  

多因子模型动量反转策略可从以下几个方面进行优化:

1. 调整123反转策略的参数,使反转信号更准确可靠。  

2. 调整联响指标的参数,使判断的趋势更接近真实趋势。

3. 引入机器学习算法自动优化参数组合。

4. 增加仓位管理模块,让仓位调整更加量化和系统化。

5. 增加止损模块。通过事先设置止损价格有效控制单笔损失。


### 总结  

多因子模型动量反转策略综合运用了反转因子和势能因子,在保证较高信号质量的基础上,通过多因子叠加获得更高胜率。该策略具有捕捉反转机会、顺势而为的双重优势,是一种高效稳定的量化策略。未来可从参数调整、风险控制等方面不断优化,使策略的收益风险比进一步提高。

||

### Overview  

The Moment Reversal Strategy Based on Multi-factor Model combines multi-factor model and momentum reversal strategy to achieve more stable and higher returns. The strategy uses the 123 reversal and confluence indicators as two independent signals and establishes a position when the two signals are consistent.  

### Strategy Principle

The strategy consists of two sub-strategies: 123 reversal strategy and confluence indicator strategy.  

The 123 reversal strategy generates trading signals based on whether the price has risen or fallen continuously for 2 days, combined with the STOCH indicator to judge whether the market is overcooled or overheated. Specifically, when the price rises continuously for 2 days and the 9-day STOCH slow line is below 50, it is bullish. When the price falls continuously for 2 days and the 9-day STOCH fast line is above 50, it is bearish.   

The confluence indicator strategy utilizes the superposition of moving averages and oscillators of different cycles to determine the trend direction and strength. Including linear weighting, sine addition and other methods to comprehensively judge the long and short momentum. The indicator is graded and returns 1 to 9 indicating strong bullish momentum and -1 to -9 indicating strong bearish momentum.  

Finally, the strategy establishes long or short positions when both signals are consistent.  

### Advantage Analysis   

The Moment Reversal Strategy Based on Multi-factor Model combines reversal factors and momentum factors to capture reversal opportunities while following the trend to avoid false breakouts, thus having higher win rates. The advantages of the strategy are specifically reflected in:

1. As a reversal signal source, the 123 reversal strategy can capture excess returns from short-term reversals.  

2. The confluence indicator judges the trend direction and strength to avoid the risk of loss caused by too large reversal space.

3. The combination of the two strategies complements each other's strengths and weaknesses to some extent and improves signal quality.  

4. Compared with a single model, the combination of multiple factors can improve the stability of strategies.  

### Risk Analysis   

Although the Moment Reversal Strategy Based on Multi-factor Model has certain advantages, there are still some risks:  

1. The risk of loss caused by reversal not being completed and prices turning around again. Appropriate stop loss can be set to guard against this.

2. Unable to determine direction when two signals are inconsistent. Parameter adjustment can be made to increase the matching degree.  

3. The model is too complex with too many parameters, which is difficult to adjust and optimize.  

4. Multiple submodels need to be monitored simultaneously, resulting in greater difficulty in operation and psychological pressure. Automatic trading elements can be introduced to reduce operational burden.

### Optimization Directions

The Moment Reversal Strategy Based on Multi-factor Model can be optimized in the following aspects:  

1. Adjust the parameters of the 123 reversal strategy to make reversal signals more accurate and reliable.  

2. Adjust the parameters of the confluence indicator to make the determined trends closer to the actual ones.  

3. Introduce machine learning algorithms to automatically optimize parameter combinations.  

4. Add position management module to make position adjustment more quantitative and systematic.

5. Add stop loss module. Effectively control single loss by presetting stop loss price.

### Summary   

The Moment Reversal Strategy Based on Multi-factor Model comprehensively employs reversal factors and momentum factors. On the basis of ensuring relatively high signal quality, it obtains higher win rate through multi-factor stacking. The strategy has the dual advantages of capturing reversal opportunities and following the trend. It is an efficient and stable quantitative strategy. Follow-up optimizations can be made in aspects such as parameter adjustment and risk control to further improve the strategy's risk-reward ratio.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|10|Harmonic|
|v_input_6|9|BuyBand|
|v_input_7|-9|SellBand|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 11/11/2019
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
// This is modified version of Dale Legan's "Confluence" indicator written by Gary Fritz.
// ================================================================
// Here is Gary`s commentary:
// Since the Confluence indicator returned several "states" (bull, bear, grey, and zero), 
// he modified the return value a bit:
// -9 to -1 = Bearish
// -0.9 to 0.9 = "grey" (and zero)
// 1 to 9 = Bullish
// The "grey" range corresponds to the "grey" values plotted by Dale's indicator, but 
// they're divided by 10.
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

Confluence(Harmonic, BuyBand, SellBand) =>
    pos = 0.0
    Price = close
    STL = round((Harmonic * 2) - 1 - 0.5)
    ITL = round((STL * 2) - 1 - 0.5)
    LTL = round((ITL * 2) - 1 - 0.5)
    HOFF = round(Harmonic / 2 - 0.5)
    SOFF = round(STL / 2 - 0.5)
    IOFF = round(ITL / 2 - 0.5)
    xHavg = sma(Price, Harmonic)
    xSavg = sma(Price, STL)
    xIavg = sma(Price, ITL)
    xLavg = sma(Price, LTL)
    xvalue2 = xSavg - xHavg[HOFF]
    xvalue3 = xIavg - xSavg[SOFF]
    xvalue12 = xLavg - xIavg[IOFF]
    xmomsig = xvalue2 + xvalue3 + xvalue12
    xLavgOHLC = sma(ohlc4, LTL - 1)
    xH2 = sma(Price, Harmonic - 1)
    xS2 = sma(Price, STL - 1)
    xI2 = sma(Price, ITL - 1)
    xL2 = sma(Price, LTL - 1)
    DerivH = (xHavg * 2) - xHavg[1]
    DerivS = (xSavg * 2) - xSavg[1]
    DerivI = (xIavg * 2) - xIavg[1]
    DerivL = (xLavg * 2) - xLavg[1]
    SumDH = Harmonic * DerivH
    SumDS = STL * DerivS
    SumDI = ITL * DerivI
    SumDL = LTL * DerivL
    LengH = Harmonic - 1
    LengS = STL - 1
    LengI = ITL - 1
    LengL = LTL - 1
    N1H = xH2 * LengH
    N1S = xS2 * LengS
    N1I = xI2 * LengI
    N1L = xL2 * LengL
    DRH = SumDH - N1H
    DRS = SumDS - N1S
    DRI = SumDI - N1I
    DRL = SumDL - N1L
    SumH = xH2 * (Harmonic - 1)
    SumS = xS2 * (STL - 1)
    SumI = xI2 * (ITL - 1)
    SumL = xLavgOHLC * (LTL - 1)
    xvalue5 = (SumH + DRH) / Harmonic
    xvalue6 = (SumS + DRS) / STL
    xvalue7 = (SumI + DRI) / ITL
    xvalue13 = (SumL + DRL) / LTL
    value9 = xvalue6 - xvalue5[HOFF]
    value10 = xvalue7 - xvalue6[SOFF]
    value14 = xvalue13 - xvalue7[IOFF]
    xmom = value9 + value10 + value14
    HT = sin(xvalue5 * 2 * 3.14 / 360) + cos(xvalue5 * 2 * 3.14 / 360)
    HTA = sin(xHavg * 2 * 3.14 / 360) + cos(xHavg * 2 * 3.14 / 360)
    ST = sin(xvalue6 * 2 * 3.14 / 360) + cos(xvalue6 * 2 * 3.14 / 360)
    STA = sin(xSavg * 2 * 3.14 / 360) + cos(xSavg * 2 * 3.14 / 360)
    IT = sin(xvalue7 * 2 * 3.14 / 360) + cos(xvalue7 * 2 * 3.14 / 360)
    ITA = sin(xIavg * 2 * 3.14 / 360) + cos(xIavg * 2 * 3.14 / 360)
    xSum = HT + ST + IT
    xErr = HTA + STA + ITA
    Condition2 = (((xSum > xSum[SOFF]) and (xHavg < xHavg[SOFF])) or ((xSum < xSum[SOFF]) and (xHavg > xHavg[SOFF])))
    Phase = iff(Condition2 , -1 , 1)
    xErrSum = (xSum - xErr) * Phase
    xErrSig = sma(xErrSum, SOFF)
    xvalue70 = xvalue5 - xvalue13
    xvalue71 = sma(xvalue70, Harmonic)
    ErrNum = iff (xErrSum > 0 and xErrSum < xErrSum[1] and xErrSum < xErrSig, 1,
                  iff (xErrSum > 0 and xErrSum < xErrSum[1] and xErrSum > xErrSig, 2, 
                     iff (xErrSum > 0 and xErrSum > xErrSum[1] and xErrSum < xErrSig, 2,
                         iff (xErrSum > 0 and xErrSum > xErrSum[1] and xErrSum > xErrSig, 3,
                          iff (xErrSum < 0 and xErrSum > xErrSum[1] and xErrSum > xErrSig, -1,
                             iff (xErrSum < 0 and xErrSum < xErrSum[1] and xErrSum > xErrSig, -2,
                              iff (xErrSum < 0 and xErrSum > xErrSum[1] and xErrSum < xErrSig, -2,
                                 iff (xErrSum < 0 and xErrSum < xErrSum[1] and xErrSum < xErrSig, -3, 0))))))))

    momNum = iff (xmom > 0 and xmom < xmom[1] and xmom < xmomsig , 1,
              iff (xmom > 0 and xmom < xmom[1] and xmom > xmomsig, 2,
               iff (xmom > 0 and xmom > xmom[1] and xmom < xmomsig, 2,
                 iff (xmom > 0 and xmom > xmom[1] and xmom > xmomsig, 3,
                  iff (xmom < 0 and xmom > xmom[1] and xmom > xmomsig, -1,
                   iff (xmom < 0 and xmom < xmom[1] and xmom > xmomsig, -2,
                     iff (xmom < 0 and xmom > xmom[1] and xmom < xmomsig, -2,
                      iff (xmom < 0 and xmom < xmom[1] and xmom < xmomsig, -3, 0))))))))
    
    TCNum =  iff (xvalue70 > 0 and xvalue70 < xvalue70[1] and xvalue70 < xvalue71, 1,
              iff (xvalue70 > 0 and xvalue70 < xvalue70[1] and xvalue70 > xvalue71, 2,
               iff (xvalue70 > 0 and xvalue70 > xvalue70[1] and xvalue70 < xvalue71, 2,
                 iff (xvalue70 > 0 and xvalue70 > xvalue70[1] and xvalue70 > xvalue71, 3,
                  iff (xvalue70 < 0 and xvalue70 > xvalue70[1] and xvalue70 > xvalue71, -1,
                   iff (xvalue70 < 0 and xvalue70 < xvalue70[1] and xvalue70 > xvalue71, -2,
                     iff (xvalue70 < 0 and xvalue70 > xvalue70[1] and xvalue70 < xvalue71, -2,
                      iff (xvalue70 < 0 and xvalue70 < xvalue70[1] and xvalue70 < xvalue71, -3,0))))))))
    
    value42 = ErrNum + momNum + TCNum
    Confluence = iff (value42 > 0 and xvalue70 > 0, value42,
                  iff (value42 < 0 and xvalue70 < 0, value42,
                   iff ((value42 > 0 and xvalue70 < 0) or (value42 < 0 and xvalue70 > 0), value42 / 10, 0)))
    Res1 = iff (Confluence >= 1, Confluence, 0)
    Res2 = iff (Confluence <= -1, Confluence, 0)
    Res3 = iff (Confluence == 0, 0, iff (Confluence > -1 and Confluence < 1, 10 * Confluence, 0))
    pos := iff(Res2 >= SellBand and Res2 != 0, -1,
	         iff(Res1 <= BuyBand and Res1 != 0, 1, 
    	      iff(Res3 != 0, 2, nz(pos[1], 0))))
    pos

strategy(title="Combo Backtest 123 Reversal & Confluence", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Harmonic = input(10, minval=1)
BuyBand = input(9)
SellBand = input(-9)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posConfluence = Confluence(Harmonic, BuyBand, SellBand)
pos = iff(posReversal123 == 1 and posConfluence == 1 , 1,
	   iff(posReversal123 == -1 and posConfluence == -1, -1, 0)) 
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

https://www.fmz.com/strategy/436148

> Last Modified

2023-12-21 16:26:10
