
> Name

Bollinger-Bands-Crossover-Signal-Filtering-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16a8fd3e1f761dea5b3.png)

#### Overview
This is a trading strategy based on Bollinger Bands indicator that identifies market trends and generates trading signals through price crossovers with the bands. The strategy uses a 55-period moving average as the middle band and 1.0 standard deviation for calculating the upper and lower bands. The core concept is to determine long and short entry points through price breakouts of the Bollinger Bands.

#### Strategy Principles
The strategy operates on the following key components:
1. Bollinger Bands Calculation: Uses 55-period Simple Moving Average (SMA) as the middle band, with a standard deviation multiplier of 1.0 for upper and lower bands.
2. Signal Generation Logic:
   - Long signal generated when closing price breaks above the upper band
   - Short signal generated when closing price breaks below the lower band
3. Signal Confirmation Mechanism: Uses the barssince function to calculate periods since last breakout, comparing the period distance between long and short signals to determine final trading direction.
4. Visualization: Displays trading signals with triangle markers on the chart, using different colors for long and short positions.

#### Strategy Advantages
1. Clear Signals: Generates trading signals through definitive price crossovers with Bollinger Bands, avoiding ambiguous zones.
2. Trend Following: The strategy is essentially trend-following, capable of capturing good returns in strong market trends.
3. Visual Clarity: Trading signals are highly intuitive through color filling and shape markers.
4. Flexible Parameters: Bollinger Bands period and standard deviation multiplier can be adjusted for different market conditions.
5. Complete System: Includes comprehensive signal generation, visualization, and alert functions.

#### Strategy Risks
1. Choppy Market Risk: May generate frequent false signals in sideways, volatile markets.
2. Lag Risk: Due to the relatively long period (55) of moving average, signals may have some delay.
3. Reversal Risk: May suffer significant drawdowns during sudden trend reversals.
4. Parameter Sensitivity: Strategy performance is highly dependent on Bollinger Bands parameter selection.

#### Strategy Optimization Directions
1. Volume Confirmation: Add volume indicators as auxiliary conditions for signal confirmation.
2. Dynamic Parameter Optimization: Dynamically adjust the standard deviation multiplier based on market volatility.
3. Add Trend Filter: Incorporate longer-period trend indicators to filter false signals.
4. Improve Stop Loss Mechanism: Add trailing stop or fixed stop loss for better risk control.
5. Market State Classification: Add market state identification module to use different parameter settings under different market conditions.

#### Summary
This is a classic trend-following strategy based on Bollinger Bands, capturing market trends through price crossovers with the bands. The strategy design is clear and concise, featuring good visualization effects and signal generation mechanisms. While it may face challenges in choppy markets, the strategy's stability and reliability can be further enhanced through appropriate parameter optimization and additional auxiliary indicators. Thorough backtesting and parameter optimization are recommended before live trading.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-16 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Bollinger Bands Filter [Strategy]", overlay=true)

// -- INPUTS (kratke tooltipy, ziadne prelomenie riadku)
src    = input.source(close, title="Source", tooltip="Source for BB calc")
length = input.int(55, minval=1, title="SMA length", tooltip="Period for BB basis")
mult   = input.float(1.0, minval=0.1, maxval=5, title="Std Dev", tooltip="Std Dev multiplier")
CC     = input.bool(true, "Color Bars", tooltip="If true, color bars by BB logic")

// -- Bollinger calc
basis = ta.sma(src, length)
dev   = mult * ta.stdev(src, length)
upper = basis + dev
lower = basis - dev

// -- Long/Short logic
longCondition  = close > upper
shortCondition = close < lower

L1 = ta.barssince(longCondition)
S1 = ta.barssince(shortCondition)

longSignal  = L1 < S1 and not (L1 < S1)[1]
shortSignal = S1 < L1 and not (S1 < L1)[1]

// -- Plot signals
plotshape(shortSignal ? close : na, color=color.red, style=shape.triangledown, size=size.small, location=location.abovebar, title="Short Signal")
plotshape(longSignal  ? close : na, color=color.green, style=shape.triangleup,  size=size.small, location=location.belowbar, title="Long Signal")

// -- Plot BB lines
plot(upper, color=color.new(color.red,  40), title="Upper BB")
plot(lower, color=color.new(color.green,40), title="Lower BB")
plot(basis, color=color.new(color.blue, 10), title="Basis")

// -- Fill
fill(plot(na), plot(na)) // 'dummy' fill reset
fill(plot(upper, display=display.none), plot(basis, display=display.none), color=color.new(color.teal, 80))
fill(plot(lower, display=display.none), plot(basis, display=display.none), color=color.new(color.orange, 80))

// -- barcolor
bcol = close > upper ? color.lime : close < lower ? color.red : na
barcolor(CC ? bcol : na)

// -- Alerts
alertcondition(longSignal,  title="Long - BB",  message="BB Filter Long")
alertcondition(shortSignal, title="Short - BB", message="BB Filter Short")

// -- Strategy entries
if longSignal
    strategy.entry("Long", strategy.long)

if shortSignal
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/482443

> Last Modified

2025-02-18 14:47:16
