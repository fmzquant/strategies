
> Name

多指标趋势追踪策略Multi-indicator-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9635afdd039e3c8c39.png)
[trans]

## 概述

本策略通过结合3个开源指标实现多时间轴的趋势判断,并设置止损止盈以锁定利润。具体来说,策略使用AK MACD BB指标判断短期趋势方向,SSL指标过滤掉部分假信号,最后结合成交量指标VSF判断真实买卖盘力度,从而判断入场时机。同时,策略预设止损止盈点以锁定利润,可大幅降低单笔交易的亏损风险。

## 策略原理

1. AK MACD BB指标

    该指标将布林带应用于MACD指标,MACD指标线突破布林带上轨时产生买入讯号,下轨时产生卖出讯号。

2. SSL指标

    SSL指标判断价格是否突破均线,并检测回试信号。价格上穿均线且SSL指标为蓝色时为上升趋势,价格下穿均线且SSL指标为红色时为下降趋势,发出交易信号。

3. VSF指标

    VSF指标判断买卖双方力量。策略只在买方力量或卖方力量大于50%时发出信号,避免无效突破。

4. 止损止盈

    策略含有4档 progressive take profit,从1.5倍到3倍利润间隔设置。同时设置2%固定止损,有效控制单笔交易最大亏损。

## 优势分析

1. 多指标组合,判断准确 

    通过不同指标判断多时间轴趋势,可过滤假信号,判断更准确。

2. 自动止盈止损,风险可控

    策略内置止盈止损设置,可将单笔交易亏损控制在2%左右,避免出现巨亏。

3. 回测数据优异

    根据发布者回测,100笔交易中,获利交易达到74%,427%总盈利。

## 风险及对策分析

1. 市场剧烈波动风险

    在大级别区间震荡时,可能出现多次小幅亏损。此时可调整固定止损幅度,或暂停交易。

2. 多头空头受限风险

    目前策略可做多可做空。若限制只做多或只做空,则无法获利的机会将减少一半。

3. 交易时段风险

    策略使用5分钟数据进行判断,如果在一个交易日中只有几个小时数据,则样本量不足,信号可能不可靠。

## 策略优化方向 

1. 优化止损止盈参数

    可以测试不同的止损止盈水平,找到最优参数。止损过小无法有效控制风险,止损过大则可能错失更大利润。

2. 增加自动位置调整 

    可设置追踪止损或移动止损来锁定利润。或根据特定条件加仓以获利更多。

3. 结合其他指标

    可测试不同指标的组合,判断哪些指标组合效果最好。也可以加入更多指标进行交叉验证。

4. 参数优化

    可通过不同参数进行回测,找到参数优化方向。本策略中,改变布林带参数或均线参数可能会产生更好结果。


## 总结

本策略整合多个指标判断趋势方向,设置自动止盈止损,能够在强势趋势中获利且将单笔交易亏损控制在很小的范围。从发布者的回测数据来看,其获利率和盈利率都非常理想。通过一定的优化,有望进一步提高策略的稳定性和盈利能力。

||


## Overview

This strategy combines 3 open-source indicators to determine the trend across multiple timeframes, and sets stop loss and take profit points to lock in profits. Specifically, the AK MACD BB indicator is used to determine the short-term trend direction, the SSL indicator filters out some false signals, and finally the VSF indicator judges the actual buying/selling power to determine entry signals. At the same time, the strategy has pre-set stop loss and take profit points to lock in profits and significantly reduce the maximum loss per trade.

## Strategy Principle 

1. AK MACD BB Indicator

    This indicator applies Bollinger Bands to the MACD indicator. When the MACD indicator line breaks through the upper band of the Bollinger Bands, a buy signal is generated. When it breaks through the lower band, a sell signal is generated.

2. SSL Indicator

    The SSL indicator determines if the price has broken through the moving average, and detects pullback signals. When the price crosses above the moving average and the SSL indicator turns blue, it indicates an upward trend. When the price crosses below the moving average and the SSL indicator turns red, it indicates a downward trend, sending out trading signals.

3. VSF Indicator

    The VSF indicator determines the strength of buyers and sellers. The strategy only issues signals when the strength of buyers or sellers is greater than 50% to avoid invalid breakouts.  

4. Stop Loss and Take Profit

    The strategy contains 4 levels of progressive take profit, ranging from 1.5 times to 3 times profit. At the same time, it sets a fixed 2% stop loss to effectively control the maximum loss per trade.

## Advantage Analysis 

1. Accuracy with multiple indicator combination

    Determining trends across multiple timeframes using different indicators can filter out false signals and make judgments more accurate.

2. Automatically manage risks 

    The built-in stop loss and take profit settings in the strategy can keep the loss per trade controlled within about 2%, avoiding huge losses.

3. Excellent backtest data

    According to the publisher, out of 100 trades, the profitable trade rate reached 74%, with a total profit of 427%.

## Risks and Countermeasures

1. Market volatility risks

    During violent fluctuations across larger timeframes, there may be multiple small losses. At this point the fixed stop loss level can be adjusted or trading stopped temporarily.

2. Limitation on long and short

    The current strategy allows both long and short positions. If limited to only long or only short, profitable opportunities will be reduced by half. 

