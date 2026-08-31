
> Name

Extended-Adaptive-CCI-Bottom-Fishing-Trading-Strategy-for-Commodities

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11f321dc1b8e3ff37c5.png)

## Overview

This strategy is based on the Commodity Channel Index (CCI) indicator and employs dynamic adaptive entry levels to determine trend reversal timing, while using a trailing stop loss to lock in profits. The strategy name "Extended Adaptive CCI Bottom Fishing Trading Strategy for Commodities" captures the key aspects of this strategy: using the CCI indicator to identify oversold zones to fish for reversal opportunities, and adopting adaptive entry levels to optimize entry timing.  

## Strategy Logic

The core indicator is the CCI, used to spot oversold zones hence hinting at trend reversal opportunities. Also, the extent of CCI oversold zones varies across different instruments and market environments. Therefore, this strategy takes a "far-sighted" approach, examining the lowest CCI levels over certain lookback periods, to dynamically set the CCI buy entry level. If the lowest CCI over the past 40 days is above -90, then -90 becomes the new oversold zone threshold, and so on. This adaptive design allows entry levels to dynamically fit different market conditions, pursuing more conservative entries during strong downtrends while more aggressive entries during range-bound markets.

Specifically, the default CCI buy signal level is -145. The strategy then checks the lowest CCI readings over the past 40 days, 50 days etc different lookback days. If the lowest CCI is above the next level like -90, then -90 becomes the new entry level. And so on, the entry level can switch between -145 / -90 / -70 / -50 / -4 / 0 / +25 / +50 / +70 dynamically. A long entry signal is triggered when CCI drops below the corresponding level.  

In addition, a trailing stop loss is used to lock in profits, with the stop level moving up along with the price.

## Advantage Analysis

- Clear and reliable approach of using CCI to spot oversold zones  
- The adaptive design of entry levels allows the strategy to automatically fit different market environments
- Trailing stop loss helps lock in profits effectively

Compared to fixed entry levels, such dynamic design enables optimized entry timing. Pursuing more conservative entries during strong downtrends reduces risk, while lower entries during range-bound markets allow capturing more opportunities. This enhances the adaptability of the strategy.

CCI itself is a clear and reliable indicator for identifying overbought/oversold levels. The logic of judging trend reversals based on CCI is proven. Combined with the dynamic entry design, the overall advantage of this strategy is significant.

## Risk Analysis

- CCI is not perfect and has some lagging attributes. Judgments may fail when price breaks out rapidly from CCI readings.
- Dynamic adjustment of entry levels also cannot perfectly match changes in market environments. Delay in adjustments may cause missing of optimal entry timing.  
- High volatility in commodity markets. Improper stop loss setting can lead to huge losses.

The logic of spotting trend reversal points has some lagging attributes. Entry timing may not be accurate during sudden price surges or crashes. Also, the adaptive mechanism may not perfectly fit the current market environment, leading to non-optimal entries. Finally, high fluctuations in commodity markets can cause huge losses if stop loss parameters are not set properly.  

## Improvement Directions

- Optimize CCI parameters and smoothing periods, test effectiveness of different CCI lengths
- Test more types of entry levels, find better default values or adaptive designs 
- Test different stop loss parameters, properly raise stop loss range to match high volatility attributes of commodity markets

Mainly CCI itself, entry level design and stop loss parameters can be improved. Precisely locating optimum parameters for specific instruments can enhance strategy performance.  

## Summary

This strategy combines the logic of using CCI to spot overbought/oversold zones and the dynamic adaptive entry level design to capture trend reversals. Compared to fixed parameters, the dynamic entry levels significantly improve adaptability. This entry reversal capturing model with trailing stop loss can seize opportunities with strong momentum and cut losses in time. With properly configured parameters, this strategy demonstrates viability and robustness. Further improvements can be made by keep optimizing CCI parameters and entry level rules to achieve higher stability and profitability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|CCI Period|
|v_input_2|-145|Default CCI Entry Oversold Level|
|v_input_3|-90|Adaptive CCI Entry Level for 40 Days|
|v_input_4|-70|Adaptive CCI Entry Level for 50 Days|
|v_input_5|-50|Adaptive CCI Entry Level for 60 Days|
|v_input_6|-4|Adaptive CCI Entry Level for 90 Days|
|v_input_7|false|Adaptive CCI Entry Level for 120 Days|
|v_input_8|25|Adaptive CCI Entry Level for 140 Days|
|v_input_9|50|Adaptive CCI Entry Level for 160 Days|
|v_input_10|70|Adaptive CCI Entry Level for 180 Days|
|v_input_11|40|Lookback Period for -90 Level|
|v_input_12|50|Lookback Period for -70 Level|
|v_input_13|60|Lookback Period for -50 Level|
|v_input_14|90|Lookback Period for -4 Level|
|v_input_15|120|Lookback Period for 0 Level|
|v_input_16|140|Lookback Period for +25 Level|
|v_input_17|160|Lookback Period for +50 Level|
|v_input_18|180|Lookback Period for +70 Level|
|v_input_19|10|Trailing Stop Offset in USD|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Extended Adaptive CCI Entry Strategy for Commodities", shorttitle="Ext_Adaptive_CCI_Entry_Com", overlay=true)

