
> Name

双移动平均交叉交易策略Dual-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1443468f96b341f7ce8.png)
[trans]


## 概述

该策略利用双移动平均线的交叉作为交易信号,结合ATR止损来进行趋势跟踪交易。其核心思想是当短期移动平均线上穿长期移动平均线时做多,下穿时做空,同时利用ATR来设置止损位, dynamically trailing stops.

## 策略原理

该策略主要通过两组移动平均线来判断趋势方向。快速移动平均线长度为25天,慢速移动平均线长度为100天。当快速移动平均线上穿慢速移动平均线时产生买入信号;当快速移动平均线下穿慢速移动平均线时产生卖出信号。

为了过滤掉部分假信号,策略增加了一个交叉次数计数器crossCount。只有当快速移动平均线在lookback期间(默认25天)内交叉次数少于maxNoCross时(默认为10次),才会触发信号。

此外,策略还增加了一个确认机制,即在初始信号发出后,如果价格重新进入两条移动平均线之间,也会确认该信号。

在入场后,策略利用ATR指标来设定止损距离。ATR测量过去一定周期内的价格波动范围,这里用ATR的14倍来设置止损距离。止损线会随着价格走势进行浮动追踪。

## 优势分析

该策略具有以下几点优势:

1. 使用双移动平均线结合交叉滤波机制,可以有效过滤假信号,抓住较强势力的趋势。

2. 增加确认机制,避免被假突破凋空。

3. 利用ATR浮动追踪止损,可以最大限度锁住盈利,防止承担过大回撤。

4. 方便优化的参数较少,容易实施。

5. 可在多种市场中应用,包括数字货币和传统基础市场。

6. 综合利用多种指标进行策略构建,使得策略较为稳健。

## 风险分析

该策略主要存在以下风险:

1. 在震荡盘整阶段,移动平均线交叉频繁,容易造成多次亏损。

2. ATR参数设置不当可能造成止损过于宽松或过于紧致。

3. 大幅度跳空或Gap可能直接触发止损。

4. 突发重大事件导致价格剧烈波动也可能直接止损。

5. 移动平均线参数不合理可能导致错过趋势或产生太多假信号。

6. 近期价格波动范围变化可能导致ATR止损距离不适应。

## 优化方向

该策略可以从以下几个方面进行进一步优化:

1. 对移动平均线参数进行优化,找到更合适的组合。可以测试不同周期参数及权重移动平均。

2. 测试不同的ATR周期参数,找到更好的止损距离。

3. 增加附加过滤条件,如交易量放大,震荡指标等,提高信号质量。

4. 结合趋势判断指标,避免在震荡行情中被套。

5. 增加机器学习算法,通过历史数据训练,自动优化参数组合。

6. 在大级别图表中寻找更多确认,避免被短线噪音误导。

7. 设定盈利头寸减仓规则,逐步锁定利润。

## 总结

本策略整合运用双移动平均线交叉、趋势过滤、确认机制和ATR动态止损等多种技术指标。在参数优化和风险控制方面还有提升空间,但其交易思路简单清晰,容易实施复制,是一种较为稳健的趋势跟踪策略。


||


## Overview

This strategy uses the crossover of dual moving averages as trading signals, combined with ATR stops for trend following trading. The core idea is to go long when the fast moving average crosses above the slow moving average, and go short when crossing below, while using ATR to set stop loss levels for dynamically trailing stops.

## Strategy Logic

The strategy mainly uses two sets of moving averages to determine the trend direction. The fast moving average has a length of 25 days, and the slow moving average has a length of 100 days. A buy signal is generated when the fast MA crosses above the slow MA, and a sell signal is generated when crossing below.

To filter out some false signals, the strategy adds a crossover counter called crossCount. Signals are only triggered when the number of crosses for the fast MA in the lookback period (default 25 days) is less than maxNoCross (default 10). 

In addition, the strategy has a confirmation mechanism, where the signal is also confirmed if the price re-enters between the two moving averages after the initial signal.

After entering positions, the strategy uses ATR to set stop loss levels. ATR measures the price fluctuation range over a certain period, and here its 14x is used as the stop distance. The stop level floats according to the price movement.

## Advantage Analysis

The strategy has the following advantages:

1. Using dual MA crosses with filtering, it can effectively capture strong trend movements while avoiding false signals.

