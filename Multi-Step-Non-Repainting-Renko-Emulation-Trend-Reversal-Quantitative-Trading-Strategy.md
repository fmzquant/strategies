
> Name

Multi-Step-Non-Repainting-Renko-Emulation-Trend-Reversal-Quantitative-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8cf9748c9159c78d282.png)
![IMG](https://www.fmz.com/upload/asset/2d8aaea1f46cb4b768b0a.png)


[trans]## 策略概述

本策略是一种基于Renko图表仿真的非重绘量化交易系统,通过在标准时间图表上模拟Renko砖块行为,解决了传统Renko策略中的重绘问题。该策略使用固定大小的价格砖块来过滤市场噪音,只关注有意义的价格变动,同时确保历史信号保持不变。本策略特别适用于趋势跟踪和趋势反转交易,通过多步骤比较砖块方向变化进行交易决策。

主要特点:
- 在时间图表上实现非重绘Renko效果
- 使用砖块方向变化识别趋势反转
- 多步骤验证机制提高信号质量
- 图形化展示砖块形成过程
- 稳定的回测结果与实时交易表现一致性

## 策略原理

该策略的核心原理是在标准时间图表上实现Renko砖块的功能,同时解决传统Renko图表中的重绘问题。具体工作原理如下:

1. **参数配置与初始化**:
   - `brickSize`: 定义砖块大小,决定价格必须移动多少才形成新砖块
   - `renkoPrice`: 存储最后完成的Renko砖块收盘价
   - `prevRenkoPrice`: 存储前一个Renko砖块价格水平
   - `brickDir`: 跟踪砖块方向(1=上升,-1=下降)
   - `newBrick`: 布尔标志,指示是否形成新砖块
   - `brickStart`: 存储当前砖块开始的柱索引

2. **非重绘Renko砖块识别**:
   - 系统仅在确认柱上执行计算,确保历史数据不会被重新计算
   - 计算当前价格与上一个Renko砖块水平的差异
   - 当价格差异达到或超过砖块大小时,形成新的Renko砖块
   - 根据价格变动可容纳的砖块数量更新砖块价格水平
   - 更新方向(brickDir)并设置标志(newBrick)表示形成新砖块

3. **时间图表上的Renko可视化**:
   - 使用图形元素在标准图表上绘制Renko风格的砖块
   - 绿色方块代表看涨砖块
   - 红色方块代表看跌砖块
   - 形成后的砖块永远不会改变或消失

4. **多步骤趋势反转判断**:
   - 策略不仅检查当前砖块方向,还比较多个历史砖块
   - 通过验证连续多个砖块的方向变化确认真实趋势反转

## 策略优势

深入分析代码后,该策略展现出以下显著优势:

1. **解决重绘问题**:
   - 传统Renko策略在回测中表现良好,但在实盘中常失败,主要原因是重绘问题
   - 本策略通过在标准时间图表上模拟Renko行为,确保一旦形成砖块就不会改变
   - 这使回测结果更加可靠,更接近实盘表现

2. **噪音过滤与清晰趋势识别**:
   - Renko图表本身就有过滤小幅波动的特性,只在价格移动预设金额时才形成新砖块
   - 这有助于识别明确的价格趋势,减少假信号
   - 适合在高波动市场中寻找有意义的价格变动

3. **多步骤信号验证**:
   - 策略不仅检查单一方向变化,还验证多个连续砖块的方向
   - 通过比较`brickDir[brickSize]`与当前`brickDir`以及历史价格水平关系
   - 多步骤验证机制显著减少了错误信号

4. **可视化交易基础**:
   - 在图表上绘制彩色砖块,直观展示价格结构
   - 绿色和红色箱体清晰标识市场方向
   - 视觉辅助帮助交易者更好理解市场行为

5. **灵活性与可定制性**:
   - 砖块大小可由用户调整,允许根据不同市场和时间框架优化策略
   - 较小的砖块大小产生更频繁的交易信号,适合短期交易
   - 较大的砖块大小过滤更多噪音,适合中长期趋势跟踪

## 策略风险

尽管该策略解决了重绘问题,但仍存在以下风险因素:

1. **信号延迟风险**:
   - 因为策略仅在确认柱上执行计算,所以交易执行可能比传统Renko图表稍晚
   - 在快速移动的市场中,入场点可能已经错过最佳价格
   - 解决方法:可以考虑结合其他确认指标或调整砖块大小来平衡及时性和准确性

2. **砖块大小选择风险**:
   - 过小的砖块会生成过多交易信号,增加交易成本并可能导致过度交易
   - 过大的砖块可能错过重要的市场转折点
   - 解决方法:应根据目标资产的波动性和交易时间框架优化砖块大小

3. **趋势反转假信号风险**:
   - 尽管使用多步骤验证,但在剧烈波动市场中仍可能出现假突破
   - 价格在真实趋势形成前可能多次穿越砖块边界
   - 解决方法:考虑增加额外的过滤器,如成交量确认或动量指标

4. **回撤风险**:
   - 趋势反转策略在强趋势市场中可能导致连续亏损
   - 反转信号可能过早触发,导致逆势交易
   - 解决方法:实现适当的止损机制和仓位管理策略

5. **计算资源风险**:
   - 绘制大量砖块可能占用大量资源,尤其在长时间框架和大数据集上
   - 代码中限制了最大箱体数量为500,这可能在某些情况下不足
   - 解决方法:优化代码效率或考虑只显示最近的N个砖块

## 策略优化方向

基于代码分析,以下是该策略的几个关键优化方向:

1. **动态砖块大小优化**:
   - 当前策略使用固定砖块大小,可以改进为基于市场波动性的动态砖块大小
   - 在低波动期间使用较小砖块,高波动期间使用较大砖块
   - 这将提高策略对不同市场条件的适应性
   - 实现方法:可以使用ATR(真实波动幅度)来动态调整砖块大小

2. **增加交易过滤器**:
   - 结合成交量或其他动量指标来确认趋势反转信号
   - 在低流动性或极端波动条件下避免交易
   - 实现方法:增加基于RSI、成交量突破或MACD的额外确认条件

3. **改进止损和获利机制**:
   - 当前策略仅在方向反转时平仓,可以增加智能止损和目标获利水平
   - 基于砖块大小的倍数设置动态止损位
   - 实现方法:添加`strategy.exit()`命令,设置基于ATR或砖块大小的止损点

4. **优化多步骤验证机制**:
   - 当前策略使用固定的`brickSize`倍数来比较历史砖块
   - 可以研究最优的历史比较步骤数量
   - 对不同市场和时间框架进行回测,找到最佳参数组合
   - 实现方法:使参数化步骤数量,允许用户自定义验证深度

5. **改进可视化和告警系统**:
   - 增加趋势线和关键水平标记
   - 添加砖块形成和交易信号的告警功能
   - 显示当前趋势强度和持续时间
   - 实现方法:使用`label.new()`和`alert()`函数增强用户体验

## 总结

多步骤非重绘Renko仿真趋势反转量化交易策略成功解决了传统Renko策略中的重绘问题,使交易者能够在标准时间图表上应用Renko逻辑,同时保持历史信号的稳定性。该策略通过多步骤验证机制识别趋势反转,提高了信号质量,并通过图形化方式直观展示市场结构。

策略主要优势在于解决重绘问题、过滤市场噪音、多层次信号验证和直观的图形表示。然而,仍存在信号延迟、砖块大小选择和假信号等风险。未来可通过实现动态砖块大小、增加交易过滤器、改进止损机制、优化验证步骤和增强可视化系统来进一步优化。

这种结合了Renko图表优势且避免其缺点的方法,特别适合趋势跟随和趋势反转交易策略,为交易者提供了一种可靠的技术分析工具,能够在保持回测准确性的同时提供稳定的实盘表现。 || ## Strategy Overview

This strategy is a non-repainting quantitative trading system based on Renko chart emulation that solves the repainting problem found in traditional Renko strategies by simulating Renko brick behavior on standard time-based charts. The strategy uses fixed-size price bricks to filter market noise, focusing only on meaningful price movements while ensuring historical signals remain unchanged. This strategy is particularly suitable for trend following and trend reversal trading, making trading decisions by comparing brick direction changes through multiple steps.

Key features:
- Implements non-repainting Renko effects on time-based charts
- Identifies trend reversals using brick direction changes
- Multi-step verification mechanism to improve signal quality
- Graphical display of brick formation process
- Stable backtesting results consistent with real-time trading performance

## Strategy Principles

The core principle of this strategy is to implement Renko brick functionality on a standard time-based chart while solving the repainting problem found in traditional Renko charts. The specific working principles are as follows:

1. **Parameter Configuration & Initialization**:
   - `brickSize`: Defines the brick size, determining how much price must move to form a new brick
   - `renkoPrice`: Stores the closing price of the last completed Renko brick
   - `prevRenkoPrice`: Stores the price level of the previous Renko brick
   - `brickDir`: Tracks the direction of bricks (1=up, -1=down)
   - `newBrick`: A boolean flag indicating whether a new brick has been formed
   - `brickStart`: Stores the bar index at which the current brick started

2. **Non-Repainting Renko Brick Identification**:
   - The system performs calculations only on confirmed bars, ensuring historical data is not recalculated
   - Calculates the difference between the current price and the last Renko brick level
   - When the price difference reaches or exceeds the brick size, a new Renko brick is formed
   - Updates the brick price level based on the number of bricks that would fit within the price movement
   - Updates the direction (brickDir) and sets a flag (newBrick) indicating a new brick has been formed

3. **Renko Visualization on Time-Based Charts**:
   - Uses graphical elements to draw Renko-style bricks on a standard chart
   - Green boxes represent bullish bricks
   - Red boxes represent bearish bricks
   - Once formed, bricks never change or disappear

4. **Multi-Step Trend Reversal Detection**:
   - The strategy checks not only the current brick direction but also compares multiple historical bricks
   - Confirms genuine trend reversals by verifying direction changes across consecutive bricks

## Strategy Advantages

After in-depth code analysis, this strategy demonstrates the following significant advantages:

1. **Solves the Repainting Problem**:
   - Traditional Renko strategies perform well in backtesting but often fail in live trading, primarily due to the repainting issue
   - This strategy ensures that once a brick is formed, it will not change by emulating Renko behavior on standard time-based charts
   - This makes backtesting results more reliable and closer to live trading performance

2. **Noise Filtering and Clear Trend Identification**:
   - Renko charts inherently filter small fluctuations, forming new bricks only when price moves by a preset amount
   - This helps identify clear price trends and reduces false signals
   - Suitable for finding meaningful price movements in highly volatile markets

3. **Multi-Step Signal Verification**:
   - The strategy checks not just single direction changes but verifies multiple consecutive bricks' directions
   - By comparing `brickDir[brickSize]` with the current `brickDir` and historical price level relationships
   - Multi-step verification mechanism significantly reduces false signals

4. **Visual Trading Foundation**:
   - Draws colored bricks on charts, visually displaying price structure
   - Green and red boxes clearly identify market direction
   - Visual aids help traders better understand market behavior

5. **Flexibility and Customizability**:
   - Brick size can be adjusted by users, allowing strategy optimization for different markets and timeframes
   - Smaller brick sizes generate more frequent trading signals, suitable for short-term trading
   - Larger brick sizes filter more noise, suitable for medium to long-term trend following

## Strategy Risks

Despite solving the repainting problem, the following risk factors still exist:

1. **Signal Delay Risk**:
   - Since the strategy executes calculations only on confirmed bars, trade execution may be slightly later than traditional Renko charts
   - In fast-moving markets, entry points may miss optimal prices
   - Solution: Consider combining with other confirmation indicators or adjusting brick size to balance timeliness and accuracy

2. **Brick Size Selection Risk**:
   - Too small bricks generate excessive trading signals, increasing trading costs and potentially leading to overtrading
   - Too large bricks may miss important market turning points
   - Solution: Optimize brick size based on the volatility of the target asset and trading timeframe

3. **Trend Reversal False Signal Risk**:
   - Despite using multi-step verification, false breakouts may still occur in violently volatile markets
   - Price may cross brick boundaries multiple times before a real trend forms
   - Solution: Consider adding additional filters such as volume confirmation or momentum indicators

4. **Drawdown Risk**:
   - Trend reversal strategies may lead to consecutive losses in strongly trending markets
   - Reversal signals may trigger too early, resulting in counter-trend trading
   - Solution: Implement appropriate stop-loss mechanisms and position management strategies

5. **Computational Resource Risk**:
   - Drawing numerous bricks may consume significant resources, especially on long timeframes and large datasets
   - The code limits the maximum number of boxes to 500, which may be insufficient in some cases
   - Solution: Optimize code efficiency or consider displaying only the most recent N bricks

## Strategy Optimization Directions

Based on code analysis, here are several key optimization directions for this strategy:

1. **Dynamic Brick Size Optimization**:
   - The current strategy uses fixed brick size, which can be improved to dynamic brick size based on market volatility
   - Use smaller bricks during low volatility periods and larger bricks during high volatility periods
   - This will improve the strategy's adaptability to different market conditions
   - Implementation method: Use ATR (Average True Range) to dynamically adjust brick size

2. **Add Trading Filters**:
   - Combine volume or other momentum indicators to confirm trend reversal signals
   - Avoid trading under low liquidity or extreme volatility conditions
   - Implementation method: Add additional confirmation conditions based on RSI, volume breakouts, or MACD

3. **Improve Stop Loss and Profit Taking Mechanisms**:
   - The current strategy only closes positions when direction reverses; intelligent stop loss and target profit levels can be added
   - Set dynamic stop loss levels based on multiples of brick size
   - Implementation method: Add `strategy.exit()` commands, setting stop loss points based on ATR or brick size

4. **Optimize Multi-Step Verification Mechanism**:
   - The current strategy uses fixed `brickSize` multiples to compare historical bricks
   - Research the optimal number of historical comparison steps
   - Backtest different markets and timeframes to find the best parameter combinations
   - Implementation method: Parameterize the number of steps, allowing users to customize verification depth

5. **Improve Visualization and Alert Systems**:
   - Add trend lines and key level markers
   - Add alert functionality for brick formation and trading signals
   - Display current trend strength and duration
   - Implementation method: Use `label.new()` and `alert()` functions to enhance user experience

## Conclusion

The Multi-Step Non-Repainting Renko Emulation Trend Reversal Quantitative Trading Strategy successfully addresses the repainting problem in traditional Renko strategies, enabling traders to apply Renko logic on standard time-based charts while maintaining the stability of historical signals. The strategy identifies trend reversals through a multi-step verification mechanism, improving signal quality, and visually displays market structure through graphical representation.

The main advantages of the strategy include solving the repainting problem, filtering market noise, multi-level signal verification, and intuitive graphical representation. However, risks still exist, including signal delays, brick size selection, and false signals. Future optimizations can be achieved by implementing dynamic brick sizes, adding trading filters, improving stop loss mechanisms, optimizing verification steps, and enhancing visualization systems.

This approach, which combines the advantages of Renko charts while avoiding their drawbacks, is particularly suitable for trend following and trend reversal trading strategies, providing traders with a reliable technical analysis tool that can deliver stable live performance while maintaining backtesting accuracy.[/trans]



> Source (PineScript)

``` pinescript
//@version=5
strategy("Non-Repainting Renko Emulation Strategy [PineIndicators]", overlay=true, calc_on_every_tick=false, max_boxes_count = 500, max_labels_count = 500, max_lines_count = 500, initial_capital = 10000, default_qty_value = 100, default_qty_type = strategy.percent_of_equity, commission_value = 0.01, slippage = 2)

// Parameter: Brick-Größe (z.B. 10 Punkte)
brickSize = input.float(3.0, "Brick Size", step=0.1)

// Persistente Variablen
var float renkoPrice     = na    // Aktueller Renko-Level (Schlusswert des letzten Bricks)
var float prevRenkoPrice = na    // Vorheriger Renko-Level (für Box-Berechnung)
var int   brickDir       = 0     // 1 = Aufwärts, -1 = Abwärts
var bool  newBrick       = false // Signalisiert, dass ein neuer Brick abgeschlossen wurde
var int   brickStart     = bar_index  // Beginn des aktuellen Bricks (x-Achse)

// Berechnungen nur auf abgeschlossenen Candles
if barstate.isconfirmed
    newBrick := false
    // Initialisierung: Beim ersten Candle setzen wir den Renko-Level
    if na(renkoPrice)
        renkoPrice := close
        brickStart := bar_index
    // Berechne die Differenz zum letzten Renko-Level
    diff = close - renkoPrice
    // Prüfen, ob der Unterschied mindestens der Brick-Größe entspricht
    if math.abs(diff) >= brickSize
        // Anzahl kompletter Bricks (kann > 1 sein)
        numBricks = math.floor(math.abs(diff) / brickSize)
        prevRenkoPrice := renkoPrice
        // Aktualisieren des Renko-Levels
        renkoPrice := renkoPrice + numBricks * brickSize * math.sign(diff)
        // Brick-Richtung (konvertiere math.sign-Ergebnis in int)
        brickDir := int(math.sign(diff))
        newBrick := true

        // Bestimme die obere und untere Grenze des abgeschlossenen Bricks:
        lowLevel  = brickDir == 1 ? prevRenkoPrice : renkoPrice
        highLevel = brickDir == 1 ? renkoPrice     : prevRenkoPrice

        // Setze den Start für den nächsten Brick
        brickStart := bar_index


// Handelslogik: Einstieg/Ausstieg nur, wenn ein neuer Brick abgeschlossen wurde
if barstate.isconfirmed and newBrick
    // Bei Aufwärts-Brick: Long-Signal
    if brickDir[brickSize] < brickDir and renkoPrice[brickSize] < renkoPrice[brickSize*2] and renkoPrice < renkoPrice[brickSize] and renkoPrice[brickSize*2] < renkoPrice[brickSize*3] and strategy.position_size <= 0
        // Bestehende Short-Position schließen, falls vorhanden
        strategy.entry("Long", strategy.long)

    // Bei Abwärts-Brick: Short-Signal
    else if brickDir[brickSize] > brickDir and renkoPrice[brickSize] > renkoPrice[brickSize*2] and renkoPrice > renkoPrice[brickSize] and renkoPrice[brickSize*2] > renkoPrice[brickSize*3] and strategy.position_size >= 0
        // Bestehende Long-Position schließen, falls vorhanden
        strategy.entry("Short", strategy.short)

if barstate.isconfirmed and newBrick
    if brickDir[brickSize] < brickDir
        strategy.close("Short")

    else if brickDir[brickSize] > brickDir
        strategy.close("Long")


```

> Detail

https://www.fmz.com/strategy/484769

> Last Modified

2025-03-04 10:26:05
