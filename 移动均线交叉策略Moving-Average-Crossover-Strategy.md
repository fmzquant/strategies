
> Name

移动均线交叉策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

移动均线交叉策略是一个基于移动均线交叉作为交易信号的趋势跟踪策略。该策略以价格与移动均线交叉以及两条移动均线交叉为买入和卖出信号,追求获利。

## 策略原理

该策略的主要原理如下:

1. 计算两条移动均线,一快一慢,可选择SMA或EMA。

2. 当快线上穿慢线时,做多;当快线下穿慢线时,平仓。

3. 可选择价格突破均线或均线间交叉作为交易信号。

4. 可设定策略运行的时间段。

5. 可针对多头市场仅做多,空头市仅做空。

6. 通过移动均线参数优化,适应不同周期。

该策略利用了移动均线的趋势跟踪功能,当短期均线上穿长期均线时,表示目前处于上升趋势,应该做多;反之,短期均线下穿长期均线时,表示目前处于下降趋势,应该减少头寸。

## 优势分析

该策略主要优势包括:

1. 原理简单,易于实现,交易信号明确。

2. 可以有效跟踪趋势,及时捕捉买卖机会。

3. 可结合不同均线参数,适用于多种市场环境。

4. 可选择仅做多或仅做空,规避不确定的反向操作。

5. 可设定策略运行时间,避开特定时间段。

6. 通过参数优化,可不断改进策略表现。

## 风险分析

该策略的主要风险有:

1. 容易产生假信号,应避免过于频繁交易。

2. 表现依赖均线参数选择,不当选择可能导致亏损。

3. 有一定的滞后,应防止过早进入和过晚退出。 

4. 不适用于震荡盘整理的市场环境。

5. 均线交叉具有一定随机性,无法完全避免亏损。

可通过交易量确认,优化参数或与其他指标组合使用来减少风险。

## 优化方向 

该策略可从以下几个方面进行优化:

1. 加入/%(Line - ShortMa)/ShortMa)/(Line - LongMa)/LongMa)/作为均线斜率过滤条件。

2. 优化移动均线周期参数,测试不同组合。

3. 加入MACD或RSI等指标进行多重确认。 

4. 设定止损条件,限制单笔亏损。

5. 区分趋势市和盘整市,进行条件运用。

6. 测试不同持仓时间久短,寻找最优方案。

## 总结

移动均线交叉策略是一个简单实用的趋势跟踪策略。优点是易于实现,可以有效跟踪趋势;缺点是具有滞后性,可能产生较多假信号。通过参数优化、指标筛选等方式可以改进该策略,使其在趋势明显的市场中获得较好的表现。

||

## Overview

The moving average crossover strategy is a trend following strategy based on moving average crossover as trading signals. It uses price crossover with moving averages and crossover between two moving averages as buy and sell signals to pursue profits.

## Strategy Principle

The main principles of this strategy are:

1. Calculate two moving averages, one fast and one slow, can choose SMA or EMA. 

2. Go long when fast line crosses above slow line, close position when fast line crosses below slow line.

3. Can choose price breakout or moving average crossover as trading signals. 

4. Can set time period for strategy execution.

5. Can only go long in bull market and only go short in bear market.

6. Optimize moving average parameters through backtesting for different periods.

The strategy utilizes the trend following capability of moving averages. When short term MA crosses above long term MA, it indicates an upward trend, should go long. vice versa, downward trend, should reduce position.

## Advantage Analysis  

The main advantages of this strategy:

1. Simple principle, easy to implement, clear trading signals.

2. Can effectively track trends and timely capture trading opportunities.

3. Can combine different MA parameters for various market environments. 

4. Can choose only long or only short to avoid uncertain reverse operations.

5. Can set strategy running time to avoid certain periods.

6. Can continuously improve strategy through parameter optimization.

## Risk Analysis

The main risks of this strategy:

1. Prone to false signals, avoid too frequent trading.

2. Performance relies on MA parameters, improper selection may lead to losses.

3. Certain lag exists, avoid premature entry and delayed exit.

4. Not suitable for range-bound market environments. 

5. MA crosses have some randomness, cannot completely avoid losses.

Risks can be reduced through volume confirmation, parameter optimization or using with other indicators.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Add slope filter like %(Line - ShortMa)/ShortMa)/(Line - LongMa)/LongMa).

2. Optimize moving average periods, test different combinations. 

3. Add indicators like MACD or RSI for multiple confirmation.

4. Set stop loss to limit single trade loss.

5. Distinguish between trending and ranging markets for conditional use. 

6. Test different holding periods to find optimal scheme.

## Summary

