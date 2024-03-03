
> Name

多时间框架RSICCI布林带DCA策略Multi-timeframe-RSICCIBollinger-Band-DCA-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ffa69d53046c1b0431.png)
[trans]

## 概述

该策略是一种趋势跟踪策略,它通过RSI、CCI和布林带等多个指标在不同的时间框架上判断趋势方向,实现DCA分次入场,以追捕趋势获利。

## 策略原理

1. 在5分钟、15分钟和30分钟时间框架上分别计算RSI和CCI指标。
2. 当较短周期的RSI低于某值,较长周期的RSI也低于某值时判断为超买,当较短周期的RSI高于某值,较长周期的RSI也高于某值时判断为超卖。CCI指标判断逻辑与RSI类似。
3. 布林带判断价格是否距离中轨太远,作为辅助判断指标。
4. 在超买时逐步做多入场,在超卖时逐步做空入场,实现DCA效应。

## 优势分析

1. 多时间框架指标组合判断,提高判断准确率
2. DCA策略,降低买点成本
3. 可自定义每单占总资金的比例,控制风险

## 风险分析 

1. 错过最佳入场点风险  
2. 趋势反转风险
3. 参数不当导致过度交易风险

解决方法:

1. 优化参数,确保指标参数匹配
2. 结合更多指标判断趋势
3. 调整每单数量占比 

## 优化方向

1. 测试更多指标的组合,寻找最佳组合
2. 对每单数量占比进行优化
3. 增加止损策略

## 总结

本策略通过多时间框架RSI和CCI判断趋势方向,在超买超卖时分批做单DCA入场,在行情出现较大方向性时,其追踪趋势获利的效果很好。但参数设置不当也容易造成过度交易。总体来说,该策略对参数和止损优化空间较大,经过优化后可以获得较好的效果。

||

## Overview

This strategy is a trend following strategy that determines trend direction through RSI, CCI and Bollinger Band indicators across different timeframes and gets in the market gradually via DCA to follow the trend for profits.

## Strategy Logic  

1. Calculate RSI and CCI indicators on the 5min, 15min and 30min timeframes.  
2. When shorter-period RSI drops below a threshold and longer-period RSI also drops below a threshold, it is considered overbought. When shorter RSI rises above a threshold and longer RSI also rises above a threshold, it is considered oversold. CCI indicator logic is similar to RSI.
3. Bollinger Bands judge if price has deviated too far from middle band. It serves as an auxiliary indicator.
4. Gradually long on oversold and gradually short on overbought to achieve DCA effect.

## Advantage Analysis

1. Indicator combination across timeframes improves accuracy  
2. DCA strategy reduces average entry price  
3. Customizable position sizing controls risk

## Risk Analysis

1. Risk of missing best entry point  
2. Trend reversal risk 
3. Excessive trading risk from poor parameters  

Solutions:

1. Optimize parameters to ensure alignment  
2. Incorporate more indicators to determine trend
3. Adjust per order position sizing  

## Optimization Directions  

1. Test combination of more indicators to find best combination  
2. Optimize per order position sizing   
3. Add stop loss  

## Summary  

