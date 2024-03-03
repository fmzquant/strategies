
> Name

白盒冰山策略Robot-White-Box-Iceberg-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于均线交易,通过设定多头和空头的三条进场线,实现多空双向开仓,属于趋势跟踪策略。当价格突破均线时,依次开仓做多做空,通过吊挂单实现分批进场。

## 策略原理

该策略主要基于均线的突破来判断趋势方向。具体来说,它通过计算开盘价、收盘价、最高价、最低价等的算术平均值,得到一个均线指标。然后根据均线上方设定多头进场线,均线下方设定空头进场线。当价格从下方突破均线时,依次触发做多订单;当价格从上方突破均线时,依次触发做空订单。

做多做空的订单数量依次递增,通过设定吊挂单实现分批开仓。比如,进场线1触发开启1手做多/空,进场线2触发增加1手持仓,进场线3再增加1手持仓。这样可以分散进场成本,降低单笔订单的风险。

该策略还设置了一个回补机制。当持仓量不为0时,会根据均线价格设置追踪止损单,如果价格重新跌破均线,则止损平仓。这可以锁定部分盈利,保护资金。

总体来说,该策略充分利用均线指标判断趋势方向,通过多级别进场线实现盈利区间的最大化,同时设置止损单控制风险,属于典型的趋势跟踪策略。

## 优势分析

该策略具有以下优势:

1. 利用均线判断趋势方向清晰可行。均线可以有效过滤市场噪音,判断主要趋势方向。

2. 多级别进场线,充分利用趋势运行区间。通过多条进场线,可以最大程度地捕捉趋势的整个运行区间,扩大盈利空间。

3. 分批开仓,降低单笔风险。分多次进场,可以分散订单的风险,降低仓位的平均持仓成本。

4. 设置回补止损机制,有效控制风险。通过回补止损单,可以在价格重新跌破均线时快速止损,避免亏损过大。

5. 策略思路清晰易懂,参数设置灵活,可针对不同市场进行优化。

## 风险分析

该策略也存在一些风险:

1. 均线发出错误信号的概率。均线判断趋势存在滞后,可能发出错误信号。

2. 趋势反转带来的亏损风险。策略以趋势为前提,一旦发生趋势反转,将产生较大亏损。

3. 进场线设定过密,增加交易频率和滑点成本。

4. 分批开仓增加仓位集中度风险。持仓量过大时,风险集中。

5. 止损点设置不合理,可能过早止损或止损点过小。

对应风险管理措施:

1. 优化均线参数,选择合适周期均线。

2. 关注重要技术指标,判断趋势反转信号,及时止损。 

3. 调整进场线设置距离,降低交易频率。

4. 优化仓位大小和比例,控制集中度风险。

5. 测试和优化止损点位,降低止损风险。

## 优化方向 

该策略可以从以下方面进行优化:

1. 测试不同均线参数和数据源,选择判断趋势效果最好的均线指标。

2. 优化多空进场线的距离间隔和仓位数比例,找到最佳参数。

3. 结合其他指标作为过滤条件,避免均线发出错误信号。比如MACD,RSI等。

4. 优化止损线位置,也可以根据ATR动态设置止损点位。

5. 增加对趋势反转的判断,设置关闭全部持仓的条件。

6. 可以根据市场不同时段,优化策略的参数。

7. 增加仓位数量的动态调整功能,根据资金使用比例确定开仓手数。

## 总结

本策略整体采用均线判断趋势方向,以趋势的运行为主要盈利来源。通过多级别进场和分批开仓,可以有效把握趋势,扩大盈利区间。同时设置止损机制来控制风险。该策略思路简单清晰,既适合初学者学习,也可以进行深入优化,是一种典型的趋势跟踪策略。

||


## Overview 

This strategy is based on moving average trading. It sets up three levels of long and short entry lines to implement bidirectional opening positions, belonging to the trend following strategy. When the price breaks through the moving average, the strategy opens long and short positions in batches by placing pending orders.

## Strategy Logic

The strategy mainly uses the breakthrough of the moving average to determine the trend direction. Specifically, it calculates the arithmetic mean of opening price, closing price, highest price, lowest price and so on to obtain a moving average indicator. Then it sets up long entry lines above the moving average and short entry lines below it. When the price breaks through the moving average from below, long orders are triggered one by one. When the price breaks through from above, short orders are triggered one by one.

