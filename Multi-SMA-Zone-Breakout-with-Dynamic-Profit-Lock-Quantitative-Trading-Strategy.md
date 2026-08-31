
> Name

Multi-SMA-Zone-Breakout-with-Dynamic-Profit-Lock-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/6e247c4ff859e0db22.png)

#### Overview
This is a dynamic trend-following trading strategy based on SMA indicators, combining price zones, stochastic indicators, and multiple profit protection mechanisms. The strategy monitors price movements across different zones, integrates short-term and long-term moving average crossover signals, and uses stochastic indicators to determine market conditions and trend strength for efficient trend capture. The strategy incorporates both percentage-based and fixed-point profit-taking mechanisms to effectively balance returns and risks.

#### Strategy Principles
The core logic includes several key components:
1. Uses 19-period and 74-period SMAs to build trend framework
2. Employs 60-period stochastic indicator to judge market conditions, categorizing SMA colors into yellow, green, red, and orange states
3. Divides price zones into 5 important levels for determining price strength
4. Entry conditions require:
   - SMA in green or yellow state
   - Price breakout above orange zone
   - Closing price above short-term SMA
5. Implements two profit-taking mechanisms:
   - Percentage-based drawdown protection from highest price
   - Fixed-point profit lock

#### Strategy Advantages
1. Multiple confirmation mechanisms reduce false signals
2. Dynamic zone division adapts to different market environments
3. Dual profit-taking mechanisms provide better risk control
4. Clear market state classification helps capture market rhythm
5. Real-time trade status monitoring facilitates strategy debugging
6. Combines technical indicators with price action analysis

#### Strategy Risks
1. May generate excessive trades in ranging markets
2. Fixed-point profit taking might miss larger trends
3. Parameter optimization can lead to overfitting
4. Potential profit loss during rapid market reversals
5. Multiple confirmation conditions might miss some trading opportunities
Solutions:
- Add volatility filters
- Dynamically adjust profit-taking parameters
- Enhance market environment recognition
- Optimize exit timing decisions

#### Strategy Optimization Directions
1. Introduce volatility indicators for dynamic parameter adjustment
2. Adapt profit-taking conditions based on market state
3. Add volume confirmation mechanism
4. Incorporate trend strength filters
5. Optimize zone division method considering market characteristics
6. Enhance risk management mechanisms, including:
   - Daily stop loss
   - Maximum drawdown control
   - Position holding time limits

#### Summary
The strategy constructs a comprehensive trading system through the integrated use of multiple technical indicators and price action analysis methods. Its strengths lie in multiple confirmation mechanisms and flexible profit-taking systems, while attention must be paid to the impact of market environment on strategy performance. Through continuous optimization and improved risk management, the strategy shows potential for maintaining stable performance across different market conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="SMA Color Strategy", 
     overlay=true, 
     initial_capital=10000,
     max_bars_back=5000,
     max_labels_count=500,
     max_boxes_count=500,
     default_qty_type=strategy.fixed,
     default_qty_value=1,
     currency=currency.NONE,
     process_orders_on_close=true)

// === INPUTS ===
zoneLength = input.int(20, "Price Zone Length", minval=5)
profitLockPct = input.float(50, "Profit Lock Percentage", minval=1, maxval=100, step=5) / 100
ticksToLock = input.int(12, "Ticks to Activate Lock", minval=1, tooltip="Number of ticks price must move up to activate tick-based lock")
ticksToSecure = input.int(10, "Ticks to Secure", minval=1, tooltip="Number of ticks to lock in once activated")

// Calculate tick values
tickSize = syminfo.mintick
ticksToLockPoints = ticksToLock * tickSize
ticksToSecurePoints = ticksToSecure * tickSize

// Calculate price zones
h = ta.highest(high, zoneLength)
l = ta.lowest(low, zoneLength)
priceRange = h - l
lvl5 = h
lvl4 = l + (priceRange * 0.75)  // Orange line
lvl3 = l + (priceRange * 0.50)  // Yellow line
lvl2 = l + (priceRange * 0.25)  // Green line
lvl1 = l

