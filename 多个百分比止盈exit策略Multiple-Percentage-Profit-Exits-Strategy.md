
> Name

多个百分比止盈exit策略Multiple-Percentage-Profit-Exits-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fe27b27583d529deaf.png)

[trans]

## 概述

这个策略实现了设置多个百分比止盈exit的功能。策略首先判断长短条件,入场做多做空。然后通过一个自定义的percentAsPoints函数把百分比转换成价格点数。程序按照设置的1%、2%、3%和4%的止盈百分比,设置了4个exit,同时也设置了一个通用的2%止损exit。这样就实现了多个百分比止盈的效果。

## 策略原理

该策略主要通过sma均线的多空交叉来判断入场。具体来说,当快线sma(14)上穿慢线sma(28)时会入场做多;当快线sma(14)下穿慢线sma(28)时会入场做空。

那么问题来了,如何设置多个百分比止盈exit呢?这里使用了一个自定义的percentAsPoints函数把百分比转换成价格点数,函数逻辑是:

```
percentAsPoints(pcnt) => 
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
```

该函数如果持仓量不为0,就使用百分比乘以持仓平均价格再除以最小价格跳动,得到价格点数。如果持仓为0就返回na。

有了这个函数我们就可以轻松转换百分比成点数了。然后程序就按照设置的1%、2%、3%和4%止盈,设置了4个exit:

```
lossPnt = percentAsPoints(2)

strategy.exit("x1", qty_percent = 25, profit = percentAsPoints(1), loss = lossPnt)  

strategy.exit("x2", qty_percent = 25, profit = percentAsPoints(2), loss = lossPnt)

strategy.exit("x3", qty_percent = 25, profit = percentAsPoints(3), loss = lossPnt)

strategy.exit("x4", profit = percentAsPoints(4), loss = lossPnt)  
```

同时所有exit都使用一个通用的2%止损loss。这样就实现了多个百分比止盈的效果。

## 优势分析

这种多个百分比止盈的策略具有以下优势:

1. 可以按部就班止盈,避免错过更大利润的机会。一般越靠后止盈幅度越大,风险也越大,这种策略可以平衡风险收益。

2. 分批止盈可以归还本金,降低风险。例如设置25%批量,当盈利达到1%时就可以取回本金的1/4,后面仓位都是靠盈利操作。

3. 防止异常行情止损,2%的止损可以避免极端行情带来的巨额亏损。

4. 代码实现简单清晰,容易理解,便于修改和优化。自定义函数把百分比转换成点数,然后几行代码就可以设置多个止盈。

## 风险分析

这种策略也存在一些风险:

1. 百分比止盈容易形成横盘震荡,价格在止盈价格附近来回振荡。这时会频繁触发止盈止损,增加交易频率和手续费的负担。

2. 分批止盈增加了交易次数,也增加了手续费的负担。如果手续费过高,反而会抵消部分止盈利润。

3. 止盈点设置不当也会影响收益率。如果设置过于保守,则难以取得满意收益;而设置过于激进,则风险过大。

4. 固定百分比止盈,没有考虑市场波动率和趋势性。在震荡行情中应降低止盈幅度,而在趋势行情中应该拉大止盈幅度。

## 优化方向  

考虑到上述风险,可以从以下几个方面继续优化:

1. 优化止盈策略,使其能根据市场波动率和趋势自动调整。例如加入ATR止盈,在震荡时收紧止盈,在趋势中放宽止盈。

2. 优化分批止盈的比例和幅度,实现风险收益的最优组合。加入参数优化功能找出最优参数。

3. 减少止盈次数,避免过于频繁交易。例如设置价格缓冲区,只有超出一定幅度后才止盈。

4. 考虑手续费因素,当预计止盈利润低于手续费时不止盈。或者按照手续费优化止盈幅度。

5. 使用簿单止盈。根据深度优先止盈深度优先价格优先的offer,避免移动止盈价格。

## 总结

这个策略实现了多个百分比止盈的效果,设置了1%、2%、3%和4%四个止盈exit,可以按部就班止盈,同时用2%止损来防止异常行情的巨额亏损。这种策略可以平衡风险收益,防止错过更大利润机会。但是也存在一定风险,如容易形成横盘震荡,增加交易频率等。这些建议都值得考虑加入策略进行优化,使其能够在更多市场中稳定运作。

||

## Overview

This strategy implements the functionality of setting multiple percentage profit exits. The strategy first judges the long and short conditions to enter positions. It then uses a custom percentAsPoints function to convert percentages into price ticks. The program sets 4 exits with profit percentages of 1%, 2%, 3% and 4% based on the configurations, and also sets a common 2% stop loss exit. This achieves the effect of multiple percentage profit exits.

## Strategy Logic