// Inputs
cciLength = input(20, title="CCI Period")
defaultCCIEntryOversold = input(-145, title="Default CCI Entry Oversold Level")
adaptiveCCIEntryLevel90 = input(-90, title="Adaptive CCI Entry Level for 40 Days")
adaptiveCCIEntryLevel70_50Days = input(-70, title="Adaptive CCI Entry Level for 50 Days")
adaptiveCCIEntryLevel50 = input(-50, title="Adaptive CCI Entry Level for 60 Days")
adaptiveCCIEntryLevel4 = input(-4, title="Adaptive CCI Entry Level for 90 Days")
adaptiveCCIEntryLevel0 = input(0, title="Adaptive CCI Entry Level for 120 Days")
adaptiveCCIEntryLevel25 = input(25, title="Adaptive CCI Entry Level for 140 Days")
adaptiveCCIEntryLevel50_160Days = input(50, title="Adaptive CCI Entry Level for 160 Days")
adaptiveCCIEntryLevel70_180Days = input(70, title="Adaptive CCI Entry Level for 180 Days")
lookback40 = input(40, title="Lookback Period for -90 Level")
lookback50 = input(50, title="Lookback Period for -70 Level")
lookback60 = input(60, title="Lookback Period for -50 Level")
lookback90 = input(90, title="Lookback Period for -4 Level")
lookback120 = input(120, title="Lookback Period for 0 Level")
lookback140 = input(140, title="Lookback Period for +25 Level")
lookback160 = input(160, title="Lookback Period for +50 Level")
lookback180 = input(180, title="Lookback Period for +70 Level")

// Indicator Calculation
cci = ta.cci(close, cciLength)

// Determine adaptive entry level based on lookback periods
var float entryLevel = defaultCCIEntryOversold // Initialize with the default level
if ta.lowest(cci, lookback40) > adaptiveCCIEntryLevel90
    entryLevel := adaptiveCCIEntryLevel90
if ta.lowest(cci, lookback50) > adaptiveCCIEntryLevel70_50Days
    entryLevel := adaptiveCCIEntryLevel70_50Days
if ta.lowest(cci, lookback60) > adaptiveCCIEntryLevel50
    entryLevel := adaptiveCCIEntryLevel50
if ta.lowest(cci, lookback90) > adaptiveCCIEntryLevel4
    entryLevel := adaptiveCCIEntryLevel4
if ta.lowest(cci, lookback120) > adaptiveCCIEntryLevel0
    entryLevel := adaptiveCCIEntryLevel0
if ta.lowest(cci, lookback140) > adaptiveCCIEntryLevel25
    entryLevel := adaptiveCCIEntryLevel25
if ta.lowest(cci, lookback160) > adaptiveCCIEntryLevel50_160Days
    entryLevel := adaptiveCCIEntryLevel50_160Days
if ta.lowest(cci, lookback180) > adaptiveCCIEntryLevel70_180Days
    entryLevel := adaptiveCCIEntryLevel70_180Days

// Entry Condition
longCondition = cci < entryLevel

// Entry and Exit
if (longCondition)
    strategy.entry("Long", strategy.long, qty=1)
    alert("Long entry executed at " + str.tostring(close), alert.freq_once_per_bar)

trailOffset = input(10.0, title="Trailing Stop Offset in USD")
strategy.exit("Trailing Stop", "Long", trail_offset = trailOffset, trail_price = close)
if (close < entryLevel - trailOffset)
    alert("Long position closed at " + str.tostring(close), alert.freq_once_per_bar)

// Plotting
plot(series=cci, color=color.purple, title="CCI")
hline(price=defaultCCIEntryOversold, color=color.red, title="Default CCI Entry Oversold Level")
hline(price=adaptiveCCIEntryLevel90, color=color.orange, title="CCI -90 Level (40 Days)")
hline(price=adaptiveCCIEntryLevel70_50Days, color=color.yellow, title="CCI -70 Level (50 Days)")
hline(price=adaptiveCCIEntryLevel50, color=color.green, title="CCI -50 Level (60 Days)")
hline(price=adaptiveCCIEntryLevel4, color=color.blue, title="CCI -4 Level (90 Days)")
hline(price=adaptiveCCIEntryLevel0, color=color.purple, title="CCI 0 Level (120 Days)")
hline(price=adaptiveCCIEntryLevel25, color=color.aqua, title="CCI +25 Level (140 Days)")
hline(price=adaptiveCCIEntryLevel50_160Days, color=color.black, title="CCI +50 Level (160 Days)")
hline(price=adaptiveCCIEntryLevel70_180Days, color=color.gray, title="CCI +70 Level (180 Days)")

```

> Detail

https://www.fmz.com/strategy/436119

> Last Modified

2023-12-21 14:30:03
