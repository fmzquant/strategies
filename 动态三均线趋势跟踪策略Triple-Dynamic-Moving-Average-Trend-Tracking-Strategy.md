
> Name

动态三均线趋势跟踪策略Triple-Dynamic-Moving-Average-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/148b79eb6d07576c669.png)
[trans]
## 概述

动态三均线趋势跟踪策略运用多个时间周期的动态平滑移动平均线来识别市场趋势,实现不同时间周期之间的趋势一致性过滤,从而提高交易信号的可靠性。

## 策略原理

该策略使用3条不同参数设置的动态平滑移动平均线。第一条移动平均线计算当前周期价格的趋势方向,第二条移动平均线计算较高时间周期价格的趋势方向,第三条移动平均线计算再高一级时间周期价格的趋势方向。当第一条移动平均线发生向上穿越第二条移动平均线时产生买入信号,而第三条移动平均线也呈上涨趋势时,验证买入信号的可靠性。整个策略通过不同时间周期之间的趋势过滤,实现了多时间框架之间的趋势一致性,从而确保交易信号的可靠性。

移动平均线使用动态平滑功能,可以自动计算并应用不同时间周期之间适当的平滑因子,从而使高时间周期的移动平均线在低时间周期图表上呈现流畅的趋势线,而不是锯齿形的折线。这种动态平滑使策略可以在高时间周期判断整体趋势方向的同时,还可以在低时间周期进行交易执行,实现高效的趋势跟踪。

## 策略优势

该策略最大的优势在于多时间框架的趋势过滤机制。通过计算不同时间周期价格的平均趋势方向,并要求不同周期之间保持一致,可以有效过滤掉 vieleity 的短期价格波动对交易信号的干扰,确保每一个交易信号都置于大趋势之中,从而显著提高盈利概率。

另一个优势是动态平滑功能的应用。这使得策略可以同时识别高时间周期的整体趋势和低时间周期的具体交易点。策略可以在高时间周期确定大趋势方向的同时,在低时间周期进行具体的交易执行。这种多时间框架的运用,有助于把握市场机会的同时控制交易风险。

## 风险及优化

该策略的主要风险在于交易信号较少。严格的趋势过滤条件会减少交易机会的数量,这对某些追求高频交易的投资者可能不太适合。可以通过降低过滤条件的严格度来获得更多交易机会。

此外,参数设置也需要仔细测试优化,特别是移动平均线的周期长度。不同市场需要设置不同的周期参数才能达到最佳效果。可以通过回测寻找最优参数组合。

未来的优化方向还可以考虑加入更多的技术指标进行滤波,或者增加机器学习算法自动优化参数。这些都将是提高策略效果的有效方法。

## 总结

本策略总的来说是一个非常实用的趋势跟踪策略。多时间框架趋势过滤的机制为每个交易决策提供了良好的大方向支持,有效减少交易风险。而动态平滑功能的添加也使这种多时间框架方法可以高效实现。整个策略框架合理、运行高效,值得学习和应用。

||

## Overview

The Triple Dynamic Moving Average Trend Tracking strategy uses multiple time frame dynamic smoothed moving averages to identify market trends and achieve trend consistency filtering across different time frames, thereby improving the reliability of trading signals.

## Strategy Logic

The strategy employs 3 dynamic smoothed moving averages with different parameter settings. The first moving average calculates the trend direction of current period prices, the second moving average calculates the trend direction of higher time frame prices, and the third moving average calculates the trend direction of even higher time frame prices. A buy signal is generated when the first moving average crosses above the second moving average, and the third moving average is also in an upward trend, which verifies the reliability of the buy signal. The entire strategy achieves trend consistency across multiple time frames through inter-timeframe trend filtering, ensuring the reliability of trading signals.

The dynamic smoothing feature is used to automatically calculate and apply appropriate smoothing factors between different time frames, so that the higher time frame moving averages present smooth trendlines instead of jagged zigzag lines on the lower time frame charts. This dynamic smoothing allows the strategy to determine the overall trend direction on higher time frames while executing trades on lower time frames for efficient trend tracking.

## Advantages

The biggest advantage of this strategy lies in its inter-timeframe trend filtering mechanism. By calculating the average trend directions of prices across different time periods and requiring consistency among them, it can effectively filter out short-term price fluctuations that interfere with trading signals, ensuring that each trade is placed along the major trend, thereby significantly improving profitability.  

