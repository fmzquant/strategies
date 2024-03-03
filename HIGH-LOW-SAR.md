
> Name

HIGH-LOW-SAR

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|trend|
|v_input_2_close|0|src5: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|0.02|start|
|v_input_4|0.02|increment|
|v_input_5|0.2|maximum|
|v_input_6|50|lookBack|
|v_input_7|2.2|Multiplier|


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
study("HIGH LOW SAR ", overlay=true)

len = 100

p1 =close

p2 = close[100] 
sma = sma(p1, len)
sma1 = sma(p2, len)
avg = atr(len)
fibratio1 = 1.618
fibratio3 = 4.236
r1 = avg * fibratio1
r3 = avg * fibratio3
top3 = sma + r3
bott1 = sma - r1
top2 = sma1 + r3
bott2 = sma1 - r1
plot(top2, title="high", color=color.red, style=plot.style_linebr, linewidth=3, transp=40, trackprice=true, offset=-9999)
plot(bott2, title="low", color=color.blue, style=plot.style_linebr, linewidth=3, transp=40, trackprice=true, offset=-9999)

plot(top3, title="high1", color=color.red, style=plot.style_linebr, linewidth=3, transp=40, trackprice=true, offset=-9999)
plot(bott1, title="low1", color=color.blue, style=plot.style_linebr, linewidth=3, transp=40, trackprice=true, offset=-9999)
//
trend = input(false)
if barstate.islast and trend  == true
    line z = line.new(bar_index[1],top3[1], bar_index,top3,extend=extend.both,color=color.red,style=line.style_dashed,width=1)
    line f = line.new(bar_index[1],top2[1], bar_index,top2,extend=extend.both,color=color.blue,style=line.style_dashed,width=1)
    line w = line.new(bar_index[1],bott1[1], bar_index,bott1,extend=extend.both,color=color.green,style=line.style_dashed,width=1)
    line h= line.new(bar_index[1],bott2[1], bar_index,bott2,extend=extend.both,color=color.green,style=line.style_dashed,width=1)
    line.delete(z[1])
    line.delete(f[1])
    line.delete(w[1])
    line.delete(h[1])
//
src5 = input(close)
    

len5 = 100

ma = ema(src5*volume, len5) / ema(volume, len5)



src1 = ma

p(src1, len5) =>
    n = 0.0
    s = 0.0
    for i = 0 to len5 - 1
        w = (len5 - i) * len5
        n := n + w
        s := s + src5[i] * w
    s / n

hm = 2.0 * p(src1, floor(len5 / 2)) - p(src1, len5)
vhma = p(hm, floor(sqrt(len5)))
lineColor = vhma > vhma[1] ? color.lime : color.red
plot(vhma, title="VHMA", color=lineColor ,linewidth=3)
hColor = true,vis = true
hu = hColor ? (vhma > vhma[2] ? #00ff00 : #ff0000) : #ff9800

vl = vhma[0]
ll = vhma[1]
m1 = plot(vl, color=hu, linewidth=1, transp=60)
m2 = plot(vis ? ll : na,  color=hu, linewidth=2, transp=80)

fill(m1, m2,  color=hu, transp=70)
//
start = input(0.02) 
increment = input(0.02)  
maximum = input(0.2)
s1 = sar(start, increment, maximum)
pc = close < s1 ? color.red : color.green
plot(s1, style=plot.style_cross, color=pc)
//


lookBack =input(50)
//
multi = input(2.2, title="Multiplier", minval=0.001, maxval=10) 

mean = ema(s1 ,lookBack)  
stddev = multi * stdev(s1, lookBack)  
b = mean + stddev
s2 = mean - stddev

low1 = crossover(s1[1], s2)  and s1<bott1 
high1 = crossunder(s1[1], b) and s1>top2 and vhma < vhma[2]

plotshape(low1, title="L", text="L", color=color.green, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.white, transp=0)  //plot for buy icon
plotshape(high1, title="H", text="H", color=color.red, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.white, transp=0)  //plot for sell icon
//
/////////////// Alerts /////////////// 
alertcondition(low1, title='low', message='SAR LOW')
alertcondition(high1, title='high', message='SAR HIGH')
if low1
   strategy.entry("buy", strategy.long)
else if  high1
    strategy.entry("sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/366415

> Last Modified

2022-05-29 10:33:10
