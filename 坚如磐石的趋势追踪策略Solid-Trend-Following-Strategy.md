
> Name

坚如磐石的趋势追踪策略Solid-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6f2beba96828f4f91c.png)
 [trans]

## 概述

本策略基于 SSL 混合通道、QQE改良版 和瓦达阿塔爆破指标的组合,实现了一个稳健的趋势追踪策略。它可以在大型加密货币如BTC和ETH上实现稳定收益,适合中长线操作。

## 策略原理 

### 入场逻辑

多头入场条件:

1. 收盘价高于 SSL 混合通道的基线
2. QQE改良版指标颜色变成蓝色
3. 瓦达阿塔爆破指标为绿色

空头入场条件:

1. 收盘价低于 SSL 混合通道的基线  
2. QQE改良版指标颜色变成红色
3. 瓦达阿塔爆破指标为红色

### 出场逻辑  

多头出场条件:  

1. QQE改良版指标颜色变成红色

空头出场条件:

1. QQE改良版指标颜色变成蓝色

## 优势分析

本策略具有以下优势:

1. 三个指标的组合,确保了交易信号的准确性和稳定性。

2. SSL通道基线和QQE改良版指标,能够有效捕捉趋势的方向。

3. 瓦达阿塔爆破指标则进一步验证了交易信号,避免了假突破。

4. 代码结构清晰,易于理解和修改。

5. 带有完整的止损、止盈和风险管理机制,可以有效控制风险。

6. 在较长的时间周期内(如1小时、4小时),回测表现优异。

## 风险分析  

本策略也存在以下风险:

1. 在短周期内(如5分钟),回测结果较差。

2. 大幅震荡市场中,止损可能被频繁触发。

3. 在一些特定加密货币上,回测结果可能不佳。

针对这些风险,可以采取以下措施:

1. 仅用于中长线操作,不宜用于短线。

2. 适当放宽止损幅度,避免止损过于频繁。

3. 测试更多品种,找到符合本策略特征的加密货币。

## 优化方向  

本策略还可以从以下几个方面进行优化:

1. 测试不同的参数设置,找到最佳组合。

2. 增加机器学习元素,使策略更具适应性。  

3. 结合情绪指标等多个因子,提高系统的整体稳定性。

4. 研究行业特点,调整参数,使策略适用于特定行业。

5. 增加算法交易模块,利用程序化下单,提高回报。

## 总结  

本策略整体来说是值得推荐的。它稳定、易于理解,带有完整的风险管理体系。在适当的品种和时间周期下,可以获得良好收益。通过不断优化和调整,本策略可以成为一个高效的量化投资工具。

||

## Overview

This strategy combines SSL Hybrid Channel, QQE MOD and Waddah Attar Explosion indicator to build a robust trend following strategy. It can achieve steady profit on major cryptocurrencies like BTC and ETH over medium to long term timeframes.  

## Strategy Logic   

### Entry Logic  

Long Entry Conditions:  

1. Close price above SSL Hybrid Baseline 
2. QQE MOD turns blue 
3. Waddah Attar Explosion indicator green  

Short Entry Conditions:

1. Close price below SSL Hybrid Baseline  
2. QQE MOD turns red
3. Waddah Attar Explosion indicator red

### Exit Logic   

Long Exit Condition:   

1. QQE MOD turns red  

Short Exit Condition:

1. QQE MOD turns blue

## Advantage Analysis   

The advantages of this strategy:  

1. Combination of 3 indicators ensures accuracy and reliability of trading signals  

2. SSL baseline and QQE MOD effectively capture trend direction  

3. Waddah Attar Explosion further validates signals to avoid false breakouts   

4. Clean code structure, easy to understand and modify  

5. Complete stop loss, take profit and risk management system to control risks  

6. Excellent backtest results over longer timeframes (e.g. 1H, 4H)  

## Risk Analysis   

The risks of this strategy:  

1. Poor backtest results over short timeframes (e.g. 5m)  

2. Stop loss may trigger frequently during high volatility  

3. Results may vary across different cryptocurrencies  

Possible solutions:  

1. Only use over medium to long term  

2. Widen stop loss to prevent too frequent triggering  

3. Test on more assets to find suitable ones  

## Optimization Directions   

Potential improvements:  

1. Test different parameter sets to find optimum combination 

