
> Name

三高K线反转策略Three-High-Candle-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11d1f2a8ffa1a519ad6.png)
[trans]
## 概述
三高K线反转策略是一种基于K线形态的短线交易策略。它利用三根连续阳线的特征,在盘中获得较高成功率的短线交易机会。

该策略主要用于短线交易。它的优势是rules简单清晰,容易操作。同时,它结合了止损和止盈机制来控制风险。但是该策略也存在一定的风险,如趋势市场中连续多头市场会产生背离。

## 策略原理
该策略判断最近的三根K线是否都是阳线,并且每日收盘价高于开盘价。如果满足条件,那么可以做多,目标获利为开盘价与收盘价之间的50%。  

具体来说,策略通过判断最近3根K线,也就是第1根、第2根和第3根K线,它们的开盘价是否都低于收盘价。如果满足该条件,说明可能出现机会。   

此外,策略还计算出当前价格与最近三日内最低开盘价与最高收盘价之间的差价百分比。如果该百分比高于20%但低于50%,证明目前反转空间不大,属于适合介入的时机。

当上述条件都满足时,就可以介入做多。此时的止损价位为进入价附近,止盈目标为进入价的1.5倍。

## 优势分析
该策略具有以下优势:

1. Rules简单清晰,容易理解和操作
2. 利用了K线形态提供的交易信号
3. 同时结合了止损和止盈机制,可以有效控制风险
4. 具有一定的胜率和盈利水平

## 风险分析
该策略也存在以下风险:  

1. 趋势市场中,K线容易出现三阳上涨的特征,这时根据策略做多就是与趋势背离,风险较大
2. 反转失败是最大的风险,会面临较大的止损
3. 参数设置不当也会影响策略表现

对应风险,可以通过以下方式优化:

1. 结合趋势指标,避免与趋势背离
2. 优化止损机制,降低单笔损失
3. 测试并优化关键参数,如盈利目标、止损幅度等

## 优化方向 
该策略可以从以下几个方向进行优化:

1. 优化开仓条件,避免错误信号,提高胜率
2. 结合趋势指标,避免逆势开仓
3. 优化止损机制,最大限度控制单笔亏损
4. 优化止盈机制,在保证胜率基础上追求更大盈利
5. 参数优化,寻找最优参数组合
6. 结合其他因子,如成交量变化等提高系统效果

## 总结
三高K线反转策略整体来说是一种简单实用的短线交易策略。它具有规则清晰、易于操作、利用K线形态等优势,也存在与趋势背离、止损被触发等风险。我们可以通过多种方式对该策略进行优化,使其系统效果更好,适合短线交易使用。

||

## Overview
The Three High Candle Reversal strategy is a short-term trading strategy based on candlestick patterns. It utilizes the features of three consecutive yang lines to obtain relatively high-success-rate short-term trading opportunities during the session.

This strategy is mainly used for short-term trading. Its advantage is that the rules are simple and clear, easy to operate. At the same time, it incorporates stop loss and take profit mechanisms to control risks. However, the strategy also has certain risks, such as divergence in consecutive bull markets in trend markets.   

## Principles  
The strategy judges whether the last three candlesticks are all yang lines, and whether the daily closing price is higher than the opening price. If the conditions are met, you can go long, with a target profit of 50% of the difference between the opening price and closing price.

Specifically, the strategy judges the latest 3 candlesticks, namely the 1st, 2nd and 3rd candlestick, whether their opening prices are lower than the closing prices. If this condition is met, it indicates a potential opportunity.  

In addition, the strategy also calculates the percentage difference between the current price and the lowest opening price and the highest closing price in the last three days. If this percentage is higher than 20% but lower than 50%, it proves that the current reversal space is not large and it is a suitable time to intervene.  

When all the above conditions are met, you can intervene to go long. At this point, the stop loss price is near the entry price, and the take profit target is 1.5 times the entry price.

## Advantage Analysis
The strategy has the following advantages: 

1. The rules are simple and clear, easy to understand and operate  
2. It utilizes the trading signals provided by candlestick patterns
3. It combines stop loss and take profit mechanisms to effectively control risks
4. It has a certain win rate and profit level  

## Risk Analysis
The strategy also has the following risks:   

1. In trend markets, candlesticks tend to show a pattern of three consecutive increases, so going long based on the strategy is contrary to the trend, with greater risk  
2. Failed reversal is the biggest risk, facing greater stop loss
3. Improper parameter settings also affect strategy performance  

To address the risks, optimization can be done in the following ways:  

1. Combine trend indicators to avoid reversals against the trend  
2. Optimize stop loss mechanism to reduce single loss  
3. Test and optimize key parameters such as profit targets, stop loss percentage, etc.  

## Optimization Directions
The strategy can be optimized in the following directions:  

1. Optimize entry conditions to avoid wrong signals and improve win rate  
2. Combine trend indicators to avoid opening positions against trends  
3. Optimize stop loss mechanism to maximize control over single losses  
4. Optimize take profit mechanism to pursue greater profits while ensuring win rate  
5. Parameter optimization to find the optimal parameter combination  
6. Incorporate other factors such as changes in volume to improve system performance   

## Summary  
In summary, the Three High Candle Reversal Strategy is a simple and practical short-term trading strategy. It has the advantages of clear rules, easy operation, use of candlestick patterns, as well as risks such as reversal against trends and stop loss trigger. We can optimize this strategy in many ways to make it perform better for short-term trading use.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-19 00:00:00
end: 2024-02-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © nonametr

//@version=5
strategy("3 high candle test")
cond2 = open[3] < close[3]
cond1 = open[2] < close[2]
cond0 = open[1] < close[1]

targetPercent = 0.5
currentPercent = 100 -(( math.min(open[3],open[2],open[1]) / math.max(close[3],close[2],close[1])) * 100)

longExitPrice  = strategy.position_avg_price * ((100 + 1) * 0.01)
shortExitPrice = strategy.position_avg_price * ((100 - 0.4) * 0.01)
plot(currentPercent)

if cond2 == true and cond1 == true and cond0 == true and currentPercent > 0.2 and currentPercent < 0.5
    strategy.entry("Enter Long", strategy.long, qty=1)

if close <= shortExitPrice
    strategy.close("Enter Long")

closeToReduceRisk  = close[1] < open[1] and strategy.openprofit > 0.47

if closeToReduceRisk or close >= longExitPrice
    strategy.close("Enter Long")


```

> Detail

https://www.fmz.com/strategy/442082

> Last Modified

2024-02-19 10:51:40
