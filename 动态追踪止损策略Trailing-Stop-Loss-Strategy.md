
> Name

动态追踪止损策略Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19addbfcf0858fb5295.png)

## Overview

This strategy calculates fast and slow moving averages to determine the trend. It goes long when the fast moving average crosses over the slow moving average, and sets a dynamic trailing stop loss to lock in profits when the price changes by a certain percentage.

## Strategy Logic

The strategy uses the golden cross of fast and slow moving averages to determine the beginning of an uptrend. Specifically, it calculates the simple moving average of closing prices over a certain period, compares the values of the fast and slow moving averages, and judges the beginning of an uptrend when the fast moving average crosses over the slow one. 

After opening a long position, the strategy does not set a fixed stop loss, but uses a dynamic trailing stop loss to lock in profits. The stop loss line is set based on: Highest Price * (1 - Stop Loss Percentage). This allows the stop loss line to move up as the price rises. When the price falls by a certain percentage, the stop loss will be triggered to exit the position.  

The advantage of this approach is that it allows unlimited chasing of uptrends, while locking in profits once they reach a certain level through the stop loss.

## Advantage Analysis

The main advantages of this trailing stop loss strategy are:

1. It allows unlimited chasing of trends without missing out large moves. Fixed stop losses often get stopped out at the beginning of major trends.  

2. It locks in profits by setting a stop loss percentage. Simply chasing trends without a stop loss can lead to losses when the trend ends. The stop loss locks in gains.

3. It is more flexible than fixed stop losses. Fixed stops can only be set to one price, while this stop loss moves with the highest price.  

4. It has lower pullback risks. Fixed stops are often far from the highest price, leading to premature stop outs on normal pullbacks. This stop loss stays close to the highest price to avoid being stopped out unnecessarily.

## Risk Analysis  

The strategy also has some risks:

1. The indicator used for entry signals may be unstable and produce false signals.  

2. There is only a single stop loss approach without considering other factors. Major market changes can invalidate the strategy.

3. There are no profit targets, relying solely on the stop loss. Ineffective stop loss can lead to large losses.  

4. The parameters like moving average periods need further optimization.

## Optimization Directions

The strategy can be improved in several areas:

1. Add more indicators to confirm entries and avoid false signals, e.g. volume.

2. Add profit taking when profits reach a certain percentage.  

3. Improve stop loss safety by dynamically adjusting the stop distance in exceptional market events.

4. Optimize parameters like trading instruments and trading sessions. Different products and sessions require parameter adjustments.

5. Add machine learning to dynamically adjust parameters and optimize indicators and stop loss levels automatically.

## Summary  

The overall logic of this strategy is sound and reasonable. Using fast and slow moving averages to determine trends is a classic approach. Trailing stop loss is also effective for locking in profits and reducing risks. However, continual testing and optimization is needed for the indicators and parameters to make the strategy consistently profitable. At the same time, major market changes that could invalidate the strategy need to be guarded against by improving the overall logic and framework and adding safeguards.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|(?Strategy)Fast SMA Length|
|v_input_2|49|Slow SMA Length|
|v_input_3|true|Enable Trailing|
|v_input_4|7.5|Long Stop Loss %|
|v_input_5|timestamp(01 Jan 2021 00:00 UTC)|(?Backtest Period)From Date|
|v_input_6|timestamp(31 Dec 2121 23:59 UTC)|To Date|
|v_input_7|true|(?Plot)Show Backtest Range|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
//  -----------------------------------------------------------------------------
//  Copyright 2021 Iason Nikolas | jason5480
//  Trainiling Take Profit Trailing Stop Loss script may be freely distributed under the MIT license.
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
//  Authors:  @jason5480
//  Revision: v1.0.0
//  Date:     05-May-2021
//
//  Description
//  =============================================================================
//  This strategy will go long if fast MA crosses over slow MA.
//  The strategy will exit from long position when the price increases by a fixed percentage.
//  If the trailing take profit is checked then the strategy instead of setting a limit order in a predefined price (based on the percentage)
//  it will follow the price with small steps (percentagewise)
//  If the price drops by this percentage then the exit order will be executed
//
//  The strategy has the following parameters:
//
//  Fast SMA Length - How many candles back to calculte the fast SMA.
//  Slow SMA Length - How many candles back to calculte the slow SMA.
//  Enable Trailing - Enable or disable the trailing.
//  Stop Loss % - The percentage of the price decrease to set the stop loss price target for long positions.
//  
//  -----------------------------------------------------------------------------
//  Disclaimer:
//    1. I am not licensed financial advisors or broker dealer. I do not tell you 
//       when or what to buy or sell. I developed this software which enables you 
//       execute manual or automated trades using TradingView. The 
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
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// SETUP ============================================================================================================
strategy(title = "Trailing Stop Loss",
         shorttitle = "TSL",
         overlay = true,
         pyramiding = 0,
         calc_on_every_tick = true,
         default_qty_type = strategy.cash,
         default_qty_value = 100000,
         initial_capital = 100000)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// INPUTS ===========================================================================================================

