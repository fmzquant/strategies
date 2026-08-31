
> Name

双均线交叉动态止盈止损量化策略-Dual-Moving-Average-Crossover-with-Dynamic-Risk-Management-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10d922638e4194b7653.png)


#### Overview
This strategy is a quantitative trading system based on dual moving average crossover signals, combined with dynamic stop-loss and take-profit mechanisms for risk management. The strategy employs 20-period and 50-period exponential moving averages (EMA) as signal indicators, with moderate 2.5% stop-loss and 4% take-profit levels to balance returns and risks. This strategy design is particularly suitable for traders with moderate risk tolerance, capable of capturing market trend changes while controlling risks.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. Signal System: Uses crossovers of fast (20-period) and slow (50-period) exponential moving averages
2. Entry Conditions: Long positions are initiated when the fast MA crosses above the slow MA
3. Exit Mechanism: Includes two scenarios - moving average crossover sell signals or hitting stop-loss/take-profit levels
4. Risk Control: Automatically sets dynamic stop-loss and take-profit levels based on entry price for each trade

#### Strategy Advantages
1. Systematic Trading: Fully systematized strategy reduces emotional interference from subjective judgment
2. Controlled Risk: Provides clear risk control through preset stop-loss and take-profit levels
3. Trend Following: Effectively captures medium to long-term trends, avoiding missing important market opportunities
4. Flexible Parameters: Traders can adjust stop-loss and take-profit ratios according to their risk preferences
5. Simple Execution: Clear strategy logic that is easy to understand and implement

#### Strategy Risks
1. Choppy Market Risk: Prone to false signals in sideways markets, leading to frequent trading
2. Slippage Risk: Actual execution prices may deviate from signal prices during high volatility
3. Trend Reversal Risk: Stop-loss might not be quick enough during sudden trend reversals
4. Parameter Dependency: Strategy performance heavily depends on moving average periods and risk management parameters

#### Strategy Optimization Directions
1. Incorporate Volatility Indicators: Dynamically adjust stop-loss and take-profit ratios based on market volatility
2. Add Filtering Conditions: Filter trade signals using volume, trend strength, and other indicators
3. Optimize Moving Average Periods: Find optimal moving average parameters through historical data backtesting
4. Add Trend Filters: Include trend determination conditions to avoid frequent trading in sideways markets
5. Develop Composite Signals: Introduce other technical indicators as confirmatory signals

#### Summary
This is a well-designed moderate-risk quantitative trading strategy that captures trends through moving average crossovers while managing risk with dynamic stop-loss and take-profit levels. The strategy's main advantages lie in its high systematic nature and controlled risk, but attention must be paid to market conditions affecting strategy performance. Through continuous optimization and improvement, this strategy has the potential to maintain stable performance across different market environments. Traders are advised to conduct thorough historical data backtesting before live implementation and adjust parameters according to their risk tolerance.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-12 00:00:00
end: 2024-11-11 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Estrategia STX - Medias Móviles con Riesgo Medio", overlay=true)

// Parámetros configurables
mmr_period = input.int(20, title="Periodo Media Móvil Rápida (MMR)")
mml_period = input.int(50, title="Periodo Media Móvil Lenta (MML)")
stop_loss_percent = input.float(2.5, title="Stop-Loss (%)", step=0.1) // Stop-Loss moderado
take_profit_percent = input.float(4.0, title="Take-Profit (%)", step=0.1) // Take-Profit moderado

// Cálculo de medias móviles (Exponenciales)
mmr = ta.ema(close, mmr_period) // Media Móvil Rápida
mml = ta.ema(close, mml_period) // Media Móvil Lenta

// Señales de Compra y Venta
long_condition = ta.crossover(mmr, mml)  // Señal de compra
short_condition = ta.crossunder(mmr, mml) // Señal de venta

// Calcular niveles de Stop-Loss y Take-Profit solo al activar la compra
var float entry_price = na
var float stop_loss_level = na
var float take_profit_level = na

if (long_condition)
    entry_price := close
    stop_loss_level := entry_price * (1 - stop_loss_percent / 100)
    take_profit_level := entry_price * (1 + take_profit_percent / 100)

// Condiciones de salida (Stop-Loss y Take-Profit)
exit_condition = (close <= stop_loss_level) or (close >= take_profit_level)

// Ejecución de Órdenes
if (long_condition)
    strategy.entry("Compra", strategy.long)

if (short_condition or exit_condition)
    strategy.close("Compra")

// Trazar Medias Móviles y Niveles
plot(mmr, color=color.blue, linewidth=2, title="Media Móvil Rápida (MMR)")
plot(mml, color=color.orange, linewidth=2, title="Media Móvil Lenta (MML)")
plot(not na(entry_price) ? stop_loss_level : na, color=color.red, style=plot.style_line, linewidth=1, title="Stop-Loss")
plot(not na(entry_price) ? take_profit_level : na, color=color.green, style=plot.style_line, linewidth=1, title="Take-Profit")

```

> Detail

https://www.fmz.com/strategy/471729

> Last Modified

2024-11-12 17:29:24
