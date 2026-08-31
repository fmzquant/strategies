
> Name

Advanced-Quantitative-Trading-Strategy-Automated-Execution-System-Based-on-Intraday-Momentum-and-Risk-Management

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8ff934925c91b8951b6.png)
![IMG](https://www.fmz.com/upload/asset/2d81d377bb988faddc930.png)



[trans]
#### 概述
这是一个基于日内动量的全自动化交易策略,结合了严格的风险管理和精确的头寸管理系统。该策略主要在伦敦交易时段运行,通过识别市场动量变化和排除Doji形态来寻找交易机会,同时实施每日止盈规则以控制风险。策略采用动态仓位管理方法,根据账户权益自动调整交易规模,确保资金使用的最优化。

#### 策略原理
策略的核心逻辑建立在多个关键组件之上。首先,交易时间限制在伦敦时段(排除0点和19点后的时间),以确保充足的市场流动性。入场信号基于价格动量的突破,具体要求当前蜡烛线的高点突破前一根的高点(做多)或低点突破前一根的低点(做空),同时需要满足方向一致性要求。为避免假突破,策略明确排除了Doji蜡烛线。策略还实施了每日止盈规则,一旦达到目标利润,当天将不再开启新仓位。

#### 策略优势
1. 风险管理全面: 包含固定止损止盈、每日止盈规则和动态仓位管理
2. 自适应性强: 交易规模根据账户权益自动调整,适应不同资金规模
3. 流动性保障: 严格限制在伦敦交易时段执行交易,避免低流动性风险
4. 假信号过滤: 通过排除Doji形态和连续信号,减少假突破带来的损失
5. 执行逻辑清晰: 入场和出场条件明确,便于监控和优化

#### 策略风险
1. 市场波动风险: 在高波动期间,固定止损可能不够灵活
2. 价格滑点风险: 在市场快速波动时可能面临较大滑点
3. 趋势依赖性: 策略在震荡市场中可能产生较多虚假信号
4. 参数敏感性: 止损止盈设置对策略表现影响较大
解决方案包括:采用动态止损机制、增加市场波动率过滤器、引入趋势确认指标等。

#### 策略优化方向
1. 引入自适应止损机制: 基于ATR或波动率动态调整止损范围
2. 增加市场环境过滤: 添加趋势强度指标,在明确趋势时增加持仓时间
3. 优化信号确认机制: 结合成交量和其他技术指标提高信号可靠性
4. 完善资金管理: 引入复合风险管理系统,考虑回撤控制
5. 增加市场微观结构分析: 整合订单流数据提高入场精确度

#### 总结
该策略通过结合动量突破、严格的风险管理和自动化执行系统,构建了一个完整的交易框架。策略的主要优势在于其全面的风险控制体系和自适应性设计,但仍需要在市场环境识别和信号过滤方面进行优化。通过持续改进和参数优化,该策略有望在不同市场环境下保持稳定表现。

||

#### Overview
This is a fully automated trading strategy based on intraday momentum, incorporating strict risk management and precise position sizing systems. The strategy operates primarily during London trading hours, seeking trading opportunities through momentum change identification and Doji pattern exclusion, while implementing daily take-profit rules for risk control. The strategy employs dynamic position management, automatically adjusting trading size based on account equity to optimize capital utilization.

#### Strategy Principles
The core logic is built on several key components. First, trading is restricted to London hours (excluding 0:00 and after 19:00) to ensure adequate market liquidity. Entry signals are based on price momentum breakouts, specifically requiring the current candle's high to break above the previous candle's high (for longs) or the low to break below the previous candle's low (for shorts), while maintaining directional consistency. To avoid false breakouts, the strategy explicitly excludes Doji candles. The strategy also implements a daily take-profit rule, ceasing new positions once the target profit is achieved.

#### Strategy Advantages
1. Comprehensive Risk Management: Includes fixed stop-loss/take-profit, daily profit targets, and dynamic position sizing
2. Strong Adaptability: Trading size automatically adjusts based on account equity, suitable for different capital scales
3. Liquidity Assurance: Strict trading execution during London hours to avoid low liquidity risks
4. False Signal Filtering: Reduces losses from false breakouts by excluding Doji patterns and consecutive signals
5. Clear Execution Logic: Well-defined entry and exit conditions for easy monitoring and optimization

#### Strategy Risks
1. Market Volatility Risk: Fixed stop-loss may lack flexibility during high volatility periods
2. Price Slippage Risk: May face significant slippage during rapid market movements
3. Trend Dependency: Strategy may generate false signals in ranging markets
4. Parameter Sensitivity: Strategy performance heavily influenced by stop-loss/take-profit settings
Solutions include: implementing dynamic stop-loss mechanisms, adding volatility filters, and incorporating trend confirmation indicators.

#### Strategy Optimization Directions
1. Introduce Adaptive Stop-Loss: Dynamically adjust stop-loss ranges based on ATR or volatility
2. Add Market Environment Filtering: Incorporate trend strength indicators to extend holding periods in clear trends
3. Optimize Signal Confirmation: Enhance signal reliability by integrating volume and other technical indicators
4. Improve Capital Management: Introduce compound risk management systems considering drawdown control
5. Enhance Market Microstructure Analysis: Integrate order flow data for more precise entries

#### Summary
The strategy builds a comprehensive trading framework by combining momentum breakouts, strict risk management, and automated execution systems. Its main strengths lie in its comprehensive risk control system and adaptive design, though improvements in market environment recognition and signal filtering are needed. Through continuous improvement and parameter optimization, the strategy shows potential for maintaining stable performance across different market conditions.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-21 00:00:00
end: 2025-02-08 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Trading Strategy for XAUUSD (Gold) – Automated Execution Plan", overlay=true, initial_capital=10000, currency=currency.USD)

//────────────────────────────
// 1. RISK MANAGEMENT & POSITION SIZING
//────────────────────────────
// Configurable inputs for Stop Loss and Take Profit
sl = input.float(title="Stop Loss ($)", defval=5, step=0.1)
tp = input.float(title="Take Profit ($)", defval=15, step=0.1)

// Volume: 0.01 lots per $100 of equity → lotSize = equity / 10000
lotSize = strategy.equity / strategy.initial_capital

//────────────────────────────
// 2. TRADING HOURS (London Time)
//────────────────────────────
// Get the current bar's timestamp in London time.
londonTime   = time(timeframe.period, "", "Europe/London")
londonHour   = hour(londonTime)
tradingAllowed = (londonHour != 0) and (londonHour < 19)

//────────────────────────────
// 3. DOJI CANDLE DEFINITION
//────────────────────────────
// A candle is considered a doji if the sum of its upper and lower shadows is greater than its body.
upperShadow = high - math.max(open, close)
lowerShadow = math.min(open, close) - low
bodySize    = math.abs(close - open)
isDoji      = (upperShadow + lowerShadow) > bodySize

//────────────────────────────
// 4. ENTRY CONDITIONS
//────────────────────────────
// Buy Signal:
//   • Current candle’s high > previous candle’s high.
//   • Current candle’s low is not below previous candle’s low.
//   • Bullish candle (close > open) and not a doji.
//   • Skip if previous candle already qualified.
buyRaw    = (high > high[1]) and (low >= low[1]) and (close > open) and (not isDoji)
buySignal = buyRaw and not (buyRaw[1] ? true : false)

// Sell Signal:
//   • Current candle’s low < previous candle’s low.
//   • Current candle’s high is not above previous candle’s high.
//   • Bearish candle (close < open) and not a doji.
//   • Skip if previous candle already qualified.
sellRaw    = (low < low[1]) and (high <= high[1]) and (close < open) and (not isDoji)
sellSignal = sellRaw and not (sellRaw[1] ? true : false)

//────────────────────────────
// 5. DAILY TAKE PROFIT (TP) RULE
//────────────────────────────
// Create a day-string (year-month-day) using London time.
// This flag will block new trades for the rest of the day if a TP is hit.
var string lastDay = ""
currentDay = str.tostring(year(londonTime)) + "-" + str.tostring(month(londonTime)) + "-" + str.tostring(dayofmonth(londonTime))
var bool dailyTPHit = false
if lastDay != currentDay
    dailyTPHit := false
    lastDay := currentDay

//────────────────────────────
// 6. TRACK TRADE ENTRY & EXIT FOR TP DETECTION
//────────────────────────────
// We record the TP target when a new trade is entered.
// Then, when a trade closes, if the bar’s high (for long) or low (for short) reached the TP target,
// we assume the TP was hit and block new trades for the day.
var float currentTP = na
var int currentTradeType = 0   // 1 for long, -1 for short

// Detect a new trade entry (transition from no position to a position).
tradeEntered = (strategy.position_size != 0 and strategy.position_size[1] == 0)
if tradeEntered
    if strategy.position_size > 0
        currentTP := strategy.position_avg_price + tp
        currentTradeType := 1
    else if strategy.position_size < 0
        currentTP := strategy.position_avg_price - tp
        currentTradeType := -1

// Detect trade closure (transition from position to flat).
tradeClosed = (strategy.position_size == 0 and strategy.position_size[1] != 0)
if tradeClosed and not na(currentTP)
    // For a long trade, if the bar's high reached the TP target;
    // for a short trade, if the bar's low reached the TP target,
    // mark the daily TP flag.
    if (currentTradeType == 1 and high >= currentTP) or (currentTradeType == -1 and low <= currentTP)
        dailyTPHit := true
    currentTP := na
    currentTradeType := 0

//────────────────────────────
// 7. ORDER EXECUTION
//────────────────────────────
// Only open a new position if no position is open, trading is allowed, and daily TP rule is not active.
if (strategy.position_size == 0) and tradingAllowed and (not dailyTPHit)
    if buySignal
        strategy.entry("Long", strategy.long, qty=lotSize)
    if sellSignal
        strategy.entry("Short", strategy.short, qty=lotSize)

//────────────────────────────
// 8. EXIT ORDERS (Risk Management)
//────────────────────────────
// For long positions: SL = entry price - Stop Loss, TP = entry price + Take Profit.
// For short positions: SL = entry price + Stop Loss, TP = entry price - Take Profit.
if strategy.position_size > 0
    longSL = strategy.position_avg_price - sl
    longTP = strategy.position_avg_price + tp
    strategy.exit("Exit Long", from_entry="Long", stop=longSL, limit=longTP)
if strategy.position_size < 0
    shortSL = strategy.position_avg_price + sl
    shortTP = strategy.position_avg_price - tp
    strategy.exit("Exit Short", from_entry="Short", stop=shortSL, limit=shortTP)

//────────────────────────────
// 9. VISUALIZATION
//────────────────────────────
plotshape(buySignal and tradingAllowed and (not dailyTPHit) and (strategy.position_size == 0), title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="Buy")
plotshape(sellSignal and tradingAllowed and (not dailyTPHit) and (strategy.position_size == 0), title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="Sell")

```

> Detail

https://www.fmz.com/strategy/483119

> Last Modified

2025-02-27 16:57:06
