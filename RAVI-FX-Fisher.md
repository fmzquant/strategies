
> Name

RAVI-FX-Fisher

> Author

ChaoZhang



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|(?Basic Settings)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|4|Fast MA Length|
|v_input_int_2|49|Slow MA Length|
|v_input_float_1|0.07|Trigger|
|v_input_bool_1|false|(?UI Options)Color bars?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-06-15 00:00:00
end: 2022-06-14 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © loxx

//@version=5
indicator("RAVI FX Fisher [Loxx]", shorttitle="RAVIFXF [Loxx]", timeframe="", overlay = false, timeframe_gaps=true, max_bars_back = 3000)

greencolor = #2DD204  
redcolor = #D2042D 

src = input.source(close, "Source", group = "Basic Settings")
maf = input.int(4, "Fast MA Length", minval = 1, group = "Basic Settings")
mas = input.int(49, "Slow MA Length", minval = 1, group = "Basic Settings")
trigger = input.float(0.07, "Trigger", minval = 0, group = "Basic Settings")

colorbars = input.bool(false, "Color bars?", group = "UI Options")

maval = (ta.wma(src, maf) - ta.wma(src, mas)) * ta.atr(maf) / ta.wma(src, mas) / ta.atr(mas)
maval := 100 * maval
fish = (math.exp(2 * maval) - 1) / (math.exp(2 * maval) + 1)

plot(fish,color = fish >=0 ? greencolor : redcolor, style = plot.style_histogram, linewidth = 2)

plot(trigger, color = color.white, linewidth = 1 )
plot(-trigger, color = color.white, linewidth = 1 )

barcolor(colorbars ? fish >=0 ? greencolor : redcolor : na)

if fish >=0
    strategy.entry("Enter Long", strategy.long)
else
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/369392

> Last Modified

2022-06-16 15:15:28
