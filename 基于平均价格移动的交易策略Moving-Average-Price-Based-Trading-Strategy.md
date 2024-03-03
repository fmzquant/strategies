
> Name

基于平均价格移动的交易策略Moving-Average-Price-Based-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/135bb068a7cd8948252.png)
[trans]
## 概述

这个策略的核心思想是基于平均价格的移动来产生交易信号。它结合了三种不同参数设置的超趋势指标,并且设置了ATR止损、锚定止损、百分比止损和点数止损等多种止损方式。

策略优势在于利用多重超趋势系统提高信号准确率,同时提供了弹性止损设置。

## 策略原理

1. 计算三组超趋势指标:超趋势线是根据ATR指标与价格平均值的乘积计算而来。当价格超过超趋势线时为看涨信号,当价格跌破超趋势线时为看跌信号。

2. 利用布林带指标的上轨和下轨来判断价格突破。布林带上轨突破为看涨信号,下轨突破为看跌信号。 

3. 结合三组超趋势指标的买卖信号,判断是否符合多头和空头的进入条件。 

4. 设置ATR止损、锚定止损、百分比止损和点数止损等多种止损方式,进行风险管理。

5. 根据ATR指标值的大小来判断是否进入场内。这可以用于过滤掉低波动率环境下的错误信号。

## 策略优势

1. 结合多组参数设置不同的超趋势指标,可以提高信号的准确性。

2. 利用布林带指标判断价格是否突破上下轨,避免假突破。

3. 提供多种止损方式进行风险管理,最大程度避免超出可承受的损失。

4. 利用ATR指标值来控制是否进入场内,可过滤误导信号。

## 策略风险

1. 多重指标组合判断进入时机,可能会错过部分较好的机会。

2. 止损方式设置不当可能造成超出期望的损失。

3. 布林带参数设置不当也会使得信号产生滞后。

4. ATR指标值过滤条件设置过严格也会导致较多信号被过滤。

## 策略优化方向

1. 调整超趋势指标的ATR周期参数,优化指标的敏感性。

2. 尝试不同类型的价格平均值作为超趋势指标的输入源,如加权移动平均线等。

3. 优化布林带的参数,使其能更快地响应价格的真实趋势。 

4. 结合市场的波动率特点,调整ATR指标过滤器的参数界限。

5. 在回测中测试不同止损条件下的收益率,找到最优止损点。

## 总结

该策略通过组合多个指标滤波和判断信号,在一定程度上过滤了部分噪音。同时提供了弹性的止损机制来控制风险。通过调整参数可以获得更好的策略表现。但多重指标判断也可能导致错过商机的问题。总体而言,该策略适用于中长线投资,可获得稳定的投资回报。

|| 

## Overview

The core idea of this strategy is to generate trading signals based on moving average price. It combines three Super Trend indicators with different parameters and offers flexible stop loss settings.

The advantage lies in improving signal accuracy through multiple Super Trend systems and providing adjustable stop loss options.

## How The Strategy Works

1. Calculate three Super Trend indicators: the Super Trend lines are calculated based on the product of ATR indicator and price average. When price breaks above the Super Trend line, it is a bullish signal. When price breaks below the line, it is a bearish signal.

2. Use the upper and lower bands of Bollinger Bands to determine if price breaks through. Breaking above upper band signals bullishness. Breaking below lower band signals bearishness.

3. Combine the buy and sell signals from the three Super Trend indicators to determine if criteria are met for long or short entry. 

4. Set up various stop loss mechanisms like ATR trailing stop, anchor stop loss, percentage stop loss and pip stop loss for risk management.

5. Judge if to enter positions based on ATR indicator value. This filters out erroneous signals in low volatility environments. 

## Advantages

1. Combining multiple Super Trend indicators with different parameters improves signal accuracy. 

2. Using Bollinger Bands to determine upper/lower band breaks avoids false breaks.

3. Multiple stop loss options provide effective risk control to maximize loss affordability. 

4. ATR filters help avoid misleading signals.

## Risks

1. Multiple signal criteria may cause missing some good opportunities. 

2. Improper stop loss setups can lead to unexpected big losses.

3. Poor BB parameter tuning makes signals lag. 

4. Overly strict ATR filters omit too many valid signals.

## Enhancement Guidelines 

1. Tune ATR period of Super Trend to optimize indicator sensitivity.

2. Test different price average sources as Super Trend input, like WMA.

3. Optimize BB parameters for better trend responsiveness.

4. Adjust ATR filter threshold based on market volatility.

5. Backtest to find optimum stop loss level for highest return.

## Conclusion

