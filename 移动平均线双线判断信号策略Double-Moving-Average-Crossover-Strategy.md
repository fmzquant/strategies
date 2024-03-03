
> Name

移动平均线双线判断信号策略Double-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/19fd05c7f21cbbfb5a7.png)
[trans]


## 概述

该策略采用了布林带指标和移动平均线进行判断信号,由Arnoud Legoux指标计算均线,结合Parabolic SAR进行入市信号判断。策略名称为“移动平均线双线策略”,既包含了移动平均线指标又包含了双线条件判断的特点。

## 原理

该策略主要判断布林带与移动平均线指标的关系,通过布林带指标中一定宽度的均线管带,与移动平均线的交叉做多空信号判断。

具体来说,策略中采用了Arnoud Legoux移动平均线指标与Parabolic SAR指标的组合。

Arnoud Legoux移动平均线指标是一种对传统移动平均线进行改进的指标。它与普通移动平均线相比,通过引入Offset偏移量,可以更加灵活地调整移动平均线的角度;同时通过Sigma值调整移动平均线的平滑度。

Parabolic SAR指标则是一个非常常见的止损系统指标。它可以非常清晰地给出价格反转的信号,以追踪价格的变化趋势。当Parabolic SAR指标在价格下方时,代表目前处于看涨状态;反之,在价格上方时则代表看跌状态。

该策略判断指标关系的逻辑如下:

1. 判断日内是否收阳(收盘价高于开盘价)
2. 判断Parabolic SAR是否低于最低价:是看涨信号
3. 判断收盘价是否上穿Arnoud Legoux均线:代表价格突破该均线,也是看涨信号
4. 同时满足以上3个条件时,产生看涨信号,做多

判断看跌信号的逻辑相反,具体如下:

1. 判断日内是否收阴(收盘价低于开盘价)  
2. 判断Parabolic SAR是否高于最高价:是看跌信号
3. 判断收盘价是否下穿Arnoud Legoux均线:代表价格跌破该均线,也是看跌信号  
4. 同时满足以上3个条件时,产生看跌信号,做空

## 优势

该策略结合运用了布林带指标与移动平均线指标,兼顾了趋势判断和突破交易。具体优势如下:

1. 移动平均线指标可以有效判断价格趋势方向
2. Parabolic SAR指标可以准确判断价格反转点
3. Arnoud Legoux移动平均线灵活性高,可以通过参数调整形状
4. 结合双重指标判断,避免了单一指标误判的概率
5. 通过日内阴阳判断,可进一步避免不必要的交易

## 风险

该策略也存在一些风险,主要如下:

1. 参数设置不当可能导致交易频率过高或过低
2. 双重指标组合判断时,参数匹配不当也会影响策略表现 
3. 移动平均线类策略对震荡行情的适应性较差
4. 策略未考虑资金管理因素,可能面临超额持仓风险

对应解决方法如下:

1. 参数优化,使指标匹配度更高
2. 优化资金管理策略,控制单笔仓位
3. 结合更多指标过滤器,降低误交易概率

## 优化方向  

该策略可优化的方向还有很多,主要如下:

1. 在开发过程中引入机器学习模型,实现参数的自动优化
2. 运用高级资金管理策略,如固定率下单,资金回撤控制等
3. 引入更多辅助指标,构建复合交易系统,提高系统稳定性
4. 优化回撤控制策略,引入止损方式避免亏损扩大
5. 构建algo交易系统,连接更快速度的市场数据和下单渠道

## 总结

该策略整体运用了布林带与移动平均线双重指标判断,在参数优化和策略组合方面都有很大的优化空间。通过引入更多量化方法,该策略可以进一步优化成为一个稳定收益的算法交易策略。

||


## Overview

This strategy adopts the Bollinger Bands indicator and moving average to determine trading signals. The Arnoud Legoux indicator is used to calculate the moving average, combined with the Parabolic SAR indicator to judge the entry signals. The strategy name is "Double Moving Average Crossover Strategy", containing both the moving average indicator and the double line condition judgment characteristics.  

## Principles  

The core logic of this strategy is to judge the relationship between the Bollinger Bands and the moving average indicator. It uses the Bollinger Bands with a certain width of moving average bands to determine the long and short signals when the moving average line crossovers.

Specifically, the strategy combines the Arnoud Legoux moving average indicator and the Parabolic SAR indicator.  

