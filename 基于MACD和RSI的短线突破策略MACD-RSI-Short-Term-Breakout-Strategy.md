
> Name

基于MACD和RSI的短线突破策略MACD-RSI-Short-Term-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是基于1分钟MACD指标和RSI指标设计的短线突破策略。它结合了MACD指标判断趋势和找出突破点,以及RSI指标判断超买超卖的能力,寻找短线突破机会进行长短做波动。

## 策略原理

该策略首先在1分钟时间框架计算MACD指标的集散线,并绘制布林带判断集散线的突破情况。同时计算RSI指标判断多空力道。只有当布林带、MACD和RSI指标同时符合条件时,才会发出交易信号。

具体来说,当1分钟MACD集散线低于下轨且RSI高于51时做多,当MACD集散线高于上轨且RSI低于49时做空。并要求9日、50日和200日均线顺序排列才能交易,防止不利的趋势逆势操作。 

采取固定的止盈止损 Exit 当收益达到0.5%或亏损达到0.3%时平仓。

## 优势分析

该策略结合了趋势判断和超买超卖判断,可以有效过滤假突破。固定止盈止损使每单获利有一定的预期管理。

优势如下:

1. MACD判断趋势方向,RSI判断多空力道,可以有效避免逆势操作。

2. 结合布林带通道判断突破信号,可以过滤假突破。

3. 采取固定止盈止损,每单获利有一定预期,可以控制单笔亏损。

4. 交易频率较高,适合短线操作。

## 风险分析

该策略也存在一些风险:

1. 固定止盈止损无法根据市场变化调整,可能导致止损过小止盈过大。

2. 依赖指标多重过滤信号,在盘整区域会出现多次触发止损。

3. 高频交易手续费负担较重。

4. MACD和RSI参数需要优化,目前参数可能不是最优。

以下几点可以进一步优化:

1. 采用动态止盈止损,根据ATR等指标调整止盈止损比例。

2. 加大布林带参数缩小通道,降低触发频率。

3. 优化MACD和RSI参数,找到最佳参数组合。

4. 根据大周期趋势方向进行过滤,避免逆势交易。

## 总结

该策略整体来说是一个典型的短线突破系统,融合了趋势、超买超卖判断,可以有效发现短线机会。但存在一定风险,需要进一步测试和优化参数,降低风险提高盈利率。如果参数调整得当,该策略可以成为高效的短线策略之一。

||


## Overview

This is a short-term breakout strategy based on the 1-minute MACD indicator and RSI indicator. It combines MACD to determine the trend and find breakout points, and RSI to judge overbought and oversold conditions, to find short-term breakout opportunities for long and short scalping.

## Strategy Logic

The strategy first calculates the MACD histogram in the 1-minute timeframe, and plots Bollinger Bands to determine the histogram breakout situation. At the same time, it calculates the RSI indicator to determine the long and short momentum. Only when the Bollinger Bands, MACD and RSI indicators all meet the criteria at the same time, trading signals will be triggered. 

Specifically, go long when the 1-minute MACD histogram is below the lower band and RSI is above 51, and go short when the MACD histogram is above the upper band and RSI is below 49. It also requires the 9-day, 50-day and 200-day moving averages to be in order before trading, to avoid unfavorable trend trading.

It takes fixed take profit and stop loss exits. Close the position when profit reaches 0.5% or loss reaches 0.3%.

## Advantage Analysis 

The strategy combines trend judgment and overbought/oversold judgment, which can effectively filter out false breakouts. The fixed TP/SL makes every trade have a certain profit expectation management.

The advantages are:

1. MACD judges the trend direction and RSI judges the long/short momentum, which can effectively avoid trading against the trend.

2. Combining Bollinger Bands to judge breakout signals can filter out false breakouts. 

3. Adopting fixed TP/SL, every trade has a certain profit expectation, which controls single trade loss.

4. The trading frequency is high, suitable for short-term trading.

## Risk Analysis

There are also some risks with this strategy:

1. The fixed TP/SL cannot adjust based on market changes, which may lead to SL too small and TP too large.

2. It relies on multiple filtered signals, which may lead to multiple SL trigged in range-bound markets.

3. The high trading frequency leads to heavy commission fees. 

4. The MACD and RSI parameters need further optimization, the current parameters may not be optimal.

The following aspects can be further optimized:

1. Adopt dynamic TP/SL, adjust ratios based on ATR etc.

2. Widen Bollinger Bands to narrow the channel, lower the triggering frequency.

3. Optimize MACD and RSI parameters to find the best combination.  

4. Filter based on higher timeframe trends to avoid trading against the trend.

## Summary

Overall this strategy is a typical short-term breakout system, incorporating trend, momentum and overbought/oversold analysis, which can effectively discover short-term opportunities. But there are certain risks, requiring further testing and parameter optimization to lower risks and improve profitability. If tuned properly, this strategy can become an efficient short-term trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|9|Signal Smoothing|
|v_input_string_1|0|Oscillator MA Type: EMA|SMA|
|v_input_string_2|0|Signal Line MA Type: EMA|SMA|
|v_input_int_2|9|Length|
|v_input_10_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|false|Offset|
|v_input_int_4|50|Length|
|v_input_11_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_5|false|Offset|
|v_input_int_6|200|Length|
|v_input_12_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_7|false|Offset|
|v_input_int_8|94|LengthBB Long|
|v_input_int_9|83|LengthBB Short|
|v_input_float_1|2|StdDev|
|v_input_int_10|false|Offset|
|v_input_int_11|11|Rsi Length Long|
|v_input_int_12|29|Rsi Length Short|
|v_input_float_2|0.5|Take Profit %|
|v_input_float_3|0.3|Stop Loss %|
|v_input_13|-10|MacdTick Low|
|v_input_14|35|MacdTick High|
|v_input_4|#2962FF|(?Color Settings)MACD Line  |
|v_input_5|#FF6D00|Signal Line  |
|v_input_6|#26A69A|(?Histogram)Above   Grow|
|v_input_7|#B2DFDB|Fall|
|v_input_8|#FFCDD2|Below Grow|
|v_input_9|#FF5252|Fall|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © pluckyCraft54926

