
> Name

基于布林带通道的指数交易策略Index-Trading-Strategy-Based-on-Bollinger-Bands

> Author

ChaoZhang

> Strategy Description

 ![IMG](https://www.fmz.com/upload/asset/17996138272d1473cbb.png)
 [trans]

## 概述

本策略名称为“布林带量化交易策略”,是一种基于改进布林带通道的指数和股票交易策略。该策略通过调整布林带参数,实现对长仓和短仓的同时优化,从而在涨跌市场中都能获利。

## 策略原理

该策略核心逻辑基于布林带通道。布林带是由中轨、上轨和下轨组成,中轨是n天收盘价的移动平均线,上下轨分别是中轨上下的偏差。当价格接近上轨时,代表市场可能过热,会形成空头机会;当价格接近下轨时,代表市场可能被低估,会形成多头机会。

本策略使用两个布林带,布林带1适用于做多,布林带2适用于做空。布林带1的参数经过优化,长度为25,偏差为2.9倍;布林带2的参数也经过优化,长度为36,偏差为3.2倍。当收盘价上穿布林带1下轨时,会产生做多信号;当收盘价下穿布林带2上轨时,会产生做空信号。

## 优势分析

相比传统布林带策略,本策略具有以下优势:

1. 实现了多空双边交易。同时适用于两边场景,能抓住市场不同阶段的交易机会。

2. 参数经过优化。两套布林带的参数经过细致测试,能够有效发出交易信号。

3. 风险可控。采用移动止损方式,能够有效控制单边风险。

## 风险分析  

本策略也存在一些潜在风险:

1. 布林带失效风险。当市场出现剧烈波动时,布林带通道可能会失效。

2. 止损被套风险。移动止损可能会被套,从而扩大损失。可以适当宽止损或及时止损来规避。

3. 交易频率过高风险。参数设置过于灵敏,可能会导致频繁交易而增加交易成本。

## 优化方向

本策略仍有进一步优化的空间:  

1. 结合其他指标过滤信号,避免布林带失效时误交易。例如K线形态、成交量等。

2. 动态调整参数,使布林带更贴合不同周期的市场特征。例如采用自适应布林带。

3. 优化止损方式,采用追踪止损或指数移动止损等,有效控制风险。

4. 结合机器学习算法,实现参数的自动优化。

## 总结

本策略 overall 基于双布林带通道,通过参数优化,实现了对长短双边交易的优化。相比传统布林带策略,具有做多做空、风险控制的优势,适用于捕捉市场不同阶段的机会,具有一定的实战价值。但也存在布林带失效、止损被套等风险,仍需进一步的优化与验证,才能相关产品化。

||


## Overview

The strategy is named "Quant Trading Strategy Based on Bollinger Bands". It is an index and stock trading strategy based on improved Bollinger Bands channel. By adjusting Bollinger Bands parameters, it realizes optimization for both long and short positions to profit in both uptrend and downtrend markets.

## Trading Logic

The core logic of this strategy is based on Bollinger Bands channel, which consists of middle line, upper band and lower band. The middle line is the moving average of closing price for n days. The upper and lower bands are deviations above and below the middle line. When price approaches the upper band, it indicates the market may be overheated and there can be short opportunities. When price approaches the lower band, it indicates the market may be undervalued and there can be long opportunities.

This strategy uses two Bollinger Bands. Bollinger Band 1 is suitable for long trades and Bollinger Band 2 is suitable for short trades. The parameters of Bollinger Band 1 are optimized with length of 25 and deviation of 2.9 times. The parameters of Bollinger Band 2 are optimized with length of 36 and deviation of 3.2 times. When closing price crosses above the lower band of Bollinger Band 1, it will generate long signal. When closing price crosses below the upper band of Bollinger Band 2, it will generate short signal.

## Advantage Analysis

Compared with traditional Bollinger Bands strategies, this strategy has the following advantages:

1. It realizes dual-directional trading for both long and short sides, which can seize trading opportunities in different market stages.

2. The parameters are optimized. The two sets of Bollinger Bands parameters are elaborately tested to effectively generate trading signals.  

3. The risk is controllable. The moving stop loss method can effectively control the risk of one side.

## Risk Analysis

There are also some potential risks for this strategy:

1. Invalidity risk of Bollinger Bands. Bollinger Bands may become invalid during extreme market fluctuation.

2. Risk of stop loss being hit. Moving stop loss could be hit to expand losses. We can properly widen the stop loss or timely stop out to avoid this risk.

3. High trading frequency risk. Overly sensitive parameters could lead to frequent trading and increased trading costs.

## Optimization Directions

There is still room for further optimization of this strategy:

1. Combine other indicators to filter signals and avoid wrong trades when Bollinger Bands fails. Such as K-line patterns, trading volume etc.

2. Dynamically adjust parameters to fit the market characteristics of different periods. For example, use adaptive Bollinger Bands.

3. Optimize the stop loss methods by using trailing stop loss or exponential moving stop loss to effectively control risks.

4. Combine machine learning algorithms to automatically optimize the parameters.

## Summary  

In summary, this strategy overall optimizes dual-directional trading for both long and short sides based on double Bollinger Bands channel and parameters optimization. Compared with traditional Bollinger Bands strategies, it has the advantages of dual-directional trading and risk control. It is suitable to seize opportunities in different market stages and has certain practical value. But risks like failure of Bollinger Bands and stop loss being hit still exist. Further optimization and verification are needed before productization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|Length BB long|
|v_input_2|2.9|MULT BB long|
|v_input_3|36|Length BB short|
|v_input_4|3.2|MULT BB short|
|v_input_5|true|longEntry|
|v_input_6|true|shortEntry|
|v_input_7|100|risk|
|v_input_8|true|leverage|
|v_input_9|0.065|Take profit % for long|
|v_input_10|0.04|Stop loss % for long|
|v_input_11|0.025|Take profit % for short|
|v_input_12|0.04|Stop loss % for short|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4
strategy("BB NDX strategy", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, calc_on_every_tick = true, commission_type = strategy.commission.percent, commission_value = 0.01)

source = close
length = input(25, minval=1, title="Length BB long")
mult = input(2.9, minval=0.001, maxval=50, step=0.1, title="MULT BB long")

length2 = input(36, minval=1, title="Length BB short")
mult2 = input(3.2, minval=0.001, maxval=50, step=0.1, title="MULT BB short")


basis = sma(source, length)
dev = mult * stdev(source, length)
dev2 = mult2 * stdev(source, length2)

upper = basis + dev2
lower = basis - dev

buyEntry = crossover(source, lower)
sellEntry = crossunder(source, upper)

longEntry=input(true)
shortEntry=input(true)

g(v, p) => round(v * (pow(10, p))) / pow(10, p)
risk     = input(100)
leverage = input(1.0, step = 0.5)
c = g((strategy.equity * leverage / open) * (risk / 100), 4)


tplong=input(0.065, step=0.005, title="Take profit % for long")
sllong=input(0.04, step=0.005, title="Stop loss % for long")
tpshort=input(0.025, step=0.005, title="Take profit % for short")
slshort=input(0.04, step=0.005, title="Stop loss % for short")

if(longEntry)
    strategy.entry("long",1,c,when=buyEntry)
    strategy.exit("short_tp/sl", "long", profit=close * tplong / syminfo.mintick, loss=close * sllong / syminfo.mintick, comment='LONG EXIT',  alert_message = 'closeshort')
    strategy.close("long",when=sellEntry)
if(shortEntry)
    strategy.entry("short",0,c,when=sellEntry)
    strategy.exit("short_tp/sl", "short", profit=close * tpshort / syminfo.mintick, loss=close * slshort / syminfo.mintick, comment='SHORT EXIT',  alert_message = 'closeshort')
    strategy.close("short",when=buyEntry)



```

> Detail

https://www.fmz.com/strategy/434714

> Last Modified

2023-12-08 16:52:24
