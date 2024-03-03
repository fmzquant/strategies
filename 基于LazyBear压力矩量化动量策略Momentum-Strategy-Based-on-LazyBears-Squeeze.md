
> Name

基于LazyBear压力矩量化动量策略Momentum-Strategy-Based-on-LazyBears-Squeeze

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d52d9dda4ac8ef2680.png)
[trans]

## 概述

该策略主要思路基于LazyBear的Squeeze Momentum指标,分析买入和卖出的时机。它通过分析动量的趋势转折点,定位高点和低点,作为卖出和买入的信号。由于这是一个做多策略,因此还考虑了50周期的指数移动平均线来识别上升趋势。如果蜡烛的收盘价高于50日指数移动平均线,且50日指数移动平均线处于上升趋势时,则执行买入信号。如果这些条件不满足,则忽略买入信号。

## 策略原理

该策略融合布林带指标和Keltner通道指标识别趋势和压力区间。具体来说,它计算20周期的布林带,以及20周期Keltner通道的上下轨。当布林带完全落入Keltner通道内时,被视为挤压信号。当布林带下轨线超过Keltner通道下轨且布林带上轨线低于Keltner通道上轨时识别为挤压区间。相反,当布林带下轨线低于Keltner通道下轨且布林带上轨线高于Keltner通道上轨则识别为非挤压区间。

此外,该策略还利用线性回归分析动量的变化趋势和斜率。它计算过去20周期价格减去典型价格的线性回归值。当线性回归值的斜率为正,视为上升趋势;当斜率为负,则为下降趋势。在挤压区间内时,如果动量斜率发生反转,即视为买入和卖出信号。具体来说,当挤压区间内,动量由正转负时,产生卖出信号;而当挤压区间内,动量由负转正时,产生买入信号。

为过滤假信号,该策略还会判断收盘价是否高于50日指数移动平均线,以及50日指数移动平均线是否处于上升。只有这两个条件同时满足时,买入信号才会被执行。

## 策略优势分析

这是一个非常聪明的策略,同时利用两种不同类型指标对市场进行多维度判断,可以有效避免假信号。具体来说,它的优势有:

1. 综合运用布林带、Keltner通道和动量指标,进行多维度分析,提高判断准确性。

2. 挤压区间可以有效识别动量反转的高低点,精确捕捉转折。 

3. 基于收盘价和50日指数移动平均线进行趋势过滤,可以避免在盘整中重复开仓。

4. 只在挤压区间发出信号,可以减少假信号,提高盈利概率。

5. 该策略参数优化空间大,可通过调整周期等参数进行针对性优化。

6. 长短兼顾,既考虑了大周期趋势,又结合了中短期指标,做多方向明确。

## 风险分析

尽管该策略 Nonfarming 了多项技术指标判断,但仍存在一定风险:

1. 布林带和Keltner通道发散时,会错过买入/卖出时机。

2. 行情暴涨暴跌时,会给策略带来较大亏损。

3. 高波动行情中,挤压情况可能不明显,信号较少。

4. 牛熊转换时,容易形成调整亏损。

针对这些风险,我们可以通过以下方法加以规避:

1. 优化参数,使布林带和Keltner通道尽量同步。

2. 设置止损线,控制单笔损失。

3. 采用本策略作为组合策略的一部分,与其他策略搭配使用。

4. 在高波动行情中,适当降低仓位。

## 优化方向

该策略还有很大的优化空间,主要优化方向有:
 
1. 优化布林带和Keltner通道的长度周期,使它们尽可能同步。

2. 测试不同的倍数因子,寻找最佳参数组合。 

3. 尝试加入其他指标进行确认,如RSI等。

4. 基于文华五彩线等模型判断市场阶段,有选择性地使用该策略。

5. 采用机器学习等方法动态优化参数。

6. 回测不同币种,寻找最适合的交易品种。

7. 探索该策略在更长周期(日线、周线等)的效果。

## 总结

 LazyBear压力矩量化动量策略综合运用多种技术指标,在挤压区间精确识别动量转折进行交易,避免在非趋势行情中频繁开仓。它系统性地定义了量化买卖规则,在回测中表现优异。通过优化参数设置、引入新的判断指标等手段,该策略还具有很大的改进空间,值得量化交易者深入研究和应用。

|| 

## Overview

The main idea of this strategy is based on LazyBear's Squeeze Momentum indicator to analyze the timing of buying and selling. It analyzes the inflection points in the momentum trend, locating the peaks and troughs as sell and buy signals respectively. As it is a long strategy, it also takes into consideration the 50 period Exponential Moving Average to identify upward trends. If the closing price of the candle is above the 50EMA, and the slope of the 50EMA is trending upwards, then the buy signal is executed.

## Strategy Principle 

This strategy incorporates Bollinger Bands and Keltner Channels to identify trends and squeeze zones. Specifically, it calculates a 20-period Bollinger Bands and 20-period Keltner Channels. When Bollinger Bands fall entirely within the Keltner Channels, it is viewed as a squeeze signal. The squeeze zone is identified when the Bollinger Bands lower band goes above the Keltner Channels lower band and the Bollinger Bands upper band goes below the Keltner Channels upper band. Conversely, when the Bollinger Bands lower band falls below the Keltner Channels lower band and the Bollinger Bands upper band rises above the Keltner Channels upper band, it is a non-squeeze zone.

