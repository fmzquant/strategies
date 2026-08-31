
> Name

Reflected-EMA-Trend-Determination-Strategy-Based-on-Hull-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/185b7ce683e8dd0a6a6.png)

[trans]
#### 概述
该策略通过运用Hull移动平均线(HMA)的反射特性来判断市场趋势。策略核心是计算短期与长期Hull移动平均线之间的差异值,并通过这个差异的反射值来预测价格走势。通过设定可调整的百分比参数,策略能够适应不同的交易周期,从而提供更精准的趋势判断信号。

#### 策略原理
策略采用了36周期和44周期的两条Hull移动平均线作为基础指标。通过计算这两条移动平均线之间的绝对差值,并结合当前趋势方向对差值进行反射计算,最终得到反射值。策略还引入了加权移动平均(WMA)来计算delta值,通过这个delta值与反射值的交叉来确定趋势的转折点。在趋势判断过程中,策略设置了可调整的修正因子,用于控制趋势反转的灵敏度。当价格突破预设的趋势限制线时,策略会发出相应的交易信号。

#### 策略优势
1. 采用Hull移动平均线降低了传统移动平均线的滞后性,提高了策略对市场变化的响应速度
2. 引入反射值概念,能更准确地捕捉趋势转折点
3. 设计了可调整的修正因子,使策略具有较强的适应性
4. 通过绝对差值计算提高了信号的可靠性
5. 集成了风险控制机制,包括趋势限制线的动态调整
6. 系统自带可视化组件,便于交易者直观判断市场状态

#### 策略风险
1. 在横盘整理市场中可能产生频繁的假信号
2. 参数设置不当可能导致信号滞后或过度敏感
3. 在剧烈波动市场中,趋势限制线可能无法及时调整
4. 策略依赖历史数据计算,在市场突发事件面前反应可能不够迅速

#### 策略优化方向
1. 引入波动率指标,动态调整修正因子,提高策略对市场状态的适应能力
2. 增加市场状态识别机制,在不同市场环境下采用不同的参数设置
3. 开发自适应参数优化系统,实现参数的动态调整
4. 增加成交量分析模块,提高信号的可靠性
5. 完善风险控制机制,增加止损和资金管理功能

#### 总结
该策略通过创新性地将Hull移动平均线与反射值概念相结合,构建了一个反应灵敏、适应性强的趋势跟踪系统。策略的核心优势在于其对趋势转折点的准确捕捉能力,同时通过可调整的参数设置,保证了策略在不同市场环境下的适用性。虽然存在一些固有的风险,但通过持续优化和完善,该策略有望成为一个稳定可靠的交易工具。
||
#### Overview
This strategy utilizes the reflective properties of Hull Moving Averages (HMA) to determine market trends. The core of the strategy involves calculating the difference between short-term and long-term Hull Moving Averages and using this reflected difference to predict price movements. Through adjustable percentage parameters, the strategy can adapt to different trading timeframes, providing more accurate trend determination signals.

#### Strategy Principles
The strategy employs two Hull Moving Averages with periods of 36 and 44 as base indicators. It calculates the absolute difference between these two moving averages and applies reflection calculations based on the current trend direction to obtain the reflection value. The strategy also incorporates Weighted Moving Average (WMA) to calculate delta values, using crossovers between delta and reflection values to identify trend turning points. During trend determination, the strategy uses an adjustable correction factor to control trend reversal sensitivity. Trading signals are generated when prices break through preset trend limitation lines.

#### Strategy Advantages
1. Uses Hull Moving Averages to reduce the lag typically associated with traditional moving averages
2. Incorporates reflection values for more accurate detection of trend turning points
3. Features adjustable correction factors for enhanced adaptability
4. Improves signal reliability through absolute difference calculations
5. Integrates risk control mechanisms including dynamic trend line adjustments
6. Includes visualization components for intuitive market state assessment

#### Strategy Risks
1. May generate frequent false signals in ranging markets
2. Improper parameter settings can lead to delayed signals or excessive sensitivity
3. Trend limitation lines may not adjust quickly enough in volatile markets
4. Strategy relies on historical data calculations, potentially limiting response to sudden market events

#### Strategy Optimization Directions
1. Introduce volatility indicators for dynamic correction factor adjustment
2. Implement market state recognition mechanisms for parameter adaptation
3. Develop self-adaptive parameter optimization systems
4. Add volume analysis modules to enhance signal reliability
5. Improve risk control mechanisms with stop-loss and money management features

#### Summary
This strategy innovatively combines Hull Moving Averages with reflection value concepts to create a responsive and adaptive trend following system. Its core strength lies in accurately capturing trend turning points while maintaining adaptability through adjustable parameters. While inherent risks exist, continuous optimization and refinement make this strategy a potentially stable and reliable trading tool.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-28 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Reflected EMA Difference (RED)", shorttitle="RED [by MarcosPna]", overlay=true) //mv30
// Análisis de Riesgo
// Risk Analysis
media_delta = ta.wma(2 * ta.wma(close, 8 / 2) - ta.wma(close, 8), math.floor(math.sqrt(8)))

// Calcular EMAs
// Calculate EMAs
ema_corta_delta = ta.hma(close, 36)
ema_larga_delta = ta.hma(close, 44)

