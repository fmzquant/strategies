
> Name

Adaptive-Mean-Reversion-Trading-Strategy-Based-on-Chande-Momentum-Oscillator

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ef5fef3349f30ba268.png)

#### Overview
The Mean-Reversion Trading Strategy based on the Chande Momentum Oscillator (CMO) is a technical analysis strategy that identifies overbought and oversold zones by calculating price momentum over a specific period. The strategy monitors momentum changes in asset prices and trades when prices show extreme deviations, aiming to capture mean-reversion opportunities. It uses a 9-day CMO indicator as the core signal, entering long positions when CMO falls below -50 and exiting when CMO rises above 50 or the holding period exceeds 5 days.

#### Strategy Principle
The core of the strategy lies in the calculation and application of the CMO indicator. CMO measures momentum by computing the ratio of the difference between gains and losses to their sum over a specified period. The formula is:
CMO = 100 × (Sum of Gains - Sum of Losses)/(Sum of Gains + Sum of Losses)

Unlike traditional RSI, CMO uses both up and down movements in the numerator, providing a more symmetrical momentum measurement. The strategy enters long positions when CMO falls below -50, indicating oversold conditions and expecting price recovery. Positions are closed when CMO rises above 50 or after holding for 5 days.

#### Strategy Advantages
1. Clear Signals - CMO provides definitive overbought and oversold criteria, generating unambiguous trading signals
2. Robust Risk Control - Maximum holding period prevents long-term position trapping
3. High Adaptability - Parameters can be adjusted for different market conditions
4. Solid Theoretical Foundation - Based on well-established mean-reversion theory with academic support
5. Simple Calculation - Indicator methodology is straightforward and easy to understand

#### Strategy Risks
1. Trend Market Risk - Mean-reversion strategies may suffer frequent losses in strong trending markets
2. Parameter Sensitivity - Strategy performance heavily depends on CMO period and threshold selection
3. False Signal Risk - Volatile markets may generate false signals
4. Time Risk - Fixed exit timing might miss better profit opportunities
5. Slippage Risk - May face significant slippage in low liquidity markets

#### Optimization Directions
1. Trend Filtering - Add long-term trend indicators to trade only with the trend
2. Dynamic Parameter Optimization - Adjust CMO period and thresholds based on market volatility
3. Enhanced Stop-Loss - Implement dynamic stop-loss to protect profits
4. Holding Period Optimization - Dynamically adjust maximum holding time based on volatility
5. Volume Confirmation - Incorporate volume indicators to improve signal reliability

#### Summary
The strategy captures market overbought and oversold opportunities through the CMO indicator, combining fixed-time stop-loss to build a robust mean-reversion trading system. It features clear logic and reasonable risk control with practical value. The strategy's stability and profitability can be further enhanced through parameter optimization and additional auxiliary indicators.



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
strategy("Chande Momentum Oscillator Strategy", overlay=false)

// Input for the CMO period
cmoPeriod = input.int(9, minval=1, title="CMO Period")

// Calculate price changes
priceChange = ta.change(close)

// Separate positive and negative changes
up = priceChange > 0 ? priceChange : 0
down = priceChange < 0 ? -priceChange : 0

// Calculate the sum of ups and downs using a rolling window
sumUp = ta.sma(up, cmoPeriod) * cmoPeriod
sumDown = ta.sma(down, cmoPeriod) * cmoPeriod

// Calculate the Chande Momentum Oscillator (CMO)
cmo = 100 * (sumUp - sumDown) / (sumUp + sumDown)

// Define the entry and exit conditions
buyCondition = cmo < -50
sellCondition1 = cmo > 50
sellCondition2 = ta.barssince(buyCondition) >= 5

// Track if we are in a long position
var bool inTrade = false

if (buyCondition and not inTrade)
    strategy.entry("Long", strategy.long)
    inTrade := true

if (sellCondition1 or sellCondition2)
    strategy.close("Long")
    inTrade := false

// Plot the Chande Momentum Oscillator
plot(cmo, title="Chande Momentum Oscillator", color=color.blue)
hline(-50, "Buy Threshold", color=color.green)
hline(50, "Sell Threshold", color=color.red)

```

> Detail

https://www.fmz.com/strategy/474705

> Last Modified

2024-12-11 17:17:50
