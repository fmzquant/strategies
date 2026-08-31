
> Name

Dynamic-Fair-Value-Gap-Intraday-Trading-Strategy-A-Multi-Timeframe-Backtesting-System-Based-on-Smart-Money-Concept-Theory

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d89d0207e49d0e89b3e5.png)
![IMG](https://www.fmz.com/upload/asset/2d8ab333626ddfd156dc2.png)


[trans]
#### 概述

动态公允价值缺口日内交易策略是一种基于市场结构理论的量化交易系统，专注于识别和交易价格中的公允价值缺口（Fair Value Gap，简称FVG）。该策略利用三根蜡烛线形态来检测价格行为中的供需不平衡，并在价格回测这些区域时进行入场交易。策略采用固定的风险回报比进行风险管理，并设置了每日特定时间的强制平仓机制，以避免隔夜风险。这种方法源自智能资金概念（Smart Money Concept，简称SMC）理论，该理论关注机构资金行为和市场微观结构变化。通过系统化地识别和交易这些高概率回报区域，该策略旨在捕捉日内价格波动，同时保持严格的风险控制措施。

#### 策略原理

公允价值缺口交易策略的核心原理基于价格在快速移动时留下的"未成交区域"或"缺口"。这些区域代表了供需严重不平衡，通常在未来会被"填补"或"重新测试"。具体来说，策略通过以下方式工作：

1. **缺口检测机制**：策略使用三根蜡烛线模式来识别两种类型的FVG：
   - 看涨FVG：当前蜡烛线的最低价高于两根蜡烛线之前的最高价，且前一根蜡烛线的收盘价高于两根蜡烛线之前的最高价。
   - 看跌FVG：当前蜡烛线的最高价低于两根蜡烛线之前的最低价，且前一根蜡烛线的收盘价低于两根蜡烛线之前的最低价。

2. **回测入场逻辑**：策略不会在FVG形成时立即入场，而是等待价格回测这些区域：
   - 看涨FVG：当价格回落至FVG区域上边界（高点）时，触发做多信号。
   - 看跌FVG：当价格反弹至FVG区域下边界（低点）时，触发做空信号。

3. **风险管理**：
   - 止损设置在相应FVG的边界（看涨FVG的低点或看跌FVG的高点）。
   - 获利目标采用1:2的风险回报比，计算方式为：入场价格±（入场价格-止损）×2。

4. **日终平仓**：策略在每天下午3:15（印度标准时间）自动平仓所有持仓，并清除所有FVG数组，为下一个交易日做准备。

5. **叠加交易**：策略允许最多5次叠加交易（pyramiding），这意味着在同一方向可以持有多个仓位，从而在强趋势市场中放大收益。

这种方法利用了市场结构中的不连续性和价格行为理论，试图捕捉价格在填补这些不平衡区域时的可预测行为。

#### 策略优势

深入分析代码后，该策略展现了多项优势：

1. **客观交易标准**：策略使用明确定义的数学条件来识别FVG和入场点，消除了主观判断，提高了交易纪律性和一致性。

2. **基于市场结构的交易**：通过交易公允价值缺口，策略专注于市场中真正的供需不平衡区域，而不是依赖传统指标的信号，这些信号往往滞后于价格行为。

3. **风险控制机制**：
   - 预设的止损明确了每笔交易的最大风险。
   - 固定的风险回报比确保长期盈利所需的胜率合理。
   - 日终强制平仓消除了隔夜风险。

4. **复合收益潜力**：通过允许叠加交易（最多5个仓位），策略可以在强势趋势市场中显著增加收益，同时通过止损控制每个仓位的风险。

5. **自适应性**：策略不依赖于固定的价格水平，而是动态识别当前市场条件下的关键区域，使其在不同市场环境和工具中都具有适应性。

6. **编程效率**：代码使用数组存储FVG信息，并有效管理多个潜在交易机会，确保系统可以跟踪和响应多个价格水平。

7. **可视化辅助**：策略在图表上直观地显示FVG区域（绿色为看涨FVG，红色为看跌FVG），帮助交易者理解系统的决策过程。

#### 策略风险

尽管该策略具有坚实的理论基础和多项优势，但也存在几个需要注意的风险因素：

1. **假突破风险**：在盘整市场中，价格可能多次触及FVG边界而不形成持续趋势，导致多次止损出局。解决方法可以包括添加额外的市场环境过滤器或趋势确认指标。

2. **叠加交易风险**：允许最多5个同向仓位可能导致在错误方向上过度暴露，特别是在趋势突然逆转时。建议实施总体风险限制，比如所有仓位的最大风险不超过账户的特定百分比。

3. **固定风险回报比的局限性**：使用固定的1:2风险回报比可能并不适合所有市场条件。在波动性较低的市场中，这样的目标可能难以实现；在波动性高的市场中，可能过早退出有利可图的交易。考虑基于市场波动性调整获利目标。

4. **缺乏市场环境过滤**：策略在所有市场条件下均生成信号，而不考虑整体趋势或波动状态。在强趋势环境中交易逆势FVG可能导致连续亏损。添加趋势过滤器可以显著提高性能。

5. **缺乏交易量确认**：策略仅基于价格行为，没有考虑交易量确认，这可能会导致在低交易量区域产生虚假信号。整合交易量分析可以提高信号质量。

6. **固定时间退出的潜在问题**：在每日特定时间退出可能导致在有利位置过早退出或在不利位置错过更好的退出机会。考虑结合基于价格行为的退出条件。

7. **依赖历史回测假设**：战略假设未来FVG的行为将类似于过去观察到的模式。市场动态可能改变，减弱这些模式的有效性。定期重新优化参数和验证假设非常重要。

#### 策略优化方向

基于对代码的深入分析，以下是几个可能的优化方向：

1. **市场结构过滤**：
   - 实现更高级别的趋势识别系统，仅在趋势方向上交易FVG。
   - 可以添加简单的移动平均线方向过滤器或更复杂的市场结构分析。
   - 这样的过滤器可以显著减少逆势交易带来的亏损。

2. **波动性调整**：
   - 实现基于当前市场波动性的动态止损和获利目标，而不是使用固定的风险回报比。
   - 在高波动性环境中扩大目标，在低波动性环境中收紧目标。
   - 可以使用ATR（平均真实范围）或类似指标来量化波动性。

3. **交易量确认**：
   - 添加交易量条件，确保FVG形成和回测时有足够的交易量支持。
   - 这可以减少低流动性环境中的虚假信号。

4. **自适应仓位规模**：
   - 基于历史胜率、当前波动性和特定FVG特征实现动态仓位规模。
   - 对于更"干净"的FVG（三根蜡烛线模式更清晰）或在强趋势中形成的FVG，可以增加仓位规模。

5. **多时间框架分析**：
   - 整合更高时间框架的FVG分析，优先考虑与更高时间框架FVG对齐的信号。
   - 这种方法可以提高信号质量和整体成功率。

6. **智能叠加交易**：
   - 修改叠加交易逻辑，使其基于趋势强度和之前交易的成功。
   - 可以在获利交易后增加叠加交易的可能性，而在亏损交易后减少。

7. **机器学习增强**：
   - 实现机器学习算法来识别最有可能成功的FVG特征。
   - 这可以包括分析FVG的大小、形成速度、所处的市场环境等因素。

8. **统计回测框架**：
   - 开发更全面的回测框架，评估不同市场条件下的策略性能。
   - 使用蒙特卡洛模拟评估不同参数组合和市场条件下的预期结果。

#### 总结

动态公允价值缺口日内交易策略提供了一种系统化方法来识别和交易市场中的供需不平衡区域。通过利用三根蜡烛线FVG模式和明确的回测入场规则，该策略既具有理论上的健全性，又具有实际的可操作性。其强大的风险管理框架，包括预定义的止损、固定风险回报比和日终平仓机制，为交易纪律提供了坚实基础。

该策略的主要优势在于其客观性和基于市场结构的方法，使其能够在不同市场环境中保持相关性。然而，策略的效果可能通过实施建议的优化方向得到显著提升，特别是添加市场环境过滤、基于波动性的调整和交易量确认。

值得注意的是，任何交易策略，无论多么完善，都不能保证成功。成功的交易不仅需要健全的策略，还需要严格的执行纪律、适当的资金管理和对市场的深入理解。动态公允价值缺口策略提供了一个良好的起点，交易者可以根据自己的风险承受能力和市场观点进行进一步定制和优化。 || 

#### Overview

The Dynamic Fair Value Gap Intraday Trading Strategy is a quantitative trading system based on market structure theory, focusing on identifying and trading Fair Value Gaps (FVGs) in price action. The strategy employs a three-candle pattern to detect supply-demand imbalances in price behavior and enters trades when price retests these areas. It implements risk management with a fixed risk-reward ratio and includes a forced exit mechanism at a specific time each day to avoid overnight risk. This approach is derived from Smart Money Concept (SMC) theory, which focuses on institutional money behavior and changes in market microstructure. By systematically identifying and trading these high-probability-reward zones, the strategy aims to capture intraday price movements while maintaining strict risk control measures.

#### Strategy Principles

The core principle of the Fair Value Gap trading strategy is based on "unfilled areas" or "gaps" left when price moves rapidly. These areas represent significant supply-demand imbalances that will typically be "filled" or "retested" in the future. Specifically, the strategy works as follows:

1. **Gap Detection Mechanism**: The strategy uses a three-candle pattern to identify two types of FVGs:
   - Bullish FVG: Current candle's low is higher than the high of the candle two periods ago, AND the previous candle's close is higher than the high of the candle two periods ago.
   - Bearish FVG: Current candle's high is lower than the low of the candle two periods ago, AND the previous candle's close is lower than the low of the candle two periods ago.

2. **Retest Entry Logic**: The strategy doesn't enter immediately when an FVG forms but waits for price to retest these areas:
   - Bullish FVG: Long entry is triggered when price drops back to the upper boundary (high) of the FVG area.
   - Bearish FVG: Short entry is triggered when price bounces up to the lower boundary (low) of the FVG area.

3. **Risk Management**:
   - Stop loss is placed at the boundary of the respective FVG (low of bullish FVG or high of bearish FVG).
   - Profit target uses a 1:2 risk-reward ratio, calculated as: entry price ± (entry price - stop loss) × 2.

4. **End-of-Day Exit**: The strategy automatically closes all positions at 3:15 PM IST each day and clears all FVG arrays, preparing for the next trading day.

5. **Pyramiding**: The strategy allows up to 5 pyramiding trades, meaning multiple positions can be held in the same direction, amplifying gains in strong trending markets.

This approach leverages discontinuities in market structure and price action theory to capture predictable behavior as price fills these imbalance areas.

#### Strategy Advantages

Upon deep analysis of the code, the strategy demonstrates several advantages:

1. **Objective Trading Criteria**: The strategy uses clearly defined mathematical conditions to identify FVGs and entry points, eliminating subjective judgment and improving trading discipline and consistency.

2. **Market Structure-Based Trading**: By trading Fair Value Gaps, the strategy focuses on genuine supply-demand imbalance areas in the market rather than relying on signals from traditional indicators, which often lag price action.

3. **Risk Control Mechanisms**:
   - Predefined stop losses clearly define the maximum risk for each trade.
   - Fixed risk-reward ratio ensures a reasonable win rate needed for long-term profitability.
   - End-of-day forced exit eliminates overnight risk.

4. **Compound Profit Potential**: By allowing pyramiding (up to 5 positions), the strategy can significantly increase returns in strongly trending markets while controlling risk on each position through stop losses.

5. **Adaptability**: The strategy doesn't depend on fixed price levels but dynamically identifies key areas in current market conditions, making it adaptable across different market environments and instruments.

6. **Programming Efficiency**: The code uses arrays to store FVG information and efficiently manages multiple potential trade opportunities, ensuring the system can track and respond to multiple price levels.

7. **Visual Assistance**: The strategy visually displays FVG areas on the chart (green for bullish FVGs, red for bearish FVGs), helping traders understand the system's decision-making process.

#### Risk Analysis

Despite its solid theoretical foundation and numerous advantages, the strategy also presents several risk factors that need attention:

1. **False Breakout Risk**: In ranging markets, price may touch FVG boundaries multiple times without forming sustained trends, leading to multiple stop-outs. Solutions might include adding additional market environment filters or trend confirmation indicators.

2. **Pyramiding Risk**: Allowing up to 5 positions in the same direction could lead to excessive exposure in the wrong direction, especially during sudden trend reversals. Consider implementing overall risk limits, such as maximum risk across all positions not exceeding a specific percentage of the account.

3. **Fixed Risk-Reward Ratio Limitations**: Using a fixed 1:2 risk-reward ratio may not be optimal for all market conditions. In less volatile markets, such targets might be difficult to achieve; in highly volatile markets, it might exit profitable trades too early. Consider adjusting profit targets based on market volatility.

4. **Lack of Market Environment Filtering**: The strategy generates signals in all market conditions regardless of the overall trend or volatility state. Trading counter-trend FVGs in strong trending environments can lead to consecutive losses. Adding trend filters could significantly improve performance.

5. **Absence of Volume Confirmation**: The strategy relies solely on price action without considering volume confirmation, which might lead to false signals in low-volume areas. Integrating volume analysis could improve signal quality.

6. **Fixed-Time Exit Potential Issues**: Exiting at a specific time daily might lead to premature exits from favorable positions or missed better exit opportunities in unfavorable ones. Consider combining price action-based exit conditions.

7. **Reliance on Historical Backtesting Assumptions**: The strategy assumes future FVG behavior will be similar to patterns observed in the past. Market dynamics may change, weakening the effectiveness of these patterns. Regular parameter re-optimization and hypothesis validation is important.

#### Strategy Optimization Directions

Based on deep analysis of the code, here are several potential optimization directions:

1. **Market Structure Filtering**:
   - Implement higher-level trend identification systems to trade FVGs only in the trend direction.
   - Simple moving average direction filters or more complex market structure analysis could be added.
   - Such filtering could significantly reduce losses from counter-trend trades.

2. **Volatility Adjustment**:
   - Implement dynamic stop losses and profit targets based on current market volatility instead of using fixed risk-reward ratios.
   - Widen targets in high-volatility environments and tighten them in low-volatility ones.
   - ATR (Average True Range) or similar indicators could be used to quantify volatility.

3. **Volume Confirmation**:
   - Add volume conditions to ensure sufficient volume supports FVG formation and retests.
   - This can reduce false signals in low-liquidity environments.

4. **Adaptive Position Sizing**:
   - Implement dynamic position sizing based on historical win rates, current volatility, and specific FVG characteristics.
   - Increase position size for "cleaner" FVGs (more distinct three-candle pattern) or those forming within strong trends.

5. **Multiple Timeframe Analysis**:
   - Integrate FVG analysis from higher timeframes, prioritizing signals that align with higher timeframe FVGs.
   - This approach can improve signal quality and overall success rate.

6. **Smart Pyramiding**:
   - Modify the pyramiding logic to base it on trend strength and previous trade success.
   - Increase the likelihood of pyramiding after profitable trades and reduce it after losing ones.

7. **Machine Learning Enhancement**:
   - Implement machine learning algorithms to identify FVG characteristics most likely to succeed.
   - This could include analyzing FVG size, formation speed, market environment, etc.

8. **Statistical Backtesting Framework**:
   - Develop a more comprehensive backtesting framework to assess strategy performance across different market conditions.
   - Use Monte Carlo simulations to evaluate expected outcomes under different parameter combinations and market conditions.

#### Conclusion

The Dynamic Fair Value Gap Intraday Trading Strategy offers a systematic approach to identifying and trading supply-demand imbalance areas in the market. Through the use of the three-candle FVG pattern and clear retest entry rules, the strategy provides both theoretical soundness and practical operability. Its robust risk management framework, including predefined stop losses, fixed risk-reward ratios, and end-of-day exit mechanisms, provides a solid foundation for trading discipline.

The strategy's main strengths lie in its objectivity and market structure-based approach, allowing it to remain relevant across different market environments. However, its effectiveness could be significantly enhanced through the implementation of suggested optimization directions, particularly market environment filtering, volatility-based adjustments, and volume confirmation.

It's worth noting that no trading strategy, no matter how sophisticated, can guarantee success. Successful trading requires not only a sound strategy but also strict execution discipline, proper money management, and a deep understanding of the markets. The Dynamic Fair Value Gap strategy provides a good starting point that traders can further customize and optimize according to their risk tolerance and market views.
[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-26 00:00:00
end: 2025-03-25 00:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Intraday FVG", overlay=true, pyramiding=5, max_bars_back=500, default_qty_type=strategy.percent_of_equity, commission_type=strategy.commission.percent)

// 2. FVG Detection (Three-Candle Pattern)
var bullFVGHigh = array.new_float()
var bullFVGLow = array.new_float()
var bullFVGIndex = array.new_int()
var bearFVGHigh = array.new_float()
var bearFVGLow = array.new_float()
var bearFVGIndex = array.new_int()

detectFVG() =>

    // Bullish FVG: Current low > prior high AND next high < current low
    bullCondition = low > high[2] and close[1] > high[2]
    // Bearish FVG: Current high < prior low AND next low > current high
    bearCondition = high < low[2] and close[1] < low[2]


    if bullCondition 
        // log.info("bull condition met: {0} {0} {0}", high[2], close[1], low)
        array.push(bullFVGHigh, low)
        array.push(bullFVGLow, low[2])
        array.push(bullFVGIndex, bar_index)

    
    if bearCondition
        // log.info("bear condition met: {0} {0} {0}", low[2], close[1], high)
        array.push(bearFVGHigh, high[2])
        array.push(bearFVGLow, high)
        array.push(bearFVGIndex, bar_index)

detectFVG()

// 3. Retest Execution Logic
checkRetests(arrayHigh, arrayLow, barIndex, direction) =>
    // log.info("{0} : {1}", bar_index, time)
    i = array.size(arrayHigh) - 1
    
    while i >= 0

        // log.info("barIndex : {0}" , array.get(barIndex, i))
        // log.info("bar_index : {0}" , bar_index)
        
        if array.get(barIndex, i) <  bar_index
            
            fvgHigh = array.get(arrayHigh, i)
            fvgLow = array.get(arrayLow, i)
            // log.info("visting : {0} : {1} : {2} : {3} ", array.get(barIndex, i), bar_index, fvgHigh, fvgLow)
            
            if direction == "long" and low <= fvgHigh
                // log.info("entering long")
                sl = array.get(arrayLow, i)  // Previous candle's low
                entry = close
                tp = entry + (entry - sl)*2
                strategy.entry("L"+str.tostring(array.get(barIndex, i)), strategy.long)
                strategy.exit("XL"+str.tostring(array.get(barIndex, i)), "L"+str.tostring(array.get(barIndex, i)), stop=sl, limit=tp)
                array.remove(arrayHigh, i)
                array.remove(arrayLow, i)
                array.remove(barIndex, i)
            
            if direction == "short" and high >= fvgLow
                // log.info("entering short")
                sl = array.get(arrayHigh, i)   // Previous candle's low
                entry = close
                tp = entry - (sl - entry)*2
                strategy.entry("S"+str.tostring(array.get(barIndex, i)), strategy.short)
                strategy.exit("XS"+str.tostring(array.get(barIndex, i)), "S"+str.tostring(array.get(barIndex, i)), stop=sl, limit=tp)
                array.remove(arrayHigh, i)
                array.remove(arrayLow, i)
                array.remove(barIndex, i)
        
        i := i - 1


checkRetests(bullFVGHigh, bullFVGLow, bullFVGIndex, "long")
checkRetests(bearFVGHigh, bearFVGLow, bearFVGIndex,"short")

// 5. Daily Exit at 3:15 PM IST
exitTime = hour == 15 and minute >= 15
if exitTime
    strategy.close_all()
    array.clear(bullFVGHigh)
    array.clear(bullFVGLow)
    array.clear(bearFVGHigh)
    array.clear(bearFVGLow)
    array.clear(bullFVGIndex)
    array.clear(bearFVGIndex)

```

> Detail

https://www.fmz.com/strategy/488280

> Last Modified

2025-03-26 15:27:29
