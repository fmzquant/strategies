
> Name

Session-Breakout-Scalping-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy combines multi-timeframe donchians to scalp short-term breakouts during a user-defined session. It belongs to short-term scalping strategies.

## Strategy Logic

1. Calculate day and short-term mid-points to form breakout zones across timeframes. 

2. Only trade during a customizable trading session. Enter on session start, exit on session end.

3. Use real-time EMA of price as entry price. Breakout when price exceeds mid-point.

4. Set stops outside breakout zones. Stop out when breakout fails.

5. Close positions when price falls back near mid-point, confirming failed breakout.

## Advantages

1. Multi-timeframe combines to effectively filter false breakouts.

2. Defined sessions avoid risks around major news events.

3. EMA tracking allows timely entries in line with momentum. 

4. Stops help control risks.

5. Forced session exit avoids overnight risks.

## Risks

1. Short-term breakouts may face whipsaws and stop outs.

2. Some breakouts may not fully profit before session ends.

3. Poor session definition could miss opportunities.

4. No guarantee each breakout reaches expected profit. 

5. Optimization risks overfitting parameters.

## Enhancement

1. Test breakout parameters to find optimal combinations.

2. Evaluate additional indicators to improve entry accuracy. 

3. Optimize trading session for profit vs risk balance. 

4. Research integrating take profit strategies to lock in gains.

5. Test parameter differences across various symbols. 

6. Employ machine learning for dynamic parameter optimization.

## Conclusion

This strategy attempts short-term scalping on limited session breakouts. With optimizations around false breakouts and risk controls, it can be refined into a pragmatic and efficient short-term system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|Fast Window|
|v_input_2|52|Slow Window|
|v_input_3|3|Instant Period|
|v_input_4|true|Minimum Cloud ATR Multiplier|
|v_input_5|1000-1500|Trading Session|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Breakout Scalper", overlay=true)

// -------------------------------------------------------------------------------------------------
// INPUTS
// -------------------------------------------------------------------------------------------------
// Period of the "fast" donchian channel
fast_window = input(title="Fast Window",  defval=13, minval=1)
// Used for the volatility (atr) period
slow_window = input(title="Slow Window",  defval=52, minval=1)
// Period of EMA used as the current price
instant_period = input(title="Instant Period",  defval=3, minval=1)
// Minimum ratio of cloud width to ATR in order for trade to be active
cloud_min_percent = input(title="Minimum Cloud ATR Multiplier", type=float, defval=1.0, minval=0)
// Session where we allow trades to be active
trading_sesh = input(title="Trading Session",  defval='1000-1500')
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
// SESSION TIMING
// -------------------------------------------------------------------------------------------------
is_newbar(t) =>
    na(t[1]) and not na(t) or t[1] < t

day_time = time("D")
sess_time = time(timeframe.period, trading_sesh)
day_open_bar = is_newbar(day_time)
sess_open_bar = is_newbar(sess_time)
sess_close_bar = na(sess_time) and not na(sess_time[1])
sess_is_open = false
sess_is_open := sess_open_bar ? true : (sess_close_bar ? false : sess_is_open[1])
// -------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------
// DONCHIANS
// -------------------------------------------------------------------------------------------------
slow_high = na
slow_high := day_open_bar ? high : (high > slow_high[1] ? high : slow_high[1])
slow_low = na
slow_low := day_open_bar ? low : (low < slow_low[1] ? low : slow_low[1])
slow_mid = (slow_high + slow_low) / 2

fast_low = max(slow_low, lowest(fast_window))
fast_high = min(slow_high, highest(fast_window))
fast_mid = (fast_low + fast_high) / 2
// -------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
// TREND CLOUD
// -------------------------------------------------------------------------------------------------
cloud_width = fast_mid - slow_mid
slow_atr = atr(slow_window)
cloud_percent = cloud_width / slow_atr
cloud_color = cloud_percent > cloud_min_percent ? green : (cloud_percent < -cloud_min_percent ? red : gray)

fp = plot(fast_mid, title="Fast MidR", color=green)
sp = plot(slow_mid, title="Slow MidR", color=red)
fill(fp, sp, color=cloud_color)
// -------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
// INSTANT PRICE
// -------------------------------------------------------------------------------------------------
instant_price = ema(close, instant_period)
plot(instant_price, title="Instant Price", color=black, transp=50)
// -------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
// ENTRY SIGNALS & STOPS
// -------------------------------------------------------------------------------------------------
buy_entry_signal = sess_is_open and (instant_price > fast_mid) and (cloud_percent > cloud_min_percent)
sell_entry_signal = sess_is_open and (instant_price < fast_mid) and (cloud_percent < -cloud_min_percent)
buy_close_signal = sess_close_bar or (cloud_percent < 0)
sell_close_signal = sess_close_bar or (cloud_percent > 0)

entry_buy_stop = slow_high
entry_sell_stop = slow_low
exit_buy_stop = max(slow_low, fast_low)
exit_sell_stop = min(slow_high, fast_high)

entry_buy_stop_color = (strategy.position_size == 0) ? (buy_entry_signal ? green : na) : na
plotshape(entry_buy_stop, location=location.absolute, color=entry_buy_stop_color, style=shape.circle)
entry_sell_stop_color = (strategy.position_size == 0) ? (sell_entry_signal ? red : na) : na
plotshape(entry_sell_stop, location=location.absolute, color=entry_sell_stop_color, style=shape.circle)
exit_buy_stop_color = (strategy.position_size > 0) ? red : na
plotshape(exit_buy_stop, location=location.absolute, color=exit_buy_stop_color, style=shape.xcross)
exit_sell_stop_color = (strategy.position_size < 0) ? green : na
plotshape(exit_sell_stop, location=location.absolute, color=exit_sell_stop_color, style=shape.xcross)
// -------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------
// STRATEGY EXECUTION
// -------------------------------------------------------------------------------------------------
strategy.entry("long", strategy.long, stop=entry_buy_stop, when=buy_entry_signal)
strategy.cancel("long", when=not buy_entry_signal)
strategy.exit("stop", "long", stop=exit_buy_stop)
strategy.entry("short", strategy.short, stop=entry_sell_stop, when=sell_entry_signal)
strategy.cancel("short", when=not sell_entry_signal)
strategy.exit("stop", "short", stop=exit_sell_stop)
strategy.close("long", when=buy_close_signal)
strategy.close("short", when=sell_close_signal)
// -------------------------------------------------------------------------------------------------
```

> Detail

https://www.fmz.com/strategy/427394

> Last Modified

2023-09-20 17:00:16
