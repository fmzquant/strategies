
> Name

Ehlers-Fisher-Transform-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b442941fd17807024a.png)

## Overview

This strategy is based on the Fisher Transform indicator designed by technical analysis master John Ehlers to automatically identify price trend reversal points for long/short trading. Its biggest advantage is the accuracy and timeliness of identifying price reversals.

## Strategy Logic

This strategy uses the Fisher transform formula to standardize prices and generate a near-Gaussian distribution price sequence. The Fisher transform formula is: y = 0.5 * ln((1+x)/(1-x)). Through this transform, price extremes are converted to relatively rarer events. When the latest Fisher transformed value is higher/lower than the previous period, it indicates a possible price reversal. The strategy generates trading signals based on the turning points of this indicator.  

Specifically, the strategy steps are as follows:

1. Calculate the mid price HL2;
2. Calculate the highest price xMaxH and lowest price xMinL over the Length period;
3. Calculate the standardized price nValue1=(xHL2 - xMinL) / (xMaxH - xMinL) - 0.5;  
4. Smooth nValue1 to get nValue2, preventing extremes;
5. Apply the Fisher transform formula on nValue2 to get the Fisher indicator nFish;
6. Compare nFish with previous value to determine if a turn has occurred, and set the trading direction pos;
7. Set long/short position based on pos to generate trading signals.

## Advantage Analysis

The biggest advantage of this strategy is the accuracy and timeliness of its trading signals. Because the Fisher transformed price sequence approximates a Gaussian distribution, price reversals can be quickly identified and reacted to by the Fisher indicator. This ensures timely catches of reversal opportunities. In addition, the Ehlers Fisher transform itself has also been extensively validated for highly reliable reversal signals.  

## Risk Analysis

The biggest risk of this strategy is that the Fisher transformed price sequence may not perfectly conform to the theoretical Gaussian distribution. Abnormal market fluctuations like gaps can cause the Fisher indicator to generate incorrect signals. Blindly trading on those signals can lead to major losses.

To mitigate this risk, we can consider combining other indicators for signal filtering, avoiding trades during abnormal markets. We can also fine tune parameters to reduce trading frequency and sizing.

## Optimization Directions 

This strategy can be optimized in the following aspects:

1. Optimize the Length parameter to find best combinations for different market conditions;  
2. Add stop loss mechanisms to limit downside;
3. Add trade filters to avoid incorrect trades in abnormal markets; 
4. Combine with other indicators to improve signal accuracy.

## Conclusion

This strategy leverages Ehlers’ Fisher Transform indicator to quickly and accurately identify price reversal points for timely trade entries. Its biggest strength lies in the accuracy and timeliness of trading signals. There are also risks that need parameter tuning and trade rule optimizations to mitigate. Overall this strategy warrants further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Length|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version = 2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 15/12/2016
// 	Market prices do not have a Gaussian probability density function
// 	as many traders think. Their probability curve is not bell-shaped.
// 	But trader can create a nearly Gaussian PDF for prices by normalizing
// 	them or creating a normalized indicator such as the relative strength
// 	index and applying the Fisher transform. Such a transformed output 
// 	creates the peak swings as relatively rare events.
// 	Fisher transform formula is: y = 0.5 * ln ((1+x)/(1-x))
// 	The sharp turning points of these peak swings clearly and unambiguously
// 	identify price reversals in a timely manner. 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Fisher Transform Indicator by Ehlers Backtest", shorttitle="Fisher Transform Indicator by Ehlers")
Length = input(10, minval=1)
reverse = input(false, title="Trade reverse")
xHL2 = hl2
xMaxH = highest(xHL2, Length)
xMinL = lowest(xHL2,Length)
nValue1 = 0.33 * 2 * ((xHL2 - xMinL) / (xMaxH - xMinL) - 0.5) + 0.67 * nz(nValue1[1])
nValue2 =   iff(nValue1 > .99,  .999,
	         iff(nValue1 < -.99, -.999, nValue1))
nFish = 0.5 * log((1 + nValue2) / (1 - nValue2)) + 0.5 * nz(nFish[1])
pos = iff(nFish > nz(nFish[1]), 1,
	   iff(nFish < nz(nFish[1]), -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nFish, color=green, title="Fisher")
plot(nz(nFish[1]), color=red, title="Trigger")
```

> Detail

https://www.fmz.com/strategy/438062

> Last Modified

2024-01-08 16:51:10
