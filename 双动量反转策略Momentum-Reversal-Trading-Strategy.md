
> Name

双动量反转策略Momentum-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The Momentum Reversal trading strategy combines the advantages of reversal and momentum strategies by utilizing signals from both types of indicators to take counter-directional trades at turning points for profit.

## Strategy Logic

The strategy consists of two parts:

The first part is the 123 reversal strategy. Its logic is:

- Go long when the close price is higher than the previous close for 2 consecutive days and the 9-day slow Stochastic Oscillator is below 50.

- Go short when the close price is lower than the previous close for 2 consecutive days and the 9-day fast Stochastic Oscillator is above 50.

The second part is the filtered momentum indicator. Its calculation steps are:

1. Calculate price change xMom = close - close[1] 

2. Calculate absolute price change xMomAbs = abs(close - close[1])

3. Filter xMom if less than threshold Filter to 0 

4. Filter xMomAbs if less than threshold Filter to 0

5. Calculate sum of filtered xMom over n days nSum 

6. Calculate sum of filtered xMomAbs over n days nAbsSum

7. Calculate momentum value: nRes = 100 * nSum / nAbsSum 

8. Generate signal based on nRes and bands TopBand, LowBand

This indicator filters out small fluctuations and extracts momentum information from major trends.

Finally, trading signals are generated when the signals from both indicators align for long or short.

## Advantage Analysis 

The strategy combines the advantages of two different types of indicators to improve signal quality:

1. The 123 reversal strategy catches reversal trends at turning points, avoiding being trapped.

2. The filtered momentum indicator focuses on large moves only, filtering out noise and catching major trends. 

3. Combining them verifies signals and reduces incorrect trades, improving win rate.

## Risk Analysis

The main risks of this strategy include:

1. Single timeframe analysis may miss larger trend. 

2. Static parameter settings cannot adapt to market changes.

3. Double verification may miss some opportunities, reducing profit potential.

4. Low quality signals may also be verified, leading to losses.

## Optimization Directions

The strategy can be optimized in several aspects:

1. Add multi-timeframe verification to avoid being trapped.

2. Use adaptive parameters to adjust indicators based on market conditions.

3. Optimize filter threshold to reduce false signals.

4. Add stop loss to control single trade loss amount. 

5. Adjust position sizing to optimize capital utilization efficiency.

## Conclusion

In conclusion, the Momentum Reversal strategy combines the strengths of reversal and filtered momentum strategies to improve signal quality and profitability to some extent. However, it also has some flaws like ignoring larger trends, static parameters, false signals etc. Methods like multi-timeframe validation, adaptive parameters, stop loss can optimize the strategy by reducing risks and improving steady profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|9|LengthCMO|
|v_input_6|3|Filter|
|v_input_7|70|TopBand|
|v_input_8|-70|LowBand|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/09/2019
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
// This indicator plots a CMO which ignores price changes which are less 
// than a threshold value. CMO was developed by Tushar Chande. A scientist, 
// an inventor, and a respected trading system developer, Mr. Chande developed 
// the CMO to capture what he calls "pure momentum". For more definitive 
// information on the CMO and other indicators we recommend the book The New 
// Technical Trader by Tushar Chande and Stanley Kroll.
// The CMO is closely related to, yet unique from, other momentum oriented 
// indicators such as Relative Strength Index, Stochastic, Rate-of-Change, etc. 
// It is most closely related to Welles Wilder`s RSI, yet it differs in several ways:
// - It uses data for both up days and down days in the numerator, thereby directly 
// measuring momentum;
// - The calculations are applied on unsmoothed data. Therefore, short-term extreme 
// movements in price are not hidden. Once calculated, smoothing can be applied to the 
// CMO, if desired;
// - The scale is bounded between +100 and -100, thereby allowing you to clearly see 
// changes in net momentum using the 0 level. The bounded scale also allows you to 
// conveniently compare values across different securities.
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

fFilter(xSeriesSum, xSeriesV, Filter) =>
    iff(xSeriesV > Filter, xSeriesSum, 0)

CMOfilt(Length,Filter, TopBand, LowBand) =>
    pos = 0
    xMom = close - close[1]
    xMomAbs = abs(close - close[1])
    xMomFilter = fFilter(xMom, xMomAbs, Filter)
    xMomAbsFilter = fFilter(xMomAbs,xMomAbs, Filter)
    nSum = sum(xMomFilter, Length)
    nAbsSum = sum(xMomAbsFilter, Length)
    nRes =   100 * nSum / nAbsSum
    pos := iff(nRes > TopBand, 1,
	         iff(nRes < LowBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & CMOfilt", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthCMO = input(9, minval=1)
Filter = input(3, minval=1)
TopBand = input(70, minval=1)
LowBand = input(-70, maxval=-1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posCMOfilt = CMOfilt(LengthCMO,Filter, TopBand, LowBand)
pos = iff(posReversal123 == 1 and posCMOfilt == 1 , 1,
	   iff(posReversal123 == -1 and posCMOfilt == -1, -1, 0)) 
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

https://www.fmz.com/strategy/428816

> Last Modified

2023-10-09 17:21:27