This strategy determines trend direction through multi-timeframe RSI and CCI, gets in the market via staged orders on overbought/oversold. It works very well when strong trend emerges. But inappropriate parameters can also lead to overtrading. Generally speaking, this strategy has large room for parameter tuning and stop loss optimization and can produce good results after optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 January 2021 00:00)|Start Time|
|v_input_2|timestamp(01 January 2022 00:00)|End Time|
|v_input_source_1_close|0|Source Bot: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|Trade Direction: Long Bot|Short Bot|
|v_input_bool_11|false|Show signals|
|v_input_float_1|13.03|(?weight of orders in %)1 order (%)|
|v_input_float_2|14.29|2 order (%)|
|v_input_float_3|17.19|3 order (%)|
|v_input_float_4|22.67|4 order (%)|
|v_input_float_5|32.8|5 order (%)|
|v_input_float_6|80|(?Long Bot)Rate cover (%)|
|v_input_float_7|1.4|Take Profit (%)|
|v_input_bool_1|false|StopLoss|
|v_input_float_8|80|for Long Bot (%)|
|v_input_float_9|500|(?Short Bot)Rate cover (%)|
|v_input_float_10|1.4|Take Profit (%)|
|v_input_bool_2|false|StopLoss|
|v_input_float_11|500|for Short Bot (%)|
|v_input_source_2_close|0|(?indicators)Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_3|true|(?RSI-1)RSI-1|
|v_input_timeframe_1|5|resolution|
|v_input_int_1|65|long <|
|v_input_int_2|14|Length|
|v_input_int_3|37|short >|
|v_input_int_4|14|Length|
|v_input_bool_4|true|(?RSI-2)RSI-2|
|v_input_timeframe_2|15|resolution|
|v_input_int_5|72|long <|
|v_input_int_6|14|Length|
|v_input_int_7|37|short >|
|v_input_int_8|14|Length|
|v_input_bool_5|true|(?RSI-3)RSI-3|
|v_input_timeframe_3|30|resolution|
|v_input_int_9|74|long <|
|v_input_int_10|14|Length|
|v_input_int_11|34|short >|
|v_input_int_12|14|Length|
|v_input_bool_6|true|(?CCI-1)CCI-1|
|v_input_timeframe_4|5|resolution|
|v_input_int_13|190|long <|
|v_input_int_14|20|Length|
|v_input_int_15|-175|short >|
|v_input_int_16|20|Length|
|v_input_bool_7|true|(?CCI-2)CCI-2|
|v_input_timeframe_5|15|resolution|
|v_input_int_17|195|long <|
|v_input_int_18|20|Length|
|v_input_int_19|-205|short >|
|v_input_int_20|20|Length|
|v_input_bool_8|true|(?CCI-3)CCI-3|
|v_input_timeframe_6|30|resolution|
|v_input_int_21|200|long <|
|v_input_int_22|20|Length|
|v_input_int_23|-220|short >|
|v_input_int_24|20|Length|
|v_input_bool_9|false|(?Bollinger Bands)BB|
|v_input_timeframe_7|5|resolution|
|v_input_float_12|2|Deviation|
|v_input_int_25|20|Length|
|v_input_bool_10|false|(?band CCI)band CCI|
|v_input_timeframe_8|60|resolution|
|v_input_int_26|20|CCI Length|
|v_input_int_27|-110|CCI >|
|v_input_int_28|110|CCI <|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © rrolik66

//@version=5

strategy(title="3RSI 3CCI BB 5orders DCA strategy+", overlay=true )

start_time = input(defval=timestamp('01 January 2021 00:00'), title='Start Time')
end_time = input(defval=timestamp('01 January 2022 00:00'), title='End Time')

src_bot = input.source(close, 'Source Bot')
tradeDirection = input.string(title='Trade Direction', options=['Long Bot', 'Short Bot'], defval='Long Bot')

weight_order0 = input.float(13.03, title='1 order (%)', group='weight of orders in %', inline='Input 0') * 0.01
weight_order1 = input.float(14.29, title='2 order (%)', group='weight of orders in %', inline='Input 0') * 0.01
weight_order2 = input.float(17.19, title='3 order (%)', group='weight of orders in %', inline='Input 1') * 0.01
weight_order3 = input.float(22.67, title='4 order (%)', group='weight of orders in %', inline='Input 1') * 0.01
weight_order4 = input.float(32.80, title='5 order (%)', group='weight of orders in %', inline='Input 2') * 0.01

st_long_orders = input.float(title='Rate cover (%)', minval=1, defval=80, group='Long Bot', inline='Input 1') / 4 * 0.01
longTakeProfit = input.float(1.4, step=0.05, title='Take Profit (%)', group='Long Bot', inline='Input 1') * 0.01
entry_long_SL = input.bool(defval=false, title='StopLoss', group='Long Bot', inline='Input 2')
longStopLoss = input.float(80, step=0.1, title='for Long Bot (%)', group='Long Bot', inline='Input 2') * 0.01

st_short_orders = input.float(title='Rate cover (%)', minval=1, defval=500, group='Short Bot', inline='Input 1') / 4 * 0.01
shortTakeProfit = input.float(1.4, step=0.05, title='Take Profit (%)', group='Short Bot', inline='Input 1') * 0.01
entry_short_SL = input.bool(defval=false, title='StopLoss', group='Short Bot', inline='Input 2')
shortStopLoss = input.float(500, step=0.1, title='for Short Bot (%)', group='Short Bot', inline='Input 2') * 0.01

