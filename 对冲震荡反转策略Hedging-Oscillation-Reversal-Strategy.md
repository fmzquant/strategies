
> Name

对冲震荡反转策略Hedging-Oscillation-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fc109ad90d90afd7c4.png)

[trans]

## 概述

对冲震荡反转策略是一种利用布林带、包络线、ADX和随机指标等多个指标来识别市场反转点,在反转点附近进行对冲操作的短线交易策略。该策略主要通过布林带和包络线判断价格是否过度扩张来确认交易信号,同时利用ADX判断趋势力度和随机指标判断超买超卖区域,在反转点附近建立对冲头寸。

## 策略原理

对冲震荡反转策略基于以下几个判断规则:

1. 当收盘价超过布林带上轨且超过包络线上轨,说明价格可能处于超买状态,这时如果ADX小于30说明趋势力度不强,同时随机指标大于50说明处于超买区域,这样就可以考虑做空。

2. 当收盘价低于布林带下轨且低于包络线下轨,说明价格可能处于超卖区域,这时如果ADX小于30说明趋势力度不强,同时随机指标小于50说明处于超卖区域,这样就可以考虑做多。

3. 做空的止损退出条件是收盘价格低于布林带下轨或包络线下轨或者随机指标小于50。

4. 做多的止损退出条件是收盘价格高于布林带上轨或包络线上轨或者随机指标大于50。

通过这些判断规则,我们可以在反转点附近建立对冲头寸,利用价格的短期震荡来获利。

## 优势分析

这种对冲震荡反转策略具有以下几个优势:

1. 利用多个指标判断,可以有效确认交易信号,避免假突破。

2. 在趋势转折点附近交易,具有比较高的成功率。

3. 采用对冲操作方式,可以有效控制风险。

4. 交易频率较高,适合短线操作。

5. 收益来源主要是价格震荡,不完全依赖趋势反转。

## 风险分析

这种对冲震荡反转策略也存在一些风险需要注意:

1. 反转失败的概率仍然存在,将带来较大亏损。

2. 交易频繁容易出现过优化的情况。

3. 反转时间点把握不准会造成亏损扩大。

4. 趋势Mutation突变的概率存在,需要警惕。

针对这些风险,我们需要优化指标参数,严格控制止损,同时结合趋势和基本面分析来确定大方向。

## 优化方向 

这种对冲震荡反转策略还可以从以下几个方向进行优化:

1. 优化指标参数,提高交易信号质量。

2. 增加基本面因素判断,避免打反趋势。

3. 结合V形反转形态判断来提高成功率。

4. 动态调整止损幅度。

5. 优化资金管理,严格控制单笔损失。

## 总结

对冲震荡反转策略通过多重指标判断在反转点附近进行对冲操作,具有交易频率高、风险容易控制的优点。但反转交易的风险也不能忽视,我们需要不断优化策略,严格遵守交易规律,充分利用这种高效的短线交易策略。

||

## Overview

The Hedging Oscillation Reversal strategy is a short-term trading strategy that identifies market reversal points using multiple indicators such as Bollinger Bands, Envelope Lines, ADX and Stochastics to take hedging positions around the reversal points. This strategy mainly uses Bollinger Bands and Envelope Lines to determine whether prices are excessively extended to confirm trading signals, while using ADX to determine trend strength and Stochastics to determine overbought/oversold areas, in order to establish hedging positions around reversal points.

## Strategy Principle 

The Hedging Oscillation Reversal strategy is based on the following judgment rules:

1. When the closing price exceeds the upper rail of the Bollinger Bands and also exceeds the upper rail of the Envelope Lines, it indicates that prices may be in an overbought state. At this point, if ADX is less than 30, it means that the trend strength is not strong. Meanwhile, if Stochastics is greater than 50, it means it is in an overbought area. Thus, short positions can be considered.

2. When the closing price is below the lower rail of the Bollinger Bands and also below the lower rail of the Envelope Lines, it indicates that prices may be in an oversold area. At this point, if ADX is less than 30, it means that the trend strength is not strong. Meanwhile, if Stochastics is less than 50, it means it is in an oversold area. Thus, long positions can be considered.

