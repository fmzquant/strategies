
> Name

双线交叉反转策略Dual-Moving-Average-Crossover-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/177be8025d7c172f991.png)

[trans]

## 概述

双线交叉反转策略是一种趋势跟踪策略,它结合了123反转策略和DiNapoli去趋势振荡器策略,通过双线交叉产生交易信号,实现追踪市场趋势的功能。

## 策略原理

该策略由两部分组成:

1. 123反转策略:该策略运用 stochastic 指标产生信号。当收盘价连续两日下跌后上涨,并且 stochastic 快线低于慢线且快线低于50时,产生买入信号;当收盘价连续两日上涨后下跌,并且 stochastic 快线高于慢线且快线高于50时,产生卖出信号。

2. DiNapoli去趋势振荡器策略:该策略利用价格的移动平均线,当价格高于或低于移动平均线一定幅度时,产生交易信号。具体为,当价格超过移动平均线正Trigger值时产生买入信号,当价格低于移动平均线负Trigger值时产生卖出信号。

上述两种策略各自产生独立的交易信号后,本策略将它们整合,当两者的交易信号一致时,即双线交叉形成同向信号时,本策略才会产生实际的交易指令,否则不进行任何操作。

## 优势分析

该策略结合双线交易信号,可有效跟踪市场趋势,具有以下优势:

1. 充分利用stochastic指标判断力度与趋势性的优点,避免因某单一指标信号误导带来损失。

2. DiNapoli指标可有效识别趋势,避免因随机波动带来不必要开仓。

3. 双线交叉可有效减少虚假信号,提高信号质量,为判断行情走向提供有力依据。

4. 策略参数可调,用户可根据个人偏好,选择参数组合,灵活适应不同市场环境。

## 风险分析

该策略也存在以下风险:

1. 在牛市中,策略可能因指标参数设置过于谨慎,导致错过买入良机。可适当调整参数使策略更趋积极。

2. 在熊市中,双线交叉信号可能延迟,带来超买超卖现象,应适当缩短平均线周期,使策略更趋敏感。 

3. 若遇巨额单边行情,双线交叉信号可能迟钝,应设置止损以控制亏损。

## 优化方向 

该策略可从以下方向进行优化:

1. 对stochastic指标和DiNapoli指标的参数进行测试与优化,找到最佳参数组合。

2. 添加Volume指标等其它辅助判断指标,丰富策略内在逻辑,提升信号准确性。

3. 利用机器学习方法训练和优化策略参数与信号生成规则,使之更全面适应市场变化。

4. 结合高级技术指标判断局部结构,区分中短线与中长线信号,使策略多时间框架运作。

## 总结

双线交叉反转策略综合运用两种指标形成双线交叉交易信号,可有效跟踪市场趋势,在控制风险的前提下获得较好收益,是一种可靠的趋势追踪策略。该策略可通过参数优化与辅助指标加入等方式得到持续改进与升级,具有广阔的应用前景。

||


## Overview

The Dual Moving Average Crossover Reversal strategy is a trend following strategy that combines the 123 Reversal strategy and the DiNapoli Detrended Oscillator strategy to generate trading signals through dual moving average crossover for tracking market trends.

## Strategy Logic  

The strategy consists of two parts:  

1. 123 Reversal Strategy: This strategy uses the Stochastic indicator to generate signals. It sends a buy signal when the close price rises after two consecutive days of decline, while the stochastic fast line is below the slow line and below 50; it sends a sell signal when the close price declines after two consecutive days of rise, while the stochastic fast line is above the slow line and above 50.

2. DiNapoli Detrended Oscillator Strategy: This strategy utilizes the price's moving average line to generate trading signals when price exceeds or falls below the moving average line by a certain value. Specifically, it sends a buy signal when price exceeds the positive trigger value of the moving average line, and a sell signal when price falls below the negative trigger value of the moving average line.

After each of the above two strategies generates separate trading signals, this strategy integrates them and only sends out actual trading orders when the two signals are consistent, i.e. when the dual moving averages form signals in the same direction; otherwise no action is taken.

## Advantage Analysis

By combining dual moving average trading signals, this strategy can effectively track market trends and has the following advantages:

1. Make full use of the Stochastic indicator's strengths in judging momentum and trends, avoiding losses caused by misleading signals from any single indicator. 

2. The DiNapoli indicator can effectively identify trends and avoid unnecessary opening of positions due to random fluctuations.

3. Dual moving average crossover can effectively reduce false signals and improve signal quality to provide strong evidence for judging market direction.

4. The adjustable parameters of the strategy allow users to choose parameter combinations based on personal preferences to adapt flexibly to different market environments.

## Risk Analysis

The strategy also has the following risks:

1. In a bull market, the strategy may miss buying opportunities due to excessively cautious indicator parameter settings. Parameters can be adjusted appropriately to make the strategy more aggressive.

2. In a bear market, dual moving average crossover signals may lag, resulting in overbought and oversold conditions. The moving average period should be shortened appropriately to make the strategy more sensitive.

3. In the event of a huge one-sided market movement, dual moving average crossover signals may be sluggish. Stops should be set to control losses.

## Optimization

The strategy can be optimized in the following ways:

1. Test and optimize the parameters of the Stochastic and DiNapoli indicators to find the optimal parameter combinations.

2. Add other auxiliary judgment indicators like the Volume indicator to enrich the internal logic of the strategy and improve the accuracy of signals.

3. Use machine learning methods to train and optimize strategy parameters and signal generation rules to make them fully adapted to market changes.  

4. Judge local structures with advanced technical indicators to distinguish between medium-term and long-term signals, enabling the strategy to operate in multiple time frames.

## Conclusion  

The Dual Moving Average Crossover Reversal strategy integrates two indicators to form dual moving average crossover trading signals, which can effectively track market trends and obtain relatively good returns while controlling risks. It is a reliable trend following strategy. The strategy can be continuously improved and upgraded through parameter optimization and adding auxiliary indicators. It has broad application prospects.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|14|LengthDiN|
|v_input_6|false|TriggerDiN|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-11-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/02/2020
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
// DiNapoli Detrended Oscillator Strategy
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

DiNapoli(Length, Trigger) =>
    pos = 0.0
    xSMA = sma(close, Length)
    nRes = close - xSMA
    pos := iff(nRes > Trigger, 1,
    	     iff(nRes <= Trigger, -1, nz(pos[1], 0)))    
    pos

strategy(title="Combo Backtest 123 Reversal & DiNapoli Detrended Oscillator", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
LengthDiN = input(14, minval=1)
TriggerDiN = input(0)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posDiN = DiNapoli(LengthDiN, TriggerDiN)
pos = iff(posReversal123 == 1 and posDiN == 1 , 1,
	   iff(posReversal123 == -1 and posDiN == -1, -1, 0)) 
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

https://www.fmz.com/strategy/433138

> Last Modified

2023-11-24 17:03:47
