
> Name

动态仓位调整量化策略Dynamic-Position-Sizing-Quant-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1e3e3abce5fe52cebd8.png)
[trans]
## 概述

本策略的核心思想是根据账户权益动态调整每个交易的仓位大小。它可以在盈利时自动增加仓位,在亏损时自动减少仓位,从而实现复利效应的自动放大。

## 策略原理  

该策略通过以下几个关键步骤实现仓位动态调整:

1. 设置杠杆比例、最大仓位等参数作为限制
2. 计算账户权益除以杠杆比例,得到基准仓位大小
3. 比较基准仓位大小与最大仓位设置,取二者之间的最小值作为实际仓位
4. 在开仓时调整仓位大小到计算所得的实际仓位
5. 仓位大小会根据盈亏金额与账户权益变化而实时调整

以上步骤确保了仓位大小的合理性,避免超额仓位导致的风险,同时又实现了仓位大小与账户权益挂钩,随着盈利而自动放大的效果。

## 策略优势

该策略具有以下几个优势:

1. 实现了仓位大小的动态调整,无需人工干预
2. 仓位大小与账户权益挂钩,可以自动实现复利效应
3. 设置了杠杆和最大仓位作为约束,控制了风险敞口
4. 逻辑清晰简单,便于理解与二次开发
5. 容易植入其他策略中,扩展性强

## 策略风险

该策略也存在一些风险:  

1. 仓位放大时,亏损也会被放大,存在错失反转机会的风险
2. 仓位大小与账户权益实时挂钩,在特殊市场情况下可能调整过于频繁
3. 最大仓位设置不当可能导致超额仓位的风险
4. 杠杆设置过高也会导致风险过于集中

可以通过合理的参数设置、适当预留资金等方法来缓解上述风险。

## 策略优化方向  

该策略还可以从以下几个方面进行优化:

1. 增加滑点设置,使调整更加平滑
2. 优化仓位大小的计算公式,引入其他因素
3. 在特定市场条件下静态锁定仓位大小
4. 设置仓位调整的最小单位变化量,避免过于频繁调整  
5. 增加仓位调整的条件判断规则,防止无谓调整

通过以上几点优化,可以使策略行为更加稳定可控,避免仓位大小调整过于敏感和频繁。

## 总结  

本策略实现了基于账户权益的仓位动态调整功能,可以自动放大盈利效应。它设置了杠杆和最大仓位作为风险控制,并且逻辑简单清晰,易于理解和二次开发。我们也分析了策略的优劣势与风险,并给出了几点优化建议。整体而言,该策略为实现自动化复利交易提供了一种灵活易用的思路。

||

## Overview

The core idea of this strategy is to dynamically adjust the position size of each trade based on account equity. It can automatically increase position size when profitable and decrease position size when losing, thereby achieving the automatic leverage effect of compounding.   

## Strategy Logic

The strategy achieves dynamic position sizing through the following key steps:

1. Set parameters like leverage ratio, max position size as constraints  
2. Calculate benchmark position size by dividing account equity by leverage ratio
3. Compare benchmark size with max size setting, take the smaller one as actual size  
4. Adjust position size to the calculated actual size when opening positions
5. Position size will change in real-time with PnL changes and account equity fluctuations

The above steps ensure reasonable position sizing, avoid over-leverage risks, while linking size to equity to achieve auto-compounding as profits increase.

## Advantages

The strategy has the following advantages:

1. Achieves dynamic position sizing without manual intervention  
2. Links position size to equity to achieve compounding effect automatically 
3. Sets leverage and max size as risk limits  
4. Simple and clear logic, easy to understand and customize
5. Easy to incorporate into other strategies, highly extensible    

## Risks

There are also some risks:

1. Magnified losses when position size increases, risk of missing reversals
2. Frequent adjustments in extreme market conditions due to real-time linkage to equity
3. Inappropriate max size setting can lead to over-leverage
4. Excessive leverage multiplying risks

Risks can be mitigated through prudent parameter settings, capital buffering etc.

## Enhancement Opportunities 

The strategy can be enhanced in the following ways:  

1. Add slippage to smooth adjustments
2. Optimize position sizing formula by incorporating other factors 
3. Statically lock sizes in specific market conditions
4. Set minimum step size for adjustments to avoid excessive changes
5. Add conditional rules to prevent unnecessary adjustments

The above enhancements can make the strategy behavior more stable and controllable, avoiding sensitivity and frequent position size changes.

## Conclusion   

The strategy achieves equity-based dynamic position sizing to automatically magnify profits. It sets leverage and max size as risk controls, with simple and clear logic for ease of understanding and customization. We also analyzed its pros and cons and risks, along with some optimization suggestions. Overall, it provides a flexible and practical approach to achieve automated compound growth in trading.  


[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10000|leverage|
|v_input_2|25|max position size|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of Tendies Heist LLC, 2021
//@version=4
strategy("Tendies Heist Auto Compounding Example", overlay=true)

    
leverage = input(10000)

maxps = input(25, "max position size")
strategy.risk.max_position_size(maxps)

balance = max(1,floor(strategy.equity / leverage))

o        = 1
ps       = true
size     = 0.
balance2 = size[1] < balance
balance3 = size[1] > balance
l        = balance3
w        = balance2

if ps
    size := w ? size[1]+o : l ? size[1]-o : nz(size[1],o)
if size > maxps
    size := maxps

longCondition = crossover(sma(close, 14), sma(close, 28))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long,qty=size)

shortCondition = crossunder(sma(close, 14), sma(close, 28))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short,qty=size)
```

> Detail

https://www.fmz.com/strategy/442381

> Last Modified

2024-02-21 14:52:10
