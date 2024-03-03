
> Name

Chande-Kroll-Stop

> Author

ChaoZhang

> Strategy Description

Dear TV''ers,

Hereby a script where i created a simple strategy using the underappreciated chande kroll stop indicator. Short signal is when the close crosses under the orange line and a long signal is generated upon a crossover of a close candle of the blue line.
Additionally you have the option to filter using ADX the minimize getting rekt in a choppy market.

good luck trading!


**backtest**

 ![IMG](https://www.fmz.com/upload/asset/ba67a3e2b923ac9d2b.jpg) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|p|
|v_input_int_2|true|x|
|v_input_int_3|9|q|
|v_input_1|14|ADX Smoothing|
|v_input_2|14|DI Length|
|v_input_int_4|20|minimum ADX threshold for signal|


> Source (PineScript)

``` pinescript
//@version=5
strategy(title = "Chande Kroll Stop", overlay=true)
p = input.int(10, minval=1)
x = input.int(1, minval=1)
q = input.int(9, minval=1)
first_high_stop = ta.highest(high, p) - x * ta.atr(p)
first_low_stop = ta.lowest(low, p) + x * ta.atr(p)
stop_short = ta.highest(first_high_stop, q)
stop_long = ta.lowest(first_low_stop, q)
plot(stop_long, color=color.blue)
plot(stop_short, color=color.orange)

adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
ADX_sig = input.int(20, title="minimum ADX threshold for signal")
dirmov(len) =>
	up = ta.change(high)
	down = -ta.change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = ta.rma(ta.tr, len)
	plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
	minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)


if ta.crossunder(close, stop_long) and sig>ADX_sig
    strategy.entry("long", strategy.long)
if ta.crossover(close, stop_short) and sig>ADX_sig
    strategy.entry("short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/362031

> Last Modified

2022-05-09 17:44:31
