
> Name

基于自适应指数平滑移动平均线的量化交易策略Adaptive-SMI-Ergodic-Trading-Strategy-Based-on-Adaptive-Exponential-Moving-Average-Lines

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/135469392197ddfdfc7.png)
 [trans]

## 概述

本文将深入分析一种基于自适应指数平滑移动平均线(Adaptive Exponential Moving Average, AEMA)的量化交易策略。该策略运用随机动量指数指标(Stochastic Momentum Index,SMI)的无穷波动率形式,结合指数移动平均线作为信号线,设定可自定义的超买超卖阈值,以提高交易执行的概率。

## 策略原理

该策略使用两种不同长度的SMI,即一短长度和一长长度,两者跨度的差异能产生交易信号。此外,策略还利用一条指数移动平均线作为信号线。当短周期SMI上穿长周期SMA时做多,而当短周期SMI下穿长周期SMA时做空。为滤除假信号,多头入场信号仅在SMI低于超卖线且信号线也低于超卖线时出现;空头信号则要求SMI高于超买线且信号线也高于超买线。该双重条件设置使策略对突发事件更加敏感,同时也能有效避免虚假突破。

## 策略优势

该策略最大的优势在于其自适应性。策略使用可自定义的超买超卖阈值来动态调整做多做空的标准。这种机制让策略参数可以根据不同市场环境进行调整优化,从而适应更广泛的行情类型。此外,SMI无穷波动率形式也增强了策略的灵敏度和及时性。相比传统SMI,它具有更高的去噪效果和更小的滞后。这使策略能够快速响应突发事件,捕捉短线交易机会。

## 策略风险

该策略最大的风险在于其对参数设置的依赖性。如果参数设置不当,将很容易产生大量的无效交易信号。此外,SMI作为一种脉冲型指标,对随机震荡市场的表现并不理想。当出现价格剧烈波动的趋势性反转时,策略也很容易被套住。为控制这些风险,建议采用严格的风险管理手段,同时调整参数以适应不同的市场环境。一些可行的优化方向将在下文中提出。

## 策略优化方向 

该策略仍有几个可优化的方向。第一,可以测试SMA长度的不同组合,找到最佳参数对。第二,可以考虑在入场点附近设置止损,以控制单笔损失。第三,可以结合其他指标,如RSI、布林带等来设定动态的超买超卖线。第四,可以通过机器学习算法自动优化参数。第五,可以将策略集成到多因子模型中,以提高稳定性。

## 总结

本文深入剖析了一种自适应SMI无穷交易策略的原理、优势、风险和优化方向。该策略运用自适应阈值和指数移动平均线进行信号过滤,能有效抓取市场短线机会。尽管存在一定参数依赖性,但通过严格的风险控制和多方面优化,该策略仍具备相当的实用价值。相信在量化交易的实践中,它能发挥重要作用,为交易决策提供有效支持。

|| 

## Overview

This article will conduct an in-depth analysis of a quantitative trading strategy based on Adaptive Exponential Moving Average (AEMA) lines. The strategy leverages the ergodic form of the Stochastic Momentum Index (SMI) indicator, together with an Exponential Moving Average serving as the signal line, and incorporates customizable overbought/oversold thresholds to improve the probability of successful trade execution.  


## Strategy Principle 

The strategy uses two SMIs of different lengths, one short and one long, and the difference in span between them generates trading signals. In addition, the strategy also utilizes an Exponential Moving Average as the signal line. It goes long when the shorter period SMI crosses above the longer period SMA, and goes short when the opposite happens. To filter out false signals, long entry signals only appear when the SMI is below the oversold line and the signal line is also below the oversold line; short entry signals require the SMI to be above the overbought line and the signal line also above the overbought line. This dual condition setup makes the strategy more sensitive to sudden events, while also effectively avoiding false breakouts.  

## Advantages

The biggest advantage of this strategy lies in its adaptability. The strategy uses customizable overbought/oversold thresholds to dynamically adjust long and short criteria according to different market environments. This mechanism allows the strategy parameters to be optimized and adapted to a wider range of market conditions. In addition, the ergodic form of the SMI also enhances the sensitivity and timeliness of the strategy. Compared to the traditional SMI, it has higher noise reduction and smaller lag. This allows the strategy to respond quickly to sudden events and capture short-term trading opportunities.  

## Risks

The biggest risk of this strategy is its reliance on parameter settings. Improper parameter settings can easily generate a large number of invalid trading signals. In addition, as a pulse-type indicator, the SMI does not perform well in choppy random markets. The strategy can also easily get caught in violent trend reversal with extreme price fluctuations. To control these risks, it is recommended to adopt strict risk management measures while adjusting parameters to suit different market environments. Some feasible optimization directions will be proposed below.

## Optimization Directions

There are still several optimizable aspects of the strategy. First, different combinations of SMA lengths can be tested to find the optimal parameter pair. Second, stop losses can be considered near entry points to control per trade loss. Third, other indicators like RSI and Bollinger Bands can be combined to set dynamic overbought/oversold lines. Fourth, parameters can be automatically optimized through machine learning algorithms. Fifth, the strategy can be integrated into multi-factor models to improve stability.  

## Conclusion

This article has conducted an in-depth analysis of the principle, advantages, risks and optimization directions of an adaptive SMI ergodic trading strategy. Through the use of adaptive thresholds and signal filtering with exponential moving averages, the strategy can effectively capture short-term market opportunities. Despite certain parameter dependence, with stringent risk control and multi-dimensional optimizations, the strategy still possesses considerable practical value. It is believed that this strategy can play an important role in quantitative trading practices, providing effective support for trading decisions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|12|Long Length|
|v_input_int_2|5|Short Length|
|v_input_int_3|5|Signal Line Length|
|v_input_float_1|-0.4|Oversold|
|v_input_float_2|0.4|Overbought|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-10 00:00:00
end: 2023-12-17 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// © DraftVenture

//@version=5
strategy(title="Adaptive SMI Ergodic Strategy", shorttitle="Adaptive SMI Strategy", overlay = false)
longlen = input.int(12, minval=1, title="Long Length")
shortlen = input.int(5, minval=1, title="Short Length")
siglen = input.int(5, minval=1, title="Signal Line Length")
overS = input.float(-0.4, title = "Oversold", step = 0.01)
overB = input.float(0.4, title = "Overbought", step = 0.01)
erg = ta.tsi(close, shortlen, longlen)
sig = ta.ema(erg, siglen)
plot(erg, color = color.yellow, title = "SMI")
plot(sig, color = color.purple, title="Signal")
hline(0, title = "Zero", color = color.gray, linestyle = hline.style_dotted)
h0 = hline(overB, color = color.gray, title = "Overbought Threshold")
h1 = hline(overS, color = color.gray, title = "Oversold Threshold")
fill(h0, h1, color=color.rgb(25, 117, 192, 90), title = "Background")

longEntry = ta.crossover(erg, sig) and erg > overS and sig < overS
shortEntry = ta.crossunder(erg, sig) and erg < overB and sig > overB

if longEntry
    strategy.entry("Long", strategy.long)

if shortEntry
    strategy.entry("Short", strategy.short)

// ______ _________ 
// ___  //_/__  __ \
// __  ,<  __  /_/ /
// _  /| | _  ____/ 
// /_/ |_| /_/   
```

> Detail

https://www.fmz.com/strategy/435705

> Last Modified

2023-12-18 10:34:55
