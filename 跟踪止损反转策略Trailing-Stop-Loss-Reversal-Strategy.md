
> Name

跟踪止损反转策略Trailing-Stop-Loss-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a7b9b419e2f196a1c6.png)


### Overview

This is a very simple strategy. It consists of only one trailing stop loss. When the stop loss is triggered, the position is reversed and a trailing stop loss is set for the new position.  

### Strategy Logic

The strategy is built based on one of three stop loss types: percentage stop loss, ATR stop loss, absolute stop loss. When the stop loss is triggered, the position is reversed and a trailing stop loss is set for the new position.   

Specifically, the strategy first calculates the stop loss value based on the chosen stop loss type. It then checks for entry signals, going long when high is above previous stop loss price and going short when low is below previous stop loss price. After entering, it keeps updating the stop loss price to trail price changes. Long stop loss price is low minus stop loss value, short stop loss price is high plus stop loss value.  

### Advantage Analysis

The biggest advantage of this strategy is its simplicity, requiring tracking of only one stop loss without needing to consider entry and exit point selections. Flexible setting of stop loss value also makes its application scope wider. 

Compared with fixed stop loss, the trailing stop loss it employs can lock in larger profits while also reducing the probability of stop loss being hit. Reversing positions each time stop loss is triggered allows capturing price reversal opportunities.  

### Risk Analysis  

The main risks of this strategy may come from improper stop loss value setting. Overly large stop loss value may lead to magnified losses, while overly small value may cause frequent stop loss triggering. This requires adaptive optimization based on market conditions.  

Another risk is inaccurate directional judgment after stop loss trigger when reversing positions, thus missing price reversal chances or increasing losses. This needs combining trend and support/resistance analysis to determine optimal reversal timing.

### Optimization Directions 

The strategy can be optimized in the following aspects:

1. Add trend judgment to avoid trading against trends  
2. Optimize stop loss value calculation to make it more dynamically track the market
3. Increase breakout validation for higher-probability reversal signals  
4. Incorporate volatility measures to find best reversal timing  

### Conclusion

The strategy realizes profits through a simple trailing stop loss mechanism and is easy for beginners to grasp. Compared to traditional stop loss strategies, it adds post stop loss trigger reversal positions to acquire additional gains. With continuous testing and optimization, it can become a very practical quantitative program.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|sl_type: %|ATR|Absolute|
|v_input_2|4|% SL|
|v_input_3|10|ATR Length|
|v_input_4|2|ATR Mult|
|v_input_5|10|Absolute SL|
|v_input_6|true|From Day|
|v_input_7|true|From Month|
|v_input_8|2016|From Year|
|v_input_9|true|To Day|
|v_input_10|true|To Month|
|v_input_11|2100|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-24 00:00:00
end: 2023-11-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Trailing SL Strategy [QuantNomad]", shorttitle = "TrailingSL [QN]", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 50)

////////////
// Inputs //

sl_type    = input("%", options = ["%", "ATR", "Absolute"])

sl_perc    = input(4,     title = "% SL",        type = input.float)
atr_length = input(10,    title = "ATR Length")
atr_mult   = input(2,     title = "ATR Mult",    type = input.float)
sl_absol   = input(10,    title = "Absolute SL", type = input.float)

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

// SL values
sl_val = sl_type == "ATR"      ? atr_mult * atr(atr_length) : 
         sl_type == "Absolute" ? sl_absol : 
         close * sl_perc / 100
         
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

//////////////
// PLOTINGS //

plot(trailing_sl, linewidth = 2, color = pos == 1 ? color.green : color.red)

//////////////
// STRATEGY //

if (time_cond and pos != 1)
    strategy.entry("long",  true, stop = trailing_sl)
  
if (time_cond and pos != -1) 
    strategy.entry("short", false, stop = trailing_sl)
```

> Detail

https://www.fmz.com/strategy/433902

> Last Modified

2023-12-01 13:41:41
