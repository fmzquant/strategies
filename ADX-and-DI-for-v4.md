
> Name

ADX-and-DI-for-v4

> Author

ChaoZhang

> Strategy Description

**回测**

 ![IMG](https://www.fmz.com/upload/asset/fa799e596ca8540459.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|len|
|v_input_2|20|th|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-05 00:00:00
end: 2022-05-04 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BeikabuOyaji

//@version=4


study("ADX and DI for v4")
len = input(14)
th = input(20)

TrueRange = max(max(high-low, abs(high-nz(close[1]))), abs(low-nz(close[1])))
DirectionalMovementPlus = high-nz(high[1]) > nz(low[1])-low ? max(high-nz(high[1]), 0): 0
DirectionalMovementMinus = nz(low[1])-low > high-nz(high[1]) ? max(nz(low[1])-low, 0): 0

SmoothedTrueRange = 0.0
SmoothedTrueRange := nz(SmoothedTrueRange[1]) - (nz(SmoothedTrueRange[1])/len) + TrueRange

SmoothedDirectionalMovementPlus = 0.0
SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - (nz(SmoothedDirectionalMovementPlus[1])/len) + DirectionalMovementPlus

SmoothedDirectionalMovementMinus = 0.0
SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - (nz(SmoothedDirectionalMovementMinus[1])/len) + DirectionalMovementMinus

DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = abs(DIPlus-DIMinus) / (DIPlus+DIMinus)*100
ADX = sma(DX, len)

plot(DIPlus, color=color.green, title="DI+")
plot(DIMinus, color=color.red, title="DI-")
plot(ADX, color=color.navy, title="ADX")
//hline(th, color=color.black)
if DIPlus > DIMinus
    strategy.entry("entry long", strategy.long)
else if DIPlus < DIMinus
    strategy.entry("entry short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/361554

> Last Modified

2022-05-07 16:31:36
