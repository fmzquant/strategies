
> Name

RSI-MTF-ObOs

> Author

ChaoZhang



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|(?[ RSI SETTING ])Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|14|Length|
|v_input_int_2|65|Overbought|
|v_input_int_3|35|Oversold|
|v_input_timeframe_1|15|(?[ SELECT TIMEFRAME ])Timeframe 1|
|v_input_timeframe_2|30|Timeframe 2|
|v_input_timeframe_3|60|Timeframe 3|
|v_input_timeframe_4|120|Timeframe 4|
|v_input_timeframe_5|240|Timeframe 5|
|v_input_bool_1|true|rsiTf1_E|
|v_input_bool_2|true|rsiTf2_E|
|v_input_bool_3|true|rsiTf3_E|
|v_input_bool_4|true|rsiTf4_E|
|v_input_bool_5|true|rsiTf5_E|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-08 00:00:00
end: 2022-05-14 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © thakon33
//    __  __        __             ____ ____
//   / /_/ /  ___ _/ /_____  ___  |_  /|_  /
//  / __/ _ \/ _ `/  '_/ _ \/ _ \_/_ <_/_ < 
//  \__/_//_/\_,_/_/\_\\___/_//_/____/____/ 

//@version=5
indicator("RSI MTF Ob+Os")

//------------------------------------------------------------------------------
// Input
var g_rsi       = "[ RSI SETTING ]"
rsiSrc          = input    (title="Source",     defval=close,                                group=g_rsi)
rsiLength       = input.int(title="Length",     defval=14,     minval=1,                     group=g_rsi)
rsiOverbought   = input.int(title="Overbought", defval=65,     minval=50, maxval=99, step=1, group=g_rsi)
rsiOversold     = input.int(title="Oversold",   defval=35,     minval=1,  maxval=50, step=1, group=g_rsi)


var g_tf        = "[ SELECT TIMEFRAME ]"
rsiTf1          = input.timeframe(title="Timeframe 1", defval="15",  group=g_tf, inline="tf1")
rsiTf2          = input.timeframe(title="Timeframe 2", defval="30",  group=g_tf, inline="tf2")
rsiTf3          = input.timeframe(title="Timeframe 3", defval="60",  group=g_tf, inline="tf3")
rsiTf4          = input.timeframe(title="Timeframe 4", defval="120", group=g_tf, inline="tf4")
rsiTf5          = input.timeframe(title="Timeframe 5", defval="240", group=g_tf, inline="tf5")
rsiTf1_E        = input.bool(title="", defval=true, group=g_tf, inline="tf1")
rsiTf2_E        = input.bool(title="", defval=true, group=g_tf, inline="tf2")
rsiTf3_E        = input.bool(title="", defval=true, group=g_tf, inline="tf3")
rsiTf4_E        = input.bool(title="", defval=true, group=g_tf, inline="tf4")
rsiTf5_E        = input.bool(title="", defval=true, group=g_tf, inline="tf5")


//------------------------------------------------------------------------------
// Calculate RSI

Fsec(Sym, Tf, Exp) =>
    request.security(Sym, Tf, Exp[barstate.isrealtime ? 1 : 0], barmerge.gaps_off, barmerge.lookahead_off) [barstate.isrealtime ? 0 : 1]

rsi1            = Fsec(syminfo.tickerid, rsiTf1, ta.rsi(rsiSrc, rsiLength))
rsi2            = Fsec(syminfo.tickerid, rsiTf2, ta.rsi(rsiSrc, rsiLength))
rsi3            = Fsec(syminfo.tickerid, rsiTf3, ta.rsi(rsiSrc, rsiLength))
rsi4            = Fsec(syminfo.tickerid, rsiTf4, ta.rsi(rsiSrc, rsiLength))
rsi5            = Fsec(syminfo.tickerid, rsiTf5, ta.rsi(rsiSrc, rsiLength))


//------------------------------------------------------------------------------
// RSI Overbought and Oversold detect

rsi1_Ob         = not rsiTf1_E or rsi1 >= rsiOverbought 
rsi2_Ob         = not rsiTf2_E or rsi2 >= rsiOverbought
rsi3_Ob         = not rsiTf3_E or rsi3 >= rsiOverbought
rsi4_Ob         = not rsiTf4_E or rsi4 >= rsiOverbought
rsi5_Ob         = not rsiTf5_E or rsi5 >= rsiOverbought

rsi1_Os         = not rsiTf1_E or rsi1 <= rsiOversold
rsi2_Os         = not rsiTf2_E or rsi2 <= rsiOversold
rsi3_Os         = not rsiTf3_E or rsi3 <= rsiOversold
rsi4_Os         = not rsiTf4_E or rsi4 <= rsiOversold
rsi5_Os         = not rsiTf5_E or rsi5 <= rsiOversold

rsiOb           = rsi1_Ob and rsi2_Ob and rsi3_Ob and rsi4_Ob and rsi5_Ob
rsiOs           = rsi1_Os and rsi2_Os and rsi3_Os and rsi4_Os and rsi5_Os


//------------------------------------------------------------------------------
// Drawing on chart
plot    (rsiTf1_E ? rsi1 : na, title="TF 1",            color=color.rgb(255, 205, 22, 20),                                linewidth=1)
plot    (rsiTf2_E ? rsi2 : na, title="TF 2",            color=color.rgb(255, 22, 239, 20),                                linewidth=1)
plot    (rsiTf3_E ? rsi3 : na, title="TF 3",            color=color.rgb(38, 22, 255, 0),                                  linewidth=1)
plot    (rsiTf4_E ? rsi4 : na, title="TF 4",            color=color.rgb(123, 253, 22, 20),                                linewidth=1)
plot    (rsiTf5_E ? rsi5 : na, title="TF 5",            color=color.rgb(255, 255, 255, 50),                               linewidth=1)
hline   (rsiOverbought,        title="RSI Overbought",  color=color.new(color.red, 30),     linestyle=hline.style_dashed, linewidth=1)
hline   (rsiOversold,          title="RSI Overbought",  color=color.new(color.green, 30),   linestyle=hline.style_dashed, linewidth=1)

bgcolor (rsiOb ? color.new(color.orange, 0) : na, title="Overbought")
bgcolor (rsiOs ? color.new(color.aqua,   0) : na, title="Oversold")


//------------------------------------------------------------------------------
// Alert
alertcondition(rsiOb, title="RSI Overbought", message="RSI Overbought for {{ticker}} - Price = {{close}}")
alertcondition(rsiOs, title="RSI Oversold",   message="RSI Oversold for {{ticker}} - Price = {{close}}")


//==============================================================================
//==============================================================================


if rsiOb
    strategy.entry("Enter Long", strategy.long)
else if rsiOs
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363590

> Last Modified

2022-05-16 18:17:17
