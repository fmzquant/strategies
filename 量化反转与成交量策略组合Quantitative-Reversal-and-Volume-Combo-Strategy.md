
> Name

量化反转与成交量策略组合Quantitative-Reversal-and-Volume-Combo-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy combines two quantitative trading strategies to generate more accurate and reliable trading signals. The first strategy is based on price reversal and the second is based on volume analysis. The combined signals can effectively improve profitability.

## Strategy Logic

The strategy consists of two parts:

1. Reversal strategy

Uses STO indicator for reversal signals. Goes long when close rises for 2 days and STO slow line is below 50. Goes short when close drops for 2 days and STO fast line is above 50. 

2. Volume strategy

Analyzes the price-volume relationship over a period to determine direction, with moving average smoothing. 

It goes long when both strategies signal long, and goes short when both signal short.

The combo improves signal quality by greatly reducing false signals from either strategy.

## Advantages

- Combines two independent strategies, improving accuracy 
- Reversal catches turnaround opportunities, volume forecasts future direction
- Different strategy types verify each other, reducing false signals
- Simple direct combination, easy to implement
- Parameters of each strategy can be optimized separately

## Risks

- Reversals risky without strict exit rules 
- Volume analysis may lag
- Purely indicator-based, requires technical analysis
- Longer data series needed for moving averages
- Parameters may not be universal across products

Risks can be reduced by:

- Optimizing STO for better reversal detection
- Adding indicators to confirm volume breakouts  
- Optimizing moving average periods  
- Supplementary chart pattern analysis
- Separate parameter testing by product

## Enhancement Directions

The strategy can be improved by:

1. Optimizing STO parameters

   Fine-tune K, D values for best combinations
   
2. Secondary confirmation of volume breaks

   With indicators like MACD, BOLL etc.
   
3. Optimizing moving average periods

   Testing different periods for more stable signals
   
4. Adding chart patterns

   Entering on patterns in addition to combo signals
   
5. Product-specific parameter testing

   Parameters may vary across different products

## Summary

This strategy combines reversal and volume strategies for improved signal quality and accuracy. But parameter optimization, additional technical indicators etc. can further refine performance. We can continually adjust based on backtest results, validate in live trading, to obtain a truly robust combo strategy. This requires immense time and effort, but the rewards will be significant too.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|22|Samples|
|v_input_6|40|Perma|
|v_input_7|0.1|Cintra|
|v_input_8|0.1|Cinter|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-13 00:00:00
end: 2023-09-20 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/10/2020
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
// This is another version of FVE indicator that we have posted earlier 
// in this forum.
// This version has an important enhancement to the previous one that`s 
// especially useful with intraday minute charts.
// Due to the volatility had not been taken into account to avoid the extra 
// complication in the formula, the previous formula has some drawbacks:
// The main drawback is that the constant cutoff coefficient will overestimate 
// price changes in minute charts and underestimate corresponding changes in 
// weekly or monthly charts.
// And now the indicator uses adaptive cutoff coefficient which will adjust to 
// all time frames automatically.
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


FVI(Samples,Perma,Cintra,Cinter) =>
    pos = 0
    xhl2 = hl2
    xhlc3 = hlc3
    xClose = close
    xIntra = log(high) - log(low)
    xInter = log(xhlc3) - log(xhlc3[1])
    xStDevIntra = stdev(sma(xIntra, Samples) , Samples)
    xStDevInter = stdev(sma(xInter, Samples) , Samples)
    xVolume = volume
    TP = xhlc3
    TP1 = xhlc3[1]
    Intra = xIntra
    Vintra = xStDevIntra
    Inter = xInter
    Vinter = xStDevInter
    CutOff = Cintra * Vintra + Cinter * Vinter
    MF = xClose - xhl2 + TP - TP1
    FveFactor =  iff(MF > CutOff * xClose, 1, 
                  iff(MF < -1 * CutOff * xClose, -1,  0))
    xVolumePlusMinus = xVolume * FveFactor
    Fvesum = sum(xVolumePlusMinus, Samples)
    VolSum = sum(xVolume, Samples)
    xFVE = (Fvesum / VolSum) * 100
    xEMAFVE = ema(xFVE, Perma)
    pos :=iff(xFVE > xEMAFVE, 1,
    	   iff(xFVE < xEMAFVE, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Volatility Finite Volume Elements", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Samples = input(22, minval=1)
Perma = input(40, minval=1)
Cintra = input(0.1)
Cinter = input(0.1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posFVI = FVI(Samples,Perma,Cintra,Cinter)
pos = iff(posReversal123 == 1 and posFVI == 1 , 1,
	   iff(posReversal123 == -1 and posFVI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/427517

> Last Modified

2023-09-21 21:07:09
