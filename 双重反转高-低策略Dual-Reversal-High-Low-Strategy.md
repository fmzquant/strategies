
> Name

双重反转高-低策略Dual-Reversal-High-Low-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1837f219c147c5b1edc.png)

## Overview
The Dual Reversal High-Low strategy is a quantitative strategy that combines dual signals. It integrates a reversal-based intraday strategy and a trend judgment strategy that utilizes the difference between yesterday's highest price and a moving average. The strategy aims to achieve more stable buy and sell signals to further avoid the issuance of incorrect signals.

## Principles
First, the reversal strategy part. This strategy judges the formation of signals when there is a reversal in the closing price for two consecutive days, while combining the judgment of overbought and oversold states using the stochastic indicator. Specifically, it is a sell signal when the closing price changes from rising to falling for two consecutive days, and the fast stochastic indicator is above the slow stochastic indicator; it is a buy signal when the closing price changes from falling to rising for two consecutive days, and the fast stochastic indicator is below the slow stochastic indicator.

Second, the high-low strategy part. This strategy uses the difference between yesterday's highest price and a 13-period exponential moving average to determine the trend. It generates a buy signal when the highest price is above the moving average; it generates a sell signal when the highest price is below the moving average.

Finally, this strategy integrates the two signals. It takes a buy action when both signals show a buy signal at the same time; it takes a sell action when both signals show a sell signal at the same time.

## Advantages
This dual signal strategy can effectively reduce incorrect signals and unnecessary trades. The reversal part can determine overbought and oversold conditions to avoid chasing highs and selling lows. The high-low part can determine price trend divergences to avoid false breakouts. When combining the judgments, actual trading signals are only generated when the dual signals are in the same direction, which can significantly improve the reliability of the signals and reduce ineffective trades.

In addition, the reversal and the high-low parts use different types of indicators and judgment criteria, so they can serve to validate each other and further reduce incorrect signals. When special situations occur in the market, a single indicator is prone to incorrect signals, while combined judgments can offset some errors. This kind of multi-indicator integrated judgment strategy can obtain more reliable and stable trading signals.

## Risk Analysis  
The biggest risk of this strategy is that sustained reasonable one-sided signals may be ignored in a strong trending market. When the trend is very obvious, the signal judgment of the reversal part may be wrong, which will cause the one-sided signals in the high-low part to fail to be executed as trades. This is especially prominent in trending bull and bear markets.

In addition, improper parameter settings can also affect the strategy. The parameter settings in the reversal part need to take into account the cycle moving average system, and the moving average period in the high-low part needs to be coordinated. If the periods of both are improper, there will be mediocre false signals or simply no signals.

## Optimization
First, the length parameter of the moving average in the high-low part can be tested to make it more coordinated with the cycle indicators in the reversal part. The current 13-period indicator in the high-low part may be too sensitive, and trying longer periods may obtain more stable judgments.  

Second, the reversal part can also test using K-line entities instead of using only the closing price which is easily influenced. Considering that a reversal of a larger real body K-line may have a stronger signal effect.

Finally, it can also try to only consider taking trades when reversal signals appear during the session, as the current intraday holding method has higher risks. Changing to adopt temporary reversal trading can avoid some holding risks.  

## Conclusion  
The dual reversal high-low strategy integrates signals from multiple indicators and conducts dual verification before issuing buy and sell signals. This strict signal filtering mechanism can effectively reduce the impact of invalid and incorrect signals on actual trading. The strategy successfully controls the frequency of ineffective trades, making each trade more reliable, and avoids blindly following short-term market moves. Through parameter optimization, it may achieve better performance in certain markets.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|13|Length_HEMA|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 23/11/2020
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
// This indicator plots the difference between the High (of the previous period)
// and an exponential moving average (13 period) of the Close (of the previous period).
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
// It buy if indicator above 0 and sell if below.
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

    
HEMA(Length) =>
    pos = 0.0
    xPrice = close  // You can use any series
    xEMA = ema(xPrice, Length)
    nRes = high[1] - nz(xEMA[1])
    pos:= iff(nRes > 0, 1,
    	   iff(nRes < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & High - EMA Strategy", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Length_HEMA = input(13, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posHEMA = HEMA(Length_HEMA)
pos = iff(posReversal123 == 1 and posHEMA == 1 , 1,
	   iff(posReversal123 == -1 and posHEMA == -1, -1, 0)) 
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

https://www.fmz.com/strategy/437515

> Last Modified

2024-01-03 13:56:04
