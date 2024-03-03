
> Name

架构突破回测策略Architecture-Breakthrough-Backtesting-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/171d9a75bd29844cb70.png)

[trans]

## 概述
该策略采用级别突破的方式,在一定突破条件下做多做空,并具有自动回测功能来找到最佳参数组合。

## 原理
1. 输入参数包括回看天数、止盈百分比、止损百分比,以及自动回测参数如回看天数、止盈止损范围等。

2. 回测时遍历回看天数、止盈百分比、止损百分比的各种组合,记录每种组合下的盈亏情况。

3. 突破信号判断:收盘价上穿upper band且不是入市时柱,做多;收盘价下穿lower band且不是入市时柱,做空。

4. 止损条件判断:若未止盈且触发止损线,则止损出场。

5. 止盈条件判断:若未止损且触发止盈线,则止盈出场。 

6. 显示回测结果明细表格,可根据用户设置按获利率或净利润或交易次数排序。

## 优势
1. 自动回测功能可以快速找到最佳参数组合,无需手工测试。

2. 可根据盈利率、净利润、交易次数等排序回测结果,灵活选择符合自己需要的最优参数。

3. 可视化显示每笔交易的盈亏情况。

4. 回测参数可自定义,可以测试更广的参数空间,找到全局最优。

5. 策略交易规则简单清晰,容易理解实现。

## 风险及解决
1. 回测周期短可能导致结果不稳定。解决方法:设置更长的回测周期。

2. 交易频繁容易造成滑点影响盈利。解决方法:适当放宽止盈止损幅度。

3. 单一商品回测结果可能不具代表性。解决方法:回测不同品种,找到稳定的参数组合。

4. 参数过优化可能导致过拟合。解决方法:验证参数在不同品种和时间周期的稳定性。

5. 忽略交易成本可能导致回测结果偏差。解决方法:设置合理的手续费参数。

## 优化方向
1. 增加参数优化维度,如加入移动止损或交易次数限制等。

2. 优化入市条件,结合趋势指标过滤。

3. 优化止盈止损策略,如动态止盈或追踪止损等。

4. 增加机器学习等算法辅助参数优化。

5. 优化代码结构,提高回测速度。

6. 在多品种多周期验证参数稳定性。

7. 考虑整合自动交易功能。

## 总结
该策略总体思路清晰易懂,自动回测功能可以快速优化参数,显示盈亏情况有利于策略改进。存在一定风险需要注意,但可通过多方面优化不断改进,具有很强的实用价值。整体来说,该策略利用简单突破思路,配备自动回测工具,可以辅助交易者快速建立稳定的交易系统。

||

## Overview
This strategy adopts a level breakthrough approach to go long or short under certain breakthrough conditions, and has auto-backtesting capabilities to find the optimal parameter combination.

## Principle  
1. Input parameters include lookback days, take profit percentage, stop loss percentage, and auto-backtesting parameters like lookback range, take profit/stop loss range etc.

2. During backtesting, traverse various combinations of lookback, take profit and stop loss, and record PnL for each combination. 

3. Breakthrough signal logic: long when close breaks above upper band and not the entry bar, short when close breaks below lower band and not the entry bar.

4. Stop loss condition: if not take profited and stop loss is triggered, exit the trade.

5. Take profit condition: if not stopped out and take profit is triggered, exit the trade.

6. Display detailed backtest results table, sortable by win rate, net profit or number of trades based on user settings.

## Advantages
1. Auto backtest can quickly find optimal parameter sets without manual testing.  

2. Sort backtest results flexibly by win rate, net profit, number of trades etc according to needs.

3. Visualize PnL for each trade.

4. Customizable backtest parameters for testing wider parameter space to find global optimum.

5. Simple and clear trading rules easy to understand and implement.

## Risks and Solutions
1. Short backtest period may lead to unstable results. Solution: use longer backtest period.

2. Frequent trading prone to slippage affecting profitability. Solution: relax take profit/stop loss levels appropriately.  

3. Single instrument backtest may not be representative. Solution: test on different products to find robust parameter sets.

4. Over-optimized parameters cause overfitting. Solution: test stability of parameters across products and timeframes.

5. Ignoring transaction costs lead to bias in results. Solution: use reasonable commission settings.

## Enhancement Directions 
1. Increase optimization dimensions like adding trailing stop or trade limits.

2. Optimize entry conditions with trend filters.

