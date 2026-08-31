
> Name

Multi-Dimensional-Adaptive-Moving-Average-Matrix-with-ATR-Powered-Precision-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d994e847578976564af6.png)
![IMG](https://www.fmz.com/upload/asset/2d8c96dbb891068c28aa6.png)



[trans]

## 概述
多维度自适应移动平均矩阵与ATR动态精准交易策略是一种为快速变化的市场条件而设计的高级量化交易系统。该策略核心在于结合多种类型的移动平均线与ATR（平均真实波幅）过滤器，形成一个高度灵活且自适应的交易矩阵。通过精确捕捉市场趋势和波动性，该策略能够在高频交易环境中识别高概率的入场和出场点，同时实施严格的风险控制措施。策略的显著特点是其多层次的适应性 - 从多种移动平均线类型的灵活选择到基于ATR的动态止损和获利目标设置，再到多时间框架趋势过滤，使其在各种市场环境下都能智能调整交易信号的生成方式。

## 策略原理
该策略的核心原理建立在几个关键组件的协同工作上：

1. **高级移动平均线矩阵**：策略实现了多达11种不同类型的移动平均线，包括SMA、EMA、SMMA、HMA、TEMA、WMA、VWMA、ZLEMA、ALMA、KAMA和DEMA。每种移动平均线都有其独特的计算方法和反应特性，可根据市场条件灵活选择。系统采用两条移动平均线（快速和慢速）作为主要趋势指标，它们的交叉和相对位置用于生成基础交易信号。

2. **ATR为基础的风险管理**：策略利用ATR指标测量市场波动性，并将其应用于多个方面：
   - 波动性评估：将ATR与收盘价的比率用作波动性阈值筛选条件
   - 入场过滤器：确保价格必须与慢速移动平均线保持足够距离（以ATR的倍数计算）才能入场
   - 动态风险控制：基于ATR设置固定止损、目标利润和追踪止损，使风险管理适应当前市场波动性

3. **多时间框架趋势过滤**：策略通过查询更高时间框架（15分钟）的移动平均线趋势来增强信号可靠性，确保交易方向与更大的市场趋势保持一致。

4. **成交量和时间窗口验证**：交易仅在满足最小成交量要求、出现成交量突破且在预定义的交易时间窗口内执行，进一步提高了交易质量。

5. **信号生成逻辑**：
   - 多头条件：价格高于快速和慢速移动平均线，快速移动平均线高于慢速移动平均线，同时满足ATR过滤器、成交量条件和时间窗口要求
   - 空头条件：相反情况下的对应条件

6. **综合退出逻辑**：策略使用三层退出机制：固定止损（ATR的倍数）、目标利润（ATR的倍数）和追踪止损（基于ATR的动态调整），为每笔交易提供全面的风险保护。

## 策略优势
分析该策略代码，可以总结出以下显著优势：

1. **卓越的适应性**：通过可切换的多种移动平均线类型（从HMA到KAMA等），策略能够适应不同的市场条件。这种灵活性使交易者可以根据当前市场环境选择最佳指标，而无需重新编写整个策略。

2. **动态风险管理**：基于ATR的风险控制机制确保止损和获利目标会根据市场波动性自动调整。这种方法在波动较大的市场中提供了更好的保护，同时在趋势市场中允许捕获更多利润。

3. **多层信号过滤**：通过结合移动平均线交叉、成交量分析、波动性阈值和多时间框架趋势过滤，策略有效减少了错误信号，提高了交易质量。特别是15分钟时间框架的趋势过滤功能，显著降低了逆势交易的可能性。

4. **精确的入场条件**：该策略不仅依赖技术指标交叉，还要求价格与慢速移动平均线之间保持足够的ATR距离，这有助于避免在横盘市场中频繁交易，减少了假突破带来的亏损。

5. **透明的性能监控**：内置的仪表板提供关键绩效指标的实时显示，包括当前利润/亏损、股权、ATR（原始值和百分比）以及移动平均线之间的差距，使交易者能够随时评估策略状态。

## 策略风险
尽管该策略设计精良，但仍存在以下潜在风险：

1. **参数优化陷阱**：策略包含大量参数（移动平均线类型和周期、ATR周期和乘数等），过度优化可能导致曲线拟合，使策略在实盘交易中表现不佳。解决方法是进行稳健的跨市场和跨时间段测试，避免过度调整参数。

2. **快速反转风险**：尽管使用ATR动态止损，但在市场突然反转时（如重大新闻发布后），价格可能在止损触发前跳空，导致超出预期的损失。建议实施额外的夜间风险控制或在高波动性事件前暂停交易。

3. **信号延迟**：所有移动平均线本质上都有滞后性。即使像HMA或ZLEMA这样的低延迟变体也可能在快速市场中错过理想入场点。可以考虑结合动量或价格行为指标来补充现有的信号系统。

4. **成交量依赖性**：策略在成交量突增时发出信号，但在某些市场或时段，成交量可能具有误导性。必要时应调整成交量过滤器或考虑在特定市场条件下禁用此功能。

5. **时间窗口限制**：指定的交易时间窗口可能会错过重要的夜间或早盘机会。建议根据特定市场的最活跃时段调整交易时间设置。

## 策略优化方向
分析代码后，以下是几个可能的优化方向：

1. **自适应参数调整**：目前策略使用固定的参数设置。一个高级优化是实现基于市场状态（趋势、波动、范围）自动调整的参数。例如，在高波动期间可以自动增加ATR乘数，或在不同市场环境中切换移动平均线类型。

2. **整合机器学习模型**：通过引入机器学习层来预测哪种移动平均线类型在当前市场条件下可能表现最佳，从而自动选择最优的移动平均线组合。这可以通过分析历史数据中不同指标的相对表现来实现。

3. **改进的趋势识别**：除了现有的15分钟趋势过滤器外，还可以纳入更复杂的趋势识别算法，如Hurst指数或方向性运动指标(DMI)，以更准确地确定趋势强度和持续性。

4. **增强退出策略**：当前的退出策略可以通过添加基于市场结构的退出信号进一步优化，如趋势线突破、关键支撑/阻力位或波动性急剧变化。这可以帮助在趋势结束前锁定利润。

5. **风险调整的仓位规模**：实现基于当前波动性和账户资金的动态仓位规模调整，而不是使用固定的交易数量。例如，在高波动期间减少仓位，在低波动期间适度增加仓位，以优化风险回报比。

6. **相关市场过滤**：通过监测相关市场（如股票指数交易时关注VIX）或跨资产关联性来增强信号质量。当相关市场显示一致的方向性移动时，可以增加交易的可信度。

## 总结
多维度自适应移动平均矩阵与ATR动态精准交易策略代表了一种全面而先进的量化交易方法。通过结合多种移动平均线类型的优势与严格的ATR基础风险控制，该策略能够在维持良好风险管理的同时适应不同的市场条件。其多层次的信号过滤机制、精确的入场条件和全面的退出逻辑共同创造了一个能够识别高概率交易机会的强大系统。

该策略的真正价值在于其灵活性和适应性，允许交易者根据特定市场和个人风险偏好进行定制。通过建议的优化方向，特别是自适应参数调整和机器学习整合，策略的性能还有进一步提升的潜力。

对于寻求在高频交易环境中运用技术性强且纪律严明的系统的交易者来说，这种策略提供了一个坚实的框架，结合了技术精度和风险控制，两者缺一不可。重要的是，交易者应当通过彻底的回测和模拟交易来验证该策略在其目标市场中的表现，并根据具体交易环境进行必要的调整。 || 

## Overview
The Multi-Dimensional Adaptive Moving Average Matrix with ATR-Powered Precision Trading Strategy is an advanced quantitative trading system designed for rapidly changing market conditions. The core of this strategy lies in combining multiple types of moving averages with ATR (Average True Range) filters to form a highly flexible and adaptive trading matrix. By precisely capturing market trends and volatility, this strategy can identify high-probability entry and exit points in high-frequency trading environments while implementing strict risk control measures. The strategy's notable feature is its multi-layered adaptability - from the flexible selection of various moving average types to dynamic ATR-based stop-loss and profit target settings, to multi-timeframe trend filtering, enabling intelligent adjustment of trading signal generation across various market environments.

## Strategy Principles
The core principles of this strategy are built on the collaborative work of several key components:

1. **Advanced Moving Average Matrix**: The strategy implements up to 11 different types of moving averages, including SMA, EMA, SMMA, HMA, TEMA, WMA, VWMA, ZLEMA, ALMA, KAMA, and DEMA. Each moving average has its unique calculation method and response characteristics, which can be flexibly selected based on market conditions. The system uses two moving averages (fast and slow) as the primary trend indicators, and their crossovers and relative positions are used to generate basic trading signals.

2. **ATR-Based Risk Management**: The strategy uses the ATR indicator to measure market volatility and applies it in multiple aspects:
   - Volatility Assessment: The ratio of ATR to closing price is used as a volatility threshold filtering condition
   - Entry Filters: Ensures that the price must maintain sufficient distance (calculated as multiples of ATR) from the slow moving average to enter
   - Dynamic Risk Control: Sets fixed stop-loss, target profit, and trailing stops based on ATR, adapting risk management to current market volatility

3. **Multi-Timeframe Trend Filtering**: The strategy enhances signal reliability by querying moving average trends in a higher timeframe (15 minutes), ensuring that the trading direction aligns with the larger market trend.

4. **Volume and Time Window Validation**: Trades are only executed when meeting minimum volume requirements, experiencing volume breakouts, and within a predefined trading time window, further improving trade quality.

5. **Signal Generation Logic**:
   - Long Condition: Price above both fast and slow moving averages, fast moving average above slow moving average, while simultaneously meeting ATR filter, volume conditions, and time window requirements
   - Short Condition: Corresponding conditions in the opposite scenario

6. **Comprehensive Exit Logic**: The strategy employs a three-tiered exit mechanism: fixed stop-loss (multiples of ATR), target profit (multiples of ATR), and trailing stop (dynamic adjustment based on ATR), providing comprehensive risk protection for each trade.

## Strategy Advantages
Analyzing the strategy code reveals the following significant advantages:

1. **Exceptional Adaptability**: Through switchable multiple moving average types (from HMA to KAMA, etc.), the strategy can adapt to different market conditions. This flexibility allows traders to select the optimal indicator based on the current market environment without rewriting the entire strategy.

2. **Dynamic Risk Management**: ATR-based risk control mechanisms ensure that stop-losses and profit targets automatically adjust according to market volatility. This approach provides better protection in volatile markets while allowing for capturing more profits in trending markets.

3. **Multi-Layer Signal Filtering**: By combining moving average crossovers, volume analysis, volatility thresholds, and multi-timeframe trend filtering, the strategy effectively reduces false signals and improves trade quality. Particularly, the 15-minute timeframe trend filtering feature significantly reduces the possibility of counter-trend trading.

4. **Precise Entry Conditions**: The strategy not only relies on technical indicator crossovers but also requires sufficient ATR distance between price and the slow moving average, which helps avoid frequent trading in sideways markets and reduces losses from false breakouts.

5. **Transparent Performance Monitoring**: The built-in dashboard provides real-time display of key performance indicators, including current profit/loss, equity, ATR (both raw and percentage), and the gap between moving averages, enabling traders to evaluate the strategy's status at any time.

## Strategy Risks
Despite being well-designed, the strategy still has the following potential risks:

1. **Parameter Optimization Traps**: The strategy includes numerous parameters (moving average types and periods, ATR period and multipliers, etc.), and excessive optimization may lead to curve fitting, causing the strategy to perform poorly in live trading. The solution is to conduct robust cross-market and cross-timeframe testing, avoiding excessive parameter adjustments.

2. **Rapid Reversal Risk**: Despite using ATR dynamic stop-losses, in sudden market reversals (such as after major news releases), prices may gap before stop-losses trigger, resulting in losses beyond expectations. It is recommended to implement additional overnight risk controls or pause trading before high-volatility events.

3. **Signal Delay**: All moving averages inherently have lag. Even low-latency variants like HMA or ZLEMA may miss ideal entry points in fast markets. Consider combining momentum or price action indicators to supplement the existing signal system.

4. **Volume Dependency**: The strategy issues signals during volume surges, but in some markets or periods, volume may be misleading. Adjust volume filters when necessary or consider disabling this feature under specific market conditions.

5. **Time Window Limitations**: The specified trading time window may miss important overnight or early market opportunities. It is recommended to adjust trading time settings according to the most active periods of specific markets.

## Strategy Optimization Directions
After analyzing the code, here are several possible optimization directions:

1. **Adaptive Parameter Adjustment**: Currently, the strategy uses fixed parameter settings. An advanced optimization would be to implement parameters that automatically adjust based on market state (trend, volatility, range). For example, ATR multipliers can automatically increase during high volatility periods, or moving average types can switch in different market environments.

2. **Integration of Machine Learning Models**: Introduce a machine learning layer to predict which moving average type might perform best under current market conditions, thereby automatically selecting the optimal moving average combination. This can be achieved by analyzing the relative performance of different indicators in historical data.

3. **Improved Trend Identification**: In addition to the existing 15-minute trend filter, more complex trend recognition algorithms can be incorporated, such as the Hurst Exponent or Directional Movement Index (DMI), to more accurately determine trend strength and persistence.

4. **Enhanced Exit Strategy**: The current exit strategy can be further optimized by adding exit signals based on market structure, such as trendline breakouts, key support/resistance levels, or abrupt volatility changes. This can help lock in profits before the trend ends.

5. **Risk-Adjusted Position Sizing**: Implement dynamic position sizing adjustments based on current volatility and account funds, rather than using fixed trade quantities. For example, reduce positions during high volatility and moderately increase positions during low volatility to optimize the risk-reward ratio.

6. **Related Market Filtering**: Enhance signal quality by monitoring related markets (such as watching VIX when trading stock indices) or cross-asset correlations. When related markets show consistent directional movement, the credibility of trades can be increased.

## Summary
The Multi-Dimensional Adaptive Moving Average Matrix with ATR-Powered Precision Trading Strategy represents a comprehensive and advanced approach to quantitative trading. By combining the strengths of multiple moving average types with strict ATR-based risk control, the strategy can adapt to different market conditions while maintaining good risk management. Its multi-layered signal filtering mechanism, precise entry conditions, and comprehensive exit logic collectively create a powerful system capable of identifying high-probability trading opportunities.

The true value of this strategy lies in its flexibility and adaptability, allowing traders to customize it according to specific markets and personal risk preferences. Through the suggested optimization directions, especially adaptive parameter adjustment and machine learning integration, the strategy's performance has the potential for further improvement.

For traders seeking to employ a technically strong and disciplined system in high-frequency trading environments, this strategy provides a solid framework combining technical precision and risk control, both of which are essential. Importantly, traders should validate the strategy's performance in their target markets through thorough backtesting and simulated trading, making necessary adjustments according to specific trading environments.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-16 00:00:00
end: 2025-04-15 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Dskyz (DAFE) MAtrix with ATR-Powered Precision", 
     overlay=true, 
     default_qty_type=strategy.fixed, 
     initial_capital=1000000, 
     commission_value=0, 
     slippage=1, 
     pyramiding=10)

