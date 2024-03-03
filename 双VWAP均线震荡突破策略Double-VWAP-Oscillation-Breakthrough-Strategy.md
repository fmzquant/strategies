
> Name

双VWAP均线震荡突破策略Double-VWAP-Oscillation-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1358a08a97fbd446183.png)

[trans]

## 概述

双VWAP均线震荡突破策略通过双VWAP均线分析市场趋势性,在震荡市场中寻找突破的机会。它结合ADX指标判断市场是否震荡,并利用两条不同标准差的VWAP均线寻找突破口下单入场。

## 策略原理  

该策略主要由以下几部分组成:

1. VWAP设置:计算VWAP均线及其带宽。内部VWAP带宽通过`stDevMultiplier`控制,默认为1;外部VWAP带宽通过`stDevMultiplier`控制,默认为2。

2. ADX设置:计算ADX值判断市场是否震荡。当ADX低于阈值时判断为震荡市场。ADX参数可配置。

3. 入场设置:在震荡市场中,价格突破外部VWAP带宽时入场。可配置止损价位和止盈价格。

4. 限制入场:可选EMA均线或时间段过滤,避免非理想时段入场。

5. 获利方式:跟踪止损或止盈价格断裂时平仓。可选择价格突破外VWAP exiting。  

该策略通过ADX指标判断震荡行情,在价格突破VWAP带宽时寻找入场机会。双VWAP带提供更多过滤,确保入场强力。跟踪止损使获利更稳定。

## 优势分析

1. 双VWAP带提供额外入场过滤,确保入场时机强势。

2. ADX指标判断震荡市场,避免趋势行情下错入。

3. 跟踪止损锁住盈利,避免套牢。

4. 可配置化参数丰富,适应性强。

5. 思路清晰易理解,容易复制和修改。

## 风险及解决  

1. 参数设置不当可能导致过于激进入场或平仓。优化参数组合确保策略稳定。

2. 跟踪止损容易过于激进或保守。结合波动率指标动态调整止损位置。

3. 表现敏感于交易时段。可通过时间过滤器优化,确保高效入场。

4. VWAP指标对异常价格敏感。结合其他指标确认价格合理性。

## 优化方向

1. 动态调整止损幅度。可以根据波动率等指标实时调整止损位置。

2. 多 timeframe 确认入场时机。添加更高 timeframe 的趋势及机构指标,避免逆势入场。

3. 考虑仓位管理。根据波动率和账户资金动态调整仓位百分比。

4. 测试不同 VWAP 周期表现。VWAP 周期设定决定了策略的持仓周期,可作优化。

## 总结  

双 VWAP 均线震荡突破策略通过 ADX 判断市场震荡利用双 VWAP 带提供额外的入场过滤。策略思路清晰,较容易实施。通过参数调整、止损优化、仓位管理等手段可显著提高策略稳定性。

||


## Overview  

The double VWAP oscillation breakthrough strategy analyzes market trends using double VWAP bands and seeks breakthrough opportunities in oscillating markets. It combines the ADX indicator to determine if the market is oscillating and utilizes two VWAP bands of different standard deviations to identify breakout entry points.

## Strategy Principles   

The strategy consists of the following main components:  

1. VWAP Settings: Calculate VWAP bands and their width. The inner VWAP width is controlled by `stDevMultiplier`, default to 1. The outer VWAP width is controlled by `stDevMultiplier`, default to 2.  

2. ADX Settings: Calculate ADX values to determine if the market is oscillating. The market is considered oscillating when ADX is below the threshold. ADX parameters are configurable.   

3. Entry Settings: Enter the market when prices break through the outer VWAP bands during oscillation. Stop loss price and take profit prices are configurable.   

4. Limit Entries: Optional EMA or time frame filters to avoid entering during unfavorable time periods.   

5. Profit Taking: Close positions when tracking stop loss or take profit prices are breached. Option to exit when prices break the outer VWAP bands.   

