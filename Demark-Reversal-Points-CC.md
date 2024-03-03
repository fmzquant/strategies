
> Name

Demark-Reversal-Points-CC

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_timeframe_1||Resolution|
|v_input_2|false|Allow Repainting?|
|v_input_3|true|Allow Bar Color Change?|
|v_input_int_1|9|Length|
|v_input_int_2|4|LbLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
//@version=5
// Copyright (c) 2019-present, Franklin Moormann (cheatcountry)
// Demark Reversal Points [CC] script may be freely distributed under the MIT license.
indicator('Demark Reversal Points [CC]', max_bars_back=3000, overlay=true)

inp = input(title='Source', defval=close)
res = input.timeframe(title='Resolution', defval='')
rep = input(title='Allow Repainting?', defval=false)
bar = input(title='Allow Bar Color Change?', defval=true)
src = request.security(syminfo.tickerid, res, inp[rep ? 0 : barstate.isrealtime ? 1 : 0])[rep ? 0 : barstate.isrealtime ? 0 : 1]
length = input.int(title='Length', defval=9, minval=1)
lbLength = input.int(title='LbLength', defval=4, minval=1)

uCount = 0
dCount = 0
for i = 0 to length - 1 by 1
    uCount += (nz(src[i]) > nz(src[i + lbLength]) ? 1 : 0)
    dCount += (nz(src[i]) < nz(src[i + lbLength]) ? 1 : 0)
    dCount

drp = dCount == length ? 1 : uCount == length ? -1 : 0

sig = drp > 0 or uCount > dCount ? 1 : drp < 0 or dCount > uCount ? -1 : 0
drpColor = sig > 0 ? color.green : sig < 0 ? color.red : color.black
alertcondition(ta.crossover(drp, 0), 'Buy Signal', 'Bullish Change Detected')
alertcondition(ta.crossunder(drp, 0), 'Sell Signal', 'Bearish Change Detected')
barcolor(bar ? drpColor : na)
plotshape(ta.crossover(drp, 0), 'Buy', shape.labelup, location.belowbar, color.new(color.green, 0), text='Buy', textcolor=color.new(color.white, 0))
plotshape(ta.crossunder(drp, 0), 'Sell', shape.labeldown, location.abovebar, color=color.new(color.red, 0), text='Sell', textcolor=color.new(color.white, 0))
buy=ta.crossover(drp, 0),
sell=ta.crossunder(drp, 0)
if buy
   strategy.entry("buy", strategy.long)
else if sell
    strategy.entry("sell", strategy.short)


```

> Detail

https://www.fmz.com/strategy/368738

> Last Modified

2022-06-12 17:18:26
