
> Name

基于双重反转套利策略Dual-Reversal-Arbitrage-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/9856eb45981572d81a.png)
[trans]
## 概述
双重反转套利策略是一种融合双反转指标的套利算法。它整合了123反转系统和Gann摆线振荡指标两个子策略,在两个子策略同时发出信号时,产生交易信号,实现套利操作。

## 策略原理
该策略由两个子策略组成:

1. 123反转系统:它源自Ulf Jensen的《我如何在期货市场上三倍盈利》一书第183页。它的交易规则是:当收盘价比前一日收盘价高,且比前两日收盘价低时,在慢速K线低于50时做多;当收盘价比前一日收盘价低,且比前两日收盘价高时,在快速K线高于50时做空。

2. Gann摆线振荡指标:它源自Robert Krausz的《发现W.D.甘能的宝藏》一书。它通过计算一定周期内的最高价和最低价的涨跌情况,判断市场摆动方向。

该套利策略的交易逻辑是:当两个子策略的信号方向一致时,产生实际的交易信号。做多信号是当两个子策略同时发出做多信号时;做空信号是当两个子策略同时发出做空信号时。

## 优势分析
该策略最大的优势在于整合两个子策略的信号,可以有效过滤假信号,提高交易信号的准确率。两个子策略各有自己的优点,123反转系统可以抓住突发性反转行情,而Gann摆线振荡指标可以判断趋势反转的熟期。把两者结合,可以使交易信号更加可靠,从而提高策略的稳定性。

## 风险分析
该策略的主要风险在于,两个子策略发出的交易信号方向不一致的概率较大,从而导致交易信号较少的问题。此外,子策略本身也会存在一定的假信号风险。这两个因素结合,可能导致策略交易次数不足,无法充分把握市场机会。

为降低风险,可以调整子策略的参数,使其交易频率适当提高,或者结合其他指标来辅助判断,过滤假信号。当两个子策略之间存在较大的信号偏差时,也可以考虑只跟随较为可靠的一方。

## 优化方向 
该策略可从以下几个方面进行优化:
1. 调整子策略的参数,优化交易频率;
2. 增加其他技术指标判断,提高信号质量; 
3. 根据不同品种、周期优化子策略权重;
4. 加入止损机制,控制单笔损失。

## 总结
双重反转套利策略通过集成两种不同类型的反转策略,形成较强的交易信号。它可以有效滤除噪音,提高信号质量,适合捕捉市场中的反转机会。但子策略发出信号不一致的概率较大,可能导致交易频率不足的问题。此外,组合策略本身参数设置较为复杂,需要充分测试优化,才能发挥最大效果。

||

## Overview
The dual reversal arbitrage strategy is an arbitrage algorithm that integrates dual reversal indicators. It combines the 123 reversal system and the Gann swing oscillator sub-strategies and generates trading signals when both sub-strategies give out signals at the same time to carry out arbitrage operations.

## Strategy Logic  
The strategy consists of two sub-strategies:

1. 123 Reversal System: It is from the book "How I Tripled My Money in The Futures Market" by Ulf Jensen, Page 183. Its trading rules are: when the closing price is higher than the previous closing price and lower than the closing price 2 days ago, go long when the slow K line is below 50; when the closing price is lower than the previous closing price and higher than the closing price 2 days ago, go short when the fast K line is above 50.

2. Gann Swing Oscillator: It is adapted from Robert Krausz's book "A W.D. Gann Treasure Discovered". It judges the direction of market swings by calculating the rise and fall of the highest and lowest prices over a certain period.  

The trading logic of this arbitrage strategy is: when the signal directions of the two sub-strategies are consistent, actual trading signals are generated. The long signal is when both sub-strategies give out long signals at the same time; the short signal is when both sub-strategies give out short signals at the same time.

## Advantage Analysis
The biggest advantage of this strategy is that by integrating the signals of the two sub-strategies, it can effectively filter out false signals and improve the accuracy of trading signals. The two sub-strategies each have their own strengths. The 123 reversal system can capture sudden reversal trends, while the Gann swing oscillator can determine the maturity of trend reversals. Combining the two can make trading signals more reliable, thereby enhancing the stability of the strategy.

## Risk Analysis
The main risk of this strategy is that the probability of inconsistent trading signal directions from the two sub-strategies is relatively large, which may lead to insufficient trading signals. In addition, the sub-strategies themselves also have certain risks of false signals. The combination of these two factors may lead to insufficient number of trades for the strategy, thus unable to fully capture market opportunities.  

To mitigate risks, parameters of the sub-strategies can be adjusted to moderately increase trading frequency, or other indicators can be combined to assist in filtering out false signals. When there is a large deviation in signals between the two sub-strategies, following only the more reliable one can also be considered.

## Optimization Directions
The strategy can be optimized in the following aspects:
1. Adjust the parameters of the sub-strategies to optimize trading frequency;  
2. Add judgements of other technical indicators to improve signal quality;
3. Optimize the weights of the sub-strategies based on different products and timeframes; 
4. Add stop loss mechanisms to control single transaction loss.

## Summary
The dual reversal arbitrage strategy forms relatively strong trading signals by integrating two different types of reversal strategies. It can effectively filter out noise and improve signal quality, suitable for capturing reversal opportunities in the market. However, the probability of inconsistent signals from the sub-strategies is relatively large, which may lead to insufficient trading frequency. In addition, the parameter settings of combination strategies themselves are quite complex, requiring sufficient testing and optimization in order to achieve the best results.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|5|LengthGSO|
|v_input_6|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 04/11/2020
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
// The Gann Swing Oscillator has been adapted from Robert Krausz's book, 
// "A W.D. Gann Treasure Discovered". The Gann Swing Oscillator helps 
// define market swings. 
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

    
GannSO(Length) =>
    pos = 0.0
    xGSO = 0.0
    xHH = highest(Length)
    xLL = lowest(Length)
    xGSO:= iff(xHH[2] > xHH[1] and xHH[0] > xHH[1], 1,
             iff(xLL[2] < xLL[1] and xLL[0] < xLL[1], -1, nz(xGSO[1],0)))
    pos := iff(xGSO > 0, 1,
    	     iff(xGSO < 0, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Gann Swing Oscillator", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthGSO = input(5, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posGannSO = GannSO(LengthGSO)
pos = iff(posReversal123 == 1 and posGannSO == 1 , 1,
	   iff(posReversal123 == -1 and posGannSO == -1, -1, 0)) 
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

https://www.fmz.com/strategy/441141

> Last Modified

2024-02-06 09:58:04
