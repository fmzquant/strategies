
> Name

动态通道突破策略Dynamic-Channel-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本文将介绍一种基于动态通道的突破交易策略。该策略通过K线或布林带形成的通道来判断趋势方向,并在价格突破通道时进场。

## 策略原理

该策略主要基于以下几点:

1. 使用动态通道判断趋势方向。价格突破上轨时看涨,下轨时看跌。

2. 选择阳线阴线突破或收盘突破作为入场时机。

3. 可针对多空各设定止盈止损点,如之前突破点、通道外延、ATR等。

4. 可添加交易时间、ATR过滤等条件,控制交易频率。

5. 可选择反向开仓,追捧市场热点获得更大收益。

## 优势分析

该策略具有以下优势:

1. 动态通道判断趋势,容易操作。

2. 突破点交易及止盈止损设置统一清晰。

3. 可自由选择各项过滤条件,控制交易风险。

4. 反向开仓可在热点中获利。

5. 策略逻辑简单明确,易于测试和优化。

## 风险分析

该策略的主要风险有:

1. 市场剧烈波动时,通道判断可能失效。

2. 假突破可能造成错误交易。需评估突破有效性。

3. 止盈止损点设定不恰当可能损失收益。

4. 交易频率过高可能增加交易成本和风险。

5. 反向交易带来的额外风险需要控制。

## 总结

该策略融合动态通道判断和突破交易思路。在控制风险前提下,可通过参数优化获得满意回报。但交易者仍需关注错触发风险,适时调整策略。

||

## Overview

This article introduces a breakout strategy based on dynamic channels formed by Keltner channels or Bollinger bands. It determines trend direction using the channels and trades breakouts. 

## Strategy Logic

The main logic is:

1. Use dynamic channels to determine trends. Break above suggests uptrend, and below suggests downtrend.

2. Choose wick or close breakouts as entry signals. 

3. Set separate long and short take profit and stop loss, such as previous wick, extended channel, or ATR.

4. Add filters like trading hours and ATR to control frequency. 

5. Consider counter-trend entries to profit from market momentum.

## Advantage Analysis  

Advantages of the strategy:

1. Dynamic channels make trend determination straightforward.

2. Breakout logic and stop settings are clear. 

3. Custom filters help control risk.

4. Counter-trend trades capitalize on momentum. 

5. Simple logic makes testing and optimization intuitive.

## Risk Analysis

Main risks include:

1. Channels may fail during volatile markets.

2. Fakeouts can cause bad trades. Assess breakout validity.

3. Bad stop loss settings could limit profits.

4. High frequency may increase costs and risk. 

5. Additional risk from counter-trend trades needs control.

## Conclusion

This strategy combines channel trend analysis with breakout trading. With risk control, optimization can achieve good returns. But traders should watch out for bad signals and adjust accordingly.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|true|(?Time_Delay)Delay between orders:|
|v_input_string_1|0|i_timeUnits: minutes|seconds|hours|days|chart|
|v_input_bool_1|false|UseDelay|
|v_input_bool_2|false|(?ATR Filter)useAtrDelay|
|v_input_int_1|2|Fast Atr1|
|v_input_int_2|14|Slow Atr2|
|v_input_float_2|3|Results: Atr1/Atr2|
|v_input_1|false|(?Tests period)Start date|
|v_input_bool_3|false|Finish date|
|v_input_2|timestamp(1 Jan 2022)|fecha_fin|
|v_input_float_3|2.6|(?Static SL/TP)Take Profit (%)|
|v_input_float_4|1.3|Stop Loss (%)|
|v_input_string_2|Keltner Channel|(?Posiciones)Indicator|
|v_input_bool_4|true|Use LONGS ?|
|v_input_bool_5|false|Use SHORTS ?|
|v_input_string_3|Wick out of band|Enter Condition|
|v_input_string_4|0|(?Stop Loss and Take Profit)Stop Loss Type: useStaticSLTP|Extended Band|ATR|Previous Wick|
|v_input_string_5|0|Take Profit Type: useStaticSLTP|Moving Average|ATR|Opposite Band|
|v_input_float_5|true|• (Solo ATR) Multiplicador Stop Loss|
|v_input_float_6|1.8|• (Solo ATR) Multiplicador Take Profit|
|v_input_float_7|4|• (Solo STOP LOSS con BB) Desviación estándar|
|v_input_float_8|3|• (Solo STOP LOSS con KC) Multiplicador|
|v_input_bool_6|false|Take Profit dinámico|
|v_input_int_3|14|(?Keltner Channel)Keltner Long.|
|v_input_float_9|1.5|Keltner Mult.|
|v_input_int_4|20|(?Keltner Channel - Multi TimeFrame)Keltner TF Long:|
|v_input_float_10|2|Keltner TF Mult:|
|v_input_timeframe_1||TimeFrame:|
|v_input_source_1_close|0|(?ATR)ATR Reference: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_5|7|ATR Length|
|v_input_int_6|20|(?Bollinger Bands)BB Long. |
|v_input_float_11|2|BB Deviation (Desv.)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 04:00:00
end: 2023-09-15 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// Based on Channels Strategy [JoseMetal]
// Edited by Dimkud
//@version=5

