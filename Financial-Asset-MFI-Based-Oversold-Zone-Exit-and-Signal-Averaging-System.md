
> Name

Financial-Asset-MFI-Based-Oversold-Zone-Exit-and-Signal-Averaging-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d07e4926963045562a.png)

[trans]
#### 概述
本策略是一个基于资金流量指标(MFI)的自动化交易系统,主要通过识别资产在超卖区域的表现来捕捉潜在的反转机会。策略的核心是当MFI指标从超卖区域(默认值20以下)回升时产生买入信号,并通过限价单、止损和获利了结等多重机制来管理交易风险和收益。该策略特别适合在市场出现超跌反弹时进行布局。

#### 策略原理
策略运作基于以下几个关键步骤:
1. 持续监测资金流量指标(MFI)的数值变化,当MFI降至预设的超卖阈值(默认20)以下时,系统标记进入超卖区域。
2. 当MFI从超卖区域回升并突破阈值时,系统会在当前价格下方设置一个买入限价单,具体价格由用户定义的百分比决定。
3. 系统会对限价单的有效期进行监控,如果在预设的观察周期(默认5个K线)内未能成交,该订单将被自动取消。
4. 一旦买入订单成交,系统会立即设置止损和获利目标价位,分别基于入场价格的百分比计算。
5. 交易将在触及止损或者获利目标时自动平仓结束。

#### 策略优势
1. 风险控制完善:通过预设的止损和获利目标,为每笔交易提供明确的风险收益比。
2. 入场机制灵活:使用限价单入场可以获得更优的成交价格,提高整体盈利空间。
3. 自动化程度高:从信号生成到仓位管理全程自动化,减少人为干预带来的情绪影响。
4. 参数可调节性强:关键参数如MFI周期、超卖阈值、订单有效期等均可根据不同市场特征进行优化。
5. 系统逻辑清晰:策略规则明确,便于回测和实盘监控。

#### 策略风险
1. 假信号风险:在剧烈波动市场中,MFI可能产生虚假的超卖信号。建议结合其他技术指标进行交叉验证。
2. 滑点风险:限价单可能因市场快速波动而无法按预期价格成交。可以适当放宽限价单价格或延长有效期。
3. 趋势风险:在强势下跌趋势中,过早进场可能面临较大亏损。建议增加趋势过滤器。
4. 参数敏感性:策略表现对参数设置较为敏感,需要针对不同市场环境进行优化。

#### 策略优化方向
1. 增加市场趋势过滤:可以引入移动平均线等趋势指标,仅在上升趋势中开启交易。
2. 优化信号确认机制:可以结合RSI、MACD等其他技术指标,提高信号可靠性。
3. 动态止损机制:可以根据市场波动率动态调整止损距离,提高止损的灵活性。
4. 分批建仓和平仓:可以实现多个价位的限价单,降低整体持仓成本。
5. 引入时间过滤:可以根据不同时段的市场特征,选择性开启交易。

#### 总结
这是一个设计合理、逻辑清晰的自动化交易策略。通过对MFI指标的灵活运用,结合完善的订单管理机制,能够有效捕捉市场超卖后的反弹机会。策略的可配置性强,便于根据不同市场环境进行优化调整。虽然存在一定的风险,但通过建议的优化方向,可以进一步提升策略的稳定性和盈利能力。适合用于中长期投资,特别是在震荡市场中寻找超跌反弹机会的投资者。 || 

#### Overview
This strategy is an automated trading system based on the Money Flow Index (MFI), primarily designed to capture potential reversal opportunities by identifying asset behavior in oversold zones. The core mechanism generates buy signals when the MFI indicator rebounds from the oversold zone (default below 20), utilizing limit orders, stop-loss, and take-profit mechanisms to manage trade risk and returns. This strategy is particularly suitable for positioning during market oversold bounces.

#### Strategy Principles
The strategy operates based on the following key steps:
1. Continuously monitors MFI value changes, marking entry into the oversold zone when MFI falls below the preset threshold (default 20).
2. When MFI rebounds and breaks above the threshold from the oversold zone, the system places a buy limit order below the current price, with the specific price determined by a user-defined percentage.
3. The system monitors the limit order's validity period, automatically canceling if not filled within the preset observation period (default 5 candles).
4. Once the buy order is filled, the system immediately sets stop-loss and profit target levels, calculated based on entry price percentages.
5. Trades automatically close when either the stop-loss or profit target is reached.

#### Strategy Advantages
1. Comprehensive Risk Control: Provides clear risk-reward ratios through preset stop-loss and profit targets.
2. Flexible Entry Mechanism: Using limit orders for entry can achieve better execution prices, enhancing overall profit potential.
3. High Automation Level: Fully automated from signal generation to position management, reducing emotional interference.
4. Strong Parameter Adjustability: Key parameters like MFI period, oversold threshold, and order validity can be optimized for different market characteristics.
5. Clear System Logic: Strategy rules are explicit, facilitating backtesting and live monitoring.

