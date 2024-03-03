
> Name

Consolidation-Zones-Live

> Author

ChaoZhang

> Strategy Description

This is the script that finds Consolidation Zones in Realtime.

How it works?
- The script finds highest/lowest bars by using "Loopback Period"
- Then it calculates direction
- By using the direction and highest/lowest bar info it calculates consolidation zones in realtime
- If the length of consolidation area is equal/greater than user-defined min length then this area is shown as consolidation zone
- Then Consolidation Zone extends automatically if there is no breakout

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/3109331121cb872000.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Loopback Period|
|v_input_2|5|Min Consolidation Length|
|v_input_3|true|Paint Consolidation Area |
|v_input_4|blue|Zone Color|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-23 00:00:00
end: 2022-05-22 23:59:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © LonesomeTheBlue

//@version=4
study("Consolidation Zones - Live", overlay = true, max_bars_back = 1100)
prd = input(defval = 10, title="Loopback Period", minval = 2, maxval = 50)
conslen = input(defval = 5, title="Min Consolidation Length", minval = 2, maxval = 20)
paintcons = input(defval = true, title = "Paint Consolidation Area ")
zonecol = input(defval = color.new(color.blue, 70), title = "Zone Color")

float hb_ = highestbars(prd) == 0 ? high : na
float lb_ = lowestbars(prd) == 0 ? low : na
var int dir = 0
float zz = na
float pp = na

dir := iff(hb_ and na(lb_), 1, iff(lb_ and na(hb_), -1, dir))
if hb_ and lb_
    if dir == 1
        zz := hb_
    else
        zz := lb_
else
    zz := iff(hb_, hb_, iff(lb_, lb_, na))

for x = 0 to 1000
    if na(close) or dir != dir[x]
        break
    if zz[x]
        if na(pp)
            pp := zz[x]
        else
            if dir[x] == 1 and zz[x] > pp
                pp := zz[x]
            if dir[x] == -1 and zz[x] < pp
                pp := zz[x]

var int conscnt = 0
var float condhigh = na
var float condlow = na
float H_ = highest(conslen)
float L_ = lowest(conslen)
var line upline = na
var line dnline = na
bool breakoutup = false
bool breakoutdown = false

if change(pp)
    if conscnt > conslen
        if pp > condhigh
            breakoutup := true
        if pp < condlow
            breakoutdown := true
    if conscnt > 0 and pp <= condhigh and pp >= condlow
        conscnt := conscnt + 1
    else
        conscnt := 0
else
    conscnt := conscnt + 1

if conscnt >= conslen
    if conscnt == conslen
        condhigh := H_
        condlow  := L_
    else
        // line.delete(upline)
        // line.delete(dnline)
        condhigh := max(condhigh, high)
        condlow := min(condlow, low)
    
    // upline := line.new(bar_index, condhigh, bar_index - conscnt, condhigh, color = color.red, style = line.style_dashed)
    // dnline := line.new(bar_index, condlow , bar_index - conscnt, condlow, color = color.lime, style = line.style_dashed)

fill(plot(condhigh, color = na, style = plot.style_stepline),
   plot(condlow, color = na, style = plot.style_stepline),
   color = paintcons and conscnt > conslen ? zonecol : color.new(color.white, 100))

alertcondition(breakoutup, title='Breakout Up', message='Breakout Up')
alertcondition(breakoutdown, title='Breakout Down', message='Breakout Down')

if breakoutup
    strategy.entry("Enter Long", strategy.long)
else if breakoutdown
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/365320

> Last Modified

2022-05-24 11:43:02
