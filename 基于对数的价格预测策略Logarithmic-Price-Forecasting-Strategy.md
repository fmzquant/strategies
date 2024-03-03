
> Name

基于对数的价格预测策略Logarithmic-Price-Forecasting-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1765dd89f4fbd5b67f1.png)
 [trans]

## 概述

该策略利用对数函数模拟价格变化,根据交易量的标准差和均值计算z值,作为参数输入对数函数,预测未来价格。

## 策略原理

1. 计算收盘价的ROC值,正值累加至volume_pos,负值累加至volume_neg
2. 计算volume_pos和volume_neg的差值作为net_volume
3. 计算net_volume的标准差net_std和均值net_sma
4. 计算net_sma除以net_std得到z值
5. 将收盘价、收盘价20日标准差、z值作为参数,输入对数函数logistic预测下一周期价格
6. 当预测价格高于当前实际价格1.005倍时做多,低于0.995倍时平仓

## 优势分析

该策略结合了交易量的统计信息和对数函数的价格预测。

优点有:

1. 利用了交易量的多空差异,可以判断市场情绪
2. 对数函数拟合价格变化曲线,预测效果较好 
3. 策略简单明了,容易实施

## 风险分析

该策略也存在一些风险:

1. 交易量指标存在滞后,不能及时反映市场变化
2. 对数函数预测不一定准确,容易产生误导
3. 缺乏止损措施,无法控制亏损

可以通过以下方法降低风险:

1. 结合其他指标判断交易量信号的可靠性
2. 优化对数函数的参数,提高预测准确度
3. 设置止损线,限制每单和总体的最大损失

## 优化方向

该策略还可以进一步优化:

1. 利用机器学习方法动态优化对数函数
2. 结合股价波动率指标调整仓位管理
3. 增加贝叶斯过滤,过滤无效信号
4. 结合突破策略,在突破点入场
5. 利用关联规则挖掘量价背离信号

通过多种方法的组合,可以进一步提高策略的稳定性和盈利能力。

## 总结

本策略整合交易量统计指标和对数函数预测,形成独特的量化交易思路。通过持续优化,该策略可以成为高效稳定的程序化交易系统。结合机器学习和组合优化理论,我们有信心进一步提升其交易表现。

||


## Overview

This strategy uses logarithmic functions to model price changes based on the standard deviation and mean of trading volume to calculate z-score as input parameters to the logarithmic function for predicting future prices.

## Strategy Principles  

1. Calculate ROC value of closing price, accumulate positive values into volume_pos and negative values into volume_neg
2. Calculate the difference between volume_pos and volume_neg as net_volume 
3. Calculate standard deviation net_std and mean net_sma of net_volume
4. Calculate z-score by dividing net_sma by net_std
5. Use closing price, 20-day standard deviation of closing price and z-score as parameters into the logistic function to predict next period's price
6. Long when predicted price is above current actual price * 1.005, close position when below * 0.995

## Advantage Analysis

This strategy combines statistical information of trading volume and price prediction using logarithmic functions.

Advantages are:

1. Utilizes long-short difference in trading volume to gauge market sentiment
2. Logarithmic function fits price change curve well for prediction
3. Simple and straightforward strategy, easy to implement

## Risk Analysis  

Some risks also exist in this strategy:

1. Trading volume indicators have lag, cannot timely reflect market changes
2. Logarithmic prediction not always accurate, can be misleading  
3. Lack of stop loss measures inability to control losses

Risks can be reduced by:

1. Combine other indicators to judge reliability of volume signals  
2. Optimize parameters of logarithmic function to improve prediction accuracy 
3. Set stop loss lines to limit maximum loss per trade and overall

## Optimization Directions

This strategy can be further optimized by:

1. Adopt machine learning to dynamically optimize logarithmic function  
2. Incorporate volatility indicators to adjust position sizing  
3. Add Bayesian filtering to filter out invalid signals
4. Combine with breakout strategies to enter on breakout points
5. Use association rules to detect volume-price divergence signals  

Combining multiple methods can further improve stability and profitability.

## Conclusion  

This strategy integrates statistical indicators of trading volume and logarithmic prediction into a unique quantitative trading methodology. With continuous optimization, it can become an efficient and stable automated trading system. By leveraging machine learning and portfolio optimization theories, we are confident to further improve its trading performance.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Logistic", overlay=true )

volume_pos = 0.0
volume_neg = 0.0
roc = roc(close, 1)

for i = 0 to 100
    if (roc > 0)
        volume_pos := volume
    else
        volume_neg := volume
    
volume_net = volume_pos - volume_neg
net_std    = stdev(volume_net, 100)
net_sma    = sma(volume_net, 10)
z          =  net_sma / net_std
std        = stdev(close, 20)

logistic(close, std, z) =>
    m = (close + std)
    a = std / close
    pt = m / ( 1 + a*exp(-z))
    pt
    
    
pred = logistic(close, std, z)

buy = pred > close * 1.005
sell = pred < close * 0.995

color = strategy.position_size > 0? #3BB3E4 : strategy.position_size == 0? #FF006E : #6b6b6b
barcolor(color)


if (buy == true)
    strategy.entry("Long", strategy.long, comment="Open L")
    
if (sell == true)
    strategy.close("Long", comment="Close L")

```

> Detail

https://www.fmz.com/strategy/435966

> Last Modified

2023-12-20 14:40:23
