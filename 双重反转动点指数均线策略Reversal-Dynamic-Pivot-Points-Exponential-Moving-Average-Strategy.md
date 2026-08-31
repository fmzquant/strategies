
> Name

双重反转动点指数均线策略Reversal-Dynamic-Pivot-Points-Exponential-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/134ecb0a6073cf08020.png)

## Overview

The Reversal Dynamic Pivot Points Exponential Moving Average strategy combines reversal trading and dynamic support resistance levels. It uses the Stochastic oscillator to identify market reversal points and calculates daily support/resistance based on previous day's high, low and close prices. It goes long or short when both the reversal and pivot points strategies generate buy or sell signals. The strategy is suitable for medium-term trading.

## Strategy Logic

### Reversal Strategy 

The reversal strategy is based on the rationale that when markets become overbought or oversold, prices tend to revert back to the value range. Specifically, this reversal strategy follows Ulf Jensen's rules:

Go long when close has been higher than previous close for 2 consecutive days and 9-day Slow K line is below 50; Go short when close has been lower than previous close for 2 consecutive days and 9-day Fast K line is above 50.

### Dynamic Pivot Points Strategy

The dynamic pivot points strategy calculates the current day's support and resistance levels based on previous day's high, low and close prices. The formulas are:

Pivot Point = (High + Low + Close) / 3

Support 1 = Pivot Point - (High - Pivot Point) 

Resistance 1 = Pivot Point + (Pivot Point - Low)

It goes long when close is higher than Resistance 1 and goes short when close is lower than Support 1.

### Dual Signals 

This strategy combines the reversal and dynamic pivot points strategies. It only enters positions when signals from both strategies align. This helps filter out some false signals and improves stability. 

## Advantages

The biggest advantage of this strategy is it combines the strengths of both reversal and dynamic S/R strategies - it can benefit from major trend reversals and also identify key support and resistance levels. Compared to individual strategies, it has better stability from filtering out some false signals.

Also, the strategy has few parameters and is easy to implement and optimize.

## Risks

The strategy also has the following risks:

- Failed reversal - prices may over-extend and continue to trend despite reversal signal.  

- Breach of support/resistance levels - prices may breakthrough calculated S/R levels resulting in wrong signals.

- Dual signals too conservative, missing runs. The dual signal mechanism may filter too many trades.

Countermeasures:

- Fine-tune parameters, combine other factors to confirm reversals.

- Use stop loss to control loss.  

- Adjust rules to allow more trading opportunities.

## Enhancement Opportunities

The strategy can be enhanced in the following areas:

1. Test different Stochastic parameters combinations to improve sensitivity in identifying reversals.  

2. Test different moving averages or longer term indicators to better gauge overall trend.

3. Add other factors to determine market structure, e.g. volume indicators.  

4. Optimize dual signal rules to capture more trades.

5. Incorporate stop loss to manage risks.

## Conclusion

The Reversal Dynamic Pivot Points Exponential Moving Average strategy combines the strengths of reversal trading and dynamic support resistance analysis. It can benefit from major trend turning points and also gauge intraday directionality against key levels. By utilizing dual-signal mechanism, it has good stability in filtering out false trades. The strategy can be further optimized by tuning parameters, testing additional filters etc. to enhance performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-07 00:00:00
end: 2023-12-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/03/2020
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
// This Pivot points is calculated on the current day.
// Pivot points simply took the high, low, and closing price from the previous period and 
// divided by 3 to find the pivot. From this pivot, traders would then base their 
// calculations for three support, and three resistance levels. The calculation for the most 
// basic flavor of pivot points, known as ‘floor-trader pivots’, along with their support and 
// resistance levels.
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

DPP() =>
    pos = 0
    xHigh  = security(syminfo.tickerid,"D", high[1])
    xLow   = security(syminfo.tickerid,"D", low[1])
    xClose = security(syminfo.tickerid,"D", close[1])
    vPP = (xHigh+xLow+xClose) / 3
    vR1 = vPP+(vPP-xLow)
    vS1 = vPP-(xHigh - vPP)
    pos := iff(close > vR1, 1,
             iff(close < vS1, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Dynamic Pivot Point", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posDPP = DPP()
pos = iff(posReversal123 == 1 and posDPP == 1 , 1,
	   iff(posReversal123 == -1 and posDPP == -1, -1, 0)) 
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

https://www.fmz.com/strategy/434678

> Last Modified

2023-12-08 11:37:36
