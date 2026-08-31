
> Name

多级移势均线交易策略Multi-level-Shift-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview  

The multi-level shift moving average trading strategy enters and stops loss at multiple levels by setting several shift moving average lines with different parameters. The strategy first calculates 3 long lines and 3 short lines. It goes long when the long lines are below the short lines, and goes short when the short lines are below the long lines. The strategy allows customization of parameters like the moving average period, shift ratio, tradable time range, etc. It is suitable for medium-long term trend trading.

## Strategy Logic

1. Calculate the len period simple moving average of the src price as the base line.

2. Set the number of long and short lines based on the long and short parameters. 

3. The longline1 etc are set by shifting the base line according to the longlevel1 etc ratios. The shortlines are set similarly.

4. Enter trades at multiple levels when price crosses the lines within tradable times. 

5. Stop loss when price touches the base line.

6. Force close all positions after the end time.

## Advantage Analysis  

The strategy has the following advantages:

1. Multi-level entry allows profiting at different stages of the trend.

2. Highly customizable with parameters for different products and trading styles. 

3. Reliable breakout system based on moving averages. 

4. Avoid major events by setting tradable time range.

5. Contained losses through stop loss.

## Risk Analysis

Some risks of the strategy:

1. High risk from pyramiding positions, sufficient capital needed.

2. Improper parameters may lead to over-trading.

3. Fixed exit time may miss late trend profit.

4. No consideration for overnight positions and carry cost.

5. No control over position sizing.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Add trailing stop loss instead of fixed exit time.

2. Consider carry cost for overnight positions. 

3. Add trailing stop loss to capture late profits.

4. Dynamically size positions based on current exposure.

5. Test parameters on different products and build optimization methods. 

6. Optimize stop loss levels to avoid unnecessary stops.

## Summary

The multi-level shift moving average strategy profits from trends through multi-level entry based on moving averages. The tradable times and stop loss controls risk well. Further improvements on carry cost control, parameter optimization, stop loss optimization etc. can enhance the strategy and are worth researching.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Lines for long|
|v_input_2|3|Lines for short|
|v_input_3|100|Lot|
|v_input_4|3|MA Length|
|v_input_5_ohlc4|0|MA Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_6|15|Short line 3|
|v_input_7|10|Short line 2|
|v_input_8|5|Short line 1|
|v_input_9|-5|Long line 1|
|v_input_10|-10|Long line 2|
|v_input_11|-15|Long line 3|
|v_input_12|true|Offset|
|v_input_13|1900|From Year|
|v_input_14|2100|To Year|
|v_input_15|true|From Month|
|v_input_16|12|To Month|
|v_input_17|true|From day|
|v_input_18|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-16 00:00:00
end: 2023-09-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=4
strategy(title = "Noro's ShiftMA-multi Strategy v1.1", shorttitle = "ShiftMA-multi", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 3)

//Settings
long = input(3, defval = 3, minval = 0, maxval = 3, title = "Lines for long")
short = input(3, defval = 3, minval = 0, maxval = 3, title = "Lines for short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot")
len = input(3, minval = 1, title = "MA Length")
src = input(ohlc4, title = "MA Source")
shortlevel3 = input(15.0, title = "Short line 3")
shortlevel2 = input(10.0, title = "Short line 2")
shortlevel1 = input(5.0, title = "Short line 1")
longlevel1 = input(-5.0, title = "Long line 1")
longlevel2 = input(-10.0, title = "Long line 2")
longlevel3 = input(-15.0, title = "Long line 3")
needoffset = input(true, title = "Offset")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Variables
size = strategy.position_size
mult = 1 / syminfo.mintick

//MA
ma = sma(src, len)
longline1 = long >= 1 ? round(ma * ((100 + longlevel1) / 100) * mult) / mult : close
longline2 = long >= 2 ? round(ma * ((100 + longlevel2) / 100) * mult) / mult : close
longline3 = long >= 3 ? round(ma * ((100 + longlevel3) / 100) * mult) / mult : close
shortline1 = short >= 1 ? round(ma * ((100 + shortlevel1) / 100) * mult) / mult : close
shortline2 = short >= 2 ? round(ma * ((100 + shortlevel2) / 100) * mult) / mult : close
shortline3 = short >= 3 ? round(ma * ((100 + shortlevel3) / 100) * mult) / mult : close

//Lines
colorlong1 = long >= 1 ? color.lime : na
colorlong2 = long >= 2 ? color.lime : na
colorlong3 = long >= 3 ? color.lime : na
colorshort1 = short >= 1 ? color.red : na
colorshort2 = short >= 2 ? color.red : na
colorshort3 = short >= 3 ? color.red : na
offset = needoffset ? 1 : 0
plot(shortline3, offset = offset, color = colorshort1)
plot(shortline2, offset = offset, color = colorshort2)
plot(shortline1, offset = offset, color = colorshort3)
plot(ma, offset = offset, color = color.blue)
plot(longline1, offset = offset, color = colorlong1)
plot(longline2, offset = offset, color = colorlong2)
plot(longline3, offset = offset, color = colorlong3)

//Trading
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]
lots = 0.0
needtime = time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)
if ma > 0
    lots := round(size / lot)
    strategy.entry("L1", strategy.long, lot, limit = longline1, when = (lots == 0 and long >= 1 and needtime))
    lots := round(size / lot)
    strategy.entry("L2", strategy.long, lot, limit = longline2, when = (lots <= 1 and long >= 2 and needtime))
    lots := round(size / lot)
    strategy.entry("L3", strategy.long, lot, limit = longline3, when = (lots <= 2 and long >= 3 and needtime))
    
    lots := round(size / lot)
    strategy.entry("S1", strategy.short, lot, limit = shortline1, when = (lots == 0 and short >= 1 and needtime))
    lots := round(size / lot)
    strategy.entry("S2", strategy.short, lot, limit = shortline2, when = (lots >= -1 and short >= 2 and needtime))
    lots := round(size / lot)
    strategy.entry("S3", strategy.short, lot, limit = shortline3, when = (lots >= -2 and short >= 3 and needtime))
if size > 0
    strategy.entry("TPL", strategy.short, 0, limit = ma)
if size < 0
    strategy.entry("TPS", strategy.long, 0, limit = ma)
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427681

> Last Modified

2023-09-23 15:55:20
