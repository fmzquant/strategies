
> Name

TUE-ADX-MACD-Confluence-V10

> Author

Zer3192

> Strategy Description

MACD/ADX

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show BUY/SELL Signals|
|v_input_2|true|Show Candle Colors|
|v_input_3|14|ADX Length|
|v_input_4|10|ADX Smoothing|
|v_input_5_close|0|MACD Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|12|MACD Fast Length|
|v_input_7|26|MACD Slow Length|
|v_input_8|9|MACD Signal Length|
|v_input_9|green|Up Candle Color|
|v_input_10|red|Down Candle Color|


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
// Written by TradersUltimateEdge
// Code provided open source, feel free to use it for any purpose except resale

//@version=5
indicator("TUE ADX/MACD Confluence V1.0", overlay=true)

showsignals = input(true, title="Show BUY/SELL Signals")
showcandlecolors = input(true, title="Show Candle Colors")
length = input(14, title="ADX Length")
smoothing = input(10, title="ADX Smoothing")
macdsource = input(close, title="MACD Source")
macdfast = input(12, title="MACD Fast Length")
macdslow = input(26, title="MACD Slow Length")
macdsignal = input(9, title="MACD Signal Length")
colorup = input(color.green, title="Up Candle Color")
colordown = input(color.red, title="Down Candle Color")


/////////////////////////////////////////////////////////////////////////////////////////////// ADX AND MACD CALC
[diplus, diminus, adx] = ta.dmi(length, smoothing)

[macdline, signalline, histline] = ta.macd(macdsource, macdfast, macdslow, macdsignal)

//////////////////////////////////////////////////////////////////////////////////////////////TRADE CALC

longcheck = diplus > diminus and macdline > signalline
shortcheck = diminus > diplus and signalline > macdline

int trade = 0

//Open from nothing

if trade == 0 and longcheck
    trade := 1

else if trade == 0 and shortcheck
    trade := -1
    
//Reversal

else if trade == 1 and shortcheck
    trade := -1
    
else if trade == -1 and longcheck
    trade := 1
    
//Keep status quo until crossover

else
    trade := trade[1]

//////////////////////////////////////////////////////////////////////////////////////////////PLOT 

colors = longcheck ? colorup : shortcheck ? colordown : color.white

plotcandle(open, high, low, close, color = showcandlecolors ? colors : na)

plotshape(trade[1] != 1 and trade == 1 and showsignals, style=shape.labelup, text='BUY', textcolor=color.white, color=color.green, size=size.small, location=location.belowbar)
plotshape(trade[1] != -1 and trade == -1 and showsignals, style=shape.labeldown, text='SELL', textcolor=color.white, color=color.red, size=size.small, location=location.abovebar)

///////////////////////////////////////////////////////////////////////////////////////////// ALERTS

alertcondition(trade[1] != 1 and trade == 1, "LONG")
alertcondition(trade[1] != -1 and trade == -1, "SHORT")
if trade[1] != 1 and trade == 1
   strategy.entry("buy", strategy.long)
else if trade[1] != -1 and trade == -1
    strategy.entry("sell", strategy.short)


```

> Detail

https://www.fmz.com/strategy/368715

> Last Modified

2022-06-12 14:01:56