3. Enhance take profit/stop loss like dynamic take profit or trailing stop loss. 

4. Introduce machine learning for parameter optimization.

5. Optimize code structure for faster backtesting.  

6. Test parameter robustness across products and timeframes.

7. Consider integrating auto trading capabilities.

## Conclusion
The strategy has clear and simple logic, auto backtesting enables quick parameter tuning, PnL display facilitates further improvements. Risks exist but can be reduced through multi-dimensional optimizations, with strong practical value. In summary, this strategy equipped with auto backtesting tools can help traders quickly develop stable trading systems based on simple breakout concepts.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|2|Lookback|
|v_input_float_1|5|TP (%)|
|v_input_float_2|5|SL (% from Low)|
|v_input_float_3|0.075|Commission (%)|
|v_input_float_4|2|(?Optimisation)Min Lookback|
|v_input_float_5|5|Max Lookback|
|v_input_float_6|5|Min TP (%)|
|v_input_float_7|10|Max TP (%)|
|v_input_float_8|true|Min SL (%)|
|v_input_float_9|5|Max SL (%)|
|v_input_bool_1|true|Percentage profitable|
|v_input_bool_2|false|Net profit|
|v_input_bool_3|false|Number of trades|
|v_input_string_1|0|(?Table)Position: Bottom Right|Top Center|Top Right|Middle Left|Middle Center|Middle Right|Bottom Left|Bottom Center|Top Left|
|v_input_string_2|0|Font size: Normal|Tiny|Small|Auto|Large|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © -_-
//@version=5
// strategy("[-_-] LBAB", process_orders_on_close=true, overlay=true, max_labels_count=500, max_lines_count=500, max_boxes_count=500, default_qty_type=strategy.cash, default_qty_value=100, initial_capital=10000, commission_type=strategy.commission.percent, commission_value=0.075)

// Inputs
lookback = input.int(2, title="Lookback", minval=2, maxval=15)      
tp = input.float(5, title="TP (%)", minval=1, maxval=10000)            
sl = input.float(5, title="SL (% from Low)", minval=1, maxval=100)  
com = input.float(0.075, title="Commission (%)", minval=0, maxval=50)

min_lookback_tr = input.float(2, title="Min Lookback", minval=1, maxval=500, inline="tr_lookback", group="Optimisation") 
max_lookback_tr = input.float(5, title="Max Lookback", minval=1, maxval=500, inline="tr_lookback", group="Optimisation") 
min_tp_tr = input.float(5, title="Min TP (%)", minval=1, maxval=10000, inline="tr_tp", group="Optimisation") 
max_tp_tr = input.float(10, title="Max TP (%)", minval=1, maxval=10000, inline="tr_tp", group="Optimisation") 
min_sl_tr = input.float(1, title="Min SL (%)", minval=1, maxval=100, inline="tr_sl", group="Optimisation") 
max_sl_tr = input.float(5, title="Max SL (%)", minval=1, maxval=100, inline="tr_sl", group="Optimisation") 
imp_perc_profit = input.bool(true, title="Percentage profitable", group="Optimisation")
imp_netprofit = input.bool(false, title="Net profit", group="Optimisation")
imp_numtrades = input.bool(false, title="Number of trades", group="Optimisation")
table_pos = input.string("Bottom Right", title="Position", options=["Top Left", "Top Center", "Top Right", "Middle Left", "Middle Center", "Middle Right", "Bottom Left", "Bottom Center", "Bottom Right"], group="Table")
table_font_size = input.string("Normal", title="Font size", options=["Auto", "Tiny", "Small", "Normal", "Large"], group="Table")

// Table parameters
table_pos_ = switch table_pos 
    "Top Left" => position.top_left
    "Top Center" => position.top_center
    "Top Right" => position.top_right
    "Middle Left" => position.middle_left
    "Middle Center" => position.middle_center
    "Middle Right" => position.middle_right
    "Bottom Left" => position.bottom_left
    "Bottom Center" => position.bottom_center
    "Bottom Right" => position.bottom_right

table_font_size_ = switch table_font_size
    "Auto" => size.auto
    "Tiny" => size.tiny
    "Small" => size.small
    "Normal" => size.normal
    "Large" => size.large

