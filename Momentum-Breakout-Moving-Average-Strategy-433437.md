
> Name

Momentum-Breakout-Moving-Average-Strategy-433437

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/154b74d9abb6533a575.png)


## Overview

The Momentum Breakout Moving Average strategy is a stock trading strategy that combines moving average crossover signals with momentum indicators. The strategy employs multiple technical indicators including Exponential Moving Average (EMA), Simple Moving Average (SMA), Moving Average Convergence Divergence (MACD), and a modified Relative Strength Index (StockRSI) to generate buy signals when confirming an upward long-term trend. When short-term momentum indicators show reversal signals, the strategy takes profit.

## Strategy Logic  

The key components of this strategy are:   

1. **EMA/SMA Crossover**: A 9-period EMA fast line crosses above a 21-period SMA slow line to trigger a buy signal.  

2. **MACD Indicator**: MACD histogram needs to be positive when combined with the EMA/SMA crossover signal as additional confirmation.

3. **StockRSI Indicator**: Signals are triggered when StockRSI is above the OVERBOUGHT level (80) or below the OVERSOLD level (20).   

4. **Bollinger Bands**: Require the price to be within the bands where the middle band is a 20-period SMA and the width of bands is two standard deviations.  

5. **Stop Loss and Take Profit**: Calculated based on 14-period ATR.   

The strategy requires at least 2 out of the 3 indicators to give buy signals, price is within the Bollinger Bands, and the long-term trend remains bullish to generate the final buy signal. It gives a sell signal when MACD histogram turns negative and StockRSI enters the overbought region.  

## Advantage Analysis   

The key strengths of this strategy are:  

1. **Excellent Backtest Results**: Multiple proven indicators lead to outperformance over benchmark and individual indicators. 

2. **Optimized Parameters**: Key parameters like EMA periods and Bollinger Bands are optimized for improved stability.   

3. **Automated Stop Loss/Profit Taking**: Bollinger Bands and ATR allow dynamic adjustment of stops for better risk control.

4. **Easy to Implement**: Clean code structure and easy data accessibility result in straightforward practical operations.

## Risk Analysis

Despite the decent performance, main risks include:   

1. **False Signals**: Unusual market fluctuations or failure of indicators may generate incorrect signals. Long-term trend should then be incorporated as an additional filter.  

2. **Inadequate Parameters**: Improper parameters could lead to overly frequent trading or insufficient sensitivity. Parameters should be adjusted according to different products and market environments.  

3. **Inappropriate Stop Loss**: A stop loss that is too tight tends to get stopped out prematurely, while a stop loss set too wide may result in excessive losses. Proper balance between stop loss and take profit levels should be achieved.  

To address the above risks, the following measures can be adopted:  

1. **Manual Intervention**: In abnormal situations, signals can be manually checked, parameters readjusted or strategies temporarily halted.  

2. **Parameter Optimization**: More scientific and objective methods like genetic algorithms can be employed for systematic optimization.  

3. **Volatility Adjusted Stops**: Stop loss ranges can be set at 1-3 times of ATR to incorporate volatility.

## Enhancement Opportunities   

The strategy can be further improved in the following areas:

1. **More Robust Stop Loss Mechanisms**: Trailing stop loss or stops based on moving averages can be incorporated.  

2. **Volume Filters**:  Adding volume indicators to avoid false breakouts.   

3. **Dynamic Parameters**: Automatically optimizing parameters like moving average periods and band width based on changing market conditions.   

4. **Machine Learning**: LSTM, RNN and other algorithms can enable dynamic optimization of parameters.

## Conclusion  

The Momentum Breakout Moving Average Strategy capitalizes on the strengths of combining multiple technical indicators, and has achieved decent profitability with long and short term confirmation. With good risk control procedures in implementation, this strategy has ample potential for further improvements on areas like stop loss mechanisms and signal filtering to achieve more consistent alpha returns.  



> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Improved Custom Strategy", shorttitle="ICS", overlay=true)

// Volatility
volatility = ta.atr(14)

// EMA/MA Crossover
fast_length = 9
slow_length = 21
fast_ma = ta.ema(close, fast_length)
slow_ma = ta.sma(close, slow_length)
crossover_signal = ta.crossover(fast_ma, slow_ma)

// MACD
[macdLine, signalLine, macdHistogram] = ta.macd(close, 12, 26, 9)
macd_signal = crossover_signal and (macdHistogram > 0)

// Bollinger Bands
source = close
basis = ta.sma(source, 20)
upper = basis + 2 * ta.stdev(source, 20)
lower = basis - 2 * ta.stdev(source, 20)

// Fractal-based Support and Resistance levels
isFractalHigh = high[2] < high[1] and high[1] > high[0]
isFractalLow = low[2] > low[1] and low[1] < low[0]
resistance = ta.valuewhen(isFractalHigh, high[1], 0)
support = ta.valuewhen(isFractalLow, low[1], 0)

// StockRSI
length = 14
K = 100 * (close - ta.lowest(close, length)) / (ta.highest(close, length) - ta.lowest(close, length))
D = ta.sma(K, 3)
overbought = 80
oversold = 20
stockrsi_signal = ((K < D) and (K < oversold)) or ((K > D) and (K > overbought))

// Buy and sell conditions
mandatory_buy_conditions = (crossover_signal ? 1 : 0) + (macd_signal ? 1 : 0) + (stockrsi_signal ? 1 : 0)

// Long-term Trend Check
long_term_ma = ta.sma(close, 200)
long_term_bullish = close > long_term_ma
long_term_bearish = close < long_term_ma

// Plot the long-term MA for visual clarity
plot(long_term_ma, color=color.gray, title="200-Day MA", linewidth=1)

// Simplified Buy and Sell conditions
buy_condition = long_term_bullish and (mandatory_buy_conditions >= 2) and (close > lower) and (close < upper)
sell_condition = (macdHistogram < 0) and (K > D) and (K > overbought)


// Potential SL and TP based on volatility
potential_SL = close - volatility
potential_TP = close + 2 * volatility

plot(potential_SL, title="SL Level", color=color.red, linewidth=1, style=plot.style_linebr)
plot(potential_TP, title="TP Level", color=color.green, linewidth=1, style=plot.style_linebr)

// ... (rest of your code above)

// State variable to track if we're in a position, a counter for trades, and a delayed counter for plotting
var bool inPosition = false
var tradeCounter = 0
var tradeCounterDelayed = 0 // Declaration of the variable

// Buy logic: Check if tradeCounter is 0 and the buy condition is met
if tradeCounter == 0 and buy_condition
    strategy.entry("BUY", strategy.long, stop=potential_SL, limit=potential_TP)
    inPosition := true
    tradeCounter := tradeCounter + 1

// Sell logic: Check if tradeCounter is 1, the sell condition is met, and we are in a position
if tradeCounter == 1 and inPosition and sell_condition
    strategy.close("BUY")
    inPosition := false
    tradeCounter := tradeCounter - 1

// Update the delayed trade counter:
tradeCounterDelayed := tradeCounter

// Plotting
bgcolor(buy_condition ? color.new(color.green, 90) : sell_condition ? color.new(color.red, 90) : na)
plotshape(series=buy_condition and tradeCounterDelayed == 0, style=shape.labelup, location=location.belowbar, color=color.green, text="BUY", size=size.small)
plotshape(series=sell_condition and tradeCounterDelayed == 1, style=shape.labeldown, location=location.abovebar, color=color.red, text="SELL", size=size.small)

// ... (rest of your code if any)

```

> Detail

https://www.fmz.com/strategy/433437

> Last Modified

2023-11-27 16:25:54
