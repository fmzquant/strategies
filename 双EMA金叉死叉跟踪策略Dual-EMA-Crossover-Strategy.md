
> Name

双EMA金叉死叉跟踪策略Dual-EMA-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e1f59adca37a458ac4.png)
[trans]


## 概述

本策略通过计算快线EMA和慢线EMA,并比较两者的大小关系,实现双EMA的金叉和死叉交易信号,属于趋势跟踪策略。当快线上穿慢线时生成买入信号,当快线下穿慢线时生成卖出信号,实现了一个简单的趋势追踪策略。

## 策略原理

该策略的核心逻辑主要包含以下几个部分:

1. 计算快线EMA和慢线EMA:通过ta.ema()函数计算长度为fastInput的快线EMA和长度为slowInput的慢线EMA。

2. 设置回测时间范围:通过useDateFilter参数设置是否过滤回测时间,backtestStartDate和backtestEndDate设置回测开始和结束时间。

3. 生成交易信号:通过ta.crossover()和ta.crossunder()函数比较快线EMA和慢线EMA的大小关系,当快线上穿慢线时生成买入信号,当快线下穿慢线时生成卖出信号。

4. 处理时间范围外的订单:在回测时间范围外会取消未成交的订单,并平掉所有头寸。

5. 绘制移动平均线:在图表上绘制出快线EMA和慢线EMA的移动平均线。

## 策略优势

这是一个非常简单的趋势跟踪策略,具有以下几点优势:

1. 策略逻辑简单,易于理解和实现。

2. EMA平滑了价格数据,可以减少噪音交易。 

3. 可自定义EMA周期参数,适应不同市场环境。

4. 可灵活设置回测时间范围,针对特定时间范围进行测试。

5. 可优化入场和出场条件,结合其他指标等使用。

## 风险分析

该策略也存在一些风险需要注意:

1. 双EMA策略较为粗放,无法灵活应对市场变化。

2. 存在频繁交易和重复交易的风险。

3. EMA参数设置不当可能导致交易信号错误。

4. 回测时间范围不合理可能导致过拟合。

5. 存在避免不了回撤和亏损的风险。

可通过参数优化、适当过滤波动、设置止损等方式来控制风险。

## 优化方向 

该策略可从以下几个方面进行优化:

1. 优化EMA周期参数,选择最佳参数组合。

2. 增加其他指标过滤,避免不必要的交易。

3. 增加止损策略,控制单笔亏损。

4. 结合趋势、波动率等过滤器,减少交易频率。 

5. 测试不同的品种合约,寻找最佳策略适用对象。

6. 使用滑点、手续费等成本控制,使回测更真实。

## 总结

本策略整体来说是一个非常简单的双EMA金叉死叉策略,逻辑清晰易懂,通过快慢线EMA比较产生交易信号。该策略优点是实现简单,但也存在一些问题如频繁交易、容易造成过优化等。下一步可从参数优化、风险控制等方面进行改进,使策略更稳健实用。

||


## Overview

This strategy generates trading signals based on the crossover and crossunder of fast and slow EMA lines, belonging to trend following strategies. It buys when the fast EMA crosses over the slow EMA, and sells when the fast EMA crosses under the slow EMA, implementing a simple trend tracking strategy.

## Strategy Logic

The core logic of this strategy mainly includes the following parts:

1. Calculate fast and slow EMAs: Use ta.ema() to calculate fast EMA of length fastInput and slow EMA of length slowInput.

2. Set backtest time range: Use useDateFilter to set whether to filter backtest time range, and use backtestStartDate and backtestEndDate to set start and end time. 

3. Generate trading signals: Use ta.crossover() and ta.crossunder() to compare fast and slow EMAs, generating buy signals when fast EMA crosses over slow EMA, and sell signals when fast EMA crosses under slow EMA.

4. Handle orders outside time range: Cancel unfilled orders outside backtest time range, and flatten all positions.

