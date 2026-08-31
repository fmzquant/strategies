
> Name

Momentum-Mean-Deviation-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18dec403bc2be585b79.png)


## Overview

This strategy is based on the technical indicator "Momentum Mean Deviation Index" described in William Blau's book "Momentum, Direction and Divergence" published in 1995. This indicator focuses on three key elements of price momentum, price direction and price divergence, and deeply analyzes the relationship between price and momentum.

## Strategy Principle 

This strategy uses the Momentum Mean Deviation Index to determine price trends and breakout points. It first calculates the EMA line of the price, then calculates the deviation of the price from this EMA line. This deviation is then double smoothed by EMA to get the final momentum mean deviation index curve. Trading signals are generated when this curve crosses above or below its own signal line. Specifically, the calculation process is as follows:

1. Calculate the EMA line of price xEMA
2. Calculate the deviation of price from xEMA, xEMA_S  
3. Smooth xEMA_S with EMA, parameter s, get xEMA_U
4. Smooth xEMA_U again with EMA, parameter u, get signal line xSignal
5. Compare the magnitude relationship between xEMA_U and xSignal:
   1. xEMA_U > xSignal is long signal
   2. xEMA_U < xSignal is short signal
6. Generate trading signal possig

Enter long or short positions according to the possig signal.

## Advantage Analysis

The advantages of this strategy include:

1. The double EMA filter can effectively filter out false breakouts and improve signal reliability
2. Based on EMA, it is sensitive to short-term price changes and can capture trend turning points  
3. Adopts parameterized design which can adjust parameters as needed to suit different cycles and varieties
4. Contains both long and short trading signals to profit from two-way price fluctuations

## Risk Analysis

This strategy also has some potential risks:

1. EMA is quite sensitive to parameter selection. Improper settings may miss signals or generate wrong signals
2. Long and short signals may appear simultaneously. Filtering conditions need to be set up to avoid offsetting each other 
3. The double EMA filter may overly filter out valid signals, resulting in missing trades
4. It does not consider large cycle trend relationships and has contrarian trading risks

These risks can be reduced by optimizing parameters, setting filtering criteria, introducing trend judgment modules, etc.

## Optimization Directions

The optimization directions for this strategy include:

1. Optimize parameter values r, s, u to make them more suitable for different cycles and varieties
2. Add trend judgment module to avoid contrarian operations
3. Increase filtering conditions like channel breakouts to avoid invalid signals
4. Incorporate other factors and models to improve strategy performance

## Summary

This strategy is based on the momentum mean deviation index which captures price reversal points based on the price-momentum relationship. Its parameterized and optimizable design can adapt to different cycles and varieties. But it also has some false signal and contrarian trading risks. Further optimizing parameters and models and incorporating trend judgment etc. can improve its performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|32|r|
|v_input_2|5|s|
|v_input_3|5|u|
|v_input_4|3|SmthLen|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-17 00:00:00
end: 2024-01-16 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version = 2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/12/2016
// This is one of the techniques described by William Blau in his book "Momentum,
// Direction and Divergence" (1995). If you like to learn more, we advise you to
// read this book. His book focuses on three key aspects of trading: momentum, 
// direction and divergence. Blau, who was an electrical engineer before becoming 
// a trader, thoroughly examines the relationship between price and momentum in 
// step-by-step examples. From this grounding, he then looks at the deficiencies 
// in other oscillators and introduces some innovative techniques, including a 
// fresh twist on Stochastics. On directional issues, he analyzes the intricacies 
// of ADX and offers a unique approach to help define trending and non-trending periods.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Ergotic MDI (Mean Deviation Indicator) Bactest")
r = input(32, minval=1)
s = input(5, minval=1)
u = input(5, minval=1)
SmthLen = input(3, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=blue, linestyle=line)
xEMA = ema(close, r)
xEMA_S = close - xEMA
xEMA_U = ema(ema(xEMA_S, s), u)
xSignal = ema(xEMA_U, u)
pos = iff(xEMA_U > xSignal, 1,
	   iff(xEMA_U < xSignal, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(xEMA_U, color=green, title="Ergotic MDI")
plot(xSignal, color=red, title="SigLin")
```

> Detail

https://www.fmz.com/strategy/439067

> Last Modified

2024-01-17 14:08:46
