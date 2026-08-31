
> Name

Vishal-Adaptive-Multi-Indicator-Trading-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d85b5c32ba730fe9e549.png)
![IMG](https://www.fmz.com/upload/asset/2d82d286c1c255984504f.png)


[trans]
#### 概述
本策略是一种综合性的量化交易方法，通过整合多个技术指标（MACD、Supertrend和Parabolic SAR）来识别市场趋势和交易信号。该策略旨在提供一个灵活且严谨的交易决策框架，可以适应不同市场环境。

#### 策略原理
策略原理基于三个关键技术指标的动态组合：
1. MACD指标：评估价格动量和趋势方向
2. Supertrend指标：判断市场主导趋势（多头或空头）
3. Parabolic SAR：提供精确的入场和出场信号

策略通过以下逻辑进行交易决策：
- 长仓入场条件：
  - MACD线高于信号线
  - Supertrend呈现绿色（多头）
  - 收盘价高于Parabolic SAR
- 空仓入场条件：
  - MACD线低于信号线
  - Supertrend呈现红色（空头）
  - 收盘价低于Parabolic SAR

#### 策略优势
1. 多指标综合验证：降低假信号风险
2. 灵活的信号触发机制：不严格要求指标触发顺序
3. 全仓交易策略：最大化每次交易的潜在收益
4. 对称的交易逻辑：在多头和空头市场中表现一致
5. 动态的出场机制：通过连续两根K线确认，避免过早退出

#### 策略风险
1. 指标滞后性风险：技术指标基于历史数据，可能存在延迟
2. 全仓交易风险：未设置止损可能导致较大资金波动
3. 市场剧烈波动风险：复杂市场环境可能影响策略表现
4. 参数敏感性：指标参数选择直接影响策略效果

#### 策略优化方向
1. 引入动态仓位管理：根据市场波动性调整仓位大小
2. 增加止损机制：降低单笔交易最大损失
3. 优化指标参数：通过回测找到最佳参数组合
4. 引入附加过滤条件：如交易量、波动率指标
5. 增加多时间框架验证：提高信号的可靠性

#### 总结
Vishal自适应多指标交易策略是一种创新的量化交易方法，通过MACD、Supertrend和Parabolic SAR的协同作用，提供了一个全面且灵活的交易决策框架。尽管存在一定风险，但其多指标验证和对称交易逻辑为投资者提供了一个值得深入研究的交易模型。
||
#### Overview
This strategy is a comprehensive quantitative trading method that integrates multiple technical indicators (MACD, Supertrend, and Parabolic SAR) to identify market trends and trading signals. The strategy aims to provide a flexible and rigorous decision-making framework adaptable to different market environments.

#### Strategy Principles
The strategy is based on the dynamic combination of three key technical indicators:
1. MACD Indicator: Evaluates price momentum and trend direction
2. Supertrend Indicator: Determines the dominant market trend (bullish or bearish)
3. Parabolic SAR: Provides precise entry and exit signals

The strategy makes trading decisions through the following logic:
- Long Entry Conditions:
  - MACD line above signal line
  - Supertrend is green (bullish)
  - Closing price above Parabolic SAR
- Short Entry Conditions:
  - MACD line below signal line
  - Supertrend is red (bearish)
  - Closing price below Parabolic SAR

#### Strategy Advantages
1. Multi-indicator Verification: Reduces false signal risk
2. Flexible Signal Triggering: No strict order requirement for indicators
3. Full Position Trading Strategy: Maximizes potential earnings per trade
4. Symmetric Trading Logic: Consistent performance in bullish and bearish markets
5. Dynamic Exit Mechanism: Confirms exit through two consecutive candles

#### Strategy Risks
1. Indicator Lag Risk: Technical indicators based on historical data may have delays
2. Full Position Trading Risk: Lack of stop-loss can lead to significant capital fluctuations
3. Severe Market Volatility Risk: Complex market environments may affect strategy performance
4. Parameter Sensitivity: Indicator parameter selection directly impacts strategy effectiveness

#### Strategy Optimization Directions
1. Introduce Dynamic Position Management: Adjust position size based on market volatility
2. Add Stop-Loss Mechanism: Reduce maximum loss per trade
3. Optimize Indicator Parameters: Find the best parameter combination through backtesting
4. Introduce Additional Filter Conditions: Such as trading volume, volatility indicators
5. Increase Multi-Timeframe Verification: Improve signal reliability

#### Summary
The Vishal Adaptive Multi-Indicator Trading Strategy is an innovative quantitative trading approach that provides a comprehensive and flexible trading decision framework through the synergistic action of MACD, Supertrend, and Parabolic SAR. Despite certain risks, its multi-indicator verification and symmetric trading logic offer investors a trading model worth in-depth research.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-01 00:00:00
end: 2025-03-27 00:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"ETH_USDT"}]
*/

