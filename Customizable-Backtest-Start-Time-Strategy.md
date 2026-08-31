
> Name

Customizable-Backtest-Start-Time-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

The purpose of this strategy is to allow users to customize the start time of backtesting for more flexible and customizable backtesting.

## Strategy Logic

This strategy uses Pine Script's time and timestamp functions to implement a customizable backtest start time. 

It first allows users to input a customized backtest start year, month, date, hour, and minute in the settings. It then uses these inputs to generate a timestamp and stores it in the startTime variable.

In the strategy's condition check, it adds a new startTime condition. The strategy will only start when the current time is greater than or equal to startTime.

For example:

```pine
longCondition = crossover(sma(close, 14), sma(close, 28))

if (longCondition and startTime)

  strategy.entry("My Long Entry Id", strategy.long) 
```

This allows implementing a customizable backtest start time. Users can flexibly configure the start time of backtesting instead of being limited to hardcoded times.

## Advantage Analysis

This customizable backtest start time strategy has the following advantages:

1. More Flexible: Users can fully customize the backtest start time instead of being limited to a fixed point in time.

2. More Realistic: The start time can be set to the actual runtime of the strategy, making the backtest more realistic.

3. Convenient for Event-driven Backtesting: The start time can be set based on the occurrence time of an event for backtesting specific events.

4. Easy Condition Adjustment: The backtest start conditions can be easily adjusted for targeted backtesting of different stages.

5. Repeatable and Reliable: Parameterizing the backtest start time allows repeatable and reliable backtest results.

## Risk Analysis

Using a customizable backtest start time also has some risks:

1. Results Depend on Start Time: Different start times may lead to very different backtest results.

2. Start Time Needs Careful Selection: Unreasonable start times may cause distortion in backtest results.

3. Increased Curve Fitting Risk: Easily overfit by adjusting the start time to historical data.

4. Reduced Comparability: The results of this strategy are less comparable to fixed start time backtests.

Solutions:

1. Backtest multiple times to evaluate the impact of start time changes on results.

2. Choose significant event times as start times to minimize distortion.

3. Carefully adjust start times to avoid overfitting historical data.

4. Keep fixed start time backtests as benchmark for comparison with customized backtests.

## Optimization Directions

This customizable backtest start time strategy can also be improved in the following aspects:

1. Support customization of both start and end times for full flexible configuration of the backtest time window.

2. Support multiple time modes: specific dates, relative dates, event-driven, etc. for smarter and more convenient time configuration.

3. Support graphical configuration interface for more intuitive time parameter setting. 

4. Support configuration of different time granularities: year, month, day, hour, minute, second, etc.

5. Record backtest time configuration for reproducible, traceable, and comparable results.

6. Add validation of improper time configurations to avoid low-quality backtests due to unreasonable time settings.

7. Provide start time binding to easily synchronize start times across multiple strategies.

## Summary

This strategy enables customizable and flexible configuration of backtest start times to reduce limitations and make backtests more realistic. But the dependency of results on start times needs to be watched out for using multiple backtests, event-driven models, etc. to reduce distortion. This strategy also has many directions for improvement to achieve smarter and more convenient backtest time configuration in the future.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|Start Year|
|v_input_2|true|Start Month|
|v_input_3|true|Start Day|
|v_input_4|false|Start Hour|
|v_input_5|false|Start Minute|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-19 00:00:00
end: 2023-09-25 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("C320up Strategy Tester Start Time", overlay = true)
// Copy and paste below into your strategy
// Strategy Tester Start Time
xYear = input(2018, title = "Start Year")
xMonth = input(01, title = "Start Month", minval = 01, maxval = 12)
xDay = input(01, title = "Start Day", minval = 01, maxval = 31)
xHour = input(00, title = "Start Hour", minval = 00, maxval = 23)
xMinute = input(00, title = "Start Minute", minval = 00, maxval = 59)
startTime = time >= timestamp(xYear, xMonth, xDay, xHour, xMinute)
// End copy and paste
// Add (and startTime) at the end of your condition/s to activate

// The strategy below is just an example
longCondition = crossover(sma(close, 14), sma(close, 28))
if (longCondition and startTime)
    strategy.entry("My Long Entry Id", strategy.long)
shortCondition = crossunder(sma(close, 14), sma(close, 28))
if (shortCondition and startTime)
    strategy.entry("My Short Entry Id", strategy.short)
// Happy trading!

```

> Detail

https://www.fmz.com/strategy/427932

> Last Modified

2023-09-26 20:53:15
