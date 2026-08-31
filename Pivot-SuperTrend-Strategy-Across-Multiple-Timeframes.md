
> Name

Pivot-SuperTrend-Strategy-Across-Multiple-Timeframes

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12d99dd2a6950dcc06c.png)

## Overview

This strategy combines the Pivot Points indicator and Average True Range Bands to implement a trend tracking system across multiple timeframes. It can capture trends over intermediate cycles while using Pivot Points to determine long-term support and resistance for better entry and exit.

## Strategy Logic  

This strategy is mainly based on two indicators:

1. Pivot Points: Calculate the average of highest, lowest and closing prices over a certain period to determine upper and lower pivot points. Pivot points can serve as key support and resistance areas. 

2. Average True Range Bands: Calculate the average true range over a certain period, and move the middle band up and down to form a channel. The upper and lower bands can serve as dynamic stop loss lines.

The specific trading logic is:

When the price breaks through the Average True Range channel, take long or short positions along the breakout direction. When the price returns into the channel, close positions. Also, when the price breaks through the upper pivot point, take long stance; when the price breaks through the lower pivot point, take short stance.  

The strategy also introduces the pivot middle line concept. When take profit breaks the middle line, it’s possible to close half position to lock in some profit and control risk.

## Advantage Analysis 

The strategy has the following advantages:

1. Multiple timeframe design. Long and intermediate cycles determine major trends while short cycles determine specific entries.  

2. The pivot middle line provides an option to close half position, locking in some profit while ensuring winning trades.

3. Average True Range Bands provide clear stop loss levels.  

4. The strategy has few parameters, easy to optimize for best parameter combinations. 

5. It maximally avoids the risk of false breakouts.

## Risk Analysis

The strategy also has some risks:

1. Larger stop loss risks during high market volatility. 

2. The middle line may frequently trigger stop loss during market consolidations.  

3. Improper parameter selections may result in too few or too frequent trades. 

4. Recent pivot point breaks may turn out to be false breaks.

## Optimization Directions

The strategy can be optimized from the following aspects:

1. Combine more filters like volume and Bollinger Bands to avoid false signals.  

2. Optimize periods of Pivot Points and ATR to find best parameter combinations.  

3. Set a buffer zone around the middle line to avoid frequent triggers. 

4. Add proper trend filters to ensure operating along major trends.

## Conclusion

In general, this is a very practical trend tracking strategy. It solves the common stop loss difficulties of trend systems and achieves risk-controllable trend trading. It is a highly recommendable strategy. With proper optimizations and improvements, its performance can be further enhanced.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Pivot Point Period|
|v_input_2|3|ATR Factor|
|v_input_3|10|ATR Period|
|v_input_4|false|Use Center Line to Close Entry for 50%|
|v_input_5|false|Show Pivot Points|
|v_input_6|false|Show PP Center Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © LonesomeTheBlue

//@version=4
strategy("Pivot Point SuperTrend [Backtest]", overlay = true)
prd = input(defval = 2, title="Pivot Point Period", minval = 1, maxval = 50)
Factor=input(defval = 3, title = "ATR Factor", minval = 1, step = 0.1)
Pd=input(defval = 10, title = "ATR Period", minval=1)
usecenter = input(defval = false, title="Use Center Line to Close Entry for 50%")
showpivot = input(defval = false, title="Show Pivot Points")
showcl = input(defval = false, title="Show PP Center Line")


float ph = na
float pl = na
ph := pivothigh(prd, prd)
pl := pivotlow(prd, prd)

plotshape(ph and showpivot, text="H",  style=shape.labeldown, color=na, textcolor=color.red, location=location.abovebar, transp=0, offset = -prd)
plotshape(pl and showpivot, text="L",  style=shape.labeldown, color=na, textcolor=color.lime, location=location.belowbar, transp=0, offset = -prd)

float center = na
center := center[1]
float lastpp = ph ? ph : pl ? pl : na
if lastpp
    if na(center)
        center := lastpp
    else
        center := (center * 2 + lastpp) / 3

Up = center - (Factor * atr(Pd))
Dn = center + (Factor * atr(Pd))

float TUp = na
float TDown = na
Trend = 0
TUp := close[1] > TUp[1] ? max(Up, TUp[1]) : Up
TDown := close[1] < TDown[1] ? min(Dn, TDown[1]) : Dn
Trend := close > TDown[1] ? 1: close < TUp[1]? -1: nz(Trend[1], 1)
Trailingsl = Trend == 1 ? TUp : TDown

linecolor = Trend == 1 and nz(Trend[1]) == 1 ? color.lime : Trend == -1 and nz(Trend[1]) == -1 ? color.red : na
plot(Trailingsl, color = linecolor ,  linewidth = 2, title = "PP SuperTrend")

plot(showcl ? center : na, color = showcl ? center < hl2 ? color.blue : color.red : na, transp = 0)

bsignal = Trend == 1 and Trend[1] == -1
ssignal = Trend == -1 and Trend[1] == 1

if bsignal
    strategy.entry("Buy", true, 2, comment = "Buy")
if ssignal
    strategy.entry("Sell", false, 2, comment = "Sell")

if strategy.position_size == 2 and center > hl2 and usecenter
    strategy.close("Buy", qty_percent = 50, comment = "close buy entry for 50%")
if strategy.position_size == -2 and center < hl2 and usecenter
    strategy.close("Sell", qty_percent = 50, comment = "close sell entry for 50%")
    
if change(Trend)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/440565

> Last Modified

2024-01-31 17:29:37
