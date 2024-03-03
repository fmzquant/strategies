
> Name

超级趋势柱转向融合策略Supertrend-BarUpDn-Fusion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14eb20869c1bc5ec474.png)
[trans]
## 概述

超级趋势柱转向融合策略是一种将超级趋势指标和柱转向指标进行融合的策略。该策略在超级趋势指标和柱转向指标任意一个做多做空时,就进行对应的做多或做空操作。

## 策略原理

该策略主要利用了两个指标:

1. 超级趋势指标:该指标基于平均真实波幅和一个因子来确定趋势的方向。当价格在上升趋势通道内时为做多,当价格在下降趋势通道内时为做空。

2. 柱转向指标:该指标判断当前K线是否为阳线(收盘价高于开盘价)或阴线(开盘价高于收盘价)。当为阳线时返回1,当为阴线时返回-1。

策略的主要逻辑是:

1. 当超级趋势指标做多并且柱转向指标为阳线时,做多。

2. 当超级趋势指标做空并且柱转向指标为阴线时,做空。

3. 在平仓时,如果超级趋势指标变化方向,则及时平仓。

通过这种融合,可以同时利用超级趋势指标的趋势判断能力和柱转向指标的短期判断能力,实现更好的entry timing。

## 优势分析

该策略主要有以下优势:

1. 融合多个指标,提高准确率。同时利用超级趋势的趋势判断和柱转向的短期判断,可以提高entry timing的准确性。

2. 及时止损。当主指标超级趋势变化方向时,可以快速止损,避免亏损扩大。

3. 简单易用。该策略只需要两个常用指标的组合,非常简单易用。

4. 适应性强。超级趋势指标本身就有一定的参数可调整,可以适应不同品种和周期。

## 风险分析

该策略也存在一些风险,主要包括:

1. 融合judging不当可能误判。如果柱转向指标与超级趋势指标判断不一致时,需要及时止损。

2. 参数设置不当会影响效果。超级趋势指标的ATR长度和因子参数需要针对不同品种调整。

3. 短期反转可能造成小额亏损。在超级趋势转向之前,短期价格反转可能造成小额亏损。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 增加止损策略,利用移动止损、时间止损、突破止损等方式进一步控制风险。

2. 优化超级趋势指标的参数,找到不同品种和周期的最佳参数组合。可以通过机器学习等方式自动寻优。

3. 增加更多指标的融合,形成指标投票机制,提高判断的稳定性。

4. 结合更多市场因素,如交易量变化、利差变化等,判断指标效果的可靠性,过滤误导信号。

## 总结

超级趋势柱转向融合策略通过简单指标的组合使用,实现趋势判断和短期判断的融合,在保持简单易用的同时,提高了entry timing准确率。该策略可以通过参数优化、止损策略优化、多指标投票等方式进一步增强效果和可靠性。

||

## Overview

The Supertrend BarUpDn Fusion strategy is a strategy that fuses the Supertrend indicator and the BarUpDn indicator. The strategy will go long if either the Supertrend or BarUpDn indicator gives a long signal, and will go short if either indicator gives a short signal.

## Strategy Principle  

The strategy mainly utilizes two indicators:

1. Supertrend Indicator: This indicator determines the trend direction based on Average True Range and a factor. It gives long signals when price is in an uptrend channel and short signals when price is in a downtrend channel.  

2. BarUpDn Indicator: This indicator judges if the current bar is a bullish bar (close higher than open) or bearish bar (open higher than close). It returns 1 for bullish bars and -1 for bearish bars.

The main logic of the strategy is:

1. Go long when Supertrend is long and BarUpDn is bullish.  

2. Go short when Supertrend is short and BarUpDn is bearish.

3. Close positions timely when Supertrend changes direction.

Through this fusion, the strategy can utilize both the trend judging capability of Supertrend and the short-term judging capability of BarUpDn to achieve better entry timing.

## Advantage Analysis   

The main advantages of this strategy are:

1. Improved accuracy by fusing multiple indicators. Utilizing both the trend judging of Supertrend and the short-term judging of BarUpDn can improve entry timing accuracy.  

2. Timely stop loss. Quickly cutting losses when the main indicator Supertrend changes direction can avoid enlarging losses.

3. Simple and easy to use. The strategy only uses a combination of two common indicators, making it very simple and easy to use.  

4. Strong adaptability. Supertrend itself has adjustable parameters to adapt to different products and timeframes.

## Risk Analysis   

There are also some risks with this strategy:  

1. Incorrect judging from improper fusion may cause misjudging. Timely stop loss when indicators give inconsistent signals.

2. Improper parameter tuning affects performance. Supertrend's ATR Length and Factor need to be adjusted for different products.  

3. Short-term reversals may cause minor losses. Small losses may occur during short-term price reversals before Supertrend turns direction.

## Optimization Directions  

The strategy can be optimized from the following aspects:

1. Add stop loss strategies like moving stop loss, time stop loss, breakout stop loss etc. to further control risks.

2. Optimize parameters of Supertrend to find the best parameter combinations for different products and timeframes, e.g. via machine learning.  

3. Add more indicator fusion to build a voting mechanism and improve judging stability.  

4. Incorporate more market factors like volume change, spread change etc. to judge signal reliability and filter misleading signals.

## Summary   

The Supertrend BarUpDn Fusion Strategy fuses trend judging and short-term judging by combining simple indicators, improving entry timing accuracy while keeping simplicity and ease of use. The strategy can be further enhanced by parameter optimization, stop loss optimization, indicator voting etc.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Length|
|v_input_2|3|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend and BarUpDn Indicator Fusion", overlay=true)

// Supertrend indicator
atrLength = input(10, title="ATR Length")
factor = input(3.0, title="Factor")
[supertrend, direction] = ta.supertrend(factor, atrLength)
lastBar = 0

// BarUpDn indicator
barUpDn = close > open and open > close[1] ? 1 : close < open and open < close[1] ? -1 : 0

if (barUpDn == 1)
    lastBar := 1
else if barUpDn == -1
    lastBar := -1


// Determine long or short position
longCondition = (direction > 0 and barUpDn > 0) or (direction > 0 and lastBar == 1)
shortCondition = (direction < 0 and barUpDn < 0) or (direction < 0 and lastBar == -1)

// Enter long or short position
if (longCondition)
    strategy.entry("Long", strategy.long)
    lastBar := 1
else if (shortCondition)
    strategy.entry("Short", strategy.short)
    lastBar := -1

if (direction < 0 and barUpDn > 0)
    strategy.entry("Long", strategy.long)

// Exit long or short position
if (direction > 0 and barUpDn < 0)
    strategy.entry("Short", strategy.short)

// Exit long or short position
// if (direction < 0 and barUpDn > 0 or direction > 0 and barUpDn < 0)
//   strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/440537

> Last Modified

2024-01-31 14:43:06
