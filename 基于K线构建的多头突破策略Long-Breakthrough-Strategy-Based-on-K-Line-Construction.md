
> Name

基于K线构建的多头突破策略Long-Breakthrough-Strategy-Based-on-K-Line-Construction

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/984b88da5da1da1a25.png)
[trans]

## 概述

本策略通过设定简单的K线形态判断规则,实现对特斯拉4小时线的长仓突破交易。策略具有实现简单、逻辑清晰、容易理解等优点。

## 策略原理  

策略的核心判断逻辑基于如下4条K线形态规则:

1. 当前K线最低价低于开盘价 
2. 当前K线最低价低于上一根K线的最低价
3. 当前K线收盘价高于开盘价
4. 当前K线收盘价高于上一根K线的开盘价和收盘价

当同时满足以上4条规则时,进行做多方向的开仓操作。

此外,策略还设定了止损位和止盈位,当价格触发止盈或止损条件时,进行平仓操作。

## 优势分析

该策略具有以下一些优势:

1. 使用的K线判断规则非常简单和直接,容易理解,也容易实践。
2. 完全基于价格实体判断,没有使用过于复杂的技术指标,回测效果直接。
3. 实现代码量很小,运行效率高,容易进行优化和改进。
4. 可通过参数调整,自由设置止损止盈条件,控制风险。

## 风险分析  

需要注意的风险主要有:  

1. 使用固定数量开仓,没有考虑仓位管理,可能存在超量交易的风险。
2. 没有设置过滤器,在震荡行情中可能会产生过多无效交易。 
3. 回测数据不足,可能对策略效果判断产生偏差。

可通过如下方法减轻风险:

1. 加入仓位管理模块,根据资金规模动态调整交易数量。
2. 增加交易过滤条件,避免在震荡盘中无序开仓。
3. 收集更多历史数据,扩大回测时间长度,提高结果可靠性。

## 优化方向  

该策略可优化的方向包括:

1. 增加仓位管理模块,根据资金使用比例确定交易规模。
2. 设计止损止盈追踪机制,实现弹性出场。
3. 增加交易过滤模块,避免无效交易。
4. 利用机器学习方法自动优化参数。
5. 支持多品种套利交易。

## 总结

本策略通过简单的K线形态判断规则实现做多突破交易,虽然存在一定改进空间,但从简单性和直接性考量,该策略是一个非常适合初学者理解和使用的长仓策略。通过不断优化,可以使策略效果更加出色。

|| 

## Overview  

This strategy realizes long position breakout trading on the 4-hour line of Tesla by setting simple K-line pattern judgment rules. The strategy has the advantages of simple implementation, clear logic, easy to understand, etc.

## Strategy Principle 

The core judgment logic of the strategy is based on the following 4 K-line pattern rules:  

1. The lowest price of the current K-line is lower than the opening price  
2. The lowest price of the current K-line is lower than the lowest price of the previous K-line  
3. The closing price of the current K-line is higher than the opening price 
4. The closing price of the current K-line is higher than the opening price and closing price of the previous K-line  

When all 4 rules are met at the same time, a long position opening operation is performed.  

In addition, the strategy also sets stop loss and take profit to close positions when price triggers stop loss or take profit conditions.  

## Advantage Analysis   

The strategy has the following advantages:  

1. The K-line judgment rules used are very simple and straightforward, easy to understand, and easy to practice.
2. It is completely based on the judgment of price entities without the use of overly complex technical indicators, and the backtest results are straightforward.  
3. The code implementation is small in size, runs efficiently, and is easy to optimize and improve.
4. Stop loss and take profit can be flexibly set by adjusting parameters to control risks.   

## Risk Analysis   

The main risks to note are:   

1. Fixed quantity is used for opening positions without considering position sizing, which may pose risks of overtrading.  
2. No filters are set which may generate too many invalid trades in range-bound markets.
3. Insufficient backtest data may bias the judgment of the strategy performance.   

The following methods can be adopted to mitigate risks:  

1. Incorporate position sizing model to dynamically adjust trade size based on capital size.   
2. Add trade filters to avoid disorderly opening of trades in choppy market conditions. 
3. Collect more historical data to expand backtest duration and improve result reliability.  

## Optimization Directions   

Potential optimization directions for the strategy include:  

1. Incorporate position sizing module to determine trade size based on capital utilization ratio.    
2. Design stop loss and take profit trailing mechanisms for flexible exits.  
3. Add trade filters to avoid invalid trades.
4. Auto-optimize parameters using machine learning methods.  
5. Support spread trading across multiple products.   

## Conclusion  

This strategy realizes long breakthrough trading using simple K-line pattern rules. Although there is some room left for improvement, from the perspective of simplicity and directness, it is a very suitable long position strategy for beginners to understand and use. With continuous optimizations, the strategy performance can be further enhanced.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|true|Start Date|
|v_input_int_2|true|Start Month|
|v_input_int_3|2017|Start Year|
|v_input_int_4|8|End Date|
|v_input_int_5|3|End Month|
|v_input_int_6|2022|End Year|
|v_input_1|4|TakeProfit_long|
|v_input_2|4|StopLoss_long|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TheQuantScience

//@version=5
strategy("SimpleBarPattern_LongOnly", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, currency = currency.EUR, initial_capital = 1000, commission_type = strategy.commission.percent, commission_value = 0.03)

// Make input options that configure backtest date range
startDate = input.int(title="Start Date",
     defval=1, minval=1, maxval=31)
startMonth = input.int(title="Start Month",
     defval=1, minval=1, maxval=12)
startYear = input.int(title="Start Year",
     defval=2017, minval=1800, maxval=2100)

endDate = input.int(title="End Date",
     defval=8, minval=1, maxval=31)
endMonth = input.int(title="End Month",
     defval=3, minval=1, maxval=12)
endYear = input.int(title="End Year",
     defval=2022, minval=1800, maxval=2100)
     
// Look if the close time of the current bar
// Falls inside the date range
inDateRange = true

// Setting Conditions 
ConditionA = low < open 
ConditionB = low < low[1]
ConditionC = close > open
ConditionD = close > open[1] and close > close[1]

FirstCondition = ConditionA and ConditionB 
SecondCondition = ConditionC and ConditionD
IsLong = FirstCondition and SecondCondition

TakeProfit_long = input(4.00)
StopLoss_long = input(4.00)
Profit = TakeProfit_long*close/100/syminfo.mintick
Loss = StopLoss_long*close/100/syminfo.mintick

EntryCondition = IsLong and inDateRange

// Trade Entry&Exit Condition 
if EntryCondition and strategy.opentrades == 0
    strategy.entry(id = 'Open_Long', direction = strategy.long)
    strategy.exit(id = "Close_Long", from_entry = 'Open_Long', profit = Profit, loss = Loss)






```

> Detail

https://www.fmz.com/strategy/437751

> Last Modified

2024-01-05 12:37:46
