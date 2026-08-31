
> Name

Adaptive-Dual-Indicator-Cross-Smart-Timing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/106d9822f479a117d05.png)

[trans]
#### 概述
这是一个基于RSI和CCI双重技术指标的自适应交易策略。策略通过监控不同时间周期下的RSI和CCI指标的交叉状态,结合EMA均线趋势,构建了一个完整的交易系统。该策略具有自适应性强、信号稳定等特点,能够有效地捕捉市场超买超卖机会。

#### 策略原理
策略的核心逻辑包括以下几个方面:
1. 时间周期自适应:根据不同的时间周期(1分钟到4小时)动态调整RSI和CCI的参数设置。
2. 双重指标确认:使用RSI(相对强弱指标)和CCI(顺势指标)的组合来过滤交易信号。当RSI和CCI同时满足特定条件时才会产生交易信号。
3. 信号持续性验证:通过设置最小持续时间(stayTimeFrames)来确保信号的稳定性。
4. 动态止盈止损:基于入场时的RSI和CCI水平设置动态的止盈止损点位。
5. 趋势确认:使用200周期EMA作为趋势参考。

#### 策略优势
1. 自适应性强:策略能够根据不同时间周期自动调整参数,适应性更强。
2. 信号可靠性高:通过双重技术指标的交叉确认,显著提高了信号的可靠性。
3. 风险控制完善:采用动态止盈止损机制,能够有效控制风险。
4. 操作规则明确:入场和出场条件清晰,便于实际操作。
5. 可扩展性好:策略框架灵活,可以根据需要添加新的过滤条件。

#### 策略风险
1. 参数敏感性:不同市场环境下最优参数可能存在差异。
2. 横盘震荡风险:在市场震荡期间可能产生虚假信号。
3. 滑点影响:高频交易可能面临滑点影响。
4. 信号延迟:多重确认机制可能导致入场时机略有延迟。
5. 市场环境依赖:在强趋势市场表现可能优于震荡市场。

#### 策略优化方向
1. 参数自适应:可以引入自适应参数优化机制,根据市场状态动态调整参数。
2. 市场环境识别:添加市场环境识别模块,在不同市场状态下采用不同的交易策略。
3. 波动率适应:引入波动率指标,根据波动率大小调整止盈止损参数。
4. 信号过滤:增加更多技术指标和形态识别来过滤假信号。
5. 风险管理:完善资金管理方案,增加持仓时间和仓位控制。

#### 总结
该策略通过结合RSI和CCI指标的优势,构建了一个稳健的交易系统。策略的自适应特性和完善的风险控制机制使其具有良好的实用性。通过持续优化和完善,该策略有望在实际交易中取得更好的表现。建议交易者在实盘使用前进行充分的回测和参数优化。 ||

#### Overview
This is an adaptive trading strategy based on dual technical indicators RSI and CCI. The strategy monitors the cross-state of RSI and CCI indicators under different time periods, combined with EMA trend, to build a complete trading system. The strategy features strong adaptability and stable signals, effectively capturing market overbought and oversold opportunities.

#### Strategy Principle
The core logic includes:
1. Time period adaptation: Dynamically adjusts RSI and CCI parameters based on different time periods (1 minute to 4 hours).
2. Dual indicator confirmation: Uses combination of RSI (Relative Strength Index) and CCI (Commodity Channel Index) to filter trading signals. Trading signals are generated only when both RSI and CCI meet specific conditions.
3. Signal persistence verification: Ensures signal stability through minimum duration settings (stayTimeFrames).
4. Dynamic profit/loss limits: Sets dynamic take-profit and stop-loss levels based on entry RSI and CCI levels.
5. Trend confirmation: Uses 200-period EMA as trend reference.

#### Strategy Advantages
1. Strong adaptability: Strategy automatically adjusts parameters for different time periods.
2. High signal reliability: Cross-confirmation through dual technical indicators significantly improves signal reliability.
3. Comprehensive risk control: Dynamic profit/loss mechanism effectively controls risk.
4. Clear operation rules: Entry and exit conditions are clear for practical operation.
5. Good extensibility: Flexible strategy framework allows addition of new filtering conditions.

