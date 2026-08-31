
> Name

Multi-Indicator-Trend-Momentum-ATR-Target-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8160ba92addb81ce155.png)
![IMG](https://www.fmz.com/upload/asset/2d88e785a5a122666e960.png)

#### Overview
This strategy is a multi-technical indicator-based trend following and momentum trading system. It combines the Average Directional Index (ADX), Relative Strength Index (RSI), and Average True Range (ATR) to identify potential long opportunities and uses ATR for dynamic profit and stop-loss levels. The strategy is particularly suitable for 1-minute timeframe options trading, utilizing strict entry conditions and risk management to improve trading success rate.

#### Strategy Principle
The core logic includes several key components:
1. Trend Confirmation: Uses ADX>18 and +DI greater than -DI to confirm an upward trend.
2. Momentum Verification: Requires RSI to break above 60 and stay above its 20-period moving average to verify price momentum.
3. Entry Timing: Establishes long positions at current closing price when both trend and momentum conditions are met.
4. Target Management: Sets dynamic profit targets (2.5x ATR) and stop-loss levels (1.5x ATR) based on ATR at entry.

#### Strategy Advantages
1. Multi-dimensional Confirmation: Combines trend and momentum indicators for more reliable trading signals.
2. Dynamic Risk Management: Uses ATR to dynamically adjust profit and stop-loss levels, adapting to market volatility changes.
3. Clear Trading Rules: Specific entry and exit conditions reduce subjective judgment interference.
4. High Adaptability: Strategy parameters can be optimized for different market environments and trading instruments.

#### Strategy Risks
1. False Breakout Risk: RSI breaking above 60 may generate false signals, requiring validation from other indicators.
2. Slippage Impact: May face significant slippage risk in fast-moving 1-minute markets.
3. Market Environment Dependency: Strategy performs better in trending markets, may trigger frequent stops in ranging markets.
4. Parameter Sensitivity: Multiple indicator parameters need balanced configuration, improper combinations may affect strategy performance.

#### Strategy Optimization Directions
1. Entry Optimization: Can add volume confirmation mechanism to improve signal reliability.
2. Position Management: Introduce dynamic position sizing system based on market volatility.
3. Exit Mechanism: Consider adding trailing stop functionality for better profit protection.
4. Time Filtering: Add trading time window filters to avoid periods of excessive volatility or insufficient liquidity.

#### Summary
This strategy constructs a complete trading system by comprehensively utilizing multiple technical indicators. Its strength lies in combining trend and momentum analysis with dynamic risk management methods. While certain risks exist, stable performance can be achieved through proper parameter optimization and risk control measures. Traders are advised to thoroughly backtest and optimize parameters before live trading, and make appropriate adjustments based on specific trading instrument characteristics.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SPcuttack

//@version=6
strategy("ADX & RSI Strategy with ATR Targets", overlay=true)

// Input parameters
adxLength = input.int(14, title="ADX Length")
adxSmoothing = input.int(14, title="ADX Smoothing")
rsiLength = input.int(14, title="RSI Length")
rsiSmaLength = input.int(20, title="RSI SMA Length")
atrLength = input.int(14, title="ATR Length")
atrMultiplierTarget = input.float(2.5, title="ATR Multiplier for Target")
atrMultiplierStop = input.float(1.5, title="ATR Multiplier for Stop Loss")

// ADX and DMI calculations
[adx, plusDI, minusDI] = ta.dmi(adxLength, adxSmoothing)

// RSI calculations
rsi = ta.rsi(close, rsiLength)
rsiSma = ta.sma(rsi, rsiSmaLength)

// ATR calculation
atr = ta.atr(atrLength)

// Slope calculations (difference from the previous value)
adxSlope = adx - adx[1]
rsiSlope = rsi - rsi[1]

// Entry conditions
adxCondition = adx > 18 and plusDI > minusDI and adxSlope > 0
rsiCondition = rsi > rsiSma and rsiSlope > 0
rsiCross60 = ta.crossover(rsi, 60)

// Global variable for long entry
var bool longEntry = false
if (adxCondition and rsiCondition and rsiCross60)
    longEntry := true
else
    longEntry := false

// Variables for target and stop loss levels
var float entryPrice = na
var float targetLevel = na
var float stopLossLevel = na

// Strategy actions
if (longEntry)
    entryPrice := close
    targetLevel := entryPrice + atr * atrMultiplierTarget
    stopLossLevel := entryPrice - atr * atrMultiplierStop
    strategy.entry("Long", strategy.long)

if (strategy.position_size > 0)
    if (close >= targetLevel)
        strategy.close("Long", comment="Tgt Hit")
    if (close <= stopLossLevel)
        strategy.close("Long", comment="SL Hit")

// Ensure lines plot on the chart body
targetLine = strategy.position_size > 0 ? targetLevel : na
stopLossLine = strategy.position_size > 0 ? stopLossLevel : na

plot(targetLine, title="Target Level", color=color.green, linewidth=2, offset=0)
plot(stopLossLine, title="Stop Loss Level", color=color.red, linewidth=2, offset=0)

// Add entry price for reference
plot(strategy.position_size > 0 ? entryPrice : na, title="Entry Price", color=color.blue, linewidth=1, style=plot.style_cross, offset=0)
```

> Detail

https://www.fmz.com/strategy/482773

> Last Modified

2025-02-27 17:51:29
