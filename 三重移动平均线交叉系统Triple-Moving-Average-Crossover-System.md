
> Name

三重移动平均线交叉系统Triple-Moving-Average-Crossover-System

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

三重移动平均线交叉系统是一种典型的跟踪趋势的股票交易策略。它利用三条不同时间长度的移动平均线的交叉作为买入和卖出信号。当短期移动平均线上穿中期移动平均线,并且中期移动平均线上穿长期移动平均线时产生买入信号;当短期移动平均线下穿中期移动平均线,并且中期移动平均线下穿长期移动平均线时产生卖出信号。

## 策略原理

该策略基于三条移动平均线:长线期移动平均线ma1、中期移动平均线ma2和短期移动平均线ma3。首先计算这三条线:

```pine
length1 = input(18,'长线') 
length2 = input(9,'中线')
length3 = input(4,'短线')

ma1 := sma(close,length1) 
ma2 := sma(close,length2)
ma3 := sma(close,length3)
```

其中,length1、length2和length3分别定义三条移动平均线的时间长度。sma函数计算close价格在对应长度上的简单移动平均值。

然后使用三条移动平均线的交叉判断买入和卖出时机:

```pine
if ma2 > ma1 and ma3 > ma3[1] 
    strategy.entry("Long", strategy.long)

if ma2 < ma1 and ma3 < ma3[1]
    strategy.entry("Short", strategy.short) 
```

当中期线ma2上穿长期线ma1,并且短期线ma3上穿前一周期的ma3时,发出做多信号。当中期线ma2下穿长期线ma1,并且短期线ma3下穿前一周期的ma3时,发出做空信号。

## 策略优势

- 使用三条移动平均线,可以比较清晰地判断趋势的变化。
- 长短线的组合可以过滤掉一些短期的市场噪音,锁定较长线的趋势。
- 规则简单容易操作。
- 可以通过调整三条移动平均线的参数来适应不同的市场环境。

## 策略风险

- 买点卖点都是事后确认的,不能完全避免亏损。
- 当股价在移动平均线附近震荡时,会出现多次假信号。
- 长期线过长会错过趋势转折点。短期线过短会因噪音频繁交易。
- 不能很好地处理横盘市。

可以通过适当优化参数、结合其他指标作为过滤条件来减少这些风险。

## 策略优化方向 

- 可以测试不同长度参数的组合,寻找最佳参数。
- 可以加入止损来控制亏损。
- 可以添加其他指标判断力度和背离,避免误判。例如MACD,KD等。
- 可以根据实际情况选择合适的止盈策略。

## 总结

三重移动平均线交叉策略属于简单实用的趋势跟踪策略。它根据三条移动平均线的交叉判断行情趋势的变化,以产生交易信号。该策略优点是规则简单,可以有效跟踪趋势,适合中长线操作。但也存在一定的假信号风险和回撤风险。可以通过参数优化、加入辅助指标等方法进行改进,以适应不同市场环境。总体来说,三重移动平均线交叉策略是量化交易的一个基础入门策略,对于学习算法交易是一个很好的开始。


||


## Overview

The Triple Moving Average Crossover System is a typical trend-following stock trading strategy. It uses the crossover of three moving averages of different time lengths as buy and sell signals. When the short period moving average crosses above the medium period moving average, and the medium period moving average crosses above the long period moving average, a buy signal is generated. When the short period moving average crosses below the medium period moving average, and the medium period moving average crosses below the long period moving average, a sell signal is generated.

## Strategy Logic

The strategy is based on three moving averages: the long period moving average ma1, the medium period moving average ma2 and the short period moving average ma3. First it calculates these three lines:

```pine
length1 = input(18,'长线')  
length2 = input(9,'中线')
length3 = input(4,'短线')

ma1 := sma(close,length1)
ma2 := sma(close,length2) 
ma3 := sma(close,length3)
```

Where length1, length2 and length3 define the time lengths of the three moving averages. The sma function calculates the simple moving average of the close price over the corresponding length.

It then uses the crossover of the three moving averages to determine entries and exits:

```pine 
if ma2 > ma1 and ma3 > ma3[1]
    strategy.entry("Long", strategy.long)

if ma2 < ma1 and ma3 < ma3[1] 
    strategy.entry("Short", strategy.short)
```

When the medium term ma2 crosses above the long term ma1, and the short term ma3 crosses above the previous period's ma3, a long signal is triggered. When the medium term ma2 crosses below the long term ma1, and the short term ma3 crosses below the previous period's ma3, a short signal is triggered.

## Advantages of the Strategy

- Using three moving averages can clearly identify trend changes.
- The combination of long and short periods filters out some short term market noise and locks in longer term trends. 
- Simple rules make it easy to implement.
- Parameters can be adjusted to adapt to different market environments.

## Risks of the Strategy

- Entries and exits are identified in hindsight and cannot completely avoid losses.
- Whipsaws occur when the price oscillates around moving averages.
- Long period line that is too long may miss trend turning points. Short period line that is too short may trigger frequent trades due to noise.
- Does not handle ranging markets very well.

These risks can be reduced through appropriate parameter optimization, adding filters with other indicators etc.

## Improvement Directions

- Backtest different parameter combinations to find optimal values.
- Add stop loss to control losses.
- Add other indicators to judge momentum and divergence to avoid false signals. E.g. MACD, KD etc.
- Choose suitable profit taking strategy according to actual situation.

## Summary 

The Triple Moving Average Crossover strategy is a simple and practical trend following strategy. It identifies changes in trend direction based on the crossover of three moving averages to generate trading signals. The advantages of this strategy are its simple rules and effective tracking of trends, making it suitable for medium to long term trading. However, there are also risks of false signals and drawdowns. The strategy can be improved by optimizing parameters, adding supporting indicators etc. to adapt to different market environments. Overall, the Triple Moving Average Crossover is a foundational algorithmic trading strategy that provides a good starting point for learning quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|18|长线|
|v_input_2|9|中线|
|v_input_3|4|短线|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dongyun

//@version=4
strategy("三重交叉修正模式系统", overlay=true)
//strategy.risk.allow_entry_in(strategy.direction.long)
length1 = input(18,'长线')
length2 = input(9,'中线')
length3 = input(4,'短线')

ma1 =0.0
ma2 = 0.0
ma3 = 0.0

ma1 := sma(close,length1)
ma2 := sma(close,length2)
ma3 := sma(close,length3)

plot(ma1)
plot(ma2)
plot(ma3)

if ma2 > ma1 and ma3 > ma3[1]
	strategy.entry("Long", strategy.long, when=strategy.position_size <= 0)

if ma2 < ma1 and ma3 < ma3[1]
	strategy.entry("Short", strategy.short, when=strategy.position_size > 0)
```

> Detail

https://www.fmz.com/strategy/428089

> Last Modified

2023-09-28 15:33:14
