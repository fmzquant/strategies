
> Name

跟踪止损移动均线交易策略Tracking-Stop-Loss-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a7748dca2e41280b0b.png)
[trans]

## 概述
本策略是一个基于移动均线的跟踪止损交易策略。它使用两个不同周期的EMA均线进行金叉死叉判断,在发生金叉时做多,发生死叉时做空。同时,策略利用百分比或固定点数的方式来 trailing 止损和止盈位。这使得策略可以在保持盈利的同时有效控制风险。

## 策略原理  
本策略使用快慢两条EMA均线。快线周期短,反应敏感;慢线周期长,反应稳定。两线向上交叉时产生金叉信号买入;向下交叉时则产生死叉信号卖出。这是移动均线策略的基本原理。

在此基础上,本策略采用 trailing 的方式移动止损位和止盈位。具体来说,交易后止损位和止盈位会随着价格的运行不断向有利方向移动,以锁定盈利,同时控制风险。移动的幅度可以按百分比或固定点数来设置。这使得止盈止损更加灵活和智能。

## 策略优势  
1. 运用双EMA形成交易信号,回报稳定。
2. trailing 止损止盈机制锁定盈利并有效控制风险。  
3. 可以选择百分比或固定点数方式来 trailing,灵活度高。
4. 在长时间框架内,跟踪止损收益表现良好。

## 策略风险与优化  
1. 在震荡行情中,可能出现止损过于频繁而影响盈利的情况。可以适当放宽止损位,或增加移动止损的启动幅度。
2. EMA均线本身具有一定的滞后性,可能miss部分交易机会。可以考虑加入 Momentum 等指标提高策略的敏感度。  
3. 回测数据不充分可能导致过拟合。应该在更长的时间框架和更多品种中进行充分验证。

## 总结  
本策略整合运用了移动均线形成交易信号和趋势跟踪两大技术优势。在长线上表现较为稳定优异,属于具有实战价值的量化策略之一。通过参数调整和组合优化,本策略可以进一步增强效果,值得实盘验证。

||

## Overview  
This is a tracking stop loss trading strategy based on moving average. It uses two EMA lines with different periods to generate golden cross and dead cross signals for long and short trades. Meanwhile, the strategy utilizes percentage or fixed points method to trail stop loss and take profit levels. This allows the strategy to lock in profits while effectively controlling risks.  

## Strategy Logic
The strategy employs fast and slow EMA lines. The fast EMA reacts sensitively while the slow EMA moves in a more stable manner. Golden cross is formed when the two lines move up to intersect, generating buy signals. Dead cross occurs when they intersect downwards, prompting sell signals. This is the underlying rationale behind moving average strategies.  

On top of that, the strategy trails stop loss and profit target once trade is entered. Specifically, the stop loss and profit target levels will adjust towards favorable direction as price fluctuates. This allows profits to be locked while risks are capped. The trailing pace can be configured using percentage or fixed points. This makes the stop loss and take profit mechanism more flexible and intelligent.

## Advantages
1. Utilizes dual EMA crossovers to generate quality signals and steady returns.  
2. Trailing stop loss and take profit locks in profits and controls risks effectively.
3. Supports both percentage and fixed points for flexible trailing.  
4. Performs well in long run with trailing mechanism.

## Risks & Optimization   
1. Overly frequent stop loss triggers may impact profitability in ranging markets. Widen stop loss zone or increase activation level of trailing.
2. EMA crossover signals have lagging effect and may miss some opportunities. Consider adding Momentum to improve sensitivity.   
3. Insufficient backtest data may cause overfitting. Validate thoroughly across longer timeframe and more products.  

