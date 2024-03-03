
> Name

多重指标融合交易策略Multiple-Indicator-Fusion-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过整合多重技术指标进行价格交易。结合使用Super Signals线、MACD指标和Laguerre RSI指标,在多个指标同时发出信号时才入场,同时设置止损和止盈点来控制风险收益比。

## 策略原理

Super Signals线包含基线、上下通道构成的交易区间带。MACD指标判断多空趋势。Laguerre RSI判断超买超卖。只有当价格突破Super Signals通道、MACD给出对应信号、RSI也确认时,才产生交易信号。入场后设置止损止盈,止损基于ATR或百分比,止盈为止损的一定倍数。

## 优势分析

- 多重指标验证,确保信号可靠性
- Super Signals线判断关键 Support/Resistance 
- MACD判断主要趋势方向
- RSI过滤假突破,避免被套
- 止损止盈机制控制交易风险

## 风险分析

- 各指标参数设置需要反复测试优化
- 多重条件限制了交易频次
- 持仓时间无法完美优化
- 无法准确判断趋势反转点

通过调整参数组合、持仓时间、止盈止损条件等可以降低风险。

## 优化方向

- 测试不同参数组合,平衡交易频次和效果
- 考虑其他止损止盈方式,如移动止损
- 测试不同出场指标,辅助判断趋势反转
- 在多市场多品种中测试策略健壮性

## 总结

该策略利用多指标确认信号,回测表现良好。通过进一步调优参数,严格控制风险,可以成为稳定可靠的量化交易系统。

||

## Overview 

This strategy combines multiple technical indicators for price trading. It uses Super Signals, MACD and Laguerre RSI together, only entering trades when all indicators align. Stop loss and take profit points are set to control risk/reward.

## Strategy Logic

Super Signals consist of baseline, upper and lower channels forming a trading range band. MACD determines bull/bear trend. Laguerre RSI identifies overbought/oversold levels. Trading signals are only generated when price breaks Super Signals channel, MACD signals align and RSI confirms. After entry, stop loss and take profit are set based on ATR/percentage and a multiple of stop loss. 

## Advantages

- Multiple indicator validation ensures reliable signals
- Super Signals identify key Support/Resistance  
- MACD determines primary trend direction
- RSI filters false breakouts avoiding traps
- Stop loss/take profit manages trade risk

## Risks

- Extensive testing required to optimize indicator parameters
- Multiple conditions limit trade frequency
- Holding period cannot be perfectly optimized 
- Exact reversal points cannot be accurately determined

Risks can be reduced by adjusting parameters, holding periods, profit/loss conditions etc.

## Enhancements

- Test parameter combinations to balance frequency and performance
- Consider other stop loss/profit approaches like trailing stops
- Test additional exit indicators to identify trend reversal
- Assess robustness across markets and products

## Conclusion

