
> Name

突破趋势追踪者V2Breakout-Trend-Follower-V2

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13b4b6234ca1e44a4c8.png)

[trans]

## 概述

该策略是我之前的另一个突破趋势追踪者策略的变体。在另一个策略中,您可以使用移动平均线作为交易的过滤器(即,如果价格低于移动平均线,它就不会做多)。在制作了检测更高时间框架趋势的工具之后,我想看看它是否可能是一个比移动平均线更好的过滤器。

因此,该策略允许您查看更高时间框架的趋势(即是否有更高的高点和更低的低点?如果是这样,这是一个上升趋势)。您只在趋势方向做仓。您可以选择多达两个趋势作为过滤器。每个趋势方向都显示在图表上的表格中,方便参考。当前的支撑位和阻力位被绘制在图表上,这样您就可以看到何时可能会突破当前时间范围的趋势以及更高水平的趋势。

我发现,与其他策略相比,这种策略的表现一般不是很好,但它确实似乎更挑剔交易。显示更高的获胜率和更好的盈利因子。它只采取少量交易,净利润也不是很好。

## 策略原理

该策略的核心逻辑是使用突破更高时间框架的支撑位和阻力位来识别趋势,并根据趋势方向进行交易。

具体来说,它通过以下步骤实现:

1. 计算当前时间框架(如1小时线)的支撑位和阻力位。这是通过查找一定周期内的最高价和最低价来实现的。

2. 计算一个或多个更高时间框架(如4小时线和日线)的支撑位和阻力位。这使用与当前时间框架相同的逻辑实现。

3. 在图表上绘制这些支撑位和阻力位的水平线。当价格突破这些水平时,更高时间框架的趋势会发生改变。

4. 根据价格是否突破这些关键水平判定趋势方向。如果价格突破上一个高点,则认为是上升趋势。如果下破上一个低点,则认为是下降趋势。

5. 允许用户选择一个或多个更高时间框架的趋势作为过滤条件。也就是说,只有当当前时间框架的趋势方向与更高时间框架的趋势方向一致时,才会考虑进行交易。

6. 当满足趋势过滤条件和当前价格突破关键水平时,进行买入或卖出。停损水平设定为之前关键的支撑或阻力位。

7. 随着价格运行,当形成新的高点或低点时,将止损移动到新的低点,以锁定利润和跟踪趋势。

8. 当止损被触发或关键支撑/阻力位被突破时,平仓退出。

通过这种多时间框架的趋势分析,策略试图只在较强势的趋势方向进行交易,以提高获胜概率。同时,关键水平提供清晰的入场和止损信号。

## 策略优势

- 使用多个时间框架判断趋势,可以更准确识别较强的趋势方向,避免被市场噪音误导。

- 只在主要趋势方向操作,可以大幅提高获胜率。根据测试结果,与简单移动平均线过滤相比,该策略显示更高的胜率和更好的收益风险比。

- 支撑位和阻力位提供清晰的入场和止损水平。不需要纠结具体的入场点选择。

- 随着趋势的运行调整止损位置,可以最大限度锁定利润。

- 策略逻辑简单清晰,容易理解和调优。

## 策略风险

- 依赖较长线段的趋势判断,在趋势反转时容易被套。应适当缩短判断趋势的时间周期,或使用其他指标辅助判断。

- 没有考虑fundamental面影响,可能与重大事件发生时股价产生背离。可以加入atm事件或财报日期等过滤条件。 

- 没有设置位置规模控制。可以根据账户资金规模、波动率等因素设定仓位大小。

- 回测时间范围有限。应扩大回测时间段,测试不同市场环境下的稳健性。

- 没有考虑交易成本的影响。实盘中应根据具体交易成本调整策略参数。

- 只考虑长线交易。可以结合其他策略开发短线交易信号,实现多周期套利。

## 策略优化方向

- 增加过滤条件:

  - 基本面数据,如财报、新闻事件等

  - 指标,如成交量,ATR止损等

- 优化参数:

  - 调整支撑/阻力位计算周期

  - 调整趋势判断的时间框架

- 扩展策略范围:

  - 开发短线交易策略

  - 考虑卖空机会

  - 多品种套利

- 提高风险管理:

  - 根据波动率和资金规模优化仓位大小

  - 优化止损策略,如移动止损,挂单止损等

  - 引入风险奖惩机制

- 优化执行逻辑:

  - 改进入场时机选择

  - 考虑部分仓位入场

  - 优化止损移动策略

## 总结

该策略通过分析多时间框架的趋势,设计了一个较为稳健的突破系统。相比简单移动平均线等指标过滤,它显示出更高的获胜率和收益风险比。但也存在一些可以优化的方面,比如风险管理机制不完善,没有考虑基本面因素等。如果进一步优化,可以成为一个非常实用的趋势跟踪策略。总的来说,该策略设计合理,通过多时间框架分析提高判断准确性,值得进一步研究和应用。

||

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

[/trans]

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
