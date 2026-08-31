
> Name

Multi-Level-RSI-Cross-Under-Regression-Pyramiding-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d9297e2d60c0cf3055f5.png)
![IMG](https://www.fmz.com/upload/asset/2d912d53ed42355ce8187.png)



[trans]
#### 概述
该策略是一个基于相对强弱指标(RSI)的自动化交易系统,主要通过识别市场超卖条件来捕捉潜在的反弹机会。策略采用递进式建仓方式,在RSI低位交叉时逐步建立多个仓位,并通过设定盈利目标进行风险控制。系统设计了灵活的资金管理机制,每次交易使用账户总额的6.6%进行操作,最多允许15次金字塔式加仓。

#### 策略原理 
策略的核心逻辑基于以下几个关键要素:
1. 入场信号:当14周期RSI指标下穿28.5的超卖水平时触发买入信号
2. 仓位管理:单次建仓使用账户权益的6.6%,最多允许15次递进建仓
3. 获利了结:当价格达到建仓均价900%的涨幅时,平掉50%的持仓
4. 可视化展示:在图表上标注买卖信号、RSI曲线、入场价格和目标价格
策略通过观察RSI指标在超卖区域的表现来判断市场走势,当出现超卖信号时逐步建仓,以降低建仓成本。

#### 策略优势
1. 系统化建仓:通过预设的RSI参数自动识别交易机会,避免人为判断带来的主观偏差
2. 风险分散:采用递进式建仓方式,在不同价位建立多个仓位,有效分散风险
3. 灵活适应:策略参数可根据不同市场环境和个人风险偏好进行调整
4. 收益保护:设置了明确的获利目标,在达到目标时自动减仓,锁定部分收益
5. 资金效率:通过合理的仓位控制和加仓机制,提高资金使用效率

#### 策略风险
1. 趋势风险:在强势下跌趋势中可能频繁触发建仓信号,导致资金损失
2. 参数敏感:RSI参数、建仓比例等设置不当可能影响策略表现
3. 市场流动性:在流动性不足的市场中,可能难以按目标价格完成交易
4. 资金管理:过度加仓可能导致风险敞口过大
解决方案:
- 增加趋势过滤器,在明确的下跌趋势中暂停建仓
- 通过回测优化参数设置
- 设置最大回撤限制
- 动态调整加仓阈值

#### 策略优化方向
1. 动态参数:根据市场波动率自动调整RSI参数和建仓条件
2. 止损机制:增加移动止损功能,更好地控制风险
3. 市场过滤:加入成交量、趋势等过滤条件,提高信号质量
4. 出场优化:设计更灵活的获利了结机制,如分段减仓
5. 风险控制:增加最大回撤限制和风险敞口控制

#### 总结
该策略通过RSI指标识别超卖机会,结合金字塔式加仓和固定比例获利了结,构建了一个完整的交易系统。策略的优势在于系统化操作和风险分散,但需要注意市场趋势和参数设置对策略表现的影响。通过增加动态参数调整、止损机制和市场过滤等优化措施,可以进一步提升策略的稳定性和盈利能力。||

#### Overview
This strategy is an automated trading system based on the Relative Strength Index (RSI), primarily designed to capture potential rebounds by identifying oversold market conditions. The strategy employs a progressive position-building approach, gradually establishing multiple positions when RSI crosses at low levels, with risk control through profit targets. The system features a flexible capital management mechanism, using 6.6% of total account equity per trade, allowing up to 15 pyramiding entries.

#### Strategy Principles
The core logic of the strategy is based on the following key elements:
1. Entry Signal: Buy signals are triggered when 14-period RSI crosses below the oversold level of 28.5
2. Position Management: Single position size is 6.6% of account equity, allowing up to 15 progressive entries
3. Profit Taking: Closes 50% of the position when price reaches 900% gain from entry price
4. Visualization: Displays buy/sell signals, RSI curve, entry price, and target price on charts
The strategy observes RSI behavior in oversold territory to determine market trends, gradually building positions upon oversold signals to reduce average entry costs.

#### Strategy Advantages
1. Systematic Entry: Automatically identifies trading opportunities through preset RSI parameters, avoiding subjective bias
2. Risk Diversification: Uses progressive position building at different price levels, effectively spreading risk
3. Flexibility: Strategy parameters can be adjusted according to different market environments and risk preferences
4. Profit Protection: Sets clear profit targets with automatic position reduction to lock in partial gains
5. Capital Efficiency: Optimizes capital utilization through proper position control and pyramiding mechanism

#### Strategy Risks
1. Trend Risk: Frequent entry signals may trigger during strong downtrends, leading to losses
2. Parameter Sensitivity: Improper settings of RSI parameters and position sizing can affect strategy performance
3. Market Liquidity: Difficulty executing trades at target prices in illiquid markets
4. Capital Management: Excessive pyramiding may lead to overexposure
Solutions:
- Add trend filters to pause entries during clear downtrends
- Optimize parameters through backtesting
- Set maximum drawdown limits
- Dynamically adjust pyramiding thresholds

#### Strategy Optimization
1. Dynamic Parameters: Automatically adjust RSI parameters and entry conditions based on market volatility
2. Stop-Loss Mechanism: Add trailing stop-loss functionality for better risk control
3. Market Filters: Incorporate volume and trend filters to improve signal quality
4. Exit Optimization: Design more flexible profit-taking mechanisms, such as staged position reduction
5. Risk Control: Add maximum drawdown limits and exposure control

#### Summary
The strategy identifies oversold opportunities through RSI indicator, combining pyramiding entries with fixed-ratio profit-taking to create a complete trading system. Its strengths lie in systematic operation and risk diversification, but attention must be paid to market trends and parameter settings affecting strategy performance. The strategy's stability and profitability can be further enhanced through dynamic parameter adjustment, stop-loss mechanisms, and market filters.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-09-15 00:00:00
end: 2024-12-10 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("RSI Cross Under Strategy", overlay=true, initial_capital=1500, default_qty_type=strategy.percent_of_equity, default_qty_value=6.6)

// Input parameters
rsiLength = input(14, "RSI Length")
rsiOversold = input(28.5, "RSI Oversold Level")
profitTarget = input(900, "Profit Target (%)")
maxPyramiding = input(15, "Max Pyramiding")

// Calculate RSI
rsi = ta.rsi(close, rsiLength)

// Detect RSI crossunder
rsiCrossunder = ta.crossunder(rsi, rsiOversold)

// Calculate the profit target price
entryPrice = strategy.position_avg_price
targetPrice = entryPrice * (1 + profitTarget / 100)

// Buy condition
if (rsiCrossunder and strategy.position_size <= maxPyramiding * strategy.equity * 0.066)
    strategy.entry("Buy", strategy.long)

// Take profit condition
if (strategy.position_size > 0 and high >= targetPrice)
    strategy.close("Buy", qty_percent = 50)

// Plot buy signals
plotshape(rsiCrossunder, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small)

// Plot sell signals (when position is partially closed)
plotshape(strategy.position_size > 0 and high >= targetPrice, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.triangledown, size=size.small)

// Plot RSI
plot(rsi, "RSI", color=color.blue, linewidth=2)
hline(rsiOversold, "RSI Oversold", color=color.red, linestyle=hline.style_dashed)

// Plot entry and target prices
plot(strategy.position_size > 0 ? entryPrice : na, "Entry Price", color=color.green, linewidth=2, style=plot.style_linebr)
plot(strategy.position_size > 0 ? targetPrice : na, "Target Price", color=color.red, linewidth=2, style=plot.style_linebr)

// Display strategy information
var table infoTable = table.new(position.top_right, 3, 6, border_width=1)
table.cell(infoTable, 0, 0, "Strategy Info", bgcolor=color.blue, text_color=color.white)
table.cell(infoTable, 0, 1, "RSI Length: " + str.tostring(rsiLength))
table.cell(infoTable, 0, 2, "RSI Oversold: " + str.tostring(rsiOversold))
table.cell(infoTable, 0, 3, "Profit Target: " + str.tostring(profitTarget) + "%")
table.cell(infoTable, 0, 4, "Order Size: 6.6% of total")
table.cell(infoTable, 0, 5, "Max Pyramiding: " + str.tostring(maxPyramiding) + " times")

```

> Detail

https://www.fmz.com/strategy/482916

> Last Modified

2025-02-27 17:21:37
