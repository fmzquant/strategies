
> Name

逆转与线性回归截距组合策略Reversal-and-Linear-Regression-Intercept-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略通过结合123逆转策略和线性回归截距策略,实现多因子驱动的组合交易策略。123逆转策略判断最近两个交易日的价格关系,结合Stoch指标判断逆转信号。线性回归截距策略则利用线性回归分析判断价格与趋势线的关系,产生交易信号。两种策略相互验证,可有效过滤假信号。

## 策略原理

### 123逆转策略

该策略基于以下原理:

1. 如果最近两个交易日的收盘价关系为今日收盘价高于昨日,且Stoch快线低于慢线,认为存在看涨反转信号

2. 如果最近两个交易日的收盘价关系为今日收盘价低于昨日,且Stoch快线高于慢线,认为存在看跌反转信号

判断规则如下:

- 如果今日收盘价>昨日收盘价 且 Stoch快线<Stoch慢线 且 Stoch快线>设置参数,生成买入信号

- 如果今日收盘价<昨日收盘价 且 Stoch快线>Stoch慢线 且 Stoch快线<设置参数,生成卖出信号

该策略需要设置Stoch指标参数,包括:计算Stoch的K线周期Length、Stoch快线平滑周期KSmoothing、Stoch慢线平滑周期DLength、Stoch快线判断阈值Level。

### 线性回归截距策略

该策略基于线性回归分析,判断价格与线性回归趋势线的关系,其判断规则如下:

- 如果收盘价大于线性回归截距,产生买入信号

- 如果收盘价小于线性回归截距,产生卖出信号

该策略需要设置线性回归周期LengthLRI,以及线性回归输入数据源xSeria。

### 组合策略

该组合策略需要同时满足123逆转策略和线性回归截距策略的买入/卖出信号,才会生成实际的交易指令,从而有效滤除假信号,提高交易效果。

## 优势分析

该策略具有以下优势:

1. 多因子驱动,有效滤除假信号,提高信号质量

结合两种不同类型的策略,必须两种策略同时产生信号,才会实际下单。这种多因子验证机制,可以过滤掉某一策略偶尔产生的错误信号,减少不必要的交易,有效提升信号质量。

2. 实时监测价格与趋势的关系,避免被套牢

线性回归截距能够实时反映价格与趋势线的关系,如果价格已经严重偏离趋势,及时提示策略调整仓位方向。这样可以及时止损、避免被套牢在历史趋势中。

3. 兼顾趋势和反转交易机会

线性回归策略更擅长趋势买卖点识别。而123逆转策略则专注反转点识别。两种策略可以很好结合趋势交易和反转交易的优势。

4. 策略参数可自定义优化组合

两种策略都提供一定参数进行自定义,可以针对不同品种、不同趋势进行参数优化,优化组合策略的效果。

## 风险分析

该策略也存在以下风险:

1. 多因子驱动可能错过部分机会

必须满足两种策略的交易信号,会错过仅依靠单一策略就可以获利的部分机会。如果某一策略效果弱化,会拖累整体交易效果。

2. 线性回归有滞后性

线性回归需要一定历史数据进行计算,不能对突发事件做出实时反应,存在一定滞后性。如果价格发生大幅跳空,线性回归趋势线需要一定时间调整,这段时间可能会产生错误信号。

3. 需要合理参数优化

两种策略都需要选择合适的参数,对某些品种可能需要独立调整参数。如果参数选择不当,会大打折扣对策略效果。

对应风险可以通过以下方法降低:

1. 适当放宽组合信号触发条件,防止错失过多机会

2. 结合趋势指标等替代线性回归,获取更实时的趋势判断

3. 借助机器学习等方法辅助参数优化,提升参数选择效果

## 优化方向 

该策略可以从以下方面进一步优化:

1. 利用机器学习方法进行参数优化

可以收集历史数据,设计参数优化目标,使用机器学习算法比如遗传算法、贝叶斯优化等搜索最佳参数组合。

2. 增加止损机制

可以结合ATR、趋势指标等设定止损规则,以控制单笔交易最大损失。

3. 优化入市出市逻辑

