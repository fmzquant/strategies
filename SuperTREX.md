
> Name

SuperTREX

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|length|
|v_input_2|35|overSold|
|v_input_3|70|overBought|
|v_input_4|4|SuperTrend Multiplier|
|v_input_5|10|SuperTrend Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RafaelZioni


//@version=4
study(title = "SuperTREX", overlay = true)


length = input( 14 )
overSold = input( 35 )
overBought = input( 70 )
p = close

vrsi = rsi(p, length)
price = close
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

xy=(entry_value+entry_value)/2

// INPUTS //
st_mult   = input(4,   title = 'SuperTrend Multiplier', minval = 0, maxval = 100, step = 0.01)
st_period = input(10, title = 'SuperTrend Period',     minval = 1)

// CALCULATIONS //
up_lev =xy - (st_mult * atr(st_period))
dn_lev =xy + (st_mult * atr(st_period))

up_trend   = 0.0
up_trend   := entry_value[1] > up_trend[1]   ? max(up_lev, up_trend[1])   : up_lev

down_trend = 0.0
down_trend := entry_value1[1] < down_trend[1] ? min(dn_lev, down_trend[1]) : dn_lev

// Calculate trend var
trend = 0
trend := close > down_trend[1] ? 1: close < up_trend[1] ? -1 : nz(trend[1], 1)

// Calculate SuperTrend Line
st_line = trend ==1 ? up_trend : down_trend
plot(xy,color = trend == 1 ? color.green : color.red)

buy=crossover( xy, st_line) 
sell=crossunder(xy, st_line) 

plotshape(buy, title="buy", text="Buy", color=color.green, style=shape.labelup, location=location.belowbar, size=size.small, textcolor=color.white, transp=0)  //plot for buy icon
plotshape(sell, title="sell", text="Sell", color=color.red, style=shape.labeldown, location=location.abovebar, size=size.small, textcolor=color.white, transp=0)  //plot for sell icon
/////// Alerts /////
alertcondition(buy,title="buy")
alertcondition(sell,title="sell")
if buy
   strategy.entry("buy", strategy.long)
else if  sell
    strategy.entry("sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/366407

> Last Modified

2022-05-29 09:49:08
