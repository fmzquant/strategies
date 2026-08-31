
> Name

Dual-Moving-Average-Arbitrage-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b2bf16093057a729cb.png)

## Overview  

This is an arbitrage strategy that utilizes dual moving average formations to make arbitrage trades. It combines the 123 reversal pattern and Finite Volume Elements (FVE) sub-strategies and makes arbitrage trades when they both give buy or sell signals simultaneously.

## Strategy Logic  

### 123 Reversal Pattern

This sub-strategy is from the book "How I Tripled My Money in the Futures Market" by Ulf Jensen. It gives signals under these conditions:

- Go long when close price rises for 2 consecutive days and 9-day slow stoch is below 50.  
- Go short when close price falls for 2 consecutive days and 9-day fast stoch is above 50.

### Finite Volume Elements (FVE)  

FVE is a pure volume indicator. It judges if money is flowing in or out based on price movement range and trading volume.

It gives signals when the latest two bars of FVE indicator rise or fall together.  

## Advantage Analysis

This strategy combines two types of indicators to determine market trend and money flow, which can effectively avoid false signals. Also, both sub-strategies have some reversal characteristics, so arbitrage trades can make profits.

In addition, the dual moving average formation represents consistency between short-term and medium-term trends, thus having greater stability.   

## Risk Analysis  

This strategy relies on moving average formations, which can easily generate false signals and lead to losses when the market fluctuates. Reversal failure is also a common risk.

Risks can be reduced by properly tweaking parameters to make the strategy more robust, or by setting stop loss to control risks.

## Optimization Directions

More types of moving averages can be tested to find the optimal match. Other assist indicators like strength index and volatility index can also be introduced to avoid false signals.

In addition, research can be done on how to dynamically adjust parameters based on market conditions to improve adaptability. Machine learning and neural networks can also be explored for parameter self-adaptivity.  

## Summary

This dual moving average arbitrage strategy integrates two reversal-type indicators for judgement, which can mitigate risks to some extent. But reliance on moving average formations means further optimization is needed to make the strategy more robust. Overall, it provides a basic framework for short-term arbitrage trading and is worth further research.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|15|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|18|Period|
|v_input_6|0.6|Factor|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/08/2020
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
// The FVE is a pure volume indicator. Unlike most of the other indicators 
// (except OBV), price change doesn?t come into the equation for the FVE (price 
// is not multiplied by volume), but is only used to determine whether money is 
// flowing in or out of the stock. This is contrary to the current trend in the 
// design of modern money flow indicators. The author decided against a price-volume 
// indicator for the following reasons:
// - A pure volume indicator has more power to contradict.
// - The number of buyers or sellers (which is assessed by volume) will be the same, 
//     regardless of the price fluctuation.
// - Price-volume indicators tend to spike excessively at breakouts or breakdowns.
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


FVE(Period,Factor) =>
    pos = 0
    nRes = 0.0
    xhl2 = hl2
    xhlc3 = hlc3
    xClose = close
    xVolume = volume
    xSMAV = sma(xVolume, Period)
    nMF = xClose - xhl2 + xhlc3 - xhlc3[1]
    nVlm = iff(nMF > Factor * xClose / 100,  xVolume, 
             iff(nMF < -Factor * xClose / 100, -xVolume, 0))
    nRes := nz(nRes[1],0) + ((nVlm / xSMAV) / Period) * 100
    pos := iff(nRes > nRes[1] and nRes > nRes[2], 1,
             iff(nRes < nRes[1] and nRes < nRes[2], -1, nz(pos[1], 0)))   
    pos

strategy(title="Combo Backtest 123 Reversal & Finite Volume Elements (FVE)", shorttitle="Combo", overlay = true)
Length = input(15, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Period = input(18, minval=1)
Factor = input(0.6, minval=0.1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posFVE = FVE(Period,Factor)
pos = iff(posReversal123 == 1 and posFVE == 1 , 1,
	   iff(posReversal123 == -1 and posFVE == -1, -1, 0)) 
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

https://www.fmz.com/strategy/433099

> Last Modified

2023-11-24 14:21:06
