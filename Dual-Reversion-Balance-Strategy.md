
> Name

Dual-Reversion-Balance-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ad4ecbd5283da99937.png)


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
