
> Name

Dual-Candle-Rapid-Swing-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
双K线极速波段策略

该策略通过计算每日成交量变化和NVI指标的组合,判断极短线内的市场波段进行交易。

具体来说,它计算每日成交量较前一日减少的天数,通过NVI值的变化构成一个振荡指标。当该指标从负转正,并第2根K线仍然正值时做多;当该指标从正转负,并第2根K线仍然负值时做空。

这种策略的优点是捕捉极短线的落差,只需要2根K线即可形成交易信号,实现盈利。但是这种高频交易方式存在过优化风险,在不同市场时间段效果可能差异很大。

此外,如此短线交易对交易费用也有一定依赖,需要针对具体品种调整参数。同时,极小时间段交易决策的误差也可能造成亏损。只有严格控制了单笔交易资金规模,才能长期应用这种双K线策略。

||

This strategy combines calculations of daily volume change and the NVI indicator to trade short-term market swings.

Specifically, it counts the number of days volume is lower than previous day, and uses NVI value change to form an oscillator. Long signals are generated when the oscillator flips from negative to positive, and remains positive on the 2nd candle. Short signals occur on the flip from positive to negative, while still negative on 2nd candle.

The advantage of this strategy is capitalizing on short-term gaps within just 2 candles. However, such high frequency trading risks overoptimization, with performance varying greatly across market time periods.

Also, trading fees can be a concern for such short-term trades, requiring parameter tuning per instrument. And slight errors in decisions within small timeframes could lead to losses. Only by strictly controlling per trade position sizes can this dual candle strategy be applied successfully over the long run.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|═════════ DESDE ════════|
|v_input_2|true|Mes|
|v_input_3|true|Dia|
|v_input_4|2018|Año|
|v_input_5|true|═════════ HASTA ════════|
|v_input_6|31|Mes|
|v_input_7|12|Dia|
|v_input_8|9999|Año|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-04 00:00:00
end: 2023-09-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

strategy(title = "Strategy Only 2 Candles",
         shorttitle = "SO2C",
         overlay = true,
         precision = 8,
         calc_on_order_fills = true,
         calc_on_every_tick = true,
         backtest_fill_limits_assumption = 0,
         default_qty_type = strategy.percent_of_equity,
         default_qty_value = 100,
         initial_capital = 1000,
         currency = currency.USD,
         linktoseries = true)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

backTestSectionFrom = input(title = "═════════ DESDE ════════", defval = true, type = input.bool)

FromMonth       = input(defval = 1, title = "Mes", minval = 1)
FromDay         = input(defval = 1, title = "Dia", minval = 1)
FromYear        = input(defval = 2018, title = "Año", minval = 2014)

backTestSectionTo = input(title = "═════════ HASTA ════════", defval = true, type = input.bool)
ToMonth         = input(defval = 31, title = "Mes", minval = 1)
ToDay           = input(defval = 12, title = "Dia", minval = 1)
ToYear          = input(defval = 9999, title = "Año", minval = 2014)

backTestPeriod() => (time > timestamp(FromYear, FromMonth, FromDay, 00, 00)) and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59))

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

nvi = 0.0
nvi := iff(volume < volume[1], nz(nvi[1]) + (close - close[1]) / close[1], nz(nvi[1]))
nvim = ema(nvi, 15)
nvimax = highest(nvim, 90)
nvimin = lowest(nvim, 90)
azul = (nvi - nvim) * 100 / (nvimax - nvimin)

// VARIABLES
var compra_activada = 0
var compra = true
var compra_1 = true
var cerrar_compra= 0
var venta_activada = 0
var venta = true
var venta_1 = true
var cerrar_venta= 0

// COMPRA
compra := azul > azul[1] and azul > 0 and azul[1] < 0
if (compra == 1 )
    compra_activada := 1

// CIERRE COMPRA
cerrar_compra :=  compra_activada[2] == 1 ? 1 : 0
if (cerrar_compra == 1)
    compra_activada := 0

// VENTA
venta := azul < azul[1] and azul < 0 and azul[1] > 0 
if (venta == 1 )
    venta_activada := 1
    
// CIERRE COMPRA
cerrar_venta :=  venta_activada[2] == 1 ? 1 : 0
if (cerrar_venta == 1)
    venta_activada := 0

// ESTRATEGIA
if (backTestPeriod())
    strategy.entry("Compra", true, when = compra == 1  )
    strategy.entry("Venta", false, when = venta == 1  )
    strategy.close("Compra", when = cerrar_compra == 1 )
    strategy.close("Venta", when = cerrar_venta == 1 )


```

> Detail

https://www.fmz.com/strategy/426365

> Last Modified

2023-09-11 15:12:08