// Sorting function (first element will be largest)
sortArr(arr, arr_index) =>
    n = array.size(arr) - 1 
    for i = 0 to n - 1
        for j = 0 to n - i - 1
            if array.get(arr, j) < array.get(arr, j + 1)
                temp = array.get(arr, j)
                temp_index = array.get(arr_index, j)
                array.set(arr, j, array.get(arr, j + 1))
                array.set(arr, j + 1, temp)
                array.set(arr_index, j, array.get(arr_index, j + 1))
                array.set(arr_index, j + 1, temp_index)

// Safe checks
if min_lookback_tr > max_lookback_tr 
    runtime.error("Min Lookback must be less than Max Lookback")
if min_tp_tr > max_tp_tr 
    runtime.error("Min Take Profit must be less than Max Take Profit")
if min_sl_tr > max_sl_tr
    runtime.error("Min Stop Loss must be less than Max Stop Loss")

// 
tp_min_ = int(min_tp_tr / 1)
tp_max_ = int(max_tp_tr / 1)

sl_min_ = int(min_sl_tr / 1)
sl_max_ = int(max_sl_tr / 1)

// Size for arrays
arr_size = int((max_lookback_tr - min_lookback_tr + 1) * (tp_max_ - tp_min_ + 1) * (sl_max_ - sl_min_ + 1))

// Arrays
var arr_bi = array.new_int(arr_size, na)           // bar_index of Smash Day
var arr_in_pos = array.new_bool(arr_size, false)   // are we in a position?

var arr_params = array.new_string(arr_size, "")
var arr_wonlost = array.new_string(arr_size, "")
var arr_profit = array.new_float(arr_size, 0)

// Testing what parameters are best
index = 0

// Lookback
for lookback_i = min_lookback_tr to max_lookback_tr
    // Take profit
    for tp_i = tp_min_ to tp_max_
        // Stop loss
        for sl_i = sl_min_ to sl_max_
            // Parameters of current iteration
            lookback_ = lookback_i
            tp_ = tp_i
            sl_ = sl_i

            //
            if array.get(arr_params, index) == ""
                array.set(arr_params, index, str.tostring(lookback_) + " " + str.tostring(tp_) + " " + str.tostring(sl_))

            // Was there an entry?
            was_edone = false

            // If entry price reached
            if not array.get(arr_in_pos, index) and not na(array.get(arr_bi, index))
                if high >= high[bar_index - array.get(arr_bi, index)] and bar_index != array.get(arr_bi, index)
                    array.set(arr_in_pos, index, true)
                    was_edone := true

            // If we're in a position
            if array.get(arr_in_pos, index) and bar_index != array.get(arr_bi, index) and not was_edone
                low_sl = low[bar_index - array.get(arr_bi, index)] * (1 - sl_ / 100)
                high_ep = high[bar_index - array.get(arr_bi, index)]
                high_tp = high_ep * (1 + tp_ / 100)

                amount = 100

                // Stop loss
                if low <= low_sl
                    array.set(arr_in_pos, index, false)
                    array.set(arr_wonlost, index, array.get(arr_wonlost, index) + "0")
                    array.set(arr_profit, index, array.get(arr_profit, index) - math.abs(amount / high_ep * low_sl - amount) - com / 100 * amount * 2)
                    array.set(arr_bi, index, na)
                // Take profit
                if high >= high_tp
                    array.set(arr_in_pos, index, false)
                    array.set(arr_wonlost, index, array.get(arr_wonlost, index) + "1")
                    array.set(arr_profit, index, array.get(arr_profit, index) + math.abs(amount / high_ep * high_tp - amount) - com / 100 * amount * 2)
                    array.set(arr_bi, index, na)

            // Entry condition
            cond = barstate.isconfirmed and close < low[1] and high[1] < high[lookback_ + 1] //and not array.get(arr_in_pos, index) 

            // New entry price
            if cond and not array.get(arr_in_pos, index)
                array.set(arr_bi, index, bar_index)
            
            // Update index
            index := index + 1

// Checking the results
var table t = na
var result_index = array.new_int(0, na)
var result_arr_winrate = array.new_float(0, na)
var result_arr_tradenum = array.new_int(0, na)
var sort_array = array.new_float(0, na)

