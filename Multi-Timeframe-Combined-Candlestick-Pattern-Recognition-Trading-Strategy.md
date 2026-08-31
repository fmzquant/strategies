
> Name

Multi-Timeframe-Combined-Candlestick-Pattern-Recognition-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ea6a0661febc99d158.png)

[trans]
#### 概述
该策略是一个基于K线形态识别的自动化交易系统。它集成了十种经典的K线形态,包括五种看涨形态(锤子线、多头吞没、刺透线、晨星和三白兵)和五种看跌形态(上吊线、空头吞没、乌云盖顶、暮星和三黑鸦)。策略通过对这些形态的实时识别和分析,为交易者提供潜在的市场反转信号和交易机会。

#### 策略原理
策略的核心是通过编程实现对各种K线形态的精确识别。每种形态都有其独特的数学定义和条件判断:
1. 对于单根K线形态(如锤子线、上吊线),主要基于实体与影线的比例关系进行判断
2. 对于两根K线形态(如吞没线、刺透线),通过比较相邻两根K线的开收盘价位置关系进行判断
3. 对于三根K线形态(如三白兵、三黑鸦),则需要同时满足连续三根K线的走势方向和位置关系
策略允许用户通过参数设置灵活选择启用或禁用特定形态的识别。

#### 策略优势
1. 全面性：涵盖了最具代表性的十种K线形态,能够捕捉不同类型的市场反转信号
2. 灵活性：用户可以根据市场环境和个人交易风格,自由选择需要识别的形态组合
3. 可视化：通过清晰的标记系统,直观显示各种形态的出现位置和类型
4. 自动化：完全程序化的判断过程,避免了人为判断的主观性和情绪化
5. 实用性：策略逻辑清晰,便于与其他技术指标或交易系统结合使用

#### 策略风险
1. 滞后性风险：K线形态的确认需要等待K线收盘,可能导致入场时机略有延迟
2. 假信号风险：在震荡市场中,单纯依靠K线形态可能产生较多虚假信号
3. 市场环境依赖：策略在趋势明显的市场中表现较好,但在横盘市场中可能效果欠佳
4. 参数设置风险：过多启用形态识别可能导致信号过于密集,影响判断
5. 止损控制风险：策略本身未包含完善的止损机制,需要额外的风险控制措施

#### 策略优化方向
1. 引入趋势过滤：结合移动平均线或趋势指标,过滤掉逆势信号
2. 增加成交量确认：通过成交量变化验证形态的有效性
3. 完善风险控制：添加动态止损和利润目标设置功能
4. 优化形态参数：针对不同市场和时间周期,调整形态识别的参数标准
5. 添加形态权重：根据不同形态的可靠性,设置不同的信号权重系统

#### 总结
这是一个设计合理、逻辑清晰的K线形态识别交易策略。它通过程序化方式实现了传统技术分析中最常用的K线形态判断,为交易者提供了一个客观、系统化的交易工具。虽然存在一些固有的局限性,但通过适当的优化和配合其他技术工具,该策略能够为交易决策提供有价值的参考信号。策略的模块化设计也为后续的功能扩展和性能优化提供了良好的基础。

|| 

#### Overview
This strategy is an automated trading system based on candlestick pattern recognition. It integrates ten classic candlestick patterns, including five bullish patterns (Hammer, Bullish Engulfing, Piercing Line, Morning Star, and Three White Soldiers) and five bearish patterns (Hanging Man, Bearish Engulfing, Dark Cloud Cover, Evening Star, and Three Black Crows). Through real-time identification and analysis of these patterns, the strategy provides traders with potential market reversal signals and trading opportunities.

#### Strategy Principle
The core of the strategy lies in its programmatic implementation of precise candlestick pattern recognition. Each pattern has its unique mathematical definition and condition criteria:
1. For single candlestick patterns (like Hammer, Hanging Man), judgment is primarily based on the ratio between body and shadow
2. For two-candlestick patterns (like Engulfing, Piercing Line), judgment is made by comparing the relative positions of adjacent candlesticks' open and close prices
3. For three-candlestick patterns (like Three White Soldiers, Three Black Crows), multiple conditions regarding trend direction and position relationships must be satisfied simultaneously
The strategy allows users to flexibly enable or disable specific pattern recognition through parameter settings.

