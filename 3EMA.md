
> Name

3EMA

> Author

ChaoZhang

> Strategy Description

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/106b24ced36e0a7aa2c.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|短期均线|
|v_input_int_2|50|中期均线|
|v_input_int_3|100|长期均线|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-03 00:00:00
end: 2022-05-09 23:59:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
indicator("3EMA ", overlay=true)

short = input.int(20, "短期均线")
mid = input.int(50, "中期均线")
long = input.int(100, "长期均线")

short_ma = ta.ema(close, short)
mid_ma = ta.ema(close, mid)
long_ma = ta.ema(close, long)

long_condition = (short_ma > mid_ma) and (mid_ma > long_ma) and (ta.rising(mid_ma, 2))

IN_LONG_AREA = long_condition and (close > mid_ma) and (close <= short_ma)

short_condition = (short_ma < mid_ma) and (mid_ma < long_ma) and (ta.falling(mid_ma, 2))

IN_SHORT_AREA = short_condition and (close <= mid_ma) and (close > short_ma)

if IN_LONG_AREA
    alert("Long " +timeframe.period+" "+ syminfo.basecurrency)
else if IN_SHORT_AREA
    alert("Short " +timeframe.period+" "+ syminfo.basecurrency)

p3 = plot(long_ma, color=color.red, linewidth=1, title='LONG EMA')
p2 = plot(mid_ma, color=color.orange, linewidth=1, title='MID EMA')
p1 = plot(short_ma, color=color.green, linewidth=1, title='SHORT EMA')


fill(p1, p2, color=long_condition?color.new(color.green, 65):color.new(color.white, 100))
fill(p1, p2, color=short_condition?color.new(color.red, 65):color.new(color.white, 100))


bgcolor(IN_LONG_AREA ? color.new(color.green, 90) : na)
bgcolor(IN_SHORT_AREA ? color.new(color.red, 90) : na)


if IN_LONG_AREA
    strategy.entry("Enter Long", strategy.long)
else if IN_SHORT_AREA
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362572

> Last Modified

2022-05-12 01:35:20
