
> Name

趋势追踪利润最大化策略Trend-Tracking-Maximized-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过计算价格的移动平均线及标准差CHANNEL,形成动态的上下轨,并结合最高价、最低价的平均值形成中轨,从而判断当前趋势方向。当价格突破上轨时看涨,当价格跌破下轨时看跌,实现根据趋势变化进行交易的策略。

## 策略原理

1. 计算close的20日简单移动平均线basis作为中间基准线
2. 计算close的20日标准差dev作为上下轨距离中轨的基础
3. 中轨basis±2\*dev确定上轨upper和下轨lower
4. 计算最近20日内最高价upper2和最低价lower2的平均值basis2作为第二条中轨 
5. 上述两条中轨取平均值MB作为最终中轨
6. 当close大于中轨MB时为看涨信号,当MB大于close时为看跌信号
7. 根据信号判断做多做空方向,实现跟踪趋势获得利润

## 优势分析

1. 使用动态的标准差Channel,能够快速捕捉价格变化趋势
2. 结合最高价和最低价信息,中轨更具有参考意义
3. 采用双重中轨设计,使信号更加准确可靠
4. 策略思路简单清晰,容易理解实现
5. 可配置参数较少,适合各类市场环境

## 风险分析

1. 突破上轨或下轨交易时,需要考虑止损策略,控制单笔损失
2. 交易频率可能较高,需要考虑手续费的影响 
3.  Parameters如期间参数需要谨慎优化,避免过拟合
4. 趋势变化时,存在交易信号错误的可能
5. 需要做好资金管理,不能使用过高杠杆

## 优化方向

1. 可以考虑在突破上轨、下轨时,增加过滤条件,避免假突破
2. 可以基于ATR等指标设定动态止损exit
3. 可以结合交易量的信息来验证突破信号的可靠性
4. 可以针对Parameters如计算周期等进行优化,适应更多市场环境
5. 可以考虑设定开仓数量,以控制单笔损失风险

## 总结

该策略整体思路清晰易懂,通过动态Channel捕捉趋势,并结合多重中轨设计产生交易信号,可以有效跟踪趋势方向进行交易,获得较好的交易回报。在实际运用中,需要关注止损策略、资金管理,并针对Parameters进行优化,从而获得长期稳定的收益。

||

## Overview

This strategy calculates the moving average and standard deviation CHANNEL of the price to form dynamic upper and lower rails, and combines the average value of the highest and lowest prices to form the middle rail, so as to judge the current trend direction. When the price breaks through the upper rail, it means long. When the price breaks through the lower rail, it means short. This implements a strategy that trades based on trend changes.

## Strategy Logic

1. Calculate the 20-day simple moving average of close as the basis for the middle reference line
2. Calculate the 20-day standard deviation of close as the basis for the distance between the upper and lower rails and the middle rail 
3. The middle rail basis ± 2\*dev determines the upper rail upper and the lower rail lower
4. Calculate the average value of the highest upper2 and lowest lower2 prices in the most recent 20 days as the basis2 for the second middle rail
5. Take the average value MB of the above two middle rails as the final middle rail
6. When close is greater than the middle rail MB, it is a long signal. When MB is greater than close, it is a short signal
7. Determine the long and short direction according to the signal to track the trend and profit

## Advantage Analysis 

1. Using dynamic standard deviation Channel can quickly capture price trend changes
2. Combining the information of the highest and lowest prices, the middle rail is more meaningful
3. The double middle rail design makes the signal more accurate and reliable
4. The strategy idea is simple and clear, easy to understand and implement
5. There are few configurable parameters, suitable for various market environments

## Risk Analysis

1. When trading at breakouts of the upper or lower rail, stop loss strategies need to be considered to control single loss
2. The trading frequency may be high, and the impact of commissions needs to be considered
3. Parameters like period parameters need to be carefully optimized to avoid overfitting
4. When the trend changes, there is a possibility of wrong trading signals
5. Proper capital management is required, excessive leverage should not be used

## Optimization Directions

1. Consider adding filters when breaking through the upper and lower rails to avoid false breakouts
2. Set dynamic exits based on ATR and other indicators 
3. Incorporate trading volume information to verify the reliability of breakout signals
4. Optimize Parameters like calculation cycle to adapt to more market environments
5. Consider setting position size to control the risk of single loss

## Summary

The overall idea of this strategy is clear and easy to understand. By dynamically capturing trends through Channel and generating trading signals with multiple middle rail designs, it can effectively track trend directions for trading and obtain good returns. In actual application, attention should be paid to stop loss strategies, capital management, Parameters optimization, etc., so as to obtain stable returns in the long run.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ErdemDemir

//@version=4
strategy("Lawyers Trend Pro Strategy", shorttitle="Lawyers Trend Pro Strategy", overlay=true)

src = close
mult = 2.0
basis = sma(src, 20)
dev = mult * stdev(src, 20)
upper = basis + dev
lower = basis - dev
offset = 0


lower2 = lowest(20)
upper2 = highest(20)
basis2 = avg(upper2, lower2)


MB= (basis+basis2)/2





col1=close>MB
col3=MB>close
colorE = col1 ? color.blue : col3 ? color.red : color.yellow
p3=plot(MB, color=colorE, linewidth=3)

// Deternine if we are currently LONG
isLong = false
isLong := nz(isLong[1], false)

// Determine if we are currently SHORT
isShort = false
isShort := nz(isShort[1], false)

// Buy only if the buy signal is triggered and we are not already long
buySignal = not isLong and crossover(close,MB)

// Sell only if the sell signal is triggered and we are not already short
sellSignal= not isShort and crossover(MB,close)
if (buySignal)
    isLong := true
    isShort := false

if (sellSignal)
    isLong := false
    isShort := true







/// LONG
strategy.entry("long", true , when = buySignal, comment="Open Long")

strategy.close("long", when=sellSignal, comment = "Close Long")

/// SHORT
strategy.entry("short", false,  when = sellSignal, comment="Open Short")

strategy.close("short", when=buySignal, comment = "Close Short")


```

> Detail

https://www.fmz.com/strategy/428966

> Last Modified

2023-10-11 14:38:40
