
> Name

趋势突破均线跟踪策略Trend-Breakout-Moving-Average-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12db008960c3983e255.png)

[trans]

## 概述

该策略通过简单移动均线的金叉死叉来判断趋势方向,在趋势开始阶段全仓做多做空,并设立止损止盈单进行风险控制。入场后会使用均线进行持续的趋势跟踪,在趋势背离时及时止损。该策略同时具有可配置的止损、止盈、仓位管理模块,可以灵活调整策略的参数,适用于不同品种。

## 策略原理

该策略主要通过简单移动均线的金叉和死叉来判断趋势的开始和结束。策略首先根据快线SMA(例如21日线)和慢线SMA(例如49日线)的关系来判断趋势方向。当快线从下方上穿慢线时,认为行情进入上升趋势,会在该时间点开多单;当快线从上方下穿慢线时,认为行情进入下跌趋势,会在该时间点开空单。

入场后,策略会实时监控价格与SMA的关系。当价格从上方下破SMA时,认为上升趋势结束,会平掉多单;当价格从下方上破SMA时,认为下跌趋势结束,会平掉空单。

为控制风险,策略在开仓时会同时下达止损单和止盈单。止损距离根据ATR设置,止盈距离则可选择按照百分比设置或按照ATR设置。开仓后,止损单会实时跟踪价格,实现趋势跟踪的效果。止盈单到达后会退出部分仓位,余下仓位继续跟踪,直至全部退出。

该策略还具有仓位管理模块,可以限制每次交易的资金利用率,从而控制单笔交易的风险敞口。同时,最大回撤设置可以控制策略的总体风险。

## 策略优势

- 使用均线比较判断趋势方向,原理简单易懂
- 入场后实时跟踪止损,可以锁定大部分利润
- 可配置的止损、止盈方式,可以根据不同品种进行调整
- 单笔风险可控,不会全仓交易
- 最大回撤设置,可以限制策略总损失

## 风险及解决方案

- 双均线交叉具有一定滞后性,可能错过趋势开始的最佳入场点
- 需要反复调整参数,测试不同周期的均线组合
- 均线交叉具有一定误报率,入场准确率无法达到100%
- 跟踪止损容易被突破,无法锁定全部利润
- 需要适当宽松止损距离,给予价格一定回调空间
- 最大回撤限制可能过于保守,损失了上涨机会
- 可以适当放宽最大回撤比例,给策略更多容错空间

## 优化方向

- 尝试不同的参数组合,选择最佳的均线周期
- 加入趋势强度指标,提高入场的准确性
- 优化止损策略,在趋势中尽量追涨杀跌
- 测试不同的止盈策略,选择最优止盈点
- 优化仓位管理方案,提高资金利用效率
- 调整最大回撤设定,平衡收益和风险

## 总结

该策略总体来说是一个非常适合新手的入门策略,原理简单,易于理解和掌握。同时它也具备适当的风险控制能力,可以减少大额亏损的概率。通过参数优化可以获得不错的效果。但其本质 defects 也决定了它无法做到高度精准的操作。建议可以作为新手练习的策略来使用,但不适合追求高效率和高胜率操作的交易者。如果想取得更好的交易效果,需要寻找拥有更强预测能力的策略。

|| 

## Overview

This strategy identifies trend direction by golden cross and dead cross of simple moving averages, goes long or short with full position size at the beginning of a trend, and sets up stop loss and take profit orders to control risks. After entering the position, it keeps tracking the trend using moving averages and cuts loss in time when there is trend reversal. This strategy also has configurable modules for stop loss, take profit and position sizing, which allows flexible adjustment of parameters for different products.

## Strategy Logic

The core of this strategy is to determine trend start and end using golden cross and dead cross of simple moving averages. It first identifies trend direction based on the relationship between fast SMA (e.g. 21-period) and slow SMA (e.g. 49-period). When fast SMA crosses above slow SMA, it signals an uptrend, and the strategy will go long. When fast SMA crosses below slow SMA, it signals a downtrend, and the strategy will go short.

After entering the position, the strategy keeps monitoring the price relative to SMA in real time. It will close long position when price breaks SMA from above, and close short position when price breaks SMA from below, as trend reversal signals. 

To control risks, the strategy sets up stop loss and take profit orders simultaneously when opening position. Stop loss distance is based on ATR, while take profit distance can be configured as percentage or ATR multiples. After opening position, stop loss keeps tracking price to realize trend following. When take profit is touched, it closes partial position first while keeping the rest to continue tracking until fully closed.

The strategy also has position sizing module to limit funds utilized for each trade and control per trade risk exposure. In addition, max drawdown limit helps restrict overall strategy risk.

## Advantages

- Simple to understand, using SMA cross to determine trend direction
- Real-time tracking of stop loss after entering can lock in most profits 
- Customizable stop loss and take profit for different products
- Per trade risk controllable, no full position trading
- Max drawdown limit to restrict total loss

## Risks and Solutions

- SMA cross has some lag, may miss best entry at trend start
- Need repeated adjustment of parameters and testing of different SMA periods  
- SMA cross has some whipsaws, entry accuracy cannot be 100%
- Trailing stop loss may be hit easily, unable to lock entire profit
- Need reasonable stop loss distance for price retracement 
- Max drawdown limit may be too conservative, missing upside potential
- Can relax max drawdown allowance for more strategy tolerance

## Enhancement Opportunities 

- Test different parameter combinations to find optimal SMA periods
- Add trend strength indicator to improve entry accuracy
- Optimize stop loss strategy to chase uptrend and downtrend as much as possible
- Test different take profit strategies to find optimal exit points
- Refine position sizing scheme to improve capital utilization 
- Adjust max drawdown setting to balance return vs risk

## Conclusion