This multiple indicator confirmation strategy shows good backtest results. Further tuning parameters and tightly controlling risks can make it a stable and reliable trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(20 Jan 1990 00:00 +0900)|(?Time)Start Date|
|v_input_2|timestamp(20 Dec 2030 00:00 +0900)|End Date|
|v_input_bool_1|true|(?Long / Short)Long?|
|v_input_bool_2|true|Short?|
|v_input_bool_3|false|(?Filters)ATR Filter On?|
|v_input_int_1|14|Length for ATR Filter|
|v_input_int_2|40|SMA Length for ATR SMA|
|v_input_bool_4|true|(?1: SSL Hybrid)use true range for Keltner Channel?|
|v_input_string_1|0|Baseline Type: EMA|SMA|DEMA|TEMA|LSMA|WMA|VAMA|TMA|HMA|McGinley|
|v_input_int_3|30|Baseline Length|
|v_input_float_1|0.2|Base Channel Multiplier|
|v_input_int_4|10|Volatility lookback length(for VAMA)|
|v_input_int_5|12|(?2: 4 Color MACD)MACD fast MA|
|v_input_int_6|26|MACD slow MA|
|v_input_int_7|9|MACD signal Length|
|v_input_3_close|0|(?3: Laguerre RSI)Laguerre RSI source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_2|0.2|Alpha|
|v_input_int_8|80|Overbought Level?|
|v_input_int_9|20|Overbought Level?|
|v_input_bool_5|true|(?Strategy: Drawings)Color Bars|
|v_input_bool_10|false|Show Simple Label for Entry?|
|v_input_bool_11|true|Show Trade Exit Labels|
|v_input_bool_12|false|Show Dashboard|
|v_input_bool_6|true|(?Stop Loss)Enable SL & TP?|
|v_input_bool_7|false|Enable Trailing SL?|
|v_input_string_2|0|Stop Loss Type: ATR|Percent|Previous LL / HH|
|v_input_int_10|14|ATR Length|
|v_input_float_3|3|ATR Multiplier|
|v_input_float_4|3|Percent|
|v_input_int_11|30|Lowest / Highest Price Before Entry|
|v_input_bool_8|true|(?Take Profit)Use Take Profit?|
|v_input_float_5|1.8|R:R Ratio|
|v_input_float_6|50|Take Profit Quantity %|
|v_input_bool_9|true|(?Quantity)Use Risk Manangement?|
|v_input_float_7|3|Risk Per Trade (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-17 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © DuDu95
// Thanks to myncrypto, jason5480, kevinmck100
// @version=5
// strategy(title          = '[DuDu95] SSL 4C MACD Laugerre RSI Strategy',
//       shorttitle        = '[D] SMR Strategy',
//       overlay           = true,
//       pyramiding        = 0,
//       currency          = currency.USD,
//       default_qty_type  = strategy.percent_of_equity,
//       default_qty_value = 100,
//       commission_value  = 0.1,
//       initial_capital   = 50000,
//       max_bars_back     = 500,
//       max_lines_count   = 150,
//       max_labels_count  = 300)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Time, Direction, Etc - Basic Settings Inputs
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// 1. Time: Based on UTC +09:00
i_start                 = input (defval = timestamp("20 Jan 1990 00:00 +0900"), title = "Start Date", tooltip = "Choose Backtest Start Date", inline = "Start Date", group = "Time" ) 
i_end                   = input (defval = timestamp("20 Dec 2030 00:00 +0900"), title = "End Date", tooltip = "Choose Backtest End Date", inline = "End Date", group = "Time" ) 
inTime                  = true

// 2. Inputs for direction: Long? Short? Both? 
i_longEnabled           = input.bool (defval = true , title = "Long?", tooltip = "Enable Long Position Trade?", inline = "Long / Short", group = "Long / Short" )
i_shortEnabled          = input.bool (defval = true , title = "Short?", tooltip = "Enable Short Position Trade?", inline = "Long / Short", group = "Long / Short" )

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Filter - Inputs, Indicaotrs
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// 3. Use Filters? What Filters?
i_ATRFilterOn           = input.bool (defval = false , title = "ATR Filter On?", tooltip = "ATR Filter On? Order will not be made unless filter condition is fulfilled", inline = "1", group =  "Filters") 
i_ATRFilterLen          = input.int  (defval = 14 ,    title = "Length for ATR Filter", minval = 1 , maxval = 100 , step = 1 , tooltip = "", inline = "2", group = "Filters") 
i_ATRSMALen             = input.int  (defval = 40 ,    title = "SMA Length for ATR SMA", minval = 1 , maxval = 100000 , step = 1 , tooltip = "ATR should be bigger than this", inline = "2", group = "Filters") 

bool i_ATRFilter        = ta.atr(i_ATRFilterLen) >= ta.sma(ta.atr(length = i_ATRFilterLen), i_ATRSMALen) ? true : false
bool filterFulfilled    = not i_ATRFilterOn or i_ATRFilter

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Strategy Logic (Entry & Exit Condition) - Inputs, Indicators for Strategy
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Inputs for Strategy Indicators
//// 1. SSL Hybrid Baseline
i_useTrueRange           = input.bool   (defval = true, title = "use true range for Keltner Channel?", tooltip = "", inline = "1", group = "1: SSL Hybrid") 
i_maType                 = input.string (defval ='EMA', title='Baseline Type', options=['SMA', 'EMA', 'DEMA', 'TEMA', 'LSMA', 'WMA', 'VAMA', 'TMA', 'HMA', 'McGinley'], inline="2", group = "1: SSL Hybrid")
i_len                    = input.int    (defval =30,    title='Baseline Length', inline="2", group = "1: SSL Hybrid")
i_multy                  = input.float  (defval = 0.2,  title='Base Channel Multiplier', minval = 0, maxval = 100,  step=0.05, inline="3", group = "1: SSL Hybrid")
i_volatility_lookback    = input.int    (defval =10,    title='Volatility lookback length(for VAMA)', inline='4',group="1: SSL Hybrid")

tema(src, len) =>
    ema1 = ta.ema(src, len)
    ema2 = ta.ema(ema1, len)
    ema3 = ta.ema(ema2, len)
    3 * ema1 - 3 * ema2 + ema3

f_ma(type, src, len) =>
    float result = 0
    if type == 'TMA'
        result := ta.sma(ta.sma(src, math.ceil(len / 2)), math.floor(len / 2) + 1)
        result
    if type == 'LSMA'
        result := ta.linreg(src, len, 0)
        result
    if type == 'SMA'  // Simple
        result := ta.sma(src, len)
        result
    if type == 'EMA'  // Exponential
        result := ta.ema(src, len)
        result
    if type == 'DEMA'  // Double Exponential
        e = ta.ema(src, len)
        result := 2 * e - ta.ema(e, len)
        result
    if type == 'TEMA'  // Triple Exponential
        e = ta.ema(src, len)
        result := 3 * (e - ta.ema(e, len)) + ta.ema(ta.ema(e, len), len)
        result
    if type == 'WMA'  // Weighted
        result := ta.wma(src, len)
        result
    if type == 'VAMA'  // Volatility Adjusted
        /// Copyright © 2019 to present, Joris Duyck (JD)
        mid = ta.ema(src, len)
        dev = src - mid
        vol_up = ta.highest(dev, i_volatility_lookback)
        vol_down = ta.lowest(dev, i_volatility_lookback)
        result := mid + math.avg(vol_up, vol_down)
        result
    if type == 'HMA'  // Hull
        result := ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))
        result
    if type == 'McGinley'
        mg = 0.0
        mg := na(mg[1]) ? ta.ema(src, len) : mg[1] + (src - mg[1]) / (len * math.pow(src / mg[1], 4))
        result := mg
        result
    result
