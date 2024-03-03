
> Name

多时间框架MACD热力图策略Multi-Timeframe-MACD-Heatmap-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13a8985360e58803289.png)

[trans]

## 概述

这个策略的核心思想是利用多个不同时间周期的MACD指标的组合信号,来判断行情趋势变化的时机,实现低风险的趋势跟踪交易。

## 策略原理

1. 策略使用5个不同时间周期的MACD指标,包括60分钟、120分钟、240分钟、480分钟和日线,形成一个MACD指标的多时间框架组合。

2. 当5个时间周期的MACD指标都为正(或负),并且上一根K线还不是全部MACD正(或负)时,判断为多头(或空头)信号,做多(或做空)。

3. 止损方式为固定点数止损。

4. 止盈方式为两个级别的移动止盈,分别关闭一部分和全部头寸。

5. 当MACD指标出现一个多一个空的情况时,判断为信号反转,平掉当前头寸。

6. 还使用TsL进行追踪止损。

7. 使用止损移动到breakeven功能,当达到特定盈利后,将止损移动到开仓价附近,锁定盈利。

8. 使用了Pineconector的语法,动态生成交易信号弹窗。

## 策略优势

1. 多时间框架MACD组合,可以提高信号准确性, capture大趋势,过滤掉部分噪音。

2. 两个级别的移动止盈设定,可以在大趋势中多次获得部分利润。

3. 固定止损点数设定,可以控制单笔损失。

4. 当MACD指标不一致时平仓,可以及时止损,避免打破止损。 

5. TsL跟踪止损功能,让止损实时跟踪价格变化。

6. 止损移动到BE功能,可以在亏损变盈利后锁定部分利润。

7. 动态交易信号,可以连接到MT4/5实现自动交易。

## 风险及解决

1. MACD信号可能出现假突破,造成不必要的亏损。可以适当调整MACD参数,过滤掉过多假信号。

2. 固定止损点数可能过大过小。可以测试不同止损点数大小,找到最佳参数。

3. 两个止盈点过近或过远,无法实现最佳回撤和利润率。可以测试不同止盈点,找到最佳参数。 

4. BE功能可能过早或过晚触发。可以测试不同的BE触发点,找到最佳参数。

5. 追踪止损距离可能过大过小。可以测试不同追踪止损距离,找到最佳参数。

## 策略优化

1. 可以测试更多种时间框架的MACD组合,找到captured市场趋势的最佳组合。

2. 可以引入更多指标判断行情背景,避免不适合的行情打开仓位。

3. 可以研究不同品种参数设置差异,设计自适应止损止盈系统。

4. 可以结合机器学习技术,实现止损止盈参数的动态优化。

5. 可以引入资金管理模块,使仓位大小动态调整,控制风险。

## 总结

整体来说,这个策略利用多时间框架MACD指标判断趋势,设置双止盈、追踪止损、BE功能来锁定利润,固定止损控制风险,是一个相对稳定的趋势跟踪策略。通过参数优化和功能扩展,可以进一步增强策略的稳定性和收益率。关键是找到参数的最佳组合,实现风险和收益的最优平衡。

||

## Overview

The core idea of this strategy is to use the combination signals of MACD indicators from multiple different timeframes to determine the timing of trend changes and implement low-risk trend following trading.

## Strategy Logic

1. The strategy uses 5 MACD indicators from different timeframes, including 60min, 120min, 240min, 480min and Daily, forming a multi-timeframe combination of MACD indicators. 

2. When all 5 MACDs are positive (or negative) and the previous bar was not all positive (or negative) MACDs, it is determined as a long (or short) signal and goes long (or short).

3. The stop loss method is fixed pips stop loss.

4. The take profit method is two-tier trailing stop, closing a portion and all of the positions separately. 

5. When the MACD indicators show one long one short situation, it is judged as a signal reversal and close the current position.

6. TsL is also used for trailing stop loss. 

7. The stop loss to breakeven feature is used. When reaching certain profit target, the stop loss will move to break even, locking in profits.

8. Pineconector syntax is used to dynamically generate trading signal alerts.

## Advantages

1. Multi-timeframe MACD combination can improve signal accuracy, capturing big trends and filter out some noise.

2. The two-tier trailing take profit allows taking partial profits multiple times during big trends.

3. Fixed pips stop loss can control single trade loss amount. 