可以在交易信号基础上加入例如均线过滤、布林带判断等入市出市的辅助条件,降低调整仓位的频率,避免被套。

4. 结合 sentiments analysis

利用自然语言处理技术判断市场参与者情绪,辅助交易决策。

5. 添加机器学习预测模块

使用LSTM、GRU等深度学习模型对价格进行预测,作为策略决策的重要参考依据。

## 总结

本策略通过组合123逆转策略和线性回归截距策略,实现多因子驱动的量化交易,验证机制可以有效过滤假信号,兼顾捕捉反转和趋势交易机会。但策略也存在一定滞后性风险,需要关注参数优化并进行风控机制扩展,进一步提升策略稳定性。结合机器学习等技术进行参数优化和特征扩展,是该策略值得探索的进一步优化方向。

||

## Overview

This strategy combines the 123 reversal strategy and linear regression intercept strategy to implement a multi-factor driven combo trading strategy. The 123 reversal strategy judges the price relationship between the last two trading days and combines the Stoch indicator to determine the reversal signal. The linear regression intercept strategy uses linear regression analysis to judge the relationship between price and trend line and generate trading signals. The two strategies verify each other and can effectively filter false signals.

## Strategy Principle

### 123 Reversal Strategy

The strategy is based on the following principles:

1. If the closing price relationship between the last two trading days is today's closing price higher than yesterday's, and the Stoch fast line is lower than the slow line, it is considered that there is a bullish reversal signal

2. If the closing price relationship between the last two trading days is today's closing price lower than yesterday's, and the Stoch fast line is higher than the slow line, it is considered that there is a bearish reversal signal

The judgment rules are as follows:

- If today's closing price > yesterday's closing price and Stoch fast line < Stoch slow line and Stoch fast line > set parameter, generate buy signal

- If today's closing price < yesterday's closing price and Stoch fast line > Stoch slow line and Stoch fast line < set parameter, generate sell signal

The strategy needs to set Stoch indicator parameters, including: K line cycle Length for Stoch calculation, smoothing cycle KSmoothing for Stoch fast line, smoothing cycle DLength for Stoch slow line, threshold Level for Stoch fast line judgment.

### Linear Regression Intercept Strategy

The strategy is based on linear regression analysis to judge the relationship between price and linear regression trend line. The judgment rules are as follows:

- If the closing price is greater than the linear regression intercept, a buy signal is generated

- If the closing price is less than the linear regression intercept, a sell signal is generated

The strategy needs to set the linear regression cycle LengthLRI and the linear regression input data source xSeria.

### Combo Strategy

The combo strategy requires simultaneous buy/sell signals from both the 123 reversal strategy and the linear regression intercept strategy to generate actual trading orders, which effectively filters out false signals and improves trading performance.

## Advantage Analysis

The strategy has the following advantages:

1. Multi-factor driven, effectively filter out false signals and improve signal quality

The combination of two different types of strategies requires signals from both strategies to actually place orders. This multi-factor verification mechanism can filter out occasional wrong signals from a strategy, reduce unnecessary trading, and effectively improve signal quality.

2. Real-time monitoring of price and trend relationships avoids being trapped

The linear regression intercept can reflect the relationship between price and trend line in real time. If the price deviates significantly from the trend, it will promptly prompt the strategy to adjust the position direction. This allows timely stop losses and avoids being trapped in historical trends.

3. Take into account trading opportunities for both trends and reversals

The linear regression strategy is better at identifying trend buy and sell points. While the 123 reversal strategy focuses on identifying reversal points. The two strategies can combine the advantages of trend trading and reversal trading.

4. Customizable parameter optimization of strategies

Both strategies provide certain parameters for customization, which can be optimized for different varieties and different trends to optimize the effect of the combined strategy.

## Risk Analysis

The strategy also has the following risks:

1. Multi-factor drivers may miss some opportunities

The need to meet the trading signals of both strategies will miss some opportunities that can be profitable relying solely on a single strategy. If one strategy weakens, it will drag down the overall trading performance.

2. Linear regression has lag

Linear regression requires some historical data for calculation and cannot respond in real time to sudden events, resulting in some lag. If there is a large price gap, the linear regression trend line will take some time to adjust, which may generate wrong signals during this period.

