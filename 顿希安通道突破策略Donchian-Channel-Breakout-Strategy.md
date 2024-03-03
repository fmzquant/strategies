
> Name

顿希安通道突破策略Donchian-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于顿希安通道指标,以价格突破通道上下轨作为交易信号的方式,实现 stock/futures/crypto/forex 等品种的趋势跟踪操作,属于中长线持仓的趋势突破策略。

## 策略原理

1. 计算给定周期(如20日)的最高价和最低价,得到顿希安通道的上轨和下轨。

2. 通道中位线为上下轨的平均值。上轨突破为趋势转多信号,下轨突破为趋势转空信号。

3. 当价格收盘突破上轨时,判断为趋势启动,做多入场。

4. 当价格跌破中位线时,视为止盈出场。

5. 可参考回测时间段,生成实际的交易信号。

6. 可选的,也可以以价格突破下轨为做空信号。

该策略通过突破通道判断趋势启动,以中位线为止盈出场点, Capture 中长线趋势行情。通道参数可调整适应市场。

## 优势分析

1. 顿希安通道计算简单,指标易于实现。

2. 价格突破通道可以判断趋势变化。

3. 通道中位线作为止盈位,设置合理。

4. 交易信号规则清晰,易于执行。

5. 可灵活调整通道参数,适应多种品种和周期。

6. 可评估长线或短线交易效果。

7. 扩展空间大,可引入其他技术指标。 

## 风险分析

1. 通道突破出现滞后,错过早期机会的风险。

2. 未考虑突破前的背离,可能产生错误信号。

3. 中位线止损范围固定,对市场冲击敏感。 

4. 回测周期选择不当可能导致过拟合。

5. 未设立止损策略,需关注亏损扩大的风险。

## 优化方向

1. 测试优化通道周期参数。

2. 评估其他类型移动平均线作为止盈线。

3. 增加成交量等指标的过滤条件。

4. 设立移动止损或跟踪止损策略。

5. 引入机器学习预测价格突破。

6. 优化资金管理策略,设立盈亏比。

7. 考虑长短线混合操作 or 多品种组合。

## 总结

该策略以顿希安通道为基础,判断趋势方向,以突破操作,属于典型的中长线趋势跟踪策略。优化通道参数并辅以其他技术指标,可以形成较为稳定的突破系统。此策略 thought 简洁清晰,可拓展空间大,可作为量化交易的一个基础策略模块,具有很好的实用性。

|| 

## Overview

This strategy uses the Donchian Channel indicator to trade breakouts of the upper and lower bands, enabling trend following operations across stocks/futures/crypto/forex etc, belonging to medium-to-long-term trend breakout strategies.

## Strategy Logic

1. Calculate the highest high and lowest low over a given period (e.g. 20 days) to get the upper and lower bands.

2. The midline is the average of the upper and lower bands. Breaking upper band signals uptrend, breaking lower band signals downtrend.

3. When price closes above upper band, determine uptrend has started, go long to enter. 

4. When price breaks below midline, take profit to exit.

5. Can reference backtest timeframe to generate actual trading signals.

6. Optionally, breaking lower band can also act as short signal.

The strategy determines trend start by channel breakouts, uses midline as profit taking exit, capturing mid-to-long term trends. Channel parameters can be adjusted to fit the market. 

## Advantage Analysis

1. Donchian Channel is simple to calculate and implement.

2. Price breaking channel signals trend change.

3. Midline as profit taking level is reasonably set. 

4. Clear signal rules, easy to execute.

5. Can flexibly adjust channel parameters for different products and timeframes.

6. Can evaluate long term or short term trading performance.

7. Large expansion space, can introduce other technical indicators.

## Risk Analysis

1. Channel breakout may lag, risking missed early opportunities. 

2. Does not consider divergence before breakout, may generate false signals.

3. Fixed midline stop loss sensitive to market volatility.

4. Improper backtest period risks over-fitting. 

5. Lacks stop loss, need to watch out for enlarged losses.

## Optimization Directions

1. Test and optimize channel period parameters.

2. Evaluate other MA types as stop loss lines.

3. Add filters like volume indicators.

4. Add moving or trailing stop loss mechanisms. 

5. Introduce machine learning to predict price breakouts.

6. Optimize money management, set profit ratio etc.

7. Consider combining long/short term operations or multiple products.

## Summary

This strategy uses Donchian Channel to determine trend direction, trading breakouts, a typical mid-to-long term trend following approach. Optimizing channel parameters and adding other technical indicators can form a more robust breakout system. The clear and concise logic allows expansions, making it a foundational quant strategy module with great practical utility.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2000|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2018|Backtest Start Year|
|v_input_5|12|Backtest Start Month|
|v_input_6|true|Backtest Start Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-15 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//future strategy
//strategy(title = "stub", default_qty_type = strategy.fixed, default_qty_value = 1,  overlay = true, commission_type=strategy.commission.cash_per_contract,commission_value=2)
//stock strategy
strategy(title = "dc", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true, commission_type=strategy.commission.cash_per_contract,commission_value=.005)
//forex strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true)
//crypto strategy
//strategy(title = "stub", default_qty_type = strategy.percent_of_equity, default_qty_value = 100,  overlay = true, commission_type=strategy.commission.percent,commission_value=.25,default_qty_value=10000)


testStartYear = input(2000, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testEndYear = input(2018, "Backtest Start Year")
testEndMonth = input(12, "Backtest Start Month")
testEndDay = input(1, "Backtest Start Day")
testPeriodEnd = timestamp(testStartYear,testStartMonth,testStartDay,0,0)


testPeriod() =>
    true
    //time >= testPeriodStart  ? true : false

dcPeriod = 20

dcUpper = highest(close, dcPeriod)[1]
dcLower = lowest(close, dcPeriod)[1]
dcAverage = (dcUpper + dcLower) / 2

plot(dcLower, style=line, linewidth=3, color=red, offset=1)
plot(dcUpper, style=line, linewidth=3, color=aqua, offset=1)

plot(dcAverage, color=yellow, style=line, linewidth=1, title="Mid-Line Average")

strategy.entry("simpleBuy", strategy.long, when=close >= dcUpper)
strategy.close("simpleBuy",when=close < dcAverage)
    
//strategy.entry("simpleSell", strategy.short,when=close <= dcLower)
//strategy.close("simpleSell",when=close > dcAverage)
    


```

> Detail

https://www.fmz.com/strategy/427308

> Last Modified

2023-09-19 21:47:41
