
> Name

Multi-indicator-Combined-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



This strategy is named “Multi-indicator Combined Reversal Trading Strategy”. It integrates various technical indicators to identify opportunities for short-term price reversals and trade against the previous trend for profits.

Firstly, the strategy uses the 123 reversal pattern to determine short-term trend reversals. The 123 pattern is when prices gap significantly over three consecutive days and the third day closes in the opposite direction of the previous two days. Statistically, trading with 123 reversal signals has a higher win rate.

Secondly, the RSI indicator is incorporated to evaluate the reliability of reversal signals. RSI below 50 represents oversold conditions, while above 50 is overbought. Using RSI avoids generating excessive unreliable signals purely based on the 123 pattern.

Thirdly, the CMO indicator’s multi-period crossover is introduced. The CMO crossover combining different period exponential moving averages judges momentum reversals. Its signals provide further confirmation of the 123 reversal timing.

The combined application of multiple indicators increases the success rate of capturing price reversals by avoiding excessive uncertain signals. Only when RSI and CMO both support the 123 pattern will a strong reversal trade signal emerge.

This strategy suits ranging, oscillating markets to capture short-term price fluctuations. However, combining too many indicators can also lead to conflicts. Parameter optimization is needed. Stop loss should also be used to limit maximum loss per trade.

In conclusion, the multi-indicator combined reversal trading strategy integrates various tools to improve judgment accuracy of market reversals. But no single strategy is perfect. Traders need to validate and adjust based on current market conditions, maintaining flexible trading mindset.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|50|LengthFirst|
|v_input_6|25|LengthSecond|
|v_input_7|10|LengthThird|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-11 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/02/2020
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
// The related CMOaDisparity Index article is copyrighted material from Stocks & Commodities Dec 2009
// My strategy modification.
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

CMOD(LengthFirst, LengthSecond, LengthThird) =>
    pos = 0.0
    xEMAFirst = ema(close,LengthFirst)
    xEMASecond  = ema(close,LengthSecond)
    xEMAThird  = ema(close,LengthThird)
    xResFirst = 100 * (close - xEMAFirst) / close
    xResSecond = 100 * (close - xEMASecond) / close
    xResThird = 100 * (close - xEMAThird) / close
    pos := iff(xResThird > xResFirst, -1,
             iff(xResThird < xResSecond, 1, nz(pos[1], 0)))     
    pos

strategy(title="Combo Backtest 123 Reversal & CMOaDisparity Index", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthFirst = input(50, minval=1)
LengthSecond = input(25, minval=1)
LengthThird = input(10, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posCMOD = CMOD(LengthFirst, LengthSecond, LengthThird)
pos = iff(posReversal123 == 1 and posCMOD == 1 , 1,
	   iff(posReversal123 == -1 and posCMOD == -1, -1, 0)) 
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

https://www.fmz.com/strategy/426587

> Last Modified

2023-09-13 15:04:40
