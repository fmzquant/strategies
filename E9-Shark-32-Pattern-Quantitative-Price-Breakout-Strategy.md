
> Name

E9-Shark-32-Pattern-Quantitative-Price-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/157f21fc7b785ed813d.png)


#### Overview
This strategy is a quantitative trading system based on pattern recognition, focusing on identifying and trading the "Shark-32" candlestick pattern. The strategy analyzes continuous changes in highs and lows, sets key price levels after pattern confirmation, and executes trades on breakouts of these levels. It combines pattern recognition, trend following, and price breakout elements to create a complete trading system.

#### Strategy Principles
The core principle lies in identifying the "Shark-32" pattern, which requires consecutive lower lows and higher highs in the previous two candles. Upon pattern confirmation, the strategy locks the high and low of the initial pattern candle as key price levels. The system enters positions when price breaks these key levels: long entries on breaks above the locked high, and short entries on breaks below the locked low. The strategy uses projected target lines for profit objectives and percentage-based parameters for flexible stop-loss placement.

#### Strategy Advantages
1. Accurate pattern recognition: Uses strict mathematical definitions to identify patterns, avoiding subjective judgment
2. Comprehensive risk management: Includes clear stop-loss and profit target settings
3. Clear visual feedback: Uses different colored lines and backgrounds to mark patterns and trading signals
4. Filtered repeat signals: Allows only one trade per pattern, preventing overtrading
5. Rational target setting: Sets profit targets based on pattern amplitude, providing good risk-reward ratios

#### Strategy Risks
1. Choppy market risk: May generate frequent false breakout signals in ranging markets
2. Slippage risk: May face significant slippage in fast-moving markets
3. Single pattern dependency: Over-reliance on one pattern may miss other trading opportunities
4. Parameter sensitivity: Strategy performance heavily depends on stop-loss and profit target parameter settings

#### Strategy Optimization Directions
1. Add volume confirmation: Incorporate volume changes to confirm breakout validity
2. Implement market environment filters: Add trend strength indicators to filter unfavorable market conditions
3. Optimize stop-loss methods: Consider dynamic stop-loss to improve strategy adaptability
4. Add time filters: Incorporate trading session filters to avoid specific volatile periods
5. Enhance money management: Add position sizing module to optimize capital efficiency

#### Summary
The E9 Shark-32 Pattern Quantitative Price Breakout Strategy is a well-structured trading system with clear logic. It builds a quantifiable trading strategy through strict pattern definitions and clear trading rules. The strategy features a comprehensive risk management system and clear visual feedback, making it easy for traders to understand and execute. Through the suggested optimization directions, there's room for further improvement. This strategy is suitable for investors seeking systematic trading approaches, but attention must be paid to market environment adaptability and parameter optimization.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-01 00:00:00
end: 2024-10-31 23:59:59
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//╔═════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
//║                                                                                                             ║
//║ ░▒▓████████▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░▒▓███████▓▒░   ░▒▓████████▓▒░▒▓██████▓▒░  ║
//║    ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒   ░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░ ║
//║    ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒.  ░▒▓█▓▒░     ░▒▓█▓▒░░▒▓█▓▒░ ║
//║    ░▒▓█▓▒░   ░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░ ░▒▓███████▓▒░.  ░▒▓██████▓▒░ ░▒▓███████▓▒░ ║
//║    ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒.  ░▒▓█▓▒░            ░▒▓█▓▒░ ║
//║    ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒.  ░▒▓█▓▒░            ░▒▓█▓▒░ ║
//║    ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒.  ░▒▓████████▓▒░▒▓██████▓▒░  ║
//║                                                                                                             ║
//╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════╝

//@version=5
strategy("E9 Shark-32 Pattern Strategy with Target Lines", shorttitle="E9 Shark-32 Strategy", overlay=true)

// Inputs for background color settings
bgcolorEnabled = input(true, title="Enable Background Color")
bgcolorColor = input.color(color.new(color.blue, 90), title="Background Color")

// Inputs for bar color settings
barcolorEnabled = input(true, title="Enable Bar Color")
barcolorColor = input.color(color.rgb(240, 241, 154), title="Bar Color")

// Inputs for target lines settings
targetLinesEnabled = input(true, title="Enable Target Lines")
targetLineColor = input.color(color.white, title="Target Line Color")
targetLineThickness = input.int(1, title="Target Line Thickness", minval=1, maxval=5)

// Define Shark-32 Pattern
shark32 = low[2] < low[1] and low[1] < low and high[2] > high[1] and high[1] > high

// Initialize color variables for bars
var color barColorCurrent = na
var color barColor1 = na
var color barColor2 = na

