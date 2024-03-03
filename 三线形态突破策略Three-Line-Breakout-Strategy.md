
> Name

三线形态突破策略Three-Line-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于三线形态表示法改进而来。它由收盘价组成的两条线构成一个“云”形态。如果处于多头趋势时价格跌破云底部,则开始新的空头趋势;如果处于空头趋势时价格突破云顶部,则开始新的多头趋势。该策略属于纯价格行为策略,可以与超级趋势等指标组合使用。

## 策略原理

1. 定义当前价格xu,以及用于绘制三线形态的xu1、xu2、xu3。 

2. 判断价格作为三线形态绘制的上下限,更新xu1、xu2、xu3。

3. xu突破xu3则开始空头;xu突破xu1则开始多头。

4. 绘制以xu、xu3为上下限的云形态。

5. 可选择正向交易或反向交易。

6. 突破云时做多做空,返回云内时平仓。

## 优势分析

该策略主要优势:

1. 基于纯价格行为,不受外部指标影响。

2. 三线形态清晰直观,容易判断操作。

3. 可配置反向交易,适用于看跌机会。

4. 容易与趋势及其他指标组合使用。

5. 回测及可视化方便,容易掌握及优化。

## 风险分析

该策略主要风险: 

1. 纯价格行为易受突发事件影响产生假突破。

2. 没有止损设置,存在较大损失风险。

3. 没有考虑交易费用的影响。

4. 参数固定,不同品种效果可能存在差异。

5. 没有考虑连续突破的情况。

6. 反向交易时需谨慎,可能与大趋势相违。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 设置止损策略,优化止损点位。

2. 考虑交易费用的影响。

3. 测试不同品种参数效果,建立参数优化。

4. 优化形态突破判定逻辑,处理连续突破。

5. 增加与趋势指标的组合,避免逆势。 

6. 加入仓位数量控制。

7. 扩大回测时间范围,验证稳健性。

## 总结 

三线形态突破策略直观易操作,基于价格行为判断产生交易信号。结合趋势及其他指标可以增强策略效果。通过加入止损、优化参数和逻辑、仓位控制等,可以将其改进为一个较稳定的短线交易策略。

||

## Overview

This strategy is based on a modified three line break chart. Two lines made of closing prices form a "cloud" shape. Breakout below the cloud signals a new bearish trend. Breakout above the cloud signals a new bullish trend. It is a price action strategy that can be combined with trend filters like SuperTrend.

## Strategy Logic  

1. Define current price xu, xu1, xu2, xu3 for plotting three lines.

2. Update xu1, xu2, xu3 based on price as upper/lower band.

3. xu breaking xu3 starts a short trend, breaking xu1 starts a long trend.

4. Plot cloud band using xu and xu3. 

5. Option to trade in reverse direction.

6. Enter on cloud breakouts, exit on returning inside cloud.

## Advantage Analysis

The advantages of this strategy are:

1. Based purely on price action, unaffected by indicators.

2. Clear and intuitive three line pattern. 

3. Flexibility to trade reversals.

4. Easy to combine with trends and other indicators.

5. Easy backtesting and visualization for refinement.

## Risk Analysis

The main risks of this strategy are:

1. Price patterns prone to false breakouts from events.

2. No stop loss exposes to large losses.

3. Ignores trading costs. 

4. Fixed parameters may not suit different products.

5. Doesn't account for consecutive breakouts.

6. Reversal trading risky against major trends. 

## Optimization Directions 

The strategy can be improved by:

1. Adding stop loss and optimizing stops.

2. Accounting for trading costs.

3. Testing parameters for different products. 

4. Improving breakout logic for consecutive breaks.

5. Adding trend filter to avoid counter-trend trades.

6. Controlling position sizing.

7. Expanding backtest period for robustness.

## Summary

The three line breakout strategy provides intuitive signals based on price patterns. It can be strengthened by adding trends, indicators, stops, optimized logic and parameters, and position sizing. This can transform it into a robust short-term trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-22 00:00:00
end: 2023-09-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 31/05/2019
// This is a modified version of the three line break price representation. 
// It is composed with 2 lines made of Close price values forming a “cloud”.
//    If the trend is bullish and the price breach the lower level of the green 
//       cloud, a new bearish trend is taking place.
//    If the current trend is bearish and the price breakout the upper band of 
//       the cloud, a new bullish trend is forming.
// This is a “price action” indicator, signals may be filtered by long term trend 
// analysis with other indicators such as Supertrend for instance.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Three Line Break", overlay = true)
reverse = input(false, title="Trade reverse")
xtrend = 1
xu = close
xu1 = close
xu2 = close
xu3 = close
if xtrend[1] == 1
    if close > xu[1]
        xu3 := xu2[1]
        xu2 := xu1[1]
        xu1 := xu[1]
        xu := close
        xtrend := 1
    else 
        if close < xu3[1]
            xu3 := xu1[1]
            xu2 := xu1[1]
            xu1 := xu1[1]
            xu := close
            xtrend := -1        
        else
            xtrend := 1
else
    if close > xu3[1]
        xu3 := xu1[1]
        xu2 := xu1[1]
        xu1 := xu1[1]
        xu := close
        xtrend := 1
    else
        if close < xu[1] 
            xu3 := xu2[1]
            xu2 := xu1[1]
            xu1 := xu[1]
            xu := close
            xtrend := -1
        else
            xtrend := -1
colorm = xtrend == -1 ? red: xtrend == 1 ? green : blue 
possig = iff(reverse and xtrend == 1, -1,
          iff(reverse and xtrend == -1, 1, xtrend))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 		
p1 = plot(xu, color=colorm)
p2 = plot(xu3, color=colorm)
fill(p1, p2, color=colorm)
```

> Detail

https://www.fmz.com/strategy/427684

> Last Modified

2023-09-23 16:02:20
