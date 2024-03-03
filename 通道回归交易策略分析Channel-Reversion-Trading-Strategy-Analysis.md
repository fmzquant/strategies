
> Name

通道回归交易策略分析Channel-Reversion-Trading-Strategy-Analysis

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea7b8a6f6608d4dd47.png)

[trans]


## 概述

本策略基于布林带和肯特纳通道进行价格通道交易。它利用价格突破上下通道边界线后回归通道内部的特征来识别交易机会。该策略提供了多种自定义选项,允许您根据资产和时间周期进行调整。

## 策略原理

该策略主要包含以下关键部分:

1. **通道指标选择**:布林带或肯特纳通道

2. **入场条件**: 价格突破通道边界线,以及是否要求下根K线收盘回归通道内

3. **止损方式**: 前根K线影线、扩大通道边界、ATR止损

4. **止盈方式**: 对边通道边界、通道中轨、ATR止盈

5. **其他配置**: 只做多、只做空、是否允许动态调整止盈位等

通过上述组合,该策略实现了根据行情特征动态判断最佳入场时机和出场目标的功能。

## 优势分析

相比固定的移动止损止盈策略,该策略具有以下优势:

1. 利用通道具有的包含价格波动范围的特点,可以更准确把握市场趋势的转折点。

2. 丰富的止损止盈方式可任意组合,可针对不同品种和周期进行最佳配置。

3. 基于通道指标进行突破回归操作,可以利用小范围震荡吞噬对手方资金。

4. ATR计算的止盈止损距离随市场波动性自动调整,具有适应性强的优点。

5. 允许动态调整止盈位,充分挖掘行情可能的额外运行空间。

## 风险分析

该策略主要存在以下风险:

1. 大幅度趋势市场中,通道可能失效导致止损被激活。可以适当放宽止损距离。

2. 市场具有高波动率时,ATR计算的止盈止损距离过大,可能导致亏损扩大。可以考虑缩减ATR系数。

3. 震荡行情中,价格可能频繁触发通道边界造成过于频繁交易。可以考虑只在收盘突破的条件下入场。

4. 行情剧烈反转时,动态调整止盈无法及时止损可能造成损失。建议关键Support/Resistant位附近退出。

## 优化方向

该策略仍可从以下方面进行优化:

1. 测试不同ATR计算周期的参数对策略最大回撤的影响。

2. 测试加入趋势判断指标,在趋势不明显时暂停交易。

3. 测试JOIN交易法则,在重要的支撑压力区域附近降低仓位。

4. 增加交易量控制措施,避免单笔亏损过大。

5. 针对具体品种进行参数优化测试,寻找最优参数组合。

## 总结

本策略总体来说是一个基于通道指标的突破回归交易策略。它提供了丰富的配置选项,可针对不同市场环境进行调整。优点是可以把握市场反转时点,具有灵活性强的特点。但也需要注意在大行情中止损被破坏的风险。未来可从趋势判断、风险控制等方面进行优化,使策略更实用。
||

## Overview

This strategy is based on price channel trading using Bollinger Bands and Keltner Channels. It identifies trading opportunities by the characteristic of price bouncing back after breaking through the upper or lower channel boundary lines. The strategy provides multiple customizable options to refine it for your asset and timeframe.

## Strategy Logic

The key components of this strategy are:

1. **Channel Indicator**: Bollinger Bands or Keltner Channels 

2. **Entry Conditions**: Price breakout of channel boundary, with option to require reversion back inside on next candle close

3. **Stop Loss**: Previous candle's wick, extended channel bands, ATR stop loss

4. **Take Profit**: Opposite channel bands, channel midline, ATR take profit 

5. **Other Configurations**: Long only, short only, dynamic take profit adjustment etc.

With the above combinations, the strategy dynamically determines optimal entry and exit points according to market conditions.

## Advantage Analysis 

Compared to fixed moving stop/take profit strategies, this strategy has the following advantages:

1. Utilizes the capability of channels to contain price fluctuations, more accurately capturing trend reversal points.

2. Diverse stop loss and take profit options allow best configuration for different assets and timeframes. 

