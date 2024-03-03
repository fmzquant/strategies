
> Name

下跌趋势短线交易策略Short-Trading-Strategy-in-Downtrend

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/16ff64fa403f79ac551.png)
[trans]


### 概述

本策略利用移动平均线和相对强弱指标判断市场趋势方向,在下跌趋势中逐步建立短仓头寸,实现盈利。

### 策略原理

当收盘价低于100日简单移动平均线且RSI大于30时,做空入场。之后设置止损线和止盈线,止损线为入场价的3%以上,止盈线为入场价的2%以下。这样可以获得较大的止损空间来容忍行情波动。当价格大于止损线或小于止盈线时平仓。

在Coinrule平台上,可以设置多次顺序卖出订单来逐步建立头寸。当行情持续下跌时,逐步加大仓位。设置一定的下单时间间隔也有助于控制总仓位。

该策略为每个交易连接止损单和止盈单。止损比例和止盈比例针对中盘币进行了优化。你可以根据具体币种进行调整。由于策略符合趋势交易方向,止损和止盈比例可设为1:1.5。

止损价为入场价的3%
止盈价为入场价的2%
略大于止损比例可以容忍更大波动,避免不必要的止损。

### 优势分析

- 利用移动平均线判断市场趋势方向,可以及时捕捉到下跌行情
- 相对强弱指标过滤可以避免盲目做空
- 逐步加仓可以最大限度控制风险,获得较好的风险收益比
- 设置止损止盈确保每个交易有承受能力

### 风险分析

- 行情出现V型反转时,可能导致较大亏损
- 需要密切关注行情,及时调整止损止盈价格
- 需要合理控制仓位规模,不宜过度用杠杆
- 大盘震荡行情中可暂停该策略,避免无谓损失

### 优化方向

- 可以测试不同参数的移动平均线指标
- 可以测试不同参数的RSI指标组合
- 可以调整止损止盈比例,优化风险收益比
- 可以测试不同下单时间间隔,控制仓位规模

### 总结

本策略基于移动平均线判断趋势方向,RSI指标过滤确定具体入场时机,能够有效捕捉下跌行情。逐步加仓方式能控制风险,设置止损止盈确保单笔交易承受能力。优化止损止盈比例可以获得更好的风险收益比。在参数调整和风险控制方面还有优化空间,但总体来说是一个稳定可靠的短线做空策略。

||


## Overview

This strategy takes advantage of downtrend by building short positions gradually based on moving average and RSI indicators. It aims for profit in falling market.

## Strategy Logic

When close price is below 100-day simple moving average and RSI is greater than 30, go short. Then set stop loss above entry price by 3% and take profit below entry price by 2%. The wider stop loss allows more volatility to avoid unnecessary stops. Close position when price surpasses stop loss or falls below take profit.

On Coinrule platform, set multiple sequential sell orders to build position gradually. When downtrend persists, increase position size. Setting a time interval between orders also helps controlling overall position size. 

Each trade is connected with a stop loss order and take profit order. The percentages are optimized for mid-cap coins. You can adjust based on specific coin. As it trades along with trend, stop loss and take profit ratio like 1:1.5 could work.

Stop loss at 3% above entry price
Take profit at 2% below entry price 
A slightly larger stop loss tolerates more volatility.

## Advantage Analysis

- MA judges trend direction well, catching downtrend in time
- RSI filter avoids blindly going short
- Gradual position build controls risk maximally with better risk-reward ratio
- Stop loss and take profit ensure endurance for each trade

## Risk Analysis

- Sharp V reversal could lead to major loss
- Need to monitor price closely to adjust stop loss and take profit
- Leverage needs to be reasonable to control position size 
- Pausing strategy in choppy market avoids unnecessary loss

## Optimization Directions 

- Test MA with different parameters
- Test RSI combinations with different parameters
- Adjust stop loss and take profit ratios to optimize risk-reward
- Test different time intervals between orders to control position size

## Summary

This strategy effectively captures downtrend based on MA and RSI. Gradual position build controls risk while stop loss and take profit ensure endurance. Further optimizing risk-reward ratio by adjusting stop loss/take profit parameters. There is room for improvements on parameters and risk control. But overall a solid short-term short strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|From Month|
|v_input_2|10|From Day|
|v_input_3|2019|From Year|
|v_input_4|true|Thru Month|
|v_input_5|true|Thru Day|
|v_input_6|2112|Thru Year|
|v_input_7|true|Show Date Range|
|v_input_8|50|MASignal|
|v_input_9|14|RSI period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-31 00:00:00
end: 2023-11-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=4
strategy(shorttitle='Short In Downtrend',title='Short In Downtrend Below MA100', overlay=true, initial_capital = 1000, process_orders_on_close=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

//Backtest dates
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 10,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2019, title = "From Year",       type = input.integer, minval = 1970)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2112, title = "Thru Year",       type = input.integer, minval = 1970)

showDate  = input(defval = true, title = "Show Date Range", type = input.bool)

start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"

//MA inputs and calculations
inSignal=input(50, title='MASignal')

MA= sma(close, inSignal)

// RSI inputs and calculations
lengthRSI = input(14, title = 'RSI period', minval=1)
RSI = rsi(close, lengthRSI)


//Entry 
strategy.entry(id="short", long = false, when = close < MA and RSI > 30)

//Exit
shortStopPrice  = strategy.position_avg_price * (1 + 0.03)
shortTakeProfit = strategy.position_avg_price * (1 - 0.02)

strategy.close("short", when = close > shortStopPrice or close < shortTakeProfit and window())


plot(MA, color=color.purple, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/431428

> Last Modified

2023-11-07 17:06:59
