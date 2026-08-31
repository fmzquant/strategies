
> Name

Dual-Donchian-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d8acc7a960c28685b.png)

## Overview

The Dual Donchian Channel Breakout Strategy is a breakout trading strategy based on Donchian Channels. It uses fast and slow Donchian Channels to construct long and short trading signals. When the price breaks through the slow channel, open long or short positions. When the price breaks back through the fast channel, close positions. The strategy also sets take profit and stop loss conditions.

## Strategy Principle 

The Dual Donchian Channel Breakout Strategy is based on two parameters: **Slow Donchian Channel Period** and **Fast Donchian Channel Period**. The strategy first calculates the upper and lower bands of the two Donchian Channels.

- The default slow Donchian channel period is 50 bars, reflecting longer term trends.
- The default fast Donchian channel period is 30 bars, reflecting shorter term trend changes.

The long entry signal is a **breakout above the upper band** with **volatility greater than the threshold**. The short entry signal is a **breakdown below the lower band** with **volatility greater than the threshold**. 

The long stop loss exit signal is a **breakdown below the lower band**. The short stop loss exit signal is a **breakout above the upper band**.

The strategy also sets **take profit** exit conditions. The default take profit ratio is 2%, that is, take profit half position when price movement reaches 2%.

## Advantage Analysis

The Dual Donchian Channel Breakout Strategy has the following advantages:

1. The dual channel design can capture trend signals from both longer and shorter timeframes, allowing more accurate entries.

2. The volatility condition avoids frequent trading in range-bound markets. 

3. Comprehensive take profit and stop loss settings lock in partial profits and reduce losses.

4. Simple and clear strategy logic, easy to understand and implement.

5. Customizable parameters suit different products and trading preferences.

## Risk Analysis

The Dual Donchian Channel Breakout Strategy also has some risks:

1. The dual channel design is sensitive and can generate false signals. Wider channels or adjusted volatility parameters may reduce false signals.

2. In volatile markets, stop loss may trigger too frequently. Consider setting a limit on number of trades or widening stop loss range.

3. Fixed percentage take profit fails to maximize profits. Consider dynamic or manual intervention for optimal take profit pricing.  

4. Real trading performance may differ from backtest expectations. Requires thorough validation and parameter adjustments if needed.

## Optimization Directions

The Dual Donchian Channel Breakout Strategy can be optimized in several aspects:

1. Test more period combinations to find optimal parameters.

2. Try different volatility measures like ATR to find the most stable metric.

3. Set a limit on number of entries to avoid losses at end of trends.  

4. Try dynamic take profit for higher single trade profit.

5. Incorporate other indicators to filter entries and improve accuracy, e.g. volume.

6. Optimize money management models like fixed fractional position sizing for better risk control.

## Conclusion

In conclusion, the Dual Donchian Channel Breakout Strategy is an excellent trend following strategy. It combines both trend identification and reversal protection capabilities. With parameter optimization and rule refinement, it can be profitable across most products and market conditions. The strategy is simple and practical, worth learning and applying for quantitative traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|50|(?Conditions)Slow Donchian|
|v_input_int_2|30|Fast Donchian|
|v_input_int_3|3|Volatility (%)|
|v_input_bool_1|true|(?Strategy)Long Position On/Off|
|v_input_float_1|2|Long TP1 (%)|
|v_input_bool_2|true|Short Position On/Off|
|v_input_float_2|2|Short TP1 (%)|
|v_input_int_4|50|TP1 Position Amount (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © omererkan

//@version=5
strategy(title="Double Donchian Channel Breakout", overlay=true, initial_capital = 1000, commission_value = 0.05, default_qty_value = 100, default_qty_type = strategy.percent_of_equity)

// Donchian Channels
slowLen = input.int(50, title="Slow Donchian", group = "Conditions")
fastLen = input.int(30, title="Fast Donchian", group = "Conditions")

// Volatility Calculated as a percentage
volatility = input.int(3, title="Volatility (%)", group = "Conditions")

// Long positions
long = input.bool(true, "Long Position On/Off", group = "Strategy")
longProfitPerc = input.float(2, title="Long TP1 (%)", group = "Strategy", minval=0.0, step=0.1) * 0.01

// Short positions
short = input.bool(true, "Short Position On/Off", group = "Strategy")
shortProfitPerc = input.float(2, title="Short TP1 (%)", group = "Strategy", minval=0.0, step=0.1) * 0.01

// First take profit point for positions
TP1Yuzde =input.int(50, title = "TP1 Position Amount (%)", group = "Strategy")

// Slow Donchian Calculated
ubSlow = ta.highest(high, slowLen)[1]
lbSlow = ta.lowest(low, slowLen)[1]

// Fast Donchian Calculated
ubFast = ta.highest(high, fastLen)[1]
lbFast = ta.lowest(low, fastLen)[1]

// Plot Donchian Channel for entries
plot(ubSlow, color=color.green, linewidth=2, title="Slow DoCh - Upperband")
plot(lbSlow, color=color.green, linewidth=2, title="Slow DoCh - Lowerband")
plot(ubFast, color=color.blue, linewidth=2, title="Fast DoCh - Upperband")
plot(lbFast, color=color.blue, linewidth=2, title="Fast DoCh - Lowerband")

// This calculation, the strategy does not open position in the horizontal market.
fark = (ubSlow - lbSlow) / lbSlow * 100

// Take profit levels
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

// Code long trading conditions
longCondition = ta.crossover(close, ubSlow) and fark > volatility
if longCondition and long == true
    strategy.entry("Long", strategy.long)

// Code short trading conditions
shortCondition = ta.crossunder(close, lbSlow) and fark > volatility
if shortCondition and short == true
    strategy.entry("Short", strategy.short)

// Determine long trading conditions
if strategy.position_size > 0 and ta.crossunder(close, lbFast) 
    strategy.close_all("Close All")

// Determine short trading conditions
if strategy.position_size < 0 and ta.crossover(close, ubFast)
    strategy.close_all("Close All")

// Take Profit Long
if strategy.position_size > 0
    strategy.exit("TP1", "Long", qty_percent = TP1Yuzde, limit = longExitPrice)

// Take Profit Short
if strategy.position_size < 0
    strategy.exit("TP1", "Short", qty_percent = TP1Yuzde, limit = shortExitPrice)
```

> Detail

https://www.fmz.com/strategy/442343

> Last Modified

2024-02-21 11:38:48
