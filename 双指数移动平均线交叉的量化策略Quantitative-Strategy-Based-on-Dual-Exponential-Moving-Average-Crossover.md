
> Name

双指数移动平均线交叉的量化策略Quantitative-Strategy-Based-on-Dual-Exponential-Moving-Average-Crossover

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种双指数移动平均线交叉的量化策略。该策略通过设置快慢两条EMA,根据其交叉形成交易信号。

一、策略原理  

该策略的核心是设置两条不同参数的EMA,一快一慢,根据其交叉关系产生买入和卖出信号。其具体逻辑是:

1. 设置一条小周期EMA(如29周期),代表短期趋势;

2. 设置一条大周期EMA(如86周期),代表长期趋势;

3. 当短期EMA上穿长期EMA时,做多;当短期EMA下穿长期EMA时,做空;

4. 目前策略只设置开仓逻辑,未设置止损止盈逻辑;

5. 以固定份额进行开仓。

通过快速EMA反应短期变动,慢速EMA跟踪长期趋势,两者交叉形成交易信号,可以顺势捕捉价格变化的核心方向。

二、策略优势

该策略最大的优势在于操作简单,容易实施。EMA指标易于计算,交叉信号直接可视。

其次,快慢EMA配合可以同时跟踪短长周期趋势。快EMA跟随变化敏捷,慢EMA过滤噪声。

最后,固定仓位管理也减少了策略的参数优化难度。

三、潜在风险

尽管该策略易于实施,但实盘中也应注意以下风险:

首先,EMA交叉存在一定滞后,可能错过最优入场点位。

其次,没有止损设置使每单亏损无法控制。

最后,没有止盈点设置也使盈利空间难以把控。

这需要进一步补充exit 逻辑,设定止损止盈条件。

四、内容总结  

本文详细介绍了一种双EMA交叉的量化交易策略。它使用快速EMA和慢速EMA组合判断趋势方向,形成交易信号。策略易于实施,但也存在参数优化难度不高的问题。总体而言,该策略可作为smoothing trend trading策略选型,但需要适当优化以控制风险。

||

This article explains in detail a quantitative trading strategy based on dual EMA crossover. It sets up fast and slow EMAs and generates signals when they cross over.

I. Strategy Logic

The core of this strategy is setting up two EMAs with different parameters, one fast and one slow, and generating buy and sell signals based on their crossover relationship. The specific logic is:

1. Set up a short-period EMA (e.g. 29 periods) to represent the short-term trend.

2. Set up a long-period EMA (e.g. 86 periods) to represent the long-term trend.

3. Go long when the short EMA crosses above the long EMA, and go short when it crosses below.

4. Currently only entry logic is defined, with no stop loss or take profit. 

5. Trade fixed position sizing.

By using a fast EMA to react to short-term moves and a slow EMA to track the long-term trend, the crossover generates signals that capture the core direction of price changes.

II. Advantages of the Strategy

The biggest advantage of this strategy is its simplicity and ease of implementation. EMA is straightforward to calculate and crossover signals are visually clear.

Secondly, the fast and slow EMA complement each other to track both short and long-term trends simultaneously. The fast EMA moves nimbly while the slow EMA filters out noise.

Lastly, the fixed position sizing also reduces optimization difficulty.

III. Potential Weaknesses 

Despite being easy to implement, the following risks should be noted for live trading:

Firstly, EMA crossovers have a lag and may miss the optimal entry point. 

Secondly, the lack of a stop loss means losing trades cannot be controlled.

Finally, the lack of a take profit level also makes it hard to manage profit potential.

Additional exit logic needs to be added, with stop loss and take profit conditions.

IV. Summary

In summary, this article has explained a quantitative trading strategy based on dual EMA crossovers. It uses fast and slow EMA combinations to determine trend direction for trade signals. While easy to implement, the strategy also lacks sophistication in optimization. Overall, it can serve as a smoothing trend trading framework but requires proper enhancements to manage risks.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|29|Small EMA|
|v_input_2|86|Long EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("EMA Cross Strategy", overlay=true, initial_capital=100, currency="USD", default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

small_ema = input(29, title="Small EMA")
long_ema = input(86, title="Long EMA")

ema1 = ema(close, small_ema)
ema2 = ema(close, long_ema)

longCondition = ema1 > ema2
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = ema1 < ema2
if (shortCondition)
    strategy.entry("Short", strategy.short)
    
//strategy.close("Long", when=close < ema1)
//strategy.close("Short", when=close > ema1)
    
x1 = plot(ema(close, small_ema), title="EMA 1", color=longCondition?green:shortCondition?red:blue, transp=0, linewidth=0)
x2 = plot(ema(close, long_ema), title="EMA 2", color=longCondition?green:shortCondition?red:blue, transp=0, linewidth=0)

//bgcolor(longCondition?green:shortCondition?red:blue, transp=75)

fill(x1,x2,color=longCondition?green:shortCondition?red:blue)
```

> Detail

https://www.fmz.com/strategy/426844

> Last Modified

2023-09-14 19:51:37
