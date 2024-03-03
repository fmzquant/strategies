
> Name

Parabolic-SAR-Buy-And-Sell

> Author

ChaoZhang

> Strategy Description

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/172b455153ea2ebc596.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.00252|Start|
|v_input_2|0.00133|Increment|
|v_input_3|0.22|Maximum|
|v_input_4|20|Point Width|
|v_input_5|true|Highlight Start Points ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-24 00:00:00
end: 2022-05-23 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Copyright (c) 2019-present, Alex Orekhov (everget)
// re-edit @guikroth
study("Parabolic SAR", shorttitle="PSAR Buy and Sell Alerts", overlay=true)

start = input(title="Start", type=float, step=0.00005, defval=0.00252)
increment = input(title="Increment", type=float, step=0.00005, defval=0.00133)
maximum = input(title="Maximum", type=float, step=0.01, defval=0.220)
width = input(title="Point Width", minval=1, defval=20)
highlightStartPoints = input(title="Highlight Start Points ?", defval=true)

psar = sar(start, increment, maximum)
dir = psar < close ? 1 : -1

psarColor = psar < close ? #3388bb : #fdcc02


plotshape(dir == 1 and dir[1] == -1 and highlightStartPoints ? psar : na, title="Buy", style=shape.labelup, location=location.absolute, size=size.normal, text="Buy", transp=0, textcolor = white, color=green, transp=0)
plotshape(dir == -1 and dir[1] == 1 and highlightStartPoints ? psar : na, title="Sell", style=shape.labeldown, location=location.absolute, size=size.normal, text="Sell", transp=0, textcolor = white, color=red, transp=0)

barcolor(dir == 1 ? green: red)
Buy = psar < close ? 1 : na
Sell = psar < close ? na : -1

changeCond = dir != dir[1]
alertcondition(dir == 1 and dir[1] == -1 and highlightStartPoints ? psar : na, title="Buy", message="buy!")
alertcondition(dir == 1 and dir[1] == -1 and highlightStartPoints ? psar : na, title="Buy", message="buy!")
alertcondition(dir == 1 and dir[1] == -1 and highlightStartPoints ? psar : na, title="Buy", message="buy!")
alertcondition(dir == -1 and dir[1] == 1 and highlightStartPoints ? psar : na, title="Sell", message="sell!")

if dir == 1 and dir[1] == -1 and highlightStartPoints
    strategy.entry("Enter Long", strategy.long)
else if dir == -1 and dir[1] == 1 and highlightStartPoints
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/365722

> Last Modified

2022-05-25 18:23:13
