
> Name

玻尔福重复索纳策略Bollinger-Bands-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/200e63f721bf03311f2.png)
[trans]
### 概述

玻尔福重复索纳策略是一种基于玻尔福带的量化交易策略。该策略利用玻尔福带上下轨之间的价格区间,判断市场波动范围,识别潜在的入场和退场时机。

### 策略原理

该策略主要依据以下几个指标进行判断:

1. 玻尔福中线:简单移动平均线SMA,代表市场总体趋势。

2. 玻尔福上轨:中线+ N倍标准差。上轨代表市场波动的上限。

3. 玻尔福下轨:中线- N倍标准差。下轨代表市场波动的下限。

当收盘价高于下轨,且开盘价低于下轨时,判断为潜在的底部,可以考虑入场。当收盘价高于上轨,且开盘价低于上轨时,判断为潜在的突破上轨的信号,也可入场。

当收盘价低于上轨,且开盘价高于上轨时,判断为已经进入玻尔带上部,应考虑退场。当收盘价高于开盘价,且上下轨距离超过2倍中线时,判断为波动加大的信号,也应退场。

### 优势分析

1. 利用双轨组合判断,提高信号准确性。收盘价与开盘价的组合判断,可以滤除部分假信号。

2. 基于标准差计算波动范围,自动适应市场变化。不需要手动设置固定价格区间。

3. 结合中线趋势判断,避免在没有趋势的市场中反复震荡。

4. 采用中轨突破来判断趋势反转时点。可以及时抓住潜在机会。
 
### 风险分析

1. 中短线操作策略,不适合长线持有。需要密切关注市场情况,及时止损。

2. 玻尔福带仅在一定时间框架下有效。如果采用不当的参数设置,容易产生假信号。

3. 在盘整市场中,中线震荡较大,上下轨交替触发可能较频繁。这时应降低仓位规模,或暂时停止操作。

### 优化方向

1. 调整参数,适应更长的时间周期。可以通过增大周期长度,使用指数移动平均等方法优化中轨的算法。

2. 增加波动判断指标,如ATR,进一步避免假突破。可以设置ATRprebuilt值作为过滤条件,只有在波动大于一定幅度时才产生交易信号。

3. 结合其它指标,实现Barry过滤效果。例如增加成交量的判断规则,只在成交量放大时进行操作。

### 总结

玻尔福重复索纳策略通过定义价格通道,自动识别市场中的范围极值点作为潜在交易机会。它非常适合捕捉中短期价格反转,可作为趋势跟踪策略的补充。通过合理优化,能有效控制风险,提高盈利概率。

||

### Summary

The Bollinger Bands Repetitive Zona Strategy is a quantitative trading strategy based on Bollinger Bands. The strategy uses the price range between the upper and lower bands of Bollinger Bands to determine the range of market volatility and identify potential entry and exit points.  

### Principles  

The strategy mainly relies on the following indicators for judgment:  

1. Bollinger Middle Band: Simple Moving Average SMA, representing the overall market trend.  

2. Bollinger Upper Band: Middle + N times standard deviation. The upper band represents the upper limit of market volatility.  

3. Bollinger Lower Band: Middle - N times standard deviation. The lower band represents the lower limit of market volatility.  

When the closing price is higher than the lower rail and the opening price is lower than the lower rail, it is judged as a potential bottom and a possible entry point. When the closing price is higher than the upper rail and the opening price is lower than the upper rail, it is judged as a potential breakout signal above the upper rail, which can also enter the market.  

When the closing price is lower than the upper rail and the opening price is higher than the upper rail, it is determined that it has entered the upper part of the Bollinger Band and exit should be considered. When the closing price is higher than the opening price and the distance between the upper and lower rails exceeds 2 times the middle line, it is judged that the volatility has increased, and exit should also be considered.

### Advantage Analysis   

1. The combination of double rail judgment improves the accuracy of signals. The combination of closing price and opening price can filter out some false signals.  

2. Volatility range is calculated based on standard deviation, automatically adapting to market changes. No need to manually set fixed price ranges.  

3. Combined with trend judgment of middle line to avoid repeated shocks in the market without a trend.  

4. Use middle rail breakthrough to determine trend reversal points. Can grasp potential opportunities in a timely manner.   

### Risk Analysis

1. Medium-term operating strategies are not suitable for long-term holdings. Need to closely monitor market conditions for timely stop loss.  

2. Bollinger Bands are only valid within a certain timeframe. Improper parameter settings can easily generate false signals.  

3. In a range-bound market, the middle line fluctuates greatly, and the alternate triggering of upper and lower rails may be more frequent. At this point, the position size should be reduced or operations should be temporarily suspended.

### Optimization Directions  

1. Adjust parameters to adapt to longer time cycles. Methods such as increasing cycle length and using exponential moving averages can optimize middle rail algorithms.  

2. Add volatility indicators such as ATR to further avoid false breakthroughs. ATR prebuilt values ​​can be set as filtering conditions, and trading signals are generated only when volatility exceeds a certain range.  

3. Combine other indicators to achieve the Barry filter effect. For example, add transaction volume judgment rules, only operate when transaction volume expands.  

### Summary  

The Bollinger Bands repetitive zona strategy automatically identifies potential extremes in the market to define price channels as potential trading opportunities. It is very suitable for capturing medium-term price reversals and can supplement trend tracking strategies. Through reasonable optimization, risks can be effectively controlled and profitability improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|55|length|
|v_input_string_1|0|Basis MA Type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|true|StdDev|
|v_input_int_2|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-13 00:00:00
end: 2024-02-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("BB Strategy", shorttitle="BB", overlay=true)

length = input.int(55, minval=1)
maType = input.string("SMA", "Basis MA Type", options = ["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
src = input(close, title="Source")
mult = input.float(1., minval=0.001, maxval=50, title="StdDev")

ma(source, length, _type) =>
    switch _type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

basis = ma(src, length, maType)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev

// Entry conditions
enterCondition = (close > lower and open < lower and close > open) or (close > upper and open < upper and close > open)

// Exit conditions
exitCondition = (close < upper and open > upper) or (close > open and (upper - lower) > 2 * basis) or (close < lower)

strategy.entry("Long", strategy.long, when=enterCondition)
strategy.close("Long", when=exitCondition)

// Plotting
offset = input.int(0, "Offset", minval = -500, maxval = 500)
plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))

```

> Detail

https://www.fmz.com/strategy/442273

> Last Modified

2024-02-20 17:05:47
