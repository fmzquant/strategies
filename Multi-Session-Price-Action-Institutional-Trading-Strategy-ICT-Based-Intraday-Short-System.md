
> Name

Multi-Session-Price-Action-Institutional-Trading-Strategy-ICT-Based-Intraday-Short-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d7e40632fbab41f7f128.png)
![IMG](https://www.fmz.com/upload/asset/2d87a352b683e654be68f.png)



[trans]

#### 概述

多时段价格行为机构交易策略是一个基于ICT（内部银行交易）理念的日内交易系统，专门设计用于捕捉市场下跌趋势。该策略通过跟踪伦敦、纽约和亚洲三大交易时段的价格行为，识别机构资金流向，并在关键价格区域寻找高概率的做空机会。策略核心在于利用不同交易时段之间的联动关系和价格结构，结合"犹大摆动"等机构交易概念，在流动性集中区域进行精准入场。

#### 策略原理

该策略的运作基于多个交易时段的价格结构分析，主要包括以下几个关键组成部分：

1. **伦敦开盘设置（纽约时间2:00-8:20）**：代码通过变量`sessionLondon`设定伦敦时段开始时间，并实时更新该时段的最高价`londonHigh`和最低价`londonLow`。伦敦时段通常确立日内初始方向。

2. **纽约开盘杀戮区（纽约时间8:20-10:00）**：代码设置`sessionNYOpen`捕捉纽约开盘时间。当价格在纽约时段突破伦敦时段高点后回落（称为"犹大摆动"），满足条件`judasSwing = high >= londonHigh and time >= sessionNYOpen`时，系统准备做空。

3. **伦敦收盘买入设置（纽约时间10:30-13:00）**：代码中`londonCloseBuy`条件判断是否触发伦敦收盘时段的做多信号，价格需要跌破伦敦时段低点，目标是捕捉回调反弹。

4. **亚洲开盘做空设置（纽约时间19:00-2:00）**：代码通过`sessionAsia`标识亚洲时段开始，当价格突破亚洲时段高点时（`close > asiaHigh`），触发做空入场。

策略的核心交易逻辑是利用"犹大摆动"概念，即当价格在纽约时段短暂突破伦敦高点后回落，表明大型机构可能在高位出货，此时做空具有较高胜率。同时，策略也包含伦敦收盘时段的做多反转和亚洲时段的做空策略，形成一个全天候的交易系统。

#### 策略优势

通过深入分析代码，该策略具有以下显著优势：

1. **多时段协同分析**：策略融合了三大交易时段的价格数据，通过变量`londonHigh`、`nyHigh`和`asiaHigh`等全面跟踪不同市场的价格表现，避免了单一时段分析的局限性。

2. **基于机构理念的入场逻辑**：策略核心的"犹大摆动"概念（`judasSwing`条件判断）直接对标机构资金的交易行为，能够有效识别大型机构的诱导性行为和真实意图。

3. **精确的时间控制**：通过`timestamp`函数精确设定各交易时段的开始和结束时间，确保在最活跃的市场时段进行交易，提高交易的有效性。

4. **清晰的风险管理**：代码中包含明确的止损设置（`stopLoss = high + 10 * syminfo.mintick`）和获利目标（`profitTarget = low - 20 * syminfo.mintick`），使每笔交易的风险可控。

5. **可视化支持**：策略通过`plot`函数绘制各时段的高低点，为交易决策提供直观的视觉参考，增强策略的实用性。

#### 策略风险

尽管该策略设计合理，但仍存在以下潜在风险：

1. **假突破风险**：在高波动市场中，"犹大摆动"信号可能产生假突破，导致错误做空。解决方法是增加过滤条件，如结合成交量确认或等待更明确的价格回落模式。

2. **时间依赖性强**：策略高度依赖特定时间段的市场行为，如果市场特性发生变化或者重大新闻在非典型时间发布，策略有效性可能降低。建议配合市场新闻日历使用，在重大数据公布前暂停交易。

3. **止损设置固定**：代码中的止损设置为固定点数（`10 * syminfo.mintick`），没有考虑不同市场和时段的波动性差异。可以改进为基于ATR等波动指标的动态止损。

4. **缺乏过滤机制**：策略没有考虑市场整体趋势和波动环境，在强势上涨行情中可能频繁产生错误的做空信号。建议添加趋势过滤条件，如移动平均线方向或动量指标。

5. **回测偏差风险**：由于策略依赖特定时间段的价格行为，在低时间周期回测时可能存在前瞻性偏差。实际交易中应注意策略表现与回测结果的差异。

#### 策略优化方向

基于代码分析，该策略可从以下几个方向进行优化：

1. **动态止损机制**：将固定点数的止损（`stopLoss = high + 10 * syminfo.mintick`）改为基于ATR的动态止损，如`stopLoss = high + atr(14) * 1.5`，这样可以更好地适应不同市场环境的波动特性。

2. **增加趋势过滤**：添加更高时间周期的趋势判断条件，例如日线或4小时图的移动平均线方向，只在与大趋势一致的方向进行交易，可提高策略的胜率。

3. **成交量确认**：在"犹大摆动"信号触发时增加成交量分析，只有当价格回落伴随成交量增加时才执行做空，这可以减少假突破带来的亏损。

4. **加入市场情绪指标**：结合VIX或其他市场波动指标，在极端波动环境下调整或暂停策略，避免在不稳定市场中交易。

5. **优化入场时机**：目前的做空入场条件仅为`close < open`，可以改进为等待价格回落至关键支撑位（如伦敦时段开盘价或VWAP）再入场，提高入场精确度。

6. **加入多周期确认**：结合更低时间周期的价格结构，在满足主要入场条件后，寻找更精确的入场点，减小滑点和不必要的风险。

这些优化方向旨在提高策略的稳定性和可靠性，使其能够在不同市场环境中保持良好表现。

#### 总结

多时段价格行为机构交易策略是一个集成了ICT交易理念的综合性日内交易系统，通过分析伦敦、纽约和亚洲三大交易时段的价格结构，捕捉机构资金流动带来的高概率交易机会。该策略最大的特点是跟随机构资金流向交易，特别是利用"犹大摆动"概念捕捉做空机会，同时也包含了反转做多和亚洲时段做空策略，形成全面的交易体系。

虽然策略设计合理，包含明确的入场条件和风险管理规则，但仍存在假突破风险和对特定时间依赖性强等缺点。通过加入动态止损、趋势过滤、成交量确认等优化措施，策略的稳定性和适应性可以得到进一步提高。

对于追求日内交易机会的交易者来说，该策略提供了一个结构化的方法来理解和利用不同交易时段的市场特性，特别适合那些希望掌握机构交易理念并在日内短线中获利的交易者。 || 

#### Overview

The Multi-Session Price Action Institutional Trading Strategy is an intraday trading system based on ICT (Inner Circle Trader) concepts, specifically designed to capture market downtrends. The strategy tracks price action across three major trading sessions—London, New York, and Asia—to identify institutional money flow and seek high-probability shorting opportunities at key price levels. The core of the strategy lies in utilizing the interconnected relationships between different trading sessions and price structures, combined with institutional trading concepts such as the "Judas Swing," to execute precise entries in areas of concentrated liquidity.

#### Strategy Principles

The strategy operates based on price structure analysis across multiple trading sessions, comprising several key components:

1. **London Open Setup (2:00-8:20 NY time)**: The code uses the variable `sessionLondon` to set the London session start time and continuously updates the session high `londonHigh` and low `londonLow`. The London session typically establishes the initial direction for the day.

2. **New York Open Kill Zone (8:20-10:00 NY time)**: The code sets `sessionNYOpen` to capture the New York opening time. When price breaks above the London session high and then reverses during the NY session (known as the "Judas Swing"), meeting the condition `judasSwing = high >= londonHigh and time >= sessionNYOpen`, the system prepares for a short entry.

3. **London Close Buy Setup (10:30-13:00 NY time)**: The code's `londonCloseBuy` condition determines whether to trigger a long signal during the London closing session, requiring price to drop below the London session low, aiming to capture retracement bounces.

4. **Asia Open Sell Setup (19:00-2:00 NY time)**: The code identifies the start of the Asian session with `sessionAsia`, triggering a short entry when price breaks above the Asian session high (`close > asiaHigh`).

The core trading logic leverages the "Judas Swing" concept, where price temporarily breaks above the London high during the New York session before reversing, indicating that large institutions may be distributing at higher levels, making short positions highly probable. The strategy also incorporates a long reversal during the London closing session and a short strategy during the Asian session, forming a round-the-clock trading system.

#### Strategy Advantages

Through deep code analysis, this strategy demonstrates the following significant advantages:

1. **Multi-Session Collaborative Analysis**: The strategy integrates price data from three major trading sessions, comprehensively tracking different markets' price performance through variables like `londonHigh`, `nyHigh`, and `asiaHigh`, avoiding the limitations of single-session analysis.

2. **Institution-Based Entry Logic**: The strategy's core "Judas Swing" concept (the `judasSwing` condition) directly aligns with institutional trading behavior, effectively identifying manipulative actions and true intentions of large institutions.

3. **Precise Time Control**: Through the `timestamp` function, the strategy precisely sets the start and end times of each trading session, ensuring trades occur during the most active market periods, enhancing trading effectiveness.

4. **Clear Risk Management**: The code includes explicit stop-loss settings (`stopLoss = high + 10 * syminfo.mintick`) and profit targets (`profitTarget = low - 20 * syminfo.mintick`), making the risk controllable for each trade.

5. **Visualization Support**: The strategy uses the `plot` function to draw the highs and lows of each session, providing intuitive visual references for trading decisions, enhancing the strategy's practicality.

#### Strategy Risks

Despite its rational design, the strategy still faces several potential risks:

1. **False Breakout Risk**: In highly volatile markets, the "Judas Swing" signal may generate false breakouts, leading to incorrect short entries. A solution is to add filtering conditions, such as volume confirmation or waiting for more definitive price reversal patterns.

2. **Strong Time Dependency**: The strategy heavily relies on market behavior during specific time periods. If market characteristics change or major news is released at atypical times, the strategy's effectiveness may decrease. It's recommended to use it in conjunction with a market news calendar and pause trading before major data releases.

3. **Fixed Stop-Loss Setting**: The stop-loss in the code is set as a fixed number of points (`10 * syminfo.mintick`), not accounting for volatility differences across markets and sessions. This could be improved by implementing dynamic stops based on indicators like ATR.

4. **Lack of Filtering Mechanisms**: The strategy doesn't consider overall market trends and volatility environments, potentially generating frequent false short signals in strong upward markets. Adding trend filtering conditions, such as moving average direction or momentum indicators, is recommended.

5. **Backtest Bias Risk**: Since the strategy relies on price behavior during specific time periods, there may be forward-looking bias in low timeframe backtests. Traders should be aware of potential differences between strategy performance and backtest results in actual trading.

#### Strategy Optimization Directions

Based on code analysis, the strategy can be optimized in these directions:

1. **Dynamic Stop-Loss Mechanism**: Replace the fixed-point stop-loss (`stopLoss = high + 10 * syminfo.mintick`) with an ATR-based dynamic stop, such as `stopLoss = high + atr(14) * 1.5`, to better adapt to volatility characteristics in different market environments.

2. **Add Trend Filtering**: Incorporate trend determination conditions from higher timeframes, such as daily or 4-hour chart moving average directions, to trade only in the direction consistent with the larger trend, improving the strategy's win rate.

3. **Volume Confirmation**: Add volume analysis when the "Judas Swing" signal triggers, executing shorts only when price reversal is accompanied by increasing volume, reducing losses from false breakouts.

4. **Incorporate Market Sentiment Indicators**: Combine with VIX or other market volatility indicators to adjust or pause the strategy in extremely volatile environments, avoiding trading in unstable markets.

5. **Optimize Entry Timing**: The current short entry condition is simply `close < open`. This could be improved by waiting for price to retrace to key support levels (such as London session opening price or VWAP) before entering, increasing entry precision.

6. **Add Multi-Timeframe Confirmation**: Combine price structures from lower timeframes to find more precise entry points after meeting the main entry conditions, reducing slippage and unnecessary risk.

These optimization directions aim to enhance the strategy's stability and reliability, enabling it to maintain good performance across different market environments.

#### Summary

The Multi-Session Price Action Institutional Trading Strategy is a comprehensive intraday trading system integrating ICT trading concepts, capturing high-probability trading opportunities driven by institutional money flow by analyzing price structures across the London, New York, and Asian trading sessions. The strategy's most distinctive feature is trading in alignment with institutional money flow, particularly using the "Judas Swing" concept to capture shorting opportunities, while also incorporating reversal long trades and Asian session shorts to form a complete trading system.

Although the strategy is well-designed with clear entry conditions and risk management rules, it still has drawbacks such as false breakout risks and strong dependency on specific time periods. By incorporating dynamic stop-losses, trend filtering, volume confirmation, and other optimization measures, the strategy's stability and adaptability can be further enhanced.

For traders pursuing intraday opportunities, this strategy provides a structured approach to understanding and capitalizing on market characteristics across different trading sessions, particularly suitable for those who wish to master institutional trading concepts and profit from intraday short-term positions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-26 00:00:00
end: 2025-03-25 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("ICT Bread and Butter Sell-Setup", overlay=true)

// Get current date values
t = time
currentYear = year(t)
currentMonth = month(t)
currentDay = dayofmonth(t)

// Time Settings
sessionNYOpen  = timestamp(currentYear, currentMonth, currentDay, 08, 20) // CME Open
sessionLondon  = timestamp(currentYear, currentMonth, currentDay, 02, 00) // London Open
sessionAsia    = timestamp(currentYear, currentMonth, currentDay, 19, 00) // Asia Open
sessionEnd     = timestamp(currentYear, currentMonth, currentDay, 16, 00) // Market Close

// Session Ranges (Initialize to the first bar values)
var float londonHigh = high
var float londonLow = low
var float nyHigh = high
var float nyLow = low
var float asiaHigh = high
var float asiaLow = low

// Update Highs & Lows for Each Session
if (time >= sessionLondon and time < sessionNYOpen)
    londonHigh := math.max(londonHigh, high)
    londonLow := math.min(londonLow, low)

if (time >= sessionNYOpen and time < sessionEnd)
    nyHigh := math.max(nyHigh, high)
    nyLow := math.min(nyLow, low)

if (time >= sessionAsia and time < sessionLondon)
    asiaHigh := math.max(asiaHigh, high)
    asiaLow := math.min(asiaLow, low)

// New York Judas Swing (Temporary Rally)
judasSwing = high >= londonHigh and time >= sessionNYOpen and time < sessionEnd

// Short Entry in NY Kill Zone
shortEntry = judasSwing and close < open
stopLoss = high + 10 * syminfo.mintick
profitTarget = low - 20 * syminfo.mintick

if shortEntry
    strategy.entry("Short", strategy.short)
    strategy.exit("Take Profit", from_entry="Short", limit=profitTarget, stop=stopLoss)

// London Close Buy Setup
londonCloseBuy = time >= timestamp(currentYear, currentMonth, currentDay, 10, 30) and time <= timestamp(currentYear, currentMonth, currentDay, 13, 00) and close < londonLow
if londonCloseBuy
    strategy.entry("Buy", strategy.long)
    strategy.exit("Take Profit Buy", from_entry="Buy", limit=close + 20 * syminfo.mintick, stop=low - 10 * syminfo.mintick)

// Asia Open Sell Setup
asiaSell = time >= sessionAsia and time < sessionLondon and close > asiaHigh
if asiaSell
    strategy.entry("Asia Short", strategy.short)
    strategy.exit("Asia Profit", from_entry="Asia Short", limit=close - 15 * syminfo.mintick, stop=high + 10 * syminfo.mintick)

// Plot High/Low of Sessions
plot(londonHigh, color=color.blue, title="London High")
plot(londonLow, color=color.blue, title="London Low")
plot(nyHigh, color=color.red, title="NY High")
plot(nyLow, color=color.red, title="NY Low")
plot(asiaHigh, color=color.orange, title="Asia High")
plot(asiaLow, color=color.orange, title="Asia Low")

```

> Detail

https://www.fmz.com/strategy/488283

> Last Modified

2025-03-26 15:40:23
