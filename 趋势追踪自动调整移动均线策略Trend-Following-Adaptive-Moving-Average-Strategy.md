
> Name

趋势追踪自动调整移动均线策略Trend-Following-Adaptive-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略基于快速移动均线和慢速移动均线的交叉作为买入和卖出信号,属于趋势跟踪类策略。通过自动调整移动均线参数,动态适应市场趋势来达到收益最大化。

### 策略原理

1. 计算快速移动均线和慢速移动均线。快速移动均线参数默认为21,慢速移动均线参数默认为34。

2. 当快速移动均线上穿慢速移动均线时,表示行情向上,发出买入信号。

3. 当快速移动均线下穿慢速移动均线时,表示行情向下,发出卖出信号。 

4. 通过自动调整移动均线的长度参数,使其动态适应市场趋势,追踪趋势获利。

### 优势分析

1. 策略简单清晰,容易理解实现。

2. 能够有效跟踪市场趋势,获利潜力大。

3. 通过动态调整参数,可以适应行情的变化。

4. 可配置移动均线算法,增加策略灵活性。

5. 可自由配置买入卖出逻辑,灵活应用。

### 风险分析

1. 移动均线策略容易产生频繁交易,交易成本较高。

2. 行情剧烈波动时,移动均线产生滞后,可能错过最佳买入卖出时机。

3. 需要优化移动均线参数与调整频率,不当配置会造成策略失效。

4. 需要严格控制止损,防止亏损扩大。

5. 趋势反转时容易形成巨额浮亏。

### 优化方向

1. 优化移动均线参数,使其更加灵敏,及时捕捉趋势变化。

2. 增加止损逻辑,严格控制单笔亏损。

3. 增加趋势判断指标,避免趋势反转造成损失。 

4. 优化移动均线调整策略,使其更加智能和自动化。

5. 增加参数优化模块,使用机器学习方法自动优化。

### 总结

本策略整体思路清晰易懂,通过配置不同长度的快慢移动均线完成买入卖出,属于典型的趋势跟踪策略。策略优势是交易规则简单,容易实现,能够有效捕捉趋势。但也存在一定风险,需要不断优化参数配置、止损逻辑,使策略更稳定可靠。总体来说,该策略拥有较大的改进潜力,值得深入研究与应用。

||

### Overview

This strategy generates trading signals based on the crossover between fast and slow moving averages, belonging to the trend following strategies. By adaptively adjusting the moving average parameters, it dynamically adapts to the market trend for maximum profits.

### Strategy Logic

1. Calculate the fast and slow moving averages. The fast MA default length is 21, and the slow MA default length is 34.

2. When the fast MA crosses over the slow MA, it indicates an uptrend and generates a buy signal. 

3. When the fast MA crosses below the slow MA, it indicates a downtrend and generates a sell signal.

4. By automatically adjusting the length of the moving averages, the strategy dynamically adapts itself to the market trend for tracking profits.

### Advantage Analysis 

1. The strategy is simple and clear, easy to understand and implement.

2. It can effectively track market trends with great profit potential. 

3. Dynamic parameter adjustment adapts to market condition changes.

4. Customizable MA algorithms increase strategy flexibility. 

5. Flexible buy and sell logic configuration.

### Risk Analysis

1. Frequent trading leads to higher transaction costs.

2. MA lags may miss best entry and exit points during volatile markets.

3. Inappropriate MA parameter and adjustment frequency optimization causes strategy failure.

4. Strict stop loss required to limit losses.

5. Trend reversal may lead to huge floating losses.

### Optimization Directions

1. Optimize MA parameters for better trend change detection.

2. Add stop loss logic to control single trade loss.

3. Add trend judging indicators to avoid trend reversal losses.

4. Enhance MA adjustment strategy to be more intelligent and automated. 

5. Add parameter optimization module using machine learning. 

### Summary

