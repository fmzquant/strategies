
> Name

基于Parabolic-SARStoch和Security指标的多时间框架量化交易策略Parabolic-SAR-Stoch-and-Security-Indicator-Based-Multi-Timeframe-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a3621d4ce7c5788319.png)
 [trans]

## 概述

本策略名为“三重保险”量化交易策略,运用Parabolic SAR、Stoch和Security三个指标的组合信号,实现对突破性行情的捕捉。该策略多时间框架分析,通过不同周期指标的组合,实现更稳定和可靠的交易决策。

## 策略原理  

本策略使用Parabolic SAR指标判断趋势方向和反转时机。Stoch指标判断是否过买过卖。Security函数提取更高周期均线的方向判断整体趋势。三者结合构成交易决策:

1. Parabolic SAR点数转化为下方时,视为看涨信号;点数上翻时,则看跌。

2. Stoch K值低于20视为超卖,高于80视为超买。超卖时看涨,超买时看跌。   

3. Security函数调用更高周期均线判断整体趋势方向,实现不同时间周期之间的组合分析。

上述三个指标同向看涨时做多,同向看跌时做空。严格遵循多重指标过滤的原则,可有效过滤假突破,锁定真实趋势。

## 策略优势

本策略最大优势在于多时间框架分析。三个指标分别判断短期、中期和长期不同级别上的价格行为。Parabolic SAR捕捉反转时机和短期趋势;Stoch判断当下是否过买过卖;Security函数判断总体大趋势方向。三者互为佐证,可有效避免假突破的干扰,锁定突破方向正确的机会。

同时,本策略采用多个指标判断和过滤,可最大限度地减少单一指标误判的概率。连续三重判断的通过,说明行情信号强度足够,从而确保交易决策的正确性。

## 策略风险

本策略主要风险在于指标参数设置的恰当性。Parabolic SAR的步长和最大步长设置会直接影响其捕捉反转速度;Stoch的K值和D值平滑周期需要符合市场特征;Security函数的选择周期也会对判断产生影响。这些关键参数的不当设置,都可能导致策略交易决策的错误。

此外,多时间框架分析原理强调不同周期指标的组合运用。但是,如果长短周期指标之间出现分歧时,该如何处理也是一个需要关注的问题。一个可能的解决思路是结合趋势指标判断整体方向,BREAKOUT类指标确定具体出场时机。

## 策略优化方向  

本策略后续优化方向主要在以下三个方面:

1. 增加自适应步长机制。允许Parabolic SAR的参数根据市场波动程度做出调整,更好捕捉反转。

2. 增加止损机制。当价格向不利方向突破某一水平时,选择止损退出。控制单笔损失。

3. 引入机器学习技术。通过算法训练判断不同时间段价格行为的相关性。不同时间框架组合策略参数也可通过算法优化获得。

## 总结

“三重保险”量化策略充分利用Parabolic SAR、Stoch和Security指标的互补优势。它们从短期趋势、超买超卖和长期均线三个维度判断市场行为的一致性,构建出稳定可靠的交易策略。组合使用多个指标有助于过滤假信号,而多时间框架的运用则可在长短周期得到验证的前提下做出决策。总体而言,本策略整合性强,实战水平高,值得进一步研究和应用。

||

## Overview

This strategy is called “Triple Insurance” quantitative trading strategy. It combines the signals of Parabolic SAR, Stoch and Security indicators to capture breakout trends. The multi-timeframe analysis realizes more stable and reliable trading decisions through the combination of different periodic indicators.

## Strategy Logic

This strategy uses the Parabolic SAR indicator to determine the trend direction and reversal timing. The Stoch indicator judges whether it is overbought or oversold. The Security function extracts the direction of longer cycle moving averages to determine the overall trend. The three are combined to form trading decisions:

1. When the Parabolic SAR dots convert to the downside, it is considered a bullish signal; when the dots turn upwards, it indicates bearishness.  

2. Stoch K values below 20 are considered oversold, and above 80 are considered overbought. It is bullish during oversold and bearish during overbought.

3. The Security function calls longer cycle moving averages to determine the overall trend direction, enabling combined analysis between different time cycles.

