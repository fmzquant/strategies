
> Name

Dual-Moving-Average-Crossover-Strategy-with-Multi-Type-Moving-Averages

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy generates trading signals by calculating crossover of multiple types of moving averages, implementing dual MA crossover long and short. It also introduces a third MA line for trend identification to control risks.

## Strategy Logic

1. Calculate two MAs: MA1 and MA2, which can choose from SMA, EMA, VWMA etc. The lengths are customizable.

2. Determine MA crossover: go long when MA1 crosses over MA2, close position when MA1 crosses below MA2. 

3. (Optional) Calculate a third MA - MA3, usually with a longer period like 50. Above MA3 is uptrend, below is downtrend. Only trade when price breaks MA3.

4. Combine the rules with backtest timeframe to generate trading signals.

5. Fill color on crossover areas for visual aid.

The strategy combines the trend following of MAs and crossover long/short, with a third MA for risk control. Parameters can be adjusted flexibly for different market cycles.

## Advantage Analysis 

1. Dual MA crossover effectively follows the trend.

2. Support multiple MA types combinations, can be optimized for different periods.

3. Third MA controls risks and reduces unnecessary losses. 

4. Visual aid improves chart trading experience.

5. Adjustable parameters can be optimized for different cycles.

6. Simple and clear logic, easy to understand and follow.

## Risk Analysis

1. Dual MA struggles with range-bound and trend reversal scenarios. Can be improved via parameter optimization.

2. Dual MA may generate false signals or over-reaction sometimes. Can lengthen MA periods or optimize parameters.

3. Third MA may miss strongly trending opportunities. Can test shortening its period to capture more profits.

4. Cannot guarantee wins for every trade, need proper stop loss management.

## Optimization Directions

1. Test different MA types and periods for best parameter pair.

2. Optimize third MA period to balance risk control and profit capture.

3. Add stop loss strategy to control single trade loss amount. 

4. Consider machine learning algorithms to find optimal parameters based on big data.

5. Combine with other indicators like KD, MACD for signal filtering and confirmation.

## Summary

This dual moving average crossover strategy with multi-type MAs incorporates trend following, risk control, parameter optimization, visual aid and more. With continuous testing and optimization, introducing other indicators or machine learning etc, it can adapt better to the market and has great practical value. In summary, this is a simple, practical and easily optimizable strategy, making it a great starting point for algorithmic trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|MA №1|
|v_input_2|0|ma1type: EMA|SMA|RMA|WMA|VWMA|
|v_input_3_close|0|ma1src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|ma1Len|
|v_input_5|#11ff00|ma1col|
|v_input_6|true|MA №2|
|v_input_7|0|ma2type: SMA|EMA|RMA|WMA|VWMA|
|v_input_8_close|0|ma2src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|21|ma2Len|
|v_input_10|#e91e63|ma2col|
|v_input_11|true|For Safe Side = Read This >>>|
|v_input_12|false|MA №3|
|v_input_13|0|ma3type: SMA|EMA|RMA|WMA|VWMA|
|v_input_14|50|ma3Len|
|v_input_15|#e91e63|ma3col|
|v_input_16|timestamp(01 Jan 2021)|Start Time|
|v_input_17|timestamp(01 Jan 2100)|End Time|
|v_input_18|true|Cross Sign ON/OFF|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 22:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HAMIDBOX

//@version=4
strategy("Multi-X by HAMID-BOX", overlay=true)

maType(source , length, type)   =>
    type    == "SMA"            ? sma(source , length)  :
     type   == "EMA"            ? ema(source , length)  :
     type   == "RMA"            ? rma(source, length)   : 
     type   == "WMA"            ? wma(source, length)   :
     type   == "VWMA"           ? vwma(source, length)  :
     na
     
////////////////////////////////////////////////////////////////////////////////
colorup             = #11ff00
colordn             = #e91e63

/////////////////////////// MOVING AVERAGE №1 INPUTS ///////////////////////////
ma1_show            = input(title="MA №1", defval=true, type=input.bool, inline="ma1")
ma1type             = input(title="", defval="EMA", options=["SMA","EMA","RMA","WMA","VWMA"], inline="ma1")
ma1src              = input(title="", defval=close, type=input.source, inline="ma1")
ma1Len              = input(title="", defval=9, type=input.integer, inline="ma1")
ma1col              = input(colorup, "", type=input.color, inline="ma1")

