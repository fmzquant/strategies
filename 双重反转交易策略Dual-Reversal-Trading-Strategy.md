
> Name

双重反转交易策略Dual-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17f94b2113065fe22c3.png)

[trans]

## 概述

双重反转交易策略通过结合"123反转"和"N根K线连续下跌"两个子策略,实现在趋势反转时高效捕捉交易机会的效果。该策略较为适合中长线交易。

## 策略原理

### 123反转

"123反转"子策略的原理是:

当前两天的收盘价出现反向(即如果前一日收盘价高于前两日,则当前收盘价低于前一日),且9日股票K线的快速随机指标低于50时做多;当前两天的收盘价出现反向(即如果前一日收盘价低于前两日,则当前收盘价高于前一日),且9日股票K线的快速随机指标高于50时做空。

该子策略通过判断前两日收盘价的反转,结合随机指标判定趋势反转时机,来实现高效捕捉趋势反转的效果。

### N根K线连续下跌

"N根K线连续下跌"子策略的原理是:

统计最近N根K线收盘价是否连续下跌,如果下跌达到N根,则产生做空信号。

该子策略通过判断一定数量K线的连续下跌,来判定趋势反转的时机。

### 双重组合信号

双重反转交易策略则是将上述两个子策略进行组合,当两者同时产生做多或做空信号时,才会实际下单。

这样可以过滤掉一些误报信号,使得交易信号更加可靠。同时结合反转信号和连续下跌信号,可以更准确判断趋势反转的时机。

## 策略优势分析

双重反转交易策略具有以下优势:

1. 通过组合多个子策略,可以有效过滤假信号,提高信号的可靠性。

2. 123反转策略可以准确判断短期内的趋势反转点。N根K线连续下跌可以判断中长期趋势反转。二者配合使用,可以在中长线层面捕捉短期的交易机会。

3. 采用股票K线指标,参数调整灵活,适合不同品种。

4. 策略思路简单清晰,容易理解与跟踪,适合初学者学习。

5. 可自定义子策略的参数,可以针对不同品种进行优化,提高策略适应性。

## 策略风险分析

双重反转交易策略也存在一些风险:

1. 反转信号可能出现误报,组合信号虽可降低误报风险,但无法完全规避。建议与止损策略配合使用。

2. 子策略采用简单指标,对复杂行情可能无法适应。可以考虑引入更多技术指标或机器学习提升策略适应性。 

3. 子策略参数需要针对不同品种进行优化,否则可能出现过拟合问题。

4. 反转类策略更适合中长线,短期内有被套利风险。应适当调整持仓期限。

5. 反转信号可能出现在趋势中的小范围调整阶段,应结合趋势判断确保策略方向与大趋势一致。

## 策略优化方向

该双重反转交易策略可以从以下方面进行优化:

1. 引入更多技术指标判断,形成多因子模型,提升策略对复杂行情的适应能力。例如引入移动平均线、布林带等指标进行组合。

2. 增加机器学习模型判断,利用机器学习对多维特征进行建模,提升信号的准确性。例如引入随机森林或者神经网络对K线进行判断。

3. 优化参数设置,针对不同品种进行参数训练,提高参数的适应性。例如采用遗传算法对参数组合进行优化。

4. 结合止损策略,以控制单笔止损加强策略的风险控制。止损位置也可以进行数据驱动的优化。

5. 开发动态仓位管理机制,根据行情与子策略结果动态调整仓位大小,降低风险。

6. 引入趋势判断模块,避免子策略产生的信号与大趋势不一致。例如引入均线判断趋势。

## 总结

双重反转交易策略通过组合123反转和N根K线连续下跌两个子策略,实现了对趋势反转时机的高效捕捉。该策略较为适合中长线持仓,可以有效过滤误报信号,在趋势反转时提供较为可靠的交易机会。但该策略也存在一定局限,需要引入更多技术指标进行优化,并配合止损与仓位管理机制来降低风险,从而适应更加复杂的市场环境。总体来说,双重反转交易策略提供了一种简单直接的趋势反转策略思路,是初学者了解和学习策略交易的好素材。随着更多优化手段的引入,该策略可以成为一个非常实用的量化交易策略。

|| 

## Overview

The dual reversal trading strategy combines the "123 reversal" and "N consecutive bars down" sub-strategies to efficiently capture trading opportunities when trend reversal occurs. This strategy is more suitable for medium and long term trading.

## Strategy Logic

### 123 Reversal 

The "123 reversal" sub-strategy is based on the principle:

Go long when the closing price of the previous two days shows a reverse (i.e. if previous close is higher than the close before previous day, current close is lower than previous close), and the 9-day fast stochastic is lower than 50; 