#### Strategy Advantages
1. Comprehensiveness: Covers the most representative ten candlestick patterns, capable of capturing different types of market reversal signals
2. Flexibility: Users can freely choose pattern combinations based on market conditions and personal trading style
3. Visualization: Clear marking system provides intuitive display of pattern locations and types
4. Automation: Fully programmed judgment process eliminates subjective and emotional human judgment
5. Practicality: Clear strategy logic facilitates combination with other technical indicators or trading systems

#### Strategy Risks
1. Lag Risk: Pattern confirmation requires waiting for candle closure, potentially causing slight entry delays
2. False Signal Risk: Relying solely on candlestick patterns may generate numerous false signals in choppy markets
3. Market Environment Dependency: Strategy performs better in trending markets but may underperform in ranging markets
4. Parameter Setting Risk: Enabling too many pattern recognitions may lead to overcrowded signals affecting judgment
5. Stop Loss Control Risk: Strategy lacks built-in comprehensive stop-loss mechanisms, requiring additional risk control measures

#### Strategy Optimization Directions
1. Implement Trend Filtering: Combine with moving averages or trend indicators to filter out counter-trend signals
2. Add Volume Confirmation: Validate pattern effectiveness through volume changes
3. Enhance Risk Control: Add dynamic stop-loss and profit target setting functionality
4. Optimize Pattern Parameters: Adjust pattern recognition parameters for different markets and timeframes
5. Add Pattern Weighting: Set up different signal weighting systems based on pattern reliability

#### Summary
This is a well-designed and logically clear candlestick pattern recognition trading strategy. It implements traditional technical analysis's most commonly used candlestick pattern judgments through programming, providing traders with an objective and systematic trading tool. While it has some inherent limitations, through appropriate optimization and combination with other technical tools, this strategy can provide valuable reference signals for trading decisions. The strategy's modular design also provides a good foundation for subsequent functional expansion and performance optimization.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-10 00:00:00
end: 2024-12-09 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// Author: Raymond Ngobeni
strategy('Candlestick Pattern Strategy [Ubaton]', 'Ubaton - Candlestick Pattern Strategy', overlay = true, max_labels_count = 500, max_lines_count = 500, max_boxes_count = 500)

// User Inputs: Enable/Disable Patterns
// Bullish Patterns
enableHammer = input.bool(true, "Show Hammer")
enableBullEngulfing = input.bool(true, "Show Bullish Engulfing")
enablePiercingLine = input.bool(true, "Show Piercing Line")
enableMorningStar = input.bool(true, "Show Morning Star")
enableThreeWhiteSoldiers = input.bool(true, "Show Three White Soldiers")

// Bearish Patterns
enableHangingMan = input.bool(true, "Show Hanging Man")
enableBearEngulfing = input.bool(true, "Show Bearish Engulfing")
enableDarkCloudCover = input.bool(true, "Show Dark Cloud Cover")
enableEveningStar = input.bool(true, "Show Evening Star")
enableThreeBlackCrows = input.bool(true, "Show Three Black Crows")

// Helper Functions
isHammer() =>
    bodySize = math.abs(open - close)
    shadowSize = low < math.min(open, close) ? math.min(open, close) - low : na
    shadowSize >= 2 * bodySize and high - math.max(open, close) <= bodySize

isBullishEngulfing() =>
    close[1] < open[1] and close > open and open <= close[1] and close >= open[1]

isPiercingLine() =>
    close[1] < open[1] and close > close[1] + (open[1] - close[1]) * 0.5 and close < open[1]

isMorningStar() =>
    close[2] < open[2] and math.abs(close[1] - open[1]) < (high[1] - low[1]) * 0.3 and close > open

