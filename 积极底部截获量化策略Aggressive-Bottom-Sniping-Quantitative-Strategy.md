
> Name

积极底部截获量化策略Aggressive-Bottom-Sniping-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10cd87c0ffee787280c.png)
[trans]
## 概述

该策略通过在下跌趋势中判断突出的交易量定位短期底部,在超卖条件下进行买入操作,属于积极的短线交易策略。

## 策略原理

当交易量超过基于SMA的平均量2倍标准差时认为是突出交易量,同时RSI低于30时认为是超卖状态。当两者条件同时满足时,判断为短期底部并立即做多。做多后一定时间后(如10根K线)会平仓离场。

所以该策略的逻辑只有下面几步:

1. 计算最近20根K线的交易量SMA作为基准量
2. 计算最近20根K线交易量的2倍标准差作为突出量的判断标准
3. 计算最近20根K线的RSI判断是否超卖
4. 当交易量超过基准量+2倍标准差且RSI低于30时,判断为短期底部
5. 在短期底部时立即做多
6. 10根K线后自动平仓

## 优势分析

该策略具有以下优势:

1. 逻辑简单,容易理解和优化
2. 利用了交易量突出的特点判断短期转折点
3. RSI指标确保只在超卖区做多,避免追顶
4. 自动止损,最大化回避尾部风险

总的来说,策略充分利用了量能突破判断短期趋势反转的特点,同时严格控制了风险,是一种可靠性较高的积极做多策略。

## 风险分析

该策略主要存在以下风险:

1. 交易量和RSI所构成的交易信号可能出现假突破的情况,导致错误做多亏损;
2. 固定的止损时间设置可能在市场大幅反转时无法止损或止损过早;
3. parameter优化不到位可能导致信号频繁或过少。

针对以上风险,可以从以下几个方面进行优化:

1. 增加其他指标过滤,避免假突破的信号;
2. 设置动态跟踪止损,而不是固定Root K线止损; 
3. 全面测试并优化参数,确保参数稳健。

## 优化方向  

该策略可以从以下几个方面进行进一步优化:

1. 增加机器学习模型判断量能突破的可靠性,避免假信号
2. 增加自适应止损机制,而不是简单的固定根K线设置
3. 针对突出量参数进行多维数据集优化
4. 增加机器学习筛选超卖信号的准确性
5. 结合情绪面分析增加策略的阿尔法

通过引入更多先进的技术指标、机器学习和情绪面分析,可以显著提高策略的稳定性、阿尔法和 Sharpe 比率。

## 总结

该策略整体来说是一个非常简单直接、逻辑清晰的短线突破策略。通过合理应用交易量指标判断短期趋势反转点,同时严格控制风险,可以获得不错的效果。但是仍然存在一定的假信号风险和参数健壮性风险。这些问题都可以通过引入更多先进技术进行逐步改进和优化,使策略的效果更加显著。

||

## Overview

This strategy identifies short-term bottoms by detecting outstanding volume in a downtrend, and takes long positions during oversold conditions. It is an aggressive short-term trading strategy.  

## Strategy Principles  

When the volume exceeds 2 standard deviations above the SMA-based average volume, it is considered outstanding volume. Meanwhile, RSI below 30 indicates oversold status. When both conditions are met, it is judged as a short-term bottom and long position is taken immediately. The position will be closed after a certain period of time (e.g. 10 bars).

So the logic of this strategy is simple:  

1. Calculate 20-bar SMA of volume as benchmark  
2. Calculate 2 standard deviation of 20-bar volume as threshold for outstanding volume  
3. Calculate 20-bar RSI to judge oversold status  
4. When volume exceeds benchmark + 2 standard deviation and RSI < 30, judge as short-term bottom
5. Take long position immediately at bottom 
6. Close position after 10 bars automatically  

## Advantage Analysis

The advantages of this strategy include:

1. Simple logic, easy to understand and optimize  
2. Utilize outstanding volume to detect short-term turning points  
3. RSI ensures only taking longs in oversold zone, avoiding chasing tops  
4. Automatic stop loss maximizes risk evasion at bottoms  

In summary, this strategy takes advantage of volume breakouts to catch trend reversals, while strictly controlling risks. It is a reliable aggressive long strategy.

## Risk Analysis  

The main risks of this strategy include:

1. Volume and RSI may generate false breakout signals, causing wrong longs and losses.
2. Fixed stop loss time may fail to stop loss or stop loss too early during significant market reversal. 
3. Suboptimal parameter tuning may lead to too few or too many signals.

To address these risks, optimization can be done in the following aspects:

1. Add other indicators to filter false breakout signals.  
2. Set dynamic trailing stop loss instead of fixed number of bars.
3. Comprehensive parameter testing and tuning to ensure robustness.  

## Optimization Directions

This strategy can be further optimized in the following aspects:

1. Add ML model to judge reliability of volume breakouts to avoid false signals  
2. Add adaptive stop loss mechanism instead of fixed bars
3. Multi-dimensional dataset optimization for outstanding volume parameters   
4. Increase accuracy of oversold signals using ML screening
5. Incorporate sentiment analysis to improve alpha

By introducing more advanced techniques, significant improvement can be achieved on stability, alpha and Sharpe ratio.  

## Conclusion  

In summary, this is a very simple, straightforward and logical short-term breakout strategy. By properly leveraging volume to detect trend reversals, and strictly controlling risks, solid performance can be achieved. But risks of false signals and parameter robustness exist. These can be addressed incrementally by introducing more advanced techniques to further improve the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Volume SMA Length|
|v_input_2|2|mult|
|v_input_3|20|RSI Length|
|v_input_4|30|Oversold|
|v_input_5|10|Close After|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-17 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © footlz

//@version=4
strategy("Bottom catch strategy", overlay=true)

v_len = input(20, title="Volume SMA Length")
mult = input(2)
rsi_len = input(20, title="RSI Length")
oversold = input(30, title="Oversold")
close_time = input(10, title="Close After")

v = volume
basis = sma(v, v_len)
dev = mult * stdev(v, v_len)
upper_volume = basis + dev

rsi = rsi(close, rsi_len)

long = v > upper_volume and rsi < oversold

strategy.entry("Long", true, when=long)

passed_time = 0.0
if strategy.position_size != 0
    passed_time := 1
else
    passed_time := 0

if strategy.position_size != 0 and strategy.position_size[1] != 0
    passed_time := passed_time[1] + 1

if passed_time >= close_time
    strategy.close_all()

// If want to enable plot, change overlay=false.
v_color = close >= close[1] ? color.new(#3eb370, 0) : color.new(#e9546b, 0)

// plot(v, title="volume", color=v_color, style=plot.style_columns)
// plot(upper_volume, title="Threshold", color=color.aqua)
```

> Detail

https://www.fmz.com/strategy/439270

> Last Modified

2024-01-18 16:25:33
