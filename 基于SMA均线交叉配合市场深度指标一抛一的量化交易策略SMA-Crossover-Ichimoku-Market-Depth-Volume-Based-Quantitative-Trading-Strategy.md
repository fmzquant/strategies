
> Name

基于SMA均线交叉配合市场深度指标一抛一的量化交易策略SMA-Crossover-Ichimoku-Market-Depth-Volume-Based-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d8c1c6ddb80ddf8fef.png)
 [trans]
## 概述

本策略名称为“基于SMA均线交叉配合市场深度指标一抛一的量化交易策略”。该策略主要利用SMA均线的金叉死叉讯号,结合Ichimoku市场深度云图指标中的转换线、基准线和前沿线以及交易量的多空指标,实现对比特币正反向的自动交易。

## 策略原理  

该策略主要基于以下原理:

1. 使用不同参数的SMA均线构建金叉死叉交易讯号。当短期SMA上穿长期SMA时生成买入讯号,当短期SMA下穿长期SMA时生成卖出讯号。

2. 基于Ichimoku云图指标判断市场深度和趋势。只有当收盘价高于云图的前沿线和基准线时才产生买入讯号,低于云图的前沿线和基准线时才产生卖出讯号,从而过滤了大部分假讯号。

3. 基于交易量的多空指标过滤掉低量的假讯号,只有当交易量大于一定期间平均量时才会产生买入卖出讯号。

4. 通过plotshape函数在图表上标记买入卖出讯号的位置。

这样,该策略综合考虑了短期和长期趋势、市场深度指标和交易量指标,优化了交易决策。

## 优势分析

该策略具有以下优势:

1. 利用SMA均线的金叉死叉产生基本的买卖讯号,避免复杂度太高。
2. 借助Ichimoku云图判断市场深度和中长期趋势,可有效过滤噪音。
3. 结合交易量指标可避免低量的假突破。  
4. 参数调节空间大,可针对不同市场进行优化。
5. 策略逻辑清晰,容易理解和修改。
6. 直观显示买入卖出讯号,便于策略测试优化。

## 风险分析  

该策略也存在以下风险:  

1. SMA均线容易产生误导信号,需要过滤器进行辅助。
2. Ichimoku云图指标判断市场结构的效果取决于参数设置。
3. 交易量放大效应可能干扰交易量指标的判断。  
4. 趋势市场和震荡市场需要不同的参数设置。
5. 存在一定的时间滞后问题。

针对这些风险,可通过调整均线参数、云图参数、交易量参数等进行优化,同时挑选合适的交易品种,降低风险。

## 优化方向  

该策略可从以下几个方向进行优化:

1. 测试更多均线指标,如EMA、VIDYA等。
2. 尝试不同的云图参数设置。 
3. 基于动量指标进行辅助判断。
4. 加入止损机制。
5. 针对不同的交易市场和品种进行参数优化。
6. 尝试机器学习等方法动态优化参数。

## 总结  

本策略综合运用了均线交叉、市场深度指标和交易量指标,形成了一个较为稳定和可靠的量化交易策略。该策略可通过参数调优、加入新的技术指标等方式进一步优化,其回测和实盘结果值得期待。总的来说,该策略为初学者提供了一个较好的学习案例。

|| 

## Overview  

This strategy is named "SMA Crossover Ichimoku Market Depth Volume Based Quantitative Trading Strategy". It mainly uses the golden cross and dead cross signals of the SMA lines, combined with Ichimoku market depth cloud chart indicators and trading volume indicators, to implement automatic trading of bitcoin in both directions.

## Principle   

The strategy is mainly based on the following principles:

1. Use SMA lines with different parameters to construct golden cross and dead cross trading signals. A buy signal is generated when the short term SMA crosses over the long term SMA, and a sell signal is generated when the short term SMA crosses below the long term SMA.  

2. Use the Ichimoku cloud chart indicator to determine market depth and trends. A buy signal is only generated when the closing price is higher than the leading span A and leading span B of the cloud chart, and a sell signal is only generated when the closing price is lower than span A and span B, which filters out most false signals.   

3. Use trading volume indicators to filter out false signals with low volume. Buy and sell signals are only generated when the trading volume is greater than the average volume over a certain period.  

