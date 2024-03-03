
> Name

双均线趋势跟踪策略Dual-Moving-Average-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略使用长期RMA均线和短期EMA均线组合进行趋势判断,并以高低点突破实现趋势跟踪止损。还设置了无交易区间来过滤假突破。

## 策略原理

1. 使用长周期RMA和短周期EMA判断趋势方向。短期EMA下穿长期RMA为看空信号,上穿为看多信号。

2. 当价格突破最近一定周期的最高价时,采取跟踪最高价的方式止损。当价格突破最近一定周期的最低价时,采取跟踪最低价的方式止损。

3. 设置无交易区间,价格进入该区间则不开仓,避免被套。区间范围由RMA均线的一定比例确定。

4. 入场后设置止盈价格,以一定比例退出盈利。

## 策略优势

1. 双均线组合判断趋势方向准确可靠。

2. 跟踪止损方式使止损追随趋势运行。

3. 设置无交易区间有效过滤假突破信号。

4. 止盈设置让策略在积累足够盈利后主动平仓。

## 策略风险

1. 双均线产生死叉时可能存在延迟,导致亏损扩大。

2. 跟踪止损点过于靠近价格可能被前期噪音击出。

3. 无交易区间设置过宽导致错过交易机会。

4. 没有及时止损可能导致亏损进一步扩大。

对应解决方法:

1. 优化均线参数,降低延迟概率。

2. 适当放宽止损点,防止过于灵敏。

3. 测试调整无交易区间范围,防止错过机会。

4. 添加其他止损方式,限制最大亏损。

## 策略优化方向

1. 测试其他均线指标组合,寻找更匹配的组合。

2. 增加价差、MACD等判断指标,提高策略稳定性。 

3. 引入机器学习算法优化参数,使策略更智能化。

4. 结合趋势强弱指标,避免逆势交易。

5. 优化资金管理策略,提高策略胜率。

## 总结

本策略利用双均线判断趋势方向,并以高低点跟踪止损与无交易区间过滤来锁定趋势获利。策略框架简单清晰,可扩展性强,可通过调整参数区间、优化止盈止损策略、引入其他辅助判断指标等方式进行优化,使策略在不同市场中都能发挥良好效果。

|| 

## Overview

This strategy uses long-term RMA and short-term EMA crossovers to determine trend direction. It trails recent highest high or lowest low for stop loss. There is also a no-trade zone around the RMA to avoid false breaks.

## Strategy Logic

1. Use long period RMA and short period EMA to determine trend. Short EMA crossing below long RMA signals downtrend. Crossing above signals uptrend.

2. When price breaks above recent highest high over certain periods, trail the highest high as stop loss. When price breaks below recent lowest low, trail the lowest low as stop loss.

3. Set a no-trade zone around the RMA. Do not open positions when price is within the zone to avoid whipsaws. Zone range is based on certain percentage of RMA value.

4. Set take profit price to exit positions at a profit percentage after entry.

## Advantages

1. Dual moving average crossover reliably determines trend direction.

2. Trailing stop loss moves with the trend. 

3. No-trade zone filters fake breakout signals.

4. Take profit allows strategy to actively close profitable trades.

## Risks

1. Delay in moving average crossovers may increase losses.

2. Stop loss too close to price may get stopped out by noise.

3. No-trade zone too wide may miss opportunities. 

4. Not stopping out in time can lead to further losses.

Possible Solutions:

1. Optimize moving average parameters to reduce delay.

2. Widen stop loss slightly to prevent oversensitivity.

3. Test adjusting no-trade zone range to avoid missing trades. 

4. Add other stop loss mechanisms to limit max loss.

## Optimization Directions

1. Test other moving average combinations for better fit.

2. Add spread, MACD etc to improve stability.

3. Use machine learning to optimize parameters intelligently.

4. Incorporate trend strength to avoid counter-trend trades.

5. Optimize money management for higher win rate.

## Summary

This strategy uses dual moving average crossovers to determine trend direction and combines trailing stops and no-trade zones to lock in trend profits. The framework is simple and extensible. It can be improved by adjusting parameter ranges, optimizing exits, and incorporating additional filters and signals to make it robust across different markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|55|quick ma's|
|v_input_int_2|100|long ma's|
|v_input_int_3|3|leverage|
|v_input_int_4|170|Highest high period|
|v_input_int_5|170|Lowest low period|
|v_input_float_1|3|no trade zone|
|v_input_float_2|6.9|take profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-24 00:00:00
end: 2023-09-12 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PatrickGwynBuckley

