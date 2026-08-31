
> Name

Monthly-Reversal-DCA-Strategy

> Author

ChaoZhang

> Strategy Description


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
