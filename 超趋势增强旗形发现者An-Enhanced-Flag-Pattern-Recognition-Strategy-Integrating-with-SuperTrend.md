
> Name

超趋势增强旗形发现者An-Enhanced-Flag-Pattern-Recognition-Strategy-Integrating-with-SuperTrend

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14d3addfdabb74b5beb.png)
[trans]

概述:该策略顺势突破旗形模式与著名的超趋势指标巧妙结合,实现了一种独特的旗形识别方法。它不仅可以发现传统的旗形,还能利用超趋势指标判断趋势方向以及潜在止损位置。

策略原理:
1. 旗形识别
- 通过动态追踪最高价和最低价,识别出旗杆和整理区
- 根据用户设定的参数判断整理区域的深度/拉升幅度、旗形长度是否符合要求
- 一旦旗形形成,用相应颜色的线段标记出来

2. 超趋势集成
- 应用简单有效的超趋势指标,实时显示图表上的趋势动向
- 结合旗形的方向判断,可以确认旗形方向的正确性
- 同时超趋势线也为交易提供潜在的止损位置

综上,这种旗形与超趋势的 Zero-Lag 整合,实现了一种易于使用的趋势跟踪策略,可谓融会贯通,旗形识别与超趋势止损完美结合。

策略优势:
1. 融合传统技术分析与趋势跟随
这种旗形与超趋势的整合,兼顾了图形识别与动量跟随,是一种独特的混合策略。

2. 提供潜在的止损位置
超趋势为每笔交易提供清晰的止损位置,有助于策略的风险管理。 

3. 方便使用
该策略提供了一系列可调参数,使用者可以根据自己的交易偏好进行定制。操作简单,易于掌握。

4. 全面支持多空双向交易
策略同时支持看涨与看跌操作,适用于任何市场环境,可谓非常全面。

策略风险:
1. 旗形败坏
当旗形整理超过设定参数或向原趋势方向延伸时,会出现旗形败坏,导致错误信号。

2. 超趋势滞后识别转折点
超趋势线存在一定程度的滞后性,在趋势转折点时可能出现较大滑点。

3. 参数优化
不同参数设置会对策略表现产生较大影响,需要通过优化找到最佳参数组合。

4. 交易方向偏向
如果仅选择单边交易,则会限制策略的应用范围。建议采用双边交易。

策略优化方向:
1. 测试不同的超趋势参数组合,找到最佳参数;
2. 优化旗形参数,使旗形识别更准确可靠;  
3. 尝试结合其他指标,如平均线、K线模型等,丰富策略;
4. 增加止损策略、仓位管理等模块,提高策略的稳定性。

总结:
该超趋势增强旗形识别策略,是一种独特的旗形与超趋势的混合趋势策略。它兼顾了图形识别的先导性与超趋势动量跟随的时效性,实现了传统技术分析与数字化量化的完美结合。易于使用的设定使其可以广泛应用于多种交易品种,而可调参数也让交易者可以按照自己的偏好进行个性化定制。总体而言,这是一种融会贯通,实用性极强的旗形识别策略。


||

Overview: This strategy ingeniously combines the flag pattern breakout method with the renowned SuperTrend indicator to achieve a unique flag recognition approach. It can not only identify traditional flag patterns, but also utilize the SuperTrend indicator to determine the trend direction and set potential stop loss levels.  

Strategy Logic:
1. Flag Pattern Recognition 
- Dynamically track highs and lows to identify flagpoles and consolidations
- Check if consolidation depth/rally and flag length meet the required criteria based on user-defined inputs
- Visualize identified flag patterns with corresponding color lines

2. SuperTrend Integration
- Apply the simple yet effective SuperTrend indicator to display the prevailing trend direction on the chart  
- Confirm flag pattern direction combined with SuperTrend 
- Provide potential stop loss levels for trades

The seamless integration of flag patterns and the zero-lag SuperTrend creates an easy-to-use trend following strategy, harmoniously combining flag recognition and SuperTrend stop loss.


Advantages:
1. Blend of Traditional and Modern Techniques
The fusion of classical chart pattern analysis and modern trend following techniques makes this a truly unique hybrid strategy.  

2. Built-in Risk Management  
The SuperTrend sets clear stop loss levels for each trade, enhancing the risk management capabilities.

3. Easy-to-use
The strategy offers a range of customizable parameters for traders to tune it to their preferences and trading style. Simple yet powerful.

4. Comprehensive Dual Direction Trading
Simultaneous support for long and short trades makes this strategy universally applicable across all market environments. 

Risks:
1. Failed Flags 
Flags may fail when the consolidation extends beyond the defined parameters, resulting in bad signals.

