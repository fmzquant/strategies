
> Name

Stochastic-Oscillator-and-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/4e097cca6a25e18d1d.png)


#### Overview
This strategy combines the Stochastic Oscillator and Moving Average (MA) to determine overbought and oversold market conditions and uses the trend direction of the moving average to determine the trading direction. When the Stochastic Oscillator crosses upward in the oversold area and the moving average is in an upward trend, the strategy opens a long position; when the Stochastic Oscillator crosses downward in the overbought area and the moving average is in a downward trend, the strategy opens a short position. Additionally, the strategy sets a Stop Loss to control risk.

#### Strategy Principles
1. Calculate the K and D values of the Stochastic Oscillator, where the K value represents the price position relative to the highest and lowest prices, and the D value is the moving average of the K value.
2. Calculate the moving average for the specified period.
3. Determine entry conditions: Open a long position when the K value crosses above the oversold level from below and the moving average is trending upward; open a short position when the K value crosses below the overbought level from above and the moving average is trending downward.
4. Determine exit conditions: Close the position when the K value crosses the moving average and the moving average changes direction.
5. Set a stop loss to control risk.

#### Advantage Analysis
1. By combining the Stochastic Oscillator and moving average, the strategy can effectively capture market trends and overbought/oversold conditions.
2. Using the trend direction of the moving average to filter trading signals improves the quality of trades.
3. Setting a stop loss effectively controls risk.
4. The code structure is clear and easy to understand and modify.

#### Risk Analysis
1. Both the Stochastic Oscillator and moving average are lagging indicators, which may result in delayed signals.
2. In a volatile market, the strategy may generate frequent trades, leading to high transaction costs.
3. A fixed stop loss percentage may not adapt to different market conditions and may need to be adjusted based on market volatility.

#### Optimization Directions
1. Consider incorporating other technical indicators, such as MACD and RSI, to improve signal reliability.
2. For stop loss, dynamic stop loss methods or ATR (Average True Range) based stop loss can be used to better adapt to market changes.
3. Dynamically adjust the parameters of the Stochastic Oscillator and moving average based on market trends and volatility to optimize strategy performance.
4. Introduce position sizing to dynamically adjust position size based on market conditions and account risk.

#### Summary
This strategy combines the Stochastic Oscillator and moving average to capture overbought and oversold market conditions while using the trend direction of the moving average to filter trading signals and setting a stop loss to control risk. The strategy logic is clear and easy to understand and implement. However, the strategy also has some limitations, such as indicator lag and frequent trading. By introducing other technical indicators, optimizing stop loss methods, dynamically adjusting parameters, and implementing position sizing, the strategy's performance and robustness can be further enhanced.

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


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-22 00:00:00
end: 2024-04-29 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Pablo_2uc

//@version=5
strategy("Estrategia Stoch + MA c/ SL", overlay=true)

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
capital = 500

// Tamaño de posición (10% del capital)
positionSize = 1

// Stop Loss (2% del precio de entrada)
stopLossPercent = input.int(2, title="Stop Loss (%)") / 100

// Cálculo del Estocástico
k = ta.sma(ta.stoch(close, high, low, length), smoothK)
d = ta.sma(k, smoothD)

// Cálculo de la Media Móvil
ma = ta.sma(maSource, maLength)

// Condiciones de entrada en largo y corto
longCondition = ta.crossunder(k, oversold) and ma > ma[1]
shortCondition = ta.crossover(k, overbought) and ma < ma[1]

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

https://www.fmz.com/strategy/449958

> Last Modified

2024-04-30 16:45:30
