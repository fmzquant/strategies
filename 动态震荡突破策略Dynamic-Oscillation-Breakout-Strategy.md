
> Name

动态震荡突破策略Dynamic-Oscillation-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a76ebd0257ec137d11.png)
[trans]


## 概述

该策略采用动态震荡通道突破的方式,根据价格的动态变化来确定入市和止损点。策略简单易懂,适合对趋势股进行操作。

## 策略原理

该策略首先计算20天内的最高价和最低价,得到动态震荡通道。然后计算8日指数移动平均线和32日指数移动平均线,当价格收盘价突破通道上轨,且8日均线高于32日均线时,做多;当价格跌破通道下轨或8日均线下穿32日均线时,平仓。 止损方式为价格低于通道中轨时止损。

具体来说,策略的入市条件是:

1. 收盘价突破20日内最高价构成的动态上轨

2. 8日均线高于32日均线

策略的退出条件是:

1. 价格低于通道中轨时止损

2. 8日均线下穿32日均线时平仓

该策略利用动态通道判断趋势方向,同时辅以均线判断目前处于上升趋势,可以有效控制风险。

## 策略优势

- 利用动态通道突破判断趋势方向,不易被困在震荡市中
- 8日与32日均线组合可以有效判断趋势,避免错误交易
- 策略规则简单清晰,容易理解实现
- 止损方式比较稳定可靠

## 策略风险

- 突破失败可能造成亏损
- 动态通道参数设置不当可能导致通道过于宽泛或过于窄小
- 均线参数设置不当也会影响判断效果
- 止损点过近可能造成止损过度

可以通过调整通道周期参数、均线周期参数、以及合理设置止损来优化策略,控制风险。

## 策略优化方向 

- 可以根据不同股票特性优化通道周期参数
- 可以测试不同均线组合,寻找更佳的参数
- 可以结合交易量来确认突破效果
- 可以在突破后追踪止损点

## 总结

动态震荡突破策略整体思路清晰易懂,以动态通道判断趋势方向,然后利用均线过滤效果进行入市。设置止损可以有效控制风险。通过参数优化可以提高策略Profit Factor。该策略适用于具有突破continuation效应的股票,尤其适合于创新高向上突破的场景。

||


## Overview

This strategy adopts dynamic oscillation channel breakout to determine entry and stop loss points based on price movement. The strategy is simple and suitable for momentum stocks.

## Strategy Logic

The strategy first calculates the highest high and lowest low over the past 20 days to obtain a dynamic oscillation channel. Then it calculates the 8-day and 32-day exponential moving averages. When the closing price breaks through the upper band of the channel and the 8-day EMA is above the 32-day EMA, it goes long. When the price breaks through the lower band or the 8-day EMA crosses below the 32-day EMA, it exits. The stop loss is set below the middle band of the channel. 

Specifically, the entry conditions are:

1. The closing price breaks through the dynamic upper band formed by the highest high over past 20 days.

2. The 8-day EMA is above the 32-day EMA.

The exit conditions are:

1. Stop loss triggered when price drops below the middle band.

2. The 8-day EMA crosses below the 32-day EMA.

The strategy identifies trend direction using the dynamic channel and current uptrend status using the EMA crossover. This helps control risk.

## Advantages

- Dynamic channel breakout identifies trend direction effectively, avoiding whipsaws.
- 8-day and 32-day EMA crossover filters trades well. 
- Simple and clear rules, easy to understand.
- Reasonable stop loss mechanism.

## Risks

- Failed breakout may cause losses.
- Improper parameter tuning of channel range may cause it to be too wide or too narrow.
- Improper EMA periods may impact performance.
- Stop loss too tight may cause excessive stops.

The risks can be managed by optimizing channel period, EMA periods, and stop loss positioning.

## Improvement Areas

- Optimize channel period for different stocks.
- Test different EMA combinations to find optimal periods. 
- Incorporate volume to confirm breakouts.
- Trail stop loss after entry.

## Summary  

The dynamic oscillation breakout strategy has clear logic to identify trend and enter based on channel breakout and EMA crossover. The stop loss helps control risk. Parameter tuning such as channel period and EMA periods can improve profit factor. This strategy works well for stocks with continuation patterns, especially breaking previous highs.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-09 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Robrecht99

//@version=5
strategy("My Strategy", overlay=true, margin_long=100, margin_short=100)

fast = ta.sma(close, 8)
slow = ta.sma(close, 32)

plot(fast, color=color.red)
plot(slow, color=color.navy)

entrycondition1 = ta.crossover(fast, slow)
entrycondition2 = fast > slow
sellcondition1 = ta.crossunder(fast, slow)
sellcondition2 = slow > fast

atr = ta.atr(14)

//Donchian Channels
days = 20
h1 = ta.highest(high[1], days)
l1 = ta.lowest(low[1], days)
mid = math.avg(h1, l1)
plot(mid, "channel", color=#FF6D00)
u = plot(h1, "Upper", color=#2962FF)
l = plot(l1, "Lower", color=#2962FF)
fill(u, l, color.new(color.blue, 90))

if (close > h1 and entrycondition2)
    strategy.entry("long", strategy.long)
    stoploss = close - atr * 3
    trail = close - atr * 3
    strategy.exit("exit", "long", stop=stoploss, trail_offset=trail)
if (sellcondition1 and sellcondition2)
    strategy.close(id="long")

```

> Detail

https://www.fmz.com/strategy/432332

> Last Modified

2023-11-16 15:40:25