2. SuperTrend Lagging
The SuperTrend line has some lag in catching trend reversals. Larger slippage may occur around turning points. 

3. Parameter Dependence  
The strategy performance varies significantly with different parameter settings. Extensive optimization is needed to find the optimum parameters.  

4. Directional Bias
Selecting only one directional trading limits the scope of application. Two-way trading is recommended.


Enhancement Opportunities:
1. Test different combinations of SuperTrend parameters to find the optimal set.
2. Refine flag criteria to improve pattern recognition accuracy. 
3. Incorporate other indicators like moving averages, candlestick patterns etc. to create a more versatile strategy.  
4. Introduce protective stops, position sizing etc. to make the strategy more robust.

Conclusion:  
The SuperTrend Enhanced Flag Finder strategy uniquely merges the predictive power of chart pattern analysis with the timeliness of SuperTrend momentum following. The tunable parameters provide tremendous customizability for traders to tailor it to their personal preferences and trading assets, while the easy-to-use design makes it accessible for broad applications. Overall an ingeniously integrated, highly practical flag pattern recognition strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Trading Direction: Both|Short|Long|
|v_input_1|10|(?SuperTrend Criteria)Supertrend Length|
|v_input_float_1|4|Supertrend Factor|
|v_input_float_2|5|(?Bull Flag Criteria)Max Flag Depth|
|v_input_int_1|7|Max Flag Length|
|v_input_int_2|3|Min Flag Length|
|v_input_float_3|3|Prior Uptrend Minimum|
|v_input_int_3|13|Max Flag Pole Length|
|v_input_int_4|7|Min Flag Pole Length|
|v_input_float_4|5|(?Bear Flag Criteria)Max Flag Rally|
|v_input_int_5|7|Max Flag Length|
|v_input_int_6|3|Min Flag Length|
|v_input_float_5|3|Prior Downtrend Minimum|
|v_input_int_7|13|Max Flag Pole Length|
|v_input_int_8|7|Min Flag Pole Length|
|v_input_bool_1|true|(?Bull Flag Display Options)Show Bull Flags|
|v_input_bool_2|true|Show Bull Flag Breakouts|
|v_input_color_1|green|Bull Line Color|
|v_input_int_9|2|Bull Line Width|
|v_input_bool_3|true|(?Bear Flag Display Options)Show Bear Flags|
|v_input_bool_4|true|Show Bear Flag Breakdowns|
|v_input_color_2|red|Bear Flag Line Color|
|v_input_int_10|2|Bear Flag Line Width|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-24 00:00:00
end: 2023-12-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Amphibiantrading

//@version=5
strategy("TrendGuard Flag Finder - Strategy [presentTrading]", overlay = true, precision=3, default_qty_type=strategy.cash, 
 commission_value= 0.1, commission_type=strategy.commission.percent, slippage= 1, 
  currency=currency.USD, default_qty_type = strategy.percent_of_equity, default_qty_value = 10, initial_capital= 10000)

//inputs
//user controlled settings for the indicator, separated into 4 different groups 

// Add a button to choose the trading direction
tradingDirection = input.string("Both","Trading Direction", options=["Long", "Short", "Both"])

// Supertrend parameters
SupertrendPeriod = input(10, "Supertrend Length",group ='SuperTrend Criteria')
SupertrendFactor = input.float(4.0, "Supertrend Factor", step = 0.01,group ='SuperTrend Criteria')

// Flag parameters
var g1 = 'Bull Flag Criteria'

max_depth = input.float(5, 'Max Flag Depth', step = .25, minval = 2.0, group = g1, tooltip = 'Maximum pullback allowed from flag high to flag low')
max_flag = input.int(7, 'Max Flag Length', group = g1, tooltip = 'The maximum number of bars the flag can last')
min_flag = input.int(3, 'Min Flag Length', group = g1, tooltip = 'The minimum number of bars required for the flag')
poleMin = input.float(3.0, 'Prior Uptrend Minimum', group = g1, tooltip = 'The minimum percentage gain required before a flag forms')
poleMaxLen = input.int(13, 'Max Flag Pole Length', minval = 1, group = g1, tooltip = 'The maximum number of bars the flagpole can be')
poleMinLen = input.int(7, 'Min Flag Pole Length', minval = 1, group = g1, tooltip = 'The minimum number of bars required for the flag pole')

var g2 = 'Bear Flag Criteria'

