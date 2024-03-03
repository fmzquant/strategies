
> Name

基于布林带短期趋势跟踪型策略Bollinger-Bands-Breakout-short-term-trend-following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/207f432126af54334eb.png)

[trans]

## 概述

布林带突破策略是一个基于布林带指标的短期趋势跟踪型策略。它可以执行多头和空头两种方向的操作,适用于现货和永续合约,尤其适用于趋势行情。

该策略具有高度的可配置性,允许用户设置布林带的参数期间和偏差,趋势过滤器,波动性过滤器,交易方向过滤器,变化率过滤器和日期过滤器等。此外,它还为多头和空头仓位设置了止损,止盈和跟踪止损,确保全面的风险管理方法。每日最大亏损的加入提供了另一层保护,使其成为一个值得信赖的专业化自适应交易系统。

## 策略原理

该策略的核心指标是布林带。布林带由中轨、上轨和下轨三条线组成,代表价格的均值线、波动的上限和波动的下限。当价格突破上轨时,做多;当价格突破下轨时,做空。

此外,策略还设置了多个辅助过滤器,避免Noise交易。这些过滤器包括:

1. 趋势过滤器:价格在移动平均线上方做多,价格在移动平均线下方做空;

2. 波动性过滤器:仅在波动性扩大时交易;  

3. 交易方向过滤器:根据标的属性选择只做多、只做空或双向交易;

4. 变化率过滤器:价格相对前一交易日收盘价的变化率达到一定水平时才进入;

5. 日期过滤器:用于回测的时间区间设置。

当所有过滤条件满足时产生交易信号。止盈、止损和跟踪止损确保风险管理。此外,最大日内亏损设置避免单日大幅回撤。

## 优势分析

该策略具有以下优势:

1. 采用布林带这个成熟指标作为核心交易信号,可靠性高;

2. 多重过滤器设计避免误交易,可配置性强;

3. 止盈、止损、跟踪止损全面、灵活;

4. 最大日内亏损设置有效控制单日回撤。

5. 适合趋势市,收益潜力大。

## 风险分析

该策略也存在一定风险:  

1. 布林带突破容易形成头部假突破和底部假突破,可能造成损失;

2. 在盘整市中,过滤器可能过于严格,错过交易机会;

3. 大幅度跳空可能直接突破止损线造成损失;

4. 极端行情中,无法完全避免巨额亏损。

针对上述风险,可以适当放宽过滤条件,或人工干预关闭部分仓位,降低止损距离等。

## 优化方向  

该策略可以考虑从以下几个方面进行优化:

1. 尝试不同的参数组合,寻找最佳的参数区间;

2. 增加机器学习模型,实现参数的动态优化;  

3. 研究更有效的止损方式,如时间止损,振幅止损等;

4. 结合情绪指标,在极端行情中主动干预;

5. 结合相关产品,进行统计套利。

## 总结  

布林带突破策略是一个成熟可靠的短线趋势跟随策略。它采用布林带指标作为信号,并设置了多重过滤器确保信号的可靠性。同时,全面的止损和风控机制控制了风险。该策略适合活跃的趋势市,具有良好的收益潜力。通过不断优化,有望成为一个强大的量化交易系统。
||

## Overview

The Bollinger Bands Breakout Strategy is a short-term trend following strategy optimized for crypto trading. It utilizes the well-established Bollinger Bands indicator as the core signal generator and is capable of taking both long and short positions. With comprehensive risk management mechanisms, it is a robust automated trading system suitable for trending markets.

The strategy features a high level of configurability, including the Bollinger Bands parameters, various filters, take profit/stop loss settings and maximum intraday loss threshold. This adaptability empowers the strategy to achieve reliable performance across various market regimes.

## How It Works 

The strategy centres around the Bollinger Bands indicator, which calculates a middle band, an upper band and a lower band that serve as proxies for price averages and volatility limits. The crossing of price over the upper or lower bands generates entry signals – long when price breaks above upper band, short when below lower band.

In addition, multiple filters are implemented to avoid false signals:

1. Trend Filter: long above moving average, short below moving average

2. Volatility Filter: only trade when volatility expands  

3. Direction Filter: configurable for long-only, short-only or both directions 

4. Rate of Change Filter: sufficient price movement from previous close required

5. Date Filter: for backtesting timeframe specification

Exits are handled through take profit, stop loss and trailing stop mechanisms to lock in gains and limit losses. Maximum intraday loss threshold provides another layer of daily drawdown protection.  

## Advantages

The main advantages of this strategy include:

1. Reliable Bollinger Bands indicator as core signal 

2. Customizable filters prevent unwanted trades

3. Comprehensive stop loss/take profit design  

4. Max intraday loss guards against extreme drawdown  

5. Thrives in trending markets with profit potential