//@version=5
//var initialCapital = strategy.equity

strategy("PB Trend Scalper", "PB Trend Scalper", overlay = true)
shortma = input.int(55, title="quick ma's")
longma = input.int(100, title="long ma's")
ema55h = ta.ema(high, shortma)
ema55l = ta.ema(low, shortma)
ema200h = ta.rma(high, longma)
ema200l = ta.rma(low, longma)
stock = ta.stoch(close, high, low, 14)

lev = input.int(3, title="leverage")
hhVal = input.int(170, title="Highest high period")
llVal = input.int(170, title="Lowest low period")

hh = ta.highest(high, hhVal)
ll = ta.lowest(low, llVal)
//plot(stock)

plot(hh, color=color.new(color.green, 50))
plot(ll, color=color.new(color.red, 50))
var float downtrade = 0
p = input.float(3.0, title="no trade zone")
l = 3
emadistlong = ema200h + ((ema200h/100)*p)
emadistshort = ema200l - ((ema200h/100)*p)

plot(ema55h)
plot(ema55l)
ntl = plot(emadistlong, color=color.new(color.red, 10))
nts = plot(emadistshort, color=color.new(color.red, 10))
fill(ntl, nts, color=color.new(color.red, 90))

//position size

EntryPrice = close
//positionValue = initialCapital
positionSize = (strategy.equity*lev) / EntryPrice

//plot(strategy.equity)


//standard short

if ema55h < ema200l and close[2] < ema55l and close[1] > ema55l and high[1] < ema55h and close < ema55h and ema55h < emadistshort and strategy.opentrades == 0// and stock > 85 
    strategy.entry("short", strategy.short, qty=positionSize, comment="short")
    downtrade := 1

//reset count    
if (ta.crossunder(ema55h, ema200l)) and downtrade == 1
    downtrade := 0

//standard long    
if ema55l > ema200h and close[2] > ema55h and close[1] < ema55h and low[1] > ema55l and close > ema55l and ema55l > emadistlong and strategy.opentrades <= 1// and stock < 15 
    strategy.entry("long", strategy.long, qty=positionSize, comment="long")
    downtrade := 0

//RESET COUNT ON MA CROSS
if (ta.crossover(ema55l, ema200h)) and downtrade == 0
    downtrade := 1
    
longclose2 = low < ll[1] or low < emadistshort //close < open and open<open[1] and open[2] < open[3] and open[3] < emadistshort//close < ta.lowest(low, 20)//
shortclose2 = high > hh[1] or high>emadistlong//close > open and open>open[1] and open[2]>open[3] and open[3] > emadistlong//high > emadistlong//close > ta.highest(high, 20)//

sl = 3.5
tp = input.float(6.9, title="take profit %")
tp2 = 10


strategy.exit("long exit", "long", profit = (strategy.position_avg_price*(tp)))//, loss = (strategy.position_avg_price*(sl)))
strategy.close("long", when = longclose2, comment = "long exit")
//strategy.close("long", when = (downtrade == 1), comment = "long exit")
//strategy.exit("long exit", "long2", profit = (strategy.position_avg_price*(tp2)))//, loss = (strategy.position_avg_price*(sl)))
//strategy.close ("long2", when = longclose2, comment = "long exit")
//strategy.close("long", when = (downtrade == 1), comment = "long exit")

strategy.exit("short exit", "short", profit = (strategy.position_avg_price*(tp)))//, loss = (strategy.position_avg_price*(sl)))//, loss = 300)
strategy.close("short", when = shortclose2, comment = "short exit")
//strategy.close("short", when = (downtrade == 0), comment = "short exit")
//strategy.exit("short exit", "short2", profit = (strategy.position_avg_price*(tp2)))//, loss = (strategy.position_avg_price*(sl)))
//strategy.close ("short2", when = shortclose2, comment = "short exit")
//strategy.close("short2", when = (downtrade == 0), comment = "short exit")

//if (strategy.exit("long exit", "long"))
    //downtrade := 1
//else 
   // downtrade := 0
```

> Detail

https://www.fmz.com/strategy/427729

> Last Modified

2023-09-24 13:14:08