The number of long and short orders increases progressively. By setting pending orders, it implements batch opening positions. For example, entry line 1 triggers opening 1 contract long/short, entry line 2 triggers adding 1 contract, and entry line 3 adds another 1 contract. This helps diversify the entry cost and reduce the risk of a single order.

The strategy also has a hedging mechanism. When the position size is not 0, it will set a trailing stop loss order based on the moving average price. If the price breaks through the moving average again, it will close the position to lock in partial profit and protect the capital.

In summary, this strategy makes full use of the moving average indicator to determine the trend direction, maximizes the profit range through multiple entry lines, and controls risks with stop loss orders. It is a typical trend following strategy.

## Advantage Analysis

The advantages of this strategy are:

1. Using moving average to determine the trend direction is clear and feasible. Moving averages can filter market noise effectively and determine the main trend direction.

2. Multiple entry lines maximize the use of trend runs. With multiple entry lines, it can capture the whole run range of the trend as much as possible and expand the profit space.

3. Opening positions in batches reduces single order risk. Entering the market in multiple times diversifies the risks of orders and reduces the average holding cost. 

4. The hedging stop loss mechanism effectively controls risks. The hedging stop loss order realizes quick stop loss when price breaks the moving average again, avoiding huge losses.

5. The strategy logic is clear and easy to understand, with flexible parameter settings that can be optimized for different markets.

## Risk Analysis

There are some risks in this strategy:

1. The probability of wrong signals from the moving average. Moving averages have lag and may give wrong signals.

2. Trend reversal risk leading to losses. The strategy assumes a trend, so trend reversals can lead to huge losses.

3. Too frequent entry lines increase trading frequency and slippage costs. 

4. Batch opening positions increases concentration risk when position size is too large.

5. Improper stop loss point settings may lead to premature stop loss or the stop loss point is too small.

Corresponding risk management measures:

1. Optimize moving average parameters and select proper periods.

2. Pay attention to key technical indicators to spot trend reversal signals and stop loss in time.

3. Adjust the distance between entry lines to decrease trading frequency. 

4. Optimize position sizing and proportion to control concentration risk.

5. Backtest and optimize stop loss points to reduce stop loss risk.

## Optimization Directions

The strategy can be optimized from the following aspects:

1. Test different moving average parameters and data sources to find the best performing moving average indicator for determining trends.

2. Optimize the interval distance and position size proportion of long and short entry lines to find the optimal parameters.

3. Add other indicators as filter conditions to avoid wrong signals from the moving average, such as MACD, RSI etc.

4. Optimize stop loss line position, or set stop loss points dynamically based on ATR. 

5. Add judgment of trend reversal to set close all positions conditions.

6. Optimize parameters for different market periods.

7. Add dynamic adjustment of position size based on account usage percentage.

## Summary

This strategy judges the trend direction mainly based on moving averages, and takes advantage of trend runs as the profit source. By using multiple entry lines and opening positions in batches, it can effectively capture trends and expand profit zones. At the same time, stop loss mechanisms are used to control risks. The strategy logic is simple and clear, suitable for beginners to learn, and also for deep optimization. It is a typical trend following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Lot|
|v_input_2|3|MA Length|
|v_input_3|0|Data: 7. OHLC4|2. High|3. Low|4. Close|5. HL2|6. HLC3|1. Open|8. OC2|9. PCMA|
|v_input_4|true|short 3|
|v_input_5|true|short 2|
|v_input_6|true|short 1|
|v_input_7|true|long 1|
|v_input_8|true|long 2|
|v_input_9|true|long 3|
|v_input_10|15|Short line 3|
|v_input_11|10|Short line 2|
|v_input_12|5|Short line 1|
|v_input_13|-5|Long line 1|
|v_input_14|-10|Long line 2|
|v_input_15|-15|Long line 3|
|v_input_16|true|Offset|
|v_input_17|1900|From Year|
|v_input_18|2100|To Year|
|v_input_19|true|From Month|
|v_input_20|12|To Month|
|v_input_21|true|From day|
|v_input_22|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=4
strategy(title = "Robot WhiteBox Iceberg", shorttitle = "Robot WhiteBox Iceberg", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 3)

