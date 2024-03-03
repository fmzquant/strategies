
> Name

Combo-Backtest-123-Reversal-Relative-Volatility-Index

> Author

ChaoZhang

> Strategy Description

Combining Reversal and Volatility Strategies for Robust Signals

This combo strategy synergistically combines a 123 reversal system with a relative volatility index (RVI) to generate robust trading signals. It aims to capitalize on turning points confirmed by shifting volatility.

How it Works

The 123 reversal strategy identifies potential bottoms and tops. It goes long if the close is higher than the prior two days and stochastics are oversold. It goes short if the close is lower than the prior two days and stochastics are overbought.

The RVI measures volatility direction. It tracks whether volatility is expanding or contracting. The strategy goes long below 30 RVI and short above 70 RVI.

By combining the two, the strategy seeks to isolate high-confidence entries when reversals align with volatility extremes. The signals are further filtered by requiring alignment.

Advantages and Drawbacks

Blending reversal and volatility strategies provides more robust signals. The RVI adds confidence by confirming exhaustion. Using two systems reduces whipsaws and false signals inherent in single strategies.

However, any system can be curve-fit. Optimizing many inputs risks overfitting the strategy. Strict discipline is required to avoid overtrading. No strategy replaces prudent risk and money management.

Overall, combining different strategies can boost performance ifdone judiciously. Ensuring proper position sizing, risk limits and drawdown tolerance is key to long-term success. Ongoing review and flexibility help overcome inherent limitations.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Relative Volatility Index ----|
|v_input_7|10|Period|
|v_input_8|30|BuyZone|
|v_input_9|70|SellZone|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-11 00:00:00
end: 2023-09-10 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 08/06/2021
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
// The RVI is a modified form of the relative strength index (RSI). 
// The original RSI calculation separates one-day net changes into 
// positive closes and negative closes, then smoothes the data and 
// normalizes the ratio on a scale of zero to 100 as the basis for the 
// formula. The RVI uses the same basic formula but substitutes the 
// 10-day standard deviation of the closing prices for either the up 
// close or the down close. The goal is to create an indicator that 
// measures the general direction of volatility. The volatility is 
// being measured by the 10-days standard deviation of the closing prices. 
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


RVI(Period,BuyZone, SellZone) =>
    pos = 0.0
    nU = 0.0
    nD =0.0
    xPrice = close
    StdDev = stdev(xPrice, Period)
    d = iff(close > close[1], 0, StdDev)
    u = iff(close > close[1], StdDev, 0)
    nU:= (13 * nz(nU[1],0) + u) / 14
    nD:= (13 * nz(nD[1],0) + d) / 14
    nRes = 100 * nU / (nU + nD)
    pos:= iff(nRes < BuyZone, -1,
    	   iff(nRes > SellZone, 1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Relative Volatility Index", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Relative Volatility Index ----")
Period = input(10, minval=1)
BuyZone = input(30, minval=1)
SellZone = input(70, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posRVI = RVI(Period,BuyZone, SellZone)
pos = iff(posReversal123 == 1 and posRVI == 1 , 1,
	   iff(posReversal123 == -1 and posRVI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/426322

> Last Modified

2023-09-11 09:01:03
