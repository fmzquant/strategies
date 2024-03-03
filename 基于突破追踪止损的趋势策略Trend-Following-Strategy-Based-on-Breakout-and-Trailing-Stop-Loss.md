
> Name

基于突破追踪止损的趋势策略Trend-Following-Strategy-Based-on-Breakout-and-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description


[trans]  

本文将详细介绍一种基于价格突破入场以及追踪止损退出的趋势交易策略。该策略通过突破最高点构建多头仓位,并利用波动低点进行追踪止损。

一、策略原理

该策略的主要交易逻辑如下:

1. 使用振幅指标计算最高价和最低价的摆动点;

2. 当价格突破最高点时,进行多头入场;

3. 最近一波动低点作为激进止损点;

4. 当出现更高的波动低点时,将止损位置上移,实现追踪止损。

这样,它可以在价格突破上行阻力后,捕捉强势的趋势行情。并且止损点的持续上移,让利润能够得到锁定。

二、策略优势

该策略的主要优势有:

1. 突破入场可以比较准确地把握趋势的启动点位;

2. 动态追踪止损,可以最大限度锁定利润,降低回吐;

3. 止损位置有一定缓冲区间,可以避免止损被击穿。

4. 还可以添加均线过滤,避免逆势操作。

三、潜在风险

但该策略也存在一些潜在风险:

1. 突破信号可能存在滞后,容易漏掉趋势初期机会;

2. 止损过于激进可能造成不必要的停损出场;

3. 需要承受一定的回撤压力。

四、内容总结

本文主要介绍了一种基于价格突破和追踪止损的趋势策略。它可以有效跟踪趋势使利润最大化,但也需要防范止损被突破等风险。综合来说,该策略提供了一种简单直观的趋势追踪方法。

||

This article explains in detail a trend trading strategy based on breakout entry and trailing stop loss exit. It builds long positions on upside breakouts and utilizes swing lows for stop loss trailing. 

I. Strategy Logic

The main trading logic is:

1. Use pivot points to calculate swing highs and lows. 

2. Take long positions when price breaks above swing highs.

3. The most recent swing low is used as the aggressive stop loss.

4. When a higher swing low appears, trail stop loss levels upwards.

This allows the strategy to capture strong trend moves after bullish resistance breaks. The trailing stop also locks in profits as the trend extends.

II. Advantages of the Strategy

The main advantages are:

1. Breakout entry accurately captures trend starting points. 

2. Trailing stop maximizes profit capturing and reduces drawdowns.

3. Stop loss levels have a buffer to prevent invalidation. 

4. Moving average filters can be added to avoid counter-trend trades.

III. Potential Risks

However, some potential risks also exist:

1. Breakout signals may lag, causing missed early opportunities. 

2. Aggressive stops risk premature exit on normal retracements.

3. Drawdown pressure needs to be endured.

IV. Summary

In summary, this article has explained a trend following strategy based on price breakouts and trailing stop loss. It effectively maximizes profits by trailing trends but needs to manage risks like stop loss invalidation. Overall it provides a simple and intuitive trend tracking methodology.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2019|From Year|
|v_input_2|true|From Month|
|v_input_3|true|From Day|
|v_input_4|9999|To Year|
|v_input_5|true|To Month|
|v_input_6|true|To Day|
|v_input_7|false|Color Background - Test Period?|
|v_input_8|true|Use MA for Filtering?|
|v_input_9|0|MA Type For Filtering: SMA|EMA|
|v_input_10|50|MA Period for Filtering|
|v_input_11|false|Stop Loss Buffer off Swing Low (%)|
|v_input_12|true|Color Background for Trades?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-13 00:00:00
end: 2023-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// Revision:        1
// Author:          @millerrh
// Strategy:  Enter long when recent swing high breaks out, using recent swing low as stop level.  Move stops up as higher lows print to act
// as trailing stops.  Ride trend as long as it is there and the higher lows aren't breached.  
// Conditions/Variables 
//    1. Can place a user-defined percentage below swing low and swing high to use as a buffer for your stop to help avoid stop hunts
//    2. Can add a filter to only take setups that are above a user-defined moving average (helps avoid trading counter trend) 
//    3. Manually configure which dates to back test
//    4. Color background of backtested dates - allows for easier measuring buy & hold return of time periods that don't go up to current date    


// === CALL STRATEGY/STUDY, PROGRAMATICALLY ENTER STRATEGY PARAMETERS HERE SO YOU DON'T HAVE TO CHANGE THEM EVERY TIME YOU RUN A TEST ===
// (STRATEGY ONLY) - Comment out srategy() when in a study() 
strategy("Breakout Trend Follower", overlay=true, initial_capital=10000, currency='USD', 
   default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)
// (STUDY ONLY) - Comment out study() when in a strategy() 
//study("Breakout Trend Follower", overlay=true)

// === BACKTEST RANGE ===
From_Year  = input(defval = 2019, title = "From Year")
From_Month = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
From_Day   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
To_Year    = input(defval = 9999, title = "To Year")
To_Month   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
To_Day     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
Start  = timestamp(From_Year, From_Month, From_Day, 00, 00)  // backtest start window
Finish = timestamp(To_Year, To_Month, To_Day, 23, 59)        // backtest finish window

// A switch to control background coloring of the test period - Use for easy visualization of backtest range and manual calculation of 
// buy and hold (via measurement) if doing prior periods since value in Strategy Tester extends to current date by default
testPeriodBackground = input(title="Color Background - Test Period?", type=input.bool, defval=false)
testPeriodBackgroundColor = testPeriodBackground and (time >= Start) and (time <= Finish) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=95)

