
> Name

BTC-bot

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Strategy Direction: long|short|all|
|v_input_2|W|higherTF|
|v_input_3|2|factor|
|v_input_4|21|length|
|v_input_5|15| stop loss|
|v_input_6|25| qty_percent1|
|v_input_7|25| qty_percent2|
|v_input_8|25| qty_percent3|
|v_input_9|3| Take profit1|
|v_input_10|5| Take profit2|
|v_input_11|7| Take profit3|
|v_input_12|10| Take profit4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-28 00:00:00
end: 2022-08-28 00:00:00
period: 4h
basePeriod: 15m
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © RafaelZioni


// © theCrypster 2020

//@version=4
strategy(title = "BTC bot", overlay = true, pyramiding=1,initial_capital = 10000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.075)
strat_dir_input = input(title="Strategy Direction", defval="long", options=["long", "short", "all"])
strat_dir_value = strat_dir_input == "long" ? strategy.direction.long : strat_dir_input == "short" ? strategy.direction.short : strategy.direction.all
strategy.risk.allow_entry_in(strat_dir_value)
//INPUTS
higherTF = input("W", type=input.resolution)
pc = security(syminfo.tickerid, higherTF, close[1], lookahead=true)
ph = security(syminfo.tickerid, higherTF, high[1], lookahead=true)
pl = security(syminfo.tickerid, higherTF, low[1], lookahead=true)

PP = 0.0,R1 = 0.0, R2 = 0.0, R3 = 0.0,S1 = 0.0, S2 = 0.0, S3 = 0.0

PP := (ph + pl + pc) / 3
R1 := PP     + (PP   - pl)
S1 := PP     - (ph - PP)
R2 := PP     + (ph - pl)
S2 := PP     - (ph - pl)
factor=input(2)
R3 := ph  + factor * (PP   - pl) 
S3 := pl   - 2 * (ph - PP) 

// 
length=input(21)
//
p = close
vrsi = rsi(p, length)
pp=ema(vrsi,length)
d=(vrsi-pp)*5
cc=(vrsi+d+pp)/2
//
low1=crossover(cc,0)

sell=crossover(close[1],R3) 
//
l = low1
s=sell
if l 
    strategy.entry("buy", strategy.long)
if s 
    strategy.entry("sell", strategy.short)
per(pcnt) =>
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss=input(title=" stop loss", defval=15, minval=0.01)
los = per(stoploss)
q1=input(title=" qty_percent1", defval=25, minval=1)
q2=input(title=" qty_percent2", defval=25, minval=1)
q3=input(title=" qty_percent3", defval=25, minval=1)
tp1=input(title=" Take profit1", defval=3, minval=0.01)
tp2=input(title=" Take profit2", defval=5, minval=0.01)
tp3=input(title=" Take profit3", defval=7, minval=0.01)
tp4=input(title=" Take profit4", defval=10, minval=0.01)
strategy.exit("x1", qty_percent = q1, profit = per(tp1), loss = los)
strategy.exit("x2", qty_percent = q2, profit = per(tp2), loss = los)
strategy.exit("x3", qty_percent = q3, profit = per(tp3), loss = los)
strategy.exit("x4", profit = per(tp4), loss = los)

```

> Detail

https://www.fmz.com/strategy/380446

> Last Modified

2022-08-29 07:18:42
