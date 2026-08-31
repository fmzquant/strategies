
> Name

Dynamic-Threshold-Triple-Running-Moving-Average-Trend-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8021520c5ec1fc20537.png)
![IMG](https://www.fmz.com/upload/asset/2d859749b5fd5f9143c2f.png)



[trans]
# 概述

动态阈值三重运行移动平均趋势交易策略是一个基于多层次移动平均系统的量化交易方法，该策略利用三条不同周期的运行移动平均线(RMA)来判断市场趋势方向并识别交易机会。同时，该策略还结合了相对强弱指标(RSI)和蜡烛图结构分析，以提供更高概率的入场信号。该策略特别设计了根据不同市场类型（外汇、黄金和加密货币）自动调整的动态阈值系统，使其能够适应不同资产类别的波动特性。

# 策略原理

该策略的核心是三层RMA系统和动态阈值判断机制：

1. **三重RMA系统**：
   - 快速RMA（默认9周期）：对价格变化反应敏感，捕捉短期动量
   - 中速RMA（默认21周期）：过滤市场噪音，确认中期趋势
   - 慢速RMA（默认50周期）：代表整体市场结构和偏向

2. **趋势方向判断**：
   - 看涨结构：快速RMA > 中速RMA > 慢速RMA
   - 看跌结构：快速RMA < 中速RMA < 慢速RMA

3. **动态阈值系统**：
   - 根据不同市场类型设置相应的周度阈值：外汇(0.12%)、黄金(0.15%)、加密货币(0.25%)
   - 通过计算快速RMA与中速RMA之间的百分比距离，判断市场是否处于明显趋势中

4. **入场条件**：
   - 多头信号：看涨RMA结构 + 收盘价上穿中速RMA + RSI > 50 + 当前收盘价突破前一根K线高点
   - 空头信号：看跌RMA结构 + 收盘价下穿中速RMA + RSI < 50 + 当前收盘价突破前一根K线低点

5. **止盈止损设置**：
   - 止盈：设置为慢速RMA位置
   - 止损：基于用户定义的点数计算

# 策略优势

1. **自适应市场类型**：
   - 通过市场类型选择器，策略能够根据交易资产的波动特性自动调整阈值参数
   - 为外汇、黄金和加密货币等不同波动率市场提供了专门优化的参数设置

2. **多层次确认机制**：
   - 结合三重移动平均线、RSI动量确认和价格结构突破，提供高质量的交易信号
   - 通过多重条件筛选，有效减少假信号和低概率交易

3. **趋势强度量化**：
   - 通过RMA距离百分比动态评估趋势强度，而非采用固定参数
   - 在不同波动率环境下能够灵活调整，避免在盘整市场频繁交易

4. **可视化趋势状态**：
   - 根据趋势状态动态调整RMA线颜色，直观展示市场状态
   - 当市场处于强趋势时，快速RMA显示为绿色，中速RMA显示为红色，帮助交易者快速识别市场环境

5. **合理的止盈止损机制**：
   - 以慢速RMA作为止盈目标，符合趋势回归均值的市场特性
   - 允许用户灵活设置止损点数，平衡风险与回撤控制

# 策略风险

1. **震荡市场下的假信号**：
   - 尽管有动态阈值系统，但在剧烈震荡市场中仍可能产生错误信号
   - 可能在趋势转换初期出现连续亏损交易，影响资金曲线稳定性

2. **参数敏感性**：
   - RMA长度和阈值参数设置对策略性能有显著影响
   - 不同时间周期和市场条件下的最优参数可能大不相同，需要持续监控和调整

3. **固定止损风险**：
   - 策略使用固定点数设置止损，在波动率突然增加的市场条件下可能不足以保护资金
   - 未考虑市场特定结构位置（如支撑阻力位）来优化止损放置

4. **依赖历史回测参数**：
   - 预设的市场类型阈值基于历史数据，可能不适用于未来市场条件
   - 市场特性随时间变化，固定阈值可能无法持续适应

5. **信号滞后性**：
   - 基于RMA的系统本质上具有一定滞后性，可能在快速反转市场中错过最佳入场点
   - 在极端市场事件下，策略可能来不及调整仓位，遭受较大亏损

# 策略优化方向

1. **自适应阈值优化**：
   - 实现真正的自适应阈值计算，而非基于预设市场类型选择
   - 可以通过计算最近N周期的平均真实波动率(ATR)与价格比率，动态调整趋势判断阈值

2. **增强止损机制**：
   - 引入基于ATR的动态止损，使止损水平与当前市场波动性相匹配
   - 考虑添加移动止损功能，在趋势发展有利时锁定部分利润

3. **市场状态分类优化**：
   - 增加范围市/趋势市的明确判断逻辑，避免在盘整市场产生错误信号
   - 可以通过检测RMA线的平行度和ADX等趋势强度指标来优化市场状态分类

4. **时间过滤器**：
   - 添加时间过滤功能，避免在重要经济数据发布或流动性不足时段交易
   - 实现日内/周内优化时间窗口的筛选，以适应不同市场的最佳交易时段

5. **部分利润锁定**：
   - 实现阶梯式止盈策略，当价格达到特定移动距离时分批锁定利润
   - 这可以改善总体风险回报比，特别是在长周期趋势交易中

6. **过滤器调优**：
   - 添加交易量确认条件，确保信号发生时有足够的市场参与度
   - 考虑引入市场波动率过滤器，在异常高波动率环境中降低仓位或暂停交易

# 总结

动态阈值三重运行移动平均趋势交易策略是一个结构完善的量化交易系统，它通过三层RMA系统和动态阈值判断提供了一种智能的市场适应机制。该策略结合了趋势跟踪、动量确认和价格结构分析的优势，并针对不同资产类别的波动特性进行了优化。

策略的主要优势在于其多层次确认机制和市场适应性，能够有效减少假信号并在不同市场条件下保持稳定性。然而，它也面临震荡市场假信号和参数敏感性等风险。

通过实现自适应阈值计算、增强止损机制和市场状态分类优化等改进措施，该策略有很大的提升空间。特别是结合ATR的动态止损和利润锁定功能，可以显著改善风险管理能力，使策略在各种市场环境中保持稳健性。

对于追求趋势交易的量化投资者来说，这一策略提供了一个坚实的框架，可以根据个人风险偏好和资金管理原则进行进一步定制和优化。 || 

# Overview

The Dynamic Threshold Triple Running Moving Average Trend Trading Strategy is a quantitative trading method based on a multi-layered moving average system. This strategy utilizes three Running Moving Averages (RMAs) of different periods to determine market trend direction and identify trading opportunities. Additionally, the strategy incorporates the Relative Strength Index (RSI) and candlestick structure analysis to provide higher probability entry signals. The strategy features a dynamic threshold system that automatically adjusts according to different market types (Forex, Gold, and Cryptocurrency), allowing it to adapt to the volatility characteristics of various asset classes.

# Strategy Principle

The core of this strategy is a three-layer RMA system and dynamic threshold detection mechanism:

1. **Triple RMA System**:
   - Fast RMA (default 9 periods): Highly responsive to price changes, captures short-term momentum
   - Mid RMA (default 21 periods): Filters market noise, confirms intermediate trends
   - Slow RMA (default 50 periods): Represents overall market structure and bias

2. **Trend Direction Determination**:
   - Bullish Structure: Fast RMA > Mid RMA > Slow RMA
   - Bearish Structure: Fast RMA < Mid RMA < Slow RMA

3. **Dynamic Threshold System**:
   - Sets appropriate weekly thresholds based on market type: Forex (0.12%), Gold (0.15%), Cryptocurrency (0.25%)
   - Determines whether the market is in a significant trend by calculating the percentage distance between Fast RMA and Mid RMA

4. **Entry Conditions**:
   - Long Signal: Bullish RMA structure + Close price crosses above Mid RMA + RSI > 50 + Current close breaks previous candle's high
   - Short Signal: Bearish RMA structure + Close price crosses below Mid RMA + RSI < 50 + Current close breaks previous candle's low

5. **Take Profit and Stop Loss Setup**:
   - Take Profit: Set at the Slow RMA level
   - Stop Loss: Calculated based on user-defined points

# Strategy Advantages

1. **Adaptive Market Type**:
   - Through the market type selector, the strategy can automatically adjust threshold parameters based on the volatility characteristics of the trading asset
   - Provides specially optimized parameter settings for markets with different volatility profiles such as Forex, Gold, and Cryptocurrency

2. **Multi-layered Confirmation Mechanism**:
   - Combines triple moving averages, RSI momentum confirmation, and price structure breakouts to provide high-quality trading signals
   - Effectively reduces false signals and low-probability trades through multiple condition filtering

3. **Trend Strength Quantification**:
   - Dynamically assesses trend strength through RMA distance percentage, rather than using fixed parameters
   - Flexibly adjusts in different volatility environments, avoiding frequent trading in consolidating markets

4. **Visualization of Trend Status**:
   - Dynamically adjusts RMA line colors according to trend status, intuitively displaying market conditions
   - When the market is in a strong trend, the Fast RMA displays in green and the Mid RMA in red, helping traders quickly identify market environment

5. **Rational Take Profit and Stop Loss Mechanism**:
   - Uses Slow RMA as the take profit target, consistent with the mean-reverting characteristics of market trends
   - Allows users to flexibly set stop loss points, balancing risk and drawdown control

# Strategy Risks

1. **False Signals in Oscillating Markets**:
   - Despite having a dynamic threshold system, false signals may still occur in severely oscillating markets
   - May experience consecutive losing trades during early trend transitions, affecting the stability of the equity curve

2. **Parameter Sensitivity**:
   - RMA lengths and threshold parameter settings significantly impact strategy performance
   - Optimal parameters may vary greatly across different timeframes and market conditions, requiring continuous monitoring and adjustment

3. **Fixed Stop Loss Risk**:
   - The strategy uses fixed points to set stop losses, which may be insufficient to protect capital in market conditions where volatility suddenly increases
   - Does not consider market-specific structural positions (such as support and resistance levels) to optimize stop loss placement

4. **Reliance on Historical Backtesting Parameters**:
   - Preset market type thresholds are based on historical data and may not be applicable to future market conditions
   - Market characteristics change over time, and fixed thresholds may not continuously adapt

5. **Signal Lag**:
   - RMA-based systems inherently have a certain lag, potentially missing optimal entry points in rapidly reversing markets
   - During extreme market events, the strategy may not adjust positions quickly enough, suffering significant losses

# Strategy Optimization Directions

1. **Adaptive Threshold Optimization**:
   - Implement truly adaptive threshold calculations, rather than selection based on preset market types
   - Can dynamically adjust trend determination thresholds by calculating the ratio of Average True Range (ATR) to price over the most recent N periods

2. **Enhanced Stop Loss Mechanism**:
   - Introduce ATR-based dynamic stop losses to match stop loss levels with current market volatility
   - Consider adding trailing stop functionality to lock in partial profits when trends develop favorably

3. **Market State Classification Optimization**:
   - Add explicit logic for range/trend market determination to avoid generating false signals in consolidating markets
   - Can optimize market state classification by detecting RMA line parallelism and trend strength indicators like ADX

4. **Time Filter**:
   - Add time filtering functionality to avoid trading during important economic data releases or periods of insufficient liquidity
   - Implement intraday/weekly optimized time window screening to adapt to the best trading sessions for different markets

5. **Partial Profit Locking**:
   - Implement a stepped take-profit strategy to lock in profits in batches when price reaches specific movement distances
   - This can improve overall risk-reward ratio, especially in long-term trend trading

6. **Filter Tuning**:
   - Add volume confirmation conditions to ensure sufficient market participation when signals occur
   - Consider introducing market volatility filters to reduce position size or pause trading in abnormally high volatility environments

# Summary

The Dynamic Threshold Triple Running Moving Average Trend Trading Strategy is a well-structured quantitative trading system that provides an intelligent market adaptation mechanism through a three-layer RMA system and dynamic threshold judgment. The strategy combines the advantages of trend following, momentum confirmation, and price structure analysis, and is optimized for the volatility characteristics of different asset classes.

The main advantages of the strategy lie in its multi-layered confirmation mechanism and market adaptability, effectively reducing false signals and maintaining stability under different market conditions. However, it also faces risks such as false signals in oscillating markets and parameter sensitivity.

There is significant room for improvement through implementing adaptive threshold calculations, enhancing stop loss mechanisms, and optimizing market state classification. Particularly, dynamic stop losses and profit locking features based on ATR can significantly improve risk management capabilities, maintaining strategy robustness across various market environments.

For quantitative investors pursuing trend trading, this strategy provides a solid framework that can be further customized and optimized according to individual risk preferences and capital management principles.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-03-18 00:00:00
end: 2025-04-02 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"TRX_USD"}]
*/

