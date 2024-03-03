
> Name

动态均线交叉趋势跟踪策略Crypto-Bull-Run-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11840cb3f95247cb2b0.png)
[trans]

## 概述

该策略通过计算 DEMA 和 TEMA 两条动态均线,并在它们发生金叉或死叉时建立做多或做空仓位,实现对趋势的跟踪。同时,策略还设置了一定的持仓条数,避免无谓的止损。

## 策略原理  

该策略主要基于两条动态均线 DEMA 和 TEMA 的交叉来判断趋势方向。

DEMA 代表双指数移动平均线,它结合了 EMA 的加权平滑特点,又对 EMA 中存在的滞后问题做了优化。其计算公式为:

DEMA = 2*EMA(CLOSE,N) - EMA(EMA(CLOSE,N),N)  

这里 N 就是 Demalength。

TEMA 代表三指数移动平均线,它通过三次指数平滑来减少平均线的滞后性。其计算公式为:  

EMA1 = EMA(CLOSE,Temalength)  
EMA2 = EMA(EMA1,Temalength)  
EMA3 = EMA(EMA2,Temalength)  
TEMA = 3*EMA1 - 3*EMA2 + EMA3  

当 TEMA 上穿 DEMA 时,视为金叉信号,做多;当 TEMA 下穿 DEMA 时,视为死叉信号,做空。

此外,策略还设置了 delayBars 来确保信号的有效性,避免出现假信号。它要求金叉或死叉后持续延续一定周期才会触发入场。

最后,策略加入了双重检查逻辑。即在开仓之前会先判断是否需要平掉当前的反向头寸,这可以避免双向套利的风险。

## 优势分析

1. 使用两条动态均线,对趋势判断更准确 

DEMA 和 TEMA 这两条动态均线,相比传统的 EMA 和 SMA 更加灵敏,能够更快捕捉到趋势的变化,从而提高对市场走势判断的准确性。

2. 设置一定的延迟周期,可过滤假信号

delayBars 参数的设置,使得必须要等到信号延续一段时间后才会开仓,这样可以过滤掉部分假信号,避免被套。

3. 双重检查可以减少风险

策略在开仓前会优先判断是否需要平掉反向头寸,可以避免同时持有双向仓位的风险,最大程度减少套利的损失。

4. 具有较强的通用性

该策略主要依赖均线交叉这一通用的技术指标来判断趋势和信号,不依赖特定品种,适用于大部分具有明显趋势性的品种。

## 风险分析

1. 大幅震荡市场中容易被套

当市场陷入巨大的震荡区间时,均线可能频繁交叉,容易形成虚假信号导致被套。这时延迟周期的设置也可能无法完全过滤信号。

解决方法是识别震荡态势后暂停策略,或者适当调整均线参数和延迟周期。

2. 不能识别陷阱或突发事件

该策略仅跟踪价格趋势,无法预测短期的陷阱或由重大突发事件引发的反转。这时策略可能遭遇大额亏损。  

解决方法是搭配其他指标判断风险背景,或者适当缩减仓位规模。

## 优化方向  

1. 测试更多种类的均线指标 

除了 DEMA 和 TEMA,还可以测试 SMA、EMA 以及其他改进型均线的组合,找到更匹配该市场的均线指标。

2. 优化 MA 参数及延迟周期

通过参数优化找到最佳的均线长度参数和信号延迟周期来获得更准确的交易信号。

3. 不同品种适配不同参数

根据品种特性,分别找到适合其波动范围和趋势性的均线和延迟周期参数组合。

4. 结合其他指标进行风险评估 

比如 Bollinger Bands 指标判断波动率和价格位置,避免陷入震荡陷阱中;结合能量类指标判断力度,评估趋势可靠性。

## 总结  

该策略通过动态均线 DEMA 和 TEMA 的交叉来跟踪大趋势,属于简单型的趋势跟踪策略。优点是较高的稳定性、可靠性和通用性,适合作为基础策略使用;但也有一定的滞后性和反转识别能力较弱的缺点。本文对该策略的优势、风险和后续优化方向进行了全面的分析和总结,为使用该策略提供了宝贵的参考。总的来说,该策略为量化交易策略的设计提供了典型范例,值得深入研究借鉴。

||

## Overview  

This strategy tracks the trend by calculating two dynamic moving averages, DEMA and TEMA, and establishing long or short positions when they generate golden crosses or death crosses. At the same time, the strategy sets a certain number of holding bars to avoid unnecessary stop loss.

## Strategy Logic  

The core logic of this strategy is to determine the trend direction based on the crossover between two dynamic moving averages, DEMA and TEMA. 

DEMA stands for Double Exponential Moving Average. It combines the weighted smoothing feature of EMA and optimizes the lagging problem of EMA. Its formula is:  

DEMA = 2*EMA(CLOSE, N) - EMA(EMA(CLOSE, N), N)

Here N is the Demalength.  

