
> Name

Quantitative-Investment-Strategy-Based-on-Monthly-Buy-Date

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d734e93039772d372.png)

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