#### Strategy Risks
1. Parameter sensitivity: Optimal parameters may vary in different market environments.
2. Range-bound market risk: False signals may occur during market consolidation.
3. Slippage impact: High-frequency trading may face slippage effects.
4. Signal delay: Multiple confirmation mechanisms may cause slight delays in entry timing.
5. Market environment dependence: May perform better in trending markets than ranging markets.

#### Strategy Optimization
1. Parameter adaptation: Introduce adaptive parameter optimization mechanism for dynamic adjustment based on market conditions.
2. Market environment recognition: Add market state identification module for different trading strategies in various market conditions.
3. Volatility adaptation: Introduce volatility indicators to adjust profit/loss parameters based on volatility levels.
4. Signal filtering: Add more technical indicators and pattern recognition to filter false signals.
5. Risk management: Improve money management plan, enhance position time and size control.

#### Summary
The strategy builds a robust trading system by combining the advantages of RSI and CCI indicators. Its adaptive features and comprehensive risk control mechanisms provide good practicality. Through continuous optimization and improvement, the strategy shows promise for better performance in actual trading. Traders are advised to conduct thorough backtesting and parameter optimization before live implementation.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-19 00:00:00
end: 2025-02-18 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("RSI & CCI Strategy with Alerts", overlay=true)

// Detect current chart timeframe
tf = timeframe.period

// Define settings for different timeframes
rsiLength = tf == "1" ? 30 : tf == "5" ? 30 : tf == "15" ? 30 : tf == "30" ? 30 : 30  // Default
cciLength = tf == "1" ? 15 : tf == "5" ? 20 : tf == "15" ? 20 : tf == "30" ? 20 : 20  // Default
cciBuyThreshold = tf == "1" ? -100 : tf == "5" ? -100 : tf == "15" ? -100 : tf == "30" ? -100 : -100
cciSellThreshold = tf == "1" ? 100 : tf == "5" ? 100 : tf == "15" ? 100 : tf == "30" ? 100 : 100  // Default
stayTimeFrames = tf == "1" ? 1 : tf == "5" ? 1 : tf == "15" ? 1 : tf == "30" ? 1 : tf == "240" ? 1 : 2  // Default
stayTimeFramesOver =tf == "1" ? 1 : tf == "5" ? 2 : tf == "15" ? 2 : tf == "30" ? 3 : 2 // Default

// Calculate RSI & CCI
rsi = ta.rsi(close, rsiLength)
rsiOver = ta.rsi(close, 14)
cci = ta.cci(close, cciLength)

// EMA 50
ema200 = ta.ema(close, 200)
plot(ema200, color=color.rgb(255, 255, 255), linewidth=2, title="EMA 200")

// CCI candle threshold tracking
var int cciEntryTimeLong = na
var int cciEntryTimeShort = na

// Store entry time when CCI enters the zone
if (cci < cciBuyThreshold)
    if na(cciEntryTimeLong)
        cciEntryTimeLong := bar_index
else
    cciEntryTimeLong := na

if (cci > cciSellThreshold)
    if na(cciEntryTimeShort)
        cciEntryTimeShort := bar_index
else
    cciEntryTimeShort := na

// Confirming CCI has stayed in the threshold for required bars
cciStayedBelowNeg100 = not na(cciEntryTimeLong) and (bar_index - cciEntryTimeLong >= stayTimeFrames) and rsi >= 53
cciStayedAbove100 = not na(cciEntryTimeShort) and (bar_index - cciEntryTimeShort >= stayTimeFrames) and rsi <= 47


// CCI & RSI candle threshold tracking for Buy Over and Sell Over signals
var int buyOverEntryTime = na
var int sellOverEntryTime = na

// Track entry time when RSI and CCI conditions are met
if (rsiOver <= 31 and cci <= -120)
    if na(buyOverEntryTime)
        buyOverEntryTime := bar_index
else
    buyOverEntryTime := na

