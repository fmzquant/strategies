
> Name

RSI-by-zdmre

> Author

ChaoZhang

> Strategy Description

Traditional interpretations and usage of the RSI dictate that values of 70 or above suggest that a security becomes overbought or overvalued and may be primed for a trend reversal or corrective price pullback. An RSI reading of 30 or below indicates an oversold or undervalued condition.

30 = Oversold
70 = Overbought

Thanks @DieGobelMonte for your suggestion.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/10d58845636280dcd8d.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|Length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-12 00:00:00
end: 2022-05-11 23:59:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © zdmre

//@version=5
indicator("RSI by zdmre", overlay=false)

len = input.int(14, minval=1, title='Length')
src = input(close, 'Source')
up = ta.rma(math.max(ta.change(src), 0), len)
down = ta.rma(-math.min(ta.change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - 100 / (1 + up / down)
plot(rsi, 'RSI', color=color.new(#7E57C2, 0))
band1 = hline(70, "Upper Band", color=#787B86)
bandm = hline(50, "Middle Band", color=color.new(#787B86, 50))
band0 = hline(30, "Lower Band", color=#787B86)
fill(band1, band0, color=color.rgb(126, 87, 194, 90), title="Background")

ob= ta.cross(rsi, 70) == 1 and rsi >= 70
os = ta.cross(rsi, 30) == 1 and rsi <= 30

plot(ob ? rsi : na ,title='Overbought', style=plot.style_circles, color=color.new(color.red, 0), linewidth=5)
plot(os ? rsi : na ,title='Oversold ', style=plot.style_circles, color=color.new(color.green, 0), linewidth=5)

if ob
    strategy.entry("Enter Long", strategy.long)
else if os
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362898

> Last Modified

2022-05-13 16:47:24