//Settings
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot")
len = input(3, minval = 1, title = "MA Length")
s = input(defval = "7. OHLC4", options = ["1. Open", "2. High", "3. Low", "4. Close", "5. HL2", "6. HLC3", "7. OHLC4", "8. OC2", "9. PCMA"], title = "Data")
short3 = input(true, title = "short 3")
short2 = input(true, title = "short 2")
short1 = input(true, title = "short 1")
long1 = input(true, title = "long 1")
long2 = input(true, title = "long 2")
long3 = input(true, title = "long 3")
shortlevel3 = input(15.0, title = "Short line 3")
shortlevel2 = input(10.0, title = "Short line 2")
shortlevel1 = input(5.0, title = "Short line 1")
longlevel1 = input(-5.0, title = "Long line 1")
longlevel2 = input(-10.0, title = "Long line 2")
longlevel3 = input(-15.0, title = "Long line 3")
needoffset = input(true, title = "Offset")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Variables
lots = 0.0
size = strategy.position_size
mult = 1 / syminfo.mintick
needtime = true

//MA
oc2 = (open + close) / 2
pcma = (highest(high, len) + lowest(low, len)) / 2
src = s == "1. Open" ? open : s == "2. High" ? high : s == "3. Low" ? low : s == "4. Close" ? close : s == "5. HL2" ? hl2 : s == "6. HLC3" ? hlc3 : s == "7. OHLC4" ? ohlc4 : s == "8. OC2" ? oc2: close
sma = sma(src, len)
ma = s == "9. PCMA" ? round(pcma * mult) / mult : round(sma * mult) / mult

//Levels
longline1 = 0.0
longline2 = 0.0
longline3 = 0.0
shortline1 = 0.0
shortline2 = 0.0
shortline3 = 0.0
longline1 := long1 ? round(ma * ((100 + longlevel1) / 100) * mult) / mult : close
longline2 := lots[1] == 0 ? long2 ? round(ma * ((100 + longlevel2) / 100) * mult) / mult : close : longline2[1]
longline3 := lots[1] == 0 ? long3 ? round(ma * ((100 + longlevel3) / 100) * mult) / mult : close : longline3[1]
shortline1 := short1 ? round(ma * ((100 + shortlevel1) / 100) * mult) / mult : close
shortline2 := lots[1] == 0 ? short2 ? round(ma * ((100 + shortlevel2) / 100) * mult) / mult : close : shortline2[1]
shortline3 := lots[1] == 0 ? short3 ? round(ma * ((100 + shortlevel3) / 100) * mult) / mult : close : shortline3[1]

//Lines
colorlong1 = long1 ? color.lime : na
colorlong2 = long2 ? color.lime : na
colorlong3 = long3 ? color.lime : na
colorshort1 = short1 ? color.red : na
colorshort2 = short2 ? color.red : na
colorshort3 = short3 ? color.red : na
offset = needoffset ? 1 : 0
plot(shortline3, offset = offset, color = colorshort3, title = "Short line 3")
plot(shortline2, offset = offset, color = colorshort2, title = "Short line 2")
plot(shortline1, offset = offset, color = colorshort1, title = "Short line 1")
plot(ma, offset = offset, color = color.blue, title = "MA line")
plot(longline1, offset = offset, color = colorlong1, title = "Long line 1")
plot(longline2, offset = offset, color = colorlong2, title = "Long line 2")
plot(longline3, offset = offset, color = colorlong3, title = "Long line 3")

//Trading
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]
if ma > 0
    lots := round(size / lot)
    strategy.entry("L1", strategy.long, lot, limit = longline1, when = (lots == 0 and long1 and needtime))
    lots := round(size / lot)
    strategy.entry("L2", strategy.long, lot, limit = longline2, when = (lots <= 1 and long2 and needtime))
    lots := round(size / lot)
    strategy.entry("L3", strategy.long, lot, limit = longline3, when = (lots <= 2 and long3 and needtime))
    lots := round(size / lot)
    strategy.entry("S1", strategy.short, lot, limit = shortline1, when = (lots == 0 and short1 and needtime))
    lots := round(size / lot)
    strategy.entry("S2", strategy.short, lot, limit = shortline2, when = (lots >= -1 and short2 and needtime))
    lots := round(size / lot)
    strategy.entry("S3", strategy.short, lot, limit = shortline3, when = (lots >= -2 and short3 and needtime))
if size > 0
    strategy.entry("TPL", strategy.short, 0, limit = ma, when = needtime)
if size < 0
    strategy.entry("TPS", strategy.long, 0, limit = ma, when = needtime)
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    strategy.cancel("L1")
    strategy.cancel("L2")
    strategy.cancel("L3")
    strategy.cancel("S1")
    strategy.cancel("S2")
    strategy.cancel("S3")
    strategy.cancel("TPL")
    strategy.cancel("TPS")
```

> Detail

https://www.fmz.com/strategy/427934

> Last Modified

2023-09-26 21:02:21
