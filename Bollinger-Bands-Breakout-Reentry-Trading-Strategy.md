
> Name

Bollinger-Bands-Breakout-Reentry-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dc331251141e495381.png)

## Overview
This strategy is based on the Bollinger Bands indicator. The main idea is to wait for the price to re-enter the Bollinger Bands after breaking out of the upper or lower band, and then establish a position in the same direction as the breakout at the re-entry point. The strategy takes advantage of the characteristic that prices often reverse when they are in extreme areas. By combining the conditions of Bollinger Band breakout and re-entry, it aims to capture market turning points and achieve a higher win rate.

## Strategy Principles
1. Calculate the middle, upper, and lower bands of the Bollinger Bands. The middle band is the moving average, and the upper and lower bands are the middle band plus or minus a certain number of standard deviations.
2. Determine if the price breaks out of the upper or lower Bollinger Band. If the closing price exceeds the upper band, it is considered an upward breakout; if the closing price falls below the lower band, it is considered a downward breakout.
3. If an upward breakout occurs, record the highest price of that breakout candle as the peak. If a downward breakout occurs, record the lowest price of that breakout candle as the peak. The peak is used to determine if the price has re-entered later.
4. After a breakout occurs, wait for the price to re-enter inside the Bollinger Bands. If the closing price is between the upper and lower bands at this time, the price is considered to have re-entered.
5. When the price re-enters, if the previous candle was an upward breakout (break_up\[1\] and inside), go long; if the previous candle was a downward breakout (break_down\[1\] and inside), go short.
6. Position management: If in a long position and the closing price crosses above the middle band, close the long position; if in a short position and the closing price crosses below the middle band, close the short position.

## Advantage Analysis
1. Bollinger Bands have strong adaptability and can dynamically adjust according to price fluctuations, which is helpful for capturing trends and volatility.
2. Compared to a simple Bollinger Band breakout strategy, adding the re-entry condition can avoid chasing highs and selling lows to a certain extent and improve entry quality.
3. The exit condition uses the middle band as a reference, which is simple and easy to use, and can protect profits relatively well.
4. The parameters of the Bollinger Bands, such as length and deviation multiplier, can be customized, providing high flexibility.

## Risk Analysis  
1. Improper selection of Bollinger Band parameters may lead to premature or late entries, affecting the strategy's performance. This can be mitigated by optimizing the parameters.
2. When the price oscillates near the Bollinger Bands, frequent opening and closing of positions may occur, resulting in increased transaction costs.
3. If the trend is very strong and the price does not re-enter the Bollinger Bands for a long time, trend profits may be missed.
4. Using the Bollinger Band indicator alone may not be effective for some instruments or market conditions, and it may need to be used in conjunction with other signals.

## Optimization Directions
1. Consider introducing more filtering conditions. For example, a breakout may be more reliable if the price has been running above the Bollinger Bands for a period of time, or use trend determination indicators such as MA angle and ADX for assistance.
2. For oscillating markets, limit orders and timers can be added to avoid blind entries.
3. For exits, ATR or moving averages can be further combined to control the exit timing.
4. Perform parameter optimization and characteristic analysis for different underlying assets and timeframes to select suitable trading targets and timeframes.  
5. Consider adding position management, such as increasing position size when volatility contracts and reducing position size when volatility expands.

## Summary
The Bollinger Bands Breakout Reentry Trading Strategy is a simple and practical quantitative trading strategy. It utilizes the reaction of prices to extreme situations and constructs entry and exit conditions through the Bollinger Bands tool, which can capture trend starting and ending points to a certain extent and control frequent trading. At the same time, this strategy also has issues such as parameter selection, poor performance in oscillating markets, and insufficient trend capture. Through optimization of details and combination with other signals, it is expected to further improve the adaptability and robustness of this strategy. 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_string_1|0|Basis MA Type: SMA|EMA|SMMA (RMA)|WMA|VWMA|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|1.7|StdDev|
|v_input_int_2|false|Offset|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-27 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(shorttitle="BB", title="Bollinger Bands", overlay=true)
length = input.int(20, minval=1)
maType = input.string("SMA", "Basis MA Type", options = ["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
src = input(close, title="Source")
mult = input.float(1.7, minval=0.001, maxval=50, title="StdDev")

ma(source, length, _type) =>
    switch _type
        "SMA" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

basis = ma(src, length, maType)
dev = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev
offset = input.int(0, "Offset", minval = -500, maxval = 500)
plot(basis, "Basis", color=#FF6D00, offset = offset)
p1 = plot(upper, "Upper", color=#2962FF, offset = offset)
p2 = plot(lower, "Lower", color=#2962FF, offset = offset)
fill(p1, p2, title = "Background", color=color.rgb(33, 150, 243, 95))

break_up = close > upper
break_down = close < lower
inside = close > lower and close < upper

sell_condition = break_up[1] and inside
buy_condition = break_down[1] and inside

// Conditions to close trades
close_sell_condition = close > basis
close_buy_condition = close < basis

trade_condition = sell_condition or buy_condition

// Tracking the high of the breakout candle
var float peak = na

if (not trade_condition)
    peak := close
if (break_up and peak < high)
    peak := high
if (break_down and peak > low)
    peak := low

// Entering positions
if (buy_condition)
    strategy.entry("Buy", strategy.long)
if (sell_condition)
    strategy.entry("Sell", strategy.short)

// Exiting positions when close crosses the basis
if (strategy.position_size > 0 and close_sell_condition) // If in a long position and close crosses above basis
    strategy.close("Buy")
if (strategy.position_size < 0 and close_buy_condition) // If in a short position and close crosses below basis
    strategy.close("Sell")
```

> Detail

https://www.fmz.com/strategy/443985

> Last Modified

2024-03-08 14:08:53