//@version=5
strategy("RMA Strategy - Weekly Dynamic Thresholds", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// === User Inputs ===
fastLen = input.int(9, title="Fast RMA")
midLen = input.int(21, title="Mid RMA")
slowLen = input.int(50, title="Slow RMA")
rsiLen = input.int(8, title="RSI Length")
slPoints = input.float(10, title="Stop Loss (Points)")

// === Weekly Threshold Inputs ===
forexThreshold = input.float(0.12, title="Forex Weekly Avg RMA Distance (%)", step=0.01)
goldThreshold = input.float(0.15, title="Gold Weekly Avg RMA Distance (%)", step=0.01)
cryptoThreshold = input.float(0.25, title="Crypto Weekly Avg RMA Distance (%)", step=0.01)

// === Select Current Market Type ===
marketType = input.string("FOREX", title="Asset Class", options=["FOREX", "GOLD", "CRYPTO"])

// === Use appropriate threshold based on selected market
weeklyThreshold = marketType == "FOREX" ? forexThreshold :
                  marketType == "GOLD" ? goldThreshold :
                  cryptoThreshold  // Default to crypto if somehow not matched

// === RMA Calculations ===
fastRMA = ta.rma(close, fastLen)
midRMA = ta.rma(close, midLen)
slowRMA = ta.rma(close, slowLen)

// === RSI Calculation ===
rsi = ta.rsi(close, rsiLen)

// === Trend Structure ===
bullish = fastRMA > midRMA and midRMA > slowRMA
bearish = fastRMA < midRMA and midRMA < slowRMA

// === Candle Break Conditions ===
longCandleBreak = close > high[1]
shortCandleBreak = close < low[1]

// === Distance and Trend Strength Check ===
distance = math.abs(fastRMA - midRMA)
distancePct = distance / midRMA * 100
isTrending = distancePct >= weeklyThreshold

// === Entry Conditions ===
longSignal = bullish and ta.crossover(close, midRMA) and rsi > 50 and longCandleBreak
shortSignal = bearish and ta.crossunder(close, midRMA) and rsi < 50 and shortCandleBreak

// === TP and SL Setup ===
takeProfitPriceLong = slowRMA
stopLossPriceLong = close - slPoints * syminfo.mintick

takeProfitPriceShort = slowRMA
stopLossPriceShort = close + slPoints * syminfo.mintick

// === Trade Execution ===
if (longSignal)
    strategy.entry("Long", strategy.long)
    strategy.exit("TP/SL Long", from_entry="Long", limit=takeProfitPriceLong, stop=stopLossPriceLong)

if (shortSignal)
    strategy.entry("Short", strategy.short)
    strategy.exit("TP/SL Short", from_entry="Short", limit=takeProfitPriceShort, stop=stopLossPriceShort)

// === Highlight RMAs Based on Trending Strength ===
fastColor = isTrending ? color.green : color.blue
midColor = isTrending ? color.red : color.blue
slowColor = color.orange

// === Plot RMAs ===
plot(fastRMA, color=fastColor, title="Fast RMA")
plot(midRMA, color=midColor, title="Mid RMA")
plot(slowRMA, color=slowColor, title="Slow RMA")

```

> Detail

https://www.fmz.com/strategy/491034

> Last Modified

2025-04-18 09:14:24