//// 1-1. SSL Hybrid Keltner Baseline Channel 
BBMC                = f_ma (i_maType, close, i_len) // BaseLone
Keltma              = f_ma (i_maType, close, i_len)
range_1             = i_useTrueRange ? ta.tr : high - low
rangema             = ta.ema(range_1, i_len)
upperk              = Keltma + rangema * i_multy
lowerk              = Keltma - rangema * i_multy

//// 2. 4 Color MACD
i_fastMA            = input.int (defval=12, title='MACD fast MA',       minval=7, inline = '1' , group = '2: 4 Color MACD')
i_slowMA            = input.int (defval=26, title='MACD slow MA',       minval=7, inline = '1' , group = '2: 4 Color MACD')
i_signalLength      = input.int (defval=9,  title='MACD signal Length', minval=1, inline = '2' , group = '2: 4 Color MACD')

[currMacd, _, _]    = ta.macd   (source = close[0], fastlen = i_fastMA, slowlen = i_slowMA, siglen = 9) 
[prevMacd, _, _]    = ta.macd   (source = close[1], fastlen = i_fastMA, slowlen = i_slowMA, siglen = 9)
signalLine          = ta.sma    (currMacd, i_signalLength)

//// 3. Laguerre RSI
i_src               = input       (defval=close,   title='Laguerre RSI source', inline = '1' , group = '3: Laguerre RSI')
i_alpha             = input.float (defval=0.2,     title='Alpha', inline = '2', minval = 0,    maxval = 1,      step = 0.1,    group = '3: Laguerre RSI')
i_overbought        = input.int   (defval=80,      title='Overbought Level?',   minval=50,     maxval = 99,     inline = '4' , group = '3: Laguerre RSI')
i_oversold          = input.int   (defval=20,      title='Overbought Level?',   minval=0,      maxval = 50,     inline = '4' , group = '3: Laguerre RSI')
// i_colorchange       = input.bool  (defval=false,   title='Change Color?',       inline = '3' , group = '3: Laguerre RSI')

float LaRSIResult   = 0
gamma = 1 - i_alpha
L0 = 0.0
L0 := (1 - gamma) * i_src + gamma * nz(L0[1])
L1 = 0.0
L1 := -gamma * L0 + nz(L0[1]) + gamma * nz(L1[1])

L2 = 0.0
L2 := -gamma * L1 + nz(L1[1]) + gamma * nz(L2[1])

L3 = 0.0
L3 := -gamma * L2 + nz(L2[1]) + gamma * nz(L3[1])

cu                  = (L0 > L1 ? L0 - L1 : 0) + (L1 > L2 ? L1 - L2 : 0) + (L2 > L3 ? L2 - L3 : 0)
cd                  = (L0 < L1 ? L1 - L0 : 0) + (L1 < L2 ? L2 - L1 : 0) + (L2 < L3 ? L3 - L2 : 0)

temp                = cu + cd == 0 ? -1 : cu + cd
LaRSI               = temp == -1 ? 0 : cu / temp
LaRSIResult         := LaRSI * 100

// Entry Condition for Long and Short
//// 1. Condition 1: SSL Hybrid
bool bullSSL             = close > upperk
bool bearSSL             = close < lowerk
//// 2. Condition 2: 4 Color MACD
bool bullSignalMACD      = signalLine > 0
bool bearSignalMACD      = signalLine < 0
bool bull4cMACD          = currMacd > prevMacd and prevMacd > 0
bool bear4cMACD          = currMacd < prevMacd and prevMacd < 0
//// 3. Condition 3
bool bullLaRSI           = LaRSIResult < i_overbought
bool bearLaRSI           = LaRSIResult > i_oversold