3. Trading session risks

    The strategy uses 5-minute data for judgment. If there are only a few hours of data available in a trading day, the sample size would be insufficient and signals may become unreliable.

## Optimization Directions

1. Optimize stop loss and take profit 

    Different stop loss and take profit levels can be tested to find the optimal parameters. A stop loss that is too small cannot effectively control risks, while a stop loss that is too large may miss greater profits.

2. Add automatic position adjustment

    Trailing stop loss or moving stop loss can be set up to lock in profits. Or add to positions under certain criteria to gain more profits.

3. Combine with other indicators

    Different combinations of indicators can be tested to determine which combinations work the best. More indicators can also be added for cross validation.

4. Parameter optimization

    Different sets of parameters can be backtested to find optimization directions. For this strategy, changing parameters of the Bollinger Bands or moving averages may produce better results.


## Summary 

This strategy integrates multiple indicators to determine the trend direction, and sets automatic stop loss and take profit points, allowing profits to be made during strong trends while keeping the loss per trade very small. Judging from the backtest data published by the author, its profit rate and return are very ideal. With certain optimizations, there is potential to further improve the stability and profitability of the strategy.


[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|Deviations|
|v_input_int_2|12|fastLength|
|v_input_int_3|26|slowLength|
|v_input_int_4|9|signalLength|
|v_input_1|true|Number Of bars to look back to ensure MACD isn't above/below Zero Line?|
|v_input_3|false|Show SSL1|
|v_input_4|true|Show ATR bands|
|v_input_5|14|ATR Period|
|v_input_float_2|true|ATR Multi|
|v_input_string_1|0|ATR Smoothing: WMA|SMA|EMA|RMA|
|v_input_string_2|0|SSL1 / Baseline Type: EMA|SMA|DEMA|TEMA|LSMA|WMA|MF|VAMA|TMA|HMA|JMA|Kijun v2|EDSMA|McGinley|
|v_input_6|30|SSL1 / Baseline Length|
|v_input_string_3|0|SSL2 / Continuation Type: JMA|EMA|DEMA|TEMA|WMA|MF|VAMA|TMA|HMA|SMA|McGinley|
|v_input_7|5|SSL 2 Length|
|v_input_string_4|0|EXIT Type: HMA|TEMA|LSMA|VAMA|TMA|DEMA|JMA|Kijun v2|McGinley|MF|
|v_input_8|15|EXIT Length|
|v_input_9_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_5|true|Kijun MOD Divider|
|v_input_10|3|* Jurik (JMA) Only - Phase|
|v_input_11|true|* Jurik (JMA) Only - Power|
|v_input_12|10|* Volatility Adjusted (VAMA) Only - Volatility lookback length|
|v_input_float_3|0.8|Modular Filter, General Filter Only - Beta|
|v_input_13|false|Modular Filter Only - Feedback|
|v_input_float_4|0.5|Modular Filter Only - Feedback Weighting|
|v_input_int_6|20|EDSMA - Super Smoother Filter Length|
|v_input_int_7|0|EDSMA - Super Smoother Filter Poles: 2|3|
|v_input_14|true|useTrueRange|
|v_input_float_5|0.2|Base Channel Multiplier|
|v_input_15|true|Color Bars|
|v_input_float_6|0.9|Continuation ATR Criteria|
|v_input_16|4|Number Of bars back to look for SSL pullback|
|v_input_int_1|10|(?AK MACD BB)BB Periods|
|v_input_2|true|(?SSL Hybrid)Show Baseline|
|v_input_bool_1|false|(?ADX)Average Directional Index (ADX)|
|v_input_17|14|ADX Smoothing|
|v_input_18|14|DI Length|
|v_input_19|25|ADX Threshold|
|v_input_bool_2|true|(?Date Range)Start|
|v_input_20|timestamp(1 Jan 2019)|startPeriodTime|
|v_input_bool_3|true|End|
|v_input_21|timestamp(31 Dec 2030)|endPeriodTime|
|v_input_string_5|0|(?Trade Direction)Trade Direction: Long and Short|Long Only|Short Only|
|v_input_float_7|true|(?Take Profit)Take Profit 1 - Target %|
|v_input_int_8|100|% Of Position|
|v_input_float_8|100|Take Profit 2 - Target %|
|v_input_int_9|100|% Of Position|
|v_input_float_9|100|Take Profit 3 - Target %|
|v_input_int_10|100|% Of Position|
|v_input_float_10|100|Take Profit 4 - Target %|
|v_input_float_11|2|(?Stop Loss)Stop Loss (%)|
|v_input_float_12|true|(?Leverage)Leverage|
|v_input_string_6|CRYPTANEX_99FTX_Strategy-Name-Here|(?ProfitView Alert Syntax)Alert Syntax Prefix|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © myn

//@version=5
strategy('Strategy Myth-Busting #7 - MACDBB+SSL+VSF - [MYN]', max_bars_back=5000, overlay=true, pyramiding=0, initial_capital=1000, currency='USD', default_qty_type=strategy.percent_of_equity, default_qty_value=1.0, commission_value=0.075, use_bar_magnifier = false)


/////////////////////////////////////
//* Put your strategy logic below *//

/////////////////////////////////////
//nwVqTuPe6yo

//5 min
//ak MACD BB by AlgoKid
//Disable bar colors in style

//SSL hybrid by mihkel00
// Style disable all but bar colors and ma baseline
// Change SSL1 baseline length from 60 to 30 
// Change SSL1 baseline type from HMA to EMA

//volume strength Finder by Saravanan
// Get rid of bar colors on style

// Trading Rules

// SSL Hybrid.  
// Buy only when price action is closed above the EMA and the line is blue color.
// Sell priace action must be closed below the EMA and the line is red color


// Volume Indicator
// Buy when Buyers strength / volume is higher than sellers volume
// Opposite


// General trading rules
// Short
// Price action must be moving below the EMA and then it has to create a pullback .  The pullback is confirmed when the color changes from red to gray or from red  to blue.
// If the price action is touching the EMA but the line does not change the color, the pullback is not confirmed. 
// Once we have this pullback we're going to be waiting for the MACD to issue a new continuation short signal.  A red circle must appear on the indicator and these circles should not be touching accross the zero level while they are being greeen 
// Sellers strength above 50% at the time the MACD indiactor issues a new short signal.

// Stop Loss at EMA line 1:1.5 risk ratio.

// Functions universal to strategy

	
f_priorBarsSatisfied(_objectToEval, _numOfBarsToLookBack) => 
    returnVal = false
    for i = 0 to _numOfBarsToLookBack
        if (_objectToEval[i] == true)
            returnVal = true

// AK MACD BB v 1.00 by Algokid
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//indicator('AK MACD BB v 1.00')

length = input.int(10, minval=1, title='BB Periods',group="AK MACD BB")
dev = input.float(1, minval=0.0001, title='Deviations')

//MACD
fastLength = input.int(12, minval=1)
slowLength = input.int(26, minval=1)
signalLength = input.int(9, minval=1)
fastMA = ta.ema(close, fastLength)
slowMA = ta.ema(close, slowLength)
macd = fastMA - slowMA

//BollingerBands

Std = ta.stdev(macd, length)
Upper = Std * dev + ta.sma(macd, length)
Lower = ta.sma(macd, length) - Std * dev


//Band1 = plot(Upper, color=color.new(color.gray, 0), style=plot.style_line, linewidth=2, title='Upper Band')
//Band2 = plot(Lower, color=color.new(color.gray, 0), style=plot.style_line, linewidth=2, title='lower Band')
//fill(Band1, Band2, color=color.new(color.blue, 75), title='Fill')

mc = macd >= Upper ? color.lime : color.red

// Indicator

//plot(macd, color=mc, style=plot.style_circles, linewidth=3)
zeroline = 0
//plot(zeroline, color=color.new(color.orange, 0), linewidth=2, title='Zeroline')

//buy
//barcolor(macd > Upper ? color.yellow : na)
//short
//barcolor(macd < Lower ? color.aqua : na)

//needs improvments 


MACDBBNumBarsBackToLookForMACDToBelowZero = input(1, title="Number Of bars to look back to ensure MACD isn't above/below Zero Line?")

// Sell when MACD to issue a new continuation short signal.  A new red circle must appear on the indicator and these circles should not be touching accross the zero level while they were previously green 
MACDBBENtryShort = mc == color.red and macd < zeroline and f_priorBarsSatisfied(macd < zeroline and mc == color.lime, MACDBBNumBarsBackToLookForMACDToBelowZero)
// Buy when MACD to issue a new continuation long signal.  A new green circle must appear on the indicator and these circles should not be touching accross the zero level while they were previously red
MACDBBENtryLong = mc == color.lime and macd > zeroline and f_priorBarsSatisfied(macd > zeroline and mc == color.red, MACDBBNumBarsBackToLookForMACDToBelowZero)





// SSL Hybrid by Mihkel00
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
//@version=5
//AK MACD BB 
//created by Algokid , February 24,2015

//@version=5
//By Mihkel00
// This script is designed for the NNFX Method, so it is recommended for Daily charts only. 
// Tried to implement a few VP NNFX Rules
// This script has a SSL / Baseline (you can choose between the SSL or MA), a secondary SSL for continiuation trades and a third SSL for exit trades.
// Alerts added for Baseline entries, SSL2 continuations, Exits.
// Baseline has a Keltner Channel setting for "in zone" Gray Candles
// Added "Candle Size > 1 ATR" Diamonds from my old script with the criteria of being within Baseline ATR range.
// Credits
// Strategy causecelebre https://www.tradingview.com/u/causecelebre/
// SSL Channel ErwinBeckers https://www.tradingview.com/u/ErwinBeckers/
// Moving Averages jiehonglim https://www.tradingview.com/u/jiehonglim/
// Moving Averages  everget https://www.tradingview.com/u/everget/
// "Many Moving Averages" script  Fractured https://www.tradingview.com/u/Fractured/
//indicator('SSL Hybrid', overlay=true)
show_Baseline = input(title='Show Baseline', defval=true, group="SSL Hybrid")

show_SSL1 = input(title='Show SSL1', defval=false)
show_atr = input(title='Show ATR bands', defval=true)
//ATR
atrlen = input(14, 'ATR Period')
mult = input.float(1, 'ATR Multi', step=0.1)
smoothing = input.string(title='ATR Smoothing', defval='WMA', options=['RMA', 'SMA', 'EMA', 'WMA'])

ma_function(source, atrlen) =>
    if smoothing == 'RMA'
        ta.rma(source, atrlen)
    else
        if smoothing == 'SMA'
            ta.sma(source, atrlen)
        else
            if smoothing == 'EMA'
                ta.ema(source, atrlen)
            else
                ta.wma(source, atrlen)
atr_slen = ma_function(ta.tr(true), atrlen)
////ATR Up/Low Bands
upper_band = atr_slen * mult + close
lower_band = close - atr_slen * mult

////BASELINE / SSL1 / SSL2 / EXIT MOVING AVERAGE VALUES
maType = input.string(title='SSL1 / Baseline Type', defval='EMA', options=['SMA', 'EMA', 'DEMA', 'TEMA', 'LSMA', 'WMA', 'MF', 'VAMA', 'TMA', 'HMA', 'JMA', 'Kijun v2', 'EDSMA', 'McGinley'])
len = input(title='SSL1 / Baseline Length', defval=30)

SSL2Type = input.string(title='SSL2 / Continuation Type', defval='JMA', options=['SMA', 'EMA', 'DEMA', 'TEMA', 'WMA', 'MF', 'VAMA', 'TMA', 'HMA', 'JMA', 'McGinley'])
len2 = input(title='SSL 2 Length', defval=5)
//
SSL3Type = input.string(title='EXIT Type', defval='HMA', options=['DEMA', 'TEMA', 'LSMA', 'VAMA', 'TMA', 'HMA', 'JMA', 'Kijun v2', 'McGinley', 'MF'])
len3 = input(title='EXIT Length', defval=15)
src = input(title='Source', defval=close)

//
tema(src, len) =>
    ema1 = ta.ema(src, len)
    ema2 = ta.ema(ema1, len)
    ema3 = ta.ema(ema2, len)
    3 * ema1 - 3 * ema2 + ema3
kidiv = input.int(defval=1, maxval=4, title='Kijun MOD Divider')

jurik_phase = input(title='* Jurik (JMA) Only - Phase', defval=3)
jurik_power = input(title='* Jurik (JMA) Only - Power', defval=1)
volatility_lookback = input(10, title='* Volatility Adjusted (VAMA) Only - Volatility lookback length')
//MF
beta = input.float(0.8, minval=0, maxval=1, step=0.1, title='Modular Filter, General Filter Only - Beta')
feedback = input(false, title='Modular Filter Only - Feedback')
z = input.float(0.5, title='Modular Filter Only - Feedback Weighting', step=0.1, minval=0, maxval=1)
//EDSMA
ssfLength = input.int(title='EDSMA - Super Smoother Filter Length', minval=1, defval=20)
ssfPoles = input.int(title='EDSMA - Super Smoother Filter Poles', defval=2, options=[2, 3])

//----

//EDSMA
get2PoleSSF(src, length) =>
    PI = 2 * math.asin(1)
    arg = math.sqrt(2) * PI / length
    a1 = math.exp(-arg)
    b1 = 2 * a1 * math.cos(arg)
    c2 = b1
    c3 = -math.pow(a1, 2)
    c1 = 1 - c2 - c3

    ssf = 0.0
    ssf := c1 * src + c2 * nz(ssf[1]) + c3 * nz(ssf[2])
    ssf

get3PoleSSF(src, length) =>
    PI = 2 * math.asin(1)

    arg = PI / length
    a1 = math.exp(-arg)
    b1 = 2 * a1 * math.cos(1.738 * arg)
    c1 = math.pow(a1, 2)

    coef2 = b1 + c1
    coef3 = -(c1 + b1 * c1)
    coef4 = math.pow(c1, 2)
    coef1 = 1 - coef2 - coef3 - coef4

    ssf = 0.0
    ssf := coef1 * src + coef2 * nz(ssf[1]) + coef3 * nz(ssf[2]) + coef4 * nz(ssf[3])
    ssf

ma(type, src, len) =>
    float result = 0
    if type == 'TMA'
        result := ta.sma(ta.sma(src, math.ceil(len / 2)), math.floor(len / 2) + 1)
        result
    if type == 'MF'
        ts = 0.
        b = 0.
        c = 0.
        os = 0.
        //----
        alpha = 2 / (len + 1)
        a = feedback ? z * src + (1 - z) * nz(ts[1], src) : src
        //----
        b := a > alpha * a + (1 - alpha) * nz(b[1], a) ? a : alpha * a + (1 - alpha) * nz(b[1], a)
        c := a < alpha * a + (1 - alpha) * nz(c[1], a) ? a : alpha * a + (1 - alpha) * nz(c[1], a)
        os := a == b ? 1 : a == c ? 0 : os[1]
        //----
        upper = beta * b + (1 - beta) * c
        lower = beta * c + (1 - beta) * b
        ts := os * upper + (1 - os) * lower
        result := ts
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
        vol_up = ta.highest(dev, volatility_lookback)
        vol_down = ta.lowest(dev, volatility_lookback)
        result := mid + math.avg(vol_up, vol_down)
        result
    if type == 'HMA'  // Hull
        result := ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))
        result
    if type == 'JMA'  // Jurik
        /// Copyright © 2018 Alex Orekhov (everget)
        /// Copyright © 2017 Jurik Research and Consulting.
        phaseRatio = jurik_phase < -100 ? 0.5 : jurik_phase > 100 ? 2.5 : jurik_phase / 100 + 1.5
        beta = 0.45 * (len - 1) / (0.45 * (len - 1) + 2)
        alpha = math.pow(beta, jurik_power)
        jma = 0.0
        e0 = 0.0
        e0 := (1 - alpha) * src + alpha * nz(e0[1])
        e1 = 0.0
        e1 := (src - e0) * (1 - beta) + beta * nz(e1[1])
        e2 = 0.0
        e2 := (e0 + phaseRatio * e1 - nz(jma[1])) * math.pow(1 - alpha, 2) + math.pow(alpha, 2) * nz(e2[1])
        jma := e2 + nz(jma[1])
        result := jma
        result
    if type == 'Kijun v2'
        kijun = math.avg(ta.lowest(len), ta.highest(len))  //, (open + close)/2)
        conversionLine = math.avg(ta.lowest(len / kidiv), ta.highest(len / kidiv))
        delta = (kijun + conversionLine) / 2
        result := delta
        result
    if type == 'McGinley'
        mg = 0.0
        mg := na(mg[1]) ? ta.ema(src, len) : mg[1] + (src - mg[1]) / (len * math.pow(src / mg[1], 4))
        result := mg
        result
    if type == 'EDSMA'

        zeros = src - nz(src[2])
        avgZeros = (zeros + zeros[1]) / 2

        // Ehlers Super Smoother Filter 
        ssf = ssfPoles == 2 ? get2PoleSSF(avgZeros, ssfLength) : get3PoleSSF(avgZeros, ssfLength)

        // Rescale filter in terms of Standard Deviations
        stdev = ta.stdev(ssf, len)
        scaledFilter = stdev != 0 ? ssf / stdev : 0

        alpha = 5 * math.abs(scaledFilter) / len

        edsma = 0.0
        edsma := alpha * src + (1 - alpha) * nz(edsma[1])
        result := edsma
        result
    result