if (barstate.islast or barstate.islastconfirmedhistory) and na(t)
    for i = 0 to array.size(arr_params) - 1
        wins = 0
        losses = 0
        arr = array.get(arr_wonlost, i)
        for j = 0 to str.length(arr) - 1
            str_ = str.substring(arr, j, j + 1)
            if str_ == "0"
                losses := losses + 1
            if str_ == "1"
                wins := wins + 1
        // Push percentage profitable trades
        perc_profit = math.round(wins / (wins + losses) * 100, 2)
        array.push(result_arr_winrate, perc_profit)
        // Push number of trades
        trade_num = str.length(array.get(arr_wonlost, i))
        array.push(result_arr_tradenum, trade_num)
        // Push index
        array.push(result_index, i)
        // For combined sorting                          
        array.push(sort_array, (imp_netprofit ? array.get(arr_profit, i) : 1) * (imp_perc_profit ? perc_profit : 1) * (imp_numtrades ? trade_num : 1))

    // Sort
    sortArr(array.copy(sort_array), result_index)

    t := table.new(columns=6, rows=13, bgcolor=color.white, border_color=color.new(color.blue, 0), border_width=1, frame_color=color.new(color.blue, 0), frame_width=1, position=table_pos_)

    table.cell(t, 0, 0, "% Profitable" + (imp_perc_profit ? " ↓" : ""), bgcolor=imp_perc_profit ? color.rgb(23, 18, 25) : color.white, text_color=imp_perc_profit ? color.white : color.black, text_size=table_font_size_)
    table.cell(t, 1, 0, "Net Profit" + (imp_netprofit ? " ↓" : ""), bgcolor=imp_netprofit ? color.rgb(23, 18, 25) : color.white, text_color=imp_netprofit ? color.white : color.black, text_size=table_font_size_)
    table.cell(t, 2, 0, "# of trades" + (imp_numtrades ? " ↓" : ""), bgcolor=imp_numtrades ? color.rgb(23, 18, 25) : color.white, text_color=imp_numtrades ? color.white : color.black, text_size=table_font_size_)
    table.cell(t, 3, 0, "Lookback", text_size=table_font_size_)
    table.cell(t, 4, 0, "Take Profit %", text_size=table_font_size_)
    table.cell(t, 5, 0, "Stop Loss %", text_size=table_font_size_)

    counter = 0
    forloop_counter = math.min(array.size(result_index) - 1, 10)
    for i = 0 to forloop_counter
        i_ = array.get(result_index, i)
        params_ = str.split(array.get(arr_params, i_), " ")
        col_ = color.new(color.blue, 75)
        table.cell(t, 0, i + 1, str.tostring(array.get(result_arr_winrate, i_)) + "%", bgcolor=col_, text_size=table_font_size_)
        table.cell(t, 1, i + 1, str.tostring(math.round(array.get(arr_profit, i_), 2)) + "$", bgcolor=col_, text_size=table_font_size_)
        table.cell(t, 2, i + 1, str.tostring(array.get(result_arr_tradenum, i_)), bgcolor=col_, text_size=table_font_size_)
        table.cell(t, 3, i + 1, array.get(params_, 0), bgcolor=col_, text_size=table_font_size_)
        table.cell(t, 4, i + 1, array.get(params_, 1), bgcolor=col_, text_size=table_font_size_)
        table.cell(t, 5, i + 1, array.get(params_, 2), bgcolor=col_, text_size=table_font_size_)
        counter := counter + 1

    // Warn if timeframe is <= 10 minutes
    if timeframe.in_seconds(timeframe.period) <= 600
        table.cell(t, 0, forloop_counter + 2, "Timeframe might be too low", bgcolor=color.orange, text_size=table_font_size_, tooltip="Selected timeframe might be too low and cause an error")
        table.merge_cells(t, 0, forloop_counter + 2, 5, forloop_counter + 2)

// Strategy
var int bi = na
var int pos_bi = na

// Buy condition
cond = barstate.isconfirmed and close < low[1] and high[1] < high[lookback + 1] and strategy.position_size == 0 

// Stop loss, Take profit
if strategy.position_size[1] == 0 and strategy.position_size > 0 and bar_index != bi
    strategy.exit("TP/SL", "Long", stop=low[bar_index - bi] * (1 - sl / 100), limit=high[bar_index - bi] * (1 + tp / 100))
    pos_bi := bar_index

// Buy
if cond 
    strategy.order("Long", strategy.long, stop=high)
    bi := bar_index

// Box
if strategy.position_size[1] != 0 and strategy.position_size == 0
    tn = strategy.closedtrades - 1
    penp = strategy.closedtrades.entry_price(tn)
    pexp = strategy.closedtrades.exit_price(tn)




```

> Detail

https://www.fmz.com/strategy/429513

> Last Modified

2023-10-17 17:26:03
