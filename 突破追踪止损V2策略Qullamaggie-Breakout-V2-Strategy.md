
> Name

突破追踪止损V2策略Qullamaggie-Breakout-V2-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/804f8b462097af4509.png)

[trans]


### 概述

该策略结合了突破策略和趋势跟踪止损策略的优点,旨在捕捉长线图形中的支撑阻力突破信号,同时利用移动平均线进行止损追踪,实现在长线趋势的方向进行盈利,同时控制风险。

### 策略原理

1. 策略首先计算多组不同参数的移动平均线,分别作为趋势判断、支撑阻力、止损追踪使用。

2. 然后找出指定周期内的最高点和最低点作为进场的支撑阻力区域。当价格突破这些支撑阻力时产生信号。

3. 策略以突破最高点为做多信号进行买入,以突破最低点为做空信号进行卖出。 

4. 进场后,会以突破最低点的低点作为止损位持有头寸。

5. 当头寸进入赢利状态后,止损位会转为追踪移动平均线。当价格跌破移动平均线时,将止损点设定为该根K线的最低点。

6. 如此可以锁定盈利,同时让头寸有足够的空间跟踪趋势运行。

7. 策略同时加入平均真实波动来确保只在合适的区间突破买入,避免过度扩张的突破。

### 策略优势分析

1. 结合突破策略和趋势跟踪止损策略双重优势。

2. 能根据长线趋势买入突破,增加获利概率。 

3. 止损策略既保护了头寸,也给予头寸足够空间运行。

4. 加入波动率过滤,避免过度拉升的不利突破。

5. 自动化交易,适合部分时间跟单。

6. 可自定义不同周期均线进行操作。

7. 可灵活调整止损追踪方式。

### 策略风险分析

1. 突破策略容易出现假突破的风险。可适当放宽突破确认。

2. 需要足够的波动才能产生突破信号,在颠簸行情中容易无效。

3. 部分突破可能过于短暂无法捕捉。可以降低时间轴寻找更多契机。

4. 追踪止损在震荡行情中可能过于频繁停损。可以适当放宽止损距离。

5. 波动率过滤可能错过部分机会。可以降低过滤参数。

### 策略优化方向 

1. 测试不同均线参数组合,找到最佳参数。

2. 测试不同的突破确认机制,如通道、K线形态等。 

3. 尝试不同的止损追踪方式,寻找最佳止损。

4. 优化资金管理策略,如positon score等。

5. 加入统计技术指标过滤,提升过滤准确率。

6. 测试不同品种该策略效果。

7. 加入机器学习算法提升策略效果。

### 总结

该策略整合突破思想和趋势跟踪止损思想,在长线判断正确的前提下,能够优化获利空间。关键是找到最佳参数组合,并配合良好的资金管理策略,以抓住长线机会的同时实现风险可控。该策略有望通过进一步优化成为较为可靠的长线趋势策略。

||

## Overview

This strategy combines the advantages of breakout and trend-following trailing stop strategies to capture support/resistance breakout signals on longer timeframes while using moving averages for stop loss trailing in order to profit in the direction of the longer term trend while controlling risk.

## Strategy Logic

1. The strategy first calculates multiple moving averages with different parameters for trend determination, support/resistance and trailing stop loss. 

2. It then identifies the highest high and lowest low points within a specified period as the support/resistance breakout zones. Buy and sell signals are generated when price breaks these levels.

3. The strategy buys when price breaks above the highest high and sells when price breaks below the lowest low.

4. After entry, the lowest low is used as the initial stop loss for the position. 

5. Once the position becomes profitable, the stop loss switches to trailing the moving average. When price breaks below the moving average, the stop is set to the low of that candlestick.

6. This allows the position to lock in profits while giving it enough room to follow the trend.

7. The strategy also incorporates average true range for filtering to ensure only proper range breakouts are taken to avoid extended breakouts.

## Advantage Analysis 

