
> Name

双重黄金交叉反转交易策略Dual-Golden-Cross-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ebf0edad13c2750fd3.png)


## Overview

The dual golden cross reversal trading strategy is a trading strategy that combines multiple technical analysis indicators. It incorporates the 123 reversal pattern strategy and the prime number bands indicator to integrate diverse trading signals and obtain more reliable trading signals.

## Strategy Principles 

The strategy consists of two sub-strategies:

1. 123 reversal pattern strategy

    It generates trading signals based on the closing prices of stocks. Signals are triggered when the relationship between closing prices of consecutive days change. Specifically, a short signal is generated when the previous closing price is higher than that of two days ago, and the current closing price is lower than previous day. A long signal is generated when the previous closing price is lower than that of two days ago, and the current closing price is higher than previous day. Additionally, the signals are only activated when stochastic oscillator crosses over. That is, the long signal is activated only when the fast line is below the slow line. The short signal is activated only when the fast line is above the slow line.

2. Prime number bands strategy

    This strategy uses the unique distribution of prime numbers to determine price fluctuation ranges. It first locates the highest and lowest prime numbers within a certain percentage range of the price, and plots the two prime number series as bands. Trading signals are generated when the price touches the bands. Specifically, a long signal is triggered when the price breaks above the upper band. A short signal is triggered when the price breaks below the lower band.

The two sub-strategies are combined to generate the final trading signals. That is, the long signal is generated only when both strategies produce long signals. Similarly for the short signals. No trading is executed if the signals from the two strategies contradict with each other.

## Advantage Analysis 

The strategy has the following advantages:

1. Increased profitability through signal integration

    By combining signals from two different types of strategies, the reliability of the signals can be verified to identify high-probability profitable trading opportunities.

2. High win rate of 123 reversal pattern

    The 123 reversal pattern is a classic contrarian strategy that can capture reversal opportunities arising from short-term overbought and oversold situations, thus possessing relatively high win rate in live trading.

3. Prime number bands capture price patterns

    Prime number bands make use of the unique randomness of prime numbers to determine price fluctuation ranges, avoiding subjective bias and enhancing the objectivity of trading signals.

4. Novel strategy logic avoids exploitation

    The innovative integration of multiple indicators makes the strategy less susceptible to reverse engineering and exploitation by copycat strategies.

## Risk Analysis

The strategy also carries the following risks:

1. Failed reversal risk

    As a reversal strategy, failed reversals of the 123 pattern can lead to losses.

2. Failure of prime number bands 

    The prime number bands depend on proper parameter tuning. Incorrect parameters may render it ineffective.

3. Increased trade frequency from multiple signals

    More trades can be generated as two signal sources are combined. Excessive trading costs may erode profits if not properly controlled.

4. Difficult optimization

    Optimizing parameters from two integrated strategies can be challenging.

## Optimization Suggestions

The strategy can be optimized in the following aspects:

1. Incorporate stop loss to limit per trade loss.

2. Optimize prime number bands parameters to fit the latest market conditions. 

3. Control trade frequency to avoid trading cost from overtrading.

4. Introduce machine learning algorithms to automate strategy parameter optimization.

5. Add more confirmation indicators like volume indicators to further improve signal accuracy.

## Summary 

The dual golden cross reversal trading strategy integrates multiple technical indicators to filter out noise trades and identify high-probability trading opportunities through signal verification. But it also carries inherent risks that need to be mitigated through proper optimization to strengthen the strategy. With risks under control, the strategy can become a relatively stable and reliable quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Prime Number Bands ----|
|v_input_7|5|Tolerance Percentage|
|v_input_8|5|Length_PNB|
|v_input_9_high|0|Source Up Band: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10_low|0|Source Down Band: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 23/04/2021
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
// Determining market trends has become a science even though a high number 
// or people still believe it’s a gambling game. Mathematicians, technicians, 
// brokers and investors have worked together in developing quite several 
// indicators to help them better understand and forecast market movements.
// The Prime Number Bands indicator was developed by Modulus Financial Engineering 
// Inc. This indicator is charted by indentifying the highest and lowest prime number 
// in the neighborhood and plotting the two series as a band.
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

PrimeNumberUpBand(price, percent) =>
    res = 0.0
    res1 = 0.0
    for j = price to price + (price * percent / 100)
        res1 := j
	    for i = 2 to sqrt(price)
        	res1 := iff(j % i == 0 , 0, j)
            if res1 == 0 
                break
		if res1 > 0 
		    break
    res := iff(res1 == 0, res[1], res1)
    res

PrimeNumberDnBand(price, percent) =>
    res = 0.0
    res2 = 0.0
    for j = price to price - (price * percent / 100)
        res2 := j
	    for i = 2 to sqrt(price)
        	res2 := iff(j % i == 0 , 0, j)
            if res2 == 0 
                break
		if res2 > 0 
		    break
    res := iff(res2 == 0, res[1], res2)
    res

PNB(percent, Length,srcUp,srcDn) =>
    pos = 0.0
    xPNUB = PrimeNumberUpBand(srcUp, percent)
    xPNDB = PrimeNumberDnBand(srcDn, percent)
    xHighestPNUB = highest(xPNUB, Length)
    xLowestPNUB = lowest(xPNDB, Length)
    pos:= iff(close > xHighestPNUB[1], 1,
             iff(close < xLowestPNUB[1], -1, nz(pos[1], 0))) 
    pos


strategy(title="Combo Backtest 123 Reversal & Prime Number Bands", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Prime Number Bands ----")
percent = input(5, minval=0.01, step = 0.01, title="Tolerance Percentage")
Length_PNB = input(5, minval=1)
srcUp = input(title="Source Up Band", type=input.source, defval=high)
srcDn = input(title="Source Down Band", type=input.source, defval=low)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posPNB = PNB(percent, Length_PNB,srcUp,srcDn)
pos = iff(posReversal123 == 1 and posPNB == 1 , 1,
	   iff(posReversal123 == -1 and posPNB == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430985

> Last Modified

2023-11-03 15:32:38
