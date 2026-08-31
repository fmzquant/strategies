
> Name

Dual-EMA-Trend-Following-Strategy-with-Limit-Buy-Entry

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/124509167bb4ccdd5ac.png)

[trans]
#### 概述
本策略是一个基于双均线系统的趋势跟踪交易策略,结合了技术分析中的指数移动平均线(EMA)指标,通过在EMA20位置设置限价单进行买入。策略采用保守的资金管理方法,每次仅使用账户权益的10%进行交易,并设置了止盈止损来控制风险。策略使用30天和300天两个周期的指数移动平均线来确定市场趋势,只在市场处于上升趋势时才会寻找入场机会。

#### 策略原理
策略的核心逻辑基于以下几个关键点:
1. 使用EMA300作为趋势判断指标,只有当价格位于EMA300之上时才会考虑开仓,这确保了交易方向与主趋势保持一致。
2. 在满足趋势条件后,策略会在EMA20位置设置限价买入订单,这种方式可以在价格回调至均线支撑位时以相对较低的价格建仓。
3. 策略采用固定百分比的止盈止损设置,默认止盈为入场价格的10%,止损为入场价格的5%,这种设置保证了每笔交易的风险回报比大于2:1。
4. 资金管理采用账户权益的10%进行仓位控制,这种保守的方式可以有效降低单笔交易的风险敞口。

#### 策略优势
1. 趋势跟踪特性:通过结合长短期均线,策略能够有效地识别和跟踪市场趋势,提高交易成功率。
2. 风险控制完善:采用固定止损和资金管理规则,有效控制每笔交易的风险。
3. 入场价格优化:使用限价单在EMA20位置建仓,可以获得较好的入场价格,提高整体收益。
4. 自动化程度高:策略完全系统化,减少了人为判断带来的情绪干扰。
5. 资金管理合理:采用账户权益的固定比例进行交易,可以实现资金的复利增长。

#### 策略风险
1. 震荡市风险:在横盘震荡市场中,策略可能会频繁触发止损,导致连续亏损。
2. 滑点风险:限价单可能无法完全成交,或在剧烈波动时出现较大滑点。
3. 趋势反转风险:虽然使用了长期均线作为趋势过滤,但仍可能在趋势反转初期承受较大损失。
4. 资金效率问题:由于采用较为保守的资金管理,在强势行情中可能无法充分把握获利机会。

#### 策略优化方向
1. 动态止盈止损:可以根据市场波动率动态调整止盈止损比例,提高策略的适应性。
2. 多重趋势确认:增加其他技术指标如RSI或MACD作为辅助确认,提高入场信号的可靠性。
3. 市场环境过滤:添加波动率指标如ATR,在不同市场环境下调整策略参数或暂停交易。
4. 资金管理优化:可以考虑根据账户收益情况动态调整交易规模,在盈利时适度增加仓位。
5. 入场机制改进:可以考虑在EMA20附近设置价格区间,增加成交机会。

#### 总结
该策略通过结合技术分析中的均线系统和严格的风险控制规则,构建了一个相对稳健的交易系统。策略的核心优势在于其趋势跟踪特性和完善的风险管理机制,通过限价单的方式优化入场价格,同时采用保守的资金管理方式控制风险。虽然策略在震荡市场中可能表现欠佳,但通过建议的优化方向,可以进一步提升策略的稳定性和盈利能力。对于追求稳健收益的投资者来说,这是一个值得考虑的量化交易策略选择。 || 

#### Overview
This strategy is a trend-following trading system based on a dual exponential moving average (EMA) framework, implementing limit buy orders at the EMA20 level. It employs a conservative money management approach, utilizing only 10% of account equity per trade and incorporating take-profit and stop-loss levels for risk management. The strategy uses two EMA periods (30 and 300 days) to determine market trends and only seeks entry opportunities during upward trending markets.

