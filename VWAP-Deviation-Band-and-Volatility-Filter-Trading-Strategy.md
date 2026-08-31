
> Name

VWAP-Deviation-Band-and-Volatility-Filter-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8834cd97d06eeae2b81.png)
![IMG](https://www.fmz.com/upload/asset/2d82a5aa31e3e6e89491a.png)


[trans]

#### 概述
VWAP偏差带与波动性过滤交易策略是一种基于成交量加权平均价(VWAP)和标准差通道的日内交易系统。该策略利用VWAP作为价格的中心参考点，结合Al Brooks的H1/H2和L1/L2反转形态，并通过ATR波动性过滤器筛选低波动性环境，形成结构化的交易决策框架。策略在价格突破标准差通道后回归时进场，同时设置了基于信号柱形态的止损和多种灵活的获利方式，包括回归VWAP和偏差带目标位。此外，安全退出机制在连续不利价格走势出现时提供额外保护，使该策略在各种市场环境中都能保持稳健性。

#### 策略原理
该策略的核心原理建立在以下几个关键组件上：

1. **锚定每个交易日的VWAP计算**：每个交易日开始时重置VWAP计算，确保价格参考点与当日交易活动紧密相关。策略使用标准差创建VWAP上下的波动带，默认设置为2倍标准差。

2. **入场触发信号**：
   - 多头入场(H1/H2)：当价格开盘低于下方2倍标准差偏差带，但收盘高于此偏差带，同时具有足够的多头强度(通过bar区间内的收盘位置计算)。
   - 空头入场(L1/L2)：当价格开盘高于上方2倍标准差偏差带，但收盘低于此偏差带，同时具有足够的空头强度。

3. **波动性过滤器**：
   - 使用ATR(14)测量市场波动性
   - 当标准差范围过小(小于3倍ATR)时跳过交易信号，避免在低波动环境中的误入场

4. **止损设置**：
   - 多头：信号柱低点减去止损缓冲区
   - 空头：信号柱高点加上止损缓冲区

5. **获利出场策略**：
   - 可为多空方向独立配置不同的出场逻辑
   - 选项包括：回归VWAP、达到特定偏差带目标位、或禁用自动获利

6. **安全退出机制**：
   - 当连续出现预定数量的反向柱形时触发安全退出
   - 多头：连续X个阴柱
   - 空头：连续X个阳柱
   
策略实现了一套完整的信号强度计算机制，通过计算收盘价在高低点范围内的相对位置来评估每个信号的质量。只有当信号强度达到最小阈值(默认0.7)时，才会考虑入场信号有效。

#### 策略优势
深入分析代码后，该策略具有以下显著优势：

1. **基于市场结构的入场**：策略不是简单地追踪价格波动，而是寻找价格在偏差带附近的特定反转形态，这意味着交易是顺着回归均值的统计优势进行的。

2. **多重过滤机制**：通过波动性过滤器、信号强度要求和特定的价格形态，多层次地筛选交易信号，显著减少误导信号。

3. **灵活的风险管理**：策略提供了多种风险控制工具，包括基于信号柱的紧密止损、可调整的获利目标和安全退出机制，使交易者能够根据不同市场环境调整风险参数。

4. **独立的多空配置**：策略允许交易者独立配置多头和空头交易的进场和出场条件，这对在有方向性偏好的市场中优化表现非常有价值。

5. **视觉辅助**：策略包含丰富的可视化选项，如VWAP、偏差带显示和低波动区域高亮，帮助交易者更直观地理解市场状态和潜在信号。

6. **会话锚定VWAP**：每个交易日重新计算VWAP，确保价格参考点始终与当前市场活动相关，避免了使用过时参考点的问题。

7. **强调信号质量**：通过信号强度计算，策略关注高质量反转信号，而非仅仅是价格与偏差带的机械交叉。

#### 策略风险
尽管该策略设计精良，但仍存在以下潜在风险：

1. **趋势市场中的反转风险**：作为一种基于均值回归的策略，在强劲趋势市场中可能频繁触发逆势信号，导致连续止损。解决方法：在强势趋势环境中，可禁用逆势方向交易或增加过滤条件。

2. **参数敏感性**：策略性能高度依赖于多个关键参数，如标准差倍数、止损大小和信号强度阈值。解决方法：进行全面的参数优化和敏感性分析，找到在不同市场条件下稳健的参数集。

3. **缺乏时间过滤**：策略没有考虑交易时段的特性，可能在市场开盘或收盘等波动性特别高的时段产生误导信号。解决方法：添加时间过滤器，避免在特定市场时段交易。

4. **固定止损风险**：使用固定点数的止损可能在不同波动性环境下表现不一致。解决方法：考虑使用基于ATR的动态止损，使止损与当前市场波动性相适应。

5. **缺乏交易量过滤**：策略虽然使用VWAP，但没有直接过滤低交易量环境，这可能导致在流动性不足的情况下产生不可靠信号。解决方法：加入交易量阈值条件，确保只在足够流动性的环境中交易。

6. **安全退出的时机问题**：固定数量的反向柱形可能过早触发安全退出，或在真正需要退出时反应不够迅速。解决方法：考虑结合价格波动幅度与柱形数量的动态安全退出机制。

#### 策略优化方向
基于代码分析，以下是可能的优化方向：

1. **动态偏差带倍数**：当前策略使用固定的2倍标准差作为入场触发条件。可以考虑根据市场波动性动态调整这个倍数，在高波动市场使用更大的倍数，低波动市场使用更小的倍数，以适应不同市场环境。

2. **添加时间过滤器**：实现特定时间段的交易过滤，避开市场开盘、收盘和午餐时段等波动不稳定的时期，或者专注于特定的高效交易时段。

3. **整合市场结构分析**：加入更高时间框架的趋势分析，只在与更大趋势一致的方向上交易，或者在反趋势信号上使用更严格的过滤条件。

4. **优化安全退出机制**：目前的安全退出基于固定数量的反向柱形。可以考虑结合价格移动幅度，如当价格回撤超过入场后最大有利移动的特定百分比时触发退出。

5. **加入交易量确认**：在入场信号形成时，加入交易量确认条件，确保信号伴随着足够的市场参与度，提高信号可靠性。

6. **实现动态止损管理**：将固定点数止损替换为基于ATR的动态止损，或实现移动止损功能，保护已获利润。

7. **添加盈亏比过滤**：在入场前计算潜在目标与止损的比率，只执行那些具有足够有利盈亏比的交易。

8. **季节性和日历效应整合**：分析并利用特定市场的季节性模式和日历效应，在统计上更有利的时期加强交易，或在不利时期减少交易。

这些优化可以提高策略的稳健性和盈利能力，特别是在不同市场环境下的适应性。

#### 总结
VWAP偏差带与波动性过滤交易策略是一个设计完善的日内交易系统，结合了技术分析中的多个关键概念。它利用VWAP作为价格中心参考点，通过标准差计算偏差带，并在价格从这些带区反弹时捕捉交易机会。该策略的核心优势在于其多层次的过滤机制和灵活的风险管理系统，使其能够适应不同的市场环境。

尽管存在一些潜在风险，如在强趋势市场中的反转风险和参数敏感性，但这些都可以通过进一步优化来缓解。优化方向包括动态调整偏差带倍数、添加时间过滤器、整合更高时间框架分析和改进止损管理等。

总的来说，这是一个基础扎实的策略框架，适合有经验的交易者进一步定制和改进。通过针对特定市场和交易风格的优化，它有潜力成为一个可靠的日内交易工具，特别是在波动性适中且有均值回归趋势的市场环境中。 || 
#### Overview
The VWAP Deviation Band and Volatility Filter Trading Strategy is an intraday trading system based on Volume Weighted Average Price (VWAP) and standard deviation channels. This strategy utilizes VWAP as a central reference point for price, combines Al Brooks' H1/H2 and L1/L2 reversal patterns, and employs an ATR-based volatility filter to screen out low volatility environments, forming a structured trading decision framework. The strategy enters positions when price breaks through standard deviation channels and then reverts, while implementing signal-bar-based stop losses and various flexible profit-taking methods, including regression to VWAP and deviation band targets. Additionally, a safety exit mechanism provides extra protection when consecutive adverse price movements occur, ensuring the strategy maintains robustness across various market conditions.

#### Strategy Principles
The core principles of this strategy are built on several key components:

1. **VWAP Calculation Anchored to Each Trading Session**: The VWAP calculation resets at the beginning of each trading day, ensuring that the price reference point is closely related to the current day's trading activity. The strategy uses standard deviations to create bands above and below VWAP, defaulting to 2x standard deviation.

2. **Entry Trigger Signals**:
   - Long Entry (H1/H2): When price opens below the lower 2x standard deviation band but closes above this band, with sufficient bullish strength (calculated via the closing position within the bar range).
   - Short Entry (L1/L2): When price opens above the upper 2x standard deviation band but closes below this band, with sufficient bearish strength.

3. **Volatility Filter**:
   - Uses ATR(14) to measure market volatility
   - Skips trading signals when the standard deviation range is too small (less than 3x ATR), avoiding false entries in low volatility environments

4. **Stop Loss Configuration**:
   - Longs: Signal bar low minus a stop buffer
   - Shorts: Signal bar high plus a stop buffer

5. **Profit-Taking Exit Strategies**:
   - Different exit logic can be configured independently for long and short directions
   - Options include: regression to VWAP, reaching specific deviation band targets, or disabling automatic profit-taking

6. **Safety Exit Mechanism**:
   - Triggers a safety exit when a predetermined number of consecutive opposing bars appear
   - Longs: X consecutive bearish bars
   - Shorts: X consecutive bullish bars
   
The strategy implements a complete signal strength calculation mechanism by measuring the relative position of the closing price within the high-low range to evaluate the quality of each signal. Entry signals are only considered valid when signal strength reaches a minimum threshold (default 0.7).

#### Strategy Advantages
After in-depth code analysis, this strategy demonstrates the following significant advantages:

1. **Market Structure-Based Entries**: Rather than simply tracking price movements, the strategy looks for specific reversal patterns near deviation bands, meaning trades are conducted with the statistical advantage of mean reversion.

2. **Multi-Layered Filtering Mechanism**: Through volatility filters, signal strength requirements, and specific price patterns, trade signals are screened on multiple levels, significantly reducing misleading signals.

3. **Flexible Risk Management**: The strategy provides various risk control tools, including tight signal-bar-based stop losses, adjustable profit targets, and a safety exit mechanism, allowing traders to adjust risk parameters for different market environments.

4. **Independent Long/Short Configuration**: The strategy allows traders to independently configure entry and exit conditions for long and short trades, which is particularly valuable for optimizing performance in markets with directional bias.

5. **Visual Aids**: The strategy includes rich visualization options, such as VWAP, deviation band display, and highlighting of low volatility zones, helping traders intuitively understand market conditions and potential signals.

6. **Session-Anchored VWAP**: Recalculating VWAP for each trading day ensures that price reference points always remain relevant to current market activity, avoiding issues with outdated reference points.

7. **Emphasis on Signal Quality**: Through signal strength calculations, the strategy focuses on high-quality reversal signals rather than merely mechanical crossovers of price and deviation bands.

#### Strategy Risks
Despite its well-designed structure, the strategy still presents the following potential risks:

1. **Reversal Risk in Trending Markets**: As a mean-reversion-based strategy, it may frequently trigger counter-trend signals in strong trending markets, leading to consecutive stop losses. Solution: Disable counter-trend direction trading in strong trend environments or add additional filtering conditions.

2. **Parameter Sensitivity**: Strategy performance heavily depends on multiple key parameters, such as standard deviation multiplier, stop loss size, and signal strength threshold. Solution: Conduct comprehensive parameter optimization and sensitivity analysis to find robust parameter sets for different market conditions.

3. **Lack of Time Filtering**: The strategy does not consider the characteristics of trading sessions and may generate misleading signals during especially volatile periods such as market opening or closing. Solution: Add time filters to avoid trading during specific market sessions.

4. **Fixed Stop Loss Risk**: Using a fixed point-based stop loss may perform inconsistently across different volatility environments. Solution: Consider using ATR-based dynamic stop losses that adapt to current market volatility.

5. **Lack of Volume Filtering**: While the strategy uses VWAP, it doesn't directly filter low volume environments, which may lead to unreliable signals in conditions of insufficient liquidity. Solution: Add volume threshold conditions to ensure trading only in environments with adequate liquidity.

6. **Timing Issues with Safety Exit**: A fixed number of opposing bars may trigger safety exits prematurely or react too slowly when an exit is truly needed. Solution: Consider a dynamic safety exit mechanism that combines price movement magnitude with bar count.

#### Strategy Optimization Directions
Based on code analysis, here are potential optimization directions:

1. **Dynamic Deviation Band Multiplier**: The current strategy uses a fixed 2x standard deviation for entry trigger conditions. Consider dynamically adjusting this multiplier based on market volatility, using larger multipliers in high-volatility markets and smaller ones in low-volatility markets to adapt to different market environments.

2. **Add Time Filters**: Implement trade filtering for specific time periods, avoiding unstable volatility periods such as market opening, closing, and lunch hours, or focusing on specific high-efficiency trading sessions.

3. **Integrate Market Structure Analysis**: Incorporate trend analysis from higher timeframes, trading only in directions consistent with larger trends, or using stricter filtering conditions for counter-trend signals.

4. **Optimize Safety Exit Mechanism**: The current safety exit is based on a fixed number of opposing bars. Consider combining price movement magnitude, such as triggering an exit when price retraces beyond a specific percentage of the maximum favorable movement after entry.

5. **Add Volume Confirmation**: When entry signals form, add volume confirmation conditions to ensure signals are accompanied by sufficient market participation, improving signal reliability.

6. **Implement Dynamic Stop Loss Management**: Replace fixed point-based stops with ATR-based dynamic stop losses, or implement trailing stop functionality to protect accumulated profits.

7. **Add Risk-Reward Ratio Filtering**: Calculate the potential target-to-stop ratio before entry, executing only trades with sufficiently favorable risk-reward ratios.

8. **Incorporate Seasonality and Calendar Effects**: Analyze and leverage seasonal patterns and calendar effects specific to the market, increasing trading during statistically favorable periods and reducing it during unfavorable periods.

These optimizations can improve the strategy's robustness and profitability, particularly its adaptability across different market environments.

#### Conclusion
The VWAP Deviation Band and Volatility Filter Trading Strategy is a well-designed intraday trading system that combines several key concepts from technical analysis. It utilizes VWAP as the central price reference point, calculates deviation bands through standard deviations, and captures trading opportunities when price rebounds from these bands. The core strengths of this strategy lie in its multi-layered filtering mechanism and flexible risk management system, enabling it to adapt to different market environments.

Despite some potential risks, such as reversal risk in strong trending markets and parameter sensitivity, these can be mitigated through further optimization. Optimization directions include dynamically adjusting deviation band multipliers, adding time filters, integrating higher timeframe analysis, and improving stop loss management.

Overall, this is a solidly constructed strategy framework suitable for experienced traders to further customize and improve. Through optimization targeted at specific markets and trading styles, it has the potential to become a reliable intraday trading tool, especially in moderately volatile markets with mean-reversion tendencies.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-03-30 00:00:00
end: 2025-03-31 20:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("VWAP Strategy", overlay=true, default_qty_type=strategy.fixed, default_qty_value=1, initial_capital=2000)

// === Inputs ===
src = input.source(hlc3, "Source")
stopPoints = input.float(20.0, "Stop Buffer (Points from Signal Bar High/Low)", step=0.25)

exitModeLong = input.string("VWAP", "Long Exit Rule", options=["VWAP", "Deviation Band", "None"])
exitModeShort = input.string("VWAP", "Short Exit Rule", options=["VWAP", "Deviation Band", "None"])
targetLongDeviation = input.float(2.0, "Long Target Deviation", step=0.1)
targetShortDeviation = input.float(2.0, "Short Target Deviation", step=0.1)

enableSafetyExit = input.bool(true, "Enable Safety Exit")
numOpposingBars = input.int(3, "Opposing Bars for Safety Exit", minval=1)

allowLongs = input.bool(true, "Allow Long Trades")
allowShorts = input.bool(true, "Allow Short Trades")

minStrength = input.float(0.7, "Minimum Signal Strength (0-1)", step=0.05)

showVWAP = input.bool(true, "Show VWAP")
showBands = input.bool(true, "Show Entry Bands")
showLowVolZones = input.bool(true, "Highlight Low Vol Zones")

// === VWAP Session Logic ===
var float sumSrc = na
var float sumVol = na
var float sumSrcSqVol = na

newSession = ta.change(time("D"))
if newSession or na(sumSrc)
    sumSrc := 0.0
    sumVol := 0.0
    sumSrcSqVol := 0.0

sumSrc += src * volume
sumVol += volume
sumSrcSqVol += math.pow(src, 2) * volume

vwap = sumSrc / sumVol
variance = (sumSrcSqVol / sumVol) - math.pow(vwap, 2)
stdev = math.sqrt(variance)

// === Deviation Bands ===
bandEntryMult = 2.0
entryUpper = vwap + stdev * bandEntryMult
entryLower = vwap - stdev * bandEntryMult

targetUpperLong = vwap + stdev * targetLongDeviation
targetLowerShort = vwap - stdev * targetShortDeviation

// === ATR-Based Volatility Filter ===
atrVal = ta.atr(14)
isVolTooLow = stdev * 2 < atrVal * 3
bgcolor(showLowVolZones and isVolTooLow ? color.new(color.orange, 85) : na, title="Low Volatility Zone")

// === Signal Strength Calculations ===
barRange = high - low
bullStrength = barRange > 0 ? (close - low) / barRange : 0
bearStrength = barRange > 0 ? (high - close) / barRange : 0

// === Entry Triggers with Strength Filter ===
isH1H2 = open < entryLower and close > entryLower and bullStrength >= minStrength
isL1L2 = open > entryUpper and close < entryUpper and bearStrength >= minStrength

plotshape(isH1H2, title="H1/H2", location=location.belowbar, color=color.lime, style=shape.triangleup, size=size.tiny)
plotshape(isL1L2, title="L1/L2", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.tiny)

// === Signal Bar Stop Tracking ===
var float signalLow = na
var float signalHigh = na

// === Entry Logic ===
longCondition = allowLongs and isH1H2 and strategy.position_size == 0 and not isVolTooLow
shortCondition = allowShorts and isL1L2 and strategy.position_size == 0 and not isVolTooLow

if longCondition
    strategy.entry("Long", strategy.long)
    signalLow := low

if shortCondition
    strategy.entry("Short", strategy.short)
    signalHigh := high

// === Reset Signal Bar Info
if strategy.position_size == 0
    signalLow := na
    signalHigh := na

// === Apply Signal-Bar-Based Stop
if strategy.opentrades > 0
    if strategy.position_size > 0 and not na(signalLow)
        strategy.exit("Long SL", from_entry="Long", stop=signalLow - stopPoints)
    if strategy.position_size < 0 and not na(signalHigh)
        strategy.exit("Short SL", from_entry="Short", stop=signalHigh + stopPoints)

// === Target Exits (Independent per side)
exitLongVWAP = strategy.position_size > 0 and exitModeLong == "VWAP" and high >= vwap
exitLongDev  = strategy.position_size > 0 and exitModeLong == "Deviation Band" and high >= targetUpperLong
exitShortVWAP = strategy.position_size < 0 and exitModeShort == "VWAP" and low <= vwap
exitShortDev  = strategy.position_size < 0 and exitModeShort == "Deviation Band" and low <= targetLowerShort

if exitModeLong != "None" and (exitLongVWAP or exitLongDev)
    strategy.close("Long", comment="Target Exit")

if exitModeShort != "None" and (exitShortVWAP or exitShortDev)
    strategy.close("Short", comment="Target Exit")

// === Safety Exit
bullishBar(i) => close[i] > open[i]
bearishBar(i) => close[i] < open[i]

bullCount = 0
bearCount = 0
for i = 0 to numOpposingBars - 1
    bullCount += bullishBar(i) ? 1 : 0
    bearCount += bearishBar(i) ? 1 : 0

exitSafetyLong = enableSafetyExit and strategy.position_size > 0 and bearCount == numOpposingBars
exitSafetyShort = enableSafetyExit and strategy.position_size < 0 and bullCount == numOpposingBars

if exitSafetyLong
    strategy.close("Long", comment="Safety Exit")

if exitSafetyShort
    strategy.close("Short", comment="Safety Exit")

// === Plotting ===
plot(showVWAP ? vwap : na, color=color.blue, title="VWAP")
pUpper = plot(showBands ? entryUpper : na, color=color.green, title="Upper Entry Band")
pLower = plot(showBands ? entryLower : na, color=color.red, title="Lower Entry Band")
fill(pUpper, pLower, color=color.new(color.gray, 85))
```

> Detail

https://www.fmz.com/strategy/489644

> Last Modified

2025-04-07 11:57:10