5. Plot EMA lines: Plot fast and slow EMA lines on the chart.

## Advantage Analysis  

This is a very simple trend following strategy, with the following advantages:

1. Simple logic, easy to understand and implement.

2. EMA smooths price data and reduces noise trading.

3. Customizable EMA periods, adaptable to different market environments. 

4. Flexible backtest time range for testing specific time periods.

5. Optimizable entry and exit conditions, can be combined with other indicators.

## Risk Analysis

This strategy also has some risks:

1. Dual EMA strategy is crude, unable to adapt flexibly to market changes.

2. Risk of frequent trading and repeated trading.

3. Improper EMA parameters may cause wrong trading signals. 

4. Unreasonable backtest time range may lead to overfitting. 

5. Risk of unavoidable drawdown and losses.

Risks can be managed through parameter optimization, filtering fluctuations, stop loss, etc.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Optimize EMA periods to find the best parameter combination.

2. Add other indicators for filtering unnecessary trades. 

3. Add stop loss to control single trade loss.

4. Incorporate trend, volatility filters to reduce trading frequency.

5. Test different products to find the best fit.

6. Use slippage, commission for more realistic backtest.

## Summary

In summary, this is a very simple dual EMA crossover strategy with clear logic by comparing fast and slow EMAs. The advantage is simple implementation, but it also has issues like frequent trading, overfitting. Next step is to improve on parameter optimization, risk management for a more robust strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Fast EMA|
|v_input_2|21|Slow EMA|
|v_input_bool_1|true|(?Backtest Time Period)Filter Date Range of Backtest|
|v_input_3|timestamp(1 Jan 2018)|Start Date|
|v_input_4|timestamp(7 Sep 2023)|End Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-06 00:00:00
end: 2023-11-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


//@version=5
strategy("MollyETF_EMA_Crossover", overlay = true, initial_capital = 100000, default_qty_value=100, default_qty_type=strategy.percent_of_equity)

fastInput = input( 10, "Fast EMA")
slowInput = input( 21, "Slow EMA")

// Calculate two moving averages with different lengths.
float fastMA = ta.ema(close, fastInput)
float slowMA = ta.ema(close, slowInput)


// STEP 1. Create inputs that configure the backtest's date range
useDateFilter = input.bool(true, title="Filter Date Range of Backtest",
     group="Backtest Time Period")
backtestStartDate = input(timestamp("1 Jan 2018"), 
     title="Start Date", group="Backtest Time Period",
     tooltip="This start date is in the time zone of the exchange " +  
     "where the chart's instrument trades. It doesn't use the time " + 
     "zone of the chart or of your computer.")
backtestEndDate = input(timestamp("7 Sep 2023"),
     title="End Date", group="Backtest Time Period",
     tooltip="This end date is in the time zone of the exchange " + 
     "where the chart's instrument trades. It doesn't use the time " + 
     "zone of the chart or of your computer.")

// STEP 2. See if current bar falls inside the date range
inTradeWindow = true

// STEP 3. Include the date filter with the entry order conditions

// Enter a long position when `fastMA` crosses over `slowMA`.
if inTradeWindow and ta.crossover(fastMA, slowMA)
    strategy.entry("buy", strategy.long)

// Enter a short position when `fastMA` crosses under `slowMA`.
if inTradeWindow and ta.crossunder(fastMA, slowMA)
    strategy.close_all(comment="sell")

// STEP 4. With the backtest date range over, exit all open
// trades and cancel all unfilled pending orders
if not inTradeWindow and inTradeWindow[1]
    strategy.cancel_all()
    strategy.close_all(comment="Date Range Exit")

// Plot the moving averages.
plot(fastMA, "Fast MA", color.aqua)
plot(slowMA, "Slow MA", color.orange)



```

> Detail

https://www.fmz.com/strategy/431966

> Last Modified

2023-11-13 17:35:14
