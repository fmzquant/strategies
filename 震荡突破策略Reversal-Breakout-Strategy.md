
> Name

震荡突破策略Reversal-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1238db321ac633adc6e.png)

## Overview

The reversal breakout strategy utilizes Bollinger Bands and Stochastic Oscillator to identify potential reversal points when an asset is overbought or oversold. It is suitable for intraday traders to capitalize on small price fluctuations for profits. The main idea is to look for trading opportunities when the price breaks out of the Bollinger Bands and Stochastic shows overbought/oversold signals.

## Strategy Logic

The strategy uses both Bollinger Bands and Stochastic as the main technical indicators. Bollinger Bands are plotted at standard deviation levels above and below a simple moving average. Prices reaching the upper band are considered overbought while lower band oversold. Stochastic Oscillator determines if prices have moved too far and are due for a reversal. Readings above 80 suggest overbought conditions while below 20 oversold. 

The trading rules are: go long when price breaks below the lower Bollinger band and Stochastic is below 20; go short when price breaks above the upper band and Stochastic is above 80. The stop loss is placed a few pips below the low (for longs) or above the high (for shorts). Take profit target is set at average price swing beyond recent bars.

The crossovers identify the band breakouts. Shape markers plot the entry signals. Stops and profit targets are defined after entry.

## Advantages

Combining bands for support/resistance and Stochastic for overbought/oversold improves signal quality vs. a single indicator. Reversal trading after band breakouts has potential for larger gains.

The tight stop loss helps limit losses. Take profit based on average true range aims for balanced reward/risk. High frequency trading captures small moves.

## Risks 

Band breakouts assume mean reversion which may fail. Stochastic lags price so some moves may be missed.

Small stops restrain the profit potential. Frequent trading needs strong psychology - avoiding over-stopping.

## Enhancements

Test longer Bollinger periods or confirm closes outside bands to improve quality.

Combine other indicators like MACD and KD with Stochastic for better overbought/oversold signals.

Consider dynamic stops based on volatility instead of fixed pips.

## Conclusion

The strategy seeks to identify reversals by combining Bollinger Bands for support/resistance and Stochastic for overbought/oversold conditions. Fine tuning parameters, controlling risk, and ongoing optimization are key for real-world performance. Transaction costs should be considered. Past performance is no guarantee of future results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Bollinger Bands Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|2|Multiplier|
|v_input_4|14|Stochastic Length|
|v_input_5|5|Stochastic %K Smoothing|
|v_input_6|3|Stochastic %D Smoothing|
|v_input_7|50|Take Profit (pips)|
|v_input_8|3|Stop Loss (pips)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-20 00:00:00
end: 2023-10-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Bollinger Bands & Stochastic Scalping Strategy", shorttitle="BB & Stoch Scalp", overlay=true)

// Bollinger Bands
length = input(20, title="Bollinger Bands Length")
src = input(close, title="Source")
mult = input(2, title="Multiplier")
basis = sma(src, length)
dev = mult * stdev(src, length)
upperBB = basis + dev
lowerBB = basis - dev

// Stochastic
stochLength = input(14, title="Stochastic Length")
smoothK = input(5, title="Stochastic %K Smoothing")
smoothD = input(3, title="Stochastic %D Smoothing")
k = sma(stoch(close, high, low, stochLength), smoothK)
d = sma(k, smoothD)

// Entry Conditions
longCondition = crossover(close, lowerBB) and crossover(k, 20)
shortCondition = crossunder(close, upperBB) and crossunder(k, 80)

// Exit Conditions
takeProfit = input(50, title="Take Profit (pips)")

plotshape(series=longCondition, title="Long Entry Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=shortCondition, title="Short Entry Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Stop Loss
stopLossPips = input(3, title="Stop Loss (pips)")
stopLossLong = close - stopLossPips * syminfo.mintick
stopLossShort = close + stopLossPips * syminfo.mintick

strategy.entry("Long", strategy.long, when=longCondition)
strategy.entry("Short", strategy.short, when=shortCondition)

strategy.exit("Take Profit/Stop Loss", from_entry="Long", profit=takeProfit, stop=stopLossLong)
strategy.exit("Take Profit/Stop Loss", from_entry="Short", profit=takeProfit, stop=stopLossShort)

plot(upperBB, title="Upper Bollinger Band", color=color.red)
plot(lowerBB, title="Lower Bollinger Band", color=color.green)

hline(80, "Overbought", color=color.red)
hline(20, "Oversold", color=color.green)

```

> Detail

https://www.fmz.com/strategy/430368

> Last Modified

2023-10-27 16:14:16