// Plot: Indicators
//// 1. SSL Hybrid
var bullSSLColor        = #00c3ff
var bearSSLColor        = #ff0062
color_bar               = color.new(color = close > upperk ? bullSSLColor : close < lowerk ? bearSSLColor : color.gray, transp = 0)
plot(series = BBMC, title = 'MA Baseline', color = color_bar, linewidth = 1, style = plot.style_line)

i_show_color_bar        = input.bool(defval = true , title = "Color Bars",inline = "2", group = "Strategy: Drawings") 
barcolor(i_show_color_bar ? color_bar : na)

up_channel              = plot(upperk, color=color_bar, title='Baseline Upper Channel')
low_channel             = plot(lowerk, color=color_bar, title='Basiline Lower Channel')
fill(up_channel, low_channel, color.new(color=color_bar, transp=90))

//// 2. MACD Line
var bull4cMACDColor      = color.lime
var bear4cMACDColor      = color.orange
MACDbgColor              = color.new (color = bull4cMACD and bullSignalMACD ? bull4cMACDColor : bear4cMACD and bearSignalMACD ? bear4cMACDColor : na, transp = not bull4cMACD and not bear4cMACD ? 100 : 80)
bgcolor(color = MACDbgColor, title = "MACD Condition")
// plotColor = currMacd > 0 ? currMacd > prevMacd ? color.lime : color.green : currMacd < prevMacd ? color.maroon : color.red
// plot(currMacd, style=plot.style_columns, color=color.new(plotColor,20), linewidth=3)
// plot(0, title='Zero line', linewidth=1, color=color.new(color.gray, 0))
// plot(signalLine, color=color.new(color.white, 0), title='Signal')

//// 3. Laguerre RSI 
var overboughtColor      = color.blue
var oversoldColor        = color.aqua
LaRSIColor               = color.new(color = LaRSIResult > i_overbought ? overboughtColor : LaRSIResult < i_oversold ? oversoldColor : na, transp = 90)
bgcolor (color = LaRSIColor, title = "LaRSI Condition")
// lineColor = i_colorchange ? LaRSI > LaRSI[1] ? color.green : color.red : color.teal
// plot(LaRSIResult, title='LaRSI', linewidth=2, color=color.new(color=lineColor,transp=0))
// plot(i_oversold, linewidth=1, color=color.new(color.maroon, 0))
// plot(i_overbought, linewidth=1, color=color.new(color.maroon, 0))

////// Entry, Exit
// Long, Short Logic with Indicator
// Basic Cond + Long, Short Entry Condition
bool longCond           = (i_longEnabled and inTime) and (bullSSL and bullSignalMACD and bull4cMACD and bullLaRSI) 
bool shortCond          = (i_shortEnabled and inTime) and (bearSSL and bearSignalMACD and bear4cMACD and bearLaRSI) 

// Basic Cond + Long, Short Exit Condition
bool closeLong          = (i_longEnabled) and (bearSSL or bearSignalMACD)
bool closeShort         = (i_shortEnabled) and (bullSSL or bullSignalMACD)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Position Control
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Long, Short Entry Condition + Not entered Position Yet
bool openLong           = longCond and not (strategy.opentrades.size(strategy.opentrades - 1) > 0) and filterFulfilled
bool openShort          = shortCond and not (strategy.opentrades.size(strategy.opentrades - 1) < 0) and filterFulfilled
bool enteringTrade      = openLong or openShort
float entryBarIndex     = bar_index

