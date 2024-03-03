
> Name

彩虹震荡器交易策略Rainbow-Oscillator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14e36a681b5895a1bf0.png)
[trans]
### 概述

彩虹震荡器交易策略主要利用多个指数平滑移动平均线和震荡指标构建多层震荡通道,形成级别明确的多空信号,属于趋势跟踪类策略。该策略综合利用RSI、CCI、Stochastic和MA组合指标判断市场总体走势和超买超卖区域,属于多因子评级型策略。  

### 策略原理

1. 计算RSI、CCI、Stochastic三个指标值的加权平均,构建综合震荡指标Magic;
2. 对Magic指标做多次指数平滑处理,得到sampledMagicFast和sampledMagicSlow两条曲线; 
3. sampledMagicFast代表快速平均线,sampledMagicSlow代表慢速平均线;
4. 当sampledMagicFast上穿sampledMagicSlow时产生买入信号;
5. 当sampledMagicFast下穿sampledMagicSlow时产生卖出信号;
6. 计算最后一个bar的sampledMagicFast相对于前一个bar的变化方向,判断目前趋势;
7. 根据趋势方向和sampledMagicFast与sampledMagicSlow的交叉情况判断入场和出场时机。

### 策略优势

1. 综合多个指标判断市场总体走势,提高信号准确性;
2. 基于smoothed MA指标,有效抑制信号噪声; 
3. 震荡信号层层递进清晰,容易操作;
4. 结合趋势过滤,可配置成趋势跟踪或反转操作;
5. 可自定义超买超卖区域强度,适应性强。

### 策略风险 

1. 参数设置失误可能导致曲线过于平滑,错过最佳入场时机;
2. 超买超卖区域设置不当可能导致空仓时间过长;
3. 多因子评级中某些指标失效会削弱信号有效性。

对应解决方法:

1. 优化参数,使曲线平滑度适中;  
2. 调整超买超卖区域强度,降低空仓率;
3. 测试每个指标的预测能力,按权重调整。

### 策略优化方向

1. 基于行情特点动态调整指标参数;
2. 引入机器学习方法自动优化指标权重组合;  
3. 增加volume和波动率等因子过滤入场信号。

### 总结

彩虹震荡器策略综合多种指标信号,通过指数平滑处理提高稳定性。该策略可配置成适应趋势和震荡市,也可仅用于特定品种的震荡走势。通过参数优化和指标扩展,可进一步提升信号质量。总体来说,该策略逻辑清晰,使用简单,容易掌握。

||

### Overview

The Rainbow Oscillator trading strategy mainly uses multiple smoothed moving averages and oscillation indicators to build a multi-layer oscillation channel and generate clear long/short signals. It belongs to the trend-following strategy category. This strategy combines RSI, CCI, Stochastic and MA composite indicators to determine the overall market trend and overbought/oversold areas. It is a multi-factor rating strategy.

### Principles

1. Calculate the weighted average of RSI, CCI and Stochastic to build a combined oscillation indicator called Magic;  
2. Apply exponential smoothing to Magic multiple times to generate two lines called sampledMagicFast and sampledMagicSlow;
3. sampledMagicFast represents the fast EMA line, sampledMagicSlow represents the slow EMA line;
4. A buy signal is generated when sampledMagicFast crosses above sampledMagicSlow; 
5. A sell signal is generated when sampledMagicFast crosses below sampledMagicSlow;
6. Calculate the direction of the last bar's sampledMagicFast relative to previous bar to determine the current trend;
7. Determine entry and exit points based on trend direction and crossing situation between sampledMagicFast and sampledMagicSlow.

### Advantages

1. Combining multiple indicators to determine overall market trend improves signal accuracy;
2. Smoothed MA filters out noise effectively;
3. Multi-layer oscillation signals provide clear operation guidance;  
4. Can be configured for trend-following or mean-reversion by enabling/disabling trend filter;
5. Customizable overbought/oversold strength for flexibility.  

### Risks

1. Over-smoothed curves may cause missing best entry points;
2. Improper overbought/oversold area setting may keep position closed for too long; 
3. Failure of some factors in the rating model may weaken signals.

Solutions:

1. Optimize parameters for appropriate smoothing extent;
2. Adjust overbought/oversold area strength to reduce time in flat position;
3. Test and weight each indicator by its predictive power.  

### Optimization Directions 

1. Dynamically adjust indicator parameters based on market conditions;
2. Introduce machine learning methods to auto optimize indicator combinations;
3. Add factors like volume and volatility filters to entry signals.

### Conclusion

