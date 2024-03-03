
> Name

金叉死叉双均线MACD趋势追踪策略Golden-Cross-Dead-Cross-Dual-Moving-Average-MACD-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e5a063bb429afb6d1d.png)
[trans]

## 概述

该策略通过计算快速移动平均线、慢速移动平均线、MACD指标,实现对价格趋势的判断,构建金叉死叉交易信号,并结合止盈止损追踪止损来锁定利润,实现对趋势的持续追踪。

## 策略原理

该策略主要基于三个指标进行构建。

首先,计算快速移动平均线和两个慢速移动平均线。当快速移动平均线上穿两个慢速移动平均线时生成买入信号;当快速移动平均线下穿两个慢速移动平均线时生成卖出信号。这样可以判断价格的短期趋势和长期趋势的关系,实现金叉死叉交易。

其次,计算MACD指标,包括MACD线、信号线和直方图。当MACD直方图>0时为多头指标;当MACD直方图<0时为空头指标。这样辅助判断金叉死叉信号的可靠性。

最后,结合止盈止损追踪止损机制。采用止盈点和止损点来锁定利润和控制风险;采用追踪止损来跟踪利润。

## 策略优势

该策略具有以下优势:

1. 金叉死叉结合MACD指标,可靠判断价格趋势;
2. 停损点设置防止亏损扩大;
3. 追踪止损自动移动,持续锁定利润,最大限度获取趋势收益;
4. 参数设置灵活,可自定义移动平均线周期等。

## 策略风险

该策略也存在一些风险:

1. 价格震荡时,可能出现止损被触发的风险;
2. 长期运行追踪止损需要持续监控,及时调整;
3. 参数设置不当可能导致交易频繁或漏单。

对应风险的解决方法:

1. 合理设定止损点,防止不必要的止损;
2. 定期检查和优化参数设置;
3. 人工干预和状态监控。

## 策略优化方向 

该策略还可以从以下几个方面进行优化:

1. 增加更多指标判断,如RSI等,使信号更加可靠;
2. 优化移动平均线参数,使其更符合不同品种的特点;
3. 增加止盈止损动态追踪算法,让止盈止损可以根据市场变化;
4. 增加开仓次数、仓位控制等资金管理模块。

## 总结

该策略整体来说是一个利用金叉死叉与MACD指标判断趋势,实现追踪止损的简单有效策略。优点是实现了趋势跟踪和利润锁定,可自定义性较强,适用于多种品种,是一种通用型的参数优化型策略。存在一定的风险和可优化空间,但总体而言是一种可靠实用的交易策略。

||

## Overview

This strategy judges the price trend through calculating the fast moving average, slow moving average, and MACD indicator, and constructs the golden cross and dead cross trading signals. It also combines take profit, stop loss and trailing stop loss to lock in profits and continuously track the trend.

## Strategy Logic

This strategy is mainly constructed based on three indicators. 

Firstly, it calculates the fast moving average and two slow moving averages. When the fast MA goes above the two slow MAs, a buy signal is generated. When the fast MA goes below the two slow MAs, a sell signal is generated. This judges the relationship between the short-term and long-term trends to realize golden cross and dead cross trading.

Secondly, it calculates the MACD indicator, including MACD line, signal line and histogram. When MACD histogram > 0, it is a bullish indicator; when MACD histogram < 0, it is a bearish indicator. This helps to judge the reliability of golden cross and dead cross signals.   

Finally, it incorporates the take profit, stop loss and trailing stop loss mechanisms. Take profit and stop loss points are used to lock in profits and control risks; trailing stop loss is used to keep tracking profits.

## Advantages

The advantages of this strategy include:

1. Golden cross, dead cross combined with MACD reliably judge price trend. 
2. Stop loss points prevent enlarged losses.
3. Trailing stop loss moves automatically to lock in profits continuously and maximize trend profits.
4. Flexible parameter settings like customized moving average periods.

## Risks

There are also some risks:  

1. Price shocks may trigger stop loss points.  
2. Long-term running of trailing stop loss needs continuous monitoring and timely adjustment.
3. Improper parameter settings may lead to overtrading or missing trades.

The solutions are:

1. Set proper stop loss points to prevent unnecessary stop loss.
2. Regularly check and optimize parameter settings.  
3. Manual intervention and status monitoring.

## Optimization Directions