// Long, Short Entry Fulfilled or Already Entered
bool inLong             = openLong or strategy.opentrades.size(strategy.opentrades - 1) > 0 and not closeLong
bool inShort            = openShort or strategy.opentrades.size(strategy.opentrades - 1) < 0 and not closeShort

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Stop Loss - Inputs, Indicaotrs
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//// Use SL? TSL? 
i_useSLTP               = input.bool   (defval =  true, title = "Enable SL & TP?", tooltip = "", inline = "1", group = "Stop Loss") 
i_tslEnabled            = input.bool   (defval = false , title = "Enable Trailing SL?", tooltip = "Enable Stop Loss & Take Profit? \n\Enable Trailing SL?", inline = "1", group = "Stop Loss") 
// i_breakEvenAfterTP   = input.bool   (defval = false, title = 'Enable Break Even After TP?', tooltip = 'When Take Profit price target is hit, move the Stop Loss to the entry price (or to a more strict price defined by the Stop Loss %/ATR Multiplier).', inline = '2', group = 'Stop Loss / Take Profit')
//// Sl Options
i_slType                = input.string (defval = "ATR", title = "Stop Loss Type", options = ["Percent", "ATR", "Previous LL / HH"], tooltip = "Stop Loss based on %? ATR?", inline = "3", group = "Stop Loss") 
i_slATRLen              = input.int    (defval = 14, title = "ATR Length", minval = 1 , maxval = 200 , step = 1, inline = "4", group = "Stop Loss")  
i_slATRMult             = input.float  (defval = 3, title = "ATR Multiplier", minval = 1 , maxval = 200 , step = 0.1, tooltip = "", inline = "4", group = "Stop Loss") 
i_slPercent             = input.float  (defval = 3, title = "Percent", tooltip = "", inline = "5", group = "Stop Loss")
i_slLookBack            = input.int    (defval = 30, title = "Lowest / Highest Price Before Entry", group = "Stop Loss",  inline = "6", minval = 1, maxval=200, step = 1, tooltip = "Lookback to find the Lowest Price. \nStopLoss is determined by the Lowest price of the look back period. Take Profit is derived from this also by multiplying the StopLoss value by the Risk:Reward multiplier.")

// Functions for Stop Loss
float openAtr           = ta.valuewhen(condition = enteringTrade, source = ta.atr(i_slATRLen), occurrence = 0) 
float openLowest        = ta.valuewhen(condition = openLong, source = ta.lowest(low, i_slLookBack), occurrence = 0)
float openHighest       = ta.valuewhen(condition = openShort, source = ta.highest(high, i_slLookBack), occurrence = 0)

f_getLongSLPrice(source) =>
    switch i_slType
        "Percent"           => source * (1 - (i_slPercent/100))
        "ATR"               => source - (i_slATRMult * openAtr)
        "Previous LL / HH"  => openLowest
        => na

f_getShortSLPrice(source) =>
    switch i_slType
        "Percent"           => source * (1 + (i_slPercent/100))
        "ATR"               => source + (i_slATRMult * openAtr)
        "Previous LL / HH"  => openHighest
        => na

// Calculate Stop Loss
var float longSLPrice   = na
var float shortSLPrice  = na
bool longTPExecuted     = false
bool shortTPExecuted    = false

longSLPrice := if (inLong and i_useSLTP)
    if (openLong)
        f_getLongSLPrice (close)
    else
        // 1. Trailing Stop Loss
        if i_tslEnabled
            stopLossPrice = f_getLongSLPrice (high) 
            math.max(stopLossPrice, nz(longSLPrice[1])) 
        // 2. Normal StopLoss
        else
            nz(source = longSLPrice[1], replacement = 0) 
else
    na           

shortSLPrice := if (inShort and i_useSLTP)
    if (openShort)
        f_getShortSLPrice (close)
    else
        // 1. Trailing Stop Loss
        if i_tslEnabled
            stopLossPrice = f_getShortSLPrice (low) 
            math.min(stopLossPrice, nz(shortSLPrice[1])) 
        // 2. Normal StopLoss
        else
            nz(source = shortSLPrice[1], replacement = 999999.9) 
else
    na           

// Plot: Stop Loss of Long, Short Entry
var longSLPriceColor    = color.new(color.maroon, 0)
plot(series = longSLPrice, title = 'Long Stop Loss', color = longSLPriceColor, linewidth = 1, style = plot.style_linebr, offset = 1)
var shortSLPriceColor   = color.new(color.maroon, 0)
plot(series = shortSLPrice, title = 'Short Stop Loss', color = shortSLPriceColor, linewidth = 1, style = plot.style_linebr, offset = 1)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Take Profit - Inputs, Indicaotrs
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
i_useTPExit             = input.bool   (defval = true, title = "Use Take Profit?", tooltip = "", inline = "1", group = "Take Profit") 
i_RRratio               = input.float  (defval = 1.8, title = "R:R Ratio", minval = 0.1 , maxval = 200 , step = 0.1, tooltip = "R:R Ratio > Risk Reward Ratio? It will automatically set Take Profit % based on Stop Loss", inline = "2", group = "Take Profit") 
i_tpQuantityPerc        = input.float  (defval = 50, title = 'Take Profit Quantity %', minval = 0.0, maxval = 100, step = 1.0, tooltip = '% of position closed when tp target is met.', inline="34", group = 'Take Profit')

var float longTPPrice   = na
var float shortTPPrice  = na

f_getLongTPPrice() =>
    close + i_RRratio * math.abs (close - f_getLongSLPrice (close))

f_getShortTPPrice() =>
    close - i_RRratio * math.abs(close - f_getShortSLPrice (close))