This strategy filters noises and controls risks to some extent by combining signals from multiple indicators and flexible stop loss mechanisms. Fine tuning parameters can lead to better performance. However, multiple signal criteria may also cause missing opportunities. Generally speaking, this strategy suits medium-long term investment for steady returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Plot Settings)Plot Signals|
|v_input_bool_2|true|Plot SL/TP Lines|
|v_input_bool_3|false|(?Supertrend 1)Plot Supertrend 1|
|v_input_bool_4|true|Supertrend 1 can be entry signal|
|v_input_string_1|0|Long: Supertrend 1 has to be in: uptrend|downtrend|unspecified|
|v_input_string_2|0|Short: Supertrend 1 has to be in: downtrend|uptrend|unspecified|
|v_input_int_1|20|ATR Period 1|
|v_input_1_hl2|0|Source 1: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|ATR Multiplier 1|
|v_input_bool_5|false|(?Supertrend 2)Plot Supertrend 2|
|v_input_bool_6|false|Supertrend 2 can be entry signal|
|v_input_string_3|0|Long: Supertrend 2 has to be in: uptrend|downtrend|unspecified|
|v_input_string_4|0|Short: Supertrend 2 has to be in: downtrend|uptrend|unspecified|
|v_input_int_2|5|ATR Period 2|
|v_input_2_hlcc4|0|Source 2: hlcc4|high|low|open|hl2|hlc3|close|ohlc4|
|v_input_float_2|15|ATR Multiplier 2|
|v_input_bool_7|false|(?Supertrend 3)Plot Supertrend 3|
|v_input_bool_8|true|Supertrend 3 can be entry signal|
|v_input_string_5|0|Long: Supertrend 3 has to be in: uptrend|downtrend|unspecified|
|v_input_string_6|0|Short: Supertrend 3 has to be in: downtrend|uptrend|unspecified|
|v_input_int_3|10|ATR Period 3|
|v_input_3_hl2|0|Source 3: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_float_3|3|ATR Multiplier 3|
|v_input_bool_9|false|(?Supertrend 4)Plot Supertrend 4|
|v_input_bool_10|true|Supertrend 4 can be entry signal|
|v_input_string_7|0|Long: Supertrend 4 has to be in: uptrend|downtrend|unspecified|
|v_input_string_8|0|Short: Supertrend 4 has to be in: downtrend|uptrend|unspecified|
|v_input_int_4|20|ATR Period 4|
|v_input_4_hl2|0|Source 4: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_float_4|10|ATR Multiplier 4|
|v_input_bool_11|true|(?Exit Strategy)ATR Based Stop Loss|
|v_input_int_5|100|ATR Length|
|v_input_string_9|0|ATR Smoothing: RMA/SMMA|SMA|EMA|WMA|
|v_input_bool_12|false|Candle Low/High Based Stop Loss|
|v_input_int_6|50|Candle Lookback|
|v_input_bool_13|false|Percentage Based Stop Loss|
|v_input_float_5|0.3|Percentage|
|v_input_bool_14|false|Pip Based Stop Loss|
|v_input_int_7|10|Pip|
|v_input_float_6|4.5|Base Risk Multiplier|
|v_input_float_7|1.5|Risk to Reward Ratio|
|v_input_bool_15|false|(?Force Exiting)1 - Force exit on custom session close|
|v_input_5|0930-1630:1234567|force_exit_exact_time_1|
|v_input_bool_16|false|2 - Force exit on custom session close|
|v_input_6|0930-1630:1234567|force_exit_exact_time_2|
|v_input_bool_17|false|3 - Force exit on custom session close|
|v_input_7|0930-1630:1234567|force_exit_exact_time_3|
|v_input_bool_18|false|4 - Force exit on custom session close|
|v_input_8|0930-1630:1234567|force_exit_exact_time_4|
|v_input_bool_19|true|(?Base Setups)Allow Long Entries|
|v_input_bool_20|true|Allow Short Entries|
|v_input_float_8|100000|Order Size|
|v_input_string_10|0|order_size_type: Cash|Contract(s)|Capital Percentage|
|v_input_bool_21|true|(?ATR Limiter)Use ATR Limiter|
|v_input_9|50|ATR Limiter Length|
|v_input_string_11|0|ATR Limiter Smoothing: RMA/SMMA|SMA|EMA|WMA|
|v_input_float_9|1000|High Boundary|
|v_input_float_10|0.0003|Low Boundary|
|v_input_string_12|0|MA based calculation: ATR value under MA|ATR value over MA|Unspecified|
|v_input_string_13|0|MA Type: RMA/SMMA|EMA|WMA|VWMA|SMA|SWMA|HMA|
|v_input_int_8|400|MA Length|
|v_input_string_14|0|(?Waddah Attar Filter)Explosion/Deadzone relation: Not specified|Explosion under Deadzone|Explosion over Deadzone|
|v_input_string_15|0|Limit trades based on trends: Not specified|Soft Trends|All Trends|Strong Trends|
|v_input_string_16|0|WA bar value: Not specified|Over Explosion and Deadzone|
|v_input_10|150|Sensitivity|
|v_input_string_17|0|Fast MA Type: SMA|EMA|WMA|VWMA|RMA/SMMA|SWMA|HMA|
|v_input_11|10|Fast MA Length|
|v_input_string_18|0|Slow MA Type: SMA|EMA|WMA|VWMA|RMA/SMMA|SWMA|HMA|
|v_input_12|20|Slow MA Length|
|v_input_string_19|0|Channel MA Type: EMA|SMA|WMA|VWMA|RMA/SMMA|SWMA|HMA|
|v_input_13|20|BB Channel Length|
|v_input_14|2|BB Stdev Multiplier|
|v_input_bool_22|false|(?Trend Filter)Use long trend filter 1|
|v_input_bool_23|false|Show long trend filter 1|
|v_input_string_20|0|TF1 - MA Type: EMA|SMA|WMA|VWMA|RMA/SMMA|SWMA|HMA|
|v_input_int_9|120|TF1 - MA Length|
|v_input_15_close|0|TF1 - MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_24|false|Use short trend filter 1|
|v_input_bool_25|false|Show short trend filter 1|
|v_input_string_21|0|TF2 - MA Type: EMA|SMA|WMA|VWMA|RMA/SMMA|SWMA|HMA|
|v_input_int_10|120|TF2 - MA Length|
|v_input_16_close|0|TF2 - MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_26|true|(?Volume Filter)Only enter trades where volume is higher then the volume-based MA|
|v_input_string_22|0|Volume-based MA Type: RMA/SMMA|EMA|WMA|VWMA|SMA|SWMA|HMA|
|v_input_int_11|200|Volume-based MA Length|
|v_input_bool_27|false|(?Date Range Limiter)Limit Between Dates|
|v_input_17|timestamp(Jan 01 2023 00:00:00)|Start Date|
|v_input_18|timestamp(Jun 24 2023 00:00:00)|End Date|
|v_input_bool_28|false|(?Session Limiter)Show session plots|
|v_input_bool_29|false|Use session limiter|
|v_input_bool_30|false|Sidney session|
|v_input_bool_31|false|Tokyo session|
|v_input_bool_32|false|London session|
|v_input_bool_33|false|New York session|
|v_input_bool_34|true|(?Trading Time Limiter)Limit Trading Time|
|v_input_string_23|123567|Valid Trading Days Global|
|v_input_bool_35|false|limit_day1|
|v_input_string_24|23456|(1) Valid Trading Days|
|v_input_bool_36|false|valid_hours1|
|v_input_19|1800-2000|(1) Valid Trading Hours Between|
|v_input_bool_37|false|limit_day2|
|v_input_string_25|1234567|(2) Valid Trading Days|
|v_input_bool_38|false|valid_hours2|
|v_input_20|0930-1600|(2) Valid Trading Hours Between|
|v_input_bool_39|false|limit_day3|
|v_input_string_26|1234567|(3) Valid Trading Days|
|v_input_bool_40|false|valid_hours3|
|v_input_21|0930-1600|(3) Valid Trading Hours Between|
|v_input_bool_41|false|(?PineConnector Automation)Use PineConnector Automation | PLEASE READ TOOLTIP -->|
|v_input_int_12|60123456789|License ID|
|v_input_float_11|true|Risk (trading volume)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-02 00:00:00
end: 2024-02-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=5
// @strategy_alert_message {{strategy.order.comment}}
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TradeSmart22

strategy( title="ATR GOD Strategy by TradeSmart", overlay=true)

// PLOT SETTINGS
plot_signals = input.bool(true, title="Plot Signals", group="Plot Settings", tooltip="Show Long and Short signals on the signal candle, besides the actual entry points of the strategy.")
plot_sl_tp = input.bool(true, title="Plot SL/TP Lines", group="Plot Settings")

// STRATEGY SETTINGS
// Supertrend 1
plot_st_1 = input.bool(false, title="Plot Supertrend 1", group="Supertrend 1")
can_be_entry_signal_st_1 = input.bool(true, title="Supertrend 1 can be entry signal", group="Supertrend 1", tooltip="This Supertrend will be checked for a potential entry signal. (meaning Buy for a Long entry and Sell for a Short entry) If disabled, the strategy will not enter on any Buy/Sell signals emitted by this particular Supertrend.\n\nNOTE: One of the Supertrends must be enabled to be a potential entry signal in order for the strategy to enter into any trades.")
long_trend_st_1 = input.string("uptrend", options=["uptrend", "downtrend", "unspecified"], title="Long: Supertrend 1 has to be in", group="Supertrend 1", tooltip="When checking for a potential Long entry signal, this particular Supertrend must be in the set trend or undefined (meaning that it can be in either up/down trends).")
short_trend_st_1 = input.string("downtrend", options=["uptrend", "downtrend", "unspecified"], title="Short: Supertrend 1 has to be in", group="Supertrend 1", tooltip="When checking for a potential Short entry signal, this particular Supertrend must be in the set trend or undefined (meaning that it can be in either up/down trends).")
per_st_1 = input.int(20, title="ATR Period 1", group="Supertrend 1")
src_st_1 = input(hl2, title="Source 1", group="Supertrend 1")
mult_st_1 = input.float(2.0, title="ATR Multiplier 1", step=0.1, group="Supertrend 1")

atr_st_1 = ta.atr(per_st_1)
up_st_1 = src_st_1 - (mult_st_1 * atr_st_1)
up1_st_1 = nz(up_st_1[1], up_st_1)
up_st_1 := close[1] > up1_st_1 ? math.max(up_st_1, up1_st_1) : up_st_1
dn_st_1 = src_st_1 + (mult_st_1 * atr_st_1)
dn1_st_1 = nz(dn_st_1[1], dn_st_1)
dn_st_1 := close[1] < dn1_st_1 ? math.min(dn_st_1, dn1_st_1) : dn_st_1
trend_st_1 = 1
trend_st_1 := nz(trend_st_1[1], trend_st_1)
trend_st_1 := trend_st_1 == -1 and close > dn1_st_1 ? 1 : trend_st_1 == 1 and close < up1_st_1 ? -1 : trend_st_1
buySignal_st_1 = trend_st_1 == 1 and trend_st_1[1] == -1
sellSignal_st_1 = trend_st_1 == -1 and trend_st_1[1] == 1

upPlot_st_1 = plot(trend_st_1 == 1 ? up_st_1 : na, title="Up Trend 1", style=plot.style_linebr, linewidth=1, color=color.rgb(20, 100, 20, 10), display=plot_st_1 ? display.all : display.none)
plotshape(buySignal_st_1 and plot_st_1 ? up_st_1 : na, title="Start Up Trend 1", location=location.absolute, style=shape.circle, size=size.tiny, color=color.rgb(20, 100, 20, 10))
plotshape(buySignal_st_1 and plot_st_1 ? up_st_1 : na, title="Buy 1", text="Buy 1", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.rgb(20, 100, 20, 10), textcolor=color.white)