The core logic of this strategy is using SMA crossovers to determine entries. Specifically, when the fast SMA (14) crosses above the slow SMA (28), it will go long. When the fast SMA (14) crosses below the slow SMA (28), it will go short.

Then how to set multiple percentage profit exits? Here a custom percentAsPoints function is used to convert percentages into price ticks. The logic is:

```
percentAsPoints(pcnt) =>
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na) 
```

If position size is not 0, it calculates the price ticks by percentage multiplied by average entry price and divided by minimum tick size. If position size is 0, it returns na.  

With this function, we can easily convert percentages into ticks. The program then sets 4 exits based on profit percentages of 1%, 2%, 3% and 4%:

```
lossPnt = percentAsPoints(2)

strategy.exit("x1", qty_percent = 25, profit = percentAsPoints(1), loss = lossPnt)   

strategy.exit("x2", qty_percent = 25, profit = percentAsPoints(2), loss = lossPnt)

strategy.exit("x3", qty_percent = 25, profit = percentAsPoints(3), loss = lossPnt)  

strategy.exit("x4", profit = percentAsPoints(4), loss = lossPnt)
```

Also a common 2% stop loss is used for all exits. This achieves the effect of multiple percentage profit exits.

## Advantage Analysis

This multiple percentage profit exit strategy has the following advantages:

1. It allows taking profits step-by-step, avoiding missing larger profits. Generally the later exits have larger profit targets and higher risks, and this strategy balances risks and returns.  

2. Exiting in batches allows capital retrieval, lowering risks. For example with 25% batch size, 1% profit can return 1/4 of the capital, and later positions are all by pure profits.

3. 2% stop loss prevents extreme losses in abnormal market moves.

4. The implementation is simple and clean, easy to understand and modify. The custom percentage conversion function enables setting multiple exits in a few lines of code.

## Risk Analysis

There are also some risks with this strategy:

1. Percentage exits may cause sideways choppiness, with prices oscillating around exit prices, triggering frequent exits. This increases trade frequency and commission costs.

2. Batch exits increase number of trades and commissions. High commissions could erase some of the exit profits.  

3. Improper exit positioning could also impact returns. Overly conservative exits may lead to insufficient profits, while too aggressive exits have higher risks.

4. Fixed percentage exits do not consider market volatility and trends. In choppy markets smaller exits should be used, while in trending markets larger exits should be targeted.

## Optimization Directions   

Considering above risks, further optimizations could be done in following aspects:

1. Optimize exits to adapt based on market volatility and strength using methods like ATR exits. Tighter exits in choppy markets and wider exits in strong trends.

2. Optimize batch percentages and ranges to find optimal risk-return combinations. Add parameter optimization for finding best parameters.  

3. Reduce number of exits to avoid over-trading. For example set a price buffer zone, only exit after exceeding certain price move.

4. Consider commission factors, avoid exits where projected profit is less than commission costs. Or optimize percentages based on commissions.
  
5. Use orderbook exits based on depth instead of moving exit prices. Exit using best bid/ask prices based on depth priority.

## Summary

This strategy achieves the effect of multiple percentage profit exits, with 4 exits at 1%, 2%, 3% and 4%, allowing gradual profitable exits, and using 2% stop loss to prevent huge losses in extreme moves. It balances risks and returns and prevents missing further profits. But some risks exist like choppiness and higher trade frequencies. The optimization suggestions provided can help improve performance in more market conditions when incorporated into the strategy.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-31 00:00:00
end: 2023-11-30 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © adolgov

//@version=4
strategy("Multiple %% profit exits example", overlay=false, default_qty_value = 10)

longCondition = crossover(sma(close, 14), sma(close, 28))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(sma(close, 14), sma(close, 28))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)

percentAsPoints(pcnt) =>
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)

lossPnt = percentAsPoints(2)

strategy.exit("x1", qty_percent = 25, profit = percentAsPoints(1), loss = lossPnt)
strategy.exit("x2", qty_percent = 25, profit = percentAsPoints(2), loss = lossPnt)
strategy.exit("x3", qty_percent = 25, profit = percentAsPoints(3), loss = lossPnt)
strategy.exit("x4", profit = percentAsPoints(4), loss = lossPnt)

profitPercent(price) =>
    posSign = strategy.position_size > 0 ? 1 : strategy.position_size < 0 ? -1 : 0
    (price - strategy.position_avg_price) / strategy.position_avg_price * posSign * 100

p1 = plot(profitPercent(high), style=plot.style_linebr, title = "open profit % upper bound")
p2 = plot(profitPercent(low), style=plot.style_linebr, title = "open profit % lower bound")
fill(p1, p2, color = color.red)
```

> Detail

https://www.fmz.com/strategy/433932

> Last Modified

2023-12-01 15:22:29
