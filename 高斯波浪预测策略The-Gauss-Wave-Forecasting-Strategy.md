
> Name

高斯波浪预测策略The-Gauss-Wave-Forecasting-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/169b87d8b015d0ccd89.png)
[trans]

## 概述

高斯波浪预测策略是一种基于高斯滤波的量化交易策略。它利用高斯滤波的平滑特性,对价格序列进行多次滤波,产生多个平滑后的价格序列。然后结合这些价格序列的多项式拟合,实现对未来价格的预测。根据预测结果,进行长仓或短仓的建议。

## 策略原理

该策略的核心是高斯滤波算法。高斯滤波器是一种线性平滑滤波器,它使用高斯函数作为权重。策略中设置参数p为滤波窗口大小。然后通过三角函数计算出滤波系数alfa。每个价格序列ret\\[i\\]表示对原始价格序列进行i次高斯滤波后的结果。

策略运用递归的思想。首先用alfa和原始价格序列price,计算出第一次滤波ret。然后基于ret再进行第二次滤波,得到ret2。如此重复多次。最后结合多个价格序列,拟合出曲线预测未来价格ret4。如果预测价格高于当前实际价格,则做多;如果低于当前价格,则做空。

这样通过多次滤波,可以更加平滑和拟合出趋势。同时结合多项式拟合,实现对短期内价格走势的预测。

## 优势分析

该策略具有以下优势:

1. 使用高斯滤波平滑价格。可以有效过滤掉高频噪音,使得策略更稳定。

2. 递归进行多次滤波。可以更好地拟合出价格趋势,预测效果更佳。

3. 基于多项式拟合预测价格。可以对短期价格走势建模,从而产生交易信号。

4. 结合当前价格与预测价格进行判断。交易信号直接与趋势预测相结合,避免错失交易机会。

5. 实现简单,容易理解和优化。可以作为高频策略的基础模块,扩展其他分析指标。

## 风险分析

该策略也存在以下风险:

1. 高斯滤波器对突发价格变化的平滑作用,可能错过短期交易机会。

2. 多项式拟合存在过拟合风险。如果价格变化模式突变,会导致预测效果下降。

3. 滤波窗口大小和拟合多项式阶数需要精确设定。如果不当可能失败。

4. 只依赖开盘价格作为交易信号。无法在内盘进行交易操作。

## 优化方向 

该策略可以从以下方面进行优化:

1. 增加模型训练和滑动窗口重新训练机制。使策略参数动态调整,减少过拟合风险。

2. 结合更多价格指标和特征。丰富策略输入,使预测更稳定。

3. 增加止损机制。设置最大损失比例,避免极端行情造成重大损失。

4. 优化仓位管理。根据预测准确率和波动率动态调整仓位。

5. 尝试基于主流机器学习模型的预测。如LSTM等深度学习模型。进一步提高策略预测能力。

## 总结

本策略总体来说是一个利用高斯滤波和多项式拟合进行价格预测的高频量化策略。它有着一定的优势,但也存在改进空间。通过结合更多特征,引入动态调参、止损机制等模块进行优化,可以使策略效果更出色。本策略为高频策略奠定了基础,值得进一步研究。

||

## Overview

The Gauss Wave Forecasting Strategy is a quantitative trading strategy based on Gaussian filtering. It utilizes the smoothing feature of Gaussian filters to filter the price series multiple times and produce multiple smoothed price series. Then combined with polynomial fitting of these price series, it realizes the prediction of future prices. According to the prediction results, it gives suggestions on long or short positions.

## Strategy Principle 

The core of this strategy is the Gaussian filter algorithm. The Gaussian filter is a linear smoothing filter that uses the Gaussian function as weights. The parameter p in the strategy is set as the size of the filtering window. Then the filtering coefficient alfa is calculated through trigonometric functions. Each price series ret\\[i\\] represents the result after the i-th Gaussian filtering of the original price series.

The strategy employs the idea of recursion. Firstly, with alfa and the original price series price, the first filtering ret is calculated. Then based on ret, the second filtering is carried out to obtain ret2. Repeat this multiple times. Finally, by combining multiple price series, a curve is fitted to predict future prices ret4. If the predicted price is higher than the current actual price, go long. If lower than the current price, go short.

By filtering multiple times, it can be smoother and better fitting the trend. At the same time, combined with polynomial fitting, it realizes the prediction of price trends in the short term.

