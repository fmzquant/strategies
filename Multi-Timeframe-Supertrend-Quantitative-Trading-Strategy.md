
> Name

Multi-Timeframe-Supertrend-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



This article explains in detail a quantitative trading strategy using the Supertrend indicator across multiple timeframes. It combines Supertrend signals on different periods to improve the reliability of trade signals.

I. Strategy Logic

The key components of the strategy include:

1. Calculating Supertrend on the current period to determine price trend direction.

2. Calculating Supertrend on a higher timeframe (such as daily) to gauge the major trend. 

3. Forming trade signals based on the consistency between Supertrend directions on the two timeframes.

4. Setting appropriate stop loss and take profit based on signals. 

5. Scaling out with fixed portions to lock in profits.

When Supertrend agrees on high and low timeframes, a major trend is identified and buy/sell signals are generated based on the indicator relationship. Stop loss and take profit manages the risk and reward of each trade.

II. Advantages of the Strategy

The biggest advantage lies in using multiple timeframes to filter false signals and improve reliability.

In addition, sensible stop loss and take profit settings ensure controllable risk per trade, avoiding excessive losses.

Lastly, scaling out portions of the profits is also a defining feature of the strategy.

III. Potential Weaknesses 

However, the following risks should also be acknowledged:

Firstly, Supertrend itself has lagging issues that may cause missed optimal entry points.

Secondly, stop loss set too aggressively risks being stopped out prematurely.

Finally, scaling out can introduce additional slippage costs. 

IV. Summary

In summary, this article has explained a quantitative strategy using Supertrend across multiple timeframes. It improves signal quality through the combination of high and low period analysis, and manages risks via stop loss, take profit and scaling out. Overall with proper tuning this strategy offers a reasonable approach utilizing the indicator.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1|D|Timeframe 1|
|v_input_timeframe_2|W|Timeframe 2|
|v_input_1|22|ATR Period|
|v_input_float_1|3|ATR Multiplier|
|v_input_2|true|Show Buy/Sell Labels ?|
|v_input_3|true|Use Close Price for Extremums ?|
|v_input_4|true|Highlight State ?|
|v_input_string_1|0|What trades should be taken : : BOTH|SHORT|LONG|
|v_input_5|timestamp(01 Jun 2021 13:30 +0000)|Backtesting Start Time|
|v_input_6|timestamp(30 Sep 2099 19:30 +0000)|Backtesting End Time|
|v_input_7|false|KeepLastPosition|
|v_input_float_2|5|(?Trades)Stop Loss %|
|v_input_int_1|5|TP1 %|
|v_input_int_2|10|TP2 %|
|v_input_int_3|15|TP3 %|
|v_input_int_4|10|TP1 Amount %|
|v_input_int_5|15|TP2 Amount %|
|v_input_int_6|20|TP3 Amount %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-13 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ranga_trading

//@version=5
// strategy(title='SuperTrend Multi Time Frame Long and Short Trading Strategy with Take Profit, Stop Loss and in build alerts V01', shorttitle='SuperTrend Multi Time Frame Long and Short Trading Strategy with Take Profit, Stop Loss and in build alerts V01 ', overlay=true, default_qty_value=60, initial_capital=2000, default_qty_type=strategy.percent_of_equity, pyramiding=0, process_orders_on_close=true)

tf1 = input.timeframe('D', title='Timeframe 1')
tf2 = input.timeframe('W', title='Timeframe 2')

length = input(title='ATR Period', defval=22)
mult = input.float(title='ATR Multiplier', step=0.1, defval=3.0)
showLabels = input(title='Show Buy/Sell Labels ?', defval=true)
useClose = input(title='Use Close Price for Extremums ?', defval=true)
highlightState = input(title='Highlight State ?', defval=true)


atr = mult * ta.atr(length)

longStop = (useClose ? ta.highest(close, length) : ta.highest(length)) - atr
longStopPrev = nz(longStop[1], longStop)
longStop := close[1] > longStopPrev ? math.max(longStop, longStopPrev) : longStop

shortStop = (useClose ? ta.lowest(close, length) : ta.lowest(length)) + atr
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := close[1] < shortStopPrev ? math.min(shortStop, shortStopPrev) : shortStop

var int dir = 1
dir := close > shortStopPrev ? 1 : close < longStopPrev ? -1 : dir

var color longColor = color.green
var color shortColor = color.red

