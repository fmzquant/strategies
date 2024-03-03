
> Name

基于快慢EMA交叉的5分钟趋势追踪策略Trend-Following-5-Minute-EMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/163948ecadbf5e6c6a7.png)
[trans]


## 概述

该策略是基于5分钟时间框架的快慢EMA交叉系统,结合限价单和跟踪止损来自动捕捉趋势。该策略适用于中短线趋势交易,通过EMA过滤来判断整体趋势方向,再结合快慢EMA交叉来定位具体的入场时机。其优点是对趋势判断准确,能有效跟踪趋势;缺点是会出现部分假突破,容易被套住。

## 策略原理

1. 使用快速EMA和慢速EMA,当快速EMA上穿慢速EMA时做多,下穿时做空
2. 使用EMA宏观过滤器,只有当价格在EMA之上才可做多,在EMA之下才可做空,避免假突破
3. 入场时使用限价单,确保价格达到期望位置后再入场
4. 入场后使用动态跟踪止损,锁定利润,止损退出

具体来说:

1. 根据快速EMA和慢速EMA的长度,分别计算出快慢EMA
2. 如果启用EMA过滤器,只有当价格高于EMA才可以做多,低于EMA才可以做空
3. 当快速EMA上穿慢速EMA时,做多;当快速EMA下穿慢速EMA时,做空
4. 多单入场时下限单,空单入场时上限单
5. 入场后启动跟踪止损,根据运行最高价来跟踪,进行止损和止盈

以上就是该策略的基本交易逻辑。

## 策略优势

1. 使用EMA判断整体趋势方向,避免逆势交易
2. 快慢EMA结合限价单,可以有效防止追高杀跌
3. 动态跟踪止损,可以很好地锁定利润
4. 风险控制到位,每单止损固定在2%左右
5. 回撤较小,顺势捕捉趋势较好
6. 策略简单清晰,容易理解和优化

## 策略风险

1. 存在一定的趋势假突破风险,可能被套住
2. EMA周期设置不当可能导致错过趋势
3. 止损幅度设置过大,可能超出正常波动范围被止损
4. 追踪止损过于激进,可能提前离场
5. 止损和止盈比例设置不合理,可能错过更大行情

对策:
1. 优化EMA参数,找到最佳周期长度
2. 适当放宽止损幅度,防止过于频繁止损
3. 审慎设置追踪止损的开始点和跟踪幅度
4. 测试不同的止损止盈比例,找到最优参数

## 策略优化方向

1. 优化EMA周期参数,找到最佳参数组合
2. 尝试不同的EMA类型,如加权移动平均线
3. 测试MACD等其他指标,看是否可以提高效果 
4. 尝试在更高级的时间框架进行EMA过滤
5. 优化入场时的限价区间
6. 优化止损止盈的点位和比例
7. 尝试更复杂的追踪止损方式
8. 加入趋势指标,判断趋势强弱
9. 考虑加入更多滤波器,进一步避免假突破

## 总结

该策略整体来说是一个非常适合中短线趋势交易的策略,其快慢EMA交叉判断入场时机,限价单避免追高杀跌,动态跟踪止损锁定利润的流程非常清晰合理、易于操作。通过一定的参数优化,可以进一步提高策略的胜率和盈利能力。当然也需要注意防范EMA周期不当、止损过于频繁等风险。总体来说,该策略简单高效,非常适合用于量化趋势交易。

|| 

## Overview

This is a 5-minute timeframe trend following strategy based on fast and slow EMA crossovers, with limit orders and trailing stop loss to automatically catch trends. It is suitable for medium-term trend trading, using EMA filter to determine overall trend direction and fast/slow EMA crossovers to pinpoint specific entry timing. Its advantages are accurate trend judgement and effective trend following. Disadvantages include occasional false breakouts and whipsaws.  

## Strategy Logic

1. Use fast and slow EMA lines, go long when fast EMA crosses above slow EMA, go short when crossing below 
2. Apply EMA macro filter, only take longs above EMA and shorts below EMA to avoid false signals
3. Enter trades with limit orders to ensure ideal entry price is met
4. Apply dynamic trailing stop loss after entry to lock in profits and cut losses

Specifically:

1. Calculate fast and slow EMA based on chosen periods
2. Only take long/short positions when price is above/below EMA if filter is enabled  
3. Go long when fast EMA crosses above slow EMA, go short on downward crossover
4. Place limit buy orders for longs and limit sell orders for shorts
5. Initiate trailing stop loss based on highest high/lowest low after entry  

The above covers the basic trading logic of this strategy.

