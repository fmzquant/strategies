
> Name

积极通道EMA追踪止损策略Positive-Channel-EMA-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cb43efc60d649cd860.png)
[trans]

## 概述
该策略是一种基于EMA指标的通道型止损策略。它融合了趋势判断、通道追踪以及动态止损等多项主流技术指标,通过判断EMA的排序关系来确定牛熊周期,结合ATR通道追踪来实现止损,使得止损点能够持续跟踪价格运行。这种止损思路较为积极,有效避免了过于激进的止损被突破的概率。

## 策略原理
策略主要通过三条不同周期的EMA曲线来判断牛熊状态。具体判断规则是:

- EMA5>EMA20>EMA40 为牛市周期
- EMA20>EMA5>EMA40 为牛市周期  
- EMA20>EMA40>EMA5 为牛市周期
- EMA40>EMA20>EMA5 为熊市周期
- EMA40>EMA5>EMA20 为熊市周期
- EMA5>EMA40>EMA20 为熊市周期

在确定了牛熊周期后,策略使用SMMA采样的K线价格,结合ATR指标的倍数作为通道范围。当价格突破该通道时,才会发出交易信号。此外,交易信号发出后,会开启ATR动态跟踪止损机制,实时调整止损位置,确保止损点能够跟着价格运行,从而提高止损的有效性。

## 策略优势
该策略主要的优势有以下几点:

1. 使用EMA判断牛熊周期,可以有效捕捉市场趋势的转折点
2. 基于ATR通道构建入场点位,避免在震荡市中错入
3. ATR动态跟踪止损,可以最大程度锁定盈利,有效控制风险

## 风险及优化
该策略主要的风险集中在参数设置不当可能导致的过度交易以及止损被突破等问题。可以从以下几个方面进行优化:

1. 优化EMA周期参数组合,寻找最佳参数匹配
2. 优化ATR倍数大小,防止止损过于近或过于远
3. 增加其他过滤指标,避免在震荡行情中错入

## 总结
本策略整合了趋势判断、通道交易和动态止损等多种主流技术指标与方法,形成了一个较为完整的止损交易策略体系。在参数优化及风险控制方面还有很大的优化空间。该策略适用于对止损要求较高的投资者。

||


## Overview
This strategy is a channel-based stop loss strategy that utilizes the EMA indicator. It integrates trend judgment, channel tracking, and dynamic stop loss and other mainstream technical indicators. It determines bull and bear cycles by judging the order of EMAs and combines ATR channel tracking to implement stop loss so that the stop loss point can continue to track price movements. This kind of stop loss idea is more active and effectively avoids the probability of too aggressive stop loss being broken through.

## Strategy Logic  
The strategy mainly uses three EMA curves with different cycles to determine bull and bear state. The specific judging rules are:

- EMA5>EMA20>EMA40 is a bull cycle  
- EMA20>EMA5>EMA40 is a bull cycle
- EMA20>EMA40>EMA5 is a bull cycle 
- EMA40>EMA20>EMA5 is a bear cycle
- EMA40>EMA5>EMA20 is a bear cycle
- EMA5>EMA40>EMA20 is a bear cycle


After determining the bull and bear cycle, the strategy uses SMMA sampled K-line price and ATR indicator multiples as the channel range. Trading signals are only issued when the price breaks through this channel. In addition, after the trading signal is issued, the ATR dynamic tracking stop loss mechanism will be activated to adjust the stop loss position in real time to ensure that the stop loss point can follow the price movement to improve the effectiveness of stop loss.

## Advantages
The main advantages of this strategy are:  

1. Using EMA to judge bull and bear cycles can effectively capture turning points in market trends  
2. Building entry points based on ATR channels avoids wrongly entering during market consolidations
3. ATR dynamic tracking stop loss can maximize profit locking and effectively control risks


## Risks and Optimization
The main risks of this strategy are concentrated in the problems caused by improper parameter settings, such as overtrading and stop loss being broken through. Optimization can be done from the following aspects:  

1. Optimize the combination of EMA cycle parameters to find the best parameter match  
2. Optimize the ATR multiple size to prevent the stop loss from being too close or too far  
3. Add other filtering indicators to avoid wrong entries during choppy markets

## Conclusion  
This strategy integrates multiple mainstream technical indicators and methods such as trend judgment, channel trading, and dynamic stop loss to form a relatively complete stop loss trading system. There is still great room for optimization in parameter tuning and risk control. It is suitable for investors who have high requirements for stop loss.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Key Vaule. 'This changes the sensitivity'|
|v_input_2|7|ATR Period|
|v_input_int_1|25|atr_length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-10 00:00:00
end: 2023-12-12 04:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © kgynofomo

