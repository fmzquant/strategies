
> Name

Trend-Following-Dynamic-Grid-Position-Sizing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/aa5227227dd547d130.png)

#### Overview
This strategy is a dynamic grid trading system based on the TTM indicator, which determines market trend direction by calculating exponential moving averages (EMAs) of highs and lows, and deploys a grid trading system around a dynamically updated base price. The grid's direction and price levels adjust according to the trend, executing trades when price crosses predefined grid levels, with each trade risking a fixed percentage of account equity.

#### Strategy Principles
The core logic lies in TTM state calculation, implemented through the following steps:
1. Calculate two EMAs based on ttmPeriod parameter: EMA of lows (lowMA) and highs (highMA)
2. Define two threshold levels between highMA and lowMA:
   - lowThird: 1/3 position from bottom
   - highThird: 2/3 position from bottom
3. Determine TTM state based on closing price position relative to these thresholds:
   - Returns 1 (uptrend) when close is above highThird
   - Returns 0 (downtrend) when close is below lowThird
   - Returns -1 (neutral state) when close is between lowThird and highThird

The grid trading system adjusts dynamically based on TTM state:
1. Updates grid base price and direction when TTM state changes
2. Calculates buy/sell price levels based on grid direction and spacing
3. Executes corresponding buy or sell operations when price breaks through grid levels

#### Strategy Advantages
1. Strong Dynamic Adaptability: Strategy can dynamically adjust grid direction and price levels based on market trends, improving adaptability and profitability
2. Robust Risk Control: Uses fixed percentage position sizing, effectively controlling risk exposure per trade
3. Good Parameter Adjustability: Key parameters like TTM period, grid levels, and spacing can be optimized for different market conditions
4. Clear Execution Mechanism: Trading signals are clear, execution logic is simple and intuitive, facilitating backtesting and live trading

#### Strategy Risks
1. Trend Detection Delay: EMA-based TTM indicator has inherent lag, potentially causing delayed signals at trend turning points
2. Sideways Market Risk: Frequent grid direction switches in ranging markets may lead to overtrading and excessive fees
3. Capital Management Pressure: Running multiple grid levels simultaneously requires substantial capital, potentially affecting strategy feasibility
4. Slippage Impact: High-frequency grid trading may face significant slippage in low liquidity conditions, affecting strategy performance

#### Strategy Optimization Directions
1. Trend Detection Optimization:
   - Incorporate multiple timeframe analysis to improve trend detection accuracy
   - Combine with other technical indicators like RSI, MACD for trend confirmation
2. Grid Parameter Optimization:
   - Dynamically adjust grid spacing based on volatility
   - Implement adaptive grid level adjustment mechanism
3. Capital Management Improvement:
   - Implement dynamic position allocation
   - Add risk parity mechanism
4. Execution Mechanism Enhancement:
   - Add stop-loss and take-profit mechanisms
   - Optimize order execution timing

#### Summary
This strategy combines TTM trend detection with dynamic grid trading to create an adaptive, risk-controlled trading system. Through dynamic adjustment of grid direction and price levels, the strategy can effectively adapt to different market environments. While inherent risks exist, through appropriate parameter settings and optimization measures, the strategy demonstrates good practical value and development potential.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-04 00:00:00
end: 2024-12-11 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("TTM Grid Strategy", overlay=true)

// Input parameters
int ttmPeriod = input.int(6, minval=1, title="TTM Period")
int gridLevels = input.int(5, minval=2, title="Grid Levels")
float gridSpacing = input.float(0.01, minval=0.0001, title="Grid Spacing (%)")

// Calculate TTM State
ttmState() =>
    lowMA = ta.ema(low, ttmPeriod)
    highMA = ta.ema(high, ttmPeriod)
    lowThird = (highMA - lowMA) / 3 + lowMA
    highThird = 2 * (highMA - lowMA) / 3 + lowMA

    if close > highThird
        1
    else if close < lowThird
        0
    else
        -1

// State tracking variables
var float gridBasePrice = 0.0
var int gridDirection = -1

// Determine grid state
updateGridState(float currentClose, int currentState) =>
    float newBasePrice = gridBasePrice
    int newDirection = gridDirection

    if currentState != -1 and currentState != gridDirection
        newBasePrice := currentClose
        newDirection := currentState
    
    [newBasePrice, newDirection]

// Calculate grid levels
calcGridLevels(float basePrice, int direction, int levels) =>
    float[] buyLevels = array.new_float(levels)
    float[] sellLevels = array.new_float(levels)

    for i = 1 to levels
        multiplier = i * gridSpacing
        if direction == 1  // Buy grid
            array.set(buyLevels, i-1, basePrice * (1 - multiplier))
            array.set(sellLevels, i-1, basePrice * (1 + multiplier))
        else  // Sell grid
            array.set(buyLevels, i-1, basePrice * (1 + multiplier))
            array.set(sellLevels, i-1, basePrice * (1 - multiplier))
    
    [buyLevels, sellLevels]

// Execute grid trades
executeGridTrades(float basePrice, int direction, int levels) =>
    [buyLevels, sellLevels] = calcGridLevels(basePrice, direction, levels)

    for i = 0 to levels - 1
        float buyLevel = array.get(buyLevels, i)
        float sellLevel = array.get(sellLevels, i)

        if direction == 1  // Buy grid
            if low <= buyLevel
                strategy.entry("GridBuy" + str.tostring(i), strategy.long, comment="Buy Level " + str.tostring(i))
            if high >= sellLevel
                strategy.entry("GridSell" + str.tostring(i), strategy.short, comment="Sell Level " + str.tostring(i))
        else  // Sell grid
            if high >= buyLevel
                strategy.entry("GridBuy" + str.tostring(i), strategy.long, comment="Buy Level " + str.tostring(i))
            if low <= sellLevel
                strategy.entry("GridSell" + str.tostring(i), strategy.short, comment="Sell Level " + str.tostring(i))

// Main strategy logic
currentState = ttmState()
[newGridBasePrice, newGridDirection] = updateGridState(close, currentState)

// Update global variables
if newGridBasePrice != gridBasePrice
    gridBasePrice := newGridBasePrice
if newGridDirection != gridDirection
    gridDirection := newGridDirection

// Execute grid trades
executeGridTrades(newGridBasePrice, newGridDirection, gridLevels)

// Visualization
plotColor = newGridDirection == 1 ? color.green : color.red
plot(newGridBasePrice, color=plotColor, style=plot.style_cross)
```

> Detail

https://www.fmz.com/strategy/474808

> Last Modified

2024-12-12 11:19:17
