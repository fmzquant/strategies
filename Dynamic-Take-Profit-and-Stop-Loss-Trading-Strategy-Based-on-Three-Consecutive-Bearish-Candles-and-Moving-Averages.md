
> Name

Dynamic-Take-Profit-and-Stop-Loss-Trading-Strategy-Based-on-Three-Consecutive-Bearish-Candles-and-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fe1808c4cdb0896dbe.png)


#### Overview

This trading strategy is based on the pattern of three consecutive bearish candles and a moving average system to determine trading signals. When the price is above the 200-day moving average and there are three consecutive bearish candles, it opens a long position. The strategy manages trading risk through dynamic take profit and stop loss levels, which are determined by the position of the short-term moving average and the percentage change in price. The strategy only trades within a specified time range.

#### Strategy Principle

1. Calculate the number of consecutive bearish candles. When a specified number (default is 3) of consecutive bearish candles appear, it is considered a long signal.
2. Use two moving averages to assist in determining the trend and timing of trades, with default settings of 10-day and 200-day moving averages. Only consider going long when the price is above the 200-day moving average.
3. Set dynamic take profit and stop loss levels. The take profit level is a certain percentage (default 1.5%) above the entry price, and the stop loss level is a certain percentage (default 1%) below the entry price.
4. Another condition for closing a position is when the price position relative to the 10-day moving average changes. If a long position is held and the price falls from above the moving average to below it, the position is closed.
5. The strategy only runs within a specified time range, determined by the start and end dates.

#### Strategy Advantages

1. By combining price patterns and a moving average system, it can capture trending opportunities relatively well.
2. Through dynamic take profit and stop loss levels, risk and reward can be flexibly controlled. The take profit level rises as the price increases, letting profits run, while the stop loss level limits the maximum loss.
3. Using changes in the position of the short-term moving average as a signal to close positions can quickly respond to sudden price reversals.
4. Specifying a trading time range can avoid trading during special periods such as market closures or holidays, reducing risk.

#### Strategy Risks

1. The pattern of consecutive bearish candles cannot completely determine a trend reversal, and there may be situations where the price continues to rise after consecutive bearish candles, causing the strategy to fail.
2. Fixed percentage take profit and stop loss levels may not be able to respond to dramatic market fluctuations. When the trend is very strong, the take profit level may be set too low, leading to premature exit; when volatility increases, the stop loss level may be too close, leading to frequent stops.
3. Judging the position of the short-term moving average may lag, especially when prices change rapidly, and the best closing opportunity may have been missed.
4. The strategy lacks position management and risk control measures. The entry point and position size are fixed, which may lead to excessive risk in a single transaction.

#### Strategy Optimization Directions

1. More technical indicators can be introduced to assist in judgment, such as MACD and RSI, to improve the reliability of signals.
2. Optimize the calculation method of take profit and stop loss levels, such as using ATR or volatility to dynamically adjust, or combining support and resistance levels to set.
3. For closing signals, consider using more confirmation conditions, such as changes in trading volume, long-short position ratios, etc., to avoid false signals.
4. Introduce position management and risk control measures, such as adjusting the position size of each transaction according to the account balance and risk level, and setting overall risk limits.
5. For parameter settings, such as the number of consecutive bearish candles and moving average periods, optimization tests can be carried out to find the best parameter combination.

#### Summary

This trading strategy determines trending trading opportunities through the pattern of consecutive bearish candles and a moving average system, while controlling risk through dynamic take profit and stop loss levels and changes in the position of the short-term moving average. The strategy has a clear logic and is suitable for traders who aim to capture medium to long-term trends. However, the strategy also has some limitations, such as the reliability of signals, the setting of take profit and stop loss levels, and position management, which still have room for optimization. In practical application, it is necessary to make appropriate adjustments and improvements to the strategy according to market characteristics and personal risk preferences, and strictly control risks.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|3|Número de cierres decrecientes|
|v_input_float_1|1.5|Porcentaje de cierre arriba (%)|
|v_input_float_2|true|Porcentaje de cierre abajo (%)|
|v_input_int_2|10|Períodos de la media móvil para cierre|
|v_input_int_3|200|Períodos de la media móvil de 200|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-09 00:00:00
end: 2024-05-08 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Estrategia de Trading", overlay=true)

// Definir el número de cierres de velas decrecientes consecutivas
var int cierres_decrecientes_consecutivos = 0
num_cierres_decrecientes = input.int(3, title="Número de cierres decrecientes", minval=1)

// Definir el porcentaje de cambio para cerrar la operación
porcentaje_cierre_arriba = input.float(1.5, title="Porcentaje de cierre arriba (%)", step=0.1)
porcentaje_cierre_abajo = input.float(1.0, title="Porcentaje de cierre abajo (%)", step=0.1)

// Definir las medias móviles para el cierre de la operación
periodos_media_movil_cierre = input.int(10, title="Períodos de la media móvil para cierre")
periodos_media_movil_200 = input.int(200, title="Períodos de la media móvil de 200")

// Definir el rango de fechas para la simulación
start_date = timestamp(2024, 1, 1, 0, 0)
end_date = timestamp(2024, 12, 31, 23, 59)

// Calcular la media móvil para el cierre de la operación
sma_cierre = ta.sma(close, periodos_media_movil_cierre)
sma_200 = ta.sma(close, periodos_media_movil_200)

// Calcular si el precio está por encima o por debajo de la media móvil para el cierre de la operación
precio_por_encima_sma_cierre = close > sma_cierre
precio_por_debajo_sma_cierre = close < sma_cierre

// Calcular si se han producido num_cierres_decrecientes consecutivos
if (ta.change(close) < 0)
    cierres_decrecientes_consecutivos := cierres_decrecientes_consecutivos + 1
else
    cierres_decrecientes_consecutivos := 0

es_cierres_consecutivos = cierres_decrecientes_consecutivos >= num_cierres_decrecientes

// Definir condiciones de entrada y salida de la estrategia dentro del rango de fechas y con el precio por encima de la SMA de 200
condicion_entrada = es_cierres_consecutivos and close > sma_200
condicion_cierre_sma = (precio_por_encima_sma_cierre[1] and not precio_por_encima_sma_cierre) or (not precio_por_encima_sma_cierre[1] and precio_por_encima_sma_cierre)

// Calcular precios de salida basados en porcentajes
precio_salida_arriba = strategy.position_avg_price * (1 + porcentaje_cierre_arriba / 100)
precio_salida_abajo = strategy.position_avg_price * (1 - porcentaje_cierre_abajo / 100)

// Ejecutar operación en largo dentro del rango de fechas y con el precio por encima de la SMA de 200
if (condicion_entrada and strategy.opentrades == 0)
    strategy.entry("Long", strategy.long)

// Cerrar operación en largo si se cumple la condición de salida por cambio en el cruce de la media móvil dentro del rango de fechas
if (strategy.position_size > 0 and condicion_cierre_sma)
    strategy.close("Long")

// Cerrar operación en largo si el precio alcanza el porcentaje de cierre arriba o abajo dentro del rango de fechas
strategy.exit("Stop Loss", "Long", limit=precio_salida_arriba, stop=precio_salida_abajo)

// Plot para visualizar la media móvil para el cierre de la operación
plot(sma_cierre, color=color.red)

// Plot para visualizar la SMA de 200
plot(sma_200, color=color.blue)

```

> Detail

https://www.fmz.com/strategy/450868

> Last Modified

2024-05-09 16:42:35
