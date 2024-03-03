
> Name

Candle-Strength

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
// © Trade_by_DB

//@version=5
indicator("Candle Strength",overlay = true )




//round function for rounding up to n decimal places
//Thanks to Proper Round Function - QuantNomad

roundn(x, n) =>
    mult = 1
    if n != 0
        for i = 1 to math.abs(n) by 1
            mult *= 10
            mult

    n >= 0 ? math.round(x * mult) / mult : math.round(x / mult) * mult
    
//calculating strength
green = roundn(((close-low)/(high-low) *100), 2)
red = roundn(((high-close)/(high-low)*100), 2)

if (close>open)
    l = label.new(x = bar_index,y = close,text=str.tostring(green) + " %",color=color.green,textcolor = color.white,style=label.style_label_up)
    label.set_yloc(l,yloc.belowbar)
     strategy.entry("Enter Long", strategy.long)
else if (open > close)
    l2 = label.new(x = bar_index,y = close,text=str.tostring(red)+ " %",color=color.red,textcolor=color.white,style=label.style_label_down)
    label.set_yloc(l2,yloc = yloc.abovebar)
 strategy.entry("Enter Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/380219

> Last Modified

2022-08-27 12:03:45