The strategy can also be optimized from the following aspects:

1. Add more indicators like RSI to make signals more reliable.
2. Optimize moving average parameters to suit different trading instruments. 
3. Add dynamic trailing stop algorithms to make stop points change with market.
4. Add position sizing and risk management modules.

## Summary

In summary, this is a simple yet effective strategy that uses golden cross, dead cross and MACD to judge trend and realize trailing stop loss. The advantages are trend tracking and profit locking with high customizability. It is a universal parameter optimization strategy suitable for different trading instruments. There are still some risks and optimization space, but overall it is a reliable and practical trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|5|Fast MA Period|
|v_input_3_low|0|Slow MA1 Source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|85|Slow MA Period|
|v_input_5_low|0|Slow MA2 Source: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|75|Slow MA Period|
|v_input_7|12|Fast MACD Period|
|v_input_8|26|Slow MACD Period|
|v_input_9|9|SMA MACD Period|
|v_input_10|30|Take Profit|
|v_input_11|10|Stop Loss|
|v_input_12|5|Trailing Stop Loss|
|v_input_13|false|Trailing Stop Loss Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-14 00:00:00
end: 2023-12-21 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy('The Puria Method', shorttitle = 'Puria',overlay = true)

//=== GENERAL INPUTS ===

// short ma
maFastSource   = input(defval = close, title = "Fast MA Source")
maFastLength   = input(defval = 5, title = "Fast MA Period", minval = 1)

// long ma 1
maSlow1Source   = input(defval = low, title = "Slow MA1 Source")
maSlow1Length   = input(defval = 85, title = "Slow MA Period", minval = 1)

// long ma 2
maSlow2Source   = input(defval = low, title = "Slow MA2 Source")
maSlow2Length   = input(defval = 75, title = "Slow MA Period", minval = 1)

//macd
macdFastLength   = input(defval = 12, title = "Fast MACD Period", minval = 1)
macdSlowLength   = input(defval = 26, title = "Slow MACD Period", minval = 1)
macdSmaLength   = input(defval = 9, title = "SMA MACD Period", minval = 1)

// the risk management inputs
inpTakeProfit   = input(defval = 30, title = "Take Profit", minval = 0)
inpStopLoss     = input(defval = 10, title = "Stop Loss", minval = 0)
inpTrailStop    = input(defval = 5, title = "Trailing Stop Loss", minval = 0)
inpTrailOffset  = input(defval = 0, title = "Trailing Stop Loss Offset", minval = 0)

// if an input is less than 1, assuming not wanted so we assign 'na' value to disable it.
useTakeProfit   = inpTakeProfit  >= 1 ? inpTakeProfit  : na
useStopLoss     = inpStopLoss    >= 1 ? inpStopLoss    : na
useTrailStop    = inpTrailStop   >= 1 ? inpTrailStop   : na
useTrailOffset  = inpTrailOffset >= 1 ? inpTrailOffset : na

// === SERIES SETUP ===
maFast = ema(maFastSource, maFastLength)
maSlow1 = wma(maSlow1Source, maSlow1Length)
maSlow2 = wma(maSlow2Source, maSlow2Length)
[_, signal, histLine] = macd(close, macdFastLength, macdSlowLength, macdSmaLength)

// === PLOTTING ===
fast = plot(maFast, title = "Fast MA", color = green, linewidth = 2, style = line, transp = 50)
slow1 = plot(maSlow1, title = "Slow MA1", color = red, linewidth = 2, style = line, transp = 50)
slow2 = plot(maSlow2, title = "Slow MA2", color = red, linewidth = 2, style = line, transp = 50)

// === LOGIC ===
signalUp = crossover(maFast, maSlow1) and crossover(maFast, maSlow2) and histLine > 0
signalDown = crossunder(maFast, maSlow1) and crossunder(maFast, maSlow2) and histLine < 0

// ===STRATEGY===
strategy.entry(id = "Long", long = true, when = signalUp) 
strategy.entry(id = "Short", long = false, when = signalDown)
strategy.exit("Exit Long", from_entry = "Long", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
strategy.exit("Exit Short", from_entry = "Short", profit = useTakeProfit, loss = useStopLoss, trail_points = useTrailStop, trail_offset = useTrailOffset)
```

> Detail

https://www.fmz.com/strategy/436241

> Last Modified

2023-12-22 14:17:34