//inputs for indicators

src = input.source(close, 'Source', group='indicators')

rsi1_input = input.bool(defval=true, title='RSI-1', group='RSI-1', inline='Input 0')
rsi1_res = input.timeframe(title='resolution', defval='5', group='RSI-1', inline='Input 0')
rsi1_low = input.int(65, minval=0, maxval=100, title='long <', group='RSI-1', inline='Input 1')
rsi1_len_long = input.int(14, minval=1, title='Length', group='RSI-1', inline='Input 1')
rsi1_up = input.int(37, minval=0, maxval=100, title='short >', group='RSI-1', inline='Input 2')
rsi1_len_short = input.int(14, minval=1, title='Length', group='RSI-1', inline='Input 2')

rsi2_input = input.bool(defval=true, title='RSI-2', group='RSI-2', inline='Input 0')
rsi2_res = input.timeframe(title='resolution', defval='15', group='RSI-2', inline='Input 0')
rsi2_low = input.int(72, minval=0, maxval=100, title='long <', group='RSI-2', inline='Input 1')
rsi2_len_long = input.int(14, minval=1, title='Length', group='RSI-2', inline='Input 1')
rsi2_up = input.int(37, minval=0, maxval=100, title='short >', group='RSI-2', inline='Input 2')
rsi2_len_short = input.int(14, minval=1, title='Length', group='RSI-2', inline='Input 2')

rsi3_input = input.bool(defval=true, title='RSI-3', group='RSI-3', inline='Input 0')
rsi3_res = input.timeframe(title='resolution', defval='30', group='RSI-3', inline='Input 0')
rsi3_low = input.int(74, minval=0, maxval=100, title='long <', group='RSI-3', inline='Input 1')
rsi3_len_long = input.int(14, minval=1, title='Length', group='RSI-3', inline='Input 1')
rsi3_up = input.int(34, minval=0, maxval=100, title='short >', group='RSI-3', inline='Input 2')
rsi3_len_short = input.int(14, minval=1, title='Length', group='RSI-3', inline='Input 2')

cci1_input = input.bool(defval=true, title='CCI-1', group='CCI-1', inline='Input 0')
cci1_res = input.timeframe(title='resolution', defval='5', group='CCI-1', inline='Input 0')
cci1_low = input.int(190, step=5, title='long <', group='CCI-1', inline='Input 1')
cci1_len_long = input.int(20, minval=1, title='Length', group='CCI-1', inline='Input 1')
cci1_up = input.int(-175, step=5, title='short >', group='CCI-1', inline='Input 2')
cci1_len_short = input.int(20, minval=1, title='Length', group='CCI-1', inline='Input 2')

cci2_input = input.bool(defval=true, title='CCI-2', group='CCI-2', inline='Input 0')
cci2_res = input.timeframe(title='resolution', defval='15', group='CCI-2', inline='Input 0')
cci2_low = input.int(195, step=5, title='long <', group='CCI-2', inline='Input 1')
cci2_len_long = input.int(20, minval=1, title='Length', group='CCI-2', inline='Input 1')
cci2_up = input.int(-205, step=5, title='short >', group='CCI-2', inline='Input 2')
cci2_len_short = input.int(20, minval=1, title='Length', group='CCI-2', inline='Input 2')

cci3_input = input.bool(defval=true, title='CCI-3', group='CCI-3', inline='Input 0')
cci3_res = input.timeframe(title='resolution', defval='30', group='CCI-3', inline='Input 0')
cci3_low = input.int(200, step=5, title='long <', group='CCI-3', inline='Input 1')
cci3_len_long = input.int(20, minval=1, title='Length', group='CCI-3', inline='Input 1')
cci3_up = input.int(-220, step=5, title='short >', group='CCI-3', inline='Input 2')
cci3_len_short = input.int(20, minval=1, title='Length', group='CCI-3', inline='Input 2')

bb_input = input.bool(defval=false, title='BB', group='Bollinger Bands', tooltip='(for long trading) the price is below the lower band, (for short trading) the price is abowe the upper band, для лонга цена под нижней линией, для шорта цена над верхней линией', inline='Input 0')
bb_res = input.timeframe(title='resolution', defval='5', group='Bollinger Bands', inline='Input 0')
bb_dev = input.float(2.0, minval=0.1, maxval=50, step=0.1, title='Deviation', group='Bollinger Bands', inline='Input 2')
bb_len = input.int(20, minval=1, title='Length', group='Bollinger Bands', inline='Input 2')