4. Use the plotshape function to mark the positions of buy and sell signals on the chart.  

In this way, the strategy takes into account short-term and long-term trends, market depth indicators and trading volume indicators to optimize trading decisions.

## Advantage Analysis   

The advantages of this strategy include:  

1. Use SMA golden and dead cross to generate basic buy and sell signals, avoiding too much complexity.  
2. Use Ichimoku cloud chart to determine market depth and medium-long term trends, which can effectively filter out noise.
3. Combine trading volume indicators to avoid false breakouts with low volume.   
4. Large parameter tuning space for optimization across different markets.  
5. Clear logic and easy to understand and modify.  
6. Intuitively display buy and sell signals for ease of strategy testing and optimization.

## Risk Analysis   

The risks of this strategy also include:  

1. SMA lines can easily generate misleading signals and require filters.  
2. The effect of Ichimoku cloud chart judging market structure depends on parameter settings.  
3. Trading volume magnification effect may interfere with volume indicator judgement.   
4. Trending and oscillating markets need different parameter settings.  
5. There is some time lag.  

These risks can be reduced by optimizing parameters like SMA, Ichimoku, volume, and selecting suitable trading products.

## Optimization Directions   

The strategy can be optimized in several ways:  

1. Test more MA indicators like EMA, VIDYA, etc.  
2. Try different Ichimoku parameter settings.
3. Use momentum indicators for supplementary judgement. 
4. Add stop loss mechanisms.
5. Optimize parameters for different markets and products.  
6. Use machine learning to dynamically optimize parameters.  

## Conclusion   

This strategy integrates SMA crossover, market depth indicators and volume indicators to form a relatively stable and reliable quantitative trading strategy. It can be further optimized through parameter tuning, adding new technical indicators, etc. The backtest and live results are promising. In summary, this strategy provides a good learning case for beginners.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Short SMA Length|
|v_input_2|21|Long SMA Length|
|v_input_3|20|Volume Moving Average Length|
|v_input_4|9|Tenkan Length|
|v_input_5|26|Kijun Length|
|v_input_6|52|Senkou B Length|
|v_input_7|26|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-16 00:00:00
end: 2024-01-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SMA Crossover with Ichimoku & Volume", shorttitle="SCIV", overlay=true)

// Define the length of SMA
shortSmaLength = input(14, title="Short SMA Length")
longSmaLength = input(21, title="Long SMA Length")
volumeLength = input(20, title="Volume Moving Average Length")

// Calculate the SMA and Volume MA
shortSma = sma(close, shortSmaLength)
longSma = sma(close, longSmaLength)
volumeMa = sma(volume, volumeLength)

// Define the lengths of the Ichimoku Cloud components
tenkanLength = input(9, title="Tenkan Length")
kijunLength = input(26, title="Kijun Length")
senkouBLength = input(52, title="Senkou B Length")
displacement = input(26, title="Displacement")

// Calculate the Ichimoku Cloud components
tenkan = (highest(high, tenkanLength) + lowest(low, tenkanLength)) / 2
kijun = (highest(high, kijunLength) + lowest(low, kijunLength)) / 2
senkouA = (tenkan + kijun) / 2
senkouB = (highest(high, senkouBLength) + lowest(low, senkouBLength)) / 2

// Define the conditions for entry and exit with Ichimoku filter and Volume filter
buyEntry = crossover(shortSma, longSma) and close > senkouA[displacement] and close > senkouB[displacement] and volume > volumeMa
sellEntry = crossunder(shortSma, longSma) and close < senkouA[displacement] and close < senkouB[displacement] and volume > volumeMa

// Plot buy/sell conditions on the chart for visual inspection
plotshape(buyEntry, style=shape.labelup, location=location.belowbar, color=color.green, text="Buy", size=size.small)
plotshape(sellEntry, style=shape.labeldown, location=location.abovebar, color=color.red, text="Sell", size=size.small)

// Execute the strategy
if (buyEntry)
    strategy.entry("Buy", strategy.long)
if (sellEntry)
    strategy.entry("Sell", strategy.short)
```

> Detail

https://www.fmz.com/strategy/439856

> Last Modified

2024-01-24 14:21:42