3. Breakout and reversion operations based on channel indicators can leverage small range oscillations to absorb opponent's funds.

4. ATR-calculated stop/take profit distances automatically adjust to market volatility.

5. Allowing dynamic take profit adjustment fully exploits potential additional running space.

## Risk Analysis

The main risks of this strategy are:

1. In strong trending markets, channel failure may trigger stop loss. Stop loss distance can be loosened.

2. With high volatility, ATR calculated stop/take profit distances may be too wide, enlarging losses. Consider reducing ATR coefficient.

3. In ranging markets, frequent channel boundary touches may cause over-trading. Consider entry on close breakouts only. 

4. Severe reversals may hit take profit before stop loss with dynamic adjustment. Exits near key S/R levels recommended.

## Optimization Directions

This strategy can be further optimized by:

1. Testing ATR period parameters for impact on max drawdown.

2. Incorporating trend indicators to pause trading when trend is unclear.

3. Testing JOIN reversion techniques to reduce position size near key S/R zones. 

4. Adding trading size controls to limit single trade loss.

5. Parameter optimization for specific assets to find optimal parameter combinations.

## Summary

In summary, this is a channel breakout and reversion strategy. It provides rich configuration options for various market environments. The advantages are capturing reversal points and flexibility. But beware of stop loss invalidation in strong trends. Future optimizations on trend, risk control etc. will improve practicality.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(1 Jan 2000)|(?Período de pruebas)• Fecha de inicio|
|v_input_string_1|Canales de Keltner|(?Posiciones)Indicador|
|v_input_bool_1|true|¿LONGS?|
|v_input_bool_2|true|¿SHORTS?|
|v_input_string_2|Cierre fuera de la banda y luego cierre dentro|Condición de entrada|
|v_input_string_3|0|(?Stop Loss y Take Profit)Tipo de Stop Loss: Banda extendida|Mecha anterior|ATR|
|v_input_string_4|0|Tipo de Take Profit: Banda contraria|Media móvil|ATR|
|v_input_float_1|true|• (Solo ATR) Multiplicador Stop Loss / Take Profit|
|v_input_float_2|1.8|TPSL_TP_ATR_mult|
|v_input_float_3|4|• (Solo STOP LOSS con BB) Desviación estándar|
|v_input_float_4|3|• (Solo STOP LOSS con KC) Multiplicador|
|v_input_bool_3|false|Take Profit dinámico|
|v_input_source_1_close|0|(?ATR)• Referencia / Longitud: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|7|ATR_length|
|v_input_int_2|20|(?Bollinger Bands)• Long. / Desv. |
|v_input_float_5|2|BB_dev|
|v_input_int_3|35|(?Keltner Channel)• Long. / Mult. |
|v_input_float_6|1.5|KC_mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-10 00:00:00
end: 2023-10-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// Copyright © 2022, José Manuel Gassin Pérez-Traverso, All rights reserved.
// © JoseMetal
//@version=5

// Ésta estrategia se basa en los rebotes de canales (ya sea Bandas de Bollinger o Keltner Channel) para entrar y salir de posiciones, tiene multitud de opciones para
// elegir el tipo de stop loss o take profit, ya sea utilizando mínimos/máximos anteriores, ATR o las propias bandas.
// La entrada de posiciones también tiene variedad de opciones, por ejemplo, se puede entrar cuando el precio salga de la banda y vuelva a entrar, o simplemente en cuanto una vela cierre fuera.
// De éste modo y con todas éstas opciones se puede realizar un backtest exhaustivo para buscar la mejor combinación según activo y temporalidad.

//== Constantes
c_verde_radiactivo = color.rgb(0, 255, 0, 0)
c_verde            = color.rgb(0, 128, 0, 0)
c_verde_oscuro     = color.rgb(0, 80, 0, 0)
c_rojo_radiactivo  = color.rgb(255, 0, 0, 0)
c_rojo             = color.rgb(128, 0, 0, 0)
c_rojo_oscuro      = color.rgb(80, 0, 0, 0)
noneColor          = color.new(color.white, 100)



