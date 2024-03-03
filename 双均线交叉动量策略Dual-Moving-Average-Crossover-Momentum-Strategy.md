
> Name

双均线交叉动量策略Dual-Moving-Average-Crossover-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/73205a6706c2c7f32b.png)
[trans]

## 概述

该策略运用双均线交叉原理,结合MACD指标的趋势判断和背景突出交叉点,辅以形态点进场,目的是捕捉市场中期趋势。主要逻辑是在均线方向发生转换时进场,通过MACD背景色突出交叉点,配合MACD直方图颜色变化判断力度进入。

## 策略原理

策略使用快速EMA和慢速EMA构建双均线,快慢线交叉判断趋势方向。同时,计算MACD和Signal,其差值作为直方图绘制。

根据代码,快线长度为12,慢线长度为26,表示短期和长期趋势。Signal长度为9,进行额外平滑处理。

交叉逻辑:

- trend_up = macd > signal:快线上穿慢线,代表短期上升趋势
- trend_dn = macd < signal:快线下穿慢线,代表短期下降趋势

交叉点判断:

- cross_UP = signal[1] >= macd[1] and signal < macd:快线从下方上穿慢线 
- cross_DN = signal[1] <= macd[1] and signal > macd:快线从上方下穿慢线

直方图颜色变化判断趋势力度:

- histA_IsUp = 直方图柱子增长且大于0,代表上升力度增强
- histA_IsDown = 直方图柱子减小且大于0,代表上升力度减弱
- 下方同理

## 策略优势

1. 使用双均线判断中期趋势方向,避免被短期市场噪音干扰

2. MACD指标辅助判断短期趋势和力度,提高获利概率

3. 直方图颜色变化判定力度大小,可把握较好的入场时机

4. 交叉点背景色标记,一目了然

5. 可自定义均线周期,适应不同市场环境

6. 可调整MACD参数,优化指标效果

7. 提供多种入场确认:均线方向、指标交叉、形态突破

## 策略风险

1. 双均线判断中期趋势对短期波动不敏感,可能错过短线机会

2. MACD参数设置不当,指标效果不佳,发出错误信号

3. 仅凭均线和MACD信号入场,存在一定盲目性

4. 未考虑止损退出机制,存在亏损扩大风险

5. 缺乏严格的资金管理和仓位控制

可能的解决方案:

1. 结合其他指标限定短期波动范围,控制风险

2. 优化MACD参数,测试不同市场的效果

3. 增加形态、Momentum等因素确认信号

4. 建立止损机制,避免单笔亏损过大

5. 加入资金管理模块,根据资金规模控制单笔仓位

## 策略优化方向 

1. 测试优化均线参数组合,适应更多市场情况

2. 尝试不同类型均线,如VWAP、布林带中线等

3. 增加成交量的考量,避免假突破

4. 结合RSI等指标,确认超买超卖情况

5. 建立完善的止损机制,如移动止损、震荡止损等

6. 加入仓位管理机制,根据资金大小控制单笔仓位

7. 可以考虑结合机器学习算法进行参数优化

8. 扩展策略 Universe,深化组合投资方向 

## 总结

该策略整合双均线趋势判断和MACD动量指标,加入形态特征,构建了一个相对稳定的中期交易策略。核心优势在于把握主要趋势方向,避免被短期市场噪音干扰。但也存在一些可优化空间,如止损机制、风险管理等方面。总体来说,该策略作为概念验证具有很好的参考价值,但实盘落地还需经过全面的测试和优化调整。
||

## Overview

This strategy utilizes the dual moving average crossover principle, combines the MACD indicator for trend judgment and cross background highlighting, and confirms entries with pattern dots, aiming to capture mid-term trends in the market. The main logic is to enter when the direction of the moving averages changes, stand out cross points with MACD background colors, and determine momentum by the change in MACD histogram colors.

## Strategy Logic

The strategy builds dual moving averages using fast EMA and slow EMA, and determines the trend direction based on the crossover between the fast and slow lines. It also calculates the MACD and Signal, and plots their difference as a histogram. 

According to the code, the fast line length is 12 and the slow line length is 26, representing short-term and long-term trends. The Signal length is 9 for additional smoothing.

