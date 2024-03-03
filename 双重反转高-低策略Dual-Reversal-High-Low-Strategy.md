
> Name

双重反转高-低策略Dual-Reversal-High-Low-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1837f219c147c5b1edc.png)
[trans]

## 概述
双重反转高-低策略,是一个结合双重信号的量化策略。它融合了一个基于反转的日内策略和一个利用昨日最高价与移动平均线差值的趋势判断策略。该策略旨在实现更稳定的买入卖出信号,进一步规避错误信号的发出。

## 策略原理
首先,反转策略部分。该策略于连续两日收盘价出现反转时判断形成信号,同时结合随机指标判断超买超卖状态。具体来说,连续两日收盘价从上涨转为下跌,且快速随机指标高于慢速随机指标时为卖出信号;连续两日收盘价从下跌转为上涨,且快速随机指标低于慢速随机指标时为买入信号。

再者,高-低策略部分。该策略利用昨日最高价与一个长度为13的指数移动平均线的值之差判断趋势。当最高价高于移动平均线时生成买入信号;当最高价低于移动平均线时生成卖出信号。

最后,本策略将两个信号进行整合。当两个信号同时出现买入信号时采取买入操作;当两个信号同时出现卖出信号时采取卖出操作。

## 优势分析
该策略结合双重信号指标,可以有效减少错误信号和不必要的交易次数。反转部分可以判断超买超卖现象,避免追高杀跌。高-低部分可以判断价格趋势背离现象,规避假突破。两者结合判断时,只有当双信号同向时才产生实际的交易信号,可以显著提高信号的可靠性,并减少无效交易的次数。

另外,反转部分和高低部分使用不同类型的指标和判断标准,两者可以起到互相验证的效果,进一步减少错误信号。当市场出现特殊情况时,单一指标容易发出错误信号,而结合判断则可以抵消部分错误。这种多指标综合判断的策略,可以获得更可靠、更稳定的交易信号。

## 风险分析
该策略最大的风险在于,强势趋势市场下,持续合理的单边信号可能被忽略。当趋势十分明显时,反转部分的信号判断可能是错误的,这会导致高-低部分单边信号无法兑现成交易。这在趋势牛市和熊市中尤为明显。

此外,参数设置不当也会对策略造成影响。反转部分中的参数设置需要考量周期均线系统,与高低部分的移动平均线周期需要协调设置。如果两者周期不当,则会出现平凡无奇的假信号或者直接无信号的情况。

## 优化方向 
第一,可以测试修改高-低部分移动平均线的长度参数,使其与反转部分周期指标更加协调。现在高-低部分使用13周期指标判断可能过于敏感,可以尝试拉长周期获得更稳定判断。

第二,反转部分也可以测试改为采用K线实体的方式判定,现在仅用收盘价容易受影响。考虑实体更大的K线的反转可能具有更强的信号作用。

最后,还可以尝试只在盘中出现反转信号时才考虑采取交易,现在的日内持仓方式风险较大。改为采取临时反转交易可以规避部分持仓风险。

## 总结
双重反转高-低策略综合多个指标信号,在发出买卖信号前进行了双重验证。这种严格的信号过滤机制,可以有效减少无效信号和错误信号对实际交易的影响。策略成功控制了无效交易的频率,使每一次的交易都更加可靠,避免了随波逐流的盲目交易。通过参数优化,或可在某些市场中获得更佳的表现。

||

## Overview
The Dual Reversal High-Low strategy is a quantitative strategy that combines dual signals. It integrates a reversal-based intraday strategy and a trend judgment strategy that utilizes the difference between yesterday's highest price and a moving average. The strategy aims to achieve more stable buy and sell signals to further avoid the issuance of incorrect signals.