dnPlot_st_1 = plot(trend_st_1 == 1 ? na : dn_st_1, title="Down Trend 1", style=plot.style_linebr, linewidth=1, color=color.rgb(100, 20, 20, 10), display=plot_st_1 ? display.all : display.none)
plotshape(sellSignal_st_1 and plot_st_1 ? dn_st_1 : na, title="Start Down Trend 1", location=location.absolute, style=shape.circle, size=size.tiny, color=color.rgb(100, 20, 20, 10))
plotshape(sellSignal_st_1 and plot_st_1 ? dn_st_1 : na, title="Sell 1", text="Sell 1", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.rgb(100, 20, 20, 10), textcolor=color.white)

// Supertrend 2
plot_st_2 = input.bool(false, title="Plot Supertrend 2", group="Supertrend 2")
can_be_entry_signal_st_2 = input.bool(false, title="Supertrend 2 can be entry signal", group="Supertrend 2", tooltip="This Supertrend will be checked for a potential entry signal. (meaning Buy for a Long entry and Sell for a Short entry) If disabled, the strategy will not enter on any Buy/Sell signals emitted by this particular Supertrend.\n\nNOTE: One of the Supertrends must be enabled to be a potential entry signal in order for the strategy to enter into any trades.")
long_trend_st_2 = input.string("uptrend", options=["uptrend", "downtrend", "unspecified"], title="Long: Supertrend 2 has to be in", group="Supertrend 2", tooltip="When checking for a potential Long entry signal, this particular Supertrend must be in the set trend or undefined (meaning that it can be in either up/down trends).")
short_trend_st_2 = input.string("downtrend", options=["uptrend", "downtrend", "unspecified"], title="Short: Supertrend 2 has to be in", group="Supertrend 2", tooltip="When checking for a potential Short entry signal, this particular Supertrend must be in the set trend or undefined (meaning that it can be in either up/down trends).")
per_st_2 = input.int(5, title="ATR Period 2", group="Supertrend 2")
src_st_2 = input(hlcc4, title="Source 2", group="Supertrend 2")
mult_st_2 = input.float(15, title="ATR Multiplier 2", step=0.1, group="Supertrend 2")

atr_st_2 = ta.atr(per_st_2)
up_st_2 = src_st_2 - (mult_st_2 * atr_st_2)
up1_st_2 = nz(up_st_2[1], up_st_2)
up_st_2 := close[1] > up1_st_2 ? math.max(up_st_2, up1_st_2) : up_st_2
dn_st_2 = src_st_2 + (mult_st_2 * atr_st_2)
dn1_st_2 = nz(dn_st_2[1], dn_st_2)
dn_st_2 := close[1] < dn1_st_2 ? math.min(dn_st_2, dn1_st_2) : dn_st_2
trend_st_2 = 1
trend_st_2 := nz(trend_st_2[1], trend_st_2)
trend_st_2 := trend_st_2 == -1 and close > dn1_st_2 ? 1 : trend_st_2 == 1 and close < up1_st_2 ? -1 : trend_st_2
buySignal_st_2 = trend_st_2 == 1 and trend_st_2[1] == -1
sellSignal_st_2 = trend_st_2 == -1 and trend_st_2[1] == 1

upPlot_st_2 = plot(trend_st_2 == 1 ? up_st_2 : na, title="Up Trend 2", style=plot.style_linebr, linewidth=1, color=color.rgb(40, 100, 40, 10), display=plot_st_2 ? display.all : display.none)
plotshape(buySignal_st_2 and plot_st_2 ? up_st_2 : na, title="Start Up Trend 2", location=location.absolute, style=shape.circle, size=size.tiny, color=color.rgb(40, 100, 40, 10))
plotshape(buySignal_st_2 and plot_st_2 ? up_st_2 : na, title="Buy 2", text="Buy 2", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.rgb(40, 100, 40, 10), textcolor=color.white)

dnPlot_st_2 = plot(trend_st_2 == 1 ? na : dn_st_2, title="Down Trend 2", style=plot.style_linebr, linewidth=1, color=color.rgb(100, 40, 40, 10), display=plot_st_2 ? display.all : display.none)
plotshape(sellSignal_st_2 and plot_st_2 ? dn_st_2 : na, title="Start Down Trend 2", location=location.absolute, style=shape.circle, size=size.tiny, color=color.rgb(100, 40, 40, 10))
plotshape(sellSignal_st_2 and plot_st_2 ? dn_st_2 : na, title="Sell 2", text="Sell 2", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.rgb(100, 40, 40, 10), textcolor=color.white)

// Supertrend 3
plot_st_3 = input.bool(false, title="Plot Supertrend 3", group="Supertrend 3")
can_be_entry_signal_st_3 = input.bool(true, title="Supertrend 3 can be entry signal", group="Supertrend 3", tooltip="This Supertrend will be checked for a potential entry signal. (meaning Buy for a Long entry and Sell for a Short entry) If disabled, the strategy will not enter on any Buy/Sell signals emitted by this particular Supertrend.\n\nNOTE: One of the Supertrends must be enabled to be a potential entry signal in order for the strategy to enter into any trades.")
long_trend_st_3 = input.string("uptrend", options=["uptrend", "downtrend", "unspecified"], title="Long: Supertrend 3 has to be in", group="Supertrend 3", tooltip="When checking for a potential Long entry signal, this particular Supertrend must be in the set trend or undefined (meaning that it can be in either up/down trends).")
short_trend_st_3 = input.string("downtrend", options=["uptrend", "downtrend", "unspecified"], title="Short: Supertrend 3 has to be in", group="Supertrend 3", tooltip="When checking for a potential Short entry signal, this particular Supertrend must be in the set trend or undefined (meaning that it can be in either up/down trends).")
per_st_3 = input.int(10, title="ATR Period 3", group="Supertrend 3")
src_st_3 = input(hl2, title="Source 3", group="Supertrend 3")
mult_st_3 = input.float(3.0, title="ATR Multiplier 3", step=0.1, group="Supertrend 3")

atr_st_3 = ta.atr(per_st_3)
up_st_3 = src_st_3 - (mult_st_3 * atr_st_3)
up1_st_3 = nz(up_st_3[1], up_st_3)
up_st_3 := close[1] > up1_st_3 ? math.max(up_st_3, up1_st_3) : up_st_3
dn_st_3 = src_st_3 + (mult_st_3 * atr_st_3)
dn1_st_3 = nz(dn_st_3[1], dn_st_3)
dn_st_3 := close[1] < dn1_st_3 ? math.min(dn_st_3, dn1_st_3) : dn_st_3
trend_st_3 = 1
trend_st_3 := nz(trend_st_3[1], trend_st_3)
trend_st_3 := trend_st_3 == -1 and close > dn1_st_3 ? 1 : trend_st_3 == 1 and close < up1_st_3 ? -1 : trend_st_3
buySignal_st_3 = trend_st_3 == 1 and trend_st_3[1] == -1
sellSignal_st_3 = trend_st_3 == -1 and trend_st_3[1] == 1

upPlot_st_3 = plot(trend_st_3 == 1 ? up_st_3 : na, title="Up Trend 3", style=plot.style_linebr, linewidth=1, color=color.rgb(60, 100, 60, 10), display=plot_st_3 ? display.all : display.none)
plotshape(buySignal_st_3 and plot_st_3 ? up_st_3 : na, title="Start Up Trend 3", location=location.absolute, style=shape.circle, size=size.tiny, color=color.rgb(60, 100, 60, 10))
plotshape(buySignal_st_3 and plot_st_3 ? up_st_3 : na, title="Buy 3", text="Buy 3", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.rgb(60, 100, 60, 10), textcolor=color.white)

dnPlot_st_3 = plot(trend_st_3 == 1 ? na : dn_st_3, title="Down Trend 3", style=plot.style_linebr, linewidth=1, color=color.rgb(100, 60, 60, 10), display=plot_st_3 ? display.all : display.none)
plotshape(sellSignal_st_3 and plot_st_3 ? dn_st_3 : na, title="Start Down Trend 3", location=location.absolute, style=shape.circle, size=size.tiny, color=color.rgb(100, 60, 60, 10))
plotshape(sellSignal_st_3 and plot_st_3 ? dn_st_3 : na, title="Sell 3", text="Sell 3", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.rgb(100, 60, 60, 10), textcolor=color.white)