Crossover logic:

- trend_up = macd > signal: fast line crosses above slow line, indicating short-term uptrend

- trend_dn = macd < signal: fast line crosses below slow line, indicating short-term downtrend

Crossover point detection: 

- cross_UP = signal[1] >= macd[1] and signal < macd: fast line crosses slow line from below

- cross_DN = signal[1] <= macd[1] and signal > macd: fast line crosses slow line from above

Histogram color change determines momentum strength:

- histA_IsUp = Histogram column growing and greater than 0, momentum strengthening in uptrend

- histA_IsDown = Histogram column declining but still greater than 0, momentum weakening in uptrend

- Same logic below 0

## Advantages

1. Dual moving averages determine mid-term trend, avoid short-term noise

2. MACD assists in judging short-term trends and momentum for higher profitability 

3. Histogram color change helps identify better entry timing

4. Crossover background color highlights signals

5. Customizable moving average periods suit different market environments

6. Adjustable MACD parameters optimize the indicator

7. Provides multiple entry confirmations: trend, crossover, pattern breakout

## Risks

1. Dual MAs insensitive to short-term fluctuations, may miss short-term opportunities

2. Poor MACD effect with improper parameter settings, may generate false signals

3. Entries based solely on MAs and MACD have some blind spots

4. No stop loss mechanism results in risk of expanding losses

5. Lack of strict money management and position sizing

Possible solutions:

1. Combine other indicators to define short-term swing ranges and control risk

2. Optimize MACD parameters and test on different markets

3. Add pattern, momentum etc. to confirm signals

4. Establish stop loss mechanisms to limit loss size

5. Add money management module to size positions based on capital

## Optimization Directions

1. Test and optimize MA parameter combinations for more market adaptability 

2. Try different MA types like VWAP, Bollinger midline etc.

3. Consider trading volume to avoid false breakouts

4. Incorporate RSI etc. to confirm overbought/oversold

5. Build robust stop loss mechanisms like trailing stop, volatility stop etc.

6. Incorporate position sizing based on account size 

7. Consider machine learning for parameter optimization

8. Expand strategy universe for enhanced portfolio approach

## Conclusion

This strategy integrates dual moving average trend filtering and MACD momentum, adds pattern features, building a relatively stable mid-term trading system. The key advantage lies in capturing the major trend while avoiding short-term noise. But there are also areas that could be improved, like adding stop loss mechanisms and risk management. Overall this serves as a valuable conceptual example, but requires comprehensive testing and refinements for live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1||Indicator TimeFrame|
|v_input_int_1|12|Fast Length|
|v_input_int_2|26|Slow Length|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|9|Signal Smoothing|
|v_input_string_1|0|Oscillator MA Type: EMA|SMA|
|v_input_string_2|0|Signal Line MA Type: EMA|SMA|
|v_input_bool_1|true|(?Show Plots)Show MACD Lines|
|v_input_int_4|3|MACD Width|
|v_input_int_5|2|Signal Width|
|v_input_bool_2|true|Show Histogram|
|v_input_int_6|5|-- Width|
|v_input_bool_3|true|Show MACD Lines w/ Trend Color|
|v_input_bool_4|false|Show Highlight Price Bars|
|v_input_bool_5|false|Show BackGround on Cross|
|v_input_bool_6|true|Show Circle on Cross|
|v_input_int_7|5|-- Width|
|v_input_color_1|#FF6D00|(?Color Settings)MACD Line  |
|v_input_color_2|#2962FF|Signal Line  |
|v_input_color_3|#4BAF4F|Trend Up      |
|v_input_color_4|#B71D1C|Trend Down    |
|v_input_color_5|#26A69A|(?Histogram Colors)Above   Grow|
|v_input_color_6|#FF5252|Fall|
|v_input_color_7|#FF5252|Below Grow|
|v_input_color_8|#f8f524|Fall|
|v_input_bool_7|true|(?Alerts)MACD Cross Up|
|v_input_bool_8|true|MACD Cross Dn|
|v_input_bool_9|false|MACD Cross Up & > 0|
|v_input_bool_10|false|MACD Cross Dn & < 0|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-15 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Histogram MacD MVP_V2.1", shorttitle="Histogram MacD MVP_2.1")
//Plot Inputs
res           = input.timeframe("",  "Indicator TimeFrame")
fast_length   = input.int(title="Fast Length", defval=12)
slow_length   = input.int(title="Slow Length", defval=26)
src           = input.source(title="Source", defval=close)
signal_length = input.int(title="Signal Smoothing", minval = 1, maxval = 999, defval = 9)
sma_source    = input.string(title="Oscillator MA Type", defval="EMA", options=["SMA", "EMA"])
sma_signal    = input.string(title="Signal Line MA Type", defval="EMA", options=["SMA", "EMA"])
// Show Plots T/F
show_macd     = input.bool(true, title="Show MACD Lines", group="Show Plots?", inline="SP10")
show_macd_LW  = input.int(3, minval=0, maxval=5, title = "MACD Width", group="Show Plots?", inline="SP11")
show_signal_LW= input.int(2, minval=0, maxval=5, title = "Signal Width", group="Show Plots?", inline="SP11")
show_Hist     = input.bool(true, title="Show Histogram", group="Show Plots?", inline="SP20")
show_hist_LW  = input.int(5, minval=0, maxval=5, title = "-- Width", group="Show Plots?", inline="SP20")
show_trend    = input.bool(true, title = "Show MACD Lines w/ Trend Color", group="Show Plots?", inline="SP30")
show_HB       = input.bool(false, title="Show Highlight Price Bars", group="Show Plots?", inline="SP40")
show_cross    = input.bool(false, title = "Show BackGround on Cross", group="Show Plots?", inline="SP50")
show_dots     = input.bool(true, title = "Show Circle on Cross", group="Show Plots?", inline="SP60")
show_dots_LW  = input.int(5, minval=0, maxval=5, title = "-- Width", group="Show Plots?", inline="SP60")

