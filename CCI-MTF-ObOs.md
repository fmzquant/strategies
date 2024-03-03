
> Name

CCI-MTF-ObOs

> Author

ChaoZhang

> Strategy Description

Hello Traders,

This is a simple Commodity Channel Index ( CCI ) indicator with multi-timeframe (MTF) overbought and oversold level.

It can detect overbought and oversold level up to 5 timeframes, which help traders spot potential reversal point more easily.

There are options to select 1-5 timeframes to detect overbought and oversold.

Green Background is "Oversold" , looking for "Long".
Red Background is "Overbought" , looking for "Short".

Have fun :)

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/180aa95f110b949ccae.jpg) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_hlc3|0|(?[ CCI SETTING ])Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_int_1|20|Length|
|v_input_int_2|100|Overbought|
|v_input_int_3|-100|Oversold|
|v_input_timeframe_1|15|(?[ SELECT TIMEFRAME ])Timeframe 1|
|v_input_timeframe_2|30|Timeframe 2|
|v_input_timeframe_3|60|Timeframe 3|
|v_input_timeframe_4|120|Timeframe 4|
|v_input_timeframe_5|240|Timeframe 5|
|v_input_bool_1|true|cciTf1_E|
|v_input_bool_2|true|cciTf2_E|
|v_input_bool_3|true|cciTf3_E|
|v_input_bool_4|true|cciTf4_E|
|v_input_bool_5|true|cciTf5_E|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-15 00:00:00
end: 2022-05-14 23:59:00
period: 12h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © thakon33
//    __  __        __             ____ ____
//   / /_/ /  ___ _/ /_____  ___  |_  /|_  /
//  / __/ _ \/ _ `/  '_/ _ \/ _ \_/_ <_/_ < 
//  \__/_//_/\_,_/_/\_\\___/_//_/____/____/ 

//@version=5
indicator("CCI MTF Ob+Os")

//------------------------------------------------------------------------------
// Input
var g_cci       = "[ CCI SETTING ]"
cciSrc          = input(title="Source", defval=hlc3, group=g_cci)
cciLength       = input.int(title="Length",     defval=20,   minval=1, group=g_cci)
cciOverbought   = input.int(title="Overbought", defval=100,  step=10,  group=g_cci)
cciOversold     = input.int(title="Oversold",   defval=-100, step=10,  group=g_cci)


var g_tf        = "[ SELECT TIMEFRAME ]"
cciTf1          = input.timeframe(title="Timeframe 1", defval="15",  group=g_tf, inline="tf1")
cciTf2          = input.timeframe(title="Timeframe 2", defval="30",  group=g_tf, inline="tf2")
cciTf3          = input.timeframe(title="Timeframe 3", defval="60",  group=g_tf, inline="tf3")
cciTf4          = input.timeframe(title="Timeframe 4", defval="120", group=g_tf, inline="tf4")
cciTf5          = input.timeframe(title="Timeframe 5", defval="240", group=g_tf, inline="tf5")
cciTf1_E        = input.bool(title="", defval=true, group=g_tf, inline="tf1")
cciTf2_E        = input.bool(title="", defval=true, group=g_tf, inline="tf2")
cciTf3_E        = input.bool(title="", defval=true, group=g_tf, inline="tf3")
cciTf4_E        = input.bool(title="", defval=true, group=g_tf, inline="tf4")
cciTf5_E        = input.bool(title="", defval=true, group=g_tf, inline="tf5")


//------------------------------------------------------------------------------
// Calculate CCI

Fsec(Sym, Tf, Exp) =>
    request.security(Sym, Tf, Exp[barstate.isrealtime ? 1 : 0], barmerge.gaps_off, barmerge.lookahead_off) [barstate.isrealtime ? 0 : 1]

cci1            = Fsec(syminfo.tickerid, cciTf1, ta.cci(cciSrc, cciLength))
cci2            = Fsec(syminfo.tickerid, cciTf2, ta.cci(cciSrc, cciLength))
cci3            = Fsec(syminfo.tickerid, cciTf3, ta.cci(cciSrc, cciLength))
cci4            = Fsec(syminfo.tickerid, cciTf4, ta.cci(cciSrc, cciLength))
cci5            = Fsec(syminfo.tickerid, cciTf5, ta.cci(cciSrc, cciLength))


//------------------------------------------------------------------------------
// CCI Overbought and Oversold detect

cci1_Ob         = not cciTf1_E or cci1 >= cciOverbought 
cci2_Ob         = not cciTf2_E or cci2 >= cciOverbought
cci3_Ob         = not cciTf3_E or cci3 >= cciOverbought
cci4_Ob         = not cciTf4_E or cci4 >= cciOverbought
cci5_Ob         = not cciTf5_E or cci5 >= cciOverbought

cci1_Os         = not cciTf1_E or cci1 <= cciOversold
cci2_Os         = not cciTf2_E or cci2 <= cciOversold
cci3_Os         = not cciTf3_E or cci3 <= cciOversold
cci4_Os         = not cciTf4_E or cci4 <= cciOversold
cci5_Os         = not cciTf5_E or cci5 <= cciOversold

cciOb           = cci1_Ob and cci2_Ob and cci3_Ob and cci4_Ob and cci5_Ob
cciOs           = cci1_Os and cci2_Os and cci3_Os and cci4_Os and cci5_Os


//------------------------------------------------------------------------------
// Drawing on chart
plot    (cciTf1_E ? cci1 : na, title="TF 1",            color=color.rgb(255, 205, 22, 20),  linewidth=1)
plot    (cciTf2_E ? cci2 : na, title="TF 2",            color=color.rgb(255, 22, 239, 20),  linewidth=1)
plot    (cciTf3_E ? cci3 : na, title="TF 3",            color=color.rgb(38, 22, 255, 0),    linewidth=1)
plot    (cciTf4_E ? cci4 : na, title="TF 4",            color=color.rgb(123, 253, 22, 20),  linewidth=1)
plot    (cciTf5_E ? cci5 : na, title="TF 5",            color=color.rgb(255, 255, 255, 50), linewidth=1)
hline   (cciOverbought,        title="CCI Overbought",  color=color.new(color.white, 0),   linestyle=hline.style_dashed, linewidth=1)
hline   (cciOversold,          title="CCI Overbought",  color=color.new(color.white, 0),   linestyle=hline.style_dashed, linewidth=1)

bgcolor (cciOb ? color.new(color.red, 0)  : na, title="Overbought")
bgcolor (cciOs ? color.new(color.lime, 0) : na, title="Oversold")


//------------------------------------------------------------------------------
// Alert
alertcondition(cciOb, title="CCI Overbought", message="CCI Overbought for {{ticker}} - Price = {{close}}")
alertcondition(cciOs, title="CCI Oversold",   message="CCI Oversold for {{ticker}} - Price = {{close}}")


//==============================================================================
//==============================================================================

if cciOb
    strategy.entry("Enter Long", strategy.long)
else if cciOs
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363582

> Last Modified

2022-05-16 18:12:07