4. Closing when MACDs inconsistent can realize stop loss timely and avoid stop loss break.

5. TsL trailing stop follows the price change in real time.

6. SL to BE locks in some profit after turning losing positions to winning positions.

7. Dynamic trading alerts can connect to MT4/5 for auto trading.

## Risks and Solutions

1. MACD signals may have false breakouts, causing unnecessary losses. Fine tune MACD parameters to filter out excessive false signals.

2. Fixed pips stop loss may be too big or too small. Test different levels to find optimal parameter.

3. Two take profit levels may be too close or too far. Test different levels to find optimal parameter.

4. BE trigger may be too early or too late. Test different BE trigger points to find optimal parameter. 

5. Trailing stop distance may be too big or too small. Test different distances to find optimal parameter.

## Optimization Directions  

1. Test more timeframes of MACD combination to find the best combo to capture market trends.

2. Introduce more indicators to determine market condition, avoiding opening positions during unfavorable conditions.

3. Research parameter differences between products, designing adaptive stop loss and take profit system. 

4. Incorporate machine learning techniques for dynamic optimization of parameters.

5. Introduce position sizing for dynamic adjustment of position size and risk control.

## Conclusion

In summary, this strategy uses multi-timeframe MACD to determine trends, with dual trailing take profit, trailing stop loss and BE features to lock in profits, fixed stop loss to control risk. It is a relatively stable trend following strategy. Further enhancements in stability and profitability can be achieved through parameter optimization and functionality expansion. The key is finding the optimal parameter combination to achieve the best risk-reward balance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|123456789|(?Pineconnector)Licence ID|
|v_input_float_1|3|(?Position Size)Position Size|
|v_input_timeframe_1|60|(?Timeframes)First Timeframe|
|v_input_timeframe_2|120|Second Timeframe|
|v_input_timeframe_3|240|Third Timeframe|
|v_input_timeframe_4|240|Fourth Timeframe|
|v_input_timeframe_5|480|Fifth Timeframe|
|v_input_source_1_close|0|(?MACD)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|9|Fast Length|
|v_input_int_2|26|Slow Length|
|v_input_int_3|9|Signal Length|
|v_input_bool_1|false|(?Close on Opposite)Close on Opposite Signal?|
|v_input_bool_2|true|(?Stop Loss)Use Stop Loss?|
|v_input_float_2|40|Value|
|v_input_bool_3|false|(?Trailing Stop Loss)Use Trailing Stop Loss?|
|v_input_float_3|10|Trailing Stop Loss (pips)|
|v_input_bool_4|true|(?Take Profit 1)Use Take Profit 1?|
|v_input_float_4|30|Value (pips)|
|v_input_float_5|50|Quantity (%)|
|v_input_bool_5|true|(?Take Profit 2)Use Take Profit 2?|
|v_input_float_6|50|Value (pips)|
|v_input_bool_6|false|(?Break Even)Use Stop Loss to Breakeven Mode?|
|v_input_float_7|30|Value (pips)|
|v_input_int_4|true|Offset (pips)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

//@version=5
//@strategy_alert_message {{strategy.order.alert_message}}

SCRIPT_NAME = "Heatmap MACD Strategy - Pineconnector"

strategy(SCRIPT_NAME, 
 overlay= true, 
 process_orders_on_close = true, 
 calc_on_every_tick = true, 
 pyramiding = 1, 
 initial_capital = 100000, 
 default_qty_type = strategy.fixed, 
 default_qty_value = 1,
 commission_type = strategy.commission.percent,
 commission_value = 0.075,
 slippage = 1
 )

pineconnector_licence_ID = input.string(title = "Licence ID", defval = "123456789", group = "Pineconnector", tooltip = "Insert your Pineconnector Licence ID here")
pos_size = input.float(3, minval = 0, maxval = 100, title = "Position Size", group = "Position Size", tooltip = "Required to specify the position size here for Pineconnector to work properly")

res1 = input.timeframe('60', title='First Timeframe', group = "Timeframes")
res2 = input.timeframe('120', title='Second Timeframe', group = "Timeframes")
res3 = input.timeframe('240', title='Third Timeframe', group = "Timeframes")
res4 = input.timeframe('240', title='Fourth Timeframe', group = "Timeframes")
res5 = input.timeframe('480', title='Fifth Timeframe', group = "Timeframes")

