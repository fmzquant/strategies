
> Name

可持续追踪止损交易策略Sustainable-Trailing-Stop-Loss-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9706c6338b26258869.png)
[trans]

## 概述

可持续追踪止损交易策略是一个用于数字货币交易的自动化交易策略。它具有追踪止损和部分止盈的功能,可以实现可持续增长的交易目标。

## 策略原理

该策略通过设定止损点和追踪止损点来实现交易目标。具体来说,在开仓时会设定一个初始止损点。当价格走势利好时,止损点会随价格上移一定比例,以锁定部分利润。当价格向不利方向反转时,止损点不会改变,以限制亏损。

该策略分为做多和做空两种形式。当选择做多时,如果满足做多条件,则会在当前价格开多单,并设置初始止损价。随后每上涨1%,止损价会上调固定百分比。当价格下跌触发止损或满足平仓条件时,会平掉当前仓位。做空情况类似。

## 优势分析

该策略最大的优势在于可以追踪止损和部分止盈,在保证利润的同时控制风险,实现交易账户的可持续增长。无论行情如何,该策略都可以帮助交易者锁定部分利润,避免亏损扩大。此外,该策略参数可调,可以适应不同风险偏好。

## 风险分析

该策略主要风险在于止损点过于接近,可能会被短期市场噪音触发。此外,部分止盈比例过大也会限制利润区间。为降低这些风险,可以适当放宽止损点,并优化部分止盈参数。

## 优化方向 

该策略可以从以下几个方向进行优化:

1. 优化开仓和止损条件,提高开仓准确率

2. 优化止损点比例,在保证止损的同时最大化获利 

3. 增加止盈条件,可以更好地锁定利润

4. 增加参数化控制,使策略更具灵活性

## 总结

本策略整体来说是一个非常有实战价值的自动交易策略。它可以自动管理止损和止盈,实现账户的可持续增长。通过参数调整和优化,该策略可以适用于不同市场情况,满足投资者不同风险偏好。总体来说,该策略是一款值得推荐的数字货币交易策略。

||

## Overview

The Sustainable Trailing Stop Loss Trading Strategy is an automated trading strategy for cryptocurrency trading. It features trailing stop loss and partial take profit to achieve the goal of sustainable growth in trading.  

## Strategy Logic

The strategy realizes trading objectives by setting stop loss points and trailing stop loss points. Specifically, an initial stop loss point is set when opening a position. As the price moves favorably, the stop loss point will move up a certain percentage to lock in partial profits. When the price reverses unfavorably, the stop loss point will not change, limiting losses.

The strategy comes in two forms: long and short. When going long, it will open a long position at the current price and set an initial stop loss price if the long condition is met. Subsequently, each 1% price surge will trigger a fixed percentage raise in stop loss price. When either stop loss is triggered or close position condition is met, the current position will be closed. The logic for short positions is similar.  

## Advantage Analysis 

The biggest advantage of this strategy is that it enables trailing stop loss and partial take profit, controlling risks while locking in profits, resulting in sustainable growth of trading account. Regardless of market conditions, it helps traders lock in some profits and avoid runaway losses. Also, adjustable parameters make the strategy adaptable to different risk appetites.

## Risk Analysis

The main risk of this strategy is that the stop loss point may be too close and get stopped out by short-term market noise. Also, oversized partial take profit ratio will limit profit potential. To mitigate such risks, proper widening of stop loss points and optimization of partial take profit parameters are necessary.  

## Optimization Directions

The strategy can be improved in the following aspects:

1. Optimize entry and stop loss conditions to improve entry accuracy

2. Optimize stop loss percentage to balance between stopping loss and maximising profit  

3. Add profit taking conditions for better profit locking  

4. Introduce more parameterization for greater flexibility

## Conclusion

