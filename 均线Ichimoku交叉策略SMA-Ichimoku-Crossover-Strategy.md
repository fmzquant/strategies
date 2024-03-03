
> Name

均线Ichimoku交叉策略SMA-Ichimoku-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

均线交叉策略是一种比较常见的交易策略。该策略运用均线的金叉死叉原理,结合Ichimoku云图指标以及SMA平滑移动均线,形成一个较为完整的交易系统。该策略可以自动进行 stock开平仓操作。

## 策略原理

该策略主要通过Ichimoku指标中的转折线和基准线比较,以及SMA短期和长期移动均线的交叉情况来判断买卖股票。

具体来说,代码中定义了Ichimoku指标的转折线conversionLine、基准线baseLine、领先线1 leadLine1和领先线2 leadLine2。同时定义了长期SMA移动均线ma1和短期SMA移动均线ma2。

在判断买入时,要同时满足转折线低于基准线、短期均线低于长期均线的条件,即发生均线金叉。

判断卖出时,要同时满足转折线高于基准线、短期均线高于长期均线的条件,即发生均线死叉。

此外,代码还定义了一些辅助条件,如收盘价高于前一日的判断,以及利用均线的数值做差再除以一个数值来判断均线的斜率。这可以判断均线交叉的力度和方向。

## 策略优势分析

该策略集多种技术指标优势于一体,可以较好地判断市场趋势,具有以下优势:

1. Ichimoku云图本身就包含对趋势的判断,结合SMA均线可以形成比较强大的趋势判断。

2. SMA均线本身就可以判断价格趋势和力度,快均线交叉慢均线可以判断买卖点。

3. 增加收盘价判断可以避免无谓的反复开平仓。

4. 均线斜率的计算增加了对均线交叉力度的判断,可以过滤假交叉。 

5. 整体来说,该策略对趋势判断比较准确,可以减少不必要的交易,而且具有一定的优化空间。

## 策略风险分析

该策略也存在一些风险:

1. Ichimoku和SMA均线都可能出现滞后,不能及时反映价格变化。

2. 多种条件组合判断,增加了策略复杂度,也增加了出错概率。

3. 策略仅基于技术指标,不能判断重大消息面的影响。

4. 策略没有设置止损条件,存在亏损扩大的风险。

5. 策略没有考虑特殊行情的处理,如盘整行情。

6. 参数设置不当也会影响策略效果。

## 策略优化方向 

该策略还可以从以下几个方面进行优化:

1. 设置止损条件,可以在亏损扩大时自动止损。

2. 增加对重大消息面的判断,避免重大消息面影响。

3. 增加对特殊行情的判断,如加大交易区间或调整参数。

4. 对参数组合进行测试优化,寻找最优参数。

5. 增加机器学习算法,利用AI进行参数优化和市场判断。

6. 增加量能指标判断,避免假突破。

7. 结合更多基本面指标,如成交量变化等。

## 总结

综上所述,该均线交叉策略整合了Ichimoku指标和SMA移动均线的优势,形成了一套较为完整的股票交易策略。该策略判断趋势的能力较强,可以有效地捕捉趋势机会。但也存在一些问题,如滞后、复杂度大、缺乏止损等。这给了该策略很大的优化空间,通过设置止损、判断重大消息面、优化参数等手段都可以不断改进该策略,使其成为一个稳定、可靠的量化交易策略。

||


## Overview

The SMA Ichimoku crossover strategy is a common trading strategy. This strategy uses the gold cross and dead cross principles of moving averages, combined with the Ichimoku cloud and SMA smooth moving average, to form a relatively complete trading system. This strategy can automatically open and close stock positions.

## Strategy Principle

This strategy mainly judges buying and selling stocks through the comparison between the conversion line and base line in the Ichimoku indicator and the crossovers of short-term and long-term SMA moving averages.

Specifically, the code defines the conversion line, base line, leading span 1 and leading span 2 of the Ichimoku indicator. At the same time, the long-term SMA moving average ma1 and short-term SMA moving average ma2 are defined.

When judging for buying, the conversion line needs to be lower than the base line, and the short-term moving average lower than the long-term moving average, that is, a golden cross occurs.

When judging for selling, the conversion line needs to be higher than the base line, and the short-term moving average higher than the long-term moving average, that is, a dead cross occurs.

In addition, the code also defines some auxiliary conditions, such as the closing price higher than the previous day, and using the difference and division of moving average values ​​to judge the slope. This can determine the momentum and direction of moving average crossovers.

## Advantage Analysis

