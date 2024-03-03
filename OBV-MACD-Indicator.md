
> Name

OBV-MACD-Indicator

> Author

ChaoZhang

> Strategy Description

So this script is my improvement to macd that we all know . it faster and more accurate with less lag
first is based on OBV as it primary source
next we convert the OBV to MA style format , in this case we can add all form of MA in order to calculate it . as you will see in settimgs it has many type of MA as each beahave differently
I make the signal to be in linear form jst to make it more sharp / and in the end in order to make the signal i use Alex grover method (this guy is a genius:) )
in final step we can make pivots point on our new for macd
end resolt is a faster more accurate MACD and much more options fro modification then the regular macd
this is volume indicator based so in some graph where volume does not exist this will not work

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/1ebc5eddbfa196529fe.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|OBV Length |
|v_input_2|0|MA Type: DEMA|TTEMA|TEMA|TDEMA|EMA|AVG|THMA|ZLEMA|ZLDEMA|ZLTEMA|DZLEMA|TZLEMA|LLEMA|NMA|
|v_input_3|9|MA Length |
|v_input_4|26|MACD Slow Length|
|v_input_5|2|len5|
|v_input_6|false|showsignal|
|v_input_7|true|Hide pivots?|
|v_input_8|50|period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-30 00:00:00
end: 2022-05-29 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

study("OBV MACD Indicator",overlay=false)
// MACD
src1 = close
window_len = 28

v_len = 14
price_spread = stdev(high-low, window_len)

v =   cum(sign(change(src1)) * volume)
smooth = sma(v, v_len)
v_spread = stdev(v - smooth, window_len)
shadow = (v - smooth) / v_spread * price_spread

out = shadow > 0 ? high + shadow : low + shadow

//plot(out, style=line,linewidth=3, color=color)
len10=input(1,title="OBV Length ")
obvema=ema(out,len10)

//
src = obvema

type = input(defval="DEMA", title="MA Type", options=["TDEMA", "TTEMA", "TEMA", "DEMA", "EMA", "AVG", "THMA", "ZLEMA", "ZLDEMA", "ZLTEMA", "DZLEMA", "TZLEMA", "LLEMA", "NMA"])
showma = true
len = input(9, title="MA Length ")
showma1 = false
len1 = 26
showma2 =false
len2 = 52

nma(src, length1, length2) =>
    lambda = length1 / length2
	alpha = lambda * (length1 - 1) / (length1 - lambda)
	ma1 = ema(src, length1)
	ma2 = ema(ma1, length2)
	nma = (1 + alpha) * ma1 - alpha * ma2
	
dema(src, len) => 
    ma1 = ema(src, len)
    ma2 = ema(ma1, len)
    2 * ma1 - ma2

tema(src, len) => 
    ma1 = ema(src, len)
    ma2 = ema(ma1, len)
    ma3 = ema(ma2, len)
    3 * (ma1 - ma2) + ma3

tdema(src, len) => 
    ma1 = dema(src, len)
    ma2 = dema(ma1, len)
    ma3 = dema(ma2, len)
    3 * (ma1 - ma2) + ma3

ttema(src, len) => 
    ma1 = tema(src, len)
    ma2 = tema(ma1, len)
    ma3 = tema(ma2, len)
    3 * (ma1 - ma2) + ma3

tnma(src, len) => 
    ma1 = nma(src, len, 3)
    ma2 = nma(ma1, len, 3)
    ma3 = nma(ma2, len, 3)
    3 * (ma1 - ma2) + ma3

hma(src, len) => wma(2*wma(src, len/2)-wma(src, len), round(sqrt(len)))

thma(src, len) => 
    ma1 = hma(src, len)
    ma2 = hma(ma1, len)
    ma3 = hma(ma2, len)
    3 * (ma1 - ma2) + ma3

zlema(src, len) =>
	lag = round((len - 1) / 2)
	zlsrc = src + (src - src[lag])
	ema(zlsrc, len)

zldema(src, len) =>
	lag = round((len - 1) / 2)
	zlsrc = src + (src - src[lag])
	dema(zlsrc, len)
	
zltema(src, len) =>
	lag = round((len - 1) / 2)
	zlsrc = src + (src - src[lag])
	tema(zlsrc, len)
	
dzlema(src, len) => 
    ma1 = zlema(src, len)
    ma2 = zlema(ma1, len)
    2 * ma1 - ma2

tzlema(src, len) => 
    ma1 = zlema(src, len)
    ma2 = zlema(ma1, len)
    ma3 = zlema(ma2, len)
    3 * (ma1 - ma2) + ma3

llema(src, len) =>
	srcnew = 0.25*src + 0.5*src[1] + 0.25*src[2]
	ema(srcnew, len)
	
lltema(src, len) =>
	srcnew = 0.25*src + 0.5*src[1] + 0.25*src[2]
	tema(srcnew, len)

