
> Name

双基指标跟随策略Multiple-Indicators-Follow-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/121c2631bed1ec27937.png)

## Overview  

The Multiple Indicators Follow strategy is a quantitative trading strategy for cryptocurrencies. This strategy generates trading signals by combining the signals from two basic indicators, the 123 Reversal indicator and the Qstick indicator, and decides whether to enter the market based on the consistency of the two indicators.

## Strategy Logic

The strategy consists of two parts:  

1. 123 Reversal Indicator

The trading signals of this indicator come from the closing prices of the last two candlesticks. If the closing prices of the last two candlesticks reverse (i.e. closing price switches from rising to falling or vice versa), while satisfying the condition of the Stochastic Oscillator, it will generate trading signals.  

Specifically, if the closing prices of the previous two days fall and today's closing price rises, while the 9-day Stochastic Slow line is lower than 50, it generates a buy signal; if the closing prices of the previous two days rise and today's closing price falls, while the 9-day Stochastic Fast line is higher than 50, it generates a sell signal.

2. Qstick Indicator  

This indicator judges the strength of bulls and bears by calculating the simple moving average of the difference between the opening price and closing price. It generates trading signals when crossing the zero line. 

If Qstick crosses above the zero line, it indicates increasing bullish momentum and generates a buy signal. If Qstick crosses below the zero line, it indicates increasing bearish momentum and generates a sell signal.

The Multiple Indicators Follow strategy then comprehensively considers the trading signals from both the 123 Reversal indicator and the Qstick indicator. It will take relevant trading actions only when the signals from both indicators are consistent.  


## Advantage Analysis

The Multiple Indicators Follow strategy combines the signals of two different types of indicators, which can improve the accuracy of trading signals. Compared with a single indicator, it can effectively reduce false signals and achieve higher win rates.

In addition, this strategy only enters the market when the signals of both indicators are consistent, which can effectively control risks and prevent abnormalities in the difference between the two indicators.


## Risks and Solutions  

1. Time difference in signal generation between indicators, cannot perfectly match  

This can be solved by parameter optimization, adjusting parameters of the two indicators to coordinate the frequency and rhythm of their signal generation.

2. Abnormal difference between indicators causing over-trading  

Can set minimum holding period to avoid frequently canceling and creating orders.


## Optimization Directions

1. Optimize length parameters of both indicators to find optimal parameter combinations

2. Test Stochastic Oscillator configurations with different parameters  

3. Add stop loss strategy


## Conclusion  

By combining the advantages of multiple basic indicators, the Multiple Indicators Follow strategy can improve signal quality. While controlling risks, it can achieve relatively higher returns. There is room for further parameter and strategy optimization for this strategy. Through testing, the strategy can be made more stable and reliable.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Qstick Indicator ----|
|v_input_7|14|LengthQ|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 24/05/2021
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
// A technical indicator developed by Tushar Chande to numerically identify 
// trends in candlestick charting. It is calculated by taking an 'n' period 
// moving average of the difference between the open and closing prices. A 
// Qstick value greater than zero means that the majority of the last 'n' days 
// have been up, indicating that buying pressure has been increasing. 
// Transaction signals come from when the Qstick indicator crosses through the 
// zero line. Crossing above zero is used as the entry signal because it is indicating 
// that buying pressure is increasing, while sell signals come from the indicator 
// crossing down through zero. In addition, an 'n' period moving average of the Qstick 
// values can be drawn to act as a signal line. Transaction signals are then generated 
// when the Qstick value crosses through the trigger line.
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


Qstick(Length) =>
    pos = 0.0
    xR = close - open
    xQstick = sma(xR, Length)
    pos:= iff(xQstick > 0, 1,
           iff(xQstick < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Qstick Indicator", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Qstick Indicator ----")
LengthQ = input(14, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posQstick = Qstick(LengthQ)
pos = iff(posReversal123 == 1 and posQstick == 1 , 1,
	   iff(posReversal123 == -1 and posQstick == -1, -1, 0)) 
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

https://www.fmz.com/strategy/440094

> Last Modified

2024-01-26 15:42:36
