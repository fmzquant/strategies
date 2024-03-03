
> Name

52周高低盒子交易策略52-Week-High-Low-Box-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cc9ee7964250448e06.png)
[trans]

### 概述

52周高低盒子交易策略是一种以价格在不同区间震荡形成的"盒子"为交易信号的策略。该策略的核心逻辑是,当价格突破某一区间(盒子)的上下限时,表明价格进入新的区间,这时可以进行买入或卖出操作。

### 策略原理

该策略通过计算最近5天(可调整)的最高价、最低价,判断价格是否进入新的交易区间。具体规则如下:

1. 计算最近5天内的最高价(Highest High)和最低价(Lowest Low),构成一个交易区间盒子。
2. 当价格突破该区间的上限时,表明可能进入更高的区间,可以进行买入操作。
3. 当价格跌破该区间的下限时,表明可能进入更低的区间,可以进行卖出操作。
4. 将止损位设置为上一个区间的上下限附近,以控制风险。
5. 重复上述判断,不断调整交易区间,实现盈利。

通过这样的区间突破来判断趋势和发出交易信号,是该策略的核心思想。

### 优势分析

52周高低盒子交易策略具有以下几个优势:

1. 策略思路简单直观,容易理解实现。
2. 能够抓住价格进入新区间后的趋势行情。区间突破是比较可靠的交易信号。
3. 有明确的止损策略,可以有效控制风险。
4. 可以通过调整区间长度来适应不同周期和不同品种的行情。

总的来说,这是一种风险控制能力较好,较为实用的趋势交易策略。

### 风险分析

该策略也存在一些风险,主要包括:

1. 当趋势不明显时,会产生多个小损失的情况。
2. 区间范围设定不当也会增加错误交易的概率。
3. 止损策略并不能完全规避巨大行情跳空的风险。

这需要交易者在实践中不断测试和优化策略的参数,谨慎进行风险管理。

### 优化方向

52周高低盒子交易策略还可以从以下几个方面进行优化:

1. 结合交易量或者均线指标来验证买卖信号,提高准确率。
2. 优化区间的长度参数,适应市场的变化。
3. 可以在突破买入后,等待回调构成更多重入机会。
4. 结合复利原理,每次止损后可适当加仓,追求更高收益。

在实践过程中,通过参数调整和规则优化,可以不断提升该策略的效果。

### 总结

52周高低盒子交易策略是一个基于价格突破区间判断趋势方向的策略。它有着简单的交易逻辑、强大的风险控制能力。在实践中需要不断测试和优化,充分发掘该策略的优势。总的来说,这是一种值得推荐的实用交易策略。


||


### Overview

The 52 Week High Low Box Trading Strategy is a strategy that uses the "boxes" formed by price oscillating in different ranges as trading signals. The core logic of this strategy is that when the price breaks through the upper or lower limit of a certain range (box), it indicates that the price is entering a new range, at which point a long or short position can be opened.

### Strategy Principle  

This strategy calculates the highest high and lowest low over the past 5 days (adjustable) to determine if the price has entered a new trading range. The specific rules are:

1. Calculate the highest high and lowest low over the most recent 5 days to form a trading range box.

2. When the price breaks above the upper limit of this range, it indicates that it may be entering a higher range and a long position can be opened.  

3. When the price drops below the lower limit of this range, it indicates that it may be entering a lower range and a short position can be opened.

4. Set the stop loss near the upper/lower limit of the previous range to control risk.

5. Repeat the above judgments and continuously adjust the trading range to realize profits.

Using such breakthroughs to determine trends and generate trading signals is the core idea of ​​this strategy.

### Advantage Analysis 

The 52 Week High Low Box Trading Strategy has the following advantages:

1. The strategy logic is simple and intuitive, easy to understand and implement.

2. It can capture trending moves after prices enter new ranges. Range breakouts are relatively reliable trading signals.  

3. There is a clear stop loss strategy that can effectively control risk.

4. The range length can be adjusted to adapt to different cycle ranges and different varieties.

In general, this is a trend trading strategy with good risk control capabilities and practicality.

### Risk Analysis

The strategy also has some risks, mainly including:

1. When the trend is not obvious, multiple small losses may occur.  

2. Improper range settings also increase the probability of erroneous trades.

3. The stop loss strategy cannot completely avoid the risk of huge price gaps.

This requires traders to continuously test and optimize the parameters of the strategy in practice and carefully manage risks.

### Optimization Directions

The 52 Week High Low Box Trading Strategy can also be optimized in the following aspects:

1. Combine trading volume or moving average indicators to verify buy and sell signals and improve accuracy.

2. Optimize the length parameters of the box to adapt to market changes.  

3. After breakthrough purchases, waiting for pullbacks to form more chances for re-entry.

4. Use the compounding principle to appropriately increase positions on each stop loss to pursue higher returns.

Through parameter adjustment and rule optimization in the implementation process, the effect of this strategy can be continuously improved.

### Summary  

The 52 Week High Low Box Trading Strategy is a strategy that determines trend direction based on price breakouts. It has simple trading logic and strong risk control capabilities. Continuous testing and optimization is needed in practice to fully exploit the advantages of this strategy. Overall, this is a recommended practical trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|BOX LENGTH|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-10 00:00:00
end: 2023-12-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ceyhun

//@version=4
strategy ("Darvas Box Strategy",overlay=true)

boxp=input(5, "BOX LENGTH")

D_High = security(syminfo.tickerid, 'D', high) 
D_Low = security(syminfo.tickerid, 'D', low) 
D_Close =  security(syminfo.tickerid, 'D', close) 
D_Open =  security(syminfo.tickerid, 'D', open) 

LL = lowest(D_Low,boxp)
k1 = highest(D_High,boxp)
k2 = highest(D_High,boxp-1)
k3 = highest(D_High,boxp-2)

NH   = valuewhen(D_High>k1[1],D_High,0)
box1 = k3<k2
TopBox = valuewhen(barssince(D_High>k1[1])==boxp-2 and box1, NH, 0)
BottomBox = valuewhen(barssince(D_High>k1[1])==boxp-2 and box1, LL, 0)

plot(TopBox, linewidth=2, color=#00FF00, title="TopBox")
plot(BottomBox, linewidth=2, color=#FF0000, title="BottomBox")

if crossover(D_Close,TopBox)
    strategy.entry("Long", strategy.long, comment="Long")

if crossunder(D_Close,BottomBox)
    strategy.entry("Short", strategy.short, comment="Short")

```

> Detail

https://www.fmz.com/strategy/434979

> Last Modified

2023-12-11 14:43:30
