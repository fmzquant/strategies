
> Name

定时下单策略Timed-Order-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

定时下单策略的主要思想是在用户自定义的时间点进行买入和卖出操作。该策略允许用户设置一个精确的时间点,在该时间点会先卖出当前持有头寸,然后按比当前价格低1%的价格进行限价买入。这样可以实现每天在特定时间定期进行重新调仓。

## 策略原理

该策略首先通过input函数获取用户自定义的小时和分钟,然后使用timestamp函数生成订单执行时间。如果当前时间在指定时间点之后,则触发卖出和买入操作。

具体来说,策略首先判断当前时间是否在用户指定的起始和结束日期范围内。如果满足,则在达到指定订单执行时间点时,会先市价卖出当前持有头寸,然后按照当前价格的99%进行限价买入。这样就实现了在特定时间点按比当前价格低1%的价格进行重新调仓。

## 优势分析

该策略最大的优势在于可以定期在特定时间点重新调整仓位,不需要人工操作,降低人为成本。另外,每次重新调仓时以比当前价格略低的价格进行买入,可以获得一定的超低买入优势。

具体优势包括:

1. 完全自动化操作,降低人工成本。

2. 可以定期在特定时间点重新调整仓位。

3. 每次重新调仓时可以获得略低于当前价格1%的超低买入机会。

4. 可自定义调仓时间点,灵活调整。

5. 可自定义调仓周期的起始和结束日期,方便回测优化。

## 风险分析

该策略也存在一些风险需要注意:

1. 如果定期调仓的时间点选择不当,可能会错过较好的买入时机或者在不适当时点卖出。

2. 买入价格仅低于卖出价格1%,可能无法在每个调仓周期获得足够的超低买入价差。

3. 卖出和买入都为市价单,可能会受到一定程度的滑点影响。

4. 若策略仅在特定时间点操作,则在该时间点之间无法对市场进行管理。

5. 频繁调仓会产生较多交易费用。

对应解决方法:

1. 选择适当的调仓时间点,同时结合其他技术指标判断。

2. 可酌情增加买入价差参数。

3. 尽量选择深度较好、波动较小的交易品种。

4. 可配合其他策略在非调仓时间段进行风险管理。 

5. 适当控制调仓频率,平衡调仓优势和交易费用。

## 优化方向

该策略可以从以下几个方向进行优化:

1. 优化调仓时间点选择,结合交易品种的日内周期特点选择最优时间点。

2. 增加其他技术指标判断,避免在不利时点调仓。例如结合移动平均线等趋势判断指标。

3. 优化超低买入参数,平衡获得优势和交易成本。

4. 采用跟踪止损止盈,在调仓间隙对仓位进行管理。

5. 结合机器学习算法对历史数据进行训练,自动优化调仓时间点。

6. 增加复权功能,跟随股票split、股利等时间点调整调仓点。

## 总结

整体来看,定时下单策略通过定期调整仓位可以自动化交易过程,降低人工操作成本。策略优化空间较大,可从调仓时点选择、买入参数设定、止损止盈以及算法优化等方面进行提升。同时也需要注意一定的交易风险,采取适当的风险管理措施。总体而言,该策略适合追求高效自动化调仓的量化交易者。

||

## Overview

The main idea of the timed order strategy is to conduct buying and selling operations at user-defined time points. This strategy allows users to set an exact time point. At this time point, it will first sell the current position, and then place a limit buy order at 1% below the current price. This allows periodic rebalancing to be carried out at a specific time every day.

## Strategy Logic

The strategy first uses the input function to get the custom hour and minute defined by the user, and then generates the order execution time using the timestamp function. If the current time is after the specified time point, the selling and buying operations are triggered. 

Specifically, the strategy first checks if the current time is within the user-defined start and end date range. If yes, when the specified order execution time point is reached, it will first sell the current position at market price, and then place a limit buy order at 99% of the current price. This achieves rebalancing at a price 1% lower than the current price at the specific time point.

## Advantage Analysis

The biggest advantage of this strategy is that it can periodically rebalance positions at specific time points without manual intervention, reducing labor costs. In addition, each rebalancing buys at a slightly lower price than the current price, gaining some ultra-low buying advantage.