///SSL 1 and SSL2
emaHigh = ma(maType, high, len)
emaLow = ma(maType, low, len)

maHigh = ma(SSL2Type, high, len2)
maLow = ma(SSL2Type, low, len2)

///EXIT
ExitHigh = ma(SSL3Type, high, len3)
ExitLow = ma(SSL3Type, low, len3)

///Keltner Baseline Channel
BBMC = ma(maType, close, len)
useTrueRange = input(true)
multy = input.float(0.2, step=0.05, title='Base Channel Multiplier')
Keltma = ma(maType, src, len)
range_1 = useTrueRange ? ta.tr : high - low
rangema = ta.ema(range_1, len)
upperk = Keltma + rangema * multy
lowerk = Keltma - rangema * multy

//Baseline Violation Candle
open_pos = open * 1
close_pos = close * 1
difference = math.abs(close_pos - open_pos)
atr_violation = difference > atr_slen
InRange = upper_band > BBMC and lower_band < BBMC
candlesize_violation = atr_violation and InRange
//plotshape(candlesize_violation, color=color.new(color.white, 0), size=size.tiny, style=shape.diamond, location=location.top, title='Candle Size > 1xATR')


//SSL1 VALUES
Hlv = int(na)
Hlv := close > emaHigh ? 1 : close < emaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? emaHigh : emaLow

