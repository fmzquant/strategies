
> Name

动态波幅捕捉RSI-布林带策略Volatility-Capture-RSI-Bollinger-Band-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e7b4a6654ecf776f0b.png)
[trans]
### 概述

动态波幅捕捉RSI-布林带策略是一种集成布林带(BB)、相对强弱指标(RSI)和简单移动平均线(SMA)理念的交易策略。该策略的独特之处在于,它根据收盘价在上轨和下轨之间计算出一个动态水平。这一独特功能使得该策略能够适应市场波动性和价格变动。

加密货币和股票市场高度波动,因此非常适合采用布林带策略。RSI能帮助识别这一常常投机性市场的超买超卖状况。  

### 策略原理

动态布林带:该策略首先根据用户定义的长度和乘数计算出上轨和下轨布林带。然后结合布林带和收盘价动态调整presentBollingBand的值。最后,当价格穿过present BollingBand时产生做多信号,当价格穿过present BollingBand时产生做空信号。

RSI:如果用户选择使用RSI产生信号,该策略还会计算RSI及其SMA,并使用它们产生额外的做多和做空信号。仅当“使用RSI产生信号”选项设置为true时,才使用基于RSI的信号。  

然后,该策略检查所选的交易方向,相应进入做多或做空头寸。如果交易方向设置为“双向”,则该策略可以同时进入做多和做空头寸。

最后,当收盘价穿过present BollingBand时平掉做多头寸;当收盘价穿过present BollingBand时平掉做空头寸。

### 优势分析

该策略结合布林带、RSI和SMA指标的优势,能够适应市场的波动性,动态捕捉波动,在超买超卖情况下产生交易信号。

RSI指标补充布林带交易信号,避免在震荡市场中错误入场。允许选择只做多、只做空或双向交易,适应不同市场条件。

参数可自定义,能够针对个人风险偏好进行调整。

### 风险分析

该策略依赖技术指标,无法应对基本面导致的重大转折。

布林带参数设置不当可能导致过于频繁或过于稀疏地产生交易信号。

双向交易风险加大,需要警惕反向做空亏损。

建议结合止损来控制风险。

### 优化方向 

1) 结合其他指标过滤信号,例如MACD。

2) 增加止损策略。

3) 优化布林带和RSI的参数。

4) 根据不同交易品种和周期调整参数。

5) 考虑实盘优化,调整参数以适应实际情况。

### 总结

动态波幅捕捉RSI-布林带策略是一种技术指标驱动的策略,结合布林带、RSI和SMA指标的优势,通过动态调整布林带来捕捉市场波动。该策略可自定义和优化空间大,但无法预测基本面变化。建议实盘验证效果,必要时调整参数或增加其他指标结合使用,降低风险。

||

### Overview

The Volatility Capture RSI-Bollinger Band strategy is a trading strategy that integrates the concepts of Bollinger Bands (BB), Relative Strength Index (RSI) and Simple Moving Average (SMA) to generate trading signals. The uniqueness of this strategy is that it calculates a dynamic level between the upper and lower Bollinger Bands based on the closing price. This unique feature allows the strategy to adapt to market volatility and price movements.

The crypto and stock markets are highly volatile, making them suitable for a strategy using Bollinger Bands. The RSI can help identify overbought or oversold conditions in these often speculative markets.

### How it Works  

Dynamic Bollinger Band: The strategy first calculates the upper and lower Bollinger Bands based on user-defined length and multiplier. It then uses the Bollinger Bands and closing price to dynamically adjust the presentBollingBand value. Finally, it generates a long signal when price crosses over the present Bolling Band and a short signal when price crosses under.

RSI: If the user chooses to use RSI for signals, the strategy also calculates the RSI and its SMA, and uses them to generate additional long and short signals. The RSI signals are only used if the ‘Use RSI for signals’ option is enabled.  

The strategy then checks the selected trade direction and enters long or short positions accordingly. If set to ‘Both’, it can enter both long and short positions.

Finally, the strategy exits a position when the close price crosses under/over the present Bolling Band for long/short positions respectively.  

### Advantage Analysis

The strategy combines the strengths of Bollinger Bands, RSI and SMA to adapt to market volatility, dynamically capture fluctuations and generate trading signals at overbought/oversold levels.

The RSI supplements Bollinger signals, avoiding false entries in ranging markets. Allowing long-only, short-only or both directions caters to different market conditions. 

Customizable parameters enable tuning based on individual risk preferences.

### Risk Analysis

The strategy relies on technical indicators and cannot anticipate fundamental-driven major reversals.

Improper Bollinger parameter settings may generate too frequent or too sparse signals. 

Two-way trading magnifies risk, beware of reverse short losses.

Using stops to control risk is recommended.

### Optimization Directions

1) Add other filters like MACD to filter signals.

2) Incorporate stop loss strategies.  

3) Optimize Bollinger and RSI parameters.

4) Adjust parameters for different products and timeframes.

5) Consider live tuning parameters to fit actual conditions.

### Summary