// ==================================================================
// USER-DEFINED FUNCTIONS
// ==================================================================

// Hull Moving Average (HMA)
hma(src, len) =>
    halfLen = math.round(len * 0.5)
    sqrtLen = math.round(math.sqrt(len))
    wmaf = ta.wma(src, halfLen)
    wmaFull = ta.wma(src, len)
    ta.wma(2 * wmaf - wmaFull, sqrtLen)

// Triple Exponential Moving Average (TEMA)
tema(src, len) =>
    ema1 = ta.ema(src, len)
    ema2 = ta.ema(ema1, len)
    ema3 = ta.ema(ema2, len)
    3 * (ema1 - ema2) + ema3

// Double Exponential Moving Average (DEMA)
dema(src, len) =>
    ema1 = ta.ema(src, len)
    ema2 = ta.ema(ema1, len)
    2 * ema1 - ema2

// VWMA - Volume Weighted Moving Average
vwma(src, len) =>
    ta.vwma(src, len)

// ZLEMA - Zero Lag EMA
zlema(src, len) =>
    lag = math.floor((len - 1) / 2)
    ta.ema(2 * src - src[lag], len)

// ALMA - Arnaud Legoux Moving Average
alma(src, len, offset=0.85, sigma=6) =>
    ta.alma(src, len, offset, sigma)