1. Combines the advantages of breakout and trailing stop strategies.

2. Can buy breakouts according to longer term trends for higher probability.

3. Trailing stop strategy protects position while allowing enough space to run. 

4. ATR filtering avoids unfavorable extended breakouts. 

5. Automated trading suitable for part time following.

6. Customizable moving average parameters.

7. Flexible trailing stop mechanisms.

## Risk Analysis

1. Breakout strategies prone to false breakout risks. Wider breakout confirmation may help.

2. Sufficent volatility needed to generate signals, may fail in choppy markets.

3. Some breakouts may be too short-lived to capture. Lower timeframes may uncover more opportunities.

4. Trailing stops can be stopped out too frequently in ranging markets. Wider stops may help.

5. ATR filtering may miss some potential trades. Lower filter settings can help.

## Optimization Directions

1. Test different moving average combinations for optimal parameters.

2. Explore different breakout confirmations like channels, candlestick patterns etc.

3. Try different trailing stop mechanisms to find best stop loss. 

4. Optimize money management strategies like position score.

5. Add technical indicator filters to improve quality of signals.

6. Test effectiveness across different products.

7. Incorporate machine learning algorithms to boost strategy performance.

## Conclusion

This strategy combines the philosophies of breakout and trend-following trailing stop strategies. With proper trend determination, it optimizes profit potential while maintaining controlled risk. The keys are finding the optimal parameter sets and incorporating prudent money management. Further enhancements may turn this into a robust trend following methodology.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2019 06:00 +0000)|(?backtest window and pivot history)Backtest Start Date|
|v_input_2|timestamp(01 Jan 2100 00:00 +0000)|Backtest End Date|
|v_input_3|false|Show Historical Pivot Points?|
|v_input_4|D|(?moving averages)Timeframe of Moving Averages|
|v_input_5|0|Moving Average Type: SMA|EMA|
|v_input_6|10|1st Moving Average Length|
|v_input_7|20|2nd Moving Average Length|
|v_input_8|50|3rd Moving Average Length|
|v_input_9|true|Use 3rd Moving Average for Filtering?|
|v_input_10|0|(?stops)Trailing Stop: 1st Moving Average|2nd Moving Average|
|v_input_11|0|Trailing Stop Timeframe: Same as Moving Averages|Same as Chart|
|v_input_12|orange|Current Range S/R Colors:    Support|
|v_input_13|blue| Resistance|
|v_input_14|false|(?adr filtering)Use ADR for Filtering?|
|v_input_15|120|% of ADR Value|
|v_input_16|0|ADR Table Visibility: Bottom|Top|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-17 00:00:00
end: 2023-10-23 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © millerrh

// The intent of this strategy is to buy breakouts with a tight stop on smaller timeframes in the direction of the longer term trend.
// Then use a trailing stop of a close below either the 10 MA or 20 MA (user choice) on that larger timeframe as the position 
// moves in your favor (i.e. whenever position price rises above the MA).
// Option of using daily ADR as a measure of finding contracting ranges and ensuring a decent risk/reward.
// (If the difference between the breakout point and your stop level is below a certain % of ATR, it could possibly find those consolidating periods.)
// V2 - updates code of original Qullamaggie Breakout to optimize and debug it a bit - the goal is to remove some of the whipsaw and poor win rate of the 
// original by incorporating some of what I learned in the Breakout Trend Follower script.

//@version=4
strategy("Qullamaggie Breakout V2", overlay=true, initial_capital=100000, currency='USD', calc_on_every_tick = true,
   default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)
   
// === BACKTEST RANGE ===
Start = input(defval = timestamp("01 Jan 2019 06:00 +0000"), title = "Backtest Start Date", type = input.time, group = "backtest window and pivot history")
Finish = input(defval = timestamp("01 Jan 2100 00:00 +0000"), title = "Backtest End Date", type = input.time, group = "backtest window and pivot history")

