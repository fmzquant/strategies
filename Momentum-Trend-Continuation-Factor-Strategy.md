
> Name

Momentum-Trend-Continuation-Factor-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy determines the trend continuation by calculating the cumulative sum of positive and negative momentum changes, and uses it to decide the long or short direction. When the cumulative sum of positive momentum changes is greater than that of negative momentum changes, it is judged as an upward trend continuation for long. When the cumulative sum of negative momentum changes is greater than that of positive momentum changes, it is judged as a downward trend continuation for short.

## Strategy Logic

1. Calculate the change xChange of current close price relative to previous period.

2. Categorize xChange into xPlusChange for positive change, and xMinusChange for negative change.

3. Define cumulative sum variables xPlusCF and xMinusCF to accumulate positive and negative changes respectively.  

4. Calculate positive and negative changes for current period:

   xPlus = xPlusChange - xMinusCF

   xMinus = xMinusChange - xPlusCF

5. Calculate cumulative sums of positive and negative changes:

   xPlusTCF = sum(xPlus, Length)

   xMinusTCF = sum(xMinus, Length)  

6. Compare the cumulative sums to determine long or short direction:

   if xPlusTCF > xMinusTCF

      Long

   else if xPlusTCF < xMinusTCF

      Short

7. Add reverse input to switch the long/short direction.

By tracking the cumulative trend of positive and negative momentum changes, and comparing the greater momentum between upward and downward forces, this strategy judges the likely future price direction to generate trading signals.

## Advantage Analysis 

1. Using momentum indicators can capture trend changes earlier than price indicators.

2. Comparing positive and negative cumulative sums filters market noise and determines the main trend direction. 

3. Customizable Length parameter adjusts sensitivity and reduces false signals.

4. Adding reverse switch provides flexibility to adapt to different market environments.

5. Combining with trend indicators can utilize advantages of composite strategies.

6. Easy to understand and implement, suitable for beginners to learn and practice.

## Risk Analysis

1. Need proper adjustment of Length parameter, too long or short will affect performance.

2. May generate wrong signals around trend reversal points.

3. Frequent signals in ranging, choppy markets make it unsuitable.

4. Need to watch out the psychological impacts when using reverse switch.

5. Require proper testing and verification, or combining with other filters. 

6. Cannot guarantee all trades will be profitable, need proper stop loss.

## Optimization Directions

1. Can combine with other trend indicators like EMA, MACD etc.

2. Add parameters to customize positive/negative change calculations.

3. Optimize Length parameter selection to be adaptive. 

4. Add stop loss mechanisms to control single trade loss.

5. Build complete auto trading system and backtest for optimization.

6. Try machine learning methods to train parameters and rules.

## Summary

This strategy designs a relatively simple trend following approach using momentum indicators, with clear logic and easy implementation, serving as a basic template for trend trading strategies. But for actual use, parameter tuning and validation are needed, as well as combining with other technical indicators, to maximize usefulness, minimize false signals, and improve robustness. Also risk control is important, with proper stop loss, not blindly following signals. With continuous optimizations and improvements, adding automation elements, it will help generate stable trading systems.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|35|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-01 00:00:00
end: 2023-10-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 04/01/2018
//    Trend continuation factor, by M.H. Pee 
//    The related article is copyrighted material from Stocks & Commodities.
//
//You can change long to short in the Input Settings
//WARNING:
//- For purpose educate only
//- This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Trend continuation factor")
Length = input(35, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=green, linestyle=line)
xChange = mom(close, 1)
xPlusChange = iff(xChange > 0, xChange, 0)
xMinusChange = iff(xChange < 0, (xChange * -1), 0)
xPlusCF = iff(xPlusChange == 0, 0, xPlusChange + nz(xPlusCF[1], 1))
xMinusCF = iff(xMinusChange == 0, 0, xMinusChange + nz(xMinusCF[1], 1))
xPlus = xPlusChange - xMinusCF
xMinus = xMinusChange - xPlusCF
xPlusTCF =  sum(xPlus, Length)
xMinusTCF = sum(xMinus, Length)
pos = iff(xPlusTCF > xMinusTCF, 1,
       iff(xPlusTCF < xMinusTCF, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xPlusTCF, color=blue, title="Plus TCF")
plot(xMinusTCF, color=red, title="Minus TCF")
```

> Detail

https://www.fmz.com/strategy/428719

> Last Modified

2023-10-08 16:15:34
