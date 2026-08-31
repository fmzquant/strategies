
> Name

Monthly-Performance-PnL-Calendar-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1129a28cb6e7ab90f50.png)

## Overview

The main function of this strategy is to track and display the monthly performance in real time. It will update the profit and loss of each month in a table in real time.  

## Principle  

The strategy achieves monthly performance tracking through the following steps:

1. Define variables to record whether there are closed trades this month.  
2. Define variables to record the specific profit and loss value of each month.
3. Define variables to record the month corresponding to the time.  
4. When there are closed trades this month, record the monthly PnL and month into corresponding arrays.
5. Display month titles in specified positions in the table.
6. Traverse the monthly PnL array and display PnL values in the corresponding month columns in the table.
7. Display the corresponding year info at the same time.
8. Summarize the PnL of each year.  
9. Use colors to distinguish positive and negative PnLs.

Above are the basic steps and working principles of this strategy.   

## Advantage Analysis   

This kind of monthly performance tracking strategy has the following advantages:  

1. Real-time update to view the latest monthly PnL status anytime. 
2. Intuitive display of specific monthly PnL in tables. 
3. Fine-grained to see details of each month clearly.  
4. Intuitive comparison by using colors to contrast monthly PnLs more visually.
5. Statistical summation also provides annual PnL summation.   
6. Customizable display to adjust table location, size etc.

## Risk Analysis

This strategy also has some risks:  

1. Complex logic can cause inaccurate data due to errors.
2. Too frequent table refresh may affect performance. 
3. Array data storage is less efficient.
4. Time and month conversion calculations may go wrong.

Risks can be reduced through:

1. Strict code review to ensure correct logic.  
2. Optimize refresh frequency to prevent over-refreshing.
3. Use more efficient data structures to store data.  
4. Add exception handling for time and month conversions.

## Optimization

Optimizations of this strategy:  

1. Use more efficient data structures like dictionaries to store monthly data.  
2. Add annualized return calculations. 
3. Add other metrics like rate of change.
4. Visually display return curves.
5. Support custom time range for statistics.  
6. Support exporting data to CSV files.

These can improve the strategy's functionality and user experience.   

## Conclusion  

This strategy achieves the core function of real-time tracking and displaying monthly returns using arrays and tables. It is simple, efficient and easy to use. It also has some advantages but there are still some risks to prevent. With optimizations in logic and performance, it can become more perfect and powerful. Overall a very practical monthly performance tracking strategy.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_bool_1|true|(?Monthly Performance)Show Monthly Monthly Performance ?|
|v_input_2|0|Location: Bottom Right|Top Right|Top Left|Bottom Left|Middle Right|Bottom Center|
|v_input_3|0|Size: Small|Tiny|Normal|Large|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MAURYA_ALGO_TRADER

//@version=5
strategy("Monthly Performance", overlay=true)

period = input(20, "Length")

longCondition =   close > high[20]  //ta.crossover(ta.sma(close, 14), ta.sma(close, 28))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = close < low[20]  //ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)



// Copy below code to end of the desired strategy script
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                 monthly pnl performance  by Dr. Maurya @MAURYA_ALGO_TRADER                        //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
show_performance = input.bool(true, 'Show Monthly Monthly Performance ?', group='Monthly Performance')

dash_loc_mp = input("Bottom Right","Location"  ,options=["Top Right","Bottom Right","Top Left","Bottom Left", "Middle Right","Bottom Center"]  ,group='Monthly Performance', inline = "performance")

text_size_mp = input('Small',"Size"  ,options=["Tiny","Small","Normal","Large"]  ,group='Monthly Performance', inline = "performance")

var table_position_mp = dash_loc_mp == 'Top Left' ? position.top_left :
  dash_loc_mp == 'Bottom Left' ? position.bottom_left :
  dash_loc_mp == 'Middle Right' ? position.middle_right :
  dash_loc_mp == 'Bottom Center' ? position.bottom_center :
  dash_loc_mp == 'Top Right' ? position.top_right : position.bottom_right
  
var table_text_size_mp = text_size_mp == 'Tiny' ? size.tiny :
  text_size_mp == 'Small' ? size.small :
  text_size_mp == 'Normal' ? size.normal : size.large

/////////////////
text_c = color.white

/////////////////////////////////////////////

