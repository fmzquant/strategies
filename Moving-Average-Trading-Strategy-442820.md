
> Name

Moving-Average-Trading-Strategy-442820

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/5d029cba0ad9d90c33.png)

## Overview   

This is a trend-following trading strategy based on moving average lines. It uses a 14-day simple moving average (SMA) to determine market trend direction and enter trades when price approaches the moving average line.  

## Strategy Logic   

The core logic of this strategy is:

1. Calculate the 14-day simple moving average (SMA) 
2. When close price is below 99% of moving average, market is considered oversold, generating buy signals
3. After entering, set stop loss and take profit price  
4. Stop loss price is set at 10 pips below entry price
5. Take profit price is set at 60 pips above entry price
  
This is a trend-following strategy. It identifies overall market trend using the moving average line and enters oversold stages along the major trend. Stop loss and take profit are used to exit trades.   

## Advantage Analysis

The main advantages of this strategy are:

1. Simple and clear strategy logic, easy to understand and implement  
2. Moving average filters out some noise and determines market trend 
3. Only taking oversold setups avoids large drawdowns
4. Reasonable stop loss and take profit controls risk 
5. Drawdown and loss can be limited to reasonable range

## Risk Analysis   

There are also some risks associated with this strategy:

1. Moving average has lagging effect, possibly missing short-term opportunities  
2. Stop loss may be too aggressive leading to premature exit  
3. Significant price gaps or trend reversals on major news events  
4. Interference from algorithmic and high-frequency trades  

Some methods to mitigate risks include allowing wider entry range, adjusting stop loss position etc.

## Optimization Directions

Some ways to optimize this strategy:

1. Optimize moving average parameters for more market regimes 
2. Add multiple time frame moving averages for combo assessment
3. Use dynamic stop loss/take profit ratios for certain sessions   
4. Utilize volatility metrics to time entries
5. Incorporate machine learning for enhanced trend and key points prediction  

## Conclusion  

In summary, this is a simple and practical trend-following strategy. It identifies trend direction using moving average, enters oversold stages, and sets reasonable stop loss and take profit to control risk. With proper enhancements and combinations, it can be adapted to more market conditions and further improve stability and profitability.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-26 00:00:00
end: 2024-02-25 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Estrategia MA - mejor", overlay=true)

// Parámetros de la estrategia
initialCapital = 1000  // Inversión inicial
riskPerTrade = 0.02  // Riesgo por operación (2% del capital por operación)
lengthMA = 14  // Período de la media móvil
pipValue = 20 / 10  // Valor de un pip (30 euros / 10 pips)

// Apalancamiento
leverage = 10

// Cálculo de la media móvil en el marco temporal de 30 minutos
ma = request.security(syminfo.tickerid, "30", ta.sma(close, lengthMA))

// Condiciones de Entrada en Sobreventa
entryCondition = close < ma * 0.99  // Ejemplo: 1% por debajo de la MA

// Lógica de entrada y salida
if entryCondition
    riskAmount = initialCapital * riskPerTrade  // Cantidad de euros a arriesgar por operación
    size = 1  // Tamaño de la posición con apalancamiento
    strategy.entry("Long", strategy.long, qty=size)
    stopLossPrice = close - (10 * pipValue / size)
    takeProfitPrice = close + (60 * pipValue / size)
    strategy.exit("Exit Long", "Long", stop=stopLossPrice, limit=takeProfitPrice)

// Gráficos
plot(ma, color=color.blue, title="Media Móvil")
plotshape(series=entryCondition, title="Entrada en Sobreventa", location=location.belowbar, color=color.green, style=shape.labelup, text="↑ Compra")

```

> Detail

https://www.fmz.com/strategy/442820

> Last Modified

2024-02-26 11:36:37
