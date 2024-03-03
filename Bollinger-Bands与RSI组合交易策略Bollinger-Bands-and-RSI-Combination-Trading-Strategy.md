
> Name

Bollinger-Bands与RSI组合交易策略Bollinger-Bands-and-RSI-Combination-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/133e922f3a57fcaaf22.png)
[trans]
### 概述

这是一个利用 Bollinger Bands 和相对强弱指数 (RSI) 进行组合交易的策略。它的核心思想是在 RSI 达到超买或超卖区域时,结合 Bollinger Bands 的上下轨,产生买入和卖出信号。

### 策略名称

BB-RSI 组合交易策略

### 策略原理

该策略首先计算常规的 Bollinger Bands,包含中轨、上轨和下轨。中轨是一定周期内的收盘价简单移动平均线,上下轨分别是中轨以上下一个标准差。

同时,该策略计算 RSI 指标。RSI 通过比较一段时间内的平均收盘涨幅和平均收盘跌幅,来判断当前市场是否处于超买或超卖状态。

当 RSI 小于低点(默认30),意味着市场处于超卖状态;当 RSI 大于高点(默认70),意味着市场处于超买状态。

该策略所做的是,在 RSI 达到超卖区时,如果收盘价低于 Bollinger Bands 下轨,产生买入信号;在 RSI 达到超买区时,如果收盘价高于 Bollinger Bands 上轨,产生卖出信号。

### 优势分析

这种组合策略最大的优势在于能够发现市场的转折点。当股价处于 Bollinger Bands 广度较大的区域,说明市场波动较大,这时通过 RSI 判断市场是否超买超卖,可以定位到反转的时机。

另一个优势是参数设置灵活。Bollinger Bands 和 RSI 指标都有可调整的参数,交易者可以根据自己的需求进行优化。

### 风险分析

该策略最大的风险在于产生的信号较少。尤其是在市场长期单边行情的时候,容易出现过拟合的情况。此时 RSI 很难达到超买超卖的状态,无法产生交易信号。

另一个风险是参数设置的困难。 Bollinger Bands 和 RSI 都需要设置周期等参数,选择不当可能导致策略效果不佳。这需要交易者对市场有充分的理解,否则应该谨慎使用该策略。

### 优化方向 

为了获得更多交易机会,可以适当调整 RSI 的超买超卖线。例如可以把超卖线提高至40,超买线下调至60,这样就容易形成信号。

另一个方向是引入趋势判断机制,避免在市场单边行情中盲目反转。例如可以计算长周期均线的方向,作为过滤条件,只在均线方向符合的情况下产生信号。

### 总结

BB-RSI 组合策略利用 Bollinger Bands 判定支撑阻力,RSI 判断超买超卖,在反转点产生信号。它可以有效定位市场的转折点,是一种典型的反转交易策略。通过参数优化和规则完善,该策略可以成为量化交易的有力工具。

||

### Overview

This is a combination trading strategy using Bollinger Bands and Relative Strength Index (RSI). Its core idea is to generate buy and sell signals when RSI reaches overbought or oversold areas, combined with Bollinger Bands upper and lower rails.

### Strategy Name 

BB-RSI Combination Trading Strategy

### Strategy Principle

The strategy first calculates regular Bollinger Bands, including middle rail, upper rail and lower rail. The middle rail is the simple moving average of closing prices over a certain period, and the upper and lower rails are above and below one standard deviation of the middle rail.

At the same time, the strategy calculates the RSI indicator. RSI judges whether the current market is overbought or oversold by comparing the average closing uptrend and the average closing downtrend over a period of time.

When RSI is less than the low point (default 30), it means the market is oversold. When RSI is greater than the high point (default 70), it means the market is overbought.  

What this strategy does is that when RSI reaches the oversold zone, if the closing price is lower than the Bollinger Bands lower rail, a buy signal is generated. When RSI reaches the overbought zone, if the closing price is higher than Bollinger Bands upper rail, a sell signal is generated.

### Advantage Analysis

The biggest advantage of this combination strategy is that it can discover turning points in the market. When the stock price is in a relatively large area of ​​Bollinger Bands width, it means the market fluctuation is large. At this time, by judging whether the market is overbought or oversold through RSI, the timing of reversal can be located.

Another advantage is flexible parameter settings. Both Bollinger Bands and RSI indicators have adjustable parameters that traders can optimize based on their needs.

### Risk Analysis

The biggest risk of this strategy is the small number of signals generated. Especially in the long-term one-way trend market, it is prone to over-fitting. At this time, it is difficult for RSI to reach overbought and oversold status, unable to generate trading signals.  

Another risk is the difficulty in parameter settings. Bollinger Bands and RSI both need to set cycle and other parameters. Improper selection may lead to poor strategy results. This requires the trader to have a thorough understanding of the market, otherwise they should use the strategy with caution.

### Optimization Directions

In order to obtain more trading opportunities, the overbought and oversold lines of RSI can be appropriately adjusted. For example, the oversold line can be raised to 40 and the overbought line lowered to 60, so that signals can be formed more easily.

Another direction is to introduce a trend judgment mechanism to avoid blind reversal in one-way trend markets. For example, the direction of long cycle moving averages can be calculated as a filter condition. Signals are generated only when the moving average direction matches.  

### Summary 

The BB-RSI combination strategy uses Bollinger Bands to determine support and resistance, and RSI to determine overbought and oversold status, generating signals at reversal points. It can effectively identify turning points in the market and is a typical reversal trading strategy. Through parameter optimization and rule refinement, this strategy can become a powerful tool for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Precio base: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|Longitud|
|v_input_3|2|Desviación estándar|
|v_input_4_close|0|RSI Fuente: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|14|RSI Longitud|
|v_input_6|70|RSI Sobrecompra|
|v_input_7|30|RSI Sobrevendido|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-28 00:00:00
end: 2024-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © samuelarbos


//@version=4
strategy("Estrategia de Bandas de Bollinger y RSI", overlay=true)

// Definimos los parámetros de las bandas de Bollinger
source = input(close, title="Precio base")
length = input(20, minval=1, title="Longitud")
mult = input(2.0, minval=0.001, maxval=50, title="Desviación estándar")

// Calculamos las bandas de Bollinger
basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev

// Definimos el RSI y sus parámetros
rsi_source = input(close, title="RSI Fuente")
rsi_length = input(14, minval=1, title="RSI Longitud")
rsi_overbought = input(70, minval=0, maxval=100, title="RSI Sobrecompra")
rsi_oversold = input(30, minval=0, maxval=100, title="RSI Sobrevendido")

// Calculamos el RSI
rsi = rsi(rsi_source, rsi_length)

// Definimos las señales de compra y venta
buy_signal = crossover(close, lower) and rsi < rsi_oversold
sell_signal = crossunder(close, upper) and rsi > rsi_overbought

// Compramos cuando se da la señal de compra
if (buy_signal)
    strategy.entry("Buy", strategy.long)
    
// Vendemos cuando se da la señal de venta
if (sell_signal)
    strategy.entry("Sell", strategy.short)
```

> Detail

https://www.fmz.com/strategy/440982

> Last Modified

2024-02-04 15:09:35