The strategy identifies oscillating markets using the ADX indicator and seeks entry opportunities when prices break VWAP bands. The double VWAP bands provide additional filters to ensure strong entry signals. The trailing stop locks in profits in a more stable way.  

## Advantages Analysis   

1. The double VWAP bands provide extra filters for stronger entry signals.   

2. The ADX oscillator identifies oscillation and avoids wrong entries during trends.  

3. The trailing stop locks in profits and prevents being trapped.   

4. Highly configurable parameters adapt to different market conditions.   

5. Simple logic makes it easy to understand, replicate and modify.   

## Risks and Solutions   

1. Improper parameter tuning can lead to over-eager entry and exits. Optimize parameter combinations to ensure strategy stability.  

2. Trailing stops can be too aggressive or conservative. Dynamically adjust based on volatility indicators.   

3. Performance depends heavily on trading sessions. Optimize using time filters to capture efficiency.  

4. VWAP bands sensitive to erratic prices. Confirm prices with additional indicators.   

## Optimization Directions  

1. Dynamically adjust stop loss ranges based on volatility and other metrics.   

2. Add higher timeframe trend and institution signals to avoid counter-trend entries.   

3. Consider position sizing based on volatility and total capital.   

4. Test different VWAP anchor periods. VWAP periods determine overall strategy holding period.

## Summary  

The double VWAP oscillation breakout strategy identifies oscillation with ADX and provides additional entry filters with the VWAP bands. The logic is simple to implement. Parameters tuning, stop loss optimization and position sizing can significantly improve stability.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|Close early if price crosses outer VWAP band|
|v_input_string_1|0|(?VWAP Settings)Anchor Period: Session|Week|Month|Quarter|Year|
|v_input_1_close|0|Inner VWAP Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|true|Inner Bands Multiplier|
|v_input_3|2|Outer Bands Multiplier|
|v_input_int_1|14|(?ADX Settings)ADX Smoothing|
|v_input_int_2|14|DI Length|
|v_input_int_3|40|ADX Threshold|
|v_input_float_1|2|(?Entry Settings)Stop Loss (%)|
|v_input_float_2|6|Take Profit (%)|
|v_input_int_4|true|Long Entry Limit Lookback|
|v_input_int_5|true|Short Entry Limit Lookback|
|v_input_float_3|3|Start Trailing After (%)|
|v_input_float_4|2|Trail Behind (%)|
|v_input_bool_2|true|(?Limit Entries)Use EMA Filter|
|v_input_timeframe_1||    Timeframe|
|v_input_int_6|300|    Length|
|v_input_source_1_hl2|0|    Source: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_bool_3|false|Use Time Session Filter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-23 00:00:00
end: 2023-11-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © jordanfray

//@version=5
strategy(title="Double VWAP Strategy", overlay=true, scale=scale.none, max_bars_back=500, default_qty_type=strategy.percent_of_equity, default_qty_value=100,initial_capital=100000, commission_type=strategy.commission.percent, commission_value=0.05, backtest_fill_limits_assumption=2)

// Indenting Classs
indent_1 = " "
indent_2 = "  "
indent_3 = "   "
indent_4 = "    "

// Group Titles
group_one_title = "VWAP Settings"
group_two_title = "ADX Settings"
group_three_title = "Entry Settings"
group_four_title = "Limit Entries"

// Input Tips
adx_thresholdToolTip = "The minumn ADX value to allow opening a postion"
adxCancelToolTip= "You can optionally set a different lower value for ADX that will allow entries even if below the trigger threshold."