//== Declarar estrategia y período de testeo
strategy("Estrategia de Canales [JoseMetal]", shorttitle="Estrategia de Canales [JoseMetal]", overlay=true, initial_capital=10000, pyramiding=0, default_qty_value=10, default_qty_type=strategy.percent_of_equity, commission_type=strategy.commission.percent, commission_value=0.0, max_labels_count=500, max_bars_back=1000)
fecha_inicio     = input(timestamp("1 Jan 2000"), title="• Fecha de inicio", group="Período de pruebas", inline="periodo_de_pruebas")
vela_en_fecha    = true
posicion_abierta = strategy.position_size != 0
LONG_abierto     = strategy.position_size > 0
SHORT_abierto    = strategy.position_size < 0

//== Condiciones de entrada y salida de estrategia
GRUPO_P           = "Posiciones"
P_indicador       = input.string("Canales de Keltner", "Indicador", ["Bandas de Bollinger", "Canales de Keltner"], "Se puede escoger entre los indicadores de Bandas de Bollinger y Canales de Keltner para las condiciones, éstos se usarán también para el Stop Loss y Take Profit y se escogen para dicha función.", group=GRUPO_P)
P_permitir_LONGS  = input.bool(title="¿LONGS?", group=GRUPO_P, defval=true)
P_permitir_SHORTS = input.bool(title="¿SHORTS?", group=GRUPO_P, defval=true)
P_cond_entrada    = input.string("Cierre fuera de la banda y luego cierre dentro", "Condición de entrada", ["Mecha fuera de la banda", "Mecha fuera de la banda y luego cierre dentro", "Cierre fuera de la banda", "Cierre fuera de la banda y luego cierre dentro"], "Se puede escoger (en orden) que el precio haya salido de la banda, que además la siguiente vela cierre de nuevo dentro de la misma, que el precio tenga que cerrar fuera, y que además la siguiente vela tenga que cerrar dentro de nuevo.", group=GRUPO_P)

GRUPO_TPSL       = "Stop Loss y Take Profit"
TP_SL_tipo_SL    = input.string("Banda extendida", "Tipo de Stop Loss", options=["Mecha anterior", "Banda extendida", "ATR"], group=GRUPO_TPSL)
TP_SL_tipo_TP    = input.string("Banda contraria",  "Tipo de Take Profit", options=["Banda contraria", "Media móvil", "ATR"], group=GRUPO_TPSL)
TPSL_SL_ATR_mult = input.float(title="• (Solo ATR) Multiplicador Stop Loss / Take Profit", group=GRUPO_TPSL, defval=1, minval=0.1, step=0.1, inline="tp_sl", tooltip="Éstos son los multiplicadores al ATR para calcular STOP LOSS y TAKE PROFIT en caso de seleccionarse como tales.")
TPSL_TP_ATR_mult = input.float(title="", group=GRUPO_TPSL, defval=1.8, minval=0.1, step=0.1, inline="tp_sl")
TPSL_SL_BB_dev   = input.float(title="• (Solo STOP LOSS con BB) Desviación estándar", group=GRUPO_TPSL, defval=4.0, minval=0.01, step=0.5, tooltip="En caso de usar las Bandas de Bollinger como STOP LOSS, éste será el valor de su desviación estándar.")
TPSL_SL_KC_mult  = input.float(title="• (Solo STOP LOSS con KC) Multiplicador", group=GRUPO_TPSL, defval=3, minval=0.01, step=0.5, tooltip="En caso de usar los canales de Keltner como STOP LOSS, éste será el valor de su multiplicador de ATR.")
TP_SL_TP_dinamico = input.bool(title="Take Profit dinámico", group=GRUPO_TPSL, defval=false, tooltip="Ésto hará que el Take Profit se ajuste vela a vela en lugar de quedarse fijo en su valor inicial.")



