
> Name

EMA-AROON-ASH

> Author

ChaoZhang

> Strategy Description

=== IMPORTANT ===
My intention is to find the best strategies and dump the bad ones, as you can check by yourself using this automated strategy, the result is...
*** BAD STRATEGY, AVOID ***

=== INTRO and CREDITS ===
This script is a mix of 3 indicators in order to recreate TRADE KING's strategy from YouTube.
First indicator is an EMA ( Exponential Moving Average ) (200 periods).
Second is the classic Aroon indicator.
And third is the Absolute Strength Histogram, the one by "jiehonglim", name is A"bsolute Strength Histogram v2 | jh".
Credit for each indicator belongs to them, i just modified those to add some extra options, settings, etc, also updated all the code to PineScript 5.

=== THE STRATEGY ===
Default settings are already as TRADE KING requires, so you don't have to change anything.
FOR LONGS (green background shows LONG entries).
1. Price must be ABOVE the EMA .
2. Bullish Aroon crossover.
3. Bullish absolute strength histogram line must be ABOVE the bearish one.

FOR SHORTS (red background shows SHORT entries).
1. Price must be BELOW the EMA .
2. Bearish Aroon crossover.
3. Bearish absolute strength histogram line must be ABOVE the bullish one.

Please check TRADE KING's YouTube channel for more info.

=== GENERAL IMPROVEMENTS ===
Upgrade to PineScript 5.
Some performance improvements.

=== PERSONAL NOTES ===
The author of this strategy recommends 5M charts, however, 4H shows to be the best.

Thanks again to the authors of the indicators that compose this script and to TRADE KING to create this strategy.

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/149789d550e035016a9.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|Indicator Method: RSI|STOCHASTIC|ADX|
|v_input_string_2|0|MA: WMA|EMA|ALMA|SMA|SMMA|HMA|
|v_input_float_2|0.85|* Arnaud Legoux (ALMA) Only - Offset Value|
|v_input_int_4|6|* Arnaud Legoux (ALMA) Only - Sigma Value|
|v_input_bool_1|true|(?Positions)¿LONGS?|
|v_input_bool_2|true|¿SHORTS?|
|v_input_int_1|20|(?TP y SL)• SL lookback for pivot / Mult. TP|
|v_input_float_1|2|TPSL_SL_mult|
|v_input_int_2|200|(?Exponential Moving Average (EMA))Length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|20|(?Aroon)• Length|
|v_input_2|9|(?Absolute Strength Histogram v2 | jh)Period of Evaluation|
|v_input_3|3|Period of Smoothing|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-09 00:00:00
end: 2022-05-08 23:59:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


// © JoseMetal
//@version=5

// 

//== Constantes
c_verde_radiactivo = color.rgb(0, 255, 0, 0)
c_verde            = color.rgb(0, 128, 0, 0)
c_verde_oscuro     = color.rgb(0, 80, 0, 0)
c_rojo_radiactivo  = color.rgb(255, 0, 0, 0)
c_rojo             = color.rgb(128, 0, 0, 0)
c_rojo_oscuro      = color.rgb(80, 0, 0, 0)




//== Funciones



//== Declarar estrategia y período de testeo
//strategy("EMA + AROON + ASH (TRADE KING's STRATEGY)", shorttitle="EMA + AROON + ASH (TRADE KING's STRATEGY)", overlay=true, initial_capital=10000, pyramiding=0, default_qty_value=10, default_qty_type=strategy.percent_of_equity, commission_type=strategy.commission.percent, commission_value=0.00075, max_labels_count=500, max_bars_back=1000)
//fecha_inicio     = input.time(timestamp("1 Jan 2000"), title="• Start date", group="Test period", inline="periodo_de_pruebas")
vela_en_fecha    = true
posicion_abierta = strategy.position_size != 0
LONG_abierto     = strategy.position_size > 0
SHORT_abierto    = strategy.position_size < 0

//== Condiciones de entrada y salida de estrategia
GRUPO_P           = "Positions"
P_permitir_LONGS  = input.bool(title="¿LONGS?", group=GRUPO_P, defval=true)
P_permitir_SHORTS = input.bool(title="¿SHORTS?", group=GRUPO_P, defval=true)