longStopPlot = plot(dir == 1 ? longStop : na, title='Long Stop', style=plot.style_linebr, linewidth=2, color=color.new(longColor, 0))
buySignal = dir == 1 and dir[1] == -1
plotshape(buySignal ? longStop : na, title='Long Stop Start', location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(longColor, 0))

shortStopPlot = plot(dir == 1 ? na : shortStop, title='Short Stop', style=plot.style_linebr, linewidth=2, color=color.new(shortColor, 0))
sellSignal = dir == -1 and dir[1] == 1
plotshape(sellSignal ? shortStop : na, title='Short Stop Start', location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(shortColor, 0))

midPricePlot = plot(ohlc4, title='', style=plot.style_circles, linewidth=0, display=display.none, editable=false)

longFillColor = highlightState ? dir == 1 ? longColor : na : na
shortFillColor = highlightState ? dir == -1 ? shortColor : na : na
fill(midPricePlot, longStopPlot, title='Long State Filling', color=longFillColor, transp=90)
fill(midPricePlot, shortStopPlot, title='Short State Filling', color=shortFillColor, transp=90)


// CE Function
ce() =>
    atr2 = mult * ta.atr(length)

    longStop2 = (useClose ? ta.highest(close, length) : ta.highest(length)) - atr2
    longStop2Prev = nz(longStop2[1], longStop2)
    longStop2 := close[1] > longStop2Prev ? math.max(longStop2, longStop2Prev) : longStop2

    shortStop2 = (useClose ? ta.lowest(close, length) : ta.lowest(length)) + atr2
    shortStop2Prev = nz(shortStop2[1], shortStop2)
    shortStop2 := close[1] < shortStop2Prev ? math.min(shortStop2, shortStop2Prev) : shortStop2

    var int dir2 = 1
    dir2 := close > shortStop2Prev ? 1 : close < longStop2Prev ? -1 : dir2

    ce = dir2 == 1 ? longStop2 : shortStop2

    [dir2, ce]

[side, ce_plot] = ce()

ce1_plot = request.security(syminfo.tickerid, tf1, ce_plot[1], barmerge.gaps_off, barmerge.lookahead_on)
ce2_plot = request.security(syminfo.tickerid, tf2, ce_plot[1], barmerge.gaps_off, barmerge.lookahead_on)


ce1 = request.security(syminfo.tickerid, tf1, side[1], barmerge.gaps_off, barmerge.lookahead_on)
ce2 = request.security(syminfo.tickerid, tf2, side[1], barmerge.gaps_off, barmerge.lookahead_on)

long = buySignal and ce1 > 0 and ce2 > 0
short = sellSignal and ce1 < 0 and ce2 < 0

tradeType = input.string('BOTH', title='What trades should be taken : ', options=['LONG', 'SHORT', 'BOTH'])


// Position Management Tools
pos = 0.0

if tradeType == 'BOTH'
    pos := long ? 1 : short ? -1 : pos[1]
    pos
if tradeType == 'LONG'
    pos := long ? 1 : pos[1]
    pos
if tradeType == 'SHORT'
    pos := short ? -1 : pos[1]
    pos

longCond = long and (pos[1] != 1 or na(pos[1]))
shortCond = short and (pos[1] != -1 or na(pos[1]))


