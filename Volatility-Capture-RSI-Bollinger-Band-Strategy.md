
> Name

Volatility-Capture-RSI-Bollinger-Band-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/e7b4a6654ecf776f0b.png)

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
