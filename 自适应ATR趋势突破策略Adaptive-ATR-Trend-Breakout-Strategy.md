
> Name

自适应ATR趋势突破策略Adaptive-ATR-Trend-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16bbc07bdeb375ea887.png)

[trans]

## 概述

该策略是一个基于ATR指标的趋势突破策略。它的主要思想是当价格超过一定倍数的ATR时,进行趋势突破操作。策略同时包含趋势的确认以及利用日期范围进行限制交易的功能。

## 原理

策略使用ATR指标判断价格波动幅度。ATR表示平均真实波幅,它测量某一时间周期内的平均价格波动幅度。策略中设置length参数计算ATR周期,numATRs参数表示突破的ATR倍数。

当价格上涨突破上方numATRs倍ATR时,进行做多操作;当价格下跌突破下方numATRs倍ATR时,进行做空操作。

此外,策略加入需要长仓(needlong)和需要做空(needshort)的BOOL变量,可以控制只做多或只做空。策略还设置了日期范围,只在指定日期之间进行交易,从而实现时间范围限制。

策略使用size变量判断仓位,根据仓位情况计算下单手数。手数按照账户权益的百分比计算。

## 优势

- 使用ATR指标自动适应市场波动率,无须人工设置止损止盈距离
- 可灵活选择做多做空或只做多/空
- 可设定日期范围进行交易,避开重要时间点
- 手数设置灵活,可按账户权益百分比下单

## 风险及解决

- ATR指标仅考虑价格波动,如果行情出现剧烈变化,止损距离可能太小,需要组合其他指标优化
- 日期范围限制交易时,如果重要时间段前后没有合适机会,可能导致错失交易机会,可以适当扩大日期范围
- 使用账户权益比例下单时,需要合理设置比例,避免单笔损失过大

## 优化思路

- 可以考虑加入移动平均线等趋势指标,以过滤掉非趋势突破带来的噪声交易
- 可以测试不同的ATR周期参数,选取最佳参数组合
- 可以考虑与其他策略组合使用,发挥各自优势,改善策略稳定性

## 总结

本策略整体思路清晰易懂,使用ATR指标自动适应市场波动性,是一种通用的趋势跟踪策略。通过参数优化以及组合其他策略,可以进一步改善策略表现和稳定性。但需要注意防止单笔损失过大,并留意行情剧烈变化时的止损不足问题。

||


## Overview

This strategy is a trend breakout strategy based on the ATR indicator. Its main idea is to take trend breakout trades when the price exceeds a certain multiple of ATR. The strategy also includes trend confirmation and limiting trades within date ranges.

## Principle 

The strategy uses the ATR indicator to measure price volatility. ATR stands for Average True Range and it measures the average volatility over a period. The length parameter in the strategy calculates the ATR period and numATRs represents the ATR multiplier for breakout.

When the price breaks out above the upper numATRs multiple of ATR, a long position is taken. When the price breaks below the lower numATRs multiple of ATR, a short position is taken.

In addition, the strategy includes needlong and needshort bool variables to control only long or only short trades. It also sets date ranges to limit trading within specified dates. 

The strategy uses a size variable to determine position size and calculates order size based on percentage of account equity.

## Advantages

- Uses ATR to automatically adapt to market volatility without manual profit/loss settings.

- Flexible to choose long, short or long/short only. 

- Can set date ranges to avoid trading at important events.

- Flexible position sizing based on account equity percentage.

## Risks and Solutions

- ATR only considers price volatility. It may have insufficient stop loss during huge market swings. Other indicators can be combined.

- Date range limits may miss opportunities if no good setups before/after. Can expand date range slightly.  

- Equity percentage sizing risks large losses on single trades. Reasonable percentages needed.

## Optimization Ideas

- Add moving averages for trend filter to reduce false breakout noise trades.

- Test ATR periods to find optimal parameters.

- Combine with other strategies to utilize strengths and improve stability.

## Conclusion

This is an understandable trend following strategy using ATR to adapt to volatility. Parameter optimization and combining with other strategies can further improve performance and stability. But large single-trade losses should be avoided and insufficient stops during huge swings must be noted.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|100|Lot, %|
|v_input_4|5|length|
|v_input_5|0.75|numATRs|
|v_input_6|1900|From Year|
|v_input_7|2100|To Year|
|v_input_8|true|From Month|
|v_input_9|12|To Month|
|v_input_10|true|From day|
|v_input_11|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's Volty Strategy v1.0", shorttitle = "Volty 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 100)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
length = input(5)
numATRs = input(0.75)
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Indicator
atrs = sma(tr, length) * numATRs

//Trading
size = strategy.position_size
lot = 0.0
lot := size == 0 ? strategy.equity / close * capital / 100 : lot[1]
if (not na(close[length])) and needlong
    strategy.entry("L", strategy.long, lot, stop = close + atrs, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
if (not na(close[length])) and needlong == false
    strategy.entry("L", strategy.long, 0, stop = close + atrs, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
if (not na(close[length])) and needshort
    strategy.entry("S", strategy.short, lot, stop = close - atrs, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
if (not na(close[length])) and needshort == false
    strategy.entry("S", strategy.short, 0, stop = close - atrs, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
```

> Detail

https://www.fmz.com/strategy/430681

> Last Modified

2023-10-31 15:58:46