// strategy("Channels Strategy [Dimkud - JoseMetal]", overlay=true, calc_on_order_fills=true, use_bar_magnifier=true, pyramiding=0, commission_type=strategy.commission.percent, commission_value=0.04, max_labels_count=500, default_qty_type=strategy.cash, default_qty_value=340, initial_capital=1000 )



//======Dimak Delay ======================================================================

i_qtyTimeUnits  = - input.float(1, "Delay between orders:", inline = "1", minval = 0, tooltip = "Use 0 for no delay", group="Time_Delay")
i_timeUnits     = input.string("minutes", "", inline = "1", options = ["seconds", "minutes", "hours", "days", "chart"], group="Time_Delay")
useDelay   = input.bool(false, "UseDelay", group="Time_Delay") 

// ————— Converts current chart timeframe into a float minutes value.
f_tfInMinutes() => 
    _tfInMinutes = timeframe.multiplier * (
      timeframe.isseconds ? 1. / 60             :
      timeframe.isminutes ? 1.                  :
      timeframe.isdaily   ? 60. * 24            :
      timeframe.isweekly  ? 60. * 24 * 7        :
      timeframe.ismonthly ? 60. * 24 * 30.4375  : na)

f_timeFrom(_from, _qty, _units) =>
    int _timeFrom = na
    // Remove any "s" letter in the _units argument, so we don't need to compare singular and plural unit names.
    _unit = str.replace_all(_units, "s", "")
    // Determine if we will calculate offset from the bar's time or from current time.
    _t = _from == "bar" ? time : _from == "close" ? time_close : timenow
    // Calculate time at offset.
    if _units == "chart"
        // Offset in chart res multiples.
        _timeFrom := int(_t + (f_tfInMinutes() * 60 * 1000 * _qty))
    else
        // Add the required _qty of time _units to the _from starting time.
        _year   = year(_t)       + (_unit == "year"   ? int(_qty) : 0)
        _month  = month(_t)      + (_unit == "month"  ? int(_qty) : 0)
        _day    = dayofmonth(_t) + (_unit == "day"    ? int(_qty) : 0)
        _hour   = hour(_t)       + (_unit == "hour"   ? int(_qty) : 0)
        _minute = minute(_t)     + (_unit == "minute" ? int(_qty) : 0)
        _second = second(_t)     + (_unit == "econd"  ? int(_qty) : 0)
        // Return the resulting time in ms Unix time format.
        _timeFrom := timestamp(_year, _month, _day, _hour, _minute, _second)

// Time delay filter
var float lastTradeTime = na

if nz(ta.change(strategy.position_size), time) != 0

    // An order has been executed; save the bar's time.
    lastTradeTime := time
// If user has chosen to do so, wait `i_qtyTimeUnits` `i_timeUnits` between orders

delayElapsed = useDelay ? f_timeFrom("close", i_qtyTimeUnits, i_timeUnits) >= lastTradeTime : true

// ==== Dimak Delay End ======================================================================

// ==== Dimak ATRfilterOk  ======================================================================

useAtrDelay = input.bool(false, "useAtrDelay", group="ATR Filter") 
longdAtr1  = input.int(2, "Fast Atr1", inline = "1", step=1, minval = 0, group="ATR Filter")
longdAtr2  = input.int(14, "Slow Atr2", inline = "1", step=1, minval = 0, group="ATR Filter")
dAtrFilter  = input.float(3, "Results: Atr1/Atr2", step=0.1, minval = 0, tooltip = "Short ATR too Big ?", group="ATR Filter")


