
> Name

基于突破范围的多头交易策略Long-Breakout-Range-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略是一种基于价格突破固定回看范围来产生交易信号的策略。当价格突破回看期间的最高价时,进行做多操作;当价格跌破最高价时,进行平仓。可以方便切换做多做空方向。

## 策略原理

1. 设置回看周期参数,例如4天。

2. 计算过去4天的最高价。

3. 当今日最高价突破过去4天最高价时,做多。

4. 当价格无法突破过去4天最高价时,平仓。

5. 通过reverse参数可将做多做空方向进行切换。

## 优势分析

该策略具有以下优势:

1. 突破简单易行,signal明确。

2. 固定突破范围参数,避免复杂参数优化和过度优化。

3. 可方便切换做多做空方向,适应多种市场环境。

4. 回看固定范围过滤了部分噪声,可实现持续跟踪趋势。

5. 无需计算复杂指标,策略简洁高效。

## 风险分析

该策略的主要风险有:

1. 突破范围固定,无法适应市场变化。

2. 未考虑止损,存在超出风险承受的大幅亏损。

3. 固定参数易受市场失效的概率影响。

4. 噪声交易可能过于频繁,提高交易成本。

5. 未进行参数优化,使用默认参数难以达到最佳效果。

## 优化方向

可从以下几个方面进行优化:

1. 对关键参数进行优化,找到最佳参数组合。

2. 加入基于ATR等的动态突破范围计算。

3. 考虑加入移动止损或固定比例止损。

4. 结合趋势指标,避免震荡市场的过度交易。

5. 在更多交易品种中测试参数健壮性。

6. 增加机器学习算法,实现参数自动优化。

## 总结

该策略整体是一个非常简单的基于价格突破的交易策略。通过优化参数范围、加入止损机制、趋势判断等方式进行改进,可以成为一个易于实现且实用的量化策略。

||


## Overview

This is a trading strategy based on generating signals when price breaks out of a fixed lookback range. When price breaks above the highest high of the lookback period, long positions are taken; when price falls below the high, positions are closed. Trade direction can be easily switched.

## Strategy Logic

1. Set lookback period parameter, e.g. 4 days. 

2. Calculate highest high of the past 4 days.

3. Go long when today's high breaks out above this 4-day highest high.

4. Close positions when price fails to break the 4-day highest high.

5. Trade direction can be switched via the reverse parameter.

## Advantage Analysis

Advantages of this strategy:

1. Breakout is simple and signals are clear.

2. Fixed breakout range avoids complex optimization and overfitting.

3. Easily switch between long/short, adaptable to various market conditions.

4. Lookback range filters noise for sustained trend tracking.

5. No complex indicators required, efficient strategy.

## Risk Analysis  

Main risks:

1. Fixed breakout range cannot adapt to market changes.

2. No stop loss exposes strategy to excessive losses beyond risk tolerance.

3. Fixed parameters vulnerable to market regime changes. 

4. Excessive noise trades may increase transaction costs.

5. Lack of parameter optimization prevents achieving optimal results.

## Optimization Directions

Improvements:

1. Optimize key parameters to find best combinations.

2. Introduce dynamic ranges based on ATR etc.

3. Consider adding trailing stop loss or fixed percentage stop loss.

4. Incorporate trend filter to avoid overtrading in ranging markets.

5. Test parameter robustness across more trading instruments. 

6. Add machine learning for automatic parameter optimization.

## Summary

Overall this is a very simple price breakout trading strategy. With enhancements like optimized parameter range, stop losses, trend filters and more, it can become an easy to implement and practical quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|Look Bak|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version = 2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 28/11/2016
// Breakout Range Long Strategy
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Breakout Range Long Strategy Backtest", overlay = true)
look_bak = input(4, minval=1, title="Look Bak")
reverse = input(false, title="Trade reverse")
xHighest = highest(high, look_bak)
pos =	iff(high > xHighest[1], 1, 0)
if (pos == 1 and strategy.position_size == 0 and reverse == false) 
    strategy.entry("Long", strategy.long)
if (pos == 1 and strategy.position_size == 0 and reverse == true) 
    strategy.entry("Short", strategy.short)
if (pos == 0 and strategy.position_size > 0)
    strategy.close("Long")
if (pos == 0 and strategy.position_size < 0)
    strategy.close("Short")
barcolor(strategy.position_size > 0 ? green: strategy.position_size < 0 ? red: blue)   
plotshape(pos, style=shape.triangleup, location = location.belowbar, color = green)
```

> Detail

https://www.fmz.com/strategy/427282

> Last Modified

2023-09-19 17:19:55
