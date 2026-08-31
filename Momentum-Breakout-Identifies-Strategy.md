
> Name

Momentum-Breakout-Identifies-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/165c87312bbfd12f475.png)

## Overview

This strategy identifies rapidly rising stocks and takes long positions when price breaks out new highs. It uses fixed percentage take profit to lock in profits. The strategy belongs to trend following strategies.

## Principle 

The strategy is mainly based on two indicators:

1. Fast RSI: It calculates the rise and fall of recent 3 bars to judge price momentum. When fast RSI is below 10, it is considered oversold status.

2. Body filter: It calculates the average body size of recent 20 bars. When the body size is larger than 2.5 times of average body, it is considered a valid breakout.

When fast RSI is below 10 and body filter is valid, a long position will be opened. After that, a fixed take profit of 20% is set. When price exceeds the open price * (1 + take profit percentage), the position will be closed.

The advantage of this strategy is it can capture the breakout opportunities at the beginning of trends. The fast RSI judges oversold levels and body filter avoids false breakouts. The fixed percentage take profit locks in profits of each trade and keeps catching the trend.

## Advantage Analysis

The advantages of this strategy:

1. Fast RSI identifies oversold levels and increases entry accuracy.

2. Body filter avoids false breakouts caused by fluctuations.

3. Fixed percentage take profit realizes stable profits and catches trends. 

4. The logic is simple and clear, easy to understand and implement.

5. Elegant code structure with great extensibility, easy to optimize.

6. Stable positive returns and high win rate in backtest.

## Risk Analysis

Some risks to note:

1. No stop loss mechanism, risks of expanding losses.

2. Improper take profit levels may lead to premature or too deep exit.

3. Consecutive small losses may occur in choppy markets.

4. Financing costs are not considered, actual returns may be lower.

5. Insufficient parameter optimization across different products.

## Optimization Directions

Some aspects can be optimized:

1. Add stop loss to control single trade loss.

2. Optimize dynamic take profit to follow trends.

3. Enhance breakout logic to improve entry accuracy. 

4. Add position sizing module to optimize capital usage.

5. Add parameter optimization module for different products.

6. Add filters to avoid losses in choppy markets.

7. Consider adding average cost management.

## Conclusion

In summary, this is an elegant and simple trend following strategy. It uses fast RSI to identify oversold levels, body filter to confirm valid breakout, and fixed percentage take profit to generate steady returns. Although there are rooms for optimization, the strategy is responsive and suitable for fast changing markets, making it a very practical trading strategy. With continuous optimizations, it can become a robust long term strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|TAKE PROFIT %|
|v_input_2|2019|BACKTEST START YEAR|
|v_input_3|true|BACKTEST START MONTH|
|v_input_4|true|BACKTEST START DAY|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// this is based on https://www.tradingview.com/v/PbQW4mRn/
strategy(title = "ONLY LONG V4 v1", overlay = true, initial_capital = 1000, pyramiding = 1000,
   calc_on_order_fills = false, calc_on_every_tick = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 50, commission_value = 0.075)

//study(title = "ONLY LONG V4 v1", overlay = true)

//Fast RSI
src = close
fastup = rma(max(change(src), 0), 3)
fastdown = rma(-min(change(src), 0), 3)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Body Filter
body = abs(close - open)
abody = sma(body, 20)

mac = sma(close, 20)
len = abs(close - mac)
sma = sma(len, 100)
max = max(open, close)
min = min(open, close)
up = close < open and len > sma * 2 and min < min[1] and fastrsi < 10 and body > abody * 2.5

// Strategy
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

var bool longCondition = na

longCondition := up == 1 ? 1 : na

// Get the price of the last opened long

var float last_open_longCondition = na

last_open_longCondition := longCondition ? close : nz(last_open_longCondition[1])

// Get the bar time of the last opened long

var int last_longCondition = 0

last_longCondition := longCondition ? time : nz(last_longCondition[1])

// Take profit
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

tp = input(20, "TAKE PROFIT %", type = input.float, minval = 0, step = 0.5)

long_tp = crossover(high, (1+(tp/100))*last_open_longCondition) and not longCondition

// Get the time of the last tp close

var int last_long_tp = na

last_long_tp := long_tp ? time : nz(last_long_tp[1])

Final_Long_tp = long_tp and last_longCondition > nz(last_long_tp[1])

// Count your long conditions

var int sectionLongs = 0

sectionLongs := nz(sectionLongs[1])

var int sectionTPs = 0

sectionTPs := nz(sectionTPs[1])

// Longs Counter

if longCondition
    sectionLongs := sectionLongs + 1
    sectionTPs := 0

if Final_Long_tp
    sectionLongs := 0
    sectionTPs := sectionTPs + 1
    
// Signals
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// Long

// label.new(
//    x = longCondition[1] ? time : na, 
//    y = na, 
//    text = 'LONG'+tostring(sectionLongs), 
//    color=color.lime, 
//    textcolor=color.black,  
//    style = label.style_labelup, 
//    xloc = xloc.bar_time, 
//    yloc = yloc.belowbar,
//    size = size.tiny)
   
// Tp

// label.new(
//    x = Final_Long_tp ? time : na, 
//    y = na, 
//    text = 'PROFIT '+tostring(tp)+'%', 
//    color=color.orange, 
//    textcolor=color.black,  
//    style = label.style_labeldown, 
//    xloc = xloc.bar_time, 
//    yloc = yloc.abovebar,
//    size = size.tiny) 

ltp = iff(Final_Long_tp, (last_open_longCondition*(1+(tp/100))), na), plot(ltp, style=plot.style_cross, linewidth=3, color = color.white, editable = false)

// Backtesting
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

testStartYear = input(2019, "BACKTEST START YEAR", minval = 1, maxval = 2222) 
testStartMonth = input(01, "BACKTEST START MONTH", minval = 1, maxval = 12)
testStartDay = input(01, "BACKTEST START DAY", minval = 1, maxval = 31)
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

strategy.entry("long", strategy.long, when = longCondition and (time >= testPeriodStart))
strategy.exit("TP", "long", limit = (last_open_longCondition*(1+(tp/100))))

// Alerts
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

alertcondition(longCondition[1], title="Long Alert", message = "LONG")
alertcondition(Final_Long_tp, title="Long TP Alert", message = "LONG TP")

```

> Detail

https://www.fmz.com/strategy/430846

> Last Modified

2023-11-02 14:39:22
