
> Name

基于-Stochastics-Momentum-Index-的趋势追踪策略Momentum-Surfer-Strategy-Based-on-Stochastics-Momentum-Index

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/150ec8c0936224d3b3c.png)
[trans]
## 概述

本文介绍了一个基于 Stochastics Momentum Index(SMI)指标的追踪股票趋势的策略。该策略名为“Momentum Surfer策略”。它利用 SMI 指标识别股票的超买超卖区域,并在趋势反转点进行买入卖出,以获利。

## 策略原理

SMI 指标用于识别股票的超买超卖区域。当 SMI 指标进入红色区域时表示股票过卖,绿色区域时表示股票超买。该策略的交易信号来源于 SMI 指标和其 EMA 的交叉。


具体来说,当 SMI 指标上穿其 EMA 线,并且此时 SMI 值在 -40 以下过卖区域时,产生买入信号。当 SMI 指标下穿其 EMA 线,并且此时 SMI 值在 40以上超买区域时,产生卖出信号。


这样,该策略就可以在股票价格反转的时候及时捕捉信号,实现低买高卖的目的。从而顺势追踪股票的涨跌趋势。

## 策略优势分析

该策略最大的优势在于可以顺势追踪股票的趋势。因为它利用 SMI 指标识别入场和出场的时机,所以可以在股票价格反转的时候捕捉到信号。


另外,SMI 指标本身就具有平滑价格的特点。相比简单的移动平均线等指标,它对价格变动的反应更为平稳。这也使得产生的交易信号更加可靠,不易被短期的市场噪音所影响。


总的来说,该策略成功利用 SMI 指标的优势,实现了对股票趋势的有效追踪。它可以帮助投资者获利,而且也非常适合自动化交易。

## 风险分析

该策略主要依赖 SMI 指标,所以它存在一些与 SMI 相关的风险。


首先,SMI 指标对参数设置比较敏感。如果参数设置不当,那么产生的交易信号效果会大打折扣。这需要投资者经过反复测试以确定最佳参数组合。


另外,SMI 本身也无法完全避免错误交易信号的出现。当市场出现剧烈波动时,它可能会产生虚假信号导致不必要的亏损。这需要与其他指标组合使用来确认交易信号,降低错误交易概率。


最后,该策略无法改变整体股票市场风险。当整个市场进入熊市时,该策略依然难以避免较大的亏损。这是所有基于技术分析策略都无法完全规避的系统性风险。

## 策略优化方向  

该策略可以从以下几个方面进行进一步优化:

1. 组合其他指标,利用指标组合的优势来减少错误交易信号的概率,提高盈利概率。例如可以加入基本面的因子、波动率指标等。

2. 利用机器学习方法自动优化 SMI 参数。通过大量历史数据训练,寻找最优参数组合。

3. 增加止损策略。合理止损可以极大的降低单次亏损的影响,减少风险。

4. 结合量化选股策略,提高股票池的整体质量。良好的股票池质量,将直接提升策略的稳定性。

## 总结  

本文详细介绍了基于 SMI 指标实现趋势跟踪的 Momentum Surfer 策略。该策略最大的优势是可以顺势捕捉价格反转,顺势追踪股票趋势变化。它也存在一些参数设置敏感性、信号可靠性等风险。我们给出了进一步提升策略效果的几点优化建议。总的来说,该策略对于自动化交易而言非常有吸引力,值得实盘验证。

||

## Overview

This article introduces a strategy to track stock trends based on the Stochastics Momentum Index (SMI) indicator. The strategy is called "Momentum Surfer Strategy". It identifies overbought and oversold areas with SMI and enters long/short to profit from trend reversals.

## Strategy Logic

The SMI indicator is used to identify overbought and oversold zones. Values in the red area indicate the stock is oversold while the green area means overbought conditions. The trading signals are generated from the crossover between SMI and its EMA line.


Specifically, a long signal is triggered when SMI crosses above its EMA and SMI is below -40 oversold level. A short signal is triggered when SMI crosses below its EMA and SMI is above 40 overbought level.  


By doing so, the strategy can capture the price reversal and implement buy low sell high. It surfs the uptrend and downtrend of stocks smoothly.

