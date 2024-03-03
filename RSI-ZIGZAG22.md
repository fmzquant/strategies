
> Name

RSI-ZIGZAG22

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|length|
|v_input_2|true|Minimum % Change|


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
// © RafaelZioni
//@version=4
study("RSI -ZIGZAG",overlay=true)
length =input(1)
overSold = 35
overBought= 70

p =close

vrsi = rsi(p, length)
var bool long = na
var bool short = na

long :=crossover(vrsi,overSold) 
short := crossunder(vrsi,overBought)

var float last_open_long = na
var float last_open_short = na

last_open_long := long ? close : nz(last_open_long[1])
last_open_short := short ? close : nz(last_open_short[1])


entry_value =last_open_long
entry_value1=last_open_short

//
ZZPercent = input(1, title="Minimum % Change", type=input.float)
r1Level=entry_value
s1Level=entry_value1
trend = 0
trend := na(trend[1]) ? 1 : trend[1]
LL = 0.0
LL := na(LL[1]) ? s1Level : LL[1]
HH = 0.0
HH := na(HH[1]) ?r1Level : HH[1]

Pi = ZZPercent * 0.01
zigzag = float(na)

if trend > 0  
    if r1Level >= HH  
        HH := r1Level
        HH
    else
        if s1Level < HH * (1 - Pi)
            zigzag :=r1Level[1]
            trend := -1
            LL := s1Level
            LL
else
   
    if s1Level <= LL 
        LL := s1Level
        LL
    else
        if r1Level > LL * (1 + Pi)
            zigzag := s1Level[1]
            trend := 1
            HH := s1Level
            HH

f=crossunder(trend,0)
q=crossover(trend,0)
plotshape(q , title="buy", text="Buy", color=color.green, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.white, transp=0)  //plot for buy icon
plotshape(f, title="sell", text="Sell", color=color.red, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.white, transp=0)

/////// Alerts /////
alertcondition(q,title="buy")
alertcondition(f,title="sell")
//Strategy
if q
   strategy.entry("buy", strategy.long)
else if f
    strategy.entry("sell", strategy.short)



```

> Detail

https://www.fmz.com/strategy/379760

> Last Modified

2022-08-24 04:08:44
