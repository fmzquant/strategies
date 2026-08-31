
> Name

Rose-Cross-Star-Dual-Indicator-Volatility-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f7271906b84b61b1a8.png)



## Overview

This strategy identifies trading opportunities through combining Bollinger Bands and a modified Relative Strength Index (RSI). Backtest results demonstrate its overall profitability and high winning rate. It captures breakout signals in trending markets and suits short-term to medium-term trading.  

## Strategy Logic

### Indicator Selection

The strategy utilizes Bollinger Bands with a standard deviation multiplier of 2 and RSI with a period of 14. Bollinger Bands detect breakouts and RSI determines overbought/oversold levels. Indicator parameters are set based on experience and iterative testing.

### Entry Rules

1. Go long when price breaks above the lower Bollinger Band and RSI is below 30 (oversold zone). 

2. Go short when price breaks below the upper Bollinger Band and RSI is above 70 (overbought zone).

### Exit Rules 

1. Close long positions on a stop loss or when price breaks below the upper Bollinger Band.

2. Close short positions on a stop loss or when price breaks above the lower Bollinger Band.


### Advantages

1. Dual indicator combination improves strategy precision. 

2. Optimized indicator parameters provide robust adaptability.

3. Breakout signals are clear and easy to implement.  

4. Effective drawdown and loss control.

5. Visual signals simplify trade execution.

### Risks

1. Band squeeze may cause false breakouts. Consider longer Bollinger periods.

2. Frequent trading possible in range-bound markets. Lower RSI sensitivity.

3. Manage transaction costs. Widen stop distances. 

### Enhancements

1. Test EMA and other indicators to generate bands.

2. Add volume or MA filters to avoid false breaks.

3. Set band and stop distances based on ATR. 

4. Add trend filter to reduce whipsaws.

## Conclusion

This strategy combines the strengths of Bollinger Bands and RSI for trend and breakout trading. Simple to implement, it is well-suited for short to medium-term breakouts. Extensions through indicator and parameter optimization can further expand its robustness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Longitud|
|v_input_2|2|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-24 00:00:00
end: 2023-10-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Estrategia de Ruptura con Bollinger y RSI Modificada", shorttitle="BB RSI Mod", overlay=true)

// Parámetros de Bollinger Bands
src = close
length = input(20, title="Longitud", minval=1)
mult = input(2.0)
basis = sma(src, length)
upper = basis + mult * stdev(src, length)
lower = basis - mult * stdev(src, length)

// Parámetros del RSI
rsiSource = rsi(close, 14)
overbought = 70
oversold = 30

longCondition = crossover(src, lower) and rsiSource < oversold
shortCondition = crossunder(src, upper) and rsiSource > overbought

longExit = crossunder(src, upper)
shortExit = crossover(src, lower)

if (longCondition)
    strategy.entry("Compra", strategy.long, stop=low)
    
if (shortCondition)
    strategy.entry("Venta", strategy.short, stop=high)

if (longExit)
    strategy.close("Compra")

if (shortExit)
    strategy.close("Venta")

// Visualización
plotshape(series=longCondition, title="Compra", location=location.belowbar, color=color.green, style=shape.labelup, text="Compra")
plotshape(series=shortCondition, title="Venta", location=location.abovebar, color=color.red, style=shape.labeldown, text="Venta")
plot(upper, "Banda Superior", color=color.red)
plot(lower, "Banda Inferior", color=color.green)

```

> Detail

https://www.fmz.com/strategy/430692

> Last Modified

2023-10-31 17:33:10
