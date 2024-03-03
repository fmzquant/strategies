
> Name

基于移动平均线均回复策略Based-on-the-Moving-Average-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/143f3c2639db7478228.png)
[trans]

## 概述

移动平均线均回复策略是一种非常简单的趋势交易策略。它的核心思想是当短期移动平均线低于长期移动平均线一定百分比时做多,当短期移动平均线上穿长期移动平均线时平仓。该策略首先计算一短期和一长期的移动平均线,然后根据两条移动平均线的关系产生交易信号。

## 策略原理

该策略主要依赖两个移动平均线,一个短期移动平均线,一个长期移动平均线。短期移动平均线参数为smallMAPeriod,长期移动平均线参数为bigMAPeriod。策略首先计算出这两条移动平均线,然后比较两条移动平均线的大小关系。

当短期移动平均线从上方向下跌破长期移动平均线的一定百分比(由percentBelowToBuy参数设定)时,产生买入信号,做多入市。当短期移动平均线后续上涨,重新上穿长期移动平均线时,产生卖出信号,平仓。

该策略捕捉短期移动平均线与长期移动平均线之间的均值回复机会。当短期移动平均线低于长期移动平均线一定程度时,说明资产可能被低估,应有回归均值的机会,做多可以获得反弹利润。

## 优势分析

移动平均线均回复策略具有以下几个优势:

1. 思路简单,容易理解和实现
2. 捕捉了短期和长期趋势的转折点,精确判断市场走势
3. 参数设置灵活,可以通过调整移动平均线周期和让步百分比来获得更多交易信号
4. 回测过程简单,适合量化交易的模拟优化

该策略简单Parameters优化就可以获得不错的效果。通过调整移动平均线参数和让步百分比参数,可以对股票、外汇、加密货币等不同市场资产进行回测,筛选出最佳参数组合。

## 风险分析

移动平均线均回复策略也存在一些风险:

1. 信号较少,不能频繁交易
2. 容易发生错过价格反转的情况
3. 参数不当可能导致过于频繁交易而承担更高的交易成本和滑点损失

可以通过以下方法降低风险:

1. 适当调整参数,使交易信号适量
2. 采用突破离开再突破进入的方式,避免假突破
3. 优化参数组合,选择移动平均线周期和让步百分比

## 优化方向 

移动平均线均回复策略可以从以下几个方面进行优化:

1. 测试不同的价格数据,如收盘价、最高价、最低价、典型价等作为策略信号源
2. 尝试不同类型的移动平均线,如指数移动平均线、线性加权移动平均线、Hull移动平均线等
3. 增加过滤条件,避免非趋势性市场的不必要交易
4. 结合交易量的指标,避免价格上涨但量能不足的假突破
5. 采用机器学习或遗传算法自动优化参数

## 总结

移动平均线均回复策略通过比较短期和长期两个移动平均线的关系,捕捉到短期价格偏离长期趋势后的回归机会。该策略思路简单,容易理解和实现,通过参数优化可以获得较好的效果。但也存在交易信号较少、容易错过价格转折等风险,需要对参数和过滤条件进行测试和优化,才能将策略的收益最大化。

||

## Overview

The Jaws mean reversion strategy is a very simple trend trading strategy. Its core idea is to go long when the short-term moving average falls below the long-term moving average by a certain percentage, and close the position when the short-term moving average crosses above the long-term moving average. The strategy first calculates a short-term and a long-term moving average, and then generates trading signals based on the relationship between the two moving averages.  

## Strategy Logic

The strategy mainly relies on two moving averages, one short-term and one long-term. The short-term moving average parameter is smallMAPeriod, and the long-term moving average parameter is bigMAPeriod. The strategy first calculates these two moving averages, and then compares the size relationship between them.

When the short-term moving average falls from above and breaks through a certain percentage (set by the percentBelowToBuy parameter) of the long-term moving average, a buy signal is generated to go long. When the short-term moving average subsequently rises and crosses above the long-term moving average, a sell signal is generated to close the position.

The strategy captures mean reversion opportunities between the short-term and long-term moving averages. When the short-term moving average is below the long-term moving average to a certain extent, it means the asset may be undervalued and should have a chance to revert to the mean, so going long can obtain a rebound profit.

## Advantage Analysis  

The Jaws mean reversion strategy has the following advantages:

1. The logic is simple and easy to understand and implement
2. Captures the turning points of short-term and long-term trends for precise judgment of market trends  
3. Flexible parameter settings that can obtain more trading signals by adjusting the moving average periods and concession percentage
4. Simple backtesting process suitable for quantitative trading simulation and optimization

The strategy can achieve good results through simple parameter optimization. By adjusting the moving average and concession percentage parameters, backtesting can be performed on different market assets like stocks, forex, and cryptocurrencies to screen out the optimal parameter combinations.  

## Risk Analysis

The Jaws mean reversion strategy also has some risks:  

1. Fewer signals unable to trade frequently
2. Prone to missing price reversal situations
3. Improper parameters can lead to excessively frequent trading, higher trading costs and slippage losses

The following methods can be used to mitigate risks:

1. Appropriately adjust parameters for an adequate amount of trading signals  
2. Adopt breakout pullback entry method to avoid false breakouts
3. Optimize parameter combinations by selecting moving average periods and concession percentages  

## Optimization Directions

The Jaws mean reversion strategy can be optimized from the following aspects:

1. Test different price data like close, high, low, typical price as strategy signal source
2. Try different types of moving averages like exponential, weighted, Hull moving averages etc 
3. Add filter conditions to avoid unnecessary trading in non-trending markets
4. Incorporate volume indicators to avoid false breakouts with increasing price but insufficient momentum
5. Employ machine learning or genetic algorithms for automated parameter optimization

## Conclusion

The Jaws mean reversion strategy captures the mean reversion opportunities after short-term prices deviate from long-term trends by comparing short and long-term moving averages. The strategy has simple logic that is easy to understand and implement. Through parameter optimization it can achieve good results. But risks like fewer signals and missing reversals still exist, requiring testing and optimization of parameters and filters to maximize strategy returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|2|Small Moving Average|
|v_input_3|5|Big Moving Average|
|v_input_4|3|Percent below to buy %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
//
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
//
// @author Sunil Halai
//
// This very simple strategy is an implementation of PJ Sutherlands' Jaws Mean reversion algorithm. It simply buys when a small moving average period (e.g. 2) is below
// a longer moving average period (e.g. 5) by a certain percentage, and closes when the small period average crosses over the longer moving average. 
// 
// If you are going to use this, you may wish to apply this to a range of investment assets, as the amount signals is low. Alternatively you may wish to tweak the settings to provide more
// signals.


strategy("Jaws Mean Reversion [Strategy]", overlay = true)

//Strategy inputs
source = input(title = "Source", defval = close)
smallMAPeriod = input(title = "Small Moving Average", defval = 2)
bigMAPeriod = input(title = "Big Moving Average", defval = 5)
percentBelowToBuy = input(title = "Percent below to buy %", defval = 3)


//Strategy calculation
smallMA = sma(source, smallMAPeriod)
bigMA =  sma(source, bigMAPeriod) 
buyMA = ((100 - percentBelowToBuy) / 100) * sma(source, bigMAPeriod)[0]

if(crossunder(smallMA, buyMA))
    strategy.entry("BUY", strategy.long)

if(crossover(smallMA, bigMA))
    strategy.close("BUY")
```

> Detail

https://www.fmz.com/strategy/442975

> Last Modified

2024-02-27 17:51:43