In summary, this is a very suitable starter strategy for beginners, with simple logic and easy understanding. It also has proper risk control capabilities to reduce large losses. Good results can be achieved through parameter tuning. But its intrinsic weaknesses also determine that it cannot operate with high precision. It is recommended for beginners to practice, but may not suit advanced traders pursuing high efficiency and win rate. To obtain better trading performance, strategies with stronger predictive power should be sought.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Filters)From|
|v_input_1|timestamp(01 Jan 2021 00:00 UTC)|fromDate|
|v_input_bool_2|false|To |
|v_input_2|timestamp(31 Dec 2121 23:59 UTC)|toDate|
|v_input_bool_3|true|Long Trades|
|v_input_bool_4|true|Short Trades|
|v_input_bool_5|true|EMA Filter|
|v_input_timeframe_1|D|EMA Res/Len/Src|
|v_input_int_1|200|emaLength|
|v_input_source_1_close|0|emaSrc: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_6|true|EMA ATR Band|
|v_input_int_2|5|EMA ATR Len/Mul|
|v_input_float_1|true|filterAtrMul|
|v_input_bool_7|true|(?Plot)Show EMA Line|
|v_input_bool_8|false|Show EMA Band|
|v_input_bool_13|false|Show Position Highlighter|
|v_input_int_3|21|(?Strategy)Fast/Slow SMA Length|
|v_input_int_4|49|slowMALen|
|v_input_int_5|14|(?General)ATR Length|
|v_input_bool_9|false|(?Entry)Enable Trailing|
|v_input_string_1|0|Deviation Method: PERC|ATR|
|v_input_float_2|true|Deviation %|
|v_input_float_3|0.5|Deviation ATR Mul|
|v_input_source_2_high|0|Long/Short Entry Control: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_source_3_low|0|ctrShortEntrySrc: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_10|false|(?Exit)Enable Trailing|
|v_input_string_2|0|Deviation Method: PERC|ATR|
|v_input_float_4|3|Deviation %|
|v_input_float_5|0.5|Deviation ATR Mul|
|v_input_source_4_low|0|Long/Short Exit Control: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_source_5_high|0|ctrShortExitSrc: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_3|0|(?Stop Loss - Target)Stop Loss Method: PERC|ATR|
|v_input_float_6|7.5|Long/Short Stop Loss %|
|v_input_float_7|7.5|shortTrailingStopLossPerc|
|v_input_float_8|3|ATR Long/Short Mul |
|v_input_float_9|3|shortStopLossAtrMul|
|v_input_string_4|0|(?Stop Loss - Trailing)Enable Trailing: TP|ON|OFF|
|v_input_bool_11|false|Break Even|
|v_input_string_5|0|(?Take Profit - Target)Take Profit Method: PERC|ATR|RR|
|v_input_float_10|10|Long/Short Take Profit %|
|v_input_float_11|10|shortTakeProfitPerc|
|v_input_float_12|9|ATR Long/Short Mul |
|v_input_float_13|9|shortTakeProfitAtrMul|
|v_input_float_14|1.5|Long/Short RR Ratio |
|v_input_float_15|1.5|shortRiskRewardRatio|
|v_input_bool_12|true|(?Take Profit - Trailing)Enable Trailing|
|v_input_string_6|0|Deviation Method: PERC|ATR|
|v_input_float_16|true|Deviation %|
|v_input_float_17|true|Deviation ATR Mul|
|v_input_float_18|50|(?Quantity/Risk Management)Take Profit Quantity %|
|v_input_float_19|2|Capital at Risk %|
|v_input_int_6|10|Minimum Trade Price|
|v_input_int_7|true|Leverage Long/Short |
|v_input_int_8|true|shortLeverage|
|v_input_int_9|25|Max Drawdown %|
|v_input_string_7|Long: Started|(?Alert Messages)Open Long/Short|
|v_input_string_8|Short: Started|msgOpenShort|
|v_input_string_9|Long: Closed at market price|Close Long/Short|
|v_input_string_10|Short: Closed at market price|msgCloseShort|
|v_input_string_11|Long: Take Profit or Stop Loss executed|TP/SL Long/Short|
|v_input_string_12|Short: Take Profit or Stop Loss executed|msgTPSLShort|
|v_input_string_13|Long: Stop Loss executed|SL Long/Short |
|v_input_string_14|Short: Stop Loss executed|msgSLShort|
|v_input_string_15|Death is the new beginning|Max Drawdown|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-11-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
//  -----------------------------------------------------------------------------
//  Copyright 2022 Iason Nikolas | jason5480
//  Template Strategy script may be freely distributed under the MIT license.
//
//  Permission is hereby granted, free of charge, 
//  to any person obtaining a copy of this software and associated documentation files (the "Software"), 
//  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, 
//  publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
//  subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//  -----------------------------------------------------------------------------
//
//  Authors:  @jason5480
//  Revision: v0.0.1
//  Date:     26-Feb-2022
//
//  Description
//  =============================================================================
//  This script is designed to be used as a template for building new strategies.
//  The framework provide you with a configurable implementation of the entry, exit,
//  stop loss and take profit trailing logic. The user of this script has to copy
//  it and replace the openLongPosition, openShortPosition, closeLongPosition and
//  closeShortPosition variables in the STRATEGY module according to his needs! 
//  
//  -----------------------------------------------------------------------------
//  Disclaimer:
//    1. I am not licensed financial advisors or broker dealer. I do not tell you 
//       when or what to buy or sell. I developed this software which enables you 
//       execute manual or automated trades using TradingView. The 
//       software allows you to set the criteria you want for entering and exiting 
//       trades.
//    2. Do not trade with money you cannot afford to lose.
//    3. I do not guarantee consistent profits or that anyone can make money with no 
//       effort. And I am not selling the holy grail.
//    4. Every system can have winning and losing streaks.
//    5. Money management plays a large role in the results of your trading. For 
//       example: lot size, account size, broker leverage, and broker margin call 
//       rules all have an effect on results. Also, your Take Profit and Stop Loss 
//       settings for individual pair trades and for overall account equity have a 
//       major impact on results. If you are new to trading and do not understand 
//       these items, then I recommend you seek education materials to further your
//       knowledge.
//
//    YOU NEED TO FIND AND USE THE TRADING SYSTEM THAT WORKS BEST FOR YOU AND YOUR 
//    TRADING TOLERANCE.
//
//    I HAVE PROVIDED NOTHING MORE THAN A TOOL WITH OPTIONS FOR YOU TO TRADE WITH THIS PROGRAM ON TRADINGVIEW.
//    
//    I accept suggestions to improve the script.
//    If you encounter any problems I will be happy to share with me.
//  -----------------------------------------------------------------------------
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// SETUP ============================================================================================================
strategy(title = 'Template Trailing Strategy',
         shorttitle = 'TTS',
         overlay = true,
         pyramiding = 0,
         default_qty_type = strategy.percent_of_equity,
         default_qty_value = 100,
         initial_capital = 100000)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// FILTERS ==========================================================================================================

