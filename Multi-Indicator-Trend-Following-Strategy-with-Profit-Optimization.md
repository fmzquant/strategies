
> Name

Multi-Indicator-Trend-Following-Strategy-with-Profit-Optimization

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f6535bf1dd1bc6c47b.png)

#### Overview
This strategy is a trend-following trading system that combines multiple technical indicators. It primarily uses the Parabolic SAR, Simple Moving Average (SMA), and Directional Movement Index (DMI) to determine market trends and entry points, while optimizing exits through percentage-based profit targets and MACD divergence. The core concept is to enter positions after confirming strong trends and exit when reaching preset profit targets or when trend reversal signals appear.

#### Strategy Principles
The strategy employs a multi-layered filtering mechanism:
1. Initial trading signals are captured through SAR crossovers
2. Overall trend direction is determined using a 50-period SMA
3. DMI indicator confirms trend strength and direction
4. Entry conditions require: price crossing above SAR, price above SMA, and bullish DMI
5. Dual exit mechanism: 3% target profit or MACD bearish crossover
6. ATR indicator for market volatility reference

#### Strategy Advantages
1. Multiple technical indicator cross-validation reduces false signals
2. Combination of trend following and momentum indicators improves success rate
3. Fixed percentage profit targets ensure consistent gains
4. MACD divergence exit mechanism prevents trend reversal drawdowns
5. Strategy parameters can be flexibly adjusted for different market characteristics
6. ATR monitoring provides market state reference

#### Strategy Risks
1. Multiple indicators may lead to signal lag
2. Fixed percentage profit targets might result in early exits during strong trends
3. Lack of stop-loss mechanism increases risk exposure
4. Excessive false signals may occur in ranging markets
5. DMI indicators may generate misleading signals in choppy markets

#### Optimization Directions
1. Implement adaptive stop-loss mechanism using ATR-based dynamic stops
2. Develop volatility filters to adjust position sizing during high volatility periods
3. Optimize MACD parameters for improved trend reversal detection
4. Add volume confirmation mechanism for enhanced signal reliability
5. Develop dynamic profit targets based on market volatility

#### Summary
This strategy builds a relatively complete trend-following trading system through the coordination of multiple technical indicators. Its strength lies in signal confirmation reliability and risk control flexibility. While there are inherent lag risks, the strategy maintains good practical value through parameter optimization and dynamic management mechanisms. Through continuous optimization and improvement, this strategy can serve as a robust trading tool.


> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-09 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Swing Trading Strategy with DMI", overlay=true)

// Define parameters
sarStart = input.float(0.02, title="SAR Start")
sarIncrement = input.float(0.02, title="SAR Increment")
sarMax = input.float(0.2, title="SAR Max")
atrLength = input.int(10, title="ATR Length")
macdShort = input.int(12, title="MACD Short Length")
macdLong = input.int(26, title="MACD Long Length")
macdSignal = input.int(9, title="MACD Signal Length")
smaLength = input.int(50, title="SMA Length")
dmiLength = input.int(14, title="DMI Length")
adxSmoothing = input.int(14, title="ADX Smoothing") // Smoothing period for ADX
targetProfitPercentage = input.float(3.0, title="Target Profit Percentage")

// Calculate SAR
sar = ta.sar(sarStart, sarIncrement, sarMax)

// Calculate ATR
atr = ta.atr(atrLength)

// Calculate MACD
[macdLine, macdSignalLine, _] = ta.macd(close, macdShort, macdLong, macdSignal)

// Calculate SMA
sma = ta.sma(close, smaLength)
bullishTrend = close > sma

// Calculate DMI
[plusDI, minusDI, adx] = ta.dmi(dmiLength, adxSmoothing) // Specify ADX smoothing period

// Determine if DMI is bullish
dmiBullish = plusDI > minusDI

// Define buy signal
buySignal = ta.crossover(close, sar) and bullishTrend and dmiBullish

// Track buy price and position state
var float buyPrice = na
var bool inPosition = false

// Enter position
if (buySignal and not inPosition)
    buyPrice := close
    inPosition := true
    strategy.entry("Buy", strategy.long)

// Define target price (3% above the buy price)
targetPrice = na(buyPrice) ? na : buyPrice * (1 + targetProfitPercentage / 100)

// Define MACD sell signal
macdSellSignal = ta.crossunder(macdLine, macdSignalLine)

// Define sell signal
sellSignal = inPosition and (close >= targetPrice or macdSellSignal)

// Exit position
if (sellSignal)
    inPosition := false
    strategy.exit("Sell", "Buy", limit=targetPrice)

// Plot SAR on the chart
plot(sar, color=color.red, style=plot.style_cross, linewidth=2)

// Plot SMA (optional, for visualizing the trend)
plot(sma, color=color.blue, title="SMA")

// Plot DMI +DI and -DI
plot(plusDI, color=color.green, title="+DI")
plot(minusDI, color=color.red, title="-DI")

// Plot buy signal on the chart
//plotshape(series=buySignal, location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")

// Plot sell signal on the chart
//plotshape(series=sellSignal, location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Optional: Plot background color for buy and sell signals
bgcolor(buySignal ? color.new(color.green, 90) : na, title="Buy Signal Background")
bgcolor(sellSignal ? color.new(color.red, 90) : na, title="Sell Signal Background")

```

> Detail

https://www.fmz.com/strategy/474707

> Last Modified

2024-12-11 17:22:57
