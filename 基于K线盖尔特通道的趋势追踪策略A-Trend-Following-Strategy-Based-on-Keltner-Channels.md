
> Name

基于K线盖尔特通道的趋势追踪策略A-Trend-Following-Strategy-Based-on-Keltner-Channels

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ba247f4af7cc0f6d6e.png)
[trans]


### 概述

本策略基于K线的盖尔特通道指标设计,通过判断价格突破通道上下轨,实现趋势追踪交易。该策略适合中短线持仓,可以有效跟踪趋势,获利潜力较大。

### 策略原理

该策略主要通过建立盖尔特通道判断价格趋势和潜在支撑阻力。具体来说,策略首先计算K线的EMA均线,然后在其上下各添加keltnerDeviation倍的ATR波幅作为上下轨构建盖尔特通道。当价格上穿下轨时做多入场,下穿上轨时做空入场,实现趋势追踪。此外,策略还提供了一个closeOnEMATouch参数,用于控制是否在价格触及EMA均线时主动止损退出。

该策略的核心逻辑主要集中在三部分:

1. 构建盖尔特通道指标,包括计算EMA均线、ATR波幅、上下轨;

2. 判断突破入场信号,包括价格上穿下轨做多和下穿上轨做空;

3. 提供closeOnEMATouch参数控制是否在价格触及EMA时止损。

通过这三部分的组合,实现了基于通道指标的趋势追踪交易策略。

### 优势分析 

与传统的移动止损策略相比,该策略具有如下几点主要优势:

1. 能够有效跟踪市场趋势和大方向;

2. 中短线持仓时间较长,避免过于频繁交易;

3. 由于考量波动率因素,对异常行情有一定的过滤效果;

4. 提供止损机制控制风险。

所以,该策略非常适合对市场大趋势判断准确,追求较大资金利用率的量化交易者。

### 风险分析

尽管该策略具有一定的优势,但在实际交易中也存在以下主要风险:

1. 行情突然剧烈反转是最大的风险,会导致止损点被抛破产生较大亏损;

2. 价格在通道内部震荡时,容易出现止损后再反转的情况;

3. 交易频率可能过高,导致交易成本和滑点损耗严重影响盈利。

为控制这些风险,我们可以适当调整参数,使通道范围更合理,或者选择价格波动较小的交易品种,亦可适当拉大止损距离。当然最关键的还是要对市场判断保持足够审慎。

### 策略优化方向

考虑到该策略可能存在的风险,我们可以从以下几个方面进一步优化:

1. 增加止损方式的多样性。目前仅提供了closeOnEMATouch一种止损方式,可以增加其它辅助止损指标,实现更全面和立体化的风险控制。

2. 优化参数设置。可以引入更多自动化方法来优化参数,使盖尔特通道的参数设置更加智能和适应性强。

3. 增加仓位控制。如引入资金管理模块,可以根据回撤情况或市场波动率动态调整仓位。

4. 增加过滤条件。在入场和止损方面都可以设置更多辅助过滤条件,避免因错误信号造成不必要的损失。


### 总结

本策略总体来说是一个较为典型的基于指标通道的中短线趋势追踪策略。相比简单的移动止损策略,其通过波动率因素提供了一定的风险调整功能,可以有效跟踪趋势获利。不过在实盘中仍需要注意反转和震荡的风险,通过参数优化、止损方式扩展以及增加过滤条件等手段进一步完善。

|| 

### Overview

This strategy is designed based on the Keltner Channel indicator of candlestick charts to track trends by judging price breakouts of channel bands. The strategy is suitable for medium-term holding positions and can effectively follow trends with high profit potential.

### Strategy Logic  

The core of this strategy lies in constructing a Keltner Channel to judge price trends and potential support/resistance levels. Specifically, it first calculates the EMA line of candlesticks, then adds upper and lower bands at a distance of keltnerDeviation times ATR volatility to build the Keltner Channel. When the price breaks above the lower band, a long position is opened. When the price breaks below the upper band, a short position is opened to follow trends. In addition, the strategy also provides a closeOnEMATouch parameter to control whether to take profit when the price touches the EMA line.

The key logic focuses on three parts:

