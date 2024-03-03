
> Name

双轨道布林带动量交易策略Dual-track-Bollinger-Band-Momentum-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/945fd0610cc1648e0d.png)
[trans]

## 概述

本策略基于布林带的概念,设置价格通道的上下轨,并以此进行趋势判断和交易信号产生。具体来说,是计算价格的平均绝对偏差作为通道带宽,通道中轨为价格的简单移动平均,上轨和下轨分别为中轨加减1倍或2倍的通道带宽。当价格突破上轨时做多,突破下轨时做空。

## 原理

该策略主要包含以下几个要点:

1. 计算价格的中轨线,即价格的简单移动平均线。

2. 计算价格绝对偏差的简单移动平均作为通道带宽。 

3. 根据中轨和带宽确定上下轨。上轨为中轨加1或2倍带宽,下轨为中轨减1或2倍带宽。

4. 计算多空趋势判断指标。当价格高于上轨2时为多头,当价格低于下轨2时为空头。

5. 产生交易信号。价格上穿上轨2时做多,下穿下轨2时做空。

6. 设置止损线。多单止损线为下轨1,空单止损线为上轨1。

7. 按照资金管理要求计算仓位。

该策略融合了移动平均线判断趋势、布林带判断超买超卖、突破做反转的思想。通过双轨差异判断趋势强弱,同时发挥布林带回归中轴的功能,整体形成一个较为稳定的交易系统。

## 优势分析

该策略主要具有以下优势:

1. 使用双轨系统,可以较好地判断趋势的强弱。

2. 布林带有较强的回归功能,可以有效避免假突破。 

3. 双轨差异配合布林带回归中轴,形成较稳定的交易信号。

4. 有清晰的止损 Exit 逻辑,可以控制风险。

5. 仓位设置符合资金管理要求,避免超级杠杆。

6. 策略思路清晰,易于理解和优化。

7. 可灵活设置参数,适合不同市场的优化。


## 风险分析

该策略也存在一些风险:

1. 布林带参数设置不当可能导致护城河效应,无法有效跟踪价格。

2. 双轨差异并不能完全避免趋势误判的情况。

3. 在震荡市场中,可能产生较多无效信号。

4. 假突破情况下会产生损失。

5. 存在一定的时间滞后,可能错过周期转换点。 

6. 盈亏比受止损点限制,无法无限追踪趋势。

对应风险管理措施:

1. 优化参数,使布林带能够适应不同周期。

2. 组合其他指标进行確認,避免误判。

3. 降低仓位,控制单笔损失。

4. 优化止损点,保证盈亏比。

5. 适当缩短周期,减少滞后。

6. 风控要稳健,不能无限追涨杀跌。

## 优化方向

该策略可以从以下几个方向进行优化:

1. 优化布林带参数,使其能更好跟踪价格。可以引入自适应参数。

2. 尝试不同的移动平均线,如EMA、DWMA等。

3. 增加趋势过滤,避免震荡市错交易。可以考虑MACD等。 

4. 增加激进出场 Exit,以获取更多趋势利润。可以考虑小止损、移动止损、离场指标等。

5. 引入多个时间周期进行组合,不同周期适合不同市场情况。

6. 增加附加条件逻辑,如交易量突增等,避免假突破。

7. 可以考虑反向布林带,卖出上轨,买入下轨。

8. 进行参数优化测试,寻找最优参数组合。

## 总结

本策略整体思路清晰,具有较强的稳定性。同时也存在一定改进空间,通过参数优化、逻辑优化、风险管理等方面进一步完善,可以成为一个非常实用的量化交易策略。本策略为量化交易的入门策略提供了一个很好的思路参考。

||

## Overview

This strategy is based on the concept of Bollinger Bands, setting upper and lower rails for the price channel and using them for trend judgment and trade signal generation. Specifically, it calculates the average absolute deviation of the price as the channel bandwidth. The middle rail of the channel is the simple moving average of the price, and the upper and lower rails are the middle rail plus or minus 1 or 2 times the channel bandwidth. When the price breaks through the upper rail, go long. When it breaks through the lower rail, go short.

## Principle 

The main points of this strategy include:

1. Calculate the middle rail of the price, which is the simple moving average of the price.

2. Calculate the simple moving average of the absolute deviation of the price as the channel bandwidth.

3. Determine the upper and lower rails according to the middle rail and bandwidth. The upper rail is the middle rail plus 1 or 2 times the bandwidth. The lower rail is the middle rail minus 1 or 2 times the bandwidth.

4. Calculate the trend judgment indicator for long and short. When the price is above the upper rail 2, it is long. When the price is below the lower rail 2, it is short.

5. Generate trading signals. When the price crosses above the upper rail 2, go long. When it crosses below the lower rail 2, go short.

6. Set stop loss line. The stop loss line for long orders is the lower rail 1, and for short orders it is the upper rail 1. 

7. Calculate the position size according to capital management requirements.

The strategy integrates the ideas of using moving averages to judge trends, Bollinger Bands to judge overbought and oversold, and breakouts to make reversals. The difference between the double rails is used to judge the strength of the trend, while the regression function of Bollinger Bands is utilized to form a relatively stable trading system.

