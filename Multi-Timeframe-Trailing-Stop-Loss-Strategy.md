
> Name

Multi-Timeframe-Trailing-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17d6a302e77e69cd7eb.png)

## Overview

This strategy is a multi-timeframe version of my previous simple trailing stop loss strategy. The previous strategy only used basic trailing stop loss to enter positions. It worked pretty well so I tried to improve it. I thought what would happen if I use the same ATR trailing stop loss on different timeframes and combine them into one signal.  

In this strategy you can only use ATR stops and choose 3 other higher timeframes in addition to your current timeframe. The trailing stop loss from all these timeframes will be plotted on the chart. Enter long position if all 4 timeframes agree on long signal. Close long positions when at least 2 timeframes disagree on long signal. The logic for short positions is the same.

## Strategy Logic

The core of this strategy lies in trailing stop loss and trend following. Trailing stop loss is used to set stop loss level based on ATR value, which can effectively avoid stop loss from being hit. Trend following determines entry based on observing trend direction across different timeframes.  

Specifically, the strategy first calculates ATR value on different timeframes and sets stop loss distance. It then generates long/short signals when price breaks through the stop loss level. If signals from multiple timeframes agree, position will be taken. After that, keep tracking the stop loss level per trend direction. If signals from a certain percentage of timeframes reverse, close position.

By combining trend judgment across different periods, fake breakouts can be filtered out effectively. At the same time, trailing stop locks in profits and controls risk.

## Advantages

1. Using multiple timeframes helps filter out noise and identify trend direction  
2. ATR trailing stop adjusts stop distance dynamically, lowering probability of being stopped out
3. Combining trend following and stop loss management, you can follow the trend and stop out in time
4. Few parameters, easy to understand and optimize

## Risk Analysis 

1. ATR stop may be too close or too far if parameters not set properly, prone to being hit or stop distance too big
2. Multiple timeframes combination may not work effectively or judge wrongly if parameters not set properly  
3. Need to configure both stop loss and timeframe parameters properly, otherwise may not achieve best results

Solutions:

1. Test different parameter sets and products to find optimum  
2. Optimize ratio and number of timeframes to ensure reliable trend judgment
3. Adjust ATR multiplier to balance between not being hit and proper distance

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add/reduce number of timeframes to find best combinations for trend judgment
2. Test different ATR multipliers to determine optimum stop distance  
3. Add re-entry mechanism to build more positions as trend persists  
4. Incorporate other filters on entry signals e.g. volume indicators etc
5. Parameter tuning for different products

## Conclusion

This strategy combines trend following and risk control via multi-timeframe ATR trailing stops. Compared to single stop, it identifies trend direction more clearly; compared to single timeframe, it filters out lots of noise. Proper configuration on stop parameters and timeframes is key to achieve best results. It suits investors who can tolerate certain drawdowns and provides steady returns. There is also further room of enhancement and expansibility. It's a very promising strategy idea.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|ATR Length|
|v_input_2|2|ATR Mult|
|v_input_3|120|TF2|
|v_input_4|180|TF3|
|v_input_5|240|TF4|
|v_input_6|true|From Day|
|v_input_7|true|From Month|
|v_input_8|2016|From Year|
|v_input_9|true|To Day|
|v_input_10|true|To Month|
|v_input_11|2100|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2024-01-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="MTF Trailing SL Strategy [QuantNomad]", shorttitle = "MTF TrailingSL [QN]", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

////////////
// Inputs //

atr_length = input(14,    title = "ATR Length")
atr_mult   = input(2,     title = "ATR Mult",    type = input.float)

tf2 = input('120', title = "TF2", type = input.string)
tf3 = input('180', title = "TF3", type = input.string)
tf4 = input('240', title = "TF4", type = input.string)

// BACKTESTING RANGE
// From Date Inputs
fromDay   = input(defval = 1,    title = "From Day",   minval = 1, maxval = 31)
fromMonth = input(defval = 1,    title = "From Month", minval = 1, maxval = 12)
fromYear  = input(defval = 2016, title = "From Year",  minval = 1970)
 
// To Date Inputs
toDay   = input(defval = 1,    title = "To Day",   minval = 1, maxval = 31)
toMonth = input(defval = 1,    title = "To Month", minval = 1, maxval = 12)
toYear  = input(defval = 2100, title = "To Year",  minval = 1970)
 
// Calculate start/end date and time condition
startDate  = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear,   toMonth,   toDay,   00, 00)

time_cond = time >= startDate and time <= finishDate

//////////////////
// CALCULATIONS //


tsl() => 
    // SL values
    sl_val = atr_mult * atr(atr_length)
     
    // Init Variables
    pos         = 0
    trailing_sl = 0.0
    
    // Signals
    long_signal  = nz(pos[1]) !=  1 and high > nz(trailing_sl[1])
    short_signal = nz(pos[1]) != -1 and low  < nz(trailing_sl[1]) 
    
    // Calculate SL
    trailing_sl := short_signal     ? high + sl_val : 
                   long_signal      ? low  - sl_val : 
                   nz(pos[1]) ==  1 ? max(low  - sl_val, nz(trailing_sl[1])) :  
                   nz(pos[1]) == -1 ? min(high + sl_val, nz(trailing_sl[1])) : 
                   nz(trailing_sl[1])
                   
    // Position var               
    pos := long_signal  ? 1 : short_signal ? -1 : nz(pos[1]) 
    trailing_sl
    
    
trailing_sl1 = tsl()
trailing_sl2 = security(syminfo.tickerid, tf2, tsl())
trailing_sl3 = security(syminfo.tickerid, tf3, tsl())
trailing_sl4 = security(syminfo.tickerid, tf4, tsl())

pos1 = 0
pos1 := low <= trailing_sl1 ? -1 : high >= trailing_sl1 ? 1 : nz(pos1[1])

pos2 = 0
pos2 := low <= trailing_sl2 ? -1 : high >= trailing_sl2 ? 1 : nz(pos2[1])

pos3 = 0
pos3 := low <= trailing_sl3 ? -1 : high >= trailing_sl3 ? 1 : nz(pos3[1])

pos4 = 0
pos4 := low <= trailing_sl4 ? -1 : high >= trailing_sl4 ? 1 : nz(pos4[1])

total_pos = pos1 + pos2 + pos3 + pos4

//////////////
// PLOTINGS //

plot(trailing_sl1, linewidth = 2 , color = pos1 == 1 ? color.green : color.red, title = "TSL TF1")
plot(trailing_sl2, linewidth = 2 , color = pos2 == 1 ? color.green : color.red, title = "TSL TF2", transp = 25)
plot(trailing_sl3, linewidth = 2 , color = pos3 == 1 ? color.green : color.red, title = "TSL TF3", transp = 50)
plot(trailing_sl4, linewidth = 2 , color = pos4 == 1 ? color.green : color.red, title = "TSL TF4", transp = 75)

//////////////
// STRATEGY //

//strategy.entry("long",  true,  stop = trailing_sl1)
//strategy.entry("short", false, stop = trailing_sl1)

strategy.entry("long",    true, when = total_pos ==  4)
strategy.entry("short",  false, when = total_pos == -4)

strategy.close("long",  when = total_pos <= 0)
strategy.close("short", when = total_pos >= 0)

```

> Detail

https://www.fmz.com/strategy/438020

> Last Modified

2024-01-08 11:24:24
