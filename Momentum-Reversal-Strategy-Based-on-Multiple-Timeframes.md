
> Name

Momentum-Reversal-Strategy-Based-on-Multiple-Timeframes

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e475cd1061caeb3247.png)

## Overview
This strategy identifies trading opportunities by calculating candlestick body/wick ratios and combining RSI indicators to detect overbought/oversold market conditions. It aims to capture potential reversals in the price momentum over short-to-medium term timeframes.  

## Strategy Logic
The core logic of this strategy is based on the following:

1. Calculate body/wick percentage of candlesticks: By computing open, close, high and low prices, derive the percentage occupied by candle body and wicks. Wick percentage below 20% indicates a strong candle.

2. Compute candle strength change percentage: Calculate the internal price movement magnitude of each candle to determine candle strength. Larger fluctuations imply stronger momentum and hence indicate stronger candles.

3. Combine with RSI to identify overbought/oversold conditions: Set overbought and oversold threshold lines for RSI. RSI above overbought line signifies overbought state and vice versa for oversold. Strong candles in such states have high probability of reversal. 

4. Determine reversal signals: When wick percentage < 20% and candle strength > 2 x average strength, along with previous candle close higher than current candle close, it signals short condition. The opposite indicates long condition.

5. Define stop loss and take profit: Set fixed percentage-based stop loss and take profit levels separately for long and short trades.

## Advantage Analysis  
The advantages of this strategy include:

1. Effective identification of trend and reversals using candle body/wick proportions. Detects price momentum and turning points well.

2. Higher accuracy of reversal signals by combining candle strength change and RSI. RSI is adjustable providing greater optimization capability.

3. Reasonable stop loss/take profit configuration to capitalize on short-term opportunities while lowering trade risk exposure.

4. Flexible tunability of parameters for optimizing across different products and timeframes. High practical utility.  

## Risk Analysis
Some risks present in the strategy:

1. Potential false signals during strong trend breakouts. Can be reduced via optimization of candle comparison periods and RSI parameters.

2. Probability of failed reversals can't be eliminated fully. Being long in downtrend and vice versa induces losses. Stop losses should be adjusted accordingly to minimize damage.

3. Performance depends on product and timeframe. Caution warranted when applying to highly volatile products.

## Enhancement Opportunities 
The strategy can be optimized in the following ways:

1. Fine tune periods considered in identifying overbought/oversold to determine optimal parameter combinations.

2. Optimize overbought/oversold RSI thresholds based on product specifics. 

3. Test stop loss/take profit ratios for deriving ideal risk management plan.

4. Categorize products as per volatility for more targeted parameter tuning.

5. Additional filters based on other indicators may improve robustness.

## Conclusion
The strategy is highly practical overall for detecting reversals by understanding candlestick information. As a typical short-term trading system, it has sizable optimization capability across products and environments for tracking medium-term trends. However adequate risk control through stop losses is imperative.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|Periodo RSI|
|v_input_int_2|75|Sobre Compra|
|v_input_int_3|25|Sobre Venta|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("mecha larga study",overlay = true,  max_bars_back = 600)
//Porcentaje Mecha cuerpo
bodyPercent = math.abs(open - close) / (high - low) * 100
wickPercent = 100 - bodyPercent

plot(bodyPercent, "Porcentaje del cuerpo", color.rgb(163, 76, 175))
plot(wickPercent, "Porcentaje de la mecha", color.red)

VelaDeFuerza =  math.abs(((high[0] - low[0])*100)/high)//PORCENTAJE DE VARIACION DE UNA VELA
plot(VelaDeFuerza, color = color.purple)

Promedio = ((VelaDeFuerza[0] + VelaDeFuerza[1] + VelaDeFuerza[2] + VelaDeFuerza[3] + VelaDeFuerza[4]  + VelaDeFuerza[5] + VelaDeFuerza[6] + VelaDeFuerza[7] + VelaDeFuerza[8] + VelaDeFuerza[9] + VelaDeFuerza[10] + VelaDeFuerza[11] + VelaDeFuerza[12] + VelaDeFuerza[13]  + VelaDeFuerza[14] ) / 15)
plot(Promedio, color = color.yellow)


// rsi 
per_Rsi = input.int(14, "Periodo RSI",minval= 11, maxval=20) //inicializo el rsi en 14 periodos pero doy la posibilidad al usuario de cambiarlo
rsi_Sc = input.int(75,"Sobre Compra",minval=68,maxval=80) //ENTRADA DE SOBRE COMPRA DE RSI
rsi_Sv = input.int(25,"Sobre Venta",minval=20,maxval=33) //ENTRADA DE SOBRE VENTA DE RSI
rsi= ta.rsi(close,per_Rsi)//guardo el rsi con los paramentros anteriores en una variable

//logica
MayorPromedio =   Promedio + 0.800
plot(MayorPromedio, color = color.green)

Venta =   bodyPercent > 80   and VelaDeFuerza > Promedio * 2  and close < close[1]
Compra =   bodyPercent > 80  and VelaDeFuerza > Promedio * 2 and close > close[1]


precioVenta = Venta? close : na
precioCompra = Compra? close : na

tp1 = 0.00
sl  = 0.00
tp1 := 0.003
sl := 0.010

TP1short = precioVenta - (precioVenta * tp1)
Slshort = precioVenta + (precioVenta * sl)

TP1long = precioCompra + (precioCompra * tp1)
SLlong = precioCompra - (precioCompra * sl)


name1 = "tp1"
name2 = "tp2"
name3= "SL"




if ( precioVenta ) 
    strategy.entry("short", strategy.short , comment = "Sell  SL: " + str.tostring(Slshort, "0.000")  + " TP1: " + str.tostring(TP1short,"0.000") ) 
    strategy.exit("exit" , "short", stop = Slshort , limit = TP1short ,qty_percent = 100 )  
if ( precioCompra ) 
    strategy.entry("long", strategy.long , comment = "Buy   SL: " + str.tostring(SLlong, "0.000")  + " TP1: " + str.tostring(TP1long,"0.000") )
    strategy.exit("exit" , "long", stop = SLlong  , limit = TP1long ,qty_percent = 100 )
```

> Detail

https://www.fmz.com/strategy/442927

> Last Modified

2024-02-27 14:27:49