// INPUT ============================================================================================================
usefromDate = input.bool(defval = true, title = 'From', inline = "From Date", group = "Filters")
fromDate = input(defval = timestamp('01 Jan 2021 00:00 UTC'), title = '', inline = "From Date", group = 'Filters')
usetoDate = input.bool(defval = false, title = 'To ', inline = "To Date", group = "Filters")
toDate = input(defval = timestamp('31 Dec 2121 23:59 UTC'), title = '', inline = "To Date", group = 'Filters')

longTradesEnabled = input.bool(defval = true, title = 'Long Trades', inline = 'Trades', group = 'Filters')
shortTradesEnabled = input.bool(defval = true, title = 'Short Trades', tooltip = 'Enable long/short trades.', inline = 'Trades', group = 'Filters')

emaFilterEnabled = input.bool(defval = true, title = 'EMA Filter', tooltip = 'Enable long/short trades based on EMA.', group = 'Filters')
emaResolution = input.timeframe(defval = 'D', title = 'EMA Res/Len/Src', inline = 'EMA Filter', group = 'Filters')
emaLength = input.int(defval = 200, title = '', inline = 'EMA Filter', group = 'Filters')
emaSrc = input.source(defval = close, title = '', tooltip = 'The timeframe, period and source for the EMA calculation.', inline = 'EMA Filter', group = 'Filters')
emaAtrBandEnabled = input.bool(defval = true, title = 'EMA ATR Band', tooltip = 'Enable ATR band for EMA filter.', group = 'Filters')
filterAtrLength = input.int(defval = 5, title = 'EMA ATR Len/Mul', minval = 1, inline = 'EMA ATR', group = 'Filters')
filterAtrMul = input.float(defval = 1.0, title = '', tooltip = 'ATR length and multiplier to be used for the ATR calculation that will be added on top of the EMA filter.', minval = 0.1, step = 0.1, inline = 'EMA ATR', group = 'Filters')

// LOGIC ============================================================================================================
isWithinPeriod() => true

emaLine = request.security(syminfo.tickerid, emaResolution, ta.ema(emaSrc, emaLength))
emaAtr = ta.atr(filterAtrLength)
emaUpperBand = emaLine + filterAtrMul * emaAtr
emaLowerBand = emaLine - filterAtrMul * emaAtr
bool emaLongApproval = emaFilterEnabled ? close > (emaAtrBandEnabled ? emaUpperBand : emaLine) and open > (emaAtrBandEnabled ? emaUpperBand : emaLine) : true
bool emaShortApproval = emaFilterEnabled ? close < (emaAtrBandEnabled ? emaLowerBand : emaLine) and open < (emaAtrBandEnabled ? emaLowerBand : emaLine) : true

bool longFiltersApproval = longTradesEnabled and emaLongApproval and isWithinPeriod()
bool shortFiltersApproval = shortTradesEnabled and emaShortApproval and isWithinPeriod()

// PLOT =============================================================================================================
bgcolor(color = isWithinPeriod() ? color.new(color.gray, 90) : na, title = 'Period')

showEma = input.bool(defval = true, title = 'Show EMA Line', inline = 'EMA Show', group = 'Plot')
showEmaBand = input.bool(defval = false, title = 'Show EMA Band', tooltip = 'Show the EMA Line/Band.', inline = 'EMA Show', group = 'Plot')

emaLineColor = emaLongApproval ? color.teal : emaShortApproval ? color.maroon : color.gray
plot(series = emaFilterEnabled and showEma ? emaLine : na, color = emaLineColor, style = plot.style_line, linewidth = 2, title = 'EMA Line')
emaUpperBandPlot = plot(series = emaUpperBand, color = na, style = plot.style_line, linewidth = 1, title = 'EMA Upper Band')
emaLowerBandPlot = plot(series = emaLowerBand, color = na, style = plot.style_line, linewidth = 1, title = 'EMA Lower Band')
emaBandFillColor = emaFilterEnabled and emaAtrBandEnabled and showEmaBand ? color.new(emaLineColor, 95) : na
fill(plot1 = emaUpperBandPlot, plot2 = emaLowerBandPlot, color = emaBandFillColor, title = 'EMA Band')

// INPUT ============================================================================================================

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// STRATEGY =========================================================================================================

// INPUT ============================================================================================================
fastMALen = input.int(defval = 21, title = 'Fast/Slow SMA Length', inline = 'MA Length', group = 'Strategy')
slowMALen = input.int(defval = 49, title = '', tooltip = 'How many candles back to calculte the fast/slow SMA.', inline = 'MA Length', group = 'Strategy')

// LOGIC ============================================================================================================
fastMA = ta.sma(close, fastMALen)
slowMA = ta.sma(close, slowMALen)

bool openLongPosition = longFiltersApproval and ta.crossover(fastMA, slowMA)
bool openShortPosition = shortFiltersApproval and ta.crossunder(fastMA, slowMA)

bool closeLongPosition = longTradesEnabled and ta.crossunder(fastMA, slowMA)
bool closeShortPosition = shortTradesEnabled and ta.crossover(fastMA, slowMA)

