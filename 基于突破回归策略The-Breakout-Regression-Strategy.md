
> Name

基于突破回归策略The-Breakout-Regression-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6727ef820f88c51f18.png)

### Overview

This is a systematic approach designed to capitalize on the volatility of crude oil futures markets. It measures the average range of candlesticks. If the fast moving average is above the slow one, it means the candles are bigger. If the slow moving average is above the fast one, it means the candles are smaller.

According to this principle, it identifies potential long and short entry points. The position is only held for a fixed number of candles, controlled by the "Exit after bars" input.  

### Strategy Logic  

1. Calculate the highest close price of the most recent 9 bars, as the breakout benchmark
2. Calculate the lowest close price of the most recent 50 bars, as the breakout benchmark
3. Compare the average volatility of the most recent 5 and 20 bars to judge if the candlestick pattern is expanding or contracting
4. Identify long and short signals: when close equals the highest close and candles contracting, go long; when close equals the lowest close and candles contracting, go short
5. Close position after a fixed number of bars following breakout: adjustable parameter  

### Advantage Analysis   

1. Regression strategy, judge direction by comparing with historical extremes 
2. Combine with volatility, avoid false breakouts
3. Fixed number of bars for exit locks in some profit and avoids drawdown  

### Risk Analysis

1. Historical extremes change with market structure changes, signals may fail
2. False breakouts cause being trapped
3. Improper exit interval may lose greater profit or increase loss  

### Optimization  

1. Extremes parameters can be optimized through market statistics
2. Add volatility metrics to evaluate true breakout probability  
3. Optimize number of exit bars through backtest result  

### Summary  

This strategy utilizes breakout and regression to determine short-term trends, belonging to volatility strategies. By optimizing parameters and adding volatility metrics to determine false breakout probability, it can increase profitability. Also the fast exit mechanism locks in some profit and controls risk effectively. It can serve as an auxiliary tool for short-term trading, and can also generate longer-term trading signals through parameter tuning.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Highest Close lookback|
|v_input_2|50|Lowest Close lookback|
|v_input_3|10|Exit after bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Celestial_Logic

//@version=5
strategy("Crudeoil Breakout strategy", overlay = true, initial_capital = 20000, default_qty_type = strategy.fixed, default_qty_value = 1)


highestCloseLookback = input(9 , title = 'Highest Close lookback')
lowestCloseLookback  = input(50, title = 'Lowest Close lookback'  ) 

exitAfter = input(10, title = 'Exit after bars')

hc = ta.highest(close,highestCloseLookback)
lc = ta.lowest(close,lowestCloseLookback)

rangeFilter = (ta.sma( (high - low), 5 ) > ta.sma((high-low), 20) ) // Candles getting bigger.

longCondition  = (close == hc ) and not rangeFilter
shortCondition = (close == lc ) and not rangeFilter
if  longCondition
    strategy.entry(id = 'long', direction = strategy.long) 
if shortCondition
    strategy.entry(id = 'short', direction = strategy.short)



var int longsince = 0 
var int shortsince = 0 

if strategy.position_size > 0 
    longsince += 1
else
    longsince := 0

if strategy.position_size < 0 
    shortsince += 1 
else 
    shortsince := 0

if longsince >= exitAfter 
    strategy.close(id = 'long', comment = 'long close')
if shortsince >= exitAfter
    strategy.close(id = 'short', comment = 'short close')


```

> Detail

https://www.fmz.com/strategy/443239

> Last Modified

2024-03-01 11:58:56