// Update color variables based on Shark-32 pattern
barColorCurrent := barcolorEnabled and (shark32 or shark32[1] or shark32[2]) ? barcolorColor : na
barColor1 := barcolorEnabled and (shark32[1] or shark32[2]) ? barcolorColor : na
barColor2 := barcolorEnabled and shark32[2] ? barcolorColor : na

// Apply the bar colors to the chart
barcolor(barColorCurrent, offset=-2, title="Shark-32 Confirmed Current")
barcolor(barColor1, offset=-3, title="Shark-32 Confirmed Previous Bar 1")
barcolor(barColor2, offset=-4, title="Shark-32 Confirmed Previous Bar 2")

// Variables for locking the high and low of confirmed Shark-32
var float patternHigh = na
var float patternLow = na
var float upperTarget = na
var float lowerTarget = na

// Once Shark-32 pattern is confirmed, lock the patternHigh, patternLow, and target lines
if shark32
    patternHigh := high[2]  // The high of the first bar in Shark-32 pattern
    patternLow := low[2]    // The low of the first bar in Shark-32 pattern

    // Calculate the upper and lower white target lines
    upperTarget := patternHigh + (patternHigh - patternLow)  // Dotted white line above
    lowerTarget := patternLow - (patternHigh - patternLow)   // Dotted white line below

// Initialize variables for the lines
var line greenLine = na
var line redLine = na
var line upperTargetLine = na
var line lowerTargetLine = na

// Draw the lines based on the locked patternHigh, patternLow, and target lines
// if shark32
//     future_bar_index_lines = bar_index + 10

//     // Draw lines based on locked patternHigh and patternLow
//     greenLine := line.new(x1=bar_index[2], y1=patternHigh, x2=future_bar_index_lines, y2=patternHigh, color=color.green, width=2, extend=extend.none)
//     redLine := line.new(x1=bar_index[2], y1=patternLow, x2=future_bar_index_lines, y2=patternLow, color=color.red, width=2, extend=extend.none)

//     // Draw dotted white lines if targetLinesEnabled is true
//     if targetLinesEnabled
//         upperTargetLine := line.new(x1=bar_index[2], y1=upperTarget, x2=future_bar_index_lines, y2=upperTarget, color=targetLineColor, width=targetLineThickness, style=line.style_dotted, extend=extend.none)
//         lowerTargetLine := line.new(x1=bar_index[2], y1=lowerTarget, x2=future_bar_index_lines, y2=lowerTarget, color=targetLineColor, width=targetLineThickness, style=line.style_dotted, extend=extend.none)

//     // Create a box to fill the background between the red and green lines
//     if bgcolorEnabled
//         box.new(left=bar_index[2], top=patternHigh, right=future_bar_index_lines, bottom=patternLow, bgcolor=bgcolorColor)

// -------------------------------------------------------------------------
// Strategy Entry and Exit Parameters
// -------------------------------------------------------------------------

// Input parameters for stop loss
longStopLoss = input.float(1.0, title="Long Stop Loss (%)", minval=0.1)  // Percentage-based stop loss for long
shortStopLoss = input.float(1.0, title="Short Stop Loss (%)", minval=0.1)  // Percentage-based stop loss for short

// Variable to track if a trade has been taken
var bool tradeTaken = false

// Reset the flag when a new Shark-32 pattern is confirmed
if shark32
    tradeTaken := false

// Entry conditions only trigger after the Shark-32 is confirmed
longCondition = ta.crossover(close, patternHigh) and not tradeTaken  // Long entry when close crosses above locked patternHigh
shortCondition = ta.crossunder(close, patternLow) and not tradeTaken  // Short entry when close crosses below locked patternLow

// Trigger long and short trades based on the crossover conditions
if (longCondition)
    label.new(bar_index, high, "Long Trigger", style=label.style_label_down, color=color.green, textcolor=color.white, size=size.small)
    strategy.entry("Shark-32 Long", strategy.long)
    tradeTaken := true  // Set the flag to true after a trade is taken

if (shortCondition)
    label.new(bar_index, low, "Short Trigger", style=label.style_label_up, color=color.red, textcolor=color.white, size=size.small)
    strategy.entry("Shark-32 Short", strategy.short)
    tradeTaken := true  // Set the flag to true after a trade is taken

// Exit long trade based on the upper target line (upper white dotted line) as take profit
if strategy.position_size > 0
    strategy.exit("Take Profit Long", "Shark-32 Long", limit=upperTarget, stop=close * (1 - longStopLoss / 100))

// Exit short trade based on the lower target line (lower white dotted line) as take profit
if strategy.position_size < 0
    strategy.exit("Take Profit Short", "Shark-32 Short", limit=lowerTarget, stop=close * (1 + shortStopLoss / 100))

```

> Detail

https://www.fmz.com/strategy/471691

> Last Modified

2024-11-12 14:51:17