// var bool new_month = na
new_month = ta.change(month) //> 0 ? true : false
newest_month = new_month and strategy.closedtrades >= 1
strategy.initial_capital = 50000
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

 


var testTable = table.new(position = table_position_mp, columns = 14, rows = 40, bgcolor = color.rgb(7, 226, 242, 38), border_color = color.white, border_width = 1)
if barstate.islastconfirmedhistory and show_performance
    table.cell(table_id = testTable, column = 0, row = 0, text = "YEAR", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 1, row = 0, text = "JAN", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 2, row = 0, text = "FEB", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 3, row = 0, text = "MAR", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 4, row = 0, text = "APR", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 5, row = 0, text = "MAY", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 6, row = 0, text = "JUN", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 7, row = 0, text = "JUL", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 8, row = 0, text = "AUG", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 9, row = 0, text = "SEP", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 10, row = 0, text = "OCT", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 11, row = 0, text = "NOV", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 12, row = 0, text = "DEC", text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 13, row = 0, text = "YEAR P/L", text_color = text_c, text_size=table_text_size_mp)

    for i = 0 to (array.size(y_number_array) == 0 ? na : array.size(y_number_array) - 1)
        row_y = year(array.get(y_time_array, i)) - year(array.get(y_time_array, 0)) + 1
        table.cell(table_id = testTable, column = 13, row = row_y, text = str.tostring(array.get(y_pnl_array , i), "##.##") + '\n' + '(' + str.tostring(array.get(y_pnl_array , i)*100/initial_balance, "##.##") + ' %)', bgcolor = array.get(y_pnl_array , i) > 0 ? color.green : array.get(y_pnl_array , i) < 0 ? color.red : color.gray, text_color = color.rgb(0, 0, 0), text_size=table_text_size_mp)
    curr_row_y = array.size(month_time_array) == 0 ? 1 : (year(array.get(month_time_array, array.size(month_time_array) - 1))) - (year(array.get(month_time_array, 0))) + 1
    table.cell(table_id = testTable, column = 13, row = curr_row_y, text = str.tostring(curr_y_pnl, "##.##") + '\n' + '(' + str.tostring(curr_y_pnl*100/initial_balance, "##.##") + ' %)', bgcolor = curr_y_pnl > 0 ? color.green : curr_y_pnl < 0 ? color.red : color.gray, text_color = color.rgb(0, 0, 0), text_size=table_text_size_mp)
    

    for i = 0 to (array.size(net_profit_array) == 0 ? na : array.size(net_profit_array) - 1)
        monthly_profit := i > 0 ? ( array.get(net_profit_array, i) - array.get(net_profit_array, i - 1) ) : array.get(net_profit_array, i) 
        column_month_number := month(array.get(month_time_array, i)) 
        row_month_time :=((year(array.get(month_time_array, i))) - year(array.get(month_time_array, 0)) ) + 1 
        table.cell(table_id = testTable, column = column_month_number, row = row_month_time, text = str.tostring(monthly_profit, "##.##") + '\n' + '(' + str.tostring(monthly_profit*100/initial_balance, "##.##") + ' %)', bgcolor = monthly_profit > 0 ? color.green : monthly_profit < 0 ? color.red : color.gray, text_color = text_c, text_size=table_text_size_mp)
        table.cell(table_id = testTable, column = 0, row =row_month_time, text = str.tostring(year(array.get(month_time_array, i)), "##.##"), text_color = text_c, text_size=table_text_size_mp)
       
    curr_row_m = array.size(month_time_array) == 0 ? 1 : (year(array.get(month_time_array, array.size(month_time_array) - 1))) - (year(array.get(month_time_array, 0))) + 1
    table.cell(table_id = testTable, column = curr_m_number, row = curr_row_m, text = str.tostring(curr_m_pnl, "##.##") + '\n' + '(' + str.tostring(curr_m_pnl*100/initial_balance, "##.##") + ' %)', bgcolor = curr_m_pnl > 0 ? color.green : curr_m_pnl < 0 ? color.red : color.gray, text_color = text_c, text_size=table_text_size_mp)
    table.cell(table_id = testTable, column = 0, row =curr_row_m, text = str.tostring(year(time), "##.##"), text_color = text_c, text_size=table_text_size_mp)

//============================================================================================================================================================================
```

> Detail

https://www.fmz.com/strategy/438052

> Last Modified

2024-01-08 16:16:58
