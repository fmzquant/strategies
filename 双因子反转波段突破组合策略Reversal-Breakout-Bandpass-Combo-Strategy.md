
> Name

双因子反转波段突破组合策略Reversal-Breakout-Bandpass-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19b8428fdd56e737bef.png)

## Overview
This is a combo strategy driven by two factors - reversal and bandpass, which achieves multi-factor overlay and adapts to different market conditions.  

## Strategy Logic  
The strategy consists of two sub-strategies:

1. 123 Reversal Strategy: When the close price drops for two consecutive days, if today's close breaks through the lowest price in the previous two days, and the fast line of 9-day Stochastic oscillator crosses above the slow line, go long. When the close price rises for two consecutive days, if today's close drops below the highest price in the previous two days, and the fast line crosses below the slow line, go short.

2. Bandpass Filter: Calculate a bandpass indicator over a certain period, go long when it is above a threshold, and go short when below.

The combined signal is: take long position if both strategies give long signals, take short position if both give short signals, otherwise clear all positions.

## Advantages
- Driven by dual factors, adapts to various market conditions, profitable across regimes  
- 123 reversal captures reversal opportunities in range-bound markets
- Bandpass filter tracks trends in trending markets
- Combined signal verifies and avoids erroneous trades

## Risks
- Improper parameters may cause over-trading
- Multiple losses may occur in choppy markets
- Transaction costs need to be monitored

## Enhancement
- Tune bandpass filter parameters to optimize bandpass calculation
- Adjust 123 reversal parameters to optimize long/short reversal identification 
- Add stop loss to control losses for single trades

## Summary
This strategy integrates reversal and trend factors to achieve multi-factor driven quantitative trading. The dual-factor verification reduces the probability of erroneous trades, making the strategy perform well across various markets. Further improvements on parameter tuning and stop loss will enhance the strategy's stability and profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|20|LengthBF|
|v_input_6|0.5|Delta|
|v_input_7|false|TriggerLevel|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/05/2019
// This is combo strategies for get 
// a cumulative signal. Result signal will return 1 if two strategies 
// is long, -1 if all strategies is short and 0 if signals of strategies is not equal.
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
// The related article is copyrighted material from
// Stocks & Commodities Mar 2010
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
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


Bandpass_Filter(Length, Delta, TriggerLevel) =>
    xPrice = hl2
    beta = cos(3.14 * (360 / Length) / 180)
    gamma = 1 / cos(3.14 * (720 * Delta / Length) / 180)
    alpha = gamma - sqrt(gamma * gamma - 1)
    BP = 0.0
    pos = 0.0
    BP := 0.5 * (1 - alpha) * (xPrice - xPrice[2]) + beta * (1 + alpha) * nz(BP[1]) - alpha * nz(BP[2])
    pos := iff(BP > TriggerLevel, 1,
	       iff(BP <= TriggerLevel, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Bandpass Filter", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthBF = input(20, minval=1)
Delta = input(0.5)
TriggerLevel = input(0)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posBandpass_Filter = Bandpass_Filter(LengthBF, Delta, TriggerLevel)
pos = iff(posReversal123 == 1 and posBandpass_Filter == 1 , 1,
	   iff(posReversal123 == -1 and posBandpass_Filter == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
```

> Detail

https://www.fmz.com/strategy/440685

> Last Modified

2024-02-01 10:45:12
