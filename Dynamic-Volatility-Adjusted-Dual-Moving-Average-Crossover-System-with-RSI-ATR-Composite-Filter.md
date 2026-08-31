
> Name

Dynamic-Volatility-Adjusted-Dual-Moving-Average-Crossover-System-with-RSI-ATR-Composite-Filter

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d933ad313ea6450ac8d0.png)
![IMG](https://www.fmz.com/upload/asset/2d832437766cdd85d5739.png)




[trans]
#### 策略概述
该策略是一个结合了双均线交叉、RSI超买超卖和ATR波动率过滤的复合型交易系统。系统采用短期和长期移动平均线产生交易信号,通过RSI指标过滤市场状态,利用ATR指标进行波动率判断,并结合百分比止损和风险收益比来进行仓位管理和风险控制。该策略具有较强的适应性,可以根据市场环境灵活调整参数。

#### 策略原理
策略的核心逻辑基于以下几个方面:
1. 信号生成:利用9日和21日简单移动平均线的交叉来捕捉趋势变化。当短期均线上穿长期均线时产生做多信号,下穿时产生做空信号。
2. 条件过滤:通过RSI指标过滤超买超卖状态,避免在极端市场条件下入场。同时使用ATR指标确保市场波动率满足交易条件。
3. 风险管理:采用基于账户净值的百分比止损,通过设定风险收益比来确定止盈位置,实现对冲风险的同时获取合理收益。

#### 策略优势
1. 系统的适应性强:通过启用/禁用RSI和ATR过滤器,策略可以根据不同市场环境灵活调整。
2. 风险控制完善:采用百分比止损和动态仓位管理,有效控制每笔交易的风险敞口。
3. 信号可靠性高:通过多重过滤机制,降低了虚假信号的影响,提高了交易的成功率。
4. 参数可调性强:各项参数都可以根据具体市场特征进行优化调整。

#### 策略风险
1. 震荡市场风险:在横盘震荡市场中,均线交叉可能产生频繁的虚假信号。
2. 滞后性风险:移动平均线具有一定的滞后性,可能错过最佳入场时机。
3. 参数优化风险:过度优化参数可能导致策略过拟合,影响实盘表现。
4. 市场环境依赖:策略在趋势明显的市场中表现更好,而在其他市场环境下可能效果欠佳。

#### 策略优化方向
1. 动态参数调整:可以根据市场波动率自动调整均线周期和RSI阈值。
2. 增加趋势强度过滤:引入DMI或ADX等指标来评估趋势强度。
3. 优化止损方式:可以考虑使用跟踪止损或基于ATR的动态止损。
4. 完善仓位管理:引入基于波动率的动态仓位管理系统。

#### 总结
该策略通过组合多个技术指标,构建了一个相对完整的交易系统。策略在趋势市场中表现优异,具有良好的风险控制能力。通过合理设置参数和添加必要的过滤条件,策略可以适应不同的市场环境。建议在实盘使用前进行充分的回测和参数优化。

||

#### Strategy Overview
This strategy is a composite trading system combining dual moving average crossover, RSI overbought/oversold, and ATR volatility filtering. The system generates trading signals using short-term and long-term moving averages, filters market conditions through RSI indicators, assesses volatility using ATR, and implements position management and risk control through percentage-based stop-loss and risk-reward ratios. The strategy demonstrates strong adaptability and can flexibly adjust parameters based on market conditions.

#### Strategy Principles
The core logic of the strategy is based on the following aspects:
1. Signal Generation: Captures trend changes using crossovers of 9-day and 21-day simple moving averages. Long signals are generated when the short-term MA crosses above the long-term MA, and short signals when it crosses below.
2. Condition Filtering: Filters overbought/oversold conditions using RSI indicator to avoid entering trades in extreme market conditions. Uses ATR indicator to ensure market volatility meets trading criteria.
3. Risk Management: Employs percentage-based stop-loss relative to account equity, determines take-profit levels through risk-reward ratios to achieve reasonable returns while hedging risks.

#### Strategy Advantages
1. Strong System Adaptability: Strategy can flexibly adjust to different market environments through enabling/disabling RSI and ATR filters.
2. Comprehensive Risk Control: Effectively controls risk exposure per trade through percentage-based stop-loss and dynamic position management.
3. High Signal Reliability: Reduces impact of false signals through multiple filtering mechanisms, improving trade success rate.
4. Strong Parameter Adjustability: All parameters can be optimized and adjusted according to specific market characteristics.

#### Strategy Risks
1. Ranging Market Risk: Moving average crossovers may generate frequent false signals in sideways markets.
2. Lag Risk: Moving averages have inherent lag, potentially missing optimal entry points.
3. Parameter Optimization Risk: Over-optimization may lead to strategy overfitting, affecting live trading performance.
4. Market Environment Dependency: Strategy performs better in trending markets but may underperform in other market conditions.

#### Strategy Optimization Directions
1. Dynamic Parameter Adjustment: Automatically adjust MA periods and RSI thresholds based on market volatility.
2. Add Trend Strength Filtering: Introduce DMI or ADX indicators to evaluate trend strength.
3. Optimize Stop-Loss Methods: Consider implementing trailing stops or ATR-based dynamic stop-losses.
4. Improve Position Management: Introduce volatility-based dynamic position sizing system.

#### Summary
The strategy constructs a relatively complete trading system by combining multiple technical indicators. It performs excellently in trending markets and demonstrates good risk control capabilities. Through proper parameter settings and necessary filtering conditions, the strategy can adapt to different market environments. Thorough backtesting and parameter optimization are recommended before live implementation.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-21 00:00:00
end: 2025-02-20 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Binance","currency":"SOL_USDT"}]
*/

//@version=5
strategy("Simplified MA Crossover Strategy with Disable Options", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// Inputs
shortLength = input.int(9, title="Short MA Length", minval=1)
longLength = input.int(21, title="Long MA Length", minval=1)

// RSI Filter
enableRSI = input.bool(true, title="Enable RSI Filter")
rsiLength = input.int(14, title="RSI Length", minval=1)
rsiOverbought = input.int(70, title="RSI Overbought Level", minval=50, maxval=100)
rsiOversold = input.int(30, title="RSI Oversold Level", minval=0, maxval=50)

// ATR Filter
enableATR = input.bool(true, title="Enable ATR Filter")
atrLength = input.int(14, title="ATR Length", minval=1)
minATR = input.float(0.005, title="Minimum ATR Threshold", minval=0)

// Risk Management
stopLossPerc = input.float(0.5, title="Stop Loss (%)", minval=0.1) / 100
riskRewardRatio = input.float(2, title="Risk-Reward Ratio", minval=1)
riskPercentage = input.float(2, title="Risk Percentage", minval=0.1) / 100

// Indicators
shortMA = ta.sma(close, shortLength)
longMA = ta.sma(close, longLength)
rsi = ta.rsi(close, rsiLength)
atr = ta.atr(atrLength)

// Conditions
longCondition = ta.crossover(shortMA, longMA)
shortCondition = ta.crossunder(shortMA, longMA)

// Apply RSI Filter (if enabled)
if (enableRSI)
    longCondition := longCondition and rsi < rsiOverbought
    shortCondition := shortCondition and rsi > rsiOversold

// Apply ATR Filter (if enabled)
if (enableATR)
    longCondition := longCondition and atr > minATR
    shortCondition := shortCondition and atr > minATR

// Risk Management
positionSize = strategy.equity * riskPercentage / (stopLossPerc * close)
takeProfitLevel = strategy.position_avg_price * (1 + stopLossPerc * riskRewardRatio)
stopLossLevel = strategy.position_avg_price * (1 - stopLossPerc)

// Execute Trades
if (longCondition)
    strategy.entry("Long", strategy.long, qty=positionSize)
    strategy.exit("Take Profit/Stop Loss", "Long", limit=takeProfitLevel, stop=stopLossLevel)

if (shortCondition)
    strategy.entry("Short", strategy.short, qty=positionSize)
    strategy.exit("Take Profit/Stop Loss", "Short", limit=strategy.position_avg_price * (1 - stopLossPerc * riskRewardRatio), stop=strategy.position_avg_price * (1 + stopLossPerc))

// Plotting
plot(shortMA, color=color.blue, title="Short MA")
plot(longMA, color=color.red, title="Long MA")
hline(rsiOverbought, "Overbought", color=color.red)
hline(rsiOversold, "Oversold", color=color.green)
plot(atr, color=color.orange, title="ATR")
plotshape(series=longCondition, title="Long Entry", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=shortCondition, title="Short Entry", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")
```

> Detail

https://www.fmz.com/strategy/483082

> Last Modified

2025-02-21 11:58:43