GRUPO_TPSL   = "TP y SL"
TPSL_TP_pivot_lookback = input.int(title="• SL lookback for pivot / Mult. TP", group=GRUPO_TPSL, defval=20, minval=1, step=1, inline="tp_sl")
TPSL_SL_mult = input.float(title="", group=GRUPO_TPSL, defval=2.0, minval=0.1, step=0.2, inline="tp_sl")



//== Inputs de indicadores
// EMA
GRUPO_EMA  = "Exponential Moving Average (EMA)"
EMA_length = input.int(200, minval=1, title="Length", group=GRUPO_EMA)
EMA_src    = input(close, title="Source", group=GRUPO_EMA)
EMA = ta.ema(EMA_src, EMA_length)

// Aroon
GRUPO_Aroon = "Aroon"
Aroon_length = input.int(title="• Length", group=GRUPO_Aroon, defval=20, minval=1)
Aroon_upper = 100 * (ta.highestbars(high, Aroon_length+1) + Aroon_length) / Aroon_length
Aroon_lower = 100 * (ta.lowestbars(low, Aroon_length+1) + Aroon_length) / Aroon_length

// ASH
GRUPO_ASH = "Absolute Strength Histogram v2 | jh"
ASH_Length = input(9, title='Period of Evaluation', group=GRUPO_ASH)
ASH_Smooth = input(3, title='Period of Smoothing', group=GRUPO_ASH)
ASH_src = input(close, title='Source')
ASH_Mode = input.string(title='Indicator Method', defval='RSI', options=['RSI', 'STOCHASTIC', 'ADX'])
ASH_ma_type = input.string(title='MA', defval='WMA', options=['ALMA', 'EMA', 'WMA', 'SMA', 'SMMA', 'HMA'])
ASH_alma_offset = input.float(defval=0.85, title='* Arnaud Legoux (ALMA) Only - Offset Value', minval=0, step=0.01)
ASH_alma_sigma = input.int(defval=6, title='* Arnaud Legoux (ALMA) Only - Sigma Value', minval=0)

_MA(type, src, len) =>
    float result = 0
    if type == 'SMA'  // Simple
        result := ta.sma(src, len)
        result
    if type == 'EMA'  // Exponential
        result := ta.ema(src, len)
        result
    if type == 'WMA'  // Weighted
        result := ta.wma(src, len)
        result
    if type == 'SMMA'  // Smoothed
        w = ta.wma(src, len)
        result := na(w[1]) ? ta.sma(src, len) : (w[1] * (len - 1) + src) / len
        result
    if type == 'HMA'  // Hull
        result := ta.wma(2 * ta.wma(src, len / 2) - ta.wma(src, len), math.round(math.sqrt(len)))
        result
    if type == 'ALMA'  // Arnaud Legoux
        result := ta.alma(src, len, ASH_alma_offset, ASH_alma_sigma)
        result
    result

Price1 = _MA('SMA', ASH_src, 1)
Price2 = _MA('SMA', ASH_src[1], 1)

// RSI
Bulls0 = 0.5 * (math.abs(Price1 - Price2) + Price1 - Price2)
Bears0 = 0.5 * (math.abs(Price1 - Price2) - (Price1 - Price2))

// STOCHASTIC
Bulls1 = Price1 - ta.lowest(Price1, ASH_Length)
Bears1 = ta.highest(Price1, ASH_Length) - Price1

// ADX
Bulls2 = 0.5 * (math.abs(high - high[1]) + high - high[1])
Bears2 = 0.5 * (math.abs(low[1] - low) + low[1] - low)

Bulls = ASH_Mode == 'RSI' ? Bulls0 : ASH_Mode == 'STOCHASTIC' ? Bulls1 : Bulls2
Bears = ASH_Mode == 'RSI' ? Bears0 : ASH_Mode == 'STOCHASTIC' ? Bears1 : Bears2
AvgBulls = _MA(ASH_ma_type, Bulls, ASH_Length)
AvgBears = _MA(ASH_ma_type, Bears, ASH_Length)

SmthBulls = _MA(ASH_ma_type, AvgBulls, ASH_Smooth)
SmthBears = _MA(ASH_ma_type, AvgBears, ASH_Smooth)

difference = math.abs(SmthBulls - SmthBears)