isThreeWhiteSoldiers() =>
    close > open and close[1] > open[1] and close[2] > open[2] and open > close[1] and open[1] > close[2]

isHangingMan() =>
    bodySize = math.abs(open - close)
    shadowSize = low < math.min(open, close) ? math.min(open, close) - low : na
    shadowSize >= 2 * bodySize and high - math.max(open, close) <= bodySize and close < open

isBearishEngulfing() =>
    close[1] > open[1] and close < open and open >= close[1] and close <= open[1]

isDarkCloudCover() =>
    close[1] > open[1] and open > close[1] and close < open[1] and close < close[1] + (open[1] - close[1]) * 0.5

isEveningStar() =>
    close[2] > open[2] and math.abs(close[1] - open[1]) < (high[1] - low[1]) * 0.3 and close < open

isThreeBlackCrows() =>
    close < open and close[1] < open[1] and close[2] < open[2] and open < close[1] and open[1] < close[2]

// Detect Patterns
// Bullish
hammerDetected = enableHammer and isHammer()
bullEngulfDetected = enableBullEngulfing and isBullishEngulfing()
piercingDetected = enablePiercingLine and isPiercingLine()
morningStarDetected = enableMorningStar and isMorningStar()
threeWhiteDetected = enableThreeWhiteSoldiers and isThreeWhiteSoldiers()

// Bearish
hangingManDetected = enableHangingMan and isHangingMan()
bearEngulfDetected = enableBearEngulfing and isBearishEngulfing()
darkCloudDetected = enableDarkCloudCover and isDarkCloudCover()
eveningStarDetected = enableEveningStar and isEveningStar()
threeBlackDetected = enableThreeBlackCrows and isThreeBlackCrows()

// Plot Bullish Patterns
plotshape(enableHammer and hammerDetected, title="Hammer", location=location.belowbar, color=color.green, style=shape.labelup, text="Hammer")
plotshape(enableBullEngulfing and bullEngulfDetected, title="Bullish Engulfing", location=location.belowbar, color=color.green, style=shape.labelup, text="Engulf")
plotshape(enablePiercingLine and piercingDetected, title="Piercing Line", location=location.belowbar, color=color.green, style=shape.labelup, text="Piercing")
plotshape(enableMorningStar and morningStarDetected, title="Morning Star", location=location.belowbar, color=color.green, style=shape.labelup, text="Morning")
plotshape(enableThreeWhiteSoldiers and threeWhiteDetected, title="Three White Soldiers", location=location.belowbar, color=color.green, style=shape.labelup, text="3 Soldiers")

// Plot Bearish Patterns
plotshape(enableHangingMan and hangingManDetected, title="Hanging Man", location=location.abovebar, color=color.red, style=shape.labeldown, text="Hanging")
plotshape(enableBearEngulfing and bearEngulfDetected, title="Bearish Engulfing", location=location.abovebar, color=color.red, style=shape.labeldown, text="Engulf")
plotshape(enableDarkCloudCover and darkCloudDetected, title="Dark Cloud Cover", location=location.abovebar, color=color.red, style=shape.labeldown, text="Dark Cloud")
plotshape(enableEveningStar and eveningStarDetected, title="Evening Star", location=location.abovebar, color=color.red, style=shape.labeldown, text="Evening")
plotshape(enableThreeBlackCrows and threeBlackDetected, title="Three Black Crows", location=location.abovebar, color=color.red, style=shape.labeldown, text="3 Crows")

// Strategy Execution
if hammerDetected or bullEngulfDetected or piercingDetected or morningStarDetected or threeWhiteDetected
    strategy.entry("Bullish Entry", strategy.long)

if hangingManDetected or bearEngulfDetected or darkCloudDetected or eveningStarDetected or threeBlackDetected
    strategy.entry("Bearish Entry", strategy.short)
```

> Detail

https://www.fmz.com/strategy/474631

> Last Modified

2024-12-11 11:04:35