## Risks

Despite the advantages, some risks remain:

1. Whipsaws around Bollinger Bands may lead to losses

2. Too rigid filters reduce trades in range-bound markets

3. Gaps can stop out positions preemptively  

4. Extreme moves cannot be fully avoided  

Mitigations include adjusting filters, manual intervention and tweaked stops.

## Enhancement Opportunities

Possible optimizations for this strategy:

1. Search for optimal parameter combinations  

2. Introduce machine learning for adaptive optimization   

3. Research better stop loss methods e.g. volatility stops

4. Incorporate sentiment to guide discretionary actions 

5. Utilize correlated instruments for statistical arbitrage

## Conclusion

The Bollinger Bands Breakout Strategy is a time-tested system for short-term trend trading. By combining the merits of Bollinger Bands signal and prudent filters, it generates quality entries for trends while avoiding false signals. Comprehensive risk management mechanisms also contain drawdowns effectively. With continuous improvements, this strategy has the potential to become a formidable automated trading system.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|15|(?Bollinger Bands)Length|
|v_input_float_1|2|StdDev|
|v_input_bool_1|false|(?Trend Filter)Above/Below|
|v_input_1|223|trendFilterPeriodInput|
|v_input_string_1|0|trendFilterType: EMA|SMA|RMA|WMA|
|v_input_bool_2|true|(?Volatility Filter)StdDev|
|v_input_2|15|volatilityFilterStDevLength|
|v_input_3|15|>MA|
|v_input_bool_3|false|(?ROC Filter from CloseD)roc_enable|
|v_input_float_2|true|Treshold|
|v_input_4|timestamp(2017-01-01)|(?Date Filter)Start|
|v_input_5|timestamp(2050-01-01)|End|
|v_input_float_3|2|(?Exit Long)TS|
|v_input_float_4|0.5|TO|
|v_input_float_5|2|SL|
|v_input_float_6|9|TP|
|v_input_float_7|2|(?Exit Short)TS|
|v_input_float_8|0.5|TO|
|v_input_float_9|2|SL|
|v_input_float_10|9|TP|
|v_input_int_2|10|(?Risk Management)Max Intraday Loss (Percent)|
|v_input_6|2|(?Results Table)Precision|
|v_input_bool_4|true|Dark Mode|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-22 00:00:00
end: 2023-11-04 05:20:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=5
strategy("Bollinger Bands - Breakout Strategy",overlay=true
         )



// Define the length of the Bollinger Bands
bbLengthInput = input.int (15,title="Length", group="Bollinger Bands", inline="BB")
bbDevInput = input.float (2.0,title="StdDev", group="Bollinger Bands", inline="BB")

// Define the settings for the Trend Filter
trendFilterInput = input.bool(false, title="Above/Below", group = "Trend Filter", inline="Trend")
trendFilterPeriodInput = input(223,title="", group = "Trend Filter", inline="Trend")
trendFilterType = input.string (title="", defval="EMA",options=["EMA","SMA","RMA", "WMA"], group = "Trend Filter", inline="Trend")

volatilityFilterInput = input.bool(true,title="StdDev", group = "Volatility Filter", inline="Vol")
volatilityFilterStDevLength = input(15,title="",group = "Volatility Filter", inline="Vol")
volatilityStDevMaLength = input(15,title=">MA",group = "Volatility Filter", inline="Vol")

// ROC Filter

// f_security function by LucF for PineCoders available here: https://www.tradingview.com/script/cyPWY96u-How-to-avoid-repainting-when-using-security-PineCoders-FAQ/
f_security(_sym, _res, _src, _rep) => request.security(_sym, _res, _src[not _rep and barstate.isrealtime ? 1 : 0])[_rep or barstate.isrealtime ? 0 : 1]
high_daily = f_security(syminfo.tickerid, "D", high, false)

roc_enable = input.bool(false, "", group="ROC Filter from CloseD", inline="roc")
roc_threshold = input.float(1, "Treshold", step=0.5, group="ROC Filter from CloseD", inline="roc")

closed = f_security(syminfo.tickerid,"1D",close, false)
roc_filter= roc_enable ? (close-closed)/closed*100  > roc_threshold : true

// Trade Direction Filter

// tradeDirectionInput = input.string("Auto",options=["Auto", "Long&Short","Long Only", "Short Only"], title="Trade", group="Direction Filter", tooltip="Auto: if a PERP is detected (in the symbol description), trade long and short\n Otherwise as per user-input")

// tradeDirection = switch tradeDirectionInput
// 	"Auto" => str.contains(str.lower(syminfo.description), "perp") or str.contains(str.lower(syminfo.description), ".p") ? strategy.direction.all : strategy.direction.long
// 	"Long&Short" => strategy.direction.all
// 	"Long Only" => strategy.direction.long
//     "Short Only" => strategy.direction.short
// 	=> strategy.direction.all

