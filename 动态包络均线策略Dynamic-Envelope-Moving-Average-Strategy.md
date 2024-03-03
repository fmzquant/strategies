
> Name

动态包络均线策略Dynamic-Envelope-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a374cd354cbddf7607.png)
[trans]
## 概述

该策略基于移动均线和动态包络线,实现了多空双向交易。它会跟踪价格突破上下包络线来建立头寸,当价格重新跌破基准均线时平仓。该策略适用于趋势较明显的股票和数字货币。

## 策略原理

首先,该策略基于用户选择的均线类型和长度计算出基准均线。常见的均线包括SMA、EMA等。 

然后,根据用户设定的百分比参数,计算出上下包络线。例如5%代表价格波动ALLOWED_BRACKET105%时触发建立头寸。包络线数量可以自定义。

在入市规则上,如果突破下包络线,做多;如果突破上包络线,做空。规则非常简单清晰。

最后,当价格重新跌破基准均线时,平掉所有头寸。这是跟踪趋势的一个退出点。

需要注意的是,该策略实现了分仓建仓。如果有多个包络线,那么会按比例分配资金。这避免单边博弈的风险。

## 优势分析

该策略最大的优势有以下几点:

1. 实现了自动跟踪趋势的功能。使用均线判断趋势方向非常常见,所以这是一个行之有效的方法。

2. 利用包络线过滤掉部分噪音,这避免了过于敏感而引发无谓交易的问题。合理的参数设置可以大幅优化策略盈利能力。

3. 分仓建仓增加了策略韧性。即使单边突破失败,其他方向可能继续运行良好。这优化了整体风险收益比。

4. 允许自定义均线和包络线数量。这增加了策略灵活性,用户可以针对不同品种进行参数调优。

## 风险分析

该策略的主要风险在于:

1. 均线系统对黄金交叉类信号不敏感。如果没有明确趋势,该策略可能错过部分机会。

2. 包络线设置得过宽可能增大了交易次数和滑点风险。 Line设计得过窄又可能错过较大行情。找到平衡点需要充分测试。 

3. 在震荡行情中,该策略可能出现较多被套的概率。所以品种的选择以趋势明显的品种为佳。

4. 分仓建仓会使每单盈利受限。如果只想博取单边风险,还需要额外优化。

## 优化方向  

该策略主要可以从以下几个方向进行优化:

1. 更换其他指标来决定建仓和平仓。例如KDJ指标等。或者结合多个指标设置过滤条件。

2. 增加止盈止损逻辑。这可以锁定部分利润,并主动规避部分风险。

3. 优化参数寻找最佳均线和包络线组合。这需要充分回测和优化查找最佳参数对。

4. 结合深度学习等技术实现智能参数优化。随着时间不断学习和更新参数设置。

5. 考虑品种和市场差异性,设定多组参数适应不同交易环境。这将大幅提高策略稳定性。

## 总结

该动态包络均线策略总体来说非常适合趋势交易。它简单高效,易于理解和优化。作为一个基础策略,它的可塑性和扩展性都非常强。通过和其他更复杂的系统融合,可以进一步优化整体收益和风险调整指标。所以可以作为量化交易的一个非常好的基石。

||

## Overview

This strategy is based on moving average and dynamic envelope lines to implement both long and short trading. It tracks price breakouts beyond envelope lines to establish positions and closes positions when price breaks back below the baseline moving average. This strategy works well for stocks and cryptocurrencies with obvious trends.  

## Strategy Logic

Firstly, this strategy calculates the baseline moving average based on user-defined moving average type and length. Common moving averages include SMA, EMA etc.

Then, it calculates the upper and lower envelope lines based on user-defined percentage parameters. For example, 5% means establishing positions when price fluctuates 5% beyond baseline moving average. The number of envelope lines can be customized.

Regarding entry rules, go long when price breaks below lower envelope line, go short when price breaks above upper envelope line. The rules are simple and straightforward.  

Lastly, close all positions when price breaks back below the baseline moving average. This is an exit point to trail the trend.  

Notably, this strategy implements partial position establishment. If multiple envelope lines exist, capital will be allocated proportionately. This prevents the risk of one-sided bets.

## Advantage Analysis 