// Calculate SMAs
sma19 = ta.sma(close, 19)
sma74 = ta.sma(close, 74)

// Stochastic calculation for color logic
k = ta.stoch(close, high, low, 60)
d = ta.sma(k, 10)

// SMA Color Logic with state tracking
var color currentSMAColor = color.orange
var color previousSMAColor = color.orange
var string currentColorName = "ORANGE"
var string previousColorName = "ORANGE"

smaColor = if d >= 80 or d <= 20
    color.rgb(255, 215, 0)
else if d > d[1]
    color.green
else if d < d[1]
    color.red
else
    color.orange

// Update color state and names
if smaColor != currentSMAColor
    previousSMAColor := currentSMAColor
    currentSMAColor := smaColor
    previousColorName := currentColorName
    currentColorName := if smaColor == color.rgb(255, 215, 0)
        "YELLOW"
    else if smaColor == color.green
        "GREEN"
    else if smaColor == color.red
        "RED"
    else
        "ORANGE"

// Color logic for SMA74
sma74Color = if smaColor == color.rgb(255, 215, 0)
    color.rgb(255, 215, 0)                          
else if sma74 < sma19                               
    color.green
else                                                
    color.red

// === ENTRY CONDITIONS ===
smaIsGreen = smaColor == color.green
greenCandle = close > open
candleAboveOrange = close > lvl4
candleAboveSMA = close > sma19
crossedAboveOrange = ta.crossover(close, lvl4)
smaIsYellow = smaColor == color.rgb(255, 215, 0)

longCondition1 = smaIsGreen and greenCandle and candleAboveOrange and candleAboveSMA and crossedAboveOrange
longCondition2 = smaIsYellow and crossedAboveOrange and candleAboveSMA

// === PROFIT LOCK SYSTEM ===
var float entryPrice = na
var float maxPrice = na
var float profitLockLevel = na
var bool tickLockActivated = false
var float tickBasedLockLevel = na

// Reset variables on new trade entry
if (longCondition1 or longCondition2)
    entryPrice := close
    maxPrice := close
    profitLockLevel := close * (1 - profitLockPct)
    tickLockActivated := false
    tickBasedLockLevel := na

// Update maximum price and profit locks when in a trade
if strategy.position_size > 0
    maxPrice := math.max(maxPrice, high)
    profitLockLevel := math.max(profitLockLevel, maxPrice * (1 - profitLockPct))
    
    // Check if price has moved up enough to activate tick-based lock
    if not tickLockActivated and (maxPrice - entryPrice) >= ticksToLockPoints
        tickLockActivated := true
        tickBasedLockLevel := entryPrice + ticksToSecurePoints

// === EXIT CONDITIONS ===
exitOnYellowLine = close < lvl3
exitOnProfitLock = low < profitLockLevel and strategy.position_size > 0
exitOnTickLock = tickLockActivated and low < tickBasedLockLevel

// === TRADE MANAGEMENT ===
if (longCondition1 or longCondition2)
    strategy.entry("Long", strategy.long)

if strategy.position_size > 0
    if exitOnYellowLine
        strategy.close("Long", comment="Close below yellow")
    if exitOnProfitLock
        strategy.close("Long", comment="Profit lock triggered")
    if exitOnTickLock
        strategy.close("Long", comment="Tick-based lock triggered")

// Plot indicators
plot(sma19, "SMA 19", color=smaColor, linewidth=2)
plot(sma74, "SMA 74", color=sma74Color, linewidth=2)
plot(lvl5, "Upper Zone Top", color=color.red, linewidth=2)
plot(lvl4, "Upper Zone Bottom", color=color.orange, linewidth=2)
plot(lvl3, "Middle Line", color=color.yellow, linewidth=2)
plot(lvl2, "Lower Zone Top", color=color.green, linewidth=2)
plot(lvl1, "Lower Zone Bottom", color=color.blue, linewidth=2)

