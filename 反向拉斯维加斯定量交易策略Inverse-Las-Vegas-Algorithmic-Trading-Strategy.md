
> Name

反向拉斯维加斯定量交易策略Inverse-Las-Vegas-Algorithmic-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b99c06a6aa8598d0f5.png)

### Overview

The name of this strategy is “Inverse Las Vegas Algorithmic Trading Strategy”. The basic idea is to utilize the Las Vegas algorithm to go short when prices rise and go long when prices fall, which is the opposite of the original algorithm, forming an inverse operating strategy.

### Strategy Principle   

The core logic of this strategy is to calculate the current price and the price of the previous cycle. When the current price is greater than the previous price, a short signal is triggered. When the current price is less than the previous price, a long signal is triggered. The position size is calculated based on the total accumulated profits. After each trade ends, the profits are accumulated into the funds for the next operation, forming a reinvestment.

Specifically, the strategy records the current price and the closing price of the previous cycle through the current_price and previous_price variables. Then the long_condition and short_condition judgment conditions are defined. When current_price is greater than previous_price, long_condition is triggered. When current_price is less than previous_price, short_condition is triggered. When the conditions are triggered, determine the position size position_size based on the capital_actual variable. After executing a short or long trade, record the profit and loss of this trade through the ganancias variable and accumulate it into ganancias_acumuladas. Finally, reinvest the profits into the next trade through capital_actual := capital_actual + ganancias_acumuladas.

### Advantage Analysis  

The biggest advantage of this strategy is that it uses the idea of inverse operations. When there is a systemic error in the market, its profit potential will be very large. In addition, its reinvestment mechanism will also amplify profits. If you get consecutive profitable trades through luck, funds can accumulate rapidly through reinvestment. 

Specifically, the main advantages are:

1. Inverse operations utilize systemic errors in market judgement for huge profit potential.  

2. The profit reinvestment mechanism amplifies profits, and funds grow rapidly when lucky.

3. The strategy logic is simple, easy to understand and track.  

4. Parameters can be adjusted to experience different trading results.

### Risk Analysis

The biggest risk of this strategy lies in its inverse operation characteristics. If insisting on wrong market judgments, it will face huge losses. In addition, the leverage effect will also amplify losses through the reinvestment mechanism.

Specific risk points include:

1. If the market trend judgement is wrong, the loss from closing positions will be amplified.

2. The risk of leveraged trading is too high, and the loss from a single trade may exceed the principal.  

3. The psychology of chasing rises and killing falls works, and excessive trading increases losses.  

4. Improper parameter settings may also lead to unexpectedly large losses.

The corresponding solutions include:

1. Do risk management, stop loss exit, open positions in batches.

2. Use leverage cautiously and control single transaction losses.

3. Strengthen psychological regulation to avoid excessive trading. 

4. Test parameters before running.

### Optimization Suggestions   

The optimization space of this strategy is mainly concentrated in the profit reinvestment mechanism and parameter adjustment.

The profit reinvestment mechanism can set the ratio of reinvestment instead of full reinvestment to control the impact of a single loss.

Parameter adjustment can try different cycle lengths and shift sizes to find the optimal parameter combination.

In addition, it is recommended to incorporate a stop loss mechanism to control losses. Specific optimization suggestions are as follows:

1. Set reinvestment ratio to prevent excessive losses.  

2. Test different cycle parameters to find the optimal parameters.

3. Add stop loss logic. Initially can set a fixed stop loss, and later can add dynamic stop loss based on ATR.

4. Consider adding open and close conditions based on time or technical indicators to control trading frequency.

### Conclusion   

The name of this strategy is “Inverse Las Vegas Algorithmic Trading Strategy”. Through the idea of inverse operations, combined with a profit reinvestment mechanism, it attempts to profit when the market makes mistakes. The strategy has the advantage of high profit potential, but also faces huge risks. We analyzed the risks in detail and gave optimization suggestions. In general, with proper management, the strategy can profit under certain conditions, but needs to be treated cautiously.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Longitud de comparación|
|v_input_2|true|Desplazamiento|
|v_input_3|100|Capital Inicial|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-16 00:00:00
end: 2023-11-23 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Estrategia Las Vegas Long/Short Invertida con Reinversión de Ganancias", shorttitle="Las Vegas LS-Invertida-Reinversion", overlay=true)

// Parámetros
length = input(14, title="Longitud de comparación")
offset = input(1, title="Desplazamiento")

// Capital inicial
capital_inicial = input(100, title="Capital Inicial")

// Variables para el seguimiento de las ganancias
var float capital_actual = capital_inicial
var float ganancias_acumuladas = 0.0

// Calcular el precio actual y el precio anterior
current_price = close
previous_price = security(syminfo.tickerid, "D", close[1])

// Lógica de la estrategia invertida
long_condition = current_price > previous_price
short_condition = current_price < previous_price

// Calcular el tamaño de la posición en función de las ganancias acumuladas y reinvertir
if (long_condition or short_condition)
    position_size = capital_actual / current_price
    ganancias = position_size * (previous_price - current_price)  // Invertir la dirección
    capital_actual := capital_actual + ganancias
    ganancias_acumuladas := ganancias_acumuladas + ganancias

// Reinvertir las ganancias en la próxima orden
position_size_reinvested = capital_actual / current_price

// Sumar las ganancias de los trades al monto de operación
if (long_condition or short_condition)
    capital_actual := capital_actual + ganancias_acumuladas

// Colocar una orden SHORT (venta) cuando se cumpla la condición Long invertida
strategy.entry("Short", strategy.short, when=long_condition)
// Colocar una orden LONG (compra) cuando se cumpla la condición Short invertida
strategy.entry("Long", strategy.long, when=short_condition)

// Etiquetas para mostrar las condiciones en el gráfico
plotshape(series=long_condition, title="Condición LONG", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=short_condition, title="Condición SHORT", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Mostrar el capital actual y las ganancias acumuladas en el gráfico
plot(capital_actual, title="Capital Actual", color=color.blue, linewidth=2)
plot(ganancias_acumuladas, title="Ganancias Acumuladas", color=color.green, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/433117

> Last Modified

2023-11-24 15:19:03
