
> Name

双管齐下量化反转追踪策略Dual-driver-Quantized-Reversal-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8b2f49adf533f4fa34.png)

## Overview

The dual-driver quantized reversal tracking strategy combines simple moving average indicators and random indicators to achieve an efficient and stable short-term trading strategy that can capture rapid market reversals while reducing opportunity costs from missing signals.

## Strategy Principle  

The strategy consists of two parts: 123 reversal pattern part and adaptive moving average part. The 123 reversal pattern part judges whether there is a reversal opportunity by calculating the closing price relationship between the previous two trading days. If the closing price on the previous day is lower than the one on the 2nd previous day and the closing price on the current trading day is higher than the previous day, and the slow random line is below 50, a buy signal is generated. If the closing price on the previous day is higher than the one on the 2nd previous day and the closing price on the current trading day is lower than the previous day, and the fast random line is above 50, a sell signal is generated. This can capture rapid short-term reversal opportunities. The other part is the adaptive moving average, which responds slowly when the market is inactive and responds quickly when active, which can effectively filter out noise and avoid shocks and determine the main trend direction. When the signals of both match, entry signals are generated, and positions are closed out when they match as well.

## Advantages of the Strategy

The biggest advantage of the dual-driver quantized reversal tracking strategy is that it combines reversal patterns and trend filtering so that it can capture rapid reversals while avoiding being trapped in a shock market. There are two main sources of income: First, the identification of the 123 pattern can promptly trace opportunities when prices quickly reverse direction, which many steady strategies cannot do. Second, the application of adaptive moving averages ensures that trading direction is consistent with the main trend, effectively filtering out noise and reducing unnecessary losses.

## Risks of the Strategy

The main risk of this strategy is that improper parameter settings can lead to excessively high trading frequency or insufficient signal identification capability. If the parameters of the 123 pattern are too sensitive, it may lead to frequent trading in volatile market conditions, resulting in more closing losses. If the adaptive moving average parameters are set too slowly, reversal opportunities may be missed. In addition, chasing new highs and selling lows in a trending market will also lead to greater capital fluctuations.

## Strategy Optimization

The strategy can be optimized in several ways: First, adjust the parameters of the 123 pattern to identify clear reversals without being too sensitive to generating false signals. Second, optimize adaptive moving average parameters to find the best balance between stability and sensitivity. Third, stop loss strategies can be introduced to control single losses. Fourth, market sentiment indicators can be combined to enhance decision quality.

## Summary  

The dual-driver quantized reversal tracking strategy successfully integrates the two indispensable parts of reversal trading and trend filtering, and the combined advantages are significant. By continuously optimizing parameter settings and improving stop loss and risk control mechanisms, this strategy has the potential to become an efficient quantitative trading strategy that is easy to profit from and has controllable risks.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Trade reverse|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|21|LengthKAMA|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-18 00:00:00
end: 2024-02-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 08/12/2020
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
// Everyone wants a short-term, fast trading trend that works without large
// losses. That combination does not exist. But it is possible to have fast
// trading trends in which one must get in or out of the market quickly, but
// these have the distinct disadvantage of being whipsawed by market noise
// when the market is volatile in a sideways trending market. During these
// periods, the trader is jumping in and out of positions with no profit-making
// trend in sight. In an attempt to overcome the problem of noise and still be
// able to get closer to the actual change of the trend, Kaufman developed an
// indicator that adapts to market movement. This indicator, an adaptive moving
// average (AMA), moves very slowly when markets are moving sideways but moves
// swiftly when the markets also move swiftly, change directions or break out of
// a trading range.
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

KAMA(Length) =>
    pos = 0.0
    nAMA = 0.0
    xPrice = close
    xvnoise = abs(xPrice - xPrice[1])
    nfastend = 0.666
    nslowend = 0.0645
    reverse = input(false, title="Trade reverse")
    nsignal = abs(xPrice - xPrice[Length])
    nnoise = sum(xvnoise, Length)
    nefratio = iff(nnoise != 0, nsignal / nnoise, 0)
    nsmooth = pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
    nAMA := nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))
    pos := iff(close[1] > nAMA, 1,
    	     iff(close[1] < nAMA, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Kaufman Moving Average Adaptive", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthKAMA = input(21, minval=2)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posKAMA = KAMA(LengthKAMA)
pos = iff(posReversal123 == 1 and posKAMA == 1 , 1,
	   iff(posReversal123 == -1 and posKAMA == -1, -1, 0)) 
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

https://www.fmz.com/strategy/441959

> Last Modified

2024-02-18 10:03:14
