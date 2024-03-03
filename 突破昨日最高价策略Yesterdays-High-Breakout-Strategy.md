
> Name

突破昨日最高价策略Yesterdays-High-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e83134b5090e270f8f.png)

[trans]

## 概述

突破昨日最高价策略是一种趋势跟踪策略,它在突破昨日最高价时打开多头仓位,即使当天多次突破也可以开仓。它以追踪趋势为主要特征,适用于市场呈现出明显趋势行情且波动率较高的情况。

## 原理

该策略通过引入一系列指标来识别入场时机和出场时机。

- ROC曲线筛选器 - 当天收盘价较上一交易日收盘价的涨跌幅超过设定门槛时开启策略。该指标用于过滤不符合策略的波动市场。

- 突破点 - 记录当天最高价,最低价,开盘价。 当价格突破当天最高价时为入场信号。

- 入场退出条件 - 入场后设置止损和止盈比例,同时可启用追踪止损来锁定利润。也可以针对特定EMA有条件止损。

- 优化配置 - 可设置入场前的间距比例来定制入场时机,避免假突破。可设置止损,止盈,追踪止损的动态参数。

具体来说,策略通过记录当天最高价来判断入场时机。当价格超过当天最高价时多头入场。此后设置止损和止盈退出,同时可启用追踪止损。也可在价格跌破特定EMA时止损。优化方式是设置入场前的间距比例,调整止损止盈比例来控制风险,启用追踪止损来锁定利润。

## 优势分析

该策略具有以下优势:

- 趋势跟踪,能抓取趋势行情的利润。

- 突破策略,入场信号明确。

- 考虑当天最高价,避免连续入场。 

- 止损止盈设置,有助于风险控制。

- 追踪止损设置,可锁定利润。

- 可通过参数优化调整入场时机,控制风险。

- 简单直观,容易理解实现。

- 多空双向可运用。

## 风险分析

该策略也存在以下风险:

- 突破类策略容易被套牢。入场后价格可能立即回落。

- 仅针对趋势行情有效,震荡行情下表现不佳。

- 需要合理设置止损比例,过于宽松可能增加亏损。

- 需要合理设置入场间距比例,过于激进可能增加亏损。

- 假突破可能导致不必要的亏损,需要调整优化。

- 需关注突破的交易量能否支撑后续行情。

- 需关注不同时间周期参数设置之间的协调性。

## 优化方向

该策略可以从以下方面进行优化:

- 增加其他技术指标判断,例如交易量,震荡指标等,避免在震荡行情下被套。

- 增加曲线拟合指标,判断趋势质量,避免跟随虚假趋势。

- 对入场间距设置动态优化,根据市场波动率调整间距要求。

- 对止损止盈设置动态优化,跟随市场调整参数。

- 针对不同品种不同周期设置不同参数。

- 利用机器学习方法TRAINING测试不同参数对策略的影响。

- 增加 Options 选项功能优化配置。

- 研究如何在震荡行情中应用该策略。

- 扩展为跨时间周期和品种的组合策略。

## 总结

该策略基于突破昨日最高价的趋势跟踪思路,在趋势行情中表现不俗。但是也存在被套风险和参数优化难题。通过引入更多判断指标,动态优化参数设置,扩展为组合策略等手段可进一步优化。总体来说,该策略适合短线追踪趋势行情,但需要关注风险控制和参数优化。

||


## Overview

The Yesterday's High Breakout strategy is a trend following system that goes long when the price breaks above yesterday's high, even if the breakout occurs multiple times in a day. It aims to follow the trending market conditions.

## Principle 

The strategy employs several technical indicators for entry and exit signals:

- ROC Filter - Strategy is enabled only when today's close has a price change percent above a threshold versus previous day's close. This filters non-trending volatile markets.

- Trigger Point - Records today's high, low and open prices. Long entry triggered when price breaks above today's high. 

- Entry and Exit Conditions - After entry, stop loss and take profit percentages are set. Trailing stop can be enabled to lock in profit. Conditional exit when price drops below a reference EMA.