//@version=6
strategy("Vishal Strategy", overlay=true, margin_long=100, margin_short=100, initial_capital=100000, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// **MACD Inputs & Calculation**
fast_length  = input.int(13, title="MACD Fast Length")
slow_length  = input.int(27, title="MACD Slow Length")
signal_length = input.int(9, title="MACD Signal Smoothing")

fast_ma  = ta.ema(close, fast_length)
slow_ma  = ta.ema(close, slow_length)
macd     = fast_ma - slow_ma
signal   = ta.ema(macd, signal_length)
hist     = macd - signal

// **Supertrend Inputs & Calculation**
atrPeriod = input.int(11,    "ATR Length", minval = 1)
factor    = input.float(3.0, "Factor",     minval = 0.01, step = 0.01)
[supertrend, direction] = ta.supertrend(factor, atrPeriod)
bullTrend  = direction < 0   // Uptrend Condition
bearTrend  = direction > 0   // Downtrend Condition

// **Parabolic SAR Inputs & Calculation**
sarStep = input.float(0.02, "Parabolic SAR Step")
sarMax  = input.float(0.2, "Parabolic SAR Max")
sar = ta.sar(sarStep, sarStep, sarMax)

// **Trade Entry Conditions**
macdBullish = macd > signal // MACD in Bullish Mode
macdBearish = macd < signal // MACD in Bearish Mode
priceAboveSAR = close > sar // Price above SAR (Bullish)
priceBelowSAR = close < sar // Price below SAR (Bearish)

// **Boolean Flags to Track Conditions Being Met**
var bool macdConditionMet = false
var bool sarConditionMet = false
var bool trendConditionMet = false

// **Track if Each Condition is Met in Any Order**
if (macdBullish)
    macdConditionMet := true
if (macdBearish)
    macdConditionMet := false

if (priceAboveSAR)
    sarConditionMet := true
if (priceBelowSAR)
    sarConditionMet := false

if (bullTrend)
    trendConditionMet := true
if (bearTrend)
    trendConditionMet := false

// **Final Long Entry Signal (Triggers When All Three Flags Are True)**
longSignal = macdConditionMet and sarConditionMet and trendConditionMet

// **Final Short Entry Signal (Triggers When All Three Flags Are False)**
shortSignal = not macdConditionMet and not sarConditionMet and not trendConditionMet

// **Execute Full Equity Trades**
if (longSignal)
    strategy.entry("Long", strategy.long)

if (shortSignal)
    strategy.entry("Short", strategy.short)

// **Exit Logic - Requires 2 Consecutive Candle Closes Below/Above SAR**
var int belowSARCount = 0
var int aboveSARCount = 0

if (strategy.position_size > 0)  // Long position is active
    belowSARCount := close < sar ? belowSARCount + 1 : 0
    if (belowSARCount >= 1)
        strategy.close("Long")

if (strategy.position_size < 0)  // Short position is active
    aboveSARCount := close > sar ? aboveSARCount + 1 : 0
    if (aboveSARCount >= 1)
        strategy.close("Short")

// **Plot Indicators**
plot(supertrend, title="Supertrend", color=bullTrend ? color.green : color.red, linewidth=2, style=plot.style_linebr)
plot(sar, title="Parabolic SAR", color=color.blue, style=plot.style_cross, linewidth=2)
plot(macd, title="MACD Line", color=color.blue, linewidth=2)
plot(signal, title="MACD Signal", color=color.orange, linewidth=2)
plot(hist, title="MACD Histogram", style=plot.style_columns, color=hist >= 0 ? color.green : color.red)

```

> Detail

https://www.fmz.com/strategy/488537

> Last Modified

2025-03-28 17:17:56
