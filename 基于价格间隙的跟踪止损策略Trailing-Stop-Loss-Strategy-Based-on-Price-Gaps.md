
> Name

基于价格间隙的跟踪止损策略Trailing-Stop-Loss-Strategy-Based-on-Price-Gaps

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19d786e4e5ea7170dfd.png)
[trans]

## 概述

该策略采用价格间隙原理,在突破低点时买入,设置止损单和止盈单,以跟踪最低价止损,实现盈利。

## 策略原理

当价格跌破最近N小时内的最低点时定位间隙,按照设置的百分比进入做多,同时设置止损和止盈单。之后会根据行情移动止损线和止盈线。具体逻辑如下:

1. 计算N小时内的最低点作为绑定价格
2. 实时价低于绑定价格乘以买入设置百分比时做多入场
3. 设置止盈单为入场价格乘以卖出设置百分比 
4. 设置止损单为入场价格减去入场价格乘以止损百分比
5. 多单数量为策略权益的百分比
6. 跟踪最低价移动止损线
7. 止盈或止损平仓

## 策略优势分析

该策略具有以下优势:

1. 采用价格间隙思想,在突破低点时入场,提高胜率
2. 自动跟踪止损,可以锁住大部分利润
3. 可配置止盈止损百分比,适应不同市场
4. 适用于具有明显回转特征的品种
5. 操作简单,容易实施

## 策略风险分析

该策略也存在一些风险:

1. 间隙突破不一定成功,可能再次下探
2. 止损或止盈设置不当可能造成过早止损或止盈失去更大行情
3. 需要定期优化参数以适应市场变化
4. 适用品种有限,对某些品种可能效果不佳
5. 存在一定的人工干预需求

## 策略优化方向

该策略还可以从以下方面进行优化:

1. 增加机器学习算法,实现参数的自动优化
2. 增加更多止损止盈方式,如移动止损、挂单止损等
3. 优化止损止盈逻辑,实现更智能更顺畅的止损止盈
4. 结合更多指标判断信号可靠性,过滤误信号
5. 扩大适用更多品种,提高策略通用性

## 总结

本策略整体而言是一个基于价格间隙思想的简单有效的跟踪止损策略。它减少了误入场的概率,能够有效锁住利润,在参数优化与过滤方面还有很大优化空间,值得进一步研究与改进。
||

## Overview

This strategy adopts the price gap principle to go long when price breaks recent lows, with stop loss and take profit orders to trail the lowest price for profit taking.

## Strategy Logic

It identifies gaps when price breaks below the lowest price in recent N hours, goes long based on configured percentage, with stop loss and take profit orders. Stop loss line and take profit line move according to price action. The logic is:  

1. Calculate lowest price in recent N hours as binding price
2. Go long when realtime price is below binding price * buy percent 
3. Set take profit based on entry price * sell percent
4. Set stop loss based on entry price - entry price * stop loss percent
5. Position size is percent of strategy equity
6. Trail stop loss line with lowest price  
7. Close position when take profit or stop loss is triggered

## Advantage Analysis

The advantages of this strategy:

1. Utilize price gap concept, improve winning rate
2. Automatic trailing stop loss to lock in most profits
3. Customizable stop loss and take profit percentage for different markets
4. Works well for instruments with obvious rebounds  
5. Simple logic and easy to implement

## Risk Analysis  

There are also some risks:

1. Breakout of gaps may fail with lower lows
2. Improper stop loss or take profit settings may cause premature exit  
3. Require periodic parameter tuning for market changes
4. Limited applicable instruments, may not work for some
5. Manual intervention needed from time to time

## Optimization Directions

The strategy can be improved in the following aspects:

1. Add machine learning models for automatic parameter tuning
2. Add more types of stop loss/take profit, e.g. trailing stop loss, bracket orders
3. Optimize stop loss/take profit logic for smarter exits  
4. Incorporate more indicators to filter out false signals
5. Expand to more instruments to improve universality

## Conclusion

In conclusion, this is a simple and effective trailing stop loss strategy based on price gaps. It reduces false entries and locks in profits effectively. There is still much room for improvements in parameters tuning and signal filtering. It is worth further research and refinement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|(?Squeeze Settings)Buy, %|
|v_input_2|true|Sell, %|
|v_input_3|true|Stop Loss, %|
|v_input_4|true|Max Bars To Sell|
|v_input_5|2|maxBars|
|v_input_6_close|0|Bind: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|true|(?Backtesting Period)Fixed Range|
|v_input_8|0|rangeStart: 1 Week|12 Hours|24 Hours|48 Hours|6 Hours|2 Weeks|1 Month|Maximum|
|v_input_9|timestamp(01 Aug 2021 00:00 +0000)|Backtesting Start|
|v_input_10|timestamp(01 Aug 2022 00:00 +0000)|Backtesting End|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy(title="Squeeze Backtest by Shaqi v1.0", overlay=true, pyramiding=0, currency="USD", process_orders_on_close=true, commission_type=strategy.commission.percent, commission_value=0.075, default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=100, backtest_fill_limits_assumption=0)
strategy.risk.allow_entry_in(strategy.direction.long)

