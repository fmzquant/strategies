
> Name

基于一目均衡表的止损策略Ichimoku-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/da15689e4d2691579d.png)

[trans]


## 概述

该策略基于一目均衡表指标,结合止损单开发出的趋势跟踪策略。利用一目均衡表的转换线、基准线和延迟线这三条曲线构成的云带,判断价格趋势方向,并以云带上下边缘为止损位,设定止损单进行趋势跟踪。

## 策略原理

该策略主要基于以下原理:

1. 一目均衡表中的转换线是过去9天的最高价和最低价的均值,反映最近期价格的平均变化。

2. 基准线是过去26天的最高价和最低价的均值,反映中期价格的平均变化。

3. 延迟线是过去52天的最高价和最低价的均值,反映长期价格的平均变化。

4. 转换线和基准线的均值构成领先线1,延迟线构成领先线2,两条领先线之间形成云带,云带上沿和下沿可判断趋势方向。

5. 当价格上穿云带时,开仓做多;当价格下穿云带时,开仓做空。

6. 以云带上沿和下沿为止损位,设置止损单,跟踪价格趋势。

具体来说,策略中定义了一目均衡表的三条曲线,通过计算它们的均值得到领先线1和领先线2。然后根据价格突破云带的上下边界判断趋势方向。在开仓做多做空后,以云带上下边界价格为止损位设置止损单,实现趋势跟踪止损。

## 优势分析

该策略具有以下优势:

1. 使用一目均衡表判断趋势方向准确可靠。一目均衡表综合多个周期价格的信息,能有效过滤市场噪音,判断趋势。

2. 止损位设置合理。以云带上下边界为止损位,既能确保止损范围合理,也能充分跟踪趋势。

3. 策略稳定可靠。一目均衡表本身具有滤波噪音的能力,结合止损单可有效控制风险。

4. 可按需要灵活调整参数。转换线、基准线和延迟线周期可根据市场调整,实现对不同周期的适应。

5. 策略思路清晰易于理解。基于趋势跟踪思路设计,容易掌握使用。

## 风险分析

该策略也存在以下风险:

1. 突破止损风险。当价格出现剧烈波动时,可能触发止损单,退出原有盈利头寸。

2. 震荡行情不适用。当价格处于长时间震荡行情时,止损单容易被频繁触发,造成交易过于密集。

3. 参数设置风险。转换线、基准线和延迟线周期设置不当,可能导致止损范围过大或过小。

4. 期货交易滑点成本风险。频繁开平仓导致的滑点成本可能影响交易盈利。

5. 程序化交易风险。停机、网络中断、程序bug等可能影响交易执行。

针对上述风险,可以采取以下应对措施:优化参数设置,调整止损算法,提高服务器稳定性,做好风控,严格测试程序。

## 优化方向 

该策略可以从以下方面进行优化:

1. 优化参数设置。可以测试不同周期参数的组合,找到最佳参数。

2. 优化止损算法。可以研究移动止损、振荡止损等算法,降低止损被触发概率。

3. 结合多个指标判断。可以加入更多指标,如MACD、KDJ等,提高决策准确性。

4. 增加自动关闭亏损单功能。避免亏损扩大。

5. 加入重新入场机制。在止损退出后,可以考虑重新入场。

6. 优化资金管理。可以研究动态仓位调整,让盈利能更好发挥作用。

## 总结

总体来说,该策略思路清晰,利用一目均衡表判断趋势方向,并以云带上下边界进行趋势跟踪止损,可以有效控制风险,具有较强的实用性。但也存在一定的风险,需要优化参数设置、止损算法等,并做好风控,才能在实盘中稳定获得收益。该策略为我们提供了一个基于趋势跟踪思路设计止损策略的良好范例。



||



## Overview

This strategy is a trend following strategy developed using Ichimoku Cloud and stop orders. It utilizes the conversion line, base line and lagging span of the Ichimoku Cloud to determine the trend direction and sets stop orders at the upper and lower edges of the cloud bands for stop loss.

## Strategy Logic

The strategy is based on the following principles:

1. The conversion line is the average of the highest and lowest prices over the past 9 days, reflecting recent average price changes. 

