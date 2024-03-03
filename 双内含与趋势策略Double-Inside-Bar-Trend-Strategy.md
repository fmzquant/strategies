
> Name

双内含与趋势策略Double-Inside-Bar-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/136fcb3466b5c1d5812.png)
 [trans]
### 概述

双内含与趋势策略是一个利用双内含形态与移动平均线判断趋势的量化交易策略。该策略结合双内含形态提供较高概率的交易信号,同时利用移动平均线判断市场趋势,在趋势方向做多做空。

### 策略原理

1. 计算 Hull 移动平均线作为判断趋势的指标。
2. 当出现二次内含形态时,认为这是一个较高概率的交易信号。内含形态是前两根K线的最高价、最低价都被第三根K线包含的形态。
3. 如果收盘价在移动平均线之上且形成多头内含,则在内含形态高点附近设立买入停止单;如果收盘价在移动平均线之下且形成空头内含,则在内含形态低点附近设立卖出停止单。
4. 一旦停止单被触发成交后,根据预设的止损幅度和止盈比例设置止损和止盈单。

### 优势分析

1. 内含形态提供较高概率的反转信号。双内含形态的出现,可能预示着短期内的价格反转。
2. 与移动平均线结合使用,能在大趋势方向操作,提高获利概率。
3. 采用趋势期间突破点附近的停止单建仓,可获得较好的入场时机。

### 风险分析

1. 在震荡行情中,内含形态提供的交易信号可能会频繁出现亏损的情况。
2. 移动平均线作为判断趋势的指标也可能发出错误信号,导致逆势交易亏损。
3. 停损点的设置过小,可能会被价格小幅滑点触发止损。

### 优化方向

1. 可以测试不同参数的移动平均线作为判断趋势的指标。
2. 可以结合其他指标过滤震荡行情,避免在没有明确趋势时盲目交易。 
3. 可以通过大数据分析获取更优的参数组合,如移动平均线周期、止损倍数、止盈比例等。
4. 可以加入交易时间和品种的过滤条件来适配不同时间周期和不同品种的特点。

### 总结

双内含与趋势策略利用双内含形态提供较高概率的交易信号,同时辅助移动平均线判断大趋势的方向,在趋势方向做多做空,是一种较为稳定的突破类策略。通过参数优化和规则优化,可以使该策略对市场的适应性更好,获利概率更高。

||

## Double Inside Bar & Trend Strategy

### Overview 

The Double Inside Bar & Trend strategy is a quantitative trading strategy that utilizes double inside bar patterns combined with moving average to determine the trend. It provides high probability trading signals with double inside bars, and goes long or short according to the trend judged by the moving average line.

### Strategy Logic

1. Use Hull Moving Average (HMA) as an indicator for trend judgement. 
2. When a double inside bar pattern occurs, it is considered a high probability trading signal. An inside bar is a pattern where the high and low of the last bar is encompassed by the prior bar.  
3. If close price is above MA and a bullish inside bar forms, place a buy stop order around the high of the inside bar. If close is below MA and a bearish inside bar forms, place a sell stop order around the low of the inside bar.
4. Once the stop order is triggered, set stop loss and take profit based on predefined stop loss percentage and take profit ratio.

### Advantage Analysis  

1. Inside bars provide high probability reversal signals. The occurrence of double inside bars may indicate a short-term price reversal.
2. Used with moving averages to follow the major trend direction, it improves the probability of profit.
3. Using stop orders around breakthrough points in the trend enjoys good entry opportunities.

### Risk Analysis

1. In ranging markets, trading signals from inside bars may frequently lead to losses.  
2. The moving average as a trend indicator may also give false signals, resulting in losses from countertrend trading.
3. If the stop loss is set too tight, it may be triggered by small price slips.

### Optimization Directions

1. Test different parameters of moving averages as the trend judging indicator.
2. Combine other indicators to filter ranging markets, avoiding blind trading without a clear trend.
3. Obtain more optimal parameter combinations through big data analysis, such as moving average period, stop loss multiplier, take profit ratio etc.  
4. Add filters on trading sessions and products to adapt to different timeframes and product characteristics.  