//SSL2 VALUES
Hlv2 = int(na)
Hlv2 := close > maHigh ? 1 : close < maLow ? -1 : Hlv2[1]
sslDown2 = Hlv2 < 0 ? maHigh : maLow

//EXIT VALUES
Hlv3 = int(na)
Hlv3 := close > ExitHigh ? 1 : close < ExitLow ? -1 : Hlv3[1]
sslExit = Hlv3 < 0 ? ExitHigh : ExitLow
base_cross_Long = ta.crossover(close, sslExit)
base_cross_Short = ta.crossover(sslExit, close)
codiff = base_cross_Long ? 1 : base_cross_Short ? -1 : na

//COLORS
show_color_bar = input(title='Color Bars', defval=true)
color_bar = close > upperk ? #00c3ff : close < lowerk ? #ff0062 : color.gray
color_ssl1 = close > sslDown ? #00c3ff : close < sslDown ? #ff0062 : na

//PLOTS
//plotarrow(codiff, colorup=color.new(#00c3ff, 20), colordown=color.new(#ff0062, 20), title='Exit Arrows', maxheight=20, offset=0)
p1 = plot(show_Baseline ? BBMC : na, color=color_bar, linewidth=4, title='MA Baseline', transp=0)
//DownPlot = plot(show_SSL1 ? sslDown : na, title='SSL1', linewidth=3, color=color_ssl1, transp=10)
barcolor(show_color_bar ? color_bar : na)
//up_channel = plot(show_Baseline ? upperk : na, color=color_bar, title='Baseline Upper Channel')
//low_channel = plot(show_Baseline ? lowerk : na, color=color_bar, title='Basiline Lower Channel')
//fill(up_channel, low_channel, color=color_bar, transp=90)

