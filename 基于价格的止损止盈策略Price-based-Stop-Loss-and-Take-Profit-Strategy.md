
> Name

基于价格的止损止盈策略Price-based-Stop-Loss-and-Take-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12bb1510a399a4a6552.png)
[trans]

## 概述

本策略的核心思想是利用输入的止损止盈金额,来设置合理的止损止盈点数,对每笔交易进行风险和收益的管理。

## 策略原理

该策略首先设置了随机的入场信号,当SMA14上穿SMA28的时候做多,当SMA14下穿SMA28的时候做空。

在入场后,策略利用moneyToSLPoints函数,根据输入的止损金额,计算出对应的止损点数,同理也计算出止盈点数。这样就实现了基于美元金额的止损止盈设置。

例如,如果入场做多100手,每点值10美元,止损设置为100美元,那么止损点数就设置为100/10/100=0.1点。

最后用strategy.exit设置止损止盈出场点。同时画出止损线和止盈线的图形作为调试参考。

## 优势分析

这种基于价格止损止盈的策略,最大的优势是参数设置直观,可以直观的看到风险和收益的关系,进行参数选择。

另外,相对于点数止损,美元止损可以更好的控制实际的风险敞口。当市场波动加大的时候,美元止损可以更好的保护资金。

## 风险分析

这种止损止盈策略也存在一定风险:

1. 止损点过宽容易被套。如果止损距离过远,行情短线反转的概率就比较大,很容易被套住无法止损。

2. 止盈点过近难以获利。如果止盈距离太近,正常的单边行情都无法达到,很难盈利。

3. 需要合理选择合约。如果选择的是点值太大的合约,例如原油,那么同样的美元止损,对应的点数就会很小,在市场波动中很容易被刮出。这就需要合理选择点值。

## 优化方向 

这种策略可以从以下几个方面进行优化:

1. 入场信号可以优化,例如结合趋势、波动率、季节性等选择更优入场时机。

2. 可以根据不同品种,选择合适的止损止盈百分比。例如大宗商品可以设置更宽松的止损。

3. 可以结合波动率,当波动加大时适当放宽止损;当波动减小时适当收紧止损。

4. 可以根据交易日内不同时段选择不同的止损止盈策略。例如美国交易时段收紧止损,减少被套概率。

## 总结

本策略以美元金额为参数,实现了直观的止损止盈功能。该策略优势是参数选择和资金控制直观明了,缺点是容易被套和难以获利。我们可以从入场时机、止损止盈参数优化、合约选择等方面进行改进,使策略更稳定盈利。

||


## Overview

The core idea of this strategy is to use the input stop loss and take profit amounts to set reasonable stop loss and take profit tick levels, to manage the risk and reward of each trade.

## Strategy Logic

The strategy first sets random entry signals, going long when SMA14 crosses over SMA28, and going short when SMA14 crosses under SMA28.

After entry, the strategy uses the moneyToSLPoints function to calculate the stop loss tick level based on the stop loss dollar amount input. Similarly, it also calculates the take profit tick level. This implements stop loss and take profit based on dollar amounts.

For example, if going long 100 contracts with each tick worth $10, and stop loss is set at $100, then the stop loss tick level would be calculated as 100/10/100 = 0.1 ticks.

Finally strategy.exit is used to set the stop loss and take profit exit points. The stop loss and take profit lines are also plotted for debugging purposes.

## Advantage Analysis

The biggest advantage of this price-based stop loss and take profit strategy is that the parameters are intuitive. The relationship between risk and reward can be clearly seen to guide parameter selection.

Also, dollar-amount stops can better control actual risk exposure compared to fixed tick stops when market volatility changes.

## Risk Analysis

There are some risks with this stop loss and take profit strategy:

1. If the stop loss is too wide, it's easy to get caught on reversals. If the stop distance is too big, short term reversals become likely and can catch the trade.

2. If the take profit is too close, it may be hard to reach. If the take profit distance is very small, it would be hard for normal one-sided trends to reach it, making profits unlikely.

3. Appropriate contracts need to be chosen. If a high tick value contract like Crude Oil is used, the same dollar stop loss would translate to very little ticks, which can easily get stopped out on noise.

## Optimization Directions

Some ways this strategy can be improved on:

1. The entry signal can be enhanced by combining trend, volatility, seasonality etc. to time entries better.  

2. Appropriate stop/profit percentages can be chosen based on different products. Larger stops can be used in highly volatile commodities.

3. Stops can adapt to volatility. Widen when volatility rises and tighten when volatility falls.

4. Different stop/profit approaches can be used for different trading sessions. Tighter stops can be used during US session to reduce chance of being caught in whipsaws.

## Conclusion

This strategy implements intuitive stop loss and take profit based on dollar amounts. Its advantages are intuitive parameters and capital control. Drawbacks are ease of being caught in reversals and missing profits. It can be improved by enhancing entries, optimizing stops/targets, choosing better products etc. to make it more stable.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|Take Profit $$|
|v_input_2|100|Stop Loss $$|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-15 00:00:00
end: 2023-11-22 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © adolgov

// @description
// 

//@version=4
strategy("Stop loss and Take Profit in $$ example", overlay=true)

// random entry condition

longCondition = crossover(sma(close, 14), sma(close, 28))
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = crossunder(sma(close, 14), sma(close, 28))
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)

moneyToSLPoints(money) =>
    strategy.position_size !=0 ? (money / syminfo.pointvalue / abs(strategy.position_size)) / syminfo.mintick : na

p = moneyToSLPoints(input(200, title = "Take Profit $$"))
l = moneyToSLPoints(input(100, title = "Stop Loss $$"))
strategy.exit("x", profit = p, loss = l)

// debug plots for visualize SL & TP levels
pointsToPrice(pp) =>
    na(pp) ? na : strategy.position_avg_price + pp * sign(strategy.position_size) * syminfo.mintick
    
pp = plot(pointsToPrice(p), style = plot.style_linebr )
lp = plot(pointsToPrice(-l), style = plot.style_linebr )
avg = plot( strategy.position_avg_price, style = plot.style_linebr )
fill(pp, avg, color = color.green)
fill(avg, lp, color = color.red)
```

> Detail

https://www.fmz.com/strategy/433010

> Last Modified

2023-11-23 15:36:00
