
> Name

追踪昨日高点策略Yesterdays-High-Breakout-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略基于前一交易日的最高价进行操作,属于趋势跟踪类型策略。它会在突破前一交易日的最高价时开多仓,即使当天有多次突破也会重复开仓。

### 策略原理

1. 使用LucF函数避免回测时偷看最新K线。

2. 判断是否是新交易日开盘。记录当天最高价max_today和最低价min_today。

3. 比较当前最高价high和max_today,更新max_today。

4. 比较当前最低价low和min_today,更新min_today。

5. 画出前一交易日的最高价和最低价。

6. 设置突破前一交易日最高价时的开仓点,可以在最高价上添加一定幅度的GAP以延迟或提前入场。

7. 设置止损比例sl和止盈比例tp。

8. 当价格突破前一交易日最高价时开多仓。

9. 设置止损点和止盈点。

10. 可以选择是否开启追踪止损,设置启动追踪止损的最低要求、追踪止损的距离。

11. 可以选择关闭时是否判断EMA状态。

### 优势分析

这是一个相对简单的趋势跟踪策略,具有如下优势:

1. 策略信号简单明确,易于实现。

2. 利用前一交易日最高价的突破形成的趋势确认信号,可以有效过滤震荡市场的噪音。

3. 可以通过GAP参数调节进场的灵敏度。

4. 整体风险可控,止损清晰。

5. 可以选择是否使用追踪止损来锁定更多利润。

6. 可以结合EMA判断来避免死叉时被套。

### 风险分析

该策略也存在一些风险需要注意:

1. 突破失败可能造成损失,需要合理设置止损价位。

2. 突破有效性依赖于市场处于趋势状态,震荡市场中容易被套。

3. 追踪止损如果设置不当可能过于灵敏,被价格小幅调整止损。

4. EMA判断如果参数选择不当也可能过于灵敏或迟钝。

5. 需要关注和优化的变量较多,如GAP、止损幅度、追踪止损设置等。

### 优化方向

可以从以下几个方面继续优化该策略:

1. 将止损从固定值调整为ATR或趋势的动态止损。

2. 增加通过标准差过滤来判断突破有效性。

3. 增加基于波动率的条件来避免震荡行情的无效突破。

4. 优化EMA参数,使得判断更稳定和准确。

5. 优化追踪止损的参数,使其更符合市场波动的幅度。

6. 测试不同品种的参数健壮性。

7. 增加动态调整仓位大小的机制。

### 总结

该策略整体较为简单实用,属于典型的趋势跟踪策略,以前一交易日最高价的突破作为信号来追踪趋势,风险控制主要依靠止损来实现。通过合理的参数优化,可以使策略在趋势行情中获得较好的效果。但需要注意控制止损策略和过滤条件,避免在震荡行情中被套。该策略可以作为趋势跟踪策略的基础框架进行拓展优化。

|| 

## Overview

This strategy operates based on the previous trading day's high, working in a trend-following mode. It goes long when yesterday's high is broken out, even if there are multiple breakouts in a day.

## Strategy Logic

1. Use LucF function to avoid lookahead bias in backtesting. 

2. Identify if it's a new trading day open. Record the day high max_today and low min_today.

3. Compare current high with max_today, update max_today if surpassed.

4. Compare current low with min_today, update min_today if breached.

5. Plot previous trading day's high and low levels.

6. Set entry point on breakout of previous day's high, GAP can be added to advance or delay entry.

7. Set stop loss percentage sl and take profit percentage tp. 

8. Go long when price breaks previous trading day's high.

9. Set stop loss price and take profit price.

10. Optionally enable trailing stop loss, with activation level and offset distance.

11. Optionally close trade based on EMA crossover.

## Advantage Analysis

This simple trend following strategy has the following advantages:

1. Clear and straightforward signal generation. Easy to implement.

2. Breakout of previous day's high provides trend confirmation, reducing whipsaws. 

3. GAP parameter allows adjusting entry sensitivity.

4. Overall risk is controlled with clear stop loss. 

5. Trailing stop can be used to lock in more profits.

6. EMA crossover avoids being trapped in downtrends.

## Risk Analysis

There are some risks to note:

1. Failed breakout can cause losses. Reasonable stop loss needed.

2. Requires trending market. Whipsaws likely in ranging conditions.

3. Improper trailing stop can get stopped out prematurely. 

4. Poor EMA parameter choice can make it too sensitive or lagging.

5. Multiple variables need tuning like GAP, stop loss, trailing stop etc.

## Improvement Opportunities

Some ways to further optimize the strategy:

1. Use dynamic stop loss based on ATR or trend.

2. Add filter for valid breakout using standard deviation. 

3. Add volatility condition to avoid false breakout in choppy markets.

4. Optimize EMA parameter for more robust signal. 

5. Fine tune trailing stop parameters to match market volatility.

6. Test parameter robustness across different instruments. 

7. Add dynamic position sizing mechanism. 

## Conclusion

The strategy is simple and practical as a typical trend following system based on previous day's high breakout. Risk management depends on stop loss primarily. With proper parameter tuning, it can perform well in trending conditions. But proper stop loss and filters are needed to avoid whipsaws. The framework can be enhanced further as a basis for trend following strategies.

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
start: 2023-09-30 00:00:00
end: 2023-10-07 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// © TheSocialCryptoClub

//@version=5

strategy("Yesterday's High", overlay=true, pyramiding = 1,
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

https://www.fmz.com/strategy/428695

> Last Modified

2023-10-08 14:06:55
