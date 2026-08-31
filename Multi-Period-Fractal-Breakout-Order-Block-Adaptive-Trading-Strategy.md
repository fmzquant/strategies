
> Name

Multi-Period-Fractal-Breakout-Order-Block-Adaptive-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/168ad16785f251a7b93.png)

 

#### Overview
This strategy is an adaptive trading system based on fractal theory and order block analysis. It captures high-probability trading opportunities by identifying key support and resistance levels in market structure, combining fractal breakout signals with order block confirmation. The strategy integrates multiple technical indicators, including fractal indicators, dynamic order blocks, and price breakout confirmation systems, achieving precise positioning of market turning points and accurate timing of trades.

#### Strategy Principles
The core logic of the strategy is built on three main pillars: first, continuously monitoring market highs and lows through the fractal calculation module to identify potential trend reversal areas; second, establishing supply and demand zones at key price levels through order block analysis; and finally, verifying the validity of price breakouts through the breakout confirmation system. When price breaks above a fractal and confirms validity, the system creates a demand zone order block in the recent red candle area and opens a long position; when price breaks below a fractal and confirms validity, the system creates a supply zone order block in the recent green candle area and opens a short position. The strategy also includes dynamic order block color updates to visually display the relative position relationship between price and order blocks.

#### Strategy Advantages
1. Strong adaptability: The strategy can dynamically adjust order block position and size according to market conditions.
2. Multiple confirmation mechanisms: Combines fractal breakouts, order block confirmation, and price action analysis to reduce false signal risk.
3. Comprehensive risk management: Helps traders monitor strategy status in real-time through clear visual feedback and status checklist.
4. Excellent visualization: Provides intuitive graphic interface including fractal markers, order block display, and status checklist.
5. Flexible parameters: Allows users to adjust key parameters like fractal period and breakout type according to personal trading style.

#### Strategy Risks
1. Market volatility risk: May generate false breakout signals in highly volatile markets, requiring additional filtering mechanisms.
2. Slippage risk: Order execution prices may deviate from ideal entry points in markets with insufficient liquidity.
3. Trend dependency: Strategy performance may not be as ideal in ranging markets as in trending markets.
4. Parameter sensitivity: Different fractal period settings may lead to significantly different trading results.
5. Computational resource consumption: Complex visualization features and real-time calculations may increase system load.

#### Optimization Directions
1. Introduce volatility filter: Optimize trading signals through ATR or other volatility indicators.
2. Add trend confirmation mechanism: Improve signal reliability by combining moving averages or other trend indicators.
3. Perfect stop-loss mechanism: Design dynamic stop-loss strategy based on order block structure.
4. Optimize order block size: Dynamically adjust order block size based on market volatility.
5. Add volume analysis: Verify breakout validity by incorporating volume data.

#### Summary
This is a composite trading strategy that integrates multiple dimensions of technical analysis, building a complete trading system with fractal theory and order block analysis at its core. The strategy's strengths lie in its adaptability and multiple confirmation mechanisms, but attention must also be paid to the impact of market environment on strategy performance. Through the suggested optimization directions, the reliability and stability of the strategy can be further improved.

> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-25 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supply and Demand - Order Block Strategy", format=format.price, precision=0, overlay=true)

// Input options for customization
changeColor = input(false, title="Change Box Colors?")
breakType = input.string("Wick+Body", title="Fractal Break Type:", options=["Wick+Body", "Body"])
n = input.int(title="Periods", defval=2, minval=1, tooltip="Number of periods for fractal lookback")

if n <= 0
    runtime.error("Periods input must be greater than zero.")

transGreenClr = input.color(color.new(color.green, 80), title="Bg:", inline="a_1")
greenClr = input.color(color.new(color.green, 0), title="Border:", inline="a_1")

transRedClr = input.color(color.new(color.red, 80), title="Bg:", inline="b_1")
redClr = input.color(color.new(color.red, 0), title="Border:", inline="b_1")

// --- Fractal Calculation ---
upFractal = high[n] == ta.highest(high, 2 * n + 1)
downFractal = low[n] == ta.lowest(low, 2 * n + 1)
// --- End Fractal Calculation ---

var float topValue = na
var float bottomValue = na
var int lastRedIndex = na
var float lastRedLow = na
var float lastRedHigh = na
var int lastGreenIndex = na
var float lastGreenLow = na
var float lastGreenHigh = na
var line topLine = na
var line bottomLine = na
var box demandBox = na
var box supplyBox = na
var topBreakBlock = false
var bottomBreakBlock = false
var isLongBreak = false
var isShortBreak = false
topBreakCheckSource = breakType == "Wick+Body" ? high : close
bottomBreakCheckSource = breakType == "Wick+Body" ? low : close

// Last Red Check
if close < open
    lastRedIndex := bar_index
    lastRedLow := low
    lastRedHigh := high

