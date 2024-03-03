
> Name

双确认唐奇安通道趋势策略Dual-Confirmation-Donchian-Channel-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8a61e4008108c62c01.png)
[trans]

### 概述

本策略基于标准的唐奇安通道指标开发。它默认在发出交易信号前会等待两个连续的更高高点(或更低低点)确认,从而避免被市场做市商的虚晃击败。

该策略还提供了可选项,可以关闭双确认机制,使策略在出现新高或新低时立即发出交易信号。

对于不喜欢做空的人,策略还提供了过滤空头交易的选项。

### 策略原理

该策略基于唐奇安通道指标的上轨和下轨。上轨是过去n根K线的最高价的最大值,下轨是过去n根K线的最低价的最小值。其中n的值默认为20。

中间轨是上轨和下轨的平均值,可用来判断趋势方向。

当价格突破上轨时,策略会在多头仓位为空的前提下开多;当价格跌破下轨时,策略会在空头仓位为空的前提下开空。

为过滤假突破,策略默认开启了“等待双确认”选项。这意味着,必须要有两个连续的更高更高点(或更低更低点)才会发出交易信号。

### 优势分析

该策略具有以下优势:

1. 唐奇安通道指标简单实用,容易理解实现。

2. 双确认机制可有效过滤假突破,避免被套。

3. 可自定义通道周期长度,适应不同市场环境。

4. 提供空头交易选项,可满足不同投资者的需求。

5. 代码简洁,容易理解和二次开发。

### 风险分析

该策略也存在一些风险:

1. 双确认机制可能错过部分交易机会。

2. 通道周期设置不当可能导致过于频繁或过于稀疏的交易。

3. 持仓时间过长可能无法有效控制风险。

4. 空头交易带来的额外风险需要注意。

5. 回测数据拟合风险需要警惕。

对应解决方法:

1. 可关闭双确认机制,或适当缩短双确认间隔。

2. 优化参数,选取合适的通道周期。

3. 设置止损或止盈,合理控制单笔损失。 

4. 禁用空头交易,只做多头。

5. 在不同市场环境中多次回测,严格评估策略。

### 优化方向  

该策略的优化方向包括:

1. 基于波动率指标动态调整仓位大小。

2. 基于突破力度指标过滤假突破。 

3. 加入移动止损机制,跟踪趋势运行。

4. 结合其它指标判断趋势方向,避免错过重要转折点。

5. 使用机器学习方法自动优化参数。

这些优化措施可以进一步提高策略的稳定性和盈利能力。

### 总结

本策略基于唐奇安通道的双确认机制,在控制风险的同时实现了简单有效的趋势跟踪。通过参数优化和功能扩展,该策略可以适应更广泛的市场环境,具有很好的实用性。

||

### Overview

This strategy is developed based on the standard Donchian Channel indicator. It waits for two consecutive higher highs (or lower lows) for confirmation by default before issuing trading signals, so as to avoid being whipped out by market makers' fakeouts.  

The strategy also provides the option to disable the dual confirmation mechanism, so that it can issue trading signals immediately upon seeing new highs or lows.

For people who don't like to short, there is also the option to exclude short positions.

### Strategy Logic

The strategy is based on the upper and lower bands of the Donchian Channel indicator. The upper band is the highest high over the past n bars, while the lower band is the lowest low over the past n bars. The default lookback period n is 20.

The middle band is the average of the upper and lower bands, and can be used to gauge the trend direction.  

When the price breaks above the upper band, the strategy will long if there is no existing long position. When the price breaks below the lower band, the strategy will short if there is no existing short position.

To filter out false breakouts, the "wait for double confirmation" option is enabled by default. This means two consecutive higher highs (or lower lows) must be seen before a trading signal is issued.


### Advantage Analysis

The advantages of this strategy include:

1. The Donchian Channel indicator is simple and easy to understand. 

2. The dual confirmation mechanism effectively filters out false breakouts and avoids being trapped.

3. The channel lookback period is customizable to adapt to different market environments.  

4. The short selling option accommodates needs from different investors.

5. The code is clean and easy to comprehend for further development.


### Risk Analysis

There are also some risks with this strategy:

1. The dual confirmation may cause some trading opportunities to be missed.  

2. Improper channel period settings may result in overly frequent or sparse trading.

3. Long holding periods may fail to effectively control risks. 

4. Additional risks from short selling need to be watched out for.  

5. Backtest overfitting needs to be cautious about.

Corresponding solutions:

1. Disable dual confirmation or shorten the confirmation interval.  

2. Optimize parameters and select suitable channel periods. 

3. Set stop loss/profit to reasonably limit per trade loss.

4. Disable short selling, go long only.

5. Robustly evaluate strategy across different market environments.


### Enhancement Opportunities

Enhancement opportunities include:

1. Dynamically adjust position sizing based on volatility.  

2. Filter false breakouts based on breaking intensity metrics.

3. Incorporate trailing stop mechanism to follow trends.

4. Combine other indicators to determine trend direction and avoid missing major turning points.  

5. Auto-optimize parameters via machine learning.

These enhancements can further improve the stability and profitability of the strategy.


### Conclusion

This is a simple yet effective trend following strategy based on the dual confirmation mechanism of the Donchian Channel. With parameter tuning and feature expansion, the strategy can be adapted to a wider range of market environments and has great practical utility.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|length|
|v_input_2|true|Wait for double confirmation?|
|v_input_3|true|Include short positions|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Donchian Channels", shorttitle="DC", overlay=true, initial_capital=10000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, calc_on_every_tick=true)
length = input(20, minval=1)
lower = lowest(length)
upper = highest(length)
basis = avg(upper, lower)
bool inShortPos = false
bool inLongPos = false
bool wait4confirmation = input(true, title="Wait for double confirmation?")
bool doShort = input(true, title="Include short positions")

plot(basis, "Basis", color=#FF6D00)
u = plot(upper, "Upper", color=#2962FF)
l = plot(lower, "Lower", color=#2962FF)
fill(u, l, color=color.rgb(33, 150, 243, 95), title="Background")

//if(inShortPos == false and inLongPos == false)
if(not inLongPos and upper > upper[1])
    if(wait4confirmation)
        if(not inLongPos and upper > upper[1] and upper[1] > upper[2])
            strategy.close("Short", true)
            strategy.entry("Buy", true)
    else
        strategy.close("Short", true)
        strategy.entry("Buy", true)
else
    if(not inShortPos and lower < lower[1])
        if(wait4confirmation)
            if(not inShortPos and lower < lower[1] and lower[1] < lower[2])
                strategy.close("Buy", true)
                if(doShort)
                    strategy.entry("Short", true)
        else
            strategy.close("Buy", true)
            if(doShort)
                strategy.entry("Short", true)
```

> Detail

https://www.fmz.com/strategy/436209

> Last Modified

2023-12-22 10:55:06
