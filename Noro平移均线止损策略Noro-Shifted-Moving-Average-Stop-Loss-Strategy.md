
> Name

Noro平移均线止损策略Noro-Shifted-Moving-Average-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13afe8dc93c3ba1c714.png)
[trans]
## 概述

Noro平移均线止损策略是一种趋势跟踪策略。它通过计算3日简单移动平均线,并在其上方和下方加上一个比例作为开仓线和止损线。同时设置了止盈位。这样可以在趋势开始时打开头寸,在趋势反转时止损出场。

## 策略原理  

该策略的核心是计算3日简单移动平均线ma。然后在ma上方加上一个百分比lo作为开仓线long,当价格上穿long时做多;在ma下方减去一个百分比sl作为止损线stop,当价格下破stop时止损。同时设置了止盈线take,当价格达到止盈线时止盈。

具体计算规则如下:

1. 计算3日简单移动平均线ma 
2. 开仓线long = ma + ma * lo%
3. 止盈线take = 当前持仓均价 + 当前持仓均价 * tp%
4. 止损线stop = 当前持仓均价 - 当前持仓均价 * sl%

这样就构建起了一个以ma为基准,通过可配置的百分比来设置开仓线、止盈线和止损线的趋势跟踪策略。

## 优势分析

这种策略最大的优势在于可以自动跟踪趋势运行。通过做多看涨,做空看跌,无需判断面上形态就可以捕捉中间趋势。再配合止盈止损设置,可以在趋势结束时自动止损,避免回撤过大。

另一个优势是参数可以灵活调整。通过调整开仓线、止盈线和止损线的百分比参数,可以自由控制仓位规模和止损空间。

## 风险分析  

该策略最大的风险在于容易形成巨大的滑点。因为其是离场线交易,当价格急速下跌时很容易造成超出止损价格很远才成交的情况。这将会让投资者损失惨重。

另一个风险是参数设置不当可能导致过于频繁出入场,增加交易频率和手续费的负担。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 改为使用限价单止损,避免巨大滑点的风险
2. 增加仓位数设置,可以平滑调仓,降低交易频率
3. 增加趋势判断指标,避免非趋势市场的误操作
4. 优化参数设置,找到最优参数组合

## 总结  

Noro平移均线止损策略是一个简单实用的趋势跟踪策略。它可以自动跟踪趋势运行,配合止盈止损设置有效控制风险。该策略最大的风险在于可能造成较大滑点,以及参数设置不当导致过于频繁交易。通过改进止损方式、优化参数设置等手段,可以将该策略优化得更加实用。

||

## Overview

The Noro Shifted Moving Average Stop Loss Strategy is a trend following strategy. It calculates the 3-day simple moving average line, and sets a long line above it and a stop loss line below it at given percentages. Take profit lines are also set. This allows opening positions when trends start, and stopping out when trends reverse.

## Strategy Logic

The core of this strategy is calculating the 3-day simple moving average line ma. Then a percentage lo is added above ma to get the long line long for entries. When price crosses above long, long positions are opened. Below ma a percentage sl is subtracted to get the stop loss line stop. When price drops below stop, positions are stopped out. There are also take profit lines take set at a percentage tp above the current average holding price.

The specific rules are:

1. Calculate 3-day simple moving average ma
2. Long line long = ma + ma * lo%  
3. Take profit line take = Current average holding price + Current average holding price * tp%
4. Stop loss line stop = Current average holding price - Current average holding price * sl%

This constructs a trend following strategy that sets entry, take profit and stop loss lines based on the ma benchmark and configurable percentages. 

## Advantage Analysis   

The biggest advantage of this strategy is it can automatically track trends. By going long to catch uptrends and short for downtrends without needing pattern recognition, it catches trends. Adding take profit and stop loss further allows it to stop out automatically when trends end to limit drawdowns.

Another advantage is flexible parameter adjustment. By changing the percentages for long, take profit and stop loss, position sizing and stop loss spacing can be easily controlled.

## Risk Analysis

The biggest risk of this strategy is slippage. As a stop order is used for stop loss, in a fast dropping market prices can gap down way below the stop loss before orders are filled. This can lead to catastrophic losses.

Another risk comes from poorly set parameters causing too frequent entries and exits, increasing commission costs. 

## Optimization Directions 

The strategy can be optimized in the following ways:

1. Use limit orders instead of stop orders for stop losses to avoid slippage risks

2. Add position sizing settings to scale in and out smoothly, reducing trade frequency   

3. Add trend detection filters to avoid false signals in non-trending markets

4. Optimize parameter settings to find optimum combinations

## Conclusion   

The Noro Shifted Moving Average Stop Loss Strategy is a simple and practical trend following strategy. It can automatically track trends with take profit and stop loss controlling risk. The biggest risks come from potential slippage and overly frequent trading from poor parameter optimization. By improving stop loss technique and optimizing parameters, the strategy can be made more robust.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-5|Long-line, %|
|v_input_2|5|Take-profit|
|v_input_3|2|Stop-loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-30 00:00:00
end: 2024-01-29 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//2019
//Noro

//@version=4
strategy("Stop-loss", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
lo = input(-5.0, title = "Long-line, %")
tp = input(5.0, title = "Take-profit")
sl = input(2.0, title = "Stop-loss")

//SMA
ma = sma(ohlc4, 3)
long = ma + ((ma / 100) * lo)

//Orders
avg = strategy.position_avg_price
if ma > 0
    strategy.entry("Long", strategy.long, limit = long)
    strategy.entry("Take", strategy.short, 0, limit = avg + ((avg / 100) * tp))
    strategy.entry("Stop", strategy.short, 0, stop = avg - ((avg / 100) * sl))
    
//Cancel order
if strategy.position_size == 0
    strategy.cancel("Take")
    strategy.cancel("Stop")

//Lines
plot(long, offset = 1, color = color.black, transp = 0)
take = avg != 0 ? avg + ((avg / 100) * tp) : long + ((long / 100) * tp)
stop = avg != 0 ? avg - ((avg / 100) * sl) : long - ((long / 100) * sl)
takelinecolor = avg == avg[1] and avg != 0 ? color.lime : na
stoplinecolor = avg == avg[1] and avg != 0 ? color.red : na
plot(take, offset = 1, color = takelinecolor, linewidth = 3, transp = 0)
plot(stop, offset = 1, color = stoplinecolor, linewidth = 3, transp = 0)
```

> Detail

https://www.fmz.com/strategy/440438

> Last Modified

2024-01-30 15:49:34
