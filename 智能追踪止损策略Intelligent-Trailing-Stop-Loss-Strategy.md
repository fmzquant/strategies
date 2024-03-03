
> Name

智能追踪止损策略Intelligent-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16ce552f134ca90245f.png)
[trans]
## 概述

智能追踪止损策略(Intelligent Trailing Stop Loss Strategy)是一个根据价格变化自动调整止损点的策略。它结合了 SAR 指标的逻辑,当价格达到新的高点或低点时,追踪调整止损线,实现最大回撤控制。

## 策略原理

该策略的核心逻辑是根据 SAR 指标自动调整止损线。具体来说,它定义了 4 个变量:

- EP:极值点
- SAR:当前的止损点
- AF:步长因子,用来控制止损线调整的幅度
- 上涨趋势标志:判断当前是上涨趋势还是下跌趋势

在上涨趋势时,止损线会不断上调,追踪价格上涨;当价格转为下跌,止损线保持不变,直到再次转为上涨趋势。

止损线调整的幅度通过步长因子 AF 控制。AF 会在成功设置新的止损点时增加,从而扩大下一步的调整幅度。

## 策略优势

该策略最大的优势是可以根据市场波动智能调整止损点,在保证足够的盈利空间的同时,也可以尽量减小最大回撤。相比传统的静态止损方法,它可以更好地捕捉价格趋势。

具体来说,主要有以下几个优势:

1. 减小最大回撤:智能调整止损线,可以在行情反转前退出,最大限度地保护已经实现的盈利
2. 捕捉趋势:止损线会随着新高或者新低而调整,可以自动追踪价格趋势
3. 可自定义参数:用户可以根据自己的风险偏好,自定义 AF 的步长值以及起始值,控制止损调整的灵敏度

## 风险分析

该策略也存在一些风险需要注意:

1. 过于灵敏:如果 AF 的步长调整过大或起始值过小,止损线会过于灵敏,可能会被短期的市场噪音刺激触发
2. 漏失机会:止损太早被触发也可能会导致损失继续上涨后的盈利机会
3. 参数选取:参数设置不当也会影响策略效果,需要针对不同市场调整参数

## 优化方向

该策略还可以从以下几个方向进行优化:

1. 结合其他指标:可以在大周期指标发出信号时暂停止损线调整,避免在趋势反转前过早止损
2. 增加参数自适应模块:可以通过机器学习算法,根据历史数据自动优化参数
3. 多级止损:可以设置多个止损线,追踪不同幅度的行情波动

## 总结

智能追踪止损策略通过模拟 SAR 指标的运行逻辑,实时调整止损线位置,在保护利润的同时,尽量减少漏失机会的可能。它最大限度发挥了止损这个功能本身的价值。

相比传统固定止损点的策略,该策略可以更好地适应市场的变化,更灵活。通过自定义参数设置,用户可以根据自己的风险偏好选择适合自己的止损模式。

当然,该策略也存在一定的参数优化空间,及结合其他指标可以实现的提高效果。总体来说,它为投资者在止损和止盈之间找到了更加智能的平衡点。

||

## Overview

The Intelligent Trailing Stop Loss Strategy is a strategy that automatically adjusts the stop loss point based on price changes. It combines the logic of the SAR indicator and adjusts the trailing stop loss line when the price reaches new high or low points to achieve maximum drawdown control.

## Strategy Principle 

The core logic of this strategy is to automatically adjust the stop loss line based on the SAR indicator. Specifically, it defines four variables:

- EP: Extreme Point  
- SAR: Current Stop Loss Point
- AF: Step Factor, used to control the adjustment magnitude of stop loss line
- Uptrend Flag: To judge if it is currently an uptrend or a downtrend

During an uptrend, the stop loss line will continue to move up to trail the rising price. When the price turns into a downtrend, the stop loss line remains unchanged until the next uptrend.

The adjustment magnitude of the stop loss line is controlled by the Step Factor AF. AF will increase when a new stop loss point is successfully set, thereby expanding the next adjustment magnitude.

## Advantages

The biggest advantage of this strategy is that it can intelligently adjust the stop loss point according to market fluctuations, while ensuring sufficient profit space and minimizing the maximum drawdown as much as possible. Compared with the traditional static stop loss method, it can better capture the price trend. 

Specifically, there are main advantages:

