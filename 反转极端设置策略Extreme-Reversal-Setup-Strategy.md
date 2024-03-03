
> Name

反转极端设置策略Extreme-Reversal-Setup-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1135cf284cbff8d898f.png)
[trans]
## 概述

反转极端设置策略是一种利用极端K线反转的策略。它会根据最新K线的实体大小和平均值进行判断,在实体大小大于平均值且出现反转时,产生交易信号。

## 策略原理

该策略主要判断当前K线的实体大小以及整体K线大小。

它会记录下最新一根K线的实体大小(开盘价与收盘价的差值)和整体K线大小(最高价与最低价的差值)。

然后利用平均真实范围平均法(RMA)计算最近20根K线的平均实体大小和K线大小。

当最新K线上涨且实体大小大于平均实体大小,而整体K线大小也大于平均K线大小的2倍时,产生做多信号。

相反,当最新K线下跌且实体大小也满足上述条件时,产生做空信号。

也就是在极端K线反转时,利用平均值判断,产生交易信号。

## 优势分析

该策略的主要优势有:

1. 利用极端K线特征,容易形成反转
2. 比较实体大小和整体K线大小的极值情况,寻找异常点
3. 使用RMA计算动态平均值,适应市场变化
4. 结合反转形态,信号较为可靠

## 风险分析

该策略也存在一些风险:

1. 极端K线不一定会反转,可能继续运行
2. 参数设置不当可能导致过于灵敏或迟钝
3. 需要足够的行情波动作为支撑,不适合盘整市
4. 可能会产生频繁的交易信号,增加交易成本和滑点风险

为了降低风险,可以适当调整参数,或者加入止损以控制亏损。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加成交量的过滤,避免假突破
2. 利用波动率指标优化参数的动态设置
3. 结合趋势指标,避免反向做多做空
4. 增加机器学习模型判断K线反转概率
5. 加入止损机制

## 总结

反转极端设置策略通过判断最新K线的极端情况,在出现反转时产生交易信号。它有利用异常极端K线特征的优势,但也存在一定的风险。通过参数优化和风控手段,可以获得更好的策略表现。

||

## Overview

The extreme reversal setup strategy is a strategy that utilizes extreme K-line reversals. It will judge based on the entity size of the latest K-line and average value, and generate trading signals when the entity size is greater than the average value and a reversal occurs.

## Strategy Principle  

This strategy mainly judges the entity size of the current K-line and the overall size of the K-line.

It will record the entity size (difference between open and close) of the latest K-line and the overall size of the K-line (difference between highest and lowest).

Then use the Average True Range Moving Average (RMA) to calculate the average entity size and K-line size of the last 20 K-lines.

When the latest K-line rises and the entity size is greater than the average entity size, and the overall K-line size is also greater than 2 times the average K-line size, a long signal is generated.

On the contrary, when the latest K-line falls and the entity size also meets the above conditions, a short signal is generated.

That is, trading signals are generated when extreme K-lines reverse, by judging with average values.

## Advantage Analysis

The main advantages of this strategy are:

1. Use extreme K-line characteristics for easy reversal  
2. Compare extreme values of entity size and overall K-line size to find outliers
3. Use RMA to calculate dynamic averages adaptable to market changes
4. Combine with reversal patterns for more reliable signals

## Risk Analysis  

This strategy also has some risks:

1. Extreme K-lines do not necessarily reverse, may continue to run  
2. Improper parameter settings may cause too sensitive or dull
3. Requires sufficient market volatility to support, not suitable for consolidation  
4. May generate frequent trading signals, increasing transaction costs and slippage risks

To reduce risks, parameters can be adjusted appropriately, or stop loss can be added to control losses.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Add volume filter to avoid false breakouts  
2. Use volatility indicators to dynamically optimize parameter settings
3. Combine trend indicators to avoid reverse long and short  
4. Add machine learning models to judge K-line reversal probability  
5. Add stop loss mechanism

## Summary  

The extreme reversal setup strategy generates trading signals when reversals occur by judging extreme situations of the latest K-line. It has the advantage of using exceptional extreme K-line features, but also has some risks. Better strategy performance can be obtained through parameter optimization and risk control measures.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.75|bodySize|
|v_input_2|20|Lookback Period|
|v_input_3|2|Bar ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-13 00:00:00
end: 2024-02-20 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Extreme Reversal Setup", overlay=true)

bodySize = input(defval=0.75)
barsBack = input(title="Lookback Period", type=input.integer, defval=20, minval=0)
bodyMultiplier = input(title="Bar ATR Multiplier", type=input.float, defval=2.0, minval=0)

myBodySize = abs(close - open)
averageBody = rma(myBodySize, barsBack)
myCandleSize = abs(high - low)
averageCandle = rma(myCandleSize, barsBack)

signal_long = open[1]-close[1] >= bodySize*(high[1]-low[1]) and 
   high[1]-low[1] > averageCandle*bodyMultiplier and 
   open[1]-close[1] > averageBody and close > open
signal_short = close[1]-open[1] >= bodySize*(high[1]-low[1]) and 
   high[1]-low[1] > averageCandle*bodyMultiplier and 
   close[1]-open[1] > averageBody and open > close

plotshape(signal_long, "LONG", shape.triangleup, location.belowbar, size=size.normal)
plotshape(signal_short, "SHORT", shape.triangledown, location.belowbar, size=size.normal)

strategy.entry("LONG", strategy.long, when=signal_long)
strategy.entry("SHORT", strategy.short, when=signal_short)
```

> Detail

https://www.fmz.com/strategy/442365

> Last Modified

2024-02-21 14:08:09
