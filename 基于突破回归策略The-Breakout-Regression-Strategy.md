
> Name

基于突破回归策略The-Breakout-Regression-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6727ef820f88c51f18.png)
[trans]

### 概述

该策略是一个系统化的方法,旨在利用原油期货市场的波动性获利。它测量蜡烛的平均区间范围,如果快速移动平均线高于慢速移动平均线,这意味着蜡烛更大;如果慢速移动平均线高于快速移动平均线,这意味着蜡烛更小。

根据这个原理,识别潜在的长入场点和短入场点。仓位只保持一定的蜡烛数量,这个参数由“Exit after bars”输入控制。

### 策略原理

1. 计算最近9根K线的最高收盘价,作为突破判断标准
2. 计算最近50根K线的最低收盘价,作为突破判断标准
3. 计算最近5根和20根K线的平均波幅对比,判断K线形态逐渐扩大还是缩小
4. 识别长线和短线突破信号:当收盘价等于最高收盘价,且K线逐渐缩小时,做多;当收盘价等于最低收盘价,且K线逐渐缩小时,做空
5. 突破后的固定根K线平仓离场:可调整参数改变平仓间隔

### 优势分析

1. 回归策略,通过和历史极值对比判断行情方向
2. 结合波动性判断,可避免虚假突破
3. 固定根K线离场,可锁定一定盈利,规避回撤

### 风险分析

1. 历史极值随市场结构变化而改变,可能出现信号失败
2. 虚假突破导致套牢
3. 离场间隔参数不当,可能丢失更大盈利或增加亏损

### 优化方向

1. 极值参数可通过行情统计学优化
2. 可加入波动率指标评估真实突破概率
3. 可通过策略回测结果优化离场根数

### 总结

该策略利用突破和回归判断短期趋势,属于波动性策略。通过优化参数设置和加入波动率指标判定,可以减少虚假突破概率,提高盈利水平。同时固定根K线的快速离场机制,可锁定一定利润,有效控制风险。该策略可以作为短线操作的辅助工具,也可通过参数调整获得更长周期的操作信号。

||

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

[/trans]

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