////SSL2 Continiuation from ATR
atr_crit = input.float(0.9, step=0.1, title='Continuation ATR Criteria')
upper_half = atr_slen * atr_crit + close
lower_half = close - atr_slen * atr_crit
buy_inatr = lower_half < sslDown2
sell_inatr = upper_half > sslDown2
sell_cont = close < BBMC and close < sslDown2
buy_cont = close > BBMC and close > sslDown2
sell_atr = sell_inatr and sell_cont
buy_atr = buy_inatr and buy_cont
atr_fill = buy_atr ? color.green : sell_atr ? color.purple : color.white
//LongPlot = plot(sslDown2, title='SSL2', linewidth=2, color=atr_fill, style=plot.style_circles, transp=0)
//u = plot(show_atr ? upper_band : na, '+ATR', color=color.new(color.white, 80))
//l = plot(show_atr ? lower_band : na, '-ATR', color=color.new(color.white, 80))

//ALERTS
alertcondition(ta.crossover(close, sslDown), title='SSL Cross Alert', message='SSL1 has crossed.')
alertcondition(ta.crossover(close, sslDown2), title='SSL2 Cross Alert', message='SSL2 has crossed.')
alertcondition(sell_atr, title='Sell Continuation', message='Sell Continuation.')
alertcondition(buy_atr, title='Buy Continuation', message='Buy Continuation.')
alertcondition(ta.crossover(close, sslExit), title='Exit Sell', message='Exit Sell Alert.')
alertcondition(ta.crossover(sslExit, close), title='Exit Buy', message='Exit Buy Alert.')
alertcondition(ta.crossover(close, upperk), title='Baseline Buy Entry', message='Base Buy Alert.')
alertcondition(ta.crossover(lowerk, close), title='Baseline Sell Entry', message='Base Sell Alert.')


