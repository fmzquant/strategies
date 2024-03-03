
> Name

双指标略逆反转交易策略Dual-Indicator-Slight-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10dbbd8b88ebe5ae02a.png)

[trans]

## 概述

双指标略逆反转交易策略是一种结合动量指标和趋势指标的短线交易策略。该策略首先利用一个反转型指标生成交易信号,然后与一个趋势型指标进行组合,从而产生更可靠的交易信号。该策略旨在捕捉短期价格反转,在中短线趋势背景下进行交易。

## 原理

该策略由两个子策略组成。

第一个子策略是123反转策略。它监测价格是否出现了高点回落的形态。具体来说,它会在以下情况产生买入信号:前两天收盘价下跌,当日收盘价高于前一日收盘价,且Stochastic慢线低于50。它会在以下情况产生卖出信号:前两天收盘价上涨,当日收盘价低于前一日收盘价,且Stochastic快线高于50。

第二个子策略是ergodic随机指标(EMDI)。它是一个趋势型指标,识别中长线趋势的方向。它结合了移动平均线和MACD的思想,利用一次性指数平滑移动平均线和MACD的快慢线交叉产生买入和卖出信号。 

该策略将两个子策略的信号进行组合。只有当两个子策略产生一致信号时,该策略才会打开头寸。也就是说,它只在短期略逆反转的同时存在较强的中长线趋势支持时进行交易。

## 优势

- 组合多个指标,可以有效过滤假信号,提高信号的可靠性。
- 反转策略与趋势策略的组合,既可以捕捉短期机会,也避免逆势交易。
- 采用Stochastic指标的参数设置较为稳健,可以减少whipsaws。 
- Ergodic指标平滑参数设置合理,可以较好识别趋势。
- 该策略交易频率适中,既可以获得较多交易机会,也不会过于频繁交易。
- 适用于中短线交易,时间周期灵活。

## 风险

- 反转信号可能存在误报,需要趋势指标进行验证。
- 交易频率不高,可能错过部分短线机会。
- 反转后可能再次反转,需要及时止损。  
- 参数设置不当可能对交易结果产生较大影响。
- 过于依赖技术指标,存在模型过拟合风险。

## 优化方向 

- 可以测试不同参数设置,优化子策略的表现。
- 可以引入更多指标,构建多因子模型。  
- 可以结合机器学习方法,实现动态参数优化。
- 可以研究不同的止损方式,以控制风险。
- 可以研究机会成本,调整策略的交易频率。
- 可以在不同市场环境中测试策略健壮性。

## 总结

双指标略逆反转交易策略试图通过反转和趋势指标的组合,在中短线上捕捉价格短期反转机会。它可以有效过滤误报信号,在一定程度上控制交易风险。但是该策略也存在一些问题,比如可能错过短期机会、参数敏感以及过拟合风险等。通过引入更多指标、优化参数设置、调整交易频率以及在不同市场中测试,可以进一步增强该策略的稳定性和盈利能力。总体来说,双指标略逆反转交易策略是一个简单实用的量化策略思路,值得探索和应用。

|| 

## Overview

The Dual Indicator Slight Reversal Trading Strategy combines momentum and trend-following indicators for short-term trading. The strategy first generates trading signals using a reversal indicator, then combines it with a trend-following indicator to produce more reliable signals. It aims to capture short-term price reversals within the context of medium-term trends.

## Principle 

The strategy consists of two sub-strategies. 

The first is the 123 Reversal strategy. It monitors if a peak reversal pattern occurs. Specifically, it will generate a long signal if the closing price of the prior two days drops and the current closing price is higher than the previous closing price, with the Stochastic slow line below 50. It will generate a short signal if the closing prices of the prior two days rise and the current closing price is lower than the previous closing price, with the Stochastic fast line above 50.

The second is the Ergodic indicator, which is a trend-following indicator identifying the direction of medium to long term trends. It incorporates the ideas of moving averages and MACD, using single exponential smoothed moving averages and MACD's fast and slow lines crossovers to generate trading signals.

