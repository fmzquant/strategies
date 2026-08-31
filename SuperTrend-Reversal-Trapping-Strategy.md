
> Name

SuperTrend-Reversal-Trapping-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

This strategy uses the SuperTrend indicator to determine the current trend direction, and generates trading signals based on trapping candlestick patterns. It belongs to trend following strategies. When a trapping candle opposite to the SuperTrend direction forms, it signals a potential trend reversal. The strategy aims to capitalize on the reversal opportunity.

## Strategy Logic

The strategy first calculates the SuperTrend indicator to determine the current trend, with green for uptrend and red for downtrend. It then checks if the candlestick forms a trapping pattern, which requires: 1) the candle is opposite to the SuperTrend direction, 2) the candle is strong (big bullish or close is not diverging), 3) the candle has increasing volume. When all three conditions are met, it signals a likely trend reversal. The strategy goes long at the top of the trapping candle and goes short at the bottom. The stop loss is placed at the opposite side of the trapping candle or recent swing high/low.

Specifically, the SuperTrend is calculated based on 10-period ATR. It then checks if the current candle is opposite to the SuperTrend direction, and its VOLUME is larger than previous candle, or three consecutive candles with same CLOSE direction but decreasing VOLUME. If the criteria are met, it signals reversal and enters long at candle high and enters short at candle low. The stop loss is placed at the opening price direction of the trapping candle. 

The strategy identifies the overall trend with SuperTrend and enters on potential reversal points marked by trapping candles, with the profit target coming from the subsequent trend move.

## Advantage Analysis

- Combine trend and pattern for higher accuracy

SuperTrend determines overall trend, trapping candle signals reversal chance. Combining trend and pattern improves accuracy.

- Trapping candle adds entry confirmation, avoiding false breakout

The strong momentum and increasing volume of trapping candle avoids false signals from noise. The confirmation prevents chasing tops and bottoms.

- Simple and clear logic, easy to implement

With SuperTrend and trapping candle as the core, the strategy is very minimalist, with few parameters and easy to implement.

- Reasonable stop loss setups control risk

The stop loss at trapping candle price allows quick exit and also suits the position post-reversal.

## Risk Analysis

- SuperTrend lags in catching trend reversal

SuperTrend has some lag in detecting trend reversal, thus may miss the best entry timing.

- Failed reversal can amplify losses

Reversal signals are not 100% reliable. Failed reversals can magnify losses.

- Need to identify proper trapping patterns

The optimal trapping pattern may vary between products and timeframes. Requires testing for best parameters per situation.

- Day and night patterns differ

Trading characteristics differ between day and night sessions. Separate parameter optimization is needed.

## Improvement Directions

- Parameter optimization for day and night differences

For example, optimize trapping candle volume increase level separately for day and night.

- Optimize SuperTrend parameters  

Test different ATR periods to find optimal SuperTrend parameters and signals for each product.

- Add more filters for entry

Incorporate additional indicators like MACD, KDJ to improve reversal judgment accuracy.

- Add stop loss mechanisms

Such as re-setting stop loss after reversals, percentage stop loss etc to control risk.

## Summary

This strategy combines SuperTrend and trapping candle patterns to enter on perceived trend reversals. The core idea is simple and clear. But there is room to further improve signal accuracy by comprehensive optimizations across aspects like overall trend, session differences, stop loss etc, to enhance stability. With iterative optimization, it can become a powerful tool for active traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|10|ATR Length|
|v_input_int_2|2|Factor|
|v_input_float_1|0.003|Candle Height|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-09-24 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SuperTrend Trapping Candle Strategy", shorttitle="ST", margin_long=1, margin_short=1, overlay=true)


// Inputs
atrPeriod = input.int(10, "ATR Length")
factor = input.int(2, "Factor")
candleDivider = input.float(0.003, "Candle Height", step=0.0001)


// Supertrend
[supertrend, direction] = ta.supertrend(factor, atrPeriod)
plot(direction < 0 ? supertrend : na, "Up Trend", color = color.green, style=plot.style_linebr)
plot(direction < 0? na : supertrend, "Down Trend", color = color.red, style=plot.style_linebr)


//Trapping canlde
isUptrend = direction < 0
isDowntrend = direction > 0
isBullsStrengthDecreasing = volume < volume[1] and volume[1] < volume[2] and close > close[1] and close[1] > close[2] and open > open[1] and open[1] > open[2]
isBearsStrengthDecreasing = volume < volume[1] and volume[1] < volume[2] and close < close[1] and close[1] < close[2] and open < open[1] and open[1] < open[2]
isStrongVolume = (volume > volume[1]) or isBullsStrengthDecreasing or isBearsStrengthDecreasing
isSmallCandle = (high - low) < close * candleDivider
isUptrendTrapping = isUptrend and close < open and isStrongVolume and isSmallCandle
isDowntrendTrapping = isDowntrend and close > open and isStrongVolume and isSmallCandle

plotshape(isUptrendTrapping, style=shape.triangleup, location=location.belowbar, color=color.green)
plotshape(isDowntrendTrapping, style=shape.triangledown, location=location.abovebar, color=color.orange)


// Signals
longCondition = isUptrendTrapping
if (longCondition)
    strategy.entry("Long", strategy.long)


shortCondition = isDowntrendTrapping
if (shortCondition)
    strategy.entry("Short", strategy.short)

if open < close
    alert("Seller Trapped.", alert.freq_all)
if close > open
    alert("Buyer Trapped.", alert.freq_all)


```

> Detail

https://www.fmz.com/strategy/427820

> Last Modified

2023-09-25 17:58:05