if (rsiOver >= 69 and cci >= 120)
    if na(sellOverEntryTime)
        sellOverEntryTime := bar_index
else
    sellOverEntryTime := na

// Confirm that conditions are met for the required stayTimeFrames
buyOverCondition = not na(buyOverEntryTime) and (bar_index - buyOverEntryTime >= stayTimeFramesOver)
sellOverCondition = not na(sellOverEntryTime) and (bar_index - sellOverEntryTime <= stayTimeFramesOver)

//Buy and sell for over bought or sell 
conditionOverBuy = buyOverCondition
conditionOverSell = sellOverCondition

// Buy and sell conditions
buyCondition = cciStayedBelowNeg100
sellCondition = cciStayedAbove100

// // Track open positions
var bool isLongOpen = false
var bool isShortOpen = false

// // Strategy logic for backtesting
// if (buyCondition and not isLongOpen)
//     strategy.entry("Long", strategy.long)
//     isLongOpen := true
//     isShortOpen := false

// if (sellCondition and not isShortOpen)
//     strategy.entry("Short", strategy.short)
//     isShortOpen := true
//     isLongOpen := false

// // Close positions based on EMA 50
// if (isLongOpen and exitLongCondition)
//     strategy.close("Long")
//     isLongOpen := false

// if (isShortOpen and exitShortCondition)
//     strategy.close("Short")
//     isShortOpen := false



// Track RSI at position entry
var float entryRSILong = na
var float entryRSIShort = na

// Track CCI at position entry
var float entryCCILong = na
var float entryCCIShort = na

if (buyOverCondition and not isLongOpen)
    strategy.entry("Long", strategy.long)
    entryRSILong := rsi  // Store RSI at entry
    entryCCILong := cci
    isLongOpen := true
    isShortOpen := false

if (sellOverCondition and not isShortOpen)
    strategy.entry("Short", strategy.short)
    entryRSIShort := rsi  // Store RSI at entry
    entryCCIShort := cci  // Stpre CCI at entry
    isShortOpen := true
    isLongOpen := false

exitLongRSICondition = isLongOpen and not na(entryRSILong) and rsi >= (entryRSILong + 12)  or rsi <= (entryRSILong -8)
exitShortRSICondition = isShortOpen and not na(entryRSIShort) and rsi <= (entryRSIShort - 12)  or rsi >= (entryRSIShort +8)

exitLongCCICondition = isLongOpen and not na(entryCCILong) and cci <= (entryCCILong -100)
exitShortCCICondition = isShortOpen and not na(entryCCIShort) and cci >= (entryCCIShort +100)

// Close positions based on EMA 50 or RSI change
if (isLongOpen and (exitLongRSICondition) or (exitLongCCICondition))
    strategy.close("Long")
    isLongOpen := false
    entryRSILong := na
    entryCCILong := na
    isLongOpen := false

if (isShortOpen and (exitShortRSICondition) or (exitShortCCICondition))
    strategy.close("Short")
    isShortOpen := false
    entryRSIShort := na
    entryCCIShort := na
    isShortOpen := false



// Plot buy and sell signals
plotshape(buyCondition, style=shape.labelup, location=location.belowbar, color=color.green, size=size.large, title="Buy Signal", text="BUY")
plotshape(sellCondition, style=shape.labeldown, location=location.abovebar, color=color.red, size=size.large, title="Sell Signal", text="SELL")

//Plot buy and sell OverBought
plotshape(conditionOverBuy, style=shape.labelup, location=location.belowbar, color=color.rgb(255, 238, 0), size=size.large, title="OverBuy Signal", text="Over Sell")
plotshape(conditionOverSell, style=shape.labeldown, location=location.abovebar, color=color.rgb(186, 40, 223), size=size.large, title="OverSell Signal", text="Over Buy")

// Alerts
alertcondition(buyCondition, title="Buy Alert", message="Buy Signal Triggered")
alertcondition(sellCondition, title="Sell Alert", message="Sell Signal Triggered")

```

> Detail

https://www.fmz.com/strategy/482591

> Last Modified

2025-02-19 10:56:59
