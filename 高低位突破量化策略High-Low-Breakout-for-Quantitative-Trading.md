
> Name

高低位突破量化策略High-Low-Breakout-for-Quantitative-Trading

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/195f8a278bf14e17775.png)

[trans]

## 概述

聚变策略是一个结合123形态反转策略与高低位突破策略的量化交易策略。该策略通过不同时间周期上指标信号的综合判断,实现多时间周期资金优势组合,在中长线获取超额收益的目标。

## 策略原理

聚变策略由两部分组成:

1. 123反转策略  
该策略来自于Ulf Jensen的《我如何在期货市场上获得三倍收益》一书中P183的思想。它通过判断价格连续2日收盘价与前一日收盘价的关系,结合Stochastic指标判断市场的超买超卖情况,产生买入和卖出信号。具体来说,当连续2日收盘价较前一日收盘价上涨,且Stochastic Slow指标低于50时产生买入信号;当连续2日收盘价较前一日收盘价下跌,且Stochastic Fast指标高于50时产生卖出信号。该策略借助Stochastic指标判断市场超买超卖状况,避免在市场高位买入和低位卖出。

2. 高低位突破策略  
该策略通过判断价格是否突破不同周期的高低位来确定交易信号。它计算当前周期及过去周期的最高价和最低价,当价格突破最高价时产生买入信号,突破最低价时产生卖出信号。该策略的优势在于能够识别出不同周期线形态特征,在趋势形成时较早进入市场。

聚变策略将上述两种策略进行组合,当两种策略的信号方向一致时,产生实际的交易信号。这样可以过滤掉一些因单一策略判断错误产生的无效信号,提高信号的可靠性。

## 策略优势

1. 多时间周期综合判断,提高信号准确性  
该策略融合了日线和更高时间周期的形态特征,能够提高交易信号判断的准确性,避免被市场短期波动误导。

2. 充分利用Stochastic指标的超买超卖判断  
StochasticSlow指标的应用避免了在超买区急于买入,StochasticFast指标的应用避免了在超卖区急于卖出,减少不必要的亏损。

3. 及时捕捉趋势特征,降低错过机会的概率  
高低位突破策略能够识别更长线周期内价格突破关键区域,较早进入趋势,降低错过机会的概率。

4. 多策略组合,可以灵活优化  
策略由多个子策略组成,优化空间大,可以通过调整子策略参数或引入新的子策略进行优化,使策略更稳定可靠。

5. 策略逻辑清晰易理解  
策略结构简单清晰,容易理解和修改,也便于后期维护。

## 策略风险

1. 多时间周期综合增加信号滞后  
虽然多时间周期综合判断可以提高信号准确性,但是也会一定程度增加信号的滞后,可能错过短线交易机会。

2. 123形态无法识别更长线趋势反转  
123反转策略仅根据近几日行情判断,无法识别更长时间周期内的关键趋势反转点。

3. 周期参数设置不当可能导致虚假信号  
Stochastic指标和高低位突破 周期参数设置不当都可能导致产生过多虚假交易信号。

4. 仅基于技术指标,对特殊行情的适应性较差  
该策略仅基于技术指标,不考虑基本面信息,在重大黑天鹅事件发生时适应性较差。

对应风险的解决方法:

1. 适当缩短计算周期,降低信号滞后。

2. 尝试引入更长周期指标或形态作为滤波器。 

3. 优化参数设置,在回测中测试参数稳健性。

4. 考虑结合基本面因素过滤信号。

## 策略优化方向 

1. 测试并优化各个子策略的参数,使之更稳健。

2. 增加其他辅助决策逻辑,如基本面、资金流向等指标进行组合。

3. 引入止损策略,以控制单笔交易最大损失。

4. 针对特定品种进行参数细化,提高策略对该品种的适配性。

5. 增加机器学习模型辅助决策。

## 总结

综上所述,聚变策略整合多时间尺度的技术指标优势,旨在提高信号判断的准确性和时间liness。相比单一技术指标策略,它具有更敏锐的趋势判断能力和更稳健的信号产生。但该策略也存在一定的滞后性,以及对特殊行情的适应性较弱等问题。未来可通过引入更多辅助工具,优化参数设定,提升策略的稳定性和收益率。

||
## Overview

The Fusion strategy combines a 123 reversal pattern strategy and a high low breakout strategy into a quantitative trading system. By synthesizing indicator signals across different timeframes, it aims to achieve multi-timeframe capital advantage and generate excess returns in the medium to long term.

## Strategy Logic

The Fusion strategy consists of two components:

1. 123 Reversal Strategy
This strategy originates from the idea on p183 of the book "How I Tripled My Money in the Futures Market" by Ulf Jensen. It generates trading signals by examining the relationship between the closing prices of the past two days and the previous day, together with the Stochastic indicator to gauge overbought and oversold market conditions. Specifically, a buy signal is generated when the closing prices of two consecutive days are higher than the previous day, and the Stochastic Slow indicator is below 50. A sell signal is generated when the closing prices of two consecutive days are lower than the previous day, and the Stochastic Fast indicator is above 50. By incorporating the Stochastic indicator, this strategy avoids buying at market tops and selling at bottoms.

2. High Low Breakout Strategy 
This strategy identifies trading signals by detecting price breakouts beyond previous high/low levels over different time periods. It calculates the highest high and lowest low over the current and previous periods and generates buy signals when price breaks above the high, and sell signals when price breaks below the low. The advantage of this strategy is its ability to identify trend pattern changes in higher timeframes, allowing earlier entry.

The Fusion strategy combines the signals from the above two strategies, and generates actual trading signals only when the signal directions align. This filters out some false signals caused by errors in a single strategy and improves signal reliability.

## Advantages of the Strategy

1. Multi-timeframe synthesis improves signal accuracy
The integration of daily and higher timeframe patterns enhances accuracy of trading signal generation, avoiding distraction from short-term market noises.

2. Fully utilizes the overbought/oversold judgement of Stochastic 
The use of Stochastic Slow indicator prevents eager buying at overbought zones. The Stochastic Fast indicator prevents eager selling at oversold zones. Unnecessary losses are reduced.

3. Timely catches trend patterns, lowering missing out opportunities
The high low breakout strategy identifies trend initiation in higher timeframes earlier, reducing missed trading opportunities.

4. Flexible optimization with multiple sub-strategies
With multiple sub-strategies, huge optimization space allows parameter tuning of sub-strategies or introducing new ones to make the strategy more stable and reliable.

5. Simple and clear logic
The straightforward structure and logic make the strategy easy to understand, modify and maintain in the future.

## Risks of the Strategy

1. Multi-timeframe synthesis causes signal lag
Although accuracy is improved, combining signals across timeframes induces a lag and may miss short-term trading chances.

2. 123 patterns cannot identify longer timeframe trend reversals
The 123 reversal strategy only looks at recent days and misses key reversal points in longer timeframes. 

3. Wrong parameter settings may cause false signals
Bad parameter tuning of the Stochastic and breakout periods could result in excessive false signals.

4. Purely technical, weak adaptivity to extreme events
Without considering fundamentals, the strategy adapts poorly to black swan events.

Corresponding solutions:

1. Shorten calculation periods properly to reduce lag.

2. Try introducing longer-term indicators or patterns as filters.

3. Optimize parameters and test robustness thoroughly in backtests. 

4. Consider incorporating fundamental factors for signal filtering.

## Directions for Optimization

1. Test and optimize parameters of sub-strategies for robustness.

2. Incorporate additional signals like fundamentals, money flow etc. 

3. Introduce stop loss to limit max loss per trade.

4. Fine tune parameters for specific products to improve adaptiveness.

5. Assist with machine learning models.

## Conclusion

In summary, the Fusion strategy combines the advantages of multi-timeframe technical indicators, aiming for more accurate and timely signal generation. Compared to single indicator strategies, it has superior trend sensing ability and more robust signal production. But it also suffers from lags and inadequate adaptivity to extreme events. Future improvements could come from more auxiliary tools, better parameter optimization and upgrading stability and profitability.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|D|Resolution|
|v_input_6|true|LookBack|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-10 00:00:00
end: 2023-11-09 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/11/2020
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
// This script shows a high and low period value.
//    Width - width of lines
//    SelectPeriod - Day or Week or Month and etc.
//    LookBack - Shift levels 0 - current period, 1 - previous and etc. 
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

    
HLL(LookBack, SelectPeriod) =>
    pos = 0.0
    xHigh  = security(syminfo.tickerid, SelectPeriod, high[LookBack])
    xLow   = security(syminfo.tickerid, SelectPeriod, low[LookBack])
    vS1 = xHigh
    vR1 = xLow
    pos := iff(close > vR1, 1,
             iff(close < vS1, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & High and Low Levels", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
SelectPeriod = input(title="Resolution", type=input.resolution, defval="D")
LookBack = input(1,  minval=0)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posHLL = HLL(LookBack, SelectPeriod)
pos = iff(posReversal123 == 1 and posHLL == 1 , 1,
	   iff(posReversal123 == -1 and posHLL == -1, -1, 0)) 
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

https://www.fmz.com/strategy/431662

> Last Modified

2023-11-10 11:09:28
