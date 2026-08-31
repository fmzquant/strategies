
> Name

Short-term-Quantitative-Trading-Strategy-Based-on-Dual-Moving-Average-Crossover-RSI-and-Stochastic-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/181ed4c056e32b82f6c.png)


#### Overview
This strategy combines dual moving average crossover, RSI, and stochastic indicators to seek high-probability trading opportunities in short-term trading through the joint confirmation of multiple technical indicators. The strategy uses the crossover of 20-day and 50-day moving averages as the main trading signal, and incorporates RSI and stochastic indicators as auxiliary judgments to double-check the trading signals. In addition, the strategy also employs ATR as the basis for stop-loss and take-profit, managing positions with a fixed risk-reward ratio, striving to obtain stable returns while controlling risks.

#### Strategy Principles
1. Calculate the 20-day and 50-day moving averages. When the short-term average crosses above the long-term average, it generates a long signal; conversely, it generates a short signal.
2. Introduce the RSI indicator as an auxiliary judgment, only considering establishing positions when the RSI indicator has not reached the overbought or oversold range.
3. Introduce the stochastic indicator as an auxiliary judgment, only considering establishing positions when the stochastic indicator's K line has not reached the overbought or oversold range.
4. Use ATR to calculate stop-loss and take-profit levels, setting stop-loss and take-profit prices according to a 1:2 risk-reward ratio.
5. When going long, the stop-loss level is the lowest price minus ATR, and the take-profit level is the highest price plus 2 times ATR; when going short, the stop-loss level is the highest price plus ATR, and the take-profit level is the lowest price minus 2 times ATR.

#### Strategy Advantages
1. The dual moving average crossover is a simple and easy-to-use trend judgment indicator, and its combination with RSI and stochastic indicators can effectively filter out false signals.
2. RSI and stochastic indicators can help determine whether the market is in an overbought or oversold state, avoiding entering positions in extreme market conditions.
3. The position management method with a fixed risk-reward ratio can obtain relatively stable returns under the premise of controlling overall risks.
4. Parameters are adjustable and suitable for different market environments and trading styles.

#### Strategy Risks
1. Trend-following strategies are prone to generating more false signals in volatile markets, leading to frequent trading and capital losses.
2. Fixed-ratio stop-loss may lead to excessive single losses, weakening the equity curve.
3. Lack of consideration in position management and capital management makes it difficult to cope with extreme market conditions.

#### Strategy Optimization Directions
1. Introduce more effective technical indicators to improve the accuracy and reliability of signals.
2. Optimize the setting method of stop-loss and take-profit, adopting more dynamic and intelligent methods to increase the strategy's profitability.
3. In terms of position management, dynamic adjustments to positions can be made in conjunction with volatility indicators such as ATR.
4. In terms of capital management, methods such as risk budgeting and the Kelly formula can be introduced to improve capital utilization efficiency.

#### Summary
This strategy is a short-term trading strategy based on dual moving averages, RSI, and stochastic indicators. It controls trading risks while grasping trend opportunities through the joint confirmation of multiple technical indicators. The strategy logic is clear, parameters are easy to optimize, and it is suitable for investors engaged in short-term trading. However, the strategy also has some shortcomings, such as limited trend-grasping ability and lack of dynamic management of positions and capital. These problems can be improved by introducing more technical indicators, optimizing signals and position management, etc., in order to further enhance the strategy's performance.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-05-17 00:00:00
end: 2024-06-16 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Cruce de Medias con Filtros de RSI y Estocástico", overlay=true)

// Definir parámetros de las medias móviles
fast_length = input(20, title="Periodo de Media Rápida")
slow_length = input(50, title="Periodo de Media Lenta")

// Calcular medias móviles
fast_ma = ta.sma(close, fast_length)
slow_ma = ta.sma(close, slow_length)

// Añadir filtro RSI
rsi_length = input(7, title="Periodo del RSI")
rsi = ta.rsi(close, rsi_length)
rsi_overbought = input(70, title="RSI Sobrecomprado")
rsi_oversold = input(30, title="RSI Sobrevendido")

// Añadir filtro Estocástico
k_period = input(7, title="K Periodo del Estocástico")
d_period = input(3, title="D Periodo del Estocástico")
smooth_k = input(3, title="Suavización del Estocástico")
stoch_k = ta.sma(ta.stoch(close, high, low, k_period), smooth_k)
stoch_d = ta.sma(stoch_k, d_period)
stoch_overbought = input(80, title="Estocástico Sobrecomprado")
stoch_oversold = input(20, title="Estocástico Sobrevendido")

// Definir niveles de stop-loss y take-profit con ratio 2:1
risk = input(1, title="Riesgo en ATR")
reward_ratio = input(2, title="Ratio Riesgo/Beneficio")
atr_length = input(14, title="Periodo del ATR")
atr = ta.atr(atr_length)
stop_loss = risk * atr
take_profit = reward_ratio * stop_loss

// Señal de compra
long_condition = ta.crossover(fast_ma, slow_ma) and rsi < rsi_overbought and stoch_k < stoch_overbought
if (long_condition)
    strategy.entry("Compra", strategy.long)

// Señal de venta
short_condition = ta.crossunder(fast_ma, slow_ma) and rsi > rsi_oversold and stoch_k > stoch_oversold
if (short_condition)
    strategy.entry("Venta", strategy.short)

// Configurar Stop-Loss y Take-Profit para posiciones largas
if (strategy.position_size > 0)
    strategy.exit("Take Profit/Stop Loss", from_entry="Compra", stop=low - stop_loss, limit=high + take_profit)

// Configurar Stop-Loss y Take-Profit para posiciones cortas
if (strategy.position_size < 0)
    strategy.exit("Take Profit/Stop Loss", from_entry="Venta", stop=high + stop_loss, limit=low - take_profit)

// Plotear las medias móviles en el gráfico
plot(fast_ma, title="Media Rápida (50)", color=color.blue)
plot(slow_ma, title="Media Lenta (200)", color=color.red)

// Plotear RSI y Estocástico en subgráficos
hline(rsi_overbought, "RSI Sobrecomprado", color=color.red)
hline(rsi_oversold, "RSI Sobrevendido", color=color.green)
plot(rsi, title="RSI", color=color.orange, linewidth=2)
hline(stoch_overbought, "Estocástico Sobrecomprado", color=color.red)
hline(stoch_oversold, "Estocástico Sobrevendido", color=color.green)
plot(stoch_k, title="Estocástico K", color=color.purple, linewidth=2)
plot(stoch_d, title="Estocástico D", color=color.purple, linewidth=1, style=plot.style_stepline)

```

> Detail

https://www.fmz.com/strategy/454352

> Last Modified

2024-06-17 15:35:40
