
> Name

Gap-Opening-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a9be1b313d3475bec3.png)

This strategy judges market trend direction by calculating moving average and price difference to determine long entry, avoiding frequent opening during shocks.

### Strategy Overview  

1. Use 20-period simple moving average to determine overall market trend  
2. Use 3-period high-low price difference to judge recent price fluctuation  
3. Go long when price is above MA and difference is greater than 20-period average  
4. Exit when price drops below 98% of entry price  

### Strategy Principle  

This strategy combines MA and price fluctuation to capture upside opportunities during trends.  

When price breaks above MA, it indicates an upward trend. If recent 3-period HL difference is larger than 20-period average, it suggests increased fluctuation and potential for a big rise for entry.  

After opening, set a fixed percentage stop loss price. Exit when price drops below to control downside risk.

### Advantages  

1. Avoid frequent opening during shocks by judging both trend and volatility
2. More solid breakout signal using price difference 
3. Stop loss helps control risk  

### Risks  

1. Improper parameter tuning leads to missing trades  
2. Too wide stop loss brings large loss  
3. Breakout could be false, needs more factors  

Risk Solutions:  

1. Optimize parameters for best combination  
2. Use multiple stops or adaptive stops per market volatility   
3. Add indicators like volume to confirm signal reliability  

### Improvement Direction   

1. Add volatility indicators like BB for better entry  
2. Analyze volume to confirm entry signals  
3. Judge overall market using stock index to avoid bad trades   
4. Use moving/trailing stop to lock in more profit  

### Conclusion  

This strategy effectively filters out shocks and volatility before entering in trending markets with simple but useful indicators, avoiding unnecessary trades. Also, risk is well controlled to limit losses. Further optimizations can lead to even better results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Longitud MA|
|v_input_2|3|Longitud HL|
|v_input_3|0.98|Salir por debajo de precio|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-21 00:00:00
end: 2024-02-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Estrategia de Diferencia HL y MA para Criptomonedas", shorttitle="HL MA Crypto Strategy-Ortiz", overlay=true)

// Definir longitud de MA y HL
ma_length = input(20, title="Longitud MA")
hl_length = input(3, title="Longitud HL")
exit_below_price = input(0.98, title="Salir por debajo de precio")

// Calcular MA
ma = ta.sma(close, ma_length)

// Calcular HL
hh = ta.highest(high, hl_length)
ll = ta.lowest(low, hl_length)
hl = hh - ll

// Condiciones de tendencia alcista
bullish_trend = close > ma

// Condiciones de entrada y salida
long_condition = close > ma and close > ma[1] and hl > ta.sma(hl, ma_length)
short_condition = false // No operar en tendencia bajista
exit_condition = low < close * exit_below_price

// Entrada y salida de la estrategia
if (long_condition)
    strategy.entry("Buy", strategy.long)
if (short_condition)
    strategy.entry("Sell", strategy.short)
if (exit_condition)
    strategy.close("Buy")

// Plot de señales en el gráfico
plotshape(long_condition, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small, title="Buy Signal")
plotshape(short_condition, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small, title="Sell Signal")

```

> Detail

https://www.fmz.com/strategy/443035

> Last Modified

2024-02-28 17:12:52
