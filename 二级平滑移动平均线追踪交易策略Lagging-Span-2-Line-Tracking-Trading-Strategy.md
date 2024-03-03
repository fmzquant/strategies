
> Name

二级平滑移动平均线追踪交易策略Lagging-Span-2-Line-Tracking-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1838a44c7a016528ad1.png)
 [trans]
### 概述

该策略基于Ichimoku云指标的叫Lagging Span 2的线,根据该线的移动判断趋势方向,进行仓位建立。当价格突破Lagging Span 2线时,判断为趋势转折点,此时可以建立新的头寸。

### 策略原理

该策略主要判断指标Ichimoku云中Lagging Span 2线的移动情况。Lagging Span 2线是基于价格的一个平滑移动均线,通过平滑参数可以调整其灵敏度。当价格从上向下突破Lagging Span 2线时,做空;当价格从下向上突破Lagging Span 2线时,做多。

具体来说,策略通过Donchian函数计算出Lagging Span 2线。然后给该线做一个位移偏移,得到最终的交易信号线。当价格突破该信号线时,判断为价格趋势转折点,此时做多做空。

在入场时,策略同时设置了止盈止损点。做多时设置多单止盈和止损;做空时设置空单止盈和止损。

### 优势分析

该策略主要优势有:

1. 使用Ichimoku云指标中的Lagging Span 2线判断趋势,该线平滑性好,避免假突破。

2. 做多做空信号比较清晰,容易判断。

3. 同时设置止盈止损,可以很好控制风险。

### 风险分析

该策略主要风险有:

1. Lagging Span 2线本身也会有滞后,可能错过趋势较好的入场点。可以适当调整平滑参数优化。

2. 止盈止损设置不当可能造成亏损扩大。可以根据不同品种特点优化设置。

3. 突破交易本身就有被套利盘套住的风险。可以设置趋势过滤条件或者确认突破来避免。

### 优化方向

该策略可以从以下几个方面进行优化:

1. 调整Lagging Span 2线的平滑参数,优化其灵敏度,在发现趋势转折点和防止假突破之间找到平衡。

2. 为做多做空单分别设置止盈止损,同时优化止盈止损的设置,防止过大亏损。

3. 增加趋势判断条件,避免逆势交易。例如结合其他指标判断整体趋势方向。

4. 增加确认机制。在首次突破时不直接入场,而是等待再次回调突破的确认信号。

### 总结

该策略整体较为简单实用。以Ichimoku云指标的Lagging Span 2线为基础,判断价格趋势转折点。同时设置止盈止损来控制风险。该策略优化空间较大,可从多个方面进行调整,既可获得更优入场时机,也可进一步控制风险,从而获得较好的策略效果。

||

### Overview

This strategy is based on the Lagging Span 2 line in the Ichimoku cloud indicator to determine the trend direction and establish positions. When the price breaks through the Lagging Span 2 line, it is judged as an inflection point of the trend, at which time a new position can be established.

### Strategy Principle  

This strategy mainly judges the movement of the Lagging Span 2 line in the Ichimoku cloud indicator. The Lagging Span 2 line is a smooth moving average line based on prices, and its sensitivity can be adjusted through smooth parameters. When the price breaks through the Lagging Span 2 line from top to bottom, go short; when the price breaks through the Lagging Span 2 line from bottom to top, go long.   

Specifically, the strategy calculates the Lagging Span 2 line through the Donchian function. Then make a displacement offset for the line to obtain the final trading signal line. When the price breaks through this signal line, it is judged as a turning point in the price trend, at which point long and short positions can be established.

When entering the market, the strategy also sets take profit and stop loss points. Set take profit and stop loss for long positions when going long; set take profit and stop loss for short positions when going short.

### Advantage Analysis

The main advantages of this strategy are:  

1. Use the Lagging Span 2 line in the Ichimoku cloud indicator to determine the trend. This line has good smoothness and avoids false breakouts.  

2. Long and short signals are clear and easy to determine.   

3. Take profit and stop loss are set at the same time to effectively control risks.   

### Risk Analysis   

The main risks of this strategy are:   

1. The Lagging Span 2 line itself has a lag and may miss better entry points in the trend. The smooth parameters can be optimized as appropriate. 

2. Improper stop profit and stop loss settings may lead to greater losses. Can be optimized according to the characteristics of different varieties.  

3. Breakthrough trading itself carries the risk of being trapped by scalpers. Trend filters or confirmation of breakthrough can be set to avoid this.

### Optimization Directions  

The strategy can be optimized in the following aspects:  

1. Adjust the smooth parameter of the Lagging Span 2 line to optimize its sensitivity and find a balance between discovering trend reversal points and preventing false breakouts.  

2. Set separate take profit and stop loss for long and short positions, while optimizing the take profit and stop loss settings to prevent excessive losses.   

3. Add trend judgment conditions to avoid trading against the trend. For example, determine the overall trend direction in conjunction with other indicators.  

4. Increase confirmation mechanism. Do not enter the market at the first breakout, but wait for the confirmation signal of the callback breakout again.   

### Conclusion  

The strategy is relatively simple and practical. It uses the Lagging Span 2 line in the Ichimoku cloud indicator as the basis to determine the turning point of the price trend. At the same time, take profit and stop loss are set to control risks. The strategy has large room for optimization, and can be adjusted in multiple aspects to obtain better entry opportunities as well as further control risks, thereby achieving better strategy results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|52|Lead Look Back|
|v_input_int_2|26|Displacement|
|v_input_bool_1|false|Sadece Long Yönlü Poz Aç|
|v_input_int_3|10000|Long Kar Al Puanı|
|v_input_int_4|7500|Long Zarar Durdur Puanı|
|v_input_int_5|20000|Short Kar Al Puanı|
|v_input_int_6|7500|Short Zarar Durdur Puanı|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-25 00:00:00
end: 2024-01-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © MGULHANN

//@version=5
strategy("TPS - FX Trade", overlay=true)

laggingSpan2Periods = input.int(52, minval=1, title="Lead Look Back")
displacement = input.int(26, minval=1, title="Displacement")

pozyonu = input.bool(false,title="Sadece Long Yönlü Poz Aç")

// Stop Loss ve Kar Al Seviye Girişleri
TPLong = input.int(10000, minval = 30, title ="Long Kar Al Puanı", step=10)
SLLong = input.int(7500, minval = 30, title ="Long Zarar Durdur Puanı", step=10)
TPShort = input.int(20000, minval = 30, title ="Short Kar Al Puanı", step=10)
SLShort = input.int(7500, minval = 30, title ="Short Zarar Durdur Puanı", step=10)


donchian(len) => math.avg(ta.lowest(len), ta.highest(len))
leadLine = donchian(laggingSpan2Periods)
plot(leadLine, offset = displacement - 1, color=#EF9A9A,title="Lead2 Çizgisi")

buycross = ta.crossover(close,leadLine[displacement-1]) 
sellcross = ta.crossover(leadLine[displacement-1],close)


if (buycross) and (pozyonu == true) or buycross 
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", "Long", profit=TPLong, loss=SLLong)
if (sellcross) and pozyonu == false
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", "Short", profit=TPShort, loss=SLShort)



```

> Detail

https://www.fmz.com/strategy/439964

> Last Modified

2024-01-25 13:00:51
