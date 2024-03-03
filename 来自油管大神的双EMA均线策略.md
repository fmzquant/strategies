
> Name

来自油管大神的双EMA均线策略

> Author

小小梦

> Strategy Description

相关文章：https://www.fmz.com/bbs-topic/9670

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Swing Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|Swing Period|
|v_input_3|3.5|Swing Multiplier|
|v_input_4|false|Bar Colors On/Off|
|v_input_5|50|fastEmaPeriod|
|v_input_6|200|slowEmaPeriod|
|v_input_7|30|loss|
|v_input_8|30|trailPoints|
|v_input_9|30|trailOffset|
|v_input_10|true|amount|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-01-01 00:00:00
end: 2022-10-08 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
args: [["ZPrecision",0,358374]]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

// Credits to the original Script - Range Filter DonovanWall https://www.tradingview.com/script/lut7sBgG-Range-Filter-DW/
// This version is the old version of the Range Filter with less settings to tinker with

//@version=4
study(title="Range Filter - B&S Signals", shorttitle="RF - B&S Signals", overlay=true)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Functions
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Range Size Function
rng_size(x, qty, n)=> 
//    AC       = Cond_EMA(abs(x - x[1]), 1, n)
    wper      = (n*2) - 1
    avrng     = ema(abs(x - x[1]), n)
    AC = ema(avrng, wper)*qty
    rng_size = AC

//Range Filter Function
rng_filt(x, rng_, n)=>
    r          = rng_
    var rfilt  = array.new_float(2, x)
    array.set(rfilt, 1, array.get(rfilt, 0))
    if x - r > array.get(rfilt, 1)
        array.set(rfilt, 0, x - r)
    if x + r < array.get(rfilt, 1)
        array.set(rfilt, 0, x + r)
    rng_filt1 = array.get(rfilt, 0)
    
    hi_band   = rng_filt1 + r
    lo_band   = rng_filt1 - r
    rng_filt  = rng_filt1
    [hi_band, lo_band, rng_filt]
 
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Inputs
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Range Source
rng_src = input(defval=close, type=input.source, title="Swing Source")

//Range Period
rng_per = input(defval=20, minval=1, title="Swing Period")

//Range Size Inputs
rng_qty   = input(defval=3.5, minval=0.0000001, title="Swing Multiplier")

//Bar Colors
use_barcolor = input(defval=false, type=input.bool, title="Bar Colors On/Off")

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Definitions
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Range Filter Values
[h_band, l_band, filt] = rng_filt(rng_src, rng_size(rng_src, rng_qty, rng_per), rng_per)

//Direction Conditions
var fdir = 0.0
fdir    := filt > filt[1] ? 1 : filt < filt[1] ? -1 : fdir
upward   = fdir==1 ? 1 : 0
downward = fdir==-1 ? 1 : 0

//Trading Condition
longCond = rng_src > filt and rng_src > rng_src[1] and upward > 0 or rng_src > filt and rng_src < rng_src[1] and upward > 0 
shortCond = rng_src < filt and rng_src < rng_src[1] and downward > 0 or rng_src < filt and rng_src > rng_src[1] and downward > 0

CondIni = 0
CondIni := longCond ? 1 : shortCond ? -1 : CondIni[1]
longCondition = longCond and CondIni[1] == -1
shortCondition = shortCond and CondIni[1] == 1

//Colors
filt_color = upward ? #05ff9b : downward ? #ff0583 : #cccccc
bar_color  = upward and (rng_src > filt) ? (rng_src > rng_src[1] ? #05ff9b : #00b36b) :
             downward and (rng_src < filt) ? (rng_src < rng_src[1] ? #ff0583 : #b8005d) : #cccccc

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Outputs
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

//Filter Plot
filt_plot = plot(filt, color=filt_color, transp=67, linewidth=3, title="Filter")

//Band Plots
h_band_plot = plot(h_band, color=color.new(#05ff9b, 100), title="High Band")
l_band_plot = plot(l_band, color=color.new(#ff0583, 100), title="Low Band")

//Band Fills
fill(h_band_plot, filt_plot, color=color.new(#00b36b, 92), title="High Band Fill")
fill(l_band_plot, filt_plot, color=color.new(#b8005d, 92), title="Low Band Fill")

//Bar Color
barcolor(use_barcolor ? bar_color : na)

//Plot Buy and Sell Labels
plotshape(longCondition, title = "Buy Signal", text ="BUY", textcolor = color.white, style=shape.labelup, size = size.normal, location=location.belowbar, color = color.new(color.green, 0))
plotshape(shortCondition, title = "Sell Signal", text ="SELL", textcolor = color.white, style=shape.labeldown, size = size.normal, location=location.abovebar, color = color.new(color.red, 0))

//Alerts
alertcondition(longCondition, title="Buy Alert", message = "BUY")
alertcondition(shortCondition, title="Sell Alert", message = "SELL")


// extend
fastEmaPeriod = input(50, "fastEmaPeriod")
slowEmaPeriod = input(200, "slowEmaPeriod")
loss = input(30, "loss")
trailPoints = input(30, "trailPoints")
trailOffset = input(30, "trailOffset")
amount = input(1, "amount")

emaFast = ta.ema(close, fastEmaPeriod)
emaSlow = ta.ema(close, slowEmaPeriod)

buyCondition = longCondition and emaFast > emaSlow and close > open and close > emaFast
sellCondition = shortCondition and emaFast < emaSlow and close < open and close < emaFast

if buyCondition and strategy.position_size == 0
    strategy.entry("long", strategy.long, amount)
    strategy.exit("exit_long", "long", amount, loss=loss, trail_points=trailPoints, trail_offset=trailOffset)
if sellCondition and strategy.position_size == 0
    strategy.entry("short", strategy.short, amount)
    strategy.exit("exit_short", "short", amount, loss=loss, trail_points=trailPoints, trail_offset=trailOffset)
```

> Detail

https://www.fmz.com/strategy/385745

> Last Modified

2022-10-10 08:57:09