Go short when the closing price of the previous two days shows a reverse (i.e. if previous close is lower than the close before previous day, current close is higher than previous close), and the 9-day fast stochastic is higher than 50.

This sub-strategy identifies trend reversal by judging the reverse of previous two closing prices combined with stochastic indicator.

### N Consecutive Bars Down

The "N consecutive bars down" sub-strategy is based on the principle: 

Count the recent N bars and see if the closing prices show consecutive downward movement. If yes, a short signal is generated.

This sub-strategy identifies trend reversal by consecutive downward price movement.

### Combination of Signals 

The dual reversal trading strategy combines the two sub-strategies by only taking actual positions when both long or short signals are triggered at the same time.

This helps filter out some false signals and makes the trading signals more reliable. The combination of reversal and consecutive down signals can also more accurately identify trend reversal timing.

## Advantage Analysis

The dual reversal trading strategy has the following advantages:

1. Combining multiple sub-strategies helps filter out false signals effectively and improves reliability of signals.

2. The 123 reversal strategy can accurately identify short term trend reversal points. The N bar consecutive down strategy looks at medium-long term reversal. The two complement each other and capture short term opportunities at medium-long term levels.

3. Using technical indicators from stock charts makes the strategy flexible to adjust parameters for different products. 

4. The strategy logic is simple and easy to understand and track, suitable for beginners to learn.

5. Customizable parameters of sub-strategies allow optimization for different products, improving adaptability.

## Risk Analysis

There are also some risks associated with the dual reversal trading strategy:

1. Reversal signals may give false signals sometimes. Although the combined signals reduce false signals, the risk cannot be completely eliminated. It's recommended to use stops.

2. The sub-strategies use simple indicators and may not adapt well to complex market situations. More technical indicators or machine learning could be introduced to improve adaptability.

3. Sub-strategy parameters need optimization for different products, otherwise overfitting problems may occur.

4. Reversal strategies fit better for medium-long term. There are risks of being stopped out in the short term. Proper position holding period should be adjusted.

5. Reversal signals may come during range-bound corrections in a trend. Overall trend should be confirmed to ensure consistency with the major trend.

## Optimization Directions

The dual reversal trading strategy can be optimized in the following aspects:

1. Introduce more technical indicators, build a multi-factor model to improve adaptability to complex market situations. For example, combining with moving average, Bollinger bands etc.

2. Add machine learning models to take advantage of multi-dimensional features and improve signal accuracy. For example, introduce random forest or neural networks.

3. Optimize parameters for different products through training to improve adaptability. Genetic algorithm can be used to search for optimal parameter combinations.

4. Incorporate stop loss strategies to control single trade risks. Stop loss levels can also be data-driven optimized.

5. Develop dynamic position sizing mechanisms based on market conditions and sub-strategy signals to lower risks.

6. Introduce trend filtering modules to avoid signal contradictions with the overall trend. Simple moving averages can be used to determine trends.

## Conclusion

The dual reversal trading strategy efficiently captures trend reversals by combining the 123 reversal and N consecutive bars down sub-strategies. It fits better for medium-long term holdings and can filter out false signals to provide reliable trading opportunities during trend reversals. But there are also some limitations that need addressing through introducing more technical indicators and optimization, together with stop loss and position sizing to lower risks, in order to adapt to more complex market environments. Overall, it provides a simple and straightforward approach for trend reversal trading and serves as good learning materials for beginners to understand and learn about quantitative trading strategies. With more optimization techniques, it can become a very practical quantitative trading strategy.

[/trans]


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- N Bars Down ----|
|v_input_7|4|nLength|
|v_input_8|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-24 00:00:00
end: 2023-10-28 03:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 24/03/2021
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
// Evaluates for n number of consecutive lower closes. Returns a value 
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


NBD(nLength) =>
    pos = 0.0
    nCounter = 0
    nCounter :=  iff(close[1] <= open[1], nz(nCounter[1],0)+1,
                   iff(close[1] > open[1], 0, nCounter))
    C2 = iff(nCounter >= nLength, 1, 0)
    posprice = 0.0
    posprice := iff(C2== 1, close, nz(posprice[1], 0)) 
    pos := iff(posprice > 0, -1, 0)
    pos

strategy(title="Combo Backtest 123 Reversal & N Bars Down", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- N Bars Down ----")
nLength = input(4, minval=1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posNBD = NBD(nLength)
pos = iff(posReversal123 == 1 and posNBD == 1 , 1,
	   iff(posReversal123 == -1 and posNBD == -1, -1, 0)) 
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

https://www.fmz.com/strategy/430768

> Last Modified

2023-11-01 16:49:36
