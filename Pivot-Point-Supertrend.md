
> Name

Pivot-Point-Supertrend

> Author

ChaoZhang

> Strategy Description

Hello All,

There are many types of SuperTrend around. Recently I thought about a Supertrend based on Pivot Points then I wrote "Pivot Point SuperTrend" script. It looks it has better performance on keeping you in the trend more.

The idea is behind this script is finding pivot point , calculating average of them and like in supertrend creating higher/lower bands by ATR. As you can see in the algorithm the script gives weigth to past pivot points , this is done for smoothing it a bit.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/fd80a8497ef73b8f55.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Pivot Point Period|
|v_input_2|2|ATR Factor|
|v_input_3|6|ATR Period|
|v_input_4|false|Show Pivot Points|
|v_input_5|true|Show Buy/Sell Labels|
|v_input_6|false|Show PP Center Line|
|v_input_7|false|Show Support/Resistance|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-09 00:00:00
end: 2022-05-15 23:59:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © LonesomeTheBlue

//@version=4
study("Pivot Point SuperTrend", overlay = true)
prd = input(defval = 3, title="Pivot Point Period", minval = 1, maxval = 50)
Factor=input(defval = 2, title = "ATR Factor", minval = 1, step = 0.1)
Pd=input(defval = 6, title = "ATR Period", minval=1)
showpivot = input(defval = false, title="Show Pivot Points")
showlabel = input(defval = true, title="Show Buy/Sell Labels")
showcl = input(defval = false, title="Show PP Center Line")
showsr = input(defval = false, title="Show Support/Resistance")

// get Pivot High/Low
float ph = pivothigh(prd, prd)
float pl = pivotlow(prd, prd)

// drawl Pivot Points if "showpivot" is enabled
plotshape(ph and showpivot, text="H",  style=shape.labeldown, color=na, textcolor=color.red, location=location.abovebar, transp=0, offset = -prd)
plotshape(pl and showpivot, text="L",  style=shape.labeldown, color=na, textcolor=color.lime, location=location.belowbar, transp=0, offset = -prd)

// calculate the Center line using pivot points
var float center = na
float lastpp = ph ? ph : pl ? pl : na
if lastpp
    if na(center)
        center := lastpp
    else
        //weighted calculation
        center := (center * 2 + lastpp) / 3

// upper/lower bands calculation
Up = center - (Factor * atr(Pd))
Dn = center + (Factor * atr(Pd))

// get the trend
float TUp = na
float TDown = na
Trend = 0
TUp := close[1] > TUp[1] ? max(Up, TUp[1]) : Up
TDown := close[1] < TDown[1] ? min(Dn, TDown[1]) : Dn
Trend := close > TDown[1] ? 1: close < TUp[1]? -1: nz(Trend[1], 1)
Trailingsl = Trend == 1 ? TUp : TDown

// plot the trend
linecolor = Trend == 1 and nz(Trend[1]) == 1 ? color.lime : Trend == -1 and nz(Trend[1]) == -1 ? color.red : na
plot(Trailingsl, color = linecolor ,  linewidth = 2, title = "PP SuperTrend")
 
plot(showcl ? center : na, color = showcl ? center < hl2 ? color.blue : color.red : na)

// check and plot the signals
bsignal = Trend == 1 and Trend[1] == -1
ssignal = Trend == -1 and Trend[1] == 1
plotshape(bsignal and showlabel ? Trailingsl : na, title="Buy", text="Buy", location = location.absolute, style = shape.labelup, size = size.tiny, color = color.lime, textcolor = color.black, transp = 0)
plotshape(ssignal and showlabel ? Trailingsl : na, title="Sell", text="Sell", location = location.absolute, style = shape.labeldown, size = size.tiny, color = color.red, textcolor = color.white, transp = 0)

//get S/R levels using Pivot Points
float resistance = na
float support = na
support := pl ? pl : support[1]
resistance := ph ? ph : resistance[1]

// if enabled then show S/R levels
plot(showsr and support ? support : na, color = showsr and support ? color.lime : na, style = plot.style_circles, offset = -prd)
plot(showsr and resistance ? resistance : na, color = showsr and resistance ? color.red : na, style = plot.style_circles, offset = -prd)

// alerts
alertcondition(Trend == 1 and Trend[1] == -1, title='Buy Signal', message='Buy Signal')
alertcondition(Trend == -1 and Trend[1] == 1, title='Sell Signal', message='Sell Signal')
alertcondition(change(Trend), title='Trend Changed', message='Trend Changed')


if Trend == 1 and Trend[1] == -1
    strategy.entry("Enter Long", strategy.long)
else if Trend == -1 and Trend[1] == 1
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363829

> Last Modified

2022-05-17 16:03:36
