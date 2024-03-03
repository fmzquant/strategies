
> Name

趋势追踪-turtle系统Turtle-Trend-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1159e7bae47b549394f.png)
 [trans]

## 概述

该策略是著名的Turtle交易系统的实际代码实现,使用55周期通道作为入场信号,20周期通道作为退出信号,追踪较长周期的趋势,属于趋势跟踪类型策略。

## 策略原理

该策略主要基于两个指标:55周期最高价(HI)和最低价(LO)构建入场通道,以及20周期最高价(hi)和最低价(lo)构建退出通道。

当价格上穿55周期通道时生成买入信号;当价格下穿55周期通道时生成卖出信号。这是典型的趋势追踪策略入场逻辑。

当价格下穿20周期通道时平掉多单;当价格上穿20周期通道时平掉空单。这是策略的退出逻辑。

该策略同时绘图显示55周期通道和20周期通道,可以直观看到策略的入场和退出点。

## 优势分析

该策略主要具有以下几点优势:

1. 追踪中长线趋势,回撤相对较小
2. 入场信号明确,运用通道原理,回撤控制效果好
3. 退出机制较为严格,避免反转带来的损失
4. 参数设置简单,容易实施

## 风险分析

该策略也存在一些风险:

1. 无法捕获短线机会,盈利能力相对较弱
2. 无法应对突发事件,容易止损
3. 无法有效控制单边行情的超额亏损
4.  parametric,对参数非常敏感

可以通过以下方法降低风险:

1. 优化参数,找到最佳参数组合
2. 增加止损策略,控制单边行情下的损失
3. 结合其他指标,识别潜在的反转机会

## 优化方向  

该策略可以从以下几个方向进行优化:

1. 优化入场通道和出场通道的参数,找到最优参数组合
2. 增加波动率指标,避免陷入震荡行情
3. 结合交易量指标,确保入场时交易量放大
4. 增加移动止损策略,实时跟踪止损线
5. 结合多个时间周期,实现多周期综合交易

## 总结

该策略整体是一个非常典型的趋势跟踪策略,通过通道来捕获中长线趋势,回撤控制效果较好。同时也存在一些典型的趋势跟踪策略的问题,如捕获趋势的不足,难以应对反转等。通过多方面优化,可以将该策略的优势发挥到极致,成为一个可靠的量化策略。

||


## Overview

This strategy is the actual code implementation of the famous Turtle trading system, using a 55-period channel for entry signals and a 20-period channel for exit signals to track longer-term trends, belonging to the trend-following strategy type.

## Strategy Logic  

The strategy is mainly based on two indicators: the 55-period highest price (HI) and lowest price (LO) to construct the entry channel, and the 20-period highest price (hi) and lowest price (lo) to construct the exit channel.

When the price breaks above the 55-period channel, a buy signal is generated; when the price breaks below the 55-period channel, a sell signal is generated. This is the typical trend-following entry logic.  

When the price breaks below the 20-period channel, long positions are closed; when the price breaks above the 20-period channel, short positions are closed. This is the exit logic of the strategy.

The strategy also plots the 55-period channel and 20-period channel, which can visually see the entry and exit points of the strategy.

## Advantage Analysis   

The main advantages of this strategy are:

1. Tracking mid-to-long-term trends with relatively small drawdowns  
2. Clear entry signals using channel principle and good drawdown control   
3. Strict exit mechanism to avoid losses from reversals
4. Simple parameter settings, easy to implement

## Risk Analysis  

There are also some risks with this strategy:  

1. Unable to capture short-term opportunities, relatively weak profitability
2. Unable to cope with sudden events, prone to stop loss
3. Cannot effectively control excessive losses in one-way markets  
4. Very sensitive to parameters  

The risks can be reduced through:

1. Parameter optimization to find optimal combinations  
2. Adding stop loss strategies to control one-way market losses
3. Combining other indicators to identify potential reversal opportunities  

## Optimization Directions   

The strategy can be optimized in several aspects:

1. Optimize parameters of entry and exit channels to find optimal combination
2. Add volatility indicators to avoid choppy markets  
3. Combine trading volume indicators to ensure amplified volumes on entry signals  
4. Add moving stop loss strategies to follow dynamic stop loss lines
5. Combine multiple timeframes for comprehensive multi-timeframe trading

## Conclusion  

In summary, this is a very typical trend-following strategy, using channels to capture mid-to-long term trends with good drawdown control. It also has some typical issues of trend-following strategies, like insufficient trend capturing ability and difficulty dealing with reversals. With comprehensive optimizations, the advantages can be fully realized to become a reliable quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|55|Entry Length|
|v_input_2|20|Exit Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © racer8
//@version=4
strategy("Turtle System", overlay=true)

n = input(55,"Entry Length")
e = input(20,"Exit Length")

HI = highest(n)
LO = lowest(n)
hi = highest(e)
lo = lowest(e)

if close>HI[1]
    strategy.entry("Buy", strategy.long)

if close<LO[1]
    strategy.entry("Sell", strategy.short)
    
if low<lo[1]
    strategy.close("Buy")

if high>hi[1]
    strategy.close("Sell")

plot(HI,color=color.lime)
plot(LO,color=color.red)
plot(hi,color=color.blue)
plot(lo,color=color.maroon)

```

> Detail

https://www.fmz.com/strategy/435960

> Last Modified

2023-12-20 14:16:48