max_rally = input.float(5, 'Max Flag Rally', step = .25, minval = 2.0, group = g2, tooltip = 'Maximum rally allowed from flag low to flag low')
max_flagBear = input.int(7, 'Max Flag Length', group = g2, tooltip = 'The maximum number of bars the flag can last')
min_flagBear = input.int(3, 'Min Flag Length', group = g2, tooltip = 'The minimum number of bars required for the flag')
poleMinBear = input.float(3.0, 'Prior Downtrend Minimum', group = g2, tooltip = 'The minimum percentage loss required before a flag forms')
poleMaxLenBear = input.int(13, 'Max Flag Pole Length', minval = 1, group = g2, tooltip = 'The maximum number of bars the flagpole can be')
poleMinLenBear = input.int(7, 'Min Flag Pole Length', minval = 1, group = g2, tooltip = 'The minimum number of bars required for the flag pole')

var g3 = 'Bull Flag Display Options'

showF = input.bool(true, 'Show Bull Flags', group = g3)
showBO = input.bool(true,'Show Bull Flag Breakouts', group = g3)
lineColor = input.color(color.green, 'Bull Line Color', group = g3)
lineWidth = input.int(2, 'Bull Line Width', minval = 1, maxval = 5, group = g3)

var g4 = 'Bear Flag Display Options'

showBF = input.bool(true, 'Show Bear Flags', group = g4)
showBD = input.bool(true,'Show Bear Flag Breakdowns', group = g4)
lineColorBear = input.color(color.red, 'Bear Flag Line Color', group = g4)
lineWidthBear = input.int(2, 'Bear Flag Line Width', minval = 1, maxval = 5, group = g4)



//variables 
//declare starting variables used for identfying flags
var baseHigh = high, var startIndex = 0, var flagLength = 0, var baseLow = low 
var lowIndex = 0, var flagBool = false, var poleLow = 0.0, var poleLowIndex = 0
var line flagHLine = na, var line flagLLine = na, var line flagPLine = na

// bear flag variables
var flagLowBear = high, var startIndexBear = 0, var flagLengthBear = 0, var flagHigh = low 
var highIndex = 0, var flagBoolBear = false, var poleHigh = 0.0, var polehighIndex = 0
var line flagBearHLine = na, var line flagBearLLine = na, var line flagBearPLine = na

//find bull flag highs
// check to see if the current bars price is higher than the previous base high or na and then sets the variables needed for flag detection
if high > baseHigh or na(baseHigh)
    baseHigh := high
    startIndex := bar_index
    flagLength := 0
    baseLow := low
    lowIndex := bar_index
// check to see if the low of the current bar is lower than the base low, if it is set the base low to the low
if high <= baseHigh and low < baseLow
    baseLow := low
    lowIndex := bar_index
// moves the base low from the base high bar_index to prevent the high and low being the same bar
if high <= baseHigh and lowIndex == startIndex
    baseLow := low
    lowIndex := bar_index

//find bear flag lows
// check to see if the current bars price is lower than the previous flag low or na and then sets the variables needed for flag detection
if low < flagLowBear or na(flagLowBear)
    flagLowBear := low
    startIndexBear := bar_index
    flagLengthBear := 0
    flagHigh := high
    highIndex := bar_index
// check to see if the high of the current bar is higher than the flag high, if it is set the flag high to the high
if low >= flagLowBear and high > flagHigh
    flagHigh := high
    highIndex := bar_index
// moves the flag high from the flag low bar_index to prevent the high and low being the same bar
if low >= flagLowBear and highIndex == startIndexBear
    flagHigh := high
    highIndex := bar_index

//calulations bullish
findDepth = math.abs(((baseLow / baseHigh) - 1) * 100)  //calculate the depth of the flag
poleDepth = ((baseHigh / poleLow)- 1) * 100 // calculate the low of the flag pole to the base high
lower_close = close < close[1] // defines a lower close

//calculations bearish
findRally = math.abs(((flagHigh / flagLowBear) - 1) * 100)   //calculate the rally of the flag
poleDepthBear = ((flagLowBear / poleHigh)- 1) * 100 // calculate the high of the flag pole to the low high
higher_close = close > close[1] // defines a higher close

//start the counters
// begins starting bars once a high is less than the flag high
if high < baseHigh and findDepth <= max_depth or (high == baseHigh and lower_close)
    flagLength += 1
else   
    flagLength := 0

// begins starting bars once a low is higher than the flag low
if low > flagLowBear and findRally <= max_rally or (low == flagLowBear and higher_close)
    flagLengthBear += 1
else   
    flagLengthBear := 0

// check for prior uptrend / downtrend to meet requirements
// loops through all the bars from the minimum pole length to the maximum pole length to check if the prior uptrend requirements are met and sets the variables to their new values
if high == baseHigh 
    for i = poleMinLen to poleMaxLen
        if ((high / low[i]) - 1) * 100 >= poleMin
            flagBool := true
            poleLow := low[i]
            poleLowIndex := bar_index[i]
            break

