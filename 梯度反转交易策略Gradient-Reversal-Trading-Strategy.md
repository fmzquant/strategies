
> Name

梯度反转交易策略Gradient-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description




## Overview

The Gradient Reversal Trading Strategy is a trend-following strategy that generates trading signals using a moving average crossover system. It detects the direction of the current price trend by calculating moving averages of different periods and enters long or short trades at trend reversal points. The strategy aims to capture mid-to-long term trends and trade when the trends reverse.

## Strategy Logic

The strategy calculates two moving averages, one longer period MA acts as the baseline, and the other shorter period MA crossing over generates trading signals. The specific logic is:

1. Calculate a baseline MA with period parameter len1, representing the longer term trend. 

2. Calculate a signal MA with period len2, representing the shorter term trend, len2 < len1.

3. When the shorter MA crosses down the longer MA from above, go short, indicating a trend reversal and the price may go down.

4. When the shorter MA crosses up the longer MA from below, go long, indicating a trend reversal and the price may go up.

5. When the price moves back to the longer MA, close the position.

6. By capturing the crossover of MAs, it trades the mid-term trend reversals.

## Advantages

1. Effectively catches mid-term trend reversals using MA crossover system.

2. Trading signals are simple and clear to follow. 

3. Customizable period parameters fit different products and traders.

4. Can set stop loss and take profit to control risk per trade.

5. No need to predict specific price values, only care about trend direction.

## Risks

1. More false signals may occur during ranging markets with frequent MA crosses.

2. Unable to profit from short-term price swings, only suitable for mid-to-long term trend trading.

3. MA system lags price change, unable to timely catch trend reversals. 

4. Trading frequency may be low, unable to gain sufficient profit.

5. Need to adjust parameters in a timely manner to adapt the market.

## Optimization

1. Combine with other indicators like MACD, KD to filter false signals.

2. Add a trend filter, only trade when trend is clear.

3. Trade multiple timeframes, more opportunities from combing MAs of different periods.

4. Dynamically optimize parameters to adapt the changing market.

5. Introduce machine learning models to assist judging trend reversals.

## Conclusion

The Gradient Reversal Trading Strategy is an easy-to-use trend following strategy overall. It catches mid-term trend reversal points by identifying MA crossovers, in order to trade the longer-term price trends. The strategy is easy to implement with clear trading signals, but also has some limitations. It can be improved by optimizing parameters, combining other indicators, and introducing machine learning to better seize market opportunities.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2015|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2018|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|true|Color Background?|
|v_input_8|true|Trade Direction (ON: Buy Side OFF: Sell Side)|
|v_input_9|true|Trade Mode (ON: Counter Trend OFF: Trend Following)|
|v_input_10|14|Period|
|v_input_11|1.4|Multiple|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-02 00:00:00
end: 2023-10-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Created by 100kiwi
strategy(title = "TrapTrading", overlay = true)

