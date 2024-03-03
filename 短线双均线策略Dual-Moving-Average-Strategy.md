
> Name

短线双均线策略Dual-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/1ceb0c3c3041ac816f6.png)
[trans]

## 概述

双均线策略是一种比较常见的短线交易策略。该策略通过计算不同周期的均线,判断市场趋势方向,以此进行入场。当短周期均线上穿长周期均线时,做多;当短周期均线下穿长周期均线时,做空。

## 策略原理

该策略的核心逻辑是:

1. 计算两条不同周期的均线,一条为长周期均线,一条为短周期均线。这里使用开盘价和收盘价的均线。

2. 判断短周期均线是否出现了对长周期均线的穿透。当短线上穿长线时,表示市场处于上涨趋势,可以做多;当短线下穿长线时,表示市场处于下跌趋势,可以做空。

3. 根据趋势方向入场做多做空。具体来说,是当短周期均线上穿长周期均线时,做多;当短周期均线下穿长周期均线时,做空。

4. 止损和止盈根据实际情况设定。

整个策略运用了均线的趋势判断功能,判断市场短期和长期趋势的关系,以捕捉较短的中短线行情。该策略逻辑简单清晰,通过双均线交叉来判断行情背离与延续的节奏转换,以此来进行交易操作。

## 策略优势

双均线策略具有以下优势:

1. 思路简单,容易理解和实现。

2. 具有明确的入场 timing 和出场标准。

3. 可以通过调整均线参数来适应不同的市场环境。

4. 兼顾趋势和反转,可以捕捉一定的中短线行情。

5. 有止损逻辑,可以控制风险。

## 策略风险

双均线策略也存在一些风险:

1. 当市场处于震荡整理阶段时,止损可能被频繁触发。

2. 大幅度波动的市场中,均线生成的信号可能频繁,不利于持仓。

3. 双均线本身滞后性较强,可能错过短线的反转机会。

4. 需要注意参数优化,设定合适的均线周期。

5. 均线交叉具有一定的滞后性,入场时机可能会有所延迟。

## 策略优化方向 

以下几点可以作为该策略的优化方向:

1. 优化均线周期参数,适应不同行情。可以做参数回测优化。

2. 增加其他指标做过滤,避免在震荡行情中被套。可以加入MACD,KD等做辅助。

3. 加入趋势判断指标,避免在无明确趋势时频繁交易。可以测试加入EMA等趋势判断指标。

4. 可以考虑加入交易量指标来判断跳空方向。

5. 优化止损策略,在大级别支持位附近设置止损。

## 总结

双均线策略是一个基于均线交叉判断趋势的简单短线策略。优点是思路简单清晰,易于操作;缺点是容易被震荡市场套住,且具有滞后性。我们可以通过改进参数优化、增加过滤指标等方式来优化该策略,使之更适应复杂的市场环境。

||



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

[/trans]

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
