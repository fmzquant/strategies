
> Name

多时间周期动量突破策略Multi-Timeframe-Momentum-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d7d957e62ba9093ed6.png)

[trans]

## 概述

本策略通过结合多种技术指标如 RSI,ADX,ATR 以及动量指标,实现对趋势的判断和突破点的捕获。策略同时结合 Fibonacci 回撤线和均线,进一步提高对关键点位和趋势的判断准确性。

## 策略原理

1. 通过 RSI,ADX,DI+,DI- 等指标判断趋势方向和强度。RSI 可以反映超买超卖情况,ADX 反映趋势强度,DI+/DI- 判断多头和空头趋势。这些指标值显示在右上角的表格中,方便判断。

2. 结合均线判断趋势方向。采用 5 日和 9 日 EMA 判断短期趋势,21日 WMA 判断中期趋势,60日 WMA 判断长期趋势。当短期上穿中长期均线时为多头信号。

3. 利用 Fibonacci 回撤线寻找 0.5,0.618 等关键支撑位。这些点位往往是潜在的反转点。

4. 基于 ATR 和停损比例设置止损价位,以控制风险。基于 ATR 和止盈比例设置止盈价位,以锁定利润。

5. 当出现 RSI 超买超卖信号时,考虑反转进入。当短期均线上穿(下穿)中长期均线且交易量放大时考虑追踪趋势进入。进入信号后设置止损和止盈。

## 优势分析

1. 综合运用多种指标判断趋势方向和强度,提高决策的准确性。

2. 基于ATR设置止损止盈机制,有效控制风险。

3. 结合Fibonacci关键点位,提高反转点判断的准确性。

4. 交易量放大作为追踪趋势的辅助条件,避免假突破。

5. 表格直观显示多项指标当前值,便于快速判断和决策。

## 风险分析

1. 指标发出错误信号的概率无法完全避免,会导致错误操作的风险。可以通过调整参数优化指标的参数。

2. ATR 和止损比例设置会影响实际止损点位。该比例设置过大过小都会带来一定风险,需要权衡设置。

3. 交易量放大作为Entry条件也无法完全避免假突破的出现,需要结合价格行情细节判断。

4. Fibonacci 点位也并非百分之百可靠,价格可能会直接透过该点位突破。

## 优化方向  

1. 对RSI, ADX, ATR等参数进行测试和优化,找到最佳参数组合。

2. 测试不同的均线组合,判断哪些均线组合判断趋势效果最好。

3. 测试不同的止损止盈比例参数,找到风险收益最优的参数。

4. 可以考虑加入BollingerBands指标判断交易量放大的效果。

## 总结

本策略综合运用了趋势判断,关键点位判断,交易量分析等多种技术手段。通过参数优化,进一步提升判断准确性和收益性。止损止盈设置控制了风险,最大化收益。该策略对判断中长线趋势和捕捉短期反转效果较好。通过不断优化测试可以使策略更加稳定和可靠。

||

## Overview

This strategy combines multiple technical indicators like RSI, ADX, ATR and momentum to identify trends and capture breakout points. It also uses Fibonacci retracements and moving averages to further improve identification of key levels and trends.   

## Strategy Logic

1. Use RSI, ADX, DI+, DI- etc to determine trend direction and strength. RSI shows overbought/oversold levels, ADX shows trend strength, while DI+/DI- indicate bullish/bearish trends. These indicators are displayed in a table for easy reference.

2. Use moving averages to determine trend direction. 5 & 9-day EMAs define short-term trend, 21-day WMA medium-term trend and 60-day WMA long-term trend. Golden cross signals potential uptrend.

3. Identify key 0.5, 0.618 Fibonacci retracement levels that often act as support/resistance zones for reversal. 

4. Set stop loss based on ATR and stop loss % to control risk. Take profit based on ATR and take profit % to lock in gains.

5. Consider reversal on RSI overbought/oversold signals. Consider riding trend on golden cross with increased volume. Set stop loss and take profit after entry.

## Advantage Analysis  

1. Combination of indicators improves decision accuracy on trend and strength.

2. ATR-based stop loss & take profit controls risk effectively.  

3. Fibonacci improves identification of reversal points.

4. Volume filter avoids false breakouts when following trends.

5. Table provides clear view of indicator values for quick decisions.

## Risk Analysis

1. Possibility of inaccurate signals cannot be fully avoided, causing incorrect trades. Can optimize parameters to improve indicator accuracy.

2. ATR and stop loss % affects actual stop loss price. Inappropriate setting can increase risk. Requires fine tuning.