// Custom Kaufman Adaptive Moving Average (KAMA)
kama(src, len) =>
    fastSC = 2.0 / (2 + 1)
    slowSC = 2.0 / (30 + 1)
    change = math.abs(src - src[len])
    volatility = 0.0
    for i = 0 to len - 1
        volatility += math.abs(src - src[i])
    er = volatility != 0 ? change / volatility : 0.0
    sc = math.pow(er * (fastSC - slowSC) + slowSC, 2)
    var float kama_val = na
    kama_val := na(kama_val) ? ta.sma(src, len) : kama_val + sc * (src - kama_val)
    kama_val

// ==================================================================
// INPUTS
// ==================================================================

fastLength   = input.int(9, "[MA] Fast MA Length", minval=1)
slowLength   = input.int(19, "[MA] Slow MA Length", minval=1)
fastMAType   = input.string("SMA", "Fast MA Type", options=["SMA", "EMA", "SMMA", "HMA", "TEMA", "WMA", "VWMA", "ZLEMA", "ALMA", "KAMA", "DEMA"])
slowMAType   = input.string("SMA", "Slow MA Type", options=["SMA", "EMA", "SMMA", "HMA", "TEMA", "WMA", "VWMA", "ZLEMA", "ALMA", "KAMA", "DEMA"])

