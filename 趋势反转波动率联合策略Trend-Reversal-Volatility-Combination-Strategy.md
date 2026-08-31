
> Name

趋势反转波动率联合策略Trend-Reversal-Volatility-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/feaa74427f004d072c.png)


## Overview

This strategy combines a trend reversal strategy with a statistical volatility strategy to generate stronger trading signals. 

## How it Works

The strategy consists of two parts:

1. Trend reversal strategy

   - Identify trend reversal points using 123 pattern. Specifically, go long if close has risen for 2 consecutive days and 9-day Stochastic slow line is below 50; go short if close has fallen for 2 consecutive days and 9-day Stochastic fast line is above 50.
   
2. Statistical volatility strategy

   - Calculate 30-day statistical volatility using Extreme Value Method. Go long if volatility is above 0.5%; go short if volatility is below 0.16%.
   
The strategy generates a trade signal only when both strategies agree on the direction (both long or both short). Otherwise, no trade.

## Advantage Analysis

The combo strategy improves signal reliability by combining two different types of strategies:

1. The 123 pattern accurately captures trend reversal points and avoids being misled by one-off price spikes.

2. The statistical volatility focuses on high-volatility, high-opportunity periods based on market movement over the past month.

By verifying each other, the two strategies combined catch key market turning points more precisely and generate more accurate trading signals.

## Risk Analysis  

1. 123 patterns cannot fully avoid the risk of false breakouts. Erratic whipsaws may cause bad signals.

2. Statistical volatility only considers historical data and cannot predict future volatility shifts. Sudden volatility expansion or contraction can lead to bad signals.

3. Both strategies rely heavily on parameter tuning. Poor parameter settings may degrade signal quality significantly. 

4. Although more reliable overall, the combo approach may miss some strong signals from individual strategies.

## Improvement Areas

1. Incorporate more indicators like Bollinger Bands, KDJ to form a voting mechanism.

2. Add machine learning algorithms to determine trend reversal probabilities using more historical data. 

3. Set signal strength thresholds to filter out noise.

4. Optimize parameters for different products and timeframes.

5. Add stop loss mechanisms to control risk of the combined strategy.

## Conclusion

The strategy improves signal quality by combining trend reversal and statistical volatility strategies, providing more accurate trade signals around market turning points. But misinterpretation risks and parameter optimization issues remain. Further enhancements like more indicators and machine learning can lead to even more robust and reliable trading signals.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Statistical Volatility ----|
|v_input_7|30|LengthSV|
|v_input_8|0.005|TopBand|
|v_input_9|0.0016|LowBand|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-23 00:00:00
end: 2023-10-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 31/07/2021
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
// This indicator used to calculate the statistical volatility, sometime 
// called historical volatility, based on the Extreme Value Method.
// Please use this link to get more information about Volatility.
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


SV(Length,TopBand,LowBand) =>
    pos = 0.0
    xMaxC = highest(close, Length)
    xMaxH = highest(high, Length)
    xMinC = lowest(close, Length)
    xMinL = lowest(low, Length)
    SqrTime = sqrt(253 / Length)
    Vol = ((0.6 * log(xMaxC / xMinC) * SqrTime) + (0.6 * log(xMaxH / xMinL) * SqrTime)) * 0.5
    nRes = iff(Vol < 0,  0, iff(Vol > 2.99, 2.99, Vol))
    pos := iff(nRes > TopBand, 1,
    	     iff(nRes < LowBand, -1, nz(pos[1], 0)))
    pos

strategy(title="Combo Backtest 123 Reversal & Statistical Volatility", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Statistical Volatility ----")
LengthSV = input(30, minval=1)
TopBand = input(0.005, step=0.001)
LowBand = input(0.0016, step=0.001)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posSV = SV(LengthSV,TopBand,LowBand)
pos = iff(posReversal123 == 1 and posSV == 1 , 1,
	   iff(posReversal123 == -1 and posSV == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430036

> Last Modified

2023-10-24 14:23:58
