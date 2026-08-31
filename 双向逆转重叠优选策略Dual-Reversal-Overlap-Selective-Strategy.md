
> Name

双向逆转重叠优选策略Dual-Reversal-Overlap-Selective-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fb1c725ca92b7921b7.png)



## Overview

The Dual Reversal Overlap Selective Strategy combines reversal trading strategies with overbought-oversold filters to achieve asset allocation and timing trading. It aims to take long and short positions at trend reversal points while avoiding unnecessary trades in irrational extended zones using overbought-oversold indicators.

## Strategy Logic

The strategy consists of two overlapping sub-strategies:

1. 123 Reversal Strategy  

This strategy uses reversal signals based on two consecutive days of closing price reversal. Specifically, it goes long if closing prices rise over the last two days and the 9-day slow stochastic is below 50, and goes short if closing prices fall over the last two days and the 9-day fast stochastic is above 50. This reversal strategy aims to capture short-term trend reversals.

2. DSS Oscillator Strategy

This strategy uses the DSS oscillator for overbought-oversold analysis. It goes long if the 5-day MA is below the 10-day MA and the 20 oversold level, and goes short if the 5-day MA is above the 10-day MA and the 80 overbought level. This overbought-oversold strategy helps avoid unnecessary trades in irrational zones. 

The final signal is generated only when both strategies agree. This improves profitability by combining the strengths of the two strategy types.

## Advantage Analysis

1. Combines the advantages of reversal and overbought-oversold strategies - catching short-term reversals while avoiding irrational zone trades.

2. Simple logic and few parameters make 123 reversal easy to implement. DSS uses double smoothing for robust overbought-oversold analysis. 

3. Combination improves signal reliability by reducing false signals.

4. Flexible parameter tuning adapts the strategy to different markets.

## Risk Analysis

1. Reversal strategies have "picking up pennies" risk and whipsaw in ranging markets.

2. DSS optimization is difficult and sensitive to parameters.

3. Divergent signals may miss trading opportunities. 

4. Simple price indicators limit profitability.

Solutions:

1. Shorten holding periods to reduce whipsaw risk.

2. Careful parameter tuning based on successful examples.

3. Add filters to improve strategy. 

4. Optimize entry timing or position sizing.

## Enhancement Directions

1. Test other reversal indicators to improve signal accuracy.

2. Explore alternative overbought-oversold indicators like RSI. 

3. Add stop loss to lock in profits and limit losses.

4. Optimize parameters for different markets.

5. Consider dynamic parameter adjustment.

6. Build machine learning models to generate signals.

## Conclusion

The Dual Reversal Overlap Selective Strategy provides both asset allocation and timing trading functionality through combining reversal and overbought-oversold strategies. It has advantages like flexible parameters, simple logic, and easy implementation, effectively filtering out noise trades in irrational zones. But limitations exist like reversal risks and parameter optimization difficulties. Future enhancements can come from adding stop loss, parameter optimization, machine learning incorporation etc. Overall, it provides a robust quantitative trading solution.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|10|PDS|
|v_input_6|9|EMAlen|
|v_input_7|5|TriggerLen|
|v_input_8|80|Overbought|
|v_input_9|20|Oversold|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-25 00:00:00
end: 2023-10-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/03/2020
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
// Double Smoothed Stochastics (DSS) is designed by William Blaw. 
// It attempts to combine moving average methods with oscillator principles. 
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

DSSB(PDS, EMAlen,TriggerLen,Overbought,Oversold) =>
    pos = 0
    xPreCalc = ema(stoch(close, high, low, PDS), EMAlen)
    xDSS = ema(stoch(xPreCalc, xPreCalc, xPreCalc, PDS), EMAlen)
    xTrigger = ema(xDSS, TriggerLen)
    pos := iff(xTrigger < xDSS and xTrigger < Oversold, -1,
	         iff(xTrigger > xDSS and xTrigger > Overbought, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & DSS Bressert", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
PDS = input(10, minval=1)
EMAlen = input(9, minval=1)
TriggerLen = input(5, minval=1)
Overbought = input(80, minval=1)
Oversold = input(20, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posDSS = DSSB(PDS, EMAlen,TriggerLen,Overbought,Oversold)
pos = iff(posReversal123 == 1 and posDSS == 1 , 1,
	   iff(posReversal123 == -1 and posDSS == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430268

> Last Modified

2023-10-26 16:56:56
