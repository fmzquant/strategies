
> Name

最高最低中心回看策略Highest-Lowest-Center-Lookback-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a8831f1c93d21e8dfd.png)
[trans]

## 概述

最高最低中心回看策略是一种趋势跟踪策略。它的主要思想是计算过去一定周期内的最高价和最低价的中间价作为基准价,然后根据这个基准价再结合波动率计算出建仓区和平仓区。当价格进入建仓区时,做多;当价格进入平仓区时,平仓。

## 策略原理

该策略主要通过以下几个步骤实现:

1. 计算过去lookback_length周期内的最高价h和最低价l,并使用EMA平滑
2. 计算最高价和最低价的中间价center作为基准价
3. 根据ATR和ATR multiplier计算波动率vola
4. 根据center和vola计算出建仓区upper和平仓区lower
5. 当价格price上穿upper时,做多;当price下穿lower时,平仓

通过这种方法,可以在价格进入趋势状态时及时跟踪趋势;同时也可以通过波动率来控制风险。

## 优势分析

这种策略具有以下几个优势:

1. 可以有效跟踪趋势,及时捕捉价格变化
2. 使用最高最低价的中间价作为基准价,可以减少假突破的概率
3. 波动率可以自动调整,从而控制风险
4. 持仓时间短,可以获取较高频率的交易机会
5. 实现简单,容易理解和优化

## 风险分析

该策略也存在一些风险:

1. 在震荡行情中可能会出现较多无谓交易
2. ATR大小和倍数的设置会影响策略表现,需要仔细测试优化
3. 在突破中间价后可能会出现回调从而导致止损
4. 如果趋势反转速度过快,会带来较大亏损

为了控制这些风险,可以从以下几个方面进行优化:

1. 调整ATR参数,降低波动率,过滤震荡
2. 增加过滤条件,避免无谓交易
3. 采用移动止损以锁定利润
4. 结合趋势指标判断真正趋势的开始和结束

## 优化方向 

该策略还具有进一步优化的空间:

1. 可以测试不同市场及不同周期的参数效果
2. 可以结合机器学习算法自动优化参数
3. 可以结合更多指标判断趋势开始和结束
4. 可以考虑动态调整建仓比例
5. 可以结合情绪指标避免被极端情绪带偏

通过这些优化,可以期望进一步提高策略的稳定性和盈利能力。

## 总结

最高最低中心回看策略是一个简单实用的趋势跟踪策略。它可以及时捕捉价格变化,跟踪趋势,而又能够通过波动率控制风险。该策略容易实现,适合量化交易初学者学习和实践。通过参数优化和规则优化,可以进一步提升策略的效果。总的来说,这是一种值得推荐的量化策略。

|| 

## Overview

The Highest/Lowest Center Lookback strategy is a trend following strategy. Its main idea is to calculate the middle price of the highest and lowest prices over a certain period in the past as the benchmark price, and then calculate the entry zone and exit zone based on this benchmark price combined with volatility. When the price enters the entry zone, go long; when the price enters the exit zone, close the position.

## Strategy Logic

The strategy is mainly implemented through the following steps:

1. Calculate the highest price h and lowest price l over the past lookback_length periods, and smooth them with EMA
2. Calculate the middle price of h and l as the center price 
3. Calculate volatility vola based on ATR and ATR multiplier
4. Calculate entry zone upper and exit zone lower based on center and vola
5. When price price breaks above upper, go long; when price breaks below lower, close position

In this way, it can track the trend in time when price enters a trend state; at the same time, risk can be controlled through volatility.

## Advantage Analysis 

This strategy has the following advantages:

1. Can effectively track trends and capture price changes in time
2. Using the middle price of highest and lowest prices can reduce the probability of false breakouts  
3. Volatility can be automatically adjusted to control risk
4. Position holding time is short, allowing more frequent trading opportunities
5. Simple to implement and easy to understand and optimize

## Risk Analysis

The strategy also has some risks:  

1. More unnecessary trades may occur in range-bound markets
2. The settings of ATR size and multiplier will affect strategy performance, requiring careful testing and optimization
3. Pullback after breaking the middle price may cause stop loss
4. If the trend reversal speed is too fast, it will lead to greater losses

To control these risks, optimization can be done in the following aspects:

1. Adjust ATR parameters to reduce volatility and filter whipsaws
2. Add filters to avoid unnecessary trades 
3. Use moving stop loss to lock in profits
4. Combine trend indicators to judge real trend start and end  

## Optimization Directions

The strategy also has room for further optimization:

1. Test parameter effectiveness across different markets and timeframes
2. Automatically optimize parameters with machine learning algorithms
3. Incorporate more indicators to judge trend start and end
4. Consider dynamically adjusting position sizing
5. Incorporate sentiment indicators to avoid bias from extreme emotions

Through these optimizations, further improvements in strategy stability and profitability can be expected.  

## Conclusion

The Highest/Lowest Center Lookback strategy is a simple and practical trend following strategy. It can capture price changes in time, track trends, while controlling risk through volatility. The strategy is easy to implement, suitable for quantitative trading beginners to learn and practice. By optimizing parameters and rules, the strategy performance can be further improved. In general, this is a recommended quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|Lookback Length|
|v_input_2|5|Smoother Length|
|v_input_3|10|ATR Length|
|v_input_4|1.5|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-27 00:00:00
end: 2023-12-27 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Highest/Lowest Center Lookback Strategy", overlay=true)

lookback_length = input(200, type=input.integer, minval=1, title="Lookback Length")
smoother_length = input(5, type=input.integer, minval=1, title="Smoother Length")
atr_length = input(10, type=input.integer, minval=1, title="ATR Length")
atr_multiplier = input(1.5, type=input.float, minval=0.5, title="ATR Multiplier")

vola = atr(atr_length) * atr_multiplier
price = sma(close, 3)

l = ema(lowest(low, lookback_length), smoother_length)
h = ema(highest(high, lookback_length), smoother_length)
center = (h + l) * 0.5
upper = center + vola
lower = center - vola
trend = price > upper ? true : (price < lower ? false : na)

bull_cross = crossover(price, upper)
bear_cross = crossunder(price, lower)

strategy.entry("Buy", strategy.long, when=bull_cross)
strategy.close("Buy", when=bear_cross)

plot(h, title="High", color=color.red, transp=75, linewidth=2)
plot(l, title="Low", color=color.green, transp=75, linewidth=2)

pc = plot(center, title="Center", color=color.black, transp=25, linewidth=2)
pu = plot(upper, title="Upper", color=color.green, transp=75, linewidth=2)
pl = plot(lower, title="Lower", color=color.red, transp=75, linewidth=2)

fill(pu, pc, color=color.green, transp=85)
fill(pl, pc, color=color.red, transp=85)

bgcolor(trend == true ? color.green : (trend == false ? color.red : color.gray), transp=85)
```

> Detail

https://www.fmz.com/strategy/436878

> Last Modified

2023-12-28 15:42:10