longTPPrice := if (inLong and i_useSLTP)
    if (openLong)
        f_getLongTPPrice ()
    else
        nz(source = longTPPrice[1], replacement = f_getLongTPPrice ()) 
else
    na

shortTPPrice := if (inShort and i_useSLTP)
    if (openShort)
        f_getShortTPPrice ()
    else
        nz(source = shortTPPrice[1], replacement = f_getShortTPPrice ()) 
else
    na

// Plot: Take Profit of Long, Short Entry 
var longTPPriceColor    = color.new(color.teal, 0)
plot(series = longTPPrice, title = 'Long Take Profit', color = longTPPriceColor, linewidth = 1, style = plot.style_linebr, offset = 1)
var shortTPPriceColor   = color.new(color.teal, 0)
plot(series = shortTPPrice, title = 'Short Take Profit', color = shortTPPriceColor, linewidth = 1, style = plot.style_linebr, offset = 1)

// Plot: Entry Price 
var posColor            = color.new(color.white, 0)
plot(series = strategy.opentrades.entry_price(strategy.opentrades - 1), title = 'Position Entry Price', color = posColor, linewidth = 1, style = plot.style_linebr)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Quantity - Inputs
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
i_useRiskManangement    = input.bool  (defval = true, title = "Use Risk Manangement?", tooltip = "", inline = "1", group = "Quantity") 
i_riskPerTrade          = input.float (defval = 3, title = "Risk Per Trade (%)", minval = 0, maxval = 100, step = 0.1, tooltip = "Use Risk Manangement by Quantity Control?", inline = "2", group = "Quantity") 
// i_leverage              = input.float (defval = 2, title = "Leverage", minval = 0, maxval = 100, step = 0.1, tooltip = "Leverage", inline = "3", group = "Quantity") 

float qtyPercent        = na
float entryQuantity     = na

f_calQtyPerc() =>
    if (i_useRiskManangement)
        riskPerTrade        = (i_riskPerTrade) / 100 // 1번 거래시 3% 손실
        stopLossPrice       = openLong ? f_getLongSLPrice (close) : openShort ? f_getShortSLPrice (close) : na
        riskExpected        = math.abs((close-stopLossPrice)/close) // 손절가랑 6% 차이
        riskPerTrade / riskExpected  // 0 ~ 1
    else
        1

f_calQty(qtyPerc) =>
    math.min (math.max (0.000001, strategy.equity / close * qtyPerc), 1000000000)
    
// TP Execution
longTPExecuted          := strategy.opentrades.size(strategy.opentrades - 1) > 0 and (longTPExecuted[1] or strategy.opentrades.size(strategy.opentrades - 1) < strategy.opentrades.size(strategy.opentrades - 1)[1] or strategy.opentrades.size(strategy.opentrades - 1)[1] == 0 and high >= longTPPrice)
shortTPExecuted         := strategy.opentrades.size(strategy.opentrades - 1) < 0 and (shortTPExecuted[1] or strategy.opentrades.size(strategy.opentrades - 1) > strategy.opentrades.size(strategy.opentrades - 1)[1] or strategy.opentrades.size(strategy.opentrades - 1)[1] == 0 and low <= shortTPPrice)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Plot Label, Boxes, Results, Etc
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
i_showSimpleLabel       = input.bool(false, "Show Simple Label for Entry?",     group = "Strategy: Drawings",           inline = "1",  tooltip ="") 
i_showLabels            = input.bool(true, "Show Trade Exit Labels",            group = "Strategy: Drawings",           inline = "1",  tooltip = "Useful labels to identify Profit/Loss and cumulative portfolio capital after each trade closes.\n\nAlso note that TradingView limits the max number of 'boxes' that can be displayed on a chart (max 500). This means when you lookback far enough on the chart you will not see the TP/SL boxes. However you can check this option to identify where trades exited.")
i_showDashboard         = input.bool(false, "Show Dashboard",                    group = "Strategy: Drawings",           inline = "2",  tooltip = "Show Backtest Results. Backtest Dates, Win/Lose Rates, Etc.")