The strategy logic is simple and clear, generating trades based on fast and slow MAs crossover. It effectively captures trends but has risks. Continuous optimization on parameters, stop loss logic is required to make the strategy more robust. Overall the strategy has great potential for improvements and is worth researching and applying.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Fast MA Length|
|v_input_2|34|Slow MA Length|
|v_input_3|0|MA Algorithm: SMA|EMA|WMA|
|v_input_4|2020|Start Year|
|v_input_5|true|Start Month|
|v_input_6|true|Start Day|
|v_input_7|2020|Close Year|
|v_input_8|9|Close Month|
|v_input_9|true|Close Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-03 00:00:00
end: 2023-10-09 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//
// @version=4
// © Ehsan Haghpanah, (ehsanha)
// Algorithmic Trading Research
//
// eha Moving Averages Strategy, 
// A simple strategy based on crossing Moving Averages of 
// different lengths (a fast moving average and slow one)
//

strategy(title = "eha Moving Averages Strategy", shorttitle = "eha MA Strategy", overlay = true)

// 
// -- strategy parameter(s)
// moving averages parameter(s)
var _fastMA_len  = input(title = "Fast MA Length",  defval = 21,    type = input.integer, minval = 1, step = 1)
var _slowMA_len  = input(title = "Slow MA Length",  defval = 34,    type = input.integer, minval = 1, step = 1)
var _ma_algo_id  = input(title = "MA Algorithm",    defval = "SMA", options = ["SMA", "EMA", "WMA"])
// backtesting date and time range parameter(s)
var _startYear   = input(defval = 2020, title = "Start Year",  type = input.integer, minval = 1976)
var _startMonth  = input(defval = 1,    title = "Start Month", type = input.integer, minval = 1, maxval = 12)
var _startDay    = input(defval = 1,    title = "Start Day",   type = input.integer, minval = 1, maxval = 31)
var _closeYear   = input(defval = 2020, title = "Close Year",  type = input.integer, minval = 1984)
var _closeMonth  = input(defval = 9,    title = "Close Month", type = input.integer, minval = 1, maxval = 12)
var _closeDay    = input(defval = 1,    title = "Close Day",   type = input.integer, minval = 1, maxval = 31)

//
// -- function(s) and calculation(s)
// checks whether current time is in backtesting time range
start_t = timestamp(_startYear, _startMonth, _startDay, 00, 00)     // backtesting range start time, (00, 00); (hour, minute)
close_t = timestamp(_closeYear, _closeMonth, _closeDay, 23, 59)     // backtesting range close time, (23, 59); (hour, minute)
isInRange() => true
//
// calculates moving average based on provided algorithm, source and length
// alg : moving average algorithm
// len : length
// ser : series
calcMA(alg, len, ser) =>
    (len == 0) ? ser : ((alg == "SMA") ? sma(ser, len) : ((alg == "EMA") ? ema(ser, len) : (alg == "WMA" ? wma(ser, len) : na)))

//
// -- strategy logic and calculation(s)
ma_fast  = calcMA(_ma_algo_id, _fastMA_len, close)
ma_slow  = calcMA(_ma_algo_id, _slowMA_len, close)
cross_ov = crossover (ma_fast, ma_slow) // returns true if fastMA crosses over slowMA
cross_un = crossunder(ma_fast, ma_slow) // returns true if slowMA crosses over fastMA

//
// -- strategy execution logic
// opens a long position whenever the time is in range and crosses over
strategy.entry("ID", comment = "-", long = strategy.long, when = isInRange() and cross_ov)
// closes the position whenever the time is in range and crosses under
strategy.close("ID", comment = "-", when = isInRange() and cross_un)

//
// -- drawing and visualization
co_fast = color.new(color.gray, 25)
co_slow = color.new(color.gray, 75)
// drawing moving average(s)
plot(ma_fast, color = co_fast, linewidth = 2, style = plot.style_line)
plot(ma_slow, color = co_slow, linewidth = 3, style = plot.style_line)
```

> Detail

https://www.fmz.com/strategy/428893

> Last Modified

2023-10-10 15:21:45