atrPeriod           = input.int(14, "ATR Period", minval=1)
atrMultiplier       = input.float(1.5, "ATR Multiplier for Filter", minval=0.1, step=0.1)
useTrendFilter      = input.bool(true, "[Filter Settings] Use 15m Trend Filter")
minVolume           = input.int(10, "Minimum Volume", minval=1)
volatilityThreshold = input.float(1.0, "Volatility Threshold (%)", minval=0.1, step=0.1) / 100
tradingStartHour    = input.int(9, "Trading Start Hour (24h)", minval=0, maxval=23)
tradingEndHour      = input.int(16, "Trading End Hour (24h)", minval=0, maxval=23)
trailOffset         = input.float(0.5, "[Exit Settings] Trailing Stop Offset ATR Multiplier", minval=0.01, step=0.01)
profitTargetATRMult = input.float(1.2, "Profit Target ATR Multiplier", minval=0.1, step=0.1)
fixedStopMultiplier = input.float(1.3, "Fixed Stop Multiplier", minval=0.5, step=0.1)
fixedQuantity       = input.int(2, "Trade Quantity", minval=1)

resetDashboard      = input.bool(false, "Reset Dashboard Stats")

// ==================================================================
// CALCULATIONS
// ==================================================================

volumeOk    = volume >= minVolume
currentHour = hour(time)
timeWindow  = currentHour >= tradingStartHour and currentHour <= tradingEndHour
volumeSpike = volume > 1.2 * ta.sma(volume, 10)

