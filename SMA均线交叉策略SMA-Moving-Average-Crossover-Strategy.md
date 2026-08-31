
> Name

SMA均线交叉策略SMA-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5f12ece77c6bf08525.png)


### Overview
This strategy is a simple SMA moving average crossover strategy. It uses two Simple Moving Averages (SMAs) with different lengths. When the fast MA crosses above the slow MA, it enters a long position. When the fast MA crosses below the slow MA, it closes the long position. The lengths of the two MAs can be customized, as well as the start and end dates for backtesting.

The main idea of this strategy is to utilize the trend characteristics of moving averages and the signal characteristics of MA crossovers for trading. When the fast MA is above the slow MA, it indicates an upward trend and a long position should be held. When the fast MA is below the slow MA, it indicates a downward trend and no position should be held.

### Strategy Principle
1. Calculate two SMAs with different lengths, which can be customized.
2. Check if the current time is within the backtesting window. If not, do nothing.
3. If the fast MA crosses above the slow MA, enter a long position.
4. If the fast MA crosses below the slow MA, close all long positions.
5. In other cases, stay flat and do nothing.

### Advantage Analysis
1. Simple and easy to understand, with clear logic, suitable for beginners to learn and use.
2. Moving average is a widely used technical indicator, with obvious trend characteristics, which can well reflect the current market trend.
3. MA crossover is a classic trend-following signal that can quickly capture changes in trends.
4. The lengths of MAs and the backtesting window can be customized, providing good flexibility.
5. Suitable for instruments and timeframes with strong trending characteristics.

### Risk Analysis
1. Moving averages have a certain lag. When the market fluctuates greatly and the trend reverses frequently, there may be frequent crossover signals, resulting in excessive trading and increased transaction costs.
2. This strategy can only capture upward trends, and is powerless in range-bound markets and downward trends.
3. The selection of MA parameters needs to be optimized for different instruments and timeframes. Different parameters may have large differences in performance.
4. This strategy does not have any stop-loss measures, and may face greater drawdown risks when the market fluctuates dramatically.

### Optimization Directions
1. Consider adding appropriate stop-loss measures, such as ATR-based trailing stop, to control the maximum loss of a single trade.
2. Consider adding some filtering conditions, such as trading volume and volatility, to filter out some false signals.
3. Consider optimizing parameters, such as using genetic algorithms or other intelligent algorithms to find the optimal parameter combination.
4. Consider combining other technical indicators or trading signals with the MA crossover, such as MACD and RSI, to improve the reliability and effectiveness of the strategy.

### Conclusion
The SMA moving average crossover strategy is a simple, easy-to-understand, classic and practical trend-following strategy that is suitable for beginners to learn and use. It utilizes the trend characteristics of moving averages and the signal characteristics of MA crossovers to quickly capture changes in market trends. However, this strategy also has some limitations and risks, such as lag, frequent trading, and lack of stop-loss. Therefore, in practical applications, it needs to be appropriately optimized and improved according to specific conditions to enhance the stability and profitability of the strategy.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|From Day|
|v_input_int_2|true|From Month|
|v_input_int_3|2018|From Year|
|v_input_int_4|30|Thru Day|
|v_input_int_5|9|Thru Month|
|v_input_int_6|2024|Thru Year|
|v_input_int_7|100|Slow MA lenght|
|v_input_int_8|30|Fast MA lenght|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-22 00:00:00
end: 2024-03-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © j0secyn

//@version=5
strategy("MA Cross", overlay=true, margin_long=100, margin_short=100, default_qty_value=100, default_qty_type=strategy.percent_of_equity, initial_capital=10000)

// === INPUT BACKTEST RANGE ===
fromDay   = input.int(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input.int(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear  = input.int(defval = 2018,title = "From Year", minval = 1970)
thruDay   = input.int(defval = 30, title = "Thru Day", minval = 1, maxval = 31)
thruMonth = input.int(defval = 9, title = "Thru Month", minval = 1, maxval = 12)
thruYear  = input.int(defval = 2024, title = "Thru Year", minval = 1970)

slow_ma_length = input.int(defval = 100, title = "Slow MA lenght")
fast_ma_length = input.int(defval = 30, title = "Fast MA lenght")

// === FUNCTION EXAMPLE ===
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)            // backtest start  window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)            // backtest finish window
window()  => true

// === LOGIC ===
crossOv = ta.crossover(ta.sma(close, fast_ma_length), ta.sma(close, slow_ma_length))
crossUn = ta.crossunder(ta.sma(close, fast_ma_length), ta.sma(close, slow_ma_length))

// === EXECUTION ===
// strategy.entry("L", strategy.long, when = window() and crossOv)        // enter long when "within window of time" AND crossover
// strategy.close("L", when = window() and crossUn)                       // exits long when "within window of time" AND crossunder         
strategy.entry("L", strategy.long, when = window() and crossOv)        // enter long when "within window of time" AND crossover
strategy.close("L", when = window() and crossUn)                       // exits long when "within window of time" AND crossunder         
```

> Detail

https://www.fmz.com/strategy/446457

> Last Modified

2024-03-28 17:50:00
