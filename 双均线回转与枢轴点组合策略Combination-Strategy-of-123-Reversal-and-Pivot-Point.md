
> Name

双均线回转与枢轴点组合策略Combination-Strategy-of-123-Reversal-and-Pivot-Point

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c945890971f640da5c.png)

[trans]
## 概述
本策略是将123形态回转策略和枢轴点策略进行组合,以期获得更高的胜率。其中123形态回转策略判断趋势反转点,而枢轴点策略确定关键支持与阻力位。两者结合,既可以捕捉趋势,又可以确定具体的入场与出场价格。

## 策略原理
### 123形态回转策略
该策略基于随机指标判断趋势反转点。具体原理是:
当收盘价连续2天低于之前收盘价,并且9日慢速STO指标低于50时,做多;当收盘价连续2天高于之前收盘价,并且9日快速STO指标高于50时,做空。

### 枢轴点策略 
该策略根据前一天的最高价、最低价与收盘价计算出3条支撑线与3条阻力线。具体计算方法为:
中枢点=(最高+最低+收盘)/3
支撑1=2*中枢点-最高
阻力1=2*中枢点-最低
支撑2=中枢点-(阻力1-支撑1)
阻力2=中枢点+(阻力1-支撑1)
支撑3=最低-2*(最高-中枢点)  
阻力3=最高+2*(中枢点-最低)
并根据支撑与阻力位判断入场与出场。

## 策略优势
1. 结合两种不同类型策略的优点,既可以判断趋势反转,又可以锁定具体价格位,胜率较高
2. 123形态策略可以有效判断短期内趋势反转点
3. 枢轴点策略可以利用关键支撑阻力位过滤假突破

## 风险与对冲
1. 双随机指标存在一定滞后,可能错过短线反转
2. 枢轴点并非百分之百有效,可能出现突破继续运行
3. 可以适当调整参数,或与其他指标组合使用来对冲风险

## 策略优化方向 
1. 可以测试不同参数对策略效果的影响
2. 可以尝试与其他指标或形态组合,提高策略效果 
3. 可以结合机器学习算法动态优化参数

## 总结
本策略巧妙地将趋势判断与关键价格位结合,既可判断趋势反转点,又可利用支撑阻力过滤信号。通过参数与策略组合优化,可以进一步提升效果。该策略值得量化交易者进一步研究与应用。

||

## Overview
This strategy combines the 123 reversal pattern strategy and the pivot point strategy to achieve a higher win rate. The 123 reversal pattern strategy identifies trend reversal points, while the pivot point strategy determines key support and resistance levels. By combining the two, it can capture trends while identifying specific entry and exit prices.

## Strategy Logic
### 123 Reversal Pattern Strategy
This strategy identifies trend reversal points using the Stochastic Oscillator indicator. Specifically: 
It goes long when the close price is higher than the previous close for 2 consecutive days and the 9-period slow STO is below 50; It goes short when the close price is lower than the previous close for 2 consecutive days and the 9-period fast STO is above 50.

### Pivot Point Strategy
This strategy calculates 3 support levels and 3 resistance levels based on the previous day's high, low and close prices. The calculations are:
Pivot Point = (High + Low + Close)/3
Support 1 = 2*Pivot Point – High
Resistance 1 = 2*Pivot Point – Low 
Support 2 = Pivot Point – (Resistance 1 – Support 1)
Resistance 2 = Pivot Point + (Resistance 1 – Support 1)
Support 3 = Low – 2*(High – Pivot Point)
Resistance 3 = High + 2*(Pivot Point – Low)
It then identifies entry and exit based on the support and resistance levels.

## Advantages
1. Combines the strengths of two different types of strategies to achieve higher win rate
2. The 123 pattern effectively identifies short-term trend reversals  
3. Pivot points use key S/R levels to filter false breaks

## Risks and Hedging
1. The double STO may lag and miss short-term reversals
2. Pivot points may not always hold, breakouts can continue  
3. Parameters can be adjusted or combined with other indicators to hedge risks

## Optimization Directions
1. Test impacts of different parameter sets
2. Combine with other indicators/patterns to improve performance  
3. Incorporate machine learning to dynamically optimize parameters

## Summary  
This strategy ingeniously combines trend identification and key price levels, enabling it to spot reversals while utilizing S/R to filter signals. Further improvements can be made through parameter tuning and combination with other strategies. It deserves more research and application by quant traders.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Pivot Point V2 ----|
|v_input_7|D|Resolution|
|v_input_8|0|Sell from : R1|R2|R3|
|v_input_9|0|Buy from : S1|S2|S3|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-16 00:00:00
end: 2024-01-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/04/2021
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
// Pivot points simply took the high, low, and closing price from the previous period and 
// divided by 3 to find the pivot. From this pivot, traders would then base their 
// calculations for three support, and three resistance levels. The calculation for the most 
// basic flavor of pivot points, known as ‘floor-trader pivots’, along with their support and 
// resistance levels.
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


PP2(res,SellFrom,BuyFrom) =>
    pos = 0.0
    xHigh  = security(syminfo.tickerid,res, high)
    xLow   = security(syminfo.tickerid,res, low)
    xClose = security(syminfo.tickerid,res, close)
    vPP = (xHigh+xLow+xClose) / 3
    vS1 = 2*vPP - xHigh 
    vR1 = 2*vPP-xLow
    vS2 = vPP - (vR1 - vS1)
    vR2 = vPP + (vR1 - vS1)
    vS3 = xLow - 2 * (xHigh - vPP)
    vR3 = xHigh + 2 * (vPP - xLow) 
    S =  iff(BuyFrom == "S1", vS1, 
          iff(BuyFrom == "S2", vS2,
           iff(BuyFrom == "S3", vS3,0)))
    B =  iff(SellFrom == "R1", vR1, 
          iff(SellFrom == "R2", vR2,
           iff(SellFrom == "R3", vR3,0)))
    pos := iff(close > B, 1,
             iff(close < S, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Pivot Point V2)", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Pivot Point V2 ----")
res = input(title="Resolution", type=input.resolution, defval="D")
SellFrom = input(title="Sell from ", defval="R1", options=["R1", "R2", "R3"])
BuyFrom = input(title="Buy from ", defval="S1", options=["S1", "S2", "S3"])
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posPP2 = PP2(res,SellFrom,BuyFrom)
pos = iff(posReversal123 == 1 and posPP2 == 1 , 1,
	   iff(posReversal123 == -1 and posPP2 == -1, -1, 0)) 
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

https://www.fmz.com/strategy/438951

> Last Modified

2024-01-16 15:48:44
