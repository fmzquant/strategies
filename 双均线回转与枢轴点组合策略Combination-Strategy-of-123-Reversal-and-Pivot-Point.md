
> Name

双均线回转与枢轴点组合策略Combination-Strategy-of-123-Reversal-and-Pivot-Point

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c945890971f640da5c.png)


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
