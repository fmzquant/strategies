
> Name

基于ATR和追踪止损的超级趋势策略SuperTrend-Strategy-with-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/187ecadda561a2e8473.png)


## Overview

This strategy designs a moving stop loss line and reversal line based on the Average True Range (ATR) indicator. It will trail the stop loss based on price movement. Specifically, if the price movement exceeds 1%, the stop loss will move towards the profit direction at a fixed proportion. When the price breaks through the stop loss line, the position will be closed automatically. This can lock in profits and reduce losses.

## Strategy Logic  

The strategy uses the ATR indicator to calculate the stop loss line. The specific formulas are:

```
atr = multplierFactor * atr(barsBack)

longStop = hl2 - atr  
shortStop = hl2 + atr
```

Where multplierFactor is the ATR multiplier, and barsBack is the ATR period. The larger the ATR value, the larger the market fluctuation.

The longStop and shortStop stop loss lines are calculated based on the ATR value. Trading signals are triggered when the price exceeds these two lines.

In addition, a direction variable is introduced to determine the trend direction:

```
direction = 1 
direction := nz(direction[1], direction)
direction := direction == -1 and close > shortStopPrev ? 1 : direction == 1 and close < longStopPrev ? -1 : direction 
```

If direction is 1, it indicates a bullish trend. If direction is -1, it indicates a bearish trend.

Based on the direction variable value, stop loss lines with different colors will be drawn:

```
if (direction == 1)
    valueToPlot := longStop
    colorToPlot := color.green
else  
    valueToPlot := shortStop 
    colorToPlot := color.red  
```

This clearly shows the current trend direction and stop loss line position.


## Trailing Stop Loss

The key point of this strategy is the introduction of a trailing stop loss mechanism that can adjust the stop loss line in real time based on price movement.

The specific logic is:

```
strategyPercentege = (close - updatedEntryPrice) / updatedEntryPrice * 100.00
rideUpStopLoss = hasOpenTrade() and strategyPercentege > 1 

if (rideUpStopLoss)
    stopLossPercent := stopLossPercent + strategyPercentege - 1.0
    newStopLossPrice = updatedEntryPrice + (updatedEntryPrice * stopLossPercent) / 100
    stopLossPrice := max(stopLossPrice, newStopLossPrice)
    updatedEntryPrice := stopLossPrice
```

If the price rises more than 1% relative to the entry price, the stop loss will be trailed upwards. The adjustment range is the part exceeded 1%.

This can lock in more profits while reducing losses.


## Advantage Analysis  

Compared with traditional moving stop loss strategies, the biggest advantage of this strategy is that it can dynamically adjust the stop loss line according to market conditions. The specific advantages are:

1. Achieve higher profit locking in trending markets

   The trailing stop loss mechanism allows the stop loss line to keep moving towards the profit direction. This locks in higher profits when the market continues to strengthen.
   
2. Reduce the risk of stop loss gapping in range-bound markets

   When market trends change, fixed moving stop losses are prone to being skipped. While the stop loss line of this strategy is calculated based on market volatility, which can reasonably track price changes and avoid being skipped in consolidation.
 
3. Simple operation, easy to automate

   This strategy is entirely based on indicator calculation without complex trend judgment logic. It can be easily automated.

4. Customizable parameters suitable for different products

   Parameters like ATR period, multiplier factor, stop loss percentage can be customized. The strategy can be optimized for different products to make it more versatile.

## Risk Analysis   

Although the strategy has many advantages, the following risks should be noted:

1. Unable to determine trend reversal points, there is risk of buying high and selling low

   There is no logic in this strategy to determine if the trend has ended. It is prone to buying high and selling low at the end of a bull market.

2. Improper parameter settings may amplify losses

   If the ATR period parameter is set too short, the stop loss line will be too sensitive and may be frequently triggered by oscillating markets.

3. Risk of being stopped out from bottom-fishing rebounds 

   This strategy does not consider significant points as stop loss support. So it may also be thrown out of the market during short-term pullbacks.

To address the above risks, optimization can be done in the following aspects:  

1. Incorporate trend filtering indicators to predict trend reversal in advance

2. Parameter optimization testing to select the optimal parameter combination  

3. Widen the stop loss range near certain support levels

## Optimization Directions

There is room for further optimization of this strategy:

1. Incorporate candlestick pattern recognition

   Identify some typical candlestick patterns like divergence and shooting star to judge the possibility of trend reversal. This can avoid the risk of buying high and selling low.

2. Dynamic optimization of trailing parameters 

   Allow parameters like ATR period and multiplier factor to change dynamically. Use longer ATR periods and wider stop loss ranges in largely fluctuating markets.

3. Incorporate machine learning models

   Use LSTM, RNN and other deep learning models to predict possible future price ranges and dynamically adjust stop loss distances.  

## Summary

