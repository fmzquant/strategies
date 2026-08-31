
> Name

SMA-System-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e8bdb47e0d75714703.png)

## Overview

The strategy is named "SMA System Trend Following Strategy". The main idea is to construct trading signals based on the SMA lines with different parameter lengths and enter the market at breakpoint, with stop loss mechanism to control the risk.

## Strategy Principle  

The strategy uses two SMA lines, SMA1 and SMA2. SMA1 length is 1 and SMA2 length is 3. By calculating these two SMA lines, when SMA1 crosses above SMA2, a buy signal is generated. When SMA1 crosses below SMA2, a sell signal is generated. This aims to capture the trend of the price.

Specifically, the strategy judges the crossover relationship between the SMA lines through the ta.crossover and ta.crossunder functions, generating the longCondition and shortCondition boolean variables. When longCondition is true, a buy signal is generated. When shortCondition is true, a sell signal is generated. The strategy will enter the market at the signal point and update the profitAccumulated and lastTradeProfit variables to track accumulated profits.

For risk control, the strategy also sets a stop loss mechanism based on fixed points. If the price reaches the set stop loss point from the entry point, it will trigger the closing of the stop loss order.

## Advantage Analysis  

The biggest advantage of this strategy is that it utilizes the trend tracking capability of SMA lines to effectively capture changes in price trends. Compared with single line strategies, double line strategies can use the crossover relationship between the lines to determine the trend direction and thus generate trading signals. In addition, the stop loss mechanism can effectively control single loss.

## Risk Analysis

The main risk of this strategy is that the moving average strategy tends to generate false signals. When the price oscillates, the SMA line may frequently cross, resulting in unnecessary trading signals. At this point, large losses may occur without effective stop loss.

## Optimization Directions  

The strategy can be optimized in the following aspects:

1. Adjust SMA parameters to find the best combination of moving average lengths through backtesting.  

2. Increase filtering conditions and set price breakthrough conditions near the moving average crossover point to avoid false signals.

3. Different types of stop loss methods can be tested, such as mobile stop loss, pending order stop loss, etc.  

4. Add Position Size control to optimize capital utilization efficiency.

## Conclusion  

Overall, this is a typical trend following strategy. It uses the breakthrough relationship between SMA lines to determine the direction of the price trend and enter at the turning point of the trend. At the same time, the strategy has a fixed stop loss function to control risks. The strategy is simple, easy to understand, but still needs in-depth testing and optimization before making stable profits in real trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|SMA 1 Longitud|
|v_input_2|3|SMA 2 Longitud|
|v_input_3|5000|Stop Loss (en pips)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © cesarpieres72

//@version=5
strategy("Estrategia SMA y Ganancias Acumuladas con Stop Loss", shorttitle="SMA_Ganancias", overlay=true)

// Definir las variables de las medias móviles
sma1_length = input(1, title="SMA 1 Longitud")
sma2_length = input(3, title="SMA 2 Longitud")

// Calcular las medias móviles
sma1 = ta.sma(close, sma1_length)
sma2 = ta.sma(close, sma2_length)

// Condiciones para las señales de compra y venta
longCondition = ta.crossover(sma1, sma2)
shortCondition = ta.crossunder(sma1, sma2)

// Acumular las ganancias
var float profitAccumulated = 0.0
var float lastTradeProfit = na

if (longCondition)
    strategy.entry("Buy", strategy.long)
    lastTradeProfit := strategy.netprofit - (profitAccumulated + lastTradeProfit)
    profitAccumulated := strategy.netprofit

if (shortCondition)
    strategy.entry("Sell", strategy.short)
    lastTradeProfit := strategy.netprofit - (profitAccumulated + lastTradeProfit)
    profitAccumulated := strategy.netprofit

// Mostrar las señales en el gráfico
plot(sma1, color=color.blue, title="SMA 1")
plot(sma2, color=color.red, title="SMA 2")

// Añadir stop loss
stopLossPips = input(5000, title="Stop Loss (en pips)")
stopLossPrice = strategy.position_avg_price * (1 - stopLossPips * syminfo.mintick)
strategy.exit("SL", "Buy", stop=stopLossPrice)

```

> Detail

https://www.fmz.com/strategy/442626

> Last Modified

2024-02-23 12:29:51
