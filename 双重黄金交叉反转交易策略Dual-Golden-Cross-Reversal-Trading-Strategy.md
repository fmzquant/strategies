
> Name

双重黄金交叉反转交易策略Dual-Golden-Cross-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ebf0edad13c2750fd3.png)
[trans]

## 概述

双重黄金交叉反转交易策略是一种综合使用股票技术分析指标的交易策略。它结合了123形态反转策略和质数波带指标,实现多种交易信号的融合,以获取更可靠的交易信号。

## 策略原理

该策略由两个子策略组成:

1. 123形态反转策略

    它的交易信号来源于股票的收盘价。当连续两天的收盘价关系发生变化时产生信号。即如果前一天的收盘价高于前两天,而当天收盘价低于前一天,那么产生做空信号;如果前一天收盘价低于前两天,而当天收盘价高于前一天,那么产生做多信号。同时,该信号必须在9日stoch指标转换发生时才被激活。即如果做多信号出现时,快线低于慢线,那么该做多信号被激活;如果做空信号出现时,快线高于慢线,那么该做空信号被激活。

2. 质数波带策略 

    该策略利用质数的随机分布特性,确定价格波动的范围。它先计算出价格附近一定百分比范围内的最高和最低质数,然后以这两个质数构建通道。如果价格触碰通道边缘,产生交易信号。即价格上穿上边缘时,产生做多信号;价格下穿下边缘时,产生做空信号。

综合这两个子策略,如果两者的信号一致,就产生最终的交易信号。即123形态反转策略和质数波带策略同时产生做多信号时,产生最终做多信号。如果两者产生的信号不一致,则不进行交易。

## 优势分析

该策略具有以下优势:

1. 多种信号融合,提高盈利概率

    通过合并两种不同类型的策略信号,可以检查信号的可靠性,筛选出高概率获利的交易机会。

2. 123形态反转具有较高胜率

    123形态反转属于经典的反转交易策略,它可以捕捉短期超买超卖现象带来的反转机会,具有较高的实盘交易胜率。

3. 质数波带利用价格规律

    质数波带利用质数独特的随机性来判断价格波动范围,避免受主观因素影响,增强了交易信号的客观性。

4. 策略思路新颖,不容易被套利

    该策略综合运用多种指标进行交易,具有一定的创新性,不太容易被其他跟单策略套取利润。

## 风险分析

该策略也存在以下风险:

1. 反转失败风险

    123形态反转属于反转交易策略,如果出现假反弹,将导致反转失败,从而亏损。

2. 质数波带失效风险

    质数波带依赖特定参数设置,如果参数设置不当,将导致质数波带失效,无法发挥指导作用。

3. 多重信号增大交易频率

    该策略综合两个信号源,交易频率会较单一信号源策略更高,如果交易费用控制不好,可能会侵蚀利润。

4. 参数优化难度较大

    由于同时结合两种策略,要找到最优参数组合以达到最佳效果难度较大。

## 优化建议

该策略可以从以下几个方面进行优化:

1. 加入止损策略,控制单笔亏损。

2. 优化质数波带的参数,使其尽量贴合最新的市场状况。

3. 对交易频率进行控制,防止过高交易频率带来的交易费用损失。

4. 增加机器学习算法,实现策略的参数自动优化。

5. 添加更多辅助判决指标,如量价指标等,进一步提升信号的准确率。

## 总结

双重黄金交叉反转交易策略综合运用多种技术指标进行交易,通过多种信号的验证和筛选,可以过滤掉一些噪音交易,从而获取较高概率的交易机会。但该策略也存在一定程度的风险,需要进行适当的优化来控制风险,强化策略的效果。如果风险得到控制,该策略可以成为一种较为稳定可靠的量化交易策略。

||


## Overview

The dual golden cross reversal trading strategy is a trading strategy that combines multiple technical analysis indicators. It incorporates the 123 reversal pattern strategy and the prime number bands indicator to integrate diverse trading signals and obtain more reliable trading signals.

## Strategy Principles 

The strategy consists of two sub-strategies:

1. 123 reversal pattern strategy

    It generates trading signals based on the closing prices of stocks. Signals are triggered when the relationship between closing prices of consecutive days change. Specifically, a short signal is generated when the previous closing price is higher than that of two days ago, and the current closing price is lower than previous day. A long signal is generated when the previous closing price is lower than that of two days ago, and the current closing price is higher than previous day. Additionally, the signals are only activated when stochastic oscillator crosses over. That is, the long signal is activated only when the fast line is below the slow line. The short signal is activated only when the fast line is above the slow line.

2. Prime number bands strategy

    This strategy uses the unique distribution of prime numbers to determine price fluctuation ranges. It first locates the highest and lowest prime numbers within a certain percentage range of the price, and plots the two prime number series as bands. Trading signals are generated when the price touches the bands. Specifically, a long signal is triggered when the price breaks above the upper band. A short signal is triggered when the price breaks below the lower band.

The two sub-strategies are combined to generate the final trading signals. That is, the long signal is generated only when both strategies produce long signals. Similarly for the short signals. No trading is executed if the signals from the two strategies contradict with each other.