1. Reduce Maximum Drawdown: Intelligent adjustment of stop loss line can exit before trend reversal to maximize protection of realized profit
2. Capture Trends: The stop loss line will adjust with new highs or lows and automatically trail price trends  
3. Customizable Parameters: Users can customize AF step value and initial value based on their own risk preference to control sensitivity of stop loss adjustments

## Risk Analysis

There are also some risks to note for this strategy:

1. Overly Sensitive: If the AF step adjustment is too large or the initial value is too small, the stop loss line will be too sensitive and may be triggered by short-term market noise
2. Missing Opportunities: Triggering stop loss too early may also result in missing profitable opportunities from continued upside
3. Parameter Selection: Improper parameter settings will also affect strategy performance and needs adjustment for different markets

## Optimization Directions

The strategy can also be optimized in the following aspects:

1. Combine With Other Indicators: Pause stop loss line adjustment when major cycle indicators issue signals to avoid premature stop loss before trend reversal  
2. Add Parameter Self-Adaptive Module: Automatically optimize parameters based on historical data using machine learning algorithms
3. Multi-Level Stop Loss: Set up multiple stop loss lines to trail different magnitudes of market fluctuations

## Conclusion

The Intelligent Trailing Stop Loss Strategy adjusts stop loss line positions in real-time by simulating the operating logic of the SAR indicator. While protecting profits, it also minimizes the possibility of missing opportunities as much as possible. It maximizes the inherent value of the stop loss function itself.

Compared with traditional fixed stop loss strategies, this strategy can better adapt to market changes and is more flexible. Through custom parameter settings, users can choose stop loss modes suitable for their own risk preferences.

Of course, there are also certain parameter optimization spaces for this strategy, and improved effects that can be achieved by combining other indicators. Overall, it finds a more intelligent balance between stop loss and profit taking for investors.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|AF_initial|
|v_input_2|0.02|AF_increment|
|v_input_3|0.2|AF_maximum|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-17 00:00:00
end: 2024-01-24 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Lucid SAR Strategy", shorttitle="Lucid SAR Strategy", overlay=true)

// Full credit to Sawcruhteez, Lucid Investment Strategies LLC and Casey Bowman.
// This is a strategy version of the Lucid SAR indicator created by the above-mentioned parties.
// Original version of the indicator: https://www.tradingview.com/script/OkACQQgL-Lucid-SAR/

// Branded under the name "Lucid SAR" 
// As agreed to with Lucid Investment Strategies LLC on July 9, 2019
// https://lucidinvestmentstrategies.com/


// Created by Casey Bowman on July 4, 2019

// MIT License

// Copyright (c) 2019 Casey Bowman

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


AF_initial = input(0.02)
AF_increment = input(0.02)
AF_maximum = input(0.2)


// start with uptrend
uptrend = true
newtrend = false
EP = high
SAR = low
AF = AF_initial

if not na(uptrend[1]) and not na(newtrend[1])
    if uptrend[1]
        EP := max(high, EP[1])
    else
        EP := min(low, EP[1])
    if newtrend[1]
        AF := AF_initial
    else
        if EP != EP[1]
            AF := min(AF_maximum, AF[1] + AF_increment)
        else
            AF := AF[1]
    SAR := SAR[1] + AF * (EP - SAR[1])
    if uptrend[1]
        if newtrend
            SAR := max(high, EP[1])
            EP := min(low, low[1])
        else
            SAR := min(SAR, low[1])
            if not na(low[2])
                SAR := min(SAR, low[2])
            if SAR > low
                uptrend := false
                newtrend := true
                SAR := max(high, EP[1])
                EP := min(low, low[1])
            else
                uptrend := true
                newtrend := false
    else
        if newtrend
            SAR := min(low, EP[1])
            EP := max(high, high[1])
        else
            SAR := max(SAR, high[1])
            if not na(high[2])
                SAR := max(SAR, high[2])
            if SAR < high
                uptrend := true
                newtrend := true
                SAR := min(low, EP[1])
                EP := max(high, high[1])
            else
                uptrend := false
                newtrend := false
            
        

plot(SAR, color = color.blue, style = plot.style_cross, linewidth = 2)

if (uptrend)
    strategy.entry("PBSARLE", strategy.long, comment="PBSARLE")
if (newtrend)
    strategy.entry("PBSARSE", strategy.short, comment="PBSARSE")
```

> Detail

https://www.fmz.com/strategy/439962

> Last Modified

2024-01-25 12:50:12