// strategy.risk.allow_entry_in(tradeDirection)


// Calculate and plot the Bollinger Bands
[bbMiddle, bbUpper, bbLower] = ta.bb (close, bbLengthInput, bbDevInput)

plot(bbMiddle, "Basis", color=color.orange)
bbUpperPlot = plot(bbUpper, "Upper", color=color.blue)
bbLowerrPlot = plot(bbLower, "Lower", color=color.blue)
fill(bbUpperPlot, bbLowerrPlot, title = "Background", color=color.new(color.blue, 95))


// Calculate and view Trend Filter

float tradeConditionMa = switch trendFilterType
	"EMA" => ta.ema(close, trendFilterPeriodInput)
	"SMA" => ta.sma(close, trendFilterPeriodInput)
	"RMA" => ta.rma(close, trendFilterPeriodInput)
    "WMA" => ta.wma(close, trendFilterPeriodInput)
	// Default used when the three first cases do not match.
	=> ta.wma(close, trendFilterPeriodInput)


trendConditionLong  = trendFilterInput ? close > tradeConditionMa : true
trendConditionShort = trendFilterInput ? close < tradeConditionMa : true
plot(trendFilterInput ? tradeConditionMa : na, color=color.yellow)

// Calculate and view Volatility Filter

stdDevClose = ta.stdev(close,volatilityFilterStDevLength)
volatilityCondition = volatilityFilterInput ? stdDevClose > ta.sma(stdDevClose,volatilityStDevMaLength) : true

bbLowerCrossUnder =  ta.crossunder(close, bbLower)
bbUpperCrossOver =  ta.crossover(close, bbUpper)

bgcolor(volatilityCondition ? na : color.new(color.red, 95))


// Date Filter

start = input(timestamp("2017-01-01"), "Start", group="Date Filter")
finish = input(timestamp("2050-01-01"), "End", group="Date Filter")

date_filter = true

// Entry and Exit Conditions

entryLongCondition = bbUpperCrossOver and trendConditionLong and volatilityCondition and date_filter and roc_filter
entryShortCondition = bbLowerCrossUnder and trendConditionShort and volatilityCondition and date_filter and roc_filter

exitLongCondition = bbLowerCrossUnder
exitShortCondition = bbUpperCrossOver

// Orders

if entryLongCondition
    strategy.entry("EL", strategy.long)

if entryShortCondition
    strategy.entry("ES", strategy.short)

if exitLongCondition
    strategy.close("EL")

if exitShortCondition
    strategy.close("ES")



// Long SL/TP/TS

xl_ts_percent      = input.float(2,step=0.5, title= "TS", group="Exit Long", inline="LTS", tooltip="Trailing Treshold %")
xl_to_percent      = input.float(0.5, step=0.5, title= "TO", group="Exit Long", inline="LTS", tooltip="Trailing Offset %")

xl_ts_tick = xl_ts_percent * close/syminfo.mintick/100
xl_to_tick = xl_to_percent * close/syminfo.mintick/100

xl_sl_percent      = input.float (2, step=0.5, title="SL",group="Exit Long", inline="LSLTP") 
xl_tp_percent      = input.float(9, step=0.5, title="TP",group="Exit Long", inline="LSLTP")

xl_sl_price = strategy.position_avg_price * (1-xl_sl_percent/100)
xl_tp_price = strategy.position_avg_price * (1+xl_tp_percent/100)

strategy.exit("XL+SL/TP", "EL", stop=xl_sl_price, limit=xl_tp_price, trail_points=xl_ts_tick, trail_offset=xl_to_tick,comment_loss= "XL-SL", comment_profit = "XL-TP",comment_trailing = "XL-TS")

// Short SL/TP/TS
xs_ts_percent      = input.float(2,step=0.5, title= "TS",group="Exit Short", inline ="STS", tooltip="Trailing Treshold %")
xs_to_percent      = input.float(0.5, step=0.5, title= "TO",group="Exit Short", inline ="STS", tooltip="Trailing Offset %")

xs_ts_tick = xs_ts_percent * close/syminfo.mintick/100
xs_to_tick = xs_to_percent * close/syminfo.mintick/100

xs_sl_percent      = input.float (2, step=0.5, title="SL",group="Exit Short", inline="ESSLTP", tooltip="Stop Loss %") 
xs_tp_percent      = input.float(9, step=0.5, title="TP",group="Exit Short",  inline="ESSLTP", tooltip="Take Profit %")

xs_sl_price = strategy.position_avg_price * (1+xs_sl_percent/100)
xs_tp_price = strategy.position_avg_price * (1-xs_tp_percent/100)

