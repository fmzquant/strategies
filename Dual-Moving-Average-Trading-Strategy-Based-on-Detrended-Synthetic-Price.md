
> Name

Dual-Moving-Average-Trading-Strategy-Based-on-Detrended-Synthetic-Price

> Author

ChaoZhang

> Strategy Description



## Overview

This is a dual moving average trading strategy based on the Detrended Synthetic Price (DSP). DSP is a function that is in phase with the dominant cycle of real price data, obtained by subtracting a half-cycle EMA from the quarter-cycle EMA. When DSP crosses above the upper band or below the lower band, unilateral trades are taken.

## Strategy Logic

1. Calculate the 1/2-cycle HL average xHL2 of price.

2. Compute the 1/4-cycle EMA (xEMA1) and 1/2-cycle EMA (xEMA2) of xHL2 based on Length. 

3. Obtain DSP by subtracting xEMA2 from xEMA1.

4. Set upper and lower band parameters, go long when DSP crosses above upper band, and go short when crossing below lower band.

5. The reverse parameter can switch between long and short direction.

## Advantage Analysis

Advantages of this strategy:

1. DSP captures the dominant price cycle, avoiding misdirection from minor cycles.

2. The dual EMA design effectively tracks dominant cycle changes.

3. Simple upper/lower bands avoid over-trading. 

4. Easily switch between long/short using reverse parameter, adaptable to different market environments.

5. No complex parameter optimization required, simple and practical.

## Risk Analysis

Main risks:

1. Improper DSP cycle setting may miss the dominant cycle.

2. Band width needs optimization, otherwise over-trading may occur.

3. Fixed cycle design has poor adaptability to violent market changes.

4. Trading on DSP alone leaves strategy vulnerable to whipsaws.

5. Lack of stop loss may lead to significant losses.

## Optimization Directions

Improvements:

1. Optimize parameters to find best cycle combination.

2. Add dynamic bands based on volatility.

3. Incorporate trend and volatility filters to reduce false signals. 

4. Add stop loss or trailing stop mechanisms to control risk.

5. Test across multiple instruments for universality.

6. Introduce machine learning for adaptive DSP cycle optimization.

## Summary

Overall this is a very simple and practical dual moving average trading strategy. It is built on solid cycle analysis foundations, with DSP effectively tracking the dominant cycle. With refinements in parameter optimization, stop losses, filter conditions and more, it can become a reliable quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|25|SellBand|
|v_input_3|-25|BuyBand|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-13 02:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/03/2017
// Detrended Synthetic Price is a function that is in phase with the 
// dominant cycle of real price data. This DSP is computed by subtracting 
// a half-cycle exponential moving average (EMA) from the quarter cycle 
// exponential moving average.
// See "MESA and Trading Market Cycles" by John Ehlers pages 64 - 70. 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="D_DSP (Detrended Synthetic Price)", shorttitle="D_DSP")
Length = input(14, minval=1)
SellBand = input(25)
BuyBand = input(-25)
reverse = input(false, title="Trade reverse")
hline(0, color=blue, linestyle=line)
hline(SellBand, color=red, linestyle=line)
hline(BuyBand, color=green, linestyle=line)
xHL2 = hl2
xEMA1 = ema(xHL2, Length)
xEMA2 = ema(xHL2, 2 * Length)
xEMA1_EMA2 = xEMA1 - xEMA2
pos = iff(xEMA1_EMA2 > SellBand, 1,
	     iff(xEMA1_EMA2 < BuyBand, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(xEMA1_EMA2, color=blue, title="D_DSP")
```

> Detail

https://www.fmz.com/strategy/427280

> Last Modified

2023-09-19 17:13:28