/////////////////////////////////////////////////////////////////////
// COMPONENT CODE START
//*******************************************************************
// Backtesting Period Selector | Component by pbergden
//*******************************************************************
testStartYear = input(2015, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2018, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true
// COMPONENT CODE STOP
/////////////////////////////////////////////////////////////////////

// input
buySide = input(defval = true, title = "Trade Direction (ON: Buy Side OFF: Sell Side)", type = bool)
counterTrend  = input(defval = true, title = "Trade Mode (ON: Counter Trend OFF: Trend Following)", type = bool)
len1 = input(defval = 14, title = "Period")
multiple = input(defval = 1.4, title = "Multiple")

m1 = close - close[len1]
controlPoint = counterTrend ? lowest(abs(m1), len1) == abs(m1) : highest(abs(m1), len1) == abs(m1)
baseLine = valuewhen(controlPoint, avg(close, close[len1]), 0)

// trap line
atr = atr(len1)
line1Up = baseLine + (atr * multiple)
line2Up = baseLine + (atr * 2 * multiple)
line3Up = baseLine + (atr * 3 * multiple)
line4Up = baseLine + (atr * 4 * multiple)
line5Up = baseLine + (atr * 5 * multiple)
line6Up = baseLine + (atr * 6 * multiple)
line7Up = baseLine + (atr * 7 * multiple)
line8Up = baseLine + (atr * 8 * multiple)
line9Up = baseLine + (atr * 9 * multiple)
line10Up = baseLine + (atr * 10 * multiple)
line1Down = baseLine - (atr * multiple)
line2Down = baseLine - (atr * 2 * multiple)
line3Down = baseLine - (atr * 3 * multiple)
line4Down = baseLine - (atr * 4 * multiple)
line5Down = baseLine - (atr * 5 * multiple)
line6Down = baseLine - (atr * 6 * multiple)
line7Down = baseLine - (atr * 7 * multiple)
line8Down = baseLine - (atr * 8 * multiple)
line9Down = baseLine - (atr * 9 * multiple)
line10Down = baseLine - (atr * 9 * multiple)

// draw
color = close >= baseLine ? teal : red
barcolor(controlPoint ? yellow : na, title = "Candle Color")

plot(baseLine, title = "Base Line", color = white, linewidth = 4, style = stepline, transp = 0)
plot(line1Up, title = "1Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line2Up, title = "2Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line3Up, title = "3Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line4Up, title = "4Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line5Up, title = "5Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line6Up, title = "6Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line7Up, title = "7Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line8Up, title = "8Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line9Up, title = "9Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line10Up, title = "10Up Line", color = green, linewidth = 1, style = stepline, transp = 0)
plot(line1Down, title = "1Down Line", color = red, linewidth = 1, style = stepline, transp = 0)
plot(line2Down, title = "2Down Line", color = red, linewidth = 1, style = stepline, transp = 0)
plot(line3Down, title = "2Down Line", color = red, linewidth = 1, style = stepline, transp = 0)
plot(line4Down, title = "4Down Line", color = red, linewidth = 1, style = stepline, transp = 0)
plot(line5Down, title = "5Down Line", color = red, linewidth = 1, style = stepline, transp = 0)
plot(line6Down, title = "6Down Line", color = red, linewidth = 1, style = stepline, transp = 0)
plot(line7Down, title = "7Down Line", color = red, linewidth = 1, style = stepline, transp = 0)
plot(line8Down, title = "8Down Line", color = red, linewidth = 1, style = stepline, transp = 0)
plot(line9Down, title = "9Down Line", color = red, linewidth = 1, style = stepline, transp = 0)
plot(line10Down, title = "10Down Line", color = red, linewidth = 1, style = stepline, transp = 0)

// strategy code
if testPeriod() and buySide
    strategy.exit("Exit Long0", from_entry = "Long0", qty = 1, limit = line2Up)
    strategy.exit("Exit Long1", from_entry = "Long1", qty = 1, limit = line1Up)
    strategy.exit("Exit Long2", from_entry = "Long2", qty = 1, limit = baseLine)
    strategy.exit("Exit Long3", from_entry = "Long3", qty = 1, limit = line1Down)
    strategy.exit("Exit Long4", from_entry = "Long4", qty = 1, limit = line2Down)
    strategy.exit("Exit Long5", from_entry = "Long5", qty = 1, limit = line3Down)
    strategy.exit("Exit Long6", from_entry = "Long6", qty = 1, limit = line4Down)
    strategy.exit("Exit Long7", from_entry = "Long7", qty = 1, limit = line5Down)
    strategy.exit("Exit Long8", from_entry = "Long8", qty = 1, limit = line6Down)
    strategy.exit("Exit Long9", from_entry = "Long9", qty = 1, limit = line7Down)
    strategy.exit("Exit Long10", from_entry = "Long10", qty = 1, limit = line8Down)
    strategy.order("Long0", strategy.long, qty = 1, limit = baseLine, when = strategy.position_size <= 0)
    strategy.order("Long1", strategy.long, qty = 1, limit = line1Down, when = strategy.position_size <= 1)
    strategy.order("Long2", strategy.long, qty = 1, limit = line2Down, when = strategy.position_size <= 2)
    strategy.order("Long3", strategy.long, qty = 1, limit = line3Down, when = strategy.position_size <= 3)
    strategy.order("Long4", strategy.long, qty = 1, limit = line4Down, when = strategy.position_size <= 4)
    strategy.order("Long5", strategy.long, qty = 1, limit = line5Down, when = strategy.position_size <= 5)
    strategy.order("Long6", strategy.long, qty = 1, limit = line6Down, when = strategy.position_size <= 6)
    strategy.order("Long7", strategy.long, qty = 1, limit = line7Down, when = strategy.position_size <= 7)
    strategy.order("Long8", strategy.long, qty = 1, limit = line8Down, when = strategy.position_size <= 8)
    strategy.order("Long9", strategy.long, qty = 1, limit = line9Down, when = strategy.position_size <= 9)
    strategy.order("Long10", strategy.long, qty = 1, limit = line10Down, when = strategy.position_size <= 10)
else
    if testPeriod() and not buySide
        strategy.exit("Exit Short0", from_entry = "Short0", qty = 1, limit = line2Down)
        strategy.exit("Exit Short1", from_entry = "Short1", qty = 1, limit = line1Down)
        strategy.exit("Exit Short2", from_entry = "Short2", qty = 1, limit = baseLine)
        strategy.exit("Exit Short3", from_entry = "Short3", qty = 1, limit = line1Up)
        strategy.exit("Exit Short4", from_entry = "Short4", qty = 1, limit = line2Up)
        strategy.exit("Exit Short5", from_entry = "Short5", qty = 1, limit = line3Up)
        strategy.exit("Exit Short6", from_entry = "Short6", qty = 1, limit = line4Up)
        strategy.exit("Exit Short7", from_entry = "Short7", qty = 1, limit = line5Up)
        strategy.exit("Exit Short8", from_entry = "Short8", qty = 1, limit = line6Up)
        strategy.exit("Exit Short9", from_entry = "Short9", qty = 1, limit = line7Up)
        strategy.exit("Exit Short10", from_entry = "Short10", qty = 1, limit = line8Up)
        strategy.order("Short0", strategy.short, qty = 1, limit = baseLine, when = strategy.position_size >= 0)
        strategy.order("Short1", strategy.short, qty = 1, limit = line1Up, when = strategy.position_size >= -1)
        strategy.order("Short2", strategy.short, qty = 1, limit = line2Up, when = strategy.position_size >= -2)
        strategy.order("Short3", strategy.short, qty = 1, limit = line3Up, when = strategy.position_size >= -3)
        strategy.order("Short4", strategy.short, qty = 1, limit = line4Up, when = strategy.position_size >= -4)
        strategy.order("Short5", strategy.short, qty = 1, limit = line5Up, when = strategy.position_size >= -5)
        strategy.order("Short6", strategy.short, qty = 1, limit = line6Up, when = strategy.position_size >= -6)
        strategy.order("Short7", strategy.short, qty = 1, limit = line7Up, when = strategy.position_size >= -7)
        strategy.order("Short8", strategy.short, qty = 1, limit = line8Up, when = strategy.position_size >= -8)
        strategy.order("Short9", strategy.short, qty = 1, limit = line9Up, when = strategy.position_size >= -9)
        strategy.order("Short10", strategy.short, qty = 1, limit = line10Up, when = strategy.position_size >= -10)
```

> Detail

https://www.fmz.com/strategy/428789

> Last Modified

2023-10-09 15:10:39