- Configuration - Gap percent to anticipate or delay entry. Customizable stop loss, take profit, trailing stop percentages.

Specifically, it tracks today's high price for entry signal. Long entry when price breaks above today's high. Then stop loss and take profit exits are set, with trailing stop enabled. Alternate exit when price crosses below given EMA. Optimization by setting gap percentage, adjusting stop loss and take profit ratios to control risk, enabling trailing stop to lock in profit.

## Advantage Analysis

The advantages of this strategy:

- Trend following, captures profit from trending moves.

- Breakout strategy gives clear entry signals. 

- Considers today's high price, avoids consecutive entries.

- Stop loss and take profit helps risk control. 

- Trailing stop locks in profit.

- Entry timing can be tuned with parameter optimization to control risk.

- Simple and intuitive, easy to understand and implement.

- Applicable for long and short trades.

## Risk Analysis

The risks to consider:

- Breakout strategies susceptible to whipsaws. Price may immediately reverse after entry.

- Only effective for trending markets, underperforms in ranging conditions.

- Reasonable stop loss percent needed, too wide may increase loss.

- Reasonable gap percent needed, too aggressive may increase loss. 

- False breakout can cause unnecessary loss, tuning required.

- Volume needs to support follow through after breakout.

- Consistency needed between parameters across timeframes.

## Optimization Directions

Possible optimizations:

- Add other indicators like volume, volatility to avoid whipsaws during ranging markets.

- Add curve fitting indicators to qualify trend strength, avoid false trends. 

- Dynamic optimization of entry gap based on market volatility.

- Dynamic optimization of stop loss and take profit following market conditions.

- Different parameter sets for different symbols and timeframes. 

- Machine learning to TEST parameter impact on strategy performance.

- Add Options functionality to optimize configurations.

- Research applicability during ranging market conditions.

- Expand to cross timeframe and multi-asset strategies.

## Conclusion

The strategy offers decent performance during trending markets based on breakout of yesterday's high concept. But risks of whipsaw and parameter optimization difficulties exist. Further optimizations possible by adding judgments, dynamic parameter tuning, expanding to combined strategies etc. Overall it suits short term trend following, but risk control and parameter tuning needed.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|(?ROC Filter from CloseD)roc_enable|
|v_input_float_1|true|Treshold|
|v_input_float_2|true|(?Entry)Gap%|
|v_input_float_3|3|Stop-loss|
|v_input_float_4|9|Take-profit|
|v_input_float_5|2|(?Trailing Stop Settings)Trailing-stop|
|v_input_float_6|true|Offset Trailing|
|v_input_bool_2|true|Trailing-stop|
|v_input_bool_3|false|Close EMA|
|v_input_int_1|10|EMA length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-06 00:00:00
end: 2023-11-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// Author: © tumiza 999 
// © TheSocialCryptoClub

//@version=5

strategy("Yesterday's High v.17.07", overlay=true, pyramiding = 1,
         initial_capital=10000, 
         default_qty_type=strategy.percent_of_equity, default_qty_value=10,
         slippage=1, backtest_fill_limits_assumption=1, use_bar_magnifier=true,
         commission_type=strategy.commission.percent, commission_value=0.075
         )

// -----------------------------------------------------------------------------
// ROC Filter
// -----------------------------------------------------------------------------

// f_security function by LucF for PineCoders available here: https://www.tradingview.com/script/cyPWY96u-How-to-avoid-repainting-when-using-security-PineCoders-FAQ/
f_security(_sym, _res, _src, _rep) => request.security(_sym, _res, _src[not _rep and barstate.isrealtime ? 1 : 0])[_rep or barstate.isrealtime ? 0 : 1]
high_daily = f_security(syminfo.tickerid, "D", high, false)

roc_enable = input.bool(false, "", group="ROC Filter from CloseD", inline="roc")
roc_threshold = input.float(1, "Treshold", step=0.5, group="ROC Filter from CloseD", inline="roc")

closed = f_security(syminfo.tickerid,"1D",close, false)
roc_filter= roc_enable ? (close-closed)/closed*100  > roc_threshold  : true