The strategy combines the signals from the two sub-strategies. It will only open a position when the two sub-strategies generate consistent signals. That is, it only trades when there is a short-term slight reversal along with a strong medium to long term trend. 

## Advantages

- Combining multiple indicators can effectively filter false signals and improve reliability.

- Combining reversal and trend-following provides both short-term opportunities and avoids counter-trend trades.

- The Stochastic parameter settings are quite robust to reduce whipsaws.

- The smoothing parameters of the Ergodic indicator are reasonably set to better identify trends.

- The trading frequency is appropriate, capturing adequate opportunities without overtrading.

- Suitable for medium-term trading with flexible timeframes.

## Risks

- Reversal signals may produce false signals and need validation from trend indicators.

- The low trading frequency may miss some short-term opportunities. 

- There could be reversals after reversals, requiring timely stop loss.

- Inappropriate parameter settings may significantly impact results.

- Relying too much on technical indicators risks overfitting. 

## Enhancement

- Test different parameter settings to optimize sub-strategies.

- Introduce more indicators to build multi-factor models.

- Apply machine learning for dynamic parameter optimization. 

- Research different stop loss methods to control risks.

- Study opportunity costs and adjust strategy trading frequency.

- Test strategy robustness across different market regimes.

## Conclusion

The Dual Indicator Slight Reversal Trading Strategy attempts to capture short-term reversal opportunities on medium-term timeframes using combinations of reversal and trend-following indicators. It can effectively filter false signals and control risks to some extent. However, issues like missing short-term opportunities, parameter sensitivity, and overfitting risks remain. Further enhancing stability and profitability can be achieved by incorporating more indicators, optimizing parameters, adjusting trading frequency, and testing across markets. Overall, the strategy represents a simple and practical quantitative approach worth exploring and applying.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|32|r|
|v_input_6|5|s|
|v_input_7|5|u|
|v_input_8|3|SmthLen|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-16 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 28/07/2020
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Second strategy
// This is one of the techniques described by William Blau in his book "Momentum,
// Direction and Divergence" (1995). If you like to learn more, we advise you to
// read this book. His book focuses on three key aspects of trading: momentum, 
// direction and divergence. Blau, who was an electrical engineer before becoming 
// a trader, thoroughly examines the relationship between price and momentum in 
// step-by-step examples. From this grounding, he then looks at the deficiencies 
// in other oscillators and introduces some innovative techniques, including a 
// fresh twist on Stochastics. On directional issues, he analyzes the intricacies 
// of ADX and offers a unique approach to help define trending and non-trending periods. 
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
Reversal123(Length, KSmoothing, DLength, Level) =>
    vFast = sma(stoch(close, high, low, Length), KSmoothing) 
    vSlow = sma(vFast, DLength)
    pos = 0.0
    pos := iff(close[2] < close[1] and close > close[1] and vFast < vSlow and vFast > Level, 1,
	         iff(close[2] > close[1] and close < close[1] and vFast > vSlow and vFast < Level, -1, nz(pos[1], 0))) 
	pos


EMDI(r,s,u,SmthLen) =>
    pos = 0
    xEMA = ema(close, r)
    xEMA_S = close - xEMA
    xEMA_U = ema(ema(xEMA_S, s), u)
    xSignal = ema(xEMA_U, u)
    pos := iff(xEMA_U > xSignal, 1,
    	     iff(xEMA_U < xSignal, -1, nz(pos[1], 0)))
    pos

strategy(title="Combo Backtest 123 Reversal & Ergodic MDI", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
r = input(32, minval=1)
s = input(5, minval=1)
u = input(5, minval=1)
SmthLen = input(3, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posEMDI = EMDI(r,s,u,SmthLen)
pos = iff(posReversal123 == 1 and posEMDI == 1 , 1,
	   iff(posReversal123 == -1 and posEMDI == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/429488

> Last Modified

2023-10-17 15:45:09
