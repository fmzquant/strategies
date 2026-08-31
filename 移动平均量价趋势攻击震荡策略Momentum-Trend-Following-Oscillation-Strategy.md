
> Name

移动平均量价趋势攻击震荡策略Momentum-Trend-Following-Oscillation-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/f417ba020ef5a587b5.png)

## Overview

This strategy combines moving average, volume-price and oscillation indicators to form triple filters, aiming to capture medium-term trends and achieve good returns during trending markets.

## Principles 

The strategy consists of three main components:

1. Moving Average Indicators

Use 20-day EMA and 60-day EMA to construct a trend filter. A buying signal is generated when the short term MA crosses above the long term MA. A selling signal is generated when the short term MA crosses below the long term MA.

2. Volume-Price Indicator 

Use volume over turnover to calculate VP indicator, judging capital flow directions. Rising VP suggests net inflow while declining VP suggests net outflow. VP reversals can signal trend shifts.

3. Bollinger Bands

Use 20-day Donchian Channel Width to calculate Bollinger Bands Parameter, forming upper and lower bands. Prices approaching the upper band may face pullback pressure, while prices approaching the lower band may bounce back up.

Combining the three components constructs a trend-following strategy. It generates buy signals when short MA crosses above long MA, VP is in uptrend and price just left the upper band. Sell signals are generated when short MA crosses below long MA, VP is in downtrend and price just left the lower band.

## Advantages

The strategy has the following advantages:

1. Triple indicator filters help avoid false breaks. 

2. Considering trend, capital flow and overbought/oversold improves signal reliability.

3. Optimized parameters suitable for different periods and products. 

4. Controllable drawdowns and steady returns.

5. Clear logic and flexible parameter tuning.

## Risks

There are also some risks:

1. Trend reversal risks. Trend changes may cause stop loss.

2. VP lagging issue. VP lags price changes and may miss entry or exit points.

3. Difficult parameter tuning. Parameters need adjustments for different products and timeframes.

4. Drawdown control needs improvement. Further optimize with dynamic stops or position sizing.

## Enhancement Directions

The strategy can be improved in the following aspects:

1. Add stop loss methods like trailing stop to further control drawdowns.

2. Add position sizing module to dynamically adjust sizes based on volatility. 

3. Optimize parameters to find best sets for different products and periods.

4. Increase machine learning models to improve signal accuracy. 

5. Incorporate sentiment and news analytics to judge sudden events.

## Conclusion

The strategy combines MA, VP and Bollinger Band indicators to perform well in catching medium-term trends. Further improvements in stop loss, position sizing and parameter tuning can achieve better results. The logic is clear and parameters are flexible for customization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|Length ADX|
|v_input_6|14|Length ADXR|
|v_input_7|13|Signal1|
|v_input_8|45|Signal2|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-11-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 29/04/2019
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
// Secon strategy
// The Average Directional Movement Index Rating (ADXR) measures the strength 
// of the Average Directional Movement Index (ADX). It's calculated by taking 
// the average of the current ADX and the ADX from one time period before 
// (time periods can vary, but the most typical period used is 14 days).
// Like the ADX, the ADXR ranges from values of 0 to 100 and reflects strengthening 
// and weakening trends. However, because it represents an average of ADX, values 
// don't fluctuate as dramatically and some analysts believe the indicator helps 
// better display trends in volatile markets.
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

fADX(Len) =>
    up = change(high)
    down = -change(low)
    trur = rma(tr, Len)
    plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, Len) / trur)
    minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, Len) / trur)
    sum = plus + minus 
    100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), Len)

ADXR(LengthADX, LengthADXR, Signal1, Signal2) =>
    xADX = fADX(LengthADX)
    xADXR = (xADX + xADX[LengthADXR]) / 2
    pos = 0.0
    pos := iff(xADXR < Signal1, 1,
           iff(xADXR > Signal2, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal and Average Directional Movement Index Rating", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
LengthADX = input(title="Length ADX", defval=14)
LengthADXR = input(title="Length ADXR", defval=14)
Signal1 = input(13, step=0.01)
Signal2 = input(45, step=0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posADXR = ADXR(LengthADX, LengthADXR, Signal1, Signal2 )
pos = iff(posReversal123 == 1 and posADXR == 1 , 1,
	   iff(posReversal123 == -1 and posADXR == -1, -1, 0)) 
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

https://www.fmz.com/strategy/432346

> Last Modified

2023-11-16 16:46:51