1. Construct the Keltner Channel indicator, including calculating the EMA, ATR volatility, upper and lower bands. 

2. Judge entry signals based on breakouts of the channel bands, including going long when the price breaks above the lower band and going short when the price breaks below the upper band.

3. Provide the closeOnEMATouch parameter to control whether to take profit when the price touches the EMA line.

By combining these three parts, a trend following trading strategy based on channel indicators is implemented.

### Advantage Analysis

Compared with traditional moving stop loss strategies, this strategy has the following main advantages:

1. Can effectively follow market trends and general direction.  

2. Relatively long medium-term holding periods avoid over-frequent trading.

3. By considering volatility, it has a certain filtering effect against abnormal market conditions.  

4. Provides risk control mechanisms through stop loss.

Therefore, this strategy is very suitable for quantitative traders who have accurate judgments on market trends and pursue high capital utilization.

### Risk Analysis 

Despite its advantages, the strategy also faces some key risks in actual trading:  

1. Sudden and violent trend reversal poses the biggest risk, which may penetrate the stop loss point and cause huge losses.

2. Price may oscillate within the channel and trigger stop loss repeatedly. 

3. High trading frequency may lead to severe impact on profits from trading costs and slippage.

To control these risks, we can adjust parameters to make the channel range more reasonable, choose products with smaller price fluctuations, or properly widen the stop loss distance. But most importantly, we need to keep prudent enough judgments on the markets.

### Optimization Directions

Considering the potential risks, we can further optimize the strategy in the following aspects:

1. Increase diversity of stop loss methods. Currently only the closeOnEMATouch method is provided. We can introduce more auxiliary stop loss indicators for more comprehensive and multidimensional risk control.  

2. Optimize parameter settings. More automated methods can be introduced to optimize parameters to make the Keltner Channel settings more intelligent and adaptive.

3. Add position sizing control. By introducing capital management modules, we can dynamically adjust positions based on drawdowns or market volatility. 

4. Add filtering conditions. More auxiliary filters can be set on both entry and stop loss to avoid unnecessary losses due to wrong signals.

### Summary

In summary, this is a typical medium-term trend following strategy based on channel indicators. Compared to simple moving stop loss strategies, it provides a certain risk adjustment function through volatility factors and can effectively follow trends to make profits. However, risks of reversal and oscillation still need to be watched out for in live trading. Parameter optimization, expanding stop loss methods and adding filtering conditions can help further improve the strategy.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Keltner EMA Period Length|
|v_input_2|2|Keltner band width (in ATRs)|
|v_input_3|false|Close trade on EMA touch? (less drawdown, but less profit and higher commissions impact)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-21 00:00:00
end: 2023-11-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Keltner bounce from border. No repaint. (by Zelibobla)", shorttitle="Keltner border bounce", overlay=true)

price = open

// build Keltner
keltnerLength = input(defval=20, minval=1, title="Keltner EMA Period Length")
keltnerDeviation = input(defval=2, minval=1, maxval=5, title="Keltner band width (in ATRs)")
closeOnEMATouch = input(type=bool, defval=false, title="Close trade on EMA touch? (less drawdown, but less profit and higher commissions impact)")
EMA = sma(price, keltnerLength)
ATR = atr(keltnerLength)
top = EMA + ATR * keltnerDeviation
bottom = EMA - ATR * keltnerDeviation

buyEntry = crossover(price, bottom)
sellEntry = crossunder(price, top)
plot(EMA, color=aqua,title="EMA")
p1 = plot(top, color=silver,title="Keltner top")
p2 = plot(bottom, color=silver,title="Keltner bottom")
fill(p1, p2)

if ( crossover(price, bottom))
    strategy.entry("BUY", strategy.long, stop=bottom,  comment="BUY")

if( crossover(price,EMA) and closeOnEMATouch )
    strategy.close("BUY")
    
if ( crossunder(price, top))
    strategy.entry("SELL", strategy.short, stop=top,  comment="SELL")
if( crossunder(price, EMA) and  closeOnEMATouch )
    strategy.close("SELL")
```

> Detail

https://www.fmz.com/strategy/433525

> Last Modified

2023-11-28 11:50:09
