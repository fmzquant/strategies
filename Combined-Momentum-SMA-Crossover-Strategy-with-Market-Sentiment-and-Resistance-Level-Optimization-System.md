
> Name

Combined-Momentum-SMA-Crossover-Strategy-with-Market-Sentiment-and-Resistance-Level-Optimization-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/15c5d76723221fc4ad7.png)

[trans]
#### 概述
该策略是一个综合性的交易系统,结合了技术分析中的多个关键指标,包括双均线系统(SMA)、移动平均线趋同散度(MACD)、相对强弱指数(RSI)以及阻力位分析。策略的核心思想是通过多维度的技术指标来确认交易信号,同时结合市场情绪指标来优化持仓管理,最终达到提高胜率和风险收益比的目的。

#### 策略原理
策略采用短期(10日)和长期(30日)两条简单移动平均线作为主要信号系统。当短期均线向上穿越长期均线,同时MACD指标显示多头势态(MACD线在信号线上方)时,系统会发出做多信号。卖出条件则结合了阻力位分析,当价格达到过去20个周期的最高点,且MACD显示空头信号时,系统会平仓。此外,策略还引入了RSI指标作为情绪过滤器,用于优化持仓管理:当RSI超过70且处于亏损状态时提前止损,当RSI低于30且处于盈利状态时继续持有。

#### 策略优势
1. 多重确认机制:通过均线交叉、MACD趋势和阻力位的多重验证,提高了交易信号的可靠性
2. 智能持仓管理:引入RSI指标进行情绪监控,能够更好地管理持仓风险
3. 自适应性强:策略参数可根据不同市场条件进行调整
4. 风险控制完善:设置了多重止损机制,包括技术止损和情绪止损
5. 系统化程度高:交易决策完全系统化,减少了主观判断带来的干扰

#### 策略风险
1. 均线系统在震荡市场可能产生虚假信号
2. 过度依赖技术指标可能忽视基本面因素
3. 参数优化可能导致过度拟合
4. 在快速行情中,阻力位的识别可能滞后
5. RSI指标在某些市场条件下可能失效

#### 策略优化方向
1. 引入成交量指标:可以增加对市场趋势强度的判断
2. 动态调整参数:根据市场波动率自动调整均线周期和RSI阈值
3. 增加趋势过滤器:引入更长期均线作为趋势过滤
4. 优化阻力位计算:考虑使用动态阻力位识别算法
5. 加入波动率指标:用于调整仓位大小和止损位置

#### 总结
该策略通过组合多个经典技术指标,构建了一个完整的交易系统。策略的优势在于多重信号确认机制和完善的风险控制体系,但仍需注意市场环境对策略表现的影响。通过建议的优化方向,策略的稳定性和适应性有望得到进一步提升。在实盘应用中,建议投资者根据自身风险偏好和市场环境适当调整参数,并始终保持对市场基本面的关注。

||

#### Overview
This strategy is a comprehensive trading system that combines multiple key technical indicators, including a dual Simple Moving Average (SMA) system, Moving Average Convergence Divergence (MACD), Relative Strength Index (RSI), and resistance level analysis. The core concept is to confirm trading signals through multi-dimensional technical indicators while incorporating market sentiment indicators for position management optimization, ultimately aiming to improve win rates and risk-reward ratios.

#### Strategy Principles
The strategy employs short-term (10-day) and long-term (30-day) simple moving averages as the primary signal system. A buy signal is generated when the short-term SMA crosses above the long-term SMA, and the MACD shows bullish momentum (MACD line above signal line). The sell condition incorporates resistance level analysis, triggering position closure when the price reaches the highest point of the past 20 periods and MACD shows bearish signals. Additionally, the RSI indicator serves as a sentiment filter for position management: early exit on losses when RSI exceeds 70, and position holding on profits when RSI is below 30.

#### Strategy Advantages
1. Multiple confirmation mechanism: Enhances signal reliability through SMA crossover, MACD trend, and resistance level validation
2. Intelligent position management: Incorporates RSI for sentiment monitoring and better risk management
3. Strong adaptability: Strategy parameters can be adjusted for different market conditions
4. Comprehensive risk control: Multiple stop-loss mechanisms including technical and sentiment-based stops
5. High systematization: Fully systematic trading decisions reducing subjective interference