When the above three indicators give bullish signals, go long. When giving bearish signals, go short. Strictly follow the principle of multiple indicator filtering to effectively filter out false breakouts and lock in true trends.

## Advantages

The biggest advantage of this strategy lies in its multi-timeframe analysis. The three indicators judge price behavior respectively at short-term, medium-term and long-term levels. Parabolic SAR captures reversal timing and short-term trends. Stoch determines overbought and oversold conditions at present. The Security function determines the overall trend direction. The three complement each other to avoid interference from false breakouts effectively and seize opportunities of trend establishment.   

At the same time, this strategy adopts multiple indicators for judgement and filtering to minimize the probability of misjudgement from a single one. The successive pass of triple confirmation ensures sufficient signal strength thus the correctness of trading decisions.

## Risks  

The main risks of this strategy lie in the appropriateness of indicator parameter settings. The step size and maximum step size of Parabolic SAR directly affect the speed of capturing reversals. The K value and D value smoothing cycles of Stoch need to match market characteristics. The selection cycle of the Security function also affects judgement. Improper settings of these key parameters may all lead to wrong trading decisions of the strategy.

In addition, the principle of multi-timeframe analysis emphasizes the combination of indicators across periods. However, how to deal with divergences between long and short cycle indicators is also a problem worth paying attention to. A possible solution is to determine the overall direction with trend indicators and pinpoint specific exit timing using BREAKOUT indicators.  

## Optimization Directions

The main directions for further optimization of this strategy are in the following three aspects:  

1. Increase adaptive step size mechanism. Allow Parabolic SAR parameters to adjust based on the degree of market volatility to better capture reversals.  

2. Add stop loss mechanism. Exit with stop loss when price breaks a certain level towards the unfavorable direction. Control single transaction loss.

3. Introduce machine learning techniques. Use algorithms to train the correlation between price behaviors across different time periods. Strategy parameters combining different time frames can also be optimized through algorithms.  

## Conclusion  

The “Triple Insurance” quantitative strategy makes full use of the complementary advantages of Parabolic SAR, Stoch and Security indicators. They judge the consistency of market behaviors from the dimensions of short-term trends, overbought/oversold levels and long-term moving averages to construct a stable and reliable trading strategy. Using multiple indicators helps filter out false signals. Multi-timeframe usage enables decision-making on the premise that verification is obtained across both short and long cycles. In general, this strategy has strong integration and high practicality, making it worthwhile for further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|0.01|parabolicSARStart|
|v_input_float_2|0.01|parabolicSARInc|
|v_input_float_3|0.2|parabolicSARMax|
|v_input_int_1|14|K|
|v_input_int_2|3|D|
|v_input_int_3|3|Smooth|
|v_input_1|180|securityPeriod|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-11 00:00:00
end: 2024-01-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='kyenji', shorttitle='kyenji90', overlay=true)

// Parabolic SAR
parabolicSARStart=input.float(0.01)
parabolicSARInc=input.float(0.01)
parabolicSARMax=input.float(0.2)
psarDot = ta.sar(parabolicSARStart,parabolicSARInc,parabolicSARMax)
longConditionPSAR = psarDot > close
shortConditionPSAR = psarDot < close

// Stoch
periodK = input.int(14, title="K", minval=1)
periodD = input.int(3, title="D", minval=1)
smoothK = input.int(3, title="Smooth", minval=1)
k = ta.sma(ta.stoch(close, high, low, periodK), smoothK)
d = ta.sma(k, periodD)
h0 = 80
h1 = 20
longConditionStoch = k < h1
shortConditionStoch = k > h0

// Security
securityPeriod=input('180')
longConditionSecurity = ta.crossover(request.security(syminfo.tickerid, securityPeriod, close),request.security(syminfo.tickerid, securityPeriod, open))
shortConditionSecurity = ta.crossunder(request.security(syminfo.tickerid, securityPeriod, close),request.security(syminfo.tickerid, securityPeriod, open))

// Generate Signal
longCondition = longConditionSecurity and longConditionPSAR and longConditionStoch
shortCondition = shortConditionSecurity and shortConditionPSAR and shortConditionStoch

if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/439193

> Last Modified

2024-01-18 11:40:38
