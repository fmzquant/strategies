
> Name

Hilo-Activator-Buy-Sell-Signals-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/102d8f5902eca5bf302.png)


## Overview

The Hilo Activator Buy Sell Signals strategy is a quantitative trading strategy based on the Hilo Activator indicator. It uses the Hilo indicator to dynamically generate key price thresholds and trigger buy and sell signals when the closing price breaks through these price levels. The strategy supports automated actual trading to establish long and short positions based on rules.

## Strategy Logic

The strategy uses custom variables to set the period, shift, and whether to use exponential moving average for the Hilo Activator indicator. The Hilo indicator contains lines representing key decision price levels for long and short. When the closing price crosses above the Hilo line, a buy signal is generated. When the closing price crosses below the Hilo line, a sell signal is triggered. To clearly visualize the signals, the strategy uses green triangles to mark buy signals and red triangles for sell signals.

## Advantage Analysis 

The Hilo Activator Buy Sell Signals Strategy has the following advantages:

1. Identify key support and resistance levels using Hilo indicator to capture price reversal opportunities  
2. Adjustable parameters for optimization across different markets and trading instruments
3. Intuitive visual design with signals 
4. Support automated trading execution of the strategy

## Risk Analysis

There are also some risks with this strategy:

1. Hilo indicator could lag and miss some price moves
2. Need to adjust parameters properly to avoid excessive invalid signals  
3. Risks associated with automated trading needs assessment and control

## Optimization Directions

The strategy can be optimized from the following aspects:

1. Incorporate other filters to improve signal quality
2. Add stop loss mechanisms to control single loss
3. Optimize parameter settings to adapt to more market conditions  
4. Utilize machine learning methods to dynamically optimize parameters

## Conclusion  

The Hilo Activator Buy Sell Signals Strategy provides a simple yet reliable quantitative trading framework, identifying key prices to trade based on Hilo indicator thresholds and breakouts. With excellent visual design, adjustable parameters, and automated trading support, further testing and enhancements could make the strategy robust across more instruments and market environments to generate steady excess returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|Período|
|v_input_2|true|Deslocamento|
|v_input_3|false|Média Móvel Exponencial|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-10 00:00:00
end: 2024-01-17 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Hilo Activator com Sinais de Compra e Venda", overlay=true)

// Entradas personalizadas
period = input(8, title="Período")
shift = input(1, title="Deslocamento")
exp = input(false, title="Média Móvel Exponencial")
max = exp ? ema(high[shift], period) : sma(high[shift], period)
min = exp ? ema(low[shift], period) : sma(low[shift], period)
pos = close > max ? -1 : close < min ? 1 : 0
pos := pos == 0 ? na(pos[1]) ? 0 : pos[1] : pos
hilo = pos == 1 ? max : min

// Condições para sinais de compra e venda
buySignal = crossover(close, hilo)
sellSignal = crossunder(close, hilo)

plotshape(buySignal, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small)
plotshape(sellSignal, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small)

// plotbar(hilo,hilo,hilo,hilo,color=pos==1?color.red:color.green)

strategy.entry("Buy", strategy.long, when = buySignal)
strategy.entry("Sell", strategy.short, when = sellSignal)
```

> Detail

https://www.fmz.com/strategy/439248

> Last Modified

2024-01-18 15:56:51
