
> Name

Multi-Tiered-Target-and-Trailing-Stop-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d954e845c566652fe7b6.png)
![IMG](https://www.fmz.com/upload/asset/2d8d49e900e605c2e7d80.png)


[trans]
#### 概述

多层级目标和尾随止损策略是一种基于海因安西图表模式的趋势跟踪系统,设计用于捕捉市场动量并保护利润。该策略允许初始入场和二次入场(金字塔式加仓),每次入场都有独立的利润目标和止损设置。它使用动态目标区域来扩展盈利潜力,并实施灵活的尾随止损系统,随着价格向有利方向移动而锁定利润。

#### 策略原理

该策略的运作基于几个关键原理:

1. **海因安西蜡烛图信号**: 使用海因安西蜡烛图来过滤市场噪音并识别趋势。多头信号在当前HA收盘价高于HA开盘价且高于前一根HA收盘价时触发;空头信号则相反。

2. **双层入场系统**: 
   - 首次入场: 基于初始HA信号,设置预定义的目标和止损水平
   - 二次入场: 在首个目标达成后,如果市场继续显示有利HA信号,允许额外入场

3. **突破盈亏平衡保护**: 当首个目标达成时,策略自动将止损水平移至入场价格(盈亏平衡点),确保交易不会亏损

4. **目标区域概念**: 当价格接近目标水平(在预定义的阈值内)时,策略启动"目标区域",增加目标水平以捕捉更多潜在利润

5. **尾随止损机制**: 
   - 首次入场尾随: 在达到初始目标后,止损点会跟随最高/最低价格移动,保持固定距离
   - 二次入场尾随: 针对加仓部分有单独的尾随止损参数

6. **状态追踪**: 策略维护多个变量来追踪交易方向、价格极值、是否达到首个目标以及当前是否处于目标区域等

#### 策略优势

1. **全面的风险管理**: 该策略通过预设止损、盈亏平衡保护和尾随止损提供多层风险管理,保护资本免受大幅下跌影响。

2. **金字塔式加仓机会**: 通过允许二次入场,策略能够在已确认的趋势中增加头寸,提高盈利潜力,同时因为首次交易已经锁定在盈亏平衡点,所以不会增加整体风险。

3. **动态利润捕捉**: 目标区域和目标增加功能使策略能够在强势市场中自动扩展利润目标,而不是过早退出强劲趋势。

4. **高度可定制**: 策略提供广泛的参数设置,允许交易者根据市场条件、交易品种特性和个人风险偏好进行调整。

5. **自动化执行**: 一旦参数设置完成,策略执行所有入场、出场和止损调整,消除了情绪交易的影响。

6. **视觉反馈**: 策略包含清晰的可视化组件,显示目标水平、止损水平和当前状态指标,使交易者可以轻松监控交易进展。

#### 策略风险

1. **参数敏感性**: 策略性能高度依赖于参数设置。不当的目标或止损参数可能导致过早退出良好交易或承受过大的下跌风险。可以通过历史回测和市场特定的参数优化来减轻此风险。

2. **滑点风险**: 特别是在尾随止损执行期间,市场缺口或流动性不足可能导致实际执行价格与理想止损水平有差异。考虑增加滑点缓冲或使用更保守的尾随参数可以降低这一风险。

3. **重复入场过度交易**: 启用二次入场可能导致在不稳定市场中的过度交易。实施额外的过滤条件或二次入场时间限制可以减少此类情况。

4. **市场切换风险**: 虽然策略在趋势市场中表现良好,但在区间震荡市场或突然转向的市场中可能表现不佳。将策略与市场状态过滤器结合使用可以提高整体效果。

5. **计算密集度**: 策略跟踪多个变量和状态,可能在某些平台上导致执行延迟。优化代码和简化某些计算可以提高性能。

#### 策略优化方向

1. **添加趋势过滤器**: 集成趋势指标(如移动平均线、ADX或趋势强度指标)可以提高入场质量,仅在确认的趋势方向进行交易。这将减少在震荡市场中的错误信号。

2. **引入时间过滤条件**: 为二次入场添加时间窗口或冷却期,防止在短时间内过度交易或频繁进出同一趋势。

3. **波动性调整**: 通过基于市场波动性(如ATR)动态调整目标和止损参数,使策略能够适应不同的市场条件。这将使止损和目标水平更匹配当前市场特性。

4. **改进海因安西逻辑**: 当前的HA判断相对简单,可以通过考虑多根HA蜡烛图形态或HA动量指标来增强信号质量。

5. **添加部分利润锁定**: 实施分段利润锁定功能,允许在达到特定利润水平时平仓部分头寸,同时让剩余部分继续运行,平衡了利润保护和潜在收益最大化。

6. **优化目标区域逻辑**: 当前目标区域使用固定增加步长。可以考虑基于市场波动性或近期价格走势的动态目标调整算法,更好地适应市场条件变化。

#### 总结

多层级目标和尾随止损策略是一个全面的交易系统,结合了海因安西趋势识别、动态目标管理、二次入场机会和多层次风险控制。该策略的主要优势在于其灵活的利润扩展机制和严格的风险管理框架,使其适合在趋势性市场中捕捉显著移动。

虽然该策略提供了强大的框架,但其有效性仍然取决于适当的参数调整和市场条件。通过添加市场状态过滤器、波动性调整机制和更复杂的入场确认逻辑,该策略可以进一步增强其稳健性和适应性。最终,这种策略代表了一种平衡—在尝试最大化趋势捕捉的同时,通过系统化的风险控制保护交易资本。 || 
#### Overview

The Multi-Tiered Target and Trailing Stop Strategy is a trend-following system based on Heikin Ashi chart patterns, designed to capture market momentum while protecting profits. The strategy allows for initial entries and second entries (pyramiding), each with independent profit targets and stop-loss settings. It employs dynamic target zones to extend profit potential and implements a flexible trailing stop system that locks in profits as price moves in the favorable direction.

#### Strategy Principles

The strategy operates based on several key principles:

1. **Heikin Ashi Candle Signals**: Uses Heikin Ashi candles to filter market noise and identify trends. Long signals are triggered when the current HA close is higher than the HA open and higher than the previous HA close; short signals are the opposite.

2. **Two-Tiered Entry System**: 
   - First Entry: Based on initial HA signals with predefined targets and stop levels
   - Second Entry: Allows additional entries after the first target is hit if the market continues to show favorable HA signals

3. **Breakeven Protection**: When the first target is achieved, the strategy automatically moves the stop level to the entry price (breakeven point), ensuring the trade cannot result in a loss

4. **Target Zone Concept**: When price approaches the target level (within a predefined threshold), the strategy activates a "target zone" and increases the target level to capture more potential profit

5. **Trailing Stop Mechanism**: 
   - First Entry Trailing: After reaching the initial target, stop points trail behind the highest/lowest price at a fixed distance
   - Second Entry Trailing: Separate trailing parameters for pyramiding portions

6. **State Tracking**: The strategy maintains multiple variables to track trade direction, price extremes, whether the first target has been hit, and whether the price is currently in a target zone

#### Strategy Advantages

1. **Comprehensive Risk Management**: The strategy provides multi-layered risk management through preset stops, breakeven protection, and trailing stops, protecting capital from significant drawdowns.

2. **Pyramiding Opportunities**: By allowing second entries, the strategy can increase position size in confirmed trends, enhancing profit potential while not increasing overall risk since the first trade is already locked at breakeven.

3. **Dynamic Profit Capture**: The target zone and target increase features allow the strategy to automatically extend profit targets in strong markets rather than exiting strong trends prematurely.

4. **Highly Customizable**: The strategy offers extensive parameter settings, allowing traders to adjust according to market conditions, instrument characteristics, and personal risk preferences.

5. **Automated Execution**: Once parameters are set, the strategy executes all entries, exits, and stop adjustments, eliminating emotional trading impact.

6. **Visual Feedback**: The strategy includes clear visualization components showing target levels, stop levels, and status indicators, making it easy for traders to monitor trade progress.

#### Strategy Risks

1. **Parameter Sensitivity**: Strategy performance is highly dependent on parameter settings. Inappropriate target or stop parameters could lead to premature exits from good trades or exposure to excessive drawdowns. This risk can be mitigated through historical backtesting and market-specific parameter optimization.

2. **Slippage Risk**: Particularly during trailing stop executions, market gaps or low liquidity can cause actual execution prices to differ from ideal stop levels. Consider adding slippage buffers or using more conservative trailing parameters to reduce this risk.

3. **Overtrading with Repeated Entries**: Enabling second entries might lead to overtrading in choppy markets. Implementing additional filter conditions or time restrictions for second entries can reduce such instances.

4. **Market Regime Risk**: While the strategy performs well in trending markets, it may underperform in ranging markets or markets with sudden reversals. Combining the strategy with market regime filters can improve overall effectiveness.

5. **Computational Intensity**: The strategy tracks multiple variables and states, potentially causing execution delays on some platforms. Optimizing code and simplifying certain calculations can improve performance.

#### Strategy Optimization Directions

1. **Add Trend Filters**: Integrating trend indicators (such as moving averages, ADX, or trend strength indicators) can improve entry quality by only trading in confirmed trend directions. This would reduce false signals in choppy markets.

2. **Introduce Time-Based Conditions**: Adding time windows or cooling-off periods for second entries to prevent overtrading or frequent in-and-out of the same trend in short timeframes.

3. **Volatility Adjustments**: Dynamically adjusting target and stop parameters based on market volatility (such as ATR) enables the strategy to adapt to different market conditions. This would make stop and target levels more proportional to current market characteristics.

4. **Enhance Heikin Ashi Logic**: The current HA determination is relatively simple and could be enhanced by considering multiple HA candle formations or HA momentum indicators for improved signal quality.

5. **Add Partial Profit Locking**: Implement a staged profit-taking feature that allows closing portions of positions at specific profit levels while letting the remainder run, balancing profit protection and potential gain maximization.

6. **Optimize Target Zone Logic**: The current target zone uses fixed increment steps. Consider a dynamic target adjustment algorithm based on market volatility or recent price movement patterns to better adapt to changing market conditions.

#### Summary

The Multi-Tiered Target and Trailing Stop Strategy is a comprehensive trading system that combines Heikin Ashi trend identification, dynamic target management, second entry opportunities, and multi-level risk control. The primary strength of the strategy lies in its flexible profit extension mechanisms and strict risk management framework, making it suitable for capturing significant moves in trending markets.

While the strategy provides a robust framework, its effectiveness still depends on proper parameter adjustment and market conditions. By adding market regime filters, volatility adjustment mechanisms, and more sophisticated entry confirmation logic, the strategy can be further enhanced in robustness and adaptability. Ultimately, this strategy represents a balance—attempting to maximize trend capture while protecting trading capital through systematic risk control.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-31 00:00:00
end: 2025-03-29 08:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Algo Trading v1 | SUNNY GUHA By OIESU", overlay=true, margin_long=100, margin_short=100, pyramiding=100)

// ———— USER INPUTS ———— //
// First Entry Settings
float initialTarget  = input.float(10000, "First Entry: Target ($)", minval=1, tooltip="First target level")
float initialStopLoss = input.float(3000, "First Entry: Stop Loss ($)", minval=1, tooltip="Initial stop loss distance")
bool  useTrailFirst = input.bool(true, "First Entry: Enable Trail", tooltip="Enable trailing features after first target hit")
float profitTrailStepFirst = input.float(1500, "First Entry: Trail Amount ($)", minval=1, tooltip="Trail amount after first target hit")
bool  useTargetZoneFirst = input.bool(true, "First Entry: Enable Target Zone", tooltip="Enable target zone feature")
float targetZoneThresholdFirst = input.float(1000, "First Entry: Target Zone Threshold ($)", minval=1, tooltip="Distance to activate target zone")
float targetIncreaseStepFirst = input.float(2000, "First Entry: Target Increase ($)", minval=1, tooltip="Amount to increase target")

// Second Entry Settings
bool  enableSecondEntries = input.bool(true, "Enable Second Entries", tooltip="Allow re-entries after first target hit")
float secondTarget = input.float(5000, "Second Entry: Target ($)", minval=1, tooltip="Target for second entries")
float secondStopLoss = input.float(2000, "Second Entry: Stop Loss ($)", minval=1, tooltip="Stop loss for second entries")
bool  useTrailSecond = input.bool(true, "Second Entry: Enable Trail", tooltip="Enable trailing for second entries")
float profitTrailStepSecond = input.float(1500, "Second Entry: Trail Amount ($)", minval=1, tooltip="Trail amount for second entries")
bool  useTargetZoneSecond = input.bool(true, "Second Entry: Enable Target Zone", tooltip="Enable target zone")
float targetZoneThresholdSecond = input.float(1000, "Second Entry: Target Zone Threshold ($)", minval=1)
float targetIncreaseStepSecond = input.float(2000, "Second Entry: Target Increase ($)", minval=1)

// ———— HEIKIN-ASHI CALCULATIONS ———— //
var float haOpen   = na
var float haClose  = na
var float haHigh   = na
var float haLow    = na

haClose := (open + high + low + close)/4
haOpen  := na(haOpen[1]) ? (open + close)/2 : (haOpen[1] + haClose[1])/2
haHigh  := math.max(high, math.max(haOpen, haClose))
haLow   := math.min(low, math.min(haOpen, haClose))

// ———— TRACKING VARIABLES ———— //
var float highestPrice     = na  // Tracks highest price for long positions
var float lowestPrice      = na  // Tracks lowest price for short positions
var float basePrice        = na  // Entry price for position
var float targetLevel      = na  // Current target level
var float stopLevel        = na  // Current stop level
var bool  firstTargetHit   = false  // Indicates if first target was hit
var string tradeDirection  = "none"  // Current trade direction
var bool   isSecondEntry   = false   // Tracks if current position is a second entry
var bool   inTargetZone    = false   // Tracks if price is in target zone

// ———— SIGNAL DETECTION ———— //
bullish = haClose > haOpen and haClose > haClose[1]
bearish = haClose < haOpen and haClose < haClose[1]

// Entry conditions - only allow second entries if enabled and after first target hit
longCondition  = bullish and (tradeDirection != "long" or (enableSecondEntries and firstTargetHit))
shortCondition = bearish and (tradeDirection != "short" or (enableSecondEntries and firstTargetHit))

// Position Management - Long Positions
if strategy.position_size > 0
    highestPrice := math.max(high, nz(highestPrice, high))

    if isSecondEntry
        // Second Entry Management
        inTargetZone := useTargetZoneSecond and high >= targetLevel - targetZoneThresholdSecond

        if inTargetZone and useTargetZoneSecond
            targetLevel := targetLevel + targetIncreaseStepSecond

        if useTrailSecond
            stopLevel := math.max(stopLevel, highestPrice - profitTrailStepSecond)

        if low <= stopLevel
            strategy.close_all("Second Entry Stop")
            basePrice := na
            targetLevel := na
            stopLevel := na
            highestPrice := na
            lowestPrice := na
            firstTargetHit := false
            isSecondEntry := false
            inTargetZone := false
            tradeDirection := "none"
    else
        // First Entry Management - improved profit locking
        if not firstTargetHit and high >= basePrice + initialTarget
            // First target hit - ALWAYS lock profit at break-even
            firstTargetHit := true
            stopLevel := basePrice  // Move stop to break-even
            targetLevel := useTrailFirst ? high + targetIncreaseStepFirst : basePrice + initialTarget
        else if firstTargetHit
            // Only modify target if trailing is enabled
            if useTrailFirst
                inTargetZone := useTargetZoneFirst and high >= targetLevel - targetZoneThresholdFirst
                if inTargetZone and useTargetZoneFirst
                    targetLevel := targetLevel + targetIncreaseStepFirst
                // Trail stop-loss but never below break-even
                stopLevel := math.max(basePrice, highestPrice - profitTrailStepFirst)
        else
            // Before first target hit
            targetLevel := basePrice + initialTarget
            stopLevel := basePrice - initialStopLoss

        // Exit on stop hit - this could only be at break-even or better after first target
        if low <= stopLevel
            strategy.close_all("First Entry Stop")
            basePrice := na
            targetLevel := na
            stopLevel := na
            highestPrice := na
            lowestPrice := na
            firstTargetHit := false
            isSecondEntry := false
            inTargetZone := false
            tradeDirection := "none"

// Position Management - Short Positions
if strategy.position_size < 0
    lowestPrice := math.min(low, nz(lowestPrice, low))

    if isSecondEntry
        // Second Entry Management
        inTargetZone := useTargetZoneSecond and low <= targetLevel + targetZoneThresholdSecond

        if inTargetZone and useTargetZoneSecond
            targetLevel := targetLevel - targetIncreaseStepSecond

        if useTrailSecond
            stopLevel := math.min(stopLevel, lowestPrice + profitTrailStepSecond)

        if high >= stopLevel
            strategy.close_all("Second Entry Stop")
            basePrice := na
            targetLevel := na
            stopLevel := na
            highestPrice := na
            lowestPrice := na
            firstTargetHit := false
            isSecondEntry := false
            inTargetZone := false
            tradeDirection := "none"
    else
        // First Entry Management - improved profit locking
        if not firstTargetHit and low <= basePrice - initialTarget
            // First target hit - ALWAYS lock profit at break-even
            firstTargetHit := true
            stopLevel := basePrice  // Move stop to break-even
            targetLevel := useTrailFirst ? low - targetIncreaseStepFirst : basePrice - initialTarget
        else if firstTargetHit
            // Only modify target if trailing is enabled
            if useTrailFirst
                inTargetZone := useTargetZoneFirst and low <= targetLevel + targetZoneThresholdFirst
                if inTargetZone and useTargetZoneFirst
                    targetLevel := targetLevel - targetIncreaseStepFirst
                // Trail stop-loss but never above break-even
                stopLevel := math.min(basePrice, lowestPrice + profitTrailStepFirst)
        else
            // Before first target hit
            targetLevel := basePrice - initialTarget
            stopLevel := basePrice + initialStopLoss

        // Exit on stop hit - this could only be at break-even or better after first target
        if high >= stopLevel
            strategy.close_all("First Entry Stop")
            basePrice := na
            targetLevel := na
            stopLevel := na
            highestPrice := na
            lowestPrice := na
            firstTargetHit := false
            isSecondEntry := false
            inTargetZone := false
            tradeDirection := "none"

// New Position Entry
if strategy.position_size == 0
    if longCondition
        tradeDirection := "long"
        basePrice := close
        targetLevel := basePrice + (firstTargetHit ? secondTarget : initialTarget)
        stopLevel := basePrice - (firstTargetHit ? secondStopLoss : initialStopLoss)
        highestPrice := high
        isSecondEntry := firstTargetHit
        strategy.entry("Long", strategy.long)
    else if shortCondition
        tradeDirection := "short"
        basePrice := close
        targetLevel := basePrice - (firstTargetHit ? secondTarget : initialTarget)
        stopLevel := basePrice + (firstTargetHit ? secondStopLoss : initialStopLoss)
        lowestPrice := low
        isSecondEntry := firstTargetHit
        strategy.entry("Short", strategy.short)

// ———— VISUALIZATION ———— //
// Entry signals
plotshape(longCondition and (strategy.position_size == 0),     title="Buy", style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small)

plotshape(shortCondition and (strategy.position_size == 0),     title="Sell", style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small)

// Target and stop levels with clearer colors
plot(targetLevel, title="Target Level", color=color.orange, linewidth=2)
plot(stopLevel, title="Stop Level", color=color.red, linewidth=2)

// Break-even level - shown prominently after first target hit
plot(strategy.position_size != 0 and firstTargetHit ? basePrice : na,     title="Break-Even Level", color=color.green, linewidth=2, style=plot.style_linebr)

// Debug plots for state tracking
plotchar(firstTargetHit, title="First Target Hit", char="T", location=location.top, color=color.yellow, size=size.tiny)
plotchar(isSecondEntry, title="Second Entry", char="2", location=location.top, color=color.white, size=size.tiny)
plotchar(useTrailFirst and firstTargetHit, title="Trail Active", char="→", location=location.top, color=color.blue, size=size.tiny)
plotchar(inTargetZone, title="Target Zone", char="Z", location=location.top, color=color.fuchsia, size=size.tiny)
```

> Detail

https://www.fmz.com/strategy/488886

> Last Modified

2025-03-31 16:20:21
