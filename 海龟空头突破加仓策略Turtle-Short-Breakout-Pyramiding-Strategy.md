
> Name

海龟空头突破加仓策略Turtle-Short-Breakout-Pyramiding-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略基于著名的海龟交易系统改编,在行情出现空头趋势时,在关键支持位进行空头加仓。属于典型的趋势突破加仓策略。

策略原理:

1. 设置10日低点、20日低点和55日低点作为关键支持线。

2. 当价格突破20日或55日支持线时,进行空头入场。

3. 在持仓期间,每下破一定ATR时进行空头加仓。

4. 当价格重新突破10日或20日高点时,进行止盈退出。

5. 设置ATR止损,价格突破时止损退出。

6. 可自定义多级加仓和止损的ATR倍数。

该策略的优势:

1. 支持线突破可确定虚弱的趋势转折点。

2. 加仓方式可在趋势中积累数量,追求更高收益。

3. ATR止损可根据市场波动率调整止损距离。

该策略的风险:

1. 关键支持线判定存在滞后,可能错过最佳入场点位。

2. 加仓方式风险积累较快,需要谨慎资金管理。

3. 无法限制单向亏损大小,存在较大回撤。

总之,该策略在空头加仓的同时设置移动止损。搭配优化参数可获取较强势行情增量,但需要警惕风险集中问题。

||

This strategy adapts the famous Turtle system for short trading, pyramiding on key support breaks in downtrends. It is a typical trend-following breakout pyramiding system.

Strategy Logic:

1. Set 10-day, 20-day and 55-day lows as key support levels.  

2. Enter short on break of 20-day or 55-day supports.

3. Add to short position on every breach of fixed ATR multiple during trade.

4. Take profit when price breaks back above 10-day or 20-day highs.

5. Use ATR stop loss, exiting when triggered.

6. Customizable ATR multiples for pyramiding and stop loss.

Advantages:  

1. Support breaks identify weakened reversals.

2. Pyramiding accumulates size in trends for greater gains.

3. ATR stop adapts to changing volatility.

Risks:

1. Lagging support identification can miss ideal entries.

2. Pyramiding rapidly compounds risks, requiring prudent position sizing.

3. No limit on directional loss size, potentially large drawdowns. 

In summary, this strategy pyramids shorts while using ATR trailing stops. With optimized parameters, it can capture strong moves incrementally but requires managing concentrated risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Stop N|
|v_input_2|true|Pyramid N|
|v_input_3|20|S1 Short|
|v_input_4|55|S2 Short|
|v_input_5|10|S1 Short Exit|
|v_input_6|20|S2 Short Exit|
|v_input_7|2000|From Year|
|v_input_8|true|From Month|
|v_input_9|true|From Day|
|v_input_10|9999|To Year|
|v_input_11|true|To Month|
|v_input_12|true|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-13 00:00:00
end: 2023-09-12 00:00:00
period: 5h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//  Copyright by Eugene v1.2 07/18/2019
// This is the short sell version of the strategy based on the famous turtle system.
// https://www.tradingblox.com/originalturtles/originalturtlerules.htm
//
// In a nutshell, it a trend trading system where you are shorting on strength (in the downtrend), selling on 
// weakness (that it might be reversing).
// positions should be entered when the price crosses under the 20-day low (S1 low) or 55-day low (S2 low).
// positions should be exited when the prices crosses over the 10-day high (S1 high) or 20-day high (S2 high)
// you can add positions at every unit (measured by multiple of n, where n=1 ATR)
// stops should be placed at 2*n above every position entered, when the stop is hit exit your entire position.
// positions should be entered everytime price crosses under S1 or S2, with one exception:
// if the last trade was an S1 trade and it was a winning trade, skip the next trade unless the price crosses
// under S2, if that is the case, you should take it.
// S1 and S2 levels are also configurable for high and lows.
// N multiple for stops and pyramid are also configurable

// To change this from a strateg to a study:
// 1) uncomment the next line and comment out the strategy line.
// 2) at the end of the file comment out the last 2 lines

// study(title="Turtle Study Short", overlay=true)
strategy(title="Turtle Strategy Short", overlay=true, initial_capital=50000, default_qty_type=strategy.percent_of_equity, commission_type=strategy.commission.percent, commission_value=0.1, pyramiding=5)

stopInput = input(2.0, "Stop N", step=.5)
pyramidInput = input(1, "Pyramid N", step=.5)
s1ShortInput = input(20, "S1 Short", minval=5)
s2ShortInput = input(55, "S2 Short", minval=5)
s1ShortExitInput = input (10, "S1 Short Exit", minval=5)
s2ShortExitInput = input (20, "S2 Short Exit", minval=5)

