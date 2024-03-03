
> Name

周一买入周二止损止盈策略Buy-Monday-Sell-Tuesday-with-Stop-Loss-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略的主要思路是在周一收盘前买入,并设置止损止盈点,在下周二收盘前止盈或止损退出。属于短线交易策略。

## 策略原理 

该策略基于两点判断:

1. 进入判断:当前是周一且距离收盘时间不到1小时,做多入场。

2. 退出判断:当前是周二且距离收盘时间不到1小时,平仓退出。 

同时设置止损止盈:止损点为入场价*(1-止损百分比),止盈点为入场价*(1+止盈百分比)。

如果未触发止损止盈,在下一周二收盘前强制止盈退出。

## 优势分析

该策略有以下优势:

1. 周期短,实现快速周转。

2. 有清晰的入场和出场规则。

3. 设置止损止盈点,可以控制风险。

4. 利用周一收盘前和周二收盘前的趋势效应,提高获利概率。

## 风险分析

该策略的主要风险是:

1. 无法适应不同的市场情况,容易失败。

2. 没有考虑大级别趋势 Direction,可能逆势交易。

3. 停损点设定不合理,可能过于宽松或过于窄隘。

4. 没有考虑交易品种的特点,盲目交易。

## 优化方向

可以从以下几个方面优化:

1. 结合大级别趋势指标,避免逆势交易。

2. 优化止损止盈比例,找到最优参数。

3. 考虑品种特点,如波动率,交易次数等。

4. 增加条件,如交易量突破,发散指标等,提高过滤效果。

5. 测试不同品种参数健壮性,检查策略稳定性。

## 总结

该策略整体属于短线周期交易策略,有一定优势但也存在改进空间。通过参数优化、条件优化,结合大级别趋势,可以进一步提高获利概率。但整体来说仍属于短期交易策略,无法完全避免被套的风险,需要投资者谨慎使用。

|| 

## Overview

The main idea of this strategy is to buy on Monday market close and set stop loss and take profit points to exit the position before Tuesday market close. It belongs to short-term trading strategies.

## Strategy Principle

The strategy is based on two judgements:

1. Entry signal: It is Monday and within 1 hour before market close, go long.

2. Exit signal: It is Tuesday and within 1 hour before market close, close position.

It also sets stop loss and take profit points. Stop loss is set at entry price * (1 - stop loss percentage). Take profit is set at entry price * (1 + take profit percentage). 

If stop loss and take profit are not triggered, it will exit at Tuesday market close.

## Advantage Analysis

The advantages of this strategy are:

1. Short period allows fast turnover.

2. Clear entry and exit rules. 

3. Stop loss and take profit controls risk.

4. Utilizes trend effect before Monday close and Tuesday close to improve profitability.

## Risk Analysis

The main risks are:

1. Cannot adapt to different market conditions, prone to fail.

2. Does not consider overall trend direction, may trade against trend.

3. Stop loss setting may be unreasonable, too wide or too narrow. 

4. Does not consider instrument characteristics, trades blindly.

## Optimization Directions

It can be optimized in the following aspects:

1. Incorporate high timeframe trend indicators to avoid counter trend trades.

2. Optimize stop loss and take profit ratios to find optimum parameters.

3. Consider instrument characteristics like volatility, trade frequency etc.

4. Add conditions like volume breakout, divergence indicators to improve filtration. 

5. Test parameter robustness across different instruments to check stability.

## Summary

Overall this is a short-term cycle trading strategy with some merits but also room for improvement. Further optimizing parameters, entry conditions, combining higher timeframe trends can improve profitability. But overall it remains a short-term trading strategy, cannot fully avoid being caught in traps. Investors need to use it cautiously.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|4|StopLoss %|
|v_input_float_2|3|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © processingclouds

// @description Strategy to go long at end of Monday and exit by Tuesday close, or at stop loss or take profit percentages  

//@version=5
strategy("Buy Monday, Exit Tuesday", "Mon-Tue Swings",overlay=true)

//  ----- Inputs: stoploss %, takeProfit %
stopLossPercentage = input.float(defval=4.0, title='StopLoss %', minval=0.1, step=0.2) / 100
takeProfit = input.float(defval=3.0, title='Take Profit %', minval=0.3, step=0.2) / 100

//  ----- Exit and Entry Conditions - Check current day and session time
isLong = dayofweek == dayofweek.monday  and not na(time(timeframe.period, "1400-1601"))
isExit = dayofweek == dayofweek.tuesday and not na(time(timeframe.period, "1400-1601"))

//  ----- Calculate Stoploss and Take Profit values
SL = strategy.position_avg_price * (1 - stopLossPercentage)
TP = strategy.position_avg_price * (1 + takeProfit)

//  ----- Strategy Enter, and exit when conditions are met
strategy.entry("Enter Long", strategy.long, when=isLong)
if strategy.position_size > 0 
    strategy.close("Enter Long", isExit)
    strategy.exit(id="Exit", stop=SL, limit=TP)

//  ----- Plot Stoploss and TakeProfit lines
plot(strategy.position_size > 0 ? SL : na, style=plot.style_linebr, color=color.red, linewidth=2, title="StopLoss")
plot(strategy.position_size > 0 ? TP : na, style=plot.style_linebr, color=color.green, linewidth=2, title="TakeProfit")

```

> Detail

https://www.fmz.com/strategy/427270

> Last Modified

2023-09-19 16:36:53