cci_input = input.bool(defval=false, title='band CCI', group='band CCI', tooltip='this setting sets the trading range by the level of the "CCI" indicator, эта настройка задает диапазон торговли по уровню индикатора "CCI" (я не использую)', inline='Input 0')
cci_res = input.timeframe(title='resolution', defval='60', group='band CCI', inline='Input 0')
cci_len = input.int(20, minval=1, title='CCI Length', group='band CCI', inline='Input 1')
cci_low = input.int(-110, step=10, title='CCI >', group='band CCI', inline='Input 2')
cci_up = input.int(110, step=10, title='CCI <', group='band CCI', inline='Input 2')

show_signals = input.bool(defval=false, title='Show signals', inline='Input')

//Input to trading conditions
longOK = tradeDirection == 'Long Bot'
shortOK = tradeDirection == 'Short Bot'

within_window() => true

// get indicators
rsi1_sec_long = request.security(syminfo.tickerid, rsi1_res, ta.rsi(src, rsi1_len_long))
rsi1_sec_short = request.security(syminfo.tickerid, rsi1_res, ta.rsi(src, rsi1_len_short))
rsi2_sec_long = request.security(syminfo.tickerid, rsi2_res, ta.rsi(src, rsi2_len_long))
rsi2_sec_short = request.security(syminfo.tickerid, rsi2_res, ta.rsi(src, rsi2_len_short))
rsi3_sec_long = request.security(syminfo.tickerid, rsi3_res, ta.rsi(src, rsi3_len_long))
rsi3_sec_short = request.security(syminfo.tickerid, rsi3_res, ta.rsi(src, rsi3_len_short))

cci1_sec_long = request.security(syminfo.tickerid, cci1_res, ta.cci(src, cci1_len_long))
cci1_sec_short = request.security(syminfo.tickerid, cci1_res, ta.cci(src, cci1_len_short))
cci2_sec_long = request.security(syminfo.tickerid, cci2_res, ta.cci(src, cci2_len_long))
cci2_sec_short = request.security(syminfo.tickerid, cci2_res, ta.cci(src, cci2_len_short))
cci3_sec_long = request.security(syminfo.tickerid, cci3_res, ta.cci(src, cci3_len_long))
cci3_sec_short = request.security(syminfo.tickerid, cci3_res, ta.cci(src, cci3_len_short))

[basis, upper_bb, lower_bb] = request.security(syminfo.tickerid, bb_res, ta.bb(src, bb_len, bb_dev))

cci_sec = request.security(syminfo.tickerid, cci_res, ta.cci(src, cci_len))

// calculate indicators
float rating_long = 0
float rating_long_num = 0
float rating_short = 0
float rating_short_num = 0


float rsi1_long = na
float rsi1_short = na
if not na(rsi1_sec_long) and rsi1_input and longOK
    rsi1_long := rsi1_sec_long < rsi1_low ? 1 : 0
if not na(rsi1_sec_short) and rsi1_input and shortOK
    rsi1_short := rsi1_sec_short > rsi1_up ? 1 : 0
if not na(rsi1_long)
    rating_long += rsi1_long
    rating_long_num += 1
if not na(rsi1_short)
    rating_short += rsi1_short
    rating_short_num += 1

float rsi2_long = na
float rsi2_short = na
if not na(rsi2_sec_long) and rsi2_input and longOK
    rsi2_long := rsi2_sec_long < rsi2_low ? 1 : 0
if not na(rsi2_sec_short) and rsi2_input and shortOK
    rsi2_short := rsi2_sec_short > rsi2_up ? 1 : 0
if not na(rsi2_long)
    rating_long += rsi2_long
    rating_long_num += 1
if not na(rsi2_short)
    rating_short += rsi2_short
    rating_short_num += 1

float rsi3_long = na
float rsi3_short = na
if not na(rsi3_sec_long) and rsi3_input and longOK
    rsi3_long := rsi3_sec_long < rsi3_low ? 1 : 0
