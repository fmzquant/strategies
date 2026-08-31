
> Name

双重因子组合反转与增量指标策略Dual-Factor-Combo-Reversal-and-Mass-Index-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12ae8468696c2cc6b1a.png)

## Overview

This strategy is a combo reversal trading strategy based on a dual-factor model. It integrates the 123 reversal pattern and the Mass Index factors to achieve a cumulative effect for the strategy signals. It will only go long or short when both factors emit a buy or sell signal simultaneously.

## Strategy Logic

### 123 Reversal Factor

This factor operates based on the 123 price pattern. When the closing price relationship over the past two days is "low-high" and the Stoch indicator is below 50, it signals a bottom reversal and goes long. When the closing price relationship is “high-low” and Stoch is above 50, it signals a top reversal and goes short.

### Mass Index Factor

This factor judges trend reversals based on the expansion or contraction of the price fluctuation range. As the range expands, the index rises and as the range narrows, the index falls. It generates a sell signal when the index crosses above a threshold and a buy signal when crossing below a threshold.

The strategy only opens positions when the two factors emit signals in the same direction, achieving profitable trades while avoiding false signals from a single factor.

## Advantage Analysis

- Dual-factor model combines price pattern and volatility indicator for better signal accuracy
- 123 pattern catches local extremums, Mass Index captures global trend reversal points, complementary strengths  
- Only taking signals when two factors agree avoids false signals and enhances stability

## Risk Analysis

- Probability exists for both factors to emit wrong signals concurrently, causing losses
- Failure rate of reversals exists, need to set stop loss to control downside
- Improper parameter tuning may lead to overfitting

Risks can be reduced via expanding training set, strict stop loss, multi-factor filtering etc.

## Optimization Directions

- Test more price and volatility indicator combinations
- Add ML model to judge signal quality and dynamically size positions
- Incorporate volume, Bollinger Bands etc. to discover more alpha
- Employ walk forward optimization for robustness

## Conclusion

This strategy combines two factors, price pattern and volatility indicator, to only take signals when they agree, avoiding false signals from a single factor and improving stability. But risks remain for concurrent wrong signals. We can further enhance performance and risk-adjusted returns by expanding dataset, setting stop loss, optimizing factor combinations and more.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- MASS Index ----|
|v_input_7|9|Length1|
|v_input_8|25|Length2|
|v_input_9|26.5|Trigger|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-25 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/02/2021
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
// The Mass Index was designed to identify trend reversals by measuring 
// the narrowing and widening of the range between the high and low prices. 
// As this range widens, the Mass Index increases; as the range narrows 
// the Mass Index decreases.
// The Mass Index was developed by Donald Dorsey. 
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


MASS(Length1,Length2,Trigger) =>
    pos = 0.0
    xPrice = high - low
    xEMA = ema(xPrice, Length1)
    xSmoothXAvg = ema(xEMA, Length1)
    nRes = sum(iff(xSmoothXAvg != 0, xEMA / xSmoothXAvg, 0), Length2)
    pos := iff(nRes > Trigger, -1,
	         iff(nRes < Trigger, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & MASS Index", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- MASS Index ----")
Length1 = input(9, minval=1)
Length2 = input(25, minval=1)
Trigger = input(26.5, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMASS = MASS(Length1,Length2,Trigger)
pos = iff(posReversal123 == 1 and posMASS == 1 , 1,
	   iff(posReversal123 == -1 and posMASS == -1, -1, 0)) 
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

https://www.fmz.com/strategy/436623

> Last Modified

2023-12-26 12:20:57
