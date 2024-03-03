
> Name

量化交易价格突破策略Quantitative-Trading-Price-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/c45b109a257f178e41.png)
[trans]

## 概述

该策略是一个基于简单移动平均线(SMA)、指数移动平均线(EMA)、Keltner通道、MACD指标、随机指标(Stochastic)的短线量化交易策略。它根据价格是否突破SMA和EMA的方式,结合Keltner通道、MACD指标、Stochastic指标的多空信号,实现自动化的交易入场和出场。

## 策略原理

该策略使用25周期的SMA、200周期的EMA构建双移动平均线指标。当价格从下向上突破双移动平均线时产生买入信号;当价格从上向下突破双移动平均线时,产生卖出信号。

同时,该策略使用10周期构建Keltner通道,价格突破通道上轨和下轨也会作为辅助信号。MACD指标通过快线、慢线和MACD柱形图产生买卖信号。Stochastic指标通过%K线和%D线的金叉死叉也组成多空信号。

具体来说,当收盘价高于SMA和EMA,且处于Keltner通道内部,MACD柱形图为负值,Stochastic%K值低于50时,产生买入信号,做多;当收盘价低于SMA和EMA,且处于Keltner通道内部,MACD柱形图为正值,Stochastic%K值高于50时,产生卖出信号,做空。

## 策略优势

1. 使用双移动平均线结合通道指标,能有效过滤市场假突破。
2. 综合多种技术指标信号,能够提高信号的可靠性。 
3. 多空信号规则清晰,程序化执行效率高。
4. 适用于短线频繁交易的量化策略。

## 策略风险及优化

1. 作为短线交易策略,存在一定的交易频率过高风险。
2. 没有止损机制,存在较大亏损风险。
3. 可考虑加入波动率指标,优化开仓及止损条件。
4. 可测试不同周期参数的优劣,寻找最佳参数组合。

## 总结

该策略整合了移动平均线、通道指标、MACD指标和Stochastic指标四种常用技术指标。通过价格的突破与不突破来判断多空,属于典型的短线量化交易策略。相比单一指标,它综合运用多指标判断能提高信号准确性,值得进一步测试优化。

||

## Overview

This is a short-term quantitative trading strategy based on Simple Moving Average (SMA), Exponential Moving Average (EMA), Keltner Channels, MACD indicator and Stochastic oscillator. It uses the price breakthrough of SMA and EMA, combined with long and short signals from Keltner Channels, MACD and Stochastic to automate trading entries and exits.

## Strategy Principle  

The strategy uses 25-period SMA, 200-period EMA to build dual moving average lines. When price breaks through the dual moving averages upwards, a buy signal is generated. When price breaks through the dual moving averages downwards, a sell signal is generated.

At the same time, this strategy uses 10-period Keltner Channels. The breakthrough of channel upper and lower bands also serves as assistant signals. The MACD indicator generates trading signals with its fast line, slow line and histogram. The Stochastic oscillator also forms long and short signals with the golden cross and dead cross of its %K line and %D line. 

Specifically, when close price is above both SMA and EMA, and within the Keltner Channels, MACD histogram is negative and Stochastic %K is below 50, a long entry signal is triggered. When close price is below both SMA and EMA, and within the Keltner Channels, MACD histogram is positive and Stochastic %K is above 50, a short entry signal is triggered.

## Strategy Advantages

1. Using dual moving average combined with channel indicator can effectively filter false breakouts.  
2. Integrating signals from multiple technical indicators can improve reliability.
3. Clear long/short rules facilitate programmatic execution efficiency.  
4. Suitable for high-frequency quantitative trading strategies.

## Strategy Risks and Optimization

1. As a short-term trading strategy, it has high trading frequency risks.  
2. No stop loss mechanism exists, leading to large loss risks.
3. Consider adding volatility indicators to optimize entry and stop loss conditions.
4. Different parameter periods can be tested to find optimal combinations.  

## Conclusion

This strategy integrates four commonly used technical indicators - moving averages, channel, MACD and Stochastic. It determines long/short based on price breakthrough, a typical short-term quantitative trading strategy. Compared to single indicator strategies, its multiple indicator combination improves signal accuracy and is worth further testing and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_low|0|Source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|25|(?Moving Averages)Length SMA|
|v_input_int_2|200|Length EMA|
|v_input_int_3|10|(?Keltner)Length Keltner Channel|
|v_input_2|2|Multiplier|
|v_input_string_1|0|Bands Style: Average True Range|True Range|Range|
|v_input_3|14|ATR Length|
|v_input_int_4|10|(?Stochastic)%K Length|
|v_input_int_5|true|%K Smoothing|
|v_input_int_6|true|%D Smoothing|
|v_input_4|4|(?MACD Fast)Fast Length MACD|
|v_input_5|34|Slow Length MACD|
|v_input_int_7|5|Signal Smoothing MACD|
|v_input_string_2|0|Oscillator MA Type MACD: EMA|SMA|
|v_input_string_3|0|Signal Line MA Type MACD: EMA|SMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=5
strategy(title="Scalping Trading System Crypto and Stocks", overlay=true)
src = input(low, title="Source")

//sma and ema
len = input.int(25, minval=1, title="Length SMA" , group="Moving Averages")
len2 = input.int(200, minval=1, title="Length EMA", group="Moving Averages")

out = ta.sma(src, len)
out2 = ta.ema(src, len2)


//keltner
lengthk = input.int(10, minval=1, title="Length Keltner Channel",group="Keltner")
mult = input(2.0, "Multiplier",group="Keltner")
BandsStyle = input.string("Average True Range", options = ["Average True Range", "True Range", "Range"], title="Bands Style",group="Keltner")
atrlength = input(14, "ATR Length",group="Keltner")

ma = ta.sma(src, lengthk)
rangema = BandsStyle == "True Range" ? ta.tr(true) : BandsStyle == "Average True Range" ? ta.atr(atrlength) : ta.rma(high - low, lengthk)
upper = ma + rangema * mult
lower = ma - rangema * mult

//stoch
periodK = input.int(10, title="%K Length", minval=1,group="Stochastic")
smoothK = input.int(1, title="%K Smoothing", minval=1,group="Stochastic")
periodD = input.int(1, title="%D Smoothing", minval=1,group="Stochastic")
k = ta.sma(ta.stoch(close, high, low, periodK), smoothK)
d = ta.sma(k, periodD)

//macd 1
fast_length = input(title="Fast Length MACD", defval=4,group="MACD Fast")
slow_length = input(title="Slow Length MACD", defval=34,group="MACD Fast")
signal_length = input.int(title="Signal Smoothing MACD",  minval = 1, maxval = 50, defval = 5,group="MACD Fast")
sma_source = input.string(title="Oscillator MA Type MACD",  defval="EMA", options=["SMA", "EMA"],group="MACD Fast")
sma_signal = input.string(title="Signal Line MA Type MACD", defval="EMA", options=["SMA", "EMA"],group="MACD Fast")

fast_ma = sma_source == "SMA" ? ta.sma(src, fast_length) : ta.ema(src, fast_length)
slow_ma = sma_source == "SMA" ? ta.sma(src, slow_length) : ta.ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == "SMA" ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)
hist = macd - signal




long= close > out and close < upper and close > lower and hist < 0 and k < 50 and close > out2 

short= close < out and close < upper and close > lower and hist > 0 and k > 50 and close < out2 

strategy.entry("long",strategy.long,when= long)

strategy.entry("short",strategy.short,when=short)

```

> Detail

https://www.fmz.com/strategy/436219

> Last Modified

2023-12-22 12:42:15