// loops through all the bars from the minimum pole length to the maximum pole length to check if the prior downtrend requirements are met and sets the variables to their new values
if low == flagLowBear 
    for i = poleMinLenBear to poleMaxLenBear
        if math.abs(((low / high[i]) - 1) * 100) >= poleMinBear
            flagBoolBear := true
            poleHigh := high[i]
            polehighIndex := bar_index[i]
            break


// reset variables if criteria for a flag is broken
// if the depth of the bull flag is greater than the maximum depth limit or the flag lasts longer than the maximum length everything is reset to beging looking for a new flag
if findDepth >= max_depth or flagLength > max_flag
    flagBool := false
    flagLength := 0
    baseHigh := na
    startIndex := na
    lowIndex := na
    baseLow := na

// if the rally of the bear flag is greater than the maximum rally limit or the flag lasts longer than the maximum length everything is reset to beging looking for a new flag
if findRally >= max_rally or flagLengthBear > max_flagBear
    flagBoolBear := false
    flagLengthBear := 0
    flagLowBear := na
    startIndexBear := na
    highIndex := na
    flagHigh := na

// reset the variables and begin looking for a new bull flag if price continues higher before the minimum flag length requirement is met
if high > baseHigh[1] and flagLength < min_flag
    baseHigh := high
    flagLength := 0
    startIndex := bar_index
    lowIndex := bar_index
    baseLow := low

// reset the variables and begin looking for a new bear flag if price continues lower before the minimum bear flag length requirement is met
if low < flagLowBear[1] and flagLengthBear < min_flagBear
    flagLowBear := low
    flagLengthBear := 0
    startIndexBear := bar_index
    highIndex := bar_index
    flagHigh := high


//define the flags
// if all requirements are met a bull flag is true, flagBool is true, flag length is less than maximum set length and more than miminum required. The prior run up also meets the requirements for length and price
flag = flagBool == true and flagLength < max_flag and findDepth < max_depth and flagLength >= min_flag and startIndex - poleLowIndex <= poleMaxLen

// if all requirements are met a bear flag is true, flagBoolBear is true, flag length is less than maximum set length and more than miminum required. The prior downtrend also meets the requirements for length and price
bearFlag = flagBoolBear == true and flagLengthBear < max_flagBear and findRally < max_rally and flagLengthBear >= min_flagBear and startIndexBear - polehighIndex <= poleMaxLen


//define flags, breakouts, breadowns
// a breakout is defined as the high going above the flag high and the length of the flag is greater than the minimum requirement. The flag boolean must also be true
breakout = high > baseHigh[1] and flagLength >= min_flag and flagBool == true
//a breakdown is defined as the depth of the flag being larger than user set parameter or the length of the flag exceeded the maximum flag length
breakdown = findDepth >= max_depth or flagLength > max_flag
// a separate variable to have breakouts only plot once using a plotshape
plotBO = flag[1] and high > baseHigh[1] and flagLength[1] >= min_flag and flagBool == true

// a bear flag breakout is defined as the low going below the flag low and the length of the flag is greater than the minimum requirement. The flag boolean must also be true
breakoutBear = low < flagLowBear[1] and flagLengthBear >= min_flagBear and flagBoolBear == true
//a breakdown is defined as the rally of the flag being larger than user set parameter or the length of the flag exceeded the maximum flag length
breakdownBear = findRally >= max_rally or flagLengthBear > max_flagBear
// a separate variable to have breakouts only plot once using a plotshape
plotBD = bearFlag[1] and low < flagLowBear[1] and flagLengthBear[1] >= min_flagBear and flagBoolBear == true

// // if a bul flag is detected and the user has bull flags selected from the settings menu draw it on the chart
// if flag and showF
//     //if a flag was detected on the previous bar, delete those lines and allow for new lines to be drawn
//     if flag[1]
//         line.delete(flagHLine[1]), line.delete(flagLLine[1]), line.delete(flagPLine[1])
//     //draw new lines
//     flagHLine := line.new(startIndex, baseHigh, bar_index, baseHigh, color=lineColor, width = lineWidth)
//     flagLLine := line.new(startIndex, baseLow, bar_index, baseLow, color=lineColor, width = lineWidth)
//     flagPLine := line.new(poleLowIndex +1, poleLow, startIndex , baseLow, color=lineColor, width = lineWidth)

