
> Name

移位进出策略V20Shift-Exit-Strategy-v20

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过计算移动后的进场和出场价格,在趋势行情中进行长仓交易。

## 策略原理

1. 计算上一根K线的收盘价的百分比移位价。

2. 向下移位的价位作为买入线,向上移位的价位作为卖出线。

3. 当价格触及买入线时开多仓。

4. 当价格触及卖出线时平仓。

## 策略优势

- 移动止盈止损,无需人工操作
- 可自定义移位比例,优化参数
- 仅做多,降低交易频率
- 可限定交易时间范围

## 策略风险

- 无法有效判断趋势终结点
- 存在时间滞后,可能错过快速反转

## 优化方向

- 测试不同的移位比例参数
- 优化参数的增量设定
- 结合趋势判断指标设置动态移位
- 考虑突破新高新增仓位

## 总结

该策略通过移动进出场价格设定,实现了自动跟踪止盈。参数优化和判断逻辑优化可进一步提高策略效果。但被套风险需要防范。总体而言,该策略提供了一种简单实用的趋势跟踪交易思路。

|| 

## Overview

This strategy enters and exits trades at shifted prices to follow trends. 

## How it Works

1. Calculate shifted prices based on previous close's percentage.

2. Downward shifted price is buy line, upward shifted price is sell line.

3. Enter long when price hits buy line. 

4. Exit when price hits sell line.

## Advantages  

- Auto trailing stop loss/profit take without manual intervention
- Customizable shift percentage for parameter optimization
- Long only reduces trade frequency
- Can limit trading time range

## Risks

- Unable to effectively determine trend end  
- Time lag, may miss quick reversals

## Optimization Directions

- Test different shift percentage parameters
- Optimize incremental setting of parameters 
- Incorporate dynamic shifts based on trend
- Consider pyramiding on new highs

## Conclusion

The strategy achieves auto trailing profit takes via shifted entry/exit levels. Further improvements through parameter optimization and logic enhancements can improve performance. But whipsaw risks need to be managed. Overall a simple and practical approach for trend following trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-10|Buy, src-%|
|v_input_2|false|Sell, src+%|
|v_input_3_low|0|Source for buy: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4_ohlc4|0|Source for sell: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_5|true|offset|
|v_input_6|1900|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 4d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=3
strategy(title = "Noro's ShiftEx Strategy v2.0", shorttitle = "ShiftEx 2.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
buy = input(-10.0, title = "Buy, src-%")
sell = input(0.0, title = "Sell, src+%")
buysrc = input(low, title = "Source for buy")
sellsrc = input(ohlc4, title = "Source for sell")
offset = input(true)
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Levels
bar = close > open ? 1 : close < open ? -1 : 0
mult = 1 / syminfo.mintick
lb = bar == -1 ? buysrc + ((buysrc / 100) * (buy * 1)) : buysrc + ((buysrc / 100) * (buy * 2))
levelbuy = round(lb * mult) / mult
ls = sellsrc + ((sellsrc / 100) * sell)
levelsell = round(ls * mult) / mult

//Lines
os = offset ? 1 : 0
plot(levelbuy, offset = os, linewidth = 2, color = lime, title = "Buy")
plot(levelsell, offset = os, linewidth = 2, color = blue, title = "Sell")

//Trading
if low[1] > 0
    strategy.entry("long", strategy.long, limit = levelbuy, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    strategy.entry("close", strategy.short, 0, limit = levelsell, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
```

> Detail

https://www.fmz.com/strategy/427476

> Last Modified

2023-09-21 15:21:40
