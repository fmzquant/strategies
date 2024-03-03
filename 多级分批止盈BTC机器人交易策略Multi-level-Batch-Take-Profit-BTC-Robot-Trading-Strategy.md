
> Name

多级分批止盈BTC机器人交易策略Multi-level-Batch-Take-Profit-BTC-Robot-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13a561d3edc5c4ee6bc.png)

[trans]

## 概述

该策略是一种多级分批止盈的BTC机器人交易策略。它通过寻找最低点进行买入entry,然后设置多级止盈点进行分批止盈出场exit。同时设置止损点进行风险控制。该策略适合看涨BTC的情形。

## 策略原理

1. 寻找入场时机:当CC指标下穿0轴时产生买入signal,在该点买入多单。

2. 设置止损点:通过input设置止损百分比,转换成价位进行止损。

3.  设置多级止盈点:分为4个出场点,通过input设置各个出场点的止盈百分比,转换成价位进行分批止盈。

4. 风险控制:设置最大持仓量,通过input设置每个出场点的出场量百分比,进行风险分散。

## 优势分析

这种策略具有以下优势:

1. 入场信号比较可靠,寻找最低点买入,避免在高点买入。

2. 多级止盈可以锁定部分利润,同时保留一部分利润继续运行。

3. 设置止损点进行风险控制,可以把亏损控制在一定范围内。

4. 分批出场可以进行风险分散,避免一次全部亏损。

5. 回撤可以得到一定程度的控制。

## 风险分析

该策略也存在以下风险:

1. CC指标无法百分百确定最低点,可能会漏买入机会。

2. 止损点设置不当可能造成不必要的止损。

3. 分批出场设置不当也可能造成利润的损失。

4. 震荡行情中止盈会比较困难。

5. 行情剧烈反转时,可能难以止损。

## 优化方向

可以从以下几个方面进行优化:

1. 优化入场信号,加入更多指标或者机器学习判断来确定买入时机。

2. 优化止损策略,使其更具有弹性,能更好地应对行情。

3. 优化出场策略,使其能更好适应震荡和趋势行情。

4. 加入trailing stop等策略,使止盈更具弹性。

5. 测试不同品种参数设置,寻找最佳参数组合。

## 总结

本策略总体来说是一个基于寻找最低点买入信号,并设置多级止盈和止损的BTC交易策略。它具有一定的优势,同时也存在可以优化的方向。通过进一步优化,可以使策略在回撤控制和止盈方面做的更好。但总的来说,该策略为BTC的机器人交易提供了一个可行的思路。

||

## Overview

This is a multi-level batch take profit BTC robot trading strategy. It enters long positions by finding the lowest point and sets multiple take profit points for batch exits. It also sets a stop loss point for risk control. This strategy is suitable when being bullish on BTC.

## Strategy Logic

1. Find entry signals: Generate buy signals when the CC indicator crosses below 0. Buy long positions at this point.

2. Set stop loss: Set stop loss percentage through input, convert to price level for stop loss.

3. Set multiple take profit points: 4 exit points, set take profit percentage for each point through input, convert to price levels. 

4. Risk control: Set maximum position size, set exit percentage for each exit point through input for risk dispersion.

## Advantage Analysis 

The advantages of this strategy are:

1. Reliable entry signal by buying at the lowest point, avoiding buying at highs.

2. Multi-level take profit locks in partial profits while keeping some profits running.

3. Stop loss controls risk and limits losses to a certain range. 

4. Batch exits disperses risks, avoiding full losses all at once.

5. Drawdown can be controlled to some extent.

## Risk Analysis

The risks of this strategy are:

1. CC indicator cannot fully ensure the lowest point, may miss buying opportunities.

2. Improper stop loss setting may cause unnecessary stop loss. 

3. Improper batch exits may also lead to loss of profits.

4. Take profit is more difficult in ranging markets.

5. It may be hard to stop loss in sharp reversals.

## Optimization Directions

Potential optimizations:

1. Optimize entry signals with more indicators or machine learning for better timing.

2. Optimize stop loss strategy to make it more elastic against market moves.

3. Optimize exits for better adaptation in ranging and trending markets.  

4. Add trailing stops for more flexible take profits.

5. Test different assets for best parameter sets.

## Conclusion

In summary, this is a BTC trading strategy based on buying at lowest points with multi-level take profits and stop loss. It has certain advantages and also areas that can be improved. Further optimizations on drawdown control and take profit could make the strategy perform better. Overall it provides a viable approach for BTC algorithmic trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Strategy Direction: long|short|all|
|v_input_2|W|higherTF|
|v_input_3|2|factor|
|v_input_4|21|length|
|v_input_5|15| stop loss|
|v_input_6|25| qty_percent1|
|v_input_7|25| qty_percent2|
|v_input_8|25| qty_percent3|
|v_input_9|3| Take profit1|
|v_input_10|5| Take profit2|
|v_input_11|7| Take profit3|
|v_input_12|10| Take profit4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-10-17 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
args: [["v_input_1",2]]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RafaelZioni


// © theCrypster 2020

//@version=4
// strategy(title = "BTC bot", overlay = true, pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.075)
strat_dir_input = input(title="Strategy Direction", defval="long", options=["long", "short", "all"])
strat_dir_value = strat_dir_input == "long" ? strategy.direction.long : strat_dir_input == "short" ? strategy.direction.short : strategy.direction.all
strategy.risk.allow_entry_in(strat_dir_value)
//INPUTS
higherTF = input("W", type=input.resolution)
pc = security(syminfo.tickerid, higherTF, close[1], lookahead=true)
ph = security(syminfo.tickerid, higherTF, high[1], lookahead=true)
pl = security(syminfo.tickerid, higherTF, low[1], lookahead=true)

PP = 0.0,R1 = 0.0, R2 = 0.0, R3 = 0.0,S1 = 0.0, S2 = 0.0, S3 = 0.0

PP := (ph + pl + pc) / 3
R1 := PP     + (PP   - pl)
S1 := PP     - (ph - PP)
R2 := PP     + (ph - pl)
S2 := PP     - (ph - pl)
factor=input(2)
R3 := ph  + factor * (PP   - pl) 
S3 := pl   - 2 * (ph - PP) 

// 
length=input(21)
//
p = close
vrsi = rsi(p, length)
pp=ema(vrsi,length)
d=(vrsi-pp)*5
cc=(vrsi+d+pp)/2
//
low1=crossover(cc,0)

sell=crossover(close[1],R3) 
//
l = low1
s=sell
if l 
    strategy.entry("buy", strategy.long)
if s 
    strategy.entry("sell", strategy.short)
per(pcnt) =>
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss=input(title=" stop loss", defval=15, minval=0.01)
los = per(stoploss)
q1=input(title=" qty_percent1", defval=25, minval=1)
q2=input(title=" qty_percent2", defval=25, minval=1)
q3=input(title=" qty_percent3", defval=25, minval=1)
tp1=input(title=" Take profit1", defval=3, minval=0.01)
tp2=input(title=" Take profit2", defval=5, minval=0.01)
tp3=input(title=" Take profit3", defval=7, minval=0.01)
tp4=input(title=" Take profit4", defval=10, minval=0.01)
strategy.exit("x1", qty_percent = q1, profit = per(tp1), loss = los)
strategy.exit("x2", qty_percent = q2, profit = per(tp2), loss = los)
strategy.exit("x3", qty_percent = q3, profit = per(tp3), loss = los)
strategy.exit("x4", profit = per(tp4), loss = los)

```

> Detail

https://www.fmz.com/strategy/429563

> Last Modified

2023-10-18 11:12:39
