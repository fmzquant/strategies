
> Name

均线通道突破策略Moving-Average-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d2ce4aa21034f682dc.png)
[trans]
## 概述

该策略通过计算Keltner通道的中轨、上轨和下轨,以中轨为基础, ABOVE中轨和下轨填充颜色。在通道方向判断后,进行突破买卖。属于趋势跟踪策略的一种。

## 策略原理  

核心指标为Keltner通道。通道中轨为典型价格(最高价+最低价+收盘价)/3的N日加权移动平均线。通道上轨线和下轨线分别离中轨线一个交易范围的N日加权移动平均线。 其中,交易范围可以选用真实波幅ATR,也可以直接采用振幅(最高价-最低价)。该策略采用后者。  

具体来说,策略主要判断价格是否突破上轨或下轨,以中轨为分界进行多头或空头决策。 若收盘价大于上轨,做多;若收盘价小于下轨,做空。止损线为中轨 MA 值。

## 优势分析

1. 使用Keltner通道指标,对价格波动范围有较好判断,避免假突破。
2. 采用中轨均线作为支撑位,可以减少亏损。
3. 突破上轨做多下轨做空,属于趋势跟踪策略,符合大部分股票的价格变化规律。  

## 风险分析

1. 突破通道策略对参数很敏感,需要反复测试寻找最佳参数组合。  
2. 股票价格短期内出现大幅波动时,会增加交易风险。可适当放宽通道宽度来降低误交易风险。
3. 效果与参数设置和品种相关性较大,需要调整适应不同品种。

## 优化方向  

1. 结合其他指标过滤信号,避免误交易。例如量能指标、波动率指标等。
2. 优化参数,寻找最佳参数组合。主要调整平均线参数和通道倍数。
3. 不同品种参数设置会有较大差异,需要分类优化。

## 总结  

该策略整体来说较为简单直接,属于常见的价格突破策略的一种。优点是思路清晰,容易理解实现,适合初学者学习。但也存在一定局限性,对参数敏感,效果参差不齐,需要反复测试优化。如果能够结合其他更复杂判断指标,可以形成较强大的交易策略。

||

## Overview

This strategy calculates the middle, upper and lower rails of the Keltner Channel. It fills the color ABOVE the middle and lower rails. After determining the direction of the channel, it breaks through and buys and sells. It is a kind of trend tracking strategy.

## Strategy Principle 

The core indicator is the Keltner Channel. The middle rail of the channel is the N-day weighted moving average of the typical price (highest price + lowest price + closing price)/3. The upper and lower rail lines of the channel are respectively one trading range N-day weighted moving average away from the middle rail line. Where the trading range can choose the true volatility ATR, or directly take the amplitude (highest price - lowest price). The latter is adopted in this strategy.

Specifically, the strategy mainly judges whether the price breaks through the upper rail or the lower rail, and makes long or short decisions with the middle rail as the boundary. If the closing price is greater than the upper rail, go long; if the closing price is less than the lower rail, go short. The stop loss line is the MA value of the middle rail.  

## Advantage Analysis  

1. Using the Keltner Channel indicator, it has a good judgment on the price fluctuation range, avoiding false breakthroughs.
2. Using the middle rail moving average as support can reduce losses.
3. Breaking through the upper rail for long and the lower rail for short belongs to the trend tracking strategy, which is in line with the price change law of most stocks.

## Risk Analysis 

1. Breakthrough channel strategies are very sensitive to parameters and require repeated testing to find the best parameter combination.
2. When stock prices fluctuate sharply in the short term, trading risks will increase. Appropriately relax the channel width to reduce the risk of erroneous transactions.
3. The effect has a high correlation with parameter settings and varieties, and adjustments are required to adapt to different varieties.  

## Optimization Directions

1. Combine other indicators to filter signals and avoid erroneous transactions. Such as momentum indicator, volatility indicator, etc.
2. Optimize parameters to find the best parameter combination. Mainly adjust the moving average parameter and the channel multiple.  
3. There will be considerable differences in parameter settings for different varieties, which need to be optimized separately.

## Summary   

In general, this strategy is relatively simple and direct, and it is a common price breakthrough strategy. The advantage is that the idea is clear and easy to understand and implement, which is suitable for beginners to learn. But there are also certain limitations. It is sensitive to parameters, the results are uneven, and repeated testing and optimization are required. If it can be combined with more complex judgment indicators, it can form a more powerful trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|useTrueRange|
|v_input_2|20|length|
|v_input_3|2.618|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © WMX_Q_System_Trading
//@version=3

strategy(title = "WMX Keltner Channels strategy", shorttitle = "WMX Keltner Channels strategy", overlay = true)

useTrueRange = input(true)
length = input(20, minval=5)
mult = input(2.618, minval=0.1)
mah =ema(ema( ema(high, length),length),length)
mal =ema(ema( ema(low, length),length),length)
range = useTrueRange ? tr : high - low
rangema =ema(ema( ema(range, length),length),length)
upper = mah + rangema * mult
lower = mal - rangema * mult
ma=(upper+lower)/2
uc = red
lc=green
u = plot(upper, color=uc, title="Upper")
basis=plot(ma, color=yellow, title="Basis")
l = plot(lower, color=lc, title="Lower")
fill(u, basis, color=uc, transp=95)
fill(l, basis, color=lc, transp=95)


strategy.entry("Long", strategy.long,  stop = upper, when = strategy.position_size <= 0 and close >upper)
strategy.entry("Short", strategy.short,  stop = lower, when = strategy.position_size >= 0 and close<lower)
if strategy.position_size > 0 
    strategy.exit("Stop Long", "Long", stop = ma)

if strategy.position_size < 0 
    strategy.exit("Stop Short", "Short", stop = ma)




```

> Detail

https://www.fmz.com/strategy/440301

> Last Modified

2024-01-29 10:26:25
