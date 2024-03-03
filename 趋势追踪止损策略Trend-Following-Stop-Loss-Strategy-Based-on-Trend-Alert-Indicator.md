
> Name

趋势追踪止损策略Trend-Following-Stop-Loss-Strategy-Based-on-Trend-Alert-Indicator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/185cdad5f8ccc679490.png)
[trans]
## 概述

趋势追踪止损策略是一个基于趋势指标TrendAlert的追踪止损交易策略。它通过TrendAlert指标判断趋势方向,实现趋势跟踪入场。同时它利用ATR指标设定止损位,实现风险控制。

## 策略原理

该策略主要由以下几个部分组成:

1. TrendAlert指标判断趋势方向。当TrendAlert大于0时为看涨信号,小于0时为看跌信号。

2. ATR指标计算近期价格波动范围。ATR乘以ATR止损倍数atrStopMultiplier作为固定止损位。

3. 最低价lowestLow和最高价highestHigh结合ATR止损构建追踪止损。使用structure参数控制是否启用。

4. 根据趋势信号方向进入做多或做空头寸。入场后设置Take Profit和Stop Loss。

5. 当价格触发止损或止盈后平仓头寸。

该策略通过趋势判断过滤假信号,追踪止损控制风险,目标获利确保盈利,全面提高交易系统稳定性。

## 优势分析

该策略主要具有以下优势:

1. 趋势过滤和追踪止损双重保证,避免追逐市场噪音,确保交易风险可控。

2. ATR自适应止损设定防止过度优化,适用于多种市场环境。

3. 目标止盈确保盈利,避免吃掉利润。

4. 策略逻辑清晰简洁,容易理解修改,适合量化交易者二次开发。

5. Pine脚本语言编写,可直接在TradingView平台使用,不需编程基础。

## 风险分析

该策略也存在一些风险:

1. 趋势判断失误可能导致不必要入场和止损被触发。可适当宽松止损位或过滤入场信号。

2. 行情剧烈波动时,ATR可能低估真实波幅。这时可增大ATR止损倍数atrStopMultiplier。

3. 目標止盈可能限制策略获利空间。可根據市场调整limitMultiplier参数。

4. 代码exist逻辑仅基于价格,实际应结合时间管理。

## 优化方向  

该策略可从以下方面进行优化:

1. 优化参数ATR长度atrLength和止损倍数atrStopMultiplier,调整止损算法的敏感度。

2. 尝试不同的趋势判断指标,寻找更好的入场时机。

3. 根据具体交易品种特点选择或调整目标止盈参数。

4. 增加时间止损机制,避免单子过夜带来的风险。

5. 结合交易量指标过滤假突破提高策略稳定性。

## 总结

本策略总体来说是一个非常实用的趋势跟踪止损策略。它利用指标判断趋势方向实现趋势跟踪,同时设定自适应止损确保风险控制。该策略逻辑清晰,使用简单,非常适合初学者学习。同时也为高级策略开发提供了一个良好的交易策略框架,值得量化交易者深入研究和优化。

||

## Overview

The Trend Following Stop Loss strategy is a trend tracking stop loss trading strategy based on the TrendAlert indicator. It determines the trend direction through the TrendAlert indicator to implement trend tracking entry. At the same time, it uses the ATR indicator to set the stop loss to control risks.

## Strategy Logic  

The strategy consists of the following main parts:

1. The TrendAlert indicator judges the trend direction. When TrendAlert is greater than 0, it is a bullish signal. When less than 0, it is a bearish signal.

2. The ATR indicator calculates the price fluctuation range recently. ATR multiplied by the ATR stop loss multiplier atrStopMultiplier is used as the fixed stop loss.

3. The lowest low lowestLow and highest high highestHigh together with ATR stop loss construct the tracking stop loss. The structure parameter controls whether it is enabled.

4. Enter long or short positions according to the trend signal direction. After entering, set Take Profit and Stop Loss.  

5. Close positions when price triggers stop loss or take profit.

