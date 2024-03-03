
> Name

标准上涨五浪下跌五浪策略

> Author

Zer3192





> Source (PineScript)

``` pinescript
//@version=4
// 标准上涨五浪下跌五浪策略
// 顶1
s1 = lowest(low, 5)
// 底1
b1 = highest(high, 5)
// 顶2
s2 = lowest(low[1], 5)
// 底2
b2 = highest(high[1], 5)
// 顶3
s3 = lowest(low[2], 5)
// 底3
b3 = highest(high[2], 5)
// 顶4
s4 = lowest(low[3], 5)
// 底4
b4 = highest(high[3], 5)
// 顶5
s5 = lowest(low[4], 5)
// 底5
b5 = highest(high[4], 5)

// 上涨五浪
up_waves = (b1 > b2) and (b2 > b3) and (b3 > b4) and (b4 > b5)
// 下跌五浪
down_waves = (s1 < s2) and (s2 < s3) and (s3 < s4) and (s4 < s5)

// 交易条件
if (up_waves)
    strategy.entry("long", strategy.long, 1, stop = low[4], comment = "long")

else if (down_waves)
    strategy.entry("short", strategy.short, 1, stop = high[4], comment = "short")

// 绘图
plotshape(up_waves, style = shape.triangleup, location = location.belowbar, color=green, title="上涨五浪")
plotshape(down_waves, style = shape.triangledown, location = location.abovebar, color=red, title="下跌五浪")

```

> Detail

https://www.fmz.com/strategy/395584

> Last Modified

2023-01-03 21:31:11
