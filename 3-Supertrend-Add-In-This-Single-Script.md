
> Name

3-Supertrend-Add-In-This-Single-Script

> Author

ChaoZhang

> Strategy Description

1st Supertrend Level 21 1
2nd Supertrend Level 14 2 
3rd Supertrend Level 7 3

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/16364ff2277259753d7.png) 


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|ATR Length|
|v_input_float_1|true|Factor|
|v_input_2|14|ATR Length|
|v_input_float_2|2|Factor|
|v_input_3|7|ATR Length|
|v_input_float_3|3|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-03 00:00:00
end: 2022-05-09 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
indicator("Supertrend", overlay=true, timeframe="", timeframe_gaps=true)

NEW1_atrPeriod = input(21, "ATR Length")
NEW1_factor = input.float(1.0, "Factor", step = 0.01)

[supertrend_1, direction_1] = ta.supertrend(NEW1_factor, NEW1_atrPeriod)

bodyMiddle_1 = plot((open + close) / 2, display=display.none)

upTrend_1 = plot(direction_1 < 0 ? supertrend_1 : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend_1 = plot(direction_1 < 0? na : supertrend_1, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle_1, upTrend_1, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle_1, downTrend_1, color.new(color.red, 90), fillgaps=false)


NEW2_atrPeriod = input(14, "ATR Length")
NEW2_factor = input.float(2.0, "Factor", step = 0.01)

[supertrend_2, direction_2] = ta.supertrend(NEW2_factor, NEW2_atrPeriod)

bodyMiddle_2 = plot((open + close) / 2, display=display.none)
upTrend_2 = plot(direction_2 < 0 ? supertrend_2 : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend_2 = plot(direction_2 < 0? na : supertrend_2, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle_2, upTrend_2, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle_2, downTrend_2, color.new(color.red, 90), fillgaps=false)


NEW3_atrPeriod = input(7, "ATR Length")
NEW3_factor = input.float(3.0, "Factor", step = 0.01)

[supertrend_3, direction_3] = ta.supertrend(NEW3_factor, NEW3_atrPeriod)

bodyMiddle_3 = plot((open + close) / 2, display=display.none)
upTrend_3 = plot(direction_3 < 0 ? supertrend_3 : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend_3 = plot(direction_3 < 0? na : supertrend_3, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle_3, upTrend_3, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle_3, downTrend_3, color.new(color.red, 90), fillgaps=false)



if direction_1<0 and direction_2 <0 and direction_3 <0
    strategy.entry("Enter Long", strategy.long)
else if direction_1>0 and direction_2 >0 and direction_3 >0
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362457

> Last Modified

2022-05-11 17:04:21