The Rainbow Oscillator strategy combines signals from multiple indicators and uses exponential smoothing to improve stability. It can be configured for both trending and sideways markets, or for specific products. Further improvements can be made by parameter tuning and indicator expansion. Overall this is a clear, easy-to-use strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|Use trend filter|
|v_input_float_1|0.33|RSI Weight|
|v_input_float_2|0.33|CCI Weight|
|v_input_float_3|0.33|Stoch Weight|
|v_input_int_1|16|Ocillograph Fast Period|
|v_input_int_2|22|Ocillograph Slow Period|
|v_input_int_3|8|Oscillograph Samples Period|
|v_input_int_4|2|Oscillograph Samples Count|
|v_input_string_1|0|Oscillograph Samples Type: RMA|SMA|EMA|WMA|
|v_input_int_5|26|Level Period|
|v_input_int_6|false|Level Offset|
|v_input_float_4|0.5|Level Redunant|
|v_input_int_7|2|Level Smooth Samples|
|v_input_string_2|0|Level MA type: RMA|SMA|EMA|WMA|
|v_input_float_5|5|% Take profit|
|v_input_float_6|2|% Stop Loss|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © businessduck

//@version=5
strategy("Rainbow Oscillator [Strategy]", overlay=false, margin_long=100, margin_short=100, initial_capital = 2000)

bool trendFilter = input.bool(true, 'Use trend filter')
float w1 = input.float(0.33, 'RSI Weight', 0, 1, 0.01)
float w2 = input.float(0.33, 'CCI Weight', 0, 1, 0.01)
float w3 = input.float(0.33, 'Stoch Weight', 0, 1, 0.01)
int fastPeriod = input.int(16, 'Ocillograph Fast Period', 4, 60, 1)
int slowPeriod = input.int(22, 'Ocillograph Slow Period', 4, 60, 1)
int oscillographSamplePeriod = input.int(8, 'Oscillograph Samples Period', 1, 30, 1)
int oscillographSamplesCount = input.int(2, 'Oscillograph Samples Count', 0, 4, 1)
string oscillographMAType = input.string("RMA", "Oscillograph Samples Type", options = ["EMA", "SMA", "RMA", "WMA"])
int levelPeriod = input.int(26, 'Level Period', 2, 100)
int levelOffset = input.int(0, 'Level Offset', 0, 200, 10)
float redunant = input.float(0.5, 'Level Redunant', 0, 1, 0.01)
int levelSampleCount = input.int(2, 'Level Smooth Samples', 0, 4, 1)
string levelType = input.string("RMA", "Level MA type", options = ["EMA", "SMA", "RMA", "WMA"])

perc(current, prev) => ((current - prev) / prev) * 100

smooth(value, type, period) =>
    float ma = switch type
        "EMA" => ta.ema(value, period)
        "SMA" => ta.sma(value, period)
        "RMA" => ta.rma(value, period)
        "WMA" => ta.wma(value, period)
        =>
            runtime.error("No matching MA type found.")
            float(na)

getSample(value, samples, type, period) =>
    float ma = switch samples
        0 => value
        1 => smooth(value, type, period)
        2 => smooth(smooth(value, type, period), type, period)
        3 => smooth(smooth(smooth(value, type, period), type, period), type, period)
        4 => smooth(smooth(smooth(smooth(value, type, period), type, period), type, period), type, period)

float takeProfit = input.float(5, "% Take profit", 0.8, 100, step = 0.1)  / 100
float stopLoss = input.float(2, "% Stop Loss", 0.8, 100, step = 0.1) / 100
float magicFast = w2 * ta.cci(close, fastPeriod) + w1 * (ta.rsi(close, fastPeriod) - 50) + w3 * (ta.stoch(close, high, low, fastPeriod) - 50)
float magicSlow = w2 * ta.cci(close, slowPeriod) + w1 * (ta.rsi(close, slowPeriod) - 50) + w3 * (ta.stoch(close, high, low, slowPeriod) - 50)
float sampledMagicFast = getSample(magicFast, oscillographSamplesCount, oscillographMAType, oscillographSamplePeriod)
float sampledMagicSlow = getSample(magicSlow, oscillographSamplesCount, oscillographMAType, oscillographSamplePeriod)
float lastUpperValue = 0
float lastLowerValue = 0

if (magicFast > 0)
    lastUpperValue := math.max(magicFast, magicFast[1])
else 
    lastUpperValue := math.max(0, lastUpperValue[1]) * redunant

    
if (magicFast <= 0)
    lastLowerValue := math.min(magicFast, magicFast[1])
else
    lastLowerValue := math.min(0, lastLowerValue[1]) * redunant

