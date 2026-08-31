
> Name

Dual-Moving-Average-Trend-Following-Strategy-427729

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses long-term RMA and short-term EMA crossovers to determine trend direction. It trails recent highest high or lowest low for stop loss. There is also a no-trade zone around the RMA to avoid false breaks.

## Strategy Logic

1. Use long period RMA and short period EMA to determine trend. Short EMA crossing below long RMA signals downtrend. Crossing above signals uptrend.

2. When price breaks above recent highest high over certain periods, trail the highest high as stop loss. When price breaks below recent lowest low, trail the lowest low as stop loss.

3. Set a no-trade zone around the RMA. Do not open positions when price is within the zone to avoid whipsaws. Zone range is based on certain percentage of RMA value.

4. Set take profit price to exit positions at a profit percentage after entry.

## Advantages

1. Dual moving average crossover reliably determines trend direction.

2. Trailing stop loss moves with the trend. 

3. No-trade zone filters fake breakout signals.

4. Take profit allows strategy to actively close profitable trades.

## Risks

1. Delay in moving average crossovers may increase losses.

2. Stop loss too close to price may get stopped out by noise.

3. No-trade zone too wide may miss opportunities. 

4. Not stopping out in time can lead to further losses.

Possible Solutions:

1. Optimize moving average parameters to reduce delay.

2. Widen stop loss slightly to prevent oversensitivity.

3. Test adjusting no-trade zone range to avoid missing trades. 

4. Add other stop loss mechanisms to limit max loss.

## Optimization Directions

1. Test other moving average combinations for better fit.

2. Add spread, MACD etc to improve stability.

3. Use machine learning to optimize parameters intelligently.

4. Incorporate trend strength to avoid counter-trend trades.

5. Optimize money management for higher win rate.

## Summary

This strategy uses dual moving average crossovers to determine trend direction and combines trailing stops and no-trade zones to lock in trend profits. The framework is simple and extensible. It can be improved by adjusting parameter ranges, optimizing exits, and incorporating additional filters and signals to make it robust across different markets.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|55|quick ma's|
|v_input_int_2|100|long ma's|
|v_input_int_3|3|leverage|
|v_input_int_4|170|Highest high period|
|v_input_int_5|170|Lowest low period|
|v_input_float_1|3|no trade zone|
|v_input_float_2|6.9|take profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-24 00:00:00
end: 2023-09-12 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PatrickGwynBuckley

//@version=5
//var initialCapital = strategy.equity

strategy("PB Trend Scalper", "PB Trend Scalper", overlay = true)
shortma = input.int(55, title="quick ma's")
longma = input.int(100, title="long ma's")
ema55h = ta.ema(high, shortma)
ema55l = ta.ema(low, shortma)
ema200h = ta.rma(high, longma)
ema200l = ta.rma(low, longma)
stock = ta.stoch(close, high, low, 14)

lev = input.int(3, title="leverage")
hhVal = input.int(170, title="Highest high period")
llVal = input.int(170, title="Lowest low period")

hh = ta.highest(high, hhVal)
ll = ta.lowest(low, llVal)
//plot(stock)

plot(hh, color=color.new(color.green, 50))
plot(ll, color=color.new(color.red, 50))
var float downtrade = 0
p = input.float(3.0, title="no trade zone")
l = 3
emadistlong = ema200h + ((ema200h/100)*p)
emadistshort = ema200l - ((ema200h/100)*p)

plot(ema55h)
plot(ema55l)
ntl = plot(emadistlong, color=color.new(color.red, 10))
nts = plot(emadistshort, color=color.new(color.red, 10))
fill(ntl, nts, color=color.new(color.red, 90))

//position size

EntryPrice = close
//positionValue = initialCapital
positionSize = (strategy.equity*lev) / EntryPrice

//plot(strategy.equity)


//standard short

if ema55h < ema200l and close[2] < ema55l and close[1] > ema55l and high[1] < ema55h and close < ema55h and ema55h < emadistshort and strategy.opentrades == 0// and stock > 85 
    strategy.entry("short", strategy.short, qty=positionSize, comment="short")
    downtrade := 1

//reset count    
if (ta.crossunder(ema55h, ema200l)) and downtrade == 1
    downtrade := 0

//standard long    
if ema55l > ema200h and close[2] > ema55h and close[1] < ema55h and low[1] > ema55l and close > ema55l and ema55l > emadistlong and strategy.opentrades <= 1// and stock < 15 
    strategy.entry("long", strategy.long, qty=positionSize, comment="long")
    downtrade := 0

//RESET COUNT ON MA CROSS
if (ta.crossover(ema55l, ema200h)) and downtrade == 0
    downtrade := 1
    
longclose2 = low < ll[1] or low < emadistshort //close < open and open<open[1] and open[2] < open[3] and open[3] < emadistshort//close < ta.lowest(low, 20)//
shortclose2 = high > hh[1] or high>emadistlong//close > open and open>open[1] and open[2]>open[3] and open[3] > emadistlong//high > emadistlong//close > ta.highest(high, 20)//

sl = 3.5
tp = input.float(6.9, title="take profit %")
tp2 = 10


strategy.exit("long exit", "long", profit = (strategy.position_avg_price*(tp)))//, loss = (strategy.position_avg_price*(sl)))
strategy.close("long", when = longclose2, comment = "long exit")
//strategy.close("long", when = (downtrade == 1), comment = "long exit")
//strategy.exit("long exit", "long2", profit = (strategy.position_avg_price*(tp2)))//, loss = (strategy.position_avg_price*(sl)))
//strategy.close ("long2", when = longclose2, comment = "long exit")
//strategy.close("long", when = (downtrade == 1), comment = "long exit")

strategy.exit("short exit", "short", profit = (strategy.position_avg_price*(tp)))//, loss = (strategy.position_avg_price*(sl)))//, loss = 300)
strategy.close("short", when = shortclose2, comment = "short exit")
//strategy.close("short", when = (downtrade == 0), comment = "short exit")
//strategy.exit("short exit", "short2", profit = (strategy.position_avg_price*(tp2)))//, loss = (strategy.position_avg_price*(sl)))
//strategy.close ("short2", when = shortclose2, comment = "short exit")
//strategy.close("short2", when = (downtrade == 0), comment = "short exit")

//if (strategy.exit("long exit", "long"))
    //downtrade := 1
//else 
   // downtrade := 0
```

> Detail

https://www.fmz.com/strategy/427729

> Last Modified

2023-09-24 13:14:08