ma1                 = maType(ma1src, ma1Len, ma1type)

ma1p = plot(ma1_show ? ma1 : na, linewidth=1, color=color.new(ma1col , 50))

/////////////////////////// MOVING AVERAGE №2 INPUTS ///////////////////////////
ma2_show            = input(title="MA №2", defval=true, type=input.bool, inline="ma2")
ma2type             = input(title="", defval="SMA", options=["SMA","EMA","RMA","WMA","VWMA"], inline="ma2")
ma2src              = input(title="", defval=close, type=input.source, inline="ma2")
ma2Len              = input(title="", defval=21, type=input.integer, inline="ma2")
ma2col              = input(colordn, "", type=input.color, inline="ma2")

ma2                 = maType(ma2src, ma2Len, ma2type)

ma2p = plot(ma2_show ? ma2 : na, linewidth=1, color=color.new(ma2col , 50))

/////////////////////////// MOVING AVERAGE №3 INPUTS ///////////////////////////

read                = input(title="For Safe Side = Read This >>>", defval=true, tooltip="If you want to play on the safe side, Check ON Moving Average № 3, MA №3 shows the major trend, its work as a Trend-Zone,\nRule: Do not open trades if the market is below MA № 3, WHY? because Trend is Bearish and it will make more Down, NOTE:: It is possible after adding MA № 3, it will give you a small profit. But the great advantage of that, it will reduce your loss and it will also increase your Profit Factor.\nAnd if you not have any issue with Risk then you can Leave Moving Average No 3")
ma3_show            = input(title="MA №3", defval=false, type=input.bool, inline="ma3")
ma3type             = input(title="", defval="SMA", options=["SMA","EMA","RMA","WMA","VWMA"], inline="ma3")
// ma3srcH          = input(title="", defval=high, type=input.source, inline="ma3")
// ma3srcL          = input(title="", defval=low, type=input.source, inline="ma3")
ma3Len              = input(title="", defval=50, type=input.integer, inline="ma3")
ma3col              = input(colordn, "", type=input.color, inline="ma3")

ma3H                = maType(high, ma3Len, ma3type)
ma3L                = maType(low, ma3Len, ma3type)

ma3p                = plot(ma3_show ? ma3H : na, linewidth=1, color=color.new(ma3col , 50))
ma3p2               = plot(ma3_show ? ma3L : na, linewidth=1, color=color.new(ma3col , 50))

Bigcross_zone_color = if ma3_show and close > ma3H
    color.new(colorup , 90)
else
    if ma3_show and close < ma3L
        color.new(colordn , 90)
fill(ma3p , ma3p2, color=Bigcross_zone_color, title="Cross Background Color")

BigCrossSignal      = close > ma3H
ZoneCrossover       = crossover(close , ma3H)
///////////////////////////// BACK TESTING INPUTS //////////////////////////////
startTime           = input(title="Start Time", type=input.time, defval= timestamp("01 Jan 2021"))
endTime             = input(title="End Time", type=input.time, defval= timestamp("01 Jan 2100"))
inDateRange         = true

//////////////////////////// PLOTING AND COOLORING /////////////////////////////
Cross               = input(true, "Cross Sign ON/OFF") 
maCrossOver         = crossover(ma1 , ma2)
maCrossUnder        = crossunder(ma1 , ma2)
cross_zone_color    = ma1 > ma2 ? color.new(colorup , 85) : color.new(colordn , 85)

plotshape(Cross ? maCrossOver : na, title="CrossUP Sign", style=shape.triangleup, location=location.belowbar, color=color.white, size=size.tiny)
plotshape(Cross ? maCrossUnder : na, title="CrossDN Sign", style=shape.xcross, location=location.abovebar, color=#e91e63, size=size.tiny)

fill(ma1p , ma2p, color=cross_zone_color, title="Cross Background Color")

///////////////////////////////// (CONDITIONS) /////////////////////////////////

if maCrossOver and inDateRange
    if ma3_show
        strategy.entry("BUY", strategy.long, when=BigCrossSignal)
    else    
        strategy.entry("BUY", strategy.long)

if  ma3_show
    strategy.entry("BUY", strategy.long, when=ZoneCrossover)

if maCrossUnder and inDateRange
    strategy.close("BUY", comment="Exit")
if (not inDateRange)
    strategy.close_all()




```

> Detail

https://www.fmz.com/strategy/427303

> Last Modified

2023-09-19 21:27:31