#### Strategy Risks
1. SMA system may generate false signals in ranging markets
2. Over-reliance on technical indicators might ignore fundamental factors
3. Parameter optimization may lead to overfitting
4. Resistance level identification might lag in fast-moving markets
5. RSI indicator may become ineffective under certain market conditions

#### Strategy Optimization Directions
1. Incorporate volume indicators: Enhance trend strength assessment
2. Dynamic parameter adjustment: Automatically adjust SMA periods and RSI thresholds based on market volatility
3. Add trend filters: Introduce longer-term moving averages for trend filtering
4. Optimize resistance level calculation: Consider dynamic resistance identification algorithms
5. Include volatility indicators: For position sizing and stop-loss placement

#### Summary
This strategy constructs a complete trading system by combining multiple classic technical indicators. Its strengths lie in the multiple signal confirmation mechanism and comprehensive risk control system, though market conditions' impact on strategy performance should be monitored. Through the suggested optimization directions, the strategy's stability and adaptability can be further enhanced. In live trading, investors are advised to adjust parameters according to their risk preferences and market environment while maintaining attention to market fundamentals.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-11 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("XAUUSD SMA with MACD & Market Sentiment (Enhanced RR)", overlay=true)

// Input parameters for moving averages
shortSMA_length = input.int(10, title="Short SMA Length", minval=1)
longSMA_length = input.int(30, title="Long SMA Length", minval=1)

// MACD settings
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)

// Lookback period for identifying major resistance (swing highs)
resistance_lookback = input.int(20, title="Resistance Lookback Period", tooltip="Lookback period for identifying major resistance")

// Calculate significant resistance (local swing highs over the lookback period)
major_resistance = ta.highest(close, resistance_lookback)

// Calculate SMAs
shortSMA = ta.sma(close, shortSMA_length)
longSMA = ta.sma(close, longSMA_length)

// RSI for market sentiment
rsiLength = input.int(14, title="RSI Length", minval=1)
rsiOverbought = input.int(70, title="RSI Overbought Level", minval=50, maxval=100)
rsiOversold = input.int(30, title="RSI Oversold Level", minval=0, maxval=50)
rsi = ta.rsi(close, rsiLength)

// Define buy condition based on SMA and MACD
buyCondition = ta.crossover(shortSMA, longSMA) and macdLine > signalLine

// Define sell condition: only sell if price is at or above the identified major resistance
sellCondition = close >= major_resistance and macdLine < signalLine

// Define sentiment-based exit conditions
closeEarlyCondition = strategy.position_size < 0 and rsi > rsiOverbought  // Close losing trade early if RSI is overbought
holdWinningCondition = strategy.position_size > 0 and rsi < rsiOversold   // Hold winning trade if RSI is oversold

// Execute strategy: Enter long position when buy conditions are met
if (buyCondition)
    strategy.entry("Buy", strategy.long)

// Close the position when the sell condition is met (price at resistance)
if (sellCondition and not holdWinningCondition)
    strategy.close("Buy")

// Close losing trades early if sentiment is against us
if (closeEarlyCondition)
    strategy.close("Buy")

// Visual cues for buy and sell signals
plotshape(series=buyCondition, title="Buy Signal", location=location.belowbar, color=color.green, style=shape.labelup, text="BUY")
plotshape(series=sellCondition, title="Sell Signal", location=location.abovebar, color=color.red, style=shape.labeldown, text="SELL")

// Add alert for buy condition
alertcondition(buyCondition, title="Buy Signal Activated", message="Buy signal activated: Short SMA has crossed above Long SMA and MACD is bullish.")

// Add alert for sell condition to notify when price hits major resistance
alertcondition(sellCondition, title="Sell at Major Resistance", message="Sell triggered at major resistance level.")

// Add alert for early close condition (for losing trades)
alertcondition(closeEarlyCondition, title="Close Losing Trade Early", message="Sentiment is against your position, close trade.")

// Add alert for holding winning condition (optional)
alertcondition(holdWinningCondition, title="Hold Winning Trade", message="RSI indicates oversold conditions, holding winning trade.")

```

> Detail

https://www.fmz.com/strategy/471695

> Last Modified

2024-11-12 15:10:12
