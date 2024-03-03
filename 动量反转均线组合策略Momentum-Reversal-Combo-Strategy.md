
> Name

动量反转均线组合策略Momentum-Reversal-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c21d7a4492972c1c7d.png)
[trans]
## 概述

该策略通过结合123反转策略和CMO均线策略,形成买卖信号的组合。123反转策略通过股票连续两天收盘价形成新的高点或低点,结合随机指标判断市场买卖力度,产生交易信号。CMO均线策略则利用CMO指标判断价格动量,产生交易信号。两种策略信号结合,可形成更可靠的组合信号。

## 策略原理

123反转策略运用以下原理产生交易信号:

1. 当收盘价连续两天上涨,且9日随机指标低于50时,做多
2. 当收盘价连续两天下跌,且9日随机指标高于50时,做空

该策略通过判断价格在短期内是否形成新的高点或低点,结合随机指标的多空指标,产生交易信号。

CMO均线策略运用以下原理产生交易信号:

1. 计算5日、10日和20日的CMO值
2. 求出其平均值 
3. 当平均CMO高于70时,做多
4. 当平均CMO低于-70时,做空

该策略通过对不同周期CMO值的集合运算,判断价格动量指标的多空,产生交易信号。

组合策略对两个策略的信号进行AND运算,即两个策略的信号同时做多或同时做空时,该组合策略才产生实际的交易信号。

## 策略优势

该策略具有以下优势:

1. 组合信号更加可靠,可减少虚假信号
2. 123反转策略适合捕捉短期调整后的趋势
3. CMO均线策略判断大级别价格动量
4. 可适应不同市场环境

## 风险分析

该策略也存在以下风险:

1. 123反转策略对价格的形态依赖较高,可能出现失效
2. CMO指标对市场震荡敏感,可能产生错误信号
3. 组合策略的信号可能过于保守,漏失交易机会
4. 需要适当调整参数,使之适应不同周期和市场环境

对策有:

1. 优化反转策略的形态判断规则
2. 在CMO均线策略中加入其他辅助指标
3. 评估最近一段时间的策略效果,动态调整参数

## 优化方向 

该策略可从以下方面进行优化:

1. 使用机器学习算法自动优化组合权重
2. 增加自适应调参模块,使策略参数动态优化
3. 增加止损模块,有效控制风险
4. 评估策略健壮性,改进形态识别算法
5. 结合行业选择、基本面等因素

## 总结

该策略通过123反转和CMO均线两种互补性强的策略,形成有效的组合交易策略。在控制风险的前提下,可产生稳定的超额收益。随着算法和模型的不断优化,期待该策略的收益率和稳定性获得进一步提高。

||

## Overview

This strategy combines the 123 Reversal strategy and the CMO moving average strategy to generate combined trading signals. The 123 Reversal strategy generates trading signals by forming new highs or lows from the closing prices over two consecutive days combined with judgments on market momentum from the Stochastic Oscillator. The CMO moving average strategy utilizes the CMO indicator to determine price momentum and generate trading signals. The combination of signals from both strategies can form more reliable combo signals.

## Strategy Logic

The 123 Reversal strategy generates trading signals based on the following logic:

1. When the closing price rises for two consecutive days and the 9-day Stochastic Oscillator is below 50, go long.

2. When the closing price falls for two consecutive days and the 9-day Stochastic Oscillator is above 50, go short.

By judging whether prices have formed new highs or lows in the short term combined with the Stochastic Oscillator's indication on momentum, trading signals are generated.

The CMO moving average strategy generates trading signals based on the following logic: 

1. Calculate the CMO values over 5, 10 and 20 days.

2. Take the average.

3. When the average CMO goes above 70, go long.  

4. When the average CMO falls below -70, go short.

By conducting ensemble operations over CMO values of different timeframes, the strategy determines the direction of price momentum and generates trading signals.

The combo strategy performs an AND operation over the signals of the two strategies, meaning that actual trading signals are only triggered when both strategies give buy or sell signals simultaneously.  

## Advantages

The advantages of this strategy include:

1. Combined signals are more reliable with fewer false signals.

