
> Name

Intelligent-Trend-Following-Trading-Strategy-System-Based-on-EMA-Double-Moving-Average-Crossover

> Author

ianzeng123





> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-20 00:00:00
end: 2024-11-01 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"BNB_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © BFXGold

//@version=5
strategy("BFX Buy and Sell", overlay=true)

// Inputs
ema_fast_length = input.int(10, title="Fast EMA Length")
ema_slow_length = input.int(20, title="Slow EMA Length")
start_year = input.int(2017, title="Backtest Start Year")
end_year = input.int(2029, title="Backtest End Year")
start_month = input.int(1, title="Backtest Start Month")
start_day = input.int(1, title="Backtest Start Day")
end_month = input.int(1, title="Backtest End Month")
end_day = input.int(30, title="Backtest End Day")

// Calculate EMAs
ema_fast = ta.ema(close, ema_fast_length)
ema_slow = ta.ema(close, ema_slow_length)

// Confirmation candles
confirmation_above = close > ema_fast and close > ema_slow
confirmation_below = close < ema_fast and close < ema_slow

// Crossovers with confirmation
long_condition = ta.crossover(ema_fast, ema_slow) and confirmation_above
short_condition = ta.crossunder(ema_fast, ema_slow) and confirmation_below

// Backtesting date filter
backtest_start = timestamp(start_year, start_month, start_day, 0, 0)
backtest_end = timestamp(end_year, end_month, end_day, 23, 59)
in_backtest = (time >= backtest_start) and (time <= backtest_end)

// Plot signals
if (long_condition and in_backtest)
    label.new(bar_index, low, text="BUY", style=label.style_label_up, color=color.new(color.green, 0), textcolor=color.white)
if (short_condition and in_backtest)
    label.new(bar_index, high, text="SELL", style=label.style_label_down, color=color.new(color.red, 0), textcolor=color.white)

// Strategy execution for backtesting
if (in_backtest)
    if (long_condition)
        strategy.entry("Long", strategy.long)
    if (short_condition)
        strategy.entry("Short", strategy.short)

// Plot EMAs
plot(ema_fast, title="Fast EMA (10)", color=color.blue, linewidth=1)
plot(ema_slow, title="Slow EMA (20)", color=color.orange, linewidth=1)

```

> Detail

https://www.fmz.com/strategy/482687

> Last Modified

2025-02-27 17:52:35