macd_src = input.source(close, title="Source", group = "MACD")
fast_len = input.int(9, minval=1, title="Fast Length", group = "MACD")
slow_len = input.int(26, minval=1, title="Slow Length", group = "MACD")
sig_len = input.int(9, minval=1, title="Signal Length", group = "MACD")

// # ========================================================================= #
// #                   | Close on Opposite |
// # ========================================================================= #

use_close_opposite = input.bool(false, title = "Close on Opposite Signal?", group = "Close on Opposite", tooltip = "Close the position if 1 or more MACDs become bearish (for longs) or bullish (for shorts)")

// # ========================================================================= #
// #                   | Stop Loss |
// # ========================================================================= #

use_sl = input.bool(true, title = "Use Stop Loss?", group = "Stop Loss")
sl_mode = "pips"//input.string("%", title = "Mode", options = ["%", "pips"], group = "Stop Loss")
sl_value = input.float(40, minval = 0, title = "Value", group = "Stop Loss", inline = "stoploss")// * 0.01

// # ========================================================================= #
// #                   | Trailing Stop Loss |
// # ========================================================================= #

use_tsl         = input.bool(false, title = "Use Trailing Stop Loss?", group = "Trailing Stop Loss")
tsl_input_pips = input.float(10, minval = 0, title = "Trailing Stop Loss (pips)", group = "Trailing Stop Loss")

// # ========================================================================= #
// #                   | Take Profit |
// # ========================================================================= #

use_tp1 = input.bool(true, title = "Use Take Profit 1?", group = "Take Profit 1")
tp1_value = input.float(30, minval = 0, title = "Value (pips)", group = "Take Profit 1")// * 0.01
tp1_qty   = input.float(50, minval = 0, title = "Quantity (%)", group = "Take Profit 1")// * 0.01

use_tp2 = input.bool(true, title = "Use Take Profit 2?", group = "Take Profit 2")
tp2_value = input.float(50, minval = 0, title = "Value (pips)", group = "Take Profit 2")// * 0.01

// # ========================================================================= #
// #                   | Stop Loss to Breakeven |
// # ========================================================================= #

use_sl_be         = input.bool(false, title = "Use Stop Loss to Breakeven Mode?", group = "Break Even")
sl_be_value       = input.float(30, step = 0.1, minval = 0, title = "Value (pips)", group = "Break Even", inline = "breakeven")
sl_be_offset      = input.int(1, step = 1, minval = 0, title = "Offset (pips)", group = "Break Even", tooltip = "Set the SL at BE price +/- offset value")

[_, _, MTF1_hist] = request.security(syminfo.tickerid, res1, ta.macd(macd_src, fast_len, slow_len, sig_len))
[_, _, MTF2_hist] = request.security(syminfo.tickerid, res2, ta.macd(macd_src, fast_len, slow_len, sig_len))
[_, _, MTF3_hist] = request.security(syminfo.tickerid, res3, ta.macd(macd_src, fast_len, slow_len, sig_len))
[_, _, MTF4_hist] = request.security(syminfo.tickerid, res4, ta.macd(macd_src, fast_len, slow_len, sig_len))
[_, _, MTF5_hist] = request.security(syminfo.tickerid, res5, ta.macd(macd_src, fast_len, slow_len, sig_len))

bull_hist1 = MTF1_hist > 0 and MTF1_hist[1] < 0
bull_hist2 = MTF2_hist > 0 and MTF2_hist[1] < 0
bull_hist3 = MTF3_hist > 0 and MTF3_hist[1] < 0
bull_hist4 = MTF4_hist > 0 and MTF4_hist[1] < 0
bull_hist5 = MTF5_hist > 0 and MTF5_hist[1] < 0

bear_hist1 = MTF1_hist < 0 and MTF1_hist[1] > 0
bear_hist2 = MTF2_hist < 0 and MTF2_hist[1] > 0
bear_hist3 = MTF3_hist < 0 and MTF3_hist[1] > 0
bear_hist4 = MTF4_hist < 0 and MTF4_hist[1] > 0
bear_hist5 = MTF5_hist < 0 and MTF5_hist[1] > 0