float level1up = getSample( (magicFast >= 0 ? magicFast : lastUpperValue) / 4, levelSampleCount, levelType, levelPeriod) + levelOffset
float level2up = getSample( (magicFast >= 0 ? magicFast : lastUpperValue) / 2, levelSampleCount, levelType, levelPeriod) + levelOffset
float level3up = getSample( magicFast >= 0 ? magicFast : lastUpperValue, levelSampleCount, levelType, levelPeriod) + levelOffset
float level4up = getSample( (magicFast >= 0 ? magicFast : lastUpperValue) * 2, levelSampleCount, levelType, levelPeriod) + levelOffset

float level1low = getSample( (magicFast <= 0 ? magicFast : lastLowerValue) / 4, levelSampleCount, levelType, levelPeriod) - levelOffset
float level2low = getSample( (magicFast <= 0 ? magicFast : lastLowerValue) / 2, levelSampleCount, levelType, levelPeriod) - levelOffset
float level3low = getSample( magicFast <= 0 ? magicFast : lastLowerValue, levelSampleCount, levelType, levelPeriod) - levelOffset
float level4low = getSample( (magicFast <= 0 ? magicFast : lastLowerValue) * 2, levelSampleCount, levelType, levelPeriod) - levelOffset

var transparent = color.new(color.white, 100)
var overbough4Color = color.new(color.red, 75)
var overbough3Color = color.new(color.orange, 75)
var overbough2Color = color.new(color.yellow, 75)

var oversold4Color = color.new(color.teal, 75)
var oversold3Color = color.new(color.blue, 75)
var oversold2Color = color.new(color.aqua, 85)

upperPlotId1 = plot(level1up, 'Upper1', transparent)
upperPlotId2 = plot(level2up, 'Upper2', transparent)
upperPlotId3 = plot(level3up, 'Upper3', transparent)
upperPlotId4 = plot(level4up, 'Upper4', transparent)

fastColor = color.new(color.teal, 60)
slowColor = color.new(color.red, 60)
fastPlotId = plot(sampledMagicFast, 'fast', color = fastColor)
slowPlotId = plot(sampledMagicSlow, 'slow', color = slowColor)

lowerPlotId1 = plot(level1low, 'Lower1', transparent)
lowerPlotId2 = plot(level2low, 'Lower2', transparent)
lowerPlotId3 = plot(level3low, 'Lower3', transparent)
lowerPlotId4 = plot(level4low, 'Lower4', transparent)

fill(upperPlotId4, upperPlotId3, overbough4Color)
fill(upperPlotId3, upperPlotId2, overbough3Color)
fill(upperPlotId2, upperPlotId1, overbough2Color)

fill(lowerPlotId4, lowerPlotId3, oversold4Color)
fill(lowerPlotId3, lowerPlotId2, oversold3Color)
fill(lowerPlotId2, lowerPlotId1, oversold2Color)

upTrend = sampledMagicFast > sampledMagicFast[1]
buySignal = ((upTrend or not trendFilter) and ta.crossunder(sampledMagicSlow, sampledMagicFast)) ? sampledMagicSlow : na
sellSignal = ((not upTrend or not trendFilter) and ta.crossover(sampledMagicSlow, sampledMagicFast)) ? sampledMagicSlow : na
diff = sampledMagicSlow - sampledMagicFast

fill(fastPlotId, slowPlotId, upTrend ? fastColor : slowColor)
plot(buySignal, color = color.aqua, style = plot.style_circles, linewidth = 4)
plot(sellSignal, color = color.red, style = plot.style_circles, linewidth = 4)


// longCondition = upTrend != upTrend[1] and upTrend
long_take_level = strategy.position_avg_price * (1 + takeProfit)
long_stop_level = strategy.position_avg_price * (1 - stopLoss)

short_take_level = strategy.position_avg_price * (1 - takeProfit)
short_stop_level = strategy.position_avg_price * (1 + stopLoss)

strategy.close(id="Long", when=sellSignal, comment = "Exit")
strategy.close(id="Short", when=buySignal, comment = "Exit")

strategy.entry("Long", strategy.long, when=buySignal)
strategy.entry("Short", strategy.short, when=sellSignal)

strategy.exit("Take Profit/ Stop Loss","Long", stop=long_stop_level, limit=long_take_level)
strategy.exit("Take Profit/ Stop Loss","Short", stop=short_stop_level, limit=short_take_level)


// plot(long_stop_level, color=color.red, overlay=true)
// plot(long_take_level, color=color.green)

```

> Detail

https://www.fmz.com/strategy/442652

> Last Modified

2024-02-23 14:57:43
