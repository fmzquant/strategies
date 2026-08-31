
> Name

Session-VWMA-Based-Intraday-Synthetic-Options-Strategy-Adaptive-Trading-System-with-Long-Short-Signals

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d949cfff0080791834c4.png)
![IMG](https://www.fmz.com/upload/asset/2d8e3dedf323377f6974f.png)




[trans]
#### 概述
这是一个基于成交量加权移动平均线(VWMA)的日内交易策略,通过合成期权组合实现多空双向操作。策略核心是在每个交易日重新计算的VWMA指标,根据价格与VWMA的相对位置产生交易信号,并在收盘前自动平仓。该策略具有良好的风险控制机制,包括仓位管理和交易频率限制。

#### 策略原理
策略的核心逻辑基于以下几点:
1. 使用每日重置的VWMA作为动态趋势指标
2. 当价格突破VWMA上方时,构建看涨组合(买入看涨期权+卖出看跌期权)
3. 当价格跌破VWMA下方时,构建看跌组合(买入看跌期权+卖出看涨期权) 
4. 在15:29(IST)强制平仓所有持仓
5. 引入hasExited变量控制加仓频率,避免过度交易
6. 支持在同向突破时的金字塔式加仓

#### 策略优势
1. 动态适应性强 - VWMA每日重置确保指标始终反映当前市场状况
2. 风险收益平衡 - 通过合成期权组合既限制了风险又保持了盈利潜力
3. 交易纪律严格 - 具有明确的入场、加仓和强制平仓机制
4. position sizing灵活 - 支持百分比仓位管理
5. 操作逻辑清晰 - 信号产生条件简单直观

#### 策略风险
1. 震荡市场风险 - VWMA突破在横盘市场可能产生频繁假信号
2. 缺口风险 - 隔夜大幅波动可能导致较大损失
3. 期权组合风险 - 合成期权存在Delta中性偏差
4. 执行滑点 - 高频交易可能面临较大滑点
5. 资金效率 - 每日强制平仓会增加交易成本

#### 策略优化方向
1. 引入波动率过滤器,在高波动率环境下调整策略参数
2. 增加趋势确认指标,减少假突破带来的损失
3. 优化期权组合结构,如考虑引入垂直价差策略
4. 实现自适应的VWMA周期,根据市场状态动态调整
5. 增加更多的风险控制指标,如最大回撤限制

#### 总结
这是一个结构完整、逻辑严密的日内交易策略。通过VWMA指标捕捉短期趋势,结合合成期权组合进行交易,具有良好的风险控制机制。策略的优化空间主要在于减少假信号、提高执行效率和完善风险管理体系。虽然存在一定的局限性,但整体而言是一个具有实战价值的交易系统。

|| 

#### Overview
This is an intraday trading strategy based on Volume Weighted Moving Average (VWMA) that implements long-short operations through synthetic options combinations. The core of the strategy is the daily-reset VWMA indicator, generating trading signals based on price position relative to VWMA, with automatic position closure before market close. The strategy incorporates robust risk control mechanisms, including position management and trade frequency limitations.

#### Strategy Principles
The core logic is based on the following points:
1. Using daily-reset VWMA as a dynamic trend indicator
2. Constructing bullish combinations (buy call + sell put) when price breaks above VWMA
3. Constructing bearish combinations (buy put + sell call) when price breaks below VWMA
4. Mandatory position closure at 15:29 (IST)
5. Implementing hasExited variable to control position adding frequency
6. Supporting pyramiding in the direction of breakthrough

#### Strategy Advantages
1. Strong Dynamic Adaptability - Daily VWMA reset ensures indicator reflects current market conditions
2. Balanced Risk-Reward - Synthetic options combinations limit risk while maintaining profit potential
3. Strict Trading Discipline - Clear entry, position adding, and forced exit mechanisms
4. Flexible Position Sizing - Supports percentage-based position management
5. Clear Operational Logic - Simple and intuitive signal generation conditions

#### Strategy Risks
1. Choppy Market Risk - VWMA breakouts may generate frequent false signals in ranging markets
2. Gap Risk - Overnight large price movements may lead to significant losses
3. Options Combination Risk - Synthetic options may have delta neutrality bias
4. Execution Slippage - High-frequency trading may face significant slippage
5. Capital Efficiency - Daily forced closure increases trading costs

#### Strategy Optimization Directions
1. Introduce volatility filters to adjust strategy parameters in high volatility environments
2. Add trend confirmation indicators to reduce losses from false breakouts
3. Optimize options combination structure, such as considering vertical spread strategies
4. Implement adaptive VWMA periods based on market conditions
5. Add more risk control indicators, such as maximum drawdown limits

#### Summary
This is a well-structured and logically sound intraday trading strategy. It captures short-term trends using the VWMA indicator, combined with synthetic options trading, featuring good risk control mechanisms. Strategy optimization potential mainly lies in reducing false signals, improving execution efficiency, and enhancing risk management systems. While it has certain limitations, it is overall a trading system with practical value.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-02-16 00:00:00
end: 2025-02-23 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

//@version=5
strategy("Session VWMA Synthetic Options Strategy", overlay=true, initial_capital=100000, 
     default_qty_type=strategy.percent_of_equity, default_qty_value=10, pyramiding=10, calc_on_every_tick=true)

//──────────────────────────────
// Session VWMA Inputs
//──────────────────────────────
vwmaLen   = input.int(55, title="VWMA Length", inline="VWMA", group="Session VWMA")
vwmaColor = input.color(color.orange, title="VWMA Color", inline="VWMA", group="Session VWMA", tooltip="VWMA resets at the start of each session (at the opening of the day).")

//──────────────────────────────
// Session VWMA Calculation Function
//──────────────────────────────
day_vwma(_start, s, l) =>
    bs_nd = ta.barssince(_start)
    v_len = math.max(1, bs_nd < l ? bs_nd : l)
    ta.vwma(s, v_len)

//──────────────────────────────
// Determine Session Start
//──────────────────────────────
// newSession becomes true on the first bar of a new day.
newSession = ta.change(time("D")) != 0

//──────────────────────────────
// Compute Session VWMA
//──────────────────────────────
vwmaValue = day_vwma(newSession, close, vwmaLen)
plot(vwmaValue, color=vwmaColor, title="Session VWMA")

//──────────────────────────────
// Define Signal Conditions (only on transition)
//──────────────────────────────
bullCond = low > vwmaValue      // Bullish: candle low above VWMA
bearCond = high < vwmaValue     // Bearish: candle high below VWMA

// Trigger signal only on the bar where the condition first becomes true
bullSignal = bullCond and not bullCond[1]
bearSignal = bearCond and not bearCond[1]

//──────────────────────────────
// **Exit Condition at 15:29 IST**
//──────────────────────────────
sessionEnd = hour == 15 and minute == 29

// Exit all positions at 15:29 IST
if sessionEnd
    strategy.close_all(comment="Closing all positions at session end")

//──────────────────────────────
// **Trade Control Logic**
//──────────────────────────────
var bool hasExited = true  // Track if an exit has occurred since last entry

// Reset exit flag when a position is exited
if strategy.position_size == 0
    hasExited := true

//──────────────────────────────
// **Position Management: Entry & Exit**
//──────────────────────────────
if newSession
    hasExited := true  // Allow first trade of the day

// On a bullish signal: 
//   • If currently short, close the short position and then enter long
//   • Otherwise, add to any existing long position **only if an exit happened before**
if bullSignal and (hasExited or newSession)
    if strategy.position_size < 0
        strategy.close("Short", comment="Exit Short on Bull Signal")
        strategy.entry("Long", strategy.long, comment="Enter Long: Buy Call & Sell Put at ATM")
    else
        strategy.entry("Long", strategy.long, comment="Add Long: Buy Call & Sell Put at ATM")
    hasExited := false  // Reset exit flag

// On a bearish signal: 
//   • If currently long, close the long position and then enter short
//   • Otherwise, add to any existing short position **only if an exit happened before**
if bearSignal and (hasExited or newSession)
    if strategy.position_size > 0
        strategy.close("Long", comment="Exit Long on Bear Signal")
        strategy.entry("Short", strategy.short, comment="Enter Short: Buy Put & Sell Call at ATM")
    else
        strategy.entry("Short", strategy.short, comment="Add Short: Buy Put & Sell Call at ATM")
    hasExited := false  // Reset exit flag

//──────────────────────────────
// **Updated Alert Conditions**
//──────────────────────────────
// Alerts for valid trade entries
alertcondition(bullSignal and (hasExited or newSession), 
     title="Long Entry Alert", 
     message="Bullish signal: BUY CALL & SELL PUT at ATM. Entry allowed.")

alertcondition(bearSignal and (hasExited or newSession), 
     title="Short Entry Alert", 
     message="Bearish signal: BUY PUT & SELL CALL at ATM. Entry allowed.")


```

> Detail

https://www.fmz.com/strategy/483520

> Last Modified

2025-02-27 16:46:17
