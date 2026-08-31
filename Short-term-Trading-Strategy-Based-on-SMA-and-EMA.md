
> Name

Short-term-Trading-Strategy-Based-on-SMA-and-EMA

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/110506f5e329083a298.png)


## Overview  

This strategy performs short-term trading based on two indicators - Simple Moving Average (SMA) and Exponential Moving Average (EMA). It generates buy signals when EMA crosses above SMA and sell signals when SMA crosses below EMA. The strategy is suitable for high-frequency trading at 1-minute timeframe.

## Strategy Logic

The core indicators of this strategy are 20-period SMA and 21-period EMA. SMA can effectively filter out random price fluctuations and captures longer term trends. Compared with SMA, EMA reacts faster to recent price changes and can identify new trends earlier.  

When EMA crosses above SMA, it indicates the short-term average line is above the long-term one and prices start to rise. This golden cross is a buy signal. When SMA crosses below EMA, it suggests the long-term average line is below the short-term one and prices start to decline. This death cross is a sell signal.

The strategy is simple and straightforward. By capturing the golden/death crosses between EMA and SMA, trading signals can be generated easily.

## Advantage Analysis   

The advantages of this strategy include:

1. It uses two widely adopted simple indicators that are easy to understand and implement.

2. The combination of SMA and EMA generates clearer trading signals.  

3. It is suitable for high-frequency short-term trading and captures short-term price swings.

4. The trading logic is very simple and clear, easy for parameter optimization.  

5. The implementation code is concise and easy to expand and optimize.

## Risk Analysis

There are also some risks of this strategy:    

1. The performance relies heavily on parameter tuning. Improper parameters may lead to over-trading or missing trades.  

2. Unclear or incorrect signals may occur during violent market fluctuation.

3. Short-term indicators are vulnerable to fake breakouts resulting in unnecessary losses. 

4. High-frequency trading requires sufficient funding support, otherwise risks exceeding maximum loss.

## Optimization Directions 

The strategy can be further optimized from the following aspects:

1. Optimize the periods of SMA and EMA to find the best parameter combination using methods like grid search and genetic algorithms.

2. Incorporate stop loss and take profit to control single trade loss and increase profit space.

3. Combine with other indicators such as KDJ, RSI to filter out false breakouts.

4. Moderate position sizing to prevent exceeding maximum loss.

## Conclusion

This strategy leverages SMA and EMA, two simple and effective indicators, and adopts a combination of indicators, generating clear trading signals. The simplicity of the logic makes it easy to implement and test. Meanwhile, there are still some risks of the strategy. Further testing and optimization are needed before real-world application. In conclusion, it provides an efficient idea for short-term trading and is worth exploring further.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Stop Loss|
|v_input_2|2|Take Profit|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-30 00:00:00
end: 2023-12-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Cruce de SMA y EMA - Estrategia", overlay=true)

// Definición de variables
smaLength = 20
emaLength = 21

sma = ta.sma(close, smaLength)
ema = ta.ema(close, emaLength)

// Cruce de SMA y EMA hacia arriba (orden de compra)
buySignal = ta.crossover(ema, sma)

// Cruce de EMA y SMA hacia arriba (orden de venta)
sellSignal = ta.crossover(sma, ema)

// Configuración de la relación riesgo/recompensa
stopLoss = input(1, title="Stop Loss")
takeProfit = input(2, title="Take Profit")

// Gestión de órdenes
strategy.entry("Buy", strategy.long, when = buySignal)
strategy.entry("Sell", strategy.short, when = sellSignal)

strategy.exit("Take Profit/Stop Loss", from_entry = "Buy", stop = close * (1 - stopLoss/100), limit = close * (1 + takeProfit/100))
strategy.exit("Take Profit/Stop Loss", from_entry = "Sell", stop = close * (1 + stopLoss/100), limit = close * (1 - takeProfit/100))

// Marcado de señales en el gráfico
plotshape(buySignal, style=shape.triangleup, location=location.belowbar, color=color.green, title="Buy Signal")
plotshape(sellSignal, style=shape.triangledown, location=location.abovebar, color=color.red, title="Sell Signal")

```

> Detail

https://www.fmz.com/strategy/434558

> Last Modified

2023-12-07 15:29:12