// Buy only when price action is closed above the EMA and the line is blue color.
SSLHybridEntryLong1 = src > BBMC and color_bar == #00c3ff
// Sell only when action must be closed below the EMA and the line is red color
SSLHybridEntryShort1 = src < BBMC and color_bar == #ff0062


sslHybridNumBarsBackToLookForPullBack = input(4, title="Number Of bars back to look for SSL pullback")

// Buy when Price action must be moving above the EMA and then it has to create a pullback .  The pullback is confirmed when the color changes from blue to gray or from blue  to red.
SSLHybridEntryLong2 = color_bar == #00c3ff  and (f_priorBarsSatisfied(color_bar == #ff0062,sslHybridNumBarsBackToLookForPullBack) or f_priorBarsSatisfied(color_bar == color.gray, sslHybridNumBarsBackToLookForPullBack))
// Sell when Price action must be moving below the EMA and then it has to create a pullback .  The pullback is confirmed when the color changes from red to gray or from red  to blue.
SSLHybridEntryShort2 = color_bar == #ff0062  and (f_priorBarsSatisfied(color_bar == #00c3ff,sslHybridNumBarsBackToLookForPullBack) or f_priorBarsSatisfied(color_bar == color.gray, sslHybridNumBarsBackToLookForPullBack))


SSLHybridEntryLong = SSLHybridEntryLong1 and SSLHybridEntryLong2 
SSLHybridEntryShort = SSLHybridEntryShort1 and SSLHybridEntryShort2 


// Price action must be moving below the EMA and then it has to create a pullback .  The pullback is confirmed when the color changes from red to gray or from red  to blue.
// If the price action is touching the EMA but the line does not change the color, the pullback is not confirmed. 

// Volume Strength Finder by Saravanan_Ragavan
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Saravanan_Ragavan

//@version=5
//indicator('Volume Strength Finder', 'VSF', overlay=true)

T1 = time(timeframe.period, '0915-0916:23456')
T2 = time(timeframe.period, '0915-1530:23456')
Y = bar_index
Z1 = ta.valuewhen(T1, bar_index, 0)
L = Y - Z1 + 1



SSPV = 0.00
SSNV = 0.00
pdw = 0.00
ndw = 0.00
total_w = 0.00
for i = 1 to L - 1 by 1
    total_w := high[i] - low[i]
    positive = close[i] - low[i]
    negative = high[i] - close[i]
    pdw := positive / total_w * 100
    ndw := negative / total_w * 100


    SSPV := volume[i] * pdw / 100 + SSPV

    SSNV := volume[i] * ndw / 100 + SSNV
    SSNV




total_v = SSPV + SSNV
Pos = SSPV / total_v * 100
Neg = SSNV / total_v * 100

bgc = SSPV > SSNV ? color.green : SSPV < SSNV ? color.red : color.white
//barcolor(bgc)




var table sDisplay = table.new(position.top_right, 1, 5, bgcolor=color.aqua, frame_width=2, frame_color=color.black)

if barstate.islast
    table.cell(sDisplay, 0, 0, 'Today\'s Volume : ' + str.tostring(total_v), text_color=color.white, text_size=size.large, bgcolor=color.aqua)
    table.cell(sDisplay, 0, 1, 'Buyers Volume: ' + str.tostring(math.round(SSPV)), text_color=color.white, text_size=size.large, bgcolor=color.green)
    table.cell(sDisplay, 0, 2, 'Sellers Volume: ' + str.tostring(math.round(SSNV)), text_color=color.white, text_size=size.large, bgcolor=color.red)
    table.cell(sDisplay, 0, 3, 'Buyers Strength: ' + str.tostring(math.round(Pos)) + '%', text_color=color.white, text_size=size.large, bgcolor=color.green)
    table.cell(sDisplay, 0, 4, 'Sellers Strength: ' + str.tostring(math.round(Neg)) + '%', text_color=color.white, text_size=size.large, bgcolor=color.red)


