
> Name

基于随机转向因子和关键反转信号的组合反转策略Combination-Reversal-Strategy-Based-on-Stochastic-Turnaround-Factor-and-Key-Reversal-Signal

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b579bb6cced4a76514.png)

## Overview

This strategy combines the stochastic turnaround factor and key reversal signal, two types of reversal strategies, to obtain combined trading signals. It first uses the stochastic turnaround factor to determine whether the price shows signs of reversal. It then incorporates the key reversal signal to filter out false reversals and ensure the capture of true reversal opportunities, reducing trading risk.

## Strategy Principle 

### Stochastic Turnaround Factor
This part comes from the reversal strategy introduced in Ulf Jensen's book "How I Tripled My Money in the Futures Market". It combines the reversal patterns of closing price and stochastic indicator to determine whether the price trend has reversed.  

It goes long when the closing price is higher than the previous closing price for two consecutive days and the 9-day slow stochastic line is below 50. This indicates that the price has continued to rise in the short term, but the stochastic indicator shows that the stock is excessively bought, heralding a possible reversal decline.

It goes short when the closing price is lower than the previous closing price for two consecutive days and the 9-day fast stochastic line is above 50. This indicates that the price has continued to fall in the short term, but the stochastic indicator shows that the stock is excessively sold, heralding a possible reversal rally.

### Key Reversal Signal 
The key reversal signal refers to the K-line pattern where the price hits a new high or low during the day and then reverses markedly. It often signals a change in market trends.  

In a bull market, after the price hits a new high, if the closing price is near the lowest price of the previous day, it constitutes a key reversal long signal. 
In a bear market, after the price hits a new low, if the closing price is near the highest price of the previous day, it constitutes a key reversal short signal.

## Advantages of the Strategy

1. Combining multiple indicators and K-line patterns improves the accuracy of trading signals.  

2. Built on reversal theory to capture potential reversal opportunities.  

3. Judging trends and stochastic indicators at the same time can effectively filter out wrong signals. 

4. Key reversal signals can avoid false reversals and reduce trading risks.

## Risks and Optimization 

1. When reversal patterns appear, the market may not have truly reversed, posing callback risks. Stop loss can be set to control risks.

2. Divergence may occur between the stochastic indicator and prices, resulting in wrong signals. The parameters of the stochastic indicator can be optimized or combined with other indicators for confirmation.

3. This strategy is mainly based on intraday and short-term trading and cannot cope with longer-term trending markets. Methods like trends and chart patterns can be incorporated to improve it further.

## Conclusion  

This strategy combines price action, stochastic indicator and key reversal signals to capture potential reversal opportunities. Compared to standalone reversal trading methods, it can more accurately determine the timing of reversals and filter out false signals. However, attention should still be paid to pullback risks after reversal and the divergence between stochastic and prices. More reliable trading strategies can be obtained through parameter optimization, stop loss setting and further integration with other strategies.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|true|Enter the number of bars over which to look for a new low in prices.|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-05 00:00:00
end: 2023-12-12 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/12/2020
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
// A key reversal is a one-day trading pattern that may signal the reversal of a trend. 
// Other frequently-used names for key reversal include "one-day reversal" and "reversal day."
// How Does a Key Reversal Work?
// Depending on which way the stock is trending, a key reversal day occurs when:
// In an uptrend -- prices hit a new high and then close near the previous day's lows.
// In a downtrend -- prices hit a new low, but close near the previous day's highs
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

KRU(nLength) =>
    pos = 0.0
    xLL = lowest(low[1], nLength)
    C1 = iff(low < xLL and close > close[1], true, false)
    pos := iff(C1, 1, 0)
    pos

strategy(title="Combo Backtest 123 Reversal & Key Reversal Up", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
nLength = input(1, minval=1, title="Enter the number of bars over which to look for a new low in prices.")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posKRU = KRU(nLength)
pos = iff(posReversal123 == 1 and posKRU == 1 , 1,
	   iff(posReversal123 == -1 and posKRU == -1, -1, 0)) 
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

https://www.fmz.com/strategy/435288

> Last Modified

2023-12-13 17:54:34
