
> Name

Dual-Moving-Average-Strategy-430856

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/1ceb0c3c3041ac816f6.png)



## Overview

The dual moving average strategy is a commonly used short-term trading strategy. It judges the market trend direction by calculating moving averages of different periods and uses that to enter trades. When the short period moving average crosses above the long period moving average, go long. When the short period moving average crosses below the long period moving average, go short.

## Strategy Logic

The core logic of this strategy is:

1. Calculate two moving averages of different periods, one is the long period MA, the other is the short period MA. Here the opening price and closing price MAs are used.

2. Judge if the short period MA has crossed over the long period MA. When the short MA crosses above the long MA, it indicates an upward trend in the market and we can go long. When the short MA crosses below the long MA, it indicates a downward trend and we can go short.

3. Enter trades according to the trend direction. Specifically, when the short period MA crosses above the long period MA, go long. When the short period MA crosses below the long period MA, go short. 

4. Set stop loss and take profit based on actual market conditions.

The strategy utilizes the trend judging capability of MAs to determine the relationship between short-term and long-term trends, in order to capture shorter-term moves. The logic is simple and clear, using MA crosses to judge rhythm shifts between trend continuation and reversal, and trade based on that.

## Advantages

The dual MA strategy has the following advantages:

1. The logic is simple and easy to understand and implement.

2. It has clear entry and exit criteria.

3. The MA periods can be adjusted to adapt to different market environments. 

4. It captures both trend and mean-reversion, allowing it to profit from medium-term moves.

5. There is a stop loss logic to control risks.

## Risks

There are also some risks with the dual MA strategy:

1. Stop loss can be triggered frequently during range-bound markets.

2. MA signals may be too frequent during volatile markets, making it hard to hold positions.

3. MAs themselves have lag and may miss short-term reversal opportunities. 

4. MA periods need to be optimized for the strategy to work.

5. MA crosses have some lag, causing delayed entries.

## Improvement Directions

Some ways to improve this strategy:

1. Optimize the MA periods for different market conditions through backtesting.

2. Add other indicators as filters to avoid whipsaws in ranging markets. MACD, KD can be considered.

3. Add trend strength indicators to avoid trading when there is no clear trend. Testing EMA and similar indicators.  

4. Consider volume indicators to judge the gap direction.

5. Optimize stop loss near major support/resistance levels.

## Summary

The dual MA strategy is a simple short-term strategy based on MA crosses to determine trend. Pros are its simplicity and ease of use. Cons are that it can be whipsawed by ranging markets and has lags. We can optimize it by parameter tuning, adding filters etc to make it more robust for complex market environments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|370|tim|
|v_input_2|2017|Backtest Start Year|
|v_input_3|10|Backtest Start Month|
|v_input_4|25|Backtest Start Day|
|v_input_5|7|Backtest Start Hour|
|v_input_6|2017|Backtest Stop Year|
|v_input_7|10|Backtest Stop Month|
|v_input_8|30|Backtest Stop Day|
|v_input_9|13|Backtest stop Hour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("GetTrendStrategy timing", overlay=true)
tim=input('370')
 
//////////////////////////////////////////////////////////////////////
// Component Code Start
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(10, "Backtest Start Month")
testStartDay = input(25, "Backtest Start Day")
testStartHour = input(7, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,0)
testStopYear = input(2017, "Backtest Stop Year")
testStopMonth = input(10, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testStopHour = input(13, "Backtest stop Hour")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,testStartHour,0)
 
testPeriod() => true
// Component Code Stop
//////////////////////////////////////////////////////////////////////
 
 
out1 = request.security(syminfo.tickerid, tim, open)
out2 = request.security(syminfo.tickerid, tim, close)
plot(out1,color=red)
plot(out2,color=green)
longCondition = crossover(request.security(syminfo.tickerid, tim, close),request.security(syminfo.tickerid, tim, open))
 
if testPeriod()
    if (longCondition)
        strategy.entry("long", strategy.long)
shortCondition = crossunder(request.security(syminfo.tickerid, tim, close),request.security(syminfo.tickerid, tim, open))
 
if testPeriod()
    if (shortCondition)
        strategy.entry("short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/430856

> Last Modified

2023-11-02 15:10:04