## Conclusion
The strategy integrates the strengths of moving average signaling and trend tracking techniques. It demonstrates steady and stellar performance over long term and possesses practical value for live trading. Further improvements can be achieved through parameter tuning and combination optimization. The strategy merits real-world verification.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|━━━━━━━ ↓ Pivot parameters for trade ↓ ━━━━━━━|
|v_input_int_1|20|Fast len|
|v_input_int_2|50|Slow len|
|v_input_color_1|white|BG color for ongoing trade SL/Target label|
|v_input_string_1|0|Method to be used for SL/Target trailing: % Based Target and SL|Fix point Based Target and SL|
|v_input_bool_2|true|━━━━━━━ ↓ % Based Target and SL ↓ ━━━━━━━|
|v_input_float_1|true|Inital profit %|
|v_input_float_2|true|Inital SL %|
|v_input_float_3|0.5|Initiate trailing %|
|v_input_float_4|0.3|Trail profit by %|
|v_input_float_5|0.3|Trail SL by %|
|v_input_bool_3|false|━━━━━━━ ↓ Fix point Based Target and SL ↓ ━━━━━━━|
|v_input_float_6|100|Inital profit target points|
|v_input_float_7|50|Inital SL points|
|v_input_float_8|60|Initiate trailing points|
|v_input_float_9|25|Trail profit by points|
|v_input_float_10|30|Trail SL by %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-31 00:00:00
end: 2024-01-31 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Sharad_Gaikwad
//@version=5

strategy("Traling.SL.Target", overlay=true, process_orders_on_close = true, max_labels_count = 500)
// << Parameters section {
_1 = input.bool(title = "━━━━━━━ ↓ Pivot parameters for trade ↓ ━━━━━━━", defval = false)
fast_len = input.int(title = 'Fast len', defval = 20)
slow_len = input.int(title = 'Slow len', defval = 50)
label_bg_color = input.color(title = 'BG color for ongoing trade SL/Target label', defval=color.white)
sl_target_method = input.string(title = 'Method to be used for SL/Target trailing', defval='% Based Target and SL', options = ['% Based Target and SL','Fix point Based Target and SL'])
_2 = input.bool(title = "━━━━━━━ ↓ % Based Target and SL ↓ ━━━━━━━", defval = true)
initial_profit_percent = input.float(title = 'Inital profit %', defval = 1) / 100
initial_sl_percent = input.float(title = 'Inital SL %', defval = 1) / 100
initiate_trailing_percent = input.float(title = 'Initiate trailing %', defval = 0.5, tooltip = 'Initiate trailing of target and SL after change in price in % after taking trade') / 100
trail_profit_percent = input.float(title = 'Trail profit by %', defval = 0.3) / 100
trail_sl_percent = input.float(title = 'Trail SL by %', defval = 0.3) / 100

_3 = input.bool(title = "━━━━━━━ ↓ Fix point Based Target and SL ↓ ━━━━━━━", defval = false)
initial_profit_points = input.float(title = 'Inital profit target points', defval = 100)
initial_sl_points = input.float(title = 'Inital SL points', defval = 50)
initiate_trailing_points = input.float(title = 'Initiate trailing points', defval = 60, tooltip = 'Initiate trailing of target and SL after change in price in points after taking trade')
trail_profit_points = input.float(title = 'Trail profit by points', defval = 25)
trail_sl_points = input.float(title = 'Trail SL by %', defval = 30)
// } Parameters section >>


// } << Common function {
tab = table.new(position=position.bottom_right, columns=7, rows=200,frame_color = color.yellow, frame_width = 1)
msg(int row, int col, string msg_str, clr=color.blue) =>
    table.cell(table_id=tab, column=col, row=row, text=msg_str, text_color=clr)

getVal(val) =>
    ret_val = na(val) ? 0 : val

t(val) => str.tostring(val, "0.00")

timeToString(int _t) =>
         str.tostring(dayofmonth(_t), '00') + '/' + 
         str.tostring(month(_t), '00') + '/' + 
         str.tostring(year(_t), '0000') + ' ' + 
         str.tostring(hour(_t), '00') + ':' + 
         str.tostring(minute(_t), '00') + ':' + 
         str.tostring(second(_t), '00')
    
// } Common functions>>


// Variable declarations {
percent_based = sl_target_method  == '% Based Target and SL' ? true : false
var initial_long_entry_price = float(na)
var initial_short_entry_price = float(na)
var long_target = float(na)
var long_sl = float(na)
var short_target = float(na)
var short_sl = float(na)
var long_entry_price = float(na)
var short_entry_price = float(na)
var initial_long_percent_target = float(na)
var initial_long_percent_sl = float(na)
var initial_long_point_target = float(na)
var initial_long_point_sl = float(na)
var initial_short_percent_target = float(na)
var initial_short_percent_sl = float(na)
var initial_short_point_target = float(na)
var initial_short_point_sl = float(na)
var is_long = bool(na)
var is_short = bool(na)
var trail_long_iteration = int(na)
var trail_short_iteration = int(na)

