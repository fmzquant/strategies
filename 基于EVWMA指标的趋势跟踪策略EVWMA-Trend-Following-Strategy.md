
> Name

基于EVWMA指标的趋势跟踪策略EVWMA-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bca646f3b9703973ee.png)
[trans]

## 概述

本策略基于EVWMA指标设计了一个简单的趋势跟踪策略。该策略使用快速线和慢速线构建EVWMA指标,在快线上穿慢线时做多,在快线下穿慢线时做空,实现趋势跟踪。

## 策略原理

该策略的核心指标是EVWMA,即弹性量加权移动平均线。它通过自身计算周期长度的方式,结合价格和交易量的信息,动态地反映市场趋势。

具体来说,快速线的计算周期长度为最近10根K线的成交量之和,慢速线计算周期长度为最近20根K线成交量之和。每根K线的EVWMA按照“(前一日EVWMA × (周期长度-当前K线volume) + 当前K线收盘价 × 当前K线volume) / 周期长度”的公式计算。这样就同时结合了价格和交易量信息。

当快速线上穿慢速线时,表示买入力量增强,做多;当快速线下穿慢速线时,表示卖出力量增强,做空。通过这样的快慢线组合,可以动态地捕捉市场趋势,实现趋势跟踪策略。

## 优势分析

本策略最大的优势在于利用EVWMA指标的动态周期设计,可以更快地响应价格和交易量的变化,实时捕捉市场趋势,这对于趋势跟踪策略非常适合。此外,相比传统移动平均线等指标,它结合了价格和交易量信息,可以过滤假突破。

## 风险及解决方法

该策略的主要风险在于EVWMA指标参数设置的问题。如果快线和慢线周期设定不当,可能导致产生大量假信号。此外,趋势跟踪策略本身 justes trendyțile consecințe în cazul inversării bruște a tendinței pieței.

为了解决这些问题,可以通过优化参数,调整快线和慢线的计算周期,找到最佳参数组合。同时,可以设置止损来控制亏损风险。在市场可能发生重大转折的时间点,例如重要数据发布,可以考虑暂停策略,避开这个时间段。

## 优化方向

该策略还具有进一步优化的空间。例如,可以考虑加入其他指标,如交易量的突破、布林带等来确认信号,从而提高策略的稳定性。此外,不同品种和不同时间段参数组合的最优值可能会有所不同,可以建立参数自适应优化机制,根据实时数据调整参数。

从交易面来看,还可以设计动态止损、跟踪止损等方法来控制风险。此外,不同品种和不同时间段参数组合的最优值可能会有所不同,可以建立参数自适应优化机制,根据实时数据调整参数。

## 总结

本策略利用EVWMA指标的动态周期设计和对交易量信息的考量,构建了一个简单有效的趋势跟踪策略。它可以快速响应价格变化,捕捉市场趋势。通过参数优化、风险控制等手段,可以进一步提升策略稳定性。该策略思路新颖,值得进一步探索与应用。

||


## Overview  

This strategy is designed as a simple trend following strategy based on the EVWMA indicator. It uses fast line and slow line to construct the EVWMA indicator. A long position will be opened when the fast line crosses over the slow line, and a short position will be opened when the fast line crosses below the slow line, to follow the trend.  

## Strategy Logic

The core indicator of this strategy is EVWMA, namely Elastic Volume Weighted Moving Average. It incorporates both price and volume information to reflect the market trend dynamically by calculating its own period.

Specifically, the period of the fast line is calculated as the sum of volume of recent 10 bars, and 20 bars for the slow line. The EVWMA of each bar is calculated as "(Previous bar's EVWMA × (Period length - Current bar's volume) + Current bar's close price × Current bar's volume) / Period length". In this way, it combines both price and volume information.  

When the fast line crosses over the slow line, it indicates that the buying power is strengthening to go long. When the fast line crosses below the slow line, it indicates that the selling power is strengthening to go short. With such a combination of fast and slow lines, the strategy can capture the market trend dynamically to follow the trend.

## Advantage Analysis   

The biggest advantage of this strategy lies in the dynamic period design of the EVWMA indicator to respond faster to the changes in price and volume, thereby capturing the market trend in real time, which is very suitable for trend following strategies. Also, compared to traditional moving averages, it incorporates both price and volume information, which can filter false breakouts.  

## Risks and Solutions

The main risk of this strategy is the inappropriate parameter settings of the EVWMA indicator. If the periods of the fast and slow lines are not set properly, it may generate excessive false signals. Besides, trend following strategies themselves have some drawbacks when the market trend reverses sharply.

To solve these problems, we can optimize the parameters and adjust the calculation periods of fast and slow lines to find the best combination. Also, a stop loss can be set to control the risk of loss. Around time points when significant market reversal is likely to occur such as important data releases, we may consider temporarily suspending the strategy to avoid trades during this period.

## Optimization Directions 

There is room for further optimization of this strategy. For example, other indicators like breakout of trading volume, Bollinger Bands etc. can be incorporated to confirm the signals, thereby enhancing the stability of the strategy. Also, the optimal parameter values might differ across different products and time periods. An adaptive parameter optimization mechanism can be established to adjust parameters based on real-time data.  

On the trading aspects, dynamic stop loss, trailing stop loss and other means can also be designed to control risks. In addition, an adaptive parameter mechanism may help obtaining optimal parameters across different products and time periods.

## Summary

This strategy leverages the dynamic period design of the EVWMA indicator and incorporates volume information to construct an effective trend following strategy. It can respond quickly to price changes and capture market trends. With parameter optimization, risk control measures etc., the stability of the strategy can be further improved. The logic behind this strategy is innovative and worth further exploration and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Fast Sum Length|
|v_input_2|20|Slow Sum Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-05 00:00:00
end: 2023-12-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("QuantNomad - EVWMA Cross Strategy", shorttitle="EVWMA Cross", overlay=true)

// Inputs
fast_sum_length = input(10, title = "Fast Sum Length", type = input.integer)
slow_sum_length = input(20, title = "Slow Sum Length", type = input.integer)

// Calculate Volume Period
fast_vol_period = sum(volume, fast_sum_length)
slow_vol_period = sum(volume, slow_sum_length)

// Calculate EVWMA
fast_evwma = 0.0
fast_evwma := ((fast_vol_period - volume) * nz(fast_evwma[1], close) + volume * close) / (fast_vol_period)

// Calculate EVWMA
slow_evwma = 0.0
slow_evwma := ((slow_vol_period - volume) * nz(slow_evwma[1], close) + volume * close) / (slow_vol_period)

// Plot 
plot(fast_evwma, title = "EVWMA Fast", linewidth = 2, color = color.red)
plot(slow_evwma, title = "EVWMA Slow", linewidth = 2, color = color.green)

// Strategy
strategy.entry("Long",   true, when = crossover(fast_evwma, slow_evwma))
strategy.entry("Short", false, when = crossunder(fast_evwma, slow_evwma))
```

> Detail

https://www.fmz.com/strategy/435137

> Last Modified

2023-12-12 16:00:37
