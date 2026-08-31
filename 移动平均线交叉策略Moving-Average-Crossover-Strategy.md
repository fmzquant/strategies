
> Name

移动平均线交叉策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This is a typical moving average crossover trading strategy. It uses the crossover points of fast and slow moving averages as trading signals. When the fast moving average crosses above the slow moving average from below, it is considered as a buy signal. When the fast moving average crosses below the slow moving average from above, it is considered as a sell signal. This strategy combines two moving averages and can effectively filter market noise and identify trends.

## Strategy Principles  

The main steps of this strategy are:

1. Set the fast moving average period fastMA and slow moving average period slowMA. 

2. Calculate the fast moving average fast and slow moving average slow based on input type Type. Type=1 is simple moving average, Type=2 is exponential moving average.

3. Set backtest time range start and finish.  

4. Define crossover function: when fast crosses above slow, generate buy signal; when fast crosses below slow, generate sell signal.

5. When crossover function is triggered, if within backtest time range, issue open long or close short order.

6. When backtest window ends or crossover function crosses below, issue close long order.

7. Plot the fast moving average fast and slow moving average slow.

This strategy uses the crossover of fast and slow moving averages to determine the trend within the holding period and generate trading signals accordingly. The backtest time window simulates real trading.

## Advantage Analysis

The advantages of this strategy:

1. Moving averages are effective in determining trends and filtering random fluctuations.

2. The combination of fast and slow moving averages can identify trend changes. 

3. The parameters of moving averages can be adjusted to adapt to different period trends.

4. Flexible choice between simple and exponential moving averages.

5. Backtest functionality allows testing and optimizing strategy parameters.

6. Simple and clear logic, easy to understand and implement.

7. Drawing moving average charts allows visual determination of trends and effects.

## Risk Analysis

Some risks of this strategy:

1. May generate false signals during range-bound periods.  

2. Moving averages have lagging effect, may miss turn points.

3. Relies solely on moving average crossover, no other indicators or filters. 

4. Does not consider trading costs.

5. No stop loss strategy.

6. Unreasonable parameter settings may affect strategy performance.

7. Improper selection of backtest time range may cause overfitting.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add other indicators like MACD, RSI to confirm signals and improve accuracy.

2. Add stop loss strategy to control single loss.

3. Optimize moving average parameters for different periods.  

4. Add position sizing based on market conditions.

5. Consider trading costs, adjust entry and exit points. 

6. Test longer timeframe to avoid overfitting.

7. Continuously optimize parameters using walks forward analysis.

## Summary

The moving average crossover strategy is a simple and practical trend following strategy. It can filter random fluctuations and identify trend directions. But it also has some problems like lagging effect, and should be combined with other indicators. Continuous optimization and testing can improve strategy performance and make it more reliable for live trading. Overall, this strategy suits investors with relatively low requirements for trend determination.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|FastMA|
|v_input_2|144|SlowMA|
|v_input_3|true|Type (1 = SMA, 2 = EMA)|
|v_input_4|false|SlowMAIsFactor|
|v_input_5|true|From Day|
|v_input_6|true|From Month|
|v_input_7|2018|From Year|
|v_input_8|true|To Day|
|v_input_9|true|To Month|
|v_input_10|2020|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-13 00:00:00
end: 2023-09-20 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy("MavCrossover v2", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

// Revision:        1
// Author:          @ToS_MavericK

// === INPUT SMA ===
fastMA  = input(defval = 13,  title = "FastMA", minval = 1, step = 1)
slowMA  = input(defval = 144,  title = "SlowMA", minval = 1, step = 1)
Type    = input(defval = 1,  title = "Type (1 = SMA, 2 = EMA)", minval = 1, maxval = 2, step = 1)
SlowMAIsFactor = input(false)

slowMA := SlowMAIsFactor == true ? round(fastMA * slowMA) : slowMA

// === INPUT BACKTEST RANGE ===
FromDay   = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
FromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
FromYear  = input(defval = 2018, title = "From Year", minval = 2012)
ToDay     = input(defval = 1, title = "To Day", minval = 1, maxval = 31)
ToMonth   = input(defval = 1, title = "To Month", minval = 1, maxval = 12)
ToYear    = input(defval = 2020, title = "To Year", minval = 2012)

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"

// === MA SETUP ===
fast = Type == 1 ? sma(close, fastMA) : ema(close, fastMA)
slow = Type == 1 ? sma(close, slowMA) : ema(close, slowMA)

// === EXECUTION ===
strategy.entry("L", strategy.long, when = crossover(fast, slow) and window())   // buy long when "within window of time" AND crossover
strategy.close("L", when = crossunder(fast, slow) or time > finish)             // sell long when window ends OR crossunder         

plot(fast, title = 'FastMA', color = yellow, linewidth = 2, style = line)  // plot FastMA
plot(slow, title = 'SlowMA', color = aqua, linewidth = 2, style = line)    // plot SlowMA
```

> Detail

https://www.fmz.com/strategy/427436

> Last Modified

2023-09-21 10:28:27