2. Incorporate machine learning for better adaptability  

3. Combine with sentiment and other factors to enhance stability

4. Adjust for specific industries based on characteristics  

5. Add algorithmic trading module to boost returns  

## Conclusion   

Overall this strategy is highly recommended. With sound logic, full risk control and stability across suitable assets and timeframes, it has great profit potential. Continuous enhancements will turn it into a highly efficient trading tool.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_3_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_1|timestamp(20 Jan 1990 00:00 +0900)|(?Time)Start Date|
|v_input_2|timestamp(20 Dec 2030 00:00 +0900)|End Date|
|v_input_bool_1|true|(?Long / Short)Long?|
|v_input_bool_2|true|Short?|
|v_input_bool_3|false|(?Filters)ATR Filter On?|
|v_input_int_1|14|Length for ATR Filter|
|v_input_int_2|40|SMA Length for ATR SMA|
|v_input_bool_4|false|EMA Filter On?|
|v_input_int_3|200|EMA Length|
|v_input_bool_5|false|ADX Filter On?|
|v_input_bool_6|false|DMI Filter On?|
|v_input_int_4|20|ADX Length|
|v_input_int_5|25|ADX Threshold|
|v_input_bool_7|false|Super Trend Filter On?|
|v_input_int_6|10|ATR Length|
|v_input_float_1|3|Factor|
|v_input_bool_8|true|(?1: SSL Hybrid)use true range for Keltner Channel?|
|v_input_string_1|0|Baseline Type: EMA|SMA|DEMA|TEMA|LSMA|WMA|VAMA|TMA|HMA|McGinley|
|v_input_int_7|30|Baseline Length|
|v_input_float_2|0.2|Base Channel Multiplier|
|v_input_int_8|10|Volatility lookback length(for VAMA)|
|v_input_int_9|6|(?2: QQE MOD)RSI Length|
|v_input_int_10|5|RSI Smoothing|
|v_input_float_3|3|Fast QQE Factor|
|v_input_int_11|3|Thresh-hold|
|v_input_int_12|50|Bollinger Length|
|v_input_float_4|0.35|BB Multiplier|
|v_input_int_13|6|RSI 2  Length|
|v_input_int_14|5|RSI Smoothing|
|v_input_float_5|1.61|Fast QQE2 Factor|
|v_input_int_15|3|Thresh-hold|
|v_input_4_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_6|150|(?3: Waddah Attar Explosion)Sensitivity|
|v_input_int_16|20|FastEMA Length|
|v_input_int_17|40|SlowEMA Length|
|v_input_int_18|20|BB Channel Length|
|v_input_float_7|2|BB Stdev Multiplier|
|v_input_bool_9|true|(?Stop Loss)Enable SL & TP?|
|v_input_bool_10|false|Enable Trailing SL?|
|v_input_string_2|0|Stop Loss Type: ATR|Percent|Previous LL / HH|
|v_input_int_19|14|ATR Length|
|v_input_float_8|3|ATR Multiplier|
|v_input_float_9|3|Percent|
|v_input_int_20|30|Lowest Price Before Entry|
|v_input_bool_11|true|(?Take Profit)Use Take Profit?|
|v_input_float_10|1.5|R:R Ratio|
|v_input_float_11|50|Take Profit Quantity %|
|v_input_bool_12|true|(?Quantity)Use Risk Manangement?|
|v_input_float_12|3|Risk Per Trade (%)|
|v_input_bool_13|false|(?Strategy: Drawings)Show Simple Label for Entry?|
|v_input_bool_14|true|Show Trade Exit Labels|
|v_input_bool_15|false|Show Dashboard|


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
// © fpemehd
// Thanks to myncrypto, jason5480, kevinmck100
// @version=5
strategy(title          = '[D] SSL Hybrid + QQE MOD + Waddah Attar Strategy',
      shorttitle        = '[D] SQW Strategy',
      overlay           = true,
      pyramiding        = 0,
      currency          = currency.USD,
      default_qty_type  = strategy.percent_of_equity,
      default_qty_value = 100,
      commission_value  = 0.1,
      initial_capital   = 100000,
      max_bars_back     = 500,
      max_lines_count   = 150,
      max_labels_count  = 300)

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
//// 3-1. ATR Filter
i_ATRFilterOn           = input.bool (defval = false , title = "ATR Filter On?", tooltip = "ATR Filter On? Order will not be made unless filter condition is fulfilled", inline = "1", group =  "Filters") 
i_ATRFilterLen          = input.int  (defval = 14,     title = "Length for ATR Filter", minval = 1 , maxval = 100 , step = 1 , tooltip = "", inline = "2", group = "Filters") 
i_ATRSMALen             = input.int  (defval = 40,     title = "SMA Length for ATR SMA", minval = 1 , maxval = 100000 , step = 1 , tooltip = "ATR should be bigger than this", inline = "2", group = "Filters") 
bool ATRFilter          = ta.atr(i_ATRFilterLen) >= ta.sma(ta.atr(length = i_ATRFilterLen), i_ATRSMALen) ? true : false