// }

// derive important variable values



// Strategy logic
fast_ema = ta.ema(close, fast_len)
slow_ema = ta.ema(close, slow_len)
plot(fast_ema, color = color.red)
plot(slow_ema, color = color.green)
go_long = ta.crossover(fast_ema, slow_ema) and strategy.position_size == 0
go_short = ta.crossunder(fast_ema, slow_ema) and strategy.position_size == 0

// barcolor(ph ? color.purple : na, offset = -lb)
// barcolor(pl ? color.yellow : na, offset = -lb)


// barcolor(ph ? color.white : na)
// barcolor(pl ? color.blue : na)

// //trailing logic for long
long_trailing_point = percent_based ? (close >= long_entry_price + (long_entry_price * initiate_trailing_percent)) :
     (close >= long_entry_price + initiate_trailing_points)

short_trailing_point = percent_based ? (close <= short_entry_price - (short_entry_price * initiate_trailing_percent)) :
     (close >= short_entry_price - initiate_trailing_points)

if(is_long and long_trailing_point)
    // initial_long_percent_target = initial_long_percent_target + (initial_long_percent_target * trail_profit_percent)
    // initial_long_percent_sl = initial_long_percent_sl - (initial_long_percent_sl * trail_sl_percent)

    // initial_long_point_target = initial_long_point_target + trail_profit_points
    // initial_long_point_sl = initial_long_point_sl - trail_sl_points
    trail_long_iteration :=  trail_long_iteration + 1
    long_target := percent_based ? (long_target + (long_target * trail_profit_percent)) : 
         (long_target + trail_profit_points)
         
    long_sl := percent_based ? (long_sl + (long_sl * trail_sl_percent)) :
         (long_sl + trail_sl_points)
    
    long_entry_price := percent_based ? (long_entry_price + (long_entry_price * initiate_trailing_percent)) :
         (long_entry_price + initiate_trailing_points)

if(is_short and short_trailing_point)
    // initial_short_percent_target = initial_short_percent_target - (initial_short_percent_target * trail_profit_percent)
    // initial_short_percent_sl = initial_short_percent_sl + (initial_short_percent_sl * trail_sl_percent)

    // initial_short_point_target = initial_short_point_target - trail_profit_points
    // initial_short_point_sl = initial_short_point_sl + trail_sl_points
    trail_short_iteration :=  trail_short_iteration + 1
    short_target := percent_based ? (short_target - (short_target * trail_profit_percent)) : 
         (short_target - trail_profit_points)
         
    short_sl := percent_based ? (short_sl - (short_sl * trail_sl_percent)) :
         (short_sl - trail_sl_points)
    
    short_entry_price := percent_based ? (short_entry_price - (short_entry_price * initiate_trailing_percent)) :
         (short_entry_price - initiate_trailing_points)
    
if(go_long)
    is_long := true
    is_short := false
    trail_long_iteration := 0
    trail_short_iteration := 0
    initial_long_entry_price := close
    long_entry_price := close
    
    initial_long_percent_target := close + (close * initial_profit_percent)
    initial_long_percent_sl := close - (close * initial_sl_percent)

    initial_long_point_target := close + initial_profit_points
    initial_long_point_sl := close - initial_sl_points
    
    long_target := percent_based ? initial_long_percent_target : initial_long_point_target
    long_sl := percent_based ? initial_long_percent_sl : initial_long_point_sl 
    
    strategy.entry(id = 'Long', direction = strategy.long)