dAtr1 = ta.atr(longdAtr1)
dAtr2 = ta.atr(longdAtr2)
//ATRfilterOk = true
ATRfilterOk = useAtrDelay ? (dAtr1/dAtr2) < dAtrFilter : true
// ==== Dimak ATRfilterOk End ======================================================================



c_verde_radiactivo = color.rgb(0, 255, 0, 0)
c_verde            = color.rgb(0, 128, 0, 0)
c_verde_oscuro     = color.rgb(0, 80, 0, 0)
c_rojo_radiactivo  = color.rgb(255, 0, 0, 0)
c_rojo             = color.rgb(128, 0, 0, 0)
c_rojo_oscuro      = color.rgb(80, 0, 0, 0)
noneColor          = color.new(color.white, 100)




GRUPO_per_pruebas = "Tests period"
fecha_inicio     = input(0, "Start date", group=GRUPO_per_pruebas) 
fecha_fin_usar   = input.bool(false, "Finish date", group=GRUPO_per_pruebas, inline="fecha_finalizacion") 
fecha_fin        = input(timestamp("1 Jan 2022"), "", group=GRUPO_per_pruebas, inline="fecha_finalizacion")
vela_en_fecha    = true
posicion_abierta = strategy.position_size != 0
LONG_abierto     = strategy.position_size > 0
SHORT_abierto    = strategy.position_size < 0


// DIMAK  Static SL/TP - Begin
GRUPO_statSLTP = "Static SL/TP"

// Make inputs that set the take profit % (optional)
var longProfitPerc = input.float(defval=2.6, title="Take Profit (%)", group=GRUPO_statSLTP, minval=0.0, step=0.1) / 100
var shortProfitPerc = longProfitPerc

var longSLPerc = input.float(defval=1.3, title="Stop Loss (%)", group=GRUPO_statSLTP, minval=0.0, step=0.1) / 100
var shortSLPerc = longSLPerc

// Figure out take profit price  (placed after strategy.entry("Abrir Long", strategy.long) )
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

longSLExitPrice  = strategy.position_avg_price * (1 - longSLPerc)
shortSLExitPrice = strategy.position_avg_price * (1 + shortSLPerc)

// use tak: limit=shortExitPrice, stop=shortSLExitPrice

// DIMAK  Static SL/TP - END



//== Strategy entry and exit conditions
GRUPO_P           = "Posiciones"

P_indicador       = input.string("Keltner Channel", "Indicator", ["Bollinger Bands", "Keltner Channel"], group=GRUPO_P)
P_permitir_LONGS  = input.bool(title="Use LONGS ?", group=GRUPO_P, defval=true)
P_permitir_SHORTS = input.bool(title="Use SHORTS ?", group=GRUPO_P, defval=false)

P_cond_entrada    = input.string("Wick out of band", "Enter Condition", ["Wick out of band", "Wick out of the band then close in", "Out-of-band closure", "Close out of the band then close in"], "Se puede escoger (en orden) que el precio haya salido de la banda, que además la siguiente vela cierre de nuevo dentro de la misma, que el precio tenga que cerrar fuera, y que además la siguiente vela tenga que cerrar dentro de nuevo.", group=GRUPO_P)


GRUPO_TPSL       = "Stop Loss and Take Profit"