The biggest pros of this strategy:

1. Automatical trend following. Using moving average to determine trend direction is a well-established method.

2. Filtering out some noise with envelope lines, preventing excessive sensitive trading. Reasonable parameter setting can greatly improve strategy profitability. 

3. Partial position establishment enhances strategy resilience. Even if one side fails, the other side can keep running well. This optimizes overall risk-reward ratio.

4. Customizable moving average and envelope line number. This increases flexibility for parameter tuning based on different products.

## Risk Analysis

The main risks of this strategy:

1. Moving average system is not sensitive to golden cross signals. It may miss some opportunities if no obvious trend exists.

2. Too wide envelope line setting may increase trading frequency and slippage risk. Too narrow setting may miss larger moves. Finding the balance requires thorough testing. 

3. This strategy likely encounters more whipsaws in ranging markets. So trending products are preferable. 

4. Partial position establishment limits per trade profit. If seeking one-sided bets, further optimization is needed.

## Optimization Directions

The main directions to optimize this strategy:

1. Replace with other entry/exit indicators like KDJ etc. Or add filters with multiple indicators.

2. Add stop profit/loss logic. This locks in some profit and actively mitigates some risks.

3. Optimize parameters to find the best moving average and envelope combinations. Requires extensive backtesting and optimization.

4. Incorporate deep learning etc. for smart parameter tuning. Constantly learn and update over time.

5. Consider product and market differences, set multiple parameter sets suiting different trading environments. This greatly improves strategy robustness.

## Conclusion

In conclusion, this dynamic envelope moving average strategy works very well for trend trading. It is simple, efficient, easy to understand and optimize. As a basic strategy, it has great plasticity and extensibility. When combined with more complex systems, it can be further enhanced for higher returns and better risk-adjusted metrics. So it serves as an excellent foundation for quantitative trading strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Long Positions|
|v_input_bool_2|true|Short Positions|
|v_input_1_ohlc4|0|(?Base MA)Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_int_1|5|Base Mooving Average Window|
|v_input_string_1|0|MA Type: 1. SMA|2. PCMA|3. EMA|4. WMA|5. DEMA|6. ZLEMA|7. HMA|
|v_input_float_1|0.05|(?Envelopes)Envelope 1|
|v_input_float_2|0.1|Envelope 2|
|v_input_float_3|0.15|Envelope 3|
|v_input_float_4|false|Envelope 4|
|v_input_float_5|false|Envelope 5|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Envelope Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=1000, pyramiding = 5, commission_type=strategy.commission.percent, commission_value=0.0)

// CopyRight Crypto Robot

src = input(ohlc4, title="Source", group = "Base MA")
ma_base_window = input.int(5, "Base Mooving Average Window", step = 1, group = "Base MA")
ma_type = input.string(defval='1. SMA', options=['1. SMA', '2. PCMA', '3. EMA', '4. WMA', '5. DEMA', '6. ZLEMA', '7. HMA'], title='MA Type', group = "Base MA")


envelope_1_pct = input.float(0.05, "Envelope 1", step = 0.01, group = "Envelopes")
envelope_2_pct = input.float(0.10, "Envelope 2", step = 0.01, group = "Envelopes")
envelope_3_pct = input.float(0.15, "Envelope 3", step = 0.01, group = "Envelopes")
envelope_4_pct = input.float(0.0, "Envelope 4", step = 0.01, group = "Envelopes")
envelope_5_pct = input.float(0.0, "Envelope 5", step = 0.01, group = "Envelopes")

use_longs = input.bool(true, 'Long Positions') 
use_short = input.bool(true, 'Short Positions')

total_envelope = 0
if envelope_1_pct > 0
    total_envelope := total_envelope + 1
if envelope_2_pct > 0
    total_envelope := total_envelope + 1
if envelope_3_pct > 0
    total_envelope := total_envelope + 1
if envelope_4_pct > 0
    total_envelope := total_envelope + 1
if envelope_5_pct > 0
    total_envelope := total_envelope + 1