// Calcular la diferencia entre las EMAs
// Calculate the difference between EMAs
diferencia_delta_ema = math.abs(ema_corta_delta - ema_larga_delta)

// Calcular el valor reflejado basado en la posición de la EMA corta
// Compute the reflected value based on the position of the short EMA
valor_reflejado_delta = ema_corta_delta + (ema_corta_delta > ema_larga_delta ? diferencia_delta_ema : -diferencia_delta_ema)

// Suavizar el valor reflejado
// Smooth the reflected value
periodo_suavizado_delta = input.int(2, title="Periodo extendido")
ema_suavizada_delta = ta.hma(valor_reflejado_delta, periodo_suavizado_delta)

// Ploteo de las EMAs y la línea reflejada
// Plot EMAs and the reflected line
plot(valor_reflejado_delta, title="Reflected EMA Difference (RED)", color=valor_reflejado_delta > ema_suavizada_delta ? color.rgb(253, 25, 238, 30) : color.rgb(183, 255, 30), linewidth=2, style=plot.style_line)

// Parámetros ajustables para la reversión de tendencia
// Adjustable parameters for trend reversal
factor_correccion_delta = input.float(title='Porcentaje de cambio', minval=0, maxval=100, step=0.1, defval=0.04)
tasa_correccion_delta = factor_correccion_delta * 0.01

// Variables para la reversión de tendencia
// Variables for trend reversal
var int direccion_delta_tendencia = 0
var float precio_maximo_delta = na
var float precio_minimo_delta = na
var float limite_tendencia_delta = na

// Inicializar precio máximo y mínimo con el primer valor de la EMA suavizada reflejada
// Initialize peak and trough prices with the first value of the smoothed reflected EMA
if na(precio_maximo_delta)
    precio_maximo_delta := ema_suavizada_delta
if na(precio_minimo_delta)
    precio_minimo_delta := ema_suavizada_delta

// Lógica de reversión de tendencia con la EMA suavizada reflejada
// Trend reversal logic with the smoothed reflected EMA
if direccion_delta_tendencia >= 0
    if ema_suavizada_delta > precio_maximo_delta
        precio_maximo_delta := ema_suavizada_delta
    limite_tendencia_delta := precio_maximo_delta - (precio_maximo_delta * tasa_correccion_delta)
    if ema_suavizada_delta <= limite_tendencia_delta
        direccion_delta_tendencia := -1
        precio_minimo_delta := ema_suavizada_delta
        strategy.entry("Venta", strategy.short)
else
    if ema_suavizada_delta < precio_minimo_delta
        precio_minimo_delta := ema_suavizada_delta
    limite_tendencia_delta := precio_minimo_delta + (precio_minimo_delta * tasa_correccion_delta)
    if ema_suavizada_delta >= limite_tendencia_delta
        direccion_delta_tendencia := 1
        precio_maximo_delta := ema_suavizada_delta
        strategy.entry("Compra", strategy.long)

// Ploteo y señales
// Plotting and signals
indice_delta_ascendente = plot(direccion_delta_tendencia == 1 ? limite_tendencia_delta : na, title="Aumento de valor", style=plot.style_linebr, linewidth=3, color=color.new(color.green, 0))
senal_compra_delta = direccion_delta_tendencia == 1 and direccion_delta_tendencia[1] == -1
plotshape(senal_compra_delta ? limite_tendencia_delta : na, title="Estilo señal alcista", location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(color.green, 0))

indice_delta_descendente = plot(direccion_delta_tendencia == 1 ? na : limite_tendencia_delta, title="Disminución de valor", style=plot.style_linebr, linewidth=3, color=color.new(color.red, 0))
senal_venta_delta = direccion_delta_tendencia == -1 and direccion_delta_tendencia[1] == 1
plotshape(senal_venta_delta ? limite_tendencia_delta : na, title="Estilo señal bajista", location=location.absolute, style=shape.circle, size=size.tiny, color=color.new(color.red, 0))

// Variables para manejo de cajas
// Variables for box management
var box caja_tendencia_delta = na

// Condición: Cruce de HullMA hacia abajo
// Condition: HullMA crosses below reflected EMA value
cruce_bajista_delta = ta.crossunder(media_delta, valor_reflejado_delta)

// Condición: Cruce de HullMA hacia arriba
// Condition: HullMA crosses above reflected EMA value
cruce_alcista_delta = ta.crossover(media_delta, valor_reflejado_delta)

// Dibujar caja cuando HullMA cruza hacia abajo el valor reflejado de EMA
// Draw a box when HullMA crosses below the reflected EMA value
// if (cruce_bajista_delta) and direccion_delta_tendencia == 1
//     caja_tendencia_delta := box.new(left=bar_index, top=high, right=bar_index, bottom=low, text = "Critical Areas", text_color = color.white, border_width=2, border_color=color.rgb(254, 213, 31), bgcolor=color.new(color.red, 90))

// Cerrar caja cuando HullMA cruza hacia arriba el valor reflejado de EMA
// Close the box when HullMA crosses above the reflected EMA value
// if (cruce_alcista_delta and not na(caja_tendencia_delta))
//     box.set_right(caja_tendencia_delta, bar_index)
//     caja_tendencia_delta := na  // Remove the reference to create a new box at the next cross down


```

> Detail

https://www.fmz.com/strategy/473397

> Last Modified

2024-11-29 16:35:43