//// 3-2. EMA Filter
i_EMAFilterOn           = input.bool (defval = false , title = "EMA Filter On?", tooltip = "EMA Filter On? Order will not be made unless filter condition is fulfilled", inline = "3", group =  "Filters") 
i_EMALen                = input.int  (defval = 200,    title = "EMA Length", minval = 1 , maxval = 100000 , step = 1 , tooltip = "EMA Length", inline = "4", group = "Filters") 
bool longEMAFilter      = close >= ta.ema(source = close, length = i_EMALen) ? true : false
bool shortEMAFilter     = close <= ta.ema(source = close, length = i_EMALen) ? true : false
plot(i_EMAFilterOn ? ta.ema(source = close, length = i_EMALen) : na, title = "EMA Filter", color = color.new(color = color.orange , transp = 0), linewidth = 1)

//// 3-3. ADX Filter
//// 3-4. DMI Filter (Uses same ADX Length)
i_ADXFilterOn           = input.bool  (defval = false , title = "ADX Filter On?", tooltip = "ADX Filter On? Order will not be made unless filter condition is fulfilled", inline = "5", group =  "Filters") 
i_DMIFilterOn           = input.bool  (defval = false , title = "DMI Filter On?", tooltip = "DMI (Directional Moving Index) Filter On? Order will not be made unless filter condition is fulfilled", inline = "6", group =  "Filters") 
i_ADXLength             = input.int   (defval = 20,     title = "ADX Length", minval = 1 , maxval = 100000 , step = 1 , tooltip = "ADX Length", inline = "7", group = "Filters") 
i_ADXThreshold          = input.int   (defval = 25,     title = "ADX Threshold", minval = 1 , maxval = 100000 , step = 1 , tooltip = "ADX should be bigger than threshold", inline = "8", group = "Filters") 

//// 3-5. SuperTrend Filter
i_superTrendFilterOn    = input.bool  (defval = false , title = "Super Trend Filter On?", tooltip = "Super Trend Filter On? Order will not be made unless filter condition is fulfilled", inline = "9", group =  "Filters") 
i_superTrendATRLen      = input.int   (defval = 10,     title = "ATR Length", minval = 1 , maxval = 100000 , step = 1 , tooltip = "Super Trend ATR Length", inline = "10", group = "Filters") 
i_superTrendATRFactor   = input.float (defval = 3,     title = "Factor", minval = 1 , maxval = 100000 , step = 0.1 , tooltip = "Super Trend ATR Factor", inline = "11", group = "Filters") 

// ADX and DI Thanks to @BeikabuOyaji
int len                 = i_ADXLength
float th                = i_ADXThreshold

TR                      = math.max(math.max(high - low, math.abs(high - nz(close[1]))), math.abs(low - nz(close[1])))
DMPlus                  = high - nz(high[1]) > nz(low[1]) - low ? math.max(high - nz(high[1]), 0) : 0
DMMinus                 = nz(low[1]) - low > high - nz(high[1]) ? math.max(nz(low[1]) - low, 0) : 0

SmoothedTR              = 0.0
SmoothedTR              := nz(SmoothedTR[1]) - nz(SmoothedTR[1]) / len + TR

SmoothedDMPlus          = 0.0
SmoothedDMPlus          := nz(SmoothedDMPlus[1]) - nz(SmoothedDMPlus[1]) / len + DMPlus

SmoothedDMMinus         = 0.0
SmoothedDMMinus         := nz(SmoothedDMMinus[1]) - nz(SmoothedDMMinus[1]) / len + DMMinus

