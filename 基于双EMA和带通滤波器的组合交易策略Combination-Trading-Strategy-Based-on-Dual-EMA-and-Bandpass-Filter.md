
> Name

基于双EMA和带通滤波器的组合交易策略Combination-Trading-Strategy-Based-on-Dual-EMA-and-Bandpass-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12ba73628b099c6f75c.png)
 [trans]

## 概述

本策略通过组合使用双指数移动平均线(Dual Exponential Moving Average,DEMA)和带通滤波器(Bandpass Filter,BPF)两个指标,实现突破买入和超买超卖的双重过滤,形成稳定的交易信号,追求获利最大化。

## 策略原理

该策略由两个子策略组成:

1. DEMA策略

   使用2日和20日的双指数移动平均线形成金叉买入和死叉卖出信号。该指标过滤了价格的部分噪音,有利于发现趋势。

2. BPF策略

   BPF指标结合数学变换,检测出价格中循环往复的组分,形成某一周期内的超买超卖区域,发出交易信号。本策略设置为20天周期,0.5的正则化参数。

两者结合使用,同向做多做空信号出现时,说明趋势和周期因素都得到验证,因此可信度更高,从而产生更稳定的入场和退出点。

## 优势分析

该策略最大的优势在于双重指标过滤,使信号更加稳定可靠。DEMA平滑价格,识别趋势方向;BPF识别循环特征,确定超买超卖区域。两者交叉验证,可大幅降低因价格噪音和周期调整产生的虚假信号的概率。

另外,策略本身交易频次不高,避免过度交易的资金和手续费损耗。持仓时间以中长线为主,有利于避开随机波动的影响。

## 风险分析

该策略最大的风险在于误判市场状态。在震荡行情中,容易产生错误信号;在趋势反转时,止损可能较大。此外,参数设置问题也会对策略表现产生较大影响。

针对这些风险,可以通过优化指标参数、设置止损止盈、结合其他指标等方式进行控制和改进。当判断市场进入震荡和换手阶段时,可以考虑暂停策略,避开不利行情的干扰。

## 优化方向  

该策略可从以下几个方面进行优化:

1. 时间周期优化。测试不同的DEMA和BPF参数设置,确定最佳周期组合。

2. 增加止损止盈设置。合理设置止损幅度,避免亏损扩大;适当止盈,锁定部分利润。

3. 增加其他指标过滤。例如Volume,MACD等,避免信号被大量减仓博弈所误导。

4. 参数自适应优化。使DEMA和BPF的参数能根据最新市场状态进行动态调整,保证指标的实时性。

## 总结

该策略整合双EMA和BPF两个指标的优势,双重过滤提高信号质量,追求稳定的中长线获利。风险主要来自市场状态判断误差和参数设置不当。通过多指标验证、动态优化参数等方式,可以使策略更具弹性和适应性,性价比更高。

||

## Overview

This strategy combines the Dual Exponential Moving Average (DEMA) and Bandpass Filter (BPF) indicators to implement breakout buying and overbought-oversold dual filtering, forming stable trading signals and pursuing maximum profitability.

## Strategy Principle  

The strategy consists of two sub-strategies:

1. DEMA Strategy

    It uses the 2-day and 20-day dual exponential moving averages to generate golden cross buying and dead cross selling signals. This indicator filters out some price noise and helps discover trends.

2. BPF Strategy

    The BPF indicator combines mathematical transforms to detect the cyclical components in prices and forms overbought-oversold zones within a certain period to generate trading signals. This strategy sets it to a 20-day cycle with a 0.5 regularization parameter.

Combining the two provides stronger verification of trend and cyclical factors when concurrent buy/sell signals emerge. Hence the reliability is higher, resulting in more stable entry and exit points.

## Advantage Analysis

The biggest advantage of this strategy is the dual indicator filtering that makes the signals more stable and reliable. DEMA smoothes prices and identifies trend directions; BPF recognizes cyclical features and determines overbought-oversold zones. Cross validation between the two can greatly reduce false signals caused by price noise and cyclical adjustments.

In addition, the strategy itself has an infrequent trading frequency, avoiding excessive capital and commission costs from overtrading. Position holding times are mostly mid-to-long term, which helps avoid random fluctuation impacts.

## Risk Analysis

The biggest risk of this strategy is misjudging market states. It is prone to wrong signals in ranging markets and could suffer large stop losses when trends reverse. Moreover, parameter settings could also considerably impact strategy performance. 

