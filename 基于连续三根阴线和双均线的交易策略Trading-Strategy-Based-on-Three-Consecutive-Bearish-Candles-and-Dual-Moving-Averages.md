
> Name

基于连续三根阴线和双均线的交易策略Trading-Strategy-Based-on-Three-Consecutive-Bearish-Candles-and-Dual-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e07bfa4a3a229cea3d.png)


#### Overview
This strategy is a trading strategy based on three consecutive bearish candles and dual moving averages. The main idea of the strategy is: when there are three consecutive bearish candles and the current closing price is higher than the 200-day moving average, open a long position; when the 10-day moving average crosses with the price, or the price reaches the take-profit or stop-loss level, close the position. The strategy only runs within a specified time range.

#### Strategy Principle
1. Calculate the number of consecutive bearish candles. If the closing price decreases, the number of consecutive bearish candles increases by 1; otherwise, it resets to 0.
2. Calculate the 10-day and 200-day moving averages.
3. Determine if the current closing price is higher than the 10-day moving average.
4. Check if the entry conditions are met: three consecutive bearish candles, the current time is within the specified range, and the current closing price is higher than the 200-day moving average.
5. Check if the exit conditions are met: the 10-day moving average crosses with the price, or the price reaches the take-profit or stop-loss level.
6. If the entry conditions are met and there is no current position, open a long position.
7. If the exit conditions are met and there is a current position, close the position.

#### Strategy Advantages
1. It considers price movement and moving average factors, enabling it to capture opportunities in both trending and oscillating markets.
2. It sets take-profit and stop-loss levels, which can effectively control risks.
3. It limits the running time range of the strategy, avoiding excessive risks during certain specific periods.
4. The code logic is clear and readable, making it easy to understand and optimize.

#### Strategy Risks
1. The judgment of consecutive bearish candles may be too simple, easily triggering false signals.
2. The setting of take-profit and stop-loss levels may not be flexible enough, leading to frequent trades or missed opportunities when the market fluctuates greatly.
3. It lacks consideration for unexpected events, major news, and other unconventional factors, potentially assuming additional risks.

#### Strategy Optimization Directions
1. Consider introducing more technical indicators, such as RSI and MACD, to build a more robust signal judgment logic.
2. Optimize the setting of take-profit and stop-loss levels, introducing dynamic take-profit/stop-loss or stop-loss based on volatility indicators like ATR.
3. Study the impact of different parameter settings on the strategy, such as the number of consecutive bearish candles, moving average periods, etc., to find the optimal parameter combination.
4. Incorporate position management to dynamically adjust positions based on different market environments, improving capital utilization efficiency.

#### Summary
This strategy constructs a simple and easy-to-understand trading model through the combination of consecutive bearish candles and dual moving averages. While capturing trending opportunities, the strategy also sets certain risk control measures. However, there is further room for optimization in signal judgment and risk control. By introducing more technical indicators, optimizing parameter settings, implementing dynamic take-profit/stop-loss and position management, the robustness and profitability of the strategy can be further improved.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-08 00:00:00
end: 2024-05-13 00:00:00
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

https://www.fmz.com/strategy/451412

> Last Modified

2024-05-14 17:30:35
