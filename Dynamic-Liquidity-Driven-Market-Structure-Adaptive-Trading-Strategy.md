
> Name

Dynamic-Liquidity-Driven-Market-Structure-Adaptive-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8c71e1627871b0b84f3.png)
![IMG](https://www.fmz.com/upload/asset/2d80547cd62500a403308.png)



#### Overview

This is an innovative trading strategy that combines liquidity zone analysis with dynamic internal market structure, aiming to identify high-probability entry points. By tracking price interactions with key market levels and utilizing internal market shifts to trigger trades, the strategy provides traders with a flexible and precise market entry approach.

#### Strategy Principles

The core logic is based on two key components: liquidity zone identification and internal market shifts. Liquidity zones are dynamically determined by analyzing local highs and lows, while internal market shifts are judged by price breakouts of previous bullish or bearish levels.

The strategy features the following core characteristics:
1. Internal Market Shift Logic: Relies on price breakouts of key levels rather than traditional candlestick patterns
2. Liquidity Zone Tracking: Dynamically identifies key liquidity zones to prevent trading in weak market conditions
3. Mode Flexibility: Offers three trading modes - "Both", "Bullish Only", and "Bearish Only"
4. Risk Management: Customizable stop-loss and take-profit levels
5. Time Range Control: Precise control of trading time periods

#### Strategy Advantages

1. Dynamic Adaptability: Quickly responds to market structure changes
2. Precise Entry: Enhances entry accuracy by combining liquidity zones and internal market shifts
3. Controllable Risk: Built-in stop-loss and take-profit mechanisms
4. High Flexibility: Can choose trading modes based on different market conditions
5. Multi-Dimensional Analysis: Simultaneously considers price behavior, liquidity, and market structure

#### Strategy Risks

1. Extreme market volatility may trigger stop-losses
2. Frequent signals in range-bound markets may increase trading costs
3. Improper parameter settings may affect strategy performance
4. Potential discrepancies between backtesting and live trading results

#### Strategy Optimization Directions

1. Introduce machine learning algorithms for parameter adaptive optimization
2. Add more filtering conditions, such as trading volume and volatility indicators
3. Develop multi-timeframe verification mechanisms
4. Optimize stop-loss and take-profit algorithms with dynamic market volatility adjustments

#### Summary

This is an innovative trading strategy that integrates liquidity analysis and market structure dynamics. By providing flexible internal market shift logic and precise liquidity zone tracking, it offers traders a powerful trading tool. The strategy's key strength lies in its adaptability and multi-dimensional analysis capabilities, maintaining high execution efficiency across different market conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-28 00:00:00
end: 2025-03-27 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Liquidity + Internal Market Shift Strategy", overlay=true)

// ======== Mode Selection ========
mode = input.string("Both", title="Mode", options=["Both", "Bullish Only", "Bearish Only"])

// ======== Stop-Loss and Take-Profit Input (in pips) ========
enableTakeProfit = input.bool(true, title="Enable Custom Take Profit")  // Option to enable/disable take profit
stopLossPips = input.int(10, title="Stop Loss (in pips)", minval=1)  // Stop loss in pips
takeProfitPips = input.int(20, title="Take Profit (in pips)", minval=1)  // Take profit in pips

// ======== Internal Shift Logic ========

// Fixed number of consecutive candles to track (set to 1)
consecutiveBullishCount = 1
consecutiveBearishCount = 1

// Function to check for bullish and bearish candles
isBullish = close > open
isBearish = close < open

// Variables to track consecutive candles and mark lowest/highest
var int bullishCount = 0
var int bearishCount = 0
var float lowestBullishPrice = na
var float highestBearishPrice = na
var float previousBullishPrice = na // For the previous bullish lowest price
var float previousBearishPrice = na // For the previous bearish highest price

// Variables to track last internal shift type (1 = Bullish, -1 = Bearish, 0 = None)
var int lastInternalShift = 0

// Counting consecutive bullish and bearish candles
if isBullish
    bullishCount := bullishCount + 1
    bearishCount := 0
    if bullishCount == 1 or low < lowestBullishPrice
        lowestBullishPrice := low
else if isBearish
    bearishCount := bearishCount + 1
    bullishCount := 0
    if bearishCount == 1 or high > highestBearishPrice
        highestBearishPrice := high
else
    bullishCount := 0
    bearishCount := 0
    lowestBullishPrice := na
    highestBearishPrice := na

// Internal shift conditions
internalShiftBearish = close < previousBullishPrice and close < lowestBullishPrice
internalShiftBullish = close > previousBearishPrice and close > highestBearishPrice

// Condition to alternate internal shifts
allowInternalShiftBearish = internalShiftBearish and lastInternalShift != -1
allowInternalShiftBullish = internalShiftBullish and lastInternalShift != 1

// Tracking shifts
if bullishCount >= consecutiveBullishCount
    previousBullishPrice := lowestBullishPrice

if bearishCount >= consecutiveBearishCount
    previousBearishPrice := highestBearishPrice

// ======== Liquidity Seal-Off Points Logic ========
upperLiquidityLookback = input.int(10, title="Lookback Period for Upper Liquidity Line")
lowerLiquidityLookback = input.int(10, title="Lookback Period for Lower Liquidity Line")

isLocalHigh = high == ta.highest(high, upperLiquidityLookback)
isLocalLow = low == ta.lowest(low, lowerLiquidityLookback)

var bool touchedLowerLiquidityLine = false
var bool touchedUpperLiquidityLine = false

if (low <= ta.lowest(low, lowerLiquidityLookback))
    touchedLowerLiquidityLine := true

if (high >= ta.highest(high, upperLiquidityLookback))
    touchedUpperLiquidityLine := true

var bool lockedBullish = false
var bool lockedBearish = false
var int barSinceLiquidityTouch = na

// ======== Combined Signals ========
bullishSignal = allowInternalShiftBullish and touchedLowerLiquidityLine and not lockedBullish
bearishSignal = allowInternalShiftBearish and touchedUpperLiquidityLine and not lockedBearish

if bullishSignal
    lockedBullish := true
    touchedLowerLiquidityLine := false
    barSinceLiquidityTouch := 0

if bearishSignal
    lockedBearish := true
    touchedUpperLiquidityLine := false
    barSinceLiquidityTouch := 0

if not na(barSinceLiquidityTouch)
    barSinceLiquidityTouch := barSinceLiquidityTouch + 1

if barSinceLiquidityTouch >= 3
    lockedBullish := false
    lockedBearish := false

if touchedLowerLiquidityLine
    lockedBullish := false

if touchedUpperLiquidityLine
    lockedBearish := false

// ======== Plot Combined Signals ========
plotshape(bullishSignal, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.tiny, title="Bullish Signal")
plotshape(bearishSignal, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.tiny, title="Bearish Signal")

plot(isLocalHigh ? high : na, color=color.red, linewidth=2, style=plot.style_stepline, title="Local High Line")
plot(isLocalLow ? low : na, color=color.green, linewidth=2, style=plot.style_stepline, title="Local Low Line")

// ======== Track Entry and Opposing Signals ========
var float entryPrice = na
var int entryTime = na
var string positionSide = ""

// ======== Strategy Execution (Mode Logic) ========
if (mode == "Both")
    // Short Entry Logic (Bearish Signal)
    if (bearishSignal and na(entryPrice))
        strategy.entry("Short", strategy.short)
        entryPrice := close
        entryTime := time
        positionSide := "short"
    
    // Long Entry Logic (Bullish Signal)
    if (bullishSignal and na(entryPrice))
        strategy.entry("Long", strategy.long)
        entryPrice := close
        entryTime := time
        positionSide := "long"

    // Exit Logic: Close on Opposing Signal (after the current signal is triggered)
    if (positionSide == "short" and bullishSignal )
        strategy.close("Short")
        entryPrice := na
        positionSide := ""
    
    if (positionSide == "long" and bearishSignal)
        strategy.close("Long")
        entryPrice := na
        positionSide := ""
    
    // Stop-Loss and Take-Profit Logic (in pips)
    stopLossPriceLong = entryPrice - stopLossPips * syminfo.mintick
    takeProfitPriceLong = entryPrice + takeProfitPips * syminfo.mintick
    stopLossPriceShort = entryPrice + stopLossPips * syminfo.mintick
    takeProfitPriceShort = entryPrice - takeProfitPips * syminfo.mintick
    
    // Long Stop-Loss and Take-Profit Conditions
    if (positionSide == "long" and close <= stopLossPriceLong)
        strategy.close("Long", comment="Stop Loss Triggered")
        entryPrice := na
        positionSide := ""

    if (positionSide == "long" and enableTakeProfit and close >= takeProfitPriceLong)
        strategy.close("Long", comment="Take Profit Triggered")
        entryPrice := na
        positionSide := ""

    // Short Stop-Loss and Take-Profit Conditions
    if (positionSide == "short" and close >= stopLossPriceShort)
        strategy.close("Short", comment="Stop Loss Triggered")
        entryPrice := na
        positionSide := ""

    if (positionSide == "short" and enableTakeProfit and close <= takeProfitPriceShort)
        strategy.close("Short", comment="Take Profit Triggered")
        entryPrice := na
        positionSide := ""

if (mode == "Bullish Only")
    if (bullishSignal and na(entryPrice))
        strategy.entry("Long", strategy.long)
        entryPrice := close
        entryTime := time
        positionSide := "long"
    
    if (positionSide == "long" and bearishSignal)
        strategy.close("Long")
        entryPrice := na
        positionSide := ""

    // Stop-Loss and Take-Profit Logic (in pips)
    stopLossPriceLong = entryPrice - stopLossPips * syminfo.mintick
    takeProfitPriceLong = entryPrice + takeProfitPips * syminfo.mintick
    
    if (positionSide == "long" and close <= stopLossPriceLong)
        strategy.close("Long", comment="Stop Loss Triggered")
        entryPrice := na
        positionSide := ""

    if (positionSide == "long" and enableTakeProfit and close >= takeProfitPriceLong)
        strategy.close("Long", comment="Take Profit Triggered")
        entryPrice := na
        positionSide := ""

if (mode == "Bearish Only")
    if (bearishSignal and na(entryPrice))
        strategy.entry("Short", strategy.short)
        entryPrice := close
        entryTime := time
        positionSide := "short"
    
    if (positionSide == "short" and bullishSignal)
        strategy.close("Short")
        entryPrice := na
        positionSide := ""

    // Stop-Loss and Take-Profit Logic (in pips)
    stopLossPriceShort = entryPrice + stopLossPips * syminfo.mintick
    takeProfitPriceShort = entryPrice - takeProfitPips * syminfo.mintick
    
    if (positionSide == "short" and close >= stopLossPriceShort)
        strategy.close("Short", comment="Stop Loss Triggered")
        entryPrice := na
        positionSide := ""

    if (positionSide == "short" and enableTakeProfit and close <= takeProfitPriceShort)
        strategy.close("Short", comment="Take Profit Triggered")
        entryPrice := na
        positionSide := ""

```

> Detail

https://www.fmz.com/strategy/488536

> Last Modified

2025-03-28 17:13:02