3. The stop loss exit condition for short positions is that the closing price is below the lower rail of the Bollinger Bands or the lower rail of the Envelope Lines, or Stochastics is less than 50.  

4. The stop loss exit condition for long positions is that the closing price is above the upper rail of the Bollinger Bands or the upper rail of the Envelope Lines, or Stochastics is greater than 50.

Through these judgment rules, we can establish hedging positions around reversal points and profit from short-term price oscillations.

## Advantage Analysis

This Hedging Oscillation Reversal strategy has the following advantages:

1. Using multiple indicators for judgment can effectively confirm trading signals and avoid false breakouts.

2. Trading around trend reversal points has a relatively high success rate.  

3. Adopting a hedging operation method can effectively control risks.

4. The high trading frequency is suitable for short-term operations.

5. The source of income mainly comes from price fluctuations, not entirely dependent on trend reversals.

## Risk Analysis

This Hedging Oscillation Reversal strategy also has some risks that need attention:

1. There is still a probability of reversal failure, which will lead to greater losses.

2. Frequent trading is prone to over-optimization.  

3. Failure to grasp the reversal timing accurately may lead to enlarged losses.

4. There is a probability of trend mutations that need to be guarded against.

In response to these risks, we need to optimize indicator parameters, strictly control stop losses, and combine trend and fundamental analysis to determine the general direction.

## Optimization Directions

This Hedging Oscillation Reversal strategy can also be optimized in the following directions:

1. Optimize indicator parameters to improve trading signal quality.

2. Increase fundamental factor judgments to avoid trading against the trend.  

3. Incorporate V-shaped reversal pattern recognition to improve success rate.

4. Dynamically adjust the stop loss range.

5. Optimize capital management to strictly control single transaction loss.

## Summary

The Hedging Oscillation Reversal strategy takes hedging positions around reversal points based on multiple indicator judgments, which has the advantages of high trading frequency and easy risk control. However, the risks of reversal trading cannot be ignored. We need to continuously optimize the strategy, strictly follow the trading rules, and make full use of this efficient short-term trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|Length BB|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|StdDev BB|
|v_input_int_2|20|Length Envelope|
|v_input_2|true|percent|
|v_input_3|false|exponential|
|v_input_4|14|ADX Smoothing|
|v_input_5|14|DI Length|
|v_input_int_3|50|%K Length|
|v_input_int_4|20|%K Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-12 00:00:00
end: 2023-12-19 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=5
strategy("Contrarian Scalping Counter Trend",overlay=true)

//bollinger bands
length = input.int(20, minval=1, title="Length BB")
src = input(close, title="Source")
mult = input.float(2.0, minval=0.001, maxval=50, title="StdDev BB")
basis = ta.sma(src, length)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev


//envelope
len = input.int(20, title="Length Envelope", minval=1)
percent = input(1.0)
exponential = input(false)
envelope = exponential ? ta.ema(src, len) : ta.sma(src, len)
k = percent/100.0
upper_env = envelope * (1 + k)
lower_env = envelope * (1 - k)

//adx
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
dirmov(len) =>
	up = ta.change(high)
	down = -ta.change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = ta.rma(ta.tr, len)
	plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
	minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)

//stochastic

periodK = input.int(50, title="%K Length", minval=1)
smoothK = input.int(20, title="%K Smoothing", minval=1)
stock = ta.sma(ta.stoch(close, high, low, periodK), smoothK)


short=close> upper and close >upper_env and sig < 30 and stock > 50
long=close< lower and close <lower_env and sig < 30 and stock < 50


short_exit= close < lower or close<lower_env or stock <50
long_exit=close > lower or close>lower_env or stock >50



strategy.entry("short",strategy.short,when=short)
strategy.close("short",when=short_exit)


strategy.entry("long",strategy.long,when=long)
strategy.close('long',when=long_exit)

```

> Detail

https://www.fmz.com/strategy/435980

> Last Modified

2023-12-20 15:43:18
