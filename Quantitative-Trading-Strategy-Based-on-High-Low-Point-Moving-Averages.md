
> Name

Quantitative-Trading-Strategy-Based-on-High-Low-Point-Moving-Averages

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses simple moving averages of high points and low points compared to current close price to determine entries and exits. It aims to capture price breakout signals from moving average crossovers to obtain early trend opportunities. 

## Strategy Logic

1. Calculate 4-period simple moving average of high prices.

2. Calculate 4-period simple moving average of low prices.

3. Go long when close price breaks above high point SMA. 

4. Go short when close price breaks below low point SMA.

5. Use fixed stop loss and take profit for risk management.

## Advantage Analysis

1. Uses simple indicators, easy to understand and implement.

2. Timely captures price breakout signals from SMA crossovers. 

3. Can quickly filter out noise and identify trends.

4. Lightweight calculations reduce strategy overhead.

5. Suitable as base strategy for extensions.

## Risk Analysis

1. Requires reasonable parameters to avoid oversensitivity. 

2. Unable to handle risks from huge breakouts.

3. Possibilities of whipsaw losses in ranges.

4. Cannot automatically adjust stops and limits. 

5. Hard to judge longer-term trend context.

## Optimization Directions

1. Test different parameters for impact on signal quality.

2. Add filters to validate effectiveness of breakouts.

3. Incorporate trend analysis to avoid traps.

4. Develop dynamic stops and limits.

5. Optimize stops to improve win rate.

6. Test robustness across different timeframes.

## Summary

This strategy uses simple indicators to gauge price momentum and provides a basic trend trading framework. With further improvements like parameter optimization and risk controls, the trading logic is highly extensible into a robust quant system. Overall an easy to use strategy suitable for beginners to start quant trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|4|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2017|Backtest Stop Year|
|v_input_5|5|Backtest Stop Month|
|v_input_6|true|Backtest Stop Day|
|v_input_7|true|Color Background?|
|v_input_8|4|length|
|v_input_9|false|displace|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-13 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("HiLo", overlay=true)

// Testing a specific period
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(4, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2017, "Backtest Stop Year")
testStopMonth = input(5, "Backtest Stop Month")
testStopDay = input(1, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false


//HiLo Strategy
length = input(4, minval=0)
displace = input(0, minval=0)
highsma = sma(high, length)
lowsma = sma(low, length)

longCondition = close > highsma[displace]
if (longCondition)
    strategy.entry("long", true)

shortCondition = close < lowsma[displace]
if (shortCondition)
    strategy.entry("short", false)

// Exit seems with a problem. it keeps saying the order's limit (2000) was reached even if I back test it just for a day. 
// If the two lines bellow are commented, then it it works. Anyone? Any idea what's wrong?

// strategy.exit("exit", "long", profit=10, loss=5)
// strategy.exit("exit", "short", profit=10, loss=5)






    
```

> Detail

https://www.fmz.com/strategy/427261

> Last Modified

2023-09-19 15:53:55