// Supertrend 4
plot_st_4 = input.bool(false, title="Plot Supertrend 4", group="Supertrend 4")
can_be_entry_signal_st_4 = input.bool(true, title="Supertrend 4 can be entry signal", group="Supertrend 4", tooltip="This Supertrend will be checked for a potential entry signal. (meaning Buy for a Long entry and Sell for a Short entry) If disabled, the strategy will not enter on any Buy/Sell signals emitted by this particular Supertrend.\n\nNOTE: One of the Supertrends must be enabled to be a potential entry signal in order for the strategy to enter into any trades.")
long_trend_st_4 = input.string("uptrend", options=["uptrend", "downtrend", "unspecified"], title="Long: Supertrend 4 has to be in", group="Supertrend 4", tooltip="When checking for a potential Long entry signal, this particular Supertrend must be in the set trend or undefined (meaning that it can be in either up/down trends).")
short_trend_st_4 = input.string("downtrend", options=["uptrend", "downtrend", "unspecified"], title="Short: Supertrend 4 has to be in", group="Supertrend 4", tooltip="When checking for a potential Short entry signal, this particular Supertrend must be in the set trend or undefined (meaning that it can be in either up/down trends).")
per_st_4 = input.int(20, title="ATR Period 4", group="Supertrend 4")
src_st_4 = input(hl2, title="Source 4", group="Supertrend 4")
mult_st_4 = input.float(10.0, title="ATR Multiplier 4", step=0.1, group="Supertrend 4")

atr_st_4 = ta.atr(per_st_4)
up_st_4 = src_st_4 - (mult_st_4 * atr_st_4)
up1_st_4 = nz(up_st_4[1], up_st_4)
up_st_4 := close[1] > up1_st_4 ? math.max(up_st_4, up1_st_4) : up_st_4
dn_st_4 = src_st_4 + (mult_st_4 * atr_st_4)
dn1_st_4 = nz(dn_st_4[1], dn_st_4)
dn_st_4 := close[1] < dn1_st_4 ? math.min(dn_st_4, dn1_st_4) : dn_st_4
trend_st_4 = 1
trend_st_4 := nz(trend_st_4[1], trend_st_4)
trend_st_4 := trend_st_4 == -1 and close > dn1_st_4 ? 1 : trend_st_4 == 1 and close < up1_st_4 ? -1 : trend_st_4
buySignal_st_4 = trend_st_4 == 1 and trend_st_4[1] == -1
sellSignal_st_4 = trend_st_4 == -1 and trend_st_4[1] == 1

upPlot_st_4 = plot(trend_st_4 == 1 ? up_st_4 : na, title="Up Trend 4", style=plot.style_linebr, linewidth=1, color=color.rgb(0, 100, 100, 10), display=plot_st_4 ? display.all : display.none)
plotshape(buySignal_st_4 and plot_st_4 ? up_st_4 : na, title="Start Up Trend 4", location=location.absolute, style=shape.circle, size=size.tiny, color=color.rgb(0, 100, 100, 10))
plotshape(buySignal_st_4 and plot_st_4 ? up_st_4 : na, title="Buy 4", text="Buy 4", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.rgb(0, 100, 100, 10), textcolor=color.white)

dnPlot_st_4 = plot(trend_st_4 == 1 ? na : dn_st_4, title="Down Trend 4", style=plot.style_linebr, linewidth=1, color=color.rgb(100, 0, 100, 10), display=plot_st_4 ? display.all : display.none)
plotshape(sellSignal_st_4 and plot_st_4 ? dn_st_4 : na, title="Start Down Trend 4", location=location.absolute, style=shape.circle, size=size.tiny, color=color.rgb(100, 0, 100, 10))
plotshape(sellSignal_st_4 and plot_st_4 ? dn_st_4 : na, title="Sell 4", text="Sell 4", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.rgb(100, 0, 100, 10), textcolor=color.white)

// Exit Strategy
function(source, length, smoothing) => 
	if smoothing == "RMA/SMMA"
		ta.rma(source, length)
	else
		if smoothing == "SMA"
			ta.sma(source, length)
		else
			if smoothing == "EMA"
				ta.ema(source, length)
			else
				ta.wma(source, length)

formula(number, decimals) =>
    factor = math.pow(10, decimals)
    int(number * factor) / factor
    
use_atr_based_sl = input.bool(true, "ATR Based Stop Loss", group="Exit Strategy", tooltip="Please select only one active stop loss. Default value (if nothing or multiple stop losses are selected) is the 'ATR Based Stop Loss'.")
nnatr_length = input.int(100, title = "ATR Length", group="Exit Strategy")
smoothing = input.string("RMA/SMMA", title="ATR Smoothing", options=["RMA/SMMA", "SMA", "EMA", "WMA"], group="Exit Strategy")
use_low_high_based_sl = input.bool(false, "Candle Low/High Based Stop Loss", group="Exit Strategy", tooltip="Use recent lowest or highest point (depending on long/short position) to calculate stop loss value.\n\nSet 'Base Risk Multiplier' to 1 if you would like to use the calculated value as is. Setting it to a different value will count as an additional multiplier.\n\nPlease select only one active stop loss. Default value (if nothing or multiple stop losses are selected) is the 'ATR Based Stop Loss'.")
candle_lookback_sl = input.int(50, title="Candle Lookback", group="Exit Strategy")
use_percentage_based_sl = input.bool(false, "Percentage Based Stop Loss", group="Exit Strategy", tooltip="Set the stop loss to current price - % of current price (long) or price + % of current price (short).\n\nSet 'Base Risk Multiplier' to 1 if you would like to use the calculated value as is. Setting it to a different value will count as an additional multiplier.\n\nPlease select only one active stop loss. Default value (if nothing or multiple stop losses are selected) is the 'ATR Based Stop Loss'.")
percentage_sl = input.float(0.3, title="Percentage", group="Exit Strategy")
use_pip_based_sl = input.bool(false, "Pip Based Stop Loss", group="Exit Strategy", tooltip="Set the stop loss to current price - x pips (long) or price + x pips (short).\n\nSet 'Base Risk Multiplier' to 1 if you would like to use the calculated value as is. Setting it to a different value will count as an additional multiplier.\n\nPlease select only one active stop loss. Default value (if nothing or multiple stop losses are selected) is the 'ATR Based Stop Loss'.")
pip_sl = input.int(10, title = "Pip", group="Exit Strategy")
nnatr_loss = input.float(4.5, title="Base Risk Multiplier", minval = 0.1, step = 0.1, group="Exit Strategy")
rr_ratio = input.float(1.5, title="Risk to Reward Ratio", minval = 0.1, step = 0.1, group="Exit Strategy")

nnatr_profit = nnatr_loss * rr_ratio
    
nnatr = formula(function(ta.tr(true), nnatr_length, smoothing), 5)

lowest_point_sl = ta.lowest(candle_lookback_sl)
highest_point_sl = ta.highest(candle_lookback_sl)
percentage_val = percentage_sl * 0.01
percentage_long_sl = close - (close * percentage_val * nnatr_loss)
percentage_short_sl = close + (close * percentage_val * nnatr_loss)
pip_long_sl = close - pip_sl * syminfo.mintick
pip_short_sl = close + pip_sl * syminfo.mintick

b_atr_buy  = use_atr_based_sl ? close + nnatr * nnatr_profit : use_low_high_based_sl ? close + (close - lowest_point_sl) * nnatr_profit : use_percentage_based_sl ? close + (close - percentage_long_sl) / nnatr_loss * nnatr_profit : use_pip_based_sl ? close + (close - pip_long_sl) * nnatr_profit : close + nnatr * nnatr_profit
b_atr_sell = use_atr_based_sl ? close - nnatr * nnatr_loss : use_low_high_based_sl ? lowest_point_sl * nnatr_loss : use_percentage_based_sl ? percentage_long_sl : use_pip_based_sl ? pip_long_sl : close - nnatr * nnatr_loss

