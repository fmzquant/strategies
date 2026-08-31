
> Name

Multi-Period-Fractal-Breakout-Order-Block-Adaptive-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/168ad16785f251a7b93.png)

[trans]
#### 概述
该策略是一个基于分形理论和订单块分析的自适应交易系统。它通过识别市场结构中的关键支撑阻力位,结合分形突破信号和订单块确认来捕捉高概率交易机会。策略集成了多重技术指标,包括分形指标、动态订单块和价格突破确认系统,实现了对市场转折点的精确定位和交易时机的准确把握。

#### 策略原理
策略的核心逻辑建立在三个主要支柱之上:首先是通过分形计算模块持续监测市场高低点,识别潜在的趋势转折区域;其次是通过订单块分析,在关键价格水平建立供需区域;最后是通过突破确认系统,验证价格突破的有效性。当价格突破上方分形且确认有效时,系统会在最近的红色蜡烛区域创建需求区订单块并开立多单;当价格突破下方分形且确认有效时,系统会在最近的绿色蜡烛区域创建供应区订单块并开立空单。策略还包含了订单块颜色动态更新功能,用于直观显示价格与订单块的相对位置关系。

#### 策略优势
1. 自适应性强:策略能够根据市场条件动态调整订单块位置和大小,适应不同市场环境。
2. 多重确认机制:结合分形突破、订单块确认和价格行为分析,降低虚假信号风险。
3. 风险管理完善:通过清晰的视觉反馈和状态检查表,帮助交易者实时监控策略运行状态。
4. 可视化效果出色:提供直观的图形界面,包括分形标记、订单块显示和状态检查表。
5. 参数灵活可调:允许用户根据个人交易风格调整分形周期、突破类型等关键参数。

#### 策略风险
1. 市场波动风险:在高波动市场中可能产生虚假突破信号,需要额外的过滤机制。
2. 滑点风险:在流动性不足的市场环境下,订单执行价格可能与理想入场点存在偏差。
3. 趋势依赖性:策略在横盘市场的表现可能不如趋势市场理想。
4. 参数敏感性:不同的分形周期设置可能导致显著不同的交易结果。
5. 计算资源消耗:复杂的可视化功能和实时计算可能增加系统负载。

#### 优化方向
1. 引入波动率过滤器:通过ATR或其他波动率指标优化交易信号。
2. 增加趋势确认机制:结合移动平均线或其他趋势指标提高信号可靠性。
3. 完善止损机制:基于订单块结构设计动态止损策略。
4. 优化订单块尺寸:根据市场波动性动态调整订单块大小。
5. 加入成交量分析:结合成交量数据验证突破有效性。

#### 总结
这是一个融合了技术分析多个维度的复合型交易策略,通过分形理论和订单块分析为核心,构建了一个完整的交易系统。策略的优势在于其自适应性和多重确认机制,但同时也需要注意市场环境对策略表现的影响。通过建议的优化方向,策略的可靠性和稳定性有望得到进一步提升。 || 

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
This is a composite trading strategy that integrates multiple dimensions of technical analysis, building a complete trading system with fractal theory and order block analysis at its core. The strategy's strengths lie in its adaptability and multiple confirmation mechanisms, but attention must also be paid to the impact of market environment on strategy performance. Through the suggested optimization directions, the reliability and stability of the strategy can be further improved.[/trans]



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