TP_SL_tipo_SL    = input.string("useStaticSLTP", "Stop Loss Type", options=["Previous Wick", "Extended Band", "ATR", "useStaticSLTP"], group=GRUPO_TPSL)
TP_SL_tipo_TP    = input.string("useStaticSLTP",  "Take Profit Type", options=["Opposite Band", "Moving Average", "ATR", "useStaticSLTP"], group=GRUPO_TPSL)
TPSL_SL_ATR_mult = input.float(title="• (Solo ATR) Multiplicador Stop Loss", group=GRUPO_TPSL, defval=1, minval=0.1, step=0.1, inline="tp_sl", tooltip="These are the ATR multipliers to calculate STOP LOSS and TAKE PROFIT if selected as such.")
TPSL_TP_ATR_mult = input.float(title="• (Solo ATR) Multiplicador Take Profit", group=GRUPO_TPSL, defval=1.8, minval=0.1, step=0.1, inline="tp_sl")
TPSL_SL_BB_dev   = input.float(title="• (Solo STOP LOSS con BB) Desviación estándar", group=GRUPO_TPSL, defval=4.0, minval=0.01, step=0.5, tooltip="In case of using Bollinger Bands as STOP LOSS, this will be the value of its standard deviation.")
TPSL_SL_KC_mult  = input.float(title="• (Solo STOP LOSS con KC) Multiplicador", group=GRUPO_TPSL, defval=3, minval=0.01, step=0.5, tooltip="In case of using Keltner channels as STOP LOSS, this will be the value of your ATR multiplier.")
TP_SL_TP_dinamico = input.bool(title="Take Profit dinámico", group=GRUPO_TPSL, defval=false, tooltip="This will make the Take Profit adjust bar by bar instead of staying fixed at its initial value.")

GRUPO_KC  = "Keltner Channel"
KC_length = input.int(title="Keltner Long.", group=GRUPO_KC, defval=14, minval=1, inline="kc")
KC_mult   = input.float(title="Keltner Mult.", group=GRUPO_KC, defval=1.5, minval=0.01, step=0.05, inline="kc")
[KC_mid, KC_upper, KC_lower]  = ta.kc(close, KC_length, KC_mult, true)
[_, KC_upper_SL, KC_lower_SL] = ta.kc(close, KC_length, TPSL_SL_KC_mult, true)





// dimak KC timeframe

GRUPO_KC_TF  = "Keltner Channel - Multi TimeFrame"
KC_TF_length = input.int(title="Keltner TF Long:", group=GRUPO_KC_TF, defval=20, minval=1, inline="kc")
KC_TF_mult   = input.float(title="Keltner TF Mult:", group=GRUPO_KC_TF, defval=2, minval=0.01, step=0.05, inline="kc")
tf_indicator = input.timeframe(title="TimeFrame:", defval = '', group=GRUPO_KC_TF, inline = "03")

EMAi   = ta.ema(close, KC_TF_length)
[Keltmiddle, Keltupper, Keltlower] = ta.kc(close, KC_TF_length, KC_TF_mult)

KC_TF_upper  = request.security(syminfo.tickerid, tf_indicator, Keltupper, gaps=barmerge.gaps_off)
KC_TF_lower  = request.security(syminfo.tickerid, tf_indicator, Keltlower, gaps=barmerge.gaps_off)
KC_TF_mid = request.security(syminfo.tickerid, tf_indicator, EMAi, gaps=barmerge.gaps_off)

// dimak KC timeframe  END





//== Inputs de indicadores
// ATR
GRUPO_ATR      = "ATR"
ATR_referencia = input.source(title="ATR Reference", group=GRUPO_ATR, defval=close, inline="atr_calc") // The font is not applied to the ATR calculation, it is for the positioning with respect to the price on the chart
ATR_length     = input.int(title="ATR Length", group=GRUPO_ATR, defval=7, minval=1, inline="atr_calc")
ATR            = ta.atr(ATR_length)
ATR_sl         = ATR * TPSL_SL_ATR_mult
ATR_tp         = ATR * TPSL_TP_ATR_mult
ATR_LONG_sl    = ATR_referencia - ATR_sl // Conversely, the lower one can be used as STOP LOSS or TRAILING STOP
ATR_LONG_tp    = ATR_referencia + ATR_tp // The ATR on the candles can be used as TAKE PROFIT
ATR_SHORT_sl   = ATR_referencia + ATR_sl // ""
ATR_SHORT_tp   = ATR_referencia - ATR_tp // For Shorts it's the other way around

GRUPO_BB  = "Bollinger Bands"
BB_length = input.int(title="BB Long. ", group=GRUPO_BB, defval=20, minval=1, inline="bb")
BB_dev   = input.float(title="BB Deviation (Desv.)", group=GRUPO_BB, defval=2.0, minval=0.01, step=0.5, inline="bb")
[BB_mid, BB_upper, BB_lower]  = ta.bb(close, BB_length, BB_dev)
[_, BB_upper_SL, BB_lower_SL] = ta.bb(close, BB_length, TPSL_SL_BB_dev)



