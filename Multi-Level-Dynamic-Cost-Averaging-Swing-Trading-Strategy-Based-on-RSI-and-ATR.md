
> Name

Multi-Level-Dynamic-Cost-Averaging-Swing-Trading-Strategy-Based-on-RSI-and-ATR

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8c3db001f80f0759332.png)
![IMG](https://www.fmz.com/upload/asset/2d89dd93f05711f19000e.png)




[trans]
#### 概述
该策略是一个结合了相对强弱指数(RSI)和平均真实波幅(ATR)的多层次动态成本均摊(DCA)交易系统。它主要通过识别市场超卖条件进行分批建仓,并利用ATR动态调整止盈位置,实现波段操作获利。策略具有风险分散、成本优化和收益稳定等特点。

#### 策略原理
策略运行在4小时或日线级别,核心逻辑包括以下几个方面:
1. 入场信号基于RSI低于30的超卖判断,最多允许4次分批建仓
2. 每次建仓金额基于200美元总风险额度,根据2倍ATR动态计算持仓规模
3. 持仓管理采用动态平均成本跟踪,实时计算多次建仓后的均价
4. 止盈设置为均价上方3倍ATR,随市场波动性自适应调整
5. 通过标记线实时显示均价和止盈位置,便于视觉跟踪

#### 策略优势
1. 风险控制精确 - 通过预设风险金额和ATR动态调整,实现对单笔交易风险的精确控制
2. 建仓灵活 - 分批建仓机制既能降低成本又能充分把握机会
3. 止盈智能 - 基于ATR的动态止盈既保证了利润又适应市场波动
4. 可视化强 - 均价线和止盈线的实时显示提供直观的交易参考
5. 适应性好 - 策略参数可根据不同市场特征灵活调整

#### 策略风险
1. 连续超卖风险 - 市场持续下跌可能导致建仓次数过多
解决方案:严格执行最大建仓次数限制,必要时设置止损
2. 止盈设置风险 - 过高的止盈倍数可能导致错过获利机会
解决方案:根据市场特征动态调整ATR倍数
3. 资金管理风险 - 分批建仓可能占用过多资金
解决方案:合理设置风险限额和建仓规模

#### 策略优化方向
1. 入场信号优化
- 增加趋势判断指标,避免在强势下跌中过早建仓
- 结合成交量指标,提高超卖判断的可靠性
2. 止盈机制完善
- 引入trailing stop机制,更好地锁定利润
- 考虑分批止盈,提高获利的灵活性
3. 风险控制增强
- 添加总体回撤控制
- 优化资金分配算法

#### 总结
该策略通过RSI和ATR指标的结合,实现了一个兼具风险控制和收益稳定的交易系统。分批建仓机制提供了成本优化的可能,而动态止盈的设计则确保了收益的合理兑现。虽然存在一些潜在风险,但通过合理的参数设置和优化方向的实施,策略的整体表现将得到进一步提升。 || 

#### Overview
This strategy is a multi-level dynamic cost averaging (DCA) trading system that combines the Relative Strength Index (RSI) and Average True Range (ATR). It primarily identifies oversold market conditions for staged position building while using ATR to dynamically adjust take-profit levels for swing trading profits. The strategy features risk diversification, cost optimization, and stable returns.

#### Strategy Principles
The strategy operates on 4-hour or daily timeframes, with core logic including:
1. Entry signals based on RSI below 30 indicating oversold conditions, allowing up to 4 staged entries
2. Position sizing based on $200 total risk amount, calculating holdings dynamically using 2x ATR
3. Position management using dynamic average cost tracking, calculating real-time average price after multiple entries
4. Take-profit set at 3x ATR above average price, adapting to market volatility
5. Real-time display of average price and take-profit levels through marker lines for visual tracking

#### Strategy Advantages
1. Precise Risk Control - Achieves exact control of single trade risk through preset risk amount and ATR adjustment
2. Flexible Position Building - Staged entry mechanism reduces cost while fully capturing opportunities
3. Intelligent Take-Profit - Dynamic take-profit based on ATR ensures profits while adapting to market volatility
4. Strong Visualization - Real-time display of average price and take-profit lines provides intuitive trading reference
5. Good Adaptability - Strategy parameters can be flexibly adjusted for different market characteristics

#### Strategy Risks
1. Continuous Oversold Risk - Sustained market decline may lead to excessive entries
Solution: Strictly enforce maximum entry limit, set stop-loss when necessary
2. Take-Profit Setting Risk - Excessive take-profit multiplier may miss profit opportunities
Solution: Dynamically adjust ATR multiplier based on market characteristics
3. Capital Management Risk - Staged entries may occupy excessive capital
Solution: Set reasonable risk limits and position sizes

#### Strategy Optimization Directions
1. Entry Signal Optimization
- Add trend judgment indicators to avoid early entries in strong downtrends
- Incorporate volume indicators to improve oversold judgment reliability
2. Take-Profit Mechanism Improvement
- Introduce trailing stop mechanism for better profit locking
- Consider staged profit-taking for increased flexibility
3. Risk Control Enhancement
- Add overall drawdown control
- Optimize capital allocation algorithm

#### Summary
The strategy achieves a trading system balancing risk control and stable returns through the combination of RSI and ATR indicators. The staged entry mechanism provides cost optimization possibilities, while the dynamic take-profit design ensures reasonable profit realization. Although some potential risks exist, the strategy's overall performance will be further improved through appropriate parameter settings and implementation of optimization directions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"DOGE_USDT"}]
*/

//@version=6
strategy("DCA-Based Swing Strategy (Risk $200) with Signals", overlay=true)

// === Main Indicators ===
// RSI for identifying oversold conditions
rsi = ta.rsi(close, 14)

// ATR for volatility estimation
atr = ta.atr(14)

// === Strategy Parameters ===
// Risk management
riskPerTrade = 200                       // Total risk ($200)
atrRisk = 2 * atr                        // Risk in dollars per buy (2 ATR)
positionSize = riskPerTrade / atrRisk    // Position size (shares)

// DCA Parameters
maxEntries = 4                           // Maximum of 4 buys
takeProfitATR = 3                        // Take profit: 3 ATR

// === Position Management ===
var float avgEntryPrice = na             // Average entry price
var int entryCount = 0                   // Number of buys
var line takeProfitLine = na             // Take profit line
var line avgPriceLine = na               // Average entry price line

// === Buy and Sell Conditions ===
buyCondition = rsi < 30 and entryCount < maxEntries  // Buy when oversold
if (buyCondition)
    strategy.entry("DCA Buy", strategy.long, qty=positionSize)
    
    // Update the average entry price
    avgEntryPrice := na(avgEntryPrice) ? close : (avgEntryPrice * entryCount + close) / (entryCount + 1)
    entryCount += 1

    // Display "BUY" signal on the chart
    label.new(bar_index, low, "BUY", style=label.style_label_up, color=color.green, textcolor=color.white, size=size.normal)

    // Update lines for average entry price and take profit
    if (not na(takeProfitLine))
        line.delete(takeProfitLine)
    if (not na(avgPriceLine))
        line.delete(avgPriceLine)
    takeProfitPrice = avgEntryPrice + takeProfitATR * atr


// Sell condition: Take profit = 3 ATR from average entry price
takeProfitPrice = avgEntryPrice + takeProfitATR * atr
if (close >= takeProfitPrice and entryCount > 0)
    strategy.close("DCA Buy")
    
    // Reset parameters after closing
    avgEntryPrice := na
    entryCount := 0

    // Remove lines after selling
    if (not na(takeProfitLine))
        line.delete(takeProfitLine)
    if (not na(avgPriceLine))
        line.delete(avgPriceLine)

```

> Detail

https://www.fmz.com/strategy/482909

> Last Modified

2025-02-27 17:22:25
