
> Name

基于区间突破的双向趋势追踪策略Dual-directional-Trend-Tracking-Strategy-Based-on-Range-Breakout

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ecd6633ccc6092d9ee.png)
[trans]
## 概述

该策略通过计算最后一个涨停价和最后一个跌停价,结合当前价格判断价格是否进入某个定域,从而产生交易信号。当价格超过上一个涨停价一定比例时做多,当价格低于上一个跌停价一定比例时做空。

## 策略原理

策略首先计算最后一个涨停价lastbull和最后一个跌停价lastbear。然后计算当前价格close相对于lastbull的变化比例ddl,以及相对于lastbear的变化比例dds。

当ddl低于配置的做多信号阈值signallong时产生做多信号up,当dds高于配置的做空信号阈值signalshort时产生做空信号dn。

收到做多信号时若需做多参数needlong为真就开多仓,收到做空信号时若需做空参数needshort为真就开空仓。开仓系数capital由账户权益计算。

平仓条件是开多仓后价格上涨就平多仓,开空仓后价格下跌就平空仓。

## 优势分析

该策略结合趋势和区间判断,既能捕捉趋势也能利用区间突破产生交易信号,做多做空切换灵活。相比简单趋势跟踪策略,它可以在盘整区间突破后快速捕捉新的趋势方向。

参数可配置空间大,可以灵活调整做多做空的参数,适应不同品种。可以配置开仓时间段来避开重要时间节点。

## 风险分析

策略中没有止损机制,无法有效控制单笔损失。品种交易范围波动较大时,仓位计算易受价格影响。

可以设置止损来限制单笔损失。可以根据不同品种设置仓位算法使仓位更稳定。

## 优化方向

1. 增加移动止损来控制单笔损失风险
2. 改进仓位计算方法,例如用ATR计算,使仓位大小更稳定
3. 增加开仓过滤,例如突破黄金交叉时才开仓
4. 结合多个品种交易,设定关联关系,降低系统性风险

## 总结

该策略整合趋势判断和区间突破产生交易信号,既能捕捉新的趋势方向又能利用区间震荡特征。参数设置灵活,可调整空间大,适合不同品种。策略优化空间较大,可从多角度进行改进以适应更复杂的市场环境。

||

## Overview

This strategy calculates the last highest price (lastbull) and the last lowest price (lastbear). It then compares the current price with lastbull and lastbear to determine if the price has entered a certain range and thus generates trading signals. It goes long when the price rises over lastbull by a certain percentage, and goes short when the price falls below lastbear by a certain percentage.

## Strategy Logic

The strategy first calculates the last highest price lastbull and the last lowest price lastbear. Then it calculates the change percentage ddl of current price close relative to lastbull, and the change percentage dds relative to lastbear.  

When ddl is lower than the configured long signal threshold signallong, a long signal up is generated. When dds is higher than the configured short signal threshold signalshort, a short signal dn is generated.

Upon receiving long signal, it opens long position if the needlong parameter is true. Upon receiving short signal, it opens short position if the needshort parameter is true. The position size capital is calculated from account equity.

It closes long position when price rises after opening long, and closes short position when price falls after opening short.

## Advantage Analysis

This strategy combines trend and range analysis. It can catch trends and generate trading signals from range breakouts. Compared to simple trend tracking strategies, it can quickly catch new trend direction after range breakout.  

The parameters are highly configurable for different products. The trading time range can be configured to avoid significant events.

## Risk Analysis  

There is no stop loss mechanism in this strategy to limit the loss per trade. The position sizing can be impacted heavily by price fluctuation when the trading range is large.

Stop loss can be added to limit the per trade loss. The position sizing algorithm can be customized based on products to stabilize the position size.

## Optimization Directions

1. Add moving stop loss to control per trade loss risk
2. Improve position sizing algorithm, e.g. use ATR, to stabilize position size  
3. Add filtering for entry signals, e.g. only enter when golden cross happens
4. Trade multiple products with correlation to lower systemic risk

## Summary  

This strategy combines trend analysis and range breakout to generate trading signals, which can catch new trends and take advantage of range bound characteristics. The parameters are highly configurable for different products. There is large room for optimization to adapt more complex market environments.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Lot|
|v_input_4|3|Short, %|
|v_input_5|-3|Long, %|
|v_input_6|1900|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-25 00:00:00
end: 2024-01-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=4
strategy(title = "Noro's DDL Strategy", shorttitle = "DDL str", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 3)

//Settings
needlong = input(true, title = "Long")
needshort = input(true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot")
signalshort = input(3.0, title = "Short, %")
signallong = input(-3.0, title = "Long, %")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Levels
bull = close > close[1] ? 1 : 0
bear = close < close[1] ? 1 : 0
lastbull = 0.0
lastbull := bull ? close : lastbull[1]
lastbear = 0.0
lastbear := bear ? close : lastbear[1]

//Signals
ddl = ((close / lastbull) - 1) * 100
up = ddl < signallong
dds = ((close / lastbear) - 1) * 100
dn = dds > signalshort

//Lines
plot(dds, style = plot.style_area, color = color.red, transp = 0)
plot(ddl, style = plot.style_area, color = color.lime, transp = 0)
plot(0, color = color.black, linewidth = 2, transp = 0)

//Background
col = (up and needlong) or (dn and needshort) ? color.yellow : na
bgcolor(col, transp = 20)

//Orders
lot = 0.0
lot := strategy.position_size == 0 ? strategy.equity / close * capital / 100 : lot[1]
truetime = true
if up
    strategy.entry("Long", strategy.long, lot, when = needlong and truetime)
if dn
    strategy.entry("Short", strategy.short, lot, when = needshort and truetime)
if strategy.position_size > 0 and close > open
    strategy.entry("Close", strategy.short, 0)
if strategy.position_size < 0 and close < open
    strategy.entry("Close", strategy.long, 0)
```

> Detail

https://www.fmz.com/strategy/440711

> Last Modified

2024-02-01 14:22:26