// // if a bear flag is detected and the user has bear flags selected from the settings menu draw it on the chart
// if bearFlag and showBF
//     //if a bear flag was detected on the previous bar, delete those lines and allow for new lines to be drawn
//     if bearFlag[1]
//         line.delete(flagBearHLine[1]), line.delete(flagBearLLine[1]), line.delete(flagBearPLine[1])
//     //draw new lines
//     flagBearHLine := line.new(startIndexBear, flagHigh, bar_index, flagHigh, color=lineColorBear, width = lineWidthBear)
//     flagBearLLine := line.new(startIndexBear, flagLowBear, bar_index, flagLowBear, color=lineColorBear, width = lineWidthBear)
//     flagBearPLine := line.new(polehighIndex + 1, poleHigh, startIndexBear , flagHigh, color=lineColorBear, width = lineWidthBear)

//reset variables if a breakout occurs
if breakout // bull flag - high gets above flag high
    flagLength := 0
    baseHigh := high
    startIndex := bar_index
    lowIndex := bar_index
    baseLow := low

if breakoutBear // bear flag - low gets below flag low
    flagLengthBear := 0
    flagLowBear := low
    startIndexBear := bar_index
    highIndex := bar_index
    flagHigh := high

//reset the variables and highs from a failed bull flag. This allows stocks below previous highs to find new flags
highest = ta.highest(high, 10) // built in variable that finds the highest high lookingback the past 10 bars
if breakdown or flagLength == max_flag
    flagBool := false
    baseHigh := highest
    startIndex := bar_index
    lowIndex := bar_index
    baseLow := low

//reset the variables and lows from a failed bear flag. This allows stocks above previous lows to find new flags
lowest = ta.lowest(low, 10) // built in variable that finds the lowest low lookingback the past 10 bars
if breakdownBear or flagLengthBear == max_flagBear
    flagBoolBear := false
    flagLowBear := lowest
    startIndexBear := bar_index
    highIndex := bar_index
    flagHigh := high

// if a flag breakdowns remove the lines from the chart
// if (breakdown and flag[1])
//     line.delete(flagHLine)
//     line.delete(flagLLine)
//     line.delete(flagPLine)

// if (breakdownBear and bearFlag[1])
//     line.delete(flagBearHLine)
//     line.delete(flagBearLLine)
//     line.delete(flagBearPLine)

//plot breakouts
// use a plotshape to check if there is a breakout and the show breakout option is selected. If both requirements are met plot a shape at the breakout bar
plotshape(plotBO and showBO and showF, 'Breakout', shape.triangleup, location.belowbar, color.green)

// use a plotshape to check if there is a breakout and the show breakout option is selected. If both requirements are met plot a shape at the breakout bar
plotshape(plotBD and showBD and showBF, 'Breakout', shape.triangledown, location.abovebar, color.red)

// Define entry and exit conditions based on the indicator
bullishEntryFlag = plotBO and showBO and showF
bearishEntryFlag = plotBD and showBD and showBF

// Calculate Supertrend
[supertrend, direction] = ta.supertrend(SupertrendFactor, SupertrendPeriod)

bodyMiddle = plot((open + close) / 2, display=display.none)
upTrend = plot(direction < 0 ? supertrend : na, "Up Trend", color = color.green, style=plot.style_linebr)
downTrend = plot(direction < 0? na : supertrend, "Down Trend", color = color.red, style=plot.style_linebr)

fill(bodyMiddle, upTrend, color.new(color.green, 90), fillgaps=false)
fill(bodyMiddle, downTrend, color.new(color.red, 90), fillgaps=false)

// Define entry and exit conditions based on the indicator
bullishEntryST = direction < 0
bearishEntryST = direction > 0 

// Entry
bullishEntry = bullishEntryFlag and bullishEntryST
bearishEntry = bearishEntryFlag and bearishEntryST

// Modify entry and exit conditions based on the selected trading direction
if (bullishEntry and (tradingDirection == "Long" or tradingDirection == "Both"))
    strategy.entry("Buy", strategy.long)
    strategy.exit("Sell", "Buy", stop=supertrend)
if (bearishEntry and (tradingDirection == "Short" or tradingDirection == "Both"))
    strategy.entry("Sell", strategy.short)
    strategy.exit("Cover", "Sell", stop=supertrend)

// Exit conditions
if (strategy.position_size > 0 and bearishEntry and (tradingDirection == "Long" or tradingDirection == "Both")) // If in a long position and bearish entry condition is met
    strategy.close("Buy")
if (strategy.position_size < 0 and bullishEntry and (tradingDirection == "Short" or tradingDirection == "Both")) // If in a short position and bullish entry condition is met
    strategy.close("Sell")
```

> Detail

https://www.fmz.com/strategy/436482

> Last Modified

2023-12-25 11:16:38