### Summary

The Double Inside Bar & Trend strategy utilizes the high probability trading signals from double inside bars, aided by moving averages to determine the major trend direction to go long or short, making it a relatively stable breakout strategy. Through parameter optimization and logic optimization, the adaptability and profitability of this strategy can be improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|(?Entry Seettings)MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|MA Type: HMA|EMA|SMA|SWMA|VWMA|WMA|
|v_input_int_1|45|HMA Length|
|v_input_string_2|0|(?Trade Seettings)Stop Loss Type: ATR|FIX|
|v_input_int_2|50|   ATR: Length                 |
|v_input_float_1|2.5|Factor       |
|v_input_float_2|2|            TP Ration|
|v_input_float_3|10|   FIX: Stop Loss             |
|v_input_float_4|20|Take Profit|
|v_input_bool_1|true|10useRiskMagmt|
|v_input_float_5|true|Risk in %                |
|v_input_bool_2|false|(?Filter Setings)Filter trades by dates|
|v_input_1|timestamp(2022-01-01T00:00:00+0000)|       Start Date & Time|
|v_input_2|timestamp(2099-12-31T23:59:00+0000)|       End Date & Time  |
|v_input_bool_3|false|Filter trades by session|
|v_input_3|0045-2245|       Session|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Kaspricci

//@version=5
strategy(
     title = "Double Inside Bar & Trend Strategy - Kaspricci", 
     shorttitle = "Double Inside Bar & Trend", 
     overlay=true, 
     initial_capital = 100000, 
     currency = currency.USD, 
     default_qty_type = strategy.percent_of_equity, 
     default_qty_value = 100, 
     calc_on_every_tick = true, 
     close_entries_rule = "ANY")

// ================================================ Entry Inputs ======================================================================
headlineEntry   = "Entry Seettings"

maSource        = input.source(defval = close,             group = headlineEntry, title = "MA Source")
maType          = input.string(defval = "HMA",             group = headlineEntry, title = "MA Type", options = ["EMA", "HMA", "SMA", "SWMA", "VWMA", "WMA"])
maLength        = input.int(   defval = 45,    minval = 1, group = headlineEntry, title = "HMA Length")

float ma = switch maType 
    "EMA"  => ta.ema(maSource,  maLength)
    "HMA"  => ta.hma(maSource,  maLength)
    "SMA"  => ta.sma(maSource,  maLength)
    "SWMA" => ta.swma(maSource)
    "VWMA" => ta.vwma(maSource, maLength)
    "WMA"  => ta.wma(maSource,  maLength)

plot(ma, "Trend MA", color.purple)

// ================================================ Trade Inputs ======================================================================
headlineTrade   = "Trade Seettings"

stopLossType    = input.string(defval = "ATR",                         group = headlineTrade,                 title = "Stop Loss Type",            options = ["ATR", "FIX"])
atrLength       = input.int(   defval = 50,   minval = 1,              group = headlineTrade, inline = "ATR", title = "   ATR: Length                 ")
atrFactor       = input.float( defval =  2.5, minval = 0, step = 0.05, group = headlineTrade, inline = "ATR", title = "Factor       ",             tooltip = "multiplier for ATR value")
takeProfitRatio = input.float( defval =  2.0, minval = 0, step = 0.05, group = headlineTrade,                 title = "            TP Ration",     tooltip = "Multiplier for Take Profit calculation")
fixStopLoss     = input.float( defval = 10.0, minval = 0, step = 0.5,  group = headlineTrade, inline = "FIX", title = "   FIX: Stop Loss             ") * 10 // need this in ticks
fixTakeProfit   = input.float( defval = 20.0, minval = 0, step = 0.5,  group = headlineTrade, inline = "FIX", title = "Take Profit",               tooltip = "in pips") * 10 // need this in ticks
useRiskMagmt    = input.bool(  defval = true,                          group = headlineTrade, inline = "RM",  title = "")
riskPercent     = input.float( defval = 1.0,  minval = 0., step = 0.5, group = headlineTrade, inline = "RM",  title = "Risk in %                ", tooltip = "This will overwrite quantity from startegy settings and calculate the trade size based on stop loss and risk percent") / 100

