
> Name

TUE-ADX-MACD-Confluence-Strategy

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Time Preferences)Restrict trading times?|
|v_input_string_1|0930-1600:23456|Trading Time String|
|v_input_float_1|true|(?Stop Loss)Stop Loss Value|
|v_input_1|14|(?ADX Settings)ADX Length|
|v_input_2|10|ADX Smoothing|
|v_input_3_close|0|(?MACD Settings)MACD Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|12|MACD Fast Length|
|v_input_5|26|MACD Slow Length|
|v_input_6|9|MACD Signal Length|
|v_input_7|true|(?Display Options)Show BUY/SELL Signals|
|v_input_8|true|Show Candle Colors|
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
// © TradersUltimateEdge - www.tradersultimateedge.com/indicators to see our indicator packages for sale, including professional grade market algorithms
// Code provided open source, feel free to use it for any purpose except resale

//@version=5
strategy("TUE ADX/MACD Confluence Strategy V1.0", overlay=true)

/////////////////////////////////////////////////////////////////////////////////////////////// INPUTS {

markethours = input.bool(true, title="Restrict trading times?", group="Time Preferences")
tradingtime = input.string('0930-1600:23456', title="Trading Time String", tooltip="Time in EST. Trades will only OPEN during these hours, but can close any time. Syntax is as follows: [Start time]-[End Time]:[Days of week]. Days of week assumes 1 is Sunday and 7 is Saturday, so 23456 is Mon-Fri.", group="Time Preferences")

absolutestopvalue = input.float(1.0, title="Stop Loss Value", tooltip="Absolute value of stop loss. Measured in cents (stocks, ex. 1.00 is $1.00) and ticks (futures, ex. 0.50 is 2 ticks on ES)", group="Stop Loss")

length = input(14, title="ADX Length", group="ADX Settings")
smoothing = input(10, title="ADX Smoothing", group="ADX Settings")

macdsource = input(close, title="MACD Source", group="MACD Settings")
macdfast = input(12, title="MACD Fast Length", group="MACD Settings")
macdslow = input(26, title="MACD Slow Length", group="MACD Settings")
macdsignal = input(9, title="MACD Signal Length", group="MACD Settings")

showsignals = input(true, title="Show BUY/SELL Signals", group="Display Options")
showcandlecolors = input(true, title="Show Candle Colors", group="Display Options")
colorup = input(color.green, title="Up Candle Color", group="Display Options")
colordown = input(color.red, title="Down Candle Color", group="Display Options")

/////////////////////////////////////////////////////////////////////////////////////////////// } INPUTS


/////////////////////////////////////////////////////////////////////////////////////////////// ADX AND MACD CALC {

[diplus, diminus, adx] = ta.dmi(length, smoothing)

[macdline, signalline, histline] = ta.macd(macdsource, macdfast, macdslow, macdsignal)

/////////////////////////////////////////////////////////////////////////////////////////////// } ADX AND MACD CALC


/////////////////////////////////////////////////////////////////////////////////////////////// MARKET TIME {

markettimecheck = markethours ? time(timeframe.period, session=tradingtime, timezone='America/New_York') : low > 0

/////////////////////////////////////////////////////////////////////////////////////////////// } MARKET TIME


////////////////////////////////////////////////////////////////////////////////////////////// TRADE CALC {

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
    
////////////////////////////////////////////////////////////////////////////////////////////// } TRADE CALC


////////////////////////////////////////////////////////////////////////////////////////////// STOP LOSS CALC {
    
longstopvalue = strategy.position_avg_price - absolutestopvalue
shortstopvalue = strategy.position_avg_price + absolutestopvalue

////////////////////////////////////////////////////////////////////////////////////////////// } STOP LOSS CALC


////////////////////////////////////////////////////////////////////////////////////////////// STRATEGY {

strategy.entry('long', strategy.long, when=trade[1] != 1 and trade == 1 and markettimecheck, comment="long entry")
strategy.exit('long', when=strategy.position_size > 0, stop=longstopvalue, comment="long stop")
strategy.close('long', when=strategy.position_size > 0 and longcheck[1] == true and longcheck == false, comment="long close")
    
strategy.entry('short', strategy.short, when=trade[1] != -1 and trade == -1 and markettimecheck, comment="short entry")
strategy.exit('short', when=strategy.position_size < 0, stop=shortstopvalue, comment="short stop")
strategy.close('short', when=strategy.position_size < 0 and shortcheck[1] == true and shortcheck == false, comment="short close")

////////////////////////////////////////////////////////////////////////////////////////////// PLOTS {

colors = longcheck ? colorup : shortcheck ? colordown : color.white

plotcandle(open, high, low, close, color = showcandlecolors ? colors : na)

plotshape(trade[1] != 1 and trade == 1 and showsignals, style=shape.labelup, text='BUY', textcolor=color.white, color=color.green, size=size.small, location=location.belowbar)
plotshape(trade[1] != -1 and trade == -1 and showsignals, style=shape.labeldown, text='SELL', textcolor=color.white, color=color.red, size=size.small, location=location.abovebar)

////////////////////////////////////////////////////////////////////////////////////////////// } PLOTS

```

> Detail

https://www.fmz.com/strategy/380245

> Last Modified

2022-08-27 16:37:33