myma(src, len) => 
    if type == "EMA"
        ema(src, len)
    else
        if type == "DEMA"
            dema(src, len)
        else 
            if type == "TEMA"
                tema(src, len)
            else 
                if type == "TDEMA"
                    tdema(src, len)
                else
                    if type == "TTEMA"
                        ttema(src, len)
                    else
                        if type == "THMA"
                            thma(src, len)
                        else
                            if type == "ZLEMA"
                                zlema(src, len)
                            else
                                if type == "ZLDEMA"
                                    zldema(src, len)
                                else
                                    if type == "ZLTEMA"
                                        zltema(src, len)
                                    else
                                        if type == "DZLEMA"
                                            dzlema(src, len)
                                        else
                                            if type == "TZLEMA"
                                                tzlema(src, len)
                                            else
                                                if type == "LLEMA"
                                                    llema(src, len)
                                                else
                                                    if type == "NMA"
                                                        nma(src, len, len1)
                                                    else
                                                        avg(ttema(src, len), tdema(src, len))
        
ma = showma ? myma(src, len) : na
slow_length = input(title="MACD Slow Length", type=input.integer, defval=26)
//signal_length = input(title="MACD Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
src12=close
plot(0,linewidth=3,color=color.black)
// Calculating MACD
slow_ma = ema(src12, slow_length)
macd =ma-slow_ma
//signal_length=input(9)
//signal = ema(macd, signal_length)
//plot(signal,linewidth=2)
src5 = macd
len5 = input(2)
offset = 0

calcSlope(src5, len5) =>
    sumX = 0.0
    sumY = 0.0
    sumXSqr = 0.0
    sumXY = 0.0
    for i = 1 to len5
        val = src5[len5-i]
        per = i + 1.0
        sumX := sumX + per
        sumY := sumY + val
        sumXSqr := sumXSqr + per * per
        sumXY := sumXY + val * per
        
        
    slope = (len5 * sumXY - sumX * sumY) / (len5 * sumXSqr - sumX * sumX)
    average = sumY / len5
    intercept = average - slope * sumX / len5 + slope
    [slope, average, intercept]

var float tmp = na
[s, a5, i] = calcSlope(src5, len5)

tt1=(i + s * (len5 - offset))

////script based on alex grover from https://www.tradingview.com/script/KzTi6CZP-T-Channels/
p = 1,src15=tt1
b5 = 0.,dev5 = 0.,oc = 0
n5 = cum(1) - 1
a15 = cum(abs(src15 - nz(b5[1],src15)))/n5*p
b5 := src15 > nz(b5[1],src15) + a15 ? src15 : src15 < nz(b5[1],src15) - a15 ? src15 : nz(b5[1],src15)
//----
dev5 := change(b5) ? a15 : nz(dev5[1],a15)

//----
oc := change(b5) > 0 ? 1 : change(b5) < 0 ? -1 : nz(oc[1])
//----
cs = oc == 1 ? color.blue : color.red
//change(oc)>0
plot(b5,color=cs,linewidth=4,transp=50)
//

down = change(oc)<0 
up = change(oc)>0
showsignal=input(false)
plot(showsignal and up  ?tt1 :na, style=plot.style_cross, color=color.blue, linewidth=4, transp=0,offset=-1)
plot(showsignal and down ?tt1 :na, style=plot.style_cross, color=color.red, linewidth=4, transp=0,offset=-1)

//hist = macd - signal
//barColor =hist >= 0 and hist> signal ? color.teal : hist > 0 and hist < signal ? color.lime : hist < 0 and hist < signal ? color.red : color.orange
//plot(hist, color=barColor, style=plot.style_histogram, linewidth=3)



upper = tt1
lower = tt1

// DIVS code
piv = input(true, "Hide pivots?")
shrt = false
xbars = input(50, "period", input.integer, minval=1)
hb = abs(highestbars(upper, xbars))
lb = abs(lowestbars(lower, xbars))

max = float(na)
max_upper = float(na)
min = float(na)
min_lower = float(na)
pivoth = bool(na)
pivotl = bool(na)


max := hb == 0 ? close : na(max[1]) ? close : max[1]
max_upper := hb == 0 ? upper : na(max_upper[1]) ? upper : max_upper[1]
min := lb == 0 ? close : na(min[1]) ? close : min[1]
min_lower := lb == 0 ? lower : na(min_lower[1]) ? lower : min_lower[1]


if close > max
    max := close
    max
if upper > max_upper
    max_upper := upper
    max_upper
if close < min_lower
    min_lower := lower
    min_lower
if lower < min_lower
    min_lower := lower
    min_lower


pivoth := max_upper == max_upper[2] and max_upper[2] != max_upper[3] ? true : na
pivotl := min_lower == min_lower[2] and min_lower[2] != min_lower[3] ? true : na

plotshape(piv ? na : shrt ? na : pivoth ? max_upper + 2 : na, location=location.absolute, style=shape.labeldown, color=color.red, size=size.tiny, text="Pivot", textcolor=color.white, transp=0, offset=0)
plotshape(piv ? na : shrt ? na : pivotl ? min_lower - 2 : na, location=location.absolute, style=shape.labelup, color=color.blue, size=size.tiny, text="Pivot", textcolor=color.white, transp=0, offset=0)


if pivoth
    strategy.entry("Enter Long", strategy.long)
else if pivotl
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/366938

> Last Modified

2022-05-31 18:46:37