R0 = "6 Hours"
R1 = "12 Hours"
R2 = "24 Hours"
R3 = "48 Hours"
R4 = "1 Week"
R5 = "2 Weeks"
R6 = "1 Month"
R7 = "Maximum"


buyPercent = input( title="Buy, %",         type=input.float,   defval=3,       minval=0.01,                        step=0.01,  inline="Percents",  group="Squeeze Settings") * 0.01
sellPercent = input(title="Sell, %",        type=input.float,   defval=1,       minval=0.01,                        step=0.01,  inline="Percents",  group="Squeeze Settings") * 0.01
stopPercent = input(title="Stop Loss, %",   type=input.float,   defval=1,       minval=0.01,        maxval=100,     step=0.01,  inline="Percents",  group="Squeeze Settings") * 0.01
isMaxBars = input(  title="Max Bars To Sell",               type=input.bool,    defval=true ,                                   inline="MaxBars",   group="Squeeze Settings")
maxBars = input(    title="",       type=input.integer, defval=2,     minval=0,           maxval=1000, step=1,                  inline="MaxBars",   group="Squeeze Settings")
bind = input(       title="Bind",           type=input.source,  defval=close,                                                                       group="Squeeze Settings")
isRange = input(    title="Fixed Range",               type=input.bool,    defval=true,                                         inline="Range",     group="Backtesting Period")
rangeStart = input( title="",                       defval=R4,      options=[R0, R1, R2, R3, R4, R5, R6, R7],                   inline="Range",     group="Backtesting Period")
periodStart = input(title="Backtesting Start", type=input.time,    defval=timestamp("01 Aug 2021 00:00 +0000"),                                     group="Backtesting Period")
periodEnd = input(  title="Backtesting End",   type=input.time,    defval=timestamp("01 Aug 2022 00:00 +0000"),                                     group="Backtesting Period")

int startDate = na
int endDate = na
if isRange
    if rangeStart == R0
        startDate := timenow - 21600000
        endDate := timenow
    else if rangeStart == R1
        startDate := timenow - 43200000
        endDate := timenow
    else if rangeStart == R2
        startDate := timenow - 86400000
        endDate := timenow
    else if rangeStart == R3
        startDate := timenow - 172800000
        endDate := timenow
    else if rangeStart == R4
        startDate := timenow - 604800000
        endDate := timenow
    else if rangeStart == R5
        startDate := timenow - 1209600000
        endDate := timenow
    else if rangeStart == R6
        startDate := timenow - 2592000000
        endDate := timenow
    else if rangeStart == R7
        startDate := time
        endDate := timenow
else 
    startDate := periodStart
    endDate := periodEnd

afterStartDate = (time >= startDate)
beforeEndDate = (time <= endDate)
notInTrade = strategy.position_size == 0
inTrade = strategy.position_size > 0

barsFromEntry = barssince(strategy.position_size[0] > strategy.position_size[1])
entry = strategy.position_size[0] > strategy.position_size[1]
entryBar = barsFromEntry == 0
notEntryBar = barsFromEntry != 0
buyLimitPrice = bind - bind * buyPercent
buyLimitFilled = low <= buyLimitPrice
sellLimitPriceEntry = buyLimitPrice * (1 + sellPercent)
sellLimitPrice = strategy.position_avg_price * (1 + sellPercent)

stopLimitPriceEntry = buyLimitPrice - buyLimitPrice * stopPercent
stopLimitPrice = strategy.position_avg_price - strategy.position_avg_price * stopPercent

if afterStartDate and beforeEndDate and notInTrade
    strategy.entry("BUY", true, limit = buyLimitPrice)
    strategy.exit("INSTANT", limit = sellLimitPriceEntry, stop = stopLimitPriceEntry)
strategy.cancel("INSTANT", when = inTrade)
if isMaxBars
    strategy.close("BUY", when = barsFromEntry >= maxBars, comment = "Don't Sell")
strategy.exit("SELL", limit = sellLimitPrice, stop = stopLimitPrice)

showStop = stopPercent <= 0.03

plot(showStop ? stopLimitPrice : na, title="Stop Loss Limit Order", style=plot.style_linebr, color=color.red, linewidth=1)
plot(sellLimitPrice, title="Take Profit Limit Order", style=plot.style_linebr, color=color.purple, linewidth=1)
plot(strategy.position_avg_price, title="Buy Order Filled Price", style=plot.style_linebr, color=color.blue, linewidth=1)
plot(buyLimitPrice, title="Trailing Buy Limit Order", style=plot.style_stepline, color=color.new(color.blue, 30), offset=1)


```

> Detail

https://www.fmz.com/strategy/433542

> Last Modified

2023-11-28 13:53:16
