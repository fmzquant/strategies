
> Name

Brick-count-Renko

> Author

Zer3192

> Strategy Description

砖形指标



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

//@version=4
study("Renko count", overlay=false) 


counter_green = iff(close > open, 1, 0)
counter_red = iff(close > open, 0, 1)

size = iff(bar_index>39, 40, bar_index+1)
// function to create a rolling sum and return an integer value using series and series objects

pine_sum(x, y) =>
    sum = 0.0
    for i = 0 to y - 1
        sum := sum + x[i]

brick_red = pine_sum(counter_red, size)
brick_green = pine_sum(counter_green, size)
if cross(brick_red, brick_green)
    label.new(bar_index, brick_red, style = label.style_arrowdown, size = size.normal, xloc =xloc.bar_index, color = color.green)

plot(brick_red, color = color.red)
plot(brick_green, color = color.green)
if brick_red
   strategy.entry("buy", strategy.long)
else if brick_green
    strategy.entry("sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/368734

> Last Modified

2022-06-12 16:39:56
