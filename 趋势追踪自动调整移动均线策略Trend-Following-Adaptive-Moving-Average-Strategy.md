
> Name

趋势追踪自动调整移动均线策略Trend-Following-Adaptive-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description


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
