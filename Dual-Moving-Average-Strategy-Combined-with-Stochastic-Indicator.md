
> Name

Dual-Moving-Average-Strategy-Combined-with-Stochastic-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14952cfa85809f19fcf.png)

## Overview  

This article introduces a quantitative trading strategy that combines the dual moving average strategy and stochastic indicator. The strategy utilizes the trend following capability of moving averages and the overbought-oversold characteristic of stochastic to generate trading signals.

## Strategy Principle  

The strategy consists of two parts:  

1. Dual Moving Average Strategy  

    Using fast and slow moving averages to generate golden cross buy signals and dead cross sell signals. The fast moving average can capture price trend changes faster, while the slow one filters out fake signals.   

2. Stochastic Indicator  

    Utilizing the oscillation feature of stochastic to identify overbought and oversold situations. A stochastic higher than the slow line indicates an overbought signal, while a stochastic lower than the slow line indicates an oversold signal.   

The signals from both parts are combined to form the final trading signals. The dual moving average strategy tracks the main trend, while stochastic assists in avoiding unfavorable market conditions.

## Advantage Analysis   

- Combines the advantages of dual moving averages and stochastic, more stable. 
- Moving averages for trend following, stochastic for confirmation, good effect.   
- Customizable parameters adapt to different market conditions.  

## Risk Analysis  

- Dual moving averages can easily generate false signals.  
- Improper stochastic parameter settings may miss trends.
- Need to adjust parameters to adapt to market changes.  

Risks can be reduced by optimizing parameter combinations and adding stop loss to control losses.   

## Optimization Directions

The strategy can be optimized in the following aspects:  

1. Test the effects of different moving average parameters on the strategy.  
2. Test the effects of different stochastic parameters on the stability of the strategy.   
3. Add trend filtering indicators to improve win rate.  
4. Build a dynamic trailing stop loss mechanism to control losses.   

## Summary  

This strategy combines the advantages of dual moving averages and stochastic. While tracking the main market trend, it avoids unfavorable reversals. Better strategy results can be obtained through parameter optimization. Adding stops and trend filters can make the strategy more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|Length_HLB|
|v_input_6|true|PercentShift|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 24/11/2020
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
// As the name suggests, High low bands are two bands surrounding the underlying’s 
// price. These bands are generated from the triangular moving averages calculated 
// from the underlying’s price. The triangular moving average is, in turn, shifted 
// up and down by a fixed percentage. The bands, thus formed, are termed as High 
// low bands. The main theme and concept of High low bands is based upon the triangular 
// moving average. 
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

    
HLB(Length, PercentShift) =>
    pos = 0.0
    xTMA = sma(sma(close, Length), Length)
    xHighBand = xTMA + (xTMA * PercentShift / 100)
    xLowBand = xTMA - (xTMA * PercentShift / 100)
    pos :=iff(close > xHighBand, 1,
           iff(close <xLowBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & High Low Bands", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Length_HLB = input(14, minval=1)
PercentShift = input(1, minval = 0.01, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posHLB = HLB(Length_HLB, PercentShift)
pos = iff(posReversal123 == 1 and posHLB == 1 , 1,
	   iff(posReversal123 == -1 and posHLB == -1, -1, 0)) 
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

https://www.fmz.com/strategy/438457

> Last Modified

2024-01-12 11:16:52