Another advantage is the application of dynamic smoothing. This allows the strategy to identify both the overall trend on higher time frames and specific trading points on lower time frames simultaneously. The strategy can determine the major trend direction on higher time frames while executing specific trades on lower time frames. Such application of multiple time frames helps to capitalize on market opportunities while controlling trading risks.

## Risks and Optimization

The main risk of this strategy is the relatively few trading signals. The strict trend filtering conditions reduce the number of trading opportunities, which may not suit some investors pursuing high-frequency trading. The strictness of filtering conditions can be reduced to obtain more trading opportunities.

In addition, careful testing and optimization is needed for parameter settings, especially the moving average periods, which require different optimum values across different markets. The optimal parameter combinations can be found through backtesting.

Future optimization directions may also consider incorporating more technical indicators for signal filtering or increasing machine learning algorithms for automatic parameter optimization. These are all effective methods to improve strategy performance.

## Conclusion

In conclusion, this is a very practical trend tracking strategy. The inter-timeframe trend filtering provides good directional guidance to support each trading decision, effectively reducing trading risks. The addition of dynamic smoothing also enables efficient implementation of this multi-timeframe approach. The entire strategy framework is reasonable and efficient, worthy of learning and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|10000|(?-------------------- Risk Management  --------------------)Initial Balance|
|v_input_bool_1|true|qty based on equity %|
|v_input_float_2|false|MarginFactor|
|v_input_float_3|3.5|Quantity Contracts|
|v_input_bool_2|true|(?-------------------- Moving Average 1 --------------------)Plot MA trend?|
|v_input_timeframe_1|15|Higher Time Frame|
|v_input_int_1|21|Length MA|
|v_input_string_1|0|MA type:: McGinley|DEMA|TEMA|SMA|WMA|HMA|EMA|
|v_input_bool_3|true|(?-------------------- Moving Average 2 --------------------)Plot Second MA trend?|
|v_input_timeframe_2|60|HTF|
|v_input_int_2|21|Length Second MA|
|v_input_string_2|0|MA type:: McGinley|DEMA|TEMA|SMA|WMA|HMA|EMA|
|v_input_bool_4|true|(?-------------------- Moving Average 3 --------------------)Plot third MA trend?|
|v_input_timeframe_3|240|HTF|
|v_input_int_3|50|Length third MA|
|v_input_string_3|0|MA type:: McGinley|DEMA|TEMA|SMA|WMA|HMA|EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-23 00:00:00
end: 2024-02-22 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Harrocop

//@version=5
strategy(title = "Triple MA HTF strategy - Dynamic Smoothing", shorttitle = "Triple MA strategy", overlay=true, 
         pyramiding=5, initial_capital = 10000,
         calc_on_order_fills=false,
         slippage = 0,
         commission_type=strategy.commission.percent, commission_value=0.05)

//////////////////////////////////////////////////////
//////////         Risk Management        ////////////
//////////////////////////////////////////////////////
RISKM = "-------------------- Risk Management  --------------------"
InitialBalance = input.float(defval = 10000, title = "Initial Balance", minval = 1, maxval = 1000000, step = 1000, tooltip = "starting capital", group = RISKM)
LeverageEquity = input.bool(defval = true, title = "qty based on equity %", tooltip = "true turns on MarginFactor based on equity, false gives fixed qty for positionsize", group = RISKM)
MarginFactor = input.float(0, minval = - 0.9, maxval = 100, step = 0.1, tooltip = "Margin Factor, meaning that 0.5 will add 50% extra capital to determine ordersize quantity, 0.0 means 100% of equity is used to decide quantity of instrument", inline = "qty", group = RISKM)
QtyNr = input.float(defval = 3.5, title = "Quantity Contracts", minval = 0, maxval = 1000000, step = 0.01,  tooltip = "Margin Factor, meaning that 0.5 will add 50% extra capital to determine ordersize quantity, 0.0 means 100% of equity is used to decide quantity of instrument", inline = "qty", group = RISKM)
EquityCurrent = InitialBalance + strategy.netprofit[1]
QtyEquity = EquityCurrent * (1 + MarginFactor) / close[1]
QtyTrade = LeverageEquity ? QtyEquity : QtyNr

