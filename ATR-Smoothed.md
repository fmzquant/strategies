
> Name

ATR-Smoothed

> Author

ChaoZhang

> Strategy Description

Orignal Version By dysrupt / Modifyed by me
**backtest**

 ![IMG](https://www.fmz.com/upload/asset/a76a0a04e9d9dc3115.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Period|
|v_input_2|6.3|Multiplier|
|v_input_3|100|Smooth|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-22 00:00:00
end: 2022-05-21 23:59:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
study(title="ATR Smoothed (By dysrupt)_BuySell version", shorttitle="ATR_SM_BuySell", overlay = true)

//Modifyed by @guikroth
////////////////////////////////////////////////////////////////////////////////INPUTS

nATRPeriod      = input(21, "Period")
nATRMultip      = input(6.3, "Multiplier",type=float, minval=0.5, maxval=1000, step=0.1)



/////////////////////////////////////////////////////////////////////////////////ATR

xATR = atr(nATRPeriod)
nLoss = nATRMultip * xATR
xATRTrailingStop = na
xATRTrailingStop := 
 iff(close > nz(xATRTrailingStop[1], 0) and close[1] > nz(xATRTrailingStop[1], 0), max(nz(xATRTrailingStop[1]), close - nLoss),
  iff(close < nz(xATRTrailingStop[1], 0) and close[1] < nz(xATRTrailingStop[1], 0), min(nz(xATRTrailingStop[1]), close + nLoss), 
   iff(close > nz(xATRTrailingStop[1], 0), close - nLoss, close + nLoss))) 
                       
pos = na 
pos := 
 iff(close[1] < nz(xATRTrailingStop[1], 0) and close > nz(xATRTrailingStop[1], 0), 1, 
  iff(close[1] > nz(xATRTrailingStop[1], 0) and close < nz(xATRTrailingStop[1], 0), -1, nz(pos[1], 0)))
 
color = pos == -1 ? red: pos == 1 ? lime : blue 
//patr=plot(xATRTrailingStop, color=color, linewidth=2, title="ATR Trailing Stop", transp=0)

// Deternine if we are currently LONG
isLong = false
isLong := nz(isLong[1], false)

// Determine if we are currently SHORT
isShort = false
isShort := nz(isShort[1], false)

//Trading
// Buy only if the buy signal is triggered and we are not already long
LONG = not isLong and pos == 1


// Sell only if the sell signal is triggered and we are not already short   
SHORT = not isShort and pos == -1


if (LONG)
    isLong := true
    isShort := false

if (SHORT)
    isLong := false
    isShort := true

barcolor(isLong ? lime : isShort ? red : na)


// Show Break Alerts
plotshape(SHORT, title="Sell", style=shape.labeldown, location=location.abovebar, size=size.normal, text="Sell", transp=0, textcolor = white, color=red, transp=0)
plotshape(LONG, title="Buy", style=shape.labelup, location=location.belowbar, size=size.normal, text="Buy", textcolor = white, color=green, transp=0)


// === /PLOTTING ===
// Send alert to TV alarm sub-system
alertcondition(LONG,title="Sell",message="Sell")
alertcondition(SHORT,title="BuY",message="Buy")
alertcondition(SHORT,title="BuY",message="Buy")
alertcondition(SHORT,title="BuY",message="Buy")

////////////////////////////////////////////////////////////////////////////////VWMA

len2 = input(100, minval=1, title="Smooth")
src = input(close, title="Source")
out = vwma(src, len2)

avg1=avg(out, xATRTrailingStop)
plot(avg1, color=aqua, transp=0, title="ATR")

if LONG
    strategy.entry("Enter Long", strategy.long)
else if SHORT
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/365078

> Last Modified

2022-05-23 14:12:08
