
> Name

基于多重支撑阻力的趋势追踪策略Trend-Following-Strategy-Based-on-Dynamic-Support-and-Resistance

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种利用动态支撑阻力进行趋势交易的量化策略。该策略运用多重指标设定动态的支撑阻力,以捕捉价格趋势。

一、策略原理

该策略的主要组成部分有:

1. 计算一定周期内的最高价和最低价,设定动态的多空通道;

2. 计算ATR指标,并设定上下轨道作为动态止损位;

3. 当价格突破通道时,以一定斜率绘制动态支撑阻力;

4. 价格突破动态支撑阻力时,形成交易信号。

综合多重指标设定动态的支撑阻力带,只有在突破带时才进行交易,以滤除不必要的噪音信号。同时,止损位也会动态调整,以应对市场变化。

二、策略优势

该策略最大的优势在于多重动态指标设定支撑阻力,这可以灵活有效地识别价格趋势的变化。

另一优势是带状止损区,这可以减少止损被突破的概率。

最后,斜率支撑阻力的绘制方式简单直接,易于实现。

三、潜在风险

但我们也应考虑以下潜在风险:

首先,动态支撑阻力可能滞后价格变化而失效。

其次,止损区过于宽泛可能带来较大亏损。

最后,参数设置不当也可能导致策略效果不佳。

四、内容总结

本文详细介绍了一种利用动态多重指标识别支撑阻力的趋势追踪策略。它可以有效过滤噪音,识别趋势。但我们也要防范指标滞后和止损过宽等风险。总体而言,该策略提供了一种合理利用动态支撑阻力的思路。

||

This article explains in detail a trend trading strategy that utilizes dynamic support and resistance levels. It sets flexible support and resistance zones using multiple indicators to capture price trends.

I. Strategy Logic

The main components of the strategy include:

1. Calculating highest high and lowest low over a certain period to define dynamic trading ranges.

2. Computing ATR indicator and setting upper/lower bands as dynamic stop loss zones.

3. Drawing dynamic support/resistance at fixed slopes when price breaks out of the trading range. 

4. Generating trade signals when price breaks through dynamic support/resistance levels.

By synthesizing dynamic support/resistance zones using various indicators, trades are only taken on breakouts to filter out unnecessary noise. The stop loss zones also adjust dynamically to market changes.

II. Advantages of the Strategy

The biggest advantage lies in the dynamic zones formed by multiple indicators, which can nimbly detect trend changes.

Another benefit is the banded stop loss zones, which reduce the probability of stops being hit. 

Finally, the sloped support/resistance is simple and straightforward to implement.

III. Potential Risks

However, the following potential risks should also be considered:

Firstly, the dynamic levels may lag price moves and become invalidated.

Secondly, stop loss zones set too wide may lead to large losses. 

Lastly, improper parameter tuning could lead to poor strategy performance.

IV. Summary

In summary, this article has explained a trend following strategy using multiple dynamic indicators to identify support and resistance zones. It can effectively filter out noise and detect trends. But risks like indicator lagging and overwide stops should be prevented. Overall, it provides a reasonable approach to utilize dynamic support and resistance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|2019|Start-Year|
|v_input_int_2|true|Month|
|v_input_int_3|true|Day|
|v_input_int_4|2099|End-Year|
|v_input_int_5|true|Month|
|v_input_int_6|true|Day|
|v_input_int_7|14|ATR Period|
|v_input_1_close|0|Source Upper: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2_close|0|Source Lower: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_8|true|ATR Multiplier Upper|
|v_input_int_9|true|ATR Multiplier Lower|
|v_input_3|60|donchian_length|
|v_input_float_1|0.03|Slope x|
|v_input_bool_1|false|Mirror Line|
|v_input_bool_2|true|Short Mode On|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This is a strategy that draws a trend line in the form of a slope whenever the high point and low point are updated.
// The upper slope serves as a resistance line, and the lower slope serves as a support line.
// Buy when the [close] of the candle crosses the slope

//@version=5
strategy("Donchian Trendline - Support Resistance Slope [UhoKang]", shorttitle="Donchian Trendline", overlay=true, initial_capital=1000000,default_qty_type=strategy.percent_of_equity,default_qty_value=100,commission_value=0.075, slippage=3, process_orders_on_close=true)
///////////////////////////////////// Time ///////////////////////////////////////////////////////////////////////////////
startYear   = input.int(2019, 'Start-Year', confirm=false, inline='1')
startMonth  = input.int(1,    'Month',      confirm=false, inline='1')
startDay    = input.int(1,    'Day',      confirm=false, inline='1')
finishYear  = input.int(2099, 'End-Year', confirm=false, inline='2')
finishMonth = input.int(1,    'Month',      confirm=false, inline='2')
finishDay   = input.int(1,    'Day',      confirm=false, inline='2')
startTime = timestamp(startYear, startMonth, startDay)
finishTime = timestamp(finishYear, finishMonth, finishDay)
testPeriod = true

//////////////////////// ATR BAND ///////////////////////////////////////////////////////////////////////////////////////////
// Inputs
atrPeriod = input.int(title = "ATR Period", defval = 14, minval = 1)
atrBandUpper = input(title = "Source Upper", defval = close)
atrBandLower = input(title = "Source Lower", defval = close)
atrMultiplierUpper = input.int(title = "ATR Multiplier Upper", defval = 1)
atrMultiplierLower = input.int(title = "ATR Multiplier Lower", defval = 1)

// ATR ///////////////////////////////////////////////////////////////////////////////
//------------------------------------------------------------------------------------
atr = ta.atr(atrPeriod)
atrBBUpper = atrBandUpper + (atr * atrMultiplierUpper)
atrBBLower = atrBandLower - (atr * atrMultiplierLower)

