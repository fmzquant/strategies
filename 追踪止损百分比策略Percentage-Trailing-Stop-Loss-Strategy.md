
> Name

追踪止损百分比策略Percentage-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1506cca7363c7fdffbc.png)
[trans]

## 概述

追踪止损百分比策略是一种基于交易品种价格百分比来设置和调整止损单的策略。它可以在价格达到一定盈利水平后,将止损单调整至入场价位,实现保本止损。

## 策略原理

该策略通过input参数设置长仓追踪止损的百分比,如3%。在开仓后,会实时计算追踪止损价格。计算方法是:

1. 当价格超过入场价*(1+追踪止损百分比),则将止损价格调整至入场价,实现保本。

2. 当价格低于上述水平,则止损价格为入场价*(1-追踪止损百分比)。

这样可以实现当价格达到一定盈利后保本止损,避免盈利全部收益被损失,同时防止过于激进的止损被价格正常波动顶出。

策略还绘制了追踪止损价格的图表进行确认,并设置了只做多头交易。在金叉时做多,死叉时平仓。做多后设置追踪止损单,实现该策略的止损逻辑。

## 优势分析

该策略最大的优势是可以通过追踪止损实现盈利后保本,无论后市如何,至少可以保住本金,避免亏损。这对许多投资者有重要意义。

另外,该策略止损比较温和,追踪止损幅度不是太大,可以防止价格正常波动就被止损出场。这与一般的固定止损相比更加灵活和智能。

## 风险分析

该策略主要风险在于止损幅度设置不当,如果设置太小,则难以实现保本止损;如果设置太大,则容易被价格正常波动顶出场。所以这里需要仔细测试和评估合适的止损幅度。

另一个风险是在异常市场时,价格突然大幅度跳空,这时止损价格可能来不及更新,导致止损无效。不过该概率较小。

## 优化方向 

该策略可以从以下几个方面进行优化:

1. 增加平仓条件,如死叉、价格跌破SMA等规则,使策略更加全面。

2. 加入止损百分比的动态调整机制,在不同市场环境下自动优化止损幅度。

3. 增加离场策略,当价格运行一定距离后退出场外,固定利润。

4. 可以研究不同品种的止损百分比参数差异,建立参数自适应优化机制。

## 总结

追踪止损百分比策略整体来说非常实用,可以有效实现盈利后保本止损,避免亏损。该策略优化空间很大,值得进一步研究提高效果。总体而言,该策略适合追求稳定投资利润的投资者。

||

## Overview

The percentage trailing stop loss strategy is a strategy that sets and adjusts stop loss orders based on percentage of the instrument price. It can adjust the stop loss to the entry price after the price reaches a certain profitable level to realize breakeven stop loss.

## Strategy Logic

This strategy sets the percentage for long position trailing stop loss via input parameters, such as 3%. After opening a position, it calculates the trailing stop loss price in real time. The calculation method is:

1. When the price exceeds entry price*(1+trailing stop loss percentage), the stop loss price is adjusted to entry price to realize breakeven.  

2. When the price is below the above level, the stop loss price is entry price*(1-trailing stop loss percentage).

This can realize breakeven stop loss when the price reaches a certain profit level, avoiding losing all profits by losses, while preventing too aggressive stop loss from being knocked out by normal price fluctuations.

The strategy also plots the trailing stop loss price for confirmation, and sets to only go long. It goes long on golden cross and closes position on death cross. After going long, it sets trailing stop loss orders to realize the stop loss logic.

## Advantage Analysis 

The biggest advantage of this strategy is that it can realize breakeven stop loss after making profits through trailing stop loss, no matter how the later market goes, at least the principal can be kept to avoid losses. This is important for many investors.

In addition, the stop loss of this strategy is relatively mild. The trailing stop loss range is not too large, which can prevent being stopped out by normal price fluctuations compared to fixed stop loss. It is more flexible and intelligent.

## Risk Analysis

The main risk of this strategy is that if the stop loss percentage is set improperly. If set too small, it would be hard to realize breakeven stop loss. If set too large, it would be easy to be stopped out by normal price fluctuations. So the proper stop loss percentage needs careful testing and evaluation.

Another risk is that in abnormal markets, prices may suddenly gap largely. In this case, stop loss price may not be able to update in time, resulting in invalid stop loss. But the probability is relatively small.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Add exit rules such as death cross, price breaking through SMA etc. to make the strategy more comprehensive. 

2. Add dynamic adjustment mechanism of stop loss percentage, to automatically optimize stop loss range in different market environments.

3. Add exit strategies to exit positions after prices running certain range to lock in profits.

4. Research the differences of stop loss percentage parameters on different instruments, establish parameter self-adaptive optimization mechanism.

## Conclusion

The percentage trailing stop loss strategy is very practical overall, which can effectively realize breakeven stop loss after making profits to avoid losses. This strategy has large room for optimization and is worth further researching to improve efficiency. In general, this strategy suits investors pursuing steady investment returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|3|Trail Long Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © osmaras
// based on https://kodify.net/tradingview/orders/percentage-trail/

//@version=5
strategy("Break even stop loss (% of instrument price)", overlay=true)

// Configure trail stop level with input options (optional)
longTrailPerc = input.float(defval=3.0,step=0.1,title="Trail Long Loss (%)")* 0.01 
longCondition = ta.crossover(ta.sma(close, 14), ta.sma(close, 28))

// Determine trail stop loss prices
longStopPrice = 0.0
lastEntryPrice = strategy.opentrades.entry_price(strategy.opentrades - 1)
longStopPrice := if (strategy.position_size > 0 and close > (lastEntryPrice * (1 + longTrailPerc)))
    stopValue = lastEntryPrice
    math.max(stopValue, longStopPrice[1])
else
    longStopPrice := if (strategy.position_size > 0)
        stopValue = lastEntryPrice * (1 - longTrailPerc)
        math.max(stopValue, longStopPrice[1])
    else
        0

// Plot stop loss values for confirmation
plot(series=(strategy.position_size > 0) ? longStopPrice : na,
     color=color.fuchsia, style=plot.style_cross,
     linewidth=2, title="Long Trail Stop")

// set strategy only long
strategy.risk.allow_entry_in(strategy.direction.long)

// Submit entry orders
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))
if (shortCondition)
    strategy.close("Long")


// Submit exit orders for trail stop loss price
if (strategy.position_size > 0)
    strategy.exit(id="Stop Loss", stop=longStopPrice)


```

> Detail

https://www.fmz.com/strategy/438068

> Last Modified

2024-01-08 17:12:46
