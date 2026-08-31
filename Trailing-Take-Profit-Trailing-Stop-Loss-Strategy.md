
> Name

Trailing-Take-Profit-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/120326a030cd10c24c6.png)

## Overview

The Trailing Take Profit Trailing Stop Loss strategy is a quantitative trading strategy that combines trend tracking, partial take profit, full-cycle trailing stop loss and other functions. It aims to capture upside price trends in a bull market and take profits intelligently while controlling downside risks using trailing stops.

## Strategy Logic  

The strategy uses the golden cross of fast and slow moving averages as the buy signal. When the fast MA crosses above the slow MA, it indicates an uptrend is formed and the strategy will go long.

After entering a long position, the strategy sets a take profit price which equals the entry price multiplied by a predefined profit taking ratio. When price hits this level, the strategy will partially close the position by default selling 50% of the quantity. This realizes partial profits and locks in some gains.

Next, a trailing take profit mechanism will be activated if enabled. As price continues going up, the take profit price trails price at a predefined trailing step. This enables the take profit price to follow the uptrend closely, realizing the trailing take profit function.  

At the same time, a trailing stop is also started. Once price hits the take profit price, the trailing stop price starts to move up following highs while maintaining a predefined stop loss percentage below the high prices. This allows more profits to be locked in as the trailing stop moves up while controlling downside risk. 

Finally, if a pullback causes price to penetrate below the trailing stop price, the strategy will flatten the whole position at market price. The trading cycle finishes.

## Advantage Analysis

Integrating trend tracking, partial take profit, full-cycle trailing stops and more, the strategy has the following edges:

1. Effectively captures upside trends with accurate buy signals;  
2. Partial take profit locks in some profits, avoiding giving back all gains;
3. Trailing take profit price sticks to uptrends closely;  
4. Activating trailing stops locks in more profits and controls risks;
5. Customizable parameters to adjust to individual risk tolerance levels.

## Risk Analysis  

The strategy also has some risks mainly in the following areas:

1. Price may reverse sharply after entry for no take profit or stop loss, leading to amplified losses;
2. Trailing take profit may fail to follow promptly when trend ends, missing the best exit point;
3. Stop loss percentage set too wide may cause excessive losses during sharp declines;  
4. High trading frequency leads to larger trading costs and slippage.

Some ways to optimize and improve accordingly include:  

1. Set moving average parameters properly to avoid wrong signals;
2. Reduce partial take profit ratio to lower risks;  
3. Tighten stop loss percentage to limit losses;
4. Fine tune trailing step to optimize trailing take profit effectiveness.

## Optimization Directions   

There is room for further optimization:

1. Add more indicators to determine trends to prevent false breakouts;  
2. Incorporate position sizing to make position amount more reasonable;  
3. Build in dynamic mechanisms for take profit and stop loss levels to make parameters more adaptive;
4. Add filters to avoid erroneous trades for highly volatile assets.

These optimizations can make the strategy more robust and improve performance.  

## Conclusion

The Trailing Take Profit Trailing Stop Loss Strategy skillfully utilizes a combination of trend tracking, intelligent take profit, full-cycle trailing stops and more. Building on capturing upside trends, it realizes take profit price trailing and raising trailing stop levels. This allows the strategy to follow trends while profiting in bull markets. Also, risks are controlled via partial take profits and stop losses to protect capital. In conclusion, this is a stable strategy type commonly seen in quantitative trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|(?Strategy)Fast SMA Length|
|v_input_2|49|Slow SMA Length|
|v_input_3|12|Take Profit %|
|v_input_4|50|Take Profit Quantity %|
|v_input_5|true|Enable Trailing|
|v_input_6|true|Trailing Take Profit Deviation %|
|v_input_7|7.5|Trailing Stop Loss %|
|v_input_8|timestamp(01 Jan 2021 00:00 UTC)|(?Backtest Period)From Date|
|v_input_9|timestamp(31 Dec 2121 23:59 UTC)|To Date|
|v_input_10|true|(?Plot)Show Backtest Range|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-10 00:00:00
end: 2023-11-18 00:00:00
period: 1h
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
//  Revision: v1.0.1
//  Date:     18-Apr-2021
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
//  Take Profit % - The percentage of the price increase to set the take profit price target.
//  Enable Trailing - Enable or disable the trailing for take profit.
//  Training Take Profit Deviation % - The step to follow the price when the take profit limit is reached.
//  Trailing Stop Loss % - The stop loss percentage drop that will close your position. After the take profit price is reached the trailing stop loss price target will follow the price upwards (for long positions).
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
strategy(title = "Trailing Take Profit Trailing Stop Loss",
         shorttitle = "TTPTSL",
         overlay = true,
         pyramiding = 0,
         default_qty_type = strategy.cash,
         default_qty_value = 100000,
         initial_capital = 100000)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// INPUTS ===========================================================================================================

// STRATEGY INPUT ===================================================================================================
fastMALen = input(defval = 21, title = "Fast SMA Length", type = input.integer, group = "Strategy", tooltip = "How many candles back to calculte the fast SMA.")
slowMALen = input(defval = 49, title = "Slow SMA Length", type = input.integer, group = "Strategy", tooltip = "How many candles back to calculte the slow SMA.")

longTakeProfitPerc = input(defval = 12.0, title = 'Take Profit %', type = input.float, step = 0.1, group = "Strategy", tooltip = "The percentage of the price increase to set the take profit price target.") / 100
profitQuantityPerc = input(defval = 50, title = 'Take Profit Quantity %', type = input.float, step = 1.0, group = "Strategy", tooltip = "The percentage of the position that will be withdrawn when the take profit price target is hit.") / 100