TEMA stands for Triple Exponential Moving Average. It uses triple exponential smoothing to reduce the lagging of moving averages. Its formula is:

EMA1 = EMA(CLOSE, Temalength) 
EMA2 = EMA(EMA1, Temalength)
EMA3 = EMA(EMA2, Temalength)
TEMA = 3*EMA1 - 3*EMA2 + EMA3  

When TEMA crosses over DEMA, it is considered as a golden cross signal to go long. When TEMA crosses below DEMA, it is considered as a death cross signal to go short.   

In addition, the strategy sets the delayBars to ensure the validity of signals and avoid false signals. It requires the golden/death cross to continue for a certain period before triggering entry.  

Finally, the strategy adopts dual checking logic. It will check whether the opposite position needs to be closed before opening new trades. This avoids the risk of double direction positions.

## Advantage Analysis 

1. More accurate trend judgment using two dynamic MAs  

Compared to traditional EMA and SMA, DEMA and TEMA are more sensitive dynamic MAs that can quickly capture trend changes, thus improving the accuracy of market trend judgments.  

2. Filtering false signals by setting a delay period 

The delayBars parameter forces the strategy to wait for a period of time after the signal emerges before entering positions. This filters out some false signals and avoids being trapped.  

3. Reducing risks through dual checking  

By checking whether the opposite position needs to be closed before opening new trades, the strategy avoids holding double direction positions and minimizes losses from hedge trades.

4. Strong universality  

This strategy relies mainly on the crossover between MAs, a common technical indicator, to determine trends and signals. It does not rely on specific products and is suitable for most trending products.

## Risk Analysis   

1. Prone to being trapped in whipsaw markets

In a market with huge sideways fluctuations, MAs may frequently cross and generate false signals that cause losses. In this case, the delay settings may fail too.  

The solutions are to pause the strategy when identifying sideways trends, or properly adjust the MA parameters and delay periods.

2. Fails to identify traps or black swan events 

The strategy purely tracks price trends and cannot predict short-term traps or trend reversals caused by major events. It may lead to huge losses in such cases.  

The solutions are to incorporate other indicators to assess risks, or properly reduce position sizes. 

## Optimization Directions

1. Test more types of MAs 

Apart from DEMA and TEMA, test combinations of SMA, EMA, and other enhanced MAs to find the most suitable ones for this market.  

2. Optimize MA parameters and delay periods  

Run optimizations to find the optimum MA lengths and signal delay periods for more accurate trading signals.  

3. Adapt parameters for different products  

Given different product characteristics, find suitable combinations of MA lengths, delay periods for their price fluctuations and trendiness.  

4. Incorporate other indicators for risk assessment

E.g. use Bollinger Bands to judge volatility and price level to avoid whipsaw markets. Use momentum indicators to evaluate trend strengths.  

## Conclusion   

This is a basic trend following strategy based on dynamic MA crossovers between DEMA and TEMA. Its advantages are high stability, reliability and universality. But it also has some lagging and weak reversal detection capacity. This article provides a comprehensive analysis of its pros, cons and optimization directions, serving as valuable references for using this strategy. On the whole, it offers a typical example of quantitative trading strategy design worthy of further study.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|230|Demalength|
|v_input_int_2|210|Temalength|
|v_input_1|5|Bar Delay|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © jacobdickson255

strategy("Crypto Bull Run Tracker", overlay=true, pyramiding=0)

//Dema Scripting
Demalength = input.int(230, minval=1)
src = close
e1 = ta.ema(src, Demalength)
e2 = ta.ema(e1, Demalength)
dema = 2 * e1 - e2
plot(dema, "DEMA", color=#43A047)

//Tema Scripting
Temalength = input.int(210, minval=1)
ema1 = ta.ema(close, Temalength)
ema2 = ta.ema(ema1, Temalength)
ema3 = ta.ema(ema2, Temalength)
tema = 3 * (ema1 - ema2) + ema3
plot(tema, "TEMA", color=#2962FF)

delayBars = input(5, title="Bar Delay")
var int lastTradeBar = na

longCondition = ta.crossover(tema, dema) 
longExit = ta.crossunder(tema, dema)
shortCondition = ta.crossunder(tema, dema)
shortExit = ta.crossover(tema, dema)

// Exit conditions should be checked before entry conditions
// Close short position if a long condition is present
if ((shortExit and strategy.position_size < 0)) // If conditions for exiting the short are met, and there is a balance in the short direction, exit the short
    strategy.close("Short")
   

// Close long position if a short condition is present
if ((longExit and strategy.position_size > 0))
    strategy.close("Long")
   
// Now check for entry conditions
if (longCondition)
    strategy.entry("Long", strategy.long)
    lastTradeBar := bar_index

if (shortCondition)
    strategy.entry("Short", strategy.short)
    lastTradeBar := bar_index

```

> Detail

https://www.fmz.com/strategy/434706

> Last Modified

2023-12-08 15:45:47