/////////////////////////////////////////////////////
//////////       MA Filter Trend         ////////////
/////////////////////////////////////////////////////
TREND = "-------------------- Moving Average 1 --------------------"
Plot_MA = input.bool(true, title = "Plot MA trend?", inline = "Trend1", group = TREND)
TimeFrame_Trend = input.timeframe(title='Higher Time Frame', defval='15', inline = "Trend1", group = TREND)
length = input.int(21, title="Length MA", minval=1, tooltip = "Number of bars used to measure trend on higher timeframe chart", inline = "Trend2", group = TREND)
MA_Type  = input.string(defval="McGinley" , options=["EMA","DEMA","TEMA","SMA","WMA", "HMA", "McGinley"], title="MA type:", inline = "Trend2", group = TREND)

ma(type, src, length) =>
    float result = 0
    if type == 'TMA' // Triangular Moving Average
        result := ta.sma(ta.sma(src, math.ceil(length / 2)), math.floor(length / 2) + 1)
        result
    if type == 'LSMA' // Least Squares Moving Average
        result := ta.linreg(src, length, 0)
        result
    if type == 'SMA'  // Simple Moving Average
        result := ta.sma(src, length)
        result
    if type == 'EMA'  // Exponential Moving Average
        result := ta.ema(src, length)
        result
    if type == 'DEMA'  // Double Exponential Moving Average
        e = ta.ema(src, length)
        result := 2 * e - ta.ema(e, length)
        result
    if type == 'TEMA'  // Triple Exponentiale
        e = ta.ema(src, length)
        result := 3 * (e - ta.ema(e, length)) + ta.ema(ta.ema(e, length), length)
        result
    if type == 'WMA'  // Weighted Moving Average
        result := ta.wma(src, length)
        result
    if type == 'HMA'  // Hull Moving Average
        result := ta.wma(2 * ta.wma(src, length / 2) - ta.wma(src, length), math.round(math.sqrt(length)))
        result
    if type == 'McGinley' // McGinley Dynamic Moving Average
        mg = 0.0
        mg := na(mg[1]) ? ta.ema(src, length) : mg[1] + (src - mg[1]) / (length * math.pow(src / mg[1], 4))
        result := mg
        result
    result

// Moving Average
MAtrend = ma(MA_Type, close, length)
MA_Value_HTF = request.security(syminfo.tickerid, TimeFrame_Trend, MAtrend)

// Get minutes for current and higher timeframes
// Function to convert a timeframe string to its equivalent in minutes
timeframeToMinutes(tf) =>
    multiplier = 1
    if (str.endswith(tf, "D"))
        multiplier := 1440
    else if (str.endswith(tf, "W"))
        multiplier := 10080
    else if (str.endswith(tf, "M"))
        multiplier := 43200
    else if (str.endswith(tf, "H"))
        multiplier := int(str.tonumber(str.replace(tf, "H", "")))
    else
        multiplier := int(str.tonumber(str.replace(tf, "m", "")))
    multiplier

// Get minutes for current and higher timeframes
currentTFMinutes = timeframeToMinutes(timeframe.period)
higherTFMinutes = timeframeToMinutes(TimeFrame_Trend)

// Calculate the smoothing factor
dynamicSmoothing = math.round(higherTFMinutes / currentTFMinutes)
MA_Value_Smooth = ta.sma(MA_Value_HTF, dynamicSmoothing)

// Trend HTF
UP = MA_Value_Smooth > MA_Value_Smooth[1] // Use "UP" Function to use as filter in combination with other indicators
DOWN = MA_Value_Smooth < MA_Value_Smooth[1] // Use "Down" Function to use as filter in combination with other indicators

/////////////////////////////////////////////////////
//////////       Second MA Filter Trend   ///////////
/////////////////////////////////////////////////////
TREND2 = "-------------------- Moving Average 2 --------------------"
Plot_MA2 = input.bool(true, title = "Plot Second MA trend?", inline = "Trend3", group = TREND2)
TimeFrame_Trend2 = input.timeframe(title='HTF', defval='60', inline = "Trend3", group = TREND2)
length2 = input.int(21, title="Length Second MA", minval=1, tooltip = "Number of bars used to measure trend on higher timeframe chart", inline = "Trend4", group = TREND2)
MA_Type2  = input.string(defval="McGinley" , options=["EMA","DEMA","TEMA","SMA","WMA", "HMA", "McGinley"], title="MA type:", inline = "Trend4", group = TREND2)

// Second Moving Average
MAtrend2 = ma(MA_Type2, close, length2)
MA_Value_HTF2 = request.security(syminfo.tickerid, TimeFrame_Trend2, MAtrend2)