ocean_blue = color.new(#0C6090,0)
sky_blue = color.new(#00A5FF,0)
green = color.new(#2DBD85,0)
red = color.new(#E02A4A,0)
light_blue = color.new(#00A5FF,90)
light_green = color.new(#2DBD85,90)
light_red = color.new(#E02A4A,90)
light_yellow = color.new(#FFF900,90)
white = color.new(#ffffff,0)
transparent = color.new(#000000,100)

// Strategy Settings - VWAP
var cumVol = 0.
cumVol += nz(volume)
if barstate.islast and cumVol == 0
    runtime.error("No volume is provided by the data vendor.")
    
computeVWAP(src, isNewPeriod, stDevMultiplier) =>
    var float sum_src_vol = na
    var float sum_vol = na
    var float sum_src_src_vol = na

    sum_src_vol := isNewPeriod ? src * volume : src * volume + sum_src_vol[1]
    sum_vol := isNewPeriod ? volume : volume + sum_vol[1]
    sum_src_src_vol := isNewPeriod ? volume * math.pow(src, 2) : volume * math.pow(src, 2) + sum_src_src_vol[1]

    _vwap = sum_src_vol / sum_vol
    variance = sum_src_src_vol / sum_vol - math.pow(_vwap, 2)
    variance := variance < 0 ? 0 : variance
    standard_deviation = math.sqrt(variance)

    lower_band_value = _vwap - standard_deviation * stDevMultiplier
    upper_band_value = _vwap + standard_deviation * stDevMultiplier

    [_vwap, lower_band_value, upper_band_value]

var anchor = input.string(defval="Session", title="Anchor Period", options=["Session", "Week", "Month", "Quarter", "Year"], group=group_one_title)
src = input(defval = close, title = "Inner VWAP Source", group=group_one_title)
multiplier_inner = input(defval=1.0, title="Inner Bands Multiplier", group=group_one_title)
multiplier_outer = input(defval=2.0, title="Outer Bands Multiplier", group=group_one_title)
show_bands = true

timeChange(period) =>
   ta.change(time(period))

isNewPeriod = switch anchor
    "Session" => timeChange("D")
    "Week" => timeChange("W")
    "Month" => timeChange("M")
    "Quarter" => timeChange("3M")
    "Year" => timeChange("12M")
    => false

float vwap_val = na
float upper_inner_band_value = na
float lower_inner_band_value = na
float upper_outer_band_value = na
float lower_outer_band_value = na

[inner_vwap, inner_bottom, inner_top] = computeVWAP(src, isNewPeriod, multiplier_inner)
[outer_vwap, outer_bottom, outer_top] = computeVWAP(src, isNewPeriod, multiplier_outer)
vwap_val := inner_vwap
upper_inner_band_value := show_bands ? inner_top : na
lower_inner_band_value := show_bands ? inner_bottom : na
upper_outer_band_value := show_bands ? outer_top : na
lower_outer_band_value := show_bands ? outer_bottom : na

plot(vwap_val, title="VWAP", color=green)

upper_inner_band = plot(upper_inner_band_value, title="Upper Inner Band", color=sky_blue)
lower_inner_band = plot(lower_inner_band_value, title="Lower Inner Band", color=sky_blue)
upper_outer_band = plot(upper_outer_band_value, title="Upper Outer Band", linewidth=2, color=ocean_blue)
lower_outer_band = plot(lower_outer_band_value, title="Lower Outer Band", linewidth=2, color=ocean_blue)

fill(upper_outer_band, lower_outer_band, title="VWAP Bands Fill", color= show_bands ? light_blue : na)

// ADX Settings
adx_len = input.int(defval=14, title="ADX Smoothing", group=group_two_title)
di_len = input.int(defval=14, title="DI Length", group=group_two_title)
adx_threshold = input.int(defval=40, title="ADX Threshold", group=group_two_title, tooltip=adx_thresholdToolTip)
dirmov(len) =>
    up = ta.change(high)
    down = -ta.change(low)
    plus_dm = na(up) ? na : (up > down and up > 0 ? up : 0)
    minus_dm = na(down) ? na : (down > up and down > 0 ? down : 0)
    true_range = ta.rma(ta.tr, len)
    plus = fixnan(100 * ta.rma(plus_dm, len) / true_range)
    minus = fixnan(100 * ta.rma(minus_dm, len) / true_range)
    [plus, minus]

adx(di_len, adx_len) =>
    [plus, minus] = dirmov(di_len)
    sum = plus + minus
    adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adx_len)

adx_val = adx(di_len, adx_len)
plot(adx_val, title="ADX")

// Entry Settings
stop_loss_val = input.float(defval=2.0, title="Stop Loss (%)", step=0.1, group=group_three_title)/100
take_profit_val = input.float(defval=6.0, title="Take Profit (%)", step=0.1, group=group_three_title)/100
long_entry_limit_lookback = input.int(defval=1, title="Long Entry Limit Lookback", minval=1, step=1, group=group_three_title)
short_entry_limit_lookback = input.int(defval=1, title="Short Entry Limit Lookback", minval=1, step=1, group=group_three_title)
limit_order_long_price = ta.lowest(close, long_entry_limit_lookback)
limit_order_short_price = ta.highest(close, short_entry_limit_lookback)
start_trailing_after = input.float(defval=3, title="Start Trailing After (%)", step=0.1, group=group_three_title)/100
trail_behind = input.float(defval=2, title="Trail Behind (%)", step=0.1, group=group_three_title)/100
close_early_if_crosses_outter_band = input.bool(defval=false, title="Close early if price crosses outer VWAP band")

// Limit Entries
enableEmaFilter = input.bool(defval=true, title="Use EMA Filter", group=group_four_title)
emaFilterTimeframe = input.timeframe(defval="", title=indent_4+"Timeframe", group=group_four_title)
emaFilterLength = input.int(defval=300, minval=1, step=10, title=indent_4+"Length", group=group_four_title)
emaFilterSource = input.source(defval=hl2, title=indent_4+"Source", group=group_four_title)
ema_filter = ta.ema(emaFilterSource, emaFilterLength)
ema_filter_smoothed = request.security(syminfo.tickerid, emaFilterTimeframe, ema_filter[barstate.isrealtime ? 1 : 0], gaps=barmerge.gaps_on)
plot(enableEmaFilter ? ema_filter_smoothed: na, title="EMA Macro Filter", linewidth=2, color=sky_blue, editable=true)

useTimeFilter = input.bool(defval=false, title="Use Time Session Filter", group=group_four_title)

withinTime = true


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
bars_since_entry = currently_in_a_long_postion or currently_in_a_short_postion ? bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades - 1) + 1 : 5
plot(bars_since_entry, editable=false, title="Bars Since Entry", color=green)
long_run_up = ta.highest(high, bars_since_entry)
long_trailing_stop = currently_in_a_long_postion and bars_since_entry > 0 and long_run_up > long_start_trailing_val ? long_run_up - (long_run_up * trail_behind) : long_stop_loss
//long_run_up_line = plot(long_run_up, style=plot.style_stepline, editable=false, color=currently_in_a_long_postion ? green : transparent)
long_trailing_stop_line = plot(long_trailing_stop, style=plot.style_stepline, editable=false, color=currently_in_a_long_postion ? long_trailing_stop > strategy.position_avg_price ? green : red : transparent)
short_run_up = ta.lowest(low, bars_since_entry)
short_trailing_stop = currently_in_a_short_postion and bars_since_entry > 0 and short_run_up < short_start_trailing_val ? short_run_up + (short_run_up * trail_behind) : short_stop_loss
//short_run_up_line = plot(short_run_up, style=plot.style_stepline, editable=false, color=currently_in_a_short_postion ? green : transparent)
short_trailing_stop_line = plot(short_trailing_stop, style=plot.style_stepline, editable=false, color=currently_in_a_short_postion ? short_trailing_stop < strategy.position_avg_price ? green : red : transparent)


// Conditions
adx_is_below_threshold = adx_val < adx_threshold
price_crossed_down_VWAP_lower_outer_band = ta.crossunder(low, lower_outer_band_value)
price_closed_above_VWAP_lower_outer_band = close > lower_outer_band_value
price_crossed_up_VWAP_upper_outer_band =  ta.crossover(high,upper_outer_band_value)
price_closed_below_VWAP_upper_outer_band = close < upper_outer_band_value
price_above_ema_filter = close > ema_filter_smoothed
price_below_ema_filter = close < ema_filter_smoothed

//Trade Restirctions
no_trades_allowed = not withinTime or not adx_is_below_threshold

// Enter trades when...
long_conditions_met = enableEmaFilter ? price_above_ema_filter and not currently_in_a_long_postion and withinTime and adx_is_below_threshold and price_crossed_down_VWAP_lower_outer_band and price_closed_above_VWAP_lower_outer_band : not currently_in_a_long_postion and withinTime and adx_is_below_threshold and price_crossed_down_VWAP_lower_outer_band and price_closed_above_VWAP_lower_outer_band
short_conditions_met = enableEmaFilter ? price_below_ema_filter and not currently_in_a_short_postion and withinTime and adx_is_below_threshold and price_crossed_up_VWAP_upper_outer_band and price_closed_below_VWAP_upper_outer_band : not currently_in_a_short_postion and withinTime and adx_is_below_threshold and price_crossed_up_VWAP_upper_outer_band and price_closed_below_VWAP_upper_outer_band
plotshape(long_conditions_met ? close  : na, title="Long Entry Symbol", color=green, style=shape.triangleup, location=location.abovebar)
plotshape(short_conditions_met ? close  : na, title="Short Entry Symbol", color=red, style=shape.triangledown, location=location.belowbar)

// Take Profit When...
price_closed_below_short_trailing_stop = ta.cross(close, short_trailing_stop)
price_hit_short_entry_profit_target = low > short_profit_target
price_closed_above_long_entry_trailing_stop = ta.cross(close, long_trailing_stop)
price_hit_long_entry_profit_target = high > long_profit_target

long_position_take_profit = close_early_if_crosses_outter_band ? price_crossed_up_VWAP_upper_outer_band or price_closed_above_long_entry_trailing_stop or price_hit_long_entry_profit_target : price_closed_above_long_entry_trailing_stop or price_hit_long_entry_profit_target
short_position_take_profit = close_early_if_crosses_outter_band ? price_crossed_down_VWAP_lower_outer_band or price_closed_below_short_trailing_stop or price_hit_short_entry_profit_target : price_closed_below_short_trailing_stop or price_hit_short_entry_profit_target

// Cancel limir order if...
cancel_long_condition = false
cancel_short_condition = false


// Long Entry
strategy.entry(id="Long", direction=strategy.long, limit=limit_order_long_price, when=long_conditions_met)
strategy.cancel(id="Cancel Long", when=cancel_long_condition)
strategy.exit(id="Close Long", from_entry="Long", stop=long_trailing_stop, limit=long_profit_target, when=long_position_take_profit)

// Short Entry 
strategy.entry(id="Short", direction=strategy.short, limit=limit_order_short_price, when=short_conditions_met)
strategy.cancel(id="Cancel Short", when=cancel_short_condition)
strategy.exit(id="Close Short", from_entry="Short", stop=short_trailing_stop, limit=short_profit_target, when=short_position_take_profit)

entry = plot(strategy.position_avg_price, editable=false, title="Entry", style=plot.style_stepline, color=currently_in_a_long_postion or currently_in_a_short_postion ? color.blue : transparent, linewidth=1)
fill(entry,long_trailing_stop_line, editable=false, color=currently_in_a_long_postion ? long_trailing_stop > strategy.position_avg_price ? light_green : light_red : transparent)
fill(entry,short_trailing_stop_line, editable=false, color=currently_in_a_short_postion ? short_trailing_stop < strategy.position_avg_price ? light_green : light_red : transparent)
bgcolor(title="No Trades Allowed", color=no_trades_allowed ? light_red : light_green)

```

> Detail

https://www.fmz.com/strategy/432973

> Last Modified

2023-11-23 11:10:28