// PLOT =============================================================================================================
var fastColor = color.new(#0056BD, 0)
plot(series = fastMA, title = 'Fast SMA', color = fastColor, linewidth = 1, style = plot.style_line)
var slowColor = color.new(#FF6A00, 0)
plot(series = slowMA, title = 'Slow SMA', color = slowColor, linewidth = 1, style = plot.style_line)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// SHARED VARIABLES =================================================================================================

// INPUT ============================================================================================================
atrLength = input.int(defval = 14, title = 'ATR Length', minval = 1, tooltip = 'How many previous candles to use for the ATR calculation.', group = 'General')

// LOGIC ============================================================================================================
// the open signals when not already into a position
bool validOpenLongPosition = openLongPosition and not (strategy.position_size > 0)
bool validOpenShortPosition = openShortPosition and not (strategy.position_size < 0)
bool validCloseLongPosition = closeLongPosition and strategy.position_size > 0
bool validCloseShortPosition = closeShortPosition and strategy.position_size < 0

// count how far are the last valid open and regular close signals
int barsSinceValidOpenLong = nz(ta.barssince(validOpenLongPosition), 999999)
int barsSinceValidOpenShort = nz(ta.barssince(validOpenShortPosition), 999999)
int barsSinceCloseLong = nz(ta.barssince(closeLongPosition), 999999)
int barsSinceCloseShort = nz(ta.barssince(closeShortPosition), 999999)

// take profit has to communicate its execution with the stop loss logic when 'TP' mode is selected
var bool longTrailingTakeProfitExecuted = false
var bool shortTrailingTakeProfitExecuted = false

// close price when the valid open signal was triggered
float openPrice = ta.valuewhen(validOpenLongPosition or validOpenShortPosition, close, 0)

float openAtr = ta.valuewhen(validOpenLongPosition or validOpenShortPosition, ta.atr(atrLength), 0)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ENTRY ============================================================================================================

// INPUT ============================================================================================================
enableEntryTrailing = input.bool(defval = false, title = 'Enable Trailing', tooltip = 'Enable or disable the trailing for entry position.', group = 'Entry')
devEntryMethod = input.string(defval = 'PERC', title = 'Deviation Method', options = ['PERC', 'ATR'], tooltip = 'The method to calculate the Deviation for the Trailing Entry.', group = 'Entry')
devEntryPerc = input.float(defval = 1.0, title = 'Deviation %', minval = 0.01, maxval = 100, step = 0.05, tooltip = 'The step to follow the price when the open position condition is met.', group = 'Entry') / 100
devEntryAtrMul = input.float(defval = 0.5, title = 'Deviation ATR Mul', minval = 0.01, step = 0.05, tooltip = 'Multiplier to be used on the initial entrys` ATR to calculate the step for following the price, when the entry target is reached.', group = 'Entry')
ctrLongEntrySrc = input.source(defval = high, title = 'Long/Short Entry Control', inline = 'Control', group = 'Entry')
ctrShortEntrySrc = input.source(defval = low, title = '', tooltip = 'The price source to check with the entry target to trigger the entry order for Long/Short position.', inline = 'Control', group = 'Entry')

// LOGIC ============================================================================================================
var bool enterLongPosition = false

int barsSinceEnterLong = nz(ta.barssince(enterLongPosition), 999999)
bool openLongIsActive = barsSinceCloseLong >= barsSinceValidOpenLong
bool enterLongIsPending = barsSinceEnterLong >= barsSinceValidOpenLong
bool tryEnterLongPosition = longFiltersApproval and openLongIsActive and enterLongIsPending

getLongEntryPrice(baseSrc) =>
    switch devEntryMethod
        'PERC' => baseSrc * (1 + devEntryPerc)
        'ATR' => baseSrc + devEntryAtrMul * openAtr
        => na

float longEntryPrice = na
longEntryPrice := if validOpenLongPosition
    getLongEntryPrice(close)
else if tryEnterLongPosition
    math.min(getLongEntryPrice(low), nz(longEntryPrice[1], 999999))
else
    na

enterLongPosition := enableEntryTrailing ? longFiltersApproval and ta.crossover(openLongPosition ? close : ctrLongEntrySrc, longEntryPrice) : openLongPosition
bool validEnterLongPosition = enterLongPosition and not (strategy.position_size > 0)

var bool enterShortPosition = false

int barsSinceEnterShort = nz(ta.barssince(enterShortPosition), 999999)
bool openShortIsActive = barsSinceCloseShort >= barsSinceValidOpenShort
bool enterShortIsPending = barsSinceEnterShort >= barsSinceValidOpenShort
bool tryEnterShortPosition = shortFiltersApproval and openShortIsActive and enterShortIsPending

getShortEntryPrice(baseSrc) =>
    switch devEntryMethod
        'PERC' => baseSrc * (1 - devEntryPerc)
        'ATR' => baseSrc - devEntryAtrMul * openAtr
        => na
        
float shortEntryPrice = na
shortEntryPrice := if validOpenShortPosition
    getShortEntryPrice(close)
else if tryEnterShortPosition
    math.max(getShortEntryPrice(high), nz(shortEntryPrice[1]))
else
    na

enterShortPosition := enableEntryTrailing ? shortFiltersApproval and ta.crossunder(openShortPosition ? close : ctrShortEntrySrc, shortEntryPrice) : openShortPosition
bool validEnterShortPosition = enterShortPosition and not (strategy.position_size < 0)

// PLOT =============================================================================================================
var buyColor = color.new(color.green, 0)
plot(series = enableEntryTrailing ? longEntryPrice : na, title = 'Long Buy Price', color = buyColor, linewidth = 1, style = plot.style_linebr)
plot(series = enableEntryTrailing ? shortEntryPrice : na, title = 'Short Sell Price', color = buyColor, linewidth = 1, style = plot.style_linebr)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// EXIT ============================================================================================================

// INPUT ============================================================================================================
enableExitTrailing = input.bool(defval = false, title = 'Enable Trailing', tooltip = 'Enable or disable the trailing for exit position.', group = 'Exit')
devExitMethod = input.string(defval = 'PERC', title = 'Deviation Method', options = ['PERC', 'ATR'], tooltip = 'The method to calculate the Deviation for the Trailing Exit.', group = 'Exit')
devExitPerc = input.float(defval = 3.0, title = 'Deviation %', minval = 0.01, maxval = 100, step = 0.05, tooltip = 'The step to follow the price when the close position condition is met.', group = 'Exit') / 100
devExitAtrMul = input.float(defval = 0.5, title = 'Deviation ATR Mul', minval = 0.01, step = 0.05, tooltip = 'Multiplier to be used on the initial entrys` ATR to calculate the step for following the price, when the exit target is reached.', group = 'Exit')
ctrLongExitSrc = input.source(defval = low, title = 'Long/Short Exit Control', inline = 'Control', group = 'Exit')
ctrShortExitSrc = input.source(defval = high, title = '', tooltip = 'The price source to check with the entry target to trigger the entry order for Long/Short position.', inline = 'Control', group = 'Exit')

// LOGIC ============================================================================================================
var bool exitLongPosition = false

int barsSinceExitLong = nz(ta.barssince(exitLongPosition), 999999)
bool closeLongIsActive = barsSinceValidOpenLong >= barsSinceCloseLong
bool exitLongIsPending = barsSinceExitLong >= barsSinceCloseLong
bool tryExitLongPosition = isWithinPeriod() and closeLongIsActive and exitLongIsPending

getLongExitPrice(baseSrc) =>
    switch devExitMethod
        'PERC' => baseSrc * (1 - devExitPerc)
        'ATR' => baseSrc - devExitAtrMul * openAtr
        => na

float longExitPrice = na
longExitPrice := if validCloseLongPosition
    getLongExitPrice(close)
else if tryExitLongPosition
    math.max(getLongExitPrice(high), nz(longExitPrice[1], 999999))
else
    na

exitLongPosition := enableExitTrailing ? isWithinPeriod() and ta.crossunder(closeLongPosition ? close : ctrLongExitSrc, longExitPrice) : closeLongPosition

bool longIsActive = enterLongPosition or strategy.position_size > 0 and not exitLongPosition

var bool exitShortPosition = false

int barsSinceExitShort = nz(ta.barssince(exitShortPosition), 999999)
bool closeShortIsActive = barsSinceValidOpenShort >= barsSinceCloseShort
bool exitShortIsPending = barsSinceExitShort >= barsSinceCloseShort
bool tryExitShortPosition = isWithinPeriod() and closeShortIsActive and exitShortIsPending

getShortExitPrice(baseSrc) =>
    switch devExitMethod
        'PERC' => baseSrc * (1 + devExitPerc)
        'ATR' => baseSrc + devExitAtrMul * openAtr
        => na

float shortExitPrice = na
shortExitPrice := if validCloseShortPosition
    getShortExitPrice(close)
else if tryExitShortPosition
    math.min(getShortExitPrice(low), nz(shortExitPrice[1], 999999))
else
    na

exitShortPosition := enableExitTrailing ? isWithinPeriod() and ta.crossunder(closeShortPosition ? close : ctrShortExitSrc, shortExitPrice) : closeShortPosition

bool shortIsActive = enterShortPosition or strategy.position_size < 0 and not exitShortPosition

// PLOT =============================================================================================================
var sellColor = color.new(color.red, 0)
plot(series = enableExitTrailing ? longExitPrice : na, title = 'Long Sell Price', color = sellColor, linewidth = 1, style = plot.style_linebr)
plot(series = enableExitTrailing ? shortExitPrice : na, title = 'Short Sell Price', color = sellColor, linewidth = 1, style = plot.style_linebr)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// STOP LOSS ========================================================================================================

// INPUT ============================================================================================================
stopLossMethod = input.string(defval = 'PERC', title = 'Stop Loss Method', options = ['PERC', 'ATR'], tooltip = 'The method to calculate the Stop Loss (percentagewise, based on initial ATR or based on ATR changing over time).', group = 'Stop Loss - Target')
longTrailingStopLossPerc = input.float(defval = 7.5, title = 'Long/Short Stop Loss %', minval = 0.05, maxval = 100, step = 0.05, inline = 'Trailing Stop Loss Perc', group = 'Stop Loss - Target') / 100
shortTrailingStopLossPerc = input.float(defval = 7.5, title = '', minval = 0.05, maxval = 100, step = 0.05, tooltip = 'The percentage of the price decrease/increase to set the Stop Loss price target for long/short positions.', inline = 'Trailing Stop Loss Perc', group = 'Stop Loss - Target') / 100
longStopLossAtrMul = input.float(defval = 3.0, title = 'ATR Long/Short Mul ', minval = 0.1, step = 0.1, inline = 'Trailing Stop Loss ATR Multiplier', group = 'Stop Loss - Target')
shortStopLossAtrMul = input.float(defval = 3.0, title = '', minval = 0.1, step = 0.1, tooltip = 'ATR multiplier to be used for the long/short Stop Loss.', inline = 'Trailing Stop Loss ATR Multiplier', group = 'Stop Loss - Target')
enableStopLossTrailing = input.string(defval = 'TP', title = 'Enable Trailing', options = ['TP', 'ON', 'OFF'], tooltip = 'Enable the trailing for Stop Loss when Take Profit order is executed (TP) or from the start of the entry order (ON) or not at all (OFF).', group = 'Stop Loss - Trailing')
breakEvenEnabled = input.bool(defval = false, title = 'Break Even', tooltip = 'When Take Profit price target is hit, move the Stop Loss to the entry price (or to a more strict price defined by the Stop Loss %/ATR Multiplier).', group = 'Stop Loss - Trailing')

// LOGIC ============================================================================================================
getLongStopLossPrice(baseSrc) =>
    switch stopLossMethod
        'PERC' => baseSrc * (1 - longTrailingStopLossPerc)
        'ATR' => baseSrc - longStopLossAtrMul * openAtr
        => na

getLongStopLossPerc(baseSrc) =>
    (baseSrc - getLongStopLossPrice(baseSrc)) / baseSrc
    
// trailing starts when the take profit price is reached if 'TP' mode is set or from the very begining if 'ON' mode is selected
bool enableLongTakeProfitTrailing = enableStopLossTrailing == 'ON' or enableStopLossTrailing == 'TP' and longTrailingTakeProfitExecuted

// calculate trailing stop loss price when enter long position and peserve its value until the position closes
float longTrailingStopLossPrice = na
longTrailingStopLossPrice := if longIsActive
    if validEnterLongPosition
        getLongStopLossPrice(openPrice)
    else
        stopPrice = getLongStopLossPrice(enableLongTakeProfitTrailing ? high : openPrice)
        stopPrice := breakEvenEnabled and longTrailingTakeProfitExecuted ? math.max(stopPrice, openPrice) : stopPrice
        math.max(stopPrice, nz(longTrailingStopLossPrice[1]))
else
    na

getShortStopLossPrice(baseSrc) =>
    switch stopLossMethod
        'PERC' => baseSrc * (1 + shortTrailingStopLossPerc)
        'ATR' => baseSrc + shortStopLossAtrMul * openAtr
        => na

getShortStopLossPerc(baseSrc) =>
    (getShortStopLossPrice(baseSrc) - baseSrc) / baseSrc

// trailing starts when the take profit price is reached if 'TP' mode is set or from the very begining if 'ON' mode is selected
bool enableShortTakeProfitTrailing = enableStopLossTrailing == 'ON' or enableStopLossTrailing == 'TP' and shortTrailingTakeProfitExecuted

// calculate trailing stop loss price when enter short position and peserve its value until the position closes
float shortTrailingStopLossPrice = na
shortTrailingStopLossPrice := if shortIsActive
    if validEnterShortPosition
        getShortStopLossPrice(openPrice)
    else
        stopPrice = getShortStopLossPrice(enableShortTakeProfitTrailing ? low : openPrice)
        stopPrice := breakEvenEnabled and shortTrailingTakeProfitExecuted ? math.min(stopPrice, openPrice) : stopPrice
        math.min(stopPrice, nz(shortTrailingStopLossPrice[1], 999999.9))
else
    na

// PLOT =============================================================================================================
var stopLossColor = color.new(#e25141, 0)
plot(series = longTrailingStopLossPrice, title = 'Long Trail Stop', color = stopLossColor, linewidth = 1, style = plot.style_linebr, offset = 1)
plot(series = shortTrailingStopLossPrice, title = 'Short Trail Stop', color = stopLossColor, linewidth = 1, style = plot.style_linebr, offset = 1)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// TAKE PROFIT ======================================================================================================

// INPUT ============================================================================================================
takeProfitMethod = input.string(defval = 'PERC', title = 'Take Profit Method', options = ['PERC', 'ATR', 'RR'], tooltip = 'The method to calculate the Take Profit price.', group = 'Take Profit - Target')
longTakeProfitPerc = input.float(defval = 10.0, title = 'Long/Short Take Profit %', minval = 0.05, step = 0.05, inline = 'Take Profit Perc', group = 'Take Profit - Target') / 100
shortTakeProfitPerc = input.float(defval = 10.0, title = '', minval = 0.05, step = 0.05, tooltip = 'The percentage of the price increase/decrease to set the take profit price target for long/short positions.', inline = 'Take Profit Perc', group = 'Take Profit - Target') / 100
longTakeProfitAtrMul = input.float(defval = 9.0, title = 'ATR Long/Short Mul ', minval = 0.1, step = 0.1, inline = 'Take Profit ATR Multiplier', group = 'Take Profit - Target')
shortTakeProfitAtrMul = input.float(defval = 9.0, title = '', minval = 0.1, step = 0.1, tooltip = 'ATR multiplier to be used for the long/short Take Profit.', inline = 'Take Profit ATR Multiplier', group = 'Take Profit - Target')
longRiskRewardRatio = input.float(defval = 1.5, title = 'Long/Short RR Ratio ', minval = 0.1, step = 0.1, inline = 'Risk Reward Ratio', group = 'Take Profit - Target')
shortRiskRewardRatio = input.float(defval = 1.5, title = '', minval = 0.1, step = 0.1, tooltip = 'The Risk/Reward Ratio to be used for the long/short Take Profit based on the Stop Loss Price.', inline = 'Risk Reward Ratio', group = 'Take Profit - Target')

enableTakeProfitTrailing = input.bool(defval = true, title = 'Enable Trailing', tooltip = 'Enable or disable the trailing for take profit.', group = 'Take Profit - Trailing')
devTakeProfitMethod = input.string(defval = 'PERC', title = 'Deviation Method', options = ['PERC', 'ATR'], tooltip = 'The method to calculate the Deviation for the Trailing Take Profit.', group = 'Take Profit - Trailing')
devTakeProfitPerc = input.float(defval = 1.0, title = 'Deviation %', minval = 0.01, maxval = 100, step = 0.05, tooltip = 'The percentage wise step to be used for following the price, when the take profit target is reached.', group = 'Take Profit - Trailing') / 100
devTakeProfitAtrMul = input.float(defval = 1.0, title = 'Deviation ATR Mul', minval = 0.01, step = 0.05, tooltip = 'Multiplier to be used on the initial entrys` ATR to calculate the step for following the price, when the take profit target is reached.', group = 'Take Profit - Trailing')

// LOGIC ============================================================================================================
getLongTakeProfitPrice(baseSrc) =>
    switch takeProfitMethod
        'PERC' => baseSrc * (1 + longTakeProfitPerc)
        'ATR' => baseSrc + longTakeProfitAtrMul * openAtr
        'RR' => baseSrc + longRiskRewardRatio * (baseSrc - getLongStopLossPrice(baseSrc))
        => na

getLongTakeProfitPerc(baseSrc) =>
    (baseSrc - getLongTakeProfitPrice(baseSrc)) / baseSrc

// calculate take profit price when enter long position and peserve its value until the position closes
float longTakeProfitPrice = na
longTakeProfitPrice := if longIsActive and not longTrailingTakeProfitExecuted
    if validEnterLongPosition
        getLongTakeProfitPrice(openPrice)
    else
        nz(longTakeProfitPrice[1], getLongTakeProfitPrice(close))
else
    na

longTrailingTakeProfitExecuted := strategy.position_size > 0 and (longTrailingTakeProfitExecuted[1] or strategy.position_size < strategy.position_size[1] or strategy.position_size[1] == 0 and high >= longTakeProfitPrice)

longTrailingTakeProfitStepTicks = switch devTakeProfitMethod
    'PERC' => longTakeProfitPrice * devTakeProfitPerc / syminfo.mintick
    'ATR' => devTakeProfitAtrMul * openAtr / syminfo.mintick
    => na

getShortTakeProfitPrice(baseSrc) =>
    switch takeProfitMethod
        'PERC' => baseSrc * (1 - shortTakeProfitPerc)
        'ATR' => baseSrc - shortTakeProfitAtrMul * openAtr
        'RR' => baseSrc - shortRiskRewardRatio * (getShortStopLossPrice(baseSrc) - baseSrc)
        => na

getShortTakeProfitPerc(baseSrc) =>
    (getShortTakeProfitPrice(baseSrc) - baseSrc) / baseSrc

// calculate take profit price when enter short position and peserve its value until the position closes
float shortTakeProfitPrice = na
shortTakeProfitPrice := if shortIsActive and not shortTrailingTakeProfitExecuted
    if validEnterShortPosition
        getShortTakeProfitPrice(openPrice)
    else
        nz(shortTakeProfitPrice[1], getShortTakeProfitPrice(close))
else
    na

shortTrailingTakeProfitExecuted := strategy.position_size < 0 and (shortTrailingTakeProfitExecuted[1] or strategy.position_size > strategy.position_size[1] or strategy.position_size[1] == 0 and low <= shortTakeProfitPrice)

shortTrailingTakeProfitStepTicks = switch devTakeProfitMethod
    'PERC' => shortTakeProfitPrice * devTakeProfitPerc / syminfo.mintick
    'ATR' => devTakeProfitAtrMul * openAtr / syminfo.mintick
    => na

// PLOT =============================================================================================================
var takeProfitColor = color.new(#419388, 0) 
plot(series = longTakeProfitPrice, title = 'Long Take Profit', color = takeProfitColor, linewidth = 1, style = plot.style_linebr, offset = 1)
plot(series = shortTakeProfitPrice, title = 'Short Take Profit', color = takeProfitColor, linewidth = 1, style = plot.style_linebr, offset = 1)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// QUANTITY MANAGEMENT ==============================================================================================

// INPUT ============================================================================================================
takeProfitQuantityPerc = input.float(defval = 50, title = 'Take Profit Quantity %', minval = 0.0, maxval = 100, step = 1.0, tooltip = 'The percentage of the position that will be withdrawn when the take profit price target is reached.', group = 'Quantity/Risk Management')

riskPerc = input.float(defval = 2, title = 'Capital at Risk %', minval = 1, tooltip = 'The maximum percentage of the equity to risk in every trade when no leverage is used.', group = "Quantity/Risk Management") / 100
minTrade = input.int(defval = 10, title = 'Minimum Trade Price', minval = 1, tooltip = 'The minimum trade price in Quote currency that is allowed in the exchange for a valid new position.', group = "Quantity/Risk Management")
longLeverage = input.int(defval = 1, title = 'Leverage Long/Short ', minval = 1, inline = 'Leverage', group = "Quantity/Risk Management")
shortLeverage = input.int(defval = 1, title = '', minval = 1, tooltip = 'Leverage factor used to multiply the initial risk quantity of each trade (by borrowing the remaining amount). Thus, the profits and losses are multiplied respectivelly.', inline = 'Leverage', group = "Quantity/Risk Management")

// LOGIC ============================================================================================================
var int quoteDecimalDigits = math.max(math.ceil(-1 * math.log10(syminfo.mintick * syminfo.pointvalue)), 0)

floor(number, precision) =>
    fact = math.pow(10,  precision)
    num = number * fact
    math.floor(num) / fact

ceil(number, precision) =>
    fact = math.pow(10,  precision)
    num = number * fact
    math.ceil(num) / fact
    
clamp(number, lower, highest, precision) =>
    ceil(math.max(floor(math.min(number, highest), precision), lower), precision)

getLongRiskQuoteQuantity() =>
    clamp(strategy.equity * riskPerc * longLeverage / getLongStopLossPerc(close), minTrade, strategy.equity * longLeverage, quoteDecimalDigits)
    
getLongRiskQuoteQuantityPerc() =>
    getLongRiskQuoteQuantity() / strategy.equity

getLongRiskBaseQuantity() =>
    getLongRiskQuoteQuantity() / close

float longEntryBaseQuantity = na
longEntryBaseQuantity := if longIsActive
    if validOpenLongPosition
        getLongRiskBaseQuantity()
    else
        nz(longEntryBaseQuantity[1], getLongRiskBaseQuantity())
else
    na

getShortRiskQuoteQuantity() =>
    clamp(strategy.equity * riskPerc * shortLeverage / getShortStopLossPerc(close), minTrade, strategy.equity * shortLeverage, quoteDecimalDigits)
    
getShortRiskQuoteQuantityPerc() =>
    getShortRiskQuoteQuantity() / strategy.equity

getShortRiskBaseQuantity() =>
    getShortRiskQuoteQuantity() / close

float shortEntryBaseQuantity = na
shortEntryBaseQuantity := if shortIsActive
    if validOpenShortPosition
        getShortRiskBaseQuantity()
    else
        nz(shortEntryBaseQuantity[1], getShortRiskBaseQuantity())
else
    na

// PLOT =============================================================================================================
label.new(x = validOpenLongPosition ? bar_index : na, y = na, text = 'Buy\n' + str.tostring(100 * getLongRiskQuoteQuantityPerc(), '#.##') + '%', yloc = yloc.belowbar, color = buyColor, style = label.style_label_up, textcolor = color.new(color.white, 0))
label.new(x = validOpenShortPosition ? bar_index : na, y = na, text = 'Sell\n' + str.tostring(100 * getShortRiskQuoteQuantityPerc(), '#.##') + '%', yloc = yloc.abovebar, color = sellColor, style = label.style_label_down, textcolor = color.new(color.white, 0))
label.new(x = validCloseShortPosition ? bar_index : na, y = na, text = 'Buy', yloc = yloc.belowbar, color = buyColor, style = label.style_label_up, textcolor = color.new(color.white, 0))
label.new(x = validCloseLongPosition ? bar_index : na, y = na, text = 'Sell', yloc = yloc.abovebar, color = sellColor, style = label.style_label_down, textcolor = color.new(color.white, 0))

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ALERT MESSAGES ===================================================================================================

// INPUT ============================================================================================================
msgOpenLong = input.string(defval = 'Long: Started', title = 'Open Long/Short', inline = 'Open Message', group = 'Alert Messages')
msgOpenShort = input.string(defval = 'Short: Started', title = '', tooltip = 'Alert messages emited when open long/short position.', inline = 'Open Message', group = 'Alert Messages')
msgCloseLong = input.string(defval = 'Long: Closed at market price', title = 'Close Long/Short', inline = 'Close Message', group = 'Alert Messages')
msgCloseShort = input.string(defval = 'Short: Closed at market price', title = '', tooltip = 'Alert messages emited when close long/short position.', inline = 'Close Message', group = 'Alert Messages')
msgTPSLLong = input.string(defval = 'Long: Take Profit or Stop Loss executed', title = 'TP/SL Long/Short', inline = 'TP/SL Message', group = 'Alert Messages')
msgTPSLShort = input.string(defval = 'Short: Take Profit or Stop Loss executed', title = '', tooltip = 'Alert message emited when the first quantity target (take profit or stop loss) for long/short position is hit.', inline = 'TP/SL Message', group = 'Alert Messages')
msgSLLong = input.string(defval = 'Long: Stop Loss executed', title = 'SL Long/Short ', inline = 'SL Message', group = 'Alert Messages')
msgSLShort = input.string(defval = 'Short: Stop Loss executed', title = '', tooltip = 'Alert message emited when the second quantity stop loss target for long/short position is hit.', inline = 'SL Message', group = 'Alert Messages')
msgMaxDrawdown= input.string(defval = 'Death is the new beginning', title = 'Max Drawdown', tooltip = 'Alert message emited when the max drawdown limit is hit.', group = 'Alert Messages')

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// POSITION ORDERS ==================================================================================================

// INPUT ============================================================================================================
maxDrawdown = input.int(defval = 25, title = 'Max Drawdown %', minval = 1, maxval = 100, tooltip = 'The maximum drawdown to stop trading.', group = "Quantity/Risk Management")

highlighting = input.bool(defval = false, title = 'Show Position Highlighter', tooltip = 'Highlight winning/lossing position.', group = 'Plot')

// LOGIC ============================================================================================================
// close on trend reversal
strategy.close(id = 'Long Entry', when = exitLongPosition, comment = 'Close Long', alert_message = msgCloseLong)

// close on trend reversal
strategy.close(id = 'Short Entry', when = exitShortPosition, comment = 'Close Short', alert_message = msgCloseShort)

// getting into LONG position
strategy.entry(id = 'Long Entry', direction = strategy.long, qty = longEntryBaseQuantity, when = enterLongPosition, alert_message = msgOpenLong)
// submit exit order for trailing take profit price also set the stop loss for the take profit percentage in case that stop loss it reached first
strategy.exit(id = 'Long Take Profit / Stop Loss', from_entry = 'Long Entry', qty_percent = takeProfitQuantityPerc, limit = enableTakeProfitTrailing ? na : longTakeProfitPrice, stop = longTrailingStopLossPrice, trail_price = enableTakeProfitTrailing ? longTakeProfitPrice : na, trail_offset = enableTakeProfitTrailing ? longTrailingTakeProfitStepTicks : na, when = longIsActive, alert_message = msgTPSLLong)
// submit exit order for trailing stop loss price for the remaining percent of the quantity not reserved by the take profit order
strategy.exit(id = 'Long Stop Loss', from_entry = 'Long Entry', stop = longTrailingStopLossPrice, when = longIsActive, alert_message = msgSLLong)

// getting into SHORT position
strategy.entry(id = 'Short Entry', direction = strategy.short, qty = shortEntryBaseQuantity, when = enterShortPosition, alert_message = msgOpenShort)
// submit exit order for trailing take profit price also set the stop loss for the take profit percentage in case that stop loss it reached first
strategy.exit(id = 'Short Take Profit / Stop Loss', from_entry = 'Short Entry', qty_percent = takeProfitQuantityPerc, limit = enableTakeProfitTrailing ? na : shortTakeProfitPrice, stop = shortTrailingStopLossPrice, trail_price = enableTakeProfitTrailing ? shortTakeProfitPrice : na, trail_offset = enableTakeProfitTrailing ? shortTrailingTakeProfitStepTicks : na, when = shortIsActive, alert_message = msgTPSLShort)
// submit exit order for trailing stop loss price for the remaining percent of the quantity not reserved by the take profit order
strategy.exit(id = 'Short Stop Loss', from_entry = 'Short Entry', stop = shortTrailingStopLossPrice, when = shortIsActive, alert_message = msgSLShort)

// limit the maximum drawdown
// strategy.risk.max_drawdown(value = maxDrawdown, type = strategy.percent_of_equity, alert_message = msgMaxDrawdown)

// PLOT =============================================================================================================
lowHighPrice = high > strategy.position_avg_price and low < strategy.position_avg_price ? longIsActive ? high : shortIsActive ? low : na
             : high > strategy.position_avg_price ? high
             : low < strategy.position_avg_price ? low
             : na

pricePlot = plot(series = lowHighPrice, title = 'Price', color = na, linewidth = 1, style = plot.style_linebr)
var posColor = color.new(color.white, 0)
posPlot = plot(series = strategy.position_avg_price, title = 'Position', color = posColor, linewidth = 1, style = plot.style_linebr)

highlightColor = lowHighPrice > strategy.position_avg_price and longIsActive or lowHighPrice < strategy.position_avg_price and shortIsActive ? takeProfitColor
               : lowHighPrice < strategy.position_avg_price and longIsActive or lowHighPrice > strategy.position_avg_price and shortIsActive ? stopLossColor
               : na

fill(plot1 = posPlot, plot2 = pricePlot, color = highlighting ? color.new(highlightColor, 90) : na, title = 'Highlight trades')

// ==================================================================================================================
```

> Detail

https://www.fmz.com/strategy/430992

> Last Modified

2023-11-03 15:57:11
