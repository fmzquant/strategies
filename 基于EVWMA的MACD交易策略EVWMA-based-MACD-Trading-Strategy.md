
> Name

基于EVWMA的MACD交易策略EVWMA-based-MACD-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/15eebe05504c636db4b.png)
 [trans]

### 概述

该策略是一个基于弹性成交量加权移动平均线(EVWMA)的MACD交易策略。它利用EVWMA的优点,设计了一个交易信号清晰、实用性强的策略。

### 策略原理

EVWMA指标把成交量信息融入移动平均线计算中,使得移动平均线能更准确反映价格变化。该策略构建快速线和慢速线的计算都是基于EVWMA实现的。快速线的参数设置更加灵敏,能捕捉短期价格变动;慢速线参数设置更加稳健,能过滤掉部分噪音。两条EVWMA形成的MACD进行交叉做多做空,并设计histogram给出视觉效果更佳的交易提示。

### 优势分析

该策略最大的优势是利用EVWMA指标的力量,使得MACD策略参数设置更加稳定,交易信号更加清晰。相比简单移动平均线,EVWMA能更好地把握市场变化趋势。这使得该策略适应性更广,在各种市场环境下都能稳定工作。

### 风险分析

该策略主要风险在于MACD本身就存在一定滞后,不能及时捕捉价格反转。此外,EVWMA的参数设置也会影响策略表现。如果快慢线参数设置不当,会出现交易信号错乱,影响盈利能力。

为降低风险,应适当调整参数,使快速线和慢速线之间差距适中,Histogram可以辅助判断是否需要调参。此外,也可以设计止损策略,避免单笔损失过大。

### 优化方向

该策略主要可以从以下几个方面进行优化:

1. 利用自适应参数设置技术,使EVWMA的参数能根据市场环境自动调整,保证交易信号的清晰度。

2. 增加止损机制,能够有效控制单笔损失。

3. 结合其他指标过滤误报信号。例如结合成交量,大幅度价格变动时才产生信号。

4. 优化入场点选择。目前的策略是在MACD零轴交叉时开仓。可以测试是否改为深度拉胯更适合。

### 总结

本策略利用EVWMA指标的优势,构建了一个简单实用的MACD策略。它稳定性更好,适应性更广。同时也存在MACD本身的滞后问题。我们可以从自适应参数优化、止损设计、信号过滤等方面进行改进,使策略更加稳健。

||

### Overview

This strategy is a MACD trading strategy based on Elastic Volume Weighted Moving Average (EVWMA). It utilizes the advantages of EVWMA and designs a strategy with clear trading signals and strong practicality.  

### Principles

The EVWMA indicator incorporates volume information into the calculation of moving averages, allowing moving averages to more accurately reflect price changes. The calculations of the fast line and slow line in this strategy are both based on EVWMA. The parameter settings of the fast line are more sensitive to capture short-term price fluctuations; the parameter settings of the slow line are more robust to filter out some noise. The MACD formed by the two EVWMAs triggers long and short signals on crossover, and the histogram provides visually enhanced trading prompts.

### Advantage Analysis 

The biggest advantage of this strategy is that by leveraging the power of the EVWMA indicator, the parameters settings of the MACD strategy become more stable and trading signals become clearer. Compared with simple moving averages, EVWMA can better grasp market trend changes. This makes the strategy more adaptable to work stably across various market environments.

### Risk Analysis

The main risk of this strategy is that MACD itself has a certain lag and cannot promptly capture price reversals. In addition, the parameter settings of EVWMA also affect strategy performance. If the fast and slow line parameters are not set properly, the trading signals will be chaotic, affecting profitability.

To mitigate risks, parameters should be adjusted appropriately to have a moderate difference between the fast and slow lines. The histogram can assist in judging whether a parameter adjustment is needed. In addition, stop loss strategies can also be designed to avoid excessively large single losses.

### Optimization Directions

The main aspects for optimizing this strategy include:

1. Use adaptive parameter setting techniques to automatically adjust EVWMA parameters according to market conditions to ensure signal clarity.

2. Increase stop loss mechanisms to effectively control single losses.

3. Incorporate other indicators to filter false signals. For example, combine with volume to only trigger signals during significant price changes. 

4. Optimize entry point selections. Currently the strategy opens positions on MACD zero line crossovers. Testing if using divergence performs better can be examined.


### Conclusion
This strategy utilizes the advantages of the EVWMA indicator to build a simple and practical MACD strategy. It has better stability and adaptability. At the same time, it also has the lag problem inherent in MACD. We can improve the strategy's robustness through adaptive parameter optimization, stop loss design, signal filtering and other aspects.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Fast Sum Length|
|v_input_2|20|Slow Sum Length|
|v_input_3|9|Signal Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-15 00:00:00
end: 2024-01-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("QuantNomad - EVWMA MACD Strategy", shorttitle = "EVWMA MACD", overlay = false)

// Inputs
fast_sum_length = input(10, title = "Fast Sum Length",  type = input.integer)
slow_sum_length = input(20, title = "Slow Sum Length",  type = input.integer)
signal_length   = input(9,  title = "Signal Smoothing", type = input.integer, minval = 1, maxval = 50)

// Calculate Volume Period
fast_vol_period = sum(volume, fast_sum_length)
slow_vol_period = sum(volume, slow_sum_length)

// Calculate EVWMA
fast_evwma = 0.0
fast_evwma := ((fast_vol_period - volume) * nz(fast_evwma[1], close) + volume * close) / (fast_vol_period)

// Calculate EVWMA
slow_evwma = 0.0
slow_evwma := ((slow_vol_period - volume) * nz(slow_evwma[1], close) + volume * close) / (slow_vol_period)

// Calculate MACD
macd   = fast_evwma - slow_evwma
signal = ema(macd, signal_length)
hist   = macd - signal

// Plot 
plot(hist,   title = "Histogram", style = plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? #26A69A : #B2DFDB) : (hist[1] < hist ? #FFCDD2 : #EF5350) ), transp=0 )
plot(macd,   title = "MACD",      color = #0094ff, transp=0)
plot(signal, title = "Signal",    color = #ff6a00, transp=0)

// Strategy
strategy.entry("Long",   true, when = crossover(fast_evwma, slow_evwma))
strategy.entry("Short", false, when = crossunder(fast_evwma, slow_evwma))
```

> Detail

https://www.fmz.com/strategy/439609

> Last Modified

2024-01-22 10:50:25