FromYear = input(2000, "From Year", minval=1900),   FromMonth = input(1, "From Month", minval=1, maxval=12),    FromDay = input(1, "From Day", minval=1, maxval=31)
ToYear = input(9999, "To Year", minval=1900),       ToMonth = input(1, "To Month", minval=1, maxval=12),        ToDay = input(1, "To Day", minval=1, maxval=31)
FromDate = timestamp(FromYear, FromMonth, FromDay, 00, 00),     ToDate = timestamp(ToYear, ToMonth, ToDay, 23, 59)
TradeDateIsAllowed() => time >= FromDate and time <= ToDate
s1Short = lowest(s1ShortInput)
s1ShortExit = highest(s1ShortExitInput)
s2Short = lowest(s2ShortInput)
s2ShortExit = highest(s2ShortExitInput)

bool win = false // tracks if last trade was winning trade of losing trade.
float totalPrice = 0.0  // tracks total price, used for calculating avgPrice
float buyPrice = 0.0 // tracks the buy price of the last short position.
float avgPrice = 0.0 // tracks the avg price of all currently held short positions.
float nextBuyPrice = 0.0  // tracks the next buy price
float stopPrice = na // tracks the stop price
int totalBuys = 0  // tracks the total # of pyramid buys
bool inBuy = false  // tracks if we are in a short position or not.
float s1ShortPlot = lowest(s1ShortInput)  // tracks the S1 price to display
float s2ShortPlot = lowest(s2ShortInput)  // tracks the S2 price to display
float n = atr(14)  // tracks the n used to calculate stops and pyramid buys
string mode = 'S1'  // tracks whether we are in a S1 position or S2 position.
bool fake = na // tracks if this is a fake trade, see comments below.
string shortLevel = na  // tracks where short positions, stops, pyramid buys occur.

// by default use the last value from the previous bar.
buyPrice := buyPrice[1]
totalBuys := totalBuys[1]
nextBuyPrice := nextBuyPrice[1]
stopPrice := stopPrice[1]
avgPrice := avgPrice[1]
totalPrice := totalPrice[1]
win := win[1]

// State to track if we are in a short positon or not.
inBuy := not inBuy[1] and (close < s1Short[1] or close < s2Short[1]) ? true : inBuy[1]
inBuy := inBuy[1] and close > stopPrice ? false : inBuy
inBuy := inBuy[1] and (close > s1ShortExit[1] or close > s2ShortExit[1])  ? false : inBuy

// State to track if we are ia a fake trade.  If the last trade was a winning, we need to skip the next trade.
// We still track it though as a fake trade (not counted against us). as the outcome determines if we can
// can take the next trade.
fake := close < s2Short[1] ? false : fake[1]
fake := not inBuy[1] and close < s1Short[1] and win[1] ? true : fake
fake := not inBuy[1] and close < s1Short[1] and not win[1] ? false : fake

// Series representing the s1 and s2 levels.   If we break out above the s1 or s2 level, we want the
// line to stay at the breakout level, not follow it up.
s1ShortPlot := iff(not inBuy or (inBuy and mode == 'S1' and fake),s1Short[1],s1ShortPlot[1])
s2ShortPlot := iff(not inBuy or (inBuy and mode == 'S1' and fake),s2Short[1],s2ShortPlot[1])


// Variable in the series is only set when it happens.   Possible values is S1, S2, SR 
// (stopped out with a loss), SG (exited with a gain), and 'P' for pyramid buy.
shortLevel := not inBuy[1] and close < s2Short[1] ? 'S2' : na
shortLevel := not inBuy[1] and close < s1Short[1] ? 'S1' : shortLevel
shortLevel := not inBuy[1] and close < s1Short[1] and close < s2Short[1]  and fake ? 'S2' : shortLevel
shortLevel := shortLevel == na and close < s2Short[1] and mode[1] == 'S1' ? na : shortLevel // don't switch to S2 if we are already in a S1
shortLevel := shortLevel == na and close < s2Short[1] and mode[1] == 'S1' and fake[1] ? 'S2' : shortLevel

// Either 'S1' or 'S2' depending on what breakout level we are in.
mode := shortLevel == na ? mode[1] : shortLevel

// Variables to track calculating avgPrice and nextBuyPrice for pyramiding.
if shortLevel == 'S1' or shortLevel == 'S2'
    buyPrice = close
    totalBuys := 1
    totalPrice := close
    avgPrice := buyPrice
    stopPrice := close + (stopInput*n)
    nextBuyPrice := low - (pyramidInput*n)

// Marks if we hit our next buy price, if so mark it with a 'P'
shortLevel := inBuy[1] and close < nextBuyPrice and TradeDateIsAllowed() and totalBuys < 5 ? 'P' : shortLevel

