
> Name

多重指标碰撞反转策略Multi-indicator-Collision-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/130f5979683ac9a4713.png)
[trans]

## 概述

该策略通过结合双重指标信号,设计出一种高效的反转策略。首先,它整合了一个基于随机指标的反转信号和一个追踪连续上涨天数的系统,当两个信号同时触发买入或卖出时,该策略才会下单。这种多重指标碰撞的机制,可以有效过滤掉部分无效信号,从而提高策略胜率。

## 策略原理

该策略由两部分指标信号构成。第一部分是123反转系统,它观察最近两天的收盘价变化,以及标准差为3的慢速随机指标值。具体来说,当前一天收盘价较前两天低,今天收盘价高于昨天收盘价,且9日慢速随机指标低于50时,做多;相反,当今天收盘价低于昨天且快速随机指标高于50时,做空。

第二部分指标则追踪最近n天的连续上涨天数。如果最近n天都是上涨的,则输出1,否则输出0。该指标用来识别趋势的形成。

最后,只有当123反转信号和连续上涨天数同时呈现买入或卖出状态时,本策略才会执行交易。这种多重指标碰撞加权的方式,可以过滤掉部分无效信号,从而提高策略整体的稳定性。

## 优势分析

这种多重指标组合策略最大的优势,在于可以提高信号的可靠性,过滤掉部分无效信号。具体来说,主要有以下几点优势:

1. 123反转本身就具有一定的筛选功能,可以避免被噪音迷惑。结合追踪上涨天数指标,可以进一步识别趋势,避免反转反弹。

2. 随机指标参数设置为9日和3日的快慢线比较,可以平滑参数变化,避免被短期波动迷惑,增强稳定性。

3. 可自定义参数,包括stoch指标参数、上涨天数等,可以针对不同市场调整参数,提高适应性。

4. 可选择反转交易方向,做空机会多,可以通过反向操作获利。

## 风险分析

该策略也存在一些风险,主要集中在以下几个方面:  

1. 多重指标组合虽然可以提高信号准确率,但也可能错过部分机会,降低策略收益上限。

2. 反转信号本身存在被套牢的风险,需要设定止损来控制风险。

3. 参数设置不当也会影响策略表现,需要根据不同市场调整参数。

4. 长期持有而不及时止损,或者追逐股票反转也会带来一定风险。

对应地,可以采取以下措施来控制风险:

1. 适当放宽参数条件,保留更多交易机会。

2. 设置止损点来控制单笔损失。

3. 优化参数并针对不同市场制定参数规则。

4. 避免长期持有单一股票,保持资金流动性。

## 优化方向  

这种多重指标反转策略还有很大优化空间,主要可以从以下几个方面入手:

1. 测试更多指标组合,寻找更匹配的指标搭配策略。

2. 利用机器学习算法来自动优化指标参数。

3. 增加止损、止盈条件,使策略更加稳健。

4. 在趋势指标部分,可测试不同时间周期指标。

5. 评估股票指数、外汇、贵金属、加密货币等不同市场的适用性。

6. 设计复合策略,同时评估多种市场,动态调整仓位。

## 总结

本策略通过巧妙的多指标组合方式,设计出一种同时具有高效率和稳定性的反转交易策略。相比单一指标,这种多重指标碰撞机制可以有效过滤假信号。与此同时,本策略也更新了传统反转策略,加入了新的趋势指标作为信号确认。通过参数优化、止损设置、适应不同市场等一系列优化措施,这种策略可以成为量化交易的有力工具。

||

## Overview  

This strategy is designed as an efficient reversal strategy by combining dual-indicator signals. It integrates a reversal signal based on stochastic indicators and a system that tracks the number of consecutive up days. The strategy will only place orders when both signals trigger buy or sell concurrently. This multi-indicator collision mechanism can effectively filter out some invalid signals and improve the win rate.  

## Principle  

