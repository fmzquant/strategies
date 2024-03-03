
> Name

基于超越时间框架的趋势追踪策略Supertrend-Based-Multitimeframe-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a8fb7ba490fa6f0785.png)
[trans]
## 概述

本策略的核心思想是结合多个时间框架来识别市场趋势,采用高级时间框架上的超越指标作为过滤器,在低级时间框架上发出买入和卖出信号。该策略旨在利用高时间框架提供的市场结构信息来提高交易决策的质量。

## 策略原理

该策略通过调用security函数获取高级时间框架(默认为4倍当前时间框架)的超越指标值。超越指标包括两个线:超越线和趋势线。当超越线处于趋势线之上时为看涨信号,之下时为看跌信号。

该策略将高时间框架超趋势的方向作为过滤条件,只有低时间框架超趋势的方向与高时间框架一致时,才会发出交易信号。也就是说,只有两个时间框架上的超趋势指标都发出同向信号时,本策略才会做多或做空。

这样可以避免受到低时间框架市场噪音的干扰,提高信号的可靠性。同时利用高时间框架判断市场结构,做出正确的整体判断。

## 策略优势

- 利用高时间框架提供的市场结构信息,过滤掉低时间框架的噪音,提高交易决策的质量
- 结合多个时间框架分析,使得交易信号更加可靠
- 可自定义超趋势指标的参数,优化买入卖出策略
- 内置日期范围设置,可以限制回测的时间范围

## 风险分析

- 高时间框架信号发出滞后,可能错过短线机会
- 高时间框架判断市场结构存在错误概率
- 超趋势指标本身也可能发出错误信号
- 回测时间范围限制可能忽略重要数据,影响测试结果准确性

解决方法:

- 适当调整高时间框架设置,降低信号滞后
- 结合其他指标确认高时间框架结构判断
- 优化超趋势指标参数,提高信号质量
- 逐步扩大回测时间范围,测试策略稳健性

## 策略优化方向 

该策略可以从以下几个方面进行优化:

1. 优化超趋势指标参数,寻找最佳参数组合
2. 增加其他指标进行组合,形成多因子模型
3. 测试不同的高低时间框架组合
4. 增加止损机制来控制风险
5. 结合机器学习算法动态调整超参数

通过参数优化、组合指标、改进止损以及引入机器学习等方法,可以显著提升该多时间框架趋势跟踪策略的效果。

## 总结

本策略巧妙地利用高时间框架的趋势判断来指导低时间框架的交易执行。这种多时间框架设计可以有效过滤市场噪音,识别更清晰的趋势方向。同时内置日期设置功能使回测更加灵活。总的来说,这是一个精心设计的多时间框架趋势跟踪策略,值得进一步研究与应用。

||

## Overview

The core idea of this strategy is to combine multiple timeframes to identify market trends, using the Supertrend indicator from higher timeframes as a filter and generating buy and sell signals from lower timeframes. It aims to leverage the market structure information provided by higher timeframes to improve the quality of trading decisions.

## Strategy Logic  

The strategy retrieves the Supertrend indicator values from a higher timeframe (default 4x of current timeframe) by calling the security function. The Supertrend indicator consists of two lines: the Supertrend line and the trend line. The Supertrend line above the trend line is a bullish signal, while below is a bearish signal.

The direction of the Supertrend indicator from the higher timeframe serves as a filter condition. Trading signals are only generated when the directions of the Supertrend from both timeframes align. That means signals are only triggered when both timeframes give signals in the same direction.  

This avoids interference from market noise in lower timeframes and improves signal reliability. It also allows the use of higher timeframe market structures to make correct overall judgements.

## Advantages

- Filters noise from lower timeframes using market structure info from higher tf  
- More reliable signals from combining analysis of multiple timeframes
- Customizable Supertrend parameters for strategy optimization  
- Built-in date range settings to constrain backtest period

## Risk Analysis

- Lagging signals from higher timeframe may miss short-term opportunities
- Inaccuracies in higher timeframe market structure judgements  
- Potential erroneous signals from Supertrend itself
- Backtest date constraints may omit important data and affect result accuracy

Solutions:

- Fine tune higher timeframe settings to reduce signal lag
- Add other indicators to confirm higher timeframe judgements
- Optimize Supertrend parameters to improve signal quality
- Progressively expand backtest time period to test robustness

## Optimization Directions

This strategy can be improved in several areas:

1. Optimize Supertrend parameters for best parameter combination
2. Add other indicators to create multifactor models
3. Test different high-low timeframe combinations  
4. Incorporate stop loss mechanisms to control risks
5. Utilize machine learning to dynamically adjust parameters  

Through parameter optimization, combining indicators, improving stops loss, and introducing machine learning, significant performance improvement can be achieved for this multitimeframe trend tracking strategy.


## Conclusion  

This strategy cleverly leverages higher timeframe trend judgements to guide trade execution in lower timeframes. Such multitimeframe design can effectively filter out market noise and identify clearer trend directions. The built-in date settings also make backtesting more flexible. Overall, this is a well-designed multitimeframe trend tracking strategy that merits further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|HTFMultiplier|
|v_input_2|true|SupertrendMult|
|v_input_3|4|SupertrendPd|
|v_input_4|10|Backtest from |
|v_input_5|0|Timeframe: years|months|days|
|v_input_6|0|Repaint: Yes|No - set lookahead false|No - do not use security|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-14 00:00:00
end: 2024-02-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © HeWhoMustNotBeNamed