if not na(rsi3_sec_short) and rsi3_input and shortOK
    rsi3_short := rsi3_sec_short > rsi3_up ? 1 : 0
if not na(rsi3_long)
    rating_long += rsi3_long
    rating_long_num += 1
if not na(rsi3_short)
    rating_short += rsi3_short
    rating_short_num += 1


float cci1_long = na
float cci1_short = na
if not na(cci1_sec_long) and cci1_input and longOK
    cci1_long := cci1_sec_long < cci1_low ? 1 : 0
if not na(cci1_sec_short) and cci1_input and shortOK
    cci1_short := cci1_sec_short > cci1_up ? 1 : 0
if not na(cci1_long)
    rating_long += cci1_long
    rating_long_num += 1
if not na(cci1_short)
    rating_short += cci1_short
    rating_short_num += 1

float cci2_long = na
float cci2_short = na
if not na(cci2_sec_long) and cci2_input and longOK
    cci2_long := cci2_sec_long < cci2_low ? 1 : 0
if not na(cci2_sec_short) and cci2_input and shortOK
    cci2_short := cci2_sec_short > cci2_up ? 1 : 0
if not na(cci2_long)
    rating_long += cci2_long
    rating_long_num += 1
if not na(cci2_short)
    rating_short += cci2_short
    rating_short_num += 1

float cci3_long = na
float cci3_short = na
if not na(cci3_sec_long) and cci3_input and longOK
    cci3_long := cci3_sec_long < cci3_low ? 1 : 0
if not na(cci3_sec_short) and cci3_input and shortOK
    cci3_short := cci3_sec_short > cci3_up ? 1 : 0
if not na(cci3_long)
    rating_long += cci3_long
    rating_long_num += 1
if not na(cci3_short)
    rating_short += cci3_short
    rating_short_num += 1

float bb_long = na
float bb_short = na
if not(na(lower_bb) or na(src) or na(src[1])) and bb_input and longOK
    bb_long := src < lower_bb ? 1 : 0
if not(na(upper_bb) or na(src) or na(src[1])) and bb_input and shortOK
    bb_short := src > upper_bb ? 1 : 0
if not na(bb_long)
    rating_long += bb_long
    rating_long_num += 1
if not na(bb_short)
    rating_short += bb_short
    rating_short_num += 1

float cci_band = na
if not na(cci_sec) and cci_input
    cci_band := cci_sec < cci_up and cci_sec > cci_low ? 1 : 0
if not na(cci_band)
    rating_long += cci_band
    rating_long_num += 1
    rating_short += cci_band
    rating_short_num += 1

//Buy Sell
Buy_ok = rating_long_num != 0 and longOK ? rating_long == rating_long_num : true
Sell_ok = rating_short_num != 0 and shortOK ? rating_short == rating_short_num : true

// Plotting
plotshape(Buy_ok and show_signals and longOK, title='Buy', text='Long', textcolor=color.new(color.white, 0), style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), size=size.tiny)
plotshape(Sell_ok and show_signals and shortOK, title='Sell', text='Short', textcolor=color.new(color.white, 0), style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), size=size.tiny)

strategy.initial_capital  =50000
//Figure in entry orders price

longEntryPrice0 = src_bot
longEntryPrice1 = longEntryPrice0 * (1 - st_long_orders)
longEntryPrice2 = longEntryPrice0 * (1 - st_long_orders * 2)
longEntryPrice3 = longEntryPrice0 * (1 - st_long_orders * 3)
longEntryPrice4 = longEntryPrice0 * (1 - st_long_orders * 4)

longEntryqty0 = strategy.initial_capital * weight_order0 / longEntryPrice0
longEntryqty1 = strategy.initial_capital * weight_order1 / longEntryPrice1
longEntryqty2 = strategy.initial_capital * weight_order2 / longEntryPrice2
longEntryqty3 = strategy.initial_capital * weight_order3 / longEntryPrice3
longEntryqty4 = strategy.initial_capital * weight_order4 / longEntryPrice4

shortEntryPrice0 = src_bot
shortEntryPrice1 = shortEntryPrice0 * (1 + st_short_orders)
shortEntryPrice2 = shortEntryPrice0 * (1 + st_short_orders * 2)
shortEntryPrice3 = shortEntryPrice0 * (1 + st_short_orders * 3)
shortEntryPrice4 = shortEntryPrice0 * (1 + st_short_orders * 4)

