
> Name

基于多重EMA交叉的自适应交易策略Adaptive-Trading-Strategy-Based-on-Multiple-EMA-Crossovers

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过多组EMA指标组合实现自适应的多空交易。根据市场长短线趋势采用不同参数的EMA指标判断入场和出场。策略自动识别多空行情,采用独立的止损机制控制风险。

## 策略原理

该策略主要利用了EMA指标的交叉原理进行操作。当快线上穿慢线时看多,下穿看空。它同时设置多组EMA,根据市场长短线态势选择不同的参数进行交易。具体来说,判断长线为看多时,用一组较长周期EMA指标判断做多信号;长线看空时,用另一组较短周期EMA判断做空时机。平仓也采用不同周期EMA。 止损根据当前持仓方向以固定比例 trailing stop。

## 优势分析

- 多组EMA自适应判断,对不同市场更灵活。
- 区分多空市场,使交易信号更清晰。
- 独立参数的开平策略,出入场精准。
- 固定比例移动止损,有效控制风险。
- 策略思路直观简单,容易理解和实施。

## 风险及优化  

- EMA容易产生假信号,参数设置关键。
- 固定止损难以跟踪大幅波动。
- 应加入量能指标等过滤器,提升策略稳定性。
- 可使用机器学习算法自动优化参数。
- 考虑将止损改为动态设定,如ATR止损。

## 总结

该策略利用多组EMA交叉实现自适应效果,既保持了EMA原有的优势,又使策略更具弹性。加入适当过滤条件和动态止损后,可成为一个非常实用的自动化交易系统。

||


## Overview

This strategy implements adaptive long/short trading using multiple sets of EMA indicators. It adopts EMAs with different parameters for entry and exit based on market long-term and short-term trends. The strategy automatically recognizes bull/bear market and uses independent stop loss to control risk.

## Strategy Logic

The strategy mainly utilizes the crossover principle of EMA indicators. Long when fast EMA crosses above slow EMA, and short when crossing below. It sets up multiple EMAs and chooses different parameters based on market trends. Specifically, when judging long-term trend is bullish, a set of longer period EMAs are used for long signal; when bearish, another set of shorter period EMAs are used for short. Exits also adopt different period EMAs. Stop loss uses fixed percentage trailing stop based on position direction.

## Advantage Analysis

- Multiple adaptive EMA sets work flexibly across different markets. 
- Distinguishing bull and bear makes signals clearer.
- Independent entry/exit parameters enables precise positioning.  
- Fixed percentage stop loss effectively controls risk.
- Strategy logic is intuitive and easy to understand and implement.

## Risks and Improvements

- EMAs can generate false signals, parameter tuning is key.
- Fixed stop loss may fail to track large fluctuations.  
- Should add filters like volume to enhance robustness.
- Parameters can be auto optimized with machine learning algorithms. 
- Consider using dynamic stop loss like ATR instead of fixed.

## Summary

The strategy achieves adaptive effect leveraging multiple EMA crossovers, keeping EMA’s advantages and making the strategy more flexible. With proper filters and dynamic stops added, it can become a highly practical automated trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Start Date|
|v_input_2|true|Start Month|
|v_input_3|2020|Start Year|
|v_input_4|true|End Date|
|v_input_5|12|End Month|
|v_input_6|2021|End Year|
|v_input_7|11|Long Open - Fast|
|v_input_8|33|Long Open - Slow|
|v_input_9|3|Long Close - Fast|
|v_input_10|40|Long Close - Slow|
|v_input_11|5|Short Open - Fast|
|v_input_12|11|Short Open - Slow|
|v_input_13|4|Short Close - Fast|
|v_input_14|7|Short Close - Slow|
|v_input_15|1.7|Long Stop Loss (%)|
|v_input_16|0.4|Short Stop Loss (%)|
|v_input_17|144|Long-term trend - Longs|
|v_input_18|89|Long-term trend - Shorts|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-26 00:00:00
end: 2023-09-07 00:00:00
period: 12h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © str1nger
//@version=4

// strategy(title="BTC - 4hr - Long/Short", shorttitle="BTC - 4hr - Long/Short", overlay=true, initial_capital=1000, default_qty_type=strategy.percent_of_equity, default_qty_value=75,commission_type=strategy.commission.percent, commission_value=0.075)//////<---Uses a percentage of starting equity