// ATR Calculation
atr          = ta.atr(atrPeriod)
volatility   = nz(atr / close, 0)
volatilityOk = volatility <= volatilityThreshold

// ==================================================================
// MOVING AVERAGES CALCULATIONS
// ==================================================================

var float fastMA = na
var float slowMA = na

// Fast MA Logic
if fastMAType == "SMA"
    fastMA := ta.sma(close, fastLength)
else if fastMAType == "EMA"
    fastMA := ta.ema(close, fastLength)
else if fastMAType == "SMMA"
    fastMA := ta.rma(close, fastLength)
else if fastMAType == "HMA"
    fastMA := hma(close, fastLength)
else if fastMAType == "TEMA"
    fastMA := tema(close, fastLength)
else if fastMAType == "WMA"
    fastMA := ta.wma(close, fastLength)
else if fastMAType == "VWMA"
    fastMA := vwma(close, fastLength)
else if fastMAType == "ZLEMA"
    fastMA := zlema(close, fastLength)
else if fastMAType == "ALMA"
    fastMA := alma(close, fastLength)
else if fastMAType == "KAMA"
    fastMA := kama(close, fastLength)
else if fastMAType == "DEMA"
    fastMA := dema(close, fastLength)

// Slow MA Logic
if slowMAType == "SMA"
    slowMA := ta.sma(close, slowLength)
