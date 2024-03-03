
> Name

突破追踪策略Breakthrough-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11c248c27f93420e8d0.png)

[trans]

## 概述
该策略是针对银行指数和指数的5分钟K线设计的突破追踪策略。它可以在突破发生时产生信号,进行买入或卖出操作。

## 策略原理
该策略通过计算最高价和最低价指标,判断价格是否突破最高价最低价区间。如果价格突破该区间,会产生买入信号或卖出信号。为了过滤掉部分噪音,它还使用了辅助指标进行确认。

优势分析:
1. 该策略响应迅速,可以在突破发生时立即进入市场。
2. 通过高低价区间和辅助指标进行双重过滤,可以避免部分假突破。 
3. 该策略非复制指标,不会产生滞后。

风险分析:
1. 如果行情出现巨幅震荡,该策略可能会产生反向信号,导致亏损。
2. 单纯的突破策略容易被套,需要警惕突破失败的情况。

优化方向:
1. 可以结合趋势指标,避免逆势操作。
2. 可以加入止损机制,控制单笔亏损。

## 总结
该策略通过判断价格突破高低价区间的方式寻找交易机会。它响应迅速,避免滞后,但也面临突破失败、被套等风险。通过优化,可以使该策略在趋势行情中获取更好的效果。

||


## Overview
This strategy is designed for 5-minute K-lines of bank indices and indices to track breakthroughs. It can generate signals when breakthroughs occur for buy or sell operations.

## Strategy Principle  
This strategy calculates the highest and lowest price indicators to judge if the price breaks through the highest and lowest price range. If the price breaks through this range, it will generate buy or sell signals. To filter out some noise, it also uses auxiliary indicators for confirmation.

Advantage Analysis:
1. This strategy responds quickly and can enter the market immediately when a breakthrough occurs.  
2. By double filtering through the high and low price range and auxiliary indicators, some false breakthroughs can be avoided.
3. This strategy has no lagging as it has non-repetitive indicators.

Risk Analysis: 
1. If there is a huge swing in the market, this strategy may generate reverse signals, leading to losses.  
2. Simple breakthrough strategies are easy to fall into traps and need to be wary of breakthrough failures.   

Optimization Directions:
1. Trend indicators can be combined to avoid reverse operations.
2. A stop-loss mechanism can be added to control single losses.  

## Summary 
This strategy looks for trading opportunities by judging whether prices break through the high and low price range. It responds quickly and avoids lagging but also faces risks such as breakthrough failures and traps. Through optimization, this strategy can achieve better performance in trending markets.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|26|LookBack|
|v_input_3|10|length|
|v_input_4|true|length2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="MARKET DYNAMICS HH LL BREAKOUT", shorttitle="BREAKOUT STRATEGY", overlay=true)

////


//Higher High or Lower Low Entry Inputs
price = input(close)
LookBack = input(26)
Highest = highest(LookBack)
Lowest = lowest(LookBack)

long = price > Highest[1] 
short = price < Lowest[1]




//Safety Confirmation Inputs - Helps to thin out false breakouts or break downs
length = input(10)
High_Guard = highest(length)
Low_Guard = lowest(length)
length2 = input(1)

long1 = long == 1 and Highest[1] > High_Guard[length2]
short1 = short == 1 and Lowest[1] < Low_Guard[length2]


strategy.entry("Long", strategy.long, when=long1)
strategy.entry("Short", strategy.short, when=short1)

```

> Detail

https://www.fmz.com/strategy/437746

> Last Modified

2024-01-05 12:00:25