The moving average crossover strategy is a simple and practical trend following strategy. The advantages are easy implementation and effective trend tracking. The disadvantages are lagging and prone to false signals. The strategy can be improved through parameter optimization and indicator filtering to achieve better performance in strong trending markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long Trades enabled|
|v_input_2|true|Short Trades enabled|
|v_input_3|0|Buy/Long Crossover Condition: price x MA1|price x MA2|MA1 x MA2|
|v_input_4|0|Sell/Short Crossunder Condition: price x MA2|price x MA1|MA1 x MA2|
|v_input_5|0|Moving Average 1 Type: SMA|EMA|
|v_input_6|20|Moving Average 1 Len|
|v_input_7|0|Moving Average 2 Type: SMA|EMA|
|v_input_8|30|Moving Average 2 Len|
|v_input_9|4|Strategy Start Month|
|v_input_10|2018|Strategy Start Year|
|v_input_11|12|Strategy End Month|
|v_input_12|2020|Strategy End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-17 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © gliese581d

//@version=4
strategy(title="Moving Averages Testing", overlay=true, precision=2, calc_on_every_tick=false, max_bars_back=5000, pyramiding=2,  
 default_qty_type=strategy.percent_of_equity, default_qty_value=50, commission_type=strategy.commission.percent, initial_capital=10000)


//SETTINGS

longs_on = input(title="Long Trades enabled", defval=true)
shorts_on = input(title="Short Trades enabled", defval=true)

long_cond = input(title="Buy/Long Crossover Condition", defval="price x MA1", options=["price x MA1", "price x MA2", "MA1 x MA2"])
short_cond = input(title="Sell/Short Crossunder Condition", defval="price x MA2", options=["price x MA1", "price x MA2", "MA1 x MA2"])

ma1_type = input(title="Moving Average 1 Type", defval="SMA", options=["SMA", "EMA"])
ma1_len = input(defval=20, title="Moving Average 1 Len", type=input.integer, minval=1, maxval=1000, step=1)
ma2_type = input(title="Moving Average 2 Type", defval="SMA", options=["SMA", "EMA"])
ma2_len = input(defval=30, title="Moving Average 2 Len", type=input.integer, minval=1, maxval=1000, step=1)


//MOVING AVERAGES

ma_1 = ma1_type == "EMA" ? ema(close, ma1_len) : sma(close, ma1_len)
ma_2 = ma2_type == "EMA" ? ema(close, ma2_len) : sma(close, ma2_len)


//STRATEGY

//trade entries
long_entry = long_cond == "price x MA1" ? crossover(close, ma_1) : long_cond == "price x MA2" ? crossover(close, ma_2) : long_cond == "MA1 x MA2" ? crossover(ma_1, ma_2) : false
short_entry = short_cond == "price x MA1" ? crossunder(close, ma_1) : short_cond == "price x MA2" ? crossunder(close, ma_2) : short_cond == "MA1 x MA2" ? crossunder(ma_1, ma_2) : false

start_month = input(defval=4, title="Strategy Start Month", type=input.integer, minval=1, maxval=12, step=1)
start_year = input(defval=2018, title="Strategy Start Year", type=input.integer, minval=2000, maxval=2025, step=1)
end_month = input(defval=12, title="Strategy End Month", type=input.integer, minval=1, maxval=12, step=1)
end_year = input(defval=2020, title="Strategy End Year", type=input.integer, minval=2000, maxval=2025, step=1)

in_time = true

strategy.entry("Long", strategy.long, when=longs_on and in_time and long_entry)
strategy.close("Long", when=longs_on and not shorts_on and short_entry)

strategy.entry("Short", strategy.short, when=shorts_on and in_time and short_entry)
strategy.close("Short", when=shorts_on and not longs_on and long_entry)


//PLOTTING

//color background
last_entry_was_long = nz(barssince(long_entry)[1], 5000) < nz(barssince(short_entry)[1], 5000)
bgcol = (longs_on and last_entry_was_long) ? color.green : (shorts_on and not last_entry_was_long) ? color.red : na
bgcolor(color=bgcol, transp=90)

plot((long_cond == "price x MA1" or long_cond == "MA1 x MA2") or (short_cond == "price x MA1" or short_cond == "MA1 x MA2") ? ma_1 : na, color=color.blue)
plot((long_cond == "price x MA2" or long_cond == "MA1 x MA2") or (short_cond == "price x MA2" or short_cond == "MA1 x MA2") ? ma_2 : na, color=color.black)
plotshape(long_entry, style=shape.triangleup, location=location.belowbar, color=color.green)
plotshape(short_entry, style=shape.triangledown, location=location.abovebar, color=color.red)
```

> Detail

https://www.fmz.com/strategy/427164

> Last Modified

2023-09-18 17:35:37
