
> Name

Alert-alertcondition-or-strategy-alerts

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|400|TakeProfitLevel|
|v_input_2|10|Entry distance for stop orders|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Peter_O

//@version=4
strategy(title="TradingView Alerts to MT4 MT5 example with cancelling pending orders", commission_type=strategy.commission.cash_per_order, commission_value=0.00003, overlay=true, default_qty_value=100000, initial_capital=1000)

// This script was created for educational purposes only.
// It is showing how to create pending orders and cancel them
// Together with syntax to send these events through TradingView alerts system
// All the way to brokers for execution

TakeProfitLevel=input(400)

// **** Entries logic **** {
periodK = 13 //input(13, title="K", minval=1)
periodD = 3 //input(3, title="D", minval=1)
smoothK = 4 //input(4, title="Smooth", minval=1)
k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)
// plot(k, title="%K", color=color.blue)
// plot(d, title="%D", color=color.orange)
// h0 = hline(80)
// h1 = hline(20)
// fill(h0, h1, color=color.purple, transp=75)

GoLong=crossover(k,d) and k<80
GoShort=crossunder(k,d) and k>20
// } End of entries logic

// **** Pivot-points and stop-loss logic **** {
piv_high = pivothigh(high,1,1)
piv_low = pivotlow(low,1,1)
var float stoploss_long=low
var float stoploss_short=high

pl=valuewhen(piv_low,piv_low,0)
ph=valuewhen(piv_high,piv_high,0)

if GoLong 
    stoploss_long := low<pl ? low : pl
if GoShort 
    stoploss_short := high>ph ? high : ph
plot(stoploss_long, color=color.lime, title="stoploss_long")
plot(stoploss_short, color=color.red, title="stoploss_short")
// } End of Pivot-points and stop-loss logic

CancelLong=crossunder(low,stoploss_long) and strategy.position_size[1]<=0 and strategy.position_size<=0
CancelShort=crossover(high,stoploss_short) and strategy.position_size[1]>=0 and strategy.position_size>=0
entry_distance=input(10, title="Entry distance for stop orders")

plotshape(CancelLong ? stoploss_long[1]-10*syminfo.mintick : na, location=location.absolute, style=shape.labelup, color=color.gray, textcolor=color.white, text="cancel\nlong", size=size.tiny)
plotshape(CancelShort ? stoploss_short[1]+10*syminfo.mintick : na, location=location.absolute, style=shape.labeldown, color=color.gray, textcolor=color.white, text="cancel\nshort", size=size.tiny)

strategy.entry("Long", strategy.long, when=GoLong, stop=close+entry_distance*syminfo.mintick)
strategy.exit("XLong", from_entry="Long", stop=stoploss_long, profit=TakeProfitLevel)
strategy.cancel("Long", when = CancelLong)
strategy.entry("Short", strategy.short, when=GoShort, stop=close-entry_distance*syminfo.mintick)
strategy.exit("XShort", from_entry="Short", stop=stoploss_short, profit=TakeProfitLevel)
strategy.cancel("Short", when = CancelShort)

if GoLong
    alertsyntax_golong='long offset=' + tostring(entry_distance) + ' slprice=' + tostring(stoploss_long) + ' tp=' + tostring(TakeProfitLevel)
    alert(message=alertsyntax_golong, freq=alert.freq_once_per_bar_close)
if GoShort
    alertsyntax_goshort='short offset=' + tostring(-entry_distance) + ' slprice=' + tostring(stoploss_short) + ' tp=' + tostring(TakeProfitLevel)
    alert(message=alertsyntax_goshort, freq=alert.freq_once_per_bar_close)
if CancelLong
    alertsyntax_cancellong='cancel long'
    alert(message=alertsyntax_cancellong, freq=alert.freq_once_per_bar_close)
if CancelShort
    alertsyntax_cancelshort='cancel short'
    alert(message=alertsyntax_cancelshort, freq=alert.freq_once_per_bar_close)
    

```

> Detail

https://www.fmz.com/strategy/380402

> Last Modified

2022-08-28 19:09:41