enableTrailing = input(defval = true, title = "Enable Trailing", type = input.bool, group = "Strategy", tooltip = "Enable or disable the trailing for take profit.")
trailingTakeProfitDeviationPerc = input(defval = 1.0, title = 'Trailing Take Profit Deviation %', type = input.float, step = 0.05, group = "Strategy", tooltip = "The step to follow the price when the take profit limit is reached.") / 100

longTrailingStopLossPerc  = input(defval = 7.5, title = 'Trailing Stop Loss %',  type = input.float, step = 0.1, group = "Strategy", tooltip = "The stop loss percentage drop that will close your position. After the take profit price is reached the trailing stop loss price target will follow the price upwards (for long positions).") / 100

// BACKTEST PERIOD INPUT ============================================================================================
fromDate = input(defval = timestamp("01 Jan 2021 00:00 UTC"), title = "From Date", type = input.time, minval = timestamp("01 Jan 1970 00:00 UTC"), group = "Backtest Period") // backtest start date
toDate   = input(defval = timestamp("31 Dec 2121 23:59 UTC"), title = "To Date",   type = input.time, minval = timestamp("01 Jan 1970 00:00 UTC"), group = "Backtest Period") // backtest finish date

isWithinBacktestPeriod() => true // create function "within window of time"

// SHOW PLOT INPUT ==================================================================================================
showDate = input(defval = true, title = "Show Backtest Range", type = input.bool, group = "Plot", tooltip = "Gray out the backround of the backtest period.")

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// STRATEGY =========================================================================================================

fastMA = sma(close, fastMALen)
slowMA = sma(close, slowMALen)

startLongDeal = crossover(fastMA, slowMA)

longTakeProfitPrice = strategy.position_avg_price * (1 + longTakeProfitPerc)

longTrailingTakeProfitStepTicks = longTakeProfitPrice * trailingTakeProfitDeviationPerc / syminfo.mintick

// determine trailing stop loss price. Trailing starts when the take profit price is reached
longTrailingStarted = false
longTrailingStarted := if (strategy.position_size > 0)
    crossover(high, longTakeProfitPrice) or (high[1] >= longTakeProfitPrice) or longTrailingStarted[1]
else
    false

float longTrailingStopLossPrice = na
longTrailingStopLossPrice := if (strategy.position_size > 0)
    stopValue = longTrailingStarted == true ? high * (1 - longTrailingStopLossPerc) : strategy.position_avg_price * (1 - longTrailingStopLossPerc)
    max(stopValue, nz(longTrailingStopLossPrice[1]))
else
    na

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// STRATEGY EXECUTION ===============================================================================================

if (isWithinBacktestPeriod())
    // getting into LONG position
    strategy.entry(id = "Long", long = strategy.long, when = startLongDeal, comment = "Long", alert_message = "Long("  + syminfo.ticker + "): Started")
    if (strategy.position_size > 0)
        strategy.exit(id = "TTP", from_entry = "Long", qty = profitQuantityPerc * strategy.position_size, limit = enableTrailing ? na : longTakeProfitPrice, trail_price = enableTrailing ? longTakeProfitPrice : na, trail_offset = enableTrailing ? longTrailingTakeProfitStepTicks : na, oca_name = 'Exit Long', comment = "Long Take Profit", alert_message = "Long(" + syminfo.ticker + "): Trailing Take Profit activated")
        strategy.order(id = "TSL", long = strategy.short, qty = strategy.position_size, stop = longTrailingStopLossPrice, oca_name = 'Exit Long', oca_type = strategy.oca.cancel, comment = "Stop/Trail", when = true, alert_message = "Long("  + syminfo.ticker + "): Trailing Stop Loss activated")
    else
        strategy.cancel(id = "TTP", when = true)
        strategy.cancel(id = "TSL", when = true)
        
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// PLOT DATE POSITION MA AND TRAILING TAKE PROFIT STOP LOSS =========================================================

bgcolor(color = showDate and isWithinBacktestPeriod() ? color.gray : na, transp = 90)

plot(series = fastMA, color = #0056BD, style = plot.style_line, linewidth = 2, title = "Fast SMA")
plot(series = slowMA, color = #FF6A00, style = plot.style_line, linewidth = 2, title = "Slow SMA")
plotshape(series = isWithinBacktestPeriod() and startLongDeal and strategy.position_size <= 0 ? fastMA : na, title = "UpTrend Begins", location = location.absolute, style = shape.circle, size = size.tiny, color = color.green, transp = 0)
plotshape(series = isWithinBacktestPeriod() and startLongDeal and strategy.position_size <= 0 ? fastMA : na, title = "Buy", text = "Buy", location = location.absolute, style = shape.labelup, size = size.tiny, color = color.green, textcolor = color.black, transp = 0)

plot(series = strategy.position_avg_price, color = color.blue, style = plot.style_linebr, linewidth = 2, title = "Position")
plot(series = longTakeProfitPrice, color = #FFD700, style = plot.style_linebr, linewidth = 2, title = "Long Take Profit")
plot(series = longTrailingStopLossPrice, color = color.fuchsia, style = plot.style_linebr, linewidth = 2, title = "Long Trail Stop")

// ==================================================================================================================
```

> Detail

https://www.fmz.com/strategy/434948

> Last Modified

2023-12-11 09:58:35
