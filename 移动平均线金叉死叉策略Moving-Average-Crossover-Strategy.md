
> Name

移动平均线金叉死叉策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

移动平均线金叉死叉策略通过计算两条不同周期的移动平均线的交叉来产生交易信号。当短周期移动平均线上穿长周期移动平均线时,产生买入信号;当短周期移动平均线下穿长周期移动平均线时,产生卖出信号。

例如,5日移动平均线上穿21日移动平均线时,做多;5日移动平均线下穿21日移动平均线时,平多仓。

策略的具体交易逻辑是:

1. 计算两条移动平均线,一短期如5日,一长期如21日
2. 当5日移动平均线从下方上穿21日移动平均线时,做多
3. 当5日移动平均线从上方下穿21日移动平均线时,平多仓
4. 同理,计算一短期如14日,一长期如28日移动平均线 
5. 14日移动平均线上穿28日移动平均线时做空
6. 14日移动平均线下穿28日移动平均线时,平空仓

通过选择不同的移动平均线周期组合,可以适应市场的长短期趋势。

## 策略优势

- 简单易行,容易实现
- 移动平均线具有一定的趋势过滤作用
- 可通过调整周期优化参数

## 策略风险 

- 移动平均线滞后,存在时间差
- 多空仓位可能同时打开
- 震荡行情中容易止损

## 总结

移动平均线金叉死叉策略采用不同周期均线交叉产生交易信号,通过参数调整适应市场周期,是一种简单实用的趋势跟踪策略。但其滞后性与抗震荡能力较弱,需谨慎使用,可考虑辅助其他指标进行过滤优化。



||


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

[/trans]



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