//DATE RANGE//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31)
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12)
startYear = input(title="Start Year", type=input.integer,
     defval=2020, minval=2000, maxval=2100)
endDate = input(title="End Date", type=input.integer,
     defval=1, minval=1, maxval=31)
endMonth = input(title="End Month", type=input.integer,
     defval=12, minval=1, maxval=12)
endYear = input(title="End Year", type=input.integer,
     defval=2021, minval=2000, maxval=2100)

inDateRange =  true


//EMAs//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//LONG
//11,33,3,40
lof= input(11, title="Long Open - Fast", step=1)
los= input(33, title="Long Open - Slow", step=1)
lcf= input(3, title="Long Close - Fast", step=1)
lcs= input(40, title="Long Close - Slow", step=1)
ema_long_open_fast = ema(close, lof)
ema_long_open_slow = ema(close, los)
ema_long_close_fast= ema(close, lcf)
ema_long_close_slow = ema(close, lcs)
//SHORT
//5,11,4,7
sof= input(5, title="Short Open - Fast", step=1)
sos= input(11, title="Short Open - Slow", step=1)
scf= input(4, title="Short Close - Fast", step=1)
scs= input(7, title="Short Close - Slow", step=1)
ema_short_open_fast = ema(close, sof)
ema_short_open_slow = ema(close, sos)
ema_short_close_fast = ema(close, scf)
ema_short_close_slow = ema(close, scs)


//CONDITIONS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//LONG
openlong = crossover(ema_long_open_fast, ema_long_open_slow)
closelong = crossover(ema_long_close_slow, ema_long_close_fast)
//1.7%
long_loss_percent = input(title="Long Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=1.7) * 0.01
long_stop_price = strategy.position_avg_price * (1 - long_loss_percent)
//SHORT
openshort = crossover(ema_short_open_slow, ema_short_open_fast)
closeshort = crossover(ema_short_close_fast, ema_short_close_slow)
//0.4%
short_loss_percent = input(title="Short Stop Loss (%)", type=input.float, minval=0.0, step=0.1, defval=0.4) * 0.01
short_stop_price = strategy.position_avg_price * (1 + short_loss_percent)


//PLOT EMAs////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//LONG
plot(ema_long_open_fast, "Long EMA open lower", linewidth=1, color=color.green)
plot(ema_long_open_slow, "Long EMA close upper", linewidth=1, color=color.green)
plot(ema_long_close_fast, "Long close lower", linewidth=1, color=color.red)
plot(ema_long_close_slow, "Long close upper", linewidth=1, color=color.red)
//SHORT
plot(ema_short_open_fast, "Short open fast", linewidth=1, color=color.green)
plot(ema_short_open_slow, "Short open slow", linewidth=1, color=color.green)
plot(ema_short_close_fast, "Short close fast", linewidth=1, color=color.red)
plot(ema_short_close_slow, "Short close slow", linewidth=1, color=color.red)


//LONG-TERM TRENDS
//LONG 144
long_term_trend_longs= input(144, title="Long-term trend - Longs", step=1)
lttl= ema(close, long_term_trend_longs)
plot(lttl, "Long-term trend - Longs", linewidth=2, color=color.blue)
//SHORT 89
long_term_trend_shorts= input(89, title="Long-term trend - Shorts", step=1)
ltts = ema(close, long_term_trend_shorts)
plot(ltts, "Long-term trend - Shorts", linewidth=2, color=color.blue)


//STRATEGY//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//LONG
if (inDateRange and openlong and (close > lttl))
    strategy.entry("OL", long=true, comment="##insert open long comment here##")
if (inDateRange and closelong)
    strategy.close("OL", comment="##insert close long comment here##")
if strategy.position_size > 0
    strategy.exit("L-SL", stop=long_stop_price, comment="##insert long stop-loss comment here##")
//SHORT  
if (inDateRange and openshort and (close < ltts))
    strategy.entry("OS", long=false, comment="##insert open short comment here##")
if (inDateRange and closeshort)
    strategy.close("OS", comment="##insert close short comment here##")
if strategy.position_size < 0
    strategy.exit("S-SL", stop=short_stop_price, comment="##inster short stop-loss comment here##")



```

> Detail

https://www.fmz.com/strategy/427871

> Last Modified

2023-09-26 14:41:00
