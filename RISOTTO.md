
> Name

RISOTTO

> Author

ChaoZhang

> Strategy Description

RSI OTT is Anıl Özekşi's latest derived version of Optimized Trend Tracker on RSI Oscillator.
He can solve the fake signals of RSI Oscillator by adopting OTT on the indicator.
Those who don't know OTT can search in indicators.

**backtest**
 ![IMG](https://www.fmz.com/upload/asset/161da421e1b62c9e45f.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_4|false|Show RSI/OTT Crossing Signals?|
|v_input_1|100|(?0.0 RSI)0.0 RSI Period|
|v_input_2|50|(?RISOTTO)RISOTTO Period|
|v_input_3|0.2|RISOTTO Percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-09 00:00:00
end: 2022-05-15 23:59:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//created by    : @Anil_Ozeksi
//developer     : @Anil_Ozeksi
//author        : @mr. fofenks

study("RISOTTO",overlay=false, precision=2)


src               = close

//RSI
x1                = input(defval = 100      , title = "VAR RSI Period"          , type = input.integer, minval = 1  ,step = 1       , group = "VAR RSI")

//OTT
x2                = input(defval = 50       , title = "RISOTTO Period"          , type = input.integer, minval = 1  ,step = 1       , group = "RISOTTO")
x3                = input(defval = 0.2      , title = "RISOTTO Percent"         , type = input.float  , minval = 0  ,step = 0.05    , group = "RISOTTO")

//Signals
showsignalsc      = input( defval=false     , title = "Show RSI/OTT Crossing Signals?", type=input.bool)

OTT_Func(src,length, percent)=>
    valpha        = 2/(length+1)
    vud1          = src>src[1] ? src-src[1] : 0
    vdd1          = src<src[1] ? src[1]-src : 0
    vUD           = sum(vud1,9)
    vDD           = sum(vdd1,9)
    vCMO          = nz((vUD-vDD)/(vUD+vDD))
    VAR           = 0.0
    VAR          := nz(valpha*abs(vCMO)*src)+(1-valpha*abs(vCMO))*nz(VAR[1])
    fark          = VAR*percent*0.01//multi*atr //
    longStop      = VAR - fark
    longStopPrev  = nz(longStop[1], longStop)
    longStop     := VAR > longStopPrev ? max(longStop, longStopPrev) : longStop
    shortStop     = VAR + fark
    shortStopPrev = nz(shortStop[1], shortStop)
    shortStop    := VAR < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop
    dir           = 1
    dir          := nz(dir[1], dir)
    dir          := dir == -1 and VAR > shortStopPrev ? 1 : dir == 1 and VAR < longStopPrev ? -1 : dir
    MT            = dir==1 ? longStop: shortStop
    OTT           = VAR>MT ? MT*(200+percent)/200 : MT*(200-percent)/200
    [VAR,OTT]

rsi               = rsi(src,x1)

[VRSI,_]          = OTT_Func(rsi, x2, 1)
[_,RISOTTO]       = OTT_Func(VRSI+1000, 2, x3)

buySignalc        = crossover(VRSI+1000, RISOTTO[2])
sellSignallc      = crossunder(VRSI+1000, RISOTTO[2])

plot(VRSI+1000         , color=#0585E1     , linewidth=2, title="VAR RSI" , display = display.all)
plot(nz(RISOTTO[2])    , color=#B800D9     , linewidth=2, title="RISOTTO" , display = display.all)


plotshape(buySignalc    and showsignalsc ? RISOTTO*0.995 : na, title="Buy"  , text="Buy"    , location=location.absolute, style=shape.labelup   , size=size.tiny, color=color.green , textcolor=color.white)
plotshape(sellSignallc  and showsignalsc ? RISOTTO*1.005 : na, title="Sell" , text="Sell"   , location=location.absolute, style=shape.labeldown , size=size.tiny, color=color.red   , textcolor=color.white)

//alertcondition(cross(src, OTT[2]), title="Price Cross Alert", message="OTT - Price Crossing!")
//alertcondition(crossover(src, OTT[2]), title="Price Crossover Alarm", message="PRICE OVER OTT - BUY SIGNAL!")
//alertcondition(crossunder(src, OTT[2]), title="Price Crossunder Alarm", message="PRICE UNDER OTT - SELL SIGNAL!")

  
  

if buySignalc
    strategy.entry("Enter Long", strategy.long)
else if sellSignallc
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363847

> Last Modified

2022-05-17 17:08:28