// -----------------------------------------------------------------------------
// Trigger Point 
// -----------------------------------------------------------------------------

open_session = ta.change(time('D'))
price_session = ta.valuewhen(open_session, open, 0)
tf_session = timeframe.multiplier <= 60

bgcolor(open_session and tf_session ?color.new(color.blue,80):na, title = "Session")

first_bar = 0
if open_session
    first_bar := bar_index

var max_today = 0.0
var min_today = 0.0
var high_daily1 = 0.0
var low_daily1 = 0.0
var today_open = 0.0

if first_bar
    high_daily1 := max_today
    low_daily1 := min_today
    today_open := open
    max_today := high
    min_today := low


if high >= max_today
    max_today := high

if low < min_today
    min_today := low


same_day  = today_open == today_open[1]

plot( timeframe.multiplier <= 240 and same_day ? high_daily1 : na, color= color.yellow , style=plot.style_linebr, linewidth=1, title='High line')
plot( timeframe.multiplier <= 240 and same_day ? low_daily1 : na, color= #E8000D , style=plot.style_linebr, linewidth=1, title='Low line')

// -----------------------------------------------------------------------------
// Strategy settings 
// -----------------------------------------------------------------------------

Gap = input.float(1,"Gap%", step=0.5, tooltip="Gap di entrata su entry_price -n anticipa entrata, con +n posticipa entrata", group = "Entry")
Gap2 = (high_daily1 * Gap)/100

sl  = input.float(3, "Stop-loss", step= 0.5,  group = "Entry")
tp  = input.float(9, "Take-profit", step= 0.5, group = "Entry")
stop_loss_price = strategy.position_avg_price * (1-sl/100)
take_price = strategy.position_avg_price * (1+tp/100)

sl_trl = input.float(2, "Trailing-stop", step = 0.5, tooltip = "Attiva trailing stop dopo che ha raggiunto...",group = "Trailing Stop Settings")//group = "Trailing Stop Settings")
Atrl= input.float(1, "Offset Trailing", step=0.5,tooltip = "Distanza dal prezzo", group = "Trailing Stop Settings")
stop_trl_price_cond = sl_trl * high/syminfo.mintick/100
stop_trl_price_offset_cond = Atrl * high/syminfo.mintick/100

stop_tick = sl * high/syminfo.mintick/100
profit_tick = tp * high/syminfo.mintick/100

mess_buy = "buy"
mess_sell = "sell"

// -----------------------------------------------------------------------------
// Entry - Exit - Close
// -----------------------------------------------------------------------------

if close < high_daily1 and roc_filter
    strategy.entry("Entry", strategy.long, stop = high_daily1 + (Gap2), alert_message = mess_buy)

ts_n  = input.bool(true, "Trailing-stop", tooltip = "Attiva o disattiva trailing-stop", group = "Trailing Stop Settings")
close_ema = input.bool(false, "Close EMA", tooltip = "Attiva o disattiva chiusura su EMA", group = "Trailing Stop Settings")
len1 = input.int(10, "EMA length", step=1, group = "Trailing Stop Settings")
ma1 = ta.ema(close, len1)

plot(ma1, title='EMA', color=color.new(color.yellow, 0))

if ts_n == true
    strategy.exit("Trailing-Stop","Entry",loss= stop_tick, stop= stop_loss_price, limit= take_price, trail_points = stop_trl_price_cond, trail_offset = stop_trl_price_offset_cond, comment_loss="Stop-Loss!!",comment_profit ="CASH!!", comment_trailing = "TRL-Stop!!", alert_message = mess_sell)
else
    strategy.exit("TP-SL", "Entry",loss= stop_tick, stop=stop_loss_price, limit= take_price, comment_loss= "Stop-loss!!!", comment_profit = "CASH!!", alert_message = mess_sell)

if close_ema == true and ta.crossunder(close,ma1)
    strategy.close("Entry",comment = "Close" , alert_message = mess_sell)


```

> Detail

https://www.fmz.com/strategy/431225

> Last Modified

2023-11-06 10:49:57