The specific advantages include:

1. Fully automated operation, reducing manual costs. 

2. Allows periodic rebalancing of positions at specific time points.

3. Gains ultra-low buying opportunities around 1% below current prices during each rebalancing. 

4. Customizable rebalancing time points, flexible adjustment.

5. Customizable start and end dates for rebalancing cycles, convenient for backtesting optimization.

## Risk Analysis

The strategy also has some risks to note:

1. If the periodic rebalancing time point is poorly chosen, it may miss better buying opportunities or sell out at inappropriate times.

2. The buy price is only 1% lower than the sell price, may not gain sufficient ultra-low buy price spread in each rebalancing cycle.

3. Both sell and buy are market orders, may suffer from some degree of slippage. 

4. If the strategy only operates at specific time points, the market cannot be managed between those time points.

5. Frequent rebalancing will incur relatively higher trading fees.

The corresponding solutions:

1. Choose appropriate rebalancing time points, also combine with other technical indicators.

2. Increase the buy price spread parameter as appropriate.

3. Choose products with good depth and low volatility. 

4. Combine with other strategies for risk management during non-rebalancing periods.

5. Control rebalancing frequency appropriately to balance advantages and trading costs.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize rebalancing time point selection based on the intraday cycle characteristics of the trading products.

2. Add other technical indicators to avoid rebalancing at unfavorable times. For example, combining moving average trend indicators.

3. Optimize the ultra-low buy parameter to balance advantage and trading cost. 

4. Adopt trailing stop loss/take profit to manage positions between rebalancings. 

5. Use machine learning algorithms to train on historical data and automatically optimize rebalancing time points.

6. Add adjustments around stock splits, dividends etc. to follow timing changes.

## Summary  

In general, the timed order strategy can automate the trading process and reduce manual operation costs through periodic rebalancing. There is large room for optimization in areas like rebalancing time point selection, buy parameter setting, stop loss/take profit, and algorithm improvement. Also need to note certain trading risks and take appropriate risk management measures. Overall, this strategy suits quantitative traders looking for efficient automated rebalancing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Hour for Order Execution|
|v_input_2|false|Minute for Order Execution|
|v_input_3|10|Start Day|
|v_input_4|2|Start Month|
|v_input_5|2021|Start Year|
|v_input_6|22|End Day|
|v_input_7|3|End Month|
|v_input_8|2021|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/








// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ytrevor

//@version=4
strategy("Order At Specified Time", overlay=true)


// -- These inputs are for customizing the times of your desired orders -- //
customHour = input(title="Hour for Order Execution", type=input.integer, defval=01, minval=00, maxval=24) //
customMinute = input(title="Minute for Order Execution", type=input.integer, defval=00, minval=00, maxval=59)
targetTime = timestamp("UTC", year, month, dayofmonth, customHour, customMinute, 00) //Order executes at this time

inDateRange = (time >= targetTime) and (time <= targetTime) //Orders are placed everyday at 01:00 UTC, or any other time specified via input


// -- These inputs are for back testing. Feel free to change the start and end dates via input -- // 
startDay = input(title="Start Day", type=input.integer, defval=10, minval=1, maxval=31) 
startMonth = input(title="Start Month", type=input.integer, defval=2, minval=1, maxval=12)
startYear = input(title="Start Year", type=input.integer, defval=2021)
endDay = input(title="End Day", type=input.integer, defval=22, minval=1, maxval=31)
endMonth = input(title="End Month", type=input.integer, defval=3, minval=1, maxval=12)
endYear = input(title="End Year", type=input.integer, defval=2021)

betweenDates = true


// -- Order execution --  //
if betweenDates
    buyPrice = close*0.99 //Buy at 1% lower than selling price
    strategy.entry("Sell", strategy.short, when=inDateRange) //Sell at 01:00 UTC, or at any other time specified via input
    strategy.entry("Buy", strategy.long, limit=buyPrice, when=inDateRange) //Buy limit order placed at the same time, 1% lower than selling price



```

> Detail

https://www.fmz.com/strategy/428087

> Last Modified

2023-09-28 15:26:20
