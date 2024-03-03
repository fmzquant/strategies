
> Name

Peak-detector

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|c: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|100|len|
|v_input_3|2|Deviation|
|v_input_4|5| % low|
|v_input_5|5| % high|


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
study(title = "Peak detector", overlay = true)


c = input(close)
len = input(100, minval=1),off= 0,dev= input(2, "Deviation")
lreg = linreg(c, len, off), lreg_x =linreg(c, len, off+1)
b = bar_index, s = lreg - lreg_x,intr = lreg - b*s
dS = 0.0
for i=0 to len-1
    dS:= dS + pow(c[i]-(s*(b-i)+intr), 2)  
de = sqrt(dS/(len))
up = (-de*dev) + lreg
down= (de*dev) + lreg 


sl = 0.0
sl1 = 0.0
sl := input(5, " % low", type=input.float)
sl1:= input(5, " % high", type=input.float)

long_sl = crossunder(low, (1 - sl / 100) * up) 
short_sl =crossover(high, (1 + sl1 / 100) * down) 


plotshape(long_sl , title="Low", text="Low", color=color.green, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.white, transp=0)  //plot for buy icon
plotshape(short_sl, title="High", text="High", color=color.red, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.white, transp=0)  //plot for sell icon

/////////////// Alerts /////////////// 
alertcondition(long_sl, title='High Peak', message='High Signal')
alertcondition(short_sl, title='Low Peak', message='Low Signal')
if long_sl
   strategy.entry("buy", strategy.long)
else if  short_sl
    strategy.entry("sell", strategy.short)


```

> Detail

https://www.fmz.com/strategy/366404

> Last Modified

2022-05-29 09:32:08
