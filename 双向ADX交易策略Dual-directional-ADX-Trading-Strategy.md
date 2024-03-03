
> Name

双向ADX交易策略Dual-directional-ADX-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ad58a4a820714a412d.png)
 [trans]
### 概述

双向ADX交易策略是一种利用平均方向指数(ADX)指标实现双向交易的量化策略。该策略通过计算ADX指标与DIPlus和DIMinus指标差值,设定门限判断是否产生交易信号,进行多空头交易,实现盈利。

### 策略原理

1. 计算真实波动范围(True Range)
2. 计算多头方向运动(Directional Movement Plus)和空头方向运动(Directional Movement Minus)
3. 计算平滑真实波动范围(Smoothed True Range)
4. 计算平滑多头运动(Smoothed Directional Movement Plus)和平滑空头运动(Smoothed Directional Movement Minus)
5. 计算DIPlus、DIMinus和ADX指标
6. 计算DIPlus与ADX、DIMinus与ADX之间差值
7. 设定多头和空头交易差值阈值
8. 当差值大于阈值时判断产生交易信号
9. 产生买入和卖出委托

该策略核心在于利用ADX等动向指数指标判断趋势方向和强度,结合差值判定法则设定阈值,进行自动交易。

### 优势分析

1. 利用ADX判断趋势方向,可以准确捕捉市场趋势
2. 应用差值判定法则,可以有效过滤假信号
3. 双向交易,可以充分捕捉多头和空头机会
4. 全自动交易,无需人工干预
5. 策略逻辑清晰,易于理解和修改

### 风险分析

1. ADX指标存在滞后,可能错过趋势转折点
2. 双向交易风险加大,亏损可能扩大
3. 设定参数不当可能导致过度交易
4. 回测数据无法代表真实市场,实盘风险仍存在

解决方法:

1. 结合其他指标确认交易信号
2. 优化参数,控制交易频率
3. 严格 Position Sizing管理交易仓位 

### 优化方向

1. 优化ADX参数,改善其灵敏度
2. 增加其他指标过滤信号
3. 应用机器学习算法优化参数
4. 利用高级止损策略控制亏损风险
5. 结合模型预测得到更准确交易信号

### 总结

双向ADX交易策略overall是一个非常实用的量化策略。它利用ADX指标判断趋势,双向捕捉交易机会。同时应用差值判定确保信号有效性。该策略逻辑清晰简单,易于修改优化,是一种双向趋势跟踪交易策略。通过合理的参数优化、止损策略的应用以及信号过滤,可以进一步增强策略的稳定性和盈利能力。

||

### Overview  

The dual-directional ADX trading strategy is a quantitative strategy that implements dual-directional trading using the Average Directional Index (ADX) indicator. The strategy generates trading signals by calculating the difference between the ADX indicator and the DIPlus and DIMinus indicators and setting thresholds to determine long and short entries for profit.

### Strategy Logic  

1. Calculate the True Range
2. Calculate the Directional Movement Plus and Directional Movement Minus
3. Calculate the Smoothed True Range  
4. Calculate the Smoothed Directional Movement Plus and Smoothed Directional Movement Minus
5. Calculate the DIPlus, DIMinus and ADX indicators  
6. Calculate the difference between DIPlus & ADX and DIMinus & ADX
7. Set thresholds for long and short trade differences
8. Generate trading signals when difference exceeds thresholds
9. Create buy and sell orders  

The core of this strategy is using ADX and directional movement indicators to determine trend direction and strength, combined with difference threshold rules to filter signals and automate trading.  

### Advantage Analysis   

1. ADX accurately captures market trend  
2. Difference threshold rules effectively filter false signals
3. Dual-directional trading fully captures long and short opportunities  
4. Fully automated trading without manual intervention  
5. Clear strategy logic, easy to understand and modify  

### Risk Analysis  

1. ADX has lag, may miss trend turning points  
2. Increased risk from dual-directional trading, larger losses
3. Improper parameter setting may cause over-trading  
4. Backtest data cannot represent real market, real trading risk exists  

