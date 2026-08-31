
> Name

Supertrend-Based-Multitimeframe-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a8fb7ba490fa6f0785.png)

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
