
> Name

跨均线反转策略Cross-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17bebcd04c5bf748668.png)
[trans]
## 概述

本策略是一个基于简单移动平均线的跨均线反转策略。它会使用长度为1和长度为5的简单移动平均线,当短周期移动平均线从下方上穿长周期移动平均线时做多,当从上方下穿时做空,属于典型的趋势跟踪策略。

## 策略原理  

本策略通过计算close价格的1日简单移动平均线sma1和5日简单移动平均线sma5,在sma1上穿sma5时做多入场,在sma1下穿sma5时做空入场。做多后设置止损为入场价下方5美元,止盈为入场价上方150美元;做空后设置止损为入场价上方5美元,止盈为入场价下方150美元。

## 优势分析

- 使用双均线判断市场趋势方向,避免止损后立即反向入场
- 移动平均线参数简单合理,回测结果良好
- 止损幅度较小,可以承受一定的行情震荡
- 止盈幅度较大,可以获得足够盈利

## 风险分析  

- 双均线策略容易被套,行情震荡时止损概率大
- 无法有效跟踪趋势行情,长线获利能力有限  
- 参数优化空间有限,容易过优化
- 针对特定交易品种,不同品种需要调整参数

优化方向:

- 增加其他指标过滤,避免错误信号
- 动态调整止损止盈幅度
- 优化移动平均线参数
- 结合波动率指标,控制仓位规模

## 总结

本策略作为一个简单的双均线策略,具有操作简单、易于实现的特点,可以快速验证策略想法。但其承受能力和获利空间都比较有限,需要对参数和过滤条件进行优化,使之适应更多市场环境。作为初学者的第一份量化策略,它包含了基本的组成要素,可作为简单的框架进行 iterable 改进。

||

## Overview

This is a reversal strategy based on simple moving average crossover. It uses 1-day and 5-day simple moving averages. When the shorter SMA crosses above the longer SMA, it goes long. When the shorter SMA crosses below the longer SMA, it goes short. It's a typical trend following strategy.  

## Strategy Logic

The strategy calculates the 1-day SMA (sma1) and 5-day SMA (sma5) of the closing price. When sma1 crosses over sma5, it enters a long position. When sma1 crosses below sma5, it enters a short position. After opening a long position, the stop loss is set at 5 USD below the entry price and take profit at 150 USD above. For short positions, stop loss is 5 USD above entry and take profit 150 USD below.

## Advantage Analysis   

- Using double SMAs to determine market trend, avoiding loss trades after stop loss
- SMA parameters simple and reasonable, good backtest results  
- Small stop loss to withstand certain price fluctuations
- Big profit target to make enough money 

## Risk Analysis

- Double SMAs are prone to whipsaws, high probability of stop loss when choppy
- Hard to catch trending moves, limited profit for long term trades 
- Limited optimization space, easy to overfit
- Parameters need adjustment for different trading instruments

## Improvement Directions

- Add other filters to avoid wrong signals
- Dynamic stop loss and take profit  
- Optimize SMA parameters 
- Combine volatility index to control position sizing  

## Conclusion

This simple double SMA strategy is easy to understand and implement for fast strategy verification. But it has limited risk tolerance and profit potential. Further optimizations are needed in parameters and filters to adapt more market conditions. As a starter quant strategy, it contains basic building blocks for iterable improvements.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-19 00:00:00
end: 2024-02-19 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Valeria 181 Bot Strategy Mejorado 2.21", overlay=true, margin_long=100, margin_short=100)
 
var float lastLongOrderPrice = na
var float lastShortOrderPrice = na

longCondition = ta.crossover(ta.sma(close, 1), ta.sma(close, 5))
if (longCondition)
    strategy.entry("Long Entry", strategy.long)  // Enter long

shortCondition = ta.crossunder(ta.sma(close, 1), ta.sma(close, 5))
if (shortCondition)
    strategy.entry("Short Entry", strategy.short)  // Enter short

if (longCondition)
    lastLongOrderPrice := close

if (shortCondition)
    lastShortOrderPrice := close

// Calculate stop loss and take profit based on the last executed order's price
stopLossLong = lastLongOrderPrice - 5  // 10 USDT lower than the last long order price
takeProfitLong = lastLongOrderPrice + 151  // 100 USDT higher than the last long order price
stopLossShort = lastShortOrderPrice + 5  // 10 USDT higher than the last short order price
takeProfitShort = lastShortOrderPrice - 150  // 100 USDT lower than the last short order price

// Apply stop loss and take profit to long positions
strategy.exit("Long Exit", from_entry="Long Entry", stop=stopLossLong, limit=takeProfitLong)

// Apply stop loss and take profit to short positions
strategy.exit("Short Exit", from_entry="Short Entry", stop=stopLossShort, limit=takeProfitShort)
```

> Detail

https://www.fmz.com/strategy/442222

> Last Modified

2024-02-20 13:59:46