DIPlus                  = SmoothedDMPlus / SmoothedTR * 100
DIMinus                 = SmoothedDMMinus / SmoothedTR * 100
DX                      = math.abs(DIPlus - DIMinus) / (DIPlus + DIMinus) * 100
ADX                     = ta.sma(source = DX, length = len)

// plot(DIPlus, color=color.new(color.green, 0), title='DI+')
// plot(DIMinus, color=color.new(color.red, 0), title='DI-')
// plot(ADX, color=color.new(color.navy, 0), title='ADX')
// hline(th, color=color.white)

bool ADXFilter          = ADX > th ? true : false
bool longDMIFilter      = DIPlus >= DIMinus ? true : false
bool shortDMIFilter     = DIPlus <= DIMinus ? true : false

// Calculate Super Trend for Filter
[supertrend, direction] = ta.supertrend(factor = i_superTrendATRFactor, atrPeriod = i_superTrendATRLen) 
bodyMiddle              = plot((open + close) / 2, display=display.none)
upTrend                 = plot(i_superTrendFilterOn ? direction < 0 ? supertrend : na : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend               = plot(i_superTrendFilterOn ? direction < 0 ? na : supertrend : na, "Down Trend", color = color.red, style=plot.style_linebr)
fill(bodyMiddle, upTrend, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle, downTrend, color.new(color.red, 90), fillgaps=false)

bool longSTFilter       = direction <= 0
bool shortSTFilter      = direction >= 0

// Filter 
bool longFilterFilled   = (not i_ATRFilterOn or ATRFilter) and (not i_EMAFilterOn or longEMAFilter) and (not i_ADXFilterOn or ADXFilter) and (not i_DMIFilterOn or longDMIFilter) and (not i_superTrendFilterOn or longSTFilter)
bool shortFilterFilled  = (not i_ATRFilterOn or ATRFilter) and (not i_EMAFilterOn or shortEMAFilter) and (not i_ADXFilterOn or ADXFilter) and (not i_DMIFilterOn or shortDMIFilter) and (not i_superTrendFilterOn or shortSTFilter)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Strategy Logic (Entry & Exit Condition) - Inputs, Indicators for Strategy
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//// Indicators
// Inputs for Strategy Indicators

//// 1. SSL Hybrid Baseline
i_useTrueRange          = input.bool   (defval = true, title = "use true range for Keltner Channel?", tooltip = "", inline = "1", group = "1: SSL Hybrid") 
i_maType                = input.string (defval ='EMA', title='Baseline Type', options=['SMA', 'EMA', 'DEMA', 'TEMA', 'LSMA', 'WMA', 'VAMA', 'TMA', 'HMA', 'McGinley'], inline="2", group = "1: SSL Hybrid")
i_len                   = input.int    (defval =30,    title='Baseline Length', inline="2", group = "1: SSL Hybrid")
i_multy                 = input.float  (defval = 0.2,  title='Base Channel Multiplier', minval = 0, maxval = 100,  step=0.05, inline="3", group = "1: SSL Hybrid")
i_volatility_lookback   = input.int    (defval =10,    title='Volatility lookback length(for VAMA)', inline='4',group="1: SSL Hybrid")

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
BBMC                    = f_ma (i_maType, close, i_len) // BaseLone
Keltma                  = f_ma (i_maType, close, i_len)
range_1                 = i_useTrueRange ? ta.tr : high - low
rangema                 = ta.ema(range_1, i_len)
upperk                  = Keltma + rangema * i_multy
lowerk                  = Keltma - rangema * i_multy

//// 2. QQE MOD, thanks to Mihkel100
RSI_Period              = input.int   (defval = 6,     title = 'RSI Length',      inline = "1",       group = "2: QQE MOD")
SF                      = input.int   (defval = 5,     title = 'RSI Smoothing',   inline = "2",       group = "2: QQE MOD")
QQE                     = input.float (defval = 3,     title = 'Fast QQE Factor', inline = "3",       group = "2: QQE MOD")
ThreshHold              = input.int   (defval = 3,     title = 'Thresh-hold',     inline = "4",       group = "2: QQE MOD")
src                     = input       (defval = close, title='RSI Source')

Wilders_Period          = RSI_Period * 2 - 1


Rsi                     = ta.rsi(src, RSI_Period)
RsiMa                   = ta.ema(Rsi, SF)
AtrRsi                  = math.abs(RsiMa[1] - RsiMa)
MaAtrRsi                = ta.ema(AtrRsi, Wilders_Period)
dar                     = ta.ema(MaAtrRsi, Wilders_Period) * QQE

longband                = 0.0
shortband               = 0.0
trend                   = 0

DeltaFastAtrRsi         = dar
RSIndex                 = RsiMa
newshortband            = RSIndex + DeltaFastAtrRsi
newlongband             = RSIndex - DeltaFastAtrRsi
longband                := RSIndex[1] > longband[1] and RSIndex > longband[1] ? math.max(longband[1], newlongband) : newlongband
shortband               := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? math.min(shortband[1], newshortband) : newshortband
cross_1                 = ta.cross(longband[1], RSIndex)
trend                   := ta.cross(RSIndex, shortband[1]) ? 1 : cross_1 ? -1 : nz(trend[1], 1)
FastAtrRsiTL            = trend == 1 ? longband : shortband
////////////////////

length                  = input.int     (defval = 50,   minval = 1,                            title = 'Bollinger Length', group = "2: QQE MOD")
mult                    = input.float   (defval = 0.35, minval = 0.01, maxval = 5, step = 0.1, title = 'BB Multiplier', group = "2: QQE MOD")

basis                   = ta.sma(FastAtrRsiTL - 50, length)
dev                     = mult * ta.stdev(FastAtrRsiTL - 50, length)
upper                   = basis + dev
lower                   = basis - dev
color_bar               = RsiMa - 50 > upper ? #00c3ff : RsiMa - 50 < lower ? #ff0062 : color.gray


//
// Zero cross
QQEzlong                = 0
QQEzlong                := nz(QQEzlong[1])
QQEzshort               = 0
QQEzshort               := nz(QQEzshort[1])
QQEzlong                := RSIndex >= 50 ? QQEzlong + 1 : 0
QQEzshort               := RSIndex < 50 ? QQEzshort + 1 : 0
//  

// Zero                    = hline(0, color=color.white, linestyle=hline.style_dotted, linewidth=1)

////////////////////////////////////////////////////////////////
RSI_Period2             = input.int   (defval = 6,     title = 'RSI 2  Length', group = "2: QQE MOD")
SF2                     = input.int   (defval = 5,     title = 'RSI Smoothing', group = "2: QQE MOD")
QQE2                    = input.float (defval = 1.61,  title = 'Fast QQE2 Factor', group = "2: QQE MOD")
ThreshHold2             = input.int   (defval = 3,     title = 'Thresh-hold', group = "2: QQE MOD")
src2                    = input       (defval = close, title = 'RSI Source', group = "2: QQE MOD")
//

//
Wilders_Period2 = RSI_Period2 * 2 - 1


Rsi2                    = ta.rsi(src2, RSI_Period2)
RsiMa2                  = ta.ema(Rsi2, SF2)
AtrRsi2                 = math.abs(RsiMa2[1] - RsiMa2)
MaAtrRsi2               = ta.ema(AtrRsi2, Wilders_Period2)
dar2                    = ta.ema(MaAtrRsi2, Wilders_Period2) * QQE2
longband2               = 0.0
shortband2              = 0.0
trend2                  = 0

DeltaFastAtrRsi2        = dar2
RSIndex2                = RsiMa2
newshortband2           = RSIndex2 + DeltaFastAtrRsi2
newlongband2            = RSIndex2 - DeltaFastAtrRsi2
longband2               := RSIndex2[1] > longband2[1] and RSIndex2 > longband2[1] ? math.max(longband2[1], newlongband2) : newlongband2
shortband2              := RSIndex2[1] < shortband2[1] and RSIndex2 < shortband2[1] ? math.min(shortband2[1], newshortband2) : newshortband2
cross_2                 = ta.cross(longband2[1], RSIndex2)
trend2                  := ta.cross(RSIndex2, shortband2[1]) ? 1 : cross_2 ? -1 : nz(trend2[1], 1)
FastAtrRsi2TL           = trend2 == 1 ? longband2 : shortband2


//
// Zero cross
QQE2zlong               = 0
QQE2zlong               := nz(QQE2zlong[1])
QQE2zshort              = 0
QQE2zshort              := nz(QQE2zshort[1])
QQE2zlong               := RSIndex2 >= 50 ? QQE2zlong + 1 : 0
QQE2zshort              := RSIndex2 < 50 ? QQE2zshort + 1 : 0
//  

hcolor2                 = RsiMa2 - 50 > ThreshHold2 ? color.silver : RsiMa2 - 50 < 0 - ThreshHold2 ? color.silver : na

Greenbar1               = RsiMa2 - 50 > ThreshHold2
Greenbar2               = RsiMa - 50 > upper

Redbar1                 = RsiMa2 - 50 < 0 - ThreshHold2
Redbar2                 = RsiMa - 50 < lower

//// 3. Waddah Attar Explosion V2 shayankm
sensitivity             = input.float (defval = 150,   title='Sensitivity',           inline = "1",       group = "3: Waddah Attar Explosion")
fastLength              = input.int   (defval = 20,    title='FastEMA Length',        inline = "2",       group = "3: Waddah Attar Explosion")
slowLength              = input.int   (defval = 40,    title='SlowEMA Length',        inline = "2",       group = "3: Waddah Attar Explosion")
channelLength           = input.int   (defval = 20,    title='BB Channel Length',     inline = "3",       group = "3: Waddah Attar Explosion")
w_mult                  = input.float (defval = 2.0,   title='BB Stdev Multiplier',   inline = "4",       group = "3: Waddah Attar Explosion")

// DEAD_ZONE = nz(ta.rma(ta.tr(true), 100)) * 3.7

calc_macd(source, fastLength, slowLength) =>
    fastMA = ta.ema(source, fastLength)
    slowMA = ta.ema(source, slowLength)
    fastMA - slowMA

calc_BBUpper(source, length, mult) =>
    basis = ta.sma(source, length)
    dev = mult * ta.stdev(source, length)
    basis + dev

calc_BBLower(source, length, mult) =>
    basis = ta.sma(source, length)
    dev = mult * ta.stdev(source, length)
    basis - dev

t1 = (calc_macd(close, fastLength, slowLength) - calc_macd(close[1], fastLength, slowLength)) * sensitivity
e1 = calc_BBUpper(close, channelLength, w_mult) - calc_BBLower(close, channelLength, w_mult)

trendUp = t1 >= 0 ? t1 : 0
trendDown = t1 < 0 ? -1 * t1 : 0

// Plot: Indicators

//// 1. SSL Hybrid
var bullSSLColor        = #00c3ff
var bearSSLColor        = #ff0062
// color_bar               = color.new(color = close > upperk ? bullSSLColor : close < lowerk ? bearSSLColor : color.gray, transp = 0)
// i_show_color_bar        = input.bool(defval = true , title = "Color Bars") 
// barcolor(i_show_color_bar ? color_bar : na)
plot(series = BBMC, title = 'MA Baseline', color = color_bar, linewidth = 1, style = plot.style_line)
up_channel              = plot(upperk, color=color_bar, title='Baseline Upper Channel')
low_channel             = plot(lowerk, color=color_bar, title='Basiline Lower Channel')
fill(up_channel, low_channel, color.new(color=color_bar, transp=90))

//// 2. QQE MOD: No Plotting because of overlay option
// plot(FastAtrRsi2TL - 50, title='QQE Line', color=color.new(color.white, 0), linewidth=2)
// plot(RsiMa2 - 50, color=hcolor2, title='Histo2', style=plot.style_columns, transp=50)
// plot(Greenbar1 and Greenbar2 == 1 ? RsiMa2 - 50 : na, title='QQE Up', style=plot.style_columns, color=color.new(#00c3ff, 0))
// plot(Redbar1 and Redbar2 == 1 ? RsiMa2 - 50 : na, title='QQE Down', style=plot.style_columns, color=color.new(#ff0062, 0))

//// 3. Waddah Attar Explosion V2 shayankm
// plot(trendUp, style=plot.style_columns, linewidth=1, color=trendUp < trendUp[1] ? color.lime : color.green, title='UpTrend', transp=45)
// plot(trendDown, style=plot.style_columns, linewidth=1, color=trendDown < trendDown[1] ? color.orange : color.red, title='DownTrend', transp=45)
// plot(e1, style=plot.style_line, linewidth=2, color=color.new(color.white, 0), title='ExplosionLine')
// plot(DEAD_ZONE, color=color.new(color.blue, 0), linewidth=1, style=plot.style_cross, title='DeadZoneLine')

////// Entry, Exit
// Long, Short Logic with Indicator
bool longSSLCond        = close > BBMC
bool shortSSLCond       = close < BBMC

bool longQQECond        = (Greenbar1[1] == false or Greenbar2[1] == false) and (Greenbar1 and Greenbar2) == 1
bool shortQQECond       = (Redbar1[1] == false or Redbar2[1] == false) and (Redbar1 and Redbar2) == 1

bool longWAECond        = trendUp > 0 and trendDown == 0
bool shortWAECond       = trendDown > 0 and trendUp == 0

// Basic Cond + Long, Short Entry Condition
bool longCond           = (i_longEnabled and inTime) and (longSSLCond and longQQECond and longWAECond) 
bool shortCond          = (i_shortEnabled and inTime) and (shortSSLCond and shortQQECond and shortWAECond) 

// Basic Cond + Long, Short Exit Condition
bool closeLong          = (i_longEnabled) and ((Redbar1[1] == false or Redbar2[1] == false) and (Redbar1 and Redbar2) == 1)
bool closeShort         = (i_shortEnabled) and ((Greenbar1[1] == false or Greenbar2[1] == false) and (Greenbar1 and Greenbar2) == 1)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//                      Position Control
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Long, Short Entry Condition + Not entered Position Yet
bool openLong           = longCond and not (strategy.opentrades.size(strategy.opentrades - 1) > 0) and longFilterFilled
bool openShort          = shortCond and not (strategy.opentrades.size(strategy.opentrades - 1) < 0) and shortFilterFilled
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
i_slLookBack            = input.int    (defval = 30, title = "Lowest Price Before Entry", group = "Stop Loss",  inline = "6", minval = 1, step = 1, tooltip = "Lookback to find the Lowest Price. \nStopLoss is determined by the Lowest price of the look back period. Take Profit is derived from this also by multiplying the StopLoss value by the Risk:Reward multiplier.")

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
i_RRratio               = input.float  (defval = 1.5, title = "R:R Ratio", minval = 0.1 , maxval = 200 , step = 0.1, tooltip = "R:R Ratio > Risk Reward Ratio? It will automatically set Take Profit % based on Stop Loss", inline = "2", group = "Take Profit") 
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
        qtyPercent        := f_calQtyPerc() > 1 ? 1 : f_calQtyPerc()  
        entryQuantity     := f_calQty(qtyPercent)
        strategy.entry(id = "Long", direction = strategy.long, qty = entryQuantity, comment = 'Long(' + syminfo.ticker + '): Started', alert_message = 'Long(' + syminfo.ticker + '): Started')
        f_enteringTradeLabel(x = bar_index + 1, y = close-3*ta.tr, entryPrice = close, qty = qtyPercent, slPrice = longSLPrice, tpPrice = longTPPrice, rrRatio = i_RRratio, direction = "Long")

    if (openShort)
        qtyPercent        := f_calQtyPerc() > 1 ? 1 : f_calQtyPerc()  
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
        _winRate = ( strategy.wintrades / strategy.closedtrades ) * 100
        f_fillCell(dashTable, 0, 4, "Percent Profitable:", str.tostring(_winRate, '##.##') + "%", _winRate < 50 ? redColor : _winRate < 75 ? greenColor : yellowColor, color.white)
        f_fillCell(dashTable, 0, 5, "Profit Factor:", str.tostring(strategy.grossprofit / strategy.grossloss,  '##.###'), strategy.grossprofit > strategy.grossloss ? greenColor : redColor, color.white)
        f_fillCell(dashTable, 0, 6, "Total Trades:", str.tostring(strategy.closedtrades), bgcolor, color.white)
        f_fillCell(dashTable, 0, 8, "Max Wins In A Row:", str.tostring(maxWinRow, '######') , bgcolor, color.white)
        f_fillCell(dashTable, 0, 9, "Max Losses In A Row:", str.tostring(maxLossRow, '######') , bgcolor, color.white)


```

> Detail

https://www.fmz.com/strategy/440092

> Last Modified

2024-01-26 15:22:32
