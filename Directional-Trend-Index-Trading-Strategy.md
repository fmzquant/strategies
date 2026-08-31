
> Name

Directional-Trend-Index-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses the Directional Trend Index (DTI) to determine price trend direction for trend following trades. DTI compares the change in highest and lowest prices over a period to judge the trend, with upper and lower thresholds generating signals. Go long when DTI crosses above upper band, and short when crossing below lower band.

## Strategy Logic

Calculate price change value from highest and lowest price changes over a period. Apply multiple exponential moving averages to this to derive the DTI curve. Set upper and lower thresholds for DTI. When the indicator crosses above the upper threshold, a long signal is generated. Crossing below the lower threshold gives a short signal. Hold position until next signal occurs.

## Advantages

- DTI accurately determines trend direction with fewer signals
- Thresholds filter insignificant breakouts avoiding noise trades
- Continuously following trends, unaffected by short-term fluctuations
- Large parameter tuning space to balance responsiveness 

## Risks

- Trend reversal points cannot be accurately determined, risks losses
- Poor DTI parameter tuning risks missing opportunities  
- Prolonged holding may result in larger drawdowns
- Low trade frequency unsuitable for high frequency trading

Risks can be mitigated by shortening calculation period, adjusting thresholds, or adding reversal indicators.

## Enhancements

- Test different parameter combinations for calculating DTI
- Optimize long/short threshold levels
- Consider adding stop loss strategies to control risk
- Test robustness across different products

## Conclusion

DTI strategy accurately determines trend direction from clear signals, enabling steady long-term profits. Further refinements like parameter optimization can make it a high-quality trend following system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|r|
|v_input_2|10|s|
|v_input_3|5|u|
|v_input_4|45|OS|
|v_input_5|-45|OB|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 29/03/2017
// This technique was described by William Blau in his book "Momentum,
// Direction and Divergence" (1995). His book focuses on three key aspects 
// of trading: momentum, direction and divergence. Blau, who was an electrical 
// engineer before becoming a trader, thoroughly examines the relationship between 
// price and momentum in step-by-step examples. From this grounding, he then looks 
// at the deficiencies in other oscillators and introduces some innovative techniques, 
// including a fresh twist on Stochastics. On directional issues, he analyzes the 
// intricacies of ADX and offers a unique approach to help define trending and 
// non-trending periods.
// Directional Trend Index is an indicator similar to DM+ developed by Welles Wilder. 
// The DM+ (a part of Directional Movement System which includes both DM+ and 
// DM- indicators) indicator helps determine if a security is "trending." William 
// Blau added to it a zeroline, relative to which the indicator is deemed positive or 
// negative. A stable uptrend is a period when the DTI value is positive and rising, a 
// downtrend when it is negative and falling. 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Directional Trend Index (DTI)", shorttitle="DTI")
r = input(14, minval=1)
s = input(10, minval=1)
u = input(5, minval=1)
OS = input(45, minval=1)
OB = input(-45, maxval=-1)
reverse = input(false, title="Trade reverse")
hline(0, color=green, linestyle=line)
xHMU = iff(high - high[1] > 0, high - high[1], 0)
xLMD = iff(low - low[1] < 0, -(low - low[1]), 0)
xPrice = xHMU - xLMD
xPriceAbs = abs(xPrice)
xuXA = ema(ema(ema(xPrice, r),s),u)
xuXAAbs = ema(ema(ema(xPriceAbs, r),s),u)
Val1 = 100 * xuXA
Val2 = xuXAAbs
DTI = iff(Val2 != 0, Val1 / Val2, 0)
pos = iff(DTI > OS, -1,
	     iff(DTI < OB, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(DTI, color=maroon, title="DTI")
plot(OB, color=blue, title="OB")
plot(OS, color=red, title="OS")
```

> Detail

https://www.fmz.com/strategy/427157

> Last Modified

2023-09-18 17:07:55