if shortLevel == 'P'
    buyPrice = close
    totalBuys := totalBuys[1] + 1
    totalPrice := totalPrice[1] + buyPrice
    avgPrice := totalPrice / totalBuys
    stopPrice := close + (stopInput*n)
    nextBuyPrice := low - (pyramidInput*n)

// Tracks stops and exits, marking them with SG or SR
shortLevel := shortLevel == na and inBuy[1] and close > stopPrice and close <= avgPrice ? 'SG' : shortLevel
shortLevel := shortLevel == na and inBuy[1] and close > stopPrice and close > avgPrice ? 'SR' : shortLevel
shortLevel := shortLevel == na and inBuy[1] and (close > s1ShortExit[1] or close > s2ShortExit[1]) and close <= avgPrice ? 'SG' : shortLevel
shortLevel := shortLevel == na and inBuy[1] and (close > s1ShortExit[1] or close > s2ShortExit[1]) and close > avgPrice ? 'SR' : shortLevel

// Tracks if the trade was a win or loss.
win := shortLevel == 'SG' ? true : win
win := shortLevel == 'SR' ? false : win

// Variables used to tell strategy when to enter/exit trade.
enterShort = (shortLevel == 'S1' or shortLevel == 'S2' or shortLevel == 'P') and not fake and TradeDateIsAllowed()
exitShort = (shortLevel == 'SG' or shortLevel == 'SR') and not fake and TradeDateIsAllowed()

p1 = plot(s1ShortPlot, title="s1 short", linewidth=3, style=plot.style_stepline, color=color.green)
p2 = plot(s1ShortExit[1], title="s1 exit", linewidth=3, style=plot.style_stepline, color=color.red)
p3 = plot(s2ShortPlot, title="s2 short", linewidth=2, style=plot.style_stepline, color=color.green)
p4 = plot(s2ShortExit[1], title="s2 exit", linewidth=2, style=plot.style_stepline, color=color.red)
color1 = color.new(color.black, 0)
color2 = color.new(color.black, 100)
col= (inBuy) ? color1 : color2
p5 = plot(stopPrice, title="stop", linewidth=2, style=plot.style_circles, join=true, color=col)
p6 = plot(nextBuyPrice, title="next buy", linewidth=2, style=plot.style_circles, join=true, color=col)

fill(p1, p3, color=color.green)
fill(p2, p4, color=color.red)

plotshape(shortLevel == 'S1' and not fake ? true : false, color=color.green, transp=40, style=shape.triangleup, text="S1") // up arrow for entering S1 trade
plotshape(fake and shortLevel == 'S1' ? true : false, color=color.gray, transp=40, style=shape.triangleup, text="S1") // up arrow for entering S1 trade
plotshape((mode == 'S2' or (mode == 'S1' and not fake)) and shortLevel == 'P' ? true : false, color=color.green, transp=40, style=shape.triangleup, text='P') // up arrow for entering S1 trade
plotshape(mode == 'S1' and fake and shortLevel == 'P' ? true : false, color=color.gray, transp=40, style=shape.triangleup, text='P') // up arrow for entering S1 trade
plotshape(shortLevel == 'S2' ? true : false, color=color.green, transp=40, style=shape.triangleup, text="S2") // up arrow for entering S2 trade

plotarrow(shortLevel == 'S1' ? 1 : 0, colordown=color.black, colorup=color.green, transp=40) // up arrow for entering S1 trade
plotarrow(shortLevel == 'S2' ? 1 : 0, colordown=color.black, colorup=color.green, transp=40) // up arrow for entering S2 trade
plotarrow(shortLevel == 'SR' ? -1 : 0, colordown=color.red, colorup=color.purple, transp=40) // down arrow for losing trade
plotarrow(shortLevel == 'SG' ? -1 : 0, colordown=color.green, colorup=color.purple, transp=40) // down arrow for winning trade

// plotarrow(mode == 'S1' ? -1 : 0, colordown=color.yellow, colorup=color.purple, transp=40) // down arrow for winning trade
// plotshape(inBuy[1], color=color.blue, transp=40, text='X') // down arrow for winning trade
// label.new(bar_index, high, style=label.style_none, text=tostring(avgPrice))

alertcondition(low < stopPrice, title="crosses over stop price", message="price croses over stop price")
alertcondition(high > s1Short, title="crosses under S1 price", message="price crossed under S1 price")
alertcondition(high > s2Short, title="crosses under S2 price", message="price crossed under S2 price")
alertcondition(low < s1ShortExit, title="crosses over S1 exit price", message="price crossed over S1 exit price")
alertcondition(low < s2ShortExit, title="crosses over S2 exit price", message="price crossed over S2 exit price")

strategy.entry("short", strategy.short, comment='short', when=enterShort)
strategy.close("short", when=exitShort)
```

> Detail

https://www.fmz.com/strategy/426570

> Last Modified

2023-09-13 14:05:12
