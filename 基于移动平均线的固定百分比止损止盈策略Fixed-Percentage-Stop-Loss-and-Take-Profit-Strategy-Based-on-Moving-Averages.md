
> Name

基于移动平均线的固定百分比止损止盈策略Fixed-Percentage-Stop-Loss-and-Take-Profit-Strategy-Based-on-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1647b4adedce67bcac1.png)
[trans]

## 概述

本策略采用移动平均线产生交易信号,并设置了基于入场价格的固定百分比止损位和止盈位,旨在控制每笔交易的风险和回报。

## 策略原理

该策略首先使用5日指数移动平均线和32日指数移动平均线判断趋势方向,当短期移动平均线上穿长期移动平均线时做多,下穿时做空。

在入场后,策略基于用户输入的止损百分比和止盈百分比动态设置每个交易的止损位和止盈位。具体来说,对于做多单,止损位设置为入场价格的(1-止损百分比),止盈位为入场价格的(1+止盈百分比);对于做空单,则相反,止损位为入场价格的(1+止损百分比),止盈位为入场价格的(1-止盈百分比)。

这样设置可以确保每个交易都有固定比例的止损幅度和止盈幅度,从而控制单笔交易的风险和回报。

## 优势分析

这种设置止损止盈的方式有几个显著优势:

1. 可以限制单笔交易的最大亏损,有效控制交易风险

2. 可以锁定单笔交易的固定盈利比例,确保回报率

3. 停损点和止盈点随交易本身的入场价格变化,避免使用固定数值带来的问题

4. 用户可以通过调整输入参数自行确定承受的风险水平

5. 策略逻辑简单直观,容易理解和验证

## 风险分析

该策略也存在一些风险:

1. 移动平均线作为交易信号可能产生大量无效交易信号,入场后被止损的概率较大

2. 止盈比例设置过大可能导致获利能力不足,设置过小则无法获得足够回报

3. 停损点过近可能增加止损被触发的概率,应适当放宽

4. 交易品种和交易周期的选择会影响止损止盈策略的效果

对应解决方法:

1. 优化移动平均线参数,减少无效信号

2. 测试不同的止盈比例,找到最优配置

3. 根据市场波动程度调整止损距离

4. 评估不同品种和周期下的策略效果

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加其他指标判断趋势,避免移动平均线产生过多无效信号

2. 根据回测数据优化止损止盈的比例,找到最优参数

3. 将止损方式改为追踪止损,可以锁定更多运行盈利

4. 增加仓位管理模块,通过加仓和止损来管理交易风险

5. 评估不同交易品种和不同时间周期下策略效果的差异

## 总结

本策略基于移动平均线判断趋势方向入场,设置基于入场价格的固定百分比止损止盈来控制单笔交易的风险和回报。该策略优点是可以有效限制损失,确保盈利比例,逻辑简单,易于操作。需要注意的是要适当配置止损止盈参数,选择合适的交易品种和周期,并可以通过多种方式继续对该策略进行优化。

||

## Overview

This strategy uses moving averages to generate trading signals and sets fixed percentage stop loss and take profit levels based on the entry price to control the risk and reward of each trade.

## Strategy Logic

The strategy first uses the 5-day exponential moving average (EMA) and 32-day EMA to determine the trend direction. It goes long when the short-term moving average crosses above the long-term one and goes short on cross under.  

After entering a trade, the strategy dynamically sets the stop loss and take profit for each trade based on the user-defined stop loss percentage and take profit percentage. Specifically, for long trades, the stop loss is set at the entry price × (1 - stop loss percentage) and take profit is set at entry price × (1 + take profit percentage). For short trades it is reversed - stop loss at entry price × (1 + stop loss percentage) and take profit at entry price × (1 - take profit percentage).

This allows ensuring fixed risk/reward ratio for each trade and controlling the risk and profit.

## Advantage Analysis 

This way of setting stop loss and take profit has several significant advantages:

1. It can limit the maximum loss per trade and effectively control trading risk. 

2. It can lock in fixed profit ratio per trade and ensure return.

3. The stop loss and take profit points vary with the actual entry price instead of using fixed values. 

4. Users can determine their risk appetite by adjusting the input parameters.

5. Simple and intuitive strategy logic, easy to understand and verify.

## Risk Analysis

There are also some risks with this strategy:

1. Moving averages may generate excessive invalid signals, with high chance of being stopped out after entry.

2. Take profit ratio set too high may result insufficient profitability, too low may fail to win enough.

3. Stop loss too close may increase the chance of being stopped out and should give some buffer.  

4. Choice of trading products and timeframes may affect the effectiveness.

Corresponding solutions:

1. Optimize moving average parameters to reduce false signals.  

2. Test different take profit ratios to find optimum.

3. Adjust stop loss distance based on market volatility.  

4. Evaluate strategy performance across different products and timeframes.


## Optimization Directions

The strategy can be improved in the following aspects:

1. Add other indicators for trend validation to avoid excessive false signals from moving averages.

2. Optimize the stop loss and take profit percentages based on backtest data to find optimum parameters.

3. Change stop loss to trailing stop to lock in more running profit.

4. Add position sizing rules with pyramiding and stop loss to manage trade risk.

5. Assess performance variance across different trading instruments and timeframes.


## Summary

This strategy identifies trend direction with moving averages, and sets fixed percentage stop loss and take profit based on entry price to control single trade risk and reward. Its advantage is effectively limiting losses, ensuring profit ratio, with simple and straightforward logic. Proper configuration of stop loss/take profit parameters, selection of trading products and timeframes, and various ways to further optimize the strategy need to be noted.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|Stop Loss %|
|v_input_2|10|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © theCrypster 2020

//@version=4
strategy("Fixed Percent Stop Loss & Take Profit %", overlay=true)

// Moving Averages to get some example trades generated
eg1 = ema(close, 5)
eg2 = ema(close, 32)

long = crossover(eg1, eg2)
short = crossunder(eg1, eg2)

strategy.entry("LONG", strategy.long, when=long)
strategy.entry("SHORT", strategy.short, when=short)

//
// The Fixed Percent Stop Loss Code
// User Options to Change Inputs (%)
stopPer = input(5.0, title='Stop Loss %', type=input.float) / 100
takePer = input(10.0, title='Take Profit %', type=input.float) / 100

// Determine where you've entered and in what direction
longStop = strategy.position_avg_price * (1 - stopPer)
shortStop = strategy.position_avg_price * (1 + stopPer)
shortTake = strategy.position_avg_price * (1 - takePer)
longTake = strategy.position_avg_price * (1 + takePer)

if strategy.position_size > 0 
    strategy.exit(id="Close Long", stop=longStop, limit=longTake)
if strategy.position_size < 0 
    strategy.exit(id="Close Short", stop=shortStop, limit=shortTake)

//PLOT FIXED SLTP LINE
plot(strategy.position_size > 0 ? longStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Fixed SL")
plot(strategy.position_size < 0 ? shortStop : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Short Fixed SL")
plot(strategy.position_size > 0 ? longTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Long Take Profit")
plot(strategy.position_size < 0 ? shortTake : na, style=plot.style_linebr, color=color.green, linewidth=1, title="Short Take Profit")

//



```

> Detail

https://www.fmz.com/strategy/435714

> Last Modified

2023-12-18 11:30:39
