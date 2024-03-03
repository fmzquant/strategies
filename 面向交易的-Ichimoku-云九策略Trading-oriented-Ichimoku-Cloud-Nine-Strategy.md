
> Name

面向交易的-Ichimoku-云九策略Trading-oriented-Ichimoku-Cloud-Nine-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12d2261c6ce4229dfe3.png)
[trans]
## 概述

Ichimoku 云九策略是基于 Ichimoku 云指标并结合 Williams 分型的一个交易策略。该策略利用 Ichimoku 云指标提供的多个交易信号来产生交易信号。这是一个面向实际交易的策略。

## 策略原理

该策略主要基于以下几个 Ichimoku 信号进行入场:

1. 云层突破:当价格收盘突破云层上边缘或下边缘时产生信号
2. TK 交叉:当转向线(Tenkan)与基准线(Kijun)交叉时产生信号  
3. 云层扭转:当 Senkou Span A 线和 Senkou Span B 线交叉时产生信号
4. 边沿交叉:当价格从一侧云层进入另一侧云层时产生信号  

此外,该策略还会在以下情况平仓:

1. 价格收盘进入云层时平仓 
2. TK 反向交叉时平仓
3. Williams 分型被突破时部分平仓

该策略融合了 Ichimoku 云图的多个交易信号,旨在提高交易信号的可靠性,同时利用分型来设置止损,控制风险。

## 策略优势

相比单一信号的策略,该策略综合利用 Ichimoku 云图的多个信号,可以过滤掉一些错位信号,提高信号的准确率。同时,策略参数可以灵活配置,适用于不同品种和参数优化。

另外,策略中引入 Williams 分型突破来设置止损,可以更主动地控制风险,锁定利润,避免巨额亏损。

## 策略风险

该策略主要面临以下风险:

1. 云图指标存在滞后性,不能及时反映价格变化
2. 多重信号可能过于保守,错过部分机会  
3. 分型止损可能被突破造成损失

针对滞后性问题,可以适当调整参数,或关闭部分过滤信号。针对分型止损风险,可以调整分型的时间周期,或只部分止损。

## 策略优化方向 

该策略主要可以从以下几个方面进行优化:

1. 调整 Ichimoku 参数,适应不同周期和品种
2. 调整或关闭部分过滤信号,保留核心信号 
3. 调整分型的参数,使用更大时间周期的分型,或只采用部分止损
4. 增加其他指标过滤,如量能指标等

## 总结

Ichimoku 云九策略通过集成 Ichimoku 云图多个交易信号,在发挥云图指标优势的同时,提高信号的准确率和胜率。策略还采用分型作为止损方式来控制风险。该策略可以通过参数和信号优化,适用于多品种的算法交易。

||

## Overview  

The Ichimoku Cloud Nine strategy is built on top of the Ichimoku Cloud indicator combined with the usage of Williams Fractals. This is a trading-oriented strategy that utilizes multiple trade signals from the Ichimoku Cloud.  

## Strategy Logic  

The strategy mainly uses the following Ichimoku signals to enter trades:  

1. Kumo Breakout: generates signal when price closes above or below the cloud  
2. TK Cross: generates signal when Tenkan crosses Kijun  
3. Kumo Twist: generates signal when Senkou Span A crosses Senkou Span B
4. Edge to Edge: generates signal when price enters either side of the Cloud

The strategy will exit trades in the following situations:  

1. Price closing inside the Cloud  
2. TK Cross in opposite direction
3. Breach of Williams Fractal in opposite direction  

The strategy combines multiple Ichimoku signals to increase reliability while utilizing fractals as stop loss to control risk.

## Advantages  

Compared to single signal strategies, this strategy filters signals through multiple Ichimoku signals, improving accuracy. Strategy parameters are flexible for optimization across products.  

Usage of fractals as stop loss actively controls risk and locks in profits.

## Risks

Main risks faced:  

1. Lagging nature of Ichimoku Cloud  
2. Multiple signals may be too conservative missing opportunities 
3. Fractal stop loss could be taken out  

Mitigations: Adjust parameters or remove some signals. Tune fractal time period or only partial stop loss on fracture.

## Enhancement Opportunities