This strategy combines the advantages of multiple technical indicators and has the following advantages:

1. Ichimoku cloud itself contains trend judgment, combined with SMA moving averages can form a powerful trend judgment.

2. SMA moving averages itself can determine price trends and momentum. Fast MA crossing slow MA can determine trading points.

3. Adding closing price judgment can avoid unnecessary opening and closing of positions.

4. The calculation of moving average slope increases judgment on the momentum of moving average crossovers and can filter false crossovers.

5. Overall, this strategy has relatively accurate trend judgment, can reduce unnecessary trading, and has some room for optimization.

## Risk Analysis 

This strategy also has some risks:

1. Both Ichimoku and SMA may lag and fail to reflect price changes in time.

2. The combination of multiple conditions increases complexity and probability of errors.

3. The strategy is solely based on technical indicators and cannot judge the impact of major news.

4. The strategy does not set stop loss conditions, with the risk of enlarging losses. 

5. The strategy does not consider special market conditions such as consolidation. 

6. Improper parameter settings can also affect strategy performance.

## Optimization

This strategy can be optimized in the following aspects:

1. Set stop loss conditions to automatically stop loss when losses enlarge.

2. Increase judgment on major news events to avoid their impact.

3. Increase judgment on special market conditions such as increasing trading range or adjusting parameters.

4. Test and optimize parameter combinations to find optimal parameters.

5. Introduce machine learning algorithms for parameter optimization and market judgment.

6. Add momentum indicators to avoid false breakouts. 

7. Combine more fundamentals such as changes in volume.

## Conclusion

In summary, this SMA Ichimoku crossover strategy integrates the advantages of Ichimoku and SMA moving averages to form a relatively complete stock trading strategy. This strategy has strong ability to determine trends and can effectively capture trend opportunities. But there are also problems like lag, high complexity, lack of stop loss. This gives great room for optimizing this strategy. By setting stop loss, judging major news events, optimizing parameters and more, this strategy can be continuously improved to become a stable and reliable quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Conversion Line Periods|
|v_input_2|26|Base Line Periods|
|v_input_3|52|Lagging Span 2 Periods|
|v_input_4|26|Displacement|
|v_input_5|21|SMA LONG|
|v_input_6|19|SMA SHORT|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-15 00:00:00
end: 2023-10-15 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// strategy("Ichimoku+SMAsmoothed", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills= true, calc_on_every_tick=true, pyramiding=0)
// 
conversionPeriods = input(9, minval=1, title="Conversion Line Periods"),
basePeriods = input(26, minval=1, title="Base Line Periods")
laggingSpan2Periods = input(52, minval=1, title="Lagging Span 2 Periods"),
displacement = input(26, minval=1, title="Displacement")
SMA1=input(title="SMA LONG",defval=21)
SMA2=input(title="SMA SHORT",defval=19)
p=ohlc4[1]


donchian(len) => avg(lowest(len), highest(len))

conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

//plot(conversionLine, color=#0496ff, title="Conversion Line")
//plot(baseLine, color=#991515, title="Base Line")
//plot(close, offset = -displacement, color=#459915, title="Lagging Span")

//p1 = plot(leadLine1, offset = displacement, color=green,
// title="Lead 1")
//p2 = plot(leadLine2, offset = displacement, color=red, 
// title="Lead 2")
//fill(p1, p2, color = leadLine1 > leadLine2 ? green : red)

ma1=sma(p, SMA1)
ma2=sma(p, SMA2)
p_a = ma1*2
p_b = ma1
p_c = p_a - p_b
p_d = p_c/24
p_e = ma2*2
p_f = ma2
p_g = p_e - p_f
p_h = p_g/24

closelong = ohlc4<ohlc4[SMA1] and ohlc4<ohlc4[1]// and leadLine1<leadLine2 and p_h<p_d
if (closelong)
    strategy.close("Long")
closeshort = ohlc4>ohlc4[SMA1] and ohlc4>ohlc4[1]// and leadLine1>leadLine2 and p_h>p_d
if (closeshort)
    strategy.close("Short")

longCondition = ohlc4>ohlc4[1] and leadLine1>leadLine2 and p_h>p_d
if (longCondition)
    strategy.entry("Long",strategy.long)
shortCondition = ohlc4<ohlc4[1] and leadLine1<leadLine2 and p_h<p_d
if (shortCondition)
    strategy.entry("Short",strategy.short)
```

> Detail

https://www.fmz.com/strategy/429382

> Last Modified

2023-10-16 15:46:38
