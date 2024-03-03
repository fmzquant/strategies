
> Name

PlanB-Quant-Investing-101-v2

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|90|selllevel|
|v_input_2|65|drop|
|v_input_3|50|buylevel|
|v_input_4|false|----- Use Stop Loss / Take profit -----|
|v_input_5|100|Stop Loss %|
|v_input_6|1.5|Take Profit %|


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
// © fillippone

//@version=4

strategy("PlanB Quant Investing 101", shorttitle="PlanB RSI Strategy", overlay=true,calc_on_every_tick=false,pyramiding=0, default_qty_type=strategy.cash,default_qty_value=1000, currency=currency.USD, initial_capital=1000,commission_type=strategy.commission.percent, commission_value=0.0)


r=rsi(close,14)

//SELL CONDITION
//RSI was above 90% last six months AND drops below 65%

//RSI above 90% last six month

selllevel = input(90)
maxrsi = highest(rsi(close,14),6)[1]

rsisell = maxrsi > selllevel 


//RSIdrops below 65%
drop = input(65)

rsidrop= r < drop

//sellsignal
sellsignal = rsisell and rsidrop 


//BUY CONDITION
//IF (RSI was below 50% last six months AND jumps +2% from the low) THEN buy, ELSE hold.

//RSI was below 50% last six months

buylevel = input(50)
minrsi = lowest(rsi(close,14),6)[1]

rsibuy = minrsi < buylevel 

//IF (RSI jumps +2% from the low) THEN buy, ELSE hold.


rsibounce= r > (minrsi + 2)

//buysignal=buyrsi AND rsidrop

//buysignal

buysignal = rsibuy and rsibounce 

//Strategy

strategy.entry("Buy Signal",strategy.long, when = buysignal)
strategy.entry("Sell Signal",strategy.short, when = sellsignal)
// === Stop LOSS ===
useStopLoss = input(false, title='----- Use Stop Loss / Take profit -----', type=bool)
sl_inp = input(100, title='Stop Loss %', type=float, step=0.25)/100
tp_inp = input(1.5, title='Take Profit %', type=float, step=0.25)/100
stop_level = strategy.position_avg_price * (1 - sl_inp)
take_level = strategy.position_avg_price * (1 + tp_inp)
stop_level_short = strategy.position_avg_price * (1 + sl_inp)
take_level_short = strategy.position_avg_price * (1 - tp_inp)
// === Stop LOSS ===

if useStopLoss
    strategy.exit("Stop Loss/Profit Long","Buy Signal", stop=stop_level, limit=take_level)
    strategy.exit("Stop Loss/Profit Short","Sell Signal", stop=stop_level_short, limit=take_level_short)


```

> Detail

https://www.fmz.com/strategy/379757

> Last Modified

2023-12-02 17:49:46
