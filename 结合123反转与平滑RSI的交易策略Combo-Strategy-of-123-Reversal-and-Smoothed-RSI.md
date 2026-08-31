
> Name

结合123反转与平滑RSI的交易策略Combo-Strategy-of-123-Reversal-and-Smoothed-RSI

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1352252d150b14addeb.png)



## Overview

This strategy combines the 123 reversal pattern and smoothed RSI indicator to capture trend reversal points more accurately for higher win rate. It is a very versatile trend reversal trading strategy that can be applied to any timeframe and instrument.

## Strategy Logic

1. 123 reversal pattern identification: Bottom reversal signal when the close prices of previous two days form a high-low point and third day's close is higher than previous day. Top reversal signal when close prices of previous two days form a low-high point and third day's close is lower than previous day.

2. Smoothed RSI indicator: Smoothed RSI reduces the lag of normal RSI by using weighted moving average. RSI crossing above the high threshold is buy signal. RSI crossing below the low threshold is sell signal.

3. Strategy signal: Trade signal is only generated when 123 reversal pattern and smoothed RSI signals agree. Buy when 123 reversal shows bottom and RSI crosses high level. Sell when 123 reversal forms top and RSI crosses low level.

## Advantages

1. Combining trend indicator RSI and reversal pattern can accurately identify trend reversal points. 

2. Smoothed RSI reduces the lagging issue of normal RSI.

3. 123 reversal pattern is simple and easy to identify. 

4. Flexible parameters can be adjusted for different instruments and timeframes.

5. Easy to optimize and improve with high extensibility.

## Risks

1. Simple 123 reversal may cause false signals during minor pullbacks.

2. Smoothed RSI optimization is insufficient and prone to overfitting.

3. Dual confirmation leads to fewer trade signals.

4. Trading costs are ignored which may prevent small accounts from profiting. 

5. No stop loss mechanism to limit downside.

## Enhancement

1. Optimize smoothed RSI parameters to find best combination.

2. Add other indicators or patterns for signal filtering. 

3. Implement stop loss to control single trade loss.

4. Consider trading costs, adjust parameters for different capital sizes.

5. Test parameters across different instruments and timeframes for optimal parameters.

6. Add functionality for auto parameter optimization.

## Summary

The strategy has clear and simple logic, using reversal pattern combined with trend indicator to identify potential trend reversals. It has the advantage of wide applicability and easy optimization, but also has some risks to note and improve on. Overall it is a versatile and practical short-term reversal trading strategy worthy of further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Smoothed RSI ----|
|v_input_7|10|LengthRSI|
|v_input_8|0.8|TopBand|
|v_input_9|0.2|LowBand|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-10-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/07/2021
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
// This is new version of RSI oscillator indicator, developed by John Ehlers. 
// The main advantage of his way of enhancing the RSI indicator is smoothing 
// with minimum of lag penalty. 
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


SRSI(Length, TopBand,LowBand) =>
    pos = 0.0
    xValue = (close + 2 * close[1] + 2 * close[2] + close[3] ) / 6
    CU23 = sum(iff(xValue > xValue[1], xValue - xValue[1], 0), Length)
    CD23 = sum(iff(xValue < xValue[1], xValue[1] - xValue, 0), Length)
    nRes = iff(CU23 + CD23 != 0, CU23/(CU23 + CD23), 0)
    pos:= iff(nRes > TopBand, 1,
    	   iff(nRes < LowBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Smoothed RSI", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Smoothed RSI ----")
LengthRSI = input(10, minval=1)
TopBand = input(0.8, step=0.01)
LowBand = input(0.2, step=0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posSRSI = SRSI(LengthRSI, TopBand,LowBand )
pos = iff(posReversal123 == 1 and posSRSI == 1 , 1,
	   iff(posReversal123 == -1 and posSRSI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/429392

> Last Modified

2023-10-16 16:27:32
