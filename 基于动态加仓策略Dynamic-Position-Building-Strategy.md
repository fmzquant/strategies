
> Name

基于动态加仓策略Dynamic-Position-Building-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11f92c69a06139fb365.png)

## Overview

The main idea of this strategy is to dynamically build a position based on system signals in a bull market to control risks and obtain a lower average entry price.

## Strategy Logic

The strategy first sets the starting capital and DCA percentage. On the close of every bar, it calculates an adjusted percentage based on the price change. If the price goes up, it lowers the percentage. If the price drops, it increases the percentage. This allows adding to the position at lower prices. It then calculates order size based on the adjusted percentage and remaining capital. On every bar close, it places orders to build the position until the starting capital is used up.  

Thus, it can control risks and get a lower average entry price during fluctuating price action. Meanwhile, it tracks the average entry price and median price to judge the current entry situation.

## Advantage Analysis 

The strategy has the following advantages:

1. It can dynamically scale in the position, increasing allocation on dips and decreasing allocation on rallies to control risks.  

2. It gets a lower average entry price compared to the median price, allowing more profit potential.

3. It fits ranging bull markets with volatility for better risk-reward ratios.

4. It enables presetting starting capital and DCA percentage to control position sizing risk.

5. It provides statistics on average entry price and median price for clear judgment of the entry quality.

## Risk Analysis

There are also some risks:

1. In plunging markets, it will keep adding to the position, leading to heavy losses. A stop loss can restrict the risk.

2. If the price surges rapidly, the scaling in will diminish, possibly missing much of the rally. Other LSI signals are then needed. 

3. Improper parameter configuration also poses dangers. Excessive starting capital and high DCA percentage will magnify losses.

## Optimization Directions

Some ways to optimize the strategy:

1. Add stop loss logic to cease scaling in on heavy selloffs.  

2. Dynamically adapt DCA percentage based on volatility or other metrics.

3. Incorporate machine learning models to forecast prices and guide scaling decisions.  

4. Combine other indicators to identify market structure shifts for scaling exit points.

5. Add capital management rules to dynamically size orders based on account values.

## Conclusion

This is a very practical dynamic position scaling strategy. It flexibly adjusts the position size based on price fluctuations to achieve good average entries in bull markets, while restricting risk via configurable parameters. Combining it with other indicators or models can further improve its performance. It suits investors seeking long-term gains.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|5000|Starting Capital|
|v_input_int_1|10|DCA Allocation Percentage|
|v_input_1|timestamp(1 Jan 2024)|(?Backtest Time Period)Start Date|
|v_input_string_1|0|(?Table Design)Table size: Normal|Small|Tiny|Large|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-20 00:00:00
end: 2024-02-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RWCS_LTD

//@version=5
strategy("DCA IN Calculator {RWCS}", overlay=true, pyramiding=999, default_qty_type=strategy.cash, initial_capital=10000, commission_value=0.02)

// User inputs
backtestStartDate = input(timestamp("1 Jan 2024"), 
     title="Start Date", group="Backtest Time Period",
     tooltip="This start date is in the time zone of the exchange " + 
     "where the chart's instrument trades. It doesn't use the time " + 
     "zone of the chart or of your computer.")
start_date = true
starting_capital = input.float(defval=5000, title="Starting Capital")
dca_allocation_percentage = input.int(defval=10, title="DCA Allocation Percentage")

// Calculate DCA allocation based on price change
price_change_percentage = ((close - close[1]) / close[1]) * 100
adjusted_allocation_percentage = close > close[1] ? dca_allocation_percentage - price_change_percentage : dca_allocation_percentage + price_change_percentage // If price action is negative, increase allocations
adjusted_allocation_percentage1 = dca_allocation_percentage - price_change_percentage // If price action is positive, reduce allocations

// Calculate order size based on adjusted allocation percentage
order_size = (adjusted_allocation_percentage / 100) * starting_capital

// Track remaining capital
var remaining_capital = starting_capital

// Long on the close of every bar
if true
    // Ensure the order size doesn't exceed remaining capital or adjusted allocation
    order_size := math.min(order_size, remaining_capital, adjusted_allocation_percentage / 100 * starting_capital)
    // Ensure order size is not negative
    order_size := math.max(order_size, 0)
    
    strategy.entry("DCA", strategy.long, qty = order_size)
    remaining_capital := remaining_capital - order_size

// Plot average entry price
var float total_entry_price = 0.0
var int total_signals = 0

if start_date
    total_entry_price := total_entry_price + close
    total_signals := total_signals + 1

avg_entry_price = total_entry_price / total_signals

// Calculate and plot median price
var float median_price = na

if start_date
    var float sum_prices = 0.0
    var int num_prices = 0
    
    for i = 0 to bar_index
        if (time[i] >= backtestStartDate)
            sum_prices := sum_prices + close[i]
            num_prices := num_prices + 1
    
    median_price := sum_prices / num_prices

// Reset variables at the start of each day
if (dayofweek != dayofweek[1])
    total_entry_price := 0.0
    total_signals := 0

//table colors
borders_col = color.new(color.black, 90)
top_row_col = color.new(color.gray, 90)
size = input.string(defval='Normal', options=['Tiny', 'Small', 'Normal', 'Large'], title='Table size', inline='design', group='Table Design')
table_size = size == 'Tiny' ? size.tiny : size == 'Small' ? size.small : size == 'Normal' ? size.normal : size == 'Large' ? size.large : na

var tablee = table.new(position=position.top_right, columns=2, rows=3, frame_color=borders_col, frame_width=4, border_color=borders_col, border_width=4)

table.cell(tablee, 0, 0, "Average Entry Price", bgcolor=top_row_col, text_color=color.white, text_size=table_size)
table.cell(tablee, 1, 0, str.tostring(avg_entry_price, '#.##'), text_color=color.white, text_size=table_size)
table.cell(tablee, 0, 1, "Median Price", bgcolor=top_row_col, text_color=color.white, text_size=table_size)
table.cell(tablee, 1, 1, str.tostring(median_price, '#.##'), text_color=color.white, text_size=table_size)
table.cell(tablee, 0, 2, "Remaining Capital", bgcolor=top_row_col, text_color=color.white, text_size=table_size)
table.cell(tablee, 1, 2, str.tostring(remaining_capital, '#.##'), text_color=color.white, text_size=table_size)


```

> Detail

https://www.fmz.com/strategy/442229

> Last Modified

2024-02-20 14:16:30
