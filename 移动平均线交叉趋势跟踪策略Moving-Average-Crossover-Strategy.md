
> Name

移动平均线交叉趋势跟踪策略Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/101c6953fdd67d18e13.png)
[trans]

## 概述

该策略是基于移动平均线交叉的趋势跟踪策略。它使用两条不同周期的指数移动平均线,当短周期移动平均线上穿长周期移动平均线时做多,当短周期移动平均线下穿长周期移动平均线时做空,属于典型的趋势跟踪策略。

## 策略原理   

该策略使用 20 周期和 50 周期两条移动平均线。首先计算这两条移动平均线,然后寻找它们的交叉点作为交易信号。当 20 周期移动平均线上穿 50 周期移动平均线时产生买入信号;当 20 周期移动平均线下穿 50 周期移动平均线时产生卖出信号。因此,该策略的主要逻辑就是跟踪两个移动平均线的交叉来判断市场趋势方向的转折。  

在产生交易信号后,该策略会按照固定的止损幅度和止盈幅度下单。例如,买入后会设置 0.4% 的止损和 0.7% 的止盈;卖出后会设置 0.4% 的止盈和 0.7% 的止损。通过设置止损止盈来控制单笔交易的风险和收益。

## 策略优势  

该策略具有以下优势:

1. 操作逻辑简单清晰,容易理解和实现  
2. 可靠地捕捉市场趋势的转折点  
3. 设置了止损止盈,可以很好控制单笔交易风险  

## 策略风险

该策略也存在一些风险:  

1. 当市场不具有明显趋势时,会产生更多错误信号  
2. 无法有效过滤市场上的噪音,容易被套住  
3. 设定的止损止盈幅度可能不适合所有品种,需要优化  

对策:
1. 优化移动平均线的周期,过滤错误信号  
2. 结合其他指标进行过滤  
3. 测试并优化止损止盈参数  

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 优化移动平均线周期,找到最佳参数组合  
2. 增加成交量等指标过滤信号  
3. 在特定品种上测试并优化止损止盈幅度  
4. 将固定止损止盈改为动态止损止盈  
5. 增加机器学习等算法,自动寻找最优参数  

## 总结  

该策略整体来说是一个简单有效的趋势跟踪策略。它 Caught利用移动平均线交叉判断市场趋势的转折,并设置止损止盈控制风险。该策略适合对趋势判断要求不高的投资者。通过对参数和模型的进一步优化,可以获得更好的策略效果。

||

## Overview  

This is a trend following strategy based on moving average crossover. It uses two moving averages with different periods. When the shorter period moving average crosses above the longer period moving average, it goes long. When the shorter period moving average crosses below the longer period moving average, it goes short. This is a typical trend following strategy.  

## Strategy Logic  

The strategy uses 20-period and 50-period moving averages. It first calculates these two moving averages, then identifies crossover points between them to generate trading signals. When the 20-period moving average crosses above the 50-period moving average, it generates a buy signal. When the 20-period moving average crosses below the 50-period moving average, it generates a sell signal. So the core logic of this strategy is to track the crossover between the two moving averages to determine the turning points in the market trend.

After generating trading signals, the strategy will place orders with fixed stop loss and take profit margins. For example, after buying, it will set a 0.4% stop loss and 0.7% take profit. By setting stop loss and take profit, it controls the risk and reward of individual trades.  

## Advantages of the Strategy

The strategy has the following advantages:

1. Simple and clear operation logic, easy to understand and implement
2. Reliably capture market trend turning points  
3. Set stop loss and take profit to well control single trade risk

## Risks of the Strategy  

There are also some risks with this strategy:

1. More false signals when market has no clear trend  
2. Fail to effectively filter market noise, prone to being trapped
3. The stop loss and take profit margins may not suitable for all products, need optimization

Countermeasures:

1. Optimize moving average periods to filter false signals
2. Add other indicators for filtration 
3. Test and optimize stop loss and take profit parameters  

## Optimization Directions 

The strategy can be optimized in the following aspects:

1. Optimize moving average periods to find best parameter combination
2. Add indicators like trading volume to filter signals
3. Test and optimize stop loss and take profit margins on specific products   
4. Change fixed stop loss and take profit to dynamic ones
5. Add machine learning algorithms to automatically find optimum parameters  

## Summary   

Overall this is a simple and effective trend following strategy. It catches trend turning points using moving average crossover and controls risk via stop loss and take profit. The strategy suits investors who don't have high requirements on trend judgment. Further optimization on parameters and models can lead to better strategy performance.

[/trans]]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|lenght1|
|v_input_2|50|lenght2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-29 00:00:00
end: 2023-12-05 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © danielfepardo

//@version=5

strategy("QUANT", overlay=true)
lenght1 = input(20)
lenght2 = input(50)


ema1 = ta.ema(close, lenght1)
ema2 = ta.ema(close, lenght2)
plot(ema1, color=color.black)
plot(ema2, color=color.red)

long = ta.crossover(ema1, ema2)

SL = 0.004
TP = 0.007

if long == true
    strategy.entry("Compra Call", strategy.long)
longstop=strategy.position_avg_price*(1-SL)
longprofit=strategy.position_avg_price*(1+TP)
strategy.exit("Venta Call", stop=longstop, limit=longprofit)

short = ta.crossover(ema2, ema1)

if short == true
    strategy.entry("Compra Put", strategy.short)
shortstop=strategy.position_avg_price*(1+SL)
shortprofit=strategy.position_avg_price*(1-TP)
strategy.exit("Venta Put", stop=shortstop, limit=shortprofit)





```

> Detail

https://www.fmz.com/strategy/434473

> Last Modified

2023-12-06 16:58:20