In conclusion, this is a strategy with great practical value for automated trading. It can automatically manage stop loss and take profit to achieve sustainable account growth. Through parameter tuning and optimization, it can be adapted to different market conditions and risk preferences. Overall, it is a recommended trading strategy for cryptocurrencies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|═══════════════ FROM ═══════════════|
|v_input_2|true|Month|
|v_input_3|true|Day|
|v_input_4|2014|Year|
|v_input_5|true|════════════════ TO ════════════════|
|v_input_6|31|Month|
|v_input_7|12|Day|
|v_input_8|9999|Year|
|v_input_9|true|═════════════ STRATEGY ═════════════|
|v_input_10|0|Position Type: LONG|SHORT|
|v_input_11|3|Initial Stop Loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
//  -----------------------------------------------------------------------------
//  Copyright 2019 Mauricio Pimenta | exit490
//  Trailing Stop Loss script may be freely distributed under the MIT license.
//
//  Permission is hereby granted, free of charge, 
//  to any person obtaining a copy of this software and associated documentation files (the "Software"), 
//  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, 
//  publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
//  subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
//  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
//  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//  -----------------------------------------------------------------------------
//
//  Authors:  @exit490
//  Revision: v1.0.0
//  Date:     03-Aug-2019
//
//  DESCRIPTION
//  ===========
//
//  This TradingView strategy it is designed to integrate with other strategies with indicators. 
//  It performs a trailing stop loss from entry and exit conditions. 
//  In this strategy you can add conditions for long and short positions.
//  The strategy will ride up your stop loss when price moviment 1%.
//  The strategy will close your operation when the market price crossed the stop loss.
//  Also is possible to select the period that strategy will execute the backtest.
//
//  The strategy has the following parameters:
//  INITIAL STOP LOSS - Where can isert the value to first stop.
//  POSITION TYPE - Where can to select trade position.
//  BACKTEST PERIOD - To select range.
//  
//  -----------------------------------------------------------------------------
//
//  DISCLAIMER:
//    1. I am not licensed financial advisors or broker dealers. I do not tell you 
//       when or what to buy or sell. I developed this software which enables you 
//       execute manual or automated trades multiple trades using TradingView. The 
//       software allows you to set the criteria you want for entering and exiting 
//       trades.
//    2. Do not trade with money you cannot afford to lose.
//    3. I do not guarantee consistent profits or that anyone can make money with no 
//       effort. And I am not selling the holy grail.
//    4. Every system can have winning and losing streaks.
//    5. Money management plays a large role in the results of your trading. For 
//       example: lot size, account size, broker leverage, and broker margin call 
//       rules all have an effect on results. Also, your Take Profit and Stop Loss 
//       settings for individual pair trades and for overall account equity have a 
//       major impact on results. If you are new to trading and do not understand 
//       these items, then I recommend you seek education materials to further your knowledge.
//
//    YOU NEED TO FIND AND USE THE TRADING SYSTEM THAT WORKS BEST FOR YOU AND YOUR 
//    TRADING TOLERANCE.
//
//    I HAVE PROVIDED NOTHING MORE THAN A TOOL WITH OPTIONS FOR YOU TO TRADE WITH THIS PROGRAM ON TRADINGVIEW.
//    
//    I accept suggestions to improve the script.
//    If you encounter any problems I will be happy to share with me.
//  -----------------------------------------------------------------------------
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

strategy("TRAILING STOP LOSS TO LONG AND SHORT", overlay=true)

// === ADD YOUR CONTIDIONAL HERE ====

hasEntryLongConditional() => 1 == 1
hasCloseLongConditional() => 1 != 1

hasEntryShortConditional() => 1 == 1
hasCloseShortConditional() => 1 != 1

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

// === BACKTEST RANGE ===
backTestSectionFrom = input(title = "═══════════════ FROM ═══════════════", defval = true, type = input.bool)

FromMonth       = input(defval = 1, title = "Month", minval = 1)
FromDay         = input(defval = 1, title = "Day", minval = 1)
FromYear        = input(defval = 2014, title = "Year", minval = 2014)

backTestSectionTo = input(title = "════════════════ TO ════════════════", defval = true, type = input.bool)
ToMonth         = input(defval = 31, title = "Month", minval = 1)
ToDay           = input(defval = 12, title = "Day", minval = 1)
ToYear          = input(defval = 9999, title = "Year", minval = 2014)

backTestPeriod() => (time > timestamp(FromYear, FromMonth, FromDay, 00, 00)) and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59))

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //


parameterSection = input(title = "═════════════ STRATEGY ═════════════", defval = true, type = input.bool)
// === INPUT TO SELECT POSITION ===
positionType = input(defval="LONG", title="Position Type", options=["LONG", "SHORT"])

