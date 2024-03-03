
> Name

平均最高最低波动交易策略Average-Highest-High-and-Lowest-Low-Swinger-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d948d2cf189afcf51.png)
[trans]

## 概述

这个策略是针对如加密货币和股票等具有趋势性特征的市场而专门设计的完整价格行情策略。它纯粹依据两种不同长度周期的最高价和最低价的计算而制定。通过计算这些最高最低价的多个平均值作为入场和出场的信号。

## 策略原理

该策略使用两个不同长度周期的最低价和最高价及其平均值来判断入场和出场。具体来说,它分别计算9周期和26周期的最低价平均值、最高价平均值,以及这两个平均值的平均值。当收盘价同时高于两个不同周期平均价时做多,当收盘价同时低于两个不同周期平均价时做空。

做多的具体逻辑是:收盘价高于9周期最高最低价平均值、高于26周期最高最低价平均值、高于两个平均值的平均值,满足这三个条件时做多。

做空的具体逻辑是:收盘价低于9周期最高最低价平均值、低于26周期最高最低价平均值、低于两个平均值的平均值,满足这三个条件时做空。

无论做多做空,当有反向信号出现时选择止损离场。

## 优势分析

这个策略有以下几个主要优势:

1. 使用双时间框架分析,可以更清楚判断趋势,增加精确度。

2. 建立在最高价和最低价上的计算,可以有效抓住突破。

3. 使用多个平均值过滤增加信号的可靠性,避免被 noise 干扰。

4. 纯粹的价格行情策略,适用于大多数有趋势特征的市场。

5. 完全自动化交易,无需人工干预,降低人为错误概率。

## 风险分析

该策略也存在一些风险需要注意:

1. 没有集成止损模块,存在亏损扩大的风险。可以加入移动止损或百分比止损来控制单笔损失。

2. 在震荡行情中容易产生错误信号和过度交易。可以适当调整周期参数或加入过滤条件。 

3. 没有考虑到个股和市场之间关系的影响,仍存在系统性风险。可以考虑多因子模型来控制这类风险。

4. 回测数据不足可能导致过拟合。应在更长时间尺度和更多市场中进行稳健性检验。

## 优化方向  

该策略还存在一定优化空间:

1. 周期参数可以继续测试优化,找到最佳参数组合。

2. 可以考虑加入移动止损、跟踪止损来控制单笔损失。

3. 可以测试不同市场甚至不同品种,探索适用性。

4. 可以加入一定的算法交易模块,如机器学习等来辅助决策。

5. 可以考虑多因子模型,加入更多变量判断,提高稳健性。

## 总结

总的来说,这个双时间框架最高最低价平均值策略,具有较强的趋势跟踪能力,适合于加密货币等高波动市场。它有效利用突破判断入场时机,同时使用多层过滤提高信号质量。可通过参数优化、止损模块增加、辅助算法等手段进一步增强该策略,使其成为一个值得长期持有使用的高效稳定策略。

||


## Overview

This is a full price action strategy designed for trending markets such as crypto and stocks. It is purely made on calculations for the highest high and lowest low using 2 different length, a faster and a slower one.

## Strategy Logic  

This strategy uses two different cycle lengths of lowest low and highest high prices and their averages to determine entry and exit. Specifically, it calculates the average lowest price, the average highest price and the average of these two averages of the 9-cycle and 26-cycle respectively. It goes long when the closing price is higher than the two averages of different cycles at the same time, and goes short when the closing price is lower than the two averages of different cycles at the same time.  

The specific logic for long is: the closing price is higher than the average of the highest and lowest prices of the 9-cycle, higher than that of the 26-cycle, and higher than the average of the two averages, when all three conditions are met, it goes long.

The specific logic for short is: the closing price is lower than the average of the highest and lowest prices of the 9-cycle, lower than that of the 26-cycle, and lower than the average of the two averages, when all three conditions are met, it goes short.

Whether long or short, choose to cut losses when there is a reverse signal.

## Advantage Analysis

This strategy has the following main advantages:

1. Using dual time frame analysis can better judge the trend and increase accuracy. 

2. Building on the highest and lowest prices can effectively capture breakouts.

3. Using multiple moving averages to filter increases signal reliability and avoids noise interference.

4. A pure price action strategy that applies to most markets with trending characteristics.

5. Fully automated trading eliminates human error probabilities.

## Risk Analysis

The strategy also has some risks to note:

1. There is no integrated stop loss module, risk of expanding losses. Moving stop loss or percentage stop loss can be added to control single loss.

2. It is easy to generate wrong signals and overtrade in range-bound markets. Period parameters can be adjusted or filters can be added.

3. The impact of the relationship between individual stocks and the market is not considered, systemic risks still exist. Multi-factor models can be considered to control such risks.

4. Insufficient backtest data may lead to overfitting. Robustness testing should be carried out over longer time frames and more markets.

## Optimization Directions

There is still some room for optimization in this strategy:

1. Period parameters can continue to be test optimized to find the best combination.

2. Consider adding moving stop loss, trailing stop loss to control single loss.

3. Can test different markets or even different varieties to explore applicability. 

4. Certain algorithmic trading modules can be added, such as machine learning, to assist in decision making.

5. Multi-factor models can be considered to introduce more variables for judgment and improve robustness.

## Conclusion

In summary, this dual time frame highest high and lowest low average strategy has strong trend tracking capabilities and is suitable for high volatility markets like cryptocurrencies. It effectively uses breakout judgments for entry timing, while using multiple layers of filtering to improve signal quality. Parameters optimization, addition of stop loss module, auxiliary algorithms and other means can be used to further enhance the strategy, making it an efficient and stable strategy worth holding for the long term.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Fast Line|
|v_input_2|26|Slow  Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-27 00:00:00
end: 2023-12-04 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4
strategy(title = "Avg HH/LL Crypto Swinger", overlay = true )

varLo = input(title="Fast Line", type=input.integer, defval=9, minval=1)
varHi = input(title="Slow  Line", type=input.integer, defval=26, minval=1)

a = lowest(varLo)
b = highest(varLo)
c = (a + b ) / 2

d = lowest(varHi)
e = highest(varHi)
f = (d + e) / 2

g = ((c + f) / 2)[varHi]
h = ((highest(varHi * 2) + lowest(varHi * 2)) / 2)[varHi]



long=close > c and close > f and close >g and close > h
short=close < c and close < f and close<g and close < h

strategy.entry("long",1,when=long)
strategy.entry('short',0,when=short)
```

> Detail

https://www.fmz.com/strategy/434336

> Last Modified

2023-12-05 16:34:01