Solutions:  

1. Confirm signals with other indicators  
2. Optimize parameters, control trade frequency  
3. Strict position sizing to manage position size  

### Optimization Directions   

1. Optimize ADX parameters to improve sensitivity  
2. Add other indicators to filter signals  
3. Apply machine learning to optimize parameters  
4. Use advanced stop loss strategies to control losses 
5. Combine with model predictions for more accurate signals  

### Conclusion  

The dual-direction ADX trading strategy overall is a very practical quantitative strategy. It identifies trends using the ADX indicator and captures trading opportunities in both directions. Meanwhile, it uses difference thresholds to validate signal effectiveness. The strategy has clear and simple logic that is easy to modify and optimize. It is a dual-directional trend following system. Further improvements in stability and profitability can be achieved through parameter optimization, stop loss strategies, and signal filtration.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|len|
|v_input_2|20|th|
|v_input_3|10|Long Difference|
|v_input_4|10|Short Difference|
|v_input_bool_1|true|(?Monthly Performance)Show Monthly Monthly Performance ?|
|v_input_5|0|Location: Bottom Right|Top Right|Top Left|Bottom Left|Middle Right|Bottom Center|
|v_input_6|0|Size: Small|Tiny|Normal|Large|
|v_input_color_1|#07e2f2|Background Color|
|v_input_color_2|#000000|Month/Year Heading Color|
|v_input_color_3|white|Month PnL Data Color|
|v_input_color_4|#000000|Year PnL Data Color|
|v_input_color_5|white|Table Border Color|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MAURYA_ALGO_TRADER

//@version=5
strategy("Monthly Performance", overlay=true)


len = input(14)
th = input(20)

TrueRange = math.max(math.max(high - low, math.abs(high - nz(close[1]))), math.abs(low - nz(close[1])))
DirectionalMovementPlus = high - nz(high[1]) > nz(low[1]) - low ? math.max(high - nz(high[1]), 0) : 0
DirectionalMovementMinus = nz(low[1]) - low > high - nz(high[1]) ? math.max(nz(low[1]) - low, 0) : 0

SmoothedTrueRange = 0.0
SmoothedTrueRange := nz(SmoothedTrueRange[1]) - nz(SmoothedTrueRange[1]) / len + TrueRange

SmoothedDirectionalMovementPlus = 0.0
SmoothedDirectionalMovementPlus := nz(SmoothedDirectionalMovementPlus[1]) - nz(SmoothedDirectionalMovementPlus[1]) / len + DirectionalMovementPlus

SmoothedDirectionalMovementMinus = 0.0
SmoothedDirectionalMovementMinus := nz(SmoothedDirectionalMovementMinus[1]) - nz(SmoothedDirectionalMovementMinus[1]) / len + DirectionalMovementMinus

DIPlus = SmoothedDirectionalMovementPlus / SmoothedTrueRange * 100
DIMinus = SmoothedDirectionalMovementMinus / SmoothedTrueRange * 100
DX = math.abs(DIPlus - DIMinus) / (DIPlus + DIMinus) * 100
ADX = ta.sma(DX, len)

// plot(DIPlus, color=color.new(color.green, 0), title='DI+')
// plot(DIMinus, color=color.new(color.red, 0), title='DI-')
// plot(ADX, color=color.new(color.white, 0), title='ADX')
// hline(th, color=color.black)


//diff_1 = math.abs(DIPlus - DIMinus)
diff_2 = math.abs(DIPlus-ADX)
diff_3 = math.abs(DIMinus - ADX)

long_diff = input(10, "Long Difference")
short_diff = input(10, "Short Difference")

buy_condition = diff_2 >=long_diff and diff_3 >=long_diff and (ADX < DIPlus and ADX > DIMinus)
sell_condition = diff_2 >=short_diff and diff_3 >=short_diff and (ADX > DIPlus and ADX < DIMinus)


if buy_condition
    strategy.entry("Long Entry", strategy.long, comment = "Long")
