
> Name

基于双EMA指标的趋势跟随策略Dual-EMA-Indicator-Based-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d78b6bd70bac097024.png)
[trans]

## 概述

该策略通过计算 zwei 个不同周期的指数移动平均线EMA,并比较它们的大小关系来判断行情趋势,实现趋势跟随。当短周期EMA上穿长周期EMA时,判断为 行情进入上升趋势,策略做多;当短周期EMA下穿长周期EMA时,判断为行情进入下跌趋势,策略做空。

## 策略原理

该策略的核心指标是指数移动平均线(Exponential Moving Average, EMA)。EMA指标能够过滤掉行情的随机性,反应真正的趋势变化。本策略采用了两个不同参数的EMA,一个短周期的34日EMA,一个长周期的89日EMA。 

当短周期EMA从下方上穿长周期EMA时,表示短期趋势开始主导长期趋势,价格进入上升通道,这是策略的做多信号。当短周期EMA从上方下穿长周期EMA时,表示短期趋势开始反转长期趋势,价格进入下跌通道,这是策略的做空信号。这样,策略充分利用两个 EMA 的交叉来捕捉价格变化的趋势信号。

做多做空后,策略会一直持有头寸直到出现相反信号。例如,做多后遇到短周期EMA下穿长周期EMA的做空信号时,就会平掉做多头寸,同时开立做空头寸。这样可以顺势退出正利空头,又可以适时反向做空,最大程度锁定趋势获利。

## 优势分析

该策略最大的优势在于全面利用 EMA 交叉形态来判断行情趋势的变化,精准做多做空,从而可以较好的跟踪趋势。具体来说,优势主要体现在以下几个方面:

1. 利用 EMA 工具判断主流价格趋势变化,ma 在趋势和附加的平滑处理上优于 基本均线工具。

2. 采用双 EMA 结构,过滤掉部分噪音,使信号更加稳定可靠。

3. EMA 周期参数可调,可以灵活适应行情特征,获得更精确的交易信号。

4. 顺势持仓,避免逆势交易,可以减少交易风险。

5. 充分利用趋势获利,一旦获利后及时止盈,避免反转亏损。

## 风险分析

该策略主要面临以下几个方面的风险:

1. 虽然 EMA 可以有效过滤噪音,判断趋势方向,但如果遭遇震荡行情,会出现多次losing信号交织,导致过分频繁交易,增加交易成本和风险。

2. EMA 的周期参数选择不当,会使得信号产生滞后,错过最佳入场时点。

3. 无法判断趋势的转折点和反转时间,可能在转折来临前被套牢。

针对上述风险,可采取以下应对措施:

1. 在震荡行情中,适当放宽止损线,减少losing,或者直接跳过交易等待明确趋势。 

2. 优化 EMA 周期参数的选择,找到最优参数组合。引入自适应 EMA 来动态调整周期。

3. 增加附加指标判断趋势末、结构转折点,避免套牢。典型的组合可以考虑引入 MACD、KDJ、MA 等。

## 优化方向 

该策略还具有进一步优化的空间,主要可以从以下几个方面入手:

1. 进一步优化 EMA 周期的选择,找到最优参数组合。可以考虑动态周期、自适应 EMA 等。

2. 增加止损策略,如移动止损、时间止损、波动止损等,控制单笔交易风险。

3. 增加附加指标判断行情结构,避免套牢风险。典型的如引入 MACD、KDJ、MA 等。

4. 根据大周期级别的结构震荡特点,调整策略的参数。具体来说, trending 市做多参数组合,range 市做空参数组合。

5. 结合仓位管理,根据资金利用率、收益率等指标动态调整仓位大小。

## 总结

该策略核心思路简单清晰,通过 EMA 指标交叉判断行情趋势变化,实现做多做空。策略具有利用 EMA 工具判断趋势、顺势持仓、利用趋势获利等优势。但也存在选择周期、捕捉转折点等问题。这些问题都为策略进一步优化提供了方向。通过引入多种技术指标,丰富本策略的判断依据,可以使策略更稳定、更高效。

||

## Overview

This strategy calculates two EMAs with different periods and compares their size relationship to determine the trend of the market and achieve trend following. When the short-period EMA crosses above the long-period EMA, the market is judged to be in an upward trend and the strategy goes long. When the short-period EMA crosses below the long-period EMA, the market is judged to be in a downward trend and the strategy goes short.

## Strategy Principle  

The core indicator of this strategy is the Exponential Moving Average (EMA). The EMA indicator can filter out market noise and reflect true trend changes. This strategy uses two EMAs with different parameters, a 34-period short-term EMA and an 89-period long-term EMA.

