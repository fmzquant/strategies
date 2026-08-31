
> Name

Trailing-Stop-Loss-Dual-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12a67e2c5b72767179b.png)

## Overview

This strategy uses fast and slow moving average crossovers to determine long and short positions. It goes long when the fast MA crosses over the slow MA and closes position when the fast MA crosses below the slow MA. To pursue higher profits, the strategy adopts a trailing stop loss mechanism. Instead of setting the stop loss price right below the entry price after opening long positions, it sets a trailing stop loss price which moves up following the price rise until the price drop hits the stop loss price limit.  

## How it works

The strategy uses fast and slow Simple Moving Average (SMA) lines to determine entries and exits. When the fast SMA crosses over the slow SMA, it signals an uptrend so the strategy goes long. When the fast SMA crosses below the slow SMA, it signals a trend reversal so the strategy prepares to close position.

To maximize profits, the strategy introduces a trailing stop loss mechanism. Instead of using a fixed stop loss price after opening long positions, it sets a trailing stop loss price which moves up following the price rise. Each time the price rises by a certain percentage, the trailing stop loss price adjusts up by a predefined percentage. When the price pulls back and hits the trailing stop loss price, it triggers the stop loss order to close position.  

Specifically, the trailing stop loss price is calculated as:

Trailing Stop Loss Price = Price × (1 - Stop Loss Trailing Percentage)

The Stop Loss Trailing Percentage is defined by the strategy parameter “Deviation %”. The strategy recalculates the trailing stop loss price on every bar's close. The new trailing stop loss price cannot be lower than that of the previous bar, so as to ensure the stop loss price only moves up, not down.

When the price drops and hits the trailing stop loss price, it triggers the closing signal and the position will be closed by a market order.

## Advantages

- Use dual moving average to determine trend direction with good backtest results
- Adopt trailing stop loss to pursue higher profits 
- Customizable moving average periods and stop loss trailing percentage
- Stop loss line keeps moving up when trend goes up, locking in most profits
- Quick stop loss when trend reverses to avoid further losses

## Risks and Solutions

- Improper moving average crossover timing may cause false signals. Test different parameters to find the optimal MA combination
- Overly aggressive trailing stop loss may get stopped out prematurely. Adjust the stop loss trailing percentage parameter properly  
- Price gaps may directly penetrate the stop loss price. Consider combining other indicators to judge trend and avoid trading during ranging periods

## Optimization Directions

- Test different moving average period parameters to find the optimal combination
- Test different stop loss trailing percentage parameters to find the optimal stop loss level
- Add other indicators to suspend trading during ranging periods to avoid being affected by sporadic events

## Conclusion

This strategy combines moving average indicators to judge trend direction and trailing stop loss mechanism to lock in profits, performing well on training data. By optimizing parameters and controlling risks, it has the potential to achieve steady profits. However, no strategy can completely avoid losses. It's recommended to adjust position sizing, test different products, and diversify risks.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Filters)From|
|v_input_1|timestamp(01 Jan 2021 00:00 UTC)|fromDate|
|v_input_bool_2|false|To |
|v_input_2|timestamp(31 Dec 2121 23:59 UTC)|toDate|
|v_input_int_1|21|(?Strategy)Fast/Slow SMA Length|
|v_input_int_2|49|slowMALen|
|v_input_bool_3|true|(?Exit)Enable Trailing|
|v_input_float_1|3|Deviation %|
|v_input_source_1_low|0|Source Exit Control: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-22 00:00:00
end: 2023-12-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 
//  -----------------------------------------------------------------------------
//  Copyright 2022 Iason Nikolas | jason5480
//  Trailing Buy script may be freely distributed under the MIT license.
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
//  Date:     24-Feb-2022
//
//  Description
//  =============================================================================
//  This strategy will go long if fast MA crosses over slow MA.
//  If the 'Enable Trailing` is checked then the strategy instead of exiting from the position
//  directly it will follow the price upwards (percentagewise) with small steps
//  If the price drops by this percentage then the exit order will be executed
//
//  The strategy has the following parameters:
//
//  Fast SMA Length - How many candles back to calculte the fast SMA.
//  Slow SMA Length - How many candles back to calculte the slow SMA.
//  Enable Trailing - Enable or disable the trailing
//  Deviation % - The step to follow the price when the open position condition is met.
//  Source Exit Control - The source price to compare with the exit price to trigger the exit order when trailing.
//  
//  -----------------------------------------------------------------------------
//  Disclaimer:
//    1. I am not licensed financial advisors or broker dealer. I do not tell you 
//       when or what to buy or sell. I developed this software which enables you 
//       execute manual or automated using TradingView. The 
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

strategy(title = 'Trailing Sell',
         shorttitle = 'TS',
         overlay = true,
         pyramiding = 0,
         default_qty_type = strategy.percent_of_equity,
         default_qty_value = 100,
         initial_capital = 100000)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// FILTERS ==========================================================================================================