else if slowMAType == "EMA"
    slowMA := ta.ema(close, slowLength)
else if slowMAType == "SMMA"
    slowMA := ta.rma(close, slowLength)
else if slowMAType == "HMA"
    slowMA := hma(close, slowLength)
else if slowMAType == "TEMA"
    slowMA := tema(close, slowLength)
else if slowMAType == "WMA"
    slowMA := ta.wma(close, slowLength)
else if slowMAType == "VWMA"
    slowMA := vwma(close, slowLength)
else if slowMAType == "ZLEMA"
    slowMA := zlema(close, slowLength)
else if slowMAType == "ALMA"
    slowMA := alma(close, slowLength)
else if slowMAType == "KAMA"
    slowMA := kama(close, slowLength)
else if slowMAType == "DEMA"
    slowMA := dema(close, slowLength)

// ==================================================================
// TREND FILTER & SIGNAL LOGIC
// ==================================================================

// Retrieve 15-minute MAs for trend filtering
[fastMA15m, slowMA15m] = request.security(syminfo.tickerid, "15", [ta.sma(close, fastLength), ta.sma(close, slowLength)])
trend15m    = fastMA15m > slowMA15m ? 1 : fastMA15m < slowMA15m ? -1 : 0
trendLongOk = not useTrendFilter or trend15m >= 0
trendShortOk= not useTrendFilter or trend15m <= 0

// ATR-based Price Filter
atrFilterLong  = close > slowMA + atr * atrMultiplier
atrFilterShort = close < slowMA - atr * atrMultiplier

// Signal Logic: MA alignment + filters
maAbove       = close > fastMA and fastMA > slowMA
maBelow       = close < fastMA and fastMA < slowMA
longCondition = maAbove and trendLongOk and atrFilterLong and volumeOk and volumeSpike and timeWindow and volatilityOk
shortCondition= maBelow and trendShortOk and atrFilterShort and volumeOk and volumeSpike and timeWindow and volatilityOk

// ==================================================================
// ENTRY LOGIC
// ==================================================================

if strategy.position_size == 0 and longCondition
    strategy.entry("Long", strategy.long, qty=fixedQuantity)
if strategy.position_size == 0 and shortCondition
    strategy.entry("Short", strategy.short, qty=fixedQuantity)

// ==================================================================
// EXIT LOGIC
// ==================================================================
if strategy.position_size > 0
    strategy.exit("Long Exit", "Long",
         stop  = strategy.position_avg_price - atr * fixedStopMultiplier,
         limit = strategy.position_avg_price + atr * profitTargetATRMult,
         trail_offset = atr * trailOffset,
         trail_points = atr * trailOffset)
if strategy.position_size < 0
    strategy.exit("Short Exit", "Short",
         stop  = strategy.position_avg_price + atr * fixedStopMultiplier,
         limit = strategy.position_avg_price - atr * profitTargetATRMult,
         trail_offset = atr * trailOffset,
         trail_points = atr * trailOffset)

// ==================================================================
// VISUALS: PLOT MAs
// ==================================================================

plot(fastMA, color=color.blue, linewidth=2, title="Fast MA")
plot(slowMA, color=color.red, linewidth=2, title="Slow MA")

// ==================================================================
// METRICS CALCULATIONS (for Dashboard)
// ==================================================================

// Additional metrics:
atrPct   = close != 0 ? (atr / close) * 100 : na               // ATR as percentage of Close
maGapPct = (slowMA != 0) ? (math.abs(fastMA - slowMA) / slowMA) * 100 : na  // % difference between MAs

// Open PnL Calculation
currentPnL = strategy.position_size != 0 ? (close - strategy.position_avg_price) * strategy.position_size : 0

// Persistent variable for highest equity (for drawdown calculation)
var float highestEquity = strategy.equity
highestEquity := math.max(highestEquity, strategy.equity)
totalDrawdown = strategy.equity - highestEquity

