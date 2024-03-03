
> Name

Sidboss

> Author

ChaoZhang

> Strategy Description

USe for buy sell signals
Use settings 100,3

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/b303f4beec16df6188.jpg) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|100|Sampling Period|
|v_input_float_1|3|Range Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-15 00:00:00
end: 2022-05-11 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
indicator(title='Sidboss', overlay=true)
src = input(defval=close, title='Source')
per = input.int(defval=100, minval=1, title='Sampling Period')
mult = input.float(defval=3.0, minval=0.1, title='Range Multiplier')
smoothrng(x, t, m) =>
    wper = t * 2 - 1
    avrng = ta.ema(math.abs(x - x[1]), t)
    smoothrng = ta.ema(avrng, wper) * m
    smoothrng
smrng = smoothrng(src, per, mult)
rngfilt(x, r) =>
    rngfilt = x
    rngfilt := x > nz(rngfilt[1]) ? x - r < nz(rngfilt[1]) ? nz(rngfilt[1]) : x - r : x + r > nz(rngfilt[1]) ? nz(rngfilt[1]) : x + r
    rngfilt
filt = rngfilt(src, smrng)
upward = 0.0
upward := filt > filt[1] ? nz(upward[1]) + 1 : filt < filt[1] ? 0 : nz(upward[1])
downward = 0.0
downward := filt < filt[1] ? nz(downward[1]) + 1 : filt > filt[1] ? 0 : nz(downward[1])
hband = filt + smrng
lband = filt - smrng
filtcolor = upward > 0 ? color.lime : downward > 0 ? color.red : color.orange
barcolor = src > filt and src > src[1] and upward > 0 ? color.lime : src > filt and src < src[1] and upward > 0 ? color.green : src < filt and src < src[1] and downward > 0 ? color.red : src < filt and src > src[1] and downward > 0 ? color.maroon : color.orange
filtplot = plot(filt, color=filtcolor, linewidth=3, title='Range Filter')
hbandplot = plot(hband, color=color.new(color.aqua, 100), title='High Target')
lbandplot = plot(lband, color=color.new(color.fuchsia, 100), title='Low Target')
//fill(hbandplot, filtplot, color=aqua, title="High Target Range")
//fill(lbandplot, filtplot, color=fuchsia, title="Low Target Range")
//barcolor(barcolor)
longCond = bool(na)
shortCond = bool(na)
longCond := src > filt and src > src[1] and upward > 0 or src > filt and src < src[1] and upward > 0
shortCond := src < filt and src < src[1] and downward > 0 or src < filt and src > src[1] and downward > 0
CondIni = 0
CondIni := longCond ? 1 : shortCond ? -1 : CondIni[1]
longCondition = longCond and CondIni[1] == -1
shortCondition = shortCond and CondIni[1] == 1
plotshape(longCondition, title='Buy Signal', text='B', textcolor=color.new(color.white, 0), style=shape.labelup, size=size.small, location=location.belowbar, color=color.new(color.green, 0))
plotshape(shortCondition, title='Sell Signal', text='S', textcolor=color.new(color.white, 0), style=shape.labeldown, size=size.small, location=location.abovebar, color=color.new(color.red, 0))
alertcondition(longCondition, title='Buy Alert', message='BUY')
alertcondition(longCondition, title='Buy Alert', message='BUY')
alertcondition(longCondition, title='Buy Alert', message='BUY')
alertcondition(shortCondition, title='Sell Alert', message='SELL')



if longCondition
    strategy.entry("Enter Long", strategy.long)
else if shortCondition
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363562

> Last Modified

2022-05-17 10:23:58