//== Cálculo de condiciones
EMA_alcista = close > EMA
EMA_bajista = close < EMA
Aroon_cruce_alcista = ta.crossover(Aroon_upper, Aroon_lower)
Aroon_cruce_bajista = ta.crossunder(Aroon_upper, Aroon_lower)
ASH_alcista = SmthBulls > SmthBears
ASH_bajista = SmthBulls < SmthBears

//== Entrada (deben cumplirse todas para entrar)
longCondition1  = EMA_alcista
longCondition2  = Aroon_cruce_alcista
longCondition3  = ASH_alcista
long_conditions = longCondition1 and longCondition2 and longCondition3
entrar_en_LONG  = P_permitir_LONGS and long_conditions and vela_en_fecha and not posicion_abierta

shortCondition1  = EMA_bajista
shortCondition2  = Aroon_cruce_bajista
shortCondition3  = ASH_bajista
short_conditions = shortCondition1 and shortCondition2 and shortCondition3
entrar_en_SHORT  = P_permitir_SHORTS and short_conditions and vela_en_fecha and not posicion_abierta

var LONG_stop_loss    = 0.0
var LONG_take_profit  = 0.0
var SHORT_stop_loss   = 0.0
var SHORT_take_profit = 0.0

//psl = ta.pivotlow(TPSL_TP_pivot_lookback, TPSL_TP_pivot_lookback)
//psh = ta.pivothigh(TPSL_TP_pivot_lookback, TPSL_TP_pivot_lookback)
psl = ta.lowest(TPSL_TP_pivot_lookback)
psh = ta.highest(TPSL_TP_pivot_lookback)

if (entrar_en_LONG)
    LONG_stop_loss   := psl - close*0.001
    LONG_take_profit := close + ((close - LONG_stop_loss) * TPSL_SL_mult)
    strategy.entry("+ Long", strategy.long)
    strategy.exit("- Long", "+ Long", limit=LONG_take_profit, stop=LONG_stop_loss)

if (entrar_en_SHORT)
    SHORT_stop_loss   := psh + close*0.001
    SHORT_take_profit := close - ((SHORT_stop_loss - close) * TPSL_SL_mult)
    strategy.entry("+ Short", strategy.short)
    strategy.exit("- Short", "+ Short", limit=SHORT_take_profit, stop=SHORT_stop_loss)



//== Ploteo en pantalla
// EMA
plot(EMA, color=color.white, linewidth=2)

// Símbolo de entrada (entre o no en compra)
bgcolor = color.new(color.black, 100)

if (entrar_en_LONG or entrar_en_SHORT)
    bgcolor := color.new(color.green, 90)

bgcolor(bgcolor)

// Precio de compra, Take Profit, Stop Loss y relleno
avg_position_price_plot = plot(series=posicion_abierta ? strategy.position_avg_price : na, color=color.new(color.white, 25), style=plot.style_linebr, linewidth=2, title="Precio Entrada")

LONG_tp_plot            = plot(LONG_abierto and LONG_take_profit > 0.0 ? LONG_take_profit : na, color=color.new(color.lime, 25), style=plot.style_linebr, linewidth=3, title="LONG Take Profit")
LONG_sl_plot            = plot(LONG_abierto and LONG_stop_loss > 0.0 ? LONG_stop_loss : na, color=color.new(color.red, 25), style=plot.style_linebr, linewidth=3, title="Long Stop Loss")
fill(avg_position_price_plot, LONG_tp_plot, color=color.new(color.olive, 85))
fill(avg_position_price_plot, LONG_sl_plot, color=color.new(color.maroon, 85))

SHORT_tp_plot            = plot(SHORT_abierto and SHORT_take_profit > 0.0 ? SHORT_take_profit : na, color=color.new(color.lime, 25), style=plot.style_linebr, linewidth=3, title="SHORT Take Profit")
SHORT_sl_plot            = plot(SHORT_abierto and SHORT_stop_loss > 0.0 ? SHORT_stop_loss : na, color=color.new(color.red, 25), style=plot.style_linebr, linewidth=3, title="Short Stop Loss")
fill(avg_position_price_plot, SHORT_tp_plot, color=color.new(color.olive, 85))
fill(avg_position_price_plot, SHORT_sl_plot, color=color.new(color.maroon, 85))

```

> Detail

https://www.fmz.com/strategy/362167

> Last Modified

2022-05-10 11:29:01
