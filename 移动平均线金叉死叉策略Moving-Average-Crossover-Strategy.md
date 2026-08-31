
> Name

移动平均线金叉死叉策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description




## Strategy Logic

The moving average crossover strategy generates buy and sell signals by calculating the crossover between two moving averages of different periods. A long signal is generated when the shorter period MA crosses above the longer period MA, while a short signal is generated on the downward crossover.

For example, going long when the 5-day MA crosses above the 21-day MA, and closing the long when the 5-day MA crosses back below the 21-day MA. 

The trading logic is:

1. Calculate two MAs, one short-term e.g. 5-day and one long-term e.g. 21-day
2. Go long when the 5-day MA crosses above the 21-day MA 
3. Close the long when the 5-day MA crosses back below the 21-day MA
4. Similarly calculate a 14-day and 28-day MA
5. Go short when the 14-day MA crosses below the 28-day MA
6. Close the short when the 14-day MA crosses back above the 28-day MA

Different MA period combinations can suit short or long term trends.

## Advantages

- Simple and easy to implement 
- MAs provide some trend filtering  
- Parameters can be optimized by adjusting periods

## Risks

- MAs lag price, time delay
- Longs and shorts can open simultaneously  
- Prone to whipsaws in choppy markets

## Summary

The MA crossover strategy uses MA crosses to generate signals, with adjustable periods to fit market cycles. A simple trend following approach, but lagging MAs and whipsaw risk need caution. Consider combining with other indicators for filtration and optimization.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("My Strategy", overlay=true)

longCondition = crossover(sma(close, 5), sma(close, 21))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(sma(close, 14), sma(close, 28))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
```

> Detail

https://www.fmz.com/strategy/426776

> Last Modified

2023-09-14 14:55:49
