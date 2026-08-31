
> Name

Long-Grid-Strategy-Based-on-Drawdown-and-Target-Profit

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ce6cab9b294d00c93a.png)

[trans]
#### 概述
该策略是一个基于价格下跌幅度进行加仓,并在达到固定盈利目标时平仓的网格交易策略。策略的核心逻辑是在市场下跌到预设幅度时进行买入,在价格反弹达到目标利润时进行整体平仓,通过不断重复这个过程来获取收益。这种策略特别适合在震荡市场中捕捉短期反弹机会。

#### 策略原理
策略采用了网格交易和定向止盈的复合机制：
1. 初始建仓：在设定的开始时间后,系统会在第一次触发时以当前价格进行首次建仓。
2. 加仓机制：当价格相对于初始建仓价格下跌超过预设的跌幅(默认5%)时,进行追加买入。
3. 平仓机制：当价格相对于初始建仓价格上涨超过预设的盈利目标(默认5%)时,系统会对所有持仓进行平仓。
4. 统计跟踪：系统会实时统计交易次数和累计利润,并在图表上动态显示。

#### 策略优势
1. 自动化程度高：策略完全系统化,无需人工干预,能够24小时持续运行。
2. 风险分散：通过分批建仓的方式,可以有效降低单次建仓的风险。
3. 止盈明确：设定了固定的盈利目标,一旦达到目标立即落袋为安。
4. 适应性强：通过参数调整,可以适应不同的市场环境和交易品种。
5. 执行力强：策略逻辑清晰,不受主观情绪影响。

#### 策略风险
1. 趋势风险：在持续下跌行情中,可能会不断加仓导致亏损加大。
2. 资金管理风险：如果不设置合理的仓位控制,可能会因过度加仓导致资金占用过大。
3. 滑点风险：在行情剧烈波动时,可能会出现严重滑点,影响策略表现。
4. 参数敏感性：策略效果对参数设置较为敏感,不同市场环境下需要及时调整参数。

#### 策略优化方向
1. 动态止损：建议增加基于ATR或波动率的动态止损机制,防止大幅下跌。
2. 仓位管理：可以引入基于账户权益的动态仓位管理,确保资金使用更合理。
3. 市场筛选：增加趋势判断指标,在趋势明显的市场中暂停策略运行。
4. 盈利目标优化：可以设计动态盈利目标,根据市场波动情况自适应调整。
5. 加仓优化：可以设计递进式加仓数量,避免前期过度建仓。

#### 总结
这是一个结构简单但实用的网格交易策略,通过预设的下跌幅度进行分批建仓,在达到目标盈利时统一平仓。策略的核心优势在于其执行的确定性和风险的分散性,但在使用时需要注意市场环境的选择和参数的优化。通过增加动态止损、改进仓位管理等方式,策略还有较大的优化空间。在实盘使用时,建议先进行充分的回测,并结合市场实际情况进行参数调整。 || 

#### Overview
This strategy is a grid trading system that adds positions based on price drops and closes positions when reaching a fixed profit target. The core logic is to buy when the market drops to a preset percentage, close all positions when the price rebounds to the target profit, and generate returns by repeatedly executing this process. This strategy is particularly suitable for capturing short-term rebounds in oscillating markets.

#### Strategy Principle
The strategy employs a combined mechanism of grid trading and directional take-profit:
1. Initial Position: After the set start time, the system takes the first position at the current price when triggered.
2. Position Adding Mechanism: Additional buying is triggered when the price drops beyond the preset percentage (default 5%) relative to the initial entry price.
3. Position Closing Mechanism: When the price rises above the preset profit target (default 5%) relative to the initial entry price, the system closes all positions.
4. Statistical Tracking: The system tracks trade counts and cumulative profits in real-time, displaying them dynamically on the chart.

#### Strategy Advantages
1. High Automation: The strategy is fully systematic, requiring no manual intervention and can operate 24/7.
2. Risk Diversification: The batch position building approach effectively reduces single-entry risks.
3. Clear Profit Targets: Fixed profit targets ensure immediate profit-taking when reached.
4. High Adaptability: Parameter adjustments allow adaptation to different market environments and trading instruments.
5. Strong Execution: Clear strategy logic eliminates subjective emotional influences.

#### Strategy Risks
1. Trend Risk: In continuously declining markets, repeated position adding may increase losses.
2. Capital Management Risk: Without proper position control, excessive position adding may lead to high capital utilization.
3. Slippage Risk: Severe slippage during volatile market conditions may affect strategy performance.
4. Parameter Sensitivity: Strategy effectiveness is sensitive to parameter settings, requiring timely adjustments in different market environments.

#### Strategy Optimization Directions
1. Dynamic Stop Loss: Recommend adding ATR or volatility-based dynamic stop-loss mechanisms to prevent significant drawdowns.
2. Position Management: Introduce equity-based dynamic position management for more rational capital utilization.
3. Market Selection: Add trend identification indicators to pause strategy operation in trending markets.
4. Profit Target Optimization: Design dynamic profit targets that self-adjust based on market volatility.
5. Position Adding Optimization: Design progressive position sizing to avoid excessive early positions.

#### Summary
This is a structurally simple but practical grid trading strategy that builds positions in batches at preset price drops and uniformly closes positions when reaching profit targets. The strategy's core advantages lie in its execution certainty and risk diversification, but market environment selection and parameter optimization are crucial during implementation. There is significant optimization potential through adding dynamic stop-losses and improving position management. For live trading, thorough backtesting and parameter adjustment based on actual market conditions are recommended.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-04 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Buy Down 5%, Sell at 5% Profit", overlay=true, default_qty_type=strategy.fixed, default_qty_value=1)

// Inputs
initial_date = input(timestamp("2024-01-01 00:00:00"), title="Initial Purchase Date")
profit_target = input.float(5.0, title="Profit Target (%)", minval=0.1)   // Target profit percentage
rebuy_drop = input.float(5.0, title="Rebuy Drop (%)", minval=0.1)        // Drop percentage to rebuy

// Variables
var float initial_price = na             // Initial purchase price
var int entries = 0                      // Count of entries
var float total_profit = 0               // Cumulative profit
var bool active_trade = false            // Whether an active trade exists

// Entry Condition: Buy on or after the initial date
if not active_trade
    initial_price := close
    strategy.entry("Buy", strategy.long)
    entries += 1
    active_trade := true

// Rebuy Condition: Buy if price drops 5% or more from the initial price
rebuy_price = initial_price * (1 - rebuy_drop / 100)
if active_trade and close <= rebuy_price
    strategy.entry("Rebuy", strategy.long)
    entries += 1

// Exit Condition: Sell if the price gives a 5% profit on the initial investment
target_price = initial_price * (1 + profit_target / 100)
if active_trade and close >= target_price
    strategy.close_all(comment="Profit Target Hit")
    active_trade := false
    total_profit += profit_target

// Display information on the chart
plotshape(series=close >= target_price, title="Target Hit", style=shape.labelup, location=location.absolute, color=color.green, text="Sell")
plotshape(series=close <= rebuy_price, title="Rebuy", style=shape.labeldown, location=location.absolute, color=color.red, text="Rebuy")

// Draw statistics on the chart
var label stats_label = na
if (na(stats_label))
    stats_label := label.new(x=bar_index, y=close, text="", style=label.style_none, size=size.small)

label.set_xy(stats_label, bar_index, close)
label.set_text(stats_label, "Entries: " + str.tostring(entries) + "\nTotal Profit: " + str.tostring(total_profit, "#.##") + "%")

```

> Detail

https://www.fmz.com/strategy/477600

> Last Modified

2025-01-06 16:29:17
