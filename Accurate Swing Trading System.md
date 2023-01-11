
> 策略名称

Accurate Swing Trading System

> 策略作者

Zer3192



> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_1|3|Swing|
|v_input_2|true|Barcolor|
|v_input_3|false|Bgcolor|


> 源码 (PineScript)

``` javascript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ceyhun

//@version=4
study("Accurate Swing Trading System",overlay=true)

no=input(3,title="Swing")
Barcolor=input(true,title="Barcolor")
Bgcolor=input(false,title="Bgcolor")

res=highest(high,no)
sup=lowest(low,no)
avd=iff(close>res[1],1,iff(close<sup[1],-1,0))
avn=valuewhen(avd!=0,avd,0)
tsl=iff(avn==1,sup,res)

Buy=crossover(close,tsl)
Sell=crossunder(close,tsl)

plotshape(Buy,"BUY", shape.labelup, location.belowbar, color.green, text="BUY",textcolor=color.black)
plotshape(Sell,"SELL", shape.labeldown, location.abovebar, color.red, text="SELL",textcolor=color.black)

colr = close>=tsl ? color.green : close<=tsl ? color.red : na
plot(tsl, color=colr, linewidth=3, title="TSL")
barcolor(Barcolor ? colr : na)
bgcolor(Bgcolor ? colr :na)

alertcondition(Buy, title="Buy Signal", message="Buy")
alertcondition(Sell, title="Sell Signal", message="Sell")
if Buy
   strategy.entry("long", strategy.long)
else if Sell
    strategy.entry("short", strategy.short)
```

> 策略出处

https://www.fmz.com/strategy/367565

> 更新时间

2022-06-04 07:05:48