s_atr_buy  = use_atr_based_sl ? close - nnatr * nnatr_profit : use_low_high_based_sl ? close - (highest_point_sl - close) * nnatr_profit : use_percentage_based_sl ? close - (percentage_short_sl - close) / nnatr_loss * nnatr_profit : use_pip_based_sl ? close - (pip_short_sl - close) * nnatr_profit : close - nnatr * nnatr_profit
s_atr_sell = use_atr_based_sl ? close + nnatr * nnatr_loss : use_low_high_based_sl ? highest_point_sl * nnatr_loss : use_percentage_based_sl ? percentage_short_sl : use_pip_based_sl ? pip_short_sl : close + nnatr * nnatr_loss

// FORCE EXITING
use_force_exit_exact_time_1 = input.bool(false, title="1 - Force exit on custom session close", group="Force Exiting", inline="force_exit_exact_time_1")
force_exit_exact_time_1 = input("0930-1630:1234567", title="", group="Force Exiting", inline="force_exit_exact_time_1", tooltip="If enabled, trades will close automatically after the set session is closed (on next candle's open). CAUTION: do not set the start and end times of the session to the same value!")
custom_session_1 = time("30S", force_exit_exact_time_1)

use_force_exit_exact_time_2 = input.bool(false, title="2 - Force exit on custom session close", group="Force Exiting", inline="force_exit_exact_time_2")
force_exit_exact_time_2 = input("0930-1630:1234567", title="", group="Force Exiting", inline="force_exit_exact_time_2", tooltip="If enabled, trades will close automatically after the set session is closed (on next candle's open). CAUTION: do not set the start and end times of the session to the same value!")
custom_session_2 = time("30S", force_exit_exact_time_2)

use_force_exit_exact_time_3 = input.bool(false, title="3 - Force exit on custom session close", group="Force Exiting", inline="force_exit_exact_time_3")
force_exit_exact_time_3 = input("0930-1630:1234567", title="", group="Force Exiting", inline="force_exit_exact_time_3", tooltip="If enabled, trades will close automatically after the set session is closed (on next candle's open). CAUTION: do not set the start and end times of the session to the same value!")
custom_session_3 = time("30S", force_exit_exact_time_3)

use_force_exit_exact_time_4 = input.bool(false, title="4 - Force exit on custom session close", group="Force Exiting", inline="force_exit_exact_time_4")
force_exit_exact_time_4 = input("0930-1630:1234567", title="", group="Force Exiting", inline="force_exit_exact_time_4", tooltip="If enabled, trades will close automatically after the set session is closed (on next candle's open). CAUTION: do not set the start and end times of the session to the same value!")
custom_session_4 = time("30S", force_exit_exact_time_4)

// BASE SETUPS
allow_long = input.bool(true, title="Allow Long Entries", group="Base Setups")
allow_short = input.bool(true, title="Allow Short Entries", group="Base Setups")
order_size_value = input.float(100000, title='Order Size', minval=0, inline="ordersize", group="Base Setups")
order_size_type = input.string("Cash", title="", inline="ordersize", options=["Cash", "Contract(s)", "Capital Percentage"], group="Base Setups", tooltip="Adjust how the position size is calculated:\n\nCash: only the set cash ammount will be used for each trade\n\nContract(s): the adjusted number of contracts will be used for each trade\n\nCapital Percentage: a % of the current available capital will be used for each trade")

// ATR Filter
switch_ma(maType, maSrc, maLen) =>
    float maOut = switch maType
    	"SMA" => ta.sma(maSrc, maLen)
    	"EMA" => ta.ema(maSrc, maLen)
    	"WMA" => ta.wma(maSrc, maLen)
    	"VWMA" => ta.vwma(maSrc, maLen)
    	"RMA/SMMA" => ta.rma(maSrc, maLen)
    	"SWMA" => ta.swma(maSrc)
    	"HMA" => ta.hma(maSrc, maLen)

use_atr_limiter = input.bool(true, title="Use ATR Limiter", group="ATR Limiter", tooltip="Only enter into any position (long/short) if ATR value is higher than the Low Boundary and lower than the High Boundary.")
atrlim_len = input(50, title="ATR Limiter Length", group="ATR Limiter")
atrlim_smoothing = input.string("RMA/SMMA", title="ATR Limiter Smoothing", options=["RMA/SMMA", "SMA", "EMA", "WMA"], group="ATR Limiter")
atrlim_boundary_high = input.float(1000, title="High Boundary", group="ATR Limiter")
atrlim_boundary_low = input.float(0.0003, title="Low Boundary", group="ATR Limiter")

atrlim_val = formula(function(ta.tr(true), atrlim_len, atrlim_smoothing), 5)
plot(atrlim_val, title='atrlim_val', color=color.yellow)

atrlim_calc_by_ma = input.string("ATR value under MA", options=["ATR value over MA", "ATR value under MA", "Unspecified"], title="MA based calculation", group="ATR Limiter", tooltip="If not Unspecified, an MA is calculated with the ATR value as source. Only enter into position (long/short) if ATR value is higher/lower than the MA.")
atrlim_ema_type = input.string("RMA/SMMA", options=["SMA", "EMA", "WMA", "VWMA", "RMA/SMMA", "SWMA", "HMA"], title="MA Type", group="ATR Limiter")
atrlim_ema_len = input.int(400, title="MA Length", minval=1, group="ATR Limiter")
atrlim_ema = switch_ma(atrlim_ema_type, atrlim_val, atrlim_ema_len)

check_atr_lim_long() =>
    use_atr_limiter ? atrlim_calc_by_ma == "ATR value over MA" ? atrlim_val > atrlim_ema and atrlim_val < atrlim_boundary_high and atrlim_val > atrlim_boundary_low : atrlim_calc_by_ma == "ATR value under MA" ? atrlim_val < atrlim_ema and atrlim_val < atrlim_boundary_high and atrlim_val > atrlim_boundary_low : atrlim_val < atrlim_boundary_high and atrlim_val > atrlim_boundary_low : true
    
check_atr_lim_short() =>
    use_atr_limiter ? atrlim_calc_by_ma == "ATR value over MA" ? atrlim_val > atrlim_ema and atrlim_val > atrlim_boundary_low and atrlim_val < atrlim_boundary_high : atrlim_calc_by_ma == "ATR value under MA" ? atrlim_val < atrlim_ema and atrlim_val > atrlim_boundary_low and atrlim_val < atrlim_boundary_high : atrlim_val > atrlim_boundary_low and atrlim_val < atrlim_boundary_high : true   

// Entry Logic
green_1 = trend_st_1 == 1
green_2 = trend_st_2 == 1 
green_3 = trend_st_3 == 1 
green_4 = trend_st_4 == 1 

red_1 = trend_st_1 != 1 
red_2 = trend_st_2 != 1
red_3 = trend_st_3 != 1
red_4 = trend_st_4 != 1

st_uptrend_bool_arr = array.from(green_1, green_2, green_3, green_4)
st_downtrend_bool_arr = array.from(red_1, red_2, red_3, red_4)

st_buy_signal_arr = array.from(buySignal_st_1, buySignal_st_2, buySignal_st_3, buySignal_st_4)
last_st_buy_signal_arr = array.from(buySignal_st_1[1], buySignal_st_2[1], buySignal_st_3[1], buySignal_st_4[1])

st_sell_signal_arr = array.from(sellSignal_st_1, sellSignal_st_2, sellSignal_st_3, sellSignal_st_4)
last_st_sell_signal_arr = array.from(sellSignal_st_1[1], sellSignal_st_2[1], sellSignal_st_3[1], sellSignal_st_4[1])

long_trend_arr = array.from(long_trend_st_1, long_trend_st_2, long_trend_st_3, long_trend_st_4)
short_trend_arr = array.from(short_trend_st_1, short_trend_st_2, short_trend_st_3, short_trend_st_4)

long_trends_ok = true
short_trends_ok = true
for [index, value] in st_uptrend_bool_arr
    if value 
        if array.get(long_trend_arr, index) == "downtrend"
            long_trends_ok := false
        if array.get(short_trend_arr, index) == "downtrend"
            short_trends_ok := false

for [index, value] in st_downtrend_bool_arr
    if value 
        if array.get(long_trend_arr, index) == "uptrend"
            long_trends_ok := false
        if array.get(short_trend_arr, index) == "uptrend"
            short_trends_ok := false

