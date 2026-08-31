
> Name

Short-term-Trading-Strategy-Based-on-Momentum-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b176d126530061f913.png)

## Overview

The strategy is named "Short-term Trading Strategy Based on Momentum Indicator". It utilizes the momentum indicator Mass Index to identify turning points in market trends and capture short-term trading opportunities.

## Strategy Logic

The strategy uses two exponential moving averages (EMA) with different parameters to smooth the difference between the highest and lowest prices and obtains the Mass Index indicator. It goes short when the Mass Index crosses above a threshold and goes long when crossing below a threshold. 

Specifically, it first calculates the difference between the highest and lowest prices xPrice. Then it calculates the 9-period and 25-period EMA of xPrice, named xEMA and xSmoothXAvg respectively. After that, it sums the ratios of these two EMAs to get the Mass Index. When the Mass Index is greater than a threshold, it goes short. When less than a threshold, it goes long.

The strategy identifies trend reversal points by the crossover of Mass Index and thus conducts short-term trading. As market volatility intensifies, Mass Index will rise. As market volatility subsides, Mass Index will fall. Monitoring its breakthrough of certain level can effectively capture short-term trading opportunities.


## Advantages

The strategy has the following advantages:

1. Using momentum indicator Mass Index can effectively identify fluctuations and turning points in the short term
2. Relatively accurate in positioning entry and exit points, avoiding chasing tops and bottoms
3. Simple and clear trading strategy and parameters, easy to implement 
4. Flexible parameter adjustment for different market environments

## Risks and Solutions

There are also some risks with this strategy:

1. False breakouts may occur, resulting in unnecessary trades. Fine tuning parameters could reduce false signals.
2. Long term trends are not considered, which may conflict with the main trend. Combine with trend indicators to avoid counter-trend trades.
3. Curve fitting risk. Expand sample periods reasonably to test robustness of parameters.

## Optimization Directions 

The strategy can be optimized in the following aspects:

1. Combine with fundamental analysis to avoid trading highly volatile low quality stocks
2. Add stop loss mechanisms to strictly control single loss
3. Combine with volatility indicators to reduce position sizing when market volatility rises  
4. Add conditional orders to optimize entry and exit timing

## Conclusion  

This strategy designs a simple short-term trading strategy based on the Mass Index indicator, which can effectively identify turning points in the market for precise long and short trades. The trading strategy and parameter settings are simple and intuitive, easy to implement, and adjustable for different market environments, making it highly practical. But risks of overfitting and failure of indicators should also be noticed. Trend analysis and stop loss should be combined to cope with market uncertainty.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Length1|
|v_input_2|25|Length2|
|v_input_3|26.5|Trigger|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/09/2017
// The Mass Index was designed to identify trend reversals by measuring 
// the narrowing and widening of the range between the high and low prices. 
// As this range widens, the Mass Index increases; as the range narrows 
// the Mass Index decreases.
// The Mass Index was developed by Donald Dorsey. 
//
// You can change long to short in the Input Settings
// WARNING:
//   - For purpose educate only
//   - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="MASS Index", shorttitle="MASS Index")
Length1 = input(9, minval=1)
Length2 = input(25, minval=1)
Trigger = input(26.5, step = 0.01)
reverse = input(false, title="Trade reverse")
hline(27, color=blue, linestyle=line, title = "Setup")
hline(Trigger, color=red, linestyle=line, title = "Trigger")
xPrice = high - low
xEMA = ema(xPrice, Length1)
xSmoothXAvg = ema(xEMA, Length1)
nRes = sum(iff(xSmoothXAvg != 0, xEMA / xSmoothXAvg, 0), Length2)
pos = iff(nRes > Trigger, -1,
	   iff(nRes < Trigger, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(nRes, color=red, title="MASS Index")
```

> Detail

https://www.fmz.com/strategy/442924

> Last Modified

2024-02-27 14:07:09