// ---------------------------------------------
// -------------- INDICATORS -------------------
ma_function(MA_type, MA_length) =>
    zlema_lag = (MA_length - 1) / 2
    hma_src = MA_type == '7. HMA' ? 2 * ta.wma(src, math.floor(MA_length / 2)) - ta.wma(src, MA_length) : na
    MA_type == '1. SMA' ? ta.sma(src, MA_length) : MA_type == '2. PCMA' ? (ta.highest(high, MA_length) + ta.lowest(low, MA_length)) / 2 : MA_type == '3. EMA' ? ta.ema(src, MA_length) : MA_type == '4. WMA' ? ta.wma(src, MA_length) : MA_type == '5. DEMA' ? 2 * ta.ema(src, MA_length) - ta.ema(ta.ema(src, MA_length), MA_length) : MA_type == '6. ZLEMA' ? ta.ema(src + src - src[zlema_lag], MA_length) : MA_type == '7. HMA' ? ta.wma(hma_src, math.floor(math.sqrt(MA_length))) : na

    
ma_base = ma_function(ma_type, ma_base_window)

ma_high_1 = envelope_1_pct > 0 ? ma_base * (1 + envelope_1_pct) : na
ma_high_2 = envelope_2_pct > 0 ? ma_base * (1 + envelope_2_pct) : na
ma_high_3 = envelope_3_pct > 0 ? ma_base * (1 + envelope_3_pct) : na
ma_high_4 = envelope_4_pct > 0 ? ma_base * (1 + envelope_4_pct) : na
ma_high_5 = envelope_5_pct > 0 ? ma_base * (1 + envelope_5_pct) : na

ma_low_1 = envelope_1_pct > 0 ? ma_base * (1 - envelope_1_pct) : na
ma_low_2 = envelope_2_pct > 0 ? ma_base * (1 - envelope_2_pct) : na
ma_low_3 = envelope_3_pct > 0 ? ma_base * (1 - envelope_3_pct) : na
ma_low_4 = envelope_4_pct > 0 ? ma_base * (1 - envelope_4_pct) : na
ma_low_5 = envelope_5_pct > 0 ? ma_base * (1 - envelope_5_pct) : na

// ---------------------------------------------
// --------------- STRATEGY --------------------
if use_longs
    if envelope_1_pct > 0 and strategy.opentrades < 1
        strategy.entry('long 1', strategy.long, limit=ma_low_1, qty=(strategy.equity / ma_low_1) * (1 / total_envelope))
    if envelope_2_pct > 0 and strategy.opentrades < 2
        strategy.entry('long 2', strategy.long, limit=ma_low_2, qty=(strategy.equity / ma_low_2) * (1 / total_envelope))
    if envelope_3_pct > 0 and strategy.opentrades < 3
        strategy.entry('long 3', strategy.long, limit=ma_low_3, qty=(strategy.equity / ma_low_3) * (1 / total_envelope))
    if envelope_4_pct > 0 and strategy.opentrades < 4
        strategy.entry('long 4', strategy.long, limit=ma_low_4, qty=(strategy.equity / ma_low_4) * (1 / total_envelope))
    if envelope_5_pct > 0 and strategy.opentrades < 5
        strategy.entry('long 5', strategy.long, limit=ma_low_5, qty=(strategy.equity / ma_low_5) * (1 / total_envelope))


  
if use_short
    if envelope_1_pct > 0 and strategy.opentrades < 1
        strategy.entry('short 1', strategy.short, limit=ma_high_1, qty=(strategy.equity / ma_high_1) * (1 / total_envelope))
    if envelope_2_pct > 0 and strategy.opentrades < 2
        strategy.entry('short 2', strategy.short, limit=ma_high_2, qty=(strategy.equity / ma_high_2) * (1 / total_envelope))
    if envelope_3_pct > 0 and strategy.opentrades < 3
        strategy.entry('short 3', strategy.short, limit=ma_high_3, qty=(strategy.equity / ma_high_3) * (1 / total_envelope))
    if envelope_4_pct > 0 and strategy.opentrades < 4
        strategy.entry('short 4', strategy.short, limit=ma_high_4, qty=(strategy.equity / ma_high_4) * (1 / total_envelope))
    if envelope_5_pct > 0 and strategy.opentrades < 5
        strategy.entry('short 5', strategy.short, limit=ma_high_5, qty=(strategy.equity / ma_high_5) * (1 / total_envelope))


