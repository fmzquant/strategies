
> Name

Hedging-Oscillation-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fc109ad90d90afd7c4.png)


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