3. Volume filter cannot fully avoid false breakouts. Needs checking price action details. 

4. Fibonacci levels not always reliable. Price may break through completely.

## Optimization Directions

1. Test and optimize parameters like RSI, ADX, ATR to find best combinations.

2. Test different moving average combinations for best trend identification. 

3. Test different stop loss/take profit ratios for best risk-reward.

4. Consider adding Bollinger Bands to check for volume expansion.

## Conclusion

This strategy combines trend analysis, key level identification, volume analysis and more. Further parameter optimization can improve accuracy and profitability. Stop loss & take profit manages risk and maximizes reward. It is effective in gauging medium-long term trends and capturing short-term reversals. Continued optimizations can make the strategy more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Plot HVB|
|v_input_bool_2|false|Plot Pivots|
|v_input_int_1|12|Volume EMA Period|
|v_input_float_1|1.5|Volume Multiplier|
|v_input_int_2|2|Pivot Lookup|
|v_input_bool_3|false|Draw EMA,WMA Line|
|v_input_int_3|200|ema1|
|v_input_int_4|300|ema2|
|v_input_int_5|60|wma60|
|v_input_2|false|Show Table ADX, RSI, DI values with RED, GREEN and YELLOW Signal|
|v_input_string_1|0|Table Position: Top Right|Top Left|Top Center|Bottom Right|Bottom Left|Bottom Center|
|v_input_bool_4|false|Plot Fibonacci Retracement|
|v_input_float_2|0.5|Fibonacci Level|
|v_input_float_3|0.618|Fibonacci Level|
|v_input_float_4|0.368|Fibonacci Level|
|v_input_3|1.5|Stop Loss (%)|
|v_input_4|4|Take Profit (%)|
|v_input_1|false|(?TREND LINE Moving Average)Show trend line|
|v_input_int_6|11|Length|
|v_input_int_7|14|(?Table ADX, RSI, DI values with Red, Green, Yellow Signal)RSI Length|
|v_input_int_8|14|ADX Length|
|v_input_int_9|20|ADX Threshold|
|v_input_int_10|25|DI Threshold|
|v_input_int_11|14|ATR values|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-22 00:00:00
end: 2023-12-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © amit74sharma135

//@version=5

strategy(" KritikSharma Strategy for NIFTY,BNIFTY,NG,CRUDE,WTICrude,BTC,GOLD,SILVER,COPPER", overlay=true)
plotHVB = input.bool(defval=true, title='Plot HVB')
plotPVT = input.bool(defval=false, title='Plot Pivots')
hvbEMAPeriod = input.int(defval=12, minval=1, title='Volume EMA Period')
hvbMultiplier = input.float(defval=1.5, title='Volume Multiplier')
pivotLookup = input.int(defval=2, minval=1, maxval=15, title='Pivot Lookup')
ShowAvg1 = input(false, title="Show trend line", group="TREND LINE Moving Average", tooltip="Display a trend line based on EMA.")
showLines1 = input.bool(defval=false, title="Draw EMA,WMA Line")
ema200_length= input.int(defval=200, minval=1, maxval=500, title='ema1')
ema300_length= input.int(defval=300, minval=1, maxval=500, title='ema2')
wma60_length= input.int(defval=60, minval=1, maxval=100, title='wma60')
ema5 = ta.ema(close, 5)
ema9 = ta.ema(close, 9)
wma21=ta.wma(close,21)
wma60=ta.wma(close,wma60_length)
len1 = input.int(11, minval=1, maxval=500, title="Length", group="TREND LINE Moving Average", tooltip="Set EMA length.")
ema=ta.ema(close, len1)
rsiLength = input.int(14, title="RSI Length", minval=1, maxval=50, group="Table ADX, RSI, DI values with Red, Green, Yellow Signal")
adxLength = input.int(14, title="ADX Length", minval=1, maxval=50, group="Table ADX, RSI, DI values with Red, Green, Yellow Signal")
adxThreshold = input.int(20, title="ADX Threshold", group="Table ADX, RSI, DI values with Red, Green, Yellow Signal")
diThreshold = input.int(25, title="DI Threshold", group="Table ADX, RSI, DI values with Red, Green, Yellow Signal")
atr = input.int(14, title="ATR values", group="Table ADX, RSI, DI values with Red, Green, Yellow Signal")
////////////////////////////////////////////////

hvbBullColor = color.rgb(181, 37, 225)
hvbBearColor = #ffbb00ad

