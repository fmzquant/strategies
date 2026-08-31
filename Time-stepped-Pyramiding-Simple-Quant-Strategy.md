
> Name

Time-stepped-Pyramiding-Simple-Quant-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17fa4e937ac813559b3.png)

## Overview

This strategy is a simple quant trading strategy that utilizes time-stepped pyramiding. The main idea is to long open positions every day at fixed times, and set different take profit and stop loss levels for each position to realize batched profit taking and stopping loss. 

## Principles

The strategy is based on three key logics:

1. Time-stepped pyramiding

   Use the `sessionTime` parameter to set a daily trading time window, pyramid long positions step by step at market open during this window. The position size is the average allocation of the maximum capital.

2. Individualized profit taking and stopping loss

   Set corresponding take profit level `takeProfit` and stop loss level `stopLoss` for every opened position, so that each position has its own profit taking and stopping loss logic to realize batch executions.
   
3. Close all positions when time window ends

   Choose whether to close all positions opened during the time window at the end of the window.

## Advantages

The strategy has the following advantages:

1. Risk diversification. Allocate capital evenly to different positions to effectively control single position loss.

2. Batch profit taking and stopping loss. Different positions have independent logics to avoid mass stopping loss. 

3. Flexible configurations. Customizable parameters like maximum pyramiding times, daily time window, profit taking/stopping loss ratios etc.

4. Simple and clear logic. Easy to understand.

## Risks

There are also some risks:

1. Risk of full capital stuck if all positions trigger stop loss before take profit. Can be avoided by reasonably configuring the stop loss ratio.

2. No limit on total open position capital per day. Too many positions may exceed capital bearability if encountering unusual market situations. Consider adding maximal total position capital per day.

3. Improper time window configuration may miss trading chances. Suggest to refer to the active trading time window of the trading assets.

## Enhancement

The strategy can be enhanced from the following aspects:

1. Add open position conditions based on technical indicators to avoid reckless pyramiding. 

2. Add daily total open position capital limit to prevent exceeding capital bearability.

3. Set different take profit/stop loss ratios for different positions to realize differentiated profit taking and stopping loss.

4. Add logics to link position amount with capital pool balance.

## Conclusion

In conclusion, this is a very simple quant trading strategy template utilizing the time-stepped pyramiding methodology. The logic is simple and clear while there are also some risks and rooms for enhancement. Developers can optimize it properly to make it a relatively stable and reliable quant strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 April 2021 20:00)|(?Backtest Window)Start Time|
|v_input_2|timestamp(01 Aug 2022 20:00)|End Time|
|v_input_int_1|6|(?Risk)Max Amount of DCA Entries|
|v_input_float_1|2.5|Take Profit %|
|v_input_bool_1|true|Activate Stop Loss|
|v_input_float_2|9|Stop Loss %|
|v_input_3|1800-1700|(?DCA Settings)DCA Order Timeframe|
|v_input_bool_2|false|Exit DCA Entry at end of Timeframe|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-20 00:00:00
end: 2023-12-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © A3Sh

//@version=5
strategy("Simple_Pyramiding", overlay=true, pyramiding=99, initial_capital=500, default_qty_type=strategy.percent_of_equity, commission_type=strategy.commission.percent, commission_value=0.075, close_entries_rule='FIFO')

// Study of a Simple DCA strategy that opens a position every day at a specified time.
// A position is opened at the start time of the Timeframe.
// Positions exit individually when the take profit level is triggered.
// Option to activate Stop Loss and/or Position exit at the end of the Timeframe


// Backtest Window
start_time   = input(defval=timestamp("01 April 2021 20:00"), group = "Backtest Window", title="Start Time")
end_time     = input(defval=timestamp("01 Aug 2022 20:00"),  group = "Backtest Window", title="End Time")
window() => true


// Inputs
posCount     = input.int    (6,           group = "Risk",         title = "Max Amount of DCA Entries")
takeProfit   = input.float  (2.5,         group = "Risk",         title = "Take Profit %")
slSwitch     = input.bool   (true,        group = "Risk",         title = "Activate Stop Loss")
stopLoss     = input.float  (9,           group = "Risk",         title = "Stop Loss %")
sessionTime =  input("1800-1700", group = "DCA Settings", title = "DCA Order Timeframe", tooltip="Open order at the start/If ativated, close order at the end")
exitDCA     =  input.bool   (false,       group = "DCA Settings", title = "Exit DCA Entry at end of Timeframe")


// Order size based on max amount of pyramid orders
q = (strategy.equity  / posCount) / open


// Timeframe for opening and closing a DCA order
// example taken from https://stackoverflow.com/questions/69230164/pinescript-basic-question-open-a-trade-at-a-set-time-each-day
t       = time("D", sessionTime)
isStart = na(t[1]) and not na(t) or t[1] < t
isEnd   = na(t) and not na(t[1]) or t[1] < t
bgcolor(t ? color.new(color.blue,95) : na, title = " TimeFrame Color")


// Create DCA Entries
entry_price = 0.0
if isStart and window() 
    for i = 0 to strategy.opentrades
        if strategy.opentrades == i
            entry_price := close
            entry_id = "PE_" + str.tostring(i + 1) 
            strategy.entry(id = entry_id, direction=strategy.long, limit=entry_price, qty=q)
        if strategy.opentrades == posCount
            break
            
 
//Exit DCA Entries when take profit or stop loss is triggered
if strategy.opentrades > 0 and window() 
    for i = 0 to strategy.opentrades 
        exit_from = "PE_" + str.tostring(i + 1)
        exit_id = "Exit_" + str.tostring(i + 1)
        strategy.exit(id= exit_id, from_entry= exit_from, profit = close * takeProfit / 100 / syminfo.mintick, loss = slSwitch ? close * stopLoss /100 / syminfo.mintick :na)
        

//Exit DCA Entries at end of DCA Timeframe
if strategy.opentrades > 0 and exitDCA and isEnd and window() 
    for i = 0 to strategy.opentrades 
        exit_from = "PE_" + str.tostring(i + 1)
        exit_id = "Exit_" + str.tostring(i + 1)
        strategy.exit(id= exit_id, from_entry= exit_from, stop = close)



```

> Detail

https://www.fmz.com/strategy/436796

> Last Modified

2023-12-27 17:39:40
