
> Name

VWMA-EMA-Crossover-Martingale-Strategy-Progressive-Position-Scaling-Optimized-Quantitative-Trading-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8eab2455cae2d7f4d82.png)
![IMG](https://www.fmz.com/upload/asset/2d889949ae9afa1f4873f.png)





[trans]#### 概述
VWMA-EMA均线交叉马丁格尔策略是一种基于技术分析的量化交易系统,结合了成交量加权移动平均线(VWMA)和指数移动平均线(EMA)的交叉信号,并引入了基于斐波那契序列的马丁格尔资金管理方法。该策略主要利用VWMA(较短周期)和EMA(较长周期)的多头排列形态以及价格与VWMA的突破关系来确定市场趋势方向,同时通过马丁格尔方法在价格回调时进行渐进式增仓以降低平均成本,最终以固定百分比盈利目标实现获利。

#### 策略原理
该策略的核心原理分为三个主要部分:信号生成、仓位管理和获利退出。

1. 信号生成部分:
   - 策略计算VWMA(默认周期100)和EMA(默认周期200)两条均线
   - 入场条件由两个关键因素组成:
     a) VWMA位于EMA之上(多头排列)
     b) 价格向上突破VWMA(动量确认)
   - 这种组合确保了在总体趋势向上的情况下才会入场,并利用价格突破作为触发信号

2. 仓位管理部分(马丁格尔系统):
   - 初始入场使用设定的资金比例(默认10%)
   - 当价格下跌到特定幅度时,会触发额外的买入操作
   - 采用斐波那契式下跌百分比设计:1%、2%、3%、6%、12%、24%
   - 每次追加买入的仓位大小按设定倍数增长(默认2倍)
   - 系统限制最大马丁格尔操作次数(默认7次)以控制风险
   - 每次买入后重新计算平均持仓成本

3. 获利退出部分:
   - 当价格上涨到平均持仓成本的特定百分比(默认1%)时,全部平仓获利
   - 平仓后重置所有状态变量,为下一轮交易做准备

#### 策略优势
通过深入分析代码实现,该策略具有以下显著优势:

1. 趋势确认双重机制:通过VWMA和EMA的相对位置以及价格突破VWMA的组合条件,有效过滤假突破,提高入场质量。

2. 智能风险管理:采用斐波那契序列式的下跌百分比设计,随着回调幅度增大逐步提高追加买入的门槛,符合市场波动特性,避免过早追加。

3. 资金利用效率高:初始仅使用部分资金(默认10%),保留大部分资金应对后续可能的追加操作,避免资金过早耗尽。

4. 心理负担低:策略完全自动化运行,交易者无需面对回撤时的心理压力,避免人为情绪干扰。

5. 灵活的参数体系:提供多个可调整参数(均线周期、获利目标、马丁格尔倍数等),可根据不同市场环境和交易品种进行优化。

6. 可视化监控:通过内置状态表格实时显示关键信息(当前持仓、平均成本、盈亏状态、下一触发价格等),便于交易者监控策略执行情况。

7. 清晰的交易标记:在图表上标注所有操作点位(初始入场、追加买入、获利了结),便于回测分析和策略优化。

#### 策略风险
尽管该策略设计精巧,但仍存在以下潜在风险:

1. 趋势反转风险:在强烈的趋势反转情况下,即使有马丁格尔机制,仍可能面临较大亏损。解决方法是增加趋势确认指标,如MACD、RSI等,或引入止损机制。

2. 资金耗尽风险:在极端行情下,如果价格持续下跌超过预设的最大马丁格尔次数,策略将无法继续追加仓位。建议设置总资金使用上限并保留应急资金。

3. 参数敏感性:策略表现对参数设置(特别是均线周期和马丁格尔倍数)高度敏感,不同市场环境可能需要不同参数。建议通过回测确定最优参数组合并定期检查参数有效性。

4. 滑点和佣金影响:实盘交易中,滑点和佣金可能显著影响策略盈利能力,特别是在频繁追加仓位的情况下。建议在回测中加入合理的交易成本估算。

