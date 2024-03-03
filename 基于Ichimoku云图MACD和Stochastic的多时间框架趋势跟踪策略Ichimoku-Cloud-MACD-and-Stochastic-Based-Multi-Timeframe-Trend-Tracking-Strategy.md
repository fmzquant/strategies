
> Name

基于Ichimoku云图MACD和Stochastic的多时间框架趋势跟踪策略Ichimoku-Cloud-MACD-and-Stochastic-Based-Multi-Timeframe-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dd67da7f10df99834e.png)
[trans]
## 概述

本策略融合了Ichimoku云图、移动平均线、MACD、Stochastic和ATR等多个指标,实现多时间框架下的趋势识别和跟踪。在获得较高概率的趋势信号后,采用ATR周期止损止盈方式进行风险控制。

## 策略原理

1. Ichimoku云图判断中长线趋势方向。CLOSE价格上穿云图的转折线和基准线为多头信号,下穿为空头信号。

2. MACD判断短线趋势和超买超卖情况。MACD柱线上穿信号线为多头信号,下穿为空头信号。

3. Stochastic KD判断超买超卖区。K线上穿20为多头信号,下穿80为空头信号。 

4. 移动平均线判断中期趋势。收盘价上穿移动平均线为多头信号,下穿为空头信号。

5. 综合以上多个指标信号,过滤掉部分假信号,形成高概率的持续性趋势信号。

6. 基于ATR计算止损止盈价格。以一定的ATR倍数作为止损位和止盈位,实现风险控制。

## 策略优势

1. 多时间框架识别趋势,提高信号准确率。

2. 广泛运用指标组合过滤技术,有效过滤假信号。

3. ATR周期性止损止盈,最大程度控制单笔损失。

4. 可自定义入场条件严格程度,满足不同风险偏好。

## 策略风险

1. 以趋势跟踪为主,无法识别突发事件带来的逆转。

2. ATR周期性止损可能过于理想化,实盘中难以完全复制。

3. 参数设置不当可能导致交易频率过高或信号识别准确率不足。

4. 需要调整参数找到平衡,适应不同品种和市场环境。

## 策略优化方向 

1. 增加机器学习算法,辅助判断趋势转折点。

2. 优化ATR倍数参数,不同品种可以设置不同倍数。

3. 结合交易量变化等其他因素,提高突破信号的准确率。

4. 根据回测结果不断优化参数,找到最佳参数组合。


## 总结

本策略综合运用Ichimoku云图、MACD、Stochastic等多个指标进行多时间框架的趋势识别,在抓住趋势的同时尽量避免被突发事件套牢。ATR周期性止损止盈方式有效控制单笔亏损,是一种值得推荐的趋势跟踪策略。通过引入更多辅助判断指标和机器学习方法,本策略还有进一步优化的空间。

||

## Overview

This strategy integrates Ichimoku Cloud, moving average, MACD, Stochastic and ATR indicators to identify and track trends across multiple timeframes. It adopts ATR-based stop loss and take profit methods for risk control after obtaining high probability trend signals.

## Strategy Logic

1. Ichimoku Cloud judges medium and long term trend directions. The CLOSE price crossing above Ichimoku's turning line and baseline is a bullish signal, and crossing below them is a bearish signal.

2. MACD judges short-term trends and overbought/oversold situations. MACD histogram crossing above MACD signal line is a bullish signal, and crossing below is a bearish signal.

3. Stochastic KD judges overbought/oversold zones. K line crossing above 20 is a bullish signal, and crossing below 80 is a bearish signal.

4. Moving average judges medium-term trends. Close price crossing above MA is a bullish signal, and crossing below is a bearish signal.

5. Integrate signals from the above indicators to filter out some false signals and form high probability sustainable trend signals. 

6. Use ATR to calculate stop loss and take profit price. Use a certain multiple of ATR as stop loss and take profit bits to control risks.

## Advantages

1. Identify trends across multiple timeframes to improve signal accuracy.

2. Widely employ indicator combos to effectively filter out false signals.  

3. ATR-based stop loss & take profit significantly limits per trade loss.

4. Customizable strictness of entry conditions caters to different risk appetites.

## Risks

1. Trend following nature fails to detect reversals caused by black swan events.  

2. Idealized ATR stop loss is hard to fully replicate in live trading.

3. Improper parameter settings may lead to overtrading or insufficient signal accuracy.

4. Parameter tweak is needed to fit different products and market environments.

## Enhancement Areas

1. Introduce machine learning to aid judging trend reversal points.  

2. Optimize ATR multiplier parameter values for different products.

3. Incorporate other factors like volume changes to improve breakthrough signal accuracy.  

4. Keep optimizing parameters based on backtest results to find best parameter combinations.

## Summary 

