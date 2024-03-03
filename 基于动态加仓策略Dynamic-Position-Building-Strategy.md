
> Name

基于动态加仓策略Dynamic-Position-Building-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11f92c69a06139fb365.png)
[trans]

## 概述

该策略的主要思想是根据系统信号动态加仓,在牛市中逐步建立头寸,以控制风险并获得较低的平均入场价。

## 策略原理

该策略首先设置启动资金和DCA配置百分比。在每根K线收盘时,它会根据价格变动计算调整后的配置百分比。如果价格上涨,它会降低百分比;如果价格下跌,它会增加百分比。这样可以在价格较低时增加头寸。然后根据调整后的百分比和剩余资金计算订单大小。在每根K线收盘时,它会下单加仓,直到启动资金用完。

这样,它可以在行情波动时,控制风险,获得较低的平均入场价。同时,它还会统计平均入场价和中位数价格,这样可以判断目前的入场情况。

## 优势分析

该策略具有以下优势:

1. 可以动态加仓,在行情下跌时加大仓位,在行情上涨时减小仓位,从而控制风险。

2. 获得了比中位数价格更低的平均入场价,有利于获得更高的收益空间。

3. 适合牛市中波动的行情,可以获得较好的风险收益比。

4. 可以预设启动资金和DCA百分比,控制每次加仓的资金数量,避免风险过大。 

5. 提供平均入场价和中位数价格的统计,可以直观判断入场的优劣。

## 风险分析

该策略也存在一定的风险:

1. 在行情出现断崖式下跌时,该策略会持续加仓,从而可能带来较大的资金损失。可以设置止损来控制风险。

2. 如果行情出现急速上涨,该策略的加仓幅度会下降,可能错过大部分上涨机会。这时需要利用其他信号进行敏捷的LSI。

3. 参数设置不当也会带来一定风险。启动资金过大、DCA百分比过高都会扩大损失。

## 优化方向

该策略还可以从以下几个方面进行优化:

1. 可以添加止损逻辑,在大幅下跌时停止加仓。

2. 可以根据波动率或其他指标动态调整DCA百分比。

3. 可以添加机器学习模型,预测价格变动,从而指导加仓决策。

4. 可以结合其他技术指标判断市场结构,在结构转折点停止加仓。

5. 可以添加资金管理模块,根据账户资金情况动态调整每次加仓资金。

## 总结

该策略是一个非常实用的动态加仓策略。它可以根据行情波动灵活调整仓位,在牛市中获得较低的平均入场价。同时,它内置了参数设置以控制风险。如果与其他技术指标或模型结合,可以获得更好的效果。该策略适用于追求长线投资收益的投资者。

||

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

[/trans]

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