The strategy filters false signals through trend judgment, controls risks through tracking stop loss, ensures profitability through take profit, and improves the stability of the trading system.

## Advantage Analysis  

The main advantages of this strategy are:

1. The dual guarantee of trend filtering and tracking stop loss avoids chasing market noise and ensures controllable trading risks.

2. ATR adaptive stop loss setting prevents over optimization and is suitable for various market environments. 

3. Take profit ensures profitability and prevents eating up profits.

4. The strategy logic is clear and concise, easy to understand and modify, suitable for quantitative traders' secondary development.

5. Written in Pine Script language, can be used directly on the TradingView platform without programming skills.

## Risk Analysis

There are also some risks in this strategy:  

1. Incorrect trend judgment may cause unnecessary entry and stop loss trigger. You can appropriately relax the stop loss or filter entry signals.

2. When the market fluctuates violently, ATR may underestimate the true amplitude. At this time, the ATR stop loss multiplier atrStopMultiplier can be increased.

3. The target take profit may limit the profit space of the strategy. Adjust the limitMultiplier parameter according market. 

4. The exist logic based only on price should be combined with time management.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize parameters ATR length atrLength and stop loss multiplier atrStopMultiplier to adjust the sensitivity of the stop loss algorithm.

2. Try different trend indicators to find better entry opportunities.  

3. Select or adjust the target take profit parameter according to the characteristics of specific trading varieties.

4. Increase time stop loss mechanism to avoid overnight risks. 

5. Filter false breakouts by combining trading volume indicators to improve strategy stability.

## Conclusion  

In general, this is a very practical trend tracking stop loss strategy. It uses indicators to determine the trend direction to achieve trend tracking, while setting adaptive stops to ensure risk control. The strategy logic is clear and easy to use, making it ideal for beginners to learn. At the same time, it also provides a good trading strategy framework for advanced strategy development, which is worth quantitative traders' in-depth research and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|TrendAlert: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|15|ATR Length|
|v_input_bool_1|true|Use Structure?|
|v_input_int_2|8|How Far To Look Back For High/Lows|
|v_input_float_1|0.2|ATR Multiplier|
|v_input_float_2|0.5|Limit Multiplier|
|v_input_int_3|false|Pine Connector ID|
|v_input_string_1|ETHUSD|personilized currency|
|v_input_int_4|10|risk in % to send|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-29 00:00:00
end: 2024-02-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © jaque_verdatre

//@version=5
strategy("TrendAlert Based", overlay = true)

// Get inputs
TrendAlert = input.source(close, "TrendAlert")
atrLength = input.int(title="ATR Length", defval=15, minval=1)
useStructure = input.bool(title="Use Structure?", defval=true)
lookback = input.int(title="How Far To Look Back For High/Lows", defval=8, minval=1)
atrStopMultiplier = input.float(title="ATR Multiplier", defval=0.2, minval=0.1)
LimitMultiplier = input.float(title = "Limit Multiplier", defval = 0.5, minval = 0.1)
PineConnectorID = input.int(title = "Pine Connector ID",defval = 0)
CurrencyToSend = input.string(title = "personilized currency", defval = "ETHUSD")
Risk = input.int(title = "risk in % to send", defval = 10, minval = 1)

// Calculate data
atr = ta.atr(atrLength)
lowestLow = ta.lowest(low, lookback)
highestHigh = ta.highest(high, lookback)
longStop = (useStructure ? lowestLow : close) - atr * atrStopMultiplier
shortStop = (useStructure ? highestHigh : close) + atr * atrStopMultiplier

// Draw data to chart
plot(atr, color=color.rgb(33, 149, 243), title="ATR", display = display.none)
plot(longStop, color=color.green, title="Long Trailing Stop")
plot(shortStop, color=color.red, title="Short Trailing Stop")

var float LimitL = na
var float LimitS = na
var float LPosPrice = na
var float SPosPrice = na
var float LPosLongStop = na
var float SPosShortStop = na

