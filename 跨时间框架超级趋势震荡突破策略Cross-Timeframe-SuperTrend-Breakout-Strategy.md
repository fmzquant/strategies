
> Name

跨时间框架超级趋势震荡突破策略Cross-Timeframe-SuperTrend-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/132b6a79b848662d154.png)
[trans]

## 概述

该策略融合了多时间框架的超级趋势指标与布林带指标,识别趋势方向和关键支撑阻力位,在震荡突破时进行 Entries,并基于交叉退出仓位。该策略主要适用于高波动的商品期货品种,如黄金、白银、原油等。

## 策略原理  

基于 Pine Script 编写的自定义多时间框架超级趋势函数 `pine_supertrend()`,结合不同周期(例如 1 分钟和 5 分钟)的超级趋势,判断大周期趋势方向。

同时,计算布林带上下轨,进行通道突破判断。当价格突破布林带上轨时,认为处于看涨突破;当价格跌破布林带下轨时,认为看跌突破。

策略信号:

多头信号:收盘价 > 布林带上轨 且 收盘价 > 多时间框架超级趋势指标
空头信号:收盘价 < 布林带下轨 且 收盘价 < 多时间框架超级趋势指标

止损:

多头止损:收盘价 < 5分钟超级趋势指标
空头止损:收盘价 > 5分钟超级趋势指标

因此,策略捕捉超级趋势指标与布林带指标的共振突破,在高波动行情中进行事务处理。

## 优势分析

- 利用多时间框架超级趋势指标判断大周期趋势方向,提高信号质量
- 布林带上下轨作为关键支撑阻力位,能减少假突破
- 超级趋势指标作为止损位,降低亏损,控制风险

## 风险分析 

- 超级趋势指标存在滞后性,可能错过趋势反转点
- 布林带参数设置不当可能导致过于频繁或过于漏 trades
- 商品期货夜盘或重大事件发生时,价格剧烈波动,容易止损

风险解决方法:

- 结合多种辅助指标确认信号,避免假突破
- 优化布林带参数,寻找最佳平衡点
- 调整止损位置,扩大止损距离

## 优化方向

- 尝试其他趋势指标,如 KDJ、MACD 等作为辅助判断
- 增加机器学习模型判断概率作为助力
- 进行参数优化,找到最佳超参数组合

## 总结

该策略整合超级趋势与布林带两个高效指标,通过跨时间框架分析和通道突破判断,实现高概率操盘。策略有效控制了资金风险,证实了在高波动品种中可以获得较好收益。通过进一步优化和INDICATORS组合,策略的效果还可得到提升。

||

## Overview

The strategy incorporates the SuperTrend indicator across multiple timeframes and Bollinger Bands to identify trend direction and key support/resistance levels, and enters trades on breakouts during volatility. It is designed mainly for highly volatile commodity futures like gold, silver, crude oil etc.


## Strategy Logic

Custom Pine Script function `pine_supertrend()` implemented to compute SuperTrend across different timeframes (e.g. 1 min and 5 min) and determine the direction of larger timeframe trend.

Bollinger Bands upper/lower bands act as channels. Breakouts signals trend directionality. Close above upper band signifies bullish breakout. Close below lower band signifies bearish breakdown.

Entry Signals:

Long: Close > Upper Band AND Close > SuperTrend (multiple TF) 
Short: Close < Lower Band AND Close < SuperTrend (multiple TF)


Exits:

Long Exit: Close < 5m SuperTrend
Short Exit: Close > 5m SuperTrend


So it aims to capture resonance breakouts between SuperTrend and BB in volatile momentum.


## Advantage Analysis

- Uses SuperTrend across timeframes to determine high-conviction trend directionality
- BB Bands act as key support/resistance levels to avoid false breakouts
- SuperTrend acts as dynamic stop loss to control risk


## Risk Analysis

- SuperTrend can lag turning points and trend reversals
- Suboptimal BB parameters may cause too many or few trades
- Sharp overnight gaps or news events can hit stop loss


Risk Mitigations:

- Add more indicators to confirm signals and avoid false breakouts
- Optimize BB parameters for best balance
- Widen stop loss buffer to accommodate gaps


## Enhancement Opportunities

- Test other trend indicators like KDJ MACD for additional signal confirmation
- Add ML model for breakout probability
- Parameter tuning for optimal parameter set


## Conclusion

The strategy combines the power of SuperTrend and Bollinger Bands using cross timeframe analysis and channel breakouts for high-probability trading. It effectively controls risk and can generate good profits in volatile instruments. Further optimizations and indicator combinations can improve performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|75|MA_SMA_ST|
|v_input_2|10|ATR Length|
|v_input_3|3|Factor|
|v_input_int_1|75|length|
|v_input_string_1|0|Basis MA Type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2.5|StdDev|
|v_input_int_2|false|Offset|
|v_input_5|1|Timeframe 1|
|v_input_6|5|Timeframe 2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ambreshc95

//@version=5
strategy("Comodity_SPL_Strategy_01", overlay=false)

// function of st
// [supertrend, direction] = ta.supertrend(3, 10)
// plot(direction < 0 ? supertrend : na, "Up direction", color = color.green, style=plot.style_linebr)
// plot(direction > 0 ? supertrend : na, "Down direction", color = color.red, style=plot.style_linebr)

// VWAP
// src_vwap = input(title = "Source", defval = hlc3, group="VWAP Settings")
// [_Vwap,stdv,_] = ta.vwap(src_vwap,false,1)
// plot(_Vwap, title="VWAP", color = color.rgb(0, 0, 0))



// The same on Pine Script®
pine_supertrend(factor, atrPeriod,len_ma) =>
    
    h= ta.sma(high,len_ma)
    l= ta.sma(low,len_ma)
    hlc_3 = (h+l)/2
    src = hlc_3
    atr = ta.atr(atrPeriod)
    upperBand = src + factor * atr
    lowerBand = src - factor * atr
    prevLowerBand = nz(lowerBand[1])
    prevUpperBand = nz(upperBand[1])

    lowerBand := lowerBand > prevLowerBand or close[1] < prevLowerBand ? lowerBand : prevLowerBand
    upperBand := upperBand < prevUpperBand or close[1] > prevUpperBand ? upperBand : prevUpperBand
    int direction = na
    float superTrend = na
    prevSuperTrend = superTrend[1]
    if na(atr[1])
        direction := 1
    else if prevSuperTrend == prevUpperBand
        direction := close > upperBand ? -1 : 1
    else
        direction := close < lowerBand ? 1 : -1
    superTrend := direction == -1 ? lowerBand : upperBand
    [superTrend, direction]
len_ma_given = input(75, title="MA_SMA_ST")
[Pine_Supertrend, pineDirection] = pine_supertrend(3, 10,len_ma_given)
// plot(pineDirection < 0 ? Pine_Supertrend : na, "Up direction", color = color.green, style=plot.style_linebr)
// plot(pineDirection > 0 ? Pine_Supertrend : na, "Down direction", color = color.red, style=plot.style_linebr)
// 
// Define Supertrend parameters
atrLength = input(10, title="ATR Length")
factor = input(3.0, title="Factor")

// // Calculate Supertrend
[supertrend, direction] = ta.supertrend(factor, atrLength)

st_color = supertrend > close ? color.red : color.green
// // Plot Supertrend
// plot(supertrend, "Supertrend", st_color)
// 

// BB Ploting
length = input.int(75, minval=1)
maType = input.string("SMA", "Basis MA Type", options = ["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
src = input(close, title="Source")
mult = input.float(2.5, minval=0.001, maxval=50, title="StdDev")

ma(source, length, _type) =>
    switch _type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

basis = ma(src, length, maType)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input.int(0, "Offset", minval = -500, maxval = 500)
plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))





// h= ta.sma(high,60)
// l= ta.sma(low,60)
// c= sma(close,60)
// hlc_3 = (h+l)/2
// supertrend60 = request.security(syminfo.tickerid,  supertrend)