5. 流动性风险:在低流动性市场中,大额订单可能导致严重滑点或无法执行。建议在高流动性市场实施此策略或限制单笔交易规模。

#### 策略优化方向
基于当前实现,策略可以从以下几个方面进行优化:

1. 动态止损机制:引入基于ATR(平均真实波幅)的动态止损,在极端行情下限制最大亏损,保护资金安全。这种优化能在保留马丁格尔优势的同时,为策略提供最后的安全网。

2. 动态获利目标:当前固定1%的获利目标相对保守,可考虑根据市场波动性自动调整获利目标,在低波动市场保持保守,在高波动市场提高目标。

3. 趋势强度过滤:增加趋势强度评估机制,如ADX指标,仅在趋势明确的情况下启用策略,避免震荡市场中的频繁信号。

4. 市场环境适应性:增加市场环境识别模块,在不同市场阶段(趋势、震荡、极端波动)自动调整策略参数或暂停策略运行。

5. 资金管理优化:改进当前的固定倍数增仓模式,采用更灵活的资金分配方法,如凯利公式或基于账户权益的动态调整。

6. 多周期确认:增加多周期确认机制,要求更高时间框架也呈现多头排列,提高入场信号可靠性。

7. 机器学习优化:利用机器学习技术自动识别最佳参数组合,并根据历史模式预测策略在不同市场环境下的表现。

#### 总结
VWMA-EMA均线交叉马丁格尔策略是一种结合技术分析信号与先进资金管理的量化交易系统。通过VWMA和EMA的多头排列配合价格突破确认趋势方向,并利用基于斐波那契序列的马丁格尔方法在回调时智能增仓,最终以固定盈利目标获利。该策略在设计上注重风险控制,通过限制最大追加次数和设置退出机制来保护资金安全。

尽管存在趋势反转、资金耗尽等潜在风险,但通过引入动态止损、趋势强度过滤等优化措施,策略的稳健性和适应性可以得到显著提升。特别是在上升趋势明确的市场环境中,该策略能够有效捕捉回调买入机会,并通过平均成本下移提高整体盈利能力。

对于量化交易实践者来说,该策略提供了一个平衡风险和收益的框架,在适当参数优化和风险控制的前提下,可以作为中长期投资组合的有效组成部分。策略的简洁清晰的逻辑和灵活的参数设置也使其成为学习量化交易与资金管理的优秀范例。 || #### Overview
The VWMA-EMA Crossover Martingale Strategy is a quantitative trading system based on technical analysis, combining volume-weighted moving average (VWMA) and exponential moving average (EMA) crossover signals with a Fibonacci-based Martingale money management approach. This strategy primarily utilizes the bullish alignment of VWMA (shorter period) and EMA (longer period), along with price breakouts above VWMA to determine market trend direction. It implements a Martingale method to progressively increase positions during price retracements to lower average cost, ultimately achieving profit through a fixed percentage profit target.

#### Strategy Principles
The core principles of this strategy can be divided into three main components: signal generation, position management, and profit taking.

1. Signal Generation:
   - The strategy calculates VWMA (default period 100) and EMA (default period 200)
   - Entry conditions consist of two key factors:
     a) VWMA positioned above EMA (bullish alignment)
     b) Price breaking above VWMA (momentum confirmation)
   - This combination ensures entries only occur in an overall uptrend and uses price breakouts as trigger signals

2. Position Management (Martingale System):
   - Initial entry uses a set percentage of capital (default 10%)
   - Additional buy orders are triggered when price drops by specific percentages
   - Implements Fibonacci-style percentage drops: 1%, 2%, 3%, 6%, 12%, 24%
   - Each additional position increases in size by a set multiplier (default 2x)
   - System limits maximum Martingale operations (default 7) to control risk
   - Average position cost is recalculated after each buy

3. Profit Taking:
   - All positions are closed when price rises to a specific percentage (default 1%) above average entry cost
   - All state variables are reset after closing positions, preparing for the next trading cycle