KnowLimit (PosPrice, PosStop) =>
    (PosPrice-PosStop)*LimitMultiplier+PosPrice


NotInTrade = strategy.position_size == 0
InLongTrade = strategy.position_size > 0
InShortTrade = strategy.position_size < 0

longCondition = TrendAlert > 0 and NotInTrade
if (longCondition)
    LPosPrice := close
    LPosLongStop := longStop
    LimitL := KnowLimit(LPosPrice, LPosLongStop)
    strategy.entry("long", strategy.long)
    LTPPip = LimitL-LPosPrice
    LSLPip = LPosPrice-longStop
    alert(str.tostring(PineConnectorID)+',buy,'+str.tostring(CurrencyToSend)+',risk='+str.tostring(Risk)+',sl='+str.tostring(LSLPip)+'tp='+str.tostring(LTPPip), alert.freq_once_per_bar_close)
    strategy.exit("exit", "long", stop = longStop, limit = LimitL)

shortCondition = TrendAlert < 0 and NotInTrade
if (shortCondition)
    SPosPrice := close
    SPosShortStop := shortStop
    LimitS := KnowLimit(SPosPrice, SPosShortStop)
    strategy.entry("short", strategy.short)
    STPPip = SPosPrice-LimitS
    SSLPip = shortStop - SPosPrice
    alert(str.tostring(PineConnectorID)+',sell,ETHUSD,risk=10,sl='+str.tostring(SSLPip)+'tp='+str.tostring(STPPip), alert.freq_once_per_bar_close)
    strategy.exit("exit", "short", stop = shortStop, limit = LimitS)

plotshape(longCondition, color = color.green, style = shape.labelup, location = location.belowbar, size = size.normal, title = "Long Condition")
plotshape(shortCondition, color = color.red, style = shape.labeldown, location = location.abovebar, size = size.normal, title = "Short Condition")

if (InShortTrade)
    LimitL := close
    LPosLongStop := close
    LPosPrice := close

PlotLongTakeProfit = plot(LimitL, color = InLongTrade ? color.rgb(0, 255, 64) : color.rgb(120, 123, 134, 100), title = "Long Take Profit")
PlotLongStopLoss = plot(LPosLongStop, color = InLongTrade ? color.rgb(255, 0, 0) : color.rgb(120, 123, 134, 100), title = "Long Stop Loss")
PlotLongPosPrice = plot(LPosPrice, color = InLongTrade ? color.gray : color.rgb(120, 123, 134, 100), title = "Long Position Price")

if (InLongTrade)
    LimitS := close
    SPosShortStop := close
    SPosPrice := close

PlotShortTakeProfit = plot(LimitS, color = InShortTrade ? color.rgb(0, 255, 64) : color.rgb(120, 123, 134, 100), title = "Short Take Profit")
PlotShortStopLoss = plot(SPosShortStop, color = InShortTrade ? color.rgb(255, 0, 0) : color.rgb(120, 123, 134, 100), title = "Short Stop Loss")
PlotShortPosPrice = plot(SPosPrice, color = InShortTrade ? color.gray : color.rgb(120, 123, 134, 100), title = "Short Position Price")

fill(PlotLongPosPrice, PlotLongTakeProfit, color = InLongTrade ? color.rgb(0, 255, 0, 95) : color.rgb(0, 255, 0, 100))
fill(PlotShortPosPrice, PlotShortTakeProfit, color = InShortTrade ? color.rgb(0, 255, 0, 95) : color.rgb(0, 255, 0, 100))

fill(PlotLongPosPrice, PlotLongStopLoss, color = InLongTrade ? color.rgb(255, 0, 0, 95) : color.rgb(255, 0, 0, 100))
fill(PlotShortPosPrice, PlotShortStopLoss, color = InShortTrade ? color.rgb(255, 0, 0, 95) : color.rgb(255, 0, 0, 100))
```

> Detail

https://www.fmz.com/strategy/441103

> Last Modified

2024-02-05 16:00:35
