
> Name

Dynamic-Position-Sizing-SuperTrend-Trend-Following-Strategy-with-51-Reward-Risk-Ratio

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8ee706b3ef44a1e3fc8.png)
![IMG](https://www.fmz.com/upload/asset/2d8924941a28e9b531393.png)



[trans]

## 概述

动态资金管理型SuperTrend趋势跟踪5倍风险回报策略是一种基于SuperTrend指标的高级趋势跟踪系统，该策略将趋势判断与精确的资金管理技术相结合，通过动态计算每次交易的头寸大小来控制风险。该策略核心特点是利用ATR（平均真实波动范围）来确定市场波动性，将同方向的交易信号分组管理，并为每组交易设定固定的5:1风险回报比率。系统支持对同方向信号进行多次加仓，同时保持严格的风险管理，每次加仓都仅承担账户总值的1%风险。这种设计使策略能够在保持低风险水平的同时，充分把握强势趋势机会。

## 策略原理

该策略基于SuperTrend指标的趋势判断机制，结合了分组交易和动态头寸管理的高级技术。主要工作原理如下：

1. **SuperTrend指标计算**：首先计算ATR值，然后基于中点价格(HL2)加减ATR乘数来获得基础上下轨。关键创新点在于使用递归平滑技术来计算最终轨道带，这提高了指标的稳定性和可靠性。

2. **趋势判断逻辑**：通过比较收盘价与前期最终轨道带的关系来确定趋势。当收盘价突破上轨时，趋势转为上升；突破下轨时，趋势转为下降；其他情况维持原有趋势。

3. **信号生成机制**：当趋势从下降转为上升时产生买入信号；当趋势从上升转为下降时产生卖出信号。

4. **分组交易管理**：策略将同方向的交易归为一组，为每组交易记录初始止损水平（SuperTrend值）。这使得系统能够统一管理多个相关交易，提高资金效率。

5. **动态头寸计算**：根据公式 `math.floor(strategy.equity * 0.01 / stopDistance)` 计算每次交易的头寸大小，确保每次加仓均只冒险账户的1%。

6. **风险回报设置**：系统自动为每组交易设定5:1的风险回报比，即止盈目标设为止损距离的5倍，显著提高了策略的期望收益。

7. **智能出场机制**：包含三种出场条件：止损（初始SuperTrend水平）、止盈（5倍止损距离）以及趋势反转时的条件出场（亏损、达到止盈目标或移动至保本位）。

## 策略优势

该策略具有多项显著优势：

1. **科学的风险控制**：通过动态头寸调整，确保每笔交易仅承担总资金1%的风险，有效控制单笔交易的下行风险。

2. **增强趋势追踪能力**：分组交易机制允许系统在相同趋势中多次入场，能更充分地捕捉持续性强劲趋势的利润。

3. **优化的风险回报比**：5:1的固定风险回报设置使成功交易的收益远大于亏损交易的损失，从长期来看能提高系统的期望收益。

4. **灵活的头寸管理**：根据当前市场波动性和账户规模动态计算入场头寸，避免了固定头寸带来的风险不均衡问题。

5. **智能的反转管理**：在趋势反转时，系统会基于当前盈亏状况智能选择出场方式，包括接受亏损、取得利润或移动至保本位，然后再进入新方向。

6. **递归平滑SuperTrend**：通过递归计算最终轨道带，减少了虚假信号，提高了趋势判断的可靠性。

7. **全自动化运行**：策略所有参数和条件均清晰定义，适合完全自动化交易，减少人为干预和情绪影响。

## 策略风险

尽管该策略设计精良，但仍存在一些潜在风险：

1. **加仓过度风险**：虽然每次加仓仅风险1%资金，但pyramiding设置为500可能导致在强势单向趋势中累积过大头寸。建议根据个人风险承受能力调低pyramiding参数。

2. **快速反转风险**：市场剧烈波动时可能出现价格跳空越过止损水平的情况，实际损失可能超过预期的1%。建议在高波动性市场降低风险比例或增加额外的波动性过滤器。

3. **参数敏感性**：策略性能对ATR周期和乘数参数较为敏感，不同参数组合在不同市场条件下表现差异显著。建议进行彻底的参数优化和回测，寻找适合特定市场的最佳参数。

4. **趋势市场依赖**：作为趋势跟踪系统，该策略在区间震荡市场中可能产生频繁亏损交易。考虑添加市场环境过滤器，仅在趋势明确时启用策略。

5. **资金管理风险**：虽然单次风险限制在1%，但多个同时活跃的交易组可能导致总风险暂时超过可接受水平。建议设置额外的总体风险限制，例如最大允许同时损失不超过账户的5%。

## 策略优化方向

根据策略的设计和潜在风险，可以考虑以下优化方向：

1. **增加趋势强度过滤器**：结合ADX或类似指标，仅在趋势足够强时才进行交易，减少震荡市场中的虚假信号。实现方法可以是添加`adxValue = ta.adx(14)`计算，并设置`strongTrend = adxValue > 25`作为额外的入场条件。

2. **动态风险回报比**：根据市场波动性自动调整风险回报比，在低波动期间使用更高的回报比，高波动期间降低回报比。可通过计算长期ATR相对当前ATR的比值来动态调整。

3. **添加部分利润获取机制**：设计部分头寸的分批获利系统，例如在达到2倍止损距离时获利25%，3倍时获利25%，保留50%头寸追求5倍目标。这可以提高整体获利概率。

4. **智能加仓条件优化**：除了趋势信号外，添加加仓的额外条件，例如要求在特定顺势移动后才允许加仓，避免在价格盘整时过度加仓。

5. **整合多时间框架分析**：添加更高时间框架的趋势确认，仅在多个时间框架趋势一致时进行交易，提高入场质量。

6. **添加最大敞口限制**：设置账户总风险敞口上限，一旦达到上限（如总资金的5%），暂停新的入场信号，直至风险降低。

7. **优化SuperTrend计算**：考虑使用多种周期或多种乘数的SuperTrend指标组合，通过投票系统提高趋势判断的准确性。

## 总结

动态资金管理型SuperTrend趋势跟踪5倍风险回报策略是一个高度完善的趋势跟踪系统，将精确的趋势识别与科学的资金管理完美结合。通过动态头寸计算、分组交易管理和优化的5:1风险回报设置，该策略在控制风险的同时最大化了捕捉趋势的能力。

该策略的核心优势在于其智能的资金管理系统，确保每次入场仅承担固定比例的风险，同时允许在强趋势中多次加仓以增强收益。优化后的SuperTrend指标计算提高了趋势判断的可靠性，而多样化的出场机制则确保了利润的有效保护。

尽管存在一些潜在风险，如可能的加仓过度和对趋势市场的依赖性，但通过建议的优化措施，如添加趋势强度过滤器、动态调整风险回报比和设置最大敞口限制，这些风险可以得到有效管理。

对于寻求科学、系统化趋势跟踪方法的交易者，该策略提供了一个坚实的框架，既可以直接应用，也可以作为进一步个性化定制的基础。通过谨慎的参数选择和持续的策略监控，该系统有潜力在各种市场环境中取得稳定的长期表现。 || 

## Overview

The Dynamic Position Sizing SuperTrend Trend-Following Strategy with 5:1 Reward-Risk Ratio is an advanced trend-following system based on the SuperTrend indicator that combines trend identification with precise capital management techniques by dynamically calculating position sizes to control risk. The core features of this strategy include utilizing ATR (Average True Range) to determine market volatility, grouping trades in the same direction, and establishing a fixed 5:1 reward-to-risk ratio for each trade group. The system supports multiple pyramiding entries in the same direction while maintaining strict risk management, with each entry risking only 1% of the account equity. This design allows the strategy to fully capitalize on strong trends while maintaining low risk levels.

## Strategy Principles

This strategy is based on the SuperTrend indicator's trend determination mechanism, combined with advanced techniques of grouped trading and dynamic position management. The main working principles are as follows:

1. **SuperTrend Indicator Calculation**: First, the ATR value is calculated, then basic upper and lower bands are obtained by adding and subtracting the ATR multiplier from the midpoint price (HL2). The key innovation lies in using recursive smoothing techniques to calculate the final bands, which improves the indicator's stability and reliability.

2. **Trend Determination Logic**: The trend is determined by comparing the closing price with the previous final bands. When the closing price breaks above the upper band, the trend turns upward; when it breaks below the lower band, the trend turns downward; otherwise, the original trend is maintained.

3. **Signal Generation Mechanism**: Buy signals are generated when the trend changes from downward to upward; sell signals are generated when the trend changes from upward to downward.

4. **Grouped Trade Management**: The strategy groups trades in the same direction and records the initial stop level (SuperTrend value) for each group. This allows the system to uniformly manage multiple related trades, improving capital efficiency.

5. **Dynamic Position Calculation**: The position size for each trade is calculated according to the formula `math.floor(strategy.equity * 0.01 / stopDistance)`, ensuring that each additional entry risks only 1% of the account.

6. **Risk-Reward Setup**: The system automatically sets a 5:1 risk-reward ratio for each trade group, with the profit target set at 5 times the stop distance, significantly improving the strategy's expected return.

7. **Intelligent Exit Mechanism**: Includes three exit conditions: stop loss (initial SuperTrend level), take profit (5 times stop distance), and conditional exits during trend reversals (accepting loss, reaching profit target, or moving to breakeven).

## Strategy Advantages

This strategy has several significant advantages:

1. **Scientific Risk Control**: Through dynamic position adjustment, each trade risks only 1% of total capital, effectively controlling downside risk for individual trades.

2. **Enhanced Trend Tracking Capability**: The grouped trading mechanism allows the system to enter multiple times in the same trend, capturing more profit from strong, sustained trends.

3. **Optimized Risk-Reward Ratio**: The fixed 5:1 risk-reward setting ensures that successful trades yield far greater returns than losses from unsuccessful trades, improving expected returns over the long term.

4. **Flexible Position Management**: Position sizes are dynamically calculated based on current market volatility and account size, avoiding the risk imbalance problems of fixed position sizes.

5. **Intelligent Reversal Management**: During trend reversals, the system intelligently chooses exit methods based on current profit/loss status, including accepting losses, taking profits, or moving to breakeven before entering in the new direction.

6. **Recursively Smoothed SuperTrend**: The recursive calculation of final bands reduces false signals and improves the reliability of trend determination.

7. **Fully Automated Operation**: All parameters and conditions of the strategy are clearly defined, suitable for fully automated trading, reducing human intervention and emotional influence.

## Strategy Risks

Despite its excellent design, the strategy still presents some potential risks:

1. **Excessive Pyramiding Risk**: Although each additional entry risks only 1% of capital, the pyramiding setting of 500 could lead to excessively large positions in strong one-directional trends. It is recommended to lower the pyramiding parameter based on individual risk tolerance.

2. **Rapid Reversal Risk**: During severe market fluctuations, prices may gap beyond stop levels, resulting in actual losses exceeding the expected 1%. Consider reducing the risk percentage or adding additional volatility filters in highly volatile markets.

3. **Parameter Sensitivity**: Strategy performance is sensitive to ATR period and multiplier parameters, with different parameter combinations performing differently under various market conditions. Thorough parameter optimization and backtesting are recommended to find optimal parameters for specific markets.

4. **Trend Market Dependency**: As a trend-following system, this strategy may generate frequent losing trades in range-bound, oscillating markets. Consider adding market environment filters to enable the strategy only when trends are clearly defined.

5. **Capital Management Risk**: Although single-trade risk is limited to 1%, multiple simultaneously active trade groups may temporarily cause total risk to exceed acceptable levels. Consider setting additional overall risk limits, such as maximum allowable simultaneous losses not exceeding 5% of the account.

## Strategy Optimization Directions

Based on the strategy's design and potential risks, the following optimization directions can be considered:

1. **Add Trend Strength Filter**: Combine with ADX or similar indicators and only trade when the trend is strong enough to reduce false signals in oscillating markets. This can be implemented by adding `adxValue = ta.adx(14)` calculation and setting `strongTrend = adxValue > 25` as an additional entry condition.

2. **Dynamic Risk-Reward Ratio**: Automatically adjust the risk-reward ratio based on market volatility, using higher ratios during low volatility periods and lower ratios during high volatility periods. This can be adjusted by calculating the ratio of long-term ATR to current ATR.

3. **Add Partial Profit-Taking Mechanism**: Design a system for taking partial profits, such as taking 25% profit at 2x stop distance, another 25% at 3x, and reserving 50% of the position for the 5x target. This can improve overall profitability.

4. **Intelligent Pyramiding Condition Optimization**: Add additional conditions for pyramiding beyond trend signals, such as requiring specific favorable movements before allowing additional entries, avoiding excessive pyramiding during price consolidation.

5. **Integrate Multi-Timeframe Analysis**: Add higher timeframe trend confirmation and only trade when trends across multiple timeframes align, improving entry quality.

6. **Add Maximum Exposure Limit**: Set an upper limit on total account risk exposure, temporarily suspending new entry signals once the limit (e.g., 5% of total capital) is reached, until risk is reduced.

7. **Optimize SuperTrend Calculation**: Consider using a combination of SuperTrend indicators with various periods or multipliers, improving trend determination accuracy through a voting system.

## Summary

The Dynamic Position Sizing SuperTrend Trend-Following Strategy with 5:1 Reward-Risk Ratio is a highly refined trend-following system that perfectly combines precise trend identification with scientific capital management. Through dynamic position calculation, grouped trade management, and optimized 5:1 risk-reward settings, the strategy maximizes trend-capturing ability while controlling risk.

The core advantage of this strategy lies in its intelligent capital management system, ensuring that each entry risks only a fixed percentage while allowing multiple entries in strong trends to enhance returns. The optimized SuperTrend indicator calculation improves the reliability of trend determination, while diversified exit mechanisms ensure effective protection of profits.

Despite some potential risks, such as possible excessive pyramiding and dependency on trending markets, these risks can be effectively managed through the suggested optimization measures, such as adding trend strength filters, dynamically adjusting risk-reward ratios, and setting maximum exposure limits.

For traders seeking scientific, systematic trend-following methods, this strategy provides a solid framework that can be applied directly or used as a foundation for further customization. With careful parameter selection and continuous strategy monitoring, this system has the potential to achieve stable long-term performance across various market environments.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-31 00:00:00
end: 2025-03-29 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Grouped SuperTrend Strategy 5x – All Signals", overlay=true, initial_capital=100000, default_qty_type=strategy.fixed, default_qty_value=0, pyramiding=500, calc_on_order_fills=true)

// INPUTS
atrPeriod     = input.int(10, title="ATR Period")
atrMultiplier = input.float(3.0, title="ATR Multiplier")

// CALCULATE ATR & BASIC BANDS
atrValue    = ta.atr(atrPeriod)
hl2         = (high + low) / 2
upperBasic  = hl2 + atrMultiplier * atrValue
lowerBasic  = hl2 - atrMultiplier * atrValue

// CALCULATE FINAL BANDS (recursive smoothing)
var float finalUpperBand = na
var float finalLowerBand = na
finalUpperBand := na(finalUpperBand[1]) ? upperBasic : (upperBasic < finalUpperBand[1] or close[1] > finalUpperBand[1] ? upperBasic : finalUpperBand[1])
finalLowerBand := na(finalLowerBand[1]) ? lowerBasic : (lowerBasic > finalLowerBand[1] or close[1] < finalLowerBand[1] ? lowerBasic : finalLowerBand[1])

// DETERMINE TREND
var int trend = 1
trend := nz(trend[1], 1)
if close > finalUpperBand[1]
    trend := 1
else if close < finalLowerBand[1]
    trend := -1
else
    trend := nz(trend[1], 1)
    
// SUPER TREND VALUE: For an uptrend use finalLowerBand, for a downtrend use finalUpperBand.
superTrend = trend == 1 ? finalLowerBand : finalUpperBand

// SIGNALS: A change in trend generates a signal.
buySignal  = (trend == 1 and nz(trend[1], 1) == -1)
sellSignal = (trend == -1 and nz(trend[1], 1) == 1)

// Plot SuperTrend
plot(superTrend, color = trend == 1 ? color.green : color.red, title="SuperTrend")

// POSITION SIZING FUNCTION: Risk 1% of equity per signal based on the stop distance.
calc_qty(stopDistance) =>
    stopDistance > 0 ? math.floor(strategy.equity * 0.01 / stopDistance) : 0

// ─── GROUPING VARIABLES ─────────────────────────────
// When a new group trade is initiated (position goes from flat to non‑zero),
// record the SuperTrend value as the group’s initial stop.
var float groupInitialStop = na
if strategy.position_size == 0
    groupInitialStop := na
if strategy.position_size != 0 and strategy.position_size[1] == 0
    groupInitialStop := superTrend

// Declare groupStopDistance and groupProfitTarget with explicit type.
var float groupStopDistance = na
var float groupProfitTarget = na
if strategy.position_size > 0
    groupStopDistance := strategy.position_avg_price - groupInitialStop
    groupProfitTarget := strategy.position_avg_price + 5 * groupStopDistance
else if strategy.position_size < 0
    groupStopDistance := groupInitialStop - strategy.position_avg_price
    groupProfitTarget := strategy.position_avg_price - 5 * groupStopDistance

// ─── ENTRY LOGIC ─────────────────────────────
// Every SuperTrend signal is taken.
// For same‑direction signals (or when flat), add to the group.
// For reversal signals, exit the existing group per our conditions and then enter the new direction.

// LONG ENTRIES
if buySignal
    // Reversal: if currently short, exit short first.
    if strategy.position_size < 0
        // For shorts, a loss is when close > avg entry.
        if close > strategy.position_avg_price
            strategy.close("Short", comment="Short Reversal Loss Exit")
        // For shorts, profit when price is below the profit target.
        else if close <= groupProfitTarget
            strategy.close("Short", comment="Short Reversal Profit Target Exit")
        else
            // Otherwise, update exit to break-even.
            strategy.exit("Short_BE", from_entry="Short", stop=strategy.position_avg_price, comment="Short BE Trailing")
        // Enter new long trade.
        stopDist = close - superTrend
        qty = calc_qty(stopDist)
        if qty > 0
            strategy.entry("Long", strategy.long, qty=qty, comment="Long Entry on Reversal")
        // Reset group initial stop for new group.
        groupInitialStop := superTrend
    else
        // Flat or already long – add to the long group.
        stopDist = close - superTrend
        qty = calc_qty(stopDist)
        if qty > 0
            strategy.entry("Long", strategy.long, qty=qty, comment="Long Add Entry")

// SHORT ENTRIES
if sellSignal
    if strategy.position_size > 0
        // Reversal: if currently long, exit long first.
        if close < strategy.position_avg_price
            strategy.close("Long", comment="Long Reversal Loss Exit")
        else if close >= groupProfitTarget
            strategy.close("Long", comment="Long Reversal Profit Target Exit")
        else
            strategy.exit("Long_BE", from_entry="Long", stop=strategy.position_avg_price, comment="Long BE Trailing")
        // Enter new short trade.
        stopDist = superTrend - close
        qty = calc_qty(stopDist)
        if qty > 0
            strategy.entry("Short", strategy.short, qty=qty, comment="Short Entry on Reversal")
        groupInitialStop := superTrend
    else
        // Flat or already short – add to the short group.
        stopDist = superTrend - close
        qty = calc_qty(stopDist)
        if qty > 0
            strategy.entry("Short", strategy.short, qty=qty, comment="Short Add Entry")

// ─── EXIT ORDERS ─────────────────────────────
// Set default aggregated exit orders based on the group’s initial stop and profit target.
if strategy.position_size > 0
    strategy.exit("LongExit", from_entry="Long", stop=groupInitialStop, limit=groupProfitTarget)
if strategy.position_size < 0
    strategy.exit("ShortExit", from_entry="Short", stop=groupInitialStop, limit=groupProfitTarget)

```

> Detail

https://www.fmz.com/strategy/488851

> Last Modified

2025-03-31 11:53:06
