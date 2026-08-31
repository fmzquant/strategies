
> Name

高低位突破量化策略High-Low-Breakout-for-Quantitative-Trading

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/195f8a278bf14e17775.png)

## Overview

The Fusion strategy combines a 123 reversal pattern strategy and a high low breakout strategy into a quantitative trading system. By synthesizing indicator signals across different timeframes, it aims to achieve multi-timeframe capital advantage and generate excess returns in the medium to long term.

## Strategy Logic

The Fusion strategy consists of two components:

1. 123 Reversal Strategy
This strategy originates from the idea on p183 of the book "How I Tripled My Money in the Futures Market" by Ulf Jensen. It generates trading signals by examining the relationship between the closing prices of the past two days and the previous day, together with the Stochastic indicator to gauge overbought and oversold market conditions. Specifically, a buy signal is generated when the closing prices of two consecutive days are higher than the previous day, and the Stochastic Slow indicator is below 50. A sell signal is generated when the closing prices of two consecutive days are lower than the previous day, and the Stochastic Fast indicator is above 50. By incorporating the Stochastic indicator, this strategy avoids buying at market tops and selling at bottoms.

2. High Low Breakout Strategy 
This strategy identifies trading signals by detecting price breakouts beyond previous high/low levels over different time periods. It calculates the highest high and lowest low over the current and previous periods and generates buy signals when price breaks above the high, and sell signals when price breaks below the low. The advantage of this strategy is its ability to identify trend pattern changes in higher timeframes, allowing earlier entry.

The Fusion strategy combines the signals from the above two strategies, and generates actual trading signals only when the signal directions align. This filters out some false signals caused by errors in a single strategy and improves signal reliability.

## Advantages of the Strategy

1. Multi-timeframe synthesis improves signal accuracy
The integration of daily and higher timeframe patterns enhances accuracy of trading signal generation, avoiding distraction from short-term market noises.

2. Fully utilizes the overbought/oversold judgement of Stochastic 
The use of Stochastic Slow indicator prevents eager buying at overbought zones. The Stochastic Fast indicator prevents eager selling at oversold zones. Unnecessary losses are reduced.

3. Timely catches trend patterns, lowering missing out opportunities
The high low breakout strategy identifies trend initiation in higher timeframes earlier, reducing missed trading opportunities.

4. Flexible optimization with multiple sub-strategies
With multiple sub-strategies, huge optimization space allows parameter tuning of sub-strategies or introducing new ones to make the strategy more stable and reliable.

5. Simple and clear logic
The straightforward structure and logic make the strategy easy to understand, modify and maintain in the future.

## Risks of the Strategy

1. Multi-timeframe synthesis causes signal lag
Although accuracy is improved, combining signals across timeframes induces a lag and may miss short-term trading chances.

2. 123 patterns cannot identify longer timeframe trend reversals
The 123 reversal strategy only looks at recent days and misses key reversal points in longer timeframes. 

3. Wrong parameter settings may cause false signals
Bad parameter tuning of the Stochastic and breakout periods could result in excessive false signals.

4. Purely technical, weak adaptivity to extreme events
Without considering fundamentals, the strategy adapts poorly to black swan events.

Corresponding solutions:

1. Shorten calculation periods properly to reduce lag.

2. Try introducing longer-term indicators or patterns as filters.

3. Optimize parameters and test robustness thoroughly in backtests. 

4. Consider incorporating fundamental factors for signal filtering.

## Directions for Optimization

1. Test and optimize parameters of sub-strategies for robustness.

2. Incorporate additional signals like fundamentals, money flow etc. 

3. Introduce stop loss to limit max loss per trade.

4. Fine tune parameters for specific products to improve adaptiveness.

5. Assist with machine learning models.

## Conclusion

In summary, the Fusion strategy combines the advantages of multi-timeframe technical indicators, aiming for more accurate and timely signal generation. Compared to single indicator strategies, it has superior trend sensing ability and more robust signal production. But it also suffers from lags and inadequate adaptivity to extreme events. Future improvements could come from more auxiliary tools, better parameter optimization and upgrading stability and profitability.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|D|Resolution|
|v_input_6|true|LookBack|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-10 00:00:00
end: 2023-11-09 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/11/2020
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
// This script shows a high and low period value.
//    Width - width of lines
//    SelectPeriod - Day or Week or Month and etc.
//    LookBack - Shift levels 0 - current period, 1 - previous and etc. 
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

    
HLL(LookBack, SelectPeriod) =>
    pos = 0.0
    xHigh  = security(syminfo.tickerid, SelectPeriod, high[LookBack])
    xLow   = security(syminfo.tickerid, SelectPeriod, low[LookBack])
    vS1 = xHigh
    vR1 = xLow
    pos := iff(close > vR1, 1,
             iff(close < vS1, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & High and Low Levels", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
SelectPeriod = input(title="Resolution", type=input.resolution, defval="D")
LookBack = input(1,  minval=0)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posHLL = HLL(LookBack, SelectPeriod)
pos = iff(posReversal123 == 1 and posHLL == 1 , 1,
	   iff(posReversal123 == -1 and posHLL == -1, -1, 0)) 
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

https://www.fmz.com/strategy/431662

> Last Modified

2023-11-10 11:09:28