The strategy consists of two parts. The first part is the 123 reversal system, which observes the change in closing prices over the past two days, as well as the value of a 3-period slow stochastic indicator. Specifically, when yesterday's close is lower than the previous 2 days and today's close is higher than yesterday's, and the 9-period slow stochastic is below 50, go long; conversely, when today's close is below yesterday's and the fast stochastic is above 50, go short.  

The second indicator tracks the number of consecutive up days recently over n days. If the last n days are all rising, it outputs 1, otherwise 0. This indicator is used to identify trend formation.

Finally, the strategy will only execute trades when the 123 reversal signal and the number of consecutive up days both show buy or sell status concurrently. This multi-indicator collision weighted approach can filter out some invalid signals and improve the overall stability of the strategy.   

## Advantage Analysis

The biggest advantage of this multi-indicator combo strategy is that it can improve the reliability of signals by filtering out some invalid ones. Specifically, there are main advantages:

1. The 123 reversal itself has some screening capability to avoid noise interference. Combined with the consecutive day counter, it can further identify trends and avoid reversal bounces.  

2. The stochastic parameters of 9-day and 3-day fast and slow lines comparison can smooth parameter changes and avoid short-term fluctuations and enhance stability.

3. Customizable parameters including stoch, number of rising days parameters allows adaptation to different markets.  

4. Tradable both ways providing more shorting opportunities.

## Risk Analysis   

There are also some risks to this strategy:   

1. The multi-indicator combo, while enhancing signal accuracy, may also miss some opportunities and limit profits.

2. Reversal signals have inherent risks of being trapped, requiring stop losses to control risk.  

3. Improper parameter settings can affect performance requiring adjustment between markets.  

4. Holding long-term positions without timely stop loss or chasing stock reversals also carries risks.

Accordingly, the following measures can be taken to mitigate risks:

1. Relax parameter conditions appropriately to retain more trading opportunities.  

2. Set stop loss points to limit per trade loss.

3. Optimize parameters and set parameter rules for different markets.  

4. Avoid holding single stocks long-term and maintain liquidity.

## Optimization Directions   

There is still great potential to optimize this multi-indicator reversal strategy, mainly from the following aspects:  

1. Test more indicator combinations to find better matches.  

2. Use machine learning algorithms to auto optimize parameters.

3. Add stop loss and take profit conditions for more robustness.  

4. Test different timeframes in the trend indicator part.  

5. Evaluate applicability across stock indices, forex, commodities,cryptocurrencies.  

6. Design compounding strategies that dynamically adjust allocations across multiple markets concurrently.  

## Summary  

This strategy skillfully combines multiple indicators to design an efficient yet stable reversal trading strategy. Compared to single indicators, the multi-indicator collision mechanism effectively filters false signals. Meanwhile, this strategy also updates traditional reversal methods by adding new trend indicators for signal confirmation. With parameter optimization, stop losses, adaptation across markets, and more, this becomes a powerful quantitative trading toolkit.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- N Bars Up ----|
|v_input_7|4|nLength|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-28 00:00:00
end: 2024-01-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 26/03/2021
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
// Evaluates for n number of consecutive higher closes. Returns a value 
// of 1 when the condition is true or 0 when false.
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


NBU(nLength) =>
    pos = 0.0
    nCounter = 0
    nCounter :=  iff(close[1] >= open[1], nz(nCounter[1],0)+1,
                  iff(close[1] < open[1], 0, nCounter))
    C1 = iff(nCounter >= nLength, 1, 0)
    posprice = 0.0
    posprice := iff(C1== 1, close, nz(posprice[1], 0)) 
    pos := iff(posprice > 0, 1, 0)
    pos

strategy(title="Combo Backtest 123 Reversal & N Bars Up", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- N Bars Up ----")
nLength = input(4, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posNBU = NBU(nLength)
pos = iff(posReversal123 == 1 and posNBU == 1 , 1,
	   iff(posReversal123 == -1 and posNBU == -1, -1, 0)) 
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

https://www.fmz.com/strategy/437694

> Last Modified

2024-01-04 18:02:12