//== Inputs de indicadores
// ATR
GRUPO_ATR      = "ATR"
ATR_referencia = input.source(title="• Referencia / Longitud", group=GRUPO_ATR, defval=close, inline="atr_calc") // La fuente no se aplica al cálculo del ATR, es para el posicionamiento respecto al precio en el gráfico
ATR_length     = input.int(title="", group=GRUPO_ATR, defval=7, minval=1, inline="atr_calc")
ATR            = ta.atr(ATR_length)
ATR_sl         = ATR * TPSL_SL_ATR_mult
ATR_tp         = ATR * TPSL_TP_ATR_mult
ATR_LONG_sl    = ATR_referencia - ATR_sl // De forma contraria el inferior se puede usar como STOP LOSS o TRAILING STOP
ATR_LONG_tp    = ATR_referencia + ATR_tp // El ATR sobre las velas se puede usar como TAKE PROFIT
ATR_SHORT_sl   = ATR_referencia + ATR_sl // ""
ATR_SHORT_tp   = ATR_referencia - ATR_tp // Para Shorts es al revés

GRUPO_BB  = "Bollinger Bands"
BB_length = input.int(title="• Long. / Desv. ", group=GRUPO_BB, defval=20, minval=1, inline="bb")
BB_dev   = input.float(title="", group=GRUPO_BB, defval=2.0, minval=0.01, step=0.5, inline="bb")
[BB_mid, BB_upper, BB_lower]  = ta.bb(close, BB_length, BB_dev)
[_, BB_upper_SL, BB_lower_SL] = ta.bb(close, BB_length, TPSL_SL_BB_dev)

GRUPO_KC  = "Keltner Channel"
KC_length = input.int(title="• Long. / Mult. ", group=GRUPO_KC, defval=35, minval=1, inline="kc")
KC_mult   = input.float(title="", group=GRUPO_KC, defval=1.5, minval=0.01, step=0.5, inline="kc")
[KC_mid, KC_upper, KC_lower]  = ta.kc(close, KC_length, KC_mult, true)
[_, KC_upper_SL, KC_lower_SL] = ta.kc(close, KC_length, TPSL_SL_KC_mult, true)



//== Cálculo de condiciones
// Asignar variables comunes en función del indicador seleccionado
banda_superior = BB_upper
media_movil    = BB_mid
banda_inferior = BB_lower
banda_extendida_sup_SL = BB_upper_SL
banda_extendida_inf_SL = BB_lower_SL

if (P_indicador == "Canales de Keltner")
    banda_superior := KC_upper
    media_movil    := KC_mid
    banda_inferior := KC_lower
    banda_extendida_sup_SL := KC_upper_SL
    banda_extendida_inf_SL := KC_lower_SL

// Calcular condiciones de entrada
longCondition1  = false
shortCondition1 = false

if (P_cond_entrada == "Mecha fuera de la banda")
    longCondition1  := low < banda_inferior
    shortCondition1 := high > banda_superior
else if (P_cond_entrada == "Mecha fuera de la banda y luego cierre dentro")
    longCondition1  := low[1] < banda_inferior and close > banda_inferior
    shortCondition1 := high[1] > banda_superior and close < banda_superior
else if (P_cond_entrada == "Cierre fuera de la banda")
    longCondition1  := close < banda_inferior
    shortCondition1 := close > banda_superior
else // Cierre fuera de la banda y luego cierre dentro
    longCondition1  := close[1] < banda_inferior and close > banda_inferior
    shortCondition1 := close[1] > banda_superior and close < banda_superior



//== Entrada (deben cumplirse todas para entrar)
longCondition2  = true
longCondition3  = true
long_conditions = longCondition1 and longCondition2 and longCondition3
entrar_en_LONG  = P_permitir_LONGS and long_conditions and vela_en_fecha and not posicion_abierta and ATR > 0.0 // Lo del ATR > 0.0 es por seguridad ya que puede darse una entrada donde aún no es calculable el ATR porque no existan velas y nunca cerrar posición pues no se creó correctamente // Solo permitir 1 posición al mismo tiempo

shortCondition2  = true
shortCondition3  = true
short_conditions = shortCondition1 and shortCondition2 and shortCondition3
entrar_en_SHORT  = P_permitir_SHORTS and short_conditions and vela_en_fecha and not posicion_abierta and ATR > 0.0 // Lo del ATR > 0.0 es por seguridad ya que puede darse una entrada donde aún no es calculable el ATR porque no existan velas y nunca cerrar posición pues no se creó correctamente // Solo permitir 1 posición al mismo tiempo

