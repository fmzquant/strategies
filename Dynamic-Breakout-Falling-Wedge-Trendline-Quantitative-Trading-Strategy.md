
> Name

Dynamic-Breakout-Falling-Wedge-Trendline-Quantitative-Trading-Strategy

> Author

ianzeng123

> Strategy Description

#### Overview
This strategy is a trend breakout trading system based on the falling wedge pattern in technical analysis. It dynamically identifies highs and lows in price action to construct upper and lower trendlines, entering long positions when price breaks above the upper trendline. The strategy employs dynamic take-profit and stop-loss mechanisms to control risk and lock in profits. This is a programmatic implementation of a classic technical analysis trading method, particularly suitable for capturing reversal opportunities when downtrends are potentially ending.

#### Strategy Principles
The core logic includes several key steps:
1. Using Pivot method to dynamically identify highs and lows in price movement
2. Recording and storing the last two highs and lows with their corresponding time indices
3. Calculating slopes of upper and lower trendlines based on these points
4. Identifying falling wedge formation: requiring descending highs and lows, with upper trendline slope less than lower trendline slope
5. Triggering buy signals when price breaks above the upper trendline
6. Setting percentage-based take-profit and stop-loss conditions relative to entry price

#### Strategy Advantages
1. Dynamic Market Structure Recognition: Automatically identifies key price points without manual intervention
2. Trend Reversal Capture: Focuses on capturing potential reversals of downtrends, typically high-reward opportunities
3. Precise Signal Generation: Accurately calculates trendline positions and breakout points using mathematical methods
4. Comprehensive Risk Management: Includes preset take-profit and stop-loss mechanisms for effective risk control
5. Systematic Operation: Fully systematized strategy logic, avoiding emotional interference

#### Strategy Risks
1. False Breakout Risk: Market may produce false breakouts leading to incorrect signals
2. Parameter Sensitivity: Strategy effectiveness is sensitive to parameter settings, requiring adjustment in different market conditions
3. Market Condition Dependency: May generate excessive false signals in ranging markets
4. Stop Loss Risk: Fast market movements may cause slippage in actual stop loss execution
5. Transaction Cost Impact: Frequent trading may incur high transaction costs

#### Strategy Optimization Directions
1. Signal Confirmation Mechanism: Add volume, momentum indicators for breakout confirmation
2. Dynamic Parameter Optimization: Introduce adaptive mechanisms to adjust parameters based on market volatility
3. Multiple Timeframe Verification: Add multi-timeframe confirmation to improve signal reliability
4. Improved Stop Loss/Take Profit: Implement dynamic mechanisms like trailing stops
5. Market Environment Filtering: Add trend filters to trade only in suitable market conditions

#### Summary
This is a well-designed trend trading strategy that implements traditional technical analysis methods programmatically. Its strength lies in automated market structure identification and potential trend reversal capture. However, attention must be paid to false breakouts and parameter optimization. With further enhancement and refinement, this strategy has potential for improved performance in actual trading.

> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-22 00:00:00
end: 2025-02-19 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/

//@version=6
strategy("Falling Wedge Strategy by Nitin", overlay=true, margin_long=100, margin_short=100)

// Input parameters
leftBars = input.int(5, "Left Bars for Pivot", minval=1, maxval=20)
rightBars = input.int(5, "Right Bars for Pivot", minval=1, maxval=20)
takeProfitPercent = input.float(20, "Take Profit %", minval=0.1, maxval=100)/100
stopLossPercent = input.float(2, "Stop Loss %", minval=0.1, maxval=100)/100

// Global variables
var float buyPrice = na
var line upperLine = na
var line lowerLine = na

// Detect pivot highs and lows
ph = ta.pivothigh(leftBars, rightBars)
pl = ta.pivotlow(leftBars, rightBars)

// Track last two pivot highs
var float[] highs = array.new_float()
var int[] highIndices = array.new_int()
if not na(ph)
    array.unshift(highs, ph)
    array.unshift(highIndices, bar_index[rightBars])
    if array.size(highs) > 2
        array.pop(highs)
        array.pop(highIndices)

// Track last two pivot lows
var float[] lows = array.new_float()
var int[] lowIndices = array.new_int()
if not na(pl)
    array.unshift(lows, pl)
    array.unshift(lowIndices, bar_index[rightBars])
    if array.size(lows) > 2
        array.pop(lows)
        array.pop(lowIndices)

// Calculate trendlines and signals
if array.size(highs) >= 2 and array.size(lows) >= 2
    h1 = array.get(highs, 0)
    h2 = array.get(highs, 1)
    i1 = array.get(highIndices, 0)
    i2 = array.get(highIndices, 1)
    
    l1 = array.get(lows, 0)
    l2 = array.get(lows, 1)
    j1 = array.get(lowIndices, 0)
    j2 = array.get(lowIndices, 1)
    
    m_upper = (h1 - h2) / (i1 - i2)
    m_lower = (l1 - l2) / (j1 - j2)
    
    currentUpper = h2 + m_upper * (bar_index - i2)
    currentLower = l2 + m_lower * (bar_index - j2)
    
    if h1 < h2 and l1 < l2 and m_upper < m_lower and m_upper < 0 and m_lower < 0
        
        // Buy signal on breakout
        if ta.crossover(close, currentUpper)
            strategy.entry("Buy", strategy.long)
            buyPrice := close
            strategy.exit("Take Profit/Stop Loss", "Buy", stop=buyPrice * (1 - stopLossPercent), limit=buyPrice * (1 + takeProfitPercent))

// Plotting
plotshape(strategy.position_size > 0 ? buyPrice : na, "Buy Price", style=shape.labelup, location=location.belowbar, color=color.green, textcolor=color.white, text="BUY")
plot(strategy.position_size > 0 ? buyPrice * (1 - stopLossPercent) : na, "Stop Loss", color=color.red, linewidth=2)
plot(strategy.position_size > 0 ? buyPrice * (1 + takeProfitPercent) : na, "Take Profit", color=color.green, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/483089

> Last Modified

2025-02-27 17:02:08