if sell_condition
    strategy.entry("Short Entry", strategy.short, comment = "Short")



// Copy below code to end of the desired strategy script
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                 monthly pnl performance  by Dr. Maurya @MAURYA_ALGO_TRADER                        //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
show_performance = input.bool(true, 'Show Monthly Monthly Performance ?', group='Monthly Performance')

dash_loc_mp = input("Bottom Right","Location"  ,options=["Top Right","Bottom Right","Top Left","Bottom Left", "Middle Right","Bottom Center"]  ,group='Monthly Performance', inline = "performance")

text_size_mp = input('Small',"Size"  ,options=["Tiny","Small","Normal","Large"]  ,group='Monthly Performance', inline = "performance")

bg_c = input.color( color.rgb(7, 226, 242, 38), "Background Color", group='Monthly Performance')

text_head_color = input.color( color.rgb(0,0,0), "Month/Year Heading Color", group='Monthly Performance')

tab_month_c = input.color( color.white, "Month PnL Data Color", group='Monthly Performance')

tab_year_c = input.color( color.rgb(0,0,0), "Year PnL Data Color", group='Monthly Performance')

border_c = input.color( color.white, "Table Border Color", group='Monthly Performance')



var table_position_mp = dash_loc_mp == 'Top Left' ? position.top_left :
  dash_loc_mp == 'Bottom Left' ? position.bottom_left :
  dash_loc_mp == 'Middle Right' ? position.middle_right :
  dash_loc_mp == 'Bottom Center' ? position.bottom_center :
  dash_loc_mp == 'Top Right' ? position.top_right : position.bottom_right
  
var table_text_size_mp = text_size_mp == 'Tiny' ? size.tiny :
  text_size_mp == 'Small' ? size.small :
  text_size_mp == 'Normal' ? size.normal : size.large

/////////////////

strategy.initial_capital = 50000

/////////////////////////////////////////////

// var bool new_month = na
new_month = ta.change(month) //> 0 ? true : false
newest_month = new_month and strategy.closedtrades >= 1

// profit
only_profit = strategy.netprofit
initial_balance = strategy.initial_capital

// month number
var int month_number = na
month_number := (ta.valuewhen(newest_month, month(time), 0)) //and month(time) > 1 ? (ta.valuewhen(newest_month, month(time), 0) - 1) :  12 //1 to 12

//month_year
var int month_time = na
month_time := ta.valuewhen(newest_month, time, 0) - 2419200000 


var int m_counter = 0
if newest_month
    m_counter += 1



// current month values
var bool new_year = na
new_year := ta.change(year)
curr_m_pnl = only_profit - nz(ta.valuewhen(newest_month, only_profit, 0), 0)
curr_m_number = newest_month ? ta.valuewhen(newest_month, month(time), 0) : month(time)
curr_y_pnl = (only_profit - nz(ta.valuewhen(new_year, only_profit, 0),0)) 



var float [] net_profit_array = array.new_float()
var int [] month_array = array.new_int()
var int [] month_time_array = array.new_int()


if newest_month
    array.push(net_profit_array, only_profit)
    array.push(month_array, month_number)
    array.push(month_time_array, month_time)



var float [] y_pnl_array = array.new_float()
var int [] y_number_array = array.new_int()
var int [] y_time_array = array.new_int()

newest_year = ta.change(year) and strategy.closedtrades >= 1
get_yearly_pnl = nz(ta.valuewhen(newest_year, strategy.netprofit, 0) - nz(ta.valuewhen(newest_year, strategy.netprofit, 1), 0), 0)
get_m_year = ta.valuewhen(newest_year, year(time), 1)
get_y_time = ta.valuewhen(newest_year, time, 0)

if newest_year
    array.push(y_pnl_array, get_yearly_pnl)
    array.push(y_number_array, get_m_year)
    array.push(y_time_array, get_y_time)
var float monthly_profit = na
var int column_month_number = na
var int row_month_time = na

 