// ================================================ Filter Inputs =====================================================================
headlineFilter  = "Filter Setings"

// date filter
filterDates     = input.bool(defval = false,                                 group = headlineFilter, title = "Filter trades by dates")
startDateTime   = input(defval = timestamp("2022-01-01T00:00:00+0000"), group = headlineFilter, title = "       Start Date & Time")
endDateTime     = input(defval = timestamp("2099-12-31T23:59:00+0000"), group = headlineFilter, title = "       End Date & Time  ")

dateFilter      = not filterDates or (time >= startDateTime and time <= endDateTime)

// session filter
filterSession   = input.bool(title = "Filter trades by session", defval = false, group = headlineFilter)
session         = input(title = "       Session", defval = "0045-2245", group = headlineFilter)

sessionFilter   = not filterSession or time(timeframe.period, session, timezone = "CET")

// ================================================ Trade Entries and Exits =====================================================================

// calculate stop loss
stopLoss        = switch stopLossType
    "ATR" => nz(math.round(ta.atr(atrLength) * atrFactor / syminfo.mintick, 0), 0)
    "FIX" => fixStopLoss

// calculate take profit
takeProfit      = switch stopLossType
    "ATR" => math.round(stopLoss * takeProfitRatio, 0)
    "FIX" => fixTakeProfit


doubleInsideBar = high[2] > high[1] and high[2] > high[0] and low[2] < low[1] and low[2] < low[0]

// highlight mother candel and inside bar candles
bgcolor(doubleInsideBar ? color.rgb(33, 149, 243, 80) : na)
bgcolor(doubleInsideBar ? color.rgb(33, 149, 243, 80) : na, offset = -1)
bgcolor(doubleInsideBar ? color.rgb(33, 149, 243, 80) : na, offset = -2)

var float buyStopPrice  = na
var float sellStopPrice = na

if (strategy.opentrades == 0 and doubleInsideBar and barstate.isconfirmed)
    buyStopPrice  := high[0] // high of recent candle (second inside bar)
    sellStopPrice := low[0] // low of recent candle (second inside bar)

    tradeID = str.tostring(strategy.closedtrades + strategy.opentrades + 1)

    quantity = useRiskMagmt ? math.round(strategy.equity * riskPercent / stopLoss, 2) / syminfo.mintick : na

    commentTemplate = "{0} QTY: {1,number,#.##} SL: {2} TP: {3}"

    if (close > ma)
        longComment = str.format(commentTemplate, tradeID + "L", quantity, stopLoss / 10, takeProfit / 10)
        strategy.entry(tradeID + "L", strategy.long, qty = quantity, stop = buyStopPrice, comment = longComment)
        strategy.exit(tradeID + "SL", tradeID + "L", profit = takeProfit, loss = stopLoss, comment_loss = "SL", comment_profit = "TP")

    if (close < ma)
        shortComment = str.format(commentTemplate, tradeID + "S", quantity, stopLoss / 10, takeProfit / 10)
        strategy.entry(tradeID + "S", strategy.short, qty = quantity, stop = sellStopPrice, comment = shortComment)
        strategy.exit(tradeID + "SL", tradeID + "S", profit = takeProfit, loss = stopLoss, comment_loss = "SL", comment_profit = "TP")

// as soon as the first pending order has been entered the remaing pending order shall be cancelled 
if strategy.opentrades > 0
    currentTradeID = str.tostring(strategy.closedtrades + strategy.opentrades)
    strategy.cancel(currentTradeID + "S")
    strategy.cancel(currentTradeID + "L")

```

> Detail

https://www.fmz.com/strategy/440425

> Last Modified

2024-01-30 15:11:48
