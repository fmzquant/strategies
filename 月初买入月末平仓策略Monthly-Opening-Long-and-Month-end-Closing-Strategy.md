
> Name

月初买入月末平仓策略Monthly-Opening-Long-and-Month-end-Closing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12bc6cbcc85f67b693d.png)

[trans]

该策略的核心思想是每月的第一个交易日开仓做多,最后一个交易日平仓。这是一个非常简单的策略,主要用于教学演示。

### 策略原理

该策略首先定义了每月的第一个交易日(星期一)作为开仓信号,最后一个交易日(星期五)作为平仓信号。

在开仓时,如果开启了仅做多设置,则直接做多;如果允许做空,则同时开仓做多做空。

在平仓时,如果允许做空,则平掉全部头寸;如果仅做多,则仅平掉做多头寸。

为了控制风险,策略还加入了一个简单的止损设置。当价格触及止损价时,强制平仓止损。

总体来说,该策略思路非常简单直白,属于最基础的月度交易策略,适合用来教学演示。实际运用中,可根据自己需要对入场出场信号、止损方式等进行优化。

### 策略优势

1. 思路简单直白,非常适合初学者学习。

2. 采用月度持仓,操作频率低,适合追求稳定的投资者。

3. 做多做空可选,可满足不同风格的交易者。 

4. 加入止损功能,可以一定程度控制个股风险。

### 策略风险

1. 入场出场时间固定,无法根据市场状态调整,存在被套利的可能。

2. 没有加入量化指标判断,存在盲目跟踪的风险。

3. 单一股票止损容易被突破,无法有效控制 Tail Risk。

4. 仓位固定,无法根据市场情况调整仓位。

5. 成交不确定性可能导致无法完全按策略执行。

6. 简单的止损方式可能导致小止损,应采用 volatility stop 等动态止损。

### 策略优化方向

1. 可以引入量化指标判断市场状态,动态调整开仓节奏。

2. 考虑对标基准指数,判断个股相对强弱选择入场。

3. 根据市场波动率等风险指标动态调整仓位。

4. 采用动态止损,或许多层次止损。

5. 加入算法交易模块,确保交易信号可以成交。

6. 优化资金管理策略,不同市场环境调整股指期货仓位。

7. 结合机器学习判断个股质量,选择入场个股。

### 总结

该策略是一个非常基础的月初买入月末平仓策略,逻辑简单,容易理解,适合初学者学习。但实际运用时,需要对入场出场时间、止损方式、仓位管理等进行优化,才能在复杂多变的市场中持续盈利。我们要深入理解策略的优劣势,不断完善策略系统,开发出适合自己的量化交易方案。

||


This strategy's core idea is to open long position on the first trading day of each month and close position on the last trading day of the month. It is a very simple strategy, mainly for teaching demonstration.

### Strategy Logic

This strategy first defines the first trading day (Monday) of each month as the entry signal, and the last trading day (Friday) as the exit signal.

When opening position, it will long directly if only long is enabled, and it will open both long and short positions if short is allowed.

When closing positions, it will close all positions if short is allowed, and only close long positions if only long is enabled.

To control risks, a simple stop loss is also added. When price touches the stop loss price, it will close position by stop loss.

Overall, this strategy has a very simple and straightforward logic, which is the most basic monthly trading strategy suitable for teaching demonstration. In actual use, entry and exit signals, stop loss methods, etc. can be optimized according to needs.

### Advantages

1. The logic is simple and easy to understand, very suitable for beginners to learn.

2. Adopting monthly holding cycle, low operation frequency, suitable for investors pursuing stability.

3. Optional long or short, can meet the needs of different trading styles.

4. Adding stop loss can control single stock risks to some extent.

### Risks

1. Fixed entry and exit time, unable to adjust based on market conditions, risks being arbitraged.

2. No quantitative indicators added, risks of blindly following. 

3. Single stock stop loss is easy to break through, unable to effectively control tail risk.

4. Fixed position size, unable to adjust based on market conditions.

5. Uncertainty of execution, may fail to fully execute as per strategy.

6. Simple stop loss method may result in small stop loss, should adopt dynamic stop loss like volatility stop.

### Enhancement Directions

1. Introduce quantitative indicators to judge market conditions and dynamically adjust entry pace.

2. Consider benchmarking indices to determine relative strength of stocks for entry.

3. Dynamically adjust position size based on market volatility and other risk indicators.

4. Adopt dynamic stop loss, or multiple levels of stop loss.

5. Add algorithm trading module to ensure successful execution.

6. Optimize capital management strategy, adjust stock index futures position for different market environments. 

7. Incorporate machine learning to judge stock quality for entry.

### Summary

This is a very basic monthly opening long and month-end closing strategy. The logic is simple and easy to understand, suitable for beginners to learn. But in actual use, the entry/exit timing, stop loss methods, position sizing etc need to be enhanced, in order to profit persistently in the complex and ever-changing markets. We should thoroughly understand the pros and cons of the strategy, and keep improving the strategy system to develop suitable quantitative trading solutions for ourselves.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2020|From Year|
|v_input_2|true|From Month|
|v_input_3|true|Only go Long?|
|v_input_4|false|Use stoploss ?|
|v_input_5|150|Stoploss in $|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © Je_Buurman September 1st 2020

//@version=4
strategy("Buurmans Tutorial", overlay=true, initial_capital=1000, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_value=0.2)

// Some initial inputs, these are needed in case the strategy returns an error of "too many trades, > 3000" 

Year    = input(defval = 2020, title = "From Year", minval = 2010)              // 
Month   = input(defval = 1, title = "From Month", minval = 1, maxval=12)
LongOnly=input(true, title="Only go Long?")


// Phase I - the initial "Strategy" - buy Monday, sell Friday

longCondition = dayofweek==dayofweek.monday and (time > timestamp(Year, Month, 01, 00, 00, 00))
shortCondition = dayofweek==dayofweek.friday and (time > timestamp(Year, Month, 01, 23, 59, 59))


// Phase II - some rudimentary "risk-management" e.g. stoploss

Use_stoploss=input(false, title="Use stoploss ?")
stoploss_input=input(150, title="Stoploss in $")
Stoploss = Use_stoploss ? strategy.position_size>0 ? iff(strategy.position_size>0,strategy.position_avg_price - stoploss_input, na) : strategy.position_size<0 ? iff(strategy.position_size<0,strategy.position_avg_price + stoploss_input, na) : na : na
plot(Use_stoploss and strategy.position_size!=0 ? Stoploss : na, color=iff(Stoploss!=na,color.silver, color.red),style=plot.style_linebr)


// Phase III - make it more profitable by trying to filter conditions
// only buy on odd Mondays ? only buy on full moon Mondays ? something else entirely ?


// The actual trades, going Long, close Long, going Short and Stoploss

if (longCondition)
    strategy.entry("Buy on Monday", strategy.long)
    
if (shortCondition and LongOnly==false)
    strategy.entry("Short on Friday", strategy.short)

if (shortCondition and LongOnly)
    strategy.close("Buy on Monday", comment="Sell on Friday")

if (low < Stoploss)
    strategy.close("Buy on Monday", comment="Long Stopped on Someday")
if (high > Stoploss)
    strategy.close("Short on Friday", comment="Short Stopped on Someday")
```

> Detail

https://www.fmz.com/strategy/430842

> Last Modified

2023-11-02 14:23:40
