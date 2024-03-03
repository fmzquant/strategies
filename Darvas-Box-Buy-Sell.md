
> Name

Darvas-Box-Buy-Sell

> Author

ChaoZhang

> Strategy Description



**backtest**
 ![IMG](https://www.fmz.com/upload/asset/10e8695aa04c6866260.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-30 00:00:00
end: 2022-05-29 23:59:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ceyhun

//@version=4

study("Darvas Box Buy Sell", overlay=true)

boxp = input(defval=5, title="Length", minval=1, maxval=500)

LL = lowest(low, boxp)
k1 = highest(high, boxp)
k2 = highest(high, boxp - 1)
k3 = highest(high, boxp - 2)

NH = valuewhen(high > k1[1], high, 0)
box1 = k3 < k2
TopBox = valuewhen(barssince(high > k1[1]) == boxp - 2 and box1, NH, 0)
BottomBox = valuewhen(barssince(high > k1[1]) == boxp - 2 and box1, LL, 0)

plot(TopBox, linewidth=2, color=#4CAF50, title="TBbox")
plot(BottomBox, linewidth=2, color=#FF0000, title="BBbox")

Buy = crossover(close, TopBox)
Sell = crossunder(close, BottomBox)

alertcondition(Buy, title="Buy Signal", message="Buy")
alertcondition(Sell, title="Sell Signal", message="Sell")

plotshape(Buy, style=shape.labelup, location=location.belowbar, color=#4CAF50, size=size.tiny, title="Buy Signal", text="Buy", textcolor=color.black)
plotshape(Sell, style=shape.labeldown, location=location.abovebar, color=#FF0000, size=size.tiny, title="Sell Signal", text="Sell", textcolor=color.white)


if Buy
    strategy.entry("Enter Long", strategy.long)
else if Sell
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/366948

> Last Modified

2022-05-31 19:31:56