## Advantage Analysis

The main advantages of this strategy are:

1. The dual-rail system can better judge the strength of the trend.

2. Bollinger Bands have a strong regression function to effectively avoid false breakouts.

3. The difference between the dual rails combined with the regression of Bollinger Bands forms relatively stable trading signals.

4. There is a clear stop loss/exit logic to control risks. 

5. The position sizing follows capital management requirements, avoiding super leverage.

6. The strategy idea is clear and easy to understand and optimize. 

7. Flexible parameter settings make it adaptable for different markets.

## Risk Analysis

The strategy also has some risks:

1. Improper Bollinger Bands parameters may cause ditching effects, failing to effectively track prices.

2. The difference between dual rails cannot completely avoid erroneous trend judgments.

3. It may generate more invalid signals in range-bound markets. 

4. Losses may occur in false breakout situations.

5. There is some time lag, possibly missing cycle turning points.

6. The risk/reward ratio is limited by the stop loss point, unable to unlimitedly chase trends.

Corresponding risk management measures:

1. Optimize parameters to make Bollinger Bands adaptable to different cycles.

2. Combine other indicators for confirmation to avoid misjudgment. 

3. Reduce position size to control single loss.

4. Optimize stop loss points to ensure risk/reward ratio.

5. Appropriately shorten cycle to reduce lag.

6. Risk control should be robust, no unlimited chasing.

## Optimization Directions

The strategy can be optimized in the following directions:

1. Optimize Bollinger Bands parameters for better price tracking. Adaptive parameters can be introduced.

2. Try different moving averages like EMA, DWMA, etc.

3. Add trend filtering to avoid trading in range-bound markets. MACD can be considered.

4. Add aggressive exit methods to capture more trend profits. Trailing stop loss, exit signals etc. can be considered.

5. Introduce multiple time frames for combination, suitable for different market conditions. 

6. Add additional conditions like volume surges to avoid false breakouts.

7. Consider reverse Bollinger Bands, selling upper band, buying lower band.

8. Perform parameter optimization for best parameter combinations.

## Summary

The overall idea of this strategy is clear and stable. There is also room for improvement via parameter optimization, logic enhancement, risk management etc. to further refine it into a very practical quantitative trading strategy. The strategy provides a good reference for beginners in quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Lot, %|
|v_input_4|20|Length|
|v_input_5_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_6|true|Show Bands|
|v_input_7|true|Show Offset|
|v_input_8|false|Show Background|
|v_input_9|1900|From Year|
|v_input_10|2100|To Year|
|v_input_11|true|From Month|
|v_input_12|12|To Month|
|v_input_13|true|From day|
|v_input_14|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-09 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © noro

//@version=4
strategy(title = "Noro's Bands Strategy", shorttitle = "Bands", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0, commission_value = 0.1)

//Sattings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
lotsize = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
len = input(20, defval = 20, minval = 1, maxval = 1000, title = "Length")
src = input(ohlc4, title = "Source")
showbb = input(true, title = "Show Bands")
showof = input(true, title = "Show Offset")
showbg = input(false, title = "Show Background")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//PriceChannel
lasthigh = highest(src, len)
lastlow = lowest(src, len)
center = (lasthigh + lastlow) / 2

//Distance
dist = abs(src - center)
distsma = sma(dist, len)
hd = center + distsma
ld = center - distsma
hd2 = center + distsma * 2
ld2 = center - distsma * 2

//Trend
trend = 0
trend := high > hd2 ? 1 : low < ld2 ? -1 : trend[1]
bgcol = showbg == false ? na : trend == 1 ? color.lime : color.red
bgcolor(bgcol, transp = 70)

//Lines
colo = showbb == false ? na : color.black
offset = showof ? 1 : 0
plot(hd2, color = colo, linewidth = 1, transp = 0, offset = offset, title = "High band 2")
plot(hd, color = colo, linewidth = 1, transp = 0, offset = offset, title = "High band 1")
plot(center, color = colo, linewidth = 1, transp = 0, offset = offset, title = "center")
plot(ld, color = colo, linewidth = 1, transp = 0, offset = offset, title = "Low band 1")
plot(ld2, color = colo, linewidth = 1, transp = 0, offset = offset, title = "Low band 2")

//Trading
size = strategy.position_size
needstop = needlong == false or needshort == false
truetime = time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)
lot = 0.0
lot := size != size[1] ? strategy.equity / close * lotsize / 100 : lot[1]
if distsma > 0
    strategy.entry("Long", strategy.long, lot, stop = hd2, when = truetime and needlong)
    strategy.entry("Short", strategy.short, lot, stop = ld2, when = truetime and needshort)
sl = size > 0 ? ld2 : size < 0 ? hd2 : na
if size > 0 and needstop
    strategy.exit("Stop Long", "Long", stop = sl)
if size < 0 and needstop
    strategy.exit("Stop Short", "Short", stop = sl)
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
    strategy.cancel("Long")
    strategy.cancel("Short")
```

> Detail

https://www.fmz.com/strategy/432359

> Last Modified

2023-11-16 17:36:00
