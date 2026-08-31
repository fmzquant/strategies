
> Name

Trading-Strategy-Based-on-RSI-and-MACD-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17b5ef4a8007d5c51f5.png)
 

## Overview

This strategy combines the Relative Strength Index (RSI) and Moving Average Convergence Divergence (MACD) indicators to identify trading opportunities for BTC. It goes long when RSI is below 30 and MACD line is below signal line and MACD Histogram is less than -100; it goes short when RSI is above 80 and MACD line is above signal line and MACD Histogram is greater than 250. The strategy also uses a trailing stop loss to lock in profits.

## Strategy Logic

1. Use the RSI indicator to determine if the market is oversold or overbought. RSI below 30 is viewed as an oversold signal, while above 80 is viewed as an overbought signal.

2. Use the MACD indicator's MACD line and signal line crossovers to determine entries and exits. When the MACD line crosses above the signal line, it is a buy signal; when the MACD line crosses below the signal line, it is a sell signal.

3. Combine the signals from RSI and MACD indicators to form the entry rules for this strategy.  

4. Use a trailing stop loss to lock in profits. The trailing stop loss updates dynamically based on profit/loss of an open position, allowing effective risk control.

## Advantage Analysis  

1. Combining RSI and MACD indicators helps filter out false signals effectively.

2. RSI is good at detecting overbought/oversold market conditions. MACD captures trend changes well. Using both creates a strong strategy.   

3. Trailing stop loss locks in profits according to live market movements, controlling risk.

4. The strategy has few parameters and is easy to implement.

## Risk Analysis

1. Single instrument risk from trading only BTC.

2. RSI may generate false signals during range-bound and bottom-reversal scenarios. MACD oscillators can also provide erroneous signals in choppy markets.

3. Trailing stop loss could be hit hard during huge market swings, failing to control risk.

4. Poor parameter tuning may lead to overtrading or missed trades.

## Enhancement Opportunities 

1. Consider adding other indicators like Bollinger Bands, KD etc. to supplement trade signals.

2. Study inter-market correlation between different instruments, build multi-pair mean reversion strategies.

3. Optimize stop loss mechanisms e.g. timely stop loss, average stop loss etc.  

4. Incorporate machine learning for smart parameter optimization.

## Summary

This is a trend-following strategy based on RSI and MACD indicators to determine overbought/oversold scenarios. It combines the strengths of technical indicators well to capture trend changes in the market. Meanwhile, the strategy logic is simple and easy to implement. Further optimizations can expand its applications.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSI Period|
|v_input_2|12|MACD Short Period|
|v_input_3|26|MACD Long Period|
|v_input_4|9|MACD Signal Period|
|v_input_float_1|2.5|Trailing Stop Loss Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-24 00:00:00
end: 2024-01-30 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("BTC/USDT RSI and MACD Strategy", overlay = true)

// Define the RSI period
rsiPeriod = input(14, "RSI Period")

// Calculate the RSI
rsi = ta.rsi(close, rsiPeriod)

// Define the MACD parameters
macdShort = input(12, "MACD Short Period")
macdLong = input(26, "MACD Long Period")
macdSignal = input(9, "MACD Signal Period")

// Calculate the MACD
[macdLine, signalLine, _] = ta.macd(close, macdShort, macdLong, macdSignal)

// Define the trailing stop level
trailing_stop_loss_factor = input.float(2.50, "Trailing Stop Loss Factor", step = 0.01)

// Define the entry and exit conditions
enterLong = ta.crossover(rsi, 30) and macdLine < signalLine and macdLine < -100
enterShort = ta.crossunder(rsi, 83) and macdLine > signalLine and macdLine > 250

// Submit the orders
if (enterLong)
    strategy.entry("Long", strategy.long)
if (enterShort)
    strategy.entry("Short", strategy.short)

// Trailing Stop Loss
longTrailingStopLoss = strategy.position_avg_price * (1 - trailing_stop_loss_factor / 100)
shortTrailingStopLoss = strategy.position_avg_price * (1 + trailing_stop_loss_factor / 100)
if strategy.position_size > 0 
    strategy.exit("Exit Long", "Long", stop  = longTrailingStopLoss)
if strategy.position_size < 0 
    strategy.exit("Exit Short", "Short", stop = shortTrailingStopLoss)

// Plot the indicators
plot(rsi, "RSI", color=color.blue)
hline(20, "RSI Lower Level", color=color.green)
hline(80, "RSI Upper Level", color=color.red)
plot(macdLine - signalLine, "MACD Histogram", color=color.red, style=plot.style_histogram)
hline(0, "Zero", color=color.gray)
```

> Detail

https://www.fmz.com/strategy/440551

> Last Modified

2024-01-31 16:07:31
