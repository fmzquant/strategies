
> Name

Dual-Moving-Average-Price-Reversal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e45cc5ebc459304f60.png)


## Overview

The Dual Moving Average Price Reversal Breakout strategy combines dual trading signals to identify higher quality entry opportunities. It first uses a 9-day moving average and its upper and lower rails to build a basic breakout framework, then introduces a stochastic indicator to filter signals after judging the direction of opportunity using 123 patterns, and finally forms a relatively strict entry rule. This kind of combination filtering method can effectively reduce the trading frequency while ensuring the signal quality, which is suitable for medium and long term holding.

## Principles  

The Dual Moving Average Price Reversal Breakout Strategy consists of two sub-strategies.

The first sub-strategy is the 123 pattern judgment. This strategy uses the closing price relationship over the previous two days to judge the likely direction of the future price breakout. If today's closing price rises compared to the previous day's closing price, while the previous day's closing price fell compared to the closing price two days ago, it is considered a buy signal; if today's closing price falls compared to the previous day's, while the previous day's closing price rose compared to the closing price two days ago, it is considered a sell signal. This pattern is believed to reflect the key turning point where short-term sentiment turns from pessimistic to optimistic or from optimistic to pessimistic. Here we re-verify the buy and sell signals using the stochastic indicator, and only generate the final operation signal when the stochastic indicator also gives a corresponding overbought or oversold signal.

The second sub-strategy is the displaced moving average channel breakout. This strategy first calculates the exponential moving average line of the specified cycle (such as 9 days), and then adds a certain percentage above and below it as the upper and lower rails of the channel. If the price breaks through the upper rail, a sell signal is generated. If the price breaks through the lower rail, a buy signal is generated. Here the width of expansion and contraction of the upper and lower rails can be controlled by the percentage factor to adjust the signal frequency.

Finally, only when the signal directions of the two sub-strategies are consistent, that is, the 123 reversal signal and the channel breakout signal are in the same direction, will a real signal be finally generated to guide actual trading. This dual filtering mechanism can filter out a lot of false signals, reduce trading frequency while ensuring high reliability of each trade.

## Advantage Analysis  

The Dual Moving Average Price Reversal Breakout Strategy combines multiple analytical methods and has the following advantages:

1. The dual signal filtering mechanism can effectively reduce invalid signals and make each trade higher quality.

2. The 123 pattern judgment belongs to a short-term reversal strategy, while the displaced channel breakout belongs to a medium and long term trend tracking strategy. Combining the two can achieve coordination between short, medium and long term, with better profit.

3. By adjusting the width of the upper and lower rails of the channel, the signal frequency can be freely controlled to suit different trading preferences.  

4. Using the 9-day moving average as the midline of the channel, the parameter selection is more reasonable to avoid excessively frequent signals.

5. By applying the overbought and oversold zones of the stochastic indicator, it avoids being trapped in a shock market.

## Risk Analysis

The Dual Moving Average Price Reversal Breakout Strategy also has some risks, mainly in the following aspects:

1. The dual filtering signal mechanism misses some opportunities that a single side strategy can capture, with some risk of missing orders.  

2. 123 buy and sell points cannot completely filter out all false breakouts. Improper use may lead to losses.

3. In the event of a violent market change, improper stop loss settings can lead to large losses.  

4. The logic of the ifft condition is complex. Improper parameters are prone to logic errors, resulting in invalid signal judgments.

5. Out-of-sample data affects parameter stability, requiring dynamic optimization of parameters.

## Optimization Directions   

There is still room for optimization in the Dual Moving Average Price Reversal Breakout Strategy:

1. Different types of moving averages can be tested to select parameter combinations with better and more stable signal quality.

2. Channels of appropriate width can be selected according to the characteristics of specific product data.  

3. Dynamic stop loss can be combined to control the maximum loss ratio.

4. Machine learning models can be introduced for dynamic parameter optimization to make the strategy more robust.  

5. Filters based on trading volume or volatility can be added to avoid excessively frequent entries and exits in turbulent market conditions.

## Conclusion  

Through the dual verification filtering mechanism, the Dual Moving Average Price Reversal Breakout Strategy successfully combines short-term reversal and medium-long term trend tracking to form an efficient trading system that can effectively filter out invalid signals and select high-quality opportunities to enter, and has relatively strong customizability. As a general framework, this strategy still has great potential for use under parameter adjustment and machine learning optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- MA Displaced Envelope ----|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|9|Period|
|v_input_9|0.5|Percent above|
|v_input_10|0.5|Percent below|
|v_input_11|13|Displacement|
|v_input_12|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-12-06 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/03/2021
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
// Moving Average Displaced Envelope. These envelopes are calculated 
// by multiplying percentage factors with their displaced expotential 
// moving average (EMA) core.
// How To Trade Using:
// Adjust the envelopes percentage factors to control the quantity and 
// quality of the signals. If a previous high goes above the envelope 
// a sell signal is generated. Conversely, if the previous low goes below 
// the envelope a buy signal is given.
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


MADE(Price,Period, perAb, perBl, disp) =>
    pos = 0.0
    sEMA = ema(Price, Period)
    top = sEMA[disp] * ((100 + perAb)/100)
    bott = sEMA[disp]* ((100 - perBl)/100)
    pos := iff(close < bott , 1,
    	     iff(close > top, -1, pos[1])) 
    pos

strategy(title="Combo Backtest 123 Reversal & MA Displaced Envelope", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- MA Displaced Envelope ----")
Price = input(title="Source", type=input.source, defval=close)
Period =input(defval=9, minval=1)
perAb = input(title = "Percent above", defval=.5, minval=0.01, step = 0.1)
perBl = input(title = "Percent below", defval=.5, minval=0.01, step = 0.1)
disp = input(title = "Displacement", defval=13, minval=1) 
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMADE = MADE(Price,Period, perAb, perBl, disp)
pos = iff(posReversal123 == 1 and posMADE == 1 , 1,
	   iff(posReversal123 == -1 and posMADE == -1, -1, 0)) 
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

https://www.fmz.com/strategy/434611

> Last Modified

2023-12-07 18:15:12
