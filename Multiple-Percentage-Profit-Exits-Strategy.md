
> Name

Multiple-Percentage-Profit-Exits-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fe27b27583d529deaf.png)


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
