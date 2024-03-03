
> Name

动态尾随止损策略Dynamic-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9364f1a8b08ff22007.png)

[trans]
## 概述

该策略基于动态计算的尾随止损机制,根据股票价格的最高价和最低价来设定长仓和短仓的止损线。当价格触及止损线时,平仓当前头寸,并按相反方向开新仓。策略简单易懂,能有效控制 einzel风险。

## 策略原理  

该策略主要通过以下几个步骤实现:

1. 输入参数:选择做多或做空,计算周期长度, trailing stop 的滑点设置
2. 计算最高价和最低价:基于输入长度计算出周期内的最高价和最低价
3. 计算尾随止损线:做多时,最低价减去滑点作为止损线;做空时,最高价加上滑点作为止损线
4. 打开和平仓:价格触碰止损线时,平仓当前方向,并按相反方向开新仓

以上是策略的基本运行逻辑。当价格运行的时候,止损线会不断更新,从而实现动态跟踪。通过这种跟踪止损方法,可以有效控制单笔损失。

## 优势分析

该策略主要有以下几点优势:

1. 策略简单清晰,容易理解和实现
2. 应用动态尾随止损,可以有效控制单笔损失
3. 可灵活选择做多或做空方向,适用于不同市场环境
4. 计算周期和滑点可自定义,便于优化

总的来说,该策略通过简单的尾随止损机制,能够有效管理Positions,是一种典型的 Risk Management 策略。

## 风险分析 

该策略也存在一些风险需要注意:  

1. 当价格波动较大时,止损线可能被频繁触发,导致过于频繁交易
2. 计算最高价和最低价的周期不合理可能导致不适当的止损线
3. 滑点设置过大,可能导致止损线过松,无法及时止损

对于这些风险,可以通过调整计算周期、适当缩小滑点幅度等方法进行优化,使止损线设置更加合理。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加止损线优化机制,使其可以动态调整,避免止损线过松或过紧
2. 增加开仓条件判断,避免在不适当的时候打开Positions
3. 结合趋势指标,采用趋势跟踪方式,使盈利空间更大
4. 添加仓位管理模块,通过风险评级动态调整仓位

## 总结

该交易策略通过简单的尾随止损方法,实现了Positions 的动态管理。策略易于理解和实现,能够有效控制单笔损失。我们分析了策略的优势、可能的风险和后续的优化方向。总的来说,这是一个非常典型和实用的 Risk Management 策略。

||

## Overview

This strategy is based on a dynamic trailing stop loss mechanism to set stop loss lines for long and short positions based on the highest and lowest prices of a stock. When the price hits the stop loss line, it will close the current position and open a new position in the opposite direction. The strategy is simple and effective in controlling single transaction risk.

## Principle  

The main steps of this strategy are:

1. Input parameters: choose to go long or short, set length for period, trailing stop slippage
2. Calculate highest and lowest prices: get highest and lowest prices based on input length 
3. Calculate trailing stop loss lines: for long, lowest price minus slippage; for short, highest price plus slippage
4. Open and close positions: when price hits stop loss line, close current direction position, and open opposite direction position

The above is the basic logic of the strategy. As price moves, the stop loss line keeps updating for dynamic tracking. By trailing stop loss, it can effectively control losses per trade.

## Advantage Analysis   

The main advantages of this strategy:

1. Simple and clean logic, easy to understand and implement
2. Dynamic trailing stop loss controls single trade loss 
3. Flexible to choose long or short, adaptable to different market environments
4. Customization of period and slippage for optimization

In summary, by simple trailing stop loss mechanisms, this strategy can effectively manage positions and is a typical Risk Management strategy.

## Risk Analysis

There are also some risks to note:

1. Price volatility may trigger stop loss frequently, leading to over-trading
2. Improper period settings may cause unsuitable stop loss lines
3. Excessive slippage setting may result in loose stop loss, unable to stop loss in time

These risks can be optimized by adjusting the period, reducing slippage reasonably to make more sensible stop loss lines. 

## Optimization Directions 

The strategy can be upgraded from the following aspects:

1. Add optimization for dynamic stop loss line adjustment, avoid improper tight or loose stop loss lines
2. Add open position conditions to avoid opening positions at inappropriate times  
3. Incorporate trend indicators for trend-following with more profit potential  
4. Add position sizing to dynamically adjust positions based on risk levels

## Conclusion

The trading strategy realizes dynamic positions management through simple trailing stop loss methods. It is easy to understand and implement, and can effectively control single trade loss. We analyzed the advantages, potential risks and future optimization directions. In conclusion, this is a highly typical and practical Risk Management strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|20|length|
|v_input_4|false|Trailing Stop|
|v_input_5|false|background|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2019

//@version=4
strategy(title = "Noro's Trailing-Stop Strategy", shorttitle = "Trailing", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
length = input(20, minval = 1)
shift = input(0.0, minval = 0, title = "Trailing Stop")
background = input(false)

//Levels
max = highest(high, length)
min = lowest(low, length)

//Trailing
size = strategy.position_size
longtrailing = 0.0
shorttrailing = 0.0
longtrailing := size <= 0 ? min - ((min / 100) * shift) : max(min - ((min / 100) * shift), longtrailing[1])
shorttrailing := size >= 0 ? max + ((max / 100) * shift) : min(max + ((max / 100) * shift), shorttrailing[1])
trailing = size <= 0 ? shorttrailing : longtrailing
col = size == size[1] ? size > 0 ? color.red : color.lime : na
plot(trailing, color = col, linewidth = 2, transp = 0)

//Background
bgcol = background ? size > 0 ? color.lime : color.red : na
bgcolor(bgcol, transp = 80)

if trailing > 0 and size <= 0
    strategy.entry("Long", strategy.long, needlong ? na : 0, stop = trailing)
if trailing > 0 and size >= 0
    strategy.entry("Short", strategy.short, needshort ? na : 0, stop = trailing)
```

> Detail

https://www.fmz.com/strategy/440541

> Last Modified

2024-01-31 15:05:30
