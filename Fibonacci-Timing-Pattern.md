
> Name

Fibonacci-Timing-Pattern

> Author

Zer3192





> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Sofien-Kaabar

//@version = 5
indicator("Fibonacci Timing Pattern", overlay = true)

// FB Buy Setup
FB_Buy = close < close[3] and close < close[5] and
         close[1] < close[4] and close[1] < close[6] and
         close[2] < close[5] and close[2] < close[7] and
         close[3] < close[6] and close[3] < close[8] and
         close[4] < close[7] and close[4] < close[9] and
         close[5] < close[8] and close[5] < close[10] and
         close[6] < close[9] and close[6] < close[11] and
         close[7] < close[10] and close[7] < close[12] and
         close[8] > close[11]

if FB_Buy == true and FB_Buy[1] == true
    FB_Buy == false

// FB Sell Setup
FB_Sell = close > close[3] and close > close[5] and
          close[1] > close[4] and close[1] > close[6] and
          close[2] > close[5] and close[2] > close[7] and
          close[3] > close[6] and close[3] > close[8] and
          close[4] > close[7] and close[4] > close[9] and
          close[5] > close[8] and close[5] > close[10] and
          close[6] > close[9] and close[6] > close[11] and
          close[7] > close[10] and close[7] > close[12] and
          close[8] < close[11]

if FB_Sell == true and FB_Sell[1] == true
    FB_Sell == false
    
plotshape(FB_Buy,  style = shape.triangleup, color = color.green, location =  location.belowbar, size = size.small)
plotshape(FB_Sell,  style = shape.triangledown, color = color.red, location =  location.abovebar, size = size.small)
if FB_Buy
   strategy.entry("buy", strategy.long)
else if  FB_Sell
    strategy.entry("sell", strategy.short)


```

> Detail

https://www.fmz.com/strategy/366966

> Last Modified

2022-05-31 21:25:21
