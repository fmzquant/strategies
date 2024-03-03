
> Name

Bollinger-lows

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|30|len5|
|v_input_2_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|2|Multiplier|
|v_input_4|20|len|
|v_input_5|20| Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RafaelZioni

//@version=4

study(title="Bollinger lows", overlay=true)

len5 = input(30)

src=input(close)

//
multi = input(2, title="Multiplier", minval=0.001, maxval=2) 

mean = ema(src, len5)  
stddev = multi * stdev(src, len5)  
b = mean + stddev
s = mean - stddev


var bool long = na
var bool short = na

long :=crossover(src, s) 
short :=  crossunder(src, b)

var float last_open_long = na
var float last_open_short = na

last_open_long := long ? close : nz(last_open_long[1])
last_open_short := short ? close : nz(last_open_short[1])


entry_value =last_open_long
entry_value1=last_open_short

r=100
//
highb = highest(entry_value1, r)  
lowb = lowest(entry_value, r)  

//

hilow = ((high - low)*100)
openclose = ((close - open)*100)
vol = (src / hilow)
spreadvol = (openclose * src)
VPT = spreadvol + cum(spreadvol)
window_len = 28

v_len = 14
price_spread = stdev(high-low, window_len)

vp =  spreadvol + cum(spreadvol)
smooth = sma(vp, v_len)
v_spread = stdev(vp - smooth, window_len)
shadow = (vp - smooth) / v_spread * price_spread

out = shadow > 0 ? high + shadow : low + shadow
//

len = input(20)



yp=ema(out,len)

// INPUTS //
mult   =1
period = input(20, title = ' Period',     minval = 1)

// CALCULATIONS //
up= yp - (mult * atr(period))
dn = yp + (mult * atr(period))
c5=close
//

factor =0.001

hb = 0.00 ,hb := nz(hb[1])
hl = 0.000, hl := nz(hl[1])

lb = 0.00 ,lb := nz(lb[1])
l1 = 0.000,l1 := nz(l1[1])

c = 0
c := nz(c[1]) + 1

trend = 0,trend := nz(trend[1]),n = dn,x =up


if barstate.isfirst
    c := 0
    lb := n
    hb := x                      
    l1 := c5  
    hl := c5
    hl
if c == 1
    if x >= hb[1]
        hb := x
        hl := c5
        trend := 1  
        trend
    else
        lb := n
        l1 := c5 
        trend := -1 
        trend

if c > 1

    if trend[1] > 0  
        hl := max(hl[1], c5)
        if x >= hb[1] 
            hb := x
            hb
        else

            
            if n < hb[1] - hb[1] * factor 
                lb := n
                l1 := c5

                trend := -1  
                trend
    else

       
        l1 := min(l1[1], c5 )

        if n <= lb[1] 
            lb := n 
            lb
        else

           
            if x > lb[1] + lb[1] * factor
                hb := x 
                hl := c5

                trend := 1  
                trend



v = trend == 1 ? hb : trend == -1 ? lb : na
plot(v, color=trend == 1 ? color.blue : color.yellow, style=plot.style_circles, linewidth=1, title="trend", transp=0, join=true)
// Plotting
plot(v, color = trend == 1 ? color.green : color.red , style = plot.style_line, linewidth = 2, title = "SuperTrend")
low1 = crossover(v, lowb) 
high1 = crossunder(v, highb) 
showcross=true
plotshape( showcross and low1 , title="low", text="Low Bollinger", color=color.red, style=shape.labelup, location=location.belowbar, size=size.tiny, textcolor=color.white, transp=0)  
//plotshape(showcross and high1, title="high", text="H", color=color.green, style=shape.labeldown, location=location.abovebar, size=size.tiny, textcolor=color.white, transp=0)  
if low1
   strategy.entry("Alert on Bottom", strategy.long)
else if high1
    strategy.entry("Alert on Top", strategy.short)
```

> Detail

https://www.fmz.com/strategy/366388

> Last Modified

2022-05-29 07:22:43