//show_trend    = input(true, title = "Colors MACD Lines w/ Trend Color", group="Show Plots?", inline="SP5")
// MACD Lines colors
col_macd      = input.color(#FF6D00, "MACD Line  ",  group="Color Settings", inline="CS1")
col_signal    = input.color(#2962FF, "Signal Line  ",  group="Color Settings", inline="CS1")
col_trnd_Up   = input.color(#4BAF4F, "Trend Up      ",  group="Color Settings", inline="CS2")
col_trnd_Dn   = input.color(#B71D1C, "Trend Down    ",  group="Color Settings", inline="CS2")
// Histogram Colors
col_grow_above = input.color(#26A69A, "Above   Grow",  group="Histogram Colors", inline="Hist10")
col_fall_above = input.color(#FF5252, "Fall",  group="Histogram Colors", inline="Hist10")
col_grow_below = input.color(#FF5252, "Below Grow",  group="Histogram Colors", inline="Hist20")
col_fall_below = input.color(#f8f524, "Fall",  group="Histogram Colors", inline="Hist20")
// Alerts T/F Inputs
alert_Long    = input.bool(true, title = "MACD Cross Up", group = "Alerts", inline="Alert10")
alert_Short   = input.bool(true, title = "MACD Cross Dn", group = "Alerts", inline="Alert10")
alert_Long_A  = input.bool(false, title = "MACD Cross Up & > 0", group = "Alerts", inline="Alert20")
alert_Short_B = input.bool(false, title = "MACD Cross Dn & < 0", group = "Alerts", inline="Alert20")
// Calculating
fast_ma = request.security(syminfo.tickerid, res, sma_source == "SMA" ? ta.sma(src, fast_length) : ta.ema(src, fast_length))
slow_ma = request.security(syminfo.tickerid, res, sma_source == "SMA" ? ta.sma(src, slow_length) : ta.ema(src, slow_length))
macd = fast_ma - slow_ma
signal = request.security(syminfo.tickerid, res, sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length))
hist = macd - signal
// MACD Trend and Cross Up/Down conditions
trend_up   = macd > signal
trend_dn   = macd < signal
cross_UP   = signal[1] >= macd[1] and signal < macd
cross_DN   = signal[1] <= macd[1] and signal > macd
cross_UP_A = (signal[1] >= macd[1] and signal < macd) and macd > 0
cross_DN_B = (signal[1] <= macd[1] and signal > macd) and macd < 0
// Condition that changes Color of MACD Line if Show Trend is turned on..
trend_col = show_trend  and trend_up ? col_trnd_Up : trend_up ? col_macd : show_trend  and trend_dn ? col_trnd_Dn: trend_dn ? col_macd : na 

//Var Statements for Histogram Color Change
var bool histA_IsUp = false
var bool histA_IsDown = false
var bool histB_IsDown = false
var bool histB_IsUp = false
histA_IsUp   := hist == hist[1] ? histA_IsUp[1] : hist > hist[1] and hist > 0
histA_IsDown := hist == hist[1] ? histA_IsDown[1] : hist < hist[1] and hist > 0
histB_IsDown := hist == hist[1] ? histB_IsDown[1] : hist < hist[1] and hist <= 0
histB_IsUp   := hist == hist[1] ? histB_IsUp[1] : hist > hist[1] and hist <= 0

hist_col =  histA_IsUp ? col_grow_above : histA_IsDown ? col_fall_above : histB_IsDown ? col_grow_below : histB_IsUp ? col_fall_below :color.silver 

// Plot Statements
//Background Color
bgcolor(show_cross and cross_UP ? col_trnd_Up : na, editable=false)
bgcolor(show_cross and cross_DN ? col_trnd_Dn : na, editable=false)
//Highlight Price Bars
barcolor(show_HB and trend_up ? col_trnd_Up : na, title="Trend Up", offset = 0, editable=false)
barcolor(show_HB and trend_dn ? col_trnd_Dn : na, title="Trend Dn", offset = 0, editable=false)
//Regular Plots
plot(show_Hist and hist ? hist : na, title="Histogram", style=plot.style_columns, color=color.new(hist_col ,0),linewidth=show_hist_LW)
plot(show_macd  and signal ? signal : na, title="Signal", color=color.new(col_signal, 0),  style=plot.style_line ,linewidth=show_signal_LW)
plot(show_macd  and macd ? macd : na, title="MACD", color=color.new(trend_col, 0),  style=plot.style_line ,linewidth=show_macd_LW)
hline(0, title="0 Line", color=color.new(color.gray, 0), linestyle=hline.style_dashed, linewidth=1, editable=false)
plot(show_dots and cross_UP ? macd : na, title="Dots", color=color.new(trend_col ,0), style=plot.style_circles, linewidth=show_dots_LW, editable=false)
plot(show_dots and cross_DN ? macd : na, title="Dots", color=color.new(trend_col ,0), style=plot.style_circles, linewidth=show_dots_LW, editable=false)

//Alerts
if alert_Long and cross_UP
    alert("Symbol = (" + syminfo.tickerid + ") TimeFrame = (" + timeframe.period + ") Current Price (" + str.tostring(close) + ") MACD Crosses Up.", alert.freq_once_per_bar_close)

if alert_Short and cross_DN
    alert("Symbol = (" + syminfo.tickerid + ") TimeFrame = (" + timeframe.period + ") Current Price (" + str.tostring(close) + ") MACD Crosses Down.", alert.freq_once_per_bar_close)
//Alerts - Stricter Condition - Only Alerts When MACD Crosses UP & MACD > 0 -- Crosses Down & MACD < 0
if alert_Long_A and cross_UP_A
    alert("Symbol = (" + syminfo.tickerid + ") TimeFrame = (" + timeframe.period + ") Current Price (" + str.tostring(close) + ") MACD > 0 And Crosses Up.", alert.freq_once_per_bar_close)

if alert_Short_B and cross_DN_B
    alert("Symbol = (" + syminfo.tickerid + ") TimeFrame = (" + timeframe.period + ") Current Price (" + str.tostring(close) + ") MACD < 0 And Crosses Down.", alert.freq_once_per_bar_close)


if (histA_IsUp)
	strategy.entry("buy", strategy.long, comment="buy")
if (histA_IsDown)
	strategy.entry("sell", strategy.short, comment="sell")

```

> Detail

https://www.fmz.com/strategy/432356

> Last Modified

2023-11-16 17:25:13
