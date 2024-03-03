
> Name

双自信价格震荡量化策略Doubly-Confident-Price-Oscillation-Quant-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14b4a54ed4b82dac4d9.png)
[trans]
## 概述

本策略的主要思想是结合123反转策略和绝对价格波动指标这两种不同类型的策略,从而获得一个综合信号。具体来说,如果两个策略都发出做多信号,则最终策略信号为1(做多);如果两个策略都发出做空信号,则最终策略信号为-1(做空);如果两个策略的信号不一致,则最终信号为0(不做任何操作)。

## 策略原理

首先,123反转策略的原理是:如果收盘价连续两天低于前一天的收盘价,且随机指标低于超买线,则做多;如果收盘价连续两天高于前一天的收盘价,且随机指标高于超卖线,则做空。

其次,绝对价格波动指标显示的是两条指数移动平均线之间的差值。当快速移动平均线高于慢速移动平均线时为正,表示趋势向上;反之为负,表示趋势向下。

最后,本策略会将两个子策略的信号结合,即如果两者发出一致信号,则按此信号操作;否则不进行操作。

## 优势分析

本策略综合考虑了短期反转信号和价格的中长期趋势,能够有效识别行情的转折点。相比单一使用123反转或APO指标,本策略可以大大提高信号的可靠性,减少错误信号的产生。

另外,本策略运用了多种技术指标,能够全面判断市场行情,不会仅依赖某一指标。这可以避免由于某个指标失效而导致整体判决失误的情况发生。

## 风险分析

本策略最大的风险在于123反转策略和APO指标产生分歧信号的情况。这种情况下,操作者需要依据自身的经验判断哪一个信号更为可靠。如果判断出现偏差,则可能错过交易机会或出现亏损。

此外,如果行情出现剧烈变动,导致短期反转信号和中长线趋势信号同时发生失效的情况,那么策略的信号也会出现错误。操作者需要关注重大政治经济事件对行情的影响,必要时可以暂停策略运行。

## 优化方向

本策略可以从以下几个方向进行优化:

1. 优化子策略的参数,使得子策略信号更加可靠。例如调整移动平均线周期参数。

2. 增加其他辅助判断指标,形成投票机制。当多个指标发出一致信号时,信号的可靠性会更高。

3. 增加止损策略。当价格走势不符合技术指标预期时,及时止损可以避免继续扩大损失。

4. 优化开仓和止损位置。结合历史回测数据,设定更合适的具体数值。

## 总结

本策略综合运用多种技术指标判断行情,在一定程度上规避了单一指标依赖的风险,提高了信号判断的准确性。同时该策略也存在一定的优化余地,投资者可以根据自身需要进行参数调整。总的来说,双自信价格震荡量化策略是一种信号可靠性较高的交易策略,值得进一步研究应用。

||

## Overview

The main idea of this strategy is to combine the 123 Reversal strategy and the Absolute Price Oscillator indicator to obtain an integrated signal. Specifically, if both sub-strategies emit long signals, the final strategy signal is 1 (long); if both emit short signals, the final signal is -1 (short); if the signals are inconsistent, the final signal is 0 (no operation).  

## Principles  

Firstly, the principle of the 123 Reversal strategy is: if the close price is lower than the previous day's close for two consecutive days, and the Stochastic Oscillator is below the overbought line, go long; if the close price is higher than the previous day's close for two consecutive days, and the Stochastic Oscillator is above the oversold line, go short.  

Secondly, the Absolute Price Oscillator displays the difference between two exponential moving averages. A positive value indicates an upward trend, while a negative value indicates a downward trend.

Finally, this strategy combines the signals of the two sub-strategies, i.e. follow the signal if they are consistent; otherwise, do not operate.

## Advantage Analysis

This strategy comprehensively considers short-term reversal signals and medium-to-long term trend signals, which can effectively identify turning points. Compared to using 123 Reversals or APO alone, this strategy can greatly improve the reliability of signals and reduce erroneous signals.  

In addition, this strategy employs multiple technical indicators to judge the market comprehensively instead of relying on any single one. This avoids wrong judgments due to failure of one indicator.

## Risk Analysis  

The biggest risk is when the 123 Reversal and APO emit conflicting signals. In such cases, the operator needs to judge based on experience which signal is more reliable. Wrong judgements may lead to missing trading opportunities or losses.  

In addition, drastic market changes may invalidate signals from both sub-strategies simultaneously. Traders need to monitor events that significantly impact markets, and pause the strategy if necessary.

## Optimization  

Possible optimization directions:

1. Optimize sub-strategy parameters for more reliable signals, e.g. moving average periods. 

2. Add other auxiliary indicators to form a voting mechanism. Consistent signals from multiple indicators are more reliable.  

3. Add stop loss strategies. Timely stop loss on adverse price moves avoids further losses.

4. Optimize entry and stop loss levels based on historical backtesting.  

## Conclusion

This strategy combines multiple technical indicators to judge the market, avoiding single indicator dependency risks to some extent and improving signal accuracy. There is also room for optimization based on investor requirements. Overall, the Doubly Confident Price Oscillation Quant Strategy provides reliable trade signals and is worth researching further.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|10|LengthShortEMA|
|v_input_6|20|LengthLongEMA|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/04/2019
// This is combo strategies for get 
// a cumulative signal. Result signal will return 1 if two strategies 
// is long, -1 if all strategies is short and 0 if signals of strategies is not equal.
//
// First strategy
// This System was created from the Book "How I Tripled My Money In The 
// Futures Market" by Ulf Jensen, Page 183. This is reverse type of strategies.
// The strategy buys at market, if close price is higher than the previous close 
// during 2 days and the meaning of 9-days Stochastic Slow Oscillator is lower than 50. 
// The strategy sells at market, if close price is lower than the previous close price 
// during 2 days and the meaning of 9-days Stochastic Fast Oscillator is higher than 50.
//
// Secon strategy
// The Absolute Price Oscillator displays the difference between two exponential 
// moving averages of a security's price and is expressed as an absolute value.
// How this indicator works
//    APO crossing above zero is considered bullish, while crossing below zero is bearish.
//    A positive indicator value indicates an upward movement, while negative readings 
//      signal a downward trend.
//    Divergences form when a new high or low in price is not confirmed by the Absolute Price 
//      Oscillator (APO). A bullish divergence forms when price make a lower low, but the APO 
//      forms a higher low. This indicates less downward momentum that could foreshadow a bullish 
//      reversal. A bearish divergence forms when price makes a higher high, but the APO forms a 
//      lower high. This shows less upward momentum that could foreshadow a bearish reversal.
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

AbsolutePriceOscillator(LengthShortEMA, LengthLongEMA) =>
    xPrice = close
    xShortEMA = ema(xPrice, LengthShortEMA)
    xLongEMA = ema(xPrice, LengthLongEMA)
    xAPO = xShortEMA - xLongEMA
    pos = 0.0    
    pos := iff(xAPO > 0, 1,
           iff(xAPO < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal and Absolute Price Oscillator (APO)", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
LengthShortEMA = input(10, minval=1)
LengthLongEMA = input(20, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posAbsolutePriceOscillator = AbsolutePriceOscillator(LengthShortEMA, LengthLongEMA)
pos = iff(posReversal123 == 1 and posAbsolutePriceOscillator == 1 , 1,
	   iff(posReversal123 == -1 and posAbsolutePriceOscillator == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
```

> Detail

https://www.fmz.com/strategy/441961

> Last Modified

2024-02-18 10:10:16