In summary, this strategy utilizes the ATR indicator to design a moving stop loss line, and introduces a trailing stop loss mechanism that can adjust the stop loss position in real time based on market changes. This achieves higher profit locking while also reducing risks. With further optimizations, this strategy can become more adaptive to various market situations and serve as a robust trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|═══════════════ FROM ═══════════════|
|v_input_2|true|Month|
|v_input_3|true|Day|
|v_input_4|2019|Year|
|v_input_5|true|════════════════ TO ════════════════|
|v_input_6|31|Month|
|v_input_7|12|Day|
|v_input_8|9999|Year|
|v_input_9|true|═════════════ STRATEGY ═════════════|
|v_input_10|0|Position Type: LONG|SHORT|
|v_input_11|3|Initial Stop Loss|
|v_input_12|true|ATR Period|
|v_input_13|3|ATR multplierFactoriplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
//  -----------------------------------------------------------------------------
//  Copyright 2019 Mauricio Pimenta | exit490
//  SuperTrend with Trailing Stop Loss script may be freely distributed under the MIT license.
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
//  Date:     5-Aug-2019
//
//  Description
//  ===========
//  SuperTrend is a moving stop and reversal line based on the volatility (ATR).
//  The strategy will ride up your stop loss when price moviment 1%.
//  The strategy will close your operation when the market price crossed the stop loss.
//  The strategy will close operation when the line based on the volatility will crossed
//
//  The strategy has the following parameters:
//
//  INITIAL STOP LOSS - Where can isert the value to first stop.
//  POSITION TYPE - Where can to select trade position.
//  ATR PERIOD - To select number of bars back to execute calculation
//  ATR MULTPLIER - To add a multplier factor on volatility
//  BACKTEST PERIOD - To select range.
//  
//  -----------------------------------------------------------------------------
//  Disclaimer:
//    1. I am not licensed financial advisors or broker dealers. I do not tell you 
//       when or what to buy or sell. I developed this software which enables you 
//       execute manual or automated trades multplierFactoriplierFactoriple trades using TradingView. The 
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
//       these items, then I recommend you seek education materials to further your
//       knowledge.
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

strategy(title = "SUPERTREND ATR WITH TRAILING STOP LOSS",
         shorttitle = "SUPERTREND ATR WITH TSL",
         overlay = true,
         precision = 8,
         calc_on_order_fills = true,
         calc_on_every_tick = true,
         backtest_fill_limits_assumption = 0,
         default_qty_type = strategy.percent_of_equity,
         default_qty_value = 100,
         initial_capital = 1000,
         currency = currency.USD,
         linktoseries = true)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

// === BACKTEST RANGE ===
backTestSectionFrom = input(title = "═══════════════ FROM ═══════════════", defval = true, type = input.bool)

FromMonth       = input(defval = 1, title = "Month", minval = 1)
FromDay         = input(defval = 1, title = "Day", minval = 1)
FromYear        = input(defval = 2019, title = "Year", minval = 2014)

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

// === INPUT TO SELECT BARS BACK
barsBack = input(title="ATR Period", defval=1)

// === INPUT TO SELECT MULTPLIER FACTOR 
multplierFactor = input(title="ATR multplierFactoriplier", step=0.1, defval=3.0)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

// LOGIC TO FIND DIRECTION WHEN THERE IS TREND CHANGE ACCORDING VOLATILITY
atr = multplierFactor * atr(barsBack)

longStop = hl2 - atr
longStopPrev = nz(longStop[1], longStop)
longStop := close[1] > longStopPrev ? max(longStop, longStopPrev) : longStop

shortStop = hl2 + atr
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := close[1] < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop

direction = 1
direction := nz(direction[1], direction)
direction := direction == -1 and close > shortStopPrev ? 1 : direction == 1 and close < longStopPrev ? -1 : direction

longColor = color.blue
shortColor = color.blue

var valueToPlot = 0.0
var colorToPlot = color.white

if (direction == 1)
    valueToPlot := longStop
    colorToPlot := color.green
else
    valueToPlot := shortStop
    colorToPlot := color.red

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //
//
// === GLOBAL VARIABLES AND FUNCTIONS TO STORE IMPORTANT CONDITIONALS TO TRAILING STOP
hasEntryLongConditional() => direction == 1
hasCloseLongConditional() => direction == -1

hasEntryShortConditional() => direction == -1
hasCloseShortConditional() => direction == 1

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
//
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
//
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
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
//
// === DRAWING SHAPES     

entryPricePlotConditinal = entryPrice == 0.0 ? na : entryPrice
trailingStopLossPlotConditional = stopLossPrice == 0.0  ? na : stopLossPrice

plotshape(entryPricePlotConditinal, title= "Entry Price", color=color.blue, style=shape.circle, location=location.absolute, size=size.tiny)
plotshape(trailingStopLossPlotConditional, title= "Stop Loss", color=color.red, style=shape.circle, location=location.absolute, size=size.tiny)

plot(valueToPlot == 0.0 ? na : valueToPlot, title="BuyLine", linewidth=2, color=colorToPlot)
plotshape(direction == 1 and direction[1] == -1 ? longStop : na, title="Buy", style=shape.labelup, location=location.absolute, size=size.normal, text="Buy", transp=0, textcolor = color.white, color=color.green, transp=0)
plotshape(direction == -1 and direction[1] == 1 ? shortStop : na, title="Sell", style=shape.labeldown, location=location.absolute, size=size.normal, text="Sell", transp=0, textcolor = color.white, color=color.red, transp=0)

alertcondition(direction == 1 and direction[1] == -1 ? longStop : na, title="Buy", message="Buy!")
alertcondition(direction == -1 and direction[1] == 1 ? shortStop : na, title="Sell", message="Sell!")
```

> Detail

https://www.fmz.com/strategy/433556

> Last Modified

2023-11-28 14:56:59