## Advantage Analysis  

The biggest advantage lies in its ability to follow trends. As it utilizes SMI to determine entry and exit points, the signals align perfectly with price reversals.


Also, SMI itself has the characteristic of smoothing prices. Compared to simple moving averages, it responds more steadily to price changes. The trading signals are more reliable without being easily affected by market noise.


In summary, the strategy successfully leverages the strength of SMI to effectively track stock trends. It generates profit while being suitable for algo trading.

## Risk Analysis

The strategy relies heavily on the SMI indicator, thus faces some associated risks.


Firstly, SMI is sensitive to parameter tuning. Incorrect parameters can significantly undermine the signal quality. Extensive testing is required to find the optimum.


Besides, no indicator is immune to false signals, including SMI. Whipsaws can happen during high volatility that causes unnecessary losses. Using SMI together with other indicators helps to confirm signals and reduce errors.


Finally, it does not mitigate systemic market risk. Severe losses are inevitable if the whole market plunges into a bear state. This limitation applies to all technical strategies. 

## Enhancement  

The strategy can be further improved from the following aspects:

1. Incorporate other indicators to form a syndicate system. It helps to increase signal reliability and profitability. Fundamental factors and volatility measures can be added.

2. Utilize machine learning to automatically optimize SMI parameters based on big historical data.

3. Add stop loss mechanisms. Reasonable stop loss enormously reduces single trade loss and avoids risks.  

4. Combine quantitative stock screening rules to improve the overall quality of the stock pool. Good stock selection lays the foundation of a robust strategy.

## Conclusion   

In this article, we introduce the Momentum Surfer strategy which tracks trends with the SMI indicator. Its biggest strength lies in capturing reversals and smoothly following the trends. Some risks like parameter sensitivity and signal quality are present. We suggest a few ways to enhance it. Overall speaking, the strategy is attractive for algo trading and worth real trading verification.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|Percent K Length|
|v_input_int_2|3|Percent D Length|
|v_input_int_3|40|Overbought|
|v_input_int_4|-40|Oversold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Stochastics Momentum Index Strategy", shorttitle="Stoch_MTM_Doan", overlay=true)

// Input parameters
a = input.int(10, "Percent K Length")
b = input.int(3, "Percent D Length")
ob = input.int(40, "Overbought")
os = input.int(-40, "Oversold")

// Range Calculation
ll = ta.lowest(low, a)
hh = ta.highest(high, a)
diff = hh - ll
rdiff = close - (hh+ll)/2

avgrel = ta.ema(ta.ema(rdiff,b),b)
avgdiff = ta.ema(ta.ema(diff,b),b)

// SMI calculations
SMI = avgdiff != 0 ? (avgrel/(avgdiff/2)*100) : 0
SMIsignal = ta.ema(SMI,b)
emasignal = ta.ema(SMI, 10)

// Color Definition for Stochastic Line
col = SMI >= ob ? color.green : SMI <= os ? color.red : color.white

plot(SMIsignal, title="Stochastic", color=color.white)

plot(emasignal, title="EMA", color=color.yellow)

level_40 = ob
level_40smi = SMIsignal > level_40 ? SMIsignal : level_40

level_m40 = os
level_m40smi = SMIsignal < level_m40 ? SMIsignal : level_m40

plot(level_40, "Level ob", color=color.red)
plot(level_40smi, "Level ob SMI", color=color.red, style=plot.style_line)

plot(level_m40, "Level os", color=color.green)
plot(level_m40smi, "Level os SMI", color=color.green, style=plot.style_line)

//fill(level_40, level_40smi, color=color.red, transp=ob, title="OverSold")
//fill(level_m40, level_m40smi, color=color.green, transp=ob, title="OverBought")

// Strategy Tester
longCondition = ta.crossover(SMIsignal, emasignal) and (SMI < os)
if (longCondition)
    strategy.entry("Buy", strategy.long)

shortCondition = ta.crossunder(SMIsignal, emasignal) and (SMI > ob)
if (shortCondition)
    strategy.entry("Sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/442928

> Last Modified

2024-02-27 14:32:46