if(go_short)
    is_long := false
    is_short := true
    trail_long_iteration := 0
    trail_short_iteration := 0
    initial_short_entry_price := close
    short_entry_price := close

    initial_short_percent_target := close - (close * initial_profit_percent)
    initial_short_percent_sl := close + (close * initial_sl_percent)

    initial_short_point_target := close - initial_profit_points
    initial_short_point_sl := close + initial_sl_points

    short_target := percent_based ? initial_short_percent_target : initial_short_point_target
    short_sl := percent_based ? initial_short_percent_sl : initial_short_point_sl 
    
    strategy.entry(id = 'Short', direction = strategy.short)

method = percent_based ? '% Based' : 'Fixed Points'
long_tooltip = 'Long @ ' + timeToString(time) + '\n' +
     'Method             : ' + method + '\n' +
     'Initial Trade Price: ' + t(initial_long_entry_price) + '\n' +
     'Inital Target      : ' + t(long_target) + '\n' + 
     'Inital SL          : ' + t(long_sl) 

short_tooltip = 'Short @ ' + timeToString(time) + '\n' +
     'Method             : ' + method + '\n' +
     'Initial Trade Price: ' + t(initial_short_entry_price) + '\n' +
     'Inital Target      : ' + t(short_target) + '\n' + 
     'Inital SL          : ' + t(short_sl)
     
     
label.new(go_long ? bar_index : na, go_long ? bar_index : na,
     style = label.style_diamond, yloc = yloc.belowbar, color = color.green, size=size.tiny, tooltip = long_tooltip)
     
label.new(go_short ? bar_index : na, go_short ? bar_index : na,
     style = label.style_diamond, yloc = yloc.abovebar, color = color.red, size=size.tiny, tooltip = short_tooltip)
 
trail_long_tooltip = 'Trail @ ' + timeToString(time) + '\n' +
     'Iteration no : ' + t(trail_long_iteration) + '\n' +
     'New Target   : ' + t(long_target) + '\n' +
     'New SL       : ' + t(long_sl)

trail_short_tooltip = 'Trail @ ' + timeToString(time) + '\n' +
     'Iteration no : ' + t(trail_short_iteration) + '\n' +
     'New Target   : ' + t(short_target) + '\n' +
     'New SL       : ' + t(short_sl) 

label.new(is_long and long_trailing_point and strategy.position_size > 0 ? bar_index : na, is_long and long_trailing_point and strategy.position_size > 0 ? bar_index : na,
      text = str.tostring(trail_long_iteration), style = label.style_circle, textcolor = color.white, yloc = yloc.belowbar, color = color.green, size=size.tiny, tooltip = trail_long_tooltip)
     
label.new(is_short and short_trailing_point and strategy.position_size < 0 ? bar_index : na, is_short and short_trailing_point and strategy.position_size < 0 ? bar_index : na,
     text = str.tostring(trail_short_iteration), style = label.style_circle, textcolor = color.white,  yloc = yloc.abovebar, color = color.red, size=size.tiny, tooltip = trail_short_tooltip)
     
strategy.close(id = 'Long', when = close <= long_sl, comment = 'SL')
strategy.close(id = 'Short', when = close >= short_sl, comment = 'SL')

strategy.close(id = 'Long', when = close >= long_target, comment = 'Target')
strategy.close(id = 'Short', when = close <= short_target, comment = 'Target')

// no_of_labels = 1
// label_q(_array, _val) =>
//     array.push(_array, _val)
//     _return = array.shift(_array)

// var target_label = float(na)
// var sl_label = float(na)
// if(strategy.position_size > 0)
//     target_label := long_target
//     sl_label := long_sl
// else if(strategy.position_size < 0)
//     target_label := short_target
//     sl_label := short_sl
// else
//     target_label := float(na)
//     sl_label := float(na)

// var label[] target_array = array.new_label(no_of_labels)
// label.delete(label_q(target_array, label.new(bar_index, target_label, "Target:"+t(target_label), style = label.style_label_down, color = label_bg_color, size=size.small, textcolor = color.green)))

// var label[] sl_array = array.new_label(no_of_labels)
// label.delete(label_q(sl_array, label.new(bar_index, sl_label, "SL:"+t(sl_label), style = label.style_label_up, color = label_bg_color, size=size.small, textcolor = color.red)))



```

> Detail

https://www.fmz.com/strategy/440689

> Last Modified

2024-02-01 10:59:06