plotshape(bull_hist1, title = "Bullish MACD 1", location = location.bottom, style = shape.diamond, size = size.normal, color = #33e823)
plotshape(bull_hist2, title = "Bullish MACD 2", location = location.bottom, style = shape.diamond, size = size.normal, color = #1a7512)
plotshape(bull_hist3, title = "Bullish MACD 3", location = location.bottom, style = shape.diamond, size = size.normal, color = #479c40)
plotshape(bull_hist4, title = "Bullish MACD 4", location = location.bottom, style = shape.diamond, size = size.normal, color = #81cc7a)
plotshape(bull_hist5, title = "Bullish MACD 5", location = location.bottom, style = shape.diamond, size = size.normal, color = #76d66d)

plotshape(bear_hist1, title = "Bearish MACD 1", location = location.top, style = shape.diamond, size = size.normal, color = #d66d6d)
plotshape(bear_hist2, title = "Bearish MACD 2", location = location.top, style = shape.diamond, size = size.normal, color = #de4949)
plotshape(bear_hist3, title = "Bearish MACD 3", location = location.top, style = shape.diamond, size = size.normal, color = #cc2525)
plotshape(bear_hist4, title = "Bearish MACD 4", location = location.top, style = shape.diamond, size = size.normal, color = #a11d1d)
plotshape(bear_hist5, title = "Bearish MACD 5", location = location.top, style = shape.diamond, size = size.normal, color = #ed2424)

bull_count = (MTF1_hist > 0 ? 1 : 0) + (MTF2_hist > 0 ? 1 : 0) + (MTF3_hist > 0 ? 1 : 0) + (MTF4_hist > 0 ? 1 : 0) + (MTF5_hist > 0 ? 1 : 0)
bear_count = (MTF1_hist < 0 ? 1 : 0) + (MTF2_hist < 0 ? 1 : 0) + (MTF3_hist < 0 ? 1 : 0) + (MTF4_hist < 0 ? 1 : 0) + (MTF5_hist < 0 ? 1 : 0)

bull = bull_count == 5 and bull_count[1] < 5 and barstate.isconfirmed
bear = bear_count == 5 and bear_count[1] < 5 and barstate.isconfirmed

signal_candle = bull or bear

entryLongPrice  = ta.valuewhen(bull and strategy.position_size[1] <= 0, close, 0)
entryShortPrice = ta.valuewhen(bear and strategy.position_size[1] >= 0, close, 0)

plot(strategy.position_size, title = "avg_pos_size")

get_pip_size() =>

    float _pipsize = 1.

    if syminfo.type == "forex" 
        _pipsize := (syminfo.mintick * (str.contains(syminfo.ticker, "JPY") ? 100 : 10))
    else if str.contains(syminfo.ticker, "XAU") or str.contains(syminfo.ticker, "XAG")
        _pipsize := 0.1

    _pipsize

// # ========================================================================= #
// #                   |   Stop Loss |
// # ========================================================================= #

var float final_SL_Long = 0.
var float final_SL_Short = 0.

if signal_candle and use_sl

    final_SL_Long  := entryLongPrice  - (sl_value * get_pip_size())
    final_SL_Short := entryShortPrice + (sl_value * get_pip_size())

// # ========================================================================= #
// #                   |   Trailing Stop Loss |
// # ========================================================================= #

var MaxReached = 0.0  

if signal_candle[1]

    MaxReached := strategy.position_size > 0 ? high : low

MaxReached := strategy.position_size > 0
 ? math.max(nz(MaxReached, high), high)
 : strategy.position_size < 0 ? math.min(nz(MaxReached, low), low) : na

if use_tsl and use_sl

    if strategy.position_size > 0

        stopValue = MaxReached - (tsl_input_pips * get_pip_size())
        final_SL_Long := math.max(stopValue, final_SL_Long[1])

    else if strategy.position_size < 0

        stopValue = MaxReached + (tsl_input_pips * get_pip_size())
        final_SL_Short := math.min(stopValue, final_SL_Short[1])

// # ========================================================================= #
// #                   |   Take Profit 1 |
// # ========================================================================= #

var float final_TP1_Long  = 0.
var float final_TP1_Short = 0.

final_TP1_Long  := entryLongPrice  + (tp1_value * get_pip_size())
final_TP1_Short := entryShortPrice - (tp1_value * get_pip_size())

plot(use_tp1 and strategy.position_size > 0 ? final_TP1_Long : na, title = "TP1 Long", color = color.aqua, linewidth=2, style=plot.style_linebr)
plot(use_tp1 and strategy.position_size < 0 ? final_TP1_Short : na, title = "TP1 Short", color = color.blue, linewidth=2, style=plot.style_linebr)

// # ========================================================================= #
// #                   |   Take Profit 2 |
// # ========================================================================= #

var float final_TP2_Long  = 0.
var float final_TP2_Short = 0.

final_TP2_Long  := entryLongPrice  + (tp2_value * get_pip_size())
final_TP2_Short := entryShortPrice - (tp2_value * get_pip_size())

plot(use_tp2 and strategy.position_size > 0 and tp1_qty != 100 ? final_TP2_Long : na, title = "TP2 Long", color = color.orange, linewidth=2, style=plot.style_linebr)
plot(use_tp2 and strategy.position_size < 0 and tp1_qty != 100 ? final_TP2_Short : na, title = "TP2 Short", color = color.white, linewidth=2, style=plot.style_linebr)

// # ========================================================================= #
// #                   |   Stop Loss to Breakeven |
// # ========================================================================= #

var bool SL_BE_REACHED = false

// Calculate open profit or loss for the open positions.
tradeOpenPL() =>
    sumProfit = 0.0
    for tradeNo = 0 to strategy.opentrades - 1
        sumProfit += strategy.opentrades.profit(tradeNo)
    result = sumProfit

//get_pip_size() =>
//    syminfo.type == "forex" ? syminfo.pointvalue * 100 : 1

current_profit = tradeOpenPL()// * get_pip_size()

current_long_profit = (close - entryLongPrice) / (syminfo.mintick * 10)
current_short_profit = (entryShortPrice - close) / (syminfo.mintick * 10)

plot(current_short_profit, title = "Current Short Profit")
plot(current_long_profit, title = "Current Long Profit")

if use_sl_be

    if strategy.position_size[1] > 0

        if not SL_BE_REACHED

            if current_long_profit >= sl_be_value 
                final_SL_Long := entryLongPrice + (sl_be_offset * get_pip_size())
                SL_BE_REACHED := true

    else if strategy.position_size[1] < 0

        if not SL_BE_REACHED

            if current_short_profit >= sl_be_value 
                final_SL_Short := entryShortPrice - (sl_be_offset * get_pip_size())
                SL_BE_REACHED := true

plot(use_sl and strategy.position_size > 0 ? final_SL_Long : na, title = "SL Long", color = color.fuchsia, linewidth=2, style=plot.style_linebr)
plot(use_sl and strategy.position_size < 0 ? final_SL_Short : na, title = "SL Short", color = color.fuchsia, linewidth=2, style=plot.style_linebr)

// # ========================================================================= #
// #                   |   Strategy Calls |
// # ========================================================================= #

string entry_long_limit_alert_message = ""
string entry_long_TP1_alert_message = ""
string entry_long_TP2_alert_message = ""

tp1_qty_perc = tp1_qty / 100

if use_tp1 and use_tp2

    entry_long_TP1_alert_message := pineconnector_licence_ID + ",buy," + syminfo.ticker + ",risk=" + str.tostring(pos_size * tp1_qty_perc) + ",tp=" + str.tostring(final_TP1_Long)
     + (use_sl ? ",sl=" + str.tostring(final_SL_Long) : "") + (use_sl_be ? ",beoffset=" + str.tostring(sl_be_offset) + ",betrigger=" + str.tostring(sl_be_value) : "")
     + (use_tsl ? ",trailtrig=" + str.tostring(tsl_input_pips) + ",traildist=" + str.tostring(tsl_input_pips) + ",trailstep=1" : "")

    entry_long_TP2_alert_message := pineconnector_licence_ID + ",buy," + syminfo.ticker + ",risk=" + str.tostring(pos_size - (pos_size * tp1_qty_perc)) + ",tp=" + str.tostring(final_TP2_Long)
     + (use_sl ? ",sl=" + str.tostring(final_SL_Long) : "") + (use_sl_be ? ",beoffset=" + str.tostring(sl_be_offset) + ",betrigger=" + str.tostring(sl_be_value) : "")
     + (use_tsl ? ",trailtrig=" + str.tostring(tsl_input_pips) + ",traildist=" + str.tostring(tsl_input_pips) + ",trailstep=1" : "")

else if use_tp1 and not use_tp2

    entry_long_TP1_alert_message := pineconnector_licence_ID + ",buy," + syminfo.ticker + ",risk=" + str.tostring(pos_size * tp1_qty_perc) + ",tp=" + str.tostring(final_TP1_Long)
     + (use_sl ? ",sl=" + str.tostring(final_SL_Long) : "") + (use_sl_be ? ",beoffset=" + str.tostring(sl_be_offset) + ",betrigger=" + str.tostring(sl_be_value) : "")
     + (use_tsl ? ",trailtrig=" + str.tostring(tsl_input_pips) + ",traildist=" + str.tostring(tsl_input_pips) + ",trailstep=1" : "")

else if not use_tp1 and use_tp2

    entry_long_TP2_alert_message := pineconnector_licence_ID + ",buy," + syminfo.ticker + ",risk=" + str.tostring(pos_size) + ",tp=" + str.tostring(final_TP2_Long)
     + (use_sl ? ",sl=" + str.tostring(final_SL_Long) : "") + (use_sl_be ? ",beoffset=" + str.tostring(sl_be_offset) + ",betrigger=" + str.tostring(sl_be_value) : "")
     + (use_tsl ? ",trailtrig=" + str.tostring(tsl_input_pips) + ",traildist=" + str.tostring(tsl_input_pips) + ",trailstep=1" : "")

entry_long_limit_alert_message := entry_long_TP1_alert_message + "\n" + entry_long_TP2_alert_message

//entry_long_limit_alert_message = pineconnector_licence_ID + ",buystop," + syminfo.ticker + ",price=" + str.tostring(buy_price) + ",risk=" + str.tostring(pos_size) + ",tp=" + str.tostring(final_TP_Long) + ",sl=" + str.tostring(final_SL_Long)

//entry_short_market_alert_message = pineconnector_licence_ID + ",sell," + syminfo.ticker + ",risk=" + str.tostring(pos_size) + (use_tp1 ? ",tp=" + str.tostring(final_TP1_Short) : "")
// + (use_sl ? ",sl=" + str.tostring(final_SL_Short) : "")

//entry_short_limit_alert_message = pineconnector_licence_ID + ",sellstop," + syminfo.ticker + ",price=" + str.tostring(sell_price) + ",risk=" + str.tostring(pos_size) + ",tp=" + str.tostring(final_TP_Short) + ",sl=" + str.tostring(final_SL_Short)

string entry_short_limit_alert_message = ""
string entry_short_TP1_alert_message = ""
string entry_short_TP2_alert_message = ""

if use_tp1 and use_tp2
    
    entry_short_TP1_alert_message := pineconnector_licence_ID + ",sell," + syminfo.ticker + ",risk=" + str.tostring(pos_size * tp1_qty_perc) + ",tp=" + str.tostring(final_TP1_Short) 
     + (use_sl ? ",sl=" + str.tostring(final_SL_Short) : "") + (use_sl_be ? ",beoffset=" + str.tostring(sl_be_offset) + ",betrigger=" + str.tostring(sl_be_value) : "")
     + (use_tsl ? ",trailtrig=" + str.tostring(tsl_input_pips) + ",traildist=" + str.tostring(tsl_input_pips) + ",trailstep=1" : "")

    entry_short_TP2_alert_message := pineconnector_licence_ID + ",sell," + syminfo.ticker + ",risk=" + str.tostring(pos_size - (pos_size * tp1_qty_perc)) + ",tp=" + str.tostring(final_TP2_Short)
     + (use_sl ? ",sl=" + str.tostring(final_SL_Short) : "") + (use_sl_be ? ",beoffset=" + str.tostring(sl_be_offset) + ",betrigger=" + str.tostring(sl_be_value) : "")
     + (use_tsl ? ",trailtrig=" + str.tostring(tsl_input_pips) + ",traildist=" + str.tostring(tsl_input_pips) + ",trailstep=1" : "")

else if use_tp1 and not use_tp2

    entry_short_TP1_alert_message := pineconnector_licence_ID + ",sell," + syminfo.ticker + ",risk=" + str.tostring(pos_size * tp1_qty_perc) + ",tp=" + str.tostring(final_TP1_Short)
     + (use_sl ? ",sl=" + str.tostring(final_SL_Short) : "") + (use_sl_be ? ",beoffset=" + str.tostring(sl_be_offset) + ",betrigger=" + str.tostring(sl_be_value) : "")
     + (use_tsl ? ",trailtrig=" + str.tostring(tsl_input_pips) + ",traildist=" + str.tostring(tsl_input_pips) + ",trailstep=1" : "")

else if not use_tp1 and use_tp2

    entry_short_TP2_alert_message := pineconnector_licence_ID + ",sell," + syminfo.ticker + ",risk=" + str.tostring(pos_size) + ",tp=" + str.tostring(final_TP2_Short)
     + (use_sl ? ",sl=" + str.tostring(final_SL_Short) : "") + (use_sl_be ? ",beoffset=" + str.tostring(sl_be_offset) + ",betrigger=" + str.tostring(sl_be_value) : "")
     + (use_tsl ? ",trailtrig=" + str.tostring(tsl_input_pips) + ",traildist=" + str.tostring(tsl_input_pips) + ",trailstep=1" : "")

entry_short_limit_alert_message := entry_short_TP1_alert_message + "\n" + entry_short_TP2_alert_message

long_update_sl_alert_message  = pineconnector_licence_ID + ",newsltplong," + syminfo.ticker + ",sl=" + str.tostring(final_SL_Long)
short_update_sl_alert_message = pineconnector_licence_ID + ",newsltpshort," + syminfo.ticker + ",sl=" + str.tostring(final_SL_Short)

cancel_long = pineconnector_licence_ID + ",cancellong," + syminfo.ticker// + "x"

cancel_short = pineconnector_licence_ID + ",cancellong," + syminfo.ticker// + "x"

close_long  = pineconnector_licence_ID + ",closelong," + syminfo.ticker
close_short = pineconnector_licence_ID + ",closeshort," + syminfo.ticker

if bull and strategy.position_size <= 0
    
    alert(close_short, alert.freq_once_per_bar_close)
    strategy.entry("Long", strategy.long)
    alert(entry_long_TP1_alert_message, alert.freq_once_per_bar_close)
    alert(entry_long_TP2_alert_message, alert.freq_once_per_bar_close)

else if bear and strategy.position_size >= 0
    
    alert(close_long, alert.freq_once_per_bar_close)
    strategy.entry("Short", strategy.short)
    alert(entry_short_TP1_alert_message, alert.freq_once_per_bar_close)
    alert(entry_short_TP2_alert_message, alert.freq_once_per_bar_close)

if strategy.position_size[1] > 0

    if low <= final_SL_Long and use_sl
        strategy.close("Long", alert_message = close_long)
    else
        strategy.exit("Exit TP1 Long", "Long", limit = final_TP1_Long, comment_profit = "Exit TP1 Long", qty_percent = tp1_qty)
        strategy.exit("Exit TP2 Long", "Long", limit = final_TP2_Long, comment_profit = "Exit TP2 Long", alert_message = close_long)

    if bull_count[1] == 5 and bull_count < 5 and barstate.isconfirmed and use_close_opposite
        strategy.close("Long", comment = "1 or more MACDs became bearish", alert_message = close_long)

else if strategy.position_size[1] < 0

    if high >= final_SL_Short and use_sl
        //strategy.exit("Exit SL Short", "Short", stop = final_SL_Short, comment_loss = "Exit SL Short")
        strategy.close("Short", alert_message = close_short)
    else
        strategy.exit("Exit TP1 Short", "Short", limit = final_TP1_Short, comment_profit = "Exit TP1 Short", qty_percent = tp1_qty)
        strategy.exit("Exit TP2 Short", "Short", limit = final_TP2_Short, comment_profit = "Exit TP2 Short")

    if bear_count[1] == 5 and bear_count < 5 and barstate.isconfirmed and use_close_opposite
        strategy.close("Short", comment = "1 or more MACDs became bullish", alert_message = close_short)

// # ========================================================================= #
// #                   |   Logs  |
// # ========================================================================= #

// if bull and strategy.position_size <= 0
//     log.info(entry_long_limit_alert_message)

// else if bear and strategy.position_size >= 0
//     log.info(entry_short_limit_alert_message)

// # ========================================================================= #
// #                   |   Reset Variables  |
// # ========================================================================= #


if (strategy.position_size > 0 and strategy.position_size[1] <= 0)
 or (strategy.position_size < 0 and strategy.position_size[1] >= 0)

    //is_TP1_REACHED := false
    SL_BE_REACHED := false
```

> Detail

https://www.fmz.com/strategy/430153

> Last Modified

2023-10-25 15:21:39