// STRATEGY INPUT ===================================================================================================
fastMALen = input(defval = 21, title = "Fast SMA Length", type = input.integer, group = "Strategy", tooltip = "How many candles back to calculte the fast SMA.")
slowMALen = input(defval = 49, title = "Slow SMA Length", type = input.integer, group = "Strategy", tooltip = "How many candles back to calculte the slow SMA.")

enableStopLossTrailing = input(defval = true, title = "Enable Trailing", type = input.bool, group = "Strategy", tooltip = "Enable or disable the trailing for stop loss.")
longTrailingStopLossPerc = input(defval = 7.5, title = 'Long Stop Loss %', type = input.float, minval = 0.1, maxval = 100, step = 0.1, inline = "Trailing Stop Loss Perc", group = "Strategy") / 100

// BACKTEST PERIOD INPUT ============================================================================================
fromDate = input(defval = timestamp("01 Jan 2021 00:00 UTC"), title = "From Date", type = input.time, minval = timestamp("01 Jan 1970 00:00 UTC"), group = "Backtest Period") // backtest start date
toDate   = input(defval = timestamp("31 Dec 2121 23:59 UTC"), title = "To Date",   type = input.time, minval = timestamp("01 Jan 1970 00:00 UTC"), group = "Backtest Period") // backtest finish date

isWithinBacktestPeriod() => true

// SHOW PLOT INPUT ==================================================================================================
showDate = input(defval = true, title = "Show Backtest Range", type = input.bool, group = "Plot", tooltip = "Gray out the backround of the backtest period.")

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// STRATEGY LOGIC ===================================================================================================

fastMA = sma(close, fastMALen)
slowMA = sma(close, slowMALen)

bool startLongDeal = crossover(fastMA, slowMA)

bool longIsActive = startLongDeal or strategy.position_size > 0

// determine trailing stop loss price
float longTrailingStopLossPrice = na
longTrailingStopLossPrice := if (longIsActive)
    stopValue = high * (1 - longTrailingStopLossPerc)
    max(stopValue, nz(longTrailingStopLossPrice[1]))
else
    na

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// STRATEGY EXECUTION ===============================================================================================

if (isWithinBacktestPeriod())
    // getting into LONG position
    strategy.entry(id = "Long Entry", long = strategy.long, when = startLongDeal, alert_message = "Long(" + syminfo.ticker + "): Started")
    // submit exit orders for trailing stop loss price
    strategy.exit(id = "Long Stop Loss", from_entry = "Long Entry", stop = longTrailingStopLossPrice, when = longIsActive, alert_message = "Long(" + syminfo.ticker + "): Stop Loss activated")


//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// PLOT DATE POSITION MA AND TRAILING TAKE PROFIT STOP LOSS =========================================================

bgcolor(color = showDate and isWithinBacktestPeriod() ? color.gray : na, transp = 90)

plot(series = fastMA, title = "Fast SMA", color = #0056BD, linewidth = 2, style = plot.style_line)
plot(series = slowMA, title = "Slow SMA", color = #FF6A00, linewidth = 2, style = plot.style_line)
plotshape(series = isWithinBacktestPeriod() and startLongDeal and strategy.position_size <= 0 ? fastMA : na, title = "UpTrend Begins", style = shape.circle, location = location.absolute, color = color.green, transp = 0, size = size.tiny)
plotshape(series = isWithinBacktestPeriod() and startLongDeal and strategy.position_size <= 0 ? fastMA : na, title = "Buy", text = "Buy", style = shape.labelup, location = location.absolute, color = color.green, textcolor = color.black, transp = 0, size = size.tiny)

plot(series = strategy.position_avg_price, title = "Position", color = color.blue, linewidth = 2, style = plot.style_linebr, offset = 1)
plot(series = longTrailingStopLossPrice, title = "Long Trail Stop", color = color.fuchsia, linewidth = 2, style = plot.style_linebr, offset = 1)

// ==================================================================================================================
```

> Detail

https://www.fmz.com/strategy/438448

> Last Modified

2024-01-12 10:47:38
