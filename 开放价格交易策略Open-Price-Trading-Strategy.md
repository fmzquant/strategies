
> Name

开放价格交易策略Open-Price-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过计算开盘价与收盘价的比率,判断未来价格走势方向。当比率低于1时看涨,比率高于1时看跌。该策略适用于短周期交易。

## 策略原理

该策略的核心指标是开盘价与收盘价的比率:

`x = open / close` 

如果该比率低于1,表示收盘价高于开盘价,看涨信号;如果高于1,表示开盘价高于收盘价,看跌信号。

为平滑信号,取过去N根K线的比率平均值,当平均值低于1时做多,高于1时做空。

## 策略优势

- 使用仅开盘价和收盘价两个最基本参数,非常简单。

- 不需要计算任何指标,降低计算资源需求。

- 仅关注开收盘价格信息,filtering other noise。

- 适合短周期套利,快速出入场。

- 资金利用效率高,可设置较高仓位。

## 风险分析

- 容易产生假信号,片面依赖开收盘价格。

- 无法判断趋势方向,存在反向操作风险。

- 短周期操作容易增加交易频率和手续费。

- 高仓位可能带来较大亏损和回撤。

可考虑以下方式降低风险:

1. 增加成交量等指标过滤信号。

2. 结合趋势指标判断方向。

3. 设置止损止盈策略,控制单笔损失。

4. 优化仓位管理,根据前期收益调整仓位大小。

## 策略优化方向

该策略可以从以下几个方面进行优化:

1. 增加指标或条件过滤交易信号。

2. 结合趋势指标判断大方向。

3. 优化参数设置,平衡交易频率。

4. 加入止损止盈策略,控制风险。

5. 增加仓位管理模块,根据收益情况调整仓位。

## 总结

该策略思路简单易懂,但存在一定盲目交易风险。可通过优化信号过滤条件,判断趋势方向,实现止损止盈等方式提高策略稳定性。整体来说具有改进空间和价值。

||
 

## Overview

This strategy judges future price direction by calculating the ratio between open and close prices. Ratio below 1 signals long, above 1 signals short. It is suitable for short-term trading.

## Strategy Logic 

The core indicator is the open/close price ratio:

`x = open / close`

Ratio below 1 means close > open, long signal. Ratio above 1 means open > close, short signal. 

To smooth signals, take average ratio of past N bars. Average below 1 for long, above 1 for short.

## Advantages

- Uses only two basic prices, very simple.

- No complex indicators, low computing needs.

- Only focuses on open/close prices, filtering noise.

- Good for short scalping with fast entry/exit.

- High capital efficiency for larger position sizes.

## Risks

- Prone to false signals, relies solely on open/close prices.

- No trend direction, risks reversals. 

- High frequency short-term trades increase fees.

- Large positions can lead to big losses and drawdowns.

Improvements:

1. Add filters like volume to validate signals.

2. Incorporate trend indicators for direction. 

3. Implement stop loss/profit taking to limit loss per trade.

4. Optimize position sizing based on prior performance.

## Optimization 

Ways to optimize the strategy:

1. Add more filters or conditions to screen signals.

2. Combine with trend indicators for overall direction.

3. Optimize parameters for better trade frequency.

4. Add stop loss and take profit for risk control.

5. Incorporate position sizing based on performance.

## Summary

The logic is simple but has blind trading risks. Enhancing signal filters, trend direction, stops can improve stability. Overall has potential value for improvements.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-14 00:00:00
end: 2023-09-21 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("PerfectStrategy", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 10)
 

x = ((open[1])/(close[1]))
x1 = ((open[2])/(close[2]))
x2= ((open[3])/(close[3]))
x3 = ((open[4])/(close[4]))
x4 = ((open[5])/(close[5]))
x5 = ((open[6])/(close[6]))
x6 = ((open[7])/(close[7]))
x7 = ((open[8])/(close[8]))
x8 = ((open[9])/(close[9]))

y = (x+x1+x2+x3+x4+x5+x6+x7+x8)/9
if (y < 1 )
    strategy.entry("Up", strategy.long)

if (y > 1)
    strategy.entry("Down", strategy.short)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/427614

> Last Modified

2023-09-22 17:00:25