pvtTopColor = color.new(#154bef, 0)
pvtBottomColor = color.new(#b81657, 0)

//////////////////// Pivots //////////////////// 
hih = ta.pivothigh(high, pivotLookup, pivotLookup)
lol = ta.pivotlow(low , pivotLookup, pivotLookup)
top1 = ta.valuewhen(hih, high[pivotLookup], 0)
bottom1 = ta.valuewhen(lol, low [pivotLookup], 0)
plot(top1, offset=-pivotLookup, linewidth=1, color=(top1 != top1[1] ? na : (plotPVT ? pvtTopColor : na)), title="Pivot Top")
plot(bottom1, offset=-pivotLookup, linewidth=1, color=(bottom1 != bottom1[1] ? na : (plotPVT ? pvtBottomColor : na)), title="Pivot Bottom")

//////////////////////////////////////Functions
isUp(index) =>
    close[index] > open[index]

isDown(index) =>
    close[index] < open[index]

isObUp(index) =>
    isDown(index + 1) and isUp(index) and close[index] > high[index + 1]

isObDown(index) =>
    isUp(index + 1) and isDown(index) and close[index] < low[index + 1]
////////////////// High Volume Bars //////////////////
volEma = ta.ema(volume, hvbEMAPeriod)
isHighVolume = volume > (hvbMultiplier * volEma)
barcolor(plotHVB and isUp(0) and isHighVolume ? hvbBullColor : na, title="Bullish HVB")
barcolor(plotHVB and isDown(0) and isHighVolume ? hvbBearColor : na, title="Bearish HVB")

// Calculate ADX, DI+,  DI-,RSI,ATR
[diplus, diminus, adx] = ta.dmi(adxLength, adxThreshold)
rsi=ta.rsi(close,rsiLength)
atrValue=ta.atr(atr)

// Check for oversold,Overbought condition
oversold_condition = rsi < 20
overbought_condition = rsi > 80

// Plot Trend Line
trendColor = ema5 > ema9 ? color.rgb(22, 203, 28) : ema5 < ema9 ? color.rgb(224, 15, 15) : na
plot(ShowAvg1? ema:na, color=trendColor, linewidth=6, title="Trend Line Upper Ribbon")

/////////////////////////plot ema,wma
plot(showLines1 ? ta.ema(close, ema200_length) : na, color=color.rgb(102, 110, 103), style=plot.style_line, title="ema1",linewidth = 4)
plot(showLines1 ? ta.ema(close, ema300_length) : na, color=color.rgb(18, 20, 18), style=plot.style_line, title="ema2",linewidth = 4)
plot(showLines1 ? ta.wma(close, wma60_length) : na, color=color.rgb(238, 75, 211), style=plot.style_line, title="wma60",linewidth = 3)

// Plot signals with smaller text
plotshape(oversold_condition ? 1 : na, title="RSI Oversold Signal", color=color.rgb(238, 8, 8), style=shape.labelup, location=location.belowbar, text="RSI OS", textcolor=color.rgb(17, 17, 17), size=size.tiny)
plotshape(overbought_condition ? 1 : na, title="RSI Overbought Signal", color=#08f710, style=shape.labeldown, location=location.abovebar, text="RSI OB", textcolor=color.rgb(8, 8, 8), size=size.tiny)
///////////////////////////////////////////////////////////////////////////////////////////////

// Define input options
showTable = input(false, title="Show Table ADX, RSI, DI values with RED, GREEN and YELLOW Signal")
tablePosition = input.string("Top Right", title="Table Position", options=["Top Right", "Top Left", "Top Center", "Bottom Right", "Bottom Left", "Bottom Center"])

// Define colors for the table cells
colorRsi = rsi > 55 ? color.green : rsi < 45 ? color.red : color.yellow
colorDiPlus = diplus > diThreshold ? color.green : color.red
colorDiMinus = diminus > diThreshold ? color.red : color.green
colorAdx = (rsi < 45 and diplus < diThreshold and diminus > diThreshold and adx > adxThreshold) ? color.red : 
           (rsi > 55 and diplus > diThreshold and diminus < diThreshold and adx > adxThreshold) ? color.green : 
           color.yellow

// Create the table
var table testTable = na
if showTable
    var position = tablePosition == "Top Right" ? position.top_right :
                   tablePosition == "Top Left" ? position.top_left :
                   tablePosition == "Top Center" ? position.top_center :
                   tablePosition == "Bottom Right" ? position.bottom_right :
                   tablePosition == "Bottom Left" ? position.bottom_left :
                   position.bottom_center

    testTable := table.new(position, columns = 4, rows = 2, border_width = 1, border_color = color.black, frame_width = 1, frame_color = color.black)

    // Column Headings
    table.cell(table_id = testTable, column = 0, row = 0, text = " DI+ ", bgcolor=color.aqua, text_color = color.white)
    table.cell(table_id = testTable, column = 1, row = 0, text = " DI- ", bgcolor=color.aqua, text_color = color.white)
    table.cell(table_id = testTable, column = 2, row = 0, text = " ADX ", bgcolor=color.aqua, text_color = color.white)
    table.cell(table_id = testTable, column = 3, row = 0, text = " RSI ", bgcolor=color.aqua, text_color = color.white)

    // Column values
    table.cell(table_id = testTable, column = 0, row = 1, text = str.tostring(math.round(diplus, 0)), bgcolor=colorDiPlus, text_color = color.black)
    table.cell(table_id = testTable, column = 1, row = 1, text = str.tostring(math.round(diminus, 0)), bgcolor=colorDiMinus, text_color = color.black)
    table.cell(table_id = testTable, column = 2, row = 1, text = str.tostring(math.round(adx, 0)), bgcolor=colorAdx, text_color = color.black)
    table.cell(table_id = testTable, column = 3, row = 1, text = str.tostring(math.round(rsi, 0)), bgcolor=colorRsi, text_color = color.black)


// Initialize variables to keep track of the previous condition
var bool prev_oversold = na
var bool prev_overbought = na

plotshape(ta.crossover(ema,wma60) and isHighVolume,  style=shape.labelup, location=location.belowbar, color=#1adaf3,size=size.small)
plotshape(ta.crossunder(ema,wma60) and isHighVolume,  style=shape.labeldown, location=location.abovebar, color=#f30aa9, size=size.small)
//////////////////////////////////////////////////   
plotFibRetracement = input.bool(title="Plot Fibonacci Retracement", defval=false)
fibLevel1 = input.float(title="Fibonacci Level", defval=0.5, minval=0, maxval=1, step=0.01)
fibLevel2 = input.float(title="Fibonacci Level", defval=0.618, minval=0, maxval=1, step=0.01)
fibLevel3 = input.float(title="Fibonacci Level", defval=0.368, minval=0, maxval=1, step=0.01) 
// Calculate Fibonacci Levels
highPrice = ta.highest(high, 100)
lowPrice = ta.lowest(low, 100)
priceRange = highPrice - lowPrice
fibonacciLevel1 = lowPrice + priceRange * fibLevel1
fibonacciLevel2 = lowPrice + priceRange * fibLevel2
fibonacciLevel3 = lowPrice + priceRange * fibLevel3

// Plot Fibonacci Levels
if plotFibRetracement
    line.new(x1=bar_index[1], y1=fibonacciLevel1, x2=bar_index, y2=fibonacciLevel1, color=color.blue, width=2)
    line.new(x1=bar_index[1], y1=fibonacciLevel2, x2=bar_index, y2=fibonacciLevel2, color=color.blue, width=2)
    line.new(x1=bar_index[1], y1=fibonacciLevel3, x2=bar_index, y2=fibonacciLevel3, color=color.blue, width=2)
// Draw Trendline
var float trendlineY1 = na
var float trendlineY2 = na

if bar_index % 50 == 0
    trendlineY1 := low
    trendlineY2 := high

// line.new(x1=bar_index, y1=trendlineY1, x2=bar_index - 100, y2=trendlineY2, color=#3708a5, width=2)

////////////////////////////////////////////////entry, exit, profit booking, stoploss///////////////////////
if (rsi > 63 and adx> adxThreshold and diplus>diThreshold)
    strategy.entry("Buy", strategy.long, qty = 1)

if (rsi < 40 and adx> adxThreshold and diminus>diThreshold)
    strategy.entry("Sell", strategy.short, qty = 1)

// Set stop loss and take profit levels
stop_loss = input(1.5, title = "Stop Loss (%)") * atrValue
take_profit = input(4.0, title = "Take Profit (%)") * atrValue
strategy.exit("Take Profit/Stop Loss", from_entry = "Buy", stop = close - stop_loss, limit = close + take_profit)
strategy.exit("Take Profit/Stop Loss", from_entry = "Sell", stop = close + stop_loss, limit = close - take_profit)
////////////////////////
```

> Detail

https://www.fmz.com/strategy/437039

> Last Modified

2023-12-29 16:56:09
