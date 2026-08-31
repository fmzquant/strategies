
> Name

Multi-Period-RSI-Divergence-with-Support-Resistance-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1efea0a2579ef8168dd.png)

[trans]
#### 概述
该策略是一个结合了RSI技术指标、价格背离和支撑阻力位的量化交易系统。策略通过识别RSI与价格之间的背离关系,并结合支撑阻力位的突破来确定交易信号,同时集成了止损和止盈机制以控制风险。

#### 策略原理
策略主要基于以下几个核心组件:
1. RSI指标计算:使用14周期的相对强弱指标(RSI)来衡量价格动能
2. 支撑阻力位识别:通过50个周期的最高价和最低价来确定关键价格水平
3. 背离判定:
   - 牛市背离:当价格创新低而RSI未创新低时,且价格在支撑位上方
   - 熊市背离:当价格创新高而RSI未创新高时,且价格在阻力位下方
4. 风险管理:
   - 入场后设置1%的止损
   - 设置2%的止盈目标

#### 策略优势
1. 多重确认机制:结合了动量指标(RSI)、价格形态(背离)和市场结构(支撑阻力),提供了更可靠的交易信号
2. 风险控制完善:预设的止损止盈机制能有效控制每笔交易的风险
3. 适应性强:策略参数可根据不同市场条件进行调整
4. 信号明确:交易条件清晰,便于执行和回测

#### 策略风险
1. 假突破风险:在横盘市场可能出现频繁的假突破信号
2. 参数敏感性:RSI周期、支撑阻力周期的选择对策略表现影响较大
3. 滑点影响:在快速行情中,实际成交价可能与信号价格存在偏差
4. 市场环境依赖:在趋势明显的市场中表现较好,而在震荡市场中可能产生假信号

#### 策略优化方向
1. 时间框架优化:可以添加多时间框架确认机制,提高信号可靠性
2. 止损优化:可以引入动态止损机制,如跟踪止损
3. 过滤器引入:添加成交量、波动率等过滤器,减少假信号
4. 参数自适应:开发自适应参数机制,使策略能够根据市场条件自动调整参数

#### 总结
该策略通过结合技术分析中的多个重要概念,构建了一个相对完整的交易系统。策略的优势在于多重确认机制和完善的风险控制,但同时也面临参数选择和市场环境依赖的挑战。通过建议的优化方向,策略的稳定性和适应性有望得到进一步提升。在实际应用中,建议通过充分的历史数据回测和参数优化来确定最适合的策略配置。 ||

#### Overview
This strategy is a quantitative trading system that combines RSI technical indicator, price divergence, and support/resistance levels. The strategy identifies trading signals through RSI-price divergence relationships and support/resistance breakouts, while incorporating stop-loss and take-profit mechanisms for risk control.

#### Strategy Principles
The strategy is based on several core components:
1. RSI Calculation: Uses a 14-period Relative Strength Index (RSI) to measure price momentum
2. Support/Resistance Identification: Determines key price levels using 50-period highs and lows
3. Divergence Detection:
   - Bullish Divergence: When price makes new low but RSI doesn't, and price is above support
   - Bearish Divergence: When price makes new high but RSI doesn't, and price is below resistance
4. Risk Management:
   - 1% stop-loss after entry
   - 2% take-profit target

#### Strategy Advantages
1. Multiple Confirmation Mechanism: Combines momentum indicator (RSI), price pattern (divergence), and market structure (support/resistance) for more reliable signals
2. Comprehensive Risk Control: Preset stop-loss and take-profit mechanisms effectively control risk per trade
3. High Adaptability: Strategy parameters can be adjusted for different market conditions
4. Clear Signals: Trading conditions are well-defined for easy implementation and backtesting

#### Strategy Risks
1. False Breakout Risk: Frequent false signals may occur in ranging markets
2. Parameter Sensitivity: Choice of RSI period and support/resistance period significantly impacts strategy performance
3. Slippage Impact: Actual execution prices may deviate from signal prices in fast markets
4. Market Environment Dependency: Performs better in trending markets, may generate false signals in ranging markets