can_be_entry_signal_arr = array.from(can_be_entry_signal_st_1, can_be_entry_signal_st_2, can_be_entry_signal_st_3, can_be_entry_signal_st_4)

long_trigger = false
short_trigger = false
for [index, value] in st_buy_signal_arr
    if array.get(st_buy_signal_arr, index) and not array.get(last_st_buy_signal_arr, index) and array.get(can_be_entry_signal_arr, index)
        long_trigger := true
    if array.get(st_sell_signal_arr, index) and not array.get(last_st_sell_signal_arr, index) and array.get(can_be_entry_signal_arr, index)
        short_trigger := true

check_entry_long() => long_trigger and long_trends_ok
check_entry_short() => short_trigger and short_trends_ok

// WADDAH ATTAR FILTER
wafilt_calc_macd(source, fast_length, fast_type, slow_length, slow_type) =>
    fast_ma = switch_ma(fast_type, source, fast_length)

    slow_ma = switch_ma(slow_type, source, slow_length)

	fast_ma - slow_ma

wafilt_calc_BBUpper(ma_type, source, length, mult) =>
    basis = switch_ma(ma_type, source, length)

	dev = mult * ta.stdev(source, length)
	basis + dev

wafilt_calc_BBLower(ma_type, source, length, mult) => 
    basis = switch_ma(ma_type, source, length)

	dev = mult * ta.stdev(source, length)
	basis - dev
	
wa_entry_logic = input.string("Not specified", options=["Explosion over Deadzone", "Explosion under Deadzone", "Not specified"], title="Explosion/Deadzone relation", group="Waddah Attar Filter", tooltip="Explosion over Deadzone: trades will only happen if the explosion line is over the deadzone line;\n\nExplosion under Deadzone: trades will only happen if the explosion line is under the deadzone line;\n\nNot specified: the opening of trades will not be based on the relation between the explosion and deadzone lines.")
wafilt_only_trade_when_trend = input.string("Not specified", options=["Strong Trends", "Soft Trends", "All Trends", "Not specified"], title="Limit trades based on trends", group="Waddah Attar Filter", tooltip="Strong Trends: only enter long if the WA bar is colored green (there is an uptrend and the current bar is higher then the previous); only enter short if the WA bar is colored red (there is a downtrend and the current bar is higher then the previous);\n\nSoft Trends: only enter long if the WA bar is colored lime (there is an uptrend and the current bar is lower then the previous); only enter short if the WA bar is colored orange (there is a downtrend and the current bar is lower then the previous);\n\nAll Trends: only enter long if the WA bar is colored green or lime (there is an uptrend); only enter short if the WA bar is colored red or orange (there is a downtrend);\n\nNot specified: the color of the WA bar (trend) is not relevant when considering entries.")
wa_over_e_dz = input.string("Not specified", options=["Over Explosion and Deadzone", "Not specified"], title="WA bar value", group="Waddah Attar Filter", tooltip="Over Explosion and Deadzone: only enter trades when the WA bar value is over the Explosion and Deadzone lines;\n\nNot specified: the relation between the explosion/deadzone lines to the value of the WA bar will not be used to filter opening trades.")
wafilt_sensitivity = input(150, title="Sensitivity", group="Waddah Attar Filter")
wafilt_fast_type = input.string("SMA", options=["SMA", "EMA", "WMA", "VWMA", "RMA/SMMA", "SWMA", "HMA"], title="Fast MA Type", inline="wa_1", group="Waddah Attar Filter")
wafilt_fast_length=input(10, title="Fast MA Length", inline="wa_1", group="Waddah Attar Filter")
wafilt_slow_type = input.string("SMA", options=["SMA", "EMA", "WMA", "VWMA", "RMA/SMMA", "SWMA", "HMA"], title="Slow MA Type", inline="wa_2", group="Waddah Attar Filter")
wafilt_slow_length=input(20, title="Slow MA Length", inline="wa_2", group="Waddah Attar Filter")
wafilt_channel_type = input.string("EMA", options=["SMA", "EMA", "WMA", "VWMA", "RMA/SMMA", "SWMA", "HMA"], title="Channel MA Type", group="Waddah Attar Filter")
wafilt_channel_length=input(20, title="BB Channel Length", inline="wa_3", group="Waddah Attar Filter")
wafilt_mult=input(2.0, title="BB Stdev Multiplier", inline="wa_3", group="Waddah Attar Filter")

wafilt_dead_zone = nz(ta.rma(ta.tr(true),100)) * 3.7

wafilt_t1 = (wafilt_calc_macd(close, wafilt_fast_length, wafilt_fast_type, wafilt_slow_length, wafilt_slow_type) - wafilt_calc_macd(close[1], wafilt_fast_length, wafilt_fast_type, wafilt_slow_length, wafilt_slow_type)) * wafilt_sensitivity

wafilt_e1 = (wafilt_calc_BBUpper(wafilt_channel_type, close, wafilt_channel_length, wafilt_mult) - wafilt_calc_BBLower(wafilt_channel_type, close, wafilt_channel_length, wafilt_mult))

wafilt_trend_up = (wafilt_t1 >= 0) ? wafilt_t1 : 0
wafilt_trend_down = (wafilt_t1 < 0) ? (-1 * wafilt_t1) : 0
wafilt_trend_up_color = wafilt_trend_up < wafilt_trend_up[1] ? color.lime : color.green
wafilt_trend_down_color = wafilt_trend_down < wafilt_trend_down[1] ? color.orange : color.red

wafilt_trend_val = wafilt_trend_up != 0 ? wafilt_trend_up : wafilt_trend_down
wafilt_trend_color = wafilt_trend_up != 0 ? wafilt_trend_up_color : wafilt_trend_down_color

check_waddah_attar_long() =>
    logic = wa_entry_logic == "Explosion over Deadzone" ? wafilt_e1 > wafilt_dead_zone : wa_entry_logic == "Explosion under Deadzone" ? wafilt_e1 < wafilt_dead_zone : true
    trend = wafilt_only_trade_when_trend == "All Trends" ? wafilt_trend_color == color.lime or wafilt_trend_color == color.green : wafilt_only_trade_when_trend == "Strong Trends" ? wafilt_trend_color == color.green : wafilt_only_trade_when_trend == "Soft Trends" ? wafilt_trend_color == color.lime : true
    wa_bar_value = wa_over_e_dz == "Over Explosion and Deadzone" ? wafilt_trend_val > wafilt_e1 and wafilt_trend_val > wafilt_dead_zone : true
    logic and trend and wa_bar_value

check_waddah_attar_short() =>
    logic = wa_entry_logic == "Explosion over Deadzone" ? wafilt_e1 > wafilt_dead_zone : wa_entry_logic == "Explosion under Deadzone" ? wafilt_e1 < wafilt_dead_zone : true
    trend = wafilt_only_trade_when_trend == "All Trends" ? wafilt_trend_color == color.red or wafilt_trend_color == color.orange : wafilt_only_trade_when_trend == "Strong Trends" ? wafilt_trend_color == color.red : wafilt_only_trade_when_trend == "Soft Trends" ? wafilt_trend_color == color.orange : true
    wa_bar_value = wa_over_e_dz == "Over Explosion and Deadzone" ? wafilt_trend_val > wafilt_e1 and wafilt_trend_val > wafilt_dead_zone : true
    logic and trend and wa_bar_value

// TREND FILTER
use_long_trend_filter_1 = input.bool(false, title="Use long trend filter 1", group="Trend Filter", tooltip="Only enter long if price is above Long MA.")
show_long_trend_filter_1 = input.bool(false, title="Show long trend filter 1", group="Trend Filter", tooltip="Plot the selected MA on the chart.")
long_ma_type_1 = input.string("EMA", options=["SMA", "EMA", "WMA", "VWMA", "RMA/SMMA", "SWMA", "HMA"], title="TF1 - MA Type", inline="lTF1", group="Trend Filter")
long_ma_len_1 = input.int(120, title="TF1 - MA Length", inline="lTF1", group="Trend Filter")
long_ma_source_1 = input(close, title="TF1 - MA Source", inline="lTF1", group="Trend Filter")

float long_ma_tf_1 = switch_ma(long_ma_type_1, long_ma_source_1, long_ma_len_1)

