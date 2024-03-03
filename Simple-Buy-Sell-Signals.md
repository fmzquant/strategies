
> Name

Simple-Buy-Sell-Signals

> Author

Zer3192





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
// © mayurssupe

//@version=5
indicator("Simple Buy Sell Signals",overlay=true,format=format.price,shorttitle="SBS")

[dp,dm,adx]  =ta.dmi(14,14)

rsi = ta.rsi(close,9)
rsiOB = rsi > 60 and not(rsi[1] < 40)
rsiOS = rsi < 40 and not(rsi[1] > 60)

ma1 = math.avg(ta.sma(close,21),ta.ema(close,50))
ma2 = ta.ema(close,35)

nmL = ta.crossover(ma1,ma2) and rsiOB
nmS = ta.crossover(ma1,ma2) and rsiOS

plotshape(nmL ? nmL : 0,title="Long",style=shape.labelup,text="Buy",textcolor=color.white,color=color.aqua,location=location.belowbar)
plotshape(nmS ? nmS : 0,title="Short",style=shape.labeldown,text="Sell",textcolor=color.white,color=color.orange,location=location.abovebar)

// plot(ma1,color=color.green,linewidth=4)
// plot(ma2,color=color.red,linewidth=4)

//Strategy Tester
if nmL 
    strategy.entry("Enter Long", strategy.long)
else if nmS
    strategy.entry("Enter Short", strategy.short)
// strategy.close("Long",when=nmS)
// strategy.close("Short",when=nmL)
```

> Detail

https://www.fmz.com/strategy/380396

> Last Modified

2022-08-28 18:30:25
