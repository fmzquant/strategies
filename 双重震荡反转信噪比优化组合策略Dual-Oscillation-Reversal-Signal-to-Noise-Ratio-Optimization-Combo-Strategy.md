
> Name

双重震荡反转信噪比优化组合策略Dual-Oscillation-Reversal-Signal-to-Noise-Ratio-Optimization-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a414547ab37c8a8268.png)

# 

## Overview

This strategy combines the dual oscillation reversal strategy and the signal-to-noise ratio optimization strategy to form a more powerful and stable trading strategy. The strategy aims to generate more accurate trading signals at trend reversal points.

## Strategy Logic

The dual oscillation reversal strategy calculates the fast and slow K values of the last 14 days to determine if there is a reversal over two consecutive trading days. If the reversal happens when the fast K is below 50, it is a buy signal. If the fast K is above 50, it is a sell signal.

The signal-to-noise ratio optimization strategy calculates the signal-to-noise ratio of the last 21 days and smooths it with a 29-day simple moving average. When the signal-to-noise ratio crosses above the moving average, it is a sell signal. When it crosses below, it is a buy signal.

Finally, this strategy only initiates buy or sell trades when both strategies issue the same signal.

## Advantage Analysis

1. Combining multiple strategies can generate more accurate trading signals and avoid false signals from a single strategy.

2. The dual oscillation reversal strategy catches trend reversal points. The signal-to-noise ratio optimization filters out false signals. Working together, they can accurately trade at reversals.

3. Optimized parameters like 14-day fast/slow stochastics and 21-day signal-to-noise period capture recent trends without too much noise. 

4. The dual confirmation signals significantly reduce trading risk and avoid unnecessary losses.

## Risk Analysis

1. Reversal signals may lag and miss absolute bottoms or tops. Parameters can be adjusted to shorten the lag.

2. Dual signal confirmation may miss some trading opportunities. Confirmation conditions could be relaxed but also increase risk.

3. Signal-to-noise ratio parameters need optimization. Improper periods may cause missing or false signals.

4. Monitoring multiple indicators increases complexity. Code optimization and computing resources need consideration.

## Optimization Directions

1. Test more indicator combinations to find better combo signals, like MACD, RSI etc.

2. Optimize parameters of the reversal strategy for more accurate and timely signals. 

3. Optimize signal-to-noise ratio periods to find the optimal balance.

4. Add stop loss strategies to control potential loss for single trades.

5. Consider machine learning methods to auto optimize parameters for better adaptability.

## Conclusion

This strategy combines dual oscillation reversal and signal-to-noise ratio strategies to provide stable signals at trend reversal points. Optimized parameters significantly reduce false signals, and dual confirmation lowers trading risks. Further optimizations like indicator parameters, stop loss can improve performance. Overall, this is a stable strategy with practical trading value.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|21|Days|
|v_input_6|29|Smooth|
|v_input_7|false|Trade reverse|


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
//  Copyright by HPotter v1.0 196/01/2021
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
// The signal-to-noise (S/N) ratio. 
// And Simple Moving Average.
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

SignalToNoise(length) =>
    StN = 0.0
    for i = 1 to length-1
        StN := StN + (1/close[i])/length
    StN := -10*log(StN)

StN(length,Smooth) =>
    pos = 0.0
    StN = SignalToNoise(length)
    SMAStN = sma(StN, Smooth)
    pos := iff(SMAStN[0] > StN[0] , -1,
    	     iff(SMAStN[0] < StN[0], 1, 0)) 
    pos

strategy(title="Combo Backtest 123 Reversal & Signal To Noise", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
lengthStN = input(title="Days", type=input.integer, defval=21, minval=2)
SmoothStN =  input(title="Smooth", type=input.integer, defval=29, minval=2)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posStN = StN(lengthStN,SmoothStN)
pos = iff(posReversal123 == 1 and posStN == 1 , 1,
	   iff(posReversal123 == -1 and posStN == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430772

> Last Modified

2023-11-01 16:57:13
