
> Name

双重趋势追踪策略Dual-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The Dual Trend Tracking strategy combines two different strategy signals to more accurately capture market trends and generate excess returns. It first uses the 123 reversal strategy to determine price reversal signals, and then combines the overbought-oversold indicator to determine position direction, tracking trends while avoiding being trapped.

## Strategy Logic

The strategy consists of two parts:

1. 123 Reversal Strategy

   The 123 reversal strategy first judges the closing price relationship between the previous two days. If the closing prices reversed recently (e.g. the closing price rose yesterday and fell the day before), it indicates a potential turning point.

   It then combines the Stoch indicator to determine buy and sell timing. When the Stoch fast line is below a certain level (e.g. 50) and the slow line is above the fast line, it is considered oversold and generates a buy signal. When the Stoch fast line is above a certain level (e.g. 50) and the slow line is below the fast line, it is considered overbought and generates a sell signal.

   So the 123 reversal strategy requires confirmation from the Stoch indicator in addition to identifying price reversal to generate actual trading signals.

2. Overbought/Oversold Indicator

   The overbought/oversold indicator directly uses the Stoch indicator. When the Stoch indicator is above a certain level (e.g. 90), it is considered overbought and generates a sell signal. When the Stoch indicator is below a certain level (e.g. 20), it is considered oversold and generates a buy signal.

   This indicator judges overbought/oversold levels directly through the Stoch indicator to track trends.

Finally, the strategy combines the signals from the two strategies - only when the signals are in the same direction will final buy or sell signals be generated to more accurately capture market trends.

## Advantage Analysis

The biggest advantage of the Dual Trend Tracking strategy is that it can verify both price trends and overbought/oversold conditions to avoid wrong trading signals. Specific advantages:

1. Combining two strategy signals provides more robust verification and reduces losses caused by errors in a single strategy.

2. The 123 reversal strategy can capture potential trend reversal points in a timely manner.

3. The overbought/oversold indicator can verify current market conditions and avoid chasing highs and selling lows.

4. The two strategies can verify each other to avoid wrong signals, improving stability.

5. It combines simple and effective indicators with clear logic that is easy to understand and apply.

## Risk Analysis

Although the strategy improves stability through combined verification, some risks still exist:

1. The 123 reversal strategy cannot perfectly identify reversal points and may miss some opportunities. Fine-tune parameters to lower the reversal signal threshold.

2. The overbought/oversold indicator relies solely on one Stoch indicator and may generate false signals. Add MA lines etc. for verification.

3. The two strategy signals may cancel each other out and miss opportunities. Adjust parameters to reduce constraints.

4. The strategy is only backtested on historical data. Parameters need continuous optimization in live trading. Add stop loss mechanisms to control losses.

5. Parameters need independent testing and optimization for different products and trading periods. Do not directly copy parameters.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Optimize parameters for both strategies to form parameter pools for optimization programs to select from under different market conditions.

2. Add filter conditions based on MA, Bollinger Bands etc. to avoid wrong signals. 

3. Add stop loss mechanisms such as trailing stop loss, move stop loss, time stop loss etc. to control maximum drawdown.

4. Consider adding filters on volume or positions for different products to avoid low liquidity.

5. Study the evolution of parameters over time and use machine learning to automatically optimize.

6. Optimize entry frequency to avoid overtrading in trendless markets. 

## Conclusion

The Dual Trend Tracking strategy accurately identifies trend reversals while verifying overbought/oversold levels by combining the 123 reversal and overbought/oversold strategies. This filters out wrong signals and captures actual trends for excess returns. It is more stable and profitable than single indicator strategies. But risks should be managed via timely stop loss. Future improvements can be made through parameter optimization, adding filters, automation etc.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Overbought/Oversold ----|
|v_input_7|10|LengthOO|
|v_input_8|0.92|BuyBand|
|v_input_9|0.5|SellBand|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-20 00:00:00
end: 2023-09-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 30/03/2021
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
// Simple Overbought/Oversold indicator
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


OO(Length,BuyBand,SellBand) =>
    pos = 0.0
    xOBOS = stoch(close, high, low, Length)
    nRes = iff(close > close[Length], xOBOS / 100, (100 - xOBOS) / 100)
    pos :=iff(nRes < SellBand, -1,
           iff(nRes > BuyBand, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Overbought/Oversold", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Overbought/Oversold ----")
LengthOO = input(10, minval=1)
BuyBand = input(0.92, step = 0.01)
SellBand = input(0.5, step = 0.01)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posOO = OO(LengthOO,BuyBand,SellBand)
pos = iff(posReversal123 == 1 and posOO == 1 , 1,
	   iff(posReversal123 == -1 and posOO == -1, -1, 0)) 
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

https://www.fmz.com/strategy/427985

> Last Modified

2023-09-27 16:14:25
