
> Name

Stochastic-Oscillator-and-Moving-Average-Crossover-Strategy-with-Stop-Loss-and-Stochastic-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/be1910e5150144a87d.png)

#### Overview
This strategy combines the Stochastic Oscillator with a Moving Average, generating trading signals by observing the overbought and oversold conditions of the stochastic indicator and the trend of the moving average. It produces a short signal when the stochastic indicator is in the overbought zone and the moving average is downward, and a long signal when in the oversold zone and the moving average is upward. Additionally, the strategy introduces a stochastic indicator filter, which can also generate corresponding trading signals when the stochastic K line crosses the D line after staying below 50 for a certain number of K lines. The strategy also sets a Stop Loss to control risk.

#### Strategy Principle
1. Calculate the Stochastic Oscillator to obtain the K line and D line. Parameters are adjustable, including the stochastic period, K smoothing, D smoothing, overbought zone, and oversold zone.

2. Calculate the Moving Average, using the closing price by default, with an adjustable period.

3. Calculate the Stochastic Indicator Filter. When the K line stays below 50 for a certain number of K lines, it generates a filter signal.

4. Conditions for generating a long signal: Stochastic indicator crosses upward in the oversold zone OR Stochastic indicator filter signal AND Moving average is upward.

5. Conditions for generating a short signal: Stochastic indicator crosses downward in the overbought zone OR Stochastic indicator filter signal AND Moving average is downward.

6. Long position closing condition: Stochastic K line crosses above the Moving Average AND the Average turns downward.

7. Short position closing condition: Stochastic K line crosses below the Moving Average AND the Average turns upward.

8. Position management uses a fixed percentage of funds, 10% by default. It also sets a Stop Loss, 2% by default.

#### Advantage Analysis
1. By combining overbought/oversold and trend characteristics, it can chase up and kill down in a trend.

2. The Stochastic Indicator Filter avoids frequent trading in oscillating markets.

3. The Stop Loss setting helps control drawdowns.

4. The code structure is clear, parameters are adjustable, and it is suitable for further optimization.

#### Risk Analysis
1. The Stochastic Oscillator has a certain lag, which may miss the best buying and selling points.

2. The accuracy of capturing orders at trend turning points is poor, and the frequency of stop-loss may be high.

3. Fixed-ratio fund management has a large drawdown in the case of consecutive losses.

#### Optimization Direction
1. Introduce more filtering conditions, such as price behavior, other auxiliary indicators, etc., to improve signal accuracy.

2. Divide signals into strong and weak, and increase positions when strong signals appear.

3. Optimize the judgment of trend turning points to capture more market movements.

4. Optimize position management, consider adjusting positions based on floating profit and loss ratios, etc.

5. Try different parameter combinations to find the optimal parameters.

#### Summary
Based on the Stochastic Oscillator, this strategy combines Moving Averages to judge trends, while also utilizing the filtering function of the Stochastic Indicator itself, generating relatively reliable trading signals. The overall idea of the strategy is clear and suitable for use in trending markets. However, due to the lag of the Stochastic Oscillator, its performance at market turning points may be poor, and its overall adaptability and robustness need further examination. In the future, the strategy can be improved from aspects such as filtering conditions, position management, and parameter optimization.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|Longitud Estocástico|
|v_input_int_2|3|Suavizado K|
|v_input_int_3|3|Suavizado D|
|v_input_int_4|20|Sobreventa|
|v_input_int_5|80|Sobrecompra|
|v_input_int_6|9|Longitud MA|
|v_input_1_close|0|Fuente MA: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_7|2|Stop Loss (%)|
|v_input_int_8|12|Ruedas de Filtro Estocástico|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-01 00:00:00
end: 2024-03-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Pablo_2uc

//@version=5
strategy("Estrategia Estocástico + MA con Stop Loss y Filtro Estocástico", overlay=true)

// Parámetros del Estocástico
length = input.int(14, title="Longitud Estocástico")
smoothK = input.int(3, title="Suavizado K")
smoothD = input.int(3, title="Suavizado D")
oversold = input.int(20, title="Sobreventa")
overbought = input.int(80, title="Sobrecompra")

// Parámetros de la Media Móvil
maLength = input.int(9, title="Longitud MA")
maSource = input(close, title="Fuente MA")

// Capital inicial
capital = 5000

// Tamaño de posición (10% del capital)
positionSize = capital * 0.10

// Stop Loss (2% del precio de entrada)
stopLossPercent = input.int(2, title="Stop Loss (%)") / 100

// Número de ruedas para el filtro estocástico
filterPeriods = input.int(12, title="Ruedas de Filtro Estocástico")

// Cálculo del Estocástico
k = ta.sma(ta.stoch(close, high, low, length), smoothK)
d = ta.sma(k, smoothD)

// Cálculo de la Media Móvil
ma = ta.sma(maSource, maLength)

// Filtro estocástico
stochasticFilter = ta.sma(k > 50 ? 1 : 0, filterPeriods)

// Condiciones de entrada en largo y corto
longCondition = (ta.crossunder(k, oversold) or ta.crossover(stochasticFilter, 1)) and ma > ma[1]
shortCondition = (ta.crossover(k, overbought) or ta.crossover(stochasticFilter, 1)) and ma < ma[1]

// Condiciones de salida
exitLongCondition = ta.crossover(k, ma) and ma < ma[1]
exitShortCondition = ta.crossunder(k, ma) and ma > ma[1]

// Estrategia
if (longCondition)
    strategy.entry("Long", strategy.long, qty=positionSize)
    strategy.exit("Exit Long", "Long", stop=close * (1 - stopLossPercent))
if (shortCondition)
    strategy.entry("Short", strategy.short, qty=positionSize)
    strategy.exit("Exit Short", "Short", stop=close * (1 + stopLossPercent))

// Cierre de posiciones
if (exitLongCondition)
    strategy.close("Long")
if (exitShortCondition)
    strategy.close("Short")
```

> Detail

https://www.fmz.com/strategy/449526

> Last Modified

2024-04-26 16:10:11
