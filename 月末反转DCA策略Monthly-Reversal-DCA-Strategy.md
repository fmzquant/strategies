
> Name

月末反转DCA策略Monthly-Reversal-DCA-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

本策略的目的是识别资产的短期下跌趋势结束点,在那个点固定投入一定金额购买资产。这样可以在资产反转开始后以较低的成本价格固定定投。

## 原理

该策略基于月时间框架操作。每月有240个1小时K线,用于判断趋势反转的时机。 

具体来说,策略通过计算EMA快线和EMA慢线的差值EMA\_CD以及EMA\_CD的信号线,当快线上穿信号线时,判断短期下跌趋势结束,发出买入信号。

在买入信号发出后,策略会在当月月末平仓。然后第二个月再重复这个过程,定期买入并持有一个月的时间。

这样可以让我们在短期下跌结束的时候低吸,并且固定定投。

## 优势

这种策略最大的优势是可以过滤震荡行情,只在趋势反转点买入,从而以较优的价格固定定投。

另外,采用EMA判断趋势反转点,可以比仅仅根据K线反转来判断更加稳定和准确。EMA能抹平短期市场噪音对买入时机的影响。

最后,月末设置止损可以锁定每个月的投资业绩,限制单月最大亏损。

## 风险

该策略最大的风险在于买入后价格继续下跌,导致月末止损亏损。这种情况通常是判断反转失误造成的。 

可以通过调整EMA周期参数来优化判断,或者结合其他指标如RSI来确认反转信号。

另一个风险是止损点设置。止损点过小容易被短期波动止损,过大又限制不了损失。需要测试不同止损点来找到最优参数。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化EMA周期参数,找到判断趋势反转最优参数组合

2. 增加其他指标过滤,如RSI,获确认反转信号

3. 测试不同的止损点,找到最大限制亏损和不被套利的最优止损位置

4. 可以考虑在止损基础上加入移动止损,根据价格实时调整止损位置

5. 可以测试不同时间周期,如日线、周线操作,看哪个周期该策略效果最好

## 总结

本策略整体思路清晰简单,通过EMA指标判断短期趋势反转,并在反转点月末定投,可以有效过滤震荡市场,以较低价格定投。策略优化空间主要在参数优化和止损策略调整。总体来说,该策略는一种固定资产配置的优秀策略思路,值得进一步测试优化。

||

## Overview

The purpose of this strategy is to identify the reversal points of short-term downtrends of assets, and invest a fixed amount of money at those points. This allows fixed dollar cost averaging (DCA) at relatively lower prices after the start of uptrends.

## Principles 

This strategy operates on a monthly timeframe. There are 240 1-hour bars in each month, which are used to determine the timing of trend reversals.

Specifically, the strategy calculates the difference between fast EMA and slow EMA (EMA_CD), as well as the signal line of EMA_CD. When the fast line crosses above the signal line, it determines the end of a short-term downtrend and triggers a buy signal.

After the buy signal, the strategy will close all positions at the end of the month. Then the process repeats itself the next month, with fixed periodic buying and holding for one month.

This allows us to bottom-fish at the end of short-term declines, and dollar cost average at fixed intervals.

## Advantages

The biggest advantage of this strategy is that it can filter out range-bound markets and only buy at trend reversal points, thus dollar cost averaging at relatively better prices.

Also, using EMA to determine reversal points can be more stable and accurate compared to only looking at candlestick reversals. EMA can smooth out short-term market noise that affects entry timing.

Finally, the monthly stop loss locks in performance for each month's investment, limiting maximum loss per month.

## Risks

The biggest risk of this strategy is that prices continue to decline after buying, leading to stop loss at month end. This is usually caused by incorrect reversal identification.

We can optimize the parameters of EMA to improve identification, or combine other indicators like RSI to confirm reversal signals.

Another risk is the stop loss level. A stop loss that's too tight can get stopped out by short-term fluctuations easily. A stop loss that's too wide fails to limit losses. The optimal parameter needs to be found through testing different stop loss levels.

## Enhancement Opportunities 

The strategy can be improved in the following areas:

1. Optimize EMA periods to find the optimal parameter combination for identifying reversals.

2. Add other filters like RSI to confirm reversal signals.

3. Test different stop loss levels to find the optimal point that maximizes loss prevention without getting whipsawed. 

4. Consider adding trailing stop on top of stop loss to adjust stop level dynamically based on price.

5. Test different timeframes like daily or weekly to see which performs best for this strategy.

## Conclusion

The overall idea of this strategy is simple and clear - using EMA to identify short-term trend reversals, and dollar cost average at reversal points monthly. It can effectively filter out choppy markets and invest at relatively low prices. The optimization space lies mostly in parameter tuning and stop loss techniques. Overall this is an excellent strategy concept for fixed asset allocation, worth further testing and enhancement.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Start year|
|v_input_2|true|Start month|
|v_input_3|true|Start day|
|v_input_4|2050|end year|
|v_input_5|true|end month|
|v_input_6|true|end day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-10-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BHD_Trade_Bot

// @version=5
// strategy(
//  shorttitle            = 'DCA After Downtrend',
//  title                 = 'DCA After Downtrend (by BHD_Trade_Bot)',
//  overlay               = true,
//  calc_on_every_tick    = true,
//  calc_on_order_fills   = true,
//  use_bar_magnifier     = true,
//  pyramiding            = 100,
//  initial_capital       = 0,
//  default_qty_type      = strategy.cash,
//  default_qty_value     = 1000,
//  commission_type       = strategy.commission.percent,
//  commission_value      = 0.1)



// Backtest Time Period
start_year   = input(title='Start year'   ,defval=2017)
start_month  = input(title='Start month'  ,defval=1)
start_day    = input(title='Start day'    ,defval=1)
start_time   = timestamp(start_year, start_month, start_day, 00, 00)

end_year     = input(title='end year'     ,defval=2050)
end_month    = input(title='end month'    ,defval=1)
end_day      = input(title='end day'      ,defval=1)
end_time     = timestamp(end_year, end_month, end_day, 23, 59)

window() => true



// EMA
ema50 = ta.ema(close, 50)
ema200 = ta.ema(close, 200)

// EMA_CD
emacd = ema50 - ema200
emacd_signal = ta.ema(emacd, 20)
hist = emacd - emacd_signal

// Count n candles after x long entries
var int nPastCandles = 0
var int entryNumber = 0
nPastCandles := nPastCandles + 1



// ENTRY CONDITIONS

// 8 hours per day => 240 hours per month
entry_condition1 = nPastCandles > entryNumber * 240

// End of downtrend
entry_condition2 = ta.crossover(emacd, emacd_signal)

ENTRY_CONDITIONS = entry_condition1 and entry_condition2


if ENTRY_CONDITIONS and window()
    entryNumber := entryNumber + 1
    entryId = 'Long ' + str.tostring(entryNumber)
    strategy.entry(entryId, strategy.long)
    
    

// CLOSE CONDITIONS

// Last bar
CLOSE_CONDITIONS = barstate.islast

if CLOSE_CONDITIONS
    strategy.close_all()


    
// Draw
plot(ema50, color=color.orange, linewidth=3)
plot(ema200, color=entry_condition1 ? color.green : color.red, linewidth=3)

```

> Detail

https://www.fmz.com/strategy/428718

> Last Modified

2023-10-08 16:12:29