use_short_trend_filter_1 = input.bool(false, title="Use short trend filter 1", group="Trend Filter", tooltip="Only enter short if price is under Short MA.")
show_short_trend_filter_1 = input.bool(false, title="Show short trend filter 1", group="Trend Filter", tooltip="Plot the selected MA on the chart.")
short_ma_type_1 = input.string("EMA", options=["SMA", "EMA", "WMA", "VWMA", "RMA/SMMA", "SWMA", "HMA"], title="TF2 - MA Type", inline="sTF1", group="Trend Filter")
short_ma_len_1 = input.int(120, title="TF2 - MA Length", inline="sTF1", group="Trend Filter")
short_ma_source_1 = input(close, title="TF2 - MA Source", inline="sTF1", group="Trend Filter")

float short_ma_tf_1 = switch_ma(short_ma_type_1, short_ma_source_1, short_ma_len_1)

plot(long_ma_tf_1, color=color.blue, display=show_long_trend_filter_1 ? display.all : display.none, title="Long Trend Filter 1")
plot(short_ma_tf_1, color=color.teal, display=show_short_trend_filter_1 ? display.all : display.none, title="Short Trend Filter 1")

check_trend_filter_long() =>
    long_filter_1 = use_long_trend_filter_1 ? close > long_ma_tf_1 : true
    long_filter_1

check_trend_filter_short() =>    
    short_filter_1 = use_short_trend_filter_1 ? close < short_ma_tf_1 : true
    short_filter_1

// VOLUME FILTER
use_volume_filter = input.bool(true, title="Only enter trades where volume is higher then the volume-based MA", group="Volume Filter", tooltip="A set type of MA will be calculated with the volume as source, and set length")
vol_ma_type = input.string("RMA/SMMA", options=["SMA", "EMA", "WMA", "VWMA", "RMA/SMMA", "SWMA", "HMA"], title="Volume-based MA Type", group="Volume Filter")
vol_ma_len = input.int(200, title="Volume-based MA Length", group="Volume Filter")
vol_ma = switch_ma(vol_ma_type, volume, vol_ma_len)

check_volume_filter() =>
    use_volume_filter ? volume > vol_ma : true

// DATE RANGE SETTINGS
limit_dates = input.bool(false, title="Limit Between Dates", group="Date Range Limiter")
start_date = input(timestamp("Jan 01 2023 00:00:00"), title="Start Date", group="Date Range Limiter")
end_date = input(timestamp("Jun 24 2023 00:00:00"), title="End Date", group="Date Range Limiter")

// SESSION LIMITER
show_session_plots = input.bool(false, title="Show session plots", group="Session Limiter", tooltip="Show crypto market sessions on chart: Sidney (red), Tokyo (orange), London (yellow), New York (green)")
use_session_limit = input.bool(false, title="Use session limiter", group="Session Limiter", tooltip="If enabled, trades will only happen in the ticked sessions below.")

limit_session1 = input.bool(false, title="Sidney session", group="Session Limiter", tooltip="Session between: 15:00 - 00:00 (EST)")
limit_session2 = input.bool(false, title="Tokyo session", group="Session Limiter", tooltip="Session between: 19:00 - 04:00 (EST)")
limit_session3 = input.bool(false, title="London session", group="Session Limiter", tooltip="Session between: 03:00 - 11:00 (EST)")
limit_session4 = input.bool(false, title="New York session", group="Session Limiter", tooltip="Session between: 08:00 - 17:00 (EST)")

session1 = time(timeframe.period, "1500-0000:1234567", "America/New_York") //Sydney Session
session2 = time(timeframe.period, "1900-0400:1234567", "America/New_York") //Tokyo Session
session3 = time(timeframe.period, "0300-1100:1234567", "America/New_York") //London Session
session4 = time(timeframe.period, "0800-1700:1234567", "America/New_York") //New York Session

bgcolor(session1 and show_session_plots ? color.new(color.red, 60) : na, title="Sydney Session")
bgcolor(session2 and show_session_plots ? color.new(color.orange, 60) : na, title="Tokyo Session")
bgcolor(session3 and show_session_plots ? color.new(color.yellow, 60) : na, title="London Session")
bgcolor(session4 and show_session_plots ? color.new(color.green, 60) : na, title="New York Session")

// TRADING TIME
limit_trading_time = input.bool(true, title="Limit Trading Time", group="Trading Time Limiter", tooltip="Tick this together with the options below to enable limiting based on day and time.")
days_to_trade_on = input.string("123567", title="Valid Trading Days Global", tooltip="If the Limit Trading Time is on, trades will only happen on days that are present in this field. If any of the not global Valid Trading Days is used, this field will be neglected.\n\nValues represent days: \nSunday (1), Monday (2), ..., Friday (6), Saturday(7)\nTo trade on all days use: 123457", group="Trading Time Limiter")
limit_day1 = input.bool(false, title="", group="Trading Time Limiter", inline="day1")
days_to_trade_on1 = input.string("23456", title="(1) Valid Trading Days", inline="day1", tooltip="Values represent days: \nSunday (1), Monday (2), ..., Friday (6), Saturday(7)\n\nScript will trade on days that are present in this field. Please make sure that this field and also (1) Valid Trading Hours Between is checked.", group="Trading Time Limiter")
valid_hours1 = input.bool(false, title="", inline="inline1", group="Trading Time Limiter", tooltip="Hours between which the trades can happen. The time is always in the exchange's timezone.")
hours_to_trade_on1 = input("1800-2000", title="(1) Valid Trading Hours Between", inline="inline1", group="Trading Time Limiter")
limit_day2 = input.bool(false, title="", group="Trading Time Limiter", inline="day2")
days_to_trade_on2 = input.string("1234567", title="(2) Valid Trading Days", inline="day2", tooltip="Values represent days: \nSunday (1), Monday (2), ..., Friday (6), Saturday(7)\n\nScript will trade on days that are present in this field. Please make sure that this field and also (2) Valid Trading Hours Between is checked.", group="Trading Time Limiter")
valid_hours2 = input.bool(false, title="", inline="inline2", group="Trading Time Limiter", tooltip="Hours between which the trades can happen. The time is always in the exchange's timezone.")
hours_to_trade_on2 = input("0930-1600", title="(2) Valid Trading Hours Between", inline="inline2", group="Trading Time Limiter")
limit_day3 = input.bool(false, title="", group="Trading Time Limiter", inline="day3")
days_to_trade_on3 = input.string("1234567", title="(3) Valid Trading Days", inline="day3", tooltip="Values represent days: \nSunday (1), Monday (2), ..., Friday (6), Saturday(7)\n\nScript will trade on days that are present in this field. Please make sure that this field and also (3) Valid Trading Hours Between is checked.", group="Trading Time Limiter")
valid_hours3 = input.bool(false, title="", inline="inline3", group="Trading Time Limiter", tooltip="Hours between which the trades can happen. The time is always in the exchange's timezone.")
hours_to_trade_on3 = input("0930-1600", title="(3) Valid Trading Hours Between", inline="inline3", group="Trading Time Limiter")

// PineConnector Automation
use_pc_automation = input.bool(false, title="Use PineConnector Automation | PLEASE READ TOOLTIP -->", group="PineConnector Automation", tooltip="NOTE! In order for the connection to MetaTrader to work, you will need do perform prerequisite steps, you can follow our full guide at our website, or refer to the official PineConnector Documentation.\n\nTo set up PineConnector Automation on the TradingView side, you will need to do the following:\n\n1. Fill out the License ID field with your PineConnector License ID;\n\n2. Fill out the Risk (trading volume) with the desired volume to be traded in each trade (the meaning of this value depends on the EA settings in Metatrader. Follow the detailed guide for additional information);\n\n3. After filling out the fields, you need to enable the 'Use PineConnector Automation' option (check the box in the strategy settings);\n\n4. Check if the chart has updated and you can see the appropriate order comments on your chart;\n\n5. Create an alert with the strategy selected as Condition, and the Message as {{strategy.order.comment}} (should be there by default);\n\n6. Enable the Webhook URL in the Notifications section, set it as the official PineConnector webhook address and enjoy your connection with MetaTrader.")
pc_licence_id = input.int(60123456789, title="License ID", group="PineConnector Automation")
pc_risk = input.float(1, title="Risk (trading volume)", group="PineConnector Automation")