//@version=5
strategy(title="[Salavi] | Andy Advance Pro Strategy [ETH|M15]",overlay = true, pyramiding = 1,initial_capital = 10000, default_qty_type = strategy.cash,default_qty_value = 10000)

ema_short = ta.ema(close,5)
ema_middle = ta.ema(close,20)
ema_long = ta.ema(close,40)

cycle_1 = ema_short>ema_middle and ema_middle>ema_long
cycle_2 = ema_middle>ema_short and ema_short>ema_long
cycle_3 = ema_middle>ema_long and ema_long>ema_short
cycle_4 = ema_long>ema_middle and ema_middle>ema_short
cycle_5 = ema_long>ema_short and ema_short>ema_middle
cycle_6 = ema_short>ema_long and ema_long>ema_middle

bull_cycle = cycle_1 or cycle_2 or cycle_3
bear_cycle = cycle_4 or cycle_5 or cycle_6
// label.new("cycle_1")
// bgcolor(color=cycle_1?color.rgb(82, 255, 148, 60):na)
// bgcolor(color=cycle_2?color.rgb(82, 255, 148, 70):na)
// bgcolor(color=cycle_3?color.rgb(82, 255, 148, 80):na)
// bgcolor(color=cycle_4?color.rgb(255, 82, 82, 80):na)
// bgcolor(color=cycle_5?color.rgb(255, 82, 82, 70):na)
// bgcolor(color=cycle_6?color.rgb(255, 82, 82, 60):na)

// Inputs
a = input(2, title='Key Vaule. \'This changes the sensitivity\'')
c = input(7, title='ATR Period')
h = false

xATR = ta.atr(c)
nLoss = a * xATR

src = h ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, lookahead=barmerge.lookahead_off) : close

xATRTrailingStop = 0.0
iff_1 = src > nz(xATRTrailingStop[1], 0) ? src - nLoss : src + nLoss
iff_2 = src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), src + nLoss) : iff_1
xATRTrailingStop := src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), src - nLoss) : iff_2

pos = 0
iff_3 = src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0)
pos := src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0) ? 1 : iff_3

xcolor = pos == -1 ? color.red : pos == 1 ? color.green : color.blue

ema = ta.ema(src, 1)
above = ta.crossover(ema, xATRTrailingStop)
below = ta.crossover(xATRTrailingStop, ema)

buy = src > xATRTrailingStop and above
sell = src < xATRTrailingStop and below

barbuy = src > xATRTrailingStop
barsell = src < xATRTrailingStop




atr = ta.atr(14)
atr_length = input.int(25)
atr_rsi = ta.rsi(atr,atr_length)
atr_valid = atr_rsi>50

long_condition =  buy and bull_cycle and atr_valid
short_condition =  sell and bear_cycle and atr_valid

Exit_long_condition = short_condition
Exit_short_condition = long_condition

if long_condition
    strategy.entry("Andy Buy",strategy.long, limit=close,comment="Andy Buy Here")

if Exit_long_condition
    strategy.close("Andy Buy",comment="Andy Buy Out")
    // strategy.entry("Andy fandan Short",strategy.short, limit=close,comment="Andy 翻單 short Here")
    // strategy.close("Andy fandan Buy",comment="Andy short Out")


if short_condition
    strategy.entry("Andy Short",strategy.short, limit=close,comment="Andy short Here")


// strategy.exit("STR","Long",stop=longstoploss)
if Exit_short_condition
    strategy.close("Andy Short",comment="Andy short Out")
    // strategy.entry("Andy fandan Buy",strategy.long, limit=close,comment="Andy 翻單 Buy Here")
    // strategy.close("Andy fandan Short",comment="Andy Buy Out")




inLongTrade = strategy.position_size > 0
inLongTradecolor = #58D68D
notInTrade = strategy.position_size == 0
inShortTrade = strategy.position_size < 0

// bgcolor(color = inLongTrade?color.rgb(76, 175, 79, 70):inShortTrade?color.rgb(255, 82, 82, 70):na)
plotshape(close!=0,location = location.bottom,color = inLongTrade?color.rgb(76, 175, 79, 70):inShortTrade?color.rgb(255, 82, 82, 70):na)


plotshape(long_condition, title='Buy', text='Andy Buy', style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), textcolor=color.new(color.white, 0), size=size.tiny)
plotshape(short_condition, title='Sell', text='Andy Sell', style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), size=size.tiny)


// //atr > close *0.01* parameter

