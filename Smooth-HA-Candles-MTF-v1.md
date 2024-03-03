
> Name

Smooth-HA-Candles-MTF-v1

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|D|TF|
|v_input_2|0|MA Type: AVG|TTEMA|TEMA|DEMA|EMA|TDEMA|THMA|ZLEMA|ZLDEMA|ZLTEMA|DZLEMA|TZLEMA|LLEMA|NMA|
|v_input_3|true|Show MA 1?|
|v_input_4|25|MA Length 1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
//@version=4
study("Smooth HA Candles MTF v1",overlay=true)

higherTf = input("D", "TF", type = input.resolution)

data =close
data1=open
data2=low
data3=high

ec1ft = security(syminfo.tickerid, higherTf, data[1], gaps = barmerge.gaps_off,  lookahead = barmerge.lookahead_on) 
ec1ft1 = security(syminfo.tickerid, higherTf, data1[1], gaps = barmerge.gaps_off,  lookahead = barmerge.lookahead_on) 
ec1ft2 = security(syminfo.tickerid, higherTf, data2[1], gaps = barmerge.gaps_off,  lookahead = barmerge.lookahead_on)
ec1ft3 = security(syminfo.tickerid, higherTf, data3[1], gaps = barmerge.gaps_off,  lookahead = barmerge.lookahead_on)
//
//Heiken Ashi

o = security(heikinashi(syminfo.tickerid), higherTf, ec1ft1)
c = security(heikinashi(syminfo.tickerid), higherTf, ec1ft)
l = security(heikinashi(syminfo.tickerid), higherTf, ec1ft2)
h = security(heikinashi(syminfo.tickerid), higherTf, ec1ft3)
//plotcandle(o, h, l, c, color=o < c ? color.lime : color.red)

//
src = close

type = input(defval="AVG", title="MA Type", options=["TDEMA", "TTEMA", "TEMA", "DEMA", "EMA", "AVG", "THMA", "ZLEMA", "ZLDEMA", "ZLTEMA", "DZLEMA", "TZLEMA", "LLEMA", "NMA"])
showma = input(true, title="Show MA 1?")
len = input(25, title="MA Length 1")
showma1 = false
len1 = 26
showma2 = false
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

l1=showma ? myma(l, len) : na
h1=showma ? myma(h, len) : na
o1 = showma ? myma(o, len) : na
c1 = showma ? myma(c, len) : na

plotcandle(o1, h1, l1, c1, color=o1 < c1 ? color.green : color.red)
//

//
plotshape(crossover ( c1,o1) and c1>o1, "up arrow", shape.triangleup, location.belowbar, color.green,size=size.small)
plotshape(crossunder ( c1,o1) and c1<o1, "down arrow", shape.triangledown, location.abovebar, color.red,size=size.small)
buySignal = crossover ( c1,o1) and c1>o1
sellSignal= crossunder ( c1,o1) and c1<o1
if buySignal
    strategy.entry("buy", strategy.long)
else if sellSignal
    strategy.entry("sell", strategy.short) 
```

> Detail

https://www.fmz.com/strategy/370728

> Last Modified

2022-06-25 18:08:44