The Volatility Capture RSI-Bollinger strategy is a technical indicator-driven strategy, combining the strengths of Bollinger Bands, RSI and SMA by dynamically adjusting the Bollinger Bands to capture market fluctuations. The strategy allows high customizability and optimization but cannot predict fundamental changes. Real-trading verification and parameter tuning or adding other indicators to reduce risk when necessary are recommended.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_hlc3|0|(?presentBollingBand)Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_int_1|50|lengthParam|
|v_input_float_1|2.7183|Multiplier|
|v_input_bool_1|true|Use RSI for signals|
|v_input_int_2|10|RSI Period|
|v_input_int_3|5|SMA Period|
|v_input_float_2|55|Bought Range Level|
|v_input_float_3|50|Sold Range Level|
|v_input_string_1|0|Trade Direction: Both|Short|Long|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-23 00:00:00
end: 2023-11-30 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © PresentTrading

//@version=5
// Define the strategy settings
strategy('Volatility Capture RSI-Bollinger - Strategy [presentTrading]', overlay=true)

// Define the input parameters for the indicator
priceSource  = input.source(title='Source', defval=hlc3, group='presentBollingBand') // The price source to use
lengthParam   = input.int(50, 'lengthParam', minval=1, group='presentBollingBand') // The length of the moving average
multiplier = input.float(2.7183, 'Multiplier', minval=0.1, step=.1, group='presentBollingBand') // The multiplier for the ATR
useRSI = input.bool(true, 'Use RSI for signals', group='presentBollingBand') // Boolean input to decide whether to use RSI for signals
rsiPeriod = input.int(10, 'RSI Period', minval=1, group='presentBollingBand') // The period for the RSI calculation
smaPeriod = input.int(5, 'SMA Period', minval=1, group='presentBollingBand') // The period for the SMA calculation
boughtRange = input.float(55, 'Bought Range Level', minval=1, group='presentBollingBand') // The level for the bought range
soldRange = input.float(50, 'Sold Range Level', minval=1, group='presentBollingBand') // The level for the sold range

// Add a parameter for choosing Long or Short
tradeDirection = input.string("Both", "Trade Direction", options=["Long", "Short", "Both"], group='presentBollingBand') // Dropdown input for trade direction

// Calculate the bollingerBand
barIndex = bar_index // The current bar index
upperBollingerBand = ta.sma(high, lengthParam) + ta.stdev(high, lengthParam) * multiplier // Calculate the upper Bollinger Band
lowerBollingerBand = ta.sma(low, lengthParam) - ta.stdev(low, lengthParam) * multiplier // Calculate the lower Bollinger Band

var float presentBollingBand = na // Initialize the presentBollingBand variable
crossCount = 0 // Initialize the crossCount variable

// Calculate the buy and sell signals
longSignal1 = ta.crossover(priceSource, presentBollingBand) // Calculate the long signal
shortSignal1 = ta.crossunder(priceSource, presentBollingBand) // Calculate the short signal

// Calculate the RSI
rsiValue = ta.rsi(priceSource, rsiPeriod) // Calculate the RSI value
rsiSmaValue = ta.sma(rsiValue, smaPeriod) // Calculate the SMA of the RSI value

// Calculate the buy and sell signals
longSignal2 = rsiSmaValue > boughtRange // Calculate the long signal based on the RSI SMA
shortSignal2 = rsiSmaValue < soldRange // Calculate the short signal based on the RSI SMA

presentBollingBand := na(lowerBollingerBand) or na(upperBollingerBand)?0.0 : close>presentBollingBand?math.max(presentBollingBand,lowerBollingerBand) : close<presentBollingBand?math.min(presentBollingBand,upperBollingerBand) : 0.0


if (tradeDirection == "Long" or tradeDirection == "Both") and longSignal1 and (useRSI ? longSignal2 : true) // Use RSI for signals if useRSI is true
    presentBollingBand := lowerBollingerBand // If the trade direction is "Long" or "Both", and the long signal is true, and either useRSI is false or the long signal based on RSI is true, then assign the lowerBollingerBand to the presentBollingBand.
    strategy.entry("Long", strategy.long) // Enter a long position.

if (tradeDirection == "Short" or tradeDirection == "Both") and shortSignal1 and (useRSI ? shortSignal2 : true) // Use RSI for signals if useRSI is true
    presentBollingBand := upperBollingerBand // If the trade direction is "Short" or "Both", and the short signal is true, and either useRSI is false or the short signal based on RSI is true, then assign the upperBollingerBand to the presentBollingBand.
    strategy.entry("Short", strategy.short) // Enter a short position.

// Exit condition
if (strategy.position_size > 0 and ta.crossunder(close, presentBollingBand)) // If the strategy has a long position and the close price crosses under the presentBollingBand, then close the long position.
    strategy.close("Long")
if (strategy.position_size < 0 and ta.crossover(close, presentBollingBand)) // If the strategy has a short position and the close price crosses over the presentBollingBand, then close the short position.
    strategy.close("Short")

//~~ Plot
plot(presentBollingBand,"presentBollingBand", color=color.blue) // Plot the presentBollingBand on the chart.
```

> Detail

https://www.fmz.com/strategy/433912

> Last Modified

2023-12-01 14:17:55