// INPUT ============================================================================================================
usefromDate = input.bool(defval = true, title = 'From', inline = "From Date", group = "Filters")
fromDate = input(defval = timestamp('01 Jan 2021 00:00 UTC'), title = '', inline = "From Date", group = 'Filters')
usetoDate = input.bool(defval = false, title = 'To ', inline = "To Date", group = "Filters")
toDate = input(defval = timestamp('31 Dec 2121 23:59 UTC'), title = '', inline = "To Date", group = 'Filters')

// LOGIC ============================================================================================================
isWithinPeriod() => true // create function "within window of time"

// PLOT =============================================================================================================
bgcolor(color = isWithinPeriod() ? color.new(color.gray, 90) : na, title = 'Period')

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// STRATEGY =========================================================================================================

// INPUT ============================================================================================================
fastMALen = input.int(defval = 21, title = 'Fast/Slow SMA Length', inline = 'MA Length', group = 'Strategy')
slowMALen = input.int(defval = 49, title = '', tooltip = 'How many candles back to calculte the fast/slow SMA.', inline = 'MA Length', group = 'Strategy')

// LOGIC ============================================================================================================
fastMA = ta.sma(close, fastMALen)
slowMA = ta.sma(close, slowMALen)

bool openLongPosition = isWithinPeriod() and ta.crossover(fastMA, slowMA)
bool closeLongPosition = ta.crossunder(fastMA, slowMA)

// PLOT =============================================================================================================
var fastColor = color.new(#0056BD, 0)
plot(series = fastMA, title = 'Fast SMA', color = fastColor, linewidth = 1, style = plot.style_line)
var slowColor = color.new(#FF6A00, 0)
plot(series = slowMA, title = 'Slow SMA', color = slowColor, linewidth = 1, style = plot.style_line)

plotshape(series = closeLongPosition and strategy.position_size > 0 ? fastMA : na, title = 'Sell', text = 'Sell', style = shape.labeldown, location = location.absolute, color = color.new(color.red, 0), textcolor = color.new(color.white, 0), size = size.tiny)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// EXIT ============================================================================================================

// INPUT ============================================================================================================
enableTrailing = input.bool(defval = true, title = 'Enable Trailing', tooltip = 'Enable or disable the trailing for exit position.', group = 'Exit')
devExitPerc = input.float(defval = 3.0, title = 'Deviation %', minval = 0.01, maxval = 100, step = 0.05, tooltip = 'The step to follow the price when the open position condition is met.', group = 'Exit') / 100
ctrLongExitSrc = input.source(defval = low, title = 'Source Exit Control', tooltip = 'The source price to compare with the exit price to trigger the exit order when trailing.', group = 'Exit')

// LOGIC ============================================================================================================
var bool exitLongPosition = false

int barsSinceOpenLong = nz(ta.barssince(openLongPosition), 999999)
int barsSinceCloseLong = nz(ta.barssince(closeLongPosition), 999999)
int barsSinceExitLong = nz(ta.barssince(exitLongPosition), 999999)
bool closeLongIsActive = barsSinceOpenLong >= barsSinceCloseLong
bool exitLongIsPending = barsSinceExitLong >= barsSinceCloseLong
bool tryExitLongPosition = isWithinPeriod() and closeLongIsActive and exitLongIsPending

float longExitPrice = na
longExitPrice := if closeLongPosition and strategy.position_size > 0
    close * (1 - devExitPerc)
else if tryExitLongPosition
    math.max(high * (1 - devExitPerc), nz(longExitPrice[1], 999999))
else
    na

exitLongPosition := enableTrailing ? isWithinPeriod() and ta.crossunder(closeLongPosition ? close : ctrLongExitSrc, longExitPrice) : closeLongPosition

// PLOT =============================================================================================================
var sellPriceColor = color.new(#e25141, 0)
plot(series = enableTrailing ? longExitPrice : na, title = 'Long Sell Price', color = sellPriceColor, linewidth = 1, style = plot.style_linebr)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// POSITION ORDERS ==================================================================================================

// LOGIC ============================================================================================================
// getting into LONG position
strategy.entry(id = 'Long Entry', direction = strategy.long, when = openLongPosition, alert_message = 'Long(' + syminfo.ticker + '): Started')
// submit close order on trend reversal
strategy.close(id = 'Long Entry', when = exitLongPosition, comment = 'Close Long', alert_message = 'Long(' + syminfo.ticker + '): Closed at market price')

// PLOT =============================================================================================================
var posColor = color.new(color.white, 0)
plot(series = strategy.position_avg_price, title = 'Position', color = posColor, linewidth = 1, style = plot.style_linebr)

// ==================================================================================================================
```

> Detail

https://www.fmz.com/strategy/437040

> Last Modified

2023-12-29 16:59:17