/////////////////////////// Big Candle ///////////////////////////////////////////////
//------------------------------------------------------------------------------------
candle_size = close>=open ? close-open :  open-close
candle_grade_guide = atrBBUpper - atrBBLower
candle_grade = candle_size > candle_grade_guide ? 3 : candle_size > candle_grade_guide/2 ? 2 : 1
candle_grade_color = candle_grade == 3 ? color.new(color.black, 0) : candle_grade == 2 ? color.new(color.purple, 0) : na
barcolor(candle_grade_color, title = "Long candle")

///////////////////////////////////// Donchian ///////////////////////////////////////
//------------------------------------------------------------------------------------
donchian_length = input(60)
donchian_top = ta.highest(high, donchian_length)
donchian_bot = ta.lowest(low, donchian_length)
donchian_mid = (donchian_top + donchian_bot) / 2

plot_donchian_top = plot(donchian_top,  color=color.new(color.green, 90), title = "Donchian Top")
plot_donchian_bot = plot(donchian_bot,  color=color.new(color.red, 90), title = "Donchian Bottom")
plot_donchian_mid = plot(donchian_mid,  color=color.new(color.orange, 0), title = "Donchian Middle")
fill(plot_donchian_top, plot_donchian_mid, color=color.new(color.green, 95), title = "Donchian Upper")
fill(plot_donchian_bot, plot_donchian_mid, color=color.new(color.red, 95), title = "Donchian Lower")

///////////////////////////// Trendline //////////////////////////////////////////////////
//------------------------------------------------------------------------------------
donchian_longTr = false
donchian_shortTr = false 
var atrLongHeight = 0.0 
var atrShortHeight = 0.0 
if high > donchian_top[1] 
    donchian_longTr := true 
    atrLongHeight := atrBBUpper[1] - atrBBLower[1]
if low < donchian_bot[1] 
    donchian_shortTr := true
    atrShortHeight := atrBBUpper[1] - atrBBLower[1]
donchian_Tr_color = donchian_longTr ? color.new(color.green,70) : donchian_shortTr ? color.new(color.red, 70) : na 

//////////////////////// Set var //////////////////////////////////////////////
//------------------------------------------------------------------------------------
slope_mult = input.float(0.03, step=0.01,  title = "Slope x")
var ph_M_Avg = 0.0 //slope avg high
var pl_M_Avg = 0.0 //slope avg low 
var ph_M_Line = 0.0 //slope high
var pl_M_Line = 0.0 //slope low

ph_M = donchian_longTr[1]==true and high<donchian_top[1] ? high[1] : na
pl_M = donchian_shortTr[1]==true and low>donchian_bot[1] ? low[1] : na
plot(ph_M,color=color.blue, style = plot.style_linebr, linewidth = 3, offset = -1, title = "Pivot High")
plot(pl_M,color=color.blue, style = plot.style_linebr, linewidth = 3, offset = -1, title = "Pivot Low")
       
/////////////////////////////////////////  Calc trendline /////////////////////////////
//------------------------------------------------------------------------------------

mirror_mode = input.bool(false , title = "Mirror Line")
ph_M_Avg := atrLongHeight * slope_mult
pl_M_Avg := atrShortHeight * slope_mult

// Calc slope
if mirror_mode 
    if ph_M
        ph_M_Line := ph_M
        pl_M_Line := donchian_mid[1]
    else if pl_M
        pl_M_Line := pl_M
        ph_M_Line := donchian_mid[1]
    else if ph_M_Line  
        ph_M_Line := ph_M_Line[1] - ph_M_Avg
        pl_M_Line := pl_M_Line[1] + pl_M_Avg

else 
    if ph_M
        ph_M_Line := ph_M
    else if ph_M_Line  
        ph_M_Line := ph_M_Line[1] - ph_M_Avg
    if pl_M
        pl_M_Line := pl_M
    else if pl_M_Line
        pl_M_Line := pl_M_Line[1] + pl_M_Avg

// Delete trendline
if donchian_bot[1] > ph_M_Line
    ph_M_Line := na
if donchian_top[1] < pl_M_Line
    pl_M_Line := na

// Draw trendline
plot(ph_M_Line, color=color.new(color.green,20), style = plot.style_circles, linewidth = 1, title = "Trendline Top")
plot(pl_M_Line, color=color.new(color.maroon,20), style = plot.style_circles, linewidth = 1, title = "Trendline Bottom")

// Trade 
ph_longTr = false
ph_longExitTr = false
ph_shortTr = false
ph_shortExitTr = false 
//-----------------------------------------------------------------------------}
check_short_mode = input.bool(true, title= "Short Mode On")

if ta.crossover(close, ph_M_Line) 
    ph_longTr := true
else if ta.crossunder(close,pl_M_Line) or ta.crossunder(close, donchian_mid[1]) 
    ph_longExitTr := true 
if ta.crossunder(close, pl_M_Line)
    ph_shortTr := true
else if ta.crossover(close,ph_M_Line) or ta.crossover(close, donchian_mid[1])
    ph_shortExitTr := true

ph_Tr_color = ph_longTr ? color.new(color.green,80) : ph_shortTr ? color.new(color.red,80) : na
bgcolor(ph_Tr_color, title = "Break Slope")

if ph_longTr and testPeriod
    strategy.entry("L", strategy.long)
else if ph_longExitTr 
    strategy.close("L")

if ph_shortTr and testPeriod and check_short_mode
    strategy.entry("S", strategy.short)
else if ph_shortExitTr 
    strategy.close("S")
```

> Detail

https://www.fmz.com/strategy/426851

> Last Modified

2023-09-14 20:24:31
