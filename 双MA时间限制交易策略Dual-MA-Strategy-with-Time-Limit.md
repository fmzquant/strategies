
> Name

双MA时间限制交易策略Dual-MA-Strategy-with-Time-Limit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12e1a2b05c2b44bf6ec.png)


## Overview

This strategy implements a time limit module based on the original dual moving average strategy to control the start time of the strategy. The time limit module can effectively manage the running time of the strategy and reduce trading risks under unfavorable market conditions.

## Principle 

The strategy generates trading signals using fast and slow MAs. The fast MA has a period of 14 days and the slow MA has a period of 21 days. A buy signal is generated when the fast MA crosses above the slow MA. A sell signal is generated when the fast MA crosses below the slow MA.

The strategy also incorporates a trade inversion option to reverse the original trade direction.

The time limit module compares the current time against the configured start time using timestamps, returning true or false to control if the strategy starts or not. The start year, month, day, hour and minute need to be set. The strategy will only start when the current time exceeds the configured start time.

## Advantages

- Dual MAs effectively capture mid- to short-term trends
- The time limit module precisely controls the strategy's running time, avoiding unnecessary trades under unfavorable market conditions
- The trade inversion option adds flexibility

## Risks and Solutions

- Dual MAs may generate excessive trading signals, increasing trading frequency and costs
- Improper time limit configuration may cause missed opportunities 
- Incorrect trade inversion may lead to wrong trade signals

Optimizing the MA periods can reduce trading frequency. The start time should also be set rationally to avoid missed chances. Finally, carefully choose whether to invert signals based on market conditions.

## Optimization Directions 

- Adding a stop loss module better controls the risk of individual trades
- Implementing a trailing stop loss that gradually moves the stop loss point can help lock in profits
- Combining signals across multiple symbols can improve signal quality and reduce false signals  
- Developing a parameter optimization module that automatically finds the optimal parameter combinations

## Summary

This strategy generates trading signals using dual MAs and controls the running time with the time limit module, effectively capturing trends while avoiding unfavorable market conditions. Further enhancements can be made through parameter tuning, stop loss modules, cross-asset signal generation, etc. to reduce trading frequency while improving the stability and profitability of each trade.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_open|0|Fast MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|14|Fast MA Period|
|v_input_3_open|0|Slow MA Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|21|Slow MA Period|
|v_input_5|false|Invert Trade Direction?|
|v_input_6|1000|Take Profit|
|v_input_7|200|Stop Loss|
|v_input_8|200|Trailing Stop Loss|
|v_input_9|false|Trailing Stop Loss Offset|
|v_input_10|true|Use Start Time Limiter?|
|v_input_11|2016|Start From Year|
|v_input_12|5|Start From Month|
|v_input_13|true|Start From Day|
|v_input_14|false|Start From Hour|
|v_input_15|false|Start From Minute|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-11-13 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2

strategy(title = "Strategy Code Example", shorttitle = "Strategy Code Example", overlay = true)

// Revision:        1
// Author:          @JayRogers
//
// *** THIS IS JUST AN EXAMPLE OF STRATEGY TIME LIMITING ***
//
//  This is a follow up to my previous strategy example for risk management, extended to include a time limiting factor.

// === GENERAL INPUTS ===
// short ma
maFastSource   = input(defval = open, title = "Fast MA Source")
maFastLength   = input(defval = 14, title = "Fast MA Period", minval = 1)
// long ma
maSlowSource   = input(defval = open, title = "Slow MA Source")
maSlowLength   = input(defval = 21, title = "Slow MA Period", minval = 1)

// === STRATEGY RELATED INPUTS ===
tradeInvert     = input(defval = false, title = "Invert Trade Direction?")
// Risk management
inpTakeProfit   = input(defval = 1000, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 200, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 200, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)
// *** FOCUS OF EXAMPLE ***
// Time limiting
// a toggle for enabling/disabling
useTimeLimit    = input(defval = true, title = "Use Start Time Limiter?")
// set up where we want to run from
startYear       = input(defval = 2016, title = "Start From Year",  minval = 0, step = 1)
startMonth      = input(defval = 05, title = "Start From Month",  minval = 0,step = 1)
startDay        = input(defval = 01, title = "Start From Day",  minval = 0,step = 1)
startHour       = input(defval = 00, title = "Start From Hour",  minval = 0,step = 1)
startMinute     = input(defval = 00, title = "Start From Minute",  minval = 0,step = 1)

// === RISK MANAGEMENT VALUE PREP ===
// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// *** FOCUS OF EXAMPLE ***
// === TIME LIMITER CHECKING FUNCTION ===
// using a multi line function to return true or false depending on our input selection
// multi line function logic must be indented.
startTimeOk() =>
    // get our input time together
    inputTime   = timestamp(syminfo.timezone, startYear, startMonth, startDay, startHour, startMinute)
    // check the current time is greater than the input time and assign true or false
    timeOk      = time > inputTime ? true : false
    // last line is the return value, we want the strategy to execute if..
    // ..we are using the limiter, and the time is ok -OR- we are not using the limiter
    r = (useTimeLimit and timeOk) or not useTimeLimit

// === SERIES SETUP ===
/// a couple of ma's..
maFast = ema(maFastSource, maFastLength)
maSlow = ema(maSlowSource, maSlowLength)

// === PLOTTING ===
fast = plot(maFast, title = "Fast MA", color = green, linewidth = 2, style = line, transp = 50)
slow = plot(maSlow, title = "Slow MA", color = red, linewidth = 2, style = line, transp = 50)

// === LOGIC ===
// is fast ma above slow ma?
aboveBelow = maFast >= maSlow ? true : false
// are we inverting our trade direction?
tradeDirection = tradeInvert ? aboveBelow ? false : true : aboveBelow ? true : false

// *** FOCUS OF EXAMPLE ***
// wrap our strategy execution in an if statement which calls the time checking function to validate entry
// like the function logic, content to be included in the if statement must be indented.
if( startTimeOk() )
    // === STRATEGY - LONG POSITION EXECUTION ===
    enterLong = not tradeDirection[1] and tradeDirection
    exitLong = tradeDirection[1] and not tradeDirection
    strategy.entry( id = "Long", long = true, when = enterLong )
    strategy.close( id = "Long", when = exitLong )
    
    // === STRATEGY - SHORT POSITION EXECUTION ===
    enterShort = tradeDirection[1] and not tradeDirection
    exitShort = not tradeDirection[1] and tradeDirection
    strategy.entry( id = "Short", long = false, when = enterShort )
    strategy.close( id = "Short", when = exitShort )
    
    // === STRATEGY RISK MANAGEMENT EXECUTION ===
    strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
    strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)

```

> Detail

https://www.fmz.com/strategy/432117

> Last Modified

2023-11-14 16:45:03