2. The confirmation mechanism prevents being faked out by false breakouts. 

3. The floating ATR stop loss helps maximise profits while limiting drawdowns.

4. It has few optimizable parameters and is easy to implement.

5. Applicable across markets including crypto and traditional assets. 

6. Combines multiple technical indicators for robustness.

## Risk Analysis

The main risks of the strategy include:

1. Frequent MA crosses during range-bound periods can cause multiple losses.

2. Improper ATR parameter setting may lead to stops being too wide or too tight.

3. Large gaps can directly trigger stops.

4. Major news events causing huge volatility may also stop out positions.

5. Inadequate MA parameters could lead to missing trends or too many false signals. 

6. Recent price action may render ATR stops outdated.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Optimize the MA parameters to find better combinations, testing different periods and weighted averages.

2. Test different ATR periods to find better stop distances.

3. Add additional filters like volume spikes, volatility indicators to improve signal quality.

4. Incorporate trend metrics to avoid whipsaws in choppy markets.

5. Add machine learning algorithms to auto optimize parameters through backtesting.

6. Look for more confirmation on higher timeframes to avoid short term noise.

7. Implement staged profit taking rules to scale out of profitable positions.

## Summary

This strategy combines dual MA crosses, trend filtering, confirmation, and dynamic ATR stops for robust trend following. While there is room for improvement in optimization and risk control, the trading logic is simple and easy to replicate, making it a stable trend trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|ATR Stop Period|
|v_input_2|15|ATR Resolution|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("QuantCat Intraday Strategy (15M)", overlay=true)

//MA's for basic signals, can experiment with these values

fastEMA = sma(close, 25)
slowEMA = sma(close, 100)

//Parameters for validation of position

lookback_value = 25
maxNoCross=10 //value used for maximum number of crosses on a certain MA to mitigate noise and maximise value from trending markets

//Amount of crosses on MA to filter out noise

ema25_crossover = (cross(close, fastEMA)) == true ? 1 : 0
ema25_crossover_sum = sum(ema25_crossover, lookback_value) ///potentially change lookback value to alter results
crossCount = (ema25_crossover_sum <= maxNoCross)

//Entries long

agrLong =  ((crossover(fastEMA, slowEMA)) and (crossCount == true)) ? true : false
consLong = ((close < fastEMA) and (close > slowEMA) and (fastEMA > slowEMA) and (crossCount == true)) ? true : false

//Entries short

agrShort =  ((crossunder(fastEMA, slowEMA)) and (crossCount == true)) ? true : false
consShort = ((close > fastEMA) and (close < slowEMA) and (fastEMA < slowEMA) and (crossCount == true)) ? true : false

//ATR

atrLkb = input(14, minval=1, title='ATR Stop Period')
atrRes = input("15",  title='ATR Resolution')
atr = request.security(syminfo.tickerid, atrRes, atr(atrLkb))

//Strategy

longCondition = ((agrLong or consLong) == true)
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = ((agrShort or consShort) == true)
if (shortCondition)
    strategy.entry("Short", strategy.short)

//Stop multiplier 

stopMult = 4

//horizontal stoplosses

longStop = na
longStop :=  shortCondition ? na : longCondition and strategy.position_size <=0 ? close - (atr * stopMult) : longStop[1] 
shortStop = na
shortStop := longCondition ? na : shortCondition and strategy.position_size >=0 ? close + (atr * stopMult) : shortStop[1]

//Strategy exit functions

strategy.exit("Long ATR Stop", "Long", stop=longStop)
strategy.exit("Short ATR Stop", "Short", stop=shortStop)

//Plots 

redgreen = (fastEMA > slowEMA) ? green : red
    
p1 = plot(fastEMA, title="Fast EMA", color=redgreen, linewidth=2) 
p2 = plot(slowEMA, title="Slow EMA", color=redgreen, linewidth=2) 
fill(p1, p2, color=redgreen)

s1 = plot(longStop, style=linebr, color=red, linewidth=2,     title='Long ATR Stop')
s2 = plot(shortStop, style=linebr, color=red, linewidth=2,  title='Short ATR Stop')

fill(p2, s1, color=red, transp=95)
fill(p2, s2, color=red, transp=95)





    



```

> Detail

https://www.fmz.com/strategy/430841

> Last Modified

2023-11-02 14:21:24
