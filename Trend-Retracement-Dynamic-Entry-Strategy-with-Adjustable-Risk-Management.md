
> Name

Trend-Retracement-Dynamic-Entry-Strategy-with-Adjustable-Risk-Management

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d997e9e31f61e1d307f8.png)
![IMG](https://www.fmz.com/upload/asset/2d89c1b969f88f10b14cb.png)



[trans]


#### 概述

趋势回调可调整风险动态进场策略是为希望在短期趋势转变后的回调中建立多头头寸,同时在市场条件有利于下行走势时立即进入空头的摇摆交易者设计的。该策略结合了SMA交叉确认趋势,固定百分比回调入场点,以及可调整的风险管理参数,实现了最佳的交易执行。

策略的核心在于使用10周期和25周期的简单移动平均线(SMA)交叉来确认趋势方向,并结合150周期指数移动平均线(EMA)作为空头交易的额外过滤条件。多头交易不会在SMA交叉后立即进入,而是等待价格回调至指定百分比后才进场,这种方法优化了入场价格,提高了风险回报比。

#### 策略原理

该策略的运作原理可分为几个关键部分:

1. **趋势确认机制**:
   - 当10周期SMA上穿25周期SMA时,系统识别为看涨趋势转变信号
   - 当10周期SMA下穿25周期SMA时,系统识别为看跌趋势转变信号
   - 空头交易仅在价格低于150周期EMA时执行,确保与更广泛的趋势保持一致

2. **多头回调入场机制**:
   - 不是在SMA交叉信号出现时立即入场,而是等待价格回调后再进入多头
   - 入场点定义为从近期高点回调固定百分比(默认为1%)的位置
   - 系统动态计算并绘制支撑位,以可视化回调入场区域
   - 当价格向上突破回调水平时触发多头入场

3. **空头入场规则**:
   - 如果10周期SMA下穿25周期SMA,且价格低于150周期EMA,立即进入空头

4. **风险管理与退出策略**:
   - 止盈(TP) - 可调整的点数盈利目标(默认:1000点)
   - 止损(SL) - 可调整的点数止损水平(默认:250点)
   - 保本点(BE) - 当价格向有利方向移动设定点数时,止损移至保本点
   - 多头额外退出条件:如果持有多头仓位时10周期SMA下穿25周期SMA,且价格低于150周期EMA,强制退出多头以避免趋势反转带来的损失

策略使用持久性变量跟踪回调信号,确保在正确的时机入场。当无仓位时,系统会重置所有标志和水平,为下一次交易信号做准备。

#### 策略优势

深入分析代码后,该策略展现出以下显著优势:

1. **优化的入场时机**:
   - 通过等待回调入场而不是在交叉信号出现时立即入场,策略获得了更好的入场价格
   - 这种方法降低了初始风险,提高了潜在的风险回报比
   - 回调百分比可调整,适应不同市场环境和交易者风险偏好

2. **全面的风险管理**:
   - 精确的止损和止盈参数确保每笔交易有明确的风险控制
   - 保本机制保护已获利的交易,降低整体回撤幅度
   - 所有风险参数均可调整,适应不同市场波动性

3. **趋势对齐过滤**:
   - 使用EMA150作为额外过滤条件,确保短期交易与长期趋势一致
   - 当趋势反转时的额外退出规则保护资金不受重大损失

4. **视觉反馈**:
   - 系统在图表上绘制回调水平和信号,提供清晰的视觉指导
   - 交易执行点和退出点都有明确标记,便于回测和策略改进

5. **适应性强**:
   - 策略适用于各种资产类别,包括股票、外汇和指数
   - 参数可调整性强,适合不同的市场环境和交易风格

#### 策略风险

尽管该策略有许多优势,但仍存在以下风险需要注意:

1. **快速市场风险**:
   - 在高波动市场中,价格可能跳过计划的入场点或止损水平
   - 极端市场事件可能导致滑点增加,影响实际执行价格
   - 解决方法:在高波动期间调整回调百分比和风险参数,或考虑暂时停止交易

2. **震荡市场表现**:
   - 策略依赖趋势确认,在横盘震荡市场中可能产生错误信号
   - 频繁的SMA交叉可能导致连续亏损交易
   - 解决方法:添加额外的趋势强度过滤器,如ADX指标,或在震荡市场中暂停交易

3. **固定点数风险管理的局限性**:
   - 使用固定点数的止损和止盈可能不适应不同的市场波动性
   - 在波动性扩大时,可能导致过早止损或止盈目标过远
   - 解决方法:考虑基于ATR(真实波动范围)的动态止损和止盈水平

4. **过度依赖技术指标**:
   - 策略完全依赖于技术指标,忽略了基本面因素和市场情绪
   - SMA和EMA是滞后指标,可能不能及时响应市场转折点
   - 解决方法:结合其他领先指标或市场情绪指标,如RSI或资金流量指标

5. **参数优化风险**:
   - 过度优化参数可能导致曲线拟合,在未来市场中表现不佳
   - 解决方法:使用足够长的历史数据进行回测,并在不同市场条件下验证策略稳健性

#### 策略优化方向

基于代码分析,以下是该策略可以优化的几个关键方向:

1. **动态风险管理**:
   - 将固定点数的止损和止盈转换为基于ATR的动态水平
   - 这样可以使风险管理适应当前市场波动性,在低波动期间设置更小的止损,在高波动期间设置更大的止损
   - 实现方法:使用类似`stopDistance = input.float(2.0) * ta.atr(14)`的计算方式

2. **趋势强度过滤**:
   - 添加ADX(平均方向指数)或类似指标以衡量趋势强度
   - 仅在趋势足够强(例如ADX > 25)时执行交易,避免震荡市场中的假信号
   - 这将大幅减少错误信号,提高胜率

3. **多时间框架分析**:
   - 整合更高时间框架的趋势信息,确保交易与更大趋势一致
   - 例如,只有当日线和4小时图都显示相同趋势方向时才进行交易
   - 这种方法可以提高交易成功率,减少逆势交易的风险

4. **智能回调识别**:
   - 用更复杂的回调识别方法代替简单的固定百分比
   - 考虑使用斐波那契回调水平或关键支撑阻力位
   - 这将提供更有意义的入场点,与市场结构更好地对齐

5. **交易量确认**:
   - 添加交易量分析作为确认信号的一部分
   - 在低交易量的回调和高交易量的突破中寻找更高质量的入场点
   - 交易量确认可以显著提高信号质量,减少噪音交易

6. **自适应参数**:
   - 开发一种机制,根据近期市场表现动态调整策略参数
   - 例如,在波动性增加时自动增加回调百分比
   - 这种自适应能力可以使策略在不同市场环境中保持稳健性

#### 总结

趋势回调可调整风险动态进场策略是一个精心设计的交易系统,它结合了趋势识别、优化入场和全面风险管理。通过等待价格回调再入场,策略获得了比简单SMA交叉系统更好的入场价格和风险回报比。

该策略的核心优势在于其灵活性和可调整性,允许交易者根据个人风险偏好和市场条件调整参数。同时,集成的风险管理功能(包括止损、止盈和保本点)提供了全面的资金保护。

然而,该策略也存在一些局限性,包括在震荡市场中的表现和固定点数风险管理的局限性。通过实施建议的优化,如动态风险管理、趋势强度过滤和交易量确认,可以显著提高策略的稳健性和整体表现。

对于摇摆交易者来说,这是一个理想的基础策略,可以进一步根据个人交易风格和目标进行定制。通过合理的参数设置和持续的监控调整,该策略有潜力在各种市场环境中提供稳定的交易结果。 || 

#### Overview

The Trend Retracement Dynamic Entry Strategy with Adjustable Risk Management is designed for swing traders who want to enter long positions on pullbacks after a short-term trend shift, while also allowing immediate short entries when market conditions favor downside movement. This strategy combines SMA crossovers for trend confirmation, fixed-percentage retracement entry points, and adjustable risk management parameters for optimal trade execution.

The core of the strategy uses crossovers between 10-period and 25-period Simple Moving Averages (SMA) to confirm trend direction, combined with a 150-period Exponential Moving Average (EMA) as an additional filter for short trades. Long trades are not entered immediately after the SMA crossover but instead wait for price to pull back to a specified percentage, which optimizes entry price and improves the risk-reward ratio.

#### Strategy Principles

The operational principles of this strategy can be divided into several key components:

1. **Trend Confirmation Mechanism**:
   - When the 10-period SMA crosses above the 25-period SMA, the system identifies a bullish trend shift
   - When the 10-period SMA crosses below the 25-period SMA, the system identifies a bearish trend shift
   - Short trades are only executed when price is below the 150-period EMA, ensuring alignment with the broader trend

2. **Long Pullback Entry Mechanism**:
   - Instead of entering immediately on the SMA crossover signal, the strategy waits for a price pullback before entering a long position
   - The entry point is defined as a fixed percentage retracement (default 1%) from the recent high
   - The system dynamically calculates and plots a support level to visualize the pullback entry zone
   - A long entry is triggered when price bounces upward and crosses above the retracement level

3. **Short Entry Rules**:
   - If the 10-period SMA crosses below the 25-period SMA and price is below the 150-period EMA, a short position is entered immediately

4. **Risk Management & Exit Strategy**:
   - Take Profit (TP) - Adjustable profit target in points (default: 1000 points)
   - Stop Loss (SL) - Adjustable stop loss level in points (default: 250 points)
   - Break-Even (BE) - When price moves in favor by a set number of points, the stop loss is moved to break-even
   - Extra Exit Condition for Longs: If the 10-period SMA crosses below the 25-period SMA while price is below the 150-period EMA, the strategy force-exits the long position to avoid losses from trend reversals

The strategy uses persistent variables to track pullback signals and ensure entries at the correct time. When no position is open, the system resets all flags and levels in preparation for the next trading signal.

#### Strategy Advantages

After in-depth code analysis, this strategy demonstrates the following significant advantages:

1. **Optimized Entry Timing**:
   - By waiting for pullbacks instead of entering immediately on crossover signals, the strategy achieves better entry prices
   - This approach reduces initial risk and improves potential risk-reward ratio
   - The retracement percentage is adjustable, adapting to different market environments and trader risk preferences

2. **Comprehensive Risk Management**:
   - Precise stop loss and take profit parameters ensure that each trade has clear risk boundaries
   - The break-even mechanism protects profitable trades and reduces overall drawdown
   - All risk parameters are adjustable, adapting to different market volatilities

3. **Trend Alignment Filtering**:
   - Using EMA150 as an additional filter ensures short-term trades align with the longer-term trend
   - Extra exit rules when trend reverses protect capital from major losses

4. **Visual Feedback**:
   - The system plots retracement levels and signals on the chart, providing clear visual guidance
   - Trade execution and exit points are clearly marked, facilitating backtesting and strategy improvement

5. **High Adaptability**:
   - The strategy is applicable to various asset classes, including stocks, forex, and indices
   - Strong parameter adjustability makes it suitable for different market environments and trading styles

#### Strategy Risks

Despite its many advantages, the strategy has the following risks that should be noted:

1. **Fast Market Risks**:
   - In highly volatile markets, prices may gap through planned entry points or stop levels
   - Extreme market events may lead to increased slippage, affecting actual execution prices
   - Solution: Adjust retracement percentage and risk parameters during high volatility periods, or consider temporarily suspending trading

2. **Oscillating Market Performance**:
   - The strategy relies on trend confirmation and may generate false signals in sideways, range-bound markets
   - Frequent SMA crossovers may lead to consecutive losing trades
   - Solution: Add additional trend strength filters, such as the ADX indicator, or pause trading during oscillating markets

3. **Limitations of Fixed Point Risk Management**:
   - Using fixed points for stop loss and take profit may not adapt well to different market volatilities
   - During expanding volatility, this could lead to premature stops or take profit targets that are too distant
   - Solution: Consider dynamic stop loss and take profit levels based on ATR (Average True Range)

4. **Over-reliance on Technical Indicators**:
   - The strategy relies entirely on technical indicators, ignoring fundamental factors and market sentiment
   - SMAs and EMAs are lagging indicators that may not respond timely to market turning points
   - Solution: Incorporate other leading indicators or market sentiment indicators, such as RSI or money flow indicators

5. **Parameter Optimization Risk**:
   - Excessive parameter optimization may lead to curve-fitting that performs poorly in future market conditions
   - Solution: Use sufficiently long historical data for backtesting and validate strategy robustness under different market conditions

#### Strategy Optimization Directions

Based on code analysis, here are several key directions for optimizing this strategy:

1. **Dynamic Risk Management**:
   - Convert fixed-point stop loss and take profit to ATR-based dynamic levels
   - This allows risk management to adapt to current market volatility, setting smaller stops during low volatility periods and larger stops during high volatility periods
   - Implementation method: Use calculations like `stopDistance = input.float(2.0) * ta.atr(14)`

2. **Trend Strength Filtering**:
   - Add ADX (Average Directional Index) or similar indicators to measure trend strength
   - Only execute trades when the trend is strong enough (e.g., ADX > 25) to avoid false signals in oscillating markets
   - This would significantly reduce false signals and improve win rate

3. **Multi-timeframe Analysis**:
   - Integrate trend information from higher timeframes to ensure trades align with larger trends
   - For example, only trade when both daily and 4-hour charts show the same trend direction
   - This approach can increase trade success rate and reduce the risk of counter-trend trading

4. **Intelligent Retracement Identification**:
   - Replace the simple fixed percentage with more sophisticated retracement identification methods
   - Consider using Fibonacci retracement levels or key support/resistance levels
   - This would provide more meaningful entry points that better align with market structure

5. **Volume Confirmation**:
   - Add volume analysis as part of the confirmation signal
   - Look for higher quality entry points in low-volume pullbacks and high-volume breakouts
   - Volume confirmation can significantly improve signal quality and reduce noise trades

6. **Adaptive Parameters**:
   - Develop a mechanism to dynamically adjust strategy parameters based on recent market performance
   - For example, automatically increase retracement percentage when volatility increases
   - This adaptive capability would help the strategy maintain robustness across different market environments

#### Summary

The Trend Retracement Dynamic Entry Strategy with Adjustable Risk Management is a carefully designed trading system that combines trend identification, optimized entries, and comprehensive risk management. By waiting for price pullbacks before entering, the strategy achieves better entry prices and risk-reward ratios than simple SMA crossover systems.

The core strength of this strategy lies in its flexibility and adjustability, allowing traders to tune parameters according to personal risk preferences and market conditions. At the same time, the integrated risk management features, including stop loss, take profit, and break-even points, provide comprehensive capital protection.

However, the strategy also has some limitations, including performance in oscillating markets and the constraints of fixed-point risk management. By implementing the suggested optimizations, such as dynamic risk management, trend strength filtering, and volume confirmation, the robustness and overall performance of the strategy can be significantly improved.

For swing traders, this is an ideal base strategy that can be further customized according to individual trading styles and goals. With proper parameter settings and continuous monitoring and adjustment, this strategy has the potential to provide stable trading results across various market environments.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-08-01 00:00:00
end: 2025-03-25 00:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("BTCUSD with adjustable sl,tp", 
     overlay=true, 
     initial_capital=10000, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=10, 
     calc_on_every_tick=true)

// ─────────────────────────────────────────────────────────────────────────────
//  ▌ USER INPUTS
// ─────────────────────────────────────────────────────────────────────────────
longSignalStyle  = input.string("Label Up", title="Long Signal Style", options=["Label Up", "Arrow Up", "Cross"])
shortSignalStyle = input.string("Label Down", title="Short Signal Style", options=["Label Down", "Arrow Down", "Cross"])

// Adjustable exit parameters (in points)
tpDistance    = input.int(1000, "Take Profit Distance (points)", minval=1)
slDistance    = input.int(250, "Stop Loss Distance (points)",   minval=1)
beTrigger     = input.int(500, "Break-Even Trigger Distance (points)", minval=1)

// Adjustable retracement percentage for long pullback entry (e.g. 0.01 = 1%)
retracementPct = input.float(0.01, "Retracement Percentage (e.g. 0.01 for 1%)", step=0.001)

// ─────────────────────────────────────────────────────────────────────────────
//  ▌ INDICATORS: SMA & EMA
// ─────────────────────────────────────────────────────────────────────────────
sma10  = ta.sma(close, 10)
sma25  = ta.sma(close, 25)
ema150 = ta.ema(close, 150)

plot(sma10,  color=color.blue,   title="SMA 10")
plot(sma25,  color=color.red,    title="SMA 25")
plot(ema150, color=color.orange, title="EMA 150")

// ─────────────────────────────────────────────────────────────────────────────
//  ▌ ENTRY CONDITIONS
// ─────────────────────────────────────────────────────────────────────────────
longCondition  = ta.crossover(sma10, sma25)
shortCondition = ta.crossunder(sma10, sma25)
shortValid     = close < ema150  // Only take shorts if price is below EMA150

// Plot immediate entry signals (for visual reference)
plotshape(longCondition and (strategy.position_size == 0), title="Long Signal", 
     style=(longSignalStyle == "Label Up" ? shape.labelup : (longSignalStyle == "Arrow Up" ? shape.triangleup : shape.cross)), 
     location=location.belowbar, color=color.green, text="Long", size=size.small)
plotshape(shortCondition and shortValid and (strategy.position_size == 0), title="Short Signal", 
     style=(shortSignalStyle == "Label Down" ? shape.labeldown : (shortSignalStyle == "Arrow Down" ? shape.triangledown : shape.cross)), 
     location=location.abovebar, color=color.red, text="Short", size=size.small)

// ─────────────────────────────────────────────────────────────────────────────
//  ▌ LONG PULLBACK ENTRY USING FIXED PERCENTAGE RETRACEMENT
// ─────────────────────────────────────────────────────────────────────────────
// We use persistent variables to track the pullback signal.
var bool longSignalActive = false
var float pullHigh = na        // highest high since long signal activation
var float retraceLevel = na    // level = pullHigh * (1 - retracementPct)

// Only consider new entries when no position is open.
if strategy.position_size == 0
    // When a long crossover occurs, activate the signal and initialize pullHigh.
    if longCondition
        longSignalActive := true
        pullHigh := high

    // If signal active, update pullHigh and compute retracement level.
    if longSignalActive
        pullHigh := math.max(pullHigh, high)
        retraceLevel := pullHigh * (1 - retracementPct)

        // When price bounces upward and crosses above the retracement level, enter long
        if ta.crossover(close, retraceLevel)
            strategy.entry("Long", strategy.long)
            longSignalActive := false

    // Short entries: enter immediately if conditions are met
    if shortCondition and shortValid
        strategy.entry("Short", strategy.short)

// ─────────────────────────────────────────────────────────────────────────────
//  ▌ EXIT CONDITIONS WITH ADJUSTABLE TP, SL & BE
// ─────────────────────────────────────────────────────────────────────────────
var bool beLong  = false
var bool beShort = false

// LONG EXIT LOGIC
if strategy.position_size > 0 and strategy.position_avg_price > 0
    longEntry = strategy.position_avg_price

    // Additional exit: if SMA(10) crosses below SMA(25) while price < EMA150, exit long
    if ta.crossunder(sma10, sma25) and close < ema150
        label.new(bar_index, low, "SMA Exit", style=label.style_label_down, color=color.red, textcolor=color.white)
        strategy.close("Long", comment="SMA Cross Exit")

    // Break-even trigger if price moves in favor by beTrigger points
    if close >= longEntry + beTrigger
        beLong := true

    effectiveLongStop = beLong ? longEntry : (longEntry - slDistance)
    if close <= effectiveLongStop
        label.new(bar_index, low, (beLong ? "BE Hit" : "SL Hit"), style=label.style_label_down, color=color.red, textcolor=color.white)
        strategy.close("Long", comment=(beLong ? "BE Hit" : "SL Hit"))

    if close >= longEntry + tpDistance
        label.new(bar_index, high, "TP Hit", style=label.style_label_up, color=color.green, textcolor=color.white)
        strategy.close("Long", comment="TP Hit")

// SHORT EXIT LOGIC
if strategy.position_size < 0 and strategy.position_avg_price > 0
    shortEntry = strategy.position_avg_price

    // Basic stop logic
    if close >= shortEntry + slDistance
        label.new(bar_index, high, (beShort ? "BE Hit" : "SL Hit"), style=label.style_label_up, color=color.red, textcolor=color.white)
        strategy.close("Short", comment=(beShort ? "BE Hit" : "SL Hit"))

    // Take profit logic
    if close <= shortEntry - tpDistance
        label.new(bar_index, low, "TP Hit", style=label.style_label_down, color=color.green, textcolor=color.white)
        strategy.close("Short", comment="TP Hit")

    // Break-even trigger
    if close <= shortEntry - beTrigger
        beShort := true

    effectiveShortStop = beShort ? shortEntry : (shortEntry + slDistance)
    if close >= effectiveShortStop
        label.new(bar_index, high, (beShort ? "BE Hit" : "SL Hit"), style=label.style_label_up, color=color.red, textcolor=color.white)
        strategy.close("Short", comment=(beShort ? "BE Hit" : "SL Hit"))

// Reset BE flags when no position is open
if strategy.position_size == 0
    beLong  := false
    beShort := false
    // Reset the pullback signal
    if not longSignalActive
        pullHigh := na
        retraceLevel := na

```

> Detail

https://www.fmz.com/strategy/488265

> Last Modified

2025-03-26 13:29:16
