
> Name

Low-finder

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|length|
|v_input_2|false|Highdetector|


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
study(title = "Low finder ", overlay = true)
length=input(21)
//
p = close
vrsi = rsi(p, length)
pp=ema(vrsi,length)
d=(vrsi-pp)*5
cc=(vrsi+d+pp)/2
//
low1=crossover(cc,0)
plotshape(low1 , title="Low", text="Low", color=color.green, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.white, transp=0) 
/////// Alerts /////
alertcondition(low1,title="Low detected")
//
bb=(vrsi-d+pp)/2
//
Highdetector=input(false)
high1=crossunder(bb,90)
plotshape(Highdetector and high1, title="High", text="High", color=color.red, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.white, transp=0)
/////// Alerts /////
alertcondition(high1,title="High detected")
if low1
   strategy.entry("buy", strategy.long)
else if  high1
    strategy.entry("sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/366391

> Last Modified

2022-05-29 07:41:54