#### Strategy Risks
1. False Signal Risk: MFI may generate false oversold signals in volatile markets. Consider cross-validation with other technical indicators.
2. Slippage Risk: Limit orders may not execute at expected prices due to rapid market movements. Consider widening limit order prices or extending validity periods.
3. Trend Risk: Early entry in strong downtrends may face significant losses. Consider adding trend filters.
4. Parameter Sensitivity: Strategy performance is sensitive to parameter settings, requiring optimization for different market environments.

#### Strategy Optimization Directions
1. Add Market Trend Filtering: Incorporate moving averages or other trend indicators to enable trading only in uptrends.
2. Optimize Signal Confirmation: Combine with RSI, MACD, or other technical indicators to improve signal reliability.
3. Dynamic Stop-Loss Mechanism: Adjust stop-loss distances based on market volatility for more flexible risk management.
4. Phased Position Building and Closing: Implement multiple price level limit orders to reduce overall position cost.
5. Introduce Time Filtering: Selectively enable trading based on different time period market characteristics.

#### Summary
This is a well-designed, logically clear automated trading strategy. Through flexible use of the MFI indicator, combined with comprehensive order management mechanisms, it effectively captures market rebounds after oversold conditions. The strategy's high configurability facilitates optimization for different market environments. While certain risks exist, they can be addressed through the suggested optimization directions to further enhance strategy stability and profitability. Suitable for medium to long-term investment, especially for investors seeking oversold bounce opportunities in oscillating markets.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-04 00:00:00
end: 2024-12-04 00:00:00
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © traderhub

//@version=5
strategy("MFI Strategy with Oversold Zone Exit and Averaging", overlay=true)

// Strategy parameters
mfiPeriod = input.int(title="MFI Period", defval=14) // Period for calculating MFI
mfiOS = input.float(title="MFI Oversold Level", defval=20.0) // Oversold level for MFI
longEntryPercentage = input.float(title="Long Entry Percentage (%)", minval=0.0, step=0.1, defval=0.1) // Percentage for the buy limit order
stopLossPercentage = input.float(title="Stop Loss Percentage (%)", minval=0.0, step=0.1, defval=1.0) // Percentage for the stop-loss
exitGainPercentage = input.float(title="Exit Gain Percentage (%)", minval=0.0, step=0.1, defval=1.0) // Percentage gain for the take-profit
cancelAfterBars = input.int(title="Cancel Order After # Bars", minval=1, defval=5) // Cancel order after a certain number of bars

// Calculate MFI
mfi = ta.mfi(close, mfiPeriod)  // MFI with specified period

// Variables for tracking state
var bool inOversoldZone = false  // Flag for being in the oversold zone
var float longEntryPrice = na  // Price for long entry
var int barsSinceEntryOrder = na  // Counter for bars after placing an order

// Define being in the oversold zone
if (mfi < mfiOS)
    inOversoldZone := true  // Entered oversold zone

// Condition for exiting the oversold zone and placing a limit order
if (inOversoldZone and mfi > mfiOS)
    inOversoldZone := false  // Leaving the oversold zone
    longEntryPrice := close * (1 - longEntryPercentage / 100)  // Calculate limit price for entry
    strategy.entry("Long Entry", strategy.long, limit=longEntryPrice)  // Place a limit order
    barsSinceEntryOrder := 0  // Reset counter for bars after placing the order

// Increase the bar counter if the order has not yet been filled
if (not na(barsSinceEntryOrder))
    barsSinceEntryOrder += 1

// Cancel order if it hasn’t been filled within the specified number of bars
if (not na(barsSinceEntryOrder) and barsSinceEntryOrder >= cancelAfterBars and strategy.position_size == 0)
    strategy.cancel("Long Entry")
    barsSinceEntryOrder := na  // Reset bar counter

// Set stop-loss and take-profit for filled positions
if (strategy.position_size > 0)
    stopLossPrice = longEntryPrice * (1 - stopLossPercentage / 100)  // Calculate stop-loss level
    takeProfitPrice = longEntryPrice * (1 + exitGainPercentage / 100)  // Calculate take-profit level
    strategy.exit("Exit Long", from_entry="Long Entry", limit=takeProfitPrice, stop=stopLossPrice)

// Visualize oversold and overbought zones
bgcolor(mfi < mfiOS ? color.new(color.green, 90) : na)  // Background in oversold zone
plot(mfi, title="MFI", color=color.blue)  // MFI plot
hline(mfiOS, "Oversold Level", color=color.red)  // Oversold level line












```

> Detail

https://www.fmz.com/strategy/474060

> Last Modified

2024-12-05 16:40:47