//@version=4
strategy("Higher TF - Repainting", overlay=true, initial_capital = 100000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type = strategy.commission.percent, pyramiding = 1, commission_value = 0.01, calc_on_order_fills = true)

HTFMultiplier = input(4, minval=1, step=1)

SupertrendMult = input(1)
SupertrendPd = input(4, minval=4, step=4)

backtestBars = input(title="Backtest from ", defval=10, minval=1, maxval=30)
backtestFrom = input(title="Timeframe", defval="years", options=["days", "months", "years"])

repaintOption = input(title="Repaint", defval="Yes", options=["Yes", "No - set lookahead false", "No - do not use security"])

f_multiple_resolution(HTFMultiplier) => 
    target_Res_In_Min = timeframe.multiplier * HTFMultiplier * (
      timeframe.isseconds   ? 1. / 60. :
      timeframe.isminutes   ? 1. :
      timeframe.isdaily     ? 1440. :
      timeframe.isweekly    ? 7. * 24. * 60. :
      timeframe.ismonthly   ? 30.417 * 24. * 60. : na)

    target_Res_In_Min     <= 0.0417       ? "1S"  :
      target_Res_In_Min   <= 0.167        ? "5S"  :
      target_Res_In_Min   <= 0.376        ? "15S" :
      target_Res_In_Min   <= 0.751        ? "30S" :
      target_Res_In_Min   <= 1440         ? tostring(round(target_Res_In_Min)) :
      tostring(round(min(target_Res_In_Min / 1440, 365))) + "D"

f_getBackTestTimeFrom(backtestFrom, backtestBars)=>
    byDate = backtestFrom == "days"
    byMonth = backtestFrom == "months"
    byYear = backtestFrom == "years"
    
    date = dayofmonth(timenow)
    mth = month(timenow)
    yr = year(timenow)
    
    leapYearDaysInMonth = array.new_int(12,0)
    array.set(leapYearDaysInMonth,0,31)
    array.set(leapYearDaysInMonth,1,29)
    nonleapYearDaysInMonth = array.new_int(12,0)
    array.set(leapYearDaysInMonth,0,31)
    array.set(leapYearDaysInMonth,1,28)
    
    restMonths = array.new_int(10,0)
    array.set(leapYearDaysInMonth,0,31)
    array.set(leapYearDaysInMonth,1,30)
    array.set(leapYearDaysInMonth,2,31)
    array.set(leapYearDaysInMonth,3,30)
    array.set(leapYearDaysInMonth,4,31)
    array.set(leapYearDaysInMonth,5,31)
    array.set(leapYearDaysInMonth,6,30)
    array.set(leapYearDaysInMonth,7,31)
    array.set(leapYearDaysInMonth,8,30)
    array.set(leapYearDaysInMonth,9,31)
    
    array.concat(leapYearDaysInMonth,restMonths)
    array.concat(nonleapYearDaysInMonth,restMonths)
    isLeapYear = yr % 4 == 0 and (year%100 != 0 or year%400 == 0)
    numberOfDaysInCurrentMonth = isLeapYear ? array.get(leapYearDaysInMonth, mth-2) : array.get(nonleapYearDaysInMonth, mth-2)
    if(byDate)
        mth := (date - backtestBars) < 0 ? mth - 1 : mth
        yr := mth < 1 ? yr - 1 : yr
        mth := mth < 1 ? 1 : mth
        date := (date - backtestBars) < 0 ? numberOfDaysInCurrentMonth - backtestBars + date + 1 : date - backtestBars + 1
    if(byMonth)
        date := 1
        yr := (mth - (backtestBars%12)) < 0 ? yr - int(backtestBars/12) - 1 : yr - int(backtestBars/12)
        mth := mth - (backtestBars%12) + 1
    if(byYear)
        date := 1
        mth := 1
        yr := yr - backtestBars
    [date, mth, yr]


repaint = repaintOption == "Yes"
useSecurityLookahead = repaintOption == "No - set lookahead false"

[SupertrendRepaint, DirRepaint] = security(syminfo.tickerid, f_multiple_resolution(HTFMultiplier), supertrend(SupertrendMult, SupertrendPd), lookahead = true, gaps=true)
[SupertrendNoLookahead, DirNoLookahead] = security(syminfo.tickerid, f_multiple_resolution(HTFMultiplier), supertrend(SupertrendMult, SupertrendPd), lookahead = false, gaps=false)

[SupertrendRegular, DirRegular] = supertrend(SupertrendMult, SupertrendPd)

[date, mth, yr] = f_getBackTestTimeFrom(backtestFrom, backtestBars)
inDateRange = time >= timestamp(syminfo.timezone, yr, mth, date, 0, 0)

longCondition = repaint ? DirRepaint == -1 : useSecurityLookahead? DirNoLookahead == -1 : DirRegular == -1
shortCondition = repaint ? DirRepaint == 1 : useSecurityLookahead? DirNoLookahead == 1 : DirRegular == 1
strategy.entry("Buy", strategy.long, when=longCondition and inDateRange)
strategy.entry("Sell", strategy.short, when=shortCondition and inDateRange)

```

> Detail

https://www.fmz.com/strategy/442335

> Last Modified

2024-02-21 11:05:17