## Advantages

1. EMA filters determine overall trend, prevents trading against major trend 
2. Fast/slow EMA with limits prevents chasing tops/bottoms
3. Dynamic trailing stop locks in profits effectively
4. Good risk control with ~2% stop loss 
5. Smaller drawdowns, good at following trends
6. Simple and easy to understand logic, optimizable

## Risks

1. Whipsaws and false breakout risks, possibility of being trapped
2. Incorrect EMA periods may cause missed trends
3. Stop loss too wide, may exceed normal volatility  
4. Trailing stop too aggressive, could exit prematurely
5. Suboptimal stop loss/take profit ratios, missing big moves

Solutions:

1. Optimize EMA parameters to find best periods
2. Widen stops moderately to prevent excessive stops 
3. Carefully determine trailing start point and trail percentage
4. Test different stop/take ratios to find optimum  

## Optimization Opportunities

1. Optimize EMA periods to find best combinations
2. Try different EMA types like weighted moving average
3. Test other indicators like MACD for improved performance
4. Attempt EMA filtering on higher timeframes 
5. Optimize limit order entry price range
6. Optimize stop loss and take profit points/ratios
7. Experiment with more advanced trailing methods 
8. Add trend strength indicator for situational awareness
9. Consider more filters to further avoid false signals

## Conclusion

Overall this is a very effective medium-term trend following strategy. Its clear logic of using EMA crossovers for entries, limit orders to prevent chasing, and trailing stops to lock profits is simple and robust. With proper parameter tuning it can achieve higher win rates and profitability. Risks like improper EMA periods and excessive stops need to be monitored. But in general this is an efficient quantifiable trend trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|(?EMA Settings)Fast Length|
|v_input_string_1|0|    Type: EMA|SMA|RMA|WMA|
|v_input_source_1_close|0|    Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|100|Slow Length|
|v_input_string_2|0|    Type: EMA|SMA|RMA|WMA|
|v_input_source_2_close|0|    Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_1|false|(?Trade Filters)Use EMA Filter|
|v_input_timeframe_1||    Timeframe|
|v_input_int_3|300|    Length|
|v_input_source_3_hl2|0|    Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|(?Entry Settings)Stop Loss (%)|
|v_input_float_2|2|Take Profit (%)|
|v_input_int_4|3|Long Entry Limit Lookback|
|v_input_int_5|3|Short Entry Limit Lookback|
|v_input_float_3|true|Start Trailing After (%)|
|v_input_float_4|true|Trail Behind (%)|


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
// © jordanfray

//@version=5
strategy(title="5 Minute EMA Strategy", overlay=true, max_bars_back=500, default_qty_type=strategy.percent_of_equity, default_qty_value=100,initial_capital=100000, commission_type=strategy.commission.percent, commission_value=0.05, backtest_fill_limits_assumption=2)

// Indenting Classs
indent_1 = " "
indent_2 = "  "
indent_3 = "   "
indent_4 = "    "

// Group Titles
group_one_title = "EMA Settings"
group_two_title = "Entry Settings"
group_three_title = "Trade Filters"

// Input Tips