The Arnoud Legoux moving average indicator is an improved version based on the traditional moving average. Compared with the ordinary moving average, it introduces the Offset displacement to adjust the angle of the moving average line more flexibly. At the same time, the Sigma value is used to adjust the smoothness of the moving average line.

The Parabolic SAR indicator is a very common stop-loss indicator. It can give very clear reversal signals to track the price trend. When the Parabolic SAR indicator is below the price, it represents a bullish state. On the contrary, above the price is a bearish state.

The logic for judging the indicator relationship is as follows:

1. Judge whether the close is greater than the open within the day
2. Judge if the Parabolic SAR is lower than the lowest price: a bullish signal 
3. Judge if the close breaks through the Arnoud Legoux moving average line: it also represents a bullish signal
4. When all the above 3 conditions are met at the same time, a buy signal is generated for long position

The logic for judging the short signal is the opposite:  

1. Judge whether the close is lower than the open within the day
2. Judge if the Parabolic SAR is higher than the highest price: a bearish signal
3. Judge if the close breaks the Arnoud Legoux moving average line: it also represents a bearish signal
4. When all the above 3 conditions are met at the same time, a sell signal is generated for short position  

## Advantages  

This strategy combines the Bollinger Bands indicator and the moving average indicator to take into account both trend judgment and breakout trading. The main advantages are:

1. The moving average indicator can effectively determine the price trend  
2. The Parabolic SAR indicator can accurately determine price reversal points
3. The Arnoud Legoux moving average has high flexibility and its shape can be adjusted through parameters  
4. The combination of double indicator judgment avoids the probability of misjudgment of a single indicator  
5. Intraday Yin and Yang further avoid unnecessary trading  

## Risks   

There are also some risks in this strategy:   

1. Inappropriate parameter settings may lead to too high or too low trading frequency  
2. Mismatching parameters when combining double indicators can also affect strategy performance   
3. Moving average strategies are less adaptable to volatile markets   
4. The strategy does not consider capital management factors and may face overleverage risks  

The corresponding solutions are:

1. Parameter optimization to make a better match between indicators  
2. Optimize capital management strategies to control single position size   
3. Introduce more indicator filters to reduce mis-trading possibilities  

## Optimization Directions   

There are many directions for optimizing this strategy:

1. Introduce machine learning models in development for automatic parameter optimization 
2. Implement advanced capital management strategies like fixed ratio ordering and drawdown control  
3. Incorporate more auxiliary indicators to build a composite trading system to improve system stability  
4. Optimize the drawdown control strategy by introducing stop loss methods to avoid expanding losses  
5. Building algo trading systems, connecting faster market data and order execution channels  

## Summary   

This strategy uses the double judgment of Bollinger Bands and moving average indicators. There is a large space for optimization in terms of parameter tuning and strategy combination. By introducing more quantitative methods, the strategy can be further optimized into a stable profit-generating algorithmic trading strategy.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|Window Size|
|v_input_2|0.85|Offset|
|v_input_3|6|Sigma|
|v_input_4|0.02|Start|
|v_input_5|0.02|Increase|
|v_input_6|0.2|Max|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-26 00:00:00
end: 2023-12-26 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Author: HighProfit

//Lead-In
strategy("Parabolic SAR & Arnoud Legoux Moving Avarage Strategy", shorttitle="ST-PSAR+ALMA", overlay=true)

//Arnoud Legoux Moving Avarage Inputs
source = close
windowsize = input(title="Window Size",defval=50)
offset = input(title="Offset", type=float, defval=0.85)
sigma = input(title="Sigma", type=float, defval=6)

//Parabolic SAR Inputs
start = input(title="Start", type=float, defval=0.02)
increase = input(title="Increase", type=float, defval=0.02)
max = input(title="Max", type=float, defval=.2)

//Conditions
longCondition = close>open and sar(start, increase, max) < low and crossover(close, alma(source, windowsize, offset, sigma))
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = close<open and sar(start, increase, max) > high and crossunder(close, alma(source, windowsize, offset, sigma))
if (shortCondition)
    strategy.entry("Short", strategy.short)

//Plots   
plot(alma(source, windowsize, offset, sigma), linewidth=2, title="ALMA")
plot(sar(start, increase, max), style=circles, linewidth=2, title="PSAR")
```

> Detail

https://www.fmz.com/strategy/436797

> Last Modified

2023-12-27 17:45:43
