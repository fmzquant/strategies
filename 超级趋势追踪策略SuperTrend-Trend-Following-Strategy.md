
> Name

超级趋势追踪策略SuperTrend-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略基于超级趋势指标来判断价格趋势方向,并据此产生交易信号,属于趋势追踪策略类型。本策略特别针对特斯拉(TSLA)1分钟线进行测试,表现尚可。

## 策略原理

1. 计算ATR和最高价、最低价的平均值,以超级趋势乘数确定上轨和下轨。

2. 判断价格是否突破上轨或下轨,以确定超级趋势的方向。

3. 当价格上穿下轨时产生看多信号;当价格下穿上轨时产生看空信号。

4. 可以选择在确定信号次日开盘入场,也可以选择在价格触碰超级趋势轨时立即入场。

## 策略优势

1. 超级趋势指标判断趋势简单清晰,容易编程实现。

2. 可灵活选择入场时机,满足不同交易者需求。

3. 可快速捕捉中短线趋势,适合趋势追踪。

4. 策略交易频繁,可进行扩展优化。

## 策略风险

1. 超级趋势指标存在滞后,可能错过最佳入场时机。

2. 交易频繁带来的滑点成本较大。

3. 没有止损等风险控制手段。

4. 回测数据仅基于特斯拉1分钟线,难以证明策略有效性。

对应解决方法:

1. 调整参数以降低滞后概率。

2. 添加滑点控制,确保交易成本不会过高。

3. 增加止损工具,控制单笔亏损。

4. 在更多品种和周期回测验证策略稳健性。

## 策略优化方向

1. 测试不同的超级趋势参数组合,降低滞后。

2. 增加过滤器,避免被套。

3. 优化资金管理策略,提高策略效率。

4. 引入机器学习预测超级趋势走向。

5. 结合其他指标验证信号,提升策略稳定性。

## 总结

该策略利用超级趋势指标判断中短线趋势方向,产生交易信号,属于典型的趋势追踪策略。整体框架简洁有效,但可进一步优化入场机会、风险控制、参数选择等方面。若能取得更多品种的 historical data,并加入机器学习等技术,则可以大幅提升策略稳定性和盈利能力。

|| 

## Overview

This strategy uses the SuperTrend indicator to determine price trend direction and generate trading signals, belonging to the trend following strategy category. It is specifically tested on Tesla (TSLA) 1-minute chart with decent results.

## Strategy Logic 

1. Calculate ATR and average of highest high and lowest low to determine SuperTrend upper and lower bands based on multiplier.

2. Determine if price breaks above upper band or below lower band to identify SuperTrend direction.

3. Long signal when price crosses above lower band. Short signal when price crosses below upper band.

4. Can choose to enter on next bar's open when signal is triggered, or immediately when price hits SuperTrend bands.

## Advantages

1. SuperTrend clearly identifies trends, easy to program.

2. Flexible entry options suit different trader preferences. 

3. Can quickly capture medium-term trends, suitable for trend following.

4. Frequent trading allows expansions and enhancements.

## Risks

1. SuperTrend lags potentially missing best entries. 

2. High trading frequency leads to larger slippage costs.

3. No risk control tools like stop loss.

4. Backtest solely on Tesla 1-min data, hard to prove strategy validity.

Possible Solutions:

1. Adjust parameters to reduce lag.

2. Add slippage control to limit costs.

3. Incorporate stop loss to control loss per trade.

4. Backtest across more products and timeframes for robustness.

## Optimization Directions

1. Test different parameter sets to reduce lag.

2. Add filters to avoid whipsaws.

3. Optimize money management for higher efficiency. 

4. Incorporate machine learning to predict SuperTrend direction.

5. Add other indicators to verify signals and improve stability.

## Summary

This strategy uses SuperTrend to identify medium-term trend direction for trading signals, typical of trend following strategies. The overall framework is simple and effective, but can be further improved in areas like entry opportunities, risk management, parameter selection etc. With more historical data across products and integrated techniques like machine learning, it can be significantly enhanced in stability and profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|SuperTrend Multiplier|
|v_input_2|120|SuperTrend Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-24 00:00:00
end: 2023-09-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("QuantNomad - SuperTrend - TSLA - 1m", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

// INPUTS //
st_mult   = input(3,   title = 'SuperTrend Multiplier', minval = 0, maxval = 100, step = 0.01)
st_period = input(120, title = 'SuperTrend Period',     minval = 1)

// CALCULATIONS //
up_lev = hl2 - (st_mult * atr(st_period))
dn_lev = hl2 + (st_mult * atr(st_period))

up_trend   = 0.0
up_trend   := close[1] > up_trend[1]   ? max(up_lev, up_trend[1])   : up_lev

down_trend = 0.0
down_trend := close[1] < down_trend[1] ? min(dn_lev, down_trend[1]) : dn_lev

// Calculate trend var
trend = 0
trend := close > down_trend[1] ? 1: close < up_trend[1] ? -1 : nz(trend[1], 1)

// Calculate SuperTrend Line
st_line = trend ==1 ? up_trend : down_trend

// Plotting
plot(st_line, color = trend == 1 ? color.green : color.red , style = plot.style_line, linewidth = 2, title = "SuperTrend")

plotshape(crossover( close, st_line), location = location.belowbar, color = color.green)
plotshape(crossunder(close, st_line), location = location.abovebar, color = color.red)

// Strategy with "when"
//strategy.entry("long",  true,  when = crossover( close, down_trend[1]))
//strategy.entry("short", false, when = crossunder(close, up_trend[1]))

// Strategy with stop orders
strategy.entry("long",  true,  stop = down_trend[1])
strategy.entry("short", false, stop = up_trend[1])
```

> Detail

https://www.fmz.com/strategy/427732

> Last Modified

2023-09-24 13:19:47
