
> Name

基于云图的交易策略Ichimoku-Cloud-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略基于日线ichimoku云图指标实现简单的趋势跟踪交易。策略通过计算转换线、基准线、先行线1和先行线2,并结合当前收盘价的位置来产生买入和卖出信号。当收盘价在云图上方时,视为处于上升趋势,产生买入信号;当收盘价在云图下方时,视为处于下降趋势,产生卖出信号。

## 策略原理

该策略主要基于以下公式计算ichimoku云图的五条指标线:

1. 转换线:最近9日的最高价和最低价的平均值

2. 基准线:最近26日的最高价和最低价的平均值 

3. 先行线1:转换线和基准线的平均值

4. 先行线2:最近52日的最高价和最低价的平均值

5. 附图线:收盘价,向后延迟26天显示

收盘价高于云图时,视为处于上升趋势,产生买入信号;收盘价低于云图时,视为处于下降趋势,产生卖出信号。

具体来说,策略通过以下步骤实现:

1. 计算转换线、基准线、先行线1、先行线2

2. 绘制收盘价的附图线,向后延迟26天

3. 判断收盘价是否高于云图(先行线1和先行线2),如果是,产生买入信号

4. 判断收盘价是否低于云图(先行线1和先行线2),如果是,产生卖出信号

5. 产生买入和卖出信号时,按策略设置入场

## 优势分析

该策略主要有以下优势:

1. 使用云图指标可以有效识别趋势,根据趋势方向产生信号,避免在震荡市场无谓进出场

2. 计算参数经过优化选择,比较适合日线交易

3. 使用先行线1和先行线2的组合作为判断标准,可以 filtering 一些冲击震荡带来的假信号

4. 结合附图线的延迟设计,可以减少突破云图上方后立即回调的风险

5. 策略逻辑简单清晰,容易理解和实现

6. 无需其它指标结合,实现完整的趋势跟踪交易系统

## 风险分析

该策略也存在一些风险:

1. 在特定市场情况下,云图可能失效,导致产生错误信号

2. 云图的参数不适应市场环境变化时,会减弱系统的效果

3. 附图线的固定延迟设置也可能错过部分机会

4. 虽然有两个先行线的组合判断,但仍无法完全避免鲶鱼效应带来的风险

5. 存在一定的时间滞后,无法及时捕捉快速反转

6. 无法区分市场的长期趋势和中短期调整,可能带来亏损

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化转换线、基准线等参数,使其更符合不同市场环境

2. 增加趋势判断指标,确认趋势方向和力度

3. 设置止损和止盈策略,控制单笔损失和盈利

4. 结合volume,大volume突破云图时才入场

5. 根据市场阶段采用不同参数组合

6. 增加机器学习算法,自动优化参数

7. 考虑将固定延迟更改为动态延迟

## 总结

整体来说,该ichimoku云图策略通过简单的趋势判断规则实现基本的趋势跟踪交易,虽然存在一些改进空间,但其核心思想清晰可靠,参数优化充分,可以作为量化交易的一个基础策略来使用。通过进一步优化云图参数,添加过滤指标和风控模块,该策略可以成为一个非常实用的量化交易系统。

||


## Overview

This strategy implements simple trend-following trading based on the ichimoku cloud indicator on daily charts. It generates buy and sell signals by calculating the conversion line, base line, leading span 1, leading span 2, and comparing the closing price's position relative to the cloud. When the closing price is above the cloud, it is considered an upward trend and a buy signal is generated. When the closing price is below the cloud, it is considered a downward trend and a sell signal is generated.  

## Strategy Logic

The strategy mainly calculates the five lines of the ichimoku cloud indicator based on the following formulas:

1. Conversion Line: 9-period average of the highest high and lowest low

2. Base Line: 26-period average of the highest high and lowest low

3. Leading Span 1: average of the conversion line and base line

4. Leading Span 2: 52-period average of the highest high and lowest low 

5. Lagging Span: closing price plotted 26 periods behind

When the closing price is above the cloud, it is considered an upward trend and a buy signal is generated. When the closing price is below the cloud, it is considered a downward trend and a sell signal is generated.

Specifically, the strategy implements this logic through the following steps:

1. Calculate the conversion line, base line, leading span 1, and leading span 2

2. Plot the lagging span of the closing price 26 periods behind

3. Check if the closing price is above the cloud (leading span 1 and 2), generate buy signal if true

4. Check if the closing price is below the cloud, generate sell signal if true 

5. Enter trades on buy/sell signals based on strategy settings

## Advantage Analysis

The main advantages of this strategy are:

1. Using the ichimoku cloud can effectively identify trends and generate signals along the trend direction, avoiding unnecessary trades in range-bound markets.

2. The calculation parameters are optimized for daily trading. 

3. Using both leading span 1 and 2 combines multiple signals to filter out false signals.

4. The lagging span delay helps reduce risk of immediate pullback after cloud breakout.

5. Simple and clear logic, easy to understand and implement.

6. No other indicators needed, complete trend following system.

## Risk Analysis

There are some risks to consider:

1. The cloud may fail in certain market conditions, generating incorrect signals.

2. If parameters are not adapted to changing market dynamics, it weakens the system.

3. The fixed lagging span delay may miss some opportunities. 

4. Still cannot completely avoid whipsaws.

5. There is some time lag, unable to capture quick reversals.

6. Cannot differentiate major trends vs shorter corrections, may cause losses.

## Improvement Areas

Some ways to improve the strategy:

1. Optimize parameters like conversion line for different market conditions.

2. Add trend filtering indicators to confirm strength and direction. 

3. Implement stop loss and take profit to control loss per trade.

4. Only take cloud breakout signals with high volume.

5. Use different parameter sets based on market regime.

6. Add machine learning to auto-optimize parameters.  

7. Consider dynamic lagging span instead of fixed delay.

## Summary

Overall, this ichimoku cloud strategy implements basic trend following rules, although improvements can be made. The core logic is sound, parameters optimized, good baseline algo trading strategy. With further cloud parameter enhancement, adding filters and risk controls, it can become a very practical quantitative trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-07 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Ichimoku Cloud", shorttitle="Ichimoku", overlay=true, commission_type=strategy.commission.percent,commission_value=0.075, initial_capital = 1000,  default_qty_type=strategy.percent_of_equity, default_qty_value=100)

conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=0, title="Displacement")

donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

plot(conversionLine, color=#0496ff, title="Conversion Line")
plot(baseLine, color=#991515, title="Base Line")
plot(close, offset = -displacement, color=#459915, title="Lagging Span")

p1 = plot(leadLine1, offset = displacement, color=color.green,
 title="Lead 1")
p2 = plot(leadLine2, offset = displacement, color=color.red, 
 title="Lead 2")
fill(p1, p2, color = leadLine1 > leadLine2 ? color.green : color.red)
buy = close > leadLine1[26] and close > leadLine2[26]
sell = close < leadLine1[26] and close < leadLine2[26]
strategy.entry("Buy", strategy.long, when = buy)
strategy.entry("Sell", strategy.short, when = sell)

```

> Detail

https://www.fmz.com/strategy/428684

> Last Modified

2023-10-08 12:24:06
