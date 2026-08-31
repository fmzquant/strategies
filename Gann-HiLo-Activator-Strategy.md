
> Name

Gann-HiLo-Activator-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

Strategy based on the Gann HiLo Activator indicator for simple trend following operations. It goes long when price closes above the upper band and goes short when price closes below the lower band. 

## Strategy Logic

1. Calculate weighted moving averages of highest and lowest prices for a specified period to get upper and lower bands.

2. When close is higher than the upper band, go long.

3. When close is lower than the lower band, go short. 

4. Closing prices breaking the bands in reverse signal exits.

5. Allows selecting effective start time of strategy, default is full period.

## Advantages

1. Simple Gann HiLo parameters, easy to implement.

2. Clear trading signals from band breakouts. 

3. Flexible selection of effective strategy timeframe.

4. Simple and clear logic, easy to understand.

5. Good backtest results, pairs well with trending markets.

## Risks

1. Unlimited loss risk as a short strategy.

2. Improper parameters may cause frequent stop loss and re-entries.

3. Ineffective in range-bound choppy markets, prone to being trapped.

4. Needs additional filters besides just indicator to avoid failures.

## Optimization

1. Optimize parameter combinations to reduce wrong signals.

2. Add trailing stop loss to ensure risk control.

3. Add EMA etc to determine market condition and entry timing.

4. Combine volume to avoid false breakouts in choppy conditions.

5. Implement time filtering to narrow strategy effective period.

## Summary

The strategy achieves simple trend following through Gann HiLo bands but can be improved further through enhancing indicator logic, parameter optimization, risk control etc. to make it more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|3|Length|
|v_input_int_2|true|Offset|
|v_input_1|false|Begin from start?|
|v_input_2|2017|From Year|
|v_input_int_3|true|From Month|
|v_input_int_4|true|From Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-10 00:00:00
end: 2023-09-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © starbolt

//@version=5
strategy('Gann HiLo Activator Strategy', overlay=true, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=20, initial_capital=1000, process_orders_on_close=true)

len = input.int(3, 'Length', step=1, minval=1)
displace = input.int(1, 'Offset', step=1, minval=0)
from_start = input(false, 'Begin from start?')
backtest_year = input(2017, 'From Year')
backtest_month = input.int(01, 'From Month', minval=1, maxval=12, step=1)
backtest_day = input.int(01, 'From Day', minval=1, maxval=31, step=1)

start_time = from_start ? 0 : timestamp(backtest_year, backtest_month, backtest_day, 00, 00)

float hilo = na
hi = ta.sma(high, len)
lo = ta.sma(low, len)

hilo := close > hi[displace] ? 1 : close < lo[displace] ? -1 : hilo[1]
ghla = hilo == -1 ? hi[displace] : lo[displace]
color = hilo == -1 ? color.red : color.green

buyCondition = hilo == 1 and hilo[1] == -1
sellCondition = hilo == -1 and hilo[1] == 1

if buyCondition and time >= start_time
    strategy.entry('Long', strategy.long)

if sellCondition and time >= start_time
    strategy.entry('Short', strategy.short)

plot(ghla, color=color, style=plot.style_cross)


```

> Detail

https://www.fmz.com/strategy/427070

> Last Modified

2023-09-17 18:36:01
