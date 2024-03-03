
> Name

Moving-Average-Cross

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|Start Date|
|v_input_int_2|true|Start Month|
|v_input_int_3|2012|Start Year|
|v_input_int_4|true|End Date|
|v_input_int_5|true|End Month|
|v_input_int_6|2022|End Year|
|v_input_int_7|69|Slow MA Length|
|v_input_int_8|29|Fast MA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Market-Edge-Trading

//@version=5
strategy("Moving Average Cross", overlay=true, commission_type= strategy.commission.percent, default_qty_value=100, default_qty_type=strategy.percent_of_equity, margin_long = 1, margin_short=1)

// Inputs for configuring sample date range
startDate= input.int(1, title="Start Date", minval=1, maxval=31)
startMonth= input.int(1, title="Start Month", minval=1, maxval=12)
startYear=input.int(2012, title="Start Year", minval=1700, maxval=2100)

endDate= input.int(1, title="End Date", minval=1, maxval=31)
endMonth= input.int(1, title="End Month", minval=1, maxval=12)
endYear=input.int(2022, title="End Year", minval=1700, maxval=2100)

inDateRange = (time >= timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0)) and (time < timestamp(syminfo.timezone, endYear, endMonth, endDate, 0, 0))

// Set up moving averages
Slow_MA_Length = input.int(69, title="Slow MA Length", minval = 1, maxval = 1000)
Slow_MA = ta.sma(close, Slow_MA_Length)
plot(Slow_MA, color=color.white, linewidth=2)

Fast_MA_Length = input.int(29, title="Fast MA Length", minval = 1, maxval = 1000)
Fast_MA = ta.sma(close, Fast_MA_Length)
plot(Fast_MA, color=color.yellow, linewidth=2)

// Set long and short conditions
longCondition = ta.crossover(Fast_MA, Slow_MA)
shortCondition = ta.crossunder(Fast_MA, Slow_MA)

// Make trades
if(longCondition and inDateRange)
    strategy.entry("Long Entry", strategy.long)
    
if(shortCondition and inDateRange)
    strategy.entry("Short Entry", strategy.short)   
    
// Exit open positions when date range ends
if (not inDateRange)
    strategy.close_all()
    
// table of optimized values
testTable = table.new(position = position.top_right, columns = 3, rows = 6, bgcolor = color.black, border_width = 1)
table.cell(table_id = testTable, column = 0, row = 0, text = " ", text_color=color.white)
table.cell(table_id = testTable, column = 1, row = 0, text = "Slow MA", text_color=color.white)
table.cell(table_id = testTable, column = 2, row = 0, text = "Fast MA", text_color=color.white)
table.cell(table_id = testTable, column = 0, row = 1, text = "EURUSD", text_color=color.white)
table.cell(table_id = testTable, column = 1, row = 1, text = "69", bgcolor=color.white)
table.cell(table_id = testTable, column = 2, row = 1, text = "29", bgcolor=color.yellow)
table.cell(table_id = testTable, column = 0, row = 2, text = "BTCUSD", text_color=color.white)
table.cell(table_id = testTable, column = 1, row = 2, text = "44", bgcolor=color.white)
table.cell(table_id = testTable, column = 2, row = 2, text = "13", bgcolor=color.yellow)
table.cell(table_id = testTable, column = 0, row = 3, text = "SP500", text_color=color.white)
table.cell(table_id = testTable, column = 1, row = 3, text = "197", bgcolor=color.white)
table.cell(table_id = testTable, column = 2, row = 3, text = "4", bgcolor=color.yellow)
table.cell(table_id = testTable, column = 0, row = 4, text = "GOLD", text_color=color.white)
table.cell(table_id = testTable, column = 1, row = 4, text = "198", bgcolor=color.white)
table.cell(table_id = testTable, column = 2, row = 4, text = "30", bgcolor=color.yellow)
table.cell(table_id = testTable, column = 0, row = 5, text = "OIL", text_color=color.white)
table.cell(table_id = testTable, column = 1, row = 5, text = "110", bgcolor=color.white)
table.cell(table_id = testTable, column = 2, row = 5, text = "34", bgcolor=color.yellow)






```

> Detail

https://www.fmz.com/strategy/380331

> Last Modified

2022-08-28 07:42:12
