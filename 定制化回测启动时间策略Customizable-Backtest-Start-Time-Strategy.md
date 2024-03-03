
> Name

定制化回测启动时间策略Customizable-Backtest-Start-Time-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略的目的是允许用户自定义回测的启动时间,从而实现更加灵活和定制化的回测。

## 策略原理

该策略通过使用pine脚本的time和timestamp函数来实现定制化的回测启动时间。

首先,它让用户在设置中输入自定义的回测启动年份、月份、日期、小时和分钟。然后,它使用这些输入生成一个时间戳,并将其存储在startTime变量中。

在策略的条件判断中,它新增了一个startTime条件。只有当当前的时间大于或等于 startTime时,策略才会启动。

例如:

```pine
longCondition = crossover(sma(close, 14), sma(close, 28)) 

if (longCondition and startTime) 

  strategy.entry("My Long Entry Id", strategy.long)
```

这样就可以实现定制化的回测启动时间。用户可以根据需要灵活配置回测的开始时间,而不仅仅局限于硬编码的时间。

## 优势分析

这种定制化回测启动时间的策略有以下优势:

1. 更加灵活:用户可以完全自定义回测的启动时间,不再限制在某个固定的时间点。

2. 更加真实:可以将回测的启动时间设置为策略实际运行的时间,从而使回测更加贴近真实市场情况。

3. 方便事件驱动回测:可以根据某个事件的发生时间来设置启动时间,以针对特定事件进行回测。

4. 便于条件调整:可以非常方便地调整回测的启动条件,从而针对不同阶段进行有针对性的回测。

5. 可重复可靠:使回测的启动时间参数化,可以重复运行获得可靠的回测结果。

## 风险分析

使用定制化回测启动时间也存在一些风险:

1. 回测结果依赖启动时间:不同的启动时间可能会导致回测结果出现很大差异。

2. 需要谨慎选择启动时间:不合理的启动时间可能会造成回测失真,无法反映真实情况。

3. 增加曲线拟合风险:容易通过调整启动时间来拟合历史数据,从而产生过拟合风险。

4. 降低回测结果可比性:该策略的回测结果与固定启动时间的回测结果不太具备可比性。

对应解决方法:

1. 多次回测,评估启动时间变化对结果的影响。

2. 选择重大事件发生时间作为启动时间,缩小回测失真。

3. 谨慎调整启动时间,避免过度拟合历史数据。 

4. 保存固定启动时间的回测作为基准,与定制回测进行对比。

## 优化方向

该定制化回测启动时间策略还可以从以下方面进行优化:

1. 支持启动和结束时间定制化,实现完整的回测时间窗口灵活配置。

2. 支持多种时间模式:具体日期,相对日期,事件驱动等,使回测时间配置更智能方便。

3. 支持图形化配置界面,使时间参数设置更加直观。

4. 支持不同时间粒度配置:年、月、日、时、分、秒等。

5. 记录回测时间配置,使得回测结果可复现、可追踪和可比。

6. 增加时间配置不当的校验,避免不合理的时间配置影响回测质量。

7. 提供启动时间绑定功能,一键同步复制启动时间到多个策略中。

## 总结

本策略实现了自定义和灵活的回测启动时间配置,可以减少回测的限制,使之更贴近实盘情况。但也需要警惕回测结果对启动时间的依赖性,采取多次回测、事件驱动等措施减少回测失真。本策略还有很多优化的方向,将来可望实现更智能和便捷的回测时间配置。

||

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

[/trans]

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
