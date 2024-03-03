
> Name

Bully-Signals

> Author

ChaoZhang

> Strategy Description

ESte indicador esta hecho para darte las senales de venta y compra con un riesgo beneficio de 1.50 usalo en periodos de 15 mnts


 ![IMG](https://www.fmz.com/upload/asset/150bfcf9ce5c54bd869.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Length|
|v_input_2|6|RSI Smoothing|
|v_input_3|4.238|Fast QQE Factor|
|v_input_4|10|Thresh-hold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-07-27 00:00:00
end: 2022-08-02 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © colinmck

indicator('Bully signals', overlay=true)

RSI_Period = input(14, title='RSI Length')
SF = input(6, title='RSI Smoothing')
QQE = input(4.238, title='Fast QQE Factor')
ThreshHold = input(10, title='Thresh-hold')

src = close
Wilders_Period = RSI_Period * 2 - 1

Rsi = ta.rsi(src, RSI_Period)
RsiMa = ta.ema(Rsi, SF)
AtrRsi = math.abs(RsiMa[1] - RsiMa)
MaAtrRsi = ta.ema(AtrRsi, Wilders_Period)
dar = ta.ema(MaAtrRsi, Wilders_Period) * QQE

longband = 0.0
shortband = 0.0
trend = 0

DeltaFastAtrRsi = dar
RSIndex = RsiMa
newshortband = RSIndex + DeltaFastAtrRsi
newlongband = RSIndex - DeltaFastAtrRsi
longband := RSIndex[1] > longband[1] and RSIndex > longband[1] ? math.max(longband[1], newlongband) : newlongband
shortband := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? math.min(shortband[1], newshortband) : newshortband
cross_1 = ta.cross(longband[1], RSIndex)
trend := ta.cross(RSIndex, shortband[1]) ? 1 : cross_1 ? -1 : nz(trend[1], 1)
FastAtrRsiTL = trend == 1 ? longband : shortband

// Find all the QQE Crosses

QQExlong = 0
QQExlong := nz(QQExlong[1])
QQExshort = 0
QQExshort := nz(QQExshort[1])
QQExlong := FastAtrRsiTL < RSIndex ? QQExlong + 1 : 0
QQExshort := FastAtrRsiTL > RSIndex ? QQExshort + 1 : 0

//Conditions

qqeLong = QQExlong == 1 ? FastAtrRsiTL[1] - 50 : na
qqeShort = QQExshort == 1 ? FastAtrRsiTL[1] - 50 : na

// Plotting

plotshape(qqeLong, title='Bully long', text='Buy', textcolor=color.new(color.white, 0), style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), size=size.tiny)
plotshape(qqeShort, title='Bully short', text='Sell', textcolor=color.new(color.white, 0), style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), size=size.tiny)

// Alerts

alertcondition(qqeLong, title='Buy', message='Buy')
alertcondition(qqeShort, title='Sell', message='Sell')




if qqeLong
    strategy.entry("Enter Long", strategy.long)
else if qqeShort
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/376314

> Last Modified

2022-08-03 12:01:13