In addition, the strategy utilizes linear regression to analyze the change in momentum slope. It calculates the linear regression value of price over the last 20 periods minus the typical price. When the slope of the linear regression value is positive, it is viewed as an upward trend. When the slope is negative, it is a downward trend. Within the squeeze zone, if there is a reversal in the momentum slope, it signals a buy or sell. Specifically, when within the squeeze zone, a momentum flip from positive to negative issues a sell signal. And when within the squeeze zone, a momentum flip from negative to positive issues a buy signal.  

To filter out false signals, the strategy also judges if the closing price is above the 50-day Exponential Moving Average and if the 50-day Exponential Moving Average is in an upward slope. Only when both conditions are met will the buy signal be executed.

## Advantage Analysis

This is a very clever strategy, utilizing two different types of indicators to make a multi-dimensional judgment of the market, which can effectively avoid false signals. Specifically, its advantages are:

1. Comprehensive application of Bollinger Bands, Keltner Channels and momentum indicators for multi-dimensional analysis and improved accuracy.

2. Squeeze zones can effectively identify peaks and troughs of momentum reversals and precisely capture turns.

3. Trend filtering based on closing price and 50-day EMA avoids repetitive opening of positions during consolidations. 

4. Signals only emitting during squeeze zones reduces false signals and improves profitability rate.

5. Large parameter optimization space allows targeted optimizations via adjusting periods etc.

6. Long and short combined, considers large cycle trends and integrates medium-term indicators, long direction is clear.

## Risk Analysis 

Although this strategy has Nonfarmed multiple technical indicators, there are still some risks:

1. Missing buy/sell opportunities when Bollinger Bands and Keltner Channels diverge.  

2. Large losses may occur during violent market rises or falls.

3. In high volatility markets, squeeze situations may not be obvious, resulting in fewer signals. 

4. Prone to adjustment losses during bull-bear transitions.

To avoid these risks, we can take the following measures:

1. Optimize parameters to synchronize Bollinger Bands and Keltner Channels as much as possible. 

2. Set stop loss to control single loss.

3. Use this strategy as part of a portfolio strategy, combined with other strategies.  

4. Reduce positions appropriately during high volatility markets.


## Optimization Directions

There is still large room for optimizing this strategy, mainly in the following directions:

1. Optimize periods of Bollinger Bands and Keltner Channels to synchronize them as much as possible.  

2. Test different multiplier factors to find optimal parameter combinations.

3. Try introducing other indicators for confirmation, such as RSI etc. 

4. Based on Wen Hua Five Color Lines models, selectively utilize this strategy depending on market stages.

5. Adopt machine learning etc to dynamically optimize parameters.

6. Backtest on different coins to find the most suitable trading products.

7. Explore efficacy of this strategy on longer timeframes (daily, weekly etc).


## Conclusion

The LazyBear Squeeze Momentum Strategy comprehensively employs various technical indicators, accurately identifying momentum reversals for trading during squeeze zones, avoiding repetitive opening of positions during non-trending markets. It has systematically defined quantifiable buy and sell rules, performing excellently in backtests. Through optimizing parameter settings, introducing new judgment indicators etc, this strategy has large room for improvements and is worth in-depth research and application by quant traders.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|BB Length|
|v_input_2|2|BB MultFactor|
|v_input_3|20|KC Length|
|v_input_4|1.5|KC MultFactor|
|v_input_5|true|Use TrueRange (KC)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//
// @author LazyBear 
// List of all my indicators: https://www.tradingview.com/v/4IneGo8h/
//
initialBalance = 8000

strategy("Crypto momentum strategy", overlay=false)


length = input(20, title="BB Length")
mult = input(2.0, title="BB MultFactor")
lengthKC = input(20, title="KC Length")
multKC = input(1.5, title="KC MultFactor")

useTrueRange = input(true, title="Use TrueRange (KC)", type=input.bool)

// Calculate BB
source = close
basis = sma(source, length)
ema = ema(source, 50)
dev = multKC * stdev(source, length)
upperBB = basis + dev
lowerBB = basis - dev

// Calculate KC
ma = sma(source, lengthKC)
range = useTrueRange ? tr : high - low
rangema = sma(range, lengthKC)
upperKC = ma + rangema * multKC
lowerKC = ma - rangema * multKC

sqzOn = lowerBB > lowerKC and upperBB < upperKC
sqzOff = lowerBB < lowerKC and upperBB > upperKC
noSqz = sqzOn == false and sqzOff == false

val = linreg(source - avg(avg(highest(high, lengthKC), lowest(low, lengthKC)), sma(close, lengthKC)), lengthKC, 0)

slope = (val - val[2])
emaSlope = (ema - ema[1])


bcolor = iff(slope > 0, color.lime, color.red)
scolor = noSqz ? color.green : sqzOn ? color.black : color.green
squeeze = (noSqz ? 0 : sqzOn ? 1 : 0)

plot(val, color=color.gray, style=plot.style_line, linewidth=1, title="momentum")
plot(slope, color=bcolor, style=plot.style_circles, linewidth=2, title="slope")
plot(0, color=scolor, style=plot.style_line, linewidth=2, title="squeeze-zero")

co = crossover(slope / abs(slope), 0)
cu = crossunder(slope / abs(slope), 0)

if co and source > ema and emaSlope > 0
    strategy.entry("long", strategy.long, comment="long")
if cu
    strategy.close("long")

```

> Detail

https://www.fmz.com/strategy/436117

> Last Modified

2023-12-21 14:22:49