plot(ce1_plot, title='Timeframe 1 CE', color=ce1 > 0 ? #008000 : #800000, linewidth=2)
plot(ce2_plot, title='Timeframe 2 CE', color=ce2 > 0 ? color.green : color.red, linewidth=2)


// EXIT FUNCTIONS //
i_sl = input.float(5.0, title='Stop Loss %', minval=0, group='Trades')
sl = i_sl > 0 ? i_sl / 100 : 99999

long_entry = ta.valuewhen(longCond, close, 0)
short_entry = ta.valuewhen(shortCond, close, 0)


// Simple Stop Loss + 2 Take Profits
sl_long = strategy.position_avg_price * (1 - sl)
sl_short = strategy.position_avg_price * (1 + sl)


// Position Adjustment
long_sl = low < sl_long and pos[1] == 1
short_sl = high > sl_short and pos[1] == -1

if long_sl or short_sl
    pos := 0
    pos


long_exit = sellSignal and pos[1] == 1
short_exit = buySignal and pos[1] == -1

if long_exit or short_exit
    pos := 0
    pos

tp1percent = input.int(5, title='TP1 %', group='Trades') / 100.0
tp2percent = input.int(10, title='TP2 %', group='Trades') / 100.0
tp3percent = input.int(15, title='TP3 %', group='Trades') / 100.0

tp1amt = input.int(10, title='TP1 Amount %', group='Trades')
tp2amt = input.int(15, title='TP2 Amount %', group='Trades')
tp3amt = input.int(20, title='TP3 Amount %', group='Trades')

//  Strategy Backtest Limiting Algorithm
i_startTime = input(defval=timestamp('01 Jun 2021 13:30 +0000'), title='Backtesting Start Time')
i_endTime = input(defval=timestamp('30 Sep 2099 19:30 +0000'), title='Backtesting End Time')
timeCond = true

KeepLastPosition = input(false)

// Make sure we are within the bar range, Set up entries and exit conditions
strategy.entry('long', strategy.long, when=longCond == true and tradeType != 'SHORT' and timeCond)
strategy.entry('short', strategy.short, when=shortCond == true and tradeType != 'LONG' and timeCond)

var float Qty1 = na
var float Qty2 = na
var float Qty3 = na
var float Qty4 = na

if strategy.position_size == 0
    equity_q = (50000 + strategy.netprofit) / close
    Qty1 := equity_q * tp1amt / 100.0
    Qty2 := equity_q * tp2amt / 100.0
    Qty3 := equity_q * tp3amt / 100.0
    Qty4 := equity_q - Qty1 - Qty2 - Qty3
    Qty4

strategy.exit('Exit1', qty=Qty1, stop=sl_long, limit=strategy.position_avg_price * (1 + tp1percent), when=strategy.position_size > 0)
strategy.exit('Exit2', qty=Qty2, stop=sl_long, limit=strategy.position_avg_price * (1 + tp2percent), when=strategy.position_size > 0)
strategy.exit('Exit3', qty=Qty3, stop=sl_long, limit=strategy.position_avg_price * (1 + tp3percent), when=strategy.position_size > 0)
strategy.exit('Exit4', qty=Qty4, stop=sl_long, when=strategy.position_size > 0 and KeepLastPosition == false)
strategy.close('long', when=long_exit, comment='CE Exit')

strategy.exit('Exit1', qty=Qty1, stop=sl_short, limit=strategy.position_avg_price * (1 - tp1percent), when=strategy.position_size < 0)
strategy.exit('Exit2', qty=Qty2, stop=sl_short, limit=strategy.position_avg_price * (1 - tp2percent), when=strategy.position_size < 0)
strategy.exit('Exit3', qty=Qty3, stop=sl_short, limit=strategy.position_avg_price * (1 - tp3percent), when=strategy.position_size < 0)
strategy.exit('Exit4', qty=Qty4, stop=sl_short, when=strategy.position_size < 0 and KeepLastPosition == false)
strategy.close('short', when=short_exit, comment='CE Exit')

plot(strategy.position_size > 0 ? strategy.position_avg_price * (1 + tp1percent) : na, color=color.new(color.green, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 ? strategy.position_avg_price * (1 + tp2percent) : na, color=color.new(color.green, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 ? strategy.position_avg_price * (1 + tp3percent) : na, color=color.new(color.green, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 ? sl_long : na, color=color.new(color.red, 0), style=plot.style_linebr)
plot(strategy.position_size > 0 ? strategy.position_avg_price : na, color=color.new(color.gray, 0), style=plot.style_linebr)

plot(strategy.position_size < 0 ? strategy.position_avg_price * (1 - tp1percent) : na, color=color.new(color.green, 0), style=plot.style_linebr)
plot(strategy.position_size < 0 ? strategy.position_avg_price * (1 - tp2percent) : na, color=color.new(color.green, 0), style=plot.style_linebr)
plot(strategy.position_size < 0 ? strategy.position_avg_price * (1 - tp3percent) : na, color=color.new(color.green, 0), style=plot.style_linebr)
plot(strategy.position_size < 0 ? sl_short : na, color=color.new(color.red, 0), style=plot.style_linebr)
plot(strategy.position_size < 0 ? strategy.position_avg_price : na, color=color.new(color.gray, 0), style=plot.style_linebr)


```

> Detail

https://www.fmz.com/strategy/426850

> Last Modified

2023-09-14 20:21:39
