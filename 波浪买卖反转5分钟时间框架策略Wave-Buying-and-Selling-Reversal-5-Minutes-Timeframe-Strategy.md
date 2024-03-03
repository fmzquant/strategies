
> Name

波浪买卖反转5分钟时间框架策略Wave-Buying-and-Selling-Reversal-5-Minutes-Timeframe-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cd2ec0149101af4977.png)
[trans]

## 概述

该策略是基于5分钟ETHUSDT交易对设计的测试性策略。当价格出现大于5美元的跳空下跌时,做多;当已做多时,在1%和2%的价格水平设两个反向做空止损,同时在另一个价格水平建一个追踪做多的限价单。做空后的操作与做多类似,在0.99%和1.02%设两个反向止损的做多单,同时建一个追踪的做空限价单。

## 策略原理  

该策略的核心逻辑是在特定波段出现价格跳空或反转时,判断可能形成新的趋势方向。当价格下跌超过5美元时,判断价格可能反转上涨形成多头;当已做多时,在1%和2%的价格水平建两个小额反向做空单,既用于止损又用于判断是否形成新的空头方向。同理,当价格出现某种程度的上涨时,判断可能形成空头;已做空时在0.99%和1.02%建两个小额做多单,用于止损和判断多头方向。  

这样通过建立多个反向小单,可以比一次性全部止损更好地判断价格走势和止损。同时反向小单还具有追踪止损的功能,根据价格波动自动止损或获利。

## 优势分析

该策略最大的优势是识别价格跳空波段所形成的潜在新趋势,并通过多个小额反向单兼具资金管理、止损和判断新趋势的功能,从而在大幅波动中把握机会。此外在多个价格水平同时建立追踪止损单,可以更灵活有效地止损和获利。

## 风险分析  

由于该策略依赖较短时间内的价格走势判断,因此可能会有一定的假信号风险。此外多元的订单设置会使交易系统的订单压力增大,可能会导致滑点等问题。同时在大幅波动中,止损单会频繁触发带来额外的手续费损失。

## 优化方向  

该策略可以优化的方向包括调整判定多空信号的参数如跳空幅度、反转幅度等,优化止损和反向单的数量和价格水平设定,实现动态跟踪等方式。此外也可以考虑引入更多因素判断潜在多空方向的变化,如交易量、移动平均线等技术指标等。通过机器学习,实时优化止损和追踪的参数设置也是可行的。

## 总结

该策略通过价格跳空和反转来判断新趋势并建立反向追踪单,具有识别新趋势、灵活止损、动态获利的优点。主要风险是假信号和高频交易带来的额外损失,可通过调整参数及引入更多信号来优化判断。总体来说,借助机器学习与动态优化,该策略有很大的发展潜力。

|| 

## Overview  

This is a test strategy designed for the 5-minute ETHUSDT trading pair. It goes long when there is a price gap down of more than $5, and when already long, it sets two small short orders as stops at 1% and 2% price levels, while also setting a trailing limit long order at another price level. The logic after going short is similar, with two long stop orders at 0.99% and 1.02% price levels, and a trailing short limit order.

## Strategy Logic   

The core logic of this strategy is to identify potential new trend directions when there are price gaps or reversals at key levels. When prices drop more than $5, it indicates a potential bottom and upcoming bull trend. When already long, the small short orders at 1% and 2% serve for both stopping out and identifying potential new bear trends. Similarly on the upside, potential topping and new bear trends are identified, with the two small long orders serving for exiting shorts and trailing for new bull trends.  

Thus multiple small reversal orders are used instead of one big stop, for better judging trend direction and managing stops. The reversal orders also provide trailing stop/profit functions according to price fluctuation. 

## Advantage Analysis   

The biggest advantage is identifying new potential trends from key price gaps, and using small reversal orders for capital management, stop loss and judging new trends during huge swings. Setting stops and trailing orders at multiple price levels also allows more effective management.  

## Risk Analysis

The key risks are whipsaws from relying on shorter term price action, and higher order load on exchanges from the multiple orders. There may also be excessive fees from frequent stop triggering during volatile periods.  

## Optimization Directions

Directions include adjusting parameters for identifying signals like gap sizes, optimizing number and levels of stops and orders, implementing dynamic trailing, and introducing more factors like volume and technical indicators to judge trend changes. Machine learning for dynamic parameter optimization is also feasible.  

## Summary  

The strategy identifies new trend potential from gaps/reversals and sets trailing reversal orders for catching trends, flexible stops and dynamic profits. Key risks are whipsaws and extra costs from high order frequency, which can be improved via parameter tuning and more signal factors. With machine learning and dynamics optimization, there is great potential.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-22 00:00:00
end: 2024-02-28 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("pokupka perevorot 5min tf", overlay=true)

// Activation block (executed only once)
if (close - open) < -5
    strategy.entry("Long", strategy.long)

// Checking chart state block (executed continuously)
if strategy.position_size > 0
    // If long position is open
    strategy.entry("Short1", strategy.short, qty=2, limit=close * 1.01)
    strategy.entry("Short2", strategy.short, qty=2, limit=close * 1.01)
    strategy.entry("LongLimit", strategy.long, qty=1, limit=close * 0.98)

// Execution block (executed continuously)
if close * 1.01 <= strategy.position_avg_price
    // If price has increased by 1%, indicating a short position
    strategy.close("Long")

if close * 0.98 >= strategy.position_avg_price
    // If price has decreased by 2%, indicating two long positions
    strategy.close("Short1")
    strategy.close("Short2")

// Checking chart state block (executed continuously)
if strategy.position_size < 0
    // If short position is open
    strategy.entry("Long1", strategy.long, qty=2, limit=close * 0.99)
    strategy.entry("Long2", strategy.long, qty=2, limit=close * 0.99)
    strategy.entry("ShortLimit", strategy.short, qty=1, limit=close * 1.02)

// Execution block (executed continuously)
if close * 0.99 >= strategy.position_avg_price
    // If price has decreased by 1%, indicating a long position
    strategy.close("Short")

if close * 1.02 <= strategy.position_avg_price
    // If price has increased by 2%, indicating two short positions
    strategy.close("Long1")
    strategy.close("Long2")

```

> Detail

https://www.fmz.com/strategy/443129

> Last Modified

2024-02-29 14:19:44