var LONG_take_profit  = 0.0
var LONG_stop_loss    = 0.0
var SHORT_take_profit = 0.0
var SHORT_stop_loss   = 0.0

if (entrar_en_LONG)
    LONG_stop_loss   := TP_SL_tipo_SL == "Mecha anterior" ? (P_cond_entrada == "Mecha fuera de la banda" or P_cond_entrada == "Cierre fuera de la banda" ? low[1] : low) : TP_SL_tipo_SL == "Banda extendida" ? banda_extendida_inf_SL : ATR_LONG_sl
    LONG_take_profit := TP_SL_tipo_TP == "Banda contraria" ? banda_superior : TP_SL_tipo_TP == "Media móvil" ? media_movil : ATR_LONG_tp
    strategy.entry("Abrir Long", strategy.long)
    strategy.exit("Cerrar Long", "Abrir Long", limit=LONG_take_profit, stop=LONG_stop_loss)
else if (entrar_en_SHORT)
    SHORT_stop_loss   := TP_SL_tipo_SL == "Mecha anterior" ? (P_cond_entrada == "Mecha fuera de la banda" or P_cond_entrada == "Cierre fuera de la banda" ? high[1] : high) : TP_SL_tipo_SL == "Banda extendida" ? banda_extendida_sup_SL : ATR_SHORT_sl
    SHORT_take_profit := TP_SL_tipo_TP == "Banda contraria" ? banda_inferior : TP_SL_tipo_TP == "Media móvil" ? media_movil : ATR_SHORT_tp
    strategy.entry("Abrir Short", strategy.short)
    strategy.exit("Cerrar Short", "Abrir Short", limit=SHORT_take_profit, stop=SHORT_stop_loss)

if (posicion_abierta and TP_SL_TP_dinamico)
    if (LONG_abierto)
        LONG_take_profit := TP_SL_tipo_TP == "Banda contraria" ? banda_superior : TP_SL_tipo_TP == "Media móvil" ? media_movil : ATR_LONG_tp
        strategy.exit("Cerrar Long", "Abrir Long", limit=LONG_take_profit, stop=LONG_stop_loss)
    else
        SHORT_take_profit := TP_SL_tipo_TP == "Banda contraria" ? banda_inferior : TP_SL_tipo_TP == "Media móvil" ? media_movil : ATR_SHORT_tp
        strategy.exit("Cerrar Short", "Abrir Short", limit=SHORT_take_profit, stop=SHORT_stop_loss)



//== Ploteo en pantalla
bgcolor(entrar_en_LONG ? color.new(color.green, 90) : entrar_en_SHORT ? color.new(color.red, 90) : noneColor)

// ATR
plot(TP_SL_tipo_TP == "ATR" ? ATR_LONG_tp : na, style=plot.style_stepline, color=color.new(color.green, 80), linewidth=1)
plot(TP_SL_tipo_SL == "ATR" ? ATR_LONG_sl : na, style=plot.style_stepline, color=color.new(color.red, 80), linewidth=1)
plot(TP_SL_tipo_TP == "ATR" ? ATR_SHORT_tp : na, style=plot.style_stepline, color=color.new(color.green, 80), linewidth=1)
plot(TP_SL_tipo_SL == "ATR" ? ATR_SHORT_sl : na, style=plot.style_stepline, color=color.new(color.red, 80), linewidth=1)

// Canal y media
plot(banda_superior, "Banda superior", color.aqua)
plot(media_movil, "Media móvil", color.orange)
plot(banda_inferior, "Banda inferior", color.aqua)

// Bandas extendidas
plot(TP_SL_tipo_SL == "Banda extendida" ? banda_extendida_sup_SL : na, "Banda superior extendida (Stop Loss)", color.red, style=plot.style_circles)
plot(TP_SL_tipo_SL == "Banda extendida" ? banda_extendida_inf_SL : na, "Banda inferior extendida (Stop Loss)", color.red, style=plot.style_circles)

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

https://www.fmz.com/strategy/429489

> Last Modified

2023-10-17 15:48:36