//@version=5
strategy("5 Minute Scalp", overlay=true, margin_long=100, margin_short=100)

fast_length = input(title="Fast Length", defval=12)
slow_length = input(title="Slow Length", defval=26)
src = input(title="Source", defval=close)
signal_length = input.int(title="Signal Smoothing",  minval = 1, maxval = 50, defval = 9)
sma_source = input.string(title="Oscillator MA Type",  defval="EMA", options=["SMA", "EMA"])
sma_signal = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])
// Plot colors
col_macd = input(#2962FF, "MACD Line  ", group="Color Settings", inline="MACD")
col_signal = input(#FF6D00, "Signal Line  ", group="Color Settings", inline="Signal")
col_grow_above = input(#26A69A, "Above   Grow", group="Histogram", inline="Above")
col_fall_above = input(#B2DFDB, "Fall", group="Histogram", inline="Above")
col_grow_below = input(#FFCDD2, "Below Grow", group="Histogram", inline="Below")
col_fall_below = input(#FF5252, "Fall", group="Histogram", inline="Below")
// Calculating
fast_ma = sma_source == "SMA" ? ta.sma(src, fast_length) : ta.ema(src, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(src, slow_length) : ta.ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal
hist_1m = request.security(syminfo.tickerid,"1",hist [barstate.isrealtime ? 1 : 0])
hline(0, "Zero Line", color=color.new(#787B86, 50))
////////////////////////////////////////////////////
//plotting emas on the chart
len1 = input.int(9, minval=1, title="Length")
src1 = input(close, title="Source")
offset1 = input.int(title="Offset", defval=0, minval=-500, maxval=500)
out1 = ta.ema(src1, len1)
plot(out1, title="EMA9", color=color.blue, offset=offset1)

len2 = input.int(50, minval=1, title="Length")
src2 = input(close, title="Source")
offset2 = input.int(title="Offset", defval=0, minval=-500, maxval=500)
out2 = ta.ema(src2, len2)
plot(out2, title="EMA50", color=color.yellow, offset=offset2)

len3 = input.int(200, minval=1, title="Length")
src3 = input(close, title="Source")
offset3 = input.int(title="Offset", defval=0, minval=-500, maxval=500)
out3 = ta.ema(src3, len3)
plot(out3, title="EMA200", color=color.white, offset=offset3)
//////////////////////////////////////////////////////////////////
//Setting up the BB
/////////////////////////////////////////////////////////////
srcBB = hist_1m
lengthBBLong = input.int(94,title = "LengthBB Long", minval=1)
lengthBBShort = input.int(83,title = "LengthBB Short", minval=1)
multBB = input.float(2.0, minval=0.001, maxval=50, title="StdDev")
basisBBLong = ta.sma(srcBB, lengthBBLong)
basisBBShort = ta.sma(srcBB, lengthBBShort)
devBBLong = multBB * ta.stdev(srcBB, lengthBBLong)
devBBShort = multBB * ta.stdev(srcBB, lengthBBShort)
upperBB = basisBBShort + devBBShort
lowerBB = basisBBLong - devBBLong
offsetBB = input.int(0, "Offset", minval = -500, maxval = 500)

/////////////////////////////////////////
//aetting up rsi
///////////////////////////////////////////
rsilengthlong = input.int(defval = 11, title = "Rsi Length Long", minval = 1)
rlong=ta.rsi(close,rsilengthlong)
rsilengthshort = input.int(defval = 29, title = "Rsi Length Short", minval = 1)
rshort=ta.rsi(close,rsilengthshort)
///////////////////////////
//Only taking long and shorts, if RSI is above 51 or bellow 49
rsilong = rlong >= 51
rsishort = rshort <= 49
//////////////////////////////////////
//only taking trades if all 3 emas are in the correct order
long = out1 > out2 and out2 > out3
short = out1 < out2 and out2 < out3
/////////////////////////////////////


///////////////////////////////////////////
//setting up TP and SL
TP = input.float(defval = 0.5, title = "Take Profit %",step = 0.1) / 100
SL = input.float(defval = 0.3, title = "Stop Loss %", step = 0.1) / 100

longCondition = hist_1m <= lowerBB
longhight = input(defval=-10,title = "MacdTick Low")
if (longCondition and long and rsilong and hist_1m <= longhight) 
    strategy.entry("Long", strategy.long)

if (strategy.position_size>0)
    longstop = strategy.position_avg_price * (1-SL)
    longprofit = strategy.position_avg_price * (1+TP)
    strategy.exit(id ="close long",from_entry="Long",stop=longstop,limit=longprofit)

shortCondition = hist_1m >= upperBB
shorthight = input(defval=35,title = "MacdTick High")
if (shortCondition and short and rsishort and hist_1m >= shorthight)
    strategy.entry("short ", strategy.short)

shortstop = strategy.position_avg_price * (1+SL)
shortprofit = strategy.position_avg_price * (1-TP)

if (strategy.position_size<0)
    strategy.exit(id ="close short",stop=shortstop,limit=shortprofit)




```

> Detail

https://www.fmz.com/strategy/428624

> Last Modified

2023-10-07 16:08:53