When the short-term EMA crosses above the long-term EMA from below, it indicates that the short-term trend begins to dominate the long-term trend and prices enter an upward channel. This is the strategy's long signal. When the short-term EMA crosses below the long-term EMA from above, it indicates that the short-term trend begins to reverse the long-term trend and prices enter a downward channel. This is the strategy's short signal. In this way, the strategy takes full advantage of the crossover of the two EMAs to capture trend signals from price changes.

After going long or short, the strategy will hold the position until the opposite signal appears. For example, after going long, when the short EMA crosses below the long EMA, which is a short signal, the long position will be closed and a short position will be opened. This allows smoothly exiting profitable long positions and timely shorting in the reverse direction to maximize locking in trend profits.

## Advantage Analysis

The biggest advantage of this strategy is that it fully utilizes EMA cross formations to determine changes in market trends, accurately going long and short, so as to better track trends. Specifically, the main advantages are reflected in the following aspects:

1. Use the EMA tool to determine the main price trend change. The moving average is better than the basic moving average tools in terms of trend and additional smoothing.

2. Adopt a dual EMA structure to filter out some noise and make the signal more stable and reliable.  

3. The EMA cycle parameters are adjustable and can be flexibly adapted to market characteristics to obtain more precise trading signals.

4. Hold positions along the trend to avoid trading against the trend, which can reduce trading risk.

5. Make full use of trend profits. Once profitable, take profits in time to avoid reversal losses.

## Risk Analysis  

The main risks faced by this strategy are:  

1. Although EMAs can effectively filter out noise and determine the trend direction, frequent losing signals interspersed may occur in range-bound markets, leading to excessively frequent trading, increasing transaction costs and risks.

2. Improper selection of EMA cycle parameters may cause signal lag, missing the best entry point.  

3. Unable to determine the inflection point and reversal time of the trend, there is a risk of being trapped before the turn comes.

In response to the above risks, the following countermeasures can be taken:

1. In range-bound markets, appropriately loosen the stop loss to reduce losses, or skip trading altogether waiting for a clear trend.  

2. Optimize the selection of EMA cycle parameters to find the optimal parameter combination. Introduce an adaptive EMA to dynamically adjust the cycle.

3. Increase additional indicators to determine the end of the trend and structural turning points to avoid being trapped. Typical combinations can consider introducing MACD, KDJ, MA and so on.

## Optimization Directions   

There is room for further optimization of this strategy, which can be done mainly from the following aspects:

1. Further optimize the selection of EMA cycles to find the optimal parameter combination. Dynamic cycles and adaptive EMAs can be considered. 

2. Increase stop loss strategies such as moving stop loss, time stop loss, volatility stop loss, etc. to control the risk of single trades.

3. Increase additional indicators to determine market structure and avoid the risk of being trapped. Typical ones include MACD, KDJ, MA and so on.  

4. Adjust strategy parameters according to structural fluctuations at large cycle levels. Specifically, multi-parameter combinations for trending markets and short parameter combinations for range-bound markets.

5. Incorporate position management to dynamically adjust position size based on capital utilization, return rate and other indicators.

## Summary  

The core idea of this strategy is simple and clear, using EMA indicator crosses to determine market trend changes for going long and short. The strategy has advantages in using EMA tools to determine trends, holding positions along the trend, and taking advantage of trends. But there are also problems such as cycle selection and capturing inflection points. These issues all provide direction for further optimization of the strategy. By introducing a variety of technical indicators to enrich the basis for the strategy's judgments, the strategy can be made more stable and efficient.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|34|Short EMA Length|
|v_input_int_2|89|Long EMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-11 00:00:00
end: 2024-02-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Simple Moving Average Strategy", overlay=true)

// Input for EMA lengths
emaShortLength = input.int(34, title="Short EMA Length")
emaLongLength = input.int(89, title="Long EMA Length")

// Calculate EMAs based on inputs
emaShort = ta.ema(close, emaShortLength)
emaLong = ta.ema(close, emaLongLength)

// Plot the EMAs
plot(emaShort, color=color.blue, linewidth=2, title="EMA Short")
plot(emaLong, color=color.orange, linewidth=2, title="EMA Long")

// Generate long and short signals
longCondition = ta.crossover(emaShort, emaLong)
shortCondition = ta.crossunder(emaShort, emaLong)

// Enter long positions
if (longCondition)
    strategy.entry("Long", strategy.long)

// Enter short positions
if (shortCondition)
    strategy.entry("Short", strategy.short)

// Close long positions
if (shortCondition)
    strategy.close("Long")

// Close short positions
if (longCondition)
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/441991

> Last Modified

2024-02-18 14:38:27
