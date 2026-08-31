
> Name

Multi-Timeframe-Trading-Strategy-Combining-Harmonic-Patterns-and-Williams-R

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/185d41f30d36d1ab289.png)

[trans]
#### 概述
该策略是一个结合了谐波模式和威廉指标(WPR)的高级交易系统。它通过识别市场中的谐波形态(如Gartley、蝙蝠、螃蟹和蝴蝶模式)，并结合威廉指标的超买超卖水平来确定交易入场和出场时机。策略采用了多重确认机制，通过技术指标的协同作用来提高交易的准确性和可靠性。

#### 策略原理
策略的核心逻辑包含以下几个关键部分:
1. 谐波模式识别：使用价格转折点来识别潜在的谐波形态，通过分析高点和低点的关系来确定市场结构。
2. 威廉指标计算：采用自定义周期计算威廉指标，通过分析最高价、最低价和收盘价之间的关系来判断市场状态。
3. 入场条件：
   - 多头入场：当出现看涨谐波形态且威廉指标处于超卖区域时
   - 空头入场：当出现看跌谐波形态且威廉指标处于超买区域时
4. 风险管理：使用基于近期低点/高点的动态止损，并通过风险收益比来设定止盈位置。

#### 策略优势
1. 多维度分析：结合了形态分析和动量指标，提供了更可靠的交易信号。
2. 风险控制完善：采用动态止损和基于风险收益比的止盈设置，有效控制每笔交易的风险。
3. 适应性强：通过参数优化可以适应不同的市场环境和交易品种。
4. 信号确认机制：通过谐波模式和威廉指标的双重确认，降低了虚假信号的影响。

#### 策略风险
1. 模式识别风险：简化的谐波模式识别可能导致某些形态的误判。
2. 参数敏感性：多个参数的设置需要careful优化，不当的参数可能影响策略表现。
3. 市场环境依赖：在剧烈波动或横盘市场中可能表现不佳。
4. 信号滞后：基于技术指标的信号可能存在一定的滞后性。

#### 策略优化方向
1. 模式识别增强：
   - 添加更严格的谐波比率验证
   - 引入价格结构分析来提高形态识别准确度
2. 信号过滤：
   - 增加趋势过滤器
   - 考虑加入波动率指标来适应不同市场环境
3. 风险管理优化：
   - 实现动态的风险收益比调整
   - 增加基于市场波动的仓位管理

#### 总结
该策略通过结合谐波模式和威廉指标，构建了一个较为完整的交易系统。其优势在于多维度的分析方法和完善的风险控制机制，但仍需要注意参数优化和市场环境适应性的问题。通过建议的优化方向，策略的稳定性和可靠性有望得到进一步提升。 || 

#### Overview
This strategy is an advanced trading system that combines Harmonic Patterns with the Williams Percent Range (WPR) indicator. It identifies harmonic formations (such as Gartley, Bat, Crab, and Butterfly patterns) in the market and uses WPR's overbought/oversold levels to determine trade entry and exit points. The strategy employs multiple confirmation mechanisms, utilizing the synergy of technical indicators to enhance trading accuracy and reliability.

#### Strategy Principles
The core logic includes several key components:
1. Harmonic Pattern Recognition: Uses price pivot points to identify potential harmonic formations by analyzing the relationships between highs and lows.
2. Williams %R Calculation: Employs a custom period for calculating WPR, analyzing relationships between high, low, and closing prices to determine market conditions.
3. Entry Conditions:
   - Long Entry: When a bullish harmonic pattern appears and WPR is in oversold territory
   - Short Entry: When a bearish harmonic pattern appears and WPR is in overbought territory
4. Risk Management: Implements dynamic stop-loss based on recent lows/highs and sets take-profit levels using risk-reward ratios.

#### Strategy Advantages
1. Multi-dimensional Analysis: Combines pattern analysis with momentum indicators for more reliable trading signals.
2. Robust Risk Control: Uses dynamic stop-loss and risk-reward based take-profit settings to effectively control risk per trade.
3. High Adaptability: Can be adapted to different market environments and instruments through parameter optimization.
4. Signal Confirmation Mechanism: Reduces false signals through dual confirmation using harmonic patterns and WPR.