// Inputs
showPivotPoints = input(title = "Show Historical Pivot Points?", type = input.bool, defval = false, group = "backtest window and pivot history",
  tooltip = "Toggle this on to see the historical pivot points that were used.  Change the Lookback Periods to adjust the frequency of these points.")
htf = input(defval="D", title="Timeframe of Moving Averages", type=input.resolution, group = "moving averages",
  tooltip = "Allows you to set a different time frame for the moving averages and your trailing stop.
  The default behavior is to identify good tightening setups on a larger timeframe
  (like daily) and enter the trade on a breakout occuring on a smaller timeframe, using the moving averages of the larger timeframe to trail your stop.")
maType = input(defval="SMA", options=["EMA", "SMA"], title = "Moving Average Type", group = "moving averages")
ma1Length = input(defval = 10, title = "1st Moving Average Length", minval = 1, group = "moving averages")
ma2Length = input(defval = 20, title = "2nd Moving Average Length", minval = 1, group = "moving averages")
ma3Length = input(defval = 50, title = "3rd Moving Average Length", minval = 1, group = "moving averages")
useMaFilter = input(title = "Use 3rd Moving Average for Filtering?", type = input.bool, defval = true, group = "moving averages",
  tooltip = "Signals will be ignored when price is under this slowest moving average.  The intent is to keep you out of bear periods and only
             buying when price is showing strength or trading with the longer term trend.")
trailMaInput = input(defval="1st Moving Average", options=["1st Moving Average", "2nd Moving Average"], title = "Trailing Stop", group = "stops",
  tooltip = "Initial stops after entry follow the range lows.  Once in profit, the trade gets more wiggle room and
  stops will be trailed when price breaches this moving average.")
trailMaTF = input(defval="Same as Moving Averages", options=["Same as Moving Averages", "Same as Chart"], title = "Trailing Stop Timeframe", group = "stops",
  tooltip = "Once price breaches the trail stop moving average, the stop will be raised to the low of that candle that breached. You can choose to use the
  chart timeframe's candles breaching or use the same timeframe the moving averages use. (i.e. if daily, you wait for the daily bar to close before setting
  your new stop level.)")
currentColorS = input(color.new(color.orange,50), title = "Current Range S/R Colors:    Support", type = input.color, group = "stops", inline = "lineColor")
currentColorR = input(color.new(color.blue,50), title = " Resistance", type = input.color, group = "stops", inline = "lineColor")

// Pivot lookback
lbHigh = 3
lbLow = 3

// MA Calculations (can likely move this to a tuple for a single security call!!)
ma(maType, src, length) =>
    maType == "EMA" ? ema(src, length) : sma(src, length) //Ternary Operator (if maType equals EMA, then do ema calc, else do sma calc)
ma1 = security(syminfo.tickerid, htf, ma(maType, close, ma1Length))
ma2 = security(syminfo.tickerid, htf, ma(maType, close, ma2Length))
ma3 = security(syminfo.tickerid, htf, ma(maType, close, ma3Length))

plot(ma1, color=color.new(color.purple, 60), style=plot.style_line, title="MA1", linewidth=2)
plot(ma2, color=color.new(color.yellow, 60), style=plot.style_line, title="MA2", linewidth=2)
plot(ma3, color=color.new(color.white, 60), style=plot.style_line, title="MA3", linewidth=2)

// === USE ADR FOR FILTERING ===
// The idea here is that you want to buy in a consolodating range for best risk/reward. So here you can compare the current distance between 
// support/resistance vs. the ADR and make sure you aren't buying at a point that is too extended.
useAdrFilter = input(title = "Use ADR for Filtering?", type = input.bool, defval = false, group = "adr filtering",
  tooltip = "Signals will be ignored if the distance between support and resistance is larger than a user-defined percentage of ADR (or monthly volatility
  in the stock screener). This allows the user to ensure they are not buying something that is too extended and instead focus on names that are consolidating more.")
adrPerc = input(defval = 120, title = "% of ADR Value", minval = 1, group = "adr filtering")
tableLocation = input(defval="Bottom", options=["Top", "Bottom"], title = "ADR Table Visibility", group = "adr filtering",
  tooltip = "Place ADR table on the top of the pane, the bottom of the pane, or off.")
adrValue = security(syminfo.tickerid, "D", sma((high-low)/abs(low) * 100, 21)) // Monthly Volatility in Stock Screener (also ADR)
adrCompare = (adrPerc * adrValue) / 100

// === PLOT SWING HIGH/LOW AND MOST RECENT LOW TO USE AS STOP LOSS EXIT POINT ===
ph = pivothigh(high, lbHigh, lbHigh)
pl = pivotlow(low, lbLow, lbLow)
highLevel = valuewhen(ph, high[lbHigh], 0)
lowLevel = valuewhen(pl, low[lbLow], 0)
barsSinceHigh = barssince(ph) + lbHigh
barsSinceLow = barssince(pl) + lbLow
timeSinceHigh = time[barsSinceHigh]
timeSinceLow = time[barsSinceLow]

//Removes color when there is a change to ensure only the levels are shown (i.e. no diagonal lines connecting the levels)
pvthis = fixnan(ph)
pvtlos = fixnan(pl)
hipc = change(pvthis) != 0 ? na : color.new(color.maroon, 0)
lopc = change(pvtlos) != 0 ? na : color.new(color.green, 0)

// Display Pivot lines
plot(showPivotPoints ? pvthis : na, color=hipc, linewidth=1, offset=-lbHigh, title="Top Levels")
plot(showPivotPoints ? pvthis : na, color=hipc, linewidth=1, offset=0, title="Top Levels 2")
plot(showPivotPoints ? pvtlos : na, color=lopc, linewidth=1, offset=-lbLow, title="Bottom Levels")
plot(showPivotPoints ? pvtlos : na, color=lopc, linewidth=1, offset=0, title="Bottom Levels 2")

// BUY AND SELL CONDITIONS
buyLevel = valuewhen(ph, high[lbHigh], 0) //Buy level at Swing High

// Conditions for entry
stopLevel = float(na) // Define stop level here as "na" so that I can reference it in the ADR calculation before the stopLevel is actually defined.
buyConditions = (useMaFilter ? buyLevel > ma3 : true) and
  (useAdrFilter ? (buyLevel - stopLevel[1]) < adrCompare : true) 
buySignal = crossover(high, buyLevel) and buyConditions

// Trailing stop points - when price punctures the moving average, move stop to the low of that candle - Define as function/tuple to only use one security call
trailMa = trailMaInput == "1st Moving Average" ? ma1 : ma2
f_getCross() =>
    maCrossEvent = crossunder(low, trailMa)
    maCross = valuewhen(maCrossEvent, low, 0)
    maCrossLevel = fixnan(maCross)
    maCrossPc = change(maCrossLevel) != 0 ? na : color.new(color.blue, 0) //Removes color when there is a change to ensure only the levels are shown (i.e. no diagonal lines connecting the levels)
    [maCrossEvent, maCross, maCrossLevel, maCrossPc]
crossTF = trailMaTF == "Same as Moving Averages" ? htf : ""
[maCrossEvent, maCross, maCrossLevel, maCrossPc] = security(syminfo.tickerid, crossTF, f_getCross())

plot(showPivotPoints ? maCrossLevel : na, color = maCrossPc, linewidth=1, offset=0, title="Ma Stop Levels")

// == STOP AND PRICE LEVELS ==
inPosition = strategy.position_size > 0
buyLevel := inPosition ? buyLevel[1] : buyLevel
stopDefine = valuewhen(pl, low[lbLow], 0) //Stop Level at Swing Low
inProfit = strategy.position_avg_price <= stopDefine[1]
// stopLevel := inPosition ? stopLevel[1] : stopDefine // Set stop loss based on swing low and leave it there
stopLevel := inPosition and not inProfit ? stopDefine : inPosition and inProfit ? stopLevel[1] : stopDefine // Trail stop loss until in profit
trailStopLevel = float(na)

// trying to figure out a better way for waiting on the trail stop - it can trigger if above the stopLevel even if the MA hadn't been breached since opening the trade
notInPosition = strategy.position_size == 0
inPositionBars = barssince(notInPosition)
maCrossBars = barssince(maCrossEvent)
trailCross = inPositionBars > maCrossBars
// trailCross = trailMa > stopLevel
trailStopLevel := inPosition and trailCross ? maCrossLevel : na

plot(inPosition ? stopLevel : na, style=plot.style_linebr, color=color.new(color.orange, 50), linewidth = 2, title = "Historical Stop Levels", trackprice=false)
plot(inPosition ? trailStopLevel : na, style=plot.style_linebr, color=color.new(color.blue, 50), linewidth = 2, title = "Historical Trail Stop Levels", trackprice=false)

// == PLOT SUPPORT/RESISTANCE LINES FOR CURRENT CHART TIMEFRAME ==
// Use a function to define the lines
// f_line(x1, y1, y2, _color) =>
//     var line id = na
//     line.delete(id)
//     id := line.new(x1, y1, time, y2, xloc.bar_time, extend.right, _color)

// highLine = f_line(timeSinceHigh, highLevel, highLevel, currentColorR)
// lowLine = f_line(timeSinceLow, lowLevel, lowLevel, currentColorS)


// == ADR TABLE ==
tablePos = tableLocation == "Top" ? position.top_right : position.bottom_right
var table adrTable = table.new(tablePos, 2, 1, border_width = 3)
lightTransp = 90
avgTransp   = 80
heavyTransp = 70
posColor = color.rgb(38, 166, 154)
negColor = color.rgb(240, 83, 80)
volColor = color.new(#999999, 0)

f_fillCellVol(_table, _column, _row, _value) =>
    _transp = abs(_value) > 7 ? heavyTransp : abs(_value) > 4 ? avgTransp : lightTransp
    _cellText = tostring(_value, "0.00") + "%\n" + "ADR"
    table.cell(_table, _column, _row, _cellText, bgcolor = color.new(volColor, _transp), text_color = volColor, width = 6)

srDistance = (highLevel - lowLevel)/highLevel * 100

f_fillCellCalc(_table, _column, _row, _value) =>
    _c_color = _value >= adrCompare ? negColor : posColor
    _transp = _value >= adrCompare*0.8 and _value <= adrCompare*1.2 ? lightTransp : 
      _value >= adrCompare*0.5 and _value < adrCompare*0.8 ? avgTransp :
      _value < adrCompare*0.5 ? heavyTransp :
      _value > adrCompare*1.2 and _value <= adrCompare*1.5 ? avgTransp :
      _value > adrCompare*1.5 ? heavyTransp : na
    _cellText = tostring(_value, "0.00") + "%\n" + "Range"
    table.cell(_table, _column, _row, _cellText, bgcolor = color.new(_c_color, _transp), text_color = _c_color, width = 6)

if barstate.islast
    f_fillCellVol(adrTable, 0, 0, adrValue)
    f_fillCellCalc(adrTable, 1, 0, srDistance)
    // f_fillCellVol(adrTable, 0, 0, inPositionBars)
    // f_fillCellCalc(adrTable, 1, 0, maCrossBars)

// == STRATEGY ENTRY AND EXIT ==
strategy.entry("Buy", strategy.long, stop = buyLevel, when = buyConditions)

stop = stopLevel > trailStopLevel ? stopLevel : close[1] > trailStopLevel and close[1] > trailMa ? trailStopLevel : stopLevel
strategy.exit("Sell", from_entry = "Buy", stop=stop)


```

> Detail

https://www.fmz.com/strategy/430057

> Last Modified

2023-10-24 16:30:32