shortcontracts = strategy.initial_capital / shortEntryPrice0
shortEntryqty0 = shortcontracts * weight_order0
shortEntryqty1 = shortcontracts * weight_order1
shortEntryqty2 = shortcontracts * weight_order2
shortEntryqty3 = shortcontracts * weight_order3
shortEntryqty4 = shortcontracts * weight_order4

long_entry_price = strategy.opentrades.entry_price (0)
short_entry_price = strategy.opentrades.entry_price (0)

longTP = strategy.position_avg_price * (1 + longTakeProfit)
longSL = long_entry_price * (1 - longStopLoss)
shortTP = strategy.position_avg_price * (1 - shortTakeProfit)
shortSL = short_entry_price * (1 + shortStopLoss)

plot(series=strategy.position_size > 0 and longOK ? longTP : na, color=color.new(color.red, 0), style=plot.style_circles, linewidth=3, title='Long Take Profit')
plot(series=strategy.position_size > 0 and entry_long_SL and longOK ? longSL : na, color=color.new(color.black, 0), style=plot.style_circles, linewidth=1, title='Long Stop Loss')
plot(series=strategy.position_size < 0 and shortOK ? shortTP : na, color=color.new(color.green, 0), style=plot.style_circles, linewidth=3, title='Long Take Profit')
plot(series=strategy.position_size < 0 and entry_short_SL and shortOK ? shortSL : na, color=color.new(color.black, 0), style=plot.style_circles, linewidth=1, title='Long Stop Loss')

// Submit entry orders
if strategy.opentrades == 0 and longOK and within_window()
    strategy.order(id='Long0', direction=strategy.long, qty=longEntryqty0, limit=longEntryPrice0, when=Buy_ok)
    strategy.order(id='Long1', direction=strategy.long, qty=longEntryqty1, limit=longEntryPrice1, when=Buy_ok)
    strategy.order(id='Long2', direction=strategy.long, qty=longEntryqty2, limit=longEntryPrice2, when=Buy_ok)
    strategy.order(id='Long3', direction=strategy.long, qty=longEntryqty3, limit=longEntryPrice3, when=Buy_ok)
    strategy.order(id='Long4', direction=strategy.long, qty=longEntryqty4, limit=longEntryPrice4, when=Buy_ok)

if strategy.opentrades == 0 and shortOK and within_window()
    strategy.order(id='Short0', direction=strategy.short, qty=shortEntryqty0, limit=shortEntryPrice0, when=Sell_ok)
    strategy.order(id='Short1', direction=strategy.short, qty=shortEntryqty1, limit=shortEntryPrice1, when=Sell_ok)
    strategy.order(id='Short2', direction=strategy.short, qty=shortEntryqty2, limit=shortEntryPrice2, when=Sell_ok)
    strategy.order(id='Short3', direction=strategy.short, qty=shortEntryqty3, limit=shortEntryPrice3, when=Sell_ok)
    strategy.order(id='Short4', direction=strategy.short, qty=shortEntryqty4, limit=shortEntryPrice4, when=Sell_ok)

// exit position
if (strategy.position_size > 0) and not entry_long_SL and longOK
	strategy.exit(id='exit_Long', limit=longTP, qty=strategy.position_size, when=strategy.position_size[1] > 0)

if (strategy.position_size > 0) and entry_long_SL and longOK
	strategy.exit(id='exit_Long', limit=longTP, stop=longSL, qty=strategy.position_size, when=strategy.position_size[1] > 0)

if (strategy.position_size < 0) and not entry_short_SL and shortOK
	strategy.exit(id='exit_Short', limit=shortTP, qty=math.abs(strategy.position_size), when=strategy.position_size[1] < 0)

if (strategy.position_size < 0) and entry_short_SL and shortOK
	strategy.exit(id='exit_Short', limit=shortTP, stop=shortSL, qty=math.abs(strategy.position_size), when=strategy.position_size[1] < 0)

// Cleanup
if ta.crossunder(strategy.opentrades, 0.5)
    strategy.close_all()
    strategy.cancel_all()

```

> Detail

https://www.fmz.com/strategy/432802

> Last Modified

2023-11-21 16:17:34