#### Strategy Principles
The core logic of the strategy is based on several key elements:
1. Uses EMA300 as a trend filter, only considering long positions when price is above EMA300, ensuring trade direction aligns with the main trend.
2. Places limit buy orders at the EMA20 level when trend conditions are met, allowing for entries at relatively lower prices during pullbacks to moving average support.
3. Implements fixed percentage-based take-profit and stop-loss levels, defaulting to 10% for profit targets and 5% for stop-losses, maintaining a risk-reward ratio greater than 2:1.
4. Employs position sizing at 10% of account equity, effectively reducing risk exposure per trade through conservative money management.

#### Strategy Advantages
1. Trend Following Characteristics: Effectively identifies and follows market trends by combining long and short-term moving averages, improving trade success rate.
2. Comprehensive Risk Control: Implements fixed stop-losses and money management rules to effectively control risk per trade.
3. Optimized Entry Prices: Uses limit orders at EMA20 to achieve better entry prices, enhancing overall returns.
4. High Automation Level: Fully systematic approach reduces emotional interference in trading decisions.
5. Rational Money Management: Uses fixed percentage of account equity for trading, enabling compound growth of capital.

#### Strategy Risks
1. Consolidation Market Risk: Strategy may experience frequent stop-losses during sideways, choppy markets leading to consecutive losses.
2. Slippage Risk: Limit orders may not fully execute or experience significant slippage during volatile market conditions.
3. Trend Reversal Risk: Despite using long-term moving average as a filter, significant losses may occur during initial trend reversals.
4. Capital Efficiency Issues: Conservative money management approach may limit profit potential during strong trending markets.

#### Strategy Optimization Directions
1. Dynamic Stop Levels: Adjust take-profit and stop-loss percentages based on market volatility to improve strategy adaptability.
2. Multiple Trend Confirmation: Add supplementary technical indicators like RSI or MACD to enhance entry signal reliability.
3. Market Environment Filtering: Incorporate volatility indicators like ATR to adjust strategy parameters or pause trading in different market conditions.
4. Money Management Optimization: Consider dynamic position sizing based on account performance, moderately increasing exposure during profitable periods.
5. Entry Mechanism Enhancement: Consider implementing a price range around EMA20 to increase execution opportunities.

#### Summary
This strategy combines a moving average system with strict risk control rules to create a relatively robust trading system. Its core strengths lie in its trend-following characteristics and comprehensive risk management mechanisms, optimizing entry prices through limit orders while maintaining conservative money management. Although the strategy may underperform in ranging markets, the suggested optimization directions can further enhance its stability and profitability. For investors seeking stable returns, this quantitative trading strategy represents a worthy consideration.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-09 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Limit Buy at EMA20 (Last 30 Days)", overlay=true)

// Inputs for EMAs
ema20Length = input.int(30, title="EMA 20 Length")
ema300Length = input.int(300, title="EMA 300 Length")
tpPercentage = input.float(10.0, title="Take Profit (%)", step=0.1) / 100
slPercentage = input.float(5.0, title="Stop Loss (%)", step=0.1) / 100  // Stop loss at 15%

// Calculate EMAs
ema20 = ta.ema(close, ema20Length)
ema300 = ta.ema(close, ema300Length)

// Plot EMAs
plot(ema20, color=color.blue, title="EMA 20")
plot(ema300, color=color.red, title="EMA 300")

// Limit backtesting to the last 30 days
startTime = timestamp(year(timenow), month(timenow), dayofmonth(timenow) - 30, 0, 0)
if (time < startTime)
    strategy.close_all()
    strategy.cancel_all()

// Entry Condition: Price above EMA300
longCondition = close > ema300 and time >= startTime

// Calculate position size (10% of equity)
positionSize = strategy.equity * 0.10 / ema20  // Use EMA20 as the limit price

// Place a limit buy order at EMA20
if (longCondition)
    strategy.order("Limit Buy", strategy.long, qty=positionSize, limit=ema20)

// Calculate TP and SL levels
tpPrice = ema20 * (1 + tpPercentage)
slPrice = ema20 * (1 - slPercentage)

// Set take profit and stop loss
if (strategy.position_size > 0)
    strategy.exit("Take Profit/Stop Loss", "Limit Buy", stop=slPrice, limit=tpPrice)

```

> Detail

https://www.fmz.com/strategy/474633

> Last Modified

2024-12-11 11:11:32