ocean_blue = color.new(#0C6090,0)
sky_blue = color.new(#00A5FF,0)
green = color.new(#2DBD85,0)
red = color.new(#E02A4A,0)
light_blue = color.new(#00A5FF,85)
light_green = color.new(#2DBD85,85)
light_red = color.new(#E02A4A,85)
light_yellow = color.new(#FFF900,85)
white = color.new(#ffffff,0)
light_gray = color.new(#000000,70)
transparent = color.new(#000000,100)

// Strategy Settings - EMA
fast_EMA_length = input.int(defval=20, minval=1, title="Fast Length", group=group_one_title)
fast_EMA_type = input.string(defval="EMA", options = ["EMA", "SMA", "RMA", "WMA"], title=indent_4+"Type", group=group_one_title)
fast_EMA_source = input.source(defval=close, title=indent_4+"Source", group=group_one_title)
fast_EMA = switch fast_EMA_type
    "EMA" => ta.ema(fast_EMA_source, fast_EMA_length)
    "SMA" => ta.sma(fast_EMA_source, fast_EMA_length)
    "RMA" => ta.rma(fast_EMA_source, fast_EMA_length)
    "WMA" => ta.wma(fast_EMA_source, fast_EMA_length)
    => na
plot(fast_EMA, title="Fast EMA", linewidth=1, color=green, editable=true)

slow_EMA_length = input.int(defval=100, minval=1, title="Slow Length", group=group_one_title)
slow_EMA_type = input.string(defval="EMA", options = ["EMA", "SMA", "RMA", "WMA"], title=indent_4+"Type", group=group_one_title)
slow_EMA_source = input.source(defval=close, title=indent_4+"Source", group=group_one_title)
slow_EMA = switch slow_EMA_type
    "EMA" => ta.ema(slow_EMA_source, slow_EMA_length)
    "SMA" => ta.sma(slow_EMA_source, slow_EMA_length)
    "RMA" => ta.rma(slow_EMA_source, slow_EMA_length)
    "WMA" => ta.wma(slow_EMA_source, slow_EMA_length)
    => na
plot(slow_EMA, title="Slow EMA", linewidth=1, color=sky_blue, editable=true)


// EMA Macro Filter
enable_EMA_filter = input.bool(defval=false, title="Use EMA Filter", group=group_three_title)
EMA_filter_timeframe = input.timeframe(defval="", title=indent_4+"Timeframe", group=group_three_title)
EMA_filter_length = input.int(defval=300, minval=1, step=10, title=indent_4+"Length", group=group_three_title)
EMA_filter_source = input.source(defval=hl2, title=indent_4+"Source", group=group_three_title)
ema_filter = ta.ema(EMA_filter_source, EMA_filter_length)
ema_filter_smoothed = request.security(syminfo.tickerid, EMA_filter_timeframe, ema_filter[barstate.isrealtime ? 1 : 0], gaps=barmerge.gaps_on)
plot(enable_EMA_filter ? ema_filter_smoothed: na, title="EMA Macro Filter", linewidth=2, color=white, editable=true)


// Entry Settings
stop_loss_val = input.float(defval=2.0, title="Stop Loss (%)", step=0.1, group=group_two_title)/100
take_profit_val = input.float(defval=2.0, title="Take Profit (%)", step=0.1, group=group_two_title)/100
long_entry_limit_lookback = input.int(defval=3, title="Long Entry Limit Lookback", minval=1, step=1, group=group_two_title)
short_entry_limit_lookback = input.int(defval=3, title="Short Entry Limit Lookback", minval=1, step=1, group=group_two_title)
limit_order_long_price = ta.lowest(low, long_entry_limit_lookback)
limit_order_short_price = ta.highest(high, short_entry_limit_lookback)
start_trailing_after = input.float(defval=1, title="Start Trailing After (%)", step=0.1, group=group_two_title)/100
trail_behind = input.float(defval=1, title="Trail Behind (%)", step=0.1, group=group_two_title)/100
long_start_trailing_val = strategy.position_avg_price + (strategy.position_avg_price * start_trailing_after)
short_start_trailing_val = strategy.position_avg_price - (strategy.position_avg_price * start_trailing_after)
long_trail_behind_val = close - (strategy.position_avg_price * (trail_behind/100))
short_trail_behind_val = close + (strategy.position_avg_price * (trail_behind/100))
currently_in_a_long_postion = strategy.position_size > 0
currently_in_a_short_postion = strategy.position_size < 0
long_profit_target = strategy.position_avg_price * (1 + take_profit_val)
long_stop_loss = strategy.position_avg_price * (1.0 - stop_loss_val)
short_profit_target = strategy.position_avg_price * (1 - take_profit_val)
short_stop_loss = strategy.position_avg_price * (1 + stop_loss_val)

bars_since_entry = bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades - 1)
plot(bars_since_entry, editable=false, title="Bars Since Entry", color=green)

long_run_up = currently_in_a_long_postion and bars_since_entry > 0 ? ta.highest(high, bars_since_entry) : high
long_trailing_stop = currently_in_a_long_postion and bars_since_entry > 0 and long_run_up > long_start_trailing_val ? long_run_up - (long_run_up * trail_behind) : long_stop_loss
long_run_up_line = plot(long_run_up, style=plot.style_stepline, editable=false, color=currently_in_a_long_postion ? green : transparent)
long_trailing_stop_line = plot(long_trailing_stop, style=plot.style_stepline, editable=false, color=currently_in_a_long_postion ? long_trailing_stop > strategy.position_avg_price ? green : red : transparent)

short_run_up = currently_in_a_short_postion and bars_since_entry > 0 ? ta.lowest(low, bars_since_entry) : low
short_trailing_stop = currently_in_a_short_postion and bars_since_entry > 0 and short_run_up < short_start_trailing_val ? short_run_up + (short_run_up * trail_behind) : short_stop_loss
// short_run_up_line = plot(short_run_up, style=plot.style_stepline, editable=false, color=currently_in_a_short_postion ? green : transparent)
short_trailing_stop_line = plot(short_trailing_stop, style=plot.style_stepline, editable=false, color=currently_in_a_short_postion ? short_trailing_stop < strategy.position_avg_price ? green : red : transparent)


// Trade Conditions
fast_EMA_cross_down_slow_EMA = ta.crossunder(fast_EMA,slow_EMA)
fast_EMA_cross_up_slow_EMA = ta.crossover(fast_EMA,slow_EMA)
plotshape(fast_EMA_cross_down_slow_EMA ? close : na, title="Short Entry Symbol", color=red, style=shape.triangledown, location=location.belowbar)
plotshape(fast_EMA_cross_up_slow_EMA ? close : na, title="Long Entry Symbol", color=green, style=shape.triangleup, location=location.abovebar)
fast_EMA_is_above_slow_EMA = fast_EMA > slow_EMA
fast_EMA_is_below_slow_EMA = fast_EMA < slow_EMA
ema_macro_filter_longs_only = fast_EMA > ema_filter_smoothed and slow_EMA > ema_filter_smoothed
ema_macro_filter_shorts_only = fast_EMA < ema_filter_smoothed and slow_EMA < ema_filter_smoothed

long_position_take_profit = ta.cross(close, long_trailing_stop) or close > long_profit_target
short_position_take_profit = ta.cross(close, short_trailing_stop) or close > short_profit_target

long_conditions_met = enable_EMA_filter ? ema_macro_filter_longs_only and fast_EMA_cross_up_slow_EMA and fast_EMA_is_above_slow_EMA and not currently_in_a_short_postion : fast_EMA_cross_up_slow_EMA and not currently_in_a_short_postion
short_conditions_met = enable_EMA_filter ? ema_macro_filter_shorts_only and fast_EMA_cross_down_slow_EMA and fast_EMA_is_below_slow_EMA and not currently_in_a_long_postion : fast_EMA_cross_down_slow_EMA and fast_EMA_is_below_slow_EMA and not currently_in_a_long_postion

// Long Entry
strategy.entry(id="Long", direction=strategy.long, limit=limit_order_long_price, when=long_conditions_met)
strategy.cancel(id="Cancel Long", when=ta.crossover(fast_EMA,slow_EMA))
strategy.exit(id="Close Long", from_entry="Long", stop=long_trailing_stop, limit=long_profit_target, when=long_position_take_profit)

// Short Entry 
strategy.entry(id="Short", direction=strategy.short, limit=limit_order_short_price, when=short_conditions_met)
strategy.cancel(id="Cancel Short", when=ta.crossunder(fast_EMA,slow_EMA))
strategy.exit(id="Close Short", from_entry="Short", stop=short_trailing_stop, limit=short_profit_target, when=short_position_take_profit)

entry = plot(strategy.position_avg_price, editable=false, title="Entry", style=plot.style_stepline, color=currently_in_a_long_postion or currently_in_a_short_postion ? color.blue : transparent, linewidth=1)
fill(entry,long_trailing_stop_line, editable=false, color=currently_in_a_long_postion ? long_trailing_stop > strategy.position_avg_price ? light_green : light_red : transparent)
fill(entry,short_trailing_stop_line, editable=false, color=currently_in_a_short_postion ? short_trailing_stop < strategy.position_avg_price ? light_green : light_red : transparent)
//ltp = plot(currently_in_a_long_postion ? long_profit_target : na, style=plot.style_stepline, title="Take Profit", color=currently_in_a_long_postion ? green : transparent, linewidth=1)
//lsl = plot(currently_in_a_long_postion ? long_stop_loss : na, style=plot.style_stepline, title="Take Profit", color=currently_in_a_long_postion ? red : transparent, linewidth=1)
//fill(entry,ltp, color= currently_in_a_long_postion ? light_green : light_red)
//fill(entry,lsl, color= currently_in_a_long_postion ? light_red : light_green)

//stp = plot(currently_in_a_short_postion ? short_profit_target : na, style=plot.style_stepline, title="Take Profit", color=currently_in_a_short_postion ? green : transparent, linewidth=1)
//ssl = plot(currently_in_a_short_postion ? short_stop_loss : na, style=plot.style_stepline, title="Take Profit", color=currently_in_a_short_postion ? red : transparent, linewidth=1)
//fill(entry,stp, color= currently_in_a_short_postion ? light_green : light_red)
//fill(entry,ssl, color= currently_in_a_short_postion ? light_red : light_green)

```

> Detail

https://www.fmz.com/strategy/432331

> Last Modified

2023-11-16 15:36:36