This strategy leverages Ichimoku Cloud, MACD, Stochastic and more for multi-timeframe trend identification, capturing trends while avoiding being trapped by black swan events. The ATR-based stop loss & take profit effectively limits per trade loss. With more auxiliary judgments and machine learning methods introduced, this strategy has further optimization potential.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Length|
|v_input_2|26|Base Line Length|
|v_input_3|52|Lagging Span 2 Length|
|v_input_4|26|Displacement|
|v_input_5|12|Fast Length|
|v_input_6|26|Slow Length|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|9|Signal Smoothing|
|v_input_9|false|Simple MA (Oscillator)|
|v_input_10|false|Simple MA (Signal Line)|
|v_input_11|5|%K Length|
|v_input_12|3|%K Smoothing|
|v_input_13|3|%D Smoothing|
|v_input_14|8|Atr Length|
|v_input_15|true|Stop loss multi Atr|
|v_input_16|true|Take profit multi Atr|
|v_input_17|0|Smoothing: RMA|SMA|EMA|WMA|
|v_input_18|0|Position side: Both|Short|Long|
|v_input_19|true|Show sl&tp lines|
|v_input_20|100|MA Length|
|v_input_21|timestamp(1 Jan 2020 00:00 +0000)|Backtesting Start Time|
|v_input_22|timestamp(31 Dec 2025 23:59 +0000)|Backtesting End Time|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-05 00:00:00
end: 2024-02-04 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © FXFUNDINGMATE

//@version=4
strategy(title="FXFUNDINGMATE TREND INDICATOR", overlay=true)

//Ichimoku Cloud
conversionPeriods = input(9, minval=1, title="Conversion Line Length")
basePeriods = input(26, minval=1, title="Base Line Length")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Length")
displacement = input(26, minval=1, title="Displacement")
donchian(len) => avg(lowest(len), highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)[displacement - 1]
leadLine2 = donchian(laggingSpan2Periods)[displacement - 1]


//macd
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA (Oscillator)", type=input.bool, defval=false)
sma_signal = input(title="Simple MA (Signal Line)", type=input.bool, defval=false)

fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal


//kd
periodK = input(5, title="%K Length", minval=1)
smoothK = input(3, title="%K Smoothing", minval=1)
periodD = input(3, title="%D Smoothing", minval=1)
k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)


//atr
atrlength = input(title="Atr Length", defval=8, minval=1)
SMulti = input(title="Stop loss multi Atr", defval=1.0)
TMulti = input(title="Take profit multi Atr", defval=1.0)
smoothing = input(title="Smoothing", defval="RMA", options=["RMA", "SMA", "EMA", "WMA"])
ma_function(source, length) =>
	if smoothing == "RMA"
		rma(source, length)
	else
		if smoothing == "SMA"
			sma(source, length)
		else
			if smoothing == "EMA"
				ema(source, length)
			else
				wma(source, length)
atr = ma_function(tr(true), atrlength)


operation_type = input(defval = "Both", title = "Position side", options = ["Long", "Short", "Both"])
operation = operation_type == "Long" ? 1 : operation_type == "Short" ? 2 : 3
showlines = input(true,  title="Show sl&tp lines")

// MA
sma_len = input(100, title="MA Length", type=input.integer)
sma = sma(close, sma_len)

longCond = crossover(k, 20) and macd > 0 and close > sma and close > leadLine1 and close > leadLine2
shortCond = crossunder(k, 80)  and macd < 0 and close < sma and close < leadLine1 and close < leadLine2

entry_price  = float(0.0) //set float
entry_price := strategy.position_size != 0 or longCond or shortCond ? strategy.position_avg_price : entry_price[1]
entry_atr = valuewhen(longCond or shortCond, atr,0)
short_stop_level     = float(0.0)   //set float
short_profit_level   = float(0.0)   //set float
long_stop_level      = float(0.0)   //set float
long_profit_level    = float(0.0)   //set float
short_stop_level    := entry_price + SMulti * entry_atr
short_profit_level  := entry_price - TMulti * entry_atr
long_stop_level     := entry_price - SMulti * entry_atr
long_profit_level   := entry_price + TMulti * entry_atr


//  Strategy Backtest Limiting Algorithm
i_startTime = input(defval = timestamp("1 Jan 2020 00:00 +0000"), title = "Backtesting Start Time", type = input.time)
i_endTime = input(defval = timestamp("31 Dec 2025 23:59 +0000"), title = "Backtesting End Time", type = input.time)
timeCond = true

if (operation == 1 or operation == 3)
    strategy.entry("long" , strategy.long , when=longCond and timeCond, alert_message = "Long")
    strategy.exit("SL/TP", from_entry = "long" , limit = long_profit_level , stop = long_stop_level , alert_message = "Long exit")

if (operation == 2 or operation == 3)
    strategy.entry("short", strategy.short, when=shortCond and timeCond, alert_message="Short")
    strategy.exit("SL/TP", from_entry = "short", limit = short_profit_level , stop = short_stop_level , alert_message = "Short exit")
    
if time > i_endTime  
    strategy.close_all(comment = "close all", alert_message = "close all")
    
plot(showlines and strategy.position_size <= 0 ? na : long_stop_level,    color=color.red,  style=plot.style_linebr, linewidth = 2)
plot(showlines and strategy.position_size <= 0 ? na : long_profit_level,  color=color.lime, style=plot.style_linebr, linewidth = 2)
plot(showlines and strategy.position_size >= 0 ? na : short_stop_level,   color=color.red,  style=plot.style_linebr, linewidth = 2)
plot(showlines and strategy.position_size >= 0 ? na : short_profit_level, color=color.lime, style=plot.style_linebr, linewidth = 2)

//}


```

> Detail

https://www.fmz.com/strategy/441048

> Last Modified

2024-02-05 10:30:45