3. Reasonable parameter optimization is needed

Both strategies require appropriate parameter selection, which may need to be adjusted independently for some varieties. Improper parameter selection will greatly reduce the effectiveness of the strategy.

The risks can be reduced through the following methods:

1. Appropriately relax the combo signal triggering conditions to prevent missing too many opportunities

2. Combine trend indicators to replace linear regression to obtain more real-time trend judgments

3. Use machine learning methods to assist parameter optimization and improve parameter selection

## Optimization Directions

The strategy can be further optimized in the following ways:

1. Use machine learning methods for parameter optimization

Collect historical data, design parameter optimization goals, and use machine learning algorithms such as genetic algorithms and Bayesian optimization to search for the best parameter combinations.

2. Add stop-loss mechanism

Stop-loss rules can be set based on ATR, trend indicators, etc. to control maximum loss per trade.

3. Optimize entry and exit logic

Auxiliary conditions such as moving average filters and Bollinger Bands can be added on the basis of trading signals to reduce the frequency of position adjustments and avoid being trapped.

4. Combine sentiments analysis

Use natural language processing techniques to determine market participant sentiment and assist in trading decisions.

5. Add machine learning prediction module

Use deep learning models like LSTM and GRU to predict prices as an important reference for strategy decisions.

## Summary

This strategy combines the 123 reversal strategy and linear regression intercept strategy to implement multi-factor driven quantitative trading. The verification mechanism can effectively filter out false signals and capture reversal and trend trading opportunities. But there are also certain lag risks in the strategy that require attention to parameter optimization and expansion of risk control mechanisms to further improve strategy stability. Combining machine learning and other technologies for parameter optimization and feature expansion is a worthwhile further optimization direction for the strategy to explore.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|---- 123 Reversal ----|
|v_input_2|14|Length|
|v_input_3|true|KSmoothing|
|v_input_4|3|DLength|
|v_input_5|50|Level|
|v_input_6|true|---- Line Regression Intercept ----|
|v_input_7|14|LengthLRI|
|v_input_8_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-18 00:00:00
end: 2023-09-19 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 25/01/2021
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
// Linear Regression Intercept is one of the indicators calculated by using the 
// Linear Regression technique. Linear regression indicates the value of the Y 
// (generally the price) when the value of X (the time series) is 0. Linear 
// Regression Intercept is used along with the Linear Regression Slope to create 
// the Linear Regression Line. The Linear Regression Intercept along with the Slope 
// creates the Regression line.
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

LRI(Length,xSeria) =>
    pos = 0.0
    xX = Length * (Length - 1) * 0.5
    xDivisor = xX * xX - Length * Length * (Length - 1) * (2 * Length - 1) / 6
    xXY = 0.0
    for i = 0 to Length-1
    	xXY := xXY + (i * xSeria[i])
    xSlope = (Length * xXY - xX * sum(xSeria, Length)) / xDivisor
    xLRI = (sum(xSeria, Length) - xSlope * xX) / Length
    pos:= iff(close > xLRI, 1,
           iff(close < xLRI, -1, nz(pos[1], 0))) 
    pos

strategy(title="Combo Backtest 123 Reversal & Line Regression Intercept", shorttitle="Combo", overlay = true)
line1 = input(true, "---- 123 Reversal ----")
Length = input(14, minval=1)
KSmoothing = input(1, minval=1)
DLength = input(3, minval=1)
Level = input(50, minval=1)
//-------------------------
line2 = input(true, "---- Line Regression Intercept ----")
LengthLRI = input(14, minval=1)
xSeria = input(title="Source", type=input.source, defval=close)
reverse = input(false, title="Trade reverse")
posReversal123 = Reversal123(Length, KSmoothing, DLength, Level)
posLRI = LRI(LengthLRI,xSeria)
pos = iff(posReversal123 == 1 and posLRI == 1 , 1,
	   iff(posReversal123 == -1 and posLRI == -1, -1, 0)) 
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

https://www.fmz.com/strategy/427884

> Last Modified

2023-09-26 15:56:48
