
> Name

唐奇安自适应移动平均线交易系统Donchian-Adaptive-Moving-Average-Trading-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10352684c9b53ab9689.png)
[trans]
## 概述

唐奇安自适应移动平均线交易系统是一种追踪价格趋势的量化交易策略。该策略利用唐奇安通道指标,结合长线和短线移动平均线,对价格趋势进行判断与跟踪,以捕捉中长线价格趋势,进行趋势性交易。

## 策略原理  

该策略首先计算真实波幅。真实波幅是指从前一根K线的收盘价到当前K线的最高价与最低价之间的价格变动范围。然后计算真实波幅的长线简单移动平均值,作为唐奇安通道的带宽。再结合长短两个时间周期的移动平均线,判断价格趋势。具体判断规则如下:

当价格上穿长线移动平均线加上带宽以及短线移动平均线加上带宽时,做多;当价格下穿长线移动平均线减去带宽以及短线移动平均线减去带宽时,做空。平仓条件为prices下穿带宽增加的长短线移动平均线时平多仓;prices上穿带宽增加的长短线移动平均线时平空仓。

这样,策略通过真实波幅动态调整唐奇安通道的带宽,并结合双重移动平均线过滤,可以有效跟踪中长线价格趋势,减少假信号,从而获得稳定的长线交易机会。

## 优势分析

该策略具有以下几个优势:

1. 利用真实波幅计算动态调整通道带宽,避免死参数,能更好适应市场变化。

2. 双重移动平均线结合判断,可以有效过滤噪音,减少假信号。  

3. 追踪中长线趋势,可以减少反复交易,降低交易频率,获得长周期持续盈利机会。

4. 策略逻辑简单清晰易于实现,容错率高,适合自动量化交易。

## 风险及优化

该策略也存在一定的风险:

1. 长线交易难以把握短线调整的入场时点。可以适当结合波动指标等判断短线情况,优化入场。  

2. 行业、个股不同,参数需要优化。可以考虑动态优选参数组合。

3. 突发事件造成重大趋势变化时,止损点需要适当放宽。

## 总结

总的来说,唐奇安自适应移动平均线交易系统整体是一个稳定、简单、易于实施的量化策略。该策略利用动态通道和双均线过滤,可以有效跟踪市场中长线趋势,降低交易频率,获得长周期持续收益。同时也需要注意优化参数设置,防范风险,做好止损以适应突发事件。总体而言该策略表现优秀,适合中长线量化追踪使用。

||

## Overview  

The Donchian adaptive moving average trading system is a quantitative trading strategy that tracks price trends. This strategy utilizes the Donchian channel indicator combined with long-term and short-term moving averages to judge and track price trends and capture medium-to-long term price trends for trend trading.
  
## Strategy Principle

The strategy first calculates the true volatility range. The true volatility range refers to the price movement range from the closing price of the previous candlestick to the highest and lowest prices of the current candlestick. Then it calculates the simple moving average of the true volatility range as the bandwidth of the Donchian channel. Combined with moving averages of two time periods, it judges the price trend. The specific judgment rules are as follows:  

When the price breaks through the long-term moving average plus the bandwidth and the short-term moving average plus the bandwidth, go long; when the price falls below the long-term moving average minus the bandwidth and the short-term moving average minus the bandwidth, go short. The closing conditions are closing long positions when prices fall below the long and short moving averages increased by the bandwidth; closing short positions when prices rise above the long and short moving averages increased by the bandwidth.
  
Thus, by dynamically adjusting the bandwidth of the Donchain Channel based on true volatility and filtering with dual moving averages, the strategy can effectively track medium-to-long term price trends, reduce false signals, and obtain stable long-term trading opportunities.

## Strengths Analysis   

This strategy has the following advantages:  

1. Using true volatility to dynamically adjust channel bandwidth avoids static parameters and adapts better to market changes.  

2. The combination of dual moving averages can effectively filter noise and reduce false signals.

3. Tracking medium-to-long term trends can reduce repetitive trading and lower trading frequency to obtain long-term profit opportunities.  

4. The strategy logic is simple and clear, easy to implement, fault tolerant, and suitable for automated algorithmic trading.

## Risk and Optimization  

The strategy also has some risks:  

1. It’s hard to capture the best entry timing for long-term trades during short-term adjustments. Volatility indicators can help judge short-term situations and optimize entries.

2. Parameters need optimization for different sectors and individual stocks. Dynamical optimized parameter portfolio can be considered.   

3. Stop loss points need proper loosen up against significant trend changes from emergencies.

## Summary   

In summary, the Donchian adaptive moving average trading system is an overall stable, simple and easy-to-implement quantitative strategy. By utilizing dynamic channels and dual moving average filtering, it can effectively track medium-to-long term market trends, reduce trading frequency, and obtain long-term sustained profits. Meanwhile, optimizing parameter settings, preventing risks, and proper stop loss should also be noted to adapt to emergencies. Overall speaking this strategy has outstanding performance and is suitable for medium-to-long term algorithmic trend tracking.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|长线|
|v_input_2|5|短线|
|v_input_3|true|bandfactor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-14 00:00:00
end: 2024-02-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dongyun

//@version=4
strategy("唐齐安移动平均交易系统", overlay=true)

longperiod = input(20,'长线')
shortperiod = input(5,'短线')
bandfactor = input(1.0,'')

TrueHigh = 0.0
TrueLow = 0.0
TrueRange = 0.0

TrueHigh := close[1] > high ? close[1] : high
TrueLow := close[1] < low ? close[1] : low
TrueRange := TrueHigh - TrueLow
AvgTrueRange = sma(TrueRange,longperiod)

MAlong = sma(close,longperiod)
MAshort = sma(close,shortperiod)
band =  AvgTrueRange * bandfactor

if close > MAlong[1] + band[1] and close >  MAshort[1] + band[1]
	strategy.entry("Long", strategy.long, when=strategy.position_size < 1)
else
	if close < MAlong[1] - band[1] and close < MAshort[1] - band[1]
		strategy.entry("Short", strategy.short, when=strategy.position_size > -1)

if close < MAlong[1] - band[1] or close < MAshort[1] - band[1]
	strategy.close("Long", when=strategy.position_size > 0)
else
	if close > MAlong[1] + band[1] or close > MAshort[1] + band[1]
		strategy.close("Short", when=strategy.position_size < 0)
```

> Detail

https://www.fmz.com/strategy/442387

> Last Modified

2024-02-21 15:08:27
