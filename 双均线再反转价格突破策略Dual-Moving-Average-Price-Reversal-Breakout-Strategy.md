
> Name

双均线再反转价格突破策略Dual-Moving-Average-Price-Reversal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e45cc5ebc459304f60.png)

[trans]

## 概述

双均线再反转价格突破策略通过组合双重交易信号来寻找更高质量的入场时机。该策略首先利用9日移动平均线及其上下轨构建基本的突破框架,然后再利用123形态判断机会方向后引入随机指标过滤信号,最终形成比较严格的入场规则。这种组合过滤方法可以有效降低交易频率的同时保证信号质量,适合中长线持有。

## 策略原理

双均线再反转价格突破策略由两个子策略组合构成。

第一个子策略为123形态判断。该策略利用前两天的收盘价关系来判断未来价格可能的突破方向。如果今天的收盘价较前一日收盘价上涨,而前一日较前两日收盘价下跌,那么视为买入信号;如果今天收盘价较前一日下跌,而前一日较前两日收盘价上涨,那么视为卖出信号。该形态被认为反映了短期情绪由悲观转为乐观或者乐观转悲观的关键转折点。这里我们再利用随机指标对买卖信号进行二次验证,只有当随机指标也给出对应的超买超卖信号时,才最终生成真正的操作信号。

第二个子策略为移位平均线通道突破。该策略先计算指定周期(如9日)的指数移动平均线,然后在其上下各添加一定百分比作为通道上下轨。如果价格上穿上轨则产生卖出信号,如果价格下穿下轨则产生买入信号。这里上下轨线收缩放大的幅度可以用百分比因子控制,从而调整信号频率。

最终,只有当两个子策略的信号方向一致时,即123形态反转信号和通道突破信号同向,才会最终生成真实信号指导实际交易。这种双重过滤机制可以过滤掉大量假信号,降低交易频率的同时保证每次交易具有较高的可信度。

## 优势分析

双均线再反转价格突破策略综合运用多种分析方法,具有如下优势:

1. 双重信号过滤机制,可以有效减少无效信号,使每单交易更加高质量。

2. 123形态判断属于短期内反转策略,移位通道突破属于中长线趋势跟踪策略,组合使用可以实现短中长线配合,收益效应更好。 

3. 通过调整通道上下轨幅度可以自由控制信号频率,适合不同交易偏好。

4. 利用9日均线作为通道中轴线,参数选择更加合理,避免信号过于频繁。

5. 应用随机指标的超买超卖区域判断,可以避免在震荡行情中被套。

## 风险分析

双均线再反转价格突破策略也存在一些风险,主要集中在以下几个方面:

1. 双重过滤信号机制会错过一些单边策略能够捕捉到的机会,可能存在一定的漏单风险。

2. 123买卖点并不能完全过滤掉所有的假突破,如果运用不当可能导致亏损。

3. 如果行情出现剧烈变动,止损位置设置不当可能导致较大亏损。

4. ifft条件逻辑复杂,参数不当容易产生逻辑错误,导致信号判断失效。

5. 样本外数据会影响参数稳定性,需要对参数进行动态优化。

## 优化方向  

双均线再反转价格突破策略还存在可以优化的空间:

1. 可以测试不同均线类型,选择生成信号质量更优且稳定的参数组合。

2. 可以针对具体品种数据特点选择比较匹配的通道带宽度。

3. 可以结合동태止损来控制最大亏损比例。

4. 可以引入机器学习模型动态优化参数,使策略更具鲁棒性。

5. 可以加入交易量或波动率过滤,避免在震荡行情下造成过于频繁出入场。

## 总结

双均线再反转价格突破策略通过双重验证滤波机制,成功结合短期反转与中长线趋势追踪形成高效的交易体系,能够有效过滤无效信号,选择高质量机会入场,并且具有较强的可定制空间。该策略作为一个通用框架,在参数调整与机器学习优化下还具有很大的使用潜力。

||

## Overview

The Dual Moving Average Price Reversal Breakout strategy combines dual trading signals to identify higher quality entry opportunities. It first uses a 9-day moving average and its upper and lower rails to build a basic breakout framework, then introduces a stochastic indicator to filter signals after judging the direction of opportunity using 123 patterns, and finally forms a relatively strict entry rule. This kind of combination filtering method can effectively reduce the trading frequency while ensuring the signal quality, which is suitable for medium and long term holding.

## Principles  

The Dual Moving Average Price Reversal Breakout Strategy consists of two sub-strategies.

The first sub-strategy is the 123 pattern judgment. This strategy uses the closing price relationship over the previous two days to judge the likely direction of the future price breakout. If today's closing price rises compared to the previous day's closing price, while the previous day's closing price fell compared to the closing price two days ago, it is considered a buy signal; if today's closing price falls compared to the previous day's, while the previous day's closing price rose compared to the closing price two days ago, it is considered a sell signal. This pattern is believed to reflect the key turning point where short-term sentiment turns from pessimistic to optimistic or from optimistic to pessimistic. Here we re-verify the buy and sell signals using the stochastic indicator, and only generate the final operation signal when the stochastic indicator also gives a corresponding overbought or oversold signal.