// // Define timeframes for signals
tf1 = input(title="Timeframe 1", defval="1")
tf2 = input(title="Timeframe 2",defval="5")
// tf3 = input(title="Timeframe 3",defval="30")


// // // Calculate Supertrend on multiple timeframes
supertrend_60 = request.security(syminfo.tickerid, tf1, Pine_Supertrend)
supertrend_5m = request.security(syminfo.tickerid, tf2, supertrend)
// supertrend3 = request.security(syminfo.tickerid, tf3, supertrend)

// // Plot Supertrend_60
st_color_60 = supertrend_60 > close ? color.rgb(210, 202, 202, 69) : color.rgb(203, 211, 203, 52)
plot(supertrend_60, "Supertrend_60", st_color_60)

// // Plot Supertrend_5m
st_color_5m = supertrend_5m > close ? color.red : color.green
plot(supertrend_5m, "Supertrend_5m", st_color_5m)



ma21 = ta.sma(close,21)
// rsi = ta.rsi(close,14)
// rsima = ta.sma(rsi,14)

// Define the Indian Standard Time (IST) offset from GMT
ist_offset = 5.5 // IST is GMT+5:30

// Define the start and end times of the trading session in IST
// start_time = timestamp("GMT", year, month, dayofmonth, 10, 0) + ist_offset * 60 * 60
// end_time = timestamp("GMT", year, month, dayofmonth, 14, 0) + ist_offset * 60 * 60
// Check if the current time is within the trading session
// in_trading_session = timenow >= start_time and timenow <= end_time

in_trading_session = not na(time(timeframe.period, "0945-1430"))
// bgcolor(inSession ? color.silver : na)
out_trading_session = not na(time(timeframe.period, "1515-1530"))
// // // Define buy and sell signals
buySignal = close>upper and close > supertrend_5m and close > supertrend_60 and close > ma21  and in_trading_session //close > supertrend and
sellSignal = close<lower and close < supertrend_5m and close < supertrend_60 and close < ma21  and in_trading_session //close < supertrend and

var bool long_position = false
var bool long_exit = false
var float long_entry_price = 0
var float short_entry_price = 0

if buySignal and not long_position
    // label.new(bar_index, na, yloc = yloc.belowbar, style = label.style_label_up, color = color.green, size = size.small)
    long_position := true
    strategy.entry("Buy",strategy.long)

long_exit := (close < supertrend_5m)
if long_position and long_exit
    // label.new(bar_index, na, yloc = yloc.belowbar, style = label.style_xcross, color = color.green, size = size.tiny)
    long_position := false
    strategy.exit("Exit","Buy",stop = close)

var bool short_position = false
var bool short_exit = false
if sellSignal and not short_position
    // label.new(bar_index, na, yloc = yloc.abovebar, style = label.style_label_down, color = color.red, size = size.small)
    short_position := true
    strategy.entry("Sell",strategy.short)

short_exit := (close > supertrend_5m)
if short_position and short_exit
    // label.new(bar_index, na, yloc = yloc.belowbar, style = label.style_xcross, color = color.red, size = size.tiny)
    short_position := false
    strategy.exit("Exit","Sell", stop = close)

if out_trading_session
    long_position := false
    strategy.exit("Exit","Buy",stop = close)
    short_position := false
    strategy.exit("Exit","Sell", stop = close)

// if long_position
//     long_entry_price := close[1] + 50//bar_index

// if short_position
//     short_entry_price := close[1] - 50//bar_index

// if (long_position and high[1] > long_entry_price)
//     label.new(bar_index, na, yloc = yloc.abovebar, style = label.style_triangledown, color = color.yellow, size = size.tiny)

// if (short_position and low[1] < short_entry_price)
//     label.new(bar_index, na, yloc = yloc.belowbar, style = label.style_triangleup, color = color.yellow, size = size.tiny)



```

> Detail

https://www.fmz.com/strategy/433074

> Last Modified

2023-11-24 10:27:52