//== Calculation of conditions
// Assign common variables based on the selected indicator
banda_superior = BB_upper
media_movil    = BB_mid
banda_inferior = BB_lower
banda_extendida_sup_SL = BB_upper_SL
banda_extendida_inf_SL = BB_lower_SL

if (P_indicador == "Keltner Channel")
    banda_superior := KC_upper
    media_movil    := KC_mid
    banda_inferior := KC_lower
    banda_extendida_sup_SL := KC_upper_SL
    banda_extendida_inf_SL := KC_lower_SL

// Calcular condiciones de entrada
longCondition1  = false
shortCondition1 = false

if (P_cond_entrada == "Wick out of band")
    longCondition1  := low < banda_inferior
    shortCondition1 := high > banda_superior
else if (P_cond_entrada == "Wick out of the band then close in")
    longCondition1  := low[1] < banda_inferior and close > banda_inferior
    shortCondition1 := high[1] > banda_superior and close < banda_superior
else if (P_cond_entrada == "Out-of-band closure")
    longCondition1  := close < banda_inferior
    shortCondition1 := close > banda_superior
else // Close out of the band then close in
    longCondition1  := close[1] < banda_inferior and close > banda_inferior
    shortCondition1 := close[1] > banda_superior and close < banda_superior



//== Entrada (deben cumplirse todas para entrar)
longCondition2  = true
longCondition3  = true
long_conditions = longCondition1 and longCondition2 and longCondition3
entrar_en_LONG  = P_permitir_LONGS and long_conditions and vela_en_fecha and ATR > 0.0                            // Lo del ATR > 0.0 es por seguridad ya que puede darse una entrada donde aún no es calculable el ATR porque no existan velas y nunca cerrar posición pues no se creó correctamente // Solo permitir 1 posición al mismo tiempo

shortCondition2  = true
shortCondition3  = true
short_conditions = shortCondition1 and shortCondition2 and shortCondition3
entrar_en_SHORT  = P_permitir_SHORTS and short_conditions and vela_en_fecha and ATR > 0.0 // Lo del ATR > 0.0 es por seguridad ya que puede darse una entrada donde aún no es calculable el ATR porque no existan velas y nunca cerrar posición pues no se creó correctamente // Solo permitir 1 posición al mismo tiempo

var LONG_take_profit  = 0.0
var LONG_stop_loss    = 0.0
var SHORT_take_profit = 0.0
var SHORT_stop_loss   = 0.0


if (entrar_en_LONG and not posicion_abierta and delayElapsed and ATRfilterOk)
    strategy.entry("L", strategy.long, alert_message="enter_cycle")
 

else if (entrar_en_SHORT and not posicion_abierta and delayElapsed and ATRfilterOk)
    strategy.entry("S", strategy.short, alert_message="enter_cycle")
    
   
SHORT_stop_loss   := TP_SL_tipo_SL == "useStaticSLTP" ? shortSLExitPrice : TP_SL_tipo_SL == "Previous Wick" ? (P_cond_entrada == "Wick out of band" or P_cond_entrada == "Out-of-band closure" ? high[1] : high) : TP_SL_tipo_SL == "Extended Band" ? banda_extendida_sup_SL : ATR_SHORT_sl
SHORT_take_profit := TP_SL_tipo_TP == "useStaticSLTP" ? shortExitPrice : TP_SL_tipo_TP == "Opposite Band" ? banda_inferior : TP_SL_tipo_TP == "Moving Average" ? media_movil : ATR_SHORT_tp
    
LONG_stop_loss   := TP_SL_tipo_SL == "useStaticSLTP" ? longSLExitPrice : TP_SL_tipo_SL == "Previous Wick" ? (P_cond_entrada == "Wick out of band" or P_cond_entrada == "Out-of-band closure" ? low[1] : low) : TP_SL_tipo_SL == "Extended Band" ? banda_extendida_inf_SL : ATR_LONG_sl
LONG_take_profit := TP_SL_tipo_TP == "useStaticSLTP" ? longExitPrice : TP_SL_tipo_TP == "Opposite Band" ? banda_superior : TP_SL_tipo_TP == "Moving Average" ? media_movil : ATR_LONG_tp
   
