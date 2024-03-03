
> Name

MACD-Strategy

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|39|Period|
|v_input_2|7|Fast Length|
|v_input_3|14|Slow Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|3|Signal Smoothing|
|v_input_6|false|Simple MA(Oscillator)|
|v_input_7|true|Simple MA(Signal Line)|
|v_input_8|2|Long Take Profit 1 %|
|v_input_9|10|Long Take Profit 1 Qty|
|v_input_10|5|Long Take Profit 2%|
|v_input_11|50|Long Take Profit 2 Qty|
|v_input_12|3.5|SL Mutiplier|
|v_input_13|6|ATR period|
|v_input_14|2018|Backtest Start Year|
|v_input_15|true|Backtest Start Month|
|v_input_16|true|Backtest Start Day|
|v_input_17|9999|Backtest Stop Year|
|v_input_18|12|Backtest Stop Month|
|v_input_19|31|Backtest Stop Day|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Wunderbit Trading

//@version=4
strategy("MACD Strategy", overlay=true, pyramiding=2, commission_type=strategy.commission.percent, commission_value=0.04, initial_capital=100,  default_qty_type = strategy.cash, default_qty_value = 100, currency = currency.USD)

// FUNCTIONS

Ema(src,p) =>
    ema = 0.
    sf = 2/(p+1)
    ema := nz(ema[1] + sf*(src - ema[1]),src)

Sma(src,p) => a = cum(src), (a - a[max(p,0)])/max(p,0)

Atr(p) =>
    atr = 0.
    Tr = max(high - low, max(abs(high - close[1]), abs(low - close[1])))
    atr := nz(atr[1] + (Tr - atr[1])/p,Tr)

/// TREND
ribbon_period = input(39, "Period", step=1)

leadLine1 = ema(close, ribbon_period)
leadLine2 = sma(close, ribbon_period)

p3 = plot(leadLine1, color= #53b987, title="EMA", transp = 50, linewidth = 1)
p4 = plot(leadLine2, color= #eb4d5c, title="SMA", transp = 50, linewidth = 1)
fill(p3, p4, transp = 60, color = leadLine1 > leadLine2 ? #53b987 : #eb4d5c)


// MACD
fast_length = input(title="Fast Length", type=input.integer, defval=7)
slow_length = input(title="Slow Length", type=input.integer, defval=14)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 3)
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=false)
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=true)

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00

// Calculating
fast_ma = sma_source ? Sma(src, fast_length) : Ema(src, fast_length)
slow_ma = sma_source ? Sma(src, slow_length) : Ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? Sma(macd, signal_length) : Ema(macd, signal_length)
hist = macd - signal

//plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
// plot(macd, title="MACD", color=col_macd, transp=0)
// plot(signal, title="Signal", color=col_signal, transp=0)


// TAKE PROFIT AND STOP LOSS
long_tp1_inp = input(2, title='Long Take Profit 1 %', step=0.1)/100
long_tp1_qty = input(10, title="Long Take Profit 1 Qty", step=1)

long_tp2_inp = input(5, title='Long Take Profit 2%', step=0.1)/100
long_tp2_qty = input(50, title="Long Take Profit 2 Qty", step=1)

long_take_level_1 = strategy.position_avg_price * (1 + long_tp1_inp)
long_take_level_2 = strategy.position_avg_price * (1 + long_tp2_inp)


// Stop Loss
multiplier = input(3.5, "SL Mutiplier", minval=1, step=0.1)
ATR_period=input(6,"ATR period", minval=1, step=1)

// Strategy
entry_long=crossover(macd,signal) and leadLine2 < leadLine1
entry_price_long=valuewhen(entry_long,close,0)
SL_floating_long = entry_price_long - multiplier*Atr(ATR_period)
exit_long= close < SL_floating_long 

///// BACKTEST PERIOD ///////
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(9999, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

if testPeriod()
    strategy.entry("long", strategy.long, comment="Insert Enter Long Comment", when=entry_long)
    strategy.exit("TP1","long", qty_percent=long_tp1_qty, limit=long_take_level_1)//, trail_points=entry_price_long * long_trailing / syminfo.mintick, trail_offset=entry_price_long * long_trailing / syminfo.mintick)
    strategy.exit("TP2", qty_percent=long_tp2_qty, limit=long_take_level_2) //, trail_points=entry_price_long * long_trailing / syminfo.mintick, trail_offset=entry_price_long * long_trailing / syminfo.mintick)
    strategy.close("long", when=exit_long, comment="Insert Exit Long comment" )


// LONG POSITION
plot(strategy.position_size > 0 ? long_take_level_1 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="1st Long Take Profit")
plot(strategy.position_size > 0 ? long_take_level_2 : na, style=plot.style_linebr, color=color.green, linewidth=1, title="2nd Long Take Profit")
plot(strategy.position_size > 0 ? SL_floating_long : na, style=plot.style_linebr, color=color.red, linewidth=1, title="Long Stop Loss")

```

> Detail

https://www.fmz.com/strategy/392636

> Last Modified

2022-12-02 15:57:11
