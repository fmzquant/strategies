
> Name

基于月度买入日期的量化投资策略Quantitative-Investment-Strategy-Based-on-Monthly-Buy-Date

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d734e93039772d372.png)
[trans]

## 概述

本策略的核心思想是找到每月最佳的买入日期,通过在这个日期买入数字资产,并在月末卖出,来实现最优的投资回报。该策略适用于希望利用日内价格波动获得超额收益的投资者。

## 策略原理

该策略根据用户设置的每月买入日期和卖出日期运行。在买入日期当天开多单买入资产,如果设置了卖出日期,在卖出日期平仓;如果未设置卖出日期,则在策略结束日期当天平仓。这样可以测试每月不同买入日期带来的收益差异。

买入信号的判断逻辑是:如果是用户设置的买入日期,并且在策略生效日期范围内,则开多单。

平仓信号判断逻辑是:如果设置了卖出日期并且是卖出日期,平仓;如果未设置卖出日期但是超出了策略结束日期,也平仓。

## 策略优势

1. 可以找到每月价格波动最大的买入点,利用高频日内交易获得超额收益
2. 可以通过比较不同买入日期的收益规律找出最佳买入点
3. 可以结合当月新闻事件确定是否最佳买入日期会发生变化
4. 可以设置不同的卖出日期来实现短线和长线交易的平衡

## 策略风险及解决方案

1. 买入后价格暴跌的风险

   - 设置止损点,降低最大亏损
   - 选择流动性充足的交易对,避免极端价格波动

2. 最佳买入日期变化的风险

   - 监测历史数据变化,及时调整最佳买入点
   - 在高风险时期,减小头寸规模

3. 设置错误导致亏损的风险

   - 逐步测试不同参数,比较收益差异
   - 选择有代表性的时间范围进行测试

## 策略优化方向

1. 结合更多因素确定买入点

   - 考虑当月关键新闻事件对价格的影响 
   - 分析相关数字资产的价格走势
   - 增加机器学习模型判断最佳买入时机

2. 优化仓位管理机制

   - 设定止盈点动态平仓
   - 根据波动率调整头寸规模
   - 考虑跨期持仓

3. 扩展至其他交易市场

   - 应用于更多数字货币交易对
   - 应用于股票、外汇等市场
   - 设定跨市场套利交易策略

## 总结

本策略通过测试不同买入日期带来的收益差异,寻找每月价格波动最大的买入点。这可以为寻求日内高频交易获利的投资者带来超额收益。下一步通过引入更多判断买入时机的因素、优化仓位管理和扩展应用市场,可以进一步提升策略的稳定性和收益水平。

||

## Overview

The core idea of this strategy is to find the best buy date each month by buying digital assets on that date and selling them at the end of the month, in order to achieve optimal investment returns. This strategy is suitable for investors who want to obtain excess returns by taking advantage of intraday price fluctuations.

## Strategy Principle  

The strategy runs based on the user-defined monthly buy date and sell date. It goes long on the buy date by buying assets, and closes the position on the sell date if set. Otherwise, it closes the position on the strategy end date. This can test the profit difference from different monthly buy dates.

The logic for buy signal is: if it is the user-defined buy date and within the effective date range of the strategy, go long.  

The logic for close position signal is: if the sell date is set and it is the sell date now, close position; if no sell date but beyond strategy end date, also close position.

## Advantages of the Strategy

1. Can find the date of largest price fluctuation each month to obtain excess returns via high frequency intraday trading 
2. Can identify the optimal buy point by comparing profit patterns from different buy dates
3. Can determine if the optimal buy date changes based on key events of the month
4. Can balance short-term and long-term trading by setting different sell dates

## Risks and Solutions

1. Price crash risk after buying

   - Set stop loss to limit maximum loss
   - Choose assets with high liquidity to avoid extreme price swing

2. Change of optimal buy date

   - Monitor data change history and timely adjust optimal buy point  
   - Reduce position size during high risk periods

3. Loss caused by incorrect parameter setup

   - Test different parameters incrementally and compare profit difference
   - Select representative time range for test

## Optimization Directions  

1. Consider more factors in determining entry point

   - Consider impact of key news events of the month on price  
   - Analyze price trends of related digital assets
   - Add machine learning models to determine optimal timing  

2. Optimize position management mechanism  

   - Set dynamic take profit to close position  
   - Adjust position size based on volatility
   - Consider holding position across periods

3. Expand to other trading markets

   - Apply to more digital currency trading pairs
   - Apply to stocks, forex etc.
   - Set up cross-market arbitrage strategies

## Summary  

This strategy finds the date of largest intraday price swing each month by testing profit difference from different buy dates. It can bring excess returns for investors seeking profits from high frequency intraday trading. Further improvement on determining entry timing, position management and expanding application scope will enhance the stability and profitability of the strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_7|26|Entry Day|
|v_input_8|6|Exit Day|
|v_input_9|false|Close position on exit day?|
|v_input_1|true|(?Starting From)Start Date|
|v_input_2|true|Start Month|
|v_input_3|2021|Start Year|
|v_input_4|2|(?Until)End Date|
|v_input_5|10|End Month|
|v_input_6|2021|End Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © dennis.decoene

//@version=4
strategy(title="Buy and Hold, which day of month is best to buy?", overlay=true)

// Make input options that configure backtest date range
startDate = input(title="Start Date", type=input.integer,
     defval=1, minval=1, maxval=31, group="Starting From")
     
startMonth = input(title="Start Month", type=input.integer,
     defval=1, minval=1, maxval=12, group="Starting From")
     
startYear = input(title="Start Year", type=input.integer,
     defval=2021, minval=1800, maxval=2100, group="Starting From")

endDate = input(title="End Date", type=input.integer,
     defval=2, minval=1, maxval=31, group="Until")
endMonth = input(title="End Month", type=input.integer,
     defval=10, minval=1, maxval=12, group="Until")
endYear = input(title="End Year", type=input.integer,
     defval=2021, minval=1800, maxval=2100, group="Until")

entryday = input(title="Entry Day", type=input.integer,
     defval=26, minval=1, maxval=31, tooltip="When to enter (buy the asset) each month")
exitday = input(title="Exit Day", type=input.integer,
     defval=6, minval=1, maxval=31, tooltip="When to exit (sell the asset) each month")
     
useExitDay= input(title="Close position on exit day?", type=input.bool, defval=false, tooltip="Use the Exit Day to close each months position it true or close at the end of the period (if false)")
     
isEntryDay= (dayofmonth(time)==entryday)
isExitDay= (dayofmonth(time)==exitday-1)


inDateRange = true

if (isEntryDay and inDateRange)
    strategy.entry(id="Buy", long=true)
    
if (isExitDay and useExitDay)
    strategy.close_all()


// Exit open market position when date range ends
if (not inDateRange and not useExitDay)
    strategy.close_all()
     
```

> Detail

https://www.fmz.com/strategy/433097

> Last Modified

2023-11-24 14:10:23
