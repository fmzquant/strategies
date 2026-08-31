
> Name

基于双重反转套利策略Dual-Reversal-Arbitrage-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9856eb45981572d81a.png)

## Overview
The dual reversal arbitrage strategy is an arbitrage algorithm that integrates dual reversal indicators. It combines the 123 reversal system and the Gann swing oscillator sub-strategies and generates trading signals when both sub-strategies give out signals at the same time to carry out arbitrage operations.

## Strategy Logic  
The strategy consists of two sub-strategies:

1. 123 Reversal System: It is from the book "How I Tripled My Money in The Futures Market" by Ulf Jensen, Page 183. Its trading rules are: when the closing price is higher than the previous closing price and lower than the closing price 2 days ago, go long when the slow K line is below 50; when the closing price is lower than the previous closing price and higher than the closing price 2 days ago, go short when the fast K line is above 50.

2. Gann Swing Oscillator: It is adapted from Robert Krausz's book "A W.D. Gann Treasure Discovered". It judges the direction of market swings by calculating the rise and fall of the highest and lowest prices over a certain period.  

The trading logic of this arbitrage strategy is: when the signal directions of the two sub-strategies are consistent, actual trading signals are generated. The long signal is when both sub-strategies give out long signals at the same time; the short signal is when both sub-strategies give out short signals at the same time.

## Advantage Analysis
The biggest advantage of this strategy is that by integrating the signals of the two sub-strategies, it can effectively filter out false signals and improve the accuracy of trading signals. The two sub-strategies each have their own strengths. The 123 reversal system can capture sudden reversal trends, while the Gann swing oscillator can determine the maturity of trend reversals. Combining the two can make trading signals more reliable, thereby enhancing the stability of the strategy.

## Risk Analysis
The main risk of this strategy is that the probability of inconsistent trading signal directions from the two sub-strategies is relatively large, which may lead to insufficient trading signals. In addition, the sub-strategies themselves also have certain risks of false signals. The combination of these two factors may lead to insufficient number of trades for the strategy, thus unable to fully capture market opportunities.  

To mitigate risks, parameters of the sub-strategies can be adjusted to moderately increase trading frequency, or other indicators can be combined to assist in filtering out false signals. When there is a large deviation in signals between the two sub-strategies, following only the more reliable one can also be considered.

## Optimization Directions
The strategy can be optimized in the following aspects:
1. Adjust the parameters of the sub-strategies to optimize trading frequency;  
2. Add judgements of other technical indicators to improve signal quality;
3. Optimize the weights of the sub-strategies based on different products and timeframes; 
4. Add stop loss mechanisms to control single transaction loss.

## Summary
The dual reversal arbitrage strategy forms relatively strong trading signals by integrating two different types of reversal strategies. It can effectively filter out noise and improve signal quality, suitable for capturing reversal opportunities in the market. However, the probability of inconsistent signals from the sub-strategies is relatively large, which may lead to insufficient trading frequency. In addition, the parameter settings of combination strategies themselves are quite complex, requiring sufficient testing and optimization in order to achieve the best results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|5|LengthGSO|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 04/11/2020
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
// The Gann Swing Oscillator has been adapted from Robert Krausz's book, 
// "A W.D. Gann Treasure Discovered". The Gann Swing Oscillator helps 
// define market swings. 
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

    
GannSO(Length) =>
    pos = 0.0
    xGSO = 0.0
    xHH = highest(Length)
    xLL = lowest(Length)
    xGSO:= iff(xHH[2] > xHH[1] and xHH[0] > xHH[1], 1,
             iff(xLL[2] < xLL[1] and xLL[0] < xLL[1], -1, nz(xGSO[1],0)))
    pos := iff(xGSO > 0, 1,
    	     iff(xGSO < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Gann Swing Oscillator", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthGSO = input(5, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posGannSO = GannSO(LengthGSO)
pos = iff(posReversal123 == 1 and posGannSO == 1 , 1,
	   iff(posReversal123 == -1 and posGannSO == -1, -1, 0)) 
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

https://www.fmz.com/strategy/441141

> Last Modified

2024-02-06 09:58:04