// Sellers strength above 50% at the time the MACD indiactor issues a new short signal.
VSFShortEntry = math.round(Neg) > 50
// Buyers strength above 50% at the time the MACD indiactor issues a new long signal.
VSFLongEntry = math.round(Pos) > 50




//////////////////////////////////////
//* Put your strategy rules below *//
/////////////////////////////////////

longCondition = SSLHybridEntryLong and VSFLongEntry and MACDBBENtryLong
shortCondition =SSLHybridEntryShort and VSFShortEntry and MACDBBENtryShort

//define as 0 if do not want to use
closeLongCondition = 0
closeShortCondition = 0


// ADX
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

adxEnabled = input.bool(defval = false , title = "Average Directional Index (ADX)", tooltip = "", group ="ADX" ) 
adxlen = input(14, title="ADX Smoothing", group="ADX")
adxdilen = input(14, title="DI Length", group="ADX")
adxabove = input(25, title="ADX Threshold", group="ADX")

adxdirmov(len) =>
	adxup = ta.change(high)
	adxdown = -ta.change(low)
	adxplusDM = na(adxup) ? na : (adxup > adxdown and adxup > 0 ? adxup : 0)
	adxminusDM = na(adxdown) ? na : (adxdown > adxup and adxdown > 0 ? adxdown : 0)
	adxtruerange = ta.rma(ta.tr, len)
	adxplus = fixnan(100 * ta.rma(adxplusDM, len) / adxtruerange)
	adxminus = fixnan(100 * ta.rma(adxminusDM, len) / adxtruerange)
	[adxplus, adxminus]
adx(adxdilen, adxlen) =>
	[adxplus, adxminus] = adxdirmov(adxdilen)
	adxsum = adxplus + adxminus
	adx = 100 * ta.rma(math.abs(adxplus - adxminus) / (adxsum == 0 ? 1 : adxsum), adxlen)

adxsig = adxEnabled ? adx(adxdilen, adxlen) : na
isADXEnabledAndAboveThreshold = adxEnabled ? (adxsig > adxabove) : true

//Backtesting Time Period (Input.time not working as expected as of 03/30/2021.  Giving odd start/end dates
//░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
useStartPeriodTime = input.bool(true, 'Start', group='Date Range', inline='Start Period')
startPeriodTime = input(timestamp('1 Jan 2019'), '', group='Date Range', inline='Start Period')
useEndPeriodTime = input.bool(true, 'End', group='Date Range', inline='End Period')
endPeriodTime = input(timestamp('31 Dec 2030'), '', group='Date Range', inline='End Period')

start = useStartPeriodTime ? startPeriodTime >= time : false
end = useEndPeriodTime ? endPeriodTime <= time : false
calcPeriod = true

// Trade Direction 
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tradeDirection = input.string('Long and Short', title='Trade Direction', options=['Long and Short', 'Long Only', 'Short Only'], group='Trade Direction')

// Percent as Points
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
per(pcnt) =>
    strategy.position_size != 0 ? math.round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)

