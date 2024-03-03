
> Name

基于时间阶梯加仓的简单量化策略Time-stepped-Pyramiding-Simple-Quant-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17fa4e937ac813559b3.png)
[trans]

## 概述

该策略是一个利用时间阶梯加仓方式进行量化交易的简单策略。策略的主要思路是每天在固定的时间开仓建立多头头寸,然后对每个头寸设置不同的止盈止损条件,从而实现分批止盈或止损。

## 策略原理

该策略主要基于三个关键逻辑:

1. 时间阶梯加仓

   利用`sessionTime`参数设置一个日内交易时间段,在这个时间段内,每天开市时FIXED阶梯式逐步加仓,加仓数量为资金池最大头寸数量的平均分配。

2. 个体化止盈止损

   对每单开仓订单,分别设置对应的止盈点`takeProfit`和止损点`stopLoss`,使得每个订单都有独立的止盈止损逻辑,从而实现分批止盈止损。

3. 时间段结束平仓

   当日内交易时间段结束时,可选择是否对该时间段内所有未止盈止损的订单进行平仓。

## 策略优势

该策略具有以下优势:

1. 风险分散,将资金池内资金等份分配给不同订单,有效控制单笔订单亏损。

2. 分批止盈止损,不同订单有独立止盈止损逻辑,防止全部订单同时止损。

3. 灵活配置,可自定义最大加仓次数、每日交易时间段、止盈止损比例等参数。

4. 易于理解,策略逻辑简单清晰。

## 策略风险

该策略也存在一定风险:

1. 有被套的风险,如果全部订单未到止盈线就先触发了对应的止损线,会出现较大亏损。可通过合理配置止损比例进行规避。

2. 无法限制每日开仓总额,如果遇到特殊行情,过多订单同时加仓可能超出资金承受能力。可考虑添加每日加仓总金额的最大限制。

3. 时间段配置不当可能错过行情机会,建议配置交易时间段要参考目标交易品种的活跃时间段。

## 策略优化

该策略可以从以下几个方向进行优化:

1. 增加开仓条件判断逻辑,在满足特定技术指标信号时才开仓,避免盲目加仓。

2. 增加每日加仓总金额的限制,防止超出资金池承受能力。

3. 对不同订单设置不同的止盈止损比例,实现分差止盈止损。

4. 增加订单数量与资金池余额联动的逻辑,让订单数量与可用资金挂钩。


## 总结

该策略整体是一个非常简单的利用时间阶梯加仓思路进行量化交易的策略模板,策略逻辑清晰,同时也存在一定的风险与优化空间,开发者可以在这个基础上进行适当优化,使其成为一个较为稳定可靠的量化策略。


|| 

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

[/trans]

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