To address these risks, methods like optimizing indicator parameters, setting stop losses/takes profits, combining other indicators etc. can be adopted for control and improvements. When judging the market has entered an ranging, choppy stage, consider suspending the strategy to avoid interference from unfavorable market conditions.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Time cycle optimization. Test different DEMA and BPF parameter settings to determine the optimal period combinations.

2. Add stop loss/take profit settings. Reasonably set stop loss amplitudes to avoid loss magnification; take profits appropriately to lock in partial gains.

3. Add other indicator filters. Such as Volume, MACD etc. to avoid misleading signals from high volume unwinding and position flipping.

4. Parameter adaptive optimization. Make the DEMA and BPF parameters adaptable based on latest market conditions to keep indicator timeliness.  

## Conclusion

The strategy integrates the strengths of dual EMA and BPF indicators with dual filtering to improve signal quality and pursue steady mid-to-long term profits. Risks mainly come from market condition misjudgements and inadequate parameter tuning. Methods like multi-indicator validation and dynamic parameter optimization can make the strategy more elastic and adaptive for higher cost-effectiveness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?●═════ 2/20 EMA ═════●)Length|
|v_input_int_2|20|(?●═════ Bandpass Filter  ═════●)LengthBPF|
|v_input_1|0.5|Delta|
|v_input_float_1|5|SellZone|
|v_input_float_2|-5|BuyZone|
|v_input_bool_1|false|(?●═════ MISC ═════●)Trade reverse|
|v_input_int_3|true|(?●═════ Time Start ═════●)From Day|
|v_input_int_4|true|From Month|
|v_input_int_5|2005|From Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-10 00:00:00
end: 2024-01-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 05/04/2022
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// Second strategy
// The related article is copyrighted material from
// Stocks & Commodities Mar 2010
//
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
EMA20(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ta.ema(xPrice, Length)
    nHH = math.max(high, high[1])
    nLL = math.min(low, low[1])
    nXS = nLL > xXA or nHH < xXA ? nLL : nHH
    iff_1 = nXS < close[1] ? 1 : nz(pos[1], 0)
    pos := nXS > close[1] ? -1 : iff_1
    pos


BPF(Length,Delta,SellZone,BuyZone) =>
    pos = 0.0
    xPrice = hl2
    beta = math.cos(3.14 * (360 / Length) / 180)
    gamma = 1 / math.cos(3.14 * (720 * Delta / Length) / 180)
    alpha = gamma - math.sqrt(gamma * gamma - 1)
    BP = 0.0
    BP := 0.5 * (1 - alpha) * (xPrice - xPrice[2]) + beta * (1 + alpha) * nz(BP[1]) - alpha * nz(BP[2])
    pos:= BP > SellZone ? 1 :
    	   BP <= BuyZone? -1 : nz(pos[1], 0) 
    pos

strategy(title='Combo 2/20 EMA & Bandpass Filter', shorttitle='Combo', overlay=true)
var I1 = '●═════ 2/20 EMA ═════●'
Length = input.int(14, minval=1, group=I1)
var I2 = '●═════ Bandpass Filter  ═════●'
LengthBPF = input.int(20, minval=1, group=I2)
Delta = input(0.5, group=I2)
SellZone = input.float(5, step = 0.01, group=I2)
BuyZone = input.float(-5, step = 0.01, group=I2)
var misc = '●═════ MISC ═════●'
reverse = input.bool(false, title='Trade reverse', group=misc)
var timePeriodHeader = '●═════ Time Start ═════●'
d = input.int(1, title='From Day', minval=1, maxval=31, group=timePeriodHeader)
m = input.int(1, title='From Month', minval=1, maxval=12, group=timePeriodHeader)
y = input.int(2005, title='From Year', minval=0, group=timePeriodHeader)
StartTrade = time > timestamp(y, m, d, 00, 00) ? true : false
posEMA20 = EMA20(Length)
prePosBPF = BPF(LengthBPF,Delta,SellZone,BuyZone)
iff_1 = posEMA20 == -1 and prePosBPF == -1 and StartTrade ? -1 : 0
pos = posEMA20 == 1 and prePosBPF == 1 and StartTrade ? 1 : iff_1
iff_2 = reverse and pos == -1 ? 1 : pos
possig = reverse and pos == 1 ? -1 : iff_2
if possig == 1
    strategy.entry('Long', strategy.long)
if possig == -1
    strategy.entry('Short', strategy.short)
if possig == 0
    strategy.close_all()
barcolor(possig == -1 ? #b50404 : possig == 1 ? #079605 : #0536b3)
```

> Detail

https://www.fmz.com/strategy/439042

> Last Modified

2024-01-17 11:22:30
