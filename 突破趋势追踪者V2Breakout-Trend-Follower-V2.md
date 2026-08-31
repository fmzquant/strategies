
> Name

突破趋势追踪者V2Breakout-Trend-Follower-V2

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13b4b6234ca1e44a4c8.png)


## Overview

This strategy is a variation on my other Breakout Trend Follower strategy. In the other strategy, you can use a moving average to act as a filter for your trades (i.e. if the price is below the moving average, it won't go long). After making the tool that detects trends on higher timeframes, I wanted to see if that might be a better filter than a moving average.  

So this script lets you look at higher timeframe trends (i.e. are there higher highs and higher lows? If so, this is an uptrend). You only take trades when you are with the trend. You have the ability to select up to two trends to act as a filter. Each trend direction is shown on a table on the chart for easy reference. The current pivot highs and lows are plotted on the chart so you can see when you might be breaking both the current timeframe's trend and higher level trends.

What I found was that in general this does not perform as well as the other strategy, but it does seem to be a lot more picky with trades. Showing higher win rates and a better profit factor. It just takes a lot less trades and the net profit isn't as good.

## Strategy Logic

The core logic of this strategy is to identify trends using breakouts of support and resistance levels on higher timeframes, and take trades in the direction of the trend. 

Specifically, it implements the following steps:

1. Calculate pivot support and resistance levels on the current timeframe (e.g. 1 hour). This is done by looking at highest high and lowest low over a certain period.

2. Calculate pivot support and resistance levels on one or more higher timeframes (e.g. 4 hour and daily). This uses the same logic as the current timeframe.

3. Plot these support and resistance levels as horizontal lines on the chart. Breaking these levels indicates a change in trend on the higher timeframes.

4. Determine trend direction based on whether price breaks previous high or low points. Breaking past a previous high indicates uptrend. Breaking past a previous low indicates downtrend.

5. Allow user to select one or more higher timeframe trends as a filter condition. I.e. only consider taking trades when current timeframe trend aligns with higher timeframe trend(s).

6. When trend filter condition is met and current price breaks key level, enter long or short. Stop loss is set at previous key support or resistance level. 

7. As price moves, adjust stop loss to new low points to lock in profits and trail the trend.

8. Exit when stop loss is triggered or key support/resistance level is broken.

By analyzing trends across multiple timeframes, the strategy attempts to only trade in the direction of stronger trends to improve win rate. Meanwhile, the key levels provide clear entry and stop loss signals.

## Advantages of the Strategy

- Using multiple timeframes to judge trends can more accurately identify stronger trend direction, avoiding noise.

- Only trading with major trends significantly improves win rate. Compared to simple moving average filter, this strategy showed higher win rate and risk-reward ratio.

- Support and resistance levels provide clear entry and stop loss levels. No need to guess specific entry points.

- Adjusting stops along trend to maximize profit locking.

- Simple and clear strategy logic, easy to understand and optimize.

## Risks of the Strategy

- Relies on longer-term trends, prone to being trapped at trend reversals. Should shorten timeframe for judging trends, or use other indicators to assist.

- Does not consider fundamental impacts, may deviate from price on major events. Can add filters like earnings dates.

- No position sizing controls set. Should optimize size by account size, volatility etc.

- Limited backtest period. Should expand testing across different market environments. 

- No consideration of trading costs. Should adjust parameters based on actual costs.

- Only considers long-term trading. Can develop signals for short-term trades to implement multi-timeframe strategies.

## Optimization Directions

- Add filter conditions:

  - Fundamentals like earnings, news events
  
  - Indicators like volume, ATR stops
  
- Optimize parameters:

  - Periods for support/resistance calculation
  
  - Timeframes for trend determination
  
- Expand strategy scope:

  - Develop short-term trading strategies
  
  - Consider shorting opportunities
  
  - Inter-market spreads
  
- Enhance risk management:

  - Optimize position sizing by volatility and size
  
  - Improve stop loss strategies like moving/bracket stops
  
  - Introduce risk-adjusted metrics
  
- Improve execution logic:

  - Entry timing selection
  
  - Partial size entries
  
  - Stop loss movement optimization

## Conclusion

This strategy designed a relatively robust breakout system by analyzing trends across multiple timeframes. Compared to simple filters like moving averages, it demonstrated higher win rates and risk-reward ratios. But there are some areas that can be improved, like the lack of solid risk management mechanisms and consideration of fundamentals. With further optimization, it can become a very practical trend following strategy. Overall, the strategy design is sound, improving accuracy through multi-timeframe analysis, and is worth further research and application.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(01 Jan 2019 06:00 +0000)|(?Backtest Range)Backtest Start Date|
|v_input_2|timestamp(01 Jan 2100 00:00 +0000)|Backtest End Date|
|v_input_3|0|(?Display)Info Table Location: Top|Bottom|
|v_input_4|3|(?Pivot Points)Pivot Lookback Period|
|v_input_5|false|Show Historical Pivot Points?|
|v_input_6|0|(?Higher Timeframe Levels)Use HTF Trend for Filtering?: 1st Timeframe|Both Timeframes|None|
|v_input_7|D|1st High Timeframe|
|v_input_8|W|2nd High Timeframe|
|v_input_9|true|Show Multiple Timeframe S/R Levels?|
|v_input_10|orange|Current Timeframe    Support|
|v_input_11|blue| Resistance|
|v_input_12|yellow|1st High Timeframe   Support|
|v_input_13|yellow| Resistance|
|v_input_14|white|2nd High Timeframe    Support|
|v_input_15|white| Resistance|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-26 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// Revision:        1
// Author:          @millerrh
// Strategy:  Enter long when recent swing high breaks out, using recent swing low as stop level.  Move stops up as higher lows print to act
// as trailing stops.  Ride trend as long as it is there and the higher lows aren't breached.  
// The difference between this one and the previous Breakout Trend Follower is that this one uses higher timeframe higher highs/higher lows as a filter instead 
// of an arbitrary Moving Average.  I wanted to test out whether waiting for longer term actual trend changes produced better stats than just the moving average.
// Conditions/Variables 
//    1. Manually configure which dates to back test
//    2. Can add a filter to only take setups that are above (or below for shorts) user-defined larger timeframe trends (helps avoid trading counter trend) 

// === CALL STRATEGY/STUDY, PROGRAMATICALLY ENTER STRATEGY PARAMETERS HERE SO YOU DON'T HAVE TO CHANGE THEM EVERY TIME YOU RUN A TEST ===
// (STRATEGY ONLY) - Comment out srategy() when in a study() 
strategy("Breakout Trend Follower V2", overlay=true, initial_capital=10000, currency='USD', 
   default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)
// (STUDY ONLY) - Comment out study() when in a strategy() 
//study("Breakout Trend Follower V2", overlay=true)

// === BACKTEST RANGE ===
Start = input(defval = timestamp("01 Jan 2019 06:00 +0000"), title = "Backtest Start Date", type = input.time, group = "Backtest Range")
Finish = input(defval = timestamp("01 Jan 2100 00:00 +0000"), title = "Backtest End Date", type = input.time, group = "Backtest Range")

// == USER INPUTS ==
tableLocation = input(defval="Top", options=["Top", "Bottom"], title = "Info Table Location", group = "Display",
  tooltip = "Place information table on the top of the pane or the bottom of the pane.")
lookback = input(defval = 3, title = "Pivot Lookback Period", group = "Pivot Points",
  tooltip = "Looks for pivot points within this number of bars both left and right.")
showPivotPoints = input(title = "Show Historical Pivot Points?", type = input.bool, defval = false, group = "Pivot Points",
  tooltip = "Toggle this on to see the historical pivot points that were used.  Change the Lookback Period to adjust the frequency of these points.
  The pivot points are only shown for the current chart timeframe - to see the Daily pivot pionts, use the Daily timeframe, etc.")
trendFilter = input(defval="1st Timeframe", options=["1st Timeframe", "Both Timeframes", "None"], title = "Use HTF Trend for Filtering?", group = "Higher Timeframe Levels",
  tooltip = "Signals will be ignored when price is not aligned with the higher timeframe trend(s).  The intent is to keep you out of bear periods and only buying when 
  price is showing strength and you are trading with the trend.")
twoSet = input(defval="D", title="1st High Timeframe", type=input.resolution, group = "Higher Timeframe Levels",
  tooltip = "Allows you to set two different time frames for looking at the trend.")
threeSet = input(defval="W", title="2nd High Timeframe", type=input.resolution, group = "Higher Timeframe Levels")
showMTFLevels = input(title = "Show Multiple Timeframe S/R Levels?", type = input.bool, defval = true, group = "Higher Timeframe Levels",
  tooltip = "Displays the pivot highs and lows of higher timeframes to use as support/resistance levels. When these levels break, the trend
  will change on these higher timeframes.")
currentColorS = input(color.new(color.orange,50), title = "Current Timeframe    Support", type = input.color, group = "Higher Timeframe Levels", inline = "MTF1")
currentColorR = input(color.new(color.blue,50), title = " Resistance", type = input.color, group = "Higher Timeframe Levels", inline = "MTF1")
oneColorS = input(color.new(color.yellow,50), title = "1st High Timeframe   Support", type = input.color, group = "Higher Timeframe Levels", inline = "MTF2")
oneColorR = input(color.new(color.yellow,50), title = " Resistance", type = input.color, group = "Higher Timeframe Levels", inline = "MTF2")
twoColorS = input(color.new(color.white,50), title = "2nd High Timeframe    Support", type = input.color, group = "Higher Timeframe Levels", inline = "MTF3")
twoColorR = input(color.new(color.white,50), title = " Resistance", type = input.color, group = "Higher Timeframe Levels", inline = "MTF3")

//  == DEFINE FUNCTIONS FOR USE IN MULTIPLE TIMEFRAMES (USING A TUPLE TO AVOID SO MANY SECURITY CALLS) ==  
f_getHTF() =>
    ph = pivothigh(high, lookback, lookback)
    pl = pivotlow(low, lookback, lookback)
    highLevel = valuewhen(ph, high[lookback], 0)
    lowLevel = valuewhen(pl, low[lookback], 0)
    barsSinceHigh = barssince(ph) + lookback
    barsSinceLow = barssince(pl) + lookback
    timeSinceHigh = time[barsSinceHigh]
    timeSinceLow = time[barsSinceLow]
    [ph, pl, highLevel, lowLevel, barsSinceHigh, barsSinceLow, timeSinceHigh, timeSinceLow]
    
[ph_01, pl_01, hL_01, lL_01, bsSH_01, bsSL_01, tSH_01, tSL_01] = security(syminfo.tickerid, "", f_getHTF())
[ph_02, pl_02, hL_02, lL_02, bsSH_02, bsSL_02, tSH_02, tSL_02] = security(syminfo.tickerid, twoSet, f_getHTF())
[ph_03, pl_03, hL_03, lL_03, bsSH_03, bsSL_03, tSH_03, tSL_03] = security(syminfo.tickerid, threeSet, f_getHTF())

// Plot historical pivot points for debugging and configuring the lookback period.
plot(showPivotPoints ? ph_01 : na, style=plot.style_cross, linewidth=3, color=color.new(color.yellow,50), offset=-lookback)
plot(showPivotPoints ? pl_01 : na, style=plot.style_cross, linewidth=3, color=color.new(color.yellow,50), offset=-lookback)

// == PLOT SUPPORT/RESISTANCE LINES ON THE HIGHER TIMEFRAMES ==
// Use a function to define the lines
f_line(x1, y1, y2, _color) =>
    var line id = na
    // line.delete(id)
    // id := line.new(x1, y1, time, y2, xloc.bar_time, extend.right, _color)

// 1st Timeframe
highLine1 = showMTFLevels ? f_line(tSH_01, hL_01, hL_01, currentColorR) : na
lowLine1 = showMTFLevels ? f_line(tSL_01, lL_01, lL_01, currentColorS) : na 
// 2nd Timeframe
highLine2 = showMTFLevels ? f_line(tSH_02, hL_02, hL_02, oneColorR) : na
lowLine2 = showMTFLevels ? f_line(tSL_02, lL_02, lL_02, oneColorS) : na
// 3rd Timeframe
highLine3 = showMTFLevels ? f_line(tSH_03, hL_03, hL_03, twoColorR) : na
lowLine3 = showMTFLevels ? f_line(tSL_03, lL_03, lL_03, twoColorS) : na

// == TREND CALCULATIONS (USING A TUPLE TO CONSOLIDATE REPETATIVE CODE AND GENERATE MULTIPE VARIABLES WITH ONE FUNCTION ==
f_signal(highLevel, lowLevel) =>
    uptrendSignal    = high > highLevel
    downtrendSignal  = low < lowLevel
    inUptrend        = bool(na)
    inDowntrend      = bool(na) 
    inUptrend       := uptrendSignal[1] ? true : downtrendSignal[1] ? false : inUptrend[1]
    inDowntrend     := not inUptrend
    [uptrendSignal, downtrendSignal, inUptrend, inDowntrend]

[uptrendSignal1, downtrendSignal1, inUptrend1, inDowntrend1] = f_signal(hL_01, lL_01)  // 1st Timeframe
[uptrendSignal2, downtrendSignal2, inUptrend2, inDowntrend2] = f_signal(hL_02, lL_02)  // 2nd Timeframe
[uptrendSignal3, downtrendSignal3, inUptrend3, inDowntrend3] = f_signal(hL_03, lL_03)  // 3rd Timeframe

// == TREND TABLE PLOTTING ==
tablePos = tableLocation == "Top" ? position.top_right : position.bottom_right
var table trendTable = table.new(tablePos, 3, 1, border_width = 3)
upColor = color.rgb(38, 166, 154)
downColor = color.rgb(240, 83, 80)

f_fillCell(_column, _row, _cellText, _c_color) =>
    table.cell(trendTable, _column, _row, _cellText, bgcolor = color.new(_c_color, 70), text_color = _c_color, width = 6)

if barstate.islast or barstate.islastconfirmedhistory
    f_fillCell(0, 0, inUptrend1 ? "▲" : "▼", inUptrend1 ? upColor : downColor)
    f_fillCell(1, 0, inUptrend2 ? "▲ " + twoSet : "▼ " + twoSet, inUptrend2 ? upColor : downColor)
    f_fillCell(2, 0, inUptrend3 ? "▲ " + threeSet : "▼ " + threeSet, inUptrend3 ? upColor : downColor)

// Conditions for entry and exit
buyConditions =  true
buySignal = high > hL_01 and buyConditions // Code to act like a stop-buy for the Study
sellSignal = low < lL_01 // Code to act like a stop-loss for the Study

// (STRATEGY ONLY) Comment out for Study
strategy.entry("Long", strategy.long, stop = hL_01, when = buyConditions)
// strategy.entry("Long", strategy.long, stop = buyLevel2, when = time > Start and time < Finish and high > maFilterCheck)
strategy.exit("Exit Long", from_entry = "Long", stop=lL_01)


```

> Detail

https://www.fmz.com/strategy/430779

> Last Modified

2023-11-01 17:24:08