strategy.exit('close', limit=ma_base)


// ---------------------------------------------
// ------------------ PLOT ---------------------

ma_base_plot = plot(ma_base, title = "Base MA", color = color.orange, linewidth = 3, offset = 1)

ma_high_1_plot = plot(ma_high_1, title = "MA high 1", color = color.red, offset = 1)
ma_high_2_plot = plot(ma_high_2, title = "MA high 2", color = color.red, offset = 1)
ma_high_3_plot = plot(ma_high_3, title = "MA high 3", color = color.red, offset = 1)
ma_high_4_plot = plot(ma_high_4, title = "MA high 4", color = color.red, offset = 1)
ma_high_5_plot = plot(ma_high_5, title = "MA high 5", color = color.red, offset = 1)

ma_low_1_plot = plot(ma_low_1, title = "MA low 1", color = color.green, offset = 1)
ma_low_2_plot = plot(ma_low_2, title = "MA low 2", color = color.green, offset = 1)
ma_low_3_plot = plot(ma_low_3, title = "MA low 3", color = color.green, offset = 1)
ma_low_4_plot = plot(ma_low_4, title = "MA low 4", color = color.green, offset = 1)
ma_low_5_plot = plot(ma_low_5, title = "MA low 5", color = color.green, offset = 1)

plot(ohlc4, color=color.purple)

// use_period = input.bool(false, "Période spécifique ?", group="periode")
// startDate = input.time(timestamp("01 Jan 2020"), "Date de début", group="periode")
// endDate = input.time(timestamp("01 Jan 2025"), "Date de fin", group="periode")


//------------------------------------------
//-------------Indicateurs------------------

// inDateRange = use_period ? ((time >= startDate) and (time < endDate)) : true

// //--------------Backtest-------------------

// strategy_pnl = strategy.netprofit + strategy.openprofit
// bnh_strategy_pnl_pcnt = (strategy_pnl / strategy.initial_capital) * 100

// float bnh_start_bar = na
// bnh_start_bar := na(bnh_start_bar[1]) or inDateRange != true? close : bnh_start_bar[1]
// float bnl_buy_hold_equity = na
// bnl_buy_hold_equity :=  inDateRange == true ? ((close - bnh_start_bar)/bnh_start_bar) * 100 : bnl_buy_hold_equity[1]

// bnh_vs_diff = bnh_strategy_pnl_pcnt - bnl_buy_hold_equity
// bnh_diff_color = bnh_vs_diff > 0 ? color.new(color.green, inDateRange ? 60 : 100) : color.new(color.red, inDateRange ? 60 : 100)

// var Table = table.new(position.top_right, columns = 2, rows = 4, border_width = 1, bgcolor = color.black, border_color = color.gray)
// table.cell(table_id = Table, column = 0, row = 0, text_color=(bnh_strategy_pnl_pcnt>bnl_buy_hold_equity)?color.gray:color.green, text_size = size.normal, text = "Buy & hold profit")
// table.cell(table_id = Table, column = 1, row = 0, text_color=(bnh_strategy_pnl_pcnt>bnl_buy_hold_equity)?color.gray:color.green, text_size = size.normal, text = str.tostring(bnl_buy_hold_equity, '#.##') + ' %')
// table.cell(table_id = Table, column = 0, row = 1, text_color=(bnh_strategy_pnl_pcnt<bnl_buy_hold_equity)?color.gray:color.green, text_size = size.normal, text = "Strategy profit")
// table.cell(table_id = Table, column = 1, row = 1, text_color=(bnh_strategy_pnl_pcnt<bnl_buy_hold_equity)?color.gray:color.green, text_size = size.normal, text = str.tostring(bnh_strategy_pnl_pcnt, '#.##') + ' %')
// table.cell(table_id = Table, column = 0, row = 2, text_color=color.yellow, text_size = size.normal, text = "Date de début")
// table.cell(table_id = Table, column = 1, row = 2, text_color=color.yellow, text_size = size.normal, text = str.format("{0,date,dd-MM-YYYY}",strategy.closedtrades.entry_time(1)))
```

> Detail

https://www.fmz.com/strategy/441081

> Last Modified

2024-02-05 14:15:40