var testTable = table.new(position = table_position_mp, columns = 14, rows = 40, bgcolor = bg_c, border_color = border_c, border_width = 1)
if barstate.islastconfirmedhistory and show_performance
    table.cell(table_id = testTable, column = 0, row = 0, text = "YEAR", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 1, row = 0, text = "JAN", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 2, row = 0, text = "FEB", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 3, row = 0, text = "MAR", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 4, row = 0, text = "APR", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 5, row = 0, text = "MAY", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 6, row = 0, text = "JUN", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 7, row = 0, text = "JUL", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 8, row = 0, text = "AUG", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 9, row = 0, text = "SEP", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 10, row = 0, text = "OCT", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 11, row = 0, text = "NOV", text_color = text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 12, row = 0, text = "DEC", text_color =text_head_color, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 13, row = 0, text = "YEAR P/L", text_color = text_head_color, text_size=table_text_size_mp)

    for i = 0 to (array.size(y_number_array) == 0 ? na : array.size(y_number_array) - 1)
        row_y = year(array.get(y_time_array, i)) - year(array.get(y_time_array, 0)) + 1
        table.cell(table_id = testTable, column = 13, row = row_y, text = str.tostring(array.get(y_pnl_array , i), "##.##") + '\n' + '(' + str.tostring(array.get(y_pnl_array , i)*100/initial_balance, "##.##") + ' %)', bgcolor = array.get(y_pnl_array , i) > 0 ? color.green : array.get(y_pnl_array , i) < 0 ? color.red : color.gray, text_color = tab_year_c, text_size=table_text_size_mp)
    curr_row_y = array.size(month_time_array) == 0 ? 1 : (year(array.get(month_time_array, array.size(month_time_array) - 1))) - (year(array.get(month_time_array, 0))) + 1
    table.cell(table_id = testTable, column = 13, row = curr_row_y, text = str.tostring(curr_y_pnl, "##.##") + '\n' + '(' + str.tostring(curr_y_pnl*100/initial_balance, "##.##") + ' %)', bgcolor = curr_y_pnl > 0 ? color.green : curr_y_pnl < 0 ? color.red : color.gray, text_color = tab_year_c, text_size=table_text_size_mp)
    

    for i = 0 to (array.size(net_profit_array) == 0 ? na : array.size(net_profit_array) - 1)
        monthly_profit := i > 0 ? ( array.get(net_profit_array, i) - array.get(net_profit_array, i - 1) ) : array.get(net_profit_array, i) 
        column_month_number := month(array.get(month_time_array, i)) 
        row_month_time :=((year(array.get(month_time_array, i))) - year(array.get(month_time_array, 0)) ) + 1 
        table.cell(table_id = testTable, column = column_month_number, row = row_month_time, text = str.tostring(monthly_profit, "##.##") + '\n' + '(' + str.tostring(monthly_profit*100/initial_balance, "##.##") + ' %)', bgcolor = monthly_profit > 0 ? color.green : monthly_profit < 0 ? color.red : color.gray, text_color = tab_month_c, text_size=table_text_size_mp)
        table.cell(table_id = testTable, column = 0, row =row_month_time, text = str.tostring(year(array.get(month_time_array, i)), "##.##"), text_color = text_head_color, text_size=table_text_size_mp)
       
    curr_row_m = array.size(month_time_array) == 0 ? 1 : (year(array.get(month_time_array, array.size(month_time_array) - 1))) - (year(array.get(month_time_array, 0))) + 1
    table.cell(table_id = testTable, column = curr_m_number, row = curr_row_m, text = str.tostring(curr_m_pnl, "##.##") + '\n' + '(' + str.tostring(curr_m_pnl*100/initial_balance, "##.##") + ' %)', bgcolor = curr_m_pnl > 0 ? color.green : curr_m_pnl < 0 ? color.red : color.gray, text_color = tab_month_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 0, row =curr_row_m, text = str.tostring(year(time), "##.##"), text_color = text_head_color, text_size=table_text_size_mp)

//============================================================================================================================================================================
```

> Detail

https://www.fmz.com/strategy/440455

> Last Modified

2024-01-30 17:00:44