2. The base line is the average of the highest and lowest prices over the past 26 days, reflecting medium-term average price changes.

3. The lagging span is the average of the highest and lowest prices over the past 52 days, reflecting long-term average price changes.

4. The average of the conversion and base lines forms the leading span 1, and the lagging span forms the leading span 2. The area between the two leading spans forms the cloud bands. The upper and lower edges of the cloud bands indicate trend direction.

5. When price breaks above the cloud bands, go long. When price breaks below the cloud bands, go short.

6. Set stop loss orders at the upper and lower edges of the cloud bands to follow the trend.

Specifically, the strategy defines the three Ichimoku lines, calculates their averages to get the leading span 1 and 2. It then determines the trend direction based on price breaking through the upper or lower cloud band boundaries. After taking long or short positions, it sets stop loss orders based on the cloud band prices to follow the trend with stop loss in place.

## Advantage Analysis 

The advantages of this strategy are:

1. Ichimoku Cloud reliably determines trend direction by incorporating price information from multiple timeframes, filtering out market noise.

2. Stop loss placement is reasonable. Using the cloud band edges allows for proper stop loss range and good trend following.

3. The strategy is stable and reliable. Ichimoku Cloud filters noise and stop loss controls risk. 

4. Flexible parameter adjustment. Conversion, base, and lagging span periods can be adjusted for market adaptation.

5. Clear logic and easy to understand. Trend following approach makes it easy to grasp.

## Risk Analysis

The risks of the strategy include:

1. Stop loss breakout risk. Volatile price moves may trigger stop loss and exit profitable positions.

2. Whipsaws in ranging markets. Frequent stop loss triggers lead to overtrading. 

3. Parameter risk. Improper settings of conversion, base and lagging spans may cause stop loss range to be too wide or narrow.

4. Slippage cost in futures. Frequent orders may lead to excessive slippage costs affecting profits.

5. Algorithmic trading risks. Downtime, network issues, bugs may affect trade execution.

To address these risks, optimization of parameters, stop loss algorithms, improving server stability, proper risk management, and thorough strategy testing should be undertaken.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize parameter settings by testing different period combinations to find optimal values.

2. Improve stop loss algorithms with trailing stops, volatility stops etc to reduce stop loss triggers.

3. Incorporate additional indicators like MACD, KDJ to improve decision making. 

4. Add automatic loss closure functionality to limit losses.

5. Implement re-entry mechanism after stop loss exit.

6. Optimize money management through dynamic position sizing.

## Conclusion

Overall, the strategy has clear logic, uses Ichimoku Cloud for trend direction and cloud bands for stop loss trailing, effectively controlling risk and having practical utility. But risks exist so parameters, stop loss algorithms must be optimized and proper risk controls implemented for stable live trading profits. It provides a good example of designing stop loss strategies based on trend following principles.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|9|Conversion Periods|
|v_input_4|26|Base Periods|
|v_input_5|52|Lagging Span|
|v_input_6|1900|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-27 00:00:00
end: 2023-11-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title = "Noro's Ichimoku Stop Strategy", shorttitle = "Ichimoku Stop Strategy", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
conversionPeriods = input(9, minval = 1, title = "Conversion Periods")
basePeriods = input(26, minval = 1, title = "Base Periods")
laggingSpan2Periods = input(52, minval = 1, title = "Lagging Span")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Ichimoku
donchian(len) => avg(lowest(len), highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)

//Cloud
p1 = plot(leadLine1, offset = basePeriods, color=color.green, title="Lead 1", transp = 100)
p2 = plot(leadLine2, offset = basePeriods, color=color.red, title="Lead 2", transp = 100)
fill(p1, p2)

//Signals
max = max(leadLine1[basePeriods], leadLine2[basePeriods])
min = min(leadLine1[basePeriods], leadLine2[basePeriods])
up = low > max
dn = high < min

if max > 0
    strategy.entry("Long", strategy.long, needlong ? na : 0, stop = max)
    strategy.entry("Short", strategy.short, needshort ? na : 0, stop = min)
```

> Detail

https://www.fmz.com/strategy/431007

> Last Modified

2023-11-03 17:05:40