strategy.exit("CL", "L", limit=LONG_take_profit, stop=LONG_stop_loss, alert_message="stoploss")
strategy.exit("CS", "S", limit=SHORT_take_profit, stop=SHORT_stop_loss, alert_message="stoploss")

// use {{strategy.order.alert_message}} in Alerts


// Not using by Dimak
if (posicion_abierta and TP_SL_TP_dinamico)
    if (LONG_abierto)
        LONG_take_profit := TP_SL_tipo_TP == "Opposite Band" ? banda_superior : TP_SL_tipo_TP == "Moving Average" ? media_movil : ATR_LONG_tp
        strategy.exit("Cerrar Long", "Abrir Long", limit=LONG_take_profit, stop=LONG_stop_loss, alert_message="stoploss")
    else
        SHORT_take_profit := TP_SL_tipo_TP == "Opposite Band" ? banda_inferior : TP_SL_tipo_TP == "Moving Average" ? media_movil : ATR_SHORT_tp
        strategy.exit("Cerrar Short", "Abrir Short", limit=SHORT_take_profit, stop=SHORT_stop_loss, alert_message="stoploss")



//== Ploteo en pantalla
bgcolor(entrar_en_LONG ? color.new(color.green, 90) : entrar_en_SHORT ? color.new(color.red, 90) : noneColor)

// ATR
plot(TP_SL_tipo_TP == "ATR" ? ATR_LONG_tp : na, style=plot.style_stepline, color=color.new(color.green, 80), linewidth=1)
plot(TP_SL_tipo_SL == "ATR" ? ATR_LONG_sl : na, style=plot.style_stepline, color=color.new(color.red, 80), linewidth=1)
plot(TP_SL_tipo_TP == "ATR" ? ATR_SHORT_tp : na, style=plot.style_stepline, color=color.new(color.green, 80), linewidth=1)
plot(TP_SL_tipo_SL == "ATR" ? ATR_SHORT_sl : na, style=plot.style_stepline, color=color.new(color.red, 80), linewidth=1)

// Canal y media
plot(banda_superior, "Banda superior", color.aqua)
plot(media_movil, "Moving Average", color.orange)
plot(banda_inferior, "Banda inferior", color.aqua)

// Bandas extendidas
plot(TP_SL_tipo_SL == "Extended Band" ? banda_extendida_sup_SL : na, "Banda superior extendida (Stop Loss)", color.red, style=plot.style_circles)
plot(TP_SL_tipo_SL == "Extended Band" ? banda_extendida_inf_SL : na, "Banda inferior extendida (Stop Loss)", color.red, style=plot.style_circles)

// Precio de compra, Take Profit, Stop Loss y relleno
avg_position_price_plot = plot(series=posicion_abierta ? strategy.position_avg_price : na, color=color.new(color.white, 25), style=plot.style_linebr, linewidth=2, title="Precio Entrada")

LONG_tp_plot            = plot(LONG_abierto and LONG_take_profit > 0.0 ? LONG_take_profit : na, color=color.new(color.lime, 25), style=plot.style_linebr, linewidth=3, title="LONG Take Profit")
LONG_sl_plot            = plot(LONG_abierto and LONG_stop_loss > 0.0? LONG_stop_loss : na, color=color.new(color.red, 25), style=plot.style_linebr, linewidth=3, title="Long Stop Loss")
fill(avg_position_price_plot, LONG_tp_plot, color=color.new(color.olive, 85))
fill(avg_position_price_plot, LONG_sl_plot, color=color.new(color.maroon, 85))

SHORT_tp_plot            = plot(SHORT_abierto and SHORT_take_profit > 0.0 ? SHORT_take_profit : na, color=color.new(color.lime, 25), style=plot.style_linebr, linewidth=3, title="SHORT Take Profit")
SHORT_sl_plot            = plot(SHORT_abierto and SHORT_stop_loss > 0.0 ? SHORT_stop_loss : na, color=color.new(color.red, 25), style=plot.style_linebr, linewidth=3, title="Short Stop Loss")
fill(avg_position_price_plot, SHORT_tp_plot, color=color.new(color.olive, 85))
fill(avg_position_price_plot, SHORT_sl_plot, color=color.new(color.maroon, 85))

```

> Detail

https://www.fmz.com/strategy/427017

> Last Modified

2023-09-16 22:46:42
