
> 策略名称

Directional Movement Oscillator (DMI)

> 策略作者

Zer3192



> 策略参数



|参数|默认值|描述|
|----|----|----|
|v_input_1|10|DI Length|
|v_input_2|8|DI Smoothing Length|


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
// © prince_ond

//@version=4
study("Directional Movement Oscillator", shorttitle="DMI_oscilattor")

// === INPUTS ===

len = input(10, title="DI Length")
avlength=input(8, title="DI Smoothing Length")
up = change(high)
down = -change(low)
truerange = rma(tr, len)
plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, len) / truerange)
minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, len) / truerange)
diosc = plus-minus
signal= sma(diosc,avlength)

p1 = plot(diosc, linewidth=1, color=color.red, title="DIOSC", transp=100)
p2 = plot(signal, linewidth=2, color=color.blue, title="Signal")
p3 = plot(0, color=color.black)

plot(diosc, color = diosc <= 0 ? color.red : color.green, style=plot.style_columns, transp=20)
fill(p2, p3, color= signal > 0 ? color.green  : color.red, transp=30, title='DMI_signal')
if diosc
   strategy.entry("buy", strategy.long)
else if p2
    strategy.entry("sell", strategy.short)  

```

> 策略出处

https://www.fmz.com/strategy/369999

> 更新时间

2022-06-20 21:26:14