## Advantage Analysis

The strategy has the following advantages:

1. Use Gaussian filter to smooth prices. It can effectively filter out high frequency noise and make the strategy more stable. 

2. Recursive multiple filtering. It can better fit the price trend and improve the prediction effect.

3. Price prediction based on polynomial fitting. It can model short-term price trends and thus generate trading signals.  

4. Judge based on current price versus predicted price. Trading signals are directly combined with trend predictions to avoid missing trading opportunities.

5. Simple to implement, easy to understand and optimize. It can serve as a basic module for high-frequency strategies to expand other analytical indicators.

## Risk Analysis

The strategy also has the following risks:

1. The smoothing effect of Gaussian filter on sudden price changes may miss short-term trading opportunities.  

2. Polynomial fitting has risks of overfitting. If the price change model mutates suddenly, the prediction effect will decline.

3. The size of filter window and order of fitting polynomial need to be set precisely. Otherwise it may fail.  

4. It relies solely on opening price for trading signals and cannot trade intraday.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add model training and sliding window retraining mechanisms for dynamic adjustment of parameters to reduce overfitting risks.

2. Incorporate more price indicators and features to enrich input and make predictions more stable. 

3. Add stop loss mechanisms, setting maximum loss ratio to avoid huge losses in extreme market conditions.  

4. Optimize position management, dynamically adjust positions based on prediction accuracy and volatility.

5. Try prediction based on mainstream machine learning models like LSTM and further improve the predictive capability.

## Conclusion  

In summary, this is a high-frequency quantitative strategy that performs price prediction using Gaussian filter and polynomial fitting. It has certain advantages but also room for improvement. By incorporating more features, introducing dynamic parameter tuning, stop loss mechanisms etc, the strategy effect could be much better. This strategy lays the foundation as a basic module for further research and optimization of high-frequency strategies.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2_open|0|Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-15 00:00:00
end: 2024-01-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Gaussbot v1.0", overlay=true)

p = input(20, minval=1, title="Length")
price = input(open, title="Source")

pi=3.1415926535


w=2*pi/p
beta = (1 - cos(w))/(pow(1.414,2.0/3) - 1)
alfa = -beta + sqrt(beta*beta + 2*beta)
ret=  pow(alfa,4)*price+4*(1-alfa)*nz(ret[1])-6*pow(1-alfa,2)*nz(ret[2])+4*pow(1-alfa,3)*nz(ret[3])-pow(1-alfa,4)*nz(ret[4])
ret2 = pow(alfa,4)*ret+4*(1-alfa)*nz(ret2[1])-6*pow(1-alfa,2)*nz(ret2[2])+4*pow(1-alfa,3)*nz(ret2[3])-pow(1-alfa,4)*nz(ret2[4])
ret3 = pow(alfa,4)*ret2+4*(1-alfa)*nz(ret3[1])-6*pow(1-alfa,2)*nz(ret3[2])+4*pow(1-alfa,3)*nz(ret3[3])-pow(1-alfa,4)*nz(ret3[4])
ret4 = 3*ret-3*ret2+ret3


diff2 = nz(ret[1]) - nz(ret[2]) - (nz(ret[2]) - nz(ret[3]) )  
diff22 = nz(ret2[1]) - nz(ret2[2]) - (nz(ret2[2]) - nz(ret2[3]) ) 
diff23 = nz(ret3[1]) - nz(ret3[2]) - (nz(ret3[2]) - nz(ret3[3]) )  
diff24 = nz(ret4[1]) - nz(ret4[2]) - (nz(ret4[2]) - nz(ret4[3]) )  


longCondition =    price[0] - ret4[1]  > 0
shortCondition =  price[0] - ret4[1] < 0

if(longCondition and shortCondition)
    longCondition = longCondition[1]
    shortCondition = shortCondition[1]
if(longCondition==false and shortCondition==false)
    longCondition = longCondition[1]
    shortCondition = shortCondition[1]



if (longCondition==true and shortCondition == false) 
    strategy.entry("Gaussbot Long", strategy.long )
if (longCondition==false and shortCondition == true)
    strategy.entry("Gaussbot Short", strategy.short)


```

> Detail

https://www.fmz.com/strategy/439625

> Last Modified

2024-01-22 12:37:40