// // MONTHLY TABLE PERFORMANCE - Developed by @QuantNomad
// // *************************************************************************************************************************************************************************************************************************************************************************
// show_performance = input.bool(true, 'Show Monthly Performance ?', group='Performance - credits: @QuantNomad')
// prec = input(2, 'Return Precision', group='Performance - credits: @QuantNomad')

// if show_performance
//     new_month = month(time) != month(time[1])
//     new_year  = year(time)  != year(time[1])
    
//     eq = strategy.equity
    
//     bar_pnl = eq / eq[1] - 1
    
//     cur_month_pnl = 0.0
//     cur_year_pnl  = 0.0
    
//     // Current Monthly P&L
//     cur_month_pnl := new_month ? 0.0 : 
//                      (1 + cur_month_pnl[1]) * (1 + bar_pnl) - 1 
    
//     // Current Yearly P&L
//     cur_year_pnl := new_year ? 0.0 : 
//                      (1 + cur_year_pnl[1]) * (1 + bar_pnl) - 1  
    
//     // Arrays to store Yearly and Monthly P&Ls
//     var month_pnl  = array.new_float(0)
//     var month_time = array.new_int(0)
    
//     var year_pnl  = array.new_float(0)
//     var year_time = array.new_int(0)
    
//     last_computed = false
    
//     if (not na(cur_month_pnl[1]) and (new_month or barstate.islastconfirmedhistory))
//         if (last_computed[1])
//             array.pop(month_pnl)
//             array.pop(month_time)
            
//         array.push(month_pnl , cur_month_pnl[1])
//         array.push(month_time, time[1])
    
//     if (not na(cur_year_pnl[1]) and (new_year or barstate.islastconfirmedhistory))
//         if (last_computed[1])
//             array.pop(year_pnl)
//             array.pop(year_time)
            
//         array.push(year_pnl , cur_year_pnl[1])
//         array.push(year_time, time[1])
    
//     last_computed := barstate.islastconfirmedhistory ? true : nz(last_computed[1])
    
//     // Monthly P&L Table    
//     var monthly_table = table(na)
    
//     if (barstate.islastconfirmedhistory)
//         monthly_table := table.new(position.bottom_center, columns = 14, rows = array.size(year_pnl) + 1, border_width = 1)
    
//         table.cell(monthly_table, 0,  0, "",     bgcolor = #cccccc)
//         table.cell(monthly_table, 1,  0, "Jan",  bgcolor = #cccccc)
//         table.cell(monthly_table, 2,  0, "Feb",  bgcolor = #cccccc)
//         table.cell(monthly_table, 3,  0, "Mar",  bgcolor = #cccccc)
//         table.cell(monthly_table, 4,  0, "Apr",  bgcolor = #cccccc)
//         table.cell(monthly_table, 5,  0, "May",  bgcolor = #cccccc)
//         table.cell(monthly_table, 6,  0, "Jun",  bgcolor = #cccccc)
//         table.cell(monthly_table, 7,  0, "Jul",  bgcolor = #cccccc)
//         table.cell(monthly_table, 8,  0, "Aug",  bgcolor = #cccccc)
//         table.cell(monthly_table, 9,  0, "Sep",  bgcolor = #cccccc)
//         table.cell(monthly_table, 10, 0, "Oct",  bgcolor = #cccccc)
//         table.cell(monthly_table, 11, 0, "Nov",  bgcolor = #cccccc)
//         table.cell(monthly_table, 12, 0, "Dec",  bgcolor = #cccccc)
//         table.cell(monthly_table, 13, 0, "Year", bgcolor = #999999)
    
    
//         for yi = 0 to array.size(year_pnl) - 1
//             table.cell(monthly_table, 0,  yi + 1, str.tostring(year(array.get(year_time, yi))), bgcolor = #cccccc)
            
//             y_color = array.get(year_pnl, yi) > 0 ? color.new(color.teal, transp = 40) : color.new(color.gray, transp = 40)
//             table.cell(monthly_table, 13, yi + 1, str.tostring(math.round(array.get(year_pnl, yi) * 100, prec)), bgcolor = y_color, text_color=color.new(color.white, 0))
            
//         for mi = 0 to array.size(month_time) - 1
//             m_row   = year(array.get(month_time, mi))  - year(array.get(year_time, 0)) + 1
//             m_col   = month(array.get(month_time, mi)) 
//             m_color = array.get(month_pnl, mi) > 0 ? color.new(color.teal, transp = 40) : color.new(color.gray, transp = 40)
            
//             table.cell(monthly_table, m_col, m_row, str.tostring(math.round(array.get(month_pnl, mi) * 100, prec)), bgcolor = m_color, text_color=color.new(color.white, 0))


```

> Detail

https://www.fmz.com/strategy/435718

> Last Modified

2023-12-18 12:10:45