#### Optimization Directions
1. Timeframe Optimization: Add multiple timeframe confirmation mechanism to improve signal reliability
2. Stop-Loss Enhancement: Introduce dynamic stop-loss mechanisms, such as trailing stops
3. Filter Implementation: Add volume and volatility filters to reduce false signals
4. Parameter Adaptation: Develop adaptive parameter mechanisms for automatic adjustment based on market conditions

#### Summary
The strategy constructs a relatively complete trading system by combining multiple important concepts in technical analysis. Its strengths lie in multiple confirmation mechanisms and comprehensive risk control, while facing challenges in parameter selection and market environment dependency. Through the suggested optimization directions, the strategy's stability and adaptability can be further improved. In practical application, it is recommended to determine the most suitable strategy configuration through thorough historical data backtesting and parameter optimization.[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-12 00:00:00
end: 2024-12-19 00:00:00
period: 10m
basePeriod: 10m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Агрессивная стратегия с дивергенциями по RSI и уровнями поддержки/сопротивления", overlay=true)

// Параметры для RSI
rsiLength = input.int(14, title="Период для RSI", minval=1)   // Период для расчета RSI
rsiOverbought = input.int(70, title="Уровень перекупленности", minval=1, maxval=100)
rsiOversold = input.int(30, title="Уровень перепроданности", minval=1, maxval=100)

// Параметры для стоп-лосса и тейк-профита
stopLossPercent = input.float(1, title="Стоп-лосс (%)", minval=0.1) / 100
takeProfitPercent = input.float(2, title="Тейк-профит (%)", minval=0.1) / 100

// Период для уровней поддержки и сопротивления
supportResistanceLength = input.int(50, title="Период для уровней поддержки и сопротивления", minval=1)

// Рассчитываем RSI
rsi = ta.rsi(close, rsiLength)

// Рассчитываем уровни поддержки и сопротивления
support = ta.lowest(close, supportResistanceLength)  // Находим минимумы за период для поддержки
resistance = ta.highest(close, supportResistanceLength)  // Находим максимумы за период для сопротивления

// Определяем дивергенцию RSI с ценой
priceHigh = ta.highest(close, rsiLength)
priceLow = ta.lowest(close, rsiLength)
rsiHigh = ta.highest(rsi, rsiLength)
rsiLow = ta.lowest(rsi, rsiLength)

// Дивергенция на покупку (бычья): цена делает новый минимум, а RSI этого не делает
bullishDivergence = priceLow < priceLow[1] and rsiLow > rsiLow[1] and close > support

// Дивергенция на продажу (медвежья): цена делает новый максимум, а RSI этого не делает
bearishDivergence = priceHigh > priceHigh[1] and rsiHigh < rsiHigh[1] and close < resistance

// Отображаем уровни поддержки и сопротивления
plot(support, title="Поддержка", color=color.green, linewidth=2, style=plot.style_line)
plot(resistance, title="Сопротивление", color=color.red, linewidth=2, style=plot.style_line)

// Условия для покупки по бычьей дивергенции
if (bullishDivergence)
    strategy.entry("Long", strategy.long)
    stopLoss = close * (1 - stopLossPercent)   // Стоп-лосс
    takeProfit = close * (1 + takeProfitPercent) // Тейк-профит
    strategy.exit("Exit Long", from_entry="Long", stop=stopLoss, limit=takeProfit)

// Условия для продажи по медвежьей дивергенции
if (bearishDivergence)
    strategy.entry("Short", strategy.short)
    stopLoss = close * (1 + stopLossPercent)   // Стоп-лосс для шорта
    takeProfit = close * (1 - takeProfitPercent) // Тейк-профит для шорта
    strategy.exit("Exit Short", from_entry="Short", stop=stopLoss, limit=takeProfit)

// Отображаем RSI на отдельном графике
plot(rsi, title="RSI", color=color.blue, linewidth=2)
hline(rsiOverbought, "Перекупленность", color=color.red)
hline(rsiOversold, "Перепроданность", color=color.green)

```

> Detail

https://www.fmz.com/strategy/475635

> Last Modified

2024-12-20 17:01:44
