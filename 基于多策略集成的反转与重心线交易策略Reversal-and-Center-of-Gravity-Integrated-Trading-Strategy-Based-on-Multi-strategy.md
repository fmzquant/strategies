
> Name

基于多策略集成的反转与重心线交易策略Reversal-and-Center-of-Gravity-Integrated-Trading-Strategy-Based-on-Multi-strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10761b441f92ed91c7e.png)

### Overview

This strategy realizes more stable and efficient trading decisions by integrating dual trading signals. One is the reversal strategy combining price reversal signals and stochastic indicators, and the other is the breakout strategy of centerline and price channel. The trading signals of the two strategies will be logically ANDed, that is, the position will be opened only when the two strategies issue signals in the same direction at the same time. This kind of multi-strategy integration can filter out some invalid signals and achieve more reliable trading decisions.

### Strategy Principle 

The reversal strategy part generates trading signals when the price shows a reversal pattern for two consecutive trading days and the stochastic indicator has entered the overbought or oversold area. This allows the use of both price reversal signals and overbought/oversold signals for double confirmation. The center of gravity part builds upper and lower channels around the linear regression centerline of the price to generate trading signals when the channel is broken. Channel breakout signals also imply that prices are beginning to experience directional trending movements.

The two strategies capture value and trend opportunities respectively. By logically ANDing the strategy signals, the position is opened only when the two strategies issue signals in the same direction at the same time. This can effectively filter out some invalid signals and make the final strategy more reliable.

### Advantage Analysis

The biggest advantage of this strategy is the stability and reliability of signals. The combination of reversal and trend strategies captures both reversal and trend trading opportunities at the same time without missing any major moves. Meanwhile, logical AND operation filters out some invalid signals, making the final strategy more reliable and avoids being fooled by noise.

In addition, the combination of reversal and trend strategies also achieves stable operations under multiple time frames. The reversal strategy utilizes short-term overbought/oversold signals while the center of gravity strategy is based on medium and long term moving averages. The complementary time frames can generate sustained and steady trading opportunities.

### Risk Analysis

The biggest risk of this strategy is the failure in matching signals from the dual strategies, which leads to insufficient trading signals. This may happen when the price is range-bound and consolidating without a clear directional trend. When price oscillates in a sideways pattern for an extended period of time, it is difficult for reversal signals and trend signals to be generated, resulting in fewer trading opportunities.

In addition, the logical AND operation of the dual strategies may also miss some opportunities from a single strategy. When only one strategy generates a valid trading signal, no position will be opened. This could result in certain opportunity costs.

To mitigate risks, parameters could be moderately relaxed to make strategy signals easier to match and open positions. Stock selection mechanisms could also be introduced to trade more trending symbols and obtain more trading opportunities.

### Optimization Directions

There are two main dimensions this strategy could be optimized:

First is parameter optimization. Parameters including those for the Stoch indicators and centerline channels can be further tested and optimized to obtain more aligned signals. This can be achieved through more backtests.  

Second is to introduce mechanisms similar to stock selection operations. Because this strategy is more suitable for stocks with clear trends. Therefore, if stocks meeting certain conditions can be selected to trade based on specific indicators, it would significantly improve overall strategy performance. This requires the design of a stock selection module combined with industry rotation trends, moving average systems, etc.

### Summary

This strategy achieves double confirmation and multi-timeframe matching of trading decisions by integrating reversal and trend strategies, while also facing the problem of reduced trading opportunities due to difficulty in signal matching. Next step optimization can be approached from both the parameter and modular perspectives to obtain stronger and more stable strategy performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|20|LengthCoF|
|v_input_6|5|m|
|v_input_7|true|Percent|
|v_input_8|true|Trade from line (1 or 2)|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-03 00:00:00
end: 2024-01-02 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/07/2019
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
// The indicator is based on moving averages. On the basis of these, the 
// "center" of the price is calculated, and price channels are also constructed, 
// which act as corridors for the asset quotations.
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

CenterOfGravity(Length, m,Percent, SignalLine) =>
    pos = 0
    xLG = linreg(close, Length, m)
    xLG1r = xLG + ((close * Percent) / 100)
    xLG1s = xLG - ((close * Percent) / 100)
    xLG2r = xLG + ((close * Percent) / 100) * 2
    xLG2s = xLG - ((close * Percent) / 100) * 2
    xSignalR = iff(SignalLine == 1, xLG1r, xLG2r)
    xSignalS = iff(SignalLine == 1, xLG1s, xLG2s)
    pos :=  iff(close > xSignalR, 1,
             iff(close < xSignalS, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Center Of Gravity", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthCoF = input(20, minval=1)
m = input(5, minval=0)
Percent = input(1, minval=0)
SignalLine = input(1, minval=1, maxval = 2, title = "Trade from line (1 or 2)")
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(LengthCoF, KSmoothing, DLength, Level)
posCenterOfGravity = CenterOfGravity(Length, m,Percent, SignalLine)
pos = iff(posReversal123 == 1 and posCenterOfGravity == 1 , 1,
	   iff(posReversal123 == -1 and posCenterOfGravity == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/437553

> Last Modified

2024-01-03 16:51:03