#### Strategy Risks
1. Pattern Recognition Risk: Simplified harmonic pattern recognition may lead to misidentification of some formations.
2. Parameter Sensitivity: Multiple parameters require careful optimization, as improper settings can affect strategy performance.
3. Market Environment Dependency: May underperform in highly volatile or ranging markets.
4. Signal Lag: Technical indicator-based signals may have inherent lag.

#### Strategy Optimization Directions
1. Enhanced Pattern Recognition:
   - Add stricter harmonic ratio validation
   - Incorporate price structure analysis for improved pattern identification
2. Signal Filtering:
   - Add trend filters
   - Consider volatility indicators for market environment adaptation
3. Risk Management Optimization:
   - Implement dynamic risk-reward ratio adjustments
   - Add volatility-based position sizing

#### Summary
This strategy builds a comprehensive trading system by combining harmonic patterns with the Williams %R indicator. Its strengths lie in its multi-dimensional analysis approach and robust risk control mechanisms, though attention must be paid to parameter optimization and market environment adaptation. Through the suggested optimization directions, the strategy's stability and reliability can be further enhanced.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-09 00:00:00
end: 2025-01-16 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=5
strategy("Harmonic Pattern with WPR Backtest", overlay=true)

// === Inputs ===
patternLength = input.int(5, title="Pattern Length")
wprLength = input.int(14, title="WPR Length")
wprOverbought = input.float(-20, title="WPR Overbought Level")
wprOversold = input.float(-80, title="WPR Oversold Level")
riskRewardMultiplier = input.float(0.618, title="Take-Profit Risk/Reward Multiplier")
stopLossBuffer = input.float(0.005, title="Stop-Loss Buffer (%)")

// === Manual Calculation of William Percent Range (WPR) ===
highestHigh = ta.highest(high, wprLength)
lowestLow = ta.lowest(low, wprLength)
wpr = ((highestHigh - close) / (highestHigh - lowestLow)) * -100

// === Harmonic Pattern Detection (Simplified Approximation) ===
// Calculate price pivots
pivotHigh = ta.pivothigh(high, patternLength, patternLength)
pivotLow = ta.pivotlow(low, patternLength, patternLength)

// Detect Bullish and Bearish Harmonic Patterns
bullishPattern = pivotLow and close > ta.lowest(close, patternLength)  // Simplified detection for bullish patterns
bearishPattern = pivotHigh and close < ta.highest(close, patternLength)  // Simplified detection for bearish patterns

// === Entry Conditions ===
longCondition = bullishPattern and wpr < wprOversold
shortCondition = bearishPattern and wpr > wprOverbought

// === Stop-Loss and Take-Profit Levels ===
longEntryPrice = close
longSL = ta.valuewhen(longCondition, low, 0) * (1 - stopLossBuffer)  // Stop-loss for long trades
longTP = longEntryPrice * (1 + riskRewardMultiplier)  // Take-profit for long trades

shortEntryPrice = close
shortSL = ta.valuewhen(shortCondition, high, 0) * (1 + stopLossBuffer)  // Stop-loss for short trades
shortTP = shortEntryPrice * (1 - riskRewardMultiplier)  // Take-profit for short trades

// === Backtesting Logic ===
// Long Trade
if longCondition
    strategy.entry("Long", strategy.long)
    strategy.exit("Long Exit", "Long", stop=longSL, limit=longTP)

// Short Trade
if shortCondition
    strategy.entry("Short", strategy.short)
    strategy.exit("Short Exit", "Short", stop=shortSL, limit=shortTP)

// === Visualization ===
bgcolor(longCondition ? color.new(color.green, 90) : na, title="Long Entry Signal")
bgcolor(shortCondition ? color.new(color.red, 90) : na, title="Short Entry Signal")

```

> Detail

https://www.fmz.com/strategy/478737

> Last Modified

2025-01-17 16:19:15