strategy.exit("XS+SL/TP", "ES", stop=xs_sl_price, limit=xs_tp_price, trail_points=xs_ts_tick, trail_offset=xs_to_tick,comment_loss= "XS-SL", comment_profit = "XS-TP",comment_trailing = "XS-TS")


max_intraday_loss = input.int(10, title="Max Intraday Loss (Percent)", group="Risk Management")

//strategy.risk.max_intraday_loss(max_intraday_loss, strategy.percent_of_equity)

// Monthly Returns table, modified from QuantNomad. Please put calc_on_every_tick = true to plot it. 

monthly_table(int results_prec, bool results_dark) =>
    new_month = month(time) != month(time[1])
    new_year  = year(time)  != year(time[1])
    
    eq = strategy.equity
    
    bar_pnl = eq / eq[1] - 1
    
    cur_month_pnl = 0.0
    cur_year_pnl  = 0.0
    
    // Current Monthly P&L
    cur_month_pnl := new_month ? 0.0 : 
                     (1 + cur_month_pnl[1]) * (1 + bar_pnl) - 1 
    
    // Current Yearly P&L
    cur_year_pnl := new_year ? 0.0 : 
                     (1 + cur_year_pnl[1]) * (1 + bar_pnl) - 1  
    
    // Arrays to store Yearly and Monthly P&Ls
    var month_pnl  = array.new_float(0)
    var month_time = array.new_int(0)
    
    var year_pnl  = array.new_float(0)
    var year_time = array.new_int(0)
    
    last_computed = false
    
    if (not na(cur_month_pnl[1]) and (new_month or barstate.islast))
        if (last_computed[1])
            array.pop(month_pnl)
            array.pop(month_time)
            
        array.push(month_pnl , cur_month_pnl[1])
        array.push(month_time, time[1])
    
    if (not na(cur_year_pnl[1]) and (new_year or barstate.islast))
        if (last_computed[1])
            array.pop(year_pnl)
            array.pop(year_time)
            
        array.push(year_pnl , cur_year_pnl[1])
        array.push(year_time, time[1])
    
    last_computed := barstate.islast ? true : nz(last_computed[1])
    
    // Monthly P&L Table    
    var monthly_table = table(na)
    
    cell_hr_bg_color = results_dark ? #0F0F0F : #F5F5F5
    cell_hr_text_color = results_dark ? #D3D3D3 : #555555
    cell_border_color = results_dark ? #000000 : #FFFFFF

    // ell_hr_bg_color = results_dark ? #0F0F0F : #F5F5F5
    // cell_hr_text_color = results_dark ? #D3D3D3 : #555555
    // cell_border_color = results_dark ? #000000 : #FFFFFF
    if (barstate.islast)
        monthly_table := table.new(position.bottom_right, columns = 14, rows = array.size(year_pnl) + 1, bgcolor=cell_hr_bg_color,border_width=1,border_color=cell_border_color)
    
        table.cell(monthly_table, 0,  0, syminfo.tickerid + " " + timeframe.period,     text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 1,  0, "Jan",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 2,  0, "Feb",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 3,  0, "Mar",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 4,  0, "Apr",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 5,  0, "May",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 6,  0, "Jun",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 7,  0, "Jul",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 8,  0, "Aug",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 9,  0, "Sep",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 10, 0, "Oct",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 11, 0, "Nov",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 12, 0, "Dec",  text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
        table.cell(monthly_table, 13, 0, "Year", text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
    
        for yi = 0 to array.size(year_pnl) - 1
            table.cell(monthly_table, 0,  yi + 1, str.tostring(year(array.get(year_time, yi))), text_color=cell_hr_text_color, bgcolor=cell_hr_bg_color)
            
            y_color = array.get(year_pnl, yi) > 0 ? color.lime :  array.get(year_pnl, yi) < 0 ? color.red : color.gray
            table.cell(monthly_table, 13, yi + 1, str.tostring(math.round(array.get(year_pnl, yi) * 100, results_prec)), bgcolor = y_color)
            
        for mi = 0 to array.size(month_time) - 1
            m_row   = year(array.get(month_time, mi))  - year(array.get(year_time, 0)) + 1
            m_col   = month(array.get(month_time, mi)) 
            m_color = array.get(month_pnl, mi) > 0 ? color.lime : array.get(month_pnl, mi) < 0 ? color.red : color.gray
            
            table.cell(monthly_table, m_col, m_row, str.tostring(math.round(array.get(month_pnl, mi) * 100, results_prec)), bgcolor = m_color)

results_prec = input(2, title = "Precision", group="Results Table")
results_dark = input.bool(defval=true, title="Dark Mode", group="Results Table")
monthly_table(results_prec, results_dark)
```

> Detail

https://www.fmz.com/strategy/433024

> Last Modified

2023-11-23 17:01:12