#### Strategy Advantages
Through deep analysis of the code implementation, this strategy demonstrates the following significant advantages:

1. Dual Trend Confirmation Mechanism: The combination of VWMA-EMA relative positioning and price breakouts above VWMA effectively filters false breakouts and improves entry quality.

2. Intelligent Risk Management: The Fibonacci sequence-style percentage drops progressively raise the threshold for additional buys as retracement magnitude increases, aligning with market volatility characteristics and avoiding premature additions.

3. High Capital Efficiency: Initially uses only a portion of funds (default 10%), reserving the majority for potential additional positions and preventing premature capital depletion.

4. Low Psychological Burden: The strategy operates fully automatically, eliminating psychological pressure during drawdowns and avoiding emotional interference.

5. Flexible Parameter System: Provides multiple adjustable parameters (moving average periods, profit targets, Martingale multipliers, etc.) that can be optimized for different market environments and trading instruments.

6. Visual Monitoring: Incorporates a built-in status table displaying real-time key information (current positions, average cost, profit/loss status, next trigger price, etc.), facilitating strategy execution monitoring.

7. Clear Trade Markers: Annotates all operation points on the chart (initial entries, additional buys, profit-taking), aiding backtest analysis and strategy optimization.

#### Strategy Risks
Despite its sophisticated design, the strategy still presents the following potential risks:

1. Trend Reversal Risk: In strong trend reversal scenarios, even with the Martingale mechanism, significant losses may occur. Solutions include adding trend confirmation indicators like MACD or RSI, or implementing stop-loss mechanisms.

2. Capital Depletion Risk: In extreme market conditions, if prices continue to fall beyond the preset maximum Martingale iterations, the strategy cannot add more positions. It's advisable to set a total capital usage limit and maintain emergency funds.

3. Parameter Sensitivity: Strategy performance is highly sensitive to parameter settings (especially moving average periods and Martingale multipliers), with different market environments potentially requiring different parameters. Backtesting is recommended to determine optimal parameter combinations with periodic validation.

4. Slippage and Commission Impact: In live trading, slippage and commissions can significantly affect profitability, especially with frequent position additions. Including reasonable transaction cost estimates in backtests is advised.

5. Liquidity Risk: In low-liquidity markets, large orders may cause severe slippage or fail to execute. This strategy is best implemented in highly liquid markets, or with limited transaction sizes.

#### Strategy Optimization Directions
Based on the current implementation, the strategy can be optimized in the following ways:

1. Dynamic Stop-Loss Mechanism: Introduce ATR (Average True Range) based dynamic stop-losses to limit maximum losses in extreme market conditions, protecting capital. This optimization provides a safety net while preserving Martingale advantages.

2. Dynamic Profit Targets: The current fixed 1% profit target is relatively conservative. Consider automatically adjusting profit targets based on market volatility – maintaining conservatism in low-volatility markets and increasing targets in high-volatility markets.

3. Trend Strength Filtering: Add trend strength assessment mechanisms, such as the ADX indicator, to activate the strategy only during clear trends, avoiding frequent signals in ranging markets.

4. Market Environment Adaptability: Incorporate market environment recognition modules to automatically adjust strategy parameters or pause operations in different market phases (trending, ranging, extreme volatility).

5. Money Management Optimization: Improve the current fixed multiplier position sizing model by adopting more flexible capital allocation methods, such as the Kelly formula or dynamic adjustments based on account equity.

6. Multi-timeframe Confirmation: Add multi-timeframe confirmation mechanisms, requiring bullish alignment in higher timeframes as well, improving entry signal reliability.

7. Machine Learning Optimization: Utilize machine learning techniques to automatically identify optimal parameter combinations and predict strategy performance across different market environments based on historical patterns.

#### Summary
The VWMA-EMA Crossover Martingale Strategy is a quantitative trading system combining technical analysis signals with advanced money management. It confirms trend direction through VWMA-EMA bullish alignment and price breakouts, intelligently increases positions during retracements using a Fibonacci-based Martingale method, and takes profits at fixed targets. The strategy design emphasizes risk control by limiting maximum additional entries and implementing exit mechanisms to protect capital.