## Advantage Analysis 

The strategy has the following advantages:

1. Increased profitability through signal integration

    By combining signals from two different types of strategies, the reliability of the signals can be verified to identify high-probability profitable trading opportunities.

2. High win rate of 123 reversal pattern

    The 123 reversal pattern is a classic contrarian strategy that can capture reversal opportunities arising from short-term overbought and oversold situations, thus possessing relatively high win rate in live trading.

3. Prime number bands capture price patterns

    Prime number bands make use of the unique randomness of prime numbers to determine price fluctuation ranges, avoiding subjective bias and enhancing the objectivity of trading signals.

4. Novel strategy logic avoids exploitation

    The innovative integration of multiple indicators makes the strategy less susceptible to reverse engineering and exploitation by copycat strategies.

## Risk Analysis

The strategy also carries the following risks:

1. Failed reversal risk

    As a reversal strategy, failed reversals of the 123 pattern can lead to losses.

2. Failure of prime number bands 

    The prime number bands depend on proper parameter tuning. Incorrect parameters may render it ineffective.

3. Increased trade frequency from multiple signals

    More trades can be generated as two signal sources are combined. Excessive trading costs may erode profits if not properly controlled.

4. Difficult optimization

    Optimizing parameters from two integrated strategies can be challenging.

## Optimization Suggestions

The strategy can be optimized in the following aspects:

1. Incorporate stop loss to limit per trade loss.

2. Optimize prime number bands parameters to fit the latest market conditions. 

3. Control trade frequency to avoid trading cost from overtrading.

4. Introduce machine learning algorithms to automate strategy parameter optimization.

5. Add more confirmation indicators like volume indicators to further improve signal accuracy.

## Summary 

The dual golden cross reversal trading strategy integrates multiple technical indicators to filter out noise trades and identify high-probability trading opportunities through signal verification. But it also carries inherent risks that need to be mitigated through proper optimization to strengthen the strategy. With risks under control, the strategy can become a relatively stable and reliable quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Prime Number Bands ----|
|v_input_7|5|Tolerance Percentage|
|v_input_8|5|Length_PNB|
|v_input_9_high|0|Source Up Band: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10_low|0|Source Down Band: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 23:59:59
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 23/04/2021
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
// Determining market trends has become a science even though a high number 
// or people still believe it’s a gambling game. Mathematicians, technicians, 
// brokers and investors have worked together in developing quite several 
// indicators to help them better understand and forecast market movements.
// The Prime Number Bands indicator was developed by Modulus Financial Engineering 
// Inc. This indicator is charted by indentifying the highest and lowest prime number 
// in the neighborhood and plotting the two series as a band.
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

PrimeNumberUpBand(price, percent) =>
    res = 0.0
    res1 = 0.0
    for j = price to price + (price * percent / 100)
        res1 := j
	    for i = 2 to sqrt(price)
        	res1 := iff(j % i == 0 , 0, j)
            if res1 == 0 
                break
		if res1 > 0 
		    break
    res := iff(res1 == 0, res[1], res1)
    res

PrimeNumberDnBand(price, percent) =>
    res = 0.0
    res2 = 0.0
    for j = price to price - (price * percent / 100)
        res2 := j
	    for i = 2 to sqrt(price)
        	res2 := iff(j % i == 0 , 0, j)
            if res2 == 0 
                break
		if res2 > 0 
		    break
    res := iff(res2 == 0, res[1], res2)
    res

PNB(percent, Length,srcUp,srcDn) =>
    pos = 0.0
    xPNUB = PrimeNumberUpBand(srcUp, percent)
    xPNDB = PrimeNumberDnBand(srcDn, percent)
    xHighestPNUB = highest(xPNUB, Length)
    xLowestPNUB = lowest(xPNDB, Length)
    pos:= iff(close > xHighestPNUB[1], 1,
             iff(close < xLowestPNUB[1], -1, nz(pos[1], 0))) 
    pos


strategy(title="Combo Backtest 123 Reversal & Prime Number Bands", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Prime Number Bands ----")
percent = input(5, minval=0.01, step = 0.01, title="Tolerance Percentage")
Length_PNB = input(5, minval=1)
srcUp = input(title="Source Up Band", type=input.source, defval=high)
srcDn = input(title="Source Down Band", type=input.source, defval=low)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posPNB = PNB(percent, Length_PNB,srcUp,srcDn)
pos = iff(posReversal123 == 1 and posPNB == 1 , 1,
	   iff(posReversal123 == -1 and posPNB == -1, -1, 0)) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1 , 1, pos))	   
if (possig == 1 ) 
    strategy.entry("Long", strategy.long)
if (possig == -1 )
    strategy.entry("Short", strategy.short)	 
if (possig == 0) 
    strategy.close_all()
barcolor(possig == -1 ? #b50404: possig == 1 ? #079605 : #0536b3 )
```

> Detail

https://www.fmz.com/strategy/430985

> Last Modified

2023-11-03 15:32:38