// Get minutes for current and higher timeframes
higherTFMinutes2 = timeframeToMinutes(TimeFrame_Trend2)

// Calculate the smoothing factor for the second moving average
dynamicSmoothing2 = math.round(higherTFMinutes2 / currentTFMinutes)
MA_Value_Smooth2 = ta.sma(MA_Value_HTF2, dynamicSmoothing2)

// Trend HTF for the second moving average
UP2 = MA_Value_Smooth2 > MA_Value_Smooth2[1]
DOWN2 = MA_Value_Smooth2 < MA_Value_Smooth2[1]

/////////////////////////////////////////////////////
//////////       Third MA Filter Trend    ///////////
/////////////////////////////////////////////////////
TREND3 = "-------------------- Moving Average 3 --------------------"
Plot_MA3 = input.bool(true, title = "Plot third MA trend?", inline = "Trend5", group = TREND3)
TimeFrame_Trend3 = input.timeframe(title='HTF', defval='240', inline = "Trend5", group = TREND3)
length3 = input.int(50, title="Length third MA", minval=1, tooltip = "Number of bars used to measure trend on higher timeframe chart", inline = "Trend6", group = TREND3)
MA_Type3  = input.string(defval="McGinley" , options=["EMA","DEMA","TEMA","SMA","WMA", "HMA", "McGinley"], title="MA type:", inline = "Trend6", group = TREND3)

// Second Moving Average
MAtrend3 = ma(MA_Type3, close, length3)
MA_Value_HTF3 = request.security(syminfo.tickerid, TimeFrame_Trend3, MAtrend3)

// Get minutes for current and higher timeframes
higherTFMinutes3 = timeframeToMinutes(TimeFrame_Trend3)

// Calculate the smoothing factor for the second moving average
dynamicSmoothing3 = math.round(higherTFMinutes3 / currentTFMinutes)
MA_Value_Smooth3 = ta.sma(MA_Value_HTF3, dynamicSmoothing3)

// Trend HTF for the second moving average
UP3 = MA_Value_Smooth3 > MA_Value_Smooth3[1]
DOWN3 = MA_Value_Smooth3 < MA_Value_Smooth3[1]

/////////////////////////////////////////////////////
//////////         Entry Settings        ////////////
/////////////////////////////////////////////////////
BuySignal = ta.crossover(MA_Value_HTF, MA_Value_HTF2) and UP3 == true
SellSignal = ta.crossunder(MA_Value_HTF, MA_Value_HTF2) and DOWN3 == true
ExitBuy = ta.crossunder(MA_Value_HTF, MA_Value_HTF2)
ExitSell = ta.crossover(MA_Value_HTF, MA_Value_HTF2)

/////////////////////////////////////////////////
///////////       Strategy       ////////////////
///////////      Entry & Exit    ////////////////
///////////         logic        ////////////////
/////////////////////////////////////////////////
// Long
if BuySignal
    strategy.entry("Long", strategy.long, qty = QtyTrade)

if (strategy.position_size > 0 and ExitBuy == true)
    strategy.close(id = "Long", comment = "Close Long")

// Short
if SellSignal
    strategy.entry("Short", strategy.short, qty = QtyTrade)

if (strategy.position_size < 0 and ExitSell == true)
    strategy.close(id = "Short", comment = "Close Short")

/////////////////////////////////////////////////////
//////////         Visuals Chart         ////////////
/////////////////////////////////////////////////////
// Plot Moving Average HTF
p1 = plot(Plot_MA ? MA_Value_Smooth : na, "HTF Trend", color = UP ? color.rgb(238, 255, 0) : color.rgb(175, 173, 38), linewidth = 1, style = plot.style_line)
p2 = plot(Plot_MA2 ? MA_Value_Smooth2 : na, "HTF Trend", color = UP2 ? color.rgb(0, 132, 255) : color.rgb(0, 17, 255), linewidth = 1, style = plot.style_line)
plot(Plot_MA3 ? MA_Value_Smooth3 : na, "HTF Trend", color = UP3 ? color.rgb(0, 255, 8) : color.rgb(255, 0, 0), linewidth = 2, style = plot.style_line)
fill(p1, p2, color = color.rgb(255, 208, 0, 90), title="Fill")
```

> Detail

https://www.fmz.com/strategy/442618

> Last Modified

2024-02-23 12:07:11