pc_long_entry_alert = str.tostring(pc_licence_id) + ',buy,' + syminfo.ticker + ',risk='+ str.tostring(pc_risk) + ',comment="ATR GOD Strategy by TradeSmart"'
pc_short_entry_alert = str.tostring(pc_licence_id) + ',sell,' + syminfo.ticker + ',risk='+ str.tostring(pc_risk) + ',comment="ATR GOD Strategy by TradeSmart"'
pc_long_exit_alert = str.tostring(pc_licence_id) + ',closelong,' + syminfo.ticker + ',risk='+ str.tostring(pc_risk) + ',comment="ATR GOD Strategy by TradeSmart"'
pc_short_exit_alert = str.tostring(pc_licence_id) + ',closeshort,' + syminfo.ticker + ',risk='+ str.tostring(pc_risk) + ',comment="ATR GOD Strategy by TradeSmart"'

// LIMITERS
in_date() => true
    
check_valid_session() =>
    s1 = limit_session1 ? session1 : na
    s2 = limit_session2 ? session2 : na
    s3 = limit_session3 ? session3 : na
    s4 = limit_session4 ? session4 : na
    use_session_limit ? na(s1) and na(s2) and na(s3) and na(s4) ? false : true : true   

check_valid_time() =>
    t = (limit_day1 == false and limit_day2 == false and limit_day3 == false) ? time(timeframe.period, '0000-0000:' + days_to_trade_on) : na
    t7 = valid_hours1 and limit_day1 == false ? time(timeframe.period, hours_to_trade_on1 + ':' + days_to_trade_on) : na
    t8 = valid_hours2 and limit_day2 == false ? time(timeframe.period, hours_to_trade_on2 + ':' + days_to_trade_on) : na
    t9 = valid_hours3 and limit_day3 == false ? time(timeframe.period, hours_to_trade_on3 + ':' + days_to_trade_on) : na
    t1 = valid_hours1 and limit_day1 ? time(timeframe.period, hours_to_trade_on1 + ':' + days_to_trade_on1) : na
    t2 = valid_hours2 and limit_day2 ? time(timeframe.period, hours_to_trade_on2 + ':' + days_to_trade_on2) : na
    t3 = valid_hours3 and limit_day3 ? time(timeframe.period, hours_to_trade_on3 + ':' + days_to_trade_on3) : na
    na(t) and na(t1) and na(t2) and na(t3) and na(t7) and na(t8) and na(t9) ? false : true
 
check_filters_long() => check_volume_filter() and check_waddah_attar_long() and check_valid_session() and check_atr_lim_long() and check_trend_filter_long()
check_filters_short() => check_volume_filter() and check_waddah_attar_short() and check_valid_session() and check_atr_lim_short() and check_trend_filter_short()

checkLong() => check_entry_long() and check_filters_long() 
checkShort() => check_entry_short() and check_filters_short() 

should_long_limit_dates = limit_dates ? (in_date() and checkLong()) : checkLong()
should_short_limit_dates = limit_dates ? (in_date() and checkShort()) : checkShort()

should_long_limit_day_trades = limit_trading_time ? (check_valid_time() and checkLong()): checkLong()
should_short_limit_day_trades = limit_trading_time ? (check_valid_time() and checkShort()): checkShort()

long = should_long_limit_dates and should_long_limit_day_trades and allow_long
short = should_short_limit_dates and should_short_limit_day_trades and allow_short

// CALCULATE EXIT PRICES AND STOP LOSSES
long_exit_price = float(na)
long_stop_price = float(na)
short_exit_price = float(na)
short_stop_price = float(na)

long_exit_price := (long and strategy.position_size <= 0) ? b_atr_buy : long_exit_price[1]
long_stop_price := (long and strategy.position_size <= 0) ? b_atr_sell : long_stop_price[1]
short_exit_price := (short and strategy.position_size >= 0) ? s_atr_buy : short_exit_price[1]
short_stop_price := (short and strategy.position_size >= 0) ? s_atr_sell : short_stop_price[1]

plot(strategy.position_size > 0 and plot_sl_tp ? long_exit_price : na, color=color.green, style=plot.style_linebr, linewidth=2, title="Long Exit Price")
plot(strategy.position_size > 0 and plot_sl_tp ? long_stop_price : na, color=color.red, style=plot.style_linebr, linewidth=2, title="Long Stop Price")
plot(strategy.position_size < 0 and plot_sl_tp ? short_exit_price : na, color=color.purple, style=plot.style_linebr, linewidth=2, title="Short Exit Price")
plot(strategy.position_size < 0 and plot_sl_tp ? short_stop_price : na, color=color.aqua, style=plot.style_linebr, linewidth=2, title="Short Stop Price")

// QUANTITY CALCULATION
ourQty = switch order_size_type
    "Capital Percentage" => (strategy.initial_capital + strategy.netprofit) * 0.01 * order_size_value / close 
    "Cash" => order_size_value / close 
    "Contract(s)" => order_size_value 
    => 0
// TEST
// ENTER/EXIT ORDERS
checkForceExit(usage_trigger, exit_trigger, order_comment) =>
    if strategy.position_size != 0 and usage_trigger
        if exit_trigger
            strategy.cancel_all()
            if use_pc_automation
                strategy.close_all(comment=strategy.position_size > 0 ? pc_long_exit_alert : pc_short_exit_alert)
            else
                strategy.close_all(comment=order_comment, immediately=true)

plotshape(plot_signals and strategy.position_size == 0 ? long : na, style=shape.labelup, location=location.belowbar, color=color.new(#046ff9, 0), size=size.large, text='Entry Signal \n Long/Buy', textcolor=color.new(color.white, 10))
plotshape(plot_signals and strategy.position_size == 0 ? short : na, style=shape.labeldown, location=location.abovebar, color=color.new(#046ff9, 0), size=size.large, text='Entry Signal \n Short/Sell', textcolor=color.new(color.white, 10))

valid_values = true
if (na(nnatr) and use_atr_based_sl) or (na(lowest_point_sl) and use_low_high_based_sl) or (na(highest_point_sl) and use_low_high_based_sl)
    valid_values := false

if valid_values
    if allow_long
        if long and strategy.position_size == 0
            strategy.order("Long Entry", direction=strategy.long, qty=ourQty,  comment=use_pc_automation ? pc_long_entry_alert : na)

        if strategy.position_size > 0
            strategy.cancel("Long Entry")
            strategy.order("Long Exit", direction=strategy.short, qty=strategy.position_size, limit=long_exit_price,  oca_name="asd", comment=use_pc_automation ? pc_long_exit_alert : na)
            strategy.order("Long Stop", direction=strategy.short, qty=strategy.position_size, stop=long_stop_price,  oca_name="asd", comment=use_pc_automation ? pc_long_exit_alert : na)

    if allow_short
        if short and strategy.position_size == 0
            strategy.order("Short Entry", direction=strategy.short, qty=ourQty,  comment=use_pc_automation ? pc_short_entry_alert : na)

        if strategy.position_size < 0
            strategy.cancel("Short Entry")
            strategy.order("Short Exit", direction=strategy.long, qty=-1*strategy.position_size, limit=short_exit_price,  oca_name="asd", comment=use_pc_automation ? pc_short_exit_alert : na)
            strategy.order("Short Stop", direction=strategy.long, qty=-1*strategy.position_size, stop=short_stop_price,  oca_name="asd", comment=use_pc_automation ? pc_short_exit_alert : na)

    checkForceExit(use_force_exit_exact_time_1, custom_session_1[1] and not custom_session_1, "Custom Session Force Exit 1")
    checkForceExit(use_force_exit_exact_time_2, custom_session_2[1] and not custom_session_2, "Custom Session Force Exit 2")
    checkForceExit(use_force_exit_exact_time_3, custom_session_3[1] and not custom_session_3, "Custom Session Force Exit 3")
    checkForceExit(use_force_exit_exact_time_4, custom_session_4[1] and not custom_session_4, "Custom Session Force Exit 4")
```

> Detail

https://www.fmz.com/strategy/440796

> Last Modified

2024-02-02 11:02:02