Main areas for optimization:

1. Adjust Ichimoku parameters for different products  
2. Remove some signals, retain core rules
3. Tune fractal parameters to use higher timeframes or only partial stop  
4. Add other indicators like volume 

## Conclusion  

The Ichimoku Cloud Nine strategy improves Ichimoku trading by combining signals to increase accuracy and win rate. Usage of fractals manages risk. Parameters and signals can be optimized for automated trading across different products.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|false|(?Fractals)Use William Fractals for SL?|
|v_input_int_1|2|Periods|
|v_input_int_2|100|Position % to close on fractal breach|
|v_input_timeframe_1|0|Timeframe: Current|1D|12H|8H|4H|1H|
|v_input_int_3|20|(?Cloud Settings)Conversion Line Periods|
|v_input_int_4|60|Base Line Periods|
|v_input_int_5|120|Lagging Span 2 Periods|
|v_input_int_6|30|Displacement|
|v_input_bool_2|true|(?Entries)Longs|
|v_input_bool_3|true|Shorts|
|v_input_bool_4|true|Wait for kumo twist?|
|v_input_bool_5|true|Ignore Lagging Span Signal?|
|v_input_bool_6|true|Kijun Bounce|
|v_input_bool_7|true|(?Edge 2 Edge)Enable|
|v_input_bool_8|true|Require TK Confluence?|
|v_input_float_1|10|Minimun Cloud Thickness (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-19 00:00:00
end: 2024-02-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Ichimoku Cloud Nine", shorttitle="Ichimoku Cloud Nine", overlay=true, calc_on_every_tick = true, calc_on_order_fills = false, initial_capital = 5000, currency = "USD", default_qty_type = "percent_of_equity", default_qty_value = 10, pyramiding = 3, process_orders_on_close = true)

color green = #459915
color red = #991515

// --------
// Fractals
// --------

// Define "n" as the number of periods and keep a minimum value of 2 for error handling.
close_on_fractal = input.bool(false, title="Use William Fractals for SL?", group = "Fractals")
n = input.int(title="Periods", defval=2, minval=2, group = "Fractals")
fractal_close_percentage = input.int(100, minval=1, maxval=100, title="Position % to close on fractal breach", group = "Fractals")
selected_fractals_timeframe = input.timeframe('Current', "Timeframe", options=["Current", "1D", "12H", "8H", "4H", "1H"], group = "Fractals", tooltip = "Timeframe to use to look for fractals. Example: if 12H is selected, it will close positions when the last 12H fractal is breached.")

string fractals_timeframe = switch selected_fractals_timeframe
    "1D" => "1D"
    "12H" => "720"
    "8H" => "480"
    "4H" => "240"
    "1H" => "60"
    // Default used when the three first cases do not match.
    => ""

prev_high = request.security(syminfo.tickerid, fractals_timeframe, high)
prev_low = request.security(syminfo.tickerid, fractals_timeframe, low)

period_high=prev_high
period_low=prev_low

// UpFractal
bool upflagDownFrontier = true
bool upflagUpFrontier0 = true
bool upflagUpFrontier1 = true
bool upflagUpFrontier2 = true
bool upflagUpFrontier3 = true
bool upflagUpFrontier4 = true

for i = 1 to n
    upflagDownFrontier := upflagDownFrontier and (period_high[n-i] < period_high[n])
    upflagUpFrontier0 := upflagUpFrontier0 and (period_high[n+i] < period_high[n])
    upflagUpFrontier1 := upflagUpFrontier1 and (period_high[n+1] <= period_high[n] and period_high[n+i + 1] < period_high[n])
    upflagUpFrontier2 := upflagUpFrontier2 and (period_high[n+1] <= period_high[n] and period_high[n+2] <= period_high[n] and period_high[n+i + 2] < period_high[n])
    upflagUpFrontier3 := upflagUpFrontier3 and (period_high[n+1] <= period_high[n] and period_high[n+2] <= period_high[n] and period_high[n+3] <= period_high[n] and period_high[n+i + 3] < period_high[n])
    upflagUpFrontier4 := upflagUpFrontier4 and (period_high[n+1] <= period_high[n] and period_high[n+2] <= period_high[n] and period_high[n+3] <= period_high[n] and period_high[n+4] <= period_high[n] and period_high[n+i + 4] < period_high[n])
flagUpFrontier = upflagUpFrontier0 or upflagUpFrontier1 or upflagUpFrontier2 or upflagUpFrontier3 or upflagUpFrontier4

upFractal = (upflagDownFrontier and flagUpFrontier)

var float upFractalPrice = 0

if (upFractal)
    upFractalPrice := period_high[n]

// downFractal
bool downflagDownFrontier = true
bool downflagUpFrontier0 = true
bool downflagUpFrontier1 = true
bool downflagUpFrontier2 = true
bool downflagUpFrontier3 = true
bool downflagUpFrontier4 = true

for i = 1 to n
    downflagDownFrontier := downflagDownFrontier and (period_low[n-i] > period_low[n])
    downflagUpFrontier0 := downflagUpFrontier0 and (period_low[n+i] > period_low[n])
    downflagUpFrontier1 := downflagUpFrontier1 and (period_low[n+1] >= period_low[n] and period_low[n+i + 1] > period_low[n])
    downflagUpFrontier2 := downflagUpFrontier2 and (period_low[n+1] >= period_low[n] and period_low[n+2] >= period_low[n] and period_low[n+i + 2] > period_low[n])
    downflagUpFrontier3 := downflagUpFrontier3 and (period_low[n+1] >= period_low[n] and period_low[n+2] >= period_low[n] and period_low[n+3] >= period_low[n] and period_low[n+i + 3] > period_low[n])
    downflagUpFrontier4 := downflagUpFrontier4 and (period_low[n+1] >= period_low[n] and period_low[n+2] >= period_low[n] and period_low[n+3] >= period_low[n] and period_low[n+4] >= period_low[n] and period_low[n+i + 4] > period_low[n])
flagDownFrontier = downflagUpFrontier0 or downflagUpFrontier1 or downflagUpFrontier2 or downflagUpFrontier3 or downflagUpFrontier4

downFractal = (downflagDownFrontier and flagDownFrontier)

var float downFractalPrice = 0

if (downFractal)
    downFractalPrice := period_low[n]

plotshape(downFractal, style=shape.triangledown, location=location.belowbar, offset=-n, color=#F44336, size = size.auto)
plotshape(upFractal, style=shape.triangleup,   location=location.abovebar, offset=-n, color=#009688, size = size.auto)

// --------
// Ichimoku
// --------

previous_close = close[1]

conversionPeriods = input.int(20, minval=1, title="Conversion Line Periods", group = "Cloud Settings"),
basePeriods = input.int(60, minval=1, title="Base Line Periods", group = "Cloud Settings")
laggingSpan2Periods = input.int(120, minval=1, title="Lagging Span 2 Periods", group = "Cloud Settings"),
displacement = input.int(30, minval=1, title="Displacement", group = "Cloud Settings")


long_entry = input.bool(true, title="Longs", group = "Entries", tooltip = "Will look for longs")
short_entry = input.bool(true, title="Shorts", group = "Entries", tooltip = "Will look for shorts")
wait_for_twist = input.bool(true, title="Wait for kumo twist?", group = "Entries", tooltip = "Will wait for the Kumo to turn green (longs) or red (shorts)")
ignore_lagging_span = input.bool(true, title="Ignore Lagging Span Signal?", group = "Entries", tooltip = "Will not wait for lagging span to be above/below price and cloud")
bounce_entry = input.bool(true, title="Kijun Bounce", group = "Entries", tooltip = "Will enter position on a Kijun bounce")

e2e_entry = input.bool(true, title="Enable", group = "Edge 2 Edge", tooltip = "Will look for edge-to-edge trades")
e2e_entry_tk_confluence = input.bool(true, title="Require TK Confluence?", group = "Edge 2 Edge", tooltip = "Require confluent TK cross in order to enter an e2e trade")
min_cloud_thickness = input.float(10, minval=1, title="Minimun Cloud Thickness (%)", group = "Edge 2 Edge", tooltip = "Minimum cloud thickness for entering e2e trades")

donchian(len) => math.avg(ta.lowest(len), ta.highest(len))

tenkan = donchian(conversionPeriods)
kijun = donchian(basePeriods)
spanA = math.avg(tenkan, kijun)
spanB = donchian(laggingSpan2Periods)

plot(tenkan, color=#0496ff, title="Tenkan-Sen", linewidth = 2)
plot(kijun, color=red, title="Kijun-Sen", linewidth = 2)
plot(close, offset = -displacement, color=color.gray, title="Chikou Span")

p1 = plot(spanA, offset = displacement, color=green, title="Senkou Span A")
p2 = plot(spanB, offset = displacement, color=red, title="Senkou Span B")
fill(p1, p2, color = spanA > spanB ? color.new(green, 50) : color.new(red, 50))

cloud_high = math.max(spanA[displacement], spanB[displacement])
cloud_low = math.min(spanA[displacement], spanB[displacement])

lagging_span_above_price_and_cloud = (close > close[displacement] and close > cloud_high[displacement]) or ignore_lagging_span
lagging_span_below_price_and_cloud = (close < close[displacement] and close < cloud_low[displacement]) or ignore_lagging_span

step1=cloud_high-cloud_low
step2=(cloud_high+cloud_low)/2
cloud_thickness = (step1/step2)*100

// --------
// Trades
// --------

// LONGS
// kumo breakout
if (long_entry and ta.crossover(close, cloud_high) and tenkan > kijun and close > kijun and lagging_span_above_price_and_cloud and (not wait_for_twist or spanA > spanB))
    comment = "Long - Kumo Breakout"
    strategy.entry("Long", strategy.long, comment = comment)
    alert(comment, alert.freq_once_per_bar)

// tk cross above cloud
if (long_entry and close > cloud_high and ta.crossover(tenkan, kijun) and lagging_span_above_price_and_cloud and (not wait_for_twist or spanA > spanB))
    comment = "Long - TK Cross"
    strategy.entry("Long", strategy.long, comment = comment)
    alert(comment, alert.freq_once_per_bar)

// kumo twist
if (long_entry and close > cloud_high and tenkan > kijun and ta.crossover(spanA, spanB) and lagging_span_above_price_and_cloud)
    comment = "Long - Kumo Twist"
    strategy.entry("Long", strategy.long, comment = comment)
    alert(comment, alert.freq_once_per_bar)

// close inside cloud
if (ta.crossunder(close, cloud_high))
    comment = "Close Long - Close inside cloud"
    strategy.close("Long", comment = comment)
    alert(comment, alert.freq_once_per_bar)

// bearish tk cross
if (ta.crossunder(tenkan, kijun))
    comment = "Close Long - TK Cross"
    strategy.close("Long", comment = comment)
    alert(comment, alert.freq_once_per_bar)


if (close_on_fractal and ta.crossunder(low, downFractalPrice))
    comment = "Close Long - Fractal"
    strategy.close("Long", comment = comment, qty_percent = fractal_close_percentage)
    alert(comment, alert.freq_once_per_bar)


// SHORTS
// kumo breakout
if (short_entry and ta.crossunder(close, cloud_low) and tenkan < kijun and close < kijun and lagging_span_below_price_and_cloud and (not wait_for_twist or spanA < spanB))
    comment = "Short - Kumo Breakout"
    strategy.entry("Short", strategy.short, comment = comment)
    alert(comment, alert.freq_once_per_bar)

// tk cross below cloud
if (short_entry and close < cloud_low and ta.crossunder(tenkan, kijun) and lagging_span_below_price_and_cloud and (not wait_for_twist or spanA < spanB))
    comment = "Short - TK Cross"
    strategy.entry("Short", strategy.short, comment = comment)
    alert(comment, alert.freq_once_per_bar)

// kumo twist
if (short_entry and close < cloud_low and tenkan < kijun and lagging_span_below_price_and_cloud and ta.crossunder(spanA, spanB))
    comment = "Short - Kumo Twist"
    strategy.entry("Short", strategy.short, comment = comment)
    alert(comment, alert.freq_once_per_bar)

// close inside cloud
if (ta.crossover(close, cloud_low))
    comment = "Close Short - Close inside cloud"
    strategy.close("Short", comment = comment)
    alert(comment, alert.freq_once_per_bar)

// bullish tk cross
if (ta.crossover(tenkan, kijun))
    comment = "Close Short - TK Cross"
    strategy.close("Short", comment = comment)
    alert(comment, alert.freq_once_per_bar)

if (close_on_fractal and ta.crossover(high, upFractalPrice))
    comment = "Close Short - Fractal"
    strategy.close("Short", comment = comment, qty_percent = fractal_close_percentage)
    alert(comment, alert.freq_once_per_bar)


// BULL EDGE TO EDGE
if (e2e_entry and e2e_entry_tk_confluence and ta.crossover(close, cloud_low) and tenkan > kijun and open > kijun and cloud_thickness > min_cloud_thickness)
    comment = "Long e2e"
    strategy.entry("Long e2e", strategy.long, comment = comment)
    alert(comment, alert.freq_once_per_bar)

if (e2e_entry and not e2e_entry_tk_confluence and ta.crossover(close, cloud_low) and open > kijun and cloud_thickness > min_cloud_thickness)
    comment = "Long e2e"
    strategy.entry("Long e2e", strategy.long, comment = comment)
    alert(comment, alert.freq_once_per_bar)

if (ta.cross(high, cloud_high))
    comment = "Close Long e2e - Target Hit"
    strategy.close("Long e2e", comment = comment)
    alert(comment, alert.freq_once_per_bar)

if (ta.crossunder(close, cloud_low))
    comment = "Close Long e2e - Close below cloud"
    strategy.close("Long e2e", comment = comment)
    alert(comment, alert.freq_once_per_bar)
 
if (close_on_fractal and ta.crossunder(low, downFractalPrice))
    comment = "Close Long e2e - Fractal"
    strategy.close("Long e2e", comment = comment, qty_percent = fractal_close_percentage)
    alert(comment, alert.freq_once_per_bar)

// BEAR EDGE TO EDGE
if (e2e_entry and e2e_entry_tk_confluence and ta.crossunder(close, cloud_high) and tenkan < kijun and open < kijun and cloud_thickness > min_cloud_thickness)
    comment = "Short e2e"
    strategy.entry("Short e2e", strategy.long, comment = comment)
    alert(comment, alert.freq_once_per_bar)

if (e2e_entry and not e2e_entry_tk_confluence and ta.crossunder(close, cloud_high) and open < kijun and cloud_thickness > min_cloud_thickness)
    comment = "Short e2e"
    strategy.entry("Short e2e", strategy.long, comment = comment)
    alert(comment, alert.freq_once_per_bar)

if (ta.cross(low, cloud_low))
    comment = "Close Short e2e - Target Hit"
    strategy.close("Short e2e", comment = comment)
    alert(comment, alert.freq_once_per_bar)

if (ta.crossover(close, cloud_high))
    comment = "Close Short e2e - Close below cloud"
    strategy.close("Short e2e", comment = comment)
    alert(comment, alert.freq_once_per_bar)
 
if (close_on_fractal and ta.crossover(high, upFractalPrice))
    comment = "Close Short e2e - Fractal"
    strategy.close("Short e2e", comment = comment, qty_percent = fractal_close_percentage)
    alert(comment, alert.freq_once_per_bar)

// Kijun Bounce
if (bounce_entry and long_entry and open > cloud_high and open > kijun and ta.crossunder(low, kijun) and close > kijun and tenkan > kijun and kijun > cloud_high and lagging_span_above_price_and_cloud)
    comment = "Long - Kijun Bounce"
    strategy.entry("Long", strategy.long, comment = comment)
    alert(comment, alert.freq_once_per_bar)

if (bounce_entry and short_entry and open < cloud_low and open < kijun and ta.crossover(high, kijun) and close < kijun and tenkan < kijun and kijun < cloud_low and lagging_span_below_price_and_cloud)
    comment = "Short - Kijun Bounce"
    strategy.entry("Short", strategy.short, comment = comment)
    alert(comment, alert.freq_once_per_bar)

```

> Detail

https://www.fmz.com/strategy/442094

> Last Modified

2024-02-19 11:35:05