The second sub-strategy is the displaced moving average channel breakout. This strategy first calculates the exponential moving average line of the specified cycle (such as 9 days), and then adds a certain percentage above and below it as the upper and lower rails of the channel. If the price breaks through the upper rail, a sell signal is generated. If the price breaks through the lower rail, a buy signal is generated. Here the width of expansion and contraction of the upper and lower rails can be controlled by the percentage factor to adjust the signal frequency.

Finally, only when the signal directions of the two sub-strategies are consistent, that is, the 123 reversal signal and the channel breakout signal are in the same direction, will a real signal be finally generated to guide actual trading. This dual filtering mechanism can filter out a lot of false signals, reduce trading frequency while ensuring high reliability of each trade.

## Advantage Analysis  

The Dual Moving Average Price Reversal Breakout Strategy combines multiple analytical methods and has the following advantages:

1. The dual signal filtering mechanism can effectively reduce invalid signals and make each trade higher quality.

2. The 123 pattern judgment belongs to a short-term reversal strategy, while the displaced channel breakout belongs to a medium and long term trend tracking strategy. Combining the two can achieve coordination between short, medium and long term, with better profit.

3. By adjusting the width of the upper and lower rails of the channel, the signal frequency can be freely controlled to suit different trading preferences.  

4. Using the 9-day moving average as the midline of the channel, the parameter selection is more reasonable to avoid excessively frequent signals.

5. By applying the overbought and oversold zones of the stochastic indicator, it avoids being trapped in a shock market.

## Risk Analysis

The Dual Moving Average Price Reversal Breakout Strategy also has some risks, mainly in the following aspects:

1. The dual filtering signal mechanism misses some opportunities that a single side strategy can capture, with some risk of missing orders.  

2. 123 buy and sell points cannot completely filter out all false breakouts. Improper use may lead to losses.

3. In the event of a violent market change, improper stop loss settings can lead to large losses.  

4. The logic of the ifft condition is complex. Improper parameters are prone to logic errors, resulting in invalid signal judgments.

5. Out-of-sample data affects parameter stability, requiring dynamic optimization of parameters.

## Optimization Directions   

There is still room for optimization in the Dual Moving Average Price Reversal Breakout Strategy:

1. Different types of moving averages can be tested to select parameter combinations with better and more stable signal quality.

2. Channels of appropriate width can be selected according to the characteristics of specific product data.  

3. Dynamic stop loss can be combined to control the maximum loss ratio.

4. Machine learning models can be introduced for dynamic parameter optimization to make the strategy more robust.  

5. Filters based on trading volume or volatility can be added to avoid excessively frequent entries and exits in turbulent market conditions.

## Conclusion  

Through the dual verification filtering mechanism, the Dual Moving Average Price Reversal Breakout Strategy successfully combines short-term reversal and medium-long term trend tracking to form an efficient trading system that can effectively filter out invalid signals and select high-quality opportunities to enter, and has relatively strong customizability. As a general framework, this strategy still has great potential for use under parameter adjustment and machine learning optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- MA Displaced Envelope ----|
|v_input_7_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|9|Period|
|v_input_9|0.5|Percent above|
|v_input_10|0.5|Percent below|
|v_input_11|13|Displacement|
|v_input_12|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-06 00:00:00
end: 2023-12-06 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 18/03/2021
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
// Moving Average Displaced Envelope. These envelopes are calculated 
// by multiplying percentage factors with their displaced expotential 
// moving average (EMA) core.
// How To Trade Using:
// Adjust the envelopes percentage factors to control the quantity and 
// quality of the signals. If a previous high goes above the envelope 
// a sell signal is generated. Conversely, if the previous low goes below 
// the envelope a buy signal is given.
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


MADE(Price,Period, perAb, perBl, disp) =>
    pos = 0.0
    sEMA = ema(Price, Period)
    top = sEMA[disp] * ((100 + perAb)/100)
    bott = sEMA[disp]* ((100 - perBl)/100)
    pos := iff(close < bott , 1,
    	     iff(close > top, -1, pos[1])) 
    pos

strategy(title="Combo Backtest 123 Reversal & MA Displaced Envelope", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- MA Displaced Envelope ----")
Price = input(title="Source", type=input.source, defval=close)
Period =input(defval=9, minval=1)
perAb = input(title = "Percent above", defval=.5, minval=0.01, step = 0.1)
perBl = input(title = "Percent below", defval=.5, minval=0.01, step = 0.1)
disp = input(title = "Displacement", defval=13, minval=1) 
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posMADE = MADE(Price,Period, perAb, perBl, disp)
pos = iff(posReversal123 == 1 and posMADE == 1 , 1,
	   iff(posReversal123 == -1 and posMADE == -1, -1, 0)) 
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

https://www.fmz.com/strategy/434611

> Last Modified

2023-12-07 18:15:12
