
> Name

123反转与费希尔变换指标组合策略123-Reversal-and-Fisher-Transform-Indicator-Combo-Strategy

> Author

ChaoZhang

> Strategy Description



This strategy is named “123 Reversal and Fisher Transform Indicator Combo Strategy”. It incorporates the 123 reversal pattern and Fisher transform indicator, entering trades when both give concurring signals.

The 123 reversal pattern refers to prices gaping significantly over three consecutive days with the third day closing in the opposite direction of the previous two days. Statistically, 123 reversals have higher win rates. 

The Fisher transform indicator normalizes prices into a Gaussian-like curve, and its extreme swing turning points can effectively identify price reversals.

The trading logic is:

1. The 123 reversal pattern shows buy or sell signals. 

2. The Fisher transform curve shows buy or sell signals.

3. When the two give concurring signals, the corresponding buy or sell trades are taken. 

4. When the two give opposing signals, positions are kept flat.

The advantage of this strategy is the indicator combo can improve judgment accuracy of reversal timing. But parameter optimization is still crucial, and rigorous money management is a must. 

In conclusion, indicator integration forms a more comprehensive analytical perspective. But traders still need sufficient discretion to adjust strategies based on market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|10|LengthFTI|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 28/08/2020
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
// 	Market prices do not have a Gaussian probability density function
// 	as many traders think. Their probability curve is not bell-shaped.
// 	But trader can create a nearly Gaussian PDF for prices by normalizing
// 	them or creating a normalized indicator such as the relative strength
// 	index and applying the Fisher transform. Such a transformed output 
// 	creates the peak swings as relatively rare events.
// 	Fisher transform formula is: y = 0.5 * ln ((1+x)/(1-x))
// 	The sharp turning points of these peak swings clearly and unambiguously
// 	identify price reversals in a timely manner. 
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


FTI(Length) =>
    pos = 0
    nValue1 =0.0
    nFish = 0.0
    xHL2 = hl2
    xMaxH = highest(xHL2, Length)
    xMinL = lowest(xHL2,Length)
    nValue1 := 0.33 * 2 * ((xHL2 - xMinL) / (xMaxH - xMinL) - 0.5) + 0.67 * nz(nValue1[1])
    nValue2 = iff(nValue1 > .99,  .999,
	             iff(nValue1 < -.99, -.999, nValue1))
    nFish := 0.5 * log((1 + nValue2) / (1 - nValue2)) + 0.5 * nz(nFish[1])
    pos := iff(nFish > nz(nFish[1]), 1,
     	     iff(nFish < nz(nFish[1]), -1, nz(pos[1], 0)))  
    pos

strategy(title="Combo Backtest 123 Reversal & Fisher Transform Indicator", shorttitle="Combo", overlay = true)
Length = input(15, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthFTI = input(10, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posFTI = FTI(LengthFTI)
pos = iff(posReversal123 == 1 and posFTI == 1 , 1,
	   iff(posReversal123 == -1 and posFTI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/426618

> Last Modified

2023-09-13 17:35:36