// Last Green Check
if close > open
    lastGreenIndex := bar_index
    lastGreenLow := low
    lastGreenHigh := high

// Top break
if ta.crossover(topBreakCheckSource, topValue) and not topBreakBlock
    topBreakBlock := true
    isLongBreak := true
    // line.set_x2(topLine, bar_index)
    // demandBox := box.new(lastRedIndex - 1, lastRedHigh, lastRedIndex + 1, lastRedLow, bgcolor=transGreenClr, border_color=greenClr)
    if strategy.position_size <= 0
        strategy.entry("Long", strategy.long)

// Bottom break
if ta.crossunder(bottomBreakCheckSource, bottomValue) and not bottomBreakBlock
    bottomBreakBlock := true
    isShortBreak := true
    // line.set_x2(bottomLine, bar_index)
    // supplyBox := box.new(lastGreenIndex - 1, lastGreenHigh, lastGreenIndex + 1, lastGreenLow, bgcolor=transRedClr, border_color=redClr)
    if strategy.position_size >= 0
        strategy.entry("Short", strategy.short)

// New up fractal
if upFractal
    topBreakBlock := false
    isLongBreak := false
    topValue := high[n]
    // topLine := line.new(bar_index[n], topValue, bar_index, topValue, color=color.teal, style=line.style_dotted, width=2)
    // if not isLongBreak[1]
    //     line.delete(topLine[1])

// New down fractal
if downFractal
    bottomBreakBlock := false
    isShortBreak := false
    bottomValue := low[n]
    // bottomLine := line.new(bar_index[n], bottomValue, bar_index, bottomValue, color=color.maroon, style=line.style_dotted, width=2)
    // if not isShortBreak[1]
    //     line.delete(bottomLine[1])

// Box state update
// activeBoxes = box.all
// if array.size(activeBoxes) > 0 and changeColor
//     for i = 0 to array.size(activeBoxes) - 1
//         boxId = array.get(activeBoxes, i)
//         bVal = box.get_bottom(boxId)
//         tVal = box.get_top(boxId)
//         if close < bVal
//             box.set_bgcolor(boxId, transRedClr)
//             box.set_border_color(boxId, redClr)
//         if close > tVal
//             box.set_bgcolor(boxId, transGreenClr)
//             box.set_border_color(boxId, greenClr)

//PLOTS
plotshape(downFractal ,style=shape.triangleup, location=location.belowbar, offset=-n, color=color.new(color.gray,80), size = size.tiny)
plotshape(upFractal, style=shape.triangledown,   location=location.abovebar, offset=-n, color=color.new(color.gray,80), size = size.tiny)

// --- Checklist Table ---
// var table checklistTable = table.new(position.bottom_right, 2, 8, bgcolor=color.new(color.gray, 80), border_width=1)

// if barstate.islast
//     table.cell(checklistTable, 0, 0, "Condition", text_color=color.white, text_size=size.small, bgcolor=color.teal)
//     table.cell(checklistTable, 1, 0, "Status", text_color=color.white, text_size=size.small, bgcolor=color.teal)

//     table.cell(checklistTable, 0, 1, "Up Fractal", text_size=size.small)
//     table.cell(checklistTable, 1, 1, upFractal ? "✅" : "❌", text_color=upFractal ? color.green : color.red, text_size=size.small)

//     table.cell(checklistTable, 0, 2, "Down Fractal", text_size=size.small)
//     table.cell(checklistTable, 1, 2, downFractal ? "✅" : "❌", text_color=downFractal ? color.green : color.red, text_size=size.small)

//     table.cell(checklistTable, 0, 3, "Top Break", text_size=size.small)
//     table.cell(checklistTable, 1, 3, isLongBreak ? "✅" : "❌", text_color=isLongBreak ? color.green : color.red, text_size=size.small)

//     table.cell(checklistTable, 0, 4, "Bottom Break", text_size=size.small)
//     table.cell(checklistTable, 1, 4, isShortBreak ? "✅" : "❌", text_color=isShortBreak ? color.green : color.red, text_size=size.small)

//     table.cell(checklistTable, 0, 5, "Last Red Candle", text_size=size.small)
//     table.cell(checklistTable, 1, 5, close < open ? "✅" : "❌", text_color=close < open ? color.green : color.red, text_size=size.small)

//     table.cell(checklistTable, 0, 6, "Last Green Candle", text_size=size.small)
//     table.cell(checklistTable, 1, 6, close > open ? "✅" : "❌", text_color=close > open ? color.green : color.red, text_size=size.small)

//     table.cell(checklistTable, 0, 7, "Box Color Change Active", text_size=size.small)
//     table.cell(checklistTable, 1, 7, changeColor ? "✅" : "❌", text_color=changeColor ? color.green : color.red, text_size=size.small)
```

> Detail

https://www.fmz.com/strategy/476277

> Last Modified

2024-12-27 15:49:16
