
> Name

Reversal-Momentum-Compound-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/143e58dcb803649f236.png)

## Overview

The Reversal Momentum Compound strategy combines a reversal strategy and a momentum strategy. By utilizing both price reversal signals and momentum indicator signals, it captures market turning points more precisely and gets in the market in a timely manner as price starts to reverse.  

## Strategy Logic

The strategy consists of two parts:

1. 123 Reversal Strategy: Go long when close is higher than previous close for 2 consecutive days after 2 days of lower close, and 9-day slow K line is below 50; Go short when close is lower than previous close for 2 consecutive days after 2 days of higher close, and 9-day fast K line is above 50.

2. DAPD Momentum Breakout Strategy: DAPD is the average difference between 21-day high and 21-day low. Determine entry and exit points based on DAPD breakout.

A entry signal is generated when two strategies give aligned signals. Stay sideline when signals are conflicting.   

## Advantages

The strategy combines the merits of reversal and momentum strategies, capturing turning points more precisely. Main advantages:

1. Dual filter increases signal reliability. Higher success rate when signals align. 

2. 123 pattern reduces risk of whipsaws.

3. DAPD momentum suitable for trending products.

## Risks

1. Signal timing mismatch risk. Signals from two strategies may not align perfectly.

2. Parameter tuning difficulty. Hard to optimize two sets of parameters together.  

3. Doubled transaction cost risk. Commission fees apply to both strategies.

## Optimization

1. Optimize signal alignment of two strategies.

2. Test effectiveness of different parameter sets on different products.  

3. Only take high-conviction signals to filter out weak ones. 

## Conclusion

The Reversal Momentum Compound strategy captures reversing price timely by combining merits of reversal and momentum strategies. Dual filters increase success rate. Further performance improvement can be achieved by optimizing signal alignment. The strategy suits investors with sufficient capital and trading expertise.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|21|LengthDAPD|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-28 00:00:00
end: 2024-01-04 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 10/12/2019
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
// This indicator is similar to Bollinger Bands. It based on DAPD - Daily
// Average Price Delta. DAPD is based upon a summation for each of the
// highs (hod) for the 21 days prior to today minus the summation for
// each of the lows (lod) for the last 21 days prior to today. The result
// of this calculation would then be divided by 21.
// It will be buy when high above previos DAPD high and sell if low below previos DAPD low
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

DAPD(Length) =>
    pos = 0.0
    xHighSMA = sma(high, Length)
    xLowSMA = sma(low, Length)        
    nDAPD = xHighSMA - xLowSMA
    nTop = high + nDAPD
    nBottom = low - nDAPD
    pos :=  iff(high > nTop[1], 1,
    	     iff(low < nBottom[1], -1, nz(pos[1], 0)))    
    pos

strategy(title="Combo Backtest 123 Reversal & DAPD", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthDAPD = input(21, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posDAPD = DAPD(LengthDAPD)
pos = iff(posReversal123 == 1 and posDAPD == 1 , 1,
	   iff(posReversal123 == -1 and posDAPD == -1, -1, 0)) 
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

https://www.fmz.com/strategy/437769

> Last Modified

2024-01-05 14:06:21