// Reset dashboard metrics if reset toggle is on.
if resetDashboard
    highestEquity := strategy.equity

// ==================================================================
// DASHBOARD: WATERMARK LOGO (Bottom-Right)
// ==================================================================
var table watermarkTable = table.new(position.bottom_right, 1, 1, bgcolor=color.rgb(0, 0, 0, 80), border_color=color.rgb(0, 50, 137), border_width=1)
if barstate.islast
    table.cell(watermarkTable, 0, 0, "⚡ Dskyz - DAFE Trading Systems", text_color=color.rgb(159, 127, 255, 80), text_size=size.large)

// ==================================================================
// DASHBOARD: METRICS TABLE (Bottom-Left)
// ==================================================================
var table dashboard = table.new(position.middle_right, 2, 12, bgcolor=color.new(#000000, 29), border_color=color.rgb(80, 80, 80), border_width=1)
if barstate.islast
    // Row 0 – Dashboard Title (duplicated in both columns to simulate spanning)
    table.cell(dashboard, 0, 0, "⚡(DAFE) Trading Systems", text_color=color.rgb(135, 135, 135), text_size=size.small)
    
    // Row 1 – Position
    table.cell(dashboard, 0, 1, "Position", text_color=color.gray)
    positionText = strategy.position_size > 0 ? "Long" : strategy.position_size < 0 ? "Short" : "Flat"
    table.cell(dashboard, 1, 1, positionText, text_color=strategy.position_size > 0 ? color.green : strategy.position_size < 0 ? color.red : color.blue)
    
    // Row 2 – Current PnL
    table.cell(dashboard, 0, 2, "Current P/L", text_color=color.gray)
    table.cell(dashboard, 1, 2, str.tostring(currentPnL, "#.##"), text_color=(currentPnL > 0 ? color.green : currentPnL < 0 ? color.red : color.gray))
    
    // Row 3 – Equity
    table.cell(dashboard, 0, 3, "Equity", text_color=color.gray)
    table.cell(dashboard, 1, 3, str.tostring(strategy.equity, "#.##"), text_color=color.white)

    // Row 4 – Closed Trades
    table.cell(dashboard, 0, 4, "Closed Trades", text_color=color.gray)
    table.cell(dashboard, 1, 4, str.tostring(strategy.closedtrades), text_color=color.white)

    // Row 5 – Title Step
    table.cell(dashboard, 0, 5, "Metrics", text_color=color.rgb(76, 122, 23))
   
    // Row 6 – Fast MA
    table.cell(dashboard, 0, 6, "Fast MA", text_color=color.gray)
    table.cell(dashboard, 1, 6, str.tostring(fastMA, "#.##"), text_color=color.white)
    
    // Row 7 – Slow MA
    table.cell(dashboard, 0, 7, "Slow MA", text_color=color.gray)
    table.cell(dashboard, 1, 7, str.tostring(slowMA, "#.##"), text_color=color.white)
    
    // Row 8 – ATR (Raw)
    table.cell(dashboard, 0, 8, "ATR", text_color=color.gray)
    table.cell(dashboard, 1, 8, str.tostring(atr, "#.##"), text_color=color.white)
    
    // Row 9 – ATR (%)
    table.cell(dashboard, 0, 9, "ATR (%)", text_color=color.gray)
    table.cell(dashboard, 1, 9, str.tostring(atrPct, "#.##") + "%", text_color=color.white)
    
    // Row 10 – MA Gap (%)
    table.cell(dashboard, 0, 10, "MA Gap (%)", text_color=color.gray)
    table.cell(dashboard, 1, 10, na(maGapPct) ? "N/A" : str.tostring(maGapPct, "#.##") + "%", text_color=color.white)
    
    // Row 11 – Volatility (%)
    table.cell(dashboard, 0, 11, "Volatility (%)", text_color=color.gray)
    table.cell(dashboard, 1, 11, str.tostring(volatility * 100, "#.##") + "%", text_color=color.white)

```

> Detail

https://www.fmz.com/strategy/490801

> Last Modified

2025-04-16 15:50:36