// Plot: Label for Long, Short Entry
var openLongColor       = color.new(#2962FF, 0)
var openShortColor      = color.new(#FF1744, 0)
var entryTextColor      = color.new(color.white, 0)

if (openLong and i_showSimpleLabel)
    label.new (x = bar_index, y = na, text = 'Open', yloc = yloc.belowbar, color = openLongColor, style = label.style_label_up, textcolor = entryTextColor)
    entryBarIndex := bar_index
if (openShort and i_showSimpleLabel)
    label.new (x = bar_index, y = na, text = 'Close', yloc = yloc.abovebar, color = openShortColor, style = label.style_label_down, textcolor = entryTextColor)
    entryBarIndex := bar_index

float prevEntryPrice    = strategy.closedtrades.entry_price (strategy.closedtrades - 1)
float pnl               = strategy.closedtrades.profit      (strategy.closedtrades - 1)
float prevExitPrice     = strategy.closedtrades.exit_price  (strategy.closedtrades - 1)

f_enteringTradeLabel(x, y, qty, entryPrice, slPrice, tpPrice, rrRatio, direction) => 
    if i_showLabels
        labelStr = ("Trade Start" 
              + "\nDirection: " + direction 
              + "\nRisk Per Trade: " + str.tostring (i_useRiskManangement ? i_riskPerTrade : 100, "#.##") + "%"  
              + "\nExpected Risk: " + str.tostring (math.abs((close-slPrice)/close) * 100, "#.##") + "%" 
              + "\nEntry Position Qty: " + str.tostring(math.abs(qty * 100), "#.##") + "%"
              + "\nEntry Price: " + str.tostring(entryPrice, "#.##"))
              + "\nStop Loss Price: " + str.tostring(slPrice, "#.##") 
              + "\nTake Profit Price: " + str.tostring(tpPrice, "#.##") 
              + "\nRisk - Reward Ratio: " + str.tostring(rrRatio, "#.##") 
        label.new(x = x, y = y, text = labelStr, color = color.new(color.blue, 60) , textcolor = color.white, style = label.style_label_up)


f_exitingTradeLabel(x, y, entryPrice, exitPrice, direction) => 
    if i_showLabels
        labelStr = ("Trade Result" 
              + "\nDirection: " + direction 
              + "\nEntry Price: " + str.tostring(entryPrice, "#.##") 
              + "\nExit Price: " + str.tostring(exitPrice,"#.##")
              + "\nGain %: " + str.tostring(direction == 'Long' ? -(entryPrice-exitPrice) / entryPrice * 100 : (entryPrice-exitPrice) / entryPrice * 100 ,"#.##") + "%")
        label.new(x = x, y = y, text = labelStr, color = pnl > 0 ? color.new(color.green, 60) : color.new(color.red, 60), textcolor = color.white, style = label.style_label_down)

f_fillCell(_table, _column, _row, _title, _value, _bgcolor, _txtcolor) =>
    _cellText = _title + " " + _value
    table.cell(_table, _column, _row, _cellText, bgcolor=_bgcolor, text_color=_txtcolor, text_size=size.auto)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Orders
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

if (inTime)
    if (openLong)
        qtyPercent        := f_calQtyPerc()
        entryQuantity     := f_calQty(qtyPercent)
        strategy.entry(id = "Long", direction = strategy.long, qty = entryQuantity, comment = 'Long(' + syminfo.ticker + '): Started', alert_message = 'Long(' + syminfo.ticker + '): Started')
        f_enteringTradeLabel(x = bar_index + 1, y = close-3*ta.tr, entryPrice = close, qty = qtyPercent, slPrice = longSLPrice, tpPrice = longTPPrice, rrRatio = i_RRratio, direction = "Long")

    if (openShort)
        qtyPercent        := f_calQtyPerc()
        entryQuantity     := f_calQty(qtyPercent)
        strategy.entry(id = "Short", direction = strategy.short, qty = entryQuantity, comment = 'Short(' + syminfo.ticker + '): Started', alert_message = 'Short(' + syminfo.ticker + '): Started')
        f_enteringTradeLabel(x = bar_index + 1, y = close-3*ta.tr, entryPrice = close, qty = qtyPercent, slPrice = shortSLPrice, tpPrice = shortTPPrice, rrRatio = i_RRratio, direction = "Short")

    if (closeLong)
        strategy.close(id = 'Long', comment = 'Close Long', alert_message = 'Long: Closed at market price')
        strategy.position_size > 0 ? f_exitingTradeLabel(x = bar_index, y = close+3*ta.tr, entryPrice = prevEntryPrice, exitPrice = prevExitPrice, direction = 'Long') : na

    if (closeShort)
        strategy.close(id = 'Short', comment = 'Close Short', alert_message = 'Short: Closed at market price')
        strategy.position_size < 0 ? f_exitingTradeLabel(x = bar_index, y = close+3*ta.tr, entryPrice = prevEntryPrice, exitPrice = prevExitPrice, direction = 'Short') : na

    if (inLong)
        strategy.exit(id = 'Long TP / SL', from_entry = 'Long', qty_percent = i_tpQuantityPerc, limit = longTPPrice, stop = longSLPrice, alert_message = 'Long(' + syminfo.ticker + '): Take Profit or Stop Loss executed')
        strategy.exit(id = 'Long SL', from_entry = 'Long', stop = longSLPrice, alert_message = 'Long(' + syminfo.ticker + '): Stop Loss executed')

    if (inShort)
        strategy.exit(id = 'Short TP / SL', from_entry = 'Short', qty_percent = i_tpQuantityPerc, limit = shortTPPrice, stop = shortSLPrice, alert_message = 'Short(' + syminfo.ticker + '): Take Profit or Stop Loss executed')
        strategy.exit(id = 'Short SL', from_entry = 'Short', stop = shortSLPrice, alert_message = 'Short(' + syminfo.ticker + '): Stop Loss executed')
    
    if strategy.position_size[1] > 0 and strategy.position_size == 0
        f_exitingTradeLabel(x = bar_index, y = close+3*ta.tr, entryPrice = prevEntryPrice, exitPrice = prevExitPrice, direction = 'Long')
    
    if strategy.position_size[1] < 0 and strategy.position_size == 0
        f_exitingTradeLabel(x = bar_index, y = close+3*ta.tr, entryPrice = prevEntryPrice, exitPrice = prevExitPrice, direction = 'Short')

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Backtest Result Dashboard
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

if i_showDashboard
    var bgcolor = color.new(color = color.black, transp = 100)
    var greenColor = color.new(color = #02732A, transp = 0)
    var redColor = color.new(color = #D92332, transp = 0)
    var yellowColor = color.new(color = #F2E313, transp = 0)
    // Keep track of Wins/Losses streaks
    newWin  = (strategy.wintrades  > strategy.wintrades[1]) and (strategy.losstrades == strategy.losstrades[1]) and (strategy.eventrades == strategy.eventrades[1])
    newLoss = (strategy.wintrades == strategy.wintrades[1]) and (strategy.losstrades  > strategy.losstrades[1]) and (strategy.eventrades == strategy.eventrades[1])

    varip int winRow     = 0
    varip int lossRow    = 0
    varip int maxWinRow  = 0
    varip int maxLossRow = 0

    if newWin
        lossRow := 0
        winRow := winRow + 1
    if winRow > maxWinRow
        maxWinRow := winRow
        
    if newLoss
        winRow := 0
        lossRow := lossRow + 1
    if lossRow > maxLossRow
        maxLossRow := lossRow


    // Prepare stats table
    var table dashTable = table.new(position.top_right, 1, 15, border_width=1)
    
   
    if barstate.islastconfirmedhistory
        dollarReturn = strategy.netprofit
        f_fillCell(dashTable, 0, 0, "Start:", str.format("{0,date,long}", strategy.closedtrades.entry_time(0)) , bgcolor, color.white) // + str.format(" {0,time,HH:mm}", strategy.closedtrades.entry_time(0)) 
        f_fillCell(dashTable, 0, 1, "End:", str.format("{0,date,long}", strategy.opentrades.entry_time(0)) , bgcolor, color.white) // + str.format(" {0,time,HH:mm}", strategy.opentrades.entry_time(0))
        _profit = (strategy.netprofit / strategy.initial_capital) * 100
        f_fillCell(dashTable, 0, 2, "Net Profit:", str.tostring(_profit, '##.##') + "%", _profit > 0 ? greenColor : redColor, color.white)
        _numOfDaysInStrategy = (strategy.opentrades.entry_time(0) - strategy.closedtrades.entry_time(0)) / (1000 * 3600 * 24)
        f_fillCell(dashTable, 0, 3, "Percent Per Day", str.tostring(_profit / _numOfDaysInStrategy, '#########################.#####')+"%", _profit > 0 ? greenColor : redColor, color.white)
        _winRate = ( strategy.wintrades / strategy.closedtrades ) * 100
        f_fillCell(dashTable, 0, 4, "Percent Profitable:", str.tostring(_winRate, '##.##') + "%", _winRate < 50 ? redColor : _winRate < 75 ? greenColor : yellowColor, color.white)
        f_fillCell(dashTable, 0, 5, "Profit Factor:", str.tostring(strategy.grossprofit / strategy.grossloss,  '##.###'), strategy.grossprofit > strategy.grossloss ? greenColor : redColor, color.white)
        f_fillCell(dashTable, 0, 6, "Total Trades:", str.tostring(strategy.closedtrades), bgcolor, color.white)
        f_fillCell(dashTable, 0, 8, "Max Wins In A Row:", str.tostring(maxWinRow, '######') , bgcolor, color.white)
        f_fillCell(dashTable, 0, 9, "Max Losses In A Row:", str.tostring(maxLossRow, '######') , bgcolor, color.white)
```

> Detail

https://www.fmz.com/strategy/427158

> Last Modified

2023-09-18 17:15:11