2. The 123 Reversal strategy captures trends after short-term corrections.

3. The CMO moving average strategy judges momentum over larger timeframes.  

4. Can adapt to different market environments.

## Risk Analysis 

The risks of this strategy include:

1. The 123 Reversal strategy relies heavily on price patterns and may fail occasionally.  

2. The CMO indicator is sensitive to market fluctuations, which may generate wrong signals.

3. The combo strategy's signals can be too conservative, missing trading opportunities.

4. Proper parameter tuning is needed to adapt to different cycles and market environments.

The counter measures are:

1. Optimize the pattern recognition rules of the reversal strategy.  

2. Add other auxiliary indicators into the CMO moving average strategy.  

3. Evaluate recent performance dynamically and adjust parameters accordingly.

## Optimization Directions

This strategy can be improved from the following aspects:

1. Use machine learning algorithms to automatically optimize the combo weights.

2. Add adaptive tuning modules to dynamically optimize parameters. 

3. Add stop loss modules to effectively control risks.

4. Evaluate the robustness of the strategy and improve pattern recognition algorithms.

5. Incorporate industry selection, fundamentals and other factors.


## Conclusion

This strategy forms an effective combo trading system from two highly complementary strategies - the 123 Reversal and the CMO moving average. With proper risk control, it can generate stable alpha returns. As the algorithms and models continue to be upgraded, the profitability and stability of this strategy is expected to be further improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|true|KSmoothing|
|v_input_3|3|DLength|
|v_input_4|50|Level|
|v_input_5|5|Length1|
|v_input_6|10|Length2|
|v_input_7|20|Length3|
|v_input_8|70|TopBand|
|v_input_9|-70|LowBand|
|v_input_10|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/09/2019
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
//    This indicator plots average of three different length CMO's. This indicator 
//    was developed by Tushar Chande. A scientist, an inventor, and a respected 
//    trading system developer, Mr. Chande developed the CMO to capture what he 
//    calls "pure momentum". For more definitive information on the CMO and other 
//    indicators we recommend the book The New Technical Trader by Tushar Chande 
//    and Stanley Kroll.
//    The CMO is closely related to, yet unique from, other momentum oriented 
//    indicators such as Relative Strength Index, Stochastic, Rate-of-Change, etc. 
//    It is most closely related to Welles Wilder?s RSI, yet it differs in several ways:
//    - It uses data for both up days and down days in the numerator, thereby directly 
//    measuring momentum;
//    - The calculations are applied on unsmoothed data. Therefore, short-term extreme 
//    movements in price are not hidden. Once calculated, smoothing can be applied to 
//    the CMO, if desired;
//    - The scale is bounded between +100 and -100, thereby allowing you to clearly see 
//    changes in net momentum using the 0 level. The bounded scale also allows you to 
//    conveniently compare values across different securities.
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

CMOav(Length1,Length2,Length3, TopBand, LowBand) =>
    pos = 0
    xMom = close - close[1]
    xMomabs = abs(close - close[1])
    nSum1 = sum(xMom, Length1)
    nSumAbs1 = sum(xMomabs, Length1)
    nSum2 = sum(xMom, Length2)
    nSumAbs2 = sum(xMomabs, Length2)
    nSum3 = sum(xMom, Length3)
    nSumAbs3 = sum(xMomabs, Length3)
    nRes = 100 * (nSum1 / nSumAbs1 + nSum2 / nSumAbs2 + nSum3 / nSumAbs3 ) / 3
    pos := iff(nRes > TopBand, 1,
    	     iff(nRes < LowBand, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & CMOav", shorttitle="Combo", overlay = true)
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
Length1 = input(5, minval=1)
Length2 = input(10, minval=1)
Length3 = input(20, minval=1)
TopBand = input(70, minval=1)
LowBand = input(-70, maxval=-1)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posCMOav = CMOav(Length1,Length2,Length3, TopBand, LowBand)
pos = iff(posReversal123 == 1 and posCMOav == 1 , 1,
	   iff(posReversal123 == -1 and posCMOav == -1, -1, 0)) 
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

https://www.fmz.com/strategy/438473

> Last Modified

2024-01-12 12:22:47