// === INPUT TO SELECT INITIAL STOP LOSS
initialStopLossPercent = input(defval = 3.0, minval = 0.0, title="Initial Stop Loss")

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

// === GLOBAL VARIABLES AND FUNCTIONS TO STORE IMPORTANT CONDITIONALS
stopLossPercent = positionType == "LONG" ? initialStopLossPercent * -1 : initialStopLossPercent

var entryPrice = 0.0
var updatedEntryPrice = 0.0
var stopLossPrice = 0.0

hasOpenTrade() => strategy.opentrades != 0
notHasOpenTrade() => strategy.opentrades == 0

strategyClose() =>
    if positionType == "LONG"
        strategy.close("LONG", when=true)
    else 
        strategy.close("SHORT", when=true)

strategyOpen() =>
    if positionType == "LONG"
        strategy.entry("LONG", strategy.long, when=true)
    else 
        strategy.entry("SHORT", strategy.short, when=true)

isLong() => positionType == "LONG" ? true : false
isShort() => positionType == "SHORT" ? true : false

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

// === LOGIC TO TRAILING STOP IN LONG POSITION
if (isLong() and backTestPeriod())

    crossedStopLoss = close <= stopLossPrice
    terminateOperation = hasOpenTrade() and (crossedStopLoss or hasCloseLongConditional())

    if (terminateOperation)
        entryPrice := 0.0
        updatedEntryPrice := entryPrice
        stopLossPrice := 0.0
        strategyClose()
    
    startOperation = notHasOpenTrade() and hasEntryLongConditional()

    if(startOperation)
        entryPrice := close
        updatedEntryPrice := entryPrice
        stopLossPrice := entryPrice + (entryPrice * stopLossPercent) / 100
        strategyOpen()
        
    strategyPercentege = (close - updatedEntryPrice) / updatedEntryPrice * 100.00
    rideUpStopLoss = hasOpenTrade() and strategyPercentege > 1

    if (isLong() and rideUpStopLoss)
        stopLossPercent := stopLossPercent + strategyPercentege - 1.0
        newStopLossPrice = updatedEntryPrice + (updatedEntryPrice * stopLossPercent) / 100  
        stopLossPrice := max(stopLossPrice, newStopLossPrice)
        updatedEntryPrice := stopLossPrice


//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

// === LOGIC TO TRAILING STOP IN SHORT POSITION
if (isShort() and backTestPeriod())

    crossedStopLoss = close >= stopLossPrice
    terminateOperation = hasOpenTrade() and (crossedStopLoss or hasCloseShortConditional())

    if (terminateOperation)
        entryPrice := 0.0
        updatedEntryPrice := entryPrice
        stopLossPrice := 0.0
        strategyClose()
    
    startOperation = notHasOpenTrade() and hasEntryShortConditional()

    if(startOperation)
        entryPrice := close
        updatedEntryPrice := entryPrice
        stopLossPrice := entryPrice + (entryPrice * stopLossPercent) / 100
        strategyOpen()
        
    strategyPercentege = (close - updatedEntryPrice) / updatedEntryPrice * 100.00
    rideDownStopLoss = hasOpenTrade() and strategyPercentege < -1

    if (rideDownStopLoss)
        stopLossPercent := stopLossPercent + strategyPercentege + 1.0
        newStopLossPrice = updatedEntryPrice + (updatedEntryPrice * stopLossPercent) / 100  
        stopLossPrice := min(stopLossPrice, newStopLossPrice)
        updatedEntryPrice := stopLossPrice
    

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

// === DRAWING SHAPES 

entryPricePlotConditinal = entryPrice == 0.0 ? na : entryPrice
trailingStopLossPlotConditional = stopLossPrice == 0.0  ? na : stopLossPrice

plotshape(entryPricePlotConditinal, title= "Entry Price", color=color.blue, style=shape.circle, location=location.absolute, size=size.tiny)
plotshape(trailingStopLossPlotConditional, title= "Stop Loss", color=color.red, style=shape.circle, location=location.absolute, size=size.tiny)

```

> Detail

https://www.fmz.com/strategy/435157

> Last Modified

2023-12-12 17:29:24
