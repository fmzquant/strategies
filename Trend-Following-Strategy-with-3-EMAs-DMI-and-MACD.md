
> Name

Trend-Following-Strategy-with-3-EMAs-DMI-and-MACD

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13cf8cb43a9c9231a1c.png)

## Overview

This is a trend-following strategy that combines three exponential moving averages (EMAs), the Directional Movement Index (DMI), and the Moving Average Convergence Divergence (MACD) indicator to determine trend direction and generate buy and sell signals. The key components are EMA crossover signals, DMI-based trend-strength confirmation, and MACD-based momentum confirmation.

## Strategy Logic

The core logic relies on three EMAs calculated on the M5 timeframe — 34, 89, and 200 — to identify the overall trend. The 34-period EMA provides near-term direction, while the 89-period and 200-period EMAs define the medium- and long-term trend.

A buy signal is triggered when:
- The closing price crosses above the 34 EMA
- +DI (bullish directional movement) is greater than 17
- ADX (trend strength) is greater than -DI

A sell signal is triggered when:
- The closing price crosses below the 34 EMA
- -DI (bearish directional movement) is greater than 17
- ADX is greater than +DI

The MACD indicator provides additional confirmation before entry.

## Advantages

This strategy has several key advantages:

1. It can capture trend shifts early through short-term EMA crossovers.
2. Multiple EMAs help judge trend strength across different time horizons.
3. The DMI filter helps avoid false signals by requiring strong directional movement.
4. MACD adds momentum confirmation and improves the quality and probability of trade opportunities.
5. Combining these indicators improves entry accuracy and timing.

## Risks

Main risks to consider:

1. Relying on EMA crossovers alone can still produce misleading or mistimed signals.
2. Multiple confirmations can delay signal generation.
3. Sudden trend reversals can still hurt performance.

Possible mitigations:
- Use appropriate stop-loss and position-management rules
- Optimize EMA parameters for current market conditions
- Observe raw price action for visual confirmation

## Optimization Directions

Possible areas for improvement:

1. Add indicators such as RSI to judge overbought and oversold conditions.
2. Combine volume analysis to produce stronger signals.
3. Optimize indicators and parameters for different assets and timeframes.
4. Apply machine-learning methods to adapt continuously to new market data.

## Summary

Overall, this is a strong trend-following framework that combines several simple but practical indicators to trade with the prevailing trend. The three-EMA structure identifies multi-timeframe trend conditions, while DMI and MACD improve entry timing and profit probability. With proper optimization and risk management, it can become an effective tool for trend traders.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|DI Length|
|v_input_2|12|Fast Length|
|v_input_3|26|Slow Length|
|v_input_4|9|Signal Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-18 00:00:00
end: 2024-01-24 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("2 EMA di+ Buy Sell, strategy ", overlay=true)

// Define the EMA calculation function
ema(src, length) =>
    ta.ema(src, length)

// Calculate and plot EMA on M5
ema34_M5 = ema(close, 34)
ema89_M5 = ema(close, 89)
ema200_M5 = ema(close, 200)

// Plot EMAs
plot(ema34_M5, color=color.green, title="EMA 34 M5", linewidth=2)
plot(ema89_M5, color=color.blue, title="EMA 89 M5", linewidth=2)
plot(ema200_M5, color=color.black, title="EMA 200 M5", linewidth=2)

// Define DMI parameters
len = input(14, title="DI Length")
up = ta.change(high)
down = -ta.change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
trur = ta.rma(ta.tr, len)
plusDI = 100 * ta.rma(plusDM, len) / trur
minusDI = 100 * ta.rma(minusDM, len) / trur

// Calculate ADX
adxValue = 100 * ta.rma(math.abs(plusDI - minusDI) / (plusDI + minusDI == 0 ? 1 : plusDI + minusDI), len)

// Define MACD parameters
fastLength = input(12, title="Fast Length")
slowLength = input(26, title="Slow Length")
signalLength = input(9, title="Signal Length")

// Calculate MACD
[macdLine, signalLine, _] = ta.macd(close, fastLength, slowLength, signalLength)

// Create buy/sell conditions
buyCondition = close > ema34_M5 and plusDI > 17 and adxValue > minusDI 
sellCondition = close < ema34_M5 and minusDI > 17 and adxValue > plusDI 

// Strategy logic
strategy.entry("Buy", strategy.long, when = buyCondition)
strategy.entry("Sell", strategy.short, when = sellCondition)

// Create alerts for buy/sell signals
alertcondition(buyCondition, title="Buy Signal", message="Buy Signal")
alertcondition(sellCondition, title="Sell Signal", message="Sell Signal")

// Plot buy/sell arrows on the price chart
bgcolor(buyCondition ? color.new(color.green, 90) : sellCondition ? color.new(color.red, 90) : na)

plotarrow(buyCondition ? 1 : sellCondition ? -1 : na, colorup=color.new(color.green, 0), colordown=color.new(color.red, 0), offset=-1)

```

> Detail

https://www.fmz.com/strategy/439991

> Last Modified

2024-01-25 15:48:59