## Principles
First, the reversal strategy part. This strategy judges the formation of signals when there is a reversal in the closing price for two consecutive days, while combining the judgment of overbought and oversold states using the stochastic indicator. Specifically, it is a sell signal when the closing price changes from rising to falling for two consecutive days, and the fast stochastic indicator is above the slow stochastic indicator; it is a buy signal when the closing price changes from falling to rising for two consecutive days, and the fast stochastic indicator is below the slow stochastic indicator.

Second, the high-low strategy part. This strategy uses the difference between yesterday's highest price and a 13-period exponential moving average to determine the trend. It generates a buy signal when the highest price is above the moving average; it generates a sell signal when the highest price is below the moving average.

Finally, this strategy integrates the two signals. It takes a buy action when both signals show a buy signal at the same time; it takes a sell action when both signals show a sell signal at the same time.

## Advantages
This dual signal strategy can effectively reduce incorrect signals and unnecessary trades. The reversal part can determine overbought and oversold conditions to avoid chasing highs and selling lows. The high-low part can determine price trend divergences to avoid false breakouts. When combining the judgments, actual trading signals are only generated when the dual signals are in the same direction, which can significantly improve the reliability of the signals and reduce ineffective trades.

In addition, the reversal and the high-low parts use different types of indicators and judgment criteria, so they can serve to validate each other and further reduce incorrect signals. When special situations occur in the market, a single indicator is prone to incorrect signals, while combined judgments can offset some errors. This kind of multi-indicator integrated judgment strategy can obtain more reliable and stable trading signals.

## Risk Analysis  
The biggest risk of this strategy is that sustained reasonable one-sided signals may be ignored in a strong trending market. When the trend is very obvious, the signal judgment of the reversal part may be wrong, which will cause the one-sided signals in the high-low part to fail to be executed as trades. This is especially prominent in trending bull and bear markets.

In addition, improper parameter settings can also affect the strategy. The parameter settings in the reversal part need to take into account the cycle moving average system, and the moving average period in the high-low part needs to be coordinated. If the periods of both are improper, there will be mediocre false signals or simply no signals.

## Optimization
First, the length parameter of the moving average in the high-low part can be tested to make it more coordinated with the cycle indicators in the reversal part. The current 13-period indicator in the high-low part may be too sensitive, and trying longer periods may obtain more stable judgments.  

Second, the reversal part can also test using K-line entities instead of using only the closing price which is easily influenced. Considering that a reversal of a larger real body K-line may have a stronger signal effect.

Finally, it can also try to only consider taking trades when reversal signals appear during the session, as the current intraday holding method has higher risks. Changing to adopt temporary reversal trading can avoid some holding risks.  

## Conclusion  
The dual reversal high-low strategy integrates signals from multiple indicators and conducts dual verification before issuing buy and sell signals. This strict signal filtering mechanism can effectively reduce the impact of invalid and incorrect signals on actual trading. The strategy successfully controls the frequency of ineffective trades, making each trade more reliable, and avoids blindly following short-term market moves. Through parameter optimization, it may achieve better performance in certain markets.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|13|Length_HEMA|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 23/11/2020
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
// This indicator plots the difference between the High (of the previous period)
// and an exponential moving average (13 period) of the Close (of the previous period).
// You can use in the xPrice any series: Open, High, Low, Close, HL2, HLC3, OHLC4 and ect...
// It buy if indicator above 0 and sell if below.
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

    
HEMA(Length) =>
    pos = 0.0
    xPrice = close  // You can use any series
    xEMA = ema(xPrice, Length)
    nRes = high[1] - nz(xEMA[1])
    pos:= iff(nRes > 0, 1,
    	   iff(nRes < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & High - EMA Strategy", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Length_HEMA = input(13, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posHEMA = HEMA(Length_HEMA)
pos = iff(posReversal123 == 1 and posHEMA == 1 , 1,
	   iff(posReversal123 == -1 and posHEMA == -1, -1, 0)) 
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

https://www.fmz.com/strategy/437515

> Last Modified

2024-01-03 13:56:04
