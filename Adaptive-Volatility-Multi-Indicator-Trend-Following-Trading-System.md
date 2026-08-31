
> Name

Adaptive-Volatility-Multi-Indicator-Trend-Following-Trading-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8b48781edc64ca89a77.png)
![IMG](https://www.fmz.com/upload/asset/2d8693dee76fe370f9f76.png)



[trans]

#### 概述
自适应波动率多指标趋势跟踪交易系统是一种为高波动市场设计的量化交易策略，结合了动态调整的技术指标与先进的风险管理机制。该策略核心是通过ATR(平均真实波幅)来动态调整移动均线参数，实现对市场波动的自适应，同时整合RSI超买超卖过滤、烛台形态识别、多时间周期趋势确认和逐步建仓(DCA)等功能，形成一个全面的交易框架。此策略特别适用于期货市场等高波动环境，为日内交易和波段交易提供灵活的操作模式。

#### 策略原理
策略的核心原理基于以下几个关键模块：

1. **自适应移动均线系统**：策略使用快速和慢速简单移动均线(SMA)，其长度通过ATR动态调整。在高波动环境中，均线长度会缩短以快速反应市场变化；在低波动环境中，均线长度延长以减少噪音。长信号在快速均线上穿慢速均线并得到价格确认时产生；短信号相反。

2. **RSI动量过滤**：通过RSI(相对强弱指标)验证进场信号，确保交易方向与市场动量一致。该功能可选择开启或关闭，并支持自定义RSI参数(如长度14、超买60、超卖40)。

3. **烛台形态识别**：系统能够识别强劲的看涨或看跌吞没形态，并结合成交量和范围强度进行验证。为避免虚假信号，当两种相反形态同时出现时，系统会跳过交易。

4. **多时间周期趋势确认**：可选择性地将交易信号与15分钟时间周期的SMA趋势对齐，增加一层确认机制，提高交易质量。

5. **逐步建仓(DCA)机制**：在趋势方向上允许多次入场，最多支持预设数量的入场(如4次)，入场间隔基于ATR倍数设定。这种机制有助于在趋势延续的市场中优化平均成本。

6. **高级风险管理**：
   - 初始止损：基于ATR设置(通常为2-3.5倍)，在入场柱上应用更宽的固定止损倍数(如1.3)。
   - 追踪止损：使用ATR基础的偏移和乘数，随着利润增加动态调整(如当利润超过ATR时，乘数从0.5降至0.3)。
   - 止盈目标：设置在入场价格±ATR的特定倍数(如1.2)处。
   - 冷却期：退出后的暂停期(0-5分钟)，防止过度交易。
   - 最小持仓时间：确保交易持续一定数量的柱(如2-10)。

7. **交易执行逻辑**：系统优先考虑移动均线或烛台形态信号(根据用户选择)，并应用成交量、波动性和时间过滤器。为确保入场质量，还增加了成交量峰值条件(成交量>1.2*10期SMA)。

#### 策略优势
1. **市场适应性强**：通过ATR动态调整技术指标参数，策略能够自动适应不同市场条件，在高波动和低波动环境中都保持有效性。

2. **信号质量筛选**：多层过滤机制(RSI、多时间周期趋势、成交量和波动性)有效减少假信号，提高交易质量。

3. **灵活的入场机制**：支持根据用户偏好优先使用移动均线或烛台形态信号，并通过DCA功能在趋势方向上优化入场点。

4. **动态风险管理**：止损点和追踪止损随市场波动和交易利润动态调整，在保护资本的同时给予趋势足够发展空间。

5. **可视化和调试工具**：策略提供丰富的图表覆盖层、实时仪表板和调试表格，帮助用户优化参数和理解交易逻辑。

6. **模块化设计**：用户可以根据偏好开启或关闭各种功能(如RSI过滤、烛台形态识别、多时间周期趋势等)，高度定制化。

7. **精细的进场控制**：成交量峰值过滤器确保只在显著的市场活动中入场，同时冷却期机制防止过度交易。

#### 策略风险
1. **参数敏感性**：策略使用多个参数(如均线长度、ATR周期、RSI阈值等)，这些参数的设置对性能有显著影响，不当的参数组合可能导致过度适配历史数据。

   *解决方法*：进行广泛的参数优化测试，但避免过度优化；使用走样测试(walk-forward testing)和样本外测试来验证策略稳健性。

2. **市场转型风险**：在市场模式快速转变时(如从趋势到震荡)，策略可能在适应新环境前产生连续亏损。

   *解决方法*：考虑增加市场状态识别机制，在不同市场环境使用不同参数集；实施总体风险限制，如每日最大亏损或连续亏损后暂停交易。

3. **滑点和流动性问题**：高频交易和波动较大的市场可能面临滑点增加和流动性下降的风险。

   *解决方法*：在回测中加入真实的滑点和佣金估计；避免在流动性低的时段交易；考虑使用限价单而非市价单。

4. **系统复杂性**：多层逻辑和条件组合增加了策略的复杂性，可能难以理解和维护。

   *解决方法*：使用策略提供的调试工具密切监控各组件的表现；保持良好的代码注释；考虑模块化测试各组件的独立效果。

5. **过度交易风险**：DCA机制和频繁的信号生成可能导致过度交易，增加交易成本。

   *解决方法*：适当设置冷却期和最小持仓时间；在回测中严格考虑交易成本；定期审查和优化入场标准。

#### 优化方向
1. **机器学习增强**：引入自适应参数优化算法，如贝叶斯优化或遗传算法，自动为不同市场环境找到最佳参数组合。这将减少手动优化的需要，提高策略对市场变化的适应性。

2. **市场环境分类**：开发市场状态分类系统(趋势、震荡、高波动、低波动等)，并为每种状态预设最佳参数配置。这种方法可以在市场转型时更快地调整策略行为，减少适应滞后。

3. **增强的仓位管理**：引入更复杂的仓位管理算法，如基于凯利准则或动量强度的动态仓位调整。这可以优化资金利用，在强势信号时增加暴露，在弱势信号时减少风险。

4. **替代指标整合**：测试其他技术指标的有效性，如Bollinger带、MACD或Ichimoku云图，作为现有系统的补充或替代。不同指标可能在特定市场条件下提供更准确的信号。

5. **情绪数据整合**：考虑加入市场情绪指标，如VIX波动率指数或期权市场数据，以提前识别潜在的市场转型。这些外部数据源可以提供传统技术指标无法捕捉的信息。

6. **多资产关联性分析**：开发跨资产类别的关联性分析，利用一个市场的信号来验证或强化另一个相关市场的交易决策。例如，使用商品价格变动来确认相关股票板块的趋势。

7. **优化计算效率**：重构代码以提高计算效率，特别是对于高频策略。这包括优化ATR计算、条件评估顺序和减少不必要的重复计算。

#### 总结
自适应波动率多指标趋势跟踪交易系统代表了一种全面而灵活的量化交易方法，通过动态参数调整和多层过滤机制，有效应对不同市场环境。策略的核心优势在于其自适应性和综合的风险管理框架，使其特别适合波动性较高的期货市场。

该策略整合了多种经典技术分析工具(移动均线、RSI、烛台形态)，同时加入现代量化交易元素(自适应参数、多时间周期分析、DCA)，形成一个平衡的系统。通过精细控制入场时机、优化多次入场策略和动态调整止损水平，该策略在保护资本的同时，能够充分利用市场趋势机会。

然而，策略的复杂性也带来了参数敏感性和系统维护的挑战。投资者在实施该策略前，应进行充分的回测和前向测试，并准备好根据市场变化调整参数。未来的优化方向包括引入机器学习技术自动优化参数、加入市场环境分类系统和改进仓位管理算法，这些改进将进一步提升策略的稳健性和适应性。

总体而言，该策略提供了一个坚实的量化交易框架，适合有经验的交易者根据特定需求和风险偏好进行定制，在当今瞬息万变的金融市场中寻求一致的交易优势。 || 


#### Overview
The Adaptive Volatility Multi-Indicator Trend Following Trading System is a quantitative trading strategy designed for high-volatility markets, combining dynamically adjusted technical indicators with advanced risk management mechanisms. The core of this strategy lies in using ATR (Average True Range) to dynamically adjust moving average parameters, achieving adaptability to market volatility, while integrating RSI overbought/oversold filtering, candlestick pattern recognition, multi-timeframe trend confirmation, and dollar-cost averaging (DCA) functions to form a comprehensive trading framework. This strategy is particularly suitable for high-volatility environments such as futures markets, providing flexible operational modes for intraday trading and swing trading.

#### Strategy Principles
The core principles of the strategy are based on the following key modules:

1. **Adaptive Moving Average System**: The strategy uses fast and slow Simple Moving Averages (SMA), with lengths dynamically adjusted through ATR. In high-volatility environments, moving average lengths shorten to quickly react to market changes; in low-volatility environments, lengths extend to reduce noise. Long signals are generated when the fast MA crosses above the slow MA with price confirmation; short signals work in reverse.

2. **RSI Momentum Filter**: Validates entry signals through RSI (Relative Strength Index), ensuring trade direction aligns with market momentum. This feature can be optionally enabled or disabled, and supports customized RSI parameters (such as length 14, overbought 60, oversold 40).

3. **Candlestick Pattern Recognition**: The system identifies strong bullish or bearish engulfing patterns, validated by volume and range strength. To avoid false signals, the system skips trades when both opposing patterns appear simultaneously.

4. **Multi-Timeframe Trend Confirmation**: Optionally aligns trading signals with the 15-minute timeframe SMA trend, adding an additional confirmation layer to improve trade quality.

5. **Dollar-Cost Averaging (DCA) Mechanism**: Allows multiple entries in the trend direction, supporting up to a preset number of entries (e.g., 4), with entry intervals based on ATR multiples. This mechanism helps optimize average cost in trending markets.

6. **Advanced Risk Management**:
   - Initial Stop: Based on ATR settings (typically 2-3.5x), with a wider fixed stop multiplier (e.g., 1.3) applied on the entry bar.
   - Trailing Stop: Uses ATR-based offset and multiplier, dynamically adjusted as profit increases (e.g., multiplier reduces from 0.5 to 0.3 when profit exceeds ATR).
   - Profit Target: Set at entry price ±ATR by a specific multiplier (e.g., 1.2).
   - Cooldown Period: Pause after exit (0-5 minutes) to prevent overtrading.
   - Minimum Hold Time: Ensures trades last a certain number of bars (e.g., 2-10).

7. **Trade Execution Logic**: The system prioritizes moving average or candlestick pattern signals (based on user preference), and applies volume, volatility, and time filters. To ensure entry quality, a volume spike condition is also added (volume > 1.2 * 10-period SMA).

#### Strategy Advantages
1. **Strong Market Adaptability**: By dynamically adjusting technical indicator parameters through ATR, the strategy can automatically adapt to different market conditions, maintaining effectiveness in both high and low volatility environments.

2. **Signal Quality Filtering**: Multi-layer filtering mechanisms (RSI, multi-timeframe trend, volume, and volatility) effectively reduce false signals, improving trade quality.

3. **Flexible Entry Mechanism**: Supports prioritizing moving average or candlestick pattern signals based on user preference, and optimizes entry points in the trend direction through DCA functionality.

4. **Dynamic Risk Management**: Stop-loss points and trailing stops adjust dynamically with market volatility and trade profits, protecting capital while giving trends sufficient room to develop.

5. **Visualization and Debugging Tools**: The strategy provides rich chart overlays, real-time dashboards, and debugging tables to help users optimize parameters and understand trading logic.

6. **Modular Design**: Users can enable or disable various features (such as RSI filtering, candlestick pattern recognition, multi-timeframe trend, etc.) according to preferences, offering high customization.

7. **Fine-tuned Entry Control**: Volume spike filters ensure entries only occur during significant market activity, while cooldown mechanisms prevent overtrading.

#### Strategy Risks
1. **Parameter Sensitivity**: The strategy uses multiple parameters (such as moving average lengths, ATR periods, RSI thresholds, etc.), and these settings significantly impact performance. Inappropriate parameter combinations may lead to overfitting historical data.

   *Solution*: Conduct extensive parameter optimization tests while avoiding over-optimization; use walk-forward testing and out-of-sample testing to verify strategy robustness.

2. **Market Transition Risk**: During rapid market mode transitions (e.g., from trending to ranging), the strategy may generate consecutive losses before adapting to the new environment.

   *Solution*: Consider adding market state recognition mechanisms, using different parameter sets for different market environments; implement overall risk limits, such as maximum daily loss or pausing after consecutive losses.

3. **Slippage and Liquidity Issues**: High-frequency trading and highly volatile markets may face increased slippage and reduced liquidity risks.

   *Solution*: Include realistic slippage and commission estimates in backtesting; avoid trading during low liquidity periods; consider using limit orders instead of market orders.

4. **System Complexity**: Multiple layers of logic and condition combinations increase strategy complexity, potentially making it difficult to understand and maintain.

   *Solution*: Use the strategy's debugging tools to closely monitor component performance; maintain good code comments; consider modular testing of each component's independent effect.

5. **Overtrading Risk**: DCA mechanisms and frequent signal generation may lead to overtrading, increasing transaction costs.

   *Solution*: Set appropriate cooldown periods and minimum holding times; strictly consider trading costs in backtesting; regularly review and optimize entry criteria.

#### Optimization Directions
1. **Machine Learning Enhancement**: Introduce adaptive parameter optimization algorithms, such as Bayesian optimization or genetic algorithms, to automatically find optimal parameter combinations for different market environments. This will reduce the need for manual optimization and improve strategy adaptability to market changes.

2. **Market Environment Classification**: Develop a market state classification system (trending, ranging, high volatility, low volatility, etc.), with preset optimal parameter configurations for each state. This approach can adjust strategy behavior more quickly during market transitions, reducing adaptation lag.

3. **Enhanced Position Management**: Introduce more sophisticated position management algorithms, such as dynamic position adjustment based on the Kelly criterion or momentum strength. This can optimize capital utilization, increasing exposure on strong signals and reducing risk on weak signals.

4. **Alternative Indicator Integration**: Test the effectiveness of other technical indicators, such as Bollinger Bands, MACD, or Ichimoku Cloud, as supplements or alternatives to the existing system. Different indicators may provide more accurate signals under specific market conditions.

5. **Sentiment Data Integration**: Consider incorporating market sentiment indicators, such as the VIX volatility index or options market data, to identify potential market transitions in advance. These external data sources can provide information that traditional technical indicators cannot capture.

6. **Multi-Asset Correlation Analysis**: Develop cross-asset class correlation analysis, using signals from one market to validate or strengthen trading decisions in another related market. For example, using commodity price movements to confirm trends in related stock sectors.

7. **Computational Efficiency Optimization**: Refactor code to improve computational efficiency, especially for high-frequency strategies. This includes optimizing ATR calculations, condition evaluation order, and reducing unnecessary repetitive calculations.

#### Summary
The Adaptive Volatility Multi-Indicator Trend Following Trading System represents a comprehensive and flexible quantitative trading approach, effectively addressing different market environments through dynamic parameter adjustments and multi-layer filtering mechanisms. The core advantages of the strategy lie in its adaptability and comprehensive risk management framework, making it particularly suitable for high-volatility futures markets.

The strategy integrates multiple classic technical analysis tools (moving averages, RSI, candlestick patterns) while incorporating modern quantitative trading elements (adaptive parameters, multi-timeframe analysis, DCA) to form a balanced system. Through fine control of entry timing, optimization of multiple entry strategies, and dynamic adjustment of stop-loss levels, the strategy can fully capitalize on market trend opportunities while protecting capital.

However, the complexity of the strategy also brings challenges in parameter sensitivity and system maintenance. Investors should conduct thorough backtesting and forward testing before implementing this strategy, and be prepared to adjust parameters according to market changes. Future optimization directions include introducing machine learning techniques for automatic parameter optimization, adding market environment classification systems, and improving position management algorithms, which will further enhance the strategy's robustness and adaptability.

Overall, this strategy provides a solid quantitative trading framework, suitable for experienced traders to customize according to specific needs and risk preferences, seeking consistent trading advantages in today's rapidly changing financial markets.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-11 00:00:00
end: 2025-04-10 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy('Dskyz Adaptive Futures Elite (DAFE) - Updated', 
         overlay=true, 
         default_qty_type=strategy.fixed, 
         initial_capital=1000000, 
         commission_value=0, 
         slippage=1, 
         pyramiding=10)

// === INPUTS ===

// Moving Average Settings
fastLength       = input.int(9, '[MA] Fast MA Length', minval=1)
slowLength       = input.int(19, '[MA] Slow MA Length', minval=1)

// RSI Settings
useRSI           = input.bool(false, '[RSI Settings] Use RSI Filter')
rsiLength        = input.int(14, 'RSI Length', minval=1)
rsiOverbought    = input.int(60, 'RSI Overbought', minval=50, maxval=100)
rsiOversold      = input.int(40, 'RSI Oversold', minval=0, maxval=50)
rsiLookback      = input.int(1, 'RSI Lookback', minval=1)

// Pattern Settings
usePatterns      = input.bool(true, '[Pattern Settings] Use Candlestick Patterns')
patternLookback  = input.int(19, 'Pattern Lookback Bars', minval=1)

// Filter Settings
useTrendFilter   = input.bool(true, '[Filter Settings] Use 15m Trend Filter')
minVolume        = input.int(10, 'Minimum Volume', minval=1)
volatilityThreshold = input.float(1.0, 'Volatility Threshold (%)', minval=0.1, step=0.1) / 100
tradingStartHour = input.int(9, 'Trading Start Hour (24h)', minval=0, maxval=23)
tradingEndHour   = input.int(16, 'Trading End Hour (24h)', minval=0, maxval=23)

// DCA Settings
useDCA           = input.bool(false, '[DCA Settings] Use DCA')
maxTotalEntries  = input.int(4, 'Max Total Entries per Direction', minval=1)
dcaMultiplier    = input.float(1.0, 'DCA ATR Multiplier', minval=0.1, step=0.1)

// Signal Settings
signalPriority   = input.string('MA', '[Signal Settings] Signal Priority', options=['Pattern', 'MA'])
minBarsBetweenSignals = input.int(5, 'Min Bars Between Signals', minval=1)
plotMode         = input.string('Potential Signals', 'Plot Mode', options=['Potential Signals', 'Actual Entries'])

// Exit Settings
trailOffset      = input.float(0.5, '[Exit Settings] Trailing Stop Offset ATR Multiplier', minval=0.01, step=0.01)
trailPointsMult  = input.float(0.5, 'Trailing Stop Points ATR Multiplier', minval=0.01, step=0.01)
profitTargetATRMult = input.float(1.2, 'Profit Target ATR Multiplier', minval=0.1, step=0.1)  // Profit target factor
fixedStopMultiplier  = input.float(1.3, 'Fixed Stop Multiplier', minval=0.5, step=0.1)    // Fixed stop multiplier

// General Settings
debugLogging     = input.bool(true, '[General Settings] Enable Debug Logging')
fixedQuantity    = input.int(2, 'Trade Quantity', minval=1)
cooldownMinutes  = input.int(0, 'Cooldown Minutes', minval=0)

// ATR Settings – Use Dynamic ATR or fixed value
useDynamicATR    = input.bool(true, title="Use Dynamic ATR")
userATRPeriod    = input.int(7, title="ATR Period (if not using dynamic)", minval=1)
defaultATR       = timeframe.isminutes and timeframe.multiplier <= 2 ? 5 :
                   timeframe.isminutes and timeframe.multiplier <= 5 ? 7 : 10
atrPeriod        = useDynamicATR ? defaultATR : userATRPeriod

// === TRADE TRACKING VARIABLES ===
var int lastSignalBar   = 0
var int lastSignalType  = 0         // 1 for long, -1 for short
var int entryBarIndex   = 0
var bool inLongTrade    = false
var bool inShortTrade   = false

// DCA Tracking Variables
var int longEntryCount  = 0
var int shortEntryCount = 0
var float longInitialEntryPrice = na
var float shortInitialEntryPrice = na
var float longEntryATR  = na
var float shortEntryATR = na
var float long_stop_price = na
var float short_stop_price = na

// Signal Plotting Variables
var int lastLongPlotBar = 0
var int lastShortPlotBar = 0

// === CALCULATIONS ===

// Volume and Time Filters
volumeOk    = volume >= minVolume
currentHour = hour(time)
timeWindow  = currentHour >= tradingStartHour and currentHour <= tradingEndHour

// Additional Entry Filter: Volume Spike Condition
volumeSpike = volume > 1.2 * ta.sma(volume, 10)

// ATR & Volatility Calculations
atr         = ta.atr(atrPeriod)
volatility  = nz(atr / close, 0)
volatilityOk= volatility <= volatilityThreshold

// Adaptive MA Lengths
fastLengthAdaptive = math.round(fastLength / (1 + volatility))
slowLengthAdaptive = math.round(slowLength / (1 + volatility))
fastLengthSafe     = math.max(1, not na(atr) ? fastLengthAdaptive : fastLength)
slowLengthSafe     = math.max(1, not na(atr) ? slowLengthAdaptive : slowLength)
fastMA             = ta.sma(close, fastLengthSafe)
slowMA             = ta.sma(close, slowLengthSafe)

// RSI Calculation
rsi               = ta.rsi(close, rsiLength)
rsiCrossover      = ta.crossover(rsi, rsiOversold)
rsiCrossunder     = ta.crossunder(rsi, rsiOverbought)
rsiLongOk         = not useRSI or (rsiCrossover and rsi[rsiLookback] < 70)
rsiShortOk        = not useRSI or (rsiCrossunder and rsi[rsiLookback] > 30)

// 15m Trend Filter
[fastMA15m, slowMA15m] = request.security(syminfo.tickerid, '15', [ta.sma(close, fastLength), ta.sma(close, slowLength)])
trend15m = fastMA15m > slowMA15m ? 1 : fastMA15m < slowMA15m ? -1 : 0

// Candlestick Patterns
isBullishEngulfing() =>
    close[1] < open[1] and close > open and open < close[1] and close > open[1] and (close - open) > (open[1] - close[1]) * 0.8

isBearishEngulfing() =>
    close[1] > open[1] and close < open and open > close[1] and close < open[1] and (open - close) > (close[1] - open[1]) * 0.8

// Pattern Strength Calculation
patternStrength(isBull) =>
    bull = isBull ? 1 : 0
    bear = isBull ? 0 : 1
    volumeStrength = volume > ta.sma(volume, 10) ? 1 : 0
    rangeStrength  = (high - low) > ta.sma(high - low, 10) ? 1 : 0
    strength = bull * (volumeStrength + rangeStrength) - bear * (volumeStrength + rangeStrength)
    strength

bullStrength = patternStrength(true)
bearStrength = patternStrength(false)

// Detect Patterns
bullishEngulfingOccurred = ta.barssince(isBullishEngulfing()) <= patternLookback and bullStrength >= 1
bearishEngulfingOccurred = ta.barssince(isBearishEngulfing()) <= patternLookback and bearStrength <= -1
patternConflict          = bullishEngulfingOccurred and bearishEngulfingOccurred

// MA Conditions with Trend & RSI Filters
maAbove      = close > fastMA and fastMA > slowMA and close > close[1]
maBelow      = close < fastMA and fastMA < slowMA and close < close[1]
trendLongOk  = not useTrendFilter or trend15m >= 0
trendShortOk = not useTrendFilter or trend15m <= 0

// Signal Priority Logic
bullPattern  = usePatterns and bullishEngulfingOccurred
bearPattern  = usePatterns and bearishEngulfingOccurred
bullMA       = maAbove and trendLongOk and rsiLongOk
bearMA       = maBelow and trendShortOk and rsiShortOk

longCondition  = false
shortCondition = false

if signalPriority == 'Pattern'
    longCondition  := bullPattern or (not bearPattern and bullMA)
    shortCondition := bearPattern or (not bullPattern and bearMA)
else
    longCondition  := bullMA or (not bearMA and bullPattern)
    shortCondition := bearMA or (not bullMA and bearPattern)

// Apply Filters and require volume spike for quality entries
longCondition  := longCondition and volumeOk and volumeSpike and timeWindow and volatilityOk and not patternConflict
shortCondition := shortCondition and volumeOk and volumeSpike and timeWindow and volatilityOk and not patternConflict

// Update Trade Status
if strategy.position_size > 0
    inLongTrade := true
    inShortTrade := false
else if strategy.position_size < 0
    inShortTrade := true
    inLongTrade := false
else
    inLongTrade := false
    inShortTrade := false

// Entry Checks
canTrade      = strategy.position_size == 0
validQuantity = fixedQuantity > 0
quantity      = fixedQuantity

// Prevent Multiple Alerts Per Bar
var bool alertSent = false
if barstate.isnew
    alertSent := false

// Cooldown Logic
var float lastExitTime = na
if strategy.position_size == 0 and strategy.position_size[1] != 0
    lastExitTime := time
canEnter = na(lastExitTime) or ((time - lastExitTime) / 60000 >= cooldownMinutes)

// === ENTRY LOGIC ===
if canTrade and validQuantity and not alertSent and canEnter and barstate.isconfirmed
    if longCondition and not shortCondition and (lastSignalBar != bar_index or lastSignalType != 1)
        strategy.entry('Long', strategy.long, qty=quantity)
        longInitialEntryPrice := close
        longEntryATR         := atr
        longEntryCount       := 1
        alert('Enter Long', alert.freq_once_per_bar)
        alertSent            := true
        lastSignalBar        := bar_index
        lastSignalType       := 1
        entryBarIndex        := bar_index

    else if shortCondition and not longCondition and (lastSignalBar != bar_index or lastSignalType != -1)
        strategy.entry('Short', strategy.short, qty=quantity)
        shortInitialEntryPrice := close
        shortEntryATR          := atr
        shortEntryCount        := 1
        alert('Enter Short', alert.freq_once_per_bar)
        alertSent             := true
        lastSignalBar         := bar_index
        lastSignalType        := -1
        entryBarIndex         := bar_index


// === DCA LOGIC (IF ENABLED) ===
if useDCA
    if strategy.position_size > 0 and longEntryCount < maxTotalEntries and bullMA and rsi < 70
        nextDCALevel = longInitialEntryPrice - longEntryCount * longEntryATR * dcaMultiplier
        if close <= nextDCALevel
            strategy.entry('Long DCA ' + str.tostring(longEntryCount), strategy.long, qty=quantity)
            longEntryCount := longEntryCount + 1
    if strategy.position_size < 0 and shortEntryCount < maxTotalEntries and bearMA and rsi > 30
        nextDCALevel = shortInitialEntryPrice + shortEntryATR * shortEntryCount * dcaMultiplier
        if close >= nextDCALevel
            strategy.entry('Short DCA ' + str.tostring(shortEntryCount), strategy.short, qty=quantity)
            shortEntryCount := shortEntryCount + 1

// === RESET DCA VARIABLES ON EXIT ===
if strategy.position_size == 0 and strategy.position_size[1] != 0
    longEntryCount := 0
    shortEntryCount := 0
    longInitialEntryPrice := na
    shortInitialEntryPrice := na
    longEntryATR := na
    shortEntryATR := na

// === FIXED STOP-LOSS CALCULATION (WIDER INITIAL STOP) ===
long_stop_price  := strategy.position_avg_price - atr * fixedStopMultiplier
short_stop_price := strategy.position_avg_price + atr * fixedStopMultiplier

// === ADJUST TRAILING POINTS BASED ON PROFIT ===
profitLong  = strategy.position_size > 0 ? close - strategy.position_avg_price : 0
profitShort = strategy.position_size < 0 ? strategy.position_avg_price - close : 0
trailPointsMultAdjusted       = profitLong > atr ? 0.3 : profitLong > atr * 0.66 ? 0.4 : trailPointsMult      // For long positions
trailPointsMultAdjustedShort  = profitShort > atr ? 0.3 : profitShort > atr * 0.66 ? 0.4 : trailPointsMult   // For short positions
trailPointsLong  = atr * trailPointsMultAdjusted
trailPointsShort = atr * trailPointsMultAdjustedShort

// === EXIT LOGIC ===
// On the entry bar, always use the fixed stop; thereafter, use a combination of fixed stop, trailing stop, and a profit target.
// Profit Target: For longs, exit at avg_entry + atr * profitTargetATRMult; for shorts, exit at avg_entry - atr * profitTargetATRMult.
if strategy.position_size > 0
    if bar_index == entryBarIndex
        if debugLogging
            log.info("Long exit on entry bar: fixed stop applied. Price=" + str.tostring(close))
        strategy.exit('Long Exit', 'Long', stop=long_stop_price)
    else
        if debugLogging
            log.info("Long Trade: profit=" + str.tostring(profitLong) + ", ATR=" + str.tostring(atr))
        strategy.exit('Long Exit', 'Long', 
             stop=long_stop_price, 
             limit = strategy.position_avg_price + atr * profitTargetATRMult,
             trail_points=trailPointsLong, 
             trail_offset=atr * trailOffset)
            
if strategy.position_size < 0
    if bar_index == entryBarIndex
        if debugLogging
            log.info("Short exit on entry bar: fixed stop applied. Price=" + str.tostring(close))
        strategy.exit('Short Exit', 'Short', stop=short_stop_price)
    else
        if debugLogging
            log.info("Short Trade: profit=" + str.tostring(profitShort) + ", ATR=" + str.tostring(atr))
        strategy.exit('Short Exit', 'Short', 
             stop=short_stop_price, 
             limit = strategy.position_avg_price - atr * profitTargetATRMult,
             trail_points=trailPointsShort, 
             trail_offset=atr * trailOffset)

// === FORCE CLOSE ON LAST BAR (OPTIONAL) ===
if barstate.islast
    if strategy.position_size > 0
        strategy.close('Long', comment='Forced Exit')
    if strategy.position_size < 0
        strategy.close('Short', comment='Forced Exit')

// === SIGNAL PLOTTING LOGIC ===
plotLongSignal  = longCondition and canTrade and (bar_index - lastLongPlotBar >= minBarsBetweenSignals or lastLongPlotBar == 0)
plotShortSignal = shortCondition and canTrade and (bar_index - lastShortPlotBar >= minBarsBetweenSignals or lastShortPlotBar == 0)

if plotLongSignal
    lastLongPlotBar := bar_index
if plotShortSignal
    lastShortPlotBar := bar_index

// Define plotting conditions based on plotMode
plotLongShape  = plotMode == 'Potential Signals' ? plotLongSignal : strategy.position_size > 0 and strategy.position_size[1] <= 0
plotShortShape = plotMode == 'Potential Signals' ? plotShortSignal : strategy.position_size < 0 and strategy.position_size[1] >= 0

// === VISUALIZATION ===
plot(fastMA, color=color.blue, linewidth=2, title='Fast MA')
plot(slowMA, color=color.red, linewidth=2, title='Slow MA')

var float longSL  = na
var float shortSL = na
if strategy.position_size > 0
    longSL := math.max(longSL, high - trailPointsLong)
else
    longSL := na
plot(longSL, color=color.green, style=plot.style_stepline, title='Long SL')

if strategy.position_size < 0
    shortSL := math.min(shortSL, low + trailPointsShort)
else
    shortSL := na
plot(shortSL, color=color.red, style=plot.style_stepline, title='Short SL')

bgcolor(timeWindow ? color.new(color.blue, 95) : na, title="Trading Hours Highlight")
if plotLongShape
    label.new(bar_index, low, "Buy", yloc=yloc.belowbar, color=color.green, textcolor=color.white, style=label.style_label_up)
if plotShortShape
    label.new(bar_index, high, "Sell", yloc=yloc.abovebar, color=color.red, textcolor=color.white, style=label.style_label_down)

// === DEBUG TABLE ===
var table debugTable = table.new(position.top_right, 3, 10, bgcolor=color.rgb(0, 0, 0, 80), border_color=color.white, border_width=1)
if barstate.islast
    table.cell(debugTable, 0, 0, 'Signal', text_color=color.rgb(168, 168, 168), bgcolor=color.rgb(50, 50, 50))
    table.cell(debugTable, 1, 0, 'Status', text_color=color.rgb(168, 168, 168), bgcolor=color.rgb(50, 50, 50))
    table.cell(debugTable, 2, 0, 'Priority', text_color=color.rgb(168, 168, 168), bgcolor=color.rgb(50, 50, 50))

    table.cell(debugTable, 0, 1, 'MA Long', text_color=color.blue)
    table.cell(debugTable, 1, 1, bullMA ? 'Yes' : 'No', text_color=bullMA ? color.green : color.red)
    table.cell(debugTable, 2, 1, signalPriority == 'MA' ? 'High' : 'Low', text_color=color.white)

    table.cell(debugTable, 0, 2, 'MA Short', text_color=color.blue)
    table.cell(debugTable, 1, 2, bearMA ? 'Yes' : 'No', text_color=bearMA ? color.green : color.red)
    table.cell(debugTable, 2, 2, signalPriority == 'MA' ? 'High' : 'Low', text_color=color.white)

    table.cell(debugTable, 0, 3, 'Bull Pattern', text_color=color.blue)
    table.cell(debugTable, 1, 3, bullPattern ? 'Yes' : 'No', text_color=bullPattern ? color.green : color.red)
    table.cell(debugTable, 2, 3, signalPriority == 'Pattern' ? 'High' : 'Low', text_color=color.white)

    table.cell(debugTable, 0, 4, 'Bear Pattern', text_color=color.blue)
    table.cell(debugTable, 1, 4, bearPattern ? 'Yes' : 'No', text_color=bearPattern ? color.green : color.red)
    table.cell(debugTable, 2, 4, signalPriority == 'Pattern' ? 'High' : 'Low', text_color=color.white)

    table.cell(debugTable, 0, 5, 'Filters', text_color=color.rgb(168, 168, 168), bgcolor=color.rgb(50, 50, 50))
    table.cell(debugTable, 1, 5, 'Status', text_color=color.rgb(168, 168, 168), bgcolor=color.rgb(50, 50, 50))
    table.cell(debugTable, 2, 5, '', text_color=color.white, bgcolor=color.rgb(50, 50, 50))

    table.cell(debugTable, 0, 6, 'Time Window', text_color=color.blue)
    table.cell(debugTable, 1, 6, timeWindow ? 'OK' : 'Closed', text_color=timeWindow ? color.green : color.red)
    table.cell(debugTable, 2, 6, str.tostring(currentHour) + 'h', text_color=color.white)

    table.cell(debugTable, 0, 7, 'Volume', text_color=color.blue)
    table.cell(debugTable, 1, 7, volumeOk ? 'OK' : 'Low', text_color=volumeOk ? color.green : color.red)
    table.cell(debugTable, 2, 7, str.tostring(volume, '#'), text_color=color.white)

    table.cell(debugTable, 0, 8, 'Volatility', text_color=color.blue)
    table.cell(debugTable, 1, 8, volatilityOk ? 'OK' : 'High', text_color=volatilityOk ? color.green : color.red)
    table.cell(debugTable, 2, 8, str.tostring(volatility * 100, '#.##') + '%', text_color=color.white)

    table.cell(debugTable, 0, 9, 'Signals', text_color=color.blue)
    table.cell(debugTable, 1, 9, longCondition and not shortCondition ? 'LONG' : shortCondition and not longCondition ? 'SHORT' : longCondition and shortCondition ? 'CONFLICT' : 'NONE', text_color=longCondition and not shortCondition ? color.green : shortCondition and not longCondition ? color.red : color.yellow)
    table.cell(debugTable, 2, 9, canEnter ? alertSent ? 'Sent' : 'Ready' : 'Cooldown', text_color=canEnter ? alertSent ? color.yellow : color.green : color.gray)

// === PERFORMANCE DASHBOARD ===
var table dashboard = table.new(position.bottom_left, 3, 3, bgcolor=color.rgb(0, 0, 0, 80), border_color=color.white, border_width=1)
if barstate.islast
    table.cell(dashboard, 0, 0, 'Position', text_color=color.rgb(168, 168, 168), bgcolor=color.rgb(50, 50, 50))
    table.cell(dashboard, 1, 0, 'P/L', text_color=color.rgb(168, 168, 168), bgcolor=color.rgb(50, 50, 50))
    table.cell(dashboard, 2, 0, 'Statistics', text_color=color.rgb(168, 168, 168), bgcolor=color.rgb(50, 50, 50))

    table.cell(dashboard, 0, 1, strategy.position_size > 0 ? 'Long' : strategy.position_size < 0 ? 'Short' : 'Flat', text_color=strategy.position_size > 0 ? color.green : strategy.position_size < 0 ? color.red : color.blue)
    table.cell(dashboard, 1, 1, str.tostring(strategy.netprofit, '#.##'), text_color=strategy.netprofit >= 0 ? color.green : color.red)
    table.cell(dashboard, 2, 1, 'Win Rate', text_color=color.white)

    table.cell(dashboard, 0, 2, strategy.position_size != 0 ? 'Bars: ' + str.tostring(bar_index - entryBarIndex) : '', text_color=color.white)
    table.cell(dashboard, 1, 2, strategy.position_size != 0 ? 'Cooldown: ' + str.tostring(cooldownMinutes) + 'm' : '', text_color=color.white)
    table.cell(dashboard, 2, 2, strategy.closedtrades > 0 ? str.tostring(strategy.wintrades / strategy.closedtrades * 100, '#.##') + '%' : 'N/A', text_color=color.white)

// === CHART TITLE ===
var table titleTable = table.new(position.bottom_right, 1, 1, bgcolor=color.rgb(0, 0, 0, 80), border_color=color.rgb(0, 50, 137), border_width=1)
table.cell(titleTable, 0, 0, "Dskyz - DAFE Trading Systems", text_color=color.rgb(159, 127, 255, 80), text_size=size.large)

```

> Detail

https://www.fmz.com/strategy/490074

> Last Modified

2025-04-11 13:41:56
