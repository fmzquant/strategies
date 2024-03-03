
> Name

基于线性回归拦截点的量化策略Quant-Strategy-Based-on-Linear-Regression-Intercept

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d6bd472598eb401ff1.png)
[trans]

## 概述

本策略采用线性回归技术计算出线性回归拦截点,并以其作为买卖信号来构建量化交易策略。该策略通过分析股票价格时间序列,拟合一条线性回归趋势线,使用线性回归拦截点判断价格是否被高估或低估,以此产生交易信号。

## 策略原理

线性回归拦截点表示当时间系列X值为0时,Y值(通常是价格)的预测值。该策略预先设置参数Length,以收盘价为源序列,计算出最近Length天的线性回归拦截点(xLRI)。当收盘价高于xLRI时,做多;当收盘价低于xLRI时,做空。

具体计算公式如下:
```
xX = Length *(Length - 1)* 0.5  
xDivisor = xX *xX - Length* Length *(Length - 1) *(2 * Length - 1) / 6
xXY = Σ(i *收盘价[i]),i从0到Length-1  
xSlope = (Length *xXY - xX* Σ(收盘价, Length))/ xDivisor
xLRI = (Σ(收盘价, Length) - xSlope * xX) / Length
```
通过这样的计算,可以得到最近Length天的线性回归拦截点xLRI。策略以其判断价格的高低,产生交易信号。

## 策略优势

本策略具有以下优势:

1. 采用线性回归技术,对价格具有一定的预测能力和趋势判断能力。
2. 参数较少,模型简单,容易理解和实现。
3. 可自定义参数Length adaptive 调整策略灵活性。

## 风险及解决方法

本策略也存在一些风险:  

1. 线性回归拟合仅仅是基于历史数据进行的统计拟合,对未来价格走势的预测能力有限。
2. 如果公司基本面发生较大变化,线性回归拟合的结果可能会失效。
3. 参数Length设置不当可能导致过拟合。

对策:

1. 适当缩短参数Length,防止过拟合。
2. 关注公司基本面变化,必要时人工干预关闭仓位。
3. 采用自适应参数Length,根据市场情况动态调整。

## 策略优化方向 

本策略还可从以下方面进行优化:

1. 增加止损机制,以控制单笔损失。
2. 结合其它指标,形成组合策略,提高稳定性。
3. 增加参数自适应优化模块,让Length参数动态变化。
4. 增加仓位控制模块,防止超量交易。

## 总结

本策略基于线性回归拦截点构建了一个简单的量化交易策略。总体来说,该策略具有一定的经济价值,但也存在一些风险需要注意。通过不断优化,有望进一步提高策略的稳定性和收益性。

||

## Overview

This strategy uses linear regression techniques to calculate the linear regression intercept and uses it as a trading signal to construct a quantitative trading strategy. By analyzing the price time series of stocks, this strategy fits a linear regression trend line and uses the linear regression intercept to judge whether prices are overestimated or underestimated, thereby generating trading signals.

## Strategy Principle  

The linear regression intercept indicates the predicted value of Y (usually the price) when the time series value X is 0. This strategy presets the parameter Length, takes the closing price as the source sequence, and calculates the linear regression intercept (xLRI) of the most recent Length days. When the closing price is higher than xLRI, go long; when the closing price is lower than xLRI, go short.

The specific calculation formula is as follows:
```
xX = Length *(Length - 1)* 0.5
xDivisor = xX *xX - Length* Length *(Length - 1) *(2 * Length - 1) / 6  
xXY = Σ(i *Closing Price[i]), i from 0 to Length-1
xSlope = (Length *xXY - xX* Σ(Closing Price, Length))/ xDivisor 
xLRI = (Σ(Closing Price, Length) - xSlope * xX) / Length
```
Through such calculations, the linear regression intercept xLRI for the most recent Length days can be obtained. The strategy judges the price highs and lows based on it to generate trading signals.

## Advantages

This strategy has the following advantages:

1. Using linear regression techniques, it has certain predictive and trend judgment capabilities for prices.
2. Fewer parameters, simpler model, easy to understand and implement.  
3. Customizable parameter Length to adjust strategy flexibility.

## Risks and Solutions

This strategy also has some risks:

1. Linear regression fitting is merely a statistical fitting based on historical data, with limited ability to predict future price trends.  
2. If the company's fundamentals undergo major changes, the results of linear regression fitting may become invalid.
3. Improper setting of the parameter Length may lead to overfitting.

Countermeasures:  

1. Appropriately shorten the parameter Length to prevent overfitting.
2. Pay attention to changes in the company's fundamentals and intervene manually to close positions when necessary.
3. Adopt adaptive parameter Length to dynamically adjust according to market conditions.

## Optimization Directions

This strategy can also be optimized in the following aspects:  

1. Add a stop loss mechanism to control single loss.
2. Combine with other indicators to form a combination strategy to improve stability. 
3. Add parameter self-adaptive optimization module to make Length parameter change dynamically.
4. Add a position control module to prevent over-trading.   

## Summary  

This strategy constructs a simple quantitative trading strategy based on the linear regression intercept. Overall, the strategy has some economic value, but there are also some risks to note. Through continuous optimization, it is expected to further improve the stability and profitability of the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-28 00:00:00
end: 2023-12-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 21/03/2018
// Linear Regression Intercept is one of the indicators calculated by using the 
// Linear Regression technique. Linear regression indicates the value of the Y 
// (generally the price) when the value of X (the time series) is 0. Linear 
// Regression Intercept is used along with the Linear Regression Slope to create 
// the Linear Regression Line. The Linear Regression Intercept along with the Slope 
// creates the Regression line.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Line Regression Intercept Backtest", overlay = true)
Length = input(14, minval=1)
xSeria = input(title="Source", defval=close)
reverse = input(false, title="Trade reverse")
xX = Length * (Length - 1) * 0.5
xDivisor = xX * xX - Length * Length * (Length - 1) * (2 * Length - 1) / 6
xXY = 0
for i = 0 to Length-1
	xXY := xXY + (i * xSeria[i])
xSlope = (Length * xXY - xX * sum(xSeria, Length)) / xDivisor
xLRI = (sum(xSeria, Length) - xSlope * xX) / Length
pos = iff(close > xLRI, 1,
       iff(close < xLRI, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xLRI, color=blue, title="LRI")
```

> Detail

https://www.fmz.com/strategy/436997

> Last Modified

2023-12-29 11:45:20
