
> Name

动态趋势突破策略Dynamic-Breakout-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b0ff308dfa19dfa989.png)
[trans]

## 概述

该策略是一个基于动态计算的趋势突破策略。它会实时跟踪股票的最高价和最低价,当价格突破最近一个周期的最高价时,会进入做多;当价格跌破最近一个周期的最低价时,会进入做空。同时,策略还会设置止损和止盈,以控制风险和确保固定的盈亏比。

## 策略原理

该策略的核心逻辑是跟踪并交易价格的趋势突破点。具体来说,策略会计算最近20天的最高价highestHigh和最低价lowestLow。当今天的收盘价超过前一天的highestHigh时,认为是一个向上趋势的突破点,这时会做多;当今天的收盘价低于前一天的lowestLow时,认为是一个向下趋势的突破点,这时会做空。

做多做空后,策略会设置1%的止损和2%的止盈。这保证了每个交易的盈亏比固定为2:1。这样可以有效控制单笔交易的风险。

## 策略优势

该策略最大的优势在于迅速抓住价格趋势的转折点,同时控制了单笔交易的风险。具体来说,主要有以下几个优势:

1. 动态计算最高价和最低价,实时跟踪价格变化趋势,可以快速捕捉到价格反转的信号。

2. 采用突破方式建仓,可以减少假信号,提高 entry 的质量。

3. 设置止盈止损、控制单笔交易盈亏比,有效控制单笔交易的风险。

4. 简单容易理解的逻辑,适合量化初学者实践。

5. 代码量少,容易进行测试和优化。

## 策略风险

该策略也存在一些风险需要注意:

1. 跟随趋势建仓,可能错过价格反转的最佳点位。

2. 设置固定的止损止盈难以适应市场的变化,可能预先止损或止盈。

3.  Strat后期没有设置层叠进场和加仓的逻辑,无法持续跟踪趋势。

4. 没有考虑大周期的趋势判断,可能与大趋势错位造成损失。

5. 没有设置资金管理模块,无法控制整体的仓位管理。

## 策略优化方向  

该策略还具有很大的优化空间,主要的优化方向包括:

1. 增加动态止损止盈设定,可以根据市场波动程度来调整止损止盈。

2. 增加基于均线方向的过滤条件,避免与大趋势打架。  

3. 增加趋势强度指标判断,确保只在趋势足够强劲时建仓。

4. 添加续单加码逻辑,跟踪趋势,使利润最大化。

5. 结合资金管理模块,可以动态调整仓位,控制整体的风险。

6. 优化参数,寻找最佳的参数组合。

## 总结

该策略整体来说是一个非常适合量化初学者学习和实践的趋势突破策略。它的优势在于简单、易于理解,同时加入了止损止盈逻辑来控制风险。但也还有很多可优化的地方,可以作为进一步学习的契机。总的来说,该策略从原理到应用都比较适合新手掌握。

|| 

## Overview  

This is a dynamic trend following breakout strategy. It tracks stock's highest and lowest price in real time. When price breaks through the highest price in recent period, it will go long. When price breaks through the lowest price in recent period, it will go short. Meanwhile, stop loss and take profit are set to control risks and ensure fixed risk reward ratio.  

## Strategy Logic  

The core logic of this strategy is to track and trade price breakout points of trends. Specifically, the strategy calculates the highest high and lowest low in recent 20 days. When today's close price breaks through yesterday's highestHigh, it is considered as an upward trend breakout signal and will go long. When today's close price breaks through yesterday's lowestLow, it is considered as a downward trend breakout signal and will go short.

After going long or short, stop loss of 1% and take profit of 2% are set. This ensures fixed risk reward ratio of 2:1 for each trade. It effectively controls the risk of single trade.

## Advantages

The biggest advantage of this strategy is quickly capturing reversal points of price trends, while controlling risks of each single trade. Main advantages are:

1. Dynamic calculation of highest and lowest price, real time tracking of price trend changes, which can quickly capture price reversal signals.

2. Taking breakout method for entries improves quality of entries.  

3. Setting stop loss and take profit to control risk reward ratio of single trade effectively manages trade risk.

4. Simple and easy to understand logic, suitable for quant beginners.  

5. Less code which is easy for testing and optimization.

## Risks  

There are also some risks of this strategy:

1. Following trends for entries may miss the best turning points of price reversal.  

2. Fixed stop loss and take profit cannot adapt to market change, may stop out or profit target prematurely.

3. No pyramiding logic for later additional entries, cannot keep following trends.

4. No consideration of big cycles, may conflict with major trend causing losses.  

5. No position sizing module, cannot control overall position management.

## Optimization Directions

There is still large room for optimization, mainly in below directions:  

1. Add dynamic stop loss and take profit based on market volatility.

2. Add trend direction filter based on moving average to avoid conflict major trends.

3. Add trend strength indicator to ensure entering on strong trends only.  

4. Add pyramiding logic to maximize profits by keep following trends.

5. Combine with position sizing module to dynamically adjust position size and control overall risk. 

6. Optimize parameters to find optimum parameter sets.

## Summary  

In summary, this strategy is suitable for quant beginners to learn and practice overall. Its advantage lies in simplicity and easy understanding, also with stop loss and take profit logic to control risk. But still has many aspects to optimize, can serve as chance for further learning. Generally speaking, this strategy is suitable to master from principle to application for beginners.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2|true|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-28 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Trend Following Breakout Strategy with 2:1 RRR", overlay=true)

// 定义前高和前低的计算
length = input(20, minval=1, title="Length")
highestHigh = highest(high, length)
lowestLow = lowest(low, length)

// 定义买入和卖出的条件
longCondition = close > highestHigh[1] // 当前收盘价高于前一期的最高价
shortCondition = close < lowestLow[1] // 当前收盘价低于前一期的最低价

// 为了确保盈亏比为2:1，我们需要定义止损和目标价
stopLoss = input(1, title="Stop Loss %") / 100
takeProfit = stopLoss * 2

// 如果满足买入条件，进入多头
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Long TP", "Long", profit=takeProfit * close, loss=stopLoss * close)

// 如果满足卖出条件，进入空头
if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Short TP", "Short", profit=takeProfit * close, loss=stopLoss * close)

// 绘图显示前高和前低
plot(highestHigh, color=color.green, title="Previous High")
plot(lowestLow, color=color.red, title="Previous Low")

```

> Detail

https://www.fmz.com/strategy/437048

> Last Modified

2023-12-29 17:32:10
