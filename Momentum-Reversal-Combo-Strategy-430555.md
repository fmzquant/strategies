
> Name

Momentum-Reversal-Combo-Strategy-430555

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a409f640a71b723273.png)



## Overview

This strategy combines two momentum indicators to uncover more trading opportunities. The first indicator is a stochastic oscillator reversal strategy proposed in Ulf Jensen's book. The second indicator is John Ehlers' detrended synthetic price. The strategy takes positions when both indicators give concurring buy or sell signals.

## Strategy Logic

The logic behind the stochastic oscillator reversal is: go long when close is lower than previous close for 2 straight days and fast line is above slow line; go short when close is higher than previous close for 2 straight days and fast line is below slow line. 

The detrended synthetic price (DSP) is calculated as:

DSP = EMA(HL/2, 0.25 cycle) - EMA(HL/2, 0.5 cycle)

where HL/2 is the midpoint of high and low, 0.25 cycle EMA represents short-term trend and 0.5 cycle EMA represents long-term trend. DSP shows the price deviation from its dominant cycle. Buy when DSP crosses above threshold and sell when crossing below.

This strategy combines the signals from both indicators. It only enters positions when both indicators give concurring signals.

## Advantage Analysis

- Filtering uncertain signals with two indicators reduces wrong trades
- Validation between indicators enhances signal reliability  
- Stochastic reversal catches short-term reversal opportunities
- DSP identifies medium to long term trends
- Combining two indicators provides flexibility to catch reversals and follow trends

## Risk Analysis

- Stochastic performs poorly in ranging markets
- DSP may give wrong signals near trend turning points  
- Missing some opportunities by only trading on concurring signals
- Needs proper parameter tuning to achieve combinatorial effect

## Enhancement Directions

- Test different parameters to optimize indicator performance
- Try different indicator weighting, e.g. delay DSP signals
- Add stop loss to control risks
- Incorporate more indicators to build multi-factor model

## Conclusion

The strategy combines two different momentum indicators and improves signal quality through double filtering while maintaining trade frequency and controlling risks. But the limitations of the individual indicators need to be noted and parameters properly tuned. With continuous optimizations, the strategy has the potential to generate alpha over the broad market.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|LengthDSP|
|v_input_6|-25|SellBand|
|v_input_7|25|BuyBand|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/11/2019
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
// Detrended Synthetic Price is a function that is in phase with the 
// dominant cycle of real price data. This DSP is computed by subtracting 
// a half-cycle exponential moving average (EMA) from the quarter cycle 
// exponential moving average.
// See "MESA and Trading Market Cycles" by John Ehlers pages 64 - 70. 
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

D_DSP(Length, SellBand, BuyBand) =>
    pos = 0.0
    xHL2 = hl2
    xEMA1 = ema(xHL2, Length)
    xEMA2 = ema(xHL2, 2 * Length)
    xEMA1_EMA2 = xEMA1 - xEMA2
    pos := iff(xEMA1_EMA2 > SellBand, 1,
	         iff(xEMA1_EMA2 < BuyBand, -1, nz(pos[1], 0))) 
	pos

strategy(title="Combo Backtest 123 Reversal & D_DSP (Detrended Synthetic Price) V 2", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthDSP = input(14, minval=1)
SellBand = input(-25)
BuyBand = input(25)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posD_DSP = D_DSP(LengthDSP, SellBand, BuyBand)
pos = iff(posReversal123 == 1 and posD_DSP == 1 , 1,
	   iff(posReversal123 == -1 and posD_DSP == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430555

> Last Modified

2023-10-30 11:49:26