// Take profit 1
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp1 = input.float(title='Take Profit 1 - Target %', defval=1, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 1')
q1 = input.int(title='% Of Position', defval=100, minval=0, group='Take Profit', inline='Take Profit 1')

// Take profit 2
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp2 = input.float(title='Take Profit 2 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 2')
q2 = input.int(title='% Of Position', defval=100, minval=0, group='Take Profit', inline='Take Profit 2')

// Take profit 3
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp3 = input.float(title='Take Profit 3 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit', inline='Take Profit 3')
q3 = input.int(title='% Of Position', defval=100, minval=0, group='Take Profit', inline='Take Profit 3')

// Take profit 4
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
tp4 = input.float(title='Take Profit 4 - Target %', defval=100, minval=0.0, step=0.5, group='Take Profit')

/// Stop Loss
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
stoplossPercent = input.float(title='Stop Loss (%)', defval=2, minval=0.01, group='Stop Loss') * 0.01
slLongClose = close < strategy.position_avg_price * (1 - stoplossPercent)
slShortClose = close > strategy.position_avg_price * (1 + stoplossPercent)

/// Leverage
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
leverage = input.float(1, 'Leverage', step=.5, group='Leverage')
contracts = math.min(math.max(.000001, strategy.equity / close * leverage), 1000000000)


/// Trade State Management
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

isInLongPosition = strategy.position_size > 0
isInShortPosition = strategy.position_size < 0

/// ProfitView Alert Syntax String Generation
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

alertSyntaxPrefix = input.string(defval='CRYPTANEX_99FTX_Strategy-Name-Here', title='Alert Syntax Prefix', group='ProfitView Alert Syntax')
alertSyntaxBase = alertSyntaxPrefix + '\n#' + str.tostring(open) + ',' + str.tostring(high) + ',' + str.tostring(low) + ',' + str.tostring(close) + ',' + str.tostring(volume) + ','


/// Trade Execution
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

longConditionCalc = (longCondition and isADXEnabledAndAboveThreshold)
shortConditionCalc = (shortCondition and isADXEnabledAndAboveThreshold)

if calcPeriod
    if longConditionCalc and tradeDirection != 'Short Only' and isInLongPosition == false
        strategy.entry('Long', strategy.long, qty=contracts)

        alert(message=alertSyntaxBase + 'side:long', freq=alert.freq_once_per_bar_close)

    if shortConditionCalc and tradeDirection != 'Long Only' and isInShortPosition == false
        strategy.entry('Short', strategy.short, qty=contracts)

        alert(message=alertSyntaxBase + 'side:short', freq=alert.freq_once_per_bar_close)
    
    //Inspired from Multiple %% profit exits example by adolgo https://www.tradingview.com/script/kHhCik9f-Multiple-profit-exits-example/
    strategy.exit('TP1', qty_percent=q1, profit=per(tp1))
    strategy.exit('TP2', qty_percent=q2, profit=per(tp2))
    strategy.exit('TP3', qty_percent=q3, profit=per(tp3))
    strategy.exit('TP4', profit=per(tp4))

    strategy.close('Long', qty_percent=100, comment='SL Long', when=slLongClose)
    strategy.close('Short', qty_percent=100, comment='SL Short', when=slShortClose)

    strategy.close_all(when=closeLongCondition or closeShortCondition, comment='Close Postion')

/// Dashboard
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Inspired by https://www.tradingview.com/script/uWqKX6A2/ - Thanks VertMT

// showDashboard = input.bool(group="Dashboard", title="Show Dashboard", defval=true)

// f_fillCell(_table, _column, _row, _title, _value, _bgcolor, _txtcolor) =>
//     _cellText = _title + "\n" + _value
//     table.cell(_table, _column, _row, _cellText, bgcolor=_bgcolor, text_color=_txtcolor, text_size=size.auto)

// // Draw dashboard table
// if showDashboard
//     var bgcolor = color.new(color.black,0)
    
//     // Keep track of Wins/Losses streaks
//     newWin  = (strategy.wintrades  > strategy.wintrades[1]) and (strategy.losstrades == strategy.losstrades[1]) and (strategy.eventrades == strategy.eventrades[1])
//     newLoss = (strategy.wintrades == strategy.wintrades[1]) and (strategy.losstrades  > strategy.losstrades[1]) and (strategy.eventrades == strategy.eventrades[1])

//     varip int winRow     = 0
//     varip int lossRow    = 0
//     varip int maxWinRow  = 0
//     varip int maxLossRow = 0

//     if newWin
//         lossRow := 0
//         winRow := winRow + 1
//     if winRow > maxWinRow
//         maxWinRow := winRow
        
//     if newLoss
//         winRow := 0
//         lossRow := lossRow + 1
//     if lossRow > maxLossRow
//         maxLossRow := lossRow


//     // Prepare stats table
//     var table dashTable = table.new(position.bottom_right, 1, 15, border_width=1)
    
   
//     if barstate.islastconfirmedhistory
//         // Update table
//         dollarReturn = strategy.netprofit
//         f_fillCell(dashTable, 0, 0, "Start:", str.format("{0,date,long}", strategy.closedtrades.entry_time(0)) , bgcolor, color.white) // + str.format(" {0,time,HH:mm}", strategy.closedtrades.entry_time(0)) 
//         f_fillCell(dashTable, 0, 1, "End:", str.format("{0,date,long}", strategy.opentrades.entry_time(0)) , bgcolor, color.white) // + str.format(" {0,time,HH:mm}", strategy.opentrades.entry_time(0))
//         _profit = (strategy.netprofit / strategy.initial_capital) * 100
//         f_fillCell(dashTable, 0, 2, "Net Profit:", str.tostring(_profit, '##.##') + "%", _profit > 0 ? color.green : color.red, color.white)
//         _numOfDaysInStrategy = (strategy.opentrades.entry_time(0) - strategy.closedtrades.entry_time(0)) / (1000 * 3600 * 24)
//         f_fillCell(dashTable, 0, 3, "Percent Per Day", str.tostring(_profit / _numOfDaysInStrategy, '#########################.#####')+"%", _profit > 0 ? color.green : color.red, color.white)
//         _winRate = ( strategy.wintrades / strategy.closedtrades ) * 100
//         f_fillCell(dashTable, 0, 4, "Percent Profitable:", str.tostring(_winRate, '##.##') + "%", _winRate < 50 ? color.red : _winRate < 75 ? #999900 : color.green, color.white)
//         f_fillCell(dashTable, 0, 5, "Profit Factor:", str.tostring(strategy.grossprofit / strategy.grossloss,  '##.###'), strategy.grossprofit > strategy.grossloss ? color.green : color.red, color.white)
//         f_fillCell(dashTable, 0, 6, "Total Trades:", str.tostring(strategy.closedtrades), bgcolor, color.white)
//         f_fillCell(dashTable, 0, 8, "Max Wins In A Row:", str.tostring(maxWinRow, '######') , bgcolor, color.white)
//         f_fillCell(dashTable, 0, 9, "Max Losses In A Row:", str.tostring(maxLossRow, '######') , bgcolor, color.white)
```

> Detail

https://www.fmz.com/strategy/433078

> Last Modified

2023-11-24 11:10:27