// Plot profit lock levels
plot(strategy.position_size > 0 ? profitLockLevel : na, "Profit Lock Level", color=color.purple, style=plot.style_linebr, linewidth=2)
plot(strategy.position_size > 0 and tickLockActivated ? tickBasedLockLevel : na, "Tick Lock Level", color=color.fuchsia, style=plot.style_linebr, linewidth=2)

// Fill zones
var p1 = plot(lvl5, display=display.none)
var p2 = plot(lvl4, display=display.none)
var p3 = plot(lvl2, display=display.none)
var p4 = plot(lvl1, display=display.none)
fill(p1, p2, color=color.new(color.red, 90))
fill(p3, p4, color=color.new(color.green, 90))

// Debug Table
if barstate.islast
    var table debugTable = table.new(position.top_right, 2, 13, bgcolor=color.new(color.black, 70), frame_width=1)
    
    table.cell(debugTable, 0, 0, "Current Color", text_color=color.white)
    table.cell(debugTable, 1, 0, currentColorName, text_color=currentSMAColor)
    
    table.cell(debugTable, 0, 1, "Previous Color", text_color=color.white)
    table.cell(debugTable, 1, 1, previousColorName, text_color=previousSMAColor)
    
    table.cell(debugTable, 0, 2, "Entry 1 (Green)", text_color=color.white)
    table.cell(debugTable, 1, 2, str.tostring(longCondition1), text_color=color.white)
    
    table.cell(debugTable, 0, 3, "Entry 2 (Yellow)", text_color=color.white)
    table.cell(debugTable, 1, 3, str.tostring(longCondition2), text_color=color.white)
    
    table.cell(debugTable, 0, 4, "Current Position", text_color=color.white)
    table.cell(debugTable, 1, 4, str.tostring(strategy.position_size), text_color=color.white)
    
    table.cell(debugTable, 0, 5, "Entry Price", text_color=color.white)
    table.cell(debugTable, 1, 5, str.tostring(entryPrice), text_color=color.white)
    
    table.cell(debugTable, 0, 6, "Max Price", text_color=color.white)
    table.cell(debugTable, 1, 6, str.tostring(maxPrice), text_color=color.white)
    
    table.cell(debugTable, 0, 7, "Profit Lock Level", text_color=color.white)
    table.cell(debugTable, 1, 7, str.tostring(profitLockLevel), text_color=color.white)
    
    table.cell(debugTable, 0, 8, "Tick Lock Active", text_color=color.white)
    table.cell(debugTable, 1, 8, str.tostring(tickLockActivated), text_color=color.white)
    
    table.cell(debugTable, 0, 9, "Tick Lock Level", text_color=color.white)
    table.cell(debugTable, 1, 9, str.tostring(tickBasedLockLevel), text_color=color.white)
    
    table.cell(debugTable, 0, 10, "Price Move (Ticks)", text_color=color.white)
    table.cell(debugTable, 1, 10, str.tostring(strategy.position_size > 0 ? (maxPrice - entryPrice) / tickSize : 0), text_color=color.white)
    
    table.cell(debugTable, 0, 11, "Locked Profit %", text_color=color.white)
    table.cell(debugTable, 1, 11, str.tostring(strategy.position_size > 0 ? ((maxPrice - entryPrice) / entryPrice * 100) : 0.0) + "%", text_color=color.white)
    
    table.cell(debugTable, 0, 12, "Exit Signals", text_color=color.white)
    table.cell(debugTable, 1, 12, "Y:" + str.tostring(exitOnYellowLine) + " P:" + str.tostring(exitOnProfitLock) + " T:" + str.tostring(exitOnTickLock), text_color=color.white)
```

> Detail

https://www.fmz.com/strategy/475625

> Last Modified

2024-12-20 16:28:54