Despite potential risks such as trend reversals and capital depletion, the strategy's robustness and adaptability can be significantly enhanced by introducing dynamic stop-losses, trend strength filtering, and other optimization measures. Particularly in well-defined uptrends, this strategy effectively captures buying opportunities during retracements and improves overall profitability by lowering average costs.

For quantitative trading practitioners, this strategy provides a framework balancing risk and reward. With appropriate parameter optimization and risk controls, it can serve as an effective component of medium to long-term investment portfolios. The strategy's clear logic and flexible parameter settings also make it an excellent example for learning quantitative trading and money management principles.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-04 00:00:00
end: 2025-03-03 08:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

// VWMA-EMA Martingale Long Strategy
// @version=5
strategy("VWMA-EMA Martingale Long Strategy", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Parameter settings
vwmaLength = input.int(100, "VWMA Period", minval=1)
emaLength = input.int(200, "EMA Period", minval=1)
profitPercent = input.float(1.0, "Take Profit (%)", minval=0.1, step=0.1)
maxMartingaleEntries = input.int(7, "Max Martingale Entries", minval=1, maxval=10)
martingaleMultiplier = input.float(2.0, "Martingale Multiplier", minval=1.1, step=0.1)
initialPositionSize = input.float(10.0, "Initial Position Size (%)", minval=1.0, maxval=100.0, step=1.0)

// Indicator calculations
vwma100 = ta.vwma(close, vwmaLength)
ema200 = ta.ema(close, emaLength)

// Plot indicators
plot(vwma100, "VWMA 100", color=color.blue, linewidth=2)
plot(ema200, "EMA 200", color=color.red, linewidth=2)

// Entry conditions - modified!
vwmaAboveEma = vwma100 > ema200  // VWMA and EMA in bullish alignment
vwmaCrossover = ta.crossover(close, vwma100)  // Close crosses above VWMA

// Variables for managing Martingale state
var int martingaleCount = 0
var float entryPrice = 0.0
var float averageEntryPrice = 0.0
var float totalQuantity = 0.0
var float totalCost = 0.0
var bool inPosition = false
var float positionSize = initialPositionSize

// Long entry condition - modified!
longCondition = vwmaAboveEma and vwmaCrossover and martingaleCount < maxMartingaleEntries

// Take profit condition
takeProfitCondition = inPosition and close >= averageEntryPrice * (1 + profitPercent / 100)

// Additional entry conditions (Martingale)
// Fibonacci-based drop percentage (1%, 2%, 3%, 6%, 12%, 24%)
getFibDropPercent(count) =>
    if count == 1
        1.0  // 1% drop
    else if count == 2
        2.0  // 2% drop
    else if count == 3
        3.0  // 3% drop
    else if count == 4
        6.0  // 6% drop
    else if count == 5
        12.0  // 12% drop
    else if count == 6
        24.0  // 24% drop
    else
        100.0  // High value (failsafe)

// Calculate drop threshold for the current Martingale step
currentDropPercent = getFibDropPercent(martingaleCount)
dropThreshold = entryPrice * (1 - currentDropPercent / 100)

// Define additional buy conditions
martingaleAddCondition = inPosition and close < dropThreshold and martingaleCount < maxMartingaleEntries

// Order execution
if (longCondition and not inPosition)
    // Initial entry
    entryPrice := close
    averageEntryPrice := close
    totalQuantity := strategy.equity * positionSize / 100 / close
    totalCost := totalQuantity * close
    martingaleCount := 1
    inPosition := true
    strategy.entry("Long #" + str.tostring(martingaleCount), strategy.long, qty=totalQuantity)
    positionSize := initialPositionSize

if (martingaleAddCondition)
    // Martingale additional buy
    martingaleCount := martingaleCount + 1
    positionSize := positionSize * martingaleMultiplier
    
    // Calculate additional quantity
    additionalQuantity = strategy.equity * positionSize / 100 / close
    
    // Recalculate average entry price
    totalQuantity := totalQuantity + additionalQuantity
    totalCost := totalCost + (additionalQuantity * close)
    averageEntryPrice := totalCost / totalQuantity
    entryPrice := close
    
    // Place additional buy order
    strategy.entry("Long #" + str.tostring(martingaleCount), strategy.long, qty=additionalQuantity)

if (takeProfitCondition)
    // Take profit
    strategy.close_all("Take Profit +1%")
    martingaleCount := 0
    inPosition := false
    positionSize := initialPositionSize

// Display current status in a table
var table statusTable = table.new(position.top_right, 2, 9, bgcolor = color.new(color.black, 70))

// Table update function
updateTable() =>
    table.cell(statusTable, 0, 0, "Status", text_color = color.white, bgcolor = color.new(color.blue, 90))
    table.cell(statusTable, 1, 0, inPosition ? "In Position" : "No Position", text_color = inPosition ? color.green : color.white)
    
    table.cell(statusTable, 0, 1, "Martingale Count", text_color = color.white)
    table.cell(statusTable, 1, 1, str.tostring(martingaleCount) + "/" + str.tostring(maxMartingaleEntries), text_color = color.white)
    
    table.cell(statusTable, 0, 2, "Avg Entry Price", text_color = color.white)
    table.cell(statusTable, 1, 2, inPosition ? str.tostring(averageEntryPrice, "#.##") : "-", text_color = color.white)
    
    table.cell(statusTable, 0, 3, "Current Profit", text_color = color.white)
    if inPosition
        currentProfit = (close - averageEntryPrice) / averageEntryPrice * 100
        profitColor = currentProfit >= 0 ? color.green : color.red
        table.cell(statusTable, 1, 3, str.tostring(currentProfit, "#.##") + "%", text_color = profitColor)
    else
        table.cell(statusTable, 1, 3, "-", text_color = color.white)
    
    table.cell(statusTable, 0, 4, "Take Profit Target", text_color = color.white)
    table.cell(statusTable, 1, 4, inPosition ? str.tostring(averageEntryPrice * (1 + profitPercent / 100), "#.##") : "-", text_color = color.white)
    
    table.cell(statusTable, 0, 5, "Total Quantity", text_color = color.white)
    table.cell(statusTable, 1, 5, inPosition ? str.tostring(totalQuantity, "#.##") : "-", text_color = color.white)
    
    table.cell(statusTable, 0, 6, "Next Buy Size", text_color = color.white)
    table.cell(statusTable, 1, 6, inPosition ? str.tostring(positionSize, "#.##") + "%" : "-", text_color = color.white)
    
    // Display next buy trigger price
    table.cell(statusTable, 0, 7, "Next Buy Trigger", text_color = color.white)
    if inPosition and martingaleCount < maxMartingaleEntries
        nextDropPercent = getFibDropPercent(martingaleCount)
        nextTriggerPrice = entryPrice * (1 - nextDropPercent / 100)
        table.cell(statusTable, 1, 7, str.tostring(nextTriggerPrice, "#.##") + " (" + str.tostring(nextDropPercent) + "%↓)", text_color = color.orange)
    else
        table.cell(statusTable, 1, 7, "-", text_color = color.white)
        
    // Display bullish alignment status
    table.cell(statusTable, 0, 8, "Bullish Alignment", text_color = color.white)
    table.cell(statusTable, 1, 8, vwmaAboveEma ? "Bullish ✓" : "Bearish ✗", text_color = vwmaAboveEma ? color.green : color.red)

// Update the table on every bar
updateTable()

// Entry/Take profit markers
plotshape(series=longCondition and not inPosition[1], title="Long Entry", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)
plotshape(series=takeProfitCondition, title="Take Profit", location=location.abovebar, color=color.blue, style=shape.triangledown, size=size.small)
plotshape(series=martingaleAddCondition, title="Martingale Add", location=location.belowbar, color=color.yellow, style=shape.circle, size=size.tiny)

```

> Detail

https://www.fmz.com/strategy/484920

> Last Modified

2025-03-05 10:16:07