// == FILTERING ==
// Inputs
useMaFilter = input(title = "Use MA for Filtering?", type = input.bool, defval = true)
maType = input(defval="SMA", options=["EMA", "SMA"], title = "MA Type For Filtering")
maLength   = input(defval = 50, title = "MA Period for Filtering", minval = 1)

// Declare function to be able to swap out EMA/SMA
ma(maType, src, length) =>
    maType == "EMA" ? ema(src, length) : sma(src, length) //Ternary Operator (if maType equals EMA, then do ema calc, else do sma calc)
maFilter = ma(maType, close, maLength)
plot(maFilter, title = "Trend Filter MA", color = color.green, linewidth = 3, style = plot.style_line, transp = 50)

// Check to see if the useMaFilter check box is checked, this then inputs this conditional "maFilterCheck" variable into the strategy entry 
maFilterCheck = if useMaFilter == true
    maFilter
else
    0

// === PLOT SWING HIGH/LOW AND MOST RECENT LOW TO USE AS STOP LOSS EXIT POINT ===
// Inputs
//pvtLenL       = input(3, minval=1, title="Pivot Length Left Hand Side") //use if you want to change this to an input
//pvtLenR       = input(3, minval=1, title="Pivot Length Right Hand Side") //use if you want to change this to an input
pvtLenL       = 3
pvtLenR       = 3

// Get High and Low Pivot Points
pvthi_ = pivothigh(high, pvtLenL, pvtLenR)
pvtlo_ = pivotlow(low, pvtLenL, pvtLenR)

// Force Pivot completion before plotting.
Shunt = 1 //Wait for close before printing pivot? 1 for true 0 for flase
maxLvlLen = 0 //Maximum Extension Length
pvthi = pvthi_[Shunt]
pvtlo = pvtlo_[Shunt]

// Count How many candles for current Pivot Level, If new reset.
counthi = barssince(not na(pvthi))
countlo = barssince(not na(pvtlo))
 
pvthis = fixnan(pvthi)
pvtlos = fixnan(pvtlo)
hipc = change(pvthis) != 0 ? na : color.maroon
lopc = change(pvtlos) != 0 ? na : color.green

// Display Pivot lines
plot((maxLvlLen == 0 or counthi < maxLvlLen) ? pvthis : na, color=hipc, transp=0, linewidth=1, offset=-pvtLenR-Shunt, title="Top Levels")
plot((maxLvlLen == 0 or countlo < maxLvlLen) ? pvtlos : na, color=lopc, transp=0, linewidth=1, offset=-pvtLenR-Shunt, title="Bottom Levels")
plot((maxLvlLen == 0 or counthi < maxLvlLen) ? pvthis : na, color=hipc, transp=0, linewidth=1, offset=0, title="Top Levels 2")
plot((maxLvlLen == 0 or countlo < maxLvlLen) ? pvtlos : na, color=lopc, transp=0, linewidth=1, offset=0, title="Bottom Levels 2")


// Stop Levels
stopBuff = input(0.0, minval=-2, title="Stop Loss Buffer off Swing Low (%)")
stopPerc = stopBuff*.01 // Turn stop buffer input into a percentage
stopLevel = valuewhen(pvtlo_, low[pvtLenR], 0) //Stop Level at Swing Low
stopLevel2 = stopLevel - stopLevel*stopPerc  // Stop Level with user-defined buffer to avoid stop hunts and give breathing room
plot(stopLevel2, style=plot.style_line, color=color.orange, show_last=1, linewidth=1, transp=50, trackprice=true)
buyLevel = valuewhen(pvthi_, high[pvtLenR], 0) //Buy level at Swing High
buyLevel2 = buyLevel + buyLevel*stopPerc // Buy-stop level with user-defined buffer to avoid stop hunts and give breathing room
plot(buyLevel2, style=plot.style_line, color=color.blue, show_last=1, linewidth=1, transp=50, trackprice=true)

// Conditions for entry and exit
buySignal = high > buyLevel2
buy = buySignal and time > Start and time < Finish and buyLevel2 > maFilterCheck // All these conditions need to be met to buy
sellSignal = low < stopLevel2 // Code to act like a stop-loss for the Study

// (STRATEGY ONLY) Comment out for Study
strategy.entry("Long", strategy.long, stop = buyLevel2, when = buyLevel2 > maFilterCheck)
strategy.exit("Exit Long", from_entry = "Long", stop=stopLevel2)

// == (STUDY ONLY) Comment out for Strategy ==
// Check if in position or not
inPosition = bool(na)
inPosition := buy[1] ? true : sellSignal[1] ? false : inPosition[1]
flat = bool(na)
flat := not inPosition
buyStudy = buy and flat
sellStudy = sellSignal and inPosition
//Plot indicators on chart and set up alerts for Study
plotshape(buyStudy, style = shape.triangleup, location = location.belowbar, color = #1E90FF, text = "Buy")
plotshape(sellStudy, style = shape.triangledown, location = location.abovebar, color = #EE82EE, text = "Sell")
alertcondition(buyStudy, title='Trend Change Follower Buy', message='Trend Change Follower Buy')

// Color background when trade active (for easier visual on what charts are OK to enter on)
tradeBackground = input(title="Color Background for Trades?", type=input.bool, defval=true)
tradeBackgroundColor = tradeBackground and inPosition ? #00FF00 : na
bgcolor(tradeBackgroundColor, transp=95)
noTradeBackgroundColor = tradeBackground and flat ? #FF0000 : na
bgcolor(noTradeBackgroundColor, transp=90)


```

> Detail

https://www.fmz.com/strategy/426853

> Last Modified

2023-09-14 20:34:02
